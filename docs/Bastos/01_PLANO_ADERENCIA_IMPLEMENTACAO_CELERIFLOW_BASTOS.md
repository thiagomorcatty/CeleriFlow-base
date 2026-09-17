---
titulo: "Plano de aderência e implementação do CeleriFlow — Bastos/SP"
certame: "Pregão Eletrônico nº 066/2026"
processo: "Processo interno nº 226/2026 — Protocolo nº 5765/2026"
data: "2026-08-27"
versao: "1.0"
status: "Plano técnico de trabalho"
---

# Plano de aderência e implementação do CeleriFlow — Bastos/SP

## 1. Finalidade

Este documento transforma o Edital, o Termo de Referência e os esclarecimentos oficiais do Pregão Eletrônico nº 066/2026 em:

1. uma matriz de aderência do CeleriFlow;
2. um plano de auditoria do que já existe;
3. critérios para decidir entre reaproveitar módulos atuais, adaptá-los ou criar um módulo especializado;
4. uma sequência de implementação até a solução estar pronta para a POC e para a execução contratual.

> **Regra de segurança:** nenhuma função será considerada pronta apenas porque existe uma tela, rota, componente ou dado simulado. O item somente passa para **ATENDE** quando houver execução funcional, dados coerentes e evidência reproduzível.

## 2. Base documental e interpretação adotada

A solução contratada deve operar em ambiente web, ler automaticamente balancetes mensais em XML do AUDESP, consolidar dados conforme regras do TCE-SP, produzir demonstrações gerenciais e analíticas, acompanhar metas e indicadores fiscais e apoiar a geração/exportação de informações para SIOPE, SIOPS, SICONFI e MSC.

A POC é presencial, em Bastos/SP, deve utilizar equipamentos próprios da licitante e apresentar o sistema configurado e apto a executar **de forma nativa** as funções avaliadas. O esclarecimento oficial confirmou prazo de até cinco dias úteis para a conclusão, com uma única prorrogação por igual período mediante solicitação motivada e aceite da Administração.

O instrumento contém duas redações sobre aprovação: os itens 9.26.9/9.26.10 e 15.9/15.10 mencionam 85%, enquanto o item 15.21 prevê desclassificação pelo não cumprimento de pelo menos um item obrigatório. Para eliminar risco, este plano adota a meta interna de:

- **43/43 itens obrigatórios funcionando;**
- **8/8 itens passíveis de desenvolvimento também demonstráveis;**
- **51/51 itens cobertos por evidência e roteiro de teste.**

## 3. Decisão arquitetural preliminar

### 3.1 Recomendação

Não reconstruir a plataforma do zero. A recomendação é:

- reaproveitar a base do CeleriFlow para autenticação, perfis, permissões, hospedagem, auditoria, componentes visuais, relatórios e infraestrutura;
- criar um **espaço funcional especializado** chamado, provisoriamente, **Gestão Fiscal e Prestação de Contas — AUDESP**;
- reutilizar serviços financeiros e contábeis somente depois de validar sua aderência às regras do TCE-SP, NBCASP e layouts oficiais;
- manter os adaptadores AUDESP, SIOPE, SIOPS, SICONFI e MSC como componentes específicos e testáveis;
- usar uma instância separada para Bastos, evitando dependência de código residual de multi-tenancy.

### 3.2 Menu recomendado para a instância Bastos

1. **Dashboard Fiscal**
2. **Importação e Consolidação AUDESP**
3. **Cenários e Projeções**
4. **Gestão Fiscal e Gerencial**
5. **Prestação de Contas**
   - AUDESP
   - SIOPE
   - SIOPS
   - SICONFI
   - MSC
   - Balanços Contábeis
6. **Audiência Pública**
7. **Administração e Configurações**

Essa organização é uma decisão interna de produto; o edital exige as funcionalidades, não esses nomes de menu.

### 3.3 Ocultar ou bloquear os demais módulos

Para o perfil **Avaliador POC**:

- ocultar do menu todos os módulos sem relação com o objeto;
- impedir acesso direto por URL a rotas não autorizadas;
- manter os módulos completos disponíveis apenas para o administrador da Robonuvem;
- evitar apresentar módulos irrelevantes apenas como “bloqueados”, pois isso polui a navegação e não agrega evidência à POC;
- usar bloqueio visível somente durante testes internos ou quando houver dependência funcional que precise permanecer identificada.

### 3.4 Critério de decisão: reutilizar, adaptar ou criar

