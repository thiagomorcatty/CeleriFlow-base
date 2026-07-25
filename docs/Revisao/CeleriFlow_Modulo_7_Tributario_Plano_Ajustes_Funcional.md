# CeleriFlow — Módulo 7: Tributário
## Plano de ajustes, correções e implementação do escopo originalmente planejado

**Objetivo:** transformar o Módulo 7 atual em um sistema tributário municipal integrado, confiável e rastreável, cobrindo exclusivamente o escopo originalmente planejado para tributos próprios e receitas municipais.

> **Fora deste arquivo:** VAF, IPM-ICMS, GIA, DEFIS/PGDAS-D para VAF, Produção Primária, EFD-ICMS/IPI, CVI e cruzamento fiscal estadual. Esses itens passam a pertencer ao novo módulo **Receita**.

---

# 1. Papel do Módulo Tributário

O Tributário deve administrar a receita própria municipal desde o cadastro fiscal até a cobrança:

```text
Cadastro Geral
     ↓
Contribuinte Fiscal
     ↓
Imóvel / Cadastro Econômico
     ↓
Tributo e Regra de Cálculo
     ↓
Lançamento Tributário
     ↓
Guia
     ↓
Pagamento / Baixa
     ↓
┌───────────────┴───────────────┐
│                               │
Quitação                  Inadimplência
│                               │
Certidão                    Dívida Ativa
                                ↓
                       Parcelamento / CDA
```

Integrações transversais:

```text
Processos e Protocolos
GED
Atendimento
Financeiro / Contábil
Portal do Contribuinte
Configurações
```

---

# 2. Separação de responsabilidades

## Módulo 2 — Cadastros Gerais

Mantém:

- pessoa física;
- pessoa jurídica;
- endereço;
- imóvel-base;
- representante legal;
- contatos.

## Módulo 7 — Tributário

Mantém:

- visão fiscal do contribuinte;
- cadastro imobiliário fiscal;
- cadastro econômico;
- tributos;
- regras;
- lançamentos;
- guias;
- pagamentos;
- parcelamentos;
- dívida ativa;
- certidões;
- fiscalização.

## Módulo 8 — Financeiro e Contábil

Recebe do Tributário:

- arrecadação;
- classificação da receita;
- baixas;
- conciliação;
- receita orçamentária;
- registros necessários à contabilidade e prestação de contas.

---

# 3. O que já existe no código

## Estrutura existente

O `schema.prisma` já possui:

```text
Taxpayer
RealEstate
EconomicRegistration
Tax
TaxAssessment
TaxGuide
TaxPayment
License
DebtInstallment
ActiveDebt
TaxCertificate
Infraction
Invoice
```

## Telas existentes

```text
/tributacao
/tributacao/economico
/tributacao/imoveis
/tributacao/guias
/tributacao/divida
/tributacao/certidoes
/tributacao/alvaras
/tributacao/fiscalizacao
/tributacao/nfse
```

## Situação

A maior parte das telas atuais é CRUD básico.

A cadeia tributária ainda não está conectada de ponta a ponta.

---

# 4. Diagnóstico consolidado

| Área | Situação atual |
|---|---|
| Contribuinte fiscal | ✅ base |
| Cadastro econômico | ✅ básico |
| Cadastro imobiliário | 🟡 básico |
| Tributos | 🟡 banco, sem parametrização completa |
| Regras de cálculo | 🔴 |
| Lançamento tributário | 🟡 banco, sem operação |
| IPTU | 🔴 cálculo |
| ITBI | 🔴 |
| ISS | 🔴 motor |
| NFS-e | 🟡 simulação interna |
| Taxas municipais | 🔴 motor |
| Alvarás | 🟡 cadastro |
| Guias | 🟡 guia fictícia |
| Pagamentos | 🟡 baixa manual simples |
| Retorno bancário | 🔴 |
| PIX / boleto | 🔴 |
| Parcelamento | 🟡 banco |
| Dívida ativa | ✅ CRUD básico |
| CDA | 🟡 número manual |
| Certidões | 🟡 cadastro perigoso sem validação |
| Fiscalização | 🟡 auto básico |
| Processo tributário | 🔴 |
| Declarações municipais | 🔴 |
| Portal do contribuinte | 🔴 |
| Parâmetros | 🔴 |
| Relatórios | 🔴 |
| Auditoria fiscal | 🔴 |
| Integração GED | 🔴 |
| Integração Processos | 🔴 |
| Integração Financeiro | 🔴 |

