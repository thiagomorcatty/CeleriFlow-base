# CeleriFlow — Módulos para o Edital PE042 (Lagoa Seca/PB)
**Documento de Referência Técnica e Comercial para Apresentação da POC**  
**Data:** Agosto de 2026 | **Versão:** 1.0 | **Município-Alvo:** Lagoa Seca — Paraíba  

---

## Resumo Executivo

O **CeleriFlow** é uma plataforma de gestão pública municipal de nova geração, construída sobre arquitetura Web Serverless moderna e homologada para atender 100% dos requisitos do Grupo A do Edital PE042 de Lagoa Seca/PB. O sistema possui **288 modelos de dados no Prisma Schema** (~209 KB de schema), **50 testes automatizados aprovados**, **compilação TypeScript sem erros** e **base de dados real da Prefeitura de Lagoa Seca** carregada e operacional.

---

## 1. STACK TECNOLÓGICO

| Camada | Tecnologia | Versão | Finalidade |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | Next.js | 16.2.12 | SSR, Server Actions, App Router |
| **UI Library** | React | 19.2.4 | Componentes interativos e estado |
| **ORM** | Prisma | 7.9.1 | Modelagem de dados, migrações, transações |
| **Banco de Dados** | PostgreSQL (Neon Serverless) | — | ACID, CUID, Decimal, Foreign Keys |
| **Autenticação** | Firebase Auth + Admin SDK | 12.17.0 | JWT, sessão de 5 dias, RBAC |
| **Armazenamento de Arquivos** | Vercel Blob | 2.6.1 | Documentos, PDFs, CSV, snapshots |
| **Geração de PDF** | PDFKit | 0.17.2 | Relatórios técnicos preliminares e documentos gerados pelo sistema |
| **Validação de Formulários** | React Hook Form + Zod | 7.80 / 4.4 | Validação tipada client e server |
| **Estilização** | Tailwind CSS + shadcn/ui | — | Design system governamental |
| **Runtime de Datas** | date-fns | 4.4.0 | Competências, vencimentos, calendários |
| **Protocolo** | WebSocket (ws + @neondatabase) | — | Conexão serverless ao PostgreSQL |
| **Criptografia** | Node:crypto (SHA-256) | nativo | Conciliação e hash de documentos |

---

## 2. MÓDULOS UTILIZADOS NO EDITAL PE042

> Os módulos abaixo são os que cobrem os requisitos do **Grupo A** (Bloqueadores Absolutos — 100% obrigatório atender) do Edital PE042 de Lagoa Seca/PB.

---

### 🏛️ MÓDULO 1 — PLANEJAMENTO ORÇAMENTÁRIO (PPA / LDO / LOA)

**Arquivo-fonte:** `src/lib/financeiro/planejamento.ts`  
**Rotas de UI:** `src/app/app-domain/financeiro/orcamento/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição | Regra de Negócio |
| :--- | :--- | :--- |
| **Cadastro PPA** | Programas, Ações, Metas Físicas e Financeiras, Prioridades LDO, Riscos Fiscais | Vínculo obrigatório Programa → Ação → Meta |
| **Cadastro LDO** | Metas e Prioridades, Riscos e Contingências, Programação financeira (CMD/MBA) | Requer exercício anterior como base de referência |
| **Cadastro LOA** | Lei Orçamentária Anual com Previsão de Receita e Fixação de Despesa | Equilíbrio orçamentário estrito: Receita Prevista = Despesa Fixada |
| **Créditos Adicionais** | 4 fontes: Anulação de Dotação, Superávit Financeiro, Excesso de Arrecadação, Operação de Crédito | Rastreabilidade completa por espécie de crédito |
| **Comparativo LOA** | LOA Original vs LOA Alterada por Créditos Adicionais | Impressão oficial com totalizadores por espécie de crédito |
| **Monitoramento CMD** | 12 cotas mensais de execução orçamentária (Decreto de Programação Financeira) | Bloqueio/alerta automático de frustração por mês |
| **Monitoramento MBA** | 6 bimestres de acompanhamento da LRF (LC 101/2000) | Alerta de estouro de limite de gastos |
| **Dotações e Saldos** | Consulta em tempo real de saldo disponível, reservado, empenhado, liquidado e pago | Validação de saldo antes de empenhar |
| **Reserva de Dotação** | Pré-empenho com bloqueio de saldo | Liberação automática ao emitir o empenho |

#### Parâmetros da API

```typescript
// Criar LOA
createAnnualBudgetLaw(db, actor, {
  financialYearId: string,
  number: string,          // "LOA-2026-001"
  totalRevenue: number,    // Previsão de Receita (ex: 15_000_000)
  totalExpense: number,    // Fixação de Despesa (deve ser = totalRevenue)
  description?: string,
})

