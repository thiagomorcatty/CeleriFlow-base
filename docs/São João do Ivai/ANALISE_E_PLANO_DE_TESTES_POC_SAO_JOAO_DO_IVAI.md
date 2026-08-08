# Análise Financeira-Contábil e Plano de Testes da POC - São João do Ivaí/PR

## 1. Objetivo e escopo

Este documento transforma os oito itens da planilha `POC_Sao_Joao_do_Ivai_Somente_Itens_Avaliados.xlsx` em testes executáveis. Também avalia, sob a ótica de tesouraria, contabilidade e controle interno, os fluxos que sustentam a demonstração:

- acesso, telas, botões e trilhas de auditoria;
- integração com o Banco Virtual Robonuvem externo;
- extratos, aplicações, resgates, rendimentos e receitas constitucionais;
- movimento de caixa, saldos por conta, relatórios e razão contábil;
- conciliação, divergências, idempotência, falhas e segregação de acesso.

A análise é estática, baseada no código e nos documentos da POC. O status `PRONTO PARA TESTE` não significa homologação: cada caso abaixo precisa ser executado no ambiente isolado, com a evidência indicada.

## 2. Regra de aprovação da POC

| Grupo | Itens | Regra formal |
|---|---:|---|
| Características técnicas | CT-01 a CT-03 | 3 de 3, ou 100% |
| Módulos funcionais | MOD-01 a MOD-05 | mínimo de 4 de 5, ou 80% |

Recomendação interna: não liberar a apresentação com ressalva em qualquer um dos cinco módulos. A comissão pode solicitar todos e a documentação da POC trata todos como funcionalidades mínimas.

## 3. Premissas e limites que devem ser declarados

- O Banco Virtual Robonuvem é a única fonte bancária externa e simulada da POC.
- Os dados bancários são simulados; operações após sua leitura são persistidas de verdade no CeleriFlow de avaliação.
- Não afirmar integração com banco oficial, CNAB de produção, OFX de banco oficial, EloWeb de produção ou movimentação financeira real.
- Relatórios gerados pelo sistema são internos. Diário, Razão e Balancete usam lançamentos contábeis postados; Balanço Financeiro e Fluxo de Caixa anual são sínteses de tesouraria e se identificam como não estatutários.
- A POC não prova conformidade com leiautes de TCE, STN ou SICONFI. Ela prova o fluxo técnico-funcional exigido no Anexo VIII.

## 4. Diagnóstico executivo

| Área | Avaliação estática | Situação para a POC | Decisão de teste |
|---|---|---|---|
| Interface, Home e Automações | Há Home, catálogo/histórico de automações, status de execução, erros e auditoria de interação. | PRONTO PARA TESTE | Executar CT-01 a CT-03 com os três perfis. |
| Banco Virtual externo | O cliente autentica, consulta contas, gera/baixa OFX, arquiva conteúdo privado, importa itens e registra execução. | PRONTO PARA TESTE | Validar contrato, hash, período, usuário, idempotência e cenários de falha. |
| Extratos | Há download, arquivamento, histórico, SHA-256 e deduplicação de itens por identificador externo. | PRONTO COM RISCO | Testar repetição e concorrência; o arquivo é arquivado antes da transação e pode ficar órfão se a gravação falhar. |
| Aplicações e resgates | A transmissão deriva os dados do extrato no servidor, cria transferência pareada, movimento de tesouraria, lançamento contábil equilibrado, recibo, vínculo e auditoria. | PRONTO PARA TESTE | Validar as duas contas, as partidas dobradas e a idempotência. |
| Rendimentos | Calcula bruto, IRRF, IOF, correção e líquido; registra receita, tesouraria, evento contábil, vínculo e auditoria. | PRONTO PARA TESTE | Validar cálculo, saldo, idempotência e reflexo em Diário/Razão. |
| Receitas constitucionais | Regras e fila de exceções processam receita, tesouraria, contabilidade e auditoria. | PRONTO PARA TESTE | Validar FPM, FUNDEB, IPVA, ICMS e item não reconhecido. |
| Conciliação | Carrega extrato e movimentos da mesma conta, calcula o razão bancário pelos débitos e créditos da conta analítica vinculada e só confirma sem diferença e sem pendências. | PRONTO PARA TESTE | Validar vínculo exclusivo da conta, memória de cálculo e recálculo antes da confirmação. |
| Relatórios e razão | Diário, Razão e Balancete consultam somente lançamentos contábeis postados. | PRONTO COM RESSALVA | Verificar separadamente receitas/rendimentos e aplicações/resgates. |
| Controle de caixa | Saldo operacional é derivado de movimentos de tesouraria confirmados. | RISCO ALTO | Recalcular por conta e confrontar com o extrato; conferir saldo de abertura. |

