"use client";

import { useState } from "react";
import { Users, Pencil, Trash2 } from "lucide-react";
import { updateEmployee, deactivateEmployee } from "../actions";

type Employee = {
  id: string;
  name: string;
  cpf: string | null;
  email: string | null;
  isActive: boolean;
  role: { name: string } | null;
  secretariat: { name: string, acronym: string | null } | null;
  department: { name: string } | null;
};

export default function ServidoresClient({ employees }: { employees: Employee[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  const handleEditClick = (emp: Employee) => {
    setEditingId(emp.id);
    setEditForm({ 
      name: emp.name, 
      email: emp.email || ""
    });
  };

  const handleSaveEdit = async () => {
    if (editingId && window.confirm("Tem certeza que deseja salvar estas alterações?")) {
      await updateEmployee(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleDeactivate = async (id: string) => {
    if (window.confirm("Tem certeza que deseja INATIVAR este servidor? O acesso dele será revogado, mas o histórico será mantido.")) {
      await deactivateEmployee(id);
    }
  };

  if (employees.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Users className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando o primeiro servidor.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
          <tr>
            <th className="px-6 py-4">Nome / CPF / Email</th>
            <th className="px-6 py-4">Cargo</th>
            <th className="px-6 py-4">Alocação</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employees.map(emp => (
            <tr key={emp.id} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                {editingId === emp.id ? (
                  <div className="flex flex-col gap-1">
                    <input className="border rounded px-2 py-1 w-full text-sm font-medium" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder="Nome" />
                    <input className="border rounded px-2 py-1 w-full text-xs" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} placeholder="Email" />
                  </div>
                ) : (
                  <>
                    <p className="font-medium text-slate-800">{emp.name}</p>
                    <p className="text-xs text-slate-500">{emp.cpf} • {emp.email || "Sem email"}</p>
                  </>
                )}
              </td>
              <td className="px-6 py-4 text-slate-600">{emp.role?.name || "-"}</td>
              <td className="px-6 py-4">
                <p className="text-slate-700">{emp.secretariat?.acronym || emp.secretariat?.name || "Sem Secretaria"}</p>
                <p className="text-xs text-slate-500">{emp.department?.name || ""}</p>
              </td>
              <td className="px-6 py-4 text-center">
                {emp.isActive ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">Ativo</span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium">Inativo</span>
                )}
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2 items-center h-full pt-6">
                {editingId === emp.id ? (
                  <>
                    <button onClick={handleSaveEdit} className="text-emerald-600 hover:text-emerald-700 font-medium text-xs bg-emerald-50 px-2 py-1 rounded">Salvar</button>
                    <button onClick={() => setEditingId(null)} className="text-slate-500 hover:text-slate-700 font-medium text-xs bg-slate-100 px-2 py-1 rounded">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(emp)} className="text-emerald-600 hover:text-emerald-700 p-1" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {emp.isActive && (
                      <button onClick={() => handleDeactivate(emp.id)} className="text-red-500 hover:text-red-700 p-1" title="Inativar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
