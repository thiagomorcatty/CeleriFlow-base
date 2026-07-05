"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRole(formData: FormData) {
  const name = formData.get("name") as string;
  const level = formData.get("level") as string;
  const description = formData.get("description") as string;
  const canSign = formData.get("canSign") === "on";

  if (!name) return { error: "Nome é obrigatório" };

  try {
    await prisma.role.create({
      data: { name, level, description, canSign }
    });
  } catch (error) {
    return { error: "Erro ao criar cargo" };
  }

  revalidatePath("/app-domain/administracao/cargos");
  revalidatePath("/app-domain/administracao"); 
  redirect("/administracao/cargos");
}