## 5. Achados financeiros e contábeis prioritários

### Controles corrigidos - validar no ensaio

| ID | Achado | Impacto | Evidência técnica | Teste de aceitação |
|---|---|---|---|---|
| FIN-01 | Aplicação e resgate agora criam `TreasuryTransfer` com dois movimentos opostos e `AccountingTransaction` com partidas dobradas. | A operação deve aparecer no Diário, Razão e Balancete. | `classification-engine.ts` e `src/lib/financeiro/index.ts` | Executar T-M02-05 e T-M02-06; falha em qualquer partida é bloqueio. |
| FIN-02 | A transmissão aceita apenas o ID do item; valor, categoria, data, histórico, conta e sinal são derivados no servidor. | Impede gravação baseada em valor ou categoria manipulados no navegador. | `resgates-actions.ts` e `classification-engine.ts` | Executar T-M02-07; campos forjados não podem alterar a persistência. |
| FIN-03 | Aplicação transfere de corrente para aplicação; resgate transfere de aplicação para corrente. | Os saldos das duas contas permanecem coerentes. | `classification-engine.ts` e `createTreasuryTransferInTransaction` | Executar T-M02-05 e T-M02-08. |
| FIN-04 | Cada conta bancária possui conta analítica exclusiva e a conciliação calcula o razão por `AccountingEntry` postado. | O saldo do razão bancário é independente dos movimentos de tesouraria. | `getBankAccountLedgerBalance`, `conciliacao-bancaria/actions.ts` e `reconciliation-engine.ts` | Executar T-M05-02 e T-M05-04 com memória de cálculo. |

### P1 - riscos relevantes para controle interno e evidência

| ID | Achado | Impacto | Teste obrigatório |
|---|---|---|---|
| FIN-05 | Correspondência automática agora exige banco, agência, conta, valor absoluto, data e sentido compatível. | Evita conciliar crédito bancário com saída de tesouraria de mesmo valor. | T-M05-06 e T-M05-07 devem resultar em divergência. |
| FIN-06 | Agrupamentos e relações um-para-muitos não são mais propostos automaticamente. | Casos sem vínculo individual permanecem pendentes e não podem ser confirmados. | T-M05-08 deve permanecer pendente. |
| FIN-07 | Saldos de telas são calculados pelos movimentos de tesouraria, enquanto o provisionamento pode gravar saldo corrente sem movimento de abertura correspondente. | Diferença entre saldo cadastral, saldo de tesouraria e saldo bancário. | T-CAI-01 a T-CAI-03 antes de qualquer demonstração. |
| FIN-08 | Download grava Blob antes da transação e a idempotência do download é por hash de conteúdo. | Requisição concorrente pode deixar arquivo não referenciado; extrato reemitido pode exigir inspeção dos IDs externos. | T-M01-06 e T-M01-07. |
| FIN-09 | Acesso a extrato arquivado e operações por ID precisam ser testados contra escopo de unidade gestora. | Risco de leitura cruzada entre unidades. | T-SEG-03 a T-SEG-05. |

## 6. Dados oficiais para o ensaio

| Cenário | Conta | Agência | Data ou período | Valor | Identificador externo |
|---|---|---|---|---:|---|
| FPM | 20001-1 | 0001 | 10/08/2025 | 145.000,00 | TX-20250810-1001 |
| FUNDEB | 20001-1 | 0001 | 15/08/2025 | 98.400,00 | TX-20250815-1003 |
| IPVA | 20001-1 | 0001 | 20/08/2025 | 15.500,00 | TX-20250820-1005 |
| ICMS | 20001-1 | 0001 | 20/08/2025 | 53.800,00 | TX-20250820-1004 |
| Aplicação | 10001-0 | 0001 | 11/05/2026 | 80.000,00 | TX-20260511-1099 |
| Resgate | 90001-4 | 0001 | 27/05/2026 | 150.000,00 | TX-20260527-1119 |
| Rendimento | 90001-4 | 0001 | 28/08/2025 | 4.400,00 | TX-20250830-1010 |
| Tarifa | 10001-0 | 0001 | 30/06/2026 | 450,00 | TX-20260630-1157 |
| Não reconhecida | conta consultada | 0001 | cenário controlado | 999,99 | TX-UNRECOGNIZED-999 |

