"use client";

import { useState } from "react";
import { FileText, Search, ClipboardList, Lock, Clock, CheckCircle2, XCircle, SearchCode, HeartHandshake } from "lucide-react";
import { createAttendance, updateAttendance, toggleAttendanceStatus } from "../actions";
import { searchCadUnicoAction, saveRmaRecordAction } from "./cadunico-actions";

type Family = { id: string; familyCode: string | null; nis: string | null };
type Person = { id: string; fullName: string };
type Professional = { id: string; name: string };
type SocialUnit = { id: string; name: string };
type Attendance = {
  id: string;
  date: Date;
  familyId: string;
  personId: string | null;
  unitId: string;
  professionalId: string;
  type: string;
  description: string;
  secrecyLevel: string;
  isActive: boolean;
  family: Family;
  person: Person | null;
  unit: SocialUnit;
};
type AttendanceFormData = {
  familyId: string;
  personId: string;
  unitId: string;
  professionalId: string;
  type: string;
  description: string;
  secrecyLevel: string;
};

export default function ProntuarioClient({ atendimentosInicial, familias, persons, professionals, units }: {
  atendimentosInicial: Attendance[];
  familias: Family[];
  persons: Person[];
  professionals: Professional[];
  units: SocialUnit[];
}) {
  const [atendimentos, setAtendimentos] = useState<Attendance[]>(atendimentosInicial);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAtendimento, setEditingAtendimento] = useState<Attendance | null>(null);

  // Estados para consulta CadÚnico
  const [searchNis, setSearchNis] = useState("");
  const [cadUnicoResult, setCadUnicoResult] = useState<Awaited<ReturnType<typeof searchCadUnicoAction>>["data"] | null>(null);
  const [cadLoading, setCadLoading] = useState(false);
  const [rmaSuccessMsg, setRmaSuccessMsg] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<AttendanceFormData>({
    familyId: "",
    personId: "",
    unitId: "",
    professionalId: "",
    type: "Acolhimento",
    description: "",
    secrecyLevel: "Normal"
  });

  async function handleSearchCadUnico(e: React.FormEvent) {
    e.preventDefault();
    setCadLoading(true);
    setCadUnicoResult(null);
    setRmaSuccessMsg(null);

    const res = await searchCadUnicoAction(searchNis);
    setCadLoading(false);

    if (res.data) {
      setCadUnicoResult(res.data);
    } else {
      alert(res.error || "Não foi possível encontrar o registro no CadÚnico.");
    }
  }

  async function handleRegisterRma() {
    if (!cadUnicoResult) return;
    setCadLoading(true);

    const res = await saveRmaRecordAction({
      nis: cadUnicoResult.nis,
      nomeCidadao: cadUnicoResult.nomeCompleto,
      unidadeAtendimento: "CRAS Centro - Atendimento Especializado",
      tipoAtendimento: "Acompanhamento Familiar PAIF / Bolsa Família",
      detalhesRma: `Consulta e validação cadastral CadÚnico efetuada. Renda per capita: R$ ${cadUnicoResult.rendaPerCapita.toFixed(2)}. Elegível Bolsa Família: ${cadUnicoResult.elegivelBolsaFamilia ? "SIM" : "NÃO"}.`,
    });

    setCadLoading(false);

    if (res.data) {
      setRmaSuccessMsg(`Atendimento registrado com sucesso no Prontuário SUAS/RMA (ID: ${res.data.id})`);
    }
  }

  const filtered = atendimentos.filter((a) =>
    (a.family?.familyCode || "").includes(search) || 
    (a.person?.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
    (a.description || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (atendimento?: Attendance) => {
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
      const res = await updateAttendance(editingAtendimento.id, formData);
      if (res.success && res.data) {
        setAtendimentos(atendimentos.map((a) => a.id === editingAtendimento.id ? res.data : a));
      }
    } else {
      const res = await createAttendance(formData);
      if (res.success && res.data) {
        setAtendimentos([res.data, ...atendimentos]);
      }
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const res = await toggleAttendanceStatus(id, !currentStatus);
    if (res.success && res.data) {
      setAtendimentos(atendimentos.map((a) => a.id === id ? res.data : a));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* CadÚnico & SUAS Engine Card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-5 shadow-md space-y-4">
        <div className="flex justify-between items-start border-b border-blue-800 pb-3">
          <div>
            <span className="bg-blue-500/30 text-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Integração Federal — CadÚnico (MDS) &amp; SUAS
            </span>
            <h2 className="text-xl font-bold mt-1 flex items-center gap-2">
              <SearchCode className="w-6 h-6 text-blue-400" />
              Consulta Unificada CadÚnico &amp; Emissão RMA
            </h2>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3 py-1 rounded-full font-bold">
            Sincronizado MDS
          </span>
        </div>

        <form onSubmit={handleSearchCadUnico} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Digite o NIS ou CPF do cidadão para consulta CadÚnico..."
            value={searchNis}
            onChange={(e) => setSearchNis(e.target.value)}
            className="flex-1 bg-slate-950/70 border border-blue-700/80 rounded-lg px-4 py-2.5 text-sm text-white placeholder-blue-300/60 focus:ring-2 focus:ring-blue-400 font-mono"
            required
          />
          <button
            type="submit"
            disabled={cadLoading}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm shadow transition-all"
          >
            {cadLoading ? "Consultando..." : "Consultar CadÚnico"}
          </button>
        </form>

        {cadUnicoResult && (
          <div className="bg-slate-950/80 border border-blue-700/80 rounded-xl p-4 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-bold text-blue-300 text-sm">{cadUnicoResult.nomeCompleto}</span>
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded font-mono font-bold">
                NIS: {cadUnicoResult.nis}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
              <div>
                <span className="text-slate-500 block">CPF</span>
                <span className="font-mono font-bold text-white">{cadUnicoResult.cpf}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Renda per Capita</span>
                <span className="font-bold text-emerald-400">R$ {cadUnicoResult.rendaPerCapita.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Composição Familiar</span>
                <span className="font-bold text-white">{cadUnicoResult.composicaoFamiliar} Pessoas</span>
              </div>
              <div>
                <span className="text-slate-500 block">Status Cadastral</span>
                <span className="font-bold text-blue-400">{cadUnicoResult.statusCadastral}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 border-t border-slate-800">
              <div className="flex gap-2">
                {cadUnicoResult.elegivelBolsaFamilia && (
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded">
                    Elegível Bolsa Família
                  </span>
                )}
                {cadUnicoResult.elegivelBPC && (
                  <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold px-2.5 py-0.5 rounded">
                    Elegível BPC
                  </span>
                )}
              </div>

              <button
                onClick={handleRegisterRma}
                disabled={cadLoading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded flex items-center gap-1 shadow text-xs"
              >
                <HeartHandshake className="w-4 h-4" /> Registrar Atendimento no Prontuário RMA
              </button>
            </div>
            {rmaSuccessMsg && <div className="text-emerald-400 font-bold p-2 bg-emerald-950/60 rounded border border-emerald-800">{rmaSuccessMsg}</div>}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Prontuário Eletrônico SUAS
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
                filtered.map((atendimento) => (
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
                    {familias.map((f) => (
                      <option key={f.id} value={f.id}>{f.familyCode} - NIS: {f.nis}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Cidadão (Opcional)</label>
                  <select value={formData.personId} onChange={e => setFormData({...formData, personId: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Geral da Família</option>
                    {persons.map((p) => (
                      <option key={p.id} value={p.id}>{p.fullName}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Unidade</label>
                  <select required value={formData.unitId} onChange={e => setFormData({...formData, unitId: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Selecione a Unidade</option>
                    {units.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Técnico Responsável</label>
                  <select required value={formData.professionalId} onChange={e => setFormData({...formData, professionalId: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">Selecione o Técnico</option>
                    {professionals.map((p) => (
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
