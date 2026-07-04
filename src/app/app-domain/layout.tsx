"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LogOut,
  Landmark
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/app-domain/login" || pathname === "/";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md px-4 sm:h-[72px] sm:px-6 shadow-sm">
        
        {/* Left: CeleriFlow Logo */}
        <div className="w-1/3 flex justify-start">
          <Link href="/dashboard" className="flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="/logo1.png" 
              alt="CeleriFlow" 
              width={120} 
              height={40} 
              className="object-contain h-8 sm:h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Center: City Hall Logo & Title */}
        <div className="w-1/3 flex justify-center items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
            <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Sistema Integrado</span>
            <span className="text-sm font-bold text-slate-800 uppercase tracking-tight leading-none">Prefeitura Municipal de Tal</span>
          </div>
        </div>

        {/* Right: User Menu */}
        <div className="w-1/3 flex justify-end items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden text-muted-foreground hover:text-destructive shrink-0">
            <LogOut className="h-5 w-5" />
          </Button>
          
          <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-primary/20">
            AD
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-4 sm:px-6 sm:py-6 lg:p-8 flex flex-col">
        {children}
      </main>

      <footer className="border-t py-4 text-center text-xs text-muted-foreground bg-background">
        &copy; {new Date().getFullYear()} CeleriFlow. Todos os direitos reservados.
      </footer>
    </div>
  );
}
