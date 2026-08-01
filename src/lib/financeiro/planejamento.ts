import { Prisma, type PrismaClient } from "@prisma/client";
import { assertFinancialYearOpen, FinanceActor, FinanceError, createBudgetMovement } from "./index";

type Db = PrismaClient | Prisma.TransactionClient;

async function audit(
  tx: Db,
  actor: FinanceActor,
  action: string,
  entityType: string,
  entityId: string,
  payload: Prisma.InputJsonValue,
  financialYearId?: string,
) {
  await tx.financialAuditLog.create({
    data: {
      action,
      entityType,
      entityId,
      financialYearId,
      budgetUnitId: actor.budgetUnitId || undefined,
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
    priorities?: { description: string; targetValue?: number }[];
    risks?: { description: string; estimatedImpact: number; mitigation: string }[];
  },
) {
  return db.$transaction(async (tx) => {
    await assertFinancialYearOpen(tx, input.financialYearId, new Date());
    const guideline = await tx.budgetGuideline.create({
      data: {
        financialYearId: input.financialYearId,
        priorities: {
          create: input.priorities?.map((p) => ({
            description: p.description.trim(),
            targetValue: p.targetValue ? new Prisma.Decimal(p.targetValue) : undefined,
          })),
        },
        risks: {
          create: input.risks?.map((r) => ({
            description: r.description.trim(),
            estimatedImpact: new Prisma.Decimal(r.estimatedImpact),
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
    totalRevenue: number;
    totalExpense: number;
    revenueForecasts?: { code: string; name: string; estimatedValue: number }[];
    expenseFixations?: { code: string; name: string; fixedValue: number }[];
  },
) {
  const revenue = new Prisma.Decimal(input.totalRevenue);
  const expense = new Prisma.Decimal(input.totalExpense);

  if (!revenue.equals(expense)) {
    throw new FinanceError("O valor total da receita prevista deve ser igual ao valor total da despesa fixada (Equilíbrio Orçamentário).");
  }

  return db.$transaction(async (tx) => {
    await assertFinancialYearOpen(tx, input.financialYearId, input.publicationDate);

    const loa = await tx.annualBudgetLaw.create({
      data: {
        lawNumber: input.lawNumber.trim(),
        publicationDate: input.publicationDate,
        financialYearId: input.financialYearId,
        totalRevenue: revenue,
        totalExpense: expense,
        revenueForecasts: {
          create: input.revenueForecasts?.map((r) => ({
            code: r.code.trim(),
            name: r.name.trim(),
            estimatedValue: new Prisma.Decimal(r.estimatedValue),
          })),
        },
        expenseFixations: {
          create: input.expenseFixations?.map((e) => ({
            code: e.code.trim(),
            name: e.name.trim(),
            fixedValue: new Prisma.Decimal(e.fixedValue),
          })),
        },
      },
      include: { revenueForecasts: true, expenseFixations: true },
    });

    await audit(tx, actor, "CREATE", "AnnualBudgetLaw", loa.id, { lawNumber: loa.lawNumber }, input.financialYearId);
    return loa;
  });
}

// --- Créditos Adicionais com segregação de funções ---

export async function createCreditRequest(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    number: string;
    financialYearId: string;
    type: "Suplementar" | "Especial" | "Extraordinário" | "Remanejamento" | "Transposição" | "Transferência";
    lawNumber?: string;
    justification: string;
    items: { appropriationId: string; type: "Acréscimo" | "Anulação"; value: number }[];
  },
) {
  if (input.items.length === 0) {
    throw new FinanceError("Informe ao menos um item de acréscimo ou anulação na solicitação de crédito.");
  }

  const acrescimo = input.items
    .filter((i) => i.type === "Acréscimo")
    .reduce((sum, i) => sum.plus(new Prisma.Decimal(i.value)), new Prisma.Decimal(0));
  const anulacao = input.items
    .filter((i) => i.type === "Anulação")
    .reduce((sum, i) => sum.plus(new Prisma.Decimal(i.value)), new Prisma.Decimal(0));

  if (input.type === "Remanejamento" || input.type === "Transposição" || input.type === "Transferência") {
    if (!acrescimo.equals(anulacao)) {
      throw new FinanceError(`Para ${input.type}, o valor total de acréscimo deve ser exatamente igual ao de anulação.`);
    }
  }

  return db.$transaction(async (tx) => {
    await assertFinancialYearOpen(tx, input.financialYearId, new Date());

    const existing = await tx.creditRequest.findUnique({ where: { number: input.number } });
    if (existing) throw new FinanceError(`Já existe uma solicitação de crédito com o número ${input.number}.`);

    const credit = await tx.creditRequest.create({
      data: {
        number: input.number.trim(),
        financialYearId: input.financialYearId,
        type: input.type,
        lawNumber: input.lawNumber?.trim(),
        justification: input.justification.trim(),
        totalValue: acrescimo,
        requestedById: actor.usuarioId,
        items: {
          create: input.items.map((item) => ({
            appropriationId: item.appropriationId,
            type: item.type,
            value: new Prisma.Decimal(item.value),
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
    const credit = await tx.creditRequest.findUnique({ where: { id: creditRequestId }, include: { items: true } });
    if (!credit) throw new FinanceError("Solicitação de crédito adicional não encontrada.");
    if (credit.status !== "Solicitado") throw new FinanceError(`A solicitação de crédito já está em status ${credit.status}.`);

    // Regra de Segregação: O solicitante NÃO pode aprovar a própria solicitação.
    if (credit.requestedById === actor.usuarioId) {
      throw new FinanceError("Segregação de Funções: O usuário solicitante não pode aprovar a própria solicitação de crédito.");
    }

    const updated = await tx.creditRequest.update({
      where: { id: creditRequestId },
      data: {
        status: "Aprovado",
        approvedById: actor.usuarioId,
      },
    });

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
    const credit = await tx.creditRequest.findUnique({ where: { id: creditRequestId }, include: { items: true } });
    if (!credit) throw new FinanceError("Solicitação de crédito adicional não encontrada.");
    if (credit.status !== "Aprovado") throw new FinanceError("A solicitação de crédito deve estar Aprovada para ser efetivada.");

    for (const item of credit.items) {
      const movementType = item.type === "Acréscimo" ? "Suplementação" : "Anulação";
      await createBudgetMovement(tx as unknown as PrismaClient, actor, {
        date: new Date(),
        type: movementType,
        value: item.value,
        justification: `Crédito Adicional ${credit.type} N.º ${credit.number}: ${credit.justification}`,
        appropriationId: item.appropriationId,
        sourceModule: "PLANEJAMENTO",
        sourceType: "CREDIT_REQUEST",
        sourceId: credit.id,
        eventType: "CREDIT_EXECUTED",
      });
    }

    const executed = await tx.creditRequest.update({
      where: { id: creditRequestId },
      data: { status: "Efetivado" },
    });

    await audit(tx, actor, "EXECUTE", "CreditRequest", credit.id, {}, credit.financialYearId);
    return executed;
  });
}
