import React from "react";
import { Search, Plus, FileText, Download, FileSignature, HardHat, FileSymlink, Eye } from "lucide-react";

export default function DocumentosPage() {
  const documentos = [
    { id: 1, type: "Planta", title: "Planta Baixa - UBS Centro", related: "Obra #OP-2026001", date: "10/05/2026", size: "4.2 MB", author: "Eng. Mariana Costa" },
    { id: 2, type: "Alvará", title: "Alvará de Construção - Escola Municipal", related: "Obra #OP-2026005", date: "02/06/2026", size: "1.1 MB", author: "Secretaria de Obras" },
    { id: 3, type: "Contrato", title: "Contrato Empreiteira XYZ (Pavimentação)", related: "Convênio #OP-2026004", date: "15/06/2026", size: "8.5 MB", author: "Setor de Licitações" },
    { id: 4, type: "ART", title: "ART Específica - Praça da Matriz", related: "Obra #OP-2026002", date: "20/04/2026", size: "540 KB", author: "Eng. Carlos Silva" },
    { id: 5, type: "Memorial", title: "Memorial Descritivo Drenagem Av. Principal", related: "Projeto #OP-2026003", date: "05/07/2026", size: "12.4 MB", author: "Eng. Roberto Alves" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Documentos e Projetos Anexos</h1>
          <p className="text-slate-500 dark:text-slate-400">Repositório de plantas, alvarás, contratos, ARTs e memoriais descritivos.</p>
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
              placeholder="Buscar documento, projeto ou autor..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos os Tipos</option>
              <option>Plantas/Projetos</option>
              <option>Alvarás e Licenças</option>
              <option>Contratos</option>
              <option>ARTs e RRTs</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Nome do Documento</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Vínculo</th>
                <th className="px-6 py-4 font-medium">Data & Autor</th>
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
                      ${doc.type === 'Planta' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800' : 
                        doc.type === 'Alvará' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800' : 
                        doc.type === 'Contrato' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800' :
                        doc.type === 'ART' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800' :
                        'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}
                    `}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      {doc.related.includes('Obra') && <HardHat className="w-3 h-3 text-slate-400" />}
                      {doc.related.includes('Projeto') && <FileSignature className="w-3 h-3 text-slate-400" />}
                      {doc.related.includes('Convênio') && <FileSymlink className="w-3 h-3 text-slate-400" />}
                      {doc.related}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 dark:text-white">{doc.date}</div>
                    <div className="text-slate-500 text-xs mt-1">{doc.author}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20" title="Visualizar">
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
