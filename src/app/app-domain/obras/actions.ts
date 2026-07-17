"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Obras ---
export async function createObra(data: {
  numero: string;
  nome: string;
  descricao?: string;
  local?: string;
  tipo: string;
  valorEstimado?: number;
}) {
  await prisma.obrasObra.create({
    data: {
      numero: data.numero,
      nome: data.nome,
      descricao: data.descricao || null,
      local: data.local || null,
      tipo: data.tipo,
      valorEstimado: data.valorEstimado || null,
      status: "Em Planejamento",
    },
  });
  revalidatePath("/obras/obras-publicas");
  revalidatePath("/obras");
}

export async function deleteObra(id: string) {
  await prisma.obrasObra.delete({ where: { id } });
  revalidatePath("/obras/obras-publicas");
  revalidatePath("/obras");
}

// --- Medições ---
export async function createMedicao(data: {
  numero: number;
  data: Date;
  valorMedido: number;
  obraId: string;
}) {
  await prisma.obrasMedicao.create({
    data: {
      numero: data.numero,
      data: data.data,
      valorMedido: data.valorMedido,
      obraId: data.obraId,
      status: "Em Análise",
    },
  });
  revalidatePath("/obras/medicoes");
  revalidatePath("/obras/obras-publicas");
  revalidatePath("/obras");
}

export async function deleteMedicao(id: string) {
  await prisma.obrasMedicao.delete({ where: { id } });
  revalidatePath("/obras/medicoes");
  revalidatePath("/obras/obras-publicas");
  revalidatePath("/obras");
}

// --- Serviços Urbanos ---
export async function createServico(data: {
  protocolo: string;
  tipo: string;
  descricao: string;
  local: string;
}) {
  await prisma.obrasServico.create({
    data: {
      protocolo: data.protocolo,
      tipo: data.tipo,
      descricao: data.descricao,
      local: data.local,
      status: "Aberto",
    },
  });
  revalidatePath("/obras/servicos");
  revalidatePath("/obras");
}

export async function deleteServico(id: string) {
  await prisma.obrasServico.delete({ where: { id } });
  revalidatePath("/obras/servicos");
  revalidatePath("/obras");
}
