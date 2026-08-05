"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModuleEdit("DOCUMENTOS")).prisma;
}

export async function createFolder(name: string, parentId: string | null) {
  const prisma = await getTenantPrisma();
  if (!name.trim()) throw new Error("Nome obrigatório");
  await prisma.folder.create({
    data: { name: name.trim(), parentId: parentId || null },
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
  const prisma = await getTenantPrisma();
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
  const prisma = await getTenantPrisma();
  await prisma.document.delete({ where: { id } });
  revalidatePath("/documentos/ged");
  revalidatePath("/documentos");
}

export async function deleteFolder(id: string) {
  const prisma = await getTenantPrisma();
  // First move all documents inside to folderId = null (unlink), then delete
  await prisma.document.updateMany({
    where: { folderId: id },
    data: { folderId: null },
  });
  // Recursively unlink sub-folders' documents
  const subFolders = await prisma.folder.findMany({ where: { parentId: id } });
  for (const sub of subFolders) {
    await prisma.document.updateMany({
      where: { folderId: sub.id },
      data: { folderId: null },
    });
    await prisma.folder.delete({ where: { id: sub.id } });
  }
  await prisma.folder.delete({ where: { id } });
  revalidatePath("/documentos/ged");
  revalidatePath("/documentos");
}
