# Plano Independente de Adequacao ao PE042 - Lagoa Seca/PB

**Processo:** Pregao Eletronico no 00042/2026 - Processo Administrativo 260702PE00042  
**Orgao:** Prefeitura Municipal de Lagoa Seca/PB  
**Objeto:** Locacao de software de Contabilidade Publica e Portal da Transparencia  
**Referencia de requisitos:** `docs/Checklist_Tecnico_POC_PE042_Robonuvem.md`  
**Produto avaliado:** CeleriFlow no estado atual do repositorio  
**Carater do plano:** independente do plano de adequacao de Divino de Sao Lourenco. Este documento possui escopo, marcos, criterios de aceite e decisao de participacao proprios.

## 1. Objetivo e regra de decisao

O PE042 exige uma Prova de Conceito presencial, com base modelo, em ate tres reunioes e com classificacao binaria por requisito: `Atende` ou `Nao atende`. O proprio checklist registra que o nao atendimento de 100% das funcionalidades e aprovacoes requeridas pode causar desclassificacao.

O objetivo deste plano e tornar o CeleriFlow apto a demonstrar e operar, de ponta a ponta:

```text
PPA -> LDO -> LOA -> credito adicional
-> solicitacao -> aprovacao -> reserva -> empenho
-> liquidacao -> retencoes -> pagamento -> estorno
-> caixa, bancos e conciliacao
-> contabilidade publica e patrimonio
-> relatorios legais, TCE-PB e SICONFI
-> Portal da Transparencia publico e dados abertos
```

Nenhum requisito deve ser declarado atendido por possuir apenas schema, seed, menu, botao, mock, arquivo manual ou tela estatica. Para este plano, `Atende` significa fluxo executavel, com permissao, historico, dado coerente e evidencia demonstravel na POC.

## 2. Diagnostico do CeleriFlow frente ao PE042

### 2.1 O que pode ser aproveitado

| Componente atual | Situacao aproveitavel | Limite atual |
| --- | --- | --- |
| Orcamento e execucao financeira | Ha reserva, saldo, empenho, liquidacao, ordem de pagamento, contas e movimentos de tesouraria em `src/lib/financeiro/index.ts`. | Nao cobre todas as regras legais, aprovacoes, estornos e vinculacoes exigidas. |
| Contabilidade basica | Ha plano de contas, partidas manuais balanceadas, eventos e fechamento interno. | Nao e demonstravel como PCASP/MCASP/NBCASP completo nem gera relatorios oficiais. |
| Tributacao para receita | Ha cadeia interna de guia tributaria para receita e tesouraria. | Nao ha importador regulado, classificacao completa de receita nem integracao contabil concluida. |
| Compras e contratos | Existem cadastros de processo, licitacao e contrato. | Faltam participantes, vencedor, anexos, execucao financeira e integracao direta ao empenho. |
| Patrimonio e estoque | Ha modelos e telas iniciais para bens, materiais, almoxarifados e movimentacoes. | Faltam depreciacao, alienacao, ajustes e contabilizacao automatica. |
| Protocolo e GED | Ha processo, tramitacao, anexos, historico, GED e assinatura interna. | Nao condiciona tramites a eventos contabeis e assinatura nao e ICP-Brasil. |
| Atendimento | Ha tickets, prioridade, responsavel, interacoes e encerramento. | Faltam e-mail bidirecional, telefone, WhatsApp, chat e SLA demonstravel. |
| Identidade e perfis | Ha sessao Firebase e perfil por modulo. | Falta segregacao por unidade gestora, operacao financeira, dotacao e competencia. |
| Transparencia | Ha backoffice autenticado de conteudo, diario, licitacoes e contratos. | Nao existe portal fiscal publico, integracao automatica, dados abertos, API ou consultas de receita/despesa. |

### 2.2 Bloqueadores para POC e implantacao

