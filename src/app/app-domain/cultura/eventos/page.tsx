import React from "react";
import { Search, Plus, Calendar, MapPin, Users, Ticket, CheckCircle2, Clock, Eye } from "lucide-react";

export default function EventosPage() {
  const eventos = [
    { id: 1, type: "Cultural", title: "Festival de Inverno da Cidade", date: "15/08/2026 - 18/08/2026", location: "Praça Central / Anfiteatro", status: "Confirmado", expectedPublic: "5.000 pessoas", organizer: "Sec. Cultura" },
    { id: 2, type: "Cultural", title: "Mostra de Cinema Local", date: "22/07/2026", location: "Auditório da Biblioteca", status: "Confirmado", expectedPublic: "150 pessoas", organizer: "Coletivo Audiovisual" },
    { id: 3, type: "Esportivo", title: "Rústica de Aniversário do Município", date: "12/10/2026", location: "Principais vias do Centro", status: "Planejado", expectedPublic: "800 atletas", organizer: "Sec. Esportes" },
    { id: 4, type: "Cultural", title: "Feira do Livro 2026", date: "05/11/2026 - 10/11/2026", location: "Praça da Matriz", status: "Planejado", expectedPublic: "10.000 pessoas", organizer: "Gabinete & Educação" },
    { id: 5, type: "Cultural", title: "Apresentação Coral de Natal", date: "20/12/2026", location: "Igreja Matriz", status: "Confirmado", expectedPublic: "300 pessoas", organizer: "Assoc. Amigos da Música" }
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Eventos Oficiais</h1>
          <p className="text-slate-500 dark:text-slate-400">Planejamento, agenda e estimativa de público de festividades, espetáculos e campeonatos esportivos municipais.</p>
        </div>
        <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium shadow-sm">
          <Plus className="w-4 h-4" />
          Novo Evento
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por nome do evento, local ou organizador..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none w-full sm:w-auto">
              <option>Todos os Segmentos</option>
              <option>Culturais</option>
              <option>Esportivos</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Nome do Evento</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Data / Período</th>
                <th className="px-6 py-4 font-medium">Localização</th>
                <th className="px-6 py-4 font-medium">Público / Organizador</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ficha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
              {eventos.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-amber-500" />
                      {evt.title}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Ref: #EV-{4026000 + evt.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border
                      ${evt.type === 'Cultural' ? 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:border-pink-800' : 
                        'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800'}
                    `}>
                      {evt.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {evt.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {evt.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 dark:text-white font-semibold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {evt.expectedPublic}
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5">{evt.organizer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                      ${evt.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}
                    `}>
                      {evt.status === 'Confirmado' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {evt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20" title="Ver Detalhes">
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
