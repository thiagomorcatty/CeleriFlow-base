import { Building2, Search, Plus, MoreVertical, Briefcase } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CadastroEconomicoPage() {
  const registrations = await prisma.economicRegistration.findMany({
    include: {
      taxpayer: {
        include: { person: true, company: true }
      }
    },
    take: 20
  });

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" />
            Cadastro Econômico
          </h1>
          <p className="text-slate-500 mt-1">Inscrições municipais de empresas e autônomos.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Nova Inscrição
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por inscrição ou nome..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
            />
          </div>
        </div>

        {registrations.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Briefcase className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum cadastro econômico</h3>
            <p className="text-slate-500 mt-1">Ainda não existem inscrições municipais cadastradas no sistema.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Inscrição Municipal</th>
                  <th className="px-6 py-3">Contribuinte</th>
                  <th className="px-6 py-3">CNAE Principal</th>
                  <th className="px-6 py-3">Regime</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {reg.municipalInsc}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {reg.taxpayer.company?.corporateName || reg.taxpayer.person?.fullName || "Não Identificado"}
                      <div className="text-xs text-slate-400 font-normal mt-0.5">
                        {reg.taxpayer.company?.cnpj || reg.taxpayer.person?.cpf || ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {reg.primaryCnae || "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {reg.taxRegime || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        reg.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
