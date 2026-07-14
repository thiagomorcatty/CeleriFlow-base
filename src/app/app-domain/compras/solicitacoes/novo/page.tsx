import { SolicitacaoForm } from "../SolicitacaoForm";
import { prisma } from "@/lib/prisma";

export default async function NovaSolicitacaoPage() {
  const [materials, secretarias] = await Promise.all([
    prisma.material.findMany({
      orderBy: { name: 'asc' }
    }),
    prisma.secretariat.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  return <SolicitacaoForm catalogItems={materials} secretarias={secretarias} />;
}
