import React from "react";
import { HardHat, Ruler, Pickaxe, ArrowRight, Building, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ObrasDashboard() {
  const [totalObras, totalMedicoes, totalServicos] = await Promise.all([
    prisma.obrasObra.count(),
    prisma.obrasMedicao.count(),
    prisma.obrasServico.count()
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center gap-3 mb-8">
        <HardHat className="h-8 w-8 text-amber-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Obras e Infraestrutura</h1>
          <p className="text-gray-500 dark:text-gray-400">Gestão de obras públicas, medições e serviços urbanos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Obras em Andamento</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalObras}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
              <Ruler className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Medições Realizadas</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalMedicoes}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
              <Pickaxe className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Serviços Abertos</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalServicos}</h2>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Acesso Rápido</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/app-domain/obras/obras-publicas" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Building className="h-6 w-6 text-amber-600 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors flex items-center justify-between">
              Obras Públicas
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Planejamento e acompanhamento</p>
          </div>
        </Link>

        <Link href="/app-domain/obras/medicoes" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Ruler className="h-6 w-6 text-blue-600 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center justify-between">
              Medições
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Medições de obras e serviços</p>
          </div>
        </Link>

        <Link href="/app-domain/obras/servicos" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Pickaxe className="h-6 w-6 text-green-600 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 transition-colors flex items-center justify-between">
              Serviços Urbanos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Manutenção e serviços na cidade</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
