"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";

async function getTenantPrisma() {
  return (await getTenantContextForModule("TRIBUTACAO")).prisma;
}

export async function createInvoice(data: {
  serviceValue: number;
  competence: string;
  providerId: string;
  takerId?: string;
  verificationCode?: string;
}) {
  const prisma = await getTenantPrisma();
  const result = await prisma.invoice.create({
    data: {
      serviceValue: data.serviceValue,
      serviceValueDecimal: data.serviceValue,
      issValue: 0,
      issValueDecimal: 0,
      competence: data.competence,
      providerId: data.providerId,
      takerId: data.takerId || undefined,
      verificationCode: data.verificationCode || `INTERNO-${randomUUID()}`,
      status: "Rascunho Interno"
    }
  });

  revalidatePath("/tributacao/nfse");
  return result;
}

export async function cancelInvoice(id: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.invoice.update({
    where: { id },
    data: { status: "Cancelada" }
  });

  revalidatePath("/tributacao/nfse");
  return result;
}
