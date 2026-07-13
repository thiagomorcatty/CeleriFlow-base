import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { buttonVariants } from "@/components/ui/button"
import { ShoppingCart, Plus, Filter, Search, FileText } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { SolicitacaoRowActions } from "./SolicitacaoRowActions"

export default async function SolicitacoesPage() {
  const solicitacoes = await prisma.purchaseRequest.findMany({
    include: {
      secretariat: true,
      department: true,
      requester: true,
      _count: {
        select: { items: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  }).catch(() => [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Solicitações de Compra</h2>
          <p className="text-muted-foreground">
            Gestão dos pedidos de materiais e serviços das secretarias.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/compras/solicitacoes/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Solicitação
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Solicitações Registradas</CardTitle>
            <CardDescription>
              Lista de todas as solicitações de compra abertas no sistema.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Link href="#" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Link>
            <Link href="#" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {solicitacoes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <ShoppingCart className="h-10 w-10 mb-4 opacity-20" />
              <p>Nenhuma solicitação encontrada.</p>
              <p className="text-sm">Clique em "Nova Solicitação" para criar um pedido.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead>Secretaria</TableHead>
                    <TableHead>Valor Est.</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {solicitacoes.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.number}</TableCell>
                      <TableCell className="max-w-[300px] truncate" title={req.object}>{req.object}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{req._count.items}</Badge>
                      </TableCell>
                      <TableCell>{req.secretariat?.acronym || req.secretariat?.name}</TableCell>
                      <TableCell>
                        {req.estimatedValue ? 
                          new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(req.estimatedValue) 
                          : '-'}
                      </TableCell>
                      <TableCell>{format(new Date(req.createdAt), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                      <TableCell>
                        <Badge variant={req.status === 'Rascunho' ? 'secondary' : req.status === 'Aprovada' ? 'default' : 'outline'}>
                          {req.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <SolicitacaoRowActions id={req.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