## 7. Pré-condições e controle do ensaio

1. Congelar versão, URL, commit e configuração do ambiente antes do ensaio.
2. Confirmar HTTPS e acesso externo com os três usuários da comissão: `adminteste@email.com`, `gestao1@email.com` e `contadorteste@email.com`.
3. Confirmar que os perfis têm somente Financeiro e UG 0101.
4. Confirmar `BANCO_API` como ativa, ambiente `SANDBOX`, banco `001 - Banco Virtual Robonuvem` e agência `0001`.
5. Executar `npm run seed:poc-bank-sandbox` somente em ambiente isolado: o script desativa contas bancárias não pertencentes à POC.
6. Validar saúde, token e extrato antes da sessão; não expor segredo, token ou `client_secret`.
7. Resetar o Banco Virtual para `NORMAL`, registrar data/hora do reset e preservar uma cópia dos resultados do ensaio anterior.
8. Criar pasta de evidências fora do repositório com vídeos, capturas, hashes, recibos, arquivos OFX e relatório de execução.

## 8. Roteiro de testes por item da planilha

### CT-01 - Tela inicial

| ID | Ação e botão/interação | Resultado esperado | Evidência |
|---|---|---|---|
| T-CT01-01 | Abrir a URL sem sessão. | Redirecionamento ou bloqueio de rota protegida; não exibir dados financeiros. | Captura da rota e resposta. |
| T-CT01-02 | Entrar com cada um dos três usuários. | Home carregada, legível, sem erro de console e com opções `Home` e `Automações`. | Vídeo curto por perfil. |
| T-CT01-03 | Clicar em `Automações`, retornar por `Home` e repetir em viewport desktop e móvel. | Navegação preserva sessão e não mostra módulos fora do escopo. | Capturas antes/depois e auditoria de navegação. |

Critério de aprovação: os três perfis acessam a Home e a navegação não apresenta erro funcional.

### CT-02 - Login, autorização e trilha

| ID | Ação e botão/interação | Resultado esperado | Evidência |
|---|---|---|---|
| T-CT02-01 | Login válido em cada perfil. | Sessão individual e identificação de usuário. | Captura de sessão e evento de auditoria. |
| T-CT02-02 | Login com senha incorreta ou usuário inexistente. | Negação sem revelar se o usuário existe. | Captura da mensagem segura. |
| T-CT02-03 | Abrir diretamente rotas Financeiro sem sessão. | Redirecionamento ou erro de autorização. | URL e captura. |
| T-CT02-04 | Com perfil da comissão, tentar acessar módulo não financeiro e URL direta desse módulo. | Menu e rota bloqueados. | Captura do menu e resultado da rota. |
| T-CT02-05 | Solicitar uma automação autenticado e consultar auditoria como administrador autorizado. | Usuário, data/hora, ação e rota registrados sem conteúdo sensível. | Registro de auditoria e execução. |

Critério de aprovação: nenhum acesso não autorizado; todas as solicitações de automação têm responsável rastreável.

### CT-03 - Catálogo, parâmetros e acompanhamento das automações

| ID | Ação e botão/interação | Resultado esperado | Evidência |
|---|---|---|---|
| T-CT03-01 | Abrir `Home > Automações`. | Exibir contadores de extratos, execuções e falhas. | Captura inicial. |
| T-CT03-02 | Clicar em `Nova automação`. | Abrir `Extratos Bancários` com formulário de conta e período. | Vídeo da navegação. |
| T-CT03-03 | Informar conta/período válido e acionar o botão de download. | Status de sucesso, histórico, data/hora, conta, hash e arquivo disponível. | Registro de execução e página de Automações. |
| T-CT03-04 | Executar cenário controlado de indisponibilidade e repetir após reset. | Falha legível e registrada; nova execução após reset concluída. | Dois registros de `IntegrationRun`. |

