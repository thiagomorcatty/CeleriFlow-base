# CeleriFlow — Módulo 5: Atendimento ao Cidadão e Ouvidoria
## Plano de ajustes e correções para deixar o módulo atual funcional

**Objetivo:** transformar o Módulo 5 existente em uma ferramenta interna de gestão das demandas recebidas pela prefeitura, permitindo registrar, classificar, encaminhar, acompanhar e concluir atendimentos, além de tratar manifestações de Ouvidoria com controle de sigilo.

O foco desta fase **não é criar um portal de atendimento ao cidadão, chatbot, call center ou omnichannel**.

O foco é:

> **dar à prefeitura controle sobre tudo o que chega do cidadão e sobre o que foi feito internamente para resolver cada demanda.**

---

# 1. Papel do Módulo 5 no CeleriFlow

O módulo deve ser a porta de entrada gerencial das demandas que chegam à prefeitura.

Exemplos:

- cidadão compareceu presencialmente;
- cidadão telefonou;
- cidadão enviou e-mail;
- servidor recebeu uma mensagem institucional;
- cidadão registrou reclamação;
- denúncia foi recebida;
- cidadão pediu informação;
- cidadão solicitou serviço;
- empresa entrou em contato;
- servidor recebeu sugestão ou elogio.

O sistema registra essa demanda e decide:

```text
Demanda recebida
       ↓
Pode ser resolvida como atendimento?
       ↓
     SIM → Ticket → Resolver → Concluir
       ↓
     NÃO
       ↓
Precisa formalização administrativa?
       ↓
     SIM → Gerar Protocolo / Processo
```

Para manifestações de Ouvidoria:

```text
Manifestação
     ↓
Ouvidoria
     ↓
Análise
     ↓
Encaminhamento / Apuração
     ↓
Resposta / Conclusão
```

---

# 2. Diferença entre Atendimento, Processo e Ouvidoria

## Atendimento — `Ticket`

É o registro de uma demanda que pode ser tratada administrativamente sem necessariamente gerar um processo formal.

Exemplos:

- buraco na rua;
- iluminação apagada;
- dúvida sobre horário;
- solicitação de informação simples;
- orientação sobre documentação;
- comunicação de problema em equipamento público.

---

## Processo / Protocolo — `Process`

É a formalização administrativa quando a demanda exige:

- tramitação entre setores;
- decisão formal;
- documentos;
- despacho;
- parecer;
- prazo administrativo;
- conclusão formal;
- arquivamento.

Exemplos:

- revisão de IPTU;
- inscrição municipal;
- defesa administrativa;
- pedido de licença;
- recurso;
- alvará.

---

## Ouvidoria — `Ombudsman`

É uma manifestação institucional com tratamento próprio.

Tipos iniciais:

- Denúncia;
- Reclamação;
- Sugestão;
- Elogio.

Pode exigir:

- anonimato;
- confidencialidade;
- controle de acesso;
- encaminhamento;
- apuração;
- resposta;
- histórico.

---

# 3. O que já existe no código

## Atendimento

O código atual já possui:

- painel básico;
- últimos chamados;
- criação de novo chamado;
- número do chamado;
- assunto;
- descrição;
- prioridade;
- canal;
- pessoa física;
- atendimento anônimo;
- integração com `Person`;
- alteração de status;
- modelo `Ticket`;
- vínculo previsto com `Company`;
- vínculo previsto com `Department`;
- vínculo previsto com `Employee`;
- entidade `TicketInteraction`;
- entidade `SatisfactionSurvey`.

---

## Ouvidoria

Já existe:

- listagem de manifestações;
- filtro por tipo;
- busca básica;
- visualização da manifestação;
- tipos Denúncia/Reclamação/Sugestão/Elogio;
- anonimato;
- confidencialidade;
- status;
- vínculo com pessoa;
- vínculo previsto com departamento.

---

# 4. Situação atual resumida

