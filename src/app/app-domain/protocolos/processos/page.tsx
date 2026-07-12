import { prisma } from "@/lib/prisma";
import ProcessosClient from "./ProcessosClient";

export const dynamic = "force-dynamic";

export default async function ProcessosPage() {
  const processos = await prisma.process.findMany({
    include: {
      processType: true,
      subject: true,
      person: true,
      company: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return <ProcessosClient initialProcessos={processos} />;
}
