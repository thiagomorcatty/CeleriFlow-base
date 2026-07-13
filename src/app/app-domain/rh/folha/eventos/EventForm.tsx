"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { saveEvent } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export function EventForm({ data }: { data?: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isActive, setIsActive] = useState(data ? data.isActive : true);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    formData.set("isActive", isActive.toString());
    const result = await saveEvent(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/rh/folha/eventos");
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/rh/folha/eventos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Evento" : "Novo Evento"}
        </h2>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Configuração do Evento / Rubrica</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código <span className="text-red-500">*</span></Label>
                <Input id="code" name="code" defaultValue={data?.code || ""} placeholder="Ex: 001" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo do Evento <span className="text-red-500">*</span></Label>
                <Select name="type" defaultValue={data?.type || "Vencimento"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vencimento">Vencimento (Provento)</SelectItem>
                    <SelectItem value="Desconto">Desconto</SelectItem>
                    <SelectItem value="Base">Base de Cálculo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome / Descrição <span className="text-red-500">*</span></Label>
              <Input id="name" name="name" defaultValue={data?.name || ""} placeholder="Ex: Salário Base" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="formula">Fórmula (Opcional)</Label>
              <Input id="formula" name="formula" defaultValue={data?.formula || ""} placeholder="Ex: SALARIO_BASE * 1.0" />
              <p className="text-xs text-muted-foreground">
                Deixe em branco para valor manual ou variável mensal.
              </p>
            </div>

            <div className="flex items-center space-x-2 border p-4 rounded-lg bg-slate-50">
              <Switch 
                id="isActive" 
                checked={isActive} 
                onCheckedChange={setIsActive} 
              />
              <Label htmlFor="isActive" className="font-semibold cursor-pointer">
                Evento Ativo
              </Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/rh/folha/eventos">
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" /> {isSaving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
