import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPublicExpenses, parsePublicDataFilter } from "@/lib/transparencia/portal-fiscal";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const expenses = await getPublicExpenses(prisma, parsePublicDataFilter(request.nextUrl.searchParams));
    return NextResponse.json({
      entity: "Prefeitura Municipal de Lagoa Seca/PB",
      updatedAt: expenses.updatedAt?.toISOString() ?? null,
      total: expenses.total,
      page: expenses.page,
      pageSize: expenses.pageSize,
      data: expenses.data,
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Parâmetro")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao consultar despesas públicas." }, { status: 500 });
  }
}
