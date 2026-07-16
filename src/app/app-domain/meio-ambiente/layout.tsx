"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Leaf,
  Building2,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Search,
  Sprout,
  Trash2,
  GraduationCap,
  FolderOpen,
  ArrowLeft,
  Menu,
  X
} from "lucide-react";

const sidebarNavItems = [
  { title: "Painel & Resumo", href: "/meio-ambiente", icon: Leaf },
  { title: "Empreendimentos", href: "/meio-ambiente/empreendimentos", icon: Building2 },
  { title: "Licenciamento", href: "/meio-ambiente/licenciamento", icon: ShieldCheck },
  { title: "Solicitações e Podas", href: "/meio-ambiente/solicitacoes", icon: FileText },
  { title: "Denúncias Ambientais", href: "/meio-ambiente/denuncias", icon: AlertTriangle },
  { title: "Fiscalização & Autos", href: "/meio-ambiente/fiscalizacao", icon: Search },
  { title: "Áreas Verdes", href: "/meio-ambiente/areas-verdes", icon: Sprout },
  { title: "Controle de Resíduos", href: "/meio-ambiente/residuos", icon: Trash2 },
  { title: "Educação Ambiental", href: "/meio-ambiente/educacao", icon: GraduationCap },
  { title: "Documentos Oficiais", href: "/meio-ambiente/documentos", icon: FolderOpen },
];

export default function MeioAmbienteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-56px)] w-full mx-auto bg-slate-50/30 relative">
      
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 p-4 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-800 leading-tight">Meio Ambiente</h2>
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
        ${isDesktopCollapsed ? 'md:w-[80px]' : 'md:w-[260px]'} 
        w-full md:shrink-0 md:border-r border-slate-200 bg-white py-6 px-4 shadow-[2px_0_8px_rgba(0,0,0,0.02)] z-10 relative flex flex-col transition-all duration-300 h-full
        ${isSidebarOpen ? 'block' : 'hidden md:flex'}
      `}>
        <div className="absolute top-4 right-[-14px] hidden md:flex items-center justify-center">
          <button 
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            className="p-1 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 shadow-sm"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        <div className={`mb-6 px-2 hidden md:block ${isDesktopCollapsed ? 'text-center' : ''}`}>
          {!isDesktopCollapsed && (
            <>
              <h2 className="text-base font-bold text-slate-800 tracking-tight leading-tight">Meio Ambiente</h2>
              <p className="text-[10px] font-semibold text-green-600 mt-0.5 uppercase tracking-wider">Gestão Sustentável</p>
            </>
          )}
          {isDesktopCollapsed && (
            <Leaf className="w-6 h-6 mx-auto text-green-600" />
          )}
        </div>
        
        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pr-2 pb-2">
          {sidebarNavItems.map((item) => {
            const isActive = item.href === "/meio-ambiente" 
              ? pathname === "/meio-ambiente" 
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 outline-none ${
                  isActive
                    ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-green-600/50"
                }`}
              >
                <item.icon className={`shrink-0 h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                {!isDesktopCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Menu items */}
        <div className="pt-2 border-t border-slate-100 shrink-0">
          <Link
            href="/dashboard"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200"
          >
            <ArrowLeft className="shrink-0 h-4 w-4 text-slate-400" strokeWidth={2} />
            {!isDesktopCollapsed && <span>Voltar ao Dashboard</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50/50 h-full">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
