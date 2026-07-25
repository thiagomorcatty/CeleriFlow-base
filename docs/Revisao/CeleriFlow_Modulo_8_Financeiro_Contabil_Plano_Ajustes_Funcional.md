# CeleriFlow — Módulo 8: Financeiro e Contábil
## Plano de ajustes, correções, integrações e implementação funcional

**Objetivo:** transformar o Módulo 8 no núcleo único de execução orçamentária, financeira, tesouraria e contabilidade do CeleriFlow, integrando corretamente as receitas, despesas e fatos patrimoniais originados pelos demais módulos.

O módulo deve responder, com rastreabilidade:

> **Quanto a Prefeitura previu, reservou, empenhou, liquidou, pagou, arrecadou, recebeu, possui em caixa/bancos e contabilizou?**

---

# 1. Decisão arquitetural central

O Módulo 8 será a **autoridade financeira única do CeleriFlow**.

Os demais módulos podem gerar:

- necessidade de despesa;
- obrigação;
- recebível;
- arrecadação;
- medição;
- folha;
- concessão;
- compra;
- recebimento;
- multa;
- tributo;
- transferência;
- fato patrimonial.

Mas não devem criar por conta própria conceitos paralelos de:

```text
Empenho
Liquidação
Pagamento
Receita Arrecadada
Movimento Bancário
Lançamento Contábil
```

Essas operações pertencem ao Módulo 8.

---

# 2. Arquitetura macro

```text
                    MÓDULOS OPERACIONAIS
                             │
     ┌───────────────────────┼────────────────────────┐
     │                       │                        │
   DESPESAS                RECEITAS              PATRIMÔNIO
     │                       │                        │
 Compras                  Tributário              Bens
 RH/Folha                 Saneamento              Estoque
 Obras                    Inteligência Receita    Depreciação
 Educação                 Segurança               Baixas
 Social                   Meio Ambiente           Incorporação
 Cultura                  Transferências
 Saúde                    Outras Receitas
     │                       │                        │
     └───────────────────────┼────────────────────────┘
                             ↓
                MÓDULO 8 — FINANCEIRO/CONTÁBIL
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
      ORÇAMENTO          TESOURARIA        CONTABILIDADE
          │                  │                  │
      Reserva              Bancos          Plano de Contas
      Empenho              Caixa           Eventos
      Liquidação           Movimentos      Débito/Crédito
      Pagamento            Conciliação     Balancetes
```

---

# 3. Separação entre os módulos 7, 8 e Inteligência da Receita

## Módulo 7 — Tributário

Responsável por tributos municipais:

```text
IPTU
ISS
ITBI
Taxas
Lançamentos
Guias
Dívida Ativa
NFS-e
Certidões
```

Fluxo:

```text
TaxAssessment
↓
TaxGuide
↓
TaxPayment
```

Ao ocorrer arrecadação real:

```text
TaxPayment
↓
Módulo 8
↓
Revenue
```

---

## Novo módulo — Inteligência da Receita

Responsável por:

```text
VAF
IPM-ICMS
IPM-IBS
GIA
EFD
PGDAS-D
DEFIS
Produção Primária
CVI
Cruzamento Fiscal
PIT
Impugnação IPM
```

Ele identifica e acompanha **potencial e composição da receita compartilhada**, mas não substitui a Tesouraria.

Exemplo:

```text
VAF/IPM
↓
estimativa de repasse
```

isso ainda **não é arrecadação**.

Somente:

```text
Repasse efetivamente recebido
↓
Módulo 8
↓
Revenue
```

---

## Módulo 8 — Financeiro e Contábil

Responsável pelo dinheiro e seus registros oficiais:

```text
Receita Orçamentária
Arrecadação
Empenho
Liquidação
Pagamento
Banco
Conciliação
Contabilidade
PPA/LDO/LOA
Prestação de Contas
```

---

# 4. O que existe hoje no banco

O schema atual já possui uma base relevante:

```text
FinancialYear
BudgetUnit
ResourceSource
RevenueNature
ExpenseNature
BudgetAppropriation
BudgetReservation
Revenue
Expense
Commitment
Settlement
Payment
BankAccount
BankReconciliation
AccountingPlan
AccountingEntry
```

Essa estrutura demonstra que orçamento, receita, despesa, tesouraria e contabilidade já foram considerados.

O principal problema atual é que as entidades funcionam de forma muito independente.

---

# 5. Telas atuais

O menu atual possui aproximadamente:

```text
Painel Financeiro
Orçamento e Plano
Tesouraria / Contas
Gestão de Empenhos
Liquidações
Pagamentos
```

A parte operacional existente está muito mais próxima de um protótipo de execução de despesa que de um sistema financeiro e contábil municipal completo.

---

# 6. Diagnóstico consolidado

| Área | Situação atual |
|---|---|
| Painel financeiro | 🟡 |
| Exercício financeiro | 🟡 banco |
| PPA | 🔴 |
| LDO | 🔴 |
| LOA | 🔴 |
| Unidades orçamentárias | 🟡 banco |
| Fontes de recurso | 🟡 banco/usadas |
| Natureza da receita | 🟡 banco |
| Natureza da despesa | 🟡 banco |
| Dotações | ✅ consulta |
| Alterações orçamentárias | 🔴 |
| Reserva | 🟡 banco |
| Empenho | ✅ CRUD básico |
| Controle real do saldo | 🔴 |
| Liquidação | ✅ CRUD básico |
| Saldo a liquidar | 🔴 |
| Pagamento | ✅ CRUD básico |
| Validação financeira do pagamento | 🔴 |
| Retenções | 🔴 |
| Restos a pagar | 🔴 |
| Receita | 🟡 banco |
| Tributário → Financeiro | 🔴 |
| Inteligência Receita → Financeiro | 🔴 |
| Tesouraria | 🟡 contas |
| Movimento bancário | 🔴 |
| Conciliação | 🟡 banco |
| Plano de contas | 🟡 banco |
| Lançamentos contábeis | 🟡 banco |
| Partidas integradas | 🔴 |
| Fechamento | 🔴 |
| Relatórios fiscais | 🔴 |
| Prestação de contas | 🔴 |
| GED | 🔴 integração |
| Processos | 🔴 integração operacional |
| Compras | 🔴 integração |
| Contratos | 🔴 integração |
| RH/Folha | 🔴 integração |
| Patrimônio | 🔴 integração |
| Obras | 🟡 |
| Educação | 🔴 integração atual incorreta |
| Assistência | 🔴 integração atual incorreta |
| Cultura | 🟡 schema |
| Saneamento | 🔴 |
| Segurança | 🔴 |
| Saúde | 🔴 |
| Auditoria | 🔴 |

---

# 7. PRIORIDADE 0 — Migrar valores financeiros para Decimal

Hoje vários campos financeiros estão armazenados como `Float`.

Exemplos:

