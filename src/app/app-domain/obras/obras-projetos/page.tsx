import React from "react";
import { Building2, Plus, Search, FileSignature, HardHat, FileSymlink, MoreVertical } from "lucide-react";

export default function ObrasProjetosPage() {
  const obras = [
    { id: 1, type: "Obra", title: "Construção da UBS Centro", status: "Em Andamento", progress: 65, date: "Previsão: Dez/2026", budget: "R$ 1.250.000,00" },
    { id: 2, type: "Obra", title: "Revitalização da Praça da Matriz", status: "Concluído", progress: 100, date: "Conclusão: Mai/2026", budget: "R$ 350.000,00" },
    { id: 3, type: "Projeto", title: "Drenagem Av. Principal", status: "Em Análise", progress: 20, date: "Previsão Início: Out/2026", budget: "R$ 2.800.000,00" },
    { id: 4, type: "Convênio", title: "Caixa Econômica (Pavimentação)", status: "Aprovado", progress: 10, date: "Assinatura: Jun/2026", budget: "R$ 5.000.000,00" },
    { id: 5, type: "Obra", title: "Reforma da Escola Municipal", status: "Paralisada", progress: 40, date: "Última medição: Fev/2026", budget: "R$ 800.000,00" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Obras e Projetos</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestão de obras públicas, projetos de engenharia e convênios federais/estaduais.</p>
        </div>
        <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium">
          <Plus className="w-4 h-4" />
          Nova Obra/Projeto
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar obras, projetos ou convênios..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos os Tipos</option>
              <option>Obras</option>
              <option>Projetos</option>
              <option>Convênios</option>
            </select>
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Status</option>
              <option>Em Andamento</option>
              <option>Concluído</option>
              <option>Paralisado</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Obra/Projeto</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Status & Progresso</th>
                <th className="px-6 py-4 font-medium">Orçamento</th>
                <th className="px-6 py-4 font-medium">Datas</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {obras.map((obra) => (
                <tr key={obra.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{obra.title}</div>
                    <div className="text-slate-500 text-xs mt-1">ID: #OP-{2026000 + obra.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                      ${obra.type === 'Obra' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800' : 
                        obra.type === 'Projeto' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800' : 
                        'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:border-purple-800'}
                    `}>
                      {obra.type === 'Obra' && <HardHat className="w-3.5 h-3.5" />}
                      {obra.type === 'Projeto' && <FileSignature className="w-3.5 h-3.5" />}
                      {obra.type === 'Convênio' && <FileSymlink className="w-3.5 h-3.5" />}
                      {obra.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`w-2 h-2 rounded-full 
                        ${obra.status === 'Concluído' ? 'bg-emerald-500' : 
                          obra.status === 'Em Andamento' ? 'bg-amber-500' : 
                          obra.status === 'Paralisada' ? 'bg-red-500' : 
                          'bg-blue-500'}`} 
                      />
                      <span className="font-medium text-slate-700 dark:text-slate-300">{obra.status}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                      <div 
                        className={`h-1.5 rounded-full ${obra.status === 'Concluído' ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                        style={{ width: `${obra.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{obra.progress}% concluído</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                    {obra.budget}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {obra.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20">
                      <MoreVertical className="w-5 h-5" />
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
