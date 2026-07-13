"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveFolha(formData: FormData) {
  try {
    const id = formData.get("id") as string | null;
    const competence = formData.get("competence") as string;
    const type = formData.get("type") as string;
    const status = formData.get("status") as string;

    if (!competence) {
      return { success: false, error: "Competência é obrigatória." };
    }

    const data = {
      competence,
      type: type || "Mensal",
      status: status || "Aberta",
    };

    if (id) {
      await prisma.payroll.update({
        where: { id },
        data,
      });
    } else {
      await prisma.payroll.create({
        data,
      });
    }

    revalidatePath("/rh/folha");
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar folha:", error);
    return { success: false, error: "Falha ao salvar a folha de pagamento." };
  }
}

export async function deleteFolha(id: string) {
  try {
    await prisma.payroll.delete({
      where: { id },
    });
    revalidatePath("/rh/folha");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir folha:", error);
    return { success: false, error: "Falha ao excluir. Verifique se existem itens vinculados a esta folha." };
  }
}
