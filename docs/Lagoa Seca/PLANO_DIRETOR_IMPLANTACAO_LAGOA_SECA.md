# Plano Diretor de Implantação — CeleriFlow em Lagoa Seca/PB

**Processo:** Pregão Eletrônico nº 00042/2026 — Processo Administrativo 260702PE00042
**Órgão:** Prefeitura Municipal de Lagoa Seca/PB
**Objeto:** Locação de software de Contabilidade Pública e Portal da Transparência
**Produto:** CeleriFlow — Robonuvem Soluções Digitais Ltda.
**Versão do documento:** 1.0
**Data:** 31 de julho de 2026

---

## 1. Identificação do Contrato

| Campo | Definição |
|---|---|
| **Objeto** | Contabilidade Pública e Portal da Transparência |
| **Órgão responsável** | Prefeitura Municipal de Lagoa Seca/PB |
| **Patrocinador municipal** | Secretário(a) de Administração ou autoridade indicada pela Prefeitura |
| **Gestor do contrato** | A ser nomeado pela Prefeitura (servidor designado em portaria) |
| **Fiscal técnico** | Responsável pela validação funcional do sistema, indicado pela Prefeitura |
| **Responsável Robonuvem** | Gerente de Implantação designado pela Robonuvem |
| **Responsável contábil** | Contador(a) público(a) responsável pela contabilidade municipal |
| **Unidades gestoras** | A serem identificadas no levantamento inicial (mín. 2: Administração Direta e Câmara) |
| **Exercício inicial** | A ser definido com a Prefeitura (exercício da entrada em produção) |
| **Data de referência** | Data até a qual os dados permanecerão exclusivamente no sistema anterior |
| **Estratégia de virada** | Por competência (fechar mês no sistema anterior → abrir competência seguinte no CeleriFlow) |
| **Operação assistida** | Período mínimo conforme edital; disponibilidade intensiva nos primeiros 15 dias úteis |
| **Critério de encerramento** | Aceite formal por área, reconciliação completa de saldos e ausência de incidentes críticos em aberto |

---

## 2. Objetivo

Implantar o CeleriFlow na Prefeitura Municipal de Lagoa Seca/PB como sistema de **Contabilidade Pública e Portal da Transparência**, cobrindo de ponta a ponta:

```
PPA → LDO → LOA → crédito adicional
→ solicitação → aprovação → reserva → empenho
→ liquidação → retenções → pagamento → estorno
→ caixa, bancos e conciliação
→ contabilidade pública e patrimônio
→ relatórios legais, TCE-PB e SICONFI
→ Portal da Transparência público e dados abertos
```

O objetivo é um **software funcional em produção**, não ambiente de testes. A POC utiliza a mesma aplicação que será implantada, sem telas ou caminhos exclusivos para demonstração.

---

## 3. Escopo

### 3.1 Três trabalhos distintos

Este plano separa explicitamente três frentes de trabalho que ocorrem em paralelo mas têm entregas, responsáveis e critérios de aceite diferentes:

| Frente | O que é | Quem executa | Resultado |
|---|---|---|---|
| **Adequação do produto** | Desenvolver no CeleriFlow o que ainda não existe para atender 100% dos requisitos do PE042 | Engenharia Robonuvem | Software funcional com todas as operações, relatórios e integrações exigidos |
| **Preparação para a POC** | Montar base modelo, evidências, roteiro de demonstração e simulação das 3 reuniões | Produto + Engenharia + Contador | Base modelo reproduzível, matriz de evidências preenchida, simulação aprovada |
| **Implantação contratual** | Parametrizar Lagoa Seca, migrar dados reais, treinar usuários, executar virada e operar assistidamente | Robonuvem + Prefeitura | Sistema em produção com saldos reconciliados, usuários operando e portal público |

> [!IMPORTANT]
> A POC deve usar a mesma aplicação que será implantada. Nenhuma tela, rota, ação ou dado pode existir exclusivamente para demonstração. Se funciona na POC, funciona em produção. Se não funciona em produção, não pode ser demonstrado na POC.

### 3.2 Módulos no escopo

- Planejamento orçamentário (PPA, LDO, LOA, CMD, MBA)
- Alterações orçamentárias e créditos adicionais
- Execução orçamentária da despesa (solicitação → pagamento → estorno)
- Receita orçamentária e extraorçamentária
- Motor de retenções e recolhimento
- Tesouraria, caixa, bancos e conciliação
- Contabilidade pública (PCASP, MCASP, NBCASP, partidas dobradas)
- Patrimônio (bens, depreciação, alienação, impairment)
- Estoque e almoxarifado
- Dívida ativa e dívida consolidada
- Licitações, contratos e execução financeira integrada
- Protocolo integrado à contabilidade
- Relatórios legais (Diário, Razão, Balancetes, RREO, RGF, PCA, Balanço)
- Integrações governamentais (TCE-PB, SICONFI, eSocial, EFD-Reinf, DIRF, SEFIP)
- Captura de documentos fiscais (NFe, CTe, NFSe)
- Assinatura digital ICP-Brasil
- Portal da Transparência Fiscal público (receitas, despesas, API, dados abertos)
- Help Desk / Service Desk
- Segurança, auditoria e controle de acesso

### 3.3 Exclusões e premissas

**Exclusões:**
- Módulos não previstos no PE042 (Saúde, Educação, Assistência Social, RH/Folha plena, Tributação municipal plena, Frotas)
- Fornecimento de hardware, certificados digitais ou infraestrutura de rede da Prefeitura
- Desenvolvimento de integrações com sistemas de terceiros não previstos no TR

**Premissas:**
- A Prefeitura fornecerá dados, documentos, layouts e acessos necessários nos prazos acordados
- O contador público participará ativamente das validações contábeis
- A Prefeitura indicará os responsáveis nomeados antes do início da Onda 0
- Os layouts vigentes do TCE-PB (SAGRES) e SICONFI serão obtidos antes da Sprint 6 de adequação
- O certificado digital e-CNPJ A1 será providenciado pela Prefeitura para integrações fiscais

---

## 4. Exclusões e Premissas Detalhadas

### Premissas da Prefeitura

| Premissa | Prazo esperado |
|---|---|
| Indicar patrocinador, gestor do contrato, fiscal técnico e responsáveis por área | Até a reunião de abertura |
| Fornecer organograma, estrutura de unidades gestoras e centros de custo | Até 10 dias após abertura |
| Fornecer PPA, LDO, LOA vigentes e alterações orçamentárias já realizadas | Até 10 dias após abertura |
| Fornecer plano de contas, saldos contábeis e balancetes do exercício anterior | Até 15 dias após abertura |
| Fornecer dados bancários, extratos, convênios CNAB e layouts de retorno | Até 15 dias após abertura |
| Fornecer inventário de bens, estoques e dívidas | Até 20 dias após abertura |
| Fornecer contratos vigentes, licitações ativas e fornecedores | Até 20 dias após abertura |
| Designar usuários para treinamento com disponibilidade de agenda | Até 5 dias antes de cada turma |
| Validar cada onda de implantação em até 5 dias úteis após entrega | Contínuo |
| Providenciar certificado digital e-CNPJ A1 para integrações | Até 10 dias antes da Onda 6 |

### Premissas da Robonuvem

| Premissa | Compromisso |
|---|---|
| Concluir adequação do produto antes da preparação para a POC | Conforme cronograma de sprints |
| Disponibilizar ambientes de homologação e treinamento antes da Onda 1 | Até 5 dias após abertura |
| Atribuir gerente de implantação dedicado durante todo o projeto | Da abertura ao encerramento |
| Manter canais de comunicação disponíveis em horário comercial | Segunda a sexta, 08h-18h |

---

## 5. Governança

### 5.1 Papéis e poderes de aprovação

| Papel | Responsabilidades | Poder de aprovação |
|---|---|---|
| **Patrocinador municipal** | Garante recursos, resolve impedimentos, arbitra conflitos | Aprova escopo, cronograma e virada |
| **Gestor do contrato** | Administra o contrato, recebe entregas, formaliza aceites | Assina termos de aceite parcial e final |
| **Fiscal técnico** | Valida funcionalidades, acompanha testes, verifica evidências | Emite parecer técnico sobre cada onda |
| **Contador público** | Valida PCASP, eventos, regras contábeis, relatórios e saldos | Aprova plano de contas, fechamento e migração contábil |
| **Tesoureiro** | Valida contas, fontes, pagamentos, conciliação | Aprova saldos bancários e regras financeiras |
| **Controle interno** | Audita segregação, acessos, integridade e conformidade | Aprova segregação de funções e política de publicação |
| **TI municipal** | Apoia infraestrutura, domínios, DNS, certificados | Apoia ambientes e integrações |
| **Gerente de Implantação Robonuvem** | Coordena equipe, cronograma, entregas e comunicação | Declara prontidão de cada onda |
| **Engenharia Robonuvem** | Desenvolve, configura, migra e testa | Executa e documenta |

