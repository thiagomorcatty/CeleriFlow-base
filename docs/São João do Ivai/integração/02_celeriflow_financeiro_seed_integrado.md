# CeleriFlow Financeiro — Seed Integrado com Banco Virtual
## POC Financeira — São João do Ivaí/PR — Ambiente DEMO

> Este arquivo é a especificação da **base financeira/orçamentária do CeleriFlow**. Ele foi desenhado em conjunto com `01_banco_virtual_seed_integrado.md`.
>
> O Banco Virtual e o CeleriFlow compartilham IDs de integração, mas cada sistema preserva sua responsabilidade de domínio.

---

# 1. Identificação da base

```yaml
seed_namespace: CELERIFLOW-SJI-POC-2026
tenant_external_id: DEMO-SJI-2026
currency: BRL
timezone: America/Sao_Paulo
exercise: 2026
historical_start: 2025-09-01
data_classification: SYNTHETIC_DEMO
```

---

# 2. IDs compartilhados

Os seguintes campos devem corresponder exatamente ao Banco Virtual:

```text
tenant_external_id
integration_event_id
bank_account_external_id
bank_transaction_id
client_reference
payment_order_external_id
collection_reference
bank_file_id
sync_batch_id
idempotency_key
```

## Chave central

`integration_event_id`

Exemplo:

```text
EVT-000009
```

No CeleriFlow:

```text
EMP-004583
LIQ-006124
OP-008721
```

No Banco:

```text
BTX-000009
```

Todos apontam para:

```text
integration_event_id = EVT-000009
```

---

# 3. Contas bancárias compartilhadas

| ID externo | Banco | Descrição | Tipo |
|---|---|---|---|

| `BA-001` | Banco do Brasil DEMO | Movimento Recursos Livres | Corrente |
| `BA-002` | Banco do Brasil DEMO | Arrecadação Municipal | Corrente |
| `BA-003` | Caixa DEMO | Folha de Pagamento | Corrente |
| `BA-004` | Banco do Brasil DEMO | FUNDEB 70% | Corrente |
| `BA-005` | Banco do Brasil DEMO | FUNDEB Outros | Corrente |
| `BA-006` | Banco do Brasil DEMO | Salário-Educação | Corrente |
| `BA-007` | Banco do Brasil DEMO | PNAE | Corrente |
| `BA-008` | Banco do Brasil DEMO | PNATE | Corrente |
| `BA-009` | Caixa DEMO | Saúde - Atenção Primária | Corrente |
| `BA-010` | Caixa DEMO | Saúde - Média/Alta Complexidade | Corrente |
| `BA-011` | Caixa DEMO | Saúde - Vigilância | Corrente |
| `BA-012` | Banco do Brasil DEMO | Assistência Social - FNAS | Corrente |
| `BA-013` | Banco do Brasil DEMO | Assistência Social - Estadual | Corrente |
| `BA-014` | Banco do Brasil DEMO | COSIP | Corrente |
| `BA-015` | Caixa DEMO | Convênio Obras 01 | Corrente |
| `BA-016` | Caixa DEMO | Convênio Obras 02 | Corrente |
| `BA-017` | Banco do Brasil DEMO | Convênio Estadual | Corrente |
| `BA-018` | Banco do Brasil DEMO | Cultura | Corrente |
| `BA-019` | Banco do Brasil DEMO | Defesa Civil | Corrente |
| `BA-020` | Banco do Brasil DEMO | Retenções/Consignações | Corrente |
| `BA-021` | Banco do Brasil DEMO | Aplicação Recursos Livres | Aplicação |
| `BA-022` | Banco do Brasil DEMO | Aplicação FUNDEB | Aplicação |
| `BA-023` | Caixa DEMO | Aplicação Saúde | Aplicação |
| `BA-024` | Caixa DEMO | Aplicação Convênios | Aplicação |


Além do `bank_account_external_id`, o CeleriFlow deve armazenar:

- fonte/destinação de recurso;
- conta contábil;
- unidade gestora;
- finalidade;
- vínculo;
- situação;
- conta de aplicação vinculada;
- saldo bancário importado;
- saldo contábil;
- diferença de conciliação.

---

# 4. Cadastros mestres do CeleriFlow