| Classificação | Quando usar | Decisão |
|---|---|---|
| **Reutilizar** | A função atual executa a mesma regra, usa dados equivalentes e produz resultado aderente | Manter e registrar evidência |
| **Adaptar** | A estrutura existe, mas faltam filtros, campos, cálculo, relatório ou integração específica | Reaproveitar componente e implementar o complemento |
| **Criar especializado** | A função depende de layout oficial, regra fiscal, fórmula, arquivo ou fluxo próprio do AUDESP/órgão externo | Criar dentro do novo espaço funcional |
| **Descartar da POC** | A função não corresponde ao objeto | Ocultar do perfil avaliador |

## 4. Inventário inicial conhecido do CeleriFlow — a confirmar no código

Os registros atuais do projeto indicam o seguinte ponto de partida:

| Componente conhecido | Possível reaproveitamento | Verificação obrigatória |
|---|---|---|
| Aplicação web hospedada em Vercel e banco PostgreSQL/Neon | Requisitos web, hospedagem e acesso remoto | Ambiente efetivo da instância Bastos, logs, domínio e estabilidade |
| Firebase Authentication, usuários, perfis e permissões | Controle de acesso | Proteção de rotas, segregação por perfil e evidência de senhas protegidas |
| Base financeira/contábil com contas, receitas, movimentos, lançamentos, fontes, conciliação e razão | Relatórios gerenciais e razão | Semântica contábil pública, dimensões exigidas, NBCASP e regras AUDESP |
| Relatórios financeiros, auditoria e componentes de dashboard | Dashboard, gerencial e exportações | Conteúdo fiscal, filtros, impressão e XLS/DOC/PDF |
| Catálogo de conexões, configurações e histórico de execução | Integrações governamentais | Existência de adaptadores reais; não considerar cadastro/configuração como integração funcional |
| Módulo de Configurações e Integrações | Parâmetros, usuários, integrações, logs e LGPD | Estado real de cada recurso e documentação/evidência |
| Controle de módulos e experiência anterior com módulos bloqueados em POC | Instância enxuta para Bastos | Garantir ocultação por perfil e bloqueio de acesso direto |

> **Hipótese atual:** a base tecnológica é reaproveitável; as regras fiscais e os adaptadores oficiais devem ser tratados como trabalho específico até que a auditoria prove o contrário.

## 5. Matriz mestra dos 51 quesitos da POC

Legenda da hipótese inicial:

- **BASE:** forte candidato a já existir na plataforma;
- **PARCIAL:** estrutura geral pode existir, mas a aderência fiscal precisa ser implementada/validada;
- **ESPECÍFICO:** considerar novo até haver evidência funcional;
- **A CONFIRMAR:** resultado definitivo após inspeção de código e teste.


### 5.1. Requisitos técnicos

Fonte primária: **TR, item 15.21, pp. 24–25**.

| ID | Classificação | Requisito de aderência | Módulo candidato | Hipótese inicial | Status real | Evidência |
|---|---|---|---|---|---|---|
| T01 | Obrigatório | Aplicação sistêmica desenvolvida e disponibilizada em plataforma 100% web. | Plataforma / Administração | BASE — validar execução integral via navegador e ausência de dependência local. | A confirmar | — |
| T02 | Obrigatório | Hospedagem da plataforma em datacenter sob responsabilidade da contratada. | Infraestrutura / Hospedagem | BASE — confirmar ambiente, responsabilidade operacional e evidência de hospedagem. | A confirmar | — |
| T03 | Obrigatório | Gerenciamento das informações por aplicação web desenvolvida com linguagem de alto nível. | Plataforma | BASE — registrar stack e evidência técnica da aplicação. | A confirmar | — |
| T04 | Obrigatório | Informações disponíveis pela internet por meio de vários navegadores. | Plataforma | BASE — executar matriz mínima de navegadores antes da POC. | A confirmar | — |
| T05 | Obrigatório | Controle seguro de acesso a dados por usuários e senhas criptografadas. | Administração / Segurança | BASE — validar autenticação, perfis e evidência de proteção das senhas. | A confirmar | — |
| T06 | Obrigatório | Mecanismos eficazes e eficientes para obtenção das informações transmitidas ao Sistema AUDESP. | Gestão Fiscal / AUDESP | ESPECÍFICO — considerar novo até existir prova funcional no código. | A confirmar | — |
| T07 | Obrigatório | Tratamento de informações no padrão XML do AUDESP, conforme as especificações do TCE-SP. | Gestão Fiscal / AUDESP | ESPECÍFICO — implementar/validar layouts oficiais e versionamento. | A confirmar | — |
| T08 | Obrigatório | Rotina automatizada de importação de arquivos eletrônicos XML do AUDESP, conforme layout do TCE-SP. | Gestão Fiscal / AUDESP | ESPECÍFICO — implementar pipeline real de importação, validação e registro de ocorrências. | A confirmar | — |
| T09 | Obrigatório | Consolidação dos balancetes contábeis conforme o formato e as regras definidos pelo TCE-SP. | Gestão Fiscal / AUDESP | ESPECÍFICO — implementar regras de consolidação e conferência. | A confirmar | — |
| T10 | Obrigatório | Geração e salvamento de relatórios, no mínimo, nos formatos XLS, DOC e PDF. | Serviço compartilhado de relatórios | PARCIAL — validar todos os três formatos; não presumir DOC a partir de PDF/XLS. | A confirmar | — |
| T11 | Obrigatório | Informações contábeis, orçamentárias, financeiras e patrimoniais em atendimento às NBCASP. | Gestão Fiscal e Contábil | ESPECÍFICO/PARCIAL — validar regras, classificações e demonstrativos com responsável contábil. | A confirmar | — |
| T12 | Obrigatório | Conformidade com a LGPD ou apresentação de plano de trabalho para alcançá-la, indicando o DPO responsável. | Administração / LGPD | PARCIAL — consolidar evidências, plano e identificação do DPO. | A confirmar | — |

### 5.2. Módulo Dashboard

Fonte primária: **TR, item 15.21, p. 24**.

| ID | Classificação | Requisito de aderência | Módulo candidato | Hipótese inicial | Status real | Evidência |
|---|---|---|---|---|---|---|
| D01 | Obrigatório | Dashboard com informações orçamentárias e financeiras da Prefeitura e possibilidade de impressão. | Dashboard Fiscal | PARCIAL — reaproveitar componentes, criando dados e impressões fiscais específicas. | A confirmar | — |
| D02 | Passível de Desenvolvimento | Visualização da execução orçamentária e financeira separada por fonte de recurso. | Dashboard Fiscal | PARCIAL — validar filtros e modelo de fonte de recurso. | A confirmar | — |
| D03 | Passível de Desenvolvimento | Análise do desempenho de receita e despesa mediante comparação de índices econômicos. | Dashboard Fiscal | ESPECÍFICO/PARCIAL — implementar comparação com índices econômicos aplicáveis. | A confirmar | — |
| D04 | Obrigatório | Visualização da execução orçamentária e financeira com análise comparativa em relação a outro período. | Dashboard Fiscal | PARCIAL — validar seleção de períodos e consistência dos comparativos. | A confirmar | — |
| D05 | Obrigatório | Visualização dos percentuais de Ensino, Fundeb, Saúde, Despesa com Pessoal, DCL, art. 167 e CAPAG. | Dashboard Fiscal | ESPECÍFICO — implementar fórmulas, fontes e memória de cálculo. | A confirmar | — |
| D06 | Obrigatório | Relatório da situação do Município no CAUC. | Dashboard Fiscal / Situação Fiscal | ESPECÍFICO — definir fonte e rotina de atualização. | A confirmar | — |
| D07 | Obrigatório | Visualização dos relatórios de Instruções e Alertas emitidos pelo TCE-SP. | Dashboard Fiscal / TCE-SP | ESPECÍFICO — definir importação/cadastro e visualização. | A confirmar | — |
| D08 | Obrigatório | Visualização da posição do Município no ranking do SICONFI. | Dashboard Fiscal / SICONFI | ESPECÍFICO — definir fonte, período e apresentação. | A confirmar | — |

### 5.3. Módulo Cenários

Fonte primária: **TR, item 15.21, pp. 24–25**.

| ID | Classificação | Requisito de aderência | Módulo candidato | Hipótese inicial | Status real | Evidência |
|---|---|---|---|---|---|---|
| C01 | Obrigatório | Criação de cenários de receita e despesa com periodicidade mensal e anual, em percentual ou valor. | Cenários e Projeções | PARCIAL — reaproveitar motor de cenários se existir; validar periodicidade e formas de entrada. | A confirmar | — |
| C02 | Obrigatório | Cenários históricos e projetados de receita e despesa com Mês, Entidade, Fonte de Recurso, Classificação Econômica e Metodologia de Projeção conforme a Lei 4.320/1964. | Cenários e Projeções | ESPECÍFICO/PARCIAL — validar dimensões e metodologia. | A confirmar | — |
| C03 | Obrigatório | Cenários históricos dos percentuais de Ensino e Saúde, com despesa empenhada, liquidada e paga, comparação com IPCA e IGP-M e metodologia de projeção conforme a Lei 4.320/1964. | Cenários e Projeções | ESPECÍFICO — implementar indicadores, índices e metodologia. | A confirmar | — |

### 5.4. Módulo Gerencial

Fonte primária: **TR, item 15.21, p. 25**.

