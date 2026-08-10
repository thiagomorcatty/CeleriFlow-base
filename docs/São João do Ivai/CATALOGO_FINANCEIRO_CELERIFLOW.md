# CeleriFlow - Catálogo Financeiro e Contábil

## 1. Apresentação

O CeleriFlow apoia o ciclo financeiro da gestão pública, conectando planejamento, orçamento, despesa, receita, tesouraria, bancos, conciliação, contabilidade, documentos e auditoria.

Este catálogo é destinado a apresentações do módulo Financeiro e Contábil. Para uma visão de todos os módulos da solução, consultar `CATALOGO_COMPLETO_CELERIFLOW.md`.

### Escopo

- Planejamento e orçamento.
- Execução da despesa.
- Receitas e regras constitucionais.
- Tesouraria, contas bancárias e extratos.
- Aplicações, resgates e rendimentos.
- Conciliação bancária.
- Contabilidade, fechamento e relatórios internos.
- Administração, Tributação, GED e Configurações como apoio ao ciclo financeiro.

### Mensagem central

O CeleriFlow organiza os fatos financeiros em fluxos rastreáveis, associando usuários, unidades gestoras, documentos, contas bancárias, eventos contábeis e registros de auditoria.

> **Nota de apresentação:** em ambientes de POC, a integração bancária pode operar com banco virtual ou sandbox. Registros produzidos na demonstração são persistidos na instância, mas a integração não deve ser apresentada como homologada com instituição financeira oficial sem a configuração e homologação aplicáveis.

<!-- IMAGEM SUGERIDA: diagrama do ciclo financeiro, ligando Planejamento, Despesa, Receita, Tesouraria, Contabilidade, GED e Auditoria. -->

---

## 2. Estrutura do Ciclo Financeiro

| Etapa | Finalidade |
|---|---|
| Planejamento | Organiza referências de PPA, LDO, LOA, dotações, reservas e programação financeira. |
| Despesa | Registra solicitações, empenhos, liquidações, pagamentos, retenções, recolhimentos e restos a pagar. |
| Receita | Controla lançamentos, arrecadações, estornos, redistribuições e classificações constitucionais. |
| Tesouraria | Mantém contas, saldos, transferências, extratos, aplicações, resgates e rendimentos. |
| Conciliação | Compara extrato bancário e registros internos, trata divergências e formaliza a confirmação. |
| Contabilidade | Relaciona eventos contábeis, partidas, razão, balancete e fechamentos. |
| Evidências | Vincula documentos, recibos, arquivos de extrato, hashes e trilhas de auditoria aos fatos. |

### Princípios de controle

- Os acessos são definidos por usuário, perfil, módulo e unidade gestora autorizada.
- As contas bancárias mantêm vínculo com unidade gestora, fonte de recurso, conta analítica e finalidade.
- Operações críticas podem manter histórico, responsável, data/hora, documentos e evidências de integridade.
- Arquivos bancários são tratados como documentos privados, com acesso protegido.
- Integrações são configuradas por ambiente e referência segura de credencial, sem expor segredos em tela.

---

## 3. Planejamento e Orçamento

### Funcionalidades

- Planejamento orçamentário com referências a PPA, LDO e LOA.
- Cadastros orçamentários de apoio.
- Dotações orçamentárias.
- Reservas orçamentárias.
- Solicitações de despesa e acompanhamento do fluxo.
- Créditos adicionais.
- Programação financeira.

### Valor operacional

- Organiza a previsão antes da execução da despesa.
- Mantém a referência entre demanda, dotação e disponibilidade orçamentária.
- Apoia o acompanhamento gerencial da programação financeira.

<!-- IMAGEM SUGERIDA: Planejamento Orçamentário com exercício, dotação, saldo e programação. -->

---

## 4. Execução da Despesa

### Funcionalidades

- Emissão e acompanhamento de empenhos.
- Liquidações com documentos de suporte.
- Pagamentos vinculados às liquidações e às contas bancárias.
- Retenções e recolhimentos.
- Estornos conforme as regras do fluxo.
- Gestão de restos a pagar.
- Documentos financeiros internos vinculados aos registros da execução.

### Rastreabilidade

O fluxo permite relacionar a despesa a elementos como solicitante, credor, dotação, unidade gestora, documentos, pagamento e registros de auditoria, conforme a configuração e as permissões vigentes.

<!-- IMAGEM SUGERIDA: sequência visual Solicitação, Empenho, Liquidação e Pagamento. -->

---

## 5. Receitas e Regras Constitucionais

### Funcionalidades de receita

- Lançamento e arrecadação de receitas.
- Estorno de receita.
- Redistribuição por fonte de recurso.
- Consulta de pendências de classificação.
- Vínculo de receita com movimento de tesouraria, evento contábil, recibo e auditoria.

### Regras constitucionais e legais

- Cadastro de regras de classificação de receitas.
- Associação de natureza, fonte de recurso e conta bancária vinculada.
- Identificação de registros pendentes ou com exceção de classificação.
- Apoio à segregação de recursos por finalidade e regra configurada.

