"use client";

import { useState } from "react";
import { Calendar, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { updateCalendarEvent, deleteCalendarEvent } from "../actions";

type CalendarEvent = {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  isHoliday: boolean;
  type: string;
};

export default function CalendarioClient({ events }: { events: CalendarEvent[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ title: string, description: string, date: string, type: string, isHoliday: boolean }>({
    title: "", description: "", date: "", type: "", isHoliday: false
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    event.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (event: CalendarEvent) => {
    setEditingId(event.id);
    setEditForm({
      title: event.title,
      description: event.description || "",
      date: new Date(event.date).toISOString().split('T')[0],
      type: event.type,
      isHoliday: event.isHoliday
    });
  };

  const handleSaveEdit = async () => {
    if (editingId && window.confirm("Tem certeza que deseja salvar estas alterações?")) {
      const dataToSave = {
        title: editForm.title,
        description: editForm.description,
        // using the simple date string allows prisma to receive a correct date object without timezone shifts
        date: new Date(`${editForm.date}T12:00:00Z`), 
        type: editForm.type,
        isHoliday: editForm.isHoliday
      };
      await updateCalendarEvent(editingId, dataToSave);
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este evento permanentemente?")) {
      await deleteCalendarEvent(id);
    }
  };

  if (events.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Calendar className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum evento encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando o primeiro evento ao calendário.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <input 
          type="text" 
          placeholder="Buscar evento..." 
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full md:w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
            <tr>
              <th className="px-6 py-4 w-40">Data</th>
              <th className="px-6 py-4">Evento</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEvents.map(event => (
              <tr key={event.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-slate-800 font-medium">
                  {editingId === event.id ? (
                    <input 
                      type="date"
                      className="border rounded px-2 py-1 w-full" 
                      value={editForm.date} 
                      onChange={e => setEditForm({...editForm, date: e.target.value})} 
                    />
                  ) : (
                    format(new Date(event.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === event.id ? (
                    <div className="flex flex-col gap-2">
                      <input 
                        type="text"
                        placeholder="Título do evento"
                        className="border rounded px-2 py-1 w-full" 
                        value={editForm.title} 
                        onChange={e => setEditForm({...editForm, title: e.target.value})} 
                      />
                      <input 
                        type="text"
                        placeholder="Descrição (opcional)"
                        className="border rounded px-2 py-1 w-full text-xs" 
                        value={editForm.description} 
                        onChange={e => setEditForm({...editForm, description: e.target.value})} 
                      />
                    </div>
                  ) : (
                    <>
                      <p className="font-medium text-slate-800">{event.title}</p>
                      <p className="text-xs text-slate-500">{event.description || ""}</p>
                    </>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === event.id ? (
                    <div className="flex flex-col gap-2">
                      <select 
                        className="border rounded px-2 py-1 w-full" 
                        value={editForm.type} 
                        onChange={e => setEditForm({...editForm, type: e.target.value})}
                      >
                        <option value="Feriado Nacional">Feriado Nacional</option>
                        <option value="Feriado Estadual">Feriado Estadual</option>
                        <option value="Feriado Municipal">Feriado Municipal</option>
                        <option value="Ponto Facultativo">Ponto Facultativo</option>
                        <option value="Expediente Especial">Expediente Especial</option>
                        <option value="Outro">Outro</option>
                      </select>
                      <label className="flex items-center gap-2 text-xs">
                        <input 
                          type="checkbox" 
                          checked={editForm.isHoliday}
                          onChange={e => setEditForm({...editForm, isHoliday: e.target.checked})}
                        />
                        É Feriado?
                      </label>
                    </div>
                  ) : (
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      event.isHoliday ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {event.type}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === event.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={handleSaveEdit} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" title="Salvar">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded" title="Cancelar">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEditClick(event)} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(event.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Excluir">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredEvents.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  Nenhum evento encontrado para "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
