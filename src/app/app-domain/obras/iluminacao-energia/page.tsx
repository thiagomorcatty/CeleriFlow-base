import React from "react";
import { Search, Plus, Lightbulb, Zap, BatteryCharging, FileText, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function IluminacaoEnergiaPage() {
  const demandas = [
    { id: 1, type: "Iluminação", title: "Troca de Lâmpadas LED", location: "Av. Brasil, quarteirão 12", status: "Em Andamento", date: "Hoje", equipe: "Equipe Luz 1" },
    { id: 2, type: "Iluminação", title: "Reparo de Relé Fotoelétrico", location: "Bairro Novo", status: "Pendente", date: "18/07/2026", equipe: "Equipe Luz 2" },
    { id: 3, type: "Energia", title: "Instalação de Painéis Solares", location: "Prédio da Prefeitura", status: "Em Projeto", date: "Ago/2026", equipe: "Engenharia" },
    { id: 4, type: "Gestão", title: "Fatura de Energia Mensal", location: "Praça Matriz", status: "Aprovado", date: "10/07/2026", equipe: "Administrativo" },
    { id: 5, type: "Iluminação", title: "Extensão de Rede", location: "Loteamento Sol Nascente", status: "Concluído", date: "05/07/2026", equipe: "Terceirizada Elétrica" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Iluminação Pública e Energia</h1>
          <p className="text-slate-500 dark:text-slate-400">Manutenção da rede de iluminação, eficiência e gestão de faturas de energia.</p>
        </div>
        <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium shadow-sm">
          <Plus className="w-4 h-4" />
          Nova Demanda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl text-yellow-600">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pontos Apagados (Hoje)</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">14</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Projetos de Eficiência</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">3</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Faturas Analisadas</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">128</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por serviço, local ou equipe..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos os Tipos</option>
              <option>Iluminação</option>
              <option>Energia Sustentável</option>
              <option>Gestão Administrativa</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Serviço/Projeto</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Localização</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Data & Equipe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {demandas.map((demanda) => (
                <tr key={demanda.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{demanda.title}</div>
                    <div className="text-slate-500 text-xs mt-1">ID: #IL-{2026000 + demanda.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                      ${demanda.type === 'Iluminação' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800' : 
                        demanda.type === 'Energia' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800' : 
                        'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800'}
                    `}>
                      {demanda.type === 'Iluminação' && <Lightbulb className="w-3.5 h-3.5" />}
                      {demanda.type === 'Energia' && <BatteryCharging className="w-3.5 h-3.5" />}
                      {demanda.type === 'Gestão' && <FileText className="w-3.5 h-3.5" />}
                      {demanda.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {demanda.location}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {demanda.status === 'Concluído' || demanda.status === 'Aprovado' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                       demanda.status === 'Em Andamento' || demanda.status === 'Em Projeto' ? <Clock className="w-4 h-4 text-amber-500" /> : 
                       <AlertTriangle className="w-4 h-4 text-slate-400" />}
                      <span className="font-medium text-slate-700 dark:text-slate-300">{demanda.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 dark:text-white">{demanda.date}</div>
                    <div className="text-slate-500 text-xs mt-1">{demanda.equipe}</div>
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
