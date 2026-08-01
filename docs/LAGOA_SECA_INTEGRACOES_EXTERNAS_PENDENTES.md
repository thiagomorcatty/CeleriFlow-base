# Lagoa Seca/PB - Integracoes Externas Pendentes

Este inventario separa conexoes que dependem de credenciamento, layout, certificado ou ambiente de terceiros. O catalogo do CeleriFlow permite registrar configuracoes `MOCK`, `HOMOLOGACAO` e `PRODUCAO`, mas nenhum conector desta lista deve ser tratado como integrado ate haver adaptador, teste externo e aceite documentado.

## Prioridade para o escopo PE042

| Integracao | Uso no contrato | O que pesquisar/solicitar | Ambiente e evidencias para aceite | Responsavel externo inicial | Status |
|---|---|---|---|---|---|
| TCE-PB / SAGRES | Prestacao de contas e remessas municipais | Layout vigente por competencia, manual, validador, tipos de remessa, credenciamento, certificado e procedimento de reenvio | Ambiente de teste, arquivo validado, protocolo/retorno e tratamento de rejeicao | Contador + TI municipal | Pendente |
| SICONFI / STN | MSC, DCA, RREO e RGF | Layout/esquema vigente, forma de transmissao, credencial/certificado, validador e calendario | Ambiente ou validador oficial, lote aceito e protocolo/retorno | Contador | Pendente |
| PNCP | Publicacao de licitacoes, atas e contratos | Cadastro do orgao, perfil de integracao, manual/API, credencial, limites, ambientes de treinamento e homologacao | Publicacao de teste, consulta publica, retorno/protocolo e idempotencia em reenvio | Compras + TI municipal | Pendente |
| Bancos: CNAB, OFX, API e PIX | Pagamentos, extratos e conciliacao | Banco/agencia/conta, convenio, layout CNAB, arquivos retorno, OFX, API/PSP, chaves, IPs permitidos e politica de certificacao | Sandbox/homologacao, remessa e retorno conciliados, extrato importado e pagamento teste sem efeito financeiro real | Tesouraria + gerente bancario | Pendente |
| NF-e, CT-e e NFS-e | Captura/validacao de documentos fiscais para liquidacao | Provedor aplicavel, API/consulta, regras de autorizacao, XML/PDF, certificado e-CNPJ A1 e ambiente de homologacao | Documento de teste consultado/importado, XML validado e vinculo a fornecedor/empenho | Contabilidade + TI municipal | Pendente |
| EFD-Reinf e eSocial de prestadores | Obrigacoes de retencoes e prestadores, se exigidas pelo fluxo municipal | Eventos aplicaveis, tabelas, regras de procuraçao, certificado, ambiente restrito de producao e retornos | Evento de teste aceito/validado, recibo e reconciliacao por competencia | RH/Contabilidade + procurador fiscal | Pendente |
| DIRF, SEFIP e DCTFWeb | Arquivos/obrigacoes somente quando aplicaveis a competencia e legislacao | Obrigacao vigente, leiaute, programa validador, prazo e relacao com eSocial/EFD-Reinf | Arquivo validado ou recibo oficial, conforme obrigacao aplicavel | Contabilidade | Pendente |
| ICP-Brasil | Assinatura de documentos e arquivos oficiais | Tipo de certificado aceito (A1/A3), cadeia, middleware/token, politica de guarda e responsavel pelo certificado | Assinatura validada por verificador externo e evidencia do certificado usado | TI municipal + autoridade certificadora | Pendente |
| Diario Oficial | Publicacao de atos e documentos, se houver canal integrado | Fornecedor/canal, API ou layout, credenciais, fluxo de publicacao, protocolo e retificacao | Publicacao de homologacao e protocolo de retorno | Secretaria responsavel + TI municipal | Pendente |

## Operacionais, sem bloqueio inicial do PE042

| Integracao | Finalidade | O que obter | Status |
|---|---|---|---|
| SMTP institucional | Alertas, chamados e comunicacoes | Host, porta, remetente autorizado, autenticacao e politica de SPF/DKIM/DMARC | Pendente |
| WhatsApp/BSP | Notificacoes e atendimento registrado | BSP contratado, templates aprovados, webhook, credenciais e politica LGPD | Pendente |
| Firebase Authentication | Login dos usuarios municipais | Projeto, responsavel, politica de provisionamento, dominios autorizados e usuarios da POC | Pendente: os usuarios de teste ainda nao existem no Firebase |

## Sequencia de trabalho por integracao

1. Registrar o orgao/provedor, responsavel, URL de documentacao, ambiente disponivel e canal de suporte.
2. Obter termos de adesao, credenciais de homologacao, certificados e layouts. Segredos devem ficar em cofre/variavel de ambiente, nunca no banco ou documento.
3. Configurar a conexao no CeleriFlow como `HOMOLOGACAO`, mantendo `MOCK` ate existir adaptador e credencial validada.
4. Implementar o adaptador com validacao, fila/reprocessamento, idempotencia, log tecnico e captura de retorno.
5. Executar caso de homologacao com dados permitidos, salvar arquivo/payload mascarado, protocolo/recibo e retorno de erro ou sucesso.
6. Obter aceite do responsavel municipal e somente entao habilitar `PRODUCAO` com plano de reversao e monitoramento.

## Informacoes a registrar na pesquisa

- URL da documentacao, versao e data de vigencia do layout.
- Ambiente disponivel: sandbox, treinamento, homologacao, validador local ou somente producao.
- Tipo de autenticacao: OAuth, token, mTLS, certificado A1/A3, IP allowlist ou outro.
- Cadastro necessario, perfis autorizados, procuracao e prazo de liberacao.
- Limites de requicao, janelas de envio, regras de retificacao e reprocessamento.
- Dados de teste permitidos, criterios de aceite e forma de obter protocolo/recibo.
- Canal de suporte, SLA e procedimento em indisponibilidade.

## Fora de escopo sem decisao formal

Saude, educacao e assistencia social nao fazem parte do PE042. Integracoes como e-SUS, Educacenso/INEP e CadUnico/SUAS devem ser levantadas somente se forem adicionadas ao contrato ou a outro projeto municipal.
