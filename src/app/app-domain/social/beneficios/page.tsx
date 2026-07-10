import React from "react";
import { Package, Search, Gift, Heart, FileText, CheckCircle2, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

import { NewBenefitConcessionSheet } from "../components/NewBenefitConcessionSheet";

export default async function SocialBeneficiosPage() {
  const [concessions, programs] = await Promise.all([
    prisma.socialBenefitConcession.findMany({
      include: {
        benefit: true,
        family: { include: { representative: true } },
        professional: { include: { person: true } },
      },
      orderBy: { date: "desc" },
      take: 20
    }),
    prisma.socialProgram.findMany({
      include: {
        _count: { select: { participations: true } }
      },
      orderBy: { name: "asc" }
    })
  ]);

  const families = await prisma.socialFamily.findMany({
    include: { representative: { select: { fullName: true } } },
    orderBy: { representative: { fullName: "asc" } }
  });

  const benefits = await prisma.socialBenefit.findMany({
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
            <Package className="h-8 w-8 text-amber-600" />
            Benefícios e Programas
          </h1>
          <p className="text-gray-500 mt-2">
            Concessão de benefícios eventuais, cesta básica e gestão de programas sociais.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
            <Heart className="h-5 w-5 text-rose-500" />
            Novo Programa
          </button>
          <NewBenefitConcessionSheet families={families} benefits={benefits} professionals={professionals} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Lista de Concessões Recentes */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Gift className="h-5 w-5 text-amber-500" />
              Últimas Concessões
            </h2>
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar família..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/30 border-b border-gray-100 dark:border-gray-700">
                  <th className="p-4 text-sm font-medium text-gray-500">Data / Técnico</th>
                  <th className="p-4 text-sm font-medium text-gray-500">Benefício</th>
                  <th className="p-4 text-sm font-medium text-gray-500">Família</th>
                  <th className="p-4 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {concessions.map((conc) => (
                  <tr key={conc.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="p-4">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        {conc.date.toLocaleDateString("pt-BR")}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {conc.professional.person?.fullName || "Técnico"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {conc.benefit.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Qtd: {conc.quantity} {conc.value ? `- R$ ${conc.value}` : ""}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {conc.family.representative.fullName}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit ${
                        conc.status === "Concedido" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                        conc.status === "Entregue" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                        "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}>
                        {conc.status === "Entregue" && <CheckCircle2 className="h-3 w-3" />}
                        {conc.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {concessions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-sm text-gray-500">
                      Nenhuma concessão registrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Programas Sociais */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500" />
              Programas Ativos
            </h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
            {programs.map((prog) => (
              <div key={prog.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/30 hover:shadow-sm transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {prog.name}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    prog.sphere === "Municipal" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400" :
                    prog.sphere === "Estadual" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400" :
                    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                  }`}>
                    {prog.sphere}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {prog.description || "Sem descrição cadastrada."}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {prog._count.participations} famílias inscritas
                  </div>
                  <button className="text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium text-xs flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    Gerenciar
                  </button>
                </div>
              </div>
            ))}

            {programs.length === 0 && (
              <div className="text-center py-6 text-sm text-gray-500">
                Nenhum programa social cadastrado.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
