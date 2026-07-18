"use client";

import { useMemo, useState } from "react";
import { Filter, Globe, Pencil, PowerOff, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { inactivatePortalRequest, updatePortalRequest } from "../actions";

type PortalRequest = {
  id: string;
  requestType: string;
  requesterName: string;
  requestedAt: string;
  source: string;
  status: string;
  active: boolean;
};

export function PortalClient({ requests }: { requests: PortalRequest[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [editingRequest, setEditingRequest] = useState<PortalRequest | null>(null);
  const [saving, setSaving] = useState(false);

  const statuses = useMemo(
    () => ["Todos", ...Array.from(new Set(requests.map((request) => request.status)))],
    [requests]
  );

  const filteredRequests = useMemo(() => {
    const query = search.toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        !query ||
        request.requestType.toLowerCase().includes(query) ||
        request.requesterName.toLowerCase().includes(query) ||
        request.source.toLowerCase().includes(query) ||
        request.status.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "Todos" || request.status === statusFilter;
      const matchesActive =
        activeFilter === "Todos" ||
        (activeFilter === "Ativas" && request.active) ||
        (activeFilter === "Inativas" && !request.active);

      return matchesSearch && matchesStatus && matchesActive;
    });
  }, [activeFilter, requests, search, statusFilter]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingRequest) return;

    setSaving(true);
    const formData = new FormData(event.currentTarget);

    try {
      const result = await updatePortalRequest(editingRequest.id, {
        requestType: formData.get("requestType") as string,
        requesterName: formData.get("requesterName") as string,
        requestedAt: formData.get("requestedAt") as string,
        source: formData.get("source") as string,
        status: formData.get("status") as string,
      });

      if (result.error) {
        alert(result.error);
        return;
      }

      setEditingRequest(null);
    } catch {
      alert("Erro ao atualizar solicitação.");
    } finally {
      setSaving(false);
    }
  }

  async function handleInactivate(request: PortalRequest) {
    if (!confirm(`Inativar a solicitação "${request.requestType}"?`)) return;

    try {
      const result = await inactivatePortalRequest(request.id);
      if (result.error) alert(result.error);
    } catch {
      alert("Erro ao inativar solicitação.");
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar solicitação, solicitante..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-60 rounded-md border py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            />
          </div>
          <div className="flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-gray-400" />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-md border px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]">
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>
          <select value={activeFilter} onChange={(event) => setActiveFilter(event.target.value)} className="rounded-md border px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]">
            <option>Todos</option>
            <option>Ativas</option>
            <option>Inativas</option>
          </select>
        </div>
        <span className="text-xs text-gray-400">{filteredRequests.length} {filteredRequests.length === 1 ? "solicitação" : "solicitações"}</span>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="p-10 text-center text-sm text-gray-400"><Globe className="mx-auto mb-3 h-10 w-10 text-gray-200" />Nenhuma solicitação encontrada.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase text-gray-500 dark:border-gray-700 dark:bg-gray-800">
              <tr><th className="px-3 py-2">Solicitação</th><th className="px-3 py-2">Solicitante</th><th className="px-3 py-2">Data</th><th className="px-3 py-2">Origem</th><th className="px-3 py-2">Status</th><th className="px-3 py-2 text-center">Situação</th><th className="px-3 py-2 text-right">Ações</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="text-xs text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/40">
                  <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">{request.requestType}</td><td className="px-3 py-2">{request.requesterName}</td><td className="px-3 py-2">{formatDate(request.requestedAt)}</td><td className="px-3 py-2">{request.source}</td><td className="px-3 py-2">{request.status}</td>
                  <td className="px-3 py-2 text-center"><span className={`rounded-full px-1.5 py-0.5 text-xs font-medium ${request.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{request.active ? "Ativa" : "Inativa"}</span></td>
                  <td className="px-3 py-2"><div className="flex items-center justify-end gap-1"><button onClick={() => setEditingRequest(request)} className="rounded p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-[#0284C7]" title="Editar solicitação"><Pencil className="h-3.5 w-3.5" /></button><button onClick={() => handleInactivate(request)} disabled={!request.active} className="rounded p-1.5 text-slate-400 transition-colors hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40" title="Inativar solicitação"><PowerOff className="h-3.5 w-3.5" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Sheet open={editingRequest !== null} onOpenChange={(open) => !open && setEditingRequest(null)}>
        <SheetContent side="right" className="w-[400px] overflow-y-auto sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Editar Solicitação</SheetTitle>
            <SheetDescription>Atualize os dados da solicitação do portal.</SheetDescription>
          </SheetHeader>
          {editingRequest && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field label="Solicitação"><input name="requestType" required defaultValue={editingRequest.requestType} className="w-full rounded-md border p-2 text-sm" /></Field>
              <Field label="Solicitante"><input name="requesterName" required defaultValue={editingRequest.requesterName} className="w-full rounded-md border p-2 text-sm" /></Field>
              <Field label="Data"><input type="date" name="requestedAt" required defaultValue={editingRequest.requestedAt} className="w-full rounded-md border p-2 text-sm" /></Field>
              <Field label="Origem"><input name="source" required defaultValue={editingRequest.source} className="w-full rounded-md border p-2 text-sm" /></Field>
              <Field label="Status"><input name="status" required defaultValue={editingRequest.status} className="w-full rounded-md border p-2 text-sm" /></Field>
              <div className="flex justify-end gap-2 pt-4"><button type="button" onClick={() => setEditingRequest(null)} className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">Cancelar</button><button type="submit" disabled={saving} className="rounded-md bg-[#0284C7] px-4 py-2 text-sm font-medium text-white hover:bg-[#0369A1] disabled:opacity-50">{saving ? "Salvando..." : "Salvar Alterações"}</button></div>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-2 text-sm font-medium"><span>{label}</span>{children}</label>;
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
