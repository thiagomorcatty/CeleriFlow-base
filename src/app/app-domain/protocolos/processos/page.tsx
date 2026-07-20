import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import ProcessosClient from "./ProcessosClient";

export const dynamic = "force-dynamic";

export default async function ProcessosPage() {
  const { prisma } = await getTenantContextForModule("PROTOCOLOS");
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
