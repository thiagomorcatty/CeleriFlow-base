import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Plus, ExternalLink } from "lucide-react"
import Link from "next/link"
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { AtoRowActions } from "./AtoRowActions"
import { format } from "date-fns"
import { AtosFilters } from "./AtosFilters"
import type { Prisma } from "@prisma/client";

export default async function AtosPage({ searchParams }: { searchParams: Promise<{ q?: string, type?: string }> }) {
  const { prisma } = await getTenantContextForModule("RH");
  const { q, type } = await searchParams;

  const whereClause: Prisma.PersonnelActWhereInput = {};
  if (q) {
    whereClause.employee = { name: { contains: q, mode: 'insensitive' } };
  }
  if (type && type !== 'all') {
    whereClause.type = type;
  }

  const acts = await prisma.personnelAct.findMany({
    where: whereClause,
    take: 20,
    orderBy: { date: 'desc' },
    include: {
      employee: true
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Atos de Pessoal</h2>
        <div className="flex items-center space-x-2">
          <Link href="/rh/atos/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Registrar Ato
          </Link>
        </div>
      </div>

      <AtosFilters />

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Assentamentos Funcionais</CardTitle>
          <CardDescription>
            Registro de admissões, demissões, promoções, transferências e atos disciplinares.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground border-b sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="font-medium p-2 px-4 whitespace-nowrap">Data</th>
                  <th className="font-medium p-2 whitespace-nowrap">Servidor</th>
                  <th className="font-medium p-2 whitespace-nowrap">Tipo do Ato</th>
                  <th className="font-medium p-2 whitespace-nowrap">Número do Ato</th>
                  <th className="font-medium p-2 whitespace-nowrap">Doc</th>
                  <th className="font-medium p-2 px-4 text-right whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody>
                {acts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-muted-foreground">
                      Nenhum ato de pessoal registrado.
                    </td>
                  </tr>
                ) : (
                  acts.map((ato) => (
                    <tr key={ato.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-2 px-4 whitespace-nowrap">{format(new Date(ato.date), 'dd/MM/yyyy')}</td>
                      <td className="p-2 font-medium whitespace-nowrap">{ato.employee?.name}</td>
                      <td className="p-2 whitespace-nowrap">
                        <Badge variant="outline" className={
                          ato.type === 'Admissão' ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          ato.type === 'Demissão' ? "bg-red-100 text-red-700 border-red-200" :
                          ato.type === 'Promoção' ? "bg-blue-100 text-blue-700 border-blue-200" :
                          ato.type === 'Advertência' ? "bg-orange-100 text-orange-700 border-orange-200" : ""
                        }>
                          {ato.type}
                        </Badge>
                      </td>
                      <td className="p-2 truncate max-w-[200px] whitespace-nowrap" title={ato.actNumber || ""}>
                        {ato.actNumber || "-"}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {ato.documentUrl ? (
                          <a href={ato.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="Ver Documento">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-2 px-4 text-right whitespace-nowrap">
                        <AtoRowActions ato={ato} />
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