### Relação com Tributação

O módulo Tributação pode organizar cadastros, guias, arrecadações e eventos fiscais que subsidiam a receita financeira. A transmissão de guias, PIX, boletos ou documentos fiscais a serviços externos depende de integração homologada.

<!-- IMAGEM SUGERIDA: tela de Receitas Constitucionais com regra, conta vinculada, fonte e situação. -->

---

## 6. Contas Bancárias e Tesouraria

### Cadastro de contas

- Banco, agência e número de conta.
- Tipo de conta.
- Unidade gestora.
- Fonte de recurso.
- Conta analítica.
- Finalidade operacional.

### Finalidade operacional

A coluna **Finalidade** permite identificar o propósito de cada conta, como arrecadação, recursos livres, educação, saúde, assistência social, cultura, convênios ou aplicações. Essa identificação facilita a segregação e a leitura gerencial da tesouraria.

### Operações de tesouraria

- Saldos derivados de movimentos de tesouraria confirmados.
- Registro de saldos iniciais auditáveis quando aplicável.
- Transferências entre contas com movimentos de origem e destino.
- Consulta de movimentação financeira por conta e período.

<!-- IMAGEM SUGERIDA: Contas Bancárias destacando banco, unidade gestora, fonte e Finalidade. -->

---

## 7. Extratos e Automações Bancárias

### Funcionalidades

- Solicitação de download de extrato por conta e período.
- Arquivamento privado do arquivo obtido.
- Registro de formato, período, hash de integridade e solicitante.
- Identificação de itens de extrato e deduplicação por identificador externo.
- Histórico de execução, sucesso, falha e reprocessamento controlado.
- Monitoramento de automações financeiras.

### Ambientes

| Ambiente | Uso |
|---|---|
| Mock | Testes sem conexão com serviço externo. |
| Sandbox | Demonstração controlada com dados simulados. |
| Homologação | Teste conjunto com o fornecedor da integração. |
| Produção | Operação configurada e homologada pela instituição. |

### Cuidados de comunicação

- Não exibir arquivos de extrato reais em vídeos ou capturas de tela.
- Não expor URL privada, token, certificado, chave ou referência de credencial.
- Não afirmar que uma execução mock realizou conexão externa.

<!-- IMAGEM SUGERIDA: Download de Extratos e Monitoramento de Automações com status e dados fictícios. -->

---

## 8. Aplicações, Resgates e Rendimentos

### Aplicações e resgates

- Identificação de aplicações e resgates a partir dos itens bancários.
- Cálculo de valor bruto, encargos e valor líquido.
- Prévia contábil da operação.
- Transferências pareadas entre conta corrente e conta de aplicação.
- Emissão de recibo e vínculo ao lançamento bancário.
- Controle de duplicidade por item bancário e chave de idempotência.

### Rendimentos

- Registro de rendimentos financeiros.
- Cálculo de IRRF, IOF, correção e saldo acumulado conforme o registro.
- Vínculo de rendimentos a conta, extrato e evento de tesouraria.

<!-- IMAGEM SUGERIDA: Resgates e Aplicações com composição de valores e tela de Rendimentos. -->

---

## 9. Conciliação Bancária

### Funcionalidades

- Abertura de sessão por banco, agência, conta e período.
- Carga de saldo inicial, créditos, débitos, saldo final e razão bancário.
- Correspondência automática entre itens bancários e registros internos.
- Conferência de itens pendentes.
- Identificação de divergências.
- Bloqueio de confirmação enquanto existirem pendências ou diferenças.
- Confirmação com recibo, hash e trilha de auditoria.

### Valor operacional

A conciliação oferece um ponto formal de conferência entre o extrato bancário e os registros internos, registrando o resultado e as pendências que impedem a confirmação do período.

<!-- IMAGEM SUGERIDA: sessão de Conciliação Bancária com saldos, correspondências, divergências e status. -->

---

## 10. Contabilidade e Fechamento

### Funcionalidades

- Plano de contas.
- Eventos de contabilização.
- Partidas contábeis relacionadas aos fatos financeiros configurados.
- Rotinas de fechamento mensal e anual.
- Controle de período, situação e evidência de fechamento.
- Consulta de diário, razão e balancete.

### Relatórios internos

- Relatórios de tesouraria.
- Relatórios de conciliação.
- Diário, razão e balancete.
- Exportações em CSV e PDF conforme a funcionalidade.

> **Limite de comunicação:** relatórios internos não devem ser apresentados como leiautes oficiais homologados de TCE, STN, SICONFI ou outro órgão de controle sem validação específica do leiaute e do processo de entrega aplicável.

<!-- IMAGEM SUGERIDA: Contabilidade, eventos e Fechamento mensal; em seguida, catálogo de Relatórios Financeiros. -->

---

## 11. Módulos de Apoio ao Financeiro

### Administração Geral

