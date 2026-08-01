"use server";

import { FinanceError, createPayment as createOfficialPayment, updatePaymentStatus as updateOfficialPaymentStatus } from "@/lib/financeiro";
import { assertBudgetUnitAccess, getTenantContextForModuleEdit, type AppContext } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string };
const message = (error: unknown) => error instanceof Error ? error.message : "Não foi possível concluir o pagamento.";

async function assertCommitmentAccess(context: AppContext, commitmentId: string) {
  const commitment = await context.prisma.commitment.findUnique({
    where: { id: commitmentId },
    select: { appropriation: { select: { budgetUnitId: true } } },
  });
  if (!commitment) throw new FinanceError("Empenho não encontrado.");
  assertBudgetUnitAccess(context.user, commitment.appropriation.budgetUnitId);
}

export async function createPayment(data: {
  orderNumber: string;
  date: Date;
  value: number;
  commitmentId: string;
  settlementId: string;
  bankAccountId: string;
  supplierId: string;
  paymentMethod: string;
  serviceCode?: string;
  retentionRuleIds?: string[];
}): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await assertCommitmentAccess(context, data.commitmentId);
    await createOfficialPayment(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, data);
    revalidatePath("/financeiro/pagamentos");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function cancelPayment(id: string): Promise<ActionResult> {
  return updatePaymentStatus(id, "Cancelada");
}

export async function updatePaymentStatus(id: string, status: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const payment = await context.prisma.payment.findUnique({ where: { id }, select: { commitmentId: true } });
    if (!payment) throw new FinanceError("Pagamento não encontrado.");
    await assertCommitmentAccess(context, payment.commitmentId);
    await updateOfficialPaymentStatus(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id, status);
    revalidatePath("/financeiro/pagamentos");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function reversePaymentAction(paymentId: string, justification: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const payment = await context.prisma.payment.findUnique({ where: { id: paymentId }, select: { commitmentId: true } });
    if (!payment) throw new FinanceError("Pagamento não encontrado.");
    await assertCommitmentAccess(context, payment.commitmentId);
    const { reversePayment: reverseOfficialPayment } = await import("@/lib/financeiro");
    await reverseOfficialPayment(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, paymentId, justification);
    revalidatePath("/financeiro/pagamentos");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function settleWithholdingPayableAction(withholdingPayableId: string, bankAccountId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const payable = await context.prisma.withholdingPayable.findUnique({
      where: { id: withholdingPayableId },
      select: { retention: { select: { payment: { select: { commitmentId: true } } } } },
    });
    if (!payable?.retention?.payment?.commitmentId) throw new FinanceError("Consignação/retenção não encontrada.");
    await assertCommitmentAccess(context, payable.retention.payment.commitmentId);

    const bankAccount = await context.prisma.bankAccount.findUnique({ where: { id: bankAccountId }, select: { budgetUnitId: true } });
    if (bankAccount?.budgetUnitId) {
      assertBudgetUnitAccess(context.user, bankAccount.budgetUnitId);
    }

    const { settleWithholdingPayable: settleOfficialWithholding } = await import("@/lib/financeiro");
    await settleOfficialWithholding(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, { withholdingPayableId, bankAccountId, paymentDate: new Date() });
    revalidatePath("/financeiro/pagamentos");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}
