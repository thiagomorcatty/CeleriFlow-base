import React from "react";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";
import { GraduationCap, Search } from "lucide-react";
import Link from "next/link";
import { NewEduProgramSheet } from "../components/NewEduProgramSheet";
import { QuickFilters } from "../components/QuickFilters";
import { EduProgramRowActions } from "../components/EduProgramRowActions";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function EducacaoAmbientalPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined } }) {
  const { prisma } = await getTenantContextForModule("MEIO_AMBIENTE");
  const searchParams = await Promise.resolve(props.searchParams || {});
  const where: Prisma.EnvEduProgramWhereInput = {};
  if (searchParams.status) where.status = searchParams.status;

  const programs = await prisma.envEduProgram.findMany({ where, orderBy: { startDate: "desc" } });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/meio-ambiente" className="text-gray-500 hover:text-gray-700">Meio Ambiente</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Educacao Ambiental</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-green-600" />
            Educacao Ambiental
          </h1>
        </div>
        <NewEduProgramSheet />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Buscar campanhas..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <QuickFilters filters={[
            { name: "status", label: "Status", options: [{ value: "Planejado", label: "Planejado" }, { value: "Em Execucao", label: "Em Execucao" }, { value: "Concluido", label: "Concluido" }, { value: "Cancelado", label: "Cancelado" }] }
          ]} />
        </div>
        {programs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300 animate-bounce" />
            <p>Nenhuma acao educativa registrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Titulo da Acao</th>
                  <th className="px-6 py-3">Publico-Alvo</th>
                  <th className="px-6 py-3">Inicio / Fim</th>
                  <th className="px-6 py-3">Participantes</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((prog) => (
                  <tr key={prog.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{prog.title}</td>
                    <td className="px-6 py-4 text-gray-500">{prog.targetAudience || "-"}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(prog.startDate).toLocaleDateString("pt-BR")}
                      {prog.endDate && ` a ${new Date(prog.endDate).toLocaleDateString("pt-BR")}`}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700">{prog.participantsCount ? prog.participantsCount.toLocaleString("pt-BR") : "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${prog.status === "Concluido" ? "bg-green-100 text-green-700" : prog.status === "Em Execucao" ? "bg-blue-100 text-blue-700" : prog.status === "Cancelado" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                        {prog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <EduProgramRowActions program={prog} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
