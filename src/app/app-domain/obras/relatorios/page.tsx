import React from "react";
import { BarChart3, Download, Search, Filter, PieChart, TrendingUp, Calendar, FileText } from "lucide-react";

export default function RelatoriosPage() {
  const relatorios = [
    { id: 1, type: "Estatístico", title: "Relatório de Medições Consolidadas", period: "Junho 2026", status: "Gerado", author: "Secretaria de Obras", format: "PDF" },
    { id: 2, type: "Financeiro", title: "Custos com Iluminação Pública", period: "1º Semestre 2026", status: "Gerado", author: "Depto. Energia", format: "Excel" },
    { id: 3, type: "Operacional", title: "Produtividade de Equipes de Campo", period: "Últimos 30 dias", status: "Processando...", author: "Gestão de Frotas", format: "PDF" },
    { id: 4, type: "Executivo", title: "Status Geral de Obras Públicas", period: "Agosto 2026", status: "Agendado", author: "Gabinete", format: "PDF" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Relatórios e Estatísticas</h1>
          <p className="text-slate-500 dark:text-slate-400">Extração de dados consolidados, dashboards executivos e prestação de contas.</p>
        </div>
        <button className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors font-medium shadow-sm">
          <BarChart3 className="w-4 h-4" />
          Gerar Novo Relatório
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-center items-center text-center hover:border-cyan-200 transition-colors cursor-pointer group">
          <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-full text-cyan-600 mb-4 group-hover:scale-110 transition-transform">
            <PieChart className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Desempenho de Obras</h3>
          <p className="text-sm text-slate-500 mt-2">Visão gráfica do avanço físico x financeiro</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-center items-center text-center hover:border-cyan-200 transition-colors cursor-pointer group">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Custo de Serviços</h3>
          <p className="text-sm text-slate-500 mt-2">Gasto por tipo de serviço urbano realizado</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-center items-center text-center hover:border-cyan-200 transition-colors cursor-pointer group">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-full text-amber-600 mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Agenda e Previsões</h3>
          <p className="text-sm text-slate-500 mt-2">Relatório de prazos contratuais de convênios</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-400" />
            Últimos Relatórios Gerados
          </h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
              <Filter className="w-4 h-4" />
              Filtrar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Nome do Relatório</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium">Período Referência</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {relatorios.map((rel) => (
                <tr key={rel.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{rel.title}</div>
                    <div className="text-slate-500 text-xs mt-1">Gerado por: {rel.author}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {rel.type}
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {rel.period}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${rel.status === 'Gerado' ? 'bg-emerald-100 text-emerald-700' : 
                        rel.status === 'Processando...' ? 'bg-amber-100 text-amber-700' : 
                        'bg-slate-100 text-slate-700'}
                    `}>
                      {rel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      className={`flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                        ${rel.status === 'Gerado' ? 'text-cyan-600 bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-900/20 dark:hover:bg-cyan-900/40' : 'text-slate-400 bg-slate-50 cursor-not-allowed dark:bg-slate-800'}
                      `}
                      disabled={rel.status !== 'Gerado'}
                    >
                      <Download className="w-4 h-4" />
                      {rel.format}
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