## 4.1. Órgãos/Secretarias DEMO

Criar pelo menos:

1. Gabinete do Prefeito.
2. Administração.
3. Fazenda/Finanças.
4. Educação.
5. Saúde.
6. Assistência Social.
7. Obras e Serviços Urbanos.
8. Agricultura/Meio Ambiente.
9. Cultura/Esporte.
10. Transporte/Frota.

## 4.2. Fornecedores DEMO

Criar 300 fornecedores sintéticos distribuídos em:

- combustíveis;
- medicamentos;
- materiais hospitalares;
- alimentos;
- transporte escolar;
- peças automotivas;
- manutenção;
- construção civil;
- limpeza;
- material de expediente;
- tecnologia;
- telecom;
- energia;
- água;
- locação;
- serviços profissionais.

Usar nomes explicitamente sintéticos, por exemplo:

```text
Auto Posto Vale DEMO Ltda.
Distribuidora Escolar Paraná DEMO Ltda.
Saúde Farma DEMO Ltda.
Construtora Rio Ivaí DEMO Ltda.
Tecnologia Municipal DEMO Ltda.
```

## 4.3. Contribuintes DEMO

Criar aproximadamente 3.000.

Campos:

- `taxpayer_id`
- `name_demo`
- `document_demo`
- `person_type`
- `property_count`
- `economic_registration`
- `status`

---

# 5. Receitas a popular

## 5.1. Receitas tributárias

Criar registros para:

- IPTU;
- ISSQN;
- ITBI;
- taxas de licença;
- taxas de fiscalização;
- taxas administrativas;
- taxas de expediente;
- multas e juros tributários;
- dívida ativa tributária;
- multas/juros da dívida ativa.

### Distribuição DEMO sugerida

| Receita | Registros/ano |
|---|---:|
| IPTU | 3.000 a 4.500 |
| ISSQN | 800 a 1.200 |
| ITBI | 100 a 180 |
| Taxas | 700 a 1.000 |
| Dívida ativa recebida | 400 a 700 |

## 5.2. Transferências correntes

Criar:

- FPM;
- ICMS;
- IPVA;
- FUNDEB;
- SUS;
- FNDE;
- PNAE;
- PNATE;
- salário-educação;
- FNAS;
- transferências estaduais;
- transferências de convênios.

## 5.3. Receita patrimonial

Criar:

- rendimentos de aplicações;
- aluguel de bens públicos DEMO;
- outras receitas patrimoniais.

## 5.4. Receitas de capital

Criar poucos eventos:

- convênios para obras;
- transferências de capital;
- alienação de bem DEMO.

---

# 6. Estrutura da receita

Tabela sugerida `revenues`:

```text
revenue_id
exercise
revenue_code
description
revenue_group
resource_source_id
organ_id
unit_id
competence
launch_date
due_date
principal_amount
interest_amount
penalty_amount
discount_amount
total_amount
collected_amount
collection_status
taxpayer_id
collection_reference
bank_account_external_id
bank_transaction_id
integration_event_id
reconciliation_status
```

### Status

```text
OPEN
PARTIALLY_COLLECTED
COLLECTED
CANCELLED
IN_DEBT_COLLECTION
REFUNDED
```

---

# 7. Dívida ativa

Criar aproximadamente 800 parcelas abertas/quitadas.

Estrutura:

```text
debt_id
taxpayer_id
origin_type
origin_year
original_amount
adjusted_amount
interest
penalty
total_due
installment_plan_id
installment_number
installment_count
due_date
status
collection_reference
bank_transaction_id
integration_event_id
```

Casos:

- IPTU vencido;
- ISS vencido;
- taxa vencida;
- parcelamento 6x;
- parcelamento 12x;
- parcela paga;
- parcela em atraso;
- quitação antecipada.

Evento compartilhado obrigatório:

```text
EVT-000029
DA-000842
Parcela 4/12
R$ 2.416,83
BTX-000028
```

---

# 8. Despesas a popular

Criar despesas para as principais naturezas macro:

## Pessoal

- vencimentos;
- obrigações patronais;
- férias;
- 13º;
- adicionais;
- encargos;
- consignações.

## Custeio