| Funcionalidade | Situação |
|---|---|
| Novo Atendimento | ✅ |
| Pessoa Física | ✅ |
| Pessoa Jurídica | 🟡 banco |
| Atendimento anônimo | ✅ |
| Canais | ✅ uso / 🟡 parametrização |
| Prioridade | ✅ |
| Alteração de status | ✅ |
| Central de Demandas | 🟡 painel limitado |
| Busca geral | 🔴 |
| Departamento responsável | 🟡 banco |
| Servidor responsável | 🟡 banco |
| Encaminhamento | 🔴 |
| Histórico/interações | 🟡 banco |
| Tela detalhada | 🔴 |
| Prazo/SLA | 🔴 |
| Solução registrada | 🔴 |
| Anexos | 🔴 |
| Gerar Protocolo | 🔴 |
| Acompanhar Processo relacionado | 🔴 |
| Ouvidoria — consulta | ✅ |
| Ouvidoria — criação | 🔴 |
| Ouvidoria — encaminhamento | 🔴 |
| Sigilo efetivo | 🔴 |
| Auditoria | 🔴 |
| Relatórios | 🔴 |
| Satisfação | 🟡 banco |

---

# 5. PRIORIDADE 0 — Relação `Usuario ↔ Employee`

Este ajuste é transversal aos Módulos 3, 4 e 5.

O sistema autentica:

```text
Usuario
```

mas o atendimento possui:

```text
assigneeId → Employee
```

e as interações também apontam para:

```text
employeeId
```

Precisamos saber com segurança:

```text
Usuário logado
      ↓
Employee
      ↓
Department
      ↓
Secretariat
```

## Implementar

Criar relação explícita:

```text
Usuario ↔ Employee
```

Não depender apenas de e-mail.

Isso permitirá:

- identificar quem assumiu o chamado;
- identificar setor;
- criar fila do setor;
- registrar interações;
- encaminhar;
- auditar;
- controlar sigilo;
- identificar responsável atual.

---

# 6. PRIORIDADE 0 — Corrigir numeração do Atendimento

## Situação atual

O código gera algo semelhante a:

```text
TKT-2026-4837
```

com número aleatório e ano fixo.

## Implementar

Reutilizar:

```text
lib/sequence.ts
```

já existente no projeto.

Padrão sugerido:

```text
ATD-2026-000001
ATD-2026-000002
ATD-2026-000003
```

Para Ouvidoria:

```text
OUV-2026-000001
```

## Requisitos

- ano atual automático;
- sequência transacional;
- sem duplicação;
- sistema único;
- não criar lógica multi-tenant.

---

# 7. PRIORIDADE 0 — Criar Central de Demandas

Hoje o painel exibe apenas os últimos chamados.

Precisamos de uma tela operacional própria.

## Rota sugerida

```text
/atendimento/central
```

ou:

```text
/atendimento/chamados
```

## Objetivo

Responder:

> **Quais demandas estão abertas na prefeitura e qual a situação de cada uma?**

---

# 7.1 Tabela

Colunas:

| Coluna | Conteúdo |
|---|---|
| Número | ATD-2026-000125 |
| Cidadão/Empresa | João Silva |
| Assunto | Buraco na via |
| Canal | Telefone |
| Setor | Obras |
| Responsável | Carlos Souza |
| Prioridade | Alta |
| Status | Em Atendimento |
| Prazo | 28/07/2026 |
| Última atualização | 25/07 14:35 |
| Ação | Visualizar |

---

# 7.2 Filtros

- número;
- cidadão;
- CPF;
- empresa;
- CNPJ;
- assunto;
- canal;
- setor;
- responsável;
- prioridade;
- status;
- período;
- atrasado;
- sem movimentação há X dias;
- com processo relacionado.

---

# 7.3 Busca

A busca deve ocorrer no banco.

Não carregar apenas 20 registros e filtrar no navegador.

Implementar:

- paginação;
- ordenação;
- busca server-side.

---

# 8. PRIORIDADE 0 — Criar tela detalhada do Atendimento

## Rota sugerida

```text
/atendimento/chamados/[id]
```

Essa deve ser a tela principal de trabalho de um chamado.

---

# 8.1 Cabeçalho

Exibir:

- número;
- status;
- prioridade;
- data/hora de abertura;
- canal;
- setor atual;
- responsável;
- prazo.

---

# 8.2 Solicitante

Exibir:

- pessoa física;
- pessoa jurídica;
- anônimo;
- CPF/CNPJ;
- telefone;
- contatos disponíveis.

---

# 8.3 Demanda

- assunto;
- descrição;
- classificação;
- anexos;
- protocolo/processo relacionado.

---

# 8.4 Ações

- assumir;
- encaminhar;
- transferir responsável;
- registrar interação;
- anexar documento;
- solicitar informação;
- alterar prioridade;
- gerar protocolo;
- concluir;
- reabrir.