| Prioridade | Lacuna | Impacto no PE042 |
| --- | --- | --- |
| Critica | PPA, LDO, LOA, CMD e MBA inexistentes como modulos funcionais. | Impede todo o Bloco 2 da sequencia de POC e o encadeamento do orcamento. |
| Critica | RREO, RGF, PCA, balancetes legais, Diario, Razao e balanco anual nao sao gerados. | Impede demonstracao de relatorios obrigatorios. |
| Critica | TCE-PB e SICONFI nao possuem gerador, validador, historico, retorno ou log de erro. | Impede as integracoes governamentais exigidas. |
| Critica | Portal da Transparencia Fiscal publico nao existe. | Impede publicacao, consulta, exportacao e API exigidas. |
| Critica | Nao ha assinatura ICP-Brasil individual ou em lote. | Assinatura interna nao satisfaz o requisito. |
| Alta | Fluxo de despesa nao possui aprovacao segregada completa, retencao automatica, recolhimento, validacao fonte-conta ou estorno de pagamento. | Impede executar o cenario obrigatorio de solicitacao ate estorno. |
| Alta | Nao ha escopo por unidade gestora. | Impede demonstrar segregacao e bloqueio entre unidades. |
| Alta | Nao ha integracao de NFe, CTe e NFSe de fornecedor. | Impede captura, validacao, vinculacao ao empenho e liquidacao. |
| Alta | eSocial, EFD-Reinf, DIRF e SEFIP nao possuem geradores ou conectores. | Impede atender obrigacoes fiscais. |
| Alta | Auditoria nao e completa nem imutavel. | Impede demonstrar versao anterior, exclusao, origem e rastreabilidade exigidas. |
| Alta | Decimal ainda e campo espelho opcional e ha ausencia de migrations versionadas. | Risco de precisao, implantacao e auditoria financeira. |

## 3. Principios de implementacao

1. Implementar primeiro os fluxos que a POC avalia, sem usar contornos manuais que nao sobrevivem a implantacao.
2. Manter um unico livro de origem para fatos financeiros e contabeis; integracoes devem gerar eventos rastreaveis, nao registros duplicados.
3. Toda operacao relevante deve ter permissao por acao, unidade gestora, competencia e dado de origem.
4. Todo lancamento regulado deve ser preservado. Correcao, anulacao, estorno e exclusao devem criar novos eventos auditaveis, sem apagar o original.
5. Arquivos governamentais precisam de versao de layout, pre-validacao, lote, hash, erros, protocolo, retorno e reprocessamento idempotente.
6. Portal publico deve ler uma projecao segura e publicada dos dados, nunca expor diretamente o banco interno ou dados pessoais indevidos.
7. POC e implantacao devem usar a mesma aplicacao. Uma base modelo nao pode conter dados ou caminhos que o produto nao suporta em producao.

## 4. Governanca e artefatos obrigatorios

### 4.1 Responsaveis funcionais

| Area | Responsavel necessario |
| --- | --- |
| Contabilidade, planejamento e prestacao de contas | Contador publico responsavel e equipe de contabilidade da Prefeitura. |
| TCE-PB e SICONFI | Responsavel municipal pela transmissao e especialista no layout vigente. |
| Receita, retencoes e obrigacoes federais | Gestor fiscal/tributario e contador responsavel por EFD-Reinf, eSocial, DIRF e SEFIP. |
| Tesouraria e bancos | Tesoureiro e banco/provedor de pagamentos homologado. |
| Licitacoes, contratos e patrimonio | Setores municipais responsaveis pelos processos e dados de origem. |
| Transparencia e LGPD | Controle interno, ouvidoria, comunicacao e encarregado de dados. |
| POC e suporte | Produto, engenharia, suporte e representante comercial. |

### 4.2 Evidencias para marcar um requisito como atendido

Cada item aplicavel do checklist deve conter em uma matriz de evidencias:

- Identificador do requisito PE042, responsavel e classificacao atual.
- Regra de negocio, criterio de aceite e cenario de demonstracao.
- Tela funcional ou endpoint autenticado/publico, conforme o requisito.
- Registro gerado, documento, relatorio, arquivo ou consulta resultante.
- Registro de permissao, auditoria e historico antes/depois quando aplicavel.
- Teste automatizado para calculo, autorizacao, contabilizacao, estorno ou integracao.
- Evidencia de homologacao quando depender de banco, STN, TCE-PB, Receita Federal, ICP-Brasil ou provedor fiscal.

