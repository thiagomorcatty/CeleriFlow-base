import { prisma } from "@/lib/prisma"
import LiquidacoesClient from "./LiquidacoesClient"

export default async function LiquidacoesPage() {
  const settlements = await prisma.settlement.findMany({
    include: {
      commitment: {
        include: {
          supplier: {
            include: {
              person: true,
              company: true
            }
          }
        }
      },
      author: true
    },
    orderBy: {
      date: 'desc'
    },
    take: 50
  })

  const commitments = await prisma.commitment.findMany({
    where: {
      status: "Emitido"
    },
    include: {
      supplier: {
        include: {
          person: true,
          company: true
        }
      }
    }
  })

  const employees = await prisma.employee.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      name: 'asc'
    }
  })

  return <LiquidacoesClient settlements={settlements} commitments={commitments} employees={employees} />
}
