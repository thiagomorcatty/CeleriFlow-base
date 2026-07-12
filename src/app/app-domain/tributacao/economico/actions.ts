"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEconomicRegistration(data: {
  municipalInsc: string;
  primaryCnae: string;
  taxRegime: string;
  taxpayerId: string;
}) {
  const result = await prisma.economicRegistration.create({
    data: {
      municipalInsc: data.municipalInsc,
      primaryCnae: data.primaryCnae,
      taxRegime: data.taxRegime,
      taxpayerId: data.taxpayerId,
      status: "Ativo",
      startDate: new Date()
    }
  });

  revalidatePath("/tributacao/economico");
  return result;
}

export async function updateEconomicRegistration(id: string, data: {
  municipalInsc?: string;
  primaryCnae?: string;
  taxRegime?: string;
}) {
  const result = await prisma.economicRegistration.update({
    where: { id },
    data
  });

  revalidatePath("/tributacao/economico");
  return result;
}

export async function deactivateEconomicRegistration(id: string) {
  const result = await prisma.economicRegistration.update({
    where: { id },
    data: { status: "Inativo" }
  });

  revalidatePath("/tributacao/economico");
  return result;
}

export async function activateEconomicRegistration(id: string) {
  const result = await prisma.economicRegistration.update({
    where: { id },
    data: { status: "Ativo" }
  });

  revalidatePath("/tributacao/economico");
  return result;
}
