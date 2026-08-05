# Plano de levantamento para integração bancária oficial

**Prova de Conceito - Pregão Eletrônico nº 51/2026**  
**CeleriFlow - Integração bancária em produção**

## Objetivo

Após a contratação, a integração bancária será configurada com cada instituição financeira utilizada pela Prefeitura, respeitando o produto contratado, as autorizações do Município e os mecanismos oficiais de segurança do banco.

O banco virtual apresentado na POC demonstra o fluxo completo de consulta, download, tratamento de falhas, arquivamento, auditoria e conciliação. A conexão de produção será feita exclusivamente com a API, arquivo bancário ou canal oficial disponibilizado por cada instituição.

## Princípio de segurança

O CeleriFlow **não solicita nem armazena senha de internet banking de servidores públicos**.

As integrações de produção utilizam o mecanismo aprovado pela instituição financeira, que pode envolver:

- credencial técnica de API;
- OAuth 2.0 com autorização do Município;
- certificado digital A1, A3 ou mTLS;
- troca de arquivos OFX, CNAB, CSV ou outro layout oficial;
- canal corporativo, SFTP ou web service homologado pelo banco.

Os segredos permanecem em cofre ou variáveis de ambiente protegidas. Eles não são exibidos em tela, registrados em logs ou versionados em código.

## Informações institucionais necessárias

| Informação | Finalidade |
|---|---|
| Relação de bancos utilizados pelo Município | Definir os conectores e a ordem de implantação |
| CNPJ e identificação da entidade titular | Formalizar a habilitação da integração junto ao banco |
| Responsável municipal financeiro | Validar contas, permissões e rotinas operacionais |
| Responsável técnico de TI | Apoiar rede, domínio, certificados e segurança |
| Gerente ou canal técnico do banco | Solicitar documentação, ambiente de homologação e credenciais técnicas |
| Produto bancário contratado pelo Município | Identificar se existe API, OFX, CNAB, SFTP ou outro canal permitido |
| Autorizações formais para consulta e automação | Garantir aderência às regras institucionais e bancárias |

## Cadastro das contas a integrar

Para cada conta, será levantado:

| Dado | Uso no CeleriFlow |
|---|---|
| Banco e código de compensação | Identificação da instituição e do conector |
| Agência e número da conta | Associação entre extrato bancário e tesouraria |
| Tipo de conta | Diferenciar corrente, aplicação e conta de transferências |
| Unidade gestora e fonte de recurso | Segregar corretamente registros financeiros e contábeis |
| Finalidade da conta | Identificar tesouraria, FUNDEB, saúde, convênios, aplicações e outras vinculações |
| Situação da conta | Evitar automação em contas encerradas, bloqueadas ou não autorizadas |
| Período inicial de importação | Planejar a carga inicial e a conciliação de abertura |

## Capacidades a confirmar com cada banco

O canal disponível pode variar entre instituições. Para cada banco, serão confirmadas as capacidades abaixo.

| Capacidade | Pergunta de homologação |
|---|---|
| Consulta de saldo | A API ou arquivo informa saldo inicial, créditos, débitos e saldo final? |
| Consulta de movimentações | É possível consultar por conta, período, tipo, valor e documento? |
| Download de extratos | O banco fornece OFX, CNAB, CSV, PDF ou outro formato estruturado? |
| Identificador único | Cada lançamento possui identificador estável para impedir duplicidade? |
| Aplicações e resgates | O extrato identifica aplicação, resgate, fundo e conta de origem/destino? |
| Rendimentos | São disponibilizados rendimento bruto, líquido, IRRF, IOF e saldo acumulado? |
| Receitas constitucionais | O histórico ou código permite identificar FPM, FUNDEB, ICMS, IPVA, ITR e demais repasses? |
| Notificações | O banco oferece webhook, arquivo de retorno ou consulta periódica? |
| Ambiente de homologação | Existe sandbox ou ambiente de testes antes da produção? |

## Contrato técnico a receber do banco

Para integração por API, serão solicitados:

