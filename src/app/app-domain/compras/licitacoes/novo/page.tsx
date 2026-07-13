import { prisma } from "@/lib/prisma";
import { LicitacaoForm } from "../LicitacaoForm";

export default async function NovaLicitacaoPage() {
  const processos = await prisma.purchaseProcess.findMany({
    orderBy: { number: 'desc' }
  });

  return <LicitacaoForm processos={processos} />;
}
