"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Unidades Consumidoras ---
export async function createConsumerUnit(data: {
  code: string;
  address: string;
  category: string;
  ownerName: string;
  ownerDocument: string;
}) {
  await prisma.sanConsumerUnit.create({
    data: {
      code: data.code,
      address: data.address,
      category: data.category,
      ownerName: data.ownerName,
      ownerDocument: data.ownerDocument,
      status: "Ativa",
    },
  });
  revalidatePath("/saneamento/unidades");
  revalidatePath("/saneamento");
}

export async function updateConsumerUnit(
  id: string,
  data: {
    code?: string;
    address?: string;
    category?: string;
    ownerName?: string;
    ownerDocument?: string;
    status?: string;
  }
) {
  await prisma.sanConsumerUnit.update({ where: { id }, data });
  revalidatePath("/saneamento/unidades");
  revalidatePath("/saneamento");
}

export async function inactivateConsumerUnit(id: string) {
  await prisma.sanConsumerUnit.update({
    where: { id },
    data: { status: "Inativa" },
  });
  revalidatePath("/saneamento/unidades");
  revalidatePath("/saneamento");
}

export async function deleteConsumerUnit(id: string) {
  await prisma.sanConsumerUnit.delete({ where: { id } });
  revalidatePath("/saneamento/unidades");
  revalidatePath("/saneamento");
}

// --- Leituras ---
export async function createMeterReading(data: {
  unitId: string;
  competence: string;
  previousValue: number;
  currentValue: number;
  readerName: string;
}) {
  const consumption = data.currentValue - data.previousValue;

  await prisma.sanMeterReading.create({
    data: {
      unitId: data.unitId,
      competence: data.competence,
      previousValue: data.previousValue,
      currentValue: data.currentValue,
      consumption: consumption > 0 ? consumption : 0,
      readerName: data.readerName,
      status: "Registrada",
    },
  });
  revalidatePath("/saneamento/leituras");
  revalidatePath("/saneamento");
}

export async function updateMeterReading(
  id: string,
  data: { currentValue?: number; status?: string; readerName?: string }
) {
  await prisma.sanMeterReading.update({ where: { id }, data });
  revalidatePath("/saneamento/leituras");
  revalidatePath("/saneamento");
}

export async function deleteMeterReading(id: string) {
  await prisma.sanMeterReading.delete({ where: { id } });
  revalidatePath("/saneamento/leituras");
  revalidatePath("/saneamento");
}

// --- Ordens de Serviço ---
export async function createServiceOrder(data: {
  orderType: string;
  description: string;
  priority: string;
  unitId?: string;
  technician?: string;
}) {
  const count = await prisma.sanServiceOrder.count();
  const orderNumber = `OS-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

  await prisma.sanServiceOrder.create({
    data: {
      orderNumber,
      orderType: data.orderType,
      description: data.description,
      priority: data.priority,
      unitId: data.unitId || null,
      technician: data.technician,
      status: "Aberta",
    },
  });
  revalidatePath("/saneamento/servicos");
  revalidatePath("/saneamento");
}

export async function updateServiceOrder(
  id: string,
  data: {
    orderType?: string;
    description?: string;
    priority?: string;
    status?: string;
    technician?: string;
  }
) {
  await prisma.sanServiceOrder.update({ where: { id }, data });
  revalidatePath("/saneamento/servicos");
  revalidatePath("/saneamento");
}

export async function deleteServiceOrder(id: string) {
  await prisma.sanServiceOrder.delete({ where: { id } });
  revalidatePath("/saneamento/servicos");
  revalidatePath("/saneamento");
}
