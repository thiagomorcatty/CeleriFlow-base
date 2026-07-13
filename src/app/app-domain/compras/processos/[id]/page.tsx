import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function ProcessoDetalhesPage({ params }: { params: { id: string } }) {
  const processo = await prisma.purchaseProcess.findUnique({
    where: { id: params.id },
    include: {
      secretariat: true,
      items: {
        include: { catalogItem: true }
      }
    }
  });

  if (!processo) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/compras/processos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Detalhes do Processo</h2>
        <div className="flex-1" />
        <Link href={`/compras/processos/${processo.id}/editar`}>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Editar
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Número</p>
              <p className="text-lg">{processo.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant="secondary">{processo.status}</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Objeto</p>
            <p>{processo.object}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 border-t pt-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tipo</p>
              <p>{processo.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Modalidade</p>
              <p>{processo.modality}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Secretaria</p>
              <p>{processo.secretariat?.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Itens do Processo ({processo.items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full text-sm divide-y">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Item / Serviço</th>
                  <th className="px-4 py-2 text-left">Quant.</th>
                  <th className="px-4 py-2 text-left">Valor Unit.</th>
                  <th className="px-4 py-2 text-left">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {processo.items.map((item) => {
                  const name = item.catalogItem ? item.catalogItem.name : item.customName;
                  const unitVal = item.estimatedUnitValue || 0;
                  const subtotal = item.quantity * unitVal;
                  return (
                    <tr key={item.id}>
                      <td className="px-4 py-2">{name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(unitVal)}</td>
                      <td className="px-4 py-2">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <p className="text-lg font-bold">Total Estimado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(processo.estimatedValue || 0)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
