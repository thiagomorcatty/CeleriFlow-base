import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Package,
  Plus,
  Search
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function MateriaisPage(
  props: { searchParams?: Promise<{ q?: string }> }
) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q || "";

  const where: any = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { code: { contains: q, mode: 'insensitive' } }
    ];
  }

  const materials = await prisma.material.findMany({
    where,
    take: 50,
    orderBy: { name: 'asc' },
    include: {
      category: true,
      stocks: {
        include: {
          warehouse: true
        }
      }
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Materiais e Estoque</h2>
        <div className="flex items-center space-x-2">
          <Link href="/patrimonio/materiais/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Material
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Catálogo de Materiais</CardTitle>
          <CardDescription>
            Itens de consumo, EPIs, peças e controle de saldo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-center gap-2 mb-4 bg-slate-50 p-3 rounded-lg border">
            <div className="flex-1 min-w-[300px]">
              <Input 
                name="q"
                defaultValue={q}
                placeholder="Buscar por código ou descrição do material..." 
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
                  <th className="font-medium p-4 whitespace-nowrap">Código</th>
                  <th className="font-medium p-4 whitespace-nowrap">Descrição</th>
                  <th className="font-medium p-4 whitespace-nowrap">Categoria</th>
                  <th className="font-medium p-4 whitespace-nowrap">UN</th>
                  <th className="font-medium p-4 whitespace-nowrap">Saldo Atual</th>
                </tr>
              </thead>
              <tbody>
                {materials.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhum material encontrado com os filtros atuais.
                    </td>
                  </tr>
                ) : (
                  materials.map((mat) => {
                    const totalStock = mat.stocks.reduce((acc, stock) => acc + stock.quantity, 0)
                    const isLowStock = totalStock <= mat.minStock
                    
                    return (
                      <tr key={mat.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-bold text-slate-700 whitespace-nowrap">{mat.code}</td>
                        <td className="p-4 font-medium min-w-[200px]">{mat.name}</td>
                        <td className="p-4 whitespace-nowrap">{mat.category?.name || "-"}</td>
                        <td className="p-4 whitespace-nowrap">{mat.unitOfMeasure}</td>
                        <td className="p-4 whitespace-nowrap">
                          <Badge variant={isLowStock && totalStock > 0 ? "secondary" : (totalStock === 0 ? "destructive" : "default")}
                                 className={!isLowStock && totalStock > 0 ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                            {totalStock.toLocaleString()} {mat.unitOfMeasure}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
