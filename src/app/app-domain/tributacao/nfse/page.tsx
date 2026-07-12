import { FileText, Search, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NfsePage() {
  const invoices = await prisma.invoice.findMany({
    include: {
      provider: { include: { person: true, company: true } },
      taker: { include: { person: true, company: true } }
    },
    take: 20,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Nota Fiscal Eletrônica (NFS-e)
          </h1>
          <p className="text-slate-500 mt-1">Controle de emissão e retenção do ISSQN.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Emitir Avulsa
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {invoices.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileText className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhuma NFS-e emitida</h3>
            <p className="text-slate-500 mt-1">As notas fiscais de serviço emitidas no município aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Nº NFS-e</th>
                  <th className="px-6 py-3">Prestador</th>
                  <th className="px-6 py-3">Tomador</th>
                  <th className="px-6 py-3">Competência</th>
                  <th className="px-6 py-3">Valor do Serviço</th>
                  <th className="px-6 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono font-bold text-blue-600">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {inv.provider.company?.corporateName || inv.provider.person?.fullName || "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {inv.taker?.company?.corporateName || inv.taker?.person?.fullName || "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {inv.competence}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inv.serviceValue)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        inv.status === 'Emitida' ? 'bg-blue-100 text-blue-700' :
                        inv.status === 'Cancelada' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {inv.status}
                      </span>
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
