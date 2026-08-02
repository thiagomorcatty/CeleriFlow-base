import { NextRequest, NextResponse } from "next/server";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import {
  generateCommitmentPrintHtml,
  generateSettlementPrintHtml,
  generatePaymentPrintHtml,
} from "@/lib/financeiro/report-print";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    const documentType = request.nextUrl.searchParams.get("type");
    const id = request.nextUrl.searchParams.get("id");

    if (!documentType) {
      return NextResponse.json({ error: "Tipo de documento não informado." }, { status: 400 });
    }

    let html = "";

    switch (documentType) {
      case "EMPENHO": {
        if (!id) return NextResponse.json({ error: "ID do empenho não informado." }, { status: 400 });
        const commitment = await context.prisma.commitment.findUnique({
          where: { id },
          include: {
            appropriation: {
              include: {
                budgetUnit: true,
                expenseNature: true,
                resourceSource: true,
              },
            },
            creditor: true,
          },
        });
        if (!commitment) return NextResponse.json({ error: "Empenho não encontrado." }, { status: 404 });

        html = generateCommitmentPrintHtml({
          number: commitment.number,
          date: commitment.date.toISOString().slice(0, 10),
          type: commitment.type,
          budgetUnitCode: commitment.appropriation.budgetUnit.code,
          budgetUnitName: commitment.appropriation.budgetUnit.name,
          appropriationCode: commitment.appropriation.code,
          resourceSourceCode: commitment.appropriation.resourceSource.code,
          resourceSourceName: commitment.appropriation.resourceSource.name,
          expenseNatureCode: commitment.appropriation.expenseNature.code,
          expenseNatureName: commitment.appropriation.expenseNature.name,
          creditorName: commitment.creditor?.name ?? "Credor Não Informado",
          creditorDocument: commitment.creditor?.document ?? "000.000.000-00",
          historical: commitment.history,
          value: Number(commitment.valueDecimal ?? commitment.value),
        });
        break;
      }

      case "LIQUIDACAO": {
        if (!id) return NextResponse.json({ error: "ID da liquidação não informado." }, { status: 400 });
        const settlement = await context.prisma.settlement.findUnique({
          where: { id },
          include: {
            commitment: {
              include: {
                appropriation: { include: { budgetUnit: true } },
                creditor: true,
              },
            },
          },
        });
        if (!settlement) return NextResponse.json({ error: "Liquidação não encontrada." }, { status: 404 });

        const grossVal = Number(settlement.valueDecimal ?? settlement.value);

        html = generateSettlementPrintHtml({
          number: settlement.id.slice(0, 10),
          date: settlement.date.toISOString().slice(0, 10),
          commitmentNumber: settlement.commitment.number,
          budgetUnitName: settlement.commitment.appropriation.budgetUnit.name,
          creditorName: settlement.commitment.creditor?.name ?? "Credor Não Informado",
          creditorDocument: settlement.commitment.creditor?.document ?? "000.000.000-00",
          historical: settlement.notes ?? settlement.commitment.history,
          value: grossVal,
          withholdingsTotal: 0,
          netValue: grossVal,
          invoiceNumber: settlement.fiscalDocumentNumber ?? undefined,
          invoiceSeries: settlement.fiscalDocumentSeries ?? undefined,
          invoiceDate: settlement.fiscalDocumentIssueDate ? settlement.fiscalDocumentIssueDate.toISOString().slice(0, 10) : undefined,
          invoiceKey: settlement.fiscalDocumentAccessKey ?? undefined,
        });
        break;
      }

      case "PAGAMENTO": {
        if (!id) return NextResponse.json({ error: "ID do pagamento não informado." }, { status: 400 });
        const payment = await context.prisma.payment.findUnique({
          where: { id },
          include: {
            settlement: true,
            commitment: {
              include: {
                creditor: true,
              },
            },
            bankAccount: true,
          },
        });
        if (!payment) return NextResponse.json({ error: "Pagamento não encontrado." }, { status: 404 });

        const gross = Number(payment.valueDecimal ?? payment.value);
        const net = Number(payment.netValueDecimal ?? gross);

        html = generatePaymentPrintHtml({
          number: payment.orderNumber,
          date: payment.date.toISOString().slice(0, 10),
          settlementNumber: payment.settlement?.id.slice(0, 10) ?? "N/A",
          commitmentNumber: payment.commitment.number,
          bankAccountName: payment.bankAccount.bankName,
          bankAgencyAccount: `${payment.bankAccount.agency} / ${payment.bankAccount.accountNumber}`,
          creditorName: payment.commitment.creditor?.name ?? "Credor Não Informado",
          creditorDocument: payment.commitment.creditor?.document ?? "000.000.000-00",
          grossValue: gross,
          withholdingValue: Math.max(0, gross - net),
          netPaidValue: net,
          historical: payment.commitment.history,
        });
        break;
      }

      default:
        return NextResponse.json({ error: "Tipo de impressão não suportado." }, { status: 400 });
    }

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Erro ao gerar impressão oficial:", error);
    return NextResponse.json({ error: "Não foi possível gerar o documento imprimível." }, { status: 500 });
  }
}
