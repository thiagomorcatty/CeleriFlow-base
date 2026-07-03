"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LogOut
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
    return (
      <div className="flex min-h-screen w-full bg-background items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 sm:h-[60px] sm:px-6 shadow-sm">
        <Link href="/app-domain" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-white text-xs">
            CF
          </div>
          CeleriFlow
        </Link>

        <div className="flex-1" />
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden text-muted-foreground hover:text-destructive">
            <LogOut className="h-5 w-5" />
          </Button>
          
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-primary/20">
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