```text
Revenue.value
Expense.value
BudgetAppropriation.initialValue
BudgetAppropriation.updatedValue
BudgetAppropriation.committedValue
Commitment.value
Settlement.value
Payment.value
BankAccount.currentBalance
AccountingEntry.value
```

Isso deve ser corrigido antes de o módulo realizar cálculos financeiros confiáveis.

## Implementar

Utilizar `Decimal`.

Exemplo conceitual:

```prisma
Decimal @db.Decimal(15, 2)
```

ou precisão maior conforme necessidade.

Fazer a migração coordenadamente com o Módulo 7.

---

# 8. PRIORIDADE 0 — Relação Usuario ↔ Employee

Assim como nos módulos 3, 4, 5 e 7:

```text
Usuario
↓
Employee
↓
Department
↓
Secretariat
```

deve ser uma relação explícita.

Necessário para saber:

- quem realizou empenho;
- quem liquidou;
- quem atestou;
- quem autorizou;
- quem pagou;
- quem conciliou;
- quem fechou período;
- quem alterou orçamento.

---

# 9. PRIORIDADE 0 — Substituir Supplier como credor universal

Hoje:

```text
Commitment.supplierId
Payment.supplierId
```

tratam praticamente todo pagamento como pagamento de fornecedor.

Isso não atende:

- servidor;
- aposentado;
- pensionista;
- beneficiário social;
- agente cultural;
- INSS;
- RPPS;
- Receita Federal;
- consignatária;
- órgão público;
- convenente;
- outras pessoas e instituições.

## Criar conceito central

```text
Creditor
```

Pode representar:

```text
Person
Company
Employee
Supplier
GovernmentEntity
Other
```

Campos conceituais:

```text
id
type
personId?
companyId?
employeeId?
supplierId?
name
document
isActive
```

Dados bancários devem ser estruturados separadamente e com controle de acesso.

---

# 10. Supplier continua existindo

`Supplier` continua pertencendo ao domínio de Compras:

- habilitação;
- contatos;
- documentos;
- histórico comercial;
- contratos.

Mas Financeiro trabalha com:

```text
Creditor
```

Um Supplier pode possuir um Creditor correspondente.

---

# 11. PRIORIDADE 0 — Redefinir Expense

Hoje alguns módulos criam:

```text
Expense
status = Empenhada
```

sem existir `Commitment`.

Isso precisa ser eliminado.

## Decisão recomendada

Transformar `Expense` conceitualmente em:

```text
ExpenseRequest
```

ou:

> **Solicitação / Origem de Despesa**

Ela representa:

```text
Existe uma necessidade financeira
```

e não:

```text
A despesa já foi empenhada/paga
```

---

# 12. Execução oficial da despesa

Somente:

```text
BudgetReservation
↓
Commitment
↓
Settlement
↓
Payment
```

representa execução.

Dashboard não deverá mais usar `SUM(Expense)` como “despesa executada”.

---

# 13. Origem da despesa

A solicitação financeira deve guardar:

```text
sourceModule
sourceType
sourceId
requesterId
secretariatId
estimatedValue
description
status
```

Exemplos:

```text
COMPRAS / PURCHASE_REQUEST
RH / PAYROLL
SOCIAL / BENEFIT_CONCESSION
OBRAS / MEASUREMENT
CULTURA / PROJECT
SAUDE / SERVICE
```

---

# 14. PRIORIDADE 0 — Camada de serviços financeiros

Outros módulos não devem chamar diretamente:

```text
prisma.commitment.create()
prisma.payment.create()
prisma.revenue.create()
```

Criar serviços centralizados:

```text
lib/financeiro/
├── budget
├── expense-requests
├── reservations
├── commitments
├── settlements
├── payments
├── revenues
├── treasury
├── accounting
├── closing
└── integrations
```

---

# 15. Idempotência das integrações

Todo evento externo deve possuir:

```text
sourceModule
sourceType
sourceId
eventType
idempotencyKey
```

Exemplo:

```text
TaxPayment 123
```

só pode gerar uma receita.

```text
idempotencyKey =
TRIBUTARIO:TAX_PAYMENT:123:REVENUE
```

---

# 16. PLANEJAMENTO — PPA

Criar área:

```text
/financeiro/planejamento/ppa
```

## Estrutura

- período quadrienal;
- programa;
- objetivo;
- público-alvo;
- indicador;
- ação;
- produto;
- unidade;
- meta física;
- meta financeira;
- órgão;
- unidade;
- fonte.

## Integrações

Ações da LOA devem derivar ou vincular-se ao PPA quando exigido.

---

# 17. LDO

Criar:

```text
/financeiro/planejamento/ldo
```

Controlar:

- exercício;
- prioridades;
- metas;
- riscos;
- critérios fiscais;
- orientação para LOA;
- anexos/documentos.

---

# 18. LOA

Criar:

```text
/financeiro/orcamento/loa
```

Estrutura:

```text
Órgão
↓
Unidade Orçamentária
↓
Função/Subfunção
↓
Programa
↓
Ação
↓
Natureza
↓
Fonte
↓
Dotação
```

---

# 19. Exercício financeiro

Operacionalizar:

```text
FinancialYear
```

## Status

```text
Preparação
Aberto
Em Encerramento
Encerrado
```

Bloquear lançamentos incompatíveis com exercício encerrado.

---

# 20. Unidade Orçamentária

Criar CRUD e relação clara com:

```text
Secretariat
Department
```

Não presumir equivalência obrigatória.

Uma secretaria pode possuir mais de uma unidade orçamentária.

---

# 21. Fonte / Destinação de Recursos

Operacionalizar:

```text
ResourceSource
```

Controlar:

- código;
- descrição;
- origem;
- vinculação;
- exercício;
- status.

Usar em:

- orçamento;
- receita;
- empenho;
- conta bancária;
- disponibilidade;
- prestação de contas.

---

# 22. Natureza da Receita

Criar CRUD:

```text
RevenueNature
```

e hierarquia quando aplicável.

Mapeamentos devem ser parametrizados.

Exemplo:

```text
Tax(IPTU)
↓
RevenueNature(...)
```

---

# 23. Natureza da Despesa

Criar CRUD e estrutura hierárquica.

Usada em:

```text
BudgetAppropriation
Commitment
AccountingRule
```

---

# 24. Dotação

Evoluir `BudgetAppropriation`.

## Valores

Não manter apenas:

```text
initialValue
updatedValue
committedValue
```

Calcular/controlar:

```text
dotação inicial
+ créditos
- anulações
= dotação atualizada

dotação atualizada
- reservas ativas
- empenhos
= disponibilidade
```

---

# 25. Movimentação orçamentária

Criar entidade:

```text
BudgetMovement
```

Tipos:

```text
Dotação Inicial
Suplementação
Crédito Especial
Crédito Extraordinário
Anulação
Remanejamento
Transposição
Transferência
```

Campos:

