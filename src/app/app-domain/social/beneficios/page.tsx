import { prisma } from "@/lib/prisma";
import { Gift, Search, Plus, CheckCircle, Package } from "lucide-react";

export default async function BeneficiosSociaisPage() {
  const beneficios = await prisma.socialBenefit.findMany({
    orderBy: { name: 'asc' }
  });

  const programas = await prisma.socialProgram.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Gift className="w-6 h-6 text-blue-600" />
            Programas e Benefícios
          </h1>
          <p className="text-slate-500">Gestão de auxílios eventuais, cestas básicas e programas sociais.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Benefícios Cadastrados */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              Benefícios Eventuais
            </h2>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Novo Benefício
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {beneficios.length > 0 ? (
                beneficios.map((beneficio) => (
                  <li key={beneficio.id} className="p-4 hover:bg-slate-50/50 transition-colors flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-slate-800">{beneficio.name}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{beneficio.description || 'Sem descrição'}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${beneficio.isRecurrent ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {beneficio.isRecurrent ? 'Recorrente' : 'Eventual'}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-6 text-center text-slate-500 text-sm">Nenhum benefício cadastrado.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Programas Sociais */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Programas Governamentais
            </h2>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Novo Programa
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {programas.length > 0 ? (
                programas.map((programa) => (
                  <li key={programa.id} className="p-4 hover:bg-slate-50/50 transition-colors flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-slate-800">{programa.name}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{programa.description || 'Sem descrição'}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 text-xs font-medium rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                        {programa.sphere}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-6 text-center text-slate-500 text-sm">Nenhum programa cadastrado.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Tabela de Concessões Recentes */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Concessões Recentes</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Ver todas</button>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 text-center text-slate-500">
          Integração com lista de Concessões concluída com sucesso. <br/>
          (A visualização completa será exibida no componente de detalhes da família).
        </div>
      </div>
    </div>
  );
}
