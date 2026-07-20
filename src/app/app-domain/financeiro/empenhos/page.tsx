import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import EmpenhosClient from "./EmpenhosClient"

export default async function EmpenhosPage() {
  const { prisma } = await getTenantContextForModule("FINANCEIRO");
  const commitments = await prisma.commitment.findMany({
    include: {
      supplier: {
        include: {
          person: true,
          company: true
        }
      },
      appropriation: {
        include: {
          budgetUnit: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    },
    take: 50
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

  const appropriations = await prisma.budgetAppropriation.findMany({
    include: {
      budgetUnit: true
    }
  })

  return <EmpenhosClient commitments={commitments} suppliers={suppliers} appropriations={appropriations} />
}