---

# 5. PRIORIDADE 0 — Corrigir valores monetários

Hoje vários valores tributários são `Float`.

Exemplos:

```text
TaxAssessment.originalValue
TaxGuide.totalValue
TaxPayment.amountPaid
DebtInstallment.totalValue
ActiveDebt.originalValue
ActiveDebt.updatedValue
Infraction.penaltyValue
Invoice.serviceValue
Invoice.issValue
```

## Implementar

Migrar valores monetários para:

```prisma
Decimal
```

com precisão adequada.

Exemplo conceitual:

```prisma
Decimal @db.Decimal(15, 2)
```

Revisar todos os cálculos para evitar conversões inseguras entre `number` e `Decimal`.

---

# 6. PRIORIDADE 0 — Numeração e identificadores

Eliminar números aleatórios em documentos fiscais.

Usar `lib/sequence.ts` ou mecanismo transacional equivalente para:

- guias;
- certidões;
- CDA;
- processos tributários;
- autos;
- alvarás, quando houver numeração municipal;
- demais documentos numerados.

Nunca usar `Math.random()` para identificador fiscal oficial.

---

# 7. PRIORIDADE 0 — Contribuinte Fiscal

`Taxpayer` deve continuar reutilizando:

```text
Person
Company
```

## Completar visão fiscal

Exibir:

- CPF/CNPJ;
- inscrição municipal;
- tipo de contribuinte;
- status;
- atividades econômicas;
- imóveis;
- inscrições econômicas;
- lançamentos;
- guias;
- pagamentos;
- dívidas;
- parcelamentos;
- certidões;
- alvarás;
- fiscalizações;
- processos tributários.

## Tipos previstos originalmente

- pessoa física;
- pessoa jurídica;
- produtor rural;
- autônomo;
- MEI;
- empresa;
- proprietário;
- responsável tributário;
- prestador;
- tomador.

O tipo **produtor rural** aqui é apenas classificação cadastral municipal. Gestão de produção primária para IPM fica no módulo Receita.

---

# 8. PRIORIDADE 0 — Cadastro Imobiliário Fiscal

A tela atual precisa evoluir para o cadastro planejado.

## Identificação

- inscrição imobiliária;
- inscrição anterior;
- matrícula;
- código cadastral;
- setor;
- quadra;
- lote;
- unidade;
- loteamento;
- bairro;
- endereço.

## Proprietário / responsável

- contribuinte;
- proprietário;
- possuidor;
- compromissário;
- responsável tributário;
- percentual;
- histórico de proprietários.

## Terreno

- área;
- testada;
- profundidade;
- topografia;
- pedologia;
- situação;
- zona fiscal;
- valor unitário;
- fração ideal.

## Construção

- área construída;
- tipo;
- uso;
- padrão;
- conservação;
- pavimentos;
- ano;
- situação.

## Dados fiscais

- valor venal do terreno;
- valor venal da construção;
- valor venal total;
- alíquota;
- isenção;
- imunidade;
- redução;
- situação fiscal.

---

# 8.1 Correção imediata da criação de imóvel

Hoje `RealEstate.taxpayerId` existe, mas o formulário atual não exige/vincula o contribuinte.

Implementar seleção:

```text
Contribuinte / Responsável Tributário
```

e gravar `taxpayerId`.

Não permitir lançamento de IPTU sem responsável fiscal definido, salvo exceção administrativa expressa.

---

# 9. PRIORIDADE 0 — Cadastro Econômico

O CRUD atual deve ser expandido.

## Campos

- inscrição municipal;
- CNPJ/CPF;
- razão social/nome;
- nome fantasia;
- CNAE principal;
- CNAEs secundários;
- atividades municipais;
- regime tributário;
- tipo de estabelecimento;
- endereço da atividade;
- abertura;
- início no município;
- situação;
- contador;
- sócios;
- responsável legal;
- documentos;
- alvarás;
- histórico fiscal.

