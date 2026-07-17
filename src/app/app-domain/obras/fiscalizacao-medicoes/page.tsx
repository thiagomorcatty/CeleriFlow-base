import React from "react";
import { Search, Plus, FileCheck2, AlertTriangle, Calculator, MoreVertical, Eye } from "lucide-react";

export default function FiscalizacaoMedicoesPage() {
  const registros = [
    { id: 1, type: "Medição", title: "1ª Medição - Escola Municipal", value: "R$ 150.000,00", status: "Aprovada", date: "15/07/2026", inspector: "Eng. Carlos Silva" },
    { id: 2, type: "Fiscalização", title: "Auto de Infração - Loteamento X", value: "-", status: "Autuado", date: "12/07/2026", inspector: "Fisc. João Mendes" },
    { id: 3, type: "Medição", title: "3ª Medição - Recapeamento Asfáltico", value: "R$ 420.000,00", status: "Em Análise", date: "10/07/2026", inspector: "Eng. Mariana Costa" },
    { id: 4, type: "Fiscalização", title: "Relatório de Vistoria - Ponte do Rio Claro", value: "-", status: "Concluído", date: "05/07/2026", inspector: "Eng. Roberto Alves" },
    { id: 5, type: "Medição", title: "Pagamento Final - UBS Centro", value: "R$ 55.000,00", status: "Aprovada", date: "01/07/2026", inspector: "Eng. Carlos Silva" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Fiscalização e Medições</h1>
          <p className="text-slate-500 dark:text-slate-400">Acompanhamento financeiro de obras, vistorias técnicas e autos de infração.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Nova Vistoria
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Nova Medição
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por obra, fiscal ou documento..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos</option>
              <option>Medições</option>
              <option>Fiscalização</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Documento</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Valor (Se aplicável)</th>
                <th className="px-6 py-4 font-medium">Data & Fiscal</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {registros.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{reg.title}</div>
                    <div className="text-slate-500 text-xs mt-1">ID: #FM-{2026000 + reg.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                      ${reg.type === 'Medição' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800' : 
                        'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:border-rose-800'}
                    `}>
                      {reg.type === 'Medição' && <Calculator className="w-3.5 h-3.5" />}
                      {reg.type === 'Fiscalização' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {reg.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                      ${reg.status === 'Aprovada' || reg.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : 
                        reg.status === 'Autuado' ? 'bg-red-100 text-red-700' : 
                        'bg-amber-100 text-amber-700'}
                    `}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                    {reg.value}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 dark:text-white">{reg.date}</div>
                    <div className="text-slate-500 text-xs mt-1">{reg.inspector}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20" title="Visualizar Detalhes">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                        <MoreVertical className="w-5 h-5" />
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
