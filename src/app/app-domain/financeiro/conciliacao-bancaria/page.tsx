import { getTenantContextForModule, isSystemAdministrator } from "@/lib/platform/tenant-context";
import ConciliacaoBancariaClient from "./ConciliacaoBancariaClient";

export default async function ConciliacaoBancariaPage() {
  const context = await getTenantContextForModule("FINANCEIRO");
  const bankAccountWhere = isSystemAdministrator(context.user)
    ? {}
    : { budgetUnitId: { in: context.user.allowedBudgetUnitIds } };

  const [bankAccounts, imports, pendingItems, treasuryMovements] = await Promise.all([
    context.prisma.bankAccount.findMany({
      where: { ...bankAccountWhere, isActive: true },
      select: { id: true, bankName: true, agency: true, accountNumber: true },
      orderBy: [{ bankName: "asc" }, { accountNumber: "asc" }],
    }),
    context.prisma.bankStatementImport.findMany({
      where: { bankAccount: bankAccountWhere },
      select: {
        id: true,
        format: true,
        fileName: true,
        status: true,
        importedAt: true,
        bankAccount: { select: { bankName: true, agency: true, accountNumber: true } },
        _count: { select: { items: true } },
      },
      orderBy: { importedAt: "desc" },
      take: 20,
    }),
    context.prisma.bankStatementItem.findMany({
      where: { status: "Pendente", statementImport: { bankAccount: bankAccountWhere } },
      select: {
        id: true,
        date: true,
        description: true,
        reference: true,
        direction: true,
        valueDecimal: true,
        statementImport: {
          select: {
            fileName: true,
            bankAccountId: true,
            bankAccount: { select: { bankName: true, agency: true, accountNumber: true } },
          },
        },
      },
      orderBy: [{ date: "asc" }, { id: "asc" }],
      take: 100,
    }),
    context.prisma.treasuryMovement.findMany({
      where: {
        status: "Confirmado",
        bankAccount: bankAccountWhere,
        statementItems: { none: {} },
      },
      select: { id: true, bankAccountId: true, date: true, type: true, direction: true, valueDecimal: true, history: true },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      take: 300,
    }),
  ]);

  return (
    <ConciliacaoBancariaClient
      bankAccounts={bankAccounts}
      imports={imports.map((item) => ({
        ...item,
        importedAt: item.importedAt.toISOString(),
        itemCount: item._count.items,
      }))}
      pendingItems={pendingItems.map((item) => ({
        ...item,
        date: item.date.toISOString(),
        value: Number(item.valueDecimal),
      }))}
      treasuryMovements={treasuryMovements.map((movement) => ({
        ...movement,
        date: movement.date.toISOString(),
        value: Number(movement.valueDecimal),
      }))}
    />
  );
}
