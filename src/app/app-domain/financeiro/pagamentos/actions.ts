"use server";

import { FinanceError, createPayment as createOfficialPayment, updatePaymentStatus as updateOfficialPaymentStatus } from "@/lib/financeiro";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string };
const message = (error: unknown) => error instanceof FinanceError ? error.message : "Não foi possível concluir o pagamento.";

export async function createPayment(data: { orderNumber: string; date: Date; value: number; commitmentId: string; settlementId?: string; bankAccountId: string; supplierId: string; paymentMethod: string; isExceptional?: boolean; exceptionJustification?: string; retentions?: { type: string; value: number; beneficiaryName: string; beneficiaryDocument?: string; description?: string; dueDate?: Date }[] }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
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
    const context = await getTenantContextForModule("FINANCEIRO");
    await updateOfficialPaymentStatus(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id, status);
    revalidatePath("/financeiro/pagamentos");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}
