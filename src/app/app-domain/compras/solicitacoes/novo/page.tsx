import { SolicitacaoForm } from "../SolicitacaoForm";
import { prisma } from "@/lib/prisma";

export default async function NovaSolicitacaoPage() {
  const catalogItems = await prisma.catalogItem.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' }
  }).catch(() => []);

  return <SolicitacaoForm catalogItems={catalogItems} />;
}
