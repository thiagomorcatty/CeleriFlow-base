import React from "react";
import { Users, UserPlus, Search, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function PacientesPage() {
  const patients = await prisma.patient.findMany({
    include: {
      person: true,
      referenceUnit: true,
      _count: {
        select: { appointments: true, records: true }
      }
    },
    orderBy: { person: { fullName: "asc" } },
    take: 50
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            Pacientes
          </h1>
          <p className="text-gray-500 mt-2">
            Base unificada de cidadãos para controle clínico e acesso a serviços de saúde.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <UserPlus className="h-5 w-5" />
          Novo Paciente
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou Cartão SUS (CNS)..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Paciente</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">CNS / CPF</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Unidade de Referência</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Atendimentos</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Ações</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {patient.person.fullName}
                    </div>
                    {patient.knownAllergies && (
                      <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        Alergias Registradas
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white font-mono">
                      {patient.cns || "Sem CNS"}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{patient.person.cpf}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {patient.referenceUnit?.name || "Não definida"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>{patient._count.appointments} agendamentos</span>
                      <span>{patient._count.records} prontuários</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Acessar Prontuário
                    </button>
                  </td>
                </tr>
              ))}

              {patients.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhum paciente cadastrado.
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
