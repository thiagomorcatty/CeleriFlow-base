"use client";

import { FormEvent, useState } from "react";
import { Pencil, Plus, PowerOff, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { createObra, inactivateObra, updateObra } from "../actions";

type Obra = {
  id: string;
  numero: string;
  nome: string;
  descricao: string | null;
  local: string | null;
  tipo: string;
  valorEstimado: number | null;
  status: string;
  active: boolean;
};

const tipos = ["Construção", "Reforma", "Pavimentação", "Drenagem", "Iluminação"];
const statusOptions = ["Em Planejamento", "Em Execução", "Concluída", "Paralisada"];
const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const fieldClass = "w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white";

function ObraSheet({ obra, open, onOpenChange }: { obra?: Obra; open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const valorEstimadoValue = String(formData.get("valorEstimado") ?? "");
    const valorEstimado = Number(valorEstimadoValue);
    if (!valorEstimadoValue || !Number.isFinite(valorEstimado) || valorEstimado < 0) {
      setError("Informe um valor estimado válido.");
      return;
    }

    setSaving(true);
    const data = {
      numero: String(formData.get("numero") ?? ""),
      nome: String(formData.get("nome") ?? ""),
      descricao: String(formData.get("descricao") ?? ""),
      local: String(formData.get("local") ?? ""),
      tipo: String(formData.get("tipo") ?? ""),
      valorEstimado,
    };
    const result = obra
      ? await updateObra(obra.id, { ...data, status: String(formData.get("status") ?? "") })
      : await createObra(data);

    if (result.error) {
      setError(result.error);
    } else {
      onOpenChange(false);
      router.refresh();
    }
    setSaving(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) setError("");
    onOpenChange(nextOpen);
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{obra ? "Editar obra" : "Nova obra"}</SheetTitle>
          <SheetDescription>{obra ? "Atualize os dados e o status da obra." : "Cadastre uma nova obra ou projeto."}</SheetDescription>
        </SheetHeader>
        <form key={`${obra?.id ?? "new"}-${open}`} onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</div>}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Número"><input name="numero" required defaultValue={obra?.numero} className={fieldClass} /></Field>
            <Field label="Tipo"><select name="tipo" required defaultValue={obra?.tipo ?? ""} className={fieldClass}><option value="">Selecione...</option>{tipos.map((tipo) => <option key={tipo}>{tipo}</option>)}</select></Field>
          </div>
          <Field label="Nome"><input name="nome" required defaultValue={obra?.nome} className={fieldClass} /></Field>
          <Field label="Local"><input name="local" defaultValue={obra?.local ?? ""} className={fieldClass} /></Field>
          <Field label="Descrição"><textarea name="descricao" defaultValue={obra?.descricao ?? ""} rows={3} className={`${fieldClass} resize-none`} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Valor estimado (R$)"><input name="valorEstimado" type="number" min="0" step="0.01" required defaultValue={obra?.valorEstimado ?? ""} className={fieldClass} /></Field>
            {obra && <Field label="Status"><select name="status" required defaultValue={obra.status} className={fieldClass}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></Field>}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => handleOpenChange(false)} className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">Cancelar</button>
            <button type="submit" disabled={saving} className="rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50">{saving ? "Salvando..." : "Salvar"}</button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-200"><span>{label}</span>{children}</label>;
}

