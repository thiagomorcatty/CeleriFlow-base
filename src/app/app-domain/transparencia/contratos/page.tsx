import { FileSignature, Search, Download } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ContratosPage() {
  const contracts = await prisma.contract.findMany({
    orderBy: { startDate: 'desc' },
    include: {
      supplier: {
        include: { company: true, person: true }
      }
    }
  });

  return (
    <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/transparencia" className="text-sm font-semibold text-blue-600 hover:underline mb-2 inline-block">
            &larr; Voltar para Transparência
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-emerald-600" />
            Contratos Públicos
          </h1>
          <p className="text-slate-500 mt-1">Consulte todos os contratos firmados pela prefeitura.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por número, objeto ou fornecedor..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>
        </div>

        {contracts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Nenhum contrato encontrado.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Contrato</th>
                  <th className="px-6 py-3">Fornecedor</th>
                  <th className="px-6 py-3">Objeto</th>
                  <th className="px-6 py-3">Vigência</th>
                  <th className="px-6 py-3">Valor</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Integra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contracts.map((c) => {
                  const supplierName = c.supplier.company?.tradeName || c.supplier.company?.corporateName || c.supplier.person?.fullName || "Desconhecido";
                  const supplierDoc = c.supplier.company?.cnpj || c.supplier.person?.cpf || "";

                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{c.number}</td>
                      <td className="px-6 py-4">
                        <span className="block font-medium text-slate-800">{supplierName}</span>
                        <span className="block text-xs text-slate-500">{supplierDoc}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate text-slate-600" title={c.object}>
                          {c.object}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-xs">
                        {new Date(c.startDate).toLocaleDateString('pt-BR')} até <br />
                        {new Date(c.endDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 font-semibold text-emerald-700">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c.updatedValue)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          c.status === 'Vigente' ? 'bg-emerald-100 text-emerald-700' :
                          c.status === 'Encerrado' ? 'bg-slate-100 text-slate-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <Link 
                          href={`/compras/contratos`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                          title="Abrir no Módulo de Compras"
                        >
                          Ver no Compras
                        </Link>
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-xs font-bold transition-colors">
                          <Download className="w-4 h-4" /> PDF
                        </button>
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
