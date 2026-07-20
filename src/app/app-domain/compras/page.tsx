import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ShoppingCart, 
  FileText, 
  ClipboardList, 
  Scale,
  Gavel,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function ComprasDashboard() {
  const { prisma } = await getTenantContextForModule("COMPRAS");
  const totalRequests = await prisma.purchaseRequest.count().catch(() => 0)
  const totalProcesses = await prisma.purchaseProcess.count().catch(() => 0)
  const totalBiddings = await prisma.bidding.count().catch(() => 0)
  const totalContracts = await prisma.contract.count().catch(() => 0)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Compras e Contratos</h2>
        <div className="flex items-center space-x-2">
          <Link href="/compras/solicitacoes/novo" className={buttonVariants({ variant: "outline" })}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Nova Solicitação
          </Link>
          <Link href="/compras/processos/novo" className={buttonVariants()}>
            <FileText className="mr-2 h-4 w-4" />
            Novo Processo
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitações Abertas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              Pedidos aguardando processo
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processos em Andamento</CardTitle>
            <ClipboardList className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProcesses}</div>
            <p className="text-xs text-muted-foreground">
              Processos administrativos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licitações</CardTitle>
            <Gavel className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBiddings}</div>
            <p className="text-xs text-muted-foreground">
              Certames em andamento
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Vigentes</CardTitle>
            <Scale className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContracts}</div>
            <p className="text-xs text-muted-foreground">
              Contratos ativos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>
              Acesso rápido às rotinas do módulo de Compras e Contratos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/compras/solicitacoes" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <ShoppingCart className="h-6 w-6 mr-4 text-emerald-500" />
                <div>
                  <div className="font-semibold">Solicitações de Compra</div>
                  <div className="text-sm text-muted-foreground">Pedidos das secretarias</div>
                </div>
              </Link>
              <Link href="/compras/processos" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <ClipboardList className="h-6 w-6 mr-4 text-blue-500" />
                <div>
                  <div className="font-semibold">Processos de Compra</div>
                  <div className="text-sm text-muted-foreground">Gestão de ETP, TR e orçamentos</div>
                </div>
              </Link>
              <Link href="/compras/licitacoes" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Gavel className="h-6 w-6 mr-4 text-amber-500" />
                <div>
                  <div className="font-semibold">Licitações e Dispensas</div>
                  <div className="text-sm text-muted-foreground">Pregão, Concorrência, Dispensa</div>
                </div>
              </Link>
              <Link href="/compras/contratos" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Scale className="h-6 w-6 mr-4 text-indigo-500" />
                <div>
                  <div className="font-semibold">Gestão de Contratos</div>
                  <div className="text-sm text-muted-foreground">Contratos, Aditivos, Vigência</div>
                </div>
              </Link>
              <Link href="/compras/catalogo" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <FileText className="h-6 w-6 mr-4 text-slate-500" />
                <div>
                  <div className="font-semibold">Catálogo de Itens</div>
                  <div className="text-sm text-muted-foreground">Cadastro de materiais e serviços</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Últimas Movimentações</CardTitle>
            <CardDescription>
              Acompanhamento do ciclo de compras.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground">
                <Clock className="h-8 w-8 mb-4 opacity-20" />
                <p>Nenhum histórico recente encontrado.</p>
                <p className="text-sm">As movimentações de processos e contratos aparecerão aqui automaticamente.</p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
