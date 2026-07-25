# CeleriFlow — Novo Módulo Receita
## Inteligência da Receita, VAF/IPM, ICMS, Produção Primária e Cruzamento Fiscal

**Objetivo:** criar um novo módulo especializado em aumentar a capacidade do município de acompanhar receitas compartilhadas, conferir informações econômicas, detectar divergências, organizar ações fiscais e proteger/melhorar sua participação no retorno de tributos estaduais.

Este módulo é distinto do Módulo 7 — Tributário.

---

# 1. Papel do Módulo Receita

## Tributário

Cuida de tributos próprios municipais:

```text
IPTU
ISS
ITBI
Taxas
Guias
Pagamentos
Dívida Ativa
Certidões
```

## Receita

Cuida de inteligência econômica e receitas compartilhadas:

```text
VAF
IPM-ICMS
transição IPM-IBS
GIA
EFD ICMS/IPI
Simples Nacional
PGDAS-D
DEFIS
Produção Primária
CVI
NF-e
dados de meios eletrônicos
cruzamentos fiscais
divergências
impugnações do IPM
PIT
```

---

# 2. Princípio arquitetural

O módulo não deve depender de uma única fonte nem assumir que toda fonte possui API.

Criar uma camada:

```text
Receita Data Hub
```

com adapters.

## Modos de entrada

### API oficial

Quando houver API autorizada e documentada.

### Arquivo oficial

Importação de:

- CSV;
- XLSX;
- TXT;
- ZIP;
- XML;
- arquivos SPED/EFD;
- relatórios exportados dos portais estaduais/federais.

### Portal / acesso institucional

Dados obtidos pelo servidor municipal em:

- Receita Estadual;
- Portal dos Entes Federados;
- e-CAC;
- AIM;
- sistemas estaduais.

O CeleriFlow importa os arquivos/exportações resultantes.

### Integração específica contratada

Quando a SEFAZ ou outro órgão disponibilizar webservice/integração para o município.

---

# 3. Arquitetura macro

```text
                 FONTES EXTERNAS
                        │
 ┌────────┬────────┬────┼────┬──────────┬──────────┐
 │        │        │    │    │          │          │
 GIA     EFD     Simples NF-e Produção  Cartões   IPM/AIM
                    │        Primária
 └────────┴────────┴────┼────┴──────────┴──────────┘
                        │
                  IMPORTAÇÃO
                        │
                  NORMALIZAÇÃO
                        │
                RECEITA DATA HUB
                        │
      ┌─────────────────┼──────────────────┐
      │                 │                  │
   VAF/IPM         Cruzamento          Fiscalização
      │                 │                  │
      │             Divergências            │
      │                 │                  │
      └─────────────── CVI ─────────────────┘
                        │
                    Resultados
                        │
                Gestão / Relatórios
```

---

# 4. Escopo funcional

O novo módulo deve possuir:

1. Painel Receita;
2. Empresas / Estabelecimentos;
3. VAF;
4. IPM;
5. GIA;
6. Simples Nacional;
7. Produção Primária;
8. EFD ICMS/IPI;
9. NF-e e documentos fiscais;
10. Meios de Pagamento;
11. Cruzamento Fiscal;
12. Divergências;
13. CVI;
14. Fiscalizações / Ações;
15. Impugnações do IPM;
16. PIT;
17. Importações;
18. Lotes e Qualidade de Dados;
19. Relatórios;
20. Auditoria;
21. Configurações / Fontes de Dados.

---

# 5. Painel Receita

## Indicadores

- VAF do município;
- evolução do VAF;
- posição/ranking quando disponível;
- IPM provisório;
- IPM definitivo;
- diferença provisório × definitivo;
- estimativa de impacto financeiro;
- estabelecimentos monitorados;
- empresas do regime geral;
- empresas do Simples;
- produtores;
- divergências abertas;
- divergências de alto valor;
- CVIs pendentes;
- CVIs enviadas;
- CVIs aceitas/regularizadas;
- valor potencial recuperável;
- importações com erro;
- cobertura dos dados por competência.

## Alertas

- queda relevante de VAF;
- empresa com movimento incompatível;
- estabelecimento possivelmente fora do município;
- PGDAS/DEFIS divergente;
- EFD divergente;
- aquisição de produção primária não refletida;
- endereço inconsistente;
- CVI com prazo;
- prazo de impugnação do IPM.

