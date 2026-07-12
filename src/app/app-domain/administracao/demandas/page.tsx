import { prisma } from "@/lib/prisma";
import DemandasClient from "./DemandasClient";

export const dynamic = "force-dynamic";

export default async function DemandasPage() {
  const demands = await prisma.internalDemand.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      secretariat: true,
      department: true,
      creator: true,
      assignee: true
    }
  });

  const secretariats = await prisma.secretariat.findMany({ where: { isActive: true }, select: { id: true, name: true } });
  const departments = await prisma.department.findMany({ where: { isActive: true }, select: { id: true, name: true } });
  const employees = await prisma.employee.findMany({ where: { isActive: true }, select: { id: true, name: true } });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Demandas Internas</h1>
          <p className="text-slate-500 mt-1">Gerencie os registros de demandas internas.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm">
          Adicionar Novo
        </button>
      </div>
      
      <DemandasClient 
        demands={demands} 
        secretariats={secretariats}
        departments={departments}
        employees={employees}
      />
    </div>
  );
}
