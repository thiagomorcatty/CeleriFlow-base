"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModule("ATENDIMENTO")).prisma;
}

export async function updateTicketStatus(id: string, status: string) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.ticket.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/atendimento");
    return { success: true };
  } catch (error) {
    console.error("Failed to update ticket status:", error);
    return { success: false, error: "Falha ao atualizar o status do chamado." };
  }
}

export async function updateOmbudsmanStatus(id: string, status: string) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.ombudsman.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/atendimento/ouvidoria");
    revalidatePath("/atendimento");
    return { success: true };
  } catch (error) {
    console.error("Failed to update ombudsman status:", error);
    return { success: false, error: "Falha ao atualizar o status da manifestação." };
  }
}