- combustível;
- material de expediente;
- material escolar;
- medicamentos;
- alimentação;
- limpeza;
- manutenção predial;
- manutenção de veículos;
- energia;
- água;
- internet/telecom;
- software;
- serviços terceirizados;
- locações;
- diárias;
- passagens.

## Investimentos

- obras;
- equipamentos;
- veículos;
- computadores;
- mobiliário.

## Dívida

- amortização;
- juros;
- encargos.

---

# 9. Empenhos

Meta: 1.500 a 2.000 empenhos.

Tabela sugerida:

```text
commitment_id
commitment_number
exercise
issue_date
creditor_id
organ_id
unit_id
function_code
subfunction_code
program_code
action_code
expense_nature_code
expense_element_code
resource_source_id
budget_allocation_id
procurement_process_id
contract_id
description
committed_amount
cancelled_amount
liquidated_amount
paid_amount
status
```

## Tipos

- ordinário;
- global;
- estimativo.

## Situações

- emitido;
- parcialmente liquidado;
- liquidado;
- parcialmente pago;
- pago;
- anulado parcialmente;
- anulado totalmente.

---

# 10. Empenhos DEMO principais

| Empenho | Objeto | Valor empenhado | Fonte | Banco esperado |
|---|---|---:|---|---|
| `EMP-004583` | Combustível frota | 85.000,00 | Recursos Livres | BA-001 |
| `EMP-004601` | Material escolar | 45.000,00 | FUNDEB | BA-005 |
| `EMP-004615` | Software e suporte | 12.000,00 | Recursos Livres | BA-001 |
| `EMP-004633` | Medicamentos APS | 68.500,00 | SUS | BA-009 |
| `EMP-004650` | Gêneros PNAE | 92.000,00 | PNAE | BA-007 |
| `EMP-004671` | Transporte escolar | 110.000,00 | PNATE | BA-008 |
| `EMP-004690` | Material de limpeza | 27.800,00 | Recursos Livres | BA-001 |
| `EMP-004711` | Medição obra convênio | 420.000,00 | Convênio | BA-015 |
| `EMP-004720` | Peças e manutenção frota | 80.000,00 | Recursos Livres | BA-001 |
| `EMP-004741` | Alimentação escolar | 64.000,00 | PNAE | BA-007 |
| `EMP-004760` | Serviços elétricos | 52.000,00 | COSIP | BA-014 |
| `EMP-004781` | Equipamentos saúde | 135.000,00 | SUS | BA-010 |

---

# 11. Liquidações

Meta: 2.000 a 3.000.

Campos:

```text
liquidation_id
commitment_id
liquidation_number
liquidation_date
document_type
document_number_demo
gross_amount
retention_amount
net_amount
description
status
```

Criar:

- uma liquidação integral;
- múltiplas liquidações para empenho global;
- liquidação parcial;
- liquidação com retenção;
- liquidação estornada.

---

# 12. Retenções

Criar:

- IR;
- ISS;
- INSS;
- consignações;
- cauções;
- outras retenções DEMO.

Exemplo compartilhado:

```text
EMP-004615 = R$ 12.000,00
retenções = R$ 1.320,00
líquido ao fornecedor = R$ 10.680,00
BTX-000011 = R$ 10.680,00
BTX-000012 = R$ 1.320,00 para conta de retenções
```

Isso é propositalmente diferente de simplesmente procurar um débito bancário de R$ 12.000,00.

---

# 13. Ordens de pagamento

Meta: 2.500 a 4.000.

```text
payment_order_id
payment_order_external_id
integration_event_id
liquidation_id
creditor_id
bank_account_external_id
gross_amount
retention_amount
net_amount
scheduled_date
payment_method
client_reference
idempotency_key
bank_status
bank_transaction_id
reconciliation_status
```

Métodos:

- PIX;
- TED;
- lote;
- transferência;
- boleto;
- débito autorizado.

---

# 14. Pagamentos

```text
payment_id
payment_order_id
payment_date
amount
bank_account_external_id
bank_transaction_id
integration_event_id
status
```

Status:

- agendado;
- enviado;
- processando;
- pago;
- rejeitado;
- estornado;
- cancelado.

---

# 15. Folha e extraorçamentário

Criar um lote mensal de folha.

Exemplo agosto/2026:

