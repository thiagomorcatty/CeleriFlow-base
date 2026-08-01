import { canEditModule, getTenantContextForModule, isSystemAdministrator } from "@/lib/platform/tenant-context";
import { getBudgetAvailability } from "@/lib/financeiro";
import OrcamentoClient from "./OrcamentoClient"

export const dynamic = 'force-dynamic'

export default async function OrcamentoPage() {
  const context = await getTenantContextForModule("FINANCEIRO");
  const { prisma } = context;
  const budgetUnitFilter = isSystemAdministrator(context.user)
    ? {}
    : { budgetUnitId: { in: context.user.allowedBudgetUnitIds } };
  const [appropriations, reservations, financialYears, creditRequests] = await Promise.all([
    prisma.budgetAppropriation.findMany({
      where: budgetUnitFilter,
      include: {
        budgetUnit: true,
        expenseNature: true,
        resourceSource: true,
      },
      orderBy: { code: "asc" }
    }),
    prisma.budgetReservation.findMany({
      where: { appropriation: budgetUnitFilter },
      include: { appropriation: { select: { code: true } } },
      orderBy: { date: "desc" },
      take: 50,
    }),
    prisma.financialYear.findMany({ orderBy: { year: "desc" } }),
    prisma.creditRequest.findMany({
      where: isSystemAdministrator(context.user)
        ? {}
        : { items: { every: { appropriation: budgetUnitFilter } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  const availability = await Promise.all(appropriations.map(async appropriation => ({
    id: appropriation.id,
    ...(await getBudgetAvailability(prisma, appropriation.id)),
  })));
  const availabilityById = new Map(availability.map(item => [item.id, item]));

  const displayAppropriations = appropriations.map(({ initialValueDecimal, updatedValueDecimal, committedValueDecimal, ...appropriation }) => ({
    ...appropriation,
    initialValue: Number(initialValueDecimal ?? appropriation.initialValue),
    updatedValue: Number(updatedValueDecimal ?? appropriation.updatedValue),
    committedValue: Number(committedValueDecimal ?? appropriation.committedValue),
    reservedValue: Number(availabilityById.get(appropriation.id)?.reserved ?? 0),
    availableValue: Number(availabilityById.get(appropriation.id)?.available ?? 0),
  }));

  const displayReservations = reservations.map(({ valueDecimal, ...reservation }) => ({ ...reservation, value: Number(valueDecimal ?? reservation.value) }));
  const displayCreditRequests = creditRequests.map(({ totalValue, ...creditRequest }) => ({
    ...creditRequest,
    totalValue: Number(totalValue),
  }));

  return (
    <OrcamentoClient
      appropriations={displayAppropriations}
      reservations={displayReservations}
      financialYears={financialYears}
      creditRequests={displayCreditRequests}
      canEdit={canEditModule(context.user, "FINANCEIRO")}
    />
  )
}