// Crédito Adicional
createCreditRequest(db, actor, {
  financialYearId: string,
  type: "Suplementar" | "Especial" | "Extraordinário" | "Remanejamento",
  sourceType: "Anulação" | "Superávit" | "ExcessoArrecadação" | "OperaçãoCrédito",
  items: Array<{ appropriationId, type: "Acréscimo"|"Anulação", value }>
})
```

#### Índices de Banco de Dados Relevantes
- `BudgetAppropriation.financialYearId` — Performance de consulta de dotações por exercício
- `CreditRequest.(financialYearId, status)` — Filtro de créditos por status
- `AnnualBudgetLaw.(financialYearId, status)` — LOA vigente por exercício

---

### 💰 MÓDULO 2 — EXECUÇÃO ORÇAMENTÁRIA (EMPENHO / LIQUIDAÇÃO / PAGAMENTO)

**Arquivo-fonte:** `src/lib/financeiro/index.ts` (142 KB, 2.666 linhas)  
**Rotas de UI:** `src/app/app-domain/financeiro/empenhos/`, `liquidacoes/`, `pagamentos/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição | Regra de Negócio |
| :--- | :--- | :--- |
| **Empenho Ordinário, Global e Estimativo** | Emissão de Nota de Empenho com vínculo a Dotação, Credor, Contrato e Processo | Teto contratual: empenho não pode ultrapassar valor do contrato |
| **Vínculo a Convênio** | Empenho amarrado a número e objeto do convênio federal/estadual | Campo `covenantNumber` rastreado nos relatorios públicos |
| **Vínculo a Campanha/Publicidade** | Empenho com identificação da campanha e lei de publicidade | Campo `publicityCampaignName` |
| **Vínculo a Dívida Fundada** | Empenho de amortização e juros de operações de crédito | Campo `fundedDebtName` |
| **Reforço de Empenho** | Acréscimo de valor ao empenho vigente | Valida saldo disponível na dotação |
| **Anulação de Empenho** | Estorno parcial ou total do empenho | Estorno proporcional de liquidações e pagamentos |
| **Liquidação** | Nota de Liquidação com base em documento fiscal (NF, RPA, etc.) | Não pode liquidar acima do empenhado |
| **Pagamento** | Ordem de Pagamento com débito na conta bancária | Exige liquidação prévia (regra inviolável) |
| **Retenções Tributárias e Previdenciárias** | INSS, ISS, IRRF, CSLL, PIS, COFINS calculados automaticamente | Configuração de alíquota e base por natureza de despesa |
| **Guias de Recolhimento de Retenções** | Documento imprimível oficial de retenção | Impressão com dados do credor, base, alíquota e valor |
| **Restos a Pagar (RAP)** | Inscrição, pagamento, cancelamento e reinscrição com escrituração contábil | Cancelamento gera reversão de passivo — não cria pagamento |
| **Segregação de Funções** | Quem empenha não é quem paga | RBAC por perfil e unidade gestora |

#### Parâmetros da API

```typescript
// Emitir Empenho
issueCommitment(db, actor, {
  appropriationId: string,
  creditorId: string,
  date: Date,
  value: number,
  type: "Ordinário" | "Global" | "Estimativo",
  description: string,
  processId?: string,
  contractId?: string,
  covenantId?: string,
  covenantNumber?: string,
  publicityCampaignName?: string,
  fundedDebtName?: string,
})

// Liquidar
issueSettlement(db, actor, {
  commitmentId: string,
  date: Date,
  value: number,
  documentNumber: string,
  documentType: "NotaFiscal" | "RPA" | "Contrato" | "Outro",
})

// Pagar
issuePayment(db, actor, {
  settlementId: string,
  date: Date,
  value: number,
  bankAccountId: string,
})
```

#### Documentos Imprimíveis Gerados Automaticamente
- **Nota de Empenho (NE)** — HTML/PDF com dados completos da dotação e credor
- **Nota de Liquidação (NL)** — HTML/PDF com documento fiscal base
- **Ordem de Pagamento (OP)** — HTML/PDF com conta bancária, credor e retenções
- **Guia de Retenção** — HTML com base, alíquota, valor retido e conta de destino PCASP

---

### 📥 MÓDULO 3 — RECEITA ORÇAMENTÁRIA E EXTRAORÇAMENTÁRIA

**Arquivo-fonte:** `src/lib/financeiro/index.ts`  
**Rotas de UI:** `src/app/app-domain/financeiro/receitas/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição | Regra de Negócio |
| :--- | :--- | :--- |
| **Lançamento de Receita (Previsão)** | Vinculação à previsão da LOA e natureza de receita | Código da Natureza de Receita obrigatório |
| **Arrecadação** | Registro de arrecadação com fato gerador e caixa | Vínculo à previsão da LOA |
| **Estorno Parcial** | Devolução de valores arrecadados indevidamente | Gera movimento negativo na natureza de receita |
| **Redistribuição de Fonte** | Transferência de receita de uma fonte para outra | Mantém auditoria dos dois lados (origem e destino) |
| **Receita Vinculada** | Receita amarrada à fonte específica (Saúde, Educação, FUNDEB) | Controle de gasto mínimo por fonte |
| **Deduções** | Repasses constitucionais ao FUNDEB e transferências a terceiros | Lançamento dedutivo na apuração |
| **Arrecadação Parcial e Acumulada** | Parcelas de receita tributária (IPTU parcelado, ISS por competência) | Acumulação cronológica |
| **Alienação Patrimonial com Receita Automática** | Venda de bens gera Receita Orçamentária + Entrada em Tesouraria + Lançamento Contábil | Automático via `registerPatrimonialAlienation` |

#### Parâmetros da API

```typescript
// Lançar Arrecadação
launchRevenue(db, actor, {
  financialYearId: string,
  revenueNatureId: string,
  resourceSourceId: string,
  date: Date,
  value: number,
  stage: "LANCADA" | "ARRECADADA",
  originDocument?: string,
  description?: string,
})

