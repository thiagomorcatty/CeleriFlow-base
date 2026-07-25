"use client";

import { FileSignature, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type ProcessDocument = {
  id: string;
  createdAt: Date | string;
  process: { id: string; protocolNumber: string };
  document: { id: string; title: string; documentType: string; createdAt: Date | string } | null;
};

export default function AssinaturasClient({ initialDocuments }: { initialDocuments: ProcessDocument[] }) {
  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-emerald-600" />
            Assinaturas Pendentes
          </h1>
          <p className="text-slate-500 mt-1">Documentos de processos usam a mesma manifestação central do GED.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {initialDocuments.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Tudo em dia!</h3>
            <p className="text-slate-500 mt-1">Você não possui documentos aguardando assinatura no momento.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Documento / Processo</th>
                  <th className="px-6 py-3">Assunto</th>
                  <th className="px-6 py-3">Data de Solicitação</th>
                    <th className="px-6 py-3 text-right">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {initialDocuments.map((processDocument) => (
                  <tr key={processDocument.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="block font-bold text-slate-800">{processDocument.document?.title}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{processDocument.process.protocolNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="block font-medium text-slate-800">{processDocument.document?.documentType || "Arquivo"}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Vinculado ao processo</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(processDocument.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href="/documentos/assinaturas" className="text-sm font-semibold text-emerald-700 hover:underline">Abrir assinatura</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
