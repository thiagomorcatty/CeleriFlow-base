import { Gavel, Search, Download } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import UploadLicitacoesForm from "./UploadLicitacoesForm";

export const dynamic = "force-dynamic";

export default async function LicitacoesPage() {
  const biddings = await prisma.bidding.findMany({
    orderBy: { publicationDate: 'desc' },
    include: {
      process: {
        select: {
          number: true,
          object: true,
          estimatedValue: true,
        }
      }
    }
  });

  const now = new Date();

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/transparencia" className="text-sm font-semibold text-blue-600 hover:underline mb-2 inline-block">
            &larr; Voltar para Transparência
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Gavel className="w-6 h-6 text-blue-600" />
            Licitações Abertas
          </h1>
          <p className="text-slate-500 mt-1">Acompanhe os processos de compra e concorrência pública.</p>
        </div>
        <div className="flex gap-2">
          <UploadLicitacoesForm />
          <Link href="/compras" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
            Nova Licitação (Módulo Compras)
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por número ou objeto..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-slate-600">
              <option value="">Todas as Modalidades</option>
              <option value="Pregão">Pregão</option>
              <option value="Concorrência">Concorrência Pública</option>
              <option value="Tomada de Preços">Tomada de Preços</option>
            </select>
          </div>
        </div>

        {biddings.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Nenhuma licitação encontrada.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Número / Processo</th>
                  <th className="px-6 py-3">Modalidade</th>
                  <th className="px-6 py-3">Objeto</th>
                  <th className="px-6 py-3">Data da Sessão</th>
                  <th className="px-6 py-3">Status Inteligente</th>
                  <th className="px-6 py-3 text-right">Edital</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {biddings.map((b) => {
                  // Intelligent status logic
                  let intelligentStatus = "Em Elaboração";
                  let statusColor = "bg-slate-100 text-slate-700";
                  
                  if (b.status === "Concluída" || b.status === "Suspensa") {
                    intelligentStatus = b.status;
                    statusColor = b.status === "Concluída" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700";
                  } else if (b.sessionDate) {
                    if (b.sessionDate > now) {
                      intelligentStatus = "Previsto (Aberto)";
                      statusColor = "bg-blue-100 text-blue-700";
                    } else {
                      intelligentStatus = "Realizado (Em Julgamento)";
                      statusColor = "bg-purple-100 text-purple-700";
                    }
                  }

                  return (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {b.number}
                      <span className="block text-xs font-normal text-slate-500">{b.process.number}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{b.modality}</td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate text-slate-800" title={b.process.object}>
                        {b.process.object}
                      </div>
                      <span className="text-xs font-semibold text-slate-500">
                        Valor Estimado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(b.process.estimatedValue || 0)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {b.sessionDate ? new Date(b.sessionDate).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${statusColor}`}>
                        {intelligentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-xs font-bold transition-colors">
                        <Download className="w-4 h-4" /> Baixar
                      </button>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