---

# 9. PRIORIDADE 0 — Pessoa Jurídica

O `Ticket` já possui:

```text
companyId
```

## Implementar no formulário

```text
Solicitante:
( ) Pessoa Física
( ) Pessoa Jurídica
( ) Anônimo
```

### Pessoa Física

buscar `Person`.

### Pessoa Jurídica

buscar `Company`.

### Anônimo

não exigir vínculo.

---

# 10. PRIORIDADE 0 — Setor responsável

O modelo já possui:

```text
Ticket.departmentId
```

## Implementar

Na abertura ou triagem:

- selecionar setor;
- ou usar setor padrão conforme assunto.

Exemplo:

```text
Assunto: Iluminação Pública
Setor padrão: Obras / Iluminação
```

Após encaminhamento:

```text
Ticket.departmentId = destino
```

---

# 11. PRIORIDADE 0 — Responsável pelo atendimento

O modelo já possui:

```text
Ticket.assigneeId
```

## Implementar ações

### Assumir

Servidor logado:

```text
assigneeId = meu Employee.id
```

Registrar:

- servidor;
- data;
- interação/histórico.

### Atribuir

Gestor pode escolher outro servidor do setor.

---

# 12. PRIORIDADE 0 — Fila do Setor

## Rota sugerida

```text
/atendimento/fila
```

Objetivo:

> **O que o meu setor precisa atender?**

Usar:

```text
Employee.departmentId
→ Ticket.departmentId
```

Mostrar somente chamados do setor, salvo perfis gerenciais.

## Filtros rápidos

```text
Novos
Em Atendimento
Aguardando Informação
Próximos do Prazo
Atrasados
```

---

# 13. PRIORIDADE 0 — Histórico de Atendimento

O banco já possui:

```text
TicketInteraction
```

Não criar uma nova estrutura para mensagens/histórico simples.

## Implementar front-end

Exemplo:

```text
25/07/2026 09:32
Atendimento registrado por Maria Souza.

25/07/2026 09:42
Maria Souza
Encaminhado para Obras.

25/07/2026 10:04
Carlos Silva
Chamado assumido.

25/07/2026 10:32
Carlos Silva
Equipe de manutenção acionada.

25/07/2026 15:20
Carlos Silva
Reparo concluído.
```

---

# 13.1 Tipos de interação

Adicionar um campo de tipo, se necessário:

```text
Registro
Comentário
Encaminhamento
Assunção
Resposta
Solicitação de Informação
Solução
Conclusão
Reabertura
```

O campo atual:

```text
isInternal
```

pode continuar sendo usado para preparar futura separação entre informação interna e informação disponibilizável ao cidadão.

Nesta fase, toda interface é interna.

---

# 14. PRIORIDADE 0 — Encaminhamento com histórico

Não basta alterar:

```text
Ticket.departmentId
```

porque perderíamos o caminho percorrido.

## Recomendação

Criar:

```text
TicketMovement
```

Exemplo conceitual:

```text
id
ticketId
fromDepartmentId
toDepartmentId
employeeId
reason
createdAt
```

Opcionalmente:

```text
fromAssigneeId
toAssigneeId
```

---

# 14.1 Fluxo de encaminhamento

```text
Atendimento
→ Obras
→ Iluminação
→ Atendimento / Conclusão
```

Cada mudança gera:

- origem;
- destino;
- responsável;
- data/hora;
- motivo.

---

# 15. PRIORIDADE 0 — Status controlados

Hoje os status básicos são:

```text
Aberto
Em Atendimento
Resolvido
```

É pouco.

## Primeira versão

Usar:

```text
Aberto
Encaminhado
Aguardando Recebimento
Em Atendimento
Aguardando Informação
Resolvido
Concluído
Cancelado
Reaberto
```

Evitar textos arbitrários.

---

# 16. PRIORIDADE 0 — Registrar solução

Hoje “Concluir” apenas muda status.

Precisamos registrar:

```text
solution
resolvedAt
resolvedBy
```

ou uma interação de tipo:

```text
Solução
```

mais campos de conclusão.

## Tela

Ao concluir:

```text
Solução / Providência adotada:
[________________________________]

Data:
automática

Responsável:
automático
```

Não permitir conclusão silenciosa sem histórico.

---

# 17. PRIORIDADE 1 — Prazo / SLA básico

Implementar:

```text
dueAt
resolvedAt
```

