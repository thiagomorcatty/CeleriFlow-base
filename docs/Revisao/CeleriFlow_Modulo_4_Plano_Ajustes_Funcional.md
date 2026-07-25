# CeleriFlow — Módulo 4: Documentos e GED
## Plano de ajustes e correções para deixar o módulo atual funcional

**Objetivo:** corrigir e completar o Módulo 4 existente para que ele funcione como a biblioteca documental oficial do CeleriFlow, reutilizada pelos demais módulos.

Este plano prioriza **o que já foi construído e planejado**. Recursos avançados como OCR, QR Code, migração em lote, arquivo físico e versionamento completo ficam para uma etapa posterior, depois que a base atual estiver estável.

---

# 1. Papel do GED no CeleriFlow

O GED deve ser a camada central de documentos do sistema:

```text
Arquivo
  ↓
Upload central
  ↓
Vercel Blob privado
  ↓
Document
  ↓
Vínculos com módulos
```

Exemplos:

```text
Document
├── Pessoa
├── Empresa
├── Processo / Protocolo
├── Obras
├── Cultura
├── Câmara
├── Segurança
└── demais módulos
```

**Processos e Protocolos movimenta a demanda.**

**GED guarda e administra os documentos dessa demanda.**

---

# 2. O que já existe

## Funcional

- Painel básico;
- criação de pastas;
- subpastas;
- navegação por pastas;
- upload real;
- Vercel Blob privado;
- limite de 20 MB;
- MIME types permitidos;
- sanitização do nome do arquivo;
- registro `Document`;
- visualização/download autenticado;
- vínculo com `Person`;
- vínculo com `Company`;
- vínculo real com Obras;
- CRUD básico de modelos;
- fila visual de documentos pendentes de assinatura.

## Parcial ou inconsistente

- exclusão documental;
- exclusão de pastas;
- permissões;
- classificação por departamento;
- busca;
- validade;
- modelos reais;
- assinatura;
- auditoria;
- integração uniforme com outros módulos.

---

# 3. PRIORIDADE 0 — Unificar Processos e Protocolos com o GED

## Situação atual

Hoje existem **duas estruturas documentais independentes**:

```text
Módulo 4
Document
```

e:

```text
Módulo 3
ProcessDocument
```

O `ProcessDocument` atual possui:

```text
processId
title
fileUrl
documentType
employeeId
createdAt
```

mas **não possui `documentId` apontando para `Document`**.

Além disso, a tela de abertura de protocolo atualmente apenas desenha uma área visual para anexos; o upload do processo ainda não está implementado.

### Consequência atual

Um futuro upload implementado diretamente em `ProcessDocument` poderia criar um segundo repositório paralelo ao GED.

Isso deve ser evitado.

---

# 3.1 Regra arquitetural obrigatória

Todo documento anexado a um processo deve ser primeiro um documento do GED.

Fluxo:

```text
Servidor anexa arquivo no Processo
          ↓
API central de upload
          ↓
Vercel Blob privado
          ↓
cria Document no GED
          ↓
cria vínculo com o Processo
```

Assim:

> **o Processo não possui uma cópia independente do arquivo; ele possui um vínculo com um documento oficial do GED.**

---

# 3.2 Alteração recomendada no banco

Evoluir `ProcessDocument` para funcionar como tabela de vínculo.

Exemplo:

```prisma
model ProcessDocument {
  id         String   @id @default(cuid())

  processId  String
  process    Process  @relation(fields: [processId], references: [id], onDelete: Cascade)

  documentId String
  document   Document @relation(fields: [documentId], references: [id])

  employeeId String?
  employee   Employee? @relation("DocumentEmployee", fields: [employeeId], references: [id])

  purpose    String?
  createdAt  DateTime @default(now())
}
```

Campos como:

```text
title
fileUrl
documentType
```

não devem precisar ser duplicados no `ProcessDocument`, pois já pertencem a `Document`.

---

# 3.3 Fluxo no Módulo 3

Na abertura ou dentro de um protocolo:

```text
Anexar Documento
```

deve chamar o mesmo serviço usado pelo GED.

Depois:

```text
Document
└── ProcessDocument
    └── Process
```

Exemplo:

```text
Document
Título: Contrato Social
Tipo: Contrato Social
Blob: documents/uuid-contrato-social.pdf

ProcessDocument
Processo: PROC-2026-000145
Documento: Contrato Social
Finalidade: Documento inicial
```

---

# 3.4 Visualização no Processo

A aba **Documentos** do processo deve consultar:

```text
ProcessDocument
→ Document
```

e apresentar:

