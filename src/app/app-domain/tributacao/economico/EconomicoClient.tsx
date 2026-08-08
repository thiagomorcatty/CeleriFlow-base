"use client";

import { useState } from "react";
import { Search, Plus, Building2, Pencil, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { createEconomicRegistration, updateEconomicRegistration, deactivateEconomicRegistration, activateEconomicRegistration } from "./actions";

type Registration = {
  id: string;
  municipalInsc: string;
  primaryCnae: string | null;
  taxRegime: string | null;
  status: string;
  taxpayer: {
    id: string;
    person: { fullName: string; cpf: string } | null;
    company: { corporateName: string; cnpj: string } | null;
  };
};

type RegistrationUpdate = {
  municipalInsc?: string;
  primaryCnae?: string | null;
  taxRegime?: string | null;
};

type Taxpayer = {
  id: string;
  name: string;
};

export default function EconomicoClient({ 
  registrations,
  taxpayers
}: { 
  registrations: Registration[];
  taxpayers: Taxpayer[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<RegistrationUpdate>({});
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    municipalInsc: "",
    primaryCnae: "",
    taxRegime: "Simples Nacional",
    taxpayerId: taxpayers[0]?.id || ""
  });

  const handleEditClick = (reg: Registration) => {
    setEditingId(reg.id);
    setEditForm({
      municipalInsc: reg.municipalInsc,
      primaryCnae: reg.primaryCnae,
      taxRegime: reg.taxRegime
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    if (confirm("Deseja salvar as alterações?")) {
      try {
        await updateEconomicRegistration(editingId, editForm);
        setEditingId(null);
      } catch (e) {
        console.error(e);
        alert("Erro ao salvar alterações.");
      }
    }
  };

  const handleDeactivate = async (id: string) => {
    if (confirm("Deseja inativar esta inscrição?")) {
      await deactivateEconomicRegistration(id);
    }
  };

  const handleActivate = async (id: string) => {
    if (confirm("Deseja reativar esta inscrição?")) {
      await activateEconomicRegistration(id);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.taxpayerId) {
      alert("Selecione um contribuinte válido.");
      return;
    }
    try {
      await createEconomicRegistration(createForm);
      setIsCreateModalOpen(false);
      setCreateForm({ 
        municipalInsc: "", 
        primaryCnae: "", 
        taxRegime: "Simples Nacional", 
        taxpayerId: taxpayers[0]?.id || "" 
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao criar inscrição.");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" />
            Cadastro Econômico
          </h1>
          <p className="text-slate-500 mt-1">Inscrições municipais de empresas e autônomos.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Inscrição
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por inscrição ou nome..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
            />
          </div>
        </div>

        {registrations.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Building2 className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum cadastro econômico</h3>
            <p className="text-slate-500 mt-1">Ainda não existem inscrições municipais cadastradas no sistema.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Inscrição Municipal</th>
                  <th className="px-6 py-3">Contribuinte</th>
                  <th className="px-6 py-3">CNAE Principal</th>
                  <th className="px-6 py-3">Regime</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {editingId === reg.id ? (
                        <input
                          type="text"
                          value={editForm.municipalInsc || ""}
                          onChange={(e) => setEditForm({ ...editForm, municipalInsc: e.target.value })}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        reg.municipalInsc
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {reg.taxpayer.company?.corporateName || reg.taxpayer.person?.fullName || "Não Identificado"}
                      <div className="text-xs text-slate-400 font-normal mt-0.5">
                        {reg.taxpayer.company?.cnpj || reg.taxpayer.person?.cpf || ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {editingId === reg.id ? (
                        <input
                          type="text"
                          value={editForm.primaryCnae || ""}
                          onChange={(e) => setEditForm({ ...editForm, primaryCnae: e.target.value })}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        reg.primaryCnae || "-"
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {editingId === reg.id ? (
                        <select
                          value={editForm.taxRegime || ""}
                          onChange={(e) => setEditForm({ ...editForm, taxRegime: e.target.value })}
                          className="w-full border rounded px-2 py-1"
                        >
                          <option value="Simples Nacional">Simples Nacional</option>
                          <option value="Lucro Presumido">Lucro Presumido</option>
                          <option value="Lucro Real">Lucro Real</option>
                        </select>
                      ) : (
                        reg.taxRegime || "-"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        reg.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingId === reg.id ? (
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
                          <button onClick={() => handleEditClick(reg)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Editar">
                            <Pencil className="w-4 h-4" />
                          </button>
                          {reg.status === 'Ativo' ? (
                            <button onClick={() => handleDeactivate(reg.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Inativar">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <button onClick={() => handleActivate(reg.id)} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Reativar">
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
              <h2 className="text-lg font-bold text-slate-800">Nova Inscrição Econômica</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contribuinte (Proprietário)</label>
                <select 
                  required
                  value={createForm.taxpayerId}
                  onChange={(e) => setCreateForm({...createForm, taxpayerId: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                >
                  <option value="">Selecione um contribuinte...</option>
                  {taxpayers.map(tp => (
                    <option key={tp.id} value={tp.id}>{tp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Inscrição Municipal</label>
                <input 
                  type="text" 
                  required
                  value={createForm.municipalInsc}
                  onChange={(e) => setCreateForm({...createForm, municipalInsc: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">CNAE Principal</label>
                  <input 
                    type="text"
                    required
                    value={createForm.primaryCnae}
                    onChange={(e) => setCreateForm({...createForm, primaryCnae: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Regime Tributário</label>
                  <select 
                    value={createForm.taxRegime}
                    onChange={(e) => setCreateForm({...createForm, taxRegime: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  >
                    <option value="Simples Nacional">Simples Nacional</option>
                    <option value="Lucro Presumido">Lucro Presumido</option>
                    <option value="Lucro Real">Lucro Real</option>
                  </select>
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
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
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
