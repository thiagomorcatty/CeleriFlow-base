# CeleriFlow - Plano de Implantacao: Financeiro (Modulo 8) e Tributario (Modulo 7)

## Decisao de prioridade

O Financeiro e Contabil deve ser implantado primeiro. Ele sera a unica
autoridade para orcamento, despesa, receita, tesouraria e contabilidade. O
Tributario gera obrigacoes e confirma pagamentos; somente o Financeiro registra
a arrecadacao, o movimento de caixa e a contabilizacao.

Fluxo de integracao alvo:

```text
TaxAssessment -> TaxGuide -> TaxPayment confirmado
-> evento idempotente -> Revenue -> TreasuryMovement -> AccountingTransaction
```

## Diagnostico executivo

### Financeiro e Contabil

- Existem models e telas para dotacao, empenho, liquidacao, pagamento e contas
  bancarias, mas o comportamento atual e CRUD basico.
- Valores monetarios relevantes ainda usam `Float`; nenhum calculo oficial deve
  ser confiado a esses campos.
- Empenho, liquidacao e pagamento nao aplicam os limites legais de saldo.
- Saldo bancario e editavel e nao deriva de movimentos de tesouraria.
- Nao ha exercicio operacional, reserva, receita integrada, retencoes,
  conciliacao funcional, partida dobrada ou fechamento.

### Tributario

- Cadastros basicos existem, mas a cadeia fiscal nao esta conectada.
- Guia rapida, NFS-e e certidao possuem trechos simulados ou aleatorios e nao
  podem ser apresentados como documentos fiscais oficiais.
- Baixa de guia nao e transacional nem valida pagamento parcial.
- Nao existem parametros, motor de calculo, auditoria, GED, Processos ou
  integracao financeira completos.

## Regras inegociaveis

1. Migrar dinheiro para `Decimal`; nao introduzir novos valores financeiros em
   `Float`.
2. Corrigir movimentos por estorno, anulacao ou reforco, nunca por edicao
   silenciosa de valores historicos.
3. Usar transacao e invariantes: reserva <= disponibilidade; liquidado <=
   empenhado vigente; pago <= liquidado disponivel.
4. Toda integracao externa usa `sourceModule`, `sourceType`, `sourceId`,
   `eventType` e `idempotencyKey`.
5. Saldo bancario deriva de `TreasuryMovement` depois do saldo inicial auditado.
6. Guias, certidoes, CDA e NFS-e nao serao oficiais enquanto houver numeros
   aleatorios, calculos simulados ou ausencia de regras fiscais.
7. Documentos oficiais devem usar GED; processos fiscais devem usar o Modulo 3,
   sem workflow paralelo.

## Fase 0 - Contencao e fundacao financeira

Objetivo: impedir dados financeiros inconsistentes antes de ampliar telas.

1. Inventariar todos os campos `Float` financeiros e criar estrategia de
   migracao para `Decimal`, com reconciliacao dos valores existentes.
2. Criar sequencias oficiais para documentos financeiros e fiscais; remover
   `Math.random()` de identificadores oficiais.
3. Operacionalizar `FinancialYear` com Preparacao, Aberto, Em Encerramento e
   Encerrado; bloquear lancamentos em exercicio fechado.
4. Criar auditoria financeira imutavel e vincular autoria a `Usuario` e
   `Employee`.
5. Criar `Creditor` central e interromper o uso de `Supplier` como credor
   universal.
6. Redefinir `Expense` como origem/solicitacao de despesa, sem representar
   empenho ou pagamento.
7. Criar `lib/financeiro` como unica camada de servicos para operacoes oficiais.

### Criterio de aceite

Nenhum novo fluxo financeiro usa `Float`, identificador aleatorio ou criacao
direta de empenho, pagamento ou receita fora da camada de servicos.

## Fase 1 - Orcamento e disponibilidade

1. Implementar CRUD operacional de unidade orcamentaria, fonte de recursos,
   natureza de receita e natureza de despesa.
2. Implantar LOA e estrutura de dotacao; PPA/LDO ficam como registros de
   planejamento vinculaveis, sem bloquear a primeira execucao.
3. Criar `BudgetMovement` para credito, anulacao, suplementacao,
   remanejamento e dotacao inicial.
