import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { DependenteRowActions } from "./DependenteRowActions"
import { format } from "date-fns"

export default async function DependentesPage() {
  const dependents = await prisma.dependent.findMany({
    take: 20,
    orderBy: { name: 'asc' },
    include: {
      employee: true
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dependentes</h2>
        <div className="flex items-center space-x-2">
          <Link href="/rh/dependentes/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Cadastrar Dependente
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relação de Dependentes</CardTitle>
          <CardDescription>
            Controle de dependentes dos servidores para fins de imposto de renda, salário-família e benefícios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="font-medium p-4">Servidor Titular</th>
                  <th className="font-medium p-4">Nome do Dependente</th>
                  <th className="font-medium p-4">Parentesco</th>
                  <th className="font-medium p-4">Data Nasc.</th>
                  <th className="font-medium p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {dependents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhum dependente cadastrado.
                    </td>
                  </tr>
                ) : (
                  dependents.map((dep) => (
                    <tr key={dep.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4 font-medium">{dep.employee?.name}</td>
                      <td className="p-4">{dep.name}</td>
                      <td className="p-4">{dep.relationship}</td>
                      <td className="p-4">{dep.birthDate ? format(new Date(dep.birthDate), 'dd/MM/yyyy') : '-'}</td>
                      <td className="p-4 text-right">
                        <DependenteRowActions dependent={dep} />
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
