import React from "react";
import { Search, Plus, MapPin, Calendar, Clock, User, CheckCircle2, AlertTriangle, Cross } from "lucide-react";

export default function EspacosReservasPage() {
  const reservas = [
    { id: 1, space: "Quadra Poliesportiva Central", activity: "Treino de Futsal Sub-15", time: "18:00 - 20:00", date: "Hoje", status: "Confirmado", requester: "Assoc. Bairro Centro" },
    { id: 2, space: "Anfiteatro da Praça", activity: "Ensaio Geral Grupo Teatral", time: "14:00 - 17:00", date: "18/07/2026", status: "Confirmado", requester: "Cia. de Teatro Luz e Cena" },
    { id: 3, space: "Campo de Futebol Vila Nova", activity: "Abertura Campeonato Varzeano", time: "09:00 - 12:00", date: "19/07/2026", status: "Pendente", requester: "Depto. Esportes" },
    { id: 4, space: "Auditório da Biblioteca", activity: "Lançamento de Livro Local", time: "19:30 - 21:30", date: "22/07/2026", status: "Confirmado", requester: "Escritora Paula Ferreira" },
    { id: 5, space: "Quadra Poliesportiva Central", activity: "Manutenção de Refletores", time: "08:00 - 12:00", date: "20/07/2026", status: "Bloqueado", requester: "Sec. de Obras" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Espaços e Reservas</h1>
          <p className="text-slate-500 dark:text-slate-400">Reserva de quadras, anfiteatros, auditórios e campos de futebol públicos para ensaios, treinos e eventos.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm">
          <Plus className="w-4 h-4" />
          Solicitar Reserva
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por espaço, solicitante ou atividade..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos os Espaços</option>
              <option>Quadra Central</option>
              <option>Anfiteatro</option>
              <option>Campo Vila Nova</option>
              <option>Auditório Biblioteca</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Espaço Público</th>
                <th className="px-6 py-4 font-medium">Atividade Prevista</th>
                <th className="px-6 py-4 font-medium">Horário / Data</th>
                <th className="px-6 py-4 font-medium">Solicitante</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {reservas.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      {res.space}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Reserva: #EV-{3026000 + res.id}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {res.activity}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-950 dark:text-white flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {res.date}
                    </div>
                    <div className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {res.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mt-2">
                    <User className="w-4 h-4 text-slate-400" />
                    {res.requester}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                      ${res.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-700' : 
                        res.status === 'Pendente' ? 'bg-amber-100 text-amber-700' : 
                        'bg-red-100 text-red-700'}
                    `}>
                      {res.status === 'Confirmado' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">Confirmar</button>
                      <button className="text-xs font-semibold text-red-500 hover:text-red-600">Recusar</button>
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
