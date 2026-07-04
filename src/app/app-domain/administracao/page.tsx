import { Building2, Network, Users, ClipboardList } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdministracaoPage() {
  // We can fetch real counts from the database here
  const institution = await prisma.institution.findFirst();
  const secretariatsCount = await prisma.secretariat.count();
  const departmentsCount = await prisma.department.count();
  const employeesCount = await prisma.employee.count();
  const demandsCount = await prisma.internalDemand.count({ where: { status: "Aberta" } });

  const stats = [
    { title: "Secretarias", value: secretariatsCount.toString(), icon: Building2, href: "/administracao/secretarias", color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Departamentos", value: departmentsCount.toString(), icon: Network, href: "/administracao/departamentos", color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Servidores", value: employeesCount.toString(), icon: Users, href: "/administracao/servidores", color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Demandas Abertas", value: demandsCount.toString(), icon: ClipboardList, href: "/administracao/demandas", color: "text-rose-600", bg: "bg-rose-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Painel Administrativo</h1>
        <p className="text-slate-500 mt-2">Visão geral da estrutura organizacional da prefeitura.</p>
      </div>

      {!institution ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h3 className="text-amber-800 font-semibold text-lg">Dados da Prefeitura Incompletos</h3>
            <p className="text-amber-700 mt-1 text-sm">Você precisa configurar os dados principais da instituição para liberar algumas funcionalidades.</p>
          </div>
          <Link href="/administracao/instituicao" className="shrink-0 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
            Configurar Agora
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex items-center gap-4">
          {institution.logoUrl ? (
            <img src={institution.logoUrl} alt="Logo" className="w-16 h-16 rounded-lg object-contain" />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <Building2 className="w-8 h-8 text-slate-400" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-slate-800">{institution.name}</h2>
            <p className="text-slate-500 text-sm">{institution.cnpj ? `CNPJ: ${institution.cnpj}` : 'CNPJ não configurado'}</p>
          </div>
        </div>
      )}

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
    </div>
  );
}
