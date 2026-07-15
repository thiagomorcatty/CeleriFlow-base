"use server";

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createHealthTeam(data: any) {
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
  } catch (error: any) {
    if (error.code === 'P2002') return { error: "Já existe uma equipe cadastrada com este código." };
    return { error: error.message || "Erro ao criar equipe" };
  }
}

export async function updateHealthTeam(id: string, data: any) {
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
  } catch (error: any) {
    if (error.code === 'P2002') return { error: "Já existe uma equipe cadastrada com este código." };
    return { error: error.message || "Erro ao atualizar equipe" };
  }
}

export async function toggleHealthTeamStatus(id: string, isActive: boolean) {
  try {
    await prisma.healthTeam.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath('/app-domain/saude/equipes');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Erro ao alterar status da equipe" };
  }
}

export async function deleteHealthTeam(id: string) {
  try {
    await prisma.healthTeam.delete({
      where: { id },
    });
    revalidatePath('/app-domain/saude/equipes');
    return { success: true };
  } catch (error: any) {
    return { error: "Não é possível excluir esta equipe pois ela possui vínculos." };
  }
}
