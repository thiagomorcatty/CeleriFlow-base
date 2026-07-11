"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Guardas / Agentes ---
export async function createGuarda(data: {
  matricula: string;
  nome: string;
  tipo: string;
  equipe?: string;
}) {
  await prisma.segurancaGuarda.create({
    data: {
      matricula: data.matricula,
      nome: data.nome,
      tipo: data.tipo,
      equipe: data.equipe || null,
      status: "Ativo",
    },
  });
  revalidatePath("/app-domain/seguranca/guardas");
  revalidatePath("/app-domain/seguranca");
}

export async function deleteGuarda(id: string) {
  await prisma.segurancaGuarda.delete({ where: { id } });
  revalidatePath("/app-domain/seguranca/guardas");
  revalidatePath("/app-domain/seguranca");
}

// --- Ocorrências ---
export async function createOcorrencia(data: {
  numero: string;
  tipo: string;
  descricao: string;
  local?: string;
  bairro?: string;
  prioridade?: string;
}) {
  await prisma.segurancaOcorrencia.create({
    data: {
      numero: data.numero,
      tipo: data.tipo,
      descricao: data.descricao,
      local: data.local || null,
      bairro: data.bairro || null,
      prioridade: data.prioridade || "Normal",
      status: "Registrada",
    },
  });
  revalidatePath("/app-domain/seguranca/ocorrencias");
  revalidatePath("/app-domain/seguranca");
}

export async function deleteOcorrencia(id: string) {
  await prisma.segurancaOcorrencia.delete({ where: { id } });
  revalidatePath("/app-domain/seguranca/ocorrencias");
  revalidatePath("/app-domain/seguranca");
}

// --- Infrações ---
export async function createInfracao(data: {
  auto: string;
  data: Date;
  placa: string;
  tipo: string;
  local: string;
  valor?: number;
}) {
  await prisma.segurancaInfracao.create({
    data: {
      auto: data.auto,
      data: data.data,
      placa: data.placa,
      tipo: data.tipo,
      local: data.local,
      valor: data.valor || null,
      status: "Registrado",
    },
  });
  revalidatePath("/app-domain/seguranca/infracoes");
  revalidatePath("/app-domain/seguranca");
}

export async function deleteInfracao(id: string) {
  await prisma.segurancaInfracao.delete({ where: { id } });
  revalidatePath("/app-domain/seguranca/infracoes");
  revalidatePath("/app-domain/seguranca");
}
