import { Prisma, type PrismaClient } from "@prisma/client";
import { assertFinancialYearOpen, FinanceActor, FinanceError, createBudgetMovementInTransaction } from "./index";

type Db = PrismaClient | Prisma.TransactionClient;

const creditTypes = ["Suplementar", "Especial", "Extraordinário", "Remanejamento", "Transposição", "Transferência"] as const;
const creditItemTypes = ["Acréscimo", "Anulação"] as const;

type CreditType = (typeof creditTypes)[number];
type CreditItemType = (typeof creditItemTypes)[number];

async function assertFinancialYearPlanningEligible(tx: Db, financialYearId: string) {
  const financialYear = await tx.financialYear.findUnique({ where: { id: financialYearId } });
  if (!financialYear) throw new FinanceError("Exercício financeiro não encontrado.");
  if (!['Preparação', 'Aberto'].includes(financialYear.status)) {
    throw new FinanceError(`O exercício ${financialYear.year} não está disponível para planejamento.`);
  }
  return financialYear;
}

function requireText(value: string, field: string) {
  if (!value.trim()) throw new FinanceError(`${field} é obrigatório.`);
  return value.trim();
}

function requirePositiveMoney(value: number, field: string) {
  const decimal = new Prisma.Decimal(value);
  if (!decimal.isFinite() || decimal.lessThanOrEqualTo(0)) {
    throw new FinanceError(`${field} deve ser maior que zero.`);
  }
  return decimal.toDecimalPlaces(2);
}

function requireNonNegativeMoney(value: number, field: string) {
  const decimal = new Prisma.Decimal(value);
  if (!decimal.isFinite() || decimal.lessThan(0)) {
    throw new FinanceError(`${field} deve ser maior ou igual a zero.`);
  }
  return decimal.toDecimalPlaces(2);
}

function assertBudgetUnitPermission(actor: FinanceActor, budgetUnitId: string) {
  if (actor.allowedBudgetUnitIds && !actor.allowedBudgetUnitIds.includes(budgetUnitId)) {
    throw new FinanceError("Acesso negado à unidade gestora da dotação.");
  }
}

async function lockCreditRequest(tx: Prisma.TransactionClient, creditRequestId: string) {
  await tx.$queryRaw`SELECT id FROM "CreditRequest" WHERE id = ${creditRequestId} FOR UPDATE`;
}

async function audit(
  tx: Db,
  actor: FinanceActor,
  action: string,
  entityType: string,
  entityId: string,
  payload: Prisma.InputJsonValue,
  financialYearId?: string,
  budgetUnitId?: string,
) {
  await tx.financialAuditLog.create({
    data: {
      action,
      entityType,
      entityId,
      financialYearId,
      budgetUnitId: budgetUnitId || actor.budgetUnitId || undefined,
      payload,
      authorUsuarioId: actor.usuarioId,
      authorEmployeeId: actor.employeeId,
    },
  });
}

// --- PPA (Plano Plurianual) ---

export async function createMultiYearPlan(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    code: string;
    name: string;
    startYear: number;
    endYear: number;
    description?: string;
  },
) {
  requireText(input.code, "Código do PPA");
  requireText(input.name, "Nome do PPA");
  if (input.endYear <= input.startYear) {
    throw new FinanceError("O ano final do PPA deve ser maior que o ano inicial.");
  }

  return db.$transaction(async (tx) => {
    const existing = await tx.multiYearPlan.findUnique({ where: { code: input.code } });
    if (existing) throw new FinanceError(`Já existe um PPA com o código ${input.code}.`);

    const plan = await tx.multiYearPlan.create({
      data: {
        code: input.code.trim(),
        name: input.name.trim(),
        startYear: input.startYear,
        endYear: input.endYear,
        description: input.description?.trim(),
      },
    });

    await audit(tx, actor, "CREATE", "MultiYearPlan", plan.id, { code: plan.code, name: plan.name });
    return plan;
  });
}

export async function addProgramPPA(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    multiYearPlanId: string;
    code: string;
    name: string;
    type?: string;
  },
) {
  requireText(input.code, "Código do programa");
  requireText(input.name, "Nome do programa");
  return db.$transaction(async (tx) => {
    const plan = await tx.multiYearPlan.findUnique({ where: { id: input.multiYearPlanId } });
    if (!plan) throw new FinanceError("Plano Plurianual não encontrado.");

    const program = await tx.programPPA.create({
      data: {
        multiYearPlanId: plan.id,
        code: input.code.trim(),
        name: input.name.trim(),
        type: input.type?.trim() || "Finalístico",
      },
    });

    await audit(tx, actor, "CREATE", "ProgramPPA", program.id, { code: program.code, name: program.name });
    return program;
  });
}

