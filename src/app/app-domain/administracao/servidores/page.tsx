import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ServidoresClient from "./ServidoresClient";

export const dynamic = "force-dynamic";

export default async function ServidoresPage() {
  const employees = await prisma.employee.findMany({
    orderBy: { name: 'asc' },
    include: {
      role: true,
      secretariat: true,
      department: true
    }
  });

  const roles = await prisma.role.findMany({ where: { isActive: true }, select: { id: true, name: true } });
  const secretariats = await prisma.secretariat.findMany({ where: { isActive: true }, select: { id: true, name: true } });
  const departments = await prisma.department.findMany({ where: { isActive: true }, select: { id: true, name: true, secretariatId: true } });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Servidores</h1>
          <p className="text-slate-500 mt-1">Gerencie os servidores da prefeitura e seus acessos.</p>
        </div>
        <Link href="/administracao/servidores/novo" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Adicionar Novo
        </Link>
      </div>
      <ServidoresClient 
        employees={employees} 
        roles={roles}
        secretariats={secretariats}
        departments={departments}
      />
    </div>
  );
}
