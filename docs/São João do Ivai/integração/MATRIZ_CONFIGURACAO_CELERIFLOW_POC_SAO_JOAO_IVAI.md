# Matriz de Configuracao CeleriFlow - POC Sao Joao do Ivai

**Ambiente:** sandbox sintetico. Todos os nomes, contas, documentos, fornecedores e valores sao exclusivos para demonstracao. Nao usar dados reais.

## 1. Configuracao tecnica

Configurar no ambiente do CeleriFlow, sem versionar segredos:

```env
POC_MODE=true
BANK_SANDBOX_BASE_URL=https://banco-virtual-robonuvem.vercel.app/api/bank
BANK_SANDBOX_CLIENT_ID=celeriflow-poc
BANK_SANDBOX_CLIENT_SECRET=<mesmo segredo configurado no Banco Virtual>
BANK_SANDBOX_TIMEOUT_MS=15000
BANK_SANDBOX_RETRY_LIMIT=2
BANK_SANDBOX_STATEMENT_FORMAT=ofx
# Definir como true somente quando a POC deve processar a fila no mesmo ciclo.
BANK_SANDBOX_PROCESS_PAYMENTS=false
```

O `BANK_SANDBOX_CLIENT_SECRET` deve ser transmitido somente por canal seguro. Se o dominio publicado for alterado, atualizar apenas `BANK_SANDBOX_BASE_URL` e `CORS_ALLOWED_ORIGINS` no Banco Virtual.

Para sincronizar ordens emitidas e retornos bancarios, executar no CeleriFlow:

```bash
npm run sync:poc-bank-payments
```

Agendar esse comando no worker/cron da POC. Com `BANK_SANDBOX_PROCESS_PAYMENTS=true`, o mesmo ciclo tambem solicita a compensacao simulada das ordens recebidas.

## 2. Contas bancarias a cadastrar

Cadastre uma `BankAccount` no CeleriFlow para cada linha. O campo adicional/local de identificacao externa deve guardar exatamente o valor `BA-xxx`; se esse campo ainda nao existir no cadastro, mantê-lo como chave de integracao no mapeamento da POC.

| ID externo | Banco | Agencia | Conta | Tipo CeleriFlow | Finalidade | Saldo POC apos seed |
|---|---|---|---|---|---|---:|
| BA-001 | 001 - Banco Virtual Robonuvem | 0001 | 10001-0 | Movimento | Recursos livres, pagamentos e divida | R$ 3.037.984,77 |
| BA-002 | 001 - Banco Virtual Robonuvem | 0001 | 20001-1 | Arrecadacao | Tributaria e receitas constitucionais | R$ 52.231,76 |
| BA-003 | 001 - Banco Virtual Robonuvem | 0001 | 10003-3 | Movimento | Folha de pagamento | R$ 237.154,81 |
| BA-004 | 001 - Banco Virtual Robonuvem | 0001 | 10004-4 | Movimento | FUNDEB 70% | R$ 374.980,42 |
| BA-005 | 001 - Banco Virtual Robonuvem | 0001 | 10005-5 | Movimento | FUNDEB outros | R$ 131.257,44 |
| BA-006 | 001 - Banco Virtual Robonuvem | 0001 | 10006-6 | Movimento | Salario-Educacao | R$ 200.000,00 |
| BA-007 | 001 - Banco Virtual Robonuvem | 0001 | 10007-7 | Movimento | PNAE | R$ 234.760,00 |
| BA-008 | 001 - Banco Virtual Robonuvem | 0001 | 10008-8 | Movimento | PNATE | R$ 200.000,00 |
| BA-009 | 001 - Banco Virtual Robonuvem | 0001 | 10009-9 | Movimento | Saude - Atencao Primaria | R$ 291.320,00 |
| BA-010 | 001 - Banco Virtual Robonuvem | 0001 | 10010-0 | Movimento | Saude - Media/Alta Complexidade | R$ 200.000,00 |
| BA-011 | 001 - Banco Virtual Robonuvem | 0001 | 10011-1 | Movimento | Saude - Vigilancia | R$ 200.000,00 |
| BA-012 | 001 - Banco Virtual Robonuvem | 0001 | 10012-2 | Movimento | Assistencia Social - FNAS | R$ 258.750,00 |
| BA-013 | 001 - Banco Virtual Robonuvem | 0001 | 10013-3 | Movimento | Assistencia Social - Estadual | R$ 231.900,00 |
| BA-014 | 001 - Banco Virtual Robonuvem | 0001 | 10014-4 | Movimento | COSIP | R$ 262.480,33 |
| BA-015 | 001 - Banco Virtual Robonuvem | 0001 | 10015-5 | Movimento | Convenio Obras 01 | R$ 541.050,00 |
| BA-016 | 001 - Banco Virtual Robonuvem | 0001 | 10016-6 | Movimento | Convenio Obras 02 | R$ 200.000,00 |
| BA-017 | 001 - Banco Virtual Robonuvem | 0001 | 10017-7 | Movimento | Convenio Estadual | R$ 200.000,00 |
| BA-018 | 001 - Banco Virtual Robonuvem | 0001 | 10018-8 | Movimento | Cultura | R$ 222.500,00 |
| BA-019 | 001 - Banco Virtual Robonuvem | 0001 | 10019-9 | Movimento | Defesa Civil | R$ 218.400,00 |
| BA-020 | 001 - Banco Virtual Robonuvem | 0001 | 10020-0 | Movimento | Retencoes e consignacoes | R$ 283.174,22 |
| BA-021 | 001 - Banco Virtual Robonuvem | 0001 | 90001-4 | Aplicacao | Aplicacoes de recursos livres | R$ 1.028.071,37 |
| BA-022 | 001 - Banco Virtual Robonuvem | 0001 | 90002-5 | Aplicacao | Aplicacao FUNDEB | R$ 375.000,00 |
| BA-023 | 001 - Banco Virtual Robonuvem | 0001 | 90003-6 | Aplicacao | Aplicacao Saude | R$ 342.000,00 |
| BA-024 | 001 - Banco Virtual Robonuvem | 0001 | 90004-7 | Aplicacao | Aplicacao Convenios | R$ 430.000,00 |

