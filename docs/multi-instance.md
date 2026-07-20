# Multi-instancia CeleriFlow

Cada prefeitura utiliza um banco municipal independente. O banco de controle da plataforma mantem somente tenants, dominios, acessos e modulos contratados.

## Dominios

- Painel principal: `app.celeriflow.com.br`.
- Prefeitura: `{cidade}.app.celeriflow.com.br`.
- Tenant inicial: `demo.app.celeriflow.com.br`.
- Desenvolvimento local: `demo.localhost:3000`.

O dominio seleciona a prefeitura, mas nao concede acesso. Toda requisicao administrativa deve validar a sessao Firebase e o vinculo do usuario no banco de controle.

## Bancos

| Banco | Uso |
| --- | --- |
| Plataforma | `PlatformTenant`, dominios, usuarios, modulos e auditoria. Usa `prisma/platform.prisma`. |
| Prefeitura | Dados municipais de uma unica prefeitura. Usa `prisma/schema.prisma`. |

O banco municipal atual deve se tornar o banco do tenant `demo`. Bancos de clientes futuros recebem o mesmo schema municipal, mas nunca compartilham dados com o DEMO.

## Variaveis de ambiente

```dotenv
PLATFORM_DATABASE_URL="postgresql://..."
PLATFORM_ENCRYPTION_KEY="base64-de-32-bytes"
```

`PLATFORM_ENCRYPTION_KEY` cifra as URLs dos bancos municipais antes de elas serem salvas no banco de controle. Gere uma chave com `openssl rand -base64 32` e armazene-a somente nos ambientes da Vercel.

## Bootstrap do banco de plataforma

Crie um banco Neon separado do banco municipal e aplique o schema:

```bash
npx prisma db push --config prisma.platform.config.ts
npx prisma generate --schema prisma/platform.prisma
```

Enquanto o projeto municipal ainda nao possui migrations historicas, use `prisma db push` somente para o bootstrap controlado. Antes do primeiro cliente real, a proxima etapa e criar e validar migrations versionadas para os dois schemas.

## Cadastro manual do DEMO

Provisione o banco municipal DEMO com o schema principal e execute o provisionador idempotente:

```bash
$env:DATABASE_URL = $env:DEMO_TENANT_DATABASE_URL
npx prisma db push
node scripts/provision-demo.mjs
```

O script cria o tenant `demo`, registra `demo.app.celeriflow.com.br` e `demo.localhost`, cifra a URL do banco municipal e habilita os 21 modulos. Ele requer `PLATFORM_DATABASE_URL`, `PLATFORM_ENCRYPTION_KEY` e `DEMO_TENANT_DATABASE_URL`.

Depois de criar o usuario no Firebase, cadastre manualmente seu UID em `PlatformUser` com role `PLATFORM_ADMIN`. Esse e o unico papel permitido para atuar em mais de uma prefeitura.

Codigos dos 21 modulos:

```text
ADMINISTRACAO, CADASTROS, PROTOCOLOS, GED, ATENDIMENTO, TRANSPARENCIA,
TRIBUTACAO, FINANCEIRO, COMPRAS, RH, PATRIMONIO, EDUCACAO, SAUDE, SOCIAL,
MEIO_AMBIENTE, SANEAMENTO, OBRAS, CULTURA, CAMARA, SEGURANCA, CONFIGURACOES
```

Nunca salve URL de banco em texto puro no banco de plataforma. O provisionador cifra a URL antes de persistir o tenant.

## Uso no backend

Novas Server Actions e Route Handlers municipais devem obter o contexto antes de tocar dados:

```ts
const context = await getCurrentTenantContext();
const pessoas = await context.prisma.person.findMany();
```

Para Route Handlers, use `resolveTenantContext(request.headers.get("host"), sessionCookie)`. O helper valida dominio, sessao Firebase, usuario ativo, associacao ao tenant e status da prefeitura antes de fornecer o Prisma do banco municipal.

## Proxima integracao de frontend

O login atual deve enviar o Firebase ID token para `POST /api/auth/session` depois de autenticar. A resposta grava o cookie `httpOnly` utilizado pelas actions e rotas protegidas. O logout deve chamar `POST /api/auth/session/logout` antes do `signOut` do Firebase.
