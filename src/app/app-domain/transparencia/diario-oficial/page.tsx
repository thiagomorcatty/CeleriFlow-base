import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText } from "lucide-react";
import DiarioTable from "./DiarioTable";

export const dynamic = "force-dynamic";

export default async function DiarioOficialPage() {
  const diaries = await prisma.officialDiary.findMany({
    orderBy: { editionNumber: 'desc' },
    include: { author: true }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/transparencia" className="text-sm font-semibold text-blue-600 hover:underline mb-2 inline-block">
            &larr; Voltar para Transparência
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Diário Oficial</h1>
          <p className="text-slate-500 mt-1">Gestão de edições do diário oficial eletrônico (DOM).</p>
        </div>
        <Link href="/transparencia/diario-oficial/novo" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Nova Edição
        </Link>
      </div>
      
      {diaries.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <FileText className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhuma edição publicada</h3>
          <p className="text-slate-500 mt-1">Gere e publique a primeira edição do Diário Oficial.</p>
        </div>
      ) : (
        <DiarioTable diaries={diaries} />
      )}
    </div>
  );
}
