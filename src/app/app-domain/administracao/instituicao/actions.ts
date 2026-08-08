"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";

export async function saveInstitution(formData: FormData) {
  try {
    const { prisma } = await getTenantContextForModuleEdit("ADMINISTRACAO");
    let logoUrl: string | null = null;
    const logoFile = formData.get("logoFile") as File | null;

    if (logoFile && logoFile.size > 0 && logoFile.name) {
      // Limite de segurança para MVP (evitar travar o banco com arquivos gigantes)
      if (logoFile.size > 2 * 1024 * 1024) { 
        return { error: "O arquivo da logo deve ter no máximo 2MB." };
      }
      
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      const base64 = buffer.toString("base64");
      const mimeType = logoFile.type || "image/png";
      
      // Armazenando em Base64 para garantir compatibilidade com servidor Vercel (read-only filesystem)
      logoUrl = `data:${mimeType};base64,${base64}`;
    }

    const data: Prisma.InstitutionCreateInput = {
      name: formData.get("name") as string,
      cnpj: formData.get("cnpj") as string,
      legalName: formData.get("legalName") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      website: formData.get("website") as string,
      mayorName: formData.get("mayorName") as string,
      managerName: formData.get("managerName") as string,
    };

    if (logoUrl) {
      data.logoUrl = logoUrl;
    }

    if (!data.name) {
      return { error: "O nome da prefeitura é obrigatório." };
    }

    const existing = await prisma.institution.findFirst();

    if (existing) {
      await prisma.institution.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.institution.create({
        data,
      });
    }

    revalidatePath("/administracao");
    revalidatePath("/administracao/instituicao");
    
    return { success: true };
  } catch (error: unknown) {
    console.error("Error saving institution:", error);
    return { error: error instanceof Error ? error.message : "Erro desconhecido ao salvar os dados da instituição." };
  }
}
