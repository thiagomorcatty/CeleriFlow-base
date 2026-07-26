import { ArrowLeft, Headphones } from "lucide-react";
import Link from "next/link";
import { getAttendanceContext } from "@/lib/attendance/access";
import { createTicket } from "../actions";
import NovoChamadoForm from "./NovoChamadoForm";

export const dynamic = "force-dynamic";

export default async function NovoChamadoPage() {
  const { prisma } = await getAttendanceContext("edit");
  const [channels, departments, subjects] = await Promise.all([
    prisma.supportChannel.findMany({ where: { isActive: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }] }),
    prisma.department.findMany({ where: { isActive: true }, select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.serviceSubject.findMany({ where: { isActive: true }, select: { id: true, name: true, defaultDepartmentId: true, defaultPriority: true, defaultDueDays: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/atendimento/central" className="text-violet-600 hover:text-violet-700 text-sm font-semibold flex items-center gap-2 mb-4 w-fit transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar para a Central
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2"><Headphones className="w-6 h-6 text-violet-600" /> Novo Atendimento</h1>
        <p className="text-slate-500 mt-1">Registre a demanda, o solicitante e o setor responsavel.</p>
      </div>
      <NovoChamadoForm channels={channels} departments={departments} subjects={subjects} createTicketAction={createTicket} />
    </div>
  );
}
