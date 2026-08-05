# Guia de criação do Banco Simulado para a POC de São João do Ivaí/PR

**Licitação:** Pregão Eletrônico nº 51/2026  
**Processo:** nº 102/2026  
**Finalidade:** criar um ambiente externo de testes que simule uma instituição bancária, permitindo ao CeleriFlow demonstrar as automações financeiras exigidas na Prova de Conceito.

---

## 1. Objetivo do ambiente

O banco simulado deverá funcionar como um sistema externo independente do CeleriFlow, acessível pela internet e capaz de fornecer:

- autenticação de usuários e integrações;
- contas correntes e contas de aplicação;
- saldos;
- movimentações bancárias;
- extratos por período;
- download de extratos em formatos estruturados;
- cenários controlados de sucesso, falha e indisponibilidade;
- histórico de acessos e chamadas;
- dados fictícios reiniciáveis para repetição da POC.

O ambiente deve permitir demonstrar que o CeleriFlow:

1. conecta-se a um sistema bancário externo;
2. consulta contas e movimentações;
3. baixa e arquiva extratos;
4. identifica aplicações, resgates, rendimentos e receitas;
5. utiliza essas informações nas rotinas de conciliação e lançamento;
6. registra o andamento, o resultado e eventuais falhas das automações.

> O simulador deve ser apresentado como **ambiente externo de testes**, e não como integração oficial com banco real.

---

## 2. Organização recomendada

### 2.1 Repositório

Criar um repositório separado do CeleriFlow:

```text
celeriflow-poc-sandbox
```

Estrutura recomendada:

```text
celeriflow-poc-sandbox/
├── app/
│   ├── banco/
│   │   ├── login/
│   │   ├── contas/
│   │   ├── extratos/
│   │   ├── movimentacoes/
│   │   └── administracao/
│   └── api/
│       └── bank/
│           ├── auth/
│           ├── accounts/
│           ├── transactions/
│           ├── statements/
│           ├── scenarios/
│           └── health/
├── lib/
│   ├── auth/
│   ├── statements/
│   ├── scenarios/
│   └── audit/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── scripts/
│   ├── reset-poc.ts
│   └── validate-poc.ts
├── public/
├── .env.example
└── README.md
```

### 2.2 Infraestrutura

Criar recursos independentes:

| Recurso | Configuração sugerida |
|---|---|
| GitHub | Repositório `celeriflow-poc-sandbox` |
| Vercel | Projeto exclusivo para o simulador |
| Neon PostgreSQL | Banco exclusivo do simulador |
| Domínio | `banco-poc.celeriflow.com.br` |
| Ambiente | Produção controlada para a POC |
| Dados | Exclusivamente fictícios |
| Autenticação | Própria ou Firebase separado |
| Armazenamento | Vercel Blob ou armazenamento local controlado |

Não utilizar o mesmo banco de dados do CeleriFlow.

---

## 3. Arquitetura da integração

```text
Comissão Avaliadora
        │
        ▼
CeleriFlow — Ambiente da POC
        │
        │ HTTPS / API autenticada
        ▼
Banco Simulado
        ├── Autenticação
        ├── Contas
        ├── Saldos
        ├── Movimentações
        ├── Extratos OFX/CSV/PDF
        ├── Cenários de falha
        └── Logs de integração
```

Fluxo esperado:

1. o usuário entra no CeleriFlow;
2. escolhe uma automação;
3. informa conta e período;
4. o CeleriFlow autentica-se no banco simulado;
5. o banco retorna contas, movimentos ou extrato;
6. o CeleriFlow processa os dados;
7. o arquivo é arquivado;
8. o resultado é exibido no painel;
9. a execução fica registrada em log.

---

## 4. Perfis de acesso

Criar pelo menos os seguintes perfis:

### 4.1 Usuário visual da tesouraria

```text
Login: tesouraria.poc
Perfil: TREASURY
Permissões:
- visualizar contas;
- visualizar saldos;
- visualizar movimentações;
- gerar extratos;
- baixar arquivos;
- não alterar dados-base.
```

### 4.2 Usuário técnico de integração

```text
Client ID: celeriflow-poc
Perfil: API_INTEGRATION
Permissões:
- autenticar na API;
- consultar contas;
- consultar saldos;
- consultar movimentações;
- solicitar e baixar extratos;
- consultar status do serviço;
- sem acesso às rotas administrativas.
```

### 4.3 Administrador do simulador

