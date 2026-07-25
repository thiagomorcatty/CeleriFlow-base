# CeleriFlow — Módulo 3: Processos e Protocolos
## Plano de ajustes para tornar o módulo funcional

**Objetivo deste documento:** consolidar os ajustes necessários para transformar o módulo atual de Processos e Protocolos em um fluxo interno realmente utilizável por uma prefeitura, sem exigir inicialmente acesso do cidadão ao CeleriFlow.

---

# 1. Diagnóstico atual

O módulo já possui uma boa base de interface e estrutura de dados para:

- abertura de protocolo;
- consulta de processos;
- interessado vinculado ao Cadastro Geral;
- tipo de processo;
- assunto;
- prioridade;
- status;
- visualização de setor atual;
- visualização de documentos;
- visualização de despachos;
- visualização do histórico de tramitação;
- arquivamento;
- tela de assinaturas.

Entretanto, várias dessas funcionalidades estão atualmente apenas parcialmente implementadas ou preparadas para leitura.

O principal objetivo agora deve ser transformar o módulo de:

> **registro e consulta de processos**

para:

> **execução completa de processos administrativos internos com tramitação, responsabilidade, documentos, despachos e histórico rastreável.**

---

# 2. Escopo da primeira versão

Nesta fase, **não é necessário criar acesso do cidadão ao sistema**.

O CeleriFlow será utilizado pelos servidores municipais.

Um protocolo poderá ser originado por:

- atendimento presencial;
- telefone;
- e-mail;
- WhatsApp institucional;
- documento recebido;
- solicitação interna;
- outro sistema;
- requerimento entregue pelo interessado.

O servidor registra a solicitação no CeleriFlow e, a partir dali, todo o fluxo ocorre internamente.

O portal público do cidadão poderá ser implementado posteriormente.

---

# 3. Fluxo interno mínimo esperado

O módulo deve permitir:

```text
ABERTURA DO PROTOCOLO
        ↓
DEFINIÇÃO DO SETOR INICIAL
        ↓
CAIXA DO SETOR
        ↓
RECEBIMENTO
        ↓
ANÁLISE
        ↓
DESPACHO / DOCUMENTO
        ↓
TRAMITAÇÃO PARA OUTRO SETOR
        ↓
NOVA ANÁLISE
        ↓
...
        ↓
CONCLUSÃO
        ↓
ARQUIVAMENTO
```

Cada passagem deve gerar histórico.

---

# 4. PRIORIDADE 0 — Correções obrigatórias

Estas alterações devem ser realizadas antes das funcionalidades avançadas.

---

## 4.1 Numeração sequencial dos protocolos

### Situação atual

O sistema gera números aleatórios semelhantes a:

```text
PROC-2026-583104
```

O ano está fixo no código.

### Implementar

Criar numeração sequencial por prefeitura e ano:

```text
PROC-2026-000001
PROC-2026-000002
PROC-2026-000003
```

### Requisitos

- usar o ano atual automaticamente;
- garantir unicidade;
- impedir duplicação em aberturas simultâneas;
- sequência única por ano na base do sistema;
- preparar possibilidade futura de prefixo por órgão ou tipo.

### Futuro

Exemplo configurável:

```text
PROC-SEMAD-2026-000145
```

---

## 4.2 Definir setor inicial do processo

### Situação atual

O formulário informa que encaminhará o processo ao setor responsável, mas o `currentDepartment` não é definido na criação.

### Implementar

Na abertura, determinar o departamento inicial através de uma destas regras:

1. setor padrão configurado no Assunto;
2. setor padrão configurado no Tipo de Processo;
3. seleção manual pelo servidor, quando permitido.

### Resultado esperado

Após criar o protocolo:

```text
Process.currentDepartmentId = departamento inicial
```

O processo deve aparecer imediatamente na caixa desse setor.

---

## 4.3 Corrigir a Caixa do Setor

### Situação atual

A tela chamada **Caixa do Setor** carrega os processos mais recentes da prefeitura, sem filtrar pelo departamento do servidor.