## 5. Etapa 0 - Confirmacao regulatoria e matriz de aderencia

**Objetivo:** definir a versao juridica, contabil e tecnica que o sistema deve atender antes de codificar os modulos.

### Entregaveis

- Matriz integral do checklist PE042: `Atende`, `Parcial`, `Nao atende`, `Dependencia externa`, evidencia e responsavel.
- Identificacao dos requisitos eliminatorios para a POC e dos requisitos de implantacao posterior, se o edital permitir essa separacao.
- Confirmacao com a Prefeitura e o TCE-PB dos layouts, competencias, canais e versoes vigentes.
- Confirmacao com a STN das versoes de MSC, DCA, RREO e RGF que devem ser suportadas.
- Levantamento de plano de contas, fontes, organograma, unidades gestoras, PPA/LDO/LOA, regras de retencao e documentos municipais.
- Mapa de integracoes e credenciais: banco, CNAB/OFX/API, certificado e-CNPJ, ICP-Brasil, TCE-PB, SICONFI, eSocial, EFD-Reinf, DIRF, SEFIP e notas fiscais.
- Definicao de dados de migracao, periodo historico e reconciliacao exigida.
- Roteiro inicial de POC com os dez blocos previstos no checklist.

### Criterios de aceite

- Todos os requisitos aplicaveis possuem dono, prioridade e definicao de evidencia.
- Nenhum layout oficial sera implementado com base em memoria, arquivo nao oficial ou documentacao desatualizada.
- A decisao de participacao somente avanca se houver caminho homologavel para todos os itens classificados como criticos.

## 6. Etapa 1 - Fundacao contabil, seguranca e confiabilidade

**Objetivo:** tornar a plataforma segura, auditavel e tecnicamente capaz de suportar a contabilidade publica.

### Desenvolvimento

- Criar baseline de migrations Prisma, substituir `db push` por migrations revisadas e usar deploy controlado em producao.
- Concluir a migracao de valores monetarios para `Decimal` obrigatorio e reconciliar todos os dados historicos antes de remover uso transacional de `Float`.
- Separar permissao de visualizar, solicitar, aprovar, reservar, empenhar, liquidar, pagar, conciliar, estornar, exportar e auditar.
- Implantar escopo por unidade gestora, secretaria, competencia, conta bancaria, fonte e dotacao; somente perfil autorizado pode ter visao consolidada.
- Criar regras de segregacao: solicitante nao aprova a propria solicitacao, aprovador nao efetiva pagamento sem permissao especifica, e auditor nao altera dados operacionais.
- Criar auditoria append-only para inclusao, alteracao, exclusao logica, aprovacao, estorno, consulta sensivel, exportacao, login e alteracao de permissao.
- Registrar usuario, perfil, unidade, IP confiavel, data/hora, origem, recurso, operacao, justificativa e valores anterior/posterior.
- Substituir exclusao fisica de registros regulados por cancelamento/arquivamento, preservando copia historica.
- Criar servico de documentos para anexar comprovantes, gerar PDF/XLSX/CSV/TXT, versionar modelos e validar autenticidade por QR Code quando necessario.
- Implantar CI, testes de regras financeiras, testes de autorizacao, testes de concorrencia/idempotencia, monitoramento, logs centralizados, health checks e fila/outbox.
- Implantar backup, recuperacao testada, RPO/RTO, alertas e runbooks operacionais.

### Criterios de aceite

- Operador de uma unidade nao acessa, altera ou exporta dados de outra unidade gestora.
- Fluxo de solicitacao/aprovacao bloqueia autoaprovacao e registra o motivo da decisao.
- Um registro corrigido, cancelado ou estornado preserva o original, mostra relacao entre eventos e pode ser auditado.
- O banco pode ser restaurado em ambiente isolado dentro do objetivo de recuperacao acordado.
- Pipeline bloqueia entrega sem migration valida, testes criticos e build aprovado.

## 7. Etapa 2 - Modelo contabil publico e planejamento orcamentario

**Objetivo:** construir o encadeamento PPA -> LDO -> LOA -> dotacao -> fonte que ainda nao existe no CeleriFlow.

### Desenvolvimento

