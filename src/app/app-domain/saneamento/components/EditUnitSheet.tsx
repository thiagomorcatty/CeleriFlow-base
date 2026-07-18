"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { updateConsumerUnit } from "../actions";

type Unit = {
  id: string;
  code: string;
  address: string;
  category: string;
  status: string;
  ownerName: string | null;
};

export function EditUnitSheet({ unit }: { unit: Unit }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateConsumerUnit(unit.id, {
        code: formData.get("code") as string,
        address: formData.get("address") as string,
        category: formData.get("category") as string,
        ownerName: formData.get("ownerName") as string,
        status: formData.get("status") as string,
      });
      if (result.error) {
        alert(result.error);
        return;
      }
      setOpen(false);
    } catch {
      alert("Erro ao atualizar unidade consumidora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<button className="p-1.5 text-slate-400 hover:text-[#0284C7] hover:bg-blue-50 rounded transition-colors" title="Editar" />}>
        <Pencil className="h-3.5 w-3.5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Editar Unidade Consumidora</SheetTitle>
          <SheetDescription>
            Atualize os dados da unidade <strong>{unit.code}</strong>.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Código (Ligação)</label>
            <input
              name="code"
              required
              defaultValue={unit.code}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Endereço</label>
            <input
              name="address"
              required
              defaultValue={unit.address}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <select name="category" required defaultValue={unit.category} className="w-full p-2 border rounded-md text-sm">
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Pública">Pública</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select name="status" required defaultValue={unit.status} className="w-full p-2 border rounded-md text-sm">
                <option value="Ativa">Ativa</option>
                <option value="Inativa">Inativa</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome do Titular</label>
            <input
              name="ownerName"
              defaultValue={unit.ownerName ?? ""}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#0284C7] rounded-md hover:bg-[#0369A1] disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
