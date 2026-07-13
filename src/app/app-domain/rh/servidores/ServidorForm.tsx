"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { saveServidor } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export function ServidorForm({ 
  data, 
  roles = [], 
  departments = [], 
  secretariats = [] 
}: { 
  data?: any, 
  roles?: any[], 
  departments?: any[], 
  secretariats?: any[] 
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isActive, setIsActive] = useState(data ? data.isActive : true);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    formData.set("isActive", isActive.toString());
    const result = await saveServidor(formData);
    setIsSaving(false);
    
    if (result.success) {
      router.push("/rh/servidores");
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/rh/servidores">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {data ? "Editar Servidor" : "Novo Servidor"}
        </h2>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Dados do Servidor</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" name="name" defaultValue={data?.name || ""} placeholder="Ex: João da Silva" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" name="cpf" defaultValue={data?.cpf || ""} placeholder="Ex: 000.000.000-00" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registration">Matrícula</Label>
                <Input id="registration" name="registration" defaultValue={data?.registration || ""} placeholder="Ex: 12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={data?.email || ""} placeholder="email@exemplo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" defaultValue={data?.phone || ""} placeholder="(00) 00000-0000" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="secretariatId">Secretaria</Label>
                <Select name="secretariatId" defaultValue={data?.secretariatId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {secretariats.map(sec => (
                      <SelectItem key={sec.id} value={sec.id}>{sec.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="departmentId">Departamento / Setor</Label>
                <Select name="departmentId" defaultValue={data?.departmentId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dep => (
                      <SelectItem key={dep.id} value={dep.id}>{dep.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleId">Cargo / Função</Label>
                <Select name="roleId" defaultValue={data?.roleId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2 border p-4 rounded-lg bg-slate-50">
              <Switch 
                id="isActive" 
                checked={isActive} 
                onCheckedChange={setIsActive} 
              />
              <Label htmlFor="isActive" className="font-semibold cursor-pointer">
                Servidor Ativo
              </Label>
              <p className="text-sm text-slate-500 ml-4">
                Desative esta opção para servidores desligados ou inativos, preservando o histórico.
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/rh/servidores">
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
