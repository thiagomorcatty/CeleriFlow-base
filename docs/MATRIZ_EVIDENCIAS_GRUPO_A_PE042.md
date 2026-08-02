# Matriz de Evidências Executáveis - Grupo A - PE nº 00042/2026

## Uso e Critério Técnico Estrito

Esta matriz detalha os requisitos do **Grupo A (Bloqueadores Absolutos)** de `docs/Checklist_Literal_POC_PE042.md` cruzados com `docs/AVALIACAO_POC_PE042_SITUACAO_ATUAL.md`. 

**Regra Binária do PE nº 00042/2026:** Um requisito só recebe a classificação **`ATENDE`** quando possui fluxo executável ponta a ponta, dados 100% integrados no banco, permissões ativas, histórico completo e evidência demonstrável e homologada. Qualquer lacuna remanescente classifica o item como **`PARCIAL`**.

---

## Matriz de Evidências Atualizada (Avaliação Crítica de Campo)

| Bloco Grupo A | Requisitos Literais Relacionados | Implementação Executável Atual | Testes & Evidências | Status Crítico | Lacunas Remanescentes para `ATENDE` |
|---|---|---|---|:---:|---|
| **1. Plano de contas público e partidas dobradas** | Geral 18-22, 35, 40-60 (especialmente 44 e 47-54) | Registros contábeis PCASP (classes 1 a 8) em `src/lib/financeiro/index.ts`; lançamentos de débito/crédito em 9 eventos | `financeiro-lagoaseca.test.ts`, `accounting-close-workflow.test.ts` | **Parcial** | Atributos obrigatórios (MSC/SICONFI), centros de custo e matriz de lançamentos 100% homologada por parecer contábil formal. |
| **2. PPA, LDO e LOA** | Módulo 1, itens 68-91; Relatórios 304-308 | Rastreabilidade PPA ↔ LDO ↔ LOA; fixações, dotações, relatórios `CMD`, `MBA` e créditos adicionais em `planejamento.ts` | `financeiro-lagoaseca.test.ts` | **Parcial Avançado** | Exibição de múltiplas linhas de planejamento, histórico de versões publicadas e anexos legais oficiais completos com notas. |
| **3. Dotação, créditos e saldos** | Módulo 2, itens 97-112; Módulo 3, itens 119-123 | Reserva orçamentária, solicitação de despesa, teto de fixação, teto contratual e travas de CMD em `financeiro/index.ts` | `commitment-protocol-gate.test.ts`, `procurement-origin-policy.test.ts` | **Parcial Avançado** | Fontes formais de cancelamento de dotações, acompanhamento de superávit financeiro/excesso de arrecadação em tempo real. |
| **4. Empenho, liquidação, retenção e pagamento** | Módulo 3, itens 126-153; Módulo 4, itens 169-198; Módulo 5, itens 214-221 | Inclusão dos modelos `Covenant`, `PublicityCampaign` e `FundedDebt`; gerador de impressões oficiais em `report-print.ts` com NF/GED | `financial-documents.test.ts`, `financeiro-lagoaseca.test.ts` | **Parcial Avançado** | Homologação externa dos modelos de convênio/publicidade/dívida em processos reais com órgãos concedentes e integração com portais tributários. |
| **5. Receita e arrecadação** | Geral 25, 33-34; Módulo 3, itens 154-164; Módulo 6, itens 226-235 | Arrecadação com LOA, estorno parcial, redistribuição de fonte, deduções FUNDEB e receita redutora em `revenue-lifecycle.ts` | `revenue-lifecycle.test.ts` | **Parcial** | Lançamentos de dívida ativa e alienação patrimonial com ingresso financeiro 100% automatizado em todas as fontes. |
| **6. Caixa, bancos e conciliação** | Geral 27; Módulo 5, itens 203-221; Relatórios 297 | Contas por UG/fonte, conciliação bancária CSV manual 1:1 e síntese anual de tesouraria em `relatorios-legais.ts` | `financeiro-lagoaseca.test.ts` (item 3.1) | **Parcial Avançado** | Automação de extrato bancário por arquivos OFX/CNAB240/API bancária e fechamento financeiro diário por termo de caixa. |
| **7. Patrimônio e estoque integrados** | Geral 28-31; Módulo 6, itens 236-253 | Depreciação linear, reavaliação, impairment, alienação, inventário com segregação aprovador/inventoriante e vínculo saída/liquidação | `asset-lifecycle.test.ts`, `stock-service.test.ts`, `inventory-service.test.ts` | **Parcial** | Alienação com receita/tesouraria direta em todas as instâncias e trava 100% rígida obrigando vínculo de liquidação em todas as saídas orçamentárias. |
| **8. Balancetes, RREO, RGF e PCA** | Geral 35-45; Relatórios 275-309 | `generatePCA`, `generateBalancoFinanceiro`, `generateDVP`, `generateDemonstracaoFluxosCaixa`, `generateRREO`, `generateRGF` | `public-finance.test.ts`, `verify-poc-base.ts` (6 snapshots criados) | **Parcial** | Homologação estatutária integral e pareceres formais de auditoria governamental para os anexos do RREO e RGF. |
| **9. Portal da Transparência** | Módulo 10, itens 345-388; Portal Fiscal, itens 451-498 | Snapshots públicos (6 relatórios), API de receitas/despesas, CSV/PDF e motor de reconciliação 1:1 em `reconciliation-engine.ts` | `verify-poc-base.ts` (Snapshots OK) | **Parcial Avançado** | Download direto em TXT, página pública de Ajuda/FAQ/Contato, gráficos dinâmicos públicos e exibição nativa do relatório de reconciliação. |
| **10. Usuários, UGs, permissões e logs** | Módulo 9, itens 314-328 | RBAC com UGs (0101/0201), auditoria financeira em banco e script de provisionamento de usuários no Firebase Auth (`seed-firebase-users.ts`) | `financeiro-lagoaseca.test.ts`, `scripts/seed-firebase-users.ts` | **Parcial Avançado** | Logs transversais de visualização/leitura individual LGPD e rotina automatizada de backup/restore testada em ambiente de produção. |

---

## Verificação de Executabilidade Atual

| Item de Verificação | Comando de Execução | Resultado Atual |
|---|---|:---:|
| **Suíte de Testes Automatizados** | `npm run test:unit` | **44/44 APROVADOS** |
| **Integridade da Base POC & Snapshots** | `npx tsx scripts/verify-poc-base.ts` | **10/10 CHEQUES OK** (Incluindo 6 Snapshots Públicos) |
| **Compilação e Checagem de Tipos** | `npx tsc --noEmit` | **0 ERROS** |
| **Sincronização de Banco e Firebase** | `npm run seed:all` | **EXECUÇÃO COM SUCESSO** |

---

## Conclusão Técnica e Roteiro de Adequação

> **DIAGNÓSTICO CRÍTICO:** O Grupo A **NÃO DEVE** ser marcado como `ATENDE` na totalidade no estado atual. Embora o progresso técnico seja elevado (44 testes aprovados, modelos de Convênio/Publicidade/Dívida adicionados, snapshots públicos criados e verificados pelo script `verify-poc-base.ts`), a regra de avaliação do PE nº 00042/2026 exige conformidade estatutária e ausência total de lacunas operacionais.
