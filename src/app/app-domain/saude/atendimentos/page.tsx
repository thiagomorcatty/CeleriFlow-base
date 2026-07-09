import React from "react";
import { Stethoscope, Calendar, Clock, AlertTriangle, FileSignature } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AtendimentosPage() {
  const appointments = await prisma.healthAppointment.findMany({
    include: {
      patient: { include: { person: true } },
      unit: true,
      professional: { include: { employee: { include: { person: true } } } },
    },
    orderBy: { date: "desc" },
    take: 50
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Stethoscope className="h-8 w-8 text-emerald-600" />
            Atendimentos e Agenda
          </h1>
          <p className="text-gray-500 mt-2">
            Gestão de consultas agendadas, triagem clínica e controle de filas.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Calendar className="h-5 w-5" />
          Novo Agendamento
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Data e Hora</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Paciente</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Especialidade / Profissional</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Local</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Ações</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {appt.date.toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {appt.patient.person.fullName}
                    </div>
                    {appt.priority !== "Normal" && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                        <AlertTriangle className="h-3 w-3" />
                        {appt.priority}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {appt.specialty || "Clínico Geral"}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Dr(a). {appt.professional?.employee?.person?.fullName || "Não designado"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {appt.unit.name}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appt.status === "Agendado"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : appt.status === "Atendido"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium text-sm flex items-center gap-1">
                      <FileSignature className="h-4 w-4" />
                      Atender
                    </button>
                  </td>
                </tr>
              ))}

              {appointments.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Nenhum agendamento encontrado.
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
