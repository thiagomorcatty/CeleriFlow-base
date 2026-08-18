import crypto from "crypto";
import { Prisma, PrismaClient } from "@prisma/client";

type DatabaseClient = PrismaClient | Prisma.TransactionClient;
type OperationType = "APLICACAO" | "RESGATE" | "RENDIMENTO";
type RpaResultStatus = "CONCLUIDA" | "PENDENCIA_HUMANA" | "FALHA_REPROCESSAVEL" | "FALHA_DEFINITIVA";

type ElotechMapping = {
  bankAccountExternalId: string;
  bankCode: string;
  localAccount: string;
  applicationAccount?: string;
  revenueCode?: string;
};

type QueueInput = {
  sourceType: string;
  sourceId: string;
  sourceEventType: "APLICACAO_EXECUTADA" | "RESGATE_EXECUTADO" | "RENDIMENTO_IDENTIFICADO";
  type: OperationType;
  transactionDate: Date;
  amount: Prisma.Decimal | string | number;
  bank: {
    externalId: string | null | undefined;
    agency: string | null | undefined;
    account: string | null | undefined;
  };
  bankTransactionId: string | null | undefined;
  documentNumber: string | null | undefined;
  history: string | null | undefined;
  sourceReference: string;
};

type RpaCallbackResult = {
  operationId: string;
  status: RpaResultStatus;
  message: string;
  details?: Record<string, unknown>;
  occurredAt: Date;
};

const RETRYABLE_DELIVERY_STATUSES = ["PENDENTE_ENVIO", "FALHA_REPROCESSAVEL"];
const FINAL_RPA_STATUSES = ["CONCLUIDA", "PENDENCIA_HUMANA", "FALHA_DEFINITIVA"];

function isDispatchEnabled() {
  return process.env.RPA_DISPATCH_ENABLED === "true";
}

function parseMappings() {
  const raw = process.env.RPA_ELOTECH_MAPPINGS_JSON;
  if (!raw) throw new Error("RPA_ELOTECH_MAPPINGS_JSON não está configurada.");

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error("RPA_ELOTECH_MAPPINGS_JSON deve conter JSON válido.");
  }
  if (!Array.isArray(value)) throw new Error("RPA_ELOTECH_MAPPINGS_JSON deve conter uma lista de mapeamentos.");

  const mappings = value.flatMap((item): ElotechMapping[] => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const mapping = item as Record<string, unknown>;
    const bankAccountExternalId = typeof mapping.bankAccountExternalId === "string" ? mapping.bankAccountExternalId.trim() : "";
    const bankCode = typeof mapping.bankCode === "string" ? mapping.bankCode.trim() : "";
    const localAccount = typeof mapping.localAccount === "string" ? mapping.localAccount.trim() : "";
    if (!bankAccountExternalId || !bankCode || !localAccount) return [];
    return [{
      bankAccountExternalId,
      bankCode,
      localAccount,
      applicationAccount: typeof mapping.applicationAccount === "string" ? mapping.applicationAccount.trim() || undefined : undefined,
      revenueCode: typeof mapping.revenueCode === "string" ? mapping.revenueCode.trim() || undefined : undefined,
    }];
  });

  if (!mappings.length) throw new Error("Nenhum mapeamento Elotech válido foi configurado.");
  return mappings;
}

