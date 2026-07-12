import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CargosClient from "./CargosClient";

export const dynamic = "force-dynamic";

export default async function CargosPage() {
  const roles = await prisma.role.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { employees: true } } }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cargos e Funções</h1>
          <p className="text-slate-500 mt-1">Gerencie os cargos disponíveis na prefeitura.</p>
        </div>
        <Link href="/administracao/cargos/novo" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Adicionar Novo
        </Link>
      </div>
      <CargosClient roles={roles} />
    </div>
  );
}
