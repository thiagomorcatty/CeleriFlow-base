import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Building2, 
  PackageSearch, 
  Package, 
  ShoppingCart, 
  Wrench,
  Tags,
  QrCode,
  ArrowRightLeft
} from "lucide-react"
import Link from "next/link"
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function PatrimonioDashboard() {
  const { prisma } = await getTenantContextForModule("PATRIMONIO");
  const totalAssets = await prisma.asset.count().catch(() => 0)
  const activeAssets = await prisma.asset.count({ where: { status: "Ativo" } }).catch(() => 0)
  const totalWarehouses = await prisma.warehouse.count().catch(() => 0)
  const totalMaterials = await prisma.material.count().catch(() => 0)
  const pendingRequests = await prisma.materialRequest.count({ where: { status: "Pendente" } }).catch(() => 0)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Patrimônio e Almoxarifado</h2>
        <div className="flex items-center space-x-2">
          <Link href="/patrimonio/bens/novo" className={buttonVariants({ variant: "outline" })}>
            <QrCode className="mr-2 h-4 w-4" />
            Tombar Bem
          </Link>
          <Link href="/patrimonio/materiais/entrada" className={buttonVariants()}>
            <Package className="mr-2 h-4 w-4" />
            Entrada de Estoque
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bens Ativos</CardTitle>
            <Building2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAssets}</div>
            <p className="text-xs text-muted-foreground">
              de {totalAssets} tombados no total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materiais em Catálogo</CardTitle>
            <Tags className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMaterials}</div>
            <p className="text-xs text-muted-foreground">
              Itens disponíveis para almoxarifado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requisições Pendentes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando separação e entrega
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Almoxarifados</CardTitle>
            <PackageSearch className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWarehouses}</div>
            <p className="text-xs text-muted-foreground">
              Centros de distribuição físicos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Acesso Rápido</CardTitle>
            <CardDescription>
              Gestão de bens permanentes e materiais de consumo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/patrimonio/bens" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Building2 className="h-6 w-6 mr-4 text-emerald-500" />
                <div>
                  <div className="font-semibold">Bens Permanentes</div>
                  <div className="text-sm text-muted-foreground">Móveis, imóveis e equipamentos</div>
                </div>
              </Link>
              <Link href="/patrimonio/almoxarifados" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <PackageSearch className="h-6 w-6 mr-4 text-indigo-500" />
                <div>
                  <div className="font-semibold">Almoxarifados</div>
                  <div className="text-sm text-muted-foreground">Gestão dos estoques físicos</div>
                </div>
              </Link>
              <Link href="/patrimonio/materiais" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Package className="h-6 w-6 mr-4 text-blue-500" />
                <div>
                  <div className="font-semibold">Materiais e Estoque</div>
                  <div className="text-sm text-muted-foreground">Catálogo e movimentações</div>
                </div>
              </Link>
              <Link href="/patrimonio/requisicoes" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <ShoppingCart className="h-6 w-6 mr-4 text-amber-500" />
                <div>
                  <div className="font-semibold">Requisições Internas</div>
                  <div className="text-sm text-muted-foreground">Pedidos das secretarias</div>
                </div>
              </Link>
              <Link href="/patrimonio/manutencao" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <Wrench className="h-6 w-6 mr-4 text-orange-500" />
                <div>
                  <div className="font-semibold">Manutenção e Baixa</div>
                  <div className="text-sm text-muted-foreground">Defeitos, doações e descartes</div>
                </div>
              </Link>
              <Link href="/patrimonio/transferencias" className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors">
                <ArrowRightLeft className="h-6 w-6 mr-4 text-purple-500" />
                <div>
                  <div className="font-semibold">Transferências</div>
                  <div className="text-sm text-muted-foreground">Entre setores e responsáveis</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Últimas Movimentações</CardTitle>
            <CardDescription>
              Tombamentos e entradas recentes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground">
                <Package className="h-8 w-8 mb-4 opacity-20" />
                <p>Nenhuma movimentação recente encontrada.</p>
                <p className="text-sm">As transferências e tombamentos aparecerão aqui.</p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
