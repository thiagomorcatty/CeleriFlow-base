"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModule("FINANCEIRO")).prisma;
}

export async function createSettlement(data: {
  date: Date;
  value: number;
  documentRef: string;
  commitmentId: string;
  authorId: string;
  notes: string;
}) {
  const prisma = await getTenantPrisma();
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
  const prisma = await getTenantPrisma();
  const settlement = await prisma.settlement.update({
    where: { id },
    data: { status: "Cancelado" }
  });

  revalidatePath("/financeiro/liquidacoes");
  return settlement;
}

export async function updateSettlement(id: string, data: {
  date: Date;
  value: number;
  documentRef: string;
  commitmentId: string;
  authorId: string;
  notes: string;
}) {
  const prisma = await getTenantPrisma();
  const settlement = await prisma.settlement.update({
    where: { id },
    data: {
      date: data.date,
      value: data.value,
      documentRef: data.documentRef,
      commitmentId: data.commitmentId,
      authorId: data.authorId,
      notes: data.notes
    }
  });

  revalidatePath("/financeiro/liquidacoes");
  return settlement;
}
