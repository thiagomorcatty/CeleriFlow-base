"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBidding(id: string) {
  try {
    await prisma.bidding.delete({
      where: { id },
    });
    revalidatePath("/compras/licitacoes");
    return { success: true };
  } catch (error) {
    console.error("Error deleting bidding:", error);
    return { success: false, error: "Falha ao excluir a licitação." };
  }
}

export async function saveBidding(formData: FormData) {
  const id = formData.get("id") as string | null;
  const number = formData.get("number") as string;
  const modality = formData.get("modality") as string;
  
  const process = await prisma.purchaseProcess.findFirst();

  if (!process) {
    throw new Error("Nenhum processo de compra encontrado para vincular à licitação.");
  }

  const data = {
    number,
    modality,
    processId: process.id,
  };

  try {
    if (id) {
      await prisma.bidding.update({ where: { id }, data });
    } else {
      await prisma.bidding.create({ data });
    }
    revalidatePath("/compras/licitacoes");
    return { success: true };
  } catch (error) {
    console.error("Error saving bidding:", error);
    return { success: false, error: "Falha ao salvar a licitação." };
  }
}
