# Plano de Adequacao ao Edital - Divino de Sao Lourenco/ES

**Referencia:** Pregao Eletronico SRP no 04/2026, Processo Administrativo no 1026/2026  
**Documento de requisitos:** `docs/Checklist_Requisitos_e_POC_Divino_Sao_Lourenco.md`  
**Produto:** CeleriFlow  
**Status inicial:** MVP funcional avancado / pre-producao  
**Objetivo:** transformar o CeleriFlow em uma solucao comprovadamente aderente ao escopo tecnico do edital, com evidencias para POC, implantacao e operacao municipal.

## 1. Premissas e decisao de escopo

O checklist tecnico possui 3.957 ocorrencias numeradas. Elas nao equivalem todas a requisitos unicos, mas representam um escopo amplo de ERP municipal, portais publicos, integracoes regulatorias, sistemas especializados de Educacao e Saude, rastreamento veicular e requisitos de operacao.

O CeleriFlow nao deve declarar atendimento integral enquanto cada requisito aplicavel nao tiver uma destas classificacoes, evidencias e aceite formal:

| Classificacao | Definicao |
| --- | --- |
| Atende | Fluxo completo em producao, com permissao, auditoria, relatorio/documento e demonstracao repetivel. |
| Atende parcialmente | Parte do fluxo existe, mas falta regra, integracao, portal, relatorio, seguranca ou etapa operacional. Nao deve contar como atendimento na POC sem aceite expresso. |
| Nao atende | Nao ha funcionalidade utilizavel ou a implementacao e apenas estrutural. |
| Nao aplicavel | Apenas com justificativa juridica e esclarecimento formal do Municipio. |

Antes de qualquer compromisso comercial, deve ser obtido o edital e seus anexos originais, incluindo planilha de itens, regras da POC, cronograma de implantacao, exigencias de migracao, suporte, SLA e criterios de pontuacao. O documento extraido aponta duas inconsistencias que precisam de pedido de esclarecimento:

- Contabilidade Publica da Camara consta na planilha de precos, sem checklist tecnico proprio.
- Previdencia consta no Termo de Referencia, mas aparentemente nao esta entre os itens precificados.
- Rastreamento, aplicativo e equipamentos aparecem no Termo de Referencia sem item autonomo de equipamento na planilha.

## 2. Governanca do programa

### 2.1 Frentes de trabalho

| Frente | Responsabilidade |
| --- | --- |
| Produto e POC | Converter o edital em backlog, definir demonstracoes, registrar evidencias e controlar aderencia. |
| Plataforma e seguranca | Identidade, autorizacao, auditoria, LGPD, arquivos, observabilidade, CI/CD, backup e recuperacao. |
| Financeiro e contabilidade | Orcamento, execucao, tesouraria, contabilidade, planejamento e prestacao de contas. |
| Receita | Cadastro tributario, arrecadacao, NFS-e, ITBI, fiscalizacao, cobranca e integracoes fiscais. |
| Suprimentos | Almoxarifado, patrimonio, compras, licitacoes, contratos, PNCP e TCE. |
| Pessoas | RH, folha, portal do servidor e, se confirmado, RPPS. |
| Cidadao e transparencia | Portal institucional, transparencia, e-SIC, autoatendimento e comunicacoes. |
| Educacao | Academico, merenda, biblioteca, transporte, portais e Educacenso. |
| Saude e social | Saude, regulacao, laboratorio, farmacia, e-SUS, assistencia social e CadUnico/SUAS. |
| Especializados | Frotas/rastreamento, custos, BI, controle interno, meio ambiente, VAF e assistente virtual. |

### 2.2 Donos obrigatorios de regra

O desenvolvimento deve ter validacao recorrente dos seguintes papeis externos ou internos, pois regras legais nao podem ser inferidas apenas pelo time de engenharia:

- Contador publico e responsavel pelo envio ao TCE-ES.
- Procuradoria e controle interno municipal.
- Gestor tributario e fiscal de tributos.
- Gestor de RH e responsavel pelo eSocial/RPPS, se aplicavel.
- Secretarias de Educacao, Saude e Assistencia Social.
- Encarregado de dados/DPO e seguranca da informacao.
- Banco arrecadador, certificados digitais, integradores governamentais e fornecedores de rastreamento.

