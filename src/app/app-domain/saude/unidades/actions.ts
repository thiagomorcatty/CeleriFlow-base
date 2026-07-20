"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from 'next/cache';

async function getTenantPrisma() {
  return (await getTenantContextForModule("SAUDE")).prisma;
}

export async function createHealthUnit(data: any) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthUnit.create({
      data: {
        name: data.name,
        type: data.type,
        cnes: data.cnes,
        phone: data.phone,
        isActive: true,
      }
    });
    revalidatePath('/app-domain/saude/unidades');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Erro ao criar unidade de saúde" };
  }
}

export async function updateHealthUnit(id: string, data: any) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthUnit.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        cnes: data.cnes,
        phone: data.phone,
      }
    });
    revalidatePath('/app-domain/saude/unidades');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Erro ao atualizar unidade de saúde" };
  }
}

export async function toggleHealthUnitStatus(id: string, isActive: boolean) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthUnit.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath('/app-domain/saude/unidades');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Erro ao alterar status da unidade" };
  }
}

export async function deleteHealthUnit(id: string) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthUnit.delete({
      where: { id },
    });
    revalidatePath('/app-domain/saude/unidades');
    return { success: true };
  } catch (error: any) {
    return { error: "Não é possível excluir esta unidade pois ela já possui vínculos no sistema (ex: Equipes, Pacientes)." };
  }
}