- título;
- tipo;
- data;
- responsável pelo upload;
- tamanho;
- status;
- validade, quando houver;
- botão visualizar;
- botão baixar.

---

# 3.5 Visualização no GED

O mesmo arquivo também deve aparecer na Biblioteca do GED, conforme a sua classificação e permissões.

Portanto:

```text
Processo → documento
```

e:

```text
GED → mesmo documento
```

devem apontar para o mesmo `Document.id`.

---

# 3.6 Regra de permanência

O planejamento original define que:

> documento anexado a processo deve manter vínculo permanente.

Então:

- inativar um processo não elimina o documento;
- arquivar processo não elimina documento;
- remover vínculo deve exigir permissão e justificativa;
- documento assinado não pode ser sobrescrito;
- auditoria deve registrar vinculação e desvinculação.

---

# 3.7 Evitar duplicidade

Antes de fazer upload do mesmo arquivo várias vezes, preparar o GED para armazenar metadados suficientes para futura detecção de duplicidade.

Nesta fase, pelo menos armazenar:

```text
originalFilename
mimeType
sizeBytes
blobPathname
```

Checksum/hash pode ser adicionado posteriormente.

---

# 4. PRIORIDADE 0 — Corrigir exclusão documental

## Situação atual

Atualmente:

```text
prisma.document.delete()
```

apaga o registro do PostgreSQL.

O arquivo do Blob continua armazenado.

Além de inconsistente, o planejamento define que exclusão física deve ser evitada.

## Implementar inativação

Adicionar ao `Document`:

```text
isActive
inactivatedAt
inactivatedById
inactivationReason
```

A ação padrão deve ser:

```text
Inativar documento
```

e não:

```text
Excluir definitivamente
```

Solicitar justificativa.

## Regra

```text
Banco → registro preservado
Blob  → arquivo preservado
Status → inativo
```

Exclusão física deve ser ação administrativa excepcional.

---

# 5. PRIORIDADE 0 — Corrigir exclusão de pastas

## Problema atual

A exclusão:

- move arquivos para a raiz;
- tenta apagar subpastas;
- não trata corretamente árvores profundas;
- não corresponde claramente ao texto da interface.

## Primeira versão

Não permitir excluir pasta que contenha:

- documentos;
- subpastas.

Mensagem:

> Esta pasta possui conteúdo. Mova ou inative os itens antes de excluí-la.

Somente pasta vazia pode ser removida.

---

# 6. PRIORIDADE 0 — Melhorar autorização de download

## Situação atual

A API verifica se o usuário está autenticado, mas recebe:

```text
/api/download?url=...
```

e não verifica adequadamente o acesso ao registro documental.

## Alterar para

```text
/api/download?id=DOCUMENT_ID
```

Fluxo:

1. autenticar;
2. localizar `Document`;
3. validar documento ativo;
4. validar permissão;
5. registrar acesso;
6. obter `fileUrl`;
7. recuperar Blob;
8. entregar arquivo.

Nunca usar URL enviada pelo navegador como referência principal.

---

# 7. PRIORIDADE 0 — Completar metadados

Adicionar ao `Document`:

```text
originalFilename
blobPathname
mimeType
sizeBytes
uploadedById
```

Manter:

```text
title
documentType
fileUrl
validUntil
status
notes
folderId
personId
companyId
```

## Resultado

O GED saberá:

- qual era o nome original;
- tamanho;
- MIME;
- caminho no Blob;
- quem enviou;
- quando enviou.

---

# 8. PRIORIDADE 0 — Corrigir nome no download

Hoje o arquivo físico pode ter nome:

```text
UUID-contrato-social.pdf
```

O usuário deve receber:

```text
Contrato Social.pdf
```

usar:

```text
originalFilename
```

no header de download.

---

# 9. PRIORIDADE 1 — Biblioteca de Documentos / Busca

O planejamento define a Biblioteca como a principal tela do GED.

Hoje o módulo navega por pastas, mas não possui busca documental real.

## Criar busca

Inicialmente pesquisar por:

- título;
- tipo;
- pessoa;
- empresa;
- pasta;
- status;
- validade;
- data.

Depois adicionar:

- secretaria;
- setor;
- processo;
- protocolo.

## Não implementar OCR agora

Busca dentro de PDF/imagem fica para fase posterior.

---

# 10. PRIORIDADE 1 — Tipos Documentais

## Situação atual

Os tipos aparecem fixos no front-end:

```text
Arquivo
Ofício
Contrato
Portaria
Decreto
Edital
Relatório
Norma
Projeto
```

## Problema

Cada prefeitura precisa parametrizar seus tipos.

## Implementar entidade própria