```text
appropriationId
type
value
date
processId?
legalDocumentId?
reason
createdBy
```

---

# 26. Reserva Orçamentária

Operacionalizar `BudgetReservation`.

## Fluxo

```text
Solicitação de Despesa
↓
Dotação
↓
Verificar disponibilidade
↓
Reserva
```

## Regra

Reserva reduz disponibilidade, mas não é empenho.

---

# 27. Empenho

Manter:

```text
Ordinário
Estimativo
Global
```

## Campos adicionais

- credor;
- reserva de origem;
- processo;
- contrato;
- natureza;
- fonte;
- histórico;
- saldo;
- status;
- origem.

---

# 28. Validação obrigatória do Empenho

Antes de criar:

```text
valor <= disponibilidade
```

Nunca permitir empenho sem saldo, salvo fluxo legal específico e expressamente modelado.

---

# 29. Atualização da dotação

Ao emitir empenho:

```text
saldo empenhado
```

deve ser atualizado ou calculado a partir dos movimentos.

Evitar manter números derivados inconsistentes.

Preferir:

```text
SUM(Commitment ativos)
```

ou movimentos financeiros imutáveis, com materialização controlada para desempenho.

---

# 30. Reforço e anulação de empenho

Criar:

```text
CommitmentMovement
```

Tipos:

```text
Emissão
Reforço
Anulação Parcial
Anulação Total
```

Não editar silenciosamente o valor original.

---

# 31. Liquidação

A liquidação reconhece que:

> o bem foi entregue ou o serviço foi realizado e atestado.

## Regras

```text
liquidado acumulado
<=
valor empenhado vigente
```

Não permitir liquidação de empenho anulado.

---

# 32. Saldo do Empenho

Exibir:

```text
Valor Empenhado
Valor Liquidado
Saldo a Liquidar
Valor Pago
Saldo a Pagar
```

---

# 33. Documento e ateste

Liquidação deve vincular:

- documento fiscal;
- ateste;
- medição;
- recebimento;
- relatório;
- responsável.

Todos os arquivos oficiais via GED.

---

# 34. Pagamento

Pagamento deve nascer de obrigação liquidada.

Fluxo normal:

```text
Settlement
↓
Payment
```

Pagamento direto sem liquidação deve exigir tipo excepcional, permissão e justificativa.

---

# 35. Validações do pagamento

Antes de pagar:

```text
Payment.creditorId == Commitment.creditorId
```

e:

```text
Settlement.commitmentId == Payment.commitmentId
```

e:

```text
total pago <= total liquidado disponível
```

---

# 36. Pagamento parcial

Suportar:

```text
Liquidação R$ 100.000
Pagamento 1 R$ 60.000
Pagamento 2 R$ 40.000
```

Sem marcar como quitada antes da quitação real.

---

# 37. Retenções

Criar:

```text
PaymentRetention
```

Tipos configuráveis:

- INSS;
- IRRF;
- ISS;
- outras retenções tributárias;
- consignações;
- glosas;
- retenção contratual.

## Cálculo

```text
Valor bruto
- retenções
= valor líquido
```

---

# 38. Retenção gera obrigação

Uma retenção não desaparece.

Exemplo:

```text
IRRF retido
↓
obrigação de recolhimento
↓
vencimento
↓
pagamento/recolhimento
```

Criar:

```text
WithholdingPayable
```

ou entidade de obrigação financeira compatível.

---

# 39. Ordem de Pagamento

Criar entidade/documento quando necessário:

```text
PaymentOrder
```

Pode agrupar um ou mais pagamentos autorizados.

---

# 40. Pagamentos em lote

Suportar:

- folha;
- fornecedores;
- benefícios;
- retenções;
- transferências.

Com arquivo/API bancária quando aplicável.

---

# 41. Restos a Pagar

Ao encerrar exercício:

```text
Empenho não pago
↓
classificação
```

## Tipos

```text
Processado
Não Processado
```

Criar entidade ou marcação com histórico.

---

# 42. Cancelamento / reinscrição de restos

Controlar:

- inscrição;
- pagamento;
- cancelamento;
- prescrição;
- reinscrição, quando aplicável;
- exercício de origem.

---

# 43. RECEITA — Conceitos

Separar:

```text
Prevista
Lançada
Arrecadada
```

## Prevista

LOA.

## Lançada

Módulo tributário ou outra obrigação de receita.

## Arrecadada

Recebimento financeiro efetivo.

---

# 44. Revenue

`Revenue` deve representar a entrada financeira/orçamentária confirmada.

Campos essenciais:

```text
date
value
revenueNatureId
resourceSourceId
bankAccountId
history
sourceModule
sourceType
sourceId
status
```

---

# 45. Tributário → Financeiro

Fluxo obrigatório:

```text
TaxAssessment
↓
TaxGuide
↓
TaxPayment
↓
RevenueIntegrationEvent
↓
Revenue
↓
TreasuryMovement
↓
AccountingTransaction
```

---

# 46. Mapeamento Tributário

Cada `Tax` precisa ter configuração financeira:

```text
RevenueNature
ResourceSource
AccountingRule
```

Não hardcodar.

---

# 47. Inteligência da Receita → Financeiro

O novo módulo de Inteligência da Receita poderá fornecer:

- previsão;
- memória de cálculo;
- IPM;
- dados de repasses;
- expectativa.

Mas somente o recebimento real gera `Revenue`.

Exemplo:

```text
IPM prevê R$ X
```

não movimenta caixa.

```text
Transferência estadual creditada
```

sim.

---

# 48. Transferências constitucionais e legais

Criar origem de receita para:

- ICMS;
- FPM;
- IPVA;
- FUNDEB;
- SUS;
- demais repasses.

Podem ser integradas via:

- arquivo;
- extrato;
- API oficial;
- importação bancária.

---

# 49. Convênios e transferências voluntárias

Criar:

```text
Agreement
AgreementTransfer
AgreementExpenseLink
```

ou reutilizar modelo de convênio existente, se houver.

Controlar:

- concedente;
- objeto;
- conta específica;
- fonte;
- valor;
- vigência;
- repasses;
- contrapartida;
- execução;
- prestação.

---

# 50. Saneamento → Financeiro

Fluxo:

```text
SanInvoice
↓
Pagamento confirmado
↓
Revenue
↓
TreasuryMovement
↓
Contabilidade
```

Emitir conta não significa arrecadar.

---

# 51. Segurança / Multas

Não criar receita diretamente no módulo Segurança.

Fluxo recomendado:

```text
Infração
↓
Módulo 7
TaxAssessment / Guia
↓
TaxPayment
↓
Módulo 8
Revenue
```

---

# 52. Meio Ambiente

Taxas e multas:

```text
Licença / Infração
↓
Tributário
↓
Guia
↓
Pagamento
↓
Financeiro
```

---

# 53. Outras Receitas

Criar fluxo controlado para:

