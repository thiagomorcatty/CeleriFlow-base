"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveDependente } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { MaskedInput } from "@/components/ui/MaskedInput";

export function DependenteForm({ data, employees = [], defaultEmployeeId }: { data?: any, employees?: any[], defaultEmployeeId?: string }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    const result = await saveDependente(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/rh/dependentes");
    } else {
      alert(result.error);
    }
  }

  const formatDateForInput = (dateString?: string | Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const effectiveEmployeeId = data?.employeeId || defaultEmployeeId;
  const effectiveEmployee = effectiveEmployeeId ? employees.find(e => e.id === effectiveEmployeeId) : null;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/rh/dependentes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Dependente" : "Cadastrar Dependente"}
        </h2>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Dados do Dependente</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="space-y-2">
              <Label htmlFor="employeeId">Servidor Titular</Label>
              {effectiveEmployeeId ? (
                <>
                  <input type="hidden" name="employeeId" value={effectiveEmployeeId} />
                  <Input 
                    value={effectiveEmployee?.name || "Servidor não encontrado"} 
                    readOnly 
                    className="bg-slate-100 cursor-not-allowed" 
                  />
                </>
              ) : (
                <Select name="employeeId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o servidor" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" name="name" defaultValue={data?.name || ""} placeholder="Nome do dependente" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <MaskedInput 
                  maskType="cpf"
                  id="cpf" 
                  name="cpf" 
                  defaultValue={data?.cpf || ""} 
                  placeholder="000.000.000-00"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input type="date" id="birthDate" name="birthDate" defaultValue={formatDateForInput(data?.birthDate)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Parentesco</Label>
                <Select name="relationship" defaultValue={data?.relationship || "Filho(a)"} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o parentesco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Filho(a)">Filho(a)</SelectItem>
                    <SelectItem value="Cônjuge">Cônjuge</SelectItem>
                    <SelectItem value="Pai/Mãe">Pai/Mãe</SelectItem>
                    <SelectItem value="Enteado(a)">Enteado(a)</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/rh/dependentes">
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
