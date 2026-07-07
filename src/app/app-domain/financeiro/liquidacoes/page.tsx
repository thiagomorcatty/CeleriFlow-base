import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Plus, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"

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

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Liquidações</h2>
          <p className="text-muted-foreground">
            Ateste de notas fiscais e recebimento de serviços
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/financeiro/liquidacoes/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Liquidação
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listagem de Liquidações</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por empenho..." className="pl-8 w-[250px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Empenho Ref.</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Documento (NF/Recibo)</TableHead>
                <TableHead>Responsável (Ateste)</TableHead>
                <TableHead>Valor (R$)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {settlements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground h-32">
                    Nenhuma liquidação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                settlements.map((settlement) => (
                  <TableRow key={settlement.id}>
                    <TableCell>{format(new Date(settlement.date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell className="font-medium">{settlement.commitment.number}</TableCell>
                    <TableCell>
                      {settlement.commitment.supplier.company?.corporateName || settlement.commitment.supplier.person?.fullName || 'Não identificado'}
                    </TableCell>
                    <TableCell>{settlement.documentRef || '-'}</TableCell>
                    <TableCell>{settlement.author.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(settlement.value)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        settlement.status === 'Liquidado' ? 'default' : 
                        settlement.status === 'Cancelado' ? 'destructive' : 
                        'secondary'
                      }>
                        {settlement.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/financeiro/liquidacoes/${settlement.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                        Detalhes
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
