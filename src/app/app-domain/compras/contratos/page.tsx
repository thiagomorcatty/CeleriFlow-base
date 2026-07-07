import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { buttonVariants } from "@/components/ui/button"
import { Scale, Plus, Filter, Search } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default async function ContratosPage() {
  const contratos = await prisma.contract.findMany({
    include: {
      supplier: {
        include: {
          person: true,
          company: true
        }
      },
      secretariat: true,
      _count: {
        select: {
          amendments: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  }).catch(() => [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Contratos</h2>
          <p className="text-muted-foreground">
            Acompanhamento de contratos vigentes, aditivos e saldos.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/compras/contratos/novo" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Contrato
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Contratos Administrativos</CardTitle>
            <CardDescription>
              Lista de todos os contratos registrados no sistema.
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
          {contratos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <Scale className="h-10 w-10 mb-4 opacity-20" />
              <p>Nenhum contrato encontrado.</p>
              <p className="text-sm">Clique em "Novo Contrato" para registrar um contrato.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Vigência</TableHead>
                    <TableHead>Valor Atualizado</TableHead>
                    <TableHead>Aditivos</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contratos.map((cont) => {
                    const supplierName = cont.supplier?.company?.tradeName 
                                         || cont.supplier?.company?.corporateName 
                                         || cont.supplier?.person?.fullName 
                                         || "Não informado";
                    
                    return (
                      <TableRow key={cont.id}>
                        <TableCell className="font-medium">{cont.number}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={supplierName}>{supplierName}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={cont.object}>{cont.object}</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>Início: {format(new Date(cont.startDate), "dd/MM/yyyy")}</div>
                            <div>Fim: {format(new Date(cont.endDate), "dd/MM/yyyy")}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cont.updatedValue)}
                        </TableCell>
                        <TableCell>
                          {cont._count.amendments > 0 ? (
                            <Badge variant="outline" className="border-indigo-500 text-indigo-500">
                              {cont._count.amendments}
                            </Badge>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={cont.status === 'Vigente' ? 'default' : 'secondary'}>
                            {cont.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/compras/contratos/${cont.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                            Detalhes
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
