"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModule("FINANCEIRO")).prisma;
}

export async function createPayment(data: {
  orderNumber: string;
  date: Date;
  value: number;
  commitmentId: string;
  settlementId?: string;
  bankAccountId: string;
  supplierId: string;
  paymentMethod: string;
}) {
  const prisma = await getTenantPrisma();
  const payment = await prisma.payment.create({
    data: {
      orderNumber: data.orderNumber,
      date: data.date,
      value: data.value,
      commitmentId: data.commitmentId,
      settlementId: data.settlementId || undefined,
      bankAccountId: data.bankAccountId,
      supplierId: data.supplierId,
      paymentMethod: data.paymentMethod,
      status: "Emitida"
    }
  });

  revalidatePath("/financeiro/pagamentos");
  return payment;
}

export async function cancelPayment(id: string) {
  const prisma = await getTenantPrisma();
  const payment = await prisma.payment.update({
    where: { id },
    data: { status: "Cancelada" }
  });

  revalidatePath("/financeiro/pagamentos");
  return payment;
}

export async function updatePaymentStatus(id: string, status: string) {
  const prisma = await getTenantPrisma();
  const payment = await prisma.payment.update({
    where: { id },
    data: { status }
  });

  revalidatePath("/financeiro/pagamentos");
  return payment;
}
