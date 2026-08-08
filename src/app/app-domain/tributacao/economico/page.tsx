import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import EconomicoClient from "./EconomicoClient";

export const dynamic = "force-dynamic";

export default async function CadastroEconomicoPage() {
  const { prisma } = await getTenantContextForModule("TRIBUTACAO");
  const registrations = await prisma.economicRegistration.findMany({
    include: {
      taxpayer: {
        include: { person: true, company: true }
      }
    },
    take: 20,
    orderBy: { createdAt: 'desc' }
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
      <EconomicoClient registrations={registrations} taxpayers={taxpayers} />
    </div>
  );
}
