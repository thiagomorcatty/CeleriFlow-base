import React from "react";
import { Search, Plus, Pickaxe, MapPin, TreePine, MapPinned, CheckCircle2, Clock } from "lucide-react";

export default function ServicosUrbanosPage() {
  const servicos = [
    { id: 1, type: "Limpeza", title: "Capina e Roçada", location: "Bairro Alvorada", status: "Em Andamento", date: "Hoje", equipe: "Equipe Alpha" },
    { id: 2, type: "Pavimentação", title: "Tapa-Buracos", location: "Rua São João", status: "Pendente", date: "18/07/2026", equipe: "Equipe Asfalto 1" },
    { id: 3, type: "Cemitérios", title: "Manutenção Cemitério Municipal", location: "Cemitério da Saudade", status: "Concluído", date: "15/07/2026", equipe: "Equipe Zeladoria" },
    { id: 4, type: "Paisagismo", title: "Poda de Árvores", location: "Praça Central", status: "Em Andamento", date: "Hoje", equipe: "Equipe Verde" },
    { id: 5, type: "Limpeza", title: "Limpeza de Bueiros", location: "Av. Brasil", status: "Concluído", date: "14/07/2026", equipe: "Equipe Drenagem" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Serviços Urbanos</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestão de zeladoria da cidade, vias, praças e cemitérios municipais.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm">
          <Plus className="w-4 h-4" />
          Novo Serviço
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por serviço, local ou equipe..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos os Tipos</option>
              <option>Limpeza/Capina</option>
              <option>Pavimentação</option>
              <option>Paisagismo</option>
              <option>Cemitérios</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Serviço</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium">Localização</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Data & Equipe</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {servicos.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{srv.title}</div>
                    <div className="text-slate-500 text-xs mt-1">OS: #SU-{2026000 + srv.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                      ${srv.type === 'Limpeza' ? 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:border-cyan-800' : 
                        srv.type === 'Pavimentação' ? 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:border-slate-600' : 
                        srv.type === 'Cemitérios' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800'}
                    `}>
                      {srv.type === 'Limpeza' && <Pickaxe className="w-3.5 h-3.5" />}
                      {srv.type === 'Pavimentação' && <MapPin className="w-3.5 h-3.5" />}
                      {srv.type === 'Cemitérios' && <MapPinned className="w-3.5 h-3.5" />}
                      {srv.type === 'Paisagismo' && <TreePine className="w-3.5 h-3.5" />}
                      {srv.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {srv.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {srv.status === 'Concluído' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                       srv.status === 'Em Andamento' ? <Clock className="w-4 h-4 text-amber-500" /> : 
                       <span className="w-2 h-2 rounded-full bg-slate-300 ml-1 mr-1"></span>}
                      <span className="font-medium text-slate-700 dark:text-slate-300">{srv.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 dark:text-white">{srv.date}</div>
                    <div className="text-slate-500 text-xs mt-1">{srv.equipe}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline text-sm transition-colors">
                      Detalhes
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
