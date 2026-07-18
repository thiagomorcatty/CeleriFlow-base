"use client";

import React, { useState, useMemo } from "react";
import { Droplet, Activity, FlaskConical, Search, Filter, Plus, Pencil } from "lucide-react";
import Link from "next/link";

type Analise = {
  id: string;
  ponto: string;
  dataColeta: string;
  parametro: string;
  resultado: string;
  limite: string;
  conformidade: string;
};

const INITIAL_DATA: Analise[] = [
  { id: "1", ponto: "ETA Principal", dataColeta: "15/07/2026", parametro: "Turbidez", resultado: "0.5 NTU", limite: "5.0 NTU", conformidade: "Conforme" },
  { id: "2", ponto: "ETA Principal", dataColeta: "15/07/2026", parametro: "Cloro Residual", resultado: "1.2 mg/L", limite: "0.2 a 2.0 mg/L", conformidade: "Conforme" },
  { id: "3", ponto: "Rede Bairro Sul", dataColeta: "14/07/2026", parametro: "Coliformes", resultado: "Ausente", limite: "Ausente", conformidade: "Conforme" },
  { id: "4", ponto: "ETE Central (Efluente)", dataColeta: "14/07/2026", parametro: "DBO", resultado: "65 mg/L", limite: "Max 50 mg/L", conformidade: "Não Conforme" },
];

function AnaliseModal({
  item,
  onSave,
  onClose,
}: {
  item: Partial<Analise> & { id?: string };
  onSave: (data: Analise) => void;
  onClose: () => void;
}) {
  const isEdit = !!item.id;
  const [form, setForm] = useState<Omit<Analise, "id">>({
    ponto: item.ponto ?? "",
    dataColeta: item.dataColeta ?? new Date().toLocaleDateString("pt-BR"),
    parametro: item.parametro ?? "",
    resultado: item.resultado ?? "",
    limite: item.limite ?? "",
    conformidade: item.conformidade ?? "Conforme",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-base font-semibold mb-4">{isEdit ? "Editar Análise" : "Registrar Análise"}</h2>
        <div className="space-y-3">
          {([
            { label: "Ponto de Coleta", key: "ponto", placeholder: "Ex: ETA Principal" },
            { label: "Data da Coleta", key: "dataColeta", placeholder: "DD/MM/AAAA" },
            { label: "Parâmetro Analisado", key: "parametro", placeholder: "Ex: Turbidez" },
            { label: "Resultado", key: "resultado", placeholder: "Ex: 0.5 NTU" },
            { label: "Valor Limite", key: "limite", placeholder: "Ex: 5.0 NTU" },
          ] as { label: string; key: keyof typeof form; placeholder: string }[]).map(({ label, key, placeholder }) => (
            <div key={key} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <input
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
          ))}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Conformidade</label>
            <select
              value={form.conformidade}
              onChange={(e) => setForm({ ...form, conformidade: e.target.value })}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="Conforme">Conforme</option>
              <option value="Não Conforme">Não Conforme</option>
            </select>
          </div>
        </div>
        <div className="pt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Cancelar</button>
          <button
            onClick={() => onSave({ ...form, id: item.id ?? String(Date.now()) })}
            className="px-3 py-2 text-sm text-white bg-cyan-600 rounded-md hover:bg-cyan-700"
          >
            {isEdit ? "Salvar" : "Registrar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function QualidadePage() {
  const [data, setData] = useState<Analise[]>(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [conformFilter, setConformFilter] = useState("Todos");
  const [editItem, setEditItem] = useState<Analise | null>(null);
  const [showNew, setShowNew] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((item) => {
      const matchesSearch =
        !q ||
        item.ponto.toLowerCase().includes(q) ||
        item.parametro.toLowerCase().includes(q) ||
        item.resultado.toLowerCase().includes(q);
      const matchesConform = conformFilter === "Todos" || item.conformidade === conformFilter;
      return matchesSearch && matchesConform;
    });
  }, [data, search, conformFilter]);

  function handleSave(updated: Analise) {
    setData((prev) => {
      const exists = prev.some((d) => d.id === updated.id);
      return exists ? prev.map((d) => (d.id === updated.id ? updated : d)) : [...prev, updated];
    });
    setEditItem(null);
    setShowNew(false);
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
          <Link href="/saneamento" className="hover:text-gray-600 transition-colors">Água e Saneamento</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">Qualidade da Água</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Droplet className="h-5 w-5 text-cyan-500" />
          Esgoto e Qualidade
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">Monitoramento da Qualidade da Água e Saneamento</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Toolbar */}
        <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-2 items-center justify-between bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar ponto, parâmetro..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 w-52"
              />
            </div>
            <div className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={conformFilter}
                onChange={(e) => setConformFilter(e.target.value)}
                className="py-1.5 px-2 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option>Todos</option>
                <option>Conforme</option>
                <option>Não Conforme</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{filtered.length} análise{filtered.length !== 1 ? "s" : ""}</span>
            <button
              onClick={() => setShowNew(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-xs font-medium hover:bg-cyan-700 transition-colors"
            >
              <FlaskConical className="h-3.5 w-3.5" />
              Registrar Análise
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs font-semibold text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-3 py-2">Ponto de Coleta</th>
                <th className="px-3 py-2 text-center">Data Coleta</th>
                <th className="px-3 py-2">Parâmetro</th>
                <th className="px-3 py-2 text-right">Resultado</th>
                <th className="px-3 py-2 text-right">Valor Limite</th>
                <th className="px-3 py-2 text-center">Conformidade</th>
                <th className="px-3 py-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-10 text-center text-xs text-gray-400">Nenhuma análise encontrada.</td>
                </tr>
              ) : filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                      {item.ponto}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-500 text-center">{item.dataColeta}</td>
                  <td className="px-3 py-2 text-xs text-gray-600">{item.parametro}</td>
                  <td className="px-3 py-2 text-xs font-medium text-gray-800 dark:text-gray-200 text-right">{item.resultado}</td>
                  <td className="px-3 py-2 text-xs text-gray-400 text-right">{item.limite}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${item.conformidade === "Conforme" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {item.conformidade}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setEditItem(item)}
                        className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded transition-colors"
                        title="Editar"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editItem && <AnaliseModal item={editItem} onSave={handleSave} onClose={() => setEditItem(null)} />}
      {showNew && <AnaliseModal item={{}} onSave={handleSave} onClose={() => setShowNew(false)} />}
    </div>
  );
}
