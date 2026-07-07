import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, Search, Plus, Upload, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ContribuintesPage() {
  const taxpayers = await prisma.taxpayer.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
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
            <FileText className="w-6 h-6 text-amber-600" />
            Contribuintes
          </h1>
          <p className="text-slate-500 mt-1">Gerencie os contribuintes (Pessoas Físicas e Jurídicas) do município.</p>
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
          <Link href="/app-domain/cadastros/contribuintes/novo" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Adicionar Novo Contribuinte
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por Nome, Inscrição ou Documento..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600"
            />
          </div>
        </div>

        {taxpayers.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileText className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
            <p className="text-slate-500 mt-1">Comece adicionando o primeiro contribuinte na base de dados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Nome / Razão Social</th>
                  <th className="px-6 py-3">Inscrição Municipal</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Documento (CPF/CNPJ)</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {taxpayers.map((taxpayer) => {
                  const name = taxpayer.person ? taxpayer.person.fullName : taxpayer.company?.corporateName;
                  const doc = taxpayer.person ? taxpayer.person.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : taxpayer.company?.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
                  
                  return (
                    <tr key={taxpayer.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{taxpayer.municipalInsc || 'Não informada'}</td>
                      <td className="px-6 py-4 text-slate-600">{taxpayer.taxpayerType}</td>
                      <td className="px-6 py-4 text-slate-600">{doc || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${taxpayer.status === 'Ativo' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                          {taxpayer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-amber-600 hover:text-amber-800 text-sm font-semibold">Editar</button>
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
