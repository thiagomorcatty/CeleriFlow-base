import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function EventosPage() {
  const events = await prisma.payrollEvent.findMany({
    orderBy: { code: 'asc' }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/rh/folha">
          <button className={buttonVariants({ variant: "outline", size: "icon" })}>
            <ArrowLeft className="h-4 w-4" />
          </button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Eventos da Folha</h2>
      </div>

      <div className="flex justify-end mb-4">
        <Link href="/rh/folha/eventos/novo" className={buttonVariants()}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuração de Rubricas/Eventos</CardTitle>
          <CardDescription>
            Gerencie proventos, descontos e bases de cálculo para a folha de pagamento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Código</th>
                  <th className="font-medium p-4">Descrição</th>
                  <th className="font-medium p-4">Tipo</th>
                  <th className="font-medium p-4">Fórmula Base</th>
                  <th className="font-medium p-4">Status</th>
                  <th className="font-medium p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-muted-foreground">
                      Nenhum evento configurado.
                    </td>
                  </tr>
                ) : (
                  events.map((ev) => (
                    <tr key={ev.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-medium font-mono">{ev.code}</td>
                      <td className="p-4 font-medium">{ev.name}</td>
                      <td className="p-4">
                        <Badge variant="outline" className={
                          ev.type === 'Vencimento' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          ev.type === 'Desconto' ? "bg-red-100 text-red-700 border-red-200" :
                          "bg-slate-100 text-slate-700 border-slate-200"
                        }>
                          {ev.type}
                        </Badge>
                      </td>
                      <td className="p-4 font-mono text-xs">{ev.formula || "-"}</td>
                      <td className="p-4">
                        <Badge variant={ev.isActive ? "default" : "secondary"}>
                          {ev.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/rh/folha/eventos/${ev.id}/editar`} className="text-blue-600 hover:underline">
                          Editar
                        </Link>
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
