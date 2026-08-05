"use server";
import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUnit(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const secretariatId = formData.get("secretariatId") as string;
  const address = formData.get("address") as string;
  const managerName = formData.get("managerName") as string;

  if (!name || !type || !secretariatId) return { error: "Nome, Tipo e Secretaria são obrigatórios" };

  try {
    const { prisma } = await getTenantContextForModuleEdit("ADMINISTRACAO");
    await prisma.administrativeUnit.create({
      data: { name, type, secretariatId, address, managerName }
    });
  } catch (error) {
    return { error: "Erro ao criar unidade" };
  }

  revalidatePath("/administracao/unidades");
  revalidatePath("/administracao"); 
  redirect("/administracao/unidades");
}
