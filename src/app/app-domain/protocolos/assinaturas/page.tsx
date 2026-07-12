import { FileSignature, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AssinaturasPage() {
  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-emerald-600" />
            Assinaturas Pendentes
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os documentos que aguardam sua assinatura digital.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Tudo em dia!</h3>
          <p className="text-slate-500 mt-1">Você não possui documentos aguardando assinatura no momento.</p>
        </div>
      </div>
    </div>
  );
}