## Parametrizar CNAE e atividades

Não manter apenas texto livre.

Criar catálogo de:

```text
CNAE
AtividadeMunicipal
ListaServicoISS
```

e vínculos apropriados.

---

# 10. PRIORIDADE 0 — Tabelas e Parâmetros Tributários

Criar área administrativa:

```text
/tributacao/parametros
```

## Parâmetros gerais

- exercício;
- indexador;
- juros;
- multa;
- descontos;
- vencimentos;
- parcela mínima;
- quantidade máxima de parcelas;
- validade de certidão;
- regras de isenção;
- imunidade;
- prescrição;
- arredondamento;
- feriados;
- bancos arrecadadores.

## Cadastros

- tributos;
- códigos de receita;
- alíquotas;
- atividades;
- CNAEs;
- lista de serviços;
- taxas;
- zonas fiscais;
- bairros fiscais;
- tipos de imóvel;
- padrões construtivos;
- planta genérica de valores;
- indexadores.

---

# 11. PRIORIDADE 0 — Cadastro de Tributos

O modelo `Tax` atual é simples:

```text
name
taxType
isActive
```

Evoluir para permitir parametrização de:

- código;
- natureza;
- receita associada;
- exercício;
- vigência;
- regras de vencimento;
- cálculo;
- juros;
- multa;
- correção;
- descontos;
- integração contábil.

Criar CRUD:

```text
/tributacao/tributos
```

---

# 12. PRIORIDADE 0 — Lançamento Tributário

`TaxAssessment` deve ser o centro da obrigação tributária.

## Evoluir campos

Além de:

```text
year
originalValue
taxpayerId
taxId
realEstateId
economicRegistrationId
status
```

adicionar, conforme necessário:

```text
assessmentNumber
competence
taxableBase
rate
discountValue
interestValue
penaltyValue
correctionValue
finalValue
dueRule
calculationSnapshot
createdBy
cancelledAt
cancelledBy
cancellationReason
```

## Regra

Toda guia deve nascer de um lançamento.

Não criar guia fiscal solta.

---

# 13. PRIORIDADE 0 — Motor de cálculo tributário

Criar camada de serviço separada das páginas.

Exemplo:

```text
lib/tributacao/
├── calculation
├── assessments
├── guides
├── payments
├── debt
├── certificates
└── parameters
```

Não colocar regras fiscais diretamente nos componentes React ou Server Actions.

---

# 14. IPTU

Implementar conforme planejamento original.

## Configuração

- exercício;
- PGV;
- alíquotas;
- descontos;
- vencimentos;
- parcelas;
- juros;
- multa;
- correção.

## Cálculo

```text
Cadastro Imobiliário
↓
Valor Venal
↓
Base de Cálculo
↓
Alíquota
↓
Benefícios
↓
IPTU
↓
TaxAssessment
```

## Operações

- lançar individual;
- lançar em lote;
- revisar;
- cancelar com justificativa;
- recalcular;
- segunda via;
- parcela única;
- parcelado;
- isenção;
- imunidade.

---

# 15. ITBI

Criar submódulo:

```text
/tributacao/itbi
```

## Fluxo

```text
Solicitação
↓
Imóvel
↓
Vendedor / Comprador
↓
Valor declarado
↓
Avaliação municipal
↓
Base
↓
Alíquota
↓
Lançamento
↓
Guia
↓
Pagamento
↓
Quitação / Certidão
```

## Dados

- imóvel;
- vendedor;
- comprador;
- tipo de transação;
- valor declarado;
- valor avaliado;
- base;
- alíquota;
- imposto;
- cartório;
- matrícula;
- anexos via GED;
- Processo relacionado.

---

# 16. ISS

Eliminar cálculo fixo de 5%.

## Parametrizar

- lista de serviços;
- CNAE;
- atividade;
- alíquota;
- incidência;
- retenção;
- deduções;
- regime;
- ISS fixo;
- ISS variável;
- ISS estimado.

## Apuração

```text
Competência
Prestador
Atividade
Base
Alíquota
Retenção
Deduções
↓
ISS devido
↓
TaxAssessment
↓
TaxGuide
```