### 5.2 Comitê de implantação

- **Composição:** Gerente Robonuvem + Gestor do contrato + Fiscal técnico + Contador
- **Frequência:** Semanal (reunião de status)
- **Atribuições:** Aprovar marcos, resolver pendências, decidir exceções de migração, priorizar incidentes

---

## 6. Matriz de Responsabilidades (RACI)

| Atividade | Robonuvem | Contador municipal | TI municipal | Tesouraria | Controle interno | Fiscal do contrato |
|---|---|---|---|---|---|---|
| Configuração dos ambientes | **Executa** | Consulta | Apoia | — | — | Acompanha |
| Plano de contas PCASP | **Configura** | **Aprova** | — | Consulta | Consulta | Valida evidência |
| Estrutura orçamentária (PPA/LDO/LOA) | **Configura** | **Valida** | — | Consulta | Consulta | Valida evidência |
| Perfis, usuários e segregação | **Configura** | Consulta | Apoia | Consulta | **Aprova** | Aceita |
| Migração contábil | **Executa** | **Valida saldos** | Fornece dados | Confere saldos financeiros | **Audita** | **Aceita** |
| Migração de contratos e licitações | **Executa** | Consulta | Fornece dados | — | Consulta | Valida |
| Migração patrimonial | **Executa** | **Valida** | Fornece dados | — | Consulta | Valida |
| Integração bancária (CNAB/OFX) | **Desenvolve/Configura** | Consulta | Apoia | **Aprova** | — | Acompanha |
| TCE-PB e SICONFI | **Implementa** | **Valida** | Apoia | — | Acompanha | **Aceita** |
| Portal da Transparência | **Implementa** | Valida valores | Apoia domínio/DNS | — | **Aprova publicação** | **Aceita** |
| Treinamento | **Ministra** | Participa | Participa | Participa | Participa | Registra presença |
| Testes de aceitação | **Coordena** | **Executa (contábil)** | Executa (infra) | **Executa (financeiro)** | **Executa (segurança)** | **Formaliza** |
| Virada para produção | **Coordena** | **Autoriza saldos** | Apoia | **Autoriza contas** | Acompanha | **Formaliza** |
| Operação assistida | **Executa** | Participa | Participa | Participa | Acompanha | Monitora |

> [!WARNING]
> Sem esta matriz formalizada, a implantação tende a parar porque a empresa aguarda uma informação e a Prefeitura entende que a obrigação era da contratada. Cada célula deve ser traduzida em **nome, prazo e canal**.

---

## 7. Ambientes

### 7.1 Desenvolvimento

| Atributo | Definição |
|---|---|
| **Finalidade** | Novas versões, correções, testes técnicos da Robonuvem |
| **Acesso** | Exclusivamente equipe de engenharia Robonuvem |
| **Dados** | Dados de teste sem informações reais da Prefeitura |
| **Restrição** | Não pode conter dados pessoais, CPFs, saldos ou documentos reais de Lagoa Seca |

### 7.2 Homologação

| Atributo | Definição |
|---|---|
| **Finalidade** | Reproduzir a configuração real de Lagoa Seca para validação |
| **Acesso** | Robonuvem + Contador + Fiscal técnico + Tesoureiro + Controle interno |
| **Dados** | Dados reais migrados da Prefeitura |
| **Conteúdo obrigatório** | Unidades gestoras, plano de contas, fontes, estrutura orçamentária, perfis, regras contábeis, relatórios, integrações e Portal da Transparência |
| **Uso principal** | O contador e os fiscais formalizam os aceites neste ambiente |

### 7.3 Treinamento

| Atributo | Definição |
|---|---|
| **Finalidade** | Capacitação dos usuários em ambiente seguro |
| **Acesso** | Todos os usuários em treinamento |
| **Dados** | Dados fictícios semelhantes aos reais |
| **Exercícios obrigatórios** | Abertura de crédito adicional, emissão de empenho, liquidação com retenção, pagamento e estorno, conciliação bancária, registro patrimonial, publicação no portal, geração de arquivo oficial |

### 7.4 Produção

| Atributo | Definição |
|---|---|
| **Finalidade** | Operação real da Prefeitura |
| **Liberação condicionada a** | Perfis aprovados pelo Controle Interno; saldos iniciais reconciliados pelo Contador; backup e restauração testados; usuários-chave treinados e aprovados; integrações críticas homologadas (TCE-PB, SICONFI, bancos); plano de reversão aprovado pelo Comitê |

---

## 8. Metodologia de Implantação

### 8.1 Princípio fundamental

Cada entrega segue o fluxo:

```
Entrada necessária (dados, documentos, decisões da Prefeitura)
→ Atividade (configuração, desenvolvimento, migração)
→ Responsável (quem executa, quem valida)
→ Ambiente (onde é feito)
→ Evidência (tela, relatório, log, documento gerado)
→ Validador (quem aceita)
→ Critério de aceite (condição objetiva e verificável)
→ Dependências (o que precisa estar pronto antes)
→ Risco (o que pode impedir)
→ Plano de reversão (como desfazer se necessário)
```

### 8.2 Regras invioláveis

1. Nenhum marco avança com pendência crítica no marco anterior.
2. O PE042 aceita somente `Atende` ou `Não atende` — cobertura parcial = desclassificação.
3. Toda operação financeira regulada deve ter permissão, auditoria e documento. Nunca tela estática.
4. A POC usa a mesma aplicação da produção. Nenhum dado, rota ou script pode existir somente para demonstração.
5. Correção, anulação, estorno e exclusão geram novos eventos auditáveis, sem apagar o original.
6. O Portal da Transparência lê uma projeção segura dos dados internos, nunca expõe o banco diretamente.

---

## 9. Ondas de Implantação

### Onda 0 — Governança e Infraestrutura

**Duração estimada:** 5 dias úteis
**Dependências:** Contrato assinado

#### Entregas

| Entrega | Responsável | Validador |
|---|---|---|
| Reunião de abertura com ata e lista de presença | Gerente Robonuvem | Gestor do contrato |
| Cronograma detalhado com marcos e datas | Gerente Robonuvem | Patrocinador |
| Nomeação formal de todos os responsáveis (nomes, cargos, contatos, poderes) | Prefeitura | Gestor do contrato |
| Ambientes de desenvolvimento, homologação e treinamento provisionados | Engenharia Robonuvem | Fiscal técnico |
| Política de acesso e credenciais de cada ambiente | Engenharia Robonuvem | TI municipal + Controle interno |
| Canais de suporte definidos (e-mail, telefone, WhatsApp, escalação) | Gerente Robonuvem | Gestor do contrato |
| Plano de comunicação (frequência de reuniões, relatório semanal, canal oficial) | Gerente Robonuvem | Gestor do contrato |
| Inventário de integrações (TCE-PB, SICONFI, bancos, certificados, notas fiscais) | Engenharia + TI municipal | Fiscal técnico |
| Estratégia de migração aprovada | Gerente Robonuvem | Comitê de implantação |
| Plano de riscos com mitigações | Gerente Robonuvem | Comitê de implantação |
| Questionário de Implantação enviado à Prefeitura | Gerente Robonuvem | — |

#### Critério de saída
- Todos os responsáveis nomeados com poderes formalizados
- Ambientes acessíveis e funcionais
- Cronograma aprovado pelo patrocinador
- Questionário de Implantação respondido pela Prefeitura (prazo: 10 dias úteis)

---

### Onda 1 — Cadastros e Segurança

**Duração estimada:** 5 dias úteis
**Dependências:** Onda 0 concluída; Questionário de Implantação respondido (seção Estrutura Administrativa)

#### Entregas

