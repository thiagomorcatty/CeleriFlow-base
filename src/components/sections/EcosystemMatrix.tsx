"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Cpu,
  FileText,
  GraduationCap,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

const pillars = [
  {
    id: "base-institucional",
    title: "Base Institucional",
    subtitle: "Cadastros, estrutura e Poder Legislativo",
    icon: Building2,
    color: "from-blue-600 to-indigo-600",
    accentBg: "border-blue-500/30 bg-blue-950/40 text-blue-300",
    modules: [
      {
        name: "Administração e Cadastros",
        description: "Cadastros corporativos, unidades, perfis e configurações para apoiar a operação do órgão.",
      },
      {
        name: "Câmara Municipal",
        description: "Recursos para apoiar a gestão do Poder Legislativo, suas atividades e seus registros institucionais.",
      },
    ],
  },
  {
    id: "processos-relacionamento",
    title: "Processos e Relacionamento",
    subtitle: "Fluxos digitais, documentos e atendimento",
    icon: FileText,
    color: "from-emerald-600 to-teal-600",
    accentBg: "border-emerald-500/30 bg-emerald-950/40 text-emerald-300",
    modules: [
      {
        name: "Processos e Protocolo",
        description: "Abertura, tramitação e acompanhamento de processos com fluxos configuráveis.",
      },
      {
        name: "Documentos e GED",
        description: "Organização, indexação e gestão de documentos e seus metadados.",
      },
      {
        name: "Atendimento, Ouvidoria e Assistência Virtual",
        description: "Canais de atendimento e acompanhamento de solicitações, manifestações e interações.",
      },
      {
        name: "Portal Institucional e Transparência",
        description: "Publicação e consulta de conteúdos, serviços e informações públicas conforme configuração do órgão.",
      },
    ],
  },
  {
    id: "gestao-corporativa",
    title: "Gestão Corporativa",
    subtitle: "Rotinas administrativas, financeiras e tributárias",
    icon: Landmark,
    color: "from-violet-600 to-purple-600",
    accentBg: "border-violet-500/30 bg-violet-950/40 text-violet-300",
    modules: [
      {
        name: "Financeiro e Contábil",
        description: "Recursos para execução orçamentária, financeira e contábil conforme os processos definidos pelo órgão.",
      },
      {
        name: "Tesouraria, Conciliação e Planejamento Financeiro",
        description: "Rotinas de tesouraria, conciliação e planejamento para acompanhamento da situação financeira.",
      },
      {
        name: "Compras, Licitações e Contratos",
        description: "Fluxos de solicitações, contratações, licitações, atas e contratos com etapas parametrizáveis.",
      },
      {
        name: "RH e Folha",
        description: "Cadastro funcional, rotinas de pessoal e processamento de folha conforme a configuração adotada.",
      },
      {
        name: "Portal do Servidor",
        description: "Canal de consulta e autosserviço para informações disponibilizadas aos servidores autorizados.",
      },
      {
        name: "Patrimônio e Almoxarifado",
        description: "Controle de bens, inventário, movimentações e materiais em estoque.",
      },
      {
        name: "Frotas",
        description: "Gestão de veículos, utilização, manutenção e custos operacionais da frota.",
      },
      {
        name: "Gestão Tributária",
        description: "Cadastros, lançamentos, arrecadação, fiscalização e rotinas tributárias municipais.",
      },
      {
        name: "ITBI e DTE",
        description: "Rotinas relacionadas ao ITBI e ao Domicílio Tributário Eletrônico.",
      },
      {
        name: "NFS-e",
        description: "Emissão e gestão de notas fiscais de serviço eletrônicas conforme regras configuradas.",
      },
      {
        name: "Simples Nacional e ISS Bancário",
        description: "Apoio a declarações, obrigações e controles ligados ao Simples Nacional e ao ISS bancário.",
      },
      {
        name: "Custos e VAF",
        description: "Acompanhamento de custos e informações relacionadas ao Valor Adicionado Fiscal.",
      },
    ],
  },
  {
    id: "politicas-publicas",
    title: "Políticas Públicas Setoriais",
    subtitle: "Gestão operacional por secretaria",
    icon: GraduationCap,
    color: "from-amber-500 to-orange-600",
    accentBg: "border-amber-500/30 bg-amber-950/40 text-amber-300",
    modules: [
      {
        name: "Educação",
        description: "Rotinas para escolas, matrículas, turmas, registros e acompanhamento da rede educacional.",
      },
      {
        name: "Saúde",
        description: "Gestão de unidades, atendimentos, agendas e informações da rede de saúde.",
      },
      {
        name: "Assistência Social",
        description: "Apoio a famílias, atendimentos, benefícios e atividades das unidades socioassistenciais.",
      },
      {
        name: "Meio Ambiente",
        description: "Rotinas de licenciamento, fiscalização, denúncias e acompanhamento ambiental.",
      },
      {
        name: "Água e Saneamento",
        description: "Gestão de cadastros, serviços, consumo e atendimento relacionados ao saneamento.",
      },
      {
        name: "Obras e Infraestrutura",
        description: "Planejamento, acompanhamento, medições e registros de obras e serviços urbanos.",
      },
      {
        name: "Cultura, Esporte e Lazer",
        description: "Organização de equipamentos, atividades, eventos e iniciativas culturais e esportivas.",
      },
      {
        name: "Segurança e Mobilidade",
        description: "Apoio a registros, ocorrências, mobilidade e ações de segurança municipal.",
      },
    ],
  },
  {
    id: "governanca-conectividade",
    title: "Governança e Conectividade",
    subtitle: "Controle, indicadores e informações gerenciais",
    icon: ShieldCheck,
    color: "from-cyan-600 to-blue-600",
    accentBg: "border-cyan-500/30 bg-cyan-950/40 text-cyan-300",
    modules: [
      {
        name: "Controle Interno e BI",
        description: "Controles, trilhas de auditoria e painéis para acompanhamento gerencial.",
      },
      {
        name: "Relatórios, Indicadores e Exportações",
        description: "Geração de relatórios, indicadores e arquivos para análise e compartilhamento de informações.",
      },
    ],
  },
] as const;

