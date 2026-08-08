"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileOutput, Save, ArrowLeft } from "lucide-react";
import { createPage } from "../actions";

export default function NovaPaginaPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    try {
      await createPage(formData);
      router.push("/transparencia/paginas");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao salvar a página.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/transparencia/paginas" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileOutput className="w-6 h-6 text-purple-600" />
            Nova Página
          </h1>
          <p className="text-slate-500 mt-1">Crie uma nova página institucional para o portal.</p>
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
            <div className="space-y-2 col-span-full">
              <label className="text-sm font-semibold text-slate-700">Título da Página</label>
              <input 
                name="title"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
                placeholder="Ex: História do Município"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Status</label>
              <select 
                name="status"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
              >
                <option value="Rascunho">Salvar como Rascunho</option>
                <option value="Publicado">Publicar Imediatamente</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Conteúdo (HTML/Texto)</label>
            <textarea 
              name="content"
              required
              rows={15}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 resize-y font-mono text-sm"
              placeholder="<h1>Nossa História</h1><p>A cidade foi fundada em...</p>"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Link 
              href="/transparencia/paginas"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </Link>
            <button 
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Salvando...' : <><Save className="w-4 h-4" /> Salvar Página</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
