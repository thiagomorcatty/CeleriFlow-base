"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addBenefitToEmployee(formData: FormData) {
  try {
    const employeeId = formData.get("employeeId") as string;
    const benefitConfigId = formData.get("benefitConfigId") as string;
    const customValueStr = formData.get("customValue") as string;
    
    if (!employeeId || !benefitConfigId) {
      return { success: false, error: "Servidor e Benefício são obrigatórios." };
    }

    const customValue = customValueStr ? parseFloat(customValueStr) : null;

    await prisma.payrollBenefit.create({
      data: {
        employeeId,
        benefitConfigId,
        customValue,
      }
    });

    revalidatePath(`/rh/servidores/${employeeId}/editar`);
    return { success: true };
  } catch (error: any) {
    console.error("Erro ao conceder benefício:", error);
    return { success: false, error: error.message };
  }
}

export async function removeBenefitFromEmployee(benefitId: string, employeeId: string) {
  try {
    await prisma.payrollBenefit.delete({
      where: { id: benefitId }
    });
    revalidatePath(`/rh/servidores/${employeeId}/editar`);
    return { success: true };
  } catch (error: any) {
    console.error("Erro ao remover benefício:", error);
    return { success: false, error: error.message };
  }
}
