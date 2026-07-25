# CeleriFlow - Modulo 3: Plano de Execucao

## Objetivo

Transformar Protocolos e Processos em um fluxo administrativo interno rastreavel:

```text
abertura -> setor inicial -> recebimento -> analise -> despacho/documento
-> tramitacao -> conclusao -> arquivamento
```

O portal do cidadao, assinatura digital avancada, notificacoes e workflow configuravel ficam fora da primeira entrega.

## Diagnostico confirmado

O codigo atual possui leitura de processos, documentos, despachos e movimentos, mas ainda nao executa o fluxo:

- a abertura gera numero aleatorio com ano fixo e nao define departamento inicial;
- a Caixa do Setor busca os ultimos processos de toda a prefeitura;
- status pode ser alterado diretamente em varias telas, sem regra ou historico;
- os botoes Tramitar e Adicionar Despacho nao possuem acao;
- upload e assinatura sao apenas interfaces visuais;
- somente Pessoa Fisica pode ser selecionada na abertura;
- Tipo e Assunto nao possuem departamento padrao nem parametros operacionais;
- Usuario nao esta vinculado explicitamente a Employee;
- o contexto autenticado ainda nao entrega servidor, departamento ou secretaria.

## Decisoes para a primeira versao

- Sistema unico: nao adicionar tenantId ou regras multi-tenant.
- Usuario ativo autenticado continua podendo consultar o modulo enquanto as permissoes por modulo nao forem configuradas.
- Acoes operacionais exigem Usuario vinculado a Employee ativo e com departamento ativo.
- Perfil Administrador podera ter visao ampla; a regra detalhada canView/canEdit entra junto com a configuracao de perfis e modulos.
- Status permanecem Strings controladas por constantes de aplicacao nesta fase. Isso evita uma migracao de enum em dados ja existentes.
- Quando Tipo/Assunto nao tiver departamento configurado, a abertura exigira selecao manual do setor inicial. Assim o modulo pode entrar em operacao antes da parametrizacao completa.

## Sprint 0 - Fundacao de dados e identidade

### Schema

1. Relacionar Usuario e Employee de forma opcional 1:1.
2. Expor employeeId, departmentId, secretariatId e perfil no contexto autenticado.
3. Criar parametros operacionais em ProcessType e Subject:
   - departamento inicial opcional;
   - prazo padrao;
   - prioridade padrao;
   - exige interessado;
   - permite abertura interna.
4. Evoluir Process com prazo previsto, responsavel atual opcional e metadados de conclusao/arquivamento.
5. Evoluir ProcessMovement com situacao de recebimento, usuario que recebeu, data de recebimento, prazo da etapa e responsavel de destino opcional.
6. Criar ProcessEvent para auditoria e timeline unificada de abertura, recebimento, despacho, documento, tramitacao, status, conclusao, arquivamento e reabertura.

### Migracao e cadastro inicial

1. Criar migration versionada, sem campos obrigatorios novos para registros existentes.
2. Vincular o administrador inicial a um Employee administrativo existente ou criar esse servidor explicitamente.
3. Criar departamentos de teste e um Tipo/Assunto de teste para validar o fluxo completo.

### Criterio de aceite

O contexto autenticado informa o servidor e seu departamento sem inferir a relacao por e-mail.

## Sprint 1 - Abertura e caixa operacional

1. Trocar o numero aleatorio por sequencia anual atomica:

```text
PROC-2026-000001
```

2. Criar o protocolo em transacao, validando que o Assunto pertence ao Tipo selecionado.
3. Selecionar interessado Pessoa Fisica ou Pessoa Juridica.
4. Resolver departamento inicial por Assunto, Tipo ou selecao manual obrigatoria.
5. Criar evento de abertura e gravar currentDepartmentId.
6. Filtrar a Caixa do Setor por currentDepartmentId do Employee autenticado.
7. Implementar Receber Processo, registrando responsavel e horario e alterando o status de Aguardando Recebimento para Recebido.
8. Remover os editores genericos de status das listas.

### Status iniciais

```text
Protocolado
Aguardando Recebimento
Recebido
Em Analise
Aguardando Informacao
Encaminhado
Concluido
Indeferido
Cancelado
Arquivado
Reaberto
```

### Criterio de aceite

Um protocolo novo recebe numero unico, entra somente na caixa do setor correto e pode ser recebido pelo servidor daquele setor.

## Sprint 2 - Operacao do processo

1. Implementar modal de Tramitar.
2. Executar tramitar em uma unica transacao:
   - criar ProcessMovement;
   - atualizar setor e responsavel atual;
   - definir Aguardando Recebimento;
   - registrar ProcessEvent.
3. Implementar Adicionar Despacho com tipos controlados.
4. Registrar autoria pelo Employee autenticado e departamento atual.
5. Implementar upload real de PDF, JPG e PNG, limitado a 10 MB para este modulo, usando o servico central do GED.
6. Criar Document no GED e ProcessDocument como vinculo, com evento de auditoria correspondente.
7. Disponibilizar download dos anexos e exclusao logica quando a permissao existir.

### Criterio de aceite