---

# 17. NFS-e

O código atual registra uma `Invoice`, mas ainda não deve ser tratado como emissão fiscal válida.

## Remover

- `issValue = serviceValue * 0.05`;
- código aleatório;
- qualquer indicação de nota oficial sem integração.

## Implementar domínio planejado

- credenciamento;
- autorização;
- emissão;
- cancelamento;
- substituição;
- prestador;
- tomador;
- serviço;
- lista de serviço;
- CNAE;
- base;
- alíquota;
- retenção;
- competência;
- número;
- verificação;
- XML;
- DANFSE/PDF;
- consulta.

## Integração

Criar adapter para o padrão de NFS-e aplicável ao município.

Não acoplar a interface a um provedor específico.

---

# 18. Taxas Municipais

Criar cadastro parametrizado.

## Tipos

- licença;
- fiscalização;
- expediente;
- alvará;
- sanitária;
- publicidade;
- ocupação;
- lixo;
- cemitério;
- protocolo;
- certidão;
- ambiental;
- obras.

## Cálculo

Suportar inicialmente:

```text
Valor fixo
Valor por unidade
Faixa
Percentual
Fórmula parametrizada controlada
```

Toda taxa gera `TaxAssessment`.

---

# 19. Alvarás e Licenças

A tela atual cria alvará diretamente como emitido.

Isso deve ser removido.

## Fluxo correto

```text
Solicitação
↓
Processo / Protocolo
↓
Checklist
↓
Análises
↓
Taxas
↓
Pagamento
↓
Aprovação
↓
Emissão
↓
GED
```

## Integrações

- Módulo 3 para tramitação;
- Módulo 4 para documentos;
- Obras para alvará de obras;
- Meio Ambiente para licença ambiental;
- demais módulos conforme tipo.

## Status

- solicitado;
- em análise;
- aguardando documentos;
- aguardando pagamento;
- deferido;
- emitido;
- vencido;
- renovado;
- suspenso;
- cancelado.

---

# 20. Guias e Arrecadação

Eliminar completamente:

```text
Gerar Guia Fictícia
Contribuinte Teste
Código de barras aleatório
```

## Guia real

A guia deve referenciar:

```text
TaxAssessment
```

e conter:

- número;
- valor principal;
- acréscimos;
- desconto;
- total;
- vencimento;
- status;
- histórico.

## Formas planejadas

- DAM;
- boleto;
- linha digitável;
- PIX;
- guia única;
- parcelada;
- segunda via.

---

# 21. Atualização de guia vencida

Criar serviço:

```text
recalculateGuide()
```

considerando:

- principal;
- multa;
- juros;
- correção;
- descontos ainda válidos;
- data de pagamento.

Guardar memória do cálculo.

---

# 22. Pagamentos e Baixas

## Corrigir baixa manual

Toda baixa manual deve exigir:

- valor;
- data;
- motivo;
- comprovante opcional;
- servidor;
- autorização conforme perfil.

## Validar valor

Não marcar como `Paga` se o valor total necessário não tiver sido quitado, salvo tratamento explícito de pagamento parcial.

## Transação

Usar `$transaction` para:

```text
TaxPayment
TaxGuide
TaxAssessment
```

---

# 23. Retorno bancário

Implementar importação conforme banco/convenente.

Arquitetura:

```text
BankReturnBatch
BankReturnItem
```

Fluxo:

```text
Arquivo/API do banco
↓
Importação
↓
Validação
↓
Matching com guia
↓
Baixa
↓
Relatório de divergência
```

Suportar adapters para CNAB/API conforme contratação municipal.

---

# 24. PIX / boleto

Implementar via provider configurável.

Não colocar credenciais ou regras bancárias nas telas.

Interface:

```text
PaymentProvider
BankAgreement
```

Separar:

- geração;
- consulta;
- webhook;
- conciliação;
- estorno, quando aplicável.

---

# 25. Vencimento automático

Não depender de gravar manualmente `Vencida`.

Regra de apresentação:

```text
status != Paga/Cancelada
e
dueDate < hoje
→ Vencida
```

Rotina pode materializar status posteriormente, mas a regra não pode ficar inconsistente.

