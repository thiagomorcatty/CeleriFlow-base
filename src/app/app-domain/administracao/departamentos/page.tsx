import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import Link from "next/link";
import DepartamentosClient from "./DepartamentosClient";

export const dynamic = "force-dynamic";

export default async function DepartamentosPage() {
  const { prisma } = await getTenantContextForModule("ADMINISTRACAO");
  const departments = await prisma.department.findMany({
    orderBy: { name: 'asc' },
    include: { secretariat: true }
  });

  const secretariats = await prisma.secretariat.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    select: { id: true, name: true }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Departamentos</h1>
          <p className="text-slate-500 mt-1">Gerencie os departamentos vinculados às secretarias.</p>
        </div>
        <Link href="/administracao/departamentos/novo" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Adicionar Novo
        </Link>
      </div>
      <DepartamentosClient departments={departments} secretariats={secretariats} />
    </div>
  );
}
