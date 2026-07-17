import React from "react";
import { Landmark, Users, Calendar, FileText, ArrowRight, Scale, Mic, Globe } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CamaraDashboard() {
  const [
    totalVereadores, 
    totalSessoes, 
    totalProposicoes,
    totalComissoes,
    totalLeis,
    totalAudiencias
  ] = await Promise.all([
    prisma.camVereador.count({ where: { status: "Em Exercício" } }),
    prisma.camSessao.count(),
    prisma.camProposicao.count(),
    prisma.camComissao.count({ where: { status: "Ativa" } }),
    prisma.camLei.count(),
    prisma.camAudiencia.count()
  ]);

  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Landmark className="h-8 w-8 text-[#9333EA]" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Câmara Municipal</h1>
          <p className="text-gray-500 dark:text-gray-400">Visão Geral da Gestão Legislativa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-[#9333EA]">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Vereadores Ativos</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalVereadores}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sessões Realizadas</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalSessoes}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-lg text-fuchsia-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Proposições Registradas</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalProposicoes}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Leis Promulgadas</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalLeis}</h2>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Módulos do Sistema Legislativo</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        
        <Link href="/app-domain/camara/legislaturas" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Landmark className="h-6 w-6 text-[#9333EA] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#9333EA] transition-colors flex items-center justify-between">
              Legislaturas
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Gestão de mandatos</p>
          </div>
        </Link>

        <Link href="/app-domain/camara/vereadores" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Users className="h-6 w-6 text-[#9333EA] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#9333EA] transition-colors flex items-center justify-between">
              Vereadores
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Parlamentares, Mesa e Gabinetes</p>
          </div>
        </Link>

        <Link href="/app-domain/camara/comissoes" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Users className="h-6 w-6 text-[#9333EA] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#9333EA] transition-colors flex items-center justify-between">
              Comissões
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">{totalComissoes} comissões ativas</p>
          </div>
        </Link>

        <Link href="/app-domain/camara/sessoes" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Calendar className="h-6 w-6 text-[#9333EA] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#9333EA] transition-colors flex items-center justify-between">
              Sessões Plenárias
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Sessões, Pautas e Atas</p>
          </div>
        </Link>

        <Link href="/app-domain/camara/proposicoes" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <FileText className="h-6 w-6 text-[#9333EA] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#9333EA] transition-colors flex items-center justify-between">
              Proposições
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Projetos, Votações e Pareceres</p>
          </div>
        </Link>

        <Link href="/app-domain/camara/leis" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Scale className="h-6 w-6 text-[#9333EA] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#9333EA] transition-colors flex items-center justify-between">
              Leis e Atos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Legislação municipal e decretos</p>
          </div>
        </Link>

        <Link href="/app-domain/camara/audiencias" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Mic className="h-6 w-6 text-[#9333EA] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#9333EA] transition-colors flex items-center justify-between">
              Audiências Públicas
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">{totalAudiencias} eventos de participação</p>
          </div>
        </Link>

        <Link href="/app-domain/camara/portal" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Globe className="h-6 w-6 text-[#9333EA] mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#9333EA] transition-colors flex items-center justify-between">
              Portal Legislativo
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Transparência e publicação</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
