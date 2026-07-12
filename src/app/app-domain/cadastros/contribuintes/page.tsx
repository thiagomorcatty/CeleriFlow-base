import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, Search, Plus, Upload, Download } from "lucide-react";
import ContribuintesClient from "./ContribuintesClient";

export const dynamic = "force-dynamic";

export default async function ContribuintesPage() {
  const taxpayers = await prisma.taxpayer.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      person: true,
      company: true,
    },
    take: 20
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-600" />
            Contribuintes
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os contribuintes (Pessoas Físicas e Jurídicas) do município.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            Importar
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <Link href="/cadastros/contribuintes/novo" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Adicionar Novo Contribuinte
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por Nome, Inscrição ou Documento..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600"
            />
          </div>
        </div>

        <ContribuintesClient taxpayers={taxpayers} />
      </div>
    </div>
  );
}