### 2.3 Artefatos obrigatorios para cada requisito

Nenhum requisito deve ser marcado como atendido sem:

1. Identificador do item no checklist e descricao de regra de negocio.
2. Historia de usuario, criterios de aceite e responsavel funcional.
3. Especificacao de permissao, auditoria e tratamento de dados pessoais.
4. Testes automatizados onde houver calculo, autorizacao, integracao ou movimentacao financeira.
5. Roteiro de demonstracao da POC, massa de dados e evidencia de execucao.
6. Manual de operacao, relatorio/documento resultante e plano de suporte quando aplicavel.

## 3. Etapa 0 - Descoberta, matriz de aderencia e desenho de implantacao

**Objetivo:** transformar o edital em escopo contratual verificavel e eliminar ambiguidades antes de desenvolver.

### Entregaveis

- Matriz requisito a requisito contendo: item, modulo, classificacao atual, evidencia, prioridade, dependencia, responsavel e criterio de aceite.
- Mapa de requisitos duplicados e requisitos que pertencem ao mesmo fluxo.
- Plano de POC por cenario, com dados ficticios, usuarios, permissao, roteiro e resultado esperado.
- Mapa de integracoes por orgao, formato, ambiente de homologacao, certificado, prazo e responsavel.
- Diagnostico de dados legados e plano de migracao para ao menos seis meses, quando exigido.
- Documento de decisao sobre isolamento por prefeitura: banco/infraestrutura exclusiva ou tenancy com isolamento tecnico verificavel.
- Pedidos formais de esclarecimento sobre Camara, Previdencia, rastreamento/equipamentos, POC e itens precificados.

### Criterios de aceite

- Todos os 3.957 itens possuem classificacao inicial e dono.
- Os requisitos eliminatorios da POC estao identificados.
- Ha aprovacao funcional do contador, tributario, RH, Educacao, Saude e Controle Interno para os respectivos dominios.
- Nenhuma funcionalidade e apresentada comercialmente como concluida sem evidencia.

### Dependencias

- Edital e anexos originais.
- Acesso a layouts oficiais e ambientes de homologacao de TCE-ES, STN, PNCP, bancos e integradores.
- Definicao municipal de legislacao tributaria, plano de contas, organograma, calendarios, regras de folha e regras setoriais.

## 4. Etapa 1 - Fundacao de plataforma, seguranca e operacao

**Objetivo:** tornar a base apta a processar dados municipais e servir de fundacao para todos os modulos.

### Desenvolvimento

- Reestruturar RBAC para separar visualizar, incluir, alterar, excluir, aprovar, assinar, exportar e administrar.
- Implementar ABAC por secretaria, unidade, escola, unidade de saude, equipe, profissional, caso sigiloso e vinculo com o cidadao.
- Criar trilha de auditoria append-only para autenticacao, consulta sensivel, alteracao, exclusao, impressao, exportacao, assinatura e alteracao de permissao.
- Registrar usuario, perfil, data/hora, IP confiavel, recurso, operacao, justificativa e valores anterior/posterior quando aplicavel.
- Criar politica de retencao, descarte, classificacao, atendimento ao titular e inventario de tratamento LGPD.
- Implementar bloqueio por tentativas indevidas, recuperacao de senha auditada, expiracao/inativacao de usuario e politicas de senha.
- Implementar certificados digitais ICP-Brasil A1/A3 ou integracao homologada quando a assinatura qualificada for obrigatoria.
- Criar servico central de documentos: PDF, CSV, XLSX, QR Code de autenticidade, consulta publica controlada, modelos e fila de geracao.
- Fortalecer upload: validacao por magic bytes, antivirus, limites por contexto, bloqueio de formatos indevidos, ciclo de vida Blob/banco e quarentena.
- Adicionar headers de seguranca, rate limit distribuido, protecao contra automacao, logs centralizados e monitoramento de erro.
- Criar migrations versionadas, CI, validacao Prisma, lint, testes, build, revisao de dependencias e bloqueio de deploy com falha.
- Implantar backup, teste de restauracao, RPO/RTO, health checks, alertas, runbooks e monitoramento de jobs.
- Criar infraestrutura de fila/outbox para e-mail, SMS, WhatsApp, relatorios e todas as integracoes externas.

