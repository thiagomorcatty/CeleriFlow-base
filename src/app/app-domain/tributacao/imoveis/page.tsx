import { MapPin, Search, Plus, MoreVertical, Home } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ImoveisFiscaisPage() {
  const imoveis = await prisma.realEstate.findMany({
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
            <MapPin className="w-6 h-6 text-emerald-600" />
            Imóveis Fiscais
          </h1>
          <p className="text-slate-500 mt-1">Cadastro de imóveis para controle de IPTU, ITBI e taxas.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Imóvel
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por inscrição imobiliária ou endereço..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>
        </div>

        {imoveis.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Home className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum imóvel cadastrado</h3>
            <p className="text-slate-500 mt-1">Os imóveis cadastrados no sistema aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Inscrição Imobiliária</th>
                  <th className="px-6 py-3">Endereço Principal</th>
                  <th className="px-6 py-3">Proprietário / Responsável</th>
                  <th className="px-6 py-3">Área (m²)</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {imoveis.map((imovel) => (
                  <tr key={imovel.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {imovel.municipalInsc || "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {imovel.streetName ? `${imovel.streetName}, ${imovel.number}` : "Endereço não informado"}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {imovel.taxpayer?.company?.corporateName || imovel.taxpayer?.person?.fullName || "Não Informado"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="text-xs">
                        T: {imovel.landArea || 0}m²
                        <br/>
                        C: {imovel.builtArea || 0}m²
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-emerald-600 transition-colors">
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
