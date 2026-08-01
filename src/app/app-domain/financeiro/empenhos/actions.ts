"use server";

import { FinanceError, cancelCommitment as cancelOfficialCommitment, createCommitment as createOfficialCommitment } from "@/lib/financeiro";
import { assertBudgetUnitAccess, getTenantContextForModuleEdit, type AppContext } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string };

function message(error: unknown) {
  return error instanceof FinanceError ? error.message : "Não foi possível concluir o empenho.";
}

async function assertCommitmentAccess(context: AppContext, commitmentId: string) {
  const commitment = await context.prisma.commitment.findUnique({
    where: { id: commitmentId },
    select: { appropriation: { select: { budgetUnitId: true } } },
  });
  if (!commitment) throw new FinanceError("Empenho não encontrado.");
  assertBudgetUnitAccess(context.user, commitment.appropriation.budgetUnitId);
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
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const appropriation = await context.prisma.budgetAppropriation.findUnique({
      where: { id: data.appropriationId },
      select: { budgetUnitId: true },
    });
    if (!appropriation) throw new FinanceError("Dotação orçamentária não encontrada.");
    assertBudgetUnitAccess(context.user, appropriation.budgetUnitId);
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
  void _id;
  void _data;
  return { error: "Empenhos não podem ser editados. Anule o registro e emita um novo empenho." };
}

export async function cancelCommitment(id: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await assertCommitmentAccess(context, id);
    await cancelOfficialCommitment(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id);
    revalidatePath("/financeiro/empenhos");
    revalidatePath("/financeiro/orcamento");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}
