import Link from "next/link";
import { Mic } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AudienciasPage() {
  const audiencias = await prisma.camAudiencia.findMany({
    include: { sessao: true, legislatura: true },
    orderBy: { data: "desc" },
  });

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm"><Link href="/camara" className="text-gray-500 hover:text-gray-700">Câmara Municipal</Link><span className="text-gray-400">/</span><span className="font-medium text-gray-900">Audiências</span></div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900"><Mic className="h-6 w-6 text-[#9333EA]" /> Audiências Públicas</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {audiencias.map((audiencia) => <article key={audiencia.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"><div className="mb-3 flex items-start justify-between gap-3"><h2 className="font-semibold text-gray-900">{audiencia.tema}</h2><span className="whitespace-nowrap rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">{audiencia.status}</span></div><p className="mb-4 text-sm text-gray-600">{audiencia.descricao || "Sem descrição."}</p><dl className="space-y-1 text-sm text-gray-500"><div>Data: {new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(audiencia.data)}</div><div>Local: {audiencia.local}</div><div>Tipo: {audiencia.tipo}</div>{audiencia.legislatura && <div>Legislatura: {audiencia.legislatura.numero}ª</div>}</dl></article>)}
      </div>
      {audiencias.length === 0 && <p className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-gray-500">Nenhuma audiência cadastrada.</p>}
    </div>
  );
}
