import { NextRequest, NextResponse } from "next/server";
import { AccessError, getTenantContextForModule, isSystemAdministrator } from "@/lib/platform/tenant-context";
import { generateBankStatementPdf } from "@/lib/financeiro/bank-statement-pdf";
import { getFile } from "@/lib/platform/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const context = await getTenantContextForModule("FINANCEIRO");
    const download = await context.prisma.automatedBankDownload.findUnique({ where: { id } });
    if (!download) return NextResponse.json({ error: "Extrato não encontrado." }, { status: 404 });
    const account = await context.prisma.bankAccount.findFirst({
      where: { bankName: download.banco, agency: download.agencia, accountNumber: download.contaNumero },
      select: {
        id: true,
        budgetUnitId: true,
        bankName: true,
        agency: true,
        accountNumber: true,
        purpose: true,
        currentBalanceDecimal: true,
        currentBalance: true,
        linkedInvestmentAccount: { select: { id: true, currentBalanceDecimal: true, currentBalance: true } },
      },
    });
    if (!isSystemAdministrator(context.user) && (!account?.budgetUnitId || !context.user.allowedBudgetUnitIds.includes(account.budgetUnitId))) {
      throw new AccessError("Acesso negado à unidade gestora do extrato bancário.", 403);
    }

    if (!account) return NextResponse.json({ error: "Conta bancária vinculada ao extrato não encontrada." }, { status: 404 });

    // Preserve and present the immutable source file when it has been archived.
    // The formatted PDF below remains only as a fallback for legacy history rows.
    const archivedFile = await getFile(download.caminhoDestino);
    if (archivedFile?.stream) {
      await context.prisma.financialAuditLog.create({
        data: {
          action: "CONSULTA_EXTRATO_ORIGINAL",
          entityType: "AutomatedBankDownload",
          entityId: download.id,
          authorUsuarioId: context.user.id,
        },
      });
      return new NextResponse(archivedFile.stream, {
        headers: {
          "Content-Type": archivedFile.blob.contentType || "application/octet-stream",
          "Content-Disposition": `inline; filename="${download.nomeArquivo}"`,
          "Cache-Control": "no-store",
        },
      });
    }

    const [items, allocations] = await Promise.all([
      context.prisma.bankStatementItem.findMany({
        where: { downloadId: download.id },
        orderBy: [{ date: "asc" }, { codigoTransacao: "asc" }],
        select: { date: true, description: true, reference: true, sinal: true, valueDecimal: true, saldoResultanteDecimal: true },
      }),
      account.linkedInvestmentAccount
        ? context.prisma.investmentAllocation.findMany({
            where: { investmentBankAccountId: account.linkedInvestmentAccount.id, status: "ATIVA" },
            orderBy: { createdAt: "asc" },
            select: { createdAt: true, valueDecimal: true, treasuryTransfer: { select: { history: true } } },
          })
        : Promise.resolve([]),
    ]);

    const statementItems = items.map((item) => ({
      date: item.date,
      description: item.description,
      reference: item.reference,
      signal: item.sinal,
      value: Number(item.valueDecimal),
      balance: item.saldoResultanteDecimal ? Number(item.saldoResultanteDecimal) : null,
    }));
    const investmentAccount = account.linkedInvestmentAccount;
    const investmentCurrentBalance = investmentAccount
      ? Number(investmentAccount.currentBalanceDecimal ?? investmentAccount.currentBalance)
      : Number(account.currentBalanceDecimal ?? account.currentBalance);
    const investmentItems = statementItems.filter((item) => /APLIC|RESG|REND/i.test(item.description || ""));
    const applications = investmentItems.filter((item) => item.signal === "DEBITO" && /APLIC/i.test(item.description || "")).reduce((sum, item) => sum + item.value, 0);
    const redemptions = investmentItems.filter((item) => item.signal === "CREDITO" && /RESG/i.test(item.description || "")).reduce((sum, item) => sum + item.value, 0);
    const grossYield = investmentItems.filter((item) => /REND/i.test(item.description || "")).reduce((sum, item) => sum + item.value, 0);
    const hasInvestmentData = download.tipoConta === "APLICACAO" || investmentItems.length > 0;
    const pdf = await generateBankStatementPdf({
      bankName: account.bankName,
      agency: account.agency,
      accountNumber: account.accountNumber,
      accountPurpose: account.purpose,
      periodStart: download.periodoInicio,
      periodEnd: download.periodoFim,
      generatedAt: new Date(),
      statementType: download.tipoConta === "APLICACAO" ? "APLICACAO" : "CORRENTE",
      currentBalance: hasInvestmentData ? investmentCurrentBalance : Number(account.currentBalanceDecimal ?? account.currentBalance),
      items: statementItems,
      investment: hasInvestmentData ? {
        openingBalance: investmentCurrentBalance - applications + redemptions - grossYield,
        applications,
        redemptions,
        grossYield,
        incomeTax: 0,
        iof: 0,
        allocations: allocations.map((allocation) => ({ date: allocation.createdAt, reference: allocation.treasuryTransfer?.history ?? null, value: Number(allocation.valueDecimal) })),
      } : undefined,
    });

    await context.prisma.financialAuditLog.create({
      data: {
        action: "CONSULTA_EXTRATO_FORMATADO",
        entityType: "AutomatedBankDownload",
        entityId: download.id,
        authorUsuarioId: context.user.id,
      },
    });

    const fileName = `extrato-${download.contaNumero.replace(/[^a-zA-Z0-9]+/g, "-")}-${download.periodoFim.toISOString().slice(0, 10)}.pdf`;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(pdf);
        controller.close();
      },
    });
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${fileName}"`,
      },
    });
  } catch (error) {
    if (error instanceof AccessError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error("Erro ao abrir extrato bancário arquivado:", error);
    return NextResponse.json({ error: "Não foi possível abrir o extrato arquivado." }, { status: 500 });
  }
}