- alienação de bens;
- rendimentos;
- indenizações;
- restituições;
- devoluções;
- tarifas;
- serviços;
- outras receitas.

---

# 54. TESOURARIA — Conceito

Conta bancária não é Tesouraria.

Criar camada de movimentação:

```text
TreasuryMovement
```

Tipos:

```text
Revenue
Payment
Transfer
Application
Redemption
Yield
Refund
Adjustment
OpeningBalance
```

---

# 55. BankAccount

Manter cadastro:

- banco;
- agência;
- conta;
- tipo;
- fonte;
- finalidade;
- status.

## Corrigir

`currentBalance` não deve ser livremente editável no uso normal.

Saldo deve resultar dos movimentos.

---

# 56. Saldo inicial

Na implantação:

```text
OpeningBalance
```

gera movimento de abertura auditado.

Depois disso, saldo deriva da movimentação.

---

# 57. Transferências bancárias

Criar:

```text
TreasuryTransfer
```

Fluxo transacional:

```text
Conta A - valor
Conta B + valor
```

Uma única operação.

---

# 58. Aplicações financeiras

Controlar:

- aplicação;
- resgate;
- rendimento;
- conta;
- fonte;
- valor;
- data.

Rendimento gera receita conforme classificação.

---

# 59. Boletim diário

Gerar:

- saldo inicial;
- entradas;
- saídas;
- transferências;
- aplicações;
- saldo final.

Por conta e consolidado.

---

# 60. Fluxo de caixa

Exibir:

- previsto;
- realizado;
- compromissos;
- pagamentos futuros;
- receitas previstas;
- disponibilidade.

---

# 61. Conciliação bancária

Operacionalizar `BankReconciliation`.

## Fluxo

```text
Extrato
↓
Importação
↓
BankStatementItem
↓
Matching
↓
TreasuryMovement
↓
Conciliado / Divergente
```

---

# 62. Extrato bancário

Criar:

```text
BankStatementImport
BankStatementItem
```

Suportar adapters para:

- OFX;
- CNAB;
- CSV;
- API bancária, quando disponível.

---

# 63. Matching

Automático por:

- data;
- valor;
- documento;
- identificador;
- PIX;
- referência.

E manual quando necessário.

---

# 64. Divergências

Exemplos:

- crédito bancário sem Revenue;
- Revenue sem crédito bancário;
- pagamento sem débito;
- tarifa;
- estorno;
- diferença de valor.

Devem permanecer visíveis até justificativa.

---

# 65. CONTABILIDADE — Plano de Contas

Operacionalizar:

```text
AccountingPlan
```

Evoluir para estrutura hierárquica e vigência por exercício.

Campos:

```text
code
name
level
parentId
accountType
nature
isAnalytical
isActive
validFrom
validTo
```

---

# 66. AccountingTransaction

Criar entidade agregadora:

```text
AccountingTransaction
```

Campos:

```text
id
date
history
sourceModule
sourceType
sourceId
status
createdBy
postedAt
```

---

# 67. AccountingEntry

Cada transação possui:

```text
AccountingEntry[]
```

com:

```text
accountId
debit
credit
resourceSourceId?
budgetUnitId?
```

---

# 68. Regra fundamental

Antes de contabilizar:

```text
Σ débitos = Σ créditos
```

Transação desequilibrada não pode ser postada.

---

# 69. Eventos contábeis

Criar catálogo:

```text
AccountingEvent
AccountingEventRule
```

Exemplos:

```text
REVENUE_RECEIVED
COMMITMENT_ISSUED
SETTLEMENT_RECOGNIZED
PAYMENT_EXECUTED
ASSET_ACQUIRED
ASSET_DEPRECIATION
ASSET_WRITEOFF
BANK_YIELD
```

---

# 70. Lançamentos automáticos

Os módulos não escolhem manualmente contas contábeis em cada operação comum.

Usar regras configuradas.

Exemplo:

```text
TaxPayment IPTU
↓
REVENUE_RECEIVED
↓
regra contábil
↓
AccountingTransaction
```

---

# 71. Diário

Criar relatório:

```text
/financeiro/contabilidade/diario
```

---

# 72. Razão

Criar:

```text
/financeiro/contabilidade/razao
```

por conta/período.

---

# 73. Balancete

Gerar por:

- conta;
- nível;
- período;
- unidade;
- fonte.

---

# 74. Balanços e demonstrativos

Estruturar geração de demonstrativos exigidos conforme configuração e layout aplicável.

Não hardcodar prestação de contas de apenas um estado.

---

# 75. Fechamento mensal

Criar:

```text
FinancialClosing
```

Antes de fechar mês, validar pendências.

---

# 76. Central de Pendências de Fechamento

Exemplos:

```text
Pagamento sem liquidação
Empenho acima de dotação
Receita sem natureza
Conta não conciliada
Lançamento contábil desequilibrado
Movimento sem fonte
Documento obrigatório ausente
Retenção não recolhida
```

---

# 77. Fechamento anual

Além do mensal:

- restos a pagar;
- saldos;
- exercício;
- transferências;
- conciliações;
- inventário;
- contabilidade;
- relatórios.

Não permitir encerrar com inconsistências críticas.

---

# 78. Adiantamentos / Suprimento de Fundos

Criar fluxo:

```text
Solicitação
↓
Processo
↓
Autorização
↓
Empenho
↓
Pagamento ao responsável
↓
Prestação de contas
↓
Aprovação
↓
Devolução, se necessário
```

---

# 79. Integração GED dos adiantamentos

Guardar:

- autorização;
- comprovantes;
- notas;
- relatório;
- devolução.

---

# 80. PRESTAÇÃO DE CONTAS

Criar Central:

```text
/financeiro/prestacao-contas
```

Destinos podem incluir:

- TCE;
- STN;
- SICONFI;
- Câmara;
- controle interno;
- concedentes;
- transparência.

---

# 81. Fluxo de prestação

```text
Gerar
↓
Validar
↓
Exportar / Enviar
↓
Protocolo
↓
Retorno
↓
Pendências
↓
Correção
↓
Reenvio
```

---

# 82. Arquitetura por adapter

Layouts variam por órgão/UF.

Criar:

```text
lib/financeiro/reporting/
├── federal/
├── rs/
├── sc/
├── mg/
└── ...
```

Não misturar regras estaduais no domínio financeiro principal.

---

# 83. INTEGRAÇÃO — COMPRAS

Fluxo completo:

```text
PurchaseRequest
↓
Análise Orçamentária
↓
BudgetReservation
↓
PurchaseProcess
↓
Fornecedor
↓
Contract
↓
Commitment
↓
Recebimento / Medição
↓
Settlement
↓
Payment
```

---

# 84. PurchaseRequest → Processo de Compra

Criar relação explícita.

Recomendação:

```text
PurchaseProcessRequest
```

porque um processo pode consolidar várias solicitações.

---

# 85. PurchaseRequest → Reserva

