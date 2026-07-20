import React from "react";
import { Home, Calendar, MapPin, CheckCircle2, Clock, XCircle } from "lucide-react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function SocialVisitasPage() {
  const { prisma } = await getTenantContextForModule("SOCIAL");
  const visits = await prisma.socialVisit.findMany({
    include: {
      family: { include: { representative: true, address: true } },
      professional: { include: { person: true } },
    },
    orderBy: { scheduledDate: "asc" },
    take: 50
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Home className="h-8 w-8 text-teal-600" />
            Visitas Domiciliares
          </h1>
          <p className="text-gray-500 mt-2">
            Gestão, agendamento e registro das visitas técnicas da equipe.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Calendar className="h-5 w-5" />
          Agendar Visita
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Data Agendada</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Família e Endereço</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Técnico</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Objetivo / Motivo</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit) => (
                <tr key={visit.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {visit.scheduledDate.toLocaleDateString("pt-BR")}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {visit.family.representative.fullName}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {visit.family.address?.streetName || "Endereço não cadastrado"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {visit.professional.person?.fullName || visit.professional.name || "Técnico"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white line-clamp-2 max-w-xs">
                      {visit.objective}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                      visit.status === "Agendada" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                      visit.status === "Realizada" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {visit.status === "Realizada" && <CheckCircle2 className="h-3 w-3" />}
                      {visit.status === "Agendada" && <Clock className="h-3 w-3" />}
                      {(visit.status !== "Realizada" && visit.status !== "Agendada") && <XCircle className="h-3 w-3" />}
                      {visit.status}
                    </span>
                  </td>
                </tr>
              ))}

              {visits.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhuma visita domiciliar agendada.
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
