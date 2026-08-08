"use client";

import { useState } from "react";
import { Calendar, Search, Plus, Filter, FileText, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Sessao = {
  id: string;
  numero: number;
  tipo: string;
  data: Date;
  local: string | null;
  status: string;
  quorum: number | null;
  proposicoes: {
    numero: string;
    tipo: string;
    ementa: string;
    status: string;
  }[];
  atas: {
    numero: string;
    status: string;
    dataAprovacao: Date | null;
  }[];
};

export default function SessoesClient({ sessoes }: { sessoes: Sessao[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"sessoes" | "pautas" | "atas">("sessoes");

  const filtered = sessoes.filter(s => 
    s.numero.toString().includes(searchTerm) || 
    (s.tipo && s.tipo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-8 flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500">Câmara Municipal</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Sessões Plenárias</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-[#9333EA]" />
            Sessões Plenárias
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-5 w-5" />
          Nova Sessão
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab("sessoes")}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === "sessoes" ? "text-[#9333EA]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sessões
          {activeTab === "sessoes" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9333EA] rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("pautas")}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === "pautas" ? "text-[#9333EA]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Pautas (Ordem do Dia)
          {activeTab === "pautas" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9333EA] rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("atas")}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === "atas" ? "text-[#9333EA]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Atas
          {activeTab === "atas" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9333EA] rounded-t-full" />
          )}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar sessão..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            <Filter className="h-4 w-4" />
          </button>
        </div>

        {activeTab === "sessoes" && (
          filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhuma sessão encontrada.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3">Número / Tipo</th>
                    <th className="px-6 py-3">Data e Hora</th>
                    <th className="px-6 py-3">Local</th>
                    <th className="px-6 py-3 text-center">Quórum</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 dark:text-white">{s.numero}ª Sessão</div>
                        <div className="text-xs text-gray-500">{s.tipo}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{format(new Date(s.data), "dd/MM/yyyy")}</div>
                        <div className="text-xs text-gray-500">{format(new Date(s.data), "HH:mm")}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {s.local || "Plenário"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {s.quorum ? (
                          <Badge variant="outline" className="bg-gray-50">{s.quorum} presenças</Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={
                            s.status === 'Encerrada' ? 'bg-gray-100 text-gray-700 hover:bg-gray-100' : 
                            s.status === 'Em Andamento' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                            'bg-blue-100 text-blue-700 hover:bg-blue-100'
                          }
                        >
                          {s.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#9333EA] hover:text-[#7E22CE] font-medium text-sm">
                          Gerenciar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {activeTab === "pautas" && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ordem do Dia por Sessão</h3>
            <div className="space-y-6">
              {filtered.map(s => (
                <div key={s.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{s.numero}ª Sessão {s.tipo}</h4>
                      <p className="text-xs text-gray-500">{format(new Date(s.data), "dd/MM/yyyy 'às' HH:mm")}</p>
                    </div>
                    <Badge variant="outline">{s.proposicoes.length} Matérias</Badge>
                  </div>
                  <div className="p-0">
                    {s.proposicoes.length === 0 ? (
                      <p className="p-4 text-sm text-gray-500 italic">Nenhuma matéria pautada para esta sessão.</p>
                    ) : (
                      <table className="w-full text-sm">
                        <tbody>
                          {s.proposicoes.map((prop, idx) => (
                            <tr key={idx} className="border-b last:border-0 border-gray-100 dark:border-gray-800">
                              <td className="p-4 w-1/4">
                                <span className="font-medium text-gray-900 dark:text-white">{prop.numero}</span>
                                <br />
                                <span className="text-xs text-gray-500">{prop.tipo}</span>
                              </td>
                              <td className="p-4 text-gray-600 line-clamp-2" title={prop.ementa}>{prop.ementa}</td>
                              <td className="p-4 w-32 text-right">
                                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">{prop.status}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "atas" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.flatMap(s => s.atas.map((ata, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-[#9333EA] rounded-lg">
                        <FileText className="h-5 w-5" />
                      </div>
                      <Badge 
                        className={
                          ata.status === 'Publicada' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                          ata.status === 'Aprovada' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : 
                          'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                        }
                      >
                        {ata.status}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{ata.numero}</h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Ref: {s.numero}ª Sessão {s.tipo} ({format(new Date(s.data), "dd/MM/yyyy")})
                    </p>
                    
                    {ata.dataAprovacao && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        Aprovada em: {format(new Date(ata.dataAprovacao), "dd/MM/yyyy")}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                      <button className="text-xs font-medium text-gray-500 hover:text-gray-700">Visualizar</button>
                      <button className="text-xs font-medium text-[#9333EA] hover:text-[#7E22CE]">Editar</button>
                    </div>
                  </CardContent>
                </Card>
              )))}
            </div>
            {filtered.flatMap(s => s.atas).length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhuma ata registrada nas sessões listadas.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
