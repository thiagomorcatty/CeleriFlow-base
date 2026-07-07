import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Briefcase } from "lucide-react";

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
      
      {roles.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Briefcase className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
          <p className="text-slate-500 mt-1">Comece adicionando o primeiro cargo.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Nível</th>
                <th className="px-6 py-4">Pode Assinar?</th>
                <th className="px-6 py-4 text-center">Servidores Vinculados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map(role => (
                <tr key={role.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{role.name}</td>
                  <td className="px-6 py-4 text-slate-600">{role.level || "-"}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {role.canSign ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">Sim</span>
                    ) : (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">Não</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-center">{role._count.employees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