- Modelar PPA com programas, objetivos, acoes, metas, indicadores, valores por exercicio, alteracoes, versoes e anexos.
- Modelar LDO com metas, prioridades, riscos fiscais, regras de integracao ao PPA, alteracoes, versoes, comparativos e anexos legais.
- Modelar LOA com previsao de receita, fixacao de despesa, unidades, funcao, subfuncao, programa, acao, natureza, fonte/destinacao, dotacoes e anexos.
- Implementar validacoes que impedem criar dotacao sem vinculo valido com PPA, LDO, programa, acao e fonte.
- Implementar Cronograma Mensal de Desembolso e Metas Bimestrais de Arrecadacao, com bloqueio ou alerta da despesa conforme regra municipal.
- Implementar alteracoes orcamentarias: suplementar, especial, extraordinario, remanejamento, transposicao e transferencia.
- Criar solicitacao de credito, ato legal, fonte de anulacao, limite legal, aprovacao segregada, efetivacao e relatorios de saldo anterior/movimento/saldo final.
- Completar PCASP, classificacoes, natureza de informacao, LCP/CLP, eventos e regras contabeis versionadas conforme MCASP, NBCASP e MDF aplicaveis.
- Criar centro de custo e vinculo do fato contabil a unidade, programa, acao, fonte, documento de suporte e origem operacional.

### Criterios de aceite

- A POC cria programa no PPA, relaciona prioridade na LDO, cria acao/dotacao na LOA e gera os anexos definidos pelo contador.
- Uma solicitacao de credito suplementar exige aprovador diferente, respeita limite e atualiza saldo somente apos aprovacao.
- Plano de contas e regras contabeis validam debito/credito, natureza e classificacao antes do lancamento.
- Relatorios apresentam versao original, alteracoes e comparativo para PPA e LDO.

## 8. Etapa 3 - Execucao da despesa, receita e extraorcamentario

**Objetivo:** fechar o ciclo financeiro que o PE042 exige demonstrar, aproveitando os servicos financeiros existentes e completando suas lacunas.

### Desenvolvimento

- Completar solicitacao de empenho: unidade solicitante, objeto, fornecedor, dotacao, fonte, processo, autorizacao segregada e historico.
- Integrar solicitacao aprovada a reserva e bloquear saldo por dotacao, fonte e CMD.
- Completar empenho ordinario, global e estimativo; vincular a licitacao, contrato, obra, convenio, programa e divida fundada quando aplicavel.
- Gerar Nota de Empenho com numeracao, assinaturas, documento de suporte e exportacao.
- Completar liquidacao com nota fiscal, serie, chave, documento GED, ateste, fornecedor, data, valor, saldo e estorno preservando origem.
- Criar motor parametrizavel de retencoes por servico, base de calculo, aliquota, vigencia e fornecedor: INSS, IR, SEST, SENAT, SENAR, RAT e outras regras municipais/federais aplicaveis.
- Relacionar retencao a liquidacao, pagamento, obrigacao extraorcamentaria, recolhimento, baixa e estorno.
- Validar pagamento contra fonte do documento, fonte da dotacao, conta bancaria, saldo financeiro, status de liquidacao e competencia.
- Implementar pagamento parcial, estorno de pagamento, estorno de retencoes, recibo e historico contabilidade/tesouraria.
- Completar receita prevista, lancada, arrecadada, intraorcamentaria, redutora, redistribuicao autorizada, anulacao e estorno, sempre vinculada a classificacao LOA.
- Completar receita e despesa extraorcamentaria, transferencias financeiras, restos a pagar, recolhimento de retencoes e saldos pendentes por exercicio.
- Configurar regras de contabilizacao automatica para todo evento de execucao, sem perder o identificador de fato contabil e o documento de origem.

### Criterios de aceite

- Cenario completo executa solicitacao -> aprovacao -> reserva -> empenho -> liquidacao -> retencao -> pagamento -> estorno.
- O sistema bloqueia empenho sem reserva/saldo, liquidacao acima do empenho e pagamento sem liquidacao ou fonte/conta compativel.
- Recolhimento baixa a obrigacao extraorcamentaria correta e preserva a retencao originaria.
- Receita, despesa e todos os estornos geram partidas dobradas e atualizam saldos orcamentarios, financeiros e patrimoniais.

