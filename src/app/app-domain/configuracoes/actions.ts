"use server";

import { getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForSystemAdministration()).prisma;
}

// --- Instância da Prefeitura ---
export async function updateInstancia(id: string, data: {
  nomePrefeitura: string;
  cnpj?: string;
  municipio: string;
  uf: string;
  dominio?: string;
}) {
  const prisma = await getTenantPrisma();
  await prisma.configuracaoInstancia.update({
    where: { id },
    data: {
      nomePrefeitura: data.nomePrefeitura,
      cnpj: data.cnpj || null,
      municipio: data.municipio,
      uf: data.uf,
      dominio: data.dominio || null,
    },
  });
  revalidatePath("/configuracoes/instancia");
  revalidatePath("/configuracoes");
}

export async function createInstancia(data: {
  nomePrefeitura: string;
  cnpj?: string;
  municipio: string;
  uf: string;
  dominio?: string;
}) {
  const prisma = await getTenantPrisma();
  await prisma.configuracaoInstancia.create({
    data: {
      nomePrefeitura: data.nomePrefeitura,
      cnpj: data.cnpj || null,
      municipio: data.municipio,
      uf: data.uf,
      dominio: data.dominio || null,
      status: "Ativa",
    },
  });
  revalidatePath("/configuracoes/instancia");
  revalidatePath("/configuracoes");
}

// --- Módulos Contratados ---
export async function toggleModulo(id: string, ativo: boolean) {
  const prisma = await getTenantPrisma();
  await prisma.configuracaoModulo.update({
    where: { id },
    data: {
      ativo,
      dataAtivacao: ativo ? new Date() : null,
    },
  });
  revalidatePath("/configuracoes/modulos");
  revalidatePath("/configuracoes");
}

export async function createModulo(data: {
  nome: string;
  codigo: string;
  ativo?: boolean;
}) {
  const prisma = await getTenantPrisma();
  await prisma.configuracaoModulo.create({
    data: {
      nome: data.nome,
      codigo: data.codigo,
      ativo: data.ativo || false,
      dataAtivacao: data.ativo ? new Date() : null,
    },
  });
  revalidatePath("/configuracoes/modulos");
  revalidatePath("/configuracoes");
}

// --- Perfis de Acesso ---
export async function createPerfil(data: {
  nome: string;
  descricao?: string;
  permissoes: string;
}) {
  const prisma = await getTenantPrisma();
  await prisma.configuracaoPerfil.create({
    data: {
      nome: data.nome,
      descricao: data.descricao || null,
      permissoes: data.permissoes,
      ativo: true,
    },
  });
  revalidatePath("/configuracoes/perfis");
  revalidatePath("/configuracoes");
}

export async function togglePerfil(id: string, ativo: boolean) {
  const prisma = await getTenantPrisma();
  await prisma.configuracaoPerfil.update({
    where: { id },
    data: { ativo },
  });
  revalidatePath("/configuracoes/perfis");
  revalidatePath("/configuracoes");
}
