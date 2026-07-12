"use client";

import { useState } from "react";
import { File, FileText, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import { updateDocument, deleteDocument } from "../actions";

type Document = {
  id: string;
  title: string;
  documentType: string;
  validUntil: Date | null;
  fileUrl: string | null;
  person: { fullName: string } | null;
  company: { corporateName: string } | null;
};

export default function DocumentosClient({ documents }: { documents: Document[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Document>>({});

  const handleEditClick = (doc: Document) => {
    setEditingId(doc.id);
    setEditForm({
      title: doc.title,
      documentType: doc.documentType,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await updateDocument(editingId, {
        title: editForm.title,
        documentType: editForm.documentType,
      });
      setEditingId(null);
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja realmente excluir este documento?")) {
      await deleteDocument(id);
    }
  };

  if (documents.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <File className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">Nenhum documento encontrado</h3>
        <p className="text-slate-500 mt-1">Comece anexando o primeiro documento à base de dados.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
          <tr>
            <th className="px-6 py-3">Título do Documento</th>
            <th className="px-6 py-3">Tipo</th>
            <th className="px-6 py-3">Vínculo</th>
            <th className="px-6 py-3">Validade</th>
            <th className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {documents.map((doc) => {
            let link = '-';
            if (doc.person) link = doc.person.fullName;
            else if (doc.company) link = doc.company.corporateName;

            return (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {editingId === doc.id ? (
                      <input
                        type="text"
                        value={editForm.title || ""}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full border rounded px-2 py-1 placeholder-slate-400 font-normal"
                        placeholder="Título"
                      />
                    ) : (
                      doc.title
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {editingId === doc.id ? (
                    <input
                      type="text"
                      value={editForm.documentType || ""}
                      onChange={(e) => setEditForm({ ...editForm, documentType: e.target.value })}
                      className="w-full border rounded px-2 py-1 placeholder-slate-400"
                      placeholder="Tipo"
                    />
                  ) : (
                    doc.documentType
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                    {link}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {doc.validUntil ? new Date(doc.validUntil).toLocaleDateString('pt-BR') : '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === doc.id ? (
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
                      {doc.fileUrl && (
                        <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="text-rose-600 hover:text-rose-800 text-sm font-semibold mr-2">Ver Anexo</a>
                      )}
                      <button onClick={() => handleEditClick(doc)} className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(doc.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Excluir">
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
