import { FileBox, ClipboardList, Archive, FileText } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProtocolosDashboardPage() {
  const openProcesses = await prisma.process.count({ where: { status: "Aberto" } });
  const inProgressProcesses = await prisma.process.count({ where: { status: "Em Análise" } });
  const archivedProcesses = await prisma.process.count({ where: { status: "Arquivado" } });
  const totalProcesses = await prisma.process.count();

  const stats = [
    { title: "Total de Processos", value: totalProcesses.toString(), icon: ClipboardList, href: "/app-domain/protocolos/processos", color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Na Caixa do Setor (Em Análise)", value: inProgressProcesses.toString(), icon: FileBox, href: "/app-domain/protocolos/processos", color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Novos Protocolos", value: openProcesses.toString(), icon: FileText, href: "/app-domain/protocolos/processos", color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Arquivados", value: archivedProcesses.toString(), icon: Archive, href: "/app-domain/protocolos/arquivados", color: "text-slate-600", bg: "bg-slate-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Painel de Protocolos</h1>
        <p className="text-slate-500 mt-2">Visão geral e tramitação do Processo Digital Municipal.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
