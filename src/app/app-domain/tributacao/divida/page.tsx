import { prisma } from "@/lib/prisma";
import DividaClient from "./DividaClient";

export const dynamic = "force-dynamic";

export default async function DividaPage() {
  const activeDebts = await prisma.activeDebt.findMany({
    include: {
      taxpayer: { include: { person: true, company: true } }
    },
    take: 20,
    orderBy: { createdAt: "desc" }
  });

  const rawTaxpayers = await prisma.taxpayer.findMany({
    include: { person: true, company: true }
  });

  const taxpayers = rawTaxpayers.map(tp => ({
    id: tp.id,
    name: tp.company?.corporateName || tp.person?.fullName || "Contribuinte sem nome"
  }));

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <DividaClient activeDebts={activeDebts as any} taxpayers={taxpayers} />
    </div>
  );
}
