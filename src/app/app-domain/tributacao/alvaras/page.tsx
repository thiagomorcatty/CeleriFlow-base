import { FileCheck, Search, Plus } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AlvarasPage() {
  const licenses = await prisma.license.findMany({
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
            <FileCheck className="w-6 h-6 text-indigo-600" />
            Alvarás e Licenças
          </h1>
          <p className="text-slate-500 mt-1">Gestão de alvarás de funcionamento e sanitários.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Alvará
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {licenses.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileCheck className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Nenhum alvará emitido</h3>
            <p className="text-slate-500 mt-1">Os alvarás e licenças aparecerão aqui.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Tipo de Alvará</th>
                  <th className="px-6 py-3">Contribuinte</th>
                  <th className="px-6 py-3">Emissão</th>
                  <th className="px-6 py-3">Validade</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {licenses.map((license) => (
                  <tr key={license.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {license.licenseType}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {license.taxpayer?.company?.corporateName || license.taxpayer?.person?.fullName || "Não Informado"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {license.issueDate ? new Date(license.issueDate).toLocaleDateString('pt-BR') : "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {license.validUntil ? new Date(license.validUntil).toLocaleDateString('pt-BR') : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        license.status === 'Emitido' || license.status === 'Ativo' ? 'bg-indigo-100 text-indigo-700' :
                        license.status === 'Vencido' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {license.status}
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