| ID | Classificação | Requisito de aderência | Módulo candidato | Hipótese inicial | Status real | Evidência |
|---|---|---|---|---|---|---|
| G01 | Obrigatório | Demonstrativos da gestão fiscal, orçamentária e financeira, com execução e índices de Ensino, Fundeb, Saúde, DCL, Pessoal e Limite de Endividamento. | Gestão Fiscal e Gerencial | ESPECÍFICO/PARCIAL — consolidar dashboards e relatórios com memória de cálculo. | A confirmar | — |
| G02 | Obrigatório | Relatório do resultado orçamentário pelos critérios de despesa empenhada, liquidada e paga, por órgão e fonte de recurso. | Gestão Fiscal e Gerencial | PARCIAL — validar granularidade e critérios. | A confirmar | — |
| G03 | Obrigatório | Relatório do resultado financeiro pelos critérios de despesa empenhada, liquidada e paga, incluindo despesas a pagar do exercício e de exercícios anteriores, por órgão e fonte. | Gestão Fiscal e Gerencial | PARCIAL — validar restos/obrigações e períodos. | A confirmar | — |
| G04 | Passível de Desenvolvimento | Relatório de acompanhamento da receita com Mês, Entidade, Fonte de Recurso e Classificação Econômica. | Gestão Fiscal e Gerencial | PARCIAL — mapear filtros e classificações. | A confirmar | — |
| G05 | Passível de Desenvolvimento | Relatório de acompanhamento da despesa com Mês, Entidade, Fonte de Recurso e Classificação Econômica. | Gestão Fiscal e Gerencial | PARCIAL — mapear filtros e classificações. | A confirmar | — |
| G06 | Obrigatório | Relatório de projeção da arrecadação com Mês, Entidade e Fonte de Recurso. | Gestão Fiscal e Gerencial / Projeções | ESPECÍFICO/PARCIAL — validar cálculo e filtros. | A confirmar | — |
| G07 | Obrigatório | Relatório de suficiência ou insuficiência financeira projetada com Mês, Entidade, Fonte de Recurso e Metodologia de Projeção. | Gestão Fiscal e Gerencial / Projeções | ESPECÍFICO — implementar cálculo e memória. | A confirmar | — |
| G08 | Obrigatório | Comparação de dois exercícios para Resultado Orçamentário, Financeiro, Ensino, Fundeb, Saúde, Pessoal, DCL, art. 167, CAPAG e posição no ranking SICONFI. | Gestão Fiscal e Gerencial | ESPECÍFICO/PARCIAL — garantir série histórica e comparabilidade. | A confirmar | — |
| G09 | Passível de Desenvolvimento | Acompanhamento dos gastos nos dois últimos quadrimestres do último ano de mandato, nos termos do art. 42 da LRF, com liquidez/iliquidez do mês e acompanhamento mensal até o fim do exercício. | Gestão Fiscal e Gerencial / Regras de Mandato | ESPECÍFICO — implementar regra e acompanhamento. | A confirmar | — |
| G10 | Passível de Desenvolvimento | Acompanhamento do limite de despesas com pessoal e encargos nos últimos 180 dias do mandato, conforme art. 21 da LRF. | Gestão Fiscal e Gerencial / Regras de Mandato | ESPECÍFICO — implementar regra e série mensal. | A confirmar | — |
| G11 | Passível de Desenvolvimento | Acompanhamento mensal do cumprimento das receitas e despesas correntes, conforme art. 167-A da Constituição Federal. | Gestão Fiscal e Gerencial | ESPECÍFICO — implementar cálculo mensal. | A confirmar | — |
| G12 | Passível de Desenvolvimento | Acompanhamento mensal da Capacidade de Pagamento do Município — CAPAG. | Gestão Fiscal e Gerencial | ESPECÍFICO — implementar cálculo/série conforme parâmetros aplicáveis. | A confirmar | — |

### 5.5. Módulo Legal

Fonte primária: **TR, item 15.21, p. 25**.