### Implementar

Identificar:

```text
Usuário autenticado
→ servidor correspondente
→ departmentId do servidor
→ Process.currentDepartmentId
```

Mostrar apenas os processos sob responsabilidade daquele setor.

### Permissões especiais

Perfis administrativos poderão possuir:

- visualizar todos os setores;
- filtrar por secretaria;
- filtrar por departamento;
- consultar processos de toda a prefeitura.

---

## 4.4 Implementar recebimento do processo

Um processo encaminhado deve poder possuir estado de:

```text
ENCAMINHADO
→ AGUARDANDO RECEBIMENTO
→ RECEBIDO
→ EM ANÁLISE
```

Registrar:

- setor que enviou;
- setor que recebeu;
- usuário que recebeu;
- data e hora.

---

# 5. PRIORIDADE 1 — Tramitação real

Esta é a funcionalidade mais importante que falta no módulo.

---

## 5.1 Criar ação "Tramitar"

O botão **Tramitar** deve abrir uma tela/modal.

### Campos

- setor de destino;
- servidor de destino, opcional;
- motivo/observação;
- despacho associado, opcional;
- prazo da etapa, se aplicável;
- prioridade;
- notificar destino;
- anexos, quando necessário.

---

## 5.2 Ao tramitar

Executar uma transação única:

1. criar `ProcessMovement`;
2. registrar departamento de origem;
3. registrar departamento de destino;
4. registrar usuário/servidor responsável;
5. registrar data e hora;
6. registrar justificativa;
7. atualizar `Process.currentDepartmentId`;
8. atualizar status;
9. gerar auditoria;
10. disparar notificação interna/e-mail quando configurado.

Nenhuma tramitação deverá ocorrer apenas alterando `currentDepartmentId`.

---

## 5.3 Histórico

A tela do processo já possui estrutura para histórico.

Completar para mostrar:

```text
25/07/2026 09:14
Protocolo Geral → Cadastro Municipal
Encaminhado por: Maria Souza
Motivo: Análise para inscrição municipal

25/07/2026 11:32
Cadastro Municipal → Tributação
Encaminhado por: João Silva
Motivo: Validação tributária
```

---

# 6. PRIORIDADE 1 — Despachos e pareceres

## Situação atual

A tela consegue exibir registros existentes, porém o botão **Adicionar Despacho** ainda não cria registros.

## Implementar

Modal/tela para:

- tipo;
- conteúdo;
- servidor autor;
- setor;
- data/hora;
- visibilidade;
- documento/anexo associado.

### Tipos iniciais

- Despacho;
- Parecer;
- Decisão;
- Encaminhamento;
- Solicitação de informação;
- Informação interna.

### Fluxo

```text
Servidor abre processo
→ Adicionar despacho
→ escreve manifestação
→ salva
→ registro entra no histórico
```

---

# 7. PRIORIDADE 1 — Upload de documentos

## Situação atual

Existe interface visual de upload, mas não existe upload efetivo.

## Implementar

- `<input type="file">`;
- validação de tipo;
- validação de tamanho;
- envio ao storage;
- registro `ProcessDocument`;
- usuário responsável;
- data/hora;
- nome original;
- título/classificação;
- vínculo com processo.

### Formatos iniciais

- PDF;
- JPG/JPEG;
- PNG.

### Requisitos

- tamanho máximo configurável;
- download;
- visualização;
- exclusão/inativação com permissão;
- log de inclusão.

---

# 8. PRIORIDADE 1 — Interessados

## Pessoa Física

Já existe vínculo com `Person`.

## Pessoa Jurídica

Adicionar opção na abertura para buscar `Company`.

### Interface sugerida

```text
Tipo de interessado:
( ) Pessoa Física
( ) Pessoa Jurídica
```

Posteriormente:

- fornecedor;
- servidor;
- representante legal;
- contribuinte.

---

# 9. PRIORIDADE 1 — Tipo de Processo e Assunto

Atualmente o módulo consulta `ProcessType` e `Subject`.

Criar telas de parametrização para a prefeitura.