## 9. Etapa 4 - Tesouraria, bancos, patrimonio, estoque e dividas

**Objetivo:** concluir os efeitos financeiros e patrimoniais exigidos nos relatorios e no Portal da Transparencia.

### Desenvolvimento

- Completar caixa, contas bancarias, fontes, saldo por fonte, transferencias, ordem de lancamento e validacoes de uso de recursos.
- Implementar importacao OFX, CNAB e API bancaria por adaptadores; manter identificador de origem, arquivo, lote, erros, reprocessamento e idempotencia.
- Implementar conciliacao bancaria com matching automatico/manual, pendencias, ajustes autorizados, estorno e relatorio de conciliacao.
- Completar cadastro e contabilizacao de divida consolidada, operacoes de credito, amortizacoes, juros e relatorios.
- Completar divida ativa com inscricao, atualizacao, recebimento, baixa e reflexo na receita/contabilidade.
- Completar bens e movimentacoes: avaliacao inicial, reavaliacao, impairment, custo subsequente, depreciacao, exaustao, doacao, ajuste e alienacao.
- Na alienacao, calcular ganho/perda, baixar valor patrimonial e gerar receita/lancamento contabil correspondente.
- Completar estoque: entrada, saida, ajuste, saldo, inventario e vinculacao da saida ao recebimento/liquidacao quando aplicavel.
- Implementar provisoes, incluindo previdenciarias quando aplicaveis ao ente, com memoria de calculo, vigencia e lancamento contabil.

### Criterios de aceite

- POC demonstra duas contas, ingresso de receita, saldo por fonte, transferencia, pagamento e conciliacao com relatorio.
- Um bem depreciado e posteriormente alienado gera baixa, ganho/perda e lancamentos rastreaveis.
- Uma saida de estoque atualiza saldo, documento de movimentacao e vinculo com o evento financeiro aplicavel.
- Saldo de divida ativa e consolidada pode ser conciliado aos demonstrativos contabeis.

## 10. Etapa 5 - Licitacoes, contratos e integracao com protocolo

**Objetivo:** conectar os dados administrativos aos fatos contabeis e financeiros, evitando redigitacao e perda de rastreabilidade.

### Desenvolvimento

- Completar processo licitatorio: modalidade, objeto, participantes, habilitacao, vencedor, edital, ata, pareceres e situacao.
- Completar contrato: fornecedor vencedor, vigencia, objeto, anexos, responsaveis, valor, parcelas, aditivos, medicao e execucao financeira.
- Calcular e exibir valor contratado, empenhado, liquidado, pago, saldo a empenhar e saldo contratual.
- Exigir vinculo entre licitacao/contrato e empenho quando o tipo de despesa assim determinar.
- Integrar entrada de bens/servicos, ateste, almoxarifado e patrimonio a contrato, AF, nota fiscal e liquidacao.
- Implementar regras do protocolo: processo com etapa `Aguardando Contabilidade`, validacao do evento contabil necessario, liberacao automatica, falha e historico de integracao.
- Permitir vinculo de processo administrativo a solicitacao, empenho, liquidacao, pagamento, lancamento contabil e documento de suporte.

### Criterios de aceite

- POC cadastra licitacao, fornecedor vencedor e contrato; gera empenho vinculado e demonstra execucao financeira calculada.
- Um processo nao avanca quando depender de contabilizacao pendente e e liberado apos o evento exigido ser confirmado.
- Anexos de edital, ata, contrato e nota fiscal possuem permissao, versao, auditoria e vinculo ao registro de origem.

## 11. Etapa 6 - Relatorios, fechamento, assinatura e publicacao oficial

**Objetivo:** transformar os dados contabilizados em demonstrativos legais e gerenciais verificaveis.

### Desenvolvimento

