"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, Edit, MoreHorizontal, FileText } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteBidding } from "./actions";

export function LicitacaoRowActions({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (confirm("Tem certeza que deseja excluir esta licitação?")) {
      setIsDeleting(true);
      await deleteBidding(id);
      setIsDeleting(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      } />
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem render={
          <Link href={`/compras/licitacoes/${id}`}>
            <FileText className="mr-2 h-4 w-4" /> Ver Detalhes
          </Link>
        } />
        <DropdownMenuItem render={
          <Link href={`/compras/licitacoes/${id}/editar`}>
            <Edit className="mr-2 h-4 w-4" /> Editar
          </Link>
        } />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} disabled={isDeleting} className="text-red-600 focus:text-red-600">
          <Trash className="mr-2 h-4 w-4" /> {isDeleting ? "Excluindo..." : "Excluir"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
