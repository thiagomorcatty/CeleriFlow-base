# CeleriFlow - Catálogo de Apresentação Financeira

## 1. Objetivo

Este material organiza o conteúdo para apresentação do CeleriFlow com foco na gestão financeira pública. Ele descreve a estrutura da solução, os módulos que apoiam a operação financeira, os controles de acesso, as integrações e as configurações técnicas relevantes.

O documento pode ser transferido para um template institucional, apresentação comercial ou manual de demonstração.

### Escopo da apresentação

- Administração Geral.
- Financeiro e Contábil.
- Tributário.
- GED e documentos eletrônicos.
- Configurações, perfis, auditoria e integrações.

### Mensagem central

O CeleriFlow organiza os fluxos administrativos, orçamentários, financeiros, contábeis e documentais em uma única instância, com permissões por perfil e módulo, rastreabilidade de ações e configurações preparadas para operar em ambientes de teste, homologação ou produção.

> **Nota de apresentação:** quando houver demonstração de POC com banco virtual, declarar que a origem bancária é simulada. Os registros gerados dentro da instância de demonstração são persistidos no CeleriFlow, mas a solução não deve ser apresentada como integração homologada com banco oficial sem contratação, configuração e homologação específicas.

---

## 2. Visão da Estrutura da Solução

### Camadas funcionais

| Camada | Papel no CeleriFlow |
|---|---|
| Administração | Mantém a estrutura institucional, setores, unidades, servidores, cargos e demandas internas. |
| Financeiro e Contábil | Controla planejamento, orçamento, receita, despesa, tesouraria, bancos, conciliação, contabilidade e relatórios. |
| Tributário | Apoia cadastros econômicos e imobiliários, guias, arrecadação, dívida ativa, certidões e fiscalização. |
| GED | Organiza documentos, modelos, versões, assinaturas internas e vínculos com os processos operacionais. |
| Configurações | Centraliza módulos ativos, perfis, usuários, workflows, integrações, instância e auditoria. |

### Princípios operacionais

- Uma ação financeira possui responsável, data/hora, contexto e evidências relacionadas.
- O acesso é controlado por usuário, perfil, módulo e, quando aplicável, unidade gestora.
- Documentos e arquivos apoiam a rastreabilidade dos fatos administrativos e financeiros.
- As contas bancárias são cadastradas com unidade gestora, fonte de recurso, conta analítica e finalidade operacional.
- Integrações são configuradas por ambiente e por referência de credencial, sem armazenar segredos em telas ou parâmetros públicos.

<!-- IMAGEM SUGERIDA: diagrama simples com Administração, Financeiro, Tributário, GED e Configurações conectados ao núcleo CeleriFlow. -->

---

## 3. Configuração Técnica

### Componentes técnicos

- Aplicação web responsiva, acessível por navegador em desktop e dispositivos móveis.
- Persistência em banco de dados relacional, com modelo de dados e migrações controlados pela aplicação.
- Camada de autenticação com sessão individual e validação de e-mail.
- Rotas protegidas no servidor para operações administrativas, financeiras e de configuração.
- Geração de relatórios internos e exportações em formatos como CSV e PDF, conforme a funcionalidade.
- Armazenamento privado de documentos, com validação de tipo, tamanho, vínculo de instância e download protegido.

### Ambientes de integração

| Ambiente | Uso recomendado |
|---|---|
| Mock | Validação local ou automatizada sem chamada de rede externa. |
| Sandbox | Demonstrações controladas e testes com serviços externos simulados. |
| Homologação | Validação conjunta com o fornecedor da integração e equipe municipal. |
| Produção | Operação contratada, configurada e homologada para a instituição. |

### Configurações técnicas a validar antes de uma apresentação

- URL pública acessível por HTTPS.
- Instância identificada para demonstração, homologação ou produção.
- Módulos necessários ativos para o perfil demonstrador.
- Usuários de apresentação criados com perfis individuais.
- Unidade gestora, fontes de recurso, plano de contas e contas bancárias previamente vinculados.
- Conexões externas configuradas no ambiente adequado.
- Massa de demonstração revisada e livre de dados pessoais ou financeiros reais.
- Auditoria e histórico de execução habilitados para os fluxos demonstrados.

### Proteção de informações técnicas

Não incluir em documentos, capturas de tela, vídeos ou apresentações:

- Senhas, tokens, chaves de API, certificados ou chaves privadas.
- Referências completas de credenciais de integrações.
- URLs privadas de serviços, bancos de dados ou armazenamento de arquivos.
- Variáveis de ambiente, cabeçalhos de autenticação ou conteúdo de logs técnicos sensíveis.
- Dados pessoais reais, contas bancárias reais ou documentos de cidadãos.

