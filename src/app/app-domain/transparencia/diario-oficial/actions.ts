"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDiary(data: FormData) {
  const editionNumberStr = data.get("editionNumber") as string;
  const pdfUrl = data.get("pdfUrl") as string;
  const status = data.get("status") as string;

  const editionNumber = parseInt(editionNumberStr);

  if (isNaN(editionNumber) || !pdfUrl) {
    throw new Error("Número da edição e link do PDF são obrigatórios.");
  }

  // Check if edition already exists
  const existing = await prisma.officialDiary.findUnique({
    where: { editionNumber }
  });

  if (existing) {
    throw new Error("Já existe uma edição com este número.");
  }

  await prisma.officialDiary.create({
    data: {
      editionNumber,
      pdfUrl,
      status,
      publishDate: new Date(),
    }
  });

  revalidatePath("/transparencia/diario-oficial");
}

export async function deleteDiary(id: string) {
  await prisma.officialDiary.delete({
    where: { id }
  });
  revalidatePath("/transparencia/diario-oficial");
}
