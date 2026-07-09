import React from "react";
import { Pill, Syringe, Search, ShoppingCart, Plus, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function FarmaciaPage() {
  const [medicines, vaccines] = await Promise.all([
    prisma.medicine.findMany({
      orderBy: { name: "asc" },
      take: 20
    }),
    prisma.vaccine.findMany({
      orderBy: { name: "asc" },
      take: 20
    })
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Pill className="h-8 w-8 text-teal-600" />
            Farmácia e Vacinas
          </h1>
          <p className="text-gray-500 mt-2">
            Dispensação de medicamentos, controle básico de estoque e vacinação.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
            <Syringe className="h-5 w-5" />
            Lançar Vacina
          </button>
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <ShoppingCart className="h-5 w-5" />
            Dispensar Medicamento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Painel Farmácia */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Pill className="h-5 w-5 text-teal-500" />
              Catálogo de Medicamentos
            </h2>
            <button className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 p-1">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar medicamento..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/30 border-b border-gray-100 dark:border-gray-700">
                  <th className="p-3 text-sm font-medium text-gray-500">Medicamento / Apresentação</th>
                  <th className="p-3 text-sm font-medium text-gray-500">Estoque (Qtd)</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="p-3">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        {med.name} {med.concentration}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        {med.presentation}
                        {med.isControlled && (
                          <span className="text-red-500 font-medium">Controlado</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className={`text-sm font-medium ${
                        med.currentStock <= med.minStock ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"
                      }`}>
                        {med.currentStock}
                        {med.currentStock <= med.minStock && (
                          <AlertCircle className="h-4 w-4 inline-block ml-1" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {medicines.length === 0 && (
                  <tr>
                    <td colSpan={2} className="p-6 text-center text-sm text-gray-500">
                      Nenhum medicamento listado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Painel Vacinas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Syringe className="h-5 w-5 text-indigo-500" />
              Catálogo de Vacinas
            </h2>
            <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 p-1">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar vacina..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/30 border-b border-gray-100 dark:border-gray-700">
                  <th className="p-3 text-sm font-medium text-gray-500">Vacina</th>
                  <th className="p-3 text-sm font-medium text-gray-500">Doses Req.</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map((vac) => (
                  <tr key={vac.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="p-3">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        {vac.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {vac.disease}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {vac.dosesRequired}
                      </div>
                    </td>
                  </tr>
                ))}
                {vaccines.length === 0 && (
                  <tr>
                    <td colSpan={2} className="p-6 text-center text-sm text-gray-500">
                      Nenhuma vacina listada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
