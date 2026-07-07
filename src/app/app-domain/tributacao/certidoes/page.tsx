import { FileBadge, Search, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CertidoesPage() {
  const certs = await prisma.taxCertificate.findMany({
    include: {
      taxpayer: { include: { person: true, company: true } }
    },
    take: 20,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileBadge className="w-6 h-6 text-sky-600" />
            Certidões Tributárias
          </h1>
          <p className="text-slate-500 mt-1">Emissão e consulta de certidões negativas e de regularidade fiscal.</p>
        </div>
        <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Emitir Certidão
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {certs.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileBadge className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhuma certidão emitida</h3>
            <p className="text-slate-500 mt-1">As certidões fiscais aparecerão aqui.</p>
          </div>
        ) : (
          <div className="p-4 text-slate-500">Listagem de Certidões (Em construção)</div>
        )}
      </div>
    </div>
  );
}
