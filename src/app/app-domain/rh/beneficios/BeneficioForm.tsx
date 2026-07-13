"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveBeneficio } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export function BeneficioForm({ data, employees = [] }: { data?: any, employees?: any[] }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    const result = await saveBeneficio(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/rh/beneficios");
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/rh/beneficios">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Benefício" : "Conceder Benefício"}
        </h2>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Dados do Benefício</CardTitle>
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
                <Label htmlFor="type">Tipo de Benefício</Label>
                <Select name="type" defaultValue={data?.type || ""} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vale Transporte">Vale Transporte</SelectItem>
                    <SelectItem value="Vale Refeição">Vale Refeição</SelectItem>
                    <SelectItem value="Auxílio Creche">Auxílio Creche</SelectItem>
                    <SelectItem value="Plano de Saúde">Plano de Saúde</SelectItem>
                    <SelectItem value="Auxílio Educação">Auxílio Educação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Valor (R$)</Label>
                <Input 
                  id="value" 
                  name="value" 
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={data?.value || 0} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2 max-w-sm">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={data?.status || "Ativo"}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Suspenso">Suspenso</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/rh/beneficios">
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
