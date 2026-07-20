# Handoff: Multi-instancia CeleriFlow

## Objetivo do produto

Transformar o CeleriFlow em uma plataforma multi-instancia para prefeituras.

- Um unico repositorio e uma unica linha de produto.
- Um banco PostgreSQL municipal isolado por prefeitura.
- Um banco PostgreSQL de plataforma para tenants, dominios, contas e modulos contratados.
- Um subdominio por prefeitura: `{cidade}.app.celeriflow.com.br`.
- Usuarios municipais pertencem a apenas uma prefeitura.
- Apenas `PLATFORM_ADMIN` pode atuar entre tenants para manutencao e integracoes.
- O tenant inicial e permanente e chama-se `demo`; ele nao e homologacao.
- O DEMO possui os 21 modulos habilitados. Clientes reais terao apenas modulos contratados.
- Manter Prisma. Nao migrar para Drizzle.

O usuario pediu foco em banco, integracoes e backend. Nao alterar telas ou UX sem pedir antes. Quando uma mudanca de frontend for indispensavel, descrever exatamente o contrato/API que o usuario deve integrar.

## Estado de infraestrutura confirmado

Concluido:

- Neon Platform criado e schema de plataforma aplicado com `npx prisma db push --config prisma.platform.config.ts`.
- O banco municipal antigo e o banco do tenant `demo`.
- Tenant `demo` existe no banco Platform, ativo, com dominio `demo.app.celeriflow.com.br`.
- DEMO possui 21 modulos ativos. A verificacao retornou um dominio e 21 modulos habilitados.
- Firebase atual continua sendo usado. Nao criar outro projeto Firebase.
- `admin@email.com` esta cadastrado no Firebase e no banco Platform como `PLATFORM_ADMIN`, sem `tenantId`.
- `admindemo@email.com` esta cadastrado no Firebase e no banco Platform como `TENANT_ADMIN` do tenant `demo`.
- Dominios de producao foram cadastrados no Firebase Authentication. O usuario nao quer `demo.localhost`.
- O Blob Platform foi criado e o token foi validado com `@vercel/blob`.

Variaveis existentes localmente. Nao revelar, mover, substituir ou colocar valores em documentos/commits:

```dotenv
DATABASE_URL=
PLATFORM_DATABASE_URL=
PLATFORM_ENCRYPTION_KEY=
Platform_BLOB_READ_WRITE_TOKEN=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
NEXT_PUBLIC_FIREBASE_...
```

`Platform_BLOB_READ_WRITE_TOKEN` possui exatamente essa grafia. Em ambientes Linux da Vercel, nomes de variavel diferenciam maiusculas e minusculas. Usar esse mesmo nome na Vercel para Production, Preview e Development.

Ainda confirmar no painel Vercel:

- As quatro variaveis acima estao cadastradas nos ambientes necessarios.
- `app.celeriflow.com.br` continua configurado.
- O wildcard `*.app.celeriflow.com.br` e `demo.app.celeriflow.com.br` apontam para o projeto correto, com DNS/verificacao concluida.

## Commits e worktree

Os commits relevantes da arquitetura sao:

```text
094183f feat: implement multi-tenant infrastructure with blob storage integration and management dashboards
12d7131 feat: implement multi-tenant platform architecture with secure session management and encrypted database routing
```

No momento deste handoff, somente este documento esta sem commit. As mudancas de Blob, proxy, TenantContext e Administracao foram incluidas no commit `094183f`. Nao reverta trabalho existente. Antes de editar ou commitar, inspecione `git status`, `git diff` e `git log --oneline -10`.

Nao faca commit sem pedido explicito do usuario. Se o usuario pedir commit, rode `npm run build` antes, conforme `AGENTS.md`.

## Arquitetura implementada

### Banco Platform

Arquivos:

- `prisma/platform.prisma`
- `prisma.platform.config.ts`
- `src/lib/platform/prisma.ts`

