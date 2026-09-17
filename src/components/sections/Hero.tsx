"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  Cpu,
  FileCheck2,
  Layers,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 pb-20 pt-20 text-slate-100 md:pb-28 md:pt-28">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute left-1/4 top-1/2 z-0 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-blue-600/15 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 z-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center md:px-6">
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-slate-900/80 px-4 py-2 text-xs font-medium text-blue-300 shadow-lg shadow-blue-500/10 backdrop-blur-md md:text-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span className="font-semibold text-slate-100">CeleriFlow Gov 2026</span>
          <span className="mx-1 h-3 w-px bg-slate-700" />
          <span className="font-normal text-slate-300">Catálogo Técnico e Funcional disponível</span>
        </div>

        <h1 className="max-w-5xl font-heading text-4xl font-black leading-[1.1] tracking-tight text-slate-100 sm:text-5xl md:text-6xl lg:text-7xl">
          Processos ágeis, decisões seguras e{" "}
          <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-sm">
            dados confiáveis em nuvem.
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-slate-400 sm:text-lg md:text-xl">
          Plataforma em nuvem da <strong>Robonuvem</strong> para reunir processos, gestão corporativa e políticas públicas em um ambiente configurável conforme o escopo do órgão.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="#contato"
            className={buttonVariants({
              size: "lg",
              className: "h-14 w-full rounded-xl border border-blue-400/30 bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 px-8 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-emerald-400 sm:w-auto",
            })}
          >
            Solicitar demonstração executiva
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a
            href="/docs/catalogo-tecnico-celeriflow-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "h-14 w-full rounded-xl border-emerald-500/40 bg-emerald-950/40 px-7 text-base font-semibold text-emerald-300 backdrop-blur-md transition-colors hover:bg-emerald-900/60 hover:text-white sm:w-auto",
            })}
          >
            <FileCheck2 className="mr-2 h-5 w-5 text-emerald-400" />
            Baixar catálogo técnico
          </a>
          <Link
            href="#modulos"
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "h-14 w-full rounded-xl border-slate-700 bg-slate-900/60 px-6 text-base font-semibold text-slate-300 backdrop-blur-md hover:bg-slate-800 hover:text-white sm:w-auto",
            })}
          >
            <Play className="mr-2 h-4 w-4 fill-blue-400 text-blue-400" />
            Explorar módulos
          </Link>
        </div>

        <div className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-3 text-xs md:grid-cols-4 md:gap-6 md:text-sm">
          <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-slate-300 backdrop-blur-sm">
            <Layers className="h-4 w-4 shrink-0 text-blue-400" />
            <span>5 camadas funcionais</span>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-slate-300 backdrop-blur-sm">
            <Cpu className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>28 módulos funcionais</span>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-slate-300 backdrop-blur-sm">
            <FileCheck2 className="h-4 w-4 shrink-0 text-teal-400" />
            <span>Implantação assistida</span>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-slate-300 backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 shrink-0 text-blue-400" />
            <span>Acesso web em nuvem</span>
          </div>
        </div>

        <div className="group relative mt-16 w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-2 text-left shadow-2xl shadow-blue-900/20 backdrop-blur-xl transition-all hover:border-slate-700 sm:p-4">
          <div className="mb-4 flex items-center justify-between rounded-t-xl border-b border-slate-800 bg-slate-950/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">ambiente demonstrativo</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded border border-emerald-800/50 bg-emerald-950/80 px-2 py-0.5 text-[11px] font-mono text-emerald-400">
              <Activity className="h-3 w-3" />
              DADOS ILUSTRATIVOS
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-3 sm:p-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition-colors hover:border-blue-500/40">
              <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                <span>Indicadores executivos</span>
                <Zap className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="font-mono text-xl font-bold text-slate-100 sm:text-2xl">Visão consolidada</div>
              <div className="mt-1 text-[11px] text-emerald-400">Painéis configuráveis por órgão</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition-colors hover:border-blue-500/40">
              <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                <span>Processos e atendimento</span>
                <FileCheck2 className="h-4 w-4 text-blue-400" />
              </div>
              <div className="font-mono text-xl font-bold text-slate-100 sm:text-2xl">Acompanhamento</div>
              <div className="mt-1 text-[11px] text-blue-400">Fluxos e prazos parametrizáveis</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition-colors hover:border-blue-500/40">
              <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                <span>Gestão corporativa</span>
                <Cpu className="h-4 w-4 text-teal-400" />
              </div>
              <div className="font-mono text-xl font-bold text-slate-100 sm:text-2xl">Relatórios e indicadores</div>
              <div className="mt-1 text-[11px] text-teal-400">Informações para análise gerencial</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
