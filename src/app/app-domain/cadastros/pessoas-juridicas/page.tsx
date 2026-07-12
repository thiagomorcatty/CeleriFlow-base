import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Building2, Search, Plus } from "lucide-react";
import { ImportExportDropdown } from "@/components/ui/ImportExportDropdown";
import PessoasJuridicasClient from "./PessoasJuridicasClient";

export const dynamic = "force-dynamic";

export default async function PessoasJuridicasPage() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-600" />
            Pessoas Jurídicas
          </h1>
          <p className="text-slate-500 mt-1">Gerencie as empresas, entidades, fornecedores e instituições cadastradas.</p>
        </div>
        <div className="flex items-center gap-2">
          <ImportExportDropdown />
          <Link href="/cadastros/pessoas-juridicas/novo" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Adicionar Nova Empresa
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por Razão Social ou CNPJ..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>
        </div>

        <PessoasJuridicasClient companies={companies} />
      </div>
    </div>
  );
}
