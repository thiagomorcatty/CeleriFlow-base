import React from "react";
import { Stethoscope, HeartPulse, Users, Activity, Pill, CalendarCheck, ClipboardType } from "lucide-react";
import Link from "next/link";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function SaudeDashboardPage() {
  const { prisma } = await getTenantContextForModule("SAUDE");
  const [
    totalUnits,
    totalPatients,
    todayAppointments,
    todayVaccines
  ] = await Promise.all([
    prisma.healthUnit.count({ where: { isActive: true } }),
    prisma.patient.count({ where: { status: "Ativo" } }),
    prisma.healthAppointment.count({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }
    }),
    prisma.vaccinationRecord.count({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }
    })
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <HeartPulse className="h-8 w-8 text-rose-600" />
          Saúde
        </h1>
        <p className="text-gray-500 mt-2">
          Gestão integrada da rede municipal de saúde: UBS, ESF, pacientes e prontuários.
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
            <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Unidades Ativas</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalUnits}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pacientes Cadastrados</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalPatients}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
            <CalendarCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Agendamentos (Hoje)</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{todayAppointments}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-lg">
            <Pill className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Vacinas Aplicadas (Hoje)</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{todayVaccines}</p>
          </div>
        </div>
      </div>

      {/* Acessos Rápidos */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Acesso Rápido</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/saude/unidades" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <Activity className="h-8 w-8 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Unidades e Equipes</h3>
            <p className="text-sm text-gray-500">Gestão de UBS, ESF e profissionais da saúde.</p>
          </div>
        </Link>

        <Link href="/saude/pacientes" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <Users className="h-8 w-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Pacientes</h3>
            <p className="text-sm text-gray-500">Cartão SUS, prontuário unificado e histórico clínico.</p>
          </div>
        </Link>

        <Link href="/saude/atendimentos" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <Stethoscope className="h-8 w-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Atendimentos</h3>
            <p className="text-sm text-gray-500">Agenda, triagem (sinais vitais) e evolução clínica.</p>
          </div>
        </Link>

        <Link href="/saude/farmacia" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all h-full">
            <div className="flex gap-2">
              <Pill className="h-8 w-8 text-teal-500 mb-4 group-hover:scale-110 transition-transform" />
              <ClipboardType className="h-8 w-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Farmácia e Vacinas</h3>
            <p className="text-sm text-gray-500">Dispensação de receitas, vacinação e controle básico.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