---

## 4. Segurança e Gerenciamento de Perfis

### Controle de acesso

- Login individual por usuário.
- Sessão autenticada e rotas protegidas.
- Perfis ativos ou inativos conforme a política da instituição.
- Permissões por módulo para visualizar, criar, alterar e excluir.
- Restrição de operações financeiras por unidade gestora autorizada.
- Bloqueio de módulos inativos, inclusive para acesso direto por rota.
- Auditoria de login, logout, navegação, interação, envio de formulário, download e exportação.

### Estrutura de perfis

Cada perfil pode receber uma combinação de permissões conforme a responsabilidade do usuário:

| Perfil de referência | Atribuições recomendadas |
|---|---|
| Administrador da Instância | Configura módulos, perfis, usuários, workflows, integrações e auditoria. |
| Gestor Financeiro | Consulta e acompanha orçamento, tesouraria, receitas, despesas e relatórios. |
| Tesouraria | Opera contas bancárias, transferências, extratos, aplicações, rendimentos e conciliações. |
| Contabilidade | Consulta e registra rotinas contábeis, eventos, fechamentos, razão e balancete. |
| Operador de Receita | Trabalha lançamentos, arrecadações, regras constitucionais e pendências de classificação. |
| Auditor ou Controle Interno | Consulta evidências, relatórios e trilhas de auditoria conforme escopo autorizado. |

### Boas práticas de segregação

- Separar quem solicita, aprova, contabiliza e executa pagamentos quando o fluxo exigir.
- Restringir alterações de configuração a administradores autorizados.
- Limitar o acesso à auditoria completa a perfis administrativos autorizados.
- Associar usuários financeiros somente às unidades gestoras em que podem atuar.
- Utilizar contas individuais, nunca compartilhadas, para apresentações e operação.

<!-- IMAGEM SUGERIDA: tela de Perfis de Acesso mostrando matriz de permissões, com dados de usuários ocultos. -->

---

## 5. Módulo Administração Geral

### Finalidade

O módulo Administração Geral forma a base institucional utilizada pelos demais módulos. Ele representa a estrutura da prefeitura e oferece cadastros de referência para alocação de responsabilidades, setores e demandas.

### Funcionalidades

- Cadastro de dados institucionais da entidade.
- Cadastro de secretarias e departamentos.
- Cadastro de unidades administrativas.
- Cadastro de cargos e funções.
- Cadastro e manutenção de servidores.
- Registro de demandas internas com setor, responsável, prioridade e situação.
- Calendário administrativo.
- Painel com indicadores da estrutura organizacional.

### Relação com o Financeiro

- Secretarias e departamentos apoiam a identificação de responsáveis e áreas demandantes.
- Unidades administrativas e servidores podem ser utilizados como referência nos fluxos operacionais.
- A estrutura institucional apoia a organização de perfis, responsabilidades e documentos.

### Sugestões de imagens

| Tela | O que destacar |
|---|---|
| Painel Administrativo | Indicadores gerais e navegação administrativa. |
| Secretarias | Estrutura de áreas da instituição. |
| Unidades Administrativas | Organização territorial ou operacional das unidades. |
| Servidores | Cadastro funcional sem exibir CPF, e-mail ou dados pessoais. |
| Demandas Internas | Fluxo de solicitação, responsável e status. |

---

## 6. Módulo Financeiro e Contábil

### Finalidade

O módulo Financeiro e Contábil reúne o ciclo de planejamento, execução orçamentária, receita, despesa, tesouraria, bancos, contabilidade e relatórios internos.

### 6.1 Painel Financeiro

- Visão de receitas, despesas e resultado operacional.
- Filtros por período.
- Atalhos para os grupos de funções financeiras.
- Indicadores para acompanhamento gerencial.

<!-- IMAGEM SUGERIDA: Painel Financeiro com indicadores e filtros de período. -->

### 6.2 Planejamento e Orçamento

- Planejamento orçamentário com referências a PPA, LDO e LOA.
- Cadastros orçamentários de apoio.
- Dotações orçamentárias e reservas.
- Solicitações de despesa e fluxo de aprovação.
- Créditos adicionais e programação financeira.
- Rastreabilidade entre planejamento, dotação e execução.

### 6.3 Execução da Despesa

- Emissão e acompanhamento de empenhos.
- Liquidações com documentos de suporte.
- Pagamentos vinculados à liquidação e à conta bancária.
- Retenções, recolhimentos e estornos conforme as regras do fluxo.
- Gestão de restos a pagar.
- Documentos financeiros internos vinculados aos fatos da execução.

