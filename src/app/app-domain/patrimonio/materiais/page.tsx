import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { 
  Package,
  Plus
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function MateriaisPage() {
  const materials = await prisma.material.findMany({
    take: 15,
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
        <CardHeader>
          <CardTitle>Catálogo de Materiais</CardTitle>
          <CardDescription>
            Itens de consumo, EPIs, peças e controle de saldo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Código</th>
                  <th className="font-medium p-4">Descrição</th>
                  <th className="font-medium p-4">Categoria</th>
                  <th className="font-medium p-4">UN</th>
                  <th className="font-medium p-4">Saldo Atual</th>
                </tr>
              </thead>
              <tbody>
                {materials.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhum material cadastrado.
                    </td>
                  </tr>
                ) : (
                  materials.map((mat) => {
                    const totalStock = mat.stocks.reduce((acc, stock) => acc + stock.quantity, 0)
                    const isLowStock = totalStock <= mat.minStock
                    
                    return (
                      <tr key={mat.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="p-4 font-bold">{mat.code}</td>
                        <td className="p-4 font-medium">{mat.name}</td>
                        <td className="p-4">{mat.category?.name || "-"}</td>
                        <td className="p-4">{mat.unitOfMeasure}</td>
                        <td className="p-4">
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
