# Banco Virtual — Seed Integrado com CeleriFlow
## POC Financeira — São João do Ivaí/PR — Ambiente DEMO

> Este arquivo é a especificação da **base do Banco Virtual**. Ele foi desenhado em conjunto com o arquivo `02_celeriflow_financeiro_seed_integrado.md`.
>
> Os dois arquivos usam os **mesmos identificadores mestres, eventos, contas, datas e valores**. O objetivo é que os dois sistemas possam ser populados de forma determinística e sincronizada.

---

# 1. Identificação da base

```yaml
seed_namespace: CELERIFLOW-SJI-POC-2026
tenant_external_id: DEMO-SJI-2026
currency: BRL
timezone: America/Sao_Paulo
period_start: 2025-09-01
period_end: 2026-08-31
data_classification: SYNTHETIC_DEMO
```

Nunca usar números reais de contas, CPF, CNPJ, chaves PIX ou dados pessoais do Município.

---

# 2. Contrato de integração compartilhado

Estes campos devem existir **nos dois sistemas**:

| Campo | Dono original | Uso |
|---|---|---|
| `tenant_external_id` | CeleriFlow | identifica o ambiente |
| `integration_event_id` | Integração | agrupa o mesmo fato nos dois sistemas |
| `bank_account_external_id` | Banco Virtual | identifica a conta |
| `bank_transaction_id` | Banco Virtual | ID imutável do lançamento |
| `client_reference` | CeleriFlow | referência opaca enviada ao banco |
| `payment_order_external_id` | CeleriFlow | ordem enviada para pagamento |
| `collection_reference` | CeleriFlow/Banco | identifica guia/lote arrecadado |
| `bank_file_id` | Banco Virtual | OFX/CNAB/retorno |
| `sync_batch_id` | Integração | lote de sincronização |
| `idempotency_key` | Integração | evita duplicidade |

## Regra importante

O Banco Virtual pode armazenar `client_reference = OP-008721`, mas **não precisa saber que isso é um empenho, uma liquidação ou uma classificação orçamentária**.

O valor é apenas uma referência externa do cliente.

---

# 3. Contas compartilhadas

| ID externo | Banco | Descrição | Tipo |
|---|---|---|---|

| `BA-001` | Banco do Brasil DEMO | Movimento Recursos Livres | Corrente |
| `BA-002` | Banco do Brasil DEMO | Arrecadação Municipal | Corrente |
| `BA-003` | Caixa DEMO | Folha de Pagamento | Corrente |
| `BA-004` | Banco do Brasil DEMO | FUNDEB 70% | Corrente |
| `BA-005` | Banco do Brasil DEMO | FUNDEB Outros | Corrente |
| `BA-006` | Banco do Brasil DEMO | Salário-Educação | Corrente |
| `BA-007` | Banco do Brasil DEMO | PNAE | Corrente |
| `BA-008` | Banco do Brasil DEMO | PNATE | Corrente |
| `BA-009` | Caixa DEMO | Saúde - Atenção Primária | Corrente |
| `BA-010` | Caixa DEMO | Saúde - Média/Alta Complexidade | Corrente |
| `BA-011` | Caixa DEMO | Saúde - Vigilância | Corrente |
| `BA-012` | Banco do Brasil DEMO | Assistência Social - FNAS | Corrente |
| `BA-013` | Banco do Brasil DEMO | Assistência Social - Estadual | Corrente |
| `BA-014` | Banco do Brasil DEMO | COSIP | Corrente |
| `BA-015` | Caixa DEMO | Convênio Obras 01 | Corrente |
| `BA-016` | Caixa DEMO | Convênio Obras 02 | Corrente |
| `BA-017` | Banco do Brasil DEMO | Convênio Estadual | Corrente |
| `BA-018` | Banco do Brasil DEMO | Cultura | Corrente |
| `BA-019` | Banco do Brasil DEMO | Defesa Civil | Corrente |
| `BA-020` | Banco do Brasil DEMO | Retenções/Consignações | Corrente |
| `BA-021` | Banco do Brasil DEMO | Aplicação Recursos Livres | Aplicação |
| `BA-022` | Banco do Brasil DEMO | Aplicação FUNDEB | Aplicação |
| `BA-023` | Caixa DEMO | Aplicação Saúde | Aplicação |
| `BA-024` | Caixa DEMO | Aplicação Convênios | Aplicação |