Critério de aprovação: há catálogo, parâmetros, resultado e histórico de sucesso/falha.

### MOD-01 - Download e arquivamento de extratos

| ID | Ação e botão/interação | Resultado esperado | Evidência |
|---|---|---|---|
| T-M01-01 | Selecionar conta 20001-1, 01/08/2025 a 31/08/2025 e acionar download. | OFX recebido, itens persistidos, hash SHA-256, usuário, conta e período registrados. | OFX aberto, histórico e hash. |
| T-M01-02 | Repetir para conta de aplicação 90001-4 em agosto/2025. | Mesmo ciclo, com conta de aplicação identificada. | Arquivo e tela de histórico. |
| T-M01-03 | Abrir o arquivo pelo botão `Abrir` em Automações. | Arquivo privado acessível ao usuário autorizado e evento de consulta registrado. | Download e log. |
| T-M01-04 | Repetir a mesma solicitação normal. | Não duplicar `BankStatementItem` com o mesmo identificador externo; preservar histórico da tentativa conforme regra adotada. | Contagem antes/depois por `external_id`. |
| T-M01-05 | Ativar `INVALID_CREDS`, `SERVICE_UNAVAILABLE`, `TIMEOUT`, `INVALID_STATEMENT`, `ACCOUNT_BLOCKED` e `EMPTY_PERIOD`, um por vez. | Mensagem compreensível, sem segredo; falha registrada e sem item bancário inválido. | Uma evidência por cenário. |
| T-M01-06 | Enviar duas solicitações idênticas em paralelo. | Uma importação efetiva de cada transação; investigar download/Blob duplicado ou órfão. | IDs de download, hashes e itens. |
| T-M01-07 | Reemitir extrato com mesmo movimento e metadados diferentes, se o simulador permitir. | Deduplicar pelo `external_id`, não somente pelo hash do arquivo. | Comparação de itens por identificador externo. |

Critério de aprovação: o arquivo é recuperável e rastreável, e os itens bancários não duplicam.

### MOD-02 - Aplicações e resgates

| ID | Ação e botão/interação | Resultado esperado | Evidência |
|---|---|---|---|
| T-M02-01 | Baixar 10001-0 em 11/05/2026 e abrir `Resgates e Aplicações`. Filtrar conta 10001-0 e `DEBITO`. | Aplicação de 80.000,00 aparece negativa, com conta, data, documento e origem bancária visíveis. | OFX, lista filtrada e valor negativo. |
| T-M02-02 | Selecionar a aplicação e acionar a classificação. | Categoria, justificativa, bruto, encargos, líquido e prévia são coerentes com o extrato. | Captura da classificação. |
| T-M02-03 | Acionar `Registrar no CeleriFlow & Gerar Recibo`. | Criar movimento de tesouraria, vínculo com item, recibo, hash, auditoria e identificação da conta registrada. | Recibo, item e movimento. |
| T-M02-04 | Baixar 90001-4 em 27/05/2026 e repetir para resgate de 150.000,00. | Resgate aparece como entrada e gera um único registro vinculado. | Extrato, recibo e movimento. |
| T-M02-05 | Após cada operação, consultar saldos de 10001-0 e 90001-4, além de Fluxo de Caixa/Tesouraria. | Há dois movimentos vinculados: saída da origem e entrada da contrapartida pelo mesmo valor. | Extrato de tesouraria por conta e relatório. |
| T-M02-06 | Gerar Diário, Razão e Balancete do período após a transmissão. | Há duas partidas equilibradas: débito em aplicação/crédito em caixa para aplicação; inverso para resgate. | CSV/PDF e conferência por conta. |
| T-M02-07 | Em ambiente de teste técnico, tentar enviar valor/categoria/histórico divergentes junto ao `statementItemId`. | A ação pública aceita apenas o ID; qualquer campo adicional é ignorado e a gravação usa exclusivamente o extrato. | Requisição mascarada e registros resultantes. |
| T-M02-08 | Repetir a transmissão do mesmo item e, se possível, enviar em paralelo. | Um único movimento, um vínculo e recibo idempotente. | Contagem por `statementItemId`. |

