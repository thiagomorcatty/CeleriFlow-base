# Plano de Melhoria do Website Público CeleriFlow

## Objetivo

Transformar a página pública do CeleriFlow em uma ferramenta de apresentação e conversão fiel ao **Catálogo Técnico e Funcional - Celeriflow v2.pdf**. O site deve explicar a cobertura funcional, a implantação e a governança da plataforma sem apresentar como fato aquilo que depende de escopo contratado, configuração, credenciais de terceiros, homologação ou SLA.

Este plano cobre a landing page em `src/app/(marketing)/page.tsx`, suas seções e os metadados públicos relacionados. Ele não substitui documentação contratual, parecer jurídico, evidência de homologação ou especificação técnica de integração.

## Fonte de Verdade e Regras de Publicação

| Fonte | Pode orientar no site | Não comprova sozinha |
| --- | --- | --- |
| Catálogo, páginas 3 a 5 | Solução web, ativação modular conforme escopo e as cinco camadas da arquitetura | Disponibilidade de todos os módulos para qualquer cliente |
| Catálogo, páginas 8, 9 e 72 | Controles de segurança, operação em nuvem, backup, monitoramento e recuperação descritos | SLA, percentual de disponibilidade, RPO/RTO ou certificações |
| Catálogo, páginas 11 e 12 | Possibilidades de interoperabilidade por APIs, arquivos, webhooks e conectores | Homologação, integração ativa, credenciais ou autorização de qualquer órgão, banco ou fornecedor |
| Catálogo, páginas 13 e 14 | Método de implantação, migração, testes e homologação assistida | Transição sem risco, prazo fixo ou ausência de interrupção |
| Catálogo, páginas 16 a 71 | Os 28 módulos funcionais e seus casos de uso | Que todos estejam contratados, implantados ou parametrizados em cada órgão |
| Evidência aprovada pelo produto, jurídico e operação | Métricas, certificações, integrações específicas, SLA e cases | Alegações sem fonte, período, escopo e responsável identificados |

### Linguagem obrigatória

1. Usar `inclui`, `oferece` ou `permite` somente para recursos descritos no catálogo.
2. Para integrações, usar `pode integrar`, `configurável conforme escopo` ou `sujeito a credenciais, ambiente e homologação da instituição responsável`.
3. Reservar `homologado`, `conforme`, `certificado`, `garante`, `100%`, `automático`, `em tempo real`, `em 3 segundos` e percentuais de disponibilidade para evidência aprovada e rastreável.
4. Exibir a nota de escopo perto da matriz de módulos e de integrações: `A disponibilidade de módulos e integrações depende do escopo contratado, da parametrização, das permissões e da homologação aplicável.`
5. Identificar dashboards, valores, processos e indicadores fictícios como `Dados demonstrativos`. Não usar números de município, ganho de arrecadação, prazo ou economia sem fonte, período e metodologia publicados.
6. Não usar logos, selos ou a expressão `integrações oficiais` para órgãos e instituições sem autorização de marca e evidência de integração ativa.

## Diagnóstico do Site Atual

