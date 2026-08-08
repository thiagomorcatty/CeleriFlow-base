"use client";

import { useState } from "react";
import { Landmark, Pencil, Plus, Search, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoneyInput } from "@/components/ui/MoneyInput";
import { createBankAccount, updateBankAccount, toggleBankAccountStatus } from "./actions";

type BankAccount = {
  id: string;
  bankName: string;
  agency: string;
  accountNumber: string;
  accountType: string;
  currentBalance: number;
  resourceSourceId: string | null;
  budgetUnitId: string | null;
  accountingPlanId: string | null;
  isActive: boolean;
  resourceSource?: { id: string; name: string } | null;
  budgetUnit?: { id: string; code: string; name: string } | null;
};

export default function ContasBancariasClient({
  accounts,
  resourceSources,
  budgetUnits,
  accountingPlans,
}: {
  accounts: BankAccount[];
  resourceSources: { id: string; name: string }[];
  budgetUnits: { id: string; code: string; name: string }[];
  accountingPlans: { id: string; code: string; name: string }[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    bankName: "",
    agency: "",
    accountNumber: "",
    accountType: "Movimento",
    currentBalance: 0,
    resourceSourceId: "",
    budgetUnitId: "",
    accountingPlanId: "",
    isActive: true
  });

  const filteredAccounts = accounts.filter(account =>
    account.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.agency.includes(searchTerm) ||
    account.accountNumber.includes(searchTerm)
  );

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({
      bankName: "",
      agency: "",
      accountNumber: "",
      accountType: "Movimento",
      currentBalance: 0,
      resourceSourceId: "",
      budgetUnitId: "",
      accountingPlanId: "",
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (account: BankAccount) => {
    setEditingId(account.id);
    setFormData({
      bankName: account.bankName,
      agency: account.agency,
      accountNumber: account.accountNumber,
      accountType: account.accountType,
      currentBalance: 0,
      resourceSourceId: account.resourceSourceId || "",
      budgetUnitId: account.budgetUnitId || "",
      accountingPlanId: account.accountingPlanId || "",
      isActive: account.isActive
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateBankAccount(editingId, formData);
      } else {
        await createBankAccount(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving account:", error);
      alert("Ocorreu um erro ao salvar a conta bancária.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    if (window.confirm(`Deseja ${currentStatus ? 'inativar' : 'ativar'} esta conta?`)) {
      await toggleBankAccountStatus(id, !currentStatus);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contas Bancárias</h2>
          <p className="text-muted-foreground">Gestão da tesouraria e contas do município</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleOpenNew}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Conta
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Listagem de Contas</CardTitle>
              <CardDescription>Contas bancárias ativas e seus saldos atuais.</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por banco ou agência..." 
                className="pl-8 w-[250px]" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banco</TableHead>
                <TableHead>Agência / Conta</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fonte de Recurso</TableHead>
                <TableHead>Unidade Gestora</TableHead>
                <TableHead>Saldo Atual (R$)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground h-32">
                    <div className="flex flex-col items-center justify-center">
                      <Landmark className="h-8 w-8 mb-2 opacity-20" />
                      Nenhuma conta bancária encontrada.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.bankName}</TableCell>
                    <TableCell>{account.agency} / {account.accountNumber}</TableCell>
                    <TableCell>{account.accountType}</TableCell>
                    <TableCell>{account.resourceSource?.name || 'Não vinculada'}</TableCell>
                    <TableCell>{account.budgetUnit ? `${account.budgetUnit.code} - ${account.budgetUnit.name}` : "Não vinculada"}</TableCell>
                    <TableCell className={account.currentBalance < 0 ? "text-rose-500 font-medium" : "text-emerald-500 font-medium"}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(account.currentBalance)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={account.isActive ? 'default' : 'secondary'}>
                        {account.isActive ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleToggleStatus(account.id, account.isActive)} title={account.isActive ? "Inativar" : "Ativar"}>
                        {account.isActive ? <X className="h-4 w-4 text-rose-500" /> : <Check className="h-4 w-4 text-emerald-500" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(account)} title="Editar">
                        <Pencil className="h-4 w-4 text-amber-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Conta Bancária" : "Nova Conta Bancária"}</DialogTitle>
            <DialogDescription>O saldo é derivado dos movimentos. O saldo de abertura só pode ser informado na inclusão e fica auditado.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Nome do Banco</Label>
              <Input id="bankName" required value={formData.bankName} onChange={e => setFormData({...formData, bankName: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agency">Agência</Label>
                <Input id="agency" required value={formData.agency} onChange={e => setFormData({...formData, agency: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Conta</Label>
                <Input id="accountNumber" required value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountType">Tipo de Conta</Label>
                <Select value={formData.accountType} onValueChange={v => setFormData({...formData, accountType: v as string})}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Movimento">Movimento</SelectItem>
                    <SelectItem value="Vinculada">Vinculada</SelectItem>
                    <SelectItem value="Arrecadação">Arrecadação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {!editingId && <div className="space-y-2">
                <Label htmlFor="currentBalance">Saldo Atual (R$)</Label>
                <MoneyInput id="currentBalance" required value={formData.currentBalance} onChange={val => setFormData({...formData, currentBalance: val})} />
              </div>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="resourceSourceId">Fonte de Recurso</Label>
              <Select value={formData.resourceSourceId} onValueChange={v => setFormData({...formData, resourceSourceId: v as string})}>
                <SelectTrigger><SelectValue placeholder="Selecione a fonte" /></SelectTrigger>
                <SelectContent>
                  {resourceSources.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetUnitId">Unidade Gestora</Label>
              <Select value={formData.budgetUnitId} onValueChange={v => setFormData({...formData, budgetUnitId: v as string})}>
                <SelectTrigger><SelectValue placeholder="Selecione a Unidade Gestora" /></SelectTrigger>
                <SelectContent>
                  {budgetUnits.map(unit => (
                    <SelectItem key={unit.id} value={unit.id}>{unit.code} - {unit.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountingPlanId">Conta Analítica do Razão Bancário</Label>
              <Select value={formData.accountingPlanId} onValueChange={v => setFormData({...formData, accountingPlanId: v as string})}>
                <SelectTrigger><SelectValue placeholder="Selecione a conta analítica" /></SelectTrigger>
                <SelectContent>
                  {accountingPlans.map(plan => (
                    <SelectItem key={plan.id} value={plan.id}>{plan.code} - {plan.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex items-center gap-2">
              <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded border-slate-300" />
              <Label htmlFor="isActive" className="mb-0 cursor-pointer">Conta Ativa</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Salvando..." : "Salvar Conta"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
