"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { saveAtoPessoal } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { FileUpload } from "@/components/ui/FileUpload";

export function AtoForm({ data, employees = [] }: { data?: any, employees?: any[] }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    const result = await saveAtoPessoal(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/rh/atos");
    } else {
      alert(result.error);
    }
  }

  const formatDateForInput = (dateString?: string | Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/rh/atos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Ato de Pessoal" : "Registrar Ato de Pessoal"}
        </h2>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Detalhes do Ato</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="space-y-2">
              <Label htmlFor="employeeId">Servidor</Label>
              <Select name="employeeId" defaultValue={data?.employeeId || ""} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o servidor" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo do Ato</Label>
                <Select name="type" defaultValue={data?.type || ""} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de ato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admissão">Admissão</SelectItem>
                    <SelectItem value="Demissão">Demissão</SelectItem>
                    <SelectItem value="Promoção">Promoção / Progressão</SelectItem>
                    <SelectItem value="Transferência">Transferência / Lotação</SelectItem>
                    <SelectItem value="Advertência">Advertência / Suspensão</SelectItem>
                    <SelectItem value="Elogio">Elogio</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data do Ato</Label>
                <Input type="date" id="date" name="date" defaultValue={formatDateForInput(data?.date || new Date())} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="actNumber">Número do Ato (Portaria/Diário Oficial)</Label>
              <Input 
                id="actNumber" 
                name="actNumber" 
                defaultValue={data?.actNumber || ""} 
                placeholder="Ex: Portaria nº 123/2026"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentUrl">Documento Comprobatório (Opcional)</Label>
              <FileUpload name="documentUrl" defaultValue={data?.documentUrl} />
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/rh/atos">
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
