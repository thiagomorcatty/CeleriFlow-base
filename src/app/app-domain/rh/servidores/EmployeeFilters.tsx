"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Department, Role } from "@prisma/client";

export function EmployeeFilters({ roles, departments }: { roles: Role[], departments: Department[] }) {
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
      
      <div className="w-[180px] shrink-0">
        <Select value={status === "all" ? "" : status} onValueChange={(v) => setStatus(v || "all")}>
          <SelectTrigger className="bg-white">
            <span className="flex-1 text-left line-clamp-1">
              {status === "all" ? "Todos os Status" : status === "active" ? "Ativos" : "Inativos"}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-[280px] shrink-0">
        <Select value={departmentId === "all" ? "" : departmentId} onValueChange={(v) => setDepartmentId(v || "all")}>
          <SelectTrigger className="bg-white">
            <span className="flex-1 text-left line-clamp-1">
              {departmentId === "all" ? "Todos os Setores" : departments.find(d => d.id === departmentId)?.name || "Todos os Setores"}
            </span>
          </SelectTrigger>
          <SelectContent className="max-h-[300px] !w-auto min-w-[var(--anchor-width)]">
            <SelectItem value="all">Todos os Setores</SelectItem>
            {departments.map(d => (
              <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-[280px] shrink-0">
        <Select value={roleId === "all" ? "" : roleId} onValueChange={(v) => setRoleId(v || "all")}>
          <SelectTrigger className="bg-white">
            <span className="flex-1 text-left line-clamp-1">
              {roleId === "all" ? "Todos os Cargos" : roles.find(r => r.id === roleId)?.name || "Todos os Cargos"}
            </span>
          </SelectTrigger>
          <SelectContent className="max-h-[300px] !w-auto min-w-[var(--anchor-width)]">
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