| ID | Classificação | Requisito de aderência | Módulo candidato | Hipótese inicial | Status real | Evidência |
|---|---|---|---|---|---|---|
| L01 | Obrigatório | Relatório de acompanhamento e validação das metas de arrecadação e dos indicadores de Gestão Fiscal, incluindo execução, Ensino, Fundeb, Saúde, DCL, Pessoal e Limite de Endividamento. | Prestação de Contas / Legal | ESPECÍFICO/PARCIAL — consolidar cálculos e validações. | A confirmar | — |
| L02 | Obrigatório | Geração, validação e transmissão do arquivo eletrônico SIOPE do Ministério da Educação a partir dos balancetes XML enviados ao AUDESP. | Prestação de Contas / SIOPE | ESPECÍFICO — implementar layout, parametrização, validação e transmissão conforme o requisito. | A confirmar | — |
| L03 | Obrigatório | Validação, parametrização e geração de arquivo eletrônico denominado no TR como “SIOPE do Ministério Público”, a partir dos balancetes XML do AUDESP. | Prestação de Contas / SIOPE | ESPECÍFICO — preservar a redação do TR e validar exatamente o artefato esperado pela comissão. | A confirmar | — |
| L04 | Obrigatório | Parametrização e geração do arquivo eletrônico SIOPS do Ministério da Saúde a partir dos balancetes XML do AUDESP. | Prestação de Contas / SIOPS | ESPECÍFICO — implementar layout e parametrização. | A confirmar | — |
| L05 | Obrigatório | Geração de arquivo com informações orçamentárias e financeiras para transmissão e homologação no SICONFI. | Prestação de Contas / SICONFI | ESPECÍFICO — implementar formato e validação. | A confirmar | — |
| L06 | Obrigatório | Geração de informações orçamentárias e financeiras conforme a Matriz de Saldos Contábeis — MSC, para transmissão e homologação no SICONFI. | Prestação de Contas / MSC | ESPECÍFICO — implementar estrutura MSC, validação e saída. | A confirmar | — |
| L07 | Obrigatório | Relatórios pormenorizados com indicadores de RREO, RGF, Ensino, Fundeb e Saúde para prestação de contas via interação direta no AUDESP. | Prestação de Contas / AUDESP | ESPECÍFICO — implementar relatórios e estrutura de conferência. | A confirmar | — |
| L08 | Obrigatório | Relatórios por razão de conta corrente conforme regras do AUDESP, demonstrando a movimentação dos arquivos XML mensais. | Prestação de Contas / AUDESP | PARCIAL/ESPECÍFICO — reaproveitar razão existente somente se aderente às regras AUDESP. | A confirmar | — |
| L09 | Obrigatório | Demonstrativos de balanços contábeis conforme os modelos do TCE-SP e da Secretaria do Tesouro Nacional. | Prestação de Contas / Balanços | ESPECÍFICO — implementar todos os demonstrativos detalhados no item 3.0 do TR. | A confirmar | — |

### 5.6. Módulo Audiência Pública

Fonte primária: **TR, item 15.21, pp. 25–26**.

| ID | Classificação | Requisito de aderência | Módulo candidato | Hipótese inicial | Status real | Evidência |
|---|---|---|---|---|---|---|
| A01 | Obrigatório | Demonstrativo e gráfico das despesas fixadas e do resultado da despesa empenhada, liquidada e paga. | Audiência Pública | ESPECÍFICO/PARCIAL — reaproveitar gráficos apenas com dados e filtros aderentes. | A confirmar | — |
| A02 | Obrigatório | Demonstrativo e gráfico das despesas realizadas. | Audiência Pública | ESPECÍFICO/PARCIAL. | A confirmar | — |
| A03 | Obrigatório | Demonstrativo e gráfico do resultado financeiro. | Audiência Pública | ESPECÍFICO/PARCIAL. | A confirmar | — |
| A04 | Obrigatório | Demonstrativo e gráfico do cumprimento das metas de Resultado Nominal e Primário do exercício. | Audiência Pública | ESPECÍFICO — implementar cálculo e visualização. | A confirmar | — |
| A05 | Obrigatório | Demonstrativo e gráfico dos limites constitucionais de Ensino, Fundeb, Saúde e Despesa com Pessoal. | Audiência Pública | ESPECÍFICO — reutilizar cálculos fiscais validados. | A confirmar | — |
| A06 | Obrigatório | Parametrização das informações para apresentação da audiência pública. | Audiência Pública | ESPECÍFICO — criar configuração da apresentação. | A confirmar | — |
| A07 | Obrigatório | Geração automática da ata e da lista de presença da audiência pública. | Audiência Pública | ESPECÍFICO — implementar os dois documentos. | A confirmar | — |

## 6. Requisitos do TR que ampliam ou detalham a POC

O item 15.21 é o roteiro formal de avaliação, mas o item 3.0 do TR detalha a execução contratual. Esses detalhes devem compor o backlog e os testes internos, ainda que alguns apareçam resumidos na tabela da POC.

### 6.1 Dados, resultados e classificações

- resultado orçamentário por despesa empenhada, liquidada e paga, com órgão, fonte de recurso e código de aplicação;
- resultado financeiro com despesas a pagar do exercício e de exercícios anteriores, por órgão e fonte;
- índices constitucionais com periodicidade mensal;
- evolução de receita e despesa por órgão, fonte e código de aplicação;
- receitas detalhadas por categoria, origem, espécie, rubrica, alínea e subalínea;
- despesas detalhadas por categoria, grupo, modalidade, elemento e subelemento;
- projeção de arrecadação por órgão, fonte e código de aplicação;
- suficiência/insuficiência financeira mensal e projetada, por fonte e código de aplicação.

