import React from "react";
import { prisma } from "@/lib/prisma";
import { Droplets, Search } from "lucide-react";
import Link from "next/link";
import { NewUnitSheet } from "../components/NewUnitSheet";

export default async function UnidadesPage() {
  const units = await prisma.sanConsumerUnit.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/saneamento" className="text-gray-500 hover:text-gray-700">Água e Saneamento</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Unidades Consumidoras</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Droplets className="h-6 w-6 text-[#0284C7]" />
            Unidades Consumidoras
          </h1>
        </div>
        <NewUnitSheet />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar unidade..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            />
          </div>
        </div>

        {units.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Droplets className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma unidade consumidora cadastrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Código</th>
                  <th className="px-6 py-3">Endereço</th>
                  <th className="px-6 py-3">Titular</th>
                  <th className="px-6 py-3">Categoria</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit) => (
                  <tr key={unit.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {unit.code}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{unit.address}</td>
                    <td className="px-6 py-4 text-gray-500">{unit.ownerName || '-'}</td>
                    <td className="px-6 py-4 text-gray-500">{unit.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${unit.status === 'Ativa' ? 'bg-green-100 text-green-700' : 
                          unit.status === 'Cortada' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'}`}>
                        {unit.status}
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