## Situações

```text
🟢 No prazo
🟡 Próximo do prazo
🔴 Atrasado
⚪ Concluído
```

Não é necessário motor complexo inicialmente.

---

# 17.1 Prazo padrão por assunto

Quando criarmos assuntos parametrizados:

```text
Iluminação Pública → 3 dias
Buraco → 5 dias
Informação → 2 dias
```

Na abertura:

```text
dueAt = openedAt + prazo padrão
```

Permitir ajuste por usuário autorizado.

---

# 18. PRIORIDADE 1 — Assuntos e classificação

Hoje:

```text
subject
```

é texto.

Isso limita relatórios e encaminhamento automático.

## Criar entidade

Exemplo:

```text
ServiceSubject
```

ou:

```text
AttendanceSubject
```

Campos:

```text
id
name
description
defaultDepartmentId
defaultPriority
defaultDueDays
isActive
```

## Exemplos

- Iluminação Pública;
- Buraco em Via;
- Limpeza Urbana;
- IPTU;
- Alvará;
- Transporte Escolar;
- Informação Geral.

---

# 19. PRIORIDADE 1 — Canais de Atendimento

O modelo:

```text
SupportChannel
```

já existe.

Criar interface de configuração:

```text
/atendimento/configuracoes
```

ou dentro de:

```text
/atendimento/canais
```

Permitir:

- criar;
- editar;
- ativar;
- inativar;
- ordenar.

Exemplos:

- Balcão Presencial;
- Telefone;
- E-mail;
- WhatsApp institucional;
- Correspondência;
- Interno.

Não implementar integração automática com WhatsApp agora.

Registrar o canal é suficiente.

---

# 20. PRIORIDADE 1 — Integração Atendimento → Processo

Essa é uma integração obrigatória com o Módulo 3.

## Regra

Nem todo Ticket vira Processo.

Criar botão:

```text
Gerar Protocolo
```

somente quando a demanda exigir formalização.

---

# 20.1 Banco

Adicionar relação entre:

```text
Ticket
↔
Process
```

Opção simples:

```text
Ticket.processId
```

Se futuramente um atendimento puder gerar mais de um processo, usar tabela de vínculo.

Nesta fase, uma relação 0..1 é suficiente se confirmada pelo uso.

---

# 20.2 Ao gerar Protocolo

Reaproveitar dados:

```text
Ticket.personId / companyId
→ interessado

Ticket.subject
→ descrição/assunto inicial

Ticket.description
→ descrição

Ticket.priority
→ prioridade

Ticket.departmentId
→ setor inicial, quando adequado
```

Criar o `Process` usando o serviço do Módulo 3.

Nunca duplicar regra de numeração.

---

# 20.3 Após criação

No Ticket mostrar:

```text
Protocolo relacionado
PROC-2026-000481

Status:
Em Análise

Setor atual:
Tributação

[Acompanhar Processo]
```

A tela abre:

```text
/protocolos/processos/[id]
```

---

# 20.4 Regra de responsabilidade

Após gerar processo, o Ticket pode:

### Opção recomendada

continuar aberto até o setor de Atendimento registrar que a demanda foi formalizada.

Status:

```text
Encaminhado a Processo
```

Depois pode ser concluído administrativamente.

O andamento formal passa a ser responsabilidade do Módulo 3.

---

# 21. PRIORIDADE 1 — Integração com GED

Todos os anexos devem utilizar o Módulo 4.

Não criar:

```text
Ticket.fileUrl
```

ou storage paralelo.

## Arquitetura

```text
Ticket
  ↓
TicketDocument
  ↓
Document
  ↓
Vercel Blob privado
```

Para Ouvidoria:

```text
Ombudsman
  ↓
OmbudsmanDocument
  ↓
Document
```

---

# 21.1 Tabelas de vínculo

Exemplo:

```text
TicketDocument
├── ticketId
├── documentId
├── employeeId
├── purpose
└── createdAt
```

e:

```text
OmbudsmanDocument
├── ombudsmanId
├── documentId
├── employeeId
├── purpose
└── createdAt
```

O arquivo oficial continua sendo:

```text
Document
```

---

# 21.2 Casos de uso

### Atendimento

- foto do buraco;
- documento apresentado pelo cidadão;
- comprovante;
- imagem;
- PDF recebido por e-mail.

### Ouvidoria

- foto;
- vídeo, se o storage aceitar;
- documento;
- evidência;
- declaração.

