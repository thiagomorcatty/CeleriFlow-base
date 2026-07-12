import { FileSignature, CheckCircle2, FileText, PenTool } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AssinaturasPage() {
  const processos = await prisma.process.findMany({
    where: {
      status: 'Aguardando Assinatura'
    },
    include: {
      processType: true,
      subject: true,
      person: true,
      company: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-emerald-600" />
            Assinaturas Pendentes
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os documentos que aguardam sua assinatura digital.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {processos.length === 0 ? (
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
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {processos.map((processo) => (
                  <tr key={processo.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="block font-bold text-slate-800">{processo.protocolNumber}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{processo.description}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="block font-medium text-slate-800">{processo.processType.name}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{processo.subject.name}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(processo.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ml-auto">
                        <PenTool className="w-4 h-4" />
                        Assinar
                      </button>
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