## 3. Vinculos obrigatorios no CeleriFlow

Para cada conta, preencher tambem:

1. Unidade gestora responsavel.
2. Fonte de recurso compativel com a finalidade da conta.
3. Conta contabil de disponibilidade bancaria.
4. Situacao `ativa`.
5. Identificador externo `BA-xxx` no mapeamento de integracao.

Mapeamento funcional recomendado:

| Contas | Vinculo financeiro esperado |
|---|---|
| BA-001, BA-002 | Tesouraria geral, receitas proprias, FPM, ICMS, IPVA, divida e pagamentos de fornecedores |
| BA-003 | Folha liquida e transferencias de folha |
| BA-004 a BA-008 | Educacao, FUNDEB, PNAE, PNATE e Salario-Educacao |
| BA-009 a BA-011 | Fundos e despesas de saude |
| BA-012 e BA-013 | Assistencia social federal e estadual |
| BA-014 | COSIP e iluminacao publica |
| BA-015 a BA-017 | Convenios, repasses, contrapartidas e obras vinculadas |
| BA-018 e BA-019 | Cultura e Defesa Civil |
| BA-020 | Retencoes, consignacoes e recolhimentos extraorcamentarios |
| BA-021 a BA-024 | Aplicacoes, resgates, rendimentos e ajustes de rentabilidade |

### 3.1 Fontes e natureza do vinculo

Os codigos abaixo sao identificadores internos e sinteticos da POC. Eles nao representam classificacao oficial do Municipio e nao devem ser substituidos por fonte real sem validacao da contabilidade municipal.

| Conta | Fonte POC no CeleriFlow | Regra |
|---|---|---|
| BA-016 | `REC-CONV-OBR-002` - Convenio Obras 02 | Exclusiva para o segundo convenio de obras; nao misturar com BA-015. |
| BA-018 | `REC-CUL-001` - Recursos para Cultura | Fonte ja prevista no seed de Cultura do CeleriFlow. |
| BA-019 | `REC-DEF-001` - Recursos para Defesa Civil | Exclusiva para Defesa Civil. |
| BA-020 | Nao atribuir fonte orcamentaria | Conta extraorcamentaria de retencoes e consignacoes. Vincular a unidade de tesouraria e a conta contabil de obrigacoes a recolher. |