```text
Login: admin.poc
Perfil: SANDBOX_ADMIN
Permissões:
- ativar cenários;
- restaurar dados;
- simular indisponibilidade;
- consultar logs;
- criar ou revogar credenciais;
- bloquear temporariamente uma conta.
```

---

## 5. Funcionalidades obrigatórias do banco simulado

### 5.1 Login

O portal deverá possuir:

- tela de login;
- validação de credenciais;
- bloqueio de usuário inválido;
- sessão com expiração;
- logout;
- registro de login bem-sucedido e malsucedido.

### 5.2 Lista de contas

Exibir:

- banco;
- agência;
- número da conta;
- tipo da conta;
- descrição;
- situação;
- saldo atual;
- data e hora da última atualização.

Tipos mínimos:

- conta corrente;
- conta de aplicação;
- conta receptora de transferências legais e constitucionais.

### 5.3 Movimentações bancárias

Permitir consulta por:

- conta;
- data inicial;
- data final;
- tipo de movimentação;
- valor;
- histórico;
- documento;
- identificador externo.

Cada movimentação deverá possuir um `external_id` único.

### 5.4 Extratos

O simulador deverá:

- gerar extrato por conta e período;
- disponibilizar OFX;
- disponibilizar CSV;
- opcionalmente disponibilizar PDF;
- informar data e hora da geração;
- manter o arquivo acessível para download;
- retornar hash ou identificador do arquivo;
- permitir regeneração sem alterar as movimentações.

### 5.5 Saldo

Disponibilizar:

- saldo inicial do período;
- total de créditos;
- total de débitos;
- saldo final;
- saldo atual;
- data e hora da posição.

### 5.6 Cenários controlados

O sistema deverá permitir ativar:

1. cenário normal;
2. credencial inválida;
3. serviço indisponível;
4. timeout;
5. arquivo de extrato inválido;
6. movimentação não reconhecida;
7. duplicidade de requisição;
8. conta bloqueada;
9. período sem movimentações.

---

## 6. Modelo mínimo de dados

Tabelas sugeridas:

```text
bank_users
api_clients
banks
branches
accounts
account_balances
transactions
statements
statement_files
test_scenarios
scenario_executions
integration_sessions
audit_logs
```

### 6.1 Estrutura de `accounts`

```text
id
bank_id
branch_number
account_number
check_digit
account_type
description
currency
status
created_at
updated_at
```

Valores possíveis para `account_type`:

```text
CHECKING
INVESTMENT
TRANSFER_REVENUE
```

### 6.2 Estrutura de `transactions`

```text
id
external_id
account_id
transaction_date
posting_date
amount
direction
transaction_type
bank_code
description
document_number
balance_after
scenario_id
created_at
```

Valores possíveis para `direction`:

```text
CREDIT
DEBIT
```

Valores possíveis para `transaction_type`:

```text
FPM
FEP
ITR
ICMS
IPI_EXPORTACAO
ROYALTIES
FUNDEB
ADO_LC_176_2020
IPVA
OTHER_REVENUE
INVESTMENT
REDEMPTION
YIELD
BANK_FEE
TRANSFER
OTHER
```

### 6.3 Estrutura de `statements`

```text
id
account_id
period_start
period_end
opening_balance
total_credits
total_debits
closing_balance
status
generated_at
```

### 6.4 Estrutura de `audit_logs`

```text
id
actor_type
actor_id
action
resource
resource_id
request_id
ip_address
user_agent
result
details
created_at
```

Não gravar senhas, tokens ou segredos em texto aberto nos logs.

---

## 7. Dados fictícios sugeridos

### 7.1 Contas

| Conta | Tipo | Descrição |
|---|---|---|
| 0001 / 10001-0 | Corrente | Tesouraria Geral |
| 0001 / 20001-1 | Transferências | Receitas constitucionais |
| 0001 / 90001-4 | Aplicação | Aplicações financeiras |

### 7.2 Movimentações

| Evento | Valor sugerido |
|---|---:|
| FPM | R$ 120.000,00 |
| FUNDEB | R$ 80.000,00 |
| IPVA | R$ 15.500,00 |
| ICMS | R$ 32.000,00 |
| Aplicação financeira | R$ 50.000,00 |
| Resgate | R$ 20.000,00 |
| Rendimento | R$ 1.250,60 |
| Tarifa bancária | R$ 350,00 |
| Receita não reconhecida | R$ 725,00 |

Os dados devem permitir demonstrar:

