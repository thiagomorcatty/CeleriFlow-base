import React from "react";
import { Droplets, FileText, Wrench, Receipt, ArrowRight } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SaneamentoDashboard() {
  const [totalUnits, totalReadings, totalOS] = await Promise.all([
    prisma.sanConsumerUnit.count(),
    prisma.sanMeterReading.count(),
    prisma.sanServiceOrder.count()
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center gap-3 mb-8">
        <Droplets className="h-8 w-8 text-[#0284C7]" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Água e Saneamento</h1>
          <p className="text-gray-500 dark:text-gray-400">Gestão de serviços de abastecimento de água e esgoto</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#E0F2FE] dark:bg-[#0284C7]/20 rounded-lg text-[#0284C7]">
              <Droplets className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unidades Consumidoras</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalUnits}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Leituras Registradas</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalReadings}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ordens de Serviço (Total)</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalOS}</h2>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Acesso Rápido</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/app-domain/saneamento/unidades" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Droplets className="h-6 w-6 text-[#0284C7] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#0284C7] transition-colors flex items-center justify-between">
              Unidades Consumidoras
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Cadastro de hidrômetros e locais</p>
          </div>
        </Link>

        <Link href="/app-domain/saneamento/leituras" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <FileText className="h-6 w-6 text-[#0284C7] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#0284C7] transition-colors flex items-center justify-between">
              Leituras e Consumo
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Registro de aferições mensais</p>
          </div>
        </Link>

        <Link href="/app-domain/saneamento/faturas" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Receipt className="h-6 w-6 text-[#0284C7] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#0284C7] transition-colors flex items-center justify-between">
              Faturamento
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Gestão de contas de água</p>
          </div>
        </Link>

        <Link href="/app-domain/saneamento/servicos" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Wrench className="h-6 w-6 text-[#0284C7] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#0284C7] transition-colors flex items-center justify-between">
              Ordens de Serviço
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Cortes, manutenções e reparos</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
