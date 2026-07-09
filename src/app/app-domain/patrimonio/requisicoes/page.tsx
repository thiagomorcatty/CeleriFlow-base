import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { 
  ShoppingCart,
  Plus
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default async function RequisicoesPage() {
  const requests = await prisma.materialRequest.findMany({
    take: 15,
    orderBy: { date: 'desc' },
    include: {
      department: true,
      requester: true,
      items: true
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Requisições Internas</h2>
        <div className="flex items-center space-x-2">
          <Link href="/patrimonio/requisicoes/nova" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Requisição
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos de Materiais</CardTitle>
          <CardDescription>
            Solicitações feitas pelas secretarias e departamentos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Número</th>
                  <th className="font-medium p-4">Data</th>
                  <th className="font-medium p-4">Setor Solicitante</th>
                  <th className="font-medium p-4">Itens</th>
                  <th className="font-medium p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhuma requisição de material encontrada.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-bold">{req.number}</td>
                      <td className="p-4 text-muted-foreground">
                        {format(new Date(req.date), "dd/MM/yyyy", { locale: ptBR })}
                      </td>
                      <td className="p-4 text-xs">
                        {req.department?.name || "Desconhecido"} <br/>
                        <span className="text-muted-foreground">Por: {req.requester?.name || "-"}</span>
                      </td>
                      <td className="p-4">{req.items.length} item(s)</td>
                      <td className="p-4">
                        <Badge variant={req.status === "Pendente" ? "secondary" : "default"}
                               className={req.status === "Atendida" ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                          {req.status}
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
