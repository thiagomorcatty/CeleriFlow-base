"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetTrigger 
} from "@/components/ui/sheet";
import { createEnvDocument } from "../actions";

export function NewDocumentSheet({ enterprises }: { enterprises: { id: string; name: string }[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await createEnvDocument(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setOpen(false);
    }
    setLoading(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors" />}>
        <Plus className="h-5 w-5" />
        Anexar Documento
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Anexar Documento Ambiental</SheetTitle>
          <SheetDescription>
            Registre laudos técnicos, termos de compromisso ou relatórios vinculados a empreendimentos.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Título do Documento</label>
            <input 
              name="title" 
              required 
              className="w-full p-2 border rounded-md text-sm" 
              placeholder="Ex: RIMA - Relatório de Impacto Ambiental 2026"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Documento</label>
            <select name="docType" className="w-full p-2 border rounded-md text-sm" required>
              <option value="">Selecione...</option>
              <option value="Laudo/Relatório Técnico">Laudo/Relatório Técnico</option>
              <option value="Termo de Compromisso">Termo de Compromisso</option>
              <option value="Parecer Técnico">Parecer Técnico</option>
              <option value="Alvará/Autorização Especial">Alvará/Autorização Especial</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Vincular a Empreendimento (Opcional)</label>
            <select name="enterpriseId" className="w-full p-2 border rounded-md text-sm">
              <option value="">Nenhum (Documento geral)</option>
              {enterprises.map((ent) => (
                <option key={ent.id} value={ent.id}>{ent.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Link do Arquivo / PDF (Simulado)</label>
            <input 
              name="fileUrl" 
              className="w-full p-2 border rounded-md text-sm" 
              placeholder="Ex: /docs/meu-laudo.pdf"
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
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar Documento"}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
