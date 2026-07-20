import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import Link from "next/link";
import UnidadesClient from "./UnidadesClient";

export const dynamic = "force-dynamic";

export default async function UnidadesPage() {
  const { prisma } = await getTenantContextForModule("ADMINISTRACAO");
  const units = await prisma.administrativeUnit.findMany({
    orderBy: { name: 'asc' },
    include: { secretariat: true }
  });

  const secretariats = await prisma.secretariat.findMany({
    where: { isActive: true },
    select: { id: true, name: true }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Unidades Administrativas</h1>
          <p className="text-slate-500 mt-1">Escolas, UBS, CRAS, Almoxarifados, etc.</p>
        </div>
        <Link href="/administracao/unidades/novo" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Adicionar Nova
        </Link>
      </div>
      
      <UnidadesClient units={units} secretariats={secretariats} />
    </div>
  );
}