Critério de aprovação funcional: identificação, cálculo, registro, recibo e ausência de duplicidade. Critério contábil adicional: somente declarar reflexo no razão se T-M02-06 provar as partidas.

### MOD-03 - Rendimentos de aplicações

| ID | Ação e botão/interação | Resultado esperado | Evidência |
|---|---|---|---|
| T-M03-01 | Consultar 90001-4 em agosto/2025 e selecionar rendimento de 4.400,00. | Rendimento reconhecido e vinculado à conta/período corretos. | Extrato e tela de seleção. |
| T-M03-02 | Conferir bruto, IRRF, IOF, correção, líquido e saldo acumulado. | Fórmula reproduzível: líquido = bruto - IRRF - IOF + correção. | Planilha de conferência e tela. |
| T-M03-03 | Acionar `Registrar Rendimento no CeleriFlow`. | Receita, tesouraria, evento contábil, vínculo bancário, recibo e auditoria criados. | IDs relacionados e recibo. |
| T-M03-04 | Gerar Diário, Razão, Balancete e relatório de caixa; repetir a transmissão. | Partidas equilibradas aparecem no razão; caixa aumenta pelo líquido; repetição não duplica receita nem lançamento. | Relatórios e contagens antes/depois. |

Critério de aprovação: os cálculos fecham, o registro é auditável e o rendimento tem reflexo contábil demonstrável.

### MOD-04 - Receitas constitucionais e legais

| ID | Ação e botão/interação | Resultado esperado | Evidência |
|---|---|---|---|
| T-M04-01 | Baixar 20001-1 em agosto/2025 e abrir a fila de exceções. | Quatro créditos aparecem com dados externos preservados. | Extrato e fila. |
| T-M04-02 | Processar FPM de 145.000,00. | Regra, natureza, fonte, evento, receita, tesouraria, contabilidade e recibo consistentes. | Recibo e IDs. |
| T-M04-03 | Processar FUNDEB de 98.400,00. | Mesma cadeia e classificação específica. | Recibo e Razão. |
| T-M04-04 | Processar IPVA de 15.500,00 e ICMS de 53.800,00. | Valores exatos, sem troca de natureza ou duplicidade. | Comparação com OFX. |
| T-M04-05 | Ativar `UNRECOGNIZED_TRANSACTION`, baixar extrato e tentar processar o item de 999,99. | Item permanece em pendência controlada, sem gerar receita ou lançamento automático indevido. | Fila e ausência de registros. |
| T-M04-06 | Repetir cada processamento reconhecido. | Não duplicar receita, tesouraria ou lançamento contábil. | Contagens por item externo. |
| T-M04-07 | Gerar Diário, Razão, Balancete e extrato de tesouraria. | Para cada receita, débitos = créditos na transação; crédito de caixa corresponde ao extrato e saldo da conta. | Relatórios e memória de cálculo. |

Critério de aprovação: os quatro repasses são classificados e registrados corretamente; o não reconhecido não é lançado automaticamente.

### MOD-05 - Conciliação bancária

| ID | Ação e botão/interação | Resultado esperado | Evidência |
|---|---|---|---|
| T-M05-01 | Selecionar Banco Virtual, agência 0001, conta 20001-1, período 08/2025 e acionar `Abrir Conciliação & Carregar Razão Bancário`. | Sessão contém saldo inicial, entradas, saídas, saldo final, população bancária e população interna. | Captura e ID da sessão. |
| T-M05-02 | Identificar a conta analítica exclusiva vinculada à conta 20001-1 e exportar o Razão. | O saldo exibido é a soma de débitos menos créditos de lançamentos postados dessa conta, até o fim do período. | Vínculo da conta, relatório e memória de cálculo. |
| T-M05-03 | Executar `Correspondência Automática`. | Cada FPM, FUNDEB, IPVA e ICMS é conciliado apenas com o movimento interno correto. | Lista de correspondências. |
| T-M05-04 | Verificar fórmula de saldo por conta. | Saldo final do extrato = saldo inicial + créditos - débitos. Razão bancário = débitos contábeis - créditos contábeis. Diferença = razão bancário - saldo bancário. | Memória de cálculo assinada. |
| T-M05-05 | Confirmar sessão somente sem pendência e diferença igual a zero. | Recibo, hash e status `CONCILIADA`; sessão não pode confirmar antes disso. | Recibo e status. |
| T-M05-06 | Criar ou escolher crédito e saída de mesmo valor/data. | Não pode ser correspondência válida por ter direção oposta. Se ocorrer match automático, registrar FIN-05. | Resultado do motor. |
| T-M05-07 | Usar número de conta igual em banco/agência diferente em massa técnica isolada. | Itens de outra conta não devem entrar na sessão. | População de extrato. |
| T-M05-08 | Testar dois itens bancários para um único movimento interno ou o inverso. | Permanecer pendente até suporte formal um-para-muitos; não forçar confirmação. | Divergência e bloqueio. |
| T-M05-09 | Inserir item somente no banco e item somente na tesouraria. | Exibir ambos como divergência e bloquear confirmação. | Tela e tentativa de confirmação. |
| T-M05-10 | Gerar `Relatório de Conciliações Bancárias`. | Conta, período, saldos, diferença e status correspondem à sessão confirmada. | CSV/PDF arquivado. |

