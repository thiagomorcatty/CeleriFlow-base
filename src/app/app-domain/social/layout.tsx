"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HeartHandshake,
  Users,
  FileText,
  Building2,
  ArrowLeft,
  Menu,
  X,
  Gift
} from "lucide-react";

const sidebarNavItems = [
  { title: "Painel Social", href: "/app-domain/social", icon: HeartHandshake },
  { title: "Unidades (CRAS/CREAS)", href: "/app-domain/social/unidades", icon: Building2 },
  { title: "Famílias e Indivíduos", href: "/app-domain/social/familias", icon: Users },
  { title: "Prontuário Eletrônico", href: "/app-domain/social/prontuario", icon: FileText },
  { title: "Programas e Benefícios", href: "/app-domain/social/beneficios", icon: Gift },
];

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-56px)] w-full mx-auto bg-slate-50/30 relative">
      
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 p-4 shrink-0">
        <div>
          <h2 className="text-base font-bold text-slate-800 leading-tight">Assistência Social</h2>
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

        <div className={`mb-8 px-2 hidden md:block ${isDesktopCollapsed ? 'text-center' : ''}`}>
          {!isDesktopCollapsed && (
            <>
              <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">Assistência Social</h2>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Gestão SUAS</p>
            </>
          )}
          {isDesktopCollapsed && (
            <HeartHandshake className="w-6 h-6 mx-auto text-blue-600" />
          )}
        </div>
        
        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-2 pb-4">
          {sidebarNavItems.map((item) => {
            const isActive = item.href === "/app-domain/social" 
              ? pathname === "/app-domain/social" 
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
                <item.icon className={`shrink-0 h-[18px] w-[18px] ${isActive ? "text-white" : "text-slate-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                {!isDesktopCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Menu items */}
        <div className="pt-4 border-t border-slate-100 shrink-0">
          <Link
            href="/dashboard"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200"
          >
            <ArrowLeft className="shrink-0 h-[18px] w-[18px] text-slate-400" strokeWidth={2} />
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
