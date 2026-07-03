import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "O CeleriFlow é instalado nos computadores da prefeitura?",
      answer: "Não. O CeleriFlow é disponibilizado em ambiente web, acessível por qualquer navegador, sem necessidade de instalação local ou servidores na prefeitura."
    },
    {
      question: "A prefeitura recebe o código-fonte?",
      answer: "Não. O modelo é de licenciamento de uso da plataforma (SaaS), mantendo a propriedade intelectual e o código-fonte sob titularidade da fornecedora, salvo previsão contratual específica em contrário."
    },
    {
      question: "O sistema pode ser contratado por módulos?",
      answer: "Sim. A plataforma foi planejada para implantação modular, permitindo iniciar por processo digital, compras, transparência, indicadores ou outros módulos conforme a necessidade e o orçamento do órgão."
    },
    {
      question: "O CeleriFlow atende a LGPD?",
      answer: "A plataforma foi planejada com recursos avançados de controle de acesso, logs, rastreabilidade e proteção de dados, apoiando totalmente a adequação dos órgãos públicos à LGPD."
    },
    {
      question: "É possível fazer uma demonstração?",
      answer: "Sim! O órgão interessado pode solicitar uma demonstração guiada para conhecer na prática os módulos e fluxos da plataforma. Basta preencher o formulário no final da página."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Tire suas dúvidas sobre a implantação e o uso da plataforma.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
