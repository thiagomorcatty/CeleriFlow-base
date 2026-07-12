"use client";

import { useState } from "react";
import { Building2, Pencil, Trash2 } from "lucide-react";
import { updateSecretariat, deactivateSecretariat } from "../actions";

type Secretariat = {
  id: string;
  name: string;
  acronym: string | null;
  managerName: string | null;
  isActive: boolean;
  _count: { departments: number };
};

export default function SecretariasClient({ secretariats }: { secretariats: Secretariat[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", acronym: "", managerName: "" });
  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const handleEditClick = (sec: Secretariat) => {
    setEditingId(sec.id);
    setEditForm({ 
      name: sec.name, 
      acronym: sec.acronym || "", 
      managerName: sec.managerName || "" 
    });
  };

  const handleSaveEdit = async () => {
    if (editingId && window.confirm("Tem certeza que deseja salvar estas alterações?")) {
      await updateSecretariat(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleDeactivate = async (id: string) => {
    if (window.confirm("Tem certeza que deseja INATIVAR esta secretaria? Ela não será excluída do sistema, apenas desativada.")) {
      await deactivateSecretariat(id);
      setDeactivatingId(null);
    }
  };

  if (secretariats.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Building2 className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando a primeira secretaria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
          <tr>
            <th className="px-6 py-4">Nome</th>
            <th className="px-6 py-4">Sigla</th>
            <th className="px-6 py-4">Responsável</th>
            <th className="px-6 py-4 text-center">Departamentos</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {secretariats.map(sec => (
            <tr key={sec.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-800">
                {editingId === sec.id ? (
                  <input className="border rounded px-2 py-1 w-full" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                ) : sec.name}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === sec.id ? (
                  <input className="border rounded px-2 py-1 w-full" value={editForm.acronym} onChange={e => setEditForm({...editForm, acronym: e.target.value})} />
                ) : (sec.acronym || "-")}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === sec.id ? (
                  <input className="border rounded px-2 py-1 w-full" value={editForm.managerName} onChange={e => setEditForm({...editForm, managerName: e.target.value})} />
                ) : (sec.managerName || "-")}
              </td>
              <td className="px-6 py-4 text-slate-600 text-center">{sec._count.departments}</td>
              <td className="px-6 py-4 text-center">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${sec.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {sec.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                {editingId === sec.id ? (
                  <>
                    <button onClick={handleSaveEdit} className="text-emerald-600 hover:text-emerald-700 font-medium text-xs bg-emerald-50 px-2 py-1 rounded">Salvar</button>
                    <button onClick={() => setEditingId(null)} className="text-slate-500 hover:text-slate-700 font-medium text-xs bg-slate-100 px-2 py-1 rounded">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(sec)} className="text-blue-600 hover:text-blue-700 p-1" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {sec.isActive && (
                      <button onClick={() => handleDeactivate(sec.id)} className="text-red-500 hover:text-red-700 p-1" title="Inativar">
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