Um processo pode ser recebido, analisado, despachado, anexado e encaminhado para outro setor sem perda de autoria ou historico.

## Sprint 2.1 - Integracao obrigatoria com GED

Todo anexo de protocolo deve usar `Document` como registro canonico do GED.
`ProcessDocument` passa a representar somente o vinculo do documento ao processo
e sua finalidade operacional. Nenhum arquivo ou metadado de arquivo deve ser
duplicado no modulo de Protocolos.

1. Evoluir `ProcessDocument` para conter `documentId`, `employeeId`, `purpose` e `createdAt`.
2. Expor a relacao inversa em `Document`, permitindo que o GED identifique os vinculos com Processos.
3. Criar um servico central de documentos que, em uma unica operacao logica:
   - valida o arquivo;
   - envia ao Vercel Blob privado;
   - cria o `Document` no GED;
   - cria o vinculo `ProcessDocument`;
   - registra `ProcessEvent`.
4. Fazer a aba Documentos do processo ler titulo, tipo e URL por meio de `Document`.
5. Incluir esses documentos na busca e Biblioteca do GED, preservando o processo de origem como contexto de consulta.
6. Manter o documento no GED apos conclusao, arquivamento ou reabertura do processo.
7. Trocar a exclusao fisica por inativacao controlada no GED, sem apagar o historico do processo.

### Migracao de dados

Como ja existem registros em `ProcessDocument`, a mudanca sera feita em duas
etapas sem reset do banco:

1. adicionar `documentId` como opcional e manter os campos legados;
2. criar um `Document` para cada anexo existente, preencher o vinculo e validar a migracao;
3. tornar `documentId` obrigatorio e remover `title`, `fileUrl` e `documentType` de `ProcessDocument` em uma alteracao posterior.

O endpoint especifico de upload de Protocolos e transitorio. Ele nao deve se

### Criterio de aceite

Um arquivo anexado a um processo aparece tanto no detalhe do processo quanto
no GED, referencia um unico objeto no Blob e preserva autoria, finalidade e
historico de auditoria.

## Sprint 3 - Acompanhamento, encerramento e parametrizacao

1. Criar `/protocolos/acompanhamento` com indicadores e filtros internos.
2. Evoluir `/protocolos/processos/[id]` para timeline unificada baseada em ProcessEvent e ProcessMovement.
3. Implementar conclusao, arquivamento e reabertura com justificativa obrigatoria.
4. Criar CRUD de Tipos de Processo e Assuntos.
5. Implementar busca por protocolo, interessado, CPF/CNPJ, Tipo, Assunto, setor e status.
6. Exibir prazo previsto, dias restantes e atraso.

### Criterio de aceite

Um gestor consegue acompanhar onde o processo esta, quem realizou cada acao, qual e o prazo e todo o historico do processo.

## Sprint transversal - Assinaturas e documentos

Assinaturas serao implementadas como servico central reutilizavel. Protocolos
nao criara uma logica propria: solicitara uma manifestacao para uma versao
imutavel de documento ao servico compartilhado.

1. Criar a fundacao compartilhada apos o upload funcional:
   - versao de documento;
   - hash SHA-256;
   - bloqueio de versao assinada;
   - registro de manifestacao e auditoria;
   - codigo publico de verificacao, sem exposicao de conteudo.
2. Integrar o evento de assinatura a timeline de ProcessEvent.
3. Implementar assinatura interna com reautenticacao como primeira modalidade.
4. Implementar posteriormente assinatura externa por download e upload.
5. Manter GOV.BR, ICP-Brasil e provedores customizados como adapters futuros.

A fundacao de assinaturas depende da Sprint 2.1: a versao assinada sera uma
versao de `Document`, e Protocolos apenas exibira a manifestacao e o evento
correspondente.

As telas atuais de Assinaturas em Documentos e Protocolos nao devem alterar
status diretamente. Ate o servico central existir, elas sao listas
preparatorias, nao uma assinatura juridica.

## Fora da entrega inicial

- portal e consulta publica;
- assinatura digital com validade juridica;
- e-mail, WhatsApp e notificacoes internas;
- workflow por etapas configuraveis;
- BPMN;
- OCR, apensamento e desmembramento;
- relatorios e BI avancados.

## Ordem de implementacao

1. Sprint 0 completa, incluindo migration e vinculo Usuario-Employee.
2. Sprint 1 completa, validando abertura, caixa e recebimento.
3. Sprint 2 completa, validando dois departamentos no mesmo processo.
4. Sprint 2.1 integra documentos ao GED antes de qualquer assinatura.
5. Sprint 3 e parametrizacao apos o fluxo operacional estar estavel.

## Teste de aceite final

1. Abrir protocolo para Pessoa Juridica.
2. Gerar numero sequencial.
3. Direcionar ao departamento inicial.
4. Receber no departamento.
5. Anexar documento e localiza-lo no GED sem duplicar arquivo.
6. Registrar despacho.
7. Tramitar para segundo departamento.
8. Receber e despachar no segundo departamento.
9. Concluir e arquivar.
10. Consultar timeline completa com autores, setores, datas e justificativas.
