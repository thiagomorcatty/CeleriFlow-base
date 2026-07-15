"use client";

import { useState } from "react";
import { Users, Pencil, Trash2, RefreshCw, CheckCircle, XCircle, Plus, Search, AlertCircle } from "lucide-react";
import { createHealthTeam, updateHealthTeam, toggleHealthTeamStatus, deleteHealthTeam } from "./actions";

type HealthUnit = {
  id: string;
  name: string;
};

type HealthTeam = {
  id: string;
  name: string;
  code: string | null;
  microarea: string | null;
  unitId: string;
  unit: HealthUnit;
  isActive: boolean;
};

export default function EquipesClient({ teams, units }: { teams: HealthTeam[], units: HealthUnit[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<HealthTeam>>({
    name: "", code: "", microarea: "", unitId: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (t.code && t.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ name: "", code: "", microarea: "", unitId: units[0]?.id || "" });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const openEditModal = (team: HealthTeam) => {
    setEditingId(team.id);
    setFormData({
      name: team.name,
      code: team.code,
      microarea: team.microarea || "",
      unitId: team.unitId
    });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    let res;
    if (editingId) {
      res = await updateHealthTeam(editingId, formData);
    } else {
      res = await createHealthTeam(formData);
    }

    setIsSaving(false);
    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    if (confirm(`Deseja realmente ${currentStatus ? 'inativar' : 'reativar'} esta equipe?`)) {
      const res = await toggleHealthTeamStatus(id, !currentStatus);
      if (res.error) alert(res.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja EXCLUIR definitivamente esta equipe?")) {
      const res = await deleteHealthTeam(id);
      if (res.error) alert(res.error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Barra de Ações e Busca */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="Pesquisar por nome ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Equipe
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Nome da Equipe</th>
              <th className="p-4 font-semibold text-gray-600">Código</th>
              <th className="p-4 font-semibold text-gray-600">Microárea</th>
              <th className="p-4 font-semibold text-gray-600">Unidade</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTeams.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <Users className="h-10 w-10 text-gray-300 mb-2" />
                    <p>Nenhuma equipe encontrada.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTeams.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-gray-900">{item.name}</td>
                  <td className="p-4 text-gray-600">{item.code}</td>
                  <td className="p-4 text-gray-600">{item.microarea || '-'}</td>
                  <td className="p-4 text-gray-600">{item.unit?.name}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.isActive ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <button onClick={() => openEditModal(item)} className="text-gray-400 hover:text-emerald-600 p-1 rounded hover:bg-emerald-50" title="Editar">
                      <Pencil className="h-4 w-4" />
                    </button>
                    {item.isActive ? (
                      <button onClick={() => handleToggleStatus(item.id, true)} className="text-gray-400 hover:text-orange-600 p-1 rounded hover:bg-orange-50" title="Inativar">
                        <XCircle className="h-4 w-4" />
                      </button>
                    ) : (
                      <button onClick={() => handleToggleStatus(item.id, false)} className="text-gray-400 hover:text-green-600 p-1 rounded hover:bg-green-50" title="Reativar">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50" title="Excluir">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                {editingId ? "Editar Equipe" : "Nova Equipe ESF"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Fechar</span>
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6">
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center gap-2 text-sm">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unidade Vinculada *</label>
                  <select
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white"
                    value={formData.unitId}
                    onChange={e => setFormData({...formData, unitId: e.target.value})}
                  >
                    <option value="" disabled>Selecione uma unidade</option>
                    {units.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome da Equipe *</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Código *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: ESF-01"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      value={formData.code || ''}
                      onChange={e => setFormData({...formData, code: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Microárea</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      value={formData.microarea || ''}
                      onChange={e => setFormData({...formData, microarea: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none disabled:opacity-50"
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