### Criterios de aceite

- Um usuario com permissao de visualizacao nao consegue gravar ou excluir por chamada direta.
- Dados de Saude, Social, RH, Tributacao e GED respeitam escopo e deixam evidencias de leitura sensivel.
- Toda alteracao de permissao, dado regulado ou evento financeiro e auditavel sem permitir edicao pelo operador comum.
- Restore de backup e simulacao de incidente sao executados e documentados.
- Pipeline de CI executa migrations, testes relevantes e build antes da liberacao.

### Dependencias

- Etapa 0 concluida.
- Definicao de provedor de monitoramento, armazenamento de logs, antivirus e mensageria.

## 5. Etapa 2 - Cadastros mestres, documentos e processos eletronicos

**Objetivo:** consolidar a base transversal para pessoas, empresas, enderecos, documentos, protocolos e fluxo administrativo.

### Desenvolvimento

- Consolidar cadastro unico de pessoa fisica, juridica, fornecedor, contribuinte, servidor, aluno, paciente e familia, com deduplicacao e historico.
- Integrar consulta CPF/CNPJ SERPRO, quando contratada e autorizada, e DNE/CEP para enderecamento.
- Implementar historico antes/depois e vinculacao ao processo administrativo para alteracoes cadastrais reguladas.
- Completar processos: formularios dinamicos, modelos por assunto, documentos obrigatorios, fluxo grafico, tramite/recebimento em lote, apensacao, anexacao, cronograma e comentarios.
- Criar portal externo de protocolo, consulta com chave de acesso, sigilo parametrizavel, comprovante, notificacao e participacao do cidadao.
- Implementar autenticidade de documentos por QR Code/chave, assinaturas multiplas, solicitacao de assinatura externa e visualizacao no navegador.
- Avaliar e implementar OCR, digitalizacao em lote e extracao estruturada, apenas se os requisitos permanecerem obrigatorios apos a Etapa 0.
- Completar Ouvidoria e integracao com e-SIC, mantendo anonimato, sigilo, prazo, recurso e estatisticas quando exigidos.

### Criterios de aceite

- Processo externo pode ser aberto, acompanhado, respondido, assinado e encerrado sem acesso ao painel interno.
- Cada documento e processo possui historico, permissao, autenticidade publica e rastreabilidade de acesso.
- O fluxo impede avancar quando documento ou providencia obrigatoria estiver pendente.

### Dependencias

- Etapa 1 concluida.
- Contratacao de SERPRO, assinatura digital e provedor de comunicacao, conforme decisoes da Etapa 0.

## 6. Etapa 3 - Financeiro, contabilidade publica e planejamento municipal

**Objetivo:** concluir o nucleo de execucao orcamentaria, contabil e de prestacao de contas exigido pelo Municipio e pela Camara, se confirmado.

### Desenvolvimento

- Concluir PPA, LDO, LOA, programas, acoes, metas fisicas/financeiras, fontes, cronograma de desembolso, creditos adicionais e consolidacao de unidades gestoras.
- Consolidar PCASP, MCASP, NBCASP, LCP/CLP, eventos/roteiros contabeis, identificador de fato contabil e regras de integracao entre modulos.
- Garantir uso exclusivo de Decimal em valores monetarios e reconciliar dados ainda modelados com Float.
- Completar reserva, empenho, liquidacao, pagamento, anulacao, restos a pagar, retencoes, adiantamentos, suprimento de fundos e despesa extraorcamentaria.
- Implementar bancos, contas, ordem bancaria, cheques, borderos, PIX, transferencias, conciliacao e importacao OFX/CNAB.
- Implementar fechamento mensal/anual, bloqueio de periodo, virada de exercicio, balancetes, balanco, DCASP, razoes, boletim de tesouraria e demonstrativos legais.
- Gerar RREO, RGF, SICONFI/MSC, SIOPS, SIOPE, EFD-Reinf e layouts TCE-ES aplicaveis.
- Criar motor de remessa, retorno, validacao, protocolo, rejeicao, reenvio e conciliacao para cada transmissao oficial.
- Implementar Sistema Integrado de Custos: centros e objetos de custo, planos acumuladores, rateio, apuracao e demonstrativos.

