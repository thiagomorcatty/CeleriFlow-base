"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateModelo(
  id: string,
  data: { title?: string; notes?: string; status?: string }
) {
  await prisma.document.update({ where: { id }, data });
  revalidatePath("/documentos/modelos");
  revalidatePath("/documentos");
}

export async function deleteModelo(id: string) {
  await prisma.document.delete({ where: { id } });
  revalidatePath("/documentos/modelos");
  revalidatePath("/documentos");
}

export async function createModelo(title: string, notes: string, documentType: string) {
  if (!title.trim()) throw new Error("Título obrigatório");
  await prisma.document.create({
    data: {
      title: title.trim(),
      documentType: "Modelo",
      fileUrl: `/modelos/${Date.now()}_${title.trim().replace(/\s+/g, "_")}.docx`,
      status: "Ativo",
      notes: notes || null,
    },
  });
  revalidatePath("/documentos/modelos");
  revalidatePath("/documentos");
}