### 6.4 Receitas

- Lançamento e arrecadação de receitas.
- Estorno de receita e redistribuição por fonte de recurso.
- Regras de classificação de receitas constitucionais e legais.
- Identificação de itens pendentes e fila de exceções.
- Vínculo de receita com movimento de tesouraria, evento contábil, recibo e auditoria.

### 6.5 Contas Bancárias e Tesouraria

- Cadastro de contas com banco, agência, número, tipo, unidade gestora, fonte e conta analítica.
- Coluna de finalidade para explicar a destinação operacional de cada conta, por exemplo arrecadação, recursos livres, educação, saúde, assistência social, cultura, convênios e aplicações.
- Saldos calculados a partir dos movimentos de tesouraria confirmados.
- Transferências entre contas com movimentos correspondentes de origem e destino.
- Controle de saldos iniciais auditáveis para cenários de conciliação e operação.

### 6.6 Extratos, Automações e Integração Bancária

- Download de extratos por conta e período.
- Arquivamento privado do arquivo obtido.
- Registro de formato, período, hash de integridade, solicitante e histórico da execução.
- Deduplicação de itens por identificador externo.
- Histórico de sucesso, falha e reprocessamento controlado.
- Monitoramento de automações e execuções de integração.

### 6.7 Aplicações, Resgates e Rendimentos

- Identificação de aplicações e resgates a partir dos itens de extrato.
- Cálculo de bruto, encargos, líquido e prévia contábil.
- Registro de transferências pareadas entre conta corrente e conta de aplicação.
- Emissão de recibo e vínculo ao lançamento bancário.
- Cálculo e registro de rendimentos, IRRF, IOF, correção e saldo acumulado.
- Prevenção de duplicidade por item bancário e chave de idempotência.

### 6.8 Conciliação Bancária

- Abertura de sessão por banco, agência, conta e período.
- Carga de saldo inicial, créditos, débitos, saldo final e razão bancário.
- Correspondência automática e conferência de itens pendentes.
- Exibição de divergências entre banco e registros internos.
- Bloqueio de confirmação enquanto existirem pendências ou diferenças.
- Confirmação com recibo, hash e trilha de auditoria.

### 6.9 Contabilidade e Relatórios

- Plano de contas e eventos de contabilização.
- Partidas contábeis vinculadas aos fatos financeiros configurados.
- Rotinas de fechamento mensal e anual com controles de status e evidência.
- Diário, razão, balancete, relatórios de tesouraria e relatórios de conciliação.
- Exportações internas em CSV e PDF conforme a funcionalidade.

> **Limite de comunicação:** relatórios internos não devem ser apresentados como leiautes oficiais homologados de TCE, STN, SICONFI ou outro órgão de controle sem validação específica do leiaute aplicável.

### Sugestões de imagens financeiras

| Ordem | Tela | Objetivo da captura |
|---:|---|---|
| 1 | Painel Financeiro | Mostrar a visão consolidada. |
| 2 | Planejamento Orçamentário | Mostrar a cadeia de planejamento. |
| 3 | Empenhos ou Liquidações | Demonstrar a execução da despesa. |
| 4 | Contas Bancárias | Destacar a coluna Finalidade e a segregação das 24 contas. |
| 5 | Extratos Bancários | Exibir período, status e histórico sem arquivo sensível aberto. |
| 6 | Monitoramento de Automações | Mostrar acompanhamento de execução e falhas controladas. |
| 7 | Resgates e Aplicações | Demonstrar classificação e recibo. |
| 8 | Rendimentos de Aplicações | Mostrar cálculo e registro. |
| 9 | Regras Constitucionais | Mostrar regra, conta vinculada, natureza e fonte. |
| 10 | Conciliação Bancária | Mostrar saldos, correspondências e status. |
| 11 | Contabilidade e Fechamento | Mostrar eventos, período e situação de fechamento. |
| 12 | Relatórios Financeiros | Mostrar catálogo de relatórios internos. |

---

## 7. Módulo Tributário

### Finalidade

O módulo Tributário reúne rotinas cadastrais e operacionais relacionadas a contribuintes, imóveis, atividades econômicas, guias, arrecadação, dívida ativa, certidões e fiscalização.

### Funcionalidades

- Cadastro econômico e inscrição municipal.
- Cadastro de imóveis e referências para IPTU.
- Alvarás, licenças e certidões.
- NFS-e, guias e registros de arrecadação internos.
- Dívida ativa, inscrição, situação e acompanhamento.
- Fiscalização, infrações e auto de infração interno.
- Cruzamentos e verificações de apoio à auditoria tributária.
- Operações para parâmetros tributários, serviços, declarações e solicitações vinculáveis a processos e documentos.