---

## Tipo de Processo

Campos iniciais:

- nome;
- descrição;
- ativo;
- departamento inicial;
- prazo padrão;
- prioridade padrão;
- permite abertura interna;
- exige interessado.

---

## Assunto

Campos:

- nome;
- tipo de processo;
- departamento responsável;
- prazo padrão;
- prioridade;
- ativo.

---

## Corrigir formulário de abertura

Ao selecionar um Tipo:

```text
Tipo: Inscrição Municipal
```

mostrar somente os assuntos associados:

```text
- Nova inscrição
- Alteração cadastral
- Baixa
- Segunda via
```

O backend também deve validar se o `subjectId` pertence ao `processTypeId`.

---

# 10. PRIORIDADE 1 — Status controlados

Evitar status arbitrários em texto livre.

## Status iniciais sugeridos

```text
Protocolado
Aguardando Recebimento
Recebido
Em Análise
Aguardando Informação
Aguardando Assinatura
Encaminhado
Concluído
Indeferido
Cancelado
Arquivado
Reaberto
```

Não é necessário implementar todos os status avançados imediatamente.

---

# 11. PRIORIDADE 1 — Prazo básico / SLA

Implementar inicialmente:

- prazo padrão do assunto;
- data prevista de conclusão;
- dias restantes;
- processo no prazo;
- prazo próximo;
- atrasado.

### Exemplo

```text
Abertura: 25/07/2026
Prazo: 10 dias
Previsão: 04/08/2026
Situação: NO PRAZO
```

### Dashboard

Adicionar:

- processos próximos do prazo;
- processos atrasados.

---

# 12. PRIORIDADE 1 — Auditoria

Toda ação administrativa importante deve gerar histórico.

Registrar inicialmente:

- criação;
- alteração de status;
- recebimento;
- tramitação;
- despacho;
- inclusão de documento;
- conclusão;
- arquivamento;
- reabertura.

### Campos mínimos

- usuário;
- servidor;
- setor;
- ação;
- data/hora;
- processo;
- informação anterior;
- informação nova;
- justificativa quando necessária.

Posteriormente:

- IP;
- dispositivo;
- download;
- consulta de processo sigiloso.

---

# 13. PRIORIDADE 1 — Regras de arquivamento e reabertura

## Arquivamento

Ao arquivar, solicitar:

- motivo;
- observação;
- responsável.

Motivos sugeridos:

- solicitação atendida;
- indeferimento;
- cancelamento;
- perda de objeto;
- duplicidade;
- ausência de documentação;
- encerramento administrativo.

## Reabertura

Não permitir simplesmente trocar o status.

Solicitar:

- justificativa;
- usuário responsável;
- setor de destino.

Gerar histórico.

---


# 13.1 PRIORIDADE 1 — Tela de Acompanhamento de Processos

Esta tela deve ser uma entrega explícita de **front-end** do Módulo 3.

Ela não substitui a **Caixa do Setor** e não é uma área do cidadão.

## Objetivo

Permitir que servidores autorizados acompanhem o andamento dos processos internos da prefeitura, identificando:

- onde o processo está;
- por quais setores já passou;
- quando ocorreu cada tramitação;
- quem realizou cada movimentação;
- há quanto tempo está no setor atual;
- status atual;
- prioridade;
- prazo;
- despachos;
- documentos;
- pendências;
- última movimentação.

---

## Diferença entre as telas

### Caixa do Setor

Uso operacional.

Responde:

> **"O que o meu setor precisa trabalhar agora?"**

Mostra somente os processos atualmente sob responsabilidade do setor do usuário, salvo perfis com visão ampliada.

### Buscar Processo

Uso pontual.

Responde:

> **"Quero localizar um processo específico."**

### Acompanhamento de Processos

Uso de acompanhamento e supervisão.

Responde:

> **"Onde está este processo e o que aconteceu com ele?"**

ou:

> **"Quais processos estão parados, atrasados ou circulando entre os setores?"**

### Detalhes do Processo

Uso individual.

Responde:

