"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createDepartment } from "../actions";

type Secretariat = { id: string; name: string };

export default function NovoDepartamentoForm({ secretariats }: { secretariats: Secretariat[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await createDepartment(new FormData(e.currentTarget));
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <Link href="/administracao/departamentos" className="text-amber-600 hover:text-amber-700 text-sm font-semibold flex items-center gap-2 w-fit mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Novo Departamento</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">{error}</div>}
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Secretaria Vinculada *</label>
            <select name="secretariatId" required className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-sm bg-white">
              <option value="">Selecione...</option>
              {secretariats.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Nome do Departamento *</label>
            <input type="text" name="name" required placeholder="Ex: Departamento de RH" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-sm" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Descrição</label>
            <input type="text" name="description" placeholder="Breve descrição" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-sm" />
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" /> {loading ? "Salvando..." : "Salvar Departamento"}
          </button>
        </div>
      </form>
    </div>
  );
}
