import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { 
  Clock,
  Plus
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default async function PontoPage() {
  const records = await prisma.attendanceRecord.findMany({
    take: 15,
    orderBy: { date: 'desc' },
    include: { employee: true }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Controle de Ponto</h2>
        <div className="flex items-center space-x-2">
          <Link href="/rh/ponto/lote" className={buttonVariants({ variant: "outline" })}>
            Importar Relógio
          </Link>
          <Link href="/rh/ponto/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Lançamento Manual
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Espelho de Frequência</CardTitle>
          <CardDescription>
            Registros diários dos servidores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Data</th>
                  <th className="font-medium p-4">Servidor</th>
                  <th className="font-medium p-4">Entrada</th>
                  <th className="font-medium p-4">Saída</th>
                  <th className="font-medium p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhum registro de ponto encontrado.
                    </td>
                  </tr>
                ) : (
                  records.map((rec) => (
                    <tr key={rec.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-medium">
                        {format(new Date(rec.date), "dd/MM/yyyy", { locale: ptBR })}
                      </td>
                      <td className="p-4">{rec.employee?.name || "Servidor Removido"}</td>
                      <td className="p-4">
                        {rec.entryTime ? format(new Date(rec.entryTime), "HH:mm") : "-"}
                      </td>
                      <td className="p-4">
                        {rec.exitTime ? format(new Date(rec.exitTime), "HH:mm") : "-"}
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">
                          {rec.status}
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