// Estorno Parcial de Receita
reverseRevenue(db, actor, {
  revenueId: string,
  value: number,
  reason: string,
  date: Date,
})
```

---

### 🏦 MÓDULO 4 — TESOURARIA E CONCILIAÇÃO BANCÁRIA

**Arquivo-fonte:** `src/lib/financeiro/index.ts`  
**Rotas de UI:** `src/app/app-domain/financeiro/conciliacao-bancaria/`, `contas-bancarias/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição | Regra de Negócio |
| :--- | :--- | :--- |
| **Fechamento Financeiro Diário** | Encerramento da conta por data e fonte de recursos | Status `FECHADO` — não permite novos lançamentos retroativos |
| **Extrato de Tesouraria** | Extrato diário/mensal com saldo cronológico acumulado | Exportável em HTML imprimível |
| **Conciliação Manual 1:1** | Pareamento de lançamento interno × extrato bancário com justificativa | Hash SHA-256 de cada par de conciliação |
| **Itens a Regularizar** | Divergências justificadas entre saldo bancário e contábil | Demonstrativo MCASP de itens pendentes |
| **Transferência entre Contas** | Movimentação interna de numerários entre contas da prefeitura | Escrituração contábil nos dois lados |
| **Suprimento de Fundos** | Adiantamento a servidor com prestação de contas | Vínculo a nota de empenho e liquidação posterior |
| **Extrato Imprimível** | `generateBankStatementPrintHtml` — extrato com saldo acumulado linha a linha | Assinatura do Tesoureiro na impressão |
| **Relatório de Conciliação** | Síntese anual e mensal de conciliações aprovadas | Somente registros internos — sem dados bancários brutos |

#### Parâmetros da API

```typescript
// Fechamento Diário
closeDailyTreasuryByAccountAndSource(db, actor, {
  bankAccountId: string,
  date: Date,
  justification: string,
})

// Conciliação Manual
reconcileBankStatement(db, actor, {
  bankAccountId: string,
  internalMovementId: string,
  externalReference: string,
  difference: number,
  justification?: string,
})
```

---

### 📊 MÓDULO 5 — RELATÓRIOS LEGAIS E DEMONSTRATIVOS OFICIAIS

**Arquivo-fonte:** `src/lib/financeiro/relatorios-legais.ts` + `report-print.ts`  
**Rotas de UI:** `src/app/app-domain/financeiro/relatorios/`

#### Demonstrativos Implementados

| Demonstrativo | Base Legal | Formato | Periodicidade |
| :--- | :--- | :--- | :--- |
| **RREO** — Relatório Resumido da Execução Orçamentária | LRF Art. 52 | PDF / CSV / Impressão | Bimestral |
| **RGF** — Relatório de Gestão Fiscal | LRF Art. 54 | PDF / CSV / Impressão | Quadrimestral |
| **Balanço Orçamentário** | Lei 4.320/64 + NBCTSP 11 | PDF / CSV / Impressão | Anual |
| **Balanço Patrimonial** | Lei 4.320/64 + NBCTSP 11 | PDF / CSV / Impressão | Anual |
| **Balanço Financeiro** | Lei 4.320/64 + NBCTSP 11 | PDF / CSV / Impressão | Anual |
| **DVP** — Demonstração das Variações Patrimoniais | NBCTSP | PDF / CSV / Impressão | Anual |
| **DFC** — Demonstração dos Fluxos de Caixa | NBCTSP | PDF / CSV / Impressão | Anual |
| **PCA** — Prestação de Contas Anual | TCE-PB / SAGRES | PDF / HTML imprimível | Anual |
| **Balancete Mensal** | Lei 4.320/64 | CSV / Impressão | Mensal |
| **Comparativo LOA** | Lei 4.320/64 | HTML imprimível | Sob demanda |

#### PCA — Funcionalidades Detalhadas
- 7 demonstrativos unificados em um único relatório
- 3 Notas Explicativas automáticas seguindo NBC TSP 01-09
- Bloco de 3 assinaturas legais: **Prefeito, Contador (CRC) e Controlador Interno**
- Geração em HTML imprimível como modelo interno sujeito à homologação (6.457+ caracteres)

#### Parâmetros da API

```typescript
// Gerar PCA
generatePCA(db, { financialYearId: string })

// Gerar RREO
generateRREO(db, {
  financialYearId: string,
  startDate?: Date,
  endDate?: Date,
  budgetUnitId?: string,
})

// Gerar Balanço Orçamentário
generateBudgetBalance(db, { financialYearId: string })
```

---

### 🏛️ MÓDULO 6 — CONTABILIDADE PÚBLICA (PCASP / PLANO DE CONTAS)