Respeitar sigilo da manifestação.

---

# 22. PRIORIDADE 0 — Ouvidoria: criar manifestação

Hoje existe consulta, mas não existe abertura no módulo.

Criar:

```text
/atendimento/ouvidoria/nova
```

## Campos

- tipo;
- assunto;
- descrição;
- anônimo?;
- confidencial?;
- cidadão, quando identificado;
- canal;
- prioridade, se necessário;
- setor inicial;
- anexos.

---

# 22.1 Tipos iniciais

```text
Denúncia
Reclamação
Sugestão
Elogio
```

Não criar telas separadas.

Usar filtros.

---

# 23. PRIORIDADE 0 — Ouvidoria: sigilo real

Essa é uma correção de segurança obrigatória.

Hoje:

```text
isConfidential
```

existe no banco, mas não há autorização efetiva.

## Implementar regras

### Manifestação comum

Acesso conforme escopo do módulo/setor.

### Confidencial

Somente:

- Ouvidoria;
- perfis autorizados;
- usuários explicitamente permitidos, quando necessário.

### Anônima

Não armazenar solicitante quando não informado.

### Denúncia sigilosa

Não expor identidade do denunciante ao setor investigado.

---

# 23.1 Separar identidade da manifestação quando necessário

Para casos sensíveis, considerar modelagem em que dados do denunciante tenham acesso mais restrito que o conteúdo da manifestação.

Exemplo:

```text
Ombudsman
→ conteúdo

OmbudsmanIdentity
→ dados identificadores
→ acesso exclusivo da Ouvidoria
```

Isso pode ser adotado se o modelo atual não conseguir garantir o isolamento.

---

# 24. PRIORIDADE 0 — Ouvidoria: encaminhamento e histórico

A Ouvidoria também precisa tramitar.

Não copiar o processo completo do Módulo 3.

Criar um fluxo mais simples:

```text
Recebida
↓
Em Triagem
↓
Encaminhada
↓
Em Apuração
↓
Aguardando Resposta
↓
Concluída
```

## Histórico

Registrar:

- quem recebeu;
- encaminhamento;
- setor;
- responsável;
- resposta;
- mudança de status;
- conclusão.

---

# 25. PRIORIDADE 1 — Gerar Processo a partir da Ouvidoria

Não toda manifestação precisa gerar processo.

Para casos que exigem apuração formal:

```text
[Gerar Processo]
```

Criar vínculo:

```text
Ombudsman
↔
Process
```

## Segurança

O processo formal não deve automaticamente copiar dados sigilosos que o setor de destino não pode visualizar.

A integração deve escolher explicitamente quais informações são transferidas.

---

# 26. PRIORIDADE 1 — Resposta e conclusão da Ouvidoria

Ao concluir, registrar:

- resposta;
- providência;
- servidor responsável;
- data;
- status final.

Para denúncia:

- não obrigar exposição de detalhes sensíveis na resposta;
- manter registro interno completo.

---

# 27. PRIORIDADE 1 — Corrigir card “Denúncias Pendentes”

Hoje o dashboard conta todas as manifestações:

```text
status = Recebida
```

mas chama:

```text
Denúncias Pendentes
```

## Corrigir

### Opção recomendada

Renomear:

```text
Manifestações Pendentes
```

### Ou

filtrar também:

```text
type = Denúncia
```

---

# 28. PRIORIDADE 1 — Auditoria

Criar auditoria para ações críticas.

## Atendimento

- criação;
- visualização;
- mudança de setor;
- atribuição;
- interação;
- mudança de status;
- geração de protocolo;
- conclusão;
- reabertura;
- anexos.

## Ouvidoria

Além das anteriores:

- acesso à manifestação;
- acesso à identidade;
- mudança de confidencialidade;
- encaminhamento;
- visualização de denúncia sigilosa.

---

# 28.1 Campos mínimos