Os mesmos `BA-xxx` devem existir no cadastro de contas bancárias do CeleriFlow.

---

# 4. Tabelas mínimas do Banco Virtual

## 4.1. `bank_accounts`

```text
id
tenant_external_id
bank_account_external_id
bank_code
bank_name
agency_demo
account_number_demo
account_digit_demo
description
account_type
status
opening_date
current_balance
available_balance
blocked_balance
created_at
updated_at
```

## 4.2. `bank_daily_balances`

```text
id
bank_account_external_id
balance_date
opening_balance
total_credits
total_debits
closing_balance
available_balance
blocked_balance
```

## 4.3. `bank_transactions`

```text
id
tenant_external_id
integration_event_id
bank_transaction_id
bank_account_external_id
booking_date
effective_date
direction
amount
transaction_type
bank_history
bank_document
reference_number
client_reference
collection_reference
counterparty_name_demo
counterparty_document_demo
pix_e2e_id_demo
pix_txid_demo
channel
status
reversal_of_bank_transaction_id
sync_batch_id
idempotency_key
created_at
```

### `direction`

- `CREDIT`
- `DEBIT`

### `status`

- `PENDING`
- `POSTED`
- `SETTLED`
- `REVERSED`
- `REJECTED`
- `BLOCKED`

## 4.4. `payment_orders`

Ordens recebidas do CeleriFlow.

```text
payment_order_external_id
integration_event_id
bank_account_external_id
client_reference
beneficiary_name_demo
beneficiary_document_demo
amount
scheduled_date
payment_method
pix_key_demo
purpose_text
status
rejection_code
rejection_message
bank_transaction_id
created_at
processed_at
```

## 4.5. `collection_events`

```text
collection_reference
integration_event_id
bank_account_external_id
payer_name_demo
payer_document_demo
amount
payment_method
payment_date
settlement_date
bank_transaction_id
status
```

## 4.6. `investment_events`

```text
investment_event_id
integration_event_id
bank_account_external_id
linked_current_account_external_id
event_type
amount
event_date
gross_yield
tax_amount
net_yield
bank_transaction_id
```

`event_type`:

- `APPLICATION`
- `REDEMPTION`
- `YIELD`
- `ADJUSTMENT`

## 4.7. `bank_files`

```text
bank_file_id
bank_account_external_id
file_type
period_start
period_end
generated_at
transaction_count
checksum
processing_status
```

Tipos:

- `OFX`
- `CNAB240_RETURN`
- `CNAB240_REMITTANCE`
- `CSV_STATEMENT`
- `API_SYNC`

---

# 5. Tipos de movimentação bancária

| Código | Descrição |
|---|---|
| `PIX_IN` | PIX recebido |
| `PIX_OUT` | PIX enviado |
| `TED_IN` | TED recebida |
| `TED_OUT` | TED enviada |
| `COLLECTION_IN` | arrecadação identificada |
| `COLLECTION_BATCH_IN` | lote de arrecadação |
| `FPM_IN` | FPM |
| `ICMS_IN` | ICMS |
| `IPVA_IN` | IPVA |
| `FUNDEB_IN` | FUNDEB |
| `SUS_IN` | transferência SUS |
| `FNDE_IN` | transferência FNDE |
| `AGREEMENT_IN` | convênio |
| `PAYROLL_OUT` | lote de folha |
| `SUPPLIER_OUT` | fornecedor |
| `DAILY_ALLOWANCE_OUT` | diária |
| `TRANSFER_OUT` | transferência entre contas |
| `TRANSFER_IN` | transferência entre contas |
| `INVESTMENT_APPLICATION` | aplicação |
| `INVESTMENT_REDEMPTION` | resgate |
| `INVESTMENT_YIELD` | rendimento |
| `BANK_FEE` | tarifa |
| `REVERSAL_IN` | estorno a crédito |
| `REVERSAL_OUT` | estorno a débito |
| `DEBT_PAYMENT_OUT` | parcela de dívida |
| `BLOCK` | bloqueio |
| `UNBLOCK` | desbloqueio |
| `OTHER_CREDIT` | crédito não classificado |
| `OTHER_DEBIT` | débito não classificado |

