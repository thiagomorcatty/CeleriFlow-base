# Roteiro Operacional da POC - São João do Ivaí/PR

## Finalidade

Este roteiro cobre exclusivamente os oito itens da planilha `POC_Sao_Joao_do_Ivai_Somente_Itens_Avaliados.xlsx`:

| Grupo | Itens | Critério |
|---|---:|---|
| Características técnicas obrigatórias | 3 | 100% |
| Especificações técnicas dos módulos | 5 | Mínimo de 80% |

O Banco Virtual Robonuvem é a única origem bancária simulada. As operações realizadas após a leitura bancária são registradas de forma real na instância do CeleriFlow: receitas, movimentos de tesouraria, eventos contábeis, conciliações e trilhas de auditoria.

## Acessos da Comissão

| Responsável | E-mail | Perfil provisionado | Escopo |
|---|---|---|---|
| Comissão TI | `adminteste@email.com` | POC Avaliador Técnico de TI | Financeiro, UG 0101 |
| Comissão Administrativo-Financeira | `gestao1@email.com` | POC Avaliador Administrativo-Financeiro | Financeiro, UG 0101 |
| Comissão Contábil | `contadorteste@email.com` | POC Avaliador Contábil | Financeiro, UG 0101 |

As três contas possuem login individual e acesso operacional somente ao módulo financeiro da POC.

### Senhas temporárias

As senhas não são recuperáveis no Firebase e não devem constar neste arquivo, em planilhas ou no repositório. Entregue a senha temporária de cada avaliador por canal seguro e, se necessário, redefina-a com o procedimento administrativo antes da POC. Não utilize credenciais do Banco Virtual Robonuvem para login no CeleriFlow.

## Pré-condições

- URL do CeleriFlow acessível via HTTPS.
- Três logins entregues e testados individualmente.
- Integração `BANCO_API` ativa em `SANDBOX`.
- Banco Virtual Robonuvem acessível e autenticado.
- Período bancário disponível: agosto de 2025.
- Ambiente identificado como POC, sem movimentação financeira real no banco.

## Dados para os Testes

| Cenário | Conta | Período/Data | Valor de referência |
|---|---|---|---:|
| Receitas constitucionais | `20001-1` | 01/08/2025 a 31/08/2025 | FPM 145.000,00; FUNDEB 98.400,00; IPVA 15.500,00; ICMS 53.800,00 |
| Aplicação financeira | `10001-0` | 11/05/2026 | 80.000,00 |
| Resgate financeiro | `90001-4` | 27/05/2026 | 150.000,00 |
| Rendimento de aplicação | `90001-4` | agosto de 2025 | 4.400,00 |
| Tarifa bancária | `10001-0` | 30/06/2026 | 450,00 |
| Divergência controlada | conta consultada | cenário `UNRECOGNIZED_TRANSACTION` | 999,99 |

## Sequência de Demonstração

### 1. Tela Inicial - Item 3.1.1 a.1

1. Acessar a URL da POC.
2. Entrar com um dos três logins da comissão.
3. Confirmar que a primeira tela se chama `Home`.
4. Confirmar a presença das opções `Home` e `Automações`.
5. Abrir `Automações` e retornar por `Home`.

**Evidência:** navegação web simples, intuitiva e sem erro.

### 2. Acesso e Login - Item 3.1.1 a.2

1. Demonstrar login válido com cada perfil da comissão.
2. Tentar abrir uma rota financeira sem sessão autenticada e confirmar o bloqueio.
3. Com um perfil da comissão, confirmar que somente o módulo financeiro fica disponível na Home.
4. Solicitar uma automação e registrar o usuário responsável.

**Evidência:** sessão individual, restrição por perfil e trilha de auditoria de acesso e interação.

### 3. Catálogo e Acompanhamento - Item 3.1.1 a.3

1. Abrir `Home > Automações`.
2. Confirmar o histórico de extratos, execuções bancárias e falhas.
3. Abrir `Nova automação`.
4. Informar conta e período e executar a tarefa.
5. Voltar ao painel de automações e conferir status, data/hora e detalhe da execução.

**Evidência:** catálogo de automações, parâmetros, andamento, resultado e histórico.

### 4. Download e Arquivamento de Extratos - Item 3.1.2-01

**Tela:** `Financeiro > Extratos Bancários`

1. Confirmar que o banco está fixado como `Banco Virtual Robonuvem`.
2. Executar para conta `20001-1`, agência `0001`, período de `01/08/2025` a `31/08/2025`.
3. Exibir o console de execução, o formato recebido, hash SHA-256 e local de arquivamento.
4. Abrir o extrato arquivado pelo histórico.
5. Repetir para a conta de aplicação `90001-4`.
6. Repetir uma solicitação já processada e confirmar que não são duplicados os itens importados.

