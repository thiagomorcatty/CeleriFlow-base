"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModuleEdit("RH")).prisma;
}

export async function saveDependente(formData: FormData) {
  const prisma = await getTenantPrisma();
  try {
    const id = formData.get("id") as string | null;
    const employeeId = formData.get("employeeId") as string;
    const name = formData.get("name") as string;
    const cpf = formData.get("cpf") as string;
    const birthDate = formData.get("birthDate") as string;
    const relationship = formData.get("relationship") as string;

    if (!employeeId || !name || !birthDate || !relationship) {
      return { success: false, error: "Servidor, Nome, Data de Nascimento e Parentesco são obrigatórios." };
    }

    const data = {
      employeeId,
      name,
      cpf: cpf || null,
      birthDate: new Date(birthDate),
      relationship,
    };

    if (id) {
      await prisma.dependent.update({
        where: { id },
        data,
      });
    } else {
      await prisma.dependent.create({
        data,
      });
    }

    revalidatePath("/rh/dependentes");
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar dependente:", error);
    return { success: false, error: "Falha ao salvar o dependente." };
  }
}

export async function deleteDependente(id: string) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.dependent.delete({
      where: { id },
    });
    revalidatePath("/rh/dependentes");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir dependente:", error);
    return { success: false, error: "Falha ao excluir o dependente." };
  }
}
