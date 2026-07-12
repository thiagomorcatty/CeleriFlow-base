"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
      status: "Pago"
    }
  });

  revalidatePath("/financeiro/pagamentos");
  return payment;
}

export async function cancelPayment(id: string) {
  const payment = await prisma.payment.update({
    where: { id },
    data: { status: "Cancelado" }
  });

  revalidatePath("/financeiro/pagamentos");
  return payment;
}