// --- LDO (Lei de Diretrizes Orçamentárias) ---

export async function createBudgetGuideline(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    financialYearId: string;
    multiYearPlanId?: string;
    priorities?: { description: string; targetValue?: number }[];
    risks?: { description: string; estimatedImpact: number; mitigation: string }[];
  },
) {
  return db.$transaction(async (tx) => {
    const financialYear = await assertFinancialYearPlanningEligible(tx, input.financialYearId);
    if (input.multiYearPlanId) {
      const plan = await tx.multiYearPlan.findUnique({ where: { id: input.multiYearPlanId } });
      if (!plan) throw new FinanceError("Plano Plurianual não encontrado.");
      if (financialYear.year < plan.startYear || financialYear.year > plan.endYear) {
        throw new FinanceError("O exercício da LDO deve estar dentro da vigência do PPA selecionado.");
      }
    }
    const priorities = input.priorities ?? [];
    const risks = input.risks ?? [];
    for (const priority of priorities) requireText(priority.description, "Descrição da prioridade");
    for (const risk of risks) {
      requireText(risk.description, "Descrição do risco");
      requireText(risk.mitigation, "Mitigação do risco");
      requirePositiveMoney(risk.estimatedImpact, "Impacto estimado do risco");
    }
    const guideline = await tx.budgetGuideline.create({
        data: {
          financialYearId: input.financialYearId,
          multiYearPlanId: input.multiYearPlanId,
        priorities: {
          create: priorities.map((p) => ({
            description: p.description.trim(),
            targetValue: p.targetValue === undefined ? undefined : requirePositiveMoney(p.targetValue, "Meta da prioridade"),
          })),
        },
        risks: {
          create: risks.map((r) => ({
            description: r.description.trim(),
            estimatedImpact: requirePositiveMoney(r.estimatedImpact, "Impacto estimado do risco"),
            mitigation: r.mitigation.trim(),
          })),
        },
      },
      include: { priorities: true, risks: true },
    });

    await audit(tx, actor, "CREATE", "BudgetGuideline", guideline.id, {}, input.financialYearId);
    return guideline;
  });
}

// --- LOA (Lei Orçamentária Anual) ---

