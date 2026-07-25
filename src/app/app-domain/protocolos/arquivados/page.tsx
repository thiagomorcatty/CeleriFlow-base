import { getProtocolContext, protocolScope } from "@/lib/protocols/access";
import ArquivadosClient from "./ArquivadosClient";

export const dynamic = "force-dynamic";

export default async function ArquivadosPage() {
  const context = await getProtocolContext();
  const { prisma } = context;
  const processos = await prisma.process.findMany({
    where: {
      ...protocolScope(context),
      status: 'Arquivado'
    },
    include: {
      processType: true,
      subject: true,
      person: true,
      company: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return <ArquivadosClient initialProcessos={processos} />;
}
