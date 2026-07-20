"use server";

import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return (await getTenantContextForModule("RH")).prisma;
}

export async function saveFerias(formData: FormData) {
  const prisma = await getTenantPrisma();
  try {
    const id = formData.get("id") as string | null;
    const employeeId = formData.get("employeeId") as string;
    const acquisitionStart = formData.get("acquisitionStart") as string;
    const acquisitionEnd = formData.get("acquisitionEnd") as string;
    const enjoymentStart = formData.get("enjoymentStart") as string;
    const enjoymentEnd = formData.get("enjoymentEnd") as string;
    const days = parseInt(formData.get("days") as string, 10);
    const status = formData.get("status") as string;

    if (!employeeId || !acquisitionStart || !acquisitionEnd) {
      return { success: false, error: "Servidor e Período Aquisitivo são obrigatórios." };
    }

    const data = {
      employeeId,
      acquisitionStart: new Date(acquisitionStart),
      acquisitionEnd: new Date(acquisitionEnd),
      enjoymentStart: enjoymentStart ? new Date(enjoymentStart) : null,
      enjoymentEnd: enjoymentEnd ? new Date(enjoymentEnd) : null,
      days: isNaN(days) ? 30 : days,
      status: status || "A vencer",
    };

    if (id) {
      await prisma.vacation.update({
        where: { id },
        data,
      });
    } else {
      await prisma.vacation.create({
        data,
      });
    }

    revalidatePath("/rh/ferias");
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar férias:", error);
    return { success: false, error: "Falha ao salvar as férias." };
  }
}

export async function deleteFerias(id: string) {
  const prisma = await getTenantPrisma();
  try {
    await prisma.vacation.delete({
      where: { id },
    });
    revalidatePath("/rh/ferias");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir férias:", error);
    return { success: false, error: "Falha ao excluir o registro de férias." };
  }
}
