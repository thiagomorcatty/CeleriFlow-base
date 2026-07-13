import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function ContratoDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const contrato = await prisma.contract.findUnique({
    where: { id: resolvedParams.id },
    include: {
      process: true,
      supplier: { include: { company: true } },
      secretariat: true,
      manager: true
    }
  });

  if (!contrato) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/compras/contratos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Detalhes do Contrato</h2>
        <div className="flex-1" />
        <Link href={`/compras/contratos/${contrato.id}/editar`}>
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
              <p className="text-sm font-medium text-muted-foreground">Número do Contrato</p>
              <p className="text-lg">{contrato.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant="secondary">{contrato.status}</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Objeto</p>
            <p>{contrato.object}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Valor Inicial</p>
              <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.initialValue)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Valor Atualizado</p>
              <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.updatedValue || contrato.initialValue)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Início</p>
              <p>{format(new Date(contrato.startDate), "dd/MM/yyyy", { locale: ptBR })}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Fim</p>
              <p>{format(new Date(contrato.endDate), "dd/MM/yyyy", { locale: ptBR })}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fornecedor</p>
              <p>{contrato.supplier?.company?.corporateName || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Processo Vinculado</p>
              <p>{contrato.process?.number || "Não informado"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
