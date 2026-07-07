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

export default async function PagamentosPage() {
  const payments = await prisma.payment.findMany({
    include: {
      commitment: true,
      bankAccount: true,
      supplier: {
        include: {
          person: true,
          company: true
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
          <h2 className="text-3xl font-bold tracking-tight">Pagamentos</h2>
          <p className="text-muted-foreground">
            Ordens de pagamento e execução financeira
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/financeiro/pagamentos/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Ordem de Pagamento
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listagem de Pagamentos</CardTitle>
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
                <TableHead>Ordem</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Empenho Ref.</TableHead>
                <TableHead>Conta Bancária</TableHead>
                <TableHead>Forma Pgto.</TableHead>
                <TableHead>Valor (R$)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground h-32">
                    Nenhum pagamento encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.orderNumber}</TableCell>
                    <TableCell>{format(new Date(payment.date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      {payment.supplier.company?.corporateName || payment.supplier.person?.fullName || 'Não identificado'}
                    </TableCell>
                    <TableCell>{payment.commitment.number}</TableCell>
                    <TableCell>
                      {payment.bankAccount.bankName} - Ag: {payment.bankAccount.agency} Cc: {payment.bankAccount.accountNumber}
                    </TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.value)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        payment.status === 'Pago' ? 'default' : 
                        payment.status === 'Cancelado' ? 'destructive' : 
                        'secondary'
                      }>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/financeiro/pagamentos/${payment.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
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