> **"Quero ver toda a história deste processo."**

A página atual `/protocolos/processos/[id]` deve ser evoluída e reutilizada como detalhe do acompanhamento.

---

## 13.1.1 Nova rota sugerida

Criar:

```text
/protocolos/acompanhamento
```

Adicionar ao menu lateral:

```text
Painel de Protocolos
Caixa do Setor
Acompanhamento
Buscar Processo
Assinaturas
Arquivados
```

---

## 13.1.2 Cards no topo

Exibir indicadores como:

- Em andamento;
- Aguardando recebimento;
- Em análise;
- Próximos do prazo;
- Atrasados;
- Aguardando assinatura;
- Concluídos no período.

Esses cards devem funcionar também como filtros rápidos.

---

## 13.1.3 Filtros

Implementar filtros combináveis:

- número do protocolo;
- interessado;
- CPF/CNPJ;
- tipo;
- assunto;
- secretaria;
- setor atual;
- responsável atual;
- status;
- prioridade;
- período de abertura;
- prazo;
- atrasado;
- sem movimentação há X dias.

---

## 13.1.4 Tabela principal

Colunas sugeridas:

| Coluna | Conteúdo |
|---|---|
| Protocolo | `PROC-2026-000145` |
| Interessado | Pessoa ou empresa |
| Tipo / Assunto | Tipo e assunto |
| Setor Atual | Departamento responsável |
| Responsável | Servidor atual, quando houver |
| Status | Em Análise, Encaminhado etc. |
| Prazo | Data / indicador visual |
| Última Movimentação | Data e resumo |
| Tempo no Setor | Ex.: 2 dias |
| Ações | Acompanhar / Visualizar |

---

## 13.1.5 Indicadores visuais

Utilizar identificação visual simples:

```text
🟢 No prazo
🟡 Prazo próximo
🔴 Atrasado
🔵 Aguardando recebimento
⚪ Concluído
```

Também destacar prioridade:

```text
Normal
Alta
Urgente
```

---

## 13.1.6 Tela individual de acompanhamento

Reaproveitar e evoluir:

```text
/protocolos/processos/[id]
```

A tela atual já possui uma base para:

- dados gerais;
- setor atual;
- interessado;
- documentos;
- despachos;
- histórico de tramitação.

Ela deve evoluir para uma visão interna completa.

### Cabeçalho

Exibir:

- número;
- tipo;
- assunto;
- interessado;
- status;
- prioridade;
- data de abertura;
- prazo previsto;
- setor atual;
- responsável atual.

---

## 13.1.7 Linha do tempo

A timeline deve mostrar os eventos em ordem cronológica.

Exemplo:

```text
25/07/2026 08:32
PROTOCOLO ABERTO
Atendimento / Protocolo Geral
Responsável: Maria Souza

25/07/2026 08:35
ENCAMINHADO
Protocolo Geral → Cadastro Municipal
Responsável: Maria Souza
Motivo: Análise inicial da inscrição municipal

25/07/2026 10:18
RECEBIDO
Cadastro Municipal
Responsável: João Silva

25/07/2026 11:45
DESPACHO
Cadastro Municipal
"Documentação cadastral conferida."

25/07/2026 11:48
ENCAMINHADO
Cadastro Municipal → Tributação

25/07/2026 15:22
ENCAMINHADO
Tributação → Obras

26/07/2026 08:10
RECEBIDO
Obras
```

A timeline não deve mostrar somente `ProcessMovement`.

No futuro ela deve consolidar eventos provenientes de:

- criação;
- recebimento;
- movimentação;
- despacho;
- parecer;
- documento anexado;
- mudança de status;
- solicitação de informação;
- assinatura;
- conclusão;
- arquivamento;
- reabertura.

---

## 13.1.8 Fluxo visual

Quando existir um fluxo padrão configurado, apresentar também um **stepper**:

```text
✓ Cadastro
   ↓
✓ Tributação
   ↓
● Obras
   ↓
○ Financeiro
   ↓
○ Administração
```

Legenda:

