import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { buttonVariants } from "@/components/ui/button"
import { ClipboardList, Plus, Filter, Search } from "lucide-react"
import Link from "next/link"
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ProcessoRowActions } from "./ProcessoRowActions"

export default async function ProcessosComprasPage() {
  const { prisma } = await getTenantContextForModule("COMPRAS");
  const processos = await prisma.purchaseProcess.findMany({
    include: {
      secretariat: true,
      _count: {
        select: {
          preliminaryStudies: true,
          termsOfReference: true,
          contracts: true,
          items: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  }).catch(() => [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Processos de Compra</h2>
          <p className="text-muted-foreground">
            Gestão dos processos administrativos de contratação.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/compras/processos/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Processo
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Processos Administrativos</CardTitle>
            <CardDescription>
              Lista de todos os processos de compras e contratações.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Link href="#" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Link>
            <Link href="#" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {processos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <ClipboardList className="h-10 w-10 mb-4 opacity-20" />
              <p>Nenhum processo encontrado.</p>
              <p className="text-sm">Clique em "Novo Processo" para iniciar.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead>Modalidade</TableHead>
                    <TableHead>Valor Est.</TableHead>
                    <TableHead>Documentos</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processos.map((proc) => (
                    <TableRow key={proc.id}>
                      <TableCell className="font-medium">{proc.number}</TableCell>
                      <TableCell className="max-w-[300px] truncate" title={proc.object}>{proc.object}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{proc._count.items}</Badge>
                      </TableCell>
                      <TableCell>{proc.modality || proc.type}</TableCell>
                      <TableCell>
                        {proc.estimatedValue ? 
                          new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proc.estimatedValue) 
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 text-xs">
                          <Badge variant="outline" className={proc._count.preliminaryStudies > 0 ? "border-emerald-500 text-emerald-500" : ""}>
                            ETP
                          </Badge>
                          <Badge variant="outline" className={proc._count.termsOfReference > 0 ? "border-emerald-500 text-emerald-500" : ""}>
                            TR
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {proc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <ProcessoRowActions id={proc.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
