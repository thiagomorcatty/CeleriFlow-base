# Avaliacao da POC PE042 - Situacao Atual do CeleriFlow

## Referencias e criterio

Esta avaliacao cruza `Checklist_Literal_POC_PE042.md` com `POC_Alvorada_MG_Contabilidade_Transparencia_Gerais.md` e o estado atual do CeleriFlow.

O criterio aplicavel a Lagoa Seca e o do PE042: o edital literal exige base modelo, demonstracao funcional e atendimento de `100%` das funcionalidades requeridas, com resultado binario `Atende` ou `Nao atende`. A regra de Alvorada de Minas de 70% por modulo e 90% dos itens de POC pertence a outro certame e nao reduz a exigencia de Lagoa Seca.

Um requisito so recebe `Atende` quando possui fluxo executavel, dado coerente, permissao, historico e evidencia demonstravel. Tela, schema, seed, mock ou CSV isolado nao bastam.

## Grupo A - Bloqueadores absolutos

| Bloco | Situacao | Evidencia atual | Lacuna para `Atende` |
|---|---|---|---|
| Plano de contas publico e partidas dobradas | Parcial | Plano de contas, partidas manuais e eventos automaticos POC para empenho, liquidacao, pagamento, retencao e estorno | PCASP completo, atributos obrigatorios, matriz homologada pelo contador e centros de custo/custos |
| PPA, LDO e LOA | Parcial | Cadeia PPA -> Programa -> Acao -> LDO -> LOA -> fixacao -> dotacao; CMD e MBA | Objetivos, metas e indicadores operacionais, multiplas linhas completas, versoes/comparativos e anexos legais |
| Dotacao, creditos e saldos | Parcial avancado | Saldo, reserva, credito segregado, teto de fixacao e teto contratual | Limites legais, fonte de anulacao/superavit/excesso, bloqueio por CMD e relatorios de historico |
| Empenho, liquidacao, retencao e pagamento | Parcial avancado | Aprovacao segregada, reserva, documentos financeiros, fonte/UG, pagamento, retencao, recolhimento, estorno e contabilizacao atomica | Campos completos de NF (serie/chave), retencao na liquidacao, vinculacoes a todos os tipos exigidos e documentos oficiais exportaveis |
| Receita e arrecadacao | Parcial | Receita interna confirmada, tesouraria e tributacao integrada em parte | Receita intraorcamentaria/redutora, redistribuicao, anulação/estorno completo e classificacao exigida |
| Caixa, bancos e conciliacao | Parcial avancado | Contas por UG/fonte, transferencias e conciliacao CSV manual | Fechamento diario, relatorio de extrato completo, automatizacao OFX/CNAB/API e conciliacao automatica |
| Patrimonio e estoque integrados | Parcial | Depreciacao, historico de valor, baixa/alienacao interna, entradas/saidas/ajustes de estoque | Inventario com bloqueio, reavaliacao/impairment/custos subsequentes, reflexo contabil/receita da alienacao e integracao com liquidacao |
| Balancetes, RREO, RGF e PCA | Parcial | Dados para Diario, Razao, Balancete, RREO, RGF e balancos; CSV auditado | Layouts oficiais completos, PCA, balancetes mensais, notas explicativas, PDF/XLSX/Word e demonstrativos faltantes |
| Portal da Transparencia | Parcial | Consultas publicas de receitas/despesas, API inicial e exportacao CSV | Cobertura de todos os campos, publicacao automatica de demonstrativos, PDF/TXT, documentos/versionamento, ajuda e reconciliacao integral |
| Usuarios, UGs, permissoes e logs | Parcial avancado | RBAC, segregacao por UG, auditoria financeira append-only e bloqueios de fluxo | Usuarios Firebase provisionados, log transversal de login/leitura/exportacao/versoes e backup/restore comprovado |
| Base modelo coerente | Parcial avancado | Seed Lagoa Seca, matriz POC, 27+ testes e cenarios financeiros | Dados integralmente ligados ao novo encadeamento PPA/Programa/Acao e roteiro/evidencias de todos os itens |

**Conclusao do Grupo A:** ainda nao esta pronto para declarar POC PE042 aprovada. Os itens acima marcados como `Parcial` seriam `Nao atende` em avaliacao binaria ate a lacuna indicada ser demonstrada.

## Grupo B - Evidencia funcional ou homologacao

| Integracao | Situacao atual | Leitura para a POC |
|---|---|---|
| TCE-PB / SAGRES | Nao atende | Catalogo/mock existem; faltam arquivo, layout, pre-validacao, lote, retorno e validador |
| SICONFI | Nao atende | Faltam MSC/DCA/arquivos, regras de layout e retorno/recibo |
| eSocial, EFD-Reinf, DIRF e SEFIP | Nao atende | Faltam geradores ou conectores de eventos/arquivos |
| NF-e, NFS-e e CT-e | Nao atende | Faltam captura XML/PDF, validacao e vinculo fiscal completo |
| ICP-Brasil | Nao atende | Assinatura interna nao substitui certificado e validacao ICP |
| Tributos e protocolo | Parcial | Tributacao gera receita interna em parte; protocolo e liberado pelo empenho, mas faltam todos os layouts/fatos exigidos |

Sandbox, arquivo de teste e retorno simulado podem ser evidencia defensavel apenas se a comissao aceitar formalmente esse criterio. O PE042 literal menciona exportacao, envio e integracao em diversos pontos; sem esclarecimento, nao devem ser declarados como atendidos.

## Grupo C - Versao minima demonstravel

| Item | Situacao |
|---|---|
| Help Desk e tickets | Atende minimo interno; canais externos permanecem pendentes |
| Dashboards e graficos | Parcial |
| Personalizacao visual | Parcial/minima |
| Relatorios gerenciais complementares | Parcial |
| Documentacao avancada da API | Nao atende |
| Usabilidade e responsividade | Parcial; requer roteiro de teste da POC |

## Decisao recomendada

O estudo de Alvorada confirma que uma POC pode avaliar demonstracao funcional sem producao real para parte das integracoes. Ele nao autoriza reduzir o PE042 para 70% ou 90%. Para Lagoa Seca, manter a exigencia de 100% dos itens aplicaveis e negociar por escrito apenas o criterio de evidencia dos conectores externos.

Antes de convocacao, priorizar: Grupo A inteiro, exportacoes/documentos oficiais, portal fiscal e um pacote demonstravel de TCE-PB/SICONFI. Em paralelo, solicitar resposta formal sobre se sandbox/validador/retorno simulado sera aceito para cada integracao do Grupo B.
