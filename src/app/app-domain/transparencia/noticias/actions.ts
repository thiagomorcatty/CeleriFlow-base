"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNews(data: FormData) {
  const title = data.get("title") as string;
  const subtitle = data.get("subtitle") as string;
  const content = data.get("content") as string;
  const status = data.get("status") as string;

  if (!title || !content) {
    throw new Error("Título e conteúdo são obrigatórios.");
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  await prisma.portalNews.create({
    data: {
      title,
      subtitle,
      content,
      status,
      slug,
      publishedAt: status === 'Publicado' ? new Date() : null,
    }
  });

  revalidatePath("/transparencia/noticias");
}

export async function deleteNews(id: string) {
  await prisma.portalNews.delete({
    where: { id }
  });
  revalidatePath("/transparencia/noticias");
}
