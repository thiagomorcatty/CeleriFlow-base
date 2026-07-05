import { Construction } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
        <Construction className="w-8 h-8 text-slate-400" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Em Desenvolvimento</h1>
      <p className="text-slate-500 max-w-md">Este módulo está sendo construído e estará disponível em breve.</p>
    </div>
  );
}