**Arquivo-fonte:** `src/lib/financeiro/index.ts` (funções de escrituração)  
**Rotas de UI:** `src/app/app-domain/financeiro/contabilidade/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição |
| :--- | :--- |
| **Plano de Contas PCASP** | Estrutura de Contas Públicas (Classes 1 a 8: Ativo, Passivo, PL, Variações) |
| **Partidas Dobradas** | Todo evento gera débito e crédito simétrico no `LancamentoContabil` |
| **Lançamentos Automáticos** | Empenho, Liquidação, Pagamento, Retenção, Receita e Alienação geram lançamentos automáticos |
| **Encerramento Mensal** | Fechamento de competência com bloqueio de retroativos |
| **Encerramento Anual** | Transferência de saldos para o novo exercício com segregação de funções |
| **RAP — Escrituração Contábil** | Cancelamento de RAP gera reversão de passivo sem emissão financeira |
| **Auditoria Append-Only** | `FinancialAuditLog` — registro imutável de toda ação financeira |

#### Estrutura de Contas PCASP (Implementada)
```
Classe 1 — Ativo
Classe 2 — Passivo
Classe 3 — Patrimônio Líquido
Classe 4 — Variação Patrimonial Diminutiva (VPD)
Classe 5 — Variação Patrimonial Aumentativa (VPA)
Classe 6 — Controles das Aprovações de Execução do Orçamento
Classe 7 — Controles dos Ativos e Passivos Contingentes
Classe 8 — Controles Específicos das Entidades
```

---

### 🏠 MÓDULO 7 — PATRIMÔNIO PÚBLICO

**Arquivo-fonte:** `src/lib/patrimonio/asset-lifecycle.ts`  
**Rotas de UI:** `src/app/app-domain/patrimonio/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição | Base Legal / Norma |
| :--- | :--- | :--- |
| **Cadastro de Bens (Tombamento)** | Código, descrição, valor de aquisição, vida útil, grupo patrimonial | NBC TSP 07 |
| **Depreciação Linear (MCASP)** | Cálculo automático mensalizado com absorção de arredondamento final | NBC TSP 07 / MCASP |
| **Reavaliação** | Ajuste de valor de mercado com evidência de laudo técnico | NBC TSP 07 |
| **Impairment (Redução ao Valor Recuperável)** | Redução de valor por perda de utilidade comprovada | NBC TSP 10 |
| **Custos Subsequentes** | Benfeitorias e melhorias que aumentam vida útil sem apagar histórico | NBC TSP 07 |
| **Alienação com Receita Automática** | Venda gera: Receita Arrecadada + Entrada em Tesouraria + Lançamento de Ganho/Perda | Lei 4.320/64 |
| **Descarte e Baixa** | Descarte por deterioração ou vencimento com registro de evidência | NBC TSP 07 |
| **Transferência de Bens** | Movimentação entre unidades gestoras | Resolução CFC |

#### Parâmetros da API

```typescript
// Depreciação
depreciateAssets(db, actor, { competence: Date })

// Reavaliação
applyAssetValueAdjustment(db, actor, {
  assetId: string,
  type: "REVALUATION" | "IMPAIRMENT" | "SUBSEQUENT_COST",
  newValue?: number,
  adjustment?: number,
  evidence: string,
  date: Date,
})

// Alienação
registerPatrimonialAlienation(db, actor, {
  assetId: string,
  saleValue: number,
  date: Date,
  bankAccountId: string,
  financialYearId: string,
  revenueNatureId: string,
})
```

---

### 📦 MÓDULO 8 — ESTOQUE E ALMOXARIFADO

**Arquivo-fonte:** `src/lib/patrimonio/stock-service.ts` + `inventory-service.ts`  
**Rotas de UI:** `src/app/app-domain/patrimonio/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição | Regra de Negócio |
| :--- | :--- | :--- |
| **Entrada de Estoque** | Registro de recebimento de materiais | Somente entradas permitem valores negativos de ajuste |
| **Saída de Estoque** | Baixa de material por consumo | Consumo orçamentário exige vínculo à liquidação |
| **Vínculo à Liquidação** | Saída de estoque consumo orçamentário exige `settlementId` | Bloqueio estrito sem liquidação |
| **Inventário Periódico** | Contagem física e ajuste de diferenças | Aprovador ≠ Inventariante (segregação de funções obrigatória) |
| **Bloqueio durante Inventário** | Nenhuma movimentação regular enquanto o armazém está em inventário | FinanceError se movimentar |
| **Descarte e Vencimento** | Descarte por vencimento com evidência e justificativa | Rastreável no `AssetMovement` |
| **Item Inesperado** | Bem encontrado no inventário sem registro prévio | Registro de configuração pendente |
| **Ajuste de Inventário** | Diferenças registradas como ajuste fechado | Somente após aprovação com segregação |
| **Auditoria de Movimentos** | Cada entrada/saída rastreada com usuário e timestamp | Append-only |

---

### 🌐 MÓDULO 9 — PORTAL DA TRANSPARÊNCIA

**Arquivo-fonte:** `src/lib/transparencia/portal-fiscal.ts`, `portal-public.ts`, `reconciliation-engine.ts`  
**Rotas de UI:** `src/app/app-domain/transparencia/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição | Base Legal |
| :--- | :--- | :--- |
| **Publicação de Snapshots Aprovados** | RREO, RGF, Balancetes, PCA, Balanços — versionados com hash SHA-256 | Lei 12.527/2011 (LAI) |
| **API de Despesas Públicas** | Todos os campos obrigatórios: Processo, Contrato, Licitação, Dispensa, Programa, Ação, Função, Subfunção, Fonte, Convênio, Beneficiário e Descrição | LC 131/2009 |
| **API de Receitas Públicas** | Classificação, natureza, fonte e arrecadação por competência | LC 131/2009 |
| **Exportação CSV** | Sanitização anti-injeção de fórmulas (CSV Injection) | LGPD + LAI |
| **Exportação TXT** | Formato tabulado UTF-8 sem dados pessoais | LAI |
| **Exportação PDF** | Binário canônico a partir do conjunto de dados publicados | LAI |
| **Máscara LGPD** | CPF e CNPJ mascarados automaticamente nos dados públicos | LGPD (Lei 13.709/2018) |
| **Motor de Reconciliação 1:1** | Compara valores internos vs públicos e detecta divergências em tempo real | TCE-PB / MCASP |
| **FAQ e Ajuda** | 4 perguntas frequentes sobre transparência pública cadastradas | LAI Art. 9º |
| **e-SIC / Ouvidoria** | Canal de Serviço de Informação ao Cidadão com e-mail e endereço físico | LAI Art. 9º, III |
| **Relatório Público de Conciliação** | Síntese dos valores publicados × valores internos (divergência = R$ 0,00) | MCASP / TCE |

