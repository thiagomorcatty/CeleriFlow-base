"use client";

import { useState } from "react";
import { Users, Pencil, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { updatePerson, deactivatePerson, activatePerson } from "../actions";

type TaxpayerInfo = {
  municipalInsc: string | null;
};

type Person = {
  id: string;
  fullName: string;
  cpf: string;
  email: string | null;
  phonePrimary: string | null;
  status: string;
  taxpayerInfo?: TaxpayerInfo | null;
};

export default function PessoasFisicasClient({ persons }: { persons: Person[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Person & { isTaxpayer: boolean; municipalInsc: string }>>({});

  const handleEditClick = (person: Person) => {
    setEditingId(person.id);
    setEditForm({
      fullName: person.fullName,
      cpf: person.cpf,
      email: person.email,
      phonePrimary: person.phonePrimary,
      isTaxpayer: !!person.taxpayerInfo,
      municipalInsc: person.taxpayerInfo?.municipalInsc || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    if (confirm("Deseja salvar as alterações?")) {
      try {
        await updatePerson(editingId, {
          fullName: editForm.fullName,
          cpf: editForm.cpf,
          email: editForm.email,
          phonePrimary: editForm.phonePrimary,
          // Pass the taxpayer fields to the action
          isTaxpayer: editForm.isTaxpayer,
          municipalInsc: editForm.municipalInsc,
        });
        setEditingId(null);
      } catch (e) {
        console.error(e);
        alert("Erro ao salvar");
      }
    }
  };

  const handleDeactivate = async (id: string) => {
    if (confirm("Deseja realmente inativar este registro?")) {
      await deactivatePerson(id);
    }
  };

  const handleActivate = async (id: string) => {
    if (confirm("Deseja realmente reativar este registro?")) {
      await activatePerson(id);
    }
  };

  if (persons.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Users className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
        <p className="text-slate-500 mt-1">Comece adicionando a primeira pessoa física na base de dados.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
          <tr>
            <th className="px-6 py-3">Nome Completo</th>
            <th className="px-6 py-3">CPF</th>
            <th className="px-6 py-3">Contato</th>
            <th className="px-6 py-3">Contribuinte</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {persons.map((person) => (
            <tr key={person.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-800">
                {editingId === person.id ? (
                  <input
                    type="text"
                    value={editForm.fullName || ""}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full border rounded px-2 py-1 placeholder-slate-400 font-normal"
                    placeholder="Nome Completo"
                  />
                ) : (
                  person.fullName
                )}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === person.id ? (
                  <input
                    type="text"
                    value={editForm.cpf || ""}
                    onChange={(e) => setEditForm({ ...editForm, cpf: e.target.value })}
                    className="w-full border rounded px-2 py-1 placeholder-slate-400 font-normal"
                    placeholder="CPF (apenas números)"
                  />
                ) : (
                  person.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                )}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === person.id ? (
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      value={editForm.email || ""}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400 font-normal text-xs"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={editForm.phonePrimary || ""}
                      onChange={(e) => setEditForm({ ...editForm, phonePrimary: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400 font-normal text-xs"
                      placeholder="Telefone"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col text-xs">
                    {person.email && <span>{person.email}</span>}
                    {person.phonePrimary && <span className="text-slate-500">{person.phonePrimary}</span>}
                    {!person.email && !person.phonePrimary && '-'}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {editingId === person.id ? (
                  <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.isTaxpayer}
                        onChange={(e) => setEditForm({ ...editForm, isTaxpayer: e.target.checked })}
                      />
                      É Contribuinte?
                    </label>
                    {editForm.isTaxpayer && (
                      <input
                        type="text"
                        value={editForm.municipalInsc || ""}
                        onChange={(e) => setEditForm({ ...editForm, municipalInsc: e.target.value })}
                        className="w-full border rounded px-2 py-1 placeholder-slate-400 font-normal text-xs"
                        placeholder="Inscrição Municipal"
                      />
                    )}
                  </div>
                ) : (
                  person.taxpayerInfo ? (
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-amber-700">Sim</span>
                      {person.taxpayerInfo.municipalInsc && (
                        <span className="text-slate-500">Insc: {person.taxpayerInfo.municipalInsc}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs font-medium">Não</span>
                  )
                )}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${person.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {person.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                {editingId === person.id ? (
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={handleSaveEdit} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" title="Salvar">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded" title="Cancelar">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEditClick(person)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {person.status === 'Ativo' ? (
                      <button onClick={() => handleDeactivate(person.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Inativar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => handleActivate(person.id)} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Reativar">
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
