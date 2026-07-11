import React from "react";
import { prisma } from "@/lib/prisma";
import { ShieldAlert, Plus, Search } from "lucide-react";

export default async function OcorrenciasPage() {
  const ocorrencias = await prisma.segurancaOcorrencia.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-teal-600">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ocorrências</h1>
            <p className="text-gray-500 dark:text-gray-400">Atendimento de segurança, trânsito e defesa civil</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Plus className="h-4 w-4" />
          Nova Ocorrência
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar ocorrência..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Nº Ocorrência</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Bairro</th>
                <th className="px-6 py-4 font-medium">Prioridade</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ocorrencias.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma ocorrência encontrada.
                  </td>
                </tr>
              ) : (
                ocorrencias.map((ocorrencia) => (
                  <tr key={ocorrencia.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {ocorrencia.numero}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {ocorrencia.tipo}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {ocorrencia.bairro || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ocorrencia.prioridade === 'Alta' || ocorrencia.prioridade === 'Urgente' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {ocorrencia.prioridade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ocorrencia.status === 'Resolvida' || ocorrencia.status === 'Encerrada' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        ocorrencia.status === 'Em Atendimento' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {ocorrencia.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
