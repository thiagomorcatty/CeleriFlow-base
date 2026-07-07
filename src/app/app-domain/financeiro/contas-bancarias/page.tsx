import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Plus, Search, Landmark } from "lucide-react"
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

export default async function ContasBancariasPage() {
  const accounts = await prisma.bankAccount.findMany({
    include: {
      resourceSource: true
    },
    orderBy: {
      bankName: 'asc'
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contas Bancárias</h2>
          <p className="text-muted-foreground">
            Gestão da tesouraria e contas do município
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/financeiro/contas-bancarias/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Conta
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Listagem de Contas</CardTitle>
              <CardDescription>
                Contas bancárias ativas e seus saldos atuais.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por banco ou agência..." className="pl-8 w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banco</TableHead>
                <TableHead>Agência / Conta</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fonte de Recurso</TableHead>
                <TableHead>Saldo Atual (R$)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground h-32">
                    <div className="flex flex-col items-center justify-center">
                      <Landmark className="h-8 w-8 mb-2 opacity-20" />
                      Nenhuma conta bancária cadastrada.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                accounts.map((account: any) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.bankName}</TableCell>
                    <TableCell>{account.agency} / {account.accountNumber}</TableCell>
                    <TableCell>{account.accountType}</TableCell>
                    <TableCell>{account.resourceSource?.name || 'Não vinculada'}</TableCell>
                    <TableCell className={account.currentBalance < 0 ? "text-rose-500 font-medium" : "text-emerald-500 font-medium"}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(account.currentBalance)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={account.isActive ? 'default' : 'secondary'}>
                        {account.isActive ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/financeiro/contas-bancarias/${account.id}/extrato`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                        Ver Extrato
                      </Link>
                      <Link href={`/financeiro/contas-bancarias/${account.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                        Editar
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
