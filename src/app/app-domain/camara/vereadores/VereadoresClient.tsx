"use client";

import { useState } from "react";
import { Users, Search, Plus, Filter, Phone, Mail, Building, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Vereador = {
  id: string;
  nomeCompleto: string;
  nomeParlamentar: string;
  partido: string | null;
  email: string | null;
  telefone: string | null;
  status: string;
  gabinete: { sala: string; andar: string | null; telefone: string | null; ramal: string | null } | null;
  cargosMesa: { cargo: string; status: string }[];
  legislatura: { numero: number };
};

export default function VereadoresClient({ vereadores }: { vereadores: Vereador[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"vereadores" | "mesa" | "gabinetes">("vereadores");

  const filtered = vereadores.filter(ver => 
    ver.nomeParlamentar.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (ver.partido && ver.partido.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const mesaDiretora = vereadores
    .flatMap(v => v.cargosMesa.map(cargo => ({ ...v, cargoInfo: cargo })))
    .filter(v => v.cargoInfo.status === "Ativo");

  return (
    <div className="p-6 md:p-8 flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500">Câmara Municipal</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Parlamentares</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-[#9333EA]" />
            Parlamentares
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-5 w-5" />
          Novo Vereador
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab("vereadores")}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === "vereadores" ? "text-[#9333EA]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Vereadores
          {activeTab === "vereadores" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9333EA] rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("mesa")}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === "mesa" ? "text-[#9333EA]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Mesa Diretora
          {activeTab === "mesa" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9333EA] rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("gabinetes")}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === "gabinetes" ? "text-[#9333EA]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Gabinetes
          {activeTab === "gabinetes" && (
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
              placeholder="Buscar parlamentar..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            <Filter className="h-4 w-4" />
          </button>
        </div>

        {activeTab === "vereadores" && (
          filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum parlamentar encontrado.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3">Nome Parlamentar</th>
                    <th className="px-6 py-3">Partido</th>
                    <th className="px-6 py-3">Contato</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((ver) => (
                    <tr key={ver.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-white">{ver.nomeParlamentar}</div>
                        <div className="text-xs text-gray-500">{ver.nomeCompleto}</div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-600">
                        {ver.partido || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs text-gray-500">
                          {ver.telefone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {ver.telefone}</span>}
                          {ver.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {ver.email}</span>}
                          {!ver.telefone && !ver.email && "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={
                            ver.status === 'Em Exercício' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                            ver.status === 'Licenciado' || ver.status === 'Afastado' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : 
                            'bg-gray-100 text-gray-700 hover:bg-gray-100'
                          }
                        >
                          {ver.status}
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
          )
        )}

        {activeTab === "mesa" && (
          mesaDiretora.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Mesa Diretora não configurada para a legislatura atual.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3">Cargo na Mesa</th>
                    <th className="px-6 py-3">Vereador</th>
                    <th className="px-6 py-3">Partido</th>
                    <th className="px-6 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mesaDiretora.map((m, i) => (
                    <tr key={i} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {m.cargoInfo.cargo}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{m.nomeParlamentar}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-semibold">
                        {m.partido}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#9333EA] hover:text-[#7E22CE] font-medium text-sm">
                          Alterar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {activeTab === "gabinetes" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Vereador</th>
                  <th className="px-6 py-3">Sala / Andar</th>
                  <th className="px-6 py-3">Telefone do Gabinete</th>
                  <th className="px-6 py-3">Ramal</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ver) => (
                  <tr key={ver.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {ver.nomeParlamentar}
                    </td>
                    <td className="px-6 py-4">
                      {ver.gabinete ? (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Building className="h-4 w-4 text-gray-400" />
                          Sala {ver.gabinete.sala} {ver.gabinete.andar && `- ${ver.gabinete.andar}`}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Não alocado</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {ver.gabinete?.telefone || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {ver.gabinete?.ramal || "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#9333EA] hover:text-[#7E22CE] font-medium text-sm">
                        {ver.gabinete ? "Editar" : "Alocar"}
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
