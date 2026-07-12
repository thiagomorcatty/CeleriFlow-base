"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Save, ArrowLeft } from "lucide-react";
import { createDiary } from "../actions";

export default function NovoDiarioPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    try {
      await createDiary(formData);
      router.push("/transparencia/diario-oficial");
    } catch (err: any) {
      setError(err.message || "Erro ao salvar o diário oficial.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/transparencia/diario-oficial" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            Nova Edição
          </h1>
          <p className="text-slate-500 mt-1">Publique uma nova edição do Diário Oficial.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Número da Edição</label>
              <input 
                name="editionNumber"
                type="number"
                min="1"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                placeholder="Ex: 1543"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Status</label>
              <select 
                name="status"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
              >
                <option value="Rascunho">Rascunho</option>
                <option value="Publicado">Publicado</option>
              </select>
            </div>

            <div className="space-y-2 col-span-full">
              <label className="text-sm font-semibold text-slate-700">URL do PDF</label>
              <input 
                name="pdfUrl"
                type="url"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                placeholder="https://exemplo.com/diario-1543.pdf"
              />
              <p className="text-xs text-slate-500">Insira o link direto para visualizar o arquivo PDF do diário.</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Link 
              href="/transparencia/diario-oficial"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </Link>
            <button 
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Salvando...' : <><Save className="w-4 h-4" /> Salvar Edição</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
