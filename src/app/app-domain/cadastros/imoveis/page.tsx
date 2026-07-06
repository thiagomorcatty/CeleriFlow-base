import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Home, Search, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ImoveisPage() {
  const realEstates = await prisma.realEstate.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      neighborhood: true,
      taxpayer: {
        include: {
          person: true,
          company: true,
        }
      }
    },
    take: 20
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Home className="w-6 h-6 text-sky-600" />
            Imóveis
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os imóveis cadastrados no município.</p>
        </div>
        <Link href="/cadastros/imoveis/novo" className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Adicionar Novo Imóvel
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por Inscrição ou Endereço..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600"
            />
          </div>
        </div>

        {realEstates.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Home className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
            <p className="text-slate-500 mt-1">Comece adicionando o primeiro imóvel na base de dados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Insc. Imobiliária</th>
                  <th className="px-6 py-3">Endereço</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Proprietário (Contribuinte)</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {realEstates.map((re) => {
                  let owner = 'N/A';
                  if (re.taxpayer?.person) {
                    owner = re.taxpayer.person.fullName;
                  } else if (re.taxpayer?.company) {
                    owner = re.taxpayer.company.corporateName;
                  }

                  const addressStr = `${re.streetName || ''}, ${re.number || 'S/N'}${re.neighborhood ? ` - ${re.neighborhood.name}` : ''}`;

                  return (
                    <tr key={re.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {re.municipalInsc || 'S/ Inscrição'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{addressStr || '-'}</td>
                      <td className="px-6 py-4 text-slate-600">{re.propertyType || '-'}</td>
                      <td className="px-6 py-4 text-slate-600">{owner}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${re.status === 'Regular' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'}`}>
                          {re.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-sky-600 hover:text-sky-800 text-sm font-semibold">Editar</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
