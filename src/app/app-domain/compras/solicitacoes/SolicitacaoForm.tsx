"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { savePurchaseRequest } from "./actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoneyInput } from "@/components/ui/MoneyInput";

export function SolicitacaoForm({ data, catalogItems = [] }: { data?: any, catalogItems?: any[] }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  const [items, setItems] = useState<any[]>(data?.items || []);
  const [estimatedTotal, setEstimatedTotal] = useState<number>(data?.estimatedValue || 0);

  // Auto-calculate total when items change
  useEffect(() => {
    if (items.length > 0) {
      const total = items.reduce((acc, curr) => acc + (curr.quantity * (curr.estimatedUnitValue || 0)), 0);
      setEstimatedTotal(total);
    }
  }, [items]);

  const handleAddItem = () => {
    setItems([...items, { catalogItemId: "", customName: "", quantity: 1, estimatedUnitValue: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Auto fill unit value if catalog item is selected
    if (field === 'catalogItemId' && value !== 'custom') {
      const catalogItem = catalogItems.find(c => c.id === value);
      if (catalogItem && catalogItem.estimatedValue) {
        newItems[index].estimatedUnitValue = catalogItem.estimatedValue;
      }
      newItems[index].customName = ""; // clear custom name if selecting catalog
    }
    
    setItems(newItems);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      id: data?.id,
      number: formData.get("number"),
      object: formData.get("object"),
      justification: formData.get("justification"),
      estimatedValue: parseFloat(formData.get("estimatedValue") as string) || estimatedTotal,
      items: items
    };

    const result = await savePurchaseRequest(payload);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/compras/solicitacoes");
      router.refresh();
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/compras/solicitacoes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Solicitação" : "Nova Solicitação"}
        </h2>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Dados da Solicitação</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input id="number" name="number" defaultValue={data?.number || ""} required placeholder="REQ-2026-00X" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Valor Estimado Total (R$)</Label>
                <MoneyInput id="estimatedValue" name="estimatedValue" value={estimatedTotal} onChange={setEstimatedTotal} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="object">Objeto / Finalidade Geral</Label>
              <Input id="object" name="object" defaultValue={data?.object || ""} required placeholder="Resumo do que está sendo solicitado" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="justification">Justificativa</Label>
              <Textarea id="justification" name="justification" defaultValue={data?.justification || ""} required rows={3} placeholder="Por que essa contratação/compra é necessária?" />
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Itens da Solicitação</h3>
                <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Item
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-6 text-slate-500 border rounded-lg bg-slate-50">
                  Nenhum item adicionado. Clique em "Adicionar Item".
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg bg-slate-50 relative">
                      <div className="flex-1 grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6 space-y-2">
                          <Label>Produto ou Serviço *</Label>
                          <Select 
                            value={item.catalogItemId || (item.customName ? "custom" : "")} 
                            onValueChange={(val) => updateItem(index, 'catalogItemId', val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione do Catálogo ou Serviço Customizado..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="custom">-- Serviço / Item Fora do Catálogo --</SelectItem>
                              {catalogItems.map(c => (
                                <SelectItem key={c.id} value={c.id}>{c.code ? `[${c.code}] ` : ''}{c.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {item.catalogItemId === "custom" && (
                            <Input 
                              placeholder="Descreva o serviço ou item..." 
                              value={item.customName} 
                              onChange={(e) => updateItem(index, 'customName', e.target.value)}
                              className="mt-2"
                              required
                            />
                          )}
                        </div>
                        <div className="col-span-6 md:col-span-3 space-y-2">
                          <Label>Quantidade *</Label>
                          <Input 
                            type="number" 
                            min="0.01" 
                            step="0.01" 
                            value={item.quantity} 
                            onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)} 
                            required 
                          />
                        </div>
                        <div className="col-span-6 md:col-span-3 space-y-2">
                          <Label>Valor Unit. (R$)</Label>
                          <MoneyInput 
                            value={item.estimatedUnitValue || 0} 
                            onChange={(val) => updateItem(index, 'estimatedUnitValue', val)} 
                          />
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="text-rose-500 hover:text-rose-700 hover:bg-rose-100 mt-6"
                        onClick={() => handleRemoveItem(index)}
                        title="Remover Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Link href="/compras/solicitacoes">
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" /> {isSaving ? "Salvando..." : "Salvar Solicitação"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
