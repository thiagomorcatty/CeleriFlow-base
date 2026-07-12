"use client";

import { useState } from "react";
import { Building, Pencil } from "lucide-react";
import { updateAdministrativeUnit } from "../actions";

type Unit = {
  id: string;
  name: string;
  type: string;
  managerName: string | null;
  secretariatId: string;
  secretariat: { name: string } | null;
};

export default function UnidadesClient({ 
  units, 
  secretariats 
}: { 
  units: Unit[],
  secretariats: { id: string, name: string }[]
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", type: "", managerName: "", secretariatId: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUnits = units.filter(unit => 
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    unit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (unit.managerName && unit.managerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (unit.secretariat?.name && unit.secretariat.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditClick = (unit: Unit) => {
    setEditingId(unit.id);
    setEditForm({ 
      name: unit.name, 
      type: unit.type,
      managerName: unit.managerName || "",
      secretariatId: unit.secretariatId || secretariats[0]?.id || ""
    });
  };

  const handleSaveEdit = async () => {
    if (editingId && window.confirm("Tem certeza que deseja salvar estas alterações?")) {
      await updateAdministrativeUnit(editingId, editForm);
      setEditingId(null);
    }
  };

  if (units.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Building className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando a primeira unidade.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <input 
          type="text" 
          placeholder="Buscar unidade..." 
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full md:w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
            <tr>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4">Secretaria Vinculada</th>
              <th className="px-6 py-4">Responsável</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUnits.map(unit => (
              <tr key={unit.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-800">
                  {editingId === unit.id ? (
                    <input className="border rounded px-2 py-1 w-full" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                  ) : unit.name}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === unit.id ? (
                    <input className="border rounded px-2 py-1 w-full" value={editForm.type} onChange={e => setEditForm({...editForm, type: e.target.value})} />
                  ) : (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">{unit.type}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === unit.id ? (
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
                  ) : unit.secretariat?.name || "-"}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === unit.id ? (
                    <input className="border rounded px-2 py-1 w-full" value={editForm.managerName} onChange={e => setEditForm({...editForm, managerName: e.target.value})} />
                  ) : unit.managerName || "-"}
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  {editingId === unit.id ? (
                    <>
                      <button onClick={handleSaveEdit} className="text-emerald-600 hover:text-emerald-700 font-medium text-xs bg-emerald-50 px-2 py-1 rounded">Salvar</button>
                      <button onClick={() => setEditingId(null)} className="text-slate-500 hover:text-slate-700 font-medium text-xs bg-slate-100 px-2 py-1 rounded">Cancelar</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(unit)} className="text-amber-600 hover:text-amber-700 p-1" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredUnits.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  Nenhuma unidade encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
