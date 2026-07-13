"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteContract(id: string) {
  try {
    await prisma.contract.delete({
      where: { id },
    });
    revalidatePath("/compras/contratos");
    return { success: true };
  } catch (error) {
    console.error("Error deleting contract:", error);
    return { success: false, error: "Falha ao excluir o contrato." };
  }
}

export async function saveContract(formData: FormData) {
  const id = formData.get("id") as string | null;
  const number = formData.get("number") as string;
  const object = formData.get("object") as string;
  const initialValue = parseFloat(formData.get("initialValue") as string) || 0;
  
  const process = await prisma.purchaseProcess.findFirst();
  const supplier = await prisma.supplier.findFirst();
  const secretariat = await prisma.secretariat.findFirst();

  if (!process || !supplier || !secretariat) {
    throw new Error("Dados básicos (Processo, Fornecedor, Secretaria) não encontrados no banco.");
  }

  const data = {
    number,
    object,
    initialValue,
    updatedValue: initialValue,
    startDate: new Date(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    processId: process.id,
    supplierId: supplier.id,
    secretariatId: secretariat.id,
  };

  try {
    if (id) {
      await prisma.contract.update({ where: { id }, data });
    } else {
      await prisma.contract.create({ data });
    }
    revalidatePath("/compras/contratos");
    return { success: true };
  } catch (error) {
    console.error("Error saving contract:", error);
    return { success: false, error: "Falha ao salvar o contrato." };
  }
}
