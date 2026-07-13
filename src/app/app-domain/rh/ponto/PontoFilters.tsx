"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function PontoFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [month, setMonth] = useState(searchParams.get("month") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (month) params.set("month", month);
    
    router.push(`/rh/ponto?${params.toString()}`);
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
        <Input 
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="bg-white"
        />
      </div>
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Filtrar
      </Button>
    </form>
  );
}
