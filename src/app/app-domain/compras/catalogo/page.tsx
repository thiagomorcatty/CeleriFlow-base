import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { buttonVariants } from "@/components/ui/button"
import { FileText, Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function CatalogoPage() {
  const items = await prisma.catalogItem.findMany({
    orderBy: { createdAt: 'desc' }
  }).catch(() => [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Catálogo de Itens</h2>
          <p className="text-muted-foreground">
            Gerenciamento de produtos, materiais e serviços cadastrados para compras.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="#" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Item
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Itens Cadastrados</CardTitle>
            <CardDescription>
              Lista de todos os itens disponíveis no catálogo.
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
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <FileText className="h-10 w-10 mb-4 opacity-20" />
              <p>Nenhum item encontrado.</p>
              <p className="text-sm">Clique em "Novo Item" para adicionar ao catálogo.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nome / Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>Valor Est.</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.code || '-'}</TableCell>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[300px]" title={item.description || ''}>
                          {item.description || 'Sem descrição'}
                        </div>
                      </TableCell>
                      <TableCell>{item.category || '-'}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>
                        {item.estimatedValue ? 
                          new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.estimatedValue) 
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.isActive ? 'default' : 'secondary'}>
                          {item.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
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