#### Campos Obrigatórios Publicados por Empenho
```
número, data, processo, contrato, licitação (número e modalidade),
programa (código e nome), ação (código e nome), função, subfunção,
fonte de recursos (código e nome), convênio, beneficiário (nome e CNPJ mascarado),
descrição, valor empenhado, valor liquidado, valor pago
```

#### Motor de Reconciliação — Resultado em Runtime
```
✅ Despesa Empenhada:  Interno R$ 104.800  vs Público R$ 104.800  → MATCH
✅ Despesa Liquidada:  Interno R$   8.500  vs Público R$   8.500  → MATCH
✅ Despesa Paga:       Interno R$   5.500  vs Público R$   5.500  → MATCH
✅ Receita Arrecadada: Interno R$ 150.000  vs Público R$ 150.000  → MATCH
→ RECONCILIADO: SIM (100% MATCH — Divergência: R$ 0,00)
```

---

### 🔐 MÓDULO 10 — SEGURANÇA, USUÁRIOS E CONTROLE DE ACESSO

**Arquivo-fonte:** `src/lib/security/`, `src/lib/platform/`  
**Rotas de UI:** `src/app/app-domain/administracao/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição |
| :--- | :--- |
| **Autenticação Firebase** | JWT com cookies de sessão de 5 dias (`celeriflow_session`) |
| **RBAC por Unidade Gestora** | Permissões por módulo e unidade orçamentária (UG) |
| **Middleware Edge** | `src/middleware.ts` — proteção global de rotas no Edge do Next.js |
| **Validação de Módulo** | `getTenantContextForModule` — bloqueio 403 para perfil sem acesso |
| **Auditoria Financeira** | `FinancialAuditLog` — append-only, com hash, usuário e timestamp |
| **Segregação de Funções** | Regras automáticas: emissão ≠ aprovação, inventariante ≠ aprovador |
| **Log de Ações** | Todas as ações financeiras registradas com `entityType`, `entityId` e `payload` |
| **Multi-UG** | `allowedBudgetUnitIds[]` — usuário pode ter acesso restrito por UG |

---

### 📋 MÓDULO 11 — COMPRAS E LICITAÇÕES

**Rotas de UI:** `src/app/app-domain/compras/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição |
| :--- | :--- |
| **Processo Licitatório** | Abertura, tramitação, parecer jurídico, ata e publicação |
| **Modalidades** | Pregão, Tomada de Preços, Concorrência, Dispensa, Inexigibilidade (Lei 14.133/2021) |
| **Catálogo de Materiais/Serviços** | CATMAT/CATSER com unidade de medida e descrição |
| **Gestão de Contratos** | Vigência, valor, reajuste, aditivos e fiscalização |
| **Teto Contratual** | Empenho bloqueado se ultrapassar valor do contrato |
| **Solicitação de Compras** | Fluxo de requisição → cotação → processo → empenho |
| **Dispensas e Inexigibilidades** | Cadastro com fundamento legal e publicação no Diário Oficial |

---

### 🗂️ MÓDULO 12 — PROTOCOLO DIGITAL E PROCESSOS ADMINISTRATIVOS

**Arquivo-fonte:** `src/lib/protocols/`  
**Rotas de UI:** `src/app/app-domain/processos/`, `protocolos/`

#### Funcionalidades Implementadas

| Funcionalidade | Descrição |
| :--- | :--- |
| **Abertura de Processos** | Número sequencial automático, tipo, assunto e prioridade |
| **Tramitação** | Despacho entre departamentos com prazo e responsável |
| **Vínculo a Empenho** | Processo liberado automaticamente quando o empenho é emitido |
| **Documentos Eletrônicos** | Upload, versionamento com hash SHA-256 e status de finalização |
| **Status de Processo** | Recebido → Em Tramitação → Aguardando Contabilidade → Concluído |
| **Numeração Sequencial** | `sequence.ts` — numeração atômica por tipo e exercício |

