"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { 
  LogOut,
  Landmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_VERSION } from "@/lib/version";
import PocHeaderBanner from "@/components/layout/PocHeaderBanner";

type UserInfo = {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  role: string;
};

function getRoleLabel(role: string) {
  return role;
}


function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function ClientLayout({
  children,
  institution,
  user,
}: {
  children: React.ReactNode;
  institution?: { name?: string | null; logoUrl?: string | null } | null;
  user?: UserInfo | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login" || pathname === "/";

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/session/logout", { method: "POST" });
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const userName = user?.name ?? "Usuário";
  const userRole = user?.role ? getRoleLabel(user.role) : "Gestor do Sistema";
  const initials = getInitials(userName);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/80 backdrop-blur-md px-4 sm:px-6 shadow-sm">
        {/* Left: CeleriFlow Logo */}
        <div className="w-1/3 flex justify-start items-center">
          <Link href="/dashboard" className="flex items-center hover:opacity-80 transition-opacity py-1">
            <Image 
              src="/favicon.png" 
              alt="CeleriFlow" 
              width={160} 
              height={50} 
              className="object-contain h-10 sm:h-11 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Center: City Hall Logo & Title */}
        <div className="w-1/3 flex justify-center items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0 overflow-hidden">
            {institution?.logoUrl ? (
              <img src={institution.logoUrl} alt="Brasão" className="w-full h-full object-cover" />
            ) : (
              <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            )}
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Sistema Integrado</span>
            <span className="text-sm font-bold text-slate-800 uppercase tracking-tight leading-none">{institution?.name || "Prefeitura Municipal"}</span>
          </div>
        </div>

        {/* Right: User Menu */}
        <div className="w-1/3 flex justify-end items-center gap-2 sm:gap-4">
          <div className="hidden lg:flex flex-col text-right mr-1">
            <span className="text-sm font-semibold text-slate-800 leading-tight">{userName}</span>
            <span className="text-[11px] text-muted-foreground leading-tight">{userRole}</span>
          </div>
          
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-primary/20 text-xs">
            {initials}
          </div>

          <div className="h-6 w-px bg-border hidden sm:block mx-1"></div>

          <Button onClick={handleLogout} variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
          <Button onClick={handleLogout} variant="ghost" size="icon" className="sm:hidden text-muted-foreground hover:text-destructive shrink-0">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <PocHeaderBanner />
      
      <main className="flex-1 p-4 sm:px-6 sm:py-4 lg:px-8 lg:py-6 flex flex-col">
        {children}
      </main>

      <footer className="border-t py-3 text-center text-xs text-muted-foreground bg-background flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 gap-2">
        <span>&copy; {new Date().getFullYear()} CeleriFlow. Todos os direitos reservados.</span>
        <span className="font-mono text-[11px] font-medium text-muted-foreground/80 bg-muted/60 px-2 py-0.5 rounded border border-border/50">
          Versão {APP_VERSION}
        </span>
      </footer>
    </div>
  );
}
