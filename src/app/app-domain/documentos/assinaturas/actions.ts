"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function signDocument(id: string, newStatus: string) {
  const result = await prisma.document.update({
    where: { id },
    data: { status: newStatus }
  });
  
  revalidatePath("/documentos");
  revalidatePath("/documentos/assinaturas");
  revalidatePath("/documentos/ged");
  
  return result;
}
