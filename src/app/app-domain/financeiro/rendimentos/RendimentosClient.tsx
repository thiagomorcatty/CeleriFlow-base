"use client";

import { useState } from "react";
import { TrendingUp, Calculator, ShieldCheck, CheckCircle2, FileText, Percent, Coins, RotateCcw, Send } from "lucide-react";
import { calculateYieldAction, transmitYieldAction } from "./rendimentos-actions";

interface YieldRecord {
  id: string;
  contaNumero: string;
  data: string;
  valorBrutoDecimal: any;
  irrfDecimal: any;
  iofDecimal: any;
  correcaoDecimal: any;
  valorLiquidoDecimal: any;
  saldoAcumuladoDecimal: any;
  tipoRendimento: string;
  reciboMunicipal: string | null;
  createdAt: string;
}

export default function RendimentosClient({ initialHistory = [] }: { initialHistory?: YieldRecord[] }) {
  const [contaNumero, setContaNumero] = useState("90001-4");
  const [valorBruto, setValorBruto] = useState<number>(3420.5);
  const [irrf, setIrrf] = useState<number>(513.07);
  const [iof, setIof] = useState<number>(0.0);
  const [correcaoMonetaria, setCorrecaoMonetaria] = useState<number>(0.0);
  const [saldoAnteriorAcumulado, setSaldoAnteriorAcumulado] = useState<number>(145800.0);
  const [isEstorno, setIsEstorno] = useState<boolean>(false);

  const [calculation, setCalculation] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [transmitting, setTransmitting] = useState(false);
  const [receipt, setReceipt] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [history, setHistory] = useState<YieldRecord[]>(initialHistory);

  async function handleCalculate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setLoading(true);
    setReceipt(null);
    setErrorMsg(null);

    const res = await calculateYieldAction({
      valorBruto,
      irrf,
      iof,
      correcaoMonetaria,
      saldoAnteriorAcumulado,
      isEstorno,
    });

    setLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setCalculation(res.data);
    }
  }

  async function handleTransmit() {
    if (!calculation) return;
    setTransmitting(true);
    setErrorMsg(null);

    const res = await transmitYieldAction({
      contaNumero,
      data: new Date().toISOString(),
      valorBruto: calculation.valorBruto,
      irrf: calculation.irrf,
      iof: calculation.iof,
      correcaoMonetaria: calculation.correcaoMonetaria,
      valorLiquido: calculation.valorLiquido,
      saldoAcumulado: calculation.saldoAcumulado,
      tipo: calculation.tipo,
    });

    setTransmitting(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setReceipt(res.data);
      setHistory((prev) => [
        {
          id: res.data.yieldTransactionId,
          contaNumero,
          data: new Date().toISOString(),
          valorBrutoDecimal: calculation.valorBruto,
          irrfDecimal: calculation.irrf,
          iofDecimal: calculation.iof,
          correcaoDecimal: calculation.correcaoMonetaria,
          valorLiquidoDecimal: calculation.valorLiquido,
          saldoAcumuladoDecimal: calculation.saldoAcumulado,
          tipoRendimento: calculation.tipo,
          reciboMunicipal: res.data.reciboId,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300">
              Funcionalidade 3 — POC Edital
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            Gestão de Rendimentos de Aplicação Financeira
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Leitura do extrato de aplicação, apuração de Rendimento Bruto, Líquido, IRRF, IOF, Correção Monetária e Acumulado com classificação contábil e transmissão municipal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Calculadora */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Calculator className="w-5 h-5 text-emerald-600" />
            Apuração de Rendimentos do Extrato
          </h2>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Conta da Aplicação Financeira
              </label>
              <input
                type="text"
                value={contaNumero}
                onChange={(e) => setContaNumero(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Rendimento Bruto (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={valorBruto}
                  onChange={(e) => setValorBruto(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 text-sm font-bold text-emerald-600 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Imposto de Renda (IRRF R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={irrf}
                  onChange={(e) => setIrrf(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 text-sm font-bold text-rose-600 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  IOF Retido (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={iof}
                  onChange={(e) => setIof(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Correção Monetária (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={correcaoMonetaria}
                  onChange={(e) => setCorrecaoMonetaria(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Saldo Acumulado Anterior (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={saldoAnteriorAcumulado}
                onChange={(e) => setSaldoAnteriorAcumulado(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="estornoCheck"
                checked={isEstorno}
                onChange={(e) => setIsEstorno(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="estornoCheck" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-amber-500" /> Marcar como Estorno de Rendimento
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Coins className="w-5 h-5" />
              Calcular &amp; Gerar Demonstrativo
            </button>
          </form>
        </div>

        {/* Quadro Demonstrativo & Classificação Contábil */}
        <div className="lg:col-span-7 space-y-4">
          {!calculation ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center text-slate-500 dark:text-slate-400 italic">
              Preencha os valores do extrato e clique em &quot;Calcular &amp; Gerar Demonstrativo&quot;.
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Percent className="w-5 h-5 text-emerald-600" />
                  Demonstrativo de Apuração de Rendimento
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full dark:bg-emerald-900 dark:text-emerald-300">
                  Tipo: {calculation.tipo}
                </span>
              </div>

              {/* Grid 4 Cards com Totais */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 font-semibold block">Rendimento Bruto</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-white">
                    R$ {calculation.valorBruto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 font-semibold block">IRRF / IOF Retido</span>
                  <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                    - R$ {(calculation.irrf + calculation.iof).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold block">Rendimento Líquido</span>
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    R$ {calculation.valorLiquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 font-semibold block">Saldo Acumulado</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    R$ {calculation.saldoAcumulado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Classificação Contábil Exigida pelo Edital */}
              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-2">
                <span className="text-amber-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <FileText className="w-4 h-4" /> Classificação Contábil Automática (PCASP / STN)
                </span>
                <div className="space-y-1 border-t border-slate-800 pt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Conta Débito:</span>
                    <span className="text-emerald-400">{calculation.classificacaoContabil.contaDebito}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Conta Crédito:</span>
                    <span className="text-emerald-400">{calculation.classificacaoContabil.contaCredito}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Evento Contábil:</span>
                    <span className="text-blue-300">{calculation.classificacaoContabil.eventoContabil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Natureza da Receita:</span>
                    <span className="text-slate-300">{calculation.classificacaoContabil.naturezaReceita}</span>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 text-xs rounded-lg">{errorMsg}</div>
              )}

              {/* Transmissão Municipal */}
              {!receipt ? (
                <button
                  onClick={handleTransmit}
                  disabled={transmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  {transmitting ? (
                    "Transmitindo ao Sistema Municipal..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Transmitir Rendimento &amp; Obter Recibo Municipal
                    </>
                  )}
                </button>
              ) : (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Operação Concluída &amp; Homologada!
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                      {receipt.status}
                    </span>
                  </div>
                  <div className="font-mono text-slate-700 dark:text-slate-300 space-y-1">
                    <div>Recibo: <strong className="text-emerald-700 dark:text-emerald-300">{receipt.reciboId}</strong></div>
                    <div>Lançamento Contábil: <strong>{receipt.numeroLancamento}</strong></div>
                    <div className="truncate">Hash SHA-256: <span className="text-[10px] text-slate-500">{receipt.hashTransmissao}</span></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Histórico */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Histórico de Rendimentos Apurados</h3>
        {history.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Nenhum rendimento transmitido ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700 uppercase">
                <tr>
                  <th className="p-3">Data</th>
                  <th className="p-3">Conta Aplicação</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Bruto</th>
                  <th className="p-3">Tributos</th>
                  <th className="p-3">Líquido</th>
                  <th className="p-3">Saldo Acumulado</th>
                  <th className="p-3">Recibo Municipal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {history.map((h) => {
                  const b = Number(h.valorBrutoDecimal || 0);
                  const l = Number(h.valorLiquidoDecimal || 0);
                  const t = Number(h.irrfDecimal || 0) + Number(h.iofDecimal || 0);
                  const s = Number(h.saldoAcumuladoDecimal || 0);

                  return (
                    <tr key={h.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-slate-500">{new Date(h.data).toLocaleDateString("pt-BR")}</td>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{h.contaNumero}</td>
                      <td className="p-3">
                        <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded dark:bg-slate-800 dark:text-slate-300">
                          {h.tipoRendimento}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-700 dark:text-slate-300">R$ {b.toFixed(2)}</td>
                      <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">- R$ {t.toFixed(2)}</td>
                      <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">R$ {l.toFixed(2)}</td>
                      <td className="p-3 font-bold text-blue-600 dark:text-blue-400">R$ {s.toFixed(2)}</td>
                      <td className="p-3 font-mono text-xs text-slate-600 dark:text-slate-400">{h.reciboMunicipal || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
