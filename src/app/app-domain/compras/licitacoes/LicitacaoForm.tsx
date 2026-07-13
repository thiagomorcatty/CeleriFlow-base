"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveBidding } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

export function LicitacaoForm({ data, processos = [] }: { data?: any, processos?: any[] }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedProcessId, setSelectedProcessId] = useState<string>(data?.processId || "");

  const selectedProcess = processos.find(p => p.id === selectedProcessId);
  const calculatedTotal = selectedProcess ? selectedProcess.estimatedValue : 0;

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    const result = await saveBidding(formData);
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
          {data ? "Editar Licitação" : "Nova Licitação"}
        </h2>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Dados do Certame</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número do Edital / Certame</Label>
                <Input id="number" name="number" defaultValue={data?.number || ""} placeholder="Ex: PE 001/2026 (Auto-gerado se vazio)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modality">Modalidade</Label>
                <Select name="modality" defaultValue={data?.modality || "Pregão Eletrônico"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pregão Eletrônico">Pregão Eletrônico</SelectItem>
                    <SelectItem value="Pregão Presencial">Pregão Presencial</SelectItem>
                    <SelectItem value="Concorrência">Concorrência</SelectItem>
                    <SelectItem value="Tomada de Preços">Tomada de Preços</SelectItem>
                    <SelectItem value="Convite">Convite</SelectItem>
                    <SelectItem value="Leilão">Leilão</SelectItem>
                    <SelectItem value="Concurso">Concurso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={data?.status || "Aberto"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aberto">Aberto</SelectItem>
                    <SelectItem value="Em Julgamento">Em Julgamento</SelectItem>
                    <SelectItem value="Homologado">Homologado</SelectItem>
                    <SelectItem value="Suspenso">Suspenso</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                    <SelectItem value="Fracassado">Fracassado</SelectItem>
                    <SelectItem value="Deserto">Deserto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="processId">Processo Vinculado</Label>
                <Select name="processId" value={selectedProcessId} onValueChange={(val) => setSelectedProcessId(val || "")}>
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

            <div className="space-y-2">
              <Label>Valor Total Estimado (R$)</Label>
              <div className="text-2xl font-bold text-slate-700 h-10 flex items-center">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculatedTotal)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publicationDate">Data de Publicação</Label>
                <Input 
                  id="publicationDate" 
                  name="publicationDate" 
                  type="date" 
                  defaultValue={data?.publicationDate ? format(new Date(data.publicationDate), "yyyy-MM-dd") : ""} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionDate">Data da Sessão</Label>
                <Input 
                  id="sessionDate" 
                  name="sessionDate" 
                  type="datetime-local" 
                  defaultValue={data?.sessionDate ? format(new Date(data.sessionDate), "yyyy-MM-dd'T'HH:mm") : ""} 
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/compras/licitacoes">
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" /> {isSaving ? "Salvando..." : "Salvar Licitação"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
