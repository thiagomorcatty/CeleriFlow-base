"use client";

import { useState } from "react";
import { FileText, Search, ClipboardList, Lock, Clock, CheckCircle2, XCircle } from "lucide-react";
import { createAttendance, updateAttendance, toggleAttendanceStatus } from "../actions";

export default function ProntuarioClient({ atendimentosInicial, familias, persons, professionals, units }: any) {
  const [atendimentos, setAtendimentos] = useState(atendimentosInicial);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAtendimento, setEditingAtendimento] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    familyId: "",
    personId: "",
    unitId: "",
    professionalId: "",
    type: "Acolhimento",
    description: "",
    secrecyLevel: "Normal"
  });

  const filtered = atendimentos.filter((a: any) => 
    (a.family?.familyCode || "").includes(search) || 
    (a.person?.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
    (a.description || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (atendimento?: any) => {
    if (atendimento) {
      setEditingAtendimento(atendimento);
      setFormData({
        familyId: atendimento.familyId || "",
        personId: atendimento.personId || "",
        unitId: atendimento.unitId || "",
        professionalId: atendimento.professionalId || "",
        type: atendimento.type || "Acolhimento",
        description: atendimento.description || "",
        secrecyLevel: atendimento.secrecyLevel || "Normal"
      });
    } else {
      setEditingAtendimento(null);
      setFormData({ familyId: "", personId: "", unitId: "", professionalId: "", type: "Acolhimento", description: "", secrecyLevel: "Normal" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAtendimento) {
      const res = await updateAttendance(editingAtendimento.id, formData as any);
      if (res.success) {
        setAtendimentos(atendimentos.map((a: any) => a.id === editingAtendimento.id ? res.data : a));
      }
    } else {
      const res = await createAttendance(formData as any);
      if (res.success) {
        setAtendimentos([res.data, ...atendimentos]);
      }
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const res = await toggleAttendanceStatus(id, !currentStatus);
    if (res.success) {
      setAtendimentos(atendimentos.map((a: any) => a.id === id ? res.data : a));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Prontuário EletrÚnico SUAS
          </h1>
          <p className="text-slate-500">Histórico de atendimentos, visitas e acompanhamentos técnicos.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por código da família ou nome..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 w-full md:w-72"
            />
          </div>
          <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Novo Atendimento</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Data</th>
                <th className="p-4 font-semibold">Unidade</th>
                <th className="p-4 font-semibold">Família/Código</th>
                <th className="p-4 font-semibold">Tipo</th>
                <th className="p-4 font-semibold">Relato</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length > 0 ? (
                filtered.map((atendimento: any) => (
                  <tr key={atendimento.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800 flex items-center gap-1 text-xs">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(atendimento.date))}
                      </p>
                    </td>
                    <td className="p-4 text-xs text-slate-600">
                      {atendimento.unit.name}
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-800 text-xs">
                        {atendimento.person ? atendimento.person.fullName : `Família ${atendimento.family.familyCode}`}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Cód: {atendimento.family.familyCode}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium border border-indigo-100">
                          {atendimento.type}
                        </span>
                        {atendimento.secrecyLevel === 'Restrito' && (
                          <span title="Atendimento com Sigilo Restrito">
                            <Lock className="w-3.5 h-3.5 text-red-500" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="text-xs text-slate-600 truncate" title={atendimento.description}>
                        {atendimento.description}
                      </p>
                    </td>
                    <td className="p-4 text-center">
                      {atendimento.isActive !== false ? (
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
                        <button onClick={() => handleOpenModal(atendimento)} className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors text-xs font-medium">
                          Editar
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(atendimento.id, atendimento.isActive !== false)}
                          className={atendimento.isActive !== false ? 'text-amber-600 hover:bg-amber-50 p-1.5 rounded-lg transition-colors text-xs font-medium' : 'text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors text-xs font-medium'}
                        >
                          {atendimento.isActive !== false ? 'Inativar' : 'Ativar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Nenhum atendimento registrado.
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
                {editingAtendimento ? "Editar Atendimento" : "Novo Atendimento"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Família</label>
                  <select required value={formData.familyId} onChange={e => setFormData({...formData, familyId: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Selecione a Família</option>
                    {familias.map((f: any) => (
                      <option key={f.id} value={f.id}>{f.familyCode} - NIS: {f.nis}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Cidadão (Opcional)</label>
                  <select value={formData.personId} onChange={e => setFormData({...formData, personId: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Geral da Família</option>
                    {persons.map((p: any) => (
                      <option key={p.id} value={p.id}>{p.fullName}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Unidade</label>
                  <select required value={formData.unitId} onChange={e => setFormData({...formData, unitId: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Selecione a Unidade</option>
                    {units.map((u: any) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Técnico Responsável</label>
                  <select required value={formData.professionalId} onChange={e => setFormData({...formData, professionalId: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Selecione o Técnico</option>
                    {professionals.map((p: any) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Tipo de Atendimento</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="Acolhimento">Acolhimento</option>
                    <option value="PAIF">PAIF</option>
                    <option value="PAEFI">PAEFI</option>
                    <option value="Visita Domiciliar">Visita Domiciliar</option>
                    <option value="Benefício">Concessão de Benefício</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Nível de Sigilo</label>
                  <select value={formData.secrecyLevel} onChange={e => setFormData({...formData, secrecyLevel: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="Normal">Normal</option>
                    <option value="Restrito">Restrito (Apenas Equipe Técnica)</option>
                  </select>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Relato / Descrição</label>
                  <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  {editingAtendimento ? "Salvar Alterações" : "Salvar Atendimento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