### Relação com o Financeiro

- Registros tributários podem subsidiar lançamentos e arrecadações.
- Guias e eventos tributários podem manter vínculos com documentos e processos.
- A receita arrecadada é organizada por natureza e fonte conforme a configuração financeira.

> **Limite de comunicação:** conectores de NFS-e, PIX, boleto ou instituições financeiras dependem de adaptador, contratação e homologação. Uma guia interna não deve ser apresentada como boleto bancário, DAM oficial ou cobrança PIX oficial sem integração homologada.

<!-- IMAGEM SUGERIDA: painel Tributário e tela de Guias ou Fiscalização, utilizando dados fictícios. -->

---

## 8. GED e Gestão de Documentos

### Finalidade

O GED apoia a organização e a rastreabilidade documental da instituição, permitindo relacionar evidências aos fluxos administrativos, financeiros e tributários.

### Funcionalidades

- Organização de documentos em pastas e subpastas.
- Upload de documentos, planilhas, imagens e arquivos compactados, conforme regras de formato e tamanho.
- Consulta de documentos recentes e modelos documentais.
- Download protegido e auditado.
- Vínculo de documentos a processos, solicitações, empenhos, liquidações e demais registros.
- Controle de versões e situação documental.
- Assinatura eletrônica interna com reautenticação, hash de integridade, código de verificação e bloqueio da versão assinada.

### Cuidados de apresentação

- Use documentos fictícios e nomes genéricos nas capturas.
- Não abra arquivos com dados pessoais, dados bancários ou informações contratuais reais.
- Não apresentar a assinatura interna como certificado ICP-Brasil ou assinatura digital externa.

<!-- IMAGEM SUGERIDA: tela GED com estrutura de pastas e tela de Assinaturas com informações fictícias. -->

---

## 9. Módulo Configurações

### Finalidade

O módulo Configurações centraliza a administração da instância, módulos, perfis, usuários, processos, integrações e auditoria.

### Funcionalidades

- Dados e identificação da instância.
- Ativação e bloqueio de módulos do sistema.
- Cadastro de perfis e matriz de permissões.
- Cadastro de usuários e vínculos com perfis, servidor e unidades gestoras.
- Configuração de workflows, assuntos, setores, prioridades, SLA e etapas de processos.
- Catálogo de conexões e integrações externas.
- Definição de ambiente de integração e parâmetros não sensíveis.
- Consulta de auditoria de uso e operações.

### Integrações e credenciais

- A conexão deve identificar código, categoria, fornecedor, ambiente e situação.
- Credenciais devem ser referenciadas por mecanismo seguro de ambiente ou cofre de segredos.
- A tela de configuração não deve receber nem exibir senha, token, chave privada, certificado ou segredo de cliente.
- O teste de conectividade deve ser executado somente com a configuração autorizada para o ambiente.

### Auditoria de uso

Os registros de auditoria podem evidenciar, conforme a permissão do perfil:

- Usuário responsável.
- Data e hora.
- Rota ou funcionalidade acessada.
- Ação executada.
- Entidade relacionada.
- Resultado da operação.

O objetivo é registrar a operação sem expor conteúdo sensível de campos de formulário ou credenciais.

<!-- IMAGEM SUGERIDA: telas de Módulos, Perfis, Integrações e Auditoria de Uso, com nomes e identificadores saneados. -->

---

## 10. Roteiro Resumido para Apresentação

1. Apresentar a Home e contextualizar os módulos ativos.
2. Demonstrar Administração como base institucional.
3. Abrir Configurações e explicar módulos, perfis, usuários e auditoria.
4. Entrar no Financeiro e apresentar o painel.
5. Mostrar planejamento, execução da despesa e receitas.
6. Abrir Contas Bancárias e explicar a finalidade de cada grupo de conta.
7. Demonstrar extratos, automações, aplicações/resgates, rendimentos e regras constitucionais.
8. Demonstrar conciliação, contabilidade e relatórios internos.
9. Apresentar Tributário como fonte de cadastros e eventos de receita.
10. Encerrar no GED, evidenciando documentos vinculados e rastreabilidade.

### Checklist antes de gravar ou apresentar

- [ ] Navegação testada com o perfil que será usado.
- [ ] Ambiente, URL e versão identificados.
- [ ] Dados fictícios revisados.
- [ ] Contas bancárias e finalidades visíveis e coerentes.
- [ ] Integração exibida apenas no ambiente autorizado.
- [ ] Nenhuma senha, token, chave, URL privada ou dado pessoal exposto.
- [ ] Capturas de tela organizadas na mesma sequência do roteiro.
- [ ] Relatórios identificados como internos quando não houver homologação oficial declarada.

