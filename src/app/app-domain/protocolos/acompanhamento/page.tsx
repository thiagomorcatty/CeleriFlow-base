import Link from "next/link";
import { AlertTriangle, Clock3, Eye, FileSearch, Inbox, Timer } from "lucide-react";
import type { Prisma } from "@prisma/client";
import { getProtocolContext, protocolScope } from "@/lib/protocols/access";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  status?: string;
  priority?: string;
  departmentId?: string;
  deadline?: string;
};

function queryString(filters: Record<string, string>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) if (value) params.set(key, value);
  const query = params.toString();
  return query ? `/protocolos/acompanhamento?${query}` : "/protocolos/acompanhamento";
}

function deadlineState(expectedCompletionAt: Date | null) {
  if (!expectedCompletionAt) return { label: "Sem prazo", className: "bg-slate-100 text-slate-600" };
  const days = Math.ceil((expectedCompletionAt.getTime() - Date.now()) / 86_400_000);
  if (days < 0) return { label: `${Math.abs(days)}d atrasado`, className: "bg-red-100 text-red-700" };
  if (days <= 3) return { label: `${days}d restantes`, className: "bg-amber-100 text-amber-700" };
  return { label: `${days}d restantes`, className: "bg-emerald-100 text-emerald-700" };
}

export default async function AcompanhamentoPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const context = await getProtocolContext();
  const { prisma, user } = context;
  const filters = await searchParams;
  const isAdmin = context.protocolAccess.isAdmin;
  const scope: Prisma.ProcessWhereInput = protocolScope(context);
  const where: Prisma.ProcessWhereInput = { ...scope };

  if (filters.status) where.status = filters.status;
  if (filters.priority) where.priority = filters.priority;
  if (isAdmin && filters.departmentId) where.currentDepartmentId = filters.departmentId;
  if (filters.deadline === "overdue") where.expectedCompletionAt = { lt: new Date() };
  if (filters.deadline === "soon") {
    where.expectedCompletionAt = { gte: new Date(), lte: new Date(Date.now() + 3 * 86_400_000) };
  }
  if (filters.q?.trim()) {
    const query = filters.q.trim();
    where.OR = [
      { protocolNumber: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { person: { is: { OR: [{ fullName: { contains: query, mode: "insensitive" } }, { cpf: { contains: query, mode: "insensitive" } }] } } },
      { company: { is: { OR: [{ corporateName: { contains: query, mode: "insensitive" } }, { cnpj: { contains: query, mode: "insensitive" } }] } } },
      { processType: { is: { name: { contains: query, mode: "insensitive" } } } },
      { subject: { is: { name: { contains: query, mode: "insensitive" } } } },
    ];
  }

  const [processes, awaitingReceipt, active, overdue, departments] = await Promise.all([
    prisma.process.findMany({
      where,
      include: {
        processType: true,
        subject: true,
        person: true,
        company: true,
        currentDepartment: true,
        currentResponsibleEmployee: true,
        movements: { include: { fromDepartment: true, toDepartment: true }, orderBy: { movedAt: "desc" }, take: 1 },
      },
      orderBy: { updatedAt: "desc" },
      take: 100,
    }),
    prisma.process.count({ where: { ...scope, status: "Aguardando Recebimento" } }),
    prisma.process.count({ where: { ...scope, status: { in: ["Recebido", "Em Analise", "Reaberto"] } } }),
    prisma.process.count({ where: { ...scope, expectedCompletionAt: { lt: new Date() }, status: { notIn: ["Concluido", "Arquivado", "Cancelado"] } } }),
    isAdmin ? prisma.department.findMany({ where: { isActive: true }, select: { id: true, name: true }, orderBy: { name: "asc" } }) : Promise.resolve([]),
  ]);

  const cards = [
    { label: "Em andamento", value: active, icon: Clock3, href: queryString({ status: "Recebido" }), className: "text-blue-700 bg-blue-50" },
    { label: "Aguardando recebimento", value: awaitingReceipt, icon: Inbox, href: queryString({ status: "Aguardando Recebimento" }), className: "text-amber-700 bg-amber-50" },
    { label: "Atrasados", value: overdue, icon: AlertTriangle, href: queryString({ deadline: "overdue" }), className: "text-red-700 bg-red-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900"><FileSearch className="h-6 w-6 text-emerald-600" />Acompanhamento de Processos</h1>
        <p className="mt-1 text-sm text-slate-500">Visão interna de status, prazo, setor atual e última tramitação.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(card => <Link key={card.label} href={card.href} className={`rounded-xl border border-slate-200 p-4 transition-shadow hover:shadow-sm ${card.className}`}>
          <div className="flex items-center justify-between"><p className="text-sm font-semibold">{card.label}</p><card.icon className="h-5 w-5" /></div>
          <p className="mt-2 text-3xl font-bold">{card.value}</p>
        </Link>)}
      </div>

      <form className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-5" action="/protocolos/acompanhamento" method="GET">
        <input name="q" defaultValue={filters.q} placeholder="Protocolo, interessado, CPF/CNPJ..." className="rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2" />
        <select name="status" defaultValue={filters.status || ""} className="rounded-lg border border-slate-200 px-3 py-2 text-sm"><option value="">Todos os status</option><option>Aguardando Recebimento</option><option>Recebido</option><option>Em Analise</option><option>Concluido</option><option>Arquivado</option></select>
        <select name="priority" defaultValue={filters.priority || ""} className="rounded-lg border border-slate-200 px-3 py-2 text-sm"><option value="">Todas as prioridades</option><option>Normal</option><option>Alta</option><option>Urgente</option></select>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Filtrar</button>
        {isAdmin && <select name="departmentId" defaultValue={filters.departmentId || ""} className="rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2"><option value="">Todos os setores</option>{departments.map(department => <option key={department.id} value={department.id}>{department.name}</option>)}</select>}
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Protocolo</th><th className="px-4 py-3">Interessado</th><th className="px-4 py-3">Setor / Responsável</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Prazo</th><th className="px-4 py-3">Última movimentação</th><th className="px-4 py-3"></th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {processes.map(process => {
              const lastMovement = process.movements[0];
              const deadline = deadlineState(process.expectedCompletionAt);
              return <tr key={process.id} className="hover:bg-slate-50"><td className="px-4 py-3"><p className="font-semibold text-slate-800">{process.protocolNumber}</p><p className="text-xs text-slate-500">{process.processType.name} · {process.subject.name}</p></td><td className="px-4 py-3 text-slate-700">{process.person?.fullName || process.company?.corporateName || "Não informado"}</td><td className="px-4 py-3"><p className="text-slate-700">{process.currentDepartment?.name || "Sem setor"}</p><p className="text-xs text-slate-500">{process.currentResponsibleEmployee?.name || "Sem responsável"}</p></td><td className="px-4 py-3"><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{process.status}</span></td><td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${deadline.className}`}>{deadline.label}</span></td><td className="px-4 py-3 text-xs text-slate-500">{lastMovement ? <>{lastMovement.fromDepartment?.name || "Abertura"} → {lastMovement.toDepartment.name}<br />{new Date(lastMovement.movedAt).toLocaleString("pt-BR")}</> : "Sem movimentação"}</td><td className="px-4 py-3 text-right"><Link href={`/protocolos/processos/${process.id}`} className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-900"><Eye className="h-4 w-4" />Ver</Link></td></tr>;
            })}
            {processes.length === 0 && <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-500">Nenhum processo encontrado para os filtros selecionados.</td></tr>}
          </tbody>
        </table>
      </div>
      {!isAdmin && !user.departmentId && <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Vincule seu usuário a um servidor com departamento para acompanhar processos.</p>}
      <p className="flex items-center gap-1 text-xs text-slate-500"><Timer className="h-3.5 w-3.5" />Acompanhamento interno. A consulta pública permanece fora do escopo.</p>
    </div>
  );
}
