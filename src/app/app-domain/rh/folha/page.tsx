import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { FolhaRowActions } from "./FolhaRowActions"

export default async function FolhaPage() {
  const payrolls = await prisma.payroll.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Folha de Pagamento</h2>
        <div className="flex items-center space-x-2">
          <Link href="/rh/folha/eventos" className={buttonVariants({ variant: "outline" })}>
            Configurar Eventos
          </Link>
          <Link href="/rh/folha/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Folha
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listagem de Competências</CardTitle>
          <CardDescription>
            Gerencie as folhas mensais, férias, 13º e rescisões.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="font-medium p-2 px-4 whitespace-nowrap">Competência</th>
                  <th className="font-medium p-2 whitespace-nowrap">Tipo</th>
                  <th className="font-medium p-2 whitespace-nowrap">Valor Total</th>
                  <th className="font-medium p-2 whitespace-nowrap">Status</th>
                  <th className="font-medium p-2 px-4 text-right whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhuma folha cadastrada.
                    </td>
                  </tr>
                ) : (
                  payrolls.map((folha) => (
                    <tr key={folha.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-2 px-4 font-medium whitespace-nowrap">{folha.competence}</td>
                      <td className="p-2 whitespace-nowrap">{folha.type}</td>
                      <td className="p-2 whitespace-nowrap">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(folha.totalValue)}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <Badge variant={folha.status === "Paga" ? "default" : "secondary"} className={folha.status === "Paga" ? "bg-emerald-500" : ""}>
                          {folha.status}
                        </Badge>
                      </td>
                      <td className="p-2 px-4 text-right whitespace-nowrap">
                        <FolhaRowActions folha={folha} />
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
