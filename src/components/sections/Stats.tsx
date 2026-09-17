import { FileCheck, Layers, ShieldCheck, Zap } from "lucide-react";

const stats = [
  {
    value: "5",
    label: "Camadas da solução",
    description: "Arquitetura que conecta base institucional, processos, gestão corporativa, políticas públicas e governança.",
    icon: Layers,
    color: "text-blue-400",
    borderColor: "hover:border-blue-500/50",
  },
  {
    value: "28",
    label: "Módulos funcionais",
    description: "Cobertura apresentada no catálogo técnico, organizada para diferentes áreas da administração pública.",
    icon: FileCheck,
    color: "text-emerald-400",
    borderColor: "hover:border-emerald-500/50",
  },
  {
    value: "Web",
    label: "Acesso pelo navegador",
    description: "Uso por equipes autorizadas em ambiente configurado para o órgão público.",
    icon: Zap,
    color: "text-teal-400",
    borderColor: "hover:border-teal-500/50",
  },
  {
    value: "Modular",
    label: "Ativação por escopo",
    description: "Módulos e integrações são definidos durante o projeto de implantação e conforme a contratação.",
    icon: ShieldCheck,
    color: "text-purple-400",
    borderColor: "hover:border-purple-500/50",
  },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-slate-800 bg-slate-900/90 py-16 text-slate-100">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-blue-600/5" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`group flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 ${item.borderColor}`}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition-transform group-hover:scale-110 ${item.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-heading font-mono text-4xl font-extrabold tracking-tight text-slate-100">
                  {item.value}
                </span>
                <span className={`mt-1 text-sm font-bold ${item.color}`}>{item.label}</span>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
