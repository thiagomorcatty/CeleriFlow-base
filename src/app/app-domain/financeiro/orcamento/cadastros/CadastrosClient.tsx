"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createMasterData, deleteMasterData, updateMasterData } from "../actions";

type ProcurementOriginPolicy = "NONE" | "PROCUREMENT_SOURCE" | "CONTRACT";
type Item = { id: string; code: string; name: string; secretariatId?: string; secretariat?: { name: string }; procurementOriginPolicy?: ProcurementOriginPolicy };
type Type = "budgetUnit" | "resourceSource" | "revenueNature" | "expenseNature";

const labels: Record<Type, string> = {
  budgetUnit: "Unidades orçamentárias",
  resourceSource: "Fontes de recursos",
  revenueNature: "Naturezas de receita",
  expenseNature: "Naturezas de despesa",
};

export default function CadastrosClient({ secretariats, budgetUnits, resourceSources, revenueNatures, expenseNatures }: { secretariats: { id: string; name: string }[]; budgetUnits: Item[]; resourceSources: Item[]; revenueNatures: Item[]; expenseNatures: Item[] }) {
  const [type, setType] = useState<Type>("budgetUnit");
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState<{ code: string; name: string; secretariatId: string; procurementOriginPolicy: ProcurementOriginPolicy }>({ code: "", name: "", secretariatId: "", procurementOriginPolicy: "NONE" });
  const [pending, setPending] = useState(false);
  const items = type === "budgetUnit" ? budgetUnits : type === "resourceSource" ? resourceSources : type === "revenueNature" ? revenueNatures : expenseNatures;

  const reset = () => { setEditing(null); setForm({ code: "", name: "", secretariatId: "", procurementOriginPolicy: "NONE" }); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    const result = editing ? await updateMasterData(type, editing.id, form) : await createMasterData(type, form);
    setPending(false);
    if (result.error) return alert(result.error);
    reset();
  };
  const edit = (item: Item) => { setEditing(item); setForm({ code: item.code, name: item.name, secretariatId: item.secretariatId ?? "", procurementOriginPolicy: item.procurementOriginPolicy ?? "NONE" }); };
  const remove = async (id: string) => {
    if (!window.confirm("Excluir este cadastro? Registros vinculados impedirão a exclusão.")) return;
    const result = await deleteMasterData(type, id);
    if (result.error) alert(result.error);
  };

  return <div className="space-y-6 p-8 pt-6">
    <div><h2 className="text-3xl font-bold tracking-tight">Cadastros Orçamentários</h2><p className="text-muted-foreground">Estruturas administrativas e classificações da LOA.</p></div>
    <div className="flex flex-wrap gap-2">{(Object.keys(labels) as Type[]).map(key => <Button key={key} variant={type === key ? "default" : "outline"} onClick={() => { setType(key); reset(); }}>{labels[key]}</Button>)}</div>
    <Card><CardHeader><CardTitle>{editing ? `Editar ${labels[type].slice(0, -1)}` : `Novo cadastro: ${labels[type]}`}</CardTitle></CardHeader><CardContent>
      <form onSubmit={submit} className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2"><Label>Código</Label><Input required value={form.code} onChange={event => setForm({ ...form, code: event.target.value })} /></div>
         <div className="space-y-2 md:col-span-2"><Label>Nome</Label><Input required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} /></div>
         {type === "budgetUnit" && <div className="space-y-2"><Label>Secretaria</Label><Select value={form.secretariatId} onValueChange={value => setForm({ ...form, secretariatId: value ?? "" })}><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>{secretariats.map(secretariat => <SelectItem key={secretariat.id} value={secretariat.id}>{secretariat.name}</SelectItem>)}</SelectContent></Select></div>}
         {type === "expenseNature" && <div className="space-y-2"><Label>Origem da contratação</Label><Select value={form.procurementOriginPolicy} onValueChange={value => setForm({ ...form, procurementOriginPolicy: value as ProcurementOriginPolicy })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="NONE">Sem exigência</SelectItem><SelectItem value="PROCUREMENT_SOURCE">Exigir origem de contratação</SelectItem><SelectItem value="CONTRACT">Exigir contrato</SelectItem></SelectContent></Select></div>}
        <div className="flex items-end gap-2"><Button type="submit" disabled={pending}>{editing ? <Pencil className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}{pending ? "Salvando..." : editing ? "Atualizar" : "Adicionar"}</Button>{editing && <Button type="button" variant="outline" onClick={reset}>Cancelar</Button>}</div>
      </form>
    </CardContent></Card>
    <Card><CardContent className="pt-6"><Table><TableHeader><TableRow><TableHead>Código</TableHead><TableHead>Nome</TableHead>{type === "budgetUnit" && <TableHead>Secretaria</TableHead>}{type === "expenseNature" && <TableHead>Origem da contratação</TableHead>}<TableHead className="text-right">Ações</TableHead></TableRow></TableHeader><TableBody>{items.map(item => <TableRow key={item.id}><TableCell>{item.code}</TableCell><TableCell>{item.name}</TableCell>{type === "budgetUnit" && <TableCell>{item.secretariat?.name}</TableCell>}{type === "expenseNature" && <TableCell>{item.procurementOriginPolicy === "CONTRACT" ? "Contrato" : item.procurementOriginPolicy === "PROCUREMENT_SOURCE" ? "Origem de contratação" : "Sem exigência"}</TableCell>}<TableCell className="text-right"><Button variant="ghost" size="icon" onClick={() => edit(item)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4 text-rose-600" /></Button></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
  </div>;
}
