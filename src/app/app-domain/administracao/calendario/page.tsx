import { prisma } from "@/lib/prisma";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function CalendarioPage() {
  const events = await prisma.calendarEvent.findMany({
    orderBy: { date: 'asc' }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Calendário Institucional</h1>
          <p className="text-slate-500 mt-1">Gerencie os registros de calendário institucional.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm">
          Adicionar Novo
        </button>
      </div>
      
      {events.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Calendar className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhum evento encontrado</h3>
          <p className="text-slate-500 mt-1">Comece adicionando o primeiro evento ao calendário.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Evento</th>
                <th className="px-6 py-4">Tipo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map(event => (
                <tr key={event.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-800 font-medium">
                    {format(new Date(event.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.description || ""}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      event.isHoliday ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {event.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
