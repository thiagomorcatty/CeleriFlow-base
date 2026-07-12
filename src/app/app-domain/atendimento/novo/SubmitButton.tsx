"use client";

import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2 } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
    >
      {pending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <CheckCircle2 className="w-4 h-4" />
      )}
      {pending ? "Abrindo Chamado..." : "Abrir Chamado"}
    </button>
  );
}