Uma solicitação pode usar:

- uma dotação;
- várias dotações;
- várias fontes.

Criar:

```text
PurchaseRequestBudgetAllocation
```

com:

```text
purchaseRequestId
appropriationId
resourceSourceId
estimatedValue
reservationId?
```

---

# 86. Bloquear compra sem orçamento quando aplicável

Antes de avançar para contratação:

```text
valor previsto
<=
recursos reservados
```

Tratamentos excepcionais precisam de fluxo específico.

---

# 87. Contrato → Empenhos

Contrato pode ter vários empenhos.

Criar:

```text
ContractCommitment
```

ou relação direta 1:N apropriada.

Não limitar contrato a um único empenho.

---

# 88. Aditivo contratual

Antes de aumento de valor:

```text
verificar disponibilidade
↓
nova reserva / reforço
↓
aditivo
```

Não permitir aditivo financeiro sem impacto orçamentário refletido.

---

# 89. Recebimento de Compra

Criar entidade transversal:

```text
GoodsReceipt
```

Dados:

- contrato;
- processo;
- fornecedor;
- empenho;
- documento fiscal;
- data;
- responsável;
- status.

---

# 90. GoodsReceiptItem

Cada item indica:

- produto/serviço;
- quantidade;
- valor;
- material?;
- patrimônio?;
- serviço?;
- aceito/rejeitado.

---

# 91. Compra de material

```text
GoodsReceipt
↓
MaterialMovement Entrada
↓
MaterialStock
↓
Ateste
↓
Settlement
```

---

# 92. Compra de bem permanente

```text
GoodsReceipt
↓
Asset
↓
Tombamento
↓
Ateste
↓
Settlement
```

---

# 93. Compra de serviço

```text
GoodsReceipt / ServiceAcceptance
↓
Ateste
↓
Settlement
```

---

# 94. Nota fiscal

Documento fiscal é:

```text
Document
```

no GED.

Não guardar apenas texto como `documentRef`.

---

# 95. INTEGRAÇÃO — RH / FOLHA

Fluxo:

```text
Payroll
↓
Fechamento
↓
PayrollFinancialObligation[]
↓
Commitment
↓
Settlement
↓
Payment
```

---

# 96. Obrigações da folha

Separar:

```text
Salário líquido
INSS / RPPS
IRRF
Consignações
Benefícios
Encargos patronais
Outras obrigações
```

---

# 97. PayrollEvent → Financeiro

Adicionar parametrização:

```text
ExpenseNature
AccountingRule
CreditorRule
BudgetRule
```

Não hardcodar.

---

# 98. Credor da folha

Pode ser:

- servidor;
- RPPS;
- INSS;
- Receita Federal;
- banco;
- operadora;
- consignatária.

Por isso `Creditor` é obrigatório.

---

# 99. Empenho da folha

Não é obrigatório criar um empenho por servidor.

Permitir consolidação por:

- unidade;
- natureza;
- fonte;
- evento/grupo.

Manter rastreabilidade até a folha e itens.

---

# 100. Pagamento individual

Tesouraria pode detalhar beneficiários em arquivo/lote bancário.

Financeiro deve conseguir reconciliar:

```text
total lote
==
total obrigação
```

---

# 101. INTEGRAÇÃO — PATRIMÔNIO

Compra de ativo:

```text
Compras
↓
GoodsReceipt
↓
Asset
↓
AccountingEvent
```

A despesa não nasce no tombamento; já foi executada no Financeiro.

---

# 102. Asset — origem

Adicionar:

```text
acquisitionType
goodsReceiptId?
contractId?
commitmentId?
invoiceDocumentId?
```

---

# 103. Depreciação

Usar:

```text
AssetCategory.lifeSpan
Asset.acquisitionValue
```

para cálculo parametrizado.

Depreciação:

```text
não movimenta caixa
↓
gera AccountingTransaction
```

---

# 104. Baixa patrimonial

```text
AssetWriteOff
↓
AccountingTransaction
```

Se houver alienação:

```text
Recebível
↓
Revenue
↓
Treasury
```

---

# 105. INTEGRAÇÃO — ALMOXARIFADO

Entrada por compra deve vir de:

```text
GoodsReceipt
```

e produzir:

```text
MaterialMovement
MaterialStock
```

---

# 106. Saída interna não gera nova despesa

Exemplo:

```text
Compra de papel
↓
Empenho/Pagamento
↓
Estoque
↓
Secretaria retira papel
```

A retirada não cria novo empenho.

Pode gerar evento de consumo patrimonial/contábil conforme necessidade.

---

# 107. Estoque mínimo

Quando estoque ficar abaixo do mínimo:

```text
MaterialStock
↓
Necessidade
↓
PurchaseRequest
```

Não gerar despesa automaticamente.

---

# 108. INTEGRAÇÃO — OBRAS

Já existe boa base:

```text
ObrasServico
↔ BudgetAppropriation
↔ Commitment
```

e validação entre empenho e dotação.

Manter e aprofundar.

---

# 109. Obras — materiais

A função atual de saída de material já:

- valida saldo;
- atualiza estoque;
- cria movimento;
- preserva custo.

Manter esse princípio.

Não gerar nova despesa pela saída.

---

# 110. Obras — medições

Criar integração:

```text
ObrasMedicao
↓
Aprovação
↓
Settlement
↓
Payment
```

Campos:

```text
settlementId
contractId
commitmentId
```

ou tabela de vínculo se medição puder distribuir valor entre empenhos.

---

# 111. Medição parcial

Suportar:

```text
Contrato R$ 1.000.000
Medição 1 R$ 100.000
Medição 2 R$ 150.000
...
```

Cada aprovação gera liquidação correspondente.

---

# 112. INTEGRAÇÃO — EDUCAÇÃO

Remover imediatamente a lógica que:

- procura primeira secretaria;
- pega primeira dotação;
- cria `Expense`;
- marca como “Empenhada”.

Isso não representa execução válida.

---

# 113. Merenda com estoque próprio

```text
Compras
↓
Estoque
↓
Merenda
↓
MaterialMovement Saída
```

Sem nova execução financeira.

---

# 114. Merenda terceirizada

```text
Contract
↓
Commitment
↓
Execução / ateste
↓
Settlement
↓
Payment
```

---

# 115. Transporte Escolar

Veículo próprio:

```text
SchoolBus
↔ Asset
```

Custos:

- combustível;
- manutenção;
- peças;
- contratos;

passam por Compras/Financeiro.

---

# 116. INTEGRAÇÃO — ASSISTÊNCIA SOCIAL

Remover lógica:

```text
SocialBenefit criado
→ Expense
```

ou:

```text
SocialProgram criado
→ Expense
```

O cadastro do programa não é gasto.

---

# 117. Concessão financeira

O fato gerador é:

```text
SocialBenefitConcession
```

Fluxo:

