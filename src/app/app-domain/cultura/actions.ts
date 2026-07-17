"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Agentes Culturais ---
export async function createAgente(data: {
  nome: string;
  tipo: string;
  segmento: string;
  cpfCnpj?: string;
  telefone?: string;
  email?: string;
}) {
  await prisma.culturaAgente.create({
    data: {
      nome: data.nome,
      tipo: data.tipo,
      segmento: data.segmento,
      cpfCnpj: data.cpfCnpj || null,
      telefone: data.telefone || null,
      email: data.email || null,
      status: "Ativo",
    },
  });
  revalidatePath("/cultura/agentes");
  revalidatePath("/cultura");
}

export async function deleteAgente(id: string) {
  await prisma.culturaAgente.delete({ where: { id } });
  revalidatePath("/cultura/agentes");
  revalidatePath("/cultura");
}

// --- Espaços Culturais ---
export async function createEspaco(data: {
  nome: string;
  tipo: string;
  endereco?: string;
  capacidade?: number;
}) {
  await prisma.culturaEspaco.create({
    data: {
      nome: data.nome,
      tipo: data.tipo,
      endereco: data.endereco || null,
      capacidade: data.capacidade || null,
      status: "Disponível",
    },
  });
  revalidatePath("/cultura/espacos");
  revalidatePath("/cultura");
}

export async function deleteEspaco(id: string) {
  await prisma.culturaEspaco.delete({ where: { id } });
  revalidatePath("/cultura/espacos");
  revalidatePath("/cultura");
}

// --- Eventos ---
export async function createEvento(data: {
  nome: string;
  tipo: string;
  data: Date;
  local?: string;
  publicoAlvo?: string;
}) {
  await prisma.culturaEvento.create({
    data: {
      nome: data.nome,
      tipo: data.tipo,
      data: data.data,
      local: data.local || null,
      publicoAlvo: data.publicoAlvo || null,
      status: "Programado",
    },
  });
  revalidatePath("/cultura/eventos");
  revalidatePath("/cultura");
}

export async function deleteEvento(id: string) {
  await prisma.culturaEvento.delete({ where: { id } });
  revalidatePath("/cultura/eventos");
  revalidatePath("/cultura");
}
