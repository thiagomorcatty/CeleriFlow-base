import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import AssinaturasClient from "./AssinaturasClient";

export const dynamic = "force-dynamic";

export default async function AssinaturasPage() {
  const { prisma } = await getTenantContextForModule("PROTOCOLOS");
  const processos = await prisma.process.findMany({
    where: {
      status: 'Aguardando Assinatura'
    },
    include: {
      processType: true,
      subject: true,
      person: true,
      company: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return <AssinaturasClient initialProcessos={processos} />;
}
