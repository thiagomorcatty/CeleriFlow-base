import React from "react";
import { ClipboardList, Calendar, Clock, AlertTriangle, ShieldAlert } from "lucide-react";
import { prisma } from "@/lib/prisma";

import { NewAttendanceSheet } from "../components/NewAttendanceSheet";

export default async function SocialAtendimentosPage() {
  const attendances = await prisma.socialAttendance.findMany({
    include: {
      family: { include: { representative: true } },
      person: true,
      unit: true,
      professional: { include: { person: true } },
    },
    orderBy: { date: "desc" },
    take: 50
  });

  const families = await prisma.socialFamily.findMany({
    include: { representative: { select: { fullName: true } } },
    orderBy: { representative: { fullName: "asc" } }
  });

  const units = await prisma.socialUnit.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" }
  });

  const professionals = await prisma.employee.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" }
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-emerald-600" />
            Atendimentos e Acompanhamentos
          </h1>
          <p className="text-gray-500 mt-2">
            Registro de acolhimento, PAIF, PAEFI e atendimentos técnicos (Psicologia / Serviço Social).
          </p>
        </div>
        <NewAttendanceSheet families={families} units={units} professionals={professionals} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Data e Hora</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Família / Indivíduo</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Tipo de Atendimento</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Unidade e Técnico</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Sigilo</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((att) => (
                <tr key={att.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {att.date.toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      Família de {att.family.representative.fullName}
                    </div>
                    {att.person && (
                      <div className="text-sm text-gray-500 mt-1">
                        Foco: {att.person.fullName}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {att.type}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                      {att.description}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {att.unit.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {att.professional.person?.fullName || "Sem técnico designado"}
                    </div>
                  </td>
                  <td className="p-4">
                    {att.secrecyLevel === "Normal" ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">
                        Normal
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 flex items-center w-fit gap-1">
                        <ShieldAlert className="h-3 w-3" />
                        {att.secrecyLevel}
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {attendances.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhum atendimento registrado.
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
