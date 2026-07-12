"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FileText, Pencil, Plus, Search, Filter, Ban } from "lucide-react";
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
import { createCommitment, updateCommitment, cancelCommitment } from "./actions";

type Commitment = {
  id: string;
  number: string;
  date: Date;
  value: number;
  type: string;
  history: string;
  status: string;
  supplierId: string;
  appropriationId: string;
  supplier: {
    id: string;
    company?: { corporateName: string } | null;
    person?: { fullName: string } | null;
  };
  appropriation: {
    id: string;
    code: string;
    budgetUnit: { name: string };
  };
};

export default function EmpenhosClient({
  commitments,
  suppliers,
  appropriations
}: {
  commitments: Commitment[];
  suppliers: any[];
  appropriations: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    number: "",
    date: new Date().toISOString().substring(0, 10),
    value: 0,
    type: "Ordinário",
    history: "",
    supplierId: "",
    appropriationId: ""
  });

  const filteredCommitments = commitments.filter(c =>
    c.number.includes(searchTerm) ||
    c.supplier.company?.corporateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.supplier.person?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({
      number: "",
      date: new Date().toISOString().substring(0, 10),
      value: 0,
      type: "Ordinário",
      history: "",
      supplierId: "",
      appropriationId: ""
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Commitment) => {
    setEditingId(c.id);
    setFormData({
      number: c.number,
      date: new Date(c.date).toISOString().substring(0, 10),
      value: c.value,
      type: c.type,
      history: c.history,
      supplierId: c.supplierId,
      appropriationId: c.appropriationId
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
        await updateCommitment(editingId, dataToSubmit);
      } else {
        await createCommitment(dataToSubmit);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving commitment:", error);
      alert("Ocorreu um erro ao salvar o empenho.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelCommitment = async (id: string) => {
    if (window.confirm('Deseja realmente anular este empenho? Esta ação não pode ser desfeita.')) {
      await cancelCommitment(id);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Empenhos</h2>
          <p className="text-muted-foreground">Gestão de empenhos da execução orçamentária</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleOpenNew}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Empenho
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listagem de Empenhos</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por fornecedor ou número..." 
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
                <TableHead>Número</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Fornecedor/Credor</TableHead>
                <TableHead>Unidade Orçamentária</TableHead>
                <TableHead>Valor (R$)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCommitments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground h-32">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-8 w-8 mb-2 opacity-20" />
                      Nenhum empenho encontrado.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCommitments.map((commitment) => (
                  <TableRow key={commitment.id}>
                    <TableCell className="font-medium">{commitment.number}</TableCell>
                    <TableCell>{format(new Date(commitment.date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      {commitment.supplier.company?.corporateName || commitment.supplier.person?.fullName || 'Não identificado'}
                    </TableCell>
                    <TableCell>{commitment.appropriation.budgetUnit.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(commitment.value)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        commitment.status === 'Pago' ? 'default' : 
                        commitment.status === 'Anulado' ? 'destructive' : 
                        'secondary'
                      }>
                        {commitment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(commitment)} title="Editar" disabled={commitment.status === 'Anulado'}>
                        <Pencil className="h-4 w-4 text-amber-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleCancelCommitment(commitment.id)} title="Anular" disabled={commitment.status === 'Anulado'}>
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
            <DialogTitle>{editingId ? "Editar Empenho" : "Novo Empenho"}</DialogTitle>
            <DialogDescription>Preencha os dados do empenho para reserva de dotação.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número do Empenho</Label>
                <Input id="number" required value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input id="date" type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v as string})}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ordinário">Ordinário</SelectItem>
                    <SelectItem value="Estimativo">Estimativo</SelectItem>
                    <SelectItem value="Global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Valor (R$)</Label>
                <Input id="value" type="number" step="0.01" required value={formData.value} onChange={e => setFormData({...formData, value: parseFloat(e.target.value)})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appropriationId">Dotação Orçamentária</Label>
              <Select value={formData.appropriationId} onValueChange={v => setFormData({...formData, appropriationId: v as string})}>
                <SelectTrigger><SelectValue placeholder="Selecione a dotação" /></SelectTrigger>
                <SelectContent>
                  {appropriations.map(a => (
                    <SelectItem key={a.id} value={a.id}>{a.code} - {a.budgetUnit.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Label htmlFor="history">Histórico / Descrição</Label>
              <Input id="history" required value={formData.history} onChange={e => setFormData({...formData, history: e.target.value})} />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Salvando..." : "Salvar Empenho"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