Critério de aprovação: a sessão só é confirmada quando todos os itens exigidos estiverem corretos e a diferença for zero. A evidência deve exibir a conta analítica vinculada e a memória de cálculo do razão bancário.

## 9. Testes transversais de caixa, razão, relatórios e segurança

### Controle de caixa e saldo por conta

| ID | Procedimento | Resultado esperado |
|---|---|---|
| T-CAI-01 | Para cada conta, levantar saldo inicial, entradas e saídas confirmadas. | Saldo calculado = saldo inicial + entradas - saídas; manter memória de cálculo por conta. |
| T-CAI-02 | Confrontar saldo calculado com saldo exibido em `Contas Bancárias`, tesouraria e extrato. | Diferença explicada por data de corte, item pendente ou saldo de abertura; diferença sem explicação é bloqueio. |
| T-CAI-03 | Conferir movimentos de abertura após provisionamento. | Saldo inicial usado pelo sistema tem movimento de abertura auditável; caso contrário registrar FIN-07. |
| T-CAI-04 | Conferir que tarifa de 450,00 reduz o caixa e não é classificada como receita. | Saída correta, saldo reduzido e pendência/classificação adequada. |

### Razão, Diário, Balancete e relatórios

| ID | Procedimento | Resultado esperado |
|---|---|---|
| T-REL-01 | Exportar Diário do período após rendimentos e receitas. | Cada transação postada possui soma de débitos igual à soma de créditos. |
| T-REL-02 | Exportar Razão por conta contábil envolvida. | Linhas têm data, histórico, conta, tipo e valor; recalcular saldo acumulado a partir das partidas. |
| T-REL-03 | Exportar Balancete. | Para cada conta, saldo exibido = total de débitos - total de créditos, conforme regra atual do sistema. |
| T-REL-04 | Comparar Razão contábil com movimentos de tesouraria. | Diferenças são explicadas por natureza contábil, competência ou operação sem partida; aplicações/resgates devem ser destacados. |
| T-REL-05 | Exportar Fluxo de Caixa Anual e Balanço Financeiro. | Validar entradas, saídas e saldo por conta; rotular como síntese interna de tesouraria, não DFC ou Balanço oficial. |
| T-REL-06 | Exportar Relatório de Conciliações. | Somente sessões registradas aparecem; conferir período, conta, saldos e situação. |

### Segurança, segregação e integridade

| ID | Procedimento | Resultado esperado |
|---|---|---|
| T-SEG-01 | Consultar auditoria com perfil financeiro não administrador e com administrador autorizado. | Somente administrador com acesso total consulta auditoria. |
| T-SEG-02 | Tentar confirmar, reprocessar ou consultar recurso fora do módulo Financeiro. | Ação bloqueada por perfil/rota. |
| T-SEG-03 | Usar URL de extrato arquivado de outra UG com perfil restrito. | Acesso negado e nenhum conteúdo é retornado. |
| T-SEG-04 | Usar ID de sessão de conciliação de outra UG. | Leitura, execução e confirmação negadas. |
| T-SEG-05 | Revisar mensagens de falha de banco. | Nenhuma mensagem expõe token, segredo, URL privada ou stack trace. |