---

## 11. Cadastros Corporativos

### Finalidade

O módulo Cadastros reúne registros mestres utilizados por diferentes áreas da solução. Sua função é reduzir duplicidade de informações e oferecer referências consistentes para fornecedores, cidadãos, empresas, imóveis e documentos vinculados.

### Funcionalidades

- Cadastro de pessoas físicas.
- Cadastro de pessoas jurídicas.
- Cadastro e consulta de fornecedores.
- Cadastro de imóveis.
- Consulta de documentos vinculados aos cadastros.
- Organização de informações que podem ser relacionadas a processos, tributação, compras, patrimônio e atendimento.

### Cuidados de apresentação

- Usar apenas registros fictícios ou previamente anonimizados.
- Não exibir CPF, CNPJ, endereços residenciais, telefones ou documentos pessoais reais.
- Demonstrar a busca e os vínculos documentais sem abrir anexos sensíveis.

<!-- IMAGEM SUGERIDA: tela de Cadastros com a busca de pessoas, empresas, fornecedores e imóveis, usando dados de demonstração. -->

---

## 12. Protocolos e Processos Digitais

### Finalidade

O módulo Protocolos e Processos organiza a tramitação digital de processos administrativos, desde a abertura até o arquivamento, mantendo responsáveis, prazos, interações, documentos e assinaturas relacionados.

### Funcionalidades

- Abertura e numeração de processos.
- Encaminhamento entre setores e responsáveis.
- Acompanhamento de etapa, prazo, prioridade e situação.
- Central de notificações.
- Busca por dados do processo e acompanhamento histórico.
- Arquivamento de processos concluídos.
- Relatórios operacionais de processos.
- Assinaturas internas relacionadas ao fluxo documental.

### Integração com outros módulos

- Solicitações de compra, documentos, demandas e atendimentos podem utilizar o processo como eixo de tramitação.
- O GED armazena evidências e arquivos associados às etapas.
- Workflows, assuntos, setores, prioridades e SLA são parametrizados em Configurações.

> **Nota de comunicação:** a rota funcional de processos é o módulo Protocolos. Uma rota genérica de processos em evolução não deve ser demonstrada como fluxo operacional concluído.

<!-- IMAGEM SUGERIDA: processo aberto com linha do tempo, movimentação entre setores e documentos vinculados. -->

---

## 13. Atendimento e Ouvidoria

### Finalidade

O módulo Atendimento e Ouvidoria centraliza solicitações de cidadãos e equipes internas, permitindo registrar demanda, encaminhar o caso, acompanhar prazos e manter o histórico de interações.

### Funcionalidades

- Abertura de novo atendimento.
- Central de atendimentos e fila de trabalho.
- Encaminhamento para setor ou responsável.
- Classificação por assunto, prioridade, status e SLA.
- Histórico de interações, respostas e anexos.
- Registro e acompanhamento de manifestações de ouvidoria.
- Configurações operacionais e relatórios agregados protegidos por perfil.

### Valor para a gestão

- Dá visibilidade à fila de solicitações.
- Organiza responsabilidades e prazos de resposta.
- Mantém evidências do atendimento prestado.
- Apoia a identificação de temas recorrentes e gargalos operacionais.

<!-- IMAGEM SUGERIDA: central de atendimento com filtros, status, responsável e indicador de SLA, sem dados de cidadãos. -->

---

## 14. Compras, Licitações e Contratos

### Finalidade

O módulo Compras e Contratos apoia o ciclo de aquisição pública, desde a solicitação interna até a gestão de processos, contratações e instrumentos contratuais.

### Funcionalidades

- Solicitações de compra e demanda.
- Processos de aquisição.
- Licitações.
- Dispensas e contratações diretas.
- Cadastro e acompanhamento de contratos.
- Catálogo de itens e serviços.
- Vínculo de documentos e processos às etapas de contratação.

### Relação com o Financeiro e Transparência

- Solicitações e processos podem subsidiar a execução da despesa.
- Licitações e contratos publicados podem compor a base divulgada no Portal da Transparência.
- Documentos de contratação podem ser organizados pelo GED e vinculados ao processo correspondente.

> **Limite de comunicação:** publicação em sistemas externos de contratação depende de conector, credencial, ambiente e homologação específicos. Não apresentar o catálogo de integração como transmissão externa efetivada sem evidência da execução autorizada.

<!-- IMAGEM SUGERIDA: fluxo de solicitação de compra até contrato, com etapas e documentos vinculados. -->

---

## 15. RH e Folha de Pagamento

