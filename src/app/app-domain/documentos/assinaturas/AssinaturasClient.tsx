"use client";

import { useState, useTransition } from "react";
import { CheckCircle, File, FileSignature, X } from "lucide-react";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { signDocumentInternally } from "./actions";

type Documento = {
  id: string;
  title: string;
  documentType: string;
  createdAt: Date | string;
  status: string;
};

export default function AssinaturasClient({ initialDocuments }: { initialDocuments: Documento[] }) {
  const [documents, setDocuments] = useState<Documento[]>(initialDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Documento | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function closeConfirmation() {
    if (isPending) return;
    setSelectedDocument(null);
    setPassword("");
    setError(null);
  }

  function handleSignature() {
    if (!selectedDocument || !password) return;
    setError(null);
    startTransition(async () => {
      try {
        const user = auth.currentUser;
        if (!user?.email) throw new Error("Sua sessao Firebase nao esta disponivel. Entre novamente no sistema.");
        await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password));
        const token = await user.getIdToken(true);
        const result = await signDocumentInternally(selectedDocument.id, token);
        if (result.error) {
          setError(result.error);
          return;
        }
        setDocuments((current) => current.filter((document) => document.id !== selectedDocument.id));
        closeConfirmation();
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : "Nao foi possivel confirmar sua senha.");
      }
    });
  };

  return (
    <>
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
                {doc.documentType || "Arquivo"}
              </td>
              <td className="px-6 py-4 text-slate-500">
                {new Date(doc.createdAt).toLocaleDateString("pt-BR")}
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-700">
                  Pendente
                </span>
              </td>
              <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedDocument(doc)}
                  disabled={isPending}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Assinar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><FileSignature className="h-5 w-5 text-indigo-600" /> Assinar documento</h2>
              <button onClick={closeConfirmation} disabled={isPending} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4 p-5 text-sm text-slate-700">
              <p><strong>{selectedDocument.title}</strong> será congelado em uma versão com hash SHA-256 antes do registro.</p>
              <p className="rounded-lg bg-indigo-50 p-3 text-indigo-800">Confirme sua senha Firebase para registrar a manifestação interna. O hash SHA-256 e a reautenticação serão gravados na auditoria.</p>
              <label className="block text-sm font-medium text-slate-700">Senha da conta
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
              </label>
              {error && <p className="rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 p-5">
              <button onClick={closeConfirmation} disabled={isPending} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600">Cancelar</button>
              <button onClick={handleSignature} disabled={!password || isPending} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{isPending ? "Registrando..." : "Registrar manifestação"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
