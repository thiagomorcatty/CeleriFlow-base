import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { 
  Building2,
  Plus
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function BensPatrimoniaisPage() {
  const assets = await prisma.asset.findMany({
    take: 15,
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      department: true,
      responsible: true
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
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Bens Permanentes</CardTitle>
          <CardDescription>
            Controle de móveis, imóveis, equipamentos e veículos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Tombamento</th>
                  <th className="font-medium p-4">Descrição</th>
                  <th className="font-medium p-4">Categoria</th>
                  <th className="font-medium p-4">Localização / Responsável</th>
                  <th className="font-medium p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {assets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhum bem patrimonial tombado.
                    </td>
                  </tr>
                ) : (
                  assets.map((asset) => (
                    <tr key={asset.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-bold">{asset.patrimonyNumber}</td>
                      <td className="p-4 font-medium">{asset.name}</td>
                      <td className="p-4">{asset.category?.name || "-"}</td>
                      <td className="p-4 text-xs text-muted-foreground">
                        Local: {asset.department?.name || "Não alocado"} <br/>
                        Resp: {asset.responsible?.name || "Sem responsável"}
                      </td>
                      <td className="p-4">
                        <Badge variant={asset.status === "Ativo" ? "default" : "secondary"}>
                          {asset.status}
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
