import Link from "next/link";
import { getAttendanceContext } from "@/lib/attendance/access";

export const dynamic = "force-dynamic";

export default async function FilaAtendimentoPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status = "" } = await searchParams;
  const context = await getAttendanceContext();
  const departmentId = context.user.departmentId;
  const where: any = context.attendanceAccess.isManager ? (status ? { status } : {}) : { departmentId: departmentId || "__sem-departamento__", ...(status ? { status } : {}) };
  const tickets = await context.prisma.ticket.findMany({ where, take: 100, orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }], include: { person: { select: { fullName: true } }, company: { select: { corporateName: true } }, assignee: { select: { name: true } }, department: { select: { name: true } } } });
  return <div className="space-y-6"><div><h1 className="text-2xl font-bold text-slate-900">Fila do Setor</h1><p className="text-slate-500">{context.attendanceAccess.isManager ? "Visão gerencial de todas as filas." : "Demandas encaminhadas ao seu setor."}</p></div><div className="flex flex-wrap gap-2">{[["", "Todas"], ["Aberto", "Novos"], ["Em Atendimento", "Em atendimento"], ["Aguardando Informação", "Aguardando informação"], ["Aguardando Recebimento", "A receber"]].map(([value, label]) => <Link key={value} href={value ? `/atendimento/fila?status=${encodeURIComponent(value)}` : "/atendimento/fila"} className={`px-3 py-2 rounded-lg text-sm ${status === value ? "bg-violet-600 text-white" : "bg-white border"}`}>{label}</Link>)}</div><div className="grid gap-3">{tickets.map((ticket) => <Link key={ticket.id} href={`/atendimento/chamados/${ticket.id}`} className="bg-white border rounded-xl p-4 hover:border-violet-400"><div className="flex justify-between gap-3"><strong>{ticket.ticketNumber} · {ticket.subject}</strong><span>{ticket.status}</span></div><p className="text-sm text-slate-500 mt-1">{ticket.isAnonymous ? "Anônimo" : ticket.person?.fullName || ticket.company?.corporateName || "Não informado"} · {ticket.department?.name || "Sem setor"} · {ticket.assignee?.name || "Sem responsável"}</p></Link>)}{tickets.length === 0 && <p className="p-8 bg-white border rounded-xl text-center text-slate-500">Nenhuma demanda na fila.</p>}</div></div>;
}
