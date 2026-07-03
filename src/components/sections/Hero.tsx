import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-muted/50 text-muted-foreground mb-6">
          <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
          Segurança e agilidade para a gestão pública
        </div>
        
        <h1 className="max-w-4xl font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Processos <span className="text-primary">ágeis</span>, decisões <span className="text-secondary">seguras</span> e dados confiáveis.
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          O CeleriFlow é uma plataforma em nuvem para transformar processos públicos em fluxos digitais simples, seguros e rastreáveis.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="#contato" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto h-12 px-8 text-base" })}>
            Solicitar Demonstração
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="#modulos" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto h-12 px-8 text-base" })}>
            Conhecer Módulos
          </Link>
        </div>

        {/* Feature quick points */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto pt-8 border-t text-sm text-muted-foreground font-medium">
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-4 w-4 text-secondary" />
            Processo Digital
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-secondary" />
            Adequado à LGPD
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-secondary"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
            100% em Nuvem
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-secondary"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Rastreabilidade
          </div>
        </div>
      </div>
    </section>
  );
}