```text
Concessão aprovada
↓
ExpenseRequest
↓
Creditor = beneficiário
↓
Commitment
↓
Settlement
↓
Payment
```

---

# 118. Benefício material

Se houver estoque:

```text
Concessão
↓
MaterialMovement Saída
```

Sem novo pagamento.

---

# 119. INTEGRAÇÃO — CULTURA

O schema já prevê vínculos úteis:

```text
CulturaProjeto
├── appropriationId
├── commitmentId
├── purchaseProcessId
└── contractId
```

Transformar isso em fluxo real.

---

# 120. Fomento e premiação

Agente cultural:

```text
Person ou Company
↓
Creditor
```

Fluxo:

```text
Projeto/Edital
↓
Aprovação
↓
Reserva
↓
Empenho
↓
Pagamento
↓
Prestação de Contas
```

---

# 121. INTEGRAÇÃO — SAÚDE

Principais impactos:

- medicamentos;
- materiais;
- equipamentos;
- serviços;
- contratos;
- folha.

Toda aquisição passa por Compras/Financeiro.

---

# 122. Estoque da Saúde

Se Saúde possuir estoque especializado, cada entrada deve preservar origem:

```text
GoodsReceipt
Supplier
Invoice
PurchaseProcess
Contract
UnitCost
```

Mesmo que não use diretamente `MaterialStock`.

---

# 123. INTEGRAÇÃO — SANEAMENTO

`SanInvoice` é título/fatura, não arrecadação.

Adicionar:

```text
SanPayment
```

ou integração financeira equivalente.

Fluxo:

```text
SanInvoice
↓
Pagamento
↓
Revenue
↓
TreasuryMovement
```

---

# 124. Cadastro do consumidor

Evitar `ownerName` / `ownerDocument` como única identificação.

Vincular:

```text
Person
Company
Taxpayer
```

quando disponível.

---

# 125. INTEGRAÇÃO — SEGURANÇA E MOBILIDADE

Multas:

```text
SegurancaInfracao
↓
Módulo Tributário
↓
Guia
↓
TaxPayment
↓
Financeiro
```

Não simplesmente:

```text
status = Pago
```

sem arrecadação.

---

# 126. INTEGRAÇÃO — MEIO AMBIENTE

Taxas e multas:

```text
Meio Ambiente
↓
Tributário
↓
TaxAssessment
↓
TaxGuide
↓
TaxPayment
↓
Financeiro
```

---

# 127. INTEGRAÇÃO — TRIBUTÁRIO

É uma das integrações prioritárias.

Criar:

```text
RevenueIntegrationEvent
```

Campos:

```text
sourceType
sourceId
taxPaymentId
revenueNatureId
resourceSourceId
value
status
processedAt
error
idempotencyKey
```

---

# 128. Não duplicar arrecadação

Se evento já processado:

```text
não gerar novo Revenue
```

---

# 129. Estorno tributário

Se `TaxPayment` for estornado:

```text
evento reverso
↓
Revenue reversal
↓
Treasury
↓
Accounting
```

Não apagar registro original.

---

# 130. INTEGRAÇÃO — INTELIGÊNCIA DA RECEITA

O novo módulo fornece:

- estimativas;
- repasses esperados;
- IPM;
- histórico;
- origem do repasse.

Financeiro registra:

```text
recebimento efetivo
```

---

# 131. Repasse recebido

Pode existir:

```text
SharedRevenueTransfer
```

vinculando:

```text
RevenueIntelligence origin?
Revenue
BankStatementItem
```

---

# 132. INTEGRAÇÃO — PROCESSOS E PROTOCOLOS

Não recriar workflow administrativo.

Usar `Process` para:

- alteração orçamentária;
- crédito adicional;
- adiantamento;
- pagamento excepcional;
- prestação de contas;
- convênio;
- reconhecimento;
- cancelamentos críticos;
- restituições.

---

# 133. Relação Financeiro ↔ Process

Entidades relevantes podem possuir:

```text
processId?
```

ou tabelas de vínculo quando N:N.

---

# 134. INTEGRAÇÃO — GED

O GED é fonte única documental.

Usar `Document` para:

- LOA;
- LDO;
- PPA;
- empenho;
- nota fiscal;
- ateste;
- liquidação;
- ordem de pagamento;
- comprovante;
- extrato;
- conciliação;
- contrato;
- medição;
- convênio;
- prestação;
- relatórios;
- balancetes.

---

# 135. Documento não é fileUrl paralelo

Criar tabelas de vínculo conforme domínio.

Exemplo:

```text
SettlementDocument
PaymentDocument
BankReconciliationDocument
FinancialClosingDocument
```

sempre apontando para `Document`.

---

# 136. AUDITORIA

Registrar ações críticas.

## Orçamento

- dotação;
- suplementação;
- anulação;
- remanejamento;
- reserva.

## Despesa

- empenho;
- reforço;
- anulação;
- liquidação;
- estorno;
- pagamento.

## Receita

- entrada;
- estorno;
- reclassificação.

## Tesouraria

- movimento;
- transferência;
- conciliação;
- ajuste.

## Contabilidade

- lançamento;
- estorno;
- reabertura;
- fechamento.

---

# 137. Log mínimo

```text
userId
employeeId
action
entityType
entityId
before
after
reason
processId?
createdAt
```

---

# 138. Não excluir lançamentos financeiros

Regra:

> documentos e movimentos financeiros oficiais não devem ser apagados fisicamente no fluxo normal.

Usar:

- anulação;
- estorno;
- reversão;
- cancelamento;
- retificação.

Sempre mantendo histórico.

---

# 139. PERFIS

## Planejamento

- PPA;
- LDO;
- LOA;
- alterações.

## Orçamento

- dotação;
- reserva;
- empenho.

## Liquidação

- ateste;
- documentos;
- liquidação.

## Tesouraria

- pagamentos;
- bancos;
- conciliação.

## Contabilidade

- eventos;
- lançamentos;
- fechamento.

## Gestor Financeiro

- supervisão e aprovação.

## Controle Interno

- leitura/auditoria.

## Administrador

- parâmetros.

---

# 140. Segregação de funções

Evitar que a mesma pessoa execute todas as etapas sem controle.

Exemplo configurável:

```text
Solicita
≠
Empenha
≠
Atesta
≠
Paga
```

Para municípios pequenos, permitir perfis acumulados com auditoria reforçada.

---

# 141. Painel Financeiro — corrigir conceitos

Hoje o painel usa `Revenue` e `Expense` de forma incompleta.

Novo painel deve separar:

## Receita

```text
Prevista
Lançada
Arrecadada
```

## Despesa

```text
Dotação
Reservada
Empenhada
Liquidada
Paga
```

---

# 142. Indicadores

- receita prevista;
- receita arrecadada;
- arrecadação do mês;
- despesa empenhada;
- liquidada;
- paga;
- resultado;
- disponibilidade;
- contas bancárias;
- conciliações pendentes;
- restos;
- retenções;
- empenhos a liquidar;
- liquidações a pagar;
- fontes críticas.