---

# 6. Eventos canônicos compartilhados

Esses eventos são a ponte entre os dois bancos.


| Evento | Tipo | Conta | Valor | Data | Banco Virtual | CeleriFlow |
|---|---|---|---:|---|---|---|
| `EVT-000001` | IPTU PIX individual | BA-002 | 1.487,32 | 2026-08-03 | `BTX-000001` crédito | `REC-000001` + `GUIA-000284` |
| `EVT-000002` | ISSQN PIX individual | BA-002 | 3.842,18 | 2026-08-03 | `BTX-000002` crédito | `REC-000002` + `GUIA-000285` |
| `EVT-000003` | Arrecadação tributária em lote | BA-002 | 48.327,61 | 2026-08-04 | `BTX-000003` crédito | `LOT-ARR-00001` com 147 receitas |
| `EVT-000004` | FPM | BA-001 | 286.412,77 | 2026-08-05 | `BTX-000004` crédito | `REC-000150` |
| `EVT-000005` | ICMS | BA-001 | 119.844,23 | 2026-08-05 | `BTX-000005` crédito | `REC-000151` |
| `EVT-000006` | FUNDEB | BA-004 | 174.980,42 | 2026-08-05 | `BTX-000006` crédito | `REC-000152` |
| `EVT-000007` | SUS APS | BA-009 | 91.320,00 | 2026-08-06 | `BTX-000007` crédito | `REC-000153` |
| `EVT-000008` | FNDE PNAE | BA-007 | 34.760,00 | 2026-08-06 | `BTX-000008` crédito | `REC-000154` |
| `EVT-000009` | Fornecedor combustível | BA-001 | 21.640,00 | 2026-08-06 | `BTX-000009` débito | `EMP-004583` + `LIQ-006124` + `OP-008721` |
| `EVT-000010` | Material escolar | BA-005 | 18.742,56 | 2026-08-06 | `BTX-000010` débito | `EMP-004601` + `LIQ-006131` + `OP-008729` |
| `EVT-000011` | Serviço de software | BA-001 | 10.680,00 | 2026-08-07 | `BTX-000011` débito líquido | empenho/liquidação 12.000,00 + retenções 1.320,00 |
| `EVT-000012` | Retenção IR/ISS | BA-020 | 1.320,00 | 2026-08-07 | `BTX-000012` crédito interno | retenções vinculadas a `OP-008735` |
| `EVT-000013` | Folha líquida | BA-003 | 612.845,19 | 2026-08-07 | `BTX-000013` débito lote | `FOLHA-2026-08` + lote de pagamentos |
| `EVT-000014` | Consignações folha | BA-020 | 83.174,22 | 2026-08-07 | `BTX-000014` crédito interno | passivo extraorçamentário |
| `EVT-000015` | Transferência própria | BA-001 | 250.000,00 | 2026-08-08 | `BTX-000015` débito | `TRF-000021` |
| `EVT-000016` | Transferência própria | BA-021 | 250.000,00 | 2026-08-08 | `BTX-000016` crédito | contrapartida `TRF-000021` |
| `EVT-000017` | Aplicação automática | BA-001 | 400.000,00 | 2026-08-10 | `BTX-000017` débito | `APL-000011` |
| `EVT-000018` | Entrada aplicação | BA-021 | 400.000,00 | 2026-08-10 | `BTX-000018` crédito | contrapartida `APL-000011` |
| `EVT-000019` | Rendimento aplicação | BA-021 | 9.841,37 | 2026-08-31 | `BTX-000019` crédito | `REC-000155` receita patrimonial |
| `EVT-000020` | Resgate aplicação | BA-021 | 180.000,00 | 2026-08-31 | `BTX-000020` débito | `RESG-000004` |
| `EVT-000021` | Entrada resgate | BA-001 | 180.000,00 | 2026-08-31 | `BTX-000021` crédito | contrapartida `RESG-000004` |
| `EVT-000022` | Tarifa não prevista | BA-001 | 18,75 | 2026-08-12 | `BTX-000022` débito | inicialmente sem registro ERP |
| `EVT-000023` | Depósito não identificado | BA-002 | 2.738,90 | 2026-08-12 | `BTX-000023` crédito | inicialmente sem receita identificada |
| `EVT-000024` | PIX rejeitado | BA-001 | 6.215,44 | 2026-08-13 | ordem rejeitada, sem débito final | `OP-008790` rejeitada |
| `EVT-000025` | Reenvio PIX | BA-001 | 6.215,44 | 2026-08-13 | `BTX-000024` débito | nova tentativa da `OP-008790` |
| `EVT-000026` | Pagamento estornado | BA-001 | 4.920,00 | 2026-08-14 | `BTX-000025` débito | `OP-008801` |
| `EVT-000027` | Estorno bancário | BA-001 | 4.920,00 | 2026-08-15 | `BTX-000026` crédito | estorno de `OP-008801` |
| `EVT-000028` | Restos a pagar 2025 | BA-001 | 31.480,00 | 2026-08-18 | `BTX-000027` débito | `RAP-2025-00182` |
| `EVT-000029` | Dívida ativa parcelada | BA-002 | 2.416,83 | 2026-08-19 | `BTX-000028` crédito | `DA-000842` parcela 4/12 |
| `EVT-000030` | Parcela dívida municipal | BA-001 | 97.350,00 | 2026-08-20 | `BTX-000029` débito | `DIV-00003` parcela 08/2026 |
| `EVT-000031` | Convênio federal | BA-015 | 420.000,00 | 2026-08-21 | `BTX-000030` crédito | `REC-000156` |
| `EVT-000032` | Medição obra | BA-015 | 78.950,00 | 2026-08-25 | `BTX-000031` débito | `EMP-004711` + medição + `OP-008912` |
| `EVT-000033` | Pagamento parcial fornecedor | BA-001 | 20.000,00 | 2026-08-26 | `BTX-000032` débito | parcela 1 de `EMP-004720` |
| `EVT-000034` | Pagamento parcial fornecedor | BA-001 | 20.000,00 | 2026-08-27 | `BTX-000033` débito | parcela 2 de `EMP-004720` |
| `EVT-000035` | Divergência proposital | BA-001 | 6.824,10 | 2026-08-28 | `BTX-000034` débito | ERP espera 6.842,10 |
| `EVT-000036` | Crédito duplicado importação | BA-002 | 1.122,40 | 2026-08-28 | `BTX-000035` único | importador deve impedir duplicidade |
| `EVT-000037` | ITBI | BA-002 | 8.750,00 | 2026-08-29 | `BTX-000036` crédito | `REC-000157` |
| `EVT-000038` | COSIP | BA-014 | 62.480,33 | 2026-08-30 | `BTX-000037` crédito | `REC-000158` lote |
| `EVT-000039` | PNAE fornecedor alimentos | BA-007 | 27.315,80 | 2026-08-30 | `BTX-000038` débito | `EMP-004741` |
| `EVT-000040` | Fechamento pendente | BA-001 | 3.455,72 | 2026-08-31 | `BTX-000039` débito | só registrado no ERP em 2026-09-01 |


