import React from "react";
import { Home, Plus, MapPin, Building, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

import { NewSocialUnitSheet } from "../components/NewSocialUnitSheet";

export default async function SocialUnidadesPage() {
  const units = await prisma.socialUnit.findMany({
    include: {
      address: true,
      manager: { include: { person: true } },
      _count: {
        select: { attendances: true, records: true }
      }
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Home className="h-8 w-8 text-orange-600" />
            Unidades Socioassistenciais
          </h1>
          <p className="text-gray-500 mt-2">
            Gestão dos equipamentos da rede de assistência (CRAS, CREAS, Centros de Convivência).
          </p>
        </div>
        <NewSocialUnitSheet />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Unidade</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Contato / Endereço</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Coordenador</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Atendimentos / Prontuários</th>
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
                      {unit.type}
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
                    <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>{unit._count.attendances} atendimentos</span>
                      <span>{unit._count.records} prontuários abertos</span>
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
