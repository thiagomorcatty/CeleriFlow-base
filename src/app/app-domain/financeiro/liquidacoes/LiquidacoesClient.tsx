"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FileCheck, Plus, Search, Filter, Ban } from "lucide-react";
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
import { createSettlement, cancelSettlement } from "./actions";

type Settlement = {
  id: string;
  date: Date;
  value: number;
  documentRef: string | null;
  status: string;
  commitment: {
    id: string;
    number: string;
    supplier: {
      company?: { corporateName: string } | null;
      person?: { fullName: string } | null;
    };
  };
  author: {
    name: string;
  };
};

export default function LiquidacoesClient({
  settlements,
  commitments,
  employees
}: {
  settlements: Settlement[];
  commitments: any[];
  employees: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().substring(0, 10),
    value: 0,
    documentRef: "",
    commitmentId: "",
    authorId: "",
    notes: ""
  });

  const filteredSettlements = settlements.filter(s =>
    s.commitment.number.includes(searchTerm) ||
    (s.documentRef && s.documentRef.includes(searchTerm))
  );

  const handleOpenNew = () => {
    setFormData({
      date: new Date().toISOString().substring(0, 10),
      value: 0,
      documentRef: "",
      commitmentId: "",
      authorId: "",
      notes: ""
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
      
      await createSettlement(dataToSubmit);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating settlement:", error);
      alert("Ocorreu um erro ao salvar a liquidação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelSettlement = async (id: string) => {
    if (window.confirm('Deseja realmente cancelar esta liquidação? Esta ação não pode ser desfeita.')) {
      await cancelSettlement(id);
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
          <div className="flex items-center justify-between">
            <CardTitle>Listagem de Liquidações</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por empenho..." 
                  className="pl-8 w-[250px]" 
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
                    <TableCell>{settlement.documentRef || '-'}</TableCell>
                    <TableCell>{settlement.author.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(settlement.value)}
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
            <DialogTitle>Nova Liquidação</DialogTitle>
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
                <Input id="value" type="number" step="0.01" required value={formData.value} onChange={e => setFormData({...formData, value: parseFloat(e.target.value)})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="commitmentId">Empenho de Referência</Label>
              <Select value={formData.commitmentId} onValueChange={v => setFormData({...formData, commitmentId: v as string})}>
                <SelectTrigger><SelectValue placeholder="Selecione o empenho" /></SelectTrigger>
                <SelectContent>
                  {commitments.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.number} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c.value)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentRef">Documento Ref. (NF, Recibo)</Label>
                <Input id="documentRef" required value={formData.documentRef} onChange={e => setFormData({...formData, documentRef: e.target.value})} />
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