---

# 6. Cadastro mestre de estabelecimento

O módulo deve reutilizar:

```text
Company
Taxpayer
EconomicRegistration
```

do CeleriFlow sempre que possível.

Criar uma visão estadual/econômica complementar.

## Campos adicionais

- CNPJ;
- razão social;
- CGC/TE / inscrição estadual;
- CNAE;
- município de cadastro;
- endereço;
- categoria;
- regime;
- situação;
- contador;
- grupo econômico;
- data de início;
- data de baixa;
- origem dos dados;
- última atualização.

---

# 7. Entidade de estabelecimento estadual

Sugestão:

```prisma
RevenueEstablishment
```

Campos:

```text
id
companyId?
taxpayerId?
cnpj
stateRegistration
name
cnae
taxRegime
municipalityCode
address
status
source
validFrom
validTo
createdAt
updatedAt
```

Não duplicar `Company` quando a empresa já estiver cadastrada.

---

# 8. VAF — Valor Adicionado Fiscal

Criar área própria:

```text
/receita/vaf
```

## Guardar por

- ano-base;
- estabelecimento;
- atividade;
- fonte;
- entradas;
- saídas;
- ajustes;
- VAF calculado;
- VAF oficial;
- diferença;
- status da conferência.

## Funções

- importar dados;
- consolidar;
- comparar anos;
- comparar estabelecimento;
- identificar variações;
- identificar valores negativos/anormais;
- acompanhar ajustes;
- registrar contestação;
- manter histórico.

---

# 9. IPM — Índice de Participação dos Municípios

Criar:

```text
/receita/ipm
```

## Registrar

- ano do índice;
- ano-base;
- índice provisório;
- índice definitivo;
- componentes;
- data de publicação;
- fonte;
- posição;
- impacto estimado.

## Componentes

Modelagem configurável, porque os critérios variam por UF e podem mudar.

Para o adapter RS, suportar os componentes oficiais aplicáveis e manter histórico de regra.

Nunca hardcodar toda a fórmula no front-end.

---

# 10. Transição IPM-ICMS → IPM-IBS

O módulo deve ser preparado para coexistência de modelos.

Criar:

```text
RevenueParticipationIndex
```

com:

```text
indexType = IPM_ICMS | IPM_IBS
```

Permitir:

- acompanhar ambos;
- guardar metodologia/versão;
- comparar impactos;
- manter séries históricas.

A lógica deve ser parametrizada por vigência.

---

# 11. GIA

Criar importador para os dados disponibilizados ao município.

## Objetivos

- armazenar apurações relevantes;
- conferir entradas/saídas;
- analisar VAF;
- identificar divergências;
- comparar períodos;
- cruzar com EFD;
- cruzar com Simples quando aplicável.

## Estrutura

```text
RevenueGiaDeclaration
RevenueGiaItem
RevenueGiaAdjustment
```

Campos:

- estabelecimento;
- período;
- versão;
- origem;
- valores;
- status;
- hash do arquivo;
- importação.

---

# 12. Anexo XVI da GIA

Criar tratamento específico para informações atribuídas ao município, inclusive de contribuintes sediados em outros municípios quando os dados oficiais disponibilizados permitirem.

## Funções

- importar;
- vincular município;
- consolidar valor;
- identificar ausência;
- comparar exercícios;
- gerar divergência.

---

# 13. EFD ICMS/IPI

Criar importador de arquivos EFD/SPED ou datasets autorizados disponibilizados ao município.

A EFD é uma escrituração digital com registros de operações, documentos e apuração de ICMS/IPI.

## Importador

Suportar:

```text
TXT SPED
ZIP
```

e versões do layout.

Não gravar o arquivo inteiro como uma única string.

Criar parser por registro.

---

# 14. Estrutura EFD

Sugestão:

```text
RevenueEfdFile
RevenueEfdRecord
RevenueEfdDocument
RevenueEfdItem
RevenueEfdParticipant
RevenueEfdApportionment
```

Para MVP, não é necessário mapear todos os registros do SPED.

Mapear primeiro os registros necessários aos cruzamentos definidos.

---

# 15. Versionamento do layout EFD

Criar:

```text
layoutVersion
```

