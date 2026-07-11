import React from "react";
import { prisma } from "@/lib/prisma";
import { CarFront, Plus, Search } from "lucide-react";

export default async function InfracoesPage() {
  const infracoes = await prisma.segurancaInfracao.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
            <CarFront className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Autos de Infração</h1>
            <p className="text-gray-500 dark:text-gray-400">Controle de infrações de trânsito e mobilidade</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors">
          <Plus className="h-4 w-4" />
          Novo Auto
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar auto de infração..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Nº Auto</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium">Placa</th>
                <th className="px-6 py-4 font-medium">Tipo da Infração</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {infracoes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma infração encontrada.
                  </td>
                </tr>
              ) : (
                infracoes.map((infracao) => (
                  <tr key={infracao.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {infracao.auto}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {new Date(infracao.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-700 dark:text-gray-300">
                      {infracao.placa}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {infracao.tipo}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        infracao.status === 'Pago' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        infracao.status === 'Cancelado' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {infracao.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-600 hover:text-slate-800 dark:hover:text-slate-400 text-sm font-medium">
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
