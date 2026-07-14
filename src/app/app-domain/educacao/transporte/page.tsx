import React from "react";
import { Bus, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function TransporteEscolarPage() {
  const [studentsWithTransport] = await Promise.all([
    prisma.student.count({ where: { usesSchoolTransport: true, status: "Ativo" } }),
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Bus className="h-8 w-8 text-amber-600" />
          Transporte Escolar
        </h1>
        <p className="text-gray-500 mt-2">
          Gestão de rotas, veículos e alunos que utilizam o transporte escolar.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
            <Bus className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Alunos e Rotas</h2>
        </div>
        
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total de Alunos (Transporte Público)</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{studentsWithTransport}</p>
        </div>

        <button className="py-2 px-4 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors">
          Gerenciar Rotas e Veículos
        </button>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex gap-3">
        <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
        <div>
          <h3 className="font-medium text-blue-900 dark:text-blue-300">Integração Frota</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
            Para controle avançado de manutenções, motoristas e combustível, os ônibus escolares são gerenciados no Módulo de Frotas.
          </p>
        </div>
      </div>
    </div>
  );
}
