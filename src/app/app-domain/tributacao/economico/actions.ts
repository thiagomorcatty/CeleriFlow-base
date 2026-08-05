"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModuleEdit("TRIBUTACAO")).prisma;
}

export async function createEconomicRegistration(data: {
  municipalInsc: string;
  primaryCnae: string;
  taxRegime: string;
  taxpayerId: string;
}) {
  const prisma = await getTenantPrisma();
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
  const prisma = await getTenantPrisma();
  const result = await prisma.economicRegistration.update({
    where: { id },
    data
  });

  revalidatePath("/tributacao/economico");
  return result;
}

export async function deactivateEconomicRegistration(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.economicRegistration.update({
    where: { id },
    data: { status: "Inativo" }
  });

  revalidatePath("/tributacao/economico");
  return result;
}

export async function activateEconomicRegistration(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.economicRegistration.update({
    where: { id },
    data: { status: "Ativo" }
  });

  revalidatePath("/tributacao/economico");
  return result;
}
