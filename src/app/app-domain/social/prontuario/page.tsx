import React from "react";
import { FileText, Search, Users, CalendarClock, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SocialProntuarioPage() {
  const families = await prisma.socialFamily.findMany({
    include: {
      representative: true,
      _count: {
        select: { records: true, attendances: true }
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
            <FileText className="h-8 w-8 text-indigo-600" />
            Prontuário Social
          </h1>
          <p className="text-gray-500 mt-2">
            Histórico técnico, acompanhamento familiar, pareceres sociais e evolução (SUAS).
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar família, nome do responsável ou código..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {families.map((family) => (
          <div key={family.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Família de {family.representative.fullName}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarClock className="h-4 w-4" />
                    {family._count.attendances} Atendimentos Registrados
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {family._count.records} Pareceres Sociais
                  </span>
                </div>
              </div>
            </div>
            <Link href={`/app-domain/social/prontuario/${family.id}`}>
              <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                Abrir Linha do Tempo
                <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        ))}

        {families.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            Nenhum prontuário encontrado. Crie uma família primeiro.
          </div>
        )}
      </div>
    </div>
  );
}
