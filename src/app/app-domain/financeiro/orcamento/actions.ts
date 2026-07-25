"use server";

import {
  FinanceError,
  cancelBudgetReservation,
  createBudgetMovement,
  createBudgetReservation,
  setFinancialYearStatus,
} from "@/lib/financeiro";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string };
type MasterDataType = "budgetUnit" | "resourceSource" | "revenueNature" | "expenseNature";
type MasterDataInput = { code: string; name: string; secretariatId?: string };

function failure(error: unknown, fallback: string) {
  return { error: error instanceof FinanceError ? error.message : fallback };
}

function validateMasterData(data: MasterDataInput, type: MasterDataType) {
  if (!data.code.trim() || !data.name.trim()) throw new FinanceError("Código e nome são obrigatórios.");
  if (type === "budgetUnit" && !data.secretariatId) throw new FinanceError("Selecione a secretaria da unidade orçamentária.");
}

export async function createMasterData(type: MasterDataType, data: MasterDataInput): Promise<ActionResult> {
  try {
    validateMasterData(data, type);
    const { prisma } = await getTenantContextForModule("FINANCEIRO");
    if (type === "budgetUnit") await prisma.budgetUnit.create({ data: { code: data.code.trim(), name: data.name.trim(), secretariatId: data.secretariatId! } });
    if (type === "resourceSource") await prisma.resourceSource.create({ data: { code: data.code.trim(), name: data.name.trim() } });
    if (type === "revenueNature") await prisma.revenueNature.create({ data: { code: data.code.trim(), name: data.name.trim() } });
    if (type === "expenseNature") await prisma.expenseNature.create({ data: { code: data.code.trim(), name: data.name.trim() } });
    revalidatePath("/financeiro/orcamento/cadastros");
    return {};
  } catch (error) {
    return failure(error, "Não foi possível criar o cadastro.");
  }
}

export async function updateMasterData(type: MasterDataType, id: string, data: MasterDataInput): Promise<ActionResult> {
  try {
    validateMasterData(data, type);
    const { prisma } = await getTenantContextForModule("FINANCEIRO");
    if (type === "budgetUnit") await prisma.budgetUnit.update({ where: { id }, data: { code: data.code.trim(), name: data.name.trim(), secretariatId: data.secretariatId! } });
    if (type === "resourceSource") await prisma.resourceSource.update({ where: { id }, data: { code: data.code.trim(), name: data.name.trim() } });
    if (type === "revenueNature") await prisma.revenueNature.update({ where: { id }, data: { code: data.code.trim(), name: data.name.trim() } });
    if (type === "expenseNature") await prisma.expenseNature.update({ where: { id }, data: { code: data.code.trim(), name: data.name.trim() } });
    revalidatePath("/financeiro/orcamento/cadastros");
    revalidatePath("/financeiro/orcamento");
    return {};
  } catch (error) {
    return failure(error, "Não foi possível alterar o cadastro. Registros em uso não podem ser removidos ou alterados indevidamente.");
  }
}

export async function deleteMasterData(type: MasterDataType, id: string): Promise<ActionResult> {
  try {
    const { prisma } = await getTenantContextForModule("FINANCEIRO");
    if (type === "budgetUnit") await prisma.budgetUnit.delete({ where: { id } });
    if (type === "resourceSource") await prisma.resourceSource.delete({ where: { id } });
    if (type === "revenueNature") await prisma.revenueNature.delete({ where: { id } });
    if (type === "expenseNature") await prisma.expenseNature.delete({ where: { id } });
    revalidatePath("/financeiro/orcamento/cadastros");
    return {};
  } catch (error) {
    return failure(error, "Não foi possível excluir o cadastro. Ele pode estar em uso por lançamentos financeiros.");
  }
}

export async function createBudgetMovementAction(data: { date: Date; type: string; value: number; justification: string; appropriationId: string }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    await createBudgetMovement(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, data);
    revalidatePath("/financeiro/orcamento");
    return {};
  } catch (error) {
    return failure(error, "Não foi possível registrar o movimento orçamentário.");
  }
}

export async function createBudgetReservationAction(data: { number: string; date: Date; value: number; appropriationId: string; expenseId?: string; justification?: string }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    await createBudgetReservation(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, data);
    revalidatePath("/financeiro/orcamento");
    revalidatePath("/financeiro/empenhos");
    return {};
  } catch (error) {
    return failure(error, "Não foi possível criar a reserva orçamentária.");
  }
}

export async function cancelBudgetReservationAction(id: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    await cancelBudgetReservation(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id);
    revalidatePath("/financeiro/orcamento");
    revalidatePath("/financeiro/empenhos");
    return {};
  } catch (error) {
    return failure(error, "Não foi possível cancelar a reserva orçamentária.");
  }
}

export async function setFinancialYearStatusAction(id: string, status: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModule("FINANCEIRO");
    await setFinancialYearStatus(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id, status);
    revalidatePath("/financeiro/orcamento");
    return {};
  } catch (error) {
    return failure(error, "Não foi possível atualizar o exercício financeiro.");
  }
}
