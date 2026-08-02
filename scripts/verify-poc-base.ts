import "dotenv/config";
import { prisma } from "../src/lib/prisma";

type Check = { check: string; status: "OK" | "FALHA" | "OBSERVACAO"; detail: string };

const requiredEventCodes = [
  "EMPENHO_EMITIDO",
  "LIQUIDACAO_REGISTRADA",
  "PAGAMENTO_EFETIVADO",
  "RETENCAO_RECOLHIDA",
  "PAGAMENTO_ESTORNADO",
  "RECEITA_LANCADA",
  "RECEITA_ARRECADADA",
  "RECEITA_ESTORNADA",
  "RECEITA_REDISTRIBUIDA_FONTE",
] as const;

function money(value: { toString(): string } | number | null) {
  return Number(value ?? 0).toFixed(2);
}

async function main() {
  const checks: Check[] = [];
  const fail = (check: string, detail: string) => checks.push({ check, status: "FALHA", detail });
  const pass = (check: string, detail: string) => checks.push({ check, status: "OK", detail });
  const observe = (check: string, detail: string) => checks.push({ check, status: "OBSERVACAO", detail });

  try {
    const year = await prisma.financialYear.findUnique({ where: { year: 2026 } });
    if (!year) {
      fail("Exercício", "Exercício financeiro 2026 não encontrado.");
      process.exitCode = 1;
      return;
    }
    pass("Exercício", `2026 (${year.status}).`);

    const [units, accounts, events, planning, reports, revenue] = await Promise.all([
      prisma.budgetUnit.findMany({ where: { code: { in: ["0101", "0201"] } }, orderBy: { code: "asc" } }),
      prisma.bankAccount.findMany({ where: { id: { in: ["cl-lagoaseca-bb-pref-1000", "cl-lagoaseca-bb-cam-2000"] } } }),
      prisma.accountingEventCatalog.findMany({
        where: { code: { in: [...requiredEventCodes] } },
        include: { rules: { where: { isActive: true, isReference: true }, select: { debitAccountId: true, creditAccountId: true } } },
      }),
      prisma.annualBudgetLaw.findUnique({
        where: { id: "loa-2026-lagoaseca" },
        include: {
          budgetGuideline: {
            include: {
              multiYearPlan: {
                include: {
                  programs: { include: { objectives: { include: { indicators: true } }, actions: { include: { goals: true } } } },
                },
              },
              priorities: true,
              risks: true,
            },
          },
          revenueForecasts: true,
          expenseFixations: { include: { appropriations: true } },
          cmdSchedules: true,
          mbaTargets: true,
        },
      }),
      prisma.document.findMany({
        where: { documentType: { startsWith: `PUBLIC_FINANCIAL_REPORT:${year.id}:` } },
        include: { versions: { where: { status: { in: ["FINAL", "SIGNED"] } }, select: { versionNumber: true } } },
      }),
      prisma.revenue.findUnique({
        where: { idempotencyKey: "SEED:LAGOA_SECA:REV:IPTU:01" },
        include: { treasuryMovement: true },
      }),
    ]);

    const unitCodes = new Set(units.map((unit) => unit.code));
    for (const code of ["0101", "0201"]) {
      if (!unitCodes.has(code)) fail("Unidades gestoras", `UG ${code} não encontrada.`);
    }
    if (unitCodes.size === 2) pass("Unidades gestoras", "UGs 0101 e 0201 configuradas.");

    const unitIds = new Set(units.map((unit) => unit.id));
    for (const account of accounts) {
      if (!account.isActive || !account.resourceSourceId || !account.budgetUnitId || !unitIds.has(account.budgetUnitId)) {
        fail("Contas bancárias", `Conta ${account.id} sem vínculo ativo e coerente de UG/fonte.`);
      }
    }
    if (accounts.length === 2 && accounts.every((account) => account.isActive && account.resourceSourceId && account.budgetUnitId && unitIds.has(account.budgetUnitId))) {
      pass("Contas bancárias", "Contas POC ativas com fonte e UG vinculadas.");
    } else if (accounts.length !== 2) {
      fail("Contas bancárias", "As duas contas bancárias POC não foram encontradas.");
    }

    if (revenue?.stage === "ARRECADADA" && revenue.bankAccountId && revenue.treasuryMovement?.revenueId === revenue.id && revenue.treasuryMovement.bankAccountId === revenue.bankAccountId) {
      pass("Receita e tesouraria", "Arrecadação IPTU POC está vinculada ao movimento de tesouraria da mesma conta.");
    } else {
      fail("Receita e tesouraria", "Arrecadação IPTU POC ou seu vínculo com a tesouraria está ausente ou incoerente.");
    }

    const accountCodes = await prisma.accountingPlan.findMany({ where: { code: { in: ["1.1.1.1.1.00.00", "2.1.1.1.1.00.00", "2.3.7.1.1.00.00"] } }, select: { code: true } });
    if (accountCodes.length === 3) pass("Plano de contas de referência", "Contas caixa, credores e patrimônio líquido encontradas.");
    else fail("Plano de contas de referência", "Contas mínimas de referência ausentes.");

    const eventsByCode = new Map(events.map((event) => [event.code, event]));
    const invalidEvents = requiredEventCodes.filter((code) => {
      const event = eventsByCode.get(code);
      return !event?.isActive || event.rules.length !== 1 || event.rules[0].debitAccountId === event.rules[0].creditAccountId;
    });
    if (invalidEvents.length) fail("Regras contábeis de referência", `Eventos inválidos ou ausentes: ${invalidEvents.join(", ")}.`);
    else pass("Regras contábeis de referência", `${requiredEventCodes.length} eventos ativos com partida de débito e crédito distintas.`);

    const plan = planning?.budgetGuideline?.multiYearPlan;
    if (!planning || !plan) {
      fail("Rastreabilidade PPA/LDO/LOA", "LOA 2026 não está vinculada a uma LDO e PPA.");
    } else {
      const { expenseFixations, revenueForecasts } = planning;
      const forecastTotal = revenueForecasts.reduce((total, item) => total + Number(item.estimatedValue), 0);
      const fixationTotal = expenseFixations.reduce((total, item) => total + Number(item.fixedValue), 0);
      const appropriations = expenseFixations.flatMap((fixation) => fixation.appropriations);
      const traceValid = plan.programs.length > 0
        && plan.programs.every((program) => program.objectives.some((objective) => objective.indicators.length > 0) && program.actions.some((action) => action.goals.some((goal) => goal.year === 2026)))
        && appropriations.length > 0
        && appropriations.every((appropriation) => appropriation.annualBudgetExpenseFixationId && appropriation.programPPAId && appropriation.actionPPAId)
        && forecastTotal === Number(planning.totalRevenue)
        && fixationTotal === Number(planning.totalExpense);
      if (traceValid) pass("Rastreabilidade PPA/LDO/LOA", `PPA ${plan.code}, LDO, LOA, fixações e ${appropriations.length} dotações estão vinculados.`);
      else fail("Rastreabilidade PPA/LDO/LOA", "Cadeia de planejamento, metas/indicadores, totais ou vínculos das dotações incompletos.");

      const cmdByUnit = new Map<string, Set<number>>();
      for (const schedule of planning.cmdSchedules) {
        const months = cmdByUnit.get(schedule.budgetUnitId) ?? new Set<number>();
        months.add(schedule.month);
        cmdByUnit.set(schedule.budgetUnitId, months);
      }
      const cmdComplete = [...unitIds].every((unitId) => cmdByUnit.get(unitId)?.size === 12);
      const mbaComplete = new Set(planning.mbaTargets.map((target) => target.bimonth)).size === 6;
      if (cmdComplete && mbaComplete) pass("CMD e MBA", "CMD possui 12 meses por UG e MBA possui 6 bimestres.");
      else fail("CMD e MBA", "CMD ou MBA incompleto para a LOA POC.");
      observe("Totais LOA", `Receita prevista ${money(planning.totalRevenue)}; fixação ${money(planning.totalExpense)}.`);
    }

    if (!reports.length) {
      observe("Snapshots públicos", "Nenhum snapshot público encontrado; ausência não é aprovada como publicação legal.");
    } else {
      const invalidReports = reports.filter((report) => !report.versions.length);
      if (invalidReports.length) fail("Snapshots públicos", `${invalidReports.length} documento(s) publicado(s) sem versão FINAL ou SIGNED.`);
      else pass("Snapshots públicos", `${reports.length} documento(s) publicado(s) possuem versão final.`);
    }
  } finally {
    console.table(checks);
    await prisma.$disconnect();
  }

  if (checks.some((check) => check.status === "FALHA")) process.exitCode = 1;
}

main().catch(async (error) => {
  console.error("Falha ao verificar a base POC:", error);
  await prisma.$disconnect();
  process.exit(1);
});
