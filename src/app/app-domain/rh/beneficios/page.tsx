import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { BeneficioRowActions } from "./BeneficioRowActions"

export default async function BeneficiosPage() {
  const benefits = await prisma.payrollBenefit.findMany({
    take: 20,
    orderBy: { type: 'asc' },
    include: {
      employee: true
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Benefícios</h2>
        <div className="flex items-center space-x-2">
          <Link href="/rh/beneficios/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Conceder Benefício
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Controle de Benefícios</CardTitle>
          <CardDescription>
            Gerencie vale-transporte, vale-refeição, auxílio-creche, planos de saúde e outros benefícios concedidos aos servidores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Servidor Titular</th>
                  <th className="font-medium p-4">Tipo de Benefício</th>
                  <th className="font-medium p-4">Valor</th>
                  <th className="font-medium p-4">Status</th>
                  <th className="font-medium p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {benefits.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhum benefício concedido.
                    </td>
                  </tr>
                ) : (
                  benefits.map((ben) => (
                    <tr key={ben.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-medium">{ben.employee?.name}</td>
                      <td className="p-4">{ben.type}</td>
                      <td className="p-4">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ben.value)}
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={
                          ben.status === 'Ativo' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          ben.status === 'Suspenso' ? "bg-orange-100 text-orange-700 border-orange-200" :
                          ben.status === 'Cancelado' ? "bg-red-100 text-red-700 border-red-200" : ""
                        }>
                          {ben.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <BeneficioRowActions beneficio={ben} />
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
