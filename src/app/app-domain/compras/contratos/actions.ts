"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModule("COMPRAS")).prisma;
}

export async function deleteContract(id: string) {
  const prisma = await getTenantPrisma();
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
  const prisma = await getTenantPrisma();
  const id = formData.get("id") as string | null;
  const number = formData.get("number") as string;
  const object = formData.get("object") as string;
  const initialValue = parseFloat(formData.get("initialValue") as string) || 0;
  
  const processId = formData.get("processId") as string;
  const supplierId = formData.get("supplierId") as string;
  const secretariatId = formData.get("secretariatId") as string;

  if (!processId || !supplierId || !secretariatId) {
    throw new Error("Dados básicos (Processo, Fornecedor, Secretaria) não foram selecionados.");
  }

  const data = {
    number,
    object,
    initialValue,
    updatedValue: initialValue,
    startDate: new Date(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    processId,
    supplierId,
    secretariatId,
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
