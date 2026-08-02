import { createHash } from "node:crypto";
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
import { uploadGeneratedReport } from "@/lib/platform/blob";
import { isPublicFinancialReportType, publicFinancialReportDocumentType, type PublicFinancialReportType } from "@/lib/transparencia/portal-public";

export type ReportRow = Record<string, string | number>;
export type ReportSection = { title: string; rows: ReportRow[] };
export type InternalReportDataset = {
  title: string;
  year: number;
  warnings: string[];
  sections: ReportSection[];
};

const legalReportOptions = [
  { type: "DIARIO", label: "Diário Contábil", group: "Contabilidade" },
  { type: "RAZAO", label: "Razão Contábil", group: "Contabilidade" },
  { type: "BALANCETE", label: "Balancete Contábil", group: "Contabilidade" },
  { type: "RREO", label: "RREO", group: "Relatórios legais internos" },
  { type: "RGF", label: "RGF", group: "Relatórios legais internos" },
  { type: "BALANCO_ORCAMENTARIO", label: "Balanço Orçamentário", group: "Relatórios legais internos" },
  { type: "BALANCO_PATRIMONIAL", label: "Balanço Patrimonial", group: "Relatórios legais internos" },
] as const;

const planningReportOptions = [
  { type: "PPA", label: "PPA", group: "Planejamento" },
  { type: "LDO", label: "LDO", group: "Planejamento" },
  { type: "LOA", label: "LOA", group: "Planejamento" },
  { type: "CMD", label: "CMD - Cronograma Mensal de Desembolso", group: "Planejamento" },
  { type: "MBA", label: "MBA - Meta Bimestral de Arrecadação", group: "Planejamento" },
] as const;

const accountingReportOptions = [
  { type: "PCA", label: "PCA - Prestação de Contas Anual interna", group: "Encerramento anual" },
] as const;

export const financialReportOptions = [...legalReportOptions, ...planningReportOptions, ...accountingReportOptions] as const;
export type InternalReportType = (typeof financialReportOptions)[number]["type"];
// Kept as an alias for existing consumers of the financial-report delivery API.
export type FinancialReportType = InternalReportType;
export type ReportFormat = "CSV" | "PDF";

const internalReportWarning = "Documento interno gerado a partir dos dados registrados no CeleriFlow. Não corresponde a leiaute oficial de TCE, STN ou SICONFI.";

export function isFinancialReportType(value: string | null): value is InternalReportType {
  return financialReportOptions.some((option) => option.type === value);
}

export function isReportFormat(value: string | null): value is ReportFormat {
  return value === "CSV" || value === "PDF";
}

export function financialReportFilename(reportType: InternalReportType, year: number, format: ReportFormat = "CSV") {
  return `relatorio-${reportType.toLowerCase()}-${year}.${format.toLowerCase()}`;
}

function isoDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

function accountingDataset(title: string, year: number, sections: ReportSection[]): InternalReportDataset {
  return { title, year, warnings: [internalReportWarning], sections };
}

function ppaRows(plan: {
  code: string;
  name: string;
  startYear: number;
  endYear: number;
  status: string;
  description: string | null;
  programs: {
    code: string;
    name: string;
    type: string;
    objectives: { code: string; description: string; indicators: { name: string; unit: string; baselineValue: number; targetValue: number }[] }[];
    actions: { code: string; name: string; type: string; goals: { year: number; physical: number; financial: unknown }[] }[];
  }[];
}): ReportSection[] {
  return [
    {
      title: "Identificação",
      rows: [{ codigo: plan.code, nome: plan.name, vigenciaInicial: plan.startYear, vigenciaFinal: plan.endYear, situacao: plan.status, descricao: plan.description ?? "" }],
    },
    {
      title: "Programas, objetivos e indicadores",
      rows: plan.programs.flatMap<ReportRow>((program) => program.objectives.flatMap<ReportRow>((objective) =>
        objective.indicators.length
          ? objective.indicators.map<ReportRow>((indicator) => ({ programaCodigo: program.code, programa: program.name, tipoPrograma: program.type, objetivoCodigo: objective.code, objetivo: objective.description, indicador: indicator.name, unidade: indicator.unit, linhaBase: indicator.baselineValue, meta: indicator.targetValue }))
          : [{ programaCodigo: program.code, programa: program.name, tipoPrograma: program.type, objetivoCodigo: objective.code, objetivo: objective.description, indicador: "", unidade: "", linhaBase: "", meta: "" }],
      )),
    },
    {
      title: "Ações e metas",
      rows: plan.programs.flatMap<ReportRow>((program) => program.actions.flatMap<ReportRow>((action) =>
        action.goals.length
          ? action.goals.map<ReportRow>((goal) => ({ programaCodigo: program.code, programa: program.name, acaoCodigo: action.code, acao: action.name, tipoAcao: action.type, ano: goal.year, metaFisica: goal.physical, metaFinanceira: Number(goal.financial) }))
          : [{ programaCodigo: program.code, programa: program.name, acaoCodigo: action.code, acao: action.name, tipoAcao: action.type, ano: "", metaFisica: "", metaFinanceira: "" }],
      )),
    },
  ];
}

