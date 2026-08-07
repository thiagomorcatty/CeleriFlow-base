import Link from "next/link";
import { Activity, Archive, CircleAlert, CircleCheck, ExternalLink } from "lucide-react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { pocVirtualBank } from "@/lib/poc/poc-config";

function displayDate(value: Date) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "medium" }).format(value);
}

type DownloadSummary = {
  id: string;
  banco: string;
  agencia: string;
  contaNumero: string;
  hashSHA256: string;
  status: string;
  createdAt: Date;
};

type RunSummary = {
  id: string;
  operation: string;
  environment: string;
  status: string;
  message: string;
  createdAt: Date;
  connection: { name: string; code: string };
};

export default async function AutomacoesFinanceirasPage() {
  let downloads: DownloadSummary[] = [];
  let runs: RunSummary[] = [];
  let loadError: string | null = null;

  try {
    const { prisma } = await getTenantContextForModule("FINANCEIRO");
    [downloads, runs] = await Promise.all([
      prisma.automatedBankDownload.findMany({ where: { banco: pocVirtualBank.name }, orderBy: { createdAt: "desc" }, take: 15 }),
      prisma.integrationRun.findMany({
        where: { connection: { category: "BANCARIA" } },
        include: { connection: { select: { name: true, code: true } } },
        orderBy: { createdAt: "desc" },
        take: 15,
      }),
    ]);
  } catch (error) {
    console.error("Erro ao carregar automações financeiras:", error);
    loadError = "Não foi possível carregar o histórico agora. Tente novamente em instantes.";
  }
  const failures = runs.filter((run) => run.status === "FALHA").length;

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-6">
      <header className="border-b border-slate-200 pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">POC São João do Ivaí</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Central de Automações Financeiras</h1>
        <p className="mt-1 text-sm text-slate-600">Histórico operacional, falhas e evidências do banco simulado externo.</p>
      </header>

      {loadError && <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{loadError}</p>}

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><Archive className="h-5 w-5 text-emerald-600" /><p className="mt-3 text-2xl font-bold">{downloads.length}</p><p className="text-sm text-slate-600">Extratos arquivados</p></div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><Activity className="h-5 w-5 text-blue-600" /><p className="mt-3 text-2xl font-bold">{runs.length}</p><p className="text-sm text-slate-600">Execuções bancárias</p></div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><CircleAlert className="h-5 w-5 text-rose-600" /><p className="mt-3 text-2xl font-bold">{failures}</p><p className="text-sm text-slate-600">Falhas registradas</p></div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h2 className="font-bold text-slate-900">Extratos e evidências</h2><Link className="text-sm font-semibold text-emerald-700 hover:text-emerald-800" href="/financeiro/download-extratos">Nova automação</Link></div>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Execução</th><th className="px-5 py-3">Conta</th><th className="px-5 py-3">Integridade</th><th className="px-5 py-3">Status</th><th className="px-5 py-3"></th></tr></thead><tbody>{downloads.map((download) => <tr key={download.id} className="border-t border-slate-100"><td className="px-5 py-3">{displayDate(download.createdAt)}</td><td className="px-5 py-3"><p className="font-medium">{download.banco}</p><p className="text-xs text-slate-500">{download.agencia} / {download.contaNumero}</p></td><td className="max-w-48 truncate px-5 py-3 font-mono text-xs" title={download.hashSHA256}>{download.hashSHA256}</td><td className="px-5 py-3"><span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800"><CircleCheck className="h-3 w-3" />{download.status}</span></td><td className="px-5 py-3"><a className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-800" href={`/api/financeiro/extratos/${download.id}`}><ExternalLink className="h-4 w-4" />Abrir</a></td></tr>)}{downloads.length === 0 && <tr><td className="px-5 py-8 text-center text-slate-500" colSpan={5}>Nenhum extrato arquivado.</td></tr>}</tbody></table></div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-bold text-slate-900">Execuções da integração bancária</h2></div>
        <div className="divide-y divide-slate-100">{runs.map((run) => <article key={run.id} className="flex gap-3 px-5 py-4"><span className={run.status === "SUCESSO" ? "mt-0.5 text-emerald-600" : "mt-0.5 text-rose-600"}>{run.status === "SUCESSO" ? <CircleCheck className="h-5 w-5" /> : <CircleAlert className="h-5 w-5" />}</span><div><p className="font-semibold text-slate-900">{run.connection.name} · {run.operation}</p><p className="text-sm text-slate-600">{run.message}</p><p className="mt-1 text-xs text-slate-500">{displayDate(run.createdAt)} · {run.environment}</p></div></article>)}{runs.length === 0 && <p className="px-5 py-8 text-center text-slate-500">Nenhuma execução bancária registrada.</p>}</div>
      </section>
    </main>
  );
}
