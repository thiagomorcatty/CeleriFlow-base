import { FileText, Plus, Search, FileEdit, Trash2 } from "lucide-react";
import Link from "next/link";
// import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DocumentosModelosPage() {
  // Simulando modelos, já que ainda não criamos a tabela DocumentTemplate
  const modelos = [
    { id: "1", nome: "Ofício Padrão", tipo: "Ofício", atualizadoEm: "2026-07-01", status: "Ativo" },
    { id: "2", nome: "Memorando Interno", tipo: "Memorando", atualizadoEm: "2026-07-02", status: "Ativo" },
    { id: "3", nome: "Portaria de Nomeação", tipo: "Portaria", atualizadoEm: "2026-07-05", status: "Ativo" },
    { id: "4", nome: "Certidão Negativa", tipo: "Certidão", atualizadoEm: "2026-07-06", status: "Rascunho" },
  ];

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            Modelos de Documentos
          </h1>
          <p className="text-slate-500 mt-1">Crie e gerencie os templates padrão da prefeitura.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Modelo
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar modelos..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-600">
              <option value="">Todos os Tipos</option>
              <option value="oficio">Ofício</option>
              <option value="memorando">Memorando</option>
              <option value="portaria">Portaria</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Nome do Modelo</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Última Atualização</th>
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modelos.map((modelo) => (
                <tr key={modelo.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    {modelo.nome}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {modelo.tipo}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      modelo.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {modelo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(modelo.atualizadoEm).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <FileEdit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
