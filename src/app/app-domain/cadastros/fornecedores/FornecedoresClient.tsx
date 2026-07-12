"use client";

import { useState } from "react";
import { Truck, Pencil, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { updateSupplier, deactivateSupplier, activateSupplier } from "../actions";

type Supplier = {
  id: string;
  category: string | null;
  businessBranch: string | null;
  certificationsValidUntil: Date | null;
  status: string;
  person: { fullName: string } | null;
  company: { corporateName: string } | null;
};

export default function FornecedoresClient({ suppliers }: { suppliers: Supplier[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Supplier>>({});

  const handleEditClick = (supplier: Supplier) => {
    setEditingId(supplier.id);
    setEditForm({
      category: supplier.category,
      businessBranch: supplier.businessBranch,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await updateSupplier(editingId, { 
        category: editForm.category,
        businessBranch: editForm.businessBranch 
      });
      setEditingId(null);
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar");
    }
  };

  const handleDeactivate = async (id: string) => {
    if (confirm("Deseja realmente inativar este registro?")) {
      await deactivateSupplier(id);
    }
  };

  const handleActivate = async (id: string) => {
    if (confirm("Deseja realmente reativar este registro?")) {
      await activateSupplier(id);
    }
  };

  if (suppliers.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Truck className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando o primeiro fornecedor na base de dados.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
          <tr>
            <th className="px-6 py-3">Nome / Razão Social</th>
            <th className="px-6 py-3">Categoria</th>
            <th className="px-6 py-3">Ramo de Atividade</th>
            <th className="px-6 py-3">Validade Certidões</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {suppliers.map((supplier) => {
            const name = supplier.person ? supplier.person.fullName : supplier.company?.corporateName;
            
            return (
              <tr key={supplier.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">
                  {name || 'N/A'}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === supplier.id ? (
                    <input
                      type="text"
                      value={editForm.category || ""}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400"
                      placeholder="Categoria"
                    />
                  ) : (
                    supplier.category || '-'
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === supplier.id ? (
                    <input
                      type="text"
                      value={editForm.businessBranch || ""}
                      onChange={(e) => setEditForm({ ...editForm, businessBranch: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400"
                      placeholder="Ramo de Atividade"
                    />
                  ) : (
                    supplier.businessBranch || '-'
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {supplier.certificationsValidUntil ? new Date(supplier.certificationsValidUntil).toLocaleDateString('pt-BR') : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${supplier.status === 'Ativo' ? 'bg-fuchsia-100 text-fuchsia-700' : 'bg-slate-100 text-slate-600'}`}>
                    {supplier.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === supplier.id ? (
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
                      <button onClick={() => handleEditClick(supplier)} className="p-1 text-slate-400 hover:text-fuchsia-600 hover:bg-fuchsia-50 rounded" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      {supplier.status === 'Ativo' ? (
                        <button onClick={() => handleDeactivate(supplier.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Inativar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <button onClick={() => handleActivate(supplier.id)} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Reativar">
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
