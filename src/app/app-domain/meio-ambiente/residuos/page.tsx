import React from "react";
import { prisma } from "@/lib/prisma";
import { Trash2, Search } from "lucide-react";
import Link from "next/link";
import { NewWasteSheet } from "../components/NewWasteSheet";

import { QuickFilters } from "../components/QuickFilters";
import { ActionButtons } from "../components/ActionButtons";

export const dynamic = "force-dynamic";

export default async function ResiduosPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined } }) {
  const searchParams = await Promise.resolve(props.searchParams || {});
  
  const where: any = {};
  if (searchParams.tipo) where.wasteType = { contains: searchParams.tipo, mode: 'insensitive' };

  const wastes = await prisma.envWaste.findMany({
    where,
    include: {
      enterprise: true
    },
    orderBy: { date: 'desc' }
  });

  const enterprises = await prisma.envEnterprise.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/meio-ambiente" className="text-gray-500 hover:text-gray-700">Meio Ambiente</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Controle de Resíduos</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trash2 className="h-6 w-6 text-green-600" />
            Controle de Resíduos
          </h1>
        </div>
        <NewWasteSheet enterprises={enterprises} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar registros..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <QuickFilters filters={[
            { name: "tipo", label: "Tipo", options: [{ value: "Sólido", label: "Sólido" }, { value: "Líquido", label: "Líquido" }, { value: "Perigoso", label: "Perigoso" }, { value: "Reciclável", label: "Reciclável" }] }
          ]} />
        </div>

        {wastes.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Trash2 className="h-12 w-12 mx-auto mb-4 text-gray-300 animate-bounce" />
            <p>Nenhum registro de resíduo encontrado.</p>
            <p className="text-sm">Clique em "Registrar Resíduo" para adicionar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Gerador / Empresa</th>
                  <th className="px-6 py-3">Tipo de Resíduo</th>
                  <th className="px-6 py-3">Quantidade (Kg)</th>
                  <th className="px-6 py-3">Destinação Final</th>
                  <th className="px-6 py-3">Data Registro</th>
                  <th className="px-6 py-3">Detalhes</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {wastes.map((w) => (
                  <tr key={w.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {w.generatorName}
                      {w.enterprise && (
                        <span className="block text-xs font-semibold text-green-600 dark:text-green-400">Visto no sistema</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{w.wasteType}</td>
                    <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-350">
                      {w.quantityKg.toLocaleString('pt-BR')} Kg
                    </td>
                    <td className="px-6 py-4 text-gray-500">{w.destination}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(w.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs italic truncate max-w-xs" title={w.notes || ""}>
                      {w.notes || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionButtons />
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