```text
FOLHA-2026-08
bruto: R$ 812.430,75
descontos/consignações: R$ 199.585,56
líquido: R$ 612.845,19
```

Integração:

```text
EVT-000013 -> BTX-000013 -> débito BA-003 R$ 612.845,19
EVT-000014 -> BTX-000014 -> crédito BA-020 R$ 83.174,22
```

As demais retenções podem ser separadas por obrigação.

---

# 16. Restos a pagar

Criar 80 a 150 registros de 2025.

Campos:

```text
payable_id
original_commitment_id
origin_year
creditor_id
registered_amount
cancelled_amount
paid_amount
remaining_amount
status
payment_order_id
bank_transaction_id
integration_event_id
```

Evento obrigatório:

```text
EVT-000028
RAP-2025-00182
R$ 31.480,00
BTX-000027
```

---

# 17. Dívida do Município

Criar 3 contratos DEMO:

| Contrato | Tipo | Saldo inicial DEMO |
|---|---|---:|
| `DIV-00001` | Financiamento infraestrutura | 2.150.000,00 |
| `DIV-00002` | Parcelamento previdenciário | 1.480.000,00 |
| `DIV-00003` | Operação de crédito | 1.170.000,00 |

Tabela:

```text
municipal_debt_id
contract_number_demo
creditor_demo
principal_balance
interest_rate_demo
indexer_demo
installment_number
due_date
principal_amount
interest_amount
fees_amount
total_installment
payment_order_id
bank_transaction_id
integration_event_id
status
```

Evento:

```text
EVT-000030
DIV-00003
parcela 08/2026
R$ 97.350,00
BTX-000029
```

---

# 18. Aplicações financeiras

O CeleriFlow precisa registrar:

```text
investment_id
bank_account_external_id
application_account_external_id
product_type
application_date
principal
current_balance
accrued_yield
last_yield_date
```

Eventos:

- aplicação;
- resgate;
- rendimento;
- ajuste.

### Eventos compartilhados

```text
EVT-000017 / EVT-000018 -> aplicação R$ 400.000,00
EVT-000019 -> rendimento R$ 9.841,37
EVT-000020 / EVT-000021 -> resgate R$ 180.000,00
```

O rendimento deve produzir receita patrimonial.

---

# 19. Conciliação bancária

Tabela sugerida:

```text
reconciliation_id
bank_transaction_id
bank_account_external_id
integration_event_id
erp_record_type
erp_record_id
bank_amount
erp_amount
difference_amount
bank_date
erp_date
date_difference_days
match_score
match_method
status
justification
reviewed_by
reviewed_at
```

## Status

```text
AUTO_MATCHED
SUGGESTED
MANUALLY_MATCHED
BANK_ONLY
ERP_ONLY
VALUE_MISMATCH
DATE_MISMATCH
REVERSED
IGNORED
PENDING_REVIEW
```

## Métodos de match

Prioridade:

1. `bank_transaction_id`;
2. `payment_order_external_id`;
3. `collection_reference`;
4. `integration_event_id`;
5. `client_reference`;
6. valor + conta + data;
7. valor + contraparte;
8. regras fuzzy/histórico.

---

# 20. Eventos canônicos compartilhados


