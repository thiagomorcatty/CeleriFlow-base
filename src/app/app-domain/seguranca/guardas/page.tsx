import React from "react";
import { prisma } from "@/lib/prisma";
import { Users, Plus, Search } from "lucide-react";

export default async function GuardasPage() {
  const guardas = await prisma.segurancaGuarda.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg text-cyan-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agentes e Guardas</h1>
            <p className="text-gray-500 dark:text-gray-400">Efetivo da Guarda Municipal e Defesa Civil</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
          <Plus className="h-4 w-4" />
          Novo Agente
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar agente..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Matrícula</th>
                <th className="px-6 py-4 font-medium">Nome</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Equipe</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {guardas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    Nenhum agente encontrado.
                  </td>
                </tr>
              ) : (
                guardas.map((guarda) => (
                  <tr key={guarda.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {guarda.matricula}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {guarda.nome}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs">
                        {guarda.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {guarda.equipe || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        guarda.status === 'Ativo' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {guarda.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-cyan-600 hover:text-cyan-700 text-sm font-medium">
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
