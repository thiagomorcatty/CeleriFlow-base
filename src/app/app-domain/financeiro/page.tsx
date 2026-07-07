import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Landmark, 
  WalletCards, 
  ArrowUpCircle, 
  ArrowDownCircle,
  FileText,
  BadgeDollarSign,
  Receipt,
  Scale
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function FinanceiroDashboard() {
  // Mock data for counters since we don't have records yet
  const totalRevenues = await prisma.revenue.count().catch(() => 0)
  const totalExpenses = await prisma.expense.count().catch(() => 0)
  const totalCommitments = await prisma.commitment.count().catch(() => 0)
  const totalPayments = await prisma.payment.count().catch(() => 0)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Financeiro e Contábil</h2>
        <div className="flex items-center space-x-2">
          <Link href="/financeiro/contas-bancarias" className={buttonVariants({ variant: "outline" })}>
            <Landmark className="mr-2 h-4 w-4" />
            Contas Bancárias
          </Link>
          <Link href="/financeiro/empenhos/novo" className={buttonVariants()}>
            <BadgeDollarSign className="mr-2 h-4 w-4" />
            Novo Empenho
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenues}</div>
            <p className="text-xs text-muted-foreground">
              Receitas arrecadadas registradas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExpenses}</div>
            <p className="text-xs text-muted-foreground">
              Despesas solicitadas/reservadas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empenhos</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCommitments}</div>
            <p className="text-xs text-muted-foreground">
              Empenhos emitidos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos</CardTitle>
            <WalletCards className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPayments}</div>
            <p className="text-xs text-muted-foreground">
              Ordens de pagamento realizadas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>
              Acesso rápido aos submódulos financeiros e contábeis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/financeiro/empenhos" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <FileText className="h-6 w-6 mr-4 text-blue-500" />
                <div>
                  <div className="font-semibold">Gestão de Empenhos</div>
                  <div className="text-sm text-muted-foreground">Emitir e consultar empenhos</div>
                </div>
              </Link>
              <Link href="/financeiro/liquidacoes" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Receipt className="h-6 w-6 mr-4 text-indigo-500" />
                <div>
                  <div className="font-semibold">Liquidações</div>
                  <div className="text-sm text-muted-foreground">Atestar notas e serviços</div>
                </div>
              </Link>
              <Link href="/financeiro/pagamentos" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <WalletCards className="h-6 w-6 mr-4 text-amber-500" />
                <div>
                  <div className="font-semibold">Pagamentos</div>
                  <div className="text-sm text-muted-foreground">Ordens de pagamento</div>
                </div>
              </Link>
              <Link href="/financeiro/contas-bancarias" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Landmark className="h-6 w-6 mr-4 text-emerald-500" />
                <div>
                  <div className="font-semibold">Tesouraria</div>
                  <div className="text-sm text-muted-foreground">Contas e conciliação bancária</div>
                </div>
              </Link>
              <Link href="/financeiro/orcamento" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Scale className="h-6 w-6 mr-4 text-slate-500" />
                <div>
                  <div className="font-semibold">Orçamento e Plano de Contas</div>
                  <div className="text-sm text-muted-foreground">Dotações e natureza de despesa</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas movimentações financeiras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground">
                <BadgeDollarSign className="h-8 w-8 mb-4 opacity-20" />
                <p>Nenhuma movimentação financeira recente encontrada.</p>
                <p className="text-sm">Os lançamentos aparecerão aqui automaticamente.</p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
