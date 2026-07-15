"use server";

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPatient(data: any) {
  try {
    let personId = data.personId;

    // Se nao enviou personId, cria uma nova pessoa
    if (!personId) {
      if (!data.fullName) {
        return { error: "Nome completo é obrigatório para cadastrar um novo paciente." };
      }
      
      const newPerson = await prisma.person.create({
        data: {
          fullName: data.fullName,
          cpf: data.cpf || null,
          birthDate: data.birthDate ? new Date(data.birthDate) : null,
        }
      });
      personId = newPerson.id;
    } else {
      // Verificar se já existe paciente com este Person ID
      const existing = await prisma.patient.findUnique({
        where: { personId }
      });
      if (existing) {
        return { error: "Esta pessoa já possui um registro de paciente." };
      }
    }

    await prisma.patient.create({
      data: {
        personId: personId,
        cns: data.cns || null,
        bloodType: data.bloodType || null,
        referenceUnitId: data.referenceUnitId || null,
        teamId: data.teamId || null,
        status: "Ativo",
      }
    });
    revalidatePath('/app-domain/saude/pacientes');
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') return { error: "Já existe um paciente cadastrado com este CNS ou CPF." };
    return { error: error.message || "Erro ao criar paciente" };
  }
}

export async function updatePatient(id: string, data: any) {
  try {
    await prisma.patient.update({
      where: { id },
      data: {
        cns: data.cns || null,
        bloodType: data.bloodType || null,
        referenceUnitId: data.referenceUnitId || null,
        teamId: data.teamId || null,
      }
    });
    revalidatePath('/app-domain/saude/pacientes');
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') return { error: "Já existe um paciente cadastrado com este CNS." };
    return { error: error.message || "Erro ao atualizar paciente" };
  }
}

export async function togglePatientStatus(id: string, currentStatus: string) {
  try {
    const newStatus = currentStatus === "Ativo" ? "Inativo" : "Ativo";
    await prisma.patient.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath('/app-domain/saude/pacientes');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Erro ao alterar status do paciente" };
  }
}

export async function deletePatient(id: string) {
  try {
    await prisma.patient.delete({
      where: { id },
    });
    revalidatePath('/app-domain/saude/pacientes');
    return { success: true };
  } catch (error: any) {
    return { error: "Não é possível excluir este paciente pois ele possui prontuários ou agendamentos vinculados." };
  }
}
