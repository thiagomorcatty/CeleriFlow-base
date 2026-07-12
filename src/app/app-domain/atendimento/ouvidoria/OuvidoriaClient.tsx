"use client";

import { useState } from "react";
import { Search, EyeOff, FileText, CheckCircle2, AlertCircle, X, ShieldAlert } from "lucide-react";
import { updateOmbudsmanStatus } from "../actions";

interface Ombudsman {
  id: string;
  protocolNumber: string;
  type: string;
  subject: string;
  description: string;
  isAnonymous: boolean;
  isConfidential: boolean;
  status: string;
  createdAt: Date;
  person: { fullName: string } | null;
}

export default function OuvidoriaClient({ initialManifestacoes }: { initialManifestacoes: Ombudsman[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [manifestacoes, setManifestacoes] = useState(initialManifestacoes);
  const [selectedItem, setSelectedItem] = useState<Ombudsman | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = manifestacoes.filter((man) => {
    const matchesSearch =
      man.protocolNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      man.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? man.type === filterType : true;
    return matchesSearch && matchesType;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id);
    const result = await updateOmbudsmanStatus(id, newStatus);
    if (result.success) {
      setManifestacoes((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
      if (selectedItem?.id === id) {
        setSelectedItem((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    } else {
      alert(result.error);
    }
    setLoadingId(null);
  };

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar manifestações..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 text-slate-600"
            >
              <option value="">Todos os Tipos</option>
              <option value="Denúncia">Denúncia</option>
              <option value="Reclamação">Reclamação</option>
              <option value="Elogio">Elogio</option>
              <option value="Sugestão">Sugestão</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileText className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhuma manifestação</h3>
            <p className="text-slate-500 mt-1">A ouvidoria não possui registros pendentes com esses filtros.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Protocolo</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Assunto</th>
                  <th className="px-6 py-3">Cidadão</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((man) => (
                  <tr key={man.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {man.protocolNumber}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        man.type === 'Denúncia' ? 'bg-red-100 text-red-700' :
                        man.type === 'Reclamação' ? 'bg-orange-100 text-orange-700' :
                        man.type === 'Elogio' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {man.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {man.subject}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {man.isAnonymous ? (
                        <span className="flex items-center gap-1 text-slate-500 italic">
                          <EyeOff className="w-3 h-3" /> Anônimo
                        </span>
                      ) : (
                        man.person?.fullName || "Não Identificado"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        man.status === 'Recebida' ? 'bg-slate-100 text-slate-700' :
                        man.status === 'Em Análise' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {man.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedItem(man)}
                        className="px-3 py-1.5 bg-white border border-slate-200 text-amber-700 hover:bg-amber-50 hover:border-amber-200 rounded-lg text-xs font-bold transition-all shadow-sm"
                      >
                        Analisar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Análise */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                Análise de Manifestação
              </h3>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Protocolo</p>
                  <p className="font-bold text-slate-900">{selectedItem.protocolNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Tipo</p>
                  <p className="font-medium text-slate-800">{selectedItem.type}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Status Atual</p>
                  <p className="font-medium text-slate-800">{selectedItem.status}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Solicitante</p>
                  <p className="font-medium text-slate-800 flex items-center gap-2">
                    {selectedItem.isAnonymous ? (
                      <><EyeOff className="w-4 h-4 text-slate-400" /> Sigilo / Anônimo</>
                    ) : (
                      selectedItem.person?.fullName || "Não informado"
                    )}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase">Assunto</p>
                <p className="text-sm font-bold text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  {selectedItem.subject}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase">Descrição Detalhada</p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap p-3 bg-slate-50 rounded-lg border border-slate-100 min-h-[100px]">
                  {selectedItem.description}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap gap-2 justify-end">
              {selectedItem.status === 'Recebida' && (
                <button
                  onClick={() => handleStatusChange(selectedItem.id, 'Em Análise')}
                  disabled={loadingId === selectedItem.id}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" /> Iniciar Análise
                </button>
              )}
              {selectedItem.status === 'Em Análise' && (
                <button
                  onClick={() => handleStatusChange(selectedItem.id, 'Concluída')}
                  disabled={loadingId === selectedItem.id}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Concluir e Arquivar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
