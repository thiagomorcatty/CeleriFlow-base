"use client";

import { useState } from "react";
import { Search, Plus, FileText, Trash2, XCircle } from "lucide-react";
import { createInvoice, cancelInvoice } from "./actions";

type TaxpayerInfo = {
  id: string;
  person: { fullName: string; cpf: string } | null;
  company: { corporateName: string; cnpj: string } | null;
};

type Invoice = {
  id: string;
  invoiceNumber: number;
  verificationCode: string;
  serviceValue: number;
  competence: string;
  status: string;
  createdAt: Date;
  provider: TaxpayerInfo;
  taker: TaxpayerInfo | null;
};

type Taxpayer = {
  id: string;
  name: string;
};

export default function NfseClient({ 
  invoices,
  taxpayers
}: { 
  invoices: Invoice[];
  taxpayers: Taxpayer[];
}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    providerId: taxpayers[0]?.id || "",
    takerId: "",
    serviceValue: 0,
    competence: `${new Date().getMonth() + 1}`.padStart(2, '0') + "/" + new Date().getFullYear(),
  });

  const handleCancel = async (id: string) => {
    if (confirm("Deseja cancelar esta NFS-e? Esta ação não pode ser desfeita.")) {
      try {
        await cancelInvoice(id);
      } catch (e) {
        console.error(e);
        alert("Erro ao cancelar NFS-e.");
      }
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.providerId) {
      alert("Selecione um prestador válido.");
      return;
    }
    if (createForm.serviceValue <= 0) {
      alert("O valor do serviço deve ser maior que zero.");
      return;
    }
    try {
      await createInvoice(createForm);
      setIsCreateModalOpen(false);
      setCreateForm({ 
        providerId: taxpayers[0]?.id || "",
        takerId: "",
        serviceValue: 0,
        competence: `${new Date().getMonth() + 1}`.padStart(2, '0') + "/" + new Date().getFullYear(),
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
            <FileText className="w-6 h-6 text-blue-600" />
            Registros Internos de NFS-e
          </h1>
          <p className="text-slate-500 mt-1">Rascunhos internos sem validade fiscal, emissão municipal ou cálculo de ISS.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
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
              placeholder="Buscar por número da nota ou prestador..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>
        </div>

        {invoices.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileText className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum rascunho interno</h3>
            <p className="text-slate-500 mt-1">A emissão fiscal depende de adapter municipal contratado e regras validadas.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Nº NFS-e</th>
                  <th className="px-6 py-3">Emissão</th>
                  <th className="px-6 py-3">Prestador</th>
                  <th className="px-6 py-3">Tomador</th>
                  <th className="px-6 py-3">Competência</th>
                  <th className="px-6 py-3 text-right">Valor do Serviço</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono font-bold text-blue-600">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(inv.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {inv.provider?.company?.corporateName || inv.provider?.person?.fullName || "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {inv.taker?.company?.corporateName || inv.taker?.person?.fullName || "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {inv.competence}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inv.serviceValue)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        inv.status === 'Emitida' ? 'bg-blue-100 text-blue-700' :
                        inv.status === 'Cancelada' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {inv.status === 'Emitida' && (
                        <button onClick={() => handleCancel(inv.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Cancelar NFS-e">
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Prestador (Contribuinte)</label>
                <select 
                  required
                  value={createForm.providerId}
                  onChange={(e) => setCreateForm({...createForm, providerId: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                >
                  <option value="">Selecione o prestador...</option>
                  {taxpayers.map(tp => (
                    <option key={tp.id} value={tp.id}>{tp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tomador (Opcional)</label>
                <select 
                  value={createForm.takerId}
                  onChange={(e) => setCreateForm({...createForm, takerId: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                >
                  <option value="">Selecione o tomador (ou deixe em branco)...</option>
                  {taxpayers.map(tp => (
                    <option key={tp.id} value={tp.id}>{tp.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Competência</label>
                  <input 
                    type="text"
                    required
                    placeholder="MM/AAAA"
                    value={createForm.competence}
                    onChange={(e) => setCreateForm({...createForm, competence: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Valor do Serviço (R$)</label>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    value={createForm.serviceValue}
                    onChange={(e) => setCreateForm({...createForm, serviceValue: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
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
