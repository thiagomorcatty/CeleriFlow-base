"use client";

import Link from "next/link";
import { Database, ShieldCheck, ArrowRight } from "lucide-react";

export default function PocHeaderBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-500/20 px-4 py-1.5 text-xs text-slate-300 flex items-center justify-between shadow-inner">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-emerald-400 tracking-wide uppercase text-[11px]">
          MODO POC & DEMONSTRAÇÃO ATIVO
        </span>
        <span className="hidden md:inline text-slate-400">|</span>
        <span className="hidden md:inline text-slate-400">
          Base padronizada com dados de teste (20 módulos preenchidos)
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-1 text-[11px] text-indigo-300 bg-indigo-900/30 px-2 py-0.5 rounded border border-indigo-500/20">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Sandbox de Notificação Ativo</span>
        </div>
        <Link
          href="/administracao/poc-control"
          className="flex items-center gap-1 font-semibold text-indigo-300 hover:text-white transition-colors bg-indigo-600/30 hover:bg-indigo-600/50 px-2.5 py-0.5 rounded-full border border-indigo-400/30 text-[11px]"
        >
          <Database className="w-3 h-3 text-indigo-400" />
          <span>Painel POC & Reset Base</span>
          <ArrowRight className="w-3 h-3 ml-0.5" />
        </Link>
      </div>
    </div>
  );
}
