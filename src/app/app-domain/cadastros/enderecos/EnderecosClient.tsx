"use client";

import { useState } from "react";
import { MapPin, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import { updateAddress, deleteAddress } from "../actions";

type Address = {
  id: string;
  streetName: string | null;
  number: string | null;
  zipCode: string | null;
  neighborhood: { name: string } | null;
  person: { fullName: string } | null;
  company: { corporateName: string } | null;
};

export default function EnderecosClient({ addresses }: { addresses: Address[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Address>>({});

  const handleEditClick = (addr: Address) => {
    setEditingId(addr.id);
    setEditForm({
      streetName: addr.streetName,
      number: addr.number,
      zipCode: addr.zipCode,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await updateAddress(editingId, {
        streetName: editForm.streetName,
        number: editForm.number,
        zipCode: editForm.zipCode,
      });
      setEditingId(null);
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja realmente excluir este endereço?")) {
      await deleteAddress(id);
    }
  };

  if (addresses.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <MapPin className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando o primeiro endereço na base de dados.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
          <tr>
            <th className="px-6 py-3">Logradouro</th>
            <th className="px-6 py-3">Número</th>
            <th className="px-6 py-3">Bairro</th>
            <th className="px-6 py-3">CEP</th>
            <th className="px-6 py-3">Vínculo</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {addresses.map((addr) => {
            let link = '-';
            if (addr.person) link = addr.person.fullName;
            else if (addr.company) link = addr.company.corporateName;

            return (
              <tr key={addr.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">
                  {editingId === addr.id ? (
                    <input
                      type="text"
                      value={editForm.streetName || ""}
                      onChange={(e) => setEditForm({ ...editForm, streetName: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400"
                      placeholder="Logradouro"
                    />
                  ) : (
                    addr.streetName || 'S/ Logradouro'
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === addr.id ? (
                    <input
                      type="text"
                      value={editForm.number || ""}
                      onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400"
                      placeholder="Número"
                    />
                  ) : (
                    addr.number || 'S/N'
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">{addr.neighborhood?.name || '-'}</td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === addr.id ? (
                    <input
                      type="text"
                      value={editForm.zipCode || ""}
                      onChange={(e) => setEditForm({ ...editForm, zipCode: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400"
                      placeholder="CEP"
                    />
                  ) : (
                    addr.zipCode || '-'
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                    {link}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === addr.id ? (
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
                      <button onClick={() => handleEditClick(addr)} className="p-1 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(addr.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Excluir">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
