"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createUnit } from "../actions";

export default function NovaUnidadeForm({ secretariats }: { secretariats: any[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await createUnit(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/app-domain/administracao/unidades" className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold flex items-center gap-2 w-fit mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nova Unidade Administrativa</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Secretaria Vinculada *</label>
              <select name="secretariatId" required className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm bg-white">
                <option value="">Selecione...</option>
                {secretariats.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Tipo de Unidade *</label>
              <select name="type" required className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm bg-white">
                <option value="">Selecione...</option>
                <option value="Escola">Escola</option>
                <option value="UBS">Unidade Básica de Saúde (UBS)</option>
                <option value="CRAS">CRAS / CREAS</option>
                <option value="Almoxarifado">Almoxarifado</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Nome da Unidade *</label>
            <input type="text" name="name" required placeholder="Ex: Escola Municipal Joãozinho" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Responsável (Diretor/Coordenador)</label>
              <input type="text" name="managerName" placeholder="Nome do responsável" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Endereço</label>
              <input type="text" name="address" placeholder="Endereço da unidade" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm" />
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" /> {loading ? "Salvando..." : "Salvar Unidade"}
          </button>
        </div>
      </form>
    </div>
  );
}
