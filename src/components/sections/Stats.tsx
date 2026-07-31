import { ShieldCheck, Zap, Layers, FileCheck } from "lucide-react";

export function Stats() {
  const stats = [
    {
      value: "24+",
      label: "Domínios Conectados",
      description: "Tributos, Tesouraria, Saúde, Educação, Obras e mais integrados.",
      icon: <Layers className="h-6 w-6 text-primary" />
    },
    {
      value: "-80%",
      label: "Tempo de Tramitação",
      description: "Redução drástica no tempo de resposta a solicitações e processos.",
      icon: <Zap className="h-6 w-6 text-secondary" />
    },
    {
      value: "100%",
      label: "Processo Digital",
      description: "Eliminação total do papel com assinatura eletrônica e SLA.",
      icon: <FileCheck className="h-6 w-6 text-primary" />
    },
    {
      value: "Auditável",
      label: "Governança & LGPD",
      description: "Rastreabilidade completa e adequação total à LAI e LGPD.",
      icon: <ShieldCheck className="h-6 w-6 text-secondary" />
    }
  ];

  return (
    <section className="border-y bg-muted/40 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {item.icon}
              </div>
              <span className="font-heading text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                {item.value}
              </span>
              <span className="text-sm font-semibold text-primary mt-1">
                {item.label}
              </span>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-[200px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
