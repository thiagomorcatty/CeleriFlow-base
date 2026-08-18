# Integração CeleriFlow -> Central RPA Elotech

## Objetivo

O CeleriFlow continua responsável por comunicar com os bancos, ler extratos, identificar aplicações, resgates e rendimentos, calcular valores e formar a operação financeira.

A Central RPA não acessa banco e não interpreta extrato. Ela recebe operações já tratadas pelo CeleriFlow, mostra ao usuário da prefeitura as pendências recebidas e, somente após a confirmação dele, usa a sessão já aberta do Elotech para preencher os lançamentos.

Fluxo completo:

`Banco -> CeleriFlow -> API Central RPA -> Neon -> usuário confirma -> agente RPA local -> Elotech -> log/relatório RPA -> CeleriFlow`

## Ambiente e segurança

Esta primeira integração é para homologação/demonstração.

| Item | Valor |
| --- | --- |
| Método | `POST` |
| Endpoint | `https://<URL-DA-CENTRAL-RPA>/api/integration/batches` |
| Content-Type | `application/json` |
| Autenticação | Cabeçalho `X-CeleriFlow-Key` |
| Token de homologação | Configurar exclusivamente no gerenciador de segredos da Central RPA e do CeleriFlow. |

O token acima já está configurado na Central RPA de homologação. Ele deve ser armazenado como segredo no CeleriFlow, nunca exibido em telas, logs, URLs ou repositórios.

Não enviar para a Central RPA:

- Credenciais bancárias.
- Credenciais ou senha do usuário Elotech.
- URL de conexão Neon ou qualquer acesso direto ao banco de dados.
- Extratos completos quando não forem necessários para a operação a lançar.

## Quando enviar um lote

Enviar um lote somente quando existir uma operação que deve ser lançada no Elotech. Exemplos:

- Resgate financeiro concluído no banco.
- Aplicação financeira concluída no banco.
- Rendimento de aplicação identificado no extrato.

Saldos, extratos, investimentos e movimentações puramente informativas podem continuar no CeleriFlow. Eles não devem gerar uma pendência RPA se não houver lançamento no Elotech.

O CeleriFlow pode enviar um lote logo após gerar o extrato ou concluir uma automação bancária. A Central RPA guarda a pendência até o usuário da prefeitura clicar em **Lançar pendências no Elotech**.

## Contrato da requisição

Enviar um objeto por lote:

```json
{
  "batchId": "celeri-ibipora-20260813-extrato-001",
  "sourceEventId": "celeri-evento-extrato-20260813-001",
  "municipalityId": "sao-joao-do-ivai-pr",
  "sourceEventType": "EXTRATO_GERADO",
  "operations": []
}
```

Campos do lote:

| Campo | Obrigatório | Regra |
| --- | --- | --- |
| `batchId` | Sim | Identificador único e imutável do lote no CeleriFlow. |
| `sourceEventId` | Sim | Identificador único do evento de origem. Impede reprocessamento do mesmo evento. |
| `municipalityId` | Sim | Município/entidade responsável pelo lançamento. |
| `sourceEventType` | Sim | `EXTRATO_GERADO`, `APLICACAO_EXECUTADA`, `RESGATE_EXECUTADO` ou `RENDIMENTO_IDENTIFICADO`. |
| `operations` | Sim | Lista com uma ou mais operações lançáveis no Elotech. |

## Contrato de cada operação

```json
{
  "operationId": "celeri-resgate-20260813-0001972",
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
  "sourceReference": "Extrato Banco do Brasil de 13/08/2026, linha 1972."
}
```

Campos obrigatórios por operação:

| Campo | Regra para o CeleriFlow |
| --- | --- |
| `operationId` | Único, global e imutável. Não gerar outro ID para reenvio da mesma operação. |
| `status` | Sempre enviar `DISPONIVEL_PARA_LANCAMENTO`. O usuário da prefeitura confirma a execução dentro do RPA. |
| `type` | `APLICACAO`, `RESGATE` ou `RENDIMENTO`. |
| `transactionDate` | Data bancária em ISO: `YYYY-MM-DD`. |
| `amount` | Número decimal positivo, em reais, sem `R$`, ponto de milhar ou formatação brasileira. |
| `bankTransactionId` | ID único da movimentação no banco/extrato. |
| `bank.code` | Código COMPE do banco. |
| `bank.agency` e `bank.account` | Agência e conta de origem. |
| `elotech` | Mapeamento dos códigos que o robô precisa preencher no Elotech. |
| `documentNumber` | Documento a registrar no Elotech. |
| `history` | Histórico final a registrar no Elotech. |
| `sourceReference` | Referência auditável da origem: extrato, transação, arquivo ou linha. |

## Dados específicos por tipo

### Aplicação e resgate

Enviar `elotech.localAccount` e `elotech.applicationAccount`.

