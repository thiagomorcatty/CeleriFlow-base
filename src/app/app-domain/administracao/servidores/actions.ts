"use server";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEmployee(formData: FormData) {
  const name = formData.get("name") as string;
  const cpf = formData.get("cpf") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const registration = formData.get("registration") as string;
  
  const roleId = formData.get("roleId") as string || null;
  const secretariatId = formData.get("secretariatId") as string || null;
  const departmentId = formData.get("departmentId") as string || null;
  const unitId = formData.get("unitId") as string || null;

  if (!name || !cpf) return { error: "Nome e CPF são obrigatórios" };

  try {
    const { prisma } = await getTenantContextForModule("ADMINISTRACAO");
    await prisma.employee.create({
      data: { name, cpf, email, phone, registration, roleId, secretariatId, departmentId, unitId }
    });
  } catch (error: any) {
    console.error("Error creating employee:", error);
    return { error: error.message || "Erro desconhecido ao cadastrar servidor." };
  }

  revalidatePath("/administracao/servidores");
  revalidatePath("/administracao"); 
  redirect("/administracao/servidores");
}
