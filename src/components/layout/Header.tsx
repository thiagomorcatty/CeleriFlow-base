import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* Usar logo aqui */}
          <span className="font-bold text-xl text-primary">CeleriFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#modulos" className="text-sm font-medium hover:text-primary transition-colors">
            Módulos
          </Link>
          <Link href="#seguranca" className="text-sm font-medium hover:text-primary transition-colors">
            Segurança
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
            FAQ
          </Link>
          <Link href="#contato" className={buttonVariants()}>
            Solicitar Demonstração
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label="Abrir menu">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
              <div className="flex flex-col gap-4 mt-6">
                <Link href="#modulos" className="text-sm font-medium p-2 hover:bg-muted rounded-md">
                  Módulos
                </Link>
                <Link href="#seguranca" className="text-sm font-medium p-2 hover:bg-muted rounded-md">
                  Segurança
                </Link>
                <Link href="#faq" className="text-sm font-medium p-2 hover:bg-muted rounded-md">
                  FAQ
                </Link>
                <Link href="#contato" className={buttonVariants({ className: "mt-4" })}>
                  Solicitar Demonstração
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