### 6.2 Prestação de contas e sistemas externos

- RREO e RGF em relatórios e planilha eletrônica para conferência;
- SICONFI e MSC com levantamento, preenchimento, encaminhamento e homologação das informações;
- SIOPE do 1º ao 6º bimestre e validação no MAVS;
- SIOPS do 1º ao 6º bimestre;
- relatórios de RREO, RGF, Ensino, Fundeb e Saúde destinados à interação com o AUDESP;
- acompanhamento automatizado da situação fiscal do Município perante Estado e União.

> O TR não fornece, dentro do edital, os esquemas XML, arquivos de exemplo, credenciais ou especificações completas de todos os arquivos externos. Esses artefatos devem ser obtidos e versionados como dependências oficiais do desenvolvimento.

### 6.3 Regras fiscais de mandato e limites

- art. 42 da LRF: mês de referência, acompanhamento dos últimos oito meses, liquidez do período e liquidez projetada;
- art. 21 da LRF: percentual do mês e acompanhamento dos últimos 180 dias;
- art. 167-A da Constituição Federal: acompanhamento mensal de receitas e despesas correntes;
- CAPAG: apuração e acompanhamento dos últimos 12 meses;
- resultado nominal e primário;
- limite de endividamento conforme a referência indicada no TR.

### 6.4 Audiência pública — detalhamento contratual

Além dos sete quesitos resumidos na POC, o item 3.0 exige que a solução contemple, conforme aplicável:

- previsão e realização da arrecadação, por órgão e consolidado, comparada à meta;
- gráficos de arrecadação e das principais fontes;
- despesas fixadas e resultados empenhado, liquidado e pago, por órgão e consolidado;
- avaliação das despesas realizadas em relação à meta;
- despesas por função, subfunção, órgão e fonte;
- resultado financeiro por órgão e consolidado;
- limites de endividamento;
- metas de resultado nominal e primário;
- limites de Ensino, Fundeb, Saúde e Pessoal;
- parametrização da apresentação;
- geração automática da ata;
- emissão da lista de presença.

### 6.5 Balanços contábeis — detalhamento contratual

O módulo de balanços deve permitir emissão mensal, por órgão e consolidada, dos relatórios mencionados no TR:

- Anexo 12 — Balanço Orçamentário;
- Anexo 12 A — Execução dos Restos a Pagar;
- Anexo 13 — Balanço Financeiro;
- “Anexo 12 A — Contas do Passivo”, preservando a redação literal do TR até validação;
- Anexo 14 — Balanço Patrimonial;
- Anexo 14 A — Ativo e Passivo Financeiro;
- Anexo 14 B — Ativo e Passivo Financeiro;
- Anexo 15 — Variações Patrimoniais;
- Anexo 18 — Fluxo de Caixa;
- Anexo 18 A — Receitas Derivadas e Originárias;
- cadastro e impressão de assinaturas e notas explicativas.

### 6.6 Obrigações operacionais durante o contrato

- implantação e treinamento;
- manutenção contínua e atualização do software;
- correção ágil de problemas de funcionamento;
- suporte técnico contínuo por canais adequados;
- suporte ordinário remoto; atendimento presencial apenas quando tecnicamente necessário e previamente solicitado/agendado, conforme esclarecimento oficial;
- comunicação de falhas, interrupções e fatos anormais;
- continuidade do serviço;
- transferência, integridade e rastreabilidade dos dados ao término do contrato;
- conformidade com a LGPD;
- manutenção das condições de habilitação.

## 7. Plano de auditoria do que já existe

### Etapa 1 — Congelamento da matriz documental

- registrar a versão do edital, do TR e dos esclarecimentos utilizados;
- manter os 51 IDs deste documento como chave única de rastreabilidade;
- impedir que requisitos sejam renomeados ou agrupados de modo que algum item desapareça;
- preservar literalmente as redações incomuns, como “SIOPE do Ministério Público” e “Anexo 12 A — Contas do Passivo”, até confirmação formal.

**Saída:** matriz documental fechada e versionada.

### Etapa 2 — Inventário técnico do repositório

Para cada módulo, rota, serviço, tabela e relatório atual:

- identificar nome, caminho, responsável e dependências;
- verificar se está funcional no ambiente implantado;
- registrar os dados de entrada e saída;
- identificar se usa dado real, dado simulado ou placeholder;
- verificar permissões, logs e exportações;
- mapear testes existentes.

**Saída:** inventário do CeleriFlow com links para código e ambiente.

### Etapa 3 — Análise requisito por requisito

Para cada ID T01–A07:

