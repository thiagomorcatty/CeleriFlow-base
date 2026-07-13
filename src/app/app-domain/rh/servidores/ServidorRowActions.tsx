"use client";

import { MoreHorizontal, Edit, Trash2, PowerOff, Power } from "lucide-react";
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
import { toggleServidorStatus, deleteServidor } from "./actions";

export function ServidorRowActions({ employee }: { employee: any }) {
  const handleToggleStatus = async () => {
    if (confirm(`Tem certeza que deseja ${employee.isActive ? 'inativar' : 'ativar'} o servidor ${employee.name}?`)) {
      const result = await toggleServidorStatus(employee.id, !employee.isActive);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDelete = async () => {
    if (confirm(`ATENÃ‡ÃƒO: Deseja realmente excluir este servidor do banco de dados? Isso pode falhar se ele tiver processos, pontos ou folha vinculados.\nRecomendaÃ§Ã£o: Utilize a opÃ§Ã£o de inativar.\nConfirmar exclusÃ£o definitiva?`)) {
      const result = await deleteServidor(employee.id);
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
          <Link href={`/rh/servidores/${employee.id}/editar`} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleToggleStatus} className="cursor-pointer">
          {employee.isActive ? (
            <><PowerOff className="mr-2 h-4 w-4 text-orange-500" /> <span className="text-orange-500">Inativar</span></>
          ) : (
            <><Power className="mr-2 h-4 w-4 text-emerald-500" /> <span className="text-emerald-500">Ativar</span></>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-600 focus:text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir Definitivamente
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
