"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createActiveDebt(data: {
  cdaNumber: string;
  year: number;
  originDebtType: string;
  originalValue: number;
  updatedValue: number;
  taxpayerId: string;
}) {
  const result = await prisma.activeDebt.create({
    data: {
      cdaNumber: data.cdaNumber,
      year: data.year,
      originDebtType: data.originDebtType,
      originalValue: data.originalValue,
      updatedValue: data.updatedValue,
      taxpayerId: data.taxpayerId,
      status: "Inscrita"
    }
  });

  revalidatePath("/tributacao/divida");
  return result;
}

export async function updateActiveDebt(id: string, data: {
  cdaNumber?: string;
  year?: number;
  originDebtType?: string;
  originalValue?: number;
  updatedValue?: number;
}) {
  const result = await prisma.activeDebt.update({
    where: { id },
    data
  });

  revalidatePath("/tributacao/divida");
  return result;
}

export async function cancelActiveDebt(id: string) {
  const result = await prisma.activeDebt.update({
    where: { id },
    data: { status: "Cancelada" }
  });

  revalidatePath("/tributacao/divida");
  return result;
}

export async function reactivateActiveDebt(id: string) {
  const result = await prisma.activeDebt.update({
    where: { id },
    data: { status: "Inscrita" }
  });

  revalidatePath("/tributacao/divida");
  return result;
}