Modelos principais:

- `PlatformTenant`: tenant, status e URL do banco municipal cifrada.
- `PlatformTenantDomain`: host unico para tenant.
- `PlatformUser`: Firebase UID, e-mail, papel, tenant opcional e status.
- `PlatformModule`: catalogo global de 21 modulos.
- `PlatformTenantModule`: modulos contratados/habilitados por tenant.
- `PlatformAuditLog`: auditoria de operacoes de plataforma.

As URLs dos bancos municipais sao cifradas com AES-256-GCM antes de serem salvas. A chave vem de `PLATFORM_ENCRYPTION_KEY`. Nunca persistir URL em texto puro no Platform.

### Resolucao de tenant e banco dinamico

Arquivo central: `src/lib/platform/tenant-context.ts`.

Fluxo de `getCurrentTenantContext()`:

1. Le host atual via `next/headers`.
2. Le cookie `celeriflow_session`.
3. Valida session cookie Firebase com `firebase-admin` e revogacao.
4. Localiza dominio e tenant no banco Platform.
5. Localiza `PlatformUser` pelo Firebase UID.
6. Rejeita usuario inativo, tenant suspenso, dominio inexistente ou usuario associado a outra prefeitura.
7. Decifra a URL do banco municipal e devolve o Prisma conectado exclusivamente a esse banco.

`getTenantContextForModule(code)` tambem bloqueia modulo nao contratado para usuarios municipais. `PLATFORM_ADMIN` pode acessar para suporte/manutencao.

O cache de Prisma por banco e um LRU simples de ate 20 clients por instancia Node. Nao substituir por Prisma global unico, pois isso anularia o isolamento entre prefeituras.

### Dominios

Arquivo: `src/proxy.ts`.

Ele reescreve tanto `app.celeriflow.com.br` quanto qualquer host em `*.app.celeriflow.com.br` para `/app-domain/...`. A resolucao do tenant e feita apenas no backend; dominio nao e autorizacao.

### Sessao server-side

Arquivos:

- `src/lib/platform/session.ts`
- `src/app/api/auth/session/route.ts`
- `src/app/api/auth/session/logout/route.ts`

Depois de autenticar com Firebase no browser, o frontend deve enviar o Firebase ID token para `POST /api/auth/session`. A rota valida tenant + usuario e seta cookie `httpOnly`, `secure` em producao, `sameSite=lax` e host-only.

O logout deve chamar `POST /api/auth/session/logout` antes de `signOut(auth)`.

### Arquivos privados

Arquivos:

- `src/lib/platform/blob.ts`
- `src/app/api/upload/route.ts`
- `src/app/api/download/route.ts`

O fluxo usa **somente** o Blob Platform, sem fallback para o Blob antigo:

- Upload exige sessao/tenant valido.
- Arquivo novo vai para `tenants/{tenantId}/documents/{uuid}-{nome-sanitizado}`.
- Tamanho maximo atual: 20 MB.
- Download exige sessao/tenant valido e confirma que o pathname pertence ao prefixo daquele tenant.
- URL de outro tenant retorna 404; nao entregar arquivos por URL direta.

Arquivos existentes no Blob antigo nao sao suportados pelo novo fluxo, por decisao explicita do usuario. Nao reintroduzir fallback temporario.

## Modulo ja migrado: Administracao

As paginas e Server Actions de `src/app/app-domain/administracao/` foram migradas para `getTenantContextForModule("ADMINISTRACAO")`.

Inclui instituicao, secretarias, departamentos, unidades, cargos, servidores, demandas e calendario. `src/app/app-domain/layout.tsx` tambem obtem a instituicao pelo tenant opcional, evitando exibir dados do banco default no cabecalho.

Padrao obrigatorio para os demais modulos:

```ts
import { getTenantContextForModule } from "@/lib/platform/tenant-context";

export default async function Page() {
  const { prisma } = await getTenantContextForModule("CODIGO_DO_MODULO");
  const records = await prisma.model.findMany();
  // ...
}
```

