import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Newspaper } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NoticiasPage() {
  const news = await prisma.portalNews.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notícias</h1>
          <p className="text-slate-500 mt-1">Gerencie as notícias do portal da prefeitura.</p>
        </div>
        <Link href="/transparencia/noticias/novo" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Nova Notícia
        </Link>
      </div>
      
      {news.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Newspaper className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhuma notícia encontrada</h3>
          <p className="text-slate-500 mt-1">Comece publicando a primeira notícia do portal.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Autor</th>
                <th className="px-6 py-4 text-right">Criado em</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {news.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.author?.name || "-"}</td>
                  <td className="px-6 py-4 text-slate-600 text-right">{item.createdAt.toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