| Prioridade | Achado | Impacto | Correção necessária |
| --- | --- | --- | --- |
| P0 | A página comunica `24+` módulos em `Stats.tsx`, `EcosystemMatrix.tsx`, `Header.tsx`, `Footer.tsx` e `Contact.tsx`; o catálogo apresenta 28 módulos funcionais. | A cobertura parece menor e a taxonomia não segue as cinco camadas do catálogo. | Usar `28 módulos funcionais organizados em 5 camadas`, com a nota de escopo contratual. |
| P0 | Há alegações sem evidência no catálogo, como `100% Homologado`, `STN Conforme`, `Baixa em 3 Segundos`, publicação automática no PNCP, assinatura ICP-Brasil/Gov.br e atendimento integral à LGPD/LAI. | Risco comercial, jurídico e de credibilidade. | Revisar `Hero.tsx`, `Stats.tsx`, `EcosystemMatrix.tsx`, `GovernmentAI.tsx`, `Trust.tsx`, `FAQ.tsx` e `Footer.tsx` conforme as regras acima. |
| P0 | `Contact.tsx` simula o envio, exibe sucesso e promete contato em duas horas, mas não chama a rota existente `POST /api/leads`. | O visitante pode acreditar que enviou um pedido que não foi registrado. | Conectar o formulário à rota, tratar respostas de erro e só confirmar após `201`. Remover a promessa de prazo até que exista SLA operacional. |
| P0 | O consentimento do formulário inicia marcado e não há páginas públicas de privacidade e termos, embora ambas estejam no `sitemap.ts`. | Consentimento pouco claro e URLs indexadas podem retornar 404. | Deixar o consentimento desmarcado, criar e vincular as páginas antes de indexá-las, registrar versão e data da política aceita e não retornar dados pessoais do lead na resposta da API. |
| P0 | A navegação desktop aponta para `#regulatório`, enquanto a seção usa `id="regulatorio"`. | O link de conformidade não funciona. | Padronizar a âncora sem acento e testar todas as navegações e CTAs. |
| P1 | O PDF já está disponível em `public/docs/catalogo-tecnico-celeriflow-2026.pdf` e o Hero já aponta para `/docs/catalogo-tecnico-celeriflow-2026.pdf`. | Criar outro fluxo de download duplicaria um ativo existente. | Manter uma única URL pública, validar a versão do PDF e reutilizá-la no Hero, Footer e formulário apenas se o fluxo de captura for funcional. |
| P1 | O dashboard e a calculadora exibem valores, metas e fórmulas sem método publicado. | Pode ser interpretado como resultado real ou promessa comercial. | Rotular o dashboard como demonstrativo. Publicar fórmula, premissas e limitação da calculadora ou removê-la até haver validação comercial. |
| P1 | O JSON-LD em `src/app/(marketing)/layout.tsx` declara uma oferta com preço `0`, sem página de preço ou oferta gratuita correspondente. | Dados estruturados podem comunicar uma condição comercial incorreta. | Remover `offers` até existir uma oferta pública válida; completar metadados, Open Graph, URL canônica e imagens sociais. |

## Arquitetura de Conteúdo Recomendada

1. **Hero**: posicionamento institucional, proposta de valor, CTA para demonstração e acesso ao catálogo já publicado.
2. **Fatos verificáveis**: cinco camadas, 28 módulos funcionais, ativação modular e acesso web. Substitui métricas não comprovadas em `Stats.tsx`.
3. **Arquitetura funcional**: explorador das cinco camadas, com módulos e resultados operacionais resumidos.
4. **Visão gerencial**: exemplo visual de dashboard, identificado como demonstrativo, sem indicadores de cliente não autorizados.
5. **Integrações e interoperabilidade**: matriz com categoria, condição de disponibilidade e dependência externa de cada conexão.
6. **Implantação**: as oito etapas do catálogo, com expectativa realista de diagnóstico, parametrização, migração, testes e homologação.
7. **Segurança e governança**: perfis, segregação de funções, rastreabilidade, instância independente e controles descritos no catálogo.
8. **Impacto e decisão**: calculadora com metodologia verificável ou convite para diagnóstico técnico, sem estimativa apresentada como garantia.
9. **FAQ, catálogo e contato**: respostas condicionadas ao escopo, PDF público acessível e formulário de lead realmente entregue.

## Cobertura dos 28 Módulos

A interface deve usar as cinco camadas canônicas do catálogo. A distribuição abaixo é editorial para navegação e não altera o escopo contratual de cada módulo.

| Camada | Módulos a apresentar | Quantidade |
| --- | --- | --- |
| Base Institucional | Administração e Cadastros; Câmara Municipal | 2 |
| Processos e Relacionamento | Processos e Protocolo; Documentos e GED; Atendimento, Ouvidoria e Assistência Virtual; Portal Institucional e Transparência | 4 |
| Gestão Corporativa | Financeiro e Contábil; Tesouraria, Conciliação e Planejamento Financeiro; Compras, Licitações e Contratos; RH e Folha; Portal do Servidor; Patrimônio e Almoxarifado; Frotas; Gestão Tributária; ITBI e DTE; NFS-e; Simples Nacional e ISS Bancário; Custos e VAF | 12 |
| Políticas Públicas Setoriais | Educação; Saúde; Assistência Social; Meio Ambiente; Água e Saneamento; Obras e Infraestrutura; Cultura, Esporte e Lazer; Segurança e Mobilidade | 8 |
| Governança e Conectividade | Controle Interno e BI; Relatórios, Indicadores e Exportações | 2 |
| **Total** |  | **28** |

### Diretrizes para o explorador de módulos

