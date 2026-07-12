import { FileSignature, Search, CheckCircle, XCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import AssinaturasClient from "./AssinaturasClient";

export const dynamic = "force-dynamic";

export default async function AssinaturasPage() {
  const pendentes = await prisma.document.findMany({
    where: { status: 'Pendente Assinatura' },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-indigo-600" />
            Assinaturas Eletrônicas
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os documentos que aguardam sua assinatura.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar documentos pendentes..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {pendentes.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              Você não possui documentos pendentes de assinatura no momento.
            </div>
          ) : (
            <AssinaturasClient initialDocuments={pendentes} />
          )}
        </div>
      </div>
    </div>
  );
}