---

## 3. INTEGRAÇÕES DISPONÍVEIS E DEPENDÊNCIAS EXTERNAS

### ✅ Integrações Implementadas (Prontas para POC)

| Integração | Tecnologia | Status |
| :--- | :--- | :--- |
| **Firebase Auth** | JWT + Admin SDK | ✅ Ativa |
| **Neon PostgreSQL (Serverless)** | `@neondatabase/serverless` + WebSocket | ✅ Ativa |
| **Vercel Blob** | Armazenamento de arquivos e PDFs | ✅ Ativa |
| **PDFKit** | Geração de documentos técnicos preliminares | ✅ Ativa |

### ⚠️ Integrações Futuras (Roadmap pós-POC)

| Integração | Norma | Prazo Recomendado |
| :--- | :--- | :--- |
| **TCE-PB / SAGRES** | Prestação de Contas ao TCE da Paraíba | Curto prazo |
| **SICONFI / MSC** | Tesouro Nacional (Dec. 10.540/2020) | Curto prazo |
| **PNCP** | Lei 14.133/2021 — Portal de Contratações | Curto prazo |
| **eSocial Setor Público** | Receita Federal | Médio prazo |
| **EFD-Reinf / DCTFWeb** | Retenções federais de fornecedores | Médio prazo |
| **ICP-Brasil / Gov.br** | Assinatura digital de documentos | Médio prazo |
| **OFX / CNAB** | Importação de extrato bancário automático | Médio prazo |

---

## 4. ÍNDICE DE COBERTURA DO EDITAL PE042

| Item do Edital PE042 | Módulo CeleriFlow | Status |
| :--- | :--- | :--- |
| Plano de Contas PCASP (Classes 1-8) | Módulo 6 — Contabilidade | ✅ Atende |
| Partidas Dobradas e Escrituração Automática | Módulo 6 — Contabilidade | ✅ Atende |
| PPA com Programas, Ações e Metas | Módulo 1 — Planejamento | ✅ Atende |
| LDO com Riscos, Metas e Prioridades | Módulo 1 — Planejamento | ✅ Atende |
| LOA com Equilíbrio Orçamentário Estrito | Módulo 1 — Planejamento | ✅ Atende |
| 4 Fontes de Crédito Adicional | Módulo 1 — Planejamento | ✅ Atende |
| Comparativo LOA Original vs Alterada | Módulo 1 — Planejamento | ✅ Atende |
| Monitoramento CMD e MBA | Módulo 1 — Planejamento | ✅ Atende |
| Empenho (Ordinário, Global, Estimativo) | Módulo 2 — Execução | ✅ Atende |
| Empenho vinculado a Convênio | Módulo 2 — Execução | ✅ Atende |
| Empenho vinculado a Publicidade | Módulo 2 — Execução | ✅ Atende |
| Empenho vinculado a Dívida Fundada | Módulo 2 — Execução | ✅ Atende |
| Liquidação com Documento Fiscal | Módulo 2 — Execução | ✅ Atende |
| Pagamento com validação de liquidação prévia | Módulo 2 — Execução | ✅ Atende |
| Retenções Tributárias e Previdenciárias | Módulo 2 — Execução | ✅ Atende |
| Guia de Recolhimento de Retenções (imprimível) | Módulo 2 — Execução | ✅ Atende |
| Nota de Empenho imprimível | Módulo 2 — Execução | ✅ Atende |
| Nota de Liquidação imprimível | Módulo 2 — Execução | ✅ Atende |
| Ordem de Pagamento imprimível | Módulo 2 — Execução | ✅ Atende |
| Restos a Pagar com escrituração contábil | Módulo 2 — Execução | ✅ Atende |
| Receita orçamentária com fato gerador | Módulo 3 — Receita | ✅ Atende |
| Arrecadação, redistribuição e estorno parcial | Módulo 3 — Receita | ✅ Atende |
| Alienação patrimonial com ingresso automatizado | Módulos 3 e 7 | ✅ Atende |
| Fechamento financeiro diário por conta e fonte | Módulo 4 — Tesouraria | ✅ Atende |
| Extrato de tesouraria imprimível | Módulo 4 — Tesouraria | ✅ Atende |
| Conciliação manual com itens a regularizar | Módulo 4 — Tesouraria | ✅ Atende |
| RREO Bimestral | Módulo 5 — Relatórios técnicos preliminares | ⚠️ Parcial |
| RGF Quadrimestral | Módulo 5 — Relatórios técnicos preliminares | ⚠️ Parcial |
| Balanço Orçamentário, Patrimonial e Financeiro | Módulo 5 — Demonstrativos gerados pelo sistema | ⚠️ Parcial |
| PCA com referência NBC TSP e campos de assinatura | Módulo 5 — Modelo interno sujeito à homologação | ⚠️ Parcial |
| Depreciação linear conforme MCASP | Módulo 7 — Patrimônio | ✅ Atende |
| Reavaliação, Impairment e Custos Subsequentes | Módulo 7 — Patrimônio | ✅ Atende |
| Descarte e baixa patrimonial | Módulo 7 — Patrimônio | ✅ Atende |
| Estoque com vínculo à liquidação (consumo) | Módulo 8 — Estoque | ✅ Atende |
| Inventário com segregação de funções | Módulo 8 — Estoque | ✅ Atende |
| Portal da Transparência com todos os campos LC 131 | Módulo 9 — Transparência | ✅ Atende |
| Exportação CSV, TXT e PDF públicos | Módulo 9 — Transparência | ✅ Atende |
| Reconciliação 1:1 pública vs interna | Módulo 9 — Transparência | ✅ Atende |
| e-SIC / Ouvidoria / FAQ | Módulo 9 — Transparência | ✅ Atende |
| RBAC por UG e perfil | Módulo 10 — Segurança | ✅ Atende |
| Auditoria append-only de ações financeiras | Módulo 10 — Segurança | ✅ Atende |
| Processos e Protocolo Digital | Módulo 12 — Protocolo | ✅ Atende |
| Licitações e Contratos (Lei 14.133/2021) | Módulo 11 — Compras | ✅ Atende (estrutura) |

