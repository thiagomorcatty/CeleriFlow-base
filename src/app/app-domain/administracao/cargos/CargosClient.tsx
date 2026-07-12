"use client";

import { useState } from "react";
import { Briefcase, Pencil, Trash2, RefreshCw } from "lucide-react";
import { updateRole, deactivateRole, activateRole } from "../actions";

type Role = {
  id: string;
  name: string;
  level: string | null;
  canSign: boolean;
  isActive: boolean;
  _count: { employees: number };
};

export default function CargosClient({ roles }: { roles: Role[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", level: "", canSign: false });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (role.level && role.level.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditClick = (role: Role) => {
    setEditingId(role.id);
    setEditForm({ 
      name: role.name, 
      level: role.level || "",
      canSign: role.canSign
    });
  };

  const handleSaveEdit = async () => {
    if (editingId && window.confirm("Tem certeza que deseja salvar estas alterações?")) {
      await updateRole(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleDeactivate = async (id: string) => {
    if (window.confirm("Tem certeza que deseja INATIVAR este cargo? Ele não será excluído do sistema, apenas desativado.")) {
      await deactivateRole(id);
    }
  };

  const handleActivate = async (id: string) => {
    if (window.confirm("Deseja REATIVAR este cargo?")) {
      await activateRole(id);
    }
  };

  if (roles.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Briefcase className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando o primeiro cargo.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <input 
          type="text" 
          placeholder="Buscar cargo..." 
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full md:w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
          <tr>
            <th className="px-6 py-4">Nome</th>
            <th className="px-6 py-4">Nível</th>
            <th className="px-6 py-4">Pode Assinar?</th>
            <th className="px-6 py-4 text-center">Servidores Vinculados</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredRoles.map(role => (
            <tr key={role.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-800">
                {editingId === role.id ? (
                  <input className="border rounded px-2 py-1 w-full" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                ) : role.name}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === role.id ? (
                  <input className="border rounded px-2 py-1 w-full" value={editForm.level} onChange={e => setEditForm({...editForm, level: e.target.value})} />
                ) : (role.level || "-")}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === role.id ? (
                  <input type="checkbox" className="border rounded" checked={editForm.canSign} onChange={e => setEditForm({...editForm, canSign: e.target.checked})} />
                ) : (
                  role.canSign ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">Sim</span>
                  ) : (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">Não</span>
                  )
                )}
              </td>
              <td className="px-6 py-4 text-slate-600 text-center">{role._count.employees}</td>
              <td className="px-6 py-4 text-center">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${role.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {role.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                {editingId === role.id ? (
                  <>
                    <button onClick={handleSaveEdit} className="text-emerald-600 hover:text-emerald-700 font-medium text-xs bg-emerald-50 px-2 py-1 rounded">Salvar</button>
                    <button onClick={() => setEditingId(null)} className="text-slate-500 hover:text-slate-700 font-medium text-xs bg-slate-100 px-2 py-1 rounded">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(role)} className="text-purple-600 hover:text-purple-700 p-1" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {role.isActive ? (
                      <button onClick={() => handleDeactivate(role.id)} className="text-red-500 hover:text-red-700 p-1" title="Inativar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => handleActivate(role.id)} className="text-emerald-500 hover:text-emerald-700 p-1" title="Reativar">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
          {filteredRoles.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                Nenhum cargo encontrado para "{searchTerm}".
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
}
