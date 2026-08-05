# Relatório de Auditoria Técnica e Funcional - CeleriFlow

**Data:** 30 de julho de 2026  
**Escopo:** código-fonte disponível, schema Prisma, configurações versionadas e verificações locais.  
**Método:** revisão estática de arquitetura, fluxos, autorização, dados, integrações e operação; execução de `npx prisma validate`, `npm run lint`, `npm run build` e `npm audit --omit=dev`.

## Parecer executivo

O CeleriFlow tem uma base tecnológica atual e uma cobertura funcional municipal incomum para o estágio do projeto: 24 domínios de negócio, autenticação federada, banco relacional e bons fluxos em protocolos, atendimento, GED e partes do financeiro. O schema é amplo e há controles específicos mais maduros em Protocolos, Atendimento/Ouvidoria, operações de tesouraria e assinatura interna.

Apesar disso, **não está pronto para operação produtiva municipal crítica ou para atender, de ponta a ponta, editais de ERP público**. Persistem vulnerabilidades transitivas sem atualização não regressiva do fornecedor, falhas de autorização horizontal, exposição pública de upload ambiental, ausência de migrations versionadas e lacunas em integrações regulatórias. Dados de saúde, assistência social, RH e documentos exigem controles de acesso e LGPD que ainda não são suficientes.

Classificação atual sugerida: **MVP funcional avançado / pré-produção**, e não sistema apto a processar isoladamente obrigações legais, fiscais, contábeis e dados sensíveis municipais em larga escala.

## Atualização de Correções

- O conflito entre `src/middleware.ts` e `src/proxy.ts` foi removido; `npm run build` passou com Next.js 16.2.12.
- O RBAC agora é deny-by-default: usuários não administrativos precisam de permissão individual de visualização/edição para o código do módulo.
- Gestão de usuários, perfis e módulos exige o perfil administrativo provisionado com `acesso: "total"`; esse perfil não pode ser criado, renomeado ou desativado pela interface.
- Next.js, Prisma, Firebase, PostCSS e Sharp foram atualizados. O `npm audit --omit=dev` passou de 18 para 11 alertas transitivos no `firebase-admin`; o downgrade recomendado pelo npm introduz uma vulnerabilidade crítica e não foi adotado.
- Downloads GED agora exigem acesso ao vínculo de Atendimento/Ouvidoria, Protocolos ou ao módulo Documentos. Anexos ambientais usam Blob privado, nome aleatório e validação de upload.

## Visão da solução

| Camada | Estado observado |
| --- | --- |
| Aplicação | Next.js 16 / React 19 / TypeScript, App Router e Server Actions. O painel é roteado pelo subdomínio `app.celeriflow.com.br` para `src/app/app-domain`. |
| Autenticação | Firebase Authentication; sessão de cinco dias em cookie `HttpOnly`, `SameSite=Lax` e `Secure` em produção. O token é verificado com revogação e e-mail confirmado. |
| Autorização | Contexto municipal único via Prisma; perfil com permissões em JSON e controles mais específicos em Protocolos e Atendimento. |
| Dados | PostgreSQL Neon por Prisma 7.8; schema com 5.017 linhas, entidades transversais para pessoas, servidores, empresas, documentos e domínios municipais. |
| Arquivos | Vercel Blob privado para o fluxo padrão, nomes aleatórios e limite de tamanho. Há uma exceção pública insegura no módulo ambiental. |
| Operação | Vercel e um cron diário de avisos de prazo. Não foram encontrados CI versionado, testes automatizados, health checks, monitoramento, fila ou estratégia de restore no repositório. |

## Módulos e maturidade funcional