export async function createAnnualBudgetLaw(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    lawNumber: string;
    publicationDate: Date;
    financialYearId: string;
    budgetGuidelineId?: string;
    totalRevenue: number;
    totalExpense: number;
    revenueForecasts?: { code: string; name: string; estimatedValue: number }[];
    expenseFixations?: { code: string; name: string; fixedValue: number }[];
  },
) {
  requireText(input.lawNumber, "Número da LOA");
  if (Number.isNaN(input.publicationDate.getTime())) {
    throw new FinanceError("Data de publicação da LOA inválida.");
  }
  const revenue = new Prisma.Decimal(input.totalRevenue);
  const expense = new Prisma.Decimal(input.totalExpense);

  if (!revenue.isFinite() || !expense.isFinite() || revenue.lessThanOrEqualTo(0) || expense.lessThanOrEqualTo(0)) {
    throw new FinanceError("Os totais da LOA devem ser maiores que zero.");
  }
  if (!revenue.equals(expense)) {
    throw new FinanceError("O valor total da receita prevista deve ser igual ao valor total da despesa fixada (Equilíbrio Orçamentário).");
  }

  const revenueForecasts = input.revenueForecasts ?? [];
  const expenseFixations = input.expenseFixations ?? [];
  if (!revenueForecasts.length || !expenseFixations.length) {
    throw new FinanceError("Informe a previsão de receita e a fixação de despesa que compõem a LOA.");
  }
  const forecastTotal = revenueForecasts.reduce(
    (sum, item) => sum.plus(requirePositiveMoney(item.estimatedValue, "Valor previsto da receita")),
    new Prisma.Decimal(0),
  );
  const fixationTotal = expenseFixations.reduce(
    (sum, item) => sum.plus(requirePositiveMoney(item.fixedValue, "Valor fixado da despesa")),
    new Prisma.Decimal(0),
  );
  if (!forecastTotal.equals(revenue) || !fixationTotal.equals(expense)) {
    throw new FinanceError("Os totais informados devem corresponder à soma das previsões e fixações da LOA.");
  }

  return db.$transaction(async (tx) => {
    await assertFinancialYearPlanningEligible(tx, input.financialYearId);
    if (input.budgetGuidelineId) {
      const guideline = await tx.budgetGuideline.findUnique({ where: { id: input.budgetGuidelineId } });
      if (!guideline) throw new FinanceError("Lei de Diretrizes Orçamentárias não encontrada.");
      if (guideline.financialYearId !== input.financialYearId) {
        throw new FinanceError("A LDO selecionada deve pertencer ao mesmo exercício financeiro da LOA.");
      }
    }

    const loa = await tx.annualBudgetLaw.create({
      data: {
        lawNumber: input.lawNumber.trim(),
        publicationDate: input.publicationDate,
        financialYearId: input.financialYearId,
        budgetGuidelineId: input.budgetGuidelineId,
        totalRevenue: revenue,
        totalExpense: expense,
        revenueForecasts: {
          create: revenueForecasts.map((r) => ({
            code: requireText(r.code, "Código da previsão de receita"),
            name: requireText(r.name, "Nome da previsão de receita"),
            estimatedValue: requirePositiveMoney(r.estimatedValue, "Valor previsto da receita"),
          })),
        },
        expenseFixations: {
          create: expenseFixations.map((e) => ({
            code: requireText(e.code, "Código da fixação de despesa"),
            name: requireText(e.name, "Nome da fixação de despesa"),
            fixedValue: requirePositiveMoney(e.fixedValue, "Valor fixado da despesa"),
          })),
        },
      },
      include: { revenueForecasts: true, expenseFixations: true },
    });

    await audit(tx, actor, "CREATE", "AnnualBudgetLaw", loa.id, { lawNumber: loa.lawNumber }, input.financialYearId);
    return loa;
  });
}