e parser por versão.

Não assumir que o layout de 2026 será permanente.

Guardar:

- versão;
- período;
- hash;
- data de importação;
- estabelecimento;
- status de validação.

---

# 16. Simples Nacional

Criar:

```text
/receita/simples
```

## Fontes

- PGDAS-D;
- DEFIS;
- situação de optante;
- demais arquivos/dados disponibilizados institucionalmente.

Não presumir API pública irrestrita.

O sistema deve aceitar importação de arquivos/relatórios fornecidos aos municípios ou integração autorizada.

---

# 17. PGDAS-D

Guardar informações mensais relevantes:

```text
estabelecimento
competência
receita declarada
segregações
município
atividade
retificadora?
data
origem
```

## Funções

- série mensal;
- ausência de declaração;
- variação abrupta;
- comparação com NF-e/NFS-e;
- comparação com pagamentos eletrônicos;
- comparação com cadastro econômico;
- gerar indício.

---

# 18. DEFIS

Guardar dados anuais relevantes.

## Funções

- comparar receita anual;
- comparar evolução;
- comparar com PGDAS-D;
- detectar incompatibilidades;
- detectar mudança de município/endereço;
- cruzar com documentos fiscais.

---

# 19. Produção Primária

Criar submódulo:

```text
/receita/producao-primaria
```

## Entidades

```text
RevenueRuralProducer
RevenuePrimaryProductionMovement
RevenuePrimaryProductionSummary
```

## Dados

- produtor;
- propriedade;
- inscrição;
- produto;
- entrada;
- saída;
- adquirente;
- documento;
- valor;
- data;
- município;
- origem.

## Funções

- importação das informações oficiais;
- consolidação;
- comparação de entradas e saídas;
- identificação de aquisição por empresa;
- evolução por produtor/produto;
- divergências;
- suporte a CVI de aquisição de produção primária.

---

# 20. Integração com cadastro rural

Se houver cadastro de produtor em outros módulos:

```text
Person
Company
Taxpayer
RealEstate
```

reutilizar.

O módulo Receita deve criar apenas os atributos necessários à análise estadual/produção primária.

---

# 21. NF-e e documentos fiscais

Criar estrutura de importação dos documentos fiscais disponibilizados legalmente ao município.

Não assumir acesso irrestrito à base nacional.

## Estrutura

```text
RevenueFiscalDocument
RevenueFiscalDocumentItem
```

Campos:

- chave;
- modelo;
- emissão;
- emitente;
- destinatário;
- município;
- CFOP;
- NCM;
- valor;
- situação;
- origem.

---

# 22. NFS-e municipal

O novo módulo pode consumir as NFS-e do próprio Módulo 7.

Fluxo:

```text
Módulo 7 NFS-e
↓
evento / consulta interna
↓
Receita
↓
Cruzamento
```

Não duplicar notas.

---

# 23. Meios de Pagamento Eletrônicos

Criar uma fonte lógica para valores de:

- cartão;
- outros meios eletrônicos disponibilizados pelas fontes oficiais/autorizadas.

Não conectar diretamente a adquirentes sem base legal/convênio.

## Estrutura

```text
RevenueElectronicPayment
```

- estabelecimento;
- período;
- valor;
- fonte;
- tipo;
- importação.

---

# 24. Cruzamento Fiscal

Este é o coração analítico do módulo.

Criar um motor configurável de regras.

```text
RevenueCrossCheckRule
RevenueCrossCheckRun
RevenueFinding
```

---

# 25. Exemplos de cruzamentos

## Simples × documentos fiscais

```text
Receita declarada no PGDAS-D
vs
NF-e/NFS-e
```

## Simples × meios eletrônicos

```text
PGDAS-D / DEFIS
vs
valores de pagamentos eletrônicos
```

## GIA × EFD

```text
valores declarados
vs
escrituração
```

## Produção Primária

```text
aquisições declaradas
vs
movimentação oficial
```

## Endereço

```text
cadastro estadual
vs
cadastro municipal
vs
evidências
```

## Grupo econômico

- sócios;
- endereço;
- contador;
- atividade;
- vínculos cadastrais.

---

# 26. Motor de regras

Não colocar cruzamentos em SQL espalhado pelas telas.

Criar serviço:

```text
lib/receita/cross-check/
```

