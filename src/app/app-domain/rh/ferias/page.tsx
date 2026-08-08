import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { FeriasRowActions } from "./FeriasRowActions"
import { format } from "date-fns"
import { FeriasFilters } from "./FeriasFilters"
import type { Prisma } from "@prisma/client";

export default async function FeriasPage({ searchParams }: { searchParams: Promise<{ q?: string, status?: string }> }) {
  const { prisma } = await getTenantContextForModule("RH");
  const { q, status } = await searchParams;

  const whereClause: Prisma.VacationWhereInput = {};
  if (q) {
    whereClause.employee = { name: { contains: q, mode: 'insensitive' } };
  }
  if (status && status !== 'all') {
    whereClause.status = status;
  }

  const vacations = await prisma.vacation.findMany({
    where: whereClause,
    take: 20,
    orderBy: { createdAt: 'desc' },
    include: {
      employee: true
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Férias</h2>
        <div className="flex items-center space-x-2">
          <Link href="/rh/ferias/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Programar Férias
          </Link>
        </div>
      </div>

      <FeriasFilters />

      <Card>
        <CardHeader>
          <CardTitle>Programação e Controle de Férias</CardTitle>
          <CardDescription>
            Gerencie os períodos aquisitivos e de gozo dos servidores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="font-medium p-2 px-4 whitespace-nowrap">Servidor</th>
                  <th className="font-medium p-2 whitespace-nowrap">Período Aquisitivo</th>
                  <th className="font-medium p-2 whitespace-nowrap">Gozo Programado</th>
                  <th className="font-medium p-2 whitespace-nowrap">Dias</th>
                  <th className="font-medium p-2 whitespace-nowrap">Status</th>
                  <th className="font-medium p-2 px-4 text-right whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody>
                {vacations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-muted-foreground">
                      Nenhuma programação de férias encontrada.
                    </td>
                  </tr>
                ) : (
                  vacations.map((vac) => (
                    <tr key={vac.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-2 px-4 font-medium whitespace-nowrap">{vac.employee?.name}</td>
                      <td className="p-2 text-muted-foreground whitespace-nowrap">
                        {format(new Date(vac.acquisitionStart), 'dd/MM/yyyy')} a <br />
                        {format(new Date(vac.acquisitionEnd), 'dd/MM/yyyy')}
                      </td>
                      <td className="p-2 text-muted-foreground whitespace-nowrap">
                        {vac.enjoymentStart ? (
                          <>
                            {format(new Date(vac.enjoymentStart), 'dd/MM/yyyy')} a <br />
                            {vac.enjoymentEnd ? format(new Date(vac.enjoymentEnd), 'dd/MM/yyyy') : '-'}
                          </>
                        ) : (
                          "A Definir"
                        )}
                      </td>
                      <td className="p-2 whitespace-nowrap">{vac.days}</td>
                      <td className="p-2 whitespace-nowrap">
                        <Badge variant="outline" className={
                          vac.status === 'Concluída' ? "bg-slate-100 text-slate-500" :
                          vac.status === 'Em gozo' ? "bg-blue-100 text-blue-700 border-blue-200" :
                          vac.status === 'Programada' ? "bg-emerald-100 text-emerald-700 border-emerald-200" : ""
                        }>
                          {vac.status}
                        </Badge>
                      </td>
                      <td className="p-2 px-4 text-right whitespace-nowrap">
                        <FeriasRowActions vacation={vac} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