Para Server Actions usadas por componentes client, preserve o contrato atual de retorno. Se a action ja retorna `{ error }`, obtenha o contexto dentro do `try` e retorne erro de UI conforme o padrao existente. Para actions usadas por `<form action={...}>`, manter `void`/`Promise<void>` e propagar erro. Leia `AGENTS.md` antes de alterar qualquer action exportada e verifique todos os consumidores.

Nao usar o Prisma global de `@/lib/prisma` em paginas, actions ou Route Handlers municipais migrados.

## Bloqueio atual: frontend de login

O usuario assumiu essa parte. Antes de testar uma pagina migrada em producao, ele precisa alterar:

`src/app/app-domain/(auth)/login/page.tsx`

Fluxo esperado, apos `signInWithEmailAndPassword`:

```ts
const credential = await signInWithEmailAndPassword(auth, email, password);
const idToken = await credential.user.getIdToken();
const response = await fetch("/api/auth/session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ idToken }),
});

if (!response.ok) {
  // Mostrar mensagem devolvida pela API e nao navegar.
}

router.push("/dashboard");
```

No logout, chamar `POST /api/auth/session/logout` antes do logout Firebase. Como o Blob e privado, links de arquivo tambem devem apontar para `/api/download?url=${encodeURIComponent(fileUrl)}`; links diretos do Blob devem ser removidos pelo frontend responsavel.

Nao alterar o frontend sem autorizacao do usuario. Se ele concluir essa integracao, pedir que confirme para iniciar testes reais com `demo.app.celeriflow.com.br`.

## Proxima sequencia para o Gemini

### 1. Validar deploy e sessao

1. Confirmar variaveis e wildcard na Vercel.
2. Aguardar a alteracao de frontend acima.
3. Em `demo.app.celeriflow.com.br`, testar login com `admindemo@email.com`.
4. Confirmar que `POST /api/auth/session` retorna sucesso e cria cookie.
5. Testar `/administracao` e uma mutation de Administracao.
6. Testar upload e download de um arquivo novo; conferir o prefixo `tenants/{tenantId}/documents/` no Blob Platform.
7. Testar URL de arquivo alterada/manual e confirmar 404.

### 2. Migrar todos os modulos para TenantContext

Fazer por modulo, sem replace em massa. Para cada funcao exportada, primeiro mapear consumidores com `grep`, conforme `AGENTS.md`.

Ordem recomendada:

1. `cadastros` e `protocolos`.
2. `documentos`/GED, `atendimento` e `transparencia`.
3. `tributacao`, `financeiro`, `compras` e `rh`.
4. `patrimonio`, `educacao`, `saude`, `social` e `meio-ambiente`.
5. `saneamento`, `obras`, `cultura`, `camara` e `seguranca`.
6. `configuracoes` e dashboard.

Mapa de entitlement:

| Pasta/area | Codigo do modulo |
| --- | --- |
| administracao | ADMINISTRACAO |
| cadastros | CADASTROS |
| protocolos | PROTOCOLOS |
| documentos | GED |
| atendimento | ATENDIMENTO |
| transparencia | TRANSPARENCIA |
| tributacao | TRIBUTACAO |
| financeiro | FINANCEIRO |
| compras | COMPRAS |
| rh | RH |
| patrimonio | PATRIMONIO |
| educacao | EDUCACAO |
| saude | SAUDE |
| social | SOCIAL |
| meio-ambiente | MEIO_AMBIENTE |
| saneamento | SANEAMENTO |
| obras | OBRAS |
| cultura | CULTURA |
| camara | CAMARA |
| seguranca | SEGURANCA |
| configuracoes | CONFIGURACOES |

Tambem revisar `src/lib/sequence.ts`: o contador ainda usa Prisma global. A sequencia deve receber um Prisma do tenant por parametro ou obter o `TenantContext` explicitamente. Nunca gerar sequencias no banco default em uma action municipal.

