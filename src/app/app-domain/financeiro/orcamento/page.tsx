import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { getBudgetAvailability } from "@/lib/financeiro";
import OrcamentoClient from "./OrcamentoClient"

export const dynamic = 'force-dynamic'

export default async function OrcamentoPage() {
  const { prisma } = await getTenantContextForModule("FINANCEIRO");
  const [appropriations, reservations, financialYears] = await Promise.all([
    prisma.budgetAppropriation.findMany({
    include: {
      budgetUnit: true,
      expenseNature: true,
      resourceSource: true,
    },
    orderBy: { code: "asc" }
    }),
    prisma.budgetReservation.findMany({
      include: { appropriation: { select: { code: true } } },
      orderBy: { date: "desc" },
      take: 50,
    }),
    prisma.financialYear.findMany({ orderBy: { year: "desc" } }),
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

  return (
    <OrcamentoClient appropriations={displayAppropriations} reservations={displayReservations} financialYears={financialYears} />
  )
}
