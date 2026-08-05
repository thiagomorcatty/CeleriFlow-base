"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoneyInput } from "@/components/ui/MoneyInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { approveExpenseRequestAction, cancelBudgetReservationAction, createBudgetReservationAction, createExpenseRequestAction, setFinancialYearStatusAction } from "./actions";

import { CreditRequestDialog } from "./CreditRequestDialog";
import { actionApproveCreditRequest, actionExecuteCreditRequest } from "./planejamento-actions";

type Appropriation = {
  id: string;
  code: string;
  budgetUnit: { name: string; code: string; secretariatId: string };
  expenseNature: { name: string; code: string; };
  resourceSource: { name: string; code: string; };
  initialValue: number;
  updatedValue: number;
  committedValue: number;
  reservedValue: number;
  availableValue: number;
};

type Reservation = {
  id: string;
  number: string;
  value: number;
  status: string;
  appropriation: { code: string };
};

type FinancialYear = {
  id: string;
  year: number;
  status: string;
};

type CreditRequest = {
  id: string;
  number: string;
  type: string;
  justification: string;
  totalValue: number;
  status: string;
};
type ExpenseRequest = { id: string; description: string; value: number; status: string; appropriationId: string; appropriation: { code: string }; supplier: { company?: { corporateName: string } | null; person?: { fullName: string } | null } | null };
type SupplierOption = { id: string; name: string };

