import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { getBankAccountBalances } from "@/lib/financeiro";
import ContasBancariasClient from "./ContasBancariasClient"

export default async function ContasBancariasPage() {
  const { prisma } = await getTenantContextForModule("FINANCEIRO");
  const accounts = await prisma.bankAccount.findMany({
    include: {
      resourceSource: true
    },
    orderBy: {
      bankName: 'asc'
    }
  })

  const resourceSources = await prisma.resourceSource.findMany({
    orderBy: { name: 'asc' }
  })

  const balances = await getBankAccountBalances(prisma, accounts.map((account) => account.id));
  const displayAccounts = accounts.map(({ currentBalanceDecimal: _currentBalanceDecimal, ...account }) => ({
    ...account,
    currentBalance: Number(balances[account.id] ?? 0),
  }))

  return <ContasBancariasClient accounts={displayAccounts} resourceSources={resourceSources} />
}
