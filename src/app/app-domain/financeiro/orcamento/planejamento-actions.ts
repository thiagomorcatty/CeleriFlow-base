"use server";

import { FinanceError } from "@/lib/financeiro";
import {
  createMultiYearPlan,
  addProgramPPA,
  createBudgetGuideline,
  createAnnualBudgetLaw,
  createCreditRequest,
  approveCreditRequest,
  executeCreditRequest,
} from "@/lib/financeiro/planejamento";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult<T = undefined> = { error?: string; data?: T };

function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof FinanceError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}

export async function actionCreateMultiYearPlan(input: {
  code: string;
  name: string;
  startYear: number;
  endYear: number;
  description?: string;
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    const actor = {
      usuarioId: context.user.id,
      employeeId: context.user.employeeId,
    };
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
    const context = await getTenantContextForModule("FINANCEIRO");
    const actor = {
      usuarioId: context.user.id,
      employeeId: context.user.employeeId,
    };
    const program = await addProgramPPA(context.prisma, actor, input);
    revalidatePath("/financeiro/orcamento");
    return { data: { id: program.id } };
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível adicionar o programa ao PPA.") };
  }
}

export async function actionCreateBudgetGuideline(input: {
  financialYearId: string;
  priorities?: { description: string; targetValue?: number }[];
  risks?: { description: string; estimatedImpact: number; mitigation: string }[];
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    const actor = {
      usuarioId: context.user.id,
      employeeId: context.user.employeeId,
    };
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
  totalRevenue: number;
  totalExpense: number;
  revenueForecasts?: { code: string; name: string; estimatedValue: number }[];
  expenseFixations?: { code: string; name: string; fixedValue: number }[];
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    const actor = {
      usuarioId: context.user.id,
      employeeId: context.user.employeeId,
    };
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

export async function actionCreateCreditRequest(input: {
  number: string;
  financialYearId: string;
  type: "Suplementar" | "Especial" | "Extraordinário" | "Remanejamento" | "Transposição" | "Transferência";
  lawNumber?: string;
  justification: string;
  items: { appropriationId: string; type: "Acréscimo" | "Anulação"; value: number }[];
}): Promise<ActionResult<{ id: string }>> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    const actor = {
      usuarioId: context.user.id,
      employeeId: context.user.employeeId,
    };
    const credit = await createCreditRequest(context.prisma, actor, input);
    revalidatePath("/financeiro/orcamento");
    return { data: { id: credit.id } };
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível criar a solicitação de crédito.") };
  }
}

export async function actionApproveCreditRequest(creditRequestId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    const actor = {
      usuarioId: context.user.id,
      employeeId: context.user.employeeId,
    };
    await approveCreditRequest(context.prisma, actor, creditRequestId);
    revalidatePath("/financeiro/orcamento");
    return {};
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível aprovar a solicitação de crédito.") };
  }
}

export async function actionExecuteCreditRequest(creditRequestId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    const actor = {
      usuarioId: context.user.id,
      employeeId: context.user.employeeId,
    };
    await executeCreditRequest(context.prisma, actor, creditRequestId);
    revalidatePath("/financeiro/orcamento");
    return {};
  } catch (error) {
    return { error: errorMessage(error, "Não foi possível efetivar o crédito adicional.") };
  }
}
