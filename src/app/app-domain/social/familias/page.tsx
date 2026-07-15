import { prisma } from "@/lib/prisma";
import { Users, Search, Plus, CreditCard, HeartPulse } from "lucide-react";

export default async function FamiliasSociaisPage() {
  const familias = await prisma.socialFamily.findMany({
    include: {
      representative: true,
      members: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Famílias e Indivíduos
          </h1>
          <p className="text-slate-500">Gestão do Cadastro Único Municipal e composição familiar.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por NIS ou Responsável..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 w-full md:w-72"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Família</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Responsável Familiar</th>
                <th className="p-4 font-semibold">Identificação</th>
                <th className="p-4 font-semibold">Renda e Vulnerabilidade</th>
                <th className="p-4 font-semibold">Membros</th>
                <th className="p-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {familias.length > 0 ? (
                familias.map((familia) => (
                  <tr key={familia.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">
                        {familia.representative?.fullName || 'Sem responsável'}
                      </p>
                      {familia.representative?.cpf && (
                        <p className="text-xs text-slate-500 mt-1">
                          CPF: {familia.representative.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                        </p>
                      )}
                    </td>
                    <td className="p-4 text-slate-600">
                      <p className="flex items-center gap-1 font-medium text-xs">
                        <CreditCard className="w-3 h-3 text-slate-400" /> 
                        NIS: {familia.nis || 'Não informado'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Cód. Familiar: {familia.familyCode}
                      </p>
                    </td>
                    <td className="p-4">
                      {familia.perCapitaIncome !== null && (
                        <p className="text-xs font-semibold text-slate-700">
                          Renda Per Capita: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(familia.perCapitaIncome)}
                        </p>
                      )}
                      {familia.vulnerabilities && (
                        <p className="text-xs text-red-600 mt-1 max-w-[200px] truncate" title={familia.vulnerabilities}>
                          {familia.vulnerabilities}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                        {familia.members.length + 1} pessoa(s)
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors text-xs font-medium">
                          Indivíduos
                        </button>
                        <button className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors text-xs font-medium">
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Nenhuma família encontrada.
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
