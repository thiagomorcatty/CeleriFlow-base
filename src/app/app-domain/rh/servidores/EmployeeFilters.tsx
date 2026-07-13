"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function EmployeeFilters({ roles, departments }: { roles: any[], departments: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [roleId, setRoleId] = useState(searchParams.get("roleId") || "all");
  const [departmentId, setDepartmentId] = useState(searchParams.get("departmentId") || "all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status !== "all") params.set("status", status);
    if (roleId !== "all") params.set("roleId", roleId);
    if (departmentId !== "all") params.set("departmentId", departmentId);
    
    router.push(`/rh/servidores?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2 mb-4 bg-slate-50 p-3 rounded-lg border">
      <div className="flex-1 min-w-[200px]">
        <Input 
          placeholder="Buscar por nome, CPF ou Matrícula..." 
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="bg-white"
        />
      </div>
      
      <div className="w-[180px]">
        <Select value={status} onValueChange={(v) => setStatus(v || "")}>
          <SelectTrigger className="bg-white"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-[200px]">
        <Select value={departmentId} onValueChange={(v) => setDepartmentId(v || "")}>
          <SelectTrigger className="bg-white"><SelectValue placeholder="Setor" /></SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="all">Todos os Setores</SelectItem>
            {departments.map(d => (
              <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-[200px]">
        <Select value={roleId} onValueChange={(v) => setRoleId(v || "")}>
          <SelectTrigger className="bg-white"><SelectValue placeholder="Cargo" /></SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="all">Todos os Cargos</SelectItem>
            {roles.map(r => (
              <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Filtrar
      </Button>
    </form>
  );
}
