# Avaliacao Verificavel da POC PE042

## Criterio de classificacao

Esta avaliacao usa o criterio literal do PE042: um item so pode ser classificado como `ATENDE` quando houver fluxo ponta a ponta, dados coerentes, controle de acesso, historico/auditoria e evidencia demonstravel da entrega aplicavel. Codigo, schema, seed, tela, mock, CSV isolado ou teste unitario nao substituem homologacao operacional ou entrega estatutaria.

Os geradores em `src/lib/financeiro/report-delivery.ts` identificam suas saidas como `NOT_STATUTORY` e, quando aplicavel, `INTERNAL_PARTIAL`. Esta identificacao prevalece sobre qualquer descricao comercial ou tecnica que possa sugerir oficialidade.

## Situacao do Grupo A

| Bloco | Evidencia interna existente | Situacao verificavel | Necessario para `ATENDE` |
|---|---|:---:|---|
| Plano de contas e partidas dobradas | Lancamentos, matriz contabil POC, documentos financeiros e testes de fechamento. | **PARCIAL** | Demonstrativos em leiautes estatutarios e validacao contabil. |
| PPA, LDO e LOA | Cadeia PPA, programa, acao, LDO, LOA, dotacao, CMD e MBA. | **PARCIAL** | Anexos obrigatorios e comprovacao de conformidade legal. |
| Dotacao, creditos e saldos | Reserva, empenho, limites de dotacao e regras de origem. | **PARCIAL** | Demonstracao integral dos requisitos literais e homologacao. |
| Empenho, liquidacao, retencao e pagamento | Fluxo com bloqueios, documentos internos e vinculos a convenio, campanha e divida fundada. | **PARCIAL** | Validacao dos documentos e fluxos como entrega oficial aplicavel. |
| Receita e arrecadacao | Lancamento, arrecadacao, estorno, fonte, deducao e alienacao patrimonial. | **PARCIAL** | Evidencia ponta a ponta para todos os fatos exigidos. |
| Caixa, bancos e conciliacao | Conciliacao CSV manual, movimentos de tesouraria e relatorios internos. | **PARCIAL** | Extratos completos, fechamento diario e conciliacao na regra aplicavel. |
| Patrimonio e estoque | Depreciacao, reavaliacao, impairment, baixa, alienacao, estoque e inventario. | **PARCIAL** | Demonstracao integrada homologada dos fluxos patrimoniais e de estoque. |
| Balancetes, RREO, RGF e PCA | CSV/PDF internos e geradores tecnicos. | **PARCIAL** | Pecas, anexos, assinaturas e leiautes homologados pelos orgaos competentes. |
| Portal da Transparencia | APIs publicas higienizadas, CSV/TXT e snapshots publicados. | **PARCIAL** | Publicacao, disponibilidade e validacao operacional do conjunto de dados exigido. |
| Usuarios, UGs, permissoes e logs | RBAC, auditoria append-only, segregacao e verificacao de usuarios POC. | **PARCIAL** | Homologacao em ambiente municipal com os perfis reais. |
| Backup e restauracao | Runbook e checklist versionados. | **PENDENTE** | Backup e restore reais, reconciliacao e evidencia do provedor em destino isolado. |

## Evidencias reproduziveis

| Verificacao | Comando | Limite da evidencia |
|---|---|---|
| Integridade da matriz | `npm run verify:group-a-evidence` | Verifica arquivos versionados e declaracoes de relatorio; nao acessa banco ou Firebase. |
| Regras internas | `npm run test:unit` | Exercita regras de dominio; nao homologa leiautes estatutarios. |
| Base POC | `npm run verify:poc-base` | Consulta a base em modo somente leitura; nao executa a POC completa. |
| Usuarios POC | `npm run verify:poc-users` | Consulta Firebase e cadastro municipal; nao comprova a operacao municipal completa. |
| Backup/restore | `docs/LAGOA_SECA_RUNBOOK_BACKUP_RESTORE.md` | Procedimento preparado, ainda sem execucao registrada. |

## Pendencias que dependem do municipio ou de fornecedor

1. Disponibilizar uma base/branch Neon isolada e as credenciais autorizadas para teste de restore.
2. Executar backup, restore e reconciliacao, incluindo evidencia de snapshot/PITR do provedor quando aplicavel.
3. Fornecer ou aprovar os leiautes oficiais de PCA, RREO, RGF, DVP, DFC e balancos.
4. Validar os fluxos e assinar as evidencias com contador responsavel, fiscal da POC e demais responsaveis exigidos.
5. Confirmar o escopo normativo e validar em operacao o Portal da Transparencia municipal.

## Conclusao

O Grupo A esta **PARCIAL**. Nao ha base verificavel para declarar `ATENDE` enquanto as pendencias estatutarias, operacionais e de backup/restore desta avaliacao permanecerem abertas. A matriz detalhada e as referencias de codigo estao em `docs/MATRIZ_EVIDENCIAS_GRUPO_A_PE042.md`.