- `✓` etapa concluída;
- `●` etapa atual;
- `○` etapa futura.

Para processos sem fluxo pré-configurado, mostrar apenas a timeline real.

---

## 13.1.9 Permissões da tela

### Operador

- acompanha processos do próprio setor;
- acompanha processos em que atuou, conforme política municipal.

### Gestor de Secretaria

- acompanha os departamentos da própria secretaria.

### Administrador Municipal

- acompanha toda a prefeitura.

### Auditor / Controle Interno

- leitura ampla;
- acesso ao histórico e auditoria;
- ações operacionais limitadas conforme permissão.

---

## 13.1.10 Regra importante

A Tela de Acompanhamento é **interna**.

Não deve ser confundida com futura:

```text
Consulta Pública de Protocolo
```

O acesso do cidadão continuará fora do escopo inicial.

---

# 13.2 PRIORIDADE 0 — Vincular Usuário do Sistema ao Servidor

A autenticação atual resolve um `Usuario`, enquanto as movimentações, documentos e despachos do Módulo 3 são associados a `Employee`.

Para permitir:

- Caixa do meu setor;
- responsável atual;
- tramitação;
- despacho;
- auditoria;
- acompanhamento por usuário;

é necessário existir vínculo explícito entre as duas entidades.

## Implementação recomendada

Criar relação 1:1 opcional entre:

```text
Usuario
↔
Employee
```

Uma opção:

```prisma
model Usuario {
  ...
  employeeId String?   @unique
  employee   Employee? @relation(fields: [employeeId], references: [id])
}

model Employee {
  ...
  usuario Usuario?
}
```

A modelagem final pode ser invertida, mas o vínculo deve ser explícito.

### Não depender somente de e-mail

Mesmo que `Usuario.email` e `Employee.email` possam coincidir, e-mail não deve ser a chave de relacionamento operacional.

---


## Confirmação no schema atual

O `schema.prisma` confirma que:

- `Employee` possui `secretariatId`;
- `Employee` possui `departmentId`;
- `Process` possui `currentDepartmentId`;
- `ProcessMovement` relaciona origem, destino e `Employee`;
- `ProcessDispatch` relaciona `Employee` e `Department`;
- `ProcessDocument` pode registrar o `Employee` que anexou.

Porém, `Usuario` atualmente não possui relação direta com `Employee`.

Essa ligação é necessária para sabermos com segurança:

```text
Usuário logado
→ qual servidor ele representa
→ qual departamento
→ qual secretaria
```

e então construir corretamente a Caixa do Setor, a autoria de ações e a tela de acompanhamento.


# 13.3 PRIORIDADE 0 — Enriquecer o contexto autenticado

O contexto autenticado deve disponibilizar, quando aplicável:

```text
user.id
user.employeeId
user.departmentId
user.secretariatId
user.role
```

Assim as páginas e Server Actions poderão aplicar corretamente:

- Caixa do Setor;
- filtros;
- autoria de despachos;
- autoria das tramitações;
- permissões;
- escopo de acompanhamento.

---

# 13.4 PRIORIDADE 0 — Ativar permissões do módulo

O contexto atual do módulo deve validar efetivamente as permissões configuradas para o usuário.

Para o Módulo 3, considerar pelo menos:

```text
canView
canEdit
```

e posteriormente permissões específicas:

```text
protocolos.view_own_department
protocolos.view_secretariat
protocolos.view_all
protocolos.create
protocolos.move
protocolos.dispatch
protocolos.archive
protocolos.reopen
protocolos.audit
```

A interface não deve ser a única camada de proteção.

As Server Actions também devem validar a permissão.

---

# 13.5 Arquitetura atual — sistema único

O CeleriFlow deve ser tratado nesta versão como **um sistema único**, sem arquitetura multi-tenant.

Consequências para este módulo:

- não criar `tenantId`;
- não adicionar filtros por tenant;
- não criar sequência de protocolo por tenant;
- não duplicar regras pensando em várias prefeituras dentro da mesma base;
- utilizar diretamente a estrutura municipal cadastrada (`Institution`, `Secretariat`, `Department`, `Employee`).

