"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  Zap, 
  ArrowUpRight,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<"geral" | "financeiro" | "protocolos">("geral");

  return (
    <section className="py-24 bg-muted/40 border-y relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-secondary/50 text-secondary font-medium">
            Tomada de Decisão Executiva
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Visão 360° da Prefeitura em Tempo Real
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Substitua relatórios em papel por um painel de inteligência executiva. Acompanhe a saúde orçamentária, o cumprimento de SLAs de atendimento e o status de obras em uma única tela.
          </p>
        </div>

        {/* Mockup Frame Container */}
        <div className="max-w-5xl mx-auto rounded-2xl border bg-background/95 shadow-2xl overflow-hidden backdrop-blur-md">
          
          {/* Mockup Header Bar */}
          <div className="bg-muted/80 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="h-4 w-px bg-border mx-2 hidden sm:block" />
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                Prefeitura Municipal de Exemplo — Painel Executivo
              </span>
            </div>

            {/* Dashboard Nav Tabs */}
            <div className="flex items-center bg-background rounded-lg p-1 border text-xs font-medium">
              <button 
                onClick={() => setActiveTab("geral")}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  activeTab === "geral" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Visão Geral
              </button>
              <button 
                onClick={() => setActiveTab("financeiro")}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  activeTab === "financeiro" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Finanças & Receita
              </button>
              <button 
                onClick={() => setActiveTab("protocolos")}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  activeTab === "protocolos" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Processos & SLA
              </button>
            </div>
          </div>

          {/* Mockup Dashboard Content */}
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Top KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-xl bg-card border shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-xs font-medium">Processos Ativos</span>
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading">1.482</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>94.2% dentro do SLA</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card border shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-xs font-medium">Economia com Papel</span>
                  <Zap className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading">R$ 142.800</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>Redução de 100% no trâmite físico</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card border shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-xs font-medium">Arrecadação Municipal</span>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading">R$ 4.820.450</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>+12.4% vs mês anterior</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card border shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-xs font-medium">Atendimento Cidadão</span>
                  <Users className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading">98.5%</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Índice de Satisfação Ouvidoria</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Dashboard Middle Section: Visual Activity Rows */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Chart/List Mockup */}
              <div className="lg:col-span-2 p-5 rounded-xl bg-card border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <h4 className="font-heading font-semibold text-sm">Tramitações Recentes em Tempo Real</h4>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Filter className="h-3 w-3" /> Atualizado há 1 min
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground">Solicitação de Licença Ambiental #4092</div>
                        <div className="text-muted-foreground">Secretaria de Meio Ambiente → Análise Deferida</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      Concluído
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground">Empenho de Compras de Insumos Hospitalares #1280</div>
                        <div className="text-muted-foreground">Secretaria de Saúde → Liquidação Registrada</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-blue-500/10 text-blue-600 border-blue-500/20">
                      Em Tramitação
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground">Revisão do Aliquota ISSQN Autônomos #882</div>
                        <div className="text-muted-foreground">Setor de Tributos → Aguardando Despacho</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/20">
                      Prazo 24h
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Sidebar Summary Mockup */}
              <div className="p-5 rounded-xl bg-primary text-primary-foreground flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="h-5 w-5 text-secondary" />
                    <h4 className="font-heading font-bold text-base">Rastreabilidade & Conformidade</h4>
                  </div>
                  <p className="text-xs text-primary-foreground/80 leading-relaxed mb-4">
                    Todas as assinaturas, despachos e conciliações financeiras possuem log imutável de auditoria com validade jurídica garantida.
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                      <span>Integração entre 100% das secretarias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                      <span>Notificações automáticas de prazos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                      <span>Portal da Transparência conectado</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-primary-foreground/20 text-xs text-primary-foreground/70 flex items-center justify-between">
                  <span>CeleriFlow ERP v2.6</span>
                  <span className="flex items-center gap-1 font-semibold text-secondary">
                    Status Online <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
