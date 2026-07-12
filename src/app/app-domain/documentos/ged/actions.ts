"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFolder(name: string, parentId: string | null) {
  if (!name.trim()) throw new Error("Nome obrigatório");
  await prisma.folder.create({
    data: { name: name.trim(), parentId: parentId || null }
  });
  revalidatePath("/documentos/ged");
  revalidatePath("/documentos");
}

export async function createDocument(
  title: string,
  documentType: string,
  fileUrl: string,
  folderId: string | null
) {
  if (!title.trim()) throw new Error("Título obrigatório");
  await prisma.document.create({
    data: {
      title: title.trim(),
      documentType: documentType || "Arquivo",
      fileUrl,
      folderId: folderId || null,
      status: "Válido",
    },
  });
  revalidatePath("/documentos/ged");
  revalidatePath("/documentos");
}

export async function deleteDocument(id: string) {
  await prisma.document.delete({ where: { id } });
  revalidatePath("/documentos/ged");
  revalidatePath("/documentos");
}

export async function deleteFolder(id: string) {
  await prisma.folder.delete({ where: { id } });
  revalidatePath("/documentos/ged");
  revalidatePath("/documentos");
}