A numeração do protocolo pode ser controlada por:

```text
ano + sequência
```

Exemplo:

```text
PROC-2026-000001
```

O arquivo `tenant-context.ts` deve ser entendido apenas como uma camada legada de contexto/autenticação enquanto mantiver esse nome. Não devemos ampliar ou reconstruir a arquitetura multi-tenant a partir dele.


# 14. PRIORIDADE 2 — Notificações

Na primeira versão, priorizar:

## Notificações internas

Exemplo:

```text
Novo processo recebido no seu setor.
PROC-2026-000145
```

## E-mail

Eventos iniciais:

- processo recebido;
- processo encaminhado;
- processo próximo do prazo;
- assinatura pendente.

Não é necessário WhatsApp nesta primeira versão.

---

# 15. PRIORIDADE 2 — Dashboard gerencial

Adicionar:

- protocolos abertos hoje;
- processos em andamento;
- concluídos;
- arquivados;
- por setor;
- por secretaria;
- aguardando recebimento;
- aguardando assinatura;
- próximos do prazo;
- atrasados;
- por prioridade.

Posteriormente:

- tempo médio;
- gargalos;
- produtividade.

---

# 16. PRIORIDADE 2 — Relatórios básicos

Implementar inicialmente:

1. processos por período;
2. processos por status;
3. processos por setor;
4. processos por tipo/assunto;
5. processos atrasados;
6. processos concluídos.

Filtros:

- período;
- secretaria;
- departamento;
- tipo;
- assunto;
- status;
- prioridade.

Exportação futura:

- PDF;
- XLSX/CSV.

---

# 17. Busca

Ampliar a busca no backend.

Atualmente a consulta principal deve passar a pesquisar:

- número;
- descrição;
- interessado;
- CPF;
- CNPJ;
- tipo;
- assunto;
- setor atual;
- status.

Posteriormente:

- conteúdo de despachos;
- documentos/OCR.

---

# 18. Fluxo de exemplo — Inscrição Municipal

Este fluxo representa um caso semelhante ao vivido em uma prefeitura para abertura de inscrição municipal.

## Fluxo proposto no CeleriFlow

```text
PROTOCOLO / ATENDIMENTO
        ↓
CADASTRO MUNICIPAL
Verifica dados e documentação
        ↓
TRIBUTAÇÃO / IMPOSTOS
Valida cadastro fiscal e enquadramento
        ↓
OBRAS / ALVARÁ
Confere regularidade física e alvarás
        ↓
FINANCEIRO / TRIBUTOS
Verifica pendências e débitos
        ↓
ADMINISTRAÇÃO
Validação final
        ↓
APROVADO
        ↓
CONCLUÍDO / ARQUIVADO
```

---

## 18.1 Abertura

Servidor cria:

```text
Tipo: Inscrição Municipal
Assunto: Nova Inscrição
Interessado: ROBONUVEM SOLUÇÕES DIGITAIS LTDA
Setor inicial: Cadastro Municipal
```

Documentos anexados.

---

## 18.2 Cadastro Municipal

A caixa do setor recebe o processo.

Servidor:

1. recebe;
2. analisa documentos;
3. registra despacho;
4. encaminha para Tributação.

---

## 18.3 Tributação

Recebe o processo.

Servidor:

1. analisa situação fiscal;
2. registra manifestação;
3. encaminha para Obras.

---

## 18.4 Obras

Verifica requisitos relacionados ao endereço/alvará.

Registra:

```text
Parecer favorável
```

e encaminha.

---

## 18.5 Financeiro / Tributos

Consulta pendências financeiras e fiscais.

Registra resultado.

---

## 18.6 Administração

Analisa todo o histórico:

- abertura;
- documentos;
- manifestações;
- setores percorridos;
- datas;
- responsáveis.

Registra decisão final.

---

## 18.7 Conclusão

```text
Status: Concluído
Resultado: Inscrição aprovada
```

Posteriormente o processo é arquivado.

---

# 19. Fluxo configurável — fase seguinte

