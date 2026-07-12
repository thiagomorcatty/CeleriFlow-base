"use client";

import { useState } from "react";
import { Search, Plus, FileCheck, Pencil, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { createLicense, updateLicense, deactivateLicense, activateLicense } from "./actions";

type License = {
  id: string;
  licenseType: string;
  issueDate: Date;
  validUntil: Date;
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

export default function AlvarasClient({ 
  licenses,
  taxpayers
}: { 
  licenses: License[];
  taxpayers: Taxpayer[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{licenseType?: string, validUntil?: string}>({});
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    licenseType: "Funcionamento",
    taxpayerId: taxpayers[0]?.id || "",
    validUntil: ""
  });

  const handleEditClick = (lic: License) => {
    setEditingId(lic.id);
    setEditForm({
      licenseType: lic.licenseType,
      validUntil: new Date(lic.validUntil).toISOString().split('T')[0]
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    if (confirm("Deseja salvar as alterações?")) {
      try {
        await updateLicense(editingId, editForm);
        setEditingId(null);
      } catch (e) {
        console.error(e);
        alert("Erro ao salvar alterações.");
      }
    }
  };

  const handleDeactivate = async (id: string) => {
    if (confirm("Deseja cancelar este alvará?")) {
      await deactivateLicense(id);
    }
  };

  const handleActivate = async (id: string) => {
    if (confirm("Deseja reativar este alvará?")) {
      await activateLicense(id);
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
      await createLicense(createForm);
      setIsCreateModalOpen(false);
      setCreateForm({ 
        licenseType: "Funcionamento", 
        taxpayerId: taxpayers[0]?.id || "",
        validUntil: ""
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao emitir alvará.");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-indigo-600" />
            Alvarás e Licenças
          </h1>
          <p className="text-slate-500 mt-1">Gestão de alvarás de funcionamento e sanitários.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Alvará
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por tipo ou contribuinte..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
            />
          </div>
        </div>

        {licenses.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileCheck className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum alvará emitido</h3>
            <p className="text-slate-500 mt-1">Os alvarás e licenças aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Tipo de Alvará</th>
                  <th className="px-6 py-3">Contribuinte</th>
                  <th className="px-6 py-3">Emissão</th>
                  <th className="px-6 py-3">Validade</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {licenses.map((license) => (
                  <tr key={license.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {editingId === license.id ? (
                        <select
                          value={editForm.licenseType || ""}
                          onChange={(e) => setEditForm({ ...editForm, licenseType: e.target.value })}
                          className="w-full border rounded px-2 py-1"
                        >
                          <option value="Funcionamento">Funcionamento</option>
                          <option value="Sanitária">Sanitária</option>
                          <option value="Obra">Obra</option>
                          <option value="Ambiental">Ambiental</option>
                        </select>
                      ) : (
                        license.licenseType
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {license.taxpayer.company?.corporateName || license.taxpayer.person?.fullName || "Não Informado"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(license.issueDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {editingId === license.id ? (
                        <input
                          type="date"
                          value={editForm.validUntil || ""}
                          onChange={(e) => setEditForm({ ...editForm, validUntil: e.target.value })}
                          className="border rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        new Date(license.validUntil).toLocaleDateString('pt-BR')
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        license.status === 'Emitido' ? 'bg-indigo-100 text-indigo-700' :
                        license.status === 'Vencido' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {license.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingId === license.id ? (
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
                          <button onClick={() => handleEditClick(license)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Editar">
                            <Pencil className="w-4 h-4" />
                          </button>
                          {license.status === 'Emitido' ? (
                            <button onClick={() => handleDeactivate(license.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Cancelar">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <button onClick={() => handleActivate(license.id)} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Reativar">
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
        )}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Emitir Alvará/Licença</h2>
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
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                >
                  <option value="">Selecione um contribuinte...</option>
                  {taxpayers.map(tp => (
                    <option key={tp.id} value={tp.id}>{tp.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                  <select 
                    value={createForm.licenseType}
                    onChange={(e) => setCreateForm({...createForm, licenseType: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  >
                    <option value="Funcionamento">Funcionamento</option>
                    <option value="Sanitária">Sanitária</option>
                    <option value="Obra">Obra</option>
                    <option value="Ambiental">Ambiental</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Validade</label>
                  <input 
                    type="date"
                    required
                    value={createForm.validUntil}
                    onChange={(e) => setCreateForm({...createForm, validUntil: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
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
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Emitir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