**Resultado no CeleriFlow:** documento arquivado, itens de extrato persistidos e auditoria financeira criada.

### 5. Aplicações e Resgates - Item 3.1.2-02

**Tela:** `Financeiro > Resgates e Aplicações`

1. Confirmar que os lançamentos exibidos vieram do Banco Virtual Robonuvem.
2. Selecionar a aplicação da conta `10001-0` ou o resgate da conta `90001-4`.
3. Mostrar classificação, justificativa, valor bruto, encargos, valor líquido e prévia contábil.
4. Clicar em `Registrar no CeleriFlow & Gerar Recibo`.
5. Exibir recibo, número do lançamento e hash de integração.
6. Repetir a operação e comprovar que o lançamento já processado não é duplicado.

**Resultado no CeleriFlow:** movimento de tesouraria, vínculo ao item do extrato, recibo e auditoria financeira.

### 6. Rendimentos - Item 3.1.2-03

**Tela:** `Financeiro > Rendimentos de Aplicações`

1. Informar conta `90001-4` e o período de agosto de 2025.
2. Clicar em `Consultar rendimentos no extrato de aplicação`.
3. Selecionar o rendimento retornado pelo banco.
4. Mostrar cálculo bruto, IRRF, IOF, correção, líquido, saldo acumulado e classificação contábil.
5. Clicar em `Registrar Rendimento no CeleriFlow`.
6. Exibir recibo e confirmar o histórico de rendimentos.

**Resultado no CeleriFlow:** receita arrecadada, movimento de tesouraria, evento contábil, rendimento vinculado ao extrato e auditoria.

### 7. Receitas Constitucionais e Legais - Item 3.1.2-04

**Tela:** `Financeiro > Regras Constitucionais`

1. Conferir as regras de FPM, FUNDEB, IPVA, ICMS, ITR, FEP, IPI Exportação, royalties e ADO/LC 176.
2. Após baixar o extrato da conta `20001-1`, abrir a `Fila de Exceções`.
3. Selecionar FPM, FUNDEB, IPVA e ICMS e processar cada receita.
4. Exibir classificação, natureza, fonte, evento contábil, valor e recibo gerado.
5. Ativar o cenário bancário `UNRECOGNIZED_TRANSACTION`, baixar o extrato e demonstrar a pendência controlada.

**Resultado no CeleriFlow:** receita, movimento de tesouraria, lançamento contábil, vínculo bancário, pendência ou recibo e auditoria.

### 8. Conciliação Bancária - Item 3.1.2-05

**Tela:** `Financeiro > Conciliação Bancária`

1. Informar Banco Virtual Robonuvem, agência `0001`, conta `20001-1` e período `2025-08`.
2. Clicar em `Abrir Conciliação & Carregar Tesouraria`.
3. Mostrar saldo inicial, créditos, débitos, saldo final do extrato, saldo da tesouraria e diferença.
4. Clicar em `Executar Correspondência Automática`.
5. Exibir itens conciliados, itens sem correspondência e divergências.
6. Após eliminar pendências, clicar em `Confirmar Conciliação no CeleriFlow`.
7. Exibir recibo, hash e status final `CONCILIADA`.

**Resultado no CeleriFlow:** sessão de conciliação, correspondências, conciliação confirmada e auditoria financeira.

## Evidências de Encerramento

1. Abrir `Financeiro > Automações` e apresentar execuções, extratos e eventuais falhas.
2. Com o administrador da POC, abrir `Configurações > Auditoria de Uso` e filtrar os registros da demonstração.
3. Conferir que os eventos indicam usuário, data/hora, navegação, envio de formulários e interações, sem armazenar conteúdo sensível de campos.
4. Registrar na planilha de avaliação o resultado `ATENDE`, `NÃO ATENDE` ou `PENDENTE` para cada item 3.1.1 e 3.1.2.

## Cenário de Falha Controlada

Use o painel administrativo do Banco Virtual Robonuvem para ativar um cenário, execute uma automação e demonstre a falha no histórico. Em seguida, restaure o cenário normal e repita a automação com sucesso. Cenários disponíveis incluem credencial inválida, indisponibilidade, timeout, extrato inválido e transação não reconhecida.

## Regras da Apresentação

- Não afirmar integração com banco oficial ou usar dados bancários reais.
- Não utilizar outro banco, conta ou integração durante a POC.
- Não expor senhas, tokens, `client_secret` ou variáveis de ambiente.
- Diferenciar claramente: dados bancários simulados pelo Banco Virtual Robonuvem e registros reais persistidos no CeleriFlow.
