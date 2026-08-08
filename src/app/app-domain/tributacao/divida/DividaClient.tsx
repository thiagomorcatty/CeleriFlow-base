"use client";

import { useState } from "react";
import { Search, Plus, Banknote, Pencil, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { createActiveDebt, updateActiveDebt, cancelActiveDebt, reactivateActiveDebt } from "./actions";

type ActiveDebt = {
  id: string;
  cdaNumber: string | null;
  year: number;
  originDebtType: string;
  originalValue: number;
  updatedValue: number;
  status: string;
  taxpayer: {
    id: string;
    person: { fullName: string; cpf: string } | null;
    company: { corporateName: string; cnpj: string } | null;
  };
};

type Taxpayer = {
  id: string;
  name: string;
};

export default function DividaClient({ 
  activeDebts,
  taxpayers
}: { 
  activeDebts: ActiveDebt[];
  taxpayers: Taxpayer[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ActiveDebt>>({});
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    cdaNumber: "",
    year: new Date().getFullYear(),
    originDebtType: "IPTU",
    originalValue: 0,
    updatedValue: 0,
    taxpayerId: taxpayers[0]?.id || ""
  });

  const handleEditClick = (debt: ActiveDebt) => {
    setEditingId(debt.id);
    setEditForm({
      cdaNumber: debt.cdaNumber,
      year: debt.year,
      originDebtType: debt.originDebtType,
      updatedValue: debt.updatedValue
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    if (confirm("Deseja salvar as alterações?")) {
      try {
        await updateActiveDebt(editingId, editForm);
        setEditingId(null);
      } catch (e) {
        console.error(e);
        alert("Erro ao salvar alterações.");
      }
    }
  };

  const handleCancel = async (id: string) => {
    if (confirm("Deseja cancelar esta dívida ativa?")) {
      await cancelActiveDebt(id);
    }
  };

  const handleReactivate = async (id: string) => {
    if (confirm("Deseja reativar esta dívida ativa?")) {
      await reactivateActiveDebt(id);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.taxpayerId) {
      alert("Selecione um contribuinte válido.");
      return;
    }
    try {
      await createActiveDebt(createForm);
      setIsCreateModalOpen(false);
      setCreateForm({ 
        cdaNumber: "",
        year: new Date().getFullYear(),
        originDebtType: "IPTU",
        originalValue: 0,
        updatedValue: 0,
        taxpayerId: taxpayers[0]?.id || ""
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao inscrever em dívida ativa.");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Banknote className="w-6 h-6 text-red-600" />
            Dívida Ativa e Parcelamentos
          </h1>
          <p className="text-slate-500 mt-1">Gestão de débitos inscritos em dívida ativa municipal.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Inscrever em Dívida
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por CDA ou contribuinte..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
            />
          </div>
        </div>

        {activeDebts.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Banknote className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhuma dívida ativa</h3>
            <p className="text-slate-500 mt-1">Os débitos enviados para dívida ativa aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Número CDA</th>
                  <th className="px-6 py-3">Contribuinte</th>
                  <th className="px-6 py-3">Origem/Ano</th>
                  <th className="px-6 py-3 text-right">Valor Atualizado</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeDebts.map((debt) => (
                  <tr key={debt.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {editingId === debt.id ? (
                        <input
                          type="text"
                          value={editForm.cdaNumber || ""}
                          onChange={(e) => setEditForm({ ...editForm, cdaNumber: e.target.value })}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        debt.cdaNumber || "-"
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {debt.taxpayer?.company?.corporateName || debt.taxpayer?.person?.fullName || "Não Informado"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {editingId === debt.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editForm.originDebtType || ""}
                            onChange={(e) => setEditForm({ ...editForm, originDebtType: e.target.value })}
                            className="w-1/2 border rounded px-2 py-1 text-xs"
                          />
                          <input
                            type="number"
                            value={editForm.year || ""}
                            onChange={(e) => setEditForm({ ...editForm, year: Number(e.target.value) })}
                            className="w-1/2 border rounded px-2 py-1 text-xs"
                          />
                        </div>
                      ) : (
                        `${debt.originDebtType} / ${debt.year}`
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-red-600">
                      {editingId === debt.id ? (
                        <input
                          type="number"
                          value={editForm.updatedValue || 0}
                          onChange={(e) => setEditForm({ ...editForm, updatedValue: Number(e.target.value) })}
                          className="w-full border rounded px-2 py-1 text-right text-xs"
                        />
                      ) : (
                        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(debt.updatedValue)
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        debt.status === 'Inscrita' ? 'bg-orange-100 text-orange-700' :
                        debt.status === 'Parcelada' ? 'bg-blue-100 text-blue-700' :
                        debt.status === 'Paga' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {debt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingId === debt.id ? (
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
                          <button onClick={() => handleEditClick(debt)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Editar">
                            <Pencil className="w-4 h-4" />
                          </button>
                          {debt.status === 'Inscrita' || debt.status === 'Parcelada' ? (
                            <button onClick={() => handleCancel(debt.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Cancelar">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <button onClick={() => handleReactivate(debt.id)} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Reativar">
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
              <h2 className="text-lg font-bold text-slate-800">Inscrever em Dívida Ativa</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contribuinte</label>
                <select 
                  required
                  value={createForm.taxpayerId}
                  onChange={(e) => setCreateForm({...createForm, taxpayerId: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
                >
                  <option value="">Selecione um contribuinte...</option>
                  {taxpayers.map(tp => (
                    <option key={tp.id} value={tp.id}>{tp.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Número CDA</label>
                  <input 
                    type="text"
                    required
                    value={createForm.cdaNumber}
                    onChange={(e) => setCreateForm({...createForm, cdaNumber: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ano</label>
                  <input 
                    type="number"
                    required
                    value={createForm.year}
                    onChange={(e) => setCreateForm({...createForm, year: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Origem (Ex: IPTU, ISS)</label>
                <input 
                  type="text"
                  required
                  value={createForm.originDebtType}
                  onChange={(e) => setCreateForm({...createForm, originDebtType: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Valor Original (R$)</label>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    value={createForm.originalValue}
                    onChange={(e) => setCreateForm({...createForm, originalValue: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Valor Atualizado (R$)</label>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    value={createForm.updatedValue}
                    onChange={(e) => setCreateForm({...createForm, updatedValue: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
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
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Inscrever
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
