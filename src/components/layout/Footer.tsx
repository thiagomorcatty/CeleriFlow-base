import Image from "next/image";
import Link from "next/link";
import { APP_VERSION } from "@/lib/version";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-sm text-slate-400">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 inline-block transition-opacity hover:opacity-90">
              <Image src="/favicon.png" alt="CeleriFlow ERP Governamental" width={180} height={55} className="h-10 w-auto object-contain" />
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              Plataforma em nuvem da Robonuvem Soluções Digitais para apoiar a gestão pública. Os módulos, integrações e níveis de serviço são definidos conforme o escopo do projeto.
            </p>
            <a
              href="/docs/catalogo-tecnico-celeriflow-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-800/50 bg-emerald-950/60 px-3 py-1 text-xs font-mono text-emerald-400 transition-colors hover:bg-emerald-900/60"
            >
              Catálogo técnico e funcional 2026
            </a>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-slate-200">Plataforma</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/#modulos" className="transition-colors hover:text-blue-400">Módulos e recursos (28)</Link></li>
              <li><Link href="/#demonstracao" className="transition-colors hover:text-blue-400">Painel demonstrativo</Link></li>
              <li><Link href="/#integracoes" className="transition-colors hover:text-blue-400">Integrações e conectividade</Link></li>
              <li><Link href="/#implantacao" className="transition-colors hover:text-blue-400">Implantação assistida</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-slate-200">Informações</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/privacidade" className="transition-colors hover:text-blue-400">Política de privacidade</Link></li>
              <li><Link href="/termos" className="transition-colors hover:text-blue-400">Termos de uso</Link></li>
              <li><a href="/docs/catalogo-tecnico-celeriflow-2026.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">Catálogo técnico (PDF)</a></li>
              <li><Link href="/#contato" className="transition-colors hover:text-blue-400">Solicitar demonstração</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-slate-200">Acesso</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/app-domain" className="font-semibold text-blue-400 transition-colors hover:text-blue-300">Acessar plataforma</Link></li>
              <li><Link href="/portal-transparencia" className="transition-colors hover:text-blue-400">Portal da Transparência</Link></li>
              <li><Link href="/#seguranca" className="transition-colors hover:text-blue-400">Segurança e governança</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-center font-mono text-xs text-slate-500 md:flex-row md:text-left">
          <p>&copy; {new Date().getFullYear()} CeleriFlow ERP Governamental. Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            <span>Robonuvem Soluções Digitais</span>
            <span aria-hidden="true">•</span>
            <span>Versão {APP_VERSION}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