| Entrega | Entrada necessária | Evidência |
|---|---|---|
| Estrutura administrativa completa (órgãos, secretarias, departamentos, UGs, centros de custo) | Organograma municipal | Tela de consulta com hierarquia |
| Cadastro de usuários com perfis segregados | Lista de usuários, lotação e funções | Tela de usuários com perfis atribuídos |
| Configuração de permissões granulares por operação financeira | Definição de quem solicita/aprova/empenha/liquida/paga/estorna/audita | Matriz de permissões documentada |
| Segregação por Unidade Gestora | Lista de UGs | Operador da UG-A bloqueado ao tentar acessar dados da UG-B |
| Segregação de funções | Regras de negócio | Solicitante bloqueado ao tentar aprovar própria solicitação |
| Contas bancárias, agências, fontes vinculadas | Dados bancários da tesouraria | Telas de contas com saldos |
| Configuração documental (tipos de documento, modelos, formatos aceitos) | Padrões da Prefeitura | Catálogo de documentos configurado |
| Auditoria append-only funcional | — | Log de inclusão/alteração/exclusão com usuário, data, IP, valores anterior/posterior |

#### Critérios de saída
- [ ] Usuário de uma unidade **não acessa** a outra
- [ ] Solicitante **não aprova** a própria solicitação
- [ ] Auditor **não altera** operações
- [ ] Administrador **não consegue apagar** fatos regulados (soft-delete obrigatório)
- [ ] Log de auditoria registra login, logoff, alteração de permissão e consulta sensível

---

### Onda 2 — Planejamento e Orçamento

**Duração estimada:** 7 dias úteis
**Dependências:** Onda 1 concluída; PPA/LDO/LOA vigentes recebidos da Prefeitura

#### Entregas

| Entrega | Entrada necessária | Evidência |
|---|---|---|
| PPA cadastrado com programas, objetivos, ações, metas e indicadores | PPA vigente da Prefeitura | Tela do PPA + Relatórios + Anexos obrigatórios |
| LDO com metas, prioridades e vínculo ao PPA | LDO vigente | Tela da LDO + Comparativo original vs. alterada |
| LOA com previsão de receita, fixação de despesa e dotações | LOA vigente | Tela da LOA + Anexos legais |
| Dotações com vinculação a programa/ação/fonte/UG | Quadro de dotações | Saldo disponível consultável por dotação |
| Fontes e destinações de recursos | Tabela municipal de fontes | Catálogo de fontes configurado |
| CMD — Cronograma Mensal de Desembolso | Dados do planejamento | Relatório de CMD |
| MBA — Metas Bimestrais de Arrecadação | Dados do planejamento | Relatório de MBA |
| Créditos adicionais com aprovação segregada | Alterações já realizadas no exercício | Demonstração: solicitar → aprovar (outro usuário) → efetivar → saldo atualizado |

#### Critérios de saída
- [ ] Programa do PPA chega à dotação da LOA (rastreabilidade completa)
- [ ] Alteração orçamentária mantém histórico (versão original preservada)
- [ ] Crédito adicional atualiza saldo **somente após aprovação** por usuário diferente
- [ ] Relatórios exibem versão original e alterações
- [ ] CMD e MBA gerados e consultáveis
- [ ] Anexos legais do PPA, LDO e LOA gerados em PDF

---

### Onda 3 — Execução Orçamentária e Financeira

**Duração estimada:** 10 dias úteis
**Dependências:** Onda 2 concluída

#### Entregas

| Entrega | Evidência |
|---|---|
| Solicitação de empenho com unidade solicitante, fornecedor, dotação, fonte e valor | Tela de solicitação + workflow de aprovação |
| Aprovação segregada (solicitante ≠ aprovador) | Bloqueio demonstrado + log |
| Reserva de dotação vinculada à solicitação aprovada | Saldo da dotação reduzido |
| Empenho ordinário, global e estimativo com Nota de Empenho em PDF | NE gerada com numeração, assinaturas e documento de suporte |
| Vinculação do empenho a licitação, contrato, obra, convênio e programa | Campos preenchidos e rastreáveis |
| Liquidação com nota fiscal (série, chave, data, valor), ateste e documento GED | Saldo a liquidar atualizado |
| Motor de retenções automáticas parametrizável (INSS, IR, SEST, SENAT, SENAR, RAT, ISS, outras) | Retenções calculadas automaticamente na liquidação |
| Pagamento com validação de fonte, conta bancária, saldo financeiro e status | Saldo financeiro atualizado |
| Pagamento parcial | Saldo a pagar atualizado |
| Recolhimento de retenções (ingresso extraorçamentário → obrigação → recolhimento → baixa) | Obrigação baixada, vínculo ao exercício de origem |
| Estorno de pagamento com reversão automática de retenções | Registro original preservado, lançamento contábil de estorno gerado |
| Receita prevista, lançada e arrecadada | Classificação vinculada à LOA |
| Receita intraorçamentária, redutora, redistribuição autorizada, anulação e estorno | Cada operação com lançamento contábil |
| Restos a pagar (inscrição, consulta de RAP processados/não processados, pagamento e cancelamento) | Saldos por exercício |
| Contabilização automática de todo evento de execução | Partidas dobradas geradas automaticamente, vinculadas ao fato de origem |

#### Critérios de saída
- [ ] Cenário completo executado sem intervenção manual no banco:
```
Solicitação → Aprovação → Reserva → Empenho → Liquidação → Retenção → Pagamento → Recolhimento → Estorno
```
- [ ] O sistema **bloqueia**: empenho sem saldo, liquidação acima do empenho, pagamento sem liquidação ou em fonte/conta incompatível
- [ ] Cada passo produz: saldo atualizado, documento, lançamento contábil, auditoria e histórico
- [ ] Recolhimento baixa a obrigação extraorçamentária correta
- [ ] Receita e despesa geram partidas dobradas e atualizam saldos orçamentários, financeiros e patrimoniais

---

### Onda 4 — Tesouraria e Patrimônio

**Duração estimada:** 7 dias úteis
**Dependências:** Onda 3 concluída; Dados bancários, inventário de bens e estoques recebidos

#### Entregas

| Entrega | Evidência |
|---|---|
| Saldos bancários por conta e por fonte | Tela de consulta + relatório |
| Transferências bancárias com fonte do valor transferido | Documento e lançamento contábil |
| Importação OFX e CNAB com identificador de origem, lote, erros e reprocessamento idempotente | Tela de importação + relatório de inconsistências |
| Conciliação bancária com matching automático/manual, pendências, ajustes e relatório | Relatório de conciliação: saldo contábil vs. bancário |
| Estorno de pagamento com reversão de retenções | Demonstração funcional |
| Bens patrimoniais com avaliação inicial, localização e responsável | Cadastro completo |
| Depreciação por método linear, taxa por classe, cálculo mensal | Lançamento contábil automático |
| Reavaliação e impairment com memória de cálculo e aprovação | Reflexo contábil |
| Alienação com ganho/perda, baixa patrimonial e receita | Lançamentos contábeis rastreáveis |
| Estoque: entradas, saídas, ajustes, saldo por almoxarifado | Vínculo da saída com a liquidação quando aplicável |
| Inventário com bloqueio de movimentação durante contagem | Relatório de inventário |
| Dívida ativa com inscrição, atualização, recebimento e baixa | Reflexo na receita e contabilidade |
| Dívida consolidada com operações de crédito, amortizações e juros | Relatórios para demonstrativos fiscais |

#### Critérios de saída
- [ ] Extrato conciliado com diferenças justificadas
- [ ] Bem depreciado e alienado gera: baixa + ganho/perda + lançamentos contábeis rastreáveis
- [ ] Saldo de estoque conciliado
- [ ] Dívidas compatíveis com demonstrativos contábeis

---

### Onda 5 — Licitações e Contratos

**Duração estimada:** 5 dias úteis
**Dependências:** Onda 3 concluída; Contratos e licitações vigentes recebidos

#### Entregas

| Entrega | Evidência |
|---|---|
| Processo licitatório completo: modalidade, objeto, participantes, habilitação, vencedor, edital, ata, pareceres, situação | Tela + anexos GED |
| Contrato vinculado ao vencedor: vigência, responsáveis, valor, parcelas, aditivos, medição | Tela do contrato + documentos |
| Execução financeira do contrato: valor contratado, empenhado, liquidado, pago, saldo a empenhar, saldo contratual | Painel de execução financeira na tela do contrato |
| Vínculo obrigatório entre empenho e contrato/licitação quando o tipo de despesa exigir | Validação no empenho |
| Integração Protocolo ↔ Contabilidade: processo com etapa "Aguardando Contabilidade" → empenho registrado → processo liberado | Demonstração funcional com histórico de integração |