| Evento | Tipo | Conta | Valor | Data | Banco Virtual | CeleriFlow |
|---|---|---|---:|---|---|---|
| `EVT-000001` | IPTU PIX individual | BA-002 | 1.487,32 | 2026-08-03 | `BTX-000001` crédito | `REC-000001` + `GUIA-000284` |
| `EVT-000002` | ISSQN PIX individual | BA-002 | 3.842,18 | 2026-08-03 | `BTX-000002` crédito | `REC-000002` + `GUIA-000285` |
| `EVT-000003` | Arrecadação tributária em lote | BA-002 | 48.327,61 | 2026-08-04 | `BTX-000003` crédito | `LOT-ARR-00001` com 147 receitas |
| `EVT-000004` | FPM | BA-001 | 286.412,77 | 2026-08-05 | `BTX-000004` crédito | `REC-000150` |
| `EVT-000005` | ICMS | BA-001 | 119.844,23 | 2026-08-05 | `BTX-000005` crédito | `REC-000151` |
| `EVT-000006` | FUNDEB | BA-004 | 174.980,42 | 2026-08-05 | `BTX-000006` crédito | `REC-000152` |
| `EVT-000007` | SUS APS | BA-009 | 91.320,00 | 2026-08-06 | `BTX-000007` crédito | `REC-000153` |
| `EVT-000008` | FNDE PNAE | BA-007 | 34.760,00 | 2026-08-06 | `BTX-000008` crédito | `REC-000154` |
| `EVT-000009` | Fornecedor combustível | BA-001 | 21.640,00 | 2026-08-06 | `BTX-000009` débito | `EMP-004583` + `LIQ-006124` + `OP-008721` |
| `EVT-000010` | Material escolar | BA-005 | 18.742,56 | 2026-08-06 | `BTX-000010` débito | `EMP-004601` + `LIQ-006131` + `OP-008729` |
| `EVT-000011` | Serviço de software | BA-001 | 10.680,00 | 2026-08-07 | `BTX-000011` débito líquido | empenho/liquidação 12.000,00 + retenções 1.320,00 |
| `EVT-000012` | Retenção IR/ISS | BA-020 | 1.320,00 | 2026-08-07 | `BTX-000012` crédito interno | retenções vinculadas a `OP-008735` |
| `EVT-000013` | Folha líquida | BA-003 | 612.845,19 | 2026-08-07 | `BTX-000013` débito lote | `FOLHA-2026-08` + lote de pagamentos |
| `EVT-000014` | Consignações folha | BA-020 | 83.174,22 | 2026-08-07 | `BTX-000014` crédito interno | passivo extraorçamentário |
| `EVT-000015` | Transferência própria | BA-001 | 250.000,00 | 2026-08-08 | `BTX-000015` débito | `TRF-000021` |
| `EVT-000016` | Transferência própria | BA-021 | 250.000,00 | 2026-08-08 | `BTX-000016` crédito | contrapartida `TRF-000021` |
| `EVT-000017` | Aplicação automática | BA-001 | 400.000,00 | 2026-08-10 | `BTX-000017` débito | `APL-000011` |
| `EVT-000018` | Entrada aplicação | BA-021 | 400.000,00 | 2026-08-10 | `BTX-000018` crédito | contrapartida `APL-000011` |
| `EVT-000019` | Rendimento aplicação | BA-021 | 9.841,37 | 2026-08-31 | `BTX-000019` crédito | `REC-000155` receita patrimonial |
| `EVT-000020` | Resgate aplicação | BA-021 | 180.000,00 | 2026-08-31 | `BTX-000020` débito | `RESG-000004` |
| `EVT-000021` | Entrada resgate | BA-001 | 180.000,00 | 2026-08-31 | `BTX-000021` crédito | contrapartida `RESG-000004` |
| `EVT-000022` | Tarifa não prevista | BA-001 | 18,75 | 2026-08-12 | `BTX-000022` débito | inicialmente sem registro ERP |
| `EVT-000023` | Depósito não identificado | BA-002 | 2.738,90 | 2026-08-12 | `BTX-000023` crédito | inicialmente sem receita identificada |
| `EVT-000024` | PIX rejeitado | BA-001 | 6.215,44 | 2026-08-13 | ordem rejeitada, sem débito final | `OP-008790` rejeitada |
| `EVT-000025` | Reenvio PIX | BA-001 | 6.215,44 | 2026-08-13 | `BTX-000024` débito | nova tentativa da `OP-008790` |
| `EVT-000026` | Pagamento estornado | BA-001 | 4.920,00 | 2026-08-14 | `BTX-000025` débito | `OP-008801` |
| `EVT-000027` | Estorno bancário | BA-001 | 4.920,00 | 2026-08-15 | `BTX-000026` crédito | estorno de `OP-008801` |
| `EVT-000028` | Restos a pagar 2025 | BA-001 | 31.480,00 | 2026-08-18 | `BTX-000027` débito | `RAP-2025-00182` |
| `EVT-000029` | Dívida ativa parcelada | BA-002 | 2.416,83 | 2026-08-19 | `BTX-000028` crédito | `DA-000842` parcela 4/12 |
| `EVT-000030` | Parcela dívida municipal | BA-001 | 97.350,00 | 2026-08-20 | `BTX-000029` débito | `DIV-00003` parcela 08/2026 |
| `EVT-000031` | Convênio federal | BA-015 | 420.000,00 | 2026-08-21 | `BTX-000030` crédito | `REC-000156` |
| `EVT-000032` | Medição obra | BA-015 | 78.950,00 | 2026-08-25 | `BTX-000031` débito | `EMP-004711` + medição + `OP-008912` |
| `EVT-000033` | Pagamento parcial fornecedor | BA-001 | 20.000,00 | 2026-08-26 | `BTX-000032` débito | parcela 1 de `EMP-004720` |
| `EVT-000034` | Pagamento parcial fornecedor | BA-001 | 20.000,00 | 2026-08-27 | `BTX-000033` débito | parcela 2 de `EMP-004720` |
| `EVT-000035` | Divergência proposital | BA-001 | 6.824,10 | 2026-08-28 | `BTX-000034` débito | ERP espera 6.842,10 |
| `EVT-000036` | Crédito duplicado importação | BA-002 | 1.122,40 | 2026-08-28 | `BTX-000035` único | importador deve impedir duplicidade |
| `EVT-000037` | ITBI | BA-002 | 8.750,00 | 2026-08-29 | `BTX-000036` crédito | `REC-000157` |
| `EVT-000038` | COSIP | BA-014 | 62.480,33 | 2026-08-30 | `BTX-000037` crédito | `REC-000158` lote |
| `EVT-000039` | PNAE fornecedor alimentos | BA-007 | 27.315,80 | 2026-08-30 | `BTX-000038` débito | `EMP-004741` |
| `EVT-000040` | Fechamento pendente | BA-001 | 3.455,72 | 2026-08-31 | `BTX-000039` débito | só registrado no ERP em 2026-09-01 |


