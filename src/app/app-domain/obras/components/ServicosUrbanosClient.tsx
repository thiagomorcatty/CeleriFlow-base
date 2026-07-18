"use client";

import { useState, type FormEvent } from "react";
import type { ObrasServico } from "@prisma/client";
import { CheckCircle2, Clock, MapPin, Pencil, Plus, Power, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { createServico, inactivateServico, updateServico } from "../actions";

type SheetMode = "create" | "edit" | null;

const serviceStatuses = ["Aberto", "Em Andamento", "Concluído", "Cancelado"];
const inputClassName = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white";

function statusClassName(status: string) {
  if (status === "Concluído") return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800";
  if (status === "Em Andamento") return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800";
  if (status === "Cancelado") return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:border-rose-800";
  return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300";
}

export function ServicosUrbanosClient({ servicos }: { servicos: ObrasServico[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sheetMode, setSheetMode] = useState<SheetMode>(null);
  const [editingServico, setEditingServico] = useState<ObrasServico | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [inactivatingId, setInactivatingId] = useState<string | null>(null);

  const types = Array.from(new Set(servicos.map((servico) => servico.tipo))).sort();
  const statuses = Array.from(new Set(servicos.map((servico) => servico.status))).sort();
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const filteredServicos = servicos.filter((servico) => {
    const matchesQuery = !normalizedQuery || [servico.protocolo, servico.tipo, servico.descricao, servico.local]
      .some((value) => value.toLocaleLowerCase("pt-BR").includes(normalizedQuery));
    const matchesType = typeFilter === "all" || servico.tipo === typeFilter;
    const matchesStatus = statusFilter === "all" || servico.status === statusFilter;
    const matchesActive = activeFilter === "all" || (activeFilter === "active" ? servico.active : !servico.active);

    return matchesQuery && matchesType && matchesStatus && matchesActive;
  });

  function closeSheet() {
    setSheetMode(null);
    setEditingServico(null);
    setFormError(null);
  }

  function openCreateSheet() {
    setEditingServico(null);
    setFormError(null);
    setSheetMode("create");
  }

  function openEditSheet(servico: ObrasServico) {
    setEditingServico(servico);
    setFormError(null);
    setSheetMode("edit");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      protocolo: formData.get("protocolo") as string,
      tipo: formData.get("tipo") as string,
      descricao: formData.get("descricao") as string,
      local: formData.get("local") as string,
    };

    try {
      const result = sheetMode === "edit" && editingServico
        ? await updateServico(editingServico.id, { ...data, status: formData.get("status") as string })
        : await createServico(data);

      if (result.error) {
        setFormError(result.error);
        return;
      }

      closeSheet();
      router.refresh();
    } catch {
      setFormError(sheetMode === "edit" ? "Não foi possível atualizar o serviço." : "Não foi possível cadastrar o serviço.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleInactivate(servico: ObrasServico) {
    if (!window.confirm(`Inativar o serviço ${servico.protocolo}?`)) return;

    setActionError(null);
    setInactivatingId(servico.id);
    try {
      const result = await inactivateServico(servico.id);
      if (result.error) {
        setActionError(result.error);
        return;
      }
      router.refresh();
    } catch {
      setActionError("Não foi possível inativar o serviço.");
    } finally {
      setInactivatingId(null);
    }
  }

  const isEditing = sheetMode === "edit" && editingServico !== null;
  const formStatuses = isEditing && !serviceStatuses.includes(editingServico.status)
    ? [...serviceStatuses, editingServico.status]
    : serviceStatuses;

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Serviços Urbanos</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestão de zeladoria da cidade, vias, praças e cemitérios municipais.</p>
        </div>
        <button type="button" onClick={openCreateSheet} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-emerald-700">
          <Plus className="h-4 w-4" />
          Novo Serviço
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50 md:p-6 lg:flex-row">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Buscar por protocolo, serviço ou local..." className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-slate-900 outline-none transition-all focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
          </div>
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 lg:w-auto">
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} aria-label="Filtrar por tipo" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">
              <option value="all">Todos os tipos</option>
              {types.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filtrar por status" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">
              <option value="all">Todos os status</option>
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <select value={activeFilter} onChange={(event) => setActiveFilter(event.target.value)} aria-label="Filtrar por situação" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">
              <option value="all">Ativos e inativos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </div>

        {actionError && <p role="alert" className="border-b border-rose-200 bg-rose-50 px-6 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">{actionError}</p>}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <th className="px-6 py-4 font-medium">Serviço</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Localização</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Situação</th>
                <th className="px-6 py-4 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-700">
              {filteredServicos.map((servico) => (
                <tr key={servico.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{servico.descricao}</div>
                    <div className="mt-1 text-xs text-slate-500">Protocolo: {servico.protocolo}</div>
                  </td>
                  <td className="px-6 py-4"><span className="inline-flex rounded-md border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-800 dark:bg-cyan-900/30">{servico.tipo}</span></td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300"><div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-slate-400" />{servico.local}</div></td>
                  <td className="px-6 py-4"><span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${statusClassName(servico.status)}`}>{servico.status === "Concluído" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}{servico.status}</span></td>
                  <td className="px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${servico.active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>{servico.active ? "Ativo" : "Inativo"}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => openEditSheet(servico)} className="rounded-md p-2 text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/30" title="Editar serviço" aria-label={`Editar ${servico.protocolo}`}><Pencil className="h-4 w-4" /></button>
                      {servico.active && <button type="button" onClick={() => handleInactivate(servico)} disabled={inactivatingId === servico.id} className="rounded-md p-2 text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-rose-900/30" title="Inativar serviço" aria-label={`Inativar ${servico.protocolo}`}><Power className="h-4 w-4" /></button>}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredServicos.length === 0 && <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">Nenhum serviço encontrado para os filtros selecionados.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={sheetMode !== null} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent side="right" className="w-[400px] overflow-y-auto sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{isEditing ? "Editar Serviço" : "Novo Serviço"}</SheetTitle>
            <SheetDescription>{isEditing ? "Atualize os dados do serviço urbano." : "Registre uma nova solicitação de serviço urbano."}</SheetDescription>
          </SheetHeader>
          <form key={editingServico?.id ?? "new"} onSubmit={handleSubmit} className="space-y-4 p-4 pt-2">
            <div className="space-y-2"><label htmlFor="protocolo" className="text-sm font-medium">Protocolo</label><input id="protocolo" name="protocolo" required defaultValue={editingServico?.protocolo} className={inputClassName} placeholder="Ex.: SU-2026-001" /></div>
            <div className="space-y-2"><label htmlFor="tipo" className="text-sm font-medium">Tipo</label><input id="tipo" name="tipo" required defaultValue={editingServico?.tipo} className={inputClassName} placeholder="Ex.: Limpeza, Pavimentação ou Poda" /></div>
            <div className="space-y-2"><label htmlFor="descricao" className="text-sm font-medium">Descrição</label><textarea id="descricao" name="descricao" required rows={4} defaultValue={editingServico?.descricao} className={inputClassName} placeholder="Descreva o serviço solicitado" /></div>
            <div className="space-y-2"><label htmlFor="local" className="text-sm font-medium">Local</label><input id="local" name="local" required defaultValue={editingServico?.local} className={inputClassName} placeholder="Rua, bairro ou ponto de referência" /></div>
            {isEditing && <div className="space-y-2"><label htmlFor="status" className="text-sm font-medium">Status</label><select id="status" name="status" required defaultValue={editingServico.status} className={inputClassName}>{formStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></div>}
            {formError && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">{formError}</p>}
            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={closeSheet} disabled={submitting} className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">Cancelar</button>
              <button type="submit" disabled={submitting} className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50">{submitting ? "Salvando..." : isEditing ? "Salvar alterações" : "Cadastrar serviço"}</button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
