"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import crypto from "crypto";
import path from "path";
import { Prisma } from "@prisma/client";

import { bankIntegrationClient } from "@/lib/financeiro/bank-integration-client";

type ActionResult<T = any> = { error?: string; data?: T };

const downloadSchema = z.object({
  banco: z.string().min(1, "Selecione o banco."),
  agencia: z.string().min(1, "Informe a agência."),
  contaNumero: z.string().min(1, "Informe o número da conta."),
  periodoInicio: z.string().min(1, "Selecione a data inicial."),
  periodoFim: z.string().min(1, "Selecione a data final."),
  caminhoDestino: z.string().optional(),
});

export async function runAutomatedBankDownloadAction(input: {
  banco: string;
  agencia: string;
  contaNumero: string;
  periodoInicio: string;
  periodoFim: string;
  caminhoDestino?: string;
}): Promise<ActionResult> {
  const parsed = downloadSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const { prisma, user } = context;

    const timestamp = Date.now();
    const destFolder = parsed.data.caminhoDestino || `\\\\SERVIDORMUN\\FINANCEIRO\\EXTRATOS\\${new Date().getFullYear()}\\${parsed.data.banco.split(" ")[0]}`;
    const fileNameCC = `EXTRATO_CC_${parsed.data.contaNumero}_${timestamp}.ofx`;

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

    const fullPath = path.join(destFolder, fileNameCC);

    const logsExecucao = [
      `[${new Date().toLocaleTimeString()}] Conectando ao WebService / Simulador Bancário (${parsed.data.banco})...`,
      `[${new Date().toLocaleTimeString()}] Autenticação autorizada com o Simulador / API Bancária...`,
      `[${new Date().toLocaleTimeString()}] Extrato de Conta Corrente e Aplicação recebidos (${(bankData.tamanhoBytes / 1024).toFixed(2)} KB).`,
      `[${new Date().toLocaleTimeString()}] ${bankData.items.length} movimentações sincronizadas do ambiente simulador.`,
      `[${new Date().toLocaleTimeString()}] Integridade SHA-256 calculada: ${bankData.hashSHA256}`,
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
        caminhoDestino: fullPath,
        formato: bankData.formato,
        hashSHA256: bankData.hashSHA256,
        tamanhoBytes: bankData.tamanhoBytes,
        status: "CONCLUIDO",
        logsExecucao,
        auditLogId: audit.id,
      },
    });

    // Inserir itens de extrato obtidos da integração bancária no banco de dados
    if (bankData.items.length > 0) {
      await prisma.bankStatementItem.createMany({
        data: bankData.items.map((item) => ({
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
        })),
      });
    }

    revalidatePath("/financeiro/download-extratos");
    return { data: downloadRecord };
  } catch (err: any) {
    return { error: err?.message || "Falha na execução da automação bancária." };
  }
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
