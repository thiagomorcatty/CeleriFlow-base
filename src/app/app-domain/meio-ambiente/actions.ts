"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function createEnvEnterprise(formData: FormData) {
  const name = formData.get("name") as string;
  const cnpjCpf = formData.get("cnpjCpf") as string;
  const activityType = formData.get("activityType") as string;
  const potentialRisk = formData.get("potentialRisk") as string;
  const address = formData.get("address") as string;
  if (!name) return { error: "Nome e obrigatorio." };
  try {
    const enterprise = await prisma.envEnterprise.create({ data: { name, cnpjCpf, activityType, potentialRisk, address } });
    revalidatePath("/meio-ambiente/empreendimentos");
    revalidatePath("/meio-ambiente");
    return { success: true, enterprise };
  } catch (error) {
    console.error("Erro ao criar empreendimento:", error);
    return { error: "Erro ao criar empreendimento. Tente novamente." };
  }
}

export async function deleteEnvEnterprise(id: string) {
  try {
    await prisma.envEnterprise.delete({ where: { id } });
    revalidatePath("/meio-ambiente/empreendimentos");
    revalidatePath("/meio-ambiente");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir empreendimento:", error);
    return { error: "Erro ao excluir. Verifique se nao ha registros vinculados." };
  }
}

export async function createEnvLicense(formData: FormData) {
  const licenseNumber = formData.get("licenseNumber") as string;
  const licenseType = formData.get("licenseType") as string;
  const enterpriseId = formData.get("enterpriseId") as string;
  const validUntilStr = formData.get("validUntil") as string;
  if (!licenseNumber || !licenseType || !enterpriseId) return { error: "Numero, Tipo e Empreendimento sao obrigatorios." };
  try {
    const validUntil = validUntilStr ? new Date(validUntilStr) : null;
    const license = await prisma.envLicense.create({ data: { licenseNumber, licenseType, enterpriseId, validUntil } });
    revalidatePath("/meio-ambiente/licenciamento");
    revalidatePath("/meio-ambiente/empreendimentos");
    revalidatePath("/meio-ambiente");
    return { success: true, license };
  } catch (error) {
    console.error("Erro ao criar licenca:", error);
    return { error: "Erro ao criar licenca. Verifique se o numero ja existe." };
  }
}

export async function deleteEnvLicense(id: string) {
  try {
    await prisma.envLicense.delete({ where: { id } });
    revalidatePath("/meio-ambiente/licenciamento");
    revalidatePath("/meio-ambiente");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir licenca:", error);
    return { error: "Erro ao excluir licenca." };
  }
}

export async function createEnvComplaint(formData: FormData) {
  const complaintType = formData.get("complaintType") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const isAnonymous = formData.get("isAnonymous") === "true";
  if (!complaintType || !description) return { error: "Tipo e descricao sao obrigatorios." };
  try {
    const complaint = await prisma.envComplaint.create({ data: { complaintType, description, address, isAnonymous } });
    revalidatePath("/meio-ambiente/denuncias");
    revalidatePath("/meio-ambiente");
    return { success: true, complaint };
  } catch (error) {
    console.error("Erro ao registrar denuncia:", error);
    return { error: "Erro ao registrar denuncia. Tente novamente." };
  }
}

export async function updateEnvComplaintStatus(id: string, status: string) {
  try {
    await prisma.envComplaint.update({ where: { id }, data: { status } });
    revalidatePath("/meio-ambiente/denuncias");
    revalidatePath("/meio-ambiente");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar status da denuncia:", error);
    return { error: "Erro ao atualizar status." };
  }
}

export async function deleteEnvComplaint(id: string) {
  try {
    await prisma.envComplaint.delete({ where: { id } });
    revalidatePath("/meio-ambiente/denuncias");
    revalidatePath("/meio-ambiente");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir denuncia:", error);
    return { error: "Erro ao excluir denuncia." };
  }
}

export async function createEnvInspection(formData: FormData) {
  const dateScheduledStr = formData.get("dateScheduled") as string;
  const inspector = formData.get("inspector") as string;
  const notes = formData.get("notes") as string;
  const enterpriseId = formData.get("enterpriseId") as string;
  if (!dateScheduledStr || !inspector) return { error: "Data agendada e Fiscal sao obrigatorios." };
  try {
    const dateScheduled = new Date(dateScheduledStr);
    const inspection = await prisma.envInspection.create({ data: { dateScheduled, inspector, notes, enterpriseId: enterpriseId || null } });
    revalidatePath("/meio-ambiente/fiscalizacao");
    revalidatePath("/meio-ambiente");
    return { success: true, inspection };
  } catch (error) {
    console.error("Erro ao agendar vistoria:", error);
    return { error: "Erro ao agendar vistoria. Tente novamente." };
  }
}

export async function deleteEnvInspection(id: string) {
  try {
    await prisma.envInspection.delete({ where: { id } });
    revalidatePath("/meio-ambiente/fiscalizacao");
    revalidatePath("/meio-ambiente");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir vistoria:", error);
    return { error: "Erro ao excluir vistoria." };
  }
}

