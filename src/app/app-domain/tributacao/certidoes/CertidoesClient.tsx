"use client";

import { useState } from "react";
import { Search, Plus, FileBadge, Trash2, XCircle } from "lucide-react";
import { createCertificate, cancelCertificate } from "./actions";

type Certificate = {
  id: string;
  certificateType: string;
  createdAt: Date;
  validUntil: Date;
  authCode: string;
  status: string;
  taxpayer: {
    id: string;
    person: { fullName: string; cpf: string } | null;
    company: { corporateName: string; cnpj: string } | null;
  };
};

type Taxpayer = {
  id: string;
  name: string;
};

export default function CertidoesClient({ 
  certificates,
  taxpayers
}: { 
  certificates: Certificate[];
  taxpayers: Taxpayer[];
}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    certificateType: "Negativa",
    taxpayerId: taxpayers[0]?.id || "",
    validUntil: ""
  });

  const handleCancel = async (id: string) => {
    if (confirm("Deseja revogar esta certidão?")) {
      await cancelCertificate(id);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.taxpayerId) {
      alert("Selecione um contribuinte válido.");
      return;
    }
    if (!createForm.validUntil) {
      alert("Informe a data de validade.");
      return;
    }
    try {
      await createCertificate(createForm);
      setIsCreateModalOpen(false);
      setCreateForm({ 
        certificateType: "Negativa", 
        taxpayerId: taxpayers[0]?.id || "",
        validUntil: ""
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar rascunho interno.");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileBadge className="w-6 h-6 text-sky-600" />
            Avaliações e Rascunhos de Certidão
          </h1>
          <p className="text-slate-500 mt-1">Registros internos sem validade jurídica ou emissão de certidão oficial.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Registrar rascunho
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por código de autenticação ou CPF/CNPJ..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600"
            />
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileBadge className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum rascunho registrado</h3>
            <p className="text-slate-500 mt-1">Use Operações Internas para avaliar a situação fiscal.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Código de Autenticação</th>
                  <th className="px-6 py-3">Contribuinte</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Emissão / Validade</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">
                      {cert.authCode}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {cert.taxpayer?.company?.corporateName || cert.taxpayer?.person?.fullName || "Não Informado"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {cert.certificateType}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div><span className="text-slate-400">Emi:</span> {new Date(cert.createdAt).toLocaleDateString('pt-BR')}</div>
                      <div><span className="text-slate-400">Val:</span> {new Date(cert.validUntil).toLocaleDateString('pt-BR')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        cert.status === 'Ativa' ? 'bg-sky-100 text-sky-700' :
                        cert.status === 'Vencida' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {cert.status === 'Ativa' && (
                        <button onClick={() => handleCancel(cert.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Revogar Certidão">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Registrar rascunho interno</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contribuinte</label>
                <select 
                  required
                  value={createForm.taxpayerId}
                  onChange={(e) => setCreateForm({...createForm, taxpayerId: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" 
                >
                  <option value="">Selecione um contribuinte...</option>
                  {taxpayers.map(tp => (
                    <option key={tp.id} value={tp.id}>{tp.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Certidão</label>
                  <select 
                    value={createForm.certificateType}
                    onChange={(e) => setCreateForm({...createForm, certificateType: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" 
                  >
                    <option value="Negativa">Negativa</option>
                    <option value="Positiva com Efeito de Negativa">Positiva com Efeito</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Validade</label>
                  <input 
                    type="date"
                    required
                    value={createForm.validUntil}
                    onChange={(e) => setCreateForm({...createForm, validUntil: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" 
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
