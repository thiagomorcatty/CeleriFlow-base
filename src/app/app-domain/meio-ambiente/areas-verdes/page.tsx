import React from "react";
import { prisma } from "@/lib/prisma";
import { Sprout, Search } from "lucide-react";
import Link from "next/link";
import { NewGreenAreaSheet } from "../components/NewGreenAreaSheet";

export const dynamic = "force-dynamic";

export default async function AreasVerdesPage() {
  const greenAreas = await prisma.envGreenArea.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/meio-ambiente" className="text-gray-500 hover:text-gray-700">Meio Ambiente</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Áreas Verdes</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sprout className="h-6 w-6 text-green-600" />
            Áreas Verdes e Preservação
          </h1>
        </div>
        <NewGreenAreaSheet />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar área verde..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {greenAreas.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Sprout className="h-12 w-12 mx-auto mb-4 text-gray-300 animate-bounce" />
            <p>Nenhuma área verde cadastrada.</p>
            <p className="text-sm">Clique em "Nova Área Verde" para adicionar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Nome da Área</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Tamanho (m²)</th>
                  <th className="px-6 py-3">Localização</th>
                  <th className="px-6 py-3">Conservação</th>
                </tr>
              </thead>
              <tbody>
                {greenAreas.map((area) => (
                  <tr key={area.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {area.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{area.areaType}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {area.sizeSqm ? area.sizeSqm.toLocaleString('pt-BR') : '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{area.location || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${area.status === 'Preservado' ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' : 
                          area.status === 'Em Recuperação' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' : 
                          area.status === 'Degradado' ? 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400' : 
                          'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'}`}>
                        {area.status}
                      </span>
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
