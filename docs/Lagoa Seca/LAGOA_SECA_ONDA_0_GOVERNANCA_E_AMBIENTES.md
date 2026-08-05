# Lagoa Seca/PB - Onda 0: Governanca e Ambientes

Este registro operacional cobre as entregas da Onda 0 do Plano Diretor. Ele deve ser preenchido e aprovado antes da configuracao municipal. Nenhum campo pendente representa aceite.

## Responsaveis e cronograma

| Entrega | Responsavel indicado | Evidencia | Status |
|---|---|---|---|
| Ata da reuniao de abertura | Pendente de indicacao | Ata assinada e lista de presenca | Pendente |
| Gestor do contrato e fiscal tecnico | Pendente de indicacao | Portaria ou ato de designacao | Pendente |
| Responsaveis por contabilidade, tesouraria, compras, patrimonio e transparencia | Pendente de indicacao | Lista com cargo, e-mail e telefone | Pendente |
| Cronograma com marcos M0-M9 | Robonuvem + Prefeitura | Cronograma aprovado | Pendente |
| Canais de suporte e escalonamento | Robonuvem + Prefeitura | Lista de canais e escala | Pendente |

## Ambientes e acessos

| Ambiente | URL/identificador | Responsavel tecnico | Backup/restore testado | Credenciais entregues | Status |
|---|---|---|---|---|---|
| Desenvolvimento | Pendente | Pendente | Pendente | Pendente | Pendente |
| Homologacao | Pendente | Pendente | Pendente | Pendente | Pendente |
| Treinamento | Pendente | Pendente | Pendente | Pendente | Pendente |

O ambiente de homologacao deve executar a migration `20260801130000_add_bank_account_budget_unit_and_financial_audit_immutability` antes de cadastrar ou movimentar contas bancarias.

## Identidade e perfis da POC

O login da aplicacao e autenticado pelo Firebase. A seed cria os perfis e cadastros municipais, mas a equipe de implantacao deve provisionar os usuarios correspondentes no Firebase e vincular os mesmos e-mails no cadastro municipal.

| Perfil | Modulo | Regra operacional | Evidencia exigida |
|---|---|---|---|
| Solicitante | Financeiro | Cria solicitacoes; nao aprova a propria solicitacao | Tentativa de autoaprovacao bloqueada |
| Aprovador/Gestor | Financeiro | Aprova solicitacoes de outro usuario | Auditoria da aprovacao |
| Contador | Financeiro | Registra contabilizacao, fechamento e relatorios | Lancamento e relatorio assinados |
| Tesoureiro | Financeiro | Opera contas, pagamentos, recolhimentos e conciliacao | Movimento bancario auditado |
| Auditor | Financeiro | Somente consulta | Tentativa de alteracao bloqueada |
| Administrador | Todos | Gerencia perfis e parametros | Alteracao de perfil auditada |
| Transparencia | Transparencia | Publica e revisa dados publicos | Publicacao com historico |

## Inventario e estrategia de migracao

| Item | Fonte municipal | Responsavel | Data prevista | Status |
|---|---|---|---|---|
| Plano de contas, PPA, LDO, LOA e creditos | Pendente | Prefeitura | Pendente | Pendente |
| Saldos contabeis, bancarios e patrimoniais | Pendente | Contabilidade/Tesouraria | Pendente | Pendente |
| Inventario de bens e estoques | Pendente | Patrimonio/Almoxarifado | Pendente | Pendente |
| Integracoes TCE-PB, SICONFI, bancos e certificados | Pendente | TI municipal | Pendente | Pendente |
| Plano de migracao e totais de controle | Pendente | Robonuvem + Prefeitura | Pendente | Pendente |

O detalhamento de cadastros, ambientes e evidencias exigidos para cada conexao esta em `docs/LAGOA_SECA_INTEGRACOES_EXTERNAS_PENDENTES.md`.

## Criterio de saida M0

- Responsaveis formalmente nomeados.
- Ambientes de desenvolvimento, homologacao e treinamento acessiveis.
- Cronograma aprovado.
- Questionario de implantacao respondido.
- Inventario de integracoes e estrategia de migracao aprovados.
