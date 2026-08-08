"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Newspaper, Save, ArrowLeft } from "lucide-react";
import { createNews } from "../actions";

export default function NovaNoticiaPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    try {
      await createNews(formData);
      router.push("/transparencia/noticias");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao salvar a notícia.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/transparencia/noticias" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-blue-600" />
            Nova Notícia
          </h1>
          <p className="text-slate-500 mt-1">Escreva e publique uma nova notícia no portal.</p>
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
              <label className="text-sm font-semibold text-slate-700">Título da Notícia</label>
              <input 
                name="title"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                placeholder="Ex: Prefeitura inaugura nova escola..."
              />
            </div>

            <div className="space-y-2 col-span-full">
              <label className="text-sm font-semibold text-slate-700">Resumo (Subtítulo)</label>
              <input 
                name="subtitle"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                placeholder="Ex: Obra vai beneficiar mais de 500 crianças da região."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Status</label>
              <select 
                name="status"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              >
                <option value="Rascunho">Salvar como Rascunho</option>
                <option value="Publicado">Publicar Imediatamente</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Conteúdo Completo</label>
            <textarea 
              name="content"
              required
              rows={10}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 resize-y"
              placeholder="Digite o texto da notícia aqui..."
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Link 
              href="/transparencia/noticias"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </Link>
            <button 
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Salvando...' : <><Save className="w-4 h-4" /> Salvar Notícia</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
