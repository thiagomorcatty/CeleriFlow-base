import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function LicitacaoDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const licitacao = await prisma.bidding.findUnique({
    where: { id: resolvedParams.id },
    include: {
      process: true
    }
  });

  if (!licitacao) {
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
        <h2 className="text-3xl font-bold tracking-tight">Detalhes da Licitação</h2>
        <div className="flex-1" />
        <Link href={`/compras/licitacoes/${licitacao.id}/editar`}>
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
              <p className="text-lg">{licitacao.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant="secondary">{licitacao.status}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Modalidade</p>
              <p>{licitacao.modality}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Processo Vinculado</p>
              <p>{licitacao.process?.number}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Publicação</p>
              <p>{licitacao.publicationDate ? format(new Date(licitacao.publicationDate), "dd/MM/yyyy", { locale: ptBR }) : "Não informada"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data da Sessão</p>
              <p>{licitacao.sessionDate ? format(new Date(licitacao.sessionDate), "dd/MM/yyyy HH:mm", { locale: ptBR }) : "Não informada"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
