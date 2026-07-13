import { prisma } from "@/lib/prisma";
import { SolicitacaoForm } from "../../SolicitacaoForm";
import { notFound } from "next/navigation";

export default async function EditarSolicitacaoPage({ params }: { params: { id: string } }) {
  const solicitacao = await prisma.purchaseRequest.findUnique({
    where: { id: params.id }
  });

  if (!solicitacao) {
    notFound();
  }

  return <SolicitacaoForm data={solicitacao} />;
}
