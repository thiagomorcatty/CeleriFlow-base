import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BannersPage() {
  const banners = await prisma.portalBanner.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Banners</h1>
          <p className="text-slate-500 mt-1">Gerencie os destaques da página inicial do portal.</p>
        </div>
        <Link href="/transparencia/banners/novo" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          Novo Banner
        </Link>
      </div>
      
      {banners.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Eye className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhum banner cadastrado</h3>
          <p className="text-slate-500 mt-1">Adicione banners para destacar informações importantes.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Posição</th>
                <th className="px-6 py-4">Ordem</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {banners.map(banner => (
                <tr key={banner.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{banner.title}</td>
                  <td className="px-6 py-4 text-slate-600">{banner.position}</td>
                  <td className="px-6 py-4 text-slate-600">{banner.order}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${banner.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {banner.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
