"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from 'next/cache';

async function getTenantPrisma() {
  return (await getTenantContextForModule("SAUDE")).prisma;
}

export async function createHealthProfessional(data: any) {
  const prisma = await getTenantPrisma();
  try {
    const existing = await prisma.healthProfessional.findUnique({
      where: { employeeId: data.employeeId }
    });
    if (existing) {
      return { error: "Este servidor já está cadastrado como profissional de saúde." };
    }

    await prisma.healthProfessional.create({
      data: {
        employeeId: data.employeeId,
        specialty: data.specialty || null,
        councilName: data.councilType || null,
        councilNumber: data.councilNumber || null,
        isActive: true,
      }
    });
    revalidatePath('/app-domain/saude/profissionais');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Erro ao criar profissional" };
  }
}

export async function updateHealthProfessional(id: string, data: any) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthProfessional.update({
      where: { id },
      data: {
        specialty: data.specialty || null,
        councilName: data.councilType || null,
        councilNumber: data.councilNumber || null,
      }
    });
    revalidatePath('/app-domain/saude/profissionais');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Erro ao atualizar profissional" };
  }
}

export async function toggleHealthProfessionalStatus(id: string, isActive: boolean) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthProfessional.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath('/app-domain/saude/profissionais');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Erro ao alterar status do profissional" };
  }
}

export async function deleteHealthProfessional(id: string) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthProfessional.delete({
      where: { id },
    });
    revalidatePath('/app-domain/saude/profissionais');
    return { success: true };
  } catch (error: any) {
    return { error: "Não é possível excluir este profissional pois ele possui prontuários ou agendamentos vinculados." };
  }
}
