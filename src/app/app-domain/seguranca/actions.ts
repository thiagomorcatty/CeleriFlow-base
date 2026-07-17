"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { SegMobFormData, SegMobKind } from "./types";

const modulePaths = [
  "/app-domain/seguranca",
  "/app-domain/seguranca/guardas",
  "/app-domain/seguranca/ocorrencias",
  "/app-domain/seguranca/infracoes",
  "/app-domain/seguranca/rondas",
  "/app-domain/seguranca/defesa-civil",
  "/app-domain/seguranca/transito",
  "/app-domain/seguranca/mobilidade",
  "/app-domain/seguranca/ordens",
  "/app-domain/seguranca/documentos",
];

function revalidateSegMob() {
  for (const path of modulePaths) revalidatePath(path);
}

function clean(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function required(value: string | undefined, label: string) {
  if (!value?.trim()) return `${label} obrigatorio.`;
  return null;
}

function parseDate(value?: string) {
  return value ? new Date(value) : new Date();
}

export async function createSegMobItem(kind: SegMobKind, data: SegMobFormData) {
  const codeError = required(data.code, "Codigo");
  const titleError = required(data.title, "Titulo/Nome");
  if (codeError || titleError) return { error: codeError || titleError || "Dados invalidos." };

  try {
    if (kind === "guarda") {
      await prisma.segurancaGuarda.create({
        data: {
          matricula: data.code.trim(),
          nome: data.title.trim(),
          tipo: data.type || "Guarda Municipal",
          equipe: clean(data.location),
          status: data.status || "Ativo",
          isActive: data.isActive,
        },
      });
    }

    if (kind === "ocorrencia") {
      await prisma.segurancaOcorrencia.create({
        data: {
          numero: data.code.trim(),
          tipo: data.type || "Ocorrencia Administrativa",
          descricao: data.description?.trim() || data.title.trim(),
          local: clean(data.location),
          bairro: clean(data.district),
          prioridade: data.priority || "Normal",
          status: data.status || "Registrada",
          isActive: data.isActive,
        },
      });
    }

    if (kind === "infracao") {
      await prisma.segurancaInfracao.create({
        data: {
          auto: data.code.trim(),
          data: parseDate(data.date),
          placa: data.plate?.trim() || data.title.trim(),
          tipo: data.type || "Infracao de Transito",
          local: data.location?.trim() || "Nao informado",
          valor: data.value ?? null,
          status: data.status || "Registrado",
          isActive: data.isActive,
        },
      });
    }

    if (kind === "registro") {
      await prisma.segurancaMobilidadeRegistro.create({
        data: {
          codigo: data.code.trim(),
          categoria: data.category || "Registro Operacional",
          tipo: data.type || "Atividade",
          titulo: data.title.trim(),
          descricao: clean(data.description),
          local: clean(data.location),
          bairro: clean(data.district),
          responsavel: clean(data.responsible),
          prioridade: data.priority || "Normal",
          status: data.status || "Ativo",
          dataInicio: parseDate(data.date),
          valor: data.value ?? null,
          placa: clean(data.plate),
          relatedModule: clean(data.relatedModule),
          relatedId: clean(data.relatedId),
          isActive: data.isActive,
        },
      });
    }

    revalidateSegMob();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Nao foi possivel criar o registro. Verifique se o codigo ja existe." };
  }
}

export async function updateSegMobItem(kind: SegMobKind, id: string, data: SegMobFormData) {
  const codeError = required(data.code, "Codigo");
  const titleError = required(data.title, "Titulo/Nome");
  if (codeError || titleError) return { error: codeError || titleError || "Dados invalidos." };

  try {
    if (kind === "guarda") {
      await prisma.segurancaGuarda.update({
        where: { id },
        data: {
          matricula: data.code.trim(),
          nome: data.title.trim(),
          tipo: data.type || "Guarda Municipal",
          equipe: clean(data.location),
          status: data.status || "Ativo",
          isActive: data.isActive,
        },
      });
    }

    if (kind === "ocorrencia") {
      await prisma.segurancaOcorrencia.update({
        where: { id },
        data: {
          numero: data.code.trim(),
          tipo: data.type || "Ocorrencia Administrativa",
          descricao: data.description?.trim() || data.title.trim(),
          local: clean(data.location),
          bairro: clean(data.district),
          prioridade: data.priority || "Normal",
          status: data.status || "Registrada",
          isActive: data.isActive,
        },
      });
    }

    if (kind === "infracao") {
      await prisma.segurancaInfracao.update({
        where: { id },
        data: {
          auto: data.code.trim(),
          data: parseDate(data.date),
          placa: data.plate?.trim() || data.title.trim(),
          tipo: data.type || "Infracao de Transito",
          local: data.location?.trim() || "Nao informado",
          valor: data.value ?? null,
          status: data.status || "Registrado",
          isActive: data.isActive,
        },
      });
    }

    if (kind === "registro") {
      await prisma.segurancaMobilidadeRegistro.update({
        where: { id },
        data: {
          codigo: data.code.trim(),
          categoria: data.category || "Registro Operacional",
          tipo: data.type || "Atividade",
          titulo: data.title.trim(),
          descricao: clean(data.description),
          local: clean(data.location),
          bairro: clean(data.district),
          responsavel: clean(data.responsible),
          prioridade: data.priority || "Normal",
          status: data.status || "Ativo",
          dataInicio: parseDate(data.date),
          valor: data.value ?? null,
          placa: clean(data.plate),
          relatedModule: clean(data.relatedModule),
          relatedId: clean(data.relatedId),
          isActive: data.isActive,
        },
      });
    }

    revalidateSegMob();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Nao foi possivel salvar o registro. Verifique os dados informados." };
  }
}

export async function toggleSegMobItemStatus(kind: SegMobKind, id: string, isActive: boolean) {
  try {
    if (kind === "guarda") await prisma.segurancaGuarda.update({ where: { id }, data: { isActive } });
    if (kind === "ocorrencia") await prisma.segurancaOcorrencia.update({ where: { id }, data: { isActive } });
    if (kind === "infracao") await prisma.segurancaInfracao.update({ where: { id }, data: { isActive } });
    if (kind === "registro") await prisma.segurancaMobilidadeRegistro.update({ where: { id }, data: { isActive } });

    revalidateSegMob();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Nao foi possivel alterar o status do registro." };
  }
}