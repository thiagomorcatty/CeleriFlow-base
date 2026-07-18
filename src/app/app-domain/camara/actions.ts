"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Legislaturas ---
export async function createLegislatura(data: {
  numero: number;
  inicio: Date;
  fim: Date;
}) {
  await prisma.camLegislatura.create({
    data: {
      numero: data.numero,
      inicio: data.inicio,
      fim: data.fim,
      status: "Ativa",
    },
  });
  revalidatePath("/app-domain/camara/vereadores");
}

// --- Vereadores ---
export async function createVereador(data: {
  nomeCompleto: string;
  nomeParlamentar: string;
  cpf?: string;
  partido?: string;
  legislaturaId: string;
}) {
  await prisma.camVereador.create({
    data: {
      nomeCompleto: data.nomeCompleto,
      nomeParlamentar: data.nomeParlamentar,
      cpf: data.cpf || null,
      partido: data.partido || null,
      legislaturaId: data.legislaturaId,
      status: "Em Exercício",
    },
  });
  revalidatePath("/app-domain/camara/vereadores");
  revalidatePath("/app-domain/camara");
}

export async function deleteVereador(id: string) {
  await prisma.camVereador.update({
    where: { id },
    data: { active: false, status: "Inativo" },
  });
  revalidatePath("/app-domain/camara/vereadores");
  revalidatePath("/app-domain/camara");
}

// --- Sessões ---
export async function createSessao(data: {
  numero: number;
  tipo: string;
  data: Date;
  local: string;
}) {
  await prisma.camSessao.create({
    data: {
      numero: data.numero,
      tipo: data.tipo,
      data: data.data,
      local: data.local,
      status: "Agendada",
    },
  });
  revalidatePath("/app-domain/camara/sessoes");
  revalidatePath("/app-domain/camara");
}

export async function deleteSessao(id: string) {
  await prisma.camSessao.update({
    where: { id },
    data: { status: "Cancelada" },
  });
  revalidatePath("/app-domain/camara/sessoes");
  revalidatePath("/app-domain/camara");
}

// --- Proposições ---
export async function createProposicao(data: {
  numero: string;
  tipo: string;
  ementa: string;
  texto?: string;
  autorId: string;
  sessaoId?: string;
}) {
  await prisma.camProposicao.create({
    data: {
      numero: data.numero,
      tipo: data.tipo,
      ementa: data.ementa,
      texto: data.texto || null,
      autorId: data.autorId,
      sessaoId: data.sessaoId || null,
      status: "Protocolada",
    },
  });
  revalidatePath("/app-domain/camara/proposicoes");
  revalidatePath("/app-domain/camara");
}

export async function deleteProposicao(id: string) {
  await prisma.camProposicao.update({
    where: { id },
    data: { status: "Arquivada" },
  });
  revalidatePath("/app-domain/camara/proposicoes");
  revalidatePath("/app-domain/camara");
}
