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

export async function savePurchaseRequest(payload: any) {
  const { id, number, object, justification, estimatedValue, items } = payload;
  
  const secretariat = await prisma.secretariat.findFirst();
  const department = await prisma.department.findFirst();
  const requester = await prisma.employee.findFirst();

  if (!secretariat || !department || !requester) {
    throw new Error("Dados básicos (Secretaria, Departamento, Funcionario) não encontrados no banco.");
  }

  try {
    let finalNumber = number;
    if (!finalNumber || finalNumber.trim() === "") {
      const year = new Date().getFullYear();
      const count = await prisma.purchaseRequest.count();
      finalNumber = `REQ-${year}-${String(count + 1).padStart(3, '0')}`;
    }

    const data = {
      number: finalNumber,
      object,
      justification,
      estimatedValue,
      secretariatId: secretariat.id,
      departmentId: department.id,
      requesterId: requester.id,
    };

    let requestId = id;

    if (id) {
      // Atualizar a solicitacao
      await prisma.purchaseRequest.update({ where: { id }, data });
      
      // Deletar os itens antigos para recriar (abordagem simples para sync de itens)
      await prisma.purchaseRequestItem.deleteMany({
        where: { purchaseRequestId: id }
      });
    } else {
      // Criar nova solicitacao
      const newRequest = await prisma.purchaseRequest.create({ data });
      requestId = newRequest.id;
    }

    // Criar os itens
    if (items && items.length > 0) {
      const itemsToCreate = items.map((item: any) => ({
        purchaseRequestId: requestId,
        catalogItemId: item.catalogItemId === "custom" || !item.catalogItemId ? null : item.catalogItemId,
        customName: item.catalogItemId === "custom" || !item.catalogItemId ? item.customName : null,
        quantity: item.quantity,
        estimatedUnitValue: item.estimatedUnitValue || null
      }));

      await prisma.purchaseRequestItem.createMany({
        data: itemsToCreate
      });
    }

    revalidatePath("/compras/solicitacoes");
    return { success: true };
  } catch (error) {
    console.error("Error saving purchase request:", error);
    return { success: false, error: "Falha ao salvar a solicitação." };
  }
}
