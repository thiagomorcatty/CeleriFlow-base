import React from "react";
import { BookOpen, Users, ClipboardCheck, Plus, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function TurmasPage() {
  const classes = await prisma.schoolClass.findMany({
    include: {
      school: true,
      teacher: { include: { employee: { include: { person: true } } } },
      _count: {
        select: { enrollments: true, diaries: true }
      }
    },
    orderBy: { year: "desc" },
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-emerald-600" />
            Turmas e Diários
          </h1>
          <p className="text-gray-500 mt-2">
            Controle de turmas, professores vinculados e diários de classe.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-5 w-5" />
          Nova Turma
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Turma / Etapa</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Escola</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Professor Regente</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Alunos</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Diários</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {cls.name} ({cls.year})
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{cls.stage} - {cls.grade}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">{cls.school.name}</div>
                    <div className="text-sm text-gray-500 mt-1">Turno: {cls.shift}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {cls.teacher?.employee?.person?.fullName || "Não definido"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {cls._count.enrollments} / {cls.capacity}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {cls._count.diaries}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cls.status === "Aberta"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}
                    >
                      {cls.status}
                    </span>
                  </td>
                </tr>
              ))}

              {classes.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Nenhuma turma cadastrada.
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
