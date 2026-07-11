import React from "react";
import { Shield, ShieldAlert, CarFront, FileWarning, ArrowRight, Activity, Users } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SegurancaDashboard() {
  const [totalGuardas, totalOcorrencias, totalInfracoes] = await Promise.all([
    prisma.segurancaGuarda.count(),
    prisma.segurancaOcorrencia.count(),
    prisma.segurancaInfracao.count()
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-cyan-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Segurança Pública e Mobilidade</h1>
          <p className="text-gray-500 dark:text-gray-400">Gestão da guarda, trânsito, ocorrências e mobilidade</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg text-cyan-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Agentes e Guardas</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalGuardas}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-teal-600">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ocorrências Registradas</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalOcorrencias}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
              <FileWarning className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Autos de Infração</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalInfracoes}</h2>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Acesso Rápido</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/app-domain/seguranca/guardas" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Shield className="h-6 w-6 text-cyan-600 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-cyan-600 transition-colors flex items-center justify-between">
              Efetivo e Equipes
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Gestão de guardas e agentes de trânsito</p>
          </div>
        </Link>

        <Link href="/app-domain/seguranca/ocorrencias" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Activity className="h-6 w-6 text-teal-600 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors flex items-center justify-between">
              Ocorrências e Despachos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Atendimento, defesa civil e rondas</p>
          </div>
        </Link>

        <Link href="/app-domain/seguranca/infracoes" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <CarFront className="h-6 w-6 text-slate-600 dark:text-slate-400 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors flex items-center justify-between">
              Trânsito e Mobilidade
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Infrações, sinalização e transporte público</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
