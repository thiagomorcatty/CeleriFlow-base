"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

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
      issValue: data.serviceValue * 0.05, // Exemplo de cálculo 5%
      competence: data.competence,
      providerId: data.providerId,
      takerId: data.takerId || undefined,
      verificationCode: data.verificationCode || `VER-${Math.floor(100000 + Math.random() * 900000)}`,
      status: "Emitida"
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
