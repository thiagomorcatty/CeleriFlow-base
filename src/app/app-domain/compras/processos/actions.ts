"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { nextYearlyCode } from "@/lib/sequence";

async function getTenantPrisma() {
  return (await getTenantContextForModuleEdit("COMPRAS")).prisma;
}

type PurchaseProcessItemInput = {
  catalogItemId: string;
  customName: string;
  quantity: number;
  estimatedUnitValue: number;
};

type PurchaseProcessInput = {
  id?: string;
  number: string;
  object: string;
  type: string;
  modality: string;
  estimatedValue: number;
  items: PurchaseProcessItemInput[];
};

export async function deletePurchaseProcess(id: string) {
  const prisma = await getTenantPrisma();
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

export async function savePurchaseProcess(payload: PurchaseProcessInput) {
  const prisma = await getTenantPrisma();
  const { id, number, object, type, modality, estimatedValue, items } = payload;
  
  const secretariat = await prisma.secretariat.findFirst();

  if (!secretariat) {
    throw new Error("Secretaria não encontrada no banco.");
  }

  try {
    let finalNumber = number?.trim();
    if (!finalNumber && !id) {
      const processes = await prisma.purchaseProcess.findMany({ select: { number: true } });
      finalNumber = await nextYearlyCode({ prisma, key: "compras-processo", prefix: "PROC", existingCodes: processes.map(({ number }) => ({ code: number })) });
    }
    if (!finalNumber) {
      return { success: false, error: "Informe o número do processo." };
    }

    const data = {
      number: finalNumber,
      object,
      type,
      modality,
      estimatedValue,
      secretariatId: secretariat.id,
    };

    let processId: string;

    if (id) {
      await prisma.purchaseProcess.update({ where: { id }, data });
      processId = id;
      
      await prisma.purchaseProcessItem.deleteMany({
        where: { purchaseProcessId: id }
      });
    } else {
      const newProcess = await prisma.purchaseProcess.create({ data });
      processId = newProcess.id;
    }

    if (items && items.length > 0) {
      const itemsToCreate = items.map((item) => ({
        purchaseProcessId: processId,
        materialId: item.catalogItemId === "custom" || !item.catalogItemId ? null : item.catalogItemId,
        customName: item.catalogItemId === "custom" || !item.catalogItemId ? item.customName : null,
        quantity: item.quantity,
        estimatedUnitValue: item.estimatedUnitValue || null
      }));

      await prisma.purchaseProcessItem.createMany({
        data: itemsToCreate
      });
    }

    revalidatePath("/compras/processos");
    return { success: true };
  } catch (error) {
    console.error("Error saving purchase process:", error);
    return { success: false, error: "Falha ao salvar o processo." };
  }
}
