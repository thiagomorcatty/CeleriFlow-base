import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Building2,
  Plus,
  Search,
  Filter
} from "lucide-react"
import Link from "next/link"
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function BensPatrimoniaisPage(
  props: { searchParams?: Promise<{ q?: string, status?: string }> }
) {
  const { prisma } = await getTenantContextForModule("PATRIMONIO");
  const searchParams = await props.searchParams;
  const q = searchParams?.q || "";
  const status = searchParams?.status || "";

  const where: any = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { patrimonyNumber: { contains: q, mode: 'insensitive' } }
    ];
  }
  if (status) {
    where.status = status;
  }

  const assets = await prisma.asset.findMany({
    where,
    take: 50,
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      department: true,
      responsible: true,
      realEstate: true
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Bens Patrimoniais</h2>
        <div className="flex items-center space-x-2">
          <Link href="/patrimonio/bens/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Tombar Novo Bem
          </Link>
          <Link href="/patrimonio/ciclo-vida" className={buttonVariants({ variant: "outline" })}>
            Ciclo de Vida
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Lista de Bens Permanentes</CardTitle>
          <CardDescription>
            Controle de móveis, equipamentos, veículos e vinculação com imóveis e secretarias.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-center gap-2 mb-4 bg-slate-50 p-3 rounded-lg border">
            <div className="flex-1 min-w-[300px]">
              <Input 
                name="q"
                defaultValue={q}
                placeholder="Buscar por nome do bem ou nº do tombamento..." 
                className="bg-white"
              />
            </div>
            <div className="w-[200px]">
              <select 
                name="status"
                defaultValue={status}
                className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Todos os Status</option>
                <option value="Ativo">Ativo</option>
                <option value="Em uso">Em uso</option>
                <option value="Ocioso">Ocioso</option>
                <option value="Em manutenção">Em manutenção</option>
                <option value="Baixado">Baixado</option>
              </select>
            </div>
            <button type="submit" className={buttonVariants()}>
              <Search className="h-4 w-4 mr-2" />
              Filtrar
            </button>
          </form>

          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4 whitespace-nowrap">Tombamento</th>
                  <th className="font-medium p-4 whitespace-nowrap">Descrição</th>
                  <th className="font-medium p-4 whitespace-nowrap">Categoria</th>
                  <th className="font-medium p-4 whitespace-nowrap">Imóvel (Localização Física)</th>
                  <th className="font-medium p-4 whitespace-nowrap">Setor / Responsável</th>
                  <th className="font-medium p-4 whitespace-nowrap">Status</th>
                  <th className="font-medium p-4 whitespace-nowrap">Valor Contábil</th>
                </tr>
              </thead>
              <tbody>
                {assets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-muted-foreground">
                      Nenhum bem patrimonial encontrado com os filtros atuais.
                    </td>
                  </tr>
                ) : (
                  assets.map((asset) => (
                    <tr key={asset.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-bold whitespace-nowrap text-amber-700">{asset.patrimonyNumber}</td>
                      <td className="p-4 font-medium min-w-[200px]">{asset.name}</td>
                      <td className="p-4 whitespace-nowrap">{asset.category?.name || "-"}</td>
                      <td className="p-4 text-xs text-muted-foreground min-w-[200px]">
                        {asset.realEstate ? (
                          <div className="flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-blue-500" />
                            {asset.realEstate.propertyType || "Imóvel"} - Inscrição: {asset.realEstate.municipalInsc || "-"}
                            <br/>
                            {asset.realEstate.streetName}, {asset.realEstate.number}
                          </div>
                        ) : (
                          <span className="text-slate-400">Não vinculado a imóvel</span>
                        )}
                      </td>
                      <td className="p-4 text-xs text-muted-foreground min-w-[200px]">
                        <strong>Setor:</strong> {asset.department?.name || "Não alocado"} <br/>
                        <strong>Resp:</strong> {asset.responsible?.name || "Sem responsável"}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <Badge variant={asset.status === "Ativo" || asset.status === "Em uso" ? "default" : asset.status === "Baixado" ? "destructive" : "secondary"}>
                          {asset.status}
                        </Badge>
                      </td>
                      <td className="p-4 whitespace-nowrap">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(asset.currentValue)}</td>
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
