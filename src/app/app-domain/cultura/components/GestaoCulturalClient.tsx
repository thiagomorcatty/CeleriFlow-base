"use client";

import { useDeferredValue, useState } from "react";
import { Landmark, MapPin, Search, Users } from "lucide-react";

type RecordKind = "Agente" | "Espaço" | "Patrimônio";

export type CulturalRecord = {
  id: string;
  kind: RecordKind;
  name: string;
  classification: string;
  status: string;
  active: boolean;
  references: { label: string; value: string }[];
};

function KindIcon({ kind }: { kind: RecordKind }) {
  if (kind === "Agente") return <Users className="h-3.5 w-3.5" />;
  if (kind === "Espaço") return <MapPin className="h-3.5 w-3.5" />;
  return <Landmark className="h-3.5 w-3.5" />;
}

function kindClasses(kind: RecordKind) {
  if (kind === "Agente") return "border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-800 dark:bg-pink-950/40 dark:text-pink-300";
  if (kind === "Espaço") return "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300";
  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300";
}

function RecordReferences({ references }: { references: CulturalRecord["references"] }) {
  return (
    <dl className="space-y-1.5">
      {references.map((reference) => (
        <div key={reference.label}>
          <dt className="inline text-xs font-semibold text-slate-500 dark:text-slate-400">{reference.label}: </dt>
          <dd className="inline text-xs text-slate-700 dark:text-slate-200">{reference.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function GestaoCulturalClient({ records }: { records: CulturalRecord[] }) {
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<RecordKind | "Todos">("Todos");
  const deferredSearch = useDeferredValue(search.trim().toLocaleLowerCase("pt-BR"));
  const filteredRecords = records.filter((record) => {
    const matchesKind = kind === "Todos" || record.kind === kind;
    const searchText = [record.name, record.classification, record.status, ...record.references.map((reference) => reference.value)]
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    return matchesKind && (!deferredSearch || searchText.includes(deferredSearch));
  });

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/50 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nome, referência ou status..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="cultural-record-kind" className="text-sm font-medium text-slate-600 dark:text-slate-300">Tipo</label>
          <select
            id="cultural-record-kind"
            value={kind}
            onChange={(event) => setKind(event.target.value as RecordKind | "Todos")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
          >
            <option value="Todos">Todos</option>
            <option value="Agente">Agentes</option>
            <option value="Espaço">Espaços</option>
            <option value="Patrimônio">Patrimônio</option>
          </select>
        </div>
      </div>

      <div className="border-b border-slate-100 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        {filteredRecords.length} registro{filteredRecords.length !== 1 ? "s" : ""} encontrado{filteredRecords.length !== 1 ? "s" : ""}
      </div>

      {filteredRecords.length === 0 ? (
        <div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">Nenhum registro cultural encontrado para os filtros informados.</div>
      ) : (
        <>
          <div className="divide-y divide-slate-100 dark:divide-slate-700 lg:hidden">
            {filteredRecords.map((record) => (
              <article key={`${record.kind}-${record.id}`} className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">{record.name}</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{record.classification}</p>
                  </div>
                  <span className={`inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium ${kindClasses(record.kind)}`}><KindIcon kind={record.kind} />{record.kind}</span>
                </div>
                <RecordReferences references={record.references} />
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${record.active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>{record.status}</span>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Registro</th>
                  <th className="px-5 py-3 font-semibold">Tipo</th>
                  <th className="px-5 py-3 font-semibold">Classificação</th>
                  <th className="px-5 py-3 font-semibold">Referências integradas</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-700">
                {filteredRecords.map((record) => (
                  <tr key={`${record.kind}-${record.id}`} className="align-top transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-700/30">
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">{record.name}</td>
                    <td className="px-5 py-4"><span className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium ${kindClasses(record.kind)}`}><KindIcon kind={record.kind} />{record.kind}</span></td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{record.classification}</td>
                    <td className="max-w-md px-5 py-4"><RecordReferences references={record.references} /></td>
                    <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${record.active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>{record.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