### 3.2 Pareamento obrigatorio das aplicacoes

| Conta de aplicacao | Contas correntes de origem/destino | Regra de segregacao |
|---|---|---|
| BA-021 | BA-001 | Aplicacao exclusiva de recursos livres. |
| BA-022 | BA-004 e BA-005 | Aplicacao agrupada do FUNDEB. Cada aplicacao, resgate e rendimento deve manter a fonte de origem (`FUNDEB 70%` ou `FUNDEB Outros`) e nao pode ser conciliado como recurso livre. |
| BA-023 | BA-009, BA-010 e BA-011 | Aplicacao agrupada de Saude. O CeleriFlow deve registrar a conta corrente/fonte de origem em cada evento, inclusive no resgate e rendimento. |
| BA-024 | BA-015, BA-016 e BA-017 | Aplicacao agrupada de Convenios. O evento deve obrigatoriamente informar qual convenio originou o recurso; nao permitir transferencia entre convenios sem evento de contrapartida autorizado. |

Para BA-022, BA-023 e BA-024, o CeleriFlow precisa manter uma alocacao por `bank_account_external_id` de origem. O saldo total da aplicacao nao substitui o saldo vinculado de cada fonte ou convenio.

## 4. Contrato da API bancaria

Autenticacao:

```http
POST /auth/token
Content-Type: application/json

{ "client_id": "celeriflow-poc", "client_secret": "<segredo>" }
```

Operacoes de consulta:

```text
GET  /health
GET  /accounts
GET  /accounts/{accountId}/balance
GET  /accounts/{accountId}/transactions?start=YYYY-MM-DD&end=YYYY-MM-DD
POST /accounts/{accountId}/statements
GET  /statements/{statementId}/download?format=ofx|csv
```

Operacoes bidirecionais:

```text
POST /payment-orders
GET  /payment-orders/{paymentOrderExternalId}
POST /payment-orders/{paymentOrderExternalId}/process
GET  /interactions?status=PENDING
POST /interactions/{externalId}/ack
POST /interactions
```

Cada transacao deve ser tratada como imutavel e deduplicada por `bank_transaction_id`; para dados sem esse campo, usar `external_id`.

## 5. Ordem de pagamento CeleriFlow -> Banco

Quando uma ordem de pagamento for emitida no CeleriFlow, enviar uma unica vez:

```json
{
  "payment_order_external_id": "OP-008721",
  "integration_event_id": "EVT-000009",
  "bank_account_external_id": "BA-001",
  "client_reference": "OP-008721",
  "beneficiary": { "name": "FORNECEDOR DEMO", "document": "DADO-SINTETICO" },
  "amount": 21640.00,
  "scheduled_date": "2026-08-06T12:00:00.000Z",
  "payment_method": "PIX",
  "purpose_text": "Pagamento liquido da OP-008721",
  "idempotency_key": "celeriflow:payment:OP-008721:v1"
}
```

O Banco responde `RECEIVED` ou `PENDING`. No sandbox, o processamento e disparado por `POST /payment-orders/{paymentOrderExternalId}/process`; o retorno e publicado como evento `PAYMENT_ORDER_STATUS_CHANGED`.

## 6. Retorno Banco -> CeleriFlow

Consumir `GET /interactions?status=PENDING`. Para `PAYMENT_ORDER_STATUS_CHANGED`:

- `SETTLED`: efetivar uma unica vez o pagamento, movimento de tesouraria e contabilizacao; gravar `bank_transaction_id`.
- `REJECTED`: manter a OP emitida, registrar codigo e mensagem de rejeicao, sem debito.
- `PENDING`: manter a OP aguardando retorno.
- `REVERSED`: executar o fluxo formal de estorno, sempre referenciando a transacao bancaria original.

Depois de persistir o resultado, confirmar:

```http
POST /interactions/EVENT-EVT-000009-RESULT/ack
Content-Type: application/json

{ "status": "COMPLETED" }
```

## 7. Campos que devem ser preservados no CeleriFlow

Preservar e indexar nos itens de extrato, pagamentos, receitas e conciliacoes:

```text
tenant_external_id
integration_event_id
bank_account_external_id
bank_transaction_id
client_reference
payment_order_external_id
collection_reference
idempotency_key
reversal_of_bank_transaction_id
```

