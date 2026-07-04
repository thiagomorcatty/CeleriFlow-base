"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  Landmark, 
  Network, 
  MapPin, 
  Briefcase, 
  Users, 
  ClipboardList, 
  CalendarDays,
  LayoutDashboard
} from "lucide-react";

const sidebarNavItems = [
  { title: "Painel Administrativo", href: "/administracao", icon: LayoutDashboard },
  { title: "Dados da Prefeitura", href: "/administracao/instituicao", icon: Landmark },
  { title: "Secretarias", href: "/administracao/secretarias", icon: Building2 },
  { title: "Departamentos", href: "/administracao/departamentos", icon: Network },
  { title: "Unidades Administrativas", href: "/administracao/unidades", icon: MapPin },
  { title: "Cargos e Funções", href: "/administracao/cargos", icon: Briefcase },
  { title: "Servidores", href: "/administracao/servidores", icon: Users },
  { title: "Demandas Internas", href: "/administracao/demandas", icon: ClipboardList },
  { title: "Calendário", href: "/administracao/calendario", icon: CalendarDays },
];

export default function AdministracaoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full max-w-[1600px] mx-auto bg-slate-50/30">
      {/* Sidebar */}
      <aside className="w-full md:w-[260px] md:shrink-0 md:border-r border-slate-200 bg-white py-6 px-4 md:px-5 shadow-[2px_0_8px_rgba(0,0,0,0.02)] z-10 relative">
        <div className="mb-8 px-2">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">Administração Geral</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Gestão Institucional</p>
        </div>
        <nav className="flex flex-col gap-1.5">
          {sidebarNavItems.map((item) => {
            // Check exact match for root, or starts with for sub-pages
            const isActive = item.href === "/administracao" 
              ? pathname === "/administracao" 
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 outline-none ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-600/50"
                }`}
              >
                <item.icon className={`h-[18px] w-[18px] ${isActive ? "text-white" : "text-slate-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
