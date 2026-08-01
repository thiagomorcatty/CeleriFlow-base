"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoneyInput } from "@/components/ui/MoneyInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { actionCreateAnnualBudgetLaw, actionCreateBudgetAppropriationFromFixation, actionCreateBudgetGuideline, actionCreateMultiYearPlan } from "../planejamento-actions";

type Option = { id: string; code: string; name: string };
type Fixation = {
  id: string;
  code: string;
  name: string;
  fixedValue: number;
  allocatedValue: number;
  annualBudgetLaw: { lawNumber: string; financialYear: number };
  plan: { code: string; name: string };
};
type Plan = { id: string; code: string; name: string; startYear: number; endYear: number; guidelines: { id: string; financialYear: { year: number; status: string }; laws: { id: string; lawNumber: string; publicationDate: string }[] }[] };
type FinancialYear = { id: string; year: number; status: string };

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function PlanejamentoClient({ plans, financialYears, fixations, budgetUnits, expenseNatures, resourceSources, canEdit }: {
  plans: Plan[];
  financialYears: FinancialYear[];
  fixations: Fixation[];
  budgetUnits: Option[];
  expenseNatures: Option[];
  resourceSources: Option[];
  canEdit: boolean;
}) {
  const [form, setForm] = useState({ annualBudgetExpenseFixationId: "", code: "", budgetUnitId: "", expenseNatureId: "", resourceSourceId: "", initialValue: 0 });
  const [planForm, setPlanForm] = useState({ code: "", name: "", startYear: "", endYear: "", description: "" });
  const [guidelineForm, setGuidelineForm] = useState({ multiYearPlanId: "", financialYearId: "" });
  const [lawForm, setLawForm] = useState({ budgetGuidelineId: "", financialYearId: "", lawNumber: "", publicationDate: "", totalValue: 0, revenueCode: "", revenueName: "", expenseCode: "", expenseName: "" });
  const [pending, setPending] = useState(false);
  const selectedFixation = fixations.find((fixation) => fixation.id === form.annualBudgetExpenseFixationId);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    const result = await actionCreateBudgetAppropriationFromFixation(form);
    setPending(false);
    if (result.error) return alert(result.error);
    setForm({ annualBudgetExpenseFixationId: "", code: "", budgetUnitId: "", expenseNatureId: "", resourceSourceId: "", initialValue: 0 });
  };

  const submitPlan = async (event: React.FormEvent) => {
    event.preventDefault(); setPending(true);
    const result = await actionCreateMultiYearPlan({ ...planForm, startYear: Number(planForm.startYear), endYear: Number(planForm.endYear), description: planForm.description || undefined });
    setPending(false); if (result.error) return alert(result.error);
    setPlanForm({ code: "", name: "", startYear: "", endYear: "", description: "" });
  };
  const submitGuideline = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!guidelineForm.multiYearPlanId || !guidelineForm.financialYearId) return alert("Selecione o PPA e o exercício da LDO.");
    setPending(true);
    const result = await actionCreateBudgetGuideline(guidelineForm);
    setPending(false); if (result.error) return alert(result.error);
    setGuidelineForm({ multiYearPlanId: "", financialYearId: "" });
  };
  const submitLaw = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!lawForm.budgetGuidelineId || !lawForm.financialYearId) return alert("Selecione a LDO e o exercício da LOA.");
    setPending(true);
    const result = await actionCreateAnnualBudgetLaw({
      budgetGuidelineId: lawForm.budgetGuidelineId,
      financialYearId: lawForm.financialYearId,
      lawNumber: lawForm.lawNumber,
      publicationDate: lawForm.publicationDate,
      totalRevenue: lawForm.totalValue,
      totalExpense: lawForm.totalValue,
      revenueForecasts: [{ code: lawForm.revenueCode, name: lawForm.revenueName, estimatedValue: lawForm.totalValue }],
      expenseFixations: [{ code: lawForm.expenseCode, name: lawForm.expenseName, fixedValue: lawForm.totalValue }],
    });
    setPending(false); if (result.error) return alert(result.error);
    setLawForm({ budgetGuidelineId: "", financialYearId: "", lawNumber: "", publicationDate: "", totalValue: 0, revenueCode: "", revenueName: "", expenseCode: "", expenseName: "" });
  };

  return <div className="space-y-6 p-8 pt-6">
    <div>
      <h2 className="text-3xl font-bold tracking-tight">Planejamento Orçamentário</h2>
      <p className="text-muted-foreground">Rastreabilidade do PPA até a LOA e suas dotações orçamentárias.</p>
    </div>

    <Card>
      <CardHeader><CardTitle>Cadeia Legislativa</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {plans.length === 0 && <p className="text-sm text-muted-foreground">Nenhum PPA cadastrado.</p>}
        {plans.map((plan) => <div key={plan.id} className="rounded-md border p-4">
          <p className="font-semibold">{plan.code} - {plan.name} ({plan.startYear}-{plan.endYear})</p>
          {plan.guidelines.length === 0 && <p className="mt-1 text-sm text-muted-foreground">Sem LDO vinculada.</p>}
          {plan.guidelines.map((guideline) => <div key={guideline.id} className="mt-2 border-l-2 pl-3 text-sm"><span className="font-medium">LDO {guideline.financialYear.year}</span> <span className="text-muted-foreground">({guideline.financialYear.status})</span>{guideline.laws.length === 0 ? <p className="text-muted-foreground">Sem LOA vinculada.</p> : guideline.laws.map((law) => <p key={law.id}>LOA {law.lawNumber} publicada em {new Date(law.publicationDate).toLocaleDateString("pt-BR")}</p>)}</div>)}
        </div>)}
      </CardContent>
    </Card>

    {canEdit && <div className="grid gap-4 xl:grid-cols-3">
      <Card><CardHeader><CardTitle>Novo PPA</CardTitle></CardHeader><CardContent><form onSubmit={submitPlan} className="space-y-3"><Input required placeholder="Código" value={planForm.code} onChange={(event) => setPlanForm({ ...planForm, code: event.target.value })} /><Input required placeholder="Nome" value={planForm.name} onChange={(event) => setPlanForm({ ...planForm, name: event.target.value })} /><div className="grid grid-cols-2 gap-3"><Input required type="number" placeholder="Ano inicial" value={planForm.startYear} onChange={(event) => setPlanForm({ ...planForm, startYear: event.target.value })} /><Input required type="number" placeholder="Ano final" value={planForm.endYear} onChange={(event) => setPlanForm({ ...planForm, endYear: event.target.value })} /></div><Input placeholder="Descrição (opcional)" value={planForm.description} onChange={(event) => setPlanForm({ ...planForm, description: event.target.value })} /><Button type="submit" disabled={pending}>{pending ? "Salvando..." : "Criar PPA"}</Button></form></CardContent></Card>
      <Card><CardHeader><CardTitle>Nova LDO</CardTitle></CardHeader><CardContent><form onSubmit={submitGuideline} className="space-y-3"><Select value={guidelineForm.multiYearPlanId} onValueChange={(value) => setGuidelineForm({ ...guidelineForm, multiYearPlanId: value ?? "" })}><SelectTrigger><SelectValue placeholder="PPA" /></SelectTrigger><SelectContent>{plans.map((plan) => <SelectItem key={plan.id} value={plan.id}>{plan.code} - {plan.name}</SelectItem>)}</SelectContent></Select><Select value={guidelineForm.financialYearId} onValueChange={(value) => setGuidelineForm({ ...guidelineForm, financialYearId: value ?? "" })}><SelectTrigger><SelectValue placeholder="Exercício" /></SelectTrigger><SelectContent>{financialYears.map((year) => <SelectItem key={year.id} value={year.id}>{year.year} ({year.status})</SelectItem>)}</SelectContent></Select><Button type="submit" disabled={pending}>{pending ? "Salvando..." : "Criar LDO"}</Button></form></CardContent></Card>
      <Card><CardHeader><CardTitle>Nova LOA</CardTitle></CardHeader><CardContent><form onSubmit={submitLaw} className="space-y-3"><Select value={lawForm.budgetGuidelineId} onValueChange={(value) => setLawForm({ ...lawForm, budgetGuidelineId: value ?? "" })}><SelectTrigger><SelectValue placeholder="LDO" /></SelectTrigger><SelectContent>{plans.flatMap((plan) => plan.guidelines).map((guideline) => <SelectItem key={guideline.id} value={guideline.id}>LDO {guideline.financialYear.year}</SelectItem>)}</SelectContent></Select><Select value={lawForm.financialYearId} onValueChange={(value) => setLawForm({ ...lawForm, financialYearId: value ?? "" })}><SelectTrigger><SelectValue placeholder="Exercício" /></SelectTrigger><SelectContent>{financialYears.map((year) => <SelectItem key={year.id} value={year.id}>{year.year} ({year.status})</SelectItem>)}</SelectContent></Select><Input required placeholder="Número da lei" value={lawForm.lawNumber} onChange={(event) => setLawForm({ ...lawForm, lawNumber: event.target.value })} /><Input required type="date" value={lawForm.publicationDate} onChange={(event) => setLawForm({ ...lawForm, publicationDate: event.target.value })} /><MoneyInput value={lawForm.totalValue} onChange={(totalValue) => setLawForm({ ...lawForm, totalValue })} /><Input required placeholder="Código da receita" value={lawForm.revenueCode} onChange={(event) => setLawForm({ ...lawForm, revenueCode: event.target.value })} /><Input required placeholder="Nome da receita" value={lawForm.revenueName} onChange={(event) => setLawForm({ ...lawForm, revenueName: event.target.value })} /><Input required placeholder="Código da fixação" value={lawForm.expenseCode} onChange={(event) => setLawForm({ ...lawForm, expenseCode: event.target.value })} /><Input required placeholder="Nome da fixação" value={lawForm.expenseName} onChange={(event) => setLawForm({ ...lawForm, expenseName: event.target.value })} /><Button type="submit" disabled={pending}>{pending ? "Salvando..." : "Criar LOA"}</Button></form></CardContent></Card>
    </div>}

    {canEdit && <Card>
      <CardHeader><CardTitle>Nova Dotação a Partir da LOA</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="space-y-2 xl:col-span-2"><Label>Fixação de despesa da LOA</Label><Select value={form.annualBudgetExpenseFixationId} onValueChange={(value) => setForm({ ...form, annualBudgetExpenseFixationId: value ?? "" })}><SelectTrigger><SelectValue placeholder="Selecione a fixação" /></SelectTrigger><SelectContent>{fixations.map((fixation) => <SelectItem key={fixation.id} value={fixation.id}>{fixation.annualBudgetLaw.financialYear} / {fixation.annualBudgetLaw.lawNumber} - {fixation.code} - saldo {currency.format(fixation.fixedValue - fixation.allocatedValue)}</SelectItem>)}</SelectContent></Select>{selectedFixation && <p className="text-xs text-muted-foreground">{selectedFixation.plan.code} - {selectedFixation.plan.name}: {selectedFixation.name}. Fixado {currency.format(selectedFixation.fixedValue)}, ja alocado {currency.format(selectedFixation.allocatedValue)}.</p>}</div>
          <div className="space-y-2"><Label>Código da dotação</Label><Input required value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} /></div>
          <div className="space-y-2"><Label>Unidade orçamentária</Label><Select value={form.budgetUnitId} onValueChange={(value) => setForm({ ...form, budgetUnitId: value ?? "" })}><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>{budgetUnits.map((item) => <SelectItem key={item.id} value={item.id}>{item.code} - {item.name}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label>Natureza de despesa</Label><Select value={form.expenseNatureId} onValueChange={(value) => setForm({ ...form, expenseNatureId: value ?? "" })}><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>{expenseNatures.map((item) => <SelectItem key={item.id} value={item.id}>{item.code} - {item.name}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label>Fonte de recursos</Label><Select value={form.resourceSourceId} onValueChange={(value) => setForm({ ...form, resourceSourceId: value ?? "" })}><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>{resourceSources.map((item) => <SelectItem key={item.id} value={item.id}>{item.code} - {item.name}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label>Valor inicial</Label><MoneyInput value={form.initialValue} onChange={(initialValue) => setForm({ ...form, initialValue })} /></div>
          <div className="flex items-end"><Button type="submit" disabled={pending}>{pending ? "Criando..." : "Criar dotação"}</Button></div>
        </form>
      </CardContent>
    </Card>}

    <Card>
      <CardHeader><CardTitle>Fixações e Alocações</CardTitle></CardHeader>
      <CardContent><Table><TableHeader><TableRow><TableHead>PPA</TableHead><TableHead>LOA</TableHead><TableHead>Fixação</TableHead><TableHead className="text-right">Fixado</TableHead><TableHead className="text-right">Alocado</TableHead><TableHead className="text-right">Disponível</TableHead></TableRow></TableHeader><TableBody>{fixations.length === 0 ? <TableRow><TableCell colSpan={6} className="h-20 text-center text-muted-foreground">Nenhuma fixação de despesa vinculada a um PPA/LDO/LOA.</TableCell></TableRow> : fixations.map((fixation) => <TableRow key={fixation.id}><TableCell>{fixation.plan.code}</TableCell><TableCell>{fixation.annualBudgetLaw.financialYear} / {fixation.annualBudgetLaw.lawNumber}</TableCell><TableCell>{fixation.code} - {fixation.name}</TableCell><TableCell className="text-right">{currency.format(fixation.fixedValue)}</TableCell><TableCell className="text-right">{currency.format(fixation.allocatedValue)}</TableCell><TableCell className="text-right">{currency.format(fixation.fixedValue - fixation.allocatedValue)}</TableCell></TableRow>)}</TableBody></Table></CardContent>
    </Card>
  </div>;
}