Uma regra deve possuir:

```text
code
name
description
sourceA
sourceB
periodicity
severity
tolerance
isActive
version
```

---

# 27. Finding — Indício

Quando uma regra encontra divergência:

```text
RevenueFinding
```

Campos:

- regra;
- contribuinte;
- estabelecimento;
- competência;
- valor A;
- valor B;
- diferença;
- percentual;
- severidade;
- evidências;
- status;
- responsável;
- prazo;
- conclusão.

Status:

```text
Novo
Em Análise
Procedente
Improcedente
Aguardando Contribuinte
Gerou CVI
Regularizado
Arquivado
```

---

# 28. CVI — Comunicação de Verificação de Indícios

Criar:

```text
/receita/cvi
```

A CVI deve nascer de um indício ou de uma solicitação da Receita Estadual.

## Tipos

O modelo precisa ser configurável.

Para o adapter RS, contemplar:

- saldo operacional;
- conferência de endereço;
- valores de pagamentos eletrônicos;
- aquisição de produção primária;
- grupos econômicos;
- outros tipos instituídos pela Receita Estadual.

---

# 29. Fluxo CVI

```text
Finding
↓
Análise Municipal
↓
CVI
↓
Contato / Verificação
↓
Evidências
↓
Documento oficial
↓
Envio pelo canal da Receita Estadual
↓
Protocolo externo
↓
Acompanhamento
↓
Resultado
```

---

# 30. Envio da CVI

Como o canal oficial atual no RS é Protocolo Eletrônico/e-CAC, o CeleriFlow não deve simular uma API inexistente.

Na primeira versão:

```text
Gerar pacote CVI
```

com:

- formulário;
- PDF;
- anexos;
- evidências;
- checklist;
- instruções;
- número interno.

Após o servidor enviar no e-CAC:

```text
Registrar protocolo externo
```

Campos:

- protocolo;
- data;
- responsável;
- prazo;
- status;
- retorno.

Se futuramente existir API oficial, implementar adapter sem alterar o domínio.

---

# 31. Modelos CVI

Gerar documentos conforme modelos vigentes.

Não hardcodar o formulário definitivamente.

Criar:

```text
RevenueCviTemplate
```

com:

- tipo;
- versão;
- vigência;
- campos;
- documento modelo.

Guardar versão usada em cada CVI.

---

# 32. Gestão de prazos da CVI

Criar:

- data de solicitação;
- prazo;
- data de envio;
- protocolo;
- retorno;
- pendências.

Alertas no painel.

---

# 33. PIT — Programa de Integração Tributária

Para o adapter RS, criar área:

```text
/receita/pit
```

## Funções

- registrar pontuação;
- acompanhar metas;
- CVIs;
- ações do setor primário;
- documentos de comprovação;
- histórico semestral;
- alertas.

Não misturar PIT com o cálculo do VAF.

---

# 34. Gestão de Informações do Setor Primário

Criar acompanhamento específico para ações e dados exigidos pela Receita Estadual.

Relacionar com:

```text
Produção Primária
PIT
CVI
```

---

# 35. Impugnação do IPM

Criar:

```text
RevenueIpmChallenge
```

## Guardar

- índice;
- ano;
- estabelecimento;
- componente;
- motivo;
- valores;
- evidências;
- prazo;
- documento;
- protocolo;
- resultado.

## Fluxo

```text
Publicação IPM provisório
↓
Análise
↓
Divergência
↓
Impugnação
↓
Protocolo
↓
Resultado
↓
Índice definitivo
```

---

# 36. Importações

Criar Central de Importações:

```text
/receita/importacoes
```

## Fontes

- GIA;
- Anexo XVI;
- EFD;
- PGDAS-D;
- DEFIS;
- produção primária;
- NF-e;
- meios de pagamento;
- IPM;
- VAF;
- outros arquivos oficiais.

---

# 37. Lote de importação

Entidade:

```text
RevenueImportBatch
```

Campos:

```text
sourceType
fileName
originalFileDocumentId
competence
layoutVersion
startedAt
finishedAt
status
totalRecords
validRecords
errorRecords
createdBy
checksum
```

---

# 38. Erros de importação

Criar:

```text
RevenueImportError
```

com:

- linha;
- registro;
- campo;
- erro;
- valor;
- severidade.

