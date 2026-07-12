import { prisma } from "@/lib/prisma"
import PagamentosClient from "./PagamentosClient"

export default async function PagamentosPage() {
  const payments = await prisma.payment.findMany({
    include: {
      commitment: true,
      bankAccount: true,
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
      status: { in: ["Emitido", "Liquidado"] }
    }
  })

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

  return <PagamentosClient payments={payments} commitments={commitments} bankAccounts={bankAccounts} suppliers={suppliers} />
}
