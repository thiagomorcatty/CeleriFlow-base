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
import { createProposicao } from "../actions";

export function NewProposicaoSheet({ vereadores }: { vereadores: { id: string; nomeParlamentar: string }[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await createProposicao({
        numero: formData.get("numero") as string,
        tipo: formData.get("tipo") as string,
        ementa: formData.get("ementa") as string,
        texto: formData.get("texto") as string,
        autorId: formData.get("autorId") as string,
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar proposição.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<button className="flex items-center gap-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white px-4 py-2 rounded-lg font-medium transition-colors" />}>
        <FileText className="h-5 w-5" />
        Nova Proposição
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Registrar Proposição</SheetTitle>
          <SheetDescription>
            Cadastre um novo projeto de lei, requerimento, indicação ou moção.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Número/Ano</label>
            <input
              name="numero"
              required
              className="w-full p-2 border rounded-md"
              placeholder="Ex: PL-001/2026"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Proposição</label>
            <select name="tipo" required className="w-full p-2 border rounded-md">
              <option value="Projeto de Lei">Projeto de Lei</option>
              <option value="Requerimento">Requerimento</option>
              <option value="Indicação">Indicação</option>
              <option value="Moção">Moção</option>
              <option value="Emenda">Emenda</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Vereador(a) Autor(a)</label>
            <select name="autorId" required className="w-full p-2 border rounded-md">
              <option value="">Selecione...</option>
              {vereadores.map(ver => (
                <option key={ver.id} value={ver.id}>
                  {ver.nomeParlamentar}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Ementa (Assunto)</label>
            <textarea
              name="ementa"
              required
              rows={3}
              className="w-full p-2 border rounded-md"
              placeholder="Dispõe sobre..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Texto Completo (Opcional)</label>
            <textarea
              name="texto"
              rows={5}
              className="w-full p-2 border rounded-md"
              placeholder="Art. 1º - Fica instituído..."
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
              className="px-4 py-2 text-sm font-medium text-white bg-[#9333EA] rounded-md hover:bg-[#7E22CE] disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar Proposição"}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
