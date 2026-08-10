import { NextRequest, NextResponse } from "next/server";
import { financialReportFilename, generateInternalReportDataset, isFinancialReportType, isReportFormat, isReportMonth, reportDatasetCsv, reportRequiresMonth, savePublicFinancialReportSnapshot } from "@/lib/financeiro/report-delivery";
import { generateReportPdf } from "@/lib/financeiro/report-export";
import { ensureFinancialGedFolder, saveFinancialFileToGed } from "@/lib/financeiro/ged";
import { AccessError, canIssueFinancialReports, getTenantContextForModuleEdit, isSystemAdministrator } from "@/lib/platform/tenant-context";
import { auditEventTypes, writeAuditEvent } from "@/lib/platform/audit-evidence";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    if (!canIssueFinancialReports(context.user)) {
      // Accounting entries and revenue are currently consolidated, so unit-scoped users must not receive this export.
      throw new AccessError("A emissão de relatórios consolidados é restrita ao administrador do sistema.", 403);
    }

    const financialYearId = request.nextUrl.searchParams.get("financialYearId");
    const reportType = request.nextUrl.searchParams.get("reportType");
    const format = request.nextUrl.searchParams.get("format") ?? "CSV";
    if (!financialYearId || !isFinancialReportType(reportType) || !isReportFormat(format)) {
      return NextResponse.json({ error: "Selecione um exercício, tipo de relatório e formato válidos." }, { status: 400 });
    }
    const monthParameter = request.nextUrl.searchParams.get("month");
    const month = monthParameter === null || monthParameter === "" ? undefined : Number(monthParameter);
    if ((reportRequiresMonth(reportType) && !isReportMonth(month ?? null)) || (month !== undefined && !isReportMonth(month))) {
      return NextResponse.json({ error: "Informe um mês válido para o relatório selecionado." }, { status: 400 });
    }

    const financialYear = await context.prisma.financialYear.findUnique({
      where: { id: financialYearId },
      select: { id: true, year: true },
    });
    if (!financialYear) throw new AccessError("Exercício financeiro não encontrado.", 404);

    const dataset = await generateInternalReportDataset(context.prisma, reportType, financialYear.id, financialYear.year, { month });
    const csv = reportDatasetCsv(dataset);
    let snapshot: Awaited<ReturnType<typeof savePublicFinancialReportSnapshot>> = null;
    let snapshotError: string | undefined;
    if (isSystemAdministrator(context.user)) {
      try {
        snapshot = await savePublicFinancialReportSnapshot(context.prisma, {
          reportType,
          financialYearId: financialYear.id,
          year: financialYear.year,
          csv: csv.csv,
        });
      } catch (error) {
        // The internal export remains available when optional public publication is unavailable.
        snapshotError = error instanceof Error ? error.message : "Falha desconhecida ao publicar snapshot público.";
        console.error("Erro ao publicar snapshot público de relatório financeiro:", error);
      }
    }
    const body = format === "CSV" ? csv.csv : await generateReportPdf(dataset);
    const contentType = format === "CSV"
      ? "text/csv; charset=utf-8"
      : "application/pdf";
    const filename = financialReportFilename(reportType, financialYear.year, format);
    const gedDocument = format === "CSV" && snapshot
      ? { documentId: snapshot.documentId, folderId: await ensureFinancialGedFolder(context.prisma) }
      : await saveFinancialFileToGed(context.prisma, {
          title: `${dataset.title} - ${financialYear.year}`,
          documentType: `FINANCEIRO:RELATORIO:${reportType}`,
          filename,
          content: body,
          contentType,
        });
    revalidatePath("/documentos/ged");
    revalidatePath("/documentos");

    await context.prisma.financialAuditLog.create({
      data: {
        action: "ISSUE",
        entityType: "FinancialReport",
        entityId: `${reportType}:${financialYear.id}`,
        financialYearId: financialYear.id,
        payload: { reportType, format, rowCount: csv.rowCount, gedDocumentId: gedDocument.documentId, publicSnapshot: snapshot, publicSnapshotError: snapshotError },
        authorUsuarioId: context.user.id,
        authorEmployeeId: context.user.employeeId,
      },
    });

    await writeAuditEvent(context.prisma, {
      actorUsuarioId: context.user.id,
      eventType: auditEventTypes.financialReportExport,
      targetType: "FINANCIAL_REPORT",
      targetId: `${reportType}:${financialYear.id}`,
    });

    return new NextResponse(body as unknown as BodyInit, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
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
