"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEnvEnterprise(formData: FormData) {
  const name = formData.get("name") as string;
  const cnpjCpf = formData.get("cnpjCpf") as string;
  const activityType = formData.get("activityType") as string;
  const potentialRisk = formData.get("potentialRisk") as string;
  const address = formData.get("address") as string;

  if (!name) {
    return { error: "Nome é obrigatório." };
  }

  try {
    const enterprise = await prisma.envEnterprise.create({
      data: {
        name,
        cnpjCpf,
        activityType,
        potentialRisk,
        address,
      },
    });

    revalidatePath("/app-domain/meio-ambiente/empreendimentos");
    revalidatePath("/app-domain/meio-ambiente");
    return { success: true, enterprise };
  } catch (error) {
    console.error("Erro ao criar empreendimento:", error);
    return { error: "Erro ao criar empreendimento. Tente novamente." };
  }
}

export async function createEnvLicense(formData: FormData) {
  const licenseNumber = formData.get("licenseNumber") as string;
  const licenseType = formData.get("licenseType") as string;
  const enterpriseId = formData.get("enterpriseId") as string;
  const validUntilStr = formData.get("validUntil") as string;

  if (!licenseNumber || !licenseType || !enterpriseId) {
    return { error: "Número, Tipo e Empreendimento são obrigatórios." };
  }

  try {
    const validUntil = validUntilStr ? new Date(validUntilStr) : null;
    
    const license = await prisma.envLicense.create({
      data: {
        licenseNumber,
        licenseType,
        enterpriseId,
        validUntil,
      },
    });

    revalidatePath("/app-domain/meio-ambiente/licenciamento");
    revalidatePath("/app-domain/meio-ambiente/empreendimentos");
    revalidatePath("/app-domain/meio-ambiente");
    return { success: true, license };
  } catch (error) {
    console.error("Erro ao criar licença:", error);
    return { error: "Erro ao criar licença. Verifique se o número já existe." };
  }
}

export async function createEnvComplaint(formData: FormData) {
  const complaintType = formData.get("complaintType") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const isAnonymous = formData.get("isAnonymous") === "true";

  if (!complaintType || !description) {
    return { error: "Tipo e descrição são obrigatórios." };
  }

  try {
    const complaint = await prisma.envComplaint.create({
      data: {
        complaintType,
        description,
        address,
        isAnonymous,
      },
    });

    revalidatePath("/app-domain/meio-ambiente/denuncias");
    revalidatePath("/app-domain/meio-ambiente");
    return { success: true, complaint };
  } catch (error) {
    console.error("Erro ao registrar denúncia:", error);
    return { error: "Erro ao registrar denúncia. Tente novamente." };
  }
}

export async function createEnvInspection(formData: FormData) {
  const dateScheduledStr = formData.get("dateScheduled") as string;
  const inspector = formData.get("inspector") as string;
  const notes = formData.get("notes") as string;
  const enterpriseId = formData.get("enterpriseId") as string; // Opcional

  if (!dateScheduledStr || !inspector) {
    return { error: "Data agendada e Fiscal são obrigatórios." };
  }

  try {
    const dateScheduled = new Date(dateScheduledStr);
    
    const inspection = await prisma.envInspection.create({
      data: {
        dateScheduled,
        inspector,
        notes,
        enterpriseId: enterpriseId || null,
      },
    });

    revalidatePath("/app-domain/meio-ambiente/fiscalizacao");
    revalidatePath("/app-domain/meio-ambiente");
    return { success: true, inspection };
  } catch (error) {
    console.error("Erro ao agendar vistoria:", error);
    return { error: "Erro ao agendar vistoria. Tente novamente." };
  }
}
