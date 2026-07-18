"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetTrigger 
} from "@/components/ui/sheet";
import { createMeterReading } from "../actions";

export function NewReadingSheet({ units }: { units: { id: string; code: string; address: string }[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await createMeterReading({
        unitId: formData.get("unitId") as string,
        competence: formData.get("competence") as string,
        previousValue: parseFloat(formData.get("previousValue") as string),
        currentValue: parseFloat(formData.get("currentValue") as string),
        readerName: formData.get("readerName") as string,
      });
      if (result.error) {
        alert(result.error);
        return;
      }
      setOpen(false);
    } catch {
      alert("Erro ao cadastrar leitura.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<button className="flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2 rounded-lg font-medium transition-colors" />}>
        <FileText className="h-5 w-5" />
        Nova Leitura
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Registrar Leitura</SheetTitle>
          <SheetDescription>
            Registre a medição mensal de consumo de água.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Unidade Consumidora</label>
            <select name="unitId" required className="w-full p-2 border rounded-md">
              <option value="">Selecione...</option>
              {units.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.code} - {unit.address}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Competência (Mês/Ano)</label>
            <input
              name="competence"
              required
              className="w-full p-2 border rounded-md"
              placeholder="Ex: 08/2026"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Leitura Anterior</label>
              <input
                type="number"
                name="previousValue"
                step="0.01"
                min="0"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Leitura Atual</label>
              <input
                type="number"
                name="currentValue"
                step="0.01"
                min="0"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Leiturista (Nome)</label>
            <input
              name="readerName"
              required
              className="w-full p-2 border rounded-md"
              placeholder="João da Silva"
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
              {loading ? "Salvando..." : "Salvar Leitura"}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