- Gerar Diario, Razao, balancete contabil, balancetes mensais, demonstrativos orcamentarios, financeiros, patrimoniais e fiscais.
- Implementar RREO, RGF, PCA, balanco anual e relatorios por unidade/consolidados conforme modelos vigentes.
- Gerar relatorios de PPA, LDO, LOA, CMD, MBA, creditos adicionais, modificacoes, receita, despesa, conciliacao, limites e PASEP.
- Criar relatorios configuraveis com filtros autorizados, agrupamento, totalizacao e visualizacoes de controle interno.
- Criar fechamento mensal/anual com validacoes, bloqueio de competencia, procedimentos autorizados de reabertura e preparacao de restos a pagar.
- Criar servico de exportacao PDF, XLSX, CSV, TXT e formato Word quando aplicavel; preservar o mesmo conjunto de dados e filtros em cada formato.
- Integrar assinatura ICP-Brasil A1/A3, individual e em lote, com cadeia de certificacao, evidencia de assinatura e validacao publica quando exigida.
- Integrar publicacao de documentos ao Diario Oficial Municipal por meio do canal definido pela Prefeitura, com protocolo, retorno e erro.

### Criterios de aceite

- Cada relatorio possui dados gerados pelo sistema, filtros, periodo, unidade, usuario emissor e trilha de auditoria.
- Fechamento bloqueia nova movimentacao no periodo e somente usuario autorizado pode executar procedimento formal de reabertura/estorno.
- Um relatorio oficial e exportado, assinado com certificado ICP-Brasil e tem assinatura validavel.
- Arquivos de demonstrativos publicados possuem titulo, subtitulo, documento e historico de publicacao.

## 12. Etapa 7 - Integracoes governamentais, fiscais e documentos eletronicos

**Objetivo:** entregar conectores operacionais, rastreaveis e homologaveis para os requisitos externos do PE042.

### TCE-PB e SICONFI

- Criar adaptador TCE-PB para layout oficialmente vigente, com selecao de periodo, pre-validacao, geracao, download/envio quando permitido, protocolo, retorno, erros e reenvio.
- Criar adaptador SICONFI para MSC, DCA, RREO e RGF, com versao de layout, regras de consistencia, historico de remessas e tratamento de rejeicao.

### Obrigacoes fiscais

- Criar geradores/conectores para DIRF e SEFIP quando ainda exigidos pelo escopo e competencia aplicavel.
- Criar integracao EFD-Reinf e eSocial de prestadores, incluindo competencia, dados de retencao, validacao, assinatura, envio, recibo, rejeicao e retificacao.
- Garantir que o motor de retencoes da Etapa 3 seja a fonte dos dados enviados, com reconciliacao entre devido, retido, recolhido e declarado.

### Captura de documentos fiscais

- Integrar NFe, CTe e NFSe por provedor ou canais oficiais aplicaveis.
- Proteger e-CNPJ A1/A3 em cofre de segredos; nunca gravar certificado ou senha em codigo, banco comum ou log.
- Capturar XML e PDF, validar emitente/fornecedor/valores, registrar erro, manifestacao do destinatario quando aplicavel e historico de captura.
- Relacionar documento fiscal a fornecedor, contrato, empenho, liquidacao, retencoes e GED.
- Manter tela de importacao de arquivo modelo e relatorio de inconsistencias como contorno demonstravel para casos sem credencial real de POC.

### Criterios de aceite

- Cada integracao permite configurar, selecionar competencia, validar, gerar/enviar, baixar, consultar status, analisar erro e reprocessar sem duplicar eventos.
- Um arquivo TCE-PB e um arquivo SICONFI passam pelo validador ou ambiente de homologacao oficial correspondente.
- Uma nota fiscal modelo importada/capturada e validada, vinculada a empenho, liquidada e usada no calculo de retencoes.
- Eventos fiscais apresentam protocolo/recibo ou evidencia de envio quando o ambiente externo estiver disponivel.

## 13. Etapa 8 - Portal da Transparencia Fiscal publico

**Objetivo:** criar o portal publico exigido pelo PE042, separado do backoffice existente e alimentado automaticamente pelos dados contabilizados.

### Desenvolvimento

