import { Prisma, type PrismaClient } from "@prisma/client";

type Db = PrismaClient | Prisma.TransactionClient;

function maskDocument(doc?: string | null): string {
  if (!doc) return "NÃO INFORMADO";
  const clean = doc.replace(/\D/g, "");
  if (clean.length === 11) {
    // CPF: ***.123.456-**
    return `***.${clean.slice(3, 6)}.${clean.slice(6, 9)}-**`;
  }
  if (clean.length === 14) {
    // CNPJ: 08.***.505/0001-**
    return `${clean.slice(0, 2)}.***.${clean.slice(5, 8)}/${clean.slice(8, 12)}-**`;
  }
  return "PROTEGIDO POR LGPD";
}

export type PublicDataFilter = {
  year?: number;
  search?: string;
  budgetUnitCode?: string;
  resourceSourceCode?: string;
  expenseNatureCode?: string;
  revenueClassification?: "ORCAMENTARIA" | "INTRAORCAMENTARIA" | "REDUTORA";
  page?: number;
  pageSize?: number;
};

export function parsePublicDataFilter(searchParams: URLSearchParams): PublicDataFilter {
  const parseOptionalInteger = (name: string, min: number, max: number) => {
    const value = searchParams.get(name);
    if (!value) return undefined;
    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed) || parsed < min || parsed > max) {
      throw new Error(`Parâmetro ${name} inválido.`);
    }
    return parsed;
  };

  const search = searchParams.get("search")?.trim();
  if (search && search.length > 120) throw new Error("Parâmetro search inválido.");

  const parseOptionalCode = (name: string) => {
    const value = searchParams.get(name)?.trim();
    if (!value) return undefined;
    if (value.length > 80) throw new Error(`Parâmetro ${name} inválido.`);
    return value;
  };

  const budgetUnitCode = parseOptionalCode("budgetUnitCode");
  const resourceSourceCode = parseOptionalCode("resourceSourceCode");
  const expenseNatureCode = parseOptionalCode("expenseNatureCode");
  const revenueClassification = searchParams.get("revenueClassification");
  if (revenueClassification && !["ORCAMENTARIA", "INTRAORCAMENTARIA", "REDUTORA"].includes(revenueClassification)) {
    throw new Error("Parâmetro revenueClassification inválido.");
  }

  return {
    year: parseOptionalInteger("year", 2000, 2100),
    page: parseOptionalInteger("page", 1, 1_000_000),
    pageSize: parseOptionalInteger("pageSize", 1, 100),
    search: search || undefined,
    ...(budgetUnitCode ? { budgetUnitCode } : {}),
    ...(resourceSourceCode ? { resourceSourceCode } : {}),
    ...(expenseNatureCode ? { expenseNatureCode } : {}),
    ...(revenueClassification ? { revenueClassification: revenueClassification as PublicDataFilter["revenueClassification"] } : {}),
  };
}

function publicDateFilter(year?: number) {
  if (!year) return {};
  return { gte: new Date(Date.UTC(year, 0, 1)), lt: new Date(Date.UTC(year + 1, 0, 1)) };
}

function normalizePublicFilter(filter: PublicDataFilter = {}) {
  const page = Math.max(1, Math.floor(filter.page ?? 1));
  const pageSize = Math.min(100, Math.max(1, Math.floor(filter.pageSize ?? 50)));
  const search = filter.search?.trim();
  return { ...filter, page, pageSize, search: search || undefined };
}

function publicSupplier(
  creditor: { name: string; document: string | null; personId: string | null } | null,
  supplier: {
    person: { cpf: string } | null;
    company: { corporateName: string; cnpj: string } | null;
  } | null,
) {
  if (creditor) {
    return {
      name: creditor.personId ? "PESSOA FÍSICA" : creditor.name,
      documentMasked: maskDocument(creditor.document),
    };
  }
  if (supplier?.person) return { name: "PESSOA FÍSICA", documentMasked: maskDocument(supplier.person.cpf) };
  if (supplier?.company) return { name: supplier.company.corporateName, documentMasked: maskDocument(supplier.company.cnpj) };
  return { name: "NÃO INFORMADO", documentMasked: "NÃO INFORMADO" };
}