export async function generateInternalReportDataset(
  db: PrismaClient,
  reportType: InternalReportType,
  financialYearId: string,
  year: number,
): Promise<InternalReportDataset> {
  const filter = { financialYearId };

  switch (reportType) {
    case "DIARIO": {
      const report = await generateDiarioContabil(db, filter);
      return accountingDataset("Diário Contábil", year, [{ title: "Lançamentos", rows: report.flatMap((transaction) => transaction.entries.map((entry) => ({ data: isoDate(transaction.date), historico: transaction.history, contaCodigo: entry.accountCode, contaNome: entry.accountName, tipo: entry.type, valor: entry.value }))) }]);
    }
    case "RAZAO": {
      const report = await generateRazaoContabil(db, filter);
      return accountingDataset("Razão Contábil", year, [{ title: "Lançamentos por conta", rows: report.map((entry) => ({ data: isoDate(entry.date), historico: entry.history, contaCodigo: entry.accountCode, contaNome: entry.accountName, tipo: entry.type, valor: entry.value })) }]);
    }
    case "BALANCETE": {
      const report = await generateBalanceteContabil(db, filter);
      return accountingDataset("Balancete Contábil", year, [{ title: "Saldos por conta", rows: report.map((account) => ({ contaCodigo: account.code, contaNome: account.name, totalDebitos: account.debitTotal, totalCreditos: account.creditTotal, saldo: account.balance })) }]);
    }
    case "RREO": {
      const report = await generateRREO(db, filter);
      return accountingDataset("RREO", year, [
        { title: "Receitas", rows: report.revenueSummary.map((revenue) => ({ codigo: revenue.revenueNatureCode, descricao: revenue.revenueNatureName, valorPrevisto: revenue.predictedValue, valorRealizado: revenue.realizedValue })) },
        { title: "Despesas", rows: report.expenseSummary.map((expense) => ({ codigo: expense.expenseNatureCode, descricao: expense.expenseNatureName, valorFixado: expense.fixedValue, valorAtualizado: expense.updatedValue, valorEmpenhado: expense.committedValue, valorLiquidado: expense.settledValue, valorPago: expense.paidValue })) },
        { title: "Totais", rows: [{ descricao: "Despesa fixada legal", valorFixado: report.totalLegalFixedExpense }] },
      ]);
    }
    case "RGF": {
      const report = await generateRGF(db, filter);
      return accountingDataset("RGF", year, [{ title: "Despesa com pessoal", rows: [{ receitaCorrenteLiquida: report.receitaCorrenteLiquida, despesaTotalPessoal: report.despesaTotalPessoal, percentualAtingido: report.percentualAtingido, limiteLegal: report.limiteLegal, limiteAlerta: report.limiteAlerta, situacao: report.situacao }] }]);
    }
    case "BALANCO_ORCAMENTARIO": {
      const report = await generateBalancoOrcamentario(db, filter);
      return accountingDataset("Balanço Orçamentário", year, [
        { title: "Receitas", rows: report.receitas.map((revenue) => ({ codigo: revenue.revenueNatureCode, descricao: revenue.revenueNatureName, valorPrevisto: revenue.predictedValue, valorRealizado: revenue.realizedValue })) },
        { title: "Despesas", rows: report.despesas.map((expense) => ({ codigo: expense.expenseNatureCode, descricao: expense.expenseNatureName, valorFixado: expense.fixedValue, valorEmpenhado: expense.committedValue, valorLiquidado: expense.settledValue, valorPago: expense.paidValue })) },
        { title: "Totais", rows: Object.entries(report.totais).map(([descricao, valor]) => ({ descricao, valor })) },
      ]);
    }
    case "BALANCO_PATRIMONIAL": {
      const report = await generateBalancoPatrimonial(db, filter);
      return accountingDataset("Balanço Patrimonial", year, [
        { title: "Ativo", rows: report.ativo.map((account) => ({ contaCodigo: account.code, contaNome: account.name, saldo: account.balance })) },
        { title: "Passivo", rows: report.passivo.map((account) => ({ contaCodigo: account.code, contaNome: account.name, saldo: account.balance })) },
        { title: "Patrimônio líquido", rows: report.patrimonioLiquido.map((account) => ({ contaCodigo: account.code, contaNome: account.name, saldo: account.balance })) },
        { title: "Totais", rows: Object.entries(report.totais).map(([descricao, valor]) => ({ descricao, valor: typeof valor === "boolean" ? (valor ? "Sim" : "Não") : valor })) },
      ]);
    }
    case "PPA": {
      const plans = await db.multiYearPlan.findMany({
        where: { startYear: { lte: year }, endYear: { gte: year } },
        include: {
          programs: {
            orderBy: { code: "asc" },
            include: {
              objectives: { orderBy: { code: "asc" }, include: { indicators: { orderBy: { name: "asc" } } } },
              actions: { orderBy: { code: "asc" }, include: { goals: { orderBy: { year: "asc" } } } },
            },
          },
        },
        orderBy: { code: "asc" },
      });
      return { title: "PPA", year, warnings: [internalReportWarning], sections: plans.flatMap(ppaRows) };
    }
    case "LDO": {
      const guidelines = await db.budgetGuideline.findMany({ where: { financialYearId }, include: { multiYearPlan: { select: { code: true, name: true } }, priorities: true, risks: true }, orderBy: { createdAt: "asc" } });
      return { title: "LDO", year, warnings: [internalReportWarning], sections: [
        { title: "Diretrizes", rows: guidelines.map((guideline) => ({ ppaCodigo: guideline.multiYearPlan?.code ?? "", ppa: guideline.multiYearPlan?.name ?? "", situacao: guideline.status })) },
        { title: "Prioridades", rows: guidelines.flatMap((guideline) => guideline.priorities.map((priority) => ({ diretriz: guideline.multiYearPlan?.code ?? "Sem PPA vinculado", descricao: priority.description, meta: priority.targetValue === null ? "" : Number(priority.targetValue) }))) },
        { title: "Riscos fiscais", rows: guidelines.flatMap((guideline) => guideline.risks.map((risk) => ({ diretriz: guideline.multiYearPlan?.code ?? "Sem PPA vinculado", descricao: risk.description, impactoEstimado: Number(risk.estimatedImpact), mitigacao: risk.mitigation }))) },
      ] };
    }
    case "LOA": {
      const laws = await db.annualBudgetLaw.findMany({ where: { financialYearId }, include: { revenueForecasts: true, expenseFixations: true }, orderBy: { publicationDate: "asc" } });
      return { title: "LOA", year, warnings: [internalReportWarning], sections: [
        { title: "Leis orçamentárias", rows: laws.map((law) => ({ numeroLei: law.lawNumber, publicacao: isoDate(law.publicationDate), situacao: law.status, receitaTotal: Number(law.totalRevenue), despesaTotal: Number(law.totalExpense) })) },
        { title: "Previsão de receitas", rows: laws.flatMap((law) => law.revenueForecasts.map((forecast) => ({ numeroLei: law.lawNumber, codigo: forecast.code, descricao: forecast.name, valorPrevisto: Number(forecast.estimatedValue) }))) },
        { title: "Fixação de despesas", rows: laws.flatMap((law) => law.expenseFixations.map((fixation) => ({ numeroLei: law.lawNumber, codigo: fixation.code, descricao: fixation.name, valorFixado: Number(fixation.fixedValue) }))) },
      ] };
    }
    case "CMD": {
      const laws = await db.annualBudgetLaw.findMany({ where: { financialYearId }, include: { cmdSchedules: { orderBy: [{ budgetUnitId: "asc" }, { month: "asc" }] } }, orderBy: { publicationDate: "asc" } });
      const unitIds = [...new Set(laws.flatMap((law) => law.cmdSchedules.map((schedule) => schedule.budgetUnitId)))];
      const units = await db.budgetUnit.findMany({ where: { id: { in: unitIds } }, select: { id: true, code: true, name: true } });
      const unitsById = new Map(units.map((unit) => [unit.id, unit]));
      return { title: "CMD - Cronograma Mensal de Desembolso", year, warnings: [internalReportWarning], sections: [{ title: "Limites mensais", rows: laws.flatMap((law) => law.cmdSchedules.map((schedule) => {
        const unit = unitsById.get(schedule.budgetUnitId);
        return { numeroLei: law.lawNumber, unidadeCodigo: unit?.code ?? "UG não encontrada", unidade: unit?.name ?? "Unidade não encontrada", mes: schedule.month, limite: Number(schedule.limitValue) };
      })) }] };
    }
    case "MBA": {
      const laws = await db.annualBudgetLaw.findMany({ where: { financialYearId }, include: { mbaTargets: { orderBy: { bimonth: "asc" } } }, orderBy: { publicationDate: "asc" } });
      return { title: "MBA - Meta Bimestral de Arrecadação", year, warnings: [internalReportWarning], sections: [{ title: "Metas bimestrais", rows: laws.flatMap((law) => law.mbaTargets.map((target) => ({ numeroLei: law.lawNumber, bimestre: target.bimonth, metaArrecadacao: Number(target.targetValue) }))) }] };
    }
    case "PCA": {
      const [budget, patrimonial, annualClose, payables] = await Promise.all([
        generateBalancoOrcamentario(db, filter),
        generateBalancoPatrimonial(db, filter),
        db.annualAccountingClose.findUnique({ where: { financialYearId }, select: { status: true, preparedAt: true, closedAt: true } }),
        db.payableCarryForward.findMany({ where: { originFinancialYearId: financialYearId }, select: { type: true, status: true, valueDecimal: true }, orderBy: { type: "asc" } }),
      ]);
      return {
        title: "PCA - Prestação de Contas Anual interna",
        year,
        warnings: [
          internalReportWarning,
          "Conteúdo parcial: inclui dados orçamentários, patrimoniais, restos a pagar e situação do fechamento disponíveis no sistema. Não inclui peças, assinaturas, notas explicativas, anexos ou validações estatutárias exigidas por órgãos de controle.",
        ],
        sections: [
          { title: "Situação do encerramento", rows: [{ situacao: annualClose?.status ?? "Não preparado", preparadoEm: annualClose?.preparedAt ? isoDate(annualClose.preparedAt) : "", encerradoEm: annualClose?.closedAt ? isoDate(annualClose.closedAt) : "" }] },
          { title: "Síntese orçamentária", rows: Object.entries(budget.totais).map(([descricao, valor]) => ({ descricao, valor })) },
          { title: "Síntese patrimonial", rows: Object.entries(patrimonial.totais).map(([descricao, valor]) => ({ descricao, valor: typeof valor === "boolean" ? (valor ? "Sim" : "Não") : valor })) },
          { title: "Restos a pagar registrados", rows: payables.map((payable) => ({ tipo: payable.type, situacao: payable.status, valor: Number(payable.valueDecimal) })) },
          { title: "Limitações estatutárias", rows: [{ aviso: "Conteúdo parcial interno; não inclui peças, assinaturas, notas explicativas, anexos ou validações estatutárias exigidas por órgãos de controle." }] },
        ],
      };
    }
  }
}

