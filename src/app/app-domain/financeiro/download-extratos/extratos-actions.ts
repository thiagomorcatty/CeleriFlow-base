"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";

import { bankIntegrationClient } from "@/lib/financeiro/bank-integration-client";
import { archiveBankStatement } from "@/lib/platform/blob";

type ActionResult<T = any> = { error?: string; data?: T };

const downloadSchema = z.object({
  banco: z.string().min(1, "Selecione o banco."),
  agencia: z.string().min(1, "Informe a agência."),
  contaNumero: z.string().min(1, "Informe o número da conta."),
  periodoInicio: z.string().min(1, "Selecione a data inicial."),
  periodoFim: z.string().min(1, "Selecione a data final."),
});

export async function runAutomatedBankDownloadAction(input: {
  banco: string;
  agencia: string;
  contaNumero: string;
  periodoInicio: string;
  periodoFim: string;
}): Promise<ActionResult> {
  const parsed = downloadSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  let context: Awaited<ReturnType<typeof getTenantContextForModuleEdit>> | undefined;
  try {
    context = await getTenantContextForModuleEdit("FINANCEIRO");
    const { prisma, user } = context;

    const timestamp = Date.now();

    // Conectar ao Simulador Bancário Externo via BankIntegrationClient
    const bankData = await bankIntegrationClient.fetchBankStatement(
      {
        banco: parsed.data.banco,
        agencia: parsed.data.agencia,
        contaNumero: parsed.data.contaNumero,
      },
      {
        periodoInicio: parsed.data.periodoInicio,
        periodoFim: parsed.data.periodoFim,
      }
    );
    const extension = bankStatementFormatExtension(bankData.formato);
    const fileNameCC = `EXTRATO_CC_${parsed.data.contaNumero}_${timestamp}.${extension}`;

    const archivedFile = await archiveBankStatement(
      fileNameCC,
      bankData.rawContent,
      bankStatementContentType(bankData.formato),
    );

    const logsExecucao = [
      `[${new Date().toLocaleTimeString()}] Conectando ao WebService / Simulador Bancário (${parsed.data.banco})...`,
      `[${new Date().toLocaleTimeString()}] Autenticação autorizada com o Simulador / API Bancária...`,
      `[${new Date().toLocaleTimeString()}] Extrato de Conta Corrente e Aplicação recebido (${(bankData.tamanhoBytes / 1024).toFixed(2)} KB).`,
      `[${new Date().toLocaleTimeString()}] ${bankData.items.length} movimentações sincronizadas do ambiente simulador.`,
      `[${new Date().toLocaleTimeString()}] Integridade SHA-256 calculada: ${bankData.hashSHA256}`,
      `[${new Date().toLocaleTimeString()}] Arquivo original arquivado no repositório privado da instância.`,
      `[${new Date().toLocaleTimeString()}] Gravando registro inalterável de auditoria no CeleriFlow...`,
      `[${new Date().toLocaleTimeString()}] Automação de extratos concluída com sucesso.`,
    ].join("\n");

    // Registrar Log de Auditoria
    const audit = await prisma.financialAuditLog.create({
      data: {
        action: "DOWNLOAD_AUTOMATICO_EXTRATO",
        entityType: "AutomatedBankDownload",
        entityId: `EXTRATO-${timestamp}`,
        authorUsuarioId: user.id,
        payload: {
          banco: parsed.data.banco,
          contaNumero: parsed.data.contaNumero,
          hashSHA256: bankData.hashSHA256,
        },
      },
    });

    // Salvar registro de automação
    const downloadRecord = await prisma.automatedBankDownload.create({
      data: {
        banco: parsed.data.banco,
        agencia: parsed.data.agencia,
        contaNumero: parsed.data.contaNumero,
        tipoConta: "CORRENTE_E_APLICACAO",
        periodoInicio: new Date(parsed.data.periodoInicio),
        periodoFim: new Date(parsed.data.periodoFim),
        nomeArquivo: fileNameCC,
        caminhoDestino: archivedFile.url,
        formato: bankData.formato,
        hashSHA256: bankData.hashSHA256,
        tamanhoBytes: bankData.tamanhoBytes,
        status: "CONCLUIDO",
        logsExecucao,
        auditLogId: audit.id,
      },
    });

    const transactionCodes = bankData.items.flatMap((item) => item.codigoTransacao ? [item.codigoTransacao] : []);
    const existingItems = transactionCodes.length > 0
      ? await prisma.bankStatementItem.findMany({
          where: { contaNumero: parsed.data.contaNumero, codigoTransacao: { in: transactionCodes } },
          select: { codigoTransacao: true },
        })
      : [];
    const existingCodes = new Set(existingItems.flatMap((item) => item.codigoTransacao ? [item.codigoTransacao] : []));
    const itemsToInsert = bankData.items.filter((item) => !item.codigoTransacao || !existingCodes.has(item.codigoTransacao));

    // The external transaction identifier prevents a rerun from creating a second municipal item.
    if (itemsToInsert.length > 0) {
      await prisma.bankStatementItem.createMany({
        data: itemsToInsert.map((item) => ({
          downloadId: downloadRecord.id,
          banco: parsed.data.banco,
          agencia: parsed.data.agencia,
          contaNumero: parsed.data.contaNumero,
          tipoConta: item.tipoConta,
          date: item.date,
          description: item.description,
          reference: item.reference || null,
          codigoTransacao: item.codigoTransacao || null,
          sinal: item.sinal,
          direction: item.sinal === "CREDITO" ? "CREDIT" : "DEBIT",
          valueDecimal: new Prisma.Decimal(item.value),
          status: "Pendente",
          reciboMunicipal: item.documento || null,
        })),
      });
    }

    const integration = await prisma.integrationConnection.findFirst({
      where: { code: "BANCO_API", environment: "SANDBOX" },
      select: { id: true },
    });
    if (integration) {
      await prisma.integrationRun.create({
        data: {
          connectionId: integration.id,
          operation: "DOWNLOAD_EXTRATO",
          environment: "SANDBOX",
          status: "SUCESSO",
          message: `Extrato arquivado com ${itemsToInsert.length} movimentações novas e ${bankData.items.length - itemsToInsert.length} já processadas.`,
          externalId: bankData.hashSHA256,
          payload: {
            banco: parsed.data.banco,
            agencia: parsed.data.agencia,
            contaNumero: parsed.data.contaNumero,
            periodoInicio: parsed.data.periodoInicio,
            periodoFim: parsed.data.periodoFim,
            archiveUrl: archivedFile.url,
            hashSHA256: bankData.hashSHA256,
          },
        },
      });
    }

    revalidatePath("/financeiro/download-extratos");
    return { data: downloadRecord };
  } catch (err: any) {
    if (context) {
      try {
        const integration = await context.prisma.integrationConnection.findFirst({
          where: { code: "BANCO_API", environment: "SANDBOX" },
          select: { id: true },
        });
        if (integration) {
          await context.prisma.integrationRun.create({
            data: {
              connectionId: integration.id,
              operation: "DOWNLOAD_EXTRATO",
              environment: "SANDBOX",
              status: "FALHA",
              message: err instanceof Error ? err.message : "Falha na automação bancária.",
              payload: { banco: parsed.data.banco, agencia: parsed.data.agencia, contaNumero: parsed.data.contaNumero },
            },
          });
        }
      } catch {
        // Preserve the original integration error even if audit persistence is unavailable.
      }
    }
    return { error: err?.message || "Falha na execução da automação bancária." };
  }
}

function bankStatementFormatExtension(format: "OFX" | "JSON" | "CNAB") {
  return format.toLowerCase();
}

function bankStatementContentType(format: "OFX" | "JSON" | "CNAB") {
  if (format === "JSON") return "application/json; charset=utf-8";
  return "text/plain; charset=utf-8";
}

export async function getDownloadHistoryAction(): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const history = await context.prisma.automatedBankDownload.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return { data: history };
  } catch (err: any) {
    return { error: err?.message || "Erro ao carregar histórico de downloads." };
  }
}
