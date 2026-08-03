"use client";

import { useState } from "react";
import { ShieldCheck, QrCode, FileCheck, CheckCircle2, Lock } from "lucide-react";
import { issueEnvironmentalLicenseAction } from "./licencas-actions";

export function LicenciamentoInteractiveClient() {
  const [numProcesso, setNumProcesso] = useState("PROC-AMB-2026/0491");
  const [tipoLicenca, setTipoLicenca] = useState<"LP - Licença Prévia" | "LI - Licença de Instalação" | "LO - Licença de Operação">("LO - Licença de Operação");
  const [requerente, setRequerente] = useState("INDÚSTRIA E COMÉRCIO MODELO S/A");
  const [cnpjCpf, setCnpjCpf] = useState("12.345.678/0001-90");
  const [atividade, setAtividade] = useState("Fabricação de Produtos Químicos não Perigosos");
  const [endereco, setEndereco] = useState("Av. Industrial, 500 - Distrito Industrial");
  const [validadeMeses, setValidadeMeses] = useState(24);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  async function handleIssueLicense(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await issueEnvironmentalLicenseAction({
      numeroProcesso: numProcesso,
      tipoLicenca,
      requerenteNome: requerente,
      requerenteCnpjCpf: cnpjCpf,
      atividade,
      enderecoEmpreendimento: endereco,
      validadeMeses,
    });

    setLoading(false);

    if (res.data) {
      setResult(res.data);
    } else {
      alert(res.error || "Erro ao emitir Licença Ambiental.");
    }
  }

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white rounded-xl p-5 shadow-lg space-y-4 mb-6 border border-emerald-800/40">
      <div className="flex justify-between items-start border-b border-emerald-900/60 pb-3">
        <div>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Motor de Licenciamento Ambiental Digital (LP / LI / LO)
          </span>
          <h2 className="text-xl font-bold mt-1 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Emissão Oficial de Licença com Autenticação QR Code &amp; SHA-256
          </h2>
        </div>
        <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
          ICP-Brasil / Digital
        </span>
      </div>

      <form onSubmit={handleIssueLicense} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Número do Processo</label>
          <input
            type="text"
            value={numProcesso}
            onChange={(e) => setNumProcesso(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Tipo de Licença</label>
          <select
            value={tipoLicenca}
            onChange={(e: any) => setTipoLicenca(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-semibold"
          >
            <option value="LP - Licença Prévia">LP - Licença Prévia</option>
            <option value="LI - Licença de Instalação">LI - Licença de Instalação</option>
            <option value="LO - Licença de Operação">LO - Licença de Operação</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Requerente / Razão Social</label>
          <input
            type="text"
            value={requerente}
            onChange={(e) => setRequerente(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-semibold"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">CNPJ / CPF Requerente</label>
          <input
            type="text"
            value={cnpjCpf}
            onChange={(e) => setCnpjCpf(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Atividade Licenciada</label>
          <input
            type="text"
            value={atividade}
            onChange={(e) => setAtividade(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Validade (Meses)</label>
          <input
            type="number"
            value={validadeMeses}
            onChange={(e) => setValidadeMeses(parseInt(e.target.value) || 12)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-emerald-400 font-bold"
            required
          />
        </div>

        <div className="sm:col-span-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 shadow text-sm transition-all"
          >
            <FileCheck className="w-4 h-4" /> Emitir Licença Ambiental Digital com QR Code
          </button>
        </div>
      </form>

      {result && (
        <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/80 text-xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-bold text-emerald-300">{result.numeroLicenca} ({result.tipoLicenca})</span>
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded">
              EMITIDA E HOMOLOGADA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-slate-500 block">Hash de Autenticidade (SHA-256)</span>
              <span className="font-mono text-emerald-400 text-[10px] break-all">{result.hashSHA256}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Link de Validação Pública QR Code</span>
              <span className="font-mono text-blue-400 text-[10px] underline">{result.qrCodeValidationUrl}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