### Criterios de aceite

- Um cenario completo de dotacao ate pagamento gera os lancamentos e saldos esperados nos subsistemas orcamentario, patrimonial, compensacao e custos.
- Fechamento bloqueia o periodo e possui procedimento auditavel de estorno/reabertura autorizado.
- Arquivos oficiais passam pelo validador/homologacao do respectivo orgao antes de serem considerados atendidos.
- Prefeitura e Camara possuem consolidacao e segregacao conforme regra validada na Etapa 0.

### Dependencias

- Etapas 1 e 2 concluidas.
- Contador publico responsavel pelo PCASP, regras de fechamento e layouts vigentes.
- Credenciais/homologacao de bancos, STN, TCE-ES, SIOPS, SIOPE e Receita Federal.

## 7. Etapa 4 - Receita, arrecadacao e obrigacoes tributarias

**Objetivo:** transformar o modulo tributario em sistema fiscal municipal completo, parametrizavel e integrado ao financeiro.

### Desenvolvimento

- Completar cadastro imobiliario, BCI, cadastro mercantil, vigencias, georreferenciamento, relacionamento pessoa-imovel-empresa e historico cadastral/financeiro.
- Implementar motor de regras tributarias versionado por vigencia: IPTU, taxas, ISS, contribuicao de melhoria, beneficios, isencoes, imunidades, multas, juros e atualizacao.
- Implementar DAM, segunda via, codigo de barras, PIX dinamico, boleto, CNAB/FEBRABAN, debito automatico, baixa, rejeicao, conciliacao e pagamento parcial/agrupado.
- Completar divida ativa, parcelamento/reparcelamento, compensacao, transferencia, restituicao, prescricao, decadencia, deposito administrativo/judicial e cobranca administrativa.
- Implementar ITBI: declaracao publica, validacao fiscal, calculo, guia, certidao, transferencia parametrizavel e acompanhamento por processo.
- Implementar DTEL: caixa postal, ciencia, prazo tacito, procuracao, comunicacao em lote e aviso por e-mail/SMS.
- Implementar NFS-e conforme padrao confirmado: ABRASF/NFS-e Nacional, XML, RPS, webservice, DANFSe, autenticidade, cancelamento, substituicao, carta de correcao, retencoes, declaracao mensal e emissao avulsa.
- Implementar Simples Nacional e DES-IF/ISS Bancario, incluindo importacao, validacao, cruzamentos, notificacoes, apuracao e fiscalizacao.
- Completar fiscalizacao: planejamento, ordem de servico, TIAF, auto, termo, calculos, documentos, produtividade e malha fiscal.
- Implementar REDESIM/Junta Comercial, quando o municipio exigir e disponibilizar integracao.

### Criterios de aceite

- Cada credito tributario apresenta memoria de calculo, vigencia da regra, processo de suporte, historico e reflexo contabil.
- Pagamento por arquivo bancario ou PIX realiza baixa idempotente e conciliacao rastreavel.
- Uma NFS-e de homologacao passa pelo fluxo completo de emissao, XML, validacao publica, ISS, guia, cancelamento/substituicao e auditoria.
- ITBI, DTEL, Simples e DES-IF possuem demonstracao de ponta a ponta com dados de teste.

### Dependencias

- Etapa 3 concluida para integracao contabil e arrecadacao.
- Legislacao tributaria local, convenios bancarios, credenciais fiscais, certificado digital e definicao do padrao NFS-e aplicavel.

## 8. Etapa 5 - Suprimentos, patrimonio, licitacoes e contratos

**Objetivo:** concluir o ciclo de contratacao publica, materiais, bens e execucao contratual conforme Lei no 14.133/2021.

### Desenvolvimento

