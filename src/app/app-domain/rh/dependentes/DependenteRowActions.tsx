"use client";

import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteDependente } from "./actions";

export function DependenteRowActions({ dependent }: { dependent: any }) {
  const handleDelete = async () => {
    if (confirm(`Deseja realmente excluir este dependente?`)) {
      const result = await deleteDependente(dependent.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>AÃ§Ãµes</DropdownMenuLabel>
        
        <DropdownMenuItem>
          <Link href={`/rh/dependentes/${dependent.id}/editar`} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-600 focus:text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
