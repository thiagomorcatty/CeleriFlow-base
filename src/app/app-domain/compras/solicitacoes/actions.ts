"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePurchaseRequest(id: string) {
  try {
    await prisma.purchaseRequest.delete({
      where: { id },
    });
    revalidatePath("/compras/solicitacoes");
    return { success: true };
  } catch (error) {
    console.error("Error deleting purchase request:", error);
    return { success: false, error: "Falha ao excluir a solicitação." };
  }
}

export async function savePurchaseRequest(formData: FormData) {
  const id = formData.get("id") as string | null;
  const number = formData.get("number") as string;
  const object = formData.get("object") as string;
  const justification = formData.get("justification") as string;
  const estimatedValue = parseFloat(formData.get("estimatedValue") as string) || 0;
  
  // Para fins de demonstração, usaremos as primeiras entidades disponíveis
  const secretariat = await prisma.secretariat.findFirst();
  const department = await prisma.department.findFirst();
  const requester = await prisma.employee.findFirst();

  if (!secretariat || !department || !requester) {
    throw new Error("Dados básicos (Secretaria, Departamento, Funcionario) não encontrados no banco.");
  }

  const data = {
    number,
    object,
    justification,
    estimatedValue,
    secretariatId: secretariat.id,
    departmentId: department.id,
    requesterId: requester.id,
  };

  try {
    if (id) {
      await prisma.purchaseRequest.update({ where: { id }, data });
    } else {
      await prisma.purchaseRequest.create({ data });
    }
    revalidatePath("/compras/solicitacoes");
    return { success: true };
  } catch (error) {
    console.error("Error saving purchase request:", error);
    return { success: false, error: "Falha ao salvar a solicitação." };
  }
}