#### Critérios de saída
- [ ] Contrato apresenta valores contratado/empenhado/liquidado/pago/saldo calculados
- [ ] Empenho identifica contrato de origem
- [ ] Processo administrativo **não avança** quando existir pendência contábil obrigatória
- [ ] Processo é **liberado** após evento contábil ser confirmado

---

### Onda 6 — Relatórios, Integrações e Assinatura Digital

**Duração estimada:** 10 dias úteis
**Dependências:** Ondas 3, 4 e 5 concluídas; Layouts TCE-PB e certificado ICP-Brasil obtidos

#### 6a. Relatórios legais

| Relatório | Formatos | Conteúdo |
|---|---|---|
| Diário Contábil | PDF, XLSX | Lançamentos por data, débito, crédito, histórico, documento, usuário |
| Razão Contábil | PDF, XLSX | Movimentação por conta, saldo inicial/movimentos/saldo final |
| Balancete Contábil | PDF, XLSX | Saldos por conta, mensal e acumulado |
| Balancetes Mensais | PDF, XLSX | Um por mês do exercício |
| RREO | PDF | Receita prevista/realizada, despesa fixada/empenhada/liquidada/paga |
| RGF | PDF | Despesa com pessoal, dívida, garantias, operações de crédito, RAP |
| PCA | PDF | Prestação de contas anual conforme TCE-PB |
| Balanço Anual | PDF | Orçamentário, financeiro, patrimonial, variações patrimoniais |
| Relatórios do PPA/LDO/LOA | PDF, XLSX | Programas, ações, metas, dotações, anexos |
| CMD e MBA | PDF, XLSX | Cronograma de desembolso e metas de arrecadação |
| Créditos Adicionais | PDF | Solicitações, aprovações, saldos |
| Receita/Despesa | PDF, XLSX, CSV | Comparativos, evolução, limites constitucionais |
| PASEP | PDF | Base de cálculo e contribuições |
| Relatórios personalizados | PDF, XLSX, CSV | Filtros autorizados, agrupamento, totalização |

#### 6b. Integrações governamentais

| Integração | Entregas obrigatórias |
|---|---|
| **TCE-PB (SAGRES)** | Configuração → Seleção de período → Pré-validação → Geração → Download → Histórico → Status → Log de erros → Reenvio |
| **SICONFI (MSC, DCA, RREO, RGF)** | Versão de layout → Regras de consistência → Geração → Histórico de remessas → Tratamento de rejeição |
| **eSocial de prestadores PF** | Competência → Dados de retenção → Validação → Assinatura → Envio → Recibo → Rejeição → Retificação |
| **EFD-Reinf** | Eventos R-4010/R-4020/R-4040/R-4080. Fonte = motor de retenções da Onda 3 |
| **DIRF e SEFIP** | Geradores quando exigidos pela competência |
| **NFe/CTe/NFSe** | Importação de XML → Validação → Vínculo ao empenho/liquidação/GED → Manifestação do destinatário |
| **Tributos → Contabilidade** | Importação por layout → Validação → Receita pelo fato gerador → Dívida ativa → Arrecadação |

#### 6c. Assinatura digital e fechamento

| Funcionalidade | Detalhe |
|---|---|
| Assinatura ICP-Brasil A1/A3 | Individual e em lote, com cadeia de certificação e validação pública |
| Fechamento mensal | Bloquear movimentação no período encerrado |
| Reabertura | Somente usuário autorizado com justificativa registrada |
| Publicação no Diário Oficial | Protocolo, retorno e erro |

#### Critérios de saída
- [ ] Cada relatório é gerado com dados do sistema, possui filtros, período, unidade, usuário emissor e auditoria
- [ ] Fechamento bloqueia nova movimentação; reabertura exige autorização formal
- [ ] Relatório oficial exportado em PDF e assinado com ICP-Brasil com assinatura validável
- [ ] Cada integração permite: configurar → selecionar competência → validar → gerar/enviar → consultar status → analisar erro → reprocessar sem duplicar
- [ ] Arquivo TCE-PB e arquivo SICONFI passam pelo validador oficial correspondente

---

### Onda 7 — Portal da Transparência

**Duração estimada:** 7 dias úteis
**Dependências:** Ondas 3 e 6 concluídas; Domínio/subdomínio e identidade visual definidos

#### Entregas

| Funcionalidade | Evidência |
|---|---|
| Rotas públicas sem autenticação para consultas | URL acessível publicamente |
| Publicação automática a partir dos dados contabilizados | Empenho registrado no sistema → aparece no portal no prazo definido |
| Mascaramento de CPF/CNPJ conforme LGPD | Dados pessoais protegidos |
| **Despesas:** empenho, liquidação, pagamento, UO, função, subfunção, natureza, programa, ação, fonte, beneficiário, CPF/CNPJ (com exceções), convênios, licitações, dispensas, contratos, processos | Consulta funcional com filtros |
| **Receitas:** previsão, lançamento, arrecadação, categoria, origem, espécie, fonte, UG, comparativos e evolução | Consulta funcional com filtros |
| **Relatórios públicos:** balancetes, RREO, RGF, Balanço Anual, demonstrativos, arquivos avulsos com título/subtítulo | Documentos publicados com versão |
| Pesquisa, filtros, ordenação, paginação, gráficos | Interface navegável |
| Exportação CSV, TXT e PDF a partir da mesma consulta | Arquivo gerado pelo sistema |
| API pública versionada, documentada, com rate limit, filtros e paginação | Endpoint consultável com documentação |
| Dados abertos | Datasets disponíveis |
| Menu de ajuda, manual de navegação, FAQ, contato e canal de suporte | Seções acessíveis |

#### Critérios de saída
- [ ] Valor interno = valor público (reconciliação total)
- [ ] Cidadão consulta e exporta sem autenticação
- [ ] Documentos publicados mantêm histórico de versão
- [ ] Dados pessoais e sigilosos **não são** expostos
- [ ] API pública funcional e documentada
- [ ] Acessibilidade e responsividade verificadas

---

### Onda 8 — Operação Assistida

**Duração estimada:** Conforme período contratual (mínimo 15 dias úteis recomendado)
**Dependências:** Virada para produção executada

#### Entregas

| Entrega | Detalhe |
|---|---|
| Acompanhamento intensivo | Presença (remota ou presencial) diária nos primeiros 5 dias úteis |
| Sala de situação diária | Reunião curta (15-30 min) com painel de incidentes, responsáveis e validação de saldos |
| Priorização de incidentes | Classificação imediata de cada problema (ver seção de classificação abaixo) |
| Correção assistida | Resolução de incidentes críticos e altos em até 4h e 8h respectivamente |
| Conciliações diárias | Conferência de saldos bancários, contábeis e do portal nos primeiros 5 dias |
| Aceite por área | Cada área (contabilidade, tesouraria, compras, patrimônio, transparência) formaliza aceite |
| Transição para suporte regular | Redução gradual do acompanhamento após estabilização |

#### Classificação de incidentes

| Nível | Exemplo | SLA de resolução |
|---|---|---|
| **Crítico** | Sistema indisponível, saldo incorreto, pagamento inviável, dados corrompidos | Até 4 horas |
| **Alto** | Processo essencial bloqueado sem alternativa, relatório legal incorreto | Até 8 horas |
| **Médio** | Erro com contorno operacional temporário, relatório gerencial incorreto | Até 24 horas |
| **Baixo** | Dúvida, melhoria, problema visual, ajuste de parametrização | Até 48 horas |

#### Critérios para encerrar a operação assistida
- [ ] Nenhuma inconsistência contábil crítica
- [ ] Saldos reconciliados (contábil, bancário, patrimonial, portal)
- [ ] Integrações estáveis (TCE-PB, SICONFI, bancária)
- [ ] Usuários operando sem acompanhamento contínuo
- [ ] Portal consistente com sistema interno
- [ ] Chamados críticos e altos resolvidos
- [ ] Aceite formal de cada área implantada

---

## 10. Cronograma de Marcos

