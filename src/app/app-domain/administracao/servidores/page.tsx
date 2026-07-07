import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ServidoresPage() {
  const employees = await prisma.employee.findMany({
    orderBy: { name: 'asc' },
    include: { role: true, secretariat: true, department: true }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Servidores</h1>
          <p className="text-slate-500 mt-1">Gerencie os servidores da prefeitura e seus acessos.</p>
        </div>
        <Link href="/app-domain/administracao/servidores/novo" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Adicionar Novo
        </Link>
      </div>
      
      {employees.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Users className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
          <p className="text-slate-500 mt-1">Comece adicionando o primeiro servidor.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Nome / CPF</th>
                <th className="px-6 py-4">Cargo</th>
                <th className="px-6 py-4">Alocação</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{emp.name}</p>
                    <p className="text-xs text-slate-500">{emp.cpf}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{emp.role?.name || "-"}</td>
                  <td className="px-6 py-4">
                    <p className="text-slate-700">{emp.secretariat?.acronym || emp.secretariat?.name || "Sem Secretaria"}</p>
                    <p className="text-xs text-slate-500">{emp.department?.name || ""}</p>
                  </td>
                  <td className="px-6 py-4">
                    {emp.isActive ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">Ativo</span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium">Inativo</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
