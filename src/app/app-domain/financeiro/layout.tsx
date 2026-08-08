"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Landmark, 
  WalletCards, 
  FileText,
  Receipt,
  Scale,
  LayoutDashboard,
  ArrowLeft,
  Menu,
  X,
  BookOpenCheck,
  ClipboardList,
  Download,
  ArrowRightLeft,
  TrendingUp,
  GitCompare,
  Activity,
  ChevronDown
} from "lucide-react";

const sidebarNavGroups = [
  {
    title: "Visão Geral",
    items: [{ title: "Painel Financeiro", href: "/financeiro", icon: LayoutDashboard }],
  },
  {
    title: "Planejamento e Orçamento",
    items: [
      { title: "Planejamento Orçamentário", href: "/financeiro/orcamento/planejamento", icon: BookOpenCheck },
      { title: "Cadastros Orçamentários", href: "/financeiro/orcamento/cadastros", icon: FileText },
      { title: "Dotações e Reservas", href: "/financeiro/orcamento", icon: Scale },
    ],
  },
  {
    title: "Execução da Despesa",
    items: [
      { title: "Empenhos", href: "/financeiro/empenhos", icon: FileText },
      { title: "Liquidações", href: "/financeiro/liquidacoes", icon: Receipt },
      { title: "Pagamentos", href: "/financeiro/pagamentos", icon: WalletCards },
      { title: "Restos a Pagar", href: "/financeiro/restos-a-pagar", icon: ClipboardList },
    ],
  },
  {
    title: "Receitas",
    items: [
      { title: "Lançamentos de Receita", href: "/financeiro/receitas", icon: WalletCards },
      { title: "Regras Constitucionais", href: "/financeiro/receitas-constitucionais", icon: Landmark },
    ],
  },
  {
    title: "Tesouraria e Bancos",
    items: [
      { title: "Contas e Transferências", href: "/financeiro/contas-bancarias", icon: Landmark },
      { title: "Extratos Bancários", href: "/financeiro/download-extratos", icon: Download },
      { title: "Monitoramento de Automações", href: "/financeiro/automacoes", icon: Activity },
      { title: "Resgates e Aplicações", href: "/financeiro/resgates-aplicacoes", icon: ArrowRightLeft },
      { title: "Rendimentos de Aplicações", href: "/financeiro/rendimentos", icon: TrendingUp },
      { title: "Conciliação Bancária", href: "/financeiro/conciliacao-bancaria", icon: GitCompare },
    ],
  },
  {
    title: "Contabilidade e Saídas",
    items: [
      { title: "Contabilidade e Fechamento", href: "/financeiro/contabilidade", icon: Scale },
      { title: "Relatórios Financeiros", href: "/financeiro/relatorios", icon: FileText },
    ],
  },
];

const sidebarNavItems = sidebarNavGroups.flatMap((group) => group.items);

export default function FinanceiroLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const activeGroup = sidebarNavGroups.find((group) => group.items.some((item) => {
    if (item.href === "/financeiro") return pathname === "/financeiro";
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }))?.title ?? null;
  const [openGroup, setOpenGroup] = useState<string | null>(activeGroup);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setOpenGroup(activeGroup);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full max-w-[1600px] mx-auto bg-slate-50/30 relative">
      
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 p-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 leading-tight">Financeiro e Contábil</h2>
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
        w-full md:shrink-0 md:border-r border-slate-200 bg-white py-6 px-4 shadow-[2px_0_8px_rgba(0,0,0,0.02)] z-10 relative flex flex-col transition-all duration-300
        ${isSidebarOpen ? 'block' : 'hidden md:flex'}
      `}>
        <div className="absolute top-4 right-[-14px] hidden md:flex items-center justify-center">
          <button 
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            className="p-1 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 shadow-sm"
          >
            {isDesktopCollapsed ? <Menu className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <div className={`mb-8 px-2 hidden md:block ${isDesktopCollapsed ? 'text-center' : ''}`}>
          {!isDesktopCollapsed && (
            <>
              <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">Financeiro e Contábil</h2>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Gestão Pública</p>
            </>
          )}
          {isDesktopCollapsed && (
            <LayoutDashboard className="w-6 h-6 mx-auto text-slate-700" />
          )}
        </div>
        
        <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
          {sidebarNavGroups.map((group) => (
            <section key={group.title} className="space-y-1">
              {!isDesktopCollapsed && (
                <button
                  type="button"
                  onClick={() => setOpenGroup((current) => current === group.title ? null : group.title)}
                  aria-expanded={openGroup === group.title}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                    activeGroup === group.title
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  }`}
                >
                  <span>{group.title}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openGroup === group.title ? "rotate-180" : ""}`} />
                </button>
              )}
              {(isDesktopCollapsed || openGroup === group.title) && group.items.map((item) => {
                const isActive = item.href === "/financeiro"
                  ? pathname === "/financeiro"
                  : pathname === item.href || (
                    pathname.startsWith(`${item.href}/`) &&
                    !sidebarNavItems.some((child) => child.href !== item.href && child.href.startsWith(`${item.href}/`) && pathname.startsWith(child.href))
                  );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    title={isDesktopCollapsed ? item.title : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 outline-none ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-emerald-600/50"
                    }`}
                  >
                    <item.icon className={`shrink-0 h-[18px] w-[18px] ${isActive ? "text-white" : "text-slate-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                    {!isDesktopCollapsed && <span>{item.title}</span>}
                  </Link>
                );
              })}
            </section>
          ))}
        </nav>

        {/* Bottom Menu items */}
        <div className="mt-6 pt-6 border-t border-slate-100">
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
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
