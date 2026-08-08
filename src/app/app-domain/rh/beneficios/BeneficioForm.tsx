"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { saveBeneficio } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { MoneyInput } from "@/components/ui/MoneyInput";
import type { BenefitConfig, Company, Person, Supplier } from "@prisma/client";

type SupplierWithIdentity = Supplier & { company: Company | null; person: Person | null };

export function BeneficioForm({ data, suppliers = [] }: { data?: BenefitConfig, suppliers?: SupplierWithIdentity[] }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isActive, setIsActive] = useState(data ? data.isActive : true);
  const [baseValue, setBaseValue] = useState(data?.baseValue || 0);
  const [supplierId, setSupplierId] = useState<string>(data?.supplierId || "none");

  const getSupplierName = (sup: SupplierWithIdentity | undefined) => {
    if (!sup) return "Sem Nome";
    if (sup.company) return sup.company.corporateName || sup.company.tradeName || "Empresa Sem Nome";
    if (sup.person) return sup.person.fullName || "Pessoa Sem Nome";
    return "Sem Nome";
  };

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    formData.set("isActive", isActive.toString());
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
          {data ? "Editar Benefício" : "Novo Benefício"}
        </h2>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Configuração do Benefício</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {data && <input type="hidden" name="id" value={data.id} />}
            
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Benefício <span className="text-red-500">*</span></Label>
              <Input id="name" name="name" defaultValue={data?.name || ""} placeholder="Ex: Vale Refeição Ticket" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Categoria / Tipo <span className="text-red-500">*</span></Label>
                <Select name="type" defaultValue={data?.type || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vale Refeição">Vale Refeição</SelectItem>
                    <SelectItem value="Vale Alimentação">Vale Alimentação</SelectItem>
                    <SelectItem value="Vale Transporte">Vale Transporte</SelectItem>
                    <SelectItem value="Plano de Saúde">Plano de Saúde</SelectItem>
                    <SelectItem value="Plano Odontológico">Plano Odontológico</SelectItem>
                    <SelectItem value="Auxílio Creche">Auxílio Creche</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseValue">Valor Base (R$) <span className="text-red-500">*</span></Label>
                <MoneyInput 
                  id="baseValue" 
                  name="baseValue" 
                  value={baseValue}
                  onChange={setBaseValue}
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplierId">Fornecedor / Operadora</Label>
              <Select name="supplierId" value={supplierId} onValueChange={(v) => setSupplierId(v || "none")}>
                <SelectTrigger>
                  <span className="flex-1 text-left line-clamp-1">
                    {supplierId === "none" || !supplierId
                      ? "Nenhum (Gerido internamente)"
                      : getSupplierName(suppliers.find(s => s.id === supplierId))}
                  </span>
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="none">Nenhum (Gerido internamente)</SelectItem>
                  {suppliers.map(sup => (
                    <SelectItem key={sup.id} value={sup.id}>{getSupplierName(sup)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 border p-4 rounded-lg bg-slate-50">
              <Switch 
                id="isActive" 
                checked={isActive} 
                onCheckedChange={setIsActive} 
              />
              <Label htmlFor="isActive" className="font-semibold cursor-pointer">
                Benefício Ativo
              </Label>
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
