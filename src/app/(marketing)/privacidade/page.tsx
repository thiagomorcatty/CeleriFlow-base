import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade do website público do CeleriFlow.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <article className="bg-slate-50 py-16 text-slate-900 sm:py-24">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">CeleriFlow</p>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">Política de Privacidade</h1>
        <p className="mt-4 text-sm text-slate-500">Última atualização: 17 de setembro de 2026</p>
        <p className="mt-8 text-lg leading-relaxed text-slate-600">
          Esta política descreve como são tratados os dados enviados pelo formulário público do CeleriFlow para solicitar catálogo, demonstração ou orientação inicial sobre a plataforma.
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Quem opera este canal</h2>
            <p>
              O CeleriFlow é uma plataforma desenvolvida pela Robonuvem Soluções Digitais. Esta página pública e seu formulário são utilizados para receber solicitações de órgãos, entidades e profissionais interessados na plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Dados coletados</h2>
            <p>
              Quando você envia o formulário, podemos registrar nome, cargo, órgão ou entidade, cidade, UF, e-mail institucional, telefone, área de interesse, mensagem e a manifestação de consentimento. Os dados são limitados ao necessário para atender a solicitação informada.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Finalidades do tratamento</h2>
            <p>
              Os dados são usados para registrar o interesse, responder ao contato, encaminhar informações técnicas solicitadas, organizar a apresentação da plataforma e manter histórico de atendimento. Não use o formulário para enviar dados pessoais sensíveis, credenciais ou informações sigilosas de cidadãos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Compartilhamento e retenção</h2>
            <p>
              O acesso às informações é restrito às pessoas e aos prestadores necessários para atender a solicitação e operar o ambiente. Os dados são mantidos pelo período necessário para as finalidades descritas, para obrigações legais aplicáveis ou para defesa de direitos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Segurança</h2>
            <p>
              São adotadas medidas técnicas e administrativas compatíveis com o tratamento realizado para reduzir acessos não autorizados, perdas e usos indevidos. Nenhum sistema conectado à internet elimina integralmente todos os riscos de segurança.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Seus direitos e contato</h2>
            <p>
              Você pode solicitar informações sobre os dados enviados, correção, atualização ou exclusão quando aplicável. Para isso, use o formulário de contato e informe que a solicitação se refere a dados pessoais. Poderemos pedir informações adicionais para confirmar a identidade do solicitante.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-2xl font-bold text-slate-950">Atualizações desta política</h2>
            <p>
              Esta política pode ser atualizada para refletir mudanças no formulário, nos processos de atendimento ou na legislação aplicável. A data de atualização exibida nesta página indica a versão publicada.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-slate-700">
          Para enviar uma solicitação sobre a plataforma ou sobre seus dados, acesse o{" "}
          <Link href="/#contato" className="font-semibold text-primary underline underline-offset-4">formulário de contato</Link>.
        </div>
      </div>
    </article>
  );
}
