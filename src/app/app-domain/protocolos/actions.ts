"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModule("PROTOCOLOS")).prisma;
}

export async function updateProcessStatus(id: string, newStatus: string) {
  const prisma = await getTenantPrisma();
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
  const prisma = await getTenantPrisma();
  const result = await prisma.process.update({
    where: { id },
    data
  });
  revalidatePath("/protocolos/processos");
  revalidatePath("/protocolos/arquivados");
  revalidatePath("/protocolos/busca");
  return result;
}
