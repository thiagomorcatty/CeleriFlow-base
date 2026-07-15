import { HeartHandshake, Users, Building2, FileText, Gift } from "lucide-react";

export default function SocialDashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Painel da Assistência Social</h1>
        <p className="text-slate-500">Visão geral dos atendimentos, famílias cadastradas e unidades SUAS.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Famílias Cadastradas</p>
              <h3 className="text-2xl font-bold text-slate-800">42</h3>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Unidades CRAS/CREAS</p>
              <h3 className="text-2xl font-bold text-slate-800">5</h3>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Atendimentos no Mês</p>
              <h3 className="text-2xl font-bold text-slate-800">128</h3>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Benefícios Concedidos</p>
              <h3 className="text-2xl font-bold text-slate-800">35</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mt-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Avisos e Ações Rápidas</h2>
        <p className="text-slate-600">
          Bem-vindo ao módulo de Gestão SUAS. Utilize o menu lateral para navegar entre Famílias, Unidades, Prontuário Eletrônico e Concessão de Benefícios.
        </p>
      </div>
    </div>
  );
}
