import { MessageSquareWarning, EyeOff } from "lucide-react";
import Link from "next/link";
import { canViewOmbudsmanIdentity, getAttendanceContext, ombudsmanScope } from "@/lib/attendance/access";
import OuvidoriaClient from "./OuvidoriaClient";

export const dynamic = "force-dynamic";

export default async function OuvidoriaPage() {
  const context = await getAttendanceContext();
  const { prisma } = context;
  const manifestacoes = await prisma.ombudsman.findMany({
    where: ombudsmanScope(context),
    take: 20,
    orderBy: { createdAt: 'desc' },
    select: { id: true, protocolNumber: true, type: true, subject: true, isAnonymous: true, isConfidential: true, status: true, createdAt: true, person: { select: { fullName: true } }, accessGrants: { where: { userId: context.user.id }, select: { canViewIdentity: true } } },
  });
  const safeManifestacoes = manifestacoes.map((manifestacao) => ({
    ...manifestacao,
    person: canViewOmbudsmanIdentity(context, manifestacao.isConfidential, manifestacao.accessGrants.some((grant) => grant.canViewIdentity)) ? manifestacao.person : null,
  }));

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquareWarning className="w-6 h-6 text-amber-600" />
            Ouvidoria
          </h1>
          <p className="text-slate-500 mt-1">Gerenciamento de manifestações, com tratamento controlado de sigilo.</p>
        </div>
        {context.attendanceAccess.isOmbudsman && <Link href="/atendimento/ouvidoria/nova" className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold">Nova manifestação</Link>}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-sm">
        <EyeOff className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-1">Área Restrita (LGPD)</strong>
          Denúncias anônimas e informações sigilosas são protegidas por lei. O vazamento de dados desta tela configura infração grave.
        </div>
      </div>

      <OuvidoriaClient initialManifestacoes={safeManifestacoes} canManage={context.attendanceAccess.isOmbudsman} />
    </div>
  );
}
