"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModuleEdit("RH")).prisma;
}

export async function saveLicenca(formData: FormData) {
  const prisma = await getTenantPrisma();
  try {
    const id = formData.get("id") as string | null;
    const employeeId = formData.get("employeeId") as string;
    const type = formData.get("type") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;

    if (!employeeId || !type || !startDate || !endDate) {
      return { success: false, error: "Servidor, Tipo e Período são obrigatórios." };
    }

    const data = {
      employeeId,
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      description: description || null,
      status: status || "Ativa",
    };

    if (id) {
      await prisma.leave.update({
        where: { id },
        data,
      });
    } else {
      await prisma.leave.create({
        data,
      });
    }

    revalidatePath("/rh/licencas");
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar licença:", error);
    return { success: false, error: "Falha ao salvar a licença." };
  }
}

export async function deleteLicenca(id: string) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.leave.delete({
      where: { id },
    });
    revalidatePath("/rh/licencas");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir licença:", error);
    return { success: false, error: "Falha ao excluir o registro de licença." };
  }
}
