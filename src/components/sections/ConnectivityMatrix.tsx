import {
  Building2,
  Database,
  FileCheck2,
  Landmark,
  Map,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const integrationGroups = [
  {
    title: "Federal, fiscal e controle",
    examples: ["PNCP", "SICONFI", "eSocial", "EFD-Reinf", "NFS-e", "TCEs"],
    description: "Conexões podem ser configuradas conforme layouts, credenciais, escopo e homologação aplicáveis.",
    status: "Integração configurável",
    icon: Landmark,
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-300",
  },
  {
    title: "Arrecadação e bancos",
    examples: ["Pix", "APIs bancárias", "CNAB", "OFX"],
    description: "Rotinas de arrecadação e conciliação podem ser integradas aos canais bancários disponíveis para o órgão.",
    status: "Dependência externa",
    icon: Building2,
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-300",
  },
  {
    title: "Setoriais e comunicação",
    examples: ["e-SUS APS", "Educacenso", "E-mail", "WhatsApp"],
    description: "A conectividade depende da interface do serviço externo e do escopo de implantação definido para o ambiente.",
    status: "Integração configurável",
    icon: MessageSquare,
    color: "from-violet-500 to-purple-600",
    textColor: "text-violet-300",
  },
  {
    title: "Dados, mapas e APIs",
    examples: ["APIs REST", "Arquivos", "Webhooks", "GIS e mapas"],
    description: "Os fluxos de troca de dados são definidos conforme os sistemas envolvidos, suas permissões e seus formatos disponíveis.",
    status: "Recurso da plataforma",
    icon: Database,
    color: "from-cyan-500 to-blue-600",
    textColor: "text-cyan-300",
  },
  {
    title: "Assinatura e autenticação",
    examples: ["Assinatura eletrônica", "Serviços externos", "Reautenticação", "Verificação"],
    description: "A forma de assinatura e os provedores utilizados são definidos na configuração e nas regras aplicáveis ao ambiente.",
    status: "Dependência externa",
    icon: FileCheck2,
    color: "from-amber-500 to-orange-600",
    textColor: "text-amber-300",
  },
  {
    title: "Território e operação",
    examples: ["Geolocalização", "Camadas territoriais", "Rotas", "Atendimento em campo"],
    description: "Recursos territoriais podem apoiar módulos setoriais quando configurados com as fontes de dados adequadas.",
    status: "Recurso da plataforma",
    icon: Map,
    color: "from-rose-500 to-pink-600",
    textColor: "text-rose-300",
  },
];

export function ConnectivityMatrix() {
  return (
    <section id="integracoes" className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-24 text-slate-100">
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-cyan-500/40 bg-cyan-950/60 px-4 py-1 font-medium text-cyan-300">
            <Database className="mr-1.5 h-3.5 w-3.5 text-cyan-400" />
            Integrações e interoperabilidade
          </Badge>
          <h2 className="mb-6 font-heading text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl md:text-5xl">
            Conectividade pensada para o ecossistema público.
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            O catálogo descreve possibilidades de conexão por APIs, arquivos, webhooks e conectores. A disponibilidade de cada integração é validada no projeto de implantação.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrationGroups.map((group) => {
            const Icon = group.icon;

            return (
              <article key={group.title} className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className={`rounded-xl bg-gradient-to-br p-3 text-white shadow-lg ${group.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 text-[11px] font-mono font-semibold ${group.textColor}`}>
                    {group.status}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold text-slate-100 transition-colors group-hover:text-blue-300">{group.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{group.description}</p>

                <ul aria-label={`Exemplos de ${group.title}`} className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
                  {group.examples.map((example) => (
                    <li key={example} className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] font-medium text-slate-300">
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-xl border border-cyan-500/20 bg-cyan-950/30 px-5 py-4 text-center text-sm leading-relaxed text-cyan-100">
          Credenciais, convênios, layouts, disponibilidade de serviços externos e homologação podem ser necessários antes da ativação de uma integração.
        </div>
      </div>
    </section>
  );
}