1. executar a função atual;
2. registrar a rota/tela;
3. identificar serviço, tabela e regra usada;
4. comparar o resultado com o texto do edital/TR;
5. classificar como **Atende**, **Parcial** ou **Não atende**;
6. anexar evidência;
7. abrir tarefa de implementação quando necessário.

**Saída:** coluna “Status real” preenchida para os 51 itens.

### Etapa 4 — Auditoria do modelo de dados

Validar se o modelo atual comporta, no mínimo:

- exercício, mês/período e entidade;
- órgão e unidade;
- fonte de recurso e código de aplicação;
- classificação econômica de receita e despesa;
- estágios da despesa: fixada, empenhada, liquidada e paga;
- receitas previstas e arrecadadas;
- despesas a pagar do exercício e anteriores;
- contas, razões, movimentações e consolidação;
- indicadores fiscais e constitucionais;
- cenários, metodologias e séries históricas;
- lotes, arquivos, versões, validações e ocorrências de importação AUDESP;
- arquivos gerados e histórico de transmissão/exportação.

**Saída:** decisão entre ampliar o modelo existente ou criar esquema especializado.

### Etapa 5 — Auditoria das integrações

- localizar adaptadores efetivamente executáveis;
- separar “cadastro de conexão” de “integração real”;
- verificar importação, validação, transformação, geração e transmissão;
- testar tratamento de erros e rastreabilidade;
- confirmar layouts/versionamentos oficiais.

**Saída:** mapa real de AUDESP, SIOPE, SIOPS, SICONFI e MSC.

### Etapa 6 — Auditoria de evidências da POC

Cada requisito deverá possuir:

- URL ou caminho de acesso;
- perfil autorizado;
- massa de dados;
- sequência reproduzível;
- resultado esperado;
- arquivo gerado, quando aplicável;
- responsável pela demonstração;
- status de ensaio.

**Saída:** pacote de evidências pronto para alimentar o roteiro da POC.

## 8. Decisão final sobre os módulos atuais

Ao fim da auditoria, aplicar esta regra:

### Manter o módulo atual quando

- a regra funcional já for equivalente;
- os dados exigidos estiverem disponíveis;
- o relatório/arquivo estiver correto;
- a função puder ser exibida sem rotas ou menus irrelevantes;
- não houver risco de regressão em outras áreas.

### Adaptar o módulo atual quando

- a base de dados e os componentes existirem;
- faltarem apenas dimensões, filtros, impressão, exportação ou cálculo;
- a adaptação puder ser isolada por configuração/feature flag.

### Criar módulo especializado quando

- houver dependência de layout AUDESP ou arquivo oficial;
- a regra for fiscal/contábil específica;
- a tela atual usar semântica incompatível;
- a implementação no módulo genérico aumentar o risco de regressão;
- a clareza da POC exigir navegação própria.

### Decisão recomendada antes da auditoria

- **reutilizar:** plataforma, autenticação, perfis, hospedagem, logs, componentes, serviço de relatórios e partes comprovadamente aderentes do Financeiro/Contábil;
- **criar/adaptar como área especializada:** importação e consolidação AUDESP, indicadores fiscais, cenários, prestação de contas, arquivos oficiais, audiência pública e balanços;
- **ocultar:** módulos alheios ao escopo para o perfil Avaliador POC.

## 9. Etapas de implementação

### Fase 0 — Preparação e rastreabilidade

- versionar este plano e o roteiro da POC;
- criar quadro de tarefas com os IDs T01–A07;
- configurar ambiente exclusivo de Bastos;
- criar perfil **Avaliador POC**;
- configurar ocultação dos módulos não relacionados.

**Critério de saída:** ambiente isolado e backlog 100% rastreável.

### Fase 1 — Fundação técnica

- validar plataforma web e navegadores;
- revisar autenticação, perfis e proteção de rotas;
- validar datacenter e observabilidade;
- consolidar LGPD/DPO;
- garantir serviço de exportação em XLS, DOC e PDF.

**Critério de saída:** T01–T05, T10 e T12 comprováveis.

### Fase 2 — Núcleo AUDESP

- implementar/versionar layouts XML;
- importar arquivos automaticamente;
- registrar lote, arquivo, período, entidade, validações e erros;
- transformar dados para o modelo interno;
- consolidar balancetes;
- permitir conferência e rastreabilidade até o XML de origem.

**Critério de saída:** T06–T09 funcionando com arquivos reproduzíveis.

### Fase 3 — Motor fiscal e contábil

- validar classificações e NBCASP;
- implementar cálculos e memória de cálculo;
- estruturar índices de Ensino, Fundeb, Saúde, Pessoal, DCL, art. 167/167-A, CAPAG, endividamento, resultado nominal e primário;
- garantir séries mensais, por exercício, entidade, órgão, fonte e código de aplicação.

