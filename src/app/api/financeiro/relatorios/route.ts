import { NextRequest, NextResponse } from "next/server";
import { financialReportFilename, generateFinancialReportCsv, isFinancialReportType } from "@/lib/financeiro/report-delivery";
import { AccessError, getTenantContextForModule, isSystemAdministrator } from "@/lib/platform/tenant-context";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    if (!isSystemAdministrator(context.user)) {
      // Accounting entries and revenue are currently consolidated, so unit-scoped users must not receive this export.
      throw new AccessError("A emissão de relatórios consolidados é restrita ao administrador do sistema.", 403);
    }

    const financialYearId = request.nextUrl.searchParams.get("financialYearId");
    const reportType = request.nextUrl.searchParams.get("reportType");
    if (!financialYearId || !isFinancialReportType(reportType)) {
      return NextResponse.json({ error: "Selecione um exercício e um tipo de relatório válido." }, { status: 400 });
    }

    const financialYear = await context.prisma.financialYear.findUnique({
      where: { id: financialYearId },
      select: { id: true, year: true },
    });
    if (!financialYear) throw new AccessError("Exercício financeiro não encontrado.", 404);

    const result = await generateFinancialReportCsv(context.prisma, reportType, financialYear.id);
    await context.prisma.financialAuditLog.create({
      data: {
        action: "ISSUE",
        entityType: "FinancialReport",
        entityId: `${reportType}:${financialYear.id}`,
        financialYearId: financialYear.id,
        payload: { reportType, format: "CSV", rowCount: result.rowCount },
        authorUsuarioId: context.user.id,
        authorEmployeeId: context.user.employeeId,
      },
    });

    return new NextResponse(result.csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${financialReportFilename(reportType, financialYear.year)}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof AccessError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Erro ao emitir relatório financeiro:", error);
    return NextResponse.json({ error: "Não foi possível emitir o relatório financeiro." }, { status: 500 });
  }
}
