"use client";

import { useState } from "react";
import { Network, Pencil, Trash2, RefreshCw } from "lucide-react";
import { updateDepartment, deactivateDepartment, activateDepartment } from "../actions";

type Department = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  secretariat: { name: string };
};

export default function DepartamentosClient({ 
  departments, 
  secretariats 
}: { 
  departments: Department[],
  secretariats: { id: string, name: string }[]
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", secretariatId: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepartments = departments.filter(dep => 
    dep.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (dep.description && dep.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    dep.secretariat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (dep: Department) => {
    setEditingId(dep.id);
    setEditForm({ 
      name: dep.name, 
      description: dep.description || "",
      secretariatId: secretariats.find(s => s.name === dep.secretariat.name)?.id || ""
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

  const handleActivate = async (id: string) => {
    if (window.confirm("Deseja REATIVAR este departamento?")) {
      await activateDepartment(id);
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
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <input 
          type="text" 
          placeholder="Buscar departamento..." 
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full md:w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
          <tr>
            <th className="px-6 py-4">Nome</th>
            <th className="px-6 py-4">Descrição</th>
            <th className="px-6 py-4">Secretaria Vinculada</th>
            <th className="px-6 py-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredDepartments.map(dep => (
            <tr key={dep.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-800">
                {editingId === dep.id ? (
                  <input className="border rounded px-2 py-1 w-full" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                ) : dep.name}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === dep.id ? (
                  <select 
                    className="border rounded px-2 py-1 w-full" 
                    value={editForm.secretariatId} 
                    onChange={e => setEditForm({...editForm, secretariatId: e.target.value})}
                  >
                    <option value="" disabled>Selecione uma secretaria...</option>
                    {secretariats.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                ) : dep.secretariat.name}
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${dep.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {dep.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </td>
            </tr>
          ))}
          {filteredDepartments.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                Nenhum departamento encontrado para "{searchTerm}".
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
}
