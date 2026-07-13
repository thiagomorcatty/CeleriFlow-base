"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveBeneficio(formData: FormData) {
  try {
    const id = formData.get("id") as string | null;
    const employeeId = formData.get("employeeId") as string;
    const type = formData.get("type") as string;
    let valueStr = formData.get("value") as string;
    const status = formData.get("status") as string;

    if (!employeeId || !type) {
      return { success: false, error: "Servidor e Tipo de Benefício são obrigatórios." };
    }

    // Clean value string if it contains currency formatting
    if (valueStr) {
      valueStr = valueStr.replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '');
    }
    const value = parseFloat(valueStr) || 0;

    const data = {
      employeeId,
      type,
      value,
      status: status || "Ativo",
    };

    if (id) {
      await prisma.payrollBenefit.update({
        where: { id },
        data,
      });
    } else {
      await prisma.payrollBenefit.create({
        data,
      });
    }

    revalidatePath("/rh/beneficios");
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar benefício:", error);
    return { success: false, error: "Falha ao salvar o benefício." };
  }
}

export async function deleteBeneficio(id: string) {
  try {
    await prisma.payrollBenefit.delete({
      where: { id },
    });
    revalidatePath("/rh/beneficios");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir benefício:", error);
    return { success: false, error: "Falha ao excluir o benefício." };
  }
}
