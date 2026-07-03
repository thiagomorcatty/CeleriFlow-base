import { CheckCircle2 } from "lucide-react";

export function Trust() {
  const trustItems = [
    "Licenciamento SaaS (Software as a Service)",
    "Acesso universal via navegador web",
    "Controle granular de usuários e permissões",
    "Histórico completo e rastreabilidade (Logs)",
    "Ambiente 100% em nuvem com alta disponibilidade",
    "Rotinas automáticas de backup e suporte contínuo",
    "Implantação modular, faseada e sem impacto",
    "Desenvolvido sob as diretrizes da LGPD"
  ];

  return (
    <section id="seguranca" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Pensado para as exigências da administração pública.
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              A segurança da informação não é opcional. O CeleriFlow foi arquitetado desde o dia zero para blindar os dados do município e garantir a validade dos atos administrativos.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square md:aspect-video lg:aspect-square bg-background/10 rounded-2xl border border-primary-foreground/20 p-8 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Dados Protegidos</h3>
                <p className="text-primary-foreground/70 max-w-sm mx-auto">
                  Criptografia de ponta a ponta e redundância de servidores garantem que a prefeitura nunca pare.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
