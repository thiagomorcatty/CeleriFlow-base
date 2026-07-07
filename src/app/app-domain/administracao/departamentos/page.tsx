import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Network } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DepartamentosPage() {
  const departments = await prisma.department.findMany({
    orderBy: { name: 'asc' },
    include: { secretariat: true }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Departamentos</h1>
          <p className="text-slate-500 mt-1">Gerencie os departamentos vinculados às secretarias.</p>
        </div>
        <Link href="/app-domain/administracao/departamentos/novo" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Adicionar Novo
        </Link>
      </div>
      
      {departments.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Network className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
          <p className="text-slate-500 mt-1">Comece adicionando o primeiro departamento.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Secretaria Vinculada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departments.map(dep => (
                <tr key={dep.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{dep.name}</td>
                  <td className="px-6 py-4 text-slate-600">{dep.description || "-"}</td>
                  <td className="px-6 py-4 text-slate-600">{dep.secretariat.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
