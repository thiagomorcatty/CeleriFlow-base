"use server";

import { revalidatePath } from "next/cache";
import { AccessError, getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";

async function getTenantPrisma() {
  return (await getTenantContextForSystemAdministration()).prisma;
}

const SYSTEM_ADMINISTRATOR_ROLE = "Administrador";

export async function upsertPerfil(data: {
  id?: string;
  nome: string;
  descricao: string;
  permissoes?: string;
  ativo: boolean;
}) {
  try {
    const prisma = await getTenantPrisma();
    const nome = data.nome.trim();
    if (!nome) return { error: "Informe o nome do perfil." };

    const jsonPermissoes = data.permissoes || JSON.stringify({ ALL: true });

    if (data.id) {
      const existing = await prisma.configuracaoPerfil.findUnique({ where: { id: data.id } });
      if (!existing) return { error: "Perfil não encontrado." };
      
      await prisma.configuracaoPerfil.update({
        where: { id: data.id },
        data: {
          nome,
          descricao: data.descricao,
          permissoes: jsonPermissoes,
          ativo: data.ativo,
        },
      });
    } else {
      await prisma.configuracaoPerfil.create({
        data: {
          nome,
          descricao: data.descricao,
          permissoes: jsonPermissoes,
          ativo: data.ativo,
        },
      });
    }
    revalidatePath("/configuracoes/perfis");
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Erro ao salvar o perfil." };
  }
}

export async function togglePerfilStatus(id: string, ativo: boolean) {
  try {
    const prisma = await getTenantPrisma();
    const perfil = await prisma.configuracaoPerfil.findUnique({ where: { id } });
    if (!perfil) return { error: "Perfil não encontrado." };
    
    await prisma.configuracaoPerfil.update({
      where: { id },
      data: { ativo },
    });
    revalidatePath("/configuracoes/perfis");
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof AccessError ? error.message : "Erro ao alterar o status do perfil." };
  }
}