Prioridade de conciliacao: `bank_transaction_id`, depois ordem de pagamento, referencia de arrecadacao, evento de integracao, valor/data e historico.

## 8. Validacao antes da demonstracao

1. Validar `/health` com HTTP 200 e `status: UP`.
2. Autenticar com o cliente tecnico configurado por canal seguro.
3. Listar 24 contas e conferir cada `BA-xxx`.
4. Importar extratos de agosto de 2026 em OFX ou CSV.
5. Processar receitas, aplicacoes, resgates, rendimentos, pagamentos, retencoes, convenios, restos a pagar e divida.
6. Enviar uma OP, processar o retorno e confirmar que ela e baixada uma unica vez.
7. Testar cenarios `PAYMENT_REJECTED`, `PAYMENT_PENDING`, `RATE_LIMITED`, `TIMEOUT` e `INVALID_STATEMENT`.
8. Executar conciliacao com itens exatos, divergencia, duplicidade e estorno.

## 9. Exemplos de retorno canonico

### Retorno `PAYMENT_ORDER_STATUS_CHANGED`

Resposta de `GET /interactions?status=PENDING` para uma ordem liquidada:

```json
{
  "interactions": [
    {
      "external_id": "EVENT-EVT-PAY-cm123-RESULT",
      "direction": "OUTBOUND",
      "interaction_type": "PAYMENT_ORDER_STATUS_CHANGED",
      "status": "PENDING",
      "payload": {
        "payment_order_external_id": "OP-008721",
        "integration_event_id": "EVT-PAY-cm123",
        "tenant_external_id": "DEMO-SJI-2026",
        "bank_account_external_id": "BA-001",
        "status": "SETTLED",
        "processed_at": "2026-08-06T14:00:00.000Z",
        "bank_transaction_id": "BTX-PAY-cm123",
        "reversal_of_bank_transaction_id": null,
        "reversal_bank_transaction_id": null,
        "direction": "DEBIT",
        "amount": 21640.00,
        "currency": "BRL",
        "client_reference": "OP-008721",
        "bank_file_id": "API-SYNC-PAYMENT-ORDER",
        "sync_batch_id": "SYNC-EVT-PAY-cm123",
        "idempotency_key": "bank:EVT-PAY-cm123:SETTLED",
        "rejection_code": null,
        "rejection_message": null
      }
    }
  ]
}
```

### Transacao JSON com campos canonicos

Resposta de `GET /accounts/{accountId}/transactions`:

```json
{
  "external_id": "TX-BTX-000009",
  "tenant_external_id": "DEMO-SJI-2026",
  "integration_event_id": "EVT-000009",
  "bank_transaction_id": "BTX-000009",
  "bank_account_external_id": "BA-001",
  "client_reference": "OP-008721",
  "payment_order_external_id": "OP-008721",
  "collection_reference": null,
  "bank_file_id": "API-SYNC-2026-08",
  "sync_batch_id": "SYNC-SJI-2026-08-01",
  "idempotency_key": "bank:BTX-000009",
  "transaction_date": "2026-08-06T12:00:00.000Z",
  "posting_date": "2026-08-06T12:00:00.000Z",
  "direction": "DEBIT",
  "amount": 21640.00,
  "transaction_type": "COMMITMENT_PAYMENT",
  "status": "SETTLED",
  "description": "PIX ENVIADO FORNECEDOR COMBUSTIVEL",
  "document_number": "OP-008721",
  "reversal_of_bank_transaction_id": null,
  "balance_after": 3016344.77
}
```

`bank_transaction_id` e imutavel por contrato e possui restricao unica no Banco Virtual. Portanto, e unico globalmente no ambiente POC, o que e mais restritivo que a unicidade por conta. Nao existe rota de alteracao de transacoes; correcao ocorre por novo lancamento de estorno, nunca por edicao do lancamento original.

No retorno `REVERSED`, o Banco cria o debito original `SETTLED` e um novo credito `REVERSAL_IN`, cujo `reversal_of_bank_transaction_id` aponta para o debito original. O evento retorna `status: "REVERSED"`, `bank_transaction_id` do debito original e `reversal_bank_transaction_id` do credito de estorno. O CeleriFlow deve efetivar e estornar a mesma OP de forma idempotente.