| Conjunto | Cobertura observada | Maturidade |
| --- | --- | --- |
| Administração, cadastros e configurações | Instituição, secretarias, departamentos, unidades, cargos, servidores, pessoas, empresas, imóveis, fornecedores, usuários e perfis. | Média: CRUD amplo; autorização administrativa é insuficiente. |
| Protocolos e processos | Abertura, numeração, SLA, etapas, recebimento, despachos, encaminhamento, conclusão, arquivamento, notificações, relatórios e assinatura interna. | Alta para fluxo interno. |
| Atendimento, ouvidoria e GED | Chamados, responsáveis, tramitação, satisfação, manifestações sigilosas, geração de processo e documentos versionados. | Média/alta: há escopo setorial em parte dos fluxos, mas documentos GED gerais não recebem autorização por registro. |
| Tributação | Cadastro econômico e imobiliário, guias, dívida ativa, alvarás, certidões, fiscalização e NFS-e. | Média: a NFS-e é rascunho interno, sem cálculo de ISS, XML ou webservice fiscal. |
| Financeiro e contábil | Orçamento, contas bancárias, empenhos, liquidações, pagamentos, tesouraria, importação CSV e conciliação básica. | Média: há transações e auditoria específica, mas faltam integrações bancárias e fechamento/prestação de contas oficial. |
| Compras e contratos | Solicitações, processos, licitações, contratos e catálogo. | Média: não há integração PNCP nem pregão eletrônico identificado. |
| RH e patrimônio | Servidores, folha, ponto, férias, licenças, benefícios, atos, bens, materiais e almoxarifado. | Média/baixa: há telas e dados, sem eSocial e com qualidade estática pendente. |
| Saúde e assistência social | Pacientes, prontuários, vacinação, profissionais, unidades, famílias, benefícios e atendimentos. | Baixa para dados sensíveis: falta escopo por unidade/equipe/profissional e integrações e-SUS/CadÚnico. |
| Educação, obras, cultura, meio ambiente, saneamento, segurança, Câmara e transparência | Estruturas, cadastros e telas específicas por domínio. | Baixa a média: várias verticais ainda são CRUDs ou telas iniciais; não foram localizados conectores regulatórios correspondentes. |

## Integrações atuais e lacunas

### Implementadas no código

- Firebase Authentication/Admin para identidade e sessões.
- Neon PostgreSQL via Prisma para persistência.
- Vercel Blob para documentos privados no fluxo padrão.
- Vercel Cron para lembretes de vencimento de processos.
- Endpoint público para leads comerciais.
- Importação de extrato CSV e fluxo interno tributário para receita/tesouraria.

### Ausentes ou apenas estruturais

| Prioridade pública | Lacuna confirmada | Evidência |
| --- | --- | --- |
| Compras | PNCP para editais, atas e contratos não localizado. | Não há conector/outbox/webhook no código; `REVISAO_SISTEMA_CELERIFLOW.md:86`. |
| Financeiro público | SICONFI/MSC, RREO/RGF, PCASP e remessas TCE não localizados. | `REVISAO_SISTEMA_CELERIFLOW.md:87-92`. |
| Receita | NFS-e Nacional/ABRASF não implementada; a nota nasce com ISS zero e status interno. | `src/app/app-domain/tributacao/nfse/actions.ts:19-30`. |
| Arrecadação | Sem OFX, CNAB, boleto, PIX oficial ou API bancária. | `docs/financeiro-tributario-adapters.md:11-17`. |
| RH | Sem eventos eSocial, EFD-Reinf e DCTFWeb. | `REVISAO_SISTEMA_CELERIFLOW.md:89-90`. |
| Saúde, educação e social | Sem integração e-SUS APS, Educacenso/INEP ou CadÚnico/SUAS. | `REVISAO_SISTEMA_CELERIFLOW.md:95`; não foram encontrados conectores no código. |
| Assinatura qualificada | A assinatura interna tem hash e reautenticação, mas não é integração ICP-Brasil/gov.br. | `src/lib/signatures/internal-signature.ts`; `REVISAO_SISTEMA_CELERIFLOW.md:93`. |

## Achados críticos e altos