- Completar almoxarifado: catalogo, classificacao, multiplos depositos, enderecamento, lotes, validade, saldo inicial, ponto de ressuprimento, inventario bloqueante e relatorios.
- Integrar solicitacao, autorizacao de fornecimento, entrada de nota, estoque, patrimonio, empenho, liquidacao e ateste, sem duplicidade de dados.
- Completar patrimonio: grupos/classes, tombamento automatico, anexos, transferencia, inventario, comissoes, reavaliacao, depreciacao, estornos, QR Code e relatorios.
- Completar compras: planejamento anual, agrupamento de solicitacoes, pesquisa de precos, cotacao pelo fornecedor, comparativo, comissoes e dotacao.
- Completar licitacoes: modalidades, fases, publicacao, recursos, impugnacao, pareceres, julgamento, homologacao, adjudicacao, anulacao e revogacao.
- Implementar pregao eletronico: lotes/itens, habilitacao, propostas, lances por web/mobile, negociacao, ata e trilha de auditoria.
- Implementar contratos/convenios: vigencia, responsaveis, parcelas, medicao, aditivos, suspensao, rescisao, alertas e execucao integrada ao financeiro.
- Integrar PNCP e layouts de prestacao de contas de licitacoes, contratos, patrimonio e almoxarifado para o TCE-ES.

### Criterios de aceite

- Um processo de compra percorre solicitacao, cotacao, licitacao/dispensa, contrato, empenho, AF, recebimento, liquidacao e pagamento com integracao contabil.
- Um fornecedor externo envia cotacao e participa de lance em ambiente controlado.
- Publicacoes PNCP e arquivos TCE-ES possuem protocolo, retorno, rejeicao e reprocessamento.

### Dependencias

- Etapas 1, 2 e 3 concluidas.
- Credenciamento PNCP e homologacao dos layouts TCE-ES.

## 9. Etapa 6 - Portais publicos, transparencia e comunicacao

**Objetivo:** separar definitivamente area interna e area publica, atendendo transparencia, LAI, autoatendimento e portal institucional.

### Desenvolvimento

- Criar Portal da Transparencia publico, responsivo, acessivel e independente da autenticacao interna.
- Publicar automaticamente receitas, despesas, empenhos, liquidacoes, pagamentos, contratos, licitacoes, obras, patrimonio, almoxarifado, folha, diarias, planejamento e documentos exigidos.
- Implementar filtros, busca por palavra-chave, ficha detalhada, exportacao CSV/XLSX/PDF e dados abertos em formatos nao proprietarios.
- Implementar e-SIC: pedido, prazo, resposta, recurso, publicacao, estatistica e informacao sobre SIC fisico.
- Criar CMS do Portal Institucional: menus, paginas, agenda, noticias, galerias, arquivos, links, telefones, enquetes, questionarios e newsletter.
- Implementar acessibilidade: HTML semantico, teclado, contraste, tamanho de fonte, mapa do site, VLibras quando exigido, textos alternativos e transcricoes.
- Criar Portal do Contribuinte para protocolos, DTEL, NFS-e, ITBI, guias, certidoes, declaracoes e acompanhamento.
- Criar Portal do Servidor para holerites, informes, ponto, ferias, dados funcionais e solicitacoes, conforme requisitos validados.
- Implantar e-mail, SMS e WhatsApp por meio de servico auditavel, com opt-in quando aplicavel e tratamento de falhas.

### Criterios de aceite

- Cidadao sem login acessa dados publicos, busca, filtra e exporta informacoes sem expor dados pessoais indevidos.
- Um pedido e-SIC percorre solicitacao, resposta, recurso e relatorio estatistico.
- Cada dado publicado e rastreavel ao modulo de origem e tem prazo de atualizacao definido.
- Auditoria de acessibilidade e navegacao por teclado e leitor de tela e aprovada.

### Dependencias

- Etapas 1 a 5, pois os portais devem consumir dados confiaveis e autorizados dos modulos internos.
- Validacao juridica sobre mascaramento, dados pessoais e informacoes sigilosas.

## 10. Etapa 7 - RH, folha, portal do servidor e previdencia

**Objetivo:** tornar RH e folha aptos para calculo legal, operacao descentralizada e obrigacoes acessorias.

### Desenvolvimento