```json
{
  "type": "APLICACAO",
  "elotech": {
    "localAccount": "4578",
    "applicationAccount": "aplic-fpm"
  }
}
```

Quando existir, o CeleriFlow também deve manter na operação de origem o valor principal, impostos, tarifas, rendimento e valor líquido. O campo `amount` deve corresponder exatamente ao valor que será digitado no Elotech.

### Rendimento

Enviar `elotech.localAccount` e `elotech.revenueCode`.

```json
{
  "type": "RENDIMENTO",
  "elotech": {
    "localAccount": "4578",
    "revenueCode": "344"
  }
}
```

O valor enviado deve ser o rendimento que deve ser realizado como receita. O CeleriFlow deve calcular e separar valores de impostos ou tarifas antes de disponibilizar o lançamento.

## Mapeamentos iniciais da demonstração

| Banco | Agência | Conta | Código no Elotech | Uso |
| --- | --- | --- | --- | --- |
| Banco do Brasil (`001`) | `2631-X` | `7.003-3` | `localAccount: 4578` | Conta de tesouraria/FPM |
| Rendimento de aplicação | - | - | `revenueCode: 344` | Receita de rendimento |
| Aplicação FPM | - | - | `applicationAccount: aplic-fpm` | Conta de aplicação |

O CeleriFlow deve enviar o mapeamento Elotech em cada operação. Para novos municípios e contas, o mapeamento deve ser validado pela tesouraria antes de liberar operações ao RPA.

## Idempotência e reenvio

- A Central RPA grava `batchId`, `sourceEventId`, `operationId` e `bankTransactionId` para impedir duplicidade.
- Em timeout ou falha de rede, reenviar exatamente o mesmo payload e os mesmos identificadores.
- Não criar novo lote, operação ou ID bancário para uma tentativa de reenvio.
- Resposta `201` indica novo lote recebido.
- Resposta `200` com `created: false` indica que o lote já havia sido recebido corretamente.
- Resposta `400` indica dados obrigatórios ou regra inválida; corrigir a informação antes de reenviar.
- Resposta `401` indica token ausente ou incorreto.

## Confirmação e resultado

O CeleriFlow não deve disparar o lançamento diretamente no Elotech. Depois que o lote for aceito, a Central RPA avisa o usuário local. Ele visualiza a quantidade de pendências e confirma a execução.

Depois de cada operação, o RPA registra no Neon e pode enviar o seguinte retorno ao endpoint que o CeleriFlow fornecer:

```json
{
  "operationId": "celeri-resgate-20260813-0001972",
  "status": "CONCLUIDA",
  "message": "Campos preenchidos e retorno de sucesso identificado no ambiente Elotech.",
  "details": {
    "sourceReference": "Extrato Banco do Brasil de 13/08/2026, linha 1972.",
    "confirmedBy": "RPA"
  },
  "occurredAt": "2026-08-13T14:32:10.000Z"
}
```

Estados que o CeleriFlow deve aceitar:

| Status | Significado |
| --- | --- |
| `CONCLUIDA` | O RPA concluiu o lançamento e registrou o resultado. |
| `PENDENCIA_HUMANA` | Dados, valor ou mapeamento precisam de decisão humana. |
| `FALHA_REPROCESSAVEL` | Erro transitório. Pode ser reenfileirada com o mesmo `operationId`. |
| `FALHA_DEFINITIVA` | Operação inválida ou bloqueada; requer correção no CeleriFlow ou tesouraria. |

Para habilitar o retorno, o CeleriFlow deve informar à equipe RPA:

- URL HTTPS do endpoint de callback de homologação.
- Token/chave que o RPA deve usar no callback.
- Formato adicional obrigatório, se houver.

## Checklist para o CeleriFlow

1. Criar a configuração segura com o token de homologação deste documento.
2. Configurar o `POST /api/integration/batches` na URL da Central RPA fornecida pela equipe RPA.
3. Implementar o payload exatamente conforme este documento.
4. Enviar somente operações lançáveis, com status `DISPONIVEL_PARA_LANCAMENTO`.
5. Implementar reenvio idempotente para timeout ou erro de rede.
6. Disponibilizar endpoint de callback para os resultados do RPA.
7. Enviar à equipe RPA os mapeamentos validados por município, conta, aplicação e receita.
8. Disponibilizar casos de homologação para aplicação, resgate, rendimento, duplicidade, valor divergente e falha temporária.
9. Não usar o token de homologação em produção; solicitar e configurar um novo token por ambiente.

## Antes da integração real

A URL `https://<URL-DA-CENTRAL-RPA>` deve ser publicada em ambiente interno acessível ao CeleriFlow. A demonstração atual roda localmente em `127.0.0.1`, portanto esse endereço não pode ser usado pelo CeleriFlow remoto.

O Neon permanece exclusivo da Central RPA. O CeleriFlow se comunica somente por API HTTPS.
