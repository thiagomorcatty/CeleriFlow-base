"use server";

import { FinanceError, cancelSettlement as cancelOfficialSettlement, createSettlement as createOfficialSettlement } from "@/lib/financeiro";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string };
const message = (error: unknown) => error instanceof FinanceError ? error.message : "Não foi possível concluir a liquidação.";

export async function createSettlement(data: { date: Date; value: number; documentRef: string; documentId?: string; commitmentId: string; authorId: string; notes: string }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    await createOfficialSettlement(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, data);
    revalidatePath("/financeiro/liquidacoes");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function cancelSettlement(id: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    await cancelOfficialSettlement(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id);
    revalidatePath("/financeiro/liquidacoes");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function updateSettlement(_id: string, _data: { date: Date; value: number; documentRef: string; documentId?: string; commitmentId: string; authorId: string; notes: string }): Promise<ActionResult> {
  return { error: "Liquidações não podem ser editadas. Cancele o registro e realize uma nova liquidação." };
}
