import React from "react";
import { Activity, Plus, MapPin, Building, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function UnidadesPage() {
  const units = await prisma.healthUnit.findMany({
    include: {
      address: true,
      manager: { include: { person: true } },
      _count: {
        select: { teams: true, professionals: true }
      }
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Activity className="h-8 w-8 text-indigo-600" />
            Unidades de Saúde
          </h1>
          <p className="text-gray-500 mt-2">
            Gestão das UBS, ESF, CAPS e outras unidades assistenciais.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-5 w-5" />
          Nova Unidade
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Unidade</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Contato / Endereço</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Responsável</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Equipes / Profissionais</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      {unit.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {unit.type} {unit.cnes ? `(CNES: ${unit.cnes})` : ""}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {unit.phone || "Sem telefone"}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {unit.address?.streetName || "Endereço não cadastrado"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {unit.manager?.person?.fullName || "Não designado"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                        <Users className="h-4 w-4 text-gray-400" />
                        {unit._count.teams} eq.
                      </div>
                      <div className="text-sm text-gray-500">
                        ({unit._count.professionals} prof.)
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        unit.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {unit.isActive ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                </tr>
              ))}

              {units.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhuma unidade cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