### Finalidade

O módulo RH e Folha concentra informações funcionais e rotinas de pessoas para apoiar a gestão de servidores e eventos de folha.

### Funcionalidades

- Cadastro de servidores e dependentes.
- Gestão de competências de folha e eventos.
- Benefícios.
- Controle de ponto.
- Férias e licenças.
- Registro de atos de pessoal.
- Consulta de dados funcionais conforme o perfil autorizado.

### Boas práticas

- Restringir o módulo a perfis de RH, gestão e controle autorizados.
- Minimizar a exibição de dados pessoais em dashboards e capturas de tela.
- Definir responsabilidades distintas para cadastro, conferência e processamento de folha.

<!-- IMAGEM SUGERIDA: painel de RH, calendário de férias ou lista de eventos de folha com dados fictícios. -->

---

## 16. Patrimônio e Almoxarifado

### Finalidade

O módulo Patrimônio e Almoxarifado apoia o controle de bens permanentes, materiais de consumo e movimentações internas de estoque.

### Funcionalidades

- Cadastro de bens patrimoniais.
- Cadastro de almoxarifados e materiais.
- Inventários.
- Requisições internas de materiais.
- Registro de eventos do ciclo de vida patrimonial.
- Consulta da situação de bens e movimentações de estoque.

### Relação com outros módulos

- Itens e fornecedores podem ser referenciados a partir de Cadastros e Compras.
- Documentos de recebimento, inventário e movimentação podem ser vinculados ao GED.
- Requisições e demandas podem tramitar por Protocolos.

> **Nota de apresentação:** demonstrar apenas rotas disponíveis no ambiente. Links de navegação para manutenção ou transferências não devem ser apresentados como telas prontas se a rota correspondente não estiver publicada.

<!-- IMAGEM SUGERIDA: lista de bens, posição de estoque ou inventário com quantidades de demonstração. -->

---

## 17. Educação

### Finalidade

O módulo Educação organiza informações operacionais da rede municipal de ensino e apoia o acompanhamento de unidades, matrículas, profissionais e serviços associados.

### Funcionalidades

- Cadastro de escolas e unidades da rede.
- Matrículas e referências de turmas.
- Cadastro de professores.
- Calendário escolar.
- Gestão de merenda escolar.
- Gestão de transporte escolar.

### Uso recomendado

- Apresentar indicadores e cadastros com massa fictícia.
- Controlar perfis para limitar a visualização de dados de estudantes.
- Relacionar documentos administrativos e processos quando necessário.

<!-- IMAGEM SUGERIDA: painel Educação e telas de escolas, matrículas ou transporte escolar. -->

---

## 18. Saúde

### Finalidade

O módulo Saúde reúne telas de apoio à gestão de unidades, equipes, atendimentos e ações de saúde do município.

### Funcionalidades

- Cadastro de unidades de saúde.
- Cadastros de pacientes, profissionais e equipes.
- Agenda e atendimentos.
- Controle de farmácia.
- Vacinação.
- Telas de relatórios de saúde.
- Área de referências para rotinas relacionadas ao e-SUS.

### Proteção de dados

- Dados de saúde são sensíveis e devem ser exibidos somente a perfis autorizados.
- Apresentações devem utilizar registros fictícios, sem prontuários, diagnósticos ou identificadores reais.
- Relatórios devem ser apresentados em formato agregado sempre que possível.

> **Limite de comunicação:** não apresentar geração, transmissão ou integração com e-SUS como concluída sem validação da operação no ambiente contratado. A tela de relatórios encontra-se em evolução.

<!-- IMAGEM SUGERIDA: painel Saúde ou agenda de atendimentos, com pacientes e profissionais fictícios. -->

---

## 19. Assistência Social

### Finalidade

O módulo Assistência Social apoia a organização de unidades, famílias, atendimentos, benefícios e visitas no contexto da rede socioassistencial.

### Funcionalidades

- Cadastro de unidades socioassistenciais.
- Cadastro e acompanhamento de famílias.
- Prontuário de atendimento.
- Benefícios.
- Atendimentos e visitas.
- Organização de informações de referência para CRAS e CREAS.

### Proteção de dados

- O acesso deve ser limitado a equipes e gestores autorizados.
- Registros de famílias e prontuários não devem ser expostos em apresentações.
- Usar dados de demonstração e indicadores agregados.

> **Limite de comunicação:** os contadores da tela inicial de Assistência Social são ilustrativos no ambiente de demonstração e não devem ser apresentados como dados municipais apurados em tempo real.

<!-- IMAGEM SUGERIDA: painel Assistência Social com indicadores fictícios e lista de unidades. -->

---

