"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FileCheck, Plus, Search, Ban, Pencil } from "lucide-react";
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
import { createSettlement, cancelSettlement, updateSettlement } from "./actions";

type Settlement = {
  id: string;
  date: Date;
  value: number;
  documentRef: string | null;
  document: { id: string; title: string } | null;
  notes: string | null;
  status: string;
  paidValue: number;
  commitment: {
    id: string;
    number: string;
    supplier: {
      company?: { corporateName: string } | null;
      person?: { fullName: string } | null;
    };
  };
  author: {
    id: string;
    name: string;
  };
};

export default function LiquidacoesClient({
  settlements,
  commitments,
  employees,
  documents,
}: {
  settlements: Settlement[];
  commitments: any[];
  employees: any[];
  documents: { id: string; title: string; documentType: string }[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterMonth, setFilterMonth] = useState("ALL");
  const [filterYear, setFilterYear] = useState("ALL");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().substring(0, 10),
    value: 0,
    documentRef: "",
    documentId: "",
    commitmentId: "",
    authorId: "",
    notes: ""
  });

  const filteredSettlements = settlements.filter(s => {
    const matchesSearch = s.commitment.number.includes(searchTerm) || (s.documentRef && s.documentRef.includes(searchTerm));
    const matchesStatus = filterStatus === "ALL" || s.status === filterStatus;
    
    const d = new Date(s.date);
    const matchesMonth = filterMonth === "ALL" || (d.getMonth() + 1).toString() === filterMonth;
    const matchesYear = filterYear === "ALL" || d.getFullYear().toString() === filterYear;
    
    return matchesSearch && matchesStatus && matchesMonth && matchesYear;
  });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({
      date: new Date().toISOString().substring(0, 10),
      value: 0,
      documentRef: "",
      documentId: "",
      commitmentId: "",
      authorId: "",
      notes: ""
    });
    setIsModalOpen(true);
  };

  const handleEdit = (settlement: Settlement) => {
    setEditingId(settlement.id);
    setFormData({
      date: new Date(settlement.date).toISOString().substring(0, 10),
      value: settlement.value,
      documentRef: settlement.documentRef || "",
      documentId: settlement.document?.id || "",
      commitmentId: settlement.commitment.id,
      authorId: settlement.author.id,
      notes: settlement.notes || ""
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
      
      if (editingId) {
        const result = await updateSettlement(editingId, dataToSubmit);
        if (result.error) throw new Error(result.error);
      } else {
        const result = await createSettlement(dataToSubmit);
        if (result.error) throw new Error(result.error);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving settlement:", error);
      alert(error instanceof Error ? error.message : "Ocorreu um erro ao salvar a liquidação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelSettlement = async (id: string) => {
    if (window.confirm('Deseja realmente cancelar esta liquidação? Esta ação não pode ser desfeita.')) {
      const result = await cancelSettlement(id);
      if (result.error) alert(result.error);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Liquidações</h2>
          <p className="text-muted-foreground">Ateste de notas fiscais e recebimento de serviços</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleOpenNew}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Liquidação
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Listagem de Liquidações</CardTitle>
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
                  <SelectItem value="ALL">Todos</SelectItem>
                  <SelectItem value="Liquidado">Liquidado</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterMonth} onValueChange={(val) => setFilterMonth(val as string)}>
                <SelectTrigger className="w-[110px]"><SelectValue placeholder="Mês" /></SelectTrigger>
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Empenho Ref.</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Documento (NF/Recibo)</TableHead>
                <TableHead>Responsável (Ateste)</TableHead>
                <TableHead>Valor (R$)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSettlements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground h-32">
                    <div className="flex flex-col items-center justify-center">
                      <FileCheck className="h-8 w-8 mb-2 opacity-20" />
                      Nenhuma liquidação encontrada.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSettlements.map((settlement) => (
                  <TableRow key={settlement.id}>
                    <TableCell>{format(new Date(settlement.date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell className="font-medium">{settlement.commitment.number}</TableCell>
                    <TableCell>
                      {settlement.commitment.supplier.company?.corporateName || settlement.commitment.supplier.person?.fullName || 'Não identificado'}
                    </TableCell>
                      <TableCell>{settlement.document?.title || settlement.documentRef || '-'}</TableCell>
                    <TableCell>{settlement.author.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(settlement.value)}
                      {settlement.paidValue > 0 && <span className="block text-xs text-muted-foreground">Pago: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(settlement.paidValue)}</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        settlement.status === 'Liquidado' ? 'default' : 
                        settlement.status === 'Cancelado' ? 'destructive' : 
                        'secondary'
                      }>
                        {settlement.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleCancelSettlement(settlement.id)} title="Cancelar Liquidação" disabled={settlement.status === 'Cancelado'}>
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
            <DialogTitle>{editingId ? "Editar Liquidação" : "Nova Liquidação"}</DialogTitle>
            <DialogDescription>Ateste o recebimento de materiais ou serviços vinculados a um empenho.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data da Liquidação</Label>
                <Input id="date" type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Valor (R$)</Label>
                <MoneyInput id="value" required value={formData.value} onChange={val => setFormData({...formData, value: val})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="commitmentId">Empenho de Referência</Label>
              <Select value={formData.commitmentId} onValueChange={v => setFormData({...formData, commitmentId: v as string})}>
                <SelectTrigger><SelectValue placeholder="Selecione o empenho" /></SelectTrigger>
                <SelectContent>
                  {commitments.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.number} - Saldo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c.availableToSettle)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentId">Documento GED</Label>
                <Select value={formData.documentId} onValueChange={v => setFormData({...formData, documentId: v as string})}>
                  <SelectTrigger><SelectValue placeholder="Selecione o documento GED" /></SelectTrigger>
                  <SelectContent>
                    {documents.map(document => (
                      <SelectItem key={document.id} value={document.id}>{document.title} ({document.documentType})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentRef">Documento Ref. (NF, Recibo)</Label>
                <Input id="documentRef" value={formData.documentRef} onChange={e => setFormData({...formData, documentRef: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorId">Responsável pelo Ateste</Label>
                <Select value={formData.authorId} onValueChange={v => setFormData({...formData, authorId: v as string})}>
                  <SelectTrigger><SelectValue placeholder="Selecione o servidor" /></SelectTrigger>
                  <SelectContent>
                    {employees.map(e => (
                      <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Input id="notes" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Salvando..." : "Confirmar Liquidação"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
