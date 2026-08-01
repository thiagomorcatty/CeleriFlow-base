"use server";

import { FinanceError, closeAccountingMonth, configureAccountingPostingRule, postAccountingTransaction, prepareAnnualAccountingClose } from "@/lib/financeiro";
import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string };
const message = (error: unknown) => error instanceof FinanceError ? error.message : "Nao foi possivel concluir a operacao contabil.";

export async function postManualAccountingTransaction(data: { financialYearId: string; date: string; history: string; debitAccountId: string; creditAccountId: string; value: number }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await postAccountingTransaction(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, {
      financialYearId: data.financialYearId,
      date: new Date(data.date),
      history: data.history,
      lines: [{ accountId: data.debitAccountId, type: "Débito", value: data.value }, { accountId: data.creditAccountId, type: "Crédito", value: data.value }],
    });
    revalidatePath("/financeiro/contabilidade");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function closeMonth(data: { financialYearId: string; competence: string }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await closeAccountingMonth(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, data.financialYearId, new Date(data.competence));
    revalidatePath("/financeiro/contabilidade");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function prepareAnnualClose(financialYearId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await prepareAnnualAccountingClose(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, financialYearId);
    revalidatePath("/financeiro/contabilidade");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

export async function savePostingRule(data: { eventCode: string; eventName: string; debitAccountId: string; creditAccountId: string }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await configureAccountingPostingRule(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, data);
    revalidatePath("/financeiro/contabilidade");
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}
