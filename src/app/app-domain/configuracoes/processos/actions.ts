"use server";

import { revalidatePath } from "next/cache";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

async function getConfigurationPrisma() {
  const context = await getTenantContextForModule("CONFIGURACOES");
  if (!context.user.role.toLowerCase().includes("administrador")) {
    throw new Error("Somente administradores podem parametrizar processos.");
  }
  return context.prisma;
}

function optionalId(formData: FormData, name: string) {
  return String(formData.get(name) || "") || null;
}

export async function saveProcessType(formData: FormData): Promise<void> {
  const prisma = await getConfigurationPrisma();
  const id = optionalId(formData, "id");
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Informe o nome do Tipo de Processo.");

  const data = {
    name,
    description: String(formData.get("description") || "").trim() || null,
    initialDepartmentId: optionalId(formData, "initialDepartmentId"),
    defaultSlaDays: Number(formData.get("defaultSlaDays") || "") || null,
    defaultPriority: optionalId(formData, "defaultPriority"),
    requiresInterested: formData.get("requiresInterested") === "on",
    allowsInternalOpening: formData.get("allowsInternalOpening") === "on",
    isActive: formData.get("isActive") === "on",
  };

  if (id) await prisma.processType.update({ where: { id }, data });
  else await prisma.processType.create({ data });
  revalidatePath("/configuracoes/processos");
}

export async function saveSubject(formData: FormData): Promise<void> {
  const prisma = await getConfigurationPrisma();
  const id = optionalId(formData, "id");
  const name = String(formData.get("name") || "").trim();
  const processTypeId = String(formData.get("processTypeId") || "");
  if (!name || !processTypeId) throw new Error("Informe o Assunto e o Tipo de Processo.");

  const data = {
    name,
    description: String(formData.get("description") || "").trim() || null,
    processTypeId,
    initialDepartmentId: optionalId(formData, "initialDepartmentId"),
    slaDays: Number(formData.get("slaDays") || "") || null,
    defaultPriority: optionalId(formData, "defaultPriority"),
    requiresInterested: formData.get("requiresInterested") === "on",
    allowsInternalOpening: formData.get("allowsInternalOpening") === "on",
    isActive: formData.get("isActive") === "on",
  };

  if (id) await prisma.subject.update({ where: { id }, data });
  else await prisma.subject.create({ data });
  revalidatePath("/configuracoes/processos");
}

export async function saveProcessWorkflowStage(formData: FormData): Promise<void> {
  const prisma = await getConfigurationPrisma();
  const id = optionalId(formData, "id");
  const processTypeId = String(formData.get("processTypeId") || "");
  const subjectId = optionalId(formData, "subjectId");
  const departmentId = String(formData.get("departmentId") || "");
  const position = Number(formData.get("position") || "");
  const slaDays = Number(formData.get("slaDays") || "") || null;
  if (!processTypeId || !departmentId || !Number.isInteger(position) || position < 1) {
    throw new Error("Informe tipo, setor e uma ordem de etapa valida.");
  }
  if (subjectId) {
    const subject = await prisma.subject.findFirst({ where: { id: subjectId, processTypeId }, select: { id: true } });
    if (!subject) throw new Error("O Assunto selecionado nao pertence ao Tipo de Processo.");
  }
  const data = {
    processTypeId,
    subjectId,
    departmentId,
    position,
    slaDays,
    label: String(formData.get("label") || "").trim() || null,
    isActive: formData.get("isActive") === "on",
  };
  if (id) await prisma.processWorkflowStage.update({ where: { id }, data });
  else await prisma.processWorkflowStage.create({ data });
  revalidatePath("/configuracoes/processos");
}

export async function deleteProcessWorkflowStage(formData: FormData): Promise<void> {
  const prisma = await getConfigurationPrisma();
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Etapa nao informada.");
  await prisma.processWorkflowStage.delete({ where: { id } });
  revalidatePath("/configuracoes/processos");
}
