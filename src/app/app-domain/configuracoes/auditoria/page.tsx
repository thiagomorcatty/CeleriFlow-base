import { Activity, FileText, MousePointerClick, Users } from "lucide-react";
import { getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";

export const dynamic = "force-dynamic";

const eventLabels: Record<string, string> = {
  SESSION_LOGIN: "Iniciou sessão",
  SESSION_LOGOUT: "Encerrou sessão",
  DOCUMENT_DOWNLOAD: "Baixou documento",
  FINANCIAL_REPORT_EXPORT: "Exportou relatório financeiro",
  PAGE_VIEW: "Visualizou página",
  UI_INTERACTION: "Interagiu com controle",
  FORM_SUBMIT: "Enviou formulário",
};

function describeTarget(event: { eventType: string; targetType: string; targetId: string }) {
  if (event.targetType === "PAGE") return event.targetId;
  if (event.targetType === "CONTROL") {
    const [path, control] = event.targetId.split("|");
    return `${control === "link" ? "Link" : "Controle"} em ${path}`;
  }
  if (event.targetType === "FORM") return `Formulário em ${event.targetId}`;
  if (event.targetType === "SESSION") return "Sessão autenticada";
  if (event.targetType === "DOCUMENT") return "Documento protegido";
  if (event.targetType === "FINANCIAL_REPORT") return "Relatório financeiro";
  return event.targetType;
}

function getLast24Hours() {
  return new Date(Date.now() - 24 * 60 * 60 * 1000);
}

export default async function AuditUsagePage() {
  const { prisma } = await getTenantContextForSystemAdministration();
  const last24Hours = getLast24Hours();

  const [events, totalEvents, eventsLast24Hours, activeUsers] = await Promise.all([
    prisma.auditEvent.findMany({
      include: {
        actorUsuario: {
          select: {
            nome: true,
            email: true,
            perfil: { select: { nome: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.auditEvent.count(),
    prisma.auditEvent.count({ where: { createdAt: { gte: last24Hours } } }),
    prisma.auditEvent.groupBy({
      by: ["actorUsuarioId"],
      where: { createdAt: { gte: last24Hours } },
    }),
  ]);

  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  });

  return (
    <div className="flex-1 p-5 sm:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-100 p-3 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
            <Activity className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Auditoria de uso</h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Histórico imutável de acessos e interações realizadas no CeleriFlow.
            </p>
          </div>
        </div>
        <p className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          Exibindo os 200 registros mais recentes
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400"><Activity className="h-5 w-5" /><span className="text-sm font-medium">Eventos registrados</span></div>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{totalEvents}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400"><MousePointerClick className="h-5 w-5" /><span className="text-sm font-medium">Últimas 24 horas</span></div>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{eventsLast24Hours}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400"><Users className="h-5 w-5" /><span className="text-sm font-medium">Usuários ativos</span></div>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{activeUsers.length}</p>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-700">
          <h2 className="font-semibold text-slate-900 dark:text-white">Histórico recente</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Não são armazenados valores de campos, parâmetros de URL, IP ou user-agent.</p>
        </div>
        {events.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-16 text-center text-slate-500 dark:text-slate-400">
            <FileText className="h-8 w-8" />
            <p className="text-sm">Ainda não há eventos de auditoria registrados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900/30 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Data e hora</th>
                  <th className="px-5 py-3 font-semibold">Usuário</th>
                  <th className="px-5 py-3 font-semibold">Ação</th>
                  <th className="px-5 py-3 font-semibold">Destino</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {events.map((event) => (
                  <tr key={event.id} className="text-slate-700 dark:text-slate-300">
                    <td className="whitespace-nowrap px-5 py-3 text-xs text-slate-500 dark:text-slate-400">{dateFormatter.format(event.createdAt)}</td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-slate-900 dark:text-white">{event.actorUsuario.nome}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{event.actorUsuario.email} · {event.actorUsuario.perfil.nome}</p>
                    </td>
                    <td className="px-5 py-3">{eventLabels[event.eventType] ?? event.eventType}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{describeTarget(event)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
