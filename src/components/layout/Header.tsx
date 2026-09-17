import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Menu, ShieldCheck } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";

const navigation = [
  { href: "/#modulos", label: "Módulos (28)" },
  { href: "/#integracoes", label: "Integrações" },
  { href: "/#implantacao", label: "Implantação" },
  { href: "/#impacto", label: "Diagnóstico" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/favicon.png"
            alt="CeleriFlow ERP Governamental"
            width={180}
            height={55}
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105 sm:h-11"
            priority
          />
          <span className="hidden rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary sm:inline-block">
            ERP Gov
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-sm font-medium md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href="/#seguranca" className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Governança
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/app-domain"
            className={buttonVariants({ variant: "outline", size: "sm", className: "h-9 border-primary/30 font-semibold hover:border-primary/60" })}
          >
            Acessar sistema
          </Link>
          <Link
            href="/#contato"
            className={buttonVariants({ size: "sm", className: "h-9 bg-gradient-to-r from-primary to-secondary font-semibold shadow-md shadow-primary/20 hover:opacity-90" })}
          >
            Agendar demo
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link href="/app-domain" className={buttonVariants({ variant: "outline", size: "sm", className: "h-8 px-2.5 text-xs" })}>
            Entrar
          </Link>
          <Sheet>
            <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-9 w-9" })} aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetTitle className="flex items-center gap-2 text-left text-lg font-bold">
                <Building2 className="h-5 w-5 text-primary" />
                CeleriFlow ERP
              </SheetTitle>
              <nav aria-label="Navegação móvel" className="mt-6 flex flex-col gap-3">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-lg p-2.5 text-sm font-medium transition-colors hover:bg-muted">
                    {item.label}
                  </Link>
                ))}
                <Link href="/#seguranca" className="rounded-lg p-2.5 text-sm font-medium transition-colors hover:bg-muted">
                  Segurança e governança
                </Link>
                <div className="flex flex-col gap-2 border-t pt-4">
                  <Link href="/app-domain" className={buttonVariants({ variant: "outline", className: "w-full justify-center" })}>
                    Acessar plataforma
                  </Link>
                  <Link href="/#contato" className={buttonVariants({ className: "w-full justify-center bg-primary" })}>
                    Solicitar demonstração
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
