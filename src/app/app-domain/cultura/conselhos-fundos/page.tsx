import React from "react";
import { Search, Plus, ShieldCheck, Landmark, LandmarkIcon, Coins, Calendar, FileText, CheckCircle2, TrendingUp } from "lucide-react";

export default function ConselhosFundosPage() {
  const conselhos = [
    { id: 1, type: "Conselho", name: "Conselho Municipal de Política Cultural (CMPC)", members: 16, lastMeeting: "12/07/2026", status: "Ativo", president: "Aline Bastos" },
    { id: 2, type: "Conselho", name: "Conselho Municipal de Esportes (CME)", members: 12, lastMeeting: "05/07/2026", status: "Ativo", president: "Ricardo Flores" },
    { id: 3, type: "Fundo", name: "Fundo Municipal de Cultura (FMC)", balance: "R$ 450.000,00", lastMeeting: "Repasses Aldir Blanc", status: "Em Execução", president: "Sec. Finanças / Cultura" },
    { id: 4, type: "Fundo", name: "Fundo Municipal de Esporte e Lazer (FMEL)", balance: "R$ 180.000,00", lastMeeting: "Aquisição de Material Escolinhas", status: "Em Execução", president: "Sec. Esportes" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Conselhos e Fundos</h1>
          <p className="text-slate-500 dark:text-slate-400">Acompanhamento dos conselhos consultivos/deliberativos e gestão financeira dos fundos vinculados.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Nova Reunião
          </button>
          <button className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Lançar Repasse / Fundo
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por conselho, fundo ou presidente..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos os Órgãos</option>
              <option>Conselhos</option>
              <option>Fundos</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Nome do Órgão / Fundo</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Membros / Saldo</th>
                <th className="px-6 py-4 font-medium">Presidente / Gestor</th>
                <th className="px-6 py-4 font-medium">Último Evento / Destinação</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {conselhos.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {item.type === 'Conselho' ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> : <Coins className="w-4 h-4 text-amber-600" />}
                      {item.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                      ${item.type === 'Conselho' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800' : 
                        'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800'}
                    `}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1 font-semibold">
                      {item.type === 'Conselho' ? `${item.members} membros` : item.balance}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {item.president}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {item.type === 'Conselho' ? (
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Reunião em {item.lastMeeting}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        {item.lastMeeting}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      {item.status}
                    </span>
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