| Marco | Após Onda | Validação obrigatória | Decisão |
|---|---|---|---|
| **M0** | Onda 0 | Responsáveis nomeados, ambientes prontos, cronograma aprovado | Autorizar início da configuração |
| **M1** | Onda 1 | Segregação por UG funcional. Auditoria append-only. Perfis aprovados pelo Controle Interno | Autorizar cadastramento de dados orçamentários |
| **M2** | Onda 2 | PPA→LDO→LOA→Crédito demonstrável com aprovação segregada | Validar planejamento com Contador |
| **M3** | Onda 3 | Ciclo completo Solicitação→Estorno. Retenções automáticas. Contabilização automática | Validar execução orçamentária e financeira |
| **M4** | Onda 4 | Conciliação, depreciação/alienação, dívida ativa/consolidada, estoque | Validar tesouraria e patrimônio |
| **M5** | Onda 5 | Licitação integrada ao empenho, execução financeira do contrato, protocolo↔contabilidade | Validar compras e contratos |
| **M6** | Onda 6 | Relatórios legais gerados com dados reais. TCE-PB/SICONFI gerados e validados. ICP-Brasil funcional | Validar conformidade |
| **M7** | Onda 7 | Portal público com dados reconciliados ao sistema interno | Validar transparência |
| **M8** | Virada | Saldos migrados e reconciliados, backup testado, plano de reversão aprovado | Autorizar virada para produção |
| **M9** | Onda 8 | Aceites por área, zero incidentes críticos, suporte regular estabilizado | Encerrar implantação |

> [!CAUTION]
> **Não avançar para o próximo marco com pendência crítica no anterior.** Se qualquer bloco não estiver 100% funcional, a posição correta é resolver antes de prosseguir.

---

## 11. Levantamento Inicial Estruturado (Questionário de Implantação)

### 11.1 Estrutura administrativa

Solicitar à Prefeitura:
- Órgãos e entidades
- Unidades gestoras e unidades orçamentárias
- Secretarias e departamentos
- Centros de custo
- Responsáveis e ordenadores de despesa
- Gestores e fiscais de contratos
- Lista de usuários com lotação
- Perfis desejados e poderes de aprovação

### 11.2 Planejamento e orçamento

Solicitar:
- PPA vigente completo (programas, objetivos, ações, metas, indicadores, valores por exercício)
- LDO vigente (metas, prioridades, riscos fiscais, anexos)
- LOA vigente (receita prevista, despesa fixada, dotações, fontes, destinações)
- Alterações orçamentárias já realizadas no exercício
- Quadro de funções, subfunções, programas e ações
- Cronograma mensal de desembolso
- Metas bimestrais de arrecadação

### 11.3 Contabilidade

Solicitar:
- Plano de contas utilizado (PCASP e extensões locais)
- Eventos contábeis e roteiros de contabilização
- Saldos contábeis do exercício anterior e do exercício corrente
- Balancetes (último disponível)
- Diário e Razão do exercício
- Balanço do exercício anterior
- Regras de fechamento mensal
- Procedimentos de reabertura
- Restos a pagar (processados e não processados, por exercício)
- Saldos extraorçamentários
- Dívida consolidada (contratos, saldos, amortizações)
- Dívida ativa (inscrições, atualizações, recebimentos)

### 11.4 Tesouraria

Solicitar:
- Bancos, agências e contas correntes
- Fontes vinculadas a cada conta
- Convênios bancários (CNAB 240/400)
- Layouts de remessa e retorno
- Extratos recentes (OFX ou PDF)
- Responsáveis por pagamentos e limites de aprovação
- Assinaturas necessárias em ordens de pagamento
- Regras de conciliação utilizadas

### 11.5 Patrimônio e estoque

Solicitar:
- Inventário de bens (tombamento, valor, data de aquisição, vida útil, depreciação acumulada, localização, responsável)
- Classes patrimoniais e taxas de depreciação
- Materiais em estoque (itens, quantidades, valores, almoxarifados)
- Critérios de avaliação de estoque

### 11.6 Contratos e licitações

Solicitar:
- Licitações vigentes (modalidade, objeto, participantes, vencedores)
- Dispensas e inexigibilidades
- Contratos vigentes (fornecedor, vigência, valor, aditivos, saldos)
- Valores empenhados, liquidados e pagos por contrato
- Fiscais e gestores de cada contrato
- Documentos anexos (editais, atas, contratos)

### 11.7 Portal da Transparência

Solicitar:
- Domínio ou subdomínio desejado
- Identidade visual (brasão, cores, fontes)
- Categorias de publicação
- Histórico necessário (exercícios anteriores)
- Responsáveis pela transparência e pelo e-SIC
- Política de mascaramento de dados pessoais
- Informações atualmente publicadas no portal existente
- Periodicidade de atualização exigida
- Relatórios e dados abertos obrigatórios
- Exigências específicas do TCE-PB para o portal

---

## 12. Parametrização

A parametrização converte os dados do levantamento em configuração funcional do sistema. Cada parâmetro deve ter:

| Campo | Descrição |
|---|---|
| Módulo | Área do sistema |
| Parâmetro | Nome da configuração |
| Valor configurado | Valor definido para Lagoa Seca |
| Fonte | Documento ou responsável que forneceu |
| Validador | Quem aprovou a configuração |
| Data | Data da configuração |

---

## 13. Plano de Migração

### 13.1 Inventário de fontes

Para cada dado a ser migrado:

| Campo | Descrição |
|---|---|
| Origem | Sistema atual, planilha, banco ou arquivo |
| Responsável | Quem fornecerá os dados |
| Formato | CSV, XLSX, SQL, XML, TXT |
| Quantidade | Número de registros |
| Período | Exercício atual ou histórico |
| Chave | CPF, CNPJ, código, empenho |
| Qualidade | Boa, incompleta, duplicada |
| Destino | Tabela ou módulo CeleriFlow |
| Regra de conversão | Transformação necessária |
| Validador | Quem aprova a migração |
| Total de controle | Valor ou quantidade esperada |

### 13.2 Ciclos de migração

#### Migração 1 — Diagnóstica
- **Objetivo:** Descobrir problemas de qualidade nos dados
- **Resultado:** Relatório de inconsistências, registros rejeitados, campos sem correspondência
- **Aceite:** Não gera aceite formal. Gera lista de correções necessárias

#### Migração 2 — Homologação
- **Objetivo:** Testar o processo completo no ambiente de homologação
- **Resultado:** Dados migrados, validação pelo contador, conferência de saldos
- **Aceite:** Aceite condicional (pode haver ajustes)

#### Migração 3 — Simulação da virada
- **Objetivo:** Executar exatamente o procedimento planejado para produção
- **Medições obrigatórias:** Duração total, falhas, exceções, tempo de validação, tempo de reconciliação
- **Resultado:** Procedimento documentado passo a passo com tempos reais

#### Migração 4 — Final (produção)
- **Objetivo:** Migração definitiva após congelamento no sistema anterior
- **Pré-condição:** Extração definitiva do sistema anterior autorizada pelo gestor
- **Resultado:** Dados em produção, reconciliação completa, aceite formal

### 13.3 Totais obrigatórios de controle

Os seguintes totais devem ser comparados entre sistema anterior e CeleriFlow:

- Total das dotações orçamentárias
- Saldo disponível por dotação
- Total empenhado
- Total liquidado
- Total pago
- Restos a pagar (processados e não processados)
- Retenções pendentes
- Saldo bancário por conta
- Saldo por fonte de recurso
- Saldo de dívida ativa
- Saldo de dívida consolidada
- Total de bens patrimoniais
- Depreciação acumulada
- Saldo de estoque por almoxarifado
- Saldos contábeis por conta (débito e crédito)
- Quantidade de contratos vigentes
- Saldo contratual

### 13.4 Tratamento de exceções

Cada erro de migração deve registrar:

| Campo | Descrição |
|---|---|
| Código do erro | Identificador único |
| Registro | Dado que apresentou problema |
| Origem | Arquivo/tabela de origem |
| Motivo | Descrição do problema |
| Responsável | Quem deve resolver |
| Decisão | Corrigir na origem / ajustar regra / excluir com justificativa |
| Correção aplicada | O que foi feito |
| Data | Data da resolução |
| Status | Pendente / Resolvido / Aceito como exceção |
| Evidência | Documento ou tela comprobatória |

> [!IMPORTANT]
> Não deve haver correção silenciosa de dados. Toda exceção deve ser registrada, justificada e aprovada.

---

## 14. Integrações

Cada integração deve ser tratada como um mini-projeto com:

