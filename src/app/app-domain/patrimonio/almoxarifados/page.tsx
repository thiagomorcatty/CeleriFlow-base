import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { 
  PackageSearch,
  Plus
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function AlmoxarifadosPage() {
  const warehouses = await prisma.warehouse.findMany({
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
        <CardHeader>
          <CardTitle>Centros de Distribuição</CardTitle>
          <CardDescription>
            Gestão dos depósitos físicos e locais de armazenamento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Nome</th>
                  <th className="font-medium p-4">Tipo</th>
                  <th className="font-medium p-4">Gerente Responsável</th>
                  <th className="font-medium p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-8 text-muted-foreground">
                      Nenhum almoxarifado cadastrado.
                    </td>
                  </tr>
                ) : (
                  warehouses.map((warehouse) => (
                    <tr key={warehouse.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-bold">{warehouse.name}</td>
                      <td className="p-4">{warehouse.type}</td>
                      <td className="p-4 text-muted-foreground">
                        {warehouse.manager?.name || "Sem responsável definido"}
                      </td>
                      <td className="p-4">
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
