"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { nextYearlyCode } from "@/lib/sequence";

async function getTenantPrisma() {
  return (await getTenantContextForModule("COMPRAS")).prisma;
}

export async function deletePurchaseRequest(id: string) {
  const prisma = await getTenantPrisma();
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
  const prisma = await getTenantPrisma();
  const { id, number, object, justification, estimatedValue, items, secretariatId, departmentId } = payload;
  
  const secretariat = secretariatId ? await prisma.secretariat.findUnique({ where: { id: secretariatId } }) : await prisma.secretariat.findFirst();
  const department = departmentId ? await prisma.department.findUnique({ where: { id: departmentId } }) : await prisma.department.findFirst();
  const requester = await prisma.employee.findFirst();

  if (!secretariat || !department || !requester) {
    throw new Error("Dados básicos (Secretaria, Departamento, Funcionario) não encontrados no banco.");
  }

  try {
    let finalNumber = number?.trim();
    if (!finalNumber && !id) {
      const requests = await prisma.purchaseRequest.findMany({ select: { number: true } });
      finalNumber = await nextYearlyCode({ key: "compras-solicitacao", prefix: "REQ", existingCodes: requests.map(({ number }) => ({ code: number })) });
    }
    if (!finalNumber) {
      return { success: false, error: "Informe o número da solicitação." };
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
        materialId: item.catalogItemId === "custom" || !item.catalogItemId ? null : item.catalogItemId,
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
