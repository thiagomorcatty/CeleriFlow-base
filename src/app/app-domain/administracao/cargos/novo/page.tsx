"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createRole } from "../actions";

export default function NovoCargoPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await createRole(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/administracao/cargos" className="text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center gap-2 w-fit mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Novo Cargo/Função</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">{error}</div>}
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Nome do Cargo *</label>
            <input type="text" name="name" required placeholder="Ex: Diretor de Escola" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-sm" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Nível (Opcional)</label>
              <select name="level" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-sm bg-white">
                <option value="">Selecione...</option>
                <option value="Secretário">Secretário</option>
                <option value="Diretor">Diretor</option>
                <option value="Coordenador">Coordenador</option>
                <option value="Servidor">Servidor Base</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Pode Assinar Documentos?</label>
              <div className="pt-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="canSign" className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-5 h-5" />
                  <span className="ml-2 text-sm text-slate-700">Sim, possui poder de assinatura (SLA)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Descrição</label>
            <input type="text" name="description" placeholder="Breve descrição das atribuições" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-sm" />
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" /> {loading ? "Salvando..." : "Salvar Cargo"}
          </button>
        </div>
      </form>
    </div>
  );
}
