import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import CalendarioClient from "./CalendarioClient";

export const dynamic = "force-dynamic";

export default async function CalendarioPage() {
  const { prisma } = await getTenantContextForModule("ADMINISTRACAO");
  const events = await prisma.calendarEvent.findMany({
    orderBy: { date: 'asc' }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Calendário Institucional</h1>
          <p className="text-slate-500 mt-1">Gerencie os registros de calendário institucional.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm">
          Adicionar Novo
        </button>
      </div>
      
      <CalendarioClient events={events} />
    </div>
  );
}
