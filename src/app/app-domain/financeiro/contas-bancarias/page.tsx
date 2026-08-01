import { getTenantContextForModule, isSystemAdministrator } from "@/lib/platform/tenant-context";
import { getBankAccountBalances } from "@/lib/financeiro";
import ContasBancariasClient from "./ContasBancariasClient"

export default async function ContasBancariasPage() {
  const context = await getTenantContextForModule("FINANCEIRO");
  const { prisma } = context;
  const accounts = await prisma.bankAccount.findMany({
    where: isSystemAdministrator(context.user) ? {} : { budgetUnitId: { in: context.user.allowedBudgetUnitIds } },
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

  return <ContasBancariasClient accounts={displayAccounts} resourceSources={resourceSources} budgetUnits={budgetUnits} />
}
