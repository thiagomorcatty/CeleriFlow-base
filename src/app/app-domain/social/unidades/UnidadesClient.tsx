"use client";

import { useState } from "react";
import { Building2, Search, Plus, Phone, Mail, CheckCircle2, XCircle } from "lucide-react";
import { createSocialUnit, updateSocialUnit, toggleSocialUnitStatus } from "../actions";

export default function UnidadesClient({ unidadesInicial, realEstates, employees }: any) {
  const [unidades, setUnidades] = useState(unidadesInicial);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUnidade, setEditingUnidade] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "", type: "CRAS", phone: "", email: "", realEstateId: "", managerId: ""
  });

  const filtered = unidades.filter((u: any) => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (unidade?: any) => {
    if (unidade) {
      setEditingUnidade(unidade);
      setFormData({
        name: unidade.name,
        type: unidade.type,
        phone: unidade.phone || "",
        email: unidade.email || "",
        realEstateId: unidade.realEstateId || "",
        managerId: unidade.managerId || ""
      });
    } else {
      setEditingUnidade(null);
      setFormData({ name: "", type: "CRAS", phone: "", email: "", realEstateId: "", managerId: "" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUnidade) {
      const res = await updateSocialUnit(editingUnidade.id, formData);
      if (res.success) {
        setUnidades(unidades.map((u: any) => u.id === editingUnidade.id ? res.data : u));
      }
    } else {
      const res = await createSocialUnit(formData);
      if (res.success) {
        setUnidades([...unidades, res.data]);
      }
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const res = await toggleSocialUnitStatus(id, !currentStatus);
    if (res.success) {
      setUnidades(unidades.map((u: any) => u.id === id ? res.data : u));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            Unidades SUAS
          </h1>
          <p className="text-slate-500">Gerencie CRAS, CREAS, Centros POP e Acolhimentos.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar unidade..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 w-full md:w-64"
            />
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Unidade</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Unidade</th>
                <th className="p-4 font-semibold">Tipo</th>
                <th className="p-4 font-semibold">Telefone</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Imóvel (Patrimônio)</th>
                <th className="p-4 font-semibold">Gestor (RH)</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length > 0 ? (
                filtered.map((unidade: any) => (
                  <tr key={unidade.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4"><p className="font-semibold text-slate-800">{unidade.name}</p></td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                        {unidade.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      {unidade.phone ? (
                        <p className="flex items-center gap-1 text-xs"><Phone className="w-3 h-3" /> {unidade.phone}</p>
                      ) : '-'}
                    </td>
                    <td className="p-4 text-slate-600">
                      {unidade.email ? (
                        <p className="flex items-center gap-1 text-xs"><Mail className="w-3 h-3" /> {unidade.email}</p>
                      ) : '-'}
                    </td>
                    <td className="p-4 text-slate-600 text-xs">
                      {unidade.realEstate?.streetName ? unidade.realEstate.streetName + ', ' + unidade.realEstate.number : '-'}
                    </td>
                    <td className="p-4 text-slate-600 text-xs">
                      {unidade.manager?.name || '-'}
                    </td>
                    <td className="p-4 text-center">
                      {unidade.isActive ? (
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
                        <button 
                          onClick={() => handleOpenModal(unidade)}
                          className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors text-xs font-medium"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(unidade.id, unidade.isActive)}
                          className={unidade.isActive ? 'text-amber-600 hover:bg-amber-50 p-1.5 rounded-lg transition-colors text-xs font-medium' : 'text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors text-xs font-medium'}
                        >
                          {unidade.isActive ? 'Inativar' : 'Ativar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    Nenhuma unidade encontrada.
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
                {editingUnidade ? "Editar Unidade" : "Nova Unidade"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Nome da Unidade</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Tipo</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="CRAS">CRAS</option>
                    <option value="CREAS">CREAS</option>
                    <option value="Centro POP">Centro POP</option>
                    <option value="Acolhimento">Acolhimento</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Telefone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Imóvel Vinculado (Patrimônio)</label>
                  <select value={formData.realEstateId} onChange={e => setFormData({...formData, realEstateId: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Nenhum</option>
                    {realEstates.map((re: any) => (
                      <option key={re.id} value={re.id}>{re.streetName}, {re.number} - {re.propertyType}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Servidor Responsável (Gestor)</label>
                  <select value={formData.managerId} onChange={e => setFormData({...formData, managerId: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Nenhum</option>
                    {employees.map((emp: any) => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  {editingUnidade ? "Salvar Alterações" : "Criar Unidade"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
