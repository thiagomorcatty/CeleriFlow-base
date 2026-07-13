import { prisma } from "@/lib/prisma";
import { SolicitacaoForm } from "../../SolicitacaoForm";
import { notFound } from "next/navigation";

export default async function EditarSolicitacaoPage({ params }: { params: { id: string } }) {
  const [solicitacao, catalogItems] = await Promise.all([
    prisma.purchaseRequest.findUnique({
      where: { id: params.id },
      include: { items: true }
    }),
    prisma.catalogItem.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })
  ]);

  if (!solicitacao) {
    notFound();
  }

  return <SolicitacaoForm data={solicitacao} catalogItems={catalogItems} />;
}