- Completar cadastro funcional, vinculos, cargos, carreiras, referencias, dependentes, pensoes, cessao, historico e documentos.
- Implementar regras de admissao, desligamento, ferias, licencas, afastamentos, medicina do trabalho, CAT, PPRA, EPI, CIPA, vale-transporte e tempo de servico.
- Implementar ponto: relogios, escalas, tolerancias, banco de horas, apuracao e relatorios.
- Implementar concursos e processos seletivos, quando mantidos no escopo.
- Substituir o calculo de folha simulado por motor parametrizavel de verbas, formulas, incidencias, limites, consignados, rescisao, 13o, ferias, RGPS e RPPS.
- Integrar folha a contabilidade, tesouraria, eSocial, EFD-Reinf, DCTFWeb e arquivo bancario.
- Entregar portal do servidor e documentos digitais conforme a Etapa 6.
- Se a Previdencia for confirmada: implementar RPPS, contribuicoes, arrecadacao, beneficios, simulacao, CTC, portarias, folha de inativos e anexos TCE.

### Criterios de aceite

- Folha de homologacao confere com calculo manual validado pelo RH/contador para todos os regimes usados pelo Municipio.
- Eventos eSocial e obrigacoes federais passam no ambiente de homologacao correspondente.
- Usuario de uma secretaria opera somente seus servidores e nao acessa dados funcionais fora de seu escopo.

### Dependencias

- Etapas 1, 3 e 6 concluidas.
- Legislacao municipal de pessoal, tabelas de verbas, regras de RPPS e certificado/credenciamento eSocial.

## 11. Etapa 8 - Educacao

**Objetivo:** entregar uma vertical educacional completa, e nao apenas cadastros escolares.

### Desenvolvimento

- Consolidar escolas, profissionais, estudantes, turmas, matrizes, curriculos, periodos, calendarios, salas, turnos, documentos e historicos.
- Implementar matricula, rematricula, transferencias, remanejamento, reclassificacao, vagas, lista de espera publica e regras Educacenso.
- Implementar diario eletronico, frequencia, conteudo, notas, conceitos, recuperacao, fichas descritivas, desempenho, fechamento e historico escolar.
- Criar portais do aluno e professor com controle por escola/turma/disciplina, comunicacoes e bloqueios de periodo.
- Implementar importacao/exportacao Educacenso e validacao do layout vigente.
- Completar biblioteca, merenda escolar, cardapios, restricoes alimentares, TACO, estoque/lote/validade e prestacao de contas de recursos escolares.
- Completar transporte escolar: rotas, pontos, jornadas, veiculos, motoristas, abastecimento, passageiros e integracao com rastreamento.

### Criterios de aceite

- Uma escola executa o ciclo letivo completo, da matricula ao fechamento e emissao do historico.
- Arquivo Educacenso e importado/exportado e aceito no validador da competencia vigente.
- Professor acessa apenas as turmas e disciplinas permitidas; responsavel/aluno acessa apenas seus dados.
- Merenda controla cardapio, restricao, lote, validade, entrada, saida e saldo por escola.

### Dependencias

- Etapas 1, 2, 6 e a integracao de rastreamento da Etapa 10 quando transporte em tempo real for exigido.
- Regras pedagogicas municipais, cadastro INEP e ambiente de validacao Educacenso.

## 12. Etapa 9 - Saude e Assistencia Social

**Objetivo:** entregar operacao assistencial com sigilo, rastreabilidade e integracoes nacionais.

### Desenvolvimento em Saude

- Implementar recepcao, triagem, classificacao de risco, agenda, fila, prontuario, evolucao, prescricoes, procedimentos, atestados, encaminhamentos e documentos clinicos.
- Implementar regulacao, fila, cotas, prestadores, agendamento, TFD, transporte sanitario e historico de solicitacoes.
- Implementar farmacia, estoque por lote/validade, dispensacao, receita, uso continuo e integracao com atendimento.
- Implementar laboratorio: solicitacao, coleta, etiquetas, resultados, assinatura, portal do paciente e integracao de equipamentos quando exigida.
- Implementar odontologia, vacinacao, internacao/observacao, AIH, leitos, cirurgias e faturamento SUS conforme escopo confirmado.
- Integrar e-SUS APS/SISAB, CNES, SIGTAP, BPA/RAAS ou demais conectores exigidos pelo fluxo homologado.
- Criar Portal do Paciente com agendamento, resultados, historico autorizado e ouvidoria.

### Desenvolvimento em Assistencia Social