export async function createEnvGreenArea(formData: FormData) {
  const name = formData.get("name") as string;
  const areaType = formData.get("areaType") as string;
  const sizeSqmStr = formData.get("sizeSqm") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as string;
  const notes = formData.get("notes") as string;
  if (!name || !areaType) return { error: "Nome e Tipo da Area sao obrigatorios." };
  try {
    const sizeSqm = sizeSqmStr ? parseFloat(sizeSqmStr) : null;
    const greenArea = await prisma.envGreenArea.create({ data: { name, areaType, sizeSqm, location, status: status || "Preservado", notes } });
    revalidatePath("/meio-ambiente/areas-verdes");
    revalidatePath("/meio-ambiente");
    return { success: true, greenArea };
  } catch (error) {
    console.error("Erro ao criar area verde:", error);
    return { error: "Erro ao criar area verde. Tente novamente." };
  }
}

export async function deleteEnvGreenArea(id: string) {
  try {
    await prisma.envGreenArea.delete({ where: { id } });
    revalidatePath("/meio-ambiente/areas-verdes");
    revalidatePath("/meio-ambiente");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir area verde:", error);
    return { error: "Erro ao excluir area verde." };
  }
}

export async function createEnvWaste(formData: FormData) {
  const generatorName = formData.get("generatorName") as string;
  const wasteType = formData.get("wasteType") as string;
  const quantityKgStr = formData.get("quantityKg") as string;
  const destination = formData.get("destination") as string;
  const notes = formData.get("notes") as string;
  const enterpriseId = formData.get("enterpriseId") as string;
  if (!generatorName || !wasteType || !quantityKgStr || !destination) return { error: "Gerador, Tipo, Quantidade e Destino sao obrigatorios." };
  try {
    const quantityKg = parseFloat(quantityKgStr);
    const waste = await prisma.envWaste.create({ data: { generatorName, wasteType, quantityKg, destination, notes, enterpriseId: enterpriseId || null } });
    revalidatePath("/meio-ambiente/residuos");
    revalidatePath("/meio-ambiente");
    return { success: true, waste };
  } catch (error) {
    console.error("Erro ao registrar residuo:", error);
    return { error: "Erro ao registrar residuo. Tente novamente." };
  }
}

export async function deleteEnvWaste(id: string) {
  try {
    await prisma.envWaste.delete({ where: { id } });
    revalidatePath("/meio-ambiente/residuos");
    revalidatePath("/meio-ambiente");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir registro de residuo:", error);
    return { error: "Erro ao excluir registro de residuo." };
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
  if (!title || !description || !startDateStr) return { error: "Titulo, Descricao e Data de Inicio sao obrigatorios." };
  try {
    const startDate = new Date(startDateStr);
    const endDate = endDateStr ? new Date(endDateStr) : null;
    const participantsCount = participantsCountStr ? parseInt(participantsCountStr, 10) : null;
    const eduProgram = await prisma.envEduProgram.create({ data: { title, description, targetAudience, startDate, endDate, participantsCount, status: status || "Planejado" } });
    revalidatePath("/meio-ambiente/educacao");
    revalidatePath("/meio-ambiente");
    return { success: true, eduProgram };
  } catch (error) {
    console.error("Erro ao criar projeto de educacao:", error);
    return { error: "Erro ao criar projeto de educacao. Tente novamente." };
  }
}

export async function deleteEnvEduProgram(id: string) {
  try {
    await prisma.envEduProgram.delete({ where: { id } });
    revalidatePath("/meio-ambiente/educacao");
    revalidatePath("/meio-ambiente");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir programa educativo:", error);
    return { error: "Erro ao excluir programa educativo." };
  }
}

export async function createEnvDocument(formData: FormData) {
  const title = formData.get("title") as string;
  const docType = formData.get("docType") as string;
  const enterpriseId = formData.get("enterpriseId") as string;
  const file = formData.get("file") as File;
  if (!title || !docType) return { error: "Titulo e Tipo de Documento sao obrigatorios." };
  if (!file || file.size === 0) return { error: "O envio do arquivo e obrigatorio." };
  try {
    const blob = await put(`meio-ambiente/${file.name}`, file, { access: "public" });
    const envDoc = await prisma.envDocument.create({ data: { title, docType, fileUrl: blob.url, enterpriseId: enterpriseId || null } });
    revalidatePath("/meio-ambiente/documentos");
    revalidatePath("/meio-ambiente");
    return { success: true, document: envDoc };
  } catch (error) {
    console.error("Erro ao anexar documento:", error);
    return { error: "Erro ao anexar documento. Verifique sua conexao e tente novamente." };
  }
}

export async function deleteEnvDocument(id: string) {
  try {
    await prisma.envDocument.delete({ where: { id } });
    revalidatePath("/meio-ambiente/documentos");
    revalidatePath("/meio-ambiente");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir documento:", error);
    return { error: "Erro ao excluir documento." };
  }
}