---

# 143. Relatórios orçamentários

- dotação;
- saldo;
- execução;
- fonte;
- unidade;
- natureza;
- programa;
- ação;
- função;
- subfunção.

---

# 144. Relatórios de despesa

- empenhos;
- liquidações;
- pagamentos;
- credores;
- contratos;
- unidades;
- fontes;
- restos.

---

# 145. Relatórios de receita

- natureza;
- fonte;
- arrecadação;
- origem;
- período;
- Tributário;
- transferências;
- saneamento;
- repasses.

---

# 146. Relatórios bancários

- extrato interno;
- saldo;
- conciliações;
- transferências;
- aplicações;
- rendimentos.

---

# 147. Relatórios contábeis

- diário;
- razão;
- balancete;
- saldos;
- lançamentos;
- eventos;
- inconsistências.

---

# 148. Busca e paginação

Todas as telas devem possuir:

- busca server-side;
- filtros;
- paginação;
- ordenação;
- exportação conforme permissão.

Eliminar consultas limitadas sem navegação.

---

# 149. Menu recomendado

```text
Financeiro e Contábil
│
├── Painel
│
├── Planejamento
│   ├── PPA
│   ├── LDO
│   └── LOA
│
├── Orçamento
│   ├── Dotações
│   ├── Reservas
│   ├── Alterações
│   └── Execução
│
├── Despesas
│   ├── Solicitações
│   ├── Empenhos
│   ├── Liquidações
│   ├── Pagamentos
│   ├── Retenções
│   └── Restos a Pagar
│
├── Receitas
│   ├── Arrecadação
│   ├── Transferências
│   └── Outras Receitas
│
├── Tesouraria
│   ├── Contas
│   ├── Movimentos
│   ├── Transferências
│   ├── Aplicações
│   ├── Conciliação
│   └── Fluxo de Caixa
│
├── Contabilidade
│   ├── Plano de Contas
│   ├── Eventos
│   ├── Lançamentos
│   ├── Diário
│   ├── Razão
│   ├── Balancete
│   └── Fechamento
│
├── Convênios / Adiantamentos
├── Prestação de Contas
├── Relatórios
├── Auditoria
└── Configurações
```

---

# 150. Ordem recomendada de implementação

## Sprint 1 — Fundação financeira

- [ ] migrar Float → Decimal;
- [ ] Usuario ↔ Employee;
- [ ] `Creditor`;
- [ ] redefinir `Expense` como solicitação;
- [ ] camada `lib/financeiro`;
- [ ] idempotência;
- [ ] auditoria;
- [ ] exercício;
- [ ] unidades;
- [ ] fontes;
- [ ] naturezas.

---

## Sprint 2 — Orçamento

- [ ] PPA básico;
- [ ] LDO básico;
- [ ] LOA;
- [ ] dotações;
- [ ] movimentos;
- [ ] disponibilidade;
- [ ] reservas;
- [ ] alterações orçamentárias.

---

## Sprint 3 — Despesa íntegra

- [ ] empenho;
- [ ] reforço/anulação;
- [ ] saldos;
- [ ] liquidação;
- [ ] documentos GED;
- [ ] pagamentos;
- [ ] pagamento parcial;
- [ ] validações;
- [ ] retenções.

---

## Sprint 4 — Tesouraria

- [ ] `TreasuryMovement`;
- [ ] saldo derivado;
- [ ] transferências;
- [ ] aplicações;
- [ ] extratos;
- [ ] conciliação;
- [ ] boletim;
- [ ] fluxo de caixa.

---

## Sprint 5 — Receita

- [ ] `Revenue` operacional;
- [ ] Tributário → Financeiro;
- [ ] estornos;
- [ ] transferências;
- [ ] Inteligência Receita → Financeiro;
- [ ] Saneamento;
- [ ] outras receitas.

---

## Sprint 6 — Contabilidade

- [ ] plano de contas;
- [ ] `AccountingTransaction`;
- [ ] entries débito/crédito;
- [ ] eventos;
- [ ] regras;
- [ ] lançamentos automáticos;
- [ ] Diário;
- [ ] Razão;
- [ ] Balancete.

---

## Sprint 7 — Compras / Contratos / Patrimônio

- [ ] PurchaseRequest ↔ Reserva;
- [ ] processo ↔ solicitações;
- [ ] contrato ↔ empenhos;
- [ ] aditivos;
- [ ] GoodsReceipt;
- [ ] estoque;
- [ ] patrimônio;
- [ ] liquidação pelo recebimento.

---

## Sprint 8 — RH / Social / Cultura / Educação / Obras

- [ ] folha → obrigações;
- [ ] credores;
- [ ] pagamentos de folha;
- [ ] concessões sociais;
- [ ] fomento cultural;
- [ ] corrigir merenda;
- [ ] medições → liquidação;
- [ ] demais integrações.

---

## Sprint 9 — Fechamento e obrigações

- [ ] restos a pagar;
- [ ] fechamento mensal;
- [ ] fechamento anual;
- [ ] central de pendências;
- [ ] adiantamentos;
- [ ] convênios.

---

## Sprint 10 — Prestação e gestão

- [ ] relatórios;
- [ ] prestação de contas;
- [ ] adapters;
- [ ] dashboards;
- [ ] exportações;
- [ ] alertas;
- [ ] auditoria avançada.

---

# 151. Critérios de aceite — Orçamento

O sistema deve permitir:

1. abrir exercício;
2. cadastrar estrutura orçamentária;
3. importar/cadastrar LOA;
4. criar dotação;
5. alterar orçamento com histórico;
6. reservar;
7. impedir reserva acima da disponibilidade;
8. liberar/cancelar reserva;
9. gerar empenho;
10. manter saldo consistente.

---

# 152. Critérios de aceite — Despesa

1. criar necessidade;
2. reservar;
3. empenhar;
4. reforçar/anular;
5. receber bem/serviço;
6. liquidar;
7. impedir liquidação acima do empenho;
8. calcular retenções;
9. pagar;
10. impedir pagamento acima do liquidado;
11. atualizar banco;
12. contabilizar;
13. auditar.

---

# 153. Critérios de aceite — Receita

1. registrar receita prevista;
2. receber evento Tributário;
3. gerar `Revenue` uma única vez;
4. classificar natureza/fonte;
5. vincular conta;
6. registrar movimento;
7. conciliar;
8. contabilizar;
9. estornar corretamente;
10. receber transferências compartilhadas.

---

# 154. Critérios de aceite — Tesouraria

1. cadastrar conta;
2. registrar saldo inicial;
3. receber entradas;
4. receber pagamentos;
5. transferir entre contas;
6. importar extrato;
7. conciliar;
8. identificar divergências;
9. fechar boletim;
10. consultar saldo confiável.

---

