import { prisma } from "@/lib/prisma";
import { Building2, Search, Plus, MapPin, Phone, Mail } from "lucide-react";

export default async function UnidadesSociaisPage() {
  const unidades = await prisma.socialUnit.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            Unidades SUAS
          </h1>
          <p className="text-slate-500">Gerencie CRAS, CREAS, Centros POP e Acolhimentos.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar unidade..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Unidade</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Unidade</th>
                <th className="p-4 font-semibold">Tipo</th>
                <th className="p-4 font-semibold">Contato</th>
                <th className="p-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {unidades.length > 0 ? (
                unidades.map((unidade) => (
                  <tr key={unidade.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">{unidade.name}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                        {unidade.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      {unidade.phone && (
                        <p className="flex items-center gap-1 text-xs">
                          <Phone className="w-3 h-3" /> {unidade.phone}
                        </p>
                      )}
                      {unidade.email && (
                        <p className="flex items-center gap-1 text-xs mt-1">
                          <Mail className="w-3 h-3" /> {unidade.email}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors text-xs font-medium">
                          Editar
                        </button>
                        <button className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors text-xs font-medium">
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Nenhuma unidade encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
