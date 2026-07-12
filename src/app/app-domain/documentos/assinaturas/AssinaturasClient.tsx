"use client";

import { useState } from "react";
import { FileSignature, CheckCircle, XCircle, File } from "lucide-react";
import { signDocument } from "./actions";

type Documento = {
  id: string;
  title: string;
  documentType: string;
  createdAt: Date;
  status: string;
};

export default function AssinaturasClient({ initialDocuments }: { initialDocuments: Documento[] }) {
  const [documents, setDocuments] = useState<Documento[]>(initialDocuments);
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (id: string, action: 'assinar' | 'rejeitar') => {
    if (!confirm(`Deseja realmente ${action} este documento?`)) return;
    
    setLoading(id);
    try {
      const newStatus = action === 'assinar' ? 'Válido' : 'Rejeitado';
      await signDocument(id, newStatus);
      
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      alert(`Documento ${action === 'assinar' ? 'assinado' : 'rejeitado'} com sucesso!`);
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao processar a solicitação.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <table className="w-full text-left text-sm whitespace-nowrap">
      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
        <tr>
          <th className="px-6 py-3">Documento</th>
          <th className="px-6 py-3">Tipo</th>
          <th className="px-6 py-3">Data de Envio</th>
          <th className="px-6 py-3">Status</th>
          <th className="px-6 py-3 text-right">Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {documents.map((doc) => (
          <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
            <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-2">
              <File className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              {doc.title}
            </td>
            <td className="px-6 py-4 text-slate-600">
              {doc.documentType || 'Arquivo'}
            </td>
            <td className="px-6 py-4 text-slate-500">
              {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
            </td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-700">
                Pendente
              </span>
            </td>
            <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
              <button 
                onClick={() => handleAction(doc.id, 'assinar')}
                disabled={loading === doc.id}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Assinar
              </button>
              <button 
                onClick={() => handleAction(doc.id, 'rejeitar')}
                disabled={loading === doc.id}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-600 text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <XCircle className="w-3.5 h-3.5" />
                Rejeitar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