- Implementar triagem, agenda, prontuario familiar, visitas, PIA, PAIF, PAEFI, violencia, atividades coletivas, beneficios, fila de espera e encaminhamentos.
- Integrar/importar CadUnico conforme permissao e disponibilidade oficial.
- Implementar relatorios SUAS, CRAS/CREAS, IASES e indicadores exigidos pelo Municipio.
- Aplicar controle de acesso por unidade, equipe, profissional, caso e nivel de sigilo, com auditoria obrigatoria de consulta.

### Criterios de aceite

- Profissional de saude ou social nao acessa prontuario fora de sua unidade/equipe/relacao autorizada.
- Um atendimento percorre recepcao, triagem, prontuario, prescricao, farmacia/laboratorio/regulacao e registro de producao quando aplicavel.
- Dados enviados a sistemas nacionais passam em ambiente de homologacao ou validacao oficial.
- Paciente e cidadao acessam exclusivamente seus dados em portais segregados.

### Dependencias

- Etapas 1, 2 e 6 concluidas.
- Validacao clinica/assistencial, credenciais do Ministerio da Saude e permissao formal para CadUnico.

## 13. Etapa 10 - Modulos especializados e requisitos complementares

**Objetivo:** cobrir os modulos que nao pertencem ao nucleo ERP, mas sao exigidos pelo Termo de Referencia.

### Frotas, rastreamento e diario de bordo

- Desenvolver cadastro de veiculos, maquinas, seguros, manutencoes, revisoes, combustivel, multas, rotas, gastos, documentos e relatorios.
- Integrar fornecedor de telemetria/rastreamento com API, dispositivos homologados Anatel, mapa em tempo real, geocerca, alertas, historico de cinco anos e compartilhamento temporario.
- Criar central de alertas, integracao WhatsApp, aplicativo Android/iOS offline para diario de bordo e portal publico de frotas quando exigido.
- Formalizar parceiro responsavel por equipamento, instalacao, lacre, suporte 24x7 e SLA. Estes requisitos nao sao exclusivamente de software.

### Controle interno, BI e custos

- Implementar legislacoes, calendario legal, plano de auditoria, checklists, achados, notificacoes, recomendacoes, relatorios e acompanhamento de limites legais.
- Entregar BI com conectores seguros, modelo semantico, ETL controlado, dashboards, filtros, drill-down, exportacao e segregacao de dados.
- Concluir custos conforme a Etapa 3, com demonstrativos por equipamento publico, centro e objeto de custo.

### Meio ambiente, VAF e assistente virtual

- Completar licenciamento ambiental, condicionantes, enquadramento, cobranca, georreferenciamento, portal externo, denuncia, documentos, prazos e integracoes.
- Implementar acompanhamento do Valor Adicionado Fiscal se constar como item contratual confirmado.
- Implementar assistente virtual apenas sobre base de conhecimento validada, com transferencia para atendimento humano, logs, protecao de dados e sem emitir orientacao juridica/fiscal automatica sem validacao.

### Criterios de aceite

- Cada modulo especializado possui fluxo ponta a ponta, portal quando exigido, relatorios, permissao, auditoria e integracao demonstravel.
- Requisitos de hardware e atendimento humano possuem contrato, parceiro, SLA e plano de suporte, nao apenas funcionalidade no software.

### Dependencias

- Etapas 1, 3 e 6 concluidas.
- Fornecedores homologados de rastreamento, mapas, mensagens e equipamentos.

## 14. Etapa 11 - Migracao, homologacao, POC e entrada em producao

**Objetivo:** converter a entrega de software em capacidade operacional comprovada para a Prefeitura.

### Desenvolvimento e operacao

- Criar extratores, transformacoes, validacoes, reconciliacao e relatorio de excecoes para cada sistema legado.
- Migrar no minimo o periodo e as entidades exigidas no edital, com amostras reconciliadas pelo gestor municipal.
- Executar testes de carga, seguranca, autorizacao, backup/restore, integracao, acessibilidade e regressao de regras criticas.
- Preparar ambientes de desenvolvimento, homologacao, treinamento e producao isolados.
- Criar manuais por perfil, base de conhecimento, plano de treinamento, gravacoes, suporte e matriz de escalonamento.
- Executar POC com roteiro congelado, massa versionada e registro de cada requisito demonstrado.
- Executar operacao assistida e plano de contingencia antes da liberacao definitiva.

