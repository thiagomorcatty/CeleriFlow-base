"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Files, 
  HeadphonesIcon, 
  FileText, 
  ShoppingCart, 
  Eye, 
  BarChart3, 
  Building2, 
  Settings,
  Menu,
  LogOut
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Painel", href: "/app-domain", icon: LayoutDashboard },
  { name: "Processos", href: "/app-domain/processos", icon: Files },
  { name: "Atendimento", href: "/app-domain/atendimento", icon: HeadphonesIcon },
  { name: "Documentos", href: "/app-domain/documentos", icon: FileText },
  { name: "Compras e Contratos", href: "/app-domain/compras", icon: ShoppingCart },
  { name: "Transparência", href: "/app-domain/transparencia", icon: Eye },
  { name: "Indicadores", href: "/app-domain/indicadores", icon: BarChart3 },
  { name: "Administração", href: "/app-domain/administracao", icon: Building2 },
  { name: "Configurações", href: "/app-domain/configuracoes", icon: Settings },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex fixed h-screen z-20">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-white text-xs">
              CF
            </div>
            CeleriFlow
          </div>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid gap-1 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t p-4">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      <div className="flex flex-col sm:pl-64 flex-1">
        {/* Mobile Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 sm:h-[60px] sm:px-6">
          <Sheet>
            <SheetTrigger 
              render={
                <Button variant="outline" size="icon" className="sm:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              } 
            />
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-xs">
                    CF
                  </div>
                  CeleriFlow
                </div>
              </div>
              <nav className="grid gap-1 p-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex-1" />
          <div className="flex items-center gap-4">
            {/* User Profile Placeholder */}
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-primary/20">
              AD
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:px-6 sm:py-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
