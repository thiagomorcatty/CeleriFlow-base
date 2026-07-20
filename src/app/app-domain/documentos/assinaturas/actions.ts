"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModule("DOCUMENTOS")).prisma;
}

export async function signDocument(id: string, newStatus: string) {
  const prisma = await getTenantPrisma();
  const result = await prisma.document.update({
    where: { id },
    data: { status: newStatus },
  });

  revalidatePath("/documentos");
  revalidatePath("/documentos/assinaturas");
  revalidatePath("/documentos/ged");
  revalidatePath("/documentos/ged?view=recentes");

  return result;
}