| Fase | Atividade |
|---|---|
| Descoberta | Obter layout, credencial, ambiente de homologação |
| Desenvolvimento | Implementar adaptador com configuração, validação e tratamento de erros |
| Homologação | Testar com dados reais ou arquivo modelo oficial |
| Aceite | Validação pelo contador e/ou fiscal técnico |
| Produção | Ativação com monitoramento |

---

## 15. Catálogo de Testes de Aceitação

### 15.1 Segurança

| Teste | Resultado esperado |
|---|---|
| Usuário da UG-A consulta dados da UG-B | **Bloqueado** |
| Solicitante aprova a própria solicitação | **Bloqueado** |
| Auditor tenta alterar operação | **Bloqueado** |
| Usuário sem permissão chama ação diretamente (URL/API) | **Bloqueado** |
| Usuário tenta exportar informação não autorizada | **Bloqueado** |
| Tentativa de login com senha incorreta (5x) | **Conta bloqueada temporariamente** |

### 15.2 Financeiro

| Teste | Resultado esperado |
|---|---|
| Empenho sem saldo na dotação | **Bloqueado** |
| Empenho acima do valor da dotação | **Bloqueado** |
| Liquidação acima do valor do empenho | **Bloqueado** |
| Pagamento sem liquidação | **Bloqueado** |
| Pagamento em conta incompatível com a fonte | **Bloqueado** |
| Pagamento parcial | **Permitido, saldo a pagar atualizado** |
| Estorno de pagamento | **Registro original preservado, retenções revertidas** |
| Dois usuários empenhando a mesma dotação simultaneamente | **Lock de concorrência, sem saldo negativo** |

### 15.3 Contábil

| Teste | Resultado esperado |
|---|---|
| Lançamento com partida não balanceada | **Bloqueado** |
| Lançamento em período fechado | **Bloqueado** |
| Reabertura por usuário não autorizado | **Bloqueado** |
| Reabertura por usuário autorizado | **Permitido com justificativa registrada** |
| Alteração retroativa de lançamento | **Bloqueado (usar estorno + novo lançamento)** |
| Estorno preservando origem | **Novo evento criado, original intacto** |

### 15.4 Integrações

| Teste | Resultado esperado |
|---|---|
| Arquivo TCE-PB válido | **Gerado, validado, disponível para download** |
| Arquivo TCE-PB com dados incompletos | **Pré-validação identifica erros antes da geração** |
| Reenvio de arquivo já enviado | **Sem duplicidade, novo lote identificado** |
| Nota fiscal com fornecedor inexistente | **Erro identificado, registro de importação com status de falha** |
| Competência incorreta no eSocial | **Validação bloqueia envio** |

### 15.5 Portal da Transparência

| Teste | Resultado esperado |
|---|---|
| Empenho registrado no sistema → aparece no portal | **Publicação automática no prazo definido** |
| Valor no portal vs. valor no sistema interno | **Idênticos** |
| CPF de beneficiário no portal | **Mascarado (ex: ***.123.456-**)** |
| Exportação CSV do portal | **Arquivo gerado com mesmos dados da consulta** |
| Consulta à API pública | **Resposta com dados, paginação e filtros** |
| Documento substituído | **Versão anterior preservada** |

---

## 16. Base Modelo Reproduzível

A base modelo deve ser criada por **procedimento automatizado e versionado** (seed script), podendo ser recriada a qualquer momento sem alterações manuais.

### 16.1 Conteúdo obrigatório

#### Unidade Gestora A (Administração Direta)
- Orçamento próprio (PPA, LDO, LOA, dotações)
- Contas bancárias próprias com saldo
- Fontes de recursos vinculadas
- Usuários: solicitante, aprovador, contador, tesoureiro
- Empenhos, liquidações, pagamentos, retenções
- Contratos e licitações
- Bens patrimoniais

#### Unidade Gestora B (Câmara Municipal)
- Orçamento diferente
- Conta bancária própria
- Usuários próprios
- Lançamentos próprios

#### Perfis mínimos
- Solicitante (cria solicitação, não aprova)
- Aprovador/Gestor (aprova, não solicita a própria)
- Contador (lançamentos contábeis, fechamento, relatórios)
- Tesoureiro (pagamentos, conciliação, transferências)
- Auditor (consulta tudo, não altera nada operacional)
- Administrador (perfis, usuários, parametrização)
- Transparência (publicação, revisão, mascaramento)

#### Cenários pré-carregados
- Autoaprovação bloqueada (evidência)
- Acesso cruzado entre UGs bloqueado (evidência)
- Crédito adicional aprovado com saldo atualizado
- Empenho ordinário completo
- Empenho com retenção INSS e IR calculadas
- Pagamento parcial com saldo a pagar
- Estorno de pagamento com reversão de retenções
- Conciliação bancária com relatório
- Bem com depreciação mensal calculada
- Alienação com ganho/perda e lançamentos contábeis
- Contrato com execução financeira calculada
- Relatório legal (RREO) gerado com dados da base
- Remessa TCE-PB gerada (com validação ou contorno)
- Publicação automática no Portal da Transparência
- Tickets de suporte com histórico
- Logs de auditoria de todas as operações acima

---

## 17. Preparação para a POC

### 17.1 Roteiro das três reuniões

#### Reunião 1 — Segurança, Planejamento e Execução (4h)

| Hora | Bloco | Demonstração |
|:---:|---|---|
| 08:00 | Bloco 1 — Segurança | 3 perfis, bloqueio entre UGs, log de auditoria |
| 08:45 | Bloco 2 — Planejamento | PPA → LDO → LOA → CMD/MBA → Crédito com aprovação segregada |
| 10:00 | Bloco 3 — Execução da Despesa | Solicitação → Aprovação → Reserva → Empenho → NF → Liquidação → Retenções → Pagamento → Estorno |
| 11:15 | Bloco 3b — Receita | Receita orçamentária, intra, redutora, anulação |

#### Reunião 2 — Financeiro, Patrimônio, Licitações e Relatórios (4h)

| Hora | Bloco | Demonstração |
|:---:|---|---|
| 08:00 | Bloco 4 — Financeiro | 2 contas, ingresso, saldo por fonte, transferência, conciliação |
| 08:45 | Bloco 5 — Patrimônio | Depreciação → Alienação → Dívida ativa → Estoque |
| 09:45 | Bloco 6 — Licitações | Licitação → Vencedor → Contrato → Empenho → Execução financeira |
| 10:30 | Bloco 8 — Relatórios | Diário, Razão, Balancete, RREO, RGF, PCA. Exportação. ICP-Brasil |

#### Reunião 3 — Integrações, Portal e Suporte (4h)

| Hora | Bloco | Demonstração |
|:---:|---|---|
| 08:00 | Bloco 7 — Integrações | TCE-PB, SICONFI, eSocial, EFD-Reinf, NF modelo, Tributos, Protocolo |
| 09:30 | Bloco 9 — Portal | Acesso público, despesas, receitas, filtros, exportação, API |
| 10:45 | Bloco 10 — Suporte | Abertura → Resposta → Encerramento → Histórico |

### 17.2 Matriz de evidências

Cada requisito do checklist deve ter uma linha na matriz:

| Campo | Descrição |
|---|---|
| Código do requisito | Identificador do PE042 |
| Bloco da POC | 1 a 10 |
| Descrição | Texto do requisito |
| Módulo | Área do sistema |
| Tela ou endpoint | Onde é demonstrado |
| Pré-condições | Dados necessários na base |
| Perfil executor | Qual usuário demonstra |
| Unidade gestora | Qual UG |
| Massa de dados | Dados específicos necessários |
| Passos de demonstração | Roteiro passo a passo |
| Resultado esperado | O que a comissão verifica |
| Documento gerado | PDF, NE, relatório |
| Registro de auditoria | Log esperado |
| Teste automatizado | Se há teste cobrindo |
| Evidência de bloqueio | Cenário negativo (tentativa que deve falhar) |
| Integração envolvida | Se depende de integração |
| Homologação | Se foi validada externamente |
| Responsável | Quem preparou a evidência |
| Status | Pronto / Em andamento / Pendente |
| Link da evidência | Screenshot, vídeo ou link |
| Observações | Notas adicionais |

---

## 18. Plano de Treinamento por Perfil

### 18.1 Turma: Planejamento e Orçamento

**Público:** Responsáveis pelo PPA, LDO, LOA e alterações orçamentárias
**Conteúdo:** PPA, LDO, LOA, créditos adicionais, dotações, fontes, CMD, MBA, relatórios
**Carga horária estimada:** 8 horas