- Mantém dados institucionais, secretarias, departamentos, unidades administrativas, cargos e servidores.
- Apoia a organização de responsáveis, setores demandantes e estrutura de trabalho usada nos fluxos financeiros.

### Cadastros

- Centraliza pessoas físicas, pessoas jurídicas, fornecedores, imóveis e documentos vinculados.
- Fornecedores e referências cadastrais podem apoiar a execução da despesa e os processos de compra.

### Compras, Licitações e Contratos

- Organiza solicitações, processos de aquisição, licitações, dispensas, contratos e catálogo de itens e serviços.
- Pode fornecer referências documentais e processuais para o ciclo da despesa.

### Tributação

- Reúne cadastros econômicos e imobiliários, alvarás, NFS-e, guias, dívida ativa, certidões e fiscalização.
- Apoia a origem e o acompanhamento de informações relacionadas à receita municipal.

### GED e Documentos

- Organiza documentos em pastas e modelos.
- Permite vincular arquivos a processos, solicitações, empenhos, liquidações e demais registros.
- Oferece assinatura eletrônica interna com reautenticação, hash de integridade, código de verificação e bloqueio da versão assinada.

> **Nota de comunicação:** assinatura interna não deve ser apresentada como assinatura ICP-Brasil. A assinatura com certificado A1 depende de cadeia, certificado e chave configurados fora do código-fonte e da instância.

### Configurações, Perfis e Auditoria

- Ativação de módulos por instância.
- Cadastro de perfis e permissões.
- Cadastro de usuários e vínculos com unidades gestoras.
- Configuração de workflows e conexões externas.
- Consulta de auditoria por usuário, data/hora, rota, ação e resultado, conforme a permissão do perfil.

---

## 12. Segurança Financeira

### Controles aplicáveis

- Login individual e sessão autenticada.
- Rotas financeiras protegidas no servidor.
- Permissões por perfil, módulo e unidade gestora.
- Bloqueio de acesso a módulos inativos.
- Histórico de login, navegação, interação, download e exportação.
- Proteção de arquivos e documentos relacionados a extratos.
- Registro de responsáveis e evidências nos fluxos que exigem conferência.

### Perfis de referência

| Perfil | Responsabilidade típica |
|---|---|
| Gestor Financeiro | Acompanha planejamento, execução, tesouraria e relatórios. |
| Tesouraria | Opera contas, extratos, transferências, aplicações, rendimentos e conciliações. |
| Contabilidade | Atua em eventos, partidas, fechamentos, razão e balancete. |
| Operador de Receita | Registra receitas, arrecadações e regras de classificação. |
| Administrador da Instância | Configura perfis, usuários, módulos, integrações e auditoria. |
| Auditor ou Controle Interno | Consulta evidências e relatórios conforme escopo autorizado. |

### Segregação recomendada

- Separar solicitação, aprovação, contabilização e execução de pagamento quando o fluxo exigir.
- Restringir alterações de integrações e configurações a administradores autorizados.
- Limitar a auditoria ampla a perfis formalmente autorizados.
- Utilizar usuários individuais, nunca contas compartilhadas.

<!-- IMAGEM SUGERIDA: Perfil de Acesso com permissões financeiras e Auditoria de Uso, sem dados pessoais. -->

---

## 13. Roteiro de Demonstração Financeira

1. Abrir o Dashboard e contextualizar o módulo Financeiro e Contábil.
2. Demonstrar Planejamento e Dotações.
3. Exibir a cadeia de execução: empenho, liquidação e pagamento.
4. Apresentar Receitas e Regras Constitucionais.
5. Abrir Contas Bancárias e explicar unidade gestora, fonte e finalidade.
6. Demonstrar extratos e o monitoramento de automações no ambiente autorizado.
7. Apresentar aplicações, resgates e rendimentos.
8. Demonstrar uma sessão de conciliação bancária.
9. Mostrar eventos contábeis, fechamento e relatórios internos.
10. Encerrar em Configurações, Perfis e Auditoria para evidenciar governança.

### Checklist de apresentação

- [ ] Perfil demonstrador possui acesso aos módulos necessários.
- [ ] Dados usados são fictícios ou anonimizados.
- [ ] Contas bancárias, fontes e finalidades estão coerentes com o cenário demonstrado.
- [ ] Integração está identificada como mock, sandbox, homologação ou produção.
- [ ] Nenhuma credencial, senha, token, chave ou URL privada será exposta.
- [ ] Relatórios são identificados como internos quando não houver homologação oficial declarada.
- [ ] Capturas de tela seguem a ordem do roteiro.

---

## 14. Declaração de Escopo

> O CeleriFlow disponibiliza recursos para gestão financeira e contábil municipal. A disponibilidade de cada funcionalidade depende da contratação, ativação do módulo, configuração da instância, permissões do usuário e, para integrações externas, da homologação técnica e institucional aplicável. Dados, indicadores e integrações exibidos em ambiente de demonstração devem ser considerados ilustrativos quando não houver comprovação de operação em produção.
