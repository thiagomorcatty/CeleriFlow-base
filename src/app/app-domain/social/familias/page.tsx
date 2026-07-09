import React from "react";
import { Users, Search, MapPin, UserPlus, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function SocialFamiliasPage() {
  const families = await prisma.socialFamily.findMany({
    include: {
      representative: true,
      address: true,
      _count: {
        select: { members: true, attendances: true, concessions: true }
      }
    },
    orderBy: { representative: { fullName: "asc" } },
    take: 50
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            Famílias Assistidas
          </h1>
          <p className="text-gray-500 mt-2">
            Base unificada de acompanhamento familiar, composição e Cadastro Único (CadÚnico).
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <UserPlus className="h-5 w-5" />
          Nova Família
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome do responsável, CPF ou NIS..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Responsável Familiar</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">NIS / Cód. Familiar</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Endereço / Renda</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Composição / Ações</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Prontuário</th>
              </tr>
            </thead>
            <tbody>
              {families.map((family) => (
                <tr key={family.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      {family.representative.fullName}
                    </div>
                    {family.vulnerabilities && (
                      <div className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-1 truncate max-w-xs">
                        Atenção: {family.vulnerabilities}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-mono text-gray-900 dark:text-white">
                      NIS: {family.nis || "Não informado"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Cód: {family.familyCode || "Sem código"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {family.address?.streetName || "Sem endereço"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-medium">
                      Renda Per Capita: {family.perCapitaIncome ? `R$ ${family.perCapitaIncome.toFixed(2)}` : "Não informada"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>{family._count.members + 1} pessoas no núcleo</span>
                      <span>{family._count.concessions} benefícios recebidos</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Abrir Prontuário
                    </button>
                  </td>
                </tr>
              ))}

              {families.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhuma família cadastrada.
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
