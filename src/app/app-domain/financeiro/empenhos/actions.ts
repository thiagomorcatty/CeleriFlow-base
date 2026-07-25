"use server";

import { FinanceError, cancelCommitment as cancelOfficialCommitment, createCommitment as createOfficialCommitment } from "@/lib/financeiro";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string };

function message(error: unknown) {
  return error instanceof FinanceError ? error.message : "Não foi possível concluir o empenho.";
}

export async function createCommitment(data: {
  number: string;
  date: Date;
  value: number;
  type: string;
  history: string;
  appropriationId: string;
  supplierId: string;
  reservationId: string;
  processId?: string;
  contractId?: string;
}): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    await createOfficialCommitment(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, data);
    revalidatePath("/financeiro/empenhos");
    revalidatePath("/financeiro/orcamento");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

// Financial values are corrected through cancellation and a new official record.
export async function updateCommitment(_id: string, _data: {
  number?: string;
  date?: Date;
  value?: number;
  type?: string;
  history?: string;
  appropriationId?: string;
  supplierId?: string;
  processId?: string;
  contractId?: string;
}): Promise<ActionResult> {
  return { error: "Empenhos não podem ser editados. Anule o registro e emita um novo empenho." };
}

export async function cancelCommitment(id: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    await cancelOfficialCommitment(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id);
    revalidatePath("/financeiro/empenhos");
    revalidatePath("/financeiro/orcamento");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}