- Reestruturar `EcosystemMatrix.tsx` em cinco abas ou accordions, não em uma lista única extensa.
- Cada módulo deve ter nome idêntico ao catálogo, uma descrição de uma frase e, quando aplicável, uma indicação de dependência de configuração.
- Implementar abas com semântica e teclado adequados: `role="tablist"`, `role="tab"`, `aria-selected`, foco visível e conteúdo associado por `aria-controls`.
- Evitar selos de conformidade em cards. Preferir descrições factuais, como `recursos para gestão tributária`, `integração configurável` ou `fluxos parametrizáveis`.

## Integrações e Interoperabilidade

Criar `src/components/sections/ConnectivityMatrix.tsx` em vez de uma vitrine de logos. A seção deve explicar o tipo de conexão e o que precisa ser validado antes da contratação.

| Grupo | Exemplos citados no catálogo | Texto público seguro |
| --- | --- | --- |
| Federal, fiscal e controle | PNCP, SICONFI, eSocial, EFD-Reinf, NFS-e, TCEs | `Integrações podem ser configuradas conforme layouts, credenciais, escopo e homologação aplicáveis.` |
| Arrecadação e bancos | Pix, APIs bancárias, CNAB e OFX | `Rotinas de arrecadação e conciliação podem ser integradas aos canais bancários disponíveis para o órgão.` |
| Setoriais e comunicação | e-SUS APS, Educacenso, GIS/mapas, e-mail e WhatsApp | `Conectividade disponível conforme interface do serviço externo e escopo de implantação.` |
| Assinatura e autenticação | Assinatura eletrônica e serviços externos associados | `A forma de assinatura e os provedores são definidos na configuração do ambiente.` |

Cada card deve usar uma destas classificações, aprovadas pelo responsável técnico antes da publicação:

- `Recurso da plataforma`: funcionalidade sem dependência de terceiro para existir.
- `Integração configurável`: conector ou fluxo previsto, sujeito ao escopo de implantação.
- `Dependência externa`: exige credencial, convênio, layout, ambiente ou homologação do órgão, banco ou fornecedor.

## Plano de Execução

### Fase 0: Corrigir afirmações e jornadas quebradas

- [x] Atualizar as referências a `24+` para os 28 módulos e cinco camadas em `Header.tsx`, `Stats.tsx`, `EcosystemMatrix.tsx`, `Footer.tsx` e `Contact.tsx`.
- [x] Remover ou condicionar alegações absolutas de conformidade, homologação, disponibilidade, prazo, publicação automática e resultado garantido em todas as seções carregadas por `src/app/(marketing)/page.tsx`.
- [x] Marcar o conteúdo de demonstração de `Hero.tsx` e `DashboardShowcase.tsx` como ilustrativo e substituir a calculadora sem metodologia por um diagnóstico de implantação.
- [x] Substituir as âncoras obsoletas pela navegação para `#integracoes`, `#implantacao` e `#impacto`.
- [x] Implementar o envio de `Contact.tsx` para `POST /api/leads`, com estados de carregamento, sucesso, erro de validação, limite de tentativas e erro de servidor.
- [x] Manter a confirmação de lead curta e factual. Não prometer tempo de resposta sem compromisso operacional documentado.
- [x] Deixar o consentimento desmarcado por padrão e vincular a política de privacidade.
- [ ] Registrar versão da política junto ao consentimento antes do lançamento comercial.
- [x] Criar as páginas de privacidade e termos, mantendo suas URLs em `sitemap.ts`.
- [x] Ajustar a resposta de `POST /api/leads` para retornar apenas o status necessário ao cliente, sem ecoar dados pessoais persistidos.

### Fase 1: Reorganizar a proposta de valor

- [x] Em `Hero.tsx`, manter a frase institucional do catálogo: `Processos ágeis, decisões seguras e dados confiáveis.`
- [x] Manter o CTA de catálogo na URL pública existente `/docs/catalogo-tecnico-celeriflow-2026.pdf`.
- [ ] Validar título, versão, tamanho e resposta HTTP do catálogo no ambiente publicado antes do lançamento.
- [x] Substituir as métricas de `Stats.tsx` por fatos verificáveis: `5 camadas`, `28 módulos funcionais`, `ativação modular` e `acesso web`.
- [x] Reestruturar `EcosystemMatrix.tsx` com a tabela de cobertura deste plano, seus cinco agrupamentos e a nota de escopo.
- [x] Atualizar `Footer.tsx` com a mantenedora Robonuvem Soluções Digitais, link único para o catálogo e textos sem alegações absolutas.

