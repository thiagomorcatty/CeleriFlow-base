import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileOutput } from "lucide-react";
import PaginasTable from "./PaginasTable";

export const dynamic = "force-dynamic";

export default async function PaginasPage() {
  const pages = await prisma.portalPage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/transparencia" className="text-sm font-semibold text-blue-600 hover:underline mb-2 inline-block">
            &larr; Voltar para Transparência
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Páginas Institucionais</h1>
          <p className="text-slate-500 mt-1">Gerencie as páginas estáticas do portal da prefeitura.</p>
        </div>
        <Link href="/transparencia/paginas/novo" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Nova Página
        </Link>
      </div>
      
      {pages.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <FileOutput className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhuma página encontrada</h3>
          <p className="text-slate-500 mt-1">Crie páginas como "História", "Prefeito" ou "Estrutura".</p>
        </div>
      ) : (
        <PaginasTable pages={pages} />
      )}
    </div>
  );
}