### 18.2 Turma: Contabilidade

**Público:** Contador(a) e equipe de contabilidade
**Conteúdo:** PCASP, eventos contábeis, lançamentos manuais, contabilização automática, fechamento mensal/anual, estornos, Diário, Razão, Balancetes, RREO, RGF, PCA, TCE-PB, SICONFI
**Carga horária estimada:** 16 horas

### 18.3 Turma: Tesouraria

**Público:** Tesoureiro(a) e auxiliares
**Conteúdo:** Contas bancárias, pagamentos, retenções, recolhimento, transferências, importação OFX/CNAB, conciliação, estorno
**Carga horária estimada:** 8 horas

### 18.4 Turma: Compras, Contratos e Patrimônio

**Público:** Setor de compras, gestores de contratos, patrimônio e almoxarifado
**Conteúdo:** Processos licitatórios, fornecedores, contratos, vínculo com empenho, recebimento, bens, depreciação, estoque, inventário
**Carga horária estimada:** 8 horas

### 18.5 Turma: Controle Interno e Auditoria

**Público:** Controlador(a) interno e equipe
**Conteúdo:** Consultas, logs, histórico, exportações, segregação de funções, relatórios de conformidade, conferência do portal
**Carga horária estimada:** 4 horas

### 18.6 Turma: Transparência

**Público:** Responsáveis pela transparência, comunicação e e-SIC
**Conteúdo:** Publicações, revisão, mascaramento LGPD, documentos, API, atendimento ao cidadão
**Carga horária estimada:** 4 horas

### 18.7 Turma: Administradores e Suporte

**Público:** TI municipal e administradores do sistema
**Conteúdo:** Usuários, perfis, parametrização, monitoramento, chamados, escalonamento, incidentes
**Carga horária estimada:** 4 horas

### Requisitos de cada turma

- Lista de presença assinada
- Material de treinamento entregue (PDF ou online)
- Exercícios práticos no ambiente de treinamento
- Avaliação de aproveitamento (questionário ou exercício prático)
- Registro de dúvidas e respostas
- Aceite ou certificado de conclusão
- Sessão de reforço para quem não atingir resultado mínimo

---

## 19. Plano de Corte (Estratégia de Virada)

### Estratégia recomendada: Virada por competência

Homologar durante uma competência → Fazer virada no fechamento do mês → Encerrar movimentações no sistema anterior → Extrair dados finais → Migrar → Reconciliar → Liberar CeleriFlow no primeiro dia útil da competência seguinte.

### D-15 (quinze dias antes da virada)

- [ ] Confirmar lista final de usuários e perfis
- [ ] Fechar cadastro de perfis (sem alterações até a virada)
- [ ] Revisar e resolver pendências de migração
- [ ] Validar integrações (TCE-PB, SICONFI, bancária)
- [ ] Confirmar backup e restore do ambiente de homologação
- [ ] Realizar simulação final de virada (Migração 3)

### D-7 (sete dias antes)

- [ ] Congelar mudanças estruturais (plano de contas, fontes, UGs)
- [ ] Concluir treinamento de todas as turmas
- [ ] Comunicar aos usuários as datas e procedimentos
- [ ] Validar lista de operações pendentes no sistema anterior
- [ ] Revisar e aprovar plano de reversão

### D-1 (dia anterior à virada)

- [ ] Encerrar lançamentos no sistema anterior
- [ ] Obter backup do sistema anterior
- [ ] Extrair base completa para migração
- [ ] Emitir relatórios de controle no sistema anterior (saldos, balancetes, posição)
- [ ] Bloquear alterações não autorizadas no sistema anterior

### D0 (dia da virada)

- [ ] Executar migração final (Migração 4)
- [ ] Executar validações automáticas (totais de controle)
- [ ] Reconciliar saldos (contábil, bancário, patrimonial)
- [ ] Liberar usuários-chave no CeleriFlow
- [ ] Realizar operação controlada (primeiro empenho, primeiro pagamento)
- [ ] Verificar publicação no Portal da Transparência

### D+1 a D+5 (primeira semana)

- [ ] Acompanhar todos os lançamentos
- [ ] Conciliar tesouraria diariamente
- [ ] Conferir contabilização automática
- [ ] Validar publicação no portal
- [ ] Corrigir incidentes críticos imediatamente

### D+10 a D+15

- [ ] Aceite formal da virada por cada área
- [ ] Encerramento do modo de contingência
- [ ] Entrada no suporte regular

---

## 20. Plano de Reversão

### 20.1 Até qual momento é possível voltar

A reversão é viável enquanto:
- O sistema anterior ainda estiver acessível e com dados intactos
- Nenhuma obrigação legal tiver sido transmitida exclusivamente pelo CeleriFlow (TCE-PB, SICONFI)
- Os saldos ainda forem reconciliáveis

Após a transmissão de obrigações legais pelo CeleriFlow, a reversão se torna complexa e deve ser tratada como cenário excepcional.

### 20.2 Procedimento de reversão

| Passo | Ação | Responsável |
|---|---|---|
| 1 | Decisão formal de reversão pelo Comitê de Implantação | Patrocinador + Gestor |
| 2 | Bloquear novos lançamentos no CeleriFlow | Engenharia Robonuvem |
| 3 | Exportar todas as operações realizadas no CeleriFlow durante a janela | Engenharia Robonuvem |
| 4 | Restaurar acesso ao sistema anterior | TI municipal |
| 5 | Reabrir competência no sistema anterior (se necessário) | Contador |
| 6 | Lançar manualmente as operações realizadas no CeleriFlow no sistema anterior | Contabilidade + Tesouraria |
| 7 | Reconciliar saldos entre sistemas | Contador |
| 8 | Comunicar usuários sobre a reversão | Gerente Robonuvem + TI |
| 9 | Documentar causa da reversão, lições aprendidas e novo plano | Gerente Robonuvem |

> [!IMPORTANT]
> A reversão **não significa apagar** as operações do CeleriFlow. Elas devem ser preservadas como evidência documental. O ambiente do CeleriFlow permanece acessível para consulta.

### 20.3 Prevenção de movimentações em dois sistemas

Durante a virada e eventual reversão:
- Somente um sistema pode estar aberto para lançamentos em cada competência
- O sistema em standby deve estar bloqueado para novas operações
- A reconciliação deve ser documentada antes de liberar qualquer sistema

---

## 21. Suporte e SLA

### Canais de suporte contratados

| Canal | Disponibilidade |
|---|---|
| E-mail | Horário comercial (08h-18h, segunda a sexta) |
| Telefone | Horário comercial |
| WhatsApp | Horário comercial |
| Chat online (sistema) | Horário comercial |
| Portal de chamados | 24h (registro) |

### Escalonamento

| Nível | Responsável | Tempo máximo |
|---|---|---|
| 1º nível | Suporte Robonuvem | Até 2h para primeira resposta |
| 2º nível | Engenharia Robonuvem | Conforme SLA do incidente |
| 3º nível | Gerente de Implantação | Incidentes críticos não resolvidos no SLA |

---

## 22. Segurança e LGPD

- Controle de acesso por perfil, UG e operação
- Auditoria append-only de todas as operações reguladas
- Soft-delete para registros financeiros (nunca exclusão física)
- Criptografia em trânsito (HTTPS/TLS)
- Sessão com cookie HttpOnly, SameSite=Lax e Secure
- Mascaramento de dados pessoais no Portal da Transparência
- Canal sigiloso na Ouvidoria (proteção LGPD)
- Política de retenção e descarte a ser definida com o encarregado de dados

---

## 23. Portal da Transparência (resumo de entregas)

Coberto integralmente na Onda 7. O portal deve atender: LC 131/2009, Decreto 10.540/2020, LGPD e exigências específicas do TCE-PB.

---

## 24. Critérios de Aceite

### Aceite parcial (por onda)

Cada onda é aceita mediante:
- Todos os critérios de saída da onda atendidos
- Evidências documentadas na matriz de evidências
- Parecer do fiscal técnico
- Validação do contador (quando aplicável)
- Assinatura do termo de aceite parcial

### Aceite final da implantação

