import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, ClipboardCheck, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

const diagnosticSteps = [
  {
    title: "Escopo prioritário",
    description: "Identificação das áreas, módulos e resultados esperados para o projeto.",
    icon: ClipboardCheck,
  },
  {
    title: "Processos atuais",
    description: "Levantamento das rotinas, dados legados e dependências que precisam ser consideradas.",
    icon: FileText,
  },
  {
    title: "Equipe e governança",
    description: "Definição dos envolvidos, permissões, responsáveis e etapas de homologação.",
    icon: Users,
  },
];

export function RoiCalculator() {
  return (
    <section id="impacto" className="relative overflow-hidden border-b border-slate-800 bg-slate-900 py-24 text-slate-100">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-emerald-500/40 bg-emerald-950/60 px-4 py-1 font-medium text-emerald-300">
            <ClipboardCheck className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
            Diagnóstico de implantação
          </Badge>
          <h2 className="mb-6 font-heading text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl md:text-5xl">
            Comece com um cenário técnico do seu órgão.
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            O impacto de uma implantação depende dos processos existentes, dos módulos ativados, da qualidade dos dados e das integrações necessárias. Por isso, a avaliação deve começar pelo diagnóstico.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-950/90 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {diagnosticSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.title} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-emerald-400">ETAPA {String(index + 1).padStart(2, "0")}</span>
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-100">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-800 bg-gradient-to-r from-blue-950/80 via-slate-900 to-emerald-950/80 p-6 sm:flex-row">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-slate-100 sm:text-base">Receba uma orientação inicial para o seu cenário.</h3>
                <p className="mt-1 text-xs text-slate-400">A disponibilidade de módulos, integrações, prazos e serviços é definida na avaliação do projeto.</p>
              </div>
            </div>
            <Link
              href="#contato"
              className={buttonVariants({
                className: "h-11 w-full shrink-0 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 sm:w-auto",
              })}
            >
              Solicitar diagnóstico
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
            <Building2 className="h-4 w-4 text-slate-400" />
            <span>Não apresenta estimativas de economia, prazo ou resultado como garantia.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
