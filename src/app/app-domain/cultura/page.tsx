import React from "react";
import { 
  Palette, 
  Users, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  ShieldAlert, 
  FileText 
} from "lucide-react";
import Link from "next/link";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function CulturaDashboard() {
  const { prisma } = await getTenantContextForModule("CULTURA");
  const [totalAgentes, totalEspacos, totalEventos] = await Promise.all([
    prisma.culturaAgente.count({ where: { active: true } }),
    prisma.culturaEspaco.count({ where: { active: true } }),
    prisma.culturaEvento.count({ where: { active: true } })
  ]);

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Palette className="h-8 w-8 text-pink-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Cultura, Esporte e Lazer</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestão de fomento à cultura, políticas públicas de esporte e administração de espaços municipais.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl text-pink-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Agentes Culturais</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{totalAgentes}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Espaços Cadastrados</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{totalEspacos}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl text-rose-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Eventos Programados</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{totalEventos}</h2>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Acesso Rápido</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/cultura/gestao-cultural" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-pink-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 dark:bg-pink-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <Palette className="h-7 w-7 text-pink-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-600 transition-colors flex items-center justify-between">
              Gestão Cultural
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Agentes, espaços e patrimônio</p>
          </div>
        </Link>

        <Link href="/cultura/fomento-projetos" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <Sparkles className="h-7 w-7 text-indigo-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors flex items-center justify-between">
              Fomento e Projetos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Editais, incentivos e projetos</p>
          </div>
        </Link>

        <Link href="/cultura/esporte-lazer" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-rose-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 dark:bg-rose-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <Trophy className="h-7 w-7 text-rose-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors flex items-center justify-between">
              Esporte e Lazer
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Escolinhas, campeonatos e atletas</p>
          </div>
        </Link>

        <Link href="/cultura/espacos-reservas" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <MapPin className="h-7 w-7 text-emerald-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors flex items-center justify-between">
              Espaços e Reservas
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Reservas de quadras e teatros</p>
          </div>
        </Link>
        
        <Link href="/cultura/eventos" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-amber-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 dark:bg-amber-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <Calendar className="h-7 w-7 text-amber-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors flex items-center justify-between">
              Eventos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Agenda de eventos e festividades</p>
          </div>
        </Link>

        <Link href="/cultura/conselhos-fundos" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-red-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 dark:bg-red-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <ShieldAlert className="h-7 w-7 text-red-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors flex items-center justify-between">
              Conselhos e Fundos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Órgãos deliberativos e recursos</p>
          </div>
        </Link>

        <Link href="/cultura/documentos" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <FileText className="h-7 w-7 text-slate-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-slate-800 transition-colors flex items-center justify-between">
              Documentos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Planos, resoluções e regulamentos</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
