import React from "react";
import { Utensils, AlertCircle, TrendingUp, Calendar as CalendarIcon, DollarSign } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MerendaEscolarPage() {
  const [meals, studentsWithSpecialMeal, mealsCount] = await Promise.all([
    prisma.schoolMeal.findMany({
      include: { school: true },
      orderBy: { date: "desc" },
      take: 20
    }),
    prisma.student.count({ where: { needsSpecialMeal: true, status: "Ativo" } }),
    prisma.schoolMeal.count()
  ]);

  const totalCostOverall = meals.reduce((acc, curr) => acc + (curr.totalCost || 0), 0);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Utensils className="h-8 w-8 text-orange-600" />
          Merenda Escolar
        </h1>
        <p className="text-gray-500 mt-2">
          Gestão financeira e controle de refeições servidas nas escolas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
              <Utensils className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Refeições Registradas</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mealsCount}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <AlertCircle className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dietas Especiais (Alunos)</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentsWithSpecialMeal}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Custo Total (Registros Listados)</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCostOverall)}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            Últimos Registros de Alimentação
          </h2>
          <Link href="/educacao/merenda/novo" className="py-2 px-4 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
            Registrar Alimentação Servida
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Data</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Escola</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Cardápio</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-center">Quant. Servida</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-right">Custo Estimado/Total</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                    {new Intl.DateTimeFormat('pt-BR').format(new Date(meal.date))}
                  </td>
                  <td className="p-4 text-sm text-gray-900 dark:text-white">
                    {meal.school.name}
                  </td>
                  <td className="p-4 text-sm text-gray-900 dark:text-white font-medium">
                    {meal.menu}
                  </td>
                  <td className="p-4 text-sm text-gray-900 dark:text-white text-center">
                    {meal.servedQuantity}
                  </td>
                  <td className="p-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 text-right">
                    {meal.totalCost ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meal.totalCost) : "-"}
                  </td>
                </tr>
              ))}
              {meals.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhum registro de merenda encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex gap-3">
        <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
        <div>
          <h3 className="font-medium text-blue-900 dark:text-blue-300">Integração Financeira</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
            Os custos aqui registrados podem ser consolidados e gerar solicitações de empenho ou liquidação no Módulo Financeiro, facilitando o controle dos gastos da Secretaria de Educação.
          </p>
        </div>
      </div>
    </div>
  );
}