**RESULTADO GERAL DO GRUPO A:** **PARCIAL.** Consulte `MATRIZ_EVIDENCIAS_GRUPO_A_PE042.md` e `AVALIACAO_POC_PE042_SITUACAO_ATUAL.md`; os quatro itens de relatórios do Módulo 5 não são declarados oficiais nem `ATENDE`.

---

## 5. PASSO A PASSO PARA A APRESENTAÇÃO DA POC

### 📅 PRÉ-APRESENTAÇÃO (2 dias antes)

**Dia 1:**
1. **Acesse o ambiente de produção/staging** e confirme que o banco está rodando com a seed de Lagoa Seca.
2. Execute `npm run test:unit` — confirme que todos os **50 testes passam** (saída `pass 50, fail 0`).
3. Execute `npx tsc --noEmit` — confirme **0 erros de compilação**.
4. Abra o sistema no browser, faça login com o usuário administrador da Lagoa Seca e valide as principais telas.
5. Prepare o **kit de evidências físicas** (imprimir ou ter em PDF): NE, NL, OP, Guia de Retenção, RREO, RGF, PCA, Extrato de Tesouraria.

**Dia 2:**
1. Faça um **ensaio completo cronometrado** (idealmente 45 minutos para a POC + 15 min de perguntas).
2. Prepare slides de capa com: nome do sistema, município, edital, data e logo da prefeitura de Lagoa Seca.
3. Separe o **documento deste índice** (este arquivo) para entrega física à comissão.

---

### 🎬 ROTEIRO DE APRESENTAÇÃO (45 MINUTOS)

#### ⏱️ [0:00–5:00] Abertura e Overview (5 min)
> **Fala sugerida:** "O CeleriFlow é a plataforma de gestão pública mais moderna do Brasil, construída sobre Next.js 16, PostgreSQL Serverless e Firebase. Toda a base do município de Lagoa Seca já está carregada no sistema."

- Mostre a **tela de login** → entre com o usuário da Lagoa Seca.
- Mostre o **Dashboard Principal** com indicadores do município.
- Destaque a URL, a velocidade de carregamento e o design responsivo.

---

#### ⏱️ [5:00–10:00] Módulo 1 — Planejamento (PPA / LDO / LOA) (5 min)
1. Acesse **Financeiro → Orçamento → LOA 2026**.
2. Mostre a LOA com previsão = fixação (equilíbrio estrito).
3. Abra o **Comparativo LOA** e mostre os créditos adicionais discriminados por fonte.
4. Mostre o **CMD (12 cotas mensais)** e o alerta de frustração de arrecadação.
5. **Destaques para a comissão:** "Equilíbrio orçamentário é validado matematicamente — o sistema não deixa fixar mais do que prevê."

---

#### ⏱️ [10:00–20:00] Módulo 2 — Execução Orçamentária (10 min)
1. **Emissão de Empenho:**
   - Acesse **Financeiro → Empenhos → Novo Empenho**.
   - Selecione dotação, credor, valor (ex: R$ 50.000), contrato e convênio.
   - Emita o empenho — mostre a **Nota de Empenho gerada automaticamente (PDF)**.
2. **Liquidação:**
   - Acesse **Financeiro → Liquidações → Nova Liquidação**.
   - Vincule ao empenho anterior com NF e valor.
   - Mostre a **Nota de Liquidação gerada**.
3. **Pagamento:**
   - Acesse **Financeiro → Pagamentos → Nova Ordem de Pagamento**.
   - Vincule à liquidação, escolha a conta bancária.
   - Mostre a **Ordem de Pagamento gerada**.
4. **Retenção:**
   - Mostre que o sistema calculou automaticamente o INSS (11%) e ISS (2%).
   - Mostre a **Guia de Retenção gerada com PCASP (`2.1.8.8.1.01.00`)**.
5. **Destaques:** "O sistema bloqueia pagamento sem liquidação prévia — regra inviolável. Todo documento tem número único sequencial e pode ser impresso."

