"use server";

import { FinanceError } from "@/lib/financeiro";
import {
  createMultiYearPlan,
  addProgramPPA,
  addActionPPA,
  createBudgetGuideline,
  createAnnualBudgetLaw,
  createBudgetAppropriationFromFixation,
  saveBimonthlyRevenueTarget,
  saveMonthlyDisbursementSchedule,
  createCreditRequest,
  approveCreditRequest,
  executeCreditRequest,
} from "@/lib/financeiro/planejamento";
import { getTenantContextForModuleEdit, isSystemAdministrator, type AppContext } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionResult<T = undefined> = { error?: string; data?: T };

function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof FinanceError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}

function financeActor(context: AppContext) {
  return {
    usuarioId: context.user.id,
    employeeId: context.user.employeeId,
    allowedBudgetUnitIds: isSystemAdministrator(context.user) ? undefined : context.user.allowedBudgetUnitIds,
  };
}

const creditRequestSchema = z.object({
  number: z.string().trim().min(1),
  financialYearId: z.string().min(1),
  type: z.enum(["Suplementar", "Especial", "Extraordinário", "Remanejamento", "Transposição", "Transferência"]),
  lawNumber: z.string().trim().min(1).optional(),
  justification: z.string().trim().min(1),
  items: z.array(z.object({
    appropriationId: z.string().min(1),
    type: z.enum(["Acréscimo", "Anulação"]),
    value: z.number().finite().positive(),
  })).min(1),
});

export async function actionCreateMultiYearPlan(input: {
  code: string;
  name: string;
  startYear: number;
  endYear: number;
  description?: string;
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const actor = financeActor(context);
    const plan = await createMultiYearPlan(context.prisma, actor, input);
    revalidatePath("/financeiro/orcamento");
    return { data: { id: plan.id } };
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível criar o Plano Plurianual.") };
  }
}

export async function actionAddProgramPPA(input: {
  multiYearPlanId: string;
  code: string;
  name: string;
  type?: string;
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const actor = financeActor(context);
    const program = await addProgramPPA(context.prisma, actor, input);
    revalidatePath("/financeiro/orcamento");
    return { data: { id: program.id } };
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível adicionar o programa ao PPA.") };
  }
}

export async function actionAddActionPPA(input: {
  programId: string;
  code: string;
  name: string;
  type?: string;
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const action = await addActionPPA(context.prisma, financeActor(context), input);
    revalidatePath("/financeiro/orcamento/planejamento");
    return { data: { id: action.id } };
  } catch (error) {
    return { error: errorMessage(error, "Nao foi possivel adicionar a acao ao PPA.") };
  }
}

export async function actionCreateBudgetGuideline(input: {
  financialYearId: string;
  multiYearPlanId?: string;
  priorities?: { description: string; targetValue?: number }[];
  risks?: { description: string; estimatedImpact: number; mitigation: string }[];
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const actor = financeActor(context);
    const guideline = await createBudgetGuideline(context.prisma, actor, input);
    revalidatePath("/financeiro/orcamento");
    return { data: { id: guideline.id } };
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível salvar a LDO.") };
  }
}

export async function actionCreateAnnualBudgetLaw(input: {
  lawNumber: string;
  publicationDate: string;
  financialYearId: string;
  budgetGuidelineId?: string;
  totalRevenue: number;
  totalExpense: number;
  revenueForecasts?: { code: string; name: string; estimatedValue: number }[];
  expenseFixations?: { code: string; name: string; fixedValue: number }[];
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const actor = financeActor(context);
    const loa = await createAnnualBudgetLaw(context.prisma, actor, {
      ...input,
      publicationDate: new Date(input.publicationDate),
    });
    revalidatePath("/financeiro/orcamento");
    return { data: { id: loa.id } };
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível cadastrar a LOA.") };
  }
}

export async function actionCreateBudgetAppropriationFromFixation(input: {
  annualBudgetExpenseFixationId: string;
  programPPAId: string;
  actionPPAId: string;
  code: string;
  budgetUnitId: string;
  expenseNatureId: string;
  resourceSourceId: string;
  initialValue: number;
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const appropriation = await createBudgetAppropriationFromFixation(context.prisma, financeActor(context), input);
    revalidatePath("/financeiro/orcamento");
    return { data: { id: appropriation.id } };
  } catch (error) {
    return { error: errorMessage(error, "Nao foi possivel criar a dotacao orcamentaria.") };
  }
}

export async function actionSaveMonthlyDisbursementSchedule(input: {
  annualBudgetLawId: string;
  month: number;
  budgetUnitId: string;
  limitValue: number;
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const schedule = await saveMonthlyDisbursementSchedule(context.prisma, financeActor(context), input);
    revalidatePath("/financeiro/orcamento/planejamento");
    return { data: { id: schedule.id } };
  } catch (error) {
    return { error: errorMessage(error, "Nao foi possivel salvar o CMD.") };
  }
}

export async function actionSaveBimonthlyRevenueTarget(input: {
  annualBudgetLawId: string;
  bimonth: number;
  targetValue: number;
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const target = await saveBimonthlyRevenueTarget(context.prisma, financeActor(context), input);
    revalidatePath("/financeiro/orcamento/planejamento");
    return { data: { id: target.id } };
  } catch (error) {
    return { error: errorMessage(error, "Nao foi possivel salvar a MBA.") };
  }
}

export async function actionCreateCreditRequest(input: {
  number: string;
  financialYearId: string;
  type: "Suplementar" | "Especial" | "Extraordinário" | "Remanejamento" | "Transposição" | "Transferência";
  lawNumber?: string;
  justification: string;
  items: { appropriationId: string; type: "Acréscimo" | "Anulação"; value: number }[];
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const credit = await createCreditRequest(context.prisma, financeActor(context), creditRequestSchema.parse(input));
    revalidatePath("/financeiro/orcamento");
    return { data: { id: credit.id } };
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível criar a solicitação de crédito.") };
  }
}

export async function actionApproveCreditRequest(creditRequestId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await approveCreditRequest(context.prisma, financeActor(context), z.string().min(1).parse(creditRequestId));
    revalidatePath("/financeiro/orcamento");
    return {};
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível aprovar a solicitação de crédito.") };
  }
}

export async function actionExecuteCreditRequest(creditRequestId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await executeCreditRequest(context.prisma, financeActor(context), z.string().min(1).parse(creditRequestId));
    revalidatePath("/financeiro/orcamento");
    return {};
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível efetivar o crédito adicional.") };
  }
}
