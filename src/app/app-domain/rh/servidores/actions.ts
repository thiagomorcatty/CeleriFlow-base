"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveServidor(formData: FormData) {
  try {
    const id = formData.get("id") as string | null;
    const name = formData.get("name") as string;
    const cpf = formData.get("cpf") as string;
    const registration = formData.get("registration") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const roleId = formData.get("roleId") as string;
    const departmentId = formData.get("departmentId") as string;
    const secretariatId = formData.get("secretariatId") as string;
    const isActive = formData.get("isActive") === "true";
    const salaryBase = parseFloat(formData.get("salaryBase") as string) || 0;
    const contractedHours = parseInt(formData.get("contractedHours") as string, 10) || 220;

    if (!name) {
      return { success: false, error: "Nome é obrigatório." };
    }

    const data = {
      name,
      cpf: cpf || null,
      registration: registration || null,
      email: email || null,
      phone: phone || null,
      roleId: roleId || null,
      departmentId: departmentId || null,
      secretariatId: secretariatId || null,
      isActive,
      salaryBase,
      contractedHours
    };

    if (id) {
      await prisma.employee.update({
        where: { id },
        data,
      });
    } else {
      await prisma.employee.create({
        data,
      });
    }

    revalidatePath("/rh/servidores");
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar servidor:", error);
    return { success: false, error: "Falha ao salvar o servidor. Verifique se o CPF já está cadastrado." };
  }
}

export async function toggleServidorStatus(id: string, isActive: boolean) {
  try {
    await prisma.employee.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/rh/servidores");
    return { success: true };
  } catch (error) {
    console.error("Erro ao alterar status do servidor:", error);
    return { success: false, error: "Falha ao alterar status." };
  }
}

export async function deleteServidor(id: string) {
  try {
    // Delete is dangerous as it may fail due to foreign key constraints.
    // The preferred way in this module is soft-delete via toggleServidorStatus,
    // but we'll provide this for explicitly incorrect entries.
    await prisma.employee.delete({
      where: { id },
    });
    revalidatePath("/rh/servidores");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir servidor:", error);
    return { success: false, error: "Não é possível excluir um servidor que possui vínculos (processos, documentos, folha). Inative-o em vez disso." };
  }
}
