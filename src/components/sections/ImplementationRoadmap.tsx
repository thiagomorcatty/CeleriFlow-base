import { CheckCircle2, ClipboardList, DatabaseZap, Settings2, TestTube2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const phases = [
  {
    title: "Levantamento inicial",
    description: "Entendimento do cenário, das áreas envolvidas, das necessidades e das prioridades do órgão.",
    icon: ClipboardList,
  },
  {
    title: "Planejamento",
    description: "Definição de escopo, responsáveis, cronograma de trabalho e estratégia de ativação dos módulos.",
    icon: Settings2,
  },
  {
    title: "Parametrização",
    description: "Configuração de estruturas, perfis, regras, fluxos e permissões do ambiente.",
    icon: Settings2,
  },
  {
    title: "Migração de dados",
    description: "Preparação, importação e validação dos dados legados definidos no projeto.",
    icon: DatabaseZap,
  },
  {
    title: "Testes funcionais",
    description: "Verificação dos fluxos, dados, regras e integrações previstas para o escopo contratado.",
    icon: TestTube2,
  },
  {
    title: "Homologação assistida",
    description: "Acompanhamento dos usuários responsáveis durante a validação do ambiente configurado.",
    icon: CheckCircle2,
  },
  {
    title: "Entrada em produção",
    description: "Início da operação conforme o plano aprovado, as condições do ambiente e a liberação do órgão.",
    icon: CheckCircle2,
  },
  {
    title: "Evolução pós-go-live",
    description: "Acompanhamento da adoção, ajustes planejados e evolução contínua do ambiente.",
    icon: ClipboardList,
  },
];

export function ImplementationRoadmap() {
  return (
    <section id="implantacao" className="relative overflow-hidden border-b border-slate-200 bg-slate-50 py-24 text-slate-950">
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-200/40 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-200/40 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 px-4 py-1 font-medium text-primary">
            <ClipboardList className="mr-1.5 h-3.5 w-3.5" />
            Método de implantação
          </Badge>
          <h2 className="mb-6 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Uma implantação orientada por diagnóstico, validação e evolução.
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            O catálogo apresenta uma jornada consultiva para organizar a transição dos processos. As etapas, prazos e integrações são definidos conforme o projeto de cada órgão.
          </p>
        </div>

        <ol className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon;

            return (
              <li key={phase.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                <span className="mb-5 inline-flex rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="mb-5 h-6 w-6 text-emerald-600" />
                <h3 className="mb-2 text-lg font-bold text-slate-950">{phase.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{phase.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
