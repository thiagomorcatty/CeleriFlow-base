"use server";

import { FinanceError, cancelSettlement as cancelOfficialSettlement, createSettlement as createOfficialSettlement } from "@/lib/financeiro";
import { assertBudgetUnitAccess, getTenantContextForModuleEdit, type AppContext } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string };
const message = (error: unknown) => error instanceof FinanceError ? error.message : "Não foi possível concluir a liquidação.";

async function assertCommitmentAccess(context: AppContext, commitmentId: string) {
  const commitment = await context.prisma.commitment.findUnique({
    where: { id: commitmentId },
    select: { contractId: true, appropriation: { select: { budgetUnitId: true } } },
  });
  if (!commitment) throw new FinanceError("Empenho não encontrado.");
  assertBudgetUnitAccess(context.user, commitment.appropriation.budgetUnitId);
  return commitment;
}

function revalidateContractExecution(contractId?: string | null) {
  if (!contractId) return;
  revalidatePath("/compras/contratos");
  revalidatePath(`/compras/contratos/${contractId}`);
}

export async function createSettlement(data: {
  date: Date;
  value: number;
  documentRef: string;
  fiscalDocumentNumber?: string;
  fiscalDocumentSeries?: string;
  fiscalDocumentIssueDate?: Date;
  fiscalDocumentAccessKey?: string;
  documentId?: string;
  commitmentId: string;
  authorId: string;
  notes: string;
  serviceCode?: string;
  retentionRuleIds?: string[];
}): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const commitment = await assertCommitmentAccess(context, data.commitmentId);
    await createOfficialSettlement(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, data);
    revalidatePath("/financeiro/liquidacoes");
    revalidatePath("/financeiro/empenhos");
    revalidateContractExecution(commitment.contractId);
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function cancelSettlement(id: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const settlement = await context.prisma.settlement.findUnique({ where: { id }, select: { commitmentId: true } });
    if (!settlement) throw new FinanceError("Liquidação não encontrada.");
    const commitment = await assertCommitmentAccess(context, settlement.commitmentId);
    await cancelOfficialSettlement(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id);
    revalidatePath("/financeiro/liquidacoes");
    revalidatePath("/financeiro/empenhos");
    revalidateContractExecution(commitment.contractId);
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function updateSettlement(_id: string, _data: { date: Date; value: number; documentRef: string; fiscalDocumentNumber?: string; fiscalDocumentSeries?: string; fiscalDocumentIssueDate?: Date; fiscalDocumentAccessKey?: string; documentId?: string; commitmentId: string; authorId: string; notes: string; serviceCode?: string; retentionRuleIds?: string[] }): Promise<ActionResult> {
  void _id;
  void _data;
  return { error: "Liquidações não podem ser editadas. Cancele o registro e realize uma nova liquidação." };
}
