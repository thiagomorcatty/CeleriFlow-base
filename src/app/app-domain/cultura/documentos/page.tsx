import React from "react";
import { Search, Plus, FileText, Download, ShieldCheck, Coins, BookOpen, Calendar, Eye } from "lucide-react";

export default function DocumentosPage() {
  const documentos = [
    { id: 1, type: "Plano", title: "Plano Municipal de Cultura (PMC)", relation: "Legislação Geral", date: "10/01/2026", size: "3.4 MB", author: "CMPC" },
    { id: 2, type: "Resolução", title: "Resolução CMPC 01/2026 - Novo Regimento", relation: "Conselho de Cultura", date: "15/05/2026", size: "520 KB", author: "Secretaria Executiva" },
    { id: 3, type: "Portaria", title: "Portaria de Nomeação dos Membros do CME", relation: "Conselho de Esportes", date: "02/02/2026", size: "890 KB", author: "Gabinete do Prefeito" },
    { id: 4, type: "Termo", title: "Termo de Fomento - Projeto Oficina de Dança", relation: "Lei Paulo Gustavo", date: "12/06/2026", size: "1.2 MB", author: "Depto. Cultura" },
    { id: 5, type: "Edital", title: "Regulamento do Campeonato de Futsal 2026", relation: "Campeonato Futsal", date: "05/07/2026", size: "2.1 MB", author: "Depto. Esportes" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Documentos e Legislação</h1>
          <p className="text-slate-500 dark:text-slate-400">Atos normativos, termos de fomento, planos municipais, regulamentos e resoluções dos conselhos.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-800 dark:bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors font-medium shadow-sm">
          <Plus className="w-4 h-4" />
          Novo Documento
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por título do documento, autor ou conselho..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos os Tipos</option>
              <option>Planos e Leis</option>
              <option>Resoluções</option>
              <option>Portarias</option>
              <option>Termos e Editais</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Nome do Documento</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Associação / Vínculo</th>
                <th className="px-6 py-4 font-medium">Data & Emitente</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {documentos.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      {doc.title}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Tamanho: {doc.size}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                      ${doc.type === 'Plano' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800' : 
                        doc.type === 'Resolução' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800' : 
                        doc.type === 'Portaria' ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:border-rose-800' :
                        doc.type === 'Termo' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800' :
                        'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}
                    `}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      {doc.relation.includes('Conselho') && <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />}
                      {doc.relation.includes('Fundo') && <Coins className="w-3.5 h-3.5 text-slate-400" />}
                      {doc.relation.includes('Geral') && <BookOpen className="w-3.5 h-3.5 text-slate-400" />}
                      {doc.relation}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 dark:text-white">{doc.date}</div>
                    <div className="text-slate-500 text-xs mt-1">{doc.author}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20" title="Visualizar">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-slate-400 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20" title="Baixar">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
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