## 10. Critérios de evidência e registro do resultado

Para cada teste, registrar: ID, executor, perfil, data/hora, versão/commit, ambiente, conta, período, massa usada, resultado esperado, resultado obtido, IDs gerados, evidência e classificação.

| Resultado | Uso |
|---|---|
| ATENDE | Resultado obtido igual ao esperado e evidência preservada. |
| ATENDE COM RESSALVA | Funcionalidade atende ao item formal, mas há limitação documentada que não deve ser ocultada. |
| NÃO ATENDE | Erro funcional, dado inconsistente, ausência de evidência ou controle que permita resultado incorreto. |
| BLOQUEADO | Pré-condição, integração ou massa indisponível; não contar como atendimento. |

Evidências mínimas por fluxo: captura da tela antes e depois da ação, arquivo OFX quando aplicável, recibo/ID, registro de auditoria, exportação de relatório e memória de cálculo. Para falhas, incluir cenário ativado, mensagem apresentada, `IntegrationRun` e prova do reset seguido de sucesso.

## 11. Ordem recomendada de execução

1. Executar T-CAI-01 a T-CAI-03 e documentar saldo inicial por conta.
2. Executar CT-01 a CT-03 e T-SEG-01 a T-SEG-05.
3. Executar MOD-01 completo, incluindo repetição e uma falha controlada.
4. Executar MOD-04, pois gera a massa mais segura para razão e conciliação em agosto/2025.
5. Executar MOD-03 e comprovar seu reflexo contábil.
6. Executar MOD-05 com a massa das receitas e conferir o razão bancário contra a conta analítica vinculada.
7. Executar MOD-02 por último e tratar T-M02-05 a T-M02-07 como gate técnico antes de qualquer afirmação contábil.
8. Exportar relatórios, revisar todos os recibos e realizar reset controlado do simulador.

## 12. Gate de liberação e recomendações

### Não liberar como plenamente aderente se ocorrer qualquer condição abaixo

- CT-01, CT-02 ou CT-03 falhar.
- Extrato não puder ser aberto, rastreado ou deduplicado.
- Receita ou rendimento não criar registros financeiros e contábeis equilibrados.
- Conciliação puder ser confirmada com diferença, pendência, direção incompatível ou conta diferente.
- Aplicação/resgate não produzir duas movimentações pareadas ou lançamento contábil equilibrado.
- Saldo de caixa não puder ser explicado pela memória de cálculo.
- Evidências não identificarem usuário, momento, conta, período e resultado.

### Correções recomendadas antes da apresentação final

1. Aplicar a migração e executar o provisionamento POC para vincular as contas analíticas e criar o saldo inicial contábil.
2. Alinhar saldo cadastral, saldo de abertura e saldo calculado exclusivamente por movimentos auditáveis.
3. Aplicar verificação de unidade gestora em download arquivado e qualquer ação baseada em ID.
4. Criar testes automatizados de contrato do Banco Virtual, download OFX, idempotência, aplicações/resgates, rendimento, receitas, conciliação e autorização entre UGs.

## 13. Referências de implementação revisadas

- `src/lib/financeiro/bank-integration-client.ts`
- `src/app/app-domain/financeiro/download-extratos/extratos-actions.ts`
- `src/app/app-domain/financeiro/resgates-aplicacoes/resgates-actions.ts`
- `src/lib/financeiro/classification-engine.ts`
- `src/lib/financeiro/yield-engine.ts`
- `src/app/app-domain/financeiro/conciliacao-bancaria/actions.ts`
- `src/lib/financeiro/reconciliation-engine.ts`
- `src/lib/financeiro/index.ts`
- `src/lib/financeiro/relatorios-legais.ts`
- `src/lib/financeiro/report-delivery.ts`
- `src/app/app-domain/financeiro/automacoes/page.tsx`
- `docs/São João do Ivai/FICHA_AVALIACAO_POC_SAO_JOAO_IVAI.md`
- `docs/São João do Ivai/ROTEIRO_OPERACIONAL_POC_SAO_JOAO_DO_IVAI.md`
- `docs/São João do Ivai/SOLICITACAO_CONFIGURACAO_BANCO_VIRTUAL.md`
