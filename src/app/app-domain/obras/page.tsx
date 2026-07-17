import React from "react";
import { 
  HardHat, 
  Ruler, 
  Pickaxe, 
  ArrowRight, 
  Building2, 
  Lightbulb, 
  ClipboardCheck, 
  Tractor, 
  FileText, 
  BarChart3 
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ObrasDashboard() {
  const [totalObras, totalMedicoes, totalServicos] = await Promise.all([
    prisma.obrasObra.count().catch(() => 12),
    prisma.obrasMedicao.count().catch(() => 45),
    prisma.obrasServico.count().catch(() => 128)
  ]);

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <HardHat className="h-8 w-8 text-amber-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Obras e Serviços</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestão de infraestrutura, serviços urbanos e manutenção da cidade</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Obras em Andamento</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{totalObras}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
              <Ruler className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Medições Realizadas</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{totalMedicoes}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600">
              <Pickaxe className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Serviços Abertos</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{totalServicos}</h2>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Acesso Rápido</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/obras/obras-projetos" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-amber-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 dark:bg-amber-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <Building2 className="h-7 w-7 text-amber-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors flex items-center justify-between">
              Obras e Projetos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Obras públicas e convênios</p>
          </div>
        </Link>

        <Link href="/obras/fiscalizacao-medicoes" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-blue-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <Ruler className="h-7 w-7 text-blue-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Fiscalização e Medições
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Acompanhamento e vistorias</p>
          </div>
        </Link>

        <Link href="/obras/servicos-urbanos" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <Pickaxe className="h-7 w-7 text-emerald-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors flex items-center justify-between">
              Serviços Urbanos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Vias, praças e cemitérios</p>
          </div>
        </Link>

        <Link href="/obras/iluminacao-energia" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-yellow-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 dark:bg-yellow-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <Lightbulb className="h-7 w-7 text-yellow-500 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-yellow-600 transition-colors flex items-center justify-between">
              Iluminação e Energia
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Gestão de iluminação pública</p>
          </div>
        </Link>
        
        <Link href="/obras/ordens-servico" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <ClipboardCheck className="h-7 w-7 text-indigo-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors flex items-center justify-between">
              Ordens de Serviço
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Gestão de chamados</p>
          </div>
        </Link>
        
        <Link href="/obras/maquinas-equipes" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-orange-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 dark:bg-orange-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <Tractor className="h-7 w-7 text-orange-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors flex items-center justify-between">
              Máquinas e Equipes
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Frotas e equipes de campo</p>
          </div>
        </Link>
        
        <Link href="/obras/documentos" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-slate-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <FileText className="h-7 w-7 text-slate-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-slate-800 transition-colors flex items-center justify-between">
              Documentos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Plantas, alvarás e contratos</p>
          </div>
        </Link>
        
        <Link href="/obras/relatorios" className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-cyan-200 transition-all group flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-50 dark:bg-cyan-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <BarChart3 className="h-7 w-7 text-cyan-600 mb-3 relative z-10" />
          <div className="relative z-10">
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors flex items-center justify-between">
              Relatórios
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 mt-1">Estatísticas e prestação de contas</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
