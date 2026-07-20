import { MessageSquareWarning, EyeOff } from "lucide-react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import OuvidoriaClient from "./OuvidoriaClient";

export const dynamic = "force-dynamic";

export default async function OuvidoriaPage() {
  const { prisma } = await getTenantContextForModule("ATENDIMENTO");
  const manifestacoes = await prisma.ombudsman.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
    include: {
      person: { select: { fullName: true } }
    }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquareWarning className="w-6 h-6 text-amber-600" />
            Ouvidoria (Denúncias e Reclamações)
          </h1>
          <p className="text-slate-500 mt-1">Gerenciamento de manifestações sigilosas, denúncias e elogios.</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-sm">
        <EyeOff className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-1">Área Restrita (LGPD)</strong>
          Denúncias anônimas e informações sigilosas são protegidas por lei. O vazamento de dados desta tela configura infração grave.
        </div>
      </div>

      <OuvidoriaClient initialManifestacoes={manifestacoes} />
    </div>
  );
}
