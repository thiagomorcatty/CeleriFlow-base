import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Plus, FileText, Search, Filter } from "lucide-react"
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

export default async function EmpenhosPage() {
  const commitments = await prisma.commitment.findMany({
    include: {
      supplier: {
        include: {
          person: true,
          company: true
        }
      },
      appropriation: {
        include: {
          budgetUnit: true
        }
      }
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
          <h2 className="text-3xl font-bold tracking-tight">Empenhos</h2>
          <p className="text-muted-foreground">
            Gestão de empenhos da execução orçamentária
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/financeiro/empenhos/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Empenho
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listagem de Empenhos</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por fornecedor..." className="pl-8 w-[250px]" />
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
                <TableHead>Número</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Fornecedor/Credor</TableHead>
                <TableHead>Unidade Orçamentária</TableHead>
                <TableHead>Valor (R$)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commitments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground h-32">
                    Nenhum empenho encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                commitments.map((commitment) => (
                  <TableRow key={commitment.id}>
                    <TableCell className="font-medium">{commitment.number}</TableCell>
                    <TableCell>{format(new Date(commitment.date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      {commitment.supplier.company?.corporateName || commitment.supplier.person?.fullName || 'Não identificado'}
                    </TableCell>
                    <TableCell>{commitment.appropriation.budgetUnit.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(commitment.value)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        commitment.status === 'Pago' ? 'default' : 
                        commitment.status === 'Anulado' ? 'destructive' : 
                        'secondary'
                      }>
                        {commitment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/financeiro/empenhos/${commitment.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
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