- créditos constitucionais;
- aplicação;
- resgate;
- rendimento;
- lançamento não classificado;
- diferença para conciliação;
- reprocessamento sem duplicidade.

---

## 8. APIs recomendadas

### 8.1 Autenticação

```http
POST /api/bank/auth/token
```

Exemplo de resposta:

```json
{
  "access_token": "token-temporario",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### 8.2 Contas

```http
GET /api/bank/accounts
GET /api/bank/accounts/{accountId}
GET /api/bank/accounts/{accountId}/balance
```

### 8.3 Movimentações

```http
GET /api/bank/accounts/{accountId}/transactions?start=2026-07-01&end=2026-07-31
```

### 8.4 Extratos

```http
POST /api/bank/accounts/{accountId}/statements
GET /api/bank/statements/{statementId}
GET /api/bank/statements/{statementId}/download?format=ofx
GET /api/bank/statements/{statementId}/download?format=csv
GET /api/bank/statements/{statementId}/download?format=pdf
```

### 8.5 Saúde do serviço

```http
GET /api/bank/health
```

Resposta esperada:

```json
{
  "status": "UP",
  "database": "UP",
  "statements": "UP",
  "timestamp": "2026-08-04T22:00:00-03:00"
}
```

### 8.6 Administração de cenários

```http
POST /api/bank/admin/scenarios/{scenarioId}/activate
POST /api/bank/admin/scenarios/reset
POST /api/bank/admin/outage/start
POST /api/bank/admin/outage/stop
```

As rotas administrativas não devem ser acessíveis pela conta técnica usada pelo CeleriFlow.

---

## 9. Idempotência e prevenção de duplicidade

Cada movimentação deve possuir identificador externo único.

O CeleriFlow deverá registrar:

```text
bank_transaction_external_id
account_id
automation_type
processing_status
processed_at
target_entry_id
```

Regras:

- a mesma transação não pode gerar dois lançamentos;
- uma automação repetida deve retornar que o item já foi processado;
- reprocessamento somente poderá ocorrer com comando explícito;
- todas as tentativas devem permanecer no histórico;
- falhas parciais não devem marcar a tarefa como concluída.

---

## 10. Geração de extratos

### 10.1 OFX

O OFX deverá conter, no mínimo:

- banco;
- agência;
- conta;
- período;
- saldo inicial;
- saldo final;
- data da transação;
- tipo;
- valor;
- identificador único;
- histórico.

### 10.2 CSV

Colunas sugeridas:

```text
external_id
transaction_date
posting_date
direction
amount
transaction_type
description
document_number
balance_after
```

### 10.3 PDF

O PDF é opcional para processamento, mas útil para demonstração visual.

Deve informar:

- identificação do ambiente como simulado;
- conta;
- período;
- movimentações;
- totais;
- saldo;
- data e hora de geração.

---

## 11. Configuração do CeleriFlow

Variáveis sugeridas:

```env
POC_MODE=true
POC_CLIENT=SAO_JOAO_IVAI

