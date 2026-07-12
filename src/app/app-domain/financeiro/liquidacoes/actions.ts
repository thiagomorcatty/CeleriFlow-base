"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSettlement(data: {
  date: Date;
  value: number;
  documentRef: string;
  commitmentId: string;
  authorId: string;
  notes: string;
}) {
  const settlement = await prisma.settlement.create({
    data: {
      date: data.date,
      value: data.value,
      documentRef: data.documentRef,
      commitmentId: data.commitmentId,
      authorId: data.authorId,
      notes: data.notes,
      status: "Liquidado"
    }
  });

  revalidatePath("/financeiro/liquidacoes");
  return settlement;
}

export async function cancelSettlement(id: string) {
  const settlement = await prisma.settlement.update({
    where: { id },
    data: { status: "Cancelado" }
  });

  revalidatePath("/financeiro/liquidacoes");
  return settlement;
}
