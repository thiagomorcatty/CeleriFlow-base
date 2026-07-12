"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCommitment(data: {
  number: string;
  date: Date;
  value: number;
  type: string;
  history: string;
  appropriationId: string;
  supplierId: string;
}) {
  const commitment = await prisma.commitment.create({
    data: {
      number: data.number,
      date: data.date,
      value: data.value,
      type: data.type,
      history: data.history,
      appropriationId: data.appropriationId,
      supplierId: data.supplierId,
      status: "Emitido"
    }
  });

  revalidatePath("/financeiro/empenhos");
  return commitment;
}

export async function updateCommitment(id: string, data: {
  number?: string;
  date?: Date;
  value?: number;
  type?: string;
  history?: string;
  appropriationId?: string;
  supplierId?: string;
}) {
  const commitment = await prisma.commitment.update({
    where: { id },
    data: {
      number: data.number,
      date: data.date,
      value: data.value,
      type: data.type,
      history: data.history,
      appropriationId: data.appropriationId,
      supplierId: data.supplierId,
    }
  });

  revalidatePath("/financeiro/empenhos");
  return commitment;
}

export async function cancelCommitment(id: string) {
  const commitment = await prisma.commitment.update({
    where: { id },
    data: { status: "Anulado" }
  });

  revalidatePath("/financeiro/empenhos");
  return commitment;
}
