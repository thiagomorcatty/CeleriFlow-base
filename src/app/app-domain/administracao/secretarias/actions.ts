"use server";
import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSecretariat(formData: FormData) {
  const name = formData.get("name") as string;
  const acronym = formData.get("acronym") as string;
  const managerName = formData.get("managerName") as string;

  if (!name) return { error: "Nome é obrigatório" };

  try {
    const { prisma } = await getTenantContextForModuleEdit("ADMINISTRACAO");
    await prisma.secretariat.create({
      data: { name, acronym, managerName }
    });
  } catch {
    return { error: "Erro ao criar secretaria" };
  }

  revalidatePath("/administracao/secretarias");
  revalidatePath("/administracao"); 
  redirect("/administracao/secretarias");
}
