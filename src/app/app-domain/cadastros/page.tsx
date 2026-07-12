import { Users, Building2, FileText, Home, FileBox, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CadastrosDashboardPage() {
  const personsCount = await prisma.person.count();
  const companiesCount = await prisma.company.count();
  const suppliersCount = await prisma.supplier.count();
  const realEstatesCount = await prisma.realEstate.count();

  const stats = [
    { title: "Pessoas Físicas", value: personsCount.toString(), icon: Users, href: "/cadastros/pessoas-fisicas", color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Pessoas Jurídicas", value: companiesCount.toString(), icon: Building2, href: "/cadastros/pessoas-juridicas", color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Fornecedores", value: suppliersCount.toString(), icon: Users, href: "/cadastros/fornecedores", color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Imóveis", value: realEstatesCount.toString(), icon: Home, href: "/cadastros/imoveis", color: "text-sky-600", bg: "bg-sky-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Painel de Cadastros</h1>
        <p className="text-slate-500 mt-2">Visão geral do Cadastro Único Municipal.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="block group">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <FileBox className="w-5 h-5 text-slate-600" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Acesso Rápido</h3>
          </div>
          <div className="space-y-3">
            <Link href="/cadastros/pessoas-fisicas/novo" className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors">
              <span className="text-sm font-medium text-slate-700">Nova Pessoa Física</span>
              <span className="text-xs text-indigo-600 font-semibold bg-indigo-100 px-2 py-1 rounded-md">Adicionar</span>
            </Link>
            <Link href="/cadastros/pessoas-juridicas/novo" className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors">
              <span className="text-sm font-medium text-slate-700">Nova Empresa / Entidade</span>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-100 px-2 py-1 rounded-md">Adicionar</span>
            </Link>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Qualidade dos Dados</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-slate-100 pb-3">
              <div>
                <p className="text-sm font-medium text-slate-700">Cadastros Duplicados Suspeitos</p>
                <p className="text-xs text-slate-500 mt-0.5">Pessoas com mesmo CPF ou nome similar</p>
              </div>
              <span className="text-lg font-bold text-slate-800">0</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-medium text-slate-700">Documentos Vencidos</p>
                <p className="text-xs text-slate-500 mt-0.5">Certidões e alvarás expirados</p>
              </div>
              <span className="text-lg font-bold text-slate-800">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
