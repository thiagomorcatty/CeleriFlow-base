import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { buttonVariants } from "@/components/ui/button"
import { Gavel, Plus, Filter, Search } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { LicitacaoRowActions } from "./LicitacaoRowActions"
import { DispensaRowActions } from "../dispensas/DispensaRowActions"

export default async function LicitacoesPage() {
  const biddings = await prisma.bidding.findMany({
    include: {
      process: true
    },
    orderBy: { createdAt: 'desc' }
  }).catch(() => [])

  const directContractings = await prisma.directContracting.findMany({
    include: {
      process: true,
      supplier: true
    },
    orderBy: { createdAt: 'desc' }
  }).catch(() => [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Licitações e Dispensas</h2>
          <p className="text-muted-foreground">
            Acompanhamento de pregões, concorrências e contratações diretas.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/compras/dispensas/novo" className={buttonVariants({ variant: "outline" })}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Dispensa
          </Link>
          <Link href="/compras/licitacoes/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Licitação
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Certames Abertos</CardTitle>
            <CardDescription>
              Licitações e dispensas em andamento.
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
          {biddings.length === 0 && directContractings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <Gavel className="h-10 w-10 mb-4 opacity-20" />
              <p>Nenhuma licitação encontrada.</p>
              <p className="text-sm">Clique em "Nova Licitação" para cadastrar um certame.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número/Processo</TableHead>
                    <TableHead>Modalidade</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Sessão</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {biddings.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell className="font-medium">
                        {bid.number}
                        <div className="text-xs text-muted-foreground">Proc: {bid.process?.number}</div>
                      </TableCell>
                      <TableCell>{bid.modality}</TableCell>
                      <TableCell className="max-w-[300px] truncate" title={bid.process?.object}>{bid.process?.object}</TableCell>
                      <TableCell>
                        {bid.sessionDate ? format(new Date(bid.sessionDate), "dd/MM/yyyy HH:mm", { locale: ptBR }) : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {bid.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <LicitacaoRowActions id={bid.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {directContractings.map((dc) => (
                    <TableRow key={dc.id}>
                      <TableCell className="font-medium">
                        (Direta)
                        <div className="text-xs text-muted-foreground">Proc: {dc.process?.number}</div>
                      </TableCell>
                      <TableCell>{dc.type}</TableCell>
                      <TableCell className="max-w-[300px] truncate" title={dc.process?.object}>{dc.process?.object}</TableCell>
                      <TableCell>
                        (Sem Sessão)
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {dc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DispensaRowActions id={dc.id} />
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
