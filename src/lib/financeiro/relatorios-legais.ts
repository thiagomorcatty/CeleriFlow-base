import { Prisma, type PrismaClient } from "@prisma/client";
import { FinanceError } from "./index";

type Db = PrismaClient | Prisma.TransactionClient;

export type ReportFilter = {
  financialYearId: string;
  startDate?: Date;
  endDate?: Date;
  budgetUnitId?: string;
};

// --- Diário Contábil ---
export async function generateDiarioContabil(db: Db, filter: ReportFilter) {
  const transactions = await db.accountingTransaction.findMany({
    where: {
      financialYearId: filter.financialYearId,
      ...(filter.startDate && filter.endDate
        ? { date: { gte: filter.startDate, lte: filter.endDate } }
        : {}),
    },
    include: {
      entries: {
        include: { account: true },
      },
    },
    orderBy: { date: "asc" },
  });

  return transactions.map((t) => ({
    id: t.id,
    date: t.date,
    history: t.history,
    entries: t.entries.map((e) => ({
      accountId: e.accountId,
      accountCode: e.account.code,
      accountName: e.account.name,
      type: e.type,
      value: Number(e.valueDecimal),
    })),
  }));
}

// --- Razão Contábil ---
export async function generateRazaoContabil(db: Db, filter: ReportFilter & { accountId?: string }) {
  const entries = await db.accountingEntry.findMany({
    where: {
      transaction: {
        financialYearId: filter.financialYearId,
        ...(filter.startDate && filter.endDate
          ? { date: { gte: filter.startDate, lte: filter.endDate } }
          : {}),
      },
      ...(filter.accountId ? { accountId: filter.accountId } : {}),
    },
    include: {
      account: true,
      transaction: { select: { date: true, history: true } },
    },
    orderBy: { transaction: { date: "asc" } },
  });

  return entries.map((e) => ({
    id: e.id,
    date: e.transaction?.date ?? new Date(),
    history: e.transaction?.history ?? "",
    accountCode: e.account.code,
    accountName: e.account.name,
    type: e.type,
    value: Number(e.valueDecimal),
  }));
}

// --- Balancete Contábil ---
export async function generateBalanceteContabil(db: Db, filter: ReportFilter) {
  const accounts = await db.accountingPlan.findMany({
    include: {
      entries: {
        where: {
          transaction: {
            financialYearId: filter.financialYearId,
          },
        },
      },
    },
    orderBy: { code: "asc" },
  });

  return accounts.map((acc) => {
    const debitTotal = acc.entries
      .filter((e) => e.type === "Débito")
      .reduce((sum, e) => sum + Number(e.valueDecimal), 0);

    const creditTotal = acc.entries
      .filter((e) => e.type === "Crédito")
      .reduce((sum, e) => sum + Number(e.valueDecimal), 0);

    return {
      id: acc.id,
      code: acc.code,
      name: acc.name,
      debitTotal,
      creditTotal,
      balance: debitTotal - creditTotal,
    };
  });
}

// --- Relatório Resumido da Execução Orçamentária (RREO) ---
export async function generateRREO(db: Db, filter: ReportFilter) {
  const [appropriations, revenues] = await Promise.all([
    db.budgetAppropriation.findMany({
      where: {
        financialYearId: filter.financialYearId,
        ...(filter.budgetUnitId ? { budgetUnitId: filter.budgetUnitId } : {}),
      },
      include: {
        expenseNature: true,
        commitments: {
          include: {
            settlements: {
              include: { payments: true },
            },
          },
        },
      },
    }),
    db.revenue.findMany({
      where: {
        financialYearId: filter.financialYearId,
      },
      include: { revenueNature: true },
    }),
  ]);

  const expenseSummary = appropriations.map((app) => {
    const fixedValue = Number(app.initialValueDecimal ?? app.initialValue);
    const updatedValue = Number(app.updatedValueDecimal ?? app.updatedValue);
    const committedValue = Number(app.committedValueDecimal ?? app.committedValue);

    const settledValue = app.commitments.reduce((sum, c) => {
      return (
        sum +
        c.settlements.reduce((sSum, s) => sSum + Number(s.valueDecimal ?? s.value), 0)
      );
    }, 0);

    const paidValue = app.commitments.reduce((sum, c) => {
      return (
        sum +
        c.settlements.reduce(
          (sSum, s) =>
            sSum +
            s.payments.reduce(
              (pSum, p) => pSum + Number(p.valueDecimal ?? p.value),
              0,
            ),
          0,
        )
      );
    }, 0);

    return {
      expenseNatureCode: app.expenseNature.code,
      expenseNatureName: app.expenseNature.name,
      fixedValue,
      updatedValue,
      committedValue,
      settledValue,
      paidValue,
    };
  });

  const revenueSummary = revenues.map((rev) => ({
    revenueNatureCode: rev.revenueNature.code,
    revenueNatureName: rev.revenueNature.name,
    realizedValue: Number(rev.valueDecimal ?? rev.value),
  }));

  return {
    expenseSummary,
    revenueSummary,
  };
}
