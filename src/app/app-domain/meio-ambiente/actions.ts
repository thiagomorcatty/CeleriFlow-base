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

    revalidatePath("/meio-ambiente/empreendimentos");
    revalidatePath("/meio-ambiente");
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

    revalidatePath("/meio-ambiente/licenciamento");
    revalidatePath("/meio-ambiente/empreendimentos");
    revalidatePath("/meio-ambiente");
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

    revalidatePath("/meio-ambiente/denuncias");
    revalidatePath("/meio-ambiente");
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

    revalidatePath("/meio-ambiente/fiscalizacao");
    revalidatePath("/meio-ambiente");
    return { success: true, inspection };
  } catch (error) {
    console.error("Erro ao agendar vistoria:", error);
    return { error: "Erro ao agendar vistoria. Tente novamente." };
  }
}

export async function createEnvGreenArea(formData: FormData) {
  const name = formData.get("name") as string;
  const areaType = formData.get("areaType") as string;
  const sizeSqmStr = formData.get("sizeSqm") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as string;
  const notes = formData.get("notes") as string;

  if (!name || !areaType) {
    return { error: "Nome e Tipo da Área são obrigatórios." };
  }

  try {
    const sizeSqm = sizeSqmStr ? parseFloat(sizeSqmStr) : null;

    const greenArea = await prisma.envGreenArea.create({
      data: {
        name,
        areaType,
        sizeSqm,
        location,
        status: status || "Preservado",
        notes,
      },
    });

    revalidatePath("/meio-ambiente/areas-verdes");
    revalidatePath("/meio-ambiente");
    return { success: true, greenArea };
  } catch (error) {
    console.error("Erro ao criar área verde:", error);
    return { error: "Erro ao criar área verde. Tente novamente." };
  }
}

export async function createEnvWaste(formData: FormData) {
  const generatorName = formData.get("generatorName") as string;
  const wasteType = formData.get("wasteType") as string;
  const quantityKgStr = formData.get("quantityKg") as string;
  const destination = formData.get("destination") as string;
  const notes = formData.get("notes") as string;
  const enterpriseId = formData.get("enterpriseId") as string;

  if (!generatorName || !wasteType || !quantityKgStr || !destination) {
    return { error: "Gerador, Tipo, Quantidade e Destino são obrigatórios." };
  }

  try {
    const quantityKg = parseFloat(quantityKgStr);

    const waste = await prisma.envWaste.create({
      data: {
        generatorName,
        wasteType,
        quantityKg,
        destination,
        notes,
        enterpriseId: enterpriseId || null,
      },
    });

    revalidatePath("/meio-ambiente/residuos");
    revalidatePath("/meio-ambiente");
    return { success: true, waste };
  } catch (error) {
    console.error("Erro ao registrar resíduo:", error);
    return { error: "Erro ao registrar resíduo. Tente novamente." };
  }
}

export async function createEnvEduProgram(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const targetAudience = formData.get("targetAudience") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const participantsCountStr = formData.get("participantsCount") as string;
  const status = formData.get("status") as string;

  if (!title || !description || !startDateStr) {
    return { error: "Título, Descrição e Data de Início são obrigatórios." };
  }

  try {
    const startDate = new Date(startDateStr);
    const endDate = endDateStr ? new Date(endDateStr) : null;
    const participantsCount = participantsCountStr ? parseInt(participantsCountStr, 10) : null;

    const eduProgram = await prisma.envEduProgram.create({
      data: {
        title,
        description,
        targetAudience,
        startDate,
        endDate,
        participantsCount,
        status: status || "Planejado",
      },
    });

    revalidatePath("/meio-ambiente/educacao");
    revalidatePath("/meio-ambiente");
    return { success: true, eduProgram };
  } catch (error) {
    console.error("Erro ao criar projeto de educação:", error);
    return { error: "Erro ao criar projeto de educação. Tente novamente." };
  }
}

export async function createEnvDocument(formData: FormData) {
  const title = formData.get("title") as string;
  const docType = formData.get("docType") as string;
  const fileUrl = formData.get("fileUrl") as string;
  const enterpriseId = formData.get("enterpriseId") as string;

  if (!title || !docType) {
    return { error: "Título e Tipo de Documento são obrigatórios." };
  }

  try {
    const doc = await prisma.envDocument.create({
      data: {
        title,
        docType,
        fileUrl: fileUrl || "/docs/exemplo.pdf", // valor simulado se não informado
        enterpriseId: enterpriseId || null,
      },
    });

    revalidatePath("/meio-ambiente/documentos");
    revalidatePath("/meio-ambiente");
    return { success: true, document: doc };
  } catch (error) {
    console.error("Erro ao anexar documento:", error);
    return { error: "Erro ao anexar documento. Tente novamente." };
  }
}
