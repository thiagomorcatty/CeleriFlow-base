import { Prisma, type PrismaClient } from "@prisma/client";

type Db = PrismaClient | Prisma.TransactionClient;

export type ReportFilter = {
  financialYearId: string;
  startDate?: Date;
  endDate?: Date;
  budgetUnitId?: string;
};

function dateFilter(filter: ReportFilter) {
  return {
    ...(filter.startDate ? { gte: filter.startDate } : {}),
    ...(filter.endDate ? { lte: filter.endDate } : {}),
  };
}

function assertAccountingUnitFilterUnsupported(filter: ReportFilter) {
  if (filter.budgetUnitId) {
    throw new Error("Relatórios contábeis por unidade gestora exigem o vínculo da unidade ao lançamento contábil e não podem ser gerados com dados consolidados.");
  }
}

// --- Diário Contábil ---
export async function generateDiarioContabil(db: Db, filter: ReportFilter) {
  assertAccountingUnitFilterUnsupported(filter);
  const transactions = await db.accountingTransaction.findMany({
    where: {
      financialYearId: filter.financialYearId,
      status: "POSTADO",
      ...(filter.startDate || filter.endDate ? { date: dateFilter(filter) } : {}),
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
  assertAccountingUnitFilterUnsupported(filter);
  const entries = await db.accountingEntry.findMany({
    where: {
      transaction: {
        financialYearId: filter.financialYearId,
        status: "POSTADO",
        ...(filter.startDate || filter.endDate ? { date: dateFilter(filter) } : {}),
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
  assertAccountingUnitFilterUnsupported(filter);
  const accounts = await db.accountingPlan.findMany({
    include: {
      entries: {
        where: {
          transaction: {
            financialYearId: filter.financialYearId,
            status: "POSTADO",
            ...(filter.startDate || filter.endDate ? { date: dateFilter(filter) } : {}),
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
  if (filter.budgetUnitId) {
    throw new Error("O modelo de receitas ainda não identifica a unidade gestora; o RREO por unidade não pode ser gerado com dados de outra unidade.");
  }
  if (filter.startDate || filter.endDate) {
    throw new Error("O modelo atual não preserva os saldos históricos necessários para um RREO por período. Gere o demonstrativo anual até a implantação desse histórico.");
  }

  const [appropriations, revenues] = await Promise.all([
    db.budgetAppropriation.findMany({
      where: {
        financialYearId: filter.financialYearId,
      },
      include: {
        expenseNature: true,
        commitments: {
          where: {
            status: { in: ["Emitido", "Liquidado", "Pago"] },
          },
          include: {
            settlements: {
              where: {
                status: "Liquidado",
              },
              include: {
                payments: {
                  where: { status: "Paga" },
                },
              },
            },
            payments: {
              where: { status: "Paga" },
            },
          },
        },
      },
    }),
    db.revenue.findMany({
      where: {
        financialYearId: filter.financialYearId,
        status: "Arrecadada",
      },
      include: { revenueNature: true },
    }),
  ]);

  const expenses = appropriations.map((app) => {
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
      return sum + c.payments.reduce((pSum, p) => pSum + Number(p.valueDecimal ?? p.value), 0);
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

  const expenseSummary = Object.values(expenses.reduce<Record<string, (typeof expenses)[number]>>((summary, item) => {
    const current = summary[item.expenseNatureCode];
    summary[item.expenseNatureCode] = current
      ? {
          ...current,
          fixedValue: current.fixedValue + item.fixedValue,
          updatedValue: current.updatedValue + item.updatedValue,
          committedValue: current.committedValue + item.committedValue,
          settledValue: current.settledValue + item.settledValue,
          paidValue: current.paidValue + item.paidValue,
        }
      : item;
    return summary;
  }, {}));

  const revenueSummary = Object.values(revenues.reduce<Record<string, { revenueNatureCode: string; revenueNatureName: string; realizedValue: number }>>((summary, rev) => {
    const key = rev.revenueNature.code;
    const current = summary[key];
    const realizedValue = Number(rev.valueDecimal ?? rev.value);
    summary[key] = current
      ? { ...current, realizedValue: current.realizedValue + realizedValue }
      : { revenueNatureCode: key, revenueNatureName: rev.revenueNature.name, realizedValue };
    return summary;
  }, {}));

  return {
    expenseSummary,
    revenueSummary,
  };
}
