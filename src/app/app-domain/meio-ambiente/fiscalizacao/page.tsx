import React from "react";
import { prisma } from "@/lib/prisma";
import { Search, MapPin } from "lucide-react";
import Link from "next/link";
import { NewInspectionSheet } from "../components/NewInspectionSheet";

export default async function FiscalizacaoPage() {
  const inspections = await prisma.envInspection.findMany({
    include: {
      enterprise: true
    },
    orderBy: { dateScheduled: 'desc' }
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
            <Link href="/app-domain/meio-ambiente" className="text-gray-500 hover:text-gray-700">Meio Ambiente</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Fiscalização e Vistorias</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="h-6 w-6 text-purple-600" />
            Fiscalização e Vistorias
          </h1>
        </div>
        <NewInspectionSheet enterprises={enterprises} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar vistoria..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {inspections.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma vistoria agendada.</p>
            <p className="text-sm">Clique em "Agendar Vistoria" para adicionar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Data Agendada</th>
                  <th className="px-6 py-3">Fiscal Responsável</th>
                  <th className="px-6 py-3">Empreendimento Vinculado</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Observações</th>
                </tr>
              </thead>
              <tbody>
                {inspections.map((insp) => (
                  <tr key={insp.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {insp.dateScheduled ? new Date(insp.dateScheduled).toLocaleString('pt-BR') : '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{insp.inspector}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {insp.enterprise ? insp.enterprise.name : 'Nenhum'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${insp.status === 'Realizada' ? 'bg-green-100 text-green-700' : 
                          insp.status === 'Cancelada' ? 'bg-red-100 text-red-700' : 
                          'bg-blue-100 text-blue-700'}`}>
                        {insp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={insp.notes || ''}>
                      {insp.notes || '-'}
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