export default function OrcamentoClient({
  appropriations,
  reservations,
  financialYears,
  creditRequests = [],
  expenses = [],
  suppliers = [],
  canEdit,
}: {
  appropriations: Appropriation[];
  reservations: Reservation[];
  financialYears: FinancialYear[];
  creditRequests?: CreditRequest[];
  expenses?: ExpenseRequest[];
  suppliers?: SupplierOption[];
  canEdit: boolean;
}) {
  const [reservation, setReservation] = useState({ number: "", appropriationId: "", expenseId: "", value: 0, justification: "" });
  const [expenseRequest, setExpenseRequest] = useState({ description: "", appropriationId: "", supplierId: "", value: 0 });
  const [pending, setPending] = useState(false);

  const submitReservation = async (event: React.FormEvent) => {
    event.preventDefault(); setPending(true);
    const result = await createBudgetReservationAction({ ...reservation, date: new Date() }); setPending(false);
    if (result.error) return alert(result.error);
    setReservation({ number: "", appropriationId: "", expenseId: "", value: 0, justification: "" });
  };

  const submitExpenseRequest = async (event: React.FormEvent) => {
    event.preventDefault(); setPending(true);
    const appropriation = appropriations.find((item) => item.id === expenseRequest.appropriationId);
    if (!appropriation) { setPending(false); return alert("Selecione a dotação orçamentária."); }
    const result = await createExpenseRequestAction({ ...expenseRequest, date: new Date(), secretariatId: appropriation.budgetUnit.secretariatId }); setPending(false);
    if (result.error) return alert(result.error);
    setExpenseRequest({ description: "", appropriationId: "", supplierId: "", value: 0 });
  };

  const approveExpense = async (id: string) => {
    setPending(true); const result = await approveExpenseRequestAction(id); setPending(false);
    if (result.error) alert(result.error);
  };

  const cancelReservation = async (id: string) => {
    const result = await cancelBudgetReservationAction(id);
    if (result.error) alert(result.error);
  };

  const changeYearStatus = async (id: string, status: string) => {
    const result = await setFinancialYearStatusAction(id, status);
    if (result.error) alert(result.error);
  };

  const handleApproveCredit = async (id: string) => {
    setPending(true);
    const result = await actionApproveCreditRequest(id);
    setPending(false);
    if (result.error) alert(result.error);
  };

  const handleExecuteCredit = async (id: string) => {
    setPending(true);
    const result = await actionExecuteCreditRequest(id);
    setPending(false);
    if (result.error) alert(result.error);
  };

  const activeYear = financialYears.find((y) => y.status === "Aberto") || financialYears[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orçamento e Plano de Contas</h2>
          <p className="text-muted-foreground">Gestão de dotações orçamentárias e alterações com segregação de funções</p>
        </div>
        <div className="flex items-center gap-2">
          {activeYear && canEdit && (
            <CreditRequestDialog
              financialYearId={activeYear.id}
              appropriations={appropriations}
            />
          )}
          <Link href="/financeiro/orcamento/cadastros" className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent">Cadastros Orçamentários</Link>
        </div>
      </div>

        <Card><CardHeader><CardTitle>Exercícios Financeiros</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">{financialYears.map(year => <div key={year.id} className="flex items-center justify-between rounded border p-3"><span className="font-medium">{year.year}</span>{canEdit && year.status !== "Encerrado" ? <Select value={year.status} onValueChange={status => status && changeYearStatus(year.id, status)}><SelectTrigger className="w-[190px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Preparação">Preparação</SelectItem><SelectItem value="Aberto">Aberto</SelectItem><SelectItem value="Em Encerramento">Em Encerramento</SelectItem></SelectContent></Select> : <Badge variant="outline">{year.status}</Badge>}</div>)}</CardContent></Card>

       {canEdit && <div className="grid gap-4 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>Solicitação de Despesa</CardTitle></CardHeader><CardContent><form onSubmit={submitExpenseRequest} className="grid gap-3 md:grid-cols-2"><Input required placeholder="Descrição" value={expenseRequest.description} onChange={event => setExpenseRequest({ ...expenseRequest, description: event.target.value })} /><Select value={expenseRequest.appropriationId} onValueChange={appropriationId => setExpenseRequest({ ...expenseRequest, appropriationId: appropriationId ?? "" })}><SelectTrigger><SelectValue placeholder="Dotação" /></SelectTrigger><SelectContent>{appropriations.map(app => <SelectItem key={app.id} value={app.id}>{app.code}</SelectItem>)}</SelectContent></Select><Select value={expenseRequest.supplierId} onValueChange={supplierId => setExpenseRequest({ ...expenseRequest, supplierId: supplierId ?? "" })}><SelectTrigger><SelectValue placeholder="Fornecedor" /></SelectTrigger><SelectContent>{suppliers.map(supplier => <SelectItem key={supplier.id} value={supplier.id}>{supplier.name}</SelectItem>)}</SelectContent></Select><MoneyInput value={expenseRequest.value} onChange={value => setExpenseRequest({ ...expenseRequest, value })} /><Button type="submit" disabled={pending}>Solicitar aprovação</Button></form></CardContent></Card>
        <Card><CardHeader><CardTitle>Reserva Orçamentária</CardTitle></CardHeader><CardContent><form onSubmit={submitReservation} className="grid gap-3 md:grid-cols-2"><Input required placeholder="Número da reserva" value={reservation.number} onChange={event => setReservation({ ...reservation, number: event.target.value })} /><Select value={reservation.appropriationId} onValueChange={appropriationId => setReservation({ ...reservation, appropriationId: appropriationId ?? "", expenseId: "" })}><SelectTrigger><SelectValue placeholder="Dotação" /></SelectTrigger><SelectContent>{appropriations.map(app => <SelectItem key={app.id} value={app.id}>{app.code}</SelectItem>)}</SelectContent></Select><Select value={reservation.expenseId} onValueChange={expenseId => { const expense = expenses.find(item => item.id === expenseId); setReservation({ ...reservation, expenseId: expenseId ?? "", value: expense?.value ?? reservation.value }); }}><SelectTrigger><SelectValue placeholder="Solicitação aprovada" /></SelectTrigger><SelectContent>{expenses.filter(expense => expense.status === "Aprovada" && expense.appropriationId === reservation.appropriationId).map(expense => <SelectItem key={expense.id} value={expense.id}>{expense.description} - {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(expense.value)}</SelectItem>)}</SelectContent></Select><MoneyInput value={reservation.value} onChange={value => setReservation({ ...reservation, value })} /><Input placeholder="Justificativa" value={reservation.justification} onChange={event => setReservation({ ...reservation, justification: event.target.value })} /><Button type="submit" disabled={pending}>Criar reserva</Button></form></CardContent></Card>
        </div>}

       <Card><CardHeader><CardTitle>Solicitações de Despesa</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Descrição</TableHead><TableHead>Dotação</TableHead><TableHead>Fornecedor</TableHead><TableHead className="text-right">Valor</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader><TableBody>{expenses.length === 0 ? <TableRow><TableCell colSpan={6} className="h-20 text-center text-muted-foreground">Nenhuma solicitação de despesa pendente.</TableCell></TableRow> : expenses.map(expense => <TableRow key={expense.id}><TableCell>{expense.description}</TableCell><TableCell>{expense.appropriation.code}</TableCell><TableCell>{expense.supplier?.company?.corporateName ?? expense.supplier?.person?.fullName ?? "-"}</TableCell><TableCell className="text-right">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(expense.value)}</TableCell><TableCell><Badge variant="outline">{expense.status}</Badge></TableCell><TableCell className="text-right">{canEdit && expense.status === "Solicitada" && <Button size="sm" variant="outline" onClick={() => approveExpense(expense.id)} disabled={pending}>Aprovar</Button>}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>

       <Card>
        <CardHeader>
          <CardTitle>Listagem de Dotações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código da Dotação</TableHead>
                <TableHead>Natureza da Despesa</TableHead>
                <TableHead>Unidade Orçamentária</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead className="text-right">Valor Atualizado (R$)</TableHead>
                <TableHead className="text-right">Reservado (R$)</TableHead>
                <TableHead className="text-right">Valor Empenhado (R$)</TableHead>
                <TableHead className="text-right">Saldo (R$)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appropriations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground h-32">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-8 w-8 mb-2 opacity-20" />
                      Nenhuma dotação encontrada.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                appropriations.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.code}</TableCell>
                    <TableCell>{app.expenseNature.code} - {app.expenseNature.name}</TableCell>
                    <TableCell>{app.budgetUnit.code} - {app.budgetUnit.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{app.resourceSource.code}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-emerald-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(app.updatedValue)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-amber-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(app.reservedValue)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-amber-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(app.committedValue)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-blue-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(app.availableValue)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solicitações de Crédito Adicional (Segregação de Funções)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Justificativa</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creditRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground h-20">
                    Nenhuma solicitação de crédito adicional cadastrada.
                  </TableCell>
                </TableRow>
              ) : (
                creditRequests.map((credit) => (
                  <TableRow key={credit.id}>
                    <TableCell className="font-medium">{credit.number}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{credit.type}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[250px] truncate">{credit.justification}</TableCell>
                    <TableCell className="text-right font-medium">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(credit.totalValue))}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          credit.status === "Efetivado"
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : credit.status === "Aprovado"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-amber-500 hover:bg-amber-600"
                        }
                      >
                        {credit.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                       {canEdit && credit.status === "Solicitado" && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={pending}
                          onClick={() => handleApproveCredit(credit.id)}
                        >
                          Aprovar
                        </Button>
                      )}
                       {canEdit && credit.status === "Aprovado" && (
                        <Button
                          variant="default"
                          size="sm"
                          disabled={pending}
                          onClick={() => handleExecuteCredit(credit.id)}
                        >
                          Efetivar Saldo
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

       <Card><CardHeader><CardTitle>Reservas recentes</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Número</TableHead><TableHead>Dotação</TableHead><TableHead>Valor</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader><TableBody>{reservations.map(reservation => <TableRow key={reservation.id}><TableCell>{reservation.number}</TableCell><TableCell>{reservation.appropriation.code}</TableCell><TableCell>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(reservation.value)}</TableCell><TableCell>{reservation.status}</TableCell><TableCell>{canEdit && reservation.status === "Ativa" && <Button variant="outline" size="sm" onClick={() => cancelReservation(reservation.id)}>Cancelar</Button>}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
    </div>
  );
}
