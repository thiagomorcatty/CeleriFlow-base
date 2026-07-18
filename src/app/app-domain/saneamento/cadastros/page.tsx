"use client";

import React, { useState, useMemo } from "react";
import { Users, Plus, Pencil, PowerOff, Search, Filter } from "lucide-react";
import Link from "next/link";

type Cadastro = {
  id: string;
  consumidor: string;
  unidade: string;
  ligacao: string;
  hidrometro: string;
  endereco: string;
};

const INITIAL_DATA: Cadastro[] = [
  { id: "1", consumidor: "João Silva", unidade: "UC-1020", ligacao: "Ativa", hidrometro: "HD-98312", endereco: "Rua das Flores, 123" },
  { id: "2", consumidor: "Maria Oliveira", unidade: "UC-1021", ligacao: "Ativa", hidrometro: "HD-77421", endereco: "Av. Brasil, 45" },
  { id: "3", consumidor: "Carlos Souza", unidade: "UC-1022", ligacao: "Cortada", hidrometro: "HD-11234", endereco: "Rua do Sol, 88" },
  { id: "4", consumidor: "Ana Pereira", unidade: "UC-1023", ligacao: "Ativa", hidrometro: "HD-55432", endereco: "Travessa da Paz, 12" },
];

const LIGACAO_COLORS: Record<string, string> = {
  Ativa: "bg-emerald-100 text-emerald-700",
  Cortada: "bg-red-100 text-red-700",
  Inativa: "bg-gray-100 text-gray-500",
};

function EditModal({ item, onSave, onClose }: { item: Cadastro; onSave: (data: Cadastro) => void; onClose: () => void }) {
  const [form, setForm] = useState({ ...item });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-base font-semibold mb-4">Editar Cadastro</h2>
        <div className="space-y-3">
          {[
            { label: "Unidade (UC)", key: "unidade" },
            { label: "Consumidor", key: "consumidor" },
            { label: "Endereço", key: "endereco" },
            { label: "Hidrômetro", key: "hidrometro" },
          ].map(({ label, key }) => (
            <div key={key} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <input
                value={form[key as keyof Cadastro]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
          ))}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Status da Ligação</label>
            <select
              value={form.ligacao}
              onChange={(e) => setForm({ ...form, ligacao: e.target.value })}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="Ativa">Ativa</option>
              <option value="Cortada">Cortada</option>
              <option value="Inativa">Inativa</option>
            </select>
          </div>
        </div>
        <div className="pt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Cancelar</button>
          <button onClick={() => onSave(form)} className="px-3 py-2 text-sm text-white bg-[#0284C7] rounded-md hover:bg-[#0369A1]">Salvar</button>
        </div>
      </div>
    </div>
  );
}

function NewModal({ onSave, onClose }: { onSave: (data: Omit<Cadastro, "id">) => void; onClose: () => void }) {
  const [form, setForm] = useState({ consumidor: "", unidade: "", ligacao: "Ativa", hidrometro: "", endereco: "" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-base font-semibold mb-4">Novo Cadastro</h2>
        <div className="space-y-3">
          {[
            { label: "Unidade (UC)", key: "unidade", placeholder: "UC-XXXX" },
            { label: "Consumidor", key: "consumidor", placeholder: "Nome completo" },
            { label: "Endereço", key: "endereco", placeholder: "Rua, Número, Bairro" },
            { label: "Hidrômetro", key: "hidrometro", placeholder: "HD-XXXXX" },
          ].map(({ label, key, placeholder }) => (
            <div key={key} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <input
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
          ))}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Status da Ligação</label>
            <select
              value={form.ligacao}
              onChange={(e) => setForm({ ...form, ligacao: e.target.value })}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="Ativa">Ativa</option>
              <option value="Cortada">Cortada</option>
              <option value="Inativa">Inativa</option>
            </select>
          </div>
        </div>
        <div className="pt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Cancelar</button>
          <button onClick={() => onSave(form)} className="px-3 py-2 text-sm text-white bg-[#0284C7] rounded-md hover:bg-[#0369A1]">Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default function CadastrosPage() {
  const [data, setData] = useState<Cadastro[]>(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [ligacaoFilter, setLigacaoFilter] = useState("Todas");
  const [editItem, setEditItem] = useState<Cadastro | null>(null);
  const [showNew, setShowNew] = useState(false);

  const statuses = ["Todas", "Ativa", "Cortada", "Inativa"];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((item) => {
      const matchesSearch =
        !q ||
        item.consumidor.toLowerCase().includes(q) ||
        item.unidade.toLowerCase().includes(q) ||
        item.endereco.toLowerCase().includes(q) ||
        item.hidrometro.toLowerCase().includes(q);
      const matchesStatus = ligacaoFilter === "Todas" || item.ligacao === ligacaoFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, search, ligacaoFilter]);

  function handleSave(updated: Cadastro) {
    setData((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    setEditItem(null);
  }

  function handleNew(form: Omit<Cadastro, "id">) {
    setData((prev) => [...prev, { ...form, id: String(Date.now()) }]);
    setShowNew(false);
  }

  function handleInactivate(id: string) {
    if (!confirm("Inativar esta ligação?")) return;
    setData((prev) => prev.map((d) => (d.id === id ? { ...d, ligacao: "Inativa" } : d)));
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
          <Link href="/saneamento" className="hover:text-gray-600 transition-colors">Água e Saneamento</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">Cadastros</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          Cadastros
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">Gestão de Consumidores, Unidades, Ligações e Hidrômetros</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Toolbar */}
        <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-2 items-center justify-between bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar consumidor, UC..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7] w-52"
              />
            </div>
            <div className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={ligacaoFilter}
                onChange={(e) => setLigacaoFilter(e.target.value)}
                className="py-1.5 px-2 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
              >
                {statuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{filtered.length} registro{filtered.length !== 1 ? "s" : ""}</span>
            <button
              onClick={() => setShowNew(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Novo Cadastro
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs font-semibold text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-3 py-2">Unidade (UC)</th>
                <th className="px-3 py-2">Consumidor</th>
                <th className="px-3 py-2">Endereço</th>
                <th className="px-3 py-2">Ligação</th>
                <th className="px-3 py-2">Hidrômetro</th>
                <th className="px-3 py-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-10 text-center text-xs text-gray-400">Nenhum cadastro encontrado.</td>
                </tr>
              ) : filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-3 py-2 text-xs font-mono font-medium text-gray-900 dark:text-white">{item.unidade}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{item.consumidor}</td>
                  <td className="px-3 py-2 text-xs text-gray-500 max-w-[180px] truncate">{item.endereco}</td>
                  <td className="px-3 py-2">
                    <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${LIGACAO_COLORS[item.ligacao] ?? "bg-gray-100 text-gray-500"}`}>
                      {item.ligacao}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs font-mono text-gray-500">{item.hidrometro}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditItem(item)}
                        className="p-1.5 text-slate-400 hover:text-[#0284C7] hover:bg-blue-50 rounded transition-colors"
                        title="Editar"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleInactivate(item.id)}
                        disabled={item.ligacao === "Inativa"}
                        className="p-1.5 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors disabled:opacity-30"
                        title="Inativar"
                      >
                        <PowerOff className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editItem && <EditModal item={editItem} onSave={handleSave} onClose={() => setEditItem(null)} />}
      {showNew && <NewModal onSave={handleNew} onClose={() => setShowNew(false)} />}
    </div>
  );
}
