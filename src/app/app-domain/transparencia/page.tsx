import { Eye, FileText, Newspaper, FileOutput, Scale, Gavel, FileSignature } from "lucide-react";
import Link from "next/link";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export const dynamic = "force-dynamic";

export default async function TransparenciaPage() {
  const { prisma } = await getTenantContextForModule("TRANSPARENCIA");
  const newsCount = await prisma.portalNews.count();
  const pagesCount = await prisma.portalPage.count();
  const diariesCount = await prisma.officialDiary.count();
  const biddingsCount = await prisma.bidding.count();
  const contractsCount = await prisma.contract.count();

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Portal e Transparência</h1>
        <p className="text-slate-500 mt-2">Gestão do portal público, publicações oficiais e dados abertos.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Link href="/transparencia/noticias" className="block group">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm transition-all hover:shadow-md hover:border-blue-300 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <Newspaper className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{newsCount}</h3>
            <p className="text-xs font-medium text-slate-500 uppercase mt-1">Notícias</p>
          </div>
        </Link>
        <Link href="/transparencia/diario-oficial" className="block group">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm transition-all hover:shadow-md hover:border-emerald-300 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{diariesCount}</h3>
            <p className="text-xs font-medium text-slate-500 uppercase mt-1">Diário Oficial</p>
          </div>
        </Link>
        <Link href="/transparencia/paginas" className="block group">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm transition-all hover:shadow-md hover:border-purple-300 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <FileOutput className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{pagesCount}</h3>
            <p className="text-xs font-medium text-slate-500 uppercase mt-1">Páginas</p>
          </div>
        </Link>
        <Link href="/transparencia/licitacoes" className="block group">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm transition-all hover:shadow-md hover:border-amber-300 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <Gavel className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{biddingsCount}</h3>
            <p className="text-xs font-medium text-slate-500 uppercase mt-1">Licitações</p>
          </div>
        </Link>
        <Link href="/transparencia/contratos" className="block group">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm transition-all hover:shadow-md hover:border-teal-300 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
              <FileSignature className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{contractsCount}</h3>
            <p className="text-xs font-medium text-slate-500 uppercase mt-1">Contratos</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
