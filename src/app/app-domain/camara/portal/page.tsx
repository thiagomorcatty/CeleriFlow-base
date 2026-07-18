import Link from "next/link";
import { FileText, Globe, Scale, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function PortalLegislativoPage() {
  const [vereadores, proposicoes, leis, sessoes] = await Promise.all([
    prisma.camVereador.count({ where: { active: true, status: "Em Exercício" } }),
    prisma.camProposicao.count(),
    prisma.camLei.count({ where: { status: "Vigente" } }),
    prisma.camSessao.findMany({ where: { status: { in: ["Agendada", "Em Preparação"] } }, orderBy: { data: "asc" }, take: 3 }),
  ]);
  const cards = [{ label: "Vereadores em exercício", value: vereadores, icon: Users }, { label: "Proposições protocoladas", value: proposicoes, icon: FileText }, { label: "Normas vigentes", value: leis, icon: Scale }];

  return <div className="flex-1 p-8"><div className="mb-8"><div className="mb-2 flex items-center gap-2 text-sm"><Link href="/camara" className="text-gray-500 hover:text-gray-700">Câmara Municipal</Link><span className="text-gray-400">/</span><span className="font-medium text-gray-900">Portal Legislativo</span></div><h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900"><Globe className="h-6 w-6 text-[#9333EA]" /> Transparência Legislativa</h1></div><div className="grid gap-4 md:grid-cols-3">{cards.map((card) => <div key={card.label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"><card.icon className="mb-3 h-5 w-5 text-[#9333EA]" /><p className="text-3xl font-bold text-gray-900">{card.value}</p><p className="mt-1 text-sm text-gray-500">{card.label}</p></div>)}</div><section className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"><h2 className="mb-4 font-semibold text-gray-900">Próximas sessões</h2>{sessoes.length ? <div className="space-y-3">{sessoes.map((sessao) => <div key={sessao.id} className="flex justify-between border-b border-gray-100 pb-3 text-sm last:border-0"><span>{sessao.numero}ª Sessão {sessao.tipo}</span><span className="text-gray-500">{new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(sessao.data)}</span></div>)}</div> : <p className="text-sm text-gray-500">Não há sessões agendadas.</p>}</section></div>;
}
