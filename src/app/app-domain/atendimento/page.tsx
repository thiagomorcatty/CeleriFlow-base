import { Headphones, MessageSquareWarning, Search, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AtendimentoDashboardPage() {
  const openTickets = await prisma.ticket.count({ where: { status: "Aberto" } });
  const inProgressTickets = await prisma.ticket.count({ where: { status: "Em Atendimento" } });
  const openOmbudsman = await prisma.ombudsman.count({ where: { status: "Recebida" } });

  const stats = [
    { title: "Chamados Abertos", value: openTickets.toString(), icon: Headphones, href: "/app-domain/atendimento/novo", color: "text-violet-600", bg: "bg-violet-100" },
    { title: "Em Atendimento", value: inProgressTickets.toString(), icon: CheckCircle2, href: "/app-domain/atendimento", color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Denúncias Pendentes", value: openOmbudsman.toString(), icon: MessageSquareWarning, href: "/app-domain/atendimento/ouvidoria", color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Painel de Atendimento</h1>
          <p className="text-slate-500 mt-2">Visão geral dos chamados, serviços rápidos e manifestações de ouvidoria.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/atendimento/novo" className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
            Novo Chamado Rápido
          </Link>
        </div>
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
      
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-800">Fila de Chamados Recentes</h3>
        </div>
        <div className="p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Search className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhum chamado pendente</h3>
          <p className="text-slate-500 mt-1">A caixa de entrada de serviços rápidos está vazia no momento.</p>
        </div>
      </div>
    </div>
  );
}