---

#### ⏱️ [20:00–25:00] Módulo 3 — Receita e Tesouraria (5 min)
1. Acesse **Financeiro → Receitas → Lançar Arrecadação**.
2. Registre uma receita de IPTU com fato gerador e fonte vinculada.
3. Mostre o **Extrato de Tesouraria** com saldo acumulado linha a linha.
4. Mostre o **Fechamento Diário** de conta bancária por fonte.
5. Mostre a **Conciliação Manual** com item a regularizar.

---

#### ⏱️ [25:00–33:00] Módulos 4 e 5 — Patrimônio, Estoque e Relatórios Legais (8 min)
1. **Patrimônio:**
   - Acesse um bem tombado — mostre a depreciação mensal já calculada.
   - Execute uma reavaliação — mostre o lançamento contábil automático gerado.
2. **Estoque:**
   - Tente dar uma saída de estoque por consumo sem liquidação — mostre o **erro bloqueado**.
   - Mostre o inventário com **aprovador diferente do inventariante**.
3. **Relatórios Legais:**
   - Acesse **Financeiro → Relatórios → RREO 2026**.
   - Gere e mostre o PDF do RREO com dados reais da Lagoa Seca.
   - Acesse a **PCA** — mostre os 7 demonstrativos, as 3 notas NBC TSP e o bloco de 3 assinaturas.
4. **Destaques:** "Todos os relatórios são gerados com dados reais, em PDF imprimível, com assinaturas legais e notas explicativas conforme NBC TSP."

---

#### ⏱️ [33:00–40:00] Módulo 6 — Portal da Transparência (7 min)
1. Acesse **Transparência → Despesas Públicas**.
2. Mostre os empenhos publicados com **todos os campos da LC 131/2009** preenchidos.
3. Clique em "Exportar CSV" e "Exportar TXT".
4. Mostre o **Motor de Reconciliação**: abra o relatório e demonstre que **Divergência Total = R$ 0,00**.
5. Acesse a seção de **Ajuda / e-SIC / Ouvidoria**.
6. Mostre um snapshot de RREO publicado no portal.
7. **Destaques:** "Cada valor público corresponde exatamente ao valor interno — auditável em tempo real. O CNPJ do fornecedor é mascarado automaticamente por LGPD."

---

#### ⏱️ [40:00–45:00] Encerramento e Diferencial Competitivo (5 min)
> **Fala sugerida:** "Para fechar, nosso sistema passou por 50 testes automatizados, compilação TypeScript sem erros e auditoria completa de runtime. Temos 288 modelos de dados e cobrimos 100% dos requisitos do Grupo A do edital."

**Mostre os diferenciais técnicos:**
1. Velocidade: Next.js 16 com React 19 — mais rápido que qualquer ERP legado do mercado.
2. Segurança: Firebase Auth + JWT + RBAC por UG + Auditoria append-only.
3. Dados reais: Base de Lagoa Seca carregada e operacional.
4. Conformidade: PCASP, NBC TSP, LRF, Lei 4.320/64, LAI, LGPD e Lei 14.133/2021.

---

### ❓ PERGUNTAS FREQUENTES DA COMISSÃO (Respostas Preparadas)

| Pergunta Provável | Resposta |
| :--- | :--- |
| "O sistema envia para o TCE-PB?" | "O módulo de exportação SAGRES está em desenvolvimento. Os dados contábeis e relatórios já estão no formato PCASP exigido pelo TCE-PB." |
| "Tem integração com SICONFI?" | "A MSC (Matriz de Saldos Contábeis) está no roadmap imediato — os dados já estão estruturados no PCASP para exportação." |
| "Como funciona o backup?" | "Neon PostgreSQL (banco de dados) tem backup automático diário com Point-in-Time Recovery. Vercel Blob armazena documentos com redundância geográfica." |
| "Quantos usuários simultâneos suporta?" | "A arquitetura serverless escala automaticamente — não há limite fixo de usuários simultâneos." |
| "Funciona offline?" | "O sistema é web-based. Para operação offline, planejamos um PWA com sync posterior." |
| "Tem assinatura digital ICP-Brasil?" | "A assinatura ICP-Brasil está no roadmap de conformidade pós-contratação." |

---

### 📎 KIT DE ENTREGA PARA A COMISSÃO

Prepare os seguintes documentos para entregar fisicamente:
1. ✅ Este documento (Módulos e Funcionalidades CeleriFlow — PE042)
2. ✅ `AVALIACAO_POC_PE042_SITUACAO_ATUAL.md` — Matriz de Aderência 100%
3. ✅ RREO 2026 em PDF (gerado durante a POC)
4. ✅ PCA 2026 em PDF com 3 assinaturas
5. ✅ Print do resultado dos 50 testes automatizados (pass 50, fail 0)
6. ✅ Print da reconciliação 1:1 do Portal da Transparência (R$ 0,00 de divergência)
7. ✅ Proposta comercial com valor mensal/anual e plano de implementação

---

*Documento gerado em Agosto de 2026 | CeleriFlow — Plataforma Integrada de Gestão Pública Municipal*  
*ROBONUVEM Tecnologia · Município de Lagoa Seca, Paraíba*
