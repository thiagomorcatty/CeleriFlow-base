"use server";
import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDepartment(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const secretariatId = formData.get("secretariatId") as string;

  if (!name || !secretariatId) return { error: "Nome e Secretaria são obrigatórios" };

  try {
    const { prisma } = await getTenantContextForModuleEdit("ADMINISTRACAO");
    await prisma.department.create({
      data: { name, description, secretariatId }
    });
  } catch {
    return { error: "Erro ao criar departamento" };
  }

  revalidatePath("/administracao/departamentos");
  revalidatePath("/administracao"); 
  redirect("/administracao/departamentos");
}
