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
  const [appropriations, revenues, forecasts] = await Promise.all([
    db.budgetAppropriation.findMany({
      where: {
        financialYearId: filter.financialYearId,
        ...(filter.budgetUnitId ? { budgetUnitId: filter.budgetUnitId } : {}),
      },
      include: {
        expenseNature: true,
        commitments: {
          where: {
            status: { in: ["Emitido", "Liquidado", "Pago"] },
            ...(filter.startDate || filter.endDate ? { date: dateFilter(filter) } : {}),
          },
          include: {
            settlements: {
              where: {
                status: "Liquidado",
                ...(filter.startDate || filter.endDate ? { date: dateFilter(filter) } : {}),
              },
              include: {
                payments: {
                  where: {
                    status: "Paga",
                    ...(filter.startDate || filter.endDate ? { date: dateFilter(filter) } : {}),
                  },
                },
              },
            },
            payments: {
              where: {
                status: "Paga",
                ...(filter.startDate || filter.endDate ? { date: dateFilter(filter) } : {}),
              },
            },
          },
        },
      },
    }),
    db.revenue.findMany({
      where: {
        financialYearId: filter.financialYearId,
        status: "Arrecadada",
        ...(filter.startDate || filter.endDate ? { date: dateFilter(filter) } : {}),
      },
      include: { revenueNature: true },
    }),
    db.annualBudgetRevenueForecast.findMany({
      where: {
        annualBudgetLaw: { financialYearId: filter.financialYearId },
      },
    }),
  ]);

  const expenses = appropriations.map((app) => {
    const fixedValue = Number(app.initialValueDecimal ?? app.initialValue);
    const updatedValue = Number(app.updatedValueDecimal ?? app.updatedValue);

    const committedValue = app.commitments.reduce((sum, c) => sum + Number(c.valueDecimal ?? c.value), 0);

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

  const revenueMap: Record<string, { revenueNatureCode: string; revenueNatureName: string; predictedValue: number; realizedValue: number }> = {};

  for (const f of forecasts) {
    const code = f.code;
    revenueMap[code] = {
      revenueNatureCode: code,
      revenueNatureName: f.name,
      predictedValue: Number(f.estimatedValue),
      realizedValue: 0,
    };
  }

  for (const rev of revenues) {
    const code = rev.revenueNature.code;
    const realized = Number(rev.valueDecimal ?? rev.value);
    if (!revenueMap[code]) {
      revenueMap[code] = {
        revenueNatureCode: code,
        revenueNatureName: rev.revenueNature.name,
        predictedValue: 0,
        realizedValue: realized,
      };
    } else {
      revenueMap[code].realizedValue += realized;
    }
  }

  return {
    expenseSummary,
    revenueSummary: Object.values(revenueMap),
  };
}

// --- Relatório de Gestão Fiscal (RGF - Despesa com Pessoal / LRF) ---
export async function generateRGF(db: Db, filter: ReportFilter) {
  const revenues = await db.revenue.findMany({
    where: {
      financialYearId: filter.financialYearId,
      status: "Arrecadada",
      ...(filter.startDate || filter.endDate ? { date: dateFilter(filter) } : {}),
    },
    select: { valueDecimal: true, value: true },
  });

  const rcl = revenues.reduce((sum, r) => sum + Number(r.valueDecimal ?? r.value), 0);

  const commitments = await db.commitment.findMany({
    where: {
      appropriation: {
        financialYearId: filter.financialYearId,
        expenseNature: { code: { startsWith: "3.1" } },
        ...(filter.budgetUnitId ? { budgetUnitId: filter.budgetUnitId } : {}),
      },
      status: { in: ["Emitido", "Liquidado", "Pago"] },
      ...(filter.startDate || filter.endDate ? { date: dateFilter(filter) } : {}),
    },
    select: { valueDecimal: true, value: true },
  });

  const personnelExpense = commitments.reduce((sum, c) => sum + Number(c.valueDecimal ?? c.value), 0);
  const percentageOfRcl = rcl > 0 ? (personnelExpense / rcl) * 100 : 0;
  const legalLimitPercentage = 54.0;
  const alertLimitPercentage = 48.6;

  return {
    receitaCorrenteLiquida: rcl,
    despesaTotalPessoal: personnelExpense,
    percentualAtingido: Number(percentageOfRcl.toFixed(2)),
    limiteLegal: legalLimitPercentage,
    limiteAlerta: alertLimitPercentage,
    situacao: percentageOfRcl > legalLimitPercentage ? "EXCEDIDO" : percentageOfRcl > alertLimitPercentage ? "ALERTA" : "REGULAR",
  };
}

// --- Balanço Orçamentário ---
export async function generateBalancoOrcamentario(db: Db, filter: ReportFilter) {
  const rreo = await generateRREO(db, filter);
  const totalReceitaPrevista = rreo.revenueSummary.reduce((sum, r) => sum + r.predictedValue, 0);
  const totalReceitaRealizada = rreo.revenueSummary.reduce((sum, r) => sum + r.realizedValue, 0);
  const totalDespesaFixada = rreo.expenseSummary.reduce((sum, e) => sum + e.fixedValue, 0);
  const totalDespesaEmpenhada = rreo.expenseSummary.reduce((sum, e) => sum + e.committedValue, 0);
  const totalDespesaLiquidada = rreo.expenseSummary.reduce((sum, e) => sum + e.settledValue, 0);
  const totalDespesaPaga = rreo.expenseSummary.reduce((sum, e) => sum + e.paidValue, 0);
  const superavitDeficitOrcamentario = totalReceitaRealizada - totalDespesaEmpenhada;

  return {
    receitas: rreo.revenueSummary,
    despesas: rreo.expenseSummary,
    totais: {
      totalReceitaPrevista,
      totalReceitaRealizada,
      totalDespesaFixada,
      totalDespesaEmpenhada,
      totalDespesaLiquidada,
      totalDespesaPaga,
      superavitDeficitOrcamentario,
    },
  };
}

// --- Balanço Patrimonial ---
export async function generateBalancoPatrimonial(db: Db, filter: ReportFilter) {
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

  // Ativo: Contas da classe 1 (Ativo Circulante e Não Circulante)
  const ativo = accounts.filter((acc) => acc.code.startsWith("1")).map((acc) => {
    const debit = acc.entries.filter((e) => e.type === "Débito").reduce((s, e) => s + Number(e.valueDecimal), 0);
    const credit = acc.entries.filter((e) => e.type === "Crédito").reduce((s, e) => s + Number(e.valueDecimal), 0);
    return { code: acc.code, name: acc.name, balance: debit - credit };
  });

  // Passivo: Contas da classe 2 (EXCETO classe 2.3 que é Patrimônio Líquido)
  const passivo = accounts.filter((acc) => acc.code.startsWith("2.") && !acc.code.startsWith("2.3")).map((acc) => {
    const debit = acc.entries.filter((e) => e.type === "Débito").reduce((s, e) => s + Number(e.valueDecimal), 0);
    const credit = acc.entries.filter((e) => e.type === "Crédito").reduce((s, e) => s + Number(e.valueDecimal), 0);
    return { code: acc.code, name: acc.name, balance: credit - debit };
  });

  // Patrimônio Líquido: Exclusivamente contas da classe 2.3
  const patrimonioLiquido = accounts.filter((acc) => acc.code.startsWith("2.3")).map((acc) => {
    const debit = acc.entries.filter((e) => e.type === "Débito").reduce((s, e) => s + Number(e.valueDecimal), 0);
    const credit = acc.entries.filter((e) => e.type === "Crédito").reduce((s, e) => s + Number(e.valueDecimal), 0);
    return { code: acc.code, name: acc.name, balance: credit - debit };
  });

  const totalAtivo = ativo.reduce((s, a) => s + a.balance, 0);
  const totalPassivo = passivo.reduce((s, p) => s + p.balance, 0);
  const totalPatrimonioLiquido = patrimonioLiquido.reduce((s, pl) => s + pl.balance, 0);

  return {
    ativo,
    passivo,
    patrimonioLiquido,
    totais: {
      totalAtivo,
      totalPassivo,
      totalPatrimonioLiquido,
      balancoEquilibrado: Math.abs(totalAtivo - (totalPassivo + totalPatrimonioLiquido)) < 0.01,
    },
  };
}
