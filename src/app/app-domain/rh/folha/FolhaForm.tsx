"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveFolha } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { PayrollSimulationCard } from "./PayrollSimulationCard";

export function FolhaForm({ data }: { data?: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [type, setType] = useState<string>(data?.type || "Mensal");
  const [status, setStatus] = useState<string>(data?.status || "Aberta");

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    const result = await saveFolha(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/rh/folha");
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/rh/folha">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Folha" : "Nova Folha"}
        </h2>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Dados da Folha de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="competence">Competência (Mês/Ano)</Label>
                <Input id="competence" name="competence" defaultValue={data?.competence || ""} placeholder="Ex: 07/2026" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Folha</Label>
                <Select name="type" value={type} onValueChange={(v) => setType(v || "Mensal")}>
                  <SelectTrigger>
                    <span className="flex-1 text-left line-clamp-1">{type}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mensal">Mensal</SelectItem>
                    <SelectItem value="Férias">Férias</SelectItem>
                    <SelectItem value="13º">13º Salário</SelectItem>
                    <SelectItem value="Rescisão">Rescisão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" value={status} onValueChange={(v) => setStatus(v || "Aberta")}>
                  <SelectTrigger>
                    <span className="flex-1 text-left line-clamp-1">
                      {status === "Aberta" ? "Aberta (Em Elaboração)" : status === "Fechada" ? "Fechada (Consolidada)" : "Paga"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aberta">Aberta (Em Elaboração)</SelectItem>
                    <SelectItem value="Fechada">Fechada (Consolidada)</SelectItem>
                    <SelectItem value="Paga">Paga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {data && (
                <div className="space-y-2">
                  <Label>Valor Total (R$)</Label>
                  <div className="text-2xl font-bold text-slate-700 h-10 flex items-center">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.totalValue || 0)}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/rh/folha">
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" /> {isSaving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Cartão de Simulação só aparece quando a folha já existe */}
      {data && (
        <PayrollSimulationCard payrollId={data.id} status={data.status} />
      )}
    </div>
  );
}
