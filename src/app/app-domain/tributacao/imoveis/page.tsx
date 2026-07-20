import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import ImoveisClient from "./ImoveisClient";

export const dynamic = "force-dynamic";

export default async function ImoveisFiscaisPage() {
  const { prisma } = await getTenantContextForModule("TRIBUTACAO");
  const imoveis = await prisma.realEstate.findMany({
    include: {
      taxpayer: {
        include: { person: true, company: true }
      }
    },
    take: 20,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <ImoveisClient imoveis={imoveis as any} />
    </div>
  );
}