---

# 21. Como cada evento deve aparecer no CeleriFlow

## Receita individual

```text
GUIA -> RECEITA -> PAGAMENTO -> BTX -> CONCILIADO
```

## Arrecadação em lote

```text
147 GUIAS
-> LOT-ARR-00001
-> total R$ 48.327,61
-> BTX-000003
-> conciliação 1:N
```

## Despesa comum

```text
EMPENHO
-> LIQUIDAÇÃO
-> OP
-> ENVIO AO BANCO
-> RETORNO
-> BTX
-> PAGAMENTO
-> CONCILIAÇÃO
```

## Pagamento com retenção

```text
EMPENHO R$ 12.000
-> LIQ R$ 12.000
-> retenções R$ 1.320
-> líquido R$ 10.680
-> BTX-000011 fornecedor
-> BTX-000012 retenções
```

## Folha

```text
FOLHA
-> centenas de lançamentos
-> lote bancário
-> débito líquido
-> obrigações/consignações separadas
```

## Aplicação

```text
conta corrente -> aplicação
```

Não gerar despesa orçamentária.

## Resgate

```text
aplicação -> conta corrente
```

Não gerar receita orçamentária sobre o principal.

Somente o rendimento é receita patrimonial.

---

# 22. Dataset de inconsistências obrigatório

## 22.1. Tarifa sem ERP

```text
EVT-000022
BTX-000022
R$ 18,75
status inicial = BANK_ONLY
```

Após regularização:

```text
criar registro de despesa/ajuste
status = MANUALLY_MATCHED
```

## 22.2. Depósito não identificado

```text
EVT-000023
BTX-000023
R$ 2.738,90
status = BANK_ONLY
```

Permitir ao operador identificar a origem depois.

## 22.3. PIX rejeitado

```text
OP-008790
primeira tentativa = REJECTED
segunda tentativa = SETTLED
BTX-000024
```

## 22.4. Estorno

```text
BTX-000025 = débito 4.920,00
BTX-000026 = crédito 4.920,00
```

Sistema deve vincular ambos.

## 22.5. Divergência

```text
ERP = R$ 6.842,10
Banco = R$ 6.824,10
diferença = R$ 18,00
status = VALUE_MISMATCH
```

## 22.6. Virada de mês

```text
Banco: 31/08/2026
ERP: 01/09/2026
status inicial = DATE_MISMATCH
```

---

# 23. Extratos e visões que o CeleriFlow deve oferecer

