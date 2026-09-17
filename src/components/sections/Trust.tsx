import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const trustItems = [
  {
    title: "Ambiente web em nuvem",
    description: "Acesso pelo navegador em infraestrutura definida para o projeto e o nível de serviço contratado.",
  },
  {
    title: "Perfis e permissões",
    description: "Perfis de acesso podem ser definidos conforme papéis, unidades e responsabilidades do órgão.",
  },
  {
    title: "Segregação de funções",
    description: "Fluxos podem separar responsabilidades de solicitação, aprovação, execução, controle e auditoria.",
  },
  {
    title: "Rastreabilidade de operações",
    description: "Registros e trilhas apoiam o acompanhamento de movimentações realizadas no ambiente.",
  },
  {
    title: "Gestão documental",
    description: "Documentos, metadados e etapas de processo podem ser organizados de acordo com os fluxos configurados.",
  },
  {
    title: "Backup e continuidade",
    description: "Recursos de backup, monitoramento e recuperação são definidos pela infraestrutura e pelo serviço contratado.",
  },
  {
    title: "Instância independente",
    description: "O ambiente pode ser estruturado para preservar a separação operacional entre órgãos e entidades.",
  },
  {
    title: "Implantação em etapas",
    description: "A ativação é planejada com diagnóstico, parametrização, testes e homologação assistida.",
  },
];

export function Trust() {
  return (
    <section id="seguranca" className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-primary to-primary opacity-60" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-16 max-w-3xl">
          <Badge variant="outline" className="mb-4 border-primary-foreground/30 px-4 py-1 font-medium text-primary-foreground">
            Segurança e governança
          </Badge>
          <h2 className="mb-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Controles para uma operação pública mais organizada.
          </h2>
          <p className="text-lg leading-relaxed text-primary-foreground/80">
            O CeleriFlow reúne recursos de controle, rastreabilidade e organização da informação. A configuração técnica e a aderência às obrigações de cada órgão são avaliadas no projeto de implantação.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {trustItems.map((item) => (
              <article key={item.title} className="flex items-start gap-3.5 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-4 backdrop-blur-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <div>
                  <h3 className="mb-1 text-base font-bold text-primary-foreground">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-primary-foreground/70">{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="relative">
            <div className="flex aspect-square flex-col justify-between rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-8 text-center shadow-xl backdrop-blur-md">
              <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-primary shadow-lg shadow-secondary/30">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <div className="my-auto">
                <h3 className="mb-2 font-heading text-2xl font-bold text-primary-foreground">Governança configurável</h3>
                <p className="mx-auto max-w-xs text-xs leading-relaxed text-primary-foreground/80">
                  Perfis, etapas, permissões e indicadores podem ser estruturados conforme a organização, os processos e as responsabilidades de cada órgão.
                </p>
              </div>
              <p className="border-t border-primary-foreground/15 pt-4 text-xs font-medium text-primary-foreground/70">
                Recursos sujeitos ao escopo e à parametrização do ambiente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
