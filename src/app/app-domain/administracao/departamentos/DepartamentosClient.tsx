"use client";

import { useState } from "react";
import { Network, Pencil, Trash2 } from "lucide-react";
import { updateDepartment, deactivateDepartment } from "../actions";

type Department = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  secretariat: { name: string };
};

export default function DepartamentosClient({ departments }: { departments: Department[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const handleEditClick = (dep: Department) => {
    setEditingId(dep.id);
    setEditForm({ 
      name: dep.name, 
      description: dep.description || "" 
    });
  };

  const handleSaveEdit = async () => {
    if (editingId && window.confirm("Tem certeza que deseja salvar estas alterações?")) {
      await updateDepartment(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleDeactivate = async (id: string) => {
    if (window.confirm("Tem certeza que deseja INATIVAR este departamento? Ele não será excluído do sistema, apenas desativado.")) {
      await deactivateDepartment(id);
    }
  };

  if (departments.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Network className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando o primeiro departamento.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
          <tr>
            <th className="px-6 py-4">Nome</th>
            <th className="px-6 py-4">Descrição</th>
            <th className="px-6 py-4">Secretaria Vinculada</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {departments.map(dep => (
            <tr key={dep.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-800">
                {editingId === dep.id ? (
                  <input className="border rounded px-2 py-1 w-full" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                ) : dep.name}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === dep.id ? (
                  <input className="border rounded px-2 py-1 w-full" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                ) : (dep.description || "-")}
              </td>
              <td className="px-6 py-4 text-slate-600">{dep.secretariat.name}</td>
              <td className="px-6 py-4 text-center">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${dep.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {dep.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                {editingId === dep.id ? (
                  <>
                    <button onClick={handleSaveEdit} className="text-emerald-600 hover:text-emerald-700 font-medium text-xs bg-emerald-50 px-2 py-1 rounded">Salvar</button>
                    <button onClick={() => setEditingId(null)} className="text-slate-500 hover:text-slate-700 font-medium text-xs bg-slate-100 px-2 py-1 rounded">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(dep)} className="text-amber-600 hover:text-amber-700 p-1" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {dep.isActive && (
                      <button onClick={() => handleDeactivate(dep.id)} className="text-red-500 hover:text-red-700 p-1" title="Inativar">
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
