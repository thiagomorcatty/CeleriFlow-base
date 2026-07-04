import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Building2, Search, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PessoasJuridicasPage() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-600" />
            Pessoas Jurídicas
          </h1>
          <p className="text-slate-500 mt-1">Gerencie as empresas, entidades, fornecedores e instituições cadastradas.</p>
        </div>
        <Link href="/app-domain/cadastros/pessoas-juridicas/novo" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Adicionar Nova Empresa
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por Razão Social ou CNPJ..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>
        </div>

        {companies.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Building2 className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
            <p className="text-slate-500 mt-1">Comece adicionando a primeira pessoa jurídica na base de dados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Razão Social / Nome Fantasia</th>
                  <th className="px-6 py-3">CNPJ</th>
                  <th className="px-6 py-3">Contato</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {company.corporateName}
                      {company.tradeName && <span className="block text-xs text-slate-500 font-normal mt-0.5">{company.tradeName}</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{company.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</td>
                    <td className="px-6 py-4 text-slate-600">{company.emailPrimary || company.phone || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${company.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold">Editar</button>
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
