import { prisma } from "@/lib/prisma";
import { LicitacaoForm } from "../../LicitacaoForm";
import { notFound } from "next/navigation";

export default async function EditarLicitacaoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const [licitacao, processos] = await Promise.all([
    prisma.bidding.findUnique({
      where: { id: resolvedParams.id }
    }),
    prisma.purchaseProcess.findMany({
      orderBy: { number: 'desc' }
    })
  ]);

  if (!licitacao) {
    notFound();
  }

  return <LicitacaoForm data={licitacao} processos={processos} />;
}
