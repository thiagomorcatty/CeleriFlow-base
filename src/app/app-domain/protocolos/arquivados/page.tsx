import { prisma } from "@/lib/prisma";
import ArquivadosClient from "./ArquivadosClient";

export const dynamic = "force-dynamic";

export default async function ArquivadosPage() {
  const processos = await prisma.process.findMany({
    where: {
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
