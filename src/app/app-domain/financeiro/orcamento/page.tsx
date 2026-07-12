import { prisma } from "@/lib/prisma"
import OrcamentoClient from "./OrcamentoClient"

export const dynamic = 'force-dynamic'

export default async function OrcamentoPage() {
  const appropriations = await prisma.budgetAppropriation.findMany({
    include: {
      budgetUnit: true,
      expenseNature: true,
      resourceSource: true,
    },
    orderBy: { code: "asc" }
  });

  return (
    <OrcamentoClient appropriations={appropriations} />
  )
}
