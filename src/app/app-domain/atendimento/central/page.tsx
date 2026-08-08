import Link from "next/link";
import { getAttendanceContext, ticketScope } from "@/lib/attendance/access";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function CentralDemandasPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; priority?: string; channelId?: string; departmentId?: string; overdue?: string; deadline?: string; page?: string }> }) {
  const { q = "", status = "", priority = "", channelId = "", departmentId = "", overdue = "", deadline = "", page: pageParam = "1" } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const take = 25;
  const context = await getAttendanceContext();
  const search = q.trim();
  const now = new Date();
  const deadlineWarning = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  const filters: Prisma.TicketWhereInput[] = [ticketScope(context)];
  if (status) filters.push({ status });
  if (priority) filters.push({ priority });
  if (channelId) filters.push({ channelId });
  if (departmentId && context.attendanceAccess.isManager) filters.push({ departmentId });
  if (overdue === "1") filters.push({ dueAt: { lt: now }, status: { notIn: ["Concluído", "Cancelado"] } });
  if (deadline === "upcoming") filters.push({ dueAt: { gte: now, lte: deadlineWarning }, status: { notIn: ["Concluído", "Cancelado"] } });
  if (search) filters.push({ OR: [{ ticketNumber: { contains: search, mode: "insensitive" } }, { subject: { contains: search, mode: "insensitive" } }, { person: { fullName: { contains: search, mode: "insensitive" } } }, { company: { corporateName: { contains: search, mode: "insensitive" } } }] });
  const where = { AND: filters };
  const [tickets, total, channels, departments] = await Promise.all([
    context.prisma.ticket.findMany({ where, take, skip: (page - 1) * take, orderBy: [{ dueAt: "asc" }, { updatedAt: "desc" }], include: { person: { select: { fullName: true } }, company: { select: { corporateName: true, tradeName: true } }, channel: { select: { name: true } }, department: { select: { name: true } }, assignee: { select: { name: true } } } }),
    context.prisma.ticket.count({ where }),
    context.prisma.supportChannel.findMany({ where: { isActive: true }, select: { id: true, name: true }, orderBy: { name: "asc" } }),
    context.attendanceAccess.isManager ? context.prisma.department.findMany({ where: { isActive: true }, select: { id: true, name: true }, orderBy: { name: "asc" } }) : [],
  ]);
  const pages = Math.max(1, Math.ceil(total / take));
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (status) params.set("status", status);
  if (priority) params.set("priority", priority);
  if (channelId) params.set("channelId", channelId);
  if (departmentId && context.attendanceAccess.isManager) params.set("departmentId", departmentId);
  if (overdue === "1") params.set("overdue", "1");
  if (deadline === "upcoming") params.set("deadline", "upcoming");

  return <div className="space-y-6">
    <div className="flex flex-wrap gap-3 justify-between items-end"><div><h1 className="text-2xl font-bold text-slate-900">Central de Demandas</h1><p className="text-slate-500">Busca e acompanhamento da fila autorizada.</p></div><Link href="/atendimento/novo" className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold">Novo atendimento</Link></div>
    <form className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3"><input name="q" defaultValue={q} placeholder="Número, assunto, cidadão ou empresa" className="px-3 py-2 border rounded-lg text-sm min-w-72" /><select name="status" defaultValue={status} className="px-3 py-2 border rounded-lg text-sm"><option value="">Todos os status</option>{["Aberto", "Encaminhado", "Aguardando Recebimento", "Em Atendimento", "Aguardando Informação", "Resolvido", "Concluído", "Cancelado", "Reaberto"].map((value) => <option key={value}>{value}</option>)}</select><select name="priority" defaultValue={priority} className="px-3 py-2 border rounded-lg text-sm"><option value="">Todas as prioridades</option>{["Baixa", "Normal", "Alta", "Urgente"].map((value) => <option key={value}>{value}</option>)}</select><select name="channelId" defaultValue={channelId} className="px-3 py-2 border rounded-lg text-sm"><option value="">Todos os canais</option>{channels.map((channel) => <option key={channel.id} value={channel.id}>{channel.name}</option>)}</select>{context.attendanceAccess.isManager && <select name="departmentId" defaultValue={departmentId} className="px-3 py-2 border rounded-lg text-sm"><option value="">Todos os setores</option>{departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}</select>}<label className="flex items-center gap-2 px-1 text-sm text-slate-600"><input type="checkbox" name="overdue" value="1" defaultChecked={overdue === "1"} /> Atrasados</label><label className="flex items-center gap-2 px-1 text-sm text-slate-600"><input type="checkbox" name="deadline" value="upcoming" defaultChecked={deadline === "upcoming"} /> Próximos do prazo</label><button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm">Buscar</button><Link href="/atendimento/central" className="px-4 py-2 border rounded-lg text-sm">Limpar</Link></form>
    <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-600"><tr><th className="p-3">Número</th><th className="p-3">Solicitante</th><th className="p-3">Assunto</th><th className="p-3">Setor / responsável</th><th className="p-3">Prazo</th><th className="p-3">Status</th></tr></thead><tbody className="divide-y">{tickets.map((ticket) => { const isOverdue = Boolean(ticket.dueAt && ticket.dueAt < now && !["Concluído", "Cancelado"].includes(ticket.status)); const isUpcoming = Boolean(ticket.dueAt && ticket.dueAt >= now && ticket.dueAt <= deadlineWarning && !["Concluído", "Cancelado"].includes(ticket.status)); return <tr key={ticket.id}><td className="p-3 font-semibold"><Link className="text-violet-700 hover:underline" href={`/atendimento/chamados/${ticket.id}`}>{ticket.ticketNumber}</Link></td><td className="p-3">{ticket.isAnonymous ? "Anônimo" : ticket.person?.fullName || ticket.company?.tradeName || ticket.company?.corporateName || "Não informado"}</td><td className="p-3"><span className="font-medium">{ticket.subject}</span><span className="block text-xs text-slate-500">{ticket.channel.name} · {ticket.priority}</span></td><td className="p-3">{ticket.department?.name || "Sem setor"}<span className="block text-xs text-slate-500">{ticket.assignee?.name || "Sem responsável"}</span></td><td className={`p-3 ${isOverdue ? "text-red-700 font-semibold" : isUpcoming ? "text-amber-700 font-semibold" : ""}`}>{ticket.dueAt?.toLocaleDateString("pt-BR") || "Não definido"}{isOverdue && <span className="block text-xs">Atrasado</span>}{isUpcoming && <span className="block text-xs">Próximo do prazo</span>}</td><td className="p-3">{ticket.status}</td></tr>; })}{tickets.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-slate-500">Nenhuma demanda encontrada.</td></tr>}</tbody></table></div>
    <div className="flex justify-between text-sm"><span>{total} registro(s)</span><span className="flex gap-3">{page > 1 && <Link href={`/atendimento/central?${new URLSearchParams({ ...Object.fromEntries(params), page: String(page - 1) })}`}>Anterior</Link>}<span>Página {page} de {pages}</span>{page < pages && <Link href={`/atendimento/central?${new URLSearchParams({ ...Object.fromEntries(params), page: String(page + 1) })}`}>Próxima</Link>}</span></div>
  </div>;
}
