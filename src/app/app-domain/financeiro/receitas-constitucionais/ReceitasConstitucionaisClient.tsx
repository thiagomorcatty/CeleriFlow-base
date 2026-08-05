"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark, Plus, AlertTriangle, CheckCircle2, ShieldCheck, Filter, ArrowUpRight, Zap, RefreshCw, ListFilter } from "lucide-react";
import { createRuleAction, processConstitutionalRevenueAction, resolveExceptionAction, seedConstitutionalRulesAction } from "./regras-receitas-actions";

interface Rule {
  id: string;
  textoProcurado: string;
  bancoContaFiltro: string | null;
  tipoReceita: string | null;
  naturezaReceita: string | null;
  fonteRecurso: string | null;
  eventoContabil: string | null;
  deducaoAplicavel: boolean;
  prioridade: number;
  exigeConfirmacao: boolean;
  ativo: boolean;
}

interface ExceptionItem {
  id: string;
  statementItemId: string | null;
  descricao: string;
  valorDecimal: any;
  dataMovimento: string;
  banco: string;
  contaNumero: string;
  sinal: string;
  scoreConfianca: number;
  sugestaoTipo: string | null;
  motivoExcecao: string;
  status: string;
}

export default function ReceitasConstitucionaisClient({
  initialRules = [],
  initialExceptions = [],
}: {
  initialRules?: Rule[];
  initialExceptions?: ExceptionItem[];
}) {
  const [activeTab, setActiveTab] = useState<"regras" | "nova" | "excecoes">("regras");
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [exceptions, setExceptions] = useState<ExceptionItem[]>(initialExceptions);
  const router = useRouter();

  // Form para nova regra
  const [textoProcurado, setTextoProcurado] = useState("");
  const [bancoContaFiltro, setBancoContaFiltro] = useState("Conta de Transferências");
  const [tipoReceita, setTipoReceita] = useState("FPM");
  const [naturezaReceita, setNaturezaReceita] = useState("1.7.1.8.01.2.1.00.00 - Cota-Parte do FPM");
  const [fonteRecurso, setFonteRecurso] = useState("15000000 - Recursos Não Vinculados");
  const [eventoContabil, setEventoContabil] = useState("10.01.01 - Arrecadação de FPM");
  const [deducaoAplicavel, setDeducaoAplicavel] = useState(true);
  const [prioridade, setPrioridade] = useState(1);
  const [exigeConfirmacao, setExigeConfirmacao] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setRules(initialRules);
    setExceptions(initialExceptions);
  }, [initialExceptions, initialRules]);

  async function handleSeedRules() {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    const result = await seedConstitutionalRulesAction();
    setLoading(false);

    if (result.error) {
      setErrorMsg(result.error);
      return;
    }

    setSuccessMsg("Regras padrão criadas. Atualizando a tabela...");
    router.refresh();
  }

  async function handleCreateRule(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await createRuleAction({
      textoProcurado,
      bancoContaFiltro,
      tipoReceita,
      naturezaReceita,
      fonteRecurso,
      eventoContabil,
      deducaoAplicavel,
      prioridade,
      exigeConfirmacao,
    });

    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else if (res.data) {
      setSuccessMsg("Regra configurada e ativada com sucesso!");
      setRules((prev) => [...prev, res.data].sort((a, b) => a.prioridade - b.prioridade));
      setTextoProcurado("");
      setActiveTab("regras");
    }
  }

  async function handleResolveException(item: ExceptionItem) {
    setLoading(true);
    const res = item.statementItemId
      ? await processConstitutionalRevenueAction(item.statementItemId)
      : await resolveExceptionAction(item.id, item.descricao);
    setLoading(false);

    if (res.error) {
      alert(res.error);
    } else {
      setExceptions((prev) => prev.filter((ex) => ex.id !== item.id));
      alert(item.statementItemId
        ? `Receita constitucional processada e registrada no sistema municipal.`
        : `Exceção resolvida! A descrição "${item.descricao}" foi adicionada às regras de classificação.`);
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
              Funcionalidade 4 — POC Edital
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            <Landmark className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            Receitas Constitucionais e Legais
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tabela de regras configurável para FPM, ICMS, Fundeb, IPVA, ITR, Royalties, ADO LC 176/20 e Fila de Exceções para variação de descrições.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("regras")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "regras" ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Tabela de Regras ({rules.length})
          </button>
          <button
            onClick={() => setActiveTab("nova")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
              activeTab === "nova" ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Nova Regra
          </button>
          <button
            onClick={() => setActiveTab("excecoes")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
              activeTab === "excecoes" ? "bg-purple-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" /> Fila de Exceções ({exceptions.length})
          </button>
        </div>
      </div>

      {/* TAB 1: Tabela de Regras (9 Campos Obrigatórios do Edital) */}
      {activeTab === "regras" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ListFilter className="w-5 h-5 text-purple-600" />
              Tabela de Regras de Receitas (Exigência POC)
            </h2>
            <span className="text-xs text-slate-500 font-mono">Ordenado por Prioridade de Execução</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Prio</th>
                  <th className="p-3">Texto Encontrado</th>
                  <th className="p-3">Banco/Conta</th>
                  <th className="p-3">Tipo Receita</th>
                  <th className="p-3">Natureza da Receita</th>
                  <th className="p-3">Fonte Recurso</th>
                  <th className="p-3">Evento Contábil</th>
                  <th className="p-3">Dedução?</th>
                  <th className="p-3">Confirmação?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rules.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded text-[10px] dark:bg-purple-900/80 dark:text-purple-200">
                        #{r.prioridade}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">{r.textoProcurado}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{r.bancoContaFiltro || "Qualquer Conta"}</td>
                    <td className="p-3 font-semibold text-purple-700 dark:text-purple-300">{r.tipoReceita}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">{r.naturezaReceita}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">{r.fonteRecurso}</td>
                    <td className="p-3 font-mono text-[11px] text-blue-600 dark:text-blue-400 font-semibold">{r.eventoContabil}</td>
                    <td className="p-3">
                      {r.deducaoAplicavel ? (
                        <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px] dark:bg-amber-900/60 dark:text-amber-300">
                          SIM (20% Fundeb)
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded dark:bg-slate-800 dark:text-slate-400">
                          NÃO
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {r.exigeConfirmacao ? (
                        <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded text-[10px] dark:bg-rose-900/60 dark:text-rose-300">
                          SIM (Manual)
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] dark:bg-emerald-900/60 dark:text-emerald-300">
                          NÃO (Automático)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {rules.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-500">
                      <p>Nenhuma regra padrão foi carregada nesta instância.</p>
                      <button
                        type="button"
                        onClick={handleSeedRules}
                        disabled={loading}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                      >
                        <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
                        {loading ? "Criando regras..." : "Criar regras padrão da POC"}
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Nova Regra */}
      {activeTab === "nova" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm max-w-3xl mx-auto space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Cadastrar Nova Regra de Receita Orçamentária
          </h2>

          <form onSubmit={handleCreateRule} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase mb-1">Texto Procurado (Keywords)</label>
                <input
                  type="text"
                  value={textoProcurado}
                  onChange={(e) => setTextoProcurado(e.target.value)}
                  placeholder="Ex: FPM, ICMS, COTA PARTE..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-lg text-sm font-mono"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Banco / Conta</label>
                <input
                  type="text"
                  value={bancoContaFiltro}
                  onChange={(e) => setBancoContaFiltro(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase mb-1">Tipo de Receita</label>
                <input
                  type="text"
                  value={tipoReceita}
                  onChange={(e) => setTipoReceita(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-lg text-sm"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Natureza da Receita (STN/PCASP)</label>
                <input
                  type="text"
                  value={naturezaReceita}
                  onChange={(e) => setNaturezaReceita(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-lg text-sm font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase mb-1">Fonte de Recurso</label>
                <input
                  type="text"
                  value={fonteRecurso}
                  onChange={(e) => setFonteRecurso(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-lg text-sm font-mono"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold uppercase mb-1">Evento Contábil</label>
                <input
                  type="text"
                  value={eventoContabil}
                  onChange={(e) => setEventoContabil(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-lg text-sm font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="deducCheck"
                  checked={deducaoAplicavel}
                  onChange={(e) => setDeducaoAplicavel(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <label htmlFor="deducCheck" className="font-semibold cursor-pointer">Dedução Aplicável (Sim/Não)</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="confCheck"
                  checked={exigeConfirmacao}
                  onChange={(e) => setExigeConfirmacao(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <label htmlFor="confCheck" className="font-semibold cursor-pointer">Exige Confirmação (Sim/Não)</label>
              </div>

              <div>
                <label className="block font-semibold uppercase mb-1">Prioridade</label>
                <input
                  type="number"
                  value={prioridade}
                  onChange={(e) => setPrioridade(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2 rounded-lg text-sm"
                />
              </div>
            </div>

            {errorMsg && <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-lg">{errorMsg}</div>}
            {successMsg && <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg">{successMsg}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all"
            >
              {loading ? "Cadastrando..." : "Salvar Regra de Receita"}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: Fila de Exceções */}
      {activeTab === "excecoes" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Fila de Exceções para Trata de Variações (POC Edital)
              </h2>
              <p className="text-xs text-slate-500">
                Movimentações bancárias que não coincidiram 100% com as regras padrão. Permite homologação rápida e aprendizado do sistema.
              </p>
            </div>
            <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-xs">
              {exceptions.length} Pendentes
            </span>
          </div>

          {exceptions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 italic">
              Nenhuma exceção pendente! Todas as receitas foram classificadas automaticamente.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exceptions.map((item) => {
                const valor = typeof item.valorDecimal === "object" ? Number(item.valorDecimal) : Number(item.valorDecimal || 0);

                return (
                  <div key={item.id} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-amber-300 dark:border-amber-900/80 space-y-3 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">{item.descricao}</span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {item.banco} | Conta: {item.contaNumero}
                        </span>
                      </div>
                      <span className="text-sm font-extrabold text-emerald-600">
                        R$ {valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border text-xs space-y-1">
                      <div className="flex justify-between text-slate-500">
                        <span>Motivo da Exceção:</span>
                        <span className="font-semibold text-amber-600">{item.motivoExcecao}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Sugestão de Receita:</span>
                        <span className="font-bold text-purple-600">{item.sugestaoTipo}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Score de Confiança:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{(item.scoreConfianca * 100).toFixed(0)}%</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleResolveException(item)}
                      disabled={loading}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1 transition-all shadow"
                    >
                      <Zap className="w-4 h-4 text-amber-300" /> {item.statementItemId ? "Processar Receita Constitucional" : "Aprovar Lançamento & Gerar Regra"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
