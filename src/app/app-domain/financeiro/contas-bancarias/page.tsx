import { getTenantContextForModule, isSystemAdministrator } from "@/lib/platform/tenant-context";
import { getBankAccountBalances } from "@/lib/financeiro";
import ContasBancariasClient from "./ContasBancariasClient"
import TreasuryTransferSection from "./TreasuryTransferSection";

export default async function ContasBancariasPage() {
  const context = await getTenantContextForModule("FINANCEIRO");
  const { prisma } = context;
  const accounts = await prisma.bankAccount.findMany({
    where: {
      bankName: "001 - Banco Virtual Robonuvem",
      isActive: true,
      ...(isSystemAdministrator(context.user) ? {} : { budgetUnitId: { in: context.user.allowedBudgetUnitIds } }),
    },
    include: {
      resourceSource: true,
      budgetUnit: true,
    },
    orderBy: {
      bankName: 'asc'
    }
  })

  const resourceSources = await prisma.resourceSource.findMany({
    orderBy: { name: 'asc' }
  })

  const balances = await getBankAccountBalances(prisma, accounts.map((account) => account.id));
  const displayAccounts = accounts.map((account) => ({
    ...account,
    currentBalance: Number(balances[account.id] ?? 0),
  }))

  const budgetUnits = await prisma.budgetUnit.findMany({
    where: isSystemAdministrator(context.user) ? {} : { id: { in: context.user.allowedBudgetUnitIds } },
    orderBy: { code: "asc" },
  });
  const accountingPlans = await prisma.accountingPlan.findMany({
    orderBy: { code: "asc" },
    select: { id: true, code: true, name: true },
  });

  const transferAccountAccess = isSystemAdministrator(context.user) ? {} : { budgetUnitId: { in: context.user.allowedBudgetUnitIds } };
  const transfers = await prisma.treasuryTransfer.findMany({
    where: {
      AND: [
        { sourceBankAccount: transferAccountAccess },
        { destinationBankAccount: transferAccountAccess },
      ],
    },
    include: {
      sourceBankAccount: { select: { id: true, bankName: true, agency: true, accountNumber: true, isActive: true } },
      destinationBankAccount: { select: { id: true, bankName: true, agency: true, accountNumber: true, isActive: true } },
    },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    take: 20,
  });

  return (
    <>
      <ContasBancariasClient accounts={displayAccounts} resourceSources={resourceSources} budgetUnits={budgetUnits} accountingPlans={accountingPlans} />
      <div className="px-8 pb-8">
        <TreasuryTransferSection
          accounts={displayAccounts.map(({ id, bankName, agency, accountNumber, isActive }) => ({ id, bankName, agency, accountNumber, isActive }))}
          transfers={transfers.map((transfer) => ({
            id: transfer.id,
            date: transfer.date.toISOString(),
            value: Number(transfer.valueDecimal),
            history: transfer.history,
            sourceBankAccount: transfer.sourceBankAccount,
            destinationBankAccount: transfer.destinationBankAccount,
          }))}
        />
      </div>
    </>
  );
}
