"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Wallet, Plus, Search, Ban, CheckCircle, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { createPayment, cancelPayment, updatePaymentStatus } from "./actions";

type Payment = {
  id: string;
  orderNumber: string;
  date: Date;
  value: number;
  paymentMethod: string;
  status: string;
  commitment: {
    id: string;
    number: string;
  };
  bankAccount: {
    id: string;
    bankName: string;
    agency: string;
    accountNumber: string;
  };
  supplier: {
    id: string;
    company?: { corporateName: string } | null;
    person?: { fullName: string } | null;
  };
};

export default function PagamentosClient({
  payments,
  commitments,
  bankAccounts,
  suppliers
}: {
  payments: Payment[];
  commitments: any[];
  bankAccounts: any[];
  suppliers: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterMonth, setFilterMonth] = useState("ALL");
  const [filterYear, setFilterYear] = useState("ALL");
  const [filterAccount, setFilterAccount] = useState("ALL");
  const [filterMethod, setFilterMethod] = useState("ALL");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    orderNumber: "",
    date: new Date().toISOString().substring(0, 10),
    value: 0,
    commitmentId: "",
    bankAccountId: "",
    supplierId: "",
    paymentMethod: "Transferência"
  });

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.orderNumber.includes(searchTerm) || 
      (p.supplier.company?.corporateName || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
      (p.supplier.person?.fullName || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "ALL" || p.status === filterStatus;
    const matchesAccount = filterAccount === "ALL" || p.bankAccount.id === filterAccount;
    const matchesMethod = filterMethod === "ALL" || p.paymentMethod === filterMethod;
    
    const d = new Date(p.date);
    const matchesMonth = filterMonth === "ALL" || (d.getMonth() + 1).toString() === filterMonth;
    const matchesYear = filterYear === "ALL" || d.getFullYear().toString() === filterYear;
    
    return matchesSearch && matchesStatus && matchesMonth && matchesYear && matchesAccount && matchesMethod;
  });

  const handleOpenNew = () => {
    setFormData({
      orderNumber: "",
      date: new Date().toISOString().substring(0, 10),
      value: 0,
      commitmentId: "",
      bankAccountId: "",
      supplierId: "",
      paymentMethod: "Transferência"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...formData,
        date: new Date(formData.date)
      };
      
      await createPayment(dataToSubmit);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Ocorreu um erro ao salvar o pagamento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeStatus = async (id: string, newStatus: string) => {
    if (newStatus === "Cancelada") {
      if (window.confirm('Deseja realmente cancelar este pagamento? Esta ação não pode ser desfeita.')) {
        await cancelPayment(id);
      }
    } else {
      await updatePaymentStatus(id, newStatus);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pagamentos</h2>
          <p className="text-muted-foreground">Ordens de pagamento e execução financeira</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleOpenNew}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Ordem de Pagamento
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Listagem de Pagamentos</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar..." 
                  className="pl-8 w-[150px]" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={(val) => setFilterStatus(val as string)}>
                <SelectTrigger className="w-[120px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todos (Status)</SelectItem>
                  <SelectItem value="Emitida">Emitida</SelectItem>
                  <SelectItem value="Paga">Paga</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterMonth} onValueChange={(val) => setFilterMonth(val as string)}>
                <SelectTrigger className="w-[100px]"><SelectValue placeholder="Mês" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Mês</SelectItem>
                  <SelectItem value="1">Jan</SelectItem>
                  <SelectItem value="2">Fev</SelectItem>
                  <SelectItem value="3">Mar</SelectItem>
                  <SelectItem value="4">Abr</SelectItem>
                  <SelectItem value="5">Mai</SelectItem>
                  <SelectItem value="6">Jun</SelectItem>
                  <SelectItem value="7">Jul</SelectItem>
                  <SelectItem value="8">Ago</SelectItem>
                  <SelectItem value="9">Set</SelectItem>
                  <SelectItem value="10">Out</SelectItem>
                  <SelectItem value="11">Nov</SelectItem>
                  <SelectItem value="12">Dez</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterYear} onValueChange={(val) => setFilterYear(val as string)}>
                <SelectTrigger className="w-[100px]"><SelectValue placeholder="Ano" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Ano</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterAccount} onValueChange={(val) => setFilterAccount(val as string)}>
                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Conta" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todas Contas</SelectItem>
                  {bankAccounts.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.bankName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterMethod} onValueChange={(val) => setFilterMethod(val as string)}>
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="Forma" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todas Formas</SelectItem>
                  <SelectItem value="Transferência">Transferência</SelectItem>
                  <SelectItem value="Boleto">Boleto</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="PIX">PIX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ordem</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Empenho Ref.</TableHead>
                <TableHead>Conta Bancária</TableHead>
                <TableHead>Forma Pgto.</TableHead>
                <TableHead>Valor (R$)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground h-32">
                    <div className="flex flex-col items-center justify-center">
                      <Wallet className="h-8 w-8 mb-2 opacity-20" />
                      Nenhum pagamento encontrado.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.orderNumber}</TableCell>
                    <TableCell>{format(new Date(payment.date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      {payment.supplier.company?.corporateName || payment.supplier.person?.fullName || 'Não identificado'}
                    </TableCell>
                    <TableCell>{payment.commitment.number}</TableCell>
                    <TableCell>
                      {payment.bankAccount.bankName} - Ag: {payment.bankAccount.agency} Cc: {payment.bankAccount.accountNumber}
                    </TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.value)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        payment.status === 'Paga' ? 'default' : 
                        payment.status === 'Emitida' ? 'secondary' : 
                        payment.status === 'Cancelada' ? 'destructive' : 
                        'outline'
                      }>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      {payment.status === 'Emitida' && (
                        <Button variant="ghost" size="icon" onClick={() => handleChangeStatus(payment.id, 'Paga')} title="Marcar como Paga">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        </Button>
                      )}
                      {payment.status === 'Paga' && (
                        <Button variant="ghost" size="icon" onClick={() => handleChangeStatus(payment.id, 'Emitida')} title="Reverter para Emitida">
                          <RefreshCcw className="h-4 w-4 text-blue-500" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleChangeStatus(payment.id, 'Cancelada')} title="Cancelar Pagamento" disabled={payment.status === 'Cancelada'}>
                        <Ban className="h-4 w-4 text-rose-500" />
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Ordem de Pagamento</DialogTitle>
            <DialogDescription>Crie uma ordem de pagamento vinculada a um empenho.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Número da Ordem</Label>
                <Input id="orderNumber" required value={formData.orderNumber} onChange={e => setFormData({...formData, orderNumber: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data do Pagamento</Label>
                <Input id="date" type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                <Select value={formData.paymentMethod} onValueChange={v => setFormData({...formData, paymentMethod: v as string})}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Transferência">Transferência</SelectItem>
                    <SelectItem value="Boleto">Boleto</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="PIX">PIX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Valor (R$)</Label>
                  <MoneyInput id="value" required value={formData.value} onChange={val => setFormData({...formData, value: val})} />
                </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supplierId">Fornecedor / Credor</Label>
              <Select value={formData.supplierId} onValueChange={v => setFormData({...formData, supplierId: v as string})}>
                <SelectTrigger><SelectValue placeholder="Selecione o fornecedor" /></SelectTrigger>
                <SelectContent>
                  {suppliers.map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.company?.corporateName || s.person?.fullName || 'Fornecedor Sem Nome'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commitmentId">Empenho de Referência</Label>
              <Select value={formData.commitmentId} onValueChange={v => setFormData({...formData, commitmentId: v as string})}>
                <SelectTrigger><SelectValue placeholder="Selecione o empenho" /></SelectTrigger>
                <SelectContent>
                  {commitments.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.number} - Saldo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c.value)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bankAccountId">Conta Bancária Pagadora</Label>
              <Select value={formData.bankAccountId} onValueChange={v => setFormData({...formData, bankAccountId: v as string})}>
                <SelectTrigger><SelectValue placeholder="Selecione a conta" /></SelectTrigger>
                <SelectContent>
                  {bankAccounts.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.bankName} (Ag: {b.agency} Cc: {b.accountNumber})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Salvando..." : "Confirmar Pagamento"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