4. Criar disponibilidade calculada: dotacao atualizada - reservas ativas -
   empenhos vigentes.
5. Operacionalizar `BudgetReservation` antes de empenho.

### Criterio de aceite

Uma solicitacao de despesa so reserva ou empenha valor disponivel, com origem,
fonte, dotacao e auditoria identificaveis.

## Fase 2 - Execucao da despesa

1. Criar solicitacao de despesa com origem modular e chave de idempotencia.
2. Emitir empenho ordinario, estimativo ou global, com reserva, credor,
   processo/contrato e movimentos de reforco/anulacao.
3. Liquidar com documento GED, ateste e limite por saldo do empenho.
4. Pagar somente obrigacao liquidada, permitindo pagamento parcial e excecao
   justificada controlada.
5. Implementar retencoes e obrigacoes de recolhimento.
6. Integrar Compras, Contratos, Obras e RH inicialmente como origens de
   despesa, sem permitir que criem `Commitment` diretamente.

## Fase 3 - Tesouraria e receita

1. Criar `TreasuryMovement`, saldo de abertura auditado e transferencias entre
   contas em transacao unica.
2. Derivar saldo de `BankAccount` dos movimentos; remover edicao livre de saldo.
3. Criar `Revenue` confirmado com natureza, fonte, conta, origem e status.
4. Implementar extrato, importacao e conciliacao como adapters OFX/CNAB/CSV,
   sem acoplar bancos ao dominio principal.
5. Criar boletim diario e fluxo de caixa basico.

## Fase 4 - Tributario minimo integrado

1. Migrar valores tributarios para `Decimal` na mesma janela de migracao do
   Financeiro.
2. Criar parametros tributarios, catalogo de tributos, atividades e regras de
   vencimento; completar contribuinte, imovel e inscricao economica.
3. Criar motor de calculo isolado e `TaxAssessment` rastreavel.
4. Gerar guia apenas a partir de lancamento, com numero sequencial, memoria de
   calculo e atualizacao de vencimento.
5. Implementar baixa transacional, parcial quando aplicavel, e evento
   idempotente `TaxPayment -> Revenue`.
6. Registrar auditoria fiscal e usar GED para comprovantes e documentos.

### Criterio de aceite

Um pagamento tributario confirmado gera exatamente uma receita financeira,
movimento de tesouraria e base para contabilizacao, mesmo se o evento for
recebido mais de uma vez.

## Fase 5 - Contabilidade e fechamento

1. Criar `AccountingTransaction` e lancamentos de debito/credito.
2. Impedir postagem quando debitos forem diferentes de creditos.
3. Criar catalogo de eventos e regras contabeis configuraveis para receita,
   empenho, liquidacao, pagamento e tesouraria.
4. Implementar diario, razao, balancete, fechamento mensal e central de
   pendencias.
5. Tratar restos a pagar e fechamento anual somente apos validacao dos saldos.

## Fase 6 - Ampliacao tributaria

1. IPTU e taxas: PGV, calculo individual/em lote, isencao e imunidade.
2. ITBI e alvaras: processo do Modulo 3, GED, taxa e pagamento antes de emissao.
3. ISS e NFS-e: lista de servicos, apuracao, declaracoes e adapter municipal.
4. Divida ativa: origem em `TaxAssessment`, atualizacao, parcelamento, CDA e
   cobranca administrativa.
5. Certidoes: avaliacao automatica da situacao fiscal e documento GED.
6. Fiscalizacao: autos, evidencias GED e processo tributario.
7. Portal do contribuinte, PIX/boleto, retorno bancario e integracoes juridicas
   entram somente por adapters contratados.

## Ordem de implantacao

1. Fase 0 e 1 do Financeiro.
2. Fase 2 e 3 do Financeiro.
3. Fase 4 do Tributario, integrada a Receita Financeira.
4. Fase 5 do Financeiro.
5. Fase 6 do Tributario.

## Fora da primeira entrega

- layout oficial de TCE, SICONFI ou regras especificas por UF;
- PIX, boleto, CNAB/API bancaria e NFS-e sem contrato do provedor;
- portal publico do contribuinte;
- protesto e integracao judicial;
- modulos de VAF, IPM, GIA, DEFIS, EFD e inteligencia de receita estadual.
