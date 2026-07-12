"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRealEstate(data: {
  municipalInsc: string;
  streetName: string;
  number: string;
  propertyType: string;
  landArea: number;
  builtArea: number;
}) {
  const result = await prisma.realEstate.create({
    data: {
      municipalInsc: data.municipalInsc || undefined,
      streetName: data.streetName,
      number: data.number,
      propertyType: data.propertyType,
      landArea: data.landArea,
      builtArea: data.builtArea,
      status: "Regular"
    }
  });

  revalidatePath("/tributacao/imoveis");
  return result;
}

export async function updateRealEstate(id: string, data: {
  municipalInsc?: string;
  streetName?: string;
  number?: string;
  propertyType?: string;
  landArea?: number;
  builtArea?: number;
}) {
  const result = await prisma.realEstate.update({
    where: { id },
    data
  });

  revalidatePath("/tributacao/imoveis");
  return result;
}

export async function deactivateRealEstate(id: string) {
  const result = await prisma.realEstate.update({
    where: { id },
    data: { status: "Inativo" }
  });

  revalidatePath("/tributacao/imoveis");
  return result;
}

export async function activateRealEstate(id: string) {
  const result = await prisma.realEstate.update({
    where: { id },
    data: { status: "Regular" }
  });

  revalidatePath("/tributacao/imoveis");
  return result;
}