- [ ] Todas as ondas aceitas
- [ ] Saldos migrados e reconciliados (100% dos totais de controle)
- [ ] Integrações homologadas (TCE-PB, SICONFI, bancária)
- [ ] Portal da Transparência publicado e reconciliado
- [ ] Usuários-chave treinados e aprovados
- [ ] Backup e restore testados
- [ ] Zero incidentes críticos em aberto
- [ ] Operação assistida encerrada com aceite por área
- [ ] Termo de aceite final assinado pelo gestor do contrato

---

## 25. Indicadores de Implantação

| Indicador | Meta |
|---|---|
| Cadastros migrados | 100% do escopo aprovado |
| Registros rejeitados na migração | 100% analisados e justificados |
| Saldos contábeis conciliados | 100% (valor por valor) |
| Contas bancárias conciliadas | 100% |
| Usuários treinados | 100% dos usuários-chave |
| Usuários aprovados na avaliação | Meta definida no plano de treinamento |
| Casos de teste críticos executados | 100% |
| Integrações críticas homologadas | 100% |
| Divergência portal × sistema interno | Zero |
| Incidentes críticos em aberto | Zero antes do aceite |
| Backup restaurado com sucesso | Pelo menos 1 restauração comprovada |
| Requisitos com evidência na matriz | 100% |
| Aceites por área formalizados | 100% das áreas implantadas |

---

## 26. Gestão de Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Prefeitura não fornece dados no prazo | Alta | Atraso no cronograma | Questionário estruturado + cobranças formais + escalação ao patrocinador |
| Layout do TCE-PB muda durante implantação | Média | Retrabalho na integração | Obter layout vigente antes da Onda 6; manter adaptador versionado |
| Contador não valida no prazo | Média | Bloqueio de marcos | Reuniões semanais + prazo contratual de validação (5 dias úteis) |
| Dados do sistema anterior com baixa qualidade | Alta | Exceções de migração | 4 ciclos de migração + tratamento formal de exceções |
| Certificado ICP-Brasil não obtido a tempo | Média | Bloqueio da assinatura digital | Solicitar na Onda 0 com prazo de 30 dias |
| Mudança de gestor ou contador durante implantação | Baixa | Perda de contexto | Documentação formal de todas as decisões |
| Requisito não previsto no escopo original | Média | Expansão não controlada | Gestão de mudanças formal (seção 27) |

---

## 27. Gestão de Mudanças de Escopo

### Classificação de solicitações

| Tipo | Definição | Tratamento |
|---|---|---|
| **Correção de erro** | Bug no software que impede operação prevista | Corrigido sem processo de mudança |
| **Requisito original** | Funcionalidade prevista no PE042 que não foi entregue | Corrigido sem processo de mudança |
| **Parametrização** | Ajuste de configuração dentro do escopo contratual | Executado na onda correspondente |
| **Melhoria** | Aprimoramento de funcionalidade existente não prevista no TR | Avaliação de impacto e aprovação |
| **Nova funcionalidade** | Funcionalidade não prevista no PE042 | Proposta formal com prazo e custo |
| **Integração não prevista** | Conector não exigido pelo edital | Proposta formal |
| **Mudança legal posterior** | Alteração de lei, portaria ou layout após assinatura do contrato | Avaliação conjunta de responsabilidade |
| **Solicitação exclusiva** | Customização específica para Lagoa Seca não prevista no edital | Proposta formal com prazo e custo |

### Processo de mudança

1. **Registrar** a solicitação com descrição, solicitante e data
2. **Identificar** fundamento no edital (requisito original ou não)
3. **Avaliar** impacto no cronograma, esforço e custo
4. **Classificar** conforme tabela acima
5. **Aprovar ou rejeitar** pelo Comitê de Implantação
6. **Definir prioridade** e prazo de entrega
7. **Atualizar cronograma** quando aplicável
8. **Registrar decisão** no log de decisões

> [!WARNING]
> Sem esta gestão formal, a implantação se transforma em desenvolvimento ilimitado. Toda solicitação que não seja correção de erro ou requisito original do PE042 deve passar por avaliação de impacto.

---

## 28. Registro Formal de Decisões

Durante a implantação, cada decisão relevante deve ser registrada:

| Campo | Descrição |
|---|---|
| Número | Sequencial (DEC-001, DEC-002...) |
| Data | Data da decisão |
| Assunto | Tema em uma frase |
| Contexto | Situação que gerou a necessidade de decisão |
| Opções consideradas | Alternativas avaliadas |
| Decisão | O que foi decidido |
| Responsável pela aprovação | Quem aprovou (nome e cargo) |
| Impacto | Consequências da decisão |
| Módulos afetados | Áreas do sistema impactadas |
| Ação necessária | O que precisa ser feito em decorrência |

> [!IMPORTANT]
> Este registro protege a Robonuvem contra decisões verbais posteriormente tratadas como falha contratual. Toda decisão sobre regra contábil, migração, mascaramento, publicação ou integração deve ser documentada e assinada.

---

## 29. Plano de Comunicação

### Reuniões

| Tipo | Frequência | Participantes | Objetivo |
|---|---|---|---|
| Reunião de abertura | Única | Todos os stakeholders | Alinhar escopo, cronograma e responsabilidades |
| Reunião semanal de status | Semanal | Comitê de Implantação | Acompanhar progresso, resolver impedimentos |
| Reunião técnica | Sob demanda | Engenharia + Contador/Tesoureiro | Validar configurações e regras |
| Reunião de marco | A cada marco | Comitê + Patrocinador | Aprovar avanço para próxima onda |
| Reunião de encerramento | Única | Todos os stakeholders | Formalizar aceite final |

### Relatório semanal de status

Conteúdo obrigatório:

- Período
- Concluído na semana
- Em andamento
- Planejado para a próxima semana
- Pendências da Robonuvem (com prazo)
- Pendências da Prefeitura (com prazo)
- Riscos identificados ou atualizados
- Decisões necessárias
- Itens vencidos (com responsável)
- Evidências disponíveis
- Situação de cada marco (no prazo / atrasado / bloqueado)

### Regras de comunicação

| Regra | Definição |
|---|---|
| Canal oficial | E-mail institucional (ou canal definido na reunião de abertura) |
| Canal para incidentes | Sistema de chamados + WhatsApp para urgências |
| Responsáveis autorizados a solicitar mudanças | Gestor do contrato e Fiscal técnico |
| Prazo da Prefeitura para validar entregas | 5 dias úteis após a notificação |
| Tratamento do silêncio | Após 5 dias úteis sem resposta, a entrega é considerada aceita tacitamente |
| Escalonamento | Gerente Robonuvem → Patrocinador municipal → Prefeito (se necessário) |

---

## 30. Encerramento e Transição para Suporte

### Condições de encerramento

- [ ] Todas as ondas aceitas formalmente
- [ ] Migração reconciliada e aceita pelo Contador
- [ ] Operação assistida encerrada com aceite por área
- [ ] Zero incidentes críticos em aberto
- [ ] Portal da Transparência publicado e reconciliado
- [ ] Treinamento concluído para todos os perfis
- [ ] Backup e restore comprovados
- [ ] Plano de reversão documentado (mesmo que não acionado)
- [ ] Registro de decisões completo e assinado
- [ ] Matriz de evidências 100% preenchida

### Transição para suporte regular

| Item | Ação |
|---|---|
| Canais de suporte | Mantidos conforme contrato |
| SLA de atendimento | Conforme contrato |
| Atualizações do sistema | Conforme política de versões |
| Mudanças legais | Avaliadas e planejadas conforme gestão de mudanças |
| Relatório mensal | Status geral, incidentes, melhorias e integrações |
| Reunião mensal | Alinhamento entre Robonuvem e gestor do contrato |

### Documentação entregue ao final

- Plano Diretor de Implantação (este documento)
- Matriz de evidências preenchida
- Registro de decisões
- Relatórios de migração (4 ciclos)
- Relatórios de treinamento (listas, avaliações)
- Termos de aceite parcial e final
- Manual do sistema (por perfil)
- Documentação das integrações configuradas
- Plano de reversão (mesmo não utilizado)
- Relatório final de implantação

---

> [!NOTE]
> **O ponto mais importante deste documento:** O plano de adequação está organizado por *funcionalidades a desenvolver*. Este plano de implantação está organizado por *entregas verificáveis para Lagoa Seca*. Cada entrega tem entrada, atividade, responsável, ambiente, evidência, validador, critério de aceite, dependências, risco e plano de reversão. Sem essa transformação, há um bom backlog técnico, mas não necessariamente uma implantação controlável.