function buildPayload(input: QueueInput) {
  const municipalityId = process.env.RPA_MUNICIPALITY_ID?.trim();
  if (!municipalityId) throw new Error("RPA_MUNICIPALITY_ID não está configurada.");
  if (!input.bank.externalId || !input.bank.agency || !input.bank.account) {
    throw new Error("A operação RPA exige conta bancária externa, agência e número da conta.");
  }
  const mapping = parseMappings().find((item) => item.bankAccountExternalId === input.bank.externalId);
  if (!mapping) throw new Error(`Não há mapeamento Elotech para a conta externa ${input.bank.externalId}.`);
  if (!input.bankTransactionId) throw new Error("A operação RPA exige identificador bancário imutável.");

  const amount = new Prisma.Decimal(input.amount);
  if (amount.lessThanOrEqualTo(0)) throw new Error("A operação RPA exige valor positivo.");
  const sourceKey = `${input.sourceType}:${input.sourceId}`;
  const operationId = `celeri-rpa-op-${crypto.createHash("sha256").update(sourceKey).digest("hex").slice(0, 24)}`;
  const batchId = `celeri-rpa-batch-${crypto.createHash("sha256").update(`batch:${sourceKey}`).digest("hex").slice(0, 24)}`;
  const sourceEventId = `celeri-rpa-event-${crypto.createHash("sha256").update(`event:${sourceKey}`).digest("hex").slice(0, 24)}`;
  const elotech = input.type === "RENDIMENTO"
    ? { localAccount: mapping.localAccount, revenueCode: mapping.revenueCode }
    : { localAccount: mapping.localAccount, applicationAccount: mapping.applicationAccount };

  if ((input.type === "RENDIMENTO" && !mapping.revenueCode) || (input.type !== "RENDIMENTO" && !mapping.applicationAccount)) {
    throw new Error(`O mapeamento Elotech da conta ${input.bank.externalId} está incompleto para ${input.type}.`);
  }

  const operation = {
    operationId,
    status: "DISPONIVEL_PARA_LANCAMENTO",
    type: input.type,
    transactionDate: input.transactionDate.toISOString().slice(0, 10),
    amount: Number(amount.toFixed(2)),
    bankTransactionId: input.bankTransactionId,
    bank: { code: mapping.bankCode, agency: input.bank.agency, account: input.bank.account },
    elotech,
    documentNumber: input.documentNumber?.trim() || input.bankTransactionId,
    history: input.history?.trim() || `${input.type} financeira`,
    sourceReference: input.sourceReference,
  };
  const payload = { batchId, sourceEventId, municipalityId, sourceEventType: input.sourceEventType, operations: [operation] };
  return { batchId, sourceEventId, operationId, municipalityId, operation, payload };
}

export async function queueRpaOperation(db: DatabaseClient, input: QueueInput) {
  if (!isDispatchEnabled()) return null;
  const built = buildPayload(input);
  const payloadHash = crypto.createHash("sha256").update(JSON.stringify(built.payload)).digest("hex");

  return db.rpaIntegrationOperation.upsert({
    where: { sourceType_sourceId: { sourceType: input.sourceType, sourceId: input.sourceId } },
    create: {
      sourceType: input.sourceType,
      sourceId: input.sourceId,
      batchId: built.batchId,
      sourceEventId: built.sourceEventId,
      operationId: built.operationId,
      municipalityId: built.municipalityId,
      sourceEventType: input.sourceEventType,
      operationType: input.type,
      payload: built.payload as Prisma.InputJsonValue,
      payloadHash,
    },
    update: {},
  });
}

function getCentralConfiguration() {
  const baseUrl = process.env.RPA_CENTRAL_BASE_URL?.trim().replace(/\/+$/, "");
  const key = process.env.RPA_CENTRAL_API_KEY;
  if (!baseUrl || !key) throw new Error("A Central RPA não está configurada.");
  const url = new URL(baseUrl);
  if (url.protocol !== "https:") throw new Error("A Central RPA deve usar HTTPS.");
  return { baseUrl, key };
}

function nextRetryAt(attempts: number) {
  const minutes = Math.min(60, 2 ** Math.min(attempts, 6));
  return new Date(Date.now() + minutes * 60_000);
}

