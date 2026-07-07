import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MapPin, Search, Plus, Upload, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EnderecosPage() {
  const addresses = await prisma.address.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      neighborhood: true,
      person: true,
      company: true,
    },
    take: 20
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-orange-600" />
            Endereços
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os endereços vinculados a pessoas, empresas e imóveis.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            Importar
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <Link href="/app-domain/cadastros/enderecos/novo" className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Adicionar Novo Endereço
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por Logradouro, CEP ou Vínculo..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600"
            />
          </div>
        </div>

        {addresses.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <MapPin className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
            <p className="text-slate-500 mt-1">Comece adicionando o primeiro endereço na base de dados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Logradouro</th>
                  <th className="px-6 py-3">Número</th>
                  <th className="px-6 py-3">Bairro</th>
                  <th className="px-6 py-3">CEP</th>
                  <th className="px-6 py-3">Vínculo</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {addresses.map((addr) => {
                  let link = '-';
                  if (addr.person) link = addr.person.fullName;
                  else if (addr.company) link = addr.company.corporateName;

                  return (
                    <tr key={addr.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {addr.streetName || 'S/ Logradouro'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{addr.number || 'S/N'}</td>
                      <td className="px-6 py-4 text-slate-600">{addr.neighborhood?.name || '-'}</td>
                      <td className="px-6 py-4 text-slate-600">{addr.zipCode || '-'}</td>
                      <td className="px-6 py-4 text-slate-600">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                          {link}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-orange-600 hover:text-orange-800 text-sm font-semibold">Editar</button>
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
