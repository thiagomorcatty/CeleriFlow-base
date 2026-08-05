"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { cancelTaxGuide, confirmTaxPayment } from "@/lib/tributacao";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return getTenantContextForModuleEdit("TRIBUTACAO");
}

export async function payGuide(guideId: string, amount: number) {
  const context = await getTenantPrisma();
  const paymentDate = new Date();
  const idempotencyKey = `TRIBUTARIO:MANUAL_GUIDE:${guideId}:${amount.toFixed(2)}:${paymentDate.toISOString().slice(0, 10)}`;
  const result = await confirmTaxPayment(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, {
    guideId,
    amountPaid: amount,
    paymentDate,
    paymentMethod: "Manual",
    idempotencyKey,
  });

  revalidatePath("/tributacao/guias");
  return result;
}

export async function cancelGuide(guideId: string) {
  const context = await getTenantPrisma();
  const result = await cancelTaxGuide(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, guideId);

  revalidatePath("/tributacao/guias");
  return result;
}
