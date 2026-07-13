import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function DispensaDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const dispensa = await prisma.directContracting.findUnique({
    where: { id: resolvedParams.id },
    include: {
      process: true,
      supplier: { include: { company: true } }
    }
  });

  if (!dispensa) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/compras/licitacoes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Detalhes da Dispensa</h2>
        <div className="flex-1 flex justify-end">
          <Link href={`/compras/dispensas/${dispensa.id}/editar`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" /> Editar
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tipo</p>
              <p className="text-lg">{dispensa.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge>{dispensa.status}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Processo Vinculado</p>
              <p>{dispensa.process?.number || "Nenhum"}</p>
              <p className="text-sm text-muted-foreground">{dispensa.process?.object}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fornecedor e Justificativa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fornecedor</p>
              <p>{dispensa.supplier ? (dispensa.supplier.company?.legalName || dispensa.supplier.company?.tradeName) : "A Definir"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Justificativa Legal</p>
              <p className="text-sm whitespace-pre-wrap">{dispensa.justification || "Não informada"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