```text
userId
employeeId
entityType
entityId
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

# 29. PRIORIDADE 2 — Dashboard gerencial

Depois que os fluxos estiverem funcionando.

## Atendimento

Cards:

- abertos hoje;
- em atendimento;
- aguardando informação;
- resolvidos;
- atrasados;
- por setor;
- por canal;
- por prioridade.

## Ouvidoria

- manifestações recebidas;
- denúncias;
- reclamações;
- sugestões;
- elogios;
- em apuração;
- atrasadas;
- concluídas.

---

# 30. PRIORIDADE 2 — Relatórios básicos

## Atendimento

1. atendimentos por período;
2. por canal;
3. por assunto;
4. por setor;
5. por responsável;
6. por status;
7. atrasados;
8. resolvidos;
9. tempo médio.

## Ouvidoria

1. manifestações por tipo;
2. por período;
3. por setor;
4. por status;
5. tempo médio;
6. denúncias em aberto.

Não expor dados pessoais desnecessários nos relatórios.

---

# 31. Pesquisa de satisfação — deixar para depois

O banco já possui:

```text
SatisfactionSurvey
```

Mas não é necessário para estabilizar o módulo.

Fase posterior:

- nota 1–5;
- comentário;
- indicador médio;
- satisfação por setor.

---

# 32. Funcionalidades explicitamente adiadas

Estas funcionalidades existiam no planejamento original, mas não precisam ser implementadas agora:

## Portal do Cidadão

- abertura online;
- área “meus atendimentos”;
- consulta externa.

## WhatsApp integrado

- mensagens automáticas;
- integração via API;
- bot.

## Chatbot / IA

- triagem automática;
- respostas automáticas;
- análise de sentimento.

## Omnichannel

- unificação automática de múltiplos canais.

## Agendamento

- reservas;
- agenda;
- confirmação.

## Painel de senhas

- retirada de senha;
- guichê;
- fila física.

## NPS / satisfação avançada

- pesquisas automáticas;
- campanhas.

## Redes sociais

- captura de mensagens e comentários.

Esses recursos podem ser avaliados depois que o núcleo interno estiver funcionando.

---

# 33. Menu recomendado

Manter simples:

```text
Atendimento e Ouvidoria
│
├── Painel
├── Novo Atendimento
├── Central de Demandas
├── Fila do Setor
├── Ouvidoria
├── Canais e Assuntos
├── Relatórios
└── Auditoria
```

Dentro de Ouvidoria:

```text
Todas
Denúncias
Reclamações
Sugestões
Elogios
```

---

# 34. Integrações com Módulos 2, 3 e 4

## Módulo 2 — Cadastros

```text
Ticket
├── Person
└── Company
```

Ouvidoria identificada também reutiliza Cadastro Geral.

---

## Módulo 3 — Processos e Protocolos

```text
Ticket
↓
Gerar Protocolo
↓
Process
```

e:

```text
Ombudsman
↓
Gerar Processo
↓
Process
```

somente quando formalização for necessária.

---

## Módulo 4 — GED

```text
Ticket / Ombudsman
↓
tabela de vínculo
↓
Document
↓
Blob privado
```

Nunca criar arquivos paralelos.

O Módulo 4 já foi definido como fonte única documental do CeleriFlow. fileciteturn10file9

---

# 35. Fluxo de exemplo — demanda simples

Cidadão telefona:

> Há um poste apagado na Rua das Flores.

Servidor cria:

```text
ATD-2026-000125
```

Dados:

```text
Canal: Telefone
Pessoa: João Silva
Assunto: Iluminação Pública
Prioridade: Normal
Setor: Obras / Iluminação
```

Fluxo:

```text
Atendimento
↓
Fila de Iluminação
↓
Carlos assume
↓
Registra vistoria
↓
Registra reparo
↓
Solução
↓
Concluído
```

Não gera Processo.

---

# 36. Fluxo de exemplo — demanda que vira Processo

Cidadão comparece:

> Quero contestar o lançamento do IPTU.

Cria:

```text
ATD-2026-000126
```

O servidor identifica que exige formalização.

Clica:

```text
Gerar Protocolo
```

Sistema cria:

```text
PROC-2026-000481
```

e relaciona:

```text
ATD-2026-000126
        ↓
PROC-2026-000481
        ↓
Tributação
```

Na Central de Atendimento:

```text
Protocolo relacionado:
PROC-2026-000481

Status:
Em Análise

