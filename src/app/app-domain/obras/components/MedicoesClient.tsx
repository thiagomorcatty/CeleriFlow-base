"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, Calculator, Pencil, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { createMedicao, inactivateMedicao, updateMedicao } from "../actions";

type Medicao = {
  id: string;
  numero: number;
  data: string;
  valorMedido: number;
  status: string;
  active: boolean;
  obra: {
    numero: string;
    nome: string;
  };
};

type ObraOption = {
  id: string;
  numero: string;
  nome: string;
  status: string;
};

type FormData = {
  numero: number;
  data: string;
  valorMedido: number;
  obraId: string;
  status: string;
};

const measurementStatuses = ["Em Análise", "Aprovada", "Rejeitada"];

function defaultForm(obraId = ""): FormData {
  return {
    numero: 1,
    data: new Date().toISOString().slice(0, 10),
    valorMedido: 0,
    obraId,
    status: "Em Análise",
  };
}

function statusClass(status: string) {
  if (status === "Aprovada") return "bg-emerald-100 text-emerald-700";
  if (status === "Rejeitada") return "bg-rose-100 text-rose-700";
  return "bg-amber-100 text-amber-700";
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatDate(value: string) {
  return value.split("-").reverse().join("/");
}

export default function MedicoesClient({ medicoes, obras }: { medicoes: Medicao[]; obras: ObraOption[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingMedicao, setEditingMedicao] = useState<Medicao | null>(null);
  const [formData, setFormData] = useState<FormData>(() => defaultForm(obras[0]?.id));
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [inactivatingId, setInactivatingId] = useState<string | null>(null);

  const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");
  const filteredMedicoes = medicoes.filter((medicao) => {
    const matchesSearch = !normalizedSearch || [
      medicao.numero.toString(),
      medicao.obra.numero,
      medicao.obra.nome,
    ].some((value) => value.toLocaleLowerCase("pt-BR").includes(normalizedSearch));
    const matchesStatus = statusFilter === "Todos" || medicao.status === statusFilter;
    const matchesActive = activeFilter === "Todos" || (activeFilter === "Ativas" ? medicao.active : !medicao.active);

    return matchesSearch && matchesStatus && matchesActive;
  });

  function openCreateSheet() {
    setEditingMedicao(null);
    setFormData(defaultForm(obras[0]?.id));
    setFormError("");
    setSheetOpen(true);
  }

  function openEditSheet(medicao: Medicao) {
    setEditingMedicao(medicao);
    setFormData({
      numero: medicao.numero,
      data: medicao.data,
      valorMedido: medicao.valorMedido,
      obraId: "",
      status: medicao.status,
    });
    setFormError("");
    setSheetOpen(true);
  }

  function handleSheetChange(open: boolean) {
    setSheetOpen(open);
    if (!open) {
      setFormError("");
      setEditingMedicao(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setIsSaving(true);

    try {
      const result = editingMedicao
        ? await updateMedicao(editingMedicao.id, {
            numero: formData.numero,
            data: formData.data,
            valorMedido: formData.valorMedido,
            status: formData.status,
          })
        : await createMedicao({
            numero: formData.numero,
            data: formData.data,
            valorMedido: formData.valorMedido,
            obraId: formData.obraId,
          });

      if (result.error) {
        setFormError(result.error);
        return;
      }

      setSheetOpen(false);
      router.refresh();
    } catch {
      setFormError("Não foi possível salvar a medição.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleInactivate(id: string) {
    if (!window.confirm("Deseja inativar esta medição?")) return;

    setActionError("");
    setInactivatingId(id);
    try {
      const result = await inactivateMedicao(id);
      if (result.error) {
        setActionError(result.error);
        return;
      }
      router.refresh();
    } catch {
      setActionError("Não foi possível inativar a medição.");
    } finally {
      setInactivatingId(null);
    }
  }

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Medições de Obras</h1>
          <p className="text-slate-500 dark:text-slate-400">Acompanhamento financeiro das medições registradas nas obras.</p>
        </div>
        <Button onClick={openCreateSheet} disabled={obras.length === 0} className="bg-blue-600 text-white hover:bg-blue-700">
          <Plus />
          Nova medição
        </Button>
      </div>

      {obras.length === 0 && (
        <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800" role="status">
          Cadastre ou ative uma obra para registrar uma medição.
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col items-stretch justify-between gap-4 border-b border-slate-100 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50 md:flex-row md:items-center md:p-6">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por obra ou número..."
              className="h-10 border-slate-200 bg-white pl-10 dark:border-slate-600 dark:bg-slate-700"
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filtrar por status da medição"
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            >
              <option value="Todos">Todos os status</option>
              {measurementStatuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            <select
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              aria-label="Filtrar por situação da medição"
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            >
              <option value="Todos">Ativas e inativas</option>
              <option value="Ativas">Ativas</option>
              <option value="Inativas">Inativas</option>
            </select>
          </div>
        </div>

        {actionError && <p className="mx-4 mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">{actionError}</p>}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs tracking-wider text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">
                <th className="px-6 py-4 font-medium">Medição</th>
                <th className="px-6 py-4 font-medium">Obra</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium">Valor medido</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Situação</th>
                <th className="px-6 py-4 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredMedicoes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-14 text-center text-slate-500 dark:text-slate-400">
                    <Calculator className="mx-auto mb-3 size-8 opacity-30" />
                    Nenhuma medição encontrada.
                  </td>
                </tr>
              ) : filteredMedicoes.map((medicao) => (
                <tr key={medicao.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Medição nº {medicao.numero}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-white">{medicao.obra.nome}</div>
                    <div className="mt-1 text-xs text-slate-500">Código: {medicao.obra.numero}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{formatDate(medicao.data)}</td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">{formatCurrency(medicao.valorMedido)}</td>
                  <td className="px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(medicao.status)}`}>{medicao.status}</span></td>
                  <td className="px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${medicao.active ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-600"}`}>{medicao.active ? "Ativa" : "Inativa"}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEditSheet(medicao)} title="Editar medição">
                        <Pencil />
                        <span className="sr-only">Editar medição</span>
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => handleInactivate(medicao.id)} disabled={!medicao.active || inactivatingId === medicao.id} title="Inativar medição" className="text-rose-600 hover:text-rose-700">
                        <Ban />
                        <span className="sr-only">Inativar medição</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={handleSheetChange}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editingMedicao ? "Editar medição" : "Nova medição"}</SheetTitle>
            <SheetDescription>
              {editingMedicao ? "Atualize os dados da medição selecionada." : "Registre uma medição para uma obra ativa."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 px-4 pb-4">
            {formError && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{formError}</p>}
            {!editingMedicao && (
              <div className="space-y-2">
                <Label htmlFor="obraId">Obra</Label>
                <select
                  id="obraId"
                  value={formData.obraId}
                  onChange={(event) => setFormData({ ...formData, obraId: event.target.value })}
                  required
                  className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                >
                  <option value="" disabled>Selecione uma obra</option>
                  {obras.map((obra) => <option key={obra.id} value={obra.id}>{obra.numero} - {obra.nome} ({obra.status})</option>)}
                </select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numero">Número</Label>
                <Input id="numero" type="number" min="1" required value={formData.numero} onChange={(event) => setFormData({ ...formData, numero: Number(event.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input id="data" type="date" required value={formData.data} onChange={(event) => setFormData({ ...formData, data: event.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="valorMedido">Valor medido (R$)</Label>
              <Input id="valorMedido" type="number" min="0" step="0.01" required value={formData.valorMedido} onChange={(event) => setFormData({ ...formData, valorMedido: Number(event.target.value) })} />
            </div>
            {editingMedicao && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(event) => setFormData({ ...formData, status: event.target.value })}
                  className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                >
                  {measurementStatuses.map((status) => <option key={status}>{status}</option>)}
                </select>
              </div>
            )}
            <SheetFooter className="mt-auto px-0">
              <Button type="button" variant="outline" onClick={() => handleSheetChange(false)} disabled={isSaving}>Cancelar</Button>
              <Button type="submit" disabled={isSaving}>{isSaving ? "Salvando..." : editingMedicao ? "Salvar alterações" : "Cadastrar medição"}</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
