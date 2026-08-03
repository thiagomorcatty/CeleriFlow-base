"use client";

import { useState } from "react";
import { Droplet, QrCode, Calculator, CheckCircle2, Receipt } from "lucide-react";
import { processMeterReadingAction } from "./leituras-actions";

export function LeiturasInteractiveClient() {
  const [matricula, setMatricula] = useState("MAT-9921-04");
  const [consumidor, setConsumidor] = useState("JOÃO PEDRO DOS SANTOS");
  const [endereco, setEndereco] = useState("RUA DAS ACÁCIAS, 140 - BAIRRO DAS FREIRAS");
  const [hidrometro, setHidrometro] = useState("A2026-99182");
  const [leituraAnterior, setLeituraAnterior] = useState<number>(450.0);
  const [leituraAtual, setLeituraAtual] = useState<number>(478.0);
  const [tipoTarifa, setTipoTarifa] = useState<"RESIDENCIAL" | "COMERCIAL" | "INDUSTRIAL">("RESIDENCIAL");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  async function handleProcessReading(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await processMeterReadingAction({
      codigoMatricula: matricula,
      nomeConsumidor: consumidor,
      endereco,
      numeroHidrometro: hidrometro,
      leituraAnterior,
      leituraAtual,
      tipoTarifa,
    });

    setLoading(false);

    if (res.data) {
      setResult(res.data);
    } else {
      alert(res.error || "Erro ao processar leitura.");
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-950 via-cyan-950 to-slate-900 text-white rounded-xl p-5 shadow-lg space-y-4 mb-6 border border-blue-800/40">
      <div className="flex justify-between items-start border-b border-blue-900/60 pb-3">
        <div>
          <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Motor de Leitura Móvel de Hidrômetros &amp; Emissão Simultânea
          </span>
          <h2 className="text-xl font-bold mt-1 flex items-center gap-2">
            <Droplet className="w-6 h-6 text-cyan-400" />
            Coleta de Campo, Cálculo por Faixas e Fatura Pix
          </h2>
        </div>
        <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
          Conta Simultânea
        </span>
      </div>

      <form onSubmit={handleProcessReading} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Matrícula da Unidade</label>
          <input
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Nome do Consumidor</label>
          <input
            type="text"
            value={consumidor}
            onChange={(e) => setConsumidor(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-semibold"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">N° do Hidrômetro</label>
          <input
            type="text"
            value={hidrometro}
            onChange={(e) => setHidrometro(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Tipo de Tarifa</label>
          <select
            value={tipoTarifa}
            onChange={(e: any) => setTipoTarifa(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-semibold"
          >
            <option value="RESIDENCIAL">RESIDENCIAL</option>
            <option value="COMERCIAL">COMERCIAL</option>
            <option value="INDUSTRIAL">INDUSTRIAL</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Leitura Anterior (m³)</label>
          <input
            type="number"
            step="0.1"
            value={leituraAnterior}
            onChange={(e) => setLeituraAnterior(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-400 font-bold"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Leitura Atual (m³)</label>
          <input
            type="number"
            step="0.1"
            value={leituraAtual}
            onChange={(e) => setLeituraAtual(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-cyan-400 font-bold"
            required
          />
        </div>

        <div className="sm:col-span-2 flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 shadow text-sm transition-all"
          >
            <Calculator className="w-4 h-4" /> Efetuar Leitura e Imprimir Fatura Simultânea
          </button>
        </div>
      </form>

      {result && (
        <div className="bg-slate-950 p-4 rounded-xl border border-blue-800/80 text-xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-bold text-cyan-300">Fatura Emitida — {result.record.nomeConsumidor} ({result.record.codigoMatricula})</span>
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded">
              FATURA IMPRESSA / EMITIDA
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-slate-500 block">Consumo Médio Apurado</span>
              <span className="font-bold text-white text-sm">{result.billing.consumoM3} m³</span>
            </div>
            <div>
              <span className="text-slate-500 block">Tarifa de Água</span>
              <span className="font-bold text-slate-300">R$ {result.billing.tarifaAgua.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Tarifa de Esgoto (80%)</span>
              <span className="font-bold text-slate-300">R$ {result.billing.tarifaEsgoto.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Valor Total da Fatura</span>
              <span className="font-bold text-emerald-400 text-base">R$ {result.billing.valorTotalFatura.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px]">
            <span className="font-mono text-slate-400">Linha Digitável: {result.billing.linhaDigitavel}</span>
            <span className="font-mono text-cyan-400">Pix QR Code Prontidão Ativa</span>
          </div>
        </div>
      )}
    </div>
  );
}
