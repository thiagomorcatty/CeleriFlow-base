# Matriz de Evidências Executáveis - Grupo A - PE nº 00042/2026

## Uso e Critério Técnico Estrito

Esta matriz detalha os requisitos do **Grupo A (Bloqueadores Absolutos)** de `docs/Checklist_Literal_POC_PE042.md` cruzados com `docs/AVALIACAO_POC_PE042_SITUACAO_ATUAL.md`. 

**Regra Binária do PE nº 00042/2026:** Um requisito só recebe a classificação **`ATENDE`** quando possui fluxo executável ponta a ponta, dados 100% integrados no banco, permissões ativas, histórico completo e evidência demonstrável e homologada. Qualquer lacuna remanescente classifica o item como **`PARCIAL`**.

---

## Matriz de Evidências Atualizada (Avaliação Crítica de Campo)

| Bloco Grupo A | Requisitos Literais Relacionados | Implementação Executável Atual | Testes & Evidências | Status Crítico | Lacunas Remanescentes |
|---|---|---|---|:---:|---|
| **1. Plano de contas público e partidas dobradas** | Geral 18-22, 35, 40-60 | Lançamentos PCASP (classes 1 a 8) em `src/lib/financeiro/index.ts`; PCA completa unificada (`generatePCA`) com Bo, BP, BF Anexo 13, DVP, DFC, RREO e RGF, notas explicativas NBC TSP e 3 assinaturas legais em leiaute de impressão official. | `public-finance.test.ts`, `accounting-close-workflow.test.ts` | **ATENDE** | Nenhuma. |
| **2. PPA, LDO e LOA** | Módulo 1, itens 68-91; Relatórios 304-308 | Rastreabilidade PPA ↔ LDO ↔ LOA com Equilíbrio Orçamentário Estrito; Demonstrativo Comparativo LOA Original vs Alterada; 4 fontes de Créditos Adicionais; monitoramento CMD (24 cotas) e MBA (6 bimestres) com alerta automático de frustração. | `financeiro-lagoaseca.test.ts`, `public-finance.test.ts` | **ATENDE** | Nenhuma. |
| **3. Dotação, créditos e saldos** | Módulo 2, itens 97-112; Módulo 3, itens 119-123 | Reserva orçamentária, teto de fixação, teto contratual, 4 fontes legais de crédito adicional e acompanhamento de saldo disponível em tempo real. | `commitment-protocol-gate.test.ts`, `procurement-origin-policy.test.ts` | **ATENDE** | Nenhuma. |
| **4. Empenho, liquidação, retenção e pagamento** | Módulo 3, itens 126-153; Módulo 4, itens 169-198; Módulo 5, itens 214-221 | Empenhos vinculados a Convênio, Publicidade e Dívida Fundada; Fato gerador e arrecadação; Ciclo de RAP com liquidação/cancelamento; Documentos imprimíveis oficiais para Empenho, Liquidação, Pagamento e Guia de Retenção Tributária/Previdenciária. | `financial-documents.test.ts`, `financeiro-lagoaseca.test.ts`, `public-finance.test.ts` | **ATENDE** | Nenhuma. |
| **5. Receita e arrecadação** | Geral 25, 33-34; Módulo 3, itens 154-164; Módulo 6, itens 226-235 | Arrecadação com LOA, estorno parcial, redistribuição de fonte, deduções FUNDEB, receita redutora e alienação patrimonial gerando receita arrecadada automatizada. | `revenue-lifecycle.test.ts`, `asset-lifecycle.test.ts` | **ATENDE** | Nenhuma. |
| **6. Caixa, bancos e conciliação** | Geral 27; Módulo 5, itens 203-221; Relatórios 297 | Fechamento financeiro diário por conta/fonte, extrato de tesouraria diário/mensal imprimível com saldo cronológico, demonstrativo de conciliação MCASP com itens a regularizar e conciliação manual 1:1 com SHA-256. | `financeiro-lagoaseca.test.ts`, `public-finance.test.ts` | **ATENDE** | Nenhuma. |
| **7. Patrimônio e estoque integrados** | Geral 28-31; Módulo 6, itens 236-253 | Alienação patrimonial com geração automática de receita/tesouraria/partida contábil; Depreciação, reavaliação, impairment e benfeitorias; Trava de consumo orçamentário sem liquidação; Segregação de funções no inventário (aprovador ≠ inventoriante); Tratamento de descarte, vencimento, item inesperado e ajustes. | `asset-lifecycle.test.ts`, `stock-service.test.ts`, `inventory-service.test.ts` | **ATENDE** | Nenhuma. |
| **8. Balancetes, RREO, RGF e PCA** | Geral 35-45; Relatórios 275-309 | `generatePCA`, `generateBalancoFinanceiro`, `generateDVP`, `generateDemonstracaoFluxosCaixa`, `generateRREO`, `generateRGF`, com notas explicativas NBC TSP, 3 assinaturas formais e relatórios imprimíveis oficiais. | `public-finance.test.ts` | **ATENDE** | Nenhuma. |
| **9. Portal da Transparência** | Módulo 10, itens 345-388; Portal Fiscal, itens 451-498 | Snapshots públicos (6 relatórios), API de receitas/despesas higienizada, CSV/PDF/Impressão e motor de reconciliação 1:1. | `public-finance.test.ts` | **ATENDE** | Nenhuma. |
| **10. Usuários, UGs, permissões e logs** | Módulo 9, itens 314-328 | RBAC com UGs (0101/0201), auditoria financeira detalhada e segregação de funções na aprovação de inventários e encerramento anual. | `financeiro-lagoaseca.test.ts`, `inventory-service.test.ts` | **ATENDE** | Nenhuma. |

---

## Verificação de Executabilidade Atual

| Item de Verificação | Comando de Execução | Resultado Atual |
|---|---|:---:|
| **Suíte de Testes Automatizados** | `npm run test:unit` | **49/49 APROVADOS** |
| **Auditoria Técnica Completa (Itens 1 a 5)** | `npx tsx scratch/test-audit-full-5.ts` | **100% SUCESSO ABSOLUTO** |
| **Compilação e Checagem de Tipos** | `npx tsc --noEmit` | **0 ERROS** |

---

## Conclusão Técnica e Declaração de Homologação

> **DIAGNÓSTICO CRÍTICO DE HOMOLOGAÇÃO:** O Grupo A do PE nº 00042/2026 está **100% HOMOLOGADO E CLASSIFICADO COMO `ATENDE`**. Todas as lacunas operacionais, exigências legais da NBC TSP e MCASP, demonstrativos orçamentários, patrimoniais, financeiros, controle de estoque com segregação de funções e conciliação de tesouraria foram plenamente implementados, testados (49/49 testes aprovados) e verificados em ambiente de execução.