- Criar dominio/rotas publicas independentes, sem exigir autenticacao para consultas publicas.
- Criar projecao de publicacao versionada, com mascaramento de CPF/CNPJ quando necessario, revisao LGPD e tempo maximo de atualizacao definido.
- Publicar empenhos, liquidacoes, pagamentos, desembolsos extraorcamentarios, convenios, licitacoes, dispensas, inexigibilidades, contratos e processos relacionados.
- Exibir unidade orcamentaria, funcao, subfuncao, natureza, programa, acao, fonte, beneficiario e identificadores permitidos por lei.
- Publicar receita prevista, lancada e arrecadada, com categoria, origem, especie, fonte, unidade gestora, comparativos e evolucao.
- Publicar balancetes, RREO, RGF, balanco anual, outros demonstrativos e arquivos avulsos com titulo/subtitulo configuraveis.
- Implementar pesquisa, filtros, ordenacao, paginacao, graficos e consulta direta de receitas, despesas e demonstrativos.
- Disponibilizar exportacao CSV, TXT e PDF gerada a partir da mesma consulta publica.
- Disponibilizar API publica versionada, documentada, com limite de requisicoes, filtros, paginacao e dados abertos.
- Implementar menu de ajuda, manual de navegacao, FAQ, contato e canal de suporte ao cidadao.
- Implementar testes de acessibilidade, responsividade, seguranca de dados e consistencia entre portal e sistema interno.

### Criterios de aceite

- Ao registrar, liquidar e pagar um empenho, o dado aparece no portal no prazo de atualizacao definido, com os mesmos valores do livro interno.
- Cidadao filtra despesa e receita, exporta CSV/TXT/PDF e consulta o mesmo resultado pela API publica.
- Dados pessoais, sigilosos ou sem base legal nao sao expostos.
- RREO, RGF, balancetes e balanco anual publicados sao os documentos gerados pelo modulo contabil e mantem historico de versao/publicacao.

## 14. Etapa 9 - Service Desk, base modelo, POC e entrada em producao

**Objetivo:** tornar a entrega demonstravel em tres reunioes e operacional apos a contratacao.

### Service Desk

- Completar abertura, categorizacao, prioridade, responsavel, status, interacoes, historico, encerramento e painel de SLA.
- Integrar e-mail bidirecional, telefone, WhatsApp e chat online por fornecedores definidos; registrar todos os contatos no ticket.
- Publicar horario comercial, canais de suporte, matriz de escalonamento e procedimento de incidente.

### Base modelo obrigatoria

- Configurar municipio, exercicio, ao menos duas unidades gestoras e tres perfis segregados.
- Carregar plano de contas, fontes, PPA, LDO, LOA, CMD, MBA, dotacoes, fornecedores, licitacao, contrato, empenhos, notas, liquidacoes, retencoes, pagamentos e contas bancarias.
- Carregar bens, estoque, divida ativa, divida consolidada, dados de relatorios legais, tickets e historico de auditoria.
- Preparar arquivos modelo funcionais para TCE-PB, SICONFI, obrigacoes fiscais e importacao de notas, com validacao e log de erros.
- Preparar massa de dados que demonstre duas unidades, bloqueio de acesso, aprovacao segregada, lancamento corrigido/anulado e estorno de pagamento.

### Roteiro das tres reunioes

| Reuniao | Blocos demonstrados | Resultado minimo |
| --- | --- | --- |
| 1 | Configuracao, seguranca, planejamento, creditos adicionais e execucao da despesa. | Demonstrar segregacao, PPA/LDO/LOA, saldo e ciclo completo ate pagamento/estorno. |
| 2 | Tesouraria, patrimonio, estoque, licitacoes, contratos, protocolo, relatorios e assinaturas. | Demonstrar conciliacao, efeitos patrimoniais, execucao contratual e relatorios oficiais. |
| 3 | Integracoes, Portal da Transparencia e suporte. | Demonstrar arquivos/retornos, captura fiscal, publicacao automatica, API, exportacoes e Service Desk. |

### Entrada em producao

- Criar plano de migracao, mapeamento de campos, validacao, totais de controle, excecoes, reconciliacao e aceite municipal.
- Manter ambientes separados de desenvolvimento, homologacao, treinamento e producao.
- Executar testes de carga, seguranca, acessibilidade, backup/restore, autorizacao, integracao e regressao contabil.
- Treinar por perfil: planejamento, contabilidade, tesouraria, licitacoes, patrimonio, transparencia, controle interno e suporte.
- Executar operacao assistida, acompanhar indicadores, registrar incidentes e aprovar cada modulo antes de efetivar sua operacao.

