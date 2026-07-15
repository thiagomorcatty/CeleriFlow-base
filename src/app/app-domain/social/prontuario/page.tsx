import { prisma } from "@/lib/prisma";
import { FileText, Search, ClipboardList, Lock, Clock } from "lucide-react";

export default async function ProntuarioSocialPage() {
  const atendimentos = await prisma.socialAttendance.findMany({
    include: {
      family: true,
      person: true,
      professional: true,
      unit: true,
    },
    orderBy: {
      date: 'desc'
    }
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Prontuário Eletrônico SUAS
          </h1>
          <p className="text-slate-500">Histórico de atendimentos, visitas e acompanhamentos técnicos.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por código da família ou nome..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 w-full md:w-72"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Novo Atendimento</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Data / Unidade</th>
                <th className="p-4 font-semibold">Família / Cidadão</th>
                <th className="p-4 font-semibold">Tipo e Relato</th>
                <th className="p-4 font-semibold">Técnico Responsável</th>
                <th className="p-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {atendimentos.length > 0 ? (
                atendimentos.map((atendimento) => (
                  <tr key={atendimento.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(atendimento.date))}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {atendimento.unit.name}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-800">
                        {atendimento.person ? atendimento.person.fullName : `Família ${atendimento.family.familyCode}`}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Cód: {atendimento.family.familyCode}
                      </p>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium border border-indigo-100">
                          {atendimento.type}
                        </span>
                        {atendimento.secrecyLevel === 'Restrito' && (
                          <span title="Atendimento com Sigilo Restrito">
                            <Lock className="w-3.5 h-3.5 text-red-500" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 truncate" title={atendimento.description}>
                        {atendimento.description}
                      </p>
                      {atendimento.referrals && (
                        <p className="text-xs text-blue-600 mt-1 truncate font-medium">
                          Encaminhamento: {atendimento.referrals}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-700">{atendimento.professional.name}</p>
                      <p className="text-xs text-slate-500">{atendimento.professional.registration}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors text-xs font-medium">
                          Ver Detalhes
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Nenhum atendimento registrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