Exemplo:

```text
DocumentType
id
name
code
description
isActive
defaultValidityDays
```

Na primeira versão, não é necessário implementar todas as regras avançadas.

## Interface

Criar:

```text
/documentos/tipos
```

com:

- listar;
- criar;
- editar;
- inativar.

---

# 11. PRIORIDADE 1 — Classificação por Secretaria e Setor

`Folder` já possui:

```text
departmentId
```

mas hoje esse campo não é usado no front-end.

## Implementar

Ao criar/editar pasta permitir:

- Secretaria;
- Departamento.

Exemplo:

```text
Secretaria de Administração
└── Departamento de Compras
    └── Contratos
```

## Caixa/visão do usuário

Posteriormente as permissões usarão esse vínculo.

---

# 12. PRIORIDADE 1 — Controle de acesso

Na primeira versão implementar níveis simples:

```text
Interno
Restrito ao Setor
Restrito à Secretaria
Sigiloso
```

Não é necessário criar ACL individual complexa agora.

Adicionar ao `Document` um campo como:

```text
accessLevel
```

## Regras

### Interno

Usuários autenticados com permissão no GED.

### Restrito ao setor

Usuários daquele departamento.

### Restrito à secretaria

Usuários da secretaria.

### Sigiloso

Perfis autorizados.

---

# 13. PRIORIDADE 1 — Relação Usuario ↔ Employee

Assim como no Módulo 3, para saber:

```text
Usuário
→ Servidor
→ Departamento
→ Secretaria
```

deve existir relação explícita entre:

```text
Usuario
Employee
```

Não depender apenas de e-mail.

Essa relação será reutilizada para:

- uploads;
- permissões;
- auditoria;
- pastas;
- processos;
- documentos sigilosos.

---

# 14. PRIORIDADE 1 — Validade documental

`Document.validUntil` já existe.

## Completar funcionalidade

Mostrar:

```text
Válido
Próximo do vencimento
Vencido
Sem validade
```

Não depender de atualizar manualmente `status`.

Calcular visualmente conforme a data.

## Dashboard

Adicionar:

- documentos vencidos;
- vencendo nos próximos X dias.

---

# 15. PRIORIDADE 1 — Novo Documento

O upload atual é simples e funcional.

Evoluir o modal/tela para registrar:

- título;
- tipo;
- descrição;
- pasta;
- data de validade;
- pessoa, opcional;
- empresa, opcional;
- secretaria/setor;
- nível de acesso.

O arquivo continua usando:

```text
/api/upload
```

e Vercel Blob privado.

---

# 16. PRIORIDADE 1 — Padronizar uploads dos outros módulos

O helper:

```text
lib/platform/blob.ts
```

deve ser o serviço central.

Eliminar:

- uploads simulados;
- URLs fictícias;
- chamadas diretas ao Blob espalhadas quando não forem necessárias;
- regras diferentes de MIME/tamanho em cada módulo.

## Cadastros

Hoje `/cadastros/documentos/novo` utiliza URL simulada.

Alterar para:

```text
/api/upload
→ Document
```

## Processos

Implementar conforme a integração da seção 3.

## Outros módulos

Quando revisados, reutilizar:

```text
Document
+
tabela de vínculo
```

---

# 17. PRIORIDADE 1 — Auditoria documental básica

Criar log para:

- upload;
- visualização;
- download;
- alteração de metadados;
- inativação;
- mudança de acesso;
- vinculação;
- desvinculação.

## Campos mínimos

```text
documentId
userId
action
createdAt
details
```

Posteriormente:

- IP;
- dispositivo;
- valor anterior;
- valor novo.

---

# 18. PRIORIDADE 1 — Dashboard

Hoje existem poucos contadores.

Completar com dados que já podem ser obtidos sem implementar funcionalidades avançadas:

- total de documentos ativos;
- documentos incluídos hoje;
- pastas;
- documentos por tipo;
- vencidos;
- vencendo;
- pendentes de assinatura;
- documentos sem pasta;
- documentos por secretaria/setor, quando classificação estiver pronta.

## Remover afirmação incorreta

Enquanto versionamento não existir, não afirmar na interface que o GED possui versionamento.

---

# 19. PRIORIDADE 1 — Corrigir “Recentes”

Na raiz atual, documentos sem pasta são exibidos com nome semelhante a:

```text
Arquivos Recentes
```

Mas eles não são necessariamente recentes.

Alterar para:

```text
Arquivos na Raiz
```

A visualização:

```text
?view=recentes
```

continua sendo realmente “Recentes”.

---

# 20. PRIORIDADE 1 — Breadcrumb de pastas