`src/app/api/leads/route.ts` e marketing sao plataforma/CRM, nao dados municipais; decidir depois se `Lead` deve permanecer no banco DEMO ou ganhar um model no banco Platform. Nao misturar lead comercial com dados de prefeitura por acidente.

### 3. Autorizacao por usuario e perfis municipais

O isolamento atual controla tenant e modulo contratado, mas nao implementa ainda permissao fina por usuario.

O schema municipal possui `Usuario`, `ConfiguracaoPerfil`, `ConfiguracaoModulo` e `UsuarioModulo`, porem ele ainda nao esta ligado ao Firebase de forma confiavel. Antes de cadastrar usuarios reais, implementar uma fonte de verdade:

1. Adicionar um identificador Firebase UID ao usuario municipal ou criar uma associacao explicita segura.
2. Criar/provisionar usuario Firebase via backend administrativo ou documentar fluxo manual com reset de senha.
3. Validar que o usuario autenticado possui perfil municipal ativo.
4. Aplicar `canView` e `canEdit` em paginas/actions, alem do entitlement de tenant.
5. Manter `PLATFORM_ADMIN` separado e nunca replicar senha ou credenciais entre tenants.

Nao alterar `PlatformUser` para permitir memberships multiplos de usuarios municipais. A regra de negocio e um usuario municipal por prefeitura.

### 4. Provisionamento de cliente real

Quando houver a primeira prefeitura real:

1. Criar banco Neon municipal novo e isolado.
2. Aplicar `prisma/schema.prisma` nesse banco. Hoje o projeto nao possui migrations historicas; usar `prisma db push` somente de forma controlada ate criar baseline de migrations.
3. Criar tenant no banco Platform com URL cifrada, status `ACTIVE` e dominio da cidade.
4. Criar apenas `PlatformTenantModule` contratados.
5. Adicionar dominio no Firebase Authorized Domains e Vercel/DNS.
6. Criar gestor Firebase com senha temporaria unica e reset.
7. Rodar `scripts/register-platform-user.mjs` com `TENANT_ADMIN` e slug daquele tenant.
8. Validar sessao, banco, modulos e Blob antes de entregar.

`scripts/provision-demo.mjs` e exclusivo do DEMO. Nao usa-lo para prefeitura real sem generalizar cuidadosamente e validar conflitos de dominio.

## Validacao e qualidade

- O ultimo `npm run build` passou apos a migracao de Administracao e Blob Platform.
- O Blob Platform respondeu com sucesso a `list({ limit: 1 })` usando o token novo.
- O lint completo ja possuia muitos erros legados em componentes client e tipos `any`. Nao considerar esses erros como introduzidos por multi-instancia.
- `git diff --check` passou, exceto avisos de conversao LF/CRLF do Windows.

Rodar sempre antes de commit:

```bash
npm run build
```

Ler obrigatoriamente:

- `AGENTS.md`
- `docs/multi-instance.md`
- `node_modules/next/dist/docs/` relevante antes de alterar convencoes Next.js

## Riscos que nao podem ser ignorados

- Apenas Administracao esta tenant-aware. Os demais modulos ainda usam `@/lib/prisma` e, portanto, apontam para `DATABASE_URL` (DEMO). Nao provisionar cliente real para uso desses modulos antes da migracao.
- Sem a sessao server-side no login, paginas tenant-aware falharao por ausencia do cookie, mesmo que Firebase client esteja logado.
- O Blob anterior foi abandonado intencionalmente. Se houver arquivo que precise ser preservado, criar uma migracao definitiva para o Blob Platform, nao fallback temporario.
- Toda Route Handler e Server Action precisa validar contexto no servidor. Proxy e UI nao substituem autorizacao no backend.
- Nao vazar tokens, URLs PostgreSQL, chaves de cifragem ou chave Firebase em logs, docs, commits ou respostas.