Para cada conta:

- saldo bancário;
- saldo contábil;
- diferença;
- saldo disponível;
- saldo aplicado;
- movimentos importados;
- movimentos conciliados;
- movimentos pendentes;
- créditos;
- débitos;
- rendimento;
- tarifas;
- transferências;
- pagamentos;
- arrecadações;
- fechamento diário;
- fechamento mensal.

Filtros:

- período;
- conta;
- banco;
- fonte;
- secretaria;
- situação;
- tipo de movimento;
- origem;
- valor;
- documento;
- fornecedor;
- contribuinte;
- empenho;
- ordem de pagamento;
- ID bancário.

---

# 24. Dashboards DEMO

## Tesouraria

- saldo total em conta;
- saldo aplicado;
- saldo disponível;
- pagamentos do dia;
- receitas do dia;
- contas com divergência;
- pagamentos rejeitados;
- conciliações pendentes.

## Conciliação

- percentual automático;
- sugestões;
- pendentes banco;
- pendentes ERP;
- divergências;
- estornos;
- valor total não conciliado.

## Receita

- arrecadado no mês;
- IPTU;
- ISS;
- transferências;
- dívida ativa;
- aplicações/rendimentos.

## Despesa

- empenhado;
- liquidado;
- pago;
- a pagar;
- restos a pagar;
- por secretaria;
- por fonte.

---

# 25. Volumes recomendados

| Entidade | Volume |
|---|---:|
| Fornecedores | ~300 |
| Contribuintes | ~3.000 |
| Receitas | 6.000 a 10.000 |
| Empenhos | 1.500 a 2.000 |
| Liquidações | 2.000 a 3.000 |
| Ordens de pagamento | 2.500 a 4.000 |
| Pagamentos | 2.500 a 4.000 |
| Dívida ativa/parcelas | ~800 |
| Restos a pagar | 80 a 150 |
| Aplicações/eventos | 250 a 400 |
| Conciliações | uma por relacionamento bancário/ERP |

---

# 26. Regra de consistência entre as duas bases

Antes de considerar o seed válido, executar:

```text
1. Todo bank_account_external_id do Banco existe no CeleriFlow.
2. Todo bank_transaction_id importado pelo CeleriFlow existe no Banco.
3. Todo payment_order_external_id enviado ao Banco existe no CeleriFlow.
4. Todo evento com status SETTLED possui valor coerente.
5. Transferências internas somam zero entre contas.
6. Aplicações/resgates preservam principal.
7. Rendimentos geram receita patrimonial.
8. Retenções não são confundidas com pagamento líquido.
9. Estornos apontam para a transação original.
10. idempotency_key não se repete.
11. Eventos propositalmente inconsistentes estão numa whitelist DEMO.
12. Fechamento: saldo inicial + créditos - débitos = saldo final.
```

---

# 27. Ordem recomendada para popular o CeleriFlow

1. Tenant/exercício.
2. Órgãos/unidades.
3. Fontes/destinações.
4. Plano de contas.
5. Contas bancárias compartilhadas.
6. Fornecedores.
7. Contribuintes.
8. Dotações.
9. Receitas lançadas.
10. Dívida ativa.
11. Empenhos.
12. Liquidações.
13. Retenções.
14. Ordens de pagamento.
15. Folha.
16. Restos a pagar.
17. Dívida municipal.
18. Aplicações.
19. Importação das transações do Banco Virtual.
20. Conciliação.
21. Pendências e inconsistências intencionais.

---

# 28. Regra final

O CeleriFlow deve conseguir reconstruir o contexto completo a partir de uma movimentação bancária.

Exemplo:

```text
BTX-000009
-> EVT-000009
-> OP-008721
-> LIQ-006124
-> EMP-004583
-> fornecedor
-> contrato/licitação, quando houver
-> dotação
-> secretaria
-> fonte
-> natureza
-> pagamento
-> conciliação
```

Já o Banco Virtual precisa apenas saber:

```text
BTX-000009
-> EVT-000009
-> BA-001
-> client_reference OP-008721
-> favorecido DEMO
-> R$ 21.640,00
-> PIX
-> SETTLED
```

Essa assimetria é proposital e representa uma integração bancária/ERP bem modelada.
