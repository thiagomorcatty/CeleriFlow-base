import Link from "next/link";
import { APP_VERSION } from "@/lib/version";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 text-muted-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-bold text-xl text-primary">CeleriFlow</span>
            </Link>
            <p className="max-w-xs text-sm">
              Processos ágeis, decisões seguras e dados confiáveis para a administração pública municipal.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Produto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#modulos" className="hover:text-primary transition-colors">
                  Módulos
                </Link>
              </li>
              <li>
                <Link href="#seguranca" className="hover:text-primary transition-colors">
                  Segurança
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-primary transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacidade" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} CeleriFlow. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono bg-background px-2 py-0.5 rounded border border-border/60 text-[11px]">
              {APP_VERSION}
            </span>
            <span>
              Uma solução <span className="font-semibold text-foreground">Robonuvem</span> para administração pública.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