Garantir que a navegação represente toda a árvore.

Exemplo:

```text
GED
> Administração
> Contratos
> 2026
> Empresa ABC
```

Não apenas a pasta atual e o nível imediatamente anterior.

---

# 21. PRIORIDADE 1 — Corrigir Modelos

## Situação atual

O cadastro de modelos cria:

```text
Document
documentType = "Modelo"
```

e gera uma URL fictícia de `.docx`.

Nenhum arquivo é realmente criado.

## Correção básica

Nesta fase, transformar Modelos em um **cadastro real de arquivos-modelo**.

Fluxo:

```text
Novo Modelo
→ título
→ descrição
→ upload do DOCX/PDF/ODT
→ Vercel Blob
→ registro no banco
```

Não criar editor web agora.

## Resultado

A tela Modelos passa a ser realmente útil como biblioteca de:

- ofícios;
- memorandos;
- portarias;
- declarações;
- termos;
- pareceres.

Geração automática de documentos fica para fase posterior.

---

# 22. PRIORIDADE 1 — Corrigir fila de Assinaturas

## Situação atual

“Assinar” apenas altera:

```text
Pendente Assinatura
→ Válido
```

e “Rejeitar” altera status.

Isso não é assinatura eletrônica.

## Correção imediata

Enquanto a assinatura real não estiver implementada:

- renomear a funcionalidade para **Aprovação de Documentos**, ou
- deixar claramente indicado como fluxo interno de aprovação.

Não utilizar textos que afirmem validade de assinatura eletrônica.

## Registrar

- usuário aprovador;
- data;
- decisão;
- observação.

Assinatura digital real será implementada em fase posterior.

---

# 23. PRIORIDADE 1 — Corrigir busca da fila

O input existente na tela de assinaturas/aprovações deve realmente filtrar:

- título;
- tipo;
- data.

Hoje ele é apenas visual.

---

# 24. PRIORIDADE 2 — Relatórios básicos

Somente depois das correções anteriores.

Criar:

1. documentos por período;
2. documentos por tipo;
3. documentos por setor;
4. documentos por secretaria;
5. documentos vencidos;
6. documentos vencendo;
7. documentos inativos;
8. documentos enviados por usuário.

Exportação CSV pode ser adicionada depois.

---

# 25. Funcionalidades planejadas para fase posterior

O planejamento original é mais amplo que a implementação atual.

Não precisam bloquear a estabilização do módulo:

## OCR

- OCR PDF/imagem;
- busca textual;
- extração automática;
- classificação automática.

## Versionamento completo

- V1, V2, V3;
- restauração;
- comparação;
- bloqueio de versão assinada.

## Assinatura digital

- Gov.br;
- ICP-Brasil;
- A1/A3;
- carimbo de tempo;
- evidências.

## QR Code / Validação Pública

- código de validação;
- página pública;
- QR Code.

## Migração em lote

- ZIP;
- CSV/XLSX;
- estrutura de pastas;
- relatórios de erros.

## Digitalização técnica

- scanner;
- rotação;
- páginas em branco;
- PDF/A;
- melhoria de imagem.

## Arquivo físico

- caixa;
- sala;
- estante;
- prateleira;
- retirada/devolução.

## Temporalidade

- tabela de guarda;
- destinação;
- eliminação;
- preservação permanente.

---

# 26. Integrações existentes e situação

| Integração | Situação |
|---|---|
| Document → Person | ✅ |
| Document → Company | ✅ |
| Document → Folder | ✅ |
| Folder → Department | 🟡 banco preparado |
| Document → Obras | ✅ |
| Document → Cultura | 🟡 estrutura/banco |
| Document → Câmara | 🟡 estrutura/banco |
| Document → Segurança | 🟡 estrutura/banco |
| Process → GED | 🔴 corrigir conforme seção 3 |
| Cadastros → upload GED | 🔴 upload atual simulado |
| Modelos → storage | 🔴 URL fictícia |
| Assinaturas → assinatura real | 🔴 |
| Usuário → Employee | 🔴 necessário |

---

# 27. Fluxo de uso pela prefeitura após os ajustes

## Exemplo: documento administrativo

Servidor entra:

```text
Documentos e GED
→ Biblioteca
→ Novo Documento
```

Preenche:

```text
Título: Contrato nº 012/2026
Tipo: Contrato
Secretaria: Administração
Setor: Compras
Acesso: Interno
```

Seleciona PDF.

Fluxo:

```text
Upload
↓
Vercel Blob privado
↓
Document
↓
Pasta Contratos/2026
```

O documento pode ser localizado posteriormente por:

