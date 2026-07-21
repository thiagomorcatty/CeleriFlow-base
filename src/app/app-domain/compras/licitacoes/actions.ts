"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { nextYearlyCode } from "@/lib/sequence";

async function getTenantPrisma() {
  return (await getTenantContextForModule("COMPRAS")).prisma;
}

export async function inactivateBidding(id: string) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.bidding.update({
      where: { id },
      data: { status: "Inativa" }
    });
    revalidatePath("/compras/licitacoes");
    return { success: true };
  } catch (error) {
    console.error("Error inactivating bidding:", error);
    return { success: false, error: "Falha ao inativar a licitação." };
  }
}

export async function saveBidding(formData: FormData) {
  const prisma = await getTenantPrisma();
  const id = formData.get("id") as string | null;
  const number = formData.get("number") as string;
  const modality = formData.get("modality") as string;
  
  let processId = formData.get("processId") as string;
  const status = formData.get("status") as string;
  const publicationDateStr = formData.get("publicationDate") as string;
  const sessionDateStr = formData.get("sessionDate") as string;

  let process;
  if (processId) {
    process = await prisma.purchaseProcess.findUnique({ where: { id: processId } });
  } else {
    process = await prisma.purchaseProcess.findFirst();
  }

  if (!process) {
    throw new Error("Nenhum processo de compra encontrado para vincular à licitação.");
  }

  const finalNumber = number.trim() || (id ? null : await nextYearlyCode({ prisma,
    key: "compras-licitacao",
    prefix: modality || "LIC",
    existingCodes: (await prisma.bidding.findMany({ select: { number: true } })).map(({ number }) => ({ code: number })),
  }));
  if (!finalNumber) return { success: false, error: "Informe o número da licitação." };

  const data = {
    number: finalNumber,
    modality,
    status: status || "Aberto",
    publicationDate: publicationDateStr ? new Date(publicationDateStr) : null,
    sessionDate: sessionDateStr ? new Date(sessionDateStr) : null,
    processId: process.id,
  };

  try {
    if (id) {
      await prisma.bidding.update({ where: { id }, data });
    } else {
      await prisma.bidding.create({ data });
    }
    revalidatePath("/compras/licitacoes");
    return { success: true };
  } catch (error) {
    console.error("Error saving bidding:", error);
    return { success: false, error: "Falha ao salvar a licitação." };
  }
}
