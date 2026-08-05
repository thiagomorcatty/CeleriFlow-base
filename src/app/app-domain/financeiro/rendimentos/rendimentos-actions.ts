"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { calculateInvestmentYield, transmitYieldToMunicipalSystem, YieldType } from "@/lib/financeiro/yield-engine";
import { bankIntegrationClient } from "@/lib/financeiro/bank-integration-client";
import { revalidatePath } from "next/cache";

type ActionResult<T = any> = { error?: string; data?: T };

export async function calculateYieldAction(input: {
  valorBruto: number;
  irrf?: number;
  iof?: number;
  correcaoMonetaria?: number;
  saldoAnteriorAcumulado?: number;
  isEstorno?: boolean;
}): Promise<ActionResult> {
  try {
    const result = calculateInvestmentYield(input);
    return { data: result };
  } catch (err: any) {
    return { error: err?.message || "Erro no cálculo de rendimentos." };
  }
}

export async function transmitYieldAction(input: {
  statementItemId?: string;
  contaNumero: string;
  data: string;
  valorBruto: number;
  irrf: number;
  iof: number;
  correcaoMonetaria: number;
  valorLiquido: number;
  saldoAcumulado: number;
  tipo: YieldType;
}): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const result = await transmitYieldToMunicipalSystem(context.prisma, {
      ...input,
      data: new Date(input.data),
      usuarioId: context.user.id,
    });

    revalidatePath("/financeiro/rendimentos");
    return { data: result };
  } catch (err: any) {
    return { error: err?.message || "Erro na transmissão do rendimento." };
  }
}

export async function getYieldHistoryAction(): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const history = await context.prisma.yieldTransaction.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
    });
    return { data: history };
  } catch (err: any) {
    return { error: err?.message || "Erro ao buscar histórico de rendimentos." };
  }
}

export async function fetchExternalYieldsAction(input: {
  banco: string;
  agencia: string;
  contaNumero: string;
  periodoInicio: string;
  periodoFim: string;
}): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const yields = await bankIntegrationClient.fetchYieldReport(
      {
        banco: input.banco,
        agencia: input.agencia,
        contaNumero: input.contaNumero,
      },
      {
        periodoInicio: input.periodoInicio,
        periodoFim: input.periodoFim,
      }
    );
    const references = yields.map((item) => item.documentoRef).filter((reference): reference is string => Boolean(reference));
    const statementItems = await context.prisma.bankStatementItem.findMany({
      where: { banco: input.banco, agencia: input.agencia, contaNumero: input.contaNumero, codigoTransacao: { in: references } },
      select: { id: true, codigoTransacao: true, treasuryMovementId: true },
    });
    const itemsByReference = new Map(statementItems.map((item) => [item.codigoTransacao, item]));
    return {
      data: yields.map((item) => ({
        ...item,
        statementItemId: item.documentoRef ? itemsByReference.get(item.documentoRef)?.id : undefined,
        alreadyProcessed: Boolean(item.documentoRef && itemsByReference.get(item.documentoRef)?.treasuryMovementId),
      })),
    };
  } catch (err: any) {
    return { error: err?.message || "Erro ao consultar rendimentos no simulador bancário." };
  }
}
