"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { savePurchaseRequest } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export function SolicitacaoForm({ data }: { data?: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    const result = await savePurchaseRequest(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/compras/solicitacoes");
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

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Dados da Solicitação</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input id="number" name="number" defaultValue={data?.number || ""} required placeholder="REQ-2026-00X" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Valor Estimado (R$)</Label>
                <Input id="estimatedValue" name="estimatedValue" type="number" step="0.01" defaultValue={data?.estimatedValue || ""} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="object">Objeto</Label>
              <Input id="object" name="object" defaultValue={data?.object || ""} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="justification">Justificativa</Label>
              <Textarea id="justification" name="justification" defaultValue={data?.justification || ""} required rows={4} />
            </div>

            <div className="flex justify-end space-x-2">
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
