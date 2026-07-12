"use server"

import { prisma } from "@/lib/prisma"

export async function getFinanceiroDashboardStats(month: string, year: string) {
  let dateFilter = {}
  
  if (month && year) {
    const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1)
    const endOfMonth = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59, 999)
    dateFilter = {
      date: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    }
  } else if (year) {
    const startOfYear = new Date(parseInt(year), 0, 1)
    const endOfYear = new Date(parseInt(year), 11, 31, 23, 59, 59, 999)
    dateFilter = {
      date: {
        gte: startOfYear,
        lte: endOfYear
      }
    }
  } else if (month) {
    // If only month is provided, assume current year
    const currentYear = new Date().getFullYear()
    const startOfMonth = new Date(currentYear, parseInt(month) - 1, 1)
    const endOfMonth = new Date(currentYear, parseInt(month), 0, 23, 59, 59, 999)
    dateFilter = {
      date: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    }
  }

  const revenues = await prisma.revenue.aggregate({
    _sum: { value: true },
    where: dateFilter
  })

  const expenses = await prisma.expense.aggregate({
    _sum: { value: true },
    where: dateFilter
  })

  const totalReceita = revenues._sum.value || 0
  const totalDespesa = expenses._sum.value || 0
  const resultadoOperacional = totalReceita - totalDespesa

  return {
    totalReceita,
    totalDespesa,
    resultadoOperacional
  }
}
