"use client";

import { useState } from "react";
import Link from "next/link";
import { Archive, Search } from "lucide-react";

type Processo = {
  id: string;
  protocolNumber: string;
  status: string;
  updatedAt: Date;
  processType: { name: string };
  subject: { name: string };
  person: { fullName: string } | null;
  company: { corporateName: string } | null;
};

export default function ArquivadosClient({ initialProcessos }: { initialProcessos: Processo[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProcessos = initialProcessos.filter(p => {
    const term = searchTerm.toLowerCase();
    const interessado = (p.person?.fullName || p.company?.corporateName || "").toLowerCase();
    return (
      p.protocolNumber.toLowerCase().includes(term) ||
      interessado.includes(term) ||
      p.processType.name.toLowerCase().includes(term) ||
      p.subject.name.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Archive className="w-6 h-6 text-emerald-600" />
            Processos Arquivados
          </h1>
          <p className="text-slate-500 mt-1">Consulte os processos finalizados e arquivados pelo seu setor.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar nos arquivos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>
        </div>
        
        {filteredProcessos.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Archive className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum processo arquivado</h3>
            <p className="text-slate-500 mt-1">Os processos finalizados e movidos para o arquivo aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Nº Protocolo</th>
                  <th className="px-6 py-3">Tipo / Assunto</th>
                  <th className="px-6 py-3">Interessado</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Data de Arquivamento</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProcessos.map((processo) => {
                  const interessadoNome = processo.person?.fullName || processo.company?.corporateName || "Não Informado";
                  
                  return (
                    <tr key={processo.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {processo.protocolNumber}
                      </td>
                      <td className="px-6 py-4">
                        <span className="block font-medium text-slate-800">{processo.processType.name}</span>
                        <span className="block text-xs text-slate-500 mt-0.5">{processo.subject.name}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {interessadoNome}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">
                          {processo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(processo.updatedAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/protocolos/processos/${processo.id}`} className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold">
                          Visualizar
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
