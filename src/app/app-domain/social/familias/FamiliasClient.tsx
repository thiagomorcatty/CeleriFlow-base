"use client";

import { useState } from "react";
import { Users, Search, Plus, CreditCard, CheckCircle2, XCircle } from "lucide-react";
import { createFamily, updateFamily, toggleFamilyStatus } from "../actions";

export default function FamiliasClient({ familiasInicial, persons }: any) {
  const [familias, setFamilias] = useState(familiasInicial);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFamilia, setEditingFamilia] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    representativeId: "",
    nis: "",
    familyCode: "",
    income: "",
    perCapitaIncome: "",
    vulnerabilities: ""
  });

  const filtered = familias.filter((f: any) => 
    (f.representative?.fullName || "").toLowerCase().includes(search.toLowerCase()) || 
    (f.nis || "").includes(search) ||
    (f.familyCode || "").includes(search)
  );

  const handleOpenModal = (familia?: any) => {
    if (familia) {
      setEditingFamilia(familia);
      setFormData({
        representativeId: familia.representativeId || "",
        nis: familia.nis || "",
        familyCode: familia.familyCode || "",
        income: familia.income?.toString() || "",
        perCapitaIncome: familia.perCapitaIncome?.toString() || "",
        vulnerabilities: familia.vulnerabilities || ""
      });
    } else {
      setEditingFamilia(null);
      setFormData({ representativeId: "", nis: "", familyCode: "", income: "", perCapitaIncome: "", vulnerabilities: "" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFamilia) {
      const res = await updateFamily(editingFamilia.id, formData as any);
      if (res.success) {
        setFamilias(familias.map((f: any) => f.id === editingFamilia.id ? res.data : f));
      }
    } else {
      const res = await createFamily(formData as any);
      if (res.success) {
        setFamilias([res.data, ...familias]);
      }
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Ativo" ? "Inativo" : "Ativo";
    const res = await toggleFamilyStatus(id, newStatus);
    if (res.success) {
      setFamilias(familias.map((f: any) => f.id === id ? res.data : f));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Famílias e Indiv�duos
          </h1>
          <p className="text-slate-500">Gestão do Cadastro Único Municipal e composição familiar.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por NIS, Código ou Responsável..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 w-full md:w-72"
            />
          </div>
          <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Família</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Responsável</th>
                <th className="p-4 font-semibold">NIS</th>
                <th className="p-4 font-semibold">Código Familiar</th>
                <th className="p-4 font-semibold">Renda</th>
                <th className="p-4 font-semibold">Vulnerabilidade</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length > 0 ? (
                filtered.map((familia: any) => (
                  <tr key={familia.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">
                        {familia.representative?.fullName || 'Sem responsável'}
                      </p>
                      {familia.representative?.cpf && (
                        <p className="text-xs text-slate-500 mt-1">
                          CPF: {familia.representative.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                        </p>
                      )}
                    </td>
                    <td className="p-4 text-slate-600">
                      <p className="flex items-center gap-1 font-medium text-xs">
                        <CreditCard className="w-3 h-3 text-slate-400" /> 
                        {familia.nis || '-'}
                      </p>
                    </td>
                    <td className="p-4 text-slate-600 text-xs">
                      {familia.familyCode || '-'}
                    </td>
                    <td className="p-4">
                      {familia.income !== null && (
                        <p className="text-xs font-semibold text-slate-700">
                          Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(familia.income)}
                        </p>
                      )}
                      {familia.perCapitaIncome !== null && (
                        <p className="text-xs text-slate-500 mt-1">
                          Per Capita: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(familia.perCapitaIncome)}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      {familia.vulnerabilities ? (
                        <p className="text-xs text-red-600 max-w-[200px] truncate" title={familia.vulnerabilities}>
                          {familia.vulnerabilities}
                        </p>
                      ) : '-'}
                    </td>
                    <td className="p-4 text-center">
                      {familia.status === "Ativo" ? (
                         <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium border border-emerald-200">
                           <CheckCircle2 className="w-3 h-3" /> Ativo
                         </span>
                      ) : (
                         <span className="inline-flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-700 rounded-md text-xs font-medium border border-rose-200">
                           <XCircle className="w-3 h-3" /> Inativo
                         </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleOpenModal(familia)} className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors text-xs font-medium">
                          Editar
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(familia.id, familia.status)}
                          className={familia.status === 'Ativo' ? 'text-amber-600 hover:bg-amber-50 p-1.5 rounded-lg transition-colors text-xs font-medium' : 'text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors text-xs font-medium'}
                        >
                          {familia.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Nenhuma família encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">
                {editingFamilia ? "Editar Família" : "Nova Família"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Responsável Familiar (Pessoa)</label>
                  <select required value={formData.representativeId} onChange={e => setFormData({...formData, representativeId: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Selecione a Pessoa</option>
                    {persons.map((p: any) => (
                      <option key={p.id} value={p.id}>{p.fullName} {p.cpf ? `(CPF: ${p.cpf})` : ''}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">NIS</label>
                  <input type="text" value={formData.nis} onChange={e => setFormData({...formData, nis: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Código Familiar</label>
                  <input type="text" value={formData.familyCode} onChange={e => setFormData({...formData, familyCode: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Renda Total</label>
                  <input type="number" step="0.01" value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Renda Per Capita</label>
                  <input type="number" step="0.01" value={formData.perCapitaIncome} onChange={e => setFormData({...formData, perCapitaIncome: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Vulnerabilidades</label>
                  <input type="text" value={formData.vulnerabilities} onChange={e => setFormData({...formData, vulnerabilities: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  {editingFamilia ? "Salvar Alterações" : "Criar Família"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
