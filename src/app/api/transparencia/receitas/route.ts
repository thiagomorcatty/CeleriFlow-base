import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPublicRevenues, parsePublicDataFilter } from "@/lib/transparencia/portal-fiscal";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const revenues = await getPublicRevenues(prisma, parsePublicDataFilter(request.nextUrl.searchParams));
    return NextResponse.json({
      entity: "Prefeitura Municipal de Lagoa Seca/PB",
      updatedAt: revenues.updatedAt?.toISOString() ?? null,
      total: revenues.total,
      page: revenues.page,
      pageSize: revenues.pageSize,
      data: revenues.data,
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Parâmetro")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao consultar receitas públicas." }, { status: 500 });
  }
}