## 20. Meio Ambiente

### Finalidade

O módulo Meio Ambiente organiza rotinas de licenciamento, fiscalização, solicitações e gestão de informações ambientais municipais.

### Funcionalidades

- Cadastro de empreendimentos.
- Licenciamento ambiental.
- Solicitações e denúncias.
- Fiscalização ambiental.
- Gestão de áreas verdes.
- Gestão de resíduos.
- Campanhas e educação ambiental.
- Documentos vinculados às ocorrências e processos.

<!-- IMAGEM SUGERIDA: painel Meio Ambiente com licenças, denúncias ou áreas verdes usando dados fictícios. -->

---

## 21. Água e Saneamento

### Finalidade

O módulo Água e Saneamento apoia a gestão de unidades consumidoras, medição, faturamento, serviços e indicadores de qualidade.

### Funcionalidades

- Cadastro de unidades consumidoras e referências de medição.
- Leituras e acompanhamento de consumo.
- Faturas e rotinas de faturamento.
- Ordens e solicitações de serviço.
- Controle de qualidade de água e saneamento.
- Relatórios operacionais.
- Área de portal para o consumidor.
- Cadastros de apoio à operação.

### Cuidados de apresentação

- Utilizar números fictícios de consumo, faturas e unidades.
- Não expor dados de clientes, leituras associadas a endereços ou valores reais de cobrança.

<!-- IMAGEM SUGERIDA: leituras, faturamento ou qualidade da água com unidades consumidoras fictícias. -->

---

## 22. Obras e Serviços Urbanos

### Finalidade

O módulo Obras e Serviços apoia o planejamento e acompanhamento de obras públicas, serviços urbanos, equipes e ativos operacionais.

### Funcionalidades

- Obras e projetos.
- Fiscalização e medições.
- Serviços urbanos.
- Iluminação pública e energia.
- Ordens de serviço.
- Máquinas e equipes.
- Documentos e relatórios de apoio.

### Integração operacional

- Obras e ordens de serviço podem ser relacionadas a processos, documentos, demandas e contratos.
- Medições e evidências podem ser armazenadas e consultadas junto ao ciclo operacional.

<!-- IMAGEM SUGERIDA: painel de Obras, ordem de serviço ou acompanhamento de medição de obra. -->

---

## 23. Cultura, Esporte e Lazer

### Finalidade

O módulo Cultura, Esporte e Lazer centraliza cadastros, projetos, espaços, eventos e estruturas de participação social das áreas cultural e esportiva.

### Funcionalidades

- Gestão cultural.
- Agentes e espaços culturais.
- Fomento e projetos.
- Esporte e lazer.
- Reservas de espaços.
- Eventos.
- Conselhos e fundos.
- Documentos associados.

<!-- IMAGEM SUGERIDA: agenda de eventos, reserva de espaço ou projeto cultural fictício. -->

---

## 24. Segurança e Mobilidade

### Finalidade

O módulo Segurança e Mobilidade apoia registros operacionais ligados à guarda municipal, defesa civil, trânsito, mobilidade e equipes em campo.

### Funcionalidades

- Cadastro e acompanhamento de guardas e equipes.
- Registro de ocorrências.
- Rondas e pontos de apoio ou monitoramento.
- Defesa civil.
- Trânsito e infrações.
- Rotas e informações de mobilidade.
- Ordens, ativos e documentos operacionais.

### Proteção de informações

- Informações de ocorrências, agentes e rotas operacionais exigem perfil autorizado.
- Apresentações devem usar dados fictícios e evitar localização em tempo real, dados de vítimas ou detalhes operacionais sensíveis.

<!-- IMAGEM SUGERIDA: painel de Segurança e Mobilidade com ocorrências fictícias e dados agregados. -->

---

## 25. Câmara Municipal

### Finalidade

O módulo Câmara Municipal apoia a organização de informações legislativas e a publicação de conteúdos relacionados à atividade parlamentar.

### Funcionalidades

- Legislaturas.
- Vereadores.
- Comissões.
- Sessões.
- Proposições.
- Leis e atos.
- Audiências públicas.
- Portal legislativo.

### Valor para a gestão pública

- Centraliza o ciclo básico de informação legislativa.
- Facilita a organização de documentos, atos e referências públicas.
- Apoia a transparência das atividades da Câmara dentro do escopo configurado.

<!-- IMAGEM SUGERIDA: painel da Câmara ou lista de proposições e sessões com dados fictícios. -->

---

## 26. Transparência e Portal Público

### Finalidade

O CeleriFlow possui uma área administrativa para preparar publicações e um Portal da Transparência público para consulta sem login, dentro do conjunto de informações disponibilizadas para publicação.

