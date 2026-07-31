"use server";

import { revalidatePath } from "next/cache";
import { AccessError, getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";

async function getTenantPrisma() {
  return (await getTenantContextForSystemAdministration()).prisma;
}

const SYSTEM_ADMINISTRATOR_ROLE = "Administrador";
const SYSTEM_ADMINISTRATOR_PERMISSIONS = JSON.stringify({ acesso: "total" });

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

    if (data.id) {
      const existing = await prisma.configuracaoPerfil.findUnique({ where: { id: data.id } });
      if (!existing) return { error: "Perfil não encontrado." };
      if (existing.nome === SYSTEM_ADMINISTRATOR_ROLE && nome !== SYSTEM_ADMINISTRATOR_ROLE) {
        return { error: "O perfil administrativo provisionado não pode ser renomeado." };
      }
      await prisma.configuracaoPerfil.update({
        where: { id: data.id },
        data: {
          nome,
          descricao: data.descricao,
          permissoes:
            existing.nome === SYSTEM_ADMINISTRATOR_ROLE
              ? SYSTEM_ADMINISTRATOR_PERMISSIONS
              : data.permissoes ?? JSON.stringify({ acesso: "operacional" }),
          ativo: data.ativo,
        },
      });
    } else {
      if (nome === SYSTEM_ADMINISTRATOR_ROLE) {
        return { error: "O perfil administrativo é provisionado pelo sistema e não pode ser criado pela interface." };
      }
      await prisma.configuracaoPerfil.create({
        data: {
          nome,
          descricao: data.descricao,
          permissoes: data.permissoes ?? JSON.stringify({ acesso: "operacional" }),
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
    if (perfil.nome === SYSTEM_ADMINISTRATOR_ROLE && !ativo) {
      return { error: "O perfil administrativo provisionado não pode ser desativado." };
    }
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
