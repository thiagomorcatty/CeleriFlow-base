import React from "react";
import { Bus, Utensils, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function ApoioEscolarPage() {
  const [studentsWithTransport, studentsWithSpecialMeal, mealsCount] = await Promise.all([
    prisma.student.count({ where: { usesSchoolTransport: true, status: "Ativo" } }),
    prisma.student.count({ where: { needsSpecialMeal: true, status: "Ativo" } }),
    prisma.schoolMeal.count()
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Bus className="h-8 w-8 text-amber-600" />
          Transporte e Merenda
        </h1>
        <p className="text-gray-500 mt-2">
          Gestão de apoio ao estudante: Rotas escolares e alimentação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Painel Transporte */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
              <Bus className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transporte Escolar</h2>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Alunos que utilizam transporte</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{studentsWithTransport}</p>
          </div>

          <button className="w-full py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors">
            Gerenciar Rotas e Veículos
          </button>
        </div>

        {/* Painel Merenda */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <Utensils className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Merenda Escolar</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Cardápios Servidos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{mealsCount}</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-900/30">
              <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> Dieta Especial
              </p>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{studentsWithSpecialMeal}</p>
            </div>
          </div>

          <button className="w-full py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-medium rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
            Registrar Alimentação
          </button>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex gap-3">
        <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
        <div>
          <h3 className="font-medium text-blue-900 dark:text-blue-300">Integração com Módulos</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
            Para controle avançado de frotas, utilize o Módulo de Frotas. O abatimento de insumos da merenda ocorrerá automaticamente no Módulo 11 (Almoxarifado) caso os itens do cardápio estejam vinculados ao estoque.
          </p>
        </div>
      </div>
    </div>
  );
}
