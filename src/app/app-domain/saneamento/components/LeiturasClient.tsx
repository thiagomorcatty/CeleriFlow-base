"use client";

import { useState, useMemo } from "react";
import { Search, Filter, FileText } from "lucide-react";
import { NewReadingSheet } from "./NewReadingSheet";
import { EditReadingSheet } from "./EditReadingSheet";

type Unit = { id: string; code: string; address: string };

type Reading = {
  id: string;
  competence: string;
  previousValue: number;
  currentValue: number;
  consumption: number;
  readerName: string | null;
  status: string;
  readingDate: Date;
  unit: { code: string };
};

const STATUS_COLORS: Record<string, string> = {
  Registrada: "bg-emerald-100 text-emerald-700",
  Revisada: "bg-blue-100 text-blue-700",
  Estimada: "bg-amber-100 text-amber-700",
};

export function LeiturasClient({ readings, units }: { readings: Reading[]; units: Unit[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const statuses = ["Todos", "Registrada", "Revisada", "Estimada"];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return readings.filter((r) => {
      const matchesSearch =
        !q ||
        r.unit.code.toLowerCase().includes(q) ||
        r.competence.toLowerCase().includes(q) ||
        (r.readerName ?? "").toLowerCase().includes(q);
      const matchesStatus = statusFilter === "Todos" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [readings, search, statusFilter]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Toolbar */}
      <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-2 items-center justify-between bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar UC, competência..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7] w-52"
            />
          </div>
          <div className="flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-2 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            >
              {statuses.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{filtered.length} registro{filtered.length !== 1 ? "s" : ""}</span>
          <NewReadingSheet units={units} />
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="p-10 text-center text-gray-400 text-sm">
          <FileText className="h-10 w-10 mx-auto mb-3 text-gray-200" />
          Nenhuma leitura encontrada.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs font-semibold text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-3 py-2">UC</th>
                <th className="px-3 py-2">Competência</th>
                <th className="px-3 py-2 text-right">Leit. Anterior</th>
                <th className="px-3 py-2 text-right">Leit. Atual</th>
                <th className="px-3 py-2 text-right">Consumo (m³)</th>
                <th className="px-3 py-2">Leiturista</th>
                <th className="px-3 py-2 text-center">Status</th>
                <th className="px-3 py-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-3 py-2 text-xs font-mono font-medium text-gray-900 dark:text-white">{r.unit.code}</td>
                  <td className="px-3 py-2 text-xs text-gray-500">{r.competence}</td>
                  <td className="px-3 py-2 text-xs text-gray-500 text-right">{r.previousValue.toFixed(2)}</td>
                  <td className="px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 text-right">{r.currentValue.toFixed(2)}</td>
                  <td className="px-3 py-2 text-xs font-bold text-gray-900 dark:text-white text-right">{r.consumption.toFixed(2)}</td>
                  <td className="px-3 py-2 text-xs text-gray-500">{r.readerName || "-"}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-500"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex justify-end">
                      <EditReadingSheet reading={r} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