- URL de homologação e URL de produção;
- documentação técnica e versão da API;
- rotas disponíveis para contas, saldos, movimentações e extratos;
- método de autenticação e escopos autorizados;
- modelo de credencial técnica e prazo de expiração;
- necessidade de certificado, mTLS, assinatura de requisição ou VPN;
- IPs de saída, domínios e regras de firewall a liberar;
- limites de requisição, política de retentativas e janela de manutenção;
- códigos de retorno e tratamento de erros;
- layouts e exemplos reais anonimizados de OFX, CNAB, CSV ou JSON;
- política de idempotência para evitar processamento duplicado;
- canal de suporte e SLA para incidentes.

Para integração por arquivo, serão solicitados:

- layout oficial, versão e manual do arquivo;
- meio seguro de troca, como SFTP, portal corporativo ou web service;
- periodicidade de geração e disponibilidade;
- regras de assinatura, criptografia e certificado;
- identificação única dos lançamentos;
- arquivos de exemplo anonimizados e arquivos de retorno;
- regras de reprocessamento e correção de arquivo rejeitado.

## Segurança e conformidade

Antes da ativação em produção, serão validados:

| Controle | Aplicação prática |
|---|---|
| Menor privilégio | A credencial técnica recebe apenas os escopos necessários, inicialmente de consulta |
| Segregação por perfil | Tesouraria, contabilidade, administração e auditoria possuem permissões próprias |
| Gestão de segredos | Tokens, certificados e senhas técnicas ficam fora do código e dos logs |
| Criptografia em trânsito | Comunicação HTTPS/TLS e, quando exigido, mTLS ou canal privado |
| Auditoria | Registro de usuário, horário, conta, operação, resultado, arquivo e hash de integridade |
| Rastreabilidade | Cada execução recebe histórico de sucesso, falha, reprocessamento e evidência associada |
| Proteção de dados | Tratamento compatível com LGPD, políticas municipais e regras da instituição financeira |
| Continuidade | Rotação de credenciais, backup das configurações e procedimento de contingência |

## Fluxo de implantação por instituição

1. Mapear banco, contas, responsáveis e produto bancário contratado.
2. Receber documentação oficial e confirmar o canal técnico disponível.
3. Configurar o conector em homologação, sem dados de produção.
4. Validar autenticação, autorização, consulta de contas, saldo, movimentações e extratos.
5. Conferir os campos recebidos contra a conta de tesouraria e a estrutura contábil municipal.
6. Testar idempotência, indisponibilidade, credencial inválida, arquivo inválido e reprocessamento.
7. Homologar o resultado com Tesouraria e Contabilidade.
8. Configurar produção com credencial restrita e registro de auditoria habilitado.
9. Executar carga inicial controlada e conciliação de abertura.
10. Acompanhar os primeiros ciclos, indicadores de falha e suporte do banco.

## Evidências geradas pelo CeleriFlow

Em cada execução, o sistema mantém:

- conta, período e instituição consultada;
- horário de início e término;
- resultado da operação e mensagem de falha, quando existente;
- quantidade de lançamentos recebidos, incluídos e já processados;
- arquivo original arquivado em repositório privado;
- hash SHA-256 do arquivo para verificação de integridade;
- identificadores externos dos lançamentos;
- usuário responsável pela operação ou automação programada;
- trilha de auditoria e vínculo com a conciliação bancária.

## Critério para ativação em produção

Uma conta somente será ativada após confirmação de que:

- o Município autorizou formalmente a integração;
- o banco forneceu o canal e a documentação oficial;
- a autenticação foi homologada;
- a conta foi identificada corretamente no CeleriFlow;
- extratos e movimentações foram conferidos com a Tesouraria;
- lançamentos repetidos não geram duplicidade;
- erros e indisponibilidades são registrados e tratados;
- a rotina de conciliação apresenta resultado conferível;
- os responsáveis municipais receberam orientação operacional.

## Observação para a Comissão Avaliadora

O banco virtual usado na POC é um ambiente externo de testes, criado exclusivamente para demonstrar os mecanismos de integração, segurança, tratamento de exceções, evidências e conciliação. Ele não representa parceria, homologação ou integração oficial com instituição financeira real.

A implantação real seguirá o procedimento acima para cada banco efetivamente utilizado pela Prefeitura, conforme documentação, autorização e requisitos técnicos de cada instituição.