Setor:
Tributação
```

A tramitação passa a ocorrer no Módulo 3.

A arquitetura do Módulo 3 já prevê a Caixa do Setor e acompanhamento interno do processo. fileciteturn10file8

---

# 37. Fluxo de exemplo — Ouvidoria

Cidadão registra:

```text
Tipo: Denúncia
Anonimato: Sim
Confidencial: Sim
Assunto: Descarte irregular
```

Sistema gera:

```text
OUV-2026-000084
```

Fluxo:

```text
Ouvidoria
↓
Triagem
↓
Encaminhamento controlado
↓
Meio Ambiente
↓
Apuração
↓
Resposta à Ouvidoria
↓
Conclusão
```

O setor de Meio Ambiente não recebe identidade do denunciante se não tiver autorização.

Se exigir procedimento formal:

```text
Ouvidoria
↓
Gerar Processo
↓
Módulo 3
```

somente com os dados permitidos.

---

# 38. Ordem recomendada de implementação

## Sprint 1 — Estrutura operacional

- [ ] relação `Usuario ↔ Employee`;
- [ ] numeração sequencial `ATD` e `OUV`;
- [ ] Central de Demandas;
- [ ] tela detalhada do Ticket;
- [ ] Pessoa Jurídica;
- [ ] setor responsável;
- [ ] responsável;
- [ ] Fila do Setor;
- [ ] histórico usando `TicketInteraction`;
- [ ] status controlados;
- [ ] registrar solução.

---

## Sprint 2 — Encaminhamento e parametrização

- [ ] `TicketMovement`;
- [ ] encaminhamento entre setores;
- [ ] receber/assumir;
- [ ] Assuntos parametrizados;
- [ ] prazo padrão por assunto;
- [ ] SLA básico;
- [ ] CRUD de canais;
- [ ] busca/paginação server-side.

---

## Sprint 3 — Integrações

- [ ] Ticket → Process;
- [ ] botão Gerar Protocolo;
- [ ] acompanhar Processo relacionado;
- [ ] Ticket → GED;
- [ ] anexos;
- [ ] Ombudsman → GED;
- [ ] auditoria básica.

---

## Sprint 4 — Ouvidoria

- [ ] Nova Manifestação;
- [ ] status próprios;
- [ ] encaminhamento;
- [ ] histórico;
- [ ] sigilo real;
- [ ] controle de identidade;
- [ ] conclusão/resposta;
- [ ] Ouvidoria → Process quando necessário;
- [ ] corrigir indicador de manifestações.

---

## Sprint 5 — Gestão

- [ ] dashboard ampliado;
- [ ] relatórios básicos;
- [ ] indicadores de prazo;
- [ ] produtividade;
- [ ] filtros gerenciais.

---

# 39. Critérios para considerar o Módulo 5 funcional

## Atendimento

O teste completo deve permitir:

1. servidor abrir atendimento;
2. gerar número sequencial;
3. localizar pessoa ou empresa;
4. registrar canal;
5. classificar assunto;
6. direcionar para setor;
7. chamado aparecer na fila correta;
8. servidor assumir;
9. registrar interações;
10. encaminhar para outro setor mantendo histórico;
11. anexar documento usando GED;
12. controlar prazo;
13. registrar solução;
14. concluir;
15. reabrir com histórico;
16. gerar Processo quando necessário;
17. acompanhar Processo relacionado;
18. auditar ações críticas.

---

## Ouvidoria

Deve permitir:

1. registrar manifestação;
2. escolher tipo;
3. registrar anônima ou identificada;
4. marcar confidencialidade;
5. anexar documento via GED;
6. encaminhar;
7. controlar acesso;
8. registrar histórico;
9. apurar;
10. responder;
11. concluir;
12. gerar Processo formal quando necessário;
13. preservar sigilo;
14. auditar acessos.

---

# 40. Resultado esperado

Ao final:

```text
                CIDADÃO
                   ↓
              MÓDULO 5
        Atendimento / Ouvidoria
                   │
       ┌───────────┴───────────┐
       │                       │
  Demanda simples       Demanda formal
       │                       │
       ↓                       ↓
     Ticket                 MÓDULO 3
       │                    Processo
       │                       │
       └───────────┬───────────┘
                   │
                   ↓
                MÓDULO 4
                   GED
```

O Módulo 5 passa a responder para a prefeitura:

> **Quem procurou a prefeitura?**

> **Por qual motivo?**

> **Por qual canal?**

> **Qual setor ficou responsável?**

> **Quem está atendendo?**

> **O que já foi feito?**

> **Está atrasado?**

> **Foi resolvido?**

> **Virou protocolo?**

> **Onde está o processo?**

> **Há documentos vinculados?**

> **Quem acessou ou alterou?**

Essa é a primeira versão funcional da **gestão municipal do atendimento e da Ouvidoria**.
