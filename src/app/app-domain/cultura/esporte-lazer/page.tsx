import React from "react";
import { Search, Plus, Trophy, Users, Star, ClipboardList, CheckCircle2, AlertTriangle, Eye, Sparkles } from "lucide-react";

export default function EsporteLazerPage() {
  const atividades = [
    { id: 1, type: "Escolinha", title: "Futebol de Campo 'Bom de Bola'", participants: 80, coordinator: "Prof. Marcos", status: "Em Atividade", level: "Infanto-Juvenil" },
    { id: 2, type: "Campeonato", title: "Campeonato Municipal de Futsal 2026", participants: "16 Equipes", coordinator: "Depto. Esportes", status: "Inscrições", level: "Livre / Adulto" },
    { id: 3, type: "Atividade", title: "Circuito de Corrida de Rua (Etapa Primavera)", participants: 350, coordinator: "Sec. Esportes", status: "Planejado", level: "Geral" },
    { id: 4, type: "Escolinha", title: "Oficina de Xadrez", participants: 25, coordinator: "Instr. Roberto", status: "Em Atividade", level: "Livre" },
    { id: 5, type: "Atividade", title: "Ginástica da Melhor Idade", participants: 120, coordinator: "Profa. Carla", status: "Em Atividade", level: "Sênior" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Esporte e Lazer</h1>
          <p className="text-slate-500 dark:text-slate-400">Administração de escolinhas de esportes, inscrições de participantes e organização de campeonatos municipais.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Novo Participante
          </button>
          <button className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Nova Atividade/Campeonato
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl text-rose-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Participantes</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">575</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Campeonatos em Andamento</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">1</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-xl text-teal-600">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Modalidades Ativas</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">6</h2>
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
              placeholder="Buscar por escolinha, modalidade ou coordenador..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todas as Categorias</option>
              <option>Escolinhas</option>
              <option>Campeonatos</option>
              <option>Eventos de Lazer</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Nome da Atividade / Campeonato</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Público-Alvo</th>
                <th className="px-6 py-4 font-medium">Participantes/Equipes</th>
                <th className="px-6 py-4 font-medium">Status & Coordenador</th>
                <th className="px-6 py-4 font-medium text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {atividades.map((atv) => (
                <tr key={atv.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      {atv.type === 'Campeonato' ? <Trophy className="w-4 h-4 text-amber-500" /> : <Star className="w-4 h-4 text-rose-500" />}
                      {atv.title}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Código: #EL-{2026000 + atv.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border
                      ${atv.type === 'Escolinha' ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:border-rose-800' : 
                        atv.type === 'Campeonato' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800' : 
                        'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:border-teal-800'}
                    `}>
                      {atv.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {atv.level}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                    {atv.participants}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {atv.status === 'Em Atividade' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                       atv.status === 'Inscrições' ? <Sparkles className="w-4 h-4 text-amber-500" /> : 
                       <AlertTriangle className="w-4 h-4 text-slate-400" />}
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{atv.status}</span>
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Coord: {atv.coordinator}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-rose-600 transition-colors p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20" title="Ver Participantes">
                      <Eye className="w-5 h-5" />
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
