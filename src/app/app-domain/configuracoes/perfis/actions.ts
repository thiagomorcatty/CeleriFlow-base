"use server";

import { revalidatePath } from "next/cache";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

async function getTenantPrisma() {
  return (await getTenantContextForModule("CONFIGURACOES")).prisma;
}

export async function upsertPerfil(data: {
  id?: string;
  nome: string;
  descricao: string;
  permissoes?: string;
  ativo: boolean;
}) {
  const prisma = await getTenantPrisma();
  try {
    if (data.id) {
      await prisma.configuracaoPerfil.update({
        where: { id: data.id },
        data: {
          nome: data.nome,
          descricao: data.descricao,
          permissoes: data.permissoes ?? "{}",
          ativo: data.ativo,
        },
      });
    } else {
      await prisma.configuracaoPerfil.create({
        data: {
          nome: data.nome,
          descricao: data.descricao,
          permissoes: data.permissoes ?? "{}",
          ativo: data.ativo,
        },
      });
    }
    revalidatePath("/configuracoes/perfis");
    return { error: null };
  } catch (error: any) {
    console.error(error);
    return { error: error.message || "Erro ao salvar o perfil." };
  }
}

export async function togglePerfilStatus(id: string, ativo: boolean) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.configuracaoPerfil.update({
      where: { id },
      data: { ativo },
    });
    revalidatePath("/configuracoes/perfis");
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao alterar o status do perfil." };
  }
}
