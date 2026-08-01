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

export async function getPublicExpenses(db: Db, filter?: { year?: number; search?: string }) {
  const commitments = await db.commitment.findMany({
    where: {
      status: { in: ["Emitido", "Liquidado", "Pago"] },
    },
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
        include: { payments: true },
      },
    },
    orderBy: { date: "desc" },
    take: 100,
  });

  return commitments.map((c) => {
    const value = Number(c.valueDecimal ?? c.value);

    const totalSettled = c.settlements.reduce(
      (sum, s) => sum + Number(s.valueDecimal ?? s.value),
      0,
    );

    const totalPaid = c.settlements.reduce(
      (sum, s) =>
        sum +
        s.payments.reduce((pSum, p) => pSum + Number(p.valueDecimal ?? p.value), 0),
      0,
    );

    return {
      commitmentId: c.id,
      number: c.number,
      date: c.date,
      creditorName: c.creditor?.name ?? "NÃO INFORMADO",
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
}

export async function getPublicRevenues(db: Db) {
  const revenues = await db.revenue.findMany({
    where: { status: "Arrecadada" },
    include: {
      revenueNature: true,
      resourceSource: true,
    },
    orderBy: { date: "desc" },
    take: 100,
  });

  return revenues.map((r) => ({
    id: r.id,
    date: r.date,
    revenueNatureCode: r.revenueNature.code,
    revenueNatureName: r.revenueNature.name,
    resourceSourceCode: r.resourceSource.code,
    resourceSourceName: r.resourceSource.name,
    value: Number(r.valueDecimal ?? r.value),
    status: r.status,
  }));
}

export function exportPublicDataCSV(data: any[]): string {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(","),
  );
  return [headers, ...rows].join("\n");
}
