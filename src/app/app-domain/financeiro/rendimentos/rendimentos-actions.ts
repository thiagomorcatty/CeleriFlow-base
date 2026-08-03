"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { calculateInvestmentYield, transmitYieldToMunicipalSystem, YieldType } from "@/lib/financeiro/yield-engine";
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