export async function createBudgetAppropriationFromFixation(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    annualBudgetExpenseFixationId: string;
    code: string;
    budgetUnitId: string;
    expenseNatureId: string;
    resourceSourceId: string;
    initialValue: number;
  },
) {
  const code = requireText(input.code, "Codigo da dotacao");
  if (!input.annualBudgetExpenseFixationId) throw new FinanceError("Selecione a fixacao de despesa da LOA.");
  if (!input.budgetUnitId) throw new FinanceError("Selecione a unidade orcamentaria.");
  if (!input.expenseNatureId) throw new FinanceError("Selecione a natureza de despesa.");
  if (!input.resourceSourceId) throw new FinanceError("Selecione a fonte de recursos.");
  const initialValue = requirePositiveMoney(input.initialValue, "Valor inicial da dotacao");
  assertBudgetUnitPermission(actor, input.budgetUnitId);

  return db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM "AnnualBudgetExpenseFixation" WHERE id = ${input.annualBudgetExpenseFixationId} FOR UPDATE`;
    const fixation = await tx.annualBudgetExpenseFixation.findUnique({
      where: { id: input.annualBudgetExpenseFixationId },
      include: { annualBudgetLaw: { select: { financialYearId: true } } },
    });
    if (!fixation) throw new FinanceError("Fixacao de despesa da LOA nao encontrada.");

    await assertFinancialYearPlanningEligible(tx, fixation.annualBudgetLaw.financialYearId);
    const [budgetUnit, expenseNature, resourceSource, existing] = await Promise.all([
      tx.budgetUnit.findUnique({ where: { id: input.budgetUnitId }, select: { id: true } }),
      tx.expenseNature.findUnique({ where: { id: input.expenseNatureId }, select: { id: true } }),
      tx.resourceSource.findUnique({ where: { id: input.resourceSourceId }, select: { id: true } }),
      tx.budgetAppropriation.findMany({
        where: { annualBudgetExpenseFixationId: fixation.id },
        select: { initialValue: true, initialValueDecimal: true },
      }),
    ]);
    if (!budgetUnit) throw new FinanceError("Unidade orcamentaria nao encontrada.");
    if (!expenseNature) throw new FinanceError("Natureza de despesa nao encontrada.");
    if (!resourceSource) throw new FinanceError("Fonte de recursos nao encontrada.");

    const allocated = existing.reduce(
      (total, appropriation) => total.plus(appropriation.initialValueDecimal ?? appropriation.initialValue),
      new Prisma.Decimal(0),
    );
    if (allocated.plus(initialValue).greaterThan(fixation.fixedValue)) {
      throw new FinanceError("O valor da dotacao excede o saldo disponivel da fixacao de despesa da LOA.");
    }

    const appropriation = await tx.budgetAppropriation.create({
      data: {
        code,
        financialYearId: fixation.annualBudgetLaw.financialYearId,
        budgetUnitId: budgetUnit.id,
        expenseNatureId: expenseNature.id,
        resourceSourceId: resourceSource.id,
        annualBudgetExpenseFixationId: fixation.id,
        initialValue: Number(initialValue.toString()),
        initialValueDecimal: initialValue,
        updatedValue: Number(initialValue.toString()),
        updatedValueDecimal: initialValue,
        committedValue: 0,
        committedValueDecimal: new Prisma.Decimal(0),
      },
    });
    await audit(
      tx,
      actor,
      "CREATE",
      "BudgetAppropriation",
      appropriation.id,
      { code: appropriation.code, annualBudgetExpenseFixationId: fixation.id, initialValue: initialValue.toFixed(2) },
      appropriation.financialYearId,
      appropriation.budgetUnitId,
    );
    return appropriation;
  });
}

export async function saveMonthlyDisbursementSchedule(
  db: PrismaClient,
  actor: FinanceActor,
  input: { annualBudgetLawId: string; month: number; budgetUnitId: string; limitValue: number },
) {
  if (!Number.isInteger(input.month) || input.month < 1 || input.month > 12) {
    throw new FinanceError("O mes do CMD deve estar entre 1 e 12.");
  }
  if (!input.annualBudgetLawId) throw new FinanceError("Selecione a LOA.");
  if (!input.budgetUnitId) throw new FinanceError("Selecione a unidade orcamentaria.");
  const limitValue = requireNonNegativeMoney(input.limitValue, "Limite mensal de desembolso");
  assertBudgetUnitPermission(actor, input.budgetUnitId);

  return db.$transaction(async (tx) => {
    const [law, budgetUnit] = await Promise.all([
      tx.annualBudgetLaw.findUnique({ where: { id: input.annualBudgetLawId }, select: { id: true, financialYearId: true } }),
      tx.budgetUnit.findUnique({ where: { id: input.budgetUnitId }, select: { id: true } }),
    ]);
    if (!law) throw new FinanceError("LOA nao encontrada.");
    if (!budgetUnit) throw new FinanceError("Unidade orcamentaria nao encontrada.");
    await assertFinancialYearPlanningEligible(tx, law.financialYearId);
    const schedule = await tx.monthlyDisbursementSchedule.upsert({
      where: { annualBudgetLawId_month_budgetUnitId: { annualBudgetLawId: law.id, month: input.month, budgetUnitId: budgetUnit.id } },
      create: { annualBudgetLawId: law.id, month: input.month, budgetUnitId: budgetUnit.id, limitValue },
      update: { limitValue },
    });
    await audit(tx, actor, "UPSERT", "MonthlyDisbursementSchedule", schedule.id, { annualBudgetLawId: law.id, month: input.month, limitValue: limitValue.toFixed(2) }, law.financialYearId, budgetUnit.id);
    return schedule;
  });
}

export async function saveBimonthlyRevenueTarget(
  db: PrismaClient,
  actor: FinanceActor,
  input: { annualBudgetLawId: string; bimonth: number; targetValue: number },
) {
  if (!Number.isInteger(input.bimonth) || input.bimonth < 1 || input.bimonth > 6) {
    throw new FinanceError("O bimestre da MBA deve estar entre 1 e 6.");
  }
  if (!input.annualBudgetLawId) throw new FinanceError("Selecione a LOA.");
  const targetValue = requireNonNegativeMoney(input.targetValue, "Meta bimestral de arrecadacao");

  return db.$transaction(async (tx) => {
    const law = await tx.annualBudgetLaw.findUnique({ where: { id: input.annualBudgetLawId }, select: { id: true, financialYearId: true } });
    if (!law) throw new FinanceError("LOA nao encontrada.");
    await assertFinancialYearPlanningEligible(tx, law.financialYearId);
    const target = await tx.bimonthlyRevenueTarget.upsert({
      where: { annualBudgetLawId_bimonth: { annualBudgetLawId: law.id, bimonth: input.bimonth } },
      create: { annualBudgetLawId: law.id, bimonth: input.bimonth, targetValue },
      update: { targetValue },
    });
    await audit(tx, actor, "UPSERT", "BimonthlyRevenueTarget", target.id, { annualBudgetLawId: law.id, bimonth: input.bimonth, targetValue: targetValue.toFixed(2) }, law.financialYearId);
    return target;
  });
}

// --- Créditos Adicionais com segregação de funções ---

export async function createCreditRequest(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    number: string;
    financialYearId: string;
    type: CreditType;
    lawNumber?: string;
    justification: string;
    items: { appropriationId: string; type: CreditItemType; value: number }[];
  },
) {
  const number = requireText(input.number, "Número do crédito");
  const justification = requireText(input.justification, "Justificativa do crédito");
  if (!creditTypes.includes(input.type)) throw new FinanceError("Tipo de crédito adicional inválido.");
  if (input.items.length === 0) {
    throw new FinanceError("Informe ao menos um item de acréscimo ou anulação na solicitação de crédito.");
  }

  for (const item of input.items) {
    if (!item.appropriationId) throw new FinanceError("Selecione a dotação de cada item do crédito.");
    if (!creditItemTypes.includes(item.type)) throw new FinanceError("Tipo de item do crédito inválido.");
    requirePositiveMoney(item.value, "Valor do item do crédito");
  }

  const acrescimo = input.items
    .filter((i) => i.type === "Acréscimo")
    .reduce((sum, i) => sum.plus(requirePositiveMoney(i.value, "Valor do item do crédito")), new Prisma.Decimal(0));
  const anulacao = input.items
    .filter((i) => i.type === "Anulação")
    .reduce((sum, i) => sum.plus(requirePositiveMoney(i.value, "Valor do item do crédito")), new Prisma.Decimal(0));

  if (acrescimo.lessThanOrEqualTo(0)) {
    throw new FinanceError("O crédito adicional deve possuir ao menos um acréscimo.");
  }

  if (input.type === "Remanejamento" || input.type === "Transposição" || input.type === "Transferência") {
    if (!acrescimo.equals(anulacao)) {
      throw new FinanceError(`Para ${input.type}, o valor total de acréscimo deve ser exatamente igual ao de anulação.`);
    }
  }

  return db.$transaction(async (tx) => {
    await assertFinancialYearOpen(tx, input.financialYearId, new Date());

    const appropriations = await tx.budgetAppropriation.findMany({
      where: { id: { in: input.items.map((item) => item.appropriationId) } },
      select: { id: true, financialYearId: true, budgetUnitId: true },
    });
    if (appropriations.length !== new Set(input.items.map((item) => item.appropriationId)).size) {
      throw new FinanceError("Uma ou mais dotações informadas não foram encontradas.");
    }
    for (const appropriation of appropriations) {
      if (appropriation.financialYearId !== input.financialYearId) {
        throw new FinanceError("Todas as dotações do crédito devem pertencer ao exercício financeiro selecionado.");
      }
      assertBudgetUnitPermission(actor, appropriation.budgetUnitId);
    }

    const existing = await tx.creditRequest.findUnique({ where: { number } });
    if (existing) throw new FinanceError(`Já existe uma solicitação de crédito com o número ${number}.`);

    const credit = await tx.creditRequest.create({
      data: {
        number,
        financialYearId: input.financialYearId,
        type: input.type,
        lawNumber: input.lawNumber?.trim(),
        justification,
        totalValue: acrescimo,
        requestedById: actor.usuarioId,
        items: {
          create: input.items.map((item) => ({
            appropriationId: item.appropriationId,
            type: item.type,
            value: requirePositiveMoney(item.value, "Valor do item do crédito"),
          })),
        },
      },
      include: { items: true },
    });

    await audit(tx, actor, "CREATE", "CreditRequest", credit.id, { number: credit.number, type: credit.type }, input.financialYearId);
    return credit;
  });
}

export async function approveCreditRequest(
  db: PrismaClient,
  actor: FinanceActor,
  creditRequestId: string,
) {
  return db.$transaction(async (tx) => {
    await lockCreditRequest(tx, creditRequestId);
    const credit = await tx.creditRequest.findUnique({
      where: { id: creditRequestId },
      include: { items: { include: { appropriation: { select: { financialYearId: true, budgetUnitId: true } } } } },
    });
    if (!credit) throw new FinanceError("Solicitação de crédito adicional não encontrada.");
    if (credit.status !== "Solicitado") throw new FinanceError(`A solicitação de crédito já está em status ${credit.status}.`);
    await assertFinancialYearOpen(tx, credit.financialYearId, new Date());
    for (const item of credit.items) {
      if (item.appropriation.financialYearId !== credit.financialYearId) {
        throw new FinanceError("A solicitação possui dotação de exercício divergente e não pode ser aprovada.");
      }
      assertBudgetUnitPermission(actor, item.appropriation.budgetUnitId);
    }

    // Regra de Segregação: O solicitante NÃO pode aprovar a própria solicitação.
    if (credit.requestedById === actor.usuarioId) {
      throw new FinanceError("Segregação de Funções: O usuário solicitante não pode aprovar a própria solicitação de crédito.");
    }

    const approved = await tx.creditRequest.updateMany({
      where: { id: creditRequestId, status: "Solicitado" },
      data: { status: "Aprovado", approvedById: actor.usuarioId },
    });
    if (approved.count !== 1) throw new FinanceError("A solicitação foi alterada por outro usuário. Atualize a página e tente novamente.");

    const updated = await tx.creditRequest.findUniqueOrThrow({ where: { id: creditRequestId } });

    await audit(tx, actor, "APPROVE", "CreditRequest", credit.id, { approvedBy: actor.usuarioId }, credit.financialYearId);
    return updated;
  });
}

export async function executeCreditRequest(
  db: PrismaClient,
  actor: FinanceActor,
  creditRequestId: string,
) {
  return db.$transaction(async (tx) => {
    await lockCreditRequest(tx, creditRequestId);
    const credit = await tx.creditRequest.findUnique({
      where: { id: creditRequestId },
      include: { items: { include: { appropriation: { select: { financialYearId: true, budgetUnitId: true } } } } },
    });
    if (!credit) throw new FinanceError("Solicitação de crédito adicional não encontrada.");
    if (credit.status !== "Aprovado") throw new FinanceError("A solicitação de crédito deve estar Aprovada para ser efetivada.");
    await assertFinancialYearOpen(tx, credit.financialYearId, new Date());

    const increaseMovementType: Record<CreditType, string> = {
      Suplementar: "Suplementação",
      Especial: "Especial",
      Extraordinário: "Extraordinário",
      Remanejamento: "Remanejamento",
      Transposição: "Transposição",
      Transferência: "Transferência",
    };

    for (const item of [...credit.items].sort((a, b) => a.appropriationId.localeCompare(b.appropriationId))) {
      if (item.appropriation.financialYearId !== credit.financialYearId) {
        throw new FinanceError("A solicitação possui dotação de exercício divergente e não pode ser efetivada.");
      }
      assertBudgetUnitPermission(actor, item.appropriation.budgetUnitId);
      const movementType = item.type === "Acréscimo" ? increaseMovementType[credit.type as CreditType] : "Anulação";
      await createBudgetMovementInTransaction(tx, actor, {
        date: new Date(),
        type: movementType,
        value: item.value,
        justification: `Crédito Adicional ${credit.type} N.º ${credit.number}: ${credit.justification}`,
        appropriationId: item.appropriationId,
        sourceModule: "PLANEJAMENTO",
        sourceType: "CREDIT_REQUEST",
        sourceId: credit.id,
        eventType: "CREDIT_EXECUTED",
        idempotencyKey: `CREDIT_REQUEST:${credit.id}:${item.id}`,
      });
    }

    const execution = await tx.creditRequest.updateMany({
      where: { id: creditRequestId, status: "Aprovado" },
      data: { status: "Efetivado" },
    });
    if (execution.count !== 1) throw new FinanceError("A solicitação foi alterada por outro usuário. Atualize a página e tente novamente.");

    const executed = await tx.creditRequest.findUniqueOrThrow({ where: { id: creditRequestId } });

    await audit(tx, actor, "EXECUTE", "CreditRequest", credit.id, {}, credit.financialYearId);
    return executed;
  });
}
