"use server"

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModule("TRANSPARENCIA")).prisma;
}

export async function createPage(data: FormData) {
  const prisma = await getTenantPrisma();
  const title = data.get("title") as string;
  const content = data.get("content") as string;
  const status = data.get("status") as string;

  if (!title || !content) {
    throw new Error("Título e conteúdo são obrigatórios.");
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  await prisma.portalPage.create({
    data: {
      title,
      content,
      status,
      slug,
    }
  });

  revalidatePath("/transparencia/paginas");
}

export async function deletePage(id: string) {
  const prisma = await getTenantPrisma();
  await prisma.portalPage.delete({
    where: { id }
  });
  revalidatePath("/transparencia/paginas");
}