Depois que a tramitação manual estiver sólida, criar **Fluxos de Processo** configuráveis.

Exemplo:

```text
Tipo: Inscrição Municipal

Etapa 1 → Cadastro
Etapa 2 → Tributação
Etapa 3 → Obras
Etapa 4 → Financeiro
Etapa 5 → Administração
```

O sistema poderá sugerir automaticamente o próximo setor.

Importante:

**não é necessário implementar BPMN nesta primeira etapa.**

Começar com um motor simples de etapas configuráveis.

---

# 20. O que NÃO é necessário agora

Para colocar o módulo interno em funcionamento, deixar para fases posteriores:

- Portal do Cidadão;
- abertura pública online;
- consulta pública;
- Gov.br;
- ICP-Brasil;
- WhatsApp;
- SMS;
- OCR;
- BPMN completo;
- apensamento;
- desmembramento;
- assinatura digital avançada;
- QR Code;
- ciência eletrônica;
- workflow condicional avançado;
- BI avançado.

Esses recursos podem ser adicionados posteriormente sem impedir o uso interno inicial.

---

# 21. Ordem recomendada de implementação

## Sprint funcional 1

- [ ] Vincular `Usuario` ao `Employee`;
- [ ] Disponibilizar `employeeId`, `departmentId` e `secretariatId` no contexto autenticado;
- [ ] Ativar validação de permissão do módulo;
- [ ] Numeração sequencial;
- [ ] Departamento inicial;
- [ ] Caixa realmente filtrada por setor;
- [ ] Recebimento de processo;
- [ ] Tramitação;
- [ ] Histórico automático;
- [ ] Despacho simples;
- [ ] Criar front-end `/protocolos/acompanhamento`;
- [ ] Evoluir `/protocolos/processos/[id]` como detalhe completo de acompanhamento.

## Sprint funcional 2

- [ ] Upload de documentos;
- [ ] Pessoa Jurídica;
- [ ] CRUD de Tipos;
- [ ] CRUD de Assuntos;
- [ ] Validação Tipo × Assunto;
- [ ] Status controlados;
- [ ] Arquivamento formal;
- [ ] Reabertura com justificativa.

## Sprint funcional 3

- [ ] SLA básico;
- [ ] Auditoria;
- [ ] Notificação interna;
- [ ] E-mail;
- [ ] Dashboard;
- [ ] Relatórios básicos;
- [ ] Busca ampliada.

## Sprint funcional 4

- [ ] Fluxos padrão configuráveis por Tipo/Assunto;
- [ ] Próxima etapa sugerida;
- [ ] Responsável por etapa;
- [ ] prazo por etapa;
- [ ] documentos obrigatórios por etapa.

---

# 22. Critérios para considerar o módulo funcional

O Módulo 3 poderá ser considerado funcional internamente quando for possível executar o seguinte teste:

1. abrir um protocolo;
2. gerar número sequencial;
3. vincular interessado;
4. anexar documentos;
5. direcionar para setor;
6. processo aparecer apenas na caixa correta;
7. servidor receber o processo;
8. registrar despacho;
9. tramitar para outro setor;
10. histórico registrar automaticamente a movimentação;
11. segundo setor receber;
12. repetir quantas vezes forem necessárias;
13. controlar status;
14. acompanhar prazo;
15. concluir;
16. arquivar;
17. consultar todo o histórico;
18. identificar quem realizou cada ação.

Se esse fluxo funcionar de ponta a ponta, o CeleriFlow já terá um **Processo Administrativo Digital interno utilizável por uma prefeitura**.

---

# 23. Arquivos adicionais importantes para validação técnica

Antes de implementar alterações estruturais no banco, revisar:

- `schema.prisma`;
- `tenant-context`;
- autenticação;
- associação entre usuário e `Employee`;
- perfis e permissões;
- storage/upload;
- APIs/routes existentes;
- mecanismos de auditoria já existentes em outros módulos.

O objetivo é reutilizar a infraestrutura atual em vez de duplicar funcionalidades.

