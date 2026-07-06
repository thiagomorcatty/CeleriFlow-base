import { MessageSquareWarning, Search, EyeOff, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OuvidoriaPage() {
  const manifestacoes = await prisma.ombudsman.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
    include: {
      person: true
    }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquareWarning className="w-6 h-6 text-amber-600" />
            Ouvidoria (Denúncias e Reclamações)
          </h1>
          <p className="text-slate-500 mt-1">Gerenciamento de manifestações sigilosas, denúncias e elogios.</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-sm">
        <EyeOff className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-1">Área Restrita (LGPD)</strong>
          Denúncias anônimas e informações sigilosas são protegidas por lei. O vazamento de dados desta tela configura infração grave.
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar manifestações..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 text-slate-600">
              <option value="">Todos os Tipos</option>
              <option value="Denúncia">Denúncia</option>
              <option value="Reclamação">Reclamação</option>
              <option value="Elogio">Elogio</option>
              <option value="Sugestão">Sugestão</option>
            </select>
          </div>
        </div>

        {manifestacoes.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileText className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhuma manifestação</h3>
            <p className="text-slate-500 mt-1">A ouvidoria não possui registros pendentes no momento.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Protocolo</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Assunto</th>
                  <th className="px-6 py-3">Cidadão</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {manifestacoes.map((man) => (
                  <tr key={man.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {man.protocolNumber}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        man.type === 'Denúncia' ? 'bg-red-100 text-red-700' :
                        man.type === 'Reclamação' ? 'bg-orange-100 text-orange-700' :
                        man.type === 'Elogio' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {man.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {man.subject}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {man.isAnonymous ? (
                        <span className="flex items-center gap-1 text-slate-500 italic">
                          <EyeOff className="w-3 h-3" /> Anônimo
                        </span>
                      ) : (
                        man.person?.fullName || "Não Identificado"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        man.status === 'Recebida' ? 'bg-slate-100 text-slate-700' :
                        man.status === 'Em Análise' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {man.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-amber-600 hover:text-amber-800 text-sm font-semibold transition-colors">
                        Analisar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
