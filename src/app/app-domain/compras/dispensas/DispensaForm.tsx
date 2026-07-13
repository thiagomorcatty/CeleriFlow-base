"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveDispensa } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export function DispensaForm({ data, processos = [], fornecedores = [] }: { data?: any, processos?: any[], fornecedores?: any[] }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    const result = await saveDispensa(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/compras/licitacoes");
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/compras/licitacoes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Contratação Direta" : "Nova Contratação Direta"}
        </h2>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Dados da Dispensa/Inexigibilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select name="type" defaultValue={data?.type || "Dispensa"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dispensa">Dispensa de Licitação</SelectItem>
                    <SelectItem value="Inexigibilidade">Inexigibilidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={data?.status || "Em Elaboração"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Em Elaboração">Em Elaboração</SelectItem>
                    <SelectItem value="Publicada">Publicada</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                    <SelectItem value="Concluída">Concluída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="processId">Processo Vinculado</Label>
                <Select name="processId" defaultValue={data?.processId || ""} required>
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
              <div className="space-y-2">
                <Label htmlFor="supplierId">Fornecedor (Opcional)</Label>
                <Select name="supplierId" defaultValue={data?.supplierId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhum / A Definir</SelectItem>
                    {fornecedores.map(forn => (
                      <SelectItem key={forn.id} value={forn.id}>{forn.company?.corporateName || forn.company?.tradeName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="justification">Justificativa Legal</Label>
              <Textarea 
                id="justification" 
                name="justification" 
                defaultValue={data?.justification || ""} 
                placeholder="Fundamentação legal para a dispensa ou inexigibilidade"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/compras/licitacoes">
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