export async function getPublicExpenses(db: Db, filter?: PublicDataFilter) {
  const normalized = normalizePublicFilter(filter);
  const where: Prisma.CommitmentWhereInput = {
    AND: [
      { status: { in: ["Emitido", "Liquidado", "Pago"] } },
      ...(normalized.year ? [{ date: publicDateFilter(normalized.year) }] : []),
      ...(normalized.budgetUnitCode ? [{ appropriation: { budgetUnit: { code: normalized.budgetUnitCode } } }] : []),
      ...(normalized.resourceSourceCode ? [{ appropriation: { resourceSource: { code: normalized.resourceSourceCode } } }] : []),
      ...(normalized.expenseNatureCode ? [{ appropriation: { expenseNature: { code: normalized.expenseNatureCode } } }] : []),
      ...(normalized.search
        ? [{
            OR: [
              { number: { contains: normalized.search, mode: "insensitive" as const } },
              { appropriation: { budgetUnit: { name: { contains: normalized.search, mode: "insensitive" as const } } } },
              { appropriation: { expenseNature: { name: { contains: normalized.search, mode: "insensitive" as const } } } },
              { appropriation: { resourceSource: { name: { contains: normalized.search, mode: "insensitive" as const } } } },
            ],
          }]
        : []),
    ],
  };

  const [total, commitments] = await Promise.all([
    db.commitment.count({ where }),
    db.commitment.findMany({
      where,
      include: {
        creditor: true,
        supplier: {
          include: {
            person: { select: { cpf: true } },
            company: { select: { corporateName: true, cnpj: true } },
          },
        },
        appropriation: {
          include: {
            budgetUnit: true,
            expenseNature: true,
            resourceSource: true,
          },
        },
        settlements: {
          where: { status: "Liquidado" },
          include: { payments: { where: { status: "Paga" } } },
        },
        payments: { where: { status: "Paga" } },
      },
      orderBy: { date: "desc" },
      skip: (normalized.page - 1) * normalized.pageSize,
      take: normalized.pageSize,
    }),
  ]);

  const data = commitments.map((c) => {
    const value = Number(c.valueDecimal ?? c.value);
    const supplier = publicSupplier(c.creditor, c.supplier);

    const totalSettled = c.settlements.reduce(
      (sum, s) => sum + Number(s.valueDecimal ?? s.value),
      0,
    );

    const totalPaid = c.payments.reduce((sum, payment) => sum + Number(payment.valueDecimal ?? payment.value), 0);
    const latestSettlementDate = c.settlements.reduce<Date | null>(
      (latest, settlement) => !latest || settlement.date > latest ? settlement.date : latest,
      null,
    );
    const latestPaymentDate = c.payments.reduce<Date | null>(
      (latest, payment) => !latest || payment.date > latest ? payment.date : latest,
      null,
    );

    return {
      number: c.number,
      date: c.date,
      supplierName: supplier.name,
      supplierDocumentMasked: supplier.documentMasked,
      budgetUnitCode: c.appropriation.budgetUnit.code,
      budgetUnitName: c.appropriation.budgetUnit.name,
      budgetClassificationCode: c.appropriation.code,
      expenseNatureCode: c.appropriation.expenseNature.code,
      expenseNatureName: c.appropriation.expenseNature.name,
      resourceSourceCode: c.appropriation.resourceSource.code,
      resourceSourceName: c.appropriation.resourceSource.name,
      committedValue: value,
      settledValue: totalSettled,
      paidValue: totalPaid,
      settlementCount: c.settlements.length,
      latestSettlementDate,
      paidPaymentCount: c.payments.length,
      latestPaymentDate,
      status: c.status,
    };
  });

  const updatedAt = commitments.reduce<Date | null>(
    (latest, commitment) => !latest || commitment.updatedAt > latest ? commitment.updatedAt : latest,
    null,
  );
  return { data, total, page: normalized.page, pageSize: normalized.pageSize, updatedAt };
}

export async function getPublicRevenues(db: Db, filter?: PublicDataFilter) {
  const normalized = normalizePublicFilter(filter);
  const where: Prisma.RevenueWhereInput = {
    AND: [
      { stage: "ARRECADADA" },
      ...(normalized.year ? [{ date: publicDateFilter(normalized.year) }] : []),
      ...(normalized.resourceSourceCode ? [{ resourceSource: { code: normalized.resourceSourceCode } }] : []),
      ...(normalized.budgetUnitCode ? [{ bankAccount: { budgetUnit: { code: normalized.budgetUnitCode } } }] : []),
      ...(normalized.revenueClassification ? [{ classification: normalized.revenueClassification }] : []),
      ...(normalized.search
        ? [{
            OR: [
              { revenueNature: { code: { contains: normalized.search, mode: "insensitive" as const } } },
              { revenueNature: { name: { contains: normalized.search, mode: "insensitive" as const } } },
              { resourceSource: { code: { contains: normalized.search, mode: "insensitive" as const } } },
              { resourceSource: { name: { contains: normalized.search, mode: "insensitive" as const } } },
            ],
          }]
        : []),
    ],
  };
  const [total, revenues] = await Promise.all([
    db.revenue.count({ where }),
    db.revenue.findMany({
      where,
      include: {
        revenueNature: true,
        resourceSource: true,
        bankAccount: { include: { budgetUnit: true } },
      },
      orderBy: { date: "desc" },
      skip: (normalized.page - 1) * normalized.pageSize,
      take: normalized.pageSize,
    }),
  ]);

  const data = revenues.map((r) => ({
    date: r.date,
    launchDate: r.launchDate,
    collectionDate: r.collectionDate,
    revenueNatureCode: r.revenueNature.code,
    revenueNatureName: r.revenueNature.name,
    resourceSourceCode: r.resourceSource.code,
    resourceSourceName: r.resourceSource.name,
    budgetUnitCode: r.bankAccount?.budgetUnit?.code ?? null,
    budgetUnitName: r.bankAccount?.budgetUnit?.name ?? null,
    classification: r.classification,
    value: Number(r.valueDecimal ?? r.value),
    status: r.status,
  }));
  const updatedAt = revenues.reduce<Date | null>(
    (latest, revenue) => !latest || revenue.updatedAt > latest ? revenue.updatedAt : latest,
    null,
  );
  return { data, total, page: normalized.page, pageSize: normalized.pageSize, updatedAt };
}

function escapeCsvValue(value: unknown) {
  const stringValue = value instanceof Date ? value.toISOString() : String(value ?? "");
  const formulaSafeValue = /^[\t\r ]*[=+\-@]/.test(stringValue) ? `'${stringValue}` : stringValue;
  return `"${formulaSafeValue.replace(/"/g, '""')}"`;
}

export function exportPublicDataCSV(data: Record<string, unknown>[]): string {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]).map(escapeCsvValue).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map(escapeCsvValue)
      .join(","),
  );
  return [headers, ...rows].join("\n");
}
