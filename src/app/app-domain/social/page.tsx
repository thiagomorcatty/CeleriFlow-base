import React from "react";
import { Users, HeartHandshake, Home, ClipboardList, Package, MapPin } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SocialDashboardPage() {
  const [
    totalUnits,
    totalFamilies,
    todayAttendances,
    recentConcessions
  ] = await Promise.all([
    prisma.socialUnit.count({ where: { isActive: true } }),
    prisma.socialFamily.count({ where: { status: "Ativo" } }),
    prisma.socialAttendance.count({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }
    }),
    prisma.socialBenefitConcession.count({
      where: {
        date: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }
    })
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <HeartHandshake className="h-8 w-8 text-orange-600" />
          Assistência Social
        </h1>
        <p className="text-gray-500 mt-2">
          Gestão do Sistema Único de Assistência Social (SUAS): CRAS, CREAS, famílias e benefícios.
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
            <Home className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Unidades (CRAS/CREAS)</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalUnits}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Famílias Assistidas</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalFamilies}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
            <ClipboardList className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Atendimentos (Hoje)</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{todayAttendances}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
            <Package className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Benefícios (Últimos 30d)</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{recentConcessions}</p>
          </div>
        </div>
      </div>

      {/* Acessos Rápidos */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Acesso Rápido</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/app-domain/social/unidades" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <Home className="h-8 w-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Unidades</h3>
            <p className="text-sm text-gray-500">Gestão de CRAS, CREAS e equipamentos da rede socioassistencial.</p>
          </div>
        </Link>

        <Link href="/app-domain/social/familias" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <Users className="h-8 w-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Famílias</h3>
            <p className="text-sm text-gray-500">Cadastro único, composição familiar, vulnerabilidades e NIS.</p>
          </div>
        </Link>

        <Link href="/app-domain/social/atendimentos" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <ClipboardList className="h-8 w-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Atendimentos (PAIF/PAEFI)</h3>
            <p className="text-sm text-gray-500">Registro de acolhimento, acompanhamento técnico e sigilo.</p>
          </div>
        </Link>

        <Link href="/app-domain/social/beneficios" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <Package className="h-8 w-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Benefícios e Programas</h3>
            <p className="text-sm text-gray-500">Concessão de cestas básicas, auxílios e programas de renda.</p>
          </div>
        </Link>

        <Link href="/app-domain/social/prontuario" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <ClipboardList className="h-8 w-8 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Prontuário Social</h3>
            <p className="text-sm text-gray-500">Histórico técnico, acompanhamento e pareceres sociais.</p>
          </div>
        </Link>

        <Link href="/app-domain/social/visitas" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <MapPin className="h-8 w-8 text-teal-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Visitas Domiciliares</h3>
            <p className="text-sm text-gray-500">Gestão de agendamentos e registros de visitas da equipe.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
