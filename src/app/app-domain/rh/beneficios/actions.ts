"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveBeneficio(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const baseValue = parseFloat(formData.get("baseValue") as string);
    const supplierId = formData.get("supplierId") as string;
    const isActive = formData.get("isActive") === "true";

    if (!name || !type || isNaN(baseValue)) {
      return { success: false, error: "Nome, Tipo e Valor Base são obrigatórios." };
    }

    const data = {
      name,
      type,
      baseValue,
      supplierId: supplierId && supplierId !== 'none' ? supplierId : null,
      isActive,
    };

    if (id) {
      await prisma.benefitConfig.update({
        where: { id },
        data,
      });
    } else {
      await prisma.benefitConfig.create({
        data,
      });
    }

    revalidatePath("/rh/beneficios");
    return { success: true };
  } catch (error: any) {
    console.error("Erro ao salvar benefício master:", error);
    return { success: false, error: error.message || "Ocorreu um erro ao salvar." };
  }
}

export async function toggleBeneficioStatus(id: string, isActive: boolean) {
  try {
    await prisma.benefitConfig.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/rh/beneficios");
    return { success: true };
  } catch (error: any) {
    console.error("Erro ao alternar status do benefício:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBeneficio(id: string) {
  try {
    // Should check if it has payroll benefits linked before deleting
    const count = await prisma.payrollBenefit.count({ where: { benefitConfigId: id } });
    if (count > 0) {
      return { success: false, error: "Este benefício já está vinculado a servidores e não pode ser excluído. Inative-o em vez disso." };
    }

    await prisma.benefitConfig.delete({
      where: { id },
    });
    revalidatePath("/rh/beneficios");
    return { success: true };
  } catch (error: any) {
    console.error("Erro ao excluir benefício:", error);
    return { success: false, error: error.message || "Erro ao excluir benefício." };
  }
}
