"use server";

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createHealthUnit(data: any) {
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