export function EcosystemMatrix() {
  const [activePillar, setActivePillar] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentPillar = pillars[activePillar];

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % pillars.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + pillars.length) % pillars.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = pillars.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActivePillar(nextIndex);
    requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
  }

  return (
    <section id="modulos" className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-24 text-slate-100">
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-10 left-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-blue-500/40 bg-blue-950/60 px-4 py-1 font-medium text-blue-300">
            <Cpu className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
            Ecossistema completo: 28 módulos em 5 camadas
          </Badge>
          <h2 className="mb-6 font-heading text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl md:text-5xl">
            Uma arquitetura para conectar as áreas do órgão público.
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            Explore a cobertura funcional apresentada no catálogo técnico. Os módulos e integrações são ativados conforme o escopo contratado e a parametrização do projeto.
          </p>
        </div>

        <div role="tablist" aria-label="Camadas funcionais do CeleriFlow" className="mx-auto mb-12 flex max-w-6xl flex-wrap items-center justify-center gap-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isActive = activePillar === index;
            const tabId = `${pillar.id}-tab`;
            const panelId = `${pillar.id}-panel`;

            return (
              <button
                key={pillar.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActivePillar(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`flex items-center gap-2.5 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  isActive
                    ? `scale-105 border-white/20 bg-gradient-to-r ${pillar.color} text-white shadow-lg shadow-blue-500/20`
                    : "border-slate-800 bg-slate-900/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${currentPillar.id}-panel`}
          aria-labelledby={`${currentPillar.id}-tab`}
          tabIndex={0}
          className="mx-auto max-w-6xl rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-8"
        >
          <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center">
            <div>
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-blue-400">{currentPillar.subtitle}</span>
              <h3 className="text-2xl font-bold text-slate-100">{currentPillar.title}</h3>
            </div>
            <span className={`rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold ${currentPillar.accentBg}`}>
              {currentPillar.modules.length} módulos
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {currentPillar.modules.map((module) => (
              <article key={module.name} className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 transition-colors hover:border-blue-500/50 hover:bg-slate-950">
                <CheckCircle2 className="mb-4 h-5 w-5 text-emerald-400" />
                <h4 className="mb-2 text-lg font-bold text-slate-100">{module.name}</h4>
                <p className="text-sm leading-relaxed text-slate-400">{module.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-xl border border-blue-500/20 bg-blue-950/30 px-5 py-4 text-center text-sm leading-relaxed text-slate-300">
          A disponibilidade de módulos e integrações depende do escopo contratado, da parametrização, das permissões e da homologação aplicável.
        </div>

        <div className="mt-10 text-center">
          <Link
            href="#contato"
            className={buttonVariants({
              size: "lg",
              className: "h-13 rounded-xl border border-slate-700 bg-slate-900 px-8 font-bold text-slate-100 shadow-lg hover:border-slate-500 hover:bg-slate-800",
            })}
          >
            Solicitar mapeamento de escopo
          </Link>
        </div>
      </div>
    </section>
  );
}
