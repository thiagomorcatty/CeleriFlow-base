import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  PackageSearch,
  Plus,
  Search
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AlmoxarifadosPage(
  props: { searchParams?: Promise<{ q?: string }> }
) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || "";

  const where: any = {};
  if (q) {
    where.name = { contains: q, mode: 'insensitive' };
  }

  const warehouses = await prisma.warehouse.findMany({
    where,
    orderBy: { name: 'asc' },
    include: {
      manager: true
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Almoxarifados</h2>
        <div className="flex items-center space-x-2">
          <Link href="/patrimonio/almoxarifados/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Almoxarifado
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Centros de Distribuição</CardTitle>
          <CardDescription>
            Gestão dos depósitos físicos e locais de armazenamento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-center gap-2 mb-4 bg-slate-50 p-3 rounded-lg border">
            <div className="flex-1 min-w-[300px]">
              <Input 
                name="q"
                defaultValue={q}
                placeholder="Buscar por nome do almoxarifado..." 
                className="bg-white"
              />
            </div>
            <button type="submit" className={buttonVariants()}>
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </button>
          </form>

          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4 whitespace-nowrap">Nome</th>
                  <th className="font-medium p-4 whitespace-nowrap">Tipo</th>
                  <th className="font-medium p-4 whitespace-nowrap">Gerente Responsável</th>
                  <th className="font-medium p-4 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-8 text-muted-foreground">
                      Nenhum almoxarifado encontrado.
                    </td>
                  </tr>
                ) : (
                  warehouses.map((warehouse) => (
                    <tr key={warehouse.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-bold whitespace-nowrap text-indigo-700">{warehouse.name}</td>
                      <td className="p-4 whitespace-nowrap">{warehouse.type}</td>
                      <td className="p-4 text-muted-foreground whitespace-nowrap">
                        {warehouse.manager?.name || "Sem responsável definido"}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <Badge variant={warehouse.isActive ? "default" : "secondary"}>
                          {warehouse.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>
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
