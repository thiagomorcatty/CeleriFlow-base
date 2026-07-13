"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveFerias } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export function FeriasForm({ data, employees = [] }: { data?: any, employees?: any[] }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    const result = await saveFerias(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/rh/ferias");
    } else {
      alert(result.error);
    }
  }

  // Helper to format date for input[type="date"] (YYYY-MM-DD)
  const formatDateForInput = (dateString?: string | Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/rh/ferias">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Férias" : "Programar Férias"}
        </h2>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Dados de Férias</CardTitle>
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
                    <SelectItem key={emp.id} value={emp.id}>{emp.name} (Matrícula: {emp.registration || "N/A"})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-slate-50/50">
              <div className="col-span-2">
                <h3 className="font-semibold text-slate-700">Período Aquisitivo</h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="acquisitionStart">Data Inicial</Label>
                <Input type="date" id="acquisitionStart" name="acquisitionStart" defaultValue={formatDateForInput(data?.acquisitionStart)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acquisitionEnd">Data Final</Label>
                <Input type="date" id="acquisitionEnd" name="acquisitionEnd" defaultValue={formatDateForInput(data?.acquisitionEnd)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-slate-50/50">
              <div className="col-span-2">
                <h3 className="font-semibold text-slate-700">Período de Gozo (Opcional)</h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="enjoymentStart">Início do Gozo</Label>
                <Input type="date" id="enjoymentStart" name="enjoymentStart" defaultValue={formatDateForInput(data?.enjoymentStart)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enjoymentEnd">Fim do Gozo</Label>
                <Input type="date" id="enjoymentEnd" name="enjoymentEnd" defaultValue={formatDateForInput(data?.enjoymentEnd)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="days">Dias de Férias</Label>
                <Input type="number" id="days" name="days" defaultValue={data?.days || 30} min="1" max="30" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={data?.status || "A vencer"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A vencer">A vencer</SelectItem>
                    <SelectItem value="Disponível">Disponível</SelectItem>
                    <SelectItem value="Programada">Programada</SelectItem>
                    <SelectItem value="Em gozo">Em gozo</SelectItem>
                    <SelectItem value="Concluída">Concluída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/rh/ferias">
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
