import { prisma } from "@/lib/prisma";
import { LicitacaoForm } from "../../LicitacaoForm";
import { notFound } from "next/navigation";

export default async function EditarLicitacaoPage({ params }: { params: { id: string } }) {
  const licitacao = await prisma.bidding.findUnique({
    where: { id: params.id }
  });

  if (!licitacao) {
    notFound();
  }

  return <LicitacaoForm data={licitacao} />;
}
