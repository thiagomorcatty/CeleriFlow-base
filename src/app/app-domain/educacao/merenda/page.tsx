import React from "react";
import { Utensils, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MerendaEscolarPage() {
  const [studentsWithSpecialMeal, mealsCount] = await Promise.all([
    prisma.student.count({ where: { needsSpecialMeal: true, status: "Ativo" } }),
    prisma.schoolMeal.count()
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Utensils className="h-8 w-8 text-orange-600" />
          Merenda Escolar
        </h1>
        <p className="text-gray-500 mt-2">
          Gestão de cardápios, estoques e distribuição de alimentação nas escolas.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Cardápios Servidos (Histórico)</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{mealsCount}</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-900/30">
            <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> Alunos com Dieta Especial
            </p>
            <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{studentsWithSpecialMeal}</p>
          </div>
        </div>

        <button className="py-2 px-4 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
          Registrar Alimentação Servida
        </button>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex gap-3">
        <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
        <div>
          <h3 className="font-medium text-blue-900 dark:text-blue-300">Integração Almoxarifado</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
            O abatimento de insumos da merenda pode ocorrer automaticamente integrando com o Almoxarifado Central (Módulo 11).
          </p>
        </div>
      </div>
    </div>
  );
}
