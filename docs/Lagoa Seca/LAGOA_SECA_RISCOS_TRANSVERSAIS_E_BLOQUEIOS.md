# Lagoa Seca/PB - Riscos Transversais e Bloqueios

## Controles tecnicos entregues

| Controle | Situacao | Evidencia |
|---|---|---|
| Headers de seguranca | Implementado em modo seguro para transicao | `next.config.ts` inclui HSTS, anti-frame, nosniff, Permissions-Policy e CSP Report-Only |
| Healthcheck | Implementado | `GET /api/health` verifica disponibilidade do banco e nao permite cache |
| CI | Implementado | `.github/workflows/ci.yml` executa install, Prisma, testes, build e auditoria de dependencias |
| Build sem mutacao | Implementado | `prebuild` deixou de alterar versao; versionamento permanece manual em `npm run version:bump` |
| Auditoria financeira | Implementado anteriormente | Trigger e `FinancialAuditLog` append-only para fatos financeiros |

## Bloqueios que exigem decisao ou evidencia externa

| Tema | O que falta | Responsavel para decidir/fornecer | Condicao para concluir |
|---|---|---|---|
| Decimal obrigatorio | Conciliar dados reais, resolver divergencias e aprovar a retirada dos campos Float legados | Contador municipal + Robonuvem | Relatorio de reconciliacao aprovado e migration de corte executada |
| LGPD, retencao e descarte | Base legal, prazos por classe de dado, legal hold, anonimização, DSAR e responsavel encarregado | Prefeitura/encarregado LGPD + juridico | Politica aprovada antes de automatizar arquivamento ou descarte |
| Saude e Social | Regra de escopo por unidade, equipe, profissional, quebra de vidro e auditoria de leitura | Gestores de Saude e Assistencia Social | Matriz de acesso aprovada antes de liberar uso multiusuario desses modulos |
| Isolamento entre municipios | Definir banco por prefeitura, schema por prefeitura ou SaaS com tenantId/RLS | Arquitetura/negocio Robonuvem | Decisao formal; o ambiente atual permanece uma instalacao e banco por municipio |
| Observabilidade operacional | Destino de logs, alertas, retencao, SLO, RPO, RTO e responsaveis de plantao | Operacoes Robonuvem + TI municipal | Ferramenta contratada/configurada e primeiro teste de alerta/restore aceito |
| Backup e restore | Executar e registrar restauracao comprovada do ambiente de homologacao | TI municipal + Robonuvem | Evidencia de restauracao e reconciliacao do banco/documentos |

## Regra de liberacao

Nenhum bloqueio desta tabela deve ser convertido em declaracao de conformidade, aceite de producao ou atendimento integral do edital sem a evidencia indicada.
