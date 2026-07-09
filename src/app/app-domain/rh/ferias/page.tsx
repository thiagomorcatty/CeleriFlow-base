import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { 
  HeartPulse,
  Plus
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default async function FeriasPage() {
  const vacations = await prisma.vacation.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: { employee: true }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Férias e Licenças</h2>
        <div className="flex items-center space-x-2">
          <Link href="/rh/ferias/nova" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Programar Férias
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Férias</CardTitle>
          <CardDescription>
            Controle de períodos aquisitivos e concessivos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Servidor</th>
                  <th className="font-medium p-4">Período Aquisitivo</th>
                  <th className="font-medium p-4">Período de Gozo</th>
                  <th className="font-medium p-4">Dias</th>
                  <th className="font-medium p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {vacations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhum período de férias registrado.
                    </td>
                  </tr>
                ) : (
                  vacations.map((vac) => (
                    <tr key={vac.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-medium">{vac.employee?.name || "Desconhecido"}</td>
                      <td className="p-4 text-xs">
                        {format(new Date(vac.acquisitionStart), "dd/MM/yyyy", { locale: ptBR })} a <br/>
                        {format(new Date(vac.acquisitionEnd), "dd/MM/yyyy", { locale: ptBR })}
                      </td>
                      <td className="p-4 text-xs">
                        {vac.enjoymentStart ? format(new Date(vac.enjoymentStart), "dd/MM/yyyy") : "-"} a <br/>
                        {vac.enjoymentEnd ? format(new Date(vac.enjoymentEnd), "dd/MM/yyyy") : "-"}
                      </td>
                      <td className="p-4">{vac.days}</td>
                      <td className="p-4">
                        <Badge variant="outline">
                          {vac.status}
                        </Badge>
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
