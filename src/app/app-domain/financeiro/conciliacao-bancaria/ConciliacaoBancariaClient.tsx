"use client";

import { useState } from "react";
import { FileUp, Link2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { importBankStatementCsvAction, matchBankStatementItemAction } from "./actions";

type BankAccount = { id: string; bankName: string; agency: string; accountNumber: string };
type StatementImport = {
  id: string;
  format: string;
  fileName: string | null;
  status: string;
  importedAt: string;
  itemCount: number;
  bankAccount: Omit<BankAccount, "id">;
};
type PendingItem = {
  id: string;
  date: string;
  description: string | null;
  reference: string | null;
  direction: string;
  value: number;
  statementImport: { fileName: string | null; bankAccountId: string; bankAccount: Omit<BankAccount, "id"> };
};
type TreasuryMovement = {
  id: string;
  bankAccountId: string;
  date: string;
  type: string;
  direction: string;
  value: number;
  history: string | null;
};

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const date = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });
const accountLabel = (account: Omit<BankAccount, "id">) => `${account.bankName} | Ag. ${account.agency} | ${account.accountNumber}`;

export default function ConciliacaoBancariaClient({
  bankAccounts,
  imports,
  pendingItems,
  treasuryMovements,
}: {
  bankAccounts: BankAccount[];
  imports: StatementImport[];
  pendingItems: PendingItem[];
  treasuryMovements: TreasuryMovement[];
}) {
  const [bankAccountId, setBankAccountId] = useState(bankAccounts[0]?.id ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [matchingItemId, setMatchingItemId] = useState("");
  const [pending, setPending] = useState(false);
  const [movementByItem, setMovementByItem] = useState<Record<string, string>>({});

  async function importCsv() {
    if (!bankAccountId) return alert("Selecione uma conta bancária.");
    if (!file) return alert("Selecione um arquivo CSV.");
    setPending(true);
    try {
      const result = await importBankStatementCsvAction({
        bankAccountId,
        content: await file.text(),
        fileName: file.name,
      });
      if (result.error) throw new Error(result.error);
      setFile(null);
      const input = document.getElementById("bank-statement-file") as HTMLInputElement | null;
      if (input) input.value = "";
    } catch (error) {
      alert(error instanceof Error ? error.message : "Não foi possível importar o CSV.");
    } finally {
      setPending(false);
    }
  }

  async function match(item: PendingItem) {
    const treasuryMovementId = movementByItem[item.id];
    if (!treasuryMovementId) return alert("Selecione um movimento de tesouraria.");
    setMatchingItemId(item.id);
    try {
      const result = await matchBankStatementItemAction({ statementItemId: item.id, treasuryMovementId });
      if (result.error) throw new Error(result.error);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Não foi possível concluir a conciliação.");
    } finally {
      setMatchingItemId("");
    }
  }

  return (
    <div className="space-y-6 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conciliação Bancária</h1>
        <p className="text-muted-foreground">Importe extratos CSV e vincule cada lançamento manualmente a um movimento de tesouraria.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileUp className="h-5 w-5" />Importar extrato CSV</CardTitle>
          <CardDescription>Formato aceito: colunas `date`, `description`, `amount` e, opcionalmente, `reference`. Limite de 2 MB.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
          <div className="space-y-2">
            <Label>Conta bancária</Label>
            <Select value={bankAccountId} onValueChange={(value) => setBankAccountId(value ?? "")}>
              <SelectTrigger><SelectValue placeholder="Selecione a conta" /></SelectTrigger>
              <SelectContent>{bankAccounts.map((account) => <SelectItem key={account.id} value={account.id}>{accountLabel(account)}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bank-statement-file">Arquivo CSV</Label>
            <Input id="bank-statement-file" type="file" accept=".csv,text/csv" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
          </div>
          <Button onClick={importCsv} disabled={pending || !bankAccounts.length}>
            {pending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="mr-2 h-4 w-4" />}
            Importar
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Itens pendentes</CardTitle><CardDescription>{pendingItems.length} item(ns) aguardando conciliação manual.</CardDescription></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Extrato</TableHead><TableHead>Data</TableHead><TableHead>Descrição</TableHead><TableHead>Valor</TableHead><TableHead>Movimento de tesouraria</TableHead><TableHead /></TableRow></TableHeader>
            <TableBody>
              {pendingItems.map((item) => {
                const candidates = treasuryMovements.filter((movement) => movement.bankAccountId === item.statementImport.bankAccountId);
                const matching = matchingItemId === item.id;
                return <TableRow key={item.id}>
                  <TableCell className="max-w-48 whitespace-normal text-xs">{accountLabel(item.statementImport.bankAccount)}<br />{item.statementImport.fileName ?? "CSV sem nome"}</TableCell>
                  <TableCell>{date.format(new Date(item.date))}</TableCell>
                  <TableCell className="max-w-64 whitespace-normal">{item.description ?? "Sem descrição"}{item.reference ? <div className="text-xs text-muted-foreground">Ref. {item.reference}</div> : null}</TableCell>
                  <TableCell className={item.direction === "Saída" ? "text-red-700" : "text-emerald-700"}>{item.direction} {currency.format(item.value)}</TableCell>
                  <TableCell className="min-w-72">
                    <Select value={movementByItem[item.id] ?? ""} onValueChange={(value) => setMovementByItem((current) => ({ ...current, [item.id]: value ?? "" }))}>
                      <SelectTrigger><SelectValue placeholder={candidates.length ? "Selecione o movimento" : "Nenhum movimento disponível"} /></SelectTrigger>
                      <SelectContent>{candidates.map((movement) => <SelectItem key={movement.id} value={movement.id}>{date.format(new Date(movement.date))} | {movement.direction} {currency.format(movement.value)} | {movement.type}</SelectItem>)}</SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell><Button size="sm" onClick={() => match(item)} disabled={matching || !movementByItem[item.id]}>{matching ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}<span className="sr-only">Conciliar item</span></Button></TableCell>
                </TableRow>;
              })}
              {!pendingItems.length && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Não há itens pendentes nas unidades permitidas.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Histórico de importações</CardTitle><CardDescription>Os reenvios do mesmo arquivo para a mesma conta são idempotentes.</CardDescription></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Importado em</TableHead><TableHead>Arquivo</TableHead><TableHead>Conta</TableHead><TableHead>Formato</TableHead><TableHead>Itens</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {imports.map((item) => <TableRow key={item.id}><TableCell>{new Date(item.importedAt).toLocaleString("pt-BR")}</TableCell><TableCell>{item.fileName ?? "Sem nome"}</TableCell><TableCell>{accountLabel(item.bankAccount)}</TableCell><TableCell>{item.format}</TableCell><TableCell>{item.itemCount}</TableCell><TableCell>{item.status}</TableCell></TableRow>)}
              {!imports.length && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Nenhuma importação disponível.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
