# Configuração Pronta: CeleriFlow -> Central RPA Elotech

Este documento contém tudo que o CeleriFlow precisa para iniciar a integração de homologação. A Central RPA já está publicada, configurada com Neon e validada no Vercel.

## 1. Configuração obrigatória no CeleriFlow

Criar uma integração HTTP para enviar cada lote de operações lançáveis para:

```text
POST https://elotech-simulado.vercel.app/api/integration/batches
Content-Type: application/json
X-CeleriFlow-Key: 0xPBpiKcB6MWjsXkgG7F7swlyEmJCAOMljnKpQdqkhg
```

O endpoint já foi validado com o token acima e possui idempotência. Reenviar uma chamada com o mesmo lote retorna `200` e não cria pendência duplicada.

## 2. Payload que deve ser enviado

Usar este formato. Os identificadores devem ser criados uma única vez e reutilizados em qualquer reenvio.

```json
{
  "batchId": "celeri-rpa-batch-20260813-001",
  "sourceEventId": "celeri-event-20260813-001",
  "municipalityId": "sao-joao-do-ivai-pr",
  "sourceEventType": "RESGATE_EXECUTADO",
  "operations": [
    {
      "operationId": "celeri-resgate-20260813-1972",
      "status": "DISPONIVEL_PARA_LANCAMENTO",
      "type": "RESGATE",
      "transactionDate": "2026-08-13",
      "amount": 2130.00,
      "bankTransactionId": "bb-20260813-1972",
      "bank": {
        "code": "001",
        "agency": "2631-X",
        "account": "7.003-3"
      },
      "elotech": {
        "localAccount": "4578",
        "applicationAccount": "aplic-fpm"
      },
      "documentNumber": "1972",
      "history": "RESGATE APLICACAO FINANCEIRA FPM",
      "sourceReference": "Referencia auditavel da movimentacao no extrato."
    }
  ]
}
```

Regras que a integração do CeleriFlow deve aplicar:

- `status` sempre deve ser `DISPONIVEL_PARA_LANCAMENTO`.
- `type` deve ser `APLICACAO`, `RESGATE` ou `RENDIMENTO`.
- `transactionDate` deve usar `YYYY-MM-DD`.
- `amount` é número decimal positivo, sem `R$` ou formatação brasileira.
- `batchId`, `sourceEventId`, `operationId` e `bankTransactionId` são imutáveis.
- Em timeout ou erro de rede, reenviar exatamente o mesmo payload.

## 3. Catálogo completo de contas bancárias

Antes dos testes com extratos reais, o CeleriFlow deve sincronizar todas as contas disponíveis para o município. Isso permite que a Central RPA use contas de qualquer banco, mesmo antes de existir uma pendência de lançamento.

```text
POST https://elotech-simulado.vercel.app/api/integration/accounts
Content-Type: application/json
X-CeleriFlow-Key: 0xPBpiKcB6MWjsXkgG7F7swlyEmJCAOMljnKpQdqkhg
```

Payload do catálogo:

```json
{
  "municipalityId": "sao-joao-do-ivai-pr",
  "accounts": [
    {
      "bank": {
        "code": "001",
        "agency": "2631-X",
        "account": "7.003-3"
      },
      "elotech": {
        "localAccount": "4578",
        "accountName": "B. Brasil S/A-C/F P M",
        "accountType": "Conta Movimento - B. Brasil S/A-C/F P M - FINANCEIRO",
        "source": "1000",
        "sourceDescription": "Recursos Ordinários (Livres) - Exercício Corrente"
      },
      "balances": {
        "source": 0.00,
        "previous": 10931.15,
        "credits": 30977857.39,
        "debits": 30943262.14,
        "current": 45526.40
      }
    }
  ]
}
```

Campos mínimos por conta: `bank.code`, `bank.agency`, `bank.account` e `elotech.localAccount`. Os demais campos permitem que o simulador reproduza a descrição, fonte e saldos exibidos pelo Elotech.

O catálogo pode ser enviado novamente sempre que o CeleriFlow cadastrar, alterar ou remover uma conta. Operações recebidas pelo endpoint de lotes também atualizam automaticamente a conta correspondente.

## 4. Mapeamentos Elotech já definidos

O CeleriFlow deve preencher o bloco `elotech` de cada operação com os valores abaixo para a demonstração.

| Tipo | Campos `elotech` |
| --- | --- |
| `APLICACAO` | `localAccount: "4578"`, `applicationAccount: "aplic-fpm"` |
| `RESGATE` | `localAccount: "4578"`, `applicationAccount: "aplic-fpm"` |
| `RENDIMENTO` | `localAccount: "4578"`, `revenueCode: "344"` |

Caso o mapeamento obrigatório esteja ausente, a Central aceita o lote, bloqueia a operação como `PENDENCIA_HUMANA` e não deixa o robô preencher o Elotech.

## 5. Callback de resultado configurado

A Central RPA já possui a URL de retorno configurada:

```text
POST https://app.celeriflow.com.br/api/integracoes/rpa/callback
Content-Type: application/json
X-RPA-Callback-Key: <chave fornecida pelo CeleriFlow>
```

O callback deve responder `HTTP 200` quando receber o evento. Se falhar, a Central RPA mantém o resultado no Neon e tenta reenviar automaticamente.

Payload de retorno:

```json
{
  "operationId": "celeri-resgate-20260813-1972",
  "status": "CONCLUIDA",
  "message": "Campos preenchidos e retorno de sucesso identificado no ambiente Elotech.",
  "details": {
    "sourceReference": "Referencia auditavel da movimentacao no extrato.",
    "confirmedBy": "RPA"
  },
  "occurredAt": "2026-08-13T14:32:10.000Z"
}
```

Status possíveis: `CONCLUIDA`, `PENDENCIA_HUMANA`, `FALHA_REPROCESSAVEL` e `FALHA_DEFINITIVA`.

## 6. Próximo passo do CeleriFlow

Configurar o catálogo de contas e o envio dos lotes usando as seções 1 a 4 deste documento. A URL e a chave de callback fornecidas pelo CeleriFlow já estão configuradas na Central RPA.

A Central RPA mantém a confirmação humana antes da execução e permite suspender a automação localmente. Enquanto suspensa, ela recebe os lotes do CeleriFlow, mas não preenche nenhum campo no Elotech.