Permitir exportar relatório.

---

# 39. Idempotência

O mesmo arquivo não deve ser importado duas vezes acidentalmente.

Usar:

```text
checksum
source
competence
```

e controle de versão.

Importação retificadora deve ser explícita.

---

# 40. Arquivo original no GED

Todo arquivo importado deve ser guardado no Módulo 4.

```text
RevenueImportBatch
↓
Document
↓
Vercel Blob privado
```

Assim temos cadeia de custódia.

---

# 41. Integração com Módulo 2 — Cadastros

Reutilizar:

- Person;
- Company;
- endereço;
- contatos;
- imóveis.

Receita cria vínculos, não cópias desnecessárias.

---

# 42. Integração com Módulo 3 — Processos

Quando uma análise exigir procedimento interno formal:

```text
Finding / CVI / Impugnação
↓
Process
```

Usar Processos para:

- parecer;
- aprovação;
- tramitação;
- decisão;
- arquivamento.

---

# 43. Integração com Módulo 4 — GED

Usar GED para:

- arquivos de importação;
- relatórios;
- EFD;
- planilhas;
- CVIs;
- evidências;
- impugnações;
- documentos externos;
- retornos.

Sempre `Document`.

---

# 44. Integração com Módulo 5 — Atendimento

Atendimento pode registrar:

- contato de empresa;
- esclarecimento;
- entrega de documentos;
- resposta a indício.

Mas dados de inteligência fiscal permanecem restritos ao Receita.

---

# 45. Integração com Módulo 7 — Tributário

Essa integração é estratégica.

## Compartilhar

- `Taxpayer`;
- `Company`;
- `EconomicRegistration`;
- CNAE;
- situação municipal;
- NFS-e;
- ISS;
- alvará;
- endereço.

## Exemplos

```text
Receita identifica empresa com movimento
↓
consulta Cadastro Econômico
↓
compara atividade e endereço
```

ou:

```text
Receita detecta faturamento incompatível
↓
consulta NFS-e municipal
↓
gera Finding
```

Receita não deve alterar lançamentos municipais automaticamente.

Uma ação fiscal pode originar processo/fiscalização no Tributário.

---

# 46. Integração com Financeiro / Contábil

O módulo pode consumir valores de repasses/receitas compartilhadas para análise.

Não lançar contabilidade diretamente.

Criar integração de leitura ou eventos com:

- repasse ICMS;
- valores recebidos;
- previsão;
- diferença.

---

# 47. Integração com Fiscalização Tributária

Quando um indício tiver reflexo em tributo municipal:

```text
RevenueFinding
↓
Fiscalização Tributária
↓
Infraction / Process / Assessment
```

Exemplo:

- omissão de ISS;
- cadastro econômico irregular;
- endereço divergente.

---

# 48. Controle de acesso

Este módulo contém dados fiscais sensíveis.

Perfis sugeridos:

## Analista de Receita

- importar;
- analisar;
- gerar finding.

## Fiscal de Receita

- investigar;
- CVI;
- evidências.

## Gestor de Receita

- regras;
- indicadores;
- impugnações;
- aprovações.

## Auditor / Controle

- leitura e auditoria.

## Administrador

- fontes;
- layouts;
- parâmetros;
- permissões.

---

# 49. Sigilo

Implementar:

```text
accessLevel
```

e escopo por dado.

Não expor dados brutos no Portal do Cidadão/Transparência.

Somente indicadores agregados quando autorizados.

---

# 50. Auditoria

Registrar:

- importação;
- visualização de dados sensíveis;
- exportação;
- execução de cruzamento;
- mudança de regra;
- alteração de finding;
- CVI;
- protocolo;
- impugnação;
- exclusão/inativação lógica.

---

# 51. Banco de dados — entidades principais

Sugestão inicial:

```text
RevenueEstablishment
RevenueSource
RevenueImportBatch
RevenueImportError
RevenueVaf
RevenueParticipationIndex
RevenueGiaDeclaration
RevenueGiaItem
RevenueEfdFile
RevenueEfdRecord
RevenueSimpleDeclaration
RevenuePrimaryProducer
RevenuePrimaryProductionMovement
RevenueFiscalDocument
RevenueFiscalDocumentItem
RevenueElectronicPayment
RevenueCrossCheckRule
RevenueCrossCheckRun
RevenueFinding
RevenueCvi
RevenueCviTemplate
RevenueIpmChallenge
RevenuePitPeriod
RevenueAuditLog
```

