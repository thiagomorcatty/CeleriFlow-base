# Informações necessárias do Banco Virtual para conectar ao CeleriFlow

Preencha este documento no repositório do banco virtual e devolva-o ao projeto CeleriFlow. Não inclua senhas, tokens, `client_secret` ou chaves privadas no arquivo.

## 1. URLs publicadas

```text
URL do portal visual do banco: https://banco-virtual-robonuvem.vercel.app
URL base pública da API: https://banco-virtual-robonuvem.vercel.app/api/bank
Ambiente: SANDBOX
HTTPS válido: SIM
```

Exemplo de URL base esperada pelo CeleriFlow:

```text
https://banco-poc.exemplo.com/api/bank
```

## 2. Autenticação técnica

Informe apenas os nomes e valores não secretos abaixo. O `client_secret` será enviado por canal seguro e configurado diretamente nas variáveis de ambiente do CeleriFlow.

```text
Rota para obter token: /auth/token
Método HTTP: POST
Formato do corpo da requisição: application/json
Nome do campo do client ID: client_id
Nome do campo do client secret: client_secret
Nome do campo de grant type, se houver: Não utilizado
Valor do grant type, se houver: Não se aplica
Nome do campo do token na resposta: access_token
Tempo de expiração do token em segundos: 3600
Client ID técnico da integração: celeriflow-poc
```

Compatibilidade confirmada: o CeleriFlow envia somente `client_id` e `client_secret`; o campo `grant_type` não é necessário.

O adaptador atual do CeleriFlow espera este contrato. Informe qualquer diferença:

```http
POST {URL_BASE}/auth/token
Content-Type: application/json

{
  "client_id": "celeriflow-poc",
  "client_secret": "enviado_por_canal_seguro",
  "grant_type": "client_credentials"
}
```

Resposta esperada:

```json
{
  "access_token": "token-temporario",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

## 3. Saúde do serviço

```text
Rota de saúde: /health
Exige autenticação: NÃO
Resposta real de exemplo, sem dados secretos: HTTP 200
```

```json
{
  "status": "UP",
  "database": "UP",
  "statements": "UP",
  "active_scenario": "NORMAL"
}
```

O CeleriFlow espera que a rota retorne HTTP 200 e:

```json
{
  "status": "UP"
}
```

## 4. Contas disponíveis para a POC

Preencha uma linha por conta. Os valores de banco, agência e número devem ser exatamente os mesmos que serão digitados no CeleriFlow.

| ID interno da API | Banco | Agência | Número da conta | Tipo | Descrição | Situação | Saldo atual |
|---|---|---|---|---|---|---|---|
| `10000000-0000-4000-8000-000000000010` | 001 | 0001 | 10001-0 | `CHECKING` (CORRENTE) | Tesouraria Geral - Movimentação e Pagamentos | ACTIVE | R$ -877.510,00 |
| `90000000-0000-4000-8000-000000000090` | 001 | 0001 | 90001-4 | `INVESTMENT` (APLICACAO) | Aplicações Financeiras de Liquidez Diária (CDB / Tesouro Nacional) | ACTIVE | R$ 557.800,00 |
| `20000000-0000-4000-8000-000000000020` | 001 | 0001 | 20001-1 | `TRANSFER_REVENUE` | Conta Receptora de Receitas Constitucionais e Tributárias | ACTIVE | R$ 2.021.791,00 |

Contrato de listagem esperado:

```http
GET {URL_BASE}/accounts
Authorization: Bearer {token}
```

```json
{
  "accounts": [
    {
      "id": "id-interno-da-conta",
      "account_number": "10001-0",
      "branch_number": "0001"
    }
  ]
}
```

Se o banco usar nomes diferentes para `id`, `account_number` ou `branch_number`, informe-os aqui:

```text
Campo do ID: id
Campo do número da conta: account_number
Campo da agência: branch
```

Compatibilidade confirmada: o CeleriFlow aceita a lista diretamente na raiz da resposta e reconhece o campo `branch` para a agência.

## 5. Extratos

```text
Rota para gerar extrato: /accounts/{accountId}/statements
Método HTTP: POST
Corpo real para informar data inicial e final: {"start_date":"YYYY-MM-DD","end_date":"YYYY-MM-DD"}
Campo que retorna o ID do extrato: statement_id
Rota para baixar o extrato: /statements/{statementId}/download?format=ofx
Formatos disponíveis: ofx, csv
Formato a usar na POC: OFX
```

Compatibilidade confirmada: o CeleriFlow envia `start_date` e `end_date`, reconhece `statement_id` e impede reprocessamento de movimentações pelos `external_id` recebidos no extrato.

Contrato esperado:

```http
POST {URL_BASE}/accounts/{accountId}/statements
Authorization: Bearer {token}
Content-Type: application/json
Idempotency-Key: chave-unica

