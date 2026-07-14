"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSchoolMeal(formData: FormData) {
  const schoolId = formData.get("schoolId") as string;
  const menu = formData.get("menu") as string;
  const servedQuantity = Number(formData.get("servedQuantity")) || 0;
  const totalCost = Number(formData.get("totalCost")) || 0;
  const notes = formData.get("notes") as string;

  if (!schoolId || !menu || servedQuantity <= 0) {
    return { error: "Escola, Cardápio e Quantidade são obrigatórios." };
  }

  try {
    // 1. Create the SchoolMeal record
    const meal = await prisma.schoolMeal.create({
      data: {
        schoolId,
        menu,
        servedQuantity,
        totalCost,
        notes,
      },
    });

    // 2. Integration with Finance (Create Expense/Empenho if cost > 0)
    if (totalCost > 0) {
      // Find Education secretariat
      let secretariat = await prisma.secretariat.findFirst({
        where: { name: { contains: "Educação", mode: "insensitive" } }
      });

      // Fallback: If no "Educação" secretariat, just get the first one available
      if (!secretariat) {
        secretariat = await prisma.secretariat.findFirst();
      }

      // We need a BudgetAppropriation
      let appropriation = await prisma.budgetAppropriation.findFirst();

      if (secretariat && appropriation) {
        await prisma.expense.create({
          data: {
            description: `Custo Merenda Escolar - ${menu}`,
            value: totalCost,
            status: "Empenhada", // Automaticly empenhada
            appropriationId: appropriation.id,
            secretariatId: secretariat.id,
          }
        });
      }
    }

  } catch (error: any) {
    console.error("Erro ao registrar merenda:", error);
    return { error: "Ocorreu um erro ao registrar a merenda e integrar com financeiro." };
  }

  revalidatePath("/app-domain/educacao/merenda");
  redirect("/educacao/merenda");
}
