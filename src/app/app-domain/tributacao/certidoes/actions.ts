"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModule("TRIBUTACAO")).prisma;
}

export async function createCertificate(data: {
  certificateType: string;
  taxpayerId: string;
  validUntil: string;
}) {
  const prisma = await getTenantPrisma();
  const result = await prisma.taxCertificate.create({
    data: {
      certificateType: data.certificateType,
      taxpayerId: data.taxpayerId,
      validUntil: new Date(data.validUntil),
      authCode: Math.random().toString(36).substring(2, 10).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
      status: "Ativa"
    }
  });

  revalidatePath("/tributacao/certidoes");
  return result;
}

export async function cancelCertificate(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.taxCertificate.update({
    where: { id },
    data: { status: "Revogada" }
  });

  revalidatePath("/tributacao/certidoes");
  return result;
}
