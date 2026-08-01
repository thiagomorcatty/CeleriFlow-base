import type { PrismaClient } from "@prisma/client";
import {
  generateBalancoOrcamentario,
  generateBalancoPatrimonial,
  generateBalanceteContabil,
  generateDiarioContabil,
  generateRazaoContabil,
  generateRGF,
  generateRREO,
} from "@/lib/financeiro/relatorios-legais";
import { exportPublicDataCSV } from "@/lib/transparencia/portal-fiscal";

type ReportRow = Record<string, string | number>;

export const financialReportOptions = [
  { type: "DIARIO", label: "Diário Contábil" },
  { type: "RAZAO", label: "Razão Contábil" },
  { type: "BALANCETE", label: "Balancete Contábil" },
  { type: "RREO", label: "RREO" },
  { type: "RGF", label: "RGF" },
  { type: "BALANCO_ORCAMENTARIO", label: "Balanço Orçamentário" },
  { type: "BALANCO_PATRIMONIAL", label: "Balanço Patrimonial" },
] as const;

export type FinancialReportType = (typeof financialReportOptions)[number]["type"];

export function isFinancialReportType(value: string | null): value is FinancialReportType {
  return financialReportOptions.some((option) => option.type === value);
}

export function financialReportFilename(reportType: FinancialReportType, year: number) {
  return `relatorio-${reportType.toLowerCase()}-${year}.csv`;
}

function isoDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

function csvResult(rows: ReportRow[]) {
  const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const normalizedRows = rows.map((row) =>
    Object.fromEntries(headers.map((header) => [header, row[header] ?? ""])) as ReportRow,
  );
  return { csv: exportPublicDataCSV(normalizedRows), rowCount: rows.length };
}

// The rows below are only a CSV representation. Values always originate in the legal-report generators.
export async function generateFinancialReportCsv(
  db: PrismaClient,
  reportType: FinancialReportType,
  financialYearId: string,
) {
  const filter = { financialYearId };

  switch (reportType) {
    case "DIARIO": {
      const report = await generateDiarioContabil(db, filter);
      return csvResult(report.flatMap((transaction) => transaction.entries.map((entry) => ({
        data: isoDate(transaction.date),
        historico: transaction.history,
        contaCodigo: entry.accountCode,
        contaNome: entry.accountName,
        tipo: entry.type,
        valor: entry.value,
      }))));
    }
    case "RAZAO": {
      const report = await generateRazaoContabil(db, filter);
      return csvResult(report.map((entry) => ({
        data: isoDate(entry.date),
        historico: entry.history,
        contaCodigo: entry.accountCode,
        contaNome: entry.accountName,
        tipo: entry.type,
        valor: entry.value,
      })));
    }
    case "BALANCETE": {
      const report = await generateBalanceteContabil(db, filter);
      return csvResult(report.map((account) => ({
        contaCodigo: account.code,
        contaNome: account.name,
        totalDebitos: account.debitTotal,
        totalCreditos: account.creditTotal,
        saldo: account.balance,
      })));
    }
    case "RREO": {
      const report = await generateRREO(db, filter);
      return csvResult([
        ...report.revenueSummary.map((revenue) => ({
          secao: "Receitas",
          codigo: revenue.revenueNatureCode,
          descricao: revenue.revenueNatureName,
          valorPrevisto: revenue.predictedValue,
          valorRealizado: revenue.realizedValue,
        })),
        ...report.expenseSummary.map((expense) => ({
          secao: "Despesas",
          codigo: expense.expenseNatureCode,
          descricao: expense.expenseNatureName,
          valorFixado: expense.fixedValue,
          valorAtualizado: expense.updatedValue,
          valorEmpenhado: expense.committedValue,
          valorLiquidado: expense.settledValue,
          valorPago: expense.paidValue,
        })),
        { secao: "Total", descricao: "Despesa fixada legal", valorFixado: report.totalLegalFixedExpense },
      ]);
    }
    case "RGF": {
      const report = await generateRGF(db, filter);
      return csvResult([{
        receitaCorrenteLiquida: report.receitaCorrenteLiquida,
        despesaTotalPessoal: report.despesaTotalPessoal,
        percentualAtingido: report.percentualAtingido,
        limiteLegal: report.limiteLegal,
        limiteAlerta: report.limiteAlerta,
        situacao: report.situacao,
      }]);
    }
    case "BALANCO_ORCAMENTARIO": {
      const report = await generateBalancoOrcamentario(db, filter);
      return csvResult([
        ...report.receitas.map((revenue) => ({
          secao: "Receitas",
          codigo: revenue.revenueNatureCode,
          descricao: revenue.revenueNatureName,
          valorPrevisto: revenue.predictedValue,
          valorRealizado: revenue.realizedValue,
        })),
        ...report.despesas.map((expense) => ({
          secao: "Despesas",
          codigo: expense.expenseNatureCode,
          descricao: expense.expenseNatureName,
          valorFixado: expense.fixedValue,
          valorEmpenhado: expense.committedValue,
          valorLiquidado: expense.settledValue,
          valorPago: expense.paidValue,
        })),
        { secao: "Totais", descricao: "Receita prevista", valor: report.totais.totalReceitaPrevista },
        { secao: "Totais", descricao: "Receita realizada", valor: report.totais.totalReceitaRealizada },
        { secao: "Totais", descricao: "Despesa fixada", valor: report.totais.totalDespesaFixada },
        { secao: "Totais", descricao: "Despesa empenhada", valor: report.totais.totalDespesaEmpenhada },
        { secao: "Totais", descricao: "Despesa liquidada", valor: report.totais.totalDespesaLiquidada },
        { secao: "Totais", descricao: "Despesa paga", valor: report.totais.totalDespesaPaga },
        { secao: "Totais", descricao: "Superávit ou déficit orçamentário", valor: report.totais.superavitDeficitOrcamentario },
      ]);
    }
    case "BALANCO_PATRIMONIAL": {
      const report = await generateBalancoPatrimonial(db, filter);
      return csvResult([
        ...report.ativo.map((account) => ({ secao: "Ativo", contaCodigo: account.code, contaNome: account.name, saldo: account.balance })),
        ...report.passivo.map((account) => ({ secao: "Passivo", contaCodigo: account.code, contaNome: account.name, saldo: account.balance })),
        ...report.patrimonioLiquido.map((account) => ({ secao: "Patrimônio líquido", contaCodigo: account.code, contaNome: account.name, saldo: account.balance })),
        { secao: "Totais", contaNome: "Ativo", saldo: report.totais.totalAtivo },
        { secao: "Totais", contaNome: "Passivo", saldo: report.totais.totalPassivo },
        { secao: "Totais", contaNome: "Patrimônio líquido", saldo: report.totais.totalPatrimonioLiquido },
        { secao: "Totais", contaNome: "Balanço equilibrado", saldo: report.totais.balancoEquilibrado ? "Sim" : "Não" },
      ]);
    }
  }
}