---

# 52. Fonte de dados

Criar:

```text
RevenueSource
```

Campos:

```text
code
name
governmentLevel
state
integrationType
format
isActive
credentialsReference
lastSyncAt
notes
```

`credentialsReference` deve apontar para segredo/configuração segura, nunca conter senha em texto no banco.

---

# 53. Adapter por UF

A lógica de VAF/IPM e obrigações estaduais não é igual no Brasil inteiro.

Arquitetura:

```text
lib/receita/adapters/
├── rs/
├── sc/
├── pr/
└── ...
```

Primeiro adapter sugerido:

```text
RS
```

pois GIA, AIM, CVI e PIT do escopo atual estão fortemente ligados à Receita Estadual do RS.

---

# 54. Adapter RS

Responsabilidades:

- layouts de dados do AIM;
- GIA/Anexo XVI;
- orientações EFD para VAF;
- produção primária;
- CVI;
- PIT;
- IPM provisório/definitivo;
- impugnações;
- transição IPM-IBS.

Não colocar regras RS no domínio genérico.

---

# 55. APIs e acesso externo — regra de implementação

Nunca escrever no requisito:

> “consumir API da Receita X”

sem confirmar que essa API existe e que o município possui credenciais.

Cada fonte deve declarar:

```text
API
Download oficial
Arquivo recebido
Portal autenticado
Integração contratada
Entrada manual
```

---

# 56. Simples Nacional — acesso

PGDAS-D e DEFIS são sistemas oficiais do Simples Nacional e contêm declarações mensais e anuais.

Para o módulo:

- preparar importação dos dados fornecidos ao ente municipal;
- criar adapter caso exista serviço institucional autorizado;
- não automatizar login humano/e-CAC por scraping.

---

# 57. EFD — acesso

A EFD ICMS/IPI possui layout oficial SPED.

O CeleriFlow pode:

- importar arquivo SPED fornecido;
- importar dataset estadual autorizado;
- validar estrutura;
- extrair os registros necessários.

Não assumir download irrestrito de EFD de terceiros pela internet.

---

# 58. IPM/AIM — acesso

No RS existem ferramentas e consultas oficiais específicas para municípios.

O módulo deve aceitar:

- importações/exportações;
- dados obtidos do AIM;
- publicações oficiais;
- integrações futuras.

Guardar sempre a fonte e o período.

---

# 59. CVI — acesso

O envio oficial atual no RS é feito via Protocolo Eletrônico/e-CAC.

Portanto o MVP deve:

- gerar CVI;
- gerar anexos;
- criar checklist;
- registrar envio;
- registrar protocolo externo;
- acompanhar prazo/retorno.

Automação direta só quando houver canal oficial suportado.

---

# 60. Segurança da integração

Nunca armazenar:

- senha e-CAC;
- certificado;
- token;
- segredo;

diretamente em código ou tabela comum.

Usar:

- variáveis seguras;
- secret manager;
- criptografia;
- rotação;
- menor privilégio.

---

# 61. Dashboard de qualidade de dados

Mostrar:

- fontes atualizadas;
- última competência;
- importações pendentes;
- arquivos rejeitados;
- registros sem CNPJ;
- vínculos não resolvidos;
- duplicidades;
- dados inconsistentes.

Sem qualidade de dados, o cruzamento perde valor.

---

# 62. Matching de empresas

Criar serviço de resolução:

```text
CNPJ
Inscrição Estadual
Razão Social
Endereço
```

Prioridade:

```text
CNPJ exato
↓
IE
↓
vínculo manual
```

Não fazer matching automático definitivo apenas por nome.

---

# 63. Grupos econômicos

Criar vínculo opcional:

```text
RevenueEconomicGroup
RevenueEconomicGroupMember
```

Usado para análises e CVI.

Não assumir grupo apenas por coincidência; tratar como indício.

---

# 64. Severidade dos indícios

```text
Baixa
Média
Alta
Crítica
```

Baseada em:

- diferença absoluta;
- diferença percentual;
- recorrência;
- materialidade;
- regra.

Permitir parametrização.

---