---

# 7. Extratos que devem existir

Criar extratos para todas as contas, com:

- extrato diário;
- extrato semanal;
- extrato mensal;
- consulta por intervalo;
- saldo anterior;
- total de créditos;
- total de débitos;
- saldo final;
- lançamentos pendentes;
- lançamentos compensados;
- lançamentos estornados.

## Exemplos de históricos bancários

```text
PIX RECEBIDO - ARRECADACAO MUNICIPAL
ARRECADACAO CONVENIO MUNICIPAL
CREDITO FPM
CREDITO COTA PARTE ICMS
CREDITO FUNDEB
TRANSFERENCIA SUS - CUSTEIO APS
TRANSFERENCIA FNDE - PNAE
PIX ENVIADO - FORNECEDOR
PAGAMENTO LOTE FOLHA
TRANSF ENTRE CONTAS MESMA TITULARIDADE
APLICACAO AUTOMATICA
RESGATE AUTOMATICO
RENDIMENTO APLICACAO FINANCEIRA
TARIFA SERVICO BANCARIO
ESTORNO PIX
CREDITO NAO IDENTIFICADO
```

---

# 8. Volume recomendado

Para 12 meses:

| Entidade | Quantidade |
|---|---:|
| Contas | 24 |
| Saldos diários | 8.000 a 8.800 |
| Transações bancárias | 18.000 a 25.000 |
| PIX recebidos | 3.000 a 5.000 |
| PIX enviados | 1.500 a 2.500 |
| Lotes de arrecadação | 250 a 400 |
| Transferências governamentais | 200 a 350 |
| Eventos de aplicação/resgate | 250 a 400 |
| Ordens bancárias | 2.500 a 4.000 |
| Retornos/rejeições | 80 a 150 |
| Tarifas | 60 a 100 |
| Estornos | 30 a 60 |

