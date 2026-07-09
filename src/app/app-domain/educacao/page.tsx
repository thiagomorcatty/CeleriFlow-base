import React from "react";
import { GraduationCap, School, Users, BookOpen, ClipboardCheck, Bus, Utensils } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function EducacaoDashboardPage() {
  const [
    totalSchools,
    totalStudents,
    totalClasses,
    totalDiaries
  ] = await Promise.all([
    prisma.school.count(),
    prisma.student.count({ where: { status: "Ativo" } }),
    prisma.schoolClass.count({ where: { status: "Aberta" } }),
    prisma.classDiary.count({ where: { status: "Aberto" } }),
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          Módulo 12 - Educação
        </h1>
        <p className="text-gray-500 mt-2">
          Gestão Escolar integrada à rede municipal de ensino.
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
            <School className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Escolas</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalSchools}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Alunos Ativos</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalStudents}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
            <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Turmas Abertas</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalClasses}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
            <ClipboardCheck className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Diários Pendentes</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalDiaries}</p>
          </div>
        </div>
      </div>

      {/* Acessos Rápidos */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Acesso Rápido</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/app-domain/educacao/escolas" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
            <School className="h-8 w-8 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Gestão de Escolas</h3>
            <p className="text-sm text-gray-500">Unidades de ensino, infraestrutura e capacidade.</p>
          </div>
        </Link>

        <Link href="/app-domain/educacao/alunos" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
            <Users className="h-8 w-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Alunos e Matrículas</h3>
            <p className="text-sm text-gray-500">Cadastro de estudantes, responsáveis e vínculos.</p>
          </div>
        </Link>

        <Link href="/app-domain/educacao/turmas" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
            <BookOpen className="h-8 w-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Turmas e Diário</h3>
            <p className="text-sm text-gray-500">Grade curricular, frequência e notas.</p>
          </div>
        </Link>

        <Link href="/app-domain/educacao/apoio" className="group">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex justify-between">
            <div>
              <div className="flex gap-2">
                <Bus className="h-8 w-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                <Utensils className="h-8 w-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Transporte e Merenda</h3>
              <p className="text-sm text-gray-500">Rotas e controle de alimentação escolar.</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
