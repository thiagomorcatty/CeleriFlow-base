import { FileSearch, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default function BuscarProcessoPage() {
  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSearch className="w-6 h-6 text-emerald-600" />
            Buscar Processo
          </h1>
          <p className="text-slate-500 mt-1">Pesquise por processos e protocolos em todo o sistema.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <div className="max-w-2xl">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Termo de Busca
            </label>
            <div className="relative w-full flex gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Número, Assunto, Interessado, CPF/CNPJ..." 
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                />
              </div>
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-12 text-center flex flex-col items-center justify-center bg-white">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Search className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Faça uma busca</h3>
          <p className="text-slate-500 mt-1">Utilize o campo acima para pesquisar processos no sistema.</p>
        </div>
      </div>
    </div>
  );
}
