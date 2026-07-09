import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { 
  Banknote,
  Plus,
  Play
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function FolhaPage() {
  const payrolls = await prisma.payroll.findMany({
    take: 12,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Folha de Pagamento</h2>
        <div className="flex items-center space-x-2">
          <Link href="/rh/folha/nova" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Competência
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Folhas</CardTitle>
          <CardDescription>
            Gerenciamento e cálculo de competências.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Competência</th>
                  <th className="font-medium p-4">Tipo</th>
                  <th className="font-medium p-4">Valor Total</th>
                  <th className="font-medium p-4">Status</th>
                  <th className="font-medium p-4 text-right">Ações</th>
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
                  payrolls.map((payroll) => (
                    <tr key={payroll.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-bold">{payroll.competence}</td>
                      <td className="p-4">{payroll.type}</td>
                      <td className="p-4 text-muted-foreground">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payroll.totalValue)}
                      </td>
                      <td className="p-4">
                        <Badge variant={payroll.status === "Aberta" ? "secondary" : "default"}>
                          {payroll.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        {payroll.status === "Aberta" && (
                          <Link href={`/rh/folha/calcular/${payroll.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                            <Play className="h-4 w-4 mr-1 text-emerald-500" />
                            Calcular
                          </Link>
                        )}
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