---

# 26. Parcelamentos

O modelo atual é insuficiente.

Criar relação entre parcelamento e débitos.

Exemplo:

```text
DebtInstallment
DebtInstallmentDebt
DebtInstallmentParcel
```

## Fluxo

```text
Selecionar débitos
↓
Simular
↓
Entrada
↓
Quantidade
↓
Termo
↓
Parcelas / Guias
```

## Regras

- parcela mínima;
- máximo de parcelas;
- juros;
- vencimentos;
- rompimento;
- reparcelamento;
- quitação.

---

# 27. Dívida Ativa

Não criar dívida isolada sem origem.

## Fluxo

```text
TaxAssessment vencido
↓
Elegibilidade
↓
Inscrição
↓
ActiveDebt
↓
CDA
```

Criar vínculo:

```text
ActiveDebt
→ TaxAssessment
```

ou tabela de composição se uma CDA agrupar débitos.

## Guardar

- origem;
- exercício;
- principal;
- multa;
- juros;
- correção;
- data de inscrição;
- fundamento;
- situação.

---

# 28. Atualização da Dívida

Não permitir digitar livremente `updatedValue` como única regra.

Criar cálculo a partir de:

- principal;
- índice;
- juros;
- multa;
- data-base.

Guardar memória de atualização.

---

# 29. CDA

Implementar:

- numeração;
- composição;
- contribuinte;
- origem dos débitos;
- valores;
- data;
- status;
- documento gerado;
- vínculo GED.

Alteração/cancelamento deve exigir justificativa e auditoria.

---

# 30. Cobrança Administrativa

Criar fluxo:

```text
Débito
↓
Notificação
↓
Prazo
↓
Negociação / Parcelamento
↓
Inscrição / Protesto / Jurídico
```

Registrar contatos e providências.

---

# 31. Protesto / Jurídico

Nesta fase, estruturar o domínio e integrações.

Não presumir API nacional única.

Criar:

```text
DebtCollectionAction
```

com:

- tipo;
- data;
- destino;
- protocolo;
- retorno;
- status;
- anexos.

Integração específica será configurada conforme cartório/central/Procuradoria.

---

# 32. Certidões

## Correção crítica

Hoje o sistema permite emitir CND sem consultar débitos.

Isso deve ser bloqueado.

## Serviço obrigatório

```text
evaluateTaxpayerCertificate()
```

Verificar:

- lançamentos;
- guias;
- vencidos;
- parcelamentos;
- suspensão da exigibilidade;
- dívida ativa;
- situação relevante.

## Resultado

- Negativa;
- Positiva;
- Positiva com Efeitos de Negativa.

A decisão deve ser automática segundo regras configuradas.

---

# 33. Documento da Certidão

Ao emitir:

```text
TaxCertificate
↓
PDF
↓
Document GED
```

Guardar:

- código de autenticidade;
- data;
- validade;
- situação fiscal considerada;
- documento.

Criar página de validação futura via Portal.

---

# 34. Fiscalização Tributária

Evoluir `Infraction` para um processo fiscal real.

## Fiscalização

- ordem de serviço;
- contribuinte;
- fiscal;
- origem;
- período;
- tributo;
- documentos;
- evidências;
- relatório;
- prazos.

## Ações

- termo de início;
- notificação;
- auto;
- defesa;
- parecer;
- decisão;
- encerramento.

---

# 35. Autos de Infração e Notificações

Implementar documento oficial com:

- numeração;
- fundamento;
- fato;
- tributo;
- base;
- multa;
- prazo;
- ciência;
- fiscal;
- anexos;
- GED.

Auto confirmado pode gerar:

```text
TaxAssessment
```

e posteriormente Dívida Ativa, conforme regras.

---

# 36. Processos Tributários

Não criar workflow paralelo ao Módulo 3.

Usar:

```text
Process
```

com tipo tributário.

Casos:

- revisão de IPTU;
- defesa;
- impugnação;
- recurso;
- ITBI;
- isenção;
- imunidade;
- restituição;
- compensação;
- baixa.

Criar vínculos entre Processo e entidades tributárias.

---

# 37. Declarações municipais

Criar domínio para:

