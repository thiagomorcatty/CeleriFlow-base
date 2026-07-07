import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DiarioOficialPage() {
  const diaries = await prisma.officialDiary.findMany({
    orderBy: { editionNumber: 'desc' },
    include: { author: true }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
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
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Edição</th>
                <th className="px-6 py-4">Data de Publicação</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Responsável</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {diaries.map(diary => (
                <tr key={diary.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-800 text-base">Nº {diary.editionNumber}</td>
                  <td className="px-6 py-4 text-slate-600">{diary.publishDate.toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${diary.status === 'Publicado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {diary.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{diary.author?.name || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
