import React from "react";
import { School, MapPin, Users, Building, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EscolasPage() {
  const schools = await prisma.school.findMany({
    include: {
      director: { include: { person: true } },
      _count: {
        select: { classes: true, enrollments: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <School className="h-8 w-8 text-indigo-600" />
            Escolas
          </h1>
          <p className="text-gray-500 mt-2">
            Gestão da infraestrutura educacional e unidades de ensino.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-5 w-5" />
          Nova Escola
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Escola / INEP</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Direção</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Capacidade / Turmas</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Alunos Matriculados</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      {school.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">INEP: {school.inepCode || "N/A"}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {school.director?.person?.fullName || "Não designado"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {school.capacity} vagas totais
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {school._count.classes} turmas ativas
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {school._count.enrollments}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        school.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {school.isActive ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                </tr>
              ))}

              {schools.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhuma escola cadastrada no momento.
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
