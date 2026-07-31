import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Layers, Sparkles, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24 border-b">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs md:text-sm font-semibold bg-muted/60 backdrop-blur-sm text-foreground mb-8 shadow-sm">
          <Sparkles className="h-4 w-4 text-secondary animate-pulse" />
          <span>ERP Governamental de Alta Performance</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground font-normal">+24 Domínios Conectados</span>
        </div>
        
        {/* Main Headline */}
        <h1 className="max-w-5xl font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
          O Ecossistema Digital Definitivo para a <span className="text-primary">Gestão Pública</span> Municipal.
        </h1>
        
        {/* Subheadline */}
        <p className="mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
          Unifique a administração municipal em uma única inteligência em nuvem. Da Tesouraria, Empenhos e Tributação ao Processo Eletrônico, Saúde e Ouvidoria — elimine o papel e eleve a eficiência da prefeitura.
        </p>
        
        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="#contato" 
            className={buttonVariants({ size: "lg", className: "w-full sm:w-auto h-13 px-8 text-base shadow-lg shadow-primary/20" })}
          >
            Solicitar Demonstração Executiva
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="#modulos" 
            className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto h-13 px-8 text-base" })}
          >
            Explorar Módulos (24+)
          </Link>
        </div>

        {/* Feature quick points */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto pt-8 border-t text-xs md:text-sm text-muted-foreground font-medium w-full">
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-4 w-4 text-secondary shrink-0" />
            <span>Processos 100% Digitais</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-secondary shrink-0" />
            <span>Adequação LGPD & LAI</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Building2 className="h-4 w-4 text-secondary shrink-0" />
            <span>Nuvem de Alta Disponibilidade</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Layers className="h-4 w-4 text-secondary shrink-0" />
            <span>24+ Domínios Integrados</span>
          </div>
        </div>
      </div>
    </section>
  );
}
