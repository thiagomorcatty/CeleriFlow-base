import React from "react";
import { Users, UserPlus, Search, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AlunosPage() {
  const students = await prisma.student.findMany({
    include: {
      person: true,
      enrollments: {
        include: { school: true, schoolClass: true },
        where: { status: "Matriculado" }
      }
    },
    orderBy: { person: { fullName: "asc" } },
    take: 50 // Limit to 50 for the MVP view
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            Alunos e Matrículas
          </h1>
          <p className="text-gray-500 mt-2">
            Gestão do corpo discente, matrículas, histórico e responsáveis.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
            <FileText className="h-5 w-5" />
            Pré-Matrículas
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <UserPlus className="h-5 w-5" />
            Novo Aluno
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou código da matrícula..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Aluno</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Código / CPF</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Escola Atual</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Turma</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const activeEnrollment = student.enrollments[0];
                return (
                  <tr key={student.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {student.person.fullName}
                      </div>
                      {student.specialNeeds && (
                        <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          Necessidades Especiais
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900 dark:text-white">{student.studentCode}</div>
                      <div className="text-sm text-gray-500 mt-1">{student.person.cpf}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {activeEnrollment ? activeEnrollment.school.name : "Sem matrícula ativa"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {activeEnrollment?.schoolClass ? activeEnrollment.schoolClass.name : "-"}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.status === "Ativo"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {students.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhum aluno cadastrado.
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
