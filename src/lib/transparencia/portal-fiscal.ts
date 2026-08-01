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

  return {
    year: parseOptionalInteger("year", 2000, 2100),
    page: parseOptionalInteger("page", 1, 1_000_000),
    pageSize: parseOptionalInteger("pageSize", 1, 100),
    search: search || undefined,
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

function publicCreditorName(creditor: { name: string; personId: string | null } | null) {
  if (!creditor) return "NÃO INFORMADO";
  return creditor.personId ? "PESSOA FÍSICA" : creditor.name;
}

export async function getPublicExpenses(db: Db, filter?: PublicDataFilter) {
  const normalized = normalizePublicFilter(filter);
  const where = {
    status: { in: ["Emitido", "Liquidado", "Pago"] },
    ...(normalized.year ? { date: publicDateFilter(normalized.year) } : {}),
    ...(normalized.search
      ? {
          number: { contains: normalized.search, mode: "insensitive" as const },
        }
      : {}),
  };

  const [total, commitments] = await Promise.all([
    db.commitment.count({ where }),
    db.commitment.findMany({
      where,
      include: {
        creditor: true,
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

    const totalSettled = c.settlements.reduce(
      (sum, s) => sum + Number(s.valueDecimal ?? s.value),
      0,
    );

    const totalPaid = c.payments.reduce((sum, payment) => sum + Number(payment.valueDecimal ?? payment.value), 0);

    return {
      commitmentId: c.id,
      number: c.number,
      date: c.date,
      creditorName: publicCreditorName(c.creditor),
      creditorDocumentMasked: maskDocument(c.creditor?.document),
      budgetUnitCode: c.appropriation.budgetUnit.code,
      budgetUnitName: c.appropriation.budgetUnit.name,
      expenseNatureCode: c.appropriation.expenseNature.code,
      expenseNatureName: c.appropriation.expenseNature.name,
      resourceSourceCode: c.appropriation.resourceSource.code,
      committedValue: value,
      settledValue: totalSettled,
      paidValue: totalPaid,
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
  const where = {
    status: "Arrecadada",
    ...(normalized.year ? { date: publicDateFilter(normalized.year) } : {}),
    ...(normalized.search
      ? {
          OR: [
            { revenueNature: { code: { contains: normalized.search, mode: "insensitive" as const } } },
            { revenueNature: { name: { contains: normalized.search, mode: "insensitive" as const } } },
          ],
        }
      : {}),
  };
  const [total, revenues] = await Promise.all([
    db.revenue.count({ where }),
    db.revenue.findMany({
      where,
      include: {
        revenueNature: true,
        resourceSource: true,
      },
      orderBy: { date: "desc" },
      skip: (normalized.page - 1) * normalized.pageSize,
      take: normalized.pageSize,
    }),
  ]);

  const data = revenues.map((r) => ({
    id: r.id,
    date: r.date,
    revenueNatureCode: r.revenueNature.code,
    revenueNatureName: r.revenueNature.name,
    resourceSourceCode: r.resourceSource.code,
    resourceSourceName: r.resourceSource.name,
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
  const stringValue = String(value ?? "");
  const formulaSafeValue = /^[=+\-@]/.test(stringValue) ? `'${stringValue}` : stringValue;
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
