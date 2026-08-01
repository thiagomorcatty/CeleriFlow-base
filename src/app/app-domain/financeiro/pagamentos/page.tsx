import { getTenantContextForModule, isSystemAdministrator } from "@/lib/platform/tenant-context";
import PagamentosClient from "./PagamentosClient"

export default async function PagamentosPage() {
  const context = await getTenantContextForModule("FINANCEIRO");
  const { prisma } = context;
  const appropriationFilter = isSystemAdministrator(context.user)
    ? {}
    : { budgetUnitId: { in: context.user.allowedBudgetUnitIds } };
  const payments = await prisma.payment.findMany({
    where: { commitment: { appropriation: appropriationFilter } },
    include: {
      commitment: true,
      settlement: { select: { id: true, documentRef: true, valueDecimal: true, value: true } },
      bankAccount: true,
      retentions: { select: { valueDecimal: true } },
      supplier: {
        include: {
          person: true,
          company: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    },
    take: 50
  })

  const commitments = await prisma.commitment.findMany({
    where: {
      status: { in: ["Emitido", "Liquidado", "Pago"] }
      , appropriation: appropriationFilter
    },
    include: { movements: { select: { type: true, valueDecimal: true } } },
  })

  const settlements = await prisma.settlement.findMany({
    where: { status: "Liquidado", commitment: { appropriation: appropriationFilter } },
    select: {
      id: true,
      commitmentId: true,
      documentRef: true,
      value: true,
      valueDecimal: true,
      payments: { where: { status: { in: ["Emitida", "Paga"] } }, select: { value: true, valueDecimal: true } },
    },
    orderBy: { date: "desc" },
  });

  const bankAccounts = await prisma.bankAccount.findMany({
    where: {
      isActive: true
    }
  })

  const suppliers = await prisma.supplier.findMany({
    include: {
      person: true,
      company: true
    },
    where: {
      status: "Ativo"
    }
  })

  const retentionRules = await prisma.retentionRule.findMany({
    where: {
      isActive: true,
      effectiveFrom: { lte: new Date() },
      OR: [{ effectiveTo: null }, { effectiveTo: { gte: new Date() } }],
    },
    select: {
      id: true,
      code: true,
      type: true,
      description: true,
      calculationBasePercentage: true,
      ratePercentage: true,
      serviceCode: true,
    },
    orderBy: { code: "asc" },
  });

  const displayPayments = payments.map(({ valueDecimal, netValueDecimal, retentions, commitment, bankAccount, ...payment }) => {
    const { valueDecimal: commitmentValueDecimal, ...displayCommitment } = commitment
    const { currentBalanceDecimal, ...displayBankAccount } = bankAccount

    return {
      ...payment,
      value: Number(valueDecimal ?? payment.value),
      netValue: Number(netValueDecimal ?? valueDecimal ?? payment.value),
      retentionValue: retentions.reduce((total, retention) => total + Number(retention.valueDecimal), 0),
      commitment: {
        ...displayCommitment,
        value: Number(commitmentValueDecimal ?? displayCommitment.value),
      },
      bankAccount: {
        ...displayBankAccount,
        currentBalance: Number(currentBalanceDecimal ?? displayBankAccount.currentBalance),
      },
    }
  })

  const displayCommitments = commitments.map(({ valueDecimal, movements, ...commitment }) => ({
    ...commitment,
    value: movements.reduce((total, movement) => total + (movement.type === "Reforço" ? Number(movement.valueDecimal) : -Number(movement.valueDecimal)), Number(valueDecimal ?? commitment.value)),
  }))

  const displaySettlements = settlements.map(({ valueDecimal, payments, ...settlement }) => {
    const value = Number(valueDecimal ?? settlement.value);
    const paidValue = payments.reduce((total, payment) => total + Number(payment.valueDecimal ?? payment.value), 0);
    return { ...settlement, value, paidValue, availableToPay: value - paidValue };
  });

  const displayBankAccounts = bankAccounts.map(({ currentBalanceDecimal, ...account }) => ({
    ...account,
    currentBalance: Number(currentBalanceDecimal ?? account.currentBalance),
  }))

  const displayRetentionRules = retentionRules.map((rule) => ({
    ...rule,
    calculationBasePercentage: Number(rule.calculationBasePercentage),
    ratePercentage: Number(rule.ratePercentage),
  }));

  return <PagamentosClient payments={displayPayments} commitments={displayCommitments} settlements={displaySettlements} bankAccounts={displayBankAccounts} suppliers={suppliers} retentionRules={displayRetentionRules} />
}
