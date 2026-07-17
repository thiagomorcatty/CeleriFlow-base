"use client";

import { useState } from "react";
import { Users, Search, Plus, List, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Comissao = {
  id: string;
  nome: string;
  sigla: string | null;
  tipo: string;
  descricao: string | null;
  status: string;
  membros: {
    cargo: string;
    vereador: {
      nomeParlamentar: string;
      partido: string | null;
    }
  }[];
};

export default function ComissoesClient({ comissoes }: { comissoes: Comissao[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = comissoes.filter(com => 
    com.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (com.sigla && com.sigla.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-8 flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500">Câmara Municipal</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Comissões</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-[#9333EA]" />
            Comissões Parlamentares
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-5 w-5" />
          Nova Comissão
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar comissão..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            <Filter className="h-4 w-4" />
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <List className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma comissão encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filtered.map((com) => (
              <Card key={com.id} className="overflow-hidden hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-white dark:bg-gray-800">{com.sigla || "COM"}</Badge>
                    <Badge 
                      className={
                        com.status === 'Ativa' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                        'bg-gray-100 text-gray-700 hover:bg-gray-100'
                      }
                    >
                      {com.status}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2" title={com.nome}>
                    {com.nome}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2" title={com.descricao || ""}>
                    {com.descricao || "Sem descrição"}
                  </p>
                  <div className="mt-3 text-xs font-medium text-gray-500">
                    Tipo: <span className="text-gray-700 dark:text-gray-300">{com.tipo}</span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" /> Membros ({com.membros.length})
                  </h4>
                  {com.membros.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">Nenhum membro designado.</p>
                  ) : (
                    <ul className="space-y-3">
                      {com.membros.map((m, idx) => (
                        <li key={idx} className="flex flex-col">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm text-gray-900 dark:text-white">{m.vereador.nomeParlamentar}</span>
                            <span className="text-xs text-gray-500 font-semibold">{m.vereador.partido}</span>
                          </div>
                          <span className="text-xs text-[#9333EA] font-medium">{m.cargo}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-6 flex justify-end">
                    <button className="text-sm font-medium text-[#9333EA] hover:text-[#7E22CE]">
                      Gerenciar Comissão
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
