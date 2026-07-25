# Financeiro e Tributario: adapters externos

## Implementado no dominio

- `TreasuryMovement`, saldos derivados, saldo de abertura auditado e transferencias atomicas.
- Importacao de extrato CSV no formato `date,description,amount[,reference]` ou separado por `;`. Valores negativos representam saidas.
- Fundacao de conciliacao com lote e itens de extrato, inclusive vinculo opcional a movimento de tesouraria.
- Mapeamento configuravel `Tax -> RevenueNature + ResourceSource + BankAccount`.
- Fluxo transacional `TaxAssessment -> TaxGuide -> TaxPayment -> Revenue -> TreasuryMovement`, com chaves de idempotencia e auditoria.

## Contratos externos ainda necessarios

- OFX, CNAB e APIs bancarias devem ser adaptados para `BankStatementImport` e `BankStatementItem`; o dominio nao conhece layouts, credenciais ou convenios bancarios.
- Boleto, PIX e linha digitavel exigem um `PaymentProvider` contratado. A guia interna recebe numero sequencial, mas nao se apresenta como boleto, DAM bancario ou PIX oficial.
- Webhooks e retornos bancarios devem fornecer um identificador estavel usado como `TaxPayment.idempotencyKey`; reentregas do mesmo evento nao duplicam receita ou movimento.
- Comprovantes e documentos fiscais devem ser previamente criados no GED e informados por `proofDocumentId` ou `documentId`. Esta entrega nao gera arquivos nem faz upload para storage.
- Nenhuma integracao contabil foi incluida: a cadeia termina em `TreasuryMovement`, preparada para a fase de `AccountingTransaction` e regras contabeis configuraveis.
