import type { PrismaClient } from "@prisma/client";

type Db = PrismaClient;

export const publicFinancialReportOptions = [
  { type: "RREO", label: "RREO" },
  { type: "RGF", label: "RGF" },
  { type: "BALANCETE", label: "Balancete Contábil" },
  { type: "BALANCO_ORCAMENTARIO", label: "Balanço Orçamentário" },
  { type: "BALANCO_PATRIMONIAL", label: "Balanço Patrimonial" },
] as const;

export type PublicFinancialReportType = (typeof publicFinancialReportOptions)[number]["type"];

const annualReportTypes = new Set<PublicFinancialReportType>(["BALANCO_ORCAMENTARIO", "BALANCO_PATRIMONIAL"]);

export function isPublicFinancialReportType(value: string | null): value is PublicFinancialReportType {
  return publicFinancialReportOptions.some((option) => option.type === value);
}

// A deterministic type associates a generated report document to its exercise without relying on its title.
export function publicFinancialReportDocumentType(financialYearId: string, reportType: PublicFinancialReportType) {
  return `PUBLIC_FINANCIAL_REPORT:${financialYearId}:${reportType}`;
}

function maskDocument(doc?: string | null): string {
  if (!doc) return "NÃO INFORMADO";
  const clean = doc.replace(/\D/g, "");
  if (clean.length === 11) return `***.${clean.slice(3, 6)}.${clean.slice(6, 9)}-**`;
  if (clean.length === 14) return `${clean.slice(0, 2)}.***.${clean.slice(5, 8)}/${clean.slice(8, 12)}-**`;
  return "PROTEGIDO POR LGPD";
}

function publicSupplier(supplier: {
  person: { fullName: string; cpf: string } | null;
  company: { corporateName: string; tradeName: string | null; cnpj: string } | null;
}) {
  if (supplier.person) return { name: "PESSOA FÍSICA", documentMasked: maskDocument(supplier.person.cpf) };
  if (supplier.company) return { name: supplier.company.tradeName || supplier.company.corporateName, documentMasked: maskDocument(supplier.company.cnpj) };
  return { name: "NÃO INFORMADO", documentMasked: "NÃO INFORMADO" };
}

export async function getPublicFinancialReportSnapshots(db: Db) {
  const years = await db.financialYear.findMany({
    select: {
      id: true,
      year: true,
      annualAccountingCloses: { select: { status: true, closedAt: true } },
    },
    orderBy: { year: "desc" },
  });
  const documents = await db.document.findMany({
    where: {
      status: "Publicado",
      documentType: { in: years.flatMap((year) => publicFinancialReportOptions.map((report) => publicFinancialReportDocumentType(year.id, report.type))) },
    },
    select: {
      id: true,
      documentType: true,
      versions: {
        where: { status: { in: ["FINAL", "SIGNED"] } },
        orderBy: { versionNumber: "desc" },
        select: { versionNumber: true, finalizedAt: true },
      },
    },
  });
  const documentsByType = new Map(documents.map((document) => [document.documentType, document]));

  return years.flatMap((year) => publicFinancialReportOptions.flatMap((report) => {
    if (annualReportTypes.has(report.type) && !year.annualAccountingCloses.some((close) => close.status === "ENCERRADO")) return [];
    const document = documentsByType.get(publicFinancialReportDocumentType(year.id, report.type));
    const version = document?.versions[0];
    if (!document || !version) return [];
    return [{
      year: year.year,
      type: report.type,
      label: report.label,
      version: version.versionNumber,
      finalizedAt: version.finalizedAt,
      annualCloseAt: annualReportTypes.has(report.type) ? year.annualAccountingCloses.find((close) => close.status === "ENCERRADO")?.closedAt ?? null : null,
    }];
  }));
}

export async function getPublicFinancialReportSnapshot(
  db: Db,
  input: { year: number; reportType: PublicFinancialReportType; version?: number },
) {
  const financialYear = await db.financialYear.findUnique({
    where: { year: input.year },
    select: { id: true, annualAccountingCloses: { select: { status: true } } },
  });
  if (!financialYear) return null;
  if (annualReportTypes.has(input.reportType) && !financialYear.annualAccountingCloses.some((close) => close.status === "ENCERRADO")) return null;

  const document = await db.document.findFirst({
    where: {
      status: "Publicado",
      documentType: publicFinancialReportDocumentType(financialYear.id, input.reportType),
    },
    select: {
      versions: {
        where: {
          status: { in: ["FINAL", "SIGNED"] },
          ...(input.version ? { versionNumber: input.version } : {}),
        },
        orderBy: { versionNumber: "desc" },
        take: 1,
        select: { fileUrl: true, versionNumber: true },
      },
    },
  });
  return document?.versions[0] ?? null;
}

export async function getPublicContracts(db: Db) {
  const contracts = await db.contract.findMany({
    where: { status: { notIn: ["Minuta", "Rascunho", "Em Elaboração"] } },
    include: {
      supplier: { include: { person: { select: { fullName: true, cpf: true } }, company: { select: { corporateName: true, tradeName: true, cnpj: true } } } },
      process: { select: { number: true, modality: true } },
      secretariat: { select: { name: true } },
    },
    orderBy: { startDate: "desc" },
    take: 100,
  });
  return contracts.map((contract) => ({
    number: contract.number,
    object: contract.object,
    initialValue: contract.initialValue,
    updatedValue: contract.updatedValue,
    startDate: contract.startDate,
    endDate: contract.endDate,
    status: contract.status,
    supplier: publicSupplier(contract.supplier),
    processNumber: contract.process.number,
    modality: contract.process.modality,
    secretariat: contract.secretariat.name,
  }));
}

export async function getPublicBiddings(db: Db) {
  const biddings = await db.bidding.findMany({
    where: { publicationDate: { not: null }, status: { notIn: ["Em Elaboração", "Rascunho"] } },
    include: { process: { select: { number: true, object: true, estimatedValue: true, secretariat: { select: { name: true } } } } },
    orderBy: { publicationDate: "desc" },
    take: 100,
  });
  return biddings.map((bidding) => ({
    number: bidding.number,
    modality: bidding.modality,
    status: bidding.status,
    publicationDate: bidding.publicationDate!,
    sessionDate: bidding.sessionDate,
    processNumber: bidding.process.number,
    object: bidding.process.object,
    estimatedValue: bidding.process.estimatedValue,
    secretariat: bidding.process.secretariat.name,
  }));
}
