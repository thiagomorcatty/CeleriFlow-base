"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Landmark, Search, Plus, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Legislatura = {
  id: string;
  numero: number;
  inicio: Date;
  fim: Date;
  status: string;
  descricao: string | null;
  _count: { vereadores: number };
};

export default function LegislaturasClient({ legislaturas }: { legislaturas: Legislatura[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = legislaturas.filter(leg => 
    leg.numero.toString().includes(searchTerm) || 
    (leg.descricao && leg.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-8 flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500">Câmara Municipal</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Legislaturas</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Landmark className="h-6 w-6 text-[#9333EA]" />
            Legislaturas
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-5 w-5" />
          Nova Legislatura
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar legislatura..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Landmark className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma legislatura encontrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Número</th>
                  <th className="px-6 py-3">Período</th>
                  <th className="px-6 py-3">Descrição</th>
                  <th className="px-6 py-3 text-center">Vereadores</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((leg) => (
                  <tr key={leg.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {leg.numero}ª Legislatura
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{format(new Date(leg.inicio), 'yyyy')} - {format(new Date(leg.fim), 'yyyy')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {leg.descricao || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="outline" className="bg-gray-50">
                        {leg._count.vereadores}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        className={
                          leg.status === 'Ativa' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                          leg.status === 'Encerrada' ? 'bg-gray-100 text-gray-700 hover:bg-gray-100' : 
                          'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                        }
                      >
                        {leg.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#9333EA] hover:text-[#7E22CE] font-medium text-sm">
                        Editar
                      </button>
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
