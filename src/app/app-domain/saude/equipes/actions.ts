"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from 'next/cache';

async function getTenantPrisma() {
  return (await getTenantContextForModuleEdit("SAUDE")).prisma;
}

type HealthTeamInput = {
  name: string;
  code: string | null;
  microarea: string | null;
  unitId: string;
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function hasErrorCode(error: unknown, code: string) {
  return typeof error === "object" && error !== null && "code" in error && error.code === code;
}

export async function createHealthTeam(data: HealthTeamInput) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthTeam.create({
      data: {
        name: data.name,
        code: data.code,
        microarea: data.microarea,
        unitId: data.unitId,
        isActive: true,
      }
    });
    revalidatePath('/app-domain/saude/equipes');
    return { success: true };
  } catch (error) {
    if (hasErrorCode(error, "P2002")) return { error: "Já existe uma equipe cadastrada com este código." };
    return { error: getErrorMessage(error, "Erro ao criar equipe") };
  }
}

export async function updateHealthTeam(id: string, data: HealthTeamInput) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthTeam.update({
      where: { id },
      data: {
        name: data.name,
        code: data.code,
        microarea: data.microarea,
        unitId: data.unitId,
      }
    });
    revalidatePath('/app-domain/saude/equipes');
    return { success: true };
  } catch (error) {
    if (hasErrorCode(error, "P2002")) return { error: "Já existe uma equipe cadastrada com este código." };
    return { error: getErrorMessage(error, "Erro ao atualizar equipe") };
  }
}

export async function toggleHealthTeamStatus(id: string, isActive: boolean) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthTeam.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath('/app-domain/saude/equipes');
    return { success: true };
  } catch (error) {
    return { error: getErrorMessage(error, "Erro ao alterar status da equipe") };
  }
}

export async function deleteHealthTeam(id: string) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.healthTeam.delete({
      where: { id },
    });
    revalidatePath('/app-domain/saude/equipes');
    return { success: true };
  } catch {
    return { error: "Não é possível excluir esta equipe pois ela possui vínculos." };
  }
}