# 65. Workflow de análise

```text
Finding Novo
↓
Analista assume
↓
Analisa fontes
↓
Anexa evidências
↓
Classifica
↓
Improcedente / Regularizado / CVI / Fiscalização
```

Registrar tudo.

---

# 66. Relatório por empresa

Dossiê interno:

- cadastro;
- regime;
- CNAE;
- VAF;
- GIA;
- EFD;
- Simples;
- NF-e;
- NFS-e;
- produção;
- pagamentos eletrônicos;
- findings;
- CVIs;
- processos;
- histórico.

Acesso restrito.

---

# 67. Relatórios gerenciais

- evolução do VAF;
- VAF por empresa;
- VAF por CNAE;
- principais variações;
- IPM histórico;
- impacto financeiro;
- divergências;
- findings por regra;
- CVIs;
- regularizações;
- produção primária;
- Simples;
- importações;
- qualidade de dados.

---

# 68. Relatórios de fiscalização

- contribuintes com maior divergência;
- sem declaração;
- queda abrupta;
- inconsistência endereço;
- divergência GIA × EFD;
- Simples × documentos fiscais;
- pagamentos eletrônicos × declarado;
- produção primária.

---

# 69. Exportações

Permitir:

- CSV;
- XLSX;
- PDF;

conforme permissão.

Toda exportação de dado fiscal sensível deve ser auditada.

---

# 70. Notificações internas

Criar:

- importação falhou;
- prazo CVI;
- prazo impugnação;
- finding crítico;
- dado oficial atualizado;
- fonte atrasada.

Não implementar WhatsApp para isso inicialmente.

---

# 71. APIs internas

Criar serviços internos, não endpoints abertos sem necessidade.

Exemplos:

```text
receita.import
receita.crossCheck
receita.findings
receita.cvi
receita.ipm
```

Se API HTTP for necessária, proteger por autenticação e permissão.

---

# 72. Jobs

Processamentos grandes não devem bloquear a página.

Exemplos:

- parser EFD;
- importação de milhares de NF-e;
- cruzamentos;
- consolidação VAF.

Criar fila/job persistente quando necessário.

Para primeira versão, jobs podem ser executados de maneira controlada pelo backend, mas deve existir status de processamento.

---

# 73. Estados do lote

```text
Pendente
Processando
Concluído
Concluído com Erros
Falhou
Cancelado
```

A interface deve permitir acompanhar.

---

# 74. Não apagar dado fiscal importado

Importações devem ser preservadas.

Retificação:

```text
versão 1
versão 2
```

e indicar qual é vigente.

Nunca sobrescrever silenciosamente.

---

# 75. Trilhas de origem

Todo valor exibido deve poder responder:

> De qual arquivo/fonte veio?

Guardar:

```text
sourceId
importBatchId
recordReference
```

---

# 76. Evidências

Um `Finding` pode ter:

```text
Document[]
```

via GED.

Exemplos:

- relatório;
- print institucional;
- NF;
- planilha;
- declaração;
- resposta do contribuinte.

---

# 77. Processo formal

Finding não é Processo.

Quando formalização for necessária:

```text
Finding
↓
Gerar Processo
↓
Process
```

O `Finding` continua sendo a origem analítica.

---

# 78. Receita não altera dados brutos

Dados importados são imutáveis.

Correções devem ocorrer como:

- nova importação;
- retificação;
- ajuste documentado;
- classificação analítica.

Nunca editar a declaração externa para “corrigir” o contribuinte.

---

# 79. MVP recomendado — Receita

## Fase 1

- Cadastro de fontes;
- Central de Importações;
- Empresas/Estabelecimentos;
- VAF;
- IPM;
- Simples PGDAS-D/DEFIS por importação;
- Produção Primária por importação;
- GIA/Anexo XVI por importação;
- EFD parser básico;
- motor de cruzamentos;
- Findings;
- CVI;
- GED;
- auditoria;
- relatórios básicos.

---

# 80. Fase 2

- NF-e;
- meios eletrônicos;
- regras avançadas;
- PIT;
- impugnação IPM;
- grupos econômicos;
- dashboard avançado;
- integração Fiscalização;
- jobs em lote.

---

# 81. Fase 3

