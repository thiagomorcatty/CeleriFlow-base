"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FeriasFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status && status !== "all") params.set("status", status);
    
    router.push(`/rh/ferias?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2 mb-4 bg-slate-50 p-3 rounded-lg border">
      <div className="flex-1 min-w-[300px]">
        <Input 
          placeholder="Buscar por nome do servidor..." 
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="bg-white"
        />
      </div>
      <div className="w-[200px]">
        <Select value={status} onValueChange={(val) => setStatus(val || "")}>
          <SelectTrigger className="bg-white">
            <span className="flex-1 text-left line-clamp-1">
              {status === "all" ? "Todos" : status}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="A vencer">A vencer</SelectItem>
            <SelectItem value="Disponível">Disponível</SelectItem>
            <SelectItem value="Programada">Programada</SelectItem>
            <SelectItem value="Em gozo">Em gozo</SelectItem>
            <SelectItem value="Concluída">Concluída</SelectItem>
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