export function reportDatasetCsv(dataset: InternalReportDataset) {
  const rows = dataset.sections.flatMap<ReportRow>((section) => section.rows.map<ReportRow>((row) => ({ secao: section.title, ...row })));
  const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const normalizedRows = rows.map((row) => Object.fromEntries(headers.map((header) => [header, row[header] ?? ""])) as ReportRow);
  return { csv: exportPublicDataCSV(normalizedRows), rowCount: rows.length };
}

export async function generateFinancialReportCsv(db: PrismaClient, reportType: InternalReportType, financialYearId: string) {
  // This compatibility API predates the explicit year parameter used by the route.
  const dataset = await generateInternalReportDataset(db, reportType, financialYearId, new Date().getUTCFullYear());
  return reportDatasetCsv(dataset);
}

const annualPublicReportTypes = new Set<PublicFinancialReportType>(["BALANCO_ORCAMENTARIO", "BALANCO_PATRIMONIAL"]);

export async function savePublicFinancialReportSnapshot(
  db: PrismaClient,
  input: { reportType: InternalReportType; financialYearId: string; year: number; csv: string },
) {
  if (!isPublicFinancialReportType(input.reportType)) return null;
  if (annualPublicReportTypes.has(input.reportType)) {
    const annualClose = await db.annualAccountingClose.findUnique({
      where: { financialYearId: input.financialYearId },
      select: { status: true },
    });
    if (annualClose?.status !== "ENCERRADO") return null;
  }

  const reportType = input.reportType;
  const filename = financialReportFilename(reportType, input.year);
  const blob = await uploadGeneratedReport(filename, input.csv);
  const hashSha256 = createHash("sha256").update(input.csv, "utf8").digest("hex");
  const documentType = publicFinancialReportDocumentType(input.financialYearId, reportType);

  return db.$transaction(async (tx) => {
    // One version sequence per public report, even under simultaneous administrative exports.
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${documentType}))`;
    const existing = await tx.document.findFirst({ where: { documentType }, select: { id: true } });
    const document = existing
      ? await tx.document.update({ where: { id: existing.id }, data: { fileUrl: blob.url, status: "Publicado" } })
      : await tx.document.create({ data: { title: `Relatório público ${reportType} ${input.year}`, documentType, fileUrl: blob.url, status: "Publicado" } });
    const latest = await tx.documentVersion.findFirst({
      where: { documentId: document.id },
      orderBy: { versionNumber: "desc" },
      select: { versionNumber: true },
    });
    const version = await tx.documentVersion.create({
      data: { documentId: document.id, versionNumber: (latest?.versionNumber ?? 0) + 1, fileUrl: blob.url, hashSha256, status: "FINAL" },
    });
    return { documentId: document.id, version: version.versionNumber };
  });
}