- declaração mensal de ISS;
- serviços tomados;
- sem movimento;
- retenções;
- construção;
- cadastral;
- baixa;
- atividade.

## Fluxo

```text
Receber
↓
Validar
↓
Apurar
↓
Lançar
↓
Guia
```

Retificação deve preservar histórico.

---

# 38. Integração com GED

Documentos tributários oficiais devem virar `Document`.

Exemplos:

- guia;
- certidão;
- CDA;
- auto;
- notificação;
- alvará;
- termo;
- parcelamento;
- relatório fiscal;
- documentação de ITBI.

Não duplicar storage.

---

# 39. Integração com Atendimento

Módulo 5 pode:

- consultar débitos;
- solicitar segunda via;
- registrar reclamação tributária;
- gerar processo;
- acompanhar demanda.

Atendimento não altera lançamento diretamente.

---

# 40. Integração com Financeiro/Contábil

Todo pagamento confirmado deve gerar evento de arrecadação.

Criar uma camada de integração:

```text
TaxPayment
↓
RevenueIntegrationEvent
↓
Financeiro / Contábil
```

Guardar:

- receita;
- fonte/destinação quando aplicável;
- código;
- valor;
- data;
- guia;
- pagamento;
- status de integração.

Evitar duplicidade usando chave idempotente.

---

# 41. Portal do Contribuinte

Está no planejamento original, mas deve consumir a lógica segura do Tributário.

Serviços:

- débitos;
- segunda via;
- PIX/boleto;
- certidões;
- IPTU;
- ITBI;
- alvarás;
- NFS-e;
- parcelamentos;
- processos;
- cadastro;
- documentos.

Não duplicar regra fiscal no Portal.

---

# 42. Busca e paginação

Todas as telas tributárias devem usar:

- busca server-side;
- filtros;
- paginação;
- ordenação.

Eliminar o padrão:

```text
take: 20
```

sem navegação.

---

# 43. Auditoria fiscal

Obrigatória para:

- cadastro fiscal;
- imóvel;
- valor venal;
- parâmetros;
- lançamento;
- revisão;
- cancelamento;
- guia;
- baixa manual;
- estorno;
- desconto;
- isenção;
- imunidade;
- parcelamento;
- dívida;
- CDA;
- certidão;
- auto;
- fiscalização.

## Log mínimo

```text
userId
employeeId
action
entityType
entityId
before
after
reason
createdAt
```

---

# 44. Perfis

## Atendente Tributário

- consulta;
- segunda via;
- abertura de solicitação;
- certidão conforme permissão.

## Fiscal

- fiscalização;
- notificação;
- auto;
- declarações.

## Gestor Tributário

- lançamentos;
- revisões;
- aprovações;
- relatórios;
- dívida.

## Procuradoria

- dívida;
- CDA;
- protesto;
- ajuizamento.

## Financeiro/Contábil

- arrecadação;
- conciliação;
- integração.

## Administrador Tributário

- parâmetros;
- tributos;
- alíquotas;
- integrações.

---

# 45. Dashboard

Corrigir o atual.

## Indicadores

- arrecadação do dia;
- arrecadação do mês;
- por tributo;
- guias emitidas;
- pagas;
- vencidas;
- débitos;
- parcelamentos;
- dívida ativa;
- certidões;
- contribuintes;
- imóveis;
- inscrições;
- alvarás vencendo.

“Arrecadação do mês” deve filtrar efetivamente o período de pagamento.

---

# 46. Relatórios

Implementar os originalmente planejados:

- arrecadação por período;
- tributo;
- contribuinte;
- bairro;
- guias;
- inadimplência;
- dívida;
- parcelamentos;
- IPTU lançado/arrecadado;
- ISS declarado/recolhido;
- ITBI;
- alvarás;
- certidões;
- empresas;
- imóveis;
- autos;
- notificações;
- débitos por exercício;
- relatório contábil.

---

# 47. Funcionalidades explicitamente fora do Módulo 7

Não implementar aqui:

```text
VAF
IPM-ICMS
IPM-IBS
GIA
Anexo XVI da GIA
DEFIS/PGDAS-D para VAF
EFD-ICMS/IPI
Produção Primária para IPM
CVI
cruzamento de cartões
cruzamento fiscal estadual
monitoramento de retorno do ICMS
```

