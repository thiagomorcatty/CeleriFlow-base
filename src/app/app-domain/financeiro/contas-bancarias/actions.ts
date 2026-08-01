"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { createBankAccountWithOpeningBalance, updateBankAccountDetails } from "@/lib/financeiro";
import { revalidatePath } from "next/cache";

async function getTenantPrisma() {
  return getTenantContextForModuleEdit("FINANCEIRO");
}

export async function createBankAccount(data: {
  bankName: string;
  agency: string;
  accountNumber: string;
  accountType: string;
  currentBalance: number;
  resourceSourceId?: string;
  isActive: boolean;
}) {
  const context = await getTenantPrisma();
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
  isActive?: boolean;
}) {
  const context = await getTenantPrisma();
  const account = await updateBankAccountDetails(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id, data);

  revalidatePath("/financeiro/contas-bancarias");
  return account;
}

export async function toggleBankAccountStatus(id: string, isActive: boolean) {
  const context = await getTenantPrisma();
  const account = await updateBankAccountDetails(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, id, { isActive });

  revalidatePath("/financeiro/contas-bancarias");
  return account;
}
