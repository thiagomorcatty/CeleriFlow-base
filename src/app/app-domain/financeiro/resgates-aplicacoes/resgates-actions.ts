"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { classifyBankMovement, sendMovementToMunicipalSystem, ClassificationType } from "@/lib/financeiro/classification-engine";
import { revalidatePath } from "next/cache";

type ActionResult<T = any> = { error?: string; data?: T };

export async function getBankStatementItemsAction(): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const items = await context.prisma.bankStatementItem.findMany({
      orderBy: { date: "desc" },
      take: 20,
    });
    return { data: items };
  } catch (err: any) {
    return { error: err?.message || "Erro ao carregar lançamentos bancários." };
  }
}

export async function classifyItemAction(input: {
  descricao: string;
  codigoTransacao?: string;
  sinal: "CREDITO" | "DEBITO";
  valor: number;
  banco?: string;
  contaNumero?: string;
}): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const result = await classifyBankMovement(context.prisma, input);
    return { data: result };
  } catch (err: any) {
    return { error: err?.message || "Erro ao classificar lançamento." };
  }
}

export async function transmitItemAction(input: {
  statementItemId?: string;
  banco: string;
  contaNumero: string;
  categoria: ClassificationType;
  valor: number;
  dataMovimento: string;
  descricao: string;
}): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const receipt = await sendMovementToMunicipalSystem(context.prisma, {
      ...input,
      dataMovimento: new Date(input.dataMovimento),
      usuarioId: context.user.id,
    });

    revalidatePath("/financeiro/resgates-aplicacoes");
    return { data: receipt };
  } catch (err: any) {
    return { error: err?.message || "Erro ao transmitir lançamento ao sistema municipal." };
  }
}
