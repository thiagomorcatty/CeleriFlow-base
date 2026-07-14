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
import { Edit, Save, Plus, ArrowLeft } from "lucide-react";
import { EmployeeBenefitsCard } from "./EmployeeBenefitsCard";
import { MoneyInput } from "@/components/ui/MoneyInput";

// Formata CPF: 000.000.000-00
const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

// Formata Telefone: (00) 00000-0000
const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export function ServidorForm({ 
  data, 
  roles = [], 
  departments = [], 
  secretariats = [],
  benefitConfigs = []
}: { 
  data?: any, 
  roles?: any[], 
  departments?: any[], 
  secretariats?: any[],
  benefitConfigs?: any[]
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isActive, setIsActive] = useState(data ? data.isActive : true);

  const [cpf, setCpf] = useState(data?.cpf || "");
  const [phone, setPhone] = useState(data?.phone || "");
  const [salaryBase, setSalaryBase] = useState(data?.salaryBase || 0);

  const [secretariatId, setSecretariatId] = useState<string>(data?.secretariatId || "");
  const [departmentId, setDepartmentId] = useState<string>(data?.departmentId || "");
  const [roleId, setRoleId] = useState<string>(data?.roleId || "");

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    formData.set("isActive", isActive.toString());
    formData.set("cpf", cpf);
    formData.set("phone", phone);
    
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Dados do Servidor</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-6">
              {data && <input type="hidden" name="id" value={data.id} />}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo <span className="text-red-500">*</span></Label>
                  <Input id="name" name="name" defaultValue={data?.name || ""} placeholder="Ex: João da Silva" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF <span className="text-red-500">*</span></Label>
                  <Input 
                    id="cpf" 
                    name="cpf" 
                    value={cpf} 
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    placeholder="000.000.000-00" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="registration">Matrícula</Label>
                  <Input id="registration" name="registration" defaultValue={data?.registration || ""} placeholder="Ex: 12345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input id="email" name="email" type="email" defaultValue={data?.email || ""} placeholder="email@exemplo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone <span className="text-red-500">*</span></Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="(00) 00000-0000" 
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salaryBase">Salário Base (R$)</Label>
                  <MoneyInput id="salaryBase" name="salaryBase" value={salaryBase} onChange={setSalaryBase} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractedHours">Carga Horária Mensal</Label>
                  <Input id="contractedHours" name="contractedHours" type="number" defaultValue={data?.contractedHours || 220} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secretariatId">Secretaria</Label>
                  <Select name="secretariatId" value={secretariatId} onValueChange={(v) => setSecretariatId(v || "")}>
                    <SelectTrigger>
                      <span className="flex-1 text-left line-clamp-1">
                        {secretariats.find(s => s.id === secretariatId)?.name || "Selecione..."}
                      </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] z-50">
                      {secretariats.map(sec => (
                        <SelectItem key={sec.id} value={sec.id}>{sec.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departmentId">Departamento / Setor</Label>
                  <Select name="departmentId" value={departmentId} onValueChange={(v) => setDepartmentId(v || "")}>
                    <SelectTrigger>
                      <span className="flex-1 text-left line-clamp-1">
                        {departments.find(d => d.id === departmentId)?.name || "Selecione..."}
                      </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] z-50">
                      {departments.map(dep => (
                        <SelectItem key={dep.id} value={dep.id}>{dep.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roleId">Cargo / Função</Label>
                  <Select name="roleId" value={roleId} onValueChange={(v) => setRoleId(v || "")}>
                    <SelectTrigger>
                      <span className="flex-1 text-left line-clamp-1">
                        {roles.find(r => r.id === roleId)?.name || "Selecione..."}
                      </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] z-50">
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
                <p className="text-sm text-slate-500 ml-4 hidden md:block">
                  Desative esta opção para servidores desligados ou inativos, preservando o histórico.
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
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

        {/* Cadastro de Dependentes Interno */}
        {data && (
          <Card className="md:col-span-2 mt-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Dependentes do Servidor</CardTitle>
              <Link href={`/rh/dependentes/novo?employeeId=${data.id}`}>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Novo Dependente
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {data.dependents && data.dependents.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground border-b">
                      <tr>
                        <th className="p-3 font-medium">Nome</th>
                        <th className="p-3 font-medium">Parentesco</th>
                        <th className="p-3 font-medium">Data de Nascimento</th>
                        <th className="p-3 font-medium text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.dependents.map((dep: any) => (
                        <tr key={dep.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="p-3">{dep.name}</td>
                          <td className="p-3">{dep.relationship}</td>
                          <td className="p-3">{dep.birthDate ? new Date(dep.birthDate).toLocaleDateString('pt-BR') : '-'}</td>
                          <td className="p-3 text-right">
                            <Link href={`/rh/dependentes/${dep.id}/editar`}>
                              <Button variant="ghost" size="sm" title="Editar">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground border rounded-md border-dashed">
                  Nenhum dependente cadastrado para este servidor.
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Benefícios Concedidos Interno */}
        {data && (
          <EmployeeBenefitsCard employee={data} benefitConfigs={benefitConfigs} />
        )}
      </div>
    </div>
  );
}