Tudo isso pertence ao novo módulo **Receita**.

O Tributário pode compartilhar cadastros e dados municipais com Receita, mas não absorver essas funções.

---

# 48. Ordem recomendada de implementação

## Sprint 1 — Fundação fiscal

- [ ] migrar dinheiro de `Float` para `Decimal`;
- [ ] relação `Usuario ↔ Employee`;
- [ ] parâmetros tributários;
- [ ] catálogo de tributos;
- [ ] CNAE/atividades/lista de serviços;
- [ ] completar contribuinte fiscal;
- [ ] completar imóvel;
- [ ] completar cadastro econômico;
- [ ] busca/paginação.

## Sprint 2 — Lançamento e arrecadação

- [ ] motor de cálculo;
- [ ] `TaxAssessment`;
- [ ] guias reais;
- [ ] eliminar guia fictícia;
- [ ] vencimentos;
- [ ] atualização;
- [ ] pagamento;
- [ ] baixa transacional;
- [ ] auditoria.

## Sprint 3 — IPTU / Taxas

- [ ] PGV;
- [ ] cálculo IPTU;
- [ ] lançamento individual/lote;
- [ ] taxas;
- [ ] carnês/guias;
- [ ] isenção/imunidade.

## Sprint 4 — ITBI / Alvarás

- [ ] ITBI;
- [ ] processo integrado;
- [ ] taxas;
- [ ] pagamento;
- [ ] alvarás por workflow;
- [ ] documentos GED.

## Sprint 5 — ISS / NFS-e

- [ ] lista de serviços;
- [ ] alíquotas;
- [ ] apuração;
- [ ] declarações;
- [ ] NFS-e real por adapter;
- [ ] integração ISS → lançamento.

## Sprint 6 — Dívida e Parcelamento

- [ ] inscrição a partir de lançamentos;
- [ ] atualização;
- [ ] CDA;
- [ ] parcelamento;
- [ ] cobrança administrativa;
- [ ] integração jurídica.

## Sprint 7 — Certidões / Fiscalização

- [ ] certidão automática;
- [ ] PDF/GED;
- [ ] fiscalização;
- [ ] autos;
- [ ] defesa;
- [ ] Processo tributário.

## Sprint 8 — Integrações e gestão

- [ ] retorno bancário;
- [ ] PIX/boleto;
- [ ] Financeiro/Contábil;
- [ ] dashboard;
- [ ] relatórios;
- [ ] Portal do Contribuinte.

---

# 49. Critérios de aceite

O Módulo Tributário estará funcional quando for possível:

1. localizar contribuinte;
2. cadastrar imóvel vinculado;
3. cadastrar inscrição econômica;
4. configurar tributo;
5. calcular lançamento;
6. gerar `TaxAssessment`;
7. emitir guia real;
8. atualizar guia vencida;
9. registrar/receber pagamento;
10. baixar de forma transacional;
11. refletir quitação no lançamento;
12. emitir certidão conforme situação fiscal real;
13. inscrever débito vencido em dívida mantendo origem;
14. parcelar débitos identificados;
15. gerar CDA;
16. abrir processo tributário;
17. anexar documentos via GED;
18. integrar arrecadação ao Financeiro;
19. auditar alterações críticas;
20. consultar tudo com busca e paginação.

---

# 50. Resultado esperado

```text
                 MÓDULO 7 — TRIBUTÁRIO
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
 Cadastro Fiscal      Lançamento          Fiscalização
      │                    │                    │
      └───────────────┬────┴──────────────┬─────┘
                      │                   │
                    Guias             Processos
                      │                   │
                  Pagamentos              │
                      │                   │
            ┌─────────┴─────────┐         │
            │                   │         │
         Quitado           Dívida Ativa   │
            │                   │         │
        Certidões          CDA/Parcelas   │
            └─────────┬─────────┴─────────┘
                      │
              Financeiro / GED
```

O Módulo 7 será responsável por **tributos próprios municipais e sua cobrança**, sem misturar inteligência do retorno do ICMS/VAF/IPM.
