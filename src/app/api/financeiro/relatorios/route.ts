import { NextRequest, NextResponse } from "next/server";
import { financialReportFilename, generateInternalReportDataset, isFinancialReportType, isReportFormat, reportDatasetCsv, savePublicFinancialReportSnapshot } from "@/lib/financeiro/report-delivery";
import { generateReportPdf } from "@/lib/financeiro/report-export";
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
    const format = request.nextUrl.searchParams.get("format") ?? "CSV";
    if (!financialYearId || !isFinancialReportType(reportType) || !isReportFormat(format)) {
      return NextResponse.json({ error: "Selecione um exercício, tipo de relatório e formato válidos." }, { status: 400 });
    }

    const financialYear = await context.prisma.financialYear.findUnique({
      where: { id: financialYearId },
      select: { id: true, year: true },
    });
    if (!financialYear) throw new AccessError("Exercício financeiro não encontrado.", 404);

    const dataset = await generateInternalReportDataset(context.prisma, reportType, financialYear.id, financialYear.year);
    const csv = reportDatasetCsv(dataset);
    const snapshot = await savePublicFinancialReportSnapshot(context.prisma, {
      reportType,
      financialYearId: financialYear.id,
      year: financialYear.year,
      csv: csv.csv,
    });
    await context.prisma.financialAuditLog.create({
      data: {
        action: "ISSUE",
        entityType: "FinancialReport",
        entityId: `${reportType}:${financialYear.id}`,
        financialYearId: financialYear.id,
        payload: { reportType, format, rowCount: csv.rowCount, publicSnapshot: snapshot },
        authorUsuarioId: context.user.id,
        authorEmployeeId: context.user.employeeId,
      },
    });

    const body = format === "CSV" ? csv.csv : await generateReportPdf(dataset);
    const contentType = format === "CSV"
      ? "text/csv; charset=utf-8"
      : "application/pdf";

    return new NextResponse(body as unknown as BodyInit, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${financialReportFilename(reportType, financialYear.year, format)}"`,
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
