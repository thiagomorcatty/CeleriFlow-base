"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";

export async function saveInstitution(formData: FormData) {
  try {
    let logoUrl: string | null = null;
    const logoFile = formData.get("logoFile") as File | null;

    if (logoFile && logoFile.size > 0 && logoFile.name) {
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      const filename = `logo-${Date.now()}${path.extname(logoFile.name)}`;
      const filepath = path.join(process.cwd(), "public", "uploads", filename);
      await writeFile(filepath, buffer);
      logoUrl = `/uploads/${filename}`;
    }

    const data: any = {
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
  } catch (error: any) {
    console.error("Error saving institution:", error);
    return { error: error.message || "Erro desconhecido ao salvar os dados da instituição." };
  }
}