**Critério de saída:** base única de cálculo usada por dashboards, relatórios e audiência.

### Fase 4 — Dashboard e cenários

- implementar D01–D08;
- implementar C01–C03;
- garantir impressão, comparação de períodos, fontes, índices econômicos e séries históricas.

**Critério de saída:** 11 itens demonstráveis de ponta a ponta.

### Fase 5 — Módulo gerencial

- implementar G01–G12;
- conectar resultados orçamentários, financeiros, projeções, regras de mandato e CAPAG ao motor fiscal;
- validar todos os filtros mínimos do TR.

**Critério de saída:** 12 itens demonstráveis e coerentes com o XML importado.

### Fase 6 — Prestação de contas e Módulo Legal

- implementar L01–L09;
- gerar, validar e, quando exigido pelo texto, transmitir os arquivos;
- disponibilizar RREO/RGF e planilhas de conferência;
- implementar SIOPE/MAVS, SIOPS, SICONFI e MSC;
- implementar razão de conta corrente AUDESP;
- emitir todos os balanços detalhados no TR.

**Critério de saída:** arquivos e relatórios gerados a partir da mesma base importada e consolidada.

### Fase 7 — Audiência pública

- implementar A01–A07;
- complementar com os detalhamentos do item 3.0 do TR;
- gerar apresentação parametrizada, ata e lista de presença.

**Critério de saída:** audiência completa gerada a partir dos dados consolidados.

### Fase 8 — Manutenção, suporte e implantação

- preparar implantação e treinamento;
- consolidar canais de suporte;
- registrar procedimento de correção e atualização;
- preparar política de continuidade e transferência de dados.

**Critério de saída:** capacidade operacional para a execução contratual, não apenas para a POC.

### Fase 9 — Ensaios integrados

- executar o roteiro completo do segundo arquivo;
- repetir o ensaio com perfil Avaliador POC;
- validar todos os arquivos exportados;
- registrar tempos, falhas e correções;
- realizar ensaio com a comissão simulada acessando diretamente o sistema;
- eliminar placeholders, telas sem ação e dados incoerentes.

**Critério de saída:** 51/51 itens aprovados internamente.

### Fase 10 — Preparação presencial

- congelar versão candidata à POC;
- validar equipamentos próprios;
- validar credenciais e perfis;
- levar conexão móvel, conforme recomendação do edital;
- manter cópia local dos arquivos de entrada e saída necessários à demonstração;
- levar o roteiro impresso/digital para controle da sequência.

**Critério de saída:** demonstração reproduzível no local da POC.

## 10. Ordem de prioridade técnica

1. plataforma, autenticação, ambiente e exportações;
2. importação e consolidação AUDESP;
3. modelo de dados e motor fiscal;
4. itens obrigatórios de Dashboard, Cenários e Gerencial;
5. SIOPE, SIOPS, SICONFI, MSC, RREO/RGF e balanços;
6. Audiência Pública;
7. itens classificados como Passível de Desenvolvimento;
8. documentação, implantação, treinamento e suporte.

Apesar dessa ordem, a entrega interna somente será considerada concluída com os **51 itens demonstráveis**.

## 11. Definição de pronto

O CeleriFlow estará pronto para a POC quando:

- [ ] os 51 IDs tiverem status **Atende**;
- [ ] todos os itens obrigatórios funcionarem sem placeholder;
- [ ] todos os itens PD também estiverem demonstráveis;
- [ ] a importação XML alimentar efetivamente cálculos, relatórios e arquivos;
- [ ] os valores forem coerentes entre Dashboard, Gerencial, Legal e Audiência;
- [ ] os arquivos XLS, DOC, PDF e os arquivos de prestação de contas forem abertos e conferidos;
- [ ] o perfil Avaliador POC enxergar somente o escopo relevante;
- [ ] a comissão puder operar o sistema diretamente;
- [ ] o ensaio completo tiver sido repetido sem falha;
- [ ] LGPD/DPO, hospedagem e evidências técnicas estiverem disponíveis;
- [ ] a versão apresentada estiver congelada e identificada.

## 12. Referências documentais

- Edital do Pregão Eletrônico nº 066/2026, especialmente itens 9.26 e 12.8–12.9.
- Anexo I — Termo de Referência, especialmente itens 1.0, 2.0, 3.0 e 15.1–15.21.
- Resposta oficial ao Questionamento 2 — prazo da POC.
- Resposta oficial ao Questionamento 3 — suporte técnico e assistência local.
- Resposta oficial ao pedido sobre POC remota — manutenção da demonstração presencial e limitação aos critérios previamente estabelecidos.
