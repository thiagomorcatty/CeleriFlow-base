import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function ContratoDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const { prisma } = await getTenantContextForModule("COMPRAS");
  const resolvedParams = await params;
  const contrato = await prisma.contract.findUnique({
    where: { id: resolvedParams.id },
    include: {
      process: true,
      supplier: { include: { company: true } },
      secretariat: true,
      manager: true,
      commitments: {
        where: { status: { in: ["Emitido", "Liquidado", "Pago"] } },
        select: {
          value: true,
          valueDecimal: true,
          movements: { select: { type: true, valueDecimal: true } },
          settlements: { where: { status: "Liquidado" }, select: { value: true, valueDecimal: true } },
          payments: { where: { status: "Paga" }, select: { value: true, valueDecimal: true } },
        },
      },
    }
  });

  if (!contrato) {
    notFound();
  }

  const contracted = contrato.updatedValue;
  const committed = contrato.commitments.reduce((total, commitment) => (
    total + commitment.movements.reduce(
      (value, movement) => value + (movement.type === "Reforço" ? Number(movement.valueDecimal) : -Number(movement.valueDecimal)),
      Number(commitment.valueDecimal ?? commitment.value),
    )
  ), 0);
  const settled = contrato.commitments.reduce((total, commitment) => (
    total + commitment.settlements.reduce((value, settlement) => value + Number(settlement.valueDecimal ?? settlement.value), 0)
  ), 0);
  const paid = contrato.commitments.reduce((total, commitment) => (
    total + commitment.payments.reduce((value, payment) => value + Number(payment.valueDecimal ?? payment.value), 0)
  ), 0);
  const formatMoney = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

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
              <p>{formatMoney(contrato.initialValue)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Valor Atualizado</p>
              <p>{formatMoney(contrato.updatedValue || contrato.initialValue)}</p>
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

          <div className="border-t pt-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Execução Financeira</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Contratado</p>
                <p>{formatMoney(contracted)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Empenhado</p>
                <p>{formatMoney(committed)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Liquidado</p>
                <p>{formatMoney(settled)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pago</p>
                <p>{formatMoney(paid)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo a Empenhar</p>
                <p>{formatMoney(contracted - committed)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo Contratual</p>
                <p>{formatMoney(contracted - paid)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
