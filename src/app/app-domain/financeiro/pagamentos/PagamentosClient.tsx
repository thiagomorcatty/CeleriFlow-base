"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Wallet, Plus, Search, Filter, Ban } from "lucide-react";
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
import { createPayment, cancelPayment } from "./actions";

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

  const filteredPayments = payments.filter(p =>
    p.orderNumber.includes(searchTerm) ||
    p.supplier.company?.corporateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.supplier.person?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleCancelPayment = async (id: string) => {
    if (window.confirm('Deseja realmente cancelar este pagamento? Esta ação não pode ser desfeita.')) {
      await cancelPayment(id);
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
          <div className="flex items-center justify-between">
            <CardTitle>Listagem de Pagamentos</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por fornecedor ou ordem..." 
                  className="pl-8 w-[280px]" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
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
                        payment.status === 'Pago' ? 'default' : 
                        payment.status === 'Cancelado' ? 'destructive' : 
                        'secondary'
                      }>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleCancelPayment(payment.id)} title="Cancelar Pagamento" disabled={payment.status === 'Cancelado'}>
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
                <Input id="value" type="number" step="0.01" required value={formData.value} onChange={e => setFormData({...formData, value: parseFloat(e.target.value)})} />
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