- adapters adicionais por UF;
- integrações oficiais automatizadas quando disponíveis;
- previsões;
- análise estatística;
- priorização automática;
- transição IPM-IBS avançada.

---

# 82. Sprint 1 — Fundação

- [ ] models principais;
- [ ] permissões;
- [ ] `RevenueSource`;
- [ ] `RevenueImportBatch`;
- [ ] GED;
- [ ] Central de Importação;
- [ ] matching CNPJ/IE;
- [ ] auditoria.

---

# 83. Sprint 2 — VAF/IPM

- [ ] `RevenueVaf`;
- [ ] IPM provisório/definitivo;
- [ ] histórico;
- [ ] painel;
- [ ] adapter RS/AIM;
- [ ] impacto estimado.

---

# 84. Sprint 3 — Fontes

- [ ] GIA;
- [ ] Anexo XVI;
- [ ] PGDAS-D;
- [ ] DEFIS;
- [ ] Produção Primária;
- [ ] EFD parser;
- [ ] qualidade de dados.

---

# 85. Sprint 4 — Cruzamento

- [ ] regras;
- [ ] execução;
- [ ] findings;
- [ ] severidade;
- [ ] dossiê;
- [ ] evidências.

---

# 86. Sprint 5 — CVI

- [ ] tipos;
- [ ] templates;
- [ ] geração;
- [ ] documentos;
- [ ] protocolo externo;
- [ ] prazos;
- [ ] resultado.

---

# 87. Sprint 6 — Integrações

- [ ] Tributário;
- [ ] Processos;
- [ ] GED;
- [ ] Atendimento;
- [ ] Financeiro;
- [ ] Fiscalização Tributária.

---

# 88. Sprint 7 — Gestão

- [ ] PIT;
- [ ] impugnação IPM;
- [ ] NF-e;
- [ ] meios eletrônicos;
- [ ] relatórios;
- [ ] exportações;
- [ ] alertas.

---

# 89. Critérios de aceite do MVP Receita

O módulo estará funcional quando o município conseguir:

1. cadastrar fonte;
2. importar arquivo oficial;
3. preservar arquivo no GED;
4. validar lote;
5. vincular registros a empresas;
6. importar VAF/IPM;
7. importar GIA;
8. importar PGDAS-D/DEFIS;
9. importar Produção Primária;
10. importar EFD;
11. executar cruzamento;
12. gerar Finding;
13. analisar divergência;
14. gerar CVI;
15. gerar documento CVI;
16. registrar protocolo e-CAC;
17. acompanhar prazo;
18. registrar resultado;
19. gerar Processo quando necessário;
20. auditar acesso e alterações.

---

# 90. Fontes oficiais consideradas na arquitetura — verificação julho/2026

A arquitetura foi desenhada considerando informações oficiais atuais, incluindo:

- **Receita Federal / Portal do Simples Nacional:** PGDAS-D e DEFIS;
- **SPED / Receita Federal:** EFD ICMS/IPI e seus layouts;
- **Receita Estadual do Rio Grande do Sul:** AIM/IPM, orientações de EFD para VAF, PIT e CVI;
- **Receita Estadual do RS:** envio de CVI por Protocolo Eletrônico/e-CAC;
- **Receita Estadual do RS:** transição IPM-ICMS para IPM-IBS.

A existência de um dado em um portal oficial **não significa que exista API pública**. Cada integração deverá ser implementada conforme o meio de acesso legalmente disponibilizado ao município.

---

# 91. Resultado esperado

```text
                      MÓDULO RECEITA
                            │
                ┌───────────┴───────────┐
                │                       │
          Dados Externos          Dados CeleriFlow
                │                       │
 GIA / EFD / Simples / NF-e      Cadastro / NFS-e / ISS
 Produção / IPM / VAF                    │
                └───────────┬───────────┘
                            │
                     RECEITA DATA HUB
                            │
                      CRUZAMENTOS
                            │
                         FINDINGS
                            │
            ┌───────────────┼───────────────┐
            │               │               │
        Regularizar        CVI          Fiscalização
            │               │               │
            └───────────────┼───────────────┘
                            │
                        VAF / IPM
                            │
                    Gestão da Receita
```

O novo módulo **Receita** será a camada de inteligência fiscal e econômica do CeleriFlow, enquanto o Módulo 7 continua responsável pela administração dos tributos municipais.
