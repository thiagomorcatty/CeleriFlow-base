"use client";

import { useState } from "react";
import { Search, Plus, MoreVertical, Home, Pencil, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { updateRealEstate, deactivateRealEstate, activateRealEstate, createRealEstate } from "./actions";

type RealEstate = {
  id: string;
  municipalInsc: string | null;
  streetName: string | null;
  number: string | null;
  landArea: number | null;
  builtArea: number | null;
  status: string;
  taxpayer: {
    person: { fullName: string } | null;
    company: { corporateName: string } | null;
  } | null;
};

export default function ImoveisClient({ imoveis }: { imoveis: RealEstate[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<RealEstate>>({});
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    municipalInsc: "",
    streetName: "",
    number: "",
    propertyType: "Terreno",
    landArea: 0,
    builtArea: 0
  });

  const handleEditClick = (re: RealEstate) => {
    setEditingId(re.id);
    setEditForm({
      municipalInsc: re.municipalInsc,
      streetName: re.streetName,
      number: re.number,
      landArea: re.landArea,
      builtArea: re.builtArea
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    if (confirm("Deseja salvar as alterações?")) {
      try {
        await updateRealEstate(editingId, editForm as any);
        setEditingId(null);
      } catch (e) {
        console.error(e);
        alert("Erro ao salvar alterações.");
      }
    }
  };

  const handleDeactivate = async (id: string) => {
    if (confirm("Deseja inativar este imóvel?")) {
      await deactivateRealEstate(id);
    }
  };

  const handleActivate = async (id: string) => {
    if (confirm("Deseja reativar este imóvel?")) {
      await activateRealEstate(id);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRealEstate(createForm);
      setIsCreateModalOpen(false);
      setCreateForm({ municipalInsc: "", streetName: "", number: "", propertyType: "Terreno", landArea: 0, builtArea: 0 });
    } catch (err) {
      console.error(err);
      alert("Erro ao criar imóvel.");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Home className="w-6 h-6 text-emerald-600" />
            Imóveis Fiscais
          </h1>
          <p className="text-slate-500 mt-1">Cadastro de imóveis para controle de IPTU, ITBI e taxas.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Imóvel
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por inscrição imobiliária ou endereço..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>
        </div>

        {imoveis.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Home className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum imóvel cadastrado</h3>
            <p className="text-slate-500 mt-1">Os imóveis cadastrados no sistema aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Inscrição Imobiliária</th>
                  <th className="px-6 py-3">Endereço Principal</th>
                  <th className="px-6 py-3">Proprietário</th>
                  <th className="px-6 py-3">Área (m²)</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {imoveis.map((imovel) => (
                  <tr key={imovel.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {editingId === imovel.id ? (
                        <input
                          type="text"
                          value={editForm.municipalInsc || ""}
                          onChange={(e) => setEditForm({ ...editForm, municipalInsc: e.target.value })}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        imovel.municipalInsc || "-"
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {editingId === imovel.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editForm.streetName || ""}
                            onChange={(e) => setEditForm({ ...editForm, streetName: e.target.value })}
                            className="w-2/3 border rounded px-2 py-1 text-xs"
                            placeholder="Rua"
                          />
                          <input
                            type="text"
                            value={editForm.number || ""}
                            onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
                            className="w-1/3 border rounded px-2 py-1 text-xs"
                            placeholder="Nº"
                          />
                        </div>
                      ) : (
                        imovel.streetName ? `${imovel.streetName}, ${imovel.number}` : "Endereço não informado"
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {imovel.taxpayer?.company?.corporateName || imovel.taxpayer?.person?.fullName || "Não Informado"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {editingId === imovel.id ? (
                        <div className="flex gap-2 text-xs">
                          T:
                          <input
                            type="number"
                            value={editForm.landArea || 0}
                            onChange={(e) => setEditForm({ ...editForm, landArea: Number(e.target.value) })}
                            className="w-16 border rounded px-1 py-1 text-xs"
                          />
                          C:
                          <input
                            type="number"
                            value={editForm.builtArea || 0}
                            onChange={(e) => setEditForm({ ...editForm, builtArea: Number(e.target.value) })}
                            className="w-16 border rounded px-1 py-1 text-xs"
                          />
                        </div>
                      ) : (
                        <div className="text-xs">
                          T: {imovel.landArea || 0}m²
                          <br/>
                          C: {imovel.builtArea || 0}m²
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        imovel.status === 'Regular' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {imovel.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingId === imovel.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={handleSaveEdit} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" title="Salvar">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => setEditingId(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded" title="Cancelar">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEditClick(imovel)} className="p-1 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded" title="Editar">
                            <Pencil className="w-4 h-4" />
                          </button>
                          {imovel.status === 'Regular' ? (
                            <button onClick={() => handleDeactivate(imovel.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Inativar">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <button onClick={() => handleActivate(imovel.id)} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Reativar">
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Novo Imóvel Fiscal</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Inscrição Imobiliária</label>
                <input 
                  type="text" 
                  required
                  value={createForm.municipalInsc}
                  onChange={(e) => setCreateForm({...createForm, municipalInsc: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rua</label>
                  <input 
                    type="text"
                    required
                    value={createForm.streetName}
                    onChange={(e) => setCreateForm({...createForm, streetName: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nº</label>
                  <input 
                    type="text"
                    required
                    value={createForm.number}
                    onChange={(e) => setCreateForm({...createForm, number: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Área Terreno (m²)</label>
                  <input 
                    type="number"
                    value={createForm.landArea}
                    onChange={(e) => setCreateForm({...createForm, landArea: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Área Construída (m²)</label>
                  <input 
                    type="number"
                    value={createForm.builtArea}
                    onChange={(e) => setCreateForm({...createForm, builtArea: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