# 155. Critérios de aceite — Contabilidade

1. possuir plano;
2. configurar evento;
3. gerar transação;
4. produzir débito/crédito;
5. validar equilíbrio;
6. postar;
7. estornar;
8. consultar Diário;
9. consultar Razão;
10. gerar Balancete;
11. fechar período.

---

# 156. Critérios de aceite — Compras

1. solicitação possui orçamento;
2. reserva é criada;
3. processo conhece solicitações;
4. contrato conhece empenhos;
5. aditivo verifica saldo;
6. recebimento integra estoque/patrimônio;
7. recebimento aprovado gera liquidação;
8. pagamento respeita contrato/empenho.

---

# 157. Critérios de aceite — RH

1. fechar folha;
2. gerar obrigações;
3. mapear naturezas;
4. mapear credores;
5. gerar empenhos;
6. liquidar;
7. criar lote;
8. pagar servidores/órgãos;
9. tratar retenções;
10. contabilizar.

---

# 158. Critérios de aceite — Patrimônio

1. bem adquirido nasce do recebimento;
2. mantém origem;
3. não duplica despesa;
4. deprecia contabilmente;
5. baixa gera evento;
6. alienação pode gerar receita;
7. documentos ficam no GED.

---

# 159. Critérios de aceite — Integrações

Nenhum módulo operacional pode:

- criar empenho paralelo;
- marcar despesa como empenhada sem `Commitment`;
- marcar receita paga sem `Revenue`;
- movimentar `currentBalance` diretamente;
- criar lançamento contábil sem regra;
- duplicar documento fora do GED.

---

# 160. Correções específicas no código atual

## Painel

Remover:

```text
Despesas = SUM(Expense)
```

como interpretação de despesa empenhada/paga.

Calcular:

```text
Empenhado = Commitments
Liquidado = Settlements
Pago = Payments
```

por período/exercício adequado.

---

## “Arrecadação”

Garantir que seja baseada em `Revenue` confirmado e integrada às origens.

---

## Dotações

Ao criar empenho, refletir compromisso no saldo.

---

## Empenhos

Bloquear valor maior que disponibilidade.

---

## Liquidação

Atualizar status/saldos do empenho.

Bloquear excesso.

---

## Pagamento

Não escolher fornecedor independentemente do empenho.

Credor deve vir da obrigação.

---

## Payment ↔ Settlement

Validar vínculo.

---

## Conta bancária

Pagamento gera saída.

Receita gera entrada.

---

## currentBalance

Não editar como saldo operacional.

---

## Educação

Remover criação automática de `Expense` usando primeira secretaria/dotação.

---

## Assistência

Remover criação de `Expense` no cadastro do benefício/programa.

---

# 161. Modelo de evento financeiro entre módulos

Sugestão:

```text
FinancialIntegrationEvent
```

Campos:

```text
id
sourceModule
sourceType
sourceId
eventType
payload
idempotencyKey
status
attempts
lastError
createdAt
processedAt
```

---

# 162. Exemplos de eventos

```text
TAX_PAYMENT_CONFIRMED
SHARED_REVENUE_RECEIVED
PURCHASE_REQUEST_APPROVED
CONTRACT_SIGNED
GOODS_RECEIVED
WORK_MEASUREMENT_APPROVED
PAYROLL_CLOSED
SOCIAL_BENEFIT_GRANTED
ASSET_WRITTEN_OFF
SANITATION_PAYMENT_CONFIRMED
```

---

# 163. Por que usar eventos

Evita acoplamento:

```text
Tributário não precisa saber como Contabilidade funciona.
```

Ele apenas publica:

```text
TaxPayment confirmado
```

Financeiro processa.

---

# 164. Consistência transacional

Operações internas críticas devem usar `$transaction`.

Exemplos:

```text
Payment
+
TreasuryMovement
+
status do Settlement
+
evento contábil
```

Caso uma etapa falhe, evitar estado parcialmente concluído.

---

# 165. Processamento assíncrono

Para integrações não críticas em tempo real:

- contabilidade;
- relatórios;
- exportações;
- arquivos bancários;

pode usar fila persistente.

Mas o usuário deve visualizar:

```text
Pendente
Processando
Concluído
Falhou
```

---

# 166. Segurança

Dados financeiros exigem:

- autenticação;
- permissão por função;
- escopo;
- logs;
- justificativa;
- trilha.

Nunca expor contas ou informações bancárias em módulos públicos sem necessidade.

---

# 167. Segredos bancários

Tokens, certificados e credenciais:

- não ficam em código;
- não ficam em campos comuns;
- usar secret management;
- rotação;
- menor privilégio.

---

# 168. Documentos financeiros

GED deve possuir classificação adequada:

```text
Financeiro
├── Orçamento
├── Empenhos
├── Liquidações
├── Pagamentos
├── Extratos
├── Conciliações
├── Convênios
├── Prestação de Contas
└── Contabilidade
```

---

# 169. Resultado arquitetural esperado

```text
                       CELERIFLOW

          ┌──────────── ORIGENS DE DESPESA ────────────┐
          │                                             │
      Compras   RH   Obras   Social   Cultura   Educação
          │                                             │
          └─────────────────────┬───────────────────────┘
                                ↓
                      MÓDULO 8 — FINANCEIRO
                                │
                         Reserva/Empenho
                                ↓
                           Liquidação
                                ↓
                            Pagamento
                                ↓
                           Tesouraria
                                ↓
                         Contabilidade

          ┌──────────── ORIGENS DE RECEITA ────────────┐
          │                                             │
    Tributário  Inteligência Receita  Saneamento  Outros
          │                                             │
          └─────────────────────┬───────────────────────┘
                                ↓
                             Revenue
                                ↓
                           Tesouraria
                                ↓
                         Contabilidade

     Patrimônio / Almoxarifado
              ↕
       Compras / Recebimento
              ↕
     Contabilidade Patrimonial
```

---

# 170. Resultado esperado do Módulo 8

Ao final, o sistema deve responder com segurança:

> **Quanto estava previsto na LOA?**

> **Quanto ainda existe disponível na dotação?**

> **Quanto foi reservado?**

> **Quanto foi empenhado?**

> **Quanto foi liquidado?**

> **Quanto foi pago?**

> **A quem foi pago?**

> **Qual compra, contrato, folha, obra ou benefício originou o gasto?**

> **Qual documento comprova o recebimento?**

> **Em qual conta o dinheiro saiu?**

> **O banco confirma o pagamento?**

> **Quanto foi arrecadado?**

> **Qual módulo originou a receita?**

> **Qual fonte e natureza?**

> **Quanto há disponível por fonte?**

> **Os lançamentos contábeis estão equilibrados?**

> **Quais pendências impedem o fechamento?**

> **Quais dados serão enviados à prestação de contas?**

Esse é o papel do **Módulo 8 — Financeiro e Contábil** como núcleo financeiro central do CeleriFlow.