export function ObrasProjetosClient({ obras }: { obras: Obra[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [active, setActive] = useState("Todos");
  const [newOpen, setNewOpen] = useState(false);
  const [editing, setEditing] = useState<Obra | null>(null);
  const [actionError, setActionError] = useState("");
  const [inactivatingId, setInactivatingId] = useState<string | null>(null);

  const query = search.trim().toLocaleLowerCase("pt-BR");
  const filteredObras = obras.filter((obra) => {
    const matchesSearch = !query || [obra.numero, obra.nome, obra.descricao, obra.local].some((value) => value?.toLocaleLowerCase("pt-BR").includes(query));
    return matchesSearch && (tipo === "Todos" || obra.tipo === tipo) && (status === "Todos" || obra.status === status) && (active === "Todos" || obra.active === (active === "Ativas"));
  });

  async function handleInactivate(obra: Obra) {
    if (!confirm(`Inativar a obra ${obra.numero}?`)) return;
    setActionError("");
    setInactivatingId(obra.id);
    const result = await inactivateObra(obra.id);
    if (result.error) {
      setActionError(result.error);
    } else {
      router.refresh();
    }
    setInactivatingId(null);
  }

  return (
    <>
      <div className="mb-4 flex justify-end"><button type="button" onClick={() => setNewOpen(true)} className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-700"><Plus className="h-4 w-4" />Nova obra</button></div>
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50 md:flex-row md:p-6">
          <div className="relative w-full md:max-w-sm"><Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por número, nome ou local..." className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-slate-900 outline-none transition-all focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white" /></div>
          <div className="grid w-full gap-2 sm:grid-cols-3 md:w-auto"><Filter value={tipo} onChange={setTipo} options={["Todos", ...tipos]} label="Tipo" /><Filter value={status} onChange={setStatus} options={["Todos", ...statusOptions]} label="Status" /><Filter value={active} onChange={setActive} options={["Todos", "Ativas", "Inativas"]} label="Situação" /></div>
        </div>
        {actionError && <div className="mx-4 mt-4 rounded-md bg-red-100 p-3 text-sm text-red-700 md:mx-6">{actionError}</div>}
        <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400"><th className="px-6 py-4 font-medium">Obra</th><th className="px-6 py-4 font-medium">Tipo</th><th className="px-6 py-4 font-medium">Status</th><th className="px-6 py-4 font-medium">Valor estimado</th><th className="px-6 py-4 font-medium">Situação</th><th className="px-6 py-4 text-right font-medium">Ações</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {filteredObras.map((obra) => <tr key={obra.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="px-6 py-4"><div className="font-semibold text-slate-900 dark:text-white">{obra.nome}</div><div className="mt-1 text-xs text-slate-500">Nº {obra.numero}{obra.local ? ` · ${obra.local}` : ""}</div>{obra.descricao && <div className="mt-1 max-w-sm truncate text-xs text-slate-500">{obra.descricao}</div>}</td><td className="px-6 py-4"><span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-900/30">{obra.tipo}</span></td><td className="px-6 py-4"><StatusBadge status={obra.status} /></td><td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">{obra.valorEstimado === null ? "Não informado" : money.format(obra.valorEstimado)}</td><td className="px-6 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${obra.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{obra.active ? "Ativa" : "Inativa"}</span></td><td className="px-6 py-4"><div className="flex justify-end gap-1"><button type="button" onClick={() => setEditing(obra)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600" title="Editar"><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => handleInactivate(obra)} disabled={!obra.active || inactivatingId === obra.id} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40" title="Inativar">{inactivatingId === obra.id ? "..." : <PowerOff className="h-4 w-4" />}</button></div></td></tr>)}
          {filteredObras.length === 0 && <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">Nenhuma obra encontrada.</td></tr>}
        </tbody></table></div>
      </div>
      <ObraSheet open={newOpen} onOpenChange={setNewOpen} />
      {editing && <ObraSheet obra={editing} open onOpenChange={(open) => { if (!open) setEditing(null); }} />}
    </>
  );
}

function Filter({ value, onChange, options, label }: { value: string; onChange: (value: string) => void; options: string[]; label: string }) {
  return <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">{options.map((option) => <option key={option}>{option}</option>)}</select>;
}

function StatusBadge({ status }: { status: string }) {
  const color = status === "Concluída" ? "bg-emerald-500" : status === "Em Execução" ? "bg-amber-500" : status === "Paralisada" ? "bg-red-500" : "bg-blue-500";
  return <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300"><span className={`h-2 w-2 rounded-full ${color}`} />{status}</span>;
}
