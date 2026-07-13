import { SolicitacaoForm } from "../SolicitacaoForm";
import { prisma } from "@/lib/prisma";

export default async function NovaSolicitacaoPage() {
  const [catalogItems, secretarias] = await Promise.all([
    prisma.catalogItem.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    }),
    prisma.secretariat.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  return <SolicitacaoForm catalogItems={catalogItems} secretarias={secretarias} />;
}
