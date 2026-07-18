"use client";

import { useDeferredValue, useState } from "react";
import { CalendarDays, MapPin, Search, UserRound } from "lucide-react";

type Activity = {
  id: string;
  nome: string;
  modalidade: string;
  publicoAlvo: string | null;
  startsAt: string;
  endsAt: string | null;
  status: string;
  active: boolean;
  space: {
    nome: string;
    tipo: string;
    asset: {
      nome: string;
      patrimonio: string;
      realEstate: { inscricao: string | null; endereco: string } | null;
    } | null;
    realEstate: { inscricao: string | null; endereco: string } | null;
  } | null;
  instructorName: string | null;
  agentName: string | null;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(date));
}

export default function AtividadesEsporteLazerClient({ activities }: { activities: Activity[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const deferredSearch = useDeferredValue(search.trim().toLocaleLowerCase("pt-BR"));
  const availableStatuses = new Set(activities.map((activity) => activity.active ? activity.status : "Inativa"));
  const filteredActivities = activities.filter((activity) => {
    const displayStatus = activity.active ? activity.status : "Inativa";
    const searchContent = `${activity.nome} ${activity.modalidade} ${activity.publicoAlvo ?? ""} ${activity.space?.nome ?? ""} ${activity.instructorName ?? ""} ${activity.agentName ?? ""}`.toLocaleLowerCase("pt-BR");

    return (!deferredSearch || searchContent.includes(deferredSearch)) &&
      (!statusFilter || displayStatus === statusFilter);
  });

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por atividade, modalidade, local ou responsável..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 md:w-auto"
        >
          <option value="">Todos os status</option>
          {Array.from(availableStatuses).sort().map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {filteredActivities.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <CalendarDays className="mx-auto h-10 w-10 text-slate-400" />
          <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Nenhuma atividade encontrada</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ajuste a busca ou os filtros para visualizar os registros.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Atividade</th>
                <th className="px-6 py-4 font-medium">Público-alvo</th>
                <th className="px-6 py-4 font-medium">Período</th>
                <th className="px-6 py-4 font-medium">Espaço e patrimônio</th>
                <th className="px-6 py-4 font-medium">Responsáveis</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredActivities.map((activity) => {
                const status = activity.active ? activity.status : "Inativa";
                const realEstate = activity.space?.realEstate ?? activity.space?.asset?.realEstate;

                return (
                  <tr key={activity.id} className="align-top transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 dark:text-white">{activity.nome}</p>
                      <p className="mt-1 text-xs text-rose-700 dark:text-rose-300">{activity.modalidade}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{activity.publicoAlvo ?? "Não informado"}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      <span className="flex items-center gap-1.5 whitespace-nowrap"><CalendarDays className="h-4 w-4 text-slate-400" />{formatDate(activity.startsAt)}</span>
                      {activity.endsAt && <span className="mt-1 block text-xs text-slate-500">até {formatDate(activity.endsAt)}</span>}
                    </td>
                    <td className="px-6 py-4">
                      {activity.space ? (
                        <>
                          <p className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-white"><MapPin className="h-4 w-4 text-sky-600" />{activity.space.nome}</p>
                          <p className="mt-1 text-xs text-slate-500">{activity.space.tipo}</p>
                          {activity.space.asset && <p className="mt-1 text-xs text-slate-500">Bem: {activity.space.asset.patrimonio} · {activity.space.asset.nome}</p>}
                          {realEstate && <p className="mt-1 text-xs text-slate-500">{realEstate.endereco || realEstate.inscricao || "Imóvel vinculado"}</p>}
                        </>
                      ) : <span className="text-slate-500">Não informado</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      <p className="flex items-center gap-1.5"><UserRound className="h-4 w-4 text-slate-400" />{activity.instructorName ?? "Sem instrutor"}</p>
                      <p className="mt-1 text-xs text-slate-500">Agente: {activity.agentName ?? "Não informado"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${activity.active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"}`}>{status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
