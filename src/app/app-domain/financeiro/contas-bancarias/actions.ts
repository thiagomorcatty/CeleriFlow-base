"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBankAccount(data: {
  bankName: string;
  agency: string;
  accountNumber: string;
  accountType: string;
  currentBalance: number;
  resourceSourceId?: string;
  isActive: boolean;
}) {
  const account = await prisma.bankAccount.create({
    data: {
      bankName: data.bankName,
      agency: data.agency,
      accountNumber: data.accountNumber,
      accountType: data.accountType,
      currentBalance: data.currentBalance,
      resourceSourceId: data.resourceSourceId || undefined,
      isActive: data.isActive
    }
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
  const account = await prisma.bankAccount.update({
    where: { id },
    data: {
      bankName: data.bankName,
      agency: data.agency,
      accountNumber: data.accountNumber,
      accountType: data.accountType,
      currentBalance: data.currentBalance,
      resourceSourceId: data.resourceSourceId || undefined,
      isActive: data.isActive
    }
  });

  revalidatePath("/financeiro/contas-bancarias");
  return account;
}

export async function toggleBankAccountStatus(id: string, isActive: boolean) {
  const account = await prisma.bankAccount.update({
    where: { id },
    data: { isActive }
  });

  revalidatePath("/financeiro/contas-bancarias");
  return account;
}
