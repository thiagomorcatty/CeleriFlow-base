"use client";

import { useState, type FormEvent } from "react";
import { Search, Plus, ShieldAlert, Pencil, CheckCircle2, XCircle, BrainCircuit, FileSearch, Zap } from "lucide-react";
import { createInfraction, updateInfraction, updateInfractionStatus } from "./actions";
import { runTaxAuditAction, issueInfractionNoticeAction } from "./fiscalizacao-actions";
import type { TaxAuditCrossCheckResult } from "@/lib/tributacao/inteligencia-tributaria-engine";

type TaxAuditResult = TaxAuditCrossCheckResult & { numeroAutoInfracao?: string };

type Infraction = {
  id: string;
  infractionType: string;
  penaltyValue: number;
  defenseDeadline: Date | null;
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

export default function FiscalizacaoClient({ 
  infractions,
  taxpayers
}: { 
  infractions: Infraction[];
  taxpayers: Taxpayer[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{infractionType?: string, penaltyValue?: number, defenseDeadline?: string}>({});

  // Estados para Inteligência Tributária (DEISS / Malha Fina)
  const [cnpjAudit, setCnpjAudit] = useState("08.992.341/0001-90");
  const [razaoAudit, setRazaoAudit] = useState("BANCO MODELO MULTIPLO S/A");
  const [valorDeclarado, setValorDeclarado] = useState<number>(450000.0);
  const [valorBancos, setValorBancos] = useState<number>(1850000.0);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<TaxAuditResult | null>(null);

  async function handleRunAudit(e: FormEvent) {
    e.preventDefault();
    setAuditLoading(true);
    setAuditResult(null);

    const res = await runTaxAuditAction({
      cnpjCpfContribuinte: cnpjAudit,
      razaoSocial: razaoAudit,
      origemCruzamento: "DEISS_BANCOS",
      valorDeclarado,
      valorApuradoBancos: valorBancos,
    });

    setAuditLoading(false);

    if (res.data) {
      setAuditResult(res.data);
    } else {
      alert(res.error || "Erro ao executar cruzamento fiscal.");
    }
  }

  async function handleIssueInfractionNotice() {
    if (!auditResult) return;
    setAuditLoading(true);

    const res = await issueInfractionNoticeAction(auditResult.id);
    setAuditLoading(false);

    if (res.data) {
      setAuditResult({ ...auditResult, statusMalha: "AUTO_INFRACAO_EMITIDO", numeroAutoInfracao: res.data.numeroAutoInfracao });
    } else {
      alert(res.error || "Erro ao emitir Auto de Infração.");
    }
  }
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    infractionType: "",
    penaltyValue: 0,
    defenseDeadline: "",
    taxpayerId: taxpayers[0]?.id || "",
  });

  const handleEditClick = (inf: Infraction) => {
    setEditingId(inf.id);
    setEditForm({
      infractionType: inf.infractionType,
      penaltyValue: inf.penaltyValue,
      defenseDeadline: inf.defenseDeadline ? new Date(inf.defenseDeadline).toISOString().split('T')[0] : ""
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    if (confirm("Deseja salvar as alterações?")) {
      try {
        await updateInfraction(editingId, editForm);
        setEditingId(null);
      } catch (e) {
        console.error(e);
        alert("Erro ao salvar alterações.");
      }
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    if (confirm(`Deseja alterar o status para "${status}"?`)) {
      await updateInfractionStatus(id, status);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.taxpayerId || !createForm.infractionType || createForm.penaltyValue <= 0) {
      alert("Preencha os campos obrigatórios e um valor de multa maior que zero.");
      return;
    }
    try {
      await createInfraction(createForm);
      setIsCreateModalOpen(false);
      setCreateForm({ 
        infractionType: "",
        penaltyValue: 0,
        defenseDeadline: "",
        taxpayerId: taxpayers[0]?.id || "",
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar infração.");
    }
  };

  return (
    <>
      {/* Motor de Inteligência Tributária Card */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 text-white rounded-xl p-5 shadow-lg space-y-4 mb-6 border border-orange-800/40">
        <div className="flex justify-between items-start border-b border-orange-900/60 pb-3">
          <div>
            <span className="bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Motor de Inteligência Tributária &amp; Malha Fina ISS
            </span>
            <h2 className="text-xl font-bold mt-1 flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-orange-400" />
              Cruzamento Fiscal Automático (DEISS Bancos / Cartórios)
            </h2>
          </div>
          <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
            Malha Fina Ativa
          </span>
        </div>

        <form onSubmit={handleRunAudit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">CNPJ / CPF Contribuinte</label>
            <input
              type="text"
              value={cnpjAudit}
              onChange={(e) => setCnpjAudit(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Razão Social / Instituição</label>
            <input
              type="text"
              value={razaoAudit}
              onChange={(e) => setRazaoAudit(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-semibold"
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Faturamento Declarado (R$)</label>
            <input
              type="number"
              step="0.01"
              value={valorDeclarado}
              onChange={(e) => setValorDeclarado(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-bold"
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Apurado Banco / DEISS (R$)</label>
            <input
              type="number"
              step="0.01"
              value={valorBancos}
              onChange={(e) => setValorBancos(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-orange-400 font-bold"
              required
            />
          </div>
          <div className="sm:col-span-4 flex justify-end">
            <button
              type="submit"
              disabled={auditLoading}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 shadow text-sm transition-all"
            >
              <FileSearch className="w-4 h-4" /> Executar Cruzamento de Malha Fina
            </button>
          </div>
        </form>

        {auditResult && (
          <div className="bg-slate-950 p-4 rounded-xl border border-orange-800/80 text-xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-bold text-orange-300">{auditResult.razaoSocial} ({auditResult.cnpjCpfContribuinte})</span>
              <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold px-2.5 py-0.5 rounded">
                DIVERGÊNCIA DETECTADA
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-slate-500 block">Diferença de Faturamento</span>
                <span className="font-bold text-white text-sm">
                  R$ {(auditResult.valorApuradoBancos - auditResult.valorDeclarado).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Alíquota ISS (5%)</span>
                <span className="font-bold text-amber-400">R$ {auditResult.divergenciaImposto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Status Fiscal</span>
                <span className="font-bold text-orange-400">{auditResult.statusMalha}</span>
              </div>
            </div>

            {auditResult.numeroAutoInfracao ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-300 font-bold rounded flex items-center justify-between">
                <span>Auto de Infração Emitido: <strong>{auditResult.numeroAutoInfracao}</strong></span>
                <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-mono">INSCRITO EM DÍVIDA</span>
              </div>
            ) : (
              <button
                onClick={handleIssueInfractionNotice}
                disabled={auditLoading}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow text-xs transition-all"
              >
                <Zap className="w-4 h-4 text-amber-300" /> Lavrar Auto de Infração de ISS (Lançamento de Débito)
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-orange-600" />
            Fiscalização e Autos
          </h1>
          <p className="text-slate-500 mt-1">Gestão de infrações, multas e processos de fiscalização tributária.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Registrar Infração
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por tipo ou contribuinte..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600"
            />
          </div>
        </div>

        {infractions.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <ShieldAlert className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum auto de infração</h3>
            <p className="text-slate-500 mt-1">Os autos de infração aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Tipo de Infração</th>
                  <th className="px-6 py-3">Contribuinte</th>
                  <th className="px-6 py-3">Valor da Multa</th>
                  <th className="px-6 py-3">Prazo Defesa</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {infractions.map((inf) => (
                  <tr key={inf.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {editingId === inf.id ? (
                        <input
                          type="text"
                          value={editForm.infractionType || ""}
                          onChange={(e) => setEditForm({ ...editForm, infractionType: e.target.value })}
                          className="border rounded px-2 py-1 text-sm w-full max-w-[200px]"
                        />
                      ) : (
                        inf.infractionType
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {inf.taxpayer?.company?.corporateName || inf.taxpayer?.person?.fullName || "Não Informado"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-orange-600">
                      {editingId === inf.id ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.penaltyValue || 0}
                          onChange={(e) => setEditForm({ ...editForm, penaltyValue: Number(e.target.value) })}
                          className="border rounded px-2 py-1 text-sm w-full max-w-[100px]"
                        />
                      ) : (
                        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inf.penaltyValue)
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {editingId === inf.id ? (
                        <input
                          type="date"
                          value={editForm.defenseDeadline || ""}
                          onChange={(e) => setEditForm({ ...editForm, defenseDeadline: e.target.value })}
                          className="border rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        inf.defenseDeadline ? new Date(inf.defenseDeadline).toLocaleDateString('pt-BR') : "-"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        inf.status === 'Emitido' ? 'bg-orange-100 text-orange-700' :
                        inf.status === 'Pago' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {inf.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingId === inf.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={handleSaveEdit} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" title="Salvar">
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => setEditingId(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded" title="Cancelar">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => handleEditClick(inf)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Editar">
                            <Pencil className="w-4 h-4" />
                          </button>
                          {inf.status === 'Emitido' && (
                            <button onClick={() => handleStatusChange(inf.id, 'Pago')} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Marcar como Pago">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          {(inf.status === 'Emitido') && (
                            <button onClick={() => handleStatusChange(inf.id, 'Cancelado')} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Cancelar Auto">
                              <XCircle className="w-4 h-4" />
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
              <h2 className="text-lg font-bold text-slate-800">Registrar Infração</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contribuinte (Infrator)</label>
                <select 
                  required
                  value={createForm.taxpayerId}
                  onChange={(e) => setCreateForm({...createForm, taxpayerId: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
                >
                  <option value="">Selecione um contribuinte...</option>
                  {taxpayers.map(tp => (
                    <option key={tp.id} value={tp.id}>{tp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Infração</label>
                <input 
                  type="text"
                  required
                  value={createForm.infractionType}
                  onChange={(e) => setCreateForm({...createForm, infractionType: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Valor da Multa (R$)</label>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    value={createForm.penaltyValue}
                    onChange={(e) => setCreateForm({...createForm, penaltyValue: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Prazo para Defesa (Opcional)</label>
                  <input 
                    type="date"
                    value={createForm.defenseDeadline}
                    onChange={(e) => setCreateForm({...createForm, defenseDeadline: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
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
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