### Criterios de aceite

- Cada requisito da POC possui evidencia executada e assinada pelo responsavel funcional.
- Dados migrados possuem relatorio de totais, divergencias, tratamento e aceite.
- Restauracao, indisponibilidade de integracao e reprocessamento de fila foram simulados com sucesso.
- Equipes municipais treinadas conseguem executar os cenarios essenciais sem intervencao do desenvolvimento.
- O Municipio aprova a entrada em producao por modulo, sem liberar modulos incompletos por dependencia comercial.

## 15. Priorizacao objetiva para a POC

Se o edital permitir POC por amostragem, a demonstracao deve priorizar fluxos integrados em vez de telas isoladas:

1. Cadastro unico -> solicitacao de compra -> licitacao/contrato -> empenho -> liquidacao -> pagamento -> transparencia.
2. Cadastro imobiliario -> calculo tributario -> DAM/PIX -> baixa -> contabilidade -> portal do contribuinte.
3. Processo externo -> tramitacao -> anexo -> assinatura -> QR Code -> consulta publica ou sigilosa.
4. Servidor -> evento de folha -> calculo -> contabilizacao -> portal do servidor -> eSocial, se disponivel em homologacao.
5. Aluno -> matricula -> turma -> diario -> avaliacao -> fechamento -> Educacenso.
6. Paciente -> recepcao -> triagem -> prontuario -> prescricao -> farmacia/laboratorio/regulacao -> e-SUS, quando aplicavel.
7. Pedido e-SIC -> resposta -> recurso -> estatistica; e transparencia de despesa/contrato/folha.

Nenhum fluxo deve ser demonstrado como integrado se a integracao for manual, simulada ou sem retorno rastreavel do sistema externo.

## 16. Indicadores de prontidao

| Indicador | Meta para declarar o modulo apto |
| --- | --- |
| Requisitos classificados | 100% dos itens aplicaveis possuem classificacao e evidencia. |
| Requisitos "Atende parcialmente" em POC | Zero, salvo aceite formal do Municipio. |
| Testes de autorizacao e calculo critico | 100% dos cenarios definidos pelo dominio. |
| Integracoes regulatorias | Homologadas ou validadas pelo orgao/fornecedor correspondente. |
| Auditoria | 100% das operacoes reguladas e de dados sensiveis cobertas. |
| Migracao | Totais reconciliados e aceite funcional registrado. |
| Backup/restore | Testado periodicamente dentro do RPO/RTO definido. |
| Acessibilidade publica | Auditoria concluida para fluxos publicos prioritarios. |
| POC | Roteiro executado sem intervencao manual fora do sistema. |

## 17. Riscos que impedem o avanco

- Iniciar modulo regulatorio sem dono funcional e sem layout oficial atualizado.
- Considerar schema, seed ou tela de CRUD como requisito atendido.
- Desenvolver conectores sem ambiente de homologacao, certificado, fila, retorno e reconciliacao.
- Liberar Saude, Assistencia Social, RH ou Tributacao sem ABAC e trilha de consulta sensivel.
- Declarar conformidade com TCE-ES, STN, Receita Federal, PNCP, eSocial, e-SUS ou Educacenso sem validacao do respectivo ambiente.
- Tratar rastreamento, suporte 24x7 e equipamentos como desenvolvimento puramente interno de software.
- Permitir exclusao fisica de dados, contratos ou eventos regulados que exigem arquivamento e auditoria.

## 18. Decisao de participacao

A decisao de participar autonomamente deve ocorrer somente apos a Etapa 0 e deve considerar:

- Quais itens sao eliminatorios na POC.
- Quais modulos e integracoes podem ser homologados dentro do prazo do edital.
- Quais requisitos dependem de parceiro certificado ou fornecedor de hardware.
- Se a Prefeitura aceita implantacao por ondas ou exige todos os modulos desde o inicio.
- Se a capacidade de suporte, migracao, treinamento e operacao atende aos SLAs contratuais.

Enquanto essas respostas nao existirem e as etapas bloqueantes nao estiverem concluidas, a posicao correta e: **o CeleriFlow possui base funcional aproveitavel, mas nao possui ainda aderencia comprovada de ponta a ponta ao edital.**