| Severidade | Achado e impacto | Evidência | Ação necessária |
| --- | --- | --- | --- |
| Resolvida | **Build bloqueado.** O arquivo `src/middleware.ts` duplicava a convenção `src/proxy.ts`. | `npm run build` passou após a remoção do arquivo duplicado. | Manter `npm run build` como requisito de merge. |
| Resolvida | **Escalação de privilégio pela configuração.** A gestão administrativa agora exige o perfil administrativo provisionado e o bypass não é mais baseado em correspondência parcial de nome. | `src/app/app-domain/configuracoes/usuarios/actions.ts`; `src/app/app-domain/configuracoes/perfis/actions.ts`; `src/lib/platform/tenant-context.ts`. | Manter revisão de privilégios e auditoria de alterações administrativas. |
| Resolvida | **RBAC permissivo por padrão.** Perfil sem permissão explícita não recebe mais acesso ao módulo. | `src/lib/platform/tenant-context.ts`. | Provisionar permissões individuais para usuários operacionais antes de ativá-los. |
| Resolvida | **Acesso horizontal indevido a documentos.** O download agora verifica o vínculo antes de abrir o Blob. | `src/app/api/download/route.ts`; escopo setorial de Atendimento e Protocolos. | Usuários que precisem de GED genérico devem receber o módulo Documentos. Expandir a política quando novas relações documentais forem adicionadas. |
| Alta | **Dados clínicos e sociais expostos a todo usuário do módulo.** Consultas de Saúde e Social não filtram unidade, equipe, profissional, sigilo ou relacionamento com o cidadão. | `src/app/app-domain/saude/atendimentos/page.tsx:5-10`; `src/app/app-domain/social/prontuario/page.tsx:4-21`; `src/lib/platform/tenant-context.ts:74-102`. | Definir RBAC por operação e ABAC por unidade/equipe/profissional; registrar acesso de leitura e impor política específica para prontuários e registros sigilosos. |
| Resolvida | **Upload ambiental público e não validado.** Novos arquivos usam o wrapper privado padrão. | `src/app/app-domain/meio-ambiente/actions.ts`; `src/lib/platform/blob.ts`. | Migrar ou revogar URLs públicas geradas antes desta correção; antimalware e inspeção por magic bytes continuam pendentes. |
| Alta | **Dependências vulneráveis.** `npm audit --omit=dev` encontrou 18 vulnerabilidades, 6 altas, inclusive Next.js 16.2.10, PostCSS e Sharp. | `package.json:34`; resultado do `npm audit`. | Atualizar pelo menos Next.js e `eslint-config-next` para 16.2.12, regenerar lockfile, auditar Prisma/Firebase e executar regressão. |
| Alta | **Conta administrativa previsível em script rastreado.** O script cria e-mail e senha fixos. | `createAdmin.ts:6-12`. | Remover a credencial fixa, revogar usuário se existente, rotacionar segredos relacionados e criar bootstrap de uso único via variáveis seguras. |

## Achados médios

| Tema | Achado | Evidência e recomendação |
| --- | --- | --- |
| LGPD | Há CPF, filiação, contatos, salários, dados de saúde e vulnerabilidade social sem retenção, descarte, DSAR, base legal versionada ou criptografia de campo visíveis no código. | `prisma/schema.prisma:157-166`, `313-377`, `3328-3455`, `3625-3679`. Criar inventário/RoPA, política de retenção, atendimento a direitos do titular, minimização, classificação e proteção adicional para dados sensíveis. |
| Auditoria | Não há trilha transversal e imutável de leitura, alteração, exportação e exclusão. Logs financeiros/tributários existem, mas são tabelas do mesmo banco. | `prisma/schema.prisma:4973-5003`. Adotar eventos append-only com retenção e exportação para destino protegido; usar soft-delete/arquivamento para registros regulados. |
| Banco e deploy | Não há migrations em `prisma/migrations`; a documentação instrui `prisma db push`. | `prisma.config.ts:6-13`; `docs/financeiro-decimal-phase-0.md:5-12`. Gerar baseline canônico, revisar migrations em PR e usar somente `prisma migrate deploy` na produção. |
| Valores monetários | Financeiro/tributário mantém `Float` junto com `Decimal?`, portanto a precisão final ainda depende de reconciliação. | `prisma/schema.prisma:1858-1863`, `2116-2117`; `docs/financeiro-decimal-phase-0.md:1-3`. Concluir backfill, tornar Decimal obrigatório e retirar Float de todo caminho transacional. |
| Rate limit | Limite por `Map` local não funciona entre instâncias serverless e confia em cabeçalho encaminhado. | `src/lib/platform/rate-limit.ts:1-24`; `src/app/api/auth/session/route.ts:15-26`. Usar store compartilhado e IP provido por proxy confiável. |
| Segurança web | Não há CSP, HSTS, `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy` ou `Permissions-Policy` configurados. | `next.config.ts:3-7`. Definir headers no Next/Vercel e introduzir CSP em report-only antes de bloquear. |
| Arquivos | Validação padrão usa MIME enviado pelo cliente, aceita ZIP/RAR e não possui antimalware/quota; blobs podem permanecer órfãos após exclusão lógica no banco. | `src/lib/platform/blob.ts:21-94`; `src/app/app-domain/documentos/ged/actions.ts:41-45`. Validar conteúdo, restringir formatos por caso de uso e reconciliar lifecycle Blob/banco. |
| Jobs | Cron processa até 500 itens sem ordenação/paginação e cria notificações em loops; a chave de deduplicação é índice, não unicidade. | `src/app/api/protocolos/deadline-notifications/route.ts:16-49`; `prisma/schema.prisma:936-951`. Criar `unique(userId, dedupeKey)`, paginação por cursor, batch/outbox, métricas e tratamento de reexecução. |
| Qualidade | Não há testes automatizados ou CI versionados. O lint apresenta 292 erros e 152 avisos. | Ausência de `*.test.*`, `*.spec.*` e `.github`; resultado de `npm run lint`. Priorizar tipagem/validação das Server Actions e testes de autorização, financeiro e integrações. |
| Observabilidade | Não foram encontrados monitoramento, tracing, healthcheck, alertas, SLO, RPO/RTO ou testes de restore. | `vercel.json:1-8`; uso recorrente de `console.error`. Instrumentar erros, banco, cron, Blob e integrações; documentar e testar recuperação. |
| Tenancy | O código declara uma única base municipal ativa; não há `tenantId` transacional nem RLS. | `src/lib/platform/tenant-context.ts:6-8`, `16-29`. É aceitável somente com banco/infraestrutura isolados por prefeitura; para SaaS compartilhado, usar tenant obrigatório e RLS ou banco por município. |

