"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from 'next/cache';

async function getTenantPrisma() {
  return (await getTenantContextForModuleEdit("SAUDE")).prisma;
}

type PatientInput = {
  personId: string;
  cns?: string | null;
  bloodType?: string | null;
  referenceUnitId?: string | null;
  teamId?: string | null;
  fullName?: string;
  cpf?: string | null;
  birthDate?: string;
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function hasErrorCode(error: unknown, code: string) {
  return typeof error === "object" && error !== null && "code" in error && error.code === code;
}

export async function createPatient(data: PatientInput) {
  const prisma = await getTenantPrisma();
  try {
    let personId = data.personId;

    // Se nao enviou personId, cria uma nova pessoa
    if (!personId) {
      const cpf = data.cpf?.trim();
      if (!data.fullName || !cpf) {
        return { error: "Nome completo e CPF são obrigatórios para cadastrar um novo paciente." };
      }
      
      const newPerson = await prisma.person.create({
        data: {
          fullName: data.fullName,
          cpf,
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
  } catch (error) {
    if (hasErrorCode(error, "P2002")) return { error: "Já existe um paciente cadastrado com este CNS ou CPF." };
    return { error: getErrorMessage(error, "Erro ao criar paciente") };
  }
}

export async function updatePatient(id: string, data: PatientInput) {
  const prisma = await getTenantPrisma();
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
  } catch (error) {
    if (hasErrorCode(error, "P2002")) return { error: "Já existe um paciente cadastrado com este CNS." };
    return { error: getErrorMessage(error, "Erro ao atualizar paciente") };
  }
}

export async function togglePatientStatus(id: string, currentStatus: string) {
  const prisma = await getTenantPrisma();
  try {
    const newStatus = currentStatus === "Ativo" ? "Inativo" : "Ativo";
    await prisma.patient.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath('/app-domain/saude/pacientes');
    return { success: true };
  } catch (error) {
    return { error: getErrorMessage(error, "Erro ao alterar status do paciente") };
  }
}

export async function deletePatient(id: string) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.patient.delete({
      where: { id },
    });
    revalidatePath('/app-domain/saude/pacientes');
    return { success: true };
  } catch {
    return { error: "Não é possível excluir este paciente pois ele possui prontuários ou agendamentos vinculados." };
  }
}
