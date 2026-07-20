import { getTenantContextForModule } from "@/lib/platform/tenant-context";
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

  return <ContasBancariasClient accounts={accounts} resourceSources={resourceSources} />
}
