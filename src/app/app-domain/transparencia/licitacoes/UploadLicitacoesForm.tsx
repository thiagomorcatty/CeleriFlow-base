"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { uploadBiddingsCsv } from "./actions";

export default function UploadLicitacoesForm() {
  const [isPending, setIsPending] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsPending(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const count = await uploadBiddingsCsv(formData);
      alert(`Upload concluído! ${count} licitações foram inseridas.`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro no upload.");
    } finally {
      setIsPending(false);
      e.target.value = ''; // Reset input
    }
  }

  return (
    <div className="relative inline-block">
      <input 
        type="file" 
        accept=".csv"
        onChange={handleUpload}
        disabled={isPending}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      <button 
        disabled={isPending}
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
      >
        <Upload className="w-4 h-4" />
        {isPending ? 'Enviando...' : 'Importar CSV'}
      </button>
    </div>
  );
}
