"use client";

import { useState } from "react";
import { Building2, Pencil, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { updateCompany, deactivateCompany, activateCompany } from "../actions";

type Company = {
  id: string;
  corporateName: string;
  tradeName: string | null;
  cnpj: string;
  emailPrimary: string | null;
  phone: string | null;
  status: string;
};

export default function PessoasJuridicasClient({ companies }: { companies: Company[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Company>>({});

  const handleEditClick = (company: Company) => {
    setEditingId(company.id);
    setEditForm({
      corporateName: company.corporateName,
      tradeName: company.tradeName,
      cnpj: company.cnpj,
      emailPrimary: company.emailPrimary,
      phone: company.phone,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await updateCompany(editingId, editForm);
      setEditingId(null);
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar");
    }
  };

  const handleDeactivate = async (id: string) => {
    if (confirm("Deseja realmente inativar este registro?")) {
      await deactivateCompany(id);
    }
  };

  const handleActivate = async (id: string) => {
    if (confirm("Deseja realmente reativar este registro?")) {
      await activateCompany(id);
    }
  };

  if (companies.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Building2 className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando a primeira pessoa jurídica na base de dados.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
          <tr>
            <th className="px-6 py-3">Razão Social / Nome Fantasia</th>
            <th className="px-6 py-3">CNPJ</th>
            <th className="px-6 py-3">Contato</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-800">
                {editingId === company.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editForm.corporateName || ""}
                      onChange={(e) => setEditForm({ ...editForm, corporateName: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400"
                      placeholder="Razão Social"
                    />
                    <input
                      type="text"
                      value={editForm.tradeName || ""}
                      onChange={(e) => setEditForm({ ...editForm, tradeName: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400 text-xs"
                      placeholder="Nome Fantasia"
                    />
                  </div>
                ) : (
                  <>
                    {company.corporateName}
                    {company.tradeName && <span className="block text-xs text-slate-500 font-normal mt-0.5">{company.tradeName}</span>}
                  </>
                )}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {company.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === company.id ? (
                  <input
                    type="text"
                    value={editForm.emailPrimary || ""}
                    onChange={(e) => setEditForm({ ...editForm, emailPrimary: e.target.value })}
                    className="w-full border rounded px-2 py-1 placeholder-slate-400"
                    placeholder="Email ou Telefone"
                  />
                ) : (
                  company.emailPrimary || company.phone || '-'
                )}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${company.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {company.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                {editingId === company.id ? (
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
                    <button onClick={() => handleEditClick(company)} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {company.status === 'Ativo' ? (
                      <button onClick={() => handleDeactivate(company.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Inativar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => handleActivate(company.id)} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Reativar">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
