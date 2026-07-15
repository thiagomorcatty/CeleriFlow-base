"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDepartment(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const secretariatId = formData.get("secretariatId") as string;

  if (!name || !secretariatId) throw new Error();

  try {
    await prisma.department.create({
      data: { name, description, secretariatId }
    });
  } catch (error) {
    throw new Error();
  }

  revalidatePath("/administracao/departamentos");
  revalidatePath("/administracao"); 
  redirect("/administracao/departamentos");
}
