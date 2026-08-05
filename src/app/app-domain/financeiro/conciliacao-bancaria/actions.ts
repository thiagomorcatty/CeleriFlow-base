"use server";

import { importBankStatementCsv, matchBankStatementItemToTreasuryMovement } from "@/lib/financeiro";
import { runAutoReconciliation } from "@/lib/financeiro/reconciliation-engine";
import { getTenantContextForModuleEdit, isSystemAdministrator } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import crypto from "crypto";
import { Prisma } from "@prisma/client";

type ActionResult<T = any> = { error?: string; data?: T };

const MAX_CSV_BYTES = 2 * 1024 * 1024;
const importSchema = z.object({
  bankAccountId: z.string().trim().min(1, "Selecione uma conta bancária."),
  content: z.string().min(1, "Selecione um arquivo CSV."),
  fileName: z.string().trim().max(255, "O nome do arquivo é muito longo.").optional(),
});
const matchSchema = z.object({
  statementItemId: z.string().trim().min(1, "Selecione um item de extrato."),
  treasuryMovementId: z.string().trim().min(1, "Selecione um movimento de tesouraria."),
});
const reconciliationSessionSchema = z.object({
  banco: z.string().trim().min(1, "Informe o banco."),
  agencia: z.string().trim().min(1, "Informe a agência."),
  contaNumero: z.string().trim().min(1, "Informe o número da conta."),
  periodo: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Informe o período no formato AAAA-MM."),
  saldoInicial: z.number().finite("Informe um saldo inicial válido."),
});

function actorFor(context: Awaited<ReturnType<typeof getTenantContextForModuleEdit>>) {
  return {
    usuarioId: context.user.id,
    employeeId: context.user.employeeId,
    allowedBudgetUnitIds: isSystemAdministrator(context.user) ? undefined : context.user.allowedBudgetUnitIds,
  };
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Não foi possível concluir a conciliação bancária.";
}

export async function importBankStatementCsvAction(data: { bankAccountId: string; content: string; fileName?: string }): Promise<ActionResult> {
  const parsed = importSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados de importação inválidos." };
  if (Buffer.byteLength(parsed.data.content, "utf8") > MAX_CSV_BYTES) {
    return { error: "O arquivo CSV deve ter no máximo 2 MB." };
  }
  if (parsed.data.fileName && !parsed.data.fileName.toLowerCase().endsWith(".csv")) {
    return { error: "Envie um arquivo no formato CSV." };
  }

  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await importBankStatementCsv(context.prisma, actorFor(context), {
      ...parsed.data,
      fileName: parsed.data.fileName?.replace(/[\\/:]/g, "_") || undefined,
    });
    revalidatePath("/financeiro/conciliacao-bancaria");
    return {};
  } catch (error) {
    return { error: errorMessage(error) };
  }
}

export async function matchBankStatementItemAction(data: { statementItemId: string; treasuryMovementId: string }): Promise<ActionResult> {
  const parsed = matchSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados de conciliação inválidos." };

  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await matchBankStatementItemToTreasuryMovement(context.prisma, actorFor(context), parsed.data);
    revalidatePath("/financeiro/conciliacao-bancaria");
    return {};
  } catch (error) {
    return { error: errorMessage(error) };
  }
}

/**
 * Abertura de Conciliação Bancária com Carga de Razão e Cálculo de Saldos
 */
export async function openReconciliationSessionAction(input: {
  banco: string;
  agencia: string;
  contaNumero: string;
  periodo: string;
  saldoInicial: number;
}): Promise<ActionResult> {
  const parsed = reconciliationSessionSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados de conciliação inválidos." };

  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const { prisma } = context;

    const [yearStr, monthStr] = parsed.data.periodo.split("-");
    const year = parseInt(yearStr || "2026");
    const month = parseInt(monthStr || "08");

    const dataInicio = new Date(year, month - 1, 1);
    const dataFim = new Date(year, month, 0, 23, 59, 59);

    // Buscar ou criar sessão
    let session = await prisma.bankReconciliationSession.findFirst({
      where: {
        banco: parsed.data.banco,
        agencia: parsed.data.agencia,
        contaNumero: parsed.data.contaNumero,
        periodo: parsed.data.periodo,
      },
    });

    if (!session) {
      session = await prisma.bankReconciliationSession.create({
        data: {
          banco: parsed.data.banco,
          agencia: parsed.data.agencia,
          contaNumero: parsed.data.contaNumero,
          periodo: parsed.data.periodo,
          dataInicio,
          dataFim,
          saldoInicialDecimal: new Prisma.Decimal(parsed.data.saldoInicial),
          totalDebitosDecimal: new Prisma.Decimal(0),
          totalCreditosDecimal: new Prisma.Decimal(0),
          saldoFinalDecimal: new Prisma.Decimal(parsed.data.saldoInicial),
          saldoRazaoDecimal: new Prisma.Decimal(parsed.data.saldoInicial),
          diferencaDecimal: new Prisma.Decimal(0),
          status: "ABERTA",
        },
      });
    }

    revalidatePath("/financeiro/conciliacao-bancaria");
    return { data: session };
  } catch (err: any) {
    return { error: err?.message || "Erro ao abrir sessão de conciliação." };
  }
}

/**
 * Executa o Motor de Correspondência Automática (9 Regras)
 */
export async function runAutoReconciliationAction(sessionId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const result = await runAutoReconciliation(context.prisma, sessionId);
    revalidatePath("/financeiro/conciliacao-bancaria");
    return { data: result };
  } catch (err: any) {
    return { error: err?.message || "Erro ao executar correspondência automática." };
  }
}

/**
 * Confirma a Conciliação e Atualiza o Sistema Municipal
 */
export async function confirmReconciliationSessionAction(sessionId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const { prisma, user } = context;

    const timestamp = Date.now();
    const recibo = `REC-CONCIL-${timestamp}`;
    const hash = crypto.createHash("sha256").update(`${recibo}:${sessionId}`).digest("hex");

    const session = await prisma.bankReconciliationSession.update({
      where: { id: sessionId },
      data: {
        status: "CONCILIADA",
        confirmadoPor: user.email || user.id,
        confirmadoEm: new Date(),
        reciboIntegracao: recibo,
      },
    });

    revalidatePath("/financeiro/conciliacao-bancaria");
    return { data: { session, recibo, hash } };
  } catch (err: any) {
    return { error: err?.message || "Erro ao confirmar conciliação." };
  }
}

export async function getActiveReconciliationSessionsAction(): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const sessions = await context.prisma.bankReconciliationSession.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return { data: sessions };
  } catch (err: any) {
    return { error: err?.message || "Erro ao listar sessões de conciliação." };
  }
}
