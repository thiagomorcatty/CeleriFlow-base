import React from "react";
import { Calendar as CalendarIcon, Plus, Filter, Search, Edit2, Trash2 } from "lucide-react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export const dynamic = "force-dynamic";

export default async function CalendarioEscolarPage() {
  const { prisma } = await getTenantContextForModule("EDUCACAO");
  const events = await prisma.schoolCalendarEvent.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <CalendarIcon className="h-8 w-8 text-purple-600" />
            Calendário Escolar
          </h1>
          <p className="text-gray-500 mt-2">
            Gestão de dias letivos, feriados, férias e eventos importantes.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="h-5 w-5" />
            Novo Evento
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por título do evento..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none">
            <option value="">Tipo de Evento (Todos)</option>
            <option value="Dia Letivo">Dia Letivo</option>
            <option value="Feriado">Feriado</option>
            <option value="Início de Semestre">Início de Semestre</option>
            <option value="Término de Semestre">Término de Semestre</option>
          </select>
          <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors">
            <Filter className="h-5 w-5" />
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Data(s)</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Evento</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Tipo</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const isPast = new Date(event.endDate || event.date) < new Date();
                return (
                  <tr key={event.id} className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${isPast ? 'opacity-60' : ''}`}>
                    <td className="p-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {new Intl.DateTimeFormat('pt-BR').format(new Date(event.date))}
                        {event.endDate && ` a ${new Intl.DateTimeFormat('pt-BR').format(new Date(event.endDate))}`}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.type === "Feriado" || event.type.includes("Festa")
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : event.type === "Dia Letivo"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {event.type}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Editar">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Excluir">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Nenhum evento cadastrado no calendário.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
