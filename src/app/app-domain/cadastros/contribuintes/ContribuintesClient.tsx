"use client";

import { useState } from "react";
import { FileText, Pencil, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { updateTaxpayer, deactivateTaxpayer, activateTaxpayer } from "../actions";

type Taxpayer = {
  id: string;
  taxpayerType: string;
  municipalInsc: string | null;
  status: string;
  person: { fullName: string; cpf: string } | null;
  company: { corporateName: string; cnpj: string } | null;
};

export default function ContribuintesClient({ taxpayers }: { taxpayers: Taxpayer[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Taxpayer>>({});

  const handleEditClick = (taxpayer: Taxpayer) => {
    setEditingId(taxpayer.id);
    setEditForm({
      municipalInsc: taxpayer.municipalInsc,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await updateTaxpayer(editingId, { municipalInsc: editForm.municipalInsc });
      setEditingId(null);
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar");
    }
  };

  const handleDeactivate = async (id: string) => {
    if (confirm("Deseja realmente inativar este registro?")) {
      await deactivateTaxpayer(id);
    }
  };

  const handleActivate = async (id: string) => {
    if (confirm("Deseja realmente reativar este registro?")) {
      await activateTaxpayer(id);
    }
  };

  if (taxpayers.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <FileText className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando o primeiro contribuinte na base de dados.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
          <tr>
            <th className="px-6 py-3">Nome / Razão Social</th>
            <th className="px-6 py-3">Inscrição Municipal</th>
            <th className="px-6 py-3">Tipo</th>
            <th className="px-6 py-3">Documento (CPF/CNPJ)</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {taxpayers.map((taxpayer) => {
            const name = taxpayer.person ? taxpayer.person.fullName : taxpayer.company?.corporateName;
            const doc = taxpayer.person ? taxpayer.person.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : taxpayer.company?.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            
            return (
              <tr key={taxpayer.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">
                  {name || 'N/A'}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === taxpayer.id ? (
                    <input
                      type="text"
                      value={editForm.municipalInsc || ""}
                      onChange={(e) => setEditForm({ ...editForm, municipalInsc: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400"
                      placeholder="Inscrição Municipal"
                    />
                  ) : (
                    taxpayer.municipalInsc || 'Não informada'
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">{taxpayer.taxpayerType}</td>
                <td className="px-6 py-4 text-slate-600">{doc || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${taxpayer.status === 'Ativo' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                    {taxpayer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === taxpayer.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={handleSaveEdit} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" title="Salvar">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded" title="Cancelar">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEditClick(taxpayer)} className="p-1 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      {taxpayer.status === 'Ativo' ? (
                        <button onClick={() => handleDeactivate(taxpayer.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Inativar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <button onClick={() => handleActivate(taxpayer.id)} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Reativar">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
