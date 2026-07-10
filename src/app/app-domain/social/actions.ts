"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSocialUnit(data: { name: string; type: string; phone?: string; email?: string; addressId?: string; managerId?: string }) {
  try {
    const unit = await prisma.socialUnit.create({
      data: {
        name: data.name,
        type: data.type,
        phone: data.phone,
        email: data.email,
        addressId: data.addressId,
        managerId: data.managerId,
      },
    });
    revalidatePath("/app-domain/social/unidades");
    return { success: true, data: unit };
  } catch (error) {
    console.error("Error creating social unit:", error);
    return { success: false, error: "Falha ao criar unidade socioassistencial." };
  }
}

export async function createFamily(data: { representativeId: string; nis?: string; familyCode?: string; income?: number; perCapitaIncome?: number; vulnerabilities?: string }) {
  try {
    const family = await prisma.socialFamily.create({
      data: {
        representativeId: data.representativeId,
        nis: data.nis,
        familyCode: data.familyCode,
        income: data.income,
        perCapitaIncome: data.perCapitaIncome,
        vulnerabilities: data.vulnerabilities,
      },
    });
    revalidatePath("/app-domain/social/familias");
    return { success: true, data: family };
  } catch (error) {
    console.error("Error creating family:", error);
    return { success: false, error: "Falha ao cadastrar família." };
  }
}

export async function createAttendance(data: { familyId: string; unitId: string; professionalId: string; type: string; description: string; secrecyLevel?: string; personId?: string }) {
  try {
    const attendance = await prisma.socialAttendance.create({
      data: {
        familyId: data.familyId,
        unitId: data.unitId,
        professionalId: data.professionalId,
        type: data.type,
        description: data.description,
        secrecyLevel: data.secrecyLevel || "Normal",
        personId: data.personId,
      },
    });
    revalidatePath("/app-domain/social/atendimentos");
    return { success: true, data: attendance };
  } catch (error) {
    console.error("Error creating attendance:", error);
    return { success: false, error: "Falha ao registrar atendimento." };
  }
}

export async function createBenefitConcession(data: { benefitId: string; familyId: string; professionalId: string; quantity?: number; value?: number; personId?: string }) {
  try {
    const concession = await prisma.socialBenefitConcession.create({
      data: {
        benefitId: data.benefitId,
        familyId: data.familyId,
        professionalId: data.professionalId,
        quantity: data.quantity || 1,
        value: data.value,
        personId: data.personId,
      },
    });
    revalidatePath("/app-domain/social/beneficios");
    return { success: true, data: concession };
  } catch (error) {
    console.error("Error creating benefit concession:", error);
    return { success: false, error: "Falha ao registrar concessão de benefício." };
  }
}
