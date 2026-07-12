"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createInfraction(data: {
  infractionType: string;
  penaltyValue: number;
  defenseDeadline?: string;
  taxpayerId: string;
}) {
  const result = await prisma.infraction.create({
    data: {
      infractionType: data.infractionType,
      penaltyValue: data.penaltyValue,
      defenseDeadline: data.defenseDeadline ? new Date(data.defenseDeadline) : undefined,
      taxpayerId: data.taxpayerId,
      status: "Emitido"
    }
  });

  revalidatePath("/tributacao/fiscalizacao");
  return result;
}

export async function updateInfraction(id: string, data: {
  infractionType?: string;
  penaltyValue?: number;
  defenseDeadline?: string;
}) {
  const result = await prisma.infraction.update({
    where: { id },
    data: {
      infractionType: data.infractionType,
      penaltyValue: data.penaltyValue,
      defenseDeadline: data.defenseDeadline ? new Date(data.defenseDeadline) : undefined,
    }
  });

  revalidatePath("/tributacao/fiscalizacao");
  return result;
}

export async function updateInfractionStatus(id: string, status: string) {
  const result = await prisma.infraction.update({
    where: { id },
    data: { status }
  });

  revalidatePath("/tributacao/fiscalizacao");
  return result;
}
