"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveContract } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { MoneyInput } from "@/components/ui/MoneyInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ContratoForm({ data, processos = [], secretarias = [], fornecedores = [] }: { data?: any, processos?: any[], secretarias?: any[], fornecedores?: any[] }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedProcessId, setSelectedProcessId] = useState<string>(data?.processId || "");

  const selectedProcess = processos.find(p => p.id === selectedProcessId);
  const calculatedTotal = selectedProcess ? selectedProcess.estimatedValue : (data?.initialValue || 0);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    formData.set("initialValue", calculatedTotal.toString());
    const result = await saveContract(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/compras/contratos");
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/compras/contratos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Contrato" : "Novo Contrato"}
        </h2>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Dados do Contrato Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número do Contrato</Label>
                <Input id="number" name="number" defaultValue={data?.number || ""} placeholder="Ex: CONT 001/2026 (Auto-gerado se vazio)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processId">Processo Vinculado</Label>
                <Select name="processId" value={selectedProcessId} onValueChange={(val) => setSelectedProcessId(val || "")} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o processo" />
                  </SelectTrigger>
                  <SelectContent>
                    {processos.map(proc => (
                      <SelectItem key={proc.id} value={proc.id}>{proc.number} - {proc.object?.substring(0, 30)}...</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplierId">Fornecedor</Label>
                <Select name="supplierId" defaultValue={data?.supplierId || ""} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {fornecedores.map(forn => (
                      <SelectItem key={forn.id} value={forn.id}>{forn.company?.corporateName || forn.company?.tradeName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secretariatId">Secretaria</Label>
                <Select name="secretariatId" defaultValue={data?.secretariatId || ""} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a Secretaria" />
                  </SelectTrigger>
                  <SelectContent>
                    {secretarias.map(sec => (
                      <SelectItem key={sec.id} value={sec.id}>{sec.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Valor Total (R$)</Label>
              <div className="text-2xl font-bold text-slate-700 h-10 flex items-center">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculatedTotal)}
              </div>
              <input type="hidden" name="initialValue" value={calculatedTotal} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="object">Objeto do Contrato</Label>
              <Textarea id="object" name="object" defaultValue={data?.object || ""} required rows={4} />
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/compras/contratos">
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" /> {isSaving ? "Salvando..." : "Salvar Contrato"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
