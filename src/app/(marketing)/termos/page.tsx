import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do website público do CeleriFlow.",
  alternates: { canonical: "/termos" },
};

export default function TermsPage() {
  return (
    <article className="bg-slate-50 py-16 text-slate-900 sm:py-24">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">CeleriFlow</p>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">Termos de Uso</h1>
        <p className="mt-4 text-sm text-slate-500">Última atualização: 17 de setembro de 2026</p>
        <p className="mt-8 text-lg leading-relaxed text-slate-600">
          Estes termos regulam o uso informativo do website público do CeleriFlow, incluindo o acesso ao catálogo técnico e ao formulário de contato.
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Finalidade do website</h2>
            <p>
              O website apresenta informações institucionais e funcionais sobre a plataforma. Ele não constitui proposta comercial, edital, garantia de resultado, certificação, homologação ou compromisso de entrega de um módulo, integração ou nível de serviço específico.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Escopo da plataforma</h2>
            <p>
              A disponibilidade de módulos, integrações, migrações, regras, permissões e serviços depende do escopo contratado, da parametrização, das credenciais de terceiros, do ambiente e das homologações aplicáveis. As condições definitivas são estabelecidas nos instrumentos contratuais e no projeto de implantação.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Uso do catálogo técnico</h2>
            <p>
              O catálogo técnico é disponibilizado para consulta sobre os recursos apresentados. As descrições possuem caráter informativo e devem ser avaliadas junto à equipe responsável antes de serem utilizadas como requisito técnico ou fundamento para decisão administrativa.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Responsabilidades do visitante</h2>
            <p>
              O visitante deve fornecer informações verdadeiras no formulário, usar o website de forma lícita e não tentar acessar áreas restritas, interferir no funcionamento do serviço ou enviar conteúdo malicioso, sigiloso ou inadequado.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Propriedade intelectual</h2>
            <p>
              Marcas, textos, elementos visuais, catálogos e demais conteúdos do website pertencem aos seus respectivos titulares e não concedem licença de uso além da consulta pessoal e institucional das informações disponibilizadas.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Alterações</h2>
            <p>
              O conteúdo do website e estes termos podem ser atualizados para refletir mudanças no produto, no catálogo ou no atendimento. A continuidade de uso do website após a publicação de uma atualização representa ciência da versão vigente.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-slate-700">
          Ao enviar dados pelo formulário, consulte também a{" "}
          <Link href="/privacidade" className="font-semibold text-primary underline underline-offset-4">Política de Privacidade</Link>.
        </div>
      </div>
    </article>
  );
}