BANK_SANDBOX_BASE_URL=https://banco-poc.celeriflow.com.br/api/bank
BANK_SANDBOX_CLIENT_ID=celeriflow-poc
BANK_SANDBOX_CLIENT_SECRET=definir-no-vercel
BANK_SANDBOX_TIMEOUT_MS=15000
BANK_SANDBOX_RETRY_LIMIT=2
BANK_SANDBOX_STATEMENT_FORMAT=ofx
```

Regras:

- não versionar `.env`;
- não colocar segredos no código;
- utilizar variáveis distintas para preview e produção;
- permitir rotação imediata das credenciais;
- mascarar tokens em logs;
- limitar o domínio de origem aceito.

---

## 12. Segurança mínima

Checklist:

- [ ] HTTPS obrigatório.
- [ ] Cookies seguros e `HttpOnly`, quando utilizados.
- [ ] Tokens com expiração.
- [ ] Senhas protegidas por hash.
- [ ] Segredos somente em variáveis de ambiente.
- [ ] Controle de acesso por perfil.
- [ ] Limitação de tentativas de login.
- [ ] Rate limit nas APIs.
- [ ] CORS restrito ao domínio da POC.
- [ ] Logs sem credenciais.
- [ ] Dados exclusivamente fictícios.
- [ ] Banco de dados separado.
- [ ] Backup antes da demonstração.
- [ ] Função de restauração do cenário.
- [ ] Registro de falhas e indisponibilidades.
- [ ] Identificação visível de “AMBIENTE DE TESTES”.

---

## 13. Botão de restauração da POC

Criar função administrativa:

```text
Restaurar cenário da POC
```

Ela deverá:

1. excluir execuções anteriores;
2. restaurar contas e saldos;
3. restaurar movimentações;
4. remover arquivos gerados;
5. restaurar cenários;
6. limpar sessões expiradas;
7. manter usuários e credenciais;
8. registrar a restauração em log.

O reset deverá ser testado diversas vezes antes da apresentação.

---

## 14. Testes do banco simulado

### 14.1 Autenticação

- [ ] autenticar com credencial válida;
- [ ] rejeitar credencial inválida;
- [ ] expirar token;
- [ ] bloquear rota administrativa;
- [ ] registrar tentativa no log.

### 14.2 Contas e saldos

- [ ] listar as três contas;
- [ ] consultar saldo;
- [ ] conferir saldo inicial e final;
- [ ] consultar conta inexistente;
- [ ] consultar conta bloqueada.

### 14.3 Movimentações

- [ ] consultar período com dados;
- [ ] consultar período sem dados;
- [ ] filtrar por tipo;
- [ ] conferir identificadores únicos;
- [ ] validar créditos e débitos.

### 14.4 Extratos

- [ ] gerar OFX;
- [ ] gerar CSV;
- [ ] gerar PDF;
- [ ] baixar o arquivo;
- [ ] verificar conteúdo;
- [ ] repetir geração;
- [ ] simular arquivo inválido.

### 14.5 Falhas

- [ ] simular timeout;
- [ ] simular HTTP 401;
- [ ] simular HTTP 403;
- [ ] simular HTTP 404;
- [ ] simular HTTP 429;
- [ ] simular HTTP 500;
- [ ] simular indisponibilidade total;
- [ ] restaurar funcionamento.

---

## 15. Roteiro de validação com o CeleriFlow

1. acessar o CeleriFlow;
2. selecionar “Download de extratos”;
3. informar conta e período;
4. confirmar autenticação no banco simulado;
5. gerar e baixar extrato;
6. abrir o arquivo arquivado;
7. consultar as movimentações;
8. identificar aplicação;
9. identificar resgate;
10. identificar rendimento;
11. identificar FPM, FUNDEB, IPVA e demais receitas;
12. enviar os resultados ao fluxo contábil simulado;
13. realizar conciliação;
14. exibir divergência;
15. consultar logs;
16. repetir a automação;
17. confirmar ausência de duplicidade;
18. simular falha;
19. exibir tratamento da falha;
20. restaurar o cenário.

---

## 16. Critérios internos de conclusão

O banco simulado estará pronto quando:

- [ ] estiver publicado em nuvem;
- [ ] funcionar fora da rede do desenvolvedor;
- [ ] possuir HTTPS válido;
- [ ] possuir contas corrente, aplicação e receitas;
- [ ] gerar OFX e CSV;
- [ ] permitir acesso por API;
- [ ] possuir autenticação;
- [ ] possuir cenários de erro;
- [ ] possuir logs;
- [ ] restaurar dados por comando administrativo;
- [ ] funcionar com o CeleriFlow de ponta a ponta;
- [ ] suportar reprocessamento sem duplicidade;
- [ ] utilizar somente dados fictícios;
- [ ] estar identificado como ambiente de testes.

---

## 17. Observação sobre o sistema de gestão pública simulado

O banco simulado fornece os dados bancários. Entretanto, quatro rotinas da POC também exigem demonstrar registros no sistema de gestão pública:

- aplicações e resgates;
- rendimentos;
- receitas legais e constitucionais;
- conciliação bancária.

Por isso, recomenda-se que o mesmo repositório possua também uma API separada de **ERP municipal simulado**, ou que seja criado um segundo serviço de sandbox.

O ambiente deve ser apresentado como:

> “Sistema externo de testes que representa o sistema de gestão pública municipal para fins exclusivos de demonstração da integração.”

Não deve ser identificado como EloWeb oficial e não deve utilizar dados reais do Município.

---

## 18. Base documental utilizada

Este guia foi elaborado com base especialmente em:

- Termo de Referência, itens 1, 4.3, 7 e 14;
- Anexo VIII — Prova de Conceito;
- requisitos de base de testes, ambiente em nuvem e demonstração efetiva das funções;
- módulos de extratos, aplicações e resgates, rendimentos, receitas constitucionais e conciliação bancária.