## Aspectos positivos preservados

- A sessão Firebase é validada no servidor com checagem de revogação e confirmação de e-mail; o cookie tem `HttpOnly` e `SameSite=Lax`.
- Protocolos e Atendimento possuem verificações mais específicas de setor, vínculo do servidor e transição de estados.
- Ouvidoria separa identidade do conteúdo e registra auditoria em seus fluxos.
- O upload padrão usa Blob privado, token de servidor, tamanho máximo e nome aleatório sanitizado.
- Fluxos de tesouraria usam transações, locks e trilhas de auditoria; o desenho de Decimal e idempotência já está em evolução.
- Assinatura interna registra hash SHA-256, versão, reautenticação e metadados de auditoria.
- `npx prisma validate` passou, confirmando a validade sintática e relacional do schema atual.

## Resultado das verificações

| Verificação | Resultado | Observação |
| --- | --- | --- |
| `npx prisma validate` | Passou | Schema válido. Isso não testa dados, migrations ou regras de negócio. |
| `npm run lint` | Falhou | 292 erros e 152 avisos. Predominam `any`, regras React e variáveis não usadas. |
| `npm run build` | Passou | Build de produção gerado com Next.js 16.2.12. |
| `npm audit --omit=dev` | Pendente de fornecedor | 11 alertas transitivos: 5 altos e 6 moderados na cadeia do `firebase-admin`. |
| Testes automatizados | Não disponível | Não foram encontrados arquivos de teste nem script `test`. |

## Plano de ação recomendado

### P0 - Antes de qualquer produção

1. Restaurar build eliminando a duplicidade proxy/middleware e atualizar Next.js para versão corrigida.
2. Revogar qualquer conta criada pelo script de admin, remover senha fixa e rotacionar credenciais operacionais expostas ou potencialmente acessíveis.
3. Corrigir RBAC para deny-by-default, impedir escalonamento por Configurações e substituir o bypass por nome de perfil.
4. Proteger download/GED e upload ambiental com uma política única de autorização e armazenamento privado validado.
5. Bloquear acesso amplo a Saúde e Social com escopo por unidade, equipe e profissional.

### P1 - Confiabilidade e conformidade

1. Introduzir migrations versionadas, CI com lint, validação Prisma, testes e build; impedir deploy com falha.
2. Implementar trilha de auditoria transversal, retenção, descarte, inventário LGPD e resposta a solicitações do titular.
3. Concluir a migração monetária para Decimal e incluir testes de fechamento, saldos, concorrência e idempotência.
4. Criar observabilidade, backups testados, SLOs, runbooks e fila/outbox para cron e integrações.
5. Definir formalmente se o produto é instalação isolada por prefeitura ou SaaS multi-tenant; implementar o isolamento correspondente.

### P2 - Aptidão para editais

1. Selecionar o estado e os municípios-alvo para priorizar o layout do TCE e regras locais.
2. Entregar PNCP, SICONFI/MSC, TCE, CNAB/PIX/boleto, NFS-e, eSocial/EFD-Reinf/DCTFWeb na ordem dos editais-alvo.
3. Integrar e-SUS, Educacenso e CadÚnico/SUAS conforme os módulos comercializados.
4. Desenvolver portal cidadão público com transparência, LAI, dados abertos, acompanhamento de protocolo e autoatendimento tributário, com segregação da área interna.

## Limites desta auditoria

Esta revisão é estática e baseada no repositório local em 30 de julho de 2026. Não foram acessados dados reais, Firebase, Neon, Vercel, Blob, IAM, logs de produção, backups, regras de rede ou contratos com terceiros. A ausência de uma integração no código não prova que ela não exista em outro serviço; ela indica que não é verificável neste repositório. As exigências legais e de editais precisam de validação jurídica, contábil e com o TCE/município de destino antes de qualquer declaração formal de conformidade.
