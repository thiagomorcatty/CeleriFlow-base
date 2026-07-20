import { SolicitacaoForm } from "../SolicitacaoForm";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function NovaSolicitacaoPage() {
  const { prisma } = await getTenantContextForModule("COMPRAS");
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
