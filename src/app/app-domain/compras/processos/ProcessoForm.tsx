"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { savePurchaseProcess } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export function ProcessoForm({ data }: { data?: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    const result = await savePurchaseProcess(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/compras/processos");
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/compras/processos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Processo" : "Novo Processo"}
        </h2>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Dados do Processo de Compra</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número do Processo</Label>
                <Input id="number" name="number" defaultValue={data?.number || ""} required placeholder="PROC-2026-00X" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Valor Estimado (R$)</Label>
                <Input id="estimatedValue" name="estimatedValue" type="number" step="0.01" defaultValue={data?.estimatedValue || ""} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Input id="type" name="type" defaultValue={data?.type || ""} required placeholder="Ex: Comum, Registro de Preços" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modality">Modalidade</Label>
                <Input id="modality" name="modality" defaultValue={data?.modality || ""} required placeholder="Ex: Pregão Eletrônico, Dispensa" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="object">Objeto</Label>
              <Textarea id="object" name="object" defaultValue={data?.object || ""} required rows={4} />
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/compras/processos">
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" /> {isSaving ? "Salvando..." : "Salvar Processo"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
