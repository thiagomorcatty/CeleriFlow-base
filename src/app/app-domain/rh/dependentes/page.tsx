import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { DependenteRowActions } from "./DependenteRowActions"
import { format } from "date-fns"
import { DependenteFilters } from "./DependenteFilters"
import type { Prisma } from "@prisma/client";

export default async function DependentesPage(
  props: {
    searchParams?: Promise<{
      q?: string;
    }>
  }
) {
  const { prisma } = await getTenantContextForModule("RH");
  const searchParams = await props.searchParams;
  const q = searchParams?.q || "";

  const where: Prisma.DependentWhereInput = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { employee: { name: { contains: q, mode: 'insensitive' } } }
    ];
  }

  const dependents = await prisma.dependent.findMany({
    where,
    take: 100,
    orderBy: { createdAt: 'desc' },
    include: {
      employee: true
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dependentes</h2>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Lista de Dependentes</CardTitle>
          <CardDescription>
            Visualização geral de dependentes cadastrados. Exibindo {dependents.length} registros (limite de 100).
            <br />
            <strong>Nota:</strong> Novos dependentes devem ser cadastrados diretamente na ficha do Servidor (Editar Servidor).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DependenteFilters />

          <div className="rounded-md border overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="font-medium p-2 px-4 whitespace-nowrap">Servidor Responsável</th>
                  <th className="font-medium p-2 whitespace-nowrap">Dependente</th>
                  <th className="font-medium p-2 whitespace-nowrap">Parentesco</th>
                  <th className="font-medium p-2 whitespace-nowrap">Nascimento</th>
                  <th className="font-medium p-2 text-right whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody>
                {dependents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      Nenhum dependente encontrado.
                    </td>
                  </tr>
                ) : (
                  dependents.map((dep) => (
                    <tr key={dep.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-2 px-4 font-medium whitespace-nowrap">{dep.employee?.name}</td>
                      <td className="p-2 whitespace-nowrap">{dep.name}</td>
                      <td className="p-2 whitespace-nowrap">{dep.relationship}</td>
                      <td className="p-2 whitespace-nowrap">{dep.birthDate ? format(new Date(dep.birthDate), 'dd/MM/yyyy') : '-'}</td>
                      <td className="p-2 text-right whitespace-nowrap">
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
