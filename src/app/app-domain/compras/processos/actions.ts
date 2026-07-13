"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePurchaseProcess(id: string) {
  try {
    await prisma.purchaseProcess.delete({
      where: { id },
    });
    revalidatePath("/compras/processos");
    return { success: true };
  } catch (error) {
    console.error("Error deleting purchase process:", error);
    return { success: false, error: "Falha ao excluir o processo." };
  }
}

export async function savePurchaseProcess(formData: FormData) {
  const id = formData.get("id") as string | null;
  const number = formData.get("number") as string;
  const object = formData.get("object") as string;
  const type = formData.get("type") as string;
  const modality = formData.get("modality") as string;
  const estimatedValue = parseFloat(formData.get("estimatedValue") as string) || 0;
  
  const secretariat = await prisma.secretariat.findFirst();

  if (!secretariat) {
    throw new Error("Secretaria não encontrada no banco.");
  }

  const data = {
    number,
    object,
    type,
    modality,
    estimatedValue,
    secretariatId: secretariat.id,
  };

  try {
    if (id) {
      await prisma.purchaseProcess.update({ where: { id }, data });
    } else {
      await prisma.purchaseProcess.create({ data });
    }
    revalidatePath("/compras/processos");
    return { success: true };
  } catch (error) {
    console.error("Error saving purchase process:", error);
    return { success: false, error: "Falha ao salvar o processo." };
  }
}
