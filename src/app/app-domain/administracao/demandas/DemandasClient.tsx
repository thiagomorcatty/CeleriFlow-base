"use client";

import { useState } from "react";
import { ClipboardList, Pencil, CheckCircle, XCircle } from "lucide-react";
import { updateInternalDemand } from "../actions";

type Demand = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assigneeId: string | null;
  secretariatId: string | null;
  departmentId: string | null;
  assignee: { name: string } | null;
  creator: { name: string } | null;
  secretariat: { name: string } | null;
  department: { name: string } | null;
};

export default function DemandasClient({ 
  demands,
  secretariats,
  departments,
  employees
}: { 
  demands: Demand[],
  secretariats: { id: string, name: string }[],
  departments: { id: string, name: string }[],
  employees: { id: string, name: string }[]
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ 
    title: "", 
    status: "", 
    priority: "", 
    assigneeId: "",
    secretariatId: "",
    departmentId: ""
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const filteredDemands = demands.filter(demand => {
    const matchesSearch = 
      demand.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (demand.description && demand.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (demand.assignee?.name && demand.assignee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (demand.creator?.name && demand.creator.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === "Todos" || demand.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditClick = (demand: Demand) => {
    setEditingId(demand.id);
    setEditForm({ 
      title: demand.title, 
      status: demand.status,
      priority: demand.priority,
      assigneeId: demand.assigneeId || "",
      secretariatId: demand.secretariatId || "",
      departmentId: demand.departmentId || ""
    });
  };

  const handleSaveEdit = async () => {
    if (editingId && window.confirm("Tem certeza que deseja salvar estas alterações?")) {
      await updateInternalDemand(editingId, {
        ...editForm,
        assigneeId: editForm.assigneeId || null,
        secretariatId: editForm.secretariatId || null,
        departmentId: editForm.departmentId || null
      });
      setEditingId(null);
    }
  };

  const handleChangeStatus = async (id: string, newStatus: string) => {
    const demand = demands.find(d => d.id === id);
    if (!demand) return;
    
    const confirmMsg = newStatus === "Concluída" ? "Deseja concluir esta demanda?" : "Deseja inativar/cancelar esta demanda?";
    if (window.confirm(confirmMsg)) {
      await updateInternalDemand(id, {
        title: demand.title,
        status: newStatus,
        priority: demand.priority,
        assigneeId: demand.assigneeId,
        secretariatId: demand.secretariatId,
        departmentId: demand.departmentId
      });
    }
  };

  if (demands.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <ClipboardList className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando o primeiro registro.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-end gap-3">
        <select 
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Todos">Todos os Status</option>
          <option value="Aberta">Aberta</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
          <option value="Cancelada">Cancelada</option>
        </select>
        <input 
          type="text" 
          placeholder="Buscar por título, responsável..." 
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full md:w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[800px]">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
            <tr>
              <th className="px-6 py-4">Título</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Prioridade</th>
              <th className="px-6 py-4">Responsável/Criador</th>
              <th className="px-6 py-4">Setor/Secretaria</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredDemands.map(demand => (
              <tr key={demand.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 min-w-[200px]">
                  {editingId === demand.id ? (
                    <input className="border rounded px-2 py-1 w-full" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                  ) : (
                    <>
                      <p className="font-medium text-slate-800">{demand.title}</p>
                      <p className="text-xs text-slate-500">{demand.description || ""}</p>
                    </>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === demand.id ? (
                    <select className="border rounded px-2 py-1 w-full" value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})}>
                      <option value="Aberta">Aberta</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Concluída">Concluída</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      demand.status === 'Concluída' ? 'bg-green-100 text-green-700' :
                      demand.status === 'Em andamento' ? 'bg-blue-100 text-blue-700' :
                      demand.status === 'Cancelada' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {demand.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                   {editingId === demand.id ? (
                    <select className="border rounded px-2 py-1 w-full" value={editForm.priority} onChange={e => setEditForm({...editForm, priority: e.target.value})}>
                      <option value="Baixa">Baixa</option>
                      <option value="Normal">Normal</option>
                      <option value="Alta">Alta</option>
                      <option value="Urgente">Urgente</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      demand.priority === 'Alta' || demand.priority === 'Urgente' ? 'bg-red-100 text-red-700' :
                      demand.priority === 'Normal' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {demand.priority}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 min-w-[200px]">
                  {editingId === demand.id ? (
                    <select className="border rounded px-2 py-1 w-full text-xs" value={editForm.assigneeId} onChange={e => setEditForm({...editForm, assigneeId: e.target.value})}>
                      <option value="">Sem Responsável</option>
                      {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                    </select>
                  ) : (
                    <>
                      <p className="text-slate-700">{demand.assignee?.name || "Sem Responsável"}</p>
                      <p className="text-xs text-slate-500">Criador: {demand.creator?.name || "-"}</p>
                    </>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === demand.id ? (
                    <div className="flex flex-col gap-1">
                      <select className="border rounded px-2 py-1 w-full text-xs" value={editForm.secretariatId} onChange={e => setEditForm({...editForm, secretariatId: e.target.value})}>
                        <option value="">Nenhuma Sec.</option>
                        {secretariats.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                      <select className="border rounded px-2 py-1 w-full text-xs" value={editForm.departmentId} onChange={e => setEditForm({...editForm, departmentId: e.target.value})}>
                        <option value="">Nenhum Dept.</option>
                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                  ) : (
                    demand.secretariat?.name || demand.department?.name || "-"
                  )}
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  {editingId === demand.id ? (
                    <>
                      <button onClick={handleSaveEdit} className="text-emerald-600 hover:text-emerald-700 font-medium text-xs bg-emerald-50 px-2 py-1 rounded">Salvar</button>
                      <button onClick={() => setEditingId(null)} className="text-slate-500 hover:text-slate-700 font-medium text-xs bg-slate-100 px-2 py-1 rounded">Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(demand)} className="text-amber-600 hover:text-amber-700 p-1" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      {demand.status !== 'Concluída' && (
                        <button onClick={() => handleChangeStatus(demand.id, "Concluída")} className="text-emerald-600 hover:text-emerald-700 p-1" title="Concluir">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {demand.status !== 'Cancelada' && (
                        <button onClick={() => handleChangeStatus(demand.id, "Cancelada")} className="text-red-500 hover:text-red-700 p-1" title="Inativar/Cancelar">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredDemands.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  Nenhuma demanda encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
