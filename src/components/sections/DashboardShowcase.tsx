import { Activity, BarChart3, Building2, FileText, Layers, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const dashboardCards = [
  {
    title: "Processos e atendimento",
    description: "Acompanhamento de etapas, responsáveis e prazos definidos pelo órgão.",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    title: "Gestão corporativa",
    description: "Visões configuráveis para rotinas financeiras, administrativas e patrimoniais.",
    icon: BarChart3,
    color: "text-emerald-400",
  },
  {
    title: "Políticas públicas",
    description: "Informações setoriais reunidas conforme os módulos ativos no ambiente.",
    icon: Activity,
    color: "text-violet-400",
  },
  {
    title: "Governança",
    description: "Relatórios, indicadores e trilhas para apoio à análise gerencial.",
    icon: ShieldCheck,
    color: "text-teal-400",
  },
];

export function DashboardShowcase() {
  return (
    <section id="demonstracao" className="relative overflow-hidden border-b border-slate-800 bg-slate-900 py-24 text-slate-100">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[160px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-blue-500/40 bg-blue-950/60 px-4 py-1 font-medium text-blue-300">
            <Activity className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
            Painel executivo demonstrativo
          </Badge>
          <h2 className="mb-6 font-heading text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl md:text-5xl">
            Visões gerenciais para acompanhar a operação pública.
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            O CeleriFlow pode reunir informações dos módulos ativos em painéis configurados para as necessidades de cada órgão. A prévia abaixo usa dados ilustrativos.
          </p>
        </div>

        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-900 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="inline-block h-3 w-3 rounded-full bg-red-500/80" />
                <span className="inline-block h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="inline-block h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="hidden h-4 w-px bg-slate-800 sm:block" />
              <span className="flex items-center gap-2 text-xs font-semibold font-mono text-slate-300">
                <Building2 className="h-4 w-4 text-blue-400" />
                AMBIENTE DEMONSTRATIVO
              </span>
            </div>
            <span className="rounded border border-amber-800 bg-amber-950/80 px-2.5 py-1 text-[11px] font-mono text-amber-300">
              DADOS ILUSTRATIVOS
            </span>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {dashboardCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article key={card.title} className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 transition-colors hover:border-blue-500/40">
                    <div className="mb-3 flex items-center justify-between text-slate-400">
                      <span className="text-xs font-semibold">{card.title}</span>
                      <Icon className={`h-4 w-4 ${card.color}`} />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-300">{card.description}</p>
                  </article>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/80 p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Indicadores configuráveis</h3>
                    <p className="text-xs text-slate-400">Exemplo de distribuição visual para dados autorizados no ambiente.</p>
                  </div>
                  <Layers className="h-5 w-5 text-blue-400" />
                </div>
                <div aria-hidden="true" className="flex h-40 items-end justify-between gap-3 border-b border-slate-800 px-2 pb-2 pt-6">
                  {[46, 68, 55, 82, 72, 91].map((height, index) => (
                    <div key={height} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <div style={{ height: `${height}%` }} className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-emerald-400" />
                      <span className="text-[11px] font-mono text-slate-500">{`P${index + 1}`}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6">
                <h3 className="mb-4 text-sm font-bold text-slate-100">Exemplos de eventos</h3>
                <div className="space-y-3 text-xs">
                  <div className="rounded-lg border border-slate-800/80 bg-slate-950 p-3 text-slate-300">Processo encaminhado para análise</div>
                  <div className="rounded-lg border border-slate-800/80 bg-slate-950 p-3 text-slate-300">Rotina financeira registrada no ambiente</div>
                  <div className="rounded-lg border border-slate-800/80 bg-slate-950 p-3 text-slate-300">Documento incluído em fluxo configurado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