### Fase 2: Explicar implantação, integrações e governança

- [x] Criar `ConnectivityMatrix.tsx` conforme a classificação de integração deste plano e incluí-lo após o explorador de módulos em `page.tsx`.
- [x] Criar `ImplementationRoadmap.tsx` com as oito etapas: Levantamento, Planejamento, Parametrização, Migração de Dados, Testes Funcionais, Homologação Assistida, Entrada em Produção e Evolução Pós-Go-Live.
- [x] Explicar que o cronograma, a migração e a homologação são definidos no projeto de implantação; não prometer ausência de interrupções ou prazo padrão.
- [x] Revisar `Trust.tsx` para destacar perfis, segregação de funções, rastreabilidade, instância independente e controles disponíveis, sem declarar aderência legal total ou SLA não contratado.
- [x] Atualizar `FAQ.tsx` para responder que módulos e integrações são ativados conforme escopo, configuração e homologação quando aplicável.

### Fase 3: Prova, descoberta e qualidade pública

- [ ] Publicar métricas, cases ou depoimentos apenas com fonte, período, metodologia e autorização. Sem esses elementos, usar exemplos demonstrativos.
- [x] Remover a calculadora sem metodologia e substituí-la por um diagnóstico de implantação, sem estimativas apresentadas como garantia.
- [x] Completar metadados em `src/app/layout.tsx`: `metadataBase`, canônica, Open Graph, Twitter Card e imagem social.
- [x] Remover a oferta de preço zero do JSON-LD em `src/app/(marketing)/layout.tsx`; adicionar schema de FAQ somente se refletir exatamente o conteúdo renderizado.
- [ ] Conferir `sitemap.ts`, `robots.ts`, URLs canônicas e páginas legais em ambiente publicado.
- [ ] Instrumentar eventos de CTA, download do catálogo, início, erro e sucesso do formulário apenas depois de definir a base legal e a política de privacidade aplicável.

## Critérios de Aceite

### Conteúdo e conformidade

- [x] O explorador exibe exatamente os 28 módulos desta revisão, organizados nas cinco camadas.
- [x] Nenhuma referência a `24+` permanece nas seções públicas carregadas pela landing page.
- [x] Todo texto de integração explicita quando depende de configuração, credenciais, escopo ou homologação.
- [x] Não há selo, logo, porcentagem, prazo, certificação ou resultado comercial sem fonte aprovada.
- [x] Todo dado de exemplo possui rótulo visível de demonstração.

### Conversão e privacidade

- [x] O catálogo está apontado para a URL pública única e o arquivo existe no diretório público; a resposta HTTP deve ser confirmada no ambiente publicado.
- [x] O formulário grava o lead por `POST /api/leads`; sucesso só aparece após resposta bem-sucedida.
- [x] Os estados 400, 429 e 500 são compreensíveis para o visitante e preservam os dados já digitados quando possível.
- [x] O consentimento é livre, informado, desmarcado por padrão e aponta para uma política publicada.
- [x] Privacidade e termos constam no sitemap e as respectivas rotas foram geradas no build.

### Experiência, acessibilidade e qualidade técnica

- [ ] Todos os links internos, CTAs, âncoras e o download do PDF funcionam em desktop e mobile.
- [ ] Navegação por teclado, foco visível, contraste, hierarquia de títulos e semântica de abas/accordions são validados.
- [ ] A landing page é revisada em larguras mobile, tablet e desktop, sem cortar conteúdo ou depender apenas de hover.
- [x] Após alterações de código, executar `npm run lint`, `npm run test:unit` e `npm run build`.
- [ ] Antes da publicação, produto, responsável técnico e jurídico aprovam o registro de evidências das alegações exibidas.

## Ordem de Prioridade

1. Corrigir promessas não comprovadas, formulário simulado, consentimento, páginas legais e âncora quebrada.
2. Atualizar o catálogo visual para cinco camadas e 28 módulos.
3. Incluir matriz de interoperabilidade e metodologia de implantação com linguagem condicionada.
4. Validar calculadora, dashboard, SEO, dados estruturados, analytics e provas sociais antes de ampliar a campanha pública.
