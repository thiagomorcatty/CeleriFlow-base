"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Instância da Prefeitura ---
export async function updateInstancia(id: string, data: {
  nomePrefeitura: string;
  cnpj?: string;
  municipio: string;
  uf: string;
  dominio?: string;
}) {
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
  await prisma.configuracaoPerfil.update({
    where: { id },
    data: { ativo },
  });
  revalidatePath("/configuracoes/perfis");
  revalidatePath("/configuracoes");
}
