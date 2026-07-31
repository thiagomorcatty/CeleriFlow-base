"use me";
"use client";

import { useState } from "react";
import { 
  Landmark, 
  FileText, 
  Users, 
  Building2, 
  Receipt, 
  ShoppingCart, 
  Package, 
  UserCheck, 
  FolderCheck, 
  MessageSquare, 
  ShieldCheck, 
  BarChart3, 
  Activity, 
  GraduationCap, 
  HardHat, 
  Trees, 
  HeartHandshake, 
  ShieldAlert, 
  Droplet, 
  Scale, 
  Check, 
  ArrowRight 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function EcosystemMatrix() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: "financeiro",
      title: "Financeiro & Fiscal",
      subtitle: "Gestão Orçamentária e Arrecadação",
      icon: <Landmark className="h-5 w-5" />,
      color: "from-blue-600/10 to-indigo-600/5",
      badge: "Precisão & Controle",
      domains: [
        {
          name: "Financeiro & Tesouraria",
          desc: "Empenhos, liquidações, pagamentos, movimentação bancária e conciliação de contas.",
          icon: <Landmark className="h-6 w-6 text-primary" />
        },
        {
          name: "Tributação & Arrecadação",
          desc: "Cadastro imobiliário/econômico, guias de arrecadação, dívida ativa, IPTU e ISS.",
          icon: <Receipt className="h-6 w-6 text-primary" />
        },
        {
          name: "Compras & Contratos",
          desc: "Solicitações, licitações, atas de registro de preços, saldos e gestão de fornecedores.",
          icon: <ShoppingCart className="h-6 w-6 text-primary" />
        },
        {
          name: "Patrimônio & Almoxarifado",
          desc: "Inventário de bens móveis/imóveis, tombamento, depreciação e gestão de estoque.",
          icon: <Package className="h-6 w-6 text-primary" />
        }
      ]
    },
    {
      id: "administracao",
      title: "Processos & RH",
      subtitle: "Governança Digital sem Papel",
      icon: <FileText className="h-5 w-5" />,
      color: "from-emerald-600/10 to-teal-600/5",
      badge: "Zero Papel",
      domains: [
        {
          name: "Protocolo & Tramitação",
          desc: "Abertura de processos, numeração única, encaminhamentos e acompanhamento de SLA.",
          icon: <FileText className="h-6 w-6 text-primary" />
        },
        {
          name: "Processo Eletrônico & Assinatura",
          desc: "Fluxos 100% digitais com assinatura de alta segurança, validade jurídica e auditoria.",
          icon: <FolderCheck className="h-6 w-6 text-primary" />
        },
        {
          name: "RH & Gestão de Servidores",
          desc: "Prontuário do servidor, folha de pagamento, cargos, licenças, atos e histórico funcional.",
          icon: <UserCheck className="h-6 w-6 text-primary" />
        },
        {
          name: "Gestão Documental (GED)",
          desc: "Indexação, versionamento, controle de acesso e guarda digital descentralizada.",
          icon: <FolderCheck className="h-6 w-6 text-primary" />
        }
      ]
    },
    {
      id: "governanca",
      title: "Cidadão & Transparência",
      subtitle: "Atendimento & Prestação de Contas",
      icon: <Users className="h-5 w-5" />,
      color: "from-amber-600/10 to-orange-600/5",
      badge: "Conformidade LAI",
      domains: [
        {
          name: "Atendimento ao Cidadão",
          desc: "Central unificada de requisições de serviços públicos com acompanhamento por protocolo.",
          icon: <Users className="h-6 w-6 text-primary" />
        },
        {
          name: "Ouvidoria & Sigilo LGPD",
          desc: "Canal direto de manifestações com sigilo garantido, triagem e resposta qualificada.",
          icon: <MessageSquare className="h-6 w-6 text-primary" />
        },
        {
          name: "Portal da Transparência & e-SIC",
          desc: "Publicação automática de atos, despesas, receitas e atendimento às diretrizes da LAI.",
          icon: <ShieldCheck className="h-6 w-6 text-primary" />
        },
        {
          name: "Indicadores Executivos (BI)",
          desc: "Painéis em tempo real para Prefeito e Secretários com visão integrada da gestão.",
          icon: <BarChart3 className="h-6 w-6 text-primary" />
        }
      ]
    },
    {
      id: "setoriais",
      title: "Políticas Setoriais",
      subtitle: "Saúde, Educação, Obras & Meio Ambiente",
      icon: <Building2 className="h-5 w-5" />,
      color: "from-purple-600/10 to-violet-600/5",
      badge: "Cidades Inteligentes",
      domains: [
        {
          name: "Saúde Pública",
          desc: "Gestão de postos, agendamentos, histórico de atendimento e estoque de insumos.",
          icon: <Activity className="h-6 w-6 text-primary" />
        },
        {
          name: "Educação Municipal",
          desc: "Estrutura escolar, matrículas, gestão de vagas e infraestrutura dos estabelecimentos.",
          icon: <GraduationCap className="h-6 w-6 text-primary" />
        },
        {
          name: "Obras & Infraestrutura",
          desc: "Acompanhamento de obras públicas, medições, cronogramas e gestão de projetos.",
          icon: <HardHat className="h-6 w-6 text-primary" />
        },
        {
          name: "Meio Ambiente & Licenciamento",
          desc: "Áreas verdes, requerimentos de licenciamento ambiental e fiscalização municipal.",
          icon: <Trees className="h-6 w-6 text-primary" />
        },
        {
          name: "Assistência Social & Segurança",
          desc: "Mapeamento de vulnerabilidade, programas sociais e integração com segurança urbana.",
          icon: <HeartHandshake className="h-6 w-6 text-primary" />
        },
        {
          name: "Câmara Legislativa",
          desc: "Módulo integrado para suporte às tramitações e demandas do Poder Legislativo.",
          icon: <Scale className="h-6 w-6 text-primary" />
        }
      ]
    }
  ];

  return (
    <section id="modulos" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary font-medium">
            Ecossistema ERP Governamental Completo
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Mais de 24 domínios municipais em uma só plataforma
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Esqueça sistemas legados colados por retalhos. O CeleriFlow foi arquitetado de forma nativa e integrada para conectar a Administração, Finanças, Saúde, Educação, Tributos e Ouvidoria em um único fluxo digital.
          </p>
        </div>

        {/* Pillar Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {pillars.map((pillar, idx) => (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(idx)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                activePillar === idx
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                  : "bg-background hover:bg-muted text-muted-foreground border-border hover:border-foreground/20"
              }`}
            >
              {pillar.icon}
              <span>{pillar.title}</span>
            </button>
          ))}
        </div>

        {/* Active Pillar Card Display */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-card border shadow-sm">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl font-bold font-heading text-foreground">
                  {pillars[activePillar].title}
                </h3>
                <Badge variant="secondary" className="font-medium">
                  {pillars[activePillar].badge}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                {pillars[activePillar].subtitle}
              </p>
            </div>
            
            <Link
              href="#contato"
              className={buttonVariants({ variant: "outline", size: "sm", className: "w-full md:w-auto" })}
            >
              Solicitar Apresentação Técnica
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Grid of Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {pillars[activePillar].domains.map((dom, i) => (
              <Card 
                key={i} 
                className="border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-card/80 backdrop-blur-sm"
              >
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    {dom.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold font-heading">
                      {dom.name}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1 text-muted-foreground leading-relaxed">
                      {dom.desc}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <div className="flex items-center text-xs font-semibold text-primary gap-1">
                    <Check className="h-3.5 w-3.5" />
                    <span>Módulo Nativo & Auditável</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Global Bottom Banner */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Precisa de uma implantação em fases? Comece pelo Processo Eletrônico e expanda os módulos gradualmente sem trocar de infraestrutura.
          </p>
        </div>

      </div>
    </section>
  );
}
