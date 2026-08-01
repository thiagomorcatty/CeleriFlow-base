"use server";

import { assertBudgetUnitAccess, getTenantContextForModuleEdit, isSystemAdministrator } from "@/lib/platform/tenant-context";
import { createBankAccountWithOpeningBalance, FinanceError, updateBankAccountDetails } from "@/lib/financeiro";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return getTenantContextForModuleEdit("FINANCEIRO");
}

async function assertAccountAccess(context: Awaited<ReturnType<typeof getTenantPrisma>>, accountId: string, nextBudgetUnitId?: string) {
  const account = await context.prisma.bankAccount.findUnique({ where: { id: accountId }, select: { budgetUnitId: true } });
  if (!account) throw new FinanceError("Conta bancária não encontrada.");
  if (!isSystemAdministrator(context.user)) {
    if (!account.budgetUnitId) throw new FinanceError("Somente o administrador pode classificar uma conta bancária sem Unidade Gestora.");
    assertBudgetUnitAccess(context.user, account.budgetUnitId);
  }
  if (nextBudgetUnitId) assertBudgetUnitAccess(context.user, nextBudgetUnitId);
}

export async function createBankAccount(data: {
  bankName: string;
  agency: string;
  accountNumber: string;
  accountType: string;
  currentBalance: number;
  resourceSourceId: string;
  budgetUnitId: string;
  isActive: boolean;
}) {
  const context = await getTenantPrisma();
  assertBudgetUnitAccess(context.user, data.budgetUnitId);
  const account = await createBankAccountWithOpeningBalance(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, {
    ...data,
    openingBalance: data.currentBalance,
  });

  revalidatePath("/financeiro/contas-bancarias");
  return account;
}

export async function updateBankAccount(id: string, data: {
  bankName?: string;
  agency?: string;
  accountNumber?: string;
  accountType?: string;
  currentBalance?: number;
  resourceSourceId?: string;
  budgetUnitId?: string;
  isActive?: boolean;
}) {
  const context = await getTenantPrisma();
  await assertAccountAccess(context, id, data.budgetUnitId);
  const account = await updateBankAccountDetails(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id, data);

  revalidatePath("/financeiro/contas-bancarias");
  return account;
}

export async function toggleBankAccountStatus(id: string, isActive: boolean) {
  const context = await getTenantPrisma();
  await assertAccountAccess(context, id);
  const account = await updateBankAccountDetails(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id, { isActive });

  revalidatePath("/financeiro/contas-bancarias");
  return account;
}
