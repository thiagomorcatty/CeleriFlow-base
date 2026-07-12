import { prisma } from "@/lib/prisma";
import { ClipboardList } from "lucide-react";

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
      
      {demands.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <ClipboardList className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
          <p className="text-slate-500 mt-1">Comece adicionando o primeiro registro.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Prioridade</th>
                <th className="px-6 py-4">Responsável/Criador</th>
                <th className="px-6 py-4">Setor/Secretaria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {demands.map(demand => (
                <tr key={demand.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{demand.title}</p>
                    <p className="text-xs text-slate-500">{demand.description || ""}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      demand.status === 'Concluída' ? 'bg-green-100 text-green-700' :
                      demand.status === 'Em andamento' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {demand.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                     <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      demand.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                      demand.priority === 'Normal' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {demand.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-700">{demand.assignee?.name || "Sem Responsável"}</p>
                    <p className="text-xs text-slate-500">Criador: {demand.creator?.name || "-"}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{demand.secretariat?.name || demand.department?.name || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
