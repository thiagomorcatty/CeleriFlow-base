import { ShieldAlert, Search, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function FiscalizacaoPage() {
  const infractions = await prisma.infraction.findMany({
    include: {
      taxpayer: { include: { person: true, company: true } }
    },
    take: 20,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-orange-600" />
            Fiscalização e Autos
          </h1>
          <p className="text-slate-500 mt-1">Controle de infrações, multas e processos de fiscalização tributária.</p>
        </div>
        <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Registrar Infração
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {infractions.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <ShieldAlert className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum auto de infração</h3>
            <p className="text-slate-500 mt-1">Os autos de infração aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Tipo de Infração</th>
                  <th className="px-6 py-3">Contribuinte</th>
                  <th className="px-6 py-3">Valor da Multa</th>
                  <th className="px-6 py-3">Prazo Defesa</th>
                  <th className="px-6 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {infractions.map((inf) => (
                  <tr key={inf.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {inf.infractionType}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {inf.taxpayer?.company?.corporateName || inf.taxpayer?.person?.fullName || "Não Informado"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-orange-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inf.penaltyValue)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {inf.defenseDeadline ? new Date(inf.defenseDeadline).toLocaleDateString('pt-BR') : "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        inf.status === 'Emitido' ? 'bg-orange-100 text-orange-700' :
                        inf.status === 'Pago' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {inf.status}
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
