"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLicense(data: {
  licenseType: string;
  taxpayerId: string;
  validUntil: string;
}) {
  const result = await prisma.license.create({
    data: {
      licenseType: data.licenseType,
      taxpayerId: data.taxpayerId,
      issueDate: new Date(),
      validUntil: new Date(data.validUntil),
      status: "Emitido"
    }
  });

  revalidatePath("/tributacao/alvaras");
  return result;
}

export async function updateLicense(id: string, data: {
  licenseType?: string;
  validUntil?: string;
}) {
  const result = await prisma.license.update({
    where: { id },
    data: {
      licenseType: data.licenseType,
      validUntil: data.validUntil ? new Date(data.validUntil) : undefined
    }
  });

  revalidatePath("/tributacao/alvaras");
  return result;
}

export async function deactivateLicense(id: string) {
  const result = await prisma.license.update({
    where: { id },
    data: { status: "Cancelado" }
  });

  revalidatePath("/tributacao/alvaras");
  return result;
}

export async function activateLicense(id: string) {
  const result = await prisma.license.update({
    where: { id },
    data: { status: "Emitido" }
  });

  revalidatePath("/tributacao/alvaras");
  return result;
}