export async function dispatchPendingRpaOperations(db: PrismaClient, limit = 25) {
  if (!isDispatchEnabled()) return { processed: 0, accepted: 0, failed: 0, disabled: true };
  const { baseUrl, key } = getCentralConfiguration();
  const now = new Date();
  const candidates = await db.rpaIntegrationOperation.findMany({
    where: { deliveryStatus: { in: RETRYABLE_DELIVERY_STATUSES }, nextAttemptAt: { lte: now } },
    orderBy: { createdAt: "asc" },
    take: Math.max(1, Math.min(limit, 100)),
  });

  let accepted = 0;
  let failed = 0;
  for (const candidate of candidates) {
    const claimed = await db.rpaIntegrationOperation.updateMany({
      where: { id: candidate.id, deliveryStatus: { in: RETRYABLE_DELIVERY_STATUSES } },
      data: { deliveryStatus: "EM_ENVIO", attempts: { increment: 1 }, lastAttemptAt: now, lastError: null },
    });
    if (!claimed.count) continue;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), Number(process.env.RPA_DISPATCH_TIMEOUT_MS || "15000"));
      let response: Response;
      try {
        response = await fetch(`${baseUrl}/api/integration/batches`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CeleriFlow-Key": key },
          body: JSON.stringify(candidate.payload),
          signal: controller.signal,
          cache: "no-store",
        });
      } finally {
        clearTimeout(timeout);
      }

      if (response.status === 200 || response.status === 201) {
        await db.rpaIntegrationOperation.update({
          where: { id: candidate.id },
          data: { deliveryStatus: "ACEITA_PELA_CENTRAL", rpaStatus: "AGUARDANDO_USUARIO", centralAcceptedAt: new Date(), nextAttemptAt: new Date() },
        });
        accepted += 1;
        continue;
      }

      const details = (await response.text()).slice(0, 500);
      const retryable = response.status === 408 || response.status === 429 || response.status >= 500;
      await db.rpaIntegrationOperation.update({
        where: { id: candidate.id },
        data: {
          deliveryStatus: retryable ? "FALHA_REPROCESSAVEL" : "FALHA_DEFINITIVA",
          nextAttemptAt: retryable ? nextRetryAt(candidate.attempts + 1) : new Date(),
          lastError: `Central RPA respondeu HTTP ${response.status}${details ? `: ${details}` : ""}`,
        },
      });
      failed += 1;
    } catch (error) {
      await db.rpaIntegrationOperation.update({
        where: { id: candidate.id },
        data: {
          deliveryStatus: "FALHA_REPROCESSAVEL",
          nextAttemptAt: nextRetryAt(candidate.attempts + 1),
          lastError: error instanceof Error ? error.message.slice(0, 500) : "Falha desconhecida ao enviar operação à Central RPA.",
        },
      });
      failed += 1;
    }
  }
  return { processed: candidates.length, accepted, failed, disabled: false };
}

export async function recordRpaOperationResult(db: PrismaClient, result: RpaCallbackResult) {
  return db.$transaction(async (tx) => {
    const operation = await tx.rpaIntegrationOperation.findUnique({ where: { operationId: result.operationId } });
    if (!operation) return { found: false, duplicate: false, conflict: false };
    if (operation.rpaStatus === result.status) return { found: true, duplicate: true, conflict: false };
    if (operation.rpaStatus && FINAL_RPA_STATUSES.includes(operation.rpaStatus)) return { found: true, duplicate: false, conflict: true };

    const updated = await tx.rpaIntegrationOperation.update({
      where: { id: operation.id },
      data: {
        rpaStatus: result.status,
        completedAt: result.status === "CONCLUIDA" ? result.occurredAt : null,
        resultPayload: JSON.parse(JSON.stringify({
          status: result.status,
          message: result.message,
          details: result.details ?? {},
          occurredAt: result.occurredAt.toISOString(),
        })) as Prisma.InputJsonValue,
        lastError: result.status === "CONCLUIDA" ? null : result.message,
      },
    });
    const technicalUser = await tx.usuario.findFirst({ where: { ativo: true }, orderBy: { createdAt: "asc" }, select: { id: true } });
    if (technicalUser) {
      await tx.financialAuditLog.create({
        data: {
          action: "RPA_RESULTADO_RECEBIDO",
          entityType: "RpaIntegrationOperation",
          entityId: updated.id,
          authorUsuarioId: technicalUser.id,
          payload: { operationId: updated.operationId, status: result.status, message: result.message, occurredAt: result.occurredAt.toISOString() },
        },
      });
    }
    return { found: true, duplicate: false, conflict: false };
  });
}

export const rpaResultStatuses = ["CONCLUIDA", "PENDENCIA_HUMANA", "FALHA_REPROCESSAVEL", "FALHA_DEFINITIVA"] as const;