{
  "start": "2026-08-01",
  "end": "2026-08-31"
}
```

```json
{
  "id": "id-do-extrato"
}
```

```http
GET {URL_BASE}/statements/{statementId}/download?format=ofx
Authorization: Bearer {token}
```

O download deve retornar o conteúdo OFX em texto, incluindo data, valor, tipo, histórico e identificador único (`FITID`) de cada movimento.

## 6. Movimentações

```text
Rota para listar movimentações: /accounts/{accountId}/transactions
Parâmetros reais de data inicial e final: start e end, no formato YYYY-MM-DD
Campo que contém a lista na resposta: A lista é retornada diretamente na raiz da resposta JSON.
```

Contrato esperado:

```http
GET {URL_BASE}/accounts/{accountId}/transactions?start=2026-08-01&end=2026-08-31
Authorization: Bearer {token}
```

Cada item precisa informar os campos abaixo, ou informar o nome equivalente usado pela API:

| Informação | Campo esperado | Campo real, se diferente |
|---|---|---|
| Identificador único e permanente | `external_id` | Igual |
| Data do movimento | `transaction_date` | Igual |
| Data de contabilização | `posting_date` | Igual |
| Valor | `amount` | Igual |
| Crédito ou débito | `direction` | Igual |
| Tipo da movimentação | `transaction_type` | Igual |
| Histórico | `description` | Igual |
| Documento | `document_number` | Igual |
| Saldo após o lançamento | `balance_after` | Igual |

Valores esperados para `direction`:

```text
CREDIT
DEBIT
```

Tipos necessários para a POC:

```text
FPM
FUNDEB
IPVA
ICMS
ITR
FEP
ADO_LC_176_2020
INVESTMENT
REDEMPTION
YIELD
BANK_FEE
OTHER_REVENUE
```

## 7. Dados obrigatórios para a demonstração

Confirme em quais conta e período estarão disponíveis:

| Cenário | Conta | Data | Valor | `external_id` |
|---|---|---|---:|---|
| FPM | 20001-1 | 2025-08-10 | R$ 145.000,00 | `TX-20250810-1001` |
| FUNDEB | 20001-1 | 2025-08-15 | R$ 98.400,00 | `TX-20250815-1003` |
| IPVA | 20001-1 | 2025-08-20 | R$ 15.500,00 | `TX-20250820-1005` |
| ICMS | 20001-1 | 2025-08-20 | R$ 53.800,00 | `TX-20250820-1004` |
| Aplicação | 10001-0 | 2026-05-11 | R$ 80.000,00 | `TX-20260511-1099` |
| Resgate | 90001-4 | 2026-05-27 | R$ 150.000,00 | `TX-20260527-1119` |
| Rendimento | 90001-4 | 2025-08-28 | R$ 4.400,00 | `TX-20250830-1010` |
| Tarifa bancária | 10001-0 | 2026-06-30 | R$ 450,00 | `TX-20260630-1157` |
| Receita não reconhecida | Conta consultada | No momento da consulta | R$ 999,99 | `TX-UNRECOGNIZED-999` |
| Divergência para conciliação | Conta consultada | No momento da consulta | R$ 999,99 | `TX-UNRECOGNIZED-999` |

Para os dois últimos itens, ativar o cenário `UNRECOGNIZED_TRANSACTION`; a API injeta a movimentação simulada na resposta de movimentações da conta consultada.

## 8. Cenários controlados e reset

```text
URL ou tela administrativa para ativar cenários: https://banco-virtual-robonuvem.vercel.app/dashboard.html (perfil SANDBOX_ADMIN) ou POST /admin/scenarios/{scenarioCode}/activate
Usuário administrador da POC: admin.poc
Canal seguro para senha do administrador: Variável POC_ADMIN_PASSWORD, compartilhada separadamente
Procedimento para resetar todos os dados: POST /admin/scenarios/reset autenticado como SANDBOX_ADMIN, ou botão "Restaurar Dados" no portal
Tempo estimado de reset: Menos de 1 minuto
```

Confirme como ativar cada cenário:

| Cenário | Identificador ou procedimento |
|---|---|
| Operação normal | Ativar `NORMAL` em `POST /admin/scenarios/NORMAL/activate`. |
| Credencial inválida | Ativar `INVALID_CREDS`. O endpoint técnico retorna HTTP 401. |
| Serviço indisponível | Ativar `SERVICE_UNAVAILABLE`. A API retorna HTTP 503. |
| Timeout | Ativar `TIMEOUT`. A API aguarda mais de 15 segundos. |
| Arquivo OFX inválido | Ativar `INVALID_STATEMENT` antes de gerar o extrato. |
| Conta bloqueada | Ativar `ACCOUNT_BLOCKED` e consultar a conta 10001-0. |
| Período sem movimentações | Ativar `EMPTY_PERIOD`. |
| Requisição repetida/idempotência | O banco não fornece chave de idempotência para geração de extrato. O CeleriFlow deve impedir duplicidade pelo `external_id` e manter o histórico de processamento. |

## 9. Entrega segura dos segredos

Não preencher neste arquivo:

```text
BANK_SANDBOX_CLIENT_SECRET
Senha do administrador
Tokens permanentes
Chaves privadas
```

Enviar esses valores por canal seguro. No CeleriFlow, eles serão configurados como:

```env
BANK_SANDBOX_BASE_URL=<URL_BASE_PUBLICA>
BANK_SANDBOX_CLIENT_ID=<CLIENT_ID_TECNICO>
BANK_SANDBOX_CLIENT_SECRET=<SEGREDO_RECEBIDO_EM_CANAL_SEGURO>
BANK_SANDBOX_TIMEOUT_MS=15000
BANK_SANDBOX_RETRY_LIMIT=2
BANK_SANDBOX_STATEMENT_FORMAT=ofx
CELERIFLOW_INSTANCE_ID=sao-joao-ivai-poc
```