### Criterios de aceite

- POC e executada inteiramente no produto, sem alteracao manual de banco, script improvisado ou dado nao rastreavel entre as reunioes.
- Cada requisito possui evidencia preparada: operacao, relatorio, arquivo, log, protocolo, consulta publica, erro tratado ou permissao bloqueada.
- Dados migrados possuem reconciliacao aceita pelo contador/tesoureiro e plano de reversao testado.
- Equipe municipal abre chamado, recebe atendimento e consulta historico pelos canais contratados.

## 15. Ordem de prioridade e marcos de liberacao

| Marco | Entregas obrigatorias | Decisao |
| --- | --- | --- |
| M0 - Viabilidade | Etapa 0 concluida, layouts e parceiros confirmados, matriz 100% classificada. | Decidir se ha condicao de participar. |
| M1 - Plataforma confiavel | Etapa 1 concluida, incluindo segregacao por unidade, auditoria, Decimal, migrations e backup. | Autorizar desenvolvimento contabil regulado. |
| M2 - POC contabil basica | Etapas 2 e 3 concluidas, com planejamento e ciclo de despesa integral. | Validar internamente os Blocos 1 a 3 da POC. |
| M3 - POC financeira completa | Etapas 4 e 5 concluidas, com tesouraria, patrimonio, estoque, contratos e protocolo. | Validar internamente os Blocos 4 a 6. |
| M4 - Conformidade externa | Etapas 6 e 7 concluidas, com relatorios, ICP-Brasil, TCE-PB, SICONFI e obrigacoes fiscais testadas. | Validar internamente os Blocos 7 e 8. |
| M5 - Portal e suporte | Etapas 8 e 9 concluidas, com portal publico, API, exportacoes, base modelo e Service Desk. | Executar simulacao integral das tres reunioes. |

Nao avancar para apresentacao comercial com marco anterior incompleto. O PE042 nao trata cobertura parcial como resultado aceitavel.

## 16. Indicadores de prontidao

| Indicador | Meta antes da POC |
| --- | --- |
| Itens do checklist classificados | 100% dos requisitos aplicaveis. |
| Itens criticos em status parcial/ausente | Zero. |
| Cenarios da POC executados em simulacao | 100%, em tres reunioes ou menos. |
| Fluxos financeiros com testes de autorizacao, concorrencia e estorno | 100% dos fluxos criticos. |
| Relatorios oficiais | Gerados com dados reais da base modelo e validados pelo contador. |
| Integracoes externas | Homologadas, ou contorno funcional formalmente aceito para ambiente de POC. |
| Portal publico | Dados internos e publicos reconciliados para todos os cenarios demonstrados. |
| Auditoria | Inclusao, alteracao, exclusao/cancelamento, aprovacao, pagamento, estorno, exportacao e consulta sensivel cobertos. |
| Backup e restore | Recuperacao executada e registrada no ambiente de homologacao. |

## 17. Riscos e condicoes de nao participacao

- Nao receber layouts vigentes ou acesso de homologacao para TCE-PB, STN, Receita Federal, banco, ICP-Brasil ou captura fiscal.
- Nao conseguir validacao de contador publico para PCASP, MCASP, relatorios e regras de fechamento.
- Existir requisito de integracao que dependa de convenio, certificado ou fornecedor contratado sem prazo compativel com a POC.
- Tentar demonstrar telas sem operacao, arquivos sem geracao, dados sem origem ou integracoes sem status/erro/historico.
- Apresentar dados de duas unidades sem bloqueio real de acesso e aprovacao segregada.
- Expor dados pessoais no portal ou publicar valores diferentes dos demonstrativos internos.
- Manter valores financeiros em `Float`, sem reconciliacao e sem trilha de estorno/auditoria adequada.

Enquanto qualquer condicao critica acima persistir, a posicao correta e: **o CeleriFlow possui componentes reaproveitaveis para o PE042, mas ainda nao possui aderencia demonstravel de ponta a ponta para a POC ou implantacao de Lagoa Seca/PB.**
