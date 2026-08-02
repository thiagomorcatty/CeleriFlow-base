# Matriz de Evidencias Executaveis - Grupo A - PE no 00042/2026

## Escopo e criterio

Esta matriz relaciona o Grupo A de `docs/Checklist_Literal_POC_PE042.md` ao codigo e aos testes versionados neste repositorio. Ela nao substitui validacao contabil, juridica, do orgao de controle ou homologacao em ambiente municipal.

No criterio estrito do PE, `ATENDE` exige fluxo ponta a ponta e entrega legal aplicavel. Os relatorios disponibilizados por `src/lib/financeiro/report-delivery.ts` declaram `statutoryCompleteness: "NOT_STATUTORY"`; varios tambem declaram `INTERNAL_PARTIAL`. Portanto, esta matriz nao classifica como `ATENDE` requisitos que dependem de demonstrativos, anexos ou prestacao de contas estatutarios.

## Matriz atual

| Bloco Grupo A | Evidencia versionada | Resultado reproduzivel | Status | Lacuna para `ATENDE` |
|---|---|---|:---:|---|
| Plano de contas publico e partidas dobradas | Lancamentos e relatorios em `src/lib/financeiro`; testes de fechamento em `accounting-close-workflow.test.ts` e `financeiro-lagoaseca.test.ts` | A suite cobre partidas, fechamento e geracao de dados internos. | **PARCIAL** | Entrega e validacao dos demonstrativos nos leiautes e periodicidades estatutarios. |
| PPA, LDO e LOA | Modelos e geracao interna em `report-delivery.ts`; `financeiro-lagoaseca.test.ts` | PPA, LDO, LOA, CMD e MBA sao exercitados; os anexos retornam `INTERNAL_PARTIAL` e `NOT_STATUTORY`. | **PARCIAL** | Anexos obrigatorios e comprovacao de conformidade legal. |
| Dotacao, creditos e saldos | `commitment-protocol-gate.test.ts`, `procurement-origin-policy.test.ts` e testes financeiros integrados | Ha cobertura de regras de empenho, origem e limites. | **PARCIAL** | Demonstracao ponta a ponta de todos os requisitos literais e respectiva evidencia de homologacao. |
| Empenho, liquidacao, retencao e pagamento | `financial-documents.test.ts`, `financeiro-lagoaseca.test.ts` e documentos de impressao | A suite cobre bloqueios do ciclo, retencoes e documentos internos imprimiveis. | **PARCIAL** | Validacao dos documentos e fluxos como entrega oficial aplicavel. |
| Receita e arrecadacao | `revenue-lifecycle.test.ts` e `asset-lifecycle.test.ts` | A suite cobre lancamento, arrecadacao, estorno, redistribuicao e efeito de alienacao. | **PARCIAL** | Evidencia ponta a ponta para todos os fatos e requisitos do edital. |
| Caixa, bancos e conciliacao | `financeiro-lagoaseca.test.ts` e `public-finance.test.ts` | O relatorio de conciliacoes e a sintese de tesouraria sao explicitamente internos/parciais. | **PARCIAL** | Extratos completos, fechamento diario e conciliacao conforme exigencia aplicavel. |
| Patrimonio e estoque integrados | `asset-lifecycle.test.ts`, `stock-service.test.ts`, `inventory-service.test.ts` | A suite cobre depreciacao, ajustes, inventario, segregacao e bloqueios. | **PARCIAL** | Demonstracao integrada completa e homologacao dos fluxos patrimoniais/estoque. |
| Balancetes, RREO, RGF e PCA | `report-delivery.ts`, `relatorios-legais.ts`, `public-finance.test.ts` | PDFs/CSVs e leiautes internos sao testados, mas a entrega declara `NOT_STATUTORY`; PCA, balanco financeiro e fluxo de caixa tambem sao `INTERNAL_PARTIAL`. | **PARCIAL** | Pecas, assinaturas, anexos, validacoes e leiautes exigidos pelos orgaos competentes. |
| Portal da Transparencia | `public-finance.test.ts` e modulos em `src/lib/transparencia` | A suite cobre projecoes higienizadas, CSV/TXT e regras de snapshots. | **PARCIAL** | Publicacao, disponibilidade e validacao operacional dos dados e relatorios exigidos. |
| Usuarios, UGs, permissoes e logs | `financeiro-lagoaseca.test.ts`, `inventory-service.test.ts` e `scripts/verify-poc-users.mjs` | Os testes cobrem regras locais de UG e segregacao. `verify:poc-users` e uma verificacao externa, somente leitura, de banco/Firebase quando configurada. | **PARCIAL** | Provisionamento e verificacao em ambiente municipal, incluindo Firebase, sem inferir sincronizacao a partir desta matriz. |
| Backup e restauracao operacional | `docs/LAGOA_SECA_RUNBOOK_BACKUP_RESTORE.md` e `docs/LAGOA_SECA_CHECKLIST_POC_BACKUP_RESTORE.md` | Runbook e checklist preparados; nao houve execucao de backup, restore logico ou restore de snapshot/PITR pelo provedor. | **PENDENTE** | Executar e registrar restauracao em destino isolado, reconciliacao e evidencia da operacao do provedor. |

## Comandos reproduziveis

| Verificacao | Comando | Resultado desta revisao |
|---|---|---|
| Integridade da evidencia interna | `npm run verify:group-a-evidence` | Verifica somente arquivos versionados: os testes do Grupo A e o contrato `NOT_STATUTORY`/parcial de entrega de relatorios. Nao acessa banco, Firebase ou scratch. |
| Suite unit/integracao do Grupo A | `npm run test:unit` | Executa todos os arquivos `*.test.*` e `*.spec.*` versionados em `tests`, `src/lib/financeiro/__tests__` e `src/lib/patrimonio/__tests__`; nesta revisao, 10 arquivos e 50 testes aprovados. |
| Tipos | `npx tsc --noEmit` | 0 erros nesta revisao. |
| Build | `npm run build` | Aprovado nesta revisao (`prisma generate && next build`). |

`verify:poc-base` consulta a base configurada em modo somente leitura. `verify:poc-users` tambem consulta Firebase e a base configurada em modo somente leitura; nenhum dos dois comprova sincronizacao Firebase e eles nao fazem parte da suite local de testes.

Os comandos do runbook de backup/restauracao sao operacionais e nao foram executados nesta revisao. Um `pg_restore` logico, quando executado, tambem nao substitui a evidencia de restore de snapshot/PITR do provedor Neon.

## Conclusao

O repositorio possui evidencia automatizada reproduzivel para regras internas do Grupo A, mas o Grupo A nao pode ser declarado 100% homologado ou `ATENDE` com o estado atual da entrega de relatorios. A classificacao documentada e **PARCIAL** ate que as lacunas estatutarias e a homologacao ponta a ponta sejam comprovadas.
