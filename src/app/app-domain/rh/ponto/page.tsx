import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { PontoRowActions } from "./PontoRowActions"
import { format } from "date-fns"
import { PontoFilters } from "./PontoFilters"
import { UploadCSVButton } from "./UploadCSVButton"
import type { Prisma } from "@prisma/client";

export default async function PontoPage({ searchParams }: { searchParams: Promise<{ q?: string, month?: string }> }) {
  const { prisma } = await getTenantContextForModule("RH");
  const { q, month } = await searchParams;

  const whereClause: Prisma.AttendanceRecordWhereInput = {};
  if (q) {
    whereClause.employee = { name: { contains: q, mode: 'insensitive' } };
  }
  
  if (month) {
    // month is in format "yyyy-MM"
    const [year, m] = month.split('-');
    const startDate = new Date(parseInt(year), parseInt(m) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(m), 0); // Last day of month
    
    whereClause.date = {
      gte: startDate,
      lte: endDate,
    };
  }

  const records = await prisma.attendanceRecord.findMany({
    where: whereClause,
    take: 50,
    orderBy: { date: 'desc' },
    include: {
      employee: true
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Registro de Ponto</h2>
        <div className="flex items-center space-x-2">
          <UploadCSVButton />
          <Link href="/rh/ponto/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Apontamento Manual
          </Link>
        </div>
      </div>

      <PontoFilters />

      <Card>
        <CardHeader>
          <CardTitle>Espelho de Ponto</CardTitle>
          <CardDescription>
            Controle de frequência, assiduidade e banco de horas dos servidores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="font-medium p-2 px-4 whitespace-nowrap">Data</th>
                  <th className="font-medium p-2 whitespace-nowrap">Servidor</th>
                  <th className="font-medium p-2 whitespace-nowrap">Entrada/Saída</th>
                  <th className="font-medium p-2 whitespace-nowrap">Horas Dia</th>
                  <th className="font-medium p-2 whitespace-nowrap">Horas Extras</th>
                  <th className="font-medium p-2 whitespace-nowrap">Banco Horas</th>
                  <th className="font-medium p-2 whitespace-nowrap">Status</th>
                  <th className="font-medium p-2 px-4 text-right whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-muted-foreground">
                      Nenhum registro de ponto encontrado.
                    </td>
                  </tr>
                ) : (
                  records.map((rec) => (
                    <tr key={rec.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-2 px-4 font-medium whitespace-nowrap">{format(new Date(rec.date), 'dd/MM/yyyy')}</td>
                      <td className="p-2 font-medium whitespace-nowrap">{rec.employee?.name}</td>
                      <td className="p-2 whitespace-nowrap">
                        {rec.entryTime ? format(new Date(rec.entryTime), 'HH:mm') : '-'} / {rec.exitTime ? format(new Date(rec.exitTime), 'HH:mm') : '-'}
                      </td>
                      <td className="p-2 font-semibold whitespace-nowrap">{rec.hoursWorked.toFixed(2)}h</td>
                      <td className="p-2 text-emerald-600 whitespace-nowrap">{rec.extraHours ? `${rec.extraHours.toFixed(2)}h` : '-'}</td>
                      <td className="p-2 text-blue-600 whitespace-nowrap">{rec.bankHours ? `${rec.bankHours.toFixed(2)}h` : '-'}</td>
                      <td className="p-2 whitespace-nowrap">
                        <Badge variant="outline" className={
                          rec.status === 'Presente' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          rec.status === 'Falta' ? "bg-red-100 text-red-700 border-red-200" :
                          rec.status === 'Atraso' ? "bg-orange-100 text-orange-700 border-orange-200" : ""
                        }>
                          {rec.status}
                        </Badge>
                      </td>
                      <td className="p-2 px-4 text-right whitespace-nowrap">
                        <PontoRowActions record={rec} />
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