---

# 9. Distribuição realista por status

Base DEMO sugerida:

- 82% conciliáveis automaticamente;
- 9% com sugestão forte;
- 4% destinados à conciliação manual;
- 2% pendentes no banco;
- 1% pendentes no ERP;
- 1% divergência de valor/data;
- 1% estorno/rejeição/justificativa.

Não deixar 100% da base perfeita.

---

# 10. Casos obrigatórios para teste

1. Match exato 1:1.
2. Mesmo valor com diferença de um dia.
3. Mesmo valor com vários candidatos.
4. Um crédito bancário para várias guias.
5. Um débito bancário para várias despesas.
6. Pagamento líquido com retenções.
7. Pagamento parcial.
8. PIX rejeitado e reenviado.
9. Estorno posterior.
10. Tarifa sem lançamento no ERP.
11. Depósito não identificado.
12. Transferência entre contas próprias.
13. Aplicação e resgate.
14. Rendimento de aplicação.
15. Restos a pagar.
16. Parcela de dívida municipal.
17. Dívida ativa recebida.
18. Importação duplicada bloqueada por `idempotency_key`.
19. Divergência proposital de R$ 18,00.
20. Movimento de 31/08 reconhecido no ERP em 01/09.

---

# 11. Regras de sincronização

## Banco -> CeleriFlow

Enviar:

```text
bank_transaction_id
integration_event_id
bank_account_external_id
booking_date
effective_date
direction
amount
transaction_type
bank_history
client_reference
collection_reference
status
pix_e2e_id_demo
```

## CeleriFlow -> Banco

Enviar:

```text
payment_order_external_id
integration_event_id
bank_account_external_id
client_reference
beneficiary
amount
scheduled_date
payment_method
purpose_text
idempotency_key
```

## Retorno Banco -> CeleriFlow

```text
payment_order_external_id
status
processed_at
bank_transaction_id
rejection_code
rejection_message
```

---

# 12. Ordem de geração do seed

1. Tenant.
2. Bancos.
3. Contas.
4. Saldos iniciais.
5. Ordens recebidas do ERP.
6. Eventos de arrecadação.
7. Transações.
8. Aplicações.
9. Retornos.
10. Estornos/rejeições.
11. Saldos diários recalculados.
12. Arquivos OFX/CNAB sintéticos.

O seed deve ser **determinístico**: rodar novamente com a mesma versão precisa gerar os mesmos IDs mestres e os mesmos valores-base.
