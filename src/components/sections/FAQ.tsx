import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "Quais áreas o CeleriFlow pode apoiar?",
    answer: "O catálogo técnico apresenta 28 módulos funcionais organizados em cinco camadas, cobrindo base institucional, processos, gestão corporativa, políticas públicas setoriais e governança. A ativação é definida conforme o escopo contratado e a parametrização do projeto.",
  },
  {
    question: "É possível iniciar com alguns módulos?",
    answer: "Sim. O projeto pode priorizar as áreas mais urgentes e planejar ativações posteriores. O diagnóstico inicial ajuda a definir dependências, dados legados, responsáveis e a sequência mais adequada para o órgão.",
  },
  {
    question: "O acesso exige instalação nos computadores da prefeitura?",
    answer: "O CeleriFlow é acessado pelo navegador em ambiente web. Os requisitos de acesso, perfis, rede e segurança são definidos de acordo com a implantação do órgão.",
  },
  {
    question: "Como funcionam as integrações com órgãos, bancos e sistemas externos?",
    answer: "O catálogo descreve possibilidades de integração por APIs, arquivos, webhooks e conectores. Cada conexão depende do escopo, das credenciais, dos layouts, da disponibilidade do serviço externo e, quando aplicável, da homologação da instituição responsável.",
  },
  {
    question: "Como é feita a implantação?",
    answer: "A jornada inclui levantamento inicial, planejamento, parametrização, migração de dados, testes funcionais, homologação assistida, entrada em produção e evolução pós-go-live. O cronograma é construído conforme a realidade do projeto.",
  },
  {
    question: "Como solicitar uma demonstração técnica?",
    answer: "Preencha o formulário ao final da página. A solicitação é registrada para que a equipe avalie o cenário informado e retorne com os próximos passos para uma apresentação técnica.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t bg-background py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 px-4 py-1 font-medium text-primary">
            Tire suas dúvidas
          </Badge>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Perguntas frequentes de gestores públicos
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Respostas diretas sobre módulos, implantação, acesso e integrações do CeleriFlow.
          </p>
        </div>

        <Accordion className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`} className="rounded-xl border bg-card/60 px-6 shadow-sm transition-all hover:border-primary/30">
              <AccordionTrigger className="py-5 text-left text-base font-bold text-foreground hover:no-underline md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="border-t pb-6 pt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
