"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProcessStatus(id: string, newStatus: string) {
  const result = await prisma.process.update({
    where: { id },
    data: { status: newStatus }
  });
  revalidatePath("/protocolos/processos");
  revalidatePath("/protocolos/arquivados");
  revalidatePath("/protocolos/busca");
  return result;
}

export async function updateProcessData(id: string, data: { status?: string, description?: string, priority?: string }) {
  const result = await prisma.process.update({
    where: { id },
    data
  });
  revalidatePath("/protocolos/processos");
  revalidatePath("/protocolos/arquivados");
  revalidatePath("/protocolos/busca");
  return result;
}
