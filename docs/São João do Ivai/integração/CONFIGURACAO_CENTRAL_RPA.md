# Configuracao da Central RPA para o CeleriFlow

## Objetivo

Este documento deve ser entregue a equipe responsavel pela Central RPA e pelo agente instalado no computador da prefeitura. Nenhuma credencial bancaria, senha do Elotech ou acesso ao banco do CeleriFlow deve ser solicitado ou configurado no RPA.

O CeleriFlow envia lotes para a Central RPA. A Central guarda as pendencias no seu proprio banco, aguarda a confirmacao do usuario e o agente local executa o lancamento no Elotech usando a sessao local ja aberta.

## 1. Publicacao da Central

O endpoint receptor precisa ser acessivel por HTTPS pelo ambiente publicado do CeleriFlow:

```text
POST https://<dominio-central-rpa>/api/integration/batches
```

O servidor atual de demonstracao esta limitado a `127.0.0.1`. Esse endereco nao pode ser usado pelo CeleriFlow remoto. A Central deve ser publicada em um servico HTTPS interno ou hospedado, com certificado valido e dominio fixo.

O agente que controla o navegador pode permanecer no computador da prefeitura. Ele deve consultar a Central por HTTPS e nao precisa aceitar conexoes externas.

## 2. Segredo de entrada

Gerar uma chave aleatoria exclusiva para homologacao e configura-la na Central como:

```env
CELERIFLOW_INTEGRATION_KEY=<segredo-gerado-para-homologacao>
```

A Central deve exigir exatamente o cabecalho abaixo em todo recebimento de lote:

```http
X-CeleriFlow-Key: <segredo-gerado-para-homologacao>
```

Regras obrigatorias:

- Nunca colocar a chave em codigo, documento, URL, console ou tela.
- Rotacionar a chave que constava na versao anterior de `ENVIO_CELERIFLOW.md`.
- Usar nova chave exclusiva em producao.
- Responder `401` se a chave estiver ausente ou invalida.

## 3. Endpoint de recebimento

A Central deve aceitar o contrato abaixo e manter a idempotencia por `batchId`, `sourceEventId`, `operationId` e `bankTransactionId`.

```json
{
  "batchId": "celeri-rpa-batch-<id-imutavel>",
  "sourceEventId": "celeri-rpa-event-<id-imutavel>",
  "municipalityId": "sao-joao-do-ivai-pr",
  "sourceEventType": "RESGATE_EXECUTADO",
  "operations": [
    {
      "operationId": "celeri-rpa-op-<id-imutavel>",
      "status": "DISPONIVEL_PARA_LANCAMENTO",
      "type": "RESGATE",
      "transactionDate": "2026-08-13",
      "amount": 2130.0,
      "bankTransactionId": "identificador-imutavel-do-extrato",
      "bank": {
        "code": "001",
        "agency": "0001",
        "account": "10001-0"
      },
      "elotech": {
        "localAccount": "4578",
        "applicationAccount": "aplic-fpm"
      },
      "documentNumber": "1972",
      "history": "RESGATE APLICACAO FINANCEIRA FPM",
      "sourceReference": "Referencia auditavel da origem no extrato."
    }
  ]
}
```

Respostas obrigatorias:

| Situacao | HTTP | Corpo minimo |
| --- | --- | --- |
| Lote novo aceito | `201` | `{ "created": true }` |
| Reenvio do mesmo lote | `200` | `{ "created": false }` |
| Payload invalido | `400` | `{ "error": "..." }` |
| Chave invalida | `401` | `{ "error": "..." }` |

Nao criar uma segunda pendencia quando qualquer identificador imutavel ja existir. O RPA deve exibir somente operacoes com estado `DISPONIVEL_PARA_LANCAMENTO` ou `FALHA_REPROCESSAVEL`.

## 4. Mapeamentos do Elotech para a demonstracao

O CeleriFlow ja envia o bloco `elotech`. O agente deve usar esses valores, sem tentar inferir contas a partir do extrato.

| Tipo | Campos esperados | Valor demonstrativo |
| --- | --- | --- |
| Aplicacao | `localAccount`, `applicationAccount` | `4578`, `aplic-fpm` |
| Resgate | `localAccount`, `applicationAccount` | `4578`, `aplic-fpm` |
| Rendimento | `localAccount`, `revenueCode` | `4578`, `344` |

Para novos municipios, a tesouraria valida o mapeamento antes da ativacao. O agente deve recusar a execucao e registrar `PENDENCIA_HUMANA` se qualquer campo exigido estiver ausente.

## 5. Callback de resultado para o CeleriFlow

Depois de finalizar cada operacao, a Central deve chamar:

```text
POST https://<dominio-celeriflow>/api/integracoes/rpa/callback
```

Cabecalhos:

```http
Content-Type: application/json
X-RPA-Callback-Key: <segredo-de-callback-fornecido-pelo-CeleriFlow>
```

Payload:

```json
{
  "operationId": "celeri-rpa-op-<id-imutavel>",
  "status": "CONCLUIDA",
  "message": "Campos preenchidos e retorno de sucesso identificado no Elotech.",
  "details": {
    "sourceReference": "Referencia auditavel da origem.",
    "confirmedBy": "RPA"
  },
  "occurredAt": "2026-08-13T14:32:10.000Z"
}
```

Estados aceitos:

- `CONCLUIDA`
- `PENDENCIA_HUMANA`
- `FALHA_REPROCESSAVEL`
- `FALHA_DEFINITIVA`

O callback deve ser reenviado com o mesmo payload quando houver timeout ou erro de rede. A Central nao deve considerar a operacao sincronizada enquanto nao receber HTTP `200` do CeleriFlow. Uma resposta `409` indica que ja existe um resultado final diferente e exige revisao humana.

## 6. Comportamento do agente local

- Mostrar quantidade e dados resumidos das pendencias.
- Exigir confirmacao explicita do usuario antes de preencher o Elotech.
- Executar uma operacao por vez, na ordem recebida.
- Registrar log local com `operationId`, data/hora, tipo, valor e resultado.
- Em demonstracao, apresentar as etapas de navegacao e preenchimento.
- Em producao, preservar o log e a confirmacao humana mesmo que a visualizacao detalhada seja reduzida.
- Nao salvar, ler ou transmitir a senha do usuario Elotech.

## 7. Testes de homologacao

1. Receber aplicacao, resgate e rendimento validos.
2. Reenviar o mesmo lote e confirmar que nao ha duplicidade.
3. Validar valor e data exibidos antes da confirmacao.
4. Confirmar a execucao no Elotech simulado e receber callback `CONCLUIDA`.
5. Simular campo de mapeamento ausente e retornar `PENDENCIA_HUMANA`.
6. Simular indisponibilidade do callback e confirmar reenvio posterior.
7. Simular falha de navegador e retornar `FALHA_REPROCESSAVEL` sem criar novo `operationId`.
