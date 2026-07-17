import React from "react";
import { Search, Plus, Sparkles, FolderKanban, Coins, Calendar, FileBadge, MoreVertical } from "lucide-react";

export default function FomentoProjetosPage() {
  const projetos = [
    { id: 1, type: "Edital", title: "Edital Aldir Blanc 2026", value: "R$ 450.000,00", status: "Inscrições Abertas", date: "Até 31/08/2026", sector: "Multidisciplinar" },
    { id: 2, type: "Projeto", title: "Música para Todos", value: "R$ 60.000,00", status: "Em Execução", date: "Fim: Dez/2026", sector: "Música / Formação" },
    { id: 3, type: "Fomento", title: "Lei Paulo Gustavo - Audiovisual", value: "R$ 320.000,00", status: "Em Pagamento", date: "Pago em parcelas", sector: "Cinema / Produção" },
    { id: 4, type: "Projeto", title: "Oficina de Dança Contemporânea", value: "R$ 25.000,00", status: "Concluído", date: "Concluído em Jun/26", sector: "Dança / Oficinas" },
    { id: 5, type: "Edital", title: "Prêmio Cultura Viva Local", value: "R$ 100.000,00", status: "Em Análise", date: "Julgamento", sector: "Culturas Populares" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Fomento e Projetos</h1>
          <p className="text-slate-500 dark:text-slate-400">Editais de incentivo, repasses de fundos de fomento e acompanhamento de projetos culturais.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Novo Projeto
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Criar Edital
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar edital, projeto ou proponente..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos os Instrumentos</option>
              <option>Editais</option>
              <option>Projetos Apoiados</option>
              <option>Leis de Incentivo</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Incentivo / Proponente</th>
                <th className="px-6 py-4 font-medium">Instrumento</th>
                <th className="px-6 py-4 font-medium">Segmento</th>
                <th className="px-6 py-4 font-medium">Recurso Destinado</th>
                <th className="px-6 py-4 font-medium">Status & Prazos</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {projetos.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{proj.title}</div>
                    <div className="text-slate-500 text-xs mt-1">Ref: #FP-{2026000 + proj.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                      ${proj.type === 'Edital' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800' : 
                        proj.type === 'Projeto' ? 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:border-teal-800' : 
                        'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800'}
                    `}>
                      {proj.type === 'Edital' && <FileBadge className="w-3.5 h-3.5" />}
                      {proj.type === 'Projeto' && <FolderKanban className="w-3.5 h-3.5" />}
                      {proj.type === 'Fomento' && <Coins className="w-3.5 h-3.5" />}
                      {proj.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {proj.sector}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                    {proj.value}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full 
                        ${proj.status === 'Inscrições Abertas' || proj.status === 'Em Execução' ? 'bg-emerald-500' : 
                          proj.status === 'Em Análise' ? 'bg-amber-500' : 
                          proj.status === 'Em Pagamento' ? 'bg-sky-500' : 
                          'bg-slate-400'}`} 
                      />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{proj.status}</span>
                    </div>
                    <div className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {proj.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
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
