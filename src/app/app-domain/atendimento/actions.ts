"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTicketStatus(id: string, status: string) {
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
