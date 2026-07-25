import { AlertTriangle, Archive, ClipboardList, FileBox, FileText, Timer } from "lucide-react";
import Link from "next/link";
import { getProtocolContext, protocolScope } from "@/lib/protocols/access";

export const dynamic = "force-dynamic";

export default async function ProtocolosDashboardPage() {
  const context = await getProtocolContext();
  const { prisma } = context;
  const scope = protocolScope(context);
  const now = new Date();
  const [totalProcesses, awaitingReceipt, inProgressProcesses, archivedProcesses, dueSoon, overdue] = await Promise.all([
    prisma.process.count({ where: scope }),
    prisma.process.count({ where: { ...scope, status: "Aguardando Recebimento" } }),
    prisma.process.count({ where: { ...scope, status: { in: ["Recebido", "Em Analise", "Reaberto"] } } }),
    prisma.process.count({ where: { ...scope, status: "Arquivado" } }),
    prisma.process.count({ where: { ...scope, expectedCompletionAt: { gte: now, lte: new Date(now.getTime() + 3 * 86_400_000) }, status: { notIn: ["Concluido", "Arquivado", "Cancelado"] } } }),
    prisma.process.count({ where: { ...scope, expectedCompletionAt: { lt: now }, status: { notIn: ["Concluido", "Arquivado", "Cancelado"] } } }),
  ]);

  const stats = [
    { title: "Total de Processos", value: totalProcesses.toString(), icon: ClipboardList, href: "/protocolos/acompanhamento", color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Em andamento", value: inProgressProcesses.toString(), icon: FileBox, href: "/protocolos/acompanhamento?status=Recebido", color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Aguardando recebimento", value: awaitingReceipt.toString(), icon: FileText, href: "/protocolos/acompanhamento?status=Aguardando+Recebimento", color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Arquivados", value: archivedProcesses.toString(), icon: Archive, href: "/protocolos/arquivados", color: "text-slate-600", bg: "bg-slate-100" },
    { title: "Próximos do prazo", value: dueSoon.toString(), icon: Timer, href: "/protocolos/acompanhamento?deadline=soon", color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Atrasados", value: overdue.toString(), icon: AlertTriangle, href: "/protocolos/acompanhamento?deadline=overdue", color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Painel de Protocolos</h1>
        <p className="text-slate-500 mt-2">Visão geral e tramitação do Processo Digital Municipal.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="block group">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="w-6 h-6" strokeWidth={2.5} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