- título;
- tipo;
- pasta;
- secretaria;
- setor;
- pessoa/empresa vinculada.

---

# 28. Fluxo integrado com Processo

Exemplo:

```text
PROC-2026-000145
Inscrição Municipal
```

Servidor anexa:

```text
Contrato Social.pdf
```

Fluxo:

```text
Processo
  ↓
Anexar Documento
  ↓
API GED
  ↓
Vercel Blob
  ↓
Document
  ↓
ProcessDocument (vínculo)
  ↓
Processo
```

Na tela do Processo aparece:

```text
Contrato Social
PDF
Enviado por João Silva
25/07/2026
[Visualizar] [Baixar]
```

Na Biblioteca GED, o mesmo `Document` continua pesquisável e administrável.

**Não existem duas cópias do arquivo.**

---

# 29. Ordem recomendada de implementação

## Sprint 1 — Integridade e segurança

- [ ] Alterar exclusão de `Document` para inativação;
- [ ] corrigir exclusão de pastas;
- [ ] adicionar metadados do arquivo;
- [ ] mudar download para `documentId`;
- [ ] adicionar autorização documental;
- [ ] armazenar usuário responsável;
- [ ] criar relação `Usuario ↔ Employee`;
- [ ] corrigir nome do download.

## Sprint 2 — GED funcional

- [ ] busca da Biblioteca;
- [ ] CRUD de Tipos Documentais;
- [ ] classificação por secretaria/setor;
- [ ] níveis básicos de acesso;
- [ ] validade automática/visual;
- [ ] melhorar formulário Novo Documento;
- [ ] breadcrumb completo;
- [ ] corrigir “Arquivos Recentes”.

## Sprint 3 — Integrações

- [ ] integrar Processos com `Document`;
- [ ] alterar `ProcessDocument` para vínculo;
- [ ] implementar upload real nos Processos;
- [ ] substituir upload simulado de Cadastros;
- [ ] padronizar outros módulos conforme forem revisados;
- [ ] auditoria de upload/download/vínculo.

## Sprint 4 — Interfaces existentes

- [ ] Modelos com upload real;
- [ ] remover URL fictícia de modelos;
- [ ] transformar Assinaturas em Aprovação enquanto não houver assinatura real;
- [ ] registrar aprovador/data;
- [ ] ativar busca da fila;
- [ ] ampliar dashboard;
- [ ] relatórios básicos.

---

# 30. Critérios para considerar o GED funcional

O módulo pode ser considerado funcional nesta primeira fase quando conseguirmos executar este teste:

1. usuário autenticado entra no GED;
2. cria pasta;
3. cria subpasta;
4. faz upload de arquivo permitido;
5. arquivo é salvo em Blob privado;
6. metadados são salvos;
7. documento aparece na Biblioteca;
8. usuário autorizado consegue visualizar;
9. usuário não autorizado é bloqueado;
10. busca encontra o documento;
11. documento pode ser vinculado a pessoa/empresa;
12. documento pode ser anexado a processo sem duplicar arquivo;
13. processo consegue visualizar o mesmo documento;
14. validade é exibida corretamente;
15. documento pode ser inativado com justificativa;
16. arquivo permanece preservado;
17. acesso/download gera auditoria;
18. pasta com conteúdo não é apagada acidentalmente;
19. modelo cadastrado aponta para arquivo real;
20. nenhuma tela afirma possuir assinatura/versionamento que ainda não esteja implementado.

Se isso funcionar de ponta a ponta, teremos:

> **um GED interno centralizado, seguro, organizado e reutilizado pelos módulos do CeleriFlow.**

---

# 31. Decisões arquiteturais desta revisão

## Sistema único

Não adicionar:

```text
tenantId
```

nem reconstruir multi-tenant.

## Storage único

Usar:

```text
lib/platform/blob.ts
```

e Vercel Blob privado.

## Documento único

O mesmo arquivo deve possuir um único registro oficial:

```text
Document
```

Os módulos devem criar **vínculos**, não cópias.

## Exclusão

Por padrão:

```text
inativação
```

e não exclusão física.

## Recursos avançados

Só implementar depois da estabilização da base.

---

# 32. Resultado esperado

Ao final desta revisão:

```text
                 GED
                  │
                  │
         ┌────────┼─────────┐
         │        │         │
      Pessoa   Empresa   Processo
                            │
                         Tramitação
```

O GED passa a ser a fonte única de documentos do CeleriFlow.

Essa é a base necessária antes de avançarmos para:

- OCR;
- versionamento;
- assinatura digital;
- validação pública;
- migração;
- temporalidade;
- automações documentais.
