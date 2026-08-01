import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPublicExpenses } from "@/lib/transparencia/portal-fiscal";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const expenses = await getPublicExpenses(prisma);
    return NextResponse.json({
      entity: "Prefeitura Municipal de Lagoa Seca/PB",
      updatedAt: new Date().toISOString(),
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao consultar despesas públicas." }, { status: 500 });
  }
}
