"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  CarFront,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  Map,
  Menu,
  Route,
  Shield,
  Users,
  Wrench,
  X,
} from "lucide-react";

const sidebarNavItems = [
  { title: "Painel", href: "/seguranca", icon: LayoutDashboard },
  { title: "Guarda e Equipes", href: "/seguranca/guardas", icon: Users },
  { title: "Ocorrencias", href: "/seguranca/ocorrencias", icon: AlertTriangle },
  { title: "Rondas e Cameras", href: "/seguranca/rondas", icon: Camera },
  { title: "Defesa Civil", href: "/seguranca/defesa-civil", icon: Shield },
  { title: "Transito", href: "/seguranca/transito", icon: CarFront },
  { title: "Autos de Infracao", href: "/seguranca/infracoes", icon: ClipboardCheck },
  { title: "Mobilidade e Rotas", href: "/seguranca/mobilidade", icon: Route },
  { title: "OS e Equipamentos", href: "/seguranca/ordens", icon: Wrench },
  { title: "Documentos e Relatorios", href: "/seguranca/documentos", icon: FileText },
];

export default function SegurancaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full max-w-[1600px] flex-col bg-slate-50/30 md:mx-auto md:flex-row">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4 md:hidden">
        <div>
          <h2 className="text-base font-bold leading-tight text-slate-800">Seguranca e Mobilidade</h2>
          <p className="text-xs text-slate-500">Gestao municipal</p>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <aside className={`${isDesktopCollapsed ? "md:w-[80px]" : "md:w-[270px]"} ${isSidebarOpen ? "block" : "hidden md:flex"} relative z-10 w-full shrink-0 flex-col border-slate-200 bg-white px-4 py-6 shadow-[2px_0_8px_rgba(0,0,0,0.02)] transition-all duration-300 md:border-r`}>
        <div className="absolute right-[-14px] top-4 hidden md:flex">
          <button onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)} className="rounded-full border border-slate-200 bg-white p-1 text-slate-400 shadow-sm hover:bg-slate-50 hover:text-slate-600">
            <Menu className="h-4 w-4" />
          </button>
        </div>

        <div className={`mb-8 hidden px-2 md:block ${isDesktopCollapsed ? "text-center" : ""}`}>
          {!isDesktopCollapsed ? (
            <>
               <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-800">Seguranca e Mobilidade</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Gestao publica municipal</p>
            </>
          ) : (
            <Map className="mx-auto h-6 w-6 text-cyan-700" />
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-1.5">
          {sidebarNavItems.map((item) => {
            const isActive = item.href === "/seguranca" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-700 text-white shadow-md shadow-cyan-700/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-cyan-700/50"
                }`}
              >
                <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                {!isDesktopCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <Link href="/dashboard" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900">
            <ArrowLeft className="h-[18px] w-[18px] shrink-0 text-slate-400" />
            {!isDesktopCollapsed && <span>Voltar ao Dashboard</span>}
          </Link>
        </div>
      </aside>

      <main className="flex min-h-0 flex-1 flex-col bg-slate-50/50">
        <div className="flex-1 overflow-y-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
