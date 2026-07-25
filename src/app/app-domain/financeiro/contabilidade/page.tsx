import { accountingTrialBalance } from "@/lib/financeiro";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import ContabilidadeClient from "./ContabilidadeClient";

export const dynamic = "force-dynamic";

export default async function ContabilidadePage() {
  const { prisma } = await getTenantContextForModule("FINANCEIRO");
  const [years, accounts, transactions] = await Promise.all([
    prisma.financialYear.findMany({ orderBy: { year: "desc" } }),
    prisma.accountingPlan.findMany({ orderBy: { code: "asc" } }),
    prisma.accountingTransaction.findMany({ include: { entries: { include: { account: true } } }, orderBy: { date: "desc" }, take: 20 }),
  ]);
  const activeYear = years.find((year) => year.status === "Aberto") ?? years[0];
  const trialBalance = activeYear ? await accountingTrialBalance(prisma, activeYear.id) : [];
  return <ContabilidadeClient years={years.map((year) => ({ id: year.id, year: year.year, status: year.status }))} accounts={accounts.map((account) => ({ id: account.id, code: account.code, name: account.name }))} transactions={transactions.map((transaction) => ({ id: transaction.id, date: transaction.date.toISOString(), history: transaction.history, status: transaction.status, entries: transaction.entries.map((entry) => ({ id: entry.id, type: entry.type, value: entry.valueDecimal?.toString() ?? String(entry.value), account: `${entry.account.code} - ${entry.account.name}` })) }))} trialBalance={trialBalance.map((row) => ({ account: `${row.account.code} - ${row.account.name}`, debit: row.debit.toString(), credit: row.credit.toString(), balance: row.balance.toString() }))} />;
}
