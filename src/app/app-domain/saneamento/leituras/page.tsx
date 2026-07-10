import React from "react";
import { prisma } from "@/lib/prisma";
import { FileText, Search } from "lucide-react";
import Link from "next/link";
import { NewReadingSheet } from "../components/NewReadingSheet";

export default async function LeiturasPage() {
  const [readings, units] = await Promise.all([
    prisma.sanMeterReading.findMany({
      include: { unit: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.sanConsumerUnit.findMany({
      where: { status: "Ativa" },
      select: { id: true, code: true, address: true }
    })
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/app-domain/saneamento" className="text-gray-500 hover:text-gray-700">Água e Saneamento</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Leituras e Consumo</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#0284C7]" />
            Leituras e Consumo
          </h1>
        </div>
        <NewReadingSheet units={units} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar leitura..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            />
          </div>
        </div>

        {readings.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma leitura registrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Unidade</th>
                  <th className="px-6 py-3">Competência</th>
                  <th className="px-6 py-3">Leitura Ant.</th>
                  <th className="px-6 py-3">Leitura Atual</th>
                  <th className="px-6 py-3">Consumo (m³)</th>
                  <th className="px-6 py-3">Leiturista</th>
                </tr>
              </thead>
              <tbody>
                {readings.map((reading) => (
                  <tr key={reading.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {reading.unit.code}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{reading.competence}</td>
                    <td className="px-6 py-4 text-gray-500">{reading.previousValue}</td>
                    <td className="px-6 py-4 text-gray-500">{reading.currentValue}</td>
                    <td className="px-6 py-4 font-semibold text-[#0284C7]">{reading.consumption}</td>
                    <td className="px-6 py-4 text-gray-500">{reading.readerName || '-'}</td>
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
