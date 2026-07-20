import { Building2, Receipt, MapPin, Search, PlusCircle, BarChart3, Users } from "lucide-react";
import Link from "next/link";
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export const dynamic = "force-dynamic";

export default async function TributacaoDashboardPage() {
  const { prisma } = await getTenantContextForModule("TRIBUTACAO");
  const taxpayersCount = await prisma.taxpayer.count();
  const guidesCount = await prisma.taxGuide.count();
  const economyCount = await prisma.economicRegistration.count();

  // Soma o valor total de guias pagas (exemplo de métrica)
  const paidGuides = await prisma.taxGuide.aggregate({
    where: { status: "Paga" },
    _sum: { totalValue: true }
  });
  const totalArrecadado = paidGuides._sum.totalValue || 0;

  const stats = [
    { title: "Arrecadação do Mês", value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalArrecadado), icon: BarChart3, href: "/tributacao/guias", color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Guias Emitidas", value: guidesCount.toString(), icon: Receipt, href: "/tributacao/guias", color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Inscrições Econômicas", value: economyCount.toString(), icon: Building2, href: "/tributacao/economico", color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Contribuintes Fiscais", value: taxpayersCount.toString(), icon: Users, href: "/cadastros/contribuintes", color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Painel Tributário</h1>
          <p className="text-slate-500 mt-2">Acompanhe a arrecadação, emissão de guias e inscrições municipais.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/tributacao/guias" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Nova Guia Rápida
          </Link>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="block group">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className="w-6 h-6" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500 mt-1">{stat.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-600" />
              Últimas Guias Emitidas
            </h3>
            <Link href="/tributacao/guias" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">Ver Todas</Link>
          </div>
          <div className="p-8 text-center flex flex-col items-center justify-center flex-1">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <Search className="text-slate-400 w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm">Nenhuma guia recente encontrada.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              Atalhos Rápidos
            </h3>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4 flex-1">
            <Link href="/tributacao/economico" className="p-4 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors group">
              <Building2 className="w-6 h-6 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm text-slate-800 block">Cadastro Econômico</span>
              <span className="text-xs text-slate-500">Empresas e Autônomos</span>
            </Link>
            <Link href="/tributacao/imoveis" className="p-4 border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors group">
              <MapPin className="w-6 h-6 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm text-slate-800 block">Imóveis Fiscais</span>
              <span className="text-xs text-slate-500">Consulta de IPTU</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
