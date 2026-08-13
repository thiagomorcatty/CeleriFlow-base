# Checklist estrito da Prova de Conceito - Pinhal da Serra/RS

**Pregão Eletrônico nº 27/2026 - Processo Administrativo nº 573/2026**

## Critério usado

- O item **10.7** do edital define a POC como demonstração prática das funcionalidades do sistema ofertado, para comprovar o atendimento integral aos requisitos funcionais, técnicos e operacionais do Termo de Referência.
- O item **10.7.2** determina avaliação por checklist objetivo do Termo de Referência ou de anexo próprio e verificação do atendimento de cada funcionalidade exigida.
- Nos documentos disponibilizados não há um anexo separado reduzindo ou selecionando funcionalidades para a POC. Por isso, este checklist reproduz, na ordem do documento, os requisitos da solução constantes no **Anexo I - Relação dos Itens da Licitação**, sem acrescentar funcionalidades externas.
- Os textos foram mantidos conforme o edital, inclusive erros, repetições, saltos de numeração e trechos interrompidos na origem.
- As obrigações de execução futura sobre migração, implantação, capacitação, hospedagem, suporte e manutenção (itens 1.4 a 1.8) não foram transformadas em funcionalidades de tela. O arquivo separa apenas os requisitos gerais de funcionamento da solução e as funcionalidades dos itens do Anexo I.

**Quantidade organizada neste arquivo:** 3.684 requisitos principais/sem numeração e 295 subrequisitos numerados, além de 53 requisitos gerais de tecnologia, segurança e capacidade.

> **Atenção:** se o Município encaminhar posteriormente um checklist próprio da POC, esse documento posterior deverá ser confrontado com esta relação.

## Legenda de uso interno

- `[ ]` Requisito ainda não validado na preparação da POC.
- `[x]` Requisito já validado/demonstrável.

---

## A. Requisitos gerais de tecnologia e segurança da solução

Fonte: edital, itens **1.9.1 a 1.9.52** e **1.12**. Estes requisitos não pertencem a um módulo isolado, mas descrevem capacidades técnicas gerais dos sistemas.

- [ ] **1.9.1.** Utilizar protocolo HTTPS para navegação na internet, garantido a segurança das informações tramitadas
      através de criptografia. E deverá ser compatível com, pelo menos, os principais navegadores disponíveis no
      mercado, tais como Firefox, Chrome, Safari, além de rodar nos ambientes Windows, Linux, MAC OS;

- [ ] **1.9.2.** Garantir a integração e unificação das informações. Sendo possível optar pela não integração entre
      cadastros, permitindo também a indicação, pelo administrador do sistema, quais usuários poderão decidir quanto à
      integração entre os sistemas;

- [ ] **1.9.3.** Possuir a opção de geração de pendências cadastrais na integração das informações, para que haja a
      validação de regras de negócio antes de sua integração, garantindo que apenas informações em conformidade sejam
      aceitas e aplicadas ao sistema;

- [ ] **1.9.4.** Permitir a geração de relatórios dos dados armazenados em todas as aplicações de forma estruturada
      com opções de exportação em PDF, XLS, DOC, ODS, ODT, CSV, TXT, HTML e XML;

- [ ] **1.9.5.** Permitir que os relatórios solicitados sejam executados em segundo plano, possibilitando ao usuário a
      execução de outras rotinas do sistema enquanto o relatório é gerado. Assim que gerado, o sistema emitirá
      notificação em tela com a opção de abertura automática;

- [ ] **1.9.6.** Possuir atalho na execução para validador de documentos, onde exiba o autor da geração do relatório,
      a versão, o status, a hora, a data, quanto demorou durou a geração do relatório por fase, como exemplo:
      Solicitado, Aguardando Execução, Executando e Concluído, assim como os eventos, o contexto e as métricas;

- [ ] **1.9.7.** Permitir a utilização de elementos visuais no layout dos relatórios, como: textos, imagens, linhas,
      quadrados, retângulos, círculos, códigos de barra, códigos QR e gráficos;

- [ ] **1.9.8.** Permitir a customização de relatórios podendo definir o layout dos seus parâmetros, e atualizá-los
      livremente, podendo adicionar por tipo de dado em pelo menos: Arquivo, caractere, data, data e hora, inteiro,
      lista múltipla, lista simples, mês/ano, senha e valor, definindo se será obrigatório ou não, adicionando dica de
      preenchimento, nome e descrição;

- [ ] **1.9.9.** Possuir “help on-line”, para esclarecimento de dúvidas sem necessidade de abertura de chamado
      técnico;

- [ ] **1.9.10.** Oferecer total segurança contra a violação dos dados ou acessos indevidos às informações. Essa
      segurança deve ser aplicada em camadas que vão desde validações no lado cliente com o controle de acesso às
      funcionalidades, passado pelo canal de comunicação com o uso de protocolos seguros;

- [ ] **1.9.11.** Possuir recursos de segurança no SGBD para impedir que usuários não autorizados obtenham êxito em
      acessar a base de dados para efetuar consulta, alteração, impressão ou cópia;

- [ ] **1.9.12.** Objetivando atender a regras impostas pela LGPD (Lei Geral de Proteção de Dados), os sistemas devem,
      no mínimo: Permitir acesso apenas por usuários devidamente cadastrados, que disponham de usuário e senha;
      Permitir a definição do Encarregado de Dados (DPO), com informação dos dados necessários para realização de
      contato no Portal da Transparência.

- [ ] **1.9.13.** Dispor de integração com o sistema do executivo, seguindo as obrigações e condições do decreto nº
      10.540 (Sistema Único e Integrado de Execução Orçamentária, Administração Financeira e Controle – SIAFIC);

- [ ] **1.9.14.** Permitir a criação de usuário para acessar os sistemas de forma unificada, podendo este usuário ser
      vinculado a qualquer entidade do município e até mesmo a entidades de municípios diferentes se houver a
      necessidade;

- [ ] **1.9.15.** Permitir efetuar o login no sistema com as seguintes opções: nome de usuário, e-mail e telefone,
      juntamente com a senha pessoal;

- [ ] **1.9.16.** Permitir um usuário logar através do serviço do Google, Facebook, Linkedin e e-CPF;

- [ ] **1.9.17.** Caso o município esteja homologado com a plataforma Gov.BR, o sistema deverá permitir a integração
      com Gov.br para seus usuários para login;

- [ ] **1.9.18.** Disponibilizar mecanismo de autenticação multifator (MFA), garantindo uma camada adicional de
      segurança no acesso ao sistema;

- [ ] **1.9.19.** Possuir teclado virtual na tela de login do sistema para maior segurança;

- [ ] **1.9.20.** Possuir certificação validado por empresa terceira, que garanta a segurança para o login;

- [ ] **1.9.21.** Oferecer uma API pública segura e escalável para integração com sistemas de terceiros, garantindo
      autenticação, controle de acesso e suporte ao padrão REST. A autenticação deve ser compatível o protocolo de
      segurança OAuth 2.0;

- [ ] **1.9.22.** Permitir alternância entre sistemas e entidades, sem necessidade de novo login, possibilitando que,
      na mudança de entidades, o usuário seja automaticamente redirecionado para o mesmo exercício;

- [ ] **1.9.23.** Permitir o controle de acesso com o uso de senhas, contendo controle de permissões de acesso tanto
      por usuário quanto por grupo de usuários, com definição das permissões para alteração, inclusão, exclusão;

- [ ] **1.9.24.** Permitir um usuário conceder acesso a outro em um sistema, bem como a criação de um grupo com
      permissões específicas a um conjunto de funcionalidades;

- [ ] **1.9.25.** Permitir consultar o histórico de acessos concedidos, bem como consultar os usuários logados;

- [ ] **1.9.26.** Permitir configurar permissões para o suporte técnico, para que os representantes do suporte acessem
      os seus dados de forma segura sem uso de outro software de terceiros, quando necessário, para prestar serviços e
      encontrar soluções para problemas técnicos;

- [ ] **1.9.27.** Permitir definir restrições de acesso por horários de início e fim, dias da semana ou por endereço
      de IP, podendo ser selecionada uma faixa de IP pela máscara de sub-rede ou CIDR;

- [ ] **1.9.28.** Possibilitar a identificação do usuário que concedeu acesso a outro no sistema, bem como permitir a
      consulta dos termos de consentimento, tanto de quem concede o acesso, quanto de quem recebe o acesso;

- [ ] **1.9.29.** Permitir a configuração do encerramento de sessão por tempo de inatividade em 15 minutos, 20
      minutos, 25 minutos, 30 minutos, 45 minutos e 1 hora;

- [ ] **1.9.30.** Permitir ao usuário recuperar sua senha através do e-mail ou celular (SMS);

- [ ] **1.9.31.** Possibilitar que os administradores liberem e removam acesso ao sistema de qualquer usuário;

- [ ] **1.9.32.** Identificar quando o usuário acessou o sistema, bem como quando ele saiu do sistema;

- [ ] **1.9.33.** Nos principais cadastros dos sistemas, a auditoria deve estar presente. O sistema deve apresentar
      uma linha do tempo, diretamente no cadastro e sem acesso a novas telas, indicando o histórico de alterações;

- [ ] **1.9.34.** Na visualização dos registros de auditoria, deve-se exibir Criação, Alteração e Exclusão de dados;

- [ ] **1.9.35.** Permitir visualizar, consultar e executar todas as extensões disponíveis em um sistema;

- [ ] **1.9.36.** Permitir visualizar as execuções de extensões realizadas, com informações detalhadas relativas à
      mesma;

- [ ] **1.9.37.** Permitir visualizar as execuções recentes de uma extensão, bem como reaproveitar os artefatos
      gerados;

- [ ] **1.9.38.** Possuir um sistema de extensões modulares gerenciáveis, permitindo visualização, execução e
      monitoramento do desempenho das extensões, com indicadores de performance como APDEX;

- [ ] **1.9.39.** Permitir adicionar um agendamento para execução de uma extensão, informando parâmetros,
      recorrências, notificações e resumo, bem como visualizar todos os agendamentos relacionados, podendo editar,
      excluir ou desativar;

- [ ] **1.9.40.** Permitir salvar os parâmetros preenchidos para facilitar execuções de extensões futuras;

- [ ] **1.9.41.** Permitir visualizar todas as execuções públicas de extensões da entidade;

- [ ] **1.9.42.** Permitir realizar o cancelamento da execução de uma extensão;

- [ ] **1.9.43.** Permite gerenciar o compartilhamento de uma extensão com os usuários do sistema;

- [ ] **1.9.44.** Permitir gerenciar as variáveis de ambientes para ser usado em extensões;

- [ ] **1.9.45.** Permitir criação, edição, organização e exclusão de campos Complementares de forma dinâmica, sem
      necessidade de customização;

- [ ] **1.9.46.** Os campos complementares devem possibilitar minimamente os tipos: área de texto, CNPJ, CPF, data,
      data e hora, e-mail, hora, lista de seleção, múltipla seleção, numérico, telefone e texto, com a indicação do
      rótulo e texto de ajuda para preenchimento do campo;

- [ ] **1.9.47.** Permitir configurar a política para expiração de senhas, definindo por uma data específica ou por
      dias corridos;

- [ ] **1.9.48.** Permitir agendar o envio de relatórios para diversos usuários através de e-mail, sendo remetido pela
      própria plataforma, conforme período dinâmico definido na configuração;

- [ ] **1.9.49.** Impedir que o mesmo usuário efetue login em dois locais simultaneamente no sistema, aumentando assim
      a segurança;

- [ ] **1.9.50.** A solução deve possuir armazenamento de certificados digitais do tipo A1 em nuvem, permitindo ao
      usuário, de forma segura, executar assinaturas digitais de qualquer dispositivo sem necessidade de token físico;

- [ ] **1.9.51.** Permitir o envio de documentos para assinatura digital, direto pelo sistema, sem a necessidade de
      fazer download deste documento e anexá-lo para assinatura na ferramenta de assinatura, evitando retrabalho e
      otimizando o tempo das tarefas;

- [ ] **1.9.52.** Permitir que seja configurado a notificação no whatsapp ou via e-mail quando algum documento for
      enviado para assinatura digital ao meu usuário.

- [ ] **1.12.** Os sistemas deverão garantir um número ilimitado de usuários, sendo desnecessário o município adquirir
      licenças adicionais ou upgrade para um maior número de usuários.

---

## B. Requisitos funcionais por item do Anexo I

## Item 1 - Software de Contabilidade

*Fonte: Anexo I, páginas 1-12/194.*

- [ ] **1.** Possibilitar a interação entre os sistemas Contábil e Folha de Pagamento, tornando possível a interação
      com o cadastro de empenhos da folha sem a necessidade de digitação, devendo permitir a geração prévia dos
      empenhos estimativos e ordinários possibilitando o ajuste dos registros antes da efetivação.

- [ ] **2.** Permitir a geração das liquidações de empenhos, retenções e despesas extras a partir da integração da
      folha de pagamento, possibilitando ao usuário interagir através de um painel com os registros oriundos dos
      serviços de interação da Folha, com efetivação dos empenhos e liquidações de forma automática.

- [ ] **3.** Permitir a geração das Despesas Extra orçamentárias, referentes a pagamentos antecipados e outras origens
      extras, de forma agrupada por classificação e fonte de recurso ou não agrupada.

- [ ] **4.** Possibilitar a construção de configuração customizável para gestão e integração dos dados da folha de
      pagamento, relacionando despesas, vínculos empregatícios, organogramas e recursos.

- [ ] **5.** Emitir relatório para conferência da relação dos empenhos da integração com a folha de pagamento, bem
      como gerados em cada interação, com identificador da interação, Credor, retenções, valor do empenho.

- [ ] **6.** Permitir o cadastro de empenhos em atendimento ao fluxo operacional proporcionado pela Lei nº 4.320/64.
      Ao salvar o registro, o sistema deverá permitir ao usuário escolher qual fase deseja salvar ao gravar o empenho,
      salvar e iniciar "Em liquidação", "salvar e Liquidar”, sem necessidade de abertura de outros menus. Ainda
      possibilitando ao gravar o empenho as opções de salvar e reter e salvar e copiar o cadastro do empenho.

- [ ] **7.** Propiciar configuração de parâmetro de inclusão de responsáveis para ateste da liquidação e responsáveis
      do pagamento de empenhos e despesa extra. Assim liberando para inserir o responsável do ateste da liquidação com
      a data e o responsável pelo ateste e responsáveis nos demais cadastros. E ainda possibilitar adicionar novo
      responsável caso não exista pelo próprio campo de Responsáveis da liquidação e pagamentos.

- [ ] **8.** Permitir o cadastro de Cartões Corporativos para controle de adiantamento e diárias, informando os
      credores (pessoa física) e os dados do cartão corporativo, como o número do cartão, se há vínculo automático ao
      adiantamento e vínculo automático à diária concedida. Possibilitando ainda a inclusão de um ou mais cartão
      corporativo por credor.

- [ ] **9.** Possibilitar após o registro do Cartões Corporativos para controle de adiantamento e diárias o sistema
      faça o vínculo automático no momento da baixa dos pagamentos de empenhos de adiantamentos e diárias dos
      servidores da entidade.

- [ ] **10.** Possibilitar na rotina da gestão dos adiantamentos e diárias seja demonstrado o cartão corporativo
      vinculado ao pagamento em questão facilitando a visualização dos itens da listagem que possuem e não possuem
      cartões corporativos vinculados e ainda possibilitando filtrar e visualizar os adiantamentos e diárias por
      cartão.

- [ ] **11.** Permitir a exibição das exigências legais incluídas no sistema, em formato de calendário, tendo as
      informações de Data Limite, a Exigência Legal, Área de negócio, Limite Legal, Abrangência e Vencimento e atraso
      do prazo para atendimento da exigência.

- [ ] **12.** Permitir na Exibição das Exigências legais poder filtrar por período, área de negócio com a listagem dos
      sistemas, abrangência Estadual ou Federal e a listagem de todos os Estados. Ainda detalhando as informações de
      cada exigência legal com dados das exigências, Tipo, Dicas e Links úteis de acesso de leiautes, portarias,
      central de ajuda e acesso ao TCE.

- [ ] **13.** Permitir o cadastro dos ingressos orçamentários, por meio da interação com o sistema de gestão de
      tributos do município e que o usuário possa definir se deseja efetivar as arrecadações individualmente e também
      efetivar as arrecadações e anulações automaticamente por meio de uma configuração previamente realizada.

- [ ] **14.** Permitir no ingresso das arrecadações oriundas do Tributos, que quando adicionada individual no contábil
      pelo painel de interação, possibilitar descartar o recebimento informando o motivo em caso de alguma informação
      indevida. Assim devolvendo ao sistema tributos para ajuste e reenvio de uma nova interação.

- [ ] **15.** Possibilitar consulta rápida na listagem das arrecadações através de ícone identificando as arrecadações
      que foram oriundas do sistema de tributos e ainda filtro de pesquisa somente dessas arrecadações oriundas da
      integração sem a necessidade de emissão de relatórios para conferências.

- [ ] **16.** Permitir o cadastro de Naturezas das Receitas com suas respectivas características específicas e no
      cadastro deverá informar seu Número: respeitando a formatação prévia na configuração de natureza de receita, seu
      Tipo (sintético ou analítico), sua Descrição e Marcadores vinculados.

- [ ] **17.** Permitir consultar os cadastros de Natureza de Receita existentes listando o número e descrição,
      permitir a edição, exclusão e a ação de desdobramento das naturezas de receitas.

- [ ] **18.** Permitir através de painéis interativos, a consulta dos Saldos da Despesa facilitando rápida consulta
      dos saldos sem necessidade de emissão de relatório. Demonstrando a relação das Despesas com descrição da ação,
      Natureza da despesa e informação do código e descrição dos recursos e valor atualizado das despesas.

- [ ] **19.** Possibilitar em todas as funcionalidades de inclusão da despesa no sistema, o usuário possa clicar sobre
      o código da despesa e visualizar o detalhamento completo da Despesa com informações da Despesa (número) Entidade
      (descrição), Organograma, Função, Subfunção, Programa (número + descrição), Ação (número formatado + descrição),
      Natureza da despesa (número formatado + descrição de todos os níveis da natureza utilizada), Recursos (número
      formatado + descrição) e Metas Físicas (quantidade + unidade de medida + produto + localizador).

- [ ] **20.** Controlar os saldos das dotações orçamentárias em tempo real, não permitindo inclusão de bloqueio e
      empenhamento em dotações que ultrapasse o saldo disponível e ou, sem saldo, devendo ser controlado o saldo
      diário.

- [ ] **21.** Permitir o cadastro das Naturezas de Despesas, informando o Número da natureza, Tipo Sintético ou
      Analítico, sua descrição, e inclusão de marcadores específicos para conferências futuras.

- [ ] **22.** Propiciar a consulta dos cadastros de Naturezas de Despesas em listagem com Número e descrição das
      naturezas e possibilitando realizar a edição, exclusão e o desdobramento de Natureza da despesa.

- [ ] **23.** Propiciar o cadastro de Despesas Não previstas na LOA, que são aquelas que não contemple a realização
      dos seus gastos previstos na elaboração da LOA e que após receberão recursos financeiros através de operações de
      alterações orçamentárias. Assim, possibilitar incluir essas despesas não previstas com as informações do
      Organograma, Programa, Ação, Função, Subfunção, Localizador e Natureza da despesa e visualizá-las através de
      listagem com ação de edição e exclusão.

- [ ] **24.** Possibilitar o cadastro de Receitas não previstas na LOA, assim como as despesas, muitas vezes a LOA não
      prevê a realização de determinados ingressos e após seu cadastro essas receitas recebem recursos por meio da
      alteração orçamentária (reestimativa). Assim possibilitar o cadastramento com a Natureza da receita e
      Organograma para futuros ingressos.

- [ ] **25.** Possibilitar o cadastro de Despesas Extras, ou seja, de dispêndios extra orçamentários, sejam eles
      provenientes de ARO (Antecipação de Receita Orçamentária), Consignações, Cauções e demais classificações extras.
      O dispêndio não depende de autorização legislativa, ou seja, não integra o orçamento público. O cadastro deve
      permitir informar ao menos o número, data, credor, especificação, classificação, identificador, valor,
      vinculação de suas origens e vencimento.

- [ ] **26.** Permitir o cadastro de Credores informando Nome do credor, CPF/CNPJ, data da inclusão, dados pessoais,
      dados dos documentos como Naturalidade, Nacionalidade, RG, órgão emissor, UF, data de emissão e possa ser
      informado também o PIS/PASEP/NIT, Inscrição municipal e município da inscrição. Inserir ainda a informação das
      contas bancárias, selecionar se é produtor rural ou prestadores de serviços, classificando e informando as
      naturezas de rendimentos para cada credor para o envio ao EFD-Reinf.

- [ ] **27.** Propiciar o cadastro das Ações de Governo conforme necessidade da entidade, consistindo em informar seu
      Número, seu Tipo, sua Descrição e Finalidade, permitindo a interação por meio de listagem, podendo o usuário
      editar e excluir o registro de uma ação. Além disso, o usuário poderá visualizar as alterações da ação, bem como
      desfazer essas alterações.

- [ ] **28.** Permitir o cadastro de Alterações Orçamentárias da Receita que objetiva alterar o valor previsto da
      Receita ou até mesmo criar Receitas que por algum motivo não foram previstas na LOA. O cadastro deve informar o
      tipo de alteração, sua finalidade, a respectiva Receita, o Recurso da Receita, a Dedução, o Valor da dedução,
      seu Impacto da alteração (se aumenta ou diminui), e o respectivo Valor.

- [ ] **29.** Possibilitar consultar as Alterações Orçamentárias da Receita cadastradas em listagem com detalhes e
      status das alterações as que estão A sancionar e as Sancionadas. Possibilitando a ação de sancionar as
      alterações e ainda editar e excluir uma alteração orçamentária desde que esta não esteja sancionada e reabrir
      alteração caso necessário.

- [ ] **30.** Possibilitar o cadastro de Alterações Orçamentárias da Despesa, informando o Crédito, a Despesa, Tipo do
      crédito, finalidade, Origens e recurso. E visualizar os registros em listagem e permitindo ao usuário interagir
      com as etapas da alteração orçamentárias Créditos em elaboração, Proposta Concluída, No Legislativo e
      Sancionada.

- [ ] **31.** Permitir por meio da Sanção de uma Alteração Orçamentária da Despesa, gerar alteração(ões) da receita
      com tipo de alteração e registrando automaticamente uma alteração de receita.

- [ ] **32.** Permitir Reserva de Dotação nas ações de concluir Proposta e Enviar ao Legislativo das Alteração
      Orçamentária da Despesa, informando a data e selecionando Reservar saldo das despesas, o sistema irá reservar o
      saldo do crédito para que permaneça garantido para o gasto em questão.

- [ ] **33.** Propiciar a visualização e pesquisa das Alterações Orçamentárias da Despesa através de listagem, de modo
      dinâmico, sem necessidade da emissão de relatórios. Possibilitando consultas pelos filtros por Entidade, Número
      da despesa, Número da emenda, Número da solicitação da despesa, tipo do crédito, Origens, Ato autorizativo, ato
      de abertura, Emendas, Responsáveis da emenda, conta bancária e Período da alteração.

- [ ] **34.** Possibilitar via painel o controle dos Limites na LOA, o qual é demonstrando o valor estabelecido do
      valor já consumido e utilizado deste limite. Demonstrando no painel os valores autorizado, utilizado e a
      utilizar. E ainda detalhando o tipo de crédito, entidade, organograma, origem e valores autorizados, utilizados
      e a utilizar das alterações orçamentárias selecionadas para considerar os limites.

- [ ] **35.** Possibilitar aos órgãos, unidades e departamentos a criação de Solicitações de Despesas de Créditos
      Orçamentários para gastos em um orçamento em curso, para futura análise e aprovação pelo setor de orçamento do
      ente. Possibilitando visualizar todas as solicitações cadastradas que estão em elaboração, Anulada, Sancionada,
      Em tramitação de alteração orçamentária, enviada para alteração orçamentária e enviadas para LOA.

- [ ] **36.** Permitir no cadastro de Solicitações de Despesas já existentes, visualizar o histórico do movimento da
      solicitação de créditos orçamentários, bem como a possibilidade de inserir pareceres, tramitar para envio da
      alteração orçamentária, anular e reabrir as solicitações anuladas.

- [ ] **37.** Propiciar a visualização e pesquisa dos bloqueios/desbloqueios através de listagem dinâmica com filtros
      Número da despesa, do processo administrativo e da solicitação de compras, Identificador do bloqueio se é uma
      solicitação de compras, processo administrativo e contrato, recurso, data do bloqueio e do desbloqueio sem
      necessidade da emissão de relatório.

- [ ] **38.** Propiciar o Desbloqueio das despesas bloqueadas para a realização da execução orçamentária. Seu cadastro
      deve informar a Data, seu Valor, sua Finalidade e sua Fonte de recurso.

- [ ] **39.** Propiciar o cadastro de bloqueios e desbloqueios através da listagem, permitindo a interação com os
      filtros dos bloqueios, bem como a realização das operações de desbloquear, editar ou excluir bloqueios.
      Permitindo, ainda, a visualização do histórico do registro (bloqueios e desbloqueios), editar ou excluir um
      registro.

- [ ] **40.** Permitir parametrizar o cadastro de Bloqueios de despesas para o sistema efetivar os bloqueios e
      desbloqueios automaticamente, e também para autorizar previamente cada bloqueio vindo do departamento de
      compras.

- [ ] **41.** Propiciar através de um painel de interação visualizar os registros oriundos do serviço de interação das
      compras, possibilitando a efetivação do bloqueio e desbloqueio orçamentário individualmente e podendo recusá-lo
      com apontamento do motivo.

- [ ] **42.** Permitir o cadastro de Adiantamentos Concedidos de suprimento de fundos e de diárias. Essa
      funcionalidade deve registrar todos os adiantamentos concedidos através do pagamento de empenhos que possuam
      identificadores de Adiantamento e diária. Possibilitando ao usuário visualizar em listagem dinâmica os
      adiantamentos e diárias "Concedido", "A prestar contas", "Encerrados", “Em prestação de contas”, “Devolvido” e
      "todos" em tela, sem necessidade de geração de relatórios.

- [ ] **43.** Propiciar a Devolução de valores não utilizados no adiantamento, atendendo a necessidade da devolução
      dos valores. O usuário poderá executar a devolução do saldo, o que desencadeia a anulação dos documentos de
      pagamento, liquidação, em liquidação (se existir) e empenho com o valor devolvido.

- [ ] **44.** Permitir estorno total ou parcial tanto do saldo da liquidação quanto do valor das retenções,
      possibilitando a substituição ou alteração dos documentos fiscais.

- [ ] **45.** Permitir o cadastro de anulações de liquidação de empenhos, pagamento de empenhos, anulação de
      subempenho, anulação de despesa extra e anulação de arrecadações orçamentárias.

- [ ] **46.** Permitir o cadastro de Atos, com o Número, Tipo do Ato, Natureza do texto jurídico, data da criação,
      data a vigorar, data da sanção, data de publicação, fontes de divulgação, Ementa, Atos alterados, atos revogados
      e possibilitar a inclusão de anexos. E ainda realizar operações de edição e exclusão de atos, bem como ter a
      possibilidade de visualizar documentos em anexo aos atos e fazer o download deles, por meio da listagem
      dinâmica.

- [ ] **47.** Propiciar cadastro de Naturezas de texto jurídico, realizando operações de edição e exclusão de
      naturezas e visualizando-as por meio da listagem dinâmica de descrição.

- [ ] **48.** Permitir a visualização e pesquisa dos Tipos de Atos pela descrição e classificação. Na listagem as
      informações da descrição e classificação devem ser visíveis ao usuário e passíveis de ordenação.

- [ ] **49.** Propiciar a interação com o cadastro de empenhos através da listagem onde o usuário poderá editar e
      excluir empenhos, além de poder realizar cópias de empenho, adicionar subempenho, adicionar liquidação,
      adicionar pagamento, adicionar anulação, emitir relatório e emitir nota, bem como realizar filtros por empenhos
      do exercício e restos a pagar.

- [ ] **50.** Possibilitar selecionar empenho individual ou selecionando vários empenhos efetuar por ação disponível
      de emitir Relatório da relação de empenhos pelo próprio cadastro de empenhos sem a necessidade de acesso a
      outros módulos.

- [ ] **51.** Através da listagem dinâmica de empenhos o usuário poderá visualizar os empenhos liquidados, pagos, A
      liquidar, Em liquidação, A pagar e a Comprovar e efetivar as etapas de Empenho, “liquidações" e "pagamentos",
      além de poder gerar um empenho complementar.

- [ ] **52.** Propiciar a seleção de parâmetro de Utilizar Ordem de baixa para possibilitar a predefinição da conta do
      credor e a conta pagadora no cadastro de liquidação, de despesa extra e de devolução de receita. Assim, nos
      pagamentos essas contas serão carregadas automaticamente.

- [ ] **53.** Propiciar ao usuário realizar o cadastro de liquidação, conforme dispõe o art. 63 da Lei nº 4.320/1964,
      informando Data, valor, Especificação, Comprovantes, Vencimentos, Retenções, Ordem de Baixa e inclusão de
      anexos. E ainda ao salvar a liquidação possibilitar ao usuário a opção de salvar e adicionar nova liquidação
      caso ainda possua saldo a liquidar.

- [ ] **54.** Permitir a opção de copiar o texto da especificação do empenho no cadastro da liquidação, sem a
      necessidade de digitação com preenchimento inteligente e também possibilitar capturar áudio em texto para
      preenchimento em áudio da especificação.

- [ ] **55.** Possibilitar estipular os limites de saldo a serem utilizados no superávit financeiro em alterações
      orçamentárias. Inserindo o cadastro do Superávit financeiro por recursos e registrando esses limites
      estabelecidos do Recurso por conta bancária, valor e organogramas aplicando os controles de valores que serão
      aplicados à entidade da despesa creditada.

- [ ] **56.** Permitir o cadastro de Regras contábeis de escrituração dos registros contábeis cabíveis. O cadastro
      deve informar Número, Título, Período de Vigência, Documento, Abrangência, Aplicabilidade, Condição, Histórico e
      Roteiro contábil.

- [ ] **57.** Permitir cadastrar Diária, com Número, Data, Credor, Organograma, finalidade e destino com a origem e
      dados de data e hora de partida e retorno, Natureza, Ato de concessão, valor unitário e quantidade. Após inserir
      o Identificador no empenho "Diária", esse empenho poderá estar associado a um Credor ou uma Diária.

- [ ] **58.** Permitir inserir Marcadores em vários cadastros do sistema como exemplo, nos casos de atendimento ao
      SIOPE, MDE, Fundeb 60%, Fundeb 40% informações que possibilite organizar, classificar e possibilitar consultas e
      geração de relatórios específicos para agilizar as análises conforme necessidade.

- [ ] **59.** Propiciar o cadastro dos Ordenadores da Despesa com nome completo, CPF e organograma, das autoridades
      cujos seus atos resultam em emissão de empenho, autorização de pagamento, suprimento ou dispêndio de recursos.

- [ ] **60.** Propiciar ao usuário cadastrar e consultar os cadastros de Organogramas, inserindo o número do
      organograma, descrição e tipo de administração. E realizando operações de edição e exclusão de organogramas por
      meio da listagem dinâmica.

- [ ] **61.** Propiciar ao usuário definir parâmetros de configuração o momento que irá realizar as retenções da
      entidade, que poderá ser definida por ser na liquidação, no pagamento e individual por retenção.

- [ ] **62.** Propiciar ao usuário efetuar a Prestação de Contas de adiantamento de suprimentos de fundos e de
      diárias. A prestação de contas do adiantamento deve ser realizada pelo usuário visualização em listagem, sendo
      que na efetiva prestação de contas deverão ser informados o respectivo Número e Data da prestação, os
      comprovantes das despesas vinculadas e seus respectivos valores. Permitindo efetuar a devolução de valores não
      utilizados, caso existam.

- [ ] **63.** Permitir o cadastro de Programas de governo conforme necessidade da entidade. O cadastro deve informar o
      número e descrição, público-alvo, objetivos, justificativa, diretrizes, responsável, horizonte temporal
      contínuo, temporário e período. E possibilitar a visualização dos cadastros em listagem dinâmica.

- [ ] **64.** Permitir o cadastro das Contas Bancárias pertencentes à entidade. No cadastro de contas cadastrar os
      dados bancários, organogramas, responsável, controle de vigência da conta com data inicial, data final e motivos
      para alteração da situação da conta seja ativa e inativa, e administração de recursos informando os recursos
      administradores e movimentadores.

- [ ] **65.** Permitir o cadastro de Comprovantes que possam realizar a gestão dos mesmos com a inclusão da
      classificação, tipo de comprovante, número do comprovante, data de emissão, série, código de validação do
      comprovante, Credor, valores, retenções, finalidade, vencimentos e inclusão de anexos e após possibilitar o
      vínculo dos comprovantes no cadastro de liquidações.

- [ ] **66.** Propiciar o cadastro de Transações Financeiras com descrição e tipo e ainda realizar, através da
      listagem as operações de edição e exclusão, bem como realizar a ativação de determinadas transações financeiras.

- [ ] **67.** Propiciar o cadastro de Unidades de Medidas, realizando operações de edição e exclusão. E possibilitar
      pesquisa e visualização em listagem das informações por Abreviatura e descrição.

- [ ] **68.** Possibilitar realizar o encerramento do Período da Escrituração, permitindo a realização de validações
      importantes como a verificação de saldos contábeis, permitindo o encerramento e também a reabertura de períodos
      seja diário ou mensal. E ainda visualizar o histórico de execuções com data, hora, descrição e usuário a qual
      executou as rotinas.

- [ ] **69.** Permitir o encerramento do Período Financeiro, rotina que permite que a contabilidade realize o controle
      das movimentações físicas da Entidade, por meio da abertura e encerramento dos períodos, validação das
      movimentações, bloqueio de períodos, entre outros. E também possibilitando histórico de início, encerramento e
      reabertura do período com data, hora e usuário a qual executou as rotinas.

- [ ] **70.** Permitir a configuração do Período Financeiro determinando o período aberto de movimentação no sistema,
      em diversas rotinas do sistema permitir selecionar somente dias úteis configurando os dias pelo calendário, bem
      como desbloqueio de campos para edição.

- [ ] **71.** Possibilitar por meio de configuração no Período Financeiro, o roteiro de geração da enumeração
      cadastral dos empenhos, podendo o usuário optar por bloqueá-la, habilitá-la para edição livre ou mesmo optar
      pela ordem cronológica.

- [ ] **72.** Permitir no Encerramento do Período Financeiro a anulação de todos os Empenhos Estimativos com saldo
      para que os mesmos não sejam inscritos em restos a pagar.

- [ ] **73.** Permitir a transferência dos saldos de balanço para o exercício seguinte pelo Período da escrituração ao
      Iniciar o exercício selecionando a opção de executar os lançamentos de abertura e saldos iniciais.

- [ ] **74.** Propiciar ao usuário cadastrar contas contábeis conforme Plano de contas e legislação aplicável, podendo
      visualizar e consultar as contas do plano de contas através de planilha dinâmica.

- [ ] **75.** Permitir inserir Lançamento contábil manualmente para lançamentos que não são contemplados por rotinas
      do sistema, seja por motivos de ajustes ou por razões legais. Inserindo o lançamento o com data, histórico e
      evento contábil conforme necessidade da entidade. E ainda estornar os lançamentos contábeis já existentes. Seu
      estorno deve-se informar o lançamento contábil desejado, sua data de estorno, seu histórico e valor.

- [ ] **76.** Propiciar ao usuário opção de descartar registros de oriundos de integrações de empenhos, anulações,
      liquidações e bloqueios/desbloqueios do Compras, descartar as Arrecadações do sistema de tributos e descartar
      também empenhos da folha de pagamento.

- [ ] **77.** Propiciar ao usuário recepcionar e armazenar os documentos enviados pelos departamentos competentes para
      proceder com a escrituração contábil como exemplo os registros das depreciações e aquisição de bens patrimoniais
      oriundas do sistema patrimônio.

- [ ] **78.** Permitir a geração de demonstrativos gerenciais com visão analítica e sintética das receitas, despesas,
      fontes de recursos e movimentações bancárias.

- [ ] **79.** Propiciar ao usuário consultar dinâmicas e rápidas por Balancete Dinâmico, permitindo controlar através
      de filtros a consulta aos lançamentos e movimentações das contas contábeis. Possibilitando visualizar os
      lançamentos das contas conforme o filtro, apresentando em forma de razão da conta, as movimentações da conta
      analítica em questão. Os filtros possíveis para emissão do balancete dinâmico devem ser por Período: Anual,
      Mensal e Diário; Grupo, Conta, Visão, apenas saldo atual, Conta corrente, Componente, Registro contábil,
      Totalizador por dia, Saldos iniciais, abertura, diários, encerramento e documentos escriturados.

- [ ] **80.** Emitir balancete por fonte de recurso, listando as fontes de recursos e permitindo a execução das visões
      do relatório pelas opções de Superávit financeiro com disponibilidades e obrigações, superávit financeiro,
      superávit financeiro a utilizar e utilizado, superávit financeiro a utilizar e utilizado por conta bancária e
      organograma e demonstrando o saldo.

- [ ] **81.** Possibilitar a geração de informações às prestações de contas federais: SIOPE, SIOPS, DCA, MSC, DIRF,
      EFD-Reinf, RREO, RGF, MANAD.

- [ ] **82.** Emitir os Relatórios Resumidos de Execução Orçamentária (RREO) e Relatórios de Gestão Fiscal (RGF) de
      acordo com a Portaria da STN vigente para o período de emissão.

- [ ] **83.** Emitir os relatórios listados pela Lei 4.320/64.

- [ ] **84.** Emitir relatório de acompanhamento do Ranking na STN sobre a qualidade das informações prestadas
      referente aos arquivos do SICONFI, oportunizando a seleção de qual Dimensão se deseja avaliar.

- [ ] **85.** Emitir relatório para acompanhamento e conferências das informações prestadas ao EFD-Reinf.

- [ ] **86.** Possibilitar o acompanhamento rápida as informações do EDF-Reinf de forma atualizada com data, hora,
      estimativas de horas para resolver possíveis ajustes e alertas informações em gráficos dos eventos gerados,
      envios federais e envios pendentes das informações referente ao EFD-Reinf ao sistema gestor do e-Social.

- [ ] **87.** Permitir a emissão de notas e relatórios a partir do próprio ambiente de cadastros.

- [ ] **88.** Realizar via interação entre os sistemas Contábil e Compras a integração dos com registros de empenhos,
      anulações de empenhos e liquidação.

- [ ] **89.** Propiciar a inclusão dos empenhos de alterações contratuais do tipo "aditivo" ou "apostilamento" via
      interação com o compras pela emissão de empenhos

- [ ] **90.** Permitir o envio de dados financeiros das movimentações bancárias ao portal de transparência para a
      população em conformidade com a Lei de Acesso à Informação de Nº 12.527/11.

- [ ] **91.** Permitir a alteração do exercício e entidade logada no sistema de forma simples e rápida.

- [ ] **92.** Possibilitar cadastro de Responsáveis vinculados a entidade inserindo seus dados pessoais, descrição do
      cargo, endereço, período de responsabilidades com data inicial, data final, tipo de responsável, ato,
      organograma e motivo da baixa e inclusão de anexos.

- [ ] **93.** Permitir a realização da Prestação de Contas para o Tribunal de Contas, referente aos atos
      administrativos, dados contabilizados, dados financeiros e dados do orçamento.

- [ ] **94.** Propiciar que pessoas físicas ou jurídicas fornecedoras do município consultem os empenhos que estão
      pendentes de pagamento pelo município via dispositivo móvel.

- [ ] **95.** Possuir painel de interação das Solicitações de Despesas solicitadas pelos departamentos para inclusão
      dos créditos orçamentários e devolução da solicitação caso necessário.

- [ ] **96.** Possibilitar a inclusão de emendas, por meio do cadastramento das Emendas parlamentares relativas ao
      orçamento anual da entidade. E possibilitando a vinculação, consulta e visualização das emendas aos recursos
      informados nos cadastros das despesas, das solicitações de despesas e das alterações orçamentárias da despesa.

- [ ] **97.** Permitir inserir a Publicidade dos relatórios de Gestão Fiscal e Resumido da Execução Orçamentária da
      LRF, informando o Poder, Tipo, Ano, Período de referência, competência e Publicações com a data de publicação,
      fonte de divulgação e descrição.

- [ ] **98.** Permitir a construção de relatórios personalizados com base nos registros das funcionalidades e
      possibilitando sua configuração por meio da fonte do sistema com ações de colunas, filtros e ordenações, bem
      como a inclusão de parâmetros conforme a necessidade da entidade.

- [ ] **99.** Permitir a definição das configurações de permissões para os acessos às funcionalidades do sistema da
      entidade, identificando se o usuário possui autorização para acesso, criação, edição ou exclusão de dados.

- [ ] **100.** Permitir o registro dos entes que são a representação jurídica da corporação, além da representação
      jurídica e legal da entidade, ao informar dados como a imagem do brasão da entidade, seu nome, CNPJ, sigla,
      natureza jurídica, seu endereço, bairro, município, número e CEP, os dados para contato como e-mail, site,
      telefone, fax, bem como, o horário de funcionamento do ente, a esfera governamental, o identificador de entidade
      RPPS e o fuso horário.

- [ ] **101.** Propiciar o registro dos Tipos de Certidões expedidas por órgãos, ao informar uma descrição para serem
      utilizadas no cadastro de Certidões dos Convênios. E possibilitar consulta por meio da listagem e realizando
      operações de edições e exclusões das mesmas.

- [ ] **102.** Propiciar cadastrar e realizar a consulta dos cadastros de Convenentes e Concedentes informando o nome,
      tipo de Física ou Jurídica e CPF/CNPJ recebimento e repasses de recursos e possibilitar a visualização dos
      cadastros por meio da listagem

- [ ] **103.** Propiciar ao usuário realizar pesquisa dos Convênios Recebidos cadastrados ao informar respectivo
      convênio, seu objeto ou situação do mesmo, o aditivo, sua justificativa ou situação do mesmo, demonstrando-os e
      ordenando-os por meio de listagem as informações do registro, ensejando maior visibilidade das informações que o
      usuário necessitar.

- [ ] **104.** Permitir o registro de Certidões do Convenente, ao informar qual o nome do mesmo, o número e o tipo da
      certidão, bem como, a data da emissão e validade.

- [ ] **105.** Possibilitar a pesquisa das Certidões de Convenentes cadastradas, ao informar o respectivo convenente,
      o número da certidão e o tipo, demonstrando-os e ordenando-os por meio de listagem a informação da pesquisa, bem
      como, a data de emissão e validade, ensejando maior visibilidade das informações que o usuário necessitar.

- [ ] **106.** Permitir cadastro e consultas das Modalidades em que os Convênios podem ser firmados, cadastradas ao
      informar uma descrição e demonstrando-as por meio de listagem.

- [ ] **107.** Possibilitar o Cadastro de Certidões da Entidade com Número, tipo, data de emissão e data de validade.
      E ainda possibilitar as operações de edições e exclusões dos mesmos.

- [ ] **108.** Possibilitar ao usuário realizar a Pesquisa das Certidões da entidade cadastradas ao informar o seu
      número e o tipo, demonstrando-os e ordenando-os por meio de listagem a informação da pesquisa, bem como, a data
      de emissão e validade.

- [ ] **109.** Possibilitar a inclusão de novos campos complementares nos principais cadastros do sistema, podendo
      selecionar o tipo de dado que pode ser Área de Texto, CNPJ, CPF, Data, Data/Hora, E-Mail, Hora, Inteiro, Lista
      de seleção, Múltipla Seleção, Telefone, Texto e Valor (Fracionário), descrição, tamanho, dica de preenchimento
      quando o tipo de dado exigir e ainda indicar se ele é de preenchimento obrigatório ou não. Possibilitar também o
      agrupamento destes dados e a sua publicação entre as entidades.

- [ ] **110.** Possibilitar a Prestação de Contas de Convênios Recebidos de forma ágil, por meio de informações
      básicas como a data da respectiva prestação e o valor da mesma, o valor do rendimento da aplicação, bem como, o
      devolvido.

- [ ] **111.** Possibilitar ao usuário consulta dos cadastros de Convênios Recebidos com opção por visualizar todos os
      registros, somente aqueles que são os convênios, mesmo somente os aditivos, tanto quanto, aqueles que estão em
      situação de prestação e mesmo se já foram concluídos, realizando operações de edições e exclusões das prestações
      de contas, caso possuam, bem como, verificar e excluir as situações que o convênio apresentar.

- [ ] **112.** Possibilitar a pesquisa dos Convênios Recebidos cadastrados ao informar respectivo convênio, seu objeto
      ou situação do mesmo, o aditivo, sua justificativa ou situação do mesmo, demonstrando-os e ordenando-os por meio
      de listagem as informações do registro, ensejando maior visibilidade das informações que o usuário necessitar.

- [ ] **113.** Possibilitar o cadastro de Tipos de Aditivos de Convênios, informar sua classificação como decréscimo
      ou acréscimo, a configuração do seu tipo como prazo, valor ou prazo e valor, bem como, uma descrição para
      identificação cadastral.

- [ ] **114.** Possibilitar a gestão de permissões de acessos, funcionalidades e ações por usuários e grupos de
      usuários, a partir de uma ferramenta de acessos.

- [ ] **115.** Permitir ao usuário realizar o registro do Tipo de Situação dos Convênios, ao informar uma descrição se
      estão em execução. concluído, Paralisado, Aprovado, Cancelado e após efetuar a atualização da situação dos
      convênios.

- [ ] **116.** Possibilitar o cadastro de Responsáveis com Nome, CPF e Tipo para pessoas que podem assumir algum tipo
      de responsabilidade perante os Convênios de determinado ente público.

- [ ] **117.** Possibilitar atualizações das Situações dos Convênios Recebidos e repassados, inserindo o tipo da
      situação se está em execução, concluído, Paralisado, Aprovado, Cancelado, data e motivo de forma flexível.

- [ ] **118.** Permitir o registro do Tipo de repasse dos Convênios, ao informar uma descrição e uma classificação que
      represente tal repasse.

- [ ] **119.** Possibilitar a pesquisa dos Tipos de Repasses dos Convênios cadastrados, ao informar a descrição,
      demonstrando-os e ordenando-os por meio de listagem a informação da pesquisa, ensejando maior visibilidade das
      informações que o usuário necessitar.

- [ ] **120.** Permitir o cadastro dos Convênios Repassados ao informar o número do respectivo convênio, o valor do
      repasse, da contrapartida e o global, o referente tipo e objeto, o período, a data da assinatura, a conta
      bancária, qual a modalidade do respectivo convênio, o convenente, as certidões emitidas, bem como, o(s)
      responsável(eis) e inclusão de anexos.

- [ ] **121.** Permitir o cadastro dos Convênios Recebidos ao informar o número do respectivo convênio, o valor do
      repasse, da contrapartida e o global, o referente objeto, o período, a data da assinatura, a conta bancária,
      qual a modalidade do respectivo convênio, a concedente, as certidões emitidas, bem como, o(s) responsável(eis) e
      o recurso, bem como o Ato autorizativo e Ato de publicação.

- [ ] **122.** Possibilitar a consulta dos cadastros de Convênios Repassados por meio da listagem, aplicando filtros
      conforme a necessidade, seja na opção por visualizar todos os registros ou somente aqueles que são os convênios
      ou mesmo somente os aditivos, tanto quanto, aqueles que estão em situação de prestação ou mesmo se já foram
      concluídos. Visualizar ainda a etapa que os convênios se encontram, ou seja, se estão ainda em formalização, se
      estão em execução ou em prestação de contas, bem como, se foram concluídos. Além de realizar operações de
      edições, exclusões ou reaberturas dos mesmos, bem como, verificar e excluir as situações que o convênio
      apresentar.

- [ ] **123.** Permitir a construção de interações com usuário como validações, notificações, envio de e-mail, entre
      outros, mostradas durante a operacionalização de funcionalidades, objetivando alertar ou comunicar.

- [ ] **124.** Possibilitar adicionar Aditivos a Convênios Recebidos, no cadastro informar o número e tipo do aditivo,
      Ato autorizativo, a data da assinatura e do término, o valor decrescido no repasse e na contrapartida, bem como,
      o valor global do decréscimo, justificativa e inclusão de anexos.

- [ ] **125.** Possibilitar a inclusão de Aditivos a Convênios Repassados de forma ágil e flexível, ao informar o
      número e tipo do aditivo, a data da assinatura e do término, o valor decrescido no repasse e na contrapartida,
      bem como, o valor global do decréscimo e justificativa.

- [ ] **126.** Que nos Convênios Repassados e Recebidos o sistema demonstre notificação dos convênios que ainda não
      foi assinado e sem da data de assinatura.

- [ ] **127.** Permitir o registro dos entes que são a representação jurídica da corporação que possui a licença do
      software, além da representação jurídica e legal da entidade em si, ao informar dados como a imagem do brasão da
      entidade, seu nome, CNPJ, sigla, natureza jurídica, seu endereço, bairro, município, número e CEP, os dados para
      contato como e-mail, site, telefone, fax, bem como, o horário de funcionamento do ente, a esfera governamental,
      o identificador de entidade RPPS e o fuso horário.

- [ ] **128.** Permitir o registro dos Tipos de Impactos para estimativa de aumento da despesa, ou seja, sejam elas:
      -Aumento de despesa obrigatória de caráter continuado (art. 17 da LRF); - Criação de ação governamental -
      aumento da despesa (art. 16 da LRF); - Criação de despesa obrigatória de caráter continuado (art. 17 da LRF); -
      Expansão e/ou aperfeiçoamento de ação governamental - aumento da despesa (art. 16 da LRF).

- [ ] **129.** Possibilitar a pesquisa dos Tipos de Conselhos Municipal cadastrados, ao informar a descrição,
      demonstrando-os e ordenando-os por meio de listagem a informação da pesquisa, disponibilizando maior
      visibilidade das informações que o usuário necessitar.

- [ ] **130.** Possibilitar incluir Tipos de Membros do Conselho Municipal, realizando operações de edições e
      exclusões dos mesmos.

- [ ] **131.** Permitir o registro do Planos de Controle Interno do ente por sistema administrativo, possibilitando a
      inclusão de arquivos anexos, percentual de execução mensal do respectivo plano, bem como, o período.

- [ ] **132.** Possibilitar a pesquisa dos Planos de controle interno cadastrados, pela informação de pesquisa, bem
      como, o mês, data e conclusão do plano, ensejando maior visibilidade das informações que o usuário necessitar.

- [ ] **133.** Permitir o registro de Conselhos Municipais, ao informar uma descrição, qual o tipo do conselho e seu
      ato, qual o tipo da reunião, ou seja, se é entre os gestores ou conselho de educação etc., bem como, informar
      quem são os membros participantes.

- [ ] **134.** Possibilitar a pesquisa dos Conselhos Municipais cadastrados, ao informar a descrição, a data, o tipo
      do conselho ou o ato autorizativo, bem como, o tipo de reunião, a data de início do conselho, a data e
      periodicidade das reuniões, os membros participantes, o CPF e o tipo dos mesmos, ensejando maior visibilidade
      das informações que o usuário necessitar.

- [ ] **135.** Permitir o registro dos Responsáveis pelo Controle Interno público de determinado ente, ao informar os
      dados pessoais do responsável, ou seja, nome, CPF e RG, seu endereço, telefone e e-mail, a descrição e o tipo do
      cargo que ocupa, bem como, o período de vigência como responsável pelo controle.

- [ ] **136.** Permitir o registro de documentos referente às Normas de Controle Interno do ente, por sistema
      administrativo, com a possibilidade de realizar inclusões de arquivos anexos, bem como, informar a qual sistema
      administrativo é pertencente, o assunto e data do registro.

- [ ] **137.** Permitir o registro dos Tipos de Bens, ao informar uma descrição quando passíveis de declaração a se
      realizar por ocupantes de cargos eletivos municipais.

- [ ] **138.** Possibilitar a interação com o cadastro de Tomadas de Contas Especiais por meio da listagem, com as
      respectivas etapas, como instaurada, em andamento ou concluída. Nas fases instaurada e em andamento, é possível
      adicionar o responsável, a publicação e documentos, bem como, tramitar as tomadas de contas para conclusão,
      informando assim, a data de conclusão, situação, número do processo TCE, valor e parecer.

- [ ] **139.** Possibilitar na etapa em andamento da Tomadas de Contas Especiais, além de anexar documentos deve
      permitir realizar o download e visualizar as publicações vinculadas. E na etapa concluída, podem ser realizados
      os filtros das tomadas de contas por procedente, improcedente ou todos, bem como, realizar a reabertura das
      tomadas de contas, visualizando e editando.

- [ ] **140.** Permitir o registro das Unidades Centrais de controle interno, informando data, descrição e ato.

- [ ] **141.** Possibilitar a interação com os cadastros de Conselhos Municipais por meio da listagem, realizando
      operações de edições e exclusões dos mesmos, bem como, alternando entre outros cadastros, como o de reuniões e
      de membros do conselho.

- [ ] **142.** Permitir o controle por meio do registro da Estimativa de Impacto do Aumento da Despesa, conforme
      determinações da LRF, ao informar a data da estimativa, o tipo de impacto, o ato autorizativo, bem como,
      possibilidade a inclusão de anexos.

- [ ] **143.** Possibilitar os cadastros dos Tipos de Reuniões realizando operações de edições e exclusões dos mesmos
      e vínculos ao cadastro das reuniões do conselho municipal.

- [ ] **144.** Possibilitar a cadastro e pesquisa das Reuniões do Conselho Municipal, ao informar o tipo de reunião,
      data da reunião e inclusão de anexos. Demonstrando-as e ordenando-as por meio de listagem a informação da
      pesquisa, bem como, a data da reunião, disponibilizando maior visibilidade das informações que o usuário
      necessitar.

- [ ] **145.** Possibilitar a pesquisa dos Membros do Conselho Municipal cadastrados, ao informar o nome do membro,
      demonstrando-os e ordenando-os por meio de listagem a informação da pesquisa, bem como, a entidade representada,
      a data da vigência do membro e o tipo e a data do início.

- [ ] **146.** Permitir o Registro de Membros dos Conselhos Municipais, informando seus dados, sejam eles pessoas
      físicas ou jurídicas, qual o tipo de membro, bem como, a entidade representada e inserção de anexos.

- [ ] **147.** Permitir os cadastros dos Saldos da Dívida de cargos eletivos, informando responsável, data do saldo,
      Descrição, Dívidas e Obrigações, data apuração e valor, E consultando os cadastros por período de data do saldo
      e apuração e valor da dívida e possibilitar realizar operações de edições e exclusões dos mesmos.

- [ ] **148.** Possibilitar a pesquisa dos Saldos das Dívidas cadastrados, ao informar uma descrição e um responsável
      pela dívida, a data do saldo ou da apuração, bem como, o valor da dívida, demonstrando-os as informações da
      pesquisa ensejando maior visibilidade das informações que o usuário necessitar.

- [ ] **149.** Possibilitar a gestão fiscal do cadastro de Declaração de bens de cargos eletivos com as informações do
      Responsável, data da declaração, Complemento, descrição dos bens declarados, data de aquisição, valor, número do
      registro no cartório e cartório.

- [ ] **150.** Possibilitar os cadastros de Componentes Fiscais da LRF com ano, período de referência, competência e
      componente da LRF como Meta de Arrecadação, Recebimento, Remunerações e valor tanto negativo quanto positivo.

- [ ] **151.** Possibilitar a Pesquisa dos Componentes Fiscais da LRF cadastrados, ao informar uma descrição, o tipo
      dos componentes, o ano, o período de referência ou a competência, demonstrando-os e ordenando-os por meio de
      listagem as informações da pesquisa, bem como, o valor do componente, ensejando maior visibilidade das
      informações que o usuário necessitar.

## Item 2 - Software de Planejamento e Orçamento

*Fonte: Anexo I, páginas 12-18/194.*

- [ ] **1.** Permitir executar Alterações Orçamentárias da Despesa, via ato legal Lei e Decreto, possibilitando no
      cadastro dos Atos com o Número, Tipo do Ato, Natureza do texto jurídico, data da criação, data a vigorar, data
      da sanção, data de publicação, fontes de divulgação, Ementa, Atos alterados, atos revogados e possibilitar a
      inclusão de anexos.

- [ ] **2.** Possibilitar, na criação de um novo Plano Plurianual, copiar o PPA já existente e no decorrer do processo
      o usuário deve informar as opções a serem copiadas para novo PPA: parametrização, receitas e despesas.

- [ ] **3.** Propiciar o registro das receitas e despesas no PPA, LDO e LOA e fácil navegação entre as 3 peças para
      conferências do que foi planejado num mesmo ambiente.

- [ ] **4.** Permitir no próprio cadastro das Receitas e das Despesas a opção Adicionar nos campos de preenchimento
      que não existe informações e necessita de novo cadastro, como os campos de organograma, programa, ação, função,
      subfunção da despesa e natureza da receita, organograma, recursos e dedução da receita sem a necessidade de sair
      do cadastro de ambos.

- [ ] **5.** Permitir atualizar as despesas do PPA e LDO a partir das alterações orçamentárias da despesa, tendo a
      opção de atualizar as despesas até o mês desejado e a opção de atualizar as despesas somente no PPA, somente na
      LDO e na LDO e PPA.

- [ ] **6.** Possibilitar efetuar a reserva de dotação ao concluir uma proposta orçamentária e no crédito das
      alterações orçamentárias no envio ao legislativo.

- [ ] **7.** Que o sistema possa registrar a evolução do patrimônio líquido automaticamente e possa ser visualizado as
      informações através de relatório e com visão dos valores de exercícios anteriores.

- [ ] **8.** Propiciar na LOA a inclusão dos créditos e propostas das alterações orçamentárias das Despesas e avançar
      para as etapas posteriores executando as ações de Concluir proposta, Enviar ao legislativo e Sancionar.

- [ ] **9.** Possibilitar a navegação e visualização das Alterações Orçamentárias das Despesas nas etapas executadas
      que estejam em Créditos em elaboração, Propostas, no Legislativo e Sancionada e quando Sancionada retornar as
      etapas pela opção de Reabrir proposta sempre que necessário.

- [ ] **10.** Possibilitar na LOA fazer o cadastro de Alterações Orçamentárias da Receita, inserindo o Tipo de
      alteração, a finalidade, a Receita, impactos da alteração e valor. E efetuar a consulta a partir de listagem
      dinâmica de todas as alterações orçamentárias que são A Sancionar e Sancionado. E tendo as opções de edição,
      exclusão e já sancionadas poder reabrir.

- [ ] **11.** Propiciar a emissão dos relatórios da Lei 4.320/64 e que na sua emissão possa se salvar os parâmetros
      para futuras emissões. Visualizar as execuções recentes de cada relatório emitido com data, hora da emissão e
      podendo abrir o arquivo PDF do relatório já gerado anteriormente.

- [ ] **12.** Propiciar a emissão dos relatórios legais da LRF, todos conformes mapeamentos disponibilizados pela STN
      podendo selecionar a peça orçamentária, Entidade, Consolidado quando necessário e notas explicativas e
      assinaturas ou grupo de assinantes.

- [ ] **13.** Propiciar na emissão de artefatos a opção de selecionar a visualização de todos os relatórios em listas
      e pastas. Tendo a separação e organização dos relatórios por TAG e podendo adicionar os Relatórios Favoritos,
      como os relatórios mais utilizados e emitidos.

- [ ] **14.** Propiciar ainda na emissão de artefatos, visualizar as execuções dos relatórios por usuários a qual
      emitiu os relatórios e todas as execuções. E possuir ações para Reexecutar o relatório emitido anteriormente,
      Solicitar assinatura, visualizar Parâmetros e Métricas do início da emissão até a conclusão da execução, se a
      execução do relatório será pública a todos usuários e a consulta do protocolo dos relatórios.

- [ ] **15.** Permitir o registro das audiências realizadas para elaboração do orçamento informando o tema, o ato
      autorizativo, a data e hora, a equipe de planejamento, a situação, o endereço, o tipo de audiência, os endereços
      da audiência, o assunto, bem como, anexar documentos da audiência registrada.

- [ ] **16.** Permitir o cadastro das ações de governo, com as opções de inclusão do Número, Tipo, Descrição e
      Finalidade. E possibilitar a consulta das opções por filtros, demonstrar as informações em listagem, definir as
      colunas a serem exibidas e definir a altura das linhas.

- [ ] **17.** Permitir a navegação entre as peças PPA, LDO e LOA sem necessidade de acesso de janelas e módulos para
      cada peça orçamentária. E que possua cadastro único entre as peças dos organogramas, programas, ação, função,
      subfunção, naturezas da receita e despesa e recursos e que o mesmo cadastro seja possível visualizar no sistema
      contábil.

- [ ] **18.** Propiciar a criação de uma configuração de organogramas personalizada com a inclusão do Nível, com
      Descrição, Quantidade de dígitos e separador, para que o cadastro seja realizado conforme a organização
      estrutural dos departamentos da entidade pública.

- [ ] **19.** Possibilitar o cadastro de organogramas conforme definidos pela entidade e demonstrar os organogramas em
      listagem com o Número, Descrição e Tipo de administração e efetuar pesquisas destes campos e ainda podendo fazer
      a edição e exclusão dos cadastros já existentes.

- [ ] **20.** Permitir criar uma configuração de função e subfunção conforme a necessidade do município, indicando
      qual configuração está em uso e validando as funções e subfunções para utilizá-las no exercício, bem como,
      informar a descrição.

- [ ] **21.** Possibilitar visualizar em listagem as funções e subfunções com Número e Descrição e permitir editar e
      excluir os cadastros.

- [ ] **22.** Permitir o cadastro Deduções das Receitas com as informações da Descrição e Tipo de deduções. E
      demonstrar as Deduções das Receitas em listagem dinâmica com colunas de Descrição, Tipo e Situação. E tendo
      ações de ativar e desativar as deduções.

- [ ] **23.** Possibilitar na consulta das Deduções das Receitas ordenar as informações da Descrição, Tipo e Situação
      conforme melhor visualização.

- [ ] **24.** Permitir a criação e alteração das despesas do PPA, LDO e LOA durante a elaboração e alteração do
      orçamento. Alertando as receitas e despesas com inconsistências que necessitam de ajustes e as que estão
      pendentes de alguma informação, e que logo preenchidas, possibilitar o enviar ao legislativo e sancionar a
      referida peça orçamentária.

- [ ] **25.** Possibilitar copiar os dados de receitas e despesas do PPA sem a necessidade de redigitação. Com as
      opções de cópia de receitas, despesas com e sem valores, programas, macro objetivos, ações, produtos e
      localizadores.

- [ ] **26.** Permitir visualizar as alterações efetuadas nas receitas e nas despesas, demonstrando as informações das
      alterações do que foi Sancionado e o que foi Alterado nos cadastros e podendo desfazer estas alterações.

- [ ] **27.** Que o sistema especifique as receitas e despesas que foram adicionadas e alteradas após as sanções do
      PPA e da LDO e as alterações que ocorreram.

- [ ] **28.** Permitir a emissão de relatórios de acompanhamento e comparativos da Receita programada e Receita
      Arrecadada e Comparativos das Despesas do orçamento com a execução orçamentária.

- [ ] **29.** Possibilitar a entidade de inserir Receitas e Despesas individualmente na LDO, possibilitar priorizar as
      receitas e despesas do PPA. E também efetuar a Cópia de LDO conforme LDO origem, com opções na cópia de copiar
      Parâmetros e configurações, Receitas e Receitas com valores zerados e Despesas e Despesas com valores zerados.

- [ ] **30.** Permitir identificar nos registros das receitas e despesas das peças orçamentárias a ausência de
      informação a qual devem ser inseridas e demonstrar ícones de atenção com mensagens de que existem campos
      obrigatórios que não foram preenchidos e assim poder enviar ao legislativo e sancionar sem pendências de
      ajustes.

- [ ] **31.** Permitir o registro do envio ao legislativo quando o orçamento estiver elaborado, possibilitando
      informar: data de envio ao legislativo. Após o envio, possibilitar as opções de Retornar ao executivo para
      alterações e Sancionar. Além disso, quando a peça estiver com status que foi enviado ao legislativo não deve
      permitir que as receitas e despesas sejam alteradas, garantindo a integridade dos registros.

- [ ] **32.** Possibilitar o envio dos registros de receitas e despesas do PPA, LDO e LOA para escrituração e geração
      dos registros contábil após as peças orçamentárias serem sancionadas.

- [ ] **33.** Permitir o cadastro e a pesquisa das Equipes de planejamento cadastrando-as com descrição, Ato de
      nomeação, período, atribuições e seus membros pertencentes com Nome e Função de cada membro e visualizando os
      cadastros existentes por meio de listagem.

- [ ] **34.** Possibilitar o registro da Execução de Metas físicas da Despesa do PPA, registrando-as por Periodicidade
      Anual, Mensal, Bimestral, Trimestral e Semestral, Ano do PPA, Valor Previsto e inclusão do campo Valor a ser
      executado e Data.

- [ ] **35.** Na Execução de Metas Físicas da Despesa, ao inserir o valor do campo Executado conforme Periocidade, que
      seja alterado seu status de A executar para Executado. Além disso, visualizar a alteração do status em tela, dos
      registros em listagem e ainda realizar pesquisas avançadas por Ação (número e descrição), Programa (número e
      descrição), Produto, Unidade de medida e Localizador.

- [ ] **36.** Permitir visualizar nas Metas Fiscais da Receita da LDO previamente cadastradas, as que estão a
      programar e as programadas e visualizando-as por meio de listagem.

- [ ] **37.** Possibilitar programar as Metas Fiscais da Receita da LDO individualmente por Receita, demonstrando os
      valores do Exercício corrente e inserindo valores para os dois próximos exercícios. E possibilitar também a
      opção de programar todas as receitas conforme usuário desejar e visualizar os valores totais por exercício das
      receitas programadas.

- [ ] **38.** Permitir na LDO o registro de Expansão das Despesas, inserindo a informação da Despesa, Descrição, Atos,
      Valor atual, Projeção dos dois exercícios subsequentes e as suas respectivas Compensação com registro do Tipo de
      Compensação, Receita, o ato regulamentar, localizador, Descrição e valor atual e também projeções dos dois
      exercícios subsequentes.

- [ ] **39.** Permitir o cadastro e pesquisa de Naturezas das Receitas. Efetuando o registro com Número da natureza,
      Tipo e Descrição. E possibilitar a pesquisa das naturezas existentes informando a máscara e texto da descrição
      da natureza e visualizando-as por meio de listagem.

- [ ] **40.** Permitir a visualização de todas as receitas e despesas elaboradas no PPA, conforme quadriênio
      selecionado, possibilitando de uma forma rápida priorizar as receitas e despesas selecionando-as individualmente
      ou em lote para LDO.

- [ ] **41.** Possibilitar ao Priorizar as receitas e despesas do PPA a inclusão, conferências e consultas das
      Receitas por Entidade, Organograma, Recurso e Naturezas e das despesas por Entidade, Organograma, Programa,
      Ação, Função, Subfunção, Recurso e Natureza da despesa e assim disponibilizar na LDO.

- [ ] **42.** Possibilitar campos Marcadores na inclusão das Receitas, Despesas, Recursos do PPA replicando para LDO e
      LOA. Com objetivo de classificar e possibilitar pesquisas e geração de relatórios específicos como informações
      referentes às receitas e às despesas com Fundeb, SIOPE, SIOPS entre tantos outros.

- [ ] **43.** Permitir o cadastro de programas tanto no PPA, como LDO e LOA, sendo cadastro único e não permitindo que
      sejam incluídos novos programas no PPA quando estiver sido enviado ao Legislativo, permitindo inclusões ou
      alterações somente quando status da peça estiver em modo de alteração.

- [ ] **44.** Permitir na consulta dos registros dos programas de governos pesquisar os cadastros existentes por meio
      de pesquisa avançada do número, da descrição, do público-alvo e dos objetivos do programa, estratégicos e macro
      objetivos.

- [ ] **45.** Permitir ainda na consulta dos programas visualizar os programas por meio de listagem com informações
      dos Programas, Público-Alvo e Objetivos do Programa assim ensejando maior visibilidade das informações que o
      usuário necessitar. Bem como, possibilitar ordenar as informações como desejar.

- [ ] **46.** Possibilitar a inclusão de Indicadores de programas para demonstrar os objetivos alcançados pela
      entidade na execução dos programas criados para o quadriênio. Inserindo o cadastro com Programa, Indicador,
      unidade medida, índice de referência, data de apuração, fonte, e Índices esperados para o quadriênio.

- [ ] **47.** Permitir na rotina de Indicadores de Programas visualizar em listagem os indicadores por programas,
      índice de referência e o status dos indicadores dos programas que estão A avaliar, Em avaliação e Avaliado. E
      possibilitando adicionar os índices obtidos e data para cada indicador é alterado as etapas dos status de A
      avaliar para Em avaliação e Avaliado.

- [ ] **48.** Permitir o registro das projeções atuariais previdenciárias e plano financeiro, no qual projeta-se o
      fluxo anual de receitas, despesas e saldo do regime próprio de previdência social dos servidores públicos para
      um período de 75 anos. Este registro deve ser realizado para atendimento do Art. 4º da LRF.

- [ ] **49.** Permitir a identificar no cadastro das Despesas e Receitas quando o valor dos recursos não está
      totalmente de acordo ao valor da Meta Financeira. Confrontando o valor da meta em comparação com o valor
      aplicado nos recursos e demonstrando a diferença a maior ou a menor a ser ajustado.

- [ ] **50.** Propiciar inserir uma ou mais Deduções no cadastro das receitas informando o tipo de dedução,
      Porcentagem e valor para cada dedução inserida.

- [ ] **51.** Propiciar cadastro de Recursos que representam as fontes financeiras, que sustentarão e assegurarão o
      desenvolvimento do plano de ação e atingimento do objetivo do governo. O registro deve ser possível por meio de
      informações como o número, tipo do recurso ordinário ou vinculado, Descrição e o Recurso de superavit
      financeiro. E ainda visualizar os registros em listagem contendo o número e descrição e tipo dos recursos.

- [ ] **52.** Permitir o registro das Renúncias Fiscais, ao informar a receita da LDO renunciada, o tipo, ou seja, se
      é uma redução, isenção etc., a localização, o Ato regulamentador, uma descrição e os valores para o exercício
      atual e os dois subsequentes. Permite registrar a(s) compensação(ões) informando as mesmas informações citadas,
      bem como, o setor beneficiário. Este registro deve ser realizado para propiciar a elaboração do relatório
      solicitado pela LRF, art. 4º, § 2º inciso V.

- [ ] **53.** Permitir a visualização mediante pesquisa das Renúncias Fiscais da LDO previamente cadastradas ao
      informar a natureza da receita, a descrição da natureza da receita e a respectiva descrição. E assim,
      visualizando-as e ordenando-as por meio de listagem as informações da Natureza da Receita, Tipo, Descrição e
      Exercício atual.

- [ ] **54.** Permitir registrar os Resultados Nominais na LDO, inserindo o tipo resultado, exercício atual, anos
      anteriores e próximos dois anos e também possibilitar efetuar a programação mensal do resultado nominal de forma
      automática rateando o valor por 12 meses. Além disso, caso o valor do rateio não fechar com valor total do
      exercício atual, deve apresentar informativo de diferença a ser ajustada.

- [ ] **55.** Permitir os registros dos Riscos Fiscais na LDO informando o tipo de risco, a entidade pública, o
      organograma, o detalhamento e a providência, bem como, o exercício atual e os próximos dois anos. Este registro
      deve ser realizado para possibilitar a elaboração do relatório solicitado pela LRF, Art. 4º, § 3º.

- [ ] **56.** Permite Sancionar as peças orçamentárias PPA, LDO e LOA após seu envio ao legislativo, informando a
      respectiva data da sanção, o ato autorizativo, possíveis observações, bem como, não permitir que a peça
      orçamentária seja alterada quando a mesma estiver sancionada, garantindo a integridade dos registros.

- [ ] **57.** Possibilitar o registro de Sugestões das equipes de planejamento, de audiências públicas entre outros,
      informando a origem da sugestão, tipo da sugestão, data, categoria, endereço beneficiário, assunto e sugestão
      apresentada.

- [ ] **58.** Permitir a pesquisa das Sugestões realizadas para a elaboração do orçamento previamente cadastradas
      informando o assunto, a sugestão apresentada, a categoria, tipo, período e origem. E visualizar as etapas das
      Sugestões, quanto as que estão em Avaliação, em Viabilidade e as Concluídas procedente e improcedente, ensejando
      maior visibilidade das informações.

- [ ] **59.** Permitir cadastro dos Tipos de alterações da Receita com descrição e tipo, conforme a necessidade do
      município e ainda possibilitando a ação de ativar e desativar a situação dos tipos de alteração de receita e
      assim utilizá-los nos registros de alterações orçamentárias da Receita.

- [ ] **60.** Propiciar o envio dos dados do orçamento para prestação de contas conforme leiaute e exigências do
      Tribunal de Contas.

- [ ] **61.** Permitir a realização de consultas e filtros rápidos por meio de painéis interativos, dos Saldos
      positivos ou negativos dos Recursos e listando somente as receitas e despesas dos recursos selecionados.

- [ ] **62.** Permitir a visualização dos Saldos do orçamento por meio de painéis interativos dos Saldo por entidades
      e por recursos. Na visualização dos saldos por entidades possibilitar visualizar o saldo das receitas (+)
      transferências recebidas (-) despesas (-) transferências concedidas durante a elaboração da peça orçamentária,
      dispensando por exemplo, realizar emissões de relatórios para conhecer o saldo planejado.

- [ ] **63.** Possibilitar nas peças orçamentárias PPA, LDO e LOA visualizar via painel o Total planejado das receitas
      e total das despesas e saldo, dispensando a necessidade de emissão de relatórios.

- [ ] **64.** Possibilitar No PPA, LDO e LOA definir agrupamentos das informações da Receitas e das Despesas
      cadastradas. Possibilitando pelos agrupamentos se ter uma visão organizada das receitas por organograma e por
      recurso. E das despesas com opções de agrupamento por programas, organograma, por recurso, por entidade, por
      função, por subfunção e natureza da despesa.

- [ ] **65.** Possibilitar inclusão dos Limites das despesas na LOA, a qual usuário delimite o valor total das
      despesas, informando o Número, valor e selecionando a forma como ela será limitada, se será por Entidade,
      Organograma, Programa, Ação, Função, Subfunção, Natureza da despesa, Recurso ou Marcador.

- [ ] **66.** Possibilitar via painel a informação dos Limites na LOA, o qual é demonstrando o valor estabelecido do
      valor já consumido e utilizado deste limite. Demonstrando no painel os valores autorizado, Utilizado e a
      utilizar. E ainda detalhando o tipo de crédito, entidade, organograma, origem e valores autorizados, utilizados
      e a utilizar das alterações orçamentárias selecionadas para considerar os limites na LOA.

- [ ] **67.** Propiciar registrar Cenários Macroeconômicos no PPA, LDO e LOA para aplicação nas receitas e despesas,
      informando: Variável Método de cálculo (percentual ou valor), Percentual ou valor para o ano Atual e para os
      próximos anos. Além disso possibilitar informar texto, para detalhar as premissas utilizadas.

- [ ] **68.** Possibilitar a emissão dos relatórios legais da LRF: Anexo I - Metodologia e Memória de Cálculo das
      Metas Anuais para as Receitas - Total das Receitas; Anexo I.4 -Demonstrativo da Memória de Cálculo das Metas
      Fiscais de Despesas; Anexo I.a Metodologia e Memória de Cálculo das Principais Receitas; Anexo II - Metodologia
      e Memória de Cálculo das Metas Anuais para as Despesas - Total das Despesas; Anexo II.a Metodologia e Memória de
      Cálculo das Principais Despesas; Anexo III - Metodologia e Memória de Cálculo das Metas Anuais para o Resultado
      Primário; Anexo IV - Metodologia e Memória de Cálculo das Metas Anuais para o Resultado Nominal; Anexo V -
      Metodologia e Memória de Cálculo das Metas Anuais para o Montante da Dívida; Anexo VI - Demonstrativo da Receita
      Corrente Líquida; Anexo VII - Demonstrativo de Riscos Fiscais e Providências; Demonstrativo I - Metas Anuais;
      Demonstrativo II - Avaliação do Cumprimento das Metas Fiscais do Exercício Anterior; Demonstrativo III - Das
      Metas Fiscais Atuais Comparadas com as Fixadas nos Três Exercícios Anteriores; Demonstrativo IV - Evolução do
      Patrimônio Líquido; Demonstrativo V - Origem e Aplicação dos Recursos Obtidos com a Alienação de Ativos;
      Demonstrativo VI - Avaliação da Situação Financeira e Atuarial do RPPS; Demonstrativo VIII - Margem de Expansão
      das Despesas Obrigatórias de Caráter Continuado.

## Item 3 - Software de Demonstrativos Financeiros

*Fonte: Anexo I, página 18/194.*

- [ ] **1.** Sistema Automatizar todos os lançamentos da Disponibilidade por Fonte de Recurso (DFR), criados pela
      utilização do Plano de Contas Aplicados ao Setor Público (PCASP).

- [ ] **2.** Permitir o levantamento e o lançamento da Disponibilidade por Fonte de Recurso (DFR), para emissão do
      quadro do Superávit/déficit Financeiro do Balanço Patrimonial, presente no anexo 14 da Lei 4320/64 e do
      Demonstrativo de Disponibilidade de Caixa e dos Restos a Pagar, relativo ao anexo 5, da Lei de Responsabilidade
      Fiscal (LRF).

## Item 5 - Software de Tesouraria

*Fonte: Anexo I, páginas 18-21/194.*

- [ ] **1.** Possuir banco de dados multiexercício e multientidades.

- [ ] **2.** Possibilitar configuração de parâmetro de Controlar movimentação diária nos cadastros, assim
      possibilitando ao usuário abrir a movimentação diária por data e fechando as movimentações por data e ainda
      reabrir o movimento caso necessário. E visualizar em listagem daqueles movimentos por data e os que estão
      abertos e fechados.

- [ ] **3.** Com o fechamento do movimento por data, o sistema não deverá permitir inclusões de rotinas como
      transferências bancárias, ajustes e pagamentos e deverá informar nos cadastros que é necessário selecionar uma
      movimentação aberta.

- [ ] **4.** Permitir a edição de pagamentos já realizados, bem como a inclusão e exclusão de documentos vinculados no
      pacote.

- [ ] **5.** Permitir o cadastro das Contas Bancárias pertencentes à entidade. No cadastro de contas cadastrar os
      dados bancários, organogramas, responsável, controle de vigência da conta com data inicial, data final e motivos
      para alteração da situação da conta seja ativa e inativa, e administração de recursos informando os recursos
      administradores e movimentadores

- [ ] **6.** Permitir vincular os recursos movimentados e administrados no cadastro das Contas Bancárias.

- [ ] **7.** Permitir o cadastro de Credores informando Nome do credor, CPF/CNPJ, data da inclusão, dados pessoais,
      dados dos documentos como Naturalidade, Nacionalidade, RG, órgão emissor, UF, data de emissão e possa ser
      informado também o PIS/PASEP/NIT, Inscrição municipal e município da inscrição. Inserir ainda a informação das
      contas bancárias, selecionar se é produtor rural ou prestadores de serviços, classificando e informando as
      naturezas de rendimentos para cada credor para o envio ao EFD-Reinf.

- [ ] **8.** Possibilitar pagamento de valores totais ou parciais de empenhos, liquidado e visualizar em listagem
      somente os empenhos e liquidações, com a informação do credor, conta bancária, recursos e saldo a pagar.

- [ ] **9.** Possibilitar na gestão de pagamentos a pesquisa e listagem dos documentos de empenhos, despesas extras e
      devolução de receita a pagar por opção de período de emissão e vencimentos sem a necessidade de emissão de
      relatórios.

- [ ] **10.** Permitir inserir mais de uma Retenções pagamentos de empenhos, restos a pagar e despesas extras
      inserindo o tipo da retenção e valor.

- [ ] **11.** Permitir inserir mais de uma Retenção na liquidação de empenhos e liquidação de restos a pagar.

- [ ] **12.** Possibilitar registrar Transferências Bancárias informando a Data, conta bancária de origem, tipo da
      conta origem, recurso e valor e informações da conta destino, tipo da conta destino, tipo de aplicação destino,
      finalidade, data de vencimento.

- [ ] **13.** Possibilitar no próprio cadastro de as Transferências Bancárias efetuar a baixa da transferência,
      informando data, transação e número do documento.

- [ ] **14.** Possibilitar efetuar a cópia de Transferências bancárias de uma já existente. Na cópia o sistema de
      trazer todos os campos preenchidos exceto a data, facilitando e agilizando a inclusão das transferências.

- [ ] **15.** Controlar a movimentação de pagamentos, registrando todos os pagamentos efetuados contra caixa ou
      bancos, permitindo estornos, efetuando os lançamentos automaticamente nas respectivas contas contábeis e
      possibilitar consultas rápidas dessas movimentações por conta bancária sem a necessidade de relatórios.

- [ ] **16.** Propiciar a emissão de borderôs ordens bancárias para pagamentos a fornecedores de uma mesma instituição
      bancária, efetuando o mesmo tratamento caso o pagamento seja realizado individualmente.

- [ ] **17.** Permitir gerar os arquivos relativos às ordens bancárias para pagamento dos fornecedores com crédito em
      conta bancária. Os arquivos deverão ser configuráveis e já possuir modelos das principais instituições
      bancárias.

- [ ] **18.** Permitir o bloqueio de pagamento de fornecedores em débitos com a fazenda pública municipal.

- [ ] **19.** Permitir a emissão de Boletim da movimentação Geral demonstrando a movimentação de entradas e saídas,
      posição dos saldos bancários com a informação do banco, agência, conta, entras e saídas e saldo atual.

- [ ] **20.** Propiciar a demonstração do Boletim diário das despesas orçamentárias e extraorçamentárias realizadas,
      com natureza da despesa, descrição, valor dia, acumulado mês e total do ano .

- [ ] **21.** Propiciar a demonstração de saldos bancários, disponibilizando Balancete bancário com opção de detalhar
      as contas bancárias por Recursos e Tipos de aplicação, selecionando a consulta de uma, mais de uma ou todas as
      contas bancárias e recursos e demonstrando na exibição as contas bancárias, saldo por recurso, saldo anterior,
      entradas, saídas e saldo atual.

- [ ] **22.** Permitir a inclusão de ingressos financeiros provenientes de receitas orçamentárias do município.

- [ ] **23.** Permitir que sejam emitidas notas de ordem de pagamento, restos a pagar, despesa extra e respectivas
      anulações.

- [ ] **24.** Permitir consultar auditoria dos registros nos principais cadastros do sistema, como de transferência
      bancária, ajuste de recurso, resgate, aplicação, depósito bancário, saldo inicial bancário e saque bancário.

- [ ] **25.** Propiciar o sistema sugerir as contas do credor e da entidade nos pagamentos por meio da inserção da
      ordem de baixa no cadastro da liquidação.

- [ ] **26.** Possibilitar a realização da cópia de Conciliação Bancária. Os dados devem ser copiados e a gravação
      realizada conforme Dados cadastrais, Conta bancária, Tipo de Conta, Tipo de Aplicação, Saldo do extrato e todas
      as Pendências facilitando novas conciliações sem necessidade de nova digitalização.

- [ ] **27.** Permitir fácil consulta nos cadastros das Conciliação Bancária, a visualização do saldo financeiro,
      saldo do extrato e saldo a conciliar. E também demonstrar o status da conciliação se está em elaboração,
      concluídas e com inconsistentes por meio da listagem e ainda realizar operações de edições e exclusões dos
      mesmos.

- [ ] **28.** Permitir ao usuário a utilização de dados do extrato bancário a partir da importação do arquivo, em
      formato OFX e OFC - tipos de arquivos usados para armazenar informações financeiras, geralmente aplicados pelos
      bancos, no processo de conciliação de contas bancárias da entidade. O sistema deve permitir a exclusão de itens
      do extrato a conciliar, indiferente de serem manuais ou importados.

- [ ] **29.** Permitir a construção da visualização da gestão de pagamentos conforme a necessidade de cada usuário
      inserindo colunas, detalhes, numeração e ordenação para melhor visualização.

- [ ] **30.** Possibilitar nos pagamentos que constam vários documentos de empenhos tenha a opção de inserir os dados
      da conta bancária para todos os documentos simultaneamente sem a necessidade de informar individualmente.

- [ ] **31.** Possibilitar ao usuário visualizar com os registros dos pagamentos de despesas extras, liquidações de
      empenhos e subempenhos por meio da listagem, realizando a visualização somente dos que possuem saldo a pagar.

- [ ] **32.** Permitir ao usuário selecionar um ou mais itens de contas a pagar, sejam referentes a despesas extras,
      empenhos, e subempenhos, formando um agrupamento para a realização de um único pagamento. Pagamento este que
      pode ser baixado com diversas transações bancárias (cheque, banco, remessa bancária) ou única, conforme
      necessidade.

- [ ] **33.** Propiciar na baixa dos pagamentos de empenhos de adiantamentos e diárias dos servidores das entidades o
      preenchimento automático da informação do cartão corporativo quando existir.

- [ ] **34.** Possibilitar cadastro das Devoluções de Receitas com Data, Dedução, valor, credor, conta bancária,
      finalidade, Receita e valor, data de vencimento e ordem de baixa. E possibilitar a visualização as informações
      cadastradas por meio de listagem e com emissão de uma e mais notas de devoluções a partir das respectivas
      visualizações.

- [ ] **35.** Permitir a identificação no sistema com tag nos pagamentos de empenhos que foram pagos pelo sistema da
      contabilidade.

- [ ] **36.** Possibilitar realizar Ajustes de saldos de Recursos inserindo data, categoria, valor, recurso origem,
      origem destino, conta bancária, tipo da conta, tipo de aplicação e finalidade.

- [ ] **37.** Possibilitar consulta dos Ajuste de Recursos com consultas por filtros de Período, recurso origem e
      recurso destino e visualização por categoria de conta bancária, dinheiro, retenção e receita extra orçamentária.

- [ ] **38.** Permitir a configuração de acesso em diversas funcionalidades para usuários conforme o órgão e unidade
      orçamentária a que ele está vinculado, bloqueando assim acesso a movimentos de outras unidades orçamentárias,
      inclusive a visualização de registros em listagem.

- [ ] **39.** Permitir, por meio de interação entre sistemas, o envio de dados financeiros das movimentações bancárias
      ao portal de transparência para a população em conformidade com a Lei de Acesso à Informação de Nº 12.527/11.

- [ ] **40.** Propiciar controle e conferências dinâmicas em tela da Gestão Bancária, visualizando as contas bancárias
      com detalhamentos das movimentações de entradas e saídas e valores das contas. Ainda possibilitando configurar
      as emissões por Período Anual, Mensal e Diário, modo de visualização, exibição totalizando por dia, apenas saldo
      atual, apenas contas com movimento no período, seleção de todos os bancos, todas as agências e todas as contas e
      apenas as contas e recursos conforme usuário desejar.

- [ ] **41.** Possibilitar na Gestão bancária a inclusão de Resgate de aplicação bancária com as informações de Data,
      Tipo, valor, conta bancária, finalidade e recursos.

- [ ] **42.** Permitir a inclusão de Depósito bancário inserindo a Data, conta bancária, valor, finalidade e recursos.

- [ ] **43.** Permitir a inclusão de Saque bancário inserindo a Data, conta bancária, valor, finalidade e recursos.

- [ ] **44.** Permitir a inclusão de Ajustes bancário inserindo a Data, tipo de entrada e saída, conta bancária,
      valor, finalidade e recursos

- [ ] **45.** Possibilitar a inclusão de Saldo Inicial bancário inserindo a Data, conta bancária, valor, finalidade e
      recursos.

- [ ] **46.** Possibilitar a consulta de pagamentos efetuados por período, entidade, para os tipos de documentos como
      Restos, empenhos do exercício, despesas extras e devoluções de receita. e visão podendo agrupar as informações
      por Entidade, credor, conta bancária, data do pagamento, tipo de documento, recursos do empenho, organograma e
      ação. Além disso, também inserir um e mais credores, conta banco, número do empenho, natureza da despesa e
      recursos.

## Item 6 - Software de Tributos e Arrecadação

*Fonte: Anexo I, páginas 21-30/194.*

- [ ] **1.** Permitir, ao cadastrar uma pessoa física ou jurídica, vincular mais de um endereço, informando CEP,
      município, logradouro, número, descrição de endereço, complemento, condomínio, bloco, apartamento, loteamento,
      bairro, distrito e caso julgar necessário, incluir observações ao endereço. Em casos onde o contribuinte possuir
      mais de um endereço, possibilitando sinalizar qual destes será o endereço principal.

- [ ] **2.** Permitir ao cadastrar uma pessoa jurídica, realizar o vínculo de sócios à mesma, informando o nome, sua
      qualificação profissional, o responsável pela sociedade e qualificação, as datas de inclusão e desligamento do
      sócio e o respectivo percentual de participação, verificando automaticamente os percentuais de participação,
      impedindo que os percentuais de sociedade ultrapassem 100% (cem por cento).

- [ ] **3.** Realizar movimentações nos cadastros de contribuintes, podendo alterar sua situação para ativo ou inativo
      e incluir averbações cadastrais informando o processo e devidas observações, permitindo incluir também
      comentários às movimentações, mantendo histórico de alterações realizadas.

- [ ] **4.** Permitir anexar arquivos ao cadastro de contribuintes, com tamanho máximo 10mb e extensões PDF, DOC,
      DOCX, TXT, XLS, XLSX, DWG, DWF, DXF, CSV, ODS, ODT, ZIP, RAR, SKP, RVT, CAD, JPG, JPEG, PNG, BMP, com a opção de
      consultar todos os arquivos anexados ao cadastro, inserir comentário no anexo, bem como remover arquivos
      eventualmente incluídos indevidamente.

- [ ] **5.** Permitir a criação de novos campos complementares aos cadastros padrões disponibilizados, sendo estes nos
      formatos área de texto, CNPJ, CPF, data, data e hora, e-mail, hora, lista de seleção, múltipla seleção,
      numérico, telefone e texto, com a indicação do rótulo, texto de ajuda e validade inicial e final do campo.

- [ ] **6.** Permitir consultas cadastrais através: nome; parte do nome; CNPJ/CPF, RG, endereço, inscrição cadastral.

- [ ] **7.** Possuir cadastro de averbações para: Contribuintes; Imóveis; Econômicos, permitindo inserir o código do
      processo.

- [ ] **8.** Possuir cadastro de averbações e comentários nas Dívidas.

- [ ] **9.** Possibilitar que seja alterado um comentário do cadastro de contribuinte, imóvel e econômico, indicando
      que houve alteração, quem fez e quando (data e hora) houve a alteração.

- [ ] **10.** Permitir a consulta dos históricos das alterações cadastrais (cadastro de contribuintes, cadastro
      imobiliário e cadastro mobiliário), incluindo a data, hora, usuário responsável e o campo modificado. Esse
      histórico deve ser exibido diretamente na consulta do cadastro, facilitando a identificação das alterações
      realizadas.

- [ ] **11.** Permitir a utilização de várias moedas no sistema (UFIR, Reais, UFM) com possibilidade de indexadores
      por intervalos de datas.

- [ ] **12.** Permitir cadastrar unidades de medidas, estabelecendo descrições, símbolos, grandeza e fracionamento
      quando houver, por meio de medidas definidas pelo INMETRO.

- [ ] **13.** Manter uma tabela de dias não úteis para fins de cálculo de juro/multa, permitindo indicar a abrangência
      (municipal, estadual ou nacional) e o tipo (fixo ou variável).

- [ ] **14.** Permitir o cadastramento das imobiliárias, com as informações da pessoa jurídica acrescido do número do
      CRECI.

- [ ] **15.** Permitir o cadastro dos cartórios de registro civil, registro de títulos, registro de imóveis,
      tabelionato de notas, tabelionato de protesto, tabelião e correspondente bancário.

- [ ] **16.** Possuir cadastros de ruas, faces do imóvel, bairros, distritos, loteamentos, condomínios, loteamentos,
      seções e localidades para utilização no cadastramento dos contribuintes, imóveis e econômicos.

- [ ] **17.** Permitir que os campos que compõem a inscrição imobiliária sejam configuráveis, podendo alterar a ordem,
      tamanho e a descrição dos campos, permitindo a inclusão de informações alfanuméricas, caso seja necessário.

- [ ] **18.** Possuir cadastro de imóvel urbano e rural, configurável conforme boletim cadastral da Prefeitura, com a
      possibilidade de inserir campos numéricos (inteiros e decimais), datas, horas e textos.

- [ ] **19.** Permitir a inclusão de um ou mais contribuintes como proprietários do imóvel controlando o percentual de
      participação sobre o imóvel, podendo definir o responsável pelo imóvel e ainda, permitir vincular um
      contribuinte como corresponsável pelo imóvel.

- [ ] **20.** Permitir adicionar mais de um corresponsável ao cadastro de corresponsáveis de um imóvel, permitindo
      relacionar o tipo desejado (ex: arrendatário, compromissário, herdeiro, inventariante, possuidor, usufrutuário),
      indicando início e fim da titularidade.

- [ ] **21.** Permitir adicionar ao cadastro de logradouro contendo lei/ato, decreto e/ou denominação.

- [ ] **22.** Permitir no cadastro dos logradouros informar a geolocalização, através da seleção pelo mapa/satélite ou
      informar manualmente a latitude e a longitude.

- [ ] **23.** Permitir definir se o código do endereço será informado automaticamente (o sistema faz o controle
      automático sequencial) ou manualmente (permite que o usuário informe o código ao cadastrar) no momento do
      cadastro.

- [ ] **24.** Possibilitar por meio do cadastro de imóveis, realizar a visualização de uma imagem ou mapa da
      localização dos imóveis, contendo acesso ao google maps, onde através do endereço informado seja possível
      efetuar a busca deste no mapa.

- [ ] **25.** Possibilitar cadastrar pontos notáveis para realizar a indicação de uma posição geográfica, inclusive
      vinculando imóveis ao ponto notável

- [ ] **26.** Permitir, por meio do cadastro de imóveis, determinar para qual endereço serão remetidas as
      correspondências, com a possibilidade de optar entre os endereços do próprio imóvel, do responsável,
      corresponsável ou imobiliária. Inclusive possibilitando incluir novo endereço vinculado ao proprietário,
      responsável ou corresponsável.

- [ ] **27.** Permitir por meio do cadastro de imóveis, consultar as informações dos benefícios fiscais concedidos ao
      imóvel, com a possibilidade de conferir a descrição do benefício, a receita tributária, período de vigência,
      data de revogação caso ocorrer e situação do benefício.

- [ ] **28.** Permitir realizar manutenção em grandes quantidades no cadastro imobiliário. Os campos deverão ser
      alterados de forma simultânea, permitindo reverter as alterações se necessário.

- [ ] **29.** Permitir adicionar as fotos do imóvel com tamanho máximo de 10mb e extensões PDF, DOC, DOCX, TXT, XLS,
      XLSX, DWG, DWF, DXF, CSV, ODS, ODT, ZIP, RAR, SKP, RVT, CAD, JPG, JPEG, PNG, BMP no cadastro dos imóveis.

- [ ] **30.** Possuir cadastro de testadas, possibilitando o cadastro de quantas forem necessárias, incluindo o
      controle por ano

- [ ] **31.** Possibilitar que através do cadastro de imóveis, seja possível emitir o extrato financeiro do
      contribuinte e o espelho do cadastro imobiliário.

- [ ] **32.** Permitir a partir do cadastro de imóveis, efetuar a cópia dos dados cadastrais, gerando novos imóveis
      com as mesmas informações, podendo ainda indicar o(s) campo(s) variável(eis) da inscrição imobiliária.

- [ ] **33.** Possibilitar na consulta do imóvel visualizar o histórico de todas as transferências anteriores
      efetuadas e as movimentações de desmembramento, englobamento e remembramento, quando houver.

- [ ] **34.** Conter um cadastro de imóveis rurais, em que seja possível inserir informações relacionadas ao Incra e
      planta de valores específica para este tipo de imóvel, onde as informações possam também servir de subsídio para
      o cálculo do ITR.

- [ ] **35.** Permitir a partir da consulta do imóvel acessar o cadastro do contribuinte associado ao imóvel, sem
      precisar acessar outra funcionalidade do sistema.

- [ ] **36.** Permitir o englobamento de imóveis, ainda que de lotes diferentes, para a emissão de carnês.

- [ ] **37.** Permitir identificar imóveis englobados por meio da listagem de imóveis apresentados na tela de
      pesquisa.

- [ ] **38.** Possibilitar consultar as informações do englobamento do imóvel por meio da consulta do cadastro do
      imóvel. Quando realizado englobamento ou desmembramento de um imóvel, permitir que seja inserida uma
      movimentação no respectivo cadastro indicando a ação realizada.

- [ ] **39.** Permitir que haja Planta de Valores e que seja configurável conforme boletim cadastral e a localização
      do imóvel.

- [ ] **40.** Permitir realizar atualização do valor de m² de uma planta de valores, podendo realizar acréscimo ou
      decréscimo no valor configurado, determinando se a atualização será em valor ou percentual, determinar o ano
      para qual a atualização será aplicada e ainda permitir que a atualização seja aplicada para várias plantas de
      valores.

- [ ] **41.** Propiciar a integração via API e/ou webservice com empresas de geoprocessamento, entre outras soluções
      utilizadas pela contratante.

- [ ] **42.** Propiciar a alteração do cadastro de imóveis devido a ajustes do geoprocessamento.

- [ ] **43.** Permitir desmembramentos e remembramentos de imóveis. Para desmembramento, indicar máximo de lotes pela
      metragem mínima legal.

- [ ] **44.** Permitir a inclusão de arquivos digitalizados aos desmembramentos e remembramento de imóveis, com
      tamanho máximo de 10mb, permitindo as seguintes extensões: PDF, DOC, DOCX, TXT, XLS, XLSX, DWG, DWF, DXF, CSV,
      ODS, ODT, ZIP, RAR, SKP, RVT, CAD, JPG, JPEG, PNG, BMP.

- [ ] **45.** Permitir parametrizar todas as rotinas de cálculo da Contribuição de Melhoria, conforme a obra, e que
      atenda a legislação.

- [ ] **46.** Permitir indicar os imóveis que serão beneficiados por uma contribuição de melhoria, informando se o
      imóvel será aderente à contribuição de melhoria, a data de adesão, o valor de venda do imóvel e percentual de
      valorização, apurando automaticamente o valor de valorização, possibilitando configurar número e intervalo de
      vencimento das parcelas de forma individual para cada imóvel aderente à contribuição de melhoria.

- [ ] **47.** Permitir o controle de propostas efetuadas para valores e formas de pagamento de uma contribuição de
      melhoria, podendo realizar o comparativo entre as propostas inicial e final, visualizando por proposta o valor
      máximo de parcelas, período de vencimento, percentual de juros de financiamento, valor mínimo de amortização por
      parcela e percentual de participação da entidade.

- [ ] **48.** Permitir relacionar os materiais e serviços que serão necessários para execução de uma contribuição de
      melhorias, apurando valor de forma separada por material e serviço.

- [ ] **49.** Permitir realizar movimentações nas contribuições de melhorias, podendo cancelar, concluir ou suspender
      uma melhoria, incluindo comentários e anexos e mantendo histórico das movimentações realizadas

- [ ] **50.** Permitir determinar as alíquotas a serem aplicadas ao cálculo do crédito tributário de transferência de
      imóveis, podendo configurar alíquotas diferenciadas para o valor à vista, valor financiado, outros valores
      pertinentes a transmissão e benfeitorias. Bem como alíquotas diferenciadas por tipo/motivo de transação.

- [ ] **51.** Permitir realizar a definição da forma como ocorrerá a transferência do imóvel ao identificar a quitação
      do crédito tributário a ela relacionado, com opção de transferir automaticamente ou exigir intervenção manual
      para efetivação da transação. E ainda, permitir aplicar a mesma verificação para casos onde a transferência é
      isenta do imposto.

- [ ] **52.** Propiciar a geração de ITBI para imóveis rurais com opção de cadastro ou não do imóvel envolvido na
      transação.

- [ ] **53.** Propiciar o cadastro automático de imóveis rurais quando for cadastrado um ITBI Rural de um imóvel que
      não possua ainda cadastro.

- [ ] **54.** Propiciar a geração de um único cadastro de ITBI para transferência de diversos imóveis com vendedores e
      compradores diferentes.

- [ ] **55.** Possibilitar que, ao finalizar o cadastro do ITBI, seja questionado ao usuário se deseja emitir o carnê
      e/ou a certidão do ITBI referente ao processo efetuado, e a funcionalidade só poderá ser solicitada já tenha
      ocorrido o cálculo do ITBI.

- [ ] **56.** Permitir a solicitação ITBI on-line pelos tabelionatos para imóveis urbanos ou rurais.

- [ ] **57.** Permitir configurar se a solicitação de transferência de imóveis poderá ser realizada para imóveis
      urbanos, rurais ou ambos.

- [ ] **58.** Permitir validar pendências financeiras ao deferir uma solicitação de transferência automaticamente.

- [ ] **59.** Permitir definir se o lançamento na solicitação ITBI on-line será gerado automaticamente ou ficará
      pendente para análise do usuário fiscal.

- [ ] **60.** Permitir que o fiscal identifique, na solicitação de ITBI online, se houve retificação de alguma
      informação, detalhando quais dados foram alterados, a data e hora da modificação, além do responsável pela
      alteração.

- [ ] **61.** Permitir indicar os usuários que deverão ser notificados quando uma solicitação de transferência de
      imóveis for cadastrada ou quando o cartório realizar alguma movimentação na solicitação.

- [ ] **62.** Permitir a inserção de pareceres na solicitação de transferência de imóveis, texto livre de até 4000
      caracteres.

- [ ] **63.** Permitir que ao consultar/visualizar as informações de uma solicitação de transferência de imóveis, seja
      possível consultar as informações do cálculo do imposto de ITBI.

- [ ] **64.** Permitir, através de inteligência artificial, que o sistema liste os fatores que influenciaram o valor
      de mercado sugerido, histórico das transferências realizadas para um determinado imóvel e ainda, histórico de
      transferências realizadas para imóveis que possuem características semelhantes.

- [ ] **65.** Permitir, durante o processo de transferência de imóvel, que o usuário identifique através de
      inteligência artificial quando o valor da venda de um imóvel não está de acordo com o valor de mercado.

- [ ] **66.** Possuir alerta ao usuário quando um valor de venda do imóvel estiver abaixo do valor de venda do
      mercado, sugerindo ainda através de inteligência artificial, o valor aproximado da venda de um imóvel conforme
      valor de mercado durante o processo de ITBI.

- [ ] **67.** Permitir emitir a simulação de transferência de imóvel em PDF, sem que a transferência ocorra de fato.

- [ ] **68.** Possuir cadastros mobiliário (econômico) e de atividades configuráveis, conforme boletim cadastral da
      Prefeitura, com a possibilidade de inserir campos numéricos (inteiros e decimais), datas, horas e textos a
      qualquer momento.

- [ ] **69.** Permitir que o cadastro mobiliário possa referenciar o cadastro imobiliário.

- [ ] **70.** Permitir gerenciar econômicos do contribuinte visualizando o posicionamento geográfico do endereçamento
      através de mapa, contendo acesso ao Google Maps.

- [ ] **71.** Possui configuração para definir se será permitido ou não o cadastro de múltiplos econômicos ativos para
      uma mesma pessoa física.

- [ ] **72.** Permitir anexar arquivos ao cadastro de Econômicos com a opção de consultar todos os arquivos anexados
      ao cadastro, bem como remover arquivos eventualmente incluídos indevidamente.

- [ ] **73.** Possibilitar a emissão dos alvarás de licença localização e funcionamento, sanitário e provisório, com a
      possibilidade de definir o prazo validade por data ou intervalo de dias, incluir informações complementares e
      selecionar um modelo de documento previamente configurado no sistema.

- [ ] **74.** Propiciar o controle das situações dos econômicos em atividade, em aberto com alvará provisório,
      suspensão das atividades, irregular, baixa das atividades e cancelamento das atividades.

- [ ] **75.** Propiciar após a baixa, a emissão de relatório com o demonstrativo do movimento para conferência.

- [ ] **76.** Atender integralmente ao que rege a resolução IBGE/CONCLA Nº 01 de 25/06/1998 atualizada pela resolução
      CONCLA Nº 07 de 16/12/2002 que prevê o detalhamento do CNAE (Código de Classificação Nacional de Atividades
      Econômicas).

- [ ] **77.** Possuir cadastro da lista de serviços adequado à Lei Complementar 116/03 e também com as atualizações e
      novos itens criados pela Lei Complementar 157/2016.

- [ ] **78.** Possibilitar o relacionamento entre a CNAE e os itens de serviços constantes na lista da lei
      complementar 116/2013 e também com as atualizações e novos itens criados pela Lei Complementar 157/2016.

- [ ] **79.** Permitir realizar a classificação de atividade econômica conforme as opções agropecuária e pesca,
      indústria, meio ambiente, comércio e serviço.

- [ ] **80.** Permitir realizar a classificação do risco das atividades econômicas, de forma a apoiar o processo de
      análise para emissão de licenças ou autorizações para funcionamento, dispondo das seguintes classificações:
      normal; baixo risco; médio risco; alto risco, além de possibilitar diferenciar o MEI e demais tipos econômicos.

- [ ] **81.** Permitir realizar o controle dos valores das atividades econômicas, de forma a indicar os valores dos
      alvarás por data, do valor para cobrança de ISSQN e ISS fixo, com data e percentual a ser aplicado.

- [ ] **82.** Permitir efetuar o cadastro de horários de funcionamento para vínculo com as empresas, informando a
      descrição do horário, dias e horários de funcionamento.

- [ ] **83.** Propiciar a importação de arquivos de Períodos e Eventos do Simples Nacional.

- [ ] **84.** Permitir a validação de pendências financeiras dos CNPJ’s optante do simples nacional, enviados pela
      Receita Federal.

- [ ] **85.** Permitir a emissão de notas avulsas e realizar movimentações na situação da mesma, com a opção de anular
      a nota, realizar uma cópia ou fazer a sua emissão.

- [ ] **86.** Permitir a consulta das notas fiscais avulsas cadastradas, visualizando as informações de número e
      série, data de emissão, nomes do prestador e do tomador, consulta dos serviços vinculados a nota, valor total da
      nota, valor de ISSQN, visualizar se o imposto foi lançado ou não e verificar a situação da nota.

- [ ] **87.** Permitir emissão da nota fiscal avulsa somente após quitação do imposto devido pelo prestador de
      serviços incidente na mesma.

- [ ] **88.** Permitir a configuração da tabela de cálculo das alíquotas do IRRF com base nos valores determinados
      pela Receita Federal, para apuração do respectivo imposto na emissão de notas fiscais avulsas.

- [ ] **89.** Permitir que sejam parametrizados todos os tributos, quanto à sua fórmula de cálculo, acréscimos,
      correção e índices, moedas etc.

- [ ] **90.** Permitir alterações nas fórmulas de cálculo, possibilitando cálculos complementares, e ainda permitir
      cálculos individuais ou de um grupo de contribuintes.

- [ ] **91.** Possibilitar a cobrança de taxas por prestação de serviços ao contribuinte, por meio do lançamento de
      uma receita diversa, permitindo registrar o serviço prestado, a receita para qual será lançado o crédito
      tributário, o contribuinte, o código do processo administrativo que originou o serviço e imóvel ou econômico
      para qual o serviço será prestado.

- [ ] **92.** Permitir a consulta das receitas diversas cadastradas na Entidade.

- [ ] **93.** Permitir a cobrança de mais de uma taxa no mesmo lançamento, pela alteração do cadastro de empresas,
      possibilitando definir o tipo de alteração cadastral passível de cobrança de taxa.

- [ ] **94.** Propiciar que seja feito cálculo simulado baseado no histórico de alterações, exercícios anteriores,
      dados cadastrais do exercício atual, considerando os parâmetros de cálculo do exercício solicitado.

- [ ] **95.** Manter o histórico dos valores calculados de cada exercício.

- [ ] **96.** Possibilitar em ambiente centralizado, a consulta de informações cadastrais e financeiras de um
      contribuinte, imóvel ou econômico, oferecendo diversas opções de filtragens.

- [ ] **97.** Permitir gerar extrato da movimentação financeira do contribuinte demonstrando os tributos pagos, em
      aberto, cancelados ou parcelados, corrigido com valores em aberto, atualizados até a data atual ou data de
      referência informada pelo usuário.

- [ ] **98.** Indicar a existência de lançamentos ou dívidas suspensas e/ou Lançamentos abaixo do limite.

- [ ] **99.** Permitir por meio de consulta unificada do contribuinte, visualizar os documentos emitidos em seu nome,
      como Certidão Negativa de Débitos, Alvarás de localização, provisório ou sanitário, Notificações de lançamentos
      e Certidões de ITBI, onde para cada item citado, permitir que seja realizada uma nova emissão.

- [ ] **100.** Permitir a emissão da certidão positiva, negativa e positiva com efeito negativa, para diversas
      finalidades (configuráveis) para imóveis, econômicos ou contribuintes, verificando os débitos eventualmente
      existentes de todas as receitas.

- [ ] **101.** Possibilitar ao cadastrar convênios bancários, determinar uma validade para o identificador de número
      de baixa (nosso número) de pagamento conforme prazo estabelecido para instituição financeira.

- [ ] **102.** Permitir ao usuário consultar todos os bancos nacionais, conforme lista da FEBRABAN, independentemente
      de ser um banco associado a ela ou não, detalhando o número, a sua descrição, sigla, CNPJ, site e informações de
      associação ou não FEBRABAN.

- [ ] **103.** Permitir configuração de modelos de guias e/ou carnês pelo próprio usuário.

- [ ] **104.** Emitir guias e/ou carnês dos créditos tributários e dívida ativa, bem como segunda via desses,
      imprimindo opcionalmente algumas parcelas. Propiciar também a emissão de notificação de lançamento endereçada
      aos contribuintes que tiverem lançamentos.

- [ ] **105.** Possibilitar a emissão da segunda via da guia de pagamento, contendo nova data de vencimento no boleto,
      além dos valores dos acréscimos (correção, juros e multa), calculados até a nova data de vencimento.

- [ ] **106.** Permitir que sejam gerados arquivos para a impressão dos carnês por terceiros.

- [ ] **107.** Poder emitir parcela unificada para pagamento, relacionando todos os débitos correntes, dívidas ativas
      e parcelas de parcelamentos em aberto.

- [ ] **108.** Possuir rotina que realize o registro bancário automaticamente à geração dos lançamentos tributários,
      para pagamento em qualquer banco.

- [ ] **109.** Permitir realizar a baixa dos pagamentos dos lançamentos de créditos tributários de forma automática,
      onde o responsável pela baixa informa o convênio bancário cujas baixas devem ser vinculadas e realiza a
      importação do arquivo de retorno bancário, contendo a relação dos pagamentos para que o sistema automaticamente
      localize os lançamentos e registre os respectivos pagamentos.

- [ ] **110.** Permitir ao responsável pela baixa automática de pagamentos, a partir da homologação dos pagamentos,
      identificar os pagamentos que eventualmente apresentarem alguma inconsistência, podendo realizar a consulta de
      forma detalhada dos pagamentos realizados em parcelas canceladas, eliminadas, suspensas, já pagas ou pagamentos
      cujo lançamento não foi identificado.

- [ ] **111.** Possibilitar que a baixa de arquivos de arrecadação fornecidos pelos bancos seja efetuada em segundo
      plano, apenas notificando o usuário sobre o andamento e finalização do processo.

- [ ] **112.** Permitir que seja realizada a baixa dos pagamentos dos lançamentos de créditos tributários de forma
      manual, indicando o motivo da baixa, número do processo e observações sobre a baixa.

- [ ] **113.** Permitir o controle por permissão para homologação das baixas manuais, sendo possível a indicação de
      uma ou várias pessoas com permissão para homologar.

- [ ] **114.** Permitir realizar a consulta das baixas manuais de pagamentos registradas no sistema, possibilitando
      diferenciar as baixas que estão disponíveis para homologar, das baixas que já constam homologadas e ainda
      permitir buscar por pagamentos que tenham sofrido estorno, apresentando convênio, CPF/CNPJ e nome do
      contribuinte, data do pagamento, data de crédito, valor do pagamento e usuário que realizou a operação.

- [ ] **115.** Permitir realizar o estorno da baixa de pagamentos realizada a partir da importação de um arquivo de
      retorno bancário, estornando automaticamente todos os pagamentos relacionados no arquivo.

- [ ] **116.** Permitir a configuração de valores referente a limites de diferenças de arrecadação, aplicáveis em
      casos de identificação de pagamentos a menor, para geração de parcela complementar, podendo ser o controle
      diferenciado por baixa manual e baixa automática, e ainda por crédito tributário.

- [ ] **117.** Possibilitar realizar compensação de valores, sendo que os créditos pagos a maior ou pagos duplicados,
      possam ser compensados com outros créditos do mesmo contribuinte que estejam em aberto, podendo compensar em sua
      totalidade ou não.

- [ ] **118.** Possibilitar a geração de saldo, a compensar ou restituir, de valores pagos de forma equivocada por
      contribuintes, informando os dados do pagamento equivocado, e gerando o saldo para o contribuinte que efetuou o
      pagamento.

- [ ] **119.** Permitir realizar alterações de lançamentos pagos, de forma a gerar saldos quando for o caso de
      pagamentos duplicados ou a maior para que sejam devolvidos ao contribuinte, indicando se a manutenção será
      realizada em um pagamento normal ou inconsistente, vinculando o tipo de inconsistência, informar o número do
      processo administrativo que originou a manutenção e registrar observações caso julgar necessário.

- [ ] **120.** Permitir realizar a antecipação ou prorrogação de vencimentos de lançamentos de créditos tributários de
      forma individual para um contribuinte, com a possibilidade de definir o ano do lançamento, número e receita da
      parcela que deseja alterar o vencimento, informando manualmente uma nova data ou estabelecendo um intervalo de
      tempo para o novo vencimento.

- [ ] **121.** Possuir cadastro para suspender lançamento integral do crédito tributário.

- [ ] **122.** Permitir a concessão de Remissão ao contribuinte para Débitos e Dívidas.

- [ ] **123.** Permitir o cadastro de benefício fiscal.

- [ ] **124.** Permitir a consulta dos requerimentos de benefícios fiscais ou manutenções de cálculo cadastrados,
      possibilitando verificar a data de cadastro, se individual ou geral, o nome do requerente, o número do processo
      administrativo, sua vigência e situação, se em análise, deferido ou indeferido, bem como consultar o histórico
      de movimentações aplicadas ao mesmo.

- [ ] **125.** Permitir desfazer ações realizadas em um requerimento a partir do deferimento ou indeferimento de
      benefício ou manutenção de cálculo, permitindo que ao desfazer a última ação, o requerimento volte a ficar em
      aberto para novo parecer.

- [ ] **126.** Permitir a contabilização dos valores referente aos lançamentos, Cancelamentos de lançamentos, Dívidas,
      Cancelamentos de Dívidas, Prescrição de Dívidas, Remissões, Isenções e Imunidades, bem como as arrecadadas dos
      valores das receitas.

- [ ] **127.** Permitir a conferência das arrecadações enviadas para contabilização, podendo visualizar as informações
      do lote como data, usuário de criação e situação, e ainda detalhar os pagamentos, com a possibilidade de incluir
      comentários aos pagamentos, realizar o envio dos dados ou excluir o lote em caso de alguma inconsistência.

- [ ] **128.** Permitir a geração de relatórios que contenham informações dos pagamentos de créditos tributários.

- [ ] **129.** Possuir rotina de inscrição em dívida com emissão do livro de dívida ativa, gerando informações sobre o
      ato da inscrição (livro, folha, data e número da inscrição), permitindo cálculos de atualizações e acréscimos.

- [ ] **130.** Possuir rotina de inscrição em dívida ativa, com a possibilidade de gerar uma dívida por lançamento, ou
      uma dívida por parcela de lançamento

- [ ] **131.** Possuir rotinas de movimentações e alterações de dívidas (anistias, prescrições, cancelamentos,
      suspensões e estornos).

- [ ] **132.** Possuir fórmulas que garantem uma maior agilidade na análise de dívidas quando houver necessidade de
      aplicar alguma legislação pertinente a anistias, cancelamentos, suspensões e remissões.

- [ ] **133.** Permitir realizar a homologação de uma movimentação realizada em Dívida Ativa, com a possibilidade de
      conferir as informações da dívida bem como os valores onde a movimentação, apenas será efetivada após a
      conferência e confirmação da operação.

- [ ] **134.** Permitir indicar se determinada receita de crédito tributário poderá ser inscrita em dívida ativa.

- [ ] **135.** Emitir notificação de cobrança administrativa para o contribuinte devedor, com parametrização do
      conteúdo da notificação.

- [ ] **136.** Permitir a integração com o sistema de procuradoria do município, referente aos dados pertinentes a
      emissão da petição para ajuizamento e ao acompanhamento do trâmite jurídico na identificação dos ajuizamentos,
      sem que haja a necessidade de redigitação em ambas as operações.

- [ ] **137.** Possuir rotina configurável de Parcelamento de Dívida Ativa: Podendo parcelar várias receitas,
      reparcelar parcelamentos em aberto; Lançamentos do exercício juntamente com Dívidas ativas; Dívidas executadas;
      Conceder descontos legais através de fórmulas configuráveis; Determinar valor mínimo por parcela; Cobranças de
      taxas de parcelamento.

- [ ] **138.** Permitir ao efetuar o parcelamento de créditos, realizar simulações quanto aos valores do parcelamento,
      visualizando o valor do tributo, valor de correção, juros, multa e valor total a parcelar, podendo determinar a
      quantidade de parcelas a gerar, o intervalo e data inicial de vencimento, adicionar reforços e taxas às
      parcelas, onde para cada valor informado, as parcelas são atualizadas automaticamente pelo sistema.

- [ ] **139.** Permitir a determinação do intervalo de data de vencimento para buscar as parcelas no momento de
      parcelar um crédito tributário.

- [ ] **140.** Sinalizar na rotina do parcelamento de crédito as dívidas que constam em Protesto e/ou Executadas.

- [ ] **141.** Permitir agregar ao parcelamento de dívidas, a cobrança de outros valores pertinentes a ela, como
      honorários, juros de financiamento, correção pré-fixada, taxa de expediente etc.

- [ ] **142.** Permitir, ao parcelar as dívidas, a inclusão de valores de reforços em parcelas, devido à sazonalidade
      de liquidez dos contribuintes.

- [ ] **143.** Permitir o controle da evolução dos pagamentos dos lançamentos e/ou dívidas que compõem o parcelamento

- [ ] **144.** Permitir o controle do saldo das dívidas, para que ao cancelar um parcelamento os dados originais das
      dívidas permaneçam

- [ ] **145.** Possibilitar emitir o termo de parcelamento de dívidas ativas e os lançamentos do exercício, permitindo
      constar no documento, a quantidade de parcelas, valores do tributo, correção, juros, multa, taxas, vencimentos e
      composição das dívidas que compõem o parcelamento.

- [ ] **146.** Possuir meios para identificação de maneira automática dos parcelamentos em atraso, podendo selecionar
      o número de parcelas atrasadas que se deseja filtrar, para que seja procedido o cancelamento do parcelamento de
      acordo com o que prevê a legislação municipal.

- [ ] **147.** Permitir a emissão de relação de contribuintes com maior valor em aberto (maiores devedores) com a
      possibilidade de visualizar as informações por tipo de lançamento de crédito (débito, dívida ou parcelamento)
      definindo a quantidade de contribuintes a serem demonstrados, créditos tributários, data inicial do vencimento e
      data final do vencimento.

- [ ] **148.** Propiciar que usuários com permissão específica para transferência de dívida realizem a transferência
      da dívida com situação aberta para outro contribuinte.

- [ ] **149.** Permitir o cadastro de projetos de obras para imóveis urbanos ou rurais, inclusive de obras realizadas
      nos imóveis do município, possibilitando realizar o acompanhamento da situação do projeto de obras por meio de
      suas movimentações.

- [ ] **150.** Controlar os projetos para emissão Alvará de Construção e Habite-se.

- [ ] **151.** Permitir a indicação do responsável pela execução da obra, contendo ao menos as seguintes opções:
      proprietário do imóvel, dono da obra, incorporador de construção civil, empresa construtora e consórcio.

- [ ] **152.** Permitir registrar as informações de coordenadas geográficas do imóvel no qual será executado o projeto
      de obra, de forma que seja possível controlar sua localização e consulta via mapas.

- [ ] **153.** Permitir que o usuário anexe documentos, imagens relacionadas ao projeto de obras, demonstrando a data
      e a hora em que foi anexado o arquivo.

- [ ] **154.** Permitir que o usuário visualize as obras que possuem alvará de licença que esteja vencido, devendo
      considerar alvará vencido, os documentos cuja data de validade é menor que a data atual.

- [ ] **155.** Permitir o cadastramento de construtoras, com as informações de pessoas jurídicas previamente
      cadastradas, o número e data de registro no CREA e a relação de engenheiros e arquitetos vinculados a ela.

- [ ] **156.** Permitir o vínculo dos responsáveis técnicos pelo projeto de obras, com as seguintes informações:
      Responsáveis, tipo de responsabilidade, Número e validade do CREA, Ocupação (CBO), Número da ART, Número da RRT
      e Número do TRT.

- [ ] **157.** Disponibilizar campos compatíveis ao SisObra, que poderão ser utilizados como base para o cadastro de
      obras e emissão do alvará e habite-se.

- [ ] **158.** Possuir rotina de controle da prestação de contas em relação ao SisObra, inclusive com a possibilidade
      de prestar contas em meses em que não houve nenhuma movimentação

- [ ] **159.** Possibilitar que ao alterar o cadastro mobiliário, seja indicado dados sobre o processo que originou a
      alteração, como data, número do processo e outras informações.

- [ ] **160.** Possibilitar que ao alterar informação cadastral no cadastro mobiliário, seja gerado o lançamento de
      taxa(s) de forma automática.

- [ ] **161.** Possibilitar que ao alterar o cadastro imobiliário, seja indicado dados sobre o processo que originou a
      alteração, como data, número do processo e outras informações.

## Item 7 - Software de Protestos e Dívida Ativa

*Fonte: Anexo I, páginas 30-35/194.*

- [ ] **1.** Permitir ao usuário realizar a interação do sistema de procuradoria com o sistema de arrecadação
      tributária, possibilitando que as informações das dívidas ativas sejam compartilhadas entre os sistemas,
      diminuindo erros de digitação e aumentando o controle sobre o histórico da dívida ativa desde a sua criação.

- [ ] **2.** Permitir a consulta das dívidas ativas inscritas no município organizadas por anos, possibilitando
      filtrar por dívidas sem certidão, com certidão emitida, com petições emitidas, protestadas ou dívidas que já
      tenham sido executadas, objetivando a centralização das informações.

- [ ] **3.** Permitir consultar as dívidas ativas inscritas no município organizadas por anos, permitindo o
      agrupamento por tipos de créditos tributários, mês de vencimento, faixas de valor e contribuinte, objetivando a
      centralização das informações.

- [ ] **4.** Permitir cadastrar e consultar as informações dos referentes que compõem a dívida ativa: imóvel,
      contribuinte e/ou econômico.

- [ ] **5.** Permitir controlar a execução dos créditos inscritos em dívidas ativas, para que uma dívida ativa não
      seja vinculada a mais de uma Certidão de Dívida Ativa ou a mais de uma Execução Fiscal, visando a agilidade e
      segurança nas informações.

- [ ] **6.** Disponibilizar na tela que permite a gestão da dívida ativa, a data de vencimento do débito que gerou a
      dívida, o número da inscrição, o código do referente e o valor total.

- [ ] **7.** Permitir que na tela da gestão da dívida ativa seja possível consultar os dados cadastrais do
      contribuinte e do referente sem sair da rotina.

- [ ] **8.** Permitir através de uma única rotina emitir a Certidão de Dívida Ativa, a Petição Inicial, realizar a
      Assinatura Eletrônica dos Documentos, e realizar a Comunicação com o Tribunal de Justiça e com o Instituto de
      Protesto, de maneira individual ou em lote.

- [ ] **9.** Permitir filtrar as dívidas por ordem alfabética, por tributo, ou por intervalo de exercícios.

- [ ] **10.** Possibilitar editar a Certidão de Dívida Ativa, removendo ou adicionando dívidas. Na mesma rotina deve
      ser possível definir o modelo da certidão, adicionar texto complementar à CDA e a data da correção monetária.

- [ ] **11.** Permitir identificar no histórico da Dívida Ativa a CDA editada, permitindo a qualquer momento fazer o
      download da CDA original e da CDA atualizada.

- [ ] **12.** Possibilitar gerar Petições de Dívida Ativa para mais de uma CDA do mesmo contribuinte.

- [ ] **13.** Permitir consultar as certidões de dívida ativa que serão encaminhadas para protesto, emitidas no
      município, organizadas por anos, permitindo o agrupamento por tipos de créditos tributários, mês de inscrição ou
      faixas de valor e possibilitando ainda filtrar por contribuinte, data de inscrição ou número da CDA.

- [ ] **14.** Permitir a emissão de segunda via das Certidões de Dívida Ativa, Petições Iniciais e Petições
      Intermediárias geradas no sistema, possibilitando visualizar os documentos que já foram emitidos no sistema a
      qualquer momento.

- [ ] **15.** Permitir a abertura de documento que esteja sem assinatura ou assinado em formato PDF o documento seja
      aberto em uma nova aba do navegador de internet.

- [ ] **16.** Permitir que o usuário crie modelos de petições de forma simples e direta, utilizando um editor de texto
      interno do sistema, sem necessidade de acesso a ferramentas externas.

- [ ] **17.** Permitir que o usuário edite modelos de petições de forma simples e direta, utilizando um editor de
      texto interno do sistema, sem necessidade de acesso a ferramentas externas, podendo a qualquer momento ajustar e
      customizar os seus próprios documentos.

- [ ] **18.** Possuir recurso para pré-visualização do modelo criado/editado pelo usuário através de editor de texto
      interno do sistema.

- [ ] **19.** Permitir a emissão de petições iniciais e petições intermediárias nos processos que tramitam no Poder
      Judiciário, inclusive com filtros de informações cadastrais dos contribuintes, dos créditos e das demais
      pessoas, jurídicas ou física, que estabeleçam vínculo com o Município.

- [ ] **20.** Permitir realizar a comunicação com o Web Service do Tribunal de Justiça para realização do
      peticionamento eletrônico, possibilitando informar a URL, o local de tramitação para onde será enviada a
      petição, a área, o assunto e classe da petição intermediária que será enviada ao tribunal por meio de Web
      Service.

- [ ] **21.** Permitir o cadastramento dos processos judiciais de forma automática através da integração Web Service
      ou de forma manual.

- [ ] **22.** Permitir controlar a rotina de ajuizamento eletrônico para que uma petição inicial que foi protocolada
      com sucesso, não possa ser enviada novamente ao Tribunal de Justiça por meio eletrônico.

- [ ] **23.** Permitir ao usuário anexar arquivos digitais nos formatos PDF, DOC, JPEG, GIF, PNG, BITMAP, TIFF, DOCX,
      TXT, ZIP, XLS, XLSX, RAR, JPG, ODT, BMP, CSV, com tamanho máximo de 10 megabytes, no cadastro do processo
      judicial auxiliando o usuário a possuir uma cópia digital dos documentos relevantes do processo judicial.

- [ ] **24.** Permitir o cadastro e consulta dos tipos de petições intermediárias que podem ser utilizadas no
      peticionamento intermediário eletrônico, informando a descrição da petição intermediária e o código utilizado
      pelo Tribunal de Justiça, auxiliando a manter a padronização das informações que serão lançadas no sistema.

- [ ] **25.** Permitir consulta e seleção dos processos judiciais que serão encaminhadas para emissão da petição
      intermediária, possibilitando ao usuário filtrar os processos judiciais por número do processo ou por
      contribuinte e selecionar um modelo de documento criado no sistema.

- [ ] **26.** Possibilitar a emissão de petições intermediárias que atualizem o valor das dívidas ativas vinculadas à
      execução fiscal.

- [ ] **27.** Permitir que o sistema informe ao usuário os processos de execução fiscal que ainda estão ativos mesmo
      com dívidas quitadas e/ou canceladas, a fim de evitar a tramitação de processos de dívidas pagas e\ou
      canceladas.

- [ ] **28.** Permitir visualizar as dívidas que compõem os processos e a situação de cada uma delas.

- [ ] **29.** Permitir que o sistema informe ao usuário os processos de execução fiscal que ainda estão ativos mesmo
      com dívidas quitadas e/ou canceladas, a fim de evitar a tramitação de processos de dívidas pagas e\ou
      canceladas, possibilitando ainda a geração de petições intermediárias e envio da petição ao tribunal de justiça.

- [ ] **30.** Permitir que o sistema informe ao usuário os processos de execução fiscal que ainda estão ativos mesmo
      com dívidas parceladas, a fim de evitar a tramitação de processos de dívidas parceladas, possibilitando ainda a
      geração de petições intermediárias e envio da petição ao tribunal de justiça.

- [ ] **31.** Permitir que o sistema informe ao usuário os processos de execução fiscal que ainda estão suspensos
      mesmo com dívidas abertas, a fim de retomar a tramitação de processos com parcelamentos cancelados,
      possibilitando ainda a geração de petições intermediárias e envio da petição ao tribunal de justiça.

- [ ] **32.** Permitir que o sistema informe ao usuário os protestos que ainda estão ativos mesmo com dívidas quitadas
      e/ou canceladas, a fim de evitar a tramitação de protestos de dívidas pagas e\ou canceladas, possibilitando
      ainda a emissão da suspensão\desistência e envio ao cartório de protestos.

- [ ] **33.** Permitir que o sistema informe ao usuário os protestos que ainda estão ativos mesmo com dívidas
      parceladas, a fim de evitar a tramitação de protestos de dívidas parceladas, possibilitando ainda a emissão da
      suspensão\desistência e envio ao cartório de protestos.

- [ ] **34.** Permitir realizar o apensamento de processos no sistema, possibilitando vincular todos os processos
      relacionados entre si e assegurando que o usuário tenha acesso rápido aos dados dos demais processos que possam
      impactar no processo selecionado.

- [ ] **35.** Permitir cadastrar os tipos de movimentações que serão utilizadas no cadastro de processo judicial,
      possibilitando informar a descrição da movimentação, se altera a situação do processo judicial e auxiliando a
      manter a padronização das informações que serão lançadas no sistema.

- [ ] **36.** Possibilitar administração de honorários e custas judiciais no momento da abertura da ação judicial.

- [ ] **37.** Permitir informar o valor e os tipos das custas processuais no cadastro do processo judicial, auxiliando
      o usuário a manter um controle de custas de cada processo judicial existente no sistema.

- [ ] **38.** Possibilitar gerar lançamentos de débitos das custas processuais automaticamente no sistema de
      tributação a partir do cadastro das custas no processo, possibilitando que a entidade realize a cobrança dos
      valores de custas do contribuinte devedor.

- [ ] **39.** Permitir através da consulta do processo, identificar a situação do pagamento das custas processuais,
      conforme situação do lançamento no sistema da tributação.

- [ ] **40.** Possibilitar gerar lançamentos de débitos dos honorários da execução fiscal automaticamente no sistema
      da tributação possibilitando que a entidade realize a cobrança dos valores de honorários do contribuinte
      devedor.

- [ ] **41.** Possibilitar gerar lançamentos de débitos dos honorários de protesto no sistema de tributação,
      possibilitando que a entidade realize a cobrança dos valores de honorários do contribuinte devedor.

- [ ] **42.** Possibilitar o cancelamento dos lançamentos dos débitos de custas processuais lançadas no sistema
      através da consulta do processo.

- [ ] **43.** Possibilitar o cancelamento dos lançamentos dos débitos de honorários da execução fiscais lançados no
      sistema através da consulta do processo.

- [ ] **44.** Possibilitar gerar lançamentos de débitos dos honorários de protesto no sistema de tributação, através
      da emissão da Certidão de Dívida Ativa, possibilitando que a entidade realize a cobrança dos valores de
      honorários do contribuinte devedor.

- [ ] **45.** Permitir através da consulta do Protesto, identificar a situação do pagamento dos honorários de protesto
      lançados no sistema.

- [ ] **46.** Possibilitar o cancelamento dos lançamentos dos débitos de honorários de protestos lançados no sistema a
      partir da consulta do Protesto.

- [ ] **47.** Possibilitar a geração de guias de pagamento para envio ao protesto que contenham as dívidas e os
      débitos de lançamento de honorários para envio junto ao protesto da CDA.

- [ ] **48.** Possibilitar a geração de Certidão de Dívida Ativa com valores de honorários de protesto e futuro envio
      para o cartório de protestos.

- [ ] **49.** Possibilitar que ao receber a movimentação de pagamento de protesto pelo cartório de protestos, caso
      tenham sido enviados para protestos valores de honorários, os mesmos sejam pagos no sistema de tributação.

- [ ] **50.** Permitir o cadastro de tipos de documentos digitais conforme padrão disponibilizado pelo Tribunal de
      Justiça informando o código do tipo de documentos digital e a descrição do tipo de documento digital,
      possibilitando posteriormente a utilização dessas informações no peticionamento eletrônico.

- [ ] **51.** Permitir o cadastro dos tipos de partes processuais que podem ser lançadas no processo judicial,
      informando a descrição do tipo de participação e o código utilizado pelo Tribunal de Justiça, auxiliando a
      manter a padronização das informações que serão lançadas no sistema.

- [ ] **52.** Permitir o cadastro de locais de tramitação informando o código do Tribunal de Justiça, a descrição do
      Tribunal, o grau de jurisdição do Tribunal, o município do Tribunal, a UF do Tribunal, o código da comarca, a
      descrição da comarca, o município da comarca, a UF da comarca, o código da vara, a descrição da vara, o e-mail
      da vara, o telefone da vara e a competência eletrônica da vara, e posteriormente utilizar essas informações em
      filtros no sistema, no cadastro de processos judiciais e no peticionamento eletrônico.

- [ ] **53.** Permitir o cadastro de ações, procuradores (advogados), locais de tramitações, tipos de movimentações e
      custas processuais.

- [ ] **54.** Permitir cadastrar advogados e procuradores, que atuarão nas ações judiciais do município, informando o
      nome do advogado/procurador, a inscrição na OAB, a seccional da inscrição na OAB e se se trata de primeira,
      segunda ou terceira inscrição ou superior.

- [ ] **55.** Gerenciar as operações referentes aos trâmites dos processos de ajuizamento de dívidas, permitindo a
      vinculação do cadastro do processo judicial a um procurador responsável, registrado no cadastro de procuradores.

- [ ] **56.** Possibilitar a redistribuição das tarefas existentes para determinado usuário do sistema ou para um
      determinado grupo de trabalho.

- [ ] **57.** Possibilitar que os Procuradores recebam um e-mail com o aviso de que uma nova tarefa foi
      disponibilizada no sistema.

- [ ] **58.** Permitir a anotação em agenda corporativa das atividades realizadas por usuário, nas quais constem as
      distribuições dos prazos judiciais, administrativos e demais demandas.

- [ ] **59.** Acusar o vencimento das atividades com prazo lançado no sistema.

- [ ] **60.** Propiciar o envio de certidão de dívida ativa para cobrança em cartórios de maneira automática através
      de WebService padrão.

- [ ] **61.** Possibilitar que a certidão de um débito de dívida seja possível ser gerada para cobrança Judicial e
      Cartório, não perdendo ambas as referências.

- [ ] **62.** Disponibilizar os dados do protesto nas telas de gerenciamento da dívida ativa, de dívida protestada,
      protestada com petição e executada\protestada.

- [ ] **63.** Permitir definir qual será a data de vencimento atribuída a CDA protestada permitindo a configuração
      pela data de emissão da certidão de dívida ativa, data de vencimento da dívida ativa que compõem a CDA e à
      vista.

- [ ] **64.** Permitir definir qual o formato de cancelamento ou desistência do Protesto deverá ser destinado ao
      cartório onde o Protesto foi realizado, disponibilizando ao usuário opções de cancelamento e desistência que
      englobam todas as necessidades da prefeitura

- [ ] **65.** Permitir cadastrar e consultar cartórios responsáveis por efetuar os protestos de títulos, informando o
      nome e a que tipo ele pertence e o código do cartório.

- [ ] **66.** Permitir controlar a sequência dos documentos emitidos no sistema, com base na numeração do documento,
      ano da emissão, tipo e nos dados padrões utilizados.

- [ ] **67.** Permitir realizar o cancelamento de documentos emitidos no sistema informando obrigatoriamente o motivo
      do cancelamento.

- [ ] **68.** Permitir reativar o documento cancelado informando obrigatoriamente o motivo da reativação.

- [ ] **69.** Permitir cadastrar e consultar os motivos padrões ou específicos para que sejam utilizados nas operações
      administrativas realizadas na entidade.

- [ ] **70.** Permitir realizar movimentações nos cadastros de contribuintes, podendo alterar sua situação para ativo
      ou inativo e incluir averbações cadastrais informando o processo e devidas observações, incluindo comentários e
      possibilitando a consulta do histórico de alterações realizadas.

- [ ] **71.** Permitir ao funcionário do setor de cadastro, anexar arquivos ao cadastro de contribuintes, com tamanho
      máximo de 5mb e extensões PDF, DOC, DOCX, TXT, XLS, XLSX, BITMAP, CSV, RAR, ZIP, ODT, JPG, JPEG, PNG, BMP, GIF,
      TIFF, possibilitando consultar todos os arquivos anexados ao cadastro, bem como remover arquivos eventualmente
      incluídos indevidamente ao registro do contribuinte.

- [ ] **72.** Possibilitar administração de honorários automaticamente com a emissão da Certidão de Dívida Ativa que
      será enviada para Protesto e/ou com emissão da Petição Inicial da Execução Fiscal, integrando os lançamentos com
      o sistema tributário.

- [ ] **73.** Conter cadastro de painéis gráficos que possibilitem a criação e a personalização de gráficos com
      informações relevantes da Dívida Ativa, permitindo a adição de novos gráficos ao painel a qualquer momento.

- [ ] **74.** Possibilitar a partir da visualização do gráfico a emissão de relatório.

- [ ] **75.** Possibilitar que os Procuradores recebam um e-mail com o aviso de que uma nova tarefa foi
      disponibilizada no sistema.

- [ ] **76.** Acusar o vencimento das atividades com prazo lançado no sistema.

- [ ] **77.** Possibilitar que os usuários sejam notificados via e-mail que um prazo está próximo do vencimento.

- [ ] **78.** Possibilitar que os usuários sejam notificados no sistema que um prazo está próximo do vencimento.

- [ ] **79.** Possibilitar que o usuário configure um limite de dias antes do vencimento do prazo para ser notificado.

- [ ] **80.** Permitir a anotação em agenda corporativa das atividades realizadas por usuário, nas quais constem as
      distribuições dos prazos judiciais, administrativos e demais demandas.

- [ ] **81.** Possibilitar que um usuário compartilhe a sua agenda com demais procuradores do sistema.

- [ ] **82.** Possibilitar que um usuário crie, edite e exclua rótulos para as pendências cadastradas no sistema.

- [ ] **83.** Possibilitar que uma pendência seja compartilhada com vários usuários do sistema.

## Item 8 - Software de Controle de Fatura de Água

*Fonte: Anexo I, páginas 35-40/194.*

- [ ] **1.** Sistema em Plataforma Web (nuvens). Linguagem de Programação Java, Banco de Dados PostgreSQL;

- [ ] **2.** Controle de acesso a usuários específicos por módulo, sendo possível acrescentar ou restringir a qualquer
      momento dados de acesso

- [ ] **3.** Controle de acesso através de perfil de usuário;

- [ ] **4.** Opção de parametrizações diversas que serão aplicadas na aplicação como um todo

- [ ] **5.** Integração Web do sistema de Faturamento com Aplicativo de Leitura.

- [ ] **6.** Faturamento:
  - [ ] **1.1.** Para todos os cadastros realizados na aplicação, é permitido realizar a consulta através de qualquer
        campo do cadastro;
  - [ ] **1.2.** Nos cadastros da aplicação são consistidas em informações de códigos e descrições, não sendo
        permitidas informações repetidas;
  - [ ] **1.3.** Para os cadastros da aplicação deverá haver pelo menos dois modos de visualização, sendo um destes em
        tabela
  - [ ] **1.4.** O modo de visualização em tabela deverá ser composto por informações baseadas na pesquisa feita
        através de quaisquer campos do cadastro, onde serão retornadas informações específicas de cada cadastro do
        sistema e nas informações retornadas deve-se haver um input permitindo acessar diretamente o cadastro quando
        desejar-se editar os dados cadastrados;
  - [ ] **1.5.** Em todas as rotinas de cadastro deverá haver o modo de pesquisa, permitindo buscar por qualquer campo
        cadastrável
  - [ ] **1.6.** Permitir cadastrar bancos diversos e vincular a essas contas bancárias;
  - [ ] **1.7.** Permite cadastrar os dados do departamento de água, assim como suas particularidades. Caso existam
        uma ou mais empresas vinculadas ao negócio, aplicação deve permitir cadastrar todas essas;
  - [ ] **1.8.** Permite cadastrar feriados fixos, municipais com descrições distintas. Para todas as operações
        financeiras, definição de datas previstas de leitura, definição de datas de execução de serviços e operações
        diversas pré-agendadas devem-se considerar os feriados cadastrados;
  - [ ] **1.9.** Permite cadastrar pelo menos duas mensagens que serão direcionadas a todos consumidores;
  - [ ] **1.10.** Permite cadastrar mensagens que serão enviadas a consumidores em situações específicas, sendo
        possível prever pelo menos as seguintes situações: específica, débito automático, faturamento, agência,
        reaviso, conta unificada, alerta especial de débitos anteriores.
  - [ ] **1.11.** Permite cadastrar mensagens que serão vinculadas aos comunicados de notificação de débito e
        notificação de corte, sendo que este pode ser alterado a qualquer momento pelo usuário;
  - [ ] **1.12.** Permite cadastrar motivos de recálculos, sendo que, estes serão exigidos em rotina específica de
        recalcular faturas e posteriormente utilizados para relatórios gerenciais;
  - [ ] **1.13.** Possui opção de cadastrar motivo de troca de clientes para controle de trocas de titularidade das
        unidades consumidoras vinculadas ao departamento de água;

- [ ] **7.** Cadastro de ligações:
  - [ ] **1.1.** Código;
  - [ ] **1.2.** Descrição;
  - [ ] **1.3.** Permite pré cadastrar consumo fixo em m³;
  - [ ] **1.4.** Permite pré cadastrar consumo fixo em valor;
  - [ ] **1.5.** Define se permite impressão de conta;
  - [ ] **1.6.** Define se imprime descrição na conta;
  - [ ] **1.7.** Define diversos tipos de ação para ocorrência;
  - [ ] **1.8.** Define se a ocorrência será considerada para finalidade de cálculo;
  - [ ] **1.9.** Define se a ocorrência será utilizada para a finalidade de impressão;
  - [ ] **1.10.** Define se haverá permissão de digitar leitura do hidrômetro ao informar determinada ocorrência;
  - [ ] **1.11.** Define se exige captura de foto;
  - [ ] **1.12.** Define se será gerada notificação de ocorrência em formulário separado;
  - [ ] **1.13.** Define se gera repasse ou crítica de leitura;
  - [ ] **1.14.** Define se quando informar determinada ocorrência será permitido aplicar débito ou crédito de
        consumo;
  - [ ] **1.15.** Permite pesquisar pessoas (físicas e jurídicas) cadastradas em qualquer módulo da aplicação, sendo
        as informações centralizadas em um único banco de dados;
  - [ ] **1.16.** Permite cadastrar pessoas (físicas e jurídicas) em qualquer módulo da aplicação, salvando as
        informações centralizadas em um único banco de dados;

- [ ] **8.** Reservatórios
  - [ ] **1.1.** Cadastrar informações pertinentes ao sistema de distribuição de água, onde se devem conter as
        estações de tratamento e reservatórios;
  - [ ] **1.2.** Cadastro dos parâmetros de qualidade da água;
  - [ ] **1.3.** Cadastro das amostras analisadas;
  - [ ] **1.4.** Vincula reservatórios cadastrados nas unidades consumidoras na qual este seja provedor de
        abastecimento;
  - [ ] **1.5.** Permite cadastrar o período e qualidade da análise;
  - [ ] **1.6.** Permite cadastrar análises fora do padrão;

- [ ] **9.** Serviços
  - [ ] **1.1.** Cadastro de serviços a serem cobrados nas faturas, com diversos tipos de aplicações;
  - [ ] **1.2.** Definir se Serviço será cobrado com valor fixo;
  - [ ] **1.3.** Definir se o serviço será cobrado com valor percentual;
  - [ ] **1.4.** Definir se o serviço será cobrado de acordo com o consumo em m³
  - [ ] **1.5.** Cadastrar o código de dívida ativa de determinado serviço;
  - [ ] **1.6.** Definir se haverá incidência de impostos para determinados serviços;
  - [ ] **1.7.** Parametrizar se determinado serviço será discriminado na fatura;
  - [ ] **1.8.** Parametrizar se determinado serviço será vinculado a água/esgoto.

- [ ] **10.** Anexos tarifários
  - [ ] **1.1.** Permite cadastrar anexos tarifários;
  - [ ] **1.2.** Vincular a cada anexo tarifário a tarifa básica operacional;
  - [ ] **1.3.** Permite ativar/inativar um anexo cadastrado a qualquer momento. Sendo que suas informações e
        históricos de aplicações são mantidos na base de dados;
  - [ ] **1.4.** Permite cadastrar diversas faixas de consumo e vincular as mesmas em seus pertinentes anexos
        tarifários;
  - [ ] **1.5.** Definir a quais serviços determinados faixa de consumo se aplica;
  - [ ] **1.6.** Controla a vigência inicial e final da faixa de consumo
  - [ ] **1.7.** Cadastro informações referentes à correção monetária, que é aplicada automaticamente no anexo
        tarifário vigente.
  - [ ] **1.8.** Permitir geração de leituras em lote;

- [ ] **11.** Débito avulso
  - [ ] **1.1.** Lançamento de débitos avulsos para consumidores que estejam vinculados a uma unidade consumidora;
  - [ ] **1.2.** Permite ativar e inativar tipos de débitos avulsos, e mantém históricos dos mesmos na base de dados;
  - [ ] **1.3.** Permite negociar débitos avulsos, aplicando prévia simulação, onde o usuário tem informação dos
        valores das parcelas e vencimentos antes de concluir a operação;
  - [ ] **1.4.** Na negociação, a aplicação registra a movimentação contábil das parcelas e caso tenha mais de um
        serviço credita/estorna proporcionalmente os valores.
  - [ ] **1.5.** Permite cadastrar tipo de entrega das faturas;
  - [ ] **1.6.** Permitir cadastro de município, localidades, bairros e logradouros, vinculando-os de maneira lógica;
  - [ ] **1.7.** A aplicação deve ser integrada com API’s de pesquisa automatizada por CEP;

- [ ] **12.** Hidrometria
  - [ ] **1.1.** Possui cadastro de hidrômetros que compõem a atual composição de ligações ativas do município;
  - [ ] **1.2.** Permite cadastros de hidrômetros não instalados;
  - [ ] **1.3.** Controla através de cadastros informações das aquisições de hidrômetros, assim como a nota fiscal
        destes;
  - [ ] **1.4.** Controla através de cadastros fabricantes de hidrômetros, permite pesquisar por essa informação
        quando for realizar o vínculo de um hidrômetro a uma ligação
  - [ ] **1.5.** Controla trocas de hidrômetros através de motivos de substituição;
  - [ ] **1.6.** Registra histórico de hidrômetros já utilizados por determinada ligação;
  - [ ] **1.7.** Permite cadastro individual de hidrômetro, contendo as seguintes informações: código, número do
        hidrômetro, fabricante, número da nota fiscal, vazão, diâmetro e número de dígitos;
  - [ ] **1.8.** Permite cadastro do hidrômetro de cada ligação, contendo as seguintes informações: fabricante,
        diâmetro, vazão, diâmetro da ligação, data de instalação de hidrômetro, leitura inicial do hidrômetro;
  - [ ] **1.9.** Permite o cadastro de todos os fornecedores de hidrômetros.

- [ ] **13.** Roteirização
  - [ ] **1.1.** Permite criar diversas roteirizações baseando nas informações pré-definidas nos parâmetros gerais;
  - [ ] **1.2.** Permite pesquisar e editar roteirização já cadastradas;
  - [ ] **1.3.** Lista detalhes da roteirização, com dados de todas as unidades consumidoras nela vinculada, sequência
        da mesma na roteirização e endereço completo das unidades consumidoras;
  - [ ] **1.4.** Permite alterar a qualquer momento a sequência de uma determinada unidade consumidora vinculada a uma
        rota;
  - [ ] **1.5.** Reordena automaticamente a ordem de sequência das unidades consumidora quando se realiza uma
        alteração;
  - [ ] **1.6.** Permite alterar a qualquer momento uma determinada unidade consumidora de rota;
  - [ ] **1.7.** Permite cadastrar, editar, pesquisar e inativar unidades consumidoras, contendo as seguintes
        interfaces:
    - [ ] **1.1.1.** Dados da ligação;
    - [ ] **1.1.2.** Dados do usuário/proprietário;
    - [ ] **1.1.3.** Dados do hidrômetro;
    - [ ] **1.1.4.** Histórico de hidrômetros utilizados;
    - [ ] **1.1.5.** Dados do imóvel;
    - [ ] **1.1.6.** Parametrizações gerais baseadas na regra de negócio do departamento de água;
    - [ ] **1.1.7.** Informação de mensagens vinculadas à unidade consumidora para determinada referência;
    - [ ] **1.1.8.** Histórico de leituras;
    - [ ] **1.1.9.** Histórico de serviços;
    - [ ] **1.1.10.** Histórico de débitos de leitura;
    - [ ] **1.1.11.** Histórico de débitos avulsos;
    - [ ] **1.1.12.** Opção de imprimir faturas em aberto
  - [ ] **1.1.** Possuir módulo de leitura e impressão simultânea;
  - [ ] **1.1.** Permite digitação de consumo em m³ individual;
  - [ ] **1.1.** Permite digitação de consumo pela média;
  - [ ] **1.2.** Permite digitação de consumo pelo mínimo;
  - [ ] **1.3.** Permite digitação de consumo estimado;
  - [ ] **1.4.** Permite digitação de ocorrência individual;
  - [ ] **1.5.** Permite lançamento de leitura coletada de forma manual;
  - [ ] **1.6.** Permite disponibilizar cargas por Setor e Rotas, individuais e em grupo;
  - [ ] **1.7.** Mantém histórico de cargas enviadas com sucesso, e com falhas de comunicação;
  - [ ] **1.8.** Mantém histórico de baixa das cargas enviadas com sucesso, e com falhas de comunicação;
  - [ ] **1.9.** Parâmetros Gerais - Permite parametrizar dados de integração, tais como:
    - [ ] **1.1.1.** Preestabelecer descrição de serviços que serão impressos nas faturas;
    - [ ] **1.1.2.** Define tipo de ação para existência de ocorrência nas leituras;
    - [ ] **1.1.3.** Define o tipo de código de barras utilizado, sendo que estes são baseados no layout FEBRABAN
  - [ ] **1.1.** Possuir módulo de Débitos / Negociação
    - [ ] **13.1.1.** Permite realizar a negociação de débitos individualmente ou em grupo;
    - [ ] **13.1.2.** Permite negociar débitos de faturas e cobranças avulsas;
    - [ ] **13.1.3.** Exibe uma simulação da negociação antes de aplicar de fato a operação;
    - [ ] **13.1.4.** Permite oferecer desconto no processo de negociação;
    - [ ] **13.1.5.** Permite negociar como o serviço a ser cobrado nas faturas mensais de água;
    - [ ] **13.1.6.** Permite negociar gerando faturas avulsas;
    - [ ] **13.1.7.** Possui flexibilidade na definição para início dos vencimentos das parcelas negociadas;
    - [ ] **13.1.8.** Registra e mantém histórico de todas as movimentações contábeis pertinentes a parcelamentos.
    - [ ] **13.1.9.** Cancelamento de negociação:
      - [ ] **1.1.1.1.** Permite realizar cancelamento por débito;
      - [ ] **1.1.1.2.** Permite realiza cancelamento de negociação por serviço;
      - [ ] **1.1.1.3.** Registra e mantém histórico de todas as movimentações contábeis pertinentes a cancelamento de
            negociações.
  - [ ] **13.2.** Possuir módulo Financeiro
    - [ ] **13.2.1.** Quitação manual:
      - [ ] **13.2.1.1.** Permite quitação manual para débito avulso;
      - [ ] **13.2.1.2.** Permite quitação manual para débito de fatura;
      - [ ] **13.2.1.3.** Permite quitação manual para comunicados de débito;
    - [ ] **13.2.2.** Quitação automática
      - [ ] **13.2.2.1.** Realiza quitação automática de faturas arrecadadas através de agências bancárias;
      - [ ] **13.2.2.2.** Possui integração com bancos conveniados, utilizando layout de integração FEBRABAN;
    - [ ] **13.2.3.** Débito automático:
      - [ ] **13.2.3.1.** Realiza a exportação de dados relacionados a débito automático para as agências bancárias
            conveniadas;
      - [ ] **13.2.3.2.** Realiza a importação de dados de débito automático gerados pelas agências bancárias
            conveniadas;
      - [ ] **13.2.3.3.** A integração e realizada através do layout de integração FEBRABAN.
    - [ ] **13.2.4.** Atualização diária de encargos
      - [ ] **13.2.4.1.** Realiza a atualização diária de juros, multas e correções para os débitos em atraso;
      - [ ] **13.2.4.2.** Mantém o histórico de atualização diária dos encargos;
  - [ ] **13.3.** Possuir Processos de Avisos e Cortes
    - [ ] **13.3.1.** Geração de comunicados de débito
      - [ ] **13.3.1.1.** Permite geração manual de comunicados de débitos;
      - [ ] **13.3.1.2.** Permite cadastrar mensagem personalizada para ser impressa no comunicado;
    - [ ] **13.3.2.** Geração de comunicado de corte:
      - [ ] **13.3.2.1.** Gera documento para ser apresentado durante a execução do corte;
      - [ ] **13.3.2.2.** Permite cadastrar mensagem personalizada para ser impressa no comunicado;
      - [ ] **13.3.2.3.** Pré-define a geração do comunicado de corte na geração do comunicado de débito;
  - [ ] **13.4.** Possuir Lançamento de mensagens
    - [ ] **13.4.1.** Permite lançamento de mensagem que será impressa na fatura de todos os consumidores;
  - [ ] **13.5.** Possuir Lançamento de serviços:
    - [ ] **13.5.1.** Permite lançamento de serviços que serão cobrados por determinado período;
    - [ ] **13.5.2.** Permite lançamento de serviços que serão cobrados por período indeterminado;
    - [ ] **13.5.3.** Permite lançamento de serviços que serão cobrados somente em uma referência, sendo de maneira
          individual ou por rota.
  - [ ] **13.6.** Disponibilizar seguintes relatórios:
    - [ ] **13.6.1.** Relatório de faturamento;
    - [ ] **13.6.2.** Relatório de consumo por logradouro;
    - [ ] **13.6.3.** Listagem de quitações;
    - [ ] **13.6.4.** Ficha de Leitura;
    - [ ] **13.6.5.** Por Economia;
    - [ ] **13.6.6.** Movimento Contábil por Rubrica;
    - [ ] **13.6.7.** Maiores valores;
    - [ ] **13.6.8.** Movimento Bancário.
  - [ ] **13.7.** Possuir Módulo de Atendimentos:
    - [ ] **13.7.1.** Permite cadastrar um novo atendimento e pesquisar já lançados;
    - [ ] **13.7.2.** Permite definir data prevista de execução para a execução dos atendimentos;
    - [ ] **13.7.3.** Possui recurso de geração de ordens de serviço automaticamente, após aprovação do atendimento;
    - [ ] **13.7.4.** Possui recurso de lançamento manual das informações de execução das ordens de serviço;
    - [ ] **13.7.5.** Possui recurso de lançamento manual das informações de execução das ordens de serviço;
    - [ ] **13.7.6.** Realiza a geração de cobrança automática ao módulo de faturamento;
    - [ ] **13.7.7.** Realiza a alteração do status das unidades consumidores automaticamente após execução de
          determinados atendimentos;
    - [ ] **13.7.8.** Todas as ordens de serviço são vinculadas e controladas por um atendimento.
  - [ ] **13.8.** Atendimento / Cadastros:
    - [ ] **13.8.1.** Permite cadastrar tipo de atendimento;
    - [ ] **13.8.2.** Permite ativar/desativar tipos de atendimento, mantendo o histórico de utilização desde na base
          de dados;
    - [ ] **13.8.3.** Possibilita o registro de todos os atendimentos realizados;
    - [ ] **13.8.4.** Quando o operador abre o atendimento, é feita a geração do número de protocolo (registro de
          atendimento) único;
    - [ ] **13.8.5.** Permite registrar as principais tarefas executadas no atendimento;
    - [ ] **13.8.6.** Permite o acompanhamento de todos os atendimentos realizados;
    - [ ] **13.8.7.** Registra o descritivo do atendimento, ação que pode ser inserida pelo atendente;
    - [ ] **13.8.8.** Permite a visualização de documentos anexados nos atendimentos;
    - [ ] **13.8.9.** Permite a visualização das principais informações da unidade consumidora na interface de
          lançamento do atendimento;
    - [ ] **13.8.10.** Permite a visualização do histórico de débitos em uma lista paginada, e com opção de pesquisar
          na tabela;
    - [ ] **13.8.11.** Permite a impressão de segunda via de débitos;
  - [ ] **13.9.** Especificação Módulo Mobile
    - [ ] **13.9.1.** Integração com Modulo Fatura on line, sem necessidade de exportação e geração TXT para carga e
          descarga de Leituras.
    - [ ] **13.9.2.** Sistema operacional Android 4.1 ou superior;
    - [ ] **13.9.3.** Resolução de tela ou proporcional de 480 x 800 (WVGA) para Android;
    - [ ] **13.9.4.** Compatível com impressoras que usam o padrão de programação CPCL, ESC/P e ZPL;
    - [ ] **13.9.5.** Visualização de estatística de leitura, constando:
      - [ ] **13.9.5.1.** Quantidade de leituras;
      - [ ] **13.9.5.2.** Quantidade de leituras efetuadas;
      - [ ] **13.9.5.3.** Quantidade de leituras não efetuadas;
    - [ ] **13.9.6.** Possuir consulta de consumidores por:
      - [ ] **13.9.6.1.** Imóvel
      - [ ] **13.9.6.2.** Hidrômetro
      - [ ] **13.9.6.3.** Consumidor
    - [ ] **13.9.7.** Possuir controle de ocorrências;
    - [ ] **13.9.8.** Possuir recurso de mudança de ordem de leituras;
    - [ ] **13.9.9.** Realizar o cálculo e impressão de contas conforme padrões e regras de negócio da empresa e do
          sistema gestor;
    - [ ] **1.1.1.** Possuir recurso de reimpressão da conta no ato da leitura;
    - [ ] **1.1.2.** Tempo máximo para gravação da leitura, cálculo e impressão total da fatura após acionada a
          confirmação da leitura e geração de Log: 10 segundos;
    - [ ] **1.1.3.** Permitir cálculo e impressão de fatura em todas as opções de leitura;
    - [ ] **1.1.4.** Permitir atualizar a versão do software de forma online;
    - [ ] **1.1.5.** Pareamento interno com a impressora;
    - [ ] **1.1.6.** Navegação para primeiro e último cliente da rota;
    - [ ] **1.1.7.** Possuir recurso de transmissão online de leituras;

## Item 9 - Software de Folha de Pagamento

*Fonte: Anexo I, páginas 40-46/194.*

- [ ] **1.** Dispor de um ambiente centralizado que contenha gráficos e indicadores de gestão da folha, podendo
      navegar por competências, e ainda, que permita a partir desse ambiente:
  - [ ] **1.1.** Realizar consulta de matrículas, dispondo de filtros de consulta tais como Ativos, Inativos, Seleções
        de Matrículas, com opção de definir colunas a serem exibidas em tela e imprimir o resultado da busca, podendo
        realizar a pesquisa por, no mínimo, Nome, Código da Matrícula, CPF, RG, PIS/PASEP, e utilizar critérios de
        pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda
        oferecer outras opções de filtros, objetivando a otimização das consultas. As matrículas consultadas deverão
        estar acessíveis para que seja possível realizar alterações, podendo ainda, a partir dessa tela, efetuar uma
        admissão;
  - [ ] **1.2.** Realizar consulta de afastamentos, dispondo de filtros por tipo de afastamento, com opção de definir
        colunas a serem exibidas em tela, podendo efetuar a busca por, no mínimo, Nome, Código da matrícula, CPF, Nº
        do cartão ponto, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou
        Nenhum dos termos digitados. Deverá ainda oferecer outras opções de filtros, objetivando a otimização das
        consultas. A partir dessa tela, também será possível cadastrar um novo afastamento.
  - [ ] **1.3.** Realizar todos os processamentos de cálculo da folha, com campos específicos para cada tipo de
        processamento, e com opção de habilitar logs de cálculo para debug de fórmulas. Os cálculos mensais, de
        férias, 13º salário e rescisão, poderão ser efetuados de forma individual ou coletiva. Os cálculos da folha
        deverão ser executados em segundo plano, não gerando bloqueios no sistema durante os cálculos, permitindo a
        execução de outras tarefas no sistema durante os cálculos, notificando o usuário quando os cálculos estiverem
        finalizados.
    - [ ] **1.3.1.** Para os cálculos de férias, deverá ser permitido informar se haverá o desconto de faltas no
          pagamento e se haverá o pagamento do 13º salário simultaneamente com as férias.
    - [ ] **1.3.2.** Permitir calcular uma rescisão complementar para funcionários que tiveram a rescisão calculada.
  - [ ] **1.4.** Realizar ações de lançamentos de variáveis de cálculo (proventos e descontos) por determinado
        período, onde ao informar o número de parcelas, já será informada de forma automática a competência final do
        lançamento ou ao informar a competência final, será informado de forma automática o número de parcelas do
        lançamento. Os lançamentos poderão ser efetuados de forma individual ou coletiva. No momento do lançamento,
        também deverá ter a opção de mostrar as parcelas na consulta de cálculos.
  - [ ] **1.5.** Realizar a consulta de cálculos, podendo navegar entre competências, dispondo de filtros de consulta
        por, no mínimo, processamento, situação e seleção de matrículas, com opção de definir colunas a serem exibidas
        em tela e imprimir o resultado da busca, podendo realizar a pesquisa por, no mínimo, Nome, Código da
        Matrícula, CPF, Código eSocial, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos
        digitados ou Nenhum dos termos digitados. Deverá ainda oferecer outras opções de filtros, objetivando a
        otimização das consultas.
    - [ ] **1.5.1.** Na tela de consulta de cálculos, deverá ser possível consultar de forma detalhada todos os
          eventos calculados, podendo efetuar o recálculo e exclusão de folhas de forma individual ou coletiva, lançar
          uma variável de cálculo, realizar o fechamento, visualizar os parâmetros do cálculo e a composição de bases.
    - [ ] **1.5.2.** A tela de consulta de cálculos deverá dispor de ferramenta dinâmica de comparativo de folhas,
          podendo comparar folhas de um mesmo servidor em competências diferentes, servidores diferentes na mesma
          competência e servidores diferentes em competências diferentes, com indicadores visuais para facilitar a
          visualização das diferenças.
    - [ ] **1.5.3.** Na tela de consulta de cálculos, deverá ser possível realizar a alteração da data de pagamento do
          funcionário ou grupo de matrículas que já tenham o processamento da folha calculado.
  - [ ] **1.6.** Realizar a consulta dos logs de erro de cálculo, dispondo de filtros de consulta por, no mínimo,
        processamento, tipo e seleção de matrículas, com opção de definir colunas a serem exibidas em tela, podendo
        realizar a pesquisa por, no mínimo, Nome, Código, Mensagem, e utilizar critérios de pesquisa como Alguns
        termos digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda oferecer outras
        opções de filtros, objetivando a otimização das consultas.
    - [ ] **1.6.1.** A partir dessa tela, deverá ser possível recalcular ou excluir a folha e ainda, visualizar os
          parâmetros do cálculo.
    - [ ] **1.6.2.** A consulta dos logs de erro deverá exibir mensagem que permita ao usuário entender de forma clara
          o erro existente. Também deverá exibir em tela o processamento que originou o erro, o nome do servidor,
          matrícula, data da mensagem e usuário que efetuou o cálculo.
  - [ ] **1.7.** Realizar o fechamento da folha de pagamento, dispondo de filtros de consulta por, no mínimo,
        processamento, situação e seleção de matrículas, podendo realizar a pesquisa por, no mínimo, Nome, Código de
        matrícula, CPF, PIS/PASEP, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos
        digitados ou Nenhum dos termos digitados. Deverá ainda oferecer outras opções de filtros, objetivando a
        otimização das consultas.
    - [ ] **1.7.1.** A rotina de fechamento deverá permitir selecionar uma ou mais matrículas de uma vez para realizar
          o fechamento das folhas.
    - [ ] **1.7.2.** Também deverá ser possível realizar a abertura do processamento fechado, por servidor com perfil
          de acesso autorizado para realizar esse procedimento.

- [ ] **2.** Permitir a criação de novos campos complementares aos cadastros padrões disponibilizados, sendo estes nos
      formatos área de texto, CNPJ, CPF, data, data e hora, e-mail, hora, lista de seleção, múltipla seleção,
      numérico, telefone e texto, com a indicação do rótulo, texto de ajuda, validade inicial e final do campo.

- [ ] **3.** Conter rotina de configuração das tabelas de Previdência Social (RGPS), Regime Próprio de Previdência
      (RPPS), Assistência, IRRF, FGTS e Salário Família, permitindo informar os valores, alíquotas e quotas, que serão
      utilizadas para efeito de cálculo da folha, bem como, informar o Salário-Mínimo, Piso Salarial e Teto salarial.

- [ ] **4.** Permitir copiar os dados de configuração das tabelas, para que sejam realizadas as devidas alterações,
      conforme legislação e sua utilização.

- [ ] **5.** Permitir limitar o acesso de usuários às informações de funcionários de determinados grupos funcionais,
      organogramas e/ou matrículas.

- [ ] **6.** Flexibilizar as configurações da folha de acordo com a necessidade e método utilizado pela entidade.

- [ ] **7.** Permitir cadastrar e vincular dependentes no cadastro de pessoas, informando o tipo de dependência, data
      inicial e final.

- [ ] **8.** Dispor de cadastro de dependentes, que contemple no mínimo, os seguintes campos: nome do dependente, CPF,
      RG, data de nascimento, estado civil, grau de instrução, grau de parentesco, deficiências, dependências de
      salário-família, IRRF e Pensão alimentícia.

- [ ] **9.** Permitir o gerenciamento dos dependentes dos servidores para fins de salário família e imposto de renda,
      pensão judicial, realizando a baixa automática na época devida, conforme limite e condições previstas para cada
      dependente.

- [ ] **10.** Permitir registar todas as configurações das estruturas de níveis das lotações físicas utilizadas para
      determinar o local de trabalho do servidor na entidade.

- [ ] **11.** Controlar a lotação física dos servidores, registrando o histórico de todos os locais de trabalho que o
      servidor passou, permitindo informar no cadastro do funcionário, o local onde trabalhará.

- [ ] **12.** Permitir o registro de feriados fixos, variáveis e pontos facultativos com abrangência nacional,
      estadual e municipal.

- [ ] **13.** Permitir registrar automaticamente a movimentação de pessoal referente a admissão do funcionário,
      através da informação do ato.

- [ ] **14.** Registrar automaticamente a movimentação de pessoal referente a prorrogação de contrato de servidores
      com contratos de prazo determinado, através da informação do ato.

- [ ] **15.** Permitir o controle dos planos previdenciários ou assistenciais a que cada servidor esteve ou está
      vinculado, podendo registrar o número da matrícula do servidor no plano.

- [ ] **16.** Possuir cadastro de estagiários vinculados com a entidade, abrangendo sua escolaridade e outros aspectos
      para acompanhamento do andamento do estágio.

- [ ] **17.** Possuir cadastro de autônomos que prestam serviços à entidade, permitindo registrar a data e o valor de
      cada serviço prestado.

- [ ] **18.** Permitir o registro de matrícula do tipo aposentado, possibilitando o preenchimento de dados de
      identificação e informações gerais.

- [ ] **19.** Dispor de mecanismo que impeçam o registro do cadastro do funcionário, quando existir campos não
      preenchidos que forem definidos como obrigatório.

- [ ] **20.** Permitir que no cadastro de matrículas dos servidores, sejam relacionados os dados do concurso que o
      funcionário participou.

- [ ] **21.** Permitir cadastrar diferentes configurações de férias, onde será possível:
  - [ ] **21.1.** Estipular as regras para cancelamento (perda do direito às férias) dos períodos aquisitivos de
        férias conforme as normas previstas em estatuto e/ou lei regulamentada.
  - [ ] **21.2.** Estipular as regras para "suspensão" do período aquisitivo de férias conforme normas previstas em
        estatuto e/ou lei, para que o período de aquisição de funcionário seja postergado a data final.
  - [ ] **21.3.** Informar para cada configuração a quantidade de meses necessários para aquisição, quantidade de dias
        de direito a férias, quantidade de dias que podem ser abonados, configuração de descontos de faltas, ou seja,
        informar para cada configuração de férias as faixas para descontos de faltas em relação aos dias de direito do
        período aquisitivo.

- [ ] **22.** Dispor de ambiente que permita o controle dos períodos aquisitivos de férias e 13º salário, com controle
      dos lançamentos, suspensões e cancelamentos por funcionário conforme configuração.
  - [ ] **22.1.** Deverá permitir a consulta dos períodos aquisitivos, dispondo de filtros de consulta por, no mínimo,
        processamento e situação, podendo realizar a pesquisa por, no mínimo, Nome, Código da matrícula, e utilizar
        critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos termos digitados.
        Deverá ainda oferecer outras opções de filtros, objetivando a otimização das consultas.

- [ ] **23.** Controlar os períodos aquisitivos de férias em relação a quantidade de dias disponíveis para o gozo de
      férias.

- [ ] **24.** Permitir visualizar as faltas e os descontos de faltas que o funcionário teve dentro do período
      aquisitivo de férias e propiciar o lançamento destas faltas.

- [ ] **25.** Controlar os períodos de 13º salário em relação aos avos adquiridos e de direito, disponíveis para
      pagamento.

- [ ] **26.** Permitir calcular o pagamento das férias antecipadamente.

- [ ] **27.** Permitir cadastrar grupos funcionais visando a flexibilização no controle de funcionários.

- [ ] **28.** Cadastrar níveis salariais, permitindo definir a ordem de progressão das classes e referências.

- [ ] **29.** Permitir importar eventos de cálculo da folha para uma matrícula ou várias matrículas de uma só vez.

- [ ] **30.** Manter as respectivas informações de progressão salariais registradas no histórico do servidor.

- [ ] **31.** Permitir registrar todas as informações referentes aos atos legais da entidade, como leis, portarias,
      decretos, requisições estabelecidas pelo órgão, associados às movimentações cadastrais do funcionário. Os
      registros das movimentações devem ser gerados automaticamente pelo sistema, caso seja informado o ato durante o
      cadastramento de uma movimentação (admissão, alteração de cargo, alteração salarial, demissão/exoneração,
      afastamento etc.).

- [ ] **32.** Permitir o cadastro dos tipos de movimentação de pessoal. De maneira geral, cada alteração cadastral,
      alterações salariais, de cargo, de lotação, admissão, exoneração ou demissão, aposentadoria, falecimento,
      transferências, entre outros, sofrida pelo funcionário, pode ser considerada um tipo de movimentação de pessoal.

- [ ] **33.** Possibilitar a geração de movimentações de pessoal proveniente do registro de pensionistas.

- [ ] **34.** Permitir a reintegração de funcionário demitido/exonerado por decisão judicial ou administrativa, sendo
      possível reutilizar a mesma matrícula.

- [ ] **35.** Permitir a configuração de quais proventos e descontos devem ser considerados como automáticos para cada
      tipo de cálculo (mensal, férias, complementar etc.).

- [ ] **36.** Permitir o cadastro e manutenção de eventos dos tipos: proventos, descontos e eventos informativos
      (servem somente para realizar o cálculo interno não havendo crédito ou débito do salário pago ao funcionário),
      dispondo de todos os campos obrigatórios para registro das incidências para atendimento às regras de envio das
      rubricas ao eSocial.

- [ ] **37.** Permitir a cópia de eventos de cálculo existentes, objetivando o reaproveitamento de dados para um novo
      cadastro.

- [ ] **38.** Permitir a configuração de todas as fórmulas de cálculo em conformidade com as legislações vigentes da
      entidade, dispondo de documentação acessível ao usuário a partir da tela de configuração das fórmulas e que
      contenham informações para auxiliar na elaboração ou manutenção das fórmulas.

- [ ] **39.** Permitir buscar valores registrados nos novos campos complementares criados, a partir de função
      informada na fórmula de cálculo do evento da folha.

- [ ] **40.** Permitir o registro histórico das alterações realizadas no cadastro de eventos de folha.

- [ ] **41.** Permitir a inclusão e configuração de motivos de rescisão, assim como respectivos códigos de geração
      para os órgãos federais como eSocial e FGTS.

- [ ] **42.** Permitir efetuar o cálculo da provisão de férias e 13º salário, gerenciando as baixas de provisão.
  - [ ] **42.1.** Deverá permitir a consulta dos cálculos de provisão, podendo navegar entre competências, dispondo de
        filtros de consulta por, no mínimo, processamento, podendo realizar a pesquisa por, no mínimo, Nome, Código da
        matrícula, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum
        dos termos digitados. Deverá ainda oferecer outras opções de filtros, objetivando a otimização das consultas.
  - [ ] **42.2.** A consulta deverá detalhar os períodos aquisitivos exibindo os saldos, baixas e demais informações
        em tela.

- [ ] **43.** Permitir a configuração das médias e vantagens de férias, rescisão, 13º salário, abono pecuniário e
      avisos prévios, percebidas pelos servidores, informando os eventos de composição e as regras específicas de
      abrangência e obtenção dos valores, para cada tipo de média e vantagem.
  - [ ] **43.1.** Na tela de consulta e cadastro das médias e vantagens, deverá ser possível filtrar as consultas por
        tipo, podendo realizar a pesquisa por, no mínimo, Evento, e utilizar critérios de pesquisa como Alguns termos
        digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda oferecer outras opções de
        filtros, objetivando a otimização das consultas.

- [ ] **44.** Possuir rotina de cálculo automático de rescisão para funcionários com vínculo de prazo determinado, na
      competência em que expira o contrato.

- [ ] **45.** Controlar os afastamentos do funcionário permitindo a consulta dos dados dos afastamentos em ambiente
      específico e também no cadastro da matrícula.

- [ ] **46.** Permitir o lançamento automático de afastamento do servidor quando realizar o cálculo das férias.

- [ ] **47.** Permitir calcular reajustes salariais de individual ou modo coletivo para matrículas sem níveis ou para
      níveis salariais e matrículas vinculadas filtrando pelo plano de cargos, podendo ser por valor ou percentual,
      realizando a simulação antes da efetivação da alteração.

- [ ] **48.** Permitir registrar a informação do motivo da alteração salarial, além de possibilitar a criação de novos
      motivos.

- [ ] **49.** Permitir calcular a progressão salarial de modo individual ou coletivo, por níveis salariais, realizando
      a simulação antes da efetivação da alteração.

- [ ] **50.** Emitir o resumo da folha por período com todos os tipos de proventos e descontos gerados na folha,
      mostrando o valor total e a quantidade total de funcionários. Permitindo selecionar as informações, assim como
      agrupar os dados e ordená-los.

- [ ] **51.** Permitir a consulta do cálculo das médias e vantagens que o servidor recebeu em férias, 13º salário ou
      rescisão de contrato, detalhando os cálculos.

- [ ] **52.** Permitir registrar a divisão hierárquica dos setores.

- [ ] **53.** Permitir a reestruturação da classificação institucional de um exercício para outro através da mudança
      de organogramas, podendo duplicar os dados do organograma para que sejam realizadas as devidas alterações e sua
      utilização.

- [ ] **54.** Possibilitar a inclusão de responsáveis titulares e temporários em um cadastro de organogramas.

- [ ] **55.** Permitir copiar funcionários demitidos para realizar a readmissão individual e também funcionários
      ativos para aproveitamento de dados.

- [ ] **56.** Permitir a configuração e a integração das informações da folha de pagamento dos servidores, encargos e
      provisões, com o sistema de contabilidade, sem a necessidade de exportação e importação de arquivos.

- [ ] **57.** Possibilitar integração entre os sistemas Folha e Transparência.

- [ ] **58.** Permitir configurar o envio dos dados para o sistema Transparência para viabilizar a transparência dos
      dados.

- [ ] **59.** Possuir ambiente de consulta de matrículas, dispondo de filtros de consulta tais como Ativos, Inativos,
      Seleções de Matrículas, com opção de definir colunas a serem exibidas em tela e imprimir o resultado da busca,
      podendo realizar a pesquisa por, no mínimo, Nome, Código da Matrícula, CPF, RG, PIS/PASEP, e utilizar critérios
      de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda
      oferecer outras opções de filtros, objetivando a otimização das consultas. As matrículas consultadas deverão
      estar acessíveis para que seja possível realizar alterações cadastrais, podendo ainda, a partir dessa tela,
      efetuar uma admissão, com todos os campos exigidos pelo Ministério do Trabalho e Emprego, e que possibilite,
      inclusive, a dispensa do livro de registro dos servidores, conforme Portaria nº 41 de 28/03/2007.
  - [ ] **59.1.** Ao acessar o cadastro da matrícula, deverá ser exibido em tela todos os dados contratuais do
        servidor.

- [ ] **60.** Possuir ambiente de consulta de pessoas físicas, podendo realizar a pesquisa por, no mínimo, Nome, CPF,
      PIS, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos
      termos digitados. As pessoas consultadas deverão estar acessíveis para que seja possível realizar alterações
      cadastrais, podendo ainda, a partir dessa tela, efetuar um novo registro de pessoa física, possibilitando
      informar os dados pessoais como: nome, CPF, data de nascimento, idade, estado civil, sexo, endereço(s),
      telefone(s), e-mail(s), filiação(ões), moléstia(s) grave(s), grau de escolaridade, raça, tipo sanguíneo,
      indicativo de doador, deficiência(s), além de dados relacionados aos documentos, como RG, órgão emissor, UF,
      data da emissão, número do título de eleitor, zona, seção, número do CNS, data da emissão, RIC, órgão emissor,
      UF, data da emissão, certidão(ões) civil(s), número do certificado de reservista, número da CTPS, número do PIS
      / PASEP, número da CNH.
  - [ ] **60.1.** Ao acessar o cadastro da pessoa física, deverá ser exibido em tela todos os dados pessoais do
        servidor.
  - [ ] **60.2.** Permitir a atualização de dados cadastrais das pessoas físicas, inclusive, adicionando uma formação.

- [ ] **61.** Permitir o cadastro dos dados estrangeiros da pessoa física que não seja natural brasileira.

- [ ] **62.** O sistema deverá guardar os registros históricos de alterações dos cadastros das pessoas físicas e das
      matrículas, os quais deverão estar acessíveis ao usuário.

- [ ] **63.** Permitir a inclusão, alteração e exclusão do histórico vigente de cadastro de pessoas físicas e
      matrículas, permitindo ainda que os históricos retroativos sejam incluídos ou alterados.

- [ ] **64.** Permitir registrar casos de moléstias graves por meio do CID à pessoa, com data inicial e data final
      quando for o caso.

- [ ] **65.** Possuir registro para cadastramento das deficiências dos servidores.

- [ ] **66.** Permitir anexar arquivos em vários formatos aos cadastros de servidores e também de pessoas físicas,
      possibilitando manter arquivo digital dos servidores e pessoas cadastradas.

- [ ] **67.** Registrar e permitir a visualização de todas as movimentações de pessoal de forma cronológica ocorridas
      no período de permanência do servidor no município.

- [ ] **68.** Permitir o registro de cargos, com controle histórico das alterações, possibilitando registrar
      informações gerais vinculadas ao ato, nome do cargo, tipo do cargo, podendo ser efetivo, comissionado,
      temporário, agente político, entre outros conforme a necessidade da entidade, quadro de vagas, possibilitando
      subdividir a quantidade de vagas entre as áreas de atuação e organogramas, grau de instrução mínimo exigido,
      configuração de férias, CBO, acúmulo de cargos, dedicação exclusiva, contagem especial de tempo de serviço e
      referências salariais.

- [ ] **69.** Permitir manter a nomenclatura do cargo efetivo no cadastro funcional de servidor efetivo que exerça
      cargo em comissão ou função comissionada, incluindo o registro do cargo ou função.

- [ ] **70.** Permitir o cadastro dos níveis salariais conforme legislação municipal, possibilitando compor suas
      variações de classe e referência dentro do nível, com controle histórico de alterações, viabilizando a
      vinculação da faixa salarial dos cargos.

- [ ] **71.** Permitir o registro de vínculos empregatícios dos funcionários da entidade. No registro do vínculo deve
      possibilitar informar a descrição, regime trabalhista, regime previdenciário, categoria do trabalhador,
      categoria do SEFIP, vínculo temporário, motivo da rescisão, data final obrigatória, o envio ao CAGED, envio para
      RAIS e código RAIS e se gera licença-prêmio.

- [ ] **72.** Gerar alerta ao usuário quando for realizar a admissão de pessoas que têm a escolaridade inferior àquela
      exigida na configuração do cargo informado.

- [ ] **73.** Permitir o registro dos horários de trabalho e jornadas, realizados pelo trabalhador.

- [ ] **74.** Permitir a configuração do envio de dados para o eSocial.

- [ ] **75.** Emitir informações que comprovem o rendimento e retenção de imposto de renda retido na fonte.

- [ ] **76.** Gerar o arquivo com a relação dos funcionários para a DIRF, conforme exigências da Receita Federal.

- [ ] **77.** Permitir a configuração de envio da DIRF e Comprovante de Rendimentos, contendo os dados legalmente
      exigidos, permitindo informar quais eventos devem ser agrupados.

- [ ] **78.** Permitir registrar e gerar as informações de dados cadastrados no sistema para atendimento às exigências
      legais do TCE.

- [ ] **79.** Possuir o quadro de cargos, possibilitando informar a descrição, percentual mínimo, ato de criação, ato
      do percentual mínimo, ato de revogação.

- [ ] **80.** Permitir o lançamento de faltas para desconto em folha de pagamento e na tabela de gozo das férias.

- [ ] **81.** Permitir o cadastramento de ACT’s com campo específico para gerar a rescisão automática ao final do
      contrato celebrado.

- [ ] **82.** Permitir o cadastramento de aposentados pela entidade no sistema, com particularidades que os
      diferenciam dos demais funcionários, como motivo da aposentadoria, tipo do benefício, situação, etc.

- [ ] **83.** Permitir geração de informações para envio ao sistema SIOPE do Ministério da Educação.

- [ ] **84.** Permitir o cadastro de servidores em diversos regimes jurídicos, como: celetistas, estatutários,
      contratos temporários, emprego público, estagiário e cargos comissionados.

- [ ] **85.** Permitir a prorrogação de contratos temporários de forma individual.

- [ ] **86.** Permitir a emissão da ficha de dados cadastrais dos servidores.

- [ ] **87.** Permitir o controle e gerenciamento de acessos ao sistema com vinculação de permissões aos usuários,
      podendo definir grupos com permissões específicas de acordo com as regras estabelecidas pela entidade.

- [ ] **88.** Permitir a consulta e alteração de informações da entidade que o sistema foi liberado, possibilitando ao
      usuário alterar informações como sigla da entidade, responsável da entidade, endereço da entidade, telefone da
      entidade, e-mails da entidade, site da entidade, indicativo de RPPS, tipo de administração, sindicato,
      classificação tributária, indicativo de registro eletrônico de funcionário, classificação tributária e situação
      da entidade.

- [ ] **89.** Possibilitar aos usuários redefinirem a senha de acesso em qualquer momento.

- [ ] **90.** Permitir cadastrar forma de pagamento em PIX na matrícula do servidor.

- [ ] **91.** Permitir realizar alterações cadastrais individuais ou coletivas nos históricos das matrículas, como:
      Organograma, Vínculo empregatício, Cargo, Nível salarial, Lotação física, Jornada de trabalho, Grupo funcional e
      Sindicato.

## Item 10 - Software de Atendimento ao eSocial

*Fonte: Anexo I, páginas 46-47/194.*

- [ ] **1.** Permitir a integração de dados de forma automática ou ainda através de arquivos de intercâmbio de
      informações com o sistema de Folha de Pagamento.

- [ ] **2.** O sistema deverá realizar o envio de eventos, verificando a existência de pendências.

- [ ] **3.** Possibilitar a recuperação de um envio não processado, seja motivo de instabilidade ou outro, que tenha
      interrompido o fluxo.

- [ ] **4.** Possibilitar a visualização e download do arquivo do evento gerado, em formato XML.

- [ ] **5.** Possuir notificação de ocorrências do sistema ao usuário, permitindo visualizar os status como: em
      andamento, lidas e não lidas.

- [ ] **6.** Possibilitar a consulta dos eventos conforme sua situação, possuindo os status de aguardando envio,
      enviando, aguardando retorno e enviados com retorno. Ao listar a consulta, deverá apresentar no mínimo: o
      registro a que se refere no eSocial, a descrição do evento, a data de envio (quando já enviado, o prazo limite
      de envio, o protocolo de envio (quando já enviado) e o recibo de retorno, quando existir.

- [ ] **7.** Dispor de lista que apresente os próximos envios previstos, seguindo o critério do mais atrasado para o
      mais atual.

- [ ] **8.** Disponibilizar indicadores e gráficos referentes às rotinas de domínios integrados, eventos gerados e
      envios pendentes, em ambiente único, e que demonstre a estimativa de horas para sanear os erros existentes.

- [ ] **9.** Possibilitar a visualização em formato de calendário dos eventos pendentes de envio, conforme sua data
      limite.

- [ ] **10.** Possuir mensagem que demonstre ao usuário, como orientação, as inconsistências relacionadas a "Erro" e
      "Alerta".

- [ ] **11.** Possibilitar envio dos arquivos para o eSocial via web service.

- [ ] **12.** Possuir listagem de eventos aguardando envio, permitindo selecionar um ou vários itens e executar para
      os selecionados a ação e enviar.

- [ ] **13.** Permitir ao usuário trocar de entidade sem sair do sistema.

- [ ] **14.** Possibilitar o gerenciamento da situação do registro que foi transformado para o formato eSocial, em
      todas as etapas do processo de envio.

- [ ] **15.** Possibilitar envio dos lotes de informações para o eSocial, podendo selecionar um ou vários eventos para
      assinatura e envio.

- [ ] **16.** Permitir consultar os erros do retorno do governo, quando existirem.

## Item 11 - Software de Recursos Humanos

*Fonte: Anexo I, páginas 47-51/194.*

- [ ] **1.** Permitir registar todas as configurações das estruturas de níveis das lotações físicas utilizadas para
      determinar o local de trabalho do servidor na entidade. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **2.** Permitir registrar todas as informações referentes aos atos legais da entidade, como leis, portarias,
      decretos, requisições estabelecidas pelo órgão. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **3.** Permitir registrar a divisão hierárquica dos setores. Funcionalidade acessível no módulo Recursos
      Humanos.

- [ ] **4.** Permitir a reestruturação da classificação institucional de um exercício para outro através da mudança de
      organogramas, podendo duplicar os dados do organograma para que sejam realizadas as devidas alterações e sua
      utilização. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **5.** Possuir ambiente de consulta de matrículas, dispondo de filtros de consulta tais como Ativos, Inativos,
      Seleções de Matrículas, com opção de definir colunas a serem exibidas em tela e imprimir o resultado da busca,
      podendo realizar a pesquisa por, no mínimo, Nome, Código da Matrícula, CPF, RG, PIS/PASEP, e utilizar critérios
      de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda
      oferecer outras opções de filtros, objetivando a otimização das consultas. As matrículas consultadas deverão
      estar acessíveis para que seja possível realizar alterações cadastrais, podendo ainda, a partir dessa tela,
      efetuar uma admissão, com todos os campos exigidos pelo Ministério do Trabalho e Emprego, e que possibilite,
      inclusive, a dispensa do livro de registro dos servidores, conforme Portaria nº 41 de 28/03/2007. Funcionalidade
      acessível no módulo Recursos Humanos.
  - [ ] **5.1.** Ao acessar o cadastro da matrícula, deverá ser exibido em tela todos os dados contratuais do
        servidor.

- [ ] **6.** Possuir ambiente de consulta de pessoas físicas, podendo realizar a pesquisa por, no mínimo, Nome, CPF,
      PIS, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos
      termos digitados. As pessoas consultadas deverão estar acessíveis para que seja possível realizar alterações
      cadastrais, podendo ainda, a partir dessa tela, efetuar um novo registro de pessoa física, possibilitando
      informar os dados pessoais como: nome, CPF, data de nascimento, idade, estado civil, sexo, endereço(s),
      telefone(s), e-mail(s), filiação(ões), moléstia(s) grave(s), grau de escolaridade, raça, tipo sanguíneo,
      indicativo de doador, deficiência(s), além de dados relacionados aos documentos, como RG, órgão emissor, UF,
      data da emissão, número do título de eleitor, zona, seção, número do CNS, data da emissão, RIC, órgão emissor,
      UF, data da emissão, certidão(ões) civil(s), número do certificado de reservista, número da CTPS, número do PIS
      / PASEP, número da CNH. Funcionalidade acessível no módulo Recursos Humanos.
  - [ ] **6.1.** Ao acessar o cadastro da pessoa física, deverá ser exibido em tela todos os dados pessoais do
        servidor.
  - [ ] **6.2.** Permitir a atualização de dados cadastrais das pessoas físicas, inclusive, adicionando uma formação.

- [ ] **7.** Permitir o registro de cargos, com controle histórico das alterações, possibilitando registrar
      informações gerais vinculadas ao ato, nome do cargo, tipo do cargo, podendo ser efetivo, comissionado,
      temporário, agente político, entre outros conforme a necessidade da entidade, quadro de vagas, possibilitando
      subdividir a quantidade de vagas entre as áreas de atuação e organogramas, grau de instrução mínimo exigido,
      configuração de férias, CBO, acúmulo de cargos, dedicação exclusiva, contagem especial de tempo de serviço e
      referências salariais. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **8.** Permitir o cadastro dos níveis salariais conforme legislação municipal, possibilitando compor suas
      variações de classe e referência dentro do nível, com controle histórico de alterações, viabilizando a
      vinculação da faixa salarial dos cargos. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **9.** Permitir o registro de vínculos empregatícios dos funcionários da entidade. No registro do vínculo deve
      possibilitar informar a descrição, regime trabalhista, regime previdenciário, categoria do trabalhador,
      categoria do SEFIP, vínculo temporário, motivo da rescisão, data final obrigatória, o envio ao CAGED, envio para
      RAIS e código RAIS e se gera licença-prêmio. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **10.** Permitir ao superior imediato responder os questionários de avaliação de desempenho de seus servidores
      subordinados.

- [ ] **11.** Possuir cadastro que permita registrar dados de acidentes de trabalho e testemunhas.

- [ ] **12.** Possibilitar o lançamento de atestados, dispondo de campos que permitam cadastrar a matrícula, data
      inicial, data final, data retorno, CID e o local de atendimento.

- [ ] **13.** Sugerir lançamento de atestado para todas as matrículas ativas do servidor.

- [ ] **14.** Possuir registro no cadastro de matrículas, de todas as passagens dos servidores na área médica.

- [ ] **15.** Permitir cadastrar empresas fornecedoras de vale-transporte, instituições médicas e de ensino,
      operadoras de planos de saúde, sindicatos e empresa geral. As informações mínimas para o cadastro devem ser:
      CNPJ, tipo da empresa e porte, razão social, nome fantasia, registro nº (NIRE), inscrição municipal, inscrição
      estadual, endereço, telefone, e-mail e dados do responsável.

- [ ] **16.** Possuir rotina de notificações, permitindo visualizar as notificações subdivididas por não lidas, lidas
      e em andamento.

- [ ] **17.** Possibilitar registrar processos de aposentadorias e pensões, permitindo documentar os trâmites legais,
      desde o início da análise até o deferimento.

- [ ] **18.** Possibilitar a geração de aprovação e classificação de candidatos de concurso público ou processo
      seletivo.

- [ ] **19.** Permitir o registro e gerenciamento dos Equipamento de Proteção Individual - EPI, dispondo de controle
      de entrega.

- [ ] **20.** Permitir o cadastro e a visualização de empréstimos consignados. Consultar os cálculos efetuados no
      sistema de acordo com a competência informada e o processamento dela para cada funcionário.

- [ ] **21.** Permitir o controle de funcionários substituídos e substitutos, facilitando o acompanhamento no período
      de substituição, permitindo a realização de alterações individuais.

- [ ] **22.** Permitir cadastrar a monitoração biológica através do cadastro de Atestado de Saúde Ocupacional, com
      identificação das consultas e exames periódicos, admissionais, demissionais e outros.

- [ ] **23.** Possibilitar o controle de contratos temporários, permitindo visualizar todos os contratos temporários,
      realizar seleção e aplicar alterações em lote, como prorrogar o contrato e informar nova data para agendamento
      da rescisão.

- [ ] **24.** Possibilitar cadastrar diárias de diferentes naturezas e valores.

- [ ] **25.** Permitir o cadastro de concurso público ou processo seletivo.

- [ ] **26.** Possibilitar a importação de pessoas candidatas de concurso público.

- [ ] **27.** Possuir as informações necessárias do concurso para a prestação de contas.

- [ ] **28.** Permitir a demonstração de histórico de movimentações de cada etapa do período convocatório.

- [ ] **29.** Possuir tela integrada ao processo seletivo, que permita realizar o controle de inscrições e os
      aprovados, sem necessidade de digitar novamente informações pessoais.

- [ ] **30.** Permitir o cadastro dos processos seletivos, incluindo os candidatos inscritos, indicando o cargo para o
      qual o candidato se inscreveu, se foi aprovado ou não, sua classificação e a nota final.

- [ ] **31.** Permitir cadastrar experiências anteriores, e suas respectivas contribuições previdenciárias.

- [ ] **32.** Permitir o registro e controle dos benefícios de vale-alimentação.

- [ ] **33.** Possibilitar a importação de valores de vale-alimentação.

- [ ] **34.** Permitir o lançamento de vale-alimentação para uma seleção de matrículas, permitindo atribuir o valor de
      vale-alimentação e de desconto individualmente, bem como a atribuição de um valor geral a todos da seleção.

- [ ] **35.** Possibilitar o registro da concessão de diárias de viagem para os servidores.

- [ ] **36.** Possibilitar o cadastro de cursos, seminários, congressos, simpósios e outros treinamentos, definindo
      área de atuação, a instituição de ensino, duração, carga horária e outras informações.

- [ ] **37.** Permitir que os servidores efetuem solicitações de cursos de aperfeiçoamento. As solicitações podem ser
      registradas e, posteriormente, canceladas ou recusadas.

- [ ] **38.** Permitir o planejamento de cursos, com programa, carga horária, data de realização, local de realização,
      ministrante e número de vagas disponíveis.

- [ ] **39.** Permitir o registro referente a formação acadêmica dos servidores no cadastro de pessoas físicas.

- [ ] **40.** Permitir cadastrar e configurar a licença prêmio, possibilitando criar faixas de períodos para a geração
      de aquisição de licença prêmio; informar os tipos de afastamentos que poderão ser prorrogadas as licenças
      através das suspensões; informar um ou mais formas de cancelamentos da licença prêmio; informar as movimentações
      que serão geradas na aquisição ou concessão da licença prêmio; informar o tipo de afastamento que será gerado o
      afastamento de licença prêmio de forma automática.

- [ ] **41.** Permitir a organização de datas dos períodos, acionados pela remodelagem de período aquisitivo de
      licença prêmio, alterados em decorrência de afastamentos, ocasionando suspensões ou cancelamentos.

- [ ] **42.** Possuir cadastro de formações, informando o nível: aperfeiçoamento, médio, técnico, superior,
      especialização, mestrado e doutorado, e permitindo relacionar com o órgão de classe da categoria e relacionar as
      áreas de atuação da profissão.

- [ ] **43.** Possibilitar a configuração da prorrogação e do cancelamento do período aquisitivo de adicionais, em
      decorrência de afastamentos.

- [ ] **44.** Permitir a inclusão de novos tipos de afastamentos.

- [ ] **45.** Permitir o lançamento de licenças por motivo de doença, acidente de trabalho e atestado de horas, sem
      prejuízo na frequência diária do servidor.

- [ ] **46.** Possibilitar o registro das rotas de transporte utilizadas pelos servidores, e seus respectivos valores
      unitários, a fim de definir os valores do benefício de vale-transporte. Ao definir as rotas, deve-se permitir
      informar a empresa de transporte, meio de transporte, perímetro, linha e valor.

- [ ] **47.** Permitir o cadastramento de planos de saúde, informando a tabela de valores dos planos por faixa etária,
      tabelas de subsídios dos servidores e dependentes, além dos valores de adesão ao plano.

- [ ] **48.** Permitir a inclusão do benefício de plano de saúde para as matrículas de funcionário, estagiário,
      aposentado e pensionista.

- [ ] **49.** Permitir a geração de adesão de plano de saúde para beneficiários no mês de ingresso do mesmo ao plano
      de saúde, independentemente do dia do mês.

- [ ] **50.** Permitir configuração de faixas de planos de saúde por aniversário ou no mês posterior.

- [ ] **51.** Possibilitar o uso de mais de um adicional por matrícula.

- [ ] **52.** Permitir a gestão de ocorrências disciplinares, possibilitando a consulta e o cadastro de elogios,
      advertência e suspensão de funcionário. Ao registrar uma ocorrência deverá permitir informar a data,
      funcionário, tipo, responsável, ato, motivo e testemunhas.

- [ ] **53.** Permitir cadastrar verbas para realizar os descontos de empréstimos na folha de pagamento de forma
      automática.

- [ ] **54.** Permitir o registro dos vencimentos dos processos de aposentadorias e pensões.

- [ ] **55.** Possibilitar que no ambiente de controle de período aquisitivo de licença prêmio seja possível acionar a
      rotina de remodelagem, onde aplica-se os ajustes de cancelamento e suspensão, conforme as definições da
      configuração de licença prêmio.

- [ ] **56.** Permitir registrar os riscos ambientais os quais os servidores estarão sujeitos de acordo com o local de
      trabalho e cargo.

- [ ] **57.** Possibilitar que o processamento de remodelagem do período de licença prêmio seja executado em segundo
      plano e que o usuário seja notificado quando do término do processamento.

- [ ] **58.** Permitir o lançamento automático de afastamento do servidor quando realizar a concessão da licença
      prêmio.

- [ ] **59.** Permitir o registro de averbação das experiências anteriores e dos contratos de trabalho, para
      adicional, licença prêmio, tempo de serviço e carreira.

- [ ] **60.** Permitir inserir o benefício de empréstimos para as matrículas de funcionário, estagiário, aposentado e
      pensionista.

- [ ] **61.** Permitir escolher a melhor forma de aplicação de subsídios de plano de saúde para os servidores e
      dependentes, podendo ser pelo salário contratual, tempo de serviço, idade e data de admissão

- [ ] **62.** Permitir o lançamento de mais de um período de gozo para o mesmo período aquisitivo de licença prêmio.

- [ ] **63.** Possibilitar que no ambiente de gestão do período aquisitivo de licença prêmio, permita o registro
      período de gozo e/ou abono da licença prêmio.

- [ ] **64.** Permitir configurar os valores de adicional de tempo de serviço, podendo configurar a progressão e o
      limite máximo do percentual recebido.

- [ ] **65.** Permitir o registro da quantidade de vales-transportes diário ou mensal utilizado pelo servidor no
      percurso de ida e volta ao local de trabalho.

- [ ] **66.** Possibilitar a vinculação de atestados médicos nos afastamentos decorrentes de acidentes de trabalho ou
      doenças.

- [ ] **67.** Disponibilizar ambiente que possibilite realizar o cálculo das despesas de vales-transportes para os
      funcionários de forma individual ou coletiva.

- [ ] **68.** Permitir o lançamento de licença prêmio em gozo e pecúnia para o mesmo período aquisitivo.

- [ ] **69.** Manter o cadastro de todos os períodos aquisitivos, possibilitando o registro da licença prêmio dos
      servidores, desde a admissão até a exoneração.

- [ ] **70.** Possibilitar a consulta dos descontos dos planos de saúde do servidor.

- [ ] **71.** Permitir a criação de empréstimo informando o valor da parcela e quantidade de parcelas.

- [ ] **72.** Possibilitar a quitação antecipada de parcelas de empréstimo.

- [ ] **73.** Possibilitar a realização da gestão de baixas das parcelas do benefício de empréstimos.

- [ ] **74.** Permitir o cadastro da configuração das regras que definem a aquisição do adicional de tempo de serviço.

- [ ] **75.** Possibilitar o registro de processos administrativos para os servidores.

- [ ] **76.** Permitir a emissão do Perfil Profissiográfico Previdenciário - PPP, baseado no histórico do servidor, no
      layout da previdência social.

- [ ] **77.** Permitir editar os dados dos empréstimos que estiverem em andamento.

- [ ] **78.** Permitir a criação do cadastro de Comissões Interna de Prevenção de Acidentes

- [ ] **79.** Permitir a configuração de agendas e agendamentos relacionados à de Saúde e Segurança do Trabalho,
      permitindo navegar entre as competências do calendário, filtrar por dia, semana ou mês do ano, e por agenda,
      estabelecimento ou responsável.

- [ ] **80.** Permitir registrar extintores existentes nas instalações do município.

- [ ] **81.** Permitir que o usuário crie o registro de visitas técnicas.

- [ ] **82.** Permitir a configuração do envio de dados para o sistema eSocial.

- [ ] **83.** Possibilitar integração dos dados de Recrutamento e Seleção (Concursos e Processos Seletivos) ao
      Transparência.

## Item 12 - Software de Patrimônio

*Fonte: Anexo I, páginas 51-54/194.*

- [ ] **1.** Permitir o registro das movimentações dos bens patrimoniais, como aquisição, transferência, baixa,
      reavaliação, depreciação e inventários.

- [ ] **2.** Permitir que o usuário seja mantido no mesmo exercício ao alternar a entidade logada no sistema.

- [ ] **3.** Propiciar a indicação da configuração do organograma do município que será válida para o exercício.

- [ ] **4.** Disponibilizar informações dos bens tais como: valores líquidos contábeis, total de bens, total de bens
      ativos, total de bens baixos, pendências operacionais e movimentações de bens no painel da gestão.

- [ ] **5.** Disponibilizar informações dos bens no Portal da Transparência.

- [ ] **6.** Permitir enviar os anexos dos bens patrimoniais para o Portal da Transparência a serem transparecidos
      para os cidadãos.

- [ ] **7.** Propiciar o controle dos bens por meio de registro de placas.

- [ ] **8.** Propiciar o registro da fórmula de cálculo para diferentes métodos de depreciação, exaustão e
      amortização, permitindo a classificação em linear, soma de dígitos ou unidades.

- [ ] **9.** Permitir a configuração dos órgãos, unidades orçamentárias e centro de custo da entidade.

- [ ] **10.** Permitir o registro de grupos de bens, definição do percentual de depreciação anual, valor residual do
      bem e vida útil do grupo de bens, com controle e consulta através de listagem dinâmica.

- [ ] **11.** Propiciar o cadastro de unidade de medida dos bens da entidade, permitindo informar a abreviatura,
      grandeza e se possui ou não fracionamento.

- [ ] **12.** Permitir o cadastro dos tipos de transferências dos bens, informando descrição e classificação, e nos
      casos de transferência entre responsáveis, organogramas, grupos de bem, localização física entre entidades e
      espécie do bem.

- [ ] **13.** Permitir o cadastro de localizações físicas, possibilitando informar níveis e endereço.

- [ ] **14.** Permitir o cadastro de apólice de seguro com a opção de vinculação dos bens e contrato a essa apólice,
      os contratos devem ser apresentados em uma lista para ser selecionado, buscando de forma automática no sistema
      contratos da entidade.

- [ ] **15.** Propiciar o envio, retorno e consulta de bens da manutenção, permitindo o registro da próxima revisão.

- [ ] **16.** Possuir relatório de bens enviados para manutenção, contendo minimamente, placa, descrição, data de
      envio, previsão de entrega e retorno.

- [ ] **17.** Propiciar o envio, retorno e consulta de bens cedidos ou emprestados, com registro da data prevista para
      retorno.

- [ ] **18.** Propiciar o registro da utilização do bem imóvel, classificado em dominicais, uso comum do povo, uso
      especial, em andamento e demais bens imóveis.

- [ ] **19.** Permitir tombar o bem, demonstrando o organograma, placa e responsável.

- [ ] **20.** Permitir informar o estado de conservação dos bens.

- [ ] **21.** Permitir identificar na listagem a situação que o bem se encontra, inclusive de estar ou não em uso.

- [ ] **22.** Propiciar a remoção do registro do bem após desfazer o seu tombamento, sendo que para desfazer o
      tombamento o bem não deve possuir movimentações vinculadas.

- [ ] **23.** Permitir informar a moeda vigente na aquisição do bem e conversão dos valores para moeda vigente.

- [ ] **24.** Permitir o cadastro de responsáveis pelos bens patrimoniais, informando nome, CPF, telefone, e-mail, se
      é funcionário do município, matrícula, cargo, natureza do cargo e o endereço.

- [ ] **25.** Permitir cadastrar os fornecedores, contendo o nome, o CPF ou CNPJ, endereço, telefone, e-mail, site,
      inscrição municipal, inscrição estadual e se o fornecedor está inativo. O registro deverá ser integrado com os
      sistemas de Compras, Contratos, Frotas e Contabilidade.

- [ ] **26.** Permitir a localização dos dados cadastrais do fornecedor no banco de dados da Receita Federal.

- [ ] **27.** Permitir a emissão e registro do Termo de Responsabilidade, individual ou coletivo dos bens.

- [ ] **28.** Permitir o registro e processamento da depreciação, amortização e exaustão dos bens em uso, atualizando
      de forma automática os valores depreciados no bem.

- [ ] **29.** Possibilitar que na exclusão do movimento de depreciação, os movimentos processados e registrados no bem
      sejam excluídos e retornados os valores anteriores a depreciação excluída, bem como a data da última
      depreciação.

- [ ] **30.** Permitir registrar depreciação contendo as principais informações, como mês e ano, data da finalização,
      responsável e observação.

- [ ] **31.** Propiciar a baixa de bens de forma individual ou em lote, atualizando automaticamente a situação do bem
      para baixado, bem como estornar a baixa após sua finalização, retornando o bem para a situação antes de ser
      baixado.

- [ ] **32.** Permitir cadastrar o tipo de baixa do bem, podendo classificar em: doação em pagamento, doação ou
      cessão, perda, permuta, roubo ou furto, sucata, venda e outras.

- [ ] **33.** Propiciar transferências de bens entre organograma, responsáveis, grupos de bens, localizações físicas,
      entre entidades, espécie do bem e configuração de organograma.

- [ ] **34.** Permitir transferências individuais ou por lote, atualizando automaticamente os novos registros no bem.

- [ ] **35.** Permitir a transferência de bens de uma entidade para outra, realizando a baixa automática na entidade
      de origem e incorporação na entidade de destino, sem intervenção de cadastro manual, possibilitando também o
      estorno da transferência entre entidades.

- [ ] **36.** Permitir a transferência de bens quando há uma alteração de organograma, localização ou responsável.

- [ ] **37.** Permitir o controle da destinação dos bens patrimoniais em desuso.

- [ ] **38.** Permitir a elaboração de inventário de bens patrimoniais com conferência dos bens (localizado e não
      localizado).

- [ ] **39.** Permitir no inventário a possibilidade de atualização dos dados tais como: organograma, localização
      física é responsável.

- [ ] **40.** Disponibilizar aplicativo compatível com Android para realização de busca e coleta de bens para
      inventário.

- [ ] **41.** Permitir a leitura de etiquetas por meio da tecnologia RFID (Radio-Frequency Identification), utilizando
      o recurso NFC (leitura por aproximação) através de dispositivo móvel.

- [ ] **42.** Disponibilizar ambiente para controle da coleta de bens para o inventário, via aplicativo móvel e no
      sistema Patrimônio web.

- [ ] **43.** Permitir armazenar documentos relacionados a localização do bem por meio dos arquivos em formato PDF,
      DOC, DOCX, TXT, HTML, XLS, XLSX, JPG, PNG com tamanho máximo de 25 MB.

- [ ] **44.** Permitir o envio de dados dos bens ativos e baixados para Portal da Transparência.

- [ ] **45.** Permitir identificar bens que não possuem saldo para depreciar, e que o valor líquido contábil esteja
      igual ao valor residual do bem.

- [ ] **46.** Permitir a pesquisa simples e avançada no processo de depreciação, com disponibilidade de filtros que
      auxiliam na obtenção de resultado preciso.

- [ ] **47.** Permitir integração com o sistema da contabilidade para envio de depreciações, reavaliações, baixas,
      transferências e aquisições.

- [ ] **48.** Permitir pesquisar os bens por código e placa ao adicionar e listar bens para transferência, além de
      pesquisar ao adicionar um bem por organograma, grupo, espécie, localização física, responsáveis e estado de
      conservação.

- [ ] **49.** Permitir a cópia de um bem já cadastrado para facilitar o cadastramento de bens em lote.

- [ ] **50.** Permitir a integração com o sistema de contratos, possibilitando a entrada de bens permanentes licitados
      no sistema Patrimônio via integração entre os sistemas.

- [ ] **51.** Permitir realizar reavaliação de bens sendo valorização ou desvalorização.

- [ ] **52.** Permitir o cadastro de comissões contendo tipo, tipo do ato, ato, data de expiração, data de exoneração,
      finalidade e membros.

- [ ] **53.** Possibilidade de impressão de etiquetas para os bens.

- [ ] **54.** Permitir a impressão de relatório para controle dos bens patrimoniais, podendo realizar a emissão por
      placa, grupo, responsável, localização física, número do comprovante, empenho/ano, processo/ano, tipo do bem e
      fornecedor.

- [ ] **55.** Permitir a criação de novos campos complementares nos cadastros padrões do sistema, sendo estes nos
      formatos área de texto, CNPJ, CPF, data, data e hora, e-mail, hora, lista de seleção, múltipla seleção,
      numérico, telefone e texto, com a indicação do rótulo, texto de ajuda, validade inicial e final do campo.

## Item 13 - Software de Controle de Almoxarifado

*Fonte: Anexo I, páginas 54-56/194.*

- [ ] **1.** Permitir o controle de toda movimentação do estoque, sendo entrada, saída e transferência de materiais,
      atualizando o estoque de acordo com cada movimentação realizada.

- [ ] **2.** Permitir o gerenciamento automático nas saídas através de requisições ao almoxarifado, anulando as
      quantidades que não possuem estoque e sugerindo as quantidades disponíveis.

- [ ] **3.** Permitir informar limites mínimos, limites máximos, consumo médio mensal e ponto de reposição de saldo
      físico de estoque.

- [ ] **4.** Permitir a importação das notas fiscais eletrônicas do sistema que as armazena, a fim de registrar a
      entrada de materiais no almoxarifado.

- [ ] **5.** Permitir consultar as últimas aquisições, com informação do preço das últimas entradas, para estimativa
      de custo.

- [ ] **6.** Permitir receber do sistema de Contratos, solicitações de entrada de material, permitindo visualizar e
      registrar a entrada de materiais, visualizar e realizar as ações da solicitação de entrada de materiais. Para os
      casos de solicitações de entrada de material pendentes para aprovação, a demonstração deve ser em ordem
      crescente pela data e hora da solicitação.

- [ ] **7.** Permitir que o sistema Contratos envie as seguintes informações na solicitação de entrada de material:
      número da solicitação de fornecimento, número do processo administrativo, número do contrato, data e horário do
      recebimento do material, código do organograma, descrição do organograma, nome do fornecedor, número do
      comprovante, valor total e objeto.

- [ ] **8.** Permitir movimentações de entrada e saída do material de forma automática ao finalizar o inventário,
      corrigindo o saldo dos materiais e respeitando o organograma e lote de validade indicado na contagem.

- [ ] **9.** Permitir que a listagem das saídas de materiais registradas possa ser pesquisada pelo número da saída,
      descrição do almoxarifado, descrição e número do organograma, período da saída, responsável, pessoa que retirou
      o material, natureza da movimentação e identificador de origem.

- [ ] **10.** Permitir informar quem retirou e o local de entrega na saída de materiais.

- [ ] **11.** Permitir realizar requisições de materiais ao responsável do almoxarifado, bem como realizar o controle
      de pendências dos respectivos pedidos para fornecimento de materiais.

- [ ] **12.** Permitir a exclusão de entrada de materiais, sendo que ao excluir o sistema deverá recalcular, na
      movimentação futura, o valor unitário e o saldo quantitativo dos materiais existentes. Essa exclusão não poderá
      ocorrer quando o saldo dos materiais da entrada ficar negativo em algum momento futuro em relação a data da
      efetivação da entrada, a entrada ocorrer um período onde a movimentação do almoxarifado está encerrada ou se a
      entrada de materiais for referente a um estorno, transferência ou inventário.

- [ ] **13.** Permitir a alteração dos dados das entradas já esteja finalizada, podendo alterar os seguintes dados:
      número do comprovante, série e anexos.

- [ ] **14.** Permitir informar os centros de custo (setores ou departamentos) nas requisições para controle do
      consumo.

- [ ] **15.** Registrar a abertura e o fechamento de inventários. Não permitindo a movimentação, de entrada ou saída
      de materiais, quando o estoque e/ou produto estiverem em inventário. A movimentação somente poderá ocorrer após
      a conclusão do inventário.

- [ ] **16.** Permitir registrar a quantidade dos itens encontrados no inventário, possibilitando o ajuste dos saldos
      de forma automática no estoque.

- [ ] **17.** Possuir rotina que permita a realização de encerramento por almoxarifado a fim de não permitir nenhum
      tipo de movimentação (entrada/saída).

- [ ] **18.** Possuir consulta rápida dos dados referente ao vencimento do lote do estoque, possibilitando ao menos a
      consulta dos vencidos, vencimentos em período a definir, através de listagem dinâmica, com possibilidade de
      inclusão, alteração ou exclusão de lotes através da lista.

- [ ] **19.** Propiciar a emissão de relatório da ficha de controle de estoque, mostrando as movimentações por
      material e período com saldo anterior ao período.

- [ ] **20.** Propiciar a emissão de relatórios de entradas e saídas de materiais por produto, nota fiscal e setor
      (centro de custo).

- [ ] **21.** Emitir um resumo anual das entradas e saídas, mostrando o saldo financeiro mês a mês por estoque e o
      resultado ao final do ano.

- [ ] **22.** Emitir relatórios de controle de validade de lotes de materiais, possibilitando seleção por:
      almoxarifado/depósito, período, materiais vencidos, materiais a vencer.

- [ ] **23.** Possibilitar a emissão de relatório de posição de estoque com o período desejado, para identificar o
      estoque na data desejada.

- [ ] **24.** Permitir a visualização de saldo dos materiais por fornecedores de acordo com as últimas entradas
      realizadas no almoxarifado.

- [ ] **25.** Permitir listar os lotes de validade registrados, filtrando por vencidos e a vencer, exibindo o seu
      número do lote, descrição, material, código do material, unidade de medida, data de fabricação e data de
      validade.

- [ ] **26.** Permitir o gerenciamento integrado dos estoques de materiais existentes nos diversos
      almoxarifados/depósitos.

- [ ] **27.** Permitir realizar saídas de materiais com datas retroativas.

- [ ] **28.** Permitir emitir a nota de saída através do botão de impressão rápida, presente no mesmo ambiente do
      cadastro da saída.

- [ ] **29.** Emitir alerta na saída de materiais, quando o material atingir estoque mínimo ou ponto de reposição,
      conforme a quantidade configurada.

- [ ] **30.** Permitir a demonstração de todos os materiais cadastrados no almoxarifado.

- [ ] **31.** Permitir enviar os dados das movimentações do almoxarifado para o Portal da Transparência.

- [ ] **32.** Permitir pesquisar os materiais pelo código do material e descrição do material.

- [ ] **33.** Possibilitar filtros na pesquisa avançada das requisições com as seguintes opções: número da requisição,
      período da requisição, requisitante, organograma requisitante e requisitado, almoxarifado requisitante e
      requisitado.

- [ ] **34.** Permitir a leitura de arquivo de inventário gerado pelo coletor de dados, de forma flexível para
      atendimento a qualquer leiaute de arquivo, aceitando arquivos do tipo TXT, CSV, XML.

- [ ] **35.** Permitir o anexo de arquivos no registro da localização física, ao menos nos formatos PDF, DOC, DOCX,
      ODT, TXT, XLS, XLSX, JPG, PNG, COT, com tamanho máximo de até 25 MB.

- [ ] **36.** Permitir a realização do atendimento da requisição de materiais ao almoxarifado por meio de aplicativo
      mobile, possibilitando a conferência por meio da leitura do código de barras com a câmera do smartphone ou por
      meio de um leitor de código de barras, realizando a baixa do saldo dos materiais no almoxarifado após o
      atendimento.

- [ ] **37.** Permitir a utilização do sistema dentro de um contexto, sendo por entidade, exercício e almoxarifado.

- [ ] **38.** Permitir a configuração dos órgãos, unidades orçamentárias e centro de custo da entidade.

- [ ] **39.** Permitir listar as requisições recebidas que estejam pendentes de atendimento, que não foram totalmente
      atendidas e nem canceladas, exibindo o código da requisição, a data da requisição, o código do organograma
      requisitante, a descrição do organograma requisitante, o nome da pessoa requisitante e a situação da requisição.

- [ ] **40.** Permitir listar todos os materiais durante a entrada de materiais, podendo ser pesquisados pelo número
      do item, código do material, descrição do material e código da especificação.

- [ ] **41.** Permitir a realização de saída imediata dos materiais pertencentes a entrada, caso a entrada tenha sido
      finalizada.

- [ ] **42.** Permitir o registro das saídas de materiais do almoxarifado, sendo que ao final do registro o sistema
      deverá gerar automaticamente um código identificador da saída.

- [ ] **43.** Demonstrar as entradas e saídas de itens que estão parcialmente finalizadas, exibindo a situação na
      listagem inicial nas rotinas.

- [ ] **44.** Permitir que seja controlado o saldo dos materiais do almoxarifado.

- [ ] **45.** Permitir via dispositivo móvel atendimento dos materiais que estão sendo requisitados ao almoxarifado, o
      atendimento dos itens na requisição poderá ser efetuado por meio da leitura do código de barras do produto.

- [ ] **46.** Permitir, durante a coleta do atendimento da requisição pelo dispositivo móvel, o acréscimo na
      quantidade atendida o valor um para o material coletado possibilitando a alteração da quantidade lida, em cada
      leitura feita.

- [ ] **47.** Permitir a edição da quantidade lida do material no atendimento da requisição, de forma manual ou por
      meio de uma nova leitura do material.

- [ ] **48.** Permitir visualizar o saldo do material no almoxarifado requisitante durante o atendimento de uma
      requisição via dispositivo móvel.

- [ ] **49.** Permitir a listagem dos itens da requisição selecionada, demonstrando o código da requisição, o código
      do material, descrição do material, código da especificação, descrição da especificação, unidade de medida,
      quantidade pendente para atendimento, quantidade atendida e saldo do material no almoxarifado.

- [ ] **50.** Permitir que ao efetuar login no sistema possa selecionar o contexto do sistema, indicando a entidade
      permissionária e o Almoxarifado permissionário, o exercício existente para esta Entidade.

- [ ] **51.** Permitir a mesma autenticação no aplicativo utilizada no sistema Almoxarifado.

- [ ] **52.** Possibilitar a inserção de imagens nas descrições detalhadas no cadastro de materiais.

- [ ] **53.** Permitir a transferência de materiais entre almoxarifados e setores (centro de Custo).

- [ ] **54.** Possibilitar o envio de dados para o portal de indicadores.

- [ ] **55.** Permitir integração/envio de dados ao portal da transparência.

## Item 14 - Software de Gestão de Frotas

*Fonte: Anexo I, páginas 56-58/194.*

- [ ] **1.** Permitir que o registro de viagens, informando a data e horário de saída, data e horário de chegada,
      veículo, motorista, organograma, responsável, finalidade e observações.

- [ ] **2.** Permitir o registro dos gastos com veículos ou equipamentos, informando a data e horário da despesa,
      número da ordem, origem, caso se trate de licitação, estoque ou terceiros, veículo ou equipamento, motorista,
      organograma, fornecedor, número do documento.

- [ ] **3.** Possibilitar a consulta de dados constantes no sistema de Folha para cadastramento dos motoristas.

- [ ] **4.** Permitir registrar veículos com informações vinculando ao cadastro de bens patrimoniais do município.

- [ ] **5.** Permitir interação com o Portal da Transparência.

- [ ] **6.** Possibilitar o envio de dados para o portal de indicadores.

- [ ] **7.** Possibilitar a geração automática de uma despesa, a partir da ordem de abastecimento.

- [ ] **8.** Possibilitar o cadastramento dos materiais a serem utilizados/consumidos pelos veículos e equipamentos,
      como lubrificantes, combustíveis e pneus.

- [ ] **9.** Permitir o controle de troca de óleo dos veículos.

- [ ] **10.** Permitir o controle de troca pneus dos veículos das frotas.

- [ ] **11.** Permitir o cadastro de manutenções em gerais dos veículos previstas ou já realizadas informando a o tipo
      da manutenção, veículo, quilometragem atual, data, quilometragem e observações.

- [ ] **12.** Possuir histórico em tela da manutenção dos veículos de forma rápida para consulta.

- [ ] **13.** Possuir controle sobre abastecimentos e gastos dos veículos da entidade.

- [ ] **14.** Propiciar registrar o controle de quilometragem dos veículos, informando o motorista, o setor
      requisitante, a distância percorrida, a data/hora, a quilometragem de saída e de chegada.

- [ ] **15.** Permitir o registro das ocorrências envolvendo os veículos ou equipamentos, como troca de hidrômetro,
      acidentes, entre outros, registrando as respectivas datas.

- [ ] **16.** Permitir a inclusão de documentos e/ou imagens nas ocorrências lançadas para os veículos, devendo ser
      armazenadas no próprio banco de dados e possibilitando sua visualização pelo próprio cadastro.

- [ ] **17.** Permitir o cadastramento dos tipos de ocorrências indicando se o tipo de ocorrência se refere a uma
      adaptação no veículo ou não.

- [ ] **18.** Permitir cadastrar ordens de abastecimento e serviços para os veículos da entidade.

- [ ] **19.** Permitir a definição dos tipos de taxas e licenciamentos, trazendo como padrão IPVA, DPVAT e
      Licenciamento Anual.

- [ ] **20.** Permitir cadastrar informações de pagamento do IPVA dos veículos.

- [ ] **21.** Permitir o cadastro de licenciamentos dos veículos com informação de ano, valor do licenciamento e
      parcelar casa tenha.

- [ ] **22.** Propiciar inserir as informações dos funcionários que possuem carteira de habilitação.

- [ ] **23.** Propiciar a geração de relatórios dos dados cadastrais alimentados ao sistema como veículos, centro de
      custos, funcionários, fornecedores, ocorrências, despesas, materiais.

- [ ] **24.** Controlar o acompanhamento mensal dos veículos sendo possível, emitir relatório demonstrando os litros
      consumidos, a média de consumo do veículo.

- [ ] **25.** Propiciar emitir planilhas das ordens de abastecimento, contendo ao menos os seguintes campos:
      motorista, placa do veículo, fornecedor, material/serviço.

- [ ] **26.** Permitir a pesquisa rápida de ordens de abastecimento ou serviços registrados pelo número da ordem,
      descrição do veículo e nome do motorista.

- [ ] **27.** Permitir o cadastro de veículos com informações detalhadas como: modelo do veículo, valor de aquisição,
      número do documento fiscal, potência do motor, cilindradas, tipo de combustível utilizado, além da classificação
      (passageiro, carga, tração), cor, ano de fabricação, ano do modelo, estado de conservação, dados do motorista,
      dados do combustível (capacidade volumétrica, cota mensal, tipo do combustível) e centro de custos.

- [ ] **28.** Possuir o cadastramento de reservas de veículos por centro de custo e por funcionário, registrando a
      data da reserva e o período que o veículo será reservado, e a finalidade (serviço, viagem, manutenção entre
      outras).

- [ ] **29.** Permitir que o usuário cadastre os tipos de finalidades das reservas de veículos, devendo apresentar
      tipos padrões como serviço, viagem e manutenção.

- [ ] **30.** Propiciar controle de vencimentos do licenciamento dos veículos, em painel dinâmico.

- [ ] **31.** Propiciar controle de motoristas em painel dinâmico.

- [ ] **32.** Permitir o vínculo de motoristas a determinado veículo ou equipamento.

- [ ] **33.** Permitir salvar os relatórios em formato PDF, possibilitando que sejam assinados digitalmente.

- [ ] **34.** Permitir controlar os serviços que são realizados utilizando os veículos da entidade.

- [ ] **35.** Propiciar efetuar o cadastro das cidades que abrangem a competência da entidade.

- [ ] **36.** Permitir a emissão de relatórios com as informações que contemplam o cadastro de veículos detalhando os
      materiais utilizados pelos veículos.

- [ ] **37.** Propiciar inserir as despesas nos lançamentos dos gastos com os veículos da entidade, como nas ordens de
      abastecimento e serviço.

- [ ] **38.** Propiciar efetuar o controle do registro das saídas e retornos dos veículos.

- [ ] **39.** Propiciar realizar o registro das ordens de prestação de serviços que são realizados utilizando os
      veículos da entidade.

- [ ] **40.** Permitir a inclusão de anexos ao cadastro do veículo, possibilitando anexar, fotos, documentos do
      veículo, multas, pagamentos e demais arquivos que sejam necessários. Deve permitir arquivos nas seguintes
      extensões: PNG, BMP, JGP, GIF, DOC, DOCX, TXT, PPT, PPTX, XLS, XLSX, PDF, ODT, ODS E DWG.

- [ ] **41.** Permitir a troca de entidade e/ou exercício sem encerrar o sistema.

- [ ] **42.** Permitir a configuração dos órgãos e unidades orçamentárias.

- [ ] **43.** Permitir o checklist do veículo em tecnologia mobile para gestão da frota.

- [ ] **44.** Possibilidade de controle de saldo do empenho nas ordens de abastecimentos e serviços de despesas com
      integração com o sistema da contabilidade.

- [ ] **45.** Permitir o cadastro de rotas com informação de local de saída e chegada, além da quantidade quilômetros
      da rota.

- [ ] **46.** Permitir a criação de novos campos complementares nos cadastros padrões do sistema, sendo estes nos
      formatos área de texto, CNPJ, CPF, data, data e hora, e-mail, hora, lista de seleção, múltipla seleção,
      numérico, telefone e texto, com a indicação do rótulo, texto de ajuda, validade inicial e final do campo.

## Item 15 - Software de Licitações, Compras e Contratos

*Fonte: Anexo I, páginas 58-64/194.*

- [ ] **1.** Permitir a integração de dados de forma automática ou ainda através de arquivos de intercâmbio de
      informações com os sistemas de Contabilidade, Patrimônio, Almoxarifado, Frotas e Gerenciador de Notas
      Eletrônicas.

- [ ] **2.** Permitir a configuração da plataforma de licitações eletrônicas Compras.gov.br e interação;

- [ ] **3.** Permitir que os códigos CATMAT/CATSER do Portal de Compras do Governo Federal sejam vinculados aos
      materiais em compras e licitações.

- [ ] **4.** Permitir a indicação da configuração de estrutura organizacional a ser utilizada no exercício,
      possibilitando a criação das novas configurações caso exista necessidade.

- [ ] **5.** Permitir o cadastro de processos administrativos para compra de materiais, contratação de serviços ou
      obras, informando um protocolo, a data, o tipo do objeto, descrição do objeto, condição de pagamento, forma de
      julgamento, regime de execução, prazo de entrega, local de entrega, indicar se há previsão de subcontratação,
      categoria do processo e também a forma que será utilizada para controlar o saldo dos itens (quantidade ou
      valor).

- [ ] **6.** Permitir gerar processos administrativos ou compra direta pelo preço médio ou menor preço cotado do
      Registro de Preços.

- [ ] **7.** Permitir gerar contratação a partir da ata de registro de preço para execução do registro de preço.

- [ ] **8.** Permitir ao usuário visualizar e remanejar a quantidade dos itens divididos entre as entidades
      participantes da ata de registro de preços.

- [ ] **9.** Possibilitar a seleção da forma de contratação ou procedimento a ser adotado para o processo, caso se
      trate de uma licitação, contratação direta, adesão à ata de registro de preço ou chamada pública/credenciamento.

- [ ] **10.** Permitir aos usuários do sistema trocar de entidade e/ou exercício sem ter que fechá-lo.

- [ ] **11.** Permitir o acompanhamento dos processos licitatórios da preparação até o julgamento, registrando as
      etapas de: publicação do processo, emissão do mapa comparativo de preços, emissão das atas referentes
      documentação e julgamento das propostas, interposição de recurso, anulação e revogação, impugnação, anexar
      textos, parecer da comissão julgadora, parecer jurídico, homologação e adjudicação, autorizações de
      fornecimento, contratos e aditivos, liquidação das autorizações de fornecimento, gerar empenhos para a
      contabilidade e liquidação dos empenhos.

- [ ] **12.** Disponibilizar no sistema listagens/interfaces dinâmicas para controle de processos, contratações e de
      solicitações de fornecimento.

- [ ] **13.** Permitir o registro das solicitações de fornecimento para envio aos fornecedores dos materiais
      constantes no contrato tanto da forma impressa, como via e-mail.

- [ ] **14.** Permitir o cadastro dos recebimentos integrais ou parciais dos itens indicados nas solicitações de
      fornecimento enviadas aos fornecedores, possibilitando também a integração dos bens permanentes com o sistema
      Patrimônio e os materiais estocáveis com o sistema Almoxarifado.

- [ ] **15.** Permitir o cadastramento dos dados do fornecedor com nome, CNPJ/CPF, endereço, telefone, e-mail, porte
      da empresa, nome dos sócios e o respectivo percentual na sociedade, bem como a conta bancária para pagamento.

- [ ] **16.** Permitir integração e consulta dos dados dos fornecedores com a Receita Federal.

- [ ] **17.** Permitir incluir o CNAE (ramos de atividade) no cadastro de fornecedores e possibilitar a importação dos
      dados no CNAE do fornecedor da Receita Federal.

- [ ] **18.** Permitir inserir imagens nas descrições detalhadas no cadastro de materiais e serviços.

- [ ] **19.** Permitir o cadastro de feriados do exercício, sendo que o sistema deve disponibilizar os feriados
      nacionais do exercício logado e permitir inclusão de novos feriados como municipais e estaduais.

- [ ] **20.** Permitir a geração de arquivos e envio ao TCE para a respectiva prestação de contas;

- [ ] **21.** Permitir a geração de arquivos para demais sistemas/órgãos externos.

- [ ] **22.** Possibilitar o bloqueio/desbloqueio das despesas orçamentárias na contabilidade, permitindo o envio
      desde a solicitação de compra e mantendo-o até a geração do empenho correspondente.

- [ ] **23.** Permitir a distribuição/remanejamento da quantidade dos itens da contratação entre as despesas e
      desdobramentos da entidade.

- [ ] **24.** Permitir que o usuário escolha se deseja exibir apenas as despesas relacionadas ao Contrato ou todas as
      despesas da entidade e exercício.

- [ ] **25.** Permitir a geração de arquivo com os itens da coleta de preço para cotação pelos fornecedores,
      possibilitando a leitura dos preços cotados para preenchimento automático dos preços dos itens da coleta.

- [ ] **26.** Permitir o estimar preços dos itens da Cotação Preços, escolhendo uma das opções Preço médio, Melhor
      preço, Preço mediano ou Média saneada.

- [ ] **27.** Propiciar controlar as quantidades entregues parcialmente pelo fornecedor, possibilitando a emissão de
      relatório, contendo as quantidades entregues, os valores e o saldo pendente.

- [ ] **28.** Propiciar gerar entrada do material no almoxarifado a partir do recebimento da solicitação de
      fornecimento, na própria janela de recebimento.

- [ ] **29.** Permitir gerar bens no sistema patrimonial a partir do recebimento das solicitações de fornecimento.

- [ ] **30.** Permitir que o sistema emita mensagens de bloqueios ou avisos sobre os contratos a vencer, vencidos e
      cancelados.

- [ ] **31.** Permitir parametrização para numerar a licitação de forma sequencial ou por modalidade, possibilitando
      alterar a numeração sugerida pelo sistema.

- [ ] **32.** Disponibilizar dashboard para gerenciamento das contratações, contendo os seguintes dados: totais em
      contratações, autorização de fornecimentos, recebimentos, saldos a solicitar, contratos a vencer permitindo que
      o usuário selecione o período de vencimento que deseja visualizar e realizar controle das pendências cadastrais
      referente às contratações do exercício.

- [ ] **33.** Propiciar o cancelamento das solicitações de compra, permitindo a descrição completa do motivo da
      anulação.

- [ ] **34.** Propiciar controle, através de listagem dinâmica, de todas as Solicitações de Fornecimento, Empenhos e
      Liquidações;

- [ ] **35.** Permitir realizar o acompanhamento do saldo dos itens da licitação, detalhado por processo e por
      período.

- [ ] **36.** Propiciar efetuar o cadastro dos materiais incluindo informações como: tipo (Material, Bem Permanente ou
      Serviço), descrição sucinta e detalhada, inclusão de imagem na descrição detalhada, grupo e classe, natureza da
      despesa, descrição da natureza, informar se o material é estocável, unidade de medida, além de executar o
      controle de materiais em lista dinâmica.

- [ ] **37.** Possibilitar o cadastro e gerenciamento de Certificado de Registro Cadastral do fornecedor, permitindo
      numerar o CRC, e informar a data de validade.

- [ ] **38.** Dispor das principais fundamentações legais, como a lei 14.133/2021 e 8666/93, bem como permitir que o
      usuário cadastre uma fundamentação legal e ative/desative conforme necessidade.

- [ ] **39.** Permitir vincular documentos e certidões negativas, materiais fornecidos, nome dos sócios.

- [ ] **40.** Permitir a realização de licitações com julgamento pelo Maior Desconto sobre a Tabela/Catálogo de Preço
      ou sobre os próprios itens da licitação.

- [ ] **41.** Permitir a realização de licitações com julgamento pelo Menor Adicional de Acréscimo sobre uma Tabela de
      Preço.

- [ ] **42.** Permitir a utilização do Pregão para licitações em que o vencedor será aquele que apresentar o menor
      preço.

- [ ] **43.** Permitir realizar licitações por lotes com rateio automático do preço unitário ou possibilitar a
      atribuição do preço unitário para cada item do lote.

- [ ] **44.** Propiciar o julgamento dos processos licitatórios pela Melhor Técnica e Preço.

- [ ] **45.** Permitir aplicar, em licitações do tipo Menor Preço por Lote, descontos proporcionais para cada lote.

- [ ] **46.** Permitir o cadastro dos objetos de Licitação com a possibilidade de acompanhar os valores para cada
      modalidade dentro de um mesmo objeto, podendo saber quando o limite for ultrapassado. Os objetivos poderão ser
      utilizados nos processos licitatórios.

- [ ] **47.** Possibilitar o cadastro de novos tipos de objetos, possibilitando inserir novas descrições, selecionando
      os tipos de objetos padrões que devem existir no sistema: Compras e Serviços, Aquisição de Bens, Prestação de
      Serviços, Obras e Serviços de Engenharia, Alienação de Bens, Cessão de Direitos, Concessão, Concurso, Permissão,
      Locação, Seguros, Contratos de rateio, Outros direitos e Outras Obrigações.

- [ ] **48.** Permitida realizar dispensa de licitação com lances;

- [ ] **49.** Permitir a indicação dos fornecedores que participarão da cotação e informar os preços que cada um
      ofereceu para os itens solicitados.

- [ ] **50.** Permitir cadastrar a forma de julgamento das propostas dos licitantes que participam da licitação.

- [ ] **51.** Propiciar cadastrar modelos de textos próprios, como solicitações e pareceres.

- [ ] **52.** Propiciar manter o cadastro dos órgãos oficiais que serão realizadas as publicações dos processos.

- [ ] **53.** Possibilitar o registro das solicitações de compra, bem como a emissão de relação das mesmas por
      período.

- [ ] **54.** Permitir o cadastro de solicitação de compra informando a sua entidade gestora.

- [ ] **55.** Permitir o cadastramento de coletas de preço, possibilitando gerar uma compra direta ou processo
      administrativo, tendo como base para o valor máximo do item o preço médio ou menor preço cotado para o item na
      coleta de preços.

- [ ] **56.** Permitir anexar documentos no processo administrativo.

- [ ] **57.** Permitir a inserção dos itens do processo administrativo contendo o material ou serviço, quantidade,
      preço unitário previsto, preço total e indicação da solicitação de compra de origem.

- [ ] **58.** Disponibilizar rotina de transferência de vencedor no processo licitatório, a ser utilizada nos casos em
      que o convocado (Vencedor) não assinar/aceitar a ata de registro de preços ou o termo de contrato, sendo
      necessário convocar os licitantes remanescentes e declarar um novo vencedor.

- [ ] **59.** Permitir excluir uma coleta de preços.

- [ ] **60.** Propiciar o cadastro e julgamento dos processos com os tipos: menor preço por material, global ou por
      lote.

- [ ] **61.** Permitir, diretamente do sistema, a realização de pesquisa de preço, possibilitando buscar e filtrar o
      menor preços dos materiais e serviços, das licitações realizadas nas esferas Municipal, Estadual e Federal do
      ComprasGov.

- [ ] **62.** Permitir o cadastro de compras diretas, informando dados como data da compra, fornecedor, centro de
      custo, objeto da compra, local de entrega e forma de pagamento.

- [ ] **63.** Permitir a busca de contratações e compras diretas independentemente do exercício logado, permitindo a
      consulta e pesquisa de informações por pesquisa avançada ou filtros existentes no próprio ambiente, tais como:
      contratos em execução, encerrados e cancelados.

- [ ] **64.** Permitir cadastro dos itens da compra direta separando estes por centros de custo específicos, por
      despesas ou ambos.

- [ ] **65.** Permitir duplicar o cadastro de compra direta e seus itens.

- [ ] **66.** Permitir executar a rotina de exclusão da compra direta.

- [ ] **67.** Permitir a exclusão de contratos.

- [ ] **68.** Propiciar emitir o ofício de justificativa de dispensa de licitação.

- [ ] **69.** Propiciar a emissão da autorização de fornecimento das compras diretas, permitindo vincular os dados dos
      empenhos.

- [ ] **70.** Emitir a solicitação da abertura da licitação, com informações número da licitação, modalidade, forma de
      julgamento, forma de pagamento, prazo de entrega, local de entrega, vigência, itens e objeto a ser licitado.

- [ ] **71.** Propiciar cadastrar e acompanhar os processos licitatórios desde a preparação até seu julgamento, em
      listagem interativa.

- [ ] **72.** Permitir o envio dos dados dos processos licitatórios para o portal da transparência.

- [ ] **73.** Disponibilizar campo para inserção de link de gravação audiovisual das sessões de julgamento.

- [ ] **74.** Propiciar o cadastramento de licitações envolvendo a demanda de uma ou mais entidades, onde a entidade
      gestora da licitação poderá gerenciar as aquisições realizadas pelas entidades participantes.

- [ ] **75.** Possibilitar através da consulta do material, a pesquisa do histórico completo de compra, podendo
      consultar dados de contratações, tais como: fornecedor e valor unitário.

- [ ] **76.** Permitir a contratação do segundo classificado quando o fornecedor vencedor deixar de fornecer o
      material ou de executar os serviços, mostrando na tela o próximo fornecedor classificado e opção para assumir ou
      não o mesmo preço unitário do vencedor anterior.

- [ ] **77.** Registrar os processos licitatórios contendo todos os dados necessários para sua identificação, tais
      como número do processo, objeto da compra, modalidade de licitação, fundamentação legal, se é registro de preço,
      autoridade competente, comissão responsável e datas de abertura e recebimento dos envelopes.

- [ ] **78.** Permitir que os itens do processo sejam separados por centro de custo com suas respectivas quantidades,
      possibilitando ainda a separação por despesa.

- [ ] **79.** Permitir no lançamento dos itens do processo licitatório a inclusão de um novo item entre os já
      inseridos e após realizar a renumeração dos itens.

- [ ] **80.** Permitir a apuração dos vencedores da licitação, bem como desclassificar aqueles que não cumpriram algum
      item do edital ou cotaram preço acima do preço máximo estabelecido para um item, inclusive se for licitação por
      lotes.

- [ ] **81.** Permitir efetuar lances para na modalidade de pregão presencial de forma cronometrada, apresentando a
      diferença mínima entre os lances, bem como visualizar o valor mínimo aceitável para o próximo lance, com a opção
      de declinar para os participantes que desistirem da competição.

- [ ] **82.** Permitir o registro da inabilitação de um licitante logo após o encerramento de cada item/lote do Pregão
      Presencial ou somente após o encerramento de todos os itens/lotes.

- [ ] **83.** Permitir que o pregoeiro registre os lances do pregão trazendo ao final de cada lance o próximo
      classificado automaticamente e permitindo registrar um novo lance ou declinar o participante salvando
      automaticamente os lances já registrados, e possibilitar ainda, que ao retornar aos lances, caso esses tenham
      sido interrompidos, possa continuar de onde parou.

- [ ] **84.** Propiciar a utilização de critérios de julgamento das propostas em relação a microempresa e empresa de
      pequeno porte, de acordo com lei complementar 123/2006.

- [ ] **85.** Permitir o armazenamento, por meio de arquivo PDF ou de imagem, do documento do participante da
      licitação.

- [ ] **86.** Possibilitar, a partir da tela de lances do pregão, desclassificar um participante já classificado para
      a etapa de lances, permitindo refazer a classificação. Após desclassificar um participante, o sistema deve
      possibilitar a reclassificação das propostas, desconsiderando o participante que foi desclassificado, permitindo
      a inclusão dos demais.

- [ ] **87.** Possibilitar a distribuição automática da diferença entre o valor do lote proposto e o valor final do
      lote vencido pelo participante, permitindo informar quantas casas decimais deseja utilizar no rateio. Se faz
      necessária a funcionalidade para ajustar o valor unitário dos itens de cada lote, até que a soma do valor dos
      itens totalize o mesmo valor do lote proposto pelo vencedor.

- [ ] **88.** Propiciar a emissão de demonstrativo com a relação da economicidade do pregão presencial (valor previsto
      x lance).

- [ ] **89.** Possibilitar a classificação automática dos preços ofertados pelos participantes, destacando aqueles que
      apresentarem o menor preço por item ou menor preço global, possibilitando ao usuário, selecionar outro
      fornecedor caso seja necessário.

- [ ] **90.** Permitir cadastrar as propostas de preços dos participantes da licitação, ou a importação da proposta
      digitada pelo participante em outro aplicativo. Permitir, ainda, a digitação do valor unitário dos itens da
      proposta do participante, inclusive quando for por lote.

- [ ] **91.** Permitir armazenar no sistema, por meio de arquivo pdf ou de imagem, a proposta original do
      participante.

- [ ] **92.** Permitir integração com plataformas de licitação eletrônicas como por exemplo: Portal de Compras
      Públicas, ComprasBR e BNC (BLL).

- [ ] **93.** Conter rotina para duplicar os dados de um processo de compra já cadastrado para um novo processo de
      compra de forma automática.

- [ ] **94.** Permitir o cadastro de sanções e penalidades aplicáveis ao fornecedor contratado, contendo informações
      como: o fornecedor, tipo de sanção, número do contrato, data da sanção, período que deverá ser aplicada,
      processo administrativo sancionatório, fundamento legal e motivo.

- [ ] **95.** Conter rotina de registro das interposições de recursos nos processos de compra.

- [ ] **96.** Conter rotina de anulação, revogação, descarte, suspensão e reinício dos processos de compra.

- [ ] **97.** Conter rotina de registro das possíveis impugnações no processo de compra.

- [ ] **98.** Propiciar efetuar os registros dos pareceres das comissões de licitação e serem emitidas nos modelos de
      atas de julgamento de propostas.

- [ ] **99.** Proporcionar o registro de licitação Deserta ou Fracassada no processo de compra.

- [ ] **100.** Propiciar o registro de adjudicação, homologações e adjudicações e homologação ou ratificação nos
      processos de compra.

- [ ] **101.** Propiciar informar nos processos licitatórios as dotações orçamentárias da entidade gestora e das
      participantes para cada item, caso o processo seja multientidade possibilitar informar a dotação de cada
      entidade.

- [ ] **102.** Propiciar gerar os bloqueios/desbloqueios de dotações orçamentárias para cada entidade contábil através
      do processo de compra.

- [ ] **103.** Permitir cadastrar processos de compras individuais para cada entidade, desde as solicitações de
      compras, coletas de preços, processo de compra e contratos.

- [ ] **104.** Permitir que os dados sejam unificados entre entidades, permitindo o cadastro de diferentes entidades,
      onde os cadastros de materiais e credores poderão ser integrados entre as entidades.

- [ ] **105.** Permitir visualizar e controlar o andamento das contratações cadastradas, listando cada uma em sua
      situação, possibilitando utilizar filtros de pesquisa e, agrupar os registros por entidade e por fornecedor.

- [ ] **106.** Possuir controle automático do saldo dos itens do contrato, podendo controlar pela quantidade do item
      ou pelo valor total do item, considerando valor e quantidade original, aditamentos de acréscimo ou supressão,
      entre outras alterações contratuais que refletem no saldo quantitativo ou financeiro.

- [ ] **107.** Permitir cadastrar as despesas orçamentárias, de forma individual e manual, ou de forma automática
      informando àquelas do processo que originou a contratação.

- [ ] **108.** Permitir o bloqueio e desbloqueio das dotações orçamentárias vinculadas às contratações de forma
      automática via sistema.

- [ ] **109.** Permitir anexar textos ou documentos nas contratações e criar modelos de contratos.

- [ ] **110.** Permitir o envio dos dados das contratações para criação dos empenhos na contabilidade, informando a
      origem dos dados.

- [ ] **111.** Possibilitar o cadastro de anulação de empenho informando os dados do empenho a ser anulado, bem como
      permitir a integração com a contabilidade.

- [ ] **112.** Permitir o envio de liquidação dos empenhos das contratações na contabilidade, informando a data de
      referência e a situação das informações, disponibilizando para consulta a despesa orçamentária, seu
      desdobramento, o recurso e o valor total do empenho.

- [ ] **113.** Permitir o cadastro de um processo de compra para mais de uma entidade, permitindo reunir solicitações
      de compra de todas as entidades para formação de um único processo licitatório, dessa forma, os itens deverão
      ser separados em quantidades para cada entidade levando em consideração as respectivas dotações e centros de
      custos. Para esses casos, o sistema deve possuir uma entidade gestora, responsável pelo processo de compra.

- [ ] **114.** Possibilitar incluir os responsáveis dos contratos, informando nome, tipo de responsabilidade
      (assinante, controlador de encargos, gestor, suplente ou fiscal) e seu período de responsabilidade.

- [ ] **115.** Permitir, no registro do contrato, vincular itens conforme os itens vencidos da licitação, e em caso de
      contratação sem licitação, permitir inserir os itens desejados.

- [ ] **116.** Permitir cadastrar todas as contratações, precedidas ou não de procedimento licitatório, controlando
      quando há exigência de termo contratual e quando ele é dispensado, informando a numeração, caso possua, o objeto
      da contratação, fornecedor, data de assinatura, período de vigência, valor original da contratação, se envolve
      contratação com saúde ou educação.

- [ ] **117.** Permitir a identificação dos contratos que estão em execução e dos que estão encerrados.

- [ ] **118.** Permitir o cancelamento de uma contratação registrada no sistema, informando a data do cancelamento e o
      seu motivo.

- [ ] **119.** Permitido registrar o cronograma de pagamentos nas contratações.

- [ ] **120.** Permitir manter histórico das alterações do contrato permitindo o tipo de alteração contratual, tais
      como: acréscimo, diminuição, equilíbrio econômico-financeiro, prorrogação, rescisão ou apostilamento.

- [ ] **121.** Propiciar a rescisão do contrato ou aditivo, informando motivo da rescisão, tipo, data, valor cancelado
      e indenizado e responsável.

- [ ] **122.** Propiciar registrar o apostilamento de alteração de despesa orçamentária do processo licitatório.

- [ ] **123.** Permitir a criação de relatórios personalizados.

- [ ] **124.** Permitir a criação de novos campos complementares aos cadastros padrões disponibilizados, sendo estes
      nos formatos área de texto, CNPJ, CPF, data, data e hora, e-mail, hora, lista de seleção, múltipla seleção,
      numérico, telefone e texto, com a indicação do rótulo, texto de ajuda, validade inicial e final do campo.

- [ ] **125.** Disponibilizar acesso a central de ajuda com acesso nas telas do sistema

- [ ] **126.** Possibilitar o envio de Licitações, Contratação Direta, Atas de Registros de Preços, Credenciamentos,
      Contratos e Alterações Contratuais para o Portal Nacional de Contratações Públicas (PNCP).

- [ ] **127.** Disponibilizar a figura do Agente de Contratação nas comissões de licitação.

- [ ] **128.** Possibilitar a prorrogação de prazo nas atas de registros de preços conforme previsto na lei
      14.133/2021.

- [ ] **129.** Permitir o cadastro de Documentos de Formalização de Demandas (DFD) com a possibilidade de informar a
      entidade gestora, setor requisitante, data, responsável, descrição, justificativa, prioridade, data da
      contratação e número e nome da contratação futura.

- [ ] **130.** Permitir vincular os itens no Documentos de Formalização de Demandas (DFD) estes itens devem possuir
      informações exigidas pelo PNCP para o envio do PCA tais como: Catálogo utilizado, categoria, código da classe e
      descrição da classe.

- [ ] **131.** Permitir a tramitação utilizando formato de fluxograma do Documentos de Formalização de Demandas (DFD)
      nas seguintes etapas: Em edição, Aguardando aprovação, Aprovado e Reprovado.

- [ ] **132.** Permitir a criação e gerenciar o Plano de Contratação Anual (PCA).

- [ ] **133.** Ser possível criar o Plano de Contratação Anual (PCA) a partir de um ou mais DFD cadastrados.

- [ ] **134.** Disponibilizar ferramenta de cadastro único dos dados, onde o usuário personaliza a forma como seus
      cadastros devem ser unificados.

- [ ] **135.** Possibilitar a configuração de quantidade de casas decimais para quantidade e valores unitários.

## Item 16 - Serviço mensal de Script de Integração entre o Consórcio Intermunicipal CONDESUS e o Software de Licitações, Compras e Contratos do Município

*Fonte: Anexo I, páginas 64-65/194.*

- [ ] **1.** Validar se já existe ou não o item na entidade. Se não existir, deverá ser cadastrado automaticamente o
      Item.

- [ ] **2.** Validar se já existe ou não o fornecedor na entidade. Se não existir, deverá ser cadastrado
      automaticamente o fornecedor.

- [ ] **3.** Inserir os itens dos Processo do respectivo organograma da divisão realizada no Consórcio.

- [ ] **4.** Inserir os fornecedores/participantes do Processo.

- [ ] **5.** Inserir as propostas dos itens e fornecedores.

## Item 17 - Software de Nota Fiscal Eletrônica

*Fonte: Anexo I, páginas 65-72/194.*

- [ ] **1.** Possuir rotina para controle e gerenciamento das liberações das solicitações de acessos, de modo que
      permita ao fisco municipal realizar os seguintes procedimentos:
  - [ ] **1.1.** Permitir filtrar as solicitações pelo contribuinte que fez o cadastro e também de forma
        individualizada por situação (Não analisada, Em análise, Deferida, Indeferida) ou todas juntas.
  - [ ] **1.2.** Realizar as tramitações na solicitação de acesso, podendo colocar os status em análise, ou conceder o
        parecer final de Deferida ou Indeferida, podendo ainda para cada status, preencher um comentário.
  - [ ] **1.3.** Possuir ambiente próprio de liberação, visualizar os dados cadastrais preenchidos pelo contribuinte
        no formulário da solicitação e os dados cadastrais da base de dados do município.
  - [ ] **1.4.** Permitir visualizar em tela o histórico de alterações da solicitação.
  - [ ] **1.5.** Possibilitar visualizar por meio de expertise do sistema, as diferenças ou inexistências cadastrais
        nos dados preenchidos pelo contribuinte. O sistema deve apresentar um indicativo em cada campo cadastral que
        exista divergência de informação.

- [ ] **2.** Enviar e-mail ao fiscal quando for efetuada uma solicitação de acesso à entidade, permitindo cadastrar
      quais fiscais receberão este e-mail.

- [ ] **3.** Permitir a configuração do sistema, para que somente pessoas jurídicas possam solicitar acesso ao sistema
      como “prestador de serviço” para emitir notas fiscais.

- [ ] **4.** Possibilitar que o contribuinte seja informado por e-mail quando a sua solicitação de acesso estiver “em
      análise".

- [ ] **5.** Permitir que o contribuinte seja informado por e-mail quando ele for desautorizado da emissão eletrônica
      de notas fiscais de serviços.

- [ ] **6.** Permitir a emissão de relatório dos contribuintes que aderiram ao sistema, como prestadores para emissão
      de nota fiscal eletrônica.

- [ ] **7.** Permitir ao fisco municipal configurar a obrigatoriedade ou não da solicitação de acesso ser assinada
      digitalmente.

- [ ] **8.** Permitir ao fisco municipal personalizar o modelo de documento da solicitação de acesso, e ainda, através
      de parametrização do sistema, definir se o documento deve ou não estar disponível para emissão.

- [ ] **9.** Permitir que seja personalizado o modelo de e-mail da solicitação de acesso, podendo parametrizar
      conteúdos diferentes para um novo cadastro, para as movimentações (Em análise, Deferida, Indeferida), como
      também, personalizar para qual destinatário deverá ser encaminhado o e-mail.

- [ ] **10.** Permitir que o fisco municipal configure uma mensagem para que seja exibida no formulário de
      preenchimento da solicitação de acesso, com o intuito de orientar o contribuinte sobre o fluxo do processo
      município.

- [ ] **11.** Permitir que seja personalizado o formulário da solicitação de acesso, dando condições ao fisco
      municipal escolher quais campos devem estar disponíveis para o contribuinte preencher, seu tamanho, sua
      obrigatoriedade de preenchimento como também, se poderá editar ou não os dados sugeridos pelo sistema.

- [ ] **12.** Possuir ambiente que permita ao fisco municipal configurar artefatos de validação para a solicitação de
      acesso, dando condições para que a solicitação seja impedida de ser registrada caso não atenda os critérios
      estabelecidos pelo município.

- [ ] **13.** Possuir ambiente para que o contribuinte possa cadastrar a solicitação de acesso no município, dando
      condições de:
  - [ ] **13.1.** Selecionar o município desejado para solicitar acesso.
  - [ ] **13.2.** Indicar o perfil de acesso da solicitação, se é para Prestador ou Tomador.
  - [ ] **13.3.** Visualizar seus dados cadastrais registrados na base de dados do município, como dados pessoais,
        endereço e dados de contato, podendo alterá-las mediante permissão do município.
  - [ ] **13.4.** Anexar documentos na solicitação de acesso.
  - [ ] **13.5.** Visualizar o resumo prévio da solicitação antes de efetivar o cadastro.

- [ ] **14.** Permitir que o contribuinte possa acompanhar o andamento da solicitação de acesso registrada por ele
      através de consulta disponibilizada pelo sistema, permitindo consultar uma determinada solicitação de acesso em
      específico como também, todas as solicitações que foram registradas pelo mesmo usuário, para o mesmo município
      ou município diferentes.

- [ ] **15.** Bloquear o registro de uma nova solicitação de acesso para o mesmo município, caso já exista uma
      solicitação de acesso registrada pendente de parecer final, ou se o prestador já estiver autorizado.

- [ ] **16.** Impedir que a pessoa jurídica faça o registro de uma nova solicitação de acesso caso já esteja
      autorizada a emitir notas fiscais em outro município.

- [ ] **17.** Permitir a emissão de relatório de solicitações de acesso pendentes.

- [ ] **18.** Permitir parametrizar se o ano de emissão deve compor o número da nota fiscal.

- [ ] **19.** Permitir que seja parametrizado a obrigatoriedade do uso da CNAE juntamente ao item da lista de serviço
      na emissão da nota fiscal.

- [ ] **20.** Permitir configurar se o contribuinte poderá informar ou não a data do fato gerador da nota fiscal no
      momento da sua emissão.

- [ ] **21.** Permitir configurar se as pessoas físicas que são responsáveis por prestadores de serviços pessoas
      Jurídicas, podem assinar digitalmente as notas fiscais utilizando e-CPF.

- [ ] **22.** O sistema deve disponibilizar diferentes modelos padrões de nota fiscal para uso pelo município,
      permitindo ainda que estes modelos de documento possam ser personalizados.

- [ ] **23.** Permitir por meio de configuração em tela do sistema, as mensagens a serem apresentadas no documento da
      nota fiscal, de acordo com as características da nota fiscal. Nessa configuração deve ser possível definir se a
      mensagem será exibida e configurar o texto da mensagem.

- [ ] **24.** Possibilitar que sejam configuradas mensagens de orientação para serem demonstradas para o prestador, no
      momento em que o prestador acessar seu módulo do sistema, tendo como características de configuração.
  - [ ] **24.1.** Possibilitar descrever um texto para a mensagem, anexar arquivo e definir a periodicidade de
        exibição.
  - [ ] **24.2.** Deve poder definir para qual tipo de prestador a mensagem deverá ser exibida, podendo ser
        configurado todos, ou personalizar por tipo de pessoa (Física ou Jurídica), Modalidade de ISS, Porte da
        empresa e Opção do simples nacional.
  - [ ] **24.3.** Deve poder registrar mensagens vigentes ou programadas;
  - [ ] **24.4.** Deve poder registrar quantas mensagens vigentes forem necessárias ao mesmo tempo, para o mesmo tipo
        de prestador ou para tipos diferentes

- [ ] **25.** Possuir ambiente para que o prestador de serviço possa visualizar as mensagens de orientação
      configuradas pelo município, podendo o prestador identificar quando é uma nova mensagem que ainda não foi
      visualizada por ele, verificar a lista de mensagens não lidas e as lidas, podendo ainda, para uma mensagem já
      lida, marcar como não lida e para uma mensagem não lida marcar como já lida.

- [ ] **26.** Permitir a emissão eletrônica de notas fiscais de serviços, contendo validade jurídica por certificação
      digital, sendo o certificado do tipo A1 ou A3 da ICP-Brasil.

- [ ] **27.** Possibilitar que seja parametrizado para cada prestador as alíquotas dos tributos federais (PIS, COFINS,
      INSS, Imposto de Renda e CSLL, Outros), para que na tela de emissão da nota o sistema calcule automaticamente os
      seus respectivos valores.

- [ ] **28.** Permitir que seja adicionado mais de um serviço na mesma nota fiscal, seja para itens da lista de
      serviço iguais ou distintos.

- [ ] **29.** Permitir que o prestador informe o intermediário do serviço na nota fiscal.

- [ ] **30.** Permitir que o prestador informe a situação tributária da nota fiscal, para os casos de tributação
      direta ao município, retenção e substituição tributária.

- [ ] **31.** Permitir que o prestador informe para cada serviço da nota fiscal os seguintes valores: valor unitário
      do serviço, quantidade de serviço, valor de desconto condicionado, valor de desconto incondicionado e valor de
      dedução.

- [ ] **32.** Possibilitar ao fisco municipal controlar os prestadores que podem informar descontos e deduções na nota
      fiscal, controlando se for o caso, determinados prestadores e determinados serviços.

- [ ] **33.** Permitir visualizar uma prévia da nota fiscal eletrônica antes de efetivar sua emissão.

- [ ] **34.** Permitir a assinatura da nota fiscal de serviço eletrônica e a carta de correção automaticamente a
      partir do certificado A1, previamente importado para um determinado usuário. Uma vez que o certificado A1
      estiver importado, o sistema deve identificá-lo e utilizá-lo independente do computador em que a nota/carta de
      correção está sendo emitida.

- [ ] **35.** Possibilitar a identificação na visualização da nota se ela está assinada digitalmente ou não e qual o
      tipo de certificado utilizado (Digital ou ICP Brasil).

- [ ] **36.** Possibilitar a informação das condições de pagamento na nota fiscal eletrônica de serviços. Tratando-se
      de condições a prazo deverá ser informada a quantidade de parcelas, as datas de vencimento e o valor de cada
      uma.

- [ ] **37.** Enviar e-mail ao tomador do serviço quando a nota fiscal eletrônica de serviços prestados for emitida.

- [ ] **38.** Permitir que seja configurado uma relação de e-mails padrão do prestador para que sejam sugeridos em
      novas emissões, podendo ainda além desses padrões, incluir outros e-mails diretamente pela tela de emissão, ou
      também, removê-los.

- [ ] **39.** Permitir ao prestador personalizar discriminações dos serviços para agilizar o preenchimento da nota
      fiscal, deixando-as predefinidas para cada item da lista de serviço relacionado ao seu cadastro. No momento do
      cadastro, o sistema deve permitir ao prestador consultar a relação de discriminações predefinidas dando
      condições se selecionar a desejada.

- [ ] **40.** Possibilitar que a nota fiscal eletrônica de serviços prestados seja integrada automaticamente no
      sistema de escrituração fiscal e, após sua emissão, permitir ao contribuinte solicitar seu acesso no sistema
      como prestador, para emissão de nota fiscal eletrônica.

- [ ] **41.** Possuir ambiente que permita ao fisco municipal configurar artefatos de validação para a emissão de nota
      fiscal, dando condições para que a nota fiscal seja impedida de ser emitida caso não atenda os critérios
      estabelecidos pela legislação do município.

- [ ] **42.** Permitir ao Contribuinte a emissão de guia de recolhimento referente às notas fiscais de serviço
      eletrônicas.

- [ ] **43.** Permitir que o contribuinte escolha quais as notas de serviço eletrônica componham a guia de
      recolhimento.

- [ ] **44.** Possibilitar o intercâmbio automático de dados de lançamentos e pagamentos com o sistema tributário.

- [ ] **45.** Permitir que o prestador do serviço cancele a guia de pagamento gerada, para que as notas fiscais possam
      ficar disponíveis para nova geração.

- [ ] **46.** Permitir que o prestador registre uma solicitação de cancelamento da guia de pagamento, para os casos
      onde o prazo permitido pelo município ultrapassou. Dessa forma a guia será cancelada mediante análise de
      deferimento por parte do fisco municipal.

- [ ] **47.** Permitir que o contribuinte efetue alterações nas informações do Telefone, Fax, Celular e E-mail sem ter
      que entrar em contato com o fisco municipal.

- [ ] **48.** Permitir que o contribuinte copie uma nota fiscal já emitida para a geração de uma nova nota.

- [ ] **49.** Possibilitar que o prestador do serviço, através de tela de emissão de notas fiscais, consulte a relação
      de tomadores registrados.

- [ ] **50.** Permitir que o prestador possa por meio de configuração, autorizar outras pessoas a serem responsáveis
      por emitir e assinar digitalmente notas eletrônicas.

- [ ] **51.** Possibilitar que o prestador de serviço liberado para emitir nota fiscal de serviços eletrônicos, possa
      personalizar sua nota com o logotipo de sua empresa.

- [ ] **52.** Possibilitar a exibição do site do prestador, bem como as informações da inscrição municipal e estadual
      na impressão da nota fiscal de serviço.

- [ ] **53.** Possibilitar a emissão de nota fiscal com a situação “descontado pela prefeitura”, por parte dos
      tomadores de serviços, a fim de obter o funcionamento de uma nota retida.

- [ ] **54.** Possibilitar a substituição de nota fiscal de serviço eletrônica, permitindo que a mesma nota
      (substituta), substitua apenas uma ou várias notas.

- [ ] **55.** Possuir ambiente que permita ao fisco municipal configurar artefatos de validação para a substituição da
      nota fiscal, dando condições para que a substituição seja impedida de ser efetuada caso não atenda os critérios
      estabelecidos pelo município.

- [ ] **56.** Possuir ambiente que permita ao fisco municipal configurar artefatos de validação para o cancelamento da
      nota fiscal, dando condições para que o cancelamento seja impedido de ser efetuado caso não atenda os critérios
      estabelecidos pelo município.

- [ ] **57.** Possibilitar que o prestador de serviço cancele a nota fiscal emitida, podendo cancelar a nota
      individualmente ou em lote, com a possibilidade de inclusão de anexos.

- [ ] **58.** Permitir que o contribuinte solicite o cancelamento de nota fiscal, ainda que ultrapassado os limites da
      configuração do sistema, tendo em vista que haverá apreciação posterior do fiscal que deverá analisar a referida
      solicitação, com a possibilidade de inclusão de anexos.

- [ ] **59.** Permitir que o contribuinte solicite a substituição de nota fiscal, ainda que ultrapassado os limites da
      configuração do sistema, tendo em vista que haverá apreciação posterior do fiscal que deverá Deferir ou
      Indeferir tal solicitação, com a possibilidade de inclusão de anexos.

- [ ] **60.** Possibilitar o controle do usuário que deferiu ou indeferiu uma solicitação de cancelamento de notas.

- [ ] **61.** Possibilitar o controle do usuário que deferiu ou indeferiu uma solicitação de substituição de notas.

- [ ] **62.** Possibilitar que o prestador, mediante permissão do município, possa realizar o estorno da substituição
      de notas fiscais.

- [ ] **63.** Permitir que o contribuinte solicite o estorno da substituição de nota fiscal, tendo em vista que haverá
      apreciação posterior do fiscal que deverá Deferir ou Indeferir tal solicitação, com a possibilidade de inclusão
      de anexos.

- [ ] **64.** Permitir que o contribuinte solicite o estorno do cancelamento da nota fiscal, tendo em vista que haverá
      a apreciação posterior do fiscal que deverá Deferir ou Indeferir tal solicitação, com a possibilidade de
      inclusão de anexos.

- [ ] **65.** Permitir a correção de algumas informações (endereço, contato, outras informações, condição de pagamento
      e discriminação do serviço) da nota fiscal eletrônica gerada por meio da carta de correção.

- [ ] **66.** Permitir a visualização acerca da carga tributária dos serviços prestados, através da emissão de nota
      eletrônica.

- [ ] **67.** Possibilitar ao Contribuinte a exportação de todas as notas fiscais no formato XML.

- [ ] **68.** Permitir ao contribuinte prestador de serviços, emitir relatório de notas fiscais emitidas,
      possibilitando ordenar as informações por número da nota, data de emissão da nota, valor do serviço ou valor do
      ISS.

- [ ] **69.** Possibilitar aos usuários do sistema verificarem todas as importantes melhorias acrescentadas em cada
      versão lançada.

- [ ] **70.** Possibilitar a utilização do teclado virtual para digitação da senha de acesso, tornando o processo de
      login mais seguro.

- [ ] **71.** Permitir a criação de contrassenha (CAPTCHA), caso o contribuinte erre a senha do seu respectivo usuário
      3 vezes seguidas.

- [ ] **72.** Permitir que o contribuinte envie sua opinião sobre o sistema.

- [ ] **73.** Permitir ao fiscal pesquisar as funcionalidades existentes do sistema em seu módulo, digitando sua
      descrição ou parte dela. O sistema deve direcionar o usuário para a tela que corresponde a referida
      funcionalidade pesquisada.

- [ ] **74.** Permitir que o fiscal favorite suas funcionalidades mais utilizadas de modo que facilite o uso do
      sistema no seu dia a dia, podendo realizar tal procedimento para quantas funcionalidades forem necessárias.

- [ ] **75.** Permitir que o fisco municipal consulte os prestadores de serviços do município de acordo com sua
      permissão para emitir Nota Fiscal de Serviço Eletrônica, podendo listar:
  - [ ] **75.1.** Os prestadores que não possuem autorização.
  - [ ] **75.2.** Os prestadores que estão aguardando a autorização ser concedida.
  - [ ] **75.3.** Os prestadores autorizados.
  - [ ] **75.4.** Os prestadores com autorização suspensa temporariamente.
  - [ ] **75.5.** Os prestadores desautorizados.

- [ ] **76.** Permitir ao fisco municipal gerenciar os cadastros dos prestadores de serviços do seu município,
      possibilitando fazer sua manutenção cadastral de inclusão e atualização, tais como: dados pessoas, dados de
      endereço, dados de contato, relação das atividades do prestador, benefícios fiscais, e-mail, movimentação do
      simples nacional, movimentação de porte da empresa.

- [ ] **77.** Possibilitar que o tomador de serviço denuncie a não conversão do RPS em nota fiscal de serviço
      eletrônica.

- [ ] **78.** Possibilitar a consulta da autenticidade da nota fiscal de serviço eletrônica. O sistema deverá
      disponibilizar um campo para informar CPF/CNPJ do prestador ou número da nota e código de verificação, que
      permita validar o documento.

- [ ] **79.** Permitir ao fiscal controlar a sequência das notas fiscais emitidas, autorizando ou não que a mesma seja
      alterada.

- [ ] **80.** Possibilitar configuração que permita parametrizar o cancelamento pelo prestador das notas fiscais
      eletrônicas de serviços.

- [ ] **81.** Possuir configuração dos convênios bancários para que sejam parametrizados os dados para emissão da guia
      de pagamento.

- [ ] **82.** Possuir ambiente que permita configurar as fórmulas de acréscimos (correção, juros e multa), para que o
      sistema possa emitir as guias de pagamento atualizadas conforme o vencimento definido pelo prestador.

- [ ] **83.** Possuir cadastro de indexadores para que o fisco municipal possa registrar suas moedas de referência
      para fins dos cálculos dos acréscimos.

- [ ] **84.** Possuir cadastro de feriados nacionais, estaduais e municipais.

- [ ] **85.** Possibilitar que o município registre as competências do ano para geração das notas fiscais, atendendo
      assim a legislação municipal.

- [ ] **86.** Possibilitar a configuração do valor mínimo para geração das guias de pagamento.

- [ ] **87.** Possibilitar que o prestador gere as guias de pagamento das notas fiscais emitidas.

- [ ] **88.** Possibilitar que o fisco municipal gere as guias de pagamento das notas fiscais emitidas pelos
      prestadores do município.

- [ ] **89.** Possibilitar que o fisco municipal configure o sistema para gerar a guia de pagamento de forma
      automática, caso a competência anterior a atual possua notas fiscais pendentes de geração da guia.

- [ ] **90.** Possuir notificação ao contribuinte indicando a existência de notas fiscais pendentes de geração da guia
      de pagamento em anos anteriores.

- [ ] **91.** Possuir notificação ao contribuinte indicando a existência de guias pendentes de pagamento em anos
      anteriores.

- [ ] **92.** Permitir ao contribuinte consultar as guias de pagamento geradas, podendo filtrar por Ano, Competência,
      Tipo, Vencimento e Situação (Aberta, Cancelada, Abaixo do limite, Pagamento compensado, Em fiscalização,
      Parcelada, Benefícios fiscais, Paga, Suspensa e Inscrita em dívida ativa).

- [ ] **93.** Permitir ao contribuinte visualizar detalhadamente as movimentações dos saldos gerados, podendo ainda
      saber o valor atual de saldo liberado ou bloqueado que contém.

- [ ] **94.** Permitir a parametrização do sistema para que os contribuintes do tipo pessoa física enquadrada como
      Fixo e Microempreendedor Individual - MEI não sejam obrigados a emitir notas fiscais eletrônicas de serviço com
      certificado digital.

- [ ] **95.** Permitir selecionar qual modelo deve ser utilizado para visualização da NFS-e.

- [ ] **96.** Permitir que o contribuinte visualize seus dados cadastrais contidos na base de dados do município, sem
      ter necessidade de entrar em contato com o município.

- [ ] **97.** Permitir que o sistema gere as competências para o exercício seguinte de forma automática, caso essas
      não tenham sido geradas até o dia 31/12.

- [ ] **98.** Permitir o bloqueio automático de emissão de notas do contribuinte caso ele não emita nenhuma nota em
      até determinado dia (conforme configuração) após o deferimento da sua respectiva solicitação de acesso ele deve
      ser comunicado por e-mail que teve a emissão de notas bloqueada.

- [ ] **99.** Permitir a movimentação da natureza da operação de uma determinada nota para "Exigibilidade Suspensa por
      processo administrativo", "Exigibilidade suspensa por procedimento administrativo", "Imune" ou "Isenção".

- [ ] **100.** Permitir ao fiscal realizar a manutenção de notas fiscais emitidas, alterando as seguintes informações:
      deduções fiscais, alteração do regime tributário (optante e não optante do Simples Nacional), alíquota e
      natureza de operação.

- [ ] **101.** Possibilitar que o fiscal altere as notas fiscais de um contribuinte que não está mais enquadrado como
      Simples Nacional para Optante do Simples Nacional.

- [ ] **102.** Possibilitar que o fiscal possa alterar as notas fiscais de um contribuinte que está enquadrado como
      Simples Nacional para Não Optante do Simples Nacional.

- [ ] **103.** Permitir o controle de saldos.

- [ ] **104.** Permitir que o fiscal efetue o cancelamento de guia de pagamento gerada por qualquer contribuinte,
      ainda que a guia esteja vencida ou o sistema esteja parametrizado nesse sentido.

- [ ] **105.** Possibilitar a exportação das notas fiscais de serviço prestados e tomados através do formato XML.

- [ ] **106.** Permitir ao município a adequação das alíquotas dos serviços tributáveis em regime de emissão
      eletrônica de notas fiscais de serviço, exibindo inclusive o histórico de alterações deste valor.

- [ ] **107.** Permitir ao município a definição de alíquotas por prestador individualmente.

- [ ] **108.** Permitir ao contribuinte optante pelo Simples Nacional utilizar alíquota municipal quando ultrapassar
      limite de faturamento. O sistema deverá disponibilizar uma opção para que o prestador possa indicar se deverá
      ser emitido a nota fiscal com a geração da guia de pagamento, utilizando a alíquota do município e não a do
      Simples Nacional, considerando que ultrapassa o limite de faturamento bruto (Lei Complementar Nº 155/2016 /
      Resolução CGSN Nº 94/2011). O sistema deverá possuir uma orientação ao usuário prestador sobre o uso desta
      opção.

- [ ] **109.** Possibilitar o recebimento de lotes de RPS’s via WebService para geração de notas fiscais de serviço
      eletrônicas.

- [ ] **110.** Possibilitar o recebimento de lotes de RPS’s via importação de arquivos XML para geração de notas
      fiscais de serviço eletrônicas.

- [ ] **111.** Permitir que o contribuinte realize testes de recebimento de lotes de RPS em um ambiente específico
      para homologação, com ativação exclusiva pelo prestador a qualquer momento.

- [ ] **112.** Disponibilizar ambiente no sistema para que o prestador de serviço possa consultar o status do
      processamento dos lotes de RPS enviados, podendo visualizar:
  - [ ] **112.1.** Data e hora de envio e conclusão de processamento.
  - [ ] **112.2.** Número do lote.
  - [ ] **112.3.** Número do protocolo de controle.
  - [ ] **112.4.** Situação do processamento (Não processado, Em processamento, Processado com sucesso, Processado com
        erro).
  - [ ] **112.5.** Número do RPS.
  - [ ] **112.6.** Série do RPS.
  - [ ] **112.7.** Data de emissão do RPS.
  - [ ] **112.8.** Situação da conversão (Dentro do prazo / Fora do prazo).
  - [ ] **112.9.** Limite para conversão.
  - [ ] **112.10.** Número da nota fiscal.
  - [ ] **112.11.** Competência da nota fiscal.
  - [ ] **112.12.** Mensagem de erro.

- [ ] **113.** Possibilitar a consulta de Lotes de RPS, de acordo com os filtros pré-determinados, que deverão ser:
      situação do processamento destes lotes, número do protocolo, dados do prestador e data de envio dos lotes. Esta
      consulta, deverá permitir ainda o detalhamento dos erros de integração, a possibilidade de efetuar o download do
      arquivo XML, e quando o lote estiver com a situação de “processado com sucesso” poderá visualizar o número dos
      RPS nele contidos (detalhamento), existindo ainda a possibilidade de efetuar o reenvio dos lotes não
      processados.

- [ ] **114.** Possibilitar ao fiscal a consulta dos RPS’s convertidos fora do prazo.

- [ ] **115.** Possibilitar que notas oriundas da integração por meio de webservices sejam passíveis de consulta
      também por WebService.

- [ ] **116.** Permitir a autorização para impressão de RPS.

- [ ] **117.** Permitir visualizar a relação de autorização para impressão de RPS's que estão pendentes de análise
      pela fiscalização, separando-as as que não estão analisadas e as que estão em fase de análise. Para cada status,
      o sistema deve direcionar o fiscal para a rotina de autorização para impressão de RPS's, podendo assim, o fiscal
      dar andamento em seu parecer.

- [ ] **118.** Permitir a reutilização de numeração de RPS caso a situação da solicitação em que ele está contido seja
      indeferida.

- [ ] **119.** Possibilitar que o contribuinte seja impedido de solicitar uma nova autorização de emissão de RPS, caso
      já exista para a mesma série uma solicitação que esteja como Não Analisada ou Em Análise.

- [ ] **120.** Permitir a parametrização do sistema para que o contribuinte seja notificado quando uma quantidade (em
      porcentagem) escolhida por ele, de RPS, já tenha sido convertida em nota.

- [ ] **121.** Possibilitar a verificação de autenticidade do RPS.

- [ ] **122.** Controlar a conversão de RPS não autorizado, impedindo sua conversão e geração da nota fiscal.

- [ ] **123.** Permitir que o município defina a quantidade máxima de RPS poderá ser solicitada por prestador de
      serviço.

- [ ] **124.** Permitir ao fisco municipal configurar o sistema para deferir automaticamente as autorizações de
      impressão de RPS pendentes do prestador, quando atingir o limite de RPS convertidos.

- [ ] **125.** Permitir o cadastramento automático da autorização de impressão de RPS quando o limite configurado de
      RPS convertido for ultrapassado.

- [ ] **126.** Permitir configurar quais os usuários fiscais que receberão e-mail quando uma nova autorização para
      impressão de RPS for registrada.

- [ ] **127.** Permitir configurar o conteúdo do e-mail quando uma nova autorização para impressão de RPS for
      registrada ou tramitada, podendo personalizar textos diferentes conforme o status da autorização.

- [ ] **128.** Permitir a configuração para gerar valor de crédito para abatimento em impostos municipais (Definição
      de percentuais, limites de abatimento etc.).

- [ ] **129.** Permitir que o fisco municipal realize movimentações no crédito tributário do contribuinte, tais como:
      Liberação do crédito, Expiração do crédito, Cancelamento do crédito, Transferência de crédito.

- [ ] **130.** Permitir a configuração para gerar benefícios fiscais do tipo incentivo fiscal para a alíquota e para a
      base de cálculo e também isenção para o valor do ISS calculado na nota fiscal.

- [ ] **131.** Possibilitar as permissões através das configurações de usuários e grupos de usuários.

- [ ] **132.** Permitir a emissão de relatório de acesso dos diversos usuários ao sistema, com informações do horário
      de acesso e saída.

- [ ] **133.** Permitir pelo Módulo do Fiscal e Módulo do Contribuinte, a emissão de relatório para controle das notas
      fiscais eletrônicas emitidas, possibilitando ainda verificar apenas as notas canceladas e/ou substituídas.

- [ ] **134.** Permitir ao fisco municipal emitir um relatório que demonstra a situação das guias de pagamento,
      podendo filtrar por prestador, ano, competência, tipo da guia, situação da guia

- [ ] **135.** Permitir ao fisco municipal e ao contribuinte, realizar a consulta das notas fiscais emitidas.

- [ ] **136.** Permitir ao fisco municipal realizar a consulta das guias de pagamento.

- [ ] **137.** Permitir que os usuários possam consultar a relação de prestadores habilitados no município, sem ter
      necessidade de estar logado no sistema.

## Item 18 - Software de Controle de Emissão de Notas Fiscais

*Fonte: Anexo I, páginas 72-74/194.*

- [ ] **1.** Propiciar a captura, armazenamento e gestão de notas fiscais contra o CNPJ da entidade através de
      monitoramento automático no webservice da Secretaria da Fazenda Nacional – SEFAZ.

- [ ] **2.** Propiciar a geração automática de Manifestação de Recusa de operação por Desconhecimento de Operação e
      Operação não Realizada.

- [ ] **3.** Possibilitar visualizar uma listagem das notas fiscais eletrônicas armazenadas no sistema, contendo as
      seguintes informações: Número da NF-e, emitente, CPF/CNPJ, Data e Hora de emissão, Valor total e os STATUS do
      emitente, destinatário, XML, SEFAZ e Transportador.

- [ ] **4.** Possibilitar a gestão de permissões de acessos, funcionalidades e ações por usuários e grupos de
      usuários, a partir de uma ferramenta de acessos.

- [ ] **5.** Criar fonte de dados referente às informações da NF-e.

- [ ] **6.** Demonstrar ao usuário um histórico de manifestações de destinatário (ciência de emissão, confirmação da
      operação, operação não realizada e desconhecimento da operação) realizadas pelo mesmo, onde será listado o que
      ocorreu com cada NF-e manifestada, apresentando quem realizou a manifestação, nome do emitente, número da NF-e,
      série da NF-e e a descrição do retorno do evento.

- [ ] **7.** Permitir que o usuário mantenha-se no mesmo ambiente do sistema ao atualizar o navegador.

- [ ] **8.** Permitir o upload de XML de notas fiscais no ambiente relacionado aos documentos fiscais, onde deverá
      permitir o armazenamento dos mesmos.

- [ ] **9.** Possibilitar visualizar a NF-e completa e voltar para a listagem de NF-e recebidas. Ao retornar ao
      sistema, apresentar ao usuário a mesma página acessada anteriormente ou listada com base no filtro selecionado
      anteriormente.

- [ ] **10.** Possibilitar visualizar a NFS-e completa e voltar para a listagem de NFS-e recebidas. Ao retornar ao
      sistema, apresentar ao usuário a mesma página acessada anteriormente ou listada com base no filtro selecionado
      anteriormente.

- [ ] **11.** Possibilitar o acesso aos detalhes de uma Nota Fiscal eletrônica, permitindo acesso a todos os campos
      definidos no layout mais atual das notas técnicas da SEFAZ, após pesquisa da nota desejada.

- [ ] **12.** Possibilitar a criação de relatórios personalizados para a entidade.

- [ ] **13.** Propiciar a configuração de certificado do tipo A1 e/ou A3 para comunicação com o webservice da SEFAZ
      Nacional.

- [ ] **14.** Possibilitar a consulta, de forma manual a cada 60 minutos, das notas fiscais eletrônicas emitidas para
      o CNPJ da entidade configurada, tempo este que compreende o mínimo de processamento da secretaria da fazenda, e
      ainda notificá-lo, caso o mesmo não seja respeitado.

- [ ] **15.** Disponibilizar as Notas Fiscais eletrônicas emitidas contra o CNPJ da entidade pública, demonstrando um
      resumo e situação das mesmas para o usuário, por meio de monitoramento automático no webservice da SEFAZ
      nacional. As consultas de forma automática devem ser realizadas a cada uma hora, de segunda a sexta, das 07:00
      até as 20:00.

- [ ] **16.** Possibilitar ao usuário acesso às páginas da Central de Ajuda nas principais telas do sistema.

- [ ] **17.** Possibilitar que o usuário visualize, na consulta da Nota Fiscal eletrônica, os eventos realizados entre
      o emitente, destinatário, SEFAZ e transportador.

- [ ] **18.** Possibilitar a sinalização do STATUS no sistema do webservice da SEFAZ.

- [ ] **19.** Possibilitar indicação manual das manifestações de ciência e confirmação da operação, das notas fiscais
      eletrônicas emitidas para o CNPJ da entidade configurada.

- [ ] **20.** Propiciar visualização das Notas Fiscais eletrônicas canceladas na SEFAZ Nacional, evitando pagamentos
      desnecessários quando do cancelamento da nota, pelo emitente.

- [ ] **21.** Possibilitar a utilização de ferramenta de certificados digitais para assinar documentos (PDF).

- [ ] **22.** Possibilitar a tramitação de várias NF-e ao mesmo tempo, onde será possível realizar as seguintes ações:
      Ciência de Emissão, Confirmação de Operação, Operação não Realizada, Desconhecimento de Operação.

- [ ] **23.** Possibilitar o gerenciamento dos relatórios disponíveis para execução.

- [ ] **24.** Possibilitar que o usuário realize consultas dos fatos vinculados a Nota Fiscal eletrônica emitida,
      conforme eventos usuais da SEFAZ: Ciência da Operação, Confirmação da Operação, Operação não Realizada,
      Desconhecimento da Operação.

- [ ] **25.** Possibilitar que o usuário tenha acesso aos detalhes de uma Nota Fiscal de serviço eletrônica, após
      pesquisa da nota desejada.

- [ ] **26.** Possibilitar que seja apresentado para o usuário um STATUS de cada NF-e, onde será possível visualizar
      os eventos realizados pelo emitente, destinatário, transportador, XML e a SEFAZ.

- [ ] **27.** Possibilitar a pesquisa pelas Notas Fiscais eletrônicas que desejar, podendo informar o número da nota,
      chave de acesso, a empresa responsável por sua emissão ou o seu CPF ou CNPJ, a data de emissão da nota, o valor
      total, o produto e serviço da NF-e.

- [ ] **28.** Possibilitar ações em cada NF-e recebida, tais como: Visualizar, onde será possível ver os detalhes da
      NF-e. Download, onde será possível realizar o download do XML do documento fiscal. Manifestações de
      destinatário, onde será possível realizar a ciência da emissão, confirmação da operação, operação não realizada
      e desconhecimento de operação. Visualizar a DANF-e, onde será possível visualizar um documento em PDF similar a
      DANF-e.

- [ ] **29.** Possibilitar que os eventos vinculados ao conhecimento de transporte eletrônico (CT-e) estejam
      disponíveis ao usuário, para que o permita visualizar todos os detalhes do evento da CT-e, tais como: nome do
      evento, protocolo, data/hora da autorização, data/hora da inclusão.

- [ ] **30.** Possibilitar a consulta do status da CT-e na listagem, onde poderá ser identificada a situação. As
      situações disponíveis devem ser no mínimo: a) Status da Situação do CT-e na Sefaz: autorizado; cancelado e
      denegado;

- [ ] **31.** Permitir que na CT-e seja possível manifestar a prestação do serviço com desconto;

- [ ] **32.** Possibilitar a geração em PDF similar ao Documento auxiliar do conhecimento de transporte eletrônico
      (DACT-e) de maneira individual em cada CT-e.

- [ ] **33.** Possibilitar realizar o download do XML da CT-e, de forma individual ou simultaneamente.

- [ ] **34.** Disponibilizar informações das notas no Portal da Transparência.

- [ ] **35.** Permitir integração das notas com outros sistemas estruturantes como: Contabilidade, Contratos e
      Almoxarifado.

- [ ] **36.** Permitir a integração das notas fiscais presentes no sistema de monitoramento de notas com o sistema de
      Contabilidade para fins de liquidação.

## Item 19 - Software de Portal da Transparência

*Fonte: Anexo I, páginas 74-77/194.*

- [ ] **1.** Atender às Leis Complementares nº 10/2000 e nº 131/2009, aos anexos da Lei nº 9.755/1998, e aos preceitos
      e exigências da Lei Federal nº 12.527/2011.

- [ ] **2.** Disponibilizar as informações até o primeiro dia útil subsequente à data do registro contábil no
      respectivo sistema, sem prejuízo do desempenho e da preservação das rotinas de segurança operacional necessários
      ao seu pleno funcionamento, conforme legislação.

- [ ] **3.** Possibilitar configuração de acessos a usuários com permissões de inclusões e alterações pelo gerenciador
      de usuários.

- [ ] **4.** É possível integrar no sistema todas as entidades da administração direta, as autarquias, as fundações,
      os fundos e as empresas estatais dependentes.

- [ ] **5.** Permitir a consulta de Receitas, Despesas, Patrimônio, Licitações, Compras, Contratos, Pessoal,
      Demonstrativos contábeis, Convênios, Obras Públicas e Gestão de frotas.

- [ ] **6.** Gerar as seguintes informações relativas aos atos praticados pelas unidades gestoras no decorrer da
      execução orçamentária e financeira quanto ao valor do empenho, liquidação e pagamento e quanto a receita, os
      valores das receitas da unidade gestora, compreendendo no mínimo sua natureza, relativas a Previsão e
      Arrecadação.

- [ ] **7.** Exibir as receitas organizadas por natureza, permitindo navegar em cada nível de seus respectivos
      subníveis, exibindo o total dos seguintes valores, por nível: Receita prevista, receita arrecadada.

- [ ] **8.** Exibir as despesas organizadas por natureza, permitindo navegar em cada nível de seus respectivos
      subníveis, exibindo o total dos seguintes valores, por nível: Total de créditos, Fixado, Empenhado, Liquidada,
      Pago.

- [ ] **9.** Permitir visualizar os empenhos emitidos para cada fornecedor, os itens dos empenhos, a quantidade, o
      valor unitário e o valor total.

- [ ] **10.** Permitir visualizar o tipo, número, data de emissão e data de pagamento dos documentos fiscais ligados a
      cada empenho.

- [ ] **11.** Exibir os valores recebidos e/ou repassados de transferências financeiras por Unidade Orçamentária.

- [ ] **12.** Permitir consultar despesa por unidade gestora, por natureza da despesa, permitindo navegar em cada
      nível da natureza, exibindo seus respectivos valores empenhados, liquidados e pagos.

- [ ] **13.** Exibir informações detalhadas sobre diárias, tais como: Número da diária, local de saída, local de
      retorno, data de partida, data de retorno, objeto, valor unitário e quantidade.

- [ ] **14.** Permitir visualizar as informações da nota de empenho, tais como: nº do empenho, programa, fonte de
      recurso, processo licitatório, modalidade, contrato, valor empenhado, liquidado, pago, retido, itens do empenho
      (descrição, valor unitário, quantidade, total) e documento fiscal (tipo, número, data de emissão e data de
      pagamento).

- [ ] **15.** Possuir uma seção específica que permita a exibição das licitações realizadas pela entidade, com as
      etapas do processo, as modalidades, empresas participantes e vencedoras, mercadorias com suas respectivas
      quantidades e cotações de cada participante, além dos responsáveis legais das empresas e a relação dos
      fornecedores impedidos de licitar. Possibilitar também a publicação dos documentos legais tais como editais,
      avisos retificações e toda a documentação vinculada ao certame.

- [ ] **16.** Possuir uma seção específica que permite a exibição de todos os itens contratuais dos seus fornecedores
      de bens e serviços contratados pela entidade. Permitir também a publicação do contrato, na sua íntegra, para a
      visualização completa do documento bem como aditivos e outros possíveis documentos adicionais, possibilitando
      também o download dos mesmos.

- [ ] **17.** Exibir informações detalhadas sobre os convênios, tais como: número, valor, data de assinatura, objeto,
      documentos e textos, participantes.

- [ ] **18.** Possuir uma seção específica que apresente a relação dos cargos e salários dos servidores da entidade,
      os valores calculados da folha de pagamento separando-os por entidade, secretaria, organograma, lotação e
      classificação, conforme seus respectivos planos de carreira.

- [ ] **19.** Disponibilizar acesso público a todos os atos da administração pública, tais como, portarias, leis,
      decretos, licitações, contratos, aditivos, convênios, resoluções, etc.

- [ ] **20.** Permitir a recepção e exibição das licitações com a situação suspenso.

- [ ] **21.** Possuir uma seção específica para exibição dos relatórios de Gestão Fiscal e o Relatório Resumido da
      Execução Orçamentária, ambos compostos de uma série de demonstrativos contábeis, publicados em bases mensais,
      bimestrais, quadrimestrais, semestrais e anuais, conforme princípio constitucional da publicidade, a Lei de
      Responsabilidade Fiscal (LRF) e a Lei nº 9.755/98.

- [ ] **22.** Possuir uma seção específica de acesso à informação que possibilite ao cidadão efetuar questionamentos
      através de um canal direto com a entidade. Esta solicitação deve ser digital, gerando número de protocolo e
      possibilitando uma futura consulta sobre o status do pedido de informação, sempre respeitando prazos e normas
      estabelecidas pela Lei de acesso à informação.

- [ ] **23.** Possuir uma seção específica de acesso à informação que possibilite consultar um relatório com
      estatísticas dos pedidos de informação solicitados, os atendidos, prorrogados, deferidos e indeferidos, conforme
      preconiza a Lei de acesso à informação.

- [ ] **24.** Permitir que as informações consultadas pelo cidadão possam ser exportadas em diferentes formatos como
      PDF, ODT, ODS e CSV, conforme os filtros disponibilizados nas consultas do sistema.

- [ ] **25.** Permitir consultar tributos arrecadados, receitas orçamentárias e receitas extraorçamentárias.

- [ ] **26.** Permitir consultar empenhos emitidos, empenhos liquidados e pagamentos efetuados.

- [ ] **27.** Possibilitar a inserção dos dados e consulta da relação de veículos de Frotas.

- [ ] **28.** Permitir a inserção dos dados e consultas referente dos comprovantes fiscais.

- [ ] **29.** Disponibilizar consulta padrão dos temas: notas fiscais, cargos e vencimentos e adiantamentos, ordem
      cronológica de pagamentos, folha de pagamento, servidores cedidos e recebidos, servidores públicos ativos,
      servidores e remunerações, servidores públicos, cargos e vencimentos, estagiários, servidores públicos ativos de
      educação, servidores e remunerações de educação.

- [ ] **30.** Permitir a pesquisa de conteúdo do portal, direcionado às consultas através dos resultados apresentados.

- [ ] **31.** Permitir consultar relatórios legais, gerados com base nos dados inseridos nos correspondentes sistemas
      de gestão.

- [ ] **32.** Permitir acesso às informações de forma consolidada e por Entidade gestora municipal.

- [ ] **33.** Permitir a busca por palavras-chave e redirecionamento às consultas e funcionalidades através dos
      resultados apresentados.

- [ ] **34.** Permitir a inclusão e consultas dos dados das Compras Diretas.

- [ ] **35.** Permitir a consulta padrão do tema Relatórios da Lei 4.320/64 e da LRF.

- [ ] **36.** Permitir que nas consultas de informações disponibilizadas seja possível efetuar filtros por data
      (período), entidade e demais filtros pertinentes a cada consulta.

- [ ] **37.** Permitir a personalização da exibição de máscaras de CPF's e CNPJ's no portal.

- [ ] **38.** Propiciar a definição da obrigatoriedade no preenchimento de dados pessoais no formulário de cadastro de
      pedidos de acesso à informação, como Nome, CPF, CNPJ e e-mail;

- [ ] **39.** Propiciar configuração para interposição de recurso com a definição da quantidade de dias para que o
      cidadão entre com o recurso e a quantidade de dias para atendimento do recurso, com opção de interposição de
      recursos apenas para solicitações indeferidas, ou para deferidas e indeferidas;

- [ ] **40.** Propiciar o cadastro de local para atendimento presencial, com informações do endereço, responsável,
      endereço, telefone e horário de atendimento;

- [ ] **41.** Propiciar o cadastro de motivos de indeferimento de pedidos de acesso à informação, conforme necessidade
      da entidade, com opção de desativá-lo a qualquer momento;

- [ ] **42.** Possuir um ambiente administrador para criar, editar, configurar gerir e disponibilizar: entidades,
      consultas, campos, brasões/logos, cores, e parametrizações relacionadas às rotinas dos sistemas estruturantes
      que enviam dados ao Portal da Transparência

- [ ] **43.** Gerir as cargas de dados recepcionadas pelo Portal da Transparência e verificar seus status

- [ ] **44.** Permitir inserir novos menus pelo administrador do Transparência como Mural de Avisos.

- [ ] **45.** Propiciar o cadastro da estrutura organizacional da entidade, informando a descrição, as atribuições, o
      endereço, e-mail, telefone, horário de atendimento, o nome e o cargo do responsável, com possibilidade de anexar
      o organograma.

- [ ] **46.** Possuir recurso para converter os textos dispostos na página do Portal da Transparência em voz, visando
      auxiliar pessoas com deficiência visual ou com dificuldade de leitura, na compreensão das informações;

- [ ] **47.** Possibilitar a inserção de gráficos nas consultas visando facilitar a compreensão das informações

- [ ] **48.** Possui espaço para que o cidadão expresse sua opinião em relação ao Portal da Transparência, onde seja
      opcional a identificação;

- [ ] **49.** Possuir seção de perguntas frequentes para auxiliar os cidadãos nos esclarecimentos de dúvidas comuns
      relacionadas ao Acesso à Informação, com possibilidade de editar, excluir, publicar, despublicar ou adicionar
      novas perguntas a qualquer momento;

- [ ] **50.** Possui link de acesso à página do Radar da Transparência, referente ao Programa Nacional de
      Transparência Pública;

- [ ] **51.** Possuir botões de atalho para funcionalidades do Portal da Transparência, com opções de menu, busca e
      rodapé;

- [ ] **52.** Possuir acesso a Mapa de Obras demonstrando em um mapa virtual de todas as obras do município.

- [ ] **53.** Possibilitar visualizar no Mapa de Obras virtual as informações detalhadas das obras como Descrição,
      Valores, Licitação, Contrato, Despesa, Empenho, Medição e Responsável.

- [ ] **54.** Possibilitar também no Mapa de Obras virtual visualizar as imagens das obras do município.

## Item 20 - Software de Ponto Eletrônico

*Fonte: Anexo I, páginas 77-80/194.*

- [ ] **1.** Permitir registar todas as configurações das estruturas de níveis das lotações físicas utilizadas para
      determinar o local de trabalho do servidor na entidade. Funcionalidade acessível no módulo Ponto.

- [ ] **2.** Permitir registrar todas as informações referentes aos atos legais da entidade, como leis, portarias,
      decretos, requisições estabelecidas pelo órgão. Funcionalidade acessível no módulo Ponto.

- [ ] **3.** Permitir registrar a divisão hierárquica dos setores. Funcionalidade acessível no módulo Ponto.

- [ ] **4.** Permitir a reestruturação da classificação institucional de um exercício para outro através da mudança de
      organogramas, podendo duplicar os dados do organograma para que sejam realizadas as devidas alterações e sua
      utilização. Funcionalidade acessível no módulo Ponto.

- [ ] **5.** Possuir ambiente de consulta de matrículas, dispondo de filtros de consulta tais como Ativos, Inativos,
      Seleções de Matrículas, com opção de definir colunas a serem exibidas em tela e imprimir o resultado da busca,
      podendo realizar a pesquisa por, no mínimo, Nome, Código da Matrícula, CPF, RG, PIS/PASEP, e utilizar critérios
      de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda
      oferecer outras opções de filtros, objetivando a otimização das consultas. As matrículas consultadas deverão
      estar acessíveis para que seja possível realizar alterações cadastrais, podendo ainda, a partir dessa tela,
      efetuar uma admissão, com todos os campos exigidos pelo Ministério do Trabalho e Emprego, e que possibilite,
      inclusive, a dispensa do livro de registro dos servidores, conforme Portaria nº 41 de 28/03/2007. Funcionalidade
      acessível no módulo Ponto.
  - [ ] **5.1.** Ao acessar o cadastro da matrícula, deverá ser exibido em tela todos os dados contratuais do
        servidor.

- [ ] **6.** Possuir ambiente de consulta de pessoas físicas, podendo realizar a pesquisa por, no mínimo, Nome, CPF,
      PIS, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos
      termos digitados. As pessoas consultadas deverão estar acessíveis para que seja possível realizar alterações
      cadastrais, podendo ainda, a partir dessa tela, efetuar um novo registro de pessoa física, possibilitando
      informar os dados pessoais como: nome, CPF, data de nascimento, idade, estado civil, sexo, endereço(s),
      telefone(s), e-mail(s), filiação(ões), moléstia(s) grave(s), grau de escolaridade, raça, tipo sanguíneo,
      indicativo de doador, deficiência(s), além de dados relacionados aos documentos, como RG, órgão emissor, UF,
      data da emissão, número do título de eleitor, zona, seção, número do CNS, data da emissão, RIC, órgão emissor,
      UF, data da emissão, certidão(ões) civil(s), número do certificado de reservista, número da CTPS, número do PIS
      / PASEP, número da CNH. Funcionalidade acessível no módulo Ponto.
  - [ ] **6.1.** Ao acessar o cadastro da pessoa física, deverá ser exibido em tela todos os dados pessoais do
        servidor.
  - [ ] **6.2.** Permitir a atualização de dados cadastrais das pessoas físicas, inclusive, adicionando uma formação.

- [ ] **7.** Permitir o registro de cargos, com controle histórico das alterações, possibilitando registrar
      informações gerais vinculadas ao ato, nome do cargo, tipo do cargo, podendo ser efetivo, comissionado,
      temporário, agente político, entre outros conforme a necessidade da entidade, quadro de vagas, possibilitando
      subdividir a quantidade de vagas entre as áreas de atuação e organogramas, grau de instrução mínimo exigido,
      configuração de férias, CBO, acúmulo de cargos, dedicação exclusiva, contagem especial de tempo de serviço e
      referências salariais. Funcionalidade acessível no módulo Ponto.

- [ ] **8.** Permitir o cadastro dos níveis salariais conforme legislação municipal, possibilitando compor suas
      variações de classe e referência dentro do nível, com controle histórico de alterações, viabilizando a
      vinculação da faixa salarial dos cargos. Funcionalidade acessível no módulo Ponto.

- [ ] **9.** Permitir o registro de vínculos empregatícios dos funcionários da entidade. No registro do vínculo deve
      possibilitar informar a descrição, regime trabalhista, regime previdenciário, categoria do trabalhador,
      categoria do SEFIP, vínculo temporário, motivo da rescisão, data final obrigatória, o envio ao CAGED, envio para
      RAIS e código RAIS e se gera licença-prêmio. Funcionalidade acessível no módulo Ponto.

- [ ] **10.** Permitir a criação de tipos de função de relógio.

- [ ] **11.** Disponibilizar a ocorrência de horas extras noturnas, horas faltas noturnas, horas trabalhadas noturnas,
      horas faltas diurnas, horas extras diurnas, bem como os afastamentos por acidente de trabalho e auxílio-doença.

- [ ] **12.** Permitir a configuração de diferentes tipos de horários para o servidor.

- [ ] **13.** Permitir registrar as áreas de atuação.

- [ ] **14.** Possuir cadastro de jornadas de trabalho.

- [ ] **15.** Possibilitar a configuração de relógios.

- [ ] **16.** Permitir a exclusão de marcações ou de apuração.

- [ ] **17.** Possibilitar informar uma função de relógio para que seja utilizada com padrão nas alterações e
      inclusões das marcações.

- [ ] **18.** Dispor de configuração para permitir a utilização de horário flexível, onde o sistema não deva controlar
      a jornada conforme as marcações esperadas, mas qualquer jornada desde que dentro da tolerância de alocação do
      servidor.

- [ ] **19.** Permitir a inserção manual da marcação.

- [ ] **20.** Dispor de funcionalidade para fechamento do ponto, encerrando o período de apuração das marcações,
      permitindo a geração das ações de fechamento do ponto e bloqueando a manutenção para o período de apuração.

- [ ] **21.** Possibilitar registrar na matrícula de funcionários e estagiários, a opção pela compensação de horas.

- [ ] **22.** Possibilitar a inserir registros para compensação de horas por meio de funções de fórmulas de
      ocorrências.

- [ ] **23.** Possibilitar consultar, através de fórmula de ocorrências, os atestados disponíveis no sistema de
      Recursos Humanos.

- [ ] **24.** Permitir a apuração de ocorrências relacionadas a ausência legal, saída particular, médica, ao serviço,
      entre outros que a entidade pretenda cadastrar.

- [ ] **25.** Permitir apuração de ocorrência que calcule o valor das horas de interjornada.

- [ ] **26.** Permitir apuração de ocorrências relacionadas ao feriado facultativo.

- [ ] **27.** Disponibilizar ocorrências que informem o número total de marcações para determinada data de apuração.

- [ ] **28.** Disponibilizar ocorrências que informem se a matrícula apurada está trabalhando na data de apuração.

- [ ] **29.** Disponibilizar ocorrências que informem as horas trabalhadas conforme enquadramento

- [ ] **30.** Disponibilizar ocorrências que informem o tempo mínimo de interjornada.

- [ ] **31.** Disponibilizar ocorrências que informem se a matrícula apurada no período está em gozo de férias.

- [ ] **32.** Disponibilizar ocorrências que informem a carga horária da jornada diária.

- [ ] **33.** Permitir a configuração para saldo de banco de horas, possibilitando relacionar um tipo de compensação
      de horas a uma ação, que poderá somar ou subtrair, e também informar um campo em horas para definir o saldo
      máximo de extras e o saldo máximo de faltas.

- [ ] **34.** Possuir campo para apresentação da compensação de horas na matrícula, em que a listagem deverá trazer
      todas as compensações, em ordem de data decrescente, com a exibição do saldo atual.

- [ ] **35.** Possibilitar a visualização do histórico de todos os registros de ponto do servidor.

- [ ] **36.** Possibilitar a interação de dados com o sistema de Folha de Pagamento.

- [ ] **37.** Possibilitar que a rotina de importação e apuração do ponto sejam executadas em segundo plano, liberando
      o sistema para uso normal durante a geração. Ao término do processamento do cálculo o usuário deverá ser
      notificado.

- [ ] **38.** Permitir o cadastro dos horários realizados pelos servidores, possibilitando informar o código,
      descrição, vigência, entrada, saída, se é flexível e carga horária.

- [ ] **39.** Possibilitar o cadastro de tipos de ausências para justificativas de faltas, como folga, treinamento,
      conferência, workshop, nascimento de filho, dentre outros.

- [ ] **40.** Permitir a exclusão de ausências de forma coletiva e seleções com filtros avançados.

- [ ] **41.** Permitir a geração do espelho do ponto para seleções avançadas ou sem informar seleção

- [ ] **42.** Possibilitar que o usuário realize o lançamento de horas faltas e horas extras ao servidor de forma
      manual.

- [ ] **43.** Possibilitar a apuração das marcações de ponto de estagiários.

- [ ] **44.** Possibilitar o controle histórico de alteração para cada registro de horário realizado.

- [ ] **45.** Possibilitar a configuração de parâmetros para auxílio nas apurações de marcações e impactos em folha de
      pagamento, permitindo informar a tolerância de marcações, tolerância diária, período noturno, tempo mínimo entre
      batidas, tempo mínimo de interjornada, tempo mínimo e máximo de intrajornada.

- [ ] **46.** Permitir a parametrização de horas noturnas, intervalo mínimo entre batidas e valor mínimo de horas para
      desconto.

- [ ] **47.** Possibilitar a permuta de horários, com data de início e término da permuta.

- [ ] **48.** Possibilitar o registro de ocorrências de ponto, permitindo informar o código, descrição, competência,
      classificação, sigla e indicativo para gerar eventos na folha.

- [ ] **49.** Possibilitar o registro de servidores quando convocados para participar de evento extraordinário à
      jornada.

- [ ] **50.** Permitir a cópia de uma ocorrência já cadastrada, facilitando alterações em novas ocorrências geradas a
      partir da copiada.

- [ ] **51.** Dispor de cadastro integrado com o sistema de Recursos Humanos e Folha, evitando a duplicidade de
      informações.

- [ ] **52.** Possibilitar o cadastro de eventos extraordinários, permitindo definir o período do evento, se será
      concedido folga para os participantes, a quantidade de dias de folga a conceder e o período em que o
      participante pode folgar, por conta da participação no evento.

- [ ] **53.** Permitir a apuração de matrículas lotadas em jornadas com revezamento.

- [ ] **54.** Possibilitar a flexibilidade de horários, permitindo a jornada de trabalho em horários diferentes.

- [ ] **55.** Possibilitar o lançamento de ausências dos servidores e estagiários, para justificar as faltas.

- [ ] **56.** Possibilitar o acionamento do cadastro de afastamentos, a partir da data onde se está realizando a
      manutenção de marcações

- [ ] **57.** Possibilitar o registro de relógios de ponto, permitindo informar o número do relógio, descrição,
      lotação física, tipo de relógio, indicativo de REP, marca, número de fabricação.

- [ ] **58.** Possibilitar o cadastro de períodos para apuração de ponto, possibilitando sua utilização no processo de
      apuração das marcações.

- [ ] **59.** Possibilitar o gerenciamento do histórico de alteração para cada registro de ocorrência, permitindo a
      exclusão ou edição do histórico mais atual.

- [ ] **60.** Possibilitar a apuração das marcações de ponto dos servidores.

- [ ] **61.** Possuir filtros, na rotina de apuração do ponto, por data inicial e final do período de apuração, por
      servidor ou seleção específica.

- [ ] **62.** Possibilitar a importação de marcações das matrículas por arquivo txt gerado a partir do layout
      configurado no cadastro de relógios.

- [ ] **63.** Permitir a alteração do registro do ponto, sem possibilitar a exclusão da marcação original.

- [ ] **64.** Possibilitar a consulta de ausências pela descrição do tipo de ausência na data de apuração.

## Item 21 - Software de Ponto Eletrônico - Registros e Marcações

*Fonte: Anexo I, página 80/194.*

- [ ] **1.** Permitir que as marcações sejam coletadas por meio eletrônico, sem a necessidade de utilização de um
      relógio físico.

- [ ] **2.** Possibilitar o cadastro das biometrias dos servidores no sistema.

- [ ] **3.** Possibilitar a configuração de equipamento de reconhecimento facial para coleta das marcações.

- [ ] **4.** Possibilitar a parametrização para o envio de e-mails com o registro das marcações.

- [ ] **5.** Permitir a configuração de relógio para possibilitar a emissão de avisos sonoros em caso de êxito ou
      falha na marcação do ponto.

- [ ] **6.** Possibilitar o cadastramento dos locais de trabalho.

- [ ] **7.** Possibilitar o registro das funções de marcações para os relógios do ponto.

- [ ] **8.** Possibilitar a consulta individual das marcações de ponto do servidor.

- [ ] **9.** Permitir acesso via internet ao servidor para que possa acompanhar as suas marcações e efetuar
      solicitação de ajustes no ponto.

- [ ] **10.** Possuir perfil específico de responsável para aprovar ou reprovar as solicitações dos servidores
      subordinados.

- [ ] **11.** Disponibilizar aplicativo móvel onde seja possível realizar a marcação do ponto.

- [ ] **12.** No referido aplicativo, deve ser possível realizar solicitações de inclusões, exclusões e alterações de
      ponto e ainda, acompanhar em tempo real a marcação realizada.

## Item 22 - Software de Fiscalização Fazendária

*Fonte: Anexo I, páginas 80-93/194.*

- [ ] **1.** Permitir ao fisco municipal cadastrar pessoas físicas e jurídicas que serão consideradas como
      contribuintes.

- [ ] **2.** Permitir ao fisco municipal registrar os tipos de empresas em que o ISS é calculado conforme suas
      características, por exemplo, escolas, academias de ginástica, hotéis, motéis, estacionamentos, teatros, salas
      de espetáculo.

- [ ] **3.** Permitir ao fisco controlar as movimentações relativas ao porte da empresa no cadastro de contribuintes.

- [ ] **4.** Disponibilizar para uso do fisco a relação padrão da lista de serviço anexa a Lei 116/03, possibilitando
      a visualização dos itens, subitens e suas respectivas descrições.

- [ ] **5.** Possibilitar que o fisco municipal realize a manutenção na lista de serviço da Lei 116/03, de modo que
      permita configurar de acordo com a legislação municipal, as informações relacionadas à alíquota do serviço; o
      local da prestação do serviço; a incidência da substituição tributária e a dedução da base de cálculo.

- [ ] **6.** Possibilitar a atualização da lista de serviço da Lei 116/03, de acordo com as alíquotas para cálculo dos
      tributos federais, estaduais e municipais, permitindo assim, atender a Lei 12.741/2012 e o Decreto 8.264/2014.

- [ ] **7.** Disponibilizar ao fisco municipal histórico de alterações da alíquota nos serviços da lista de serviço da
      Lei 116/03 (subitem e seus níveis), possibilitando visualizar as informações de data e hora da alteração,
      usuário que fez a alteração e a alíquota alterada.

- [ ] **8.** Possibilitar ao fisco municipal criar subitens e níveis do subitem na relação de serviços da lista de
      serviço da Lei 116/03, permitindo assim que seja atendido as legislações municipais quando ocorre desmembramento
      do serviço por critérios de diferenciação de alíquotas.

- [ ] **9.** Permitir configurar o relacionamento da CNAE a lista de serviço da Lei Complementar 116/2003, permitindo
      que para cada subitem da lista, seja indicado CNAE correspondente.

- [ ] **10.** Permitir ao fisco municipal cadastrar feriados para definição das datas de vencimentos dos créditos
      tributários.

- [ ] **11.** Permitir adicionar e consultar indexadores, para que sejam atribuídos a um lançamento de crédito
      tributário, possibilitando classificar o reajuste por indexador ou moeda corrente e adicionar movimentações de
      valor por data, conforme os índices econômicos estabelecidos.

- [ ] **12.** Possibilitar ao fisco municipal registrar os tipos de documentos que serão solicitados ao fiscalizado
      durante o processo de fiscalização, e ainda segregado por categoria econômica como instituição financeira,
      construção e cartório.

- [ ] **13.** Permitir ao fisco municipal configurar valores de emolumentos a serem gerados aos contribuintes ao
      constituir o crédito tributário, além de manter um histórico de movimentação dos registros.

- [ ] **14.** Possibilitar ao fiscal incluir, alterar e desativar o registro dos agentes fiscais responsáveis pelos
      procedimentos da fiscalização.

- [ ] **15.** Permitir ao usuário fiscal inserir e alterar os dados das Infrações no sistema. Durante o registro e a
      modificação, deverá ser permitido determinar a quantia ou o percentual da infração conforme legislação
      municipal.

- [ ] **16.** Permitir ao usuário fiscal parametrizar o percentual de desconto para cada infração, e que será aplicado
      o abatimento ao lavrar o auto de infração e também durante a apuração do ISS.

- [ ] **17.** Permitir a definição da composição da base de cálculo para aplicação da multa de infração no processo de
      apuração fiscal, em conformidade com as exigências do Fisco ou da legislação vigente, podendo aplicar multa
      sobre o valor do tributo, correção, e/ou juros e/ou multa.

- [ ] **18.** Permitir ao fisco indicar a vontade de monitorar o contribuinte, mostrando em destaque nas rotinas da
      solução de gestão do ISS o sujeito passivo que terá a movimentação fiscal e financeira observada com mais
      precisão pela autoridade fiscal.

- [ ] **19.** Possibilitar ao fisco municipal indicar o período inicial e final, bem como a data de vencimento das
      competências para geração do lançamento tributário com diferença no valor do ISS.

- [ ] **20.** Permitir ao fiscal municipal lavrar o auto de infração com a possibilidade de adicionar os dados da
      penalidade, com destaque ao nome, valor, percentual da infração e desconto caso a lei permita.

- [ ] **21.** Possibilitar ao fisco ao lavrar o auto de infração e possibilitar a cada infração calcular o valor
      utilizando-se de fatores agravantes ou atenuantes conforme definido na legislação municipal.

- [ ] **22.** Permitir que o sistema exiba apenas os cadastros do auto de infração ao fiscal responsável pela análise,
      enquanto o fiscal gestor terá acesso a todos os cadastros, com a possibilidade de o fiscal visualizar o registro
      do auto de infração sob a responsabilidade de outro fiscal.

- [ ] **23.** Permitir a modificação da justificativa do registro do auto de infração antes de gerar a notificação e o
      termo do auto de infração.

- [ ] **24.** Permitir a adição de outras penalidades após a confirmação do auto de infração, bem como a modificação
      dos dados da infração inserida, antes de gerar a notificação fiscal.

- [ ] **25.** Permitir ao fisco municipal fazer a emissão da notificação do lançamento e do termo de auto de infração
      inerente às penalidades cometidas pelo infrator com modelo customizável ou padrão oferecido pela ferramenta.

- [ ] **26.** Permitir ao fisco municipal controlar a forma de envio e entrega da notificação do lançamento e termo do
      auto de infração, o registro da entrega para ambos os documentos poderá ser pela publicação de edital,
      identificando a fonte que foi publicado, através do correio, da entrega pessoal.

- [ ] **27.** Permitir cadastrar formas de divulgação da notificação do lançamento e do termo do auto de infração por
      edital, inserindo um nome do meio de comunicação que será publicado, e identificar se o edital foi publicado em
      jornais de circulação municipal, estadual, nacional, em diários oficiais ou no mural do da prefeitura.

- [ ] **28.** Permitir ao fisco acompanhar as informações sobre todas as etapas da entrega e da ciência do
      contribuinte sobre a notificação do lançamento e termo do auto de infração, exibindo data e horário de cada
      etapa.

- [ ] **29.** Possibilitar a visualização de todas as informações da notificação do lançamento e do termo do auto de
      infração, incluindo a situação, o prazo para o contribuinte apresentar pedido de impugnação, o nome do fiscal
      responsável e a data de geração.

- [ ] **30.** Possibilitar que o sistema gere automaticamente a data de vencimento do lançamento tributário e o prazo
      para impugnação, a partir da data de ciência do contribuinte. Permitir a configuração da quantidade de dias para
      o cálculo dessas datas, diferenciando prazos para optantes e não optantes do Simples Nacional.

- [ ] **31.** Possibilitar que o sistema, ao calcular a data de vencimento do lançamento tributário e o prazo para
      impugnação, determine se a contagem será em dias corridos ou úteis. Além disso, disponibilizar um recurso que
      permita ao Fisco definir se, em caso de feriados ou finais de semana, deseja manter, prorrogar ou antecipar a
      data de vencimento ou o prazo.

- [ ] **32.** Possibilitar a configuração da quantidade de dias para que o contribuinte tenha conhecimento do fato
      quando a ciência ocorrer por edital, determinando o início da contagem do prazo para vencimento e impugnação.
      Além disso, permitir a definição se a contagem será em dias úteis ou corridos.

- [ ] **33.** Possibilitar a configuração da quantidade de dias concedidos ao contribuinte em caso de omissão de
      entrega, determinando o início da contagem do prazo para vencimento e impugnação. Além disso, permitir a
      definição se a contagem será em dias úteis ou corridos.

- [ ] **34.** Permitir ao fisco adicionar os documentos que permite a administração tributária atuar nas infrações
      cometidas pelo infrator, auto de apreensão, de embargo, de interdição, emitindo a diligência fiscal e suspensão
      e cassação de atividades econômicas, e ainda selecionar em modelo customizado ou o disponibilizado pelo sistema.

- [ ] **35.** Permitir ao fisco municipal controlar a forma de envio e de entrega dos documentos necessários durante a
      autuação das infrações, o registro da entrega para cada documento através da publicação de edital, identificando
      a fonte de divulgação, através do correio e da entrega pessoal.

- [ ] **36.** Permitir ao fisco acompanhar as informações sobre todas as etapas da entrega e da ciência do
      contribuinte sobre a diligência fiscal, auto de apreensão, de embargo, de interdição, suspensão e cassação de
      atividades econômicas, exibindo data e horário de cada etapa.

- [ ] **37.** Permitir a consulta do lançamento da infração e emitir a respectiva guia de pagamento.

- [ ] **38.** Enviar para o sistema tributário de arrecadação o lançamento da infração oriundo do auto de infração
      lavrado contra o infrator.

- [ ] **39.** Permitir ao fisco definir a data de vencimento da notificação de lançamento do auto de infração e ainda
      prorrogar quando necessário.

- [ ] **40.** Permitir que o sistema identifique e exiba para o Fisco os lançamentos de autos de infração que estão
      aguardando a ciência do contribuinte.

- [ ] **41.** Permitir a autoridade fiscal iniciar os procedimentos de fiscalização a partir do cadastro da ação
      fiscal, durante esse processo deve permitir a emissão do termo de início da fiscalização, bem como a intimação
      seguindo as regras e fases do processo fiscal.

- [ ] **42.** Permitir ao fisco a registrar ação fiscal oriunda da confissão espontânea da obrigação tributária não
      cumprida. Possibilitando registrar a ação fiscal, a apuração e a geração do lançamento do tributo conforme a
      legislação.

- [ ] **43.** O sistema deverá exibir os dados da ação fiscal de forma clara e de fácil visualização, incluindo o
      período a ser fiscalizado, o prazo em dias que o Fisco tem para realizar a fiscalização, mostrando a quantidade
      de dias estimada e a quantidade restante. Além disso, deverá exibir um indicativo de status, informando se está
      "Em dia", "Vencendo" ou "Vencido".

- [ ] **44.** Propiciar a consulta de ações fiscais por fiscal.

- [ ] **45.** O sistema deverá exibir apenas as ações fiscais de responsabilidade do fiscal, enquanto o fiscal gestor
      terá acesso e poderá visualizar todos os processos fiscais.

- [ ] **46.** Permitir que o fiscal consulte as ações fiscais pelo Fisco responsável pela referida ação fiscal.

- [ ] **47.** Permitir a emissão e reemissão do termo de início de fiscalização, com controle de envio e confirmação
      de entrega.

- [ ] **48.** Permitir ao fisco a emissão do termo de ocorrência para um modelo padrão ou modelo personalizado em
      qualquer momento durante o processo administrativo fiscal.

- [ ] **49.** Permitir a emissão do termo de prorrogação da fiscalização, utilizando um modelo padrão ou
      personalizado, a qualquer momento durante o processo administrativo fiscal, com controle de envio e confirmação
      de entrega.

- [ ] **50.** Permitir a emissão do termo de diligência fiscal, utilizando um modelo padrão ou personalizado, a
      qualquer momento durante o processo administrativo fiscal, com controle de envio e confirmação de entrega.

- [ ] **51.** Permitir a emissão do termo de encerramento da fiscalização, utilizando um modelo padrão ou
      personalizado, a qualquer momento durante o processo administrativo fiscal, com controle de envio e confirmação
      de entrega.

- [ ] **52.** Permitir a emissão do termo de apreensão dos documentos solicitados ao fiscalizado, possibilitando a
      emissão de modelo personalizado ou o oferecido pelo sistema, a qualquer momento durante o processo
      administrativo fiscal, com controle de envio e confirmação de entrega.

- [ ] **53.** Permitir ao fisco municipal gerar e movimentar as intimações que visam estabelecer obrigação ao
      contribuinte, de acordo com o processo administrativo fiscal.

- [ ] **54.** Permitir a emissão da intimação para um indivíduo que não possui registro em sua base de dados, quando
      for necessário intimá-lo devido ao seu vínculo com o fiscalizado durante o processo de apuração fiscal.

- [ ] **55.** Permitir ao fiscal filtrar a intimação através dos seguintes filtros: as que estão no prazo e/ou as que
      estão vencidas, as que foram ou não enviadas para o contribuinte, e ainda, aquelas para as quais foi confirmada
      a entrega ou não foi entregue, ou foi omitida pelo contribuinte.

- [ ] **56.** Permitir ao fiscal prorrogar o prazo da intimação fiscal, inserindo a quantidade de dias que será
      prorrogada e definindo se a contagem será em dias corridos ou dias úteis. Se o prazo prorrogado ocorrer em
      feriado ou fim de semana, o sistema deverá considerar o próximo dia útil.

- [ ] **57.** Permitir ao fisco municipal controlar a forma de entrega da intimação fiscal e a ciência do
      contribuinte, o registro da entrega da intimação fiscal poderá ser pela publicação de edital, identificando a
      fonte que foi publicado, através do correio, da entrega pessoal.

- [ ] **58.** Permitir cadastrar formas de divulgação da intimação fiscal por edital, inserindo um nome do meio de
      comunicação que será publicado, e identificar se o edital foi publicado em jornais de circulação municipal,
      estadual, nacional, em diários oficiais ou no mural do da prefeitura.

- [ ] **59.** Permitir ao fisco acompanhar as informações sobre todas as etapas da entrega e da ciência do
      contribuinte sobre a intimação fiscal, exibindo data e horário de cada etapa.

- [ ] **60.** Possibilitar a visualização de todas as informações da intimação fiscal, incluindo a situação, o prazo,
      o nome do fiscal, a data de geração, e a forma de envio e entrega. Também permitir a visualização das
      observações de envio, entrega e cancelamento da intimação.

- [ ] **61.** Permitir ao Fisco registrar o recebimento do documento solicitado ao contribuinte para contemplar a
      análise durante o processo de apuração fiscal, possibilitando informar a data de recebimento e a emissão do
      comprovante, utilizando um modelo padrão ou personalizado, a qualquer momento durante o processo administrativo
      fiscal.

- [ ] **62.** Permitir ao Fisco registrar a devolução do documento solicitado ao contribuinte para contemplar a
      análise durante o processo de apuração fiscal, possibilitando informar a data de devolução e a emissão do
      comprovante, utilizando um modelo padrão ou personalizado, a qualquer momento durante o processo administrativo
      fiscal.

- [ ] **63.** Permitir a emissão do termo de devolução de documento a ser fiscalizado, utilizando um modelo padrão ou
      personalizado, a qualquer momento durante o processo administrativo fiscal, com controle de envio e confirmação
      de entrega.

- [ ] **64.** Permitir ao Fisco registrar a apreensão do documento que foi solicitado ao contribuinte ou em
      diligência, quando o fiscal identificar a necessidade de apreender o documento.

- [ ] **65.** Permitir ao Fisco registrar a apreensão do documento solicitado ao contribuinte ou em diligência, quando
      o fiscal identificar a necessidade de apreender o documento.

- [ ] **66.** O sistema deverá ainda possibilitar ao Fisco registrar a liberação do documento solicitado para
      fiscalização que foi apreendido.

- [ ] **67.** O sistema deverá ainda possibilitar ao Fisco registrar a liberação do documento solicitado para
      fiscalização que foi apreendido.

- [ ] **68.** Permitir a emissão do termo de apreensão de documento a ser fiscalizado, utilizando um modelo padrão ou
      personalizado, a qualquer momento durante o processo administrativo fiscal, com controle de envio e confirmação
      de entrega.

- [ ] **69.** Possibilitar ao Fisco desobrigar o documento que foi exigido a ser entregue pelo contribuinte.

- [ ] **70.** O sistema deverá disponibilizar filtro que permita identificar os documentos solicitados para
      fiscalização que não possuem intimação emitida, os que estão apreendidos ou liberados, os que estão dentro ou
      fora do prazo, os que foram ou não recebidos, e ainda, os que já foram devolvidos.

- [ ] **71.** Permitir iniciar a apuração fiscal sem a necessidade de que o ponto de partida seja a emissão do termo
      de início da fiscalização, e a qualquer momento, possibilitar a emissão do termo de fiscalização.

- [ ] **72.** O sistema deverá mostrar o histórico de toda a movimentação do documento solicitado para fiscalização,
      exibindo o Fisco responsável e a data e horário em que as alterações foram realizadas.

- [ ] **73.** Possibilitar ao fisco municipal apurar possível diferença do ISS nos serviços prestados, comparando
      quanto foi declarado pelo contribuinte e quanto foi apurado pelo fisco. O sistema deverá exibir as informações
      da Apuração Fiscal de forma agrupada por ano e competência;

- [ ] **74.** Possibilitar ao fisco municipal apurar possível diferença do ISS nos serviços tomados, comparando quanto
      foi declarado pelo contribuinte e quanto foi apurado pelo fisco. O sistema deverá exibir as informações da
      Apuração Fiscal de forma agrupada por ano e competência;

- [ ] **75.** Possibilitar ao fisco municipal apurar possível diferença do ISS nos serviços prestados para o documento
      fiscal de forma individualizada.

- [ ] **76.** Possibilitar ao fisco municipal apurar possível diferença do ISS nos serviços tomados para o documento
      fiscal de forma individualizada.

- [ ] **77.** Possibilitar ao sistema mostrar a situação de cada documento fiscal, identificando os documentos fiscais
      que foram declarados, aqueles que estão em apuração, os que já foram apurados e ainda os documentos fiscais
      arbitrados pelo Fisco Municipal, tanto para serviços prestados quanto tomados.

- [ ] **78.** Possibilitar ao sistema mostrar os dados originais do documento fiscal e também os que foram modificados
      pelo Fisco durante a apuração fiscal, tanto para serviços prestados quanto tomados.

- [ ] **79.** Possibilitar ao sistema mostrar o valor da base de cálculo declarado pelo contribuinte e apurado pelo
      Fisco, e ainda o valor da diferença para cada documento fiscal, tanto para serviços prestados quanto tomados.

- [ ] **80.** Possibilitar ao sistema mostrar o valor do ISS declarado pelo contribuinte e apurado pelo Fisco, e ainda
      o valor da diferença para cada documento fiscal, tanto para serviços prestados quanto tomados.

- [ ] **81.** Possibilitar ao sistema mostrar o nome do fiscal, data e horário, e os dados originais e os que foram
      modificados através da apuração fiscal para cada documento fiscal, tanto para serviços prestados quanto tomados.

- [ ] **82.** Possibilitar ao Fisco municipal editar o documento fiscal e realizar qualquer modificação nos dados, sem
      alterar a situação para diferente de "Declarado", tanto para serviços prestados quanto tomados.

- [ ] **83.** Possibilitar ao Fisco municipal fazer a inserção de documento fiscal na situação de "Declarado", tanto
      para serviços prestados quanto tomados.

- [ ] **84.** Possibilitar ao Fisco municipal fazer a inserção de documento fiscal na situação de "Declarado", tanto
      para serviços prestados quanto tomados.

- [ ] **85.** Possibilitar ao sistema disponibilizar recurso que permite ao Fisco fazer a apuração fiscal, sendo
      possível adicionar em lote o valor da base de cálculo e a alíquota por item da lista de serviço, e ainda, exibir
      na situação "Arbitrado", tanto para serviços prestados quanto tomados.

- [ ] **86.** Possibilitar ao sistema mostrar o valor total da base de cálculo e do ISS de todos os registros
      adicionados durante a apuração em lote, tanto para serviços prestados quanto tomados.

- [ ] **87.** Possibilitar ao sistema mostrar o valor total da base de cálculo e do ISS de todos os registros
      adicionados durante a apuração em lote, tanto para serviços prestados quanto tomados.

- [ ] **88.** Possibilitar ao sistema realizar a apuração fiscal de qualquer documento fiscal que possua notificação
      fiscal emitida, tanto para serviços prestados quanto tomados.

- [ ] **89.** Possibilitar ao sistema realizar a apuração fiscal de qualquer documento fiscal que possua notificação
      fiscal emitida, tanto para serviços prestados quanto tomados.

- [ ] **90.** Possibilitar ao sistema que o Fisco faça a inserção dos valores pagos na competência que está sendo
      apurada, incluindo a data de pagamento, o valor pago e os acréscimos segregados (correção, juros e multa), se
      houver, tanto para serviços prestados quanto tomados.

- [ ] **91.** Possibilitar ao Fisco inserir a infração cometida pelo contribuinte, com a opção de adicionar para
      determinada competência ou várias competências, permitindo definir por ano e todas as competências, com a opção
      de selecionar apenas algumas ou exceto algumas, tanto para serviços prestados quanto tomados.

- [ ] **92.** Possibilitar a emissão do Mapa da Apuração, que deverá mostrar a relação dos documentos fiscais que
      foram apurados e arbitrados nas competências, com os respectivos valores declarados, apurados da base de cálculo
      e do valor do ISS, além da diferença. O sistema permitirá customizar o demonstrativo da apuração no modelo
      desejado pelo Fisco, tanto para serviços prestados quanto tomados.

- [ ] **93.** Permitir a alteração da alíquota do ISS individualmente para cada documento fiscal declarado pelo
      contribuinte, ou ainda, modificar a alíquota para todas as notas fiscais de determinado item da lista de
      serviços. A modificação da alíquota deverá ser possível através das opções: todos os documentos fiscais da
      apuração fiscal, por ano, por ano e serviço, ou apenas por serviços, considerando todos os documentos fiscais
      contidos nas competências que estão sendo fiscalizadas, tanto para serviços prestados quanto para serviços
      tomados.

- [ ] **94.** Permitir ao fisco, através de fórmula, determinar a composição do valor do ISS devido conforme exigido
      pela legislação municipal.

- [ ] **95.** Possibilitar ao fisco controlar a apuração fiscal dos serviços prestados pela instituição financeira,
      comparando o que foi declarado pelo contribuinte e o apurado pelo fisco.

- [ ] **96.** Permitir visualizar a quantidade e lista de ações fiscais que ainda não iniciaram o processo de apuração
      fiscal, a quantidade de ações fiscais que estão em apuração fiscal e também as que já foram encerradas.

- [ ] **97.** Permitir visualizar a quantidade e lista das ações fiscais que estão em apuração e ainda não emitiram o
      termo de início de fiscalização.

- [ ] **98.** Permitir visualizar a quantidade e as ações fiscais que estão próximas de encerrar o prazo de
      fiscalização, possibilitando que o fisco decida se realizará o encerramento, agilizará o processo ou
      prorrogá-lo-á.

- [ ] **99.** Permitir visualizar a lista das ações fiscais, exibindo as que estão em dia, as próximas do vencimento e
      as vencidas.

- [ ] **100.** Permitir visualizar um gráfico de comparação entre o valor declarado e o valor apurado durante o
      processo de apuração fiscal.

- [ ] **101.** Possibilitar ao fisco municipal gerar a notificação do lançamento do crédito tributário do ISS em
      virtude da apuração fiscal, com controle de entrega da notificação.

- [ ] **102.** Possibilitar a emissão da notificação de lançamento do ISS.

- [ ] **103.** Permitir ao fiscal filtrar a notificação através dos seguintes filtros: as notificações que estão
      ativas ou suspensas, se foram enviadas e/ou entregues, filtrar as notificações que tiveram a entrega fracassada
      ou omitida. Filtrar as notificações que já foram pagas, estão em aberto, inscritas em dívida, e as notificações
      que estão no prazo ou fora do prazo.

- [ ] **104.** Permitir ao fisco municipal controlar a forma de entrega da notificação de lançamento e a ciência do
      contribuinte. O registro da entrega da notificação poderá ser feito pela publicação de edital, identificando a
      fonte onde foi publicado, através do correio ou da entrega pessoal.

- [ ] **105.** Permitir cadastrar formas de divulgação da notificação de lançamento por edital, inserindo o nome do
      meio de comunicação onde será publicado, e identificar se o edital foi publicado em jornais de circulação
      municipal, estadual, nacional, em diários oficiais ou no mural da prefeitura.

- [ ] **106.** Permitir ao fisco acompanhar as informações sobre todas as etapas da entrega e da ciência do
      contribuinte sobre a notificação de lançamento, exibindo a data e o horário de cada etapa.

- [ ] **107.** Possibilitar a visualização de todas as informações da notificação de lançamento, incluindo a situação,
      o prazo, o nome do fiscal, a data da geração e a forma de envio e entrega. Também permitir a visualização das
      observações de envio, entrega e cancelamento da notificação.

- [ ] **108.** Permitir que o sistema gere automaticamente a data de vencimento do lançamento tributário e o prazo
      para impugnação a partir da data da ciência do contribuinte. O sistema deverá possibilitar a definição da
      quantidade de dias para calcular a data de vencimento, segregando entre optantes e não optantes do Simples
      Nacional.

- [ ] **109.** Permitir que o sistema, ao calcular a data de vencimento e o prazo para pedido de impugnação, defina se
      a contagem será em dias corridos ou úteis. Caso a data de vencimento e/ou o prazo coincidam com feriados ou fins
      de semana, o sistema deverá disponibilizar recurso que permita ao fisco decidir se deseja manter, prorrogar ou
      antecipar a data de vencimento ou o prazo.

- [ ] **110.** Permitir que o sistema disponibilize configuração para definir a quantidade de dias que o contribuinte
      terá para tomar conhecimento do fato, quando a notificação for feita por edital, iniciando assim a contagem do
      tempo para determinar a data de vencimento e o prazo para impugnação.

- [ ] **111.** Permitir que o sistema disponibilize configuração para definir a quantidade de dias a ser concedida ao
      contribuinte, quando a entrega for omitida por ele, iniciando a contagem do tempo para determinar a data de
      vencimento e o prazo para impugnação.

- [ ] **112.** Permitir ao fiscal prorrogar o prazo da notificação do lançamento, inserindo a quantidade de dias a ser
      prorrogada, e ainda definir se a contagem será em dias corridos ou úteis. Caso o prazo prorrogado coincida com
      feriado ou fim de semana, o sistema deverá considerar o próximo dia útil.

- [ ] **113.** O sistema deverá registrar o nome do fiscal, bem como a data e o horário em que ocorreu o registro do
      envio e entrega da notificação do lançamento ao contribuinte.

- [ ] **114.** O sistema deverá permitir, a qualquer tempo, alterar o parecer final da notificação de lançamento, com
      a possibilidade de emitir a notificação com o novo conteúdo do parecer, mantendo o mesmo número e valor da
      notificação de lançamento.

- [ ] **115.** Permitir a consulta dos lançamentos tributários e a emissão das respectivas guias de pagamento, com os
      filtros que possibilitam a consulta através das seguintes opções: situação do lançamento tributário, permitindo
      selecionar uma ou várias situações; filtro para consultar o lançamento tributário referente à notificação do ISS
      e/ou ao lançamento de auto de infração; filtro por data inicial e final da geração do lançamento; filtro pela
      data de vencimento; além da opção de selecionar todos os lançamentos que estão vencidos ou os que não estão
      vencidos.

- [ ] **116.** Enviar para o sistema tributário de arrecadação os lançamentos tributários oriundos dos processos
      administrativos fiscais.

- [ ] **117.** Permitir que o sistema mostre o lançamento da diferença do ISS de forma segregada, exibindo o valor
      total da diferença do tributo (ISS) e sua composição, incluindo os valores dos acréscimos (correção, juros e
      multa). Além disso, o sistema deve mostrar de forma segregada o valor da multa de infração, incluindo o valor do
      desconto, se houver.

- [ ] **118.** Possibilitar ao fisco fazer o cancelamento da notificação de lançamento diante da diferença encontrada
      na apuração do ISS ou o lançamento do auto de infração.

- [ ] **119.** Permitir ao fisco determinar o desconto no valor da multa de infração, de forma segregada para o auto
      de infração e processo administrativo fiscal, com a possibilidade de definir o percentual de desconto
      diferenciado conforme a data de pagamento.

- [ ] **120.** Permitir determinar a data de vigência da taxa de expediente (emolumentos).

- [ ] **121.** Permitir ao fisco registrar o pedido de impugnação, incluindo o nome do contribuinte, o assunto a ser
      impugnado e o número da notificação a ser impugnada. O sistema deverá exibir os detalhes da notificação, como o
      número da ação fiscal ou do auto de infração, o valor e a data de vencimento.

- [ ] **122.** Permitir a suspensão do lançamento tributário do ISS ou do auto de infração através do pedido de
      impugnação pelo contribuinte, mediante ato administrativo pelo fiscal.

- [ ] **123.** Permitir que a solução de gestão do processo fiscal controle automaticamente o prazo para o
      contribuinte se manifestar após a ciência da notificação do ISS e das infrações cometidas pelo sujeito passivo.
      Caso o prazo ocorra em feriado ou final de semana, o sistema deverá permitir, de forma automática, a prorrogação
      ou antecipação do prazo para o próximo dia útil.

- [ ] **124.** Permitir configurar a quantidade de dias para conceder ao contribuinte o conhecimento de um fato quando
      for por edital, para dar início à contagem do tempo para determinar a data de vencimento e o prazo para
      impugnação. Além disso, deve ser possível definir se a contagem será em dias úteis ou corridos.

- [ ] **125.** Permitir que o usuário fiscal identifique se o pedido de impugnação foi solicitado dentro do tempo
      devido, identificando os tempestivos e os intempestivos.

- [ ] **126.** Permitir que o sistema impeça automaticamente a continuidade do lançamento, suspendendo-o, caso o
      pedido de impugnação seja solicitado após o prazo previsto na legislação.

- [ ] **127.** Permitir ao fisco suspender o lançamento tributário, mesmo que o pedido de impugnação seja
      intempestivo.

- [ ] **128.** Permitir ao fisco, durante o período de apreciação, manifestar a decisão com provimento ou não do
      pedido de impugnação do contribuinte.

- [ ] **129.** Permitir que o julgador de processos tributários envie para 2ª instância o pedido de impugnação para
      apreciação pelo conselho do contribuinte ou o responsável.

- [ ] **130.** Permitir ao fisco responsável pelo julgamento o envio de ofício do pedido de impugnação para a 2ª
      instância, considerando o valor do ISS definido em lei, que permite ao fiscal responsável encaminhar o caso para
      apreciação do conselho do contribuinte.

- [ ] **131.** Permitir ao fisco municipal controlar a forma de entrega e a ciência do contribuinte no resultado da
      decisão do pedido de impugnação, acompanhando a entrega através da publicação em edital com destaque na fonte da
      divulgação, pelo correio e a entrega diretamente ao contribuinte.

- [ ] **132.** Permitir ao fisco acompanhar as informações sobre todas as etapas da entrega e da ciência do
      contribuinte sobre o resultado da decisão do pedido de impugnação, exibindo data e horário de cada etapa.

- [ ] **133.** Permitir ao fisco fazer as considerações no valor do lançamento do ISS impugnado diante da decisão do
      fiscal responsável pelo julgamento, permitir modificar, adicionar e impugnar por competência e item da lista de
      serviço.

- [ ] **134.** Permitir ao fisco fazer as considerações no valor do auto de infração impugnado diante da decisão do
      fiscal responsável pelo julgamento, permitir modificar, adicionar e impugnar por competência e item da lista de
      serviço.

- [ ] **135.** Permitir ao fisco identificar o pedido de impugnação por resultado da decisão, identificando os que
      beneficiam o contribuinte daqueles que são favoráveis ao município.

- [ ] **136.** Permitir ao fisco conhecer o valor do ISS modificado diante da decisão do fiscal que julga os processos
      de impugnação antes da confirmação e constituir o crédito tributário com o novo valor.

- [ ] **137.** Permitir ao fisco controlar o sujeito passivo que foi comunicado sobre processo fiscal ou auto de
      infração lavrado, e concedido prazo para se manifestar e não o fez, precisando fazer registro e emissão do termo
      de revelia.

- [ ] **138.** Permitir a consulta do pedido de impugnação, com filtro para identificar se é tempestivo ou
      intempestivo, se está com o julgador do pedido ou com o fisco que gerou a notificação impugnada. Além disso,
      possibilitar a consulta dos pedidos que foram procedentes e os que foram improcedentes.

- [ ] **139.** Permitir ao fisco gerar o lançamento do ISS arbitrariamente pela omissão de informações pelo
      contribuinte, descrevendo os elementos definidos na legislação que compõe a base de cálculo arbitrada e
      aplicando a alíquota do ISS do item da lista de serviço prestado pelo contribuinte.

- [ ] **140.** Permitir fazer a emissão da notificação e do termo de arbitramento no modelo customizado ou a partir do
      disponível pelo sistema.

- [ ] **141.** Permitir ao fisco municipal controlar a forma de entrega e a ciência do contribuinte da notificação de
      lançamento do ISS arbitrado e do termo de arbitramento, permitindo o acompanhamento da entrega através da
      publicação em edital com destaque na fonte da divulgação, pelo correio e a entrega diretamente ao contribuinte.

- [ ] **142.** Permitir ao fisco acompanhar as informações sobre todas as etapas da entrega e da ciência do
      contribuinte da notificação do lançamento do ISS arbitrado e do termo de arbitramento, exibindo data e horário
      de cada etapa.

- [ ] **143.** Permitir ao fisco prorrogar a data para o contribuinte se manifestar de alegações da notificação do
      lançamento do ISS arbitrado.

- [ ] **144.** Possuir rotina para arbitrar o ISS e é possível incluir um novo processo e pesquisar os arbitramentos
      já cadastrados.

- [ ] **145.** Permitir o cancelamento da notificação do lançamento do ISS arbitrado ou do termo de arbitramento.

- [ ] **146.** Permitir a consulta das notificações que ainda não foram pagas, das que foram quitadas e das que foram
      inscritas em dívida ativa, facilitando o controle e acompanhamento da situação tributária dos contribuintes.

- [ ] **147.** Permitir ao fisco gerar o lançamento do ISS através do regime de estimativa, informando os elementos
      definidos na legislação que compõe a base de cálculo estimado e aplica a alíquota do ISS para o item da lista de
      serviço prestado pelo contribuinte.

- [ ] **148.** Permitir a emissão da Notificação do ISS Estimado e do Termo de Estimativa Fiscal, tanto no modelo
      customizado quanto no modelo disponibilizado pelo sistema, e possibilitar o cancelamento desses documentos.

- [ ] **149.** Permitir ao fisco municipal controlar a forma de entrega e a ciência do contribuinte da Notificação de
      Lançamento do ISS Estimado e do Termo de Estimativa Fiscal, oferecendo recursos para o acompanhamento da entrega
      através de diferentes meios, como publicação em edital, com destaque na fonte de divulgação, pelo correio ou
      entrega direta ao contribuinte.

- [ ] **150.** Permitir ao fisco acompanhar as informações sobre todas as etapas da entrega e da ciência do
      contribuinte da notificação do lançamento do ISS estimado, exibindo data e horário de cada etapa.

- [ ] **151.** Permitir ao fisco prorrogar a data para o contribuinte se manifestar de alegações da notificação do
      lançamento do ISS estimado.

- [ ] **152.** Possuir rotina para estimar o ISS e é possível incluir novo processo e pesquisar o registro das
      estimativas do ISS cadastradas.

- [ ] **153.** Permitir o cancelamento da Notificação do Lançamento do ISS Estimado e/ou do Termo de Arbitramento.

- [ ] **154.** Permitir a consulta das notificações de lançamento do ISS, incluindo as que ainda não foram pagas, as
      que foram quitadas e as que foram inscritas em dívida ativa. Esse recurso possibilitará ao fisco o
      acompanhamento do status de pagamento de cada notificação e facilitará a gestão da arrecadação tributária.

- [ ] **155.** A gestão do ISS terá que disponibilizar o controle da ordem de serviço, que deverá possibilitar o
      planejamento e a execução das atividades dos auditores fiscais, dando transparência nas ações realizadas pela
      fiscalização tributária.

- [ ] **156.** Permitir ao fisco responsável visualizar apenas as ordens de serviços que foram direcionadas para si. E
      o chefe da fiscalização possui acesso às ordens de serviços de todo o corpo de fiscais ou apenas daquele que
      desejar.

- [ ] **157.** Permitir ao chefe da equipe de fiscalização tributário identificar se a ordem de serviço foi iniciada
      dentro ou fora do prazo definido na legislação ou administração tributária. E caso necessário permitir conceder
      novo prazo ou encerrar a ordem de serviço.

- [ ] **158.** A solução de gestão do ISS terá que possibilitar à equipe tributária definir o prazo de encerramento da
      ordem de serviço, definido pela legislação vigente do município ou pela administração tributária.

- [ ] **159.** Permitir ao fisco vincular a ordem de serviço ao processo fiscal e ou auto de infração.

- [ ] **160.** Permitir ao gestor do setor de fiscalização fazer o cancelamento da ordem de serviço.

- [ ] **161.** Permitir a equipe da fiscalização tributário registrar variedade de serviços realizados pelo fisco que
      serão atrelados e realizados na ordem de serviços.

- [ ] **162.** A solução de gestão do ISS terá que mostrar painel gerencial para acompanhamento pelo fisco gestor da
      situação os dados de todas as ordens de serviços registradas. Apresentando a quantidade de ordem de serviço
      iniciadas fora do prazo e o fiscal responsável, a quantidade de ordem de serviço que estão pendentes para
      análise, as que estão em análise, pendente com o fiscal gestor ou com o fiscal responsável, aquelas ordens de
      serviço que estão no prazo e as vencidas para iniciar a análise, e por fim, a quantidade de ordem de serviço
      para cada fiscal responsável.

- [ ] **163.** A solução de gestão do ISS terá que mostrar painel gerencial para o fisco responsável pela análise da
      ordem de serviço, apresentando a quantidade de ordem de serviço por variedades de serviços, a quantidade de
      ordem de serviço que está aguardando a análise e também as que estão em análise, mostrar também a ordem de
      serviço iniciada fora do prazo e as que estão perto de vencer.

- [ ] **164.** Permitir ao fisco durante a análise da ordem de serviço fazer a emissão da notificação preliminar,
      fazendo em modelo customizado ou o disponibilizado pelo sistema.

- [ ] **165.** Permitir ao fisco municipal controlar a forma de entrega e a ciência do contribuinte da notificação
      preliminar, acompanhando através da publicação em edital, com destaque na fonte de divulgação, pelo correio e a
      entrega diretamente ao contribuinte.

- [ ] **166.** Permitir o fisco acompanhar as informações sobre todas as etapas da entrega e da ciência do
      contribuinte sobre o recebimento da notificação preliminar, exibindo data e horário de cada etapa.

- [ ] **167.** A solução de gestão do ISS terá que identificar o prazo em que o contribuinte pode regularizar a
      situação notificada pelo fisco, por meio da notificação preliminar, a partir da ciência do contribuinte.

- [ ] **168.** Conceder prazo para o contribuinte regularizar a situação oriunda da notificação preliminar.

- [ ] **169.** Permitir ao fiscal adicionar os documentos que permite a administração tributária atuar antes de autuar
      o contribuinte diante das infrações cometidas, emitindo a diligência fiscal, auto de apreensão, auto de embargo,
      de interdição, suspensão e cassação de atividade econômicas, e ainda selecionar o modelo customizado ou o
      disponibilizado pelo sistema.

- [ ] **170.** Permitir ao fiscal municipal controlar a forma de entrega dos documentos necessários antes da autuação
      das infrações cometidas pelo contribuinte, o registro da entrega para cada documento através da publicação de
      edital, identificando a fonte de divulgação, através do correio e da entrega pessoal.

- [ ] **171.** Permitir ao fisco acompanhar as informações sobre todas as etapas da entrega e da ciência do
      contribuinte sobre a diligência fiscal, auto de apreensão, de embargo, de interdição, suspensão e cassação de
      atividades econômicas, exibindo data e horário de cada etapa.

- [ ] **172.** A solução de gestão do ISS, terá que permitir à equipe da fiscalização tributário anexar planilhas e
      documentos no procedimento fiscal.

- [ ] **173.** A solução de gestão do ISS deverá permitir à equipe de fiscais controlar os atos administrativos nas
      suas próprias áreas de atuação. O fisco tem a possibilidade de vincular as infrações, às variáveis de atividade
      da ordem de serviço e a autoridade fiscal conforme a estrutura organizacional adotada pela administração
      tributária.

- [ ] **174.** Permitir ao gestor da fiscalização tributária fazer o controle da produtividade do corpo de fiscais.
      Conceder ao gestor o controle total na visualização das atividades produtivas de cada fiscal. E cada autoridade
      fiscal terá acesso às suas próprias atividades.

- [ ] **175.** A solução de ISS terá que possibilitar o registro das atividades produtividade e a pontuação conforme
      legislação municipal.

- [ ] **176.** Possibilitar ao fisco fazer a emissão do relatório customizado ou o do sistema que mostra as atividades
      e a produtividade para que o fiscal possa receber a devida remuneração pela pontuação.

- [ ] **177.** Permitir ao fisco criar sua própria agenda, possibilitando a inserção de atividades fiscais, incluindo
      plantões fiscais e compromissos.

- [ ] **178.** Permitir a visualização através de painel com as atividades fiscais e compromissos agendados para a
      semana corrente, com a possibilidade de consultar a agenda em períodos ou dias específicos.

- [ ] **179.** Permitir ao fisco editar ou excluir a sua agenda a qualquer momento.

- [ ] **180.** Permitir ao fisco, através do painel da agenda, acessar o relatório de produtividade, que irá fornecer
      uma visão detalhada das atividades realizadas, e também um relatório com os dados da agenda, permitindo o
      acompanhamento e a análise das tarefas cumpridas e dos compromissos registrados.

- [ ] **181.** Possibilitar que o fisco realize a importação das informações fiscais declaradas no ambiente digital da
      Receita Federal pelos contribuintes optantes do simples nacional, através do arquivo PGDAS-D.

- [ ] **182.** Oportunizar a autoridade fiscal acompanhar a divergência da receita bruta informada no PGDAS-D
      comparada com o valor do serviço declarado, para viabilizar o sincronismo das informações entre o contribuinte e
      a administração tributária do município.

- [ ] **183.** Permitir visualizar a divergência da receita bruta por ano e competência.

- [ ] **184.** Permitir ao sistema consultar a divergência da receita bruta apenas para os contribuintes monitorados
      pelo corpo de fiscais, os maiores contribuintes pelo valor do serviço, e ainda filtrar os que apresentam
      diferença, podendo ser selecionado entre aqueles com diferença menor ou maior.

- [ ] **185.** Possibilitar ao sistema a emissão do relatório de divergência da receita bruta, permitindo o uso de um
      modelo padrão ou a criação de um modelo personalizado, conforme a necessidade do fisco.

- [ ] **186.** Possibilitar ao fisco consultar a divergência da receita bruta, permitindo a filtragem por ano e
      período, para facilitar o acompanhamento e a análise das variações de receita ao longo do tempo.

- [ ] **187.** Possibilitar ao usuário fiscal importar arquivos contendo as movimentações de eventos e períodos dos
      contribuintes optantes pelo Simples Nacional e SIMEI.

- [ ] **188.** Permitir ao fisco visualizar o resultado do cruzamento de dados, identificando os contribuintes que são
      optantes do Simples Nacional e estão registrados na base de dados da Receita Federal, mas que não possuem
      registros na base da prefeitura.

- [ ] **189.** Permitir ao fisco identificar os contribuintes que aderiram ao Simples Nacional na Receita Federal, mas
      que na base de dados da prefeitura constam como não optantes.

- [ ] **190.** Permitir ao fisco identificar os contribuintes que deixaram o Simples Nacional na Receita Federal, mas
      que na base de dados da prefeitura ainda constam como optantes.

- [ ] **191.** Permitir ao fisco visualizar o resultado do cruzamento entre as informações oriundas do arquivo de
      movimentações de Períodos e SIMEI da Receita Federal com o Cadastro do Contribuinte, identificando aqueles
      contribuintes que aderiram ou deixaram o SIMEI na Receita Federal, mas cujos dados na base da prefeitura
      apresentam divergências.

- [ ] **192.** Permitir vincular o contribuinte registrado no cadastro municipal com o registro do Cartório oriundo do
      CNJ.

- [ ] **193.** Permitir a definição dos percentuais que configuram divergência entre o valor declarado pelo cartório
      no CNJ e no município.

- [ ] **194.** Permitir a importação dos dados declarados pelos cartórios no CNJ.

- [ ] **195.** Permitir a disponibilização do indicador que demonstre a lista dos cartórios que não possuem vínculo
      com algum contribuinte.

- [ ] **196.** Permitir a visualização dos dados importados do CNJ e do sistema de escrituração eletrônica Municipal e
      as eventuais divergências.

- [ ] **197.** Permitir a visualização do total declarado pelos cartórios no CNJ e do total declarado no sistema de
      escrituração eletrônica Municipal.

- [ ] **198.** Permitir a consulta da divergência da receita bruta do cartório, possibilitando verificar a divergência
      de maior ou menor valor, se a divergência foi resolvida ou está pendente, se o cartório está ativo ou inativo, e
      ainda se o cartório possui ou não divergência.

- [ ] **199.** Permitir o fisco conhecer a diferença no valor do ISS diante das notas fiscais emitidas comparada com a
      movimentação através de cartão de crédito ou débito.

- [ ] **200.** Importar na solução de gestão do ISS os dados oferecidos pela Secretaria estadual da fazenda para
      aqueles contribuintes estabelecidos nos municípios que operaram com as administradoras de cartão.

- [ ] **201.** O sistema deverá mostrar a divergência por ano e competência, permitindo ainda a consulta apenas
      daqueles contribuintes que possuem divergência e são optantes do Simples Nacional, assim como aqueles que não
      são optantes.

- [ ] **202.** Permitir ao fisco conhecer a diferença do valor do ISS entre as notas fiscais comparando com o valor do
      ISS estimado, facilitando a identificação de eventuais discrepâncias e a análise da conformidade tributária.

- [ ] **203.** Permitir ao sistema mostrar a divergência do ISS por ano e competência, além de possibilitar a consulta
      filtrada por ano ou por período anual.

- [ ] **204.** Possibilitar ao fisco municipal se comunicar com o contribuinte de forma eletrônica, destinando a
      cientificar o contribuinte no envio de intimações, avisos e demais documentos pertinentes ao processo fiscal, e
      ainda quaisquer assuntos relevantes da administração tributária.

- [ ] **205.** Permitir ao fisco municipal enviar a comunicação eletrônica em lote ou individualizada. Sendo por lote
      deverá disponibilizar opções para selecionar os sujeitos passivos, pela modalidade do ISS, regime tributário,
      porte da empresa, para a instituição financeira, cartórios, construção civil e demais tipos de prestadores de
      serviços.

- [ ] **206.** Permitir ao fisco identificar de forma sistemática e de fácil uso as comunicações que foram enviadas,
      as que ainda estão pendentes para envio e as finalizadas.

- [ ] **207.** No controle da comunicação eletrônico tem que permitir o diálogo entre o fisco e o contribuinte,
      permitindo que o contribuinte responda ao questionamento atribuído a ele. Com a possibilidade do sujeito passivo
      anexar documentos para a análise do fisco.

- [ ] **208.** Permitir ao fisco visualizar a data e horário que o contribuinte visualizou a comunicação eletrônica e
      também os diálogos recebidos.

- [ ] **209.** Permitir ao fisco identificar a comunicação eletrônica que está pendente consigo e com o contribuinte e
      as finalizadas.

- [ ] **210.** A solução deverá permitir ao fisco gerenciar o prazo para que a comunicação eletrônica seja de
      conhecimento do contribuinte, configurando a quantidade de dias definidos na legislação, e ainda deve
      cientificar automaticamente se decorrido o prazo exigido.

- [ ] **211.** Permitir ao sistema disponibilizar recurso de configuração que atenda à estrutura organizacional
      municipal, possibilitando a personalização para as áreas de fiscalização administrativa e tributária. Além
      disso, o sistema deverá permitir a criação de equipes de fiscais dentro de cada setor de fiscalização, conforme
      o organograma de atuação, garantindo a organização e eficiência na gestão do processo fiscal.

- [ ] **212.** Permitir que o procedimento administrativo fiscal esteja vinculado a área de atuação conforme estrutura
      adotada pela administração tributária.

- [ ] **213.** Possibilitar que o fiscal tenha permissão para acessar demais áreas de atuação conforme necessidade e
      definição pelo setor de fiscalização.

- [ ] **214.** A solução de gestão de ISS deverá possibilitar que o fisco crie e desabilite a área de atuação que
      sofreu modificações diante da necessidade na mudança da estrutura administrativa e tributária.

- [ ] **215.** Permitir ao sistema vincular as atividades e infrações a cada setor de fiscalização, garantindo que
      cada área específica tenha o controle e a gestão adequados das infrações e tarefas correspondentes, conforme sua
      atuação dentro da estrutura organizacional municipal.

## Item 23 - Software de Escrita Fiscal Eletrônica

*Fonte: Anexo I, páginas 93-95/194.*

- [ ] **1.** Permitir ao contribuinte pessoa física ou jurídica solicitar permissão de acesso para declarar o
      documento fiscal de serviço prestado e tomado no município desejado.

- [ ] **2.** Possibilitar a configuração de quais rotinas estarão disponíveis para os contribuintes.

- [ ] **3.** Possibilitar a parametrização das funcionalidades do programa de acordo com a legislação do município.

- [ ] **4.** Permitir ao fisco informar a modalidade de lançamento do ISS para o respectivo contribuinte de acordo com
      as opções: Fixo, Homologado, Estimado, Não enquadrado.

- [ ] **5.** Disponibilizar meios para que o contribuinte realize todas as declarações de serviços prestados e
      tomados, de ISS retido de terceiros ou retidos por terceiros, podendo ser realizada manualmente, informando os
      documentos fiscais individualmente ou por meio de um arquivo contendo todos os documentos a serem declarados.

- [ ] **6.** Permitir efetuar o cálculo automático do valor do imposto ISS para cada serviço declarado do documento
      fiscal de serviços prestados e tomados. O sistema deverá considerar para calcular o valor do imposto ISS, a
      seguinte fórmula: valor do imposto = (base de cálculo x alíquota do serviço). O valor do ISS não poderá conter
      um resultado que seja menor que zero ou maior que o valor da base de cálculo.

- [ ] **7.** Permitir a escrituração dos serviços prestados e tomados através da importação de arquivo.

- [ ] **8.** Permitir a importação do arquivo selecionando a competência e a declaração de serviço, podendo ainda
      validar as informações do arquivo antes de importá-lo.

- [ ] **9.** Possibilitar que os contribuintes façam a declaração de serviços prestados de forma simplificada. Para
      aqueles enquadrados como entidades especiais será possível informar as características que irá compor a base de
      cálculo.

- [ ] **10.** Possibilitar a reabertura da declaração. Podendo ser automático de acordo com a parametrização ou
      através da solicitação para deferimento pelo fiscal.

- [ ] **11.** Possibilitar ao contribuinte o registro da solicitação de reabertura de declarações de despesas.

- [ ] **12.** Permitir que o contribuinte encerre declarações de serviços prestados ou tomados que não possuem
      movimentação.

- [ ] **13.** Possibilitar que declarações encerradas sejam retificadas, gerando uma nova guia de pagamento ou um
      saldo a ser compensado em novas declarações.

- [ ] **14.** Possibilitar a configuração do sistema para que seja possível inserir mais de uma declaração para a
      mesma competência.

- [ ] **15.** Permitir ao fisco municipal parametrizar o tipo de declaração de serviço que será possível múltiplas
      declarações de serviços por competência.

- [ ] **16.** Permitir a identificação das informações por competências e a visualização da data de emissão, número, o
      serviço prestado, o local da prestação do serviço, o valor, as deduções e o valor do imposto.

- [ ] **17.** Permitir que o contador cadastre seus funcionários, definindo individualmente as permissões para as
      rotinas e relatórios do sistema, bem como as empresas que eles terão acesso.

- [ ] **18.** Possibilitar que o contador solicite a transferência da responsabilidade dos serviços contábeis de um
      determinado contribuinte para o seu escritório de contabilidade e que somente após a devida análise e
      deferimento de um fiscal a transferência seja realizada.

- [ ] **19.** Possibilitar que o contador solicite a desvinculação do contador de determinado contribuinte e que
      somente após a devida análise e deferimento de um fiscal o desvinculo seja realizado.

- [ ] **20.** Permitir que o fiscal emita seu parecer referente a uma solicitação de transferência de contador.

- [ ] **21.** Possibilitar ao Contador o encerramento da atividade econômica das empresas vinculadas a ele, e ainda a
      critério do município permitir a parametrização da efetivação da baixa da atividade com ou sem a verificação de
      pendência financeira.

- [ ] **22.** Possibilitar que os contribuintes enquadrados como declarantes por conta de serviço, realizem a
      importação do plano de contas.

- [ ] **23.** Possibilitar que os contribuintes que efetuam suas declarações através de contas bancárias, utilizem o
      Plano Contábil das Instituições do Sistema Financeiro Nacional (COSIF), podendo realizar a importação por grupos
      de contas separadamente.

- [ ] **24.** Permitir que o fiscal do Município e o prestador de serviços cadastrem as notas fiscais avulsas
      eletrônicas exibindo dados, como: data de emissão, nome/razão social do prestador, inscrição estadual,
      requerente e dados do tomador.

- [ ] **25.** Permitir ao contribuinte prestador de serviço emitir a relação de notas avulsas emitidas.

- [ ] **26.** Possibilitar que o fiscal crie características para cada tipo de entidade especial.

- [ ] **27.** Possibilitar ao contribuinte registrar a declaração de faturamento mensal de vendas.

- [ ] **28.** Possibilitar por meio de configuração do sistema, que o fiscal exija do contribuinte enquadrado como
      microempresa o preenchimento da declaração de faturamento de vendas.

- [ ] **29.** Permitir a criação de regras para gerar o ISS diferenciado para Microempresas e para o ISS Fixo.

- [ ] **30.** Permitir que o fiscal gere as competências de forma automática.

- [ ] **31.** Permitir que o fiscal realize manutenção nos cadastros da lista de serviços (Lei 116/03).

- [ ] **32.** Permitir a configuração da listagem de serviços conforme Lei 116/03 ou Lei 157/16, contendo a opção para
      indicar a data de início da vigência municipal de acordo com a legislação indicada.

- [ ] **33.** Possibilitar que o fiscal realize o cadastro de mensagens a serem exibidas aos Contribuintes.

- [ ] **34.** Permitir que o fiscal realize o cadastro de materiais diversos a serem utilizados nas declarações de
      serviços pelos contribuintes enquadrados como construtora.

- [ ] **35.** Possibilitar a configuração do sistema para que gere automaticamente autos de infração, nos casos de
      declarações que sejam encerradas fora do prazo estabelecido pela entidade.

- [ ] **36.** Possibilitar que o fiscal acesse o módulo do contribuinte, para averiguações nos dados gerados sem
      permissão de realizar qualquer alteração.

- [ ] **37.** Possibilitar a visualização das notas fiscais emitidas no sistema de emissão de notas fiscais
      eletrônicas de serviços.

- [ ] **38.** Possibilitar que o contribuinte seja informado sobre suas pendências de declaração de documentos fiscais
      de serviços prestados e/ou tomados.

- [ ] **39.** Possuir rotina que possibilite ao fiscal exigir ou não a assinatura digital na declaração de serviço
      prestado e/ou tomado.

- [ ] **40.** Possibilitar que os contribuintes efetuem acesso seguro através de um teclado virtual.

- [ ] **41.** Possibilitar a criação de grupos de usuários fiscais, bem como a definição das permissões para cada
      grupo.

- [ ] **42.** Possibilitar a inserção do valor de dedução nas declarações de serviços prestados e de serviços tomados,
      para as atividades que incidem dedução, podendo ser informado um único valor por competência. Quanto à dedução
      no documento fiscal deverá ser informada na inserção da declaração de serviço.

- [ ] **43.** Possibilitar a realização de declaração de documento de serviço prestado/tomado para estrangeiro.

- [ ] **44.** Permitir que o contribuinte insira a informação do valor arrecadado em cartão de crédito/débito.

- [ ] **45.** Possibilitar a emissão de relatório que efetua o cruzamento entre declarações de serviços e valores
      recebidos em cartão.

- [ ] **46.** Permitir que saldos gerados sejam liberados para uso de forma automática, sem a intervenção do fiscal,
      ou manualmente, após a análise do mesmo.

- [ ] **47.** Possuir rotinas para consulta, lançamento, liberação, bloqueio, cancelamento e utilização de saldos.

- [ ] **48.** Possibilitar o cruzamento de documentos fiscais, confrontando os dados informados pelo prestador do
      serviço com os dados informados pelo tomador do serviço, evidenciando, assim, indícios de sonegação fiscal.

- [ ] **49.** Possibilitar a emissão de relatório de consulta à situação do contribuinte, podendo ser verificado se
      foram realizadas as declarações de serviços prestados ou tomados e se o imposto foi pago.

- [ ] **50.** Possibilitar a emissão de relatório dos serviços tomados, das empresas de fora do município, exibindo: o
      município do prestador, os valores declarados e o imposto retido, possibilitando ainda, fazer a análise das
      informações por atividade.

- [ ] **51.** Permitir ao contribuinte emitir o relatório da escrituração dos documentos fiscais de serviços prestados
      e Tomados.

- [ ] **52.** Permitir a definição de fórmulas para o cálculo de acréscimos (juro/multa/correção) para emissão de
      guias de pagamento.

- [ ] **53.** Permitir a emissão de guias para pagamento, conforme o convênio bancário utilizado pela entidade.

- [ ] **54.** Permitir ao fisco/contador se comunicar e dialogar com o contribuinte através de uma plataforma
      eletrônica, permitindo que fisco/contador dê ciência aos contribuintes de qualquer ato administrativo durante um
      processo de apuração fiscal, expedindo intimações, notificações, documentos e avisos em geral, com o registro do
      diálogo.

- [ ] **55.** Disponibilizar ao fisco, em atendimento a Justiça Eleitoral, que requisitará informações relativas às
      Notas Fiscais Avulsas Eletrônicas de bens e serviços emitidas em contrapartida à contratação de gastos
      eleitorais de candidatos e partidos políticos e, ainda, a identificação das pessoas físicas que exerçam
      atividade comercial decorrente de permissão pública. A exportação deve utilizar o formato que posteriormente
      permita a importação de dados no sistema de Justiça Eleitoral.

## Item 24 - Software de Protocolo Eletrônico

*Fonte: Anexo I, páginas 95-98/194.*

- [ ] **1.** Possuir painel visual que demonstre a quantidade de processos em cada situação no exercício atual ou
      ainda de todos os anos.

- [ ] **2.** Possuir painel para visualização das movimentações recentes realizadas nos processos.

- [ ] **3.** Permitir visualizar todos os processos que possuem guias em aberto e guias pagas.

- [ ] **4.** Definir a estrutura organizacional por meio do cadastro de organograma, definindo a forma de atribuição
      dos processos e os responsáveis.

- [ ] **5.** Permitir o registro das solicitações a serem protocoladas e controlar os documentos necessários para
      protocolização de uma solicitação, definindo a obrigatoriedade do documento na abertura externa ou interna e se
      deve ser anexado por solicitante pessoa física, jurídica ou ambos.

- [ ] **6.** Permitir anexar modelo de documento padrão para que o solicitante possa visualizar no momento da abertura
      de uma nova solicitação

- [ ] **7.** Possibilitar ao cidadão visualizar e gerar guias de pagamento na consulta dos processos.

- [ ] **8.** Permitir configurar se a solicitação poderá ser tramitada com taxas pendentes de pagamentos.

- [ ] **9.** Permitir que sejam anexados às solicitações documentos com no mínimo as seguintes extensões: PDF, CSV,
      ODS, ODT, XSL, TXT, DOC, DOCX, XLSX, JPG, PNG, ZIP, JPEF, RAR, DWG e MP4, permitindo ao administrador definir as
      extensões permitidas.

- [ ] **10.** Propiciar a definição de quais departamentos permitirão a entrada de processos.

- [ ] **11.** Possibilitar o gerenciamento de permissões por usuários, podendo definir se a permissão será para acesso
      a todos os processos da entidade, todos os processos do organograma ou todos os processos do usuário.

- [ ] **12.** Possuir configuração para permitir ao usuário tramitar processos do organograma que não estejam com o
      usuário.

- [ ] **13.** Possuir configuração para permitir ao usuário realizar o encerramento dos processos do organograma que
      não estejam com o usuário.

- [ ] **14.** Gerenciar os usuários que poderão ter acesso a processos em um determinado departamento.

- [ ] **15.** Controlar o acesso dos usuários para visualização dos pareceres de um processo.

- [ ] **16.** Possibilitar ao usuário administrador a configuração de notificações internas e externas do sistema.

- [ ] **17.** Permitir notificar os responsáveis do organograma interno à entidade sobre cada andamento efetuado.

- [ ] **18.** Permitir notificar o usuário interno ao receber uma transferência de processo.

- [ ] **19.** Permitir notificar o responsável interno pelo processo quando um documento for anexado externamente.

- [ ] **20.** Permitir notificar o responsável interno pelo processo quando um comentário interno/externo for
      realizado.

- [ ] **21.** Permitir notificar o responsável interno pelo organograma quando um processo for aberto e/ou
      protocolado.

- [ ] **22.** Permitir notificar todos os usuários do organograma quando um processo externo for aberto.

- [ ] **23.** Permitir notificar o responsável pelo processo quando o processo for devolvido pelo solicitante.

- [ ] **24.** Permitir notificar externamente ao abrir processos.

- [ ] **25.** Permitir notificar externamente ao realizar andamento no processo.

- [ ] **26.** Permitir notificar externamente ao encerrar processos.

- [ ] **27.** Permitir notificar externamente ao estornar encerramento de processo.

- [ ] **28.** Permitir notificar externamente ao reativar processo.

- [ ] **29.** Permitir notificar externamente ao parar processo.

- [ ] **30.** Permitir notificar externamente ao gerar guia de pagamento.

- [ ] **31.** Permitir notificar externamente ao realizar um parecer.

- [ ] **32.** Permitir notificar externamente ao protocolar processo.

- [ ] **33.** Permitir notificar externamente ao rejeitar solicitações.

- [ ] **34.** Permitir notificar externamente ao retornar uma solicitação.

- [ ] **35.** Permitir notificar externamente quando for realizado um comentário externo ao processo.

- [ ] **36.** Permitir limitar a quantidade de protocolos pendentes por requerente.

- [ ] **37.** Permitir que o usuário crie informações adicionais para as solicitações de aberturas de processos,
      configurando a obrigatoriedade ou não do preenchimento destas informações pelo requerente ou usuário que realiza
      a abertura do processo.

- [ ] **38.** Possibilitar ao usuário visualizar e pesquisar as pessoas através de listagem, sendo que na listagem as
      informações devem ser passíveis de ordenação, podendo a ordenação ser realizada por: nome, tipo, CPF/CNPJ, ou
      situação.

- [ ] **39.** Permitir configurar um organograma padrão para arquivamento dos processos. No encerramento dos processos
      deve sugerir ao usuário realizar andamento para este organograma, caso o processo seja encerrado em organograma
      diferente, ou sugerir o arquivamento, caso seja encerrado no organograma padrão de arquivamento.

- [ ] **40.** Possibilitar aos usuários que possuam permissão de acesso, realizar ações através da consulta geral de
      processos. As seguintes ações devem ser realizadas: Emitir etiquetas, Emitir comprovante de abertura de
      protocolo, Emitir capa de processo, Gerar guia de pagamento, Consultar o processo aberto, Realizar andamento do
      processo, Realizar Parecer, Parar o processo, Reativar processo parado, Transferir processo, Arquivar processo,
      Estorno de encerramento (para processos encerrados).

- [ ] **41.** Realizar juntada de processos (para processos que atendam as regras para juntada).

- [ ] **42.** Permitir o cadastro retroativo de processos.

- [ ] **43.** Permitir alterar o requerente caso não tenha recebido nenhum andamento e/ou parecer.

- [ ] **44.** Permitir a exclusão de parecer pelo responsável.

- [ ] **45.** Permitir juntada de processos por anexação e por apensação.

- [ ] **46.** Possibilitar a exclusão de andamentos de processos, confirmados ou não confirmados no organograma de
      destino.

- [ ] **47.** Permitir o encerramento e o arquivamento de processos, de forma individual ou vários, simultaneamente.

- [ ] **48.** Permitir um usuário logar através do serviço do Google, Facebook, Linkedin ou GOV.BR.

- [ ] **49.** Permitir ao cidadão a Consulta de Processos.

- [ ] **50.** Permitir ao cidadão anexar documentos pendentes quando requisitado.

- [ ] **51.** Permitir ao cidadão utilizar certificado digital, quando houver, para abertura de processos.

- [ ] **52.** Permitir ao cidadão incluir beneficiário ao processo.

- [ ] **53.** Permitir deferimento de solicitações de aberturas externas de processos protocolados pelo cidadão.

- [ ] **54.** Possibilitar aos servidores a realização de retorno dos processos aos solicitantes, para que os mesmos
      possam anexar documentos ou incluir documentos faltantes ao processo, bem como possibilitar ao servidor desfazer
      o retorno ao solicitante, para os casos que não haja resposta por parte do mesmo, fazendo com que o processo
      retorne para o servidor.

- [ ] **55.** Possibilitar ao usuário interno favoritar processos para sua gestão individual.

- [ ] **56.** Possibilitar ao usuário interno salvar filtros de pesquisa para busca rápida da seleção desejada.

- [ ] **57.** Dispor de histórico completo das movimentações realizadas em um processo em linha do tempo, com no
      mínimo: data, horário, quem enviou, quem recebeu.

- [ ] **58.** Permitir movimentações de processos em lote.

- [ ] **59.** Permitir auditoria de dados.

- [ ] **60.** Permitir ao usuário administrador do sistema a configuração personalizada de assuntos padrões para
      seleção no cadastro de processos, com premissas e súmula vinculada.

- [ ] **61.** Permitir a vinculação de taxas inerentes ao andamento do processo.

- [ ] **62.** Permitir a parada de processo, desde que justificada.

- [ ] **63.** Possibilitar aos usuários autorizados a criação de um fluxo de trabalho, por assunto, com e sem
      automação de processos com um conjunto de regras definidas, permitindo que estes possam ser transmitidos de um
      organograma para outro.

- [ ] **64.** Permitir visualizar em modo mapa todos os processos abertos na entidade que possuem endereço da
      ocorrência indicado, permitindo filtrar por assunto para identificar os locais com maiores incidências daquela
      solicitação.

- [ ] **65.** Permitir definir quem poderá solicitar a geração do ITBI: cartórios, proprietários, compradores.

- [ ] **66.** Permitir definir se o cidadão poderá alterar as alíquotas no momento da abertura da solicitação do ITBI.

- [ ] **67.** Permitir que na solicitação de geração do ITBI pelo cartório, proprietário e comprador, seja possível
      escolher o tipo de imóvel: urbano ou rural.

- [ ] **68.** Permitir que o contribuinte na solicitação de geração do ITBI pesquise seus imóveis, podendo selecionar
      um ou mais imóveis.

- [ ] **69.** Permitir que o contribuinte na solicitação de geração do ITBI informe a inscrição imobiliária/inscrição
      INCRA do imóvel que deseja comprar.

- [ ] **70.** Permitir ao contribuinte preencher a solicitação do ITBI com informações como valor venal do terreno,
      valor da construção, valor declarado, valor das benfeitorias, valor do financiamento e outros valores.

- [ ] **71.** Permitir ao contribuinte na solicitação do ITBI adicionar outros proprietários compradores e o
      percentual da compra.

- [ ] **72.** Disponibilizar conteúdo explicativo no momento da solicitação de transferência de imóveis para orientar
      contribuintes com dúvidas sobre o preenchimento do formulário.

- [ ] **73.** Permitir ao contribuinte informar o responsável (comprador/vendedor) pelo pagamento da guia de ITBI.

- [ ] **74.** Permitir ao contribuinte retificar o pedido de solicitação do ITBI informando obrigatoriamente o motivo.

- [ ] **75.** Permitir que o contribuinte visualize, no pedido de solicitação do ITBI, os valores ajustados pela
      entidade pública quando o valor declarado for inferior ao devido.

- [ ] **76.** Permitir ao contribuinte emitir a guia de ITBI e a certidão de ITBI ao consultar a solicitação de ITBI.

- [ ] **77.** Gerar URL para a solicitação de abertura externa de protocolo.

- [ ] **78.** Gerar URL para consulta externa de protocolo.

- [ ] **79.** Permitir configurar abertura de manifestação dos tipos: denúncia, elogio, reclamação, simplifique,
      solicitação, sugestão, através do chatbot disponíveis para abertura externa.

## Item 25 - Software de Gestão de Documentos Eletrônicos e Assinaturas

*Fonte: Anexo I, páginas 98-101/194.*

- [ ] **1.** Permitir o armazenamento de arquivos e documentos em nuvem, possibilitando a visualização e criação de
      múltiplos documentos e pastas.

- [ ] **2.** Possibilitar anexar documentos com várias extensões.

- [ ] **3.** Possibilitar anexar os arquivos através de botão que permita inserir o documento, arrastando-o até o
      local desejado.

- [ ] **4.** Possuir design responsivo, permitindo o acesso através de computadores, tablets e smartphones.

- [ ] **5.** Dispor de lista das principais funcionalidades, como documentos, fluxo de trabalho, acompanhar
      assinaturas e lixeira.

- [ ] **6.** Permitir a visualização de documentos adicionados pelo usuário, compartilhados com ele.

- [ ] **7.** Permitir a organização dos documentos através de criação de pastas e subpastas.

- [ ] **8.** Permitir ao proprietário do documento a visualização, edição ou exclusão de um documento podendo ainda
      baixar o arquivo ou movê-lo para outro local. Ao usuário que não é proprietário, devem estar disponíveis as
      opções de visualização e download.

- [ ] **9.** Possuir histórico de versões dos documentos, possibilitando a visualização das versões realizadas no
      arquivo.

- [ ] **10.** Possuir campo para realização de pesquisa para localização de documentos, permitindo a busca pelo autor,
      título ou conteúdo existente no teor do documento.

- [ ] **11.** Permitir o compartilhamento de documentos e/ou pasta com um usuário, ou um grupo pré-definido,
      permitindo ainda a configuração quanto a permissão dos participantes (leitor ou editor).

- [ ] **12.** Possibilitar atribuir um fluxo de trabalho para um documento inserido, permitindo que outros usuários
      possam aprovar ou reprovar.

- [ ] **13.** Permitir a criação e gestão dos fluxos de trabalho, possibilitando inserir nome e descrição ao fluxo,
      bem como determinar às pessoas envolvidas na tramitação, como o aprovador.

- [ ] **14.** Permitir que na atribuição de um responsável pela aprovação, seja possível incluir a descrição da
      atividade solicitada, como analisar ou aprovar o documento.

- [ ] **15.** Permitir a visualização dos fluxos, com os responsáveis e suas respectivas atribuições.

- [ ] **16.** Permitir que o usuário visualize os documentos que estão pendentes de aprovação.

- [ ] **17.** Possibilitar que o usuário aprovador descreva um parecer em caso de reprovação do documento.

- [ ] **18.** Permitir o gerenciamento dos usuários, permitindo conceder e editar as autorizações necessárias para
      cada um.

- [ ] **19.** Possibilitar a realização de auditoria, permitindo que o administrador do sistema possa acompanhar as
      movimentações dos usuários.

- [ ] **20.** Possuir lixeira, para centralizar documentos excluídos, permitindo restaurá-los.

- [ ] **21.** Permitir que apenas o proprietário do documento possa realizar a exclusão.

- [ ] **22.** Permitir a edição de documentos e pastas.

- [ ] **23.** Permitir a visualização dos arquivos anexados nos documentos.

- [ ] **24.** Permitir mover pastas e documentos.

- [ ] **25.** Permitir o anexo de arquivos em documentos já criados.

- [ ] **26.** Permitir a inserção de múltiplos arquivos uma única vez.

- [ ] **27.** Permitir a assinatura digital de anexos de um documento.

- [ ] **28.** Permitir o download de um documento.

- [ ] **29.** Permitir a inclusão de um fluxo de trabalho nos documentos.

- [ ] **30.** Permitir a visualização dos documentos em forma de grade ou lista.

- [ ] **31.** Permitir o envio de documentos em lote para assinaturas.

- [ ] **32.** Permitir a adição de nova versão aos anexos.

- [ ] **33.** Permitir o compartilhamento externo de documentos e pastas criando um link de compartilhamento

- [ ] **34.** Permitir o acompanhamento do andamento das assinaturas realizadas pelos assinantes associados à um
      documento.

- [ ] **35.** Permitir filtrar por período, tipo, todos e status.

- [ ] **36.** Permitir a consulta dos documentos assinados pelo nome do documento, solicitante, assinante e natureza.

- [ ] **37.** Permitir o cancelamento de documentos pelo remetente antes de iniciar o processo de assinatura.

- [ ] **38.** Permitir a visualização de documentos assinados apenas por pessoas autorizadas.

- [ ] **39.** Permitir a visualização dos assinantes que já assinaram e os que necessitam assinar o documento.

- [ ] **40.** Permitir que um documento seja classificado como público ou privado.

- [ ] **41.** Permitir a adição da data limite nos documentos a serem enviados para assinatura.

- [ ] **42.** Permitir que usuários externos participem do processo de assinatura.

- [ ] **43.** Permitir a notificação via e-mail e whatsapp dos usuários envolvidos no processo de assinatura.

- [ ] **44.** Permitir a visualização das pendências cadastradas ao inserir/editar um documento.

- [ ] **45.** Permitir a aprovação ou recusa no fluxo atribuído ao usuário.

- [ ] **46.** Permitir a visualização dos documentos e pastas que foram excluídos.

- [ ] **47.** Permitir a restauração dos documentos e pastas.

- [ ] **48.** Permitir a criação de novos dados adicionais.

- [ ] **49.** Permitir a visualização dos dados adicionais criados.

- [ ] **50.** Permitir a edição e exclusão de um dado adicional.

- [ ] **51.** Permitir o gerenciamento dos fluxos de trabalho.

- [ ] **52.** Permitir a criação do fluxo de trabalho, de criação e exclusão de seção e de edição e exclusão de um
      fluxo.

- [ ] **53.** Permitir habilitar ou desabilitar um fluxo.

- [ ] **54.** Permitir integrações com documentos assinados.

- [ ] **55.** Permitir que a qualificação dos documentos seja automaticamente armazenadas em uma pasta previamente
      definida.

- [ ] **56.** Permitir selecionar pastas para armazenamento.

- [ ] **57.** Permitir a personalização de um caminho podendo utilizar variáveis advindas dos sistemas.

- [ ] **58.** Permitir a personalização do nome do documento podendo utilizar variáveis advindas dos sistemas.

- [ ] **59.** Permitir integrações com relatórios executados

- [ ] **60.** Permitir a transferência de todos os documentos de um usuário para outro ou para ele mesmo.

- [ ] **61.** Permitir a visualização de todas as transferências realizadas.

- [ ] **62.** Permitir o armazenamento de certificados do tipo qualificados pelo ICP-Brasil.

- [ ] **63.** Permitir a visualização das solicitações enviadas e recebidas.

- [ ] **64.** Permitir a aprovação ou recusa de uma solicitação.

- [ ] **65.** Permitir vincular e desvincular entidades.

- [ ] **66.** Permitir a assinatura digital de documentos, utilizando e-CPF, certificado A3 ou e-CNPJ.

- [ ] **67.** Permitir o upload de diversos arquivos para o procedimento de assinaturas.

- [ ] **68.** Permitir acompanhar o andamento das assinaturas realizadas pelos assinantes associados a um documento.

- [ ] **69.** Possibilitar consultar histórico de documentos assinados.

- [ ] **70.** Permitir assinar documentos em massa.

- [ ] **71.** Permitir consultar documentos por período.

- [ ] **72.** Possibilitar realizar o download de documentos assinados.

- [ ] **73.** Permitir assinar lotes de documentos.

- [ ] **74.** Permitir gerenciar e compartilhar certificados das entidades.

- [ ] **75.** Permitir gerenciar certificados de usuários, possibilitando, selecionar um certificado no formato de
      arquivo e assinar os documentos diretamente pela ferramenta.

- [ ] **76.** Permitir assinar documentos com certificados no servidor.

- [ ] **77.** Permitir consultar documentos assinados pelo nome do documento, solicitante, assinante e natureza.

- [ ] **78.** Permitir assinar documentos diretamente nos sistemas de origem do documento.

- [ ] **79.** Permitir assinar documentos com múltiplas assinaturas.

- [ ] **80.** Possibilitar assinar documentos no formato PDF.

- [ ] **81.** Permitir a visualização de um documento em formato PDF, XML e TXT.

- [ ] **82.** Permitir gerar certificados digitais.

- [ ] **83.** Permitir formatar o texto de um documento: tamanho de fontes, cores, espaçamento, destaque para links,
      entre outros.

- [ ] **84.** Permitir a inclusão de usuários externos no procedimento de assinaturas.

- [ ] **85.** Permitir a identificação de todas as páginas de um documento assinado.

- [ ] **86.** Permitir a geração de página adicional contendo as informações de todo o processo de assinaturas, tais
      como: assinantes, data e hora e certificado.

- [ ] **87.** Permitir o armazenamento de certificados do tipo qualificados pelo ICP-Brasil.

- [ ] **88.** Permitir a assinatura de documentos com certificados físicos (A3) através do assinador local.

- [ ] **89.** Permitir que os usuários envolvidos no processo de assinaturas sejam notificados via e-mail.

- [ ] **90.** Permitir a recusa de documentos enviados para o procedimento de assinaturas.

- [ ] **91.** Permitir justificar o motivo de recusar um documento no procedimento de assinaturas.

- [ ] **92.** Permitir a recusa de documentos em lote no procedimento de assinaturas.

- [ ] **93.** Permitir que o remetente cancele um procedimento de assinaturas.

- [ ] **94.** Permitir a consulta externa de documentos assinados de forma privada ou pública/anônima por meio de URL
      ou QRCode.

- [ ] **95.** Permitir a impressão de um documento assinado.

- [ ] **96.** Permitir Upload de pastas do Windows Explorer em massa, e com seus respectivos arquivos inclusivos
      organizados por ordem alfabética.

- [ ] **97.** Permitir que cada usuário receba as notificações no ambiente de documentos de cada arquivo incluído,
      alterado ou excluído desde que o usuário faça parte do processo do compartilhamento e assinatura destes arquivos

- [ ] **98.** Permitir a gestão das notificações dos documentos envoltos no processo de assinaturas e controlar o
      status destes arquivos.

## Item 26 - Software de Fluxos e Processos Digitais

*Fonte: Anexo I, páginas 101-105/194.*

- [ ] **1.** Permitir a comunicação interna e externa, e ter as funcionalidades básicas dos dispositivos de e-mail,
      como caixa de entrada, caixa de saída, enviados e rascunhos.

- [ ] **2.** Permitir o acesso somente a pessoas previamente cadastradas, com usuário e senha.

- [ ] **3.** Permitir anexar documentos em uma tarefa para os formatos mais comuns de documentos.

- [ ] **4.** Permitir consultar a hierarquia de grupos de trabalhos.

- [ ] **5.** Permitir configurar hierarquias de grupos de trabalho para organização de acessos e controle de alçadas
      para tarefas pertinentes a grupos que possuem algum critério de afinidade organizacional (setores, equipes,
      estabelecimentos, entre outros).

- [ ] **6.** Possibilitar alternar entre grupos de trabalho ao qual um usuário participa sem sair do ambiente
      principal do sistema.

- [ ] **7.** Permitir controlar níveis de acessos por grupos de trabalho, com papéis para administrar ou operar
      tarefas em um grupo de trabalho onde administradores do grupo podem conceder acesso a outros usuários.

- [ ] **8.** Oferecer acessibilidade a todas as funcionalidades em dispositivos móveis.

- [ ] **9.** Permitir a adição de usuários que serão membros de um grupo ou subgrupo de trabalho.

- [ ] **10.** Permitir a inclusão e exclusão de um grupo ou subgrupo de trabalho.

- [ ] **11.** Permitir a visualização da lista de usuários membros de um grupo e subgrupo.

- [ ] **12.** Permitir a adição de mais de um administrador na entidade.

- [ ] **13.** Determinar que um prazo de conclusão seja obrigatório.

- [ ] **14.** Permitir que apenas o solicitante visualize as atualizações dos participantes.

- [ ] **15.** Permitir a inclusão e exclusão de um grupo ou subgrupo de trabalho.

- [ ] **16.** Permitir a personalização dos identificadores com prefixo, número e ano.

- [ ] **17.** Permitir o recebimento de notificações sempre que um participante interagir.

- [ ] **18.** Permitir que os participantes sejam notificados sempre que houver uma interação por parte do remetente.

- [ ] **19.** Permitir a adição de anexo na resposta.

- [ ] **20.** Permitir consultar a visualizações de uma tarefa por seus participantes.

- [ ] **21.** Permitir consultar as tarefas de um participante de um grupo de trabalho, em uma caixa de entrada.

- [ ] **22.** Permitir destacar as tarefas enviadas, encaminhadas e respondidas na caixa de entrada.

- [ ] **23.** Permitir consultar parte do conteúdo das tarefas sem ter que acessar cada tarefa.

- [ ] **24.** Possibilitar destacar as tarefas ao qual o participante confirmou leitura na caixa de entrada.

- [ ] **25.** Permitir arquivar e desarquivar tarefas.

- [ ] **26.** Permitir configurar determinado tipo de tarefa, de forma que possibilite impedir que tarefas do
      respectivo tipo contenham despachos.

- [ ] **27.** Permitir consultar confirmações de leitura realizadas pelos participantes de uma tarefa.

- [ ] **28.** Permitir consultar tarefas arquivadas bem como o desarquivamento da mesma.

- [ ] **29.** Permitir criar e personalizar tipos de tarefas, definindo regras para o fluxo de comunicação pertinente
      para cada tipo, como por exemplo: memorando, circular, comunicado, ofício, entre outros.

- [ ] **30.** Possibilitar consultar os grupos de trabalho participantes de uma tarefa.

- [ ] **31.** Permitir formatar o texto de uma tarefa: tamanho de fontes, cores, espaçamento, destaque para links,
      entre outros.

- [ ] **32.** Permitir configurar redação e envio de tarefas por usuários distintos.

- [ ] **33.** Permitir enviar tarefas para um ou mais grupos de trabalho ou para participantes específicos de um ou
      mais grupos de trabalho.

- [ ] **34.** Possibilitar configurar a privacidade para o envio e recebimento de tarefas, permitindo a visibilidade
      apenas entre o remetente e o destinatário.

- [ ] **35.** Permitir ocultar tarefas arquivadas das caixas de entrada.

- [ ] **36.** Permitir consultar tarefas em rascunho.

- [ ] **37.** Permitir armazenar tarefas que estão em edição em uma área de rascunhos, para que sejam enviadas
      posteriormente.

- [ ] **38.** Permitir consultar as tarefas enviadas.

- [ ] **39.** Permitir consultar, de forma cronológica, todas as atividades em uma tarefa.

- [ ] **40.** Permitir incluir novos participantes e grupos de trabalhos em uma tarefa.

- [ ] **41.** Permitir editar os trâmites em tarefas.

- [ ] **42.** Possibilitar bloquear todos os trâmites e edições em tarefas.

- [ ] **43.** Permitir consultar histórico das edições em trâmites em tarefas.

- [ ] **44.** Possibilitar notificar os participantes de uma tarefa quando há alguma atualização.

- [ ] **45.** Possibilitar bloquear os trâmites e edições individuais em tarefas.

- [ ] **46.** Permitir tramitar uma tarefa em nome de outro usuário, identificando o usuário que tramitou e o usuário
      que é representado no trâmite.

- [ ] **47.** Permitir a edição de tipos de tarefas.

- [ ] **48.** Determinar que apenas o remetente possa inserir novos participantes na tarefa enviada.

- [ ] **49.** Permitir a inserção do prazo de conclusão de uma tarefa.

- [ ] **50.** Permitir a conclusão de uma tarefa de forma automática ao atingir o prazo estimado.

- [ ] **51.** Permitir a criação de identificadores para cada tipo de tarefa

- [ ] **52.** Permitir agendar o envio de uma tarefa.

- [ ] **53.** Permitir a adição dos anexos no conteúdo da tarefa, bem como a redação de uma tarefa no modo redator.

- [ ] **54.** Permitir a visualização de todas as tarefas recebidas.

- [ ] **55.** Permitir a consulta pelo assunto e pelo identificador de uma tarefa.

- [ ] **56.** Permitir a marcação das tarefas como lidas e não lidas individualmente ou em lote.

- [ ] **57.** Permitir a visualização do tempo restante para conclusão de uma tarefa sem precisar acessá-la.

- [ ] **58.** Permitir a interação entre participantes de uma tarefa.

- [ ] **59.** Permitir a menção de um usuário em uma tarefa para que o mesmo seja notificado.

- [ ] **60.** Permitir a marcação de uma tarefa como lida e também como concluída.

- [ ] **61.** Permitir executar relatório do histórico da tarefa.

- [ ] **62.** Permitir a criação e edição visual de diagramas de processo no padrão BPMN 2.0.

- [ ] **63.** Permitir a execução do fluxo mapeado em um ambiente próprio com suporte as tarefas modeladas.

- [ ] **64.** Permite a configuração de eventos de início e fim de processo.

- [ ] **65.** Possibilitar a modelagem de gateway de decisão com base em variáveis do processo.

- [ ] **66.** Permitir a criação e automatização de tarefa de usuário, que necessita de ações do usuário para a sua
      conclusão.

- [ ] **67.** Permite configurar responsáveis pela execução das tarefas, bem como quais pessoas e grupos podem
      visualizar e executar cada tarefa individualmente.

- [ ] **68.** Permitir configurar a execução de um relatório com as variáveis do processo, anexando ao processo o
      documento PDF produzido.

- [ ] **69.** Possibilitar que o processo modelado possa executar rotinas customizadas externas ao processo, e
      utilizar a sua resposta na execução do processo.

- [ ] **70.** Possibilitar configurar um fluxo de assinatura para um documento do processo, definindo a lista e a
      ordem dos assinantes, sendo sequencial ou paralelo.

- [ ] **71.** Permitir a validação dos modelos para garantir que estejam sintaticamente corretos e prontos para
      execução.

- [ ] **72.** Permitir criar subprocessos que possar ser chamados ao longo de um processo inúmeras vezes, passando ao
      subprocesso informações para a execução individualizada a cada chamada.

- [ ] **73.** Possibilitar a criação de formulários de usuário customizados, validando dados de entrada em uma tarefa,
      sendo ela um evento de início de processo ou uma tarefa de usuário modeladas no processo.

- [ ] **74.** Possibilitar personalização dos formulários de usuário customizados com conjunto variado de componentes
      de entrada, incluindo campos específicos para texto (linha única e múltipla), valores numéricos, datas com
      seletores visuais, senhas e listas dinâmicas onde o próprio usuário pode gerenciar os itens.

- [ ] **75.** Possibilitar personalização dos formulários de usuário customizados com criação de campos de seleção que
      restrinjam a entrada do usuário a um conjunto de opções pré-definidas, utilizando componentes como menus
      suspensos (Select) e botões de rádio (Radio) para escolha única, ou listas de verificação (Checklist) e de tags
      (Taglist) para escolhas múltiplas.

- [ ] **76.** Possibilitar personalização dos formulários de usuário customizados com a organização visual e o
      enriquecimento do formulário com elementos não interativos, incluindo a inserção de texto informativo e imagens,
      a exibição de dados em tabelas, o agrupamento lógico de campos e o uso de separadores, espaçadores e botões de
      ação.

- [ ] **77.** Possibilitar que os formulários sejam configurados com opções de seleção de dados já cadastrados em
      outros módulos do sistema.

- [ ] **78.** Possibilitar que campos sejam pré-preenchidos com as variáveis do contexto da execução de um processo.

- [ ] **79.** Possibilitar listar as instâncias de cada processo já executadas.

- [ ] **80.** Permitir a visualização e monitorar em tempo real de todas as instâncias de processos em execução.

- [ ] **81.** Permitir a inspeção detalhada de uma única instância de processo, incluindo seu histórico de execução,
      tarefas concluídas e variáveis.

- [ ] **82.** Possibilitar o detalhamento de cada etapa no processo, incluindo as tarefas relacionadas, seus
      formulários, informações imputadas, variáveis recebidas como entrada e variáveis utilizadas como saída para o
      processo.

- [ ] **83.** Permitir a iniciação de novas instâncias de processo a partir de uma lista de processos disponíveis para
      o usuário, com base em processo desenhado com a notação BPMN.

- [ ] **84.** Permitir a visualização de uma lista processos/solicitações criadas pelo usuário.

- [ ] **85.** Permitir a visualização de uma lista processos/solicitações a qual o usuário ou seus grupos fazem parte.

- [ ] **86.** Permitir a visualização os detalhes de um processo/solicitação, com suas tarefas/etapas, informações e
      documentos gerados.

- [ ] **87.** Permitir gerar um documento único contendo todos os documentos do processo

- [ ] **88.** Permitir a visualização de uma lista de tarefas atribuídas diretamente ao usuário ou aos grupos dos
      quais ele faz parte.

- [ ] **89.** Permite visualizar os detalhes de uma tarefa

- [ ] **90.** Permitir atribuir a um responsável para execução diretamente ao usuário ou aos grupos dos quais ele faz
      parte.

- [ ] **91.** Possibilitar o preenchimento de formulários customizados e a manipulação de variáveis necessárias para a
      conclusão da tarefa.

- [ ] **92.** Possibilitar o usuário concluir uma tarefa quando todas as informações foram imputadas.

- [ ] **93.** Permitir a conclusão de tarefas, acionando o avanço do processo para a próxima etapa.

- [ ] **94.** Permitir que um processo gere arquivos nos formatos HTML, XLS, DOC, ODT, TXT, CSV, XML, JSON, PDF e
      anexe os arquivos no processo

- [ ] **95.** Permitir que um processo emita um relatório e anexe ele ao processo

- [ ] **96.** Permitir que um processo importe um arquivo em qualquer formato ao processo via web service rest e SOAP

- [ ] **97.** Permitir que um processo realize comunicações com serviços externos usando os principais verbos HTTP
      (GET, POST, PUT, DELETE) podendo configurar HEADERS, parâmetros de URL e o corpo da requisição, suportando o
      envio de arquivos textuais e binários

- [ ] **98.** Permitir que um processo envie um email

- [ ] **99.** Permitir que um processo notifique um ou mais usuários

- [ ] **100.** Permitir que um processo carregue em formulários dados de qualquer módulo do ERP

- [ ] **101.** Permitir que um processo carregue em formulários dados capturados em APIs rest e SOAP

- [ ] **102.** Permitir que um processo carregue em formulários dados capturados em arquivos nos formatos HTML, XLS,
      DOC, ODT, TXT, CSV, XML, JSON, PDF

- [ ] **103.** Permitir que um processo carregue em formulários dados capturados do resultado de um prompt de uma IA
      generativa

- [ ] **104.** Permitir que um processo tome decisões e faça desvios de fluxo com base em dados dos módulos do ERP

- [ ] **105.** Permitir que um processo tome decisões e faça desvios de fluxo com base em dados capturados em arquivos
      nos formatos HTML, TXT, CSV, XML, JSON

- [ ] **106.** Permitir que um processo tome decisões e faça desvios de fluxo com base em dados capturados em APIs
      rest e SOAP

- [ ] **107.** Permitir que um processo tome decisões e faça desvios de fluxo com base em dados capturados do
      resultado de um prompt de uma IA generativa.

## Item 27 - Serviço mensal de Atendimento via WhatsApp - CHATBOT

*Fonte: Anexo I, páginas 105-115/194.*

> **Nota literal do edital:** a numeração salta do requisito 3 para o requisito 5. Não existe requisito 4 no texto do Anexo I.

- [ ] **1.** A ferramenta deve possuir sincronização com WhatsApp ou WhatsApp Business, realizando dessa forma
      integração para recebimento e envio minimamente de: Mensagens de texto. Arquivos de mídia visual. Arquivos de
      mídia sonoro. Arquivos de texto e outros.

- [ ] **2.** Permitir acesso à aplicação através de endereço web único definido pela entidade.

- [ ] **3.** Permitir uso da API oficial META.

- [ ] **5.** Possuir página de acesso que contenha: Área de preenchimento de nome de usuário e senha que possibilite
      acesso ao sistema. Possibilitar recuperação de senha de usuário. Possibilitar a criação de contas de acesso de
      usuários.

- [ ] **6.** Possuir dashboard nativo do ambiente da ferramenta que permita realizar acompanhamento e monitoramento.

- [ ] **7.** Deve conter indicador do nome do usuário conectado à ferramenta.

- [ ] **8.** Na tela de usuário, deve permitir editar as informações daquele usuário, como: Foto de perfil. Nome de
      usuário. E-mail de acesso. Senha de usuário.

- [ ] **9.** A ferramenta deve possuir menu de opções selecionáveis, capaz de direcionar o atendimento do usuário
      conforme fluxos definidos pelo administrador da ferramenta.

- [ ] **10.** Deve ser possível definir as opções selecionáveis do menu interativo e editar seus textos e fluxos de
      submenus.

- [ ] **11.** A ferramenta deve possibilitar que um, ou vários atendentes sejam capazes de realizar atendimentos
      simultâneos através de um único número de WhatsApp.

- [ ] **12.** A ferramenta deve possibilitar a configuração de um, ou vários setores, que por sua vez possam estar
      vinculados aos atendentes cadastrados na ferramenta, para setorização dos atendimentos.

- [ ] **13.** A ferramenta deve possibilitar a geração de código de protocolo único de atendimento, para
      acompanhamento de identificação futura. Painel de Monitoramento

- [ ] **14.** O “Painel de Monitoramento” denominado também dashboard, deve estar contido nativamente no sistema, não
      devendo ser utilizado outro software e/ou meios de monitoramento para o acompanhamento.

- [ ] **15.** Deve ser possível realizar alteração de “Data Inicial” e “Data Final” que possibilite definir o período
      que será avaliado pelos gráficos informativos do dashboard.

- [ ] **16.** O “Painel de Monitoramento” deve conter informação que indique a quantidade total de interações no
      período.

- [ ] **17.** O “Painel de Monitoramento” deve conter informação que indique a quantidade total de atendimentos no
      período.

- [ ] **18.** O “Painel de Monitoramento” deve conter informação que indique a quantidade de atendimentos abertos no
      período.

- [ ] **19.** O “Painel de Monitoramento” deve conter informações a respeito do “Consumo Externo de API.

- [ ] **20.** O “Painel de Monitoramento” deve conter informações a respeito dos “Serviços Automáticos”.

- [ ] **21.** O “Painel de Monitoramento” deve conter informações a respeito do “Sucesso no Atendimento”.

- [ ] **22.** O “Painel de Monitoramento” deve conter gráfico que indique a quantidade total de atendimentos no
      período, distintos por cores, para identificação daqueles atendimentos que foram realizados, dos que permanecem
      em aberto e dos que foram fechados.

- [ ] **23.** O “Painel de Monitoramento” deve conter gráfico que indique a quantidade total de atendimentos por setor
      no período, distintos por cores, para identificação daqueles atendimentos que foram realizados, dos que
      permanecem em aberto e dos que foram fechados.

- [ ] **24.** O “Painel de Monitoramento” deve conter lista que indique a quantidade total de atendimentos por usuário
      no período, distintos por nome de usuário, total de atendimentos de cada usuário, quantidade de atendimentos que
      permanecem abertos de cada usuário e quantidade de atendimentos que foram fechados por cada usuário.

- [ ] **25.** O “Painel de Monitoramento” de conter lista que informe a quantidade total de atendimentos por setor no
      período, distintos por nome dos setores, total de atendimentos de cada setor, quantidade de atendimentos que
      permanecem abertos de cada setor e quantidade de atendimentos que foram fechados por cada setor.

- [ ] **26.** O “Painel de Monitoramento” deve possibilitar a alteração de “Data Inicial” e “Data Final” para buscar
      dados informativos que compõem os gráficos e listas do “Painel de Monitoramento”.

- [ ] **27.** O “Painel de Monitoramento” deve conter informação do “Total de Interações Período”, que informe o
      número total de mensagens trocadas no período.

- [ ] **28.** Gráfico de “Total Atendimentos Período”, que informa o número total de atendimentos realizados no
      período nas datas informadas no item 7 “Data Inicial” e “Data Final”.

- [ ] **29.** O “Painel de Monitoramento” deve conter janela de “Perguntas”, que liste as respostas dadas para as
      perguntas de “Pesquisa de Satisfação” configuradas na ferramenta.

- [ ] **30.** A ferramenta deve possibilitar que seja possível identificar àqueles que participaram da “Pesquisa de
      Satisfação”, informando: Nome do indivíduo que realizou a “Pesquisa de Satisfação”. Respostas dadas pelo
      indivíduo em cada pergunta da “Pesquisa de Satisfação”. Número de Telefone do indivíduo que realizou a “Pesquisa
      de Satisfação”. Foto do indivíduo que realizou a “Pesquisa de Satisfação. Janela de Conversas

- [ ] **31.** Na “Janela de Conversas” a ferramenta deve ser capaz de receber e enviar mensagens através de um
      processo de sincronização com o aplicativo WhatsApp.

- [ ] **32.** Na “Janela de Conversas” a ferramenta deve ser capaz de filtrar as conversas entre. Mensagens novas.
      Conversas novas. Conversas antigas.

- [ ] **33.** Na “Janela de Conversas” a ferramenta deve ser capaz de receber e enviar arquivos de imagem, vídeos,
      emojis e anexos em geral. Respeitando o limite de tamanho de arquivo definidos pela próprio WhatsApp.

- [ ] **34.** Na “Janela de Conversas” deve haver a possibilidade de escutar um áudio gravado, antes de ser enviado.

- [ ] **35.** Na “Janela de Conversas” a ferramenta deve possibilitar a configuração e o envio de mensagens
      pré-definidas, sendo agrupadas minimamente por categorias: Usuários Setores Empresa

- [ ] **36.** A ferramenta deve ser capaz de carregar mensagens anteriores dentro da conversa sem a necessidade de
      acessar o histórico.

- [ ] **37.** A ferramenta deve ser capaz de apagar mensagens enviadas para o cliente, mas sem deletá-la da
      ferramenta.

- [ ] **38.** A ferramenta deve possuir sistema de “Notificação” sonoro e visual que indiquem o recebimento de novas
      mensagens para os agentes de atendimento.

- [ ] **39.** A ferramenta deve permitir que seja feita a “Atualização” das mensagens enviadas e recebidas pela
      ferramenta de forma nativa, sem que seja necessário a atualização da janela do navegador de internet.

- [ ] **40.** Deve ser possível ativar e desativar os sons de “Notificações”, impedindo que o usuário conectado receba
      alertas sonoros de conversas que estejam aguardando atendimento.

- [ ] **41.** A ferramenta deve conter “Lista de Contatos”, que informe minimamente: Nome do contato. Telefone do
      contato.

- [ ] **42.** A ferramenta deve possibilitar o início de “Nova Conversa” de forma nativa, com números de WhatsApp que
      já tenham sido adicionados ou aqueles que ainda não está na “Lista de Contatos” da ferramenta, sem que seja
      necessário a utilização de outro software ou aplicativo.

- [ ] **43.** A ferramenta deve possibilitar funcionalidade de pausa de atendimento em andamento, interrompendo dessa
      forma eventuais notificações de falta de atendimento, informando minimamente: A data prevista de retorno do
      atendimento. A hora prevista de retorno do atendimento.

- [ ] **44.** Deve ser possível “Notificar” o indivíduo que está sendo atendido sobre a situação de “Pausa” do seu
      atendimento, informando minimamente: A data prevista de retorno do atendimento. A hora prevista de retorno do
      atendimento. Nome do agente de atendimento que realizou a “Pausa”.

- [ ] **45.** Na “Janela de Conversas” deve estar visível uma lista que informe os atendimentos que estão em
      andamento, contendo minimamente: Foto do indivíduo sendo atendido. Nome do contato. Setor no qual o atendimento
      está sendo realizado. Situação do atendimento, “Pausado” ou “Em Atendimento”. Quem está atendendo o indivíduo.

- [ ] **46.** Na “Janela de Conversas” deve ser possível identificar a quantidade de mensagens não respondidas de cada
      indivíduo que está em atendimento, ou em pausa.

- [ ] **47.** A ferramenta deve possibilitar o ampliamento da foto de cada indivíduo recebendo atendimento, para
      melhor identificação visual do agente de atendimento.

- [ ] **48.** Na “Janela de Conversas” deve ser possível a identificação visual da situação das mensagens trocadas,
      informando minimamente: Se foram enviadas. Se foram recebidas. Se foram lidas

- [ ] **49.** Deve ser possível identificação de envio de cada mensagem, informando minimamente: Nome do remetente.
      Dia do envio da mensagem. Horário de envio da mensagem.

- [ ] **50.** A ferramenta deve permitir a adição/edição de “Marcadores” nos indivíduos.

- [ ] **51.** A ferramenta deve possibilitar “Pesquisar Mensagens”, buscando nas “Janelas de Conversas” ativas ou em
      pausa, por palavras ou conjunto de caracteres.

- [ ] **52.** Deve ser possível transferir conversa para quaisquer setores configurados na ferramenta.

- [ ] **53.** Deve ser possível “Notificar” o indivíduo que está sendo atendido sobre a transferência do seu
      atendimento, informando minimamente: O novo setor que realizará o atendimento.

- [ ] **54.** A ferramenta deve possibilitar que as conversas transferidas sejam transferidas por completo, com todas
      as mensagens trocadas do início até o momento da transferência para o novo setor.

- [ ] **55.** Na Janela de Conversas deve ser possível editar o cadastro de uma pessoa, alterando minimamente os
      dados: Nome do cadastro da pessoa. CPF do cadastro da pessoa. CNPJ do cadastro da pessoa. E-mail do cadastro da
      pessoa.

- [ ] **56.** A ferramenta deve possibilitar a validação de contatos de telefones externos, exibindo na tela de
      atendimento, sempre que iniciado uma nova conversa e de maneira visual, se este contato já possuí cadastro
      validado em um sistema ou base de dados externa à ferramenta de atendimento.

- [ ] **57.** Na “Janela de Conversas” deve ser possível consultar o “Histórico da Conversas” atual, ou conversas de
      outros períodos.

- [ ] **58.** O “Histórico de Conversa” deve permitir consultar conversas de vários setores, agentes de atendimento e
      demais parâmetros de filtro.

- [ ] **59.** Na “Janela de Conversas” deve ser possível encerrar um atendimento.

- [ ] **60.** A ferramenta deve ser capaz de gerar código de “Protocolo de Atendimento” único, que seja capaz de
      identificar atendimentos em específico.

- [ ] **61.** Deve ser possível “Notificar” o indivíduo que recebeu atendimento sobre o encerramento de seu
      atendimento, informando minimamente: “Protocolo de Atendimento”. Nome do agente de atendimento que encerrou a
      conversa. “Pesquisa de Satisfação”. “Sucesso no atendimento”, caso a funcionalidade esteja ativada no setor do
      atendimento finalizado. Janela de Administração Lista de Usuários

- [ ] **62.** A ferramenta deve possuir “Lista de Usuários” que permita acessar e gerenciar minimamente: Nome de
      usuário. E-mail do usuário. Permissão de administrador. Foto de identificação do usuário. Adicionar um setor.
      Ativar ou desativar um setor adicionado. Criar um novo usuário.

- [ ] **63.** Na “Lista de Usuários” deve ser possível buscar por usuários através de pesquisa por nome.

- [ ] **64.** Na “Lista de Usuários” deve ser possível ativar e/ou desativar um setor vinculado a um usuário,
      informando minimamente: Se o setor adicionado está ativo ou desativo para cada usuário. Nome do setor
      adicionado. Data de criação do vínculo entre usuário e setor.

- [ ] **65.** Na “Lista de Usuários” deve ser possível alterar a quantidade de linhas de nomes de usuários por página
      exibida.

- [ ] **66.** A ferramenta deve conter filtro de usuário, contendo: Todos. Ativos. Inativos. Setores

- [ ] **67.** A ferramenta deve possuir “Lista de Setores” que permita acessar e gerenciar minimamente: Nome do Setor.
      E-mail do Setor. Usuários vinculados a cada setor. “Notificações” configuradas em cada setor. “Horários” de
      funcionamento de cada setor. Ativar ou desativar um setor. Ativar ou desativar a funcionalidade de “Siga-me”.
      Definir se o setor precisa do “Sucesso do Atendimento”. Definir mensagem padrão de “Mensagem Fora do
      Expediente”. Definir número de WhatsApp para funcionalidade de “Siga-me”. Definir instruções para Inteligência
      Artificial.

- [ ] **68.** A ferramenta deve disponibilizar funcionalidade que possibilite que agentes de atendimento de um setor,
      consigam visualizar os atendimentos de outro setor, mesmo que eles não tenham permissão para atendê-los.
      Notificações para Gestores – Atendimentos em Espera

- [ ] **69.** A ferramenta deve possuir funcionalidade que seja capaz de enviar mensagens automáticas após um período
      de tempo ajustável para um telefone WhatsApp pré-determinado com informações de conversas que estão aguardando
      atendimento, contendo minimamente: Nome do indivíduo que está esperando atendimento. Nome do “Setor” no qual o
      indivíduo está em atendimento. A quanto tempo o indivíduo está aguardando atendimento. As 5 últimas mensagens
      enviadas e recebidas naquele atendimento.

- [ ] **70.** O sistema de “Notificações” deve possibilitar configuração de mais de um número de WhatsApp para o
      recebimento das “Notificações”, podendo conter tempo ajustável diferenciado para cada WhatsApp configurado,
      dessa forma, os notificando de acordo com os seus tempos determinados individualmente. Horários de Funcionamento

- [ ] **71.** Na “Lista de Setores” deve ser possível configurar o horário de funcionamento de cada setor, informando
      minimamente: Dias da semana de funcionamento. Hora inicial e hora final de cada dia. Horário ativado ou
      desativado pré-definido. Adicionar novo “Horário de Funcionamento”. Funcionalidade Siga-me

- [ ] **72.** A ferramenta deve possibilitar que os atendimentos encaminhados para um ou mais setores possam ser
      direcionados para um outro número WhatsApp ativo, que seja diferente do que esteja sincronizado com a plataforma
      possibilitando que esse atendimento seja realizado por um celular externo, sendo acompanhado e monitorado pela
      ferramenta, mantendo minimamente as seguintes informações: Histórico de atendimento. A funcionalidade deverá
      permitir o cadastro por parte do administrador da ferramenta de pelo menos 10 novos números para a função
      “Siga-me”, permitindo assim que 10 atendentes possam realizar o atendimento das solicitações através desses
      números de WhatsApp. A qualquer momento, os números da funcionalidade “Siga-me” podem ser modificados pelo
      administrador da ferramenta.

- [ ] **73.** O indivíduo que receberá atendimento através da funcionalidade “Siga-me” deverá visualizar apenas o
      número de telefone sincronizado na ferramenta, mantendo dessa forma o número de WhatsApp configurado na
      funcionalidade em sigilo.

- [ ] **74.** O “Siga-me” deve funcionar sem que seja necessário sincronização do número que receberá os atendimentos
      encaminhados pela plataforma. Inteligência Artificial

- [ ] **75.** A ferramenta deve disponibilizar integração com inteligência artificial, podendo minimamente: Permitir a
      criação de instruções para que a IA realize uma determinada tarefa. Campo para configuração de token. Campo para
      configuração de Organização. Campo para configuração de responsável. Histórico de Conversas

- [ ] **76.** A ferramenta deve disponibilizar acesso a um “Histórico de Conversas” que contenha minimamente: Nome da
      pessoa que recebeu atendimento. Telefone da pessoa que recebeu atendimento. Setor no qual a pessoa recebeu
      atendimento. Status do atendimento. Data de criação do atendimento, contendo dia e hora. Data de alteração ou
      conclusão dos atendimentos, contendo dia e hora. Resultado da pesquisa de satisfação do atendimento.

- [ ] **77.** No “Histórico de Conversas” deve ser possível filtrar o conteúdo do histórico minimamente por: Nome de
      usuário. Status do atendimento. Setor do atendimento realizado. Código de protocolo gerado. Data, contendo dia e
      hora. Ordem crescente ou decrescente.

- [ ] **78.** No “Histórico de Conversas” possibilitar encontrar atendimentos através de busca de termos completos e
      incompletos.

- [ ] **79.** No “Histórico de Conversas” possibilitar que atendimentos sejam exportados para o ambiente externo da
      ferramenta em formato de arquivos que possibilite a leitura dos mesmos.

- [ ] **80.** O arquivo externo gerado deve conter minimamente as seguintes informações: Nome do atendente que
      realizou atendimento. Nome da pessoa que recebeu atendimento. Telefone da pessoa que recebeu atendimento. Data
      do início do atendimento. Data da geração do arquivo. Autor de cada mensagem enviada e recebida. Conteúdo de
      cada mensagem enviada e recebida. Dia e hora de cada mensagem enviada e recebida. Menus

- [ ] **81.** A ferramenta deve possuir lista dos menus configurados, contendo minimamente: Texto de cada opção do
      menu. Qual é a chave de escolha de cada opção do menu para o usuário. A ordem de cada opção. Possibilitar a
      exclusão de opções do menu. Possibilitar ativar ou desativar opções de menu.

- [ ] **82.** Na janela de “Menus” deve ser possível criar novas opções de menu, contendo minimamente as informações:
      Se é um menu ativo ou não. Qual o texto da opção do menu. Enviar um texto personalizado. Em qual ordem estará a
      opção do menu. Qual será a chave de escolha da opção do menu. Qual será a ação que aquela opção do menu irá
      realizar. Qual é o status daquela opção do menu. Se quer realizar solicitação de contato.

- [ ] **83.** Na janela de “Menus” deve ser possível alterar a quantidade de linhas exibidas de opções de menus por
      página. Na janela de “Menus”, deve ser possível criar filas sequenciais de atendimento, ou seja, se houverem dez
      atendentes e dez clientes, cada atendente atenderá um cliente. Perguntas

- [ ] **84.** A ferramenta deve possuir funcionalidade de perguntas que podem servir como pesquisa de satisfação, ou
      outra forma de obtenção de informações na finalização de cada atendimento.

- [ ] **85.** Na aba de “Perguntas” deve ser possível acessar e editar as perguntas já configuradas na ferramenta.
      Essa lista deve conter minimamente: A situação da pergunta, Ativa ou Inativa. A ordem que pergunta será exibida
      para o indivíduo. O texto de descrição, que será exibido para o indivíduo. O texto alternativo, caso o indivíduo
      selecione uma opção inválida. O tipo de validação da pergunta.

- [ ] **86.** A ferramenta deve possibilitar que as perguntas tenham tipos de validação diferentes, sendo elas
      minimamente: Opções com botões. Texto. Opções fixas.

- [ ] **87.** Na janela de Perguntas, deve ser possível adicionar novas perguntas, contendo minimamente as
      informações: A situação da pergunta, Ativa ou Inativa. A ordem que pergunta será exibida para o indivíduo. O
      texto de descrição, que será exibido para o indivíduo. O texto alternativo, caso o indivíduo selecione uma opção
      inválida. O tipo de validação da pergunta.

- [ ] **88.** Na janela de “Perguntas” deve ser possível alterar a quantidade de linhas exibidas de opções de
      Perguntas por página. Datas

- [ ] **89.** A ferramenta deve possuir funcionalidade de “Datas”, que irá enviar mensagens automáticas para os
      indivíduos que interagirem com a ferramenta em datas pré-programas.

- [ ] **90.** Na janela de “Datas” deve ser possível acessar e editar as informações das datas programadas: Situação
      de ativo ou inativo da data programada. O dia da “Data”. Texto de “Descrição” da data programada. Texto da
      “Mensagem” que será enviada na data programada.

- [ ] **91.** Na janela de “Data”, deve ser possível adicionar novas datas, contendo minimamente as informações:
      Situação de ativo ou inativo da data programada. O dia da “Data Feriado”. Texto de “Descrição” da data
      programada. Texto da “Mensagem” que será enviada na data programada. Calendário

- [ ] **92.** A ferramenta deve possuir funcionalidade de calendário nativa, que possua minimamente as seguintes
      informações: Nome do mês corrente. Os dias do mês e suas respectivas datas já programadas na ferramenta.
      Possibilitar avançar e regredir para datas diversas. Grupos

- [ ] **93.** A ferramenta deve possibilitar que dois grupos de pessoas distintas possam ser conectados entre si e
      troquem mensagens de forma que cada grupo só saiba os números de telefone das pessoas que integram o seu próprio
      grupo.

- [ ] **94.** Na janela de Grupos deve ser possível buscar por grupos através de campo de pesquisa de termos.

- [ ] **95.** Na janela de Grupos, devem ser exibidas e possibilitar a edição das seguintes informações: Nome dos
      Grupos. Nome dos integrantes de cada grupo. Tipo do grupo, Externo ou Interno. Integrantes de cada grupo.

- [ ] **96.** A ferramenta deve possibilitar que novos integrantes sejam adicionados a grupos já criados ou a novos
      grupos.

- [ ] **97.** Na janela de Grupos deve ser possível excluir integrantes já adicionados em algum grupo.

- [ ] **98.** A ferramenta deve possibilitar a criação de novos grupos e novas conexões entre os grupos previamente
      criados. Botão de Sincronização

- [ ] **99.** A ferramenta deve possibilitar que seja gerado QRCode nativamente para possibilitar a sincronização de
      um aparelho com o WhatsApp Business, sem que seja necessário a utilização de um outro software ou aplicativo
      alternativo. O número que será sincronizado não deverá estar sincronizado em nenhuma outra ferramenta de mesma
      natureza. Consultas Automáticas e Integradas

- [ ] **100.** A ferramenta, através de opção do menu de atendimento, deve possibilitar que sejam realizadas consultas
      de débitos/dívidas de forma automática, através de fonte e/ou banco de dados fornecido pela contratante, sem a
      necessidade de um atendimento humanizado.

- [ ] **101.** A ferramenta, através de opção do menu de atendimento, deve possibilitar geração de chave PIX de forma
      automatizada, associado a um débito ou dívida que através de fonte e/ou banco de dados fornecido pela
      contratante, deverá conter minimamente: Nome do devedor. Parte do CPF do devedor. Código QR do PIX
      Funcionalidade de “Copiar” o Código QR. Valor do débito/dívida associado aquela chave PIX.

- [ ] **102.** A ferramenta, através de opção do menu de atendimento, deve possibilitar a geração da Certidão Negativa
      de Débitos de forma automatizada, através de fonte e/ou banco de dados fornecido pela contratante, sem a
      necessidade de um atendimento humanizado.

- [ ] **103.** A ferramenta, através de opção do menu de atendimento, deve possibilitar a geração automática de
      contracheque da competência atual, ou anterior, através de fonte e/ou banco de dados fornecido pela contratante,
      sem a necessidade de atendimento humanizado, disponibilizando minimamente: Dados da consulta em forma de texto
      nativo do WhatsApp. Arquivo de Holerite em formato .PDF

- [ ] **104.** A ferramenta, através de opção do menu de atendimento, deve possibilitar a consulta de empenhos forma
      automatizada, através de fonte e/ou banco de dados fornecido pela contratante, sem a necessidade de um
      atendimento humanizado, oferecendo minimamente: Consultar detalhes de empenho específico. Listar empenhos do ano
      corrente. Listar empenhos de outro ano. Reconhecimento de Texto e Caracteres

- [ ] **105.** A ferramenta deve possibilitar o reconhecimento e a transcrição de textos e caracteres através de fotos
      e imagens enviadas pelo usuário. Gestão de Atendentes

- [ ] **106.** A ferramenta deve possibilitar ao usuário administrador: Visualizar todos os atendentes cadastrados na
      ferramenta. Visualizar apenas os atendentes ativos na ferramenta. Visualizar apenas os atendentes em pausa na
      ferramenta. Visualizar apenas os atendentes inativos na ferramenta.

- [ ] **107.** A ferramenta deve possibilitar visualizar o tempo total online de cada atendente, assim como o tempo
      total utilizado em pausas.

- [ ] **108.** A ferramenta deve possuir um histórico de movimentações de cada atendente, que contenha minimamente:
      Hora de Início da sessão. Hora de Fim da sessão. Quantidade de pausas realizadas. Hora de Início de pausa. Hora
      de Fim de pausa. Tempo Total de cada pausa realizada.

- [ ] **109.** A ferramenta deve disponibilizar o limite de usuários contratos, separando entre: Usuários contratados.
      Usuários totais cadastrados na ferramenta. Usuários Administradores cadastrados na ferramenta. Pausa de
      Atendentes

- [ ] **110.** A ferramenta deve possuir funcionalidade de pausa para os atendentes, informando minimamente: Motivo da
      Pausa Hora de início da pausa. Encerramento de pausa.

- [ ] **111.** A ferramenta deve possibilitar que a entidade cadastre através do usuário administrador motivos de
      pausa disponíveis e possibilite ativar e desativar os motivos cadastrados. Mensagens Automáticas de Início de
      Atendimento e Transferência

- [ ] **112.** A ferramenta deve possibilitar ao usuário administrador visualizar e alterar a saudação inicial do
      atendimento automatizado.

- [ ] **113.** A ferramenta deve possibilitar ao usuário administrador visualizar e alterar a mensagem automática de
      início de atendimento por um atendente humano, contendo minimamente: O nome do atendente. O nome do setor do
      atendimento.

- [ ] **114.** A ferramenta deve possibilitar ao usuário administrador visualizar e alterar a mensagem de início de
      atendimento após transferência para um novo setor, contendo minimamente: O nome do atendente. O nome do novo
      setor de atendimento. Marcadores

- [ ] **115.** A ferramenta deve possibilitar o sistema de marcadores, com a finalidade de identificar e direcionar
      atendimentos, contendo minimamente: Descrição do Marcador. O nome do atendente responsável pelo marcador.
      Definir uma “Ação” ao marcador. Definir a partir de qual Menu uma possível Ação iniciará. Gatilhos

- [ ] **116.** A ferramenta deve possuir funcionalidade que permita a configuração de “palavras gatilhos” capazes de
      realizar ações automáticas quando a “palavra gatilho” for ativada, podendo minimamente: Adicionar um marcador
      automaticamente. Iniciar uma conversa em um setor específico. Agendamento

- [ ] **117.** A ferramenta deve possuir funcionalidade que permita a realização de agendamentos de horários
      diretamente pelo WhatsApp, podendo ou não possuir integração com agendas externas, podendo minimamente:
      Cadastrar profissionais na plataforma. Cadastrar menus personalizáveis. Integrar com Google Agenda. Permitir a
      escolha de dias para agendamento. Permitir a escolha de horários para agendamento. Permitir a escolha de
      profissionais para agendamento. Permitir que o profissional faça modificações no agendamento. Permitir que o
      profissional recuse o agendamento. Permitir que o profissional cancele o agendamento. Campanhas

- [ ] **118.** A ferramenta deve possuir funcionalidade que permita o envio em massa de mensagens, podendo
      minimamente: Permitir a criação de mensagens contendo texto e imagem. Permitir acompanhamento do progresso do
      envio das mensagens. Sucesso do Atendimento

- [ ] **119.** A ferramenta deve possuir funcionalidade que possibilite indicar se um atendimento finalizado obteve
      sucesso em sua tratativa ou não, permitindo minimamente: Opção selecionável informando o sucesso do atendimento.
      Opção selecionável informando o não sucesso do atendimento. Caixa de diálogo para informações adicionais
      pertinentes ao atendimento. Inteligência Artificial

- [ ] **120.** A ferramenta é capaz, através de instruções em prompt, de realizar tarefas diversas, como: esclarecer
      dúvidas, recolher informações, criar simulações de crédito, realizar cálculos, realizar questionários, consultar
      bases de conhecimento definidos em prompt, realizar atendimento prévio para triagem de clientes, realizar
      tarefas específicas definidos pelo próprio usuário sem a necessidade de código, reconhecer mensagens recebidas
      do por áudio, interagir com o interlocutor como se fosse um humano, definir parâmetros de comportamento e escopo
      de interação, realizar validações de dados. Também pode enviar informações coletadas para outros sistemas via
      API. Ademais também é possível ter um prompt diferente para cada setor, podendo minimamente: Registrar tokens de
      diversas IA’s externas. Definir um usuário responsável. Definir um registro da organização da IA. Definir as
      instruções de comportamento e ação da IA. Ativar e desativar a IA.

## Item 28 - Software de Contracheque On-line

*Fonte: Anexo I, páginas 115-117/194.*

- [ ] **1.** Dispor de um portal de acesso exclusivo ao servidor público.

- [ ] **2.** Permitir que o servidor público via internet, tenha acesso às suas informações cadastrais.

- [ ] **3.** Possibilitar que o servidor público via internet, por meio de sua matrícula e entidade possa efetuar
      solicitações de cursos de aperfeiçoamento, graduações, palestras, seminários, treinamentos e workshop.

- [ ] **4.** Possibilitar que o servidor público via internet, por meio de sua matrícula e entidade, possa consultar e
      emitir os recibos referentes aos pagamentos efetuados por meio da folha de pagamento.

- [ ] **5.** Possibilitar que o servidor público via internet, possa consultar as informações que comprovem o
      rendimento e retenção de seu IRRF.

- [ ] **6.** Possibilitar que o servidor público via internet, possa visualizar todo o seu histórico financeiro.

- [ ] **7.** Possibilitar aos usuários administrativos a visualização dos status das solicitações cadastradas pelos
      servidores públicos por meio do portal.

- [ ] **8.** Possibilitar aos usuários com permissão, em um único ambiente, aprovar ou reprovar as solicitações
      realizadas pelos servidores.

- [ ] **9.** Possibilitar aos usuários com perfil administrador:
  - [ ] **9.1.** Adicionar e conceder permissões por funcionalidades para usuários e grupos de usuários.
  - [ ] **9.2.** Criar usuário e senha automaticamente de forma individual ou em lote.
  - [ ] **9.3.** Personalizar o formato do usuário e senha.
  - [ ] **9.4.** Alterar a senha dos usuários adicionados a partir do sistema.

- [ ] **10.** Permitir que o servidor realize solicitações, possibilitando que o mesmo acompanhe os trâmites
      realizados pelos usuários administradores, visualizando o status de suas solicitações.

- [ ] **11.** Permitir emissão de relatório de recibo de pagamento, customizados conforme o modelo de relatório
      desejado.

- [ ] **12.** Permitir a identificação, pelos usuários administradores, dos recibos integrados.

- [ ] **13.** Dispor de ficha funcional da matrícula do servidor, contendo os principais dados pessoais e contratuais,
      possibilitando a navegação entre as matrículas, caso o servidor possua mais de um contrato na entidade.

- [ ] **14.** Permitir a alteração dos dados pessoais pelo servidor, visando o recadastramento ou correção de dados,
      onde as informações alteradas serão exibidas como solicitações que dependerão da aprovação pelos usuários
      administradores. Após aprovadas, as alterações cadastrais deverão ser formalizadas de forma automática no
      sistema de gestão do RH.

- [ ] **15.** Possibilitar a realização de conferência de vídeo com solicitante, a partir de uma solicitação
      aguardando aprovação, permitindo ainda ao responsável, enviar SMS como forma de aviso ao solicitante.

- [ ] **16.** Permitir ao servidor a solicitação de benefícios, que serão avaliadas pelo responsável do setor pessoal
      ou pelo administrador do sistema que ficará incumbido de analisar e deferir as solicitações.

- [ ] **17.** Permitir ao servidor consultar e emitir sua ficha financeira de determinado exercício, detalhando as
      bases de cálculo.

- [ ] **18.** Permitir a emissão do comprovante de rendimentos, contendo os valores de IRRF, para utilização na
      declaração do imposto de renda.

- [ ] **19.** Permitir o acesso de servidores e estagiários, possibilitando a seleção de matrículas e contratos ativos
      ou não.

- [ ] **20.** Permitir a consulta e emissão dos recibos de pagamento das matrículas ativas e demitidas. Os recibos de
      pagamentos poderão ser visualizados pela forma mensal, férias, 13º salário e rescisão.

- [ ] **21.** Permitir ao usuário solicitar a alteração de marcação de ponto via sistema. As solicitações serão
      avaliadas pelo usuário aprovador, que pode aprovar ou reprovar as solicitações de inclusão, alteração ou
      exclusão de marcações de ponto.

- [ ] **22.** Permitir ao servidor a solicitação de licenças-prêmio, licença sem vencimento, licença maternidade,
      licença adoção e licença casamento. As solicitações de licença devem aguardar a validação do responsável
      informado ou pelo administrador do sistema, para analisar e deferir ou indeferir as solicitações.

- [ ] **23.** Permitir ao servidor a consulta e emissão dos registros de marcações de ponto.

- [ ] **24.** Permitir ao servidor, realizar a solicitação de folga para desconto em folha ou folga para compensação
      de horas extras, possibilitando a validação do responsável, podendo deferir ou indeferir a solicitação.

- [ ] **25.** Possibilitar ao servidor realizar a solicitação de férias, com envio ao departamento de recursos humanos
      que deverá realizar a análise do pedido e a programação de férias a partir do requerimento efetuado.

- [ ] **26.** Permitir ao servidor solicitar adiantamento salarial ou adiantamento 13º salário, que serão validadas
      pelo responsável, podendo deferir ou indeferir as solicitações.

- [ ] **27.** Permitir a impressão em documento no formato PDF dos dados de usuário e senha dos servidores criados a
      partir do sistema.

- [ ] **28.** Permitir o envio da Declaração Anual Bens do Servidor.

- [ ] **29.** Permitir a criação de um novo endereço durante a solicitação de alteração cadastral.

## Item 29 - Software de Atendimento ao Cidadão e Contribuinte On-line

*Fonte: Anexo I, páginas 117-118/194.*

- [ ] **1.** Permitir efetuar login com as credenciais do GOV.BR.

- [ ] **2.** Permitir ao contribuinte o acompanhamento de sua situação financeira junto à entidade, por meio de
      consulta e emissão dos débitos e dívidas com valores atualizados em tempo real.

- [ ] **3.** Possibilitar ao contribuinte, acesso à emissão de alvarás, guias de pagamento e emissão de certidões
      negativas de contribuinte, imóvel e econômico, através da internet.

- [ ] **4.** Propiciar a geração de um código de controle para averiguar a veracidade das informações contidas nos
      documentos emitidos pelo sistema, podendo a qualquer tempo realizar a consulta da validação de documentos.

- [ ] **5.** Permitir solicitar a confirmação de identidade do contribuinte por meio da autenticação de dois fatores
      ao emitir certidões.

- [ ] **6.** Propiciar a emissão do documento de Certidão Negativa de Débitos Municipais impresso via Internet.

- [ ] **7.** Possibilitar a emissão de segunda via de documentos já emitidos, como alvarás e certidões, sem
      necessidade de nova solicitação.

- [ ] **8.** Permitir configurar se haverá verificação quanto às declarações de serviços prestados e tomados na
      emissão das certidões negativa de contribuinte e de cadastro econômico.

- [ ] **9.** Permitir personalizar o layout das certidões negativas e dos alvarás que são editáveis, definindo modelo
      específico para a Prefeitura.

- [ ] **10.** Propiciar emissão e configuração de Alvará de Vigilância Sanitária, de Meio Ambiente e de licença e
      localização, bem como definir se haverá verificação dos débitos para geração do documento.

- [ ] **11.** Permitir a emissão de certidão de cadastro econômico já baixado (situação cadastral do contribuinte,
      quando do encerramento das atividades econômicas ou da transferência para outra localidade).

- [ ] **12.** Permitir cadastrar convênios e emitir boletos bancários com a modalidade de Carteira com Registro.

- [ ] **13.** Possibilitar que o usuário administrador configure o sistema para utilização de convênios bancários que
      utilizem PIX para pagamento.

- [ ] **14.** Permitir ao usuário administrador verificar todas as guias em aberto de contribuinte, imóvel e econômico
      por meio do seu código.

- [ ] **15.** Permitir a emissão de guias de pagamento, possibilitando a unificação de parcelas e receitas distintas
      em uma só guia.

- [ ] **16.** Propiciar alterar a data de vencimento de guias, possibilitando simular os acréscimos conforme a data de
      vencimento.

- [ ] **17.** Permitir de forma configurável que os contadores, imobiliárias ou cartórios acessem as informações dos
      clientes que representam.

- [ ] **18.** Permitir que o contribuinte efetue seu cadastro por meio da internet.

- [ ] **19.** Permitir configurar a forma de cadastro do contribuinte, definindo se o cadastro será automático ou por
      deferimento;

- [ ] **20.** Permitir que o contribuinte possa efetuar a alteração de suas senhas de acesso.

- [ ] **21.** Propiciar o envio da senha via e-mail nos casos de esquecimento, após solicitação do contribuinte.

- [ ] **22.** Propiciar o cadastro de mensagem personalizada para obtenção de senha com a finalidade de orientação ao
      contribuinte.

- [ ] **23.** Possibilitar a utilização de um teste de desafio cognitivo para comprovar que humanos estão realmente
      acessando o sistema (Captcha).

- [ ] **24.** Permitir configurar quais informações serão demonstradas na consulta de Informações Cadastrais de
      Imóveis e Econômicos.

- [ ] **25.** Permitir o pagamento dos tributos municipais através da plataforma com cartão de crédito.

- [ ] **26.** Permitir a habilitação/desabilitação do pagamento com cartão de crédito.

- [ ] **27.** Permitir o pagamento das parcelas de forma individual ou agrupada através do cartão de crédito.

- [ ] **28.** Desconsiderar o registro bancário de guias quando o pagamento for realizado através do cartão de
      crédito.

- [ ] **29.** Permitir que o usuário administrador possa parametrizar as solicitações de serviço realizadas através da
      internet, definindo quais receitas estarão disponíveis e a quantidade de dias para exclusão dos lançamentos não
      pagos.

- [ ] **30.** Permitir ao contribuinte realizar a solicitação de serviço, podendo indicar as informações adicionais da
      solicitação no momento da geração da guia.

- [ ] **31.** O sistema deve possuir telas contendo a consulta de informações cadastrais de um imóvel, permitindo a
      busca pelo código ou pela inscrição imobiliária do imóvel

- [ ] **32.** O sistema deve possuir tela contendo a consulta de informações cadastrais de um econômico, permitindo a
      busca pelo código do econômico.

- [ ] **33.** O sistema deve disponibilizar consulta de débitos lançados por referente. Ex econômico, imóvel inscrição
      imobiliária

- [ ] **34.** O sistema deve disponibilizar a emissão de guias diversas, que são valores aleatórios provenientes do
      sistema tributário

- [ ] **35.** O sistema deve disponibilizar a emissão de guias de iss provenientes do sistema tributário

- [ ] **36.** Permitir ao usuário administrador consultar e emitir a relação dos documentos gerados pelo cidadão,
      contendo a data e hora da emissão e o código de controle do documento emitido, sendo possível filtrar pelo
      período de emissão.

- [ ] **37.** Permitir ao usuário administrador emitir relatório de pagamentos com cartão de crédito.

- [ ] **38.** Disponibilizar acesso a manuais do sistema e novidades liberadas.

## Item 30 - Software de Aplicativo para o Cidadão e o Servidor

*Fonte: Anexo I, páginas 118-119/194.*

- [ ] **1.** O aplicativo deverá estar disponível gratuitamente para download pelos usuários/cidadãos no mínimo nas
      lojas: Google Play e Apple Store;

- [ ] **2.** O aplicativo deve ser compatível com sistemas operacionais: Android e IOS;

- [ ] **3.** Permitir que serviços e indicadores sejam ativados/desativados conforme demanda e disponibilidade da
      administração pública;

- [ ] **4.** Possibilitar que pessoas ou empresas participantes de licitações consulte o status do processo
      licitatório via aplicativo” mobile” (aplicativo para dispositivos móveis);

- [ ] **5.** Permitir que o servidor público realize a consulta do seu holerite via aplicativo” mobile” (aplicativo
      para dispositivos móveis);

- [ ] **6.** Permitir que o servidor público realize a consulta do seu Informe de rendimentos para IRPF via
      aplicativo” mobile” (aplicativo para dispositivos móveis);

- [ ] **7.** Permitir que o munícipe realize a consulta dos imóveis vinculados ao seu cadastro via aplicativo” mobile”
      (aplicativo para dispositivos móveis);

- [ ] **8.** Permitir que o munícipe consulte a listagem dos lançamentos de IPTU realizados em seus imóveis vinculados
      ao seu cadastro no município consultado, possibilitando a verificação se os valores estão quitados, em aberto ou
      parcelados via aplicativo” mobile” (aplicativo para dispositivos móveis);

- [ ] **9.** Permitir que o servidor público realize a consulta de suas ocorrências de ponto via aplicativo” mobile”
      (aplicativo para dispositivos móveis);

- [ ] **10.** Permitir que o servidor público realize a consulta das marcações de ponto via aplicativo” mobile”
      (aplicativo para dispositivos móveis);

- [ ] **11.** Possibilitar ao munícipe consultar a situação dos protocolos via aplicativo” mobile” (aplicativo para
      dispositivos móveis);

- [ ] **12.** Permitir que o munícipe realize a abertura de protocolos via aplicativo” mobile” (aplicativo para
      dispositivos móveis).

## Item 31 - Software de Assistência Social

*Fonte: Anexo I, páginas 119-121/194.*

- [ ] **1.** Permitir o acesso ao sistema via internet, possibilitando o registro de ações às pessoas assistidas pelo
      Serviço Assistencial do município.

- [ ] **2.** Permitir a visualização dos dados Cadastrais da Entidade.

- [ ] **3.** Permitir cadastrar estabelecimentos voltados para o Serviço Social. Este cadastro deve contemplar
      estabelecimentos públicos ou privados independentemente do tipo (CRAS ou CREAS).

- [ ] **4.** Permitir cadastrar estabelecimentos públicos ou privados que, mesmo não sendo específico para a
      Assistência Social, realizam ações voltadas para o Serviço Social (Delegacias, Escolas, etc).

- [ ] **5.** Permitir cadastrar pessoas físicas ou jurídicas que atuem como fornecedores dos recursos da Entidade.

- [ ] **6.** Permitir cadastrar todos os profissionais da Entidade que atuarão nas ações de Assistência Social do
      município.

- [ ] **7.** Permitir que no próprio cadastro do profissional seja possível informar em quais estabelecimentos ele
      estará vinculado, possibilitando a visualização da Capacidade Assistencial do município.

- [ ] **8.** Permitir cadastrar todas as atividades de Serviço Sociais realizadas nos estabelecimentos do município.

- [ ] **9.** Permitir o cadastro de turmas para a realização de atividades coletivas.

- [ ] **10.** Permitir registrar os encontros coletivos, possibilitando o vínculo entre as turmas e as atividades
      realizadas nos encontros. Permitir ainda a emissão de lista de presença.

- [ ] **11.** Permitir a visualização dos nomes de todos os Estados e Municípios brasileiros para que possam ser
      vinculados aos endereços das pessoas assistidas pelas ações realizadas pelos estabelecimentos de Assistência
      Social do município, possibilitando o cadastro de bairros, loteamentos, logradouros e condomínios.

- [ ] **12.** Permitir cadastrar áreas e micro áreas, e vinculá-las a seus respectivos estabelecimentos para que os
      profissionais possam realizar os atendimentos e acompanhamentos conforme determinação das políticas públicas de
      Assistência Social.

- [ ] **13.** Permitir o cadastro de programas assistenciais oferecidos pelo município. Este cadastro deve possuir os
      mesmos critérios de validação daqueles que já estão vinculados ao sistema (beneficiários, condicionalidades,
      etc), possibilitando informar o valor (gastos) referente a cada Programa.

- [ ] **14.** Permitir cadastrar serviços específicos do município para que sejam vinculados às famílias beneficiadas.

- [ ] **15.** Permitir o cadastro e manutenção de famílias, bem como a vinculação de seus membros, possibilitando a
      inclusão dos mesmos em programas, serviços, atividades, entre outras ações realizadas pelo município.

- [ ] **16.** Permitir que uma família seja vinculada a um ou mais programas e serviços assistenciais. Permitir ainda,
      quando necessário, que este vínculo possa ser direcionado apenas aos membros das famílias conforme a necessidade
      de cada indivíduo.

- [ ] **17.** Permitir que o vínculo estabelecido entre famílias/indivíduos e os respectivos programas possam ser
      desfeitos caso a assistência não seja mais necessária.

- [ ] **18.** Permitir parametrizar o acesso dos profissionais ao sistema conforme sua Classificação Brasileira de
      Ocupações (CBO) ou por suas atribuições nos Estabelecimentos. Permitir classificar os profissionais entre
      Usuários de Secretaria (gestores) e Usuários de estabelecimentos (profissionais alocados nos estabelecimentos de
      Assistência Social).

- [ ] **19.** Permitir definir perfis de acesso para serem atribuídos aos usuários do sistema conforme suas funções
      nos estabelecimentos.

- [ ] **20.** Permitir que sejam definidas quais CBOs (Classificação Brasileira de Ocupação) poderão registrar ações
      de atendimentos no sistema.

- [ ] **21.** Permitir o cadastro de Competências (período contemplado no prazo para a realização do faturamento
      mensal da entidade.

- [ ] **22.** Permitir o cadastro de agendas para os profissionais dos estabelecimentos de Assistência Social.

- [ ] **23.** Permitir a realização de agendamentos para atendimentos ou para a realização de atividades.

- [ ] **24.** Permitir que um agendamento possa ser cancelado ou que tenha sua data transferida, conforme a
      necessidade dos envolvidos (profissionais ou assistidos).

- [ ] **25.** Permitir o cadastro dos atendimentos voltados à famílias ou aos seus membros, possibilitando registrar
      todas as informações necessárias para o acompanhamento (denúncia, atendimento, visita, emergencial, etc.).
      Permitir ainda que as atividades previamente cadastradas possam ser vinculadas ao atendimento, quando
      necessário.

- [ ] **26.** Permitir anexar documentos no registro de atendimento do assistido.

- [ ] **27.** Permitir que os profissionais que possuam as devidas permissões, possam acessar o histórico de
      atendimento das famílias cadastradas no sistema.

- [ ] **28.** Permitir o cadastro do Plano de Ação quando o grau de vulnerabilidade da Família exigir tal ação.
      Permitir que sejam registrados os compromissos assumidos pela família para que a equipe responsável possa
      atender as necessidades da família dentro do prazo estipulado.

- [ ] **29.** Permitir o registro do Plano Individual de Atendimento (PIA), possibilitando o registro de todas as
      medidas socioeducativas voltadas para o assistido.

- [ ] **30.** Permitir que pelo sistema, seja possível encaminhar o assistido a outro estabelecimento, uma vez
      constatado que o estabelecimento o acolheu não possui a estrutura necessária para a realização do atendimento
      necessário.

- [ ] **31.** Permitir que pelo sistema, os profissionais possam consultar a lista dos assistidos encaminhados ao seu
      estabelecimento e a partir das informações registradas ainda no estabelecimento de origem, possam atender a esta
      demanda de acordo com as necessidades de cada indivíduo.

- [ ] **32.** Permitir que os gestores possam consultar os valores de cada programa e o quanto foi gasto em um
      determinado período. Permitir que esta consulta possa ser feita por período, por estabelecimento e por programa.

- [ ] **33.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações sobre os agendamentos realizados pelos estabelecimentos do município.

- [ ] **34.** Permitir que os profissionais definam filtros para a emissão de relatórios contendo os comprovantes de
      agendamentos emitidos.

- [ ] **35.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações sobre os atendimentos realizados nos estabelecimentos.

- [ ] **36.** Permitir que os profissionais definam filtros para a emissão de relatórios contendo os recibos de
      atendimentos emitidos.

- [ ] **37.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações sobre os Serviços ofertados pelo município.

- [ ] **38.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações sobre as micro áreas cadastradas no município.

- [ ] **39.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações sobre todos os assistidos cadastrados no sistema.

- [ ] **40.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações sobre todas as atividades realizadas pelos estabelecimentos do município.

- [ ] **41.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações dos estabelecimentos cadastrados no município.

- [ ] **42.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações referentes a localização de todas as famílias cadastradas no sistema.

- [ ] **43.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações de outros tipos de estabelecimentos que tenham sido cadastrados no sistema.

- [ ] **44.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações sobre todos os profissionais cadastrados no sistema.

- [ ] **45.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações sobre os Programas municipais cadastrados no sistema.

- [ ] **46.** Permitir que os profissionais definam filtros para a emissão de um relatório de participantes por
      atividade.

- [ ] **47.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações de acompanhamento dos participantes das atividades.

- [ ] **48.** Permitir que os profissionais definam filtros para a emissão de um relatório com os participantes dos
      Programas cadastrados no sistema.

- [ ] **49.** Permitir que os profissionais definam filtros para a emissão de relatórios gerenciais contendo
      informações relacionadas aos gastos com os programas cadastrados no sistema.

- [ ] **50.** Permitir que os profissionais (principalmente gestores) possam visualizar os últimos relatórios
      emitidos.

- [ ] **51.** Permitir através do sistema, o envio de mensagens entre os usuários de uma mesma entidade.

- [ ] **52.** Permitir a visualização do histórico de acesso de todos os usuários do sistema, possibilitando o
      detalhamento das ações realizadas por cada um.

- [ ] **53.** Permitir ao usuário cadastrar os programas assistenciais do município.

- [ ] **54.** Permitir o usuário incluir o assistido/família no programa do município através do atendimento.

- [ ] **55.** Permitir o usuário excluir o assistido do programa através do cadastro da Família.

- [ ] **56.** Permitir ao usuário emitir o relatório com os Programas cadastrados no aplicativo.

- [ ] **57.** Permitir o usuário excluir o assistido da atividade através do cadastro da Família.

- [ ] **58.** Permitir ao usuário emitir a lista de presença de assistidos que estão participando das atividades.

- [ ] **59.** Permitir ao usuário visualizar através da tela de atendimento, o histórico de atendimentos já realizados
      pelo assistido.

- [ ] **60.** Permitir a importação de arquivo que contenha as informações cadastrais do sistema CADÚNICO.

## Item 32 - Software de Saúde

*Fonte: Anexo I, páginas 121-134/194.*

> **Nota literal do edital:** os requisitos de Saúde são apresentados majoritariamente sem numeração. O número “96.” aparece isoladamente no meio da relação. O último requisito termina no documento com a palavra incompleta “requ”. Nenhum conteúdo foi completado por inferência.

- [ ] Proporcionar a interação das informações, em tempo real, entre as áreas de Atenção Básica, Assistência em Saúde,
      Assistência Farmacêutica, Financeiro, Regulação, Diagnósticos, Ações Programáticas e Vigilância em Saúde.

- [ ] Permitir a consolidação das informações no momento do seu lançamento, de acordo com as regras do SIGTAP ou
      demais tabelas de procedimentos, evitando problemas ou críticas no momento do faturamento.

- [ ] Permitir o gerenciamento da fila de espera da recepção, permitindo o agendamento de um paciente da fila oriundo
      do agendamento, caso seja novamente agendado, ou alterado.

- [ ] Permitir visualizar o acompanhamento do paciente por meio de registro eletrônico (prontuário clínico), para
      atendimentos na unidade ou domiciliar, abertos e finalizados, permitindo visualizar todas as ações registradas
      nos atendimentos clínicos.

- [ ] Permitir o registro e manutenção dos antecedentes clínicos do paciente.

- [ ] Permitir ao profissional de saúde, durante atendimento, visualizar o cadastro de laudo para procedimentos de
      alta complexidade - APAC.

- [ ] Permitir a manutenção de alergias do paciente no atendimento, possibilitando sua alteração ou informar que o
      paciente nega possuir alergia, mantendo o histórico de alteração durante cada atendimento.

- [ ] Permitir a impressão de documentos do atendimento, deverá possibilitar abrir o documento em PDF para
      visualização ou impressão de cada item, possibilitando a impressão do PDF de acordo com o modelo selecionado.

- [ ] Permitir configurar, por unidade de saúde, o registro da evolução do paciente através do SOAP ou Anamnese/Exames
      Físicos.

- [ ] Permitir a consulta de pacientes para visualizar as solicitações, possibilitando agendar consultas para as
      solicitações que não necessitam de regulação.

- [ ] Deverá permitir consulta pelo nome social, nome, CNS, CPF.

- [ ] Permitir ao profissional de saúde editar e/ou excluir as administrações de medicamentos realizadas, durante o
      atendimento.

- [ ] Permitir registrar e realizar a manutenção da estratificação de risco do paciente durante o atendimento,
      atualizando automaticamente cadastro do paciente as informações de estratificações que forem registradas no
      atendimento, e a cada novo atendimento além de possibilitar informar a estratificação, deverá carregar as que já
      foram preenchidas, permitindo alterá-las.

- [ ] Permitir a exibição de documentos digitalizados adicionados no cadastro do paciente e no atendimento, para
      usuários que possuem permissão para visualizar a lista de anexos.

- [ ] Permitir, para o atendimento ambulatorial, registrar informações do atendimento, como o local do atendimento,
      tipo de atendimento, modalidade AD, racionalidade em saúde, unidade, profissional, especialidade e tipo de
      consulta, no caso de atendimento odontológico.

- [ ] Permitir na evolução do atendimento, informar o CID principal e CIDs secundários, possibilitando a consulta do
      CID por nome ou código, podendo ser registrado o CID ou grupo de CID.

- [ ] Permitir disponibilizar acesso aos medicamentos de uso contínuo.

- [ ] Possuir rotina de consumo interno aos profissionais nas Unidades de Saúde, permitindo efetuar o registro de
      produtos, materiais, insumos a serem utilizados na higienização, coleta do exame, curativos, dentre outros.

- [ ] Permitir efetuar a consulta de Consumo Interno realizada pela Unidade de Saúde, permitindo a visualização da
      lista de Produtos já registrados ao consumo interno.

- [ ] Permitir ao encaminhar o paciente para observação, e realizar a impressão de prescrições manuais para uso
      interno.

- [ ] Permitir a realização do cadastro de prescrições padrões para utilização nas rotinas de prescrições.

- [ ] Permitir registrar evasão do paciente na unidade de saúde, a partir da segunda chamada, essa opção não deverá
      estar disponível quando o atendimento estiver com a situação em atendimento ou reavaliar.

- [ ] Permitir através de parametrização, realizar validação, durante a requisição de procedimentos no atendimento, se
      o paciente reside em um município diferente, permitindo a configuração da validação para alerta, erro ou
      sucesso.

- [ ] No caso de erro - apresentar mensagem e impedir que a requisição do procedimento seja realizada; alerta -
      apresentar mensagem e permitir que a requisição do procedimento seja realizada; e sucesso -permitir que a
      requisição do procedimento seja realizada.

- [ ] Permitir, durante o atendimento executar apenas os procedimentos que não requerem autorização de profissional
      regulador.

- [ ] Permitir registrar as condições avaliadas do paciente durante os atendimentos de atenção básica, gerando
      automaticamente o CIAP correspondente, conforme e-sus.

- [ ] Permitir informar, visualizar e excluir procedimentos cadastrados e gerados durante a observação do paciente.

- [ ] Deve conter campos para informar o código e nome do procedimento, quantidade, profissional, CID, origem e
      situação.

- [ ] Para o caso de exclusão, só deve permitir o procedimento gerado pelo próprio profissional.

- [ ] Permitir a visualização das filas de atendimento, exibindo a quantidade de pacientes que encontram-se nas filas
      de agenda, atendimento, observação e nos registros de atendidos e não atendidos.

- [ ] Permitir ao profissional de saúde realizar a impressão de documentos comprobatórios necessários para a conclusão
      e prosseguimento dos processos realizados no atendimento, possibilitando realizar as impressões de prescrições,
      requisições, administrações, encaminhamentos, transferência, FAA, FA, atestados, declarações, documentos e
      laudos, controlando também a situação de cada documento: impresso, inativo, não impresso.

- [ ] Permitir na fila de atendimento da recepção, no momento da confirmação da presença do paciente, alterar
      informações do seu cadastro e informar se é caso de priorização.

- [ ] Permitir que o Profissional de Saúde, durante o atendimento, possa realizar o cadastro de solicitações de Laudo
      para solicitação de internação hospitalar - AIH, que deverá conter informações de justificativa da internação,
      procedimento solicitado e causas externas (para acidentes ou violências).

- [ ] Permitir aos profissionais de saúde autorizados, através do atendimento clínico requisitar exames/procedimentos
      de mamografia com o auxílio de mama gráfica.

- [ ] Gerar lista de espera da unidade de saúde, a partir de uma lista de pacientes com procedimentos agendados,
      exibindo informações relacionadas ao paciente, tais como: sexo, número do prontuário, CNS, idade, priorização,
      data de agendamento e situação, permitindo registrar o não atendimentos de pacientes agendados na unidade de
      saúde.

- [ ] Permitir a visualização dos atendimentos cadastrados disponíveis na fila de atendimentos e realizar o
      cancelamento desde que o paciente não tenha sido chamado pelo painel, que o atendimento não tenha informações de
      triagem, acolhimento ou atendimento.

- [ ] Ao cancelar um atendimento deverá ser obrigatório informar um motivo e uma observação.

- [ ] Permitir a inclusão do paciente sem identificação na fila de atendimento, justificando o motivo pelo qual não
      houve a identificação do mesmo no contato assistencial.

- [ ] Permitir a flexibilização para criação de relatórios, conforme a necessidade do município, através de
      informações disponíveis nos documentos registrados nas impressões dos atendimentos.

- [ ] Permitir ao profissional de saúde autorizado, executar no atendimento o procedimento de radiologia,
      possibilitando registar a execução do procedimento radiológico agendado para o paciente na unidade prestadora,
      com as seguintes informações: procedimento agendado; unidade solicitante; profissional solicitante; profissional
      executante; CBO e CID.

- [ ] Permitir através da triagem ou acolhimento realizar a finalização dos atendimentos, e quando atendido deve
      permitir informar como concluído atendido, e para os casos em que existir registro de atendimento (triagem ou
      acolhimento) deve fazer parte da lista de pacientes “não atendidos”.

- [ ] Exibir, na fila de agenda de procedimentos, os procedimentos agendados na unidade de saúde prestadora, devendo
      apresentar lista com informações pertinentes aos pacientes e procedimentos agendados e não executados.

- [ ] A lista deve apresentar as seguintes opções: nome do paciente; sexo; idade; CNS; nome da mãe; priorização;
      atendimento; procedimento e a situação.

- [ ] Exibir na fila de atendimentos os procedimentos confirmados para o paciente na unidade de saúde, para que o
      profissional possa registrar a execução ou o não atendimento.

- [ ] Permitir configurar e editar no cadastro de especialidades, a fim de registrar se a mesma exige autorização.

- [ ] Permitir a visualizar e registrar informações para os atendimentos de urgência e emergência.

- [ ] Permitir integração com a base do cadastro nacional de estabelecimentos de saúde - CNES, promovendo a importação
      e atualização das unidades de saúde: posto de saúde, serviço de urgência, academia da saúde, hospital,
      maternidade, centro de parto normal, farmácia popular, CAPS e Centro de especialidade, profissionais e seus
      respectivos vínculos, por meio da interoperabilidade SOA-SUS, Ministério da Saúde.

- [ ] Possuir fila de não atendidos, que exiba os atendimentos de procedimentos não atendidos na unidade de saúde
      prestadora.

- [ ] Deverá exibir lista com informações pertinentes aos pacientes e procedimentos agendados e não atendidos na
      unidade.

- [ ] Permitir a visualização prévia à impressão do documento de Cadastro de Laudo médico para procedimentos de alta
      complexidade - APAC.

- [ ] Permitir que o usuário acesse o RES - Registro eletrônico de saúde do paciente, conforme permissão de acesso
      configurada para o RES, para que seja possível controlar o acesso nos registros de todas as movimentações
      realizadas para o paciente dentro da unidade.

- [ ] Adicionar e finalizar no RES do paciente os seus medicamentos de uso contínuo.

- [ ] Visualizar e filtrar no RES todas as atividades coletivas que o paciente participou, todas as versões de
      cadastro individual realizado para o cliente, os registros de domicílio do paciente e os medicamentos contínuos
      do paciente.

- [ ] Permitir filtrar diretamente no prontuário dos pacientes os medicamentos dispensados por unidade, período de
      data, profissional, equipe, tipo da atividade e nome do medicamento.

- [ ] Permitir realizar o Cadastro de Laudo de Autorização de Procedimento de Alta Complexidade, diretamente no
      prontuário sem a necessidade de realizar um atendimento convencional no sistema.

- [ ] Dispor da lista de procedimentos autorizados a serem realizados nos atendimentos odontológicos conforme e-Sus.

- [ ] Possuir relatório de pacientes cadastrados sem cartão SUS, aplicando filtros por município de origem, cliente e
      situação dos respectivos cadastros a serem listados.

- [ ] Permitir emitir relatório de atendimentos por hora, possibilitando filtrar por unidade, profissional, data
      inicial, hora inicial, data final, hora final, devendo exibir ao menos as seguintes informações: entidade,
      unidade, profissional, data de atendimento do profissional, horário do atendimento, nome e idade do paciente,
      totalizador de atendimento do dia, totalizador de atendimentos de crianças, totalizador de atendimentos de
      adultos e total de atendimentos do profissional.

- [ ] Permitir a geração de relatório de atendimentos por classificação de risco, aplicando filtros por unidade de
      saúde, intervalo de data, motivo e se deve ser contabilizada ou não as triagens no relatório.

- [ ] Permitir emitir relatório de procedimentos por paciente, permitindo realizar diversas filtragens, exibindo no
      relatório a unidade, o paciente, idade, data/hora do procedimento, nome do profissional, nome do procedimento e
      quantidade, além do totalizador de procedimentos do paciente, e totalizador de procedimentos da unidade.

- [ ] Possibilitar o envio de lembrete ao paciente, via SMS ou e-mail referente ao Agendamento de Consulta de
      Especialidade.

- [ ] Permitir o gerenciamento da agenda de procedimento da unidade possibilitando a personalização de representação
      da agenda, definição se a agenda será por ordem de chegada ou não e permitindo definição de público alvo (sexo,
      idade, gestante, deficiente) e limitação de usuários que poderão fazer uso da agenda.

- [ ] Permitir excluir agendas de procedimentos cadastradas, desde que não possuam agendamentos cadastrados.

- [ ] Permitir registrar presença ou ausência do agendamento de procedimentos laboratoriais para pacientes agendados
      na unidade de saúde prestadora.

- [ ] Permitir a impressão do comprovante de agendamento do paciente após agendar consulta de especialidade.

- [ ] Permitir visualizar prontuário resumido (miniprontuário) dentro do atendimento, para profissionais que possuem
      permissão, possibilitando a visualização independente da aba em que o profissional estiver trabalhando (triagem,
      acolhimento e atendimento).

- [ ] Possuir relatório de atendimentos, que demonstre os horários de entrada e saída da fila de atendimento, triagem,
      acolhimento e atendimento clínico.

- [ ] Dispor de atualização automática na listagem de agendamentos de especialidade, em todas as telas que estiverem
      acessando o sistema conforme o consumo dos agendamentos ou alteração das agendas, feriados e ausências.

- [ ] Possuir cadastro de convênios, possibilitando realizar o vínculo e manutenção do vínculo das especialidades que
      serão disponibilizadas para o convênio selecionado.

- [ ] Para a inclusão deverá conter campos para registrar as seguintes informações: Convênio; especialidade; valor e
      situação (ativo/inativo).

- [ ] Permitir realizar o atendimento domiciliar, possibilitando às equipes de atenção básica, realizar o atendimento
      e acompanhamento de pacientes em casa.

- [ ] Para o registro do atendimento deverá disponibilizar o cadastro das seguintes informações: paciente, nome ou
      nome social, sexo, idade, data de nascimento, CNS, CPF, prontuário, telefone, e endereço.

- [ ] Permitir a emissão de relatório de requisições de procedimentos, conforme a situação que deverá ser:
      requisitado, aguardando, autorizado, não autorizado.

- [ ] O relatório deverá exibir ao menos as informações relativas ao profissional solicitante, paciente, especialidade
      encaminhada, quantidade, valor, procedimento, situação, data de autorização, número da solicitação, e telefone
      do paciente.

- [ ] Permitir informar no agendamento de especialidades, quais os procedimentos que serão executados na consulta.

- [ ] Permitir a adição de nova agenda de especialidade para o profissional, possibilitando que os agendamentos sejam
      realizados de acordo com as especialidades do profissional.

- [ ] Permitir a consulta da informação desconsiderando acentos e caracteres especiais, permitindo ainda que caso o
      usuário digite sua busca sem acento ou carácter especial encontre o resultado esperado.

- [ ] Permitir a transferência de agendamentos de procedimentos de um ou vários pacientes ao mesmo tempo, informando a
      data das transferências de agendamentos e o motivo.

- [ ] Permitir reagendar consultas de especialidade pendentes de reagendamento conforme agendas disponíveis.

- [ ] Permitir apresentar os dados do paciente em todas as vias do comprovante de solicitação de exames SADT emitidos
      pelo usuário.

- [ ] Permitir ao regulador efetuar inclusão de uma Solicitação de Consulta na Central de Regulação, através do
      encaminhamento gerado pela Unidade de Saúde e entregue ao paciente.

- [ ] Permitir no cadastro de convênio, listar e filtrar todas as especialidades, procedimentos e prestadores
      cadastradas para o convênio.

- [ ] Possuir notificação, que alerte o profissional referente às pendências de correção (preenchimento inadequado
      como especialidade ou a prioridade, erro ortográfico),na solicitação de consulta que esteja na fase
      “Aguardando”.

- [ ] Permitir o registro de Laudo BPA-I, diretamente no prontuário do cliente sem a necessidade de realizar um
      atendimento convencional no sistema.

- [ ] Efetuar a pesquisa ou listagem por Cadastro de Solicitações de Laudo do Boletim de Produção Ambulatorial -
      Individualizado, que deverá conter os seguintes cabeçalhos de priorização: data, paciente, solicitação, unidade
      e situação.

- [ ] Realizar Impressão de solicitação de Laudo AIH - Autorização de Internação Hospitalar.

- [ ] O laudo deve conter as informações do profissional solicitante: nome, CNS e data da solicitação; do paciente:
      nome, responsável, nascimento, sexo, raça, etnia, CNS, prontuário, telefone, nome da mãe e do pai, e endereço;
      além de dados da unidade solicitante e informações sobre o procedimento.

- [ ] Permitir incluir e editar informações referentes a gestação, no prontuário de pacientes do sexo feminino,
      contendo informações referentes a data da última menstruação, idade gestacional (que deverá ser calculada
      automaticamente conforme a DUM), partos, gravidez planejada, maternidade de referência e o desfecho da gestação,
      podendo ser: abortamento, óbito, outros motivos, parto cesáreo, ou forceps ou vaginal e o locar de parto.

- [ ] Cancelar agendamento de especialidade de um paciente na central de regulação, liberando a vaga da agenda para
      que outro paciente possa ocupar a vaga para consulta.

- [ ] Efetuar pesquisa ou listagem por Cadastro de Laudo para Autorização de Procedimento Ambulatorial de Alta
      Complexidade - APAC, mesmo sem que tenha sido previamente efetuado um atendimento ao paciente.

- [ ] Permitir, ao realizar Cadastro de Laudo APAC, que deverá ser autorizado posteriormente, para o tipo de Laudo:
      Pré-Cirurgia bariátrica, Pós-Cirurgia bariátrica, gerenciando o acompanhamento do paciente, como informações de
      avaliação física: peso e IMC, além das comorbidades presentes.

- [ ] Permitir aos Profissionais de saúde do Atendimento relacionado ao registro de Laudo APAC, realizar a
      solicitação/autorização de medicamentos de dispensação excepcional e estratégicos, mesmo sem que tenha sido
      previamente efetuado um atendimento ao paciente, para que posteriormente seja efetuada sua autorização.

- [ ] Permitir ao profissional de saúde durante o atendimento, realizar visualização prévia à impressão do documento
      "Cadastro de Laudo APAC": Pré-Cirurgia Bariátrica, Pós-Cirurgia Bariátrica e de Medicamentos.

- [ ] Permitir agendar consultas de especialidade para pacientes, conforme agendas cadastradas previamente.

- [ ] O sistema não deverá permitir agendamento de agendas bloqueadas ou canceladas, nem se houver feriado ou ausência
      registrada para o dia/hora do agendamento.

- [ ] Permitir que no cadastro de prestadores, relacionados aos convênios, seja possível listar e filtrar todas as
      especialidades e procedimentos vinculados ao prestador do convênio.

- [ ] Permitir a emissão da Ficha de Atendimento Ambulatorial - FAA, para que os profissionais de saúde possam
      realizar a emissão da ficha preenchida ou registrar informações do atendimento manualmente, e posteriormente
      possam repassar ao sistema conforme necessidade, ou preenchida automaticamente pelo sistema com os dados do
      atendimento.

- [ ] Permitir ao profissional de saúde a visualização e impressão do laudo AIH através do Registro Eletrônico de
      Saúde (RES).

- [ ] Permitir a visualização e filtragem no registro eletrônico de saúde dos registros de viagens.

- [ ] Permitir ao profissional de saúde através da regulação, realizar a impressão ou reimpressão de Laudo: BPA-I,
      necessários para a conclusão e prosseguimento adequado dos processos realizados na Regulação.

- [ ] Permitir efetuar Cadastro de Requisição de Produtos, vinculando-o à Unidade de Saúde requisitante e à Unidade
      requisitada.

- [ ] Os Produtos a serem requisitados devem ser adicionados, indicando a quantidade, permitindo registro das
      informações como um rascunho, podendo ser editado novamente, antes de ser finalizada a requisição.

- [ ] Permitir registrar a execução de procedimentos com finalidade diagnóstica agendado para o paciente na unidade
      prestadora com as seguintes informações: procedimento agendado; unidade solicitante; profissional solicitante;
      profissional executante; CBO e CID.

- [ ] Permitir ao profissional de Saúde efetuar o cancelamento da solicitação de Laudo AIH.

- [ ] Permitir a visualização lista com os laudos AIH cancelados.

- [ ] Permitir ao encaminhar o paciente para observação, realizar a impressão da requisição de exames para uso
      interno, e as impressões devem ocorrer conforme grupo de exames.

- [ ] Permitir a realização do registro de grupos de exames.

- [ ] Permitir o cadastro de grupos de despesas.

- [ ] **96.** Permitir a busca de um paciente da lista pelo nome.

- [ ] Permitir ao profissional de Saúde efetuar o cancelamento da solicitação de laudo APAC.

- [ ] Permitir o preenchimento de campos do sistema, do tipo texto, por reconhecimento de voz, ou seja, conforme o
      usuário fala o sistema deverá escuta descrever no campo selecionado, devendo inclusive identificar os comandos
      de ponto final, vírgula, dois pontos, quebra linha, após uma pausa na fala, ou o clique fora do campo.

- [ ] Permitir ao regulador efetuar pesquisa ou listagem por Solicitação de Consultas, pelo profissional de saúde.

- [ ] Permitir ao regulador efetuar pesquisa ou listagem por requisição de procedimentos.

- [ ] Permitir ao regulador visualizar os procedimentos agendados, e a pesquisa por procedimentos requisitados por
      Unidade de Saúde.

- [ ] Permitir ao regulador efetuar a pesquisa por procedimentos arqueados, consultas em lista de espera, consultas já
      autorizadas e não autorizadas.

- [ ] Permitir incluir e manter notificação SMS ao agendamento de consulta de especialidade.

- [ ] Permitir que o paciente possa efetuar o cancelamento do agendamento da consulta ou procedimento, respondendo
      NÃO, à notificação recebida.

- [ ] Permitir incluir e manter notificação aos pacientes referentes a campanhas e mutirões a serem realizados pelas
      Unidades de Saúde, permitindo o registro de programações através da notificação ao paciente, comunicando somente
      o público-alvo conforme configurações efetuadas.

- [ ] Permitir manter série histórica de contatos efetuados com o paciente em campanhas e mutirões.

- [ ] Permitir incluir e manter registro de contato telefônico ao agendamento, feito ao paciente.

- [ ] Permitir visualizar nas filas de espera a situação, data, horário e por quanto tempo o paciente encontra-se na
      fila, até a conclusão do atendimento.

- [ ] Permitir transferir agendamentos de consultas de um ou vários pacientes ao mesmo tempo, possibilitando
      selecionar o profissional e a data inicial das transferências de agendamentos e o seu motivo.

- [ ] Permitir o cadastro e impressão dos atestados, declarações e laudos durante o atendimento.

- [ ] Permitir o cadastro e manutenção de laudos por exames.

- [ ] Permitir que no mesmo atendimento, mais de um profissional possa registrar ações ao mesmo paciente, registrando
      de forma individual a atuação de cada profissional.

- [ ] Permitir o cancelamento de procedimento já autorizado, retornando seu status para "aguardando", e permitindo
      indicar o motivo do cancelamento.

- [ ] Permitir o registro de ações voltadas à atenção básica conforme critérios estabelecidos pelo Ministério da
      saúde, por meio do sistema e-SUS, conforme Portaria 1.412/13.

- [ ] Permitir cadastrar e manter os recipientes que serão utilizados para realização dos procedimentos laboratoriais,
      contendo as informações sobre o recipiente, volume, apresentação, cor, observação e situação.

- [ ] Permitir o gerenciamento dos acesso de usuários do sistema, configurando quais ações o profissional da saúde
      poderá executar.

- [ ] Permitir atualizar a listagem de agendamentos de procedimentos automaticamente em todas as telas que estejam
      acessando o sistema, conforme o consumo dos agendamentos ou alteração das agendas, feriados e ausências.

- [ ] Permitir listar e filtrar todos os agendamentos de procedimentos agendados no ambiente de agendamento, que por
      algum motivo foram devolvidos para reagendamento, permitindo filtrar por paciente, procedimento, unidade ou
      usuário solicitante do agendamento, unidade prestadora, convênio e data.

- [ ] Permitir listar o registro de ausência dos profissionais de saúde.

- [ ] Permitir o cadastro de profissionais de saúde.

- [ ] Permitir que os profissionais de saúde registrem suas ações no sistema, conforme compatibilidade de sua CBO,
      evitando inconsistências posteriores no processo de geração do arquivo de produção, bem como os indicadores do
      previne brasil ajustando as informações do previne brasil do atendimento de forma automática.

- [ ] Permitir informar quando o atendimento é uma escuta inicial ou orientação, gerando procedimento automaticamente
      e validando demais procedimentos ao finalizar atendimento.

- [ ] Esta funcionalidade deve ser utilizada somente quando for um atendimento ambulatorial e a especialidade do
      profissional não estiver configurada como especializada.

- [ ] Permitir a realização do acolhimento, ainda na fila de atendimento, utilizando-se dos critérios de avaliação da
      classificação de riscos conforme PNH podendo parametrizar pelo critério de 5 ou 4 níveis, onde a necessidade de
      cada paciente é representada pelas seguintes cores: Vermelha: Emergência; Laranja: Muito Urgente; Amarela:
      Urgente; Verde: Não urgente; Azul: Baixa complexidade.

- [ ] Permitir realizar uma ou mais triagens para o paciente ao longo do atendimento inicial, seguindo o protocolo
      médico identificando as necessidades do paciente.

- [ ] Não deve permitir editar uma triagem após finalizada, mas apenas incluir novas triagens enquanto o atendimento
      estiver aberto, permitindo inclusive visualizar o histórico das cinco últimas triagens já realizadas para o
      referido paciente.

- [ ] Permitir que o profissional de saúde possa realizar o atendimento do paciente, conforme sua especialidade (CBO)
      e permissão.

- [ ] Permitir aos profissionais de saúde visualizar as informações do paciente, como o nome completo e foto, Idade,
      Número do prontuário, Deficiência, Gestante, Idoso, Criança de colo, CNS, e Alergia e Estratificação de risco.

- [ ] Permitir o profissional de saúde visualizar, incluir e excluir procedimentos no momento da triagem/acolhimento
      do paciente.

- [ ] Permitir, durante o atendimento, realizar transferências de pacientes para outras unidades, conforme necessidade
      da unidade de saúde ou diagnóstico obtido no atendimento.

- [ ] Permitir na fila de atendimento da recepção registrar presença e ausência dos pacientes agendados.

- [ ] Permitir listar pacientes agendados do município para consultas eletivas e retornos, por data, com as seguintes
      informações: paciente (nome, número do prontuário, CNS, sexo, data de nascimento, idade), fila (Consulta e
      Retorno), situação (horário da consulta ou retorno), Convênio (se houver), Queixas, sintomas e observações."

- [ ] Permitir visualizar as informações do paciente na fila de atendimento, com os seguintes dados: nome completo,
      sexo, idade, número do prontuário; restrições alérgicas; Nome da mãe e Pai, Município, Endereço, Deficiência
      (Gestante, Idoso, Criança de colo) CNS, e telefone.

- [ ] Permitir a visualização, inclusão e alteração de informações de evolução do paciente durante o atendimento com
      os seguintes dados: antecedentes clínicos, condições avaliadas, vigilância em saúde bucal, CID ou/e CIAP,
      avaliação de exames, alergias e deficiências.

- [ ] Permitir ao profissional responsável pela triagem, acolhimento ou atendimento gerar uma informação de
      atendimento complementar, permitindo editar ou incluir o que for necessário, com o registro da respectiva
      justificativa da complementação do atendimento, que deverá constar no prontuário.

- [ ] Permitir listar os pacientes já atendidos (finalizados).

- [ ] Permitir a visualização, inclusão e manutenção do cadastro de filas nas unidades de saúde do município.

- [ ] Permitir a exibição de painel de chamadas, com letras e cores visíveis à distância, onde o nome do paciente,
      senha, profissional da chamada e local sejam exibidos, de modo a possibilitar aos profissionais de saúde
      realizar chamadas conforme ordem na fila de atendimentos, não sendo necessário sair do atendimento ou do local
      de trabalho para chamar o paciente.

- [ ] Permitir ao profissional da saúde realizar o registro de painel de chamada.

- [ ] Permitir a configuração do painel de chamadas, determinando quais fila de atendimento serão exibidas no painel.

- [ ] Permitir à enfermagem realizar a impressão de documentos comprobatórios necessários para a conclusão e
      prosseguimento dos processos realizados dentro do atendimento.

- [ ] Permitir a visualização, inclusão e alteração das prescrições médicas, possibilitando realizar uma prescrição
      médica contendo as seguintes informações: tipo de receitas padrões (simples e especial), medicamento, posologia,
      via de administração, quantidade, duração do tratamento, Contínuo (Sim, Não).

- [ ] Permitir carregar as informações do medicamento ativo para a prescrição e administração ao paciente, buscando o
      cadastro desejado pelo nome ou código registrado no medicamento, possibilitando ao profissional de saúde
      informar os medicamentos na prescrição sem a necessidade de cadastrar todas as informações do fármaco.

- [ ] Permitir ao profissional de saúde identificar os medicamentos de uso contínuo prescritos ao paciente,
      possibilitando renovar a prescrição de atendimentos anteriores no atendimento atual.

- [ ] Permitir gerar automaticamente receitas de diferentes tipos, simples e especial, de acordo com a medicação
      inserida na prescrição, caso o medicamento seja controlado o sistema deverá gerar uma receita do tipo especial,
      caso não seja a receita gerada será do tipo simples.

- [ ] Permitir o cadastro de uma prescrição manual, possibilitando inserir informações em texto livre, sem a
      necessidade de inserir os campos de uma prescrição automatizada, possibilitando selecionar se trata-se de uma
      prescrição especial ou simples, realizando prescrição de medicamentos que não estejam cadastrados na farmácia
      básica.

- [ ] Permitir editar e/ou excluir as receitas geradas.

- [ ] Permitir a tramitação dos medicamentos entre as receitas do tipo simples, possibilitando alterar os medicamentos
      entre as receitas, assim como realizar a divisão de medicamentos do mesmo tipo em mais de uma receita.

- [ ] Permitir emissão das prescrições registradas no atendimento, contendo o seguinte conjunto de informações: no
      cabeçalho, o logotipo do município e do SUS, nome do estado e município, nome da receita e se ela é simples ou
      especial; conter informações da unidade de saúde e também do paciente, como nome, idade, sexo, RG e CPF,
      telefone e endereço; para os medicamentos prescritos deve apresentar o nome do medicamento, posologia, duração e
      quantidade.

- [ ] Permitir visualização, inclusão e manutenção da estratificação de risco do paciente, com o seguinte conjunto de
      informações: Tipo da estratificação (com as opções: Gestante, Criança menor de 1 ano, Idoso, Hipertenso,
      Diabético, Saúde Mental, Saúde Bucal), Nível do risco (com as opções: Alto, Médio, Baixo), e Observação.

- [ ] Permitir a consulta em tempo real do estoque de medicamentos, possibilitando ao profissional de saúde verificar
      se o medicamento selecionado possui ou não estoque disponível na unidade.

- [ ] Permitir visualização, inclusão e manutenção do cadastro dos pacientes, possibilitando o registro das
      informações necessárias.

- [ ] Permitir a visualização das informações de evolução do paciente através do SOAP ou Anamnese/Exames Físicos
      conforme configuração de parâmetro realizado na unidade de saúde.

- [ ] Permitir registrar e emitir declaração de comparecimento ou atestado, possibilitando ao paciente justificar as
      horas em que precisou ficar ausente de suas funções (serviço, aula, outros).

- [ ] Permitir a flexibilização para validação do preenchimento obrigatório do CID (para atendimentos de atenção
      básica, especializado ou urgência) ou CIAP / Condição avaliada (para atendimentos de atenção básica) na evolução
      e encaminhamento do paciente, possibilitando configurar para quais CBOs será obrigatório. preencher o CID ou o
      CIAP.

- [ ] Permitir ao profissional de saúde visualização, inclusão e alteração das administrações de medicamentos
      possibilitando realizar a administração sem que ela tenha um vínculo com uma prescrição.

- [ ] Permitir a visualização, inclusão e manutenção de encaminhamentos para outras especialidades dentro do
      atendimento clínico, com o registro das seguintes informações: CID, Especialidade, Tipo (Consulta, Retorno),
      Prioridade (Normal, Urgente), Investigação/Diagnóstico e Indicação de referência.

- [ ] Permitir no atendimento odontológico, na avaliação da evolução a visualização, inclusão e alteração de
      informações de vigilância em saúde bucal.

- [ ] Permitir, através do atendimento clínico, requisitar exames/procedimentos citopatológicos, validando sexo e
      idade do paciente com o procedimento/exames solicitados.

- [ ] Permitir visualizar e realizar a administração de medicamento durante o período de observação, a partir de uma
      prescrição interna registrada ou no encaminhamento para observação ou dentro da própria administração.

- [ ] Não deverá permitir a alteração de dados da prescrição, devendo inserir apenas o lote do medicamento que será
      administrado.

- [ ] Permitir parametrizar por entidade uma validação relacionada a diferença do município de endereço do paciente
      com o município da unidade, permitindo informar tratar-se de inclusão de atendimento, requisição e
      encaminhamento quando o paciente que não pertencer ao município.

- [ ] Permitir a emissão e impressão do prontuário constante no registro eletrônico saúde do paciente, por natureza
      (deve possuir uma natureza para o prontuário clínico, e outra para o prontuário odontológico), para que as
      informações do atendimento possam ser emitidas conforme necessidade do paciente.

- [ ] Ao selecionar a opção de imprimir, o sistema deverá solicitar que o usuário informe o motivo da impressão do
      prontuário, possibilitando inserir observação, além de exibir um aviso de responsabilidade.

- [ ] Permitir identificar os pacientes que retornaram da observação com a situação “Reavaliar”, permitindo a
      continuidade e desfecho do atendimento, armazenando todo o histórico, além de exibir um aviso ao profissional
      que encaminhou para observação do atendimento retornado assim que o paciente for encaminhado novamente para
      atendimento.

- [ ] Permitir que profissionais de saúde bucal, no atendimento odontológico, possam diagnosticar, planejar,
      visualizar e alterar procedimentos odontológicos, identificando problemas dentários por local (Face mesial, Face
      distal, Face lingual/Palatal, Face vestibular, Face oclusal , Dente, Raiz, Quadrante, Sextante e Arcada) e
      situações representadas por cores no plano odontológico do paciente.

- [ ] Permitir a flexibilização na criação de relatórios, através de informações disponíveis nas requisições de exames
      e procedimentos realizados nos atendimentos.

- [ ] Permitir a emissão de relatório de cadastro individual de paciente, contendo ao menos: período de cadastro,
      paciente, sexo, status da ficha, faixa etária do paciente, profissional e equipe, tal relatório deve conter a
      opção de selecionar somente o último questionário do paciente ou não.

- [ ] Permitir a flexibilização das regras de procedimentos gerados na administração de medicamentos, possibilitando à
      unidade de saúde escolher qual será o procedimento gerado automaticamente quando for registrada uma
      administração de medicamentos no atendimento ou na observação.

- [ ] Permitir a criação de relatórios referente às ausências de profissionais, contendo as seguintes informações:
      Profissional, Período de ausência, Tipo de ausência, unidades e agendas.

- [ ] Permitir a flexibilização na criação de relatórios através de informações disponíveis nos medicamentos de uso
      contínuo do paciente, contendo as seguintes informações: medicamento, posologia, via, quantidade.

- [ ] Permitir consultar e visualizar as solicitações em lista de espera do paciente, permitindo realizar a busca por
      nome social (se houver), nome, CNS ou CPF.

- [ ] Permitir visualizar os anexos do prontuário do paciente.

- [ ] Permitir a inclusão de documentos digitalizados para que seja possível anexar prontuários ou exames anteriores,
      para usuários com permissão de adicionar anexo.

- [ ] Permitir a exibição de todos os documentos digitalizados do paciente, para usuários que possuem permissão para
      visualizar a lista.

- [ ] Permitir o consumo de cotas no agendamento de consultas, sempre que houver uma cota disponível para consumo da
      unidade dentro do período do agendamento.

- [ ] Permitir cancelar agendamentos de especialidades transferidos, liberando a vaga da agenda para que outro
      paciente possa ocupar a vaga, devendo preencher as seguintes informações: motivo do cancelamento e observação do
      cancelamento, com a possibilidade de realizar o reagendamento do paciente cancelado para outra data.

- [ ] Permitir agendar a execução de procedimentos de urgência/encaixe de pacientes meio a outros horários já
      agendados, para casos de urgência e demais fatores adversos da rotina diária das unidades.

- [ ] Este agendamento deverá conter uma indicação, para que seja diferenciado dos demais, e identificado rapidamente.

- [ ] Permitir ao profissional regulador efetuar a autorização ou rejeitar um procedimento da lista de espera,
      informando a data em que o procedimento foi autorizado, e no caso de ser rejeitado, informando o motivo.

- [ ] Permitir listar e filtrar todos os agendamentos de consultas agendadas, e que por algum motivo foram devolvidos
      para reagendamento (cancelamento da agenda, edição da agenda, transferências que não contemplaram todos os
      agendamentos, erros na transferência).

- [ ] Permitir cancelar agendas de procedimentos cadastradas, caso a agenda já possua outro agendamento registrado,
      devendo alertar quais os agendamentos foram afetados pelo cancelamento, possibilitando o usuário transferir ou
      cancelar os agendamentos, com a devolução dos mesmos para reagendamento na lista de espera.

- [ ] Permitir cancelar agendamento de especialidade de um paciente na central de regulação, liberando a vaga da
      agenda para que outro paciente possa ocupar, devendo preencher o motivo do cancelamento e observação do
      cancelamento, possibilitando encaminhar o agendamento cancelado para o reagendamento.

- [ ] Permitir cancelar agendamentos de procedimentos de um ou vários pacientes ao mesmo tempo, liberando as vagas da
      agenda para que outros pacientes possam ocupar.

- [ ] Permitir realizar a administração de medicamentos que forem trazidos pelos pacientes, sem vínculo com o estoque,
      e neste caso, ocultando o campo de lote do sistema, sendo necessário utilizar um campo texto para que registro
      do lote.

- [ ] Exibir na fila de agenda de procedimentos de ultrassonografia, os exames agendados na unidade de saúde
      prestadora, possibilitando registrar presença ou ausência.

- [ ] No caso da presença, deverá solicitar o preenchimento da priorização (deficiente, gestante e criança de colo),
      não deve ser possível registrar presença de datas futuras, e para ausência, não deve ser apresentado na fila, e
      a situação do agendamento deve ser alterada conforme motivo informado pelo profissional de saúde, com a
      realização do reagendamento ou cancelamento.

- [ ] Permitir replicar uma agenda de especialidade cadastrada, facilitando a criação de uma nova agenda.

- [ ] Deve possibilitar alterar todas as informações ao replicar uma agenda de especialidade, inclusive com a
      verificação, ao salvar, se a agenda não conflita com outra agenda já cadastrada para o mesmo profissional,
      devendo verificar ainda caso possua feriado, ou ausência de profissional cadastrado, não permitindo criar
      horário na agenda para esses dias/horários.

- [ ] Permitir imprimir comprovante de agendamento do paciente após agendar execução de procedimento.

- [ ] Permitir a criação de painéis de chamada personalizados conforme a necessidade de cada unidade de atendimento,
      contendo no mínimo o nome do painel e a unidade de atendimento que ele pertence.

- [ ] Permitir a configuração do painel para exibição ou não do nome do profissional que efetuou a chamada.

- [ ] Permitir visualizar o histórico dos agendamentos do paciente no agendamento da central de regulação.

- [ ] Permitir agendar atendimento de retorno do paciente no desfecho dos atendimentos originados por um agendamento.

- [ ] Permitir a emissão de relatório analítico de agendamentos de consultas por profissional, listando informações
      dos agendamentos conforme filtros de unidade prestadora, profissional, especialidade, data e situação.

- [ ] Permitir a emissão de relatório de agendamentos de consultas por paciente, aplicando filtros por convênio,
      unidade prestadora, profissional, especialidade, situação, intervalo de data e cliente.

- [ ] Permitir excluir agendas de especialidades cadastradas desde que não possuam agendamentos cadastrados.

- [ ] Permitir configurar notificação SMS de agendamento de Consulta Especialidade, com o envio aos pacientes de forma
      automática.

- [ ] Deverá ser exibido na mensagem o nome do paciente, especialidade, data, horário e a unidade ou laboratório.

- [ ] Permitir registrar no atendimento a execução ou não execução de procedimentos que foram registrados no
      agendamento de consulta, o registro deverá ser obrigatório para poder concluir o atendimento.

- [ ] Permitir emitir a Ficha de Atendimento, preenchida com todas as informações registradas pelos profissionais que
      foram envolvidos no atendimento, contando as informações relacionadas à unidade de atendimento, paciente,
      atendimento, biometria, evolução, procedimentos e prescrições.

- [ ] Permitir iniciar atendimento de consulta virtual através de videoconferência, realizada entre o profissional do
      atendimento e o paciente.

- [ ] Permitir realizar evolução do paciente dentro dos atendimentos domiciliares.

- [ ] Permitir visualizar o acompanhamento odontológico do paciente por meio do registro eletrônico (prontuário
      odontológico), para atendimentos na unidade (presencial ou virtual) ou domiciliar, abertos e finalizados,
      visualizando todas as ações registradas no atendimento odontológico.

- [ ] Permitir o registro das aplicações das vacinas.

- [ ] Permitir a emissão de relatório de vacinações realizada aos pacientes.

- [ ] Permitir ao encaminhar o paciente para observação, realizar a impressão de prescrições para uso interno.

- [ ] Permitir realizar o controle e configuração de permissões de acessos ao usuário, por contextos de Entidade,
      Unidade e informações do profissional vinculado (Unidades e Equipes).

- [ ] Permitir que várias receitas sejam emitidas durante o atendimento do paciente, separando os medicamentos em suas
      respectivas receitas no momento da impressão.

- [ ] Permitir a impressão de requisição de exames, separando automaticamente os exames por grupos de procedimentos
      direcionando assim cada requisição para o devido prestador.

- [ ] Permitir registrar e realizar a manutenção da estratificação de risco do paciente durante os atendimentos,
      atualizando automaticamente as informações que forem registradas no atendimento, a cada novo atendimento além de
      possibilitar informar a estratificação, deverá carregar as informações anteriormente preenchidas, permitindo
      alterá-las.

- [ ] Permitir consultar e acessar nos ambientes de atendimentos ambulatoriais ou de urgência os prontuários dos
      pacientes, mesmo que estes não estejam nas filas.

- [ ] A busca para acesso ao prontuário deve seguir o mesmo padrão de busca das demais pesquisas: por nome, CNS e CPF.

- [ ] Permitir gerar o arquivo para envio ao Sistema de Informações Ambulatoriais, assim como visualizar os dados
      gerados.

- [ ] Permitir inserir mídias na configuração dos painéis de chamada, podendo ser dos tipos vídeo (permitindo inserir
      URL de vídeos do Youtube) ou imagem (permitindo inserir arquivos no formato jpg, png e gif).

- [ ] Permitir, nos prontuários clínico e odontológico, a exibição da linha do tempo de cada atendimento, exibindo
      data e hora de quando houve entrada, triagem, acolhimento, início do atendimento, os encaminhamentos para
      observações e as avaliações, reavaliações de atendimento, o retorno das observações e a conclusão/desfecho do
      atendimento, devendo ordenar por data/hora de cada processo realizado no atendimento.

- [ ] Possibilitar exibir no painel, além do paciente que está sendo chamado para o atendimento, no mínimo os últimos
      três pacientes chamados anteriormente, informando o nome ou senha e o local da chamada.

- [ ] Permitir a realização de chamadas por voz do painel de chamadas, permitindo a configuração da frase de chamada e
      do nome do paciente seja personalizada conforme a necessidade da unidade, permitindo testar a configuração
      realizada antes de finalizar.

- [ ] Permitir registrar mais de uma declaração de comparecimento para acompanhante do paciente, possibilitando que o
      mesmo possa justificar as horas em que ficou ausente de suas funções.

- [ ] Permitir a inclusão, manutenção e visualização de prescrições oftalmológicas, possibilitando ao profissional de
      saúde realizar uma prescrição médica para o paciente.

- [ ] Somente o profissional que incluiu a prescrição oftalmológica pode realizar a sua manutenção, enquanto o
      atendimento ainda não estiver finalizado.

- [ ] Permitir para pacientes do sexo feminino, informar dados sobre gestação, e estas informações devem estar
      vinculadas ao cadastro do paciente, permitindo também manutenção na evolução do atendimento, possibilitando que
      profissionais possam realizar o acompanhamento contínuo de gestantes até o parto, em caso de gestação, a
      informação deve ser exibida em todos os atendimentos, até que o profissional sinalize não ser mais gestante.

- [ ] Permitir ao profissional de saúde avaliar, por paciente, procedimentos requisitados, agendados, realizados e
      liberados através do sistema, informando obrigatoriamente uma descrição da avaliação do resultado,
      possibilitando alterar uma avaliação quantas vezes forem necessárias enquanto o atendimento não for finalizado,
      armazenando no atendimento que a avaliação dos procedimentos foi realizada.

- [ ] Permitir destacar na fila de atendimento os pacientes com idade inferior a 2 (dois) anos e superior a 60
      (sessenta) anos, em negrito e com cor diferenciada.

- [ ] Permitir a atualização em tempo real da informação do estoque consumido de medicamentos administrados no
      atendimento, possibilitando manter o estoque do medicamento sempre atualizado.

- [ ] Permitir a visualização, inclusão e manutenção de encaminhamentos para outras especialidades dentro do
      atendimento odontológico.

- [ ] Possibilitar exibir o saldo do medicamento prescrito, sem restringir a prescrição mesmo que não exista saldo na
      unidade de saúde.

- [ ] Permitir a emissão de relatório que possibilite análise do saldo em estoque de produtos dos estabelecimentos de
      saúde aplicando filtros por unidade, centro de custo, grupo do material, subgrupo do material, produto, lote do
      produto, data do saldo, situação cadastral do material, validar o estoque crítico, apresentar produtos com saldo
      zerado.

- [ ] Permitir cadastrar e manter informações de situações dentárias que serão utilizadas no planejamento
      odontológico, com as seguintes informações: situação, tipo de arcada, dente, localização e cor.

- [ ] Permitir registrar presença ou ausência do agendamento de procedimento para pacientes agendados na unidade de
      saúde prestadora.

- [ ] Permitir confirmar a presença do paciente agendado para consulta eletiva ou retorno na unidade de saúde e
      incluí-lo na fila de atendimento.

- [ ] Permitir ao profissional de saúde realizar registros clínicos que auxiliem a obtenção de um diagnóstico
      assertivo, adicionando informações detalhadas acerca do quadro clínico do paciente, conforme o método da
      anamnese tradicional, verificando o histórico da doença, histórico familiar, entre outros.

- [ ] Permitir a transferência de pacientes para outros estabelecimentos, conforme a necessidade diagnosticada ainda
      no seu acolhimento na triagem.

- [ ] Permitir na fila da recepção de atendimento realizar a finalização dos atendimentos, desde que estes ainda não
      tenham sido iniciados.

- [ ] Permitir na avaliação da evolução do atendimento, visualizar e atualizar a vacinação do paciente.

- [ ] Permitir listar e filtrar as visitas domiciliares realizadas pelos profissionais de saúde.

- [ ] Permitir incluir e editar as visitas domiciliares e territoriais em conformidade com e-Sus.

- [ ] Permitir a emissão do relatório do boletim de visitas aplicando filtros por período, nome social, unidade,
      profissional, desfecho, motivo, idade inicial em anos, idade inicial, em meses, idade inicial em dias, idade
      final em anos, idade final em meses, idade final em dias.

- [ ] Permitir informar consumo alimentar do paciente na evolução do atendimento, para verificação de adequação com a
      sua faixa etária em conformidade com e-Sus.

- [ ] Permitir finalizar atendimento e registrar o motivo do desfecho para finalização do atendimento do paciente com
      usuários profissionais de saúde.

- [ ] Permitir através do atendimento, cadastrar e fazer manutenção das solicitações de procedimentos/exames SADT,
      citopatológicos e mamografia conforme orientação médica, validando a compatibilidade entre o sexo e idade
      permitido para realização do procedimento.

- [ ] Permitir ao usuário autorizado, registrar quadro de cobertura para imunobiológico.

- [ ] Permitir ao usuário autorizado, registrar produto imunobiológico (vacina).

- [ ] Não permitir a aplicação da mesma vacina/imunobiológico para o mesmo paciente, no mesmo registro, mesmo que
      possua estratégia e doses diferentes.

- [ ] Permitir flexibilização na criação de relatórios através de informações de cadastros de domicílios/famílias.

- [ ] Permitir que na finalização do atendimento, seja possível realizar a inclusão e emissão do Termo de Isolamento,
      que deverá conter o período de afastamento e o nome das pessoas que residem no mesmo endereço.

- [ ] Permitir listar no atendimento do paciente os procedimentos sugeridos conforme configuração realizada por
      especialidade do profissional de saúde, possibilitando selecionar o procedimento sugerido para realizar no
      atendimento, informando a CID, caso o procedimento exija, e a quantidade do procedimento.

- [ ] Permitir alterar o cadastro de especialidade para que o profissional possa configurar por especialidade, se o
      atendimento é especializado ou em atenção básica e permita vincular procedimentos que serão apresentados no
      atendimento.

- [ ] Permitir informar o material a ser examinado para cada exame solicitado.

- [ ] Permitir configurar obrigatoriedade do CNS para realizar o agendamento, o sistema deverá estar configurado com o
      padrão que exige CNS no agendamento.

- [ ] Permitir na observação bolar a administração de medicamentos que não sejam mais necessários, mediante a uma
      confirmação e justificativa do usuário que irá bola a medicação.

- [ ] Permitir vincular quais procedimentos poderão ser realizados para cada ficha do e-Sus de acordo com as regras
      disponibilizadas.

- [ ] Permitir baixar arquivos gerados na exportação do e-Sus por competência, para que permita importar no PEC e
      gerar seu faturamento da entidade.

- [ ] Permitir listar arquivos exportados por competência de registros gerados para o e-Sus.

- [ ] Permitir ao profissional de saúde realizar a impressão de documentos comprobatórios necessários para a conclusão
      e prosseguimento adequado dos processos realizados dentro do atendimento, possibilitando realizar as impressões
      de prescrições, requ

## Item 33 - Software de Agente Comunitário de Saúde

*Fonte: Anexo I, página 134/194.*

- [ ] **1.** Permitir que os profissionais do município sejam vinculados ao sistema gerenciador das informações de
      saúde do município, e que possa ser definido um perfil específico para as ações relacionadas à Atenção Básica.

- [ ] **2.** Permitir que no sistema gerenciador sejam definidas quais rotinas poderão ser utilizadas pelos
      profissionais que utilizarão o dispositivo móvel.

- [ ] **3.** Permitir que os profissionais possam acessar o dispositivo móvel informando o usuário e a senha, conforme
      parâmetros do sistema gerenciador.

- [ ] **4.** Permitir que o aplicativo realize a importação automática dos dados cadastrados no sistema gerenciador de
      saúde (bairros/logradouros, Profissionais, turmas), sempre que conectado à internet.

- [ ] **5.** Permitir que as informações relacionadas às áreas de abrangências de cada Profissional Agente Comunitário
      de Saúde (Pacientes/Domicílios) sejam sincronizadas com o aplicativo.

- [ ] **6.** Permitir que os cadastros sejam realizados mesmo que o dispositivo móvel não esteja conectado à internet.

- [ ] **7.** Permitir que as equipes de Atenção Básica possam cadastrar os domicílios pertencentes a sua área de
      abrangência (Micro Área), bem como suas características sócio-sanitárias.

- [ ] **8.** Permitir que os Agentes Comunitários de Saúde possam registrar as visitas domiciliares realizadas em sua
      área de abrangência (Micro Área)

- [ ] **9.** Permitir que as equipes de Atenção Básica possam registrar as Atividades Coletivas, realizadas em sua
      área de abrangência (Micro Área)

- [ ] **10.** Permitir que os cadastros realizados pelas equipes de Atenção Básica no dispositivo móvel possam ser
      sincronizados para o sistema gerenciador de saúde para a realização da produção e envio dos arquivos ao
      Ministério da Saúde.

- [ ] **11.** Permitir que os dados cadastrados no sistema gerenciador de saúde (bairros/logradouros, Profissionais,
      turmas, pacientes e domicílios), também possam ser importados para o dispositivo móvel de forma manual, sendo
      que o usuário poderá informar quais informações deseja importar.

- [ ] **12.** Permitir que o código do responsável familiar cadastrado no sistema do município seja usado para a
      pesquisa neste aplicativo.

- [ ] **13.** Permitir que os Agentes Comunitárias de Saúde possam registrar as visitas domiciliares realizadas em
      suas respectivas áreas de abrangência (micro áreas), conforme os padrões estabelecidos pelo Ministério da Saúde
      através do sistema e-SUS.

- [ ] **14.** Permitir que as equipes de atenção básica possam registrar as atividades coletivas, realizadas em sua
      área de abrangência (micro área), conforme padrões estabelecidos pelo Ministério da Saúde através do sistema
      e-SUS.

- [ ] **15.** Permitir que as equipes de atenção básica possam registrar o consumo alimentar dos pacientes conforme
      faixa etária.

- [ ] **16.** Permitir que os profissionais responsáveis possam consultar as exportações realizadas, possibilitando a
      análise de possíveis inconsistências para que as devidas providências sejam tomadas.

## Item 34 - Software de Meio Ambiente

*Fonte: Anexo I, páginas 134-143/194.*

> **Nota literal do edital:** os requisitos de Meio Ambiente são apresentados sem numeração, divididos no documento pelos títulos abaixo.

### MÓDULO INTERNO

- [ ] Sistema só pode ser acessado através de senha de usuário

- [ ] Possui cadastro geral de empreendedores

- [ ] Possui controle dos processos da Secretaria

- [ ] Possui controle dos protocolos da Secretaria

- [ ] Possui controle de vistorias

- [ ] Possui controle de licenciamento

- [ ] Possui emissão de taxas de licenciamento

- [ ] Possui controle de podas e supressões sem a necessidade de criação de processo

- [ ] Possibilita a criação de processo a partir de solicitações de poda e/ou supressão

- [ ] Permite o lançamento de coordenadas do GPS

- [ ] Possibilita a parametrização através de fórmula, da lei municipal de taxas

- [ ] Calcula as taxas de licenciamento automaticamente a partir do enquadramento do empreendimento, de acordo com a
      legislação municipal

- [ ] Possui sistema de controle conforme portarias ou resoluções do Conselho Estadual do Meio Ambiente, impacto
      local, impedindo a entrada de solicitações que não caibam ao município

- [ ] Segurança de emissão e alteração das licenças por senhas

- [ ] Possui sistema de tramitação de documentação, passando de responsável para responsável, podendo delegar etapas
      seguintes

- [ ] Possui sistema de alerta de vencimentos de todas as datas e de todos os documentos

- [ ] Permite a implantação de formulários padrão da Secretaria ou conforme Legislação Municipal

- [ ] Geração dos documentos em modelo PDF, para publicação na internet

- [ ] Possibilita cadastro de usuário apenas para consulta ou gerenciamento

- [ ] Permite a inserção de atividades secundárias nos protocolos de licenciamento

- [ ] Possibilita cadastro de usuários para acesso restrito a determinado módulo

- [ ] Permite anexação de fotos nos processos

- [ ] Permite a digitalização de quaisquer documentos referente aos processos

- [ ] Permite anexação de arquivos em qualquer etapa da tramitação dos processos

- [ ] Possui numeração automática de todos os tipos de documentos produzidos pela Secretaria

- [ ] Permite o lançamento do número do protocolo geral do Município

- [ ] Permite sequencial numérico anual ou corrido, independente de exercício

- [ ] Controle da numeração dos documentos, sequencial por tipo de documento

- [ ] O sistema de alerta é configurável conforme necessidade de cada usuário, pelo nível e dias ou por setor

- [ ] Possui ferramenta para envio de e-mail diretamente no sistema

- [ ] Permite a definição dos tipos de trâmite que permitirão o envio de e-mails, com a definição da forma de envio,
      podendo ser manual, automático ao inserir, automático ao executar, ou considerar prazo

- [ ] Envia e-mail para os endereços cadastrados no cadastro do empreendedor e dos responsáveis técnicos vinculados
      quando inserido o trâmite cujo envio esteja configurado para automático ao inserir

- [ ] Envia e-mail para os endereços cadastrados no cadastro do empreendedor e dos responsáveis técnicos vinculados
      quando executado o trâmite cujo envio esteja configurado para automático ao executar

- [ ] Apresenta botão enviar e-mail para os trâmites cujo trâmite esteja configurado para enviar e-mail manualmente

- [ ] Possui tela que apresenta todos os trâmites cujo envio de e-mail esteja habilitado, mas que não tenham disparado
      o envio até o momento

- [ ] Possui tela que apresenta todos os trâmites que já tenham enviado e-mail

- [ ] Mostra mensagem em tela quando já houve o envio de e-mail, e há nova tentativa de envio, para trâmites cuja
      configuração de envio seja manual

- [ ] Possui simulação de taxas de licenciamento a partir do enquadramento do empreendimento, sem abertura de processo
      ou qualquer outro registro

- [ ] Geração de valores para cobrança de cobranças das taxas

- [ ] Possui modelos de documentos configuráveis conforme necessidade do Município

- [ ] Permite alteração dos documentos antes da gravação do mesmo, sem a necessidade de alteração do modelo original

- [ ] Possibilita pesquisas dos documentos por CPF, CNPJ, número do Processo, número do protocolo, endereço do
      empreendedor, nome do empreendedor e número do documento

- [ ] Tem a opção de localização rápida do processo, com a situação do mesmo (se está em análise, deferido ou
      indeferido)

- [ ] Emissão de negativa florestal, com pesquisa automática no Banco de Dados

- [ ] Opção para colocar o preposto do processo

- [ ] Opção para seleção de zoneamento, bairro, logradouro, informações sobre matrícula e área do imóvel

- [ ] Link para verificação de autenticidade de ART (CREA e CRBio) e RRT (CAU)

- [ ] Editor de textos próprio no sistema, sem a necessidade de utilizar sistemas externos como: Word, Excel, Open
      Office

- [ ] Editor de texto possui todas as funcionalidades mínimas para emissão de todos os documentos da secretaria

- [ ] Editor permite a cópia de texto de outros editores, para o editor do sistema

- [ ] Todas as informações de processos, tramitações e textos são gravadas no banco de dados

- [ ] Geração de código de segurança nas licenças a serem publicadas na WEB

- [ ] Possui assinatura eletrônica de documentos

- [ ] Possibilita solicitação de múltiplas assinaturas eletrônicas para todos os documentos, com seleção dos usuários
      que devem assinar o mesmo

- [ ] Ambiente para consulta de todos os documentos em que foi solicitada a assinatura do usuário, com acesso na tela
      inicial do sistema

- [ ] Possibilidade de consulta ao texto do documento, assinatura ou rejeição do mesmo

- [ ] Possibilita ao responsável pela emissão do documento a visualização da assinatura eletrônica ou rejeição por
      técnico vinculado

- [ ] Gravação da data assinatura eletrônica ou da rejeição de assinatura no banco de dados

- [ ] Funcionalidade que apresente no rodapé dos documentos com múltiplas assinaturas eletrônicas o nome, cargo,
      formação, tipo de registro número de registro e data da assinatura eletrônica de todos os profissionais que
      assinaram o mesmo

- [ ] Possibilita emissão de documentos com mais de um técnico responsável

- [ ] Impede alteração de pareceres e laudos após o deferimento ou indeferimento do protocolo

- [ ] Possibilita o acompanhamento dos processos de licenciamento através do mapa do município, direto no sistema

- [ ] Opção para captura de coordenadas geográficas sem utilização de outro equipamento

- [ ] Controle dos prazos para renovação e de condicionantes nos documentos licenciatórios

- [ ] Possibilita publicação dos documentos emitidos por lotes, filtrados por data, tipo de documento ou por
      empreendedor

- [ ] Possibilita a publicação de trâmites emitidos por lote, filtrados por data, tipo de trâmite ou por empreendedor

- [ ] Possui controle de início de licenciamento, informando o tamanho do empreendimento

- [ ] Possui bloqueio de solicitação para atividade não indicada como licenciável

- [ ] Possibilita importação de cadastro do empreendedor e responsável do processo iniciado pela web sem a necessidade
      de digitação destas informações

- [ ] Possui alerta de Técnico cadastrado no portal na tela inicial

- [ ] Possui alerta para importação de planilhas de resíduos industriais enviados através do portal

- [ ] Possui alerta para importação de denúncia realizada pelo portal

- [ ] Permite recusa de denúncia realizada pelo portal, com descrição do motivo

- [ ] Permite importação dos anexos da denúncia enviados pelo portal

- [ ] Possibilita a recusa de envio de planilha de resíduos, com descrição do motivo, para reenvio por parte do
      empreendedor ou responsável técnico

- [ ] Possui alerta para importação de Medições de Efluentes enviados através do Portal

- [ ] Possibilita a recusa de medição de efluente, com descrição do motivo, para reenvio por parte do empreendedor ou
      responsável técnico

- [ ] Possui alerta de solicitações e processos online enviados do portal

- [ ] Possibilita a conferência de anexos enviados de maneira online através da importação dos arquivos e exclusão dos
      que não são utilizados

- [ ] Possibilita a visualização das solicitações web e baixar seus anexos sem importar para o sistema

- [ ] Possibilidade de importar processos e solicitações online

- [ ] Possui classificação e filtro das solicitações por situação, separando as que estão em rascunho, aguardando
      importação, aceitas e recusadas

- [ ] Possibilidade de recusa de solicitações abertas pelo portal, com definição do motivo da recusa

- [ ] Possibilidade de excluir e editar solicitações duplicadas ou errôneas

- [ ] Possibilita utilização de "marca d'agua" nos documentos emitidos

- [ ] Possibilita o repasse dos processos físicos, com controle da posse e histórico

- [ ] Possui sinalização de processo aguardando recebimento para cada usuário

- [ ] Possui armazenamento e pesquisa aos históricos de repasse e confirmações de recebimento em cada processo

- [ ] Possui ferramenta de pesquisa da localização física dos processos, através da Opção "Meus Processos"

- [ ] Permite lançamento e tramitação de processos internos

- [ ] Possui definição de tramitação padrão para processos de licenciamentos, gerando avisos na tela inicial do
      sistema para cada responsável envolvido em cada processo

- [ ] Possui sinalização de processo encaminhado a cada responsável para a confirmação do recebimento

- [ ] Possui sistemática de troca de empreendedor no processo, com registros de período de responsabilidade

- [ ] Possui sistemática de revogação de licenças, possibilitando emissão de documento substitutivo ou cassação de
      direito de operação

- [ ] Possui controle de emissão de documentos da Secretaria com modelos pré-definidos, sem necessidade de processo de
      licenciamento

- [ ] Permite vinculação dos tipos de documento às atividades de licenciamento

- [ ] Impede a solicitação de documento licenciatório não previsto para a atividade selecionada

- [ ] Possui cadastro de empresas mineradoras

- [ ] Possibilita gerenciamento das empresas de mineração que atuam no município, com acompanhamento por localização,
      atividade e condições de lavra

- [ ] Possibilita a emissão de Certidão de Cadastramento Municipal de Empresa Mineradora

- [ ] Possui cadastro de espécies arbóreas, com separação por categoria, família, nome popular e científico, grau de
      ameaça e classificação de origem

- [ ] Possui consulta rápida de espécies arbóreas no menu do sistema

- [ ] Possui calculadora de DAP e Cubagem, com demonstração de valores por espécies de valor de toras, lenha/resíduos
      e volumes cilíndricos

- [ ] Possui configuração de fórmula para fator de forma de material florestal

- [ ] Possui alimentação automática dos documentos com as espécies a serem suprimidas, com os valores volumétricos
      gerados

- [ ] Permite o lançamento de serviços de manutenção por exemplar

- [ ] Permite controle do estado fitossanitário

- [ ] Permite marcação da coordenada geográfica do exemplar

- [ ] Possibilita a visualização do mapa com a localização de cada exemplar a partir das coordenadas inseridas

- [ ] Possibilita o registro de doação de mudas pela secretaria

- [ ] Permite anexação de arquivos por exemplar

- [ ] Permite registro de remoção de exemplares arbóreos

- [ ] Possibilita a visualização dos processos através do mapa do município, podendo separar processos de
      licenciamento dos processos de Inquérito Civil

- [ ] Possibilita a emissão de ofícios, memorando e demais documentos de comunicação oficial da
      Secretaria/Departamento com acesso direto sem a necessidade de processos de licenciamento

- [ ] Possibilita a geração de modelos de condicionantes para cada atividade, com montagem automatizada do documento

- [ ] Possibilita a edição do documento sem a intervenção nos modelos

- [ ] Possibilita a edição dos modelos diretamente no editor, no ato da emissão do documento

- [ ] Possui cadastro de condicionantes, com dias de prazo padrão

- [ ] Possibilita a seleção de condicionantes na emissão do documento, com carregamento de informações no texto e a
      geração de aviso para cobrança dos prazos para cumprimento das respectivas condicionantes

- [ ] Possui atualização automática do prazo das condicionantes a partir do cumprimento parcial das mesmas

- [ ] Possui importação de condicionantes cumpridas e enviadas pelo ambiente externo pelo empreendedor

- [ ] Possibilita a recusa de cumprimento de condicionante, com descrição do motivo, para reenvio por parte do
      empreendedor ou responsável técnico

- [ ] Possui registro automático do cumprimento de condicionante quando importada pelo usuário do sistema

- [ ] Possui cadastro de responsáveis técnicos, com formação, cargo, registro e anexação de comprovantes

- [ ] Possui ferramenta de importação dos cadastros de responsáveis técnicos realizados a partir do portal

- [ ] Possui cadastro de Resíduos Industriais e Substâncias Químicas de acordo com as determinações do CONAMA, sua
      forma de armazenamento, acondicionamento, tratamento e destinação

- [ ] Possibilita a inserção dos Planos de Gerenciamento de Resíduos para cada processo, com definição de validade,
      responsabilidade técnica, resíduos, destinação de anexação de comprovantes de licenciamento dos receptores

- [ ] Possibilita a geração das Planilhas de Resíduos vinculadas aos planos, com periodicidade podendo ser mensal,
      bimestral, trimestral, quadrimestral, semestral ou anual, com responsabilidade técnica, lista de resíduos e sua
      respectiva forma de armazenamento, acondicionamento, tratamento e destinação com anexação das Notas Fiscais

- [ ] Possibilita a impressão dos Planos e Planilhas a partir de modelo configurável

- [ ] Possui ferramenta para importação dos planos e planilhas informados pelo Portal do Meio Ambiente com vinculação
      automática aos processos e geração instantânea dos prazos seguintes para entrega de planilhas

- [ ] Possui cadastro de parâmetros de efluentes, contendo limite mínimo e máximo, unidade de medida, tipo de
      substância, com seleção entre Orgânica e Inorgânica, informação complementar e diferenciação de parâmetros
      obrigatórios

- [ ] Possibilita a inserção de registros de medição de efluentes a partir de processos de licenciamento

- [ ] Possibilita a inserção de registros de medição de efluentes sem processo de licenciamento

- [ ] Permite inserção de coordenadas geográficas do local de lançamento do efluente, além de bairro, logradouro,
      sazonalidade, prazo e data

- [ ] Permite inserção de anexos nos registros de medição de efluentes

- [ ] Solicita informação de medição de todos os tipos de efluentes marcados como obrigatórios, tanto nos registros
      oriundos de processos, quanto nos registros sem processo

- [ ] Permite inserção de mais tipos de efluentes não obrigatórios, em todos os registros

- [ ] Possui georrefernciamento de pontos de lançamento de efluentes, contendo todos os registros, oriundos de
      processo de licenciamento ou sem processo

- [ ] Permite filtro no georreferenciamento por proprietário, bairro e logradouro

- [ ] Possui opção para seleção do registro no mapa, com opção de acesso à tela de Registros Medidos

- [ ] Possui módulo de fiscalização

- [ ] Possui controle de denúncias ambientais, com registro de forma, denunciante, denunciado, endereço e registros
      das fiscalizações

- [ ] Possibilita o repasse de denúncia entre usuários, com sinalização na tela sobre denúncias aguardando recebimento

- [ ] Possui módulo para gerenciamento de inquéritos civis a ações fiscais, com coordenadas geográficas

- [ ] Possibilita a inclusão de sub processos de fiscalização, respeitando número do Inquérito Civil original

- [ ] Possibilita a emissão de Notificação ao empreendedor

- [ ] Possibilita a emissão de Auto de Infração ao empreendedor

- [ ] Possui cálculo automatizado de multas ambientais, com montagem automática do Auto de Infração com valores e
      dispositivos legais

- [ ] Possibilita o gerenciamento das ações de fiscalização, com emissão de Notificações, Autos de Infração, Embargos,
      Apreensões, Suspensões e demais documentos preliminares diretamente no menu do usuário, sem a necessidade de
      criação de processo

- [ ] Possibilita a criação de processo a partir de denúncias e ações de fiscalização com vinculação automatizada das
      ações realizadas

- [ ] Possui cadastro de poços, com informações sobre o responsável, coordenadas geográficas, data de cadastro, tipo,
      perfuração, detalhamento e situação

- [ ] Possui Cadastro de Animais, com distinção de tipo, localização, contato e cadastro de chipagem e fotografia do
      animal, sexo, cor, pelagem, porte, sinais característicos

- [ ] Possui informação sobre o médico veterinário responsável pelo animal, com seleção diretamente do cadastro de
      responsáveis técnicos

- [ ] Possibilidade de vinculação do adotante, com seleção do cadastro municipal

- [ ] Impressão do termo de responsabilidade para animais adotados, contendo identificação do animal e informações
      sobre o processo, bem como campos para assinatura

- [ ] Impressão do certificado de chip para animais adotados, contendo espaço para colagem da etiqueta do chip de
      identificação

- [ ] Possui distinção de situação do animal conforme o cadastro do mesmo, bem como disponibilidade para adoção

- [ ] Possui informação de animal disponível para adoção mostrando o mesmo no portal

- [ ] Possibilita o licenciamento autodeclaratório, permitindo a impressão de declaração de autorização por
      licenciamento autodeclaratório para os tipos de documento e atividades que permitem a modalidade, por prazo
      determinado

- [ ] Possibilita a identificação e reimpressão das autorizações de licenciamento autodeclaratório

- [ ] Permite vinculação dos arquivos para download com os ramos de atividade

- [ ] Apresenta para download na tela do protocolo os arquivos relacionados ao ramo de atividade selecionado

- [ ] Apresenta para download na tela de simulação da taxa de licenciamento dos arquivos relacionados ao ramo de
      atividade selecionado

- [ ] Possui sistemática para renovações automáticas

- [ ] Permite marcação no tipo de documento para liberação de renovação automática de documentos, e o período de
      antecedência que deve ser renovado

- [ ] Possui tela que mostre as renovações solicitadas pelo portal, possibilitando a importação

- [ ] Inclusão de trâmite de renovação automática e marcação de final de vigência na licença renovada, para todos os
      documentos em que for realizada a renovação dentro do prazo estipulado

- [ ] Importação de anexos enviados na renovação

- [ ] Gerenciamento de ecopontos, permitindo o cadastramento de container, coletor, coletor tóxico, conjunto,
      caçambam, central e aterro

- [ ] Permitir marcação do tipo de ponto, seleção de responsável através do cadastro de empreendedores, bairro,
      logradouro, coordenadas geográficas, data do cadastro, tipo de resíduo, data da implantação, manutenção
      (semanal, mensal ou periódica), data da última manutenção, situação, tipo e responsável pela coleta, inserção de
      imagem, observação e anexos

- [ ] Permitir impressão de certificado de cadastramento do Ecoponto

- [ ] Permitir filtro por tipo de ponto, bairro, logradouro e tipo de resíduo

- [ ] Mapa de georreferenciamento, sinalizando todos os Ecopontos cadastrados, diferenciando-os pelo tipo

- [ ] Permitir filtro no mapa, por tipo de resíduo, tipo do ponto e manutenção

- [ ] Possuir Manuais de uso para auxílio nas operações, acessíveis na solução

- [ ] Possuir acesso a vídeos explicativos sobre funcionalidades do sistema, acessível dentro da solução

- [ ] Possibilitar a parametrização por tipo de documento, de qual documento deve ser gerado de forma automática
      quando gravada a solicitação pelo portal

- [ ] Possibilitar a criação de modelos pelo próprio usuário para documentos automáticos para impressão no portal, sem
      intervenção do usuário do sistema

### RELATÓRIOS

- [ ] Relatório de vistoria

- [ ] Relação de Ramos de Atividade

- [ ] Relação de protocolos por data, tipo de solicitação, responsável, empreendedor, número de processo, tipo de
      atividade (tabela do Consema)

- [ ] Relação de emissões por período, por tipo de atividade, tipo de documento, por empreendedor

- [ ] Relação de Taxas de Licenciamento

- [ ] Relação de vistorias por fiscal

- [ ] Relatório de Infrações

- [ ] Relatórios de Notificações

- [ ] Relatórios de Documentos Emitidos por localização

- [ ] Relação de tramitação dos processos (Histórico do processo)

- [ ] Relatório de Denúncias recebidas

- [ ] Relatório de Denúncias por fiscalizar e fiscalizadas

- [ ] Emissão da situação dos documentos por data

- [ ] Relação de trâmites em aberto

- [ ] Relação de trâmites concluídos

- [ ] Relação de processos

- [ ] Relação de tramitação de processos

- [ ] Relação de ART

- [ ] Relatório de Acesso ao sistema

- [ ] Relatório de produtividade dos técnicos da Secretaria

- [ ] Relatório de Inquérito Civil

- [ ] Relatório de Empresas Mineradoras

- [ ] Relatório de Reposição Florestal

- [ ] Relatório de Supressão Vegetal

- [ ] Relatório de Serviços Florestais executados

- [ ] Relatório de árvores de domínio público

- [ ] Relatório de Licenças Publicadas

- [ ] Relação de Condicionantes

- [ ] Relação de Resíduos

- [ ] Relação de Planilhas de Resíduos

- [ ] Resíduos por empreendimento

- [ ] Resíduos Industriais Gerados

- [ ] Relação de Poços

- [ ] Relatório de animais cadastrados

- [ ] Relatório de Ecopontos

### PORTAL DO MEIO AMBIENTE

- [ ] Possui ambiente para anexação ao site da Prefeitura/Secretaria/Fundação para disponibilização de informações

- [ ] Possui informações da Secretaria/Fundação/Departamento na tela inicial, inclusive com horário de atendimento

- [ ] Possui ambiente para consultas, solicitações e login de usuário

- [ ] Possui ambiente para consulta às espécies arbóreas, filtrando por nome popular, nome científico e classificação,
      com possibilidade de realizar download da imagem do exemplar

- [ ] Possui formulários para licenciamento para download direto no portal

- [ ] Permite a publicação de decretos, resoluções e orientações diretamente no portal

- [ ] Possibilita a divisão dos formulários por tipo de licenciamento

- [ ] Permite consulta a todos os documentos licenciatórios publicados em formato pdf, garantindo a transparência e a
      segurança dos dados

- [ ] Permite a publicação de todos os documentos relacionados à tramitação dos processos em ambiente específico, em
      formato pdf

- [ ] Permite a visualização e acompanhamento de solicitações de complementação de documentos de acordo com a situação
      dos protocolos

- [ ] Permite consulta aos documentos por tipo de documento, empreendedor e atividade

- [ ] Possui ambiente para verificação de autenticidade dos documentos publicados, através do código de validação

- [ ] Possibilita consulta de taxas de licenciamento pelo empreendedor ou técnico responsável

- [ ] Possibilita a consulta aos Autos de Infração, Notificações e outros documentos emitidos e publicados pela
      secretaria, conforme determinação do próprio órgão

- [ ] Possibilita a consulta aos pedidos de licenciamento recebidos e publicados, conforme determinação do próprio
      órgão

- [ ] Possui ambiente para criação de usuário e senha

- [ ] Permite informar CPF ou CNPJ do novo usuário cadastrado, e a definição de cadastramento como empreendedor ou
      responsável técnico

- [ ] Possibilita a abertura de processo de licenciamento on line, com preenchimento pelo empreendedor ou técnico
      responsável

- [ ] Permite ao responsável técnico a definição de solicitação para seu CPF/CNPJ ou para terceiros

- [ ] Possibilita ao empreendedor ou responsável técnico a manutenção da solicitação em rascunho para complementação
      futura

- [ ] Possibilita ao empreendedor ou responsável técnico o envio da solicitação quando concluído seu preenchimento

- [ ] Permite ao empreendedor ou responsável técnico a visualização da situação da solicitação, podendo estar em
      rascunho, aguardando aceite, aceito ou recusado

- [ ] Permite ao empreendedor e responsável técnico a complementação ou alteração de solicitações cuja situação seja
      “recusado”, apresentando o motivo da recusa

- [ ] Possibilita o empreendedor ou técnico visualizar e reimprimir solicitações

- [ ] Possibilita ao empreendedor e responsável técnico, em seu ambiente restrito, a visualização, acompanhamento e
      alteração das solicitações, quando em rascunho ou recusadas

- [ ] Possibilita ao empreendedor ou responsável técnico, a visualização do número do processo gerado ou
      correspondente à solicitação realizada, quando aceita

- [ ] Possibilita informar o técnico responsável pelo empreendimento no momento da criação do processo online

- [ ] Possibilita a inclusão de responsáveis técnicos não constantes na base de dados, no ato da solicitação

- [ ] Possibilita o envio de arquivos digitais no ato de criação de um processo, informatização do processo

- [ ] Possibilita a impressão de requerimento e demonstrativo de valores para licenciamento

- [ ] Possibilita a reimpressão de requerimento e demonstrativo do cálculo de valores para o licenciamento através do
      CPF ou CNPJ do empreendedor

- [ ] Possibilita o cadastramento dos empreendedores, com inserção dos dados diretamente no banco de dados

- [ ] Possibilita a impressão de requerimento de pedido de licenciamento no ato do preenchimento

- [ ] Possui ambiente com usuário e senha de responsável técnico para consulta aos pedidos de licenciamento, licenças
      emitidas e a geração via sistema dos Planos e Planilhas de Resíduos Sólidos a que está vinculado

- [ ] Possibilita ao empreendedor o envio e acompanhamento da situação dos Planos e Planilhas quanto à sua importação
      e validação

- [ ] Possui, no ambiente do técnico e do empreendedor, botão de acesso aos registros de medição de efluentes,
      listando todos os registros, com filtro

- [ ] Possibilita ao empreendedor o envio de registros de medição de efluentes, obrigando o preenchimento dos
      parâmetros de medição obrigatórios e permitindo a inserção de parâmetros não obrigatórios

- [ ] Possui informação sobre a situação da importação, impedindo alteração depois de importado

- [ ] Permite inserção de anexos nos registros de medição de efluentes

- [ ] Possui ambiente com usuário e senha para cada empreendedor para consulta aos pedidos de licenciamento, licenças
      emitidas e a geração via sistema dos Planos e Planilhas de Resíduos Sólidos a que está vinculado

- [ ] Possibilita ao empreendedor o envio e acompanhamento da situação dos Planos e Planilhas quanto à sua importação
      e validação

- [ ] Possibilita ao empreendedor a consulta e impressão dos trâmites vinculados aos processos de licenciamento em
      ambiente específico, resguardado por usuário e senha

- [ ] Possibilita ao consultor técnico a consulta e impressões dos trâmites vinculados aos processos de licenciamento
      que atua, em ambiente específico, resguardado por usuário e senha

- [ ] Possibilita ao empreendedor a consulta às condicionantes vinculadas às licenças de seus empreendimentos,
      agrupadas por processo, em ambiente específico, resguardado por usuário e senha, com acompanhamento de situação
      e prazo para cumprimento

- [ ] Possibilita ao consultor técnico a consulta às condicionantes vinculadas às licenças dos empreendimentos que
      possui vínculo, agrupadas por processo, em ambiente específico, resguardado por usuário e senha, com
      acompanhamento de situação e prazo para cumprimento

- [ ] Possibilita o consultor técnico ou o empreendedor a enviar o cumprimento de condicionantes solicitadas
      diretamente pelo seu ambiente, com a possibilidade de enviar anexos e projetos referente a cada condicionante
      solicitada

- [ ] Possibilita ao empreendedor e consultor técnico, em seus ambientes a solicitação de renovação automática de
      documentos, permitindo impressão de comprovante de documentos renovados, ou informando que o mesmo está fora do
      prazo de renovação automática

- [ ] Possibilita a impressão de autorização por licenciamento autodeclaratório para os tipos de documento e
      atividades pertinentes, imediatamente após a abertura da solicitação

- [ ] Possui informação na tela da solicitação de que as informações fornecidas permitem a impressão do licenciamento
      autodeclaratório, quando pertinente

- [ ] Possibilita a exibição de animais disponíveis para adoção com imagem do mesmo e informações e contato

- [ ] Apresenta para download na solicitação de novo processo todos os arquivos vinculados à atividade selecionada

- [ ] Permite o registro de denúncias pelo portal, com informações do ato, do denunciado e da localização, com seleção
      da coordenada geográfica diretamente pelo mapa

- [ ] Permite inserção de denúncia sigilosa, ou com identificação do denunciante

- [ ] Permite a inserção de anexos da denúncia

- [ ] Permite acompanhamento da situação da denúncia, através do ambiente do denunciante

- [ ] Permite impressão de documentos para Licenciamento Ambiental por Compromisso, ou outros documentos de acordo com
      o enquadramento definido pelo município, diretamente no portal, no ato da solicitação

- [ ] Possui opção para redefinição de senha de usuário de responsável técnico ou empreendedor, com envio automático
      de e-mail para a alteração

## Item 35 - Software de Educação Municipal - Gestão

*Fonte: Anexo I, páginas 143-149/194.*

- [ ] **1.** Permitir a integração de dados entre os estabelecimentos de ensino e secretaria de educação, além de
      publicar informações no Portal dos gestores públicos diariamente para tomada de decisão inteligente.

- [ ] **2.** Permitir o compartilhamento de dados com a plataforma Google For Education - Classroom, para todos os
      tipos de turmas da educação básica regular, incluindo educação infantil, ensino fundamental, ensino médio, EJA
      seriado e modular, atividades complementares e AEE.

- [ ] **3.** Possibilitar a geração de arquivos para atendimento ao Sistema Educacional Brasileiro - SEB, de acordo
      com layout estabelecido pelo INEP.

- [ ] **4.** Possibilitar o cadastramento de critérios de classificação específicos para os processos de inscrição de
      matrícula, utilizando os dados existentes no sistema, além dos critérios padrões já disponibilizados.

- [ ] **5.** Permitir matrículas da modalidade Educação de Jovens e Adultos em disciplinas específicas trabalhando com
      módulos.

- [ ] **6.** Permitir a edição das informações cadastrais das entidades.

- [ ] **7.** Permitir a configuração das regras das matrículas, definindo o ano letivo, documentos necessários por
      modalidade e nível escolar e sua obrigatoriedade.

- [ ] **8.** Permitir a criação de novas turmas apenas quando as vagas das turmas existentes estiverem todas
      preenchidas.

- [ ] **9.** Possibilitar a definição da quantidade máxima de alunos por turma, bem como a configuração de horas/aula
      por turno.

- [ ] **10.** Possibilitar a definição da quantidade de alunos, em sala de aula, por metro quadrado.

- [ ] **11.** Permitir o cadastro das configurações de quantidade de aulas para cada dia da semana, bem como a duração
      de cada aula e dos intervalos entre elas.

- [ ] **12.** Permitir a configuração da forma de registro das frequências dos alunos, sendo que esta configuração
      pode ser definida de forma padrão para toda a rede de ensino, ou de forma específica para cada estabelecimento
      de ensino ou até mesmo para turmas da mesma etapa da matriz curricular.

- [ ] **13.** Permitir definir a configuração da frequência escolar, possibilitando o controle de faltas por aula ou
      por dia, conforme cada modalidade e nível escolar.

- [ ] **14.** Permitir a configuração dos tipos de avaliações com suas respectivas características. Os tipos de
      avaliação são: Avaliação numérica, Parecer descritivo, avaliação conceitual sem correspondente numérico e
      avaliação conceitual com correspondente numérico.

- [ ] **15.** Permitir a elaboração de fórmulas de cálculo de desempenho de alunos, que as escolas da rede de ensino
      municipal utilizam durante um ano letivo.

- [ ] **16.** Permitir o cadastro de cursos, definido a sua respectiva modalidade, nível escolar e forma de
      organização das etapas, além de possibilitar ativar ou desativá-los.

- [ ] **17.** Permitir o cadastro das disciplinas com siglas e classificação segundo o INEP.

- [ ] **18.** Permitir a manutenção das disciplinas utilizadas na rede de ensino.

- [ ] **19.** Permitir o cadastro de eixos temáticos.

- [ ] **20.** Permitir que cada etapa da matriz curricular contenha disciplinas específicas.

- [ ] **21.** Permitir a configuração da forma de organização didático-pedagógica da matriz curricular para a
      modalidade Educação Básica e nível escolar "Educação Infantil". Isto é, se a matriz deve utilizar "Disciplinas”
      ou “Eixos temáticos”.

- [ ] **22.** Possibilitar que as etapas da matriz curricular sejam classificadas, permitindo a atribuição de uma
      descrição para uma etapa ou para um grupo de etapas.

- [ ] **23.** Permitir o cadastramento de competências, conhecimentos/conteúdos, habilidades/capacidades e atitudes
      para cada componente curricular da etapa de ensino.

- [ ] **24.** Permitir a definição do curso em que a matriz curricular será aplicada, a quantidade de dias letivos, a
      idade mínima e máxima que os alunos devem ter em cada etapa, além de possibilitar ativar ou desativar as
      matrizes curriculares.

- [ ] **25.** Permitir a configuração da orientação curricular de cada componente curricular. Isto é, se pertence à
      "Base nacional comum" ou à "Parte diversificada".

- [ ] **26.** Permitir o cadastro de competências, conhecimentos/conteúdos curriculares, habilidades/capacidades e
      atitudes para o auxílio na implementação da proposta pedagógica e gestão escolar dos processos de ensino e
      aprendizagem.

- [ ] **27.** Permitir o cadastro de tipos de cargos, funções gratificadas e lotações físicas.

- [ ] **28.** Permitir o cadastro e manutenção dos funcionários da rede de ensino, possibilitando informar dados
      pessoais, documentação e formação, dados referente a sua admissão, demissão, cargo, função, carga horária
      semanal, local de trabalho contendo matrícula e quantidade de aulas atribuídas.

- [ ] **29.** Permitir o cadastro do histórico escolar dos alunos.

- [ ] **30.** Permitir o cadastro de estabelecimentos de ensino com informações referente a endereço, área de atuação,
      infraestrutura, avaliações externas, dependência física.

- [ ] **31.** Permitir o cadastro de avaliações externas que são aplicadas, atividades de Atendimento Educacional
      Especializado (AEE) e atividades complementares.

- [ ] **32.** Disponibilizar atividades complementares seguindo os padrões utilizados para o censo escolar brasileiro,
      além de permitir cadastrar atividades específicas para utilização na rede ensino.

- [ ] **33.** Permitir o cadastro de motivos de movimentações de matrículas e remanejamento interno e de motivos de
      dispensa de componentes curriculares.

- [ ] **34.** Permitir o cadastro de religiões.

- [ ] **35.** Permitir o cadastro e manutenção de legislações e convenções.

- [ ] **36.** Permitir o cadastro de programas sociais associados aos alunos da rede de ensino.

- [ ] **37.** Permitir o cadastramento de eventos, feriados de esfera municipal, estadual e nacional.

- [ ] **38.** Permitir o cadastro de calendários para a Secretaria de Educação, Estabelecimentos de Ensino e Matrizes
      Curriculares.

- [ ] **39.** Permitir a vinculação de eventos ao calendário escolar, informando se o mesmo é considerado como dia
      letivo, dia trabalhado, se é obrigatório, além do público alvo que o evento é direcionado.

- [ ] **40.** Possibilitar a definição do tipo de período avaliativo de cada matriz curricular, informando a data
      inicial e final de cada período avaliativo, tendo, inclusive, uma visão quanto à quantidade de dias letivos de
      cada período avaliativo, além de uma visão comparativa entre o total de dias letivos da matriz curricular com o
      total de dias letivos da matriz curricular no calendário.

- [ ] **41.** Possibilitar a visualização do total de dias letivos do calendário escolar, de acordo com as datas
      definidas, incluindo os eventos e feriados.

- [ ] **42.** Permitir que cada estabelecimento de ensino aceite ou não um evento sugerido pela Secretaria de
      Educação.

- [ ] **43.** Realizar o cálculo dos dias letivos do calendário escolar, descontando os dias que não são considerados
      como dia letivo.

- [ ] **44.** Permitir a definição do total de vagas por estabelecimento de ensino, matriz curricular, etapa e turno,
      sendo que desse total uma parte pode ser reservada para o processo de inscrição de matrículas.

- [ ] **45.** Permitir a configuração das diretrizes que conduzirão o processo de inscrição de matrícula, onde é
      possível definir: as informações quanto ao formulário que o candidato deverá preencher ao realizar a sua
      inscrição; os estabelecimentos de ensino que participarão do processo; o período de realização do processo; a
      quantidade de estabelecimentos de ensino que o candidato pode se inscrever; os critérios de classificação dos
      candidatos, se as inscrições podem ser realizadas apenas nos estabelecimentos de ensino e secretaria de educação
      ou os candidatos e pais podem se inscrever diretamente no sistema.

- [ ] **46.** Permitir o cadastramento de candidatos no processo de inscrição de matrícula.

- [ ] **47.** Permitir a realização do processo de classificação dos candidatos conforme critérios estabelecidos pela
      rede de ensino.

- [ ] **48.** Possibilitar a comunicação aos candidatos participantes do processo de inscrição de matrícula, quanto ao
      seu resultado. Ou seja, se o candidato foi ou não classificado no processo de inscrição.

- [ ] **49.** Possibilitar a realização da matrícula do candidato classificado, bem como o indeferimento da sua
      inscrição no processo de matrícula.

- [ ] **50.** Possibilitar o cadastramento do candidato participante do processo de inscrição de matrícula na lista de
      espera.

- [ ] **51.** Possibilitar a visualização dos candidatos inscritos, classificados, inscritos matriculados e
      indeferidos.

- [ ] **52.** Possibilitar a visualização dos candidatos encaminhados para o estabelecimento de ensino

- [ ] **53.** Possibilitar a descrição das informações necessárias para originar um documento de atestado de vaga para
      um estabelecimento de ensino da rede municipal.

- [ ] **54.** Disponibilizar uma rotina de cópias de cadastros e configurações de um ano letivo para outro. Os dados
      copiados são: Fórmulas de cálculo; Calendário escolar; Quadro de vagas; Turmas.

- [ ] **55.** Disponibilizar relatórios de declaração de matrícula, de declaração de transferência, boletim escolar e
      ficha individual.

- [ ] **56.** Permitir a reclassificação da matrícula dos alunos, definido se o processo é de avanço ou aceleração
      para etapas posteriores.

- [ ] **57.** Permitir a movimentação da matrícula dos alunos sendo as movimentações de: Cancelamento, Deixou de
      frequentar, Falecimento ou Transferência, além de informar o motivo da movimentação.

- [ ] **58.** Possibilitar a consulta do histórico de inclusões, alterações e movimentações de cada matrícula do
      aluno.

- [ ] **59.** Permitir que o aluno seja enturmado ao realizar o registro da matrícula.

- [ ] **60.** Permitir a configuração das diretrizes que conduzirão o processo de matrícula, onde é possível definir:
      as informações quanto ao formulário que o candidato deverá preencher ao realizar a sua inscrição; a quantidade
      de estabelecimentos de ensino que o candidato pode se inscrever; as matrizes curriculares, etapa de ensino,
      modalidade e turnos, disponíveis para lista de espera.

- [ ] **61.** Permitir a configuração da lista de espera, definindo as suas características específicas, tais como
      estabelecimentos de ensino, modalidades e critérios de classificação.

- [ ] **62.** Permitir o cadastramento de candidatos no processo de lista de espera de forma presencial, em qualquer
      um dos estabelecimentos de ensino da rede municipal.

- [ ] **63.** Permitir que qualquer cidadão cadastre-se, ou cadastre crianças e adolescentes, no processo de lista de
      espera de forma on-line.

- [ ] **64.** Permitir que qualquer cidadão realize a consulta da posição de candidatos no processo de lista de espera
      de forma on-line.

- [ ] **65.** Possibilitar a impressão da lista de espera dos candidatos a alunos inscritos.

- [ ] **66.** Possibilitar a divulgação e publicação da lista de espera dos estabelecimentos de ensino, conforme LDB
      Lei nº 9.394, de 20 de dezembro de 1996.

- [ ] **67.** Permitir a manutenção do cadastro dos alunos, com a possibilidade de registrar os dados pessoais,
      documentos, características físicas e demais informações exigidas pelo censo escolar brasileiro.

- [ ] **68.** Permitir realizar a classificação dos candidatos inscritos para as vagas escolares, e posicioná-los na
      lista de espera conforme parâmetros definidos pela secretaria de educação.

- [ ] **69.** Permitir realizar a manutenção das inscrições dos candidatos na lista de espera da rede de ensino, tais
      como data de inscrição, dados pessoais e estabelecimentos de interesse, de acordo com a sua respectiva
      configuração.

- [ ] **70.** Permitir a manutenção dos estabelecimentos de ensino com a possibilidade de registrar as informações
      gerais, área de atuação, infraestrutura, documentação, avaliações externas, dependências e equipe diretiva.

- [ ] **71.** Permitir a manutenção dos tipos de dependências físicas dos estabelecimentos de ensino, tais como salas
      de aula, pátios, cozinha, banheiros e áreas comuns do estabelecimento.

- [ ] **72.** Permitir a pesquisa de candidatos nas listas de espera na rede de ensino, em todas as configurações
      pré-definidas e considerando ainda os candidatos que já foram matriculados.

- [ ] **73.** Permitir o encaminhamento de candidatos da lista de espera para o processo de matrícula.

- [ ] **74.** Disponibilizar informações das movimentações escolares de forma sintética e analítica de uma rede de
      ensino.

- [ ] **75.** Permitir a visualização das movimentações escolares por meio de gráfico e tabela.

- [ ] **76.** Permitir a rematrícula dos alunos de um ano letivo para o ano letivo seguinte.

- [ ] **77.** Permitir a definição das informações de origem e destino do processo de rematrícula.

- [ ] **78.** Permitir o registro do encerramento dos períodos letivos das turmas oferecidas em uma rede de ensino.

- [ ] **79.** Permitir o registro dos dias da semana e os horários disponíveis dos professores em cada estabelecimento
      de ensino.

- [ ] **80.** Possibilitar a realização das consultas de eventos que tem como público-alvo os professores, data
      inicial e final dos períodos avaliativos das matrizes curriculares.

- [ ] **81.** Possibilitar a visualização das informações da agenda por dia, semana, mês e eventos.

- [ ] **82.** Permitir o registro da frequência escolar dos alunos da rede de ensino.

- [ ] **83.** Permitir o registro da frequência escolar dos alunos por período avaliativo.

- [ ] **84.** Permitir o registro de abono ou justificativa das ausências dos alunos da rede de ensino, em um
      determinado período do ano letivo.

- [ ] **85.** Permitir o registro de desempenho dos alunos da rede de ensino, em cada componente curricular da
      matrícula e em seus respectivos períodos avaliativos, exames finais e/ou no conselho de classe.

- [ ] **86.** Permitir o registro de desempenho dos alunos da rede de ensino, por meio das competências,
      conhecimentos/conteúdos, habilidades, capacidades e atitudes de cada componente curricular da matrícula e em
      seus respectivos períodos avaliativos e exames finais.

- [ ] **87.** Permitir o registro de pareceres para os alunos da rede de ensino, em cada componente curricular da
      matrícula e em seus respectivos períodos avaliativos, exames finais, conselho de classe e/ou média final do ano
      letivo.

- [ ] **88.** Permitir a realização do cálculo de médias e exames dos alunos da rede de ensino.

- [ ] **89.** Permitir o registro do desempenho dos alunos somente após o início das aulas.

- [ ] **90.** Permitir o registro da média dos períodos avaliativos para cada aluno da turma até o período avaliativo
      em que este frequentou, considerando a data em que foi matriculado e a situação da matrícula na turma.

- [ ] **91.** Permitir o registro de desempenho de alunos portadores de necessidades especiais (PNE's ) de maneira
      diferenciada dos demais alunos da turma.

- [ ] **92.** Permitir o registro de desempenho dos alunos de acordo com a tipo de avaliação definido para cada
      componente curricular da turma.

- [ ] **93.** Permitir o cadastramento de turmas, possibilitando a definição de suas características como: horários
      das aulas, tipos de avaliação, quantidade de exames finais, quantidade de aulas semanais de cada componente
      curricular, além de exibir a organização curricular e os alunos da turma.

- [ ] **94.** Controlar a quantidade máxima de alunos de cada turma, não permitindo enturmar alunos acima da
      quantidade definida.

- [ ] **95.** Possibilitar o vínculo de vários auxiliares de professor para o mesmo componente curricular.

- [ ] **96.** Possibilitar o vínculo dos professores com seus respectivos componentes curriculares, devidamente
      habilitados, nas turmas.

- [ ] **97.** Possibilitar o vínculo de várias dependências físicas para cada turma.

- [ ] **98.** Possibilitar que os componentes curriculares da turma sejam divididos.

- [ ] **99.** Permitir a enturmação dos alunos em turmas do estabelecimento de ensino, matriz curricular, etapa e
      turno correspondentes às matrículas dos alunos.

- [ ] **100.** Possibilitar o vínculo entre duas ou mais turmas, formando uma turma multisseriada.

- [ ] **101.** Permitir o registro do número de chamada dos alunos em cada turma.

- [ ] **102.** Permitir que as configurações de frequência das turmas sejam alteradas depois de excluídos os registros
      de frequência dos alunos.

- [ ] **103.** Permitir a realização do processo de geração do quadro de horários das turmas.

- [ ] **104.** Permitir que a geração do quadro de horários seja realizada para várias turmas simultaneamente.

- [ ] **105.** Permitir a manutenção das configurações do quadro de horas/aulas por dia.

- [ ] **106.** Permitir o remanejamento de alunos de uma turma para outra turma da mesma etapa de ensino dentro do
      mesmo estabelecimento de ensino e ano letivo, além de informar o motivo do remanejamento.

- [ ] **107.** Permitir o cadastramento de acompanhamentos pedagógicos para os alunos da rede de ensino, durante o ano
      letivo.

- [ ] **108.** Possibilitar um local centralizado que oferece ajuda descrita aos usuários quanto às funcionalidades do
      sistema.

- [ ] **109.** Possibilitar a publicação dos acompanhamentos pedagógicos dos alunos, permitindo que os pais e os
      alunos consigam realizar consultas.

- [ ] **110.** Permitir a manutenção das informações do calendário escolar da secretaria de educação do município.

- [ ] **111.** Permitir gerar os dados dos estabelecimentos, turmas, professores e alunos do ano letivo, conforme data
      de referência do Censo Escolar.

- [ ] **112.** Permitir a geração dos dados de situação, rendimento e resultados dos estudantes ao término do ano
      letivo, bem como a mudança de vínculo escolar do estudante após a data de referência do Censo Escolar.

- [ ] **113.** Possibilitar a visualização do calendário escolar do estabelecimento de ensino com suas respectivas
      informações por semana, mês, ano e eventos.

- [ ] **114.** Possibilitar a emissão do boletim escolar dos alunos, conforme modelos disponibilizados pelo sistema.

- [ ] **115.** Permitir o registro da frequência escolar dos alunos até o período avaliativo em que o aluno permaneceu
      na turma.

- [ ] **116.** Permitir integração com uma ferramenta de auditoria, que permite auditar as operações e ações
      realizadas por determinado log no sistema, inclusive consultas.

- [ ] **117.** Realizar automaticamente o cálculo da pontuação dos critérios atendidos pelo candidato na inscrição da
      lista de espera da vaga escolar.

- [ ] **118.** Permitir alterar a configuração do tipo de avaliação escolar, podendo aplicar ou alterar para várias
      turmas simultaneamente, desde que possuam a mesma matriz curricular, mesma etapa de ensino e mesma quantidade de
      períodos avaliativos no calendário escolar.

- [ ] **119.** Possibilitar ao profissional da secretaria de educação ou do estabelecimento de ensino, realizar a
      dispensa de componentes curriculares dos alunos matriculados na rede de ensino.

- [ ] **120.** Permitir ao profissional da secretaria de educação ou do estabelecimento de ensino, filtrar e
      selecionar os alunos matriculados que devem ser rematriculados de um período letivo para outro.

- [ ] **121.** Permitir ao profissional da secretaria de educação, bem como do estabelecimento de ensino, enturmar os
      professores e professores auxiliares nos respectivos componentes curriculares das turmas de cada estabelecimento
      de ensino, possibilitando assim a definição do quadro docente das turmas.

- [ ] **122.** Permitir ao profissional da educação e dos estabelecimentos de ensino, configurar os grupos de alunos
      por ano letivo, modalidade e nível escolar utilizando a configuração definida pela secretaria de educação ou
      específica do estabelecimento de ensino, que serão utilizados no ensino híbrido.

- [ ] **123.** Possibilitar que um agrupamento de municípios realize a manutenção de tipos de cargo dos funcionários
      de seus associados.

- [ ] **124.** Possibilitar que um agrupamento de municípios realize a manutenção de configurações de tipos de
      avaliação.

- [ ] **125.** Possibilitar ao profissional da educação e do estabelecimento de ensino, manter as informações
      cadastrais das turmas da rede de ensino.

- [ ] **126.** Possibilitar emissão de relatórios alunos por grupos, para relação de alunos por turma que estão
      agrupados em atendimento ao ensino híbrido e/ou remoto.

- [ ] **127.** Permitir a integração das fotos dos alunos com equipamentos de reconhecimento facial, a partir dos
      registros já existentes no sistema de gestão educacional.

- [ ] **128.** Permitir a utilização da base cadastral e da face cadastrada de cada aluno para realizar a gestão
      diária e efetiva de frequência recebendo dados de equipamentos de reconhecimento facial.

- [ ] **129.** Possibilitar o envio de alertas para aplicativo móvel disponibilizado aos pais ou responsáveis sobre a
      entrada e saída de alunos na unidade escolar a partir dos dados de equipamentos de reconhecimento facial.

- [ ] **130.** Gerar relatórios de controle de um determinado aluno ou grupo de alunos que não compareceu à unidade
      escolar.

- [ ] **131.** Permitir a criação e implementação de regras para a gestão de alunos que em cinco dias úteis de aula,
      deixou de comparecer por dois dias seguidos ou três dias alternados.

- [ ] **132.** Permitir a criação e implementação de relatórios diários ou por períodos determinados de presença para
      administração de merenda escolar.

- [ ] **133.** Controlar a frequência, assiduidade e permanência dos alunos nas unidades escolares.

- [ ] **134.** Permitir acesso via web através de login/senha.

- [ ] **135.** Disponibilizar recursos com uso de inteligência artificial para realizar a predição de alunos em risco
      de evasão nos estabelecimentos de ensino do município.

- [ ] **136.** Disponibilizar recursos com uso de inteligência artificial para realizar a predição de alunos em risco
      de reprovação nos estabelecimentos de ensino do município.

- [ ] **137.** Possibilitar emissão de relatórios gráficos com a evolução do risco de evasão e reprovação do aluno.

- [ ] **138.** Permitir a personalização e escolha do grupo de alunos que devem ser acompanhados pelos recursos de
      inteligência artificial, permitindo definir as modalidades de ensino, níveis escolares e etapas para a predição
      de alunos em risco de evasão e reprovação.

- [ ] **139.** Possibilitar aos gestores a emissão de relatório de risco de evasão por turma ou por aluno.

- [ ] **140.** Possibilitar aos gestores a emissão de relatório de risco de reprovação por turma ou por aluno.

- [ ] **141.** Disponibilizar recursos que utilizam algoritmos de inteligência artificial relacionados a aprendizado
      de máquina (machine learning) com objetivo de caracterizar alunos em risco de evasão e/ou reprovação.

## Item 36 - Software de Educação Municipal - Professores

*Fonte: Anexo I, páginas 149-151/194.*

- [ ] **1.** Permitir o registro do planejamento de aulas por período.

- [ ] **2.** Permitir aos gestores configurar o processo de aprovação dos planejamentos de aulas, definindo os
      estabelecimentos de ensino, as modalidades e os professores que devem seguir este processo, bem como definir o
      período que o processo deve acontecer e o prazo máximo que o professor pode registrar o planejamento.

- [ ] **3.** Permitir o registro da aprovação dos planejamentos de aulas elaborados pelos professores.

- [ ] **4.** Possibilitar o registro do planejamento de aulas e/ou conteúdo ministrado de forma flexível em qualquer
      periodicidade (dia, semana, mês ou outro período determinado pela Secretaria Escolar).

- [ ] **5.** Permitir aos professores visualização das observações do seu gestor, possibilitando ajustes conforme
      necessidade, submetendo novamente para validação, até que o processo seja concluído.

- [ ] **6.** Permitir o registro do conteúdo ministrado por período.

- [ ] **7.** Permitir o cadastramento dos instrumentos de avaliação de aprendizagem (Provas, Exames, Trabalhos,
      Avaliações entre outros), além de informar quais serão os critérios de avaliação empregados neles e o conteúdo.

- [ ] **8.** Permitir aos professores a realização da cópia dos instrumentos de avaliação de uma turma para a outra.

- [ ] **9.** Permitir o registro do desempenho dos alunos referente aos instrumentos de avaliação, exames finais,
      conselho de classe e média dos períodos avaliativos.

- [ ] **10.** Permitir o registro de pareceres aos instrumentos de avaliação, exames finais, conselho de classe e
      média dos períodos avaliativos.

- [ ] **11.** Permitir o registro da recuperação paralela: recuperação dos instrumentos de avaliação e recuperação do
      período avaliativo (média).

- [ ] **12.** Permitir o registro de resultados do período avaliativo, mesmo que não exista um instrumento de
      avaliação cadastrado.

- [ ] **13.** Permitir o registro do desempenho de cada aluno referente às Competências, Habilidades e Atitudes - CHA
      -na visão anual, mesmo que não tenha um instrumento de avaliação cadastrado.

- [ ] **14.** Possibilitar o registro do desempenho escolar de alunos da Educação Básica, EJA, Complementar,
      Atividades AEE (Atendimento Educacional Especializado) e Atividades complementares.

- [ ] **15.** Possibilitar professores a realização do cálculo das médias dos períodos avaliativos de seus alunos,
      utilizando fórmulas de cálculo previamente personalizadas por administradores do sistema.

- [ ] **16.** Permitir a visualização do cálculo das médias dos alunos de cada período avaliativo.

- [ ] **17.** Permitir o registro da frequência escolar dos alunos por dia, por aula individualmente ou pelo total de
      faltas no período avaliativo.

- [ ] **18.** Permitir aos professores o cadastramento de abonos e/ou justificativas para as ausências dos alunos,
      informando um motivo previamente definido pela secretaria de educação ou pelo estabelecimento de ensino.

- [ ] **19.** Permitir o registro de acompanhamentos pedagógicos dos alunos nas escolas da rede pública municipal.

- [ ] **20.** Permitir o registro de atividades pedagógicas.

- [ ] **21.** Disponibilizar aos professores recursos para enviar atividades pedagógicas para os alunos, bem como
      enviar comentários sobre a atividade.

- [ ] **22.** Possibilitar aos professores o acompanhamento das respostas das atividades pedagógicas enviadas pelos
      alunos.

- [ ] **23.** Possibilitar aos professores registrar a devolutiva das atividades pedagógicas.

- [ ] **24.** Permitir o registro da frequência escolar dos alunos da Educação Básica, EJA, Complementar, Atividades
      AEE (Atendimento Educacional Especializado) e Atividades complementares, possibilitando a confirmação da
      realização da(s) aula(s) ministrada(s).

- [ ] **25.** Permitir a emissão de relatórios padrões e/ou customizados diretamente pelas funcionalidades de
      frequência escolar, conteúdo ministrado, desempenho escolar, planejamento de aula, devolutivas, acompanhamento
      pedagógico, quadro de horários e atividades.

- [ ] **26.** Possibilitar aos professores registrar os planejamentos de aulas e/ou conteúdos ministrados, permitindo
      o upload de documentos nos formatos PDF, DOC, DOCX, TXT, HTML, XLS, XLSX, JPG, PNG, PPT com tamanho máximo
      permitido de até 40 MB.

- [ ] **27.** Possibilitar um local centralizado que oferece ajuda descrita aos usuários quanto às funcionalidades do
      sistema.

- [ ] **28.** Possibilitar aos professores a visualização do nome social de seus alunos nas rotinas relacionadas ao
      registro da frequência e desempenho escolar, proporcionando assim que o aluno seja reconhecido pelo nome que se
      identifica.

- [ ] **29.** Possibilitar aos professores a digitação de textos no Conteúdo ministrado, Planejamento de aulas e
      Instrumento de avaliação utilizando recursos de comandos de voz.

- [ ] **30.** Possibilitar aos gestores a emissão de relatório que demonstre o percentual de preenchimento de
      informações do diário de classe de um professor em uma turma, demonstrando as pendências deste professor na
      turma.

- [ ] **31.** Demonstrar aos professores os alunos que possuem risco de evasão e/ou reprovação.

- [ ] **32.** Exibir aos professores um indicador de verificação da conexão com a internet, facilitando assim o
      acompanhamento de seu status atual.

- [ ] **33.** Disponibilizar aos professores recursos para cadastrar medições antropométricas dos alunos,
      compartilhando com nutricionistas da rede informações sobre a estatura e massa muscular dos alunos.

- [ ] **34.** Disponibilizar aos professores e demais usuários o envio de feedback sobre o produto, possibilitando uma
      comunicação imediata do usuário com a empresa sobre a experiência com o produto.

- [ ] **35.** Permitir aos professores controlar as publicações de acompanhamentos pedagógicos e desempenhos escolares
      dos alunos, possibilitando assim a consulta pelos alunos, pais e responsáveis.

- [ ] **36.** Possibilitar a criação de campos personalizados para algumas funcionalidades do sistema.

## Item 37 - Software de Educação Municipal - Alimentação Escolar

*Fonte: Anexo I, páginas 151-152/194.*

- [ ] **1.** Permitir ao profissional responsável pela merenda escolar, realizar o cadastro de ingredientes. Ao
      visualizar as informações dos ingredientes padrões, o sistema deve exibir a tabela de origem do ingrediente.

- [ ] **2.** Na listagem dos ingredientes, deve ser possível visualizar a tabela de origem dos ingredientes (padrões
      ou não).

- [ ] **3.** Permitir a integração de dados cadastrais dos estabelecimentos de ensino entre os sistemas de gestão
      escolar e gestão da merenda, otimizando assim a rotina do profissional responsável pela merenda escolar.

- [ ] **4.** Permitir ao profissional responsável pela merenda escolar, registrar a(s) deficiências do aluno, caso
      este possuir.

- [ ] **5.** Permitir ao profissional responsável pela merenda escolar registrar os nutrientes e/ou ingredientes que o
      aluno possui restrição, com base nas informações o profissional terá a possibilidade de realizar uma dieta
      alimentar adequada às restrições dos alunos.

- [ ] **6.** Disponibilizar a visualização dos nutrientes de uma receita, conforme ingredientes informados.

- [ ] **7.** Permitir ao profissional responsável pela merenda escolar, registrar as medições antropométricas do(s)
      aluno(s), possibilitando um controle nutricional adequado para o aluno.

- [ ] **8.** Permitir que usuários administradores possam elaborar relatórios de forma personalizada com base nas
      informações disponíveis de cada funcionalidade, possibilitando assim que o profissional elabore documentos
      conforme sua necessidade.

- [ ] **9.** Permitir ao profissional responsável pela merenda escolar, visualizar a situação do peso e da estatura
      relacionada à idade dos alunos com até 19 anos, conforme índices antropométricos calculados com Escore-z e
      determinados pela Organização Mundial de Saúde (OMS).

- [ ] **10.** Permitir a integração de dados de nutricionistas entre os sistemas de gestão escolar e gestão da
      merenda.

- [ ] **11.** Permitir ao profissional responsável pela merenda escolar, realizar a conversão de unidade de medida.

- [ ] **12.** Permitir ao profissional responsável pela merenda escolar, acompanhar por indicadores a quantidade total
      de alunos registrados, quantidade de alunos agrupados por sexo e a quantidade de alunos com deficiência,
      otimizando assim a sua rotina.

- [ ] **13.** Permitir ao profissional responsável pela merenda escolar, visualizar a quantidade de alunos com
      restrições alimentares.

- [ ] **14.** Permitir ao profissional responsável pela merenda escolar, informar os ingredientes que compõem uma
      receita.

- [ ] **15.** Permitir ao profissional responsável pela merenda escolar, realizar o cadastro de receita.

- [ ] **16.** Permitir ao profissional responsável pela merenda escolar, visualizar o histórico de vínculos
      (realizados e desfeitos) dos alunos no(s) grupo(s) de consumo.

- [ ] **17.** Possibilitar que o profissional responsável pela merenda escolar, visualize os alunos que possuem
      restrições alimentares relacionados ao cardápio escolar registrado.

- [ ] **18.** Permitir ao profissional responsável pela merenda escolar, realizar a substituição de alimentos do
      cardápio para atendimento exclusivo aos alunos com restrições alimentares, possibilitando assim que os alunos
      com restrições tenham um cardápio adequado a sua dieta.

- [ ] **19.** Permitir ao profissional responsável pela merenda escolar, realizar o cadastro de alunos garantindo
      assim o armazenamento de dados pessoais importantes para a rotina da merenda escolar.

- [ ] **20.** Permitir a integração dos alunos entre os sistemas de gestão escolar e gestão da merenda da fornecedora
      do produto, otimizando assim a rotina dos profissionais.

- [ ] **21.** Permitir a integração de dados cadastrais da(s) matrícula(s) do(s) aluno(s) entre os sistemas de gestão
      escolar e gestão da merenda da fornecedora do produto, otimizando assim a rotina do profissional responsável
      pela merenda escolar.

- [ ] **22.** Permitir ao profissional responsável pela merenda escolar, registrar os dados das matrículas dos alunos,
      facilitando o controle da merenda escolar.

- [ ] **23.** Permitir ao profissional responsável pela merenda escolar, desfazer o vínculo dos alunos no(s) grupo(s)
      de consumo, facilitando a organização da merenda escolar.

- [ ] **24.** Permitir ao profissional responsável pela merenda escolar, visualizar dados quantitativos e percentuais
      com situação nutricional dos alunos da rede de ensino.

- [ ] **25.** Permitir ao profissional responsável pela merenda escolar, registrar os fornecedores.

- [ ] **26.** Permitir ao profissional responsável pela merenda escolar, efetuar o registro das Unidades de medida
      utilizadas na rede de ensino.

- [ ] **27.** Permitir ao profissional responsável pela merenda escolar, visualizar, em forma de gráfico, a situação
      nutricional dos alunos da rede de ensino. As visualizações devem estar disponíveis: altura/idade; IMC/Idade;
      Peso/Idade.

- [ ] **28.** Permitir ao profissional responsável pela merenda escolar, inserir uma foto do aluno em seu respectivo
      registro, provendo mais facilidade para os usuários identificar os alunos que consomem a merenda escolar.

- [ ] **29.** Permitir ao profissional responsável pela merenda escolar, registrar os nutricionistas.

- [ ] **30.** Permitir ao profissional responsável pela merenda escolar registrar o nome social do aluno,
      proporcionando assim que o aluno seja reconhecido pelo nome que se identifica.

- [ ] **31.** Permitir que profissional responsável pela merenda escolar, realize o registro dos estabelecimentos de
      ensino.

- [ ] **32.** Disponibilizar por padrão a lista de ingredientes da Tabela Brasileira de Composição de Alimentos –
      TACO.

- [ ] **33.** Permitir ao profissional responsável pela merenda escolar, visualizar os alunos aniversariantes do dia.

- [ ] **34.** Permitir ao profissional responsável pela merenda escolar, efetuar os registros das refeições,
      informando qual(is) receita(s) fazem parte do cardápio, auxiliando na rotina dos profissionais.

- [ ] **35.** Possibilitar o registro das refeições servidas a partir do cardápio escolar.

- [ ] **36.** Permitir ao profissional responsável, registrar o cardápio escolar, tendo a possibilidade de definir as
      refeições diárias que o compõe.

- [ ] **37.** Permitir ao profissional responsável pela merenda escolar, criar grupos de consumo da merenda e realizar
      o vínculo dos alunos por meio de informações da matrícula, restrições alimentares, entre outros, facilitando
      assim a organização da rotina escolar.

- [ ] **38.** Permitir ao profissional responsável pela merenda escolar, registrar os nutrientes dos alimentos
      utilizados pela entidade.

- [ ] **39.** Permitir o registro de tabelas distintas de ingredientes.

- [ ] **40.** Possibilitar a importação de ingredientes da tabela do IBGE, facilitando o cadastramento dos mesmos.

- [ ] **41.** Possibilitar o cadastramento de ingredientes com suas respectivas informações nutricionais.

- [ ] **42.** Disponibilizar aos usuários o envio de feedback sobre o produto, possibilitando uma comunicação imediata
      do usuário com a empresa sobre a experiência com o produto.

- [ ] **43.** Possibilitar o registro do nome social dos alunos, proporcionando assim que o aluno seja reconhecido
      pelo nome que se identifica.

## Item 38 - Software de Educação Municipal - Transporte Escolar

*Fonte: Anexo I, páginas 152-154/194.*

- [ ] **1.** Permitir ao profissional responsável pelo controle do transporte escolar, registrar as rotas contendo o
      endereço de saída e chegada, pontos de embarque e desembarque, bem como os horários, veículos, fornecedores e
      motoristas.

- [ ] **2.** Possibilitar ao usuário a visualização em mapa contendo o detalhamento da rota, ou seja, visualização do
      itinerário percorrido entre o endereço de saída, os pontos intermediários e o endereço de chegada.

- [ ] **3.** Calcular automaticamente a distância percorrida (em km), considerando a quilometragem total percorrida
      entre o Endereço de saída e Endereço de chegada, e os pontos intermediários da rota.

- [ ] **4.** O sistema deve permitir que o usuário altere a distância percorrida (em km) da rota, calculada
      automaticamente pelo sistema.

- [ ] **5.** Permitir a impressão do itinerário da rota, inclusive com o mapa.

- [ ] **6.** Possibilitar a manutenção da lista de deficiências das pessoas.

- [ ] **7.** Permitir ao profissional responsável, registrar os dados da(s) matrícula(s) dos usuários do transporte
      escolar.

- [ ] **8.** Permitir a integração de dados dos estabelecimentos de ensino, dos usuários e das matrículas dos usuários
      entre os sistemas de gestão escolar e gestão do transporte escolar da fornecedora do produto.

- [ ] **9.** Permitir registrar os tipos de usuários do transporte escolar.

- [ ] **10.** Permitir ao profissional responsável pelo controle do transporte escolar, registrar as marcas e tipos
      dos veículos utilizados no município.

- [ ] **11.** Permitir ao profissional responsável pelo controle do transporte escolar, realizar o registro dos
      veículos utilizados pela entidade.

- [ ] **12.** Permitir ao profissional responsável pelo controle do transporte escolar, definir a(s) rota(s) por
      matrícula dos usuários do transporte escolar.

- [ ] **13.** Possibilitar a manutenção da lista de e-mails e telefone das pessoas.

- [ ] **14.** Permitir registrar as situações da carteirinha de transporte escolar, para determinar a validade,
      suspensão e atividades sobre o uso do transporte escolar.

- [ ] **15.** Permitir ao profissional responsável pelo controle do transporte escolar, registrar os pontos da rota
      por meio do recurso de mapa.

- [ ] **16.** Permitir ao profissional responsável, registrar as informações dos motoristas.

- [ ] **17.** Permitir ao profissional responsável pelo controle do transporte escolar, definir a(s) rota(s) por
      lotação física dos usuários do transporte escolar.

- [ ] **18.** Permitir ao profissional responsável, registrar a(s) apólice(s) de seguro de cada veículo utilizado pela
      entidade.

- [ ] **19.** Permitir inserir foto no cadastro do aluno usuário do transporte.

- [ ] **20.** Permitir ao profissional responsável pelo controle do transporte escolar, registrar os estabelecimentos
      de ensino da entidade.

- [ ] **21.** Permitir ao profissional responsável pelo controle do transporte escolar, registrar as informações dos
      modelos de veículos utilizados pela entidade.

- [ ] **22.** Possibilitar o registro do(s) responsável (eis) pelos usuários do transporte escolar.

- [ ] **23.** Permitir ao profissional responsável pelo controle do transporte escolar, definir a(s) a lotação(ões)
      física(s) de professores usuários do transporte escolar.

- [ ] **24.** Permitir ao profissional responsável, realizar a gestão de usuários do transporte escolar.

- [ ] **25.** Permitir ao profissional responsável, registrar os dados da carteirinha de transporte escolar.

- [ ] **26.** Permitir ao profissional responsável, definir os pontos de embarque e desembarque da rota.

- [ ] **27.** Possibilitar o registro da filiação dos usuários do transporte escolar.

- [ ] **28.** Permitir o registro de fornecedores de serviços do transporte escolar.

- [ ] **29.** Permitir o controle do transporte escolar por ano letivo.

- [ ] **30.** Disponibilizar aos usuários o envio de feedback sobre o produto, possibilitando uma comunicação imediata
      do usuário com a empresa sobre a experiência com o produto.

## Item 39 - Software de Educação Municipal - Pais, Alunos e Responsáveis

*Fonte: Anexo I, página 154/194.*

- [ ] **1.** Permitir a integração de dados de forma automática com o sistema de Gestão Educacional.

- [ ] **2.** Possibilitar que alunos, seus pais ou responsáveis possam realizar a solicitação de rematrícula pelo
      sistema.

- [ ] **3.** Disponibilizar aos pais, alunos e responsáveis um ambiente para consulta do diário de classe,
      possibilitando consultar a frequência, desempenho escolar, instrumentos de avaliação, planejamento de aulas,
      conteúdo ministrado, atividades, quadro de horários e acompanhamentos.

- [ ] **4.** Disponibilizar aos pais, alunos e responsáveis a visualização do agendamento, a realização e o resultado
      de provas, trabalhos e demais instrumentos de avaliação, proporcionando fácil acesso às informações pertinentes
      ao desempenho do aluno.

- [ ] **5.** Possibilitar realizar o download de arquivos que os professores disponibilizam no ambiente.

- [ ] **6.** Permitir a consulta dos quadros de horários das turmas em que o aluno esteja enturmado em um ano letivo.

- [ ] **7.** Permitir a exibição das aulas realizadas pelos professores, com as informações de identificação da aula,
      da frequência, planejamento e conteúdo ministrado.

- [ ] **8.** Permitir a exibição do calendário escolar associado a matrícula do aluno, contendo lista de eventos e
      feriados do respectivo calendário.

- [ ] **9.** Permitir a visualização e consulta do planejamento de aulas do aluno registrado pelos professores.

- [ ] **10.** Permitir a visualização do conteúdo ministrado ao aluno registrado pelos professores, com suas
      respectivas características específicas.

- [ ] **11.** Permitir a exibição dos registros de acompanhamento pedagógico, com suas respectivas características
      específicas.

- [ ] **12.** Permitir a visualização do desempenho por competências.

- [ ] **13.** Permitir a exibição do parecer do professor.

- [ ] **14.** Permitir a visualização das informações do desempenho escolar do aluno em forma de gráfico.

- [ ] **15.** Permitir a visualização do total de faltas por período avaliativo, do percentual de frequência e da
      frequência diária em cada aula.

- [ ] **16.** Possibilitar aos alunos, pais e responsáveis pelos alunos a consulta e impressão do boletim escolar do
      aluno, ou seja, o desempenho escolar obtido pelo aluno ao final dos períodos avaliativos e do período letivo.

- [ ] **17.** Permitir a consulta das matrículas do aluno na rede de ensino, com sua situação e demais características
      específicas.

- [ ] **18.** Permitir o acesso por meio de chave de acesso sem necessidade de cadastro de login.

- [ ] **19.** Disponibilizar aos pais, alunos e responsáveis recursos para registrar e enviar atividades pedagógicas
      para os professores, bem como enviar comentários para o professor sobre a atividade.

## Item 40 - Software de Educação Municipal - Biblioteca

*Fonte: Anexo I, páginas 154-155/194.*

- [ ] **1.** Possuir cadastro para classificação dos exemplares, permitindo informar a Classificação Decimal de Dewey
      (CDD), Classificação Decimal Universal (CDU), Classe conforme tipo de classificação, possibilitando a escolha de
      uso de uma destas classificações.

- [ ] **2.** Permitir o cadastro de coleções e séries dos exemplares, permitindo informar a descrição, quantidade de
      volumes e o tipo, com as opções coleção ou série.

- [ ] **3.** Permitir o cadastro de classificação cutter, permitindo cadastrar o código cutter e uma descrição.

- [ ] **4.** Permitir cadastrar as editoras e produtoras dos materiais da biblioteca.

- [ ] **5.** Permitir cadastrar as seções, permitindo informar a biblioteca, conforme cadastro de bibliotecas, a
      descrição e a colocação, com as opções: armário, prateleira, ou outro, além da colocação inicial, final e
      localização.

- [ ] **6.** Permitir cadastrar os assuntos dos exemplares, informando a descrição e o nível.

- [ ] **7.** Permitir o cadastro de bibliotecas, possibilitando manter os dados cadastrais das bibliotecas do
      município.

- [ ] **8.** Permitir cadastrar e manter os dados cadastrais dos idiomas.

- [ ] **9.** Permitir cadastrar os materiais do acervo da biblioteca, permitindo informar ao menos o tipo do material,
      título, capa do material, editora, coleção / série, assunto, idioma, data de cadastro do material, número de
      páginas, volume, edição, palavras-chave e prefácio.

- [ ] **10.** Possuir cadastro de Autores, permitindo manter os dados cadastrais dos autores.

- [ ] **11.** Permitir disponibilizar uma lista de tipos de materiais da biblioteca, disponibilizando as opções de
      obras literárias, publicações periódicas e mídias digitais.

- [ ] **12.** Permitir cadastrar as devoluções dos materiais do acervo da biblioteca que foram locados.

- [ ] **13.** Permitir cadastrar os leitores da biblioteca, permitindo informar o nome da pessoa, CPF, RG, data de
      nascimento, naturalidade, telefone e e-mail.

- [ ] **14.** Permitir cadastrar os dependentes dos leitores da biblioteca, permitindo informar o nome da pessoa, CPF,
      RG, data de nascimento, naturalidade, telefone e e-mail.

- [ ] **15.** Permitir a suspensão dos leitores de acordo com a situação do leitor.

- [ ] **16.** Permitir que o usuário desfaça a suspensão de leitores de acordo com a situação do leitor.

- [ ] **17.** Permitir cadastrar os empréstimos dos materiais do acervo da biblioteca. O cadastro deverá conter as
      informações do leitor, dependente, data e hora do empréstimo, título do exemplar do material do acervo e a data
      prevista de devolução.

- [ ] **18.** Permitir a pesquisa de materiais do acervo da biblioteca.

- [ ] **19.** Permitir o cadastro de eventos e feriados.

- [ ] **20.** Permitir a pesquisa dos exemplares por um termo livre, podendo buscar informações constantes no título,
      ou nome do autor.

- [ ] **21.** Permitir visualizar de forma detalhada o exemplar pesquisado.

## Item 43 - Software de Contabilidade para a Câmara de Vereadores

*Fonte: Anexo I, páginas 155-167/194.*

- [ ] **1.** Possibilitar a interação entre os sistemas Contábil e Folha de Pagamento, tornando possível a interação
      com o cadastro de empenhos da folha sem a necessidade de digitação, devendo permitir a geração prévia dos
      empenhos estimativos e ordinários possibilitando o ajuste dos registros antes da efetivação.

- [ ] **2.** Permitir a geração das liquidações de empenhos, retenções e despesas extras a partir da integração da
      folha de pagamento, possibilitando ao usuário interagir através de um painel com os registros oriundos dos
      serviços de interação da Folha, com efetivação dos empenhos e liquidações de forma automática.

- [ ] **3.** Permitir a geração das Despesas Extra orçamentárias, referentes a pagamentos antecipados e outras origens
      extras, de forma agrupada por classificação e fonte de recurso ou não agrupada.

- [ ] **4.** Possibilitar a construção de configuração customizável para gestão e integração dos dados da folha de
      pagamento, relacionando despesas, vínculos empregatícios, organogramas e recursos.

- [ ] **5.** Emitir relatório para conferência da relação dos empenhos da integração com a folha de pagamento, bem
      como gerados em cada interação, com identificador da interação, Credor, retenções, valor do empenho.

- [ ] **6.** Permitir o cadastro de empenhos em atendimento ao fluxo operacional proporcionado pela Lei nº 4.320/64.
      Ao salvar o registro, o sistema deverá permitir ao usuário escolher qual fase deseja salvar ao gravar o empenho,
      salvar e iniciar "Em liquidação", "salvar e Liquidar”, sem necessidade de abertura de outros menus. Ainda
      possibilitando ao gravar o empenho as opções de salvar e reter e salvar e copiar o cadastro do empenho.

- [ ] **7.** Propiciar configuração de parâmetro de inclusão de responsáveis para ateste da liquidação e responsáveis
      do pagamento de empenhos e despesa extra. Assim liberando para inserir o responsável do ateste da liquidação com
      a data e o responsável pelo ateste e responsáveis nos demais cadastros. E ainda possibilitar adicionar novo
      responsável caso não exista pelo próprio campo de Responsáveis da liquidação e pagamentos.

- [ ] **8.** Permitir o cadastro de Cartões Corporativos para controle de adiantamento e diárias, informando os
      credores (pessoa física) e os dados do cartão corporativo, como o número do cartão, se há vínculo automático ao
      adiantamento e vínculo automático à diária concedida. Possibilitando ainda a inclusão de um ou mais cartão
      corporativo por credor.

- [ ] **9.** Possibilitar após o registro do Cartões Corporativos para controle de adiantamento e diárias o sistema
      faça o vínculo automático no momento da baixa dos pagamentos de empenhos de adiantamentos e diárias dos
      servidores da entidade.

- [ ] **10.** Possibilitar na rotina da gestão dos adiantamentos e diárias seja demonstrado o cartão corporativo
      vinculado ao pagamento em questão facilitando a visualização dos itens da listagem que possuem e não possuem
      cartões corporativos vinculados e ainda possibilitando filtrar e visualizar os adiantamentos e diárias por
      cartão.

- [ ] **11.** Permitir a exibição das exigências legais incluídas no sistema, em formato de calendário, tendo as
      informações de Data Limite, a Exigência Legal, Área de negócio, Limite Legal, Abrangência e Vencimento e atraso
      do prazo para atendimento da exigência.

- [ ] **12.** Permitir na Exibição das Exigências legais poder filtrar por período, área de negócio com a listagem dos
      sistemas, abrangência Estadual ou Federal e a listagem de todos os Estados. Ainda detalhando as informações de
      cada exigência legal com dados das exigências, Tipo, Dicas e Links úteis de acesso de leiautes, portarias,
      central de ajuda e acesso ao TCE.

- [ ] **13.** Permitir o cadastro dos ingressos orçamentários, por meio da interação com o sistema de gestão de
      tributos do município e que o usuário possa definir se deseja efetivar as arrecadações individualmente e também
      efetivar as arrecadações e anulações automaticamente por meio de uma configuração previamente realizada.

- [ ] **14.** Permitir no ingresso das arrecadações oriundas do Tributos, que quando adicionada individual no contábil
      pelo painel de interação, possibilitar descartar o recebimento informando o motivo em caso de alguma informação
      indevida. Assim devolvendo ao sistema tributos para ajuste e reenvio de uma nova interação.

- [ ] **15.** Possibilitar consulta rápida na listagem das arrecadações através de ícone identificando as arrecadações
      que foram oriundas do sistema de tributos e ainda filtro de pesquisa somente dessas arrecadações oriundas da
      integração sem a necessidade de emissão de relatórios para conferências.

- [ ] **16.** Permitir o cadastro de Naturezas das Receitas com suas respectivas características específicas e no
      cadastro deverá informar seu Número: respeitando a formatação prévia na configuração de natureza de receita, seu
      Tipo (sintético ou analítico), sua Descrição e Marcadores vinculados.

- [ ] **17.** Permitir consultar os cadastros de Natureza de Receita existentes listando o número e descrição,
      permitir a edição, exclusão e a ação de desdobramento das naturezas de receitas.

- [ ] **18.** Permitir através de painéis interativos, a consulta dos Saldos da Despesa facilitando rápida consulta
      dos saldos sem necessidade de emissão de relatório. Demonstrando a relação das Despesas com descrição da ação,
      Natureza da despesa e informação do código e descrição dos recursos e valor atualizado das despesas.

- [ ] **19.** Possibilitar em todas as funcionalidades de inclusão da despesa no sistema, o usuário possa clicar sobre
      o código da despesa e visualizar o detalhamento completo da Despesa com informações da Despesa (número) Entidade
      (descrição), Organograma, Função, Subfunção, Programa (número + descrição), Ação (número formatado + descrição),
      Natureza da despesa (número formatado + descrição de todos os níveis da natureza utilizada), Recursos (número
      formatado + descrição) e Metas Físicas (quantidade + unidade de medida + produto + localizador).

- [ ] **20.** Controlar os saldos das dotações orçamentárias em tempo real, não permitindo inclusão de bloqueio e
      empenhamento em dotações que ultrapasse o saldo disponível e ou, sem saldo, devendo ser controlado o saldo
      diário.

- [ ] **21.** Permitir o cadastro das Naturezas de Despesas, informando o Número da natureza, Tipo Sintético ou
      Analítico, sua descrição, e inclusão de marcadores específicos para conferências futuras.

- [ ] **22.** Propiciar a consulta dos cadastros de Naturezas de Despesas em listagem com Número e descrição das
      naturezas e possibilitando realizar a edição, exclusão e o desdobramento de Natureza da despesa.

- [ ] **23.** Propiciar o cadastro de Despesas Não previstas na LOA, que são aquelas que não contemple a realização
      dos seus gastos previstos na elaboração da LOA e que após receberão recursos financeiros através de operações de
      alterações orçamentárias. Assim, possibilitar incluir essas despesas não previstas com as informações do
      Organograma, Programa, Ação, Função, Subfunção, Localizador e Natureza da despesa e visualizá-las através de
      listagem com ação de edição e exclusão.

- [ ] **24.** Possibilitar o cadastro de Receitas não previstas na LOA, assim como as despesas, muitas vezes a LOA não
      prevê a realização de determinados ingressos e após seu cadastro essas receitas recebem recursos por meio da
      alteração orçamentária (reestimativa). Assim possibilitar o cadastramento com a Natureza da receita e
      Organograma para futuros ingressos.

- [ ] **25.** Possibilitar o cadastro de Despesas Extras, ou seja, de dispêndios extra orçamentários, sejam eles
      provenientes de ARO (Antecipação de Receita Orçamentária), Consignações, Cauções e demais classificações extras.
      O dispêndio não depende de autorização legislativa, ou seja, não integra o orçamento público. O cadastro deve
      permitir informar ao menos o número, data, credor, especificação, classificação, identificador, valor,
      vinculação de suas origens e vencimento.

- [ ] **26.** Permitir o cadastro de Credores informando Nome do credor, CPF/CNPJ, data da inclusão, dados pessoais,
      dados dos documentos como Naturalidade, Nacionalidade, RG, órgão emissor, UF, data de emissão e possa ser
      informado também o PIS/PASEP/NIT, Inscrição municipal e município da inscrição. Inserir ainda a informação das
      contas bancárias, selecionar se é produtor rural ou prestadores de serviços, classificando e informando as
      naturezas de rendimentos para cada credor para o envio ao EFD-Reinf.

- [ ] **27.** Propiciar o cadastro das Ações de Governo conforme necessidade da entidade, consistindo em informar seu
      Número, seu Tipo, sua Descrição e Finalidade, permitindo a interação por meio de listagem, podendo o usuário
      editar e excluir o registro de uma ação. Além disso, o usuário poderá visualizar as alterações da ação, bem como
      desfazer essas alterações.

- [ ] **28.** Permitir o cadastro de Alterações Orçamentárias da Receita que objetiva alterar o valor previsto da
      Receita ou até mesmo criar Receitas que por algum motivo não foram previstas na LOA. O cadastro deve informar o
      tipo de alteração, sua finalidade, a respectiva Receita, o Recurso da Receita, a Dedução, o Valor da dedução,
      seu Impacto da alteração (se aumenta ou diminui), e o respectivo Valor.

- [ ] **29.** Possibilitar consultar as Alterações Orçamentárias da Receita cadastradas em listagem com detalhes e
      status das alterações as que estão A sancionar e as Sancionadas. Possibilitando a ação de sancionar as
      alterações e ainda editar e excluir uma alteração orçamentária desde que esta não esteja sancionada e reabrir
      alteração caso necessário.

- [ ] **30.** Possibilitar o cadastro de Alterações Orçamentárias da Despesa, informando o Crédito, a Despesa, Tipo do
      crédito, finalidade, Origens e recurso. E visualizar os registros em listagem e permitindo ao usuário interagir
      com as etapas da alteração orçamentárias Créditos em elaboração, Proposta Concluída, No Legislativo e
      Sancionada.

- [ ] **31.** Permitir por meio da Sanção de uma Alteração Orçamentária da Despesa, gerar alteração(ões) da receita
      com tipo de alteração e registrando automaticamente uma alteração de receita.

- [ ] **32.** Permitir Reserva de Dotação nas ações de concluir Proposta e Enviar ao Legislativo das Alteração
      Orçamentária da Despesa, informando a data e selecionando Reservar saldo das despesas, o sistema irá reservar o
      saldo do crédito para que permaneça garantido para o gasto em questão.

- [ ] **33.** Propiciar a visualização e pesquisa das Alterações Orçamentárias da Despesa através de listagem, de modo
      dinâmico, sem necessidade da emissão de relatórios. Possibilitando consultas pelos filtros por Entidade, Número
      da despesa, Número da emenda, Número da solicitação da despesa, tipo do crédito, Origens, Ato autorizativo, ato
      de abertura, Emendas, Responsáveis da emenda, conta bancária e Período da alteração.

- [ ] **34.** Possibilitar via painel o controle dos Limites na LOA, o qual é demonstrando o valor estabelecido do
      valor já consumido e utilizado deste limite. Demonstrando no painel os valores autorizado, utilizado e a
      utilizar. E ainda detalhando o tipo de crédito, entidade, organograma, origem e valores autorizados, utilizados
      e a utilizar das alterações orçamentárias selecionadas para considerar os limites.

- [ ] **35.** Possibilitar aos órgãos, unidades e departamentos a criação de Solicitações de Despesas de Créditos
      Orçamentários para gastos em um orçamento em curso, para futura análise e aprovação pelo setor de orçamento do
      ente. Possibilitando visualizar todas as solicitações cadastradas que estão em elaboração, Anulada, Sancionada,
      Em tramitação de alteração orçamentária, enviada para alteração orçamentária e enviadas para LOA.

- [ ] **36.** Permitir no cadastro de Solicitações de Despesas já existentes, visualizar o histórico do movimento da
      solicitação de créditos orçamentários, bem como a possibilidade de inserir pareceres, tramitar para envio da
      alteração orçamentária, anular e reabrir as solicitações anuladas.

- [ ] **37.** Propiciar a visualização e pesquisa dos bloqueios/desbloqueios através de listagem dinâmica com filtros
      Número da despesa, do processo administrativo e da solicitação de compras, Identificador do bloqueio se é uma
      solicitação de compras, processo administrativo e contrato, recurso, data do bloqueio e do desbloqueio sem
      necessidade da emissão de relatório.

- [ ] **38.** Propiciar o Desbloqueio das despesas bloqueadas para a realização da execução orçamentária. Seu cadastro
      deve informar a Data, seu Valor, sua Finalidade e sua Fonte de recurso.

- [ ] **39.** Propiciar o cadastro de bloqueios e desbloqueios através da listagem, permitindo a interação com os
      filtros dos bloqueios, bem como a realização das operações de desbloquear, editar ou excluir bloqueios.
      Permitindo, ainda, a visualização do histórico do registro (bloqueios e desbloqueios), editar ou excluir um
      registro.

- [ ] **40.** Permitir parametrizar o cadastro de Bloqueios de despesas para o sistema efetivar os bloqueios e
      desbloqueios automaticamente, e também para autorizar previamente cada bloqueio vindo do departamento de
      compras.

- [ ] **41.** Propiciar através de um painel de interação visualizar os registros oriundos do serviço de interação das
      compras, possibilitando a efetivação do bloqueio e desbloqueio orçamentário individualmente e podendo recusá-lo
      com apontamento do motivo.

- [ ] **42.** Permitir o cadastro de Adiantamentos Concedidos de suprimento de fundos e de diárias. Essa
      funcionalidade deve registrar todos os adiantamentos concedidos através do pagamento de empenhos que possuam
      identificadores de Adiantamento e diária. Possibilitando ao usuário visualizar em listagem dinâmica os
      adiantamentos e diárias "Concedido", "A prestar contas", "Encerrados", “Em prestação de contas”, “Devolvido” e
      "todos" em tela, sem necessidade de geração de relatórios.

- [ ] **43.** Propiciar a Devolução de valores não utilizados no adiantamento, atendendo a necessidade da devolução
      dos valores. O usuário poderá executar a devolução do saldo, o que desencadeia a anulação dos documentos de
      pagamento, liquidação, em liquidação (se existir) e empenho com o valor devolvido.

- [ ] **44.** Permitir estorno total ou parcial tanto do saldo da liquidação quanto do valor das retenções,
      possibilitando a substituição ou alteração dos documentos fiscais.

- [ ] **45.** Permitir o cadastro de anulações de liquidação de empenhos, pagamento de empenhos, anulação de
      subempenho, anulação de despesa extra e anulação de arrecadações orçamentárias.

- [ ] **46.** Permitir o cadastro de Atos, com o Número, Tipo do Ato, Natureza do texto jurídico, data da criação,
      data a vigorar, data da sanção, data de publicação, fontes de divulgação, Ementa, Atos alterados, atos revogados
      e possibilitar a inclusão de anexos. E ainda realizar operações de edição e exclusão de atos, bem como ter a
      possibilidade de visualizar documentos em anexo aos atos e fazer o download deles, por meio da listagem
      dinâmica.

- [ ] **47.** Propiciar cadastro de Naturezas de texto jurídico, realizando operações de edição e exclusão de
      naturezas e visualizando-as por meio da listagem dinâmica de descrição.

- [ ] **48.** Permitir a visualização e pesquisa dos Tipos de Atos pela descrição e classificação. Na listagem as
      informações da descrição e classificação devem ser visíveis ao usuário e passíveis de ordenação.

- [ ] **49.** Propiciar a interação com o cadastro de empenhos através da listagem onde o usuário poderá editar e
      excluir empenhos, além de poder realizar cópias de empenho, adicionar subempenho, adicionar liquidação,
      adicionar pagamento, adicionar anulação, emitir relatório e emitir nota, bem como realizar filtros por empenhos
      do exercício e restos a pagar.

- [ ] **50.** Possibilitar selecionar empenho individual ou selecionando vários empenhos efetuar por ação disponível
      de emitir Relatório da relação de empenhos pelo próprio cadastro de empenhos sem a necessidade de acesso a
      outros módulos.

- [ ] **51.** Através da listagem dinâmica de empenhos o usuário poderá visualizar os empenhos liquidados, pagos, A
      liquidar, Em liquidação, A pagar e a Comprovar e efetivar as etapas de Empenho, “liquidações" e "pagamentos",
      além de poder gerar um empenho complementar.

- [ ] **52.** Propiciar a seleção de parâmetro de Utilizar Ordem de baixa para possibilitar a predefinição da conta do
      credor e a conta pagadora no cadastro de liquidação, de despesa extra e de devolução de receita. Assim, nos
      pagamentos essas contas serão carregadas automaticamente.

- [ ] **53.** Propiciar ao usuário realizar o cadastro de liquidação, conforme dispõe o art. 63 da Lei nº 4.320/1964,
      informando Data, valor, Especificação, Comprovantes, Vencimentos, Retenções, Ordem de Baixa e inclusão de
      anexos. E ainda ao salvar a liquidação possibilitar ao usuário a opção de salvar e adicionar nova liquidação
      caso ainda possua saldo a liquidar.

- [ ] **54.** Permitir a opção de copiar o texto da especificação do empenho no cadastro da liquidação, sem a
      necessidade de digitação com preenchimento inteligente e também possibilitar capturar áudio em texto para
      preenchimento em áudio da especificação.

- [ ] **55.** Possibilitar estipular os limites de saldo a serem utilizados no superávit financeiro em alterações
      orçamentárias. Inserindo o cadastro do Superávit financeiro por recursos e registrando esses limites
      estabelecidos do Recurso por conta bancária, valor e organogramas aplicando os controles de valores que serão
      aplicados à entidade da despesa creditada.

- [ ] **56.** Permitir o cadastro de Regras contábeis de escrituração dos registros contábeis cabíveis. O cadastro
      deve informar Número, Título, Período de Vigência, Documento, Abrangência, Aplicabilidade, Condição, Histórico e
      Roteiro contábil.

- [ ] **57.** Permitir cadastrar Diária, com Número, Data, Credor, Organograma, finalidade e destino com a origem e
      dados de data e hora de partida e retorno, Natureza, Ato de concessão, valor unitário e quantidade. Após inserir
      o Identificador no empenho "Diária", esse empenho poderá estar associado a um Credor ou uma Diária.

- [ ] **58.** Permitir inserir Marcadores em vários cadastros do sistema como exemplo, nos casos de atendimento ao
      SIOPE, MDE, Fundeb 60%, Fundeb 40% informações que possibilite organizar, classificar e possibilitar consultas e
      geração de relatórios específicos para agilizar as análises conforme necessidade.

- [ ] **59.** Propiciar o cadastro dos Ordenadores da Despesa com nome completo, CPF e organograma, das autoridades
      cujos seus atos resultam em emissão de empenho, autorização de pagamento, suprimento ou dispêndio de recursos.

- [ ] **60.** Propiciar ao usuário cadastrar e consultar os cadastros de Organogramas, inserindo o número do
      organograma, descrição e tipo de administração. E realizando operações de edição e exclusão de organogramas por
      meio da listagem dinâmica.

- [ ] **61.** Propiciar ao usuário definir parâmetros de configuração o momento que irá realizar as retenções da
      entidade, que poderá ser definida por ser na liquidação, no pagamento e individual por retenção.

- [ ] **62.** Propiciar ao usuário efetuar a Prestação de Contas de adiantamento de suprimentos de fundos e de
      diárias. A prestação de contas do adiantamento deve ser realizada pelo usuário visualização em listagem, sendo
      que na efetiva prestação de contas deverão ser informados o respectivo Número e Data da prestação, os
      comprovantes das despesas vinculadas e seus respectivos valores. Permitindo efetuar a devolução de valores não
      utilizados, caso existam.

- [ ] **63.** Permitir o cadastro de Programas de governo conforme necessidade da entidade. O cadastro deve informar o
      número e descrição, público-alvo, objetivos, justificativa, diretrizes, responsável, horizonte temporal
      contínuo, temporário e período. E possibilitar a visualização dos cadastros em listagem dinâmica.

- [ ] **64.** Permitir o cadastro das Contas Bancárias pertencentes à entidade. No cadastro de contas cadastrar os
      dados bancários, organogramas, responsável, controle de vigência da conta com data inicial, data final e motivos
      para alteração da situação da conta seja ativa e inativa, e administração de recursos informando os recursos
      administradores e movimentadores.

- [ ] **65.** Permitir o cadastro de Comprovantes que possam realizar a gestão dos mesmos com a inclusão da
      classificação, tipo de comprovante, número do comprovante, data de emissão, série, código de validação do
      comprovante, Credor, valores, retenções, finalidade, vencimentos e inclusão de anexos e após possibilitar o
      vínculo dos comprovantes no cadastro de liquidações.

- [ ] **66.** Propiciar o cadastro de Transações Financeiras com descrição e tipo e ainda realizar, através da
      listagem as operações de edição e exclusão, bem como realizar a ativação de determinadas transações financeiras.

- [ ] **67.** Propiciar o cadastro de Unidades de Medidas, realizando operações de edição e exclusão. E possibilitar
      pesquisa e visualização em listagem das informações por Abreviatura e descrição.

- [ ] **68.** Possibilitar realizar o encerramento do Período da Escrituração, permitindo a realização de validações
      importantes como a verificação de saldos contábeis, permitindo o encerramento e também a reabertura de períodos
      seja diário ou mensal. E ainda visualizar o histórico de execuções com data, hora, descrição e usuário a qual
      executou as rotinas.

- [ ] **69.** Permitir o encerramento do Período Financeiro, rotina que permite que a contabilidade realize o controle
      das movimentações físicas da Entidade, por meio da abertura e encerramento dos períodos, validação das
      movimentações, bloqueio de períodos, entre outros. E também possibilitando histórico de início, encerramento e
      reabertura do período com data, hora e usuário a qual executou as rotinas.

- [ ] **70.** Permitir a configuração do Período Financeiro determinando o período aberto de movimentação no sistema,
      em diversas rotinas do sistema permitir selecionar somente dias úteis configurando os dias pelo calendário, bem
      como desbloqueio de campos para edição.

- [ ] **71.** Possibilitar por meio de configuração no Período Financeiro, o roteiro de geração da enumeração
      cadastral dos empenhos, podendo o usuário optar por bloqueá-la, habilitá-la para edição livre ou mesmo optar
      pela ordem cronológica.

- [ ] **72.** Permitir no Encerramento do Período Financeiro a anulação de todos os Empenhos Estimativos com saldo
      para que os mesmos não sejam inscritos em restos a pagar.

- [ ] **73.** Permitir a transferência dos saldos de balanço para o exercício seguinte pelo Período da escrituração ao
      Iniciar o exercício selecionando a opção de executar os lançamentos de abertura e saldos iniciais.

- [ ] **74.** Propiciar ao usuário cadastrar contas contábeis conforme Plano de contas e legislação aplicável, podendo
      visualizar e consultar as contas do plano de contas através de planilha dinâmica.

- [ ] **75.** Permitir inserir Lançamento contábil manualmente para lançamentos que não são contemplados por rotinas
      do sistema, seja por motivos de ajustes ou por razões legais. Inserindo o lançamento o com data, histórico e
      evento contábil conforme necessidade da entidade. E ainda estornar os lançamentos contábeis já existentes. Seu
      estorno deve-se informar o lançamento contábil desejado, sua data de estorno, seu histórico e valor.

- [ ] **76.** Propiciar ao usuário opção de descartar registros de oriundos de integrações de empenhos, anulações,
      liquidações e bloqueios/desbloqueios do Compras, descartar as Arrecadações do sistema de tributos e descartar
      também empenhos da folha de pagamento.

- [ ] **77.** Propiciar ao usuário recepcionar e armazenar os documentos enviados pelos departamentos competentes para
      proceder com a escrituração contábil como exemplo os registros das depreciações e aquisição de bens patrimoniais
      oriundas do sistema patrimônio.

- [ ] **78.** Permitir a geração de demonstrativos gerenciais com visão analítica e sintética das receitas, despesas,
      fontes de recursos e movimentações bancárias.

- [ ] **79.** Propiciar ao usuário consultar dinâmicas e rápidas por Balancete Dinâmico, permitindo controlar através
      de filtros a consulta aos lançamentos e movimentações das contas contábeis. Possibilitando visualizar os
      lançamentos das contas conforme o filtro, apresentando em forma de razão da conta, as movimentações da conta
      analítica em questão. Os filtros possíveis para emissão do balancete dinâmico devem ser por Período: Anual,
      Mensal e Diário; Grupo, Conta, Visão, apenas saldo atual, Conta corrente, Componente, Registro contábil,
      Totalizador por dia, Saldos iniciais, abertura, diários, encerramento e documentos escriturados.

- [ ] **80.** Emitir balancete por fonte de recurso, listando as fontes de recursos e permitindo a execução das visões
      do relatório pelas opções de Superávit financeiro com disponibilidades e obrigações, superávit financeiro,
      superávit financeiro a utilizar e utilizado, superávit financeiro a utilizar e utilizado por conta bancária e
      organograma e demonstrando o saldo.

- [ ] **81.** Possibilitar a geração de informações às prestações de contas federais: SIOPE, SIOPS, DCA, MSC, DIRF,
      EFD-Reinf, RREO, RGF, MANAD.

- [ ] **82.** Emitir os Relatórios Resumidos de Execução Orçamentária (RREO) e Relatórios de Gestão Fiscal (RGF) de
      acordo com a Portaria da STN vigente para o período de emissão.

- [ ] **83.** Emitir os relatórios listados pela Lei 4.320/64.

- [ ] **84.** Emitir relatório de acompanhamento do Ranking na STN sobre a qualidade das informações prestadas
      referente aos arquivos do SICONFI, oportunizando a seleção de qual Dimensão se deseja avaliar.

- [ ] **85.** Emitir relatório para acompanhamento e conferências das informações prestadas ao EFD-Reinf.

- [ ] **86.** Possibilitar o acompanhamento rápida as informações do EDF-Reinf de forma atualizada com data, hora,
      estimativas de horas para resolver possíveis ajustes e alertas informações em gráficos dos eventos gerados,
      envios federais e envios pendentes das informações referente ao EFD-Reinf ao sistema gestor do e-Social.

- [ ] **87.** Permitir a emissão de notas e relatórios a partir do próprio ambiente de cadastros.

- [ ] **88.** Realizar via interação entre os sistemas Contábil e Compras a integração dos com registros de empenhos,
      anulações de empenhos e liquidação.

- [ ] **89.** Propiciar a inclusão dos empenhos de alterações contratuais do tipo "aditivo" ou "apostilamento" via
      interação com o compras pela emissão de empenhos

- [ ] **90.** Permitir o envio de dados financeiros das movimentações bancárias ao portal de transparência para a
      população em conformidade com a Lei de Acesso à Informação de Nº 12.527/11.

- [ ] **91.** Permitir a alteração do exercício e entidade logada no sistema de forma simples e rápida.

- [ ] **92.** Possibilitar cadastro de Responsáveis vinculados a entidade inserindo seus dados pessoais, descrição do
      cargo, endereço, período de responsabilidades com data inicial, data final, tipo de responsável, ato,
      organograma e motivo da baixa e inclusão de anexos.

- [ ] **93.** Permitir a realização da Prestação de Contas para o Tribunal de Contas, referente aos atos
      administrativos, dados contabilizados, dados financeiros e dados do orçamento.

- [ ] **94.** Propiciar que pessoas físicas ou jurídicas fornecedoras do município consultem os empenhos que estão
      pendentes de pagamento pelo município via dispositivo móvel.

- [ ] **95.** Possuir painel de interação das Solicitações de Despesas solicitadas pelos departamentos para inclusão
      dos créditos orçamentários e devolução da solicitação caso necessário.

- [ ] **96.** Possibilitar a inclusão de emendas, por meio do cadastramento das Emendas parlamentares relativas ao
      orçamento anual da entidade. E possibilitando a vinculação, consulta e visualização das emendas aos recursos
      informados nos cadastros das despesas, das solicitações de despesas e das alterações orçamentárias da despesa.

- [ ] **97.** Permitir inserir a Publicidade dos relatórios de Gestão Fiscal e Resumido da Execução Orçamentária da
      LRF, informando o Poder, Tipo, Ano, Período de referência, competência e Publicações com a data de publicação,
      fonte de divulgação e descrição.

- [ ] **98.** Permitir a construção de relatórios personalizados com base nos registros das funcionalidades e
      possibilitando sua configuração por meio da fonte do sistema com ações de colunas, filtros e ordenações, bem
      como a inclusão de parâmetros conforme a necessidade da entidade.

- [ ] **99.** Permitir a definição das configurações de permissões para os acessos às funcionalidades do sistema da
      entidade, identificando se o usuário possui autorização para acesso, criação, edição ou exclusão de dados.

- [ ] **100.** Permitir o registro dos entes que são a representação jurídica da corporação, além da representação
      jurídica e legal da entidade, ao informar dados como a imagem do brasão da entidade, seu nome, CNPJ, sigla,
      natureza jurídica, seu endereço, bairro, município, número e CEP, os dados para contato como e-mail, site,
      telefone, fax, bem como, o horário de funcionamento do ente, a esfera governamental, o identificador de entidade
      RPPS e o fuso horário.

- [ ] **101.** Propiciar o registro dos Tipos de Certidões expedidas por órgãos, ao informar uma descrição para serem
      utilizadas no cadastro de Certidões dos Convênios. E possibilitar consulta por meio da listagem e realizando
      operações de edições e exclusões das mesmas.

- [ ] **102.** Propiciar cadastrar e realizar a consulta dos cadastros de Convenentes e Concedentes informando o nome,
      tipo de Física ou Jurídica e CPF/CNPJ recebimento e repasses de recursos e possibilitar a visualização dos
      cadastros por meio da listagem

- [ ] **103.** Propiciar ao usuário realizar pesquisa dos Convênios Recebidos cadastrados ao informar respectivo
      convênio, seu objeto ou situação do mesmo, o aditivo, sua justificativa ou situação do mesmo, demonstrando-os e
      ordenando-os por meio de listagem as informações do registro, ensejando maior visibilidade das informações que o
      usuário necessitar.

- [ ] **104.** Permitir o registro de Certidões do Convenente, ao informar qual o nome do mesmo, o número e o tipo da
      certidão, bem como, a data da emissão e validade.

- [ ] **105.** Possibilitar a pesquisa das Certidões de Convenentes cadastradas, ao informar o respectivo convenente,
      o número da certidão e o tipo, demonstrando-os e ordenando-os por meio de listagem a informação da pesquisa, bem
      como, a data de emissão e validade, ensejando maior visibilidade das informações que o usuário necessitar.

- [ ] **106.** Permitir cadastro e consultas das Modalidades em que os Convênios podem ser firmados, cadastradas ao
      informar uma descrição e demonstrando-as por meio de listagem.

- [ ] **107.** Possibilitar o Cadastro de Certidões da Entidade com Número, tipo, data de emissão e data de validade.
      E ainda possibilitar as operações de edições e exclusões dos mesmos.

- [ ] **108.** Possibilitar ao usuário realizar a Pesquisa das Certidões da entidade cadastradas ao informar o seu
      número e o tipo, demonstrando-os e ordenando-os por meio de listagem a informação da pesquisa, bem como, a data
      de emissão e validade.

- [ ] **109.** Possibilitar a inclusão de novos campos complementares nos principais cadastros do sistema, podendo
      selecionar o tipo de dado que pode ser Área de Texto, CNPJ, CPF, Data, Data/Hora, E-Mail, Hora, Inteiro, Lista
      de seleção, Múltipla Seleção, Telefone, Texto e Valor (Fracionário), descrição, tamanho, dica de preenchimento
      quando o tipo de dado exigir e ainda indicar se ele é de preenchimento obrigatório ou não. Possibilitar também o
      agrupamento destes dados e a sua publicação entre as entidades.

- [ ] **110.** Possibilitar a Prestação de Contas de Convênios Recebidos de forma ágil, por meio de informações
      básicas como a data da respectiva prestação e o valor da mesma, o valor do rendimento da aplicação, bem como, o
      devolvido.

- [ ] **111.** Possibilitar ao usuário consulta dos cadastros de Convênios Recebidos com opção por visualizar todos os
      registros, somente aqueles que são os convênios, mesmo somente os aditivos, tanto quanto, aqueles que estão em
      situação de prestação e mesmo se já foram concluídos, realizando operações de edições e exclusões das prestações
      de contas, caso possuam, bem como, verificar e excluir as situações que o convênio apresentar.

- [ ] **112.** Possibilitar a pesquisa dos Convênios Recebidos cadastrados ao informar respectivo convênio, seu objeto
      ou situação do mesmo, o aditivo, sua justificativa ou situação do mesmo, demonstrando-os e ordenando-os por meio
      de listagem as informações do registro, ensejando maior visibilidade das informações que o usuário necessitar.

- [ ] **113.** Possibilitar o cadastro de Tipos de Aditivos de Convênios, informar sua classificação como decréscimo
      ou acréscimo, a configuração do seu tipo como prazo, valor ou prazo e valor, bem como, uma descrição para
      identificação cadastral.

- [ ] **114.** Possibilitar a gestão de permissões de acessos, funcionalidades e ações por usuários e grupos de
      usuários, a partir de uma ferramenta de acessos.

- [ ] **115.** Permitir ao usuário realizar o registro do Tipo de Situação dos Convênios, ao informar uma descrição se
      estão em execução. concluído, Paralisado, Aprovado, Cancelado e após efetuar a atualização da situação dos
      convênios.

- [ ] **116.** Possibilitar o cadastro de Responsáveis com Nome, CPF e Tipo para pessoas que podem assumir algum tipo
      de responsabilidade perante os Convênios de determinado ente público.

- [ ] **117.** Possibilitar atualizações das Situações dos Convênios Recebidos e repassados, inserindo o tipo da
      situação se está em execução, concluído, Paralisado, Aprovado, Cancelado, data e motivo de forma flexível.

- [ ] **118.** Permitir o registro do Tipo de repasse dos Convênios, ao informar uma descrição e uma classificação que
      represente tal repasse.

- [ ] **119.** Possibilitar a pesquisa dos Tipos de Repasses dos Convênios cadastrados, ao informar a descrição,
      demonstrando-os e ordenando-os por meio de listagem a informação da pesquisa, ensejando maior visibilidade das
      informações que o usuário necessitar.

- [ ] **120.** Permitir o cadastro dos Convênios Repassados ao informar o número do respectivo convênio, o valor do
      repasse, da contrapartida e o global, o referente tipo e objeto, o período, a data da assinatura, a conta
      bancária, qual a modalidade do respectivo convênio, o convenente, as certidões emitidas, bem como, o(s)
      responsável(eis) e inclusão de anexos.

- [ ] **121.** Permitir o cadastro dos Convênios Recebidos ao informar o número do respectivo convênio, o valor do
      repasse, da contrapartida e o global, o referente objeto, o período, a data da assinatura, a conta bancária,
      qual a modalidade do respectivo convênio, a concedente, as certidões emitidas, bem como, o(s) responsável(eis) e
      o recurso, bem como o Ato autorizativo e Ato de publicação.

- [ ] **122.** Possibilitar a consulta dos cadastros de Convênios Repassados por meio da listagem, aplicando filtros
      conforme a necessidade, seja na opção por visualizar todos os registros ou somente aqueles que são os convênios
      ou mesmo somente os aditivos, tanto quanto, aqueles que estão em situação de prestação ou mesmo se já foram
      concluídos. Visualizar ainda a etapa que os convênios se encontram, ou seja, se estão ainda em formalização, se
      estão em execução ou em prestação de contas, bem como, se foram concluídos. Além de realizar operações de
      edições, exclusões ou reaberturas dos mesmos, bem como, verificar e excluir as situações que o convênio
      apresentar.

- [ ] **123.** Permitir a construção de interações com usuário como validações, notificações, envio de e-mail, entre
      outros, mostradas durante a operacionalização de funcionalidades, objetivando alertar ou comunicar.

- [ ] **124.** Possibilitar adicionar Aditivos a Convênios Recebidos, no cadastro informar o número e tipo do aditivo,
      Ato autorizativo, a data da assinatura e do término, o valor decrescido no repasse e na contrapartida, bem como,
      o valor global do decréscimo, justificativa e inclusão de anexos.

- [ ] **125.** Possibilitar a inclusão de Aditivos a Convênios Repassados de forma ágil e flexível, ao informar o
      número e tipo do aditivo, a data da assinatura e do término, o valor decrescido no repasse e na contrapartida,
      bem como, o valor global do decréscimo e justificativa.

- [ ] **126.** Que nos Convênios Repassados e Recebidos o sistema demonstre notificação dos convênios que ainda não
      foi assinado e sem da data de assinatura.

- [ ] **127.** Permitir o registro dos entes que são a representação jurídica da corporação que possui a licença do
      software, além da representação jurídica e legal da entidade em si, ao informar dados como a imagem do brasão da
      entidade, seu nome, CNPJ, sigla, natureza jurídica, seu endereço, bairro, município, número e CEP, os dados para
      contato como e-mail, site, telefone, fax, bem como, o horário de funcionamento do ente, a esfera governamental,
      o identificador de entidade RPPS e o fuso horário.

- [ ] **128.** Permitir o registro dos Tipos de Impactos para estimativa de aumento da despesa, ou seja, sejam elas:
      -Aumento de despesa obrigatória de caráter continuado (art. 17 da LRF); - Criação de ação governamental -
      aumento da despesa (art. 16 da LRF); - Criação de despesa obrigatória de caráter continuado (art. 17 da LRF); -
      Expansão e/ou aperfeiçoamento de ação governamental - aumento da despesa (art. 16 da LRF).

- [ ] **129.** Possibilitar a pesquisa dos Tipos de Conselhos Municipal cadastrados, ao informar a descrição,
      demonstrando-os e ordenando-os por meio de listagem a informação da pesquisa, disponibilizando maior
      visibilidade das informações que o usuário necessitar.

- [ ] **130.** Possibilitar incluir Tipos de Membros do Conselho Municipal, realizando operações de edições e
      exclusões dos mesmos.

- [ ] **131.** Permitir o registro do Planos de Controle Interno do ente por sistema administrativo, possibilitando a
      inclusão de arquivos anexos, percentual de execução mensal do respectivo plano, bem como, o período.

- [ ] **132.** Possibilitar a pesquisa dos Planos de controle interno cadastrados, pela informação de pesquisa, bem
      como, o mês, data e conclusão do plano, ensejando maior visibilidade das informações que o usuário necessitar.

- [ ] **133.** Permitir o registro de Conselhos Municipais, ao informar uma descrição, qual o tipo do conselho e seu
      ato, qual o tipo da reunião, ou seja, se é entre os gestores ou conselho de educação etc., bem como, informar
      quem são os membros participantes.

- [ ] **134.** Possibilitar a pesquisa dos Conselhos Municipais cadastrados, ao informar a descrição, a data, o tipo
      do conselho ou o ato autorizativo, bem como, o tipo de reunião, a data de início do conselho, a data e
      periodicidade das reuniões, os membros participantes, o CPF e o tipo dos mesmos, ensejando maior visibilidade
      das informações que o usuário necessitar.

- [ ] **135.** Permitir o registro dos Responsáveis pelo Controle Interno público de determinado ente, ao informar os
      dados pessoais do responsável, ou seja, nome, CPF e RG, seu endereço, telefone e e-mail, a descrição e o tipo do
      cargo que ocupa, bem como, o período de vigência como responsável pelo controle.

- [ ] **136.** Permitir o registro de documentos referente às Normas de Controle Interno do ente, por sistema
      administrativo, com a possibilidade de realizar inclusões de arquivos anexos, bem como, informar a qual sistema
      administrativo é pertencente, o assunto e data do registro.

- [ ] **137.** Permitir o registro dos Tipos de Bens, ao informar uma descrição quando passíveis de declaração a se
      realizar por ocupantes de cargos eletivos municipais.

- [ ] **138.** Possibilitar a interação com o cadastro de Tomadas de Contas Especiais por meio da listagem, com as
      respectivas etapas, como instaurada, em andamento ou concluída. Nas fases instaurada e em andamento, é possível
      adicionar o responsável, a publicação e documentos, bem como, tramitar as tomadas de contas para conclusão,
      informando assim, a data de conclusão, situação, número do processo TCE, valor e parecer.

- [ ] **139.** Possibilitar na etapa em andamento da Tomadas de Contas Especiais, além de anexar documentos deve
      permitir realizar o download e visualizar as publicações vinculadas. E na etapa concluída, podem ser realizados
      os filtros das tomadas de contas por procedente, improcedente ou todos, bem como, realizar a reabertura das
      tomadas de contas, visualizando e editando.

- [ ] **140.** Permitir o registro das Unidades Centrais de controle interno, informando data, descrição e ato.

- [ ] **141.** Possibilitar a interação com os cadastros de Conselhos Municipais por meio da listagem, realizando
      operações de edições e exclusões dos mesmos, bem como, alternando entre outros cadastros, como o de reuniões e
      de membros do conselho.

- [ ] **142.** Permitir o controle por meio do registro da Estimativa de Impacto do Aumento da Despesa, conforme
      determinações da LRF, ao informar a data da estimativa, o tipo de impacto, o ato autorizativo, bem como,
      possibilidade a inclusão de anexos.

- [ ] **143.** Possibilitar os cadastros dos Tipos de Reuniões realizando operações de edições e exclusões dos mesmos
      e vínculos ao cadastro das reuniões do conselho municipal.

- [ ] **144.** Possibilitar a cadastro e pesquisa das Reuniões do Conselho Municipal, ao informar o tipo de reunião,
      data da reunião e inclusão de anexos. Demonstrando-as e ordenando-as por meio de listagem a informação da
      pesquisa, bem como, a data da reunião, disponibilizando maior visibilidade das informações que o usuário
      necessitar.

- [ ] **145.** Possibilitar a pesquisa dos Membros do Conselho Municipal cadastrados, ao informar o nome do membro,
      demonstrando-os e ordenando-os por meio de listagem a informação da pesquisa, bem como, a entidade representada,
      a data da vigência do membro e o tipo e a data do início.

- [ ] **146.** Permitir o Registro de Membros dos Conselhos Municipais, informando seus dados, sejam eles pessoas
      físicas ou jurídicas, qual o tipo de membro, bem como, a entidade representada e inserção de anexos.

- [ ] **147.** Permitir os cadastros dos Saldos da Dívida de cargos eletivos, informando responsável, data do saldo,
      Descrição, Dívidas e Obrigações, data apuração e valor, E consultando os cadastros por período de data do saldo
      e apuração e valor da dívida e possibilitar realizar operações de edições e exclusões dos mesmos.

- [ ] **148.** Possibilitar a pesquisa dos Saldos das Dívidas cadastrados, ao informar uma descrição e um responsável
      pela dívida, a data do saldo ou da apuração, bem como, o valor da dívida, demonstrando-os as informações da
      pesquisa ensejando maior visibilidade das informações que o usuário necessitar.

- [ ] **149.** Possibilitar a gestão fiscal do cadastro de Declaração de bens de cargos eletivos com as informações do
      Responsável, data da declaração, Complemento, descrição dos bens declarados, data de aquisição, valor, número do
      registro no cartório e cartório.

- [ ] **150.** Possibilitar os cadastros de Componentes Fiscais da LRF com ano, período de referência, competência e
      componente da LRF como Meta de Arrecadação, Recebimento, Remunerações e valor tanto negativo quanto positivo.

- [ ] **151.** Possibilitar a Pesquisa dos Componentes Fiscais da LRF cadastrados, ao informar uma descrição, o tipo
      dos componentes, o ano, o período de referência ou a competência, demonstrando-os e ordenando-os por meio de
      listagem as informações da pesquisa, bem como, o valor do componente, ensejando maior visibilidade das
      informações que o usuário necessitar.

## Item 44 - Software de Tesouraria para a Câmara de Vereadores

*Fonte: Anexo I, páginas 167-170/194.*

- [ ] **1.** Possuir banco de dados multiexercício e multientidades.

- [ ] **2.** Possibilitar configuração de parâmetro de Controlar movimentação diária nos cadastros, assim
      possibilitando ao usuário abrir a movimentação diária por data e fechando as movimentações por data e ainda
      reabrir o movimento caso necessário. E visualizar em listagem daqueles movimentos por data e os que estão
      abertos e fechados.

- [ ] **3.** Com o fechamento do movimento por data, o sistema não deverá permitir inclusões de rotinas como
      transferências bancárias, ajustes e pagamentos e deverá informar nos cadastros que é necessário selecionar uma
      movimentação aberta.

- [ ] **4.** Permitir a edição de pagamentos já realizados, bem como a inclusão e exclusão de documentos vinculados no
      pacote.

- [ ] **5.** Permitir o cadastro das Contas Bancárias pertencentes à entidade. No cadastro de contas cadastrar os
      dados bancários, organogramas, responsável, controle de vigência da conta com data inicial, data final e motivos
      para alteração da situação da conta seja ativa e inativa, e administração de recursos informando os recursos
      administradores e movimentadores

- [ ] **6.** Permitir vincular os recursos movimentados e administrados no cadastro das Contas Bancárias.

- [ ] **7.** Permitir o cadastro de Credores informando Nome do credor, CPF/CNPJ, data da inclusão, dados pessoais,
      dados dos documentos como Naturalidade, Nacionalidade, RG, órgão emissor, UF, data de emissão e possa ser
      informado também o PIS/PASEP/NIT, Inscrição municipal e município da inscrição. Inserir ainda a informação das
      contas bancárias, selecionar se é produtor rural ou prestadores de serviços, classificando e informando as
      naturezas de rendimentos para cada credor para o envio ao EFD-Reinf.

- [ ] **8.** Possibilitar pagamento de valores totais ou parciais de empenhos, liquidado e visualizar em listagem
      somente os empenhos e liquidações, com a informação do credor, conta bancária, recursos e saldo a pagar.

- [ ] **9.** Possibilitar na gestão de pagamentos a pesquisa e listagem dos documentos de empenhos, despesas extras e
      devolução de receita a pagar por opção de período de emissão e vencimentos sem a necessidade de emissão de
      relatórios.

- [ ] **10.** Permitir inserir mais de uma Retenções pagamentos de empenhos, restos a pagar e despesas extras
      inserindo o tipo da retenção e valor.

- [ ] **11.** Permitir inserir mais de uma Retenção na liquidação de empenhos e liquidação de restos a pagar.

- [ ] **12.** Possibilitar registrar Transferências Bancárias informando a Data, conta bancária de origem, tipo da
      conta origem, recurso e valor e informações da conta destino, tipo da conta destino, tipo de aplicação destino,
      finalidade, data de vencimento.

- [ ] **13.** Possibilitar no próprio cadastro de as Transferências Bancárias efetuar a baixa da transferência,
      informando data, transação e número do documento.

- [ ] **14.** Possibilitar efetuar a cópia de Transferências bancárias de uma já existente. Na cópia o sistema de
      trazer todos os campos preenchidos exceto a data, facilitando e agilizando a inclusão das transferências.

- [ ] **15.** Controlar a movimentação de pagamentos, registrando todos os pagamentos efetuados contra caixa ou
      bancos, permitindo estornos, efetuando os lançamentos automaticamente nas respectivas contas contábeis e
      possibilitar consultas rápidas dessas movimentações por conta bancária sem a necessidade de relatórios.

- [ ] **16.** Propiciar a emissão de borderôs ordens bancárias para pagamentos a fornecedores de uma mesma instituição
      bancária, efetuando o mesmo tratamento caso o pagamento seja realizado individualmente.

- [ ] **17.** Permitir gerar os arquivos relativos às ordens bancárias para pagamento dos fornecedores com crédito em
      conta bancária. Os arquivos deverão ser configuráveis e já possuir modelos das principais instituições
      bancárias.

- [ ] **18.** Permitir o bloqueio de pagamento de fornecedores em débitos com a fazenda pública municipal.

- [ ] **19.** Permitir a emissão de Boletim da movimentação Geral demonstrando a movimentação de entradas e saídas,
      posição dos saldos bancários com a informação do banco, agência, conta, entras e saídas e saldo atual.

- [ ] **20.** Propiciar a demonstração do Boletim diário das despesas orçamentárias e extraorçamentárias realizadas,
      com natureza da despesa, descrição, valor dia, acumulado mês e total do ano .

- [ ] **21.** Propiciar a demonstração de saldos bancários, disponibilizando Balancete bancário com opção de detalhar
      as contas bancárias por Recursos e Tipos de aplicação, selecionando a consulta de uma, mais de uma ou todas as
      contas bancárias e recursos e demonstrando na exibição as contas bancárias, saldo por recurso, saldo anterior,
      entradas, saídas e saldo atual.

- [ ] **22.** Permitir a inclusão de ingressos financeiros provenientes de receitas orçamentárias do município.

- [ ] **23.** Permitir que sejam emitidas notas de ordem de pagamento, restos a pagar, despesa extra e respectivas
      anulações.

- [ ] **24.** Permitir consultar auditoria dos registros nos principais cadastros do sistema, como de transferência
      bancária, ajuste de recurso, resgate, aplicação, depósito bancário, saldo inicial bancário e saque bancário.

- [ ] **25.** Propiciar o sistema sugerir as contas do credor e da entidade nos pagamentos por meio da inserção da
      ordem de baixa no cadastro da liquidação.

- [ ] **26.** Possibilitar a realização da cópia de Conciliação Bancária. Os dados devem ser copiados e a gravação
      realizada conforme Dados cadastrais, Conta bancária, Tipo de Conta, Tipo de Aplicação, Saldo do extrato e todas
      as Pendências facilitando novas conciliações sem necessidade de nova digitalização.

- [ ] **27.** Permitir fácil consulta nos cadastros das Conciliação Bancária, a visualização do saldo financeiro,
      saldo do extrato e saldo a conciliar. E também demonstrar o status da conciliação se está em elaboração,
      concluídas e com inconsistentes por meio da listagem e ainda realizar operações de edições e exclusões dos
      mesmos.

- [ ] **28.** Permitir ao usuário a utilização de dados do extrato bancário a partir da importação do arquivo, em
      formato OFX e OFC - tipos de arquivos usados para armazenar informações financeiras, geralmente aplicados pelos
      bancos, no processo de conciliação de contas bancárias da entidade. O sistema deve permitir a exclusão de itens
      do extrato a conciliar, indiferente de serem manuais ou importados.

- [ ] **29.** Permitir a construção da visualização da gestão de pagamentos conforme a necessidade de cada usuário
      inserindo colunas, detalhes, numeração e ordenação para melhor visualização.

- [ ] **30.** Possibilitar nos pagamentos que constam vários documentos de empenhos tenha a opção de inserir os dados
      da conta bancária para todos os documentos simultaneamente sem a necessidade de informar individualmente.

- [ ] **31.** Possibilitar ao usuário visualizar com os registros dos pagamentos de despesas extras, liquidações de
      empenhos e subempenhos por meio da listagem, realizando a visualização somente dos que possuem saldo a pagar.

- [ ] **32.** Permitir ao usuário selecionar um ou mais itens de contas a pagar, sejam referentes a despesas extras,
      empenhos, e subempenhos, formando um agrupamento para a realização de um único pagamento. Pagamento este que
      pode ser baixado com diversas transações bancárias (cheque, banco, remessa bancária) ou única, conforme
      necessidade.

- [ ] **33.** Propiciar na baixa dos pagamentos de empenhos de adiantamentos e diárias dos servidores das entidades o
      preenchimento automático da informação do cartão corporativo quando existir.

- [ ] **34.** Possibilitar cadastro das Devoluções de Receitas com Data, Dedução, valor, credor, conta bancária,
      finalidade, Receita e valor, data de vencimento e ordem de baixa. E possibilitar a visualização as informações
      cadastradas por meio de listagem e com emissão de uma e mais notas de devoluções a partir das respectivas
      visualizações.

- [ ] **35.** Permitir a identificação no sistema com tag nos pagamentos de empenhos que foram pagos pelo sistema da
      contabilidade.

- [ ] **36.** Possibilitar realizar Ajustes de saldos de Recursos inserindo data, categoria, valor, recurso origem,
      origem destino, conta bancária, tipo da conta, tipo de aplicação e finalidade.

- [ ] **37.** Possibilitar consulta dos Ajuste de Recursos com consultas por filtros de Período, recurso origem e
      recurso destino e visualização por categoria de conta bancária, dinheiro, retenção e receita extra orçamentária.

- [ ] **38.** Permitir a configuração de acesso em diversas funcionalidades para usuários conforme o órgão e unidade
      orçamentária a que ele está vinculado, bloqueando assim acesso a movimentos de outras unidades orçamentárias,
      inclusive a visualização de registros em listagem.

- [ ] **39.** Permitir, por meio de interação entre sistemas, o envio de dados financeiros das movimentações bancárias
      ao portal de transparência para a população em conformidade com a Lei de Acesso à Informação de Nº 12.527/11.

- [ ] **40.** Propiciar controle e conferências dinâmicas em tela da Gestão Bancária, visualizando as contas bancárias
      com detalhamentos das movimentações de entradas e saídas e valores das contas. Ainda possibilitando configurar
      as emissões por Período Anual, Mensal e Diário, modo de visualização, exibição totalizando por dia, apenas saldo
      atual, apenas contas com movimento no período, seleção de todos os bancos, todas as agências e todas as contas e
      apenas as contas e recursos conforme usuário desejar.

- [ ] **41.** Possibilitar na Gestão bancária a inclusão de Resgate de aplicação bancária com as informações de Data,
      Tipo, valor, conta bancária, finalidade e recursos.

- [ ] **42.** Permitir a inclusão de Depósito bancário inserindo a Data, conta bancária, valor, finalidade e recursos.

- [ ] **43.** Permitir a inclusão de Saque bancário inserindo a Data, conta bancária, valor, finalidade e recursos.

- [ ] **44.** Permitir a inclusão de Ajustes bancário inserindo a Data, tipo de entrada e saída, conta bancária,
      valor, finalidade e recursos

- [ ] **45.** Possibilitar a inclusão de Saldo Inicial bancário inserindo a Data, conta bancária, valor, finalidade e
      recursos.

- [ ] **46.** Possibilitar a consulta de pagamentos efetuados por período, entidade, para os tipos de documentos como
      Restos, empenhos do exercício, despesas extras e devoluções de receita. e visão podendo agrupar as informações
      por Entidade, credor, conta bancária, data do pagamento, tipo de documento, recursos do empenho, organograma e
      ação. Além disso, também inserir um e mais credores, conta banco, número do empenho, natureza da despesa e
      recursos.

## Item 45 - Software de Folha de Pagamento para a Câmara de Vereadores

*Fonte: Anexo I, páginas 170-176/194.*

- [ ] **1.** Dispor de um ambiente centralizado que contenha gráficos e indicadores de gestão da folha, podendo
      navegar por competências, e ainda, que permita a partir desse ambiente:
  - [ ] **1.1.** Realizar consulta de matrículas, dispondo de filtros de consulta tais como Ativos, Inativos, Seleções
        de Matrículas, com opção de definir colunas a serem exibidas em tela e imprimir o resultado da busca, podendo
        realizar a pesquisa por, no mínimo, Nome, Código da Matrícula, CPF, RG, PIS/PASEP, e utilizar critérios de
        pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda
        oferecer outras opções de filtros, objetivando a otimização das consultas. As matrículas consultadas deverão
        estar acessíveis para que seja possível realizar alterações, podendo ainda, a partir dessa tela, efetuar uma
        admissão;
  - [ ] **1.2.** Realizar consulta de afastamentos, dispondo de filtros por tipo de afastamento, com opção de definir
        colunas a serem exibidas em tela, podendo efetuar a busca por, no mínimo, Nome, Código da matrícula, CPF, Nº
        do cartão ponto, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou
        Nenhum dos termos digitados. Deverá ainda oferecer outras opções de filtros, objetivando a otimização das
        consultas. A partir dessa tela, também será possível cadastrar um novo afastamento.
  - [ ] **1.3.** Realizar todos os processamentos de cálculo da folha, com campos específicos para cada tipo de
        processamento, e com opção de habilitar logs de cálculo para debug de fórmulas. Os cálculos mensais, de
        férias, 13º salário e rescisão, poderão ser efetuados de forma individual ou coletiva. Os cálculos da folha
        deverão ser executados em segundo plano, não gerando bloqueios no sistema durante os cálculos, permitindo a
        execução de outras tarefas no sistema durante os cálculos, notificando o usuário quando os cálculos estiverem
        finalizados.
    - [ ] **1.3.1.** Para os cálculos de férias, deverá ser permitido informar se haverá o desconto de faltas no
          pagamento e se haverá o pagamento do 13º salário simultaneamente com as férias.
    - [ ] **1.3.2.** Permitir calcular uma rescisão complementar para funcionários que tiveram a rescisão calculada.
  - [ ] **1.4.** Realizar ações de lançamentos de variáveis de cálculo (proventos e descontos) por determinado
        período, onde ao informar o número de parcelas, já será informada de forma automática a competência final do
        lançamento ou ao informar a competência final, será informado de forma automática o número de parcelas do
        lançamento. Os lançamentos poderão ser efetuados de forma individual ou coletiva. No momento do lançamento,
        também deverá ter a opção de mostrar as parcelas na consulta de cálculos.
  - [ ] **1.5.** Realizar a consulta de cálculos, podendo navegar entre competências, dispondo de filtros de consulta
        por, no mínimo, processamento, situação e seleção de matrículas, com opção de definir colunas a serem exibidas
        em tela e imprimir o resultado da busca, podendo realizar a pesquisa por, no mínimo, Nome, Código da
        Matrícula, CPF, Código eSocial, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos
        digitados ou Nenhum dos termos digitados. Deverá ainda oferecer outras opções de filtros, objetivando a
        otimização das consultas.
    - [ ] **1.5.1.** Na tela de consulta de cálculos, deverá ser possível consultar de forma detalhada todos os
          eventos calculados, podendo efetuar o recálculo e exclusão de folhas de forma individual ou coletiva, lançar
          uma variável de cálculo, realizar o fechamento, visualizar os parâmetros do cálculo e a composição de bases.
    - [ ] **1.5.2.** A tela de consulta de cálculos deverá dispor de ferramenta dinâmica de comparativo de folhas,
          podendo comparar folhas de um mesmo servidor em competências diferentes, servidores diferentes na mesma
          competência e servidores diferentes em competências diferentes, com indicadores visuais para facilitar a
          visualização das diferenças.
    - [ ] **1.5.3.** Na tela de consulta de cálculos, deverá ser possível realizar a alteração da data de pagamento do
          funcionário ou grupo de matrículas que já tenham o processamento da folha calculado.
  - [ ] **1.6.** Realizar a consulta dos logs de erro de cálculo, dispondo de filtros de consulta por, no mínimo,
        processamento, tipo e seleção de matrículas, com opção de definir colunas a serem exibidas em tela, podendo
        realizar a pesquisa por, no mínimo, Nome, Código, Mensagem, e utilizar critérios de pesquisa como Alguns
        termos digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda oferecer outras
        opções de filtros, objetivando a otimização das consultas.
    - [ ] **1.6.1.** A partir dessa tela, deverá ser possível recalcular ou excluir a folha e ainda, visualizar os
          parâmetros do cálculo.
    - [ ] **1.6.2.** A consulta dos logs de erro deverá exibir mensagem que permita ao usuário entender de forma clara
          o erro existente. Também deverá exibir em tela o processamento que originou o erro, o nome do servidor,
          matrícula, data da mensagem e usuário que efetuou o cálculo.
  - [ ] **1.7.** Realizar o fechamento da folha de pagamento, dispondo de filtros de consulta por, no mínimo,
        processamento, situação e seleção de matrículas, podendo realizar a pesquisa por, no mínimo, Nome, Código de
        matrícula, CPF, PIS/PASEP, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos
        digitados ou Nenhum dos termos digitados. Deverá ainda oferecer outras opções de filtros, objetivando a
        otimização das consultas.
    - [ ] **1.7.1.** A rotina de fechamento deverá permitir selecionar uma ou mais matrículas de uma vez para realizar
          o fechamento das folhas.
    - [ ] **1.7.2.** Também deverá ser possível realizar a abertura do processamento fechado, por servidor com perfil
          de acesso autorizado para realizar esse procedimento.

- [ ] **2.** Permitir a criação de novos campos complementares aos cadastros padrões disponibilizados, sendo estes nos
      formatos área de texto, CNPJ, CPF, data, data e hora, e-mail, hora, lista de seleção, múltipla seleção,
      numérico, telefone e texto, com a indicação do rótulo, texto de ajuda, validade inicial e final do campo.

- [ ] **3.** Conter rotina de configuração das tabelas de Previdência Social (RGPS), Regime Próprio de Previdência
      (RPPS), Assistência, IRRF, FGTS e Salário Família, permitindo informar os valores, alíquotas e quotas, que serão
      utilizadas para efeito de cálculo da folha, bem como, informar o Salário-Mínimo, Piso Salarial e Teto salarial.

- [ ] **4.** Permitir copiar os dados de configuração das tabelas, para que sejam realizadas as devidas alterações,
      conforme legislação e sua utilização.

- [ ] **5.** Permitir limitar o acesso de usuários às informações de funcionários de determinados grupos funcionais,
      organogramas e/ou matrículas.

- [ ] **6.** Flexibilizar as configurações da folha de acordo com a necessidade e método utilizado pela entidade.

- [ ] **7.** Permitir cadastrar e vincular dependentes no cadastro de pessoas, informando o tipo de dependência, data
      inicial e final.

- [ ] **8.** Dispor de cadastro de dependentes, que contemple no mínimo, os seguintes campos: nome do dependente, CPF,
      RG, data de nascimento, estado civil, grau de instrução, grau de parentesco, deficiências, dependências de
      salário-família, IRRF e Pensão alimentícia.

- [ ] **9.** Permitir o gerenciamento dos dependentes dos servidores para fins de salário família e imposto de renda,
      pensão judicial, realizando a baixa automática na época devida, conforme limite e condições previstas para cada
      dependente.

- [ ] **10.** Permitir registar todas as configurações das estruturas de níveis das lotações físicas utilizadas para
      determinar o local de trabalho do servidor na entidade.

- [ ] **11.** Controlar a lotação física dos servidores, registrando o histórico de todos os locais de trabalho que o
      servidor passou, permitindo informar no cadastro do funcionário, o local onde trabalhará.

- [ ] **12.** Permitir o registro de feriados fixos, variáveis e pontos facultativos com abrangência nacional,
      estadual e municipal.

- [ ] **13.** Permitir registrar automaticamente a movimentação de pessoal referente a admissão do funcionário,
      através da informação do ato.

- [ ] **14.** Registrar automaticamente a movimentação de pessoal referente a prorrogação de contrato de servidores
      com contratos de prazo determinado, através da informação do ato.

- [ ] **15.** Permitir o controle dos planos previdenciários ou assistenciais a que cada servidor esteve ou está
      vinculado, podendo registrar o número da matrícula do servidor no plano.

- [ ] **16.** Possuir cadastro de estagiários vinculados com a entidade, abrangendo sua escolaridade e outros aspectos
      para acompanhamento do andamento do estágio.

- [ ] **17.** Possuir cadastro de autônomos que prestam serviços à entidade, permitindo registrar a data e o valor de
      cada serviço prestado.

- [ ] **18.** Permitir o registro de matrícula do tipo aposentado, possibilitando o preenchimento de dados de
      identificação e informações gerais.

- [ ] **19.** Dispor de mecanismo que impeçam o registro do cadastro do funcionário, quando existir campos não
      preenchidos que forem definidos como obrigatório.

- [ ] **20.** Permitir que no cadastro de matrículas dos servidores, sejam relacionados os dados do concurso que o
      funcionário participou.

- [ ] **21.** Permitir cadastrar diferentes configurações de férias, onde será possível:
  - [ ] **21.1.** Estipular as regras para cancelamento (perda do direito às férias) dos períodos aquisitivos de
        férias conforme as normas previstas em estatuto e/ou lei regulamentada.
  - [ ] **21.2.** Estipular as regras para "suspensão" do período aquisitivo de férias conforme normas previstas em
        estatuto e/ou lei, para que o período de aquisição de funcionário seja postergado a data final.
  - [ ] **21.3.** Informar para cada configuração a quantidade de meses necessários para aquisição, quantidade de dias
        de direito a férias, quantidade de dias que podem ser abonados, configuração de descontos de faltas, ou seja,
        informar para cada configuração de férias as faixas para descontos de faltas em relação aos dias de direito do
        período aquisitivo.

- [ ] **22.** Dispor de ambiente que permita o controle dos períodos aquisitivos de férias e 13º salário, com controle
      dos lançamentos, suspensões e cancelamentos por funcionário conforme configuração.
  - [ ] **22.1.** Deverá permitir a consulta dos períodos aquisitivos, dispondo de filtros de consulta por, no mínimo,
        processamento e situação, podendo realizar a pesquisa por, no mínimo, Nome, Código da matrícula, e utilizar
        critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos termos digitados.
        Deverá ainda oferecer outras opções de filtros, objetivando a otimização das consultas.

- [ ] **23.** Controlar os períodos aquisitivos de férias em relação a quantidade de dias disponíveis para o gozo de
      férias.

- [ ] **24.** Permitir visualizar as faltas e os descontos de faltas que o funcionário teve dentro do período
      aquisitivo de férias e propiciar o lançamento destas faltas.

- [ ] **25.** Controlar os períodos de 13º salário em relação aos avos adquiridos e de direito, disponíveis para
      pagamento.

- [ ] **26.** Permitir calcular o pagamento das férias antecipadamente.

- [ ] **27.** Permitir cadastrar grupos funcionais visando a flexibilização no controle de funcionários.

- [ ] **28.** Cadastrar níveis salariais, permitindo definir a ordem de progressão das classes e referências.

- [ ] **29.** Permitir importar eventos de cálculo da folha para uma matrícula ou várias matrículas de uma só vez.

- [ ] **30.** Manter as respectivas informações de progressão salariais registradas no histórico do servidor.

- [ ] **31.** Permitir registrar todas as informações referentes aos atos legais da entidade, como leis, portarias,
      decretos, requisições estabelecidas pelo órgão, associados às movimentações cadastrais do funcionário. Os
      registros das movimentações devem ser gerados automaticamente pelo sistema, caso seja informado o ato durante o
      cadastramento de uma movimentação (admissão, alteração de cargo, alteração salarial, demissão/exoneração,
      afastamento etc.).

- [ ] **32.** Permitir o cadastro dos tipos de movimentação de pessoal. De maneira geral, cada alteração cadastral,
      alterações salariais, de cargo, de lotação, admissão, exoneração ou demissão, aposentadoria, falecimento,
      transferências, entre outros, sofrida pelo funcionário, pode ser considerada um tipo de movimentação de pessoal.

- [ ] **33.** Possibilitar a geração de movimentações de pessoal proveniente do registro de pensionistas.

- [ ] **34.** Permitir a reintegração de funcionário demitido/exonerado por decisão judicial ou administrativa, sendo
      possível reutilizar a mesma matrícula.

- [ ] **35.** Permitir a configuração de quais proventos e descontos devem ser considerados como automáticos para cada
      tipo de cálculo (mensal, férias, complementar etc.).

- [ ] **36.** Permitir o cadastro e manutenção de eventos dos tipos: proventos, descontos e eventos informativos
      (servem somente para realizar o cálculo interno não havendo crédito ou débito do salário pago ao funcionário),
      dispondo de todos os campos obrigatórios para registro das incidências para atendimento às regras de envio das
      rubricas ao eSocial.

- [ ] **37.** Permitir a cópia de eventos de cálculo existentes, objetivando o reaproveitamento de dados para um novo
      cadastro.

- [ ] **38.** Permitir a configuração de todas as fórmulas de cálculo em conformidade com as legislações vigentes da
      entidade, dispondo de documentação acessível ao usuário a partir da tela de configuração das fórmulas e que
      contenham informações para auxiliar na elaboração ou manutenção das fórmulas.

- [ ] **39.** Permitir buscar valores registrados nos novos campos complementares criados, a partir de função
      informada na fórmula de cálculo do evento da folha.

- [ ] **40.** Permitir o registro histórico das alterações realizadas no cadastro de eventos de folha.

- [ ] **41.** Permitir a inclusão e configuração de motivos de rescisão, assim como respectivos códigos de geração
      para os órgãos federais como eSocial e FGTS.

- [ ] **42.** Permitir efetuar o cálculo da provisão de férias e 13º salário, gerenciando as baixas de provisão.
  - [ ] **42.1.** Deverá permitir a consulta dos cálculos de provisão, podendo navegar entre competências, dispondo de
        filtros de consulta por, no mínimo, processamento, podendo realizar a pesquisa por, no mínimo, Nome, Código da
        matrícula, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum
        dos termos digitados. Deverá ainda oferecer outras opções de filtros, objetivando a otimização das consultas.
  - [ ] **42.2.** A consulta deverá detalhar os períodos aquisitivos exibindo os saldos, baixas e demais informações
        em tela.

- [ ] **43.** Permitir a configuração das médias e vantagens de férias, rescisão, 13º salário, abono pecuniário e
      avisos prévios, percebidas pelos servidores, informando os eventos de composição e as regras específicas de
      abrangência e obtenção dos valores, para cada tipo de média e vantagem.
  - [ ] **43.1.** Na tela de consulta e cadastro das médias e vantagens, deverá ser possível filtrar as consultas por
        tipo, podendo realizar a pesquisa por, no mínimo, Evento, e utilizar critérios de pesquisa como Alguns termos
        digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda oferecer outras opções de
        filtros, objetivando a otimização das consultas.

- [ ] **44.** Possuir rotina de cálculo automático de rescisão para funcionários com vínculo de prazo determinado, na
      competência em que expira o contrato.

- [ ] **45.** Controlar os afastamentos do funcionário permitindo a consulta dos dados dos afastamentos em ambiente
      específico e também no cadastro da matrícula.

- [ ] **46.** Permitir o lançamento automático de afastamento do servidor quando realizar o cálculo das férias.

- [ ] **47.** Permitir calcular reajustes salariais de individual ou modo coletivo para matrículas sem níveis ou para
      níveis salariais e matrículas vinculadas filtrando pelo plano de cargos, podendo ser por valor ou percentual,
      realizando a simulação antes da efetivação da alteração.

- [ ] **48.** Permitir registrar a informação do motivo da alteração salarial, além de possibilitar a criação de novos
      motivos.

- [ ] **49.** Permitir calcular a progressão salarial de modo individual ou coletivo, por níveis salariais, realizando
      a simulação antes da efetivação da alteração.

- [ ] **50.** Emitir o resumo da folha por período com todos os tipos de proventos e descontos gerados na folha,
      mostrando o valor total e a quantidade total de funcionários. Permitindo selecionar as informações, assim como
      agrupar os dados e ordená-los.

- [ ] **51.** Permitir a consulta do cálculo das médias e vantagens que o servidor recebeu em férias, 13º salário ou
      rescisão de contrato, detalhando os cálculos.

- [ ] **52.** Permitir registrar a divisão hierárquica dos setores.

- [ ] **53.** Permitir a reestruturação da classificação institucional de um exercício para outro através da mudança
      de organogramas, podendo duplicar os dados do organograma para que sejam realizadas as devidas alterações e sua
      utilização.

- [ ] **54.** Possibilitar a inclusão de responsáveis titulares e temporários em um cadastro de organogramas.

- [ ] **55.** Permitir copiar funcionários demitidos para realizar a readmissão individual e também funcionários
      ativos para aproveitamento de dados.

- [ ] **56.** Permitir a configuração e a integração das informações da folha de pagamento dos servidores, encargos e
      provisões, com o sistema de contabilidade, sem a necessidade de exportação e importação de arquivos.

- [ ] **57.** Possibilitar integração entre os sistemas Folha e Transparência.

- [ ] **58.** Permitir configurar o envio dos dados para o sistema Transparência para viabilizar a transparência dos
      dados.

- [ ] **59.** Possuir ambiente de consulta de matrículas, dispondo de filtros de consulta tais como Ativos, Inativos,
      Seleções de Matrículas, com opção de definir colunas a serem exibidas em tela e imprimir o resultado da busca,
      podendo realizar a pesquisa por, no mínimo, Nome, Código da Matrícula, CPF, RG, PIS/PASEP, e utilizar critérios
      de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda
      oferecer outras opções de filtros, objetivando a otimização das consultas. As matrículas consultadas deverão
      estar acessíveis para que seja possível realizar alterações cadastrais, podendo ainda, a partir dessa tela,
      efetuar uma admissão, com todos os campos exigidos pelo Ministério do Trabalho e Emprego, e que possibilite,
      inclusive, a dispensa do livro de registro dos servidores, conforme Portaria nº 41 de 28/03/2007.
  - [ ] **59.1.** Ao acessar o cadastro da matrícula, deverá ser exibido em tela todos os dados contratuais do
        servidor.

- [ ] **60.** Possuir ambiente de consulta de pessoas físicas, podendo realizar a pesquisa por, no mínimo, Nome, CPF,
      PIS, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos
      termos digitados. As pessoas consultadas deverão estar acessíveis para que seja possível realizar alterações
      cadastrais, podendo ainda, a partir dessa tela, efetuar um novo registro de pessoa física, possibilitando
      informar os dados pessoais como: nome, CPF, data de nascimento, idade, estado civil, sexo, endereço(s),
      telefone(s), e-mail(s), filiação(ões), moléstia(s) grave(s), grau de escolaridade, raça, tipo sanguíneo,
      indicativo de doador, deficiência(s), além de dados relacionados aos documentos, como RG, órgão emissor, UF,
      data da emissão, número do título de eleitor, zona, seção, número do CNS, data da emissão, RIC, órgão emissor,
      UF, data da emissão, certidão(ões) civil(s), número do certificado de reservista, número da CTPS, número do PIS
      / PASEP, número da CNH.
  - [ ] **60.1.** Ao acessar o cadastro da pessoa física, deverá ser exibido em tela todos os dados pessoais do
        servidor.
  - [ ] **60.2.** Permitir a atualização de dados cadastrais das pessoas físicas, inclusive, adicionando uma formação.

- [ ] **61.** Permitir o cadastro dos dados estrangeiros da pessoa física que não seja natural brasileira.

- [ ] **62.** O sistema deverá guardar os registros históricos de alterações dos cadastros das pessoas físicas e das
      matrículas, os quais deverão estar acessíveis ao usuário.

- [ ] **63.** Permitir a inclusão, alteração e exclusão do histórico vigente de cadastro de pessoas físicas e
      matrículas, permitindo ainda que os históricos retroativos sejam incluídos ou alterados.

- [ ] **64.** Permitir registrar casos de moléstias graves por meio do CID à pessoa, com data inicial e data final
      quando for o caso.

- [ ] **65.** Possuir registro para cadastramento das deficiências dos servidores.

- [ ] **66.** Permitir anexar arquivos em vários formatos aos cadastros de servidores e também de pessoas físicas,
      possibilitando manter arquivo digital dos servidores e pessoas cadastradas.

- [ ] **67.** Registrar e permitir a visualização de todas as movimentações de pessoal de forma cronológica ocorridas
      no período de permanência do servidor no município.

- [ ] **68.** Permitir o registro de cargos, com controle histórico das alterações, possibilitando registrar
      informações gerais vinculadas ao ato, nome do cargo, tipo do cargo, podendo ser efetivo, comissionado,
      temporário, agente político, entre outros conforme a necessidade da entidade, quadro de vagas, possibilitando
      subdividir a quantidade de vagas entre as áreas de atuação e organogramas, grau de instrução mínimo exigido,
      configuração de férias, CBO, acúmulo de cargos, dedicação exclusiva, contagem especial de tempo de serviço e
      referências salariais.

- [ ] **69.** Permitir manter a nomenclatura do cargo efetivo no cadastro funcional de servidor efetivo que exerça
      cargo em comissão ou função comissionada, incluindo o registro do cargo ou função.

- [ ] **70.** Permitir o cadastro dos níveis salariais conforme legislação municipal, possibilitando compor suas
      variações de classe e referência dentro do nível, com controle histórico de alterações, viabilizando a
      vinculação da faixa salarial dos cargos.

- [ ] **71.** Permitir o registro de vínculos empregatícios dos funcionários da entidade. No registro do vínculo deve
      possibilitar informar a descrição, regime trabalhista, regime previdenciário, categoria do trabalhador,
      categoria do SEFIP, vínculo temporário, motivo da rescisão, data final obrigatória, o envio ao CAGED, envio para
      RAIS e código RAIS e se gera licença-prêmio.

- [ ] **72.** Gerar alerta ao usuário quando for realizar a admissão de pessoas que têm a escolaridade inferior àquela
      exigida na configuração do cargo informado.

- [ ] **73.** Permitir o registro dos horários de trabalho e jornadas, realizados pelo trabalhador.

- [ ] **74.** Permitir a configuração do envio de dados para o eSocial.

- [ ] **75.** Emitir informações que comprovem o rendimento e retenção de imposto de renda retido na fonte.

- [ ] **76.** Gerar o arquivo com a relação dos funcionários para a DIRF, conforme exigências da Receita Federal.

- [ ] **77.** Permitir a configuração de envio da DIRF e Comprovante de Rendimentos, contendo os dados legalmente
      exigidos, permitindo informar quais eventos devem ser agrupados.

- [ ] **78.** Permitir registrar e gerar as informações de dados cadastrados no sistema para atendimento às exigências
      legais do TCE.

- [ ] **79.** Possuir o quadro de cargos, possibilitando informar a descrição, percentual mínimo, ato de criação, ato
      do percentual mínimo, ato de revogação.

- [ ] **80.** Permitir o lançamento de faltas para desconto em folha de pagamento e na tabela de gozo das férias.

- [ ] **81.** Permitir o cadastramento de ACT’s com campo específico para gerar a rescisão automática ao final do
      contrato celebrado.

- [ ] **82.** Permitir o cadastramento de aposentados pela entidade no sistema, com particularidades que os
      diferenciam dos demais funcionários, como motivo da aposentadoria, tipo do benefício, situação, etc.

- [ ] **83.** Permitir geração de informações para envio ao sistema SIOPE do Ministério da Educação.

- [ ] **84.** Permitir o cadastro de servidores em diversos regimes jurídicos, como: celetistas, estatutários,
      contratos temporários, emprego público, estagiário e cargos comissionados.

- [ ] **85.** Permitir a prorrogação de contratos temporários de forma individual.

- [ ] **86.** Permitir a emissão da ficha de dados cadastrais dos servidores.

- [ ] **87.** Permitir o controle e gerenciamento de acessos ao sistema com vinculação de permissões aos usuários,
      podendo definir grupos com permissões específicas de acordo com as regras estabelecidas pela entidade.

- [ ] **88.** Permitir a consulta e alteração de informações da entidade que o sistema foi liberado, possibilitando ao
      usuário alterar informações como sigla da entidade, responsável da entidade, endereço da entidade, telefone da
      entidade, e-mails da entidade, site da entidade, indicativo de RPPS, tipo de administração, sindicato,
      classificação tributária, indicativo de registro eletrônico de funcionário, classificação tributária e situação
      da entidade.

- [ ] **89.** Possibilitar aos usuários redefinirem a senha de acesso em qualquer momento.

- [ ] **90.** Permitir cadastrar forma de pagamento em PIX na matrícula do servidor.

- [ ] **91.** Permitir realizar alterações cadastrais individuais ou coletivas nos históricos das matrículas, como:
      Organograma, Vínculo empregatício, Cargo, Nível salarial, Lotação física, Jornada de trabalho, Grupo funcional e
      Sindicato.

## Item 46 - Software de Atendimento ao eSocial para a Câmara de Vereadores

*Fonte: Anexo I, páginas 176-177/194.*

- [ ] **1.** Permitir a integração de dados de forma automática ou ainda através de arquivos de intercâmbio de
      informações com o sistema de Folha de Pagamento.

- [ ] **2.** O sistema deverá realizar o envio de eventos, verificando a existência de pendências.

- [ ] **3.** Possibilitar a recuperação de um envio não processado, seja motivo de instabilidade ou outro, que tenha
      interrompido o fluxo.

- [ ] **4.** Possibilitar a visualização e download do arquivo do evento gerado, em formato XML.

- [ ] **5.** Possuir notificação de ocorrências do sistema ao usuário, permitindo visualizar os status como: em
      andamento, lidas e não lidas.

- [ ] **6.** Possibilitar a consulta dos eventos conforme sua situação, possuindo os status de aguardando envio,
      enviando, aguardando retorno e enviados com retorno. Ao listar a consulta, deverá apresentar no mínimo: o
      registro a que se refere no eSocial, a descrição do evento, a data de envio (quando já enviado, o prazo limite
      de envio, o protocolo de envio (quando já enviado) e o recibo de retorno, quando existir.

- [ ] **7.** Dispor de lista que apresente os próximos envios previstos, seguindo o critério do mais atrasado para o
      mais atual.

- [ ] **8.** Disponibilizar indicadores e gráficos referentes às rotinas de domínios integrados, eventos gerados e
      envios pendentes, em ambiente único, e que demonstre a estimativa de horas para sanear os erros existentes.

- [ ] **9.** Possibilitar a visualização em formato de calendário dos eventos pendentes de envio, conforme sua data
      limite.

- [ ] **10.** Possuir mensagem que demonstre ao usuário, como orientação, as inconsistências relacionadas a "Erro" e
      "Alerta".

- [ ] **11.** Possibilitar envio dos arquivos para o eSocial via web service.

- [ ] **12.** Possuir listagem de eventos aguardando envio, permitindo selecionar um ou vários itens e executar para
      os selecionados a ação e enviar.

- [ ] **13.** Permitir ao usuário trocar de entidade sem sair do sistema.

- [ ] **14.** Possibilitar o gerenciamento da situação do registro que foi transformado para o formato eSocial, em
      todas as etapas do processo de envio.

- [ ] **15.** Possibilitar envio dos lotes de informações para o eSocial, podendo selecionar um ou vários eventos para
      assinatura e envio.

- [ ] **16.** Permitir consultar os erros do retorno do governo, quando existirem.

## Item 47 - Software de Recursos Humanos para a Câmara de Vereadores

*Fonte: Anexo I, páginas 177-181/194.*

- [ ] **1.** Permitir registrar todas as configurações das estruturas de níveis das lotações físicas utilizadas para
      determinar o local de trabalho do servidor na entidade. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **2.** Permitir registrar todas as informações referentes aos atos legais da entidade, como leis, portarias,
      decretos, requisições estabelecidas pelo órgão. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **3.** Permitir registrar a divisão hierárquica dos setores. Funcionalidade acessível no módulo Recursos
      Humanos.

- [ ] **4.** Permitir a reestruturação da classificação institucional de um exercício para outro através da mudança de
      organogramas, podendo duplicar os dados do organograma para que sejam realizadas as devidas alterações e sua
      utilização. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **5.** Possuir ambiente de consulta de matrículas, dispondo de filtros de consulta tais como Ativos, Inativos,
      Seleções de Matrículas, com opção de definir colunas a serem exibidas em tela e imprimir o resultado da busca,
      podendo realizar a pesquisa por, no mínimo, Nome, Código da Matrícula, CPF, RG, PIS/PASEP, e utilizar critérios
      de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos termos digitados. Deverá ainda
      oferecer outras opções de filtros, objetivando a otimização das consultas. As matrículas consultadas deverão
      estar acessíveis para que seja possível realizar alterações cadastrais, podendo ainda, a partir dessa tela,
      efetuar uma admissão, com todos os campos exigidos pelo Ministério do Trabalho e Emprego, e que possibilite,
      inclusive, a dispensa do livro de registro dos servidores, conforme Portaria nº 41 de 28/03/2007. Funcionalidade
      acessível no módulo Recursos Humanos.
  - [ ] **5.1.** Ao acessar o cadastro da matrícula, deverá ser exibido em tela todos os dados contratuais do
        servidor.

- [ ] **6.** Possuir ambiente de consulta de pessoas físicas, podendo realizar a pesquisa por, no mínimo, Nome, CPF,
      PIS, e utilizar critérios de pesquisa como Alguns termos digitados, Todos os termos digitados ou Nenhum dos
      termos digitados. As pessoas consultadas deverão estar acessíveis para que seja possível realizar alterações
      cadastrais, podendo ainda, a partir dessa tela, efetuar um novo registro de pessoa física, possibilitando
      informar os dados pessoais como: nome, CPF, data de nascimento, idade, estado civil, sexo, endereço(s),
      telefone(s), e-mail(s), filiação(ões), moléstia(s) grave(s), grau de escolaridade, raça, tipo sanguíneo,
      indicativo de doador, deficiência(s), além de dados relacionados aos documentos, como RG, órgão emissor, UF,
      data da emissão, número do título de eleitor, zona, seção, número do CNS, data da emissão, RIC, órgão emissor,
      UF, data da emissão, certidão(ões) civil(s), número do certificado de reservista, número da CTPS, número do PIS
      / PASEP, número da CNH. Funcionalidade acessível no módulo Recursos Humanos.
  - [ ] **6.1.** Ao acessar o cadastro da pessoa física, deverá ser exibido em tela todos os dados pessoais do
        servidor.
  - [ ] **6.2.** Permitir a atualização de dados cadastrais das pessoas físicas, inclusive, adicionando uma formação.

- [ ] **7.** Permitir o registro de cargos, com controle histórico das alterações, possibilitando registrar
      informações gerais vinculadas ao ato, nome do cargo, tipo do cargo, podendo ser efetivo, comissionado,
      temporário, agente político, entre outros conforme a necessidade da entidade, quadro de vagas, possibilitando
      subdividir a quantidade de vagas entre as áreas de atuação e organogramas, grau de instrução mínimo exigido,
      configuração de férias, CBO, acúmulo de cargos, dedicação exclusiva, contagem especial de tempo de serviço e
      referências salariais. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **8.** Permitir o cadastro dos níveis salariais conforme legislação municipal, possibilitando compor suas
      variações de classe e referência dentro do nível, com controle histórico de alterações, viabilizando a
      vinculação da faixa salarial dos cargos. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **9.** Permitir o registro de vínculos empregatícios dos funcionários da entidade. No registro do vínculo deve
      possibilitar informar a descrição, regime trabalhista, regime previdenciário, categoria do trabalhador,
      categoria do SEFIP, vínculo temporário, motivo da rescisão, data final obrigatória, o envio ao CAGED, envio para
      RAIS e código RAIS e se gera licença-prêmio. Funcionalidade acessível no módulo Recursos Humanos.

- [ ] **10.** Permitir ao superior imediato responder os questionários de avaliação de desempenho de seus servidores
      subordinados.

- [ ] **11.** Possuir cadastro que permita registrar dados de acidentes de trabalho e testemunhas.

- [ ] **12.** Possibilitar o lançamento de atestados, dispondo de campos que permitam cadastrar a matrícula, data
      inicial, data final, data retorno, CID e o local de atendimento.

- [ ] **13.** Sugerir lançamento de atestado para todas as matrículas ativas do servidor.

- [ ] **14.** Possuir registro no cadastro de matrículas, de todas as passagens dos servidores na área médica.

- [ ] **15.** Permitir cadastrar empresas fornecedoras de vale-transporte, instituições médicas e de ensino,
      operadoras de planos de saúde, sindicatos e empresa geral. As informações mínimas para o cadastro devem ser:
      CNPJ, tipo da empresa e porte, razão social, nome fantasia, registro nº (NIRE), inscrição municipal, inscrição
      estadual, endereço, telefone, e-mail e dados do responsável.

- [ ] **16.** Possuir rotina de notificações, permitindo visualizar as notificações subdivididas por não lidas, lidas
      e em andamento.

- [ ] **17.** Possibilitar registrar processos de aposentadorias e pensões, permitindo documentar os trâmites legais,
      desde o início da análise até o deferimento.

- [ ] **18.** Possibilitar a geração de aprovação e classificação de candidatos de concurso público ou processo
      seletivo.

- [ ] **19.** Permitir o registro e gerenciamento dos Equipamento de Proteção Individual - EPI, dispondo de controle
      de entrega.

- [ ] **20.** Permitir o cadastro e a visualização de empréstimos consignados. Consultar os cálculos efetuados no
      sistema de acordo com a competência informada e o processamento dela para cada funcionário.

- [ ] **21.** Permitir o controle de funcionários substituídos e substitutos, facilitando o acompanhamento no período
      de substituição, permitindo a realização de alterações individuais.

- [ ] **22.** Permitir cadastrar a monitoração biológica através do cadastro de Atestado de Saúde Ocupacional, com
      identificação das consultas e exames periódicos, admissionais, demissionais e outros.

- [ ] **23.** Possibilitar o controle de contratos temporários, permitindo visualizar todos os contratos temporários,
      realizar seleção e aplicar alterações em lote, como prorrogar o contrato e informar nova data para agendamento
      da rescisão.

- [ ] **24.** Possibilitar cadastrar diárias de diferentes naturezas e valores.

- [ ] **25.** Permitir o cadastro de concurso público ou processo seletivo.

- [ ] **26.** Possibilitar a importação de pessoas candidatas de concurso público.

- [ ] **27.** Possuir as informações necessárias do concurso para a prestação de contas.

- [ ] **28.** Permitir a demonstração de histórico de movimentações de cada etapa do período convocatório.

- [ ] **29.** Possuir tela integrada ao processo seletivo, que permita realizar o controle de inscrições e os
      aprovados, sem necessidade de digitar novamente informações pessoais.

- [ ] **30.** Permitir o cadastro dos processos seletivos, incluindo os candidatos inscritos, indicando o cargo para o
      qual o candidato se inscreveu, se foi aprovado ou não, sua classificação e a nota final.

- [ ] **31.** Permitir cadastrar experiências anteriores, e suas respectivas contribuições previdenciárias.

- [ ] **32.** Permitir o registro e controle dos benefícios de vale-alimentação.

- [ ] **33.** Possibilitar a importação de valores de vale-alimentação.

- [ ] **34.** Permitir o lançamento de vale-alimentação para uma seleção de matrículas, permitindo atribuir o valor de
      vale-alimentação e de desconto individualmente, bem como a atribuição de um valor geral a todos da seleção.

- [ ] **35.** Possibilitar o registro da concessão de diárias de viagem para os servidores.

- [ ] **36.** Possibilitar o cadastro de cursos, seminários, congressos, simpósios e outros treinamentos, definindo
      área de atuação, a instituição de ensino, duração, carga horária e outras informações.

- [ ] **37.** Permitir que os servidores efetuem solicitações de cursos de aperfeiçoamento. As solicitações podem ser
      registradas e, posteriormente, canceladas ou recusadas.

- [ ] **38.** Permitir o planejamento de cursos, com programa, carga horária, data de realização, local de realização,
      ministrante e número de vagas disponíveis.

- [ ] **39.** Permitir o registro referente a formação acadêmica dos servidores no cadastro de pessoas físicas.

- [ ] **40.** Permitir cadastrar e configurar a licença prêmio, possibilitando criar faixas de períodos para a geração
      de aquisição de licença prêmio; informar os tipos de afastamentos que poderão ser prorrogadas as licenças
      através das suspensões; informar um ou mais formas de cancelamentos da licença prêmio; informar as movimentações
      que serão geradas na aquisição ou concessão da licença prêmio; informar o tipo de afastamento que será gerado o
      afastamento de licença prêmio de forma automática.

- [ ] **41.** Permitir a organização de datas dos períodos, acionados pela remodelagem de período aquisitivo de
      licença prêmio, alterados em decorrência de afastamentos, ocasionando suspensões ou cancelamentos.

- [ ] **42.** Possuir cadastro de formações, informando o nível: aperfeiçoamento, médio, técnico, superior,
      especialização, mestrado e doutorado, e permitindo relacionar com o órgão de classe da categoria e relacionar as
      áreas de atuação da profissão.

- [ ] **43.** Possibilitar a configuração da prorrogação e do cancelamento do período aquisitivo de adicionais, em
      decorrência de afastamentos.

- [ ] **44.** Permitir a inclusão de novos tipos de afastamentos.

- [ ] **45.** Permitir o lançamento de licenças por motivo de doença, acidente de trabalho e atestado de horas, sem
      prejuízo na frequência diária do servidor.

- [ ] **46.** Possibilitar o registro das rotas de transporte utilizadas pelos servidores, e seus respectivos valores
      unitários, a fim de definir os valores do benefício de vale-transporte. Ao definir as rotas, deve-se permitir
      informar a empresa de transporte, meio de transporte, perímetro, linha e valor.

- [ ] **47.** Permitir o cadastramento de planos de saúde, informando a tabela de valores dos planos por faixa etária,
      tabelas de subsídios dos servidores e dependentes, além dos valores de adesão ao plano.

- [ ] **48.** Permitir a inclusão do benefício de plano de saúde para as matrículas de funcionário, estagiário,
      aposentado e pensionista.

- [ ] **49.** Permitir a geração de adesão de plano de saúde para beneficiários no mês de ingresso do mesmo ao plano
      de saúde, independentemente do dia do mês.

- [ ] **50.** Permitir configuração de faixas de planos de saúde por aniversário ou no mês posterior.

- [ ] **51.** Possibilitar o uso de mais de um adicional por matrícula.

- [ ] **52.** Permitir a gestão de ocorrências disciplinares, possibilitando a consulta e o cadastro de elogios,
      advertência e suspensão de funcionário. Ao registrar uma ocorrência deverá permitir informar a data,
      funcionário, tipo, responsável, ato, motivo e testemunhas.

- [ ] **53.** Permitir cadastrar verbas para realizar os descontos de empréstimos na folha de pagamento de forma
      automática.

- [ ] **54.** Permitir o registro dos vencimentos dos processos de aposentadorias e pensões.

- [ ] **55.** Possibilitar que no ambiente de controle de período aquisitivo de licença prêmio seja possível acionar a
      rotina de remodelagem, onde aplica-se os ajustes de cancelamento e suspensão, conforme as definições da
      configuração de licença prêmio.

- [ ] **56.** Permitir registrar os riscos ambientais os quais os servidores estarão sujeitos de acordo com o local de
      trabalho e cargo.

- [ ] **57.** Possibilitar que o processamento de remodelagem do período de licença prêmio seja executado em segundo
      plano e que o usuário seja notificado quando do término do processamento.

- [ ] **58.** Permitir o lançamento automático de afastamento do servidor quando realizar a concessão da licença
      prêmio.

- [ ] **59.** Permitir o registro de averbação das experiências anteriores e dos contratos de trabalho, para
      adicional, licença prêmio, tempo de serviço e carreira.

- [ ] **60.** Permitir inserir o benefício de empréstimos para as matrículas de funcionário, estagiário, aposentado e
      pensionista.

- [ ] **61.** Permitir escolher a melhor forma de aplicação de subsídios de plano de saúde para os servidores e
      dependentes, podendo ser pelo salário contratual, tempo de serviço, idade e data de admissão

- [ ] **62.** Permitir o lançamento de mais de um período de gozo para o mesmo período aquisitivo de licença prêmio.

- [ ] **63.** Possibilitar que no ambiente de gestão do período aquisitivo de licença prêmio, permita o registro
      período de gozo e/ou abono da licença prêmio.

- [ ] **64.** Permitir configurar os valores de adicional de tempo de serviço, podendo configurar a progressão e o
      limite máximo do percentual recebido.

- [ ] **65.** Permitir o registro da quantidade de vales-transportes diário ou mensal utilizado pelo servidor no
      percurso de ida e volta ao local de trabalho.

- [ ] **66.** Possibilitar a vinculação de atestados médicos nos afastamentos decorrentes de acidentes de trabalho ou
      doenças.

- [ ] **67.** Disponibilizar ambiente que possibilite realizar o cálculo das despesas de vales-transportes para os
      funcionários de forma individual ou coletiva.

- [ ] **68.** Permitir o lançamento de licença prêmio em gozo e pecúnia para o mesmo período aquisitivo.

- [ ] **69.** Manter o cadastro de todos os períodos aquisitivos, possibilitando o registro da licença prêmio dos
      servidores, desde a admissão até a exoneração.

- [ ] **70.** Possibilitar a consulta dos descontos dos planos de saúde do servidor.

- [ ] **71.** Permitir a criação de empréstimo informando o valor da parcela e quantidade de parcelas.

- [ ] **72.** Possibilitar a quitação antecipada de parcelas de empréstimo.

- [ ] **73.** Possibilitar a realização da gestão de baixas das parcelas do benefício de empréstimos.

- [ ] **74.** Permitir o cadastro da configuração das regras que definem a aquisição do adicional de tempo de serviço.

- [ ] **75.** Possibilitar o registro de processos administrativos para os servidores.

- [ ] **76.** Permitir a emissão do Perfil Profissiográfico Previdenciário - PPP, baseado no histórico do servidor, no
      layout da previdência social.

- [ ] **77.** Permitir editar os dados dos empréstimos que estiverem em andamento.

- [ ] **78.** Permitir a criação do cadastro de Comissões Interna de Prevenção de Acidentes

- [ ] **79.** Permitir a configuração de agendas e agendamentos relacionados à de Saúde e Segurança do Trabalho,
      permitindo navegar entre as competências do calendário, filtrar por dia, semana ou mês do ano, e por agenda,
      estabelecimento ou responsável.

- [ ] **80.** Permitir registrar extintores existentes nas instalações do município.

- [ ] **81.** Permitir que o usuário crie o registro de visitas técnicas.

- [ ] **82.** Permitir a configuração do envio de dados para o sistema eSocial.

- [ ] **83.** Possibilitar integração dos dados de Recrutamento e Seleção (Concursos e Processos Seletivos) ao
      Transparência.

## Item 48 - Software de Licitações, Compras e Contratos para a Câmara de Vereadores

*Fonte: Anexo I, páginas 181-186/194.*

- [ ] **1.** Permitir a integração de dados de forma automática ou ainda através de arquivos de intercâmbio de
      informações com os sistemas de Contabilidade, Patrimônio, Almoxarifado, Frotas e Gerenciador de Notas
      Eletrônicas.

- [ ] **2.** Permitir a configuração da plataforma de licitações eletrônicas Compras.gov.br e interação;

- [ ] **3.** Permitir que os códigos CATMAT/CATSER do Portal de Compras do Governo Federal sejam vinculados aos
      materiais em compras e licitações.

- [ ] **4.** Permitir a indicação da configuração de estrutura organizacional a ser utilizada no exercício,
      possibilitando a criação das novas configurações caso exista necessidade.

- [ ] **5.** Permitir o cadastro de processos administrativos para compra de materiais, contratação de serviços ou
      obras, informando um protocolo, a data, o tipo do objeto, descrição do objeto, condição de pagamento, forma de
      julgamento, regime de execução, prazo de entrega, local de entrega, indicar se há previsão de subcontratação,
      categoria do processo e também a forma que será utilizada para controlar o saldo dos itens (quantidade ou
      valor).

- [ ] **6.** Permitir gerar processos administrativos ou compra direta pelo preço médio ou menor preço cotado do
      Registro de Preços.

- [ ] **7.** Permitir gerar contratação a partir da ata de registro de preço para execução do registro de preço.

- [ ] **8.** Permitir ao usuário visualizar e remanejar a quantidade dos itens divididos entre as entidades
      participantes da ata de registro de preços.

- [ ] **9.** Possibilitar a seleção da forma de contratação ou procedimento a ser adotado para o processo, caso se
      trate de uma licitação, contratação direta, adesão à ata de registro de preço ou chamada pública/credenciamento.

- [ ] **10.** Permitir aos usuários do sistema trocar de entidade e/ou exercício sem ter que fechá-lo.

- [ ] **11.** Permitir o acompanhamento dos processos licitatórios da preparação até o julgamento, registrando as
      etapas de: publicação do processo, emissão do mapa comparativo de preços, emissão das atas referentes
      documentação e julgamento das propostas, interposição de recurso, anulação e revogação, impugnação, anexar
      textos, parecer da comissão julgadora, parecer jurídico, homologação e adjudicação, autorizações de
      fornecimento, contratos e aditivos, liquidação das autorizações de fornecimento, gerar empenhos para a
      contabilidade e liquidação dos empenhos.

- [ ] **12.** Disponibilizar no sistema listagens/interfaces dinâmicas para controle de processos, contratações e de
      solicitações de fornecimento.

- [ ] **13.** Permitir o registro das solicitações de fornecimento para envio aos fornecedores dos materiais
      constantes no contrato tanto da forma impressa, como via e-mail.

- [ ] **14.** Permitir o cadastro dos recebimentos integrais ou parciais dos itens indicados nas solicitações de
      fornecimento enviadas aos fornecedores, possibilitando também a integração dos bens permanentes com o sistema
      Patrimônio e os materiais estocáveis com o sistema Almoxarifado.

- [ ] **15.** Permitir o cadastramento dos dados do fornecedor com nome, CNPJ/CPF, endereço, telefone, e-mail, porte
      da empresa, nome dos sócios e o respectivo percentual na sociedade, bem como a conta bancária para pagamento.

- [ ] **16.** Permitir integração e consulta dos dados dos fornecedores com a Receita Federal.

- [ ] **17.** Permitir incluir o CNAE (ramos de atividade) no cadastro de fornecedores e possibilitar a importação dos
      dados no CNAE do fornecedor da Receita Federal.

- [ ] **18.** Permitir inserir imagens nas descrições detalhadas no cadastro de materiais e serviços.

- [ ] **19.** Permitir o cadastro de feriados do exercício, sendo que o sistema deve disponibilizar os feriados
      nacionais do exercício logado e permitir inclusão de novos feriados como municipais e estaduais.

- [ ] **20.** Permitir a geração de arquivos e envio ao TCE para a respectiva prestação de contas;

- [ ] **21.** Permitir a geração de arquivos para demais sistemas/órgãos externos.

- [ ] **22.** Possibilitar o bloqueio/desbloqueio das despesas orçamentárias na contabilidade, permitindo o envio
      desde a solicitação de compra e mantendo-o até a geração do empenho correspondente.

- [ ] **23.** Permitir a distribuição/remanejamento da quantidade dos itens da contratação entre as despesas e
      desdobramentos da entidade.

- [ ] **24.** Permitir que o usuário escolha se deseja exibir apenas as despesas relacionadas ao Contrato ou todas as
      despesas da entidade e exercício.

- [ ] **25.** Permitir a geração de arquivo com os itens da coleta de preço para cotação pelos fornecedores,
      possibilitando a leitura dos preços cotados para preenchimento automático dos preços dos itens da coleta.

- [ ] **26.** Permitir o estimar preços dos itens da Cotação Preços, escolhendo uma das opções Preço médio, Melhor
      preço, Preço mediano ou Média saneada.

- [ ] **27.** Propiciar controlar as quantidades entregues parcialmente pelo fornecedor, possibilitando a emissão de
      relatório, contendo as quantidades entregues, os valores e o saldo pendente.

- [ ] **28.** Propiciar gerar entrada do material no almoxarifado a partir do recebimento da solicitação de
      fornecimento, na própria janela de recebimento.

- [ ] **29.** Permitir gerar bens no sistema patrimonial a partir do recebimento das solicitações de fornecimento.

- [ ] **30.** Permitir que o sistema emita mensagens de bloqueios ou avisos sobre os contratos a vencer, vencidos e
      cancelados.

- [ ] **31.** Permitir parametrização para numerar a licitação de forma sequencial ou por modalidade, possibilitando
      alterar a numeração sugerida pelo sistema.

- [ ] **32.** Disponibilizar dashboard para gerenciamento das contratações, contendo os seguintes dados: totais em
      contratações, autorização de fornecimentos, recebimentos, saldos a solicitar, contratos a vencer permitindo que
      o usuário selecione o período de vencimento que deseja visualizar e realizar controle das pendências cadastrais
      referente às contratações do exercício.

- [ ] **33.** Propiciar o cancelamento das solicitações de compra, permitindo a descrição completa do motivo da
      anulação.

- [ ] **34.** Propiciar controle, através de listagem dinâmica, de todas as Solicitações de Fornecimento, Empenhos e
      Liquidações;

- [ ] **35.** Permitir realizar o acompanhamento do saldo dos itens da licitação, detalhado por processo e por
      período.

- [ ] **36.** Propiciar efetuar o cadastro dos materiais incluindo informações como: tipo (Material, Bem Permanente ou
      Serviço), descrição sucinta e detalhada, inclusão de imagem na descrição detalhada, grupo e classe, natureza da
      despesa, descrição da natureza, informar se o material é estocável, unidade de medida, além de executar o
      controle de materiais em lista dinâmica.

- [ ] **37.** Possibilitar o cadastro e gerenciamento de Certificado de Registro Cadastral do fornecedor, permitindo
      numerar o CRC, e informar a data de validade.

- [ ] **38.** Dispor das principais fundamentações legais, como a lei 14.133/2021 e 8666/93, bem como permitir que o
      usuário cadastre uma fundamentação legal e ative/desative conforme necessidade.

- [ ] **39.** Permitir vincular documentos e certidões negativas, materiais fornecidos, nome dos sócios.

- [ ] **40.** Permitir a realização de licitações com julgamento pelo Maior Desconto sobre a Tabela/Catálogo de Preço
      ou sobre os próprios itens da licitação.

- [ ] **41.** Permitir a realização de licitações com julgamento pelo Menor Adicional de Acréscimo sobre uma Tabela de
      Preço.

- [ ] **42.** Permitir a utilização do Pregão para licitações em que o vencedor será aquele que apresentar o menor
      preço.

- [ ] **43.** Permitir realizar licitações por lotes com rateio automático do preço unitário ou possibilitar a
      atribuição do preço unitário para cada item do lote.

- [ ] **44.** Propiciar o julgamento dos processos licitatórios pela Melhor Técnica e Preço.

- [ ] **45.** Permitir aplicar, em licitações do tipo Menor Preço por Lote, descontos proporcionais para cada lote.

- [ ] **46.** Permitir o cadastro dos objetos de Licitação com a possibilidade de acompanhar os valores para cada
      modalidade dentro de um mesmo objeto, podendo saber quando o limite for ultrapassado. Os objetivos poderão ser
      utilizados nos processos licitatórios.

- [ ] **47.** Possibilitar o cadastro de novos tipos de objetos, possibilitando inserir novas descrições, selecionando
      os tipos de objetos padrões que devem existir no sistema: Compras e Serviços, Aquisição de Bens, Prestação de
      Serviços, Obras e Serviços de Engenharia, Alienação de Bens, Cessão de Direitos, Concessão, Concurso, Permissão,
      Locação, Seguros, Contratos de rateio, Outros direitos e Outras Obrigações.

- [ ] **48.** Permitida realizar dispensa de licitação com lances;

- [ ] **49.** Permitir a indicação dos fornecedores que participarão da cotação e informar os preços que cada um
      ofereceu para os itens solicitados.

- [ ] **50.** Permitir cadastrar a forma de julgamento das propostas dos licitantes que participam da licitação.

- [ ] **51.** Propiciar cadastrar modelos de textos próprios, como solicitações e pareceres.

- [ ] **52.** Propiciar manter o cadastro dos órgãos oficiais que serão realizadas as publicações dos processos.

- [ ] **53.** Possibilitar o registro das solicitações de compra, bem como a emissão de relação das mesmas por
      período.

- [ ] **54.** Permitir o cadastro de solicitação de compra informando a sua entidade gestora.

- [ ] **55.** Permitir o cadastramento de coletas de preço, possibilitando gerar uma compra direta ou processo
      administrativo, tendo como base para o valor máximo do item o preço médio ou menor preço cotado para o item na
      coleta de preços.

- [ ] **56.** Permitir anexar documentos no processo administrativo.

- [ ] **57.** Permitir a inserção dos itens do processo administrativo contendo o material ou serviço, quantidade,
      preço unitário previsto, preço total e indicação da solicitação de compra de origem.

- [ ] **58.** Disponibilizar rotina de transferência de vencedor no processo licitatório, a ser utilizada nos casos em
      que o convocado (Vencedor) não assinar/aceitar a ata de registro de preços ou o termo de contrato, sendo
      necessário convocar os licitantes remanescentes e declarar um novo vencedor.

- [ ] **59.** Permitir excluir uma coleta de preços.

- [ ] **60.** Propiciar o cadastro e julgamento dos processos com os tipos: menor preço por material, global ou por
      lote.

- [ ] **61.** Permitir, diretamente do sistema, a realização de pesquisa de preço, possibilitando buscar e filtrar o
      menor preços dos materiais e serviços, das licitações realizadas nas esferas Municipal, Estadual e Federal do
      ComprasGov.

- [ ] **62.** Permitir o cadastro de compras diretas, informando dados como data da compra, fornecedor, centro de
      custo, objeto da compra, local de entrega e forma de pagamento.

- [ ] **63.** Permitir a busca de contratações e compras diretas independentemente do exercício logado, permitindo a
      consulta e pesquisa de informações por pesquisa avançada ou filtros existentes no próprio ambiente, tais como:
      contratos em execução, encerrados e cancelados.

- [ ] **64.** Permitir cadastro dos itens da compra direta separando estes por centros de custo específicos, por
      despesas ou ambos.

- [ ] **65.** Permitir duplicar o cadastro de compra direta e seus itens.

- [ ] **66.** Permitir executar a rotina de exclusão da compra direta.

- [ ] **67.** Permitir a exclusão de contratos.

- [ ] **68.** Propiciar emitir o ofício de justificativa de dispensa de licitação.

- [ ] **69.** Propiciar a emissão da autorização de fornecimento das compras diretas, permitindo vincular os dados dos
      empenhos.

- [ ] **70.** Emitir a solicitação da abertura da licitação, com informações número da licitação, modalidade, forma de
      julgamento, forma de pagamento, prazo de entrega, local de entrega, vigência, itens e objeto a ser licitado.

- [ ] **71.** Propiciar cadastrar e acompanhar os processos licitatórios desde a preparação até seu julgamento, em
      listagem interativa.

- [ ] **72.** Permitir o envio dos dados dos processos licitatórios para o portal da transparência.

- [ ] **73.** Disponibilizar campo para inserção de link de gravação audiovisual das sessões de julgamento.

- [ ] **74.** Propiciar o cadastramento de licitações envolvendo a demanda de uma ou mais entidades, onde a entidade
      gestora da licitação poderá gerenciar as aquisições realizadas pelas entidades participantes.

- [ ] **75.** Possibilitar através da consulta do material, a pesquisa do histórico completo de compra, podendo
      consultar dados de contratações, tais como: fornecedor e valor unitário.

- [ ] **76.** Permitir a contratação do segundo classificado quando o fornecedor vencedor deixar de fornecer o
      material ou de executar os serviços, mostrando na tela o próximo fornecedor classificado e opção para assumir ou
      não o mesmo preço unitário do vencedor anterior.

- [ ] **77.** Registrar os processos licitatórios contendo todos os dados necessários para sua identificação, tais
      como número do processo, objeto da compra, modalidade de licitação, fundamentação legal, se é registro de preço,
      autoridade competente, comissão responsável e datas de abertura e recebimento dos envelopes.

- [ ] **78.** Permitir que os itens do processo sejam separados por centro de custo com suas respectivas quantidades,
      possibilitando ainda a separação por despesa.

- [ ] **79.** Permitir no lançamento dos itens do processo licitatório a inclusão de um novo item entre os já
      inseridos e após realizar a renumeração dos itens.

- [ ] **80.** Permitir a apuração dos vencedores da licitação, bem como desclassificar aqueles que não cumpriram algum
      item do edital ou cotaram preço acima do preço máximo estabelecido para um item, inclusive se for licitação por
      lotes.

- [ ] **81.** Permitir efetuar lances para na modalidade de pregão presencial de forma cronometrada, apresentando a
      diferença mínima entre os lances, bem como visualizar o valor mínimo aceitável para o próximo lance, com a opção
      de declinar para os participantes que desistirem da competição.

- [ ] **82.** Permitir o registro da inabilitação de um licitante logo após o encerramento de cada item/lote do Pregão
      Presencial ou somente após o encerramento de todos os itens/lotes.

- [ ] **83.** Permitir que o pregoeiro registre os lances do pregão trazendo ao final de cada lance o próximo
      classificado automaticamente e permitindo registrar um novo lance ou declinar o participante salvando
      automaticamente os lances já registrados, e possibilitar ainda, que ao retornar aos lances, caso esses tenham
      sido interrompidos, possa continuar de onde parou.

- [ ] **84.** Propiciar a utilização de critérios de julgamento das propostas em relação a microempresa e empresa de
      pequeno porte, de acordo com lei complementar 123/2006.

- [ ] **85.** Permitir o armazenamento, por meio de arquivo PDF ou de imagem, do documento do participante da
      licitação.

- [ ] **86.** Possibilitar, a partir da tela de lances do pregão, desclassificar um participante já classificado para
      a etapa de lances, permitindo refazer a classificação. Após desclassificar um participante, o sistema deve
      possibilitar a reclassificação das propostas, desconsiderando o participante que foi desclassificado, permitindo
      a inclusão dos demais.

- [ ] **87.** Possibilitar a distribuição automática da diferença entre o valor do lote proposto e o valor final do
      lote vencido pelo participante, permitindo informar quantas casas decimais deseja utilizar no rateio. Se faz
      necessária a funcionalidade para ajustar o valor unitário dos itens de cada lote, até que a soma do valor dos
      itens totalize o mesmo valor do lote proposto pelo vencedor.

- [ ] **88.** Propiciar a emissão de demonstrativo com a relação da economicidade do pregão presencial (valor previsto
      x lance).

- [ ] **89.** Possibilitar a classificação automática dos preços ofertados pelos participantes, destacando aqueles que
      apresentarem o menor preço por item ou menor preço global, possibilitando ao usuário, selecionar outro
      fornecedor caso seja necessário.

- [ ] **90.** Permitir cadastrar as propostas de preços dos participantes da licitação, ou a importação da proposta
      digitada pelo participante em outro aplicativo. Permitir, ainda, a digitação do valor unitário dos itens da
      proposta do participante, inclusive quando for por lote.

- [ ] **91.** Permitir armazenar no sistema, por meio de arquivo pdf ou de imagem, a proposta original do
      participante.

- [ ] **92.** Permitir integração com plataformas de licitação eletrônicas como por exemplo: Portal de Compras
      Públicas, ComprasBR e BNC (BLL).

- [ ] **93.** Conter rotina para duplicar os dados de um processo de compra já cadastrado para um novo processo de
      compra de forma automática.

- [ ] **94.** Permitir o cadastro de sanções e penalidades aplicáveis ao fornecedor contratado, contendo informações
      como: o fornecedor, tipo de sanção, número do contrato, data da sanção, período que deverá ser aplicada,
      processo administrativo sancionatório, fundamento legal e motivo.

- [ ] **95.** Conter rotina de registro das interposições de recursos nos processos de compra.

- [ ] **96.** Conter rotina de anulação, revogação, descarte, suspensão e reinício dos processos de compra.

- [ ] **97.** Conter rotina de registro das possíveis impugnações no processo de compra.

- [ ] **98.** Propiciar efetuar os registros dos pareceres das comissões de licitação e serem emitidas nos modelos de
      atas de julgamento de propostas.

- [ ] **99.** Proporcionar o registro de licitação Deserta ou Fracassada no processo de compra.

- [ ] **100.** Propiciar o registro de adjudicação, homologações e adjudicações e homologação ou ratificação nos
      processos de compra.

- [ ] **101.** Propiciar informar nos processos licitatórios as dotações orçamentárias da entidade gestora e das
      participantes para cada item, caso o processo seja multientidade possibilitar informar a dotação de cada
      entidade.

- [ ] **102.** Propiciar gerar os bloqueios/desbloqueios de dotações orçamentárias para cada entidade contábil através
      do processo de compra.

- [ ] **103.** Permitir cadastrar processos de compras individuais para cada entidade, desde as solicitações de
      compras, coletas de preços, processo de compra e contratos.

- [ ] **104.** Permitir que os dados sejam unificados entre entidades, permitindo o cadastro de diferentes entidades,
      onde os cadastros de materiais e credores poderão ser integrados entre as entidades.

- [ ] **105.** Permitir visualizar e controlar o andamento das contratações cadastradas, listando cada uma em sua
      situação, possibilitando utilizar filtros de pesquisa e, agrupar os registros por entidade e por fornecedor.

- [ ] **106.** Possuir controle automático do saldo dos itens do contrato, podendo controlar pela quantidade do item
      ou pelo valor total do item, considerando valor e quantidade original, aditamentos de acréscimo ou supressão,
      entre outras alterações contratuais que refletem no saldo quantitativo ou financeiro.

- [ ] **107.** Permitir cadastrar as despesas orçamentárias, de forma individual e manual, ou de forma automática
      informando àquelas do processo que originou a contratação.

- [ ] **108.** Permitir o bloqueio e desbloqueio das dotações orçamentárias vinculadas às contratações de forma
      automática via sistema.

- [ ] **109.** Permitir anexar textos ou documentos nas contratações e criar modelos de contratos.

- [ ] **110.** Permitir o envio dos dados das contratações para criação dos empenhos na contabilidade, informando a
      origem dos dados.

- [ ] **111.** Possibilitar o cadastro de anulação de empenho informando os dados do empenho a ser anulado, bem como
      permitir a integração com a contabilidade.

- [ ] **112.** Permitir o envio de liquidação dos empenhos das contratações na contabilidade, informando a data de
      referência e a situação das informações, disponibilizando para consulta a despesa orçamentária, seu
      desdobramento, o recurso e o valor total do empenho.

- [ ] **113.** Permitir o cadastro de um processo de compra para mais de uma entidade, permitindo reunir solicitações
      de compra de todas as entidades para formação de um único processo licitatório, dessa forma, os itens deverão
      ser separados em quantidades para cada entidade levando em consideração as respectivas dotações e centros de
      custos. Para esses casos, o sistema deve possuir uma entidade gestora, responsável pelo processo de compra.

- [ ] **114.** Possibilitar incluir os responsáveis dos contratos, informando nome, tipo de responsabilidade
      (assinante, controlador de encargos, gestor, suplente ou fiscal) e seu período de responsabilidade.

- [ ] **115.** Permitir, no registro do contrato, vincular itens conforme os itens vencidos da licitação, e em caso de
      contratação sem licitação, permitir inserir os itens desejados.

- [ ] **116.** Permitir cadastrar todas as contratações, precedidas ou não de procedimento licitatório, controlando
      quando há exigência de termo contratual e quando ele é dispensado, informando a numeração, caso possua, o objeto
      da contratação, fornecedor, data de assinatura, período de vigência, valor original da contratação, se envolve
      contratação com saúde ou educação.

- [ ] **117.** Permitir a identificação dos contratos que estão em execução e dos que estão encerrados.

- [ ] **118.** Permitir o cancelamento de uma contratação registrada no sistema, informando a data do cancelamento e o
      seu motivo.

- [ ] **119.** Permitido registrar o cronograma de pagamentos nas contratações.

- [ ] **120.** Permitir manter histórico das alterações do contrato permitindo o tipo de alteração contratual, tais
      como: acréscimo, diminuição, equilíbrio econômico-financeiro, prorrogação, rescisão ou apostilamento.

- [ ] **121.** Propiciar a rescisão do contrato ou aditivo, informando motivo da rescisão, tipo, data, valor cancelado
      e indenizado e responsável.

- [ ] **122.** Propiciar registrar o apostilamento de alteração de despesa orçamentária do processo licitatório.

- [ ] **123.** Permitir a criação de relatórios personalizados.

- [ ] **124.** Permitir a criação de novos campos complementares aos cadastros padrões disponibilizados, sendo estes
      nos formatos área de texto, CNPJ, CPF, data, data e hora, e-mail, hora, lista de seleção, múltipla seleção,
      numérico, telefone e texto, com a indicação do rótulo, texto de ajuda, validade inicial e final do campo.

- [ ] **125.** Disponibilizar acesso a central de ajuda com acesso nas telas do sistema

- [ ] **126.** Possibilitar o envio de Licitações, Contratação Direta, Atas de Registros de Preços, Credenciamentos,
      Contratos e Alterações Contratuais para o Portal Nacional de Contratações Públicas (PNCP).

- [ ] **127.** Disponibilizar a figura do Agente de Contratação nas comissões de licitação.

- [ ] **128.** Possibilitar a prorrogação de prazo nas atas de registros de preços conforme previsto na lei
      14.133/2021.

- [ ] **129.** Permitir o cadastro de Documentos de Formalização de Demandas (DFD) com a possibilidade de informar a
      entidade gestora, setor requisitante, data, responsável, descrição, justificativa, prioridade, data da
      contratação e número e nome da contratação futura.

- [ ] **130.** Permitir vincular os itens no Documentos de Formalização de Demandas (DFD) estes itens devem possuir
      informações exigidas pelo PNCP para o envio do PCA tais como: Catálogo utilizado, categoria, código da classe e
      descrição da classe.

- [ ] **131.** Permitir a tramitação utilizando formato de fluxograma do Documentos de Formalização de Demandas (DFD)
      nas seguintes etapas: Em edição, Aguardando aprovação, Aprovado e Reprovado.

- [ ] **132.** Permitir a criação e gerenciar o Plano de Contratação Anual (PCA).

- [ ] **133.** Ser possível criar o Plano de Contratação Anual (PCA) a partir de um ou mais DFD cadastrados.

- [ ] **134.** Disponibilizar ferramenta de cadastro único dos dados, onde o usuário personaliza a forma como seus
      cadastros devem ser unificados.

- [ ] **135.** Possibilitar a configuração de quantidade de casas decimais para quantidade e valores unitários.

## Item 49 - Software de Patrimônio para a Câmara de Vereadores

*Fonte: Anexo I, páginas 186-188/194.*

- [ ] **1.** Permitir o registro das movimentações dos bens patrimoniais, como aquisição, transferência, baixa,
      reavaliação, depreciação e inventários.

- [ ] **2.** Permitir que o usuário seja mantido no mesmo exercício ao alternar a entidade logada no sistema.

- [ ] **3.** Propiciar a indicação da configuração do organograma do município que será válida para o exercício.

- [ ] **4.** Disponibilizar informações dos bens tais como: valores líquidos contábeis, total de bens, total de bens
      ativos, total de bens baixos, pendências operacionais e movimentações de bens no painel da gestão.

- [ ] **5.** Disponibilizar informações dos bens no Portal da Transparência.

- [ ] **6.** Permitir enviar os anexos dos bens patrimoniais para o Portal da Transparência a serem transparecidos
      para os cidadãos.

- [ ] **7.** Propiciar o controle dos bens por meio de registro de placas.

- [ ] **8.** Propiciar o registro da fórmula de cálculo para diferentes métodos de depreciação, exaustão e
      amortização, permitindo a classificação em linear, soma de dígitos ou unidades.

- [ ] **9.** Permitir a configuração dos órgãos, unidades orçamentárias e centro de custo da entidade.

- [ ] **10.** Permitir o registro de grupos de bens, definição do percentual de depreciação anual, valor residual do
      bem e vida útil do grupo de bens, com controle e consulta através de listagem dinâmica.

- [ ] **11.** Propiciar o cadastro de unidade de medida dos bens da entidade, permitindo informar a abreviatura,
      grandeza e se possui ou não fracionamento.

- [ ] **12.** Permitir o cadastro dos tipos de transferências dos bens, informando descrição e classificação, e nos
      casos de transferência entre responsáveis, organogramas, grupos de bem, localização física entre entidades e
      espécie do bem.

- [ ] **13.** Permitir o cadastro de localizações físicas, possibilitando informar níveis e endereço.

- [ ] **14.** Permitir o cadastro de apólice de seguro com a opção de vinculação dos bens e contrato a essa apólice,
      os contratos devem ser apresentados em uma lista para ser selecionado, buscando de forma automática no sistema
      contratos da entidade.

- [ ] **15.** Propiciar o envio, retorno e consulta de bens da manutenção, permitindo o registro da próxima revisão.

- [ ] **16.** Possuir relatório de bens enviados para manutenção, contendo minimamente, placa, descrição, data de
      envio, previsão de entrega e retorno.

- [ ] **17.** Propiciar o envio, retorno e consulta de bens cedidos ou emprestados, com registro da data prevista para
      retorno.

- [ ] **18.** Propiciar o registro da utilização do bem imóvel, classificado em dominicais, uso comum do povo, uso
      especial, em andamento e demais bens imóveis.

- [ ] **19.** Permitir tombar o bem, demonstrando o organograma, placa e responsável.

- [ ] **20.** Permitir informar o estado de conservação dos bens.

- [ ] **21.** Permitir identificar na listagem a situação que o bem se encontra, inclusive de estar ou não em uso.

- [ ] **22.** Propiciar a remoção do registro do bem após desfazer o seu tombamento, sendo que para desfazer o
      tombamento o bem não deve possuir movimentações vinculadas.

- [ ] **23.** Permitir informar a moeda vigente na aquisição do bem e conversão dos valores para moeda vigente.

- [ ] **24.** Permitir o cadastro de responsáveis pelos bens patrimoniais, informando nome, CPF, telefone, e-mail, se
      é funcionário do município, matrícula, cargo, natureza do cargo e o endereço.

- [ ] **25.** Permitir cadastrar os fornecedores, contendo o nome, o CPF ou CNPJ, endereço, telefone, e-mail, site,
      inscrição municipal, inscrição estadual e se o fornecedor está inativo. O registro deverá ser integrado com os
      sistemas de Compras, Contratos, Frotas e Contabilidade.

- [ ] **26.** Permitir a localização dos dados cadastrais do fornecedor no banco de dados da Receita Federal.

- [ ] **27.** Permitir a emissão e registro do Termo de Responsabilidade, individual ou coletivo dos bens.

- [ ] **28.** Permitir o registro e processamento da depreciação, amortização e exaustão dos bens em uso, atualizando
      de forma automática os valores depreciados no bem.

- [ ] **29.** Possibilitar que na exclusão do movimento de depreciação, os movimentos processados e registrados no bem
      sejam excluídos e retornados os valores anteriores a depreciação excluída, bem como a data da última
      depreciação.

- [ ] **30.** Permitir registrar depreciação contendo as principais informações, como mês e ano, data da finalização,
      responsável e observação.

- [ ] **31.** Propiciar a baixa de bens de forma individual ou em lote, atualizando automaticamente a situação do bem
      para baixado, bem como estornar a baixa após sua finalização, retornando o bem para a situação antes de ser
      baixado.

- [ ] **32.** Permitir cadastrar o tipo de baixa do bem, podendo classificar em: doação em pagamento, doação ou
      cessão, perda, permuta, roubo ou furto, sucata, venda e outras.

- [ ] **33.** Propiciar transferências de bens entre organograma, responsáveis, grupos de bens, localizações físicas,
      entre entidades, espécie do bem e configuração de organograma.

- [ ] **34.** Permitir transferências individuais ou por lote, atualizando automaticamente os novos registros no bem.

- [ ] **35.** Permitir a transferência de bens de uma entidade para outra, realizando a baixa automática na entidade
      de origem e incorporação na entidade de destino, sem intervenção de cadastro manual, possibilitando também o
      estorno da transferência entre entidades.

- [ ] **36.** Permitir a transferência de bens quando há uma alteração de organograma, localização ou responsável.

- [ ] **37.** Permitir o controle da destinação dos bens patrimoniais em desuso.

- [ ] **38.** Permitir a elaboração de inventário de bens patrimoniais com conferência dos bens (localizado e não
      localizado).

- [ ] **39.** Permitir no inventário a possibilidade de atualização dos dados tais como: organograma, localização
      física é responsável.

- [ ] **40.** Disponibilizar aplicativo compatível com Android para realização de busca e coleta de bens para
      inventário.

- [ ] **41.** Permitir a leitura de etiquetas por meio da tecnologia RFID (Radio-Frequency Identification), utilizando
      o recurso NFC (leitura por aproximação) através de dispositivo móvel.

- [ ] **42.** Disponibilizar ambiente para controle da coleta de bens para o inventário, via aplicativo móvel e no
      sistema Patrimônio web.

- [ ] **43.** Permitir armazenar documentos relacionados a localização do bem por meio dos arquivos em formato PDF,
      DOC, DOCX, TXT, HTML, XLS, XLSX, JPG, PNG com tamanho máximo de 25 MB.

- [ ] **44.** Permitir o envio de dados dos bens ativos e baixados para Portal da Transparência.

- [ ] **45.** Permitir identificar bens que não possuem saldo para depreciar, e que o valor líquido contábil esteja
      igual ao valor residual do bem.

- [ ] **46.** Permitir a pesquisa simples e avançada no processo de depreciação, com disponibilidade de filtros que
      auxiliam na obtenção de resultado preciso.

- [ ] **47.** Permitir integração com o sistema da contabilidade para envio de depreciações, reavaliações, baixas,
      transferências e aquisições.

- [ ] **48.** Permitir pesquisar os bens por código e placa ao adicionar e listar bens para transferência, além de
      pesquisar ao adicionar um bem por organograma, grupo, espécie, localização física, responsáveis e estado de
      conservação.

- [ ] **49.** Permitir a cópia de um bem já cadastrado para facilitar o cadastramento de bens em lote.

- [ ] **50.** Permitir a integração com o sistema de contratos, possibilitando a entrada de bens permanentes licitados
      no sistema Patrimônio via integração entre os sistemas.

- [ ] **51.** Permitir realizar reavaliação de bens sendo valorização ou desvalorização.

- [ ] **52.** Permitir o cadastro de comissões contendo tipo, tipo do ato, ato, data de expiração, data de exoneração,
      finalidade e membros.

- [ ] **53.** Possibilidade de impressão de etiquetas para os bens.

- [ ] **54.** Permitir a impressão de relatório para controle dos bens patrimoniais, podendo realizar a emissão por
      placa, grupo, responsável, localização física, número do comprovante, empenho/ano, processo/ano, tipo do bem e
      fornecedor.

- [ ] **55.** Permitir a criação de novos campos complementares nos cadastros padrões do sistema, sendo estes nos
      formatos área de texto, CNPJ, CPF, data, data e hora, e-mail, hora, lista de seleção, múltipla seleção,
      numérico, telefone e texto, com a indicação do rótulo, texto de ajuda, validade inicial e final do campo.

## Item 50 - Software de Controle de Almoxarifado para a Câmara de Vereadores

*Fonte: Anexo I, páginas 188-190/194.*

- [ ] **1.** Permitir o controle de toda movimentação do estoque, sendo entrada, saída e transferência de materiais,
      atualizando o estoque de acordo com cada movimentação realizada.

- [ ] **2.** Permitir o gerenciamento automático nas saídas através de requisições ao almoxarifado, anulando as
      quantidades que não possuem estoque e sugerindo as quantidades disponíveis.

- [ ] **3.** Permitir informar limites mínimos, limites máximos, consumo médio mensal e ponto de reposição de saldo
      físico de estoque.

- [ ] **4.** Permitir a importação das notas fiscais eletrônicas do sistema que as armazena, a fim de registrar a
      entrada de materiais no almoxarifado.

- [ ] **5.** Permitir consultar as últimas aquisições, com informação do preço das últimas entradas, para estimativa
      de custo.

- [ ] **6.** Permitir receber do sistema de Contratos, solicitações de entrada de material, permitindo visualizar e
      registrar a entrada de materiais, visualizar e realizar as ações da solicitação de entrada de materiais. Para os
      casos de solicitações de entrada de material pendentes para aprovação, a demonstração deve ser em ordem
      crescente pela data e hora da solicitação.

- [ ] **7.** Permitir que o sistema Contratos envie as seguintes informações na solicitação de entrada de material:
      número da solicitação de fornecimento, número do processo administrativo, número do contrato, data e horário do
      recebimento do material, código do organograma, descrição do organograma, nome do fornecedor, número do
      comprovante, valor total e objeto.

- [ ] **8.** Permitir movimentações de entrada e saída do material de forma automática ao finalizar o inventário,
      corrigindo o saldo dos materiais e respeitando o organograma e lote de validade indicado na contagem.

- [ ] **9.** Permitir que a listagem das saídas de materiais registradas possa ser pesquisada pelo número da saída,
      descrição do almoxarifado, descrição e número do organograma, período da saída, responsável, pessoa que retirou
      o material, natureza da movimentação e identificador de origem.

- [ ] **10.** Permitir informar quem retirou e o local de entrega na saída de materiais.

- [ ] **11.** Permitir realizar requisições de materiais ao responsável do almoxarifado, bem como realizar o controle
      de pendências dos respectivos pedidos para fornecimento de materiais.

- [ ] **12.** Permitir a exclusão de entrada de materiais, sendo que ao excluir o sistema deverá recalcular, na
      movimentação futura, o valor unitário e o saldo quantitativo dos materiais existentes. Essa exclusão não poderá
      ocorrer quando o saldo dos materiais da entrada ficar negativo em algum momento futuro em relação a data da
      efetivação da entrada, a entrada ocorrer um período onde a movimentação do almoxarifado está encerrada ou se a
      entrada de materiais for referente a um estorno, transferência ou inventário.

- [ ] **13.** Permitir a alteração dos dados das entradas já esteja finalizada, podendo alterar os seguintes dados:
      número do comprovante, série e anexos.

- [ ] **14.** Permitir informar os centros de custo (setores ou departamentos) nas requisições para controle do
      consumo.

- [ ] **15.** Registrar a abertura e o fechamento de inventários. Não permitindo a movimentação, de entrada ou saída
      de materiais, quando o estoque e/ou produto estiverem em inventário. A movimentação somente poderá ocorrer após
      a conclusão do inventário.

- [ ] **16.** Permitir registrar a quantidade dos itens encontrados no inventário, possibilitando o ajuste dos saldos
      de forma automática no estoque.

- [ ] **17.** Possuir rotina que permita a realização de encerramento por almoxarifado a fim de não permitir nenhum
      tipo de movimentação (entrada/saída).

- [ ] **18.** Possuir consulta rápida dos dados referente ao vencimento do lote do estoque, possibilitando ao menos a
      consulta dos vencidos, vencimentos em período a definir, através de listagem dinâmica, com possibilidade de
      inclusão, alteração ou exclusão de lotes através da lista.

- [ ] **19.** Propiciar a emissão de relatório da ficha de controle de estoque, mostrando as movimentações por
      material e período com saldo anterior ao período.

- [ ] **20.** Propiciar a emissão de relatórios de entradas e saídas de materiais por produto, nota fiscal e setor
      (centro de custo).

- [ ] **21.** Emitir um resumo anual das entradas e saídas, mostrando o saldo financeiro mês a mês por estoque e o
      resultado ao final do ano.

- [ ] **22.** Emitir relatórios de controle de validade de lotes de materiais, possibilitando seleção por:
      almoxarifado/depósito, período, materiais vencidos, materiais a vencer.

- [ ] **23.** Possibilitar a emissão de relatório de posição de estoque com o período desejado, para identificar o
      estoque na data desejada.

- [ ] **24.** Permitir a visualização de saldo dos materiais por fornecedores de acordo com as últimas entradas
      realizadas no almoxarifado.

- [ ] **25.** Permitir listar os lotes de validade registrados, filtrando por vencidos e a vencer, exibindo o seu
      número do lote, descrição, material, código do material, unidade de medida, data de fabricação e data de
      validade.

- [ ] **26.** Permitir o gerenciamento integrado dos estoques de materiais existentes nos diversos
      almoxarifados/depósitos.

- [ ] **27.** Permitir realizar saídas de materiais com datas retroativas.

- [ ] **28.** Permitir emitir a nota de saída através do botão de impressão rápida, presente no mesmo ambiente do
      cadastro da saída.

- [ ] **29.** Emitir alerta na saída de materiais, quando o material atingir estoque mínimo ou ponto de reposição,
      conforme a quantidade configurada.

- [ ] **30.** Permitir a demonstração de todos os materiais cadastrados no almoxarifado.

- [ ] **31.** Permitir enviar os dados das movimentações do almoxarifado para o Portal da Transparência.

- [ ] **32.** Permitir pesquisar os materiais pelo código do material e descrição do material.

- [ ] **33.** Possibilitar filtros na pesquisa avançada das requisições com as seguintes opções: número da requisição,
      período da requisição, requisitante, organograma requisitante e requisitado, almoxarifado requisitante e
      requisitado.

- [ ] **34.** Permitir a leitura de arquivo de inventário gerado pelo coletor de dados, de forma flexível para
      atendimento a qualquer leiaute de arquivo, aceitando arquivos do tipo TXT, CSV, XML.

- [ ] **35.** Permitir o anexo de arquivos no registro da localização física, ao menos nos formatos PDF, DOC, DOCX,
      ODT, TXT, XLS, XLSX, JPG, PNG, COT, com tamanho máximo de até 25 MB.

- [ ] **36.** Permitir a realização do atendimento da requisição de materiais ao almoxarifado por meio de aplicativo
      mobile, possibilitando a conferência por meio da leitura do código de barras com a câmera do smartphone ou por
      meio de um leitor de código de barras, realizando a baixa do saldo dos materiais no almoxarifado após o
      atendimento.

- [ ] **37.** Permitir a utilização do sistema dentro de um contexto, sendo por entidade, exercício e almoxarifado.

- [ ] **38.** Permitir a configuração dos órgãos, unidades orçamentárias e centro de custo da entidade.

- [ ] **39.** Permitir listar as requisições recebidas que estejam pendentes de atendimento, que não foram totalmente
      atendidas e nem canceladas, exibindo o código da requisição, a data da requisição, o código do organograma
      requisitante, a descrição do organograma requisitante, o nome da pessoa requisitante e a situação da requisição.

- [ ] **40.** Permitir listar todos os materiais durante a entrada de materiais, podendo ser pesquisados pelo número
      do item, código do material, descrição do material e código da especificação.

- [ ] **41.** Permitir a realização de saída imediata dos materiais pertencentes a entrada, caso a entrada tenha sido
      finalizada.

- [ ] **42.** Permitir o registro das saídas de materiais do almoxarifado, sendo que ao final do registro o sistema
      deverá gerar automaticamente um código identificador da saída.

- [ ] **43.** Demonstrar as entradas e saídas de itens que estão parcialmente finalizadas, exibindo a situação na
      listagem inicial nas rotinas.

- [ ] **44.** Permitir que seja controlado o saldo dos materiais do almoxarifado.

- [ ] **45.** Permitir via dispositivo móvel atendimento dos materiais que estão sendo requisitados ao almoxarifado, o
      atendimento dos itens na requisição poderá ser efetuado por meio da leitura do código de barras do produto.

- [ ] **46.** Permitir, durante a coleta do atendimento da requisição pelo dispositivo móvel, o acréscimo na
      quantidade atendida o valor um para o material coletado possibilitando a alteração da quantidade lida, em cada
      leitura feita.

- [ ] **47.** Permitir a edição da quantidade lida do material no atendimento da requisição, de forma manual ou por
      meio de uma nova leitura do material.

- [ ] **48.** Permitir visualizar o saldo do material no almoxarifado requisitante durante o atendimento de uma
      requisição via dispositivo móvel.

- [ ] **49.** Permitir a listagem dos itens da requisição selecionada, demonstrando o código da requisição, o código
      do material, descrição do material, código da especificação, descrição da especificação, unidade de medida,
      quantidade pendente para atendimento, quantidade atendida e saldo do material no almoxarifado.

- [ ] **50.** Permitir que ao efetuar login no sistema possa selecionar o contexto do sistema, indicando a entidade
      permissionária e o Almoxarifado permissionário, o exercício existente para esta Entidade.

- [ ] **51.** Permitir a mesma autenticação no aplicativo utilizada no sistema Almoxarifado.

- [ ] **52.** Possibilitar a inserção de imagens nas descrições detalhadas no cadastro de materiais.

- [ ] **53.** Permitir a transferência de materiais entre almoxarifados e setores (centro de Custo).

- [ ] **54.** Possibilitar o envio de dados para o portal de indicadores.

- [ ] **55.** Permitir integração/envio de dados ao portal da transparência.

## Item 51 - Software para Portal de Transparência para a Câmara de Vereadores

*Fonte: Anexo I, páginas 190-193/194.*

- [ ] **1.** Atender às Leis Complementares nº 10/2000 e nº 131/2009, aos anexos da Lei nº 9.755/1998, e aos preceitos
      e exigências da Lei Federal nº 12.527/2011.

- [ ] **2.** Disponibilizar as informações até o primeiro dia útil subsequente à data do registro contábil no
      respectivo sistema, sem prejuízo do desempenho e da preservação das rotinas de segurança operacional necessários
      ao seu pleno funcionamento, conforme legislação.

- [ ] **3.** Possibilitar configuração de acessos a usuários com permissões de inclusões e alterações pelo gerenciador
      de usuários.

- [ ] **4.** É possível integrar no sistema todas as entidades da administração direta, as autarquias, as fundações,
      os fundos e as empresas estatais dependentes.

- [ ] **5.** Permitir a consulta de Receitas, Despesas, Patrimônio, Licitações, Compras, Contratos, Pessoal,
      Demonstrativos contábeis, Convênios, Obras Públicas e Gestão de frotas.

- [ ] **6.** Gerar as seguintes informações relativas aos atos praticados pelas unidades gestoras no decorrer da
      execução orçamentária e financeira quanto ao valor do empenho, liquidação e pagamento e quanto a receita, os
      valores das receitas da unidade gestora, compreendendo no mínimo sua natureza, relativas a Previsão e
      Arrecadação.

- [ ] **7.** Exibir as receitas organizadas por natureza, permitindo navegar em cada nível de seus respectivos
      subníveis, exibindo o total dos seguintes valores, por nível: Receita prevista, receita arrecadada.

- [ ] **8.** Exibir as despesas organizadas por natureza, permitindo navegar em cada nível de seus respectivos
      subníveis, exibindo o total dos seguintes valores, por nível: Total de créditos, Fixado, Empenhado, Liquidada,
      Pago.

- [ ] **9.** Permitir visualizar os empenhos emitidos para cada fornecedor, os itens dos empenhos, a quantidade, o
      valor unitário e o valor total.

- [ ] **10.** Permitir visualizar o tipo, número, data de emissão e data de pagamento dos documentos fiscais ligados a
      cada empenho.

- [ ] **11.** Exibir os valores recebidos e/ou repassados de transferências financeiras por Unidade Orçamentária.

- [ ] **12.** Permitir consultar despesa por unidade gestora, por natureza da despesa, permitindo navegar em cada
      nível da natureza, exibindo seus respectivos valores empenhados, liquidados e pagos.

- [ ] **13.** Exibir informações detalhadas sobre diárias, tais como: Número da diária, local de saída, local de
      retorno, data de partida, data de retorno, objeto, valor unitário e quantidade.

- [ ] **14.** Permitir visualizar as informações da nota de empenho, tais como: nº do empenho, programa, fonte de
      recurso, processo licitatório, modalidade, contrato, valor empenhado, liquidado, pago, retido, itens do empenho
      (descrição, valor unitário, quantidade, total) e documento fiscal (tipo, número, data de emissão e data de
      pagamento).

- [ ] **15.** Possuir uma seção específica que permita a exibição das licitações realizadas pela entidade, com as
      etapas do processo, as modalidades, empresas participantes e vencedoras, mercadorias com suas respectivas
      quantidades e cotações de cada participante, além dos responsáveis legais das empresas e a relação dos
      fornecedores impedidos de licitar. Possibilitar também a publicação dos documentos legais tais como editais,
      avisos retificações e toda a documentação vinculada ao certame.

- [ ] **16.** Possuir uma seção específica que permite a exibição de todos os itens contratuais dos seus fornecedores
      de bens e serviços contratados pela entidade. Permitir também a publicação do contrato, na sua íntegra, para a
      visualização completa do documento bem como aditivos e outros possíveis documentos adicionais, possibilitando
      também o download dos mesmos.

- [ ] **17.** Exibir informações detalhadas sobre os convênios, tais como: número, valor, data de assinatura, objeto,
      documentos e textos, participantes.

- [ ] **18.** Possuir uma seção específica que apresente a relação dos cargos e salários dos servidores da entidade,
      os valores calculados da folha de pagamento separando-os por entidade, secretaria, organograma, lotação e
      classificação, conforme seus respectivos planos de carreira.

- [ ] **19.** Disponibilizar acesso público a todos os atos da administração pública, tais como, portarias, leis,
      decretos, licitações, contratos, aditivos, convênios, resoluções, etc.

- [ ] **20.** Permitir a recepção e exibição das licitações com a situação suspenso.

- [ ] **21.** Possuir uma seção específica para exibição dos relatórios de Gestão Fiscal e o Relatório Resumido da
      Execução Orçamentária, ambos compostos de uma série de demonstrativos contábeis, publicados em bases mensais,
      bimestrais, quadrimestrais, semestrais e anuais, conforme princípio constitucional da publicidade, a Lei de
      Responsabilidade Fiscal (LRF) e a Lei nº 9.755/98.

- [ ] **22.** Possuir uma seção específica de acesso à informação que possibilite ao cidadão efetuar questionamentos
      através de um canal direto com a entidade. Esta solicitação deve ser digital, gerando número de protocolo e
      possibilitando uma futura consulta sobre o status do pedido de informação, sempre respeitando prazos e normas
      estabelecidas pela Lei de acesso à informação.

- [ ] **23.** Possuir uma seção específica de acesso à informação que possibilite consultar um relatório com
      estatísticas dos pedidos de informação solicitados, os atendidos, prorrogados, deferidos e indeferidos, conforme
      preconiza a Lei de acesso à informação.

- [ ] **24.** Permitir que as informações consultadas pelo cidadão possam ser exportadas em diferentes formatos como
      PDF, ODT, ODS e CSV, conforme os filtros disponibilizados nas consultas do sistema.

- [ ] **25.** Permitir consultar tributos arrecadados, receitas orçamentárias e receitas extraorçamentárias.

- [ ] **26.** Permitir consultar empenhos emitidos, empenhos liquidados e pagamentos efetuados.

- [ ] **27.** Possibilitar a inserção dos dados e consulta da relação de veículos de Frotas.

- [ ] **28.** Permitir a inserção dos dados e consultas referente dos comprovantes fiscais.

- [ ] **29.** Disponibilizar consulta padrão dos temas: notas fiscais, cargos e vencimentos e adiantamentos, ordem
      cronológica de pagamentos, folha de pagamento, servidores cedidos e recebidos, servidores públicos ativos,
      servidores e remunerações, servidores públicos, cargos e vencimentos, estagiários, servidores públicos ativos de
      educação, servidores e remunerações de educação.

- [ ] **30.** Permitir a pesquisa de conteúdo do portal, direcionado às consultas através dos resultados apresentados.

- [ ] **31.** Permitir consultar relatórios legais, gerados com base nos dados inseridos nos correspondentes sistemas
      de gestão.

- [ ] **32.** Permitir acesso às informações de forma consolidada e por Entidade gestora municipal.

- [ ] **33.** Permitir a busca por palavras-chave e redirecionamento às consultas e funcionalidades através dos
      resultados apresentados.

- [ ] **34.** Permitir a inclusão e consultas dos dados das Compras Diretas.

- [ ] **35.** Permitir a consulta padrão do tema Relatórios da Lei 4.320/64 e da LRF.

- [ ] **36.** Permitir que nas consultas de informações disponibilizadas seja possível efetuar filtros por data
      (período), entidade e demais filtros pertinentes a cada consulta.

- [ ] **37.** Permitir a personalização da exibição de máscaras de CPF's e CNPJ's no portal.

- [ ] **38.** Propiciar a definição da obrigatoriedade no preenchimento de dados pessoais no formulário de cadastro de
      pedidos de acesso à informação, como Nome, CPF, CNPJ e e-mail;

- [ ] **39.** Propiciar configuração para interposição de recurso com a definição da quantidade de dias para que o
      cidadão entre com o recurso e a quantidade de dias para atendimento do recurso, com opção de interposição de
      recursos apenas para solicitações indeferidas, ou para deferidas e indeferidas;

- [ ] **40.** Propiciar o cadastro de local para atendimento presencial, com informações do endereço, responsável,
      endereço, telefone e horário de atendimento;

- [ ] **41.** Propiciar o cadastro de motivos de indeferimento de pedidos de acesso à informação, conforme necessidade
      da entidade, com opção de desativá-lo a qualquer momento;

- [ ] **42.** Possuir um ambiente administrador para criar, editar, configurar gerir e disponibilizar: entidades,
      consultas, campos, brasões/logos, cores, e parametrizações relacionadas às rotinas dos sistemas estruturantes
      que enviam dados ao Portal da Transparência

- [ ] **43.** Gerir as cargas de dados recepcionadas pelo Portal da Transparência e verificar seus status

- [ ] **44.** Permitir inserir novos menus pelo administrador do Transparência como Mural de Avisos.

- [ ] **45.** Propiciar o cadastro da estrutura organizacional da entidade, informando a descrição, as atribuições, o
      endereço, e-mail, telefone, horário de atendimento, o nome e o cargo do responsável, com possibilidade de anexar
      o organograma.

- [ ] **46.** Possuir recurso para converter os textos dispostos na página do Portal da Transparência em voz, visando
      auxiliar pessoas com deficiência visual ou com dificuldade de leitura, na compreensão das informações;

- [ ] **47.** Possibilitar a inserção de gráficos nas consultas visando facilitar a compreensão das informações

- [ ] **48.** Possui espaço para que o cidadão expresse sua opinião em relação ao Portal da Transparência, onde seja
      opcional a identificação;

- [ ] **49.** Possuir seção de perguntas frequentes para auxiliar os cidadãos nos esclarecimentos de dúvidas comuns
      relacionadas ao Acesso à Informação, com possibilidade de editar, excluir, publicar, despublicar ou adicionar
      novas perguntas a qualquer momento;

- [ ] **50.** Possui link de acesso à página do Radar da Transparência, referente ao Programa Nacional de
      Transparência Pública;

- [ ] **51.** Possuir botões de atalho para funcionalidades do Portal da Transparência, com opções de menu, busca e
      rodapé;

- [ ] **52.** Possuir acesso a Mapa de Obras demonstrando em um mapa virtual de todas as obras do município.

- [ ] **53.** Possibilitar visualizar no Mapa de Obras virtual as informações detalhadas das obras como Descrição,
      Valores, Licitação, Contrato, Despesa, Empenho, Medição e Responsável.

- [ ] **54.** Possibilitar também no Mapa de Obras virtual visualizar as imagens das obras do município.

## Item 52 - Software de Contracheque On-line para a Câmara de Vereadores

*Fonte: Anexo I, páginas 193-194/194.*

- [ ] **1.** Dispor de um portal de acesso exclusivo ao servidor público.

- [ ] **2.** Permitir que o servidor público via internet, tenha acesso às suas informações cadastrais.

- [ ] **3.** Possibilitar que o servidor público via internet, por meio de sua matrícula e entidade possa efetuar
      solicitações de cursos de aperfeiçoamento, graduações, palestras, seminários, treinamentos e workshop.

- [ ] **4.** Possibilitar que o servidor público via internet, por meio de sua matrícula e entidade, possa consultar e
      emitir os recibos referentes aos pagamentos efetuados por meio da folha de pagamento.

- [ ] **5.** Possibilitar que o servidor público via internet, possa consultar as informações que comprovem o
      rendimento e retenção de seu IRRF.

- [ ] **6.** Possibilitar que o servidor público via internet, possa visualizar todo o seu histórico financeiro.

- [ ] **7.** Possibilitar aos usuários administrativos a visualização dos status das solicitações cadastradas pelos
      servidores públicos por meio do portal.

- [ ] **8.** Possibilitar aos usuários com permissão, em um único ambiente, aprovar ou reprovar as solicitações
      realizadas pelos servidores.

- [ ] **9.** Possibilitar aos usuários com perfil administrador:
  - [ ] **9.1.** Adicionar e conceder permissões por funcionalidades para usuários e grupos de usuários.
  - [ ] **9.2.** Criar usuário e senha automaticamente de forma individual ou em lote.
  - [ ] **9.3.** Personalizar o formato do usuário e senha.
  - [ ] **9.4.** Alterar a senha dos usuários adicionados a partir do sistema.

- [ ] **10.** Permitir que o servidor realize solicitações, possibilitando que o mesmo acompanhe os trâmites
      realizados pelos usuários administradores, visualizando o status de suas solicitações.

- [ ] **11.** Permitir emissão de relatório de recibo de pagamento, customizados conforme o modelo de relatório
      desejado.

- [ ] **12.** Permitir a identificação, pelos usuários administradores, dos recibos integrados.

- [ ] **13.** Dispor de ficha funcional da matrícula do servidor, contendo os principais dados pessoais e contratuais,
      possibilitando a navegação entre as matrículas, caso o servidor possua mais de um contrato na entidade.

- [ ] **14.** Permitir a alteração dos dados pessoais pelo servidor, visando o recadastramento ou correção de dados,
      onde as informações alteradas serão exibidas como solicitações que dependerão da aprovação pelos usuários
      administradores. Após aprovadas, as alterações cadastrais deverão ser formalizadas de forma automática no
      sistema de gestão do RH.

- [ ] **15.** Possibilitar a realização de conferência de vídeo com solicitante, a partir de uma solicitação
      aguardando aprovação, permitindo ainda ao responsável, enviar SMS como forma de aviso ao solicitante.

- [ ] **16.** Permitir ao servidor a solicitação de benefícios, que serão avaliadas pelo responsável do setor pessoal
      ou pelo administrador do sistema que ficará incumbido de analisar e deferir as solicitações.

- [ ] **17.** Permitir ao servidor consultar e emitir sua ficha financeira de determinado exercício, detalhando as
      bases de cálculo.

- [ ] **18.** Permitir a emissão do comprovante de rendimentos, contendo os valores de IRRF, para utilização na
      declaração do imposto de renda.

- [ ] **19.** Permitir o acesso de servidores e estagiários, possibilitando a seleção de matrículas e contratos ativos
      ou não.

- [ ] **20.** Permitir a consulta e emissão dos recibos de pagamento das matrículas ativas e demitidas. Os recibos de
      pagamentos poderão ser visualizados pela forma mensal, férias, 13º salário e rescisão.

- [ ] **21.** Permitir ao usuário solicitar a alteração de marcação de ponto via sistema. As solicitações serão
      avaliadas pelo usuário aprovador, que pode aprovar ou reprovar as solicitações de inclusão, alteração ou
      exclusão de marcações de ponto.

- [ ] **22.** Permitir ao servidor a solicitação de licenças-prêmio, licença sem vencimento, licença maternidade,
      licença adoção e licença casamento. As solicitações de licença devem aguardar a validação do responsável
      informado ou pelo administrador do sistema, para analisar e deferir ou indeferir as solicitações.

- [ ] **23.** Permitir ao servidor a consulta e emissão dos registros de marcações de ponto.

- [ ] **24.** Permitir ao servidor, realizar a solicitação de folga para desconto em folha ou folga para compensação
      de horas extras, possibilitando a validação do responsável, podendo deferir ou indeferir a solicitação.

- [ ] **25.** Possibilitar ao servidor realizar a solicitação de férias, com envio ao departamento de recursos humanos
      que deverá realizar a análise do pedido e a programação de férias a partir do requerimento efetuado.

- [ ] **26.** Permitir ao servidor solicitar adiantamento salarial ou adiantamento 13º salário, que serão validadas
      pelo responsável, podendo deferir ou indeferir as solicitações.

- [ ] **27.** Permitir a impressão em documento no formato PDF dos dados de usuário e senha dos servidores criados a
      partir do sistema.

- [ ] **28.** Permitir o envio da Declaração Anual Bens do Servidor.

- [ ] **29.** Permitir a criação de um novo endereço durante a solicitação de alteração cadastral.

---

## C. Itens do lote que não trazem funcionalidades de sistema para demonstração

Os itens abaixo integram o objeto, mas o Anexo I os descreve como consultoria ou horas técnicas, e não como funcionalidades de software. Por isso, não foram misturados ao checklist funcional acima.

### Item 4 - Serviço Mensal de Consultoria nas Prestações de Contas do MGS, SIOPS e SIOPE

*Fonte: Anexo I, página 18/194.*

O item traz as seguintes obrigações operacionais do serviço:

- [ ] **9.1.** A Contratada deverá prestar consultoria à Contratante na realização das prestações de contas mensais
      relativas ao MGS, SIOPS e SIOPE, cujo valor deverá estar precificado na proposta.

- [ ] **9.2.** Atividades a serem desenvolvidas: Análise das inconsistências, ajuste das informações necessárias,
      transmissão dos dados aos órgãos competentes, orientações e acompanhamento de envios de informações e entregas
      de prestações de contas.

- [ ] **9.3.** Deverão ser observados os seguintes prazos: Contábil, Saúde e Educação: Prestação de Contas MGS:
      Periodicidade Quadrimestral; Prazo de 30 dias após o término do período. Prestação de Contas SIOPS:
      Periodicidade Bimestral; Prazo de 30 dias após o término do período. Prestação de Contas SIOPE: Periodicidade
      Bimestral; Prazo de 30 dias após o término do período.

- [ ] **9.4.** Não estão previstos ajustes como inclusão de CPF, data de nascimento e dados de dependentes, entre
      outros.

- [ ] **9.5.** Na ausência de endereços, será definido um padrão junto ao responsável da entidade e sendo aplicado
      para todos os casos.

- [ ] **9.6.** Na falta de dados de dependentes, estes serão desvinculados do cadastro.

- [ ] **9.7.** É necessário disponibilizar o acesso remoto à máquina que contém o certificado digital com acesso ao
      GOVBR.

- [ ] **9.8.** O atendimento será prestado dentro do horário de expediente da Contratada.

- [ ] **9.9.** A Contratante terá o prazo máximo de 15 (quinze) dias corridos para contestações após a entrega do
      serviço.

- **Item 41 - Horas Trabalhadas por Técnicos, para ASSISTÊNCIA de forma REMOTA:** o Anexo I não apresenta requisitos funcionais individualizados para este item; apenas a descrição da quantidade/modalidade de horas técnicas.
- **Item 42 - Hora Técnica Trabalhada por Técnico, IN LOCO, na Sede da Prefeitura, para Suporte, Atendimento Técnico e Treinamento:** o Anexo I não apresenta requisitos funcionais individualizados para este item; apenas a descrição da quantidade/modalidade de horas técnicas.
- **Item 53 - Horas Trabalhadas por Técnicos, para ASSISTÊNCIA de forma REMOTA, para a Câmara de Vereadores:** o Anexo I não apresenta requisitos funcionais individualizados para este item; apenas a descrição da quantidade/modalidade de horas técnicas.
- **Item 54 - Hora Trabalhada por Técnico, IN LOCO, na Sede da Câmara de Vereadores, para Suporte, Atendimento Técnico e Treinamento:** o Anexo I não apresenta requisitos funcionais individualizados para este item; apenas a descrição da quantidade/modalidade de horas técnicas.

---

*Documento de trabalho elaborado exclusivamente a partir do Edital e anexos fornecidos para o Pregão Eletrônico nº 27/2026 de Pinhal da Serra/RS.*