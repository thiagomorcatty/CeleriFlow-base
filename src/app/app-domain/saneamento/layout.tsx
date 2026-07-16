"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Droplets,
  LayoutDashboard,
  ArrowLeft,
  Menu,
  X,
  Users,
  FileText,
  Receipt,
  Wrench,
  Search,
  Droplet,
  Globe,
  BarChart3
} from "lucide-react";

const sidebarNavItems = [
  { title: "Painel", href: "/app-domain/saneamento", icon: LayoutDashboard },
  { title: "Cadastros", href: "/app-domain/saneamento/cadastros", icon: Users },
  { title: "Leituras e Consumo", href: "/app-domain/saneamento/leituras", icon: FileText },
  { title: "Faturamento", href: "/app-domain/saneamento/faturamento", icon: Receipt },
  { title: "Serviços e Manutenção", href: "/app-domain/saneamento/servicos", icon: Wrench },
  { title: "Esgoto e Qualidade", href: "/app-domain/saneamento/qualidade", icon: Droplet },
  { title: "Portal do Consumidor", href: "/app-domain/saneamento/portal", icon: Globe },
  { title: "Relatórios", href: "/app-domain/saneamento/relatorios", icon: BarChart3 },
];

export default function SaneamentoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)] w-full max-w-[1600px] mx-auto bg-slate-50/30">
      
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-800 leading-tight">Água e Saneamento</h2>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        w-full md:w-[260px] md:shrink-0 md:border-r border-slate-200 bg-white py-6 px-4 md:px-5 shadow-[2px_0_8px_rgba(0,0,0,0.02)] z-10 relative flex flex-col
        ${isSidebarOpen ? 'block' : 'hidden md:flex'}
      `}>
        <div className="mb-8 px-2 hidden md:block">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-tight flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-600" />
            Saneamento
          </h2>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Gestão de Água e Esgoto</p>
        </div>
        
        {/* Global Search */}
        <div className="mb-6 px-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar dados..." 
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {sidebarNavItems.map((item) => {
            const isActive = item.href === "/app-domain/saneamento" 
              ? pathname === "/app-domain/saneamento" 
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
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

        {/* Bottom Menu items */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <Link
            href="/app-domain/dashboard"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200"
          >
            <ArrowLeft className="h-[18px] w-[18px] text-slate-400" strokeWidth={2} />
            Voltar ao Dashboard
          </Link>
        </div>
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
