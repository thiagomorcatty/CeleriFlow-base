"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from 'next/cache';

async function getTenantPrisma() {
  return (await getTenantContextForModuleEdit("SAUDE")).prisma;
}

type HealthUnitInput = {
  name: string;
  type: string;
  cnes?: string | null;
  phone?: string | null;
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function createHealthUnit(data: HealthUnitInput) {
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
  } catch (error) {
    return { error: getErrorMessage(error, "Erro ao criar unidade de saúde") };
  }
}

export async function updateHealthUnit(id: string, data: HealthUnitInput) {
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
  } catch (error) {
    return { error: getErrorMessage(error, "Erro ao atualizar unidade de saúde") };
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
  } catch (error) {
    return { error: getErrorMessage(error, "Erro ao alterar status da unidade") };
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
  } catch {
    return { error: "Não é possível excluir esta unidade pois ela já possui vínculos no sistema (ex: Equipes, Pacientes)." };
  }
}