### Back office de Transparência

- Notícias.
- Diário oficial.
- Páginas institucionais.
- Banners.
- Licitações.
- Contratos.

### Portal da Transparência público

- Consulta filtrável de despesas e receitas publicadas.
- Consulta de licitações e contratos publicados.
- Consulta de relatórios legais versionados quando disponibilizados.
- Exportação dos conjuntos publicados em CSV.
- Proteção de dados pessoais, com mascaramento de documentos de fornecedores e exclusão de informações pessoais da entrega pública.

### Cuidados de comunicação

- A publicação pública deve seguir validação administrativa e normativa da instituição.
- O portal disponibiliza o subconjunto publicado; não afirmar cobertura integral de dados sem validação do escopo de publicação.
- A entrega atual de exportação é CSV. Não prometer PDF ou TXT para o portal público sem implementação e validação correspondentes.
- Não apresentar dados de POC ou números de material institucional como indicadores oficiais em tempo real.

<!-- IMAGEM SUGERIDA: Portal da Transparência com filtros de despesas ou receitas e dados demonstrativos. -->

---

## 27. Indicadores e Governança

### Finalidade

A área de Indicadores está prevista para concentrar painéis executivos e informações de governança.

### Estado atual

- A rota está disponível como referência de navegação.
- A tela informa que os painéis estão em construção.
- Não deve ser apresentada como módulo de BI operacionalmente concluído até que os painéis sejam disponibilizados e validados.

---

## 28. Integrações e Serviços Externos

### Abordagem de integração

O CeleriFlow dispõe de catálogo de conexões para registrar fornecedor, categoria, ambiente, estado e referência segura de credencial. A operação externa depende da configuração técnica autorizada para cada instituição.

### Categorias previstas no catálogo

- Integrações financeiras e bancárias.
- PIX e cobrança.
- Publicações e obrigações relacionadas a órgãos de controle.
- eSocial e EFD-Reinf.
- Nota Fiscal de Serviço eletrônica.
- Comunicação por canais como WhatsApp.
- Assinatura digital e ICP-Brasil.

### Regras de comunicação comercial e técnica

- Ambiente Mock: valida comportamento sem conectar a serviço externo.
- Ambiente Sandbox: demonstra integração controlada com dados de teste.
- Homologação e Produção: exigem configuração, credenciais, segurança e aceite do fornecedor ou órgão integrado.
- O executor mock não realiza conexão externa; portanto, não deve ser usado como evidência de transmissão real.
- Assinatura ICP-Brasil com certificado A1 requer cadeia, certificado e chave configurados fora do código-fonte. Sem essa configuração, a assinatura não deve ser apresentada como disponível.
- Credenciais, certificados e tokens nunca devem aparecer em telas, imagens, documentos ou gravações.

---

## 29. Matriz de Navegação para Catálogo Visual

| Grupo | Módulos a representar em menu, mapa ou infográfico |
|---|---|
| Base Institucional | Administração, Cadastros, Protocolos e Processos, GED, Atendimento e Ouvidoria. |
| Gestão Fiscal | Financeiro e Contábil, Tributação, Compras e Contratos, RH e Folha, Patrimônio e Almoxarifado. |
| Políticas Públicas | Educação, Saúde, Assistência Social, Meio Ambiente, Água e Saneamento, Obras e Serviços, Cultura, Esporte e Lazer, Segurança e Mobilidade. |
| Governança e Publicação | Transparência, Portal da Transparência, Câmara Municipal, Configurações, Auditoria e Indicadores. |

### Ordem recomendada de captura de telas

1. Home ou Dashboard autenticado, mostrando os cartões de módulos habilitados.
2. Administração e Cadastros como fundação institucional.
3. Protocolos, Atendimento e GED como fluxo de relacionamento e documento.
4. Financeiro, Tributação, Compras, RH e Patrimônio como gestão corporativa.
5. Módulos setoriais em sequência visual uniforme.
6. Transparência e Portal Público como resultado de publicação.
7. Configurações, Perfis, Integrações e Auditoria como camada de governança.

---

## 30. Declaração de Escopo para Materiais Comerciais

Utilizar a seguinte orientação ao adaptar este catálogo para propostas, apresentações ou vídeos:

> O CeleriFlow disponibiliza módulos integrados para gestão municipal. A disponibilidade de cada recurso depende da contratação, ativação do módulo, configuração da instância, permissões do usuário e, para integrações externas, da homologação técnica e institucional aplicável. Dados, indicadores e integrações exibidos em ambientes de demonstração devem ser tratados como ilustrativos quando não houver comprovação de operação em produção.
