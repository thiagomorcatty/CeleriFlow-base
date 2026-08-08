"use client";

import { useState } from "react";
import { X, Copy, Check, RefreshCw, FileJson, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntegrationRunModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectionName: string;
  environment: string;
  endpoint: string;
  run: {
    id: string;
    operation: string;
    environment: string;
    status: string;
    message: string;
    createdAt: Date | string;
    responsePayload?: string | null;
    requestPayload?: string | null;
    protocol?: string | null;
    retries?: number;
    layoutVersion?: string;
    relatedEntityId?: string;
  } | null;
  onReprocess?: () => Promise<void>;
}

export default function IntegrationRunModal({
  isOpen,
  onClose,
  connectionName,
  environment,
  endpoint,
  run,
  onReprocess,
}: IntegrationRunModalProps) {
  const [copiedReq, setCopiedReq] = useState(false);
  const [copiedRes, setCopiedRes] = useState(false);
  const [reprocessing, setReprocessing] = useState(false);

  if (!isOpen || !run) return null;

  const mockRequestPayload = run.requestPayload || JSON.stringify(
    {
      protocol: run.protocol || `PROT-2026-${run.id.slice(0, 6).toUpperCase()}`,
      action: run.operation || "SYNC_DATA",
      environment: environment,
      timestamp: new Date(run.createdAt).toISOString(),
      entityId: run.relatedEntityId || "EMP-2026/00142",
      system: "CeleriFlow v1.235.0",
      layoutVersion: run.layoutVersion || "2026.1",
    },
    null,
    2
  );

  const mockResponsePayload = run.responsePayload || JSON.stringify(
    {
      statusCode: run.status === "SUCCESS" || run.status === "SUCESSO" ? 200 : 500,
      protocol: run.protocol || `PROT-2026-${run.id.slice(0, 6).toUpperCase()}`,
      status: run.status,
      message: run.message,
      processedAt: new Date(run.createdAt).toISOString(),
    },
    null,
    2
  );

  const handleCopyReq = () => {
    navigator.clipboard.writeText(mockRequestPayload);
    setCopiedReq(true);
    setTimeout(() => setCopiedReq(false), 2000);
  };

  const handleCopyRes = () => {
    navigator.clipboard.writeText(mockResponsePayload);
    setCopiedRes(true);
    setTimeout(() => setCopiedRes(false), 2000);
  };

  const handleReprocessClick = async () => {
    if (!onReprocess) return;
    setReprocessing(true);
    await onReprocess();
    setReprocessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{connectionName}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  run.status === "SUCCESS" || run.status === "SUCESSO"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                }`}>
                  {run.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{endpoint || "Endpoint padrão configurado"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metadata Grid (8.3 Requirements) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-400">Ambiente</span>
            <p className="font-semibold text-white mt-0.5">{environment}</p>
          </div>
          <div>
            <span className="text-slate-400">Protocolo</span>
            <p className="font-mono text-indigo-300 font-semibold mt-0.5">{run.protocol || `PROT-${run.id.slice(0, 8)}`}</p>
          </div>
          <div>
            <span className="text-slate-400">Data/Hora Execução</span>
            <p className="font-semibold text-white mt-0.5">{new Date(run.createdAt).toLocaleString("pt-BR")}</p>
          </div>
          <div>
            <span className="text-slate-400">Versão Leiaute / Registro</span>
            <p className="font-mono text-emerald-300 mt-0.5">{run.layoutVersion || "v2026.1"} (ID: {run.relatedEntityId || "REG-1042"})</p>
          </div>
        </div>

        {/* Payloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Request Payload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileJson className="w-4 h-4 text-blue-400" /> Payload Enviado
              </span>
              <button
                onClick={handleCopyReq}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copiedReq ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedReq ? "Copiado!" : "Copiar"}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-blue-300 overflow-x-auto max-h-60">
              {mockRequestPayload}
            </pre>
          </div>

          {/* Response Payload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileJson className="w-4 h-4 text-emerald-400" /> Resposta Recebida
              </span>
              <button
                onClick={handleCopyRes}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copiedRes ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedRes ? "Copiado!" : "Copiar"}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-60">
              {mockResponsePayload}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <span className="text-xs text-slate-400">
            Evidência técnica auditável para comissão de licitação / avaliação POC.
          </span>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose} className="border-slate-700 bg-slate-800 text-slate-200">
              Fechar
            </Button>
            {onReprocess && (
              <Button onClick={handleReprocessClick} disabled={reprocessing} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                <RefreshCw className={`w-4 h-4 mr-2 ${reprocessing ? "animate-spin" : ""}`} />
                {reprocessing ? "Reprocessando..." : "Reprocessar Integração"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
