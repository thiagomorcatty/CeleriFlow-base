"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileBox, Search, Plus, FileText } from "lucide-react";
import { receiveProcess } from "../actions";

type Processo = {
  id: string;
  protocolNumber: string;
  status: string;
  createdAt: Date;
  processType: { name: string };
  subject: { name: string };
  person: { fullName: string } | null;
  company: { corporateName: string } | null;
};

export default function ProcessosClient({ initialProcessos, canReceive, canCreate }: { initialProcessos: Processo[]; canReceive: boolean; canCreate: boolean }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredProcessos = initialProcessos.filter(p => {
    const term = searchTerm.toLowerCase();
    const interessado = (p.person?.fullName || p.company?.corporateName || "").toLowerCase();
    const matchesSearch = 
      p.protocolNumber.toLowerCase().includes(term) ||
      interessado.includes(term) ||
      p.processType.name.toLowerCase().includes(term) ||
      p.subject.name.toLowerCase().includes(term);
      
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    
    // Na Caixa do Setor, por padrão não mostramos Arquivados a menos que filtrado
    const isArquivado = p.status === 'Arquivado';
    
    if (!statusFilter && isArquivado) return false;
    
    return matchesSearch && matchesStatus;
  });

  async function handleReceive(processId: string) {
    const result = await receiveProcess(processId);
    if (result.error) {
      alert(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileBox className="w-6 h-6 text-emerald-600" />
            Caixa do Setor
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os processos e protocolos que estão sob responsabilidade do seu setor.</p>
        </div>
        {canCreate && <Link href="/protocolos/processos/novo" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Protocolo
        </Link>}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por Número, Assunto ou Interessado..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-slate-600"
            >
              <option value="">Status Ativos</option>
              <option value="Aguardando Recebimento">Aguardando Recebimento</option>
              <option value="Recebido">Recebido</option>
              <option value="Em Analise">Em Analise</option>
              <option value="Concluído">Concluído</option>
              <option value="Arquivado">Arquivado</option>
            </select>
          </div>
        </div>

        {filteredProcessos.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileText className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum processo na caixa</h3>
            <p className="text-slate-500 mt-1">A caixa do seu setor está vazia. Novos processos encaminhados aparecerão aqui.</p>
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
                  <th className="px-6 py-3">Abertura</th>
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
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          processo.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' :
                          processo.status === 'Aguardando Recebimento' ? 'bg-blue-100 text-blue-700' :
                          processo.status === 'Arquivado' ? 'bg-slate-100 text-slate-600' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {processo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(processo.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-4">
                          <Link href={`/protocolos/processos/${processo.id}`} className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold">
                            Visualizar
                          </Link>
                          {canReceive && processo.status === "Aguardando Recebimento" && (
                            <button onClick={() => handleReceive(processo.id)} className="text-sm font-semibold text-blue-700 hover:text-blue-900">
                              Receber
                            </button>
                          )}
                        </div>
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
