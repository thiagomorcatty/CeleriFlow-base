# Divino de São Lourenço/ES — Requisitos de Participação e Checklist Completo da POC

**Processo:** Pregão Eletrônico SRP nº 04/2026 — Processo Administrativo nº 1026/2026

## 3. Alertas de inconsistência do Termo de Referência

- **Alerta:** O item de Contabilidade Pública — Câmara aparece na planilha de preços, mas não existe uma seção técnica autônoma com requisitos próprios. Para preparação da POC, deve-se aplicar ao menos o checklist de Contabilidade Pública até que a Prefeitura esclareça o tratamento específico da Câmara.
- **Alerta:** O TR inclui uma seção de Gestão de Sistema de Previdência, embora esse sistema não apareça entre os 80 itens da proposta. Como a POC remete a todos os requisitos do TR, essa inclusão gera risco e merece pedido de esclarecimento.
- **Alerta:** O TR inclui rastreamento veicular, aplicativo de diário de bordo, portal público e especificações físicas de equipamentos. Esses requisitos parecem complementar o módulo de Frotas, mas não há item separado de fornecimento de equipamentos na planilha de preços.
- **Alerta:** Há duplicações, reinícios de numeração e requisitos fragmentados entre páginas. O checklist mantém essas ocorrências para não alterar a fonte.

## 4. Resumo quantitativo das seções técnicas

| Seção do TR | Requisitos numerados extraídos | Página inicial |
|---|---:|---:|
| Requisitos gerais dos sistemas | 55 | 40 |
| Almoxarifado | 27 | 44 |
| Patrimônio | 32 | 45 |
| Frotas | 14 | 47 |
| Compras, Licitações e Contratos | 79 | 48 |
| Processos Eletrônicos e Digitais | 134 | 54 |
| Contabilidade Pública | 166 | 63 |
| Recursos Humanos e Folha de Pagamento | 201 | 73 |
| Portal do Servidor | 20 | 89 |
| Gestão Tributária | 460 | 91 |
| ITBI | 18 | 125 |
| Domicílio Tributário Eletrônico do Contribuinte | 16 | 126 |
| Nota Fiscal Eletrônica de Serviços | 124 | 128 |
| Simples Nacional | 20 | 139 |
| ISS Bancário | 74 | 141 |
| Portal da Transparência | 51 | 145 |
| Controle Interno | 32 | 149 |
| Meio Ambiente | 63 | 151 |
| Educacional | 965 | 155 |
| Saúde | 933 | 241 |
| Assistência Social | 57 | 305 |
| Business Intelligence | 13 | 309 |
| Portal Institucional | 134 | 310 |
| Rastreamento veicular, aplicativo e equipamentos | 57 | 320 |
| Sistema Integrado de Custos | 20 | 326 |
| Sistema de Previdência | 92 | 327 |
| Acompanhamento do Valor Adicionado Fiscal | 57 | 332 |
| Assistência Virtual para Autoatendimento | 43 | 337 |

**Total de ocorrências numeradas extraídas:** 3957.

> A quantidade acima representa ocorrências numeradas, não necessariamente requisitos únicos, porque diversas subseções reiniciam a numeração e o documento contém duplicações.

# 5. Checklist completo dos requisitos potencialmente avaliáveis na POC

## Requisitos gerais dos sistemas

> características próprias) _(TR, p. 40)_
- [ ] **1.** O sistema deve ser desenvolvido para ser utilizado 100% em ambiente WEB, através de navegador WEB, sem nenhum tipo de emulação, permitindo o acesso em ambiente intranet e internet, em estações Linux e estações Windows, conforme necessidade; _(TR, p. 40)_
- [ ] **2.** O sistema deve ser Multiusuário. _(TR, p. 40)_
- [ ] **3.** O sistema deve funcionar em ambientes operacionais Windows e Linux. _(TR, p. 40)_
- [ ] **4.** O sistema deve ser desenvolvido em interface gráfica padronizada web; _(TR, p. 40)_
- [ ] **5.** Prover efetivo controle de acesso ao aplicativo através do uso de senhas, criptografia e expiração de senhas e garantir mecanismos que impeçam o acesso de maneira automatizada. (robôs) _(TR, p. 40)_
- [ ] **6.** Prover recurso de Grupo de Usuários em que seja possível gerenciar de forma única as permissões dos usuários a ele pertencente. _(TR, p. 40)_
- [ ] **7.** Prover controle de restrição de acesso às funções do aplicativo através do uso de senhas. _(TR, p. 40)_
- [ ] **8.** Prover recurso que permita a configuração, para grupos ou usuários. _(TR, p. 41)_
- [ ] **9.** Em telas de entrada de dados, permitir atribuir por usuário ou grupo permissão exclusiva para Gravar e/ou Excluir dados. _(TR, p. 41)_
- [ ] **10.** Registrar em auditoria todas as tentativas bem sucedidas de logon, bem como os respectivos logoff, registrando data, hora e o usuário. _(TR, p. 41)_
- [ ] **11.** Manter histórico dos acessos por usuário e por função, registrando a data, hora e IP. _(TR, p. 41)_
- [ ] **12.** Prover funcionalidade de consulta e impressão dos históricos de acesso, permitindo a seleção por usuário, funcionalidade, períodos e endereço IP. _(TR, p. 41)_
- [ ] **13.** Manter log de auditoria das alterações efetuadas sobre os principais cadastros e tabelas. _(TR, p. 41)_
- [ ] **14.** Permitir a visualização dos relatórios em tela, bem como possibilitar que sejam salvos em disco para posterior reimpressão, inclusive permitindo selecionar a impressão de intervalos de páginas e o número de cópias a serem impressas, _(TR, p. 41)_
- [ ] **15.** além de também permitir a seleção da impressora de rede desejada. _(TR, p. 41)_
- [ ] **16.** Emitir relatórios, bem como gerar arquivos, em formato PDF, TXT e CSV. _(TR, p. 41)_
- [ ] **17.** Possuir ajuda On-line. _(TR, p. 41)_
- [ ] **18.** Toda atualização de dados deve ser realizada de forma on-line. _(TR, p. 41)_
- [ ] **19.** Garantir a integridade referencial entre as diversas tabelas dos aplicativos. _(TR, p. 41)_
- [ ] **20.** Possibilitar que os aplicativos sejam acessados por usuários remotos, utilizando a internet como meio de acesso. _(TR, p. 41)_
- [ ] **21.** Permitir que os relatórios sejam gerados em formato PDF assinados digitalmente com certificados digitais. _(TR, p. 41)_
- [ ] **22.** Todos os módulos de serviço web deverão ser compatíveis com navegadores _(TR, p. 41)_
### de dispositivos móveis e desktop o mínimo para os seguintes navegadores: _(p. 41)_

- [ ] **23.** Google Chorme, Mozila Firefox, Safari e Internet Explorer. _(TR, p. 41)_
- [ ] **24.** Utilizar banco de dados relacional. O sistema deverá possuir integridade transacional nas operações efetuadas sobre a base de dados e a integridade referencial e de entidade deverão ser garantidas pelo sistema de banco de _(TR, p. 41)_
- [ ] **25.** dados. _(TR, p. 41)_
- [ ] **26.** O sistema deverá possuir funcionalidades distintas para controlar as configurações que sejam de responsabilidade dos Administradores de TI (segurança e auditoria, por exemplo), das configurações realizadas pelos administradores do sistema (parâmetros de funcionamento do negócio). _(TR, p. 41)_
- [ ] **27.** O sistema deverá possuir histórico (log) de todas as operações efetuadas por usuário (alterações, inclusões, exclusões e emissão de relatório) permitindo sua consulta e impressão, para auditoria. _(TR, p. 42)_
- [ ] **28.** Prover lista de pendências, com a possibilidade de geração de alertas, através do envio automático de e-mails. _(TR, p. 42)_
- [ ] **29.** Permitir a segregação de funções apoiada por uma solução de workflow (por exemplo: quem solicita não aprova). _(TR, p. 42)_
- [ ] **30.** Uma única transação executada pelo usuário deve desencadear todas as ações a ela pertinentes, ou seja, processos totalmente integrados entre si em processamento on- line _(TR, p. 42)_
- [ ] **31.** Garantir a integridade das informações (desfazer transações incompletas). _(TR, p. 42)_
- [ ] **32.** Garantir o reaproveitamento das parametrizações efetuadas quando da implantação de novas versões _(TR, p. 42)_
- [ ] **33.** Demonstrar que o sistema permitir acesso as bibliotecas de consultas do SERPRO diretamente na base da Receita Federal, referente a Consulta do CPF, retornando as informações do Nome do contribuinte, data de nascimento e a situação cadastral. _(TR, p. 42)_
- [ ] **34.** Demonstrar que o sistema permitir acesso as bibliotecas de consultas do SERPRO diretamente na base da Receita Federal, referente a Consulta do CNPJ, retornando as informações do Nome do contribuinte, situação cadastral, _(TR, p. 42)_
- [ ] **35.** endereço, atividade econômica, natureza jurídica, telefone. _(TR, p. 42)_
- [ ] **36.** Realizar gestão de tabelas de domínios de sistemas, operações e ações no cadastro único de Pessoas Físicas e Jurídicas, Logradouros, Bairros e Sistema de Endereçamento integrado ao CEP Nacional _(TR, p. 42)_
- [ ] **37.** Permitir unificar os cadastros duplicados de pessoas físicas e jurídicas e _(TR, p. 42)_
- [ ] **38.** utilizando as bibliotecas de acesso ao SERPRO, para validação correta dos nomes das pessoas, eliminando assim as duplicidades dentro dos sistemas. _(TR, p. 42)_
### INTERATIVIDADE _(p. 42)_

- [ ] **39.** Possuir ajuda (help) com palavras chaves que acessam outros itens de ajuda (help hipertexto) _(TR, p. 42)_
- [ ] **40.** Possuir ajuda (help) com conceitos gerais das funções _(TR, p. 43)_
- [ ] **41.** Possuir ajuda (help) em arquivos no formato PDF ( Formato Portátil de Documento) _(TR, p. 43)_
- [ ] **42.** Possuir ajuda (help) em arquivos no formato de vídeo dentro da própria aplicação _(TR, p. 43)_
- [ ] **43.** Permitir a extração de dados históricos para mídia externa, com vistas a minimizar os recursos utilizados pelo banco de dados (processamento, armazenamento, etc). _(TR, p. 43)_
- [ ] **44.** Suportar Backup on-line _(TR, p. 43)_
### SEGURANÇA _(p. 43)_

- [ ] **45.** Permitir registro e bloqueio de acesso para o caso de tentativas indevidas _(TR, p. 43)_
- [ ] **46.** Possuir conformidade com padrão X509 de certificados digitais _(TR, p. 43)_
- [ ] **47.** Possuir identificação única para cada usuário, por meio de logins e senhas individualizadas, de forma a permitir auditoria, controle de erros e de tentativas de invasão. _(TR, p. 43)_
- [ ] **48.** Possuir recursos de trilha de auditoria, com dados sobre os eventos referentes à autenticação de usuários e suas ações, de forma a manter registros das operações de atualização e das consultas a informações sigilosas permitindo o rastreamento de transações efetuadas, considerando “quem”, “quando”, “onde”, _(TR, p. 43)_
- [ ] **49.** “o quê” e tipo de alteração (inclusão, alteração, exclusão e consulta). _(TR, p. 43)_
- [ ] **50.** Suportar SSL 128 bits para criptografia do canal de transmissão de dados para web service _(TR, p. 43)_
- [ ] **51.** Possuir predisposição para autenticação e reconhecimento de usuário com certificado digital. _(TR, p. 43)_
- [ ] **52.** Possibilidade de armazenar automaticamente os relatórios gerados pelo sistema em ambientes de CLOUD, como o S3, AZURE, GOOGLE CLOUD PLATFORM ou outro similar _(TR, p. 43)_
- [ ] **53.** O SISTEMA deve disponibilizar rotina que permita ao Usuário recuperar sua _(TR, p. 43)_
- [ ] **54.** senha em caso de esquecimento por meio de seu endereço eletrônico (email); _(TR, p. 43)_
- [ ] **55.** Todas as operações relacionadas à solicitação e mudança de senha, assim como a mudança no nível de acesso e bloqueio e liberação de Usuários devem ser registradas em tabela de auditoria no banco de dados; _(TR, p. 43)_

## Almoxarifado

- [ ] **1.** Controle de toda a movimentação de entradas, saídas, transferências e prazos de validade de materiais no estoque, devendo realizar a atualização do saldo estoque de acordo com cada movimentação realizada; _(TR, p. 44)_
- [ ] **2.** Permitir a manutenção do catálogo de materiais quanto às informações de: nome, especificação e unidade de medida; _(TR, p. 44)_
- [ ] **3.** O sistema deverá conter cadastro de fornecedores de pessoas físicas e jurídicas, _(TR, p. 44)_
- [ ] **4.** Os campos de cadastramento de dados do fornecedor devem ser habilitados de acordo com o tipo de pessoa (física ou jurídica) a ser cadastrada. Exemplo: O sistema não poderá permitir a digitação do campo CNPJ para pessoa física e vice-versa; _(TR, p. 44)_
- [ ] **5.** Deverá possibilitar o cadastro de lotes de mercadorias, para controle da validade de itens perecíveis, medicamentos, entre outros; _(TR, p. 44)_
- [ ] **6.** Deverá possibilitar o cadastro de endereços físicos de estocagem, para controle do saldo de itens em endereços distintos, conforme definido pelo gestor; _(TR, p. 44)_
- [ ] **7.** Possuir no cadastro de materiais campos para descrições sucintas e detalhadas sem limitação de caracteres, através de especificação integral; _(TR, p. 44)_
- [ ] **8.** O software deverá proporcionar mecanismos de busca de materiais, através do fornecimento de palavras inteiras ou parte de palavras contidas no nome ou na descrição dos produtos; _(TR, p. 44)_
- [ ] **9.** Possibilitar o lançamento de entradas automáticas da nota fiscal a partir da emissão de autorizações de fornecimento (AF), de forma integrada com o software de gestão de Compras, Licitações e Contratos; _(TR, p. 44)_
- [ ] **10.** Permitir realizar as Entrada de material por (compra, doação, devolução de saída ou por outros motivos); _(TR, p. 44)_
- [ ] **11.** Permitir o controle de vários Almoxarifados; _(TR, p. 45)_
- [ ] **12.** Permitir realizar transferências entre almoxarifados. _(TR, p. 45)_
- [ ] **13.** Permitir cadastro de centros de custo (de consumo); _(TR, p. 45)_
- [ ] **14.** Permitir cadastros de requisitantes de materiais. _(TR, p. 45)_
- [ ] **15.** Possibilitar o cadastro de classificações do estoque, podendo ser subdividido em materiais de consumo, materiais permanentes, dentre outros que forem necessários; _(TR, p. 45)_
- [ ] **16.** Emitir relatório de Crédito de Transferências de Estoque; _(TR, p. 45)_
- [ ] **17.** Emitir relatório de Débito de Transferências de Estoque; _(TR, p. 45)_
- [ ] **18.** Deverá possibilitar o cadastro de lotes de mercadorias, para controle da validade de itens perecíveis, medicamentos, entre outros; _(TR, p. 45)_
- [ ] **19.** Possuir configuração de quantitativo e/ou valor, mínimo, médio e máximo de itens, para controle do ponto de ressuprimento de saldo físico no estoque; _(TR, p. 45)_
- [ ] **20.** O software deverá possibilitar que sejam realizadas requisições de materiais, possibilitando que os setores fora do órgão possam realizar suas solicitações diretamente pelo sistema _(TR, p. 45)_
- [ ] **21.** Possibilitar emissão de relatório de balancete do estoque por classe patrimonial, demonstrando os movimentos de saldo inicial, entradas, créditos de transferência, saídas, débitos de transferência e saldo atual; _(TR, p. 45)_
- [ ] **22.** Possibilitar o bloqueio de movimentações no almoxarifado durante o período de inventário; _(TR, p. 45)_
- [ ] **23.** Emitir relatório de boletim de entrada; _(TR, p. 45)_
- [ ] **24.** Emitir relatório de histórico de materiais, contendo as informações detalhadas das movimentações de cada item. _(TR, p. 45)_
- [ ] **25.** Possibilitar efetuar a saída automática de todos os itens do estoque pela entrega do material de forma integral; _(TR, p. 45)_
- [ ] **26.** Permitir duplicar itens do catálogo de materiais, agilizando novos cadastros; _(TR, p. 45)_
- [ ] **27.** Deverá possibilitar a implantação de saldos iniciais de itens no estoque; _(TR, p. 45)_

## Patrimônio

- [ ] **1.** Permitir cadastrar a estrutura organizacional (locais, setores, secretarias) que compõe o órgão, conforme organograma definido pela entidade; _(TR, p. 45)_
- [ ] **2.** Possibilitar o cadastro de fórmulas de cálculo de lançamentos contábeis para cada tipo de movimentação (avaliação, reavaliação e depreciação); _(TR, p. 46)_
- [ ] **3.** Permitir consultar os bens por número de tombamento, nome, data, valor e tipo de aquisição (grupo de bens); _(TR, p. 46)_
- [ ] **4.** Possuir rotina de duplicação de bens, a ser utilizado nos casos em que são tombados vários bens de mesma característica, agilizando o cadastramento dos bens; _(TR, p. 46)_
- [ ] **5.** Permitir o registro da baixa dos bens por venda, doação, obsolescência ou sucateamento, inutilização, inexistência física, sinistro, etc.; _(TR, p. 46)_
- [ ] **6.** Possibilitar a inclusão (entrada) de um bem permanente no sistema de patrimônio através da integração com o sistema de almoxarifado. _(TR, p. 46)_
- [ ] **7.** Permitir a manutenção do catálogo de materiais quanto às informações de: nome, especificação e unidade de medida; _(TR, p. 46)_
- [ ] **8.** O sistema deverá conter cadastro de fornecedores de pessoas físicas e jurídicas, _(TR, p. 46)_
- [ ] **9.** Os campos de cadastramento de dados do fornecedor devem ser habilitados de acordo com o tipo de pessoa (física ou jurídica) a ser cadastrada. Exemplo: O sistema não poderá permitir a digitação do campo CNPJ para pessoa física e vice-versa; _(TR, p. 46)_
- [ ] **10.** Permitir o cadastro de grupos de bens patrimoniais tais como móveis, imóveis, semoventes e intangíveis; _(TR, p. 46)_
- [ ] **11.** Possuir cadastro de classes patrimoniais para agrupamento de bens de acordo com a sua classificação contábil; _(TR, p. 46)_
- [ ] **12.** Possuir rotina para estorno de avaliação de bens patrimoniais; _(TR, p. 46)_
- [ ] **13.** Posibilitar a impressão do relatório de estorno de movimentações; _(TR, p. 46)_
- [ ] **14.** Possuir rotina para estorno de depreciação de bens patrimoniais; _(TR, p. 46)_
- [ ] **15.** Possuir rotina para estorno de reavaliação de bens patrimoniais; _(TR, p. 46)_
- [ ] **16.** Emitir relatório de histórico de bens patrimoniais; _(TR, p. 46)_
- [ ] **17.** Possuir cadastro de avaliações para correção/atualização de valores dos bens da entidade; _(TR, p. 46)_
- [ ] **18.** Possuir rotina de reavaliação e depreciação de acordo com os parâmetros definidos pela entidade _(TR, p. 46)_
- [ ] **19.** Permitir o registro da abertura e do fechamento do inventário, bloqueando a movimentação ou destinação de bens durante a sua realização; _(TR, p. 46)_
- [ ] **20.** Possuir cadastro de comissões de patrimônio, contendo a finalidade, vigência, Documento de Nomeação e composição dos membros responsáveis; _(TR, p. 47)_
- [ ] **21.** Permitir duplicar itens do catálogo de materiais, agilizando novos cadastros; _(TR, p. 47)_
- [ ] **22.** Demonstrar no grid de tombamento automático de bens móveis o nome do fornecedor, documento fiscal, número do documento fiscal, nome do item e a quantidade disponível para lançamento; _(TR, p. 47)_
- [ ] **23.** Possibilitar o cadastro dos bens móveis e imóveis, contendo todos os dados necessários para o patrimonial, inclusive identificação do setor e pessoa responsável. No caso de bens imóveis, permitir ainda o lançamento dos seguintes dados adicionais como: endereço, área, valor, tipo, natureza e utilização; _(TR, p. 47)_
- [ ] **24.** Emitir relatório de etiquetas patrimoniais contendo no mínimo o número no tombamento, nome do item e QRCode; _(TR, p. 47)_
- [ ] **25.** Permitir o registro da baixa dos bens por venda, doação, obsolescência ou sucateamento, inutilização, inexistência física, sinistro, etc. _(TR, p. 47)_
- [ ] **26.** Possibilitar a inserção de anexos ao bem, podendo ser nota fiscal, foto, etc.; _(TR, p. 47)_
- [ ] **27.** Geração dos arquivos de prestação de contas do Tribunal de contas do estado. _(TR, p. 47)_
- [ ] **28.** Emitir relatório de termo de transferência patrimonial; _(TR, p. 47)_
- [ ] **29.** Emitir relatório de baixas patrimoniais; _(TR, p. 47)_
- [ ] **30.** Permitir realizar a baixa patrimonial. _(TR, p. 47)_
- [ ] **31.** Possuir cadastro de comissões de patrimônio, contendo a finalidade, vigência, Documento de Nomeação e composição dos membros responsáveis; _(TR, p. 47)_
- [ ] **32.** Emitir relatório da relação sintética dos bens patrimoniais cadastrados por período. _(TR, p. 47)_

## Frotas

- [ ] **1.** Permitir realizar o gerenciamento e controle da frota municipal de veículos, máquinas e equipamentos _(TR, p. 48)_
- [ ] **2.** Permitir realizar o controle de gastos pertencentes à frota municipal de veículos, máquinas e equipamentos. _(TR, p. 48)_
- [ ] **3.** Permitir programar, emitir e controlar a execução de planos de revisão periódicos e de manutenção preventiva a serem efetuados nos veículos, máquinas, equipamentos e agregados possibilitando gerar as suas devidas ordens de serviço a partir desses planos. _(TR, p. 48)_
- [ ] **4.** Permitir o registro do histórico de utilização dos veículos _(TR, p. 48)_
- [ ] **5.** Possibilitar que seja realizado o registro e controle de seguros da frota. _(TR, p. 48)_
- [ ] **6.** Possibilitar o cadastro de agendamento e controle das obrigações dos veículos como IPVA e licenciamento. _(TR, p. 48)_
- [ ] **7.** O software deverá permitir o registro das ocorrências envolvendo os veículos, equipamentos e agregados como: multas, acidentes etc., registrando datas e valores envolvidos. _(TR, p. 48)_
- [ ] **8.** Permitir histórico de gastos com manutenções efetuadas. _(TR, p. 48)_
- [ ] **9.** Permitir histórico de gastos com combustíveis e lubrificantes (materiais próprios ou de terceiros). _(TR, p. 48)_
- [ ] **10.** Permitir o cadastro de rotas. _(TR, p. 48)_
- [ ] **11.** Permitir o cadastro de Veiculos. _(TR, p. 48)_
- [ ] **12.** Possibilitar emitir a listagem da frota geral. _(TR, p. 48)_
- [ ] **13.** Possibilitar emitir a relação dos vencimentos de documentos diversos por período. _(TR, p. 48)_
- [ ] **14.** Possibilitar emitir os abastecimentos ocorridos no período por veículos. _(TR, p. 48)_

## Compras, Licitações e Contratos

### Cadastro de Fornecedores: _(p. 48)_

- [ ] **1.** O sistema deverá identificar as empresas como ME e EPP para cumprimento à lei 123/2006 e 147/2014. _(TR, p. 48)_
- [ ] **2.** O sistema deverá permitir pesquisar fornecedores a partir de palavras contidas no seu nome, CPF/CNPJ, enquadramento e situação (ativo/vigente); _(TR, p. 48)_
- [ ] **3.** Controlar os prazos de vencimento das certidões e demais documentos exigidos aos fornecedores, permitindo a emissão de relatórios; _(TR, p. 48)_
- [ ] **4.** Disponibilizar cadastro de atividades econômicas, codificada de acordo com a Classificação Nacional de Atividades Econômicas (CNAE), possibilitando o vinculo ao cadastro do fornecedor; _(TR, p. 49)_
- [ ] **5.** O sistema deverá conter cadastro de fornecedores de pessoas físicas e jurídicas, para participação em compras e licitações; _(TR, p. 49)_
- [ ] **6.** Os campos de cadastramento de dados do fornecedor devem ser habilitados de acordo com o tipo de pessoa (física ou jurídica) a ser cadastrada. Exemplo: O sistema não poderá permitir a digitação do campo CNPJ para pessoa física e vice-versa; _(TR, p. 49)_
- [ ] **7.** O sistema deverá disponibilizar recurso para permitir a consulta de regularidade dos fornecedores, através de link direcionando para os seguintes sites: INSS, FGTS, Fazenda Municipal, Estadual e Federal; _(TR, p. 49)_
- [ ] **8.** Integração total com o SIAFIC, Exportando automaticamentos os fornecedores cadastrados no sistema de Compras, Licitação e Contratos _(TR, p. 49)_
- [ ] **9.** O sistema deverá permitir pesquisar fornecedores a partir de palavras contidas no seu nome, CPF/CNPJ, enquadramento e situação (ativo/vigente); _(TR, p. 49)_
### COMPRAS E LICITAÇÕES: _(p. 49)_

- [ ] **10.** Conter módulo de pesquisa de preços, indispensável para a verificação de existência de recursos suficientes para cobrir despesas decorrentes de contratação pública, confronto e exame de propostas em licitação, estabelecendo o preço aproximado de referência que a administração estará disposta a contratar; _(TR, p. 49)_
- [ ] **11.** Possibilitar que a pesquisa de preços seja realizada utilizando o método de agrupamento de solicitações de compras/serviços; _(TR, p. 49)_
- [ ] **12.** O sistema deverá destacar no relatório de quadro comparativo de preços, as propostas que contém o menor preço; _(TR, p. 49)_
- [ ] **13.** Possibilitar o envio de email do fornecedor contendo as informações de identificação do processo, além de link e chave de acesso às informações; _(TR, p. 49)_
- [ ] **14.** Quando o fornecedor acessar o processo de compra correspondente, através do portal de serviços, exibir grid contendo os dados da compra, fornecedor e itens a serem respondidos; _(TR, p. 49)_
- [ ] **15.** Após responder a cotação de preços, o sistema deverá enviar um e-mail para o solicitante, informando que o preenchimento de preços foi realizado com sucesso pelo fornecedor; _(TR, p. 50)_
- [ ] **16.** Possibilitar que o fornecedor realize a emissão de relatório contendo os preços ofertados; _(TR, p. 50)_
- [ ] **17.** A pesquisa de preços deverá ficar disponível por um período de tempo determinado, de forma configurável. Após esse período, o processo não estará mais disponível; _(TR, p. 50)_
- [ ] **18.** Registrar no sistema a data de apresentação da proposta pelo fornecedor; _(TR, p. 50)_
- [ ] **19.** Não permitir que fornecedores inativos e bloqueados respondam pesquisas de preços pelo portal de serviços online. _(TR, p. 50)_
- [ ] **20.** O sistema deverá identificar as empresas como ME e EPP para cumprimento à lei 123/2006 e 147/2014. _(TR, p. 50)_
- [ ] **21.** O sistema deverá controlar as aquisições de materiais e contratação de serviços, de forma 100% digital, desde o pedido de compras até a contratação, realizada através das modalidades de dispensa ou licitação, seguindo todas as etapas do processo até a homologação, contrato, autorização de empenho/empenho, autorização de fornecimento/liquidação, entrega ou prestação dos serviços e liquidação de despesa; _(TR, p. 50)_
- [ ] **22.** O sistema deverá armazenar informações relativas aos processos de aquisições e serviços, tais como: órgão, modalidade, número/ano, processo administrativo, tipo de licitação (menor preço, melhor técnica, técnica e preço, maior lance ou oferta, etc.), base legal, classificação, objeto, comissão de licitação, datas/hora de abertura, entrega de envelopes, responsáveis, participantes, habilitações, inabilitações, pareceres e demais dados referentes ao andamento do processo; _(TR, p. 50)_
- [ ] **23.** O sistema deverá permitir o cadastro de solicitação de compras contendo os materiais e/ou serviços para dar inicio ao processo de aquisição pelas diversas unidades gestoras e administrativas que compõem a administração, através de usuários devidamente habilitados; _(TR, p. 50)_
- [ ] **24.** Possibilitar o registro de planejamentos de compras, possibilitando estimar compras futuras de maneira mais assertiva; _(TR, p. 50)_
- [ ] **25.** Dispor de integração com o sistema contábil para efeito de vinculação das dotações orçamentárias contábeis nos itens constantes solicitação de compras ou serviços. _(TR, p. 50)_
- [ ] **26.** Permitir o cadastramento de comissões permanentes e especiais, pregoeiros e leiloeiros, informando o documento de nomeação, membros e funções designadas; _(TR, p. 51)_
- [ ] **27.** Possuir os módulos de Controle de Estoque, Compras, Licitações e Contratos totalmente integrados entre si, sem redundância de base de dados; _(TR, p. 51)_
- [ ] **28.** Registrar os processos licitatórios, identificando número do processo, objeto, requisições de compra,modalidade de licitação e datas do processo; _(TR, p. 51)_
- [ ] **29.** Permitir realizar Cadastro de Pessoas (Usuários, Fornecedores e outros); _(TR, p. 51)_
- [ ] **30.** O sistema deverá permitir, quando necessário, o agrupamento de várias solicitações de compras ou serviços para fins de formalização do procedimento licitatório; _(TR, p. 51)_
- [ ] **31.** Dispor de integração com o sistema contábil para efeito de vinculação das dotações orçamentárias contábeis nos itens constantes solicitação de compras ou serviços. _(TR, p. 51)_
- [ ] **32.** Possibilitar o acompanhamento dos processos licitatórios desde a preparação _(TR, p. 51)_
### até seu julgamento, registrando as etapas de: _(p. 51)_

> • Publicação do processo; _(TR, p. 51)_
> • Emissão do relatório de quadro comparativo de preços; _(TR, p. 51)_
> • Emissão das atas referente a documentação e julgamento das propostas; _(TR, p. 51)_
> • Interposição de recurso; _(TR, p. 51)_
> • Anulação e revogação; _(TR, p. 51)_
> • Impugnação; _(TR, p. 51)_
> • Parecer da comissão julgadora; _(TR, p. 51)_
> • Parecer jurídico; _(TR, p. 51)_
> • Homologação e adjudicação _(TR, p. 51)_
- [ ] **33.** Possibilitar reordenar as fases do processo de acordo com a necessidade; _(TR, p. 51)_
- [ ] **34.** Numerar compras e licitações por modalidade; _(TR, p. 51)_
- [ ] **35.** Emitir relatório de vencedores de preços; _(TR, p. 51)_
- [ ] **36.** O sistema deverá destacar no relatório de quadro comparativo de preços, as propostas que contém o menor preço; _(TR, p. 51)_
- [ ] **37.** Permitir informar a situação dos processos de licitação: concluída, anulada, cancelada, suspensa, deserta, fracassada ou revogada; _(TR, p. 51)_
- [ ] **38.** O Módulo de Compras, Licitações e Contratos deverá permitir gerar arquivos para atender exigências do Tribunal de Contas relativos à prestação de contas dos atos administrativos de licitações e contratos, _(TR, p. 52)_
- [ ] **39.** Possibilitar ao fornecedor o registro de lances através do celular; _(TR, p. 52)_
- [ ] **40.** Permite integração com o Portal Nacional de Compras Públicas – PNCP _(TR, p. 52)_
- [ ] **41.** Disponibilizar módulo de gerenciamento e acompanhamento da disputa e lances do pregão; _(TR, p. 52)_
- [ ] **42.** Registrar de forma sintética os fornecedores participantes do pregão; _(TR, p. 52)_
- [ ] **43.** O sistema deverá disponibilizar uma tela para acompanhamento de lances para os licitantes, com a visualização do status e número do lote, licitantes e valor; _(TR, p. 52)_
- [ ] **44.** Possibilitar que o pregoeiro possa modificar o status do item/lote; _(TR, p. 52)_
- [ ] **45.** Possibilitar que o pregoeiro/equipe de apoio proceda com a habilitação ou inabilitação do fornecedor; _(TR, p. 52)_
- [ ] **46.** Possibilitar ao fornecedor o registro de lances através do celular; _(TR, p. 52)_
- [ ] **47.** Encerrada a fase de negociação, o sistema deverá atualizar o status do item/lote indicando que o mesmo foi arrematado. _(TR, p. 52)_
- [ ] **48.** Permite integração com o Portal Nacional de Compras Públicas – PNCP Convênios; _(TR, p. 52)_
- [ ] **49.** Permitir o registro dos contratos e convênios informando número e ano do contrato, fornecedor contratado, datas de início e término, objeto, prazos, valores e quantidades contratadas, calculando a vigência contratual; _(TR, p. 52)_
- [ ] **50.** Registrar os aditivos, suspensões e rescisões contratuais, indicando motivo e data; _(TR, p. 52)_
- [ ] **51.** Permite o cadastro de responsáveis pelo Convenio, representantes, signatários e o agrupamento dos responsáveis; _(TR, p. 52)_
- [ ] **52.** Integração total com o SIAFIC, exportando automaticamente todos os contratos cadastrados no sistema de compras, licitações e contratos e convênios. _(TR, p. 52)_
- [ ] **53.** Emitir relatório de razão de contratos e convênios; _(TR, p. 52)_
- [ ] **54.** Registrar as medições/etapas de execução dos contratos e convênios; _(TR, p. 52)_
- [ ] **55.** Registrar as parcelas de contratos e convênios; _(TR, p. 53)_
### Fornecimento _(p. 53)_

- [ ] **56.** Registrar, de forma automática, as solicitações de empenho para o reconhecimento inicial da despesa (AE); _(TR, p. 53)_
- [ ] **57.** O sistema deverá realizar via integração com sistema contábil, o empenho da despesa _(TR, p. 53)_
- [ ] **58.** Registrar e autorizar, de forma automática, que a entrega de materiais ou a execução de serviços, possam ser realizados pelo fornecedor/credor (AF); _(TR, p. 53)_
- [ ] **59.** Registrar o ateste da entrega de materiais ou execução de serviços, de forma automática, mediante autorização para que a devida despesa seja liquidada _(TR, p. 53)_
### (AL); _(p. 53)_

- [ ] **60.** O sistema deverá realizar via integração com sistema contábil, a liquidação da despesa; _(TR, p. 53)_
- [ ] **61.** Possibilitar anular as solicitações de empenho já reconhecidas como despesa _(TR, p. 53)_
### (AE); _(p. 53)_

- [ ] **62.** Possibilitar anular a entrega de materiais ou execução de serviços, já autorizados (AF); _(TR, p. 53)_
- [ ] **63.** Possibilitar anular a entrega de materiais ou execução de serviços, já atestados (AL); _(TR, p. 53)_
- [ ] **64.** Possibilitar complementar as solicitações de empenhos já reconhecidas como despesa (AE); _(TR, p. 53)_
- [ ] **65.** Emitir relatório de autorização de empenho (AE); _(TR, p. 53)_
- [ ] **66.** Emitir relatório de autorização de fornecimento (AF); _(TR, p. 53)_
- [ ] **67.** Emitir relatório de anulação de autorização de empenho (AE); _(TR, p. 53)_
- [ ] **68.** Emitir relatório de anulação de autorização de fornecimento (AF); _(TR, p. 53)_
- [ ] **69.** Emitir relatório de anulação de autorização de liquidação (AL); _(TR, p. 53)_
- [ ] **70.** Emitir relatório de razão de autorização de fornecimento (AF); _(TR, p. 53)_
- [ ] **71.** Emitir relatório de razão de autorização de liquidação (AL) _(TR, p. 53)_
### Contratos: _(p. 53)_

- [ ] **72.** Permitir o registro dos contratos e convênios informando número e ano do contrato, fornecedor contratado, datas de início e término, objeto, prazos, valores e quantidades contratadas, calculando a vigência contratual; _(TR, p. 53)_
- [ ] **73.** Registrar os aditivos, suspensões e rescisões contratuais, indicando motivo e data; _(TR, p. 54)_
- [ ] **74.** Permite o cadastro de responsáveis pelo Contrato, representantes, signatários e o agrupamento dos responsáveis; _(TR, p. 54)_
- [ ] **75.** Integração total com o SIAFIC, exportando automaticamente todos os contratos cadastrados no sistema de compras, licitações e contratos e convênios. _(TR, p. 54)_
- [ ] **76.** Emitir relatório de razão de contratos; _(TR, p. 54)_
- [ ] **77.** Registrar as medições/etapas de execução dos contratos; _(TR, p. 54)_
- [ ] **78.** Registrar as parcelas de contratos e convênios; _(TR, p. 54)_
- [ ] **79.** Permite integração com o Portal Nacional de Compras Públicas – PNCP _(TR, p. 54)_

## Processos Eletrônicos e Digitais

- [ ] **1.** Possibilitar o registro de qualquer tipo de processo/documento, com controle do seu recebimento, envio e tramitação, até seu encerramento, fornecendo informações rápidas e confiáveis; _(TR, p. 54)_
- [ ] **2.** Permitir que o usuário cadastre os diversos processos, contendo no mínimo: número, ano, data de abertura, tipo (interno ou externo), espécie de processo, assunto, interessado e descrição; _(TR, p. 54)_
- [ ] **3.** Permitir o registro de palavra-chave para facilitar a pesquisa dos processos; _(TR, p. 54)_
- [ ] **4.** Possibilitar informar a prioridade do processo: Baixa; Normal; Alta.; _(TR, p. 54)_
- [ ] **5.** Possibilitar que cada departamento registre ou consulte os processos sob sua responsabilidade; _(TR, p. 54)_
- [ ] **6.** Garantir a obrigatoriedade de informações essenciais, facilitando a identificação e classificação do processo; _(TR, p. 54)_
- [ ] **7.** Fornecer comprovante de protocolização para o interessado no momento da inclusão do processo; _(TR, p. 54)_
- [ ] **8.** No ato da abertura, deve possibilitar o envio de dados do processo por e-mail, incluindo um link para acesso ao Comprovante de Protocolização e ao Histórico de Andamento; _(TR, p. 54)_
- [ ] **9.** Possibilitar o envio automático de e-mail para o interessado, em qualquer fase do processo; _(TR, p. 55)_
- [ ] **10.** Registrar a data/hora e nome do usuário que promoveu o envio e recebimento do processo durante as tramitações; _(TR, p. 55)_
- [ ] **11.** Emitir o termo de autuação de forma automatizada após o registro de cada processo eletrônico; _(TR, p. 55)_
- [ ] **12.** Permitir registrar os pareceres sobre o processo e histórico de cada trâmite sem limite de caracteres; _(TR, p. 55)_
- [ ] **13.** Permitir a anexação ou digitalização de documentos ou imagens ao protocolo; _(TR, p. 55)_
- [ ] **14.** Possibilitar o cancelamento de trâmites de processos que foram remetidos, porém ainda não foi confirmado o recebimento; _(TR, p. 55)_
- [ ] **15.** Possibilitar a criação de formulários dinâmicos, onde o próprio _(TR, p. 55)_
### usuário poderá criar suas perguntas e respostas, sendo as mesmas do tipo: _(p. 55)_

> discursiva, objetiva única, objetiva múltipla, data, hora, numérica, dropdow _(TR, p. 55)_
> (consulta de outras tabelas); _(TR, p. 55)_
- [ ] **16.** Possibilitar a utilização de formulários dinâmicos para direcionamento de atividades de fluxo; _(TR, p. 55)_
- [ ] **17.** Possibilitar na definição de atividades mediante fluxo de trabalho a definição e atividade por tela de trabalho otimizando as ações; _(TR, p. 55)_
- [ ] **18.** Criticar sobre providências não concluídas e obrigatórias na tramitação do processo; _(TR, p. 55)_
- [ ] **19.** Possuir rotina de conclusão de processos com identificação da data, localização, situação final, termo de encerramento, permitir definir arquivamento temporário com controle de data limite conforme classificação _(TR, p. 55)_
### CONARQ; _(p. 55)_

- [ ] **20.** Possibilitar o cadastramento de locais de arquivamento com informações que facilite a localização dos processos; _(TR, p. 55)_
- [ ] **21.** Possuir recurso para arquivar o processo no próprio setor, conforme definido no fluxo de trabalho; _(TR, p. 55)_
- [ ] **22.** Permitir o desarquivamento para reativação do processo de acordo com permissões; _(TR, p. 55)_
- [ ] **23.** Dispor de configuração para autorização do encerramento de processo poratividade e/ou fase de fluxo; _(TR, p. 56)_
- [ ] **24.** Possuir relatório de histórico de andamento dos documentos e processos relacionando anexos existentes; _(TR, p. 56)_
- [ ] **25.** Possibilitar parametrização da sequência da numeração dos processos por ano, tipo e espécie; _(TR, p. 56)_
- [ ] **26.** Permitir a gestão dos processos em andamento, disponibilizando informações da tramitação da documentação desde o seu início até o arquivamento por meio de relatórios; _(TR, p. 56)_
- [ ] **27.** Permitir a criação de documentos utilizando campos de mesclagem; _(TR, p. 56)_
- [ ] **28.** Permitir controlar atividades por tempo de execução através de fluxo de trabalho; _(TR, p. 56)_
- [ ] **29.** Permitir que o usuário de forma parametrizável seja forçado a justificar uma atividade que estiver em atraso, definindo novo prazo para resolução; _(TR, p. 56)_
- [ ] **30.** Permitir o controle de atividades de processo por prazos definidos em fluxo de trabalho; _(TR, p. 56)_
- [ ] **31.** Disponibilizar texto padronizável para o encaminhamento dos processos; _(TR, p. 56)_
- [ ] **32.** Dispor de funcionalidade onde seja possível definir a visualização dos textos de encaminhamento de forma pública e privada, permitindo a diferenciação entres os tipos; _(TR, p. 56)_
- [ ] **33.** Dispor de conexão com a URA (Unidade de Resposta Audível) para criação automática de processos; _(TR, p. 56)_
- [ ] **34.** Ao assinar o documento, disponibilizar a visualização da assinatura todas as vezes que o usuário acessar o arquivo; _(TR, p. 56)_
- [ ] **35.** Ao assinar o documento, deverá permitir a validação e autenticação do documento produzido utilizando a rede mundial de computadores por meio do sítio eletrônico da contratante, inclusive QRCode; _(TR, p. 56)_
- [ ] **36.** Possibilitar que o arquivo (documento/imagem) anexado ao processo possa ser assinado digitalmente utilizando a certificação digital; _(TR, p. 56)_
- [ ] **37.** Ser capaz de visualizar os documentos diretamente no sistema, sem a necessidade de download, agilizando o acesso às informações; _(TR, p. 57)_
- [ ] **38.** Disponibilizar o processo na íntegra ou peças individuas para download; _(TR, p. 57)_
- [ ] **39.** Permitir o envio de link por e-mail do processo para possíveis auditorias externas (TCE e outras entidades); _(TR, p. 57)_
- [ ] **40.** Permitir gerir informações encaminhadas a órgão externos; _(TR, p. 57)_
- [ ] **41.** Dispor de ambiente exclusivo para acesso a externos com respectivas permissões parametrizáveis; _(TR, p. 57)_
- [ ] **42.** Toda tramitação, bem como os documentos anexados, poderão ser assinados digitalmente e eletronicamente; _(TR, p. 57)_
- [ ] **43.** Permitir o controle dos documentos exigidos por assunto em seu cadastro; _(TR, p. 57)_
- [ ] **44.** Possibilitar anexar arquivos digitais e eletrônicos em diversos formatos ao processo; _(TR, p. 57)_
- [ ] **45.** Possibilitar controlar a juntada de processos por apensação ou anexação; _(TR, p. 57)_
- [ ] **46.** Possibilitar consultas diversas por número de processo, por requerente, assunto, data de abertura ou ainda chave de acesso; _(TR, p. 57)_
- [ ] **47.** Permitir a formatação de diversos termos, como: Termo de apensação, de anexação, de abertura e encerramento de volume, dentre outros; _(TR, p. 57)_
- [ ] **48.** Emitir a cada envio de processo/documento o comprovante do encaminhamento realizado; _(TR, p. 57)_
- [ ] **49.** Possibilitar a emissão de comprovante simples ou detalhado do histórico de andamento do processo; _(TR, p. 57)_
- [ ] **50.** Possuir configuração para que os usuários possam ser autorizados a fazer as tramitações somente em setores específicos; _(TR, p. 57)_
- [ ] **51.** Permitir que as caixas/participantes de tramitação possam ser configuráveis por setor, função, usuário, papel; _(TR, p. 57)_
- [ ] **52.** Possibilitar a rejeição de processos após a tramitação, desde que estejam no status "Enviado" e seja devidamente justificado; _(TR, p. 57)_
- [ ] **53.** Permitir auditoria facilitada quanto a identificação do usuário, com respectiva data que promoveu qualquer ação (cadastramento ou alteração) relacionada a um determinado processo; _(TR, p. 57)_
- [ ] **54.** Possibilitar a representação em modo gráfico dos processos por assunto para gerenciamento; _(TR, p. 58)_
- [ ] **55.** Emitir relatório de processos abertos por período; _(TR, p. 58)_
- [ ] **56.** Possuir biblioteca de documentos parametrizáveis para utilização em fluxo; _(TR, p. 58)_
- [ ] **57.** Possui formulário para enquetes/pesquisas a serem utilizadas como base para decisões de fluxo; _(TR, p. 58)_
- [ ] **58.** Permitir a disponibilização de formulários para pesquisas externas; _(TR, p. 58)_
- [ ] **59.** Possuir ferramentas de fluxo, de forma a permitir automatizar processos que envolvam tomadas de decisão ou aprovação de documentos; _(TR, p. 58)_
- [ ] **60.** Os fluxos dentro do sistema poderão ser exibidos através de visualização gráfica ou relatório; _(TR, p. 58)_
- [ ] **61.** Dispor de funcionalidades inteligentes que permita a mineração de processos por fluxo de trabalho; _(TR, p. 58)_
- [ ] **62.** Possuir relatórios do tipo drill-down, permitindo sair de um nível mais alto e acessar informações mais detalhadas, ou níveis menores; _(TR, p. 58)_
- [ ] **63.** Permitir o cadastramento do fluxo por assunto; _(TR, p. 58)_
- [ ] **64.** Permitir que sejam definidos os setores onde os processos passarão e a previsão de permanência em cada setor; _(TR, p. 58)_
- [ ] **65.** Permitir que determinados assuntos possam ser registrados por usuários específicos ou agrupamentos; _(TR, p. 58)_
- [ ] **66.** Possibilitar ao cidadão a consulta de requisitos de protocolização; _(TR, p. 58)_
- [ ] **67.** Dispor de um módulo de ouvidoria que deve possibilitar o registro de qualquer tipo de manifestações, com controle do seu recebimento, envio e tramitação, até seu encerramento, fornecendo informações rápidas e confiáveis; _(TR, p. 58)_
- [ ] **68.** Dispor de funcionalidade que permita ao cidadão registrar uma ouvidoria sem a obrigatoriedade de preenchimento de dados pessoais, podendo esta manifestação ser anônima; _(TR, p. 58)_
- [ ] **69.** Permitir a consulta pública (sem senha para acesso) a todos os protocolos gerados para o cidadão; _(TR, p. 58)_
- [ ] **70.** Prover sigilo das informações permitindo que somente o próprio requerente possa consultar dados relativos aos seus processos (parametrizável); _(TR, p. 59)_
- [ ] **71.** Oferecer a opção de definição manual de sigilo para cada processo registrado, podendo esta opção ser alterada em qualquer fase do processo pelo usuário protocolador ou usuário que estiver de posse do processo; _(TR, p. 59)_
- [ ] **72.** Oferecer a opção de definição de sigilo do registro mediante configuração do assunto; _(TR, p. 59)_
- [ ] **73.** Dar condições ao cidadão para participar de forma eletrônica dos processos, transformando assim toda a movimentação fiscal do setor de fazenda com o contribuinte de forma eletrônica, tais como termo de Início de ação fiscal, auto de infração; notificação de lançamento de impostos e taxas; notificação; alvará de funcionamento, alvará de construção; _(TR, p. 59)_
- [ ] **74.** O sistema deverá permitir ainda que o Contribuinte receba / conteste os processos recebidos; _(TR, p. 59)_
- [ ] **75.** Disponibilizar a funcionalidade de cronograma permitindo planejar atividade para execução e gerenciar as atividades já executadas, integrada com a tramitação de processos; _(TR, p. 59)_
- [ ] **76.** Permitir a criação de processos originados pelo cronograma; _(TR, p. 59)_
- [ ] **77.** Permitir que o andamento e providências de processos possam ser acessadas pelo cronograma; _(TR, p. 59)_
- [ ] **78.** Permitir inserir observação em cada fase dos processos; _(TR, p. 59)_
- [ ] **79.** Poder planejar as atividades/ações do processo a serem executadas; _(TR, p. 59)_
- [ ] **80.** Possuir funcionalidade para que uma pessoa física (cidadão ou servidor ou uma pessoa jurídica) possam se cadastrar como usuários do sistema, para posterior protocolização de processos digitais; _(TR, p. 59)_
- [ ] **81.** Permitir a tramitação de processos entre órgãos da municipalidade; _(TR, p. 59)_
- [ ] **82.** Disponibilizar a autenticação do documento emitido via chave de acesso; _(TR, p. 59)_
- [ ] **83.** Disponibilizar QR Code para a consulta de documentos emitidos pelo sistema; _(TR, p. 59)_
- [ ] **84.** Deve permitir o cadastro de inúmeros modelos de documentos utilizados pela municipalidade, podendo ser utilizado no procedimento mapeado; _(TR, p. 59)_
- [ ] **85.** Possuir o atributo de espécie documental, permitindo a definição da extensão dos arquivos e respectivos tamanhos, quando anexados a processo; _(TR, p. 60)_
- [ ] **86.** Deve permitir o envio de dados do processo registrado através de e-mail contendo link para acesso ao Comprovante de Protocolização e ainda ao Histórico de Andamento; _(TR, p. 60)_
- [ ] **87.** Realizar a atualização automática das atividades dos processos em sua tramitação, quando for aplicada a alteração em um fluxo; _(TR, p. 60)_
- [ ] **88.** Permitir visualizar em tempo real a atividade atual, o responsável e a situação de qualquer fluxo; _(TR, p. 60)_
- [ ] **89.** Permitir a quebra de fluxos, sendo possível a utilização de um fluxo auxiliar em N procedimentos; _(TR, p. 60)_
- [ ] **90.** Possuir a facilidade de pesquisa de processos/documentos, oferecendo diversas formas de pesquisa, incluindo a pesquisa por identificador do processo e outros parâmetros que possam ser agrupados; _(TR, p. 60)_
- [ ] **91.** Possibilitar a emissão de Informações Gerenciais de Protocolização em dashboards gerenciais inteligentes oferecendo uma visão visual e intuitiva dos registros; _(TR, p. 60)_
- [ ] **92.** Permitir múltiplas assinaturas no mesmo documento; _(TR, p. 60)_
- [ ] **93.** Dispor de funcionalidade que gerencie as assinaturas de registros; _(TR, p. 60)_
- [ ] **94.** Possibilitar identificar documentos pendentes de assinatura; _(TR, p. 60)_
- [ ] **95.** Possibilitar fácil identificação de documentos que foram assinados; _(TR, p. 60)_
- [ ] **96.** Oferecer a funcionalidade de solicitar assinaturas de terceiros, proporcionando a conveniência de realizar o envio por e-mail aos signatários; _(TR, p. 60)_
- [ ] **97.** Possibilitar a conversão de documentos editáveis para o formato _(TR, p. 60)_
### PDF; _(p. 60)_

- [ ] **98.** Possuir função para efetuar a tramitação/envio de processos em lote; _(TR, p. 60)_
- [ ] **99.** Possuir recurso para receber os processos em lote; _(TR, p. 60)_
- [ ] **100.** Deve permitir que nos processos que possuem fluxo, o “caminho” a ser percorrido esteja definido, ou seja, o usuário não precisa informar qual a próxima fase que receberá o processo; _(TR, p. 60)_
- [ ] **101.** Oferecer a possibilidade de definir os setores por onde os processos irão transitar, incluindo a previsão de tempo de permanência em cada setor; _(TR, p. 61)_
- [ ] **102.** Deve permitir a captura de arquivos digitais já existentes na máquina do usuário, ou seja, produzidos fora do aplicativo. Tais arquivos, quando juntados, devem se tornar peças do processo administrativo selecionado; _(TR, p. 61)_
- [ ] **103.** Todos os documentos produzidos e juntados deverão conter o número do processo administrativo, bem como ter suas folhas numeradas sequencialmente; As peças processuais devem ser apresentadas em ordem cronológica de inserção; _(TR, p. 61)_
- [ ] **104.** Os usuários poderão indicar a composição do documento, podendo ser digital, digitalizado, físico, misto ou não classificado; _(TR, p. 61)_
- [ ] **105.** Integrar uma funcionalidade de notas e comentários nos documentos e processos, facilitando a comunicação entre os usuários; _(TR, p. 61)_
- [ ] **106.** O sistema deverá dispor de apensação, que permita realizar a união/junção de documentos, em caráter temporário; _(TR, p. 61)_
- [ ] **107.** No encerramento do processo poderá ser informado qual o tempo de guarda e descarte; _(TR, p. 61)_
- [ ] **108.** Permitir definir tipo de linguagem do OCR; _(TR, p. 61)_
- [ ] **109.** Extrair dados de documentos digitalizados para posterior uso com garantia de autenticidade; _(TR, p. 61)_
- [ ] **110.** Definir quais informações do arquivo físico serão extraídas e associadas aos campos do banco de dados para pesquisa (modelos); _(TR, p. 61)_
- [ ] **111.** Confirmar dados extraídos em tela de pré-visualização com possibilidade de edição (visualizar documento digitalizado ao lado); _(TR, p. 61)_
- [ ] **112.** O sistema deve possibilitar pesquisa para cada tabela (ou modelo) criada com possibilidade de impressão; _(TR, p. 61)_
- [ ] **113.** O sistema deve possibilitar consulta da estrutura de tabelas geradas; _(TR, p. 61)_
- [ ] **114.** Permitir a exportação de dados extraídos de documentos para arquivos; _(TR, p. 61)_
- [ ] **115.** Permitir a configuração de fonte de dados externa para exportação dos dados extraídos de documentos, diretamente para outra base de dados pré-configurada; _(TR, p. 61)_
- [ ] **116.** Fornecer interface web para que se possa solicitar a documentação à instituição; _(TR, p. 62)_
- [ ] **117.** Permitir configurar o driver de digitalização e DPI; _(TR, p. 62)_
- [ ] **118.** Permitir definir posição do documento; _(TR, p. 62)_
- [ ] **119.** Permitir assinar digitalmente documentos digitalizados; _(TR, p. 62)_
- [ ] **120.** Permitir a impressão de documento digital; _(TR, p. 62)_
- [ ] **121.** Permite a digitalização em lote e classificação; _(TR, p. 62)_
- [ ] **122.** O sistema deve distinguir os dados extraídos de documentos por tipo de modelo; _(TR, p. 62)_
- [ ] **123.** Garantia de autenticidade dos documentos extraídos; _(TR, p. 62)_
- [ ] **124.** O sistema deve utilizar tecnologias tais como OCR e Redes Neurais Artificiais para promover a extração dos dados dos arquivos digitalizados; _(TR, p. 62)_
- [ ] **125.** O módulo de pesquisa deverá funcionar em navegador; _(TR, p. 62)_
- [ ] **126.** O sistema deve possuir suporte à impressão para toda e qualquer pesquisa do sistema; _(TR, p. 62)_
- [ ] **127.** O sistema deve permitir a exportação de dados para arquivo nos formatos csv e txt; Modelagem de Fluxos _(TR, p. 62)_
- [ ] **128.** A modelagem de fluxos é fundamental para garantir uma implementação eficaz do processo eletrônico, pois permite uma compreensão clara e detalhada de como as atividades serão executadas, quem são os responsáveis por cada etapa e como as informações fluem dentro do sistema. _(TR, p. 62)_
- [ ] **129.** Visualização dos Processos: Criar diagramas ou mapas que representem visualmente os processos e procedimentos a serem seguidos no sistema, facilitando a compreensão e a comunicação entre os usuários. _(TR, p. 62)_
- [ ] **130.** Identificação de Gargalos e Oportunidades de Melhoria: Identificar possíveis gargalos ou pontos de melhoria nos processos existentes, permitindo a otimização e a eficiência operacional. _(TR, p. 62)_
- [ ] **131.** Padronização e Consistência: Estabelecer padrões e diretrizes para a execução dos processos, garantindo consistência e qualidade nas atividades realizadas. _(TR, p. 62)_
- [ ] **132.** Documentação e Treinamento: Gerar documentação detalhada dos processos modelados, que servirá como referência para treinamento de usuários e para futuras auditorias e análises. _(TR, p. 63)_
- [ ] **133.** Adaptação às Necessidades Específicas: Personalizar os fluxos de trabalho de acordo com as necessidades específicas da organização, levando em consideração suas políticas, regulamentos e requisitos operacionais. _(TR, p. 63)_
- [ ] **134.** O serviço de modelagem de fluxos desempenha um papel crucial no sucesso da implementação de um processo eletrônico, garantindo uma transição suave e eficiente para um ambiente digitalizado e automatizado. _(TR, p. 63)_

## Contabilidade Pública

> Este checklist também deve ser usado como base para o item “Contabilidade Pública — Câmara”, pois o TR não apresenta seção técnica própria para a Câmara.

- [ ] **1.** O Sistema de Contabilidade Pública deverá registrar todos os fatos contábeis ocorridos e possibilitar o atendimento à legislação vigente, à análise da situação da administração pública e a obtenção de informações contábeis e gerenciais necessárias à tomada de decisões. _(TR, p. 63)_
- [ ] **2.** Efetuar escrituração dos subsistemas contábeis patrimonial, orçamentário, custo e compensação de acordo com a Norma Brasileiras de Contabilidade Aplicada ao Setor Público - NBCASP e a lei 4.320/64. _(TR, p. 63)_
- [ ] **3.** Gerar relatórios gerenciais de Receita, Despesa, Restos a Pagar, Depósitos de Diversas Origens, Bancos e outros, de acordo com o interesse do Tribunal de Contas, bem como Boletim Diário da Tesouraria. _(TR, p. 63)_
- [ ] **4.** Elaborar os anexos e demonstrativos do balancete mensal e do balanço anual, na forma da Lei 4.320/64, Lei Complementar 101/00 - LRF, Normas Brasileira de Contabilidade Aplicadas ao Setor Público – NBCASP e Resoluções do Tribunal de Contas. _(TR, p. 63)_
- [ ] **5.** Contabilizar as dotações orçamentárias e demais atos da execução orçamentária e financeira. _(TR, p. 63)_
- [ ] **6.** Utilizar o Empenho para comprometimento dos créditos orçamentários, a Nota de Lançamento ou documento equivalente definido pela entidade pública para a liquidação de receitas e despesas e a Ordem de Pagamento para a efetivação de pagamentos. _(TR, p. 64)_
- [ ] **7.** Permitir que os empenhos globais e estimativos sejam passíveis de complementação ou anulação parcial ou total, e que os empenhos ordinários sejam passíveis de anulação parcial ou total. _(TR, p. 64)_
- [ ] **8.** Possibilitar no cadastro do empenho a inclusão, quando cabível, das informações relativas ao processo licitatório, fonte de recursos, número da obra, convênio e o respectivo contrato. _(TR, p. 64)_
- [ ] **9.** Possibilitar no cadastro do empenho a inclusão, quando cabível, de informações relativas ao Manual Normativo de Arquivos Digitais – MANAD. _(TR, p. 64)_
- [ ] **10.** Permitir a contabilização do regime próprio de previdência em conformidade com a Portaria 916 do ministério de previdência, com emissão dos respectivos demonstrativos; _(TR, p. 64)_
- [ ] **11.** Possibilitar a emissão de relatório com as deduções para o Imposto de Renda; _(TR, p. 64)_
- [ ] **12.** Possuir rotina de pagamento das despesas via pix _(TR, p. 64)_
- [ ] **13.** Permitir a incorporação patrimonial na emissão ou liquidação de empenhos. _(TR, p. 64)_
- [ ] **14.** Permitir a utilização de objeto de despesas na emissão de empenho para acompanhamento de gastos da entidade. _(TR, p. 64)_
- [ ] **15.** Permitir o controle de reserva das dotações orçamentárias possibilitando anulação _(TR, p. 64)_
- [ ] **16.** Permitir a emissão de etiquetas de empenhos. _(TR, p. 64)_
- [ ] **17.** Permitir que os documentos da entidade (notas de empenho, liquidação, ordem de pagamento, etc.) sejam impressas de uma só vez através de uma fila de impressão. _(TR, p. 64)_
- [ ] **18.** Permitir a alteração das datas de vencimento das Liquidações sem a necessidade de efetuar o estorno das liquidações do empenho. _(TR, p. 64)_
- [ ] **19.** Permitir Ajustes de lançamentos contábeis para operadores autorizados. _(TR, p. 64)_
- [ ] **20.** Permitir a utilização de históricos padronizados e históricos com texto livre. _(TR, p. 64)_
- [ ] **21.** Permitir estorno de registros contábeis nos casos em que se apliquem. _(TR, p. 64)_
- [ ] **22.** Permitir a apropriação de custos na emissão ou liquidação do empenho, podendo utilizar quantos centros de custos sejam necessários por empenho/liquidação. _(TR, p. 64)_
- [ ] **23.** Permitir a reapropriação de custos a qualquer momento. _(TR, p. 65)_
- [ ] **24.** Permitir a informação de retenções na liquidação do empenho. _(TR, p. 65)_
- [ ] **25.** Permitir a contabilização da apropriação das retenções na liquidação do empenho. _(TR, p. 65)_
- [ ] **26.** Permitir controle de empenho referente a uma fonte de recurso. _(TR, p. 65)_
- [ ] **27.** Permitir controle dos recursos antecipados para os adiantamentos, subvenções, auxílios contribuições e convênios, devendo o sistema emitir empenhos para os repasses de recursos antecipados. _(TR, p. 65)_
- [ ] **28.** Permitir controlar os repasses de recursos antecipados, limitando o empenho a um determinado valor ou a uma quantidade limite de repasses, de forma parametrizável para os adiantamentos de viagens, adiantamentos para suprimentos de fundos e demais recursos antecipados. _(TR, p. 65)_
- [ ] **29.** Permitir controlar os repasses de recursos antecipados limitando o número de dias para a prestação de contas, podendo esta limitação ser de forma informativa ou restritiva. _(TR, p. 65)_
- [ ] **30.** Permitir bloquear um fornecedor/credor para não permitir o recebimento de recurso antecipado caso o mesmo tenha prestação de contas pendentes com a contabilidade. _(TR, p. 65)_
- [ ] **31.** O sistema de Contabilidade deverá atender às Portarias da Secretaria do Tesouro Nacional e suas alterações, no que se refere a implantação do Plano de Contas Aplicado ao Setor Público - PCASP e das Demonstrações Contábeis Aplicadas ao Setor Público - DCASP, previsto no Manual de Contabilidade Aplicada ao Setor Público - MCASP. _(TR, p. 65)_
- [ ] **32.** Possuir controle, por data, das alterações realizadas no Plano de Contas, obedecendo as movimentações já existentes para as mesmas. _(TR, p. 65)_
- [ ] **33.** Possuir cadastro do Plano de Contas com todos os atributos definidos pelo PCASP (Plano de Contas Aplicado ao Setor Público). _(TR, p. 65)_
- [ ] **34.** Assegurar que as contas só recebam lançamentos contábeis no último nível de desdobramento do Plano de Contas utilizado. _(TR, p. 65)_
- [ ] **35.** Disponibilizar rotina que permita a atualização do Plano de Contas, das Naturezas de Receita e Despesa, dos eventos e de seus roteiros contábeis de acordo com as atualizações das respectivas normas. _(TR, p. 65)_
- [ ] **36.** Assegurar que os lançamentos contábeis sejam realizados utilizando contas de uma mesma natureza da informação. _(TR, p. 66)_
- [ ] **37.** Assegurar que contas com indicador de superávit por fonte de recurso _(TR, p. 66)_
- [ ] **38.** Possuir cadastro de LCP (Lançamentos Contábeis Padronizados) padronizados no MCASP. _(TR, p. 66)_
- [ ] **39.** Possuir cadastro de CLP (Conjunto de Lançamentos Padronizados) nos moldes definidos no MCASP. _(TR, p. 66)_
- [ ] **40.** Possuir controle, por data, das alterações realizadas no cadastro de LCP e CPL, obedecendo as movimentações contábeis já existentes para os mesmos. _(TR, p. 66)_
- [ ] **41.** Assegurar que a contabilização de todos os fatos administrativos ocorra através do uso dos Lançamentos Contábeis Padronizados (LCP) e do Conjunto de Lançamentos Padronizados (CLP). _(TR, p. 66)_
- [ ] **42.** Possuir mecanismo que parametrize as regras contábeis de acordo com as necessidades de cada entidade possibilitando a parametrização das mesmas pelo próprio contador da instituição pública. _(TR, p. 66)_
- [ ] **43.** Possuir mecanismo que configure todas as regras contábeis de integração entre os sistemas estruturantes de Administração de Receitas e Administração de Suprimentos (Compras e Materiais, Licitações e Patrimônio). _(TR, p. 66)_
- [ ] **44.** Assegurar que a escrituração contábeis dos atos e fatos atendam as NBCASP e Lei 4.320/64. _(TR, p. 66)_
- [ ] **45.** Assegurar que toda a movimentação contábil seja identificada por um Identificador de Fato Contábil. _(TR, p. 66)_
- [ ] **46.** Possuir um cadastro de Retenções onde se defina a conta contábil da mesma, bem como se a mesma se refere a uma retenção própria da entidade ou de terceiros. _(TR, p. 66)_
- [ ] **47.** Permitir que se defina percentual de determinada retenção _(TR, p. 66)_
- [ ] **48.** Possuir mecanismo que defina se o momento pelo qual ocorrerá o fato gerador do recolhimento de uma retenção própria será na liquidação ou no pagamento do empenho. _(TR, p. 66)_
- [ ] **49.** Permitir a arrecadação da receita orçamentária _(TR, p. 66)_
- [ ] **50.** Permitir exportação de dados através de arquivos, inclusive nos formatos XLS e texto CVS; _(TR, p. 67)_
- [ ] **51.** Possuir controle de acesso aos módulos de cada sistema por senhas diferenciadas para cada usuário, com restrição de uso individual de cada senha. _(TR, p. 67)_
- [ ] **52.** Oferecer segurança contra violação de dados ou acessos indevidos às informações, através do uso de hierarquia de senhas, restringindo as tarefas aos usuários responsáveis. _(TR, p. 67)_
- [ ] **53.** Todos os acessos aos sistemas devem ser registrados em arquivo, informando o módulo e identificando data, hora, usuário e ação realizada, podendo ser feita auditoria em módulo específico para esse fim. _(TR, p. 67)_
- [ ] **54.** Permitir realizar backup do banco de dados _(TR, p. 67)_
- [ ] **55.** Permitir definir assinaturas nas notas da receita e despesa para posterior impressão _(TR, p. 67)_
- [ ] **56.** Permitir a transferência automática para o exercício seguinte de saldos de balanço no encerramento do exercício, observando o parágrafo único do Artigo 8º da Lei Complementar nº 101/2000 (LRF); _(TR, p. 67)_
- [ ] **57.** Utilizar calendário de encerramento contábil para os diferentes meses, para a apuração do resultado e para a apropriação do resultado, não permitindo lançamentos nos meses já encerrados; Gerar os arquivos compatíveis para o envio das informações ao: SICONFI, MATRIZ CONTÁBIL; SIOPS, SIOPE; _(TR, p. 67)_
- [ ] **58.** Gerar relatórios ou arquivos em meios eletrônicos solicitados na Lei Complementar nº 101/2000 (LRF) com vistas a atender aos Artigos 52 e 53 (relatório resumido da execução orçamentária), Artigos 54 e 55 (relatório da gestão fiscal) e Artigo 72 (despesas com pessoal); _(TR, p. 67)_
- [ ] **59.** Permitir iniciar mês ou ano, mesmo que não tenha ocorrido o fechamento contábil do anterior, atualizando e mantendo a consistência dos saldos; _(TR, p. 67)_
- [ ] **60.** Possuir razão de empenho com coluna com débito e crédito indicando saldo _(TR, p. 67)_
- [ ] **61.** Disponibilizar relatório ou consulta de inconsistência na contabilização diária, com destaque para as contas com saldo invertido; _(TR, p. 67)_
- [ ] **62.** Disponibilizar rotina que permita o acompanhamento do limite da autorização legal para abertura de créditos adicionais de acordo com os critérios estabelecidos _(TR, p. 67)_
- [ ] **63.** Disponibilizar consultas à movimentação e saldo de contas de qualquer período do exercício e dos exercícios anteriores, inclusive aos movimentos de apuração e apropriação do resultado; _(TR, p. 68)_
- [ ] **64.** Possibilitar a emissão de relatórios configuráveis pelo usuário, ou seja, com a possibilidade de inclusão, agrupamento e filtro de diversas colunas com seus respectivos valores e somatórios; _(TR, p. 68)_
- [ ] **65.** Possibilitar a Consolidação das informações, mantendo cadastro original e permitir que na Unidade Gestora Prefeitura visualize informações consolidadas e por unidade gestora _(TR, p. 68)_
- [ ] **66.** Gerenciar lançamentos contábeis, permitindo visualização em balancetes por periodo _(TR, p. 68)_
- [ ] **67.** Permitir a definição se a conta do plano recebe ou não lançamento contábil; _(TR, p. 68)_
- [ ] **68.** Permitir consulta ao cadastro de pessoas físicas e/ou jurídicas de uso geral de todo o software de gestão; _(TR, p. 68)_
- [ ] **69.** Gerar as razões analíticos de todas as contas integrantes dos subsistemas contábeis _(TR, p. 68)_
- [ ] **70.** Configuração dos lançamentos automáticos e lançamentos de encerramento; _(TR, p. 68)_
- [ ] **71.** Emissão de relatórios listagens contendo todas as movimentações da receita e despesa; _(TR, p. 68)_
- [ ] **72.** Permitir a emissão de assinaturas, definidas pelo usuário, em todos os relatórios, _(TR, p. 68)_
- [ ] **73.** Individualizadas por unidade gestora; _(TR, p. 68)_
- [ ] **74.** Elaborar demonstrativo do excesso de arrecadação pela tendência do exercício; _(TR, p. 68)_
- [ ] **75.** Possibilitar o bloqueio de módulos, rotinas e/ou tarefas do sistema, para não permitir a inclusão ou manutenção dos lançamentos, podendo ser controlado por grupo/usuário; _(TR, p. 68)_
- [ ] **76.** Permitir controle de acesso do grupo/usuário a todos os cadastros e relatórios do sistema; _(TR, p. 68)_
- [ ] **77.** Integrar todas as contas dos subsistemas patrimonial, orçamentário, compensação, cujas movimentações são registradas simultaneamente; _(TR, p. 68)_
- [ ] **78.** Permitir o controle do processo de liquidação da despesa, fornecendo relatórios das liquidações e não permitindo pagamento de despesa não liquidada; _(TR, p. 68)_
- [ ] **79.** Permitir Cancelamento de Restos a Pagar informar complemento dos históricos referente à transação efetuada; _(TR, p. 69)_
- [ ] **80.** Permitir o controle de empenhos de restos a pagar; _(TR, p. 69)_
- [ ] **81.** Permitir a liquidação total ou parcial dos empenhos, sendo estes orçamentários ou de restos a pagar _(TR, p. 69)_
- [ ] **82.** Permitir abertura de créditos adicionais exigindo informação da legislação de autorização; _(TR, p. 69)_
- [ ] **83.** Permitir abertura de créditos especial e adicionais exigindo informação da legislação de autorização; _(TR, p. 69)_
- [ ] **84.** Controlar as dotações orçamentárias. Impossibilitando a utilização de dotações com saldo insuficiente por unidade gestora; _(TR, p. 69)_
- [ ] **85.** Permitir a verificação das datas dos lançamentos para informar ou bloquear quando a mesma for anterior à última lançada, controladas individualmente por unidade gestora; _(TR, p. 69)_
- [ ] **86.** Gerenciamento da Despesa com controle por fonte de recurso, elemento de despesa e subelemento por Centro de Custo Gestão Financeira e Tesouraria _(TR, p. 69)_
- [ ] **87.** Gera arquivos, em meios eletrônicos, contendo dados detalhados de todos os pagamentos a serem efetivados pelo sistema bancário para diversos bancos através do movimento de ordem bancária gerado, controlando o número de remessa destes arquivos por unidade gestora; _(TR, p. 69)_
- [ ] **88.** Gera integração automática dos descontos dos pagamentos e das liquidações na receita, através da transposição de consignação; _(TR, p. 69)_
- [ ] **89.** Permite pagamento via pix, débito automático e transferencia _(TR, p. 69)_
- [ ] **90.** Concilia os saldos das contas bancárias, emitindo relatório de conciliação bancária, permitindo configuração do formulário de acordo com as necessidades da entidade; _(TR, p. 69)_
- [ ] **91.** Permite a anulação parcial ou total de uma determinada receita; _(TR, p. 69)_
- [ ] **92.** Possui total integração com o sistema contábil efetuando a contabilização automática dos pagamentos e recebimentos efetuados pela tesouraria; _(TR, p. 69)_
- [ ] **93.** Controla os talonários de cheques em poder da tesouraria para que nenhum pagamento (com cheque) seja efetuado sem o respectivo registro, registrar e fornece relatórios sobre os pagamentos efetuados por banco/cheque; _(TR, p. 69)_
- [ ] **94.** Permite a identificação do contribuinte ou instituição arrecadadora para todas as receitas arrecadadas; _(TR, p. 70)_
- [ ] **95.** Projeta o fluxo de caixa mensal tomando por base a previsão e a execução diária de entradas e saídas financeiras, inclusive saldos; _(TR, p. 70)_
- [ ] **96.** Possibilita o controle do pagamento de empenho, restos a pagar e despesas extras, em contrapartida com várias contas pagadoras; _(TR, p. 70)_
- [ ] **97.** Possibilita o registro do pagamento da despesa e a anulação do registro de pagamento, fazendo os lançamentos necessários; _(TR, p. 70)_
- [ ] **98.** Disposição de recurso que permita a tesouraria registrar todas as movimentações de recebimento e de pagamento, controlar caixa, bancos e todas as operações decorrentes, tais como: Livros, Demonstrações e o Boletim de Caixa; _(TR, p. 70)_
- [ ] **99.** Permite o lançamento de investimento, aplicações e todos os demais lançamentos de débito/crédito e transferências bancárias. Controlar os saldos bancários, controlar todos os lançamentos internos e permitir os lançamentos dos extratos bancários para gerar os relatórios necessários; _(TR, p. 70)_
- [ ] **100.** Controla a movimentação de pagamentos (nas dotações orçamentárias, extra orçamentárias e restos a pagar) registrando todos os pagamentos efetuados contra caixa ou bancos, gerando recibos permitindo anulações, efetuando os lançamentos automaticamente; _(TR, p. 70)_
- [ ] **101.** Emite todos os relatórios diários necessários ao controle da tesouraria, classificados em suas respectivas contas; _(TR, p. 70)_
- [ ] **102.** Possui numeração de forma automática e organizada, as ordens de pagamento, os pagamentos e os talões de receita, seguindo a ordem cronológica conforme cada registro sequencial _(TR, p. 70)_
- [ ] **103.** Permite a importação de dados da receita e da despesa para o financeiro; _(TR, p. 70)_
- [ ] **104.** Possibilita o cadastro de recibo de pagamento onde o usuário poderá informar o empenho e os descontos efetuados para posterior impressão do recibo e assinatura do fornecedor; _(TR, p. 70)_
- [ ] **105.** Possibilita o pagamento de liquidações através dos documentos, cheques e ordem bancária, ou pelo pagamento direto; _(TR, p. 70)_
- [ ] **106.** Permite que os lançamentos da receita (arrecadação, previsão atualizada) sejam controlados por unidade gestora, sendo que a unidade gestora consolidadora apenas poderá consultar estes lançamentos; _(TR, p. 71)_
- [ ] **107.** Permite o reajuste das previsões de receita através dos índices definidos na Lei Orçamentária e/ou Lei de Diretrizes Orçamentárias, com ou sem arredondamento; _(TR, p. 71)_
- [ ] **108.** Propicia baixa de tributos, dívida ativa e demais arrecadações municipais por lote (arquivo bancário) ou individualmente; _(TR, p. 71)_
- [ ] **109.** Permite registro de todas as movimentações de recebimento e de pagamento, controlar caixa, bancos e todas as operações decorrentes, tais como: Emissão de Cheques e Borderôs, Livros, Demonstrações e o Boletim, registrando automaticamente os lançamentos; _(TR, p. 71)_
- [ ] **110.** Permite registro e fornecimento de relatórios sobre os pagamentos efetuados por banco/cheque; _(TR, p. 71)_
- [ ] **111.** Manutenção de cadastro de bancos e as agências bancárias; _(TR, p. 71)_
- [ ] **112.** Manutenção do cadastro de contas bancárias. _(TR, p. 71)_
### Módulo Planejamento Municipal _(p. 71)_

- [ ] **113.** Plano Plurianual (PPA) _(TR, p. 71)_
- [ ] **114.** Permitir cadastrar orientações do governo para elaboração do plano plurianual; _(TR, p. 71)_
- [ ] **115.** Permitir atribuir responsável para cada programa para acompanhamento; _(TR, p. 71)_
- [ ] **116.** Registrar o histórico das alterações efetuadas durante a vigência do plano plurianual; _(TR, p. 71)_
- [ ] **117.** Efetuar a avaliação periódica dos programas; _(TR, p. 71)_
- [ ] **118.** Cadastrar as restrições e providencias relativas à avaliação; _(TR, p. 71)_
- [ ] **119.** Possuir relatórios de acompanhamento e comparação da execução financeira; _(TR, p. 71)_
- [ ] **120.** Possuir relatórios de avaliação do plano plurianual; _(TR, p. 71)_
- [ ] **121.** Possuir anexos e planilhas para envio ao Legislativo; _(TR, p. 71)_
- [ ] **122.** Possuir cadastro de Eixo Estratégico nas Ações dos Programas _(TR, p. 71)_
- [ ] **123.** Cadastrar a programação da receita possibilitando a identificação de cada fonte de destino; _(TR, p. 72)_
- [ ] **124.** Registrar os indicadores para avaliação dos programas; _(TR, p. 72)_
- [ ] **125.** Cadastrar as ações necessárias ao atendimento dos programas; _(TR, p. 72)_
- [ ] **126.** Permitir informar as metas físicas e financeiras, sendo com a indicação da fonte de recursos; _(TR, p. 72)_
- [ ] **127.** Possuir relatório comparativo das previsões do PPA, LDO e LOA; _(TR, p. 72)_
- [ ] **128.** Permitir a consolidação dos planos plurianuais dos órgãos da Administração Direta e Indireta. Lei de Diretrizes Orçamentárias (LDO) _(TR, p. 72)_
- [ ] **129.** Cadastrar a previsão das transferências financeiras à fundos; _(TR, p. 72)_
- [ ] **130.** Possuir relatórios gerenciais da previsão da receita, despesa e transferências financeiras; _(TR, p. 72)_
- [ ] **131.** Registrar a receita com previsão para os dois exercícios seguintes; _(TR, p. 72)_
- [ ] **132.** Permitir descrever a metodologia de cálculo da receita; _(TR, p. 72)_
- [ ] **133.** Informar a renúncia da receita e as formas de compensação; _(TR, p. 72)_
- [ ] **134.** Informar as metas físicas e financeiras da despesa; _(TR, p. 72)_
- [ ] **135.** Estar integrado ao PPA possibilitando a utilização dos cadastrados, matendo a padronização de informações _(TR, p. 72)_
- [ ] **136.** Não permitir a inclusão de prioridades que não estejam previstas no _(TR, p. 72)_
### PPA; _(p. 72)_

- [ ] **137.** Informar a expansão da despesa _(TR, p. 72)_
- [ ] **138.** Permitir informar os riscos fiscais; _(TR, p. 72)_
- [ ] **139.** Permitir informar as projeções para o resultado nominal; _(TR, p. 72)_
- [ ] **140.** Possuir para emissão os anexos da Portaria 632 e 633 referentes aos Riscos e Metas Fiscais; _(TR, p. 72)_
- [ ] **141.** Emitir os anexos nos modelos da Lei 4.320/64; _(TR, p. 72)_
- [ ] **142.** Possuir Projeção Atuarial do Regime de Previdencia _(TR, p. 72)_
- [ ] **143.** Permitir a consolidação das diretrizes orçamentárias dos órgãos da Administração Direta e Indireta. _(TR, p. 72)_
- [ ] **144.** Lei Orçamentária Anual (LOA) _(TR, p. 72)_
- [ ] **145.** Possuir cadastro de programas e ações integrado ao PPA; _(TR, p. 72)_
- [ ] **146.** Permitir o cadastro da previsão da receita _(TR, p. 72)_
- [ ] **147.** Identificar qual ação pertence a cada projeto atividade _(TR, p. 73)_
- [ ] **148.** Permitir identificar o localizador de gastos no cadastro da despesa; _(TR, p. 73)_
- [ ] **149.** Possuir cadastro de Crédito Adicional suplementando e anulado dotações orçamentárias conforme definido em lei _(TR, p. 73)_
- [ ] **150.** Possuir relatórios de comparação da receita e despesa por fonte de recurso; _(TR, p. 73)_
- [ ] **151.** Possuir planilha de identificação das despesas; _(TR, p. 73)_
- [ ] **152.** Possuir relatórios gerencias da previsão da receita, despesa e transferências financeiras; _(TR, p. 73)_
- [ ] **153.** Emitir os anexos nos moldes da Lei 4.320/64; _(TR, p. 73)_
- [ ] **154.** Possuir Cota Orçamentária _(TR, p. 73)_
- [ ] **155.** Permitir a consolidação das diretrizes orçamentárias dos órgãos da Administração Direta e Indireta. _(TR, p. 73)_
- [ ] **156.** Possuir Bloqueio e Desbloqueio de Dotação _(TR, p. 73)_
- [ ] **157.** Controle Orçamentário por Cronograma de Desembolso _(TR, p. 73)_
- [ ] **158.** Permitir reestimativa de receita Prestação de Contas _(TR, p. 73)_
- [ ] **159.** Permitir Consolidação da Unidade Gestora do Legislativo _(TR, p. 73)_
- [ ] **160.** Permitir emissão dos relatórios da LRF RREO e RGF _(TR, p. 73)_
- [ ] **161.** Permitir Prestação de Contas REINF _(TR, p. 73)_
- [ ] **162.** Gerar arquivo de Prestação de Contas do Tribunal de Contas do estado _(TR, p. 73)_
- [ ] **163.** Emitir os Anexos e gerar arquivo de Prestação de Contas SIOPE _(TR, p. 73)_
- [ ] **164.** Emitir os Anexos e gerar arquivo de Prestação de Contas SIOPS _(TR, p. 73)_
- [ ] **165.** Emitir os Anexos e gerar arquivo de Prestação de Contas SICONFI _(TR, p. 73)_
- [ ] **166.** Emitir os Anexos do Fechamento do Balanço e os lançamentos contábeis de forma automatizada _(TR, p. 73)_

## Recursos Humanos e Folha de Pagamento

### Cadastro _(p. 73)_

- [ ] **1.** Permitir a captação e manutenção de informações pessoais de todos os servidores com no mínimo os seguintes dados: Matrícula, Nome, Filiação, Data de Nascimento, Sexo, Grau de Instrução, Estado Civil, Fotografia, Endereço, CPF, PIS, RG (Número, Órgão Expedidor e Data Expedição), Carteira de Trabalho (Número e Série), Carteira de Habilitação, Naturalidade, Nacionalidade, Tipo de Sangue, identificar se é Deficiente Físico; _(TR, p. 73)_
- [ ] **2.** Permitir a captação e manutenção de informações do vínculo que o servidor teve e/ou tem com o Órgão, com no mínimo os seguintes dados: Regime Jurídico, Vínculo, Cargo, Salário, Carga Horária Semanal, Data de Nomeação, Data de Posse, Data de Admissão, Data de Término de Contrato Temporário, Lotação, Unidade Orçamentária, Horário de Trabalho, Local de Trabalho; _(TR, p. 74)_
- [ ] **3.** Permitir captação e manutenção de informações da Qualificação profissional incluindo a escolaridade, formação, treinamentos realizados e experiências anterior; _(TR, p. 74)_
- [ ] **4.** Controlar os dependentes de servidores para fins de salário família e imposto de renda realizando a sua baixa automática na época devida conforme limite e condições previstas para cada dependente; _(TR, p. 74)_
- [ ] **5.** Permitir o cadastramento de servidores em diversos regimes jurídicos como: Celetistas, Estatutários, RJU e Contratos Temporários; _(TR, p. 74)_
- [ ] **6.** Permitir o cadastramento de Pensões Judiciais com o Nome da Pensionista, CPF, Data de Inclusão, Banco e Conta para Pagamento, Dados para Cálculo (Percentual, Valor Fixo, Salário Mínimo); _(TR, p. 74)_
- [ ] **7.** Permitir o cadastramento do organograma da estrutura administrativa, por exercício, para manter o histórico da lotação e custeio, com informação da fonte de recurso que será utilizada para captação do recurso a ser utilizado para pagamento dos servidores informados no custeio; _(TR, p. 74)_
- [ ] **8.** Registrar e manter o histórico das alterações de cargo, salário, Unidade Gestora, lotação, custeio, vínculo, regime jurídico, local de trabalho e Banco/Agência/Conta Bancária dos servidores, , data e hora da operação e usuário que efetuou a alteração; _(TR, p. 74)_
- [ ] **9.** Permitir o cadastramento de todas as referências salariais contendo no mínimo o símbolo da referência e o histórico dos valores salariais para cada referência; _(TR, p. 74)_
- [ ] **10.** Permitir o cadastramento de todos os cargos do quadro de pessoal de natureza efetivo, comissionado e temporário com no mínimo a Nomenclatura, Natureza, Grau de Instrução, CBO, Referência Salarial Inicial, Quantidade Criada, registrar as atribuições necessárias em cada cargo; _(TR, p. 74)_
- [ ] **11.** Possuir “atalhos” para consulta de dados dos servidores permitindo, que de um mesmo local possa ser consultado diversas informações, como: dados financeiros, dependentes, licenças e afastamentos, férias e licença prêmio; _(TR, p. 75)_
- [ ] **12.** Estabelecer um único código de registro para o servidor, para que através deste possam ser aproveitados os dados cadastrais de servidor que já trabalhou no Órgão Público e permitir controlar todos os vínculos empregatícios que o servidor tenha ou venha a ter com este, possibilitando a consulta de dados históricos, independente do período trabalhado; _(TR, p. 75)_
- [ ] **13.** Validar dígito verificador do número do CPF; _(TR, p. 75)_
- [ ] **14.** Validar dígito verificador do número do PIS; _(TR, p. 75)_
- [ ] **15.** Permitir o reajuste parcial ou global das referências salariais; _(TR, p. 75)_
- [ ] **16.** Permitir o cadastramento e controle dos vínculos dos servidores efetivos, que estão nomeados em cargo de comissão possibilitando a consulta das informações cadastrais de ambos os vínculos; _(TR, p. 75)_
- [ ] **17.** Localizar servidores por Nome ou parte dele; _(TR, p. 75)_
- [ ] **18.** Localizar servidores pelo CPF; _(TR, p. 75)_
- [ ] **19.** Localizar servidores pelo RG; _(TR, p. 75)_
- [ ] **20.** Permitir a inclusão de um novo contrato a partir de informações de um contrato já existente, selecionando um ou vários servidores. Isto é muito utilizado na recontratação de servidores temporários; _(TR, p. 75)_
- [ ] **21.** Permitir a informação do desligamento a um servidor para pagamento individual da rescisão, bem como a informação de um único desligamento a um grupo de servidores para pagamento coletivo. Isto é muito utilizado na rescisão de servidores temporários cujos contratos vencem no mesmo dia; _(TR, p. 75)_
- [ ] **22.** Possibilitar a configuração das formas de desligamento por regime de trabalho e motivo de rescisão, para garantir que não seja informado um desligamento inadequado para o servidor, por exemplo: término de contrato para um servidor efetivo; _(TR, p. 75)_
- [ ] **23.** Possibilitar a configuração das formas de admissão por regime de trabalho, categoria funcional, regime previdenciário e tipo de admissão, para garantir que não seja admitido um servidor com informações fora dos padrões permitidos; _(TR, p. 75)_
- [ ] **24.** Permitir o cadastramento de todos os lançamentos fixos dos servidores (adicionais, gratificações, consignações, etc...), para efeito de pagamento ou desconto em folha, com no mínimo, o código da verba (verificando se a verba está prevista para o regime de trabalho do servidor); _(TR, p. 76)_
- [ ] **25.** Permitir transferência coletiva nos itens: Local de Trabalho, Lotação, Custeio, Cargo, Padrão de Salário; _(TR, p. 76)_
- [ ] **26.** Permitir lançamentos coletivos nos itens (Lançamentos Fixos, Lançamentos Variáveis) _(TR, p. 76)_
- [ ] **27.** Permitir o registro de Dedução de INSS em outra empresa para realizar o abatimento correto. _(TR, p. 76)_
- [ ] **28.** Permitir realizar o cadastro de substituição de cargos, em ocasião de férias ou licenças; _(TR, p. 76)_
- [ ] **29.** Viabilizar o registro de ocorrências profissionais dos servidores, previstas na legislação municipal, possibilitando consulta de tais registros a partir do cadastro do servidor; _(TR, p. 76)_
- [ ] **30.** Permitir o registro de tempo averbado anterior; _(TR, p. 76)_
- [ ] **31.** Realizar a digitalização de qualquer tipo de documento dos servidores, seja Certidões, RG, Atestados, Certificados, etc.; _(TR, p. 76)_
- [ ] **32.** Permitir que seja adicionado ao cadastro de cada funcionário a foto; _(TR, p. 76)_
- [ ] **33.** Permitir o cadastro de fichas de avaliação para os servidores; _(TR, p. 76)_
- [ ] **34.** Criação de log (exclusão, inclusão, alteração) que o usuário tenha feito no sistema; _(TR, p. 76)_
- [ ] **35.** Cadastro de Perfis de usuário com permissões de: Inclusão, alteração, visualização; _(TR, p. 76)_
- [ ] **36.** Permitir planejamento (definindo cronograma, ministrante, carga horária e data da emissão de certificado) e execução de cursos de aperfeiçoamento, por iniciativa do órgão e por solicitação dos próprios servidores, com emissão de relatório desse planejamento. _(TR, p. 76)_
- [ ] **37.** Permitir o cadastro de bolsistas/estagiários _(TR, p. 76)_
- [ ] **38.** Permitir o cadastro de atividades a serem desenvolvidas pelos estagiarios _(TR, p. 76)_
- [ ] **39.** Permitir cadastro das instituições de ensino conveniadas com o órgão; _(TR, p. 76)_
- [ ] **40.** Permitir o cadastro de carreiras _(TR, p. 77)_
- [ ] **41.** Permitir o registro de autônomos no sistema de folha de pagamento com seus respectivos códigos de identificação de prestador de serviços, separado dos servidores, porém acessando o mesmo banco de dados; Férias _(TR, p. 77)_
- [ ] **42.** Manter o cadastro de todos os períodos aquisitivos de férias dos servidores desde a admissão até a exoneração; _(TR, p. 77)_
- [ ] **43.** Permitir o lançamento de mais que um período de gozo para o mesmo período aquisitivo de férias controlando o saldo restante dos dias de férias; _(TR, p. 77)_
- [ ] **44.** Permitir o pagamento de 1/3 de férias integral ou proporcional a cada período de gozo lançado; _(TR, p. 77)_
- [ ] **45.** Permitir o lançamento de um mesmo período de gozo para um grupo de servidores, facilitando este lançamento quando vários servidores vão sair de férias no mesmo período; _(TR, p. 77)_
- [ ] **46.** Permitir o lançamento e pagamento do adiantamento de 13º salário por ocasião das férias. _(TR, p. 77)_
- [ ] **47.** Permitir a geração da planilha de férias anual _(TR, p. 77)_
- [ ] **48.** Permitir o pagamento de 20 dias de férias para cargos como Raio X _(TR, p. 77)_
- [ ] **49.** Medicina do Trabalho e Licenças e Afastamentos _(TR, p. 77)_
- [ ] **50.** Manter o cadastro do CID e a descrição da doença; _(TR, p. 77)_
- [ ] **51.** Manter o cadastro de todos os médicos que atendem os servidores públicos municipais com o Nome e CRM; _(TR, p. 77)_
- [ ] **52.** Efetuar o lançamento de todos os tipos de licenças a seguir: Licenças Maternidade, Acidente do Trabalho, Acompanhamento de Pessoa da Família, Prorrogação de Doença e Acidente de Trabalho, informando no mínimo a Identificação do servidor, tipo de licença ou afastamento, documento apresentado, médico que atendeu, CID informado no atendimento, médico que fez a perícia, CID informado na perícia e período homologado da licença ou afastamento; _(TR, p. 77)_
- [ ] **53.** Efetuar o controle dos Acidentes de Trabalho através do cadastramento da CAT e a emissão do formulário padronizado; _(TR, p. 77)_
- [ ] **54.** Captar automaticamente os dados da CAT como: doença informada no atendimento e médico que atendeu no lançamento de atestado referente a acidente do trabalho; _(TR, p. 77)_
- [ ] **55.** Permitir lançar a data da alta médica para as licenças e afastamentos; _(TR, p. 78)_
- [ ] **56.** Controlar afastamentos de menos de 15 dias, mesmo que apresentados em períodos interruptos, quando caracterizar que são da mesma causa, evitando pagamento indevido por parte do Órgão e possibilitando o encaminhamento ao INSS; _(TR, p. 78)_
- [ ] **57.** Controlar prorrogações de licenças para evitar que ultrapasse o limite de dias permitido para a mesma; _(TR, p. 78)_
- [ ] **58.** Possuir rotina para lançamento de Licença Gestante (Maternidade) de 180 dias, com geração em verbas separadas dos 120 dias e 60 dias, prevendo abatimento na Guia de Previdência somente do previsto em lei; _(TR, p. 78)_
- [ ] **59.** Manter o cadastro de todos os períodos aquisitivos de licença prêmio dos servidores desde a admissão até a exoneração; _(TR, p. 78)_
- [ ] **60.** Permitir o lançamento de mais que um período de gozo para o mesmo período aquisitivo de licença prêmio controlando o saldo restante dos dias; _(TR, p. 78)_
- [ ] **61.** Efetuar o lançamento de todos os tipos de licenças, a seguir: Licença Gala, Licença Nojo e Licença sem Vencimento, informando no mínimo a Identificação do servidor, tipo de licença, documento apresentado, data de início e término da licença; _(TR, p. 78)_
- [ ] **62.** Possibilitar a criação de tipos de afastamento permitindo ao usuário configurar e definir suspensões de contagem de tempo de serviço, contagem de tempo de férias e contagem de tempo para 13ºsalário. _(TR, p. 78)_
- [ ] **63.** Permitir realizar o cadastro do PPRA. _(TR, p. 78)_
- [ ] **64.** Permitir cadastrar o EPI por Cargo. _(TR, p. 78)_
- [ ] **65.** Permitir Cadastrar o EPI por Funcionário. _(TR, p. 78)_
- [ ] **66.** Permitir cadastrar Edital e Eleições da CIPA _(TR, p. 78)_
- [ ] **67.** Permitir cadastrar Membros da CIPA _(TR, p. 78)_
- [ ] **68.** Deverá possuir registro e controle dos cedidos e recebidos em cedência Atos Administrativos _(TR, p. 78)_
- [ ] **69.** Manter o cadastro de todos os textos que darão origem a atos administrativos como Portaria, Decretos, Contratos e Termos de Posse; _(TR, p. 78)_
- [ ] **70.** Gerar automaticamente o ato administrativo a partir de um lançamento de licenças e afastamentos, com o registro no currículo funcional do servidor, após a tramitação; _(TR, p. 79)_
- [ ] **71.** Gerar automaticamente o ato administrativo a partir de um lançamento de férias em gozo de férias, com o registro no currículo funcional do servidor, após a tramitação; _(TR, p. 79)_
- [ ] **72.** Gerar automaticamente o ato administrativo a partir de um lançamento de licença prêmio em gozo com o registro no currículo funcional do servidor, após a tramitação; _(TR, p. 79)_
- [ ] **73.** Gerar automaticamente o ato administrativo a partir de um lançamento de licença sem vencimento, com o registro no currículo funcional do servidor, após a tramitação; _(TR, p. 79)_
- [ ] **74.** Gerar automaticamente o ato administrativo a partir de um lançamento de licença gala, com o registro no currículo funcional do servidor, após a tramitação; _(TR, p. 79)_
- [ ] **75.** Gerar automaticamente o ato administrativo a partir de um lançamento de licença nojo, com o registro no currículo funcional do servidor, após a tramitação; _(TR, p. 79)_
- [ ] **76.** Gerar automaticamente o ato administrativo a partir de um lançamento de suspensão ou advertência, com o registro no currículo funcional do servidor, após a tramitação; _(TR, p. 79)_
- [ ] **77.** Gerar automaticamente o ato administrativo a partir de um lançamento de Insalubridade, Periculosidade e Gratificação, com registro no currículo funcional do servidor; _(TR, p. 79)_
- [ ] **78.** Permitir a emissão de atos administrativos individuais ou coletivos conforme textos configurados pelo próprio usuário; Vale Transporte _(TR, p. 79)_
- [ ] **79.** Permitir o cadastramento das empresas que fornecem o vale transporte; _(TR, p. 79)_
- [ ] **80.** Permitir a controle dos roteiros para os quais serão utilizados os passes; _(TR, p. 79)_
- [ ] **81.** Permitir o registro da quantidade de passes diários utilizados pelo servidor no percurso de ida e volta ao trabalho com possibilidade de adição de passes para outros percursos, no caso de servidores que se deslocam para mais que um local de trabalho; _(TR, p. 79)_
- [ ] **82.** Gerar mapa de compra de vales-transporte com a quantidade e o valor, discriminados por tipo de passe, baseado na informação dos passes requisitados por cada servidor e os dias úteis do período a ser utilizado; _(TR, p. 80)_
- [ ] **83.** Permitir a configuração dos códigos para desconto e restituição de vale transporte em folha de pagamento; _(TR, p. 80)_
- [ ] **84.** Gerar mapa de entrega de passes para cada servidor baseado na informação dos passes requisitados e os dias úteis do período a ser utilizado; _(TR, p. 80)_
- [ ] **85.** Controlar a entrega de passes reduzindo a quantidade/créditos em casos de faltas, férias, licenças e afastamentos; _(TR, p. 80)_
- [ ] **86.** Gerar automaticamente informação para desconto do vale transporte em folha de pagamento após lançamento da entrega dos passes; Contagem de Tempo de Serviço _(TR, p. 80)_
- [ ] **87.** Calcular o tempo de efetivo exercício para fins de Adicional por Tempo de Serviço, abatendo as faltas injustificadas e as licenças não contadas como efetivo exercício, emitindo certidão para concessão e atualização do percentual concedido para pagamento em folha, controlando os períodos aquisitivos, prorrogando ou cancelando os mesmos, por motivo de excesso de ausências em relação ao limite estabelecido; _(TR, p. 80)_
- [ ] **88.** Calcular o tempo de efetivo exercício para fins de Férias, abatendo as faltas injustificadas e as licenças não contadas como efetivo exercício, concedendo os dias de direito de gozo de férias, controlando os períodos aquisitivos, prorrogando ou cancelando os mesmos, por motivo de excesso de ausências em relação ao limite estabelecido; _(TR, p. 80)_
- [ ] **89.** Calcular o tempo de efetivo exercício para fins de Progressão Salarial, abatendo as faltas injustificadas e as licenças não contadas como efetivo exercício, emitindo certidão para concessão e atualização do salário para pagamento em folha, controlando os períodos aquisitivos, prorrogando ou cancelando os mesmos, por motivo de excesso de ausências em relação ao limite estabelecido; _(TR, p. 80)_
- [ ] **90.** Calcular o tempo de efetivo exercício para fins de Aposentadoria, abatendo as faltas injustificadas e as licenças não contadas como efetivo exercício, emitindo certidão demonstrando o tempo de efetivo exercício até a data atual. Permitir a informação de tempos anteriores oriundos de outros órgãos, consolidando todo o tempo na certidão para fins de aposentadoria. Ponto Eletrônico _(TR, p. 80)_
- [ ] **91.** Leitura de registro de relógios; _(TR, p. 81)_
- [ ] **92.** Extrato Individual ou Coletivo de Registro de Ponto; _(TR, p. 81)_
- [ ] **93.** Montagem de Escalas; _(TR, p. 81)_
- [ ] **94.** Cadastro de regras para apuração de horas; _(TR, p. 81)_
- [ ] **95.** Aplicação de tolerância na leitura de registro; _(TR, p. 81)_
- [ ] **96.** Apuração de horas para Banco de Horas ou Lançamentos; _(TR, p. 81)_
- [ ] **97.** Relatório de faltas, atrasos, registros inconsistentes e saldos. Concurso Público _(TR, p. 81)_
- [ ] **98.** Permitir realização e/ou o acompanhamento de concursos públicos e processos seletivos para provimento de vagas. _(TR, p. 81)_
- [ ] **99.** Permitir o acompanhamento de quais vagas foram abertas no concurso. _(TR, p. 81)_
- [ ] **100.** Permitir realizar o concurso para um Setor em específico. _(TR, p. 81)_
- [ ] **101.** Realizar o cadastro da equipe que está acompanhando o concurso, informando de qual equipe pertence, fiscal ou comissão. _(TR, p. 81)_
- [ ] **102.** Permitir informar e acompanhar os candidatos inscritos no concurso. _(TR, p. 81)_
- [ ] **103.** Preencher automaticamente se o candidato foi aprovado ou não no concurso mediante a nota da prova. _(TR, p. 81)_
- [ ] **104.** Permitir informar se a vaga do candidato é especial. _(TR, p. 81)_
- [ ] **105.** Permitir informar se o candidato assume ou desistiu da sua vaga. _(TR, p. 81)_
- [ ] **106.** Permitir cadastrar os títulos informados pelos candidatos. _(TR, p. 81)_
### Folha de Pagamento _(p. 81)_

- [ ] **107.** Permitir o processamento das folhas de: Pagamento Mensal, Rescisão, Adiantamento de Férias, Licença Prêmio, Adiantamento Salarial, Adiantamento de Décimo Terceiro Salário, Décimo Terceiro Salário e Complementar; _(TR, p. 81)_
- [ ] **108.** Permitir o processamento de várias folhas de pagamento para a mesma referência, separando por grupo de servidores de mesmo vínculo ou mesmo regime ou mesma data de pagamento; _(TR, p. 81)_
- [ ] **109.** Permitir o processamento de folha de rescisão individual ou coletiva com cálculos de férias indenizadas, proporcionais e 13º salário automaticamente, sem a necessidade de lançamento avulso na folha; _(TR, p. 82)_
- [ ] **110.** Permitir a inclusão de valores variáveis na folha como os provenientes de horas extras, empréstimos, descontos diversos e ações judiciais, para um servidor ou um grupo de servidores no caso de lançamento comum a todos; _(TR, p. 82)_
- [ ] **111.** Permitir a inclusão de verbas de forma rapida, incluindo a mesma verba para vários funcionarios, facilitando a inserção dos dados _(TR, p. 82)_
- [ ] **112.** Permitir o lançamento de informações para a folha de forma descentralizada, onde cada secretaria possa realizar os lançamentos apenas aos servidores nela lotados. _(TR, p. 82)_
- [ ] **113.** Controlar os vencimentos e descontos permitidos em cada regime de trabalho, impossibilitando que seja efetuado o lançamento de um vencimento ou desconto exclusivo de um regime em um outro; _(TR, p. 82)_
- [ ] **114.** A folha de Adiantamento de Férias deverá ser processada com as informações dos dias de pecúnia e/ou gozo lançadas nas férias, não permitindo duplicidade de lançamento em variável na folha de pagamento; _(TR, p. 82)_
- [ ] **115.** Gerar automaticamente os valores relativos ao salário família dos dependentes; _(TR, p. 82)_
- [ ] **116.** Possuir rotinas de cálculos através de fórmulas e expressões em português, para qualquer vencimento e desconto, tornando o cálculo da folha totalmente configurado e administrado pelo próprio usuário. Possibilitar que o próprio usuário crie novas verbas de vencimentos ou descontos, reutilizando uma já existente, configurando as incidências e a regra de cálculo. As regras de cálculo previstas em legislação federal ou estadual deverão estar no sistema e não deverão ser alteradas por usuário comum; _(TR, p. 82)_
- [ ] **117.** Possibilitar a execução do cálculo ou recálculo de diversas formas como: Individual, por faixa de matrícula e seleção aleatória. Calcular e processar os valores relativos à contribuição individual e patronal para o RGPS (INSS) e RPPS (Previdência Municipal), de acordo com o regime previdenciário do servidor. _(TR, p. 82)_
- [ ] **118.** Permitir a importação de dados, via arquivo texto, de valores a serem consignados em folha controlando os registros válidos e rejeitados pelo processamento _(TR, p. 83)_
- [ ] **119.** Permitir o cadastramento de lançamentos parcelados, a crédito ou a débito, para os servidores, de forma a controlar as parcelas lançadas em folha e o saldo atual remanescente. O lançamento das parcelas em folha deve ser de forma automática, podendo ser pago ou descontado o total ou parte do valor baseado em uma fórmula de cálculo que calcule um percentual sobre a remuneração, permitindo o lançamento até o limite deste percentual, atualizando o saldo remanescente automaticamente após o encerramento da folha. _(TR, p. 83)_
- [ ] **120.** Possuir integração com o Módulo de Administração Orçamentária e Financeira, através de arquivo texto, importando as configurações contábeis das verbas de vencimento e Desconto _(TR, p. 83)_
- [ ] **121.** Possuir cálculo de INSS proporcional na folha de pagamento para servidores com emprego fora do Órgão; _(TR, p. 83)_
- [ ] **122.** Possuir rotinas de controle e cálculo para pagamento das pensões judiciais, a partir do desconto efetuado para o servidor, incluindo depósito em conta; _(TR, p. 83)_
- [ ] **123.** Possuir rotinas de cálculo de insuficiência de saldo para servidores com estorno na folha, efetuando ajuste automático dos descontos limitados até um teto configurado pelo usuário. A prioridade dos descontos deve ser configurada pelo usuário e os valores consignados que não foram descontados deverão ser registrados possibilitando a emissão de relatórios destes valores para envio aos estabelecimentos conveniados; _(TR, p. 83)_
- [ ] **124.** Possuir rotina para o cadastramento das fichas financeiras que não estão em meio magnético, ou seja, fichas financeiras que estão em papel; _(TR, p. 83)_
- [ ] **125.** Permitir a inclusão de lançamentos para servidores afastados sendo que estes lançamentos somente poderão ser processados na primeira folha em que o servidor retornar do afastamento. Os lançamentos ficam pendentes durante todo o período do afastamento sendo incluído automaticamente na folha somente no término do afastamento e retorno do servidor ao trabalho; _(TR, p. 83)_
- [ ] **126.** Possuir rotina de reajuste salarial, possibilitando reajustes globais e parciais; _(TR, p. 83)_
- [ ] **127.** Existir funcionalidade de comparativo de servidores entre duas competências, podendo comparar apenas um Lançamento específico, comparar o valor líquido, comparar o valor bruto de cada servidor; _(TR, p. 84)_
- [ ] **128.** Permitir estipular valor para tolerância para a comparação, além de realizar a comparação por cargo, secretaria, regime, banco _(TR, p. 84)_
- [ ] **129.** Gerar as informações referentes aos provisionamentos, baixas e estornos de férias, 13º salário e seus respectivos encargos patronais, conforme as Normas Brasileiras de Contabilidade Aplicadas ao Setor Público. _(TR, p. 84)_
- [ ] **130.** Permitir cadastrar as diárias do servidores, e realizando o cálculo da folha conforme o valor lançado. _(TR, p. 84)_
- [ ] **131.** Permitir o controle de limite de pagamento, não ultrapassando o padrão salarial do Prefeito/Presidente _(TR, p. 84)_
- [ ] **132.** Permitir a importação de planilhas, inserido os dados diretamente no Lançamento Fixo ou Mensal, permitindo que as colunas sejam identificadas com os campos de leitura no momento da importação, sem layout prévio. _(TR, p. 84)_
- [ ] **133.** Permitir a geração de lançamento específico para vários servidores. _(TR, p. 84)_
- [ ] **134.** Permitir que seja visualizado mensalmente, todos os servidores que estão terminando licenças, que deverão retornar ao trabalho para que se possa ser verificado o seu retorno e efetuar o pagamento. _(TR, p. 84)_
- [ ] **135.** Disponibilizar na internet, em tempo real, informações pormenorizadas sobre a execução orçamentária e financeira, atendendo a LAI. _(TR, p. 84)_
- [ ] **136.** Permitir realizar a transferência de saldo contábil _(TR, p. 84)_
- [ ] **137.** Permitir realizar o fechamento da folha de pagamento, evitando alterações após o encerramento da mesma. _(TR, p. 84)_
- [ ] **138.** Permitir o bloqueio no cadastro de funcionários, para evitar alterações que interfiram no momento do fechamento da folha. Geração de Arquivos _(TR, p. 84)_
- [ ] **139.** Gera arquivo SEFIP e validar as inconsistências no formato TXT para importação em software da Caixa Econômica federal; _(TR, p. 84)_
- [ ] **140.** Permitir rotina de comparação da base de dados da SEFIP/GFIP coma folha de pagamento automaticamente através do software; _(TR, p. 84)_
- [ ] **141.** Gerar e validar as inconsistências para a DIRF, nos padrões da legislação vigente, via arquivo texto para importação no software da Receita Federal _(TR, p. 85)_
- [ ] **142.** Gerar e validar as inconsistências para a RAIS, nos padrões da legislação vigente, via arquivo texto para importação no software do _(TR, p. 85)_
### SERPRO; _(p. 85)_

- [ ] **143.** Gerar as informações de admissão e rescisão necessárias ao CAGED, via arquivo texto, para importação no software do Ministério do Trabalho; _(TR, p. 85)_
- [ ] **144.** Permitir a geração de arquivos para crédito em conta, corrente ou poupança, da rede bancária, emitindo relação dos créditos contendo matrícula, nome, número da conta e valor a ser creditado; _(TR, p. 85)_
- [ ] **145.** Possuir integração com o Módulo de Administração Orçamentária e Financeira,disponibilizando os dados necessários para reserva, empenho, liquidação e pagamento das despesas com pessoal, possibilitando informar datas diferentes para pagamento de convênios; _(TR, p. 85)_
- [ ] **146.** Possuir rotina de Geração de Arquivos Digitais do INSS – MANAD, possibilitando a prestação de informações via arquivo texto, conforme Instrução Normativa MPS/SRP nº 12, de 20/06/2006 – DOU de 04/07/2006; _(TR, p. 85)_
- [ ] **147.** Gerar arquivo texto para utilização em cálculo atuarial; _(TR, p. 85)_
- [ ] **148.** Permitir a geração de arquivos pré-definidos e conter os recursos de "gerador de arquivos txt", para que o próprio usuário possa montar e gerar o arquivo desejado a partir de informações administrativas no setor, em "layout" e ordem selecionada. _(TR, p. 85)_
- [ ] **149.** Deve permitir que possam ser gravados diferentes tipos de seleção para facilitar a emissão de arquivos rotineiros. _(TR, p. 85)_
- [ ] **150.** Permitir a geração de arquivo de Retorno e Margem Consignável para as empresas responsáveis pelo controle das Consignações dos servidores. _(TR, p. 85)_
- [ ] **151.** Permitir a geração de arquivos para crédito de benefícios, como Vale Alimentação e/ou Refeição _(TR, p. 85)_
- [ ] **152.** Permitir a geração de arquivos para Tribunal de Contas dos estados brasileiros; _(TR, p. 85)_
- [ ] **153.** Possibilitar a criação de relatórios específicos para o SIOPE (Sistema de Informações sobre Orçamentos Públicos em Educação). _(TR, p. 85)_
### Relatórios _(p. 86)_

- [ ] **154.** Permitir a emissão dos Avisos de Férias; _(TR, p. 86)_
- [ ] **155.** Permitir a emissão do Requerimento de Benefício por Incapacidade solicitado pelo INSS; _(TR, p. 86)_
- [ ] **156.** Possuir consulta de afastamentos em tela ou relatório por tipo de afastamento, por doença e por período; _(TR, p. 86)_
- [ ] **157.** Permitir a emissão do Termo de Rescisão; _(TR, p. 86)_
- [ ] **158.** Permitir a emissão de relatórios com textos pré-definidos, para que o próprio usuário possa editar e imprimir para quem desejado. _(TR, p. 86)_
- [ ] **159.** Permitir a emissão da Ficha Funcional dos servidores. _(TR, p. 86)_
- [ ] **160.** Permitir a emissão dos servidores admitidos no mês; _(TR, p. 86)_
- [ ] **161.** Permitir a emissão de servidores demitidos no mês; _(TR, p. 86)_
- [ ] **162.** Permitir a emissão de formulários padronizados e atualizados da rescisão de contrato conforme as portarias do Governo Federal. _(TR, p. 86)_
- [ ] **163.** Permitir a emissão dos relatórios de observações dos servidores _(TR, p. 86)_
- [ ] **164.** Permitir a emissão da certidão de tempo de serviço _(TR, p. 86)_
- [ ] **165.** Permitir a emissão da Folha Analítica por folha processada ou Consolidada, todas as folhas processadas no mês; _(TR, p. 86)_
- [ ] **166.** Permitir a emissão do Mapa Financeiro com o resumo dos vencimentos e descontos de todas as folhas com possibilidade de, dentro do mês, emitir das folhas separadamente ou consolidando os valores em um único resumo; _(TR, p. 86)_
- [ ] **167.** Permitir a emissão do resumo dos valores líquidos da folha por banco ; _(TR, p. 86)_
- [ ] **168.** Permitir a emissão do Informe de Rendimentos para servidores com retenção de Imposto de Renda na Fonte e para aqueles que não tiveram retenção; _(TR, p. 86)_
- [ ] **169.** Manter histórico para cada servidor com detalhamento de todos os pagamentos e descontos, permitindo consulta ou emissão de relatórios; _(TR, p. 86)_
- [ ] **170.** Permitir a emissão dos contracheques, permitindo a inclusão de textos e mensagens em todos os contracheques, para determinados servidores ou para um grupo de servidores selecionados; _(TR, p. 86)_
- [ ] **171.** Permitir a emissão Guia de Recolhimento de INSS com opções de quebra por centro de custo, secretarias, permitindo imprimir somente a Guia de INSS de valores do mês, bem como a Guia de INSS com valores da competência 13. _(TR, p. 86)_
- [ ] **172.** Permitir a emissão de recibos para pagamento de pensão judicial; _(TR, p. 87)_
- [ ] **173.** Permitir a emissão de Guia de Recolhimento de Previdência Municipal; _(TR, p. 87)_
- [ ] **174.** Permitir a emissão da relação do Salários de Contribuição padrão _(TR, p. 87)_
### INSS; _(p. 87)_

- [ ] **175.** Emitir relatório de folha de pagamento completas com as opções de _(TR, p. 87)_
### quebra por no mínimo: _(p. 87)_

> a) Banco _(TR, p. 87)_
> b) Cargo _(TR, p. 87)_
> c) Regime _(TR, p. 87)_
> d) Lotações _(TR, p. 87)_
- [ ] **176.** Emitir relatório de folha de pagamento com no mínimo as seguintes _(TR, p. 87)_
### informações: _(p. 87)_

> a) Base de valores; _(TR, p. 87)_
> b) Datas de Demissão; _(TR, p. 87)_
> c) Valores Patronais de Previdência. _(TR, p. 87)_
- [ ] **177.** Permitir com que o usuário monte seu próprio relatório, a partir de informações administrativas no setor, em "layout" e ordem selecionada, contendo recursos de "gerador de relatório". _(TR, p. 87)_
- [ ] **178.** Permitir que o próprio usuário monte gráficos para a administração _(TR, p. 87)_
- [ ] **179.** Deve emitir o Perfil Profissiográfico Previdenciário – PPP, baseado no histórico do servidor; _(TR, p. 87)_
- [ ] **180.** Deve permitir que possam ser gravados diferentes tipos de seleção para facilitar a emissão de relatórios rotineiros. E-social _(TR, p. 87)_
- [ ] **181.** Permitir a geração do arquivo de qualificação cadastral dos servidores, podendo essa geração ser com quebras de secretarias, situações de servidores, para envio ao e-Social. _(TR, p. 87)_
- [ ] **182.** Permitir importar o arquivo de qualificação cadastral (retorno do e- Social) ao sistema, mostrando as divergências encontradas nos dados dos servidores, e ainda orientação de como deverá ser solucionado essas divergências. _(TR, p. 87)_
- [ ] **183.** Permitir realizar a configuração dos dados da empresa, conforme cada forma de trabalho da entidade, para geração dos eventos S-1000 e S-1005. _(TR, p. 88)_
- [ ] **184.** Permitir a configuração das rubricas utilizadas pela folha de pagamento, conforme as tabelas do eSocial, indicando as suas incidências, para a geração dos eventos S-1010. _(TR, p. 88)_
- [ ] **185.** Permitir configuração de cargos e funções gratificadas conforme as tabelas disponibilizadas pelo comitê do e-Social, para a geração dos eventos S-1030 e S-1040. _(TR, p. 88)_
- [ ] **186.** Permitir a configuração dos horários existentes no órgão, conforme os campos exigidos pelo e-Social, para a geração do evento S-1050. _(TR, p. 88)_
- [ ] **187.** Permitir a configuração dos ambientes de trabalho, com seus fatores de risco para a geração do evento S-1060. _(TR, p. 88)_
- [ ] **188.** Permitir cadastrar os processos judiciais, conforme os campos exigidos pelo e- Social, além de realizar sua vinculação as rubricas ou configurações do empregador, para realizar a geração do evento S-1070. _(TR, p. 88)_
- [ ] **189.** Permitir a validação dos eventos iniciais e de tabelas, antes mesmo de enviá-los ao ambiente do e-Social, fazendo com que assim possam ser eliminados os erros e divergências existentes. _(TR, p. 88)_
- [ ] **190.** Permitir ainda, que na tela de validação dos eventos, ao clicar no erro, o sistema abrir diretamente na tela e no campo do sistema de Recursos Humanos e Folha de Pagamento, onde está divergente conforme o layout, para que o usuário possa realizar a correção. _(TR, p. 88)_
- [ ] **191.** Permitir que no ambiente de produção dos eventos iniciais e de tabelas, ao realizar a validação o sistema aponte automaticamente para o usuário, qual evento é necessário enviar uma alteração e/ou inclusão. _(TR, p. 88)_
- [ ] **192.** Permitir realizar a validação dos eventos não periódicos, antes mesmo de enviá- los ao ambiente do eSocial, fazendo com que assim possam ser eliminados os erros e divergências existentes. _(TR, p. 88)_
- [ ] **193.** Permitir captar as informações do sistema de Folha de Pagamento, para realizar a geração dos eventos periódicos, tanto de remunerações como de reabertura e fechamento de eventos. _(TR, p. 88)_
- [ ] **194.** Permitir na transmissão de cada lote ao portal do eSocial, a consulta via sistema, do protocolo e os recibos existentes, mostrando assim os eventos enviados e sua situação mediante o recebimento do eSocial. _(TR, p. 88)_
- [ ] **195.** O sistema deverá gravar os recibos de cada loto enviado, em sua base de dados, para consultas futuras. _(TR, p. 89)_
- [ ] **196.** O sistema deverá estar atualizado com a última versão do eSocial. _(TR, p. 89)_
- [ ] **197.** Deve capturar informações necessárias do Bando de Dados da Folha de pagamento para geração das informações. _(TR, p. 89)_
- [ ] **198.** Permitir integração constante com Banco de Dados da Folha de pagamento para informativos de prazos de entrega dos arquivos. _(TR, p. 89)_
- [ ] **199.** O sistema/módulo deverá, como função principal, uma análise de impacto do e- Social, verificando a base de dados, identificando as correções necessárias para atender o envio correto das informações, possibilitando a correção das inconsistências encontradas nos cadastros da Folha de Pagamento; _(TR, p. 89)_
- [ ] **200.** Realizar uma busca na base de dados, diagnosticando as inconsistências em relação aos leiautes do e-Social e novas parametrizações necessárias; _(TR, p. 89)_
- [ ] **201.** Apresentar uma lista de ações a serem tomadas, que podem ser corrigidas pelo próprio usuário, reduzindo os riscos de erros nos envios de informações ao e- Social. _(TR, p. 89)_

## Portal do Servidor

- [ ] **1.** Permitir o acesso ao Portal do Servidor Público com logon/senha, utilizando como padrão de logon CPF. _(TR, p. 89)_
- [ ] **2.** O portal do Servidor Público deverá permitir a solicitação de nova senha em caso de esquecimento, enviando link com nova senha para o e-mail previamente cadastrado. _(TR, p. 89)_
- [ ] **3.** O portal do Servidor Público deverá permitir consulta e emissão do Contracheque, Consulta e emissão do Informe de Rendimentos no layout da Receita Federal do Brasil RFB, mediante identificação do logon e senha, por servidor. _(TR, p. 89)_
- [ ] **4.** O portal do Servidor Público deverá permitir a validação do contracheque impresso via web pelo servidor/agente político, utilizando a forma de autenticação QR code ou código de validação, para comprovação de autenticidade. _(TR, p. 89)_
- [ ] **5.** O portal do Servidor Público deverá permitir ao usuário do RH conferir as informações enviadas através do Portal do Servidor, e validar ou rejeitar as mesmas com documentos anexados quando necessário. _(TR, p. 90)_
- [ ] **6.** Permitir emissão de listagem dos aniversariantes _(TR, p. 90)_
- [ ] **7.** Permitir o cadastro de avisos individuais ou coletivos para os funcionários _(TR, p. 90)_
- [ ] **8.** Permitir a emissão do Organograma do Órgão com suas divisões e responsáveis _(TR, p. 90)_
- [ ] **9.** Permitir a consulta da Ficha Funcional _(TR, p. 90)_
- [ ] **10.** Permitir a consulta da Ficha Financeira Anual _(TR, p. 90)_
- [ ] **11.** Permitir a Solicitação de Alteração em Dados Cadastrais permitindo anexar o documento de comprovação _(TR, p. 90)_
- [ ] **12.** Permitir a Solicitação de Atestado ou Perícia Médica Informando o período, CID, Médico Responsável e anexando o Comprovante do Atestado ou da Perícia digitalizado a solicitação _(TR, p. 90)_
- [ ] **13.** Conter link com a documentação necessária para requisições em geral _(TR, p. 90)_
- [ ] **14.** Permitir ao funcionário que o mesmo possa solicitar o período de férias de acordo com o período aquisitivo e dentro do prazo mínimo e máximo para saída das férias _(TR, p. 90)_
- [ ] **15.** Permitir ao funcionário que o mesmo possa solicitar cursos em diversas áreas contento nome do curso, local, data, carga horária, justificativa, valor, os gastos adicionais com hospedagem, diárias ou quaisquer despesas podendo anexar também o documento (flyer) digitalizado relacionado ao curso _(TR, p. 90)_
- [ ] **16.** Permitir ao Gestor autorizar as alterações cadastrais solicitadas pelos funcionários _(TR, p. 90)_
- [ ] **17.** Permitir ao Gestor autorizar os atestados ou perícias médicas solicitadas pelos funcionários _(TR, p. 90)_
- [ ] **18.** Permitir ao Gestor autorizar os pedidos de férias solicitadas pelos funcionários _(TR, p. 90)_
- [ ] **19.** Permitir ao Gestor autorizar os Cursos solicitadas pelos funcionários _(TR, p. 90)_
- [ ] **20.** O portal do Servidor Público deverá permitir parametrizar quais os dados cadastrais o servidor/agente político terá acesso para conferência e atualização, permitindo ainda que o RH defina quais “campos” deverá enviar comprovante para validar as atualizações. _(TR, p. 90)_

## Gestão Tributária

> Requisitos do Cadastro Geral de Pessoas _(TR, p. 91)_
- [ ] **1.** Permitir registro em Cadastro Único de Pessoas utilizando como identificador o CPF ou CNPJ, para indexação de pessoas físicas, jurídicas e equiparadas à jurídicas; _(TR, p. 91)_
- [ ] **2.** Permitir o cadastramento do endereçamento completo das pessoas, com múltiplos endereços, possibilitando parametrizar e identificar cada um dos tipos; _(TR, p. 91)_
- [ ] **3.** Permitir o cadastramento de dados de contato das pessoas, com múltiplos contatos, possibilitando ainda parametrizar os tipos de contatos; _(TR, p. 91)_
- [ ] **4.** Permitir o registro das situações cadastrais das pessoas, possibilitando parametrizar e identificar cada um dos tipos, bem como a vigência de cada uma das alterações; _(TR, p. 91)_
- [ ] **5.** Permitir anexar arquivos digitalizados de documentos com informações do Tipo do documento, identificador, Data de Expedição e Validade; _(TR, p. 91)_
- [ ] **6.** Permitir o relacionamento entre pessoas com qualificação deste vínculo; _(TR, p. 91)_
- [ ] **7.** Permitir o vínculo com Imóveis; _(TR, p. 91)_
- [ ] **8.** Permitir o vínculo com unidades econômicas e profissionais; _(TR, p. 91)_
- [ ] **9.** Permitir a atualização cadastral em massa com no mínimo informações de CPF/CNPJ e Nome/Razão Social; _(TR, p. 91)_
- [ ] **10.** Possibilitar a inclusão/alteração de dados pelo próprio contribuinte via processo administrativo, com validação prévia pelo gestor, antes dos dados serem atualizados; _(TR, p. 91)_
- [ ] **11.** Possibilitar a inclusão/alteração de dados pelo próprio contribuinte, com validação prévia pelo gestor, antes dos dados serem atualizados; _(TR, p. 91)_
- [ ] **12.** Permitir a emissão de relatórios gerenciais mediante inserção de parâmetros; _(TR, p. 91)_
- [ ] **13.** Registrar todas as alterações efetuadas no cadastro de cada pessoa, possibilitando consultar histórico das alterações (antes e depois) com hora, dia e usuário responsável pela alteração, fornecendo também o número do processo que amparou a alteração, quando for o caso; _(TR, p. 91)_
- [ ] **14.** Permitir criar atributos específicos no cadastro de pessoa, através de parametrização, não sendo necessário envolver desenvolvimento. _(TR, p. 91)_
- [ ] **15.** Permitir a integração com o API, Consulta CNPJ do SERPRO, para acesso a informações atualizadas do cadastro de pessoas físicas em tempo real, no momento de inclusão ou alteração do cadastro de pessoa jurídica; _(TR, p. 92)_
- [ ] **16.** Permitir a integração com o API, Consulta CPF do SERPRO, para acesso a informações atualizadas do cadastro de pessoas físicas em tempo real, no momento de inclusão ou alteração do cadastro de pessoa física; _(TR, p. 92)_
- [ ] **17.** Permitir cadastrar múltiplos tipos de documentos relativos à pessoa física, tais como informações completas de RG, CPF, Passaporte e CNH. _(TR, p. 92)_
- [ ] **18.** Permitir cadastrar múltiplos observações no cadastro de pessoa. _(TR, p. 92)_
- [ ] **19.** Permitir importação com arquivo de DNE ou banco de dados disponibilizado pelos correios. Requisitos do Cadastro Imobiliário _(TR, p. 92)_
- [ ] **20.** Permitir o cadastro dos imóveis situados na área geográfica do município, sejam urbanas ou rurais, unidades ou subunidades, nas diversas situações como por exemplo com habite-se ou em pré-cadastro; _(TR, p. 92)_
- [ ] **21.** Permitir o cadastro de condomínios, aproveitando informações comuns para o cadastro das subunidades; _(TR, p. 92)_
- [ ] **22.** Permitir o cadastro de Campanhas de Recadastramento aberta aos contribuintes; _(TR, p. 92)_
- [ ] **23.** Permitir o cadastro dos imóveis, com atributos próprios previstos na legislação, tais como dimensões do terreno e da construção, testada, localização, características topográficas e de conformação, características construtivas, elementos de construção, equipamentos especiais, localização, destinação, tipo de patrimônio, fatores de correção de terreno e de construção, padrão construtivo, ente outros; _(TR, p. 92)_
- [ ] **24.** Permitir cadastro e alteração da base territorial municipal (por exemplo: logradouros, faixas de logradouros, quadras, face de quadra) e das suas agregações (por exemplo: bairros e setor fiscal); _(TR, p. 92)_
- [ ] **25.** Permitir o registro e a alteração da situação fiscal dos tributos (por exemplo: contribuinte, imune, isento, não incidente); _(TR, p. 92)_
- [ ] **26.** Permitir troca de informações entre os módulos do sistema tributário, possibilitando acesso a todos os dados relacionados, tais como, informações da condição da pessoa como contribuinte, apresentado todas os cadastros mercantis relacionados e com detalhamento destas informações. Apresentar os ITBI's relacionados, além dos protocolos, execuções, notificações, entre outros; _(TR, p. 92)_
- [ ] **27.** Permitir o controle da situação cadastral do imóvel; _(TR, p. 93)_
- [ ] **28.** Permitir registrar o endereçamento completo de localização do imóvel; _(TR, p. 93)_
- [ ] **29.** Permitir registrar o endereçamento completo do destinatário da correspondência do imóvel; _(TR, p. 93)_
- [ ] **30.** Permitir anexar arquivos digitais, inclusive a documentação legal do imóvel; _(TR, p. 93)_
- [ ] **31.** Possibilitar vincular processos administrativos ao imóvel; _(TR, p. 93)_
- [ ] **32.** Permitir o cadastramento, alteração e consulta de dados de imóveis, com vigência na data, em data retroativa ou em data futura; _(TR, p. 93)_
- [ ] **33.** Permitir o relacionamento entre condomínio e imóveis nele inseridos, com vigência na data, em data retroativa ou em data futura; _(TR, p. 93)_
- [ ] **34.** Permitir o georreferenciamento das unidades imobiliárias através do armazenamento das suas coordenadas; _(TR, p. 93)_
- [ ] **35.** Permitir o relacionamento entre pessoas físicas e jurídicas com imóveis com a qualificação do relacionamento (p.ex. proprietário, detentor de domínio útil, compromissário, possuidor, inventariante, administradora imobiliária), com possibilidade de indicação do percentual de participação, quando for o caso; _(TR, p. 93)_
- [ ] **36.** Permitir o relacionamento entre inscrições imobiliárias, com sua respectiva vigência, indicando a qualificação da relação, atribuindo a informação de uma ou mais inscrições mães ou inscrições filhas, especialmente quando imóvel for resultado de desmembramento e remembramento, além de permitir outras vinculações (relação entre imóvel público e privado, laje, entre outros). _(TR, p. 93)_
- [ ] **37.** Permitir troca de informações entre os módulos do sistema tributário possibilitando acesso a todos os dados relacionados, tais como, informações da condição da pessoa como contribuinte, apresentado todas os cadastros mercantis relacionados e com detalhamento destas informações. Em relação ao(s) imóveis, apresentar todos os imóveis relacionados detalhando todas as características, como tamanho, boletim de informação cadastral - BCI, histórico de proprietários, ITBI's relacionados, além dos protocolos, execuções fiscais, entre outros; _(TR, p. 93)_
- [ ] **38.** Registrar todas as alterações efetuadas no cadastro de cada imóvel, possibilitando consultar histórico das alterações (antes e depois) com hora, dia e usuário responsável pela alteração, fornecendo também o número do processo que amparou a alteração, quando for o caso. _(TR, p. 94)_
- [ ] **39.** Permitir que no ato de alteração de qualquer dado do BCI, o novo valor venal, possa ser visto em tela. _(TR, p. 94)_
- [ ] **40.** Permitir que para mesma matricula de imóvel, possam ser cadastradas diversas áreas construídas e para cada uma destas que, se possa registrar diferentes características de BCI, gerando valores venais distintos que irão compor o valor venal total do imóvel; _(TR, p. 94)_
- [ ] **41.** Permitir visualizar todos os BCI’s, valores venais e valores por metro quadrado, que foram aplicados ao longo dos anos, mantendo-se estes dados no histórico cada um dos exercícios; _(TR, p. 94)_
- [ ] **42.** Manter no cadastro do imóvel, todo o histórico de áreas construídas, contendo a data de inclusão e sua data de inativação; _(TR, p. 94)_
- [ ] **43.** Permitir criar atributos específicos no cadastro de imóvel, através de parametrização, não sendo necessário envolver desenvolvimento; _(TR, p. 94)_
- [ ] **44.** Permitir parametrizar os tipos de áreas vinculadas ao imóvel, possibilitando informar as características construtivas por área. _(TR, p. 94)_
- [ ] **45.** Permitir informar os logradouros lindeiros no cadastro imobiliário. _(TR, p. 94)_
- [ ] **46.** Permitir informar a fração territorial do imóvel, e controlar automaticamente a fracão territorial dos imóveis vinculados a condomínios e empreendimentos. _(TR, p. 94)_
- [ ] **47.** Permitir cadastrar múltiplos observações no cadastro de imóvel. _(TR, p. 94)_
- [ ] **48.** Permitir que a partir de um determinado imóvel, posse se copiar as características e se aplicar em novos cadastros de imóveis, a quantidade de cópias, deverá ser informada pelo usuário; _(TR, p. 94)_
- [ ] **49.** Permitir a criação de serviço para atualização ou recadastramento imobiliário, vinculado a um fiscal/servidor do Município. Este serviço poderá ser criado por imóvel, por faixa de imóvel, por setor, por distrito, por rua, por quadra ou por loles; _(TR, p. 94)_
- [ ] **50.** Permitir que os serviços atualização ou recadastramento imobiliário, seja realizado por aplicação, in loco, com aplicação em tempo de execução na base de dados; _(TR, p. 94)_
- [ ] **51.** Permitir que seja configurado quais informações do cadastro Imobiliário possam ser habilitados para o contribuinte atualizar ou cadastrar em tempo real os imóveis, através de um aplicativo disponibilizado ao contribuinte; _(TR, p. 95)_
- [ ] **52.** Permitir que os serviços atualização ou recadastramento imobiliário, seja realizado por aplicação, in loco, com aplicação em tempo real de execução na base de dados; _(TR, p. 95)_
- [ ] **53.** Possuir rotina de mensagem de orientação sobre o recadastramento, sendo que essa mensagem deverá ser apresentada na tela de recadastramento e também impressa no protocolo; _(TR, p. 95)_
- [ ] **54.** Permitir a visualização dos dados e documentos enviados pelos contribuintes, para validação da fiscalização; _(TR, p. 95)_
- [ ] **55.** Permitir o download dos documentos anexados pelo contribuinte no preenchimento do recadastramento; _(TR, p. 95)_
- [ ] **56.** Permitir a impressão do protocolo de recadastramento. _(TR, p. 95)_
- [ ] **57.** Lançamentos dos Tributos Diretos Imobiliário _(TR, p. 95)_
- [ ] **58.** Permitir, a partir de dados cadastrais, efetuar o cálculo e recálculo dos tributos imobiliários, conforme legislação, com vigência na data atual, em data retroativa ou em data futura; _(TR, p. 95)_
- [ ] **59.** Permitir, a partir de dados cadastrais, efetuar o lançamento dos tributos imobiliários de ofício em lote pré-definidos ou individualmente; _(TR, p. 95)_
- [ ] **60.** Permitir a parametrização dos dados para lançamento dos tributos, com base em atributos previstos na legislação; _(TR, p. 95)_
- [ ] **61.** Permitir simular cálculos de tributos imobiliários, com lançamento de ofício, para visualização do valor e do demonstrativo de cálculo, sem efeito no extrato financeiro (sem efetivar o lançamento); _(TR, p. 95)_
- [ ] **62.** Permitir alterar a data de vencimento dos tributos IPTU para o exercício vigente e para o próximo exercício. _(TR, p. 95)_
- [ ] **63.** Permitir impugnação de elementos cadastrais do imóvel pelo contribuinte para reavaliação da base de cálculo e, consequentemente, do tributo devido, oferecendo possibilidade ao contribuinte de efetuar o pagamento da parte reconhecida. _(TR, p. 95)_
- [ ] **64.** Permitir emissão de Demonstrativo de Lançamento para consulta online, ou para notificação eletrônica pelo do Domicílio Eletrônico do Contribuinte ou para geração de arquivo eletrônico para impressão de boletos e/ou carnês, conforme formato e leiaute definido, incluindo código de barras. _(TR, p. 95)_
- [ ] **65.** Permitir a emissão de relatórios gerenciais mediante inserção de parâmetros. _(TR, p. 96)_
- [ ] **66.** Registrar todas as alterações financeiras efetuadas no tributo, possibilitando existir consulta do histórico das alterações (antes e depois) com hora, dia e usuário responsável pela alteração, fornecendo também o número do processo que amparou a alteração, quando for o caso, fazendo a escrituração no sistema contábil da prefeitura do lançamento e de todas as suas alterações, em conformidade com o MCASP – Manual de Contabilidade Aplicada ao Setor Público; _(TR, p. 96)_
- [ ] **67.** Permitir gerar Documento de Arrecadação Municipal – DAM para pagamentos parciais relativo ao lançamento; _(TR, p. 96)_
- [ ] **68.** Permitir agrupar a emissão da DAM para vários lançamentos realizados; _(TR, p. 96)_
- [ ] **69.** Possuir rotinas de identificação de inconsistência de dados na avaliação do valor venal e no cálculo do IPTU por imóvel, permitindo análise e correção das inconsistências, bem como listagem dos cadastros inconsistentes. _(TR, p. 96)_
- [ ] **70.** Permitir a realização de lançamentos com base de cálculo, valor do imposto e acréscimos legais informados pelo gestor, para atendimento de decisões judiciais e administrativas, registrando os dados dos processos/autorizações; Requisitos do Cadastro Mercantil _(TR, p. 96)_
- [ ] **71.** Permitir cadastro e manutenção de unidades econômicas e profissionais, inclusive autônomos, estabelecidas ou não estabelecidas, das pessoas físicas, jurídicas e as estas equiparadas, com os atributos próprios previstos na legislação (tais como: nome/razão social, nome fantasia, CPF/CNPJ, endereço localização, data constituição, regime tributação, natureza jurídica, porte empresa, CNAE’s, etc); _(TR, p. 96)_
- [ ] **72.** Permitir consulta a dados históricos dos contribuintes. _(TR, p. 96)_
- [ ] **73.** Permitir a alteração dos dados de cadastro das unidades econômicas e profissionais, com vigência na data, em data retroativa ou em data futura; _(TR, p. 96)_
- [ ] **74.** Atribuir número identificador próprio municipal, denominado Inscrição, as unidades econômicas e profissionais; _(TR, p. 96)_
- [ ] **75.** Permitir o registro e a alteração da situação fiscal dos tributos (por exemplo: contribuinte, imune, isento, não incidente); _(TR, p. 97)_
- [ ] **76.** Permitir o gerenciamento da situação cadastral do contribuinte; _(TR, p. 97)_
- [ ] **77.** Permitir o relacionamento entre unidades econômicas e profissionais com a qualificação do relacionamento (por exemplo: matriz, filial, escritório, depósito) e sua respectiva vigência; _(TR, p. 97)_
- [ ] **78.** Permitir o relacionamento das unidades econômicas e profissionais com imóveis; _(TR, p. 97)_
- [ ] **79.** Permitir o relacionamento das unidades econômicas e profissionais com pessoas indicando a qualificação do relacionamento (por exemplo: sócioadministrador, sócio, entre outros); _(TR, p. 97)_
- [ ] **80.** Permitir anexar arquivos digitais, inclusive a documentação legal; _(TR, p. 97)_
- [ ] **81.** Possibilitar vincular processos administrativos, podendo ser detalhado; _(TR, p. 97)_
- [ ] **82.** Possibilitar vincular notificações, podendo ser detalhado; _(TR, p. 97)_
- [ ] **83.** Permitir a parametrização dos dados para lançamento dos tributos com lançamento de ofício, com base em atributos previstos na legislação; _(TR, p. 97)_
- [ ] **84.** Permitir a emissão de relatórios gerenciais mediante inserção de parâmetros. _(TR, p. 97)_
- [ ] **85.** Permitir integração REDESIM (Rede Nacional para a Simplificação do Registro e da Legalização de Empresas e Negócios). _(TR, p. 97)_
- [ ] **86.** Registrar todas as alterações efetuadas no cadastro de cada unidade econômica, possibilitando consultar histórico das alterações (antes e depois) com hora, dia e usuário responsável pela alteração, fornecendo também o número do processo que amparou a alteração, quando for o caso. _(TR, p. 97)_
- [ ] **87.** Possibilitar cadastrar os históricos de vigências de enquadramento do simples nacional. _(TR, p. 97)_
- [ ] **88.** Permitir o cadastramento do endereçamento completo das unidades econômicas e profissionais, permitindo cadastrar múltiplos endereços, possibilitando parametrizar os tipos de endereços. _(TR, p. 97)_
- [ ] **89.** Permitir o cadastramento de dados de contato das unidades econômicas e profissionais, permitindo cadastrar múltiplos contatos, possibilitando parametrizar os tipos de contatos. _(TR, p. 97)_
- [ ] **90.** Permitir que no cadastro de unidades econômicas sejam informados os valores apurados de faturamento por exercício fiscal. _(TR, p. 97)_
- [ ] **91.** Permitir o cadastro de torres de telefonia, caixas eletrônicos e órgãos sem personalidade jurídica com atributos próprios, vinculado ao cadastro de unidades econômicas, não permitindo gerar cadastros de unidades econômicas com CNPJ duplicado. _(TR, p. 98)_
- [ ] **92.** Permitir cadastrar múltiplos observações no cadastro de unidades econômicas e profissionais. _(TR, p. 98)_
- [ ] **93.** Permitir o cadastramento de cooperados, vinculados ao cadastro mercantil. _(TR, p. 98)_
- [ ] **94.** Lançamento dos Tributos Diretos Mobiliário _(TR, p. 98)_
- [ ] **95.** Permitir efetuar o cálculo e recálculo dos tributos relacionados ao exercício de atividade econômica, com lançamento de ofício com vigência na data, em data retroativa ou em data futura; _(TR, p. 98)_
- [ ] **96.** Permitir simular cálculos de tributos relacionados ao exercício de atividade econômica, com lançamento de ofício, para visualização do valor e do demonstrativo de cálculo sem efeito no extrato financeiro (sem efetivar o lançamento); _(TR, p. 98)_
- [ ] **97.** Permitir emissão de Demonstrativo de Lançamento para consulta online, ou para notificação eletrônica pelo do Domicílio Eletrônico do Contribuinte ou para geração de arquivo eletrônico para impressão de boletos e/ou carnês, conforme formato e leiaute definido, incluindo código de barras. _(TR, p. 98)_
- [ ] **98.** Registrar todas as alterações financeiras efetuadas no tributo, possibilitando existir consulta do histórico das alterações (antes e depois) com hora, dia e usuário responsável pela alteração, fornecendo também o número do processo que amparou a alteração, quando for o caso. _(TR, p. 98)_
- [ ] **99.** Permitir a alimentar o faturamento, indicando a fonte utilizada na apuração, para classificação fiscal do contribuinte, conforme legislação. _(TR, p. 98)_
- [ ] **100.** Permitir impugnação do faturamento e se estabelecido pelo contribuinte, para a reavaliação da base de cálculo da Taxa de Localização e Funcionamento - TFF, consequentemente, do tributo devido, oferecendo possibilidade ao contribuinte de efetuar o pagamento da parte reconhecida. _(TR, p. 98)_
- [ ] **101.** Permitir parametrizar o cálculo por atividade, possibilitando cadastrar os valores de unidades fiscais, vinculando ao cadastro mercantil; _(TR, p. 98)_
- [ ] **102.** Permitir anexar documentos no lançamento constituído; _(TR, p. 98)_
- [ ] **103.** Permitir gerar DAM para pagamentos parciais relativo ao lançamento. _(TR, p. 99)_
- [ ] **104.** Permitir a importação do arquivo GFIP, para apurar o número de profissionais que prestam serviços em nome de uma empresa sujeita a tributação de forma fixa; _(TR, p. 99)_
- [ ] **105.** Realizar a integração com os sistemas de declaração de serviços e NFS-e, a fim de recepcionar os lançamentos do ISS; _(TR, p. 99)_
- [ ] **106.** Realizar a integração com o sistema contábil do município, a partir do lançamento do crédito tributário. _(TR, p. 99)_
- [ ] **107.** Possuir rotina de identificação de inconsistência de dados no cálculo das Taxas Mobiliárias por empresa, permitindo análise e correção das inconsistências, bem como listagem dos cadastros inconsistentes. _(TR, p. 99)_
- [ ] **108.** Permitir a realização de lançamentos com base de cálculo, valor do tributo e acréscimos legais informados pelo gestor, para atendimento de decisões judiciais e administrativas, registrando os dados dos processos/autorizações. _(TR, p. 99)_
- [ ] **1.** Integração Municipal à Junta Comercial _(TR, p. 99)_
- [ ] **109.** O sistema flexível e parametrizável, que otimize a troca de informações com o integrador estadual sob responsabilidade da Junta Comercial do Estado. _(TR, p. 99)_
- [ ] **110.** O sistema contém módulos com recursos diferenciados, que contribuirão para a maior eficiência dos processos municipais de Abertura, Alteração e Baixa de Empresas. _(TR, p. 99)_
- [ ] **111.** Na funcionalidade Cliente o sistema realiza a integração com o sistema Integrador Estadual para recebimento e envio de dados nas etapas de Viabilidade, Formalização e Licenciamento. _(TR, p. 99)_
- [ ] **112.** Na funcionalidade Análise de Viabilidade recebe os dados de localização e atividades pretendidas para o empreendimento, respondendo às solicitações automaticamente, embasado pelas tabelas de tomada de decisões elaboradas a partir da lei de uso do solo municipal. _(TR, p. 99)_
- [ ] **113.** Na funcionalidade Formalização o sistema consome os protocolos contendo os eventos de Abertura, Alteração e Baixa de empresas diretamente do Integrador Estadual, não devendo haver necessidade de redigitação de dados ou fichas cadastrais por parte da Prefeitura e nem do Empreendedor, respeitando o conceito de entrada única de dados pela junta comercial. _(TR, p. 99)_
- [ ] **114.** O sistema, na Constituição de Empresas, logo após a geração do CNPJ pela Receita Federal, processa os dados disponibilizados pelo Integrador Estadual, fazendo funcionar o sistema de integração municipal à junta comercial que realizará a conferência da integridade dos mesmos, gerando na sequência uma nova Inscrição Municipal e cadastrando a nova empresa na base de dados municipal. _(TR, p. 100)_
- [ ] **115.** O sistema realiza eventos de alteração e baixa de empresas, quando o sistema de integração municipal à junta comercial deverá então inserir automaticamente no cadastro econômico local os dados atualizados pelas esferas estadual e federal. _(TR, p. 100)_
- [ ] **116.** O sistema está preparado para receber automaticamente os dados de constituição do MEI - Microempreendedor Individual, disponibilizados pelo Integrador Estadual. _(TR, p. 100)_
- [ ] **117.** O sistema, ao final do processo de formalização, para as empresas que tiverem CNAE(s) de serviço em seu cadastro, serão credenciadas automaticamente na Nota Fiscal de Serviços Eletrônica – NFS-e. _(TR, p. 100)_
- [ ] **118.** O sistema permite a fácil revisão/atualização dos Riscos das Atividades. _(TR, p. 100)_
- [ ] **1.** Requisitos do Financeiro e Arrecadação _(TR, p. 100)_
- [ ] **119.** Configurações Tributos e Receitas _(TR, p. 100)_
- [ ] **120.** Possuir funcionalidade que permita criação, manutenção e consulta de tipos de obrigações tributárias, bem como suas definições e regras de aplicação. Por exemplo, definir número de parcelas, valor mínimo, entre outros. _(TR, p. 100)_
- [ ] **121.** Possuir funcionalidade que permita a manutenção do histórico de regras de elegibilidade, cálculos e algoritmos, com a identificação de vigência destas. _(TR, p. 100)_
- [ ] **122.** Permitir a criação/definição e manutenção de diferentes calendários e regras de aplicação de calendários de tributação (elegibilidade, cálculos diversos e outros). _(TR, p. 100)_
- [ ] **123.** Permitir a utilização de unidades fiscais de referência em campos monetários, com indexação com principais índices como IPCA, IPCA-E, SELIC etc. _(TR, p. 100)_
- [ ] **124.** Permitir atualização do crédito tributário através da aplicação de um determinado índice definido pela Administração, inclusive com a possibilidade de aplicabilidade restrita a determinados lotes de contribuintes. _(TR, p. 101)_
- [ ] **125.** Permitir parametrizar agrupamentos de DAM para pagamento por conta bancária, por tributo ou geral. _(TR, p. 101)_
- [ ] **126.** Permitir a emissão do edital de convocação para ciência de Notificação de Lançamento da Contribuição de Melhoria. _(TR, p. 101)_
- [ ] **127.** Possuir rotina de cálculo parametrizável para cobrança de Contribuição de Melhoria, baseada em rateio de custo. _(TR, p. 101)_
- [ ] **128.** Permitir a emissão do edital de convocação para ciência da cobrança de Contribuição de Melhoria. _(TR, p. 101)_
- [ ] **129.** Permitir parametrização e geração de contribuição de melhoria, possibilitando o cadastramento da Obra, Etapa e Rua, e seus respectivos valores conforme faixas das testadas tributadas. _(TR, p. 101)_
- [ ] **130.** Permitir em tempo real ao contribuinte / profissional o requerimento e acompanhamento do processo, inclusive sendo possível a interação entre o fisco municipal e o requerente, para emissões de alvarás do tipo Sanitário, Ambiental compreendendo a licença prévia – LP, licença de instalação – Ll e licença de operação – LO. _(TR, p. 101)_
- [ ] **131.** Permitir a importação de arquivo de cartão de crédito, possibilitando cruzar informações com serviços declarados das NFS-e e Declaração do Simples Nacional. _(TR, p. 101)_
### Emissão de DAM e Pagamento: _(p. 101)_

- [ ] **132.** Permitir a emissão de documento de arrecadação, inclusive a segunda via; _(TR, p. 101)_
- [ ] **133.** Permitir que todos os documentos de arrecadação sejam emitidos com PIX nos Documentos de Arrecadação Municipal – DAM; _(TR, p. 101)_
- [ ] **134.** Permitir a recepção e processamento de arquivos, padrão FEBRABAN, proveniente de agentes arrecadadores; _(TR, p. 101)_
- [ ] **135.** Permitir baixa automática das dívidas com pagamentos repassados pelo agente arrecadador; _(TR, p. 101)_
- [ ] **136.** Permitir o acompanhamento e gestão dos documentos de arrecadação emitidos, pagos e não pagos, por tributo e período, permitindo visualizar os pagamentos que não baixaram créditos tributários, pagamentos indevidos ou a maior, entre outros; _(TR, p. 102)_
- [ ] **137.** Permitir importar manualmente ou recepcionar automaticamente arquivo de informações de ISS – SIMPLES NACIONAL em formato disponibilizado pela União para registro automático da baixa do tributo; _(TR, p. 102)_
- [ ] **138.** Permitir a seleção de débitos de diferentes tributos ou de dívidas não tributárias, inclusive de várias inscrições de um mesmo contribuinte, para pagamento em um único documento de arrecadação ou processo de parcelamento; _(TR, p. 102)_
- [ ] **139.** Permitir a emissão de documento de arrecadação por agente arrecadador ou por contribuinte das diferenças a menor nos pagamentos repassados; _(TR, p. 102)_
- [ ] **140.** Permitir automaticamente rejeitar um arquivo de pagamento eletrônico recebido, inserindo registro de pagamento rejeitado por motivo; _(TR, p. 102)_
- [ ] **141.** Permitir o link site to site para o pagamento, direcionando para a rede bancária arrecadadora; _(TR, p. 102)_
- [ ] **142.** Disponibilizar meios para gerar documento de arrecadação para uso de outros órgãos; Gestão Financeira _(TR, p. 102)_
- [ ] **143.** Permitir acompanhamento e gestão dos débitos possibilitando consultar histórico de transações financeiras efetuadas (constituição, revisão e extinção), visualização dos débitos a vencer, no nível de cotas, com a possibilidade de aplicação de filtros, individualizando os dados referentes ao valor original, atualização monetária, juros de mora e multa de mora; _(TR, p. 102)_
- [ ] **144.** Permitir compensação de crédito, conforme legislação tributária; _(TR, p. 102)_
- [ ] **145.** Permitir transferência de crédito, conforme legislação tributária; _(TR, p. 102)_
- [ ] **146.** Permitir consultar, após os procedimentos de compensação ou transferência, a origem e o destino dos créditos, gerando relatório detalhado; _(TR, p. 102)_
- [ ] **147.** Permitir cadastrar ou descadastrar restituição de importância para posterior aprovação por usuários específicos (com perfil autorizado), conforme legislação tributária; _(TR, p. 102)_
- [ ] **148.** Permitir o cadastro de usuários com perfis autorizados a aprovar restituições cadastradas, de acordo com os valores das alçadas estabelecidas na legislação específica (portaria de delegação de competência); _(TR, p. 103)_
- [ ] **149.** Permitir o ajuste das restituições aprovadas que sejam rejeitadas no momento do pagamento por inconsistência nos dados do contribuinte (integração com o sistema de pagamentos); _(TR, p. 103)_
- [ ] **150.** Permitir aplicar os efeitos da prescrição e da decadência e o cancelamento de débitos, conforme legislação tributária; _(TR, p. 103)_
- [ ] **151.** Permitir a correção manual (fazer e desfazer operações) das transações financeiras de pagamento e extinção do crédito tributário do contribuinte, com a transcrição do motivo e indicação do processo administrativo; _(TR, p. 103)_
- [ ] **152.** Permitir a apropriação dos pagamentos e outras transações financeiras para extinção do crédito tributário, no nível de cotas, com valor e data de vencimento por cota, recalculando o saldo remanescente a cada baixa financeira; _(TR, p. 103)_
- [ ] **153.** Permitir a troca de arquivos entre Banco e Prefeitura realizada automaticamente trafegando informações de Cadastramento em débito automático, cancelamento de débito automático, agendamento de pagamentos, retorno de pagamentos efetivados, cancelamento de agendamento, ocorrências não debitadas; _(TR, p. 103)_
- [ ] **154.** Permitir a seleção de débitos para emissão de documento de arrecadação visando um depósito administrativo; _(TR, p. 103)_
- [ ] **155.** Permitir a conversão do depósito administrativo em renda para a quitação de débitos, ainda que parcial; _(TR, p. 103)_
- [ ] **156.** Permitir consultar os valores dos depósitos administrativos ou judiciais, comparando-os com os valores devidos e apurando sua conformidade para liquidação do débito; _(TR, p. 103)_
- [ ] **157.** Permitir o cálculo dos valores a serem levantados pela contratante e/ou pelo contribuinte em caso de pagamento por depósito judicial, considerando o saldo atual da(s) conta(s) judicial(ais) e os valores e datas dos respectivos depósitos; _(TR, p. 103)_
- [ ] **158.** Permitir o cálculo de atualização monetária e juros não capitalizáveis, aplicável nos casos especificados pelo usuário, para valores a serem restituídos ou para pagamentos em atraso; _(TR, p. 104)_
- [ ] **159.** Permitir a constituição dos créditos tributários lançados de ofício e por declaração, sendo possível consultar todos os elementos envolvidos no cálculo, para apresentação da memória de cálculo; _(TR, p. 104)_
- [ ] **160.** Permitir a revisão dos créditos tributários, sem perda das informações anteriores, ou seja, com guarda do histórico financeiro, bem como a de todos os elementos envolvidos no cálculo; _(TR, p. 104)_
- [ ] **161.** Permitir a emissão de Demonstrativo de Lançamento para cada constituição do crédito tributário ou revisão; _(TR, p. 104)_
- [ ] **162.** Permitir notificar contribuinte por meio eletrônico, e-mail, SMS, Domicílio Eletrônico, sempre que forem realizadas alterações na dívida ou destinação de crédito do sujeito passivo, seja decorrente de revisão, resultado de processo administrativo ou decisão judicial; _(TR, p. 104)_
- [ ] **163.** Permitir que seja definido o valor do crédito tributário independente dos parâmetros de cálculo (como base de cálculo, alíquota, entre outros), em cumprimento a decisão judicial; _(TR, p. 104)_
- [ ] **164.** Permitir o cálculo do valor a ser restituído através de RPV ou Precatório em função de decisão judicial, gerando um relatório específico para estes casos; _(TR, p. 104)_
- [ ] **165.** Permitir o bloqueio dos créditos para pedidos de restituição na via administrativa, em função de pleito na via judicial, registrando no extrato financeiro o processo administrativo e/ou judicial que deu origem ao bloqueio; _(TR, p. 104)_
- [ ] **166.** Permitir o cálculo do crédito tributário por CPF/CNPJ/Nº de Inscrição, conforme legislação, informando parâmetros (como base de cálculo, alíquota, entre outros) casuisticamente, gerando planilha detalhada; _(TR, p. 104)_
- [ ] **167.** Permitir a emissão do Documento de Arrecadação com o valor parcial da dívida constituída, para cumprimento de determinação judicial; _(TR, p. 104)_
- [ ] **168.** Permitir simular cálculos de tributos para visualização do valor e do demonstrativo de cálculo, sem efeito no extrato financeiro; _(TR, p. 104)_
- [ ] **169.** Permitir a baixa de crédito tributário nos casos de extinção por processo, remissão, dação em pagamento, transação, decisão administrativa ou judicial, entre outros; _(TR, p. 104)_
- [ ] **170.** Permitir o registro da suspensão da exigibilidade do crédito tributário com seleção a partir de filtros; _(TR, p. 105)_
- [ ] **171.** Permitir qualificar o crédito tributário como primeiro lançamento ou resultante de revisão, a maior ou a menor, ou isenções, imunidades, não incidências ou outras ações que tenham reflexo na dívida (impugnação administrativa ou decisão judicial, por exemplo); _(TR, p. 105)_
- [ ] **172.** Permitir a emissão do extrato financeiro do contribuinte, por Inscrição/CPF/CNPJ, com a opção de aplicação de filtros; Tributo Premiado _(TR, p. 105)_
- [ ] **173.** Permitir configurar mais de um sorteio por ano; _(TR, p. 105)_
- [ ] **174.** Permitir dar Nomes ao sorteio; _(TR, p. 105)_
- [ ] **175.** Permitir configurar gerar cupons sem verificar se o tributo está pago; _(TR, p. 105)_
- [ ] **176.** Permitir configurar gerar cupons somente para tributos que estiver pago; _(TR, p. 105)_
- [ ] **177.** Permitir configurar gerar cupons para todos os tipos de contribuintes; _(TR, p. 105)_
- [ ] **178.** Os cupons deverão ser gerados de forma virtual; _(TR, p. 105)_
- [ ] **179.** Possuir serviço no portal para gerenciamento para que o participante possa consultar seus cupons, os sorteios efetuados, bem como os ganhadores desde que o mesmo esteja logado ao portal de serviços da prefeitura; _(TR, p. 105)_
- [ ] **180.** Possuir Serviço no Portal sem login para conferir os sorteios e Ganhadores; _(TR, p. 105)_
- [ ] **181.** Permitir consultar de forma geral os cupons gerados, independente da situação; _(TR, p. 105)_
- [ ] **182.** Permitir consultar os documentos que geraram o cupom; _(TR, p. 105)_
- [ ] **183.** A geração do sorteio deverá ser feita de forma virtual; _(TR, p. 105)_
- [ ] **184.** A Rotina de sorteio poderá ser acessada somente no dia em que houver realização do sorteio, podendo ter mais de um sorteio para o mesmo dia, mas devendo realizar de forma individual cada sorteio; _(TR, p. 105)_
- [ ] **185.** Permitir após a realização do sorteio visualizar os ganhadores de cada sorteio; Benefício Fiscal _(TR, p. 105)_
- [ ] **186.** Permitir o registro e controle dos créditos em geral, inclusive os créditos constituídos em programa de benefício fiscal, assim como, a utilização para compensação de crédito tributário e emissão dos respectivos certificados; _(TR, p. 106)_
- [ ] **187.** Permitir a implantação de benefícios fiscais que implique redução da dívida do sujeito passivo, bem como permitir consulta e emissão de relatório que conste a base legal, contribuinte, exercício, valor do desconto e vigência; _(TR, p. 106)_
- [ ] **188.** Permitir o controle automático da vigência dos benefícios fiscais; _(TR, p. 106)_
- [ ] **189.** Permitir a extração de dados referentes a renúncia de receita por aplicação de benefícios fiscais, seja por redução do tributo a pagar ou por compensação de crédito, com possibilidade de exportação em arquivos; _(TR, p. 106)_
### Arrecadação – Conciliação com agente arrecadador _(p. 106)_

- [ ] **190.** Permitir cadastrar e manter os Agentes Arrecadadores; _(TR, p. 106)_
- [ ] **191.** Permitir acompanhamento e gestão da Arrecadação para fins de Conciliação dos repasses financeiros do agente arrecadador; _(TR, p. 106)_
- [ ] **192.** Permitir identificar diferenças na conciliação para cada agente arrecadador para determinado dia; _(TR, p. 106)_
- [ ] **193.** Permitir o estorno e exclusão de lotes de arrecadação processados com erro; _(TR, p. 106)_
- [ ] **194.** Permitir o registro baixa manual de pagamentos não transmitidos via arquivo ou não tratados na recepção dos arquivos do agente arrecadador; _(TR, p. 106)_
- [ ] **195.** Permitir o registro (baixa) de pagamentos recepcionados dos agentes arrecadadores e a conciliação com os repasses registrados no extrato bancário; _(TR, p. 106)_
- [ ] **196.** Permitir realizar operações para sanar diferenças de repasses de agentes arrecadadores em determinados dias; _(TR, p. 106)_
- [ ] **197.** Permitir o fechamento diário da conciliação por banco; _(TR, p. 106)_
- [ ] **198.** Permitir identificar sobras de repasses em controle individual para cada agente arrecadador; _(TR, p. 106)_
- [ ] **199.** Permitir apropriar sobras de repasses de dias anteriores para liberar conciliação financeira de um determinado dia; _(TR, p. 107)_
- [ ] **200.** Permitir estornar sobras de repasse de agente arrecadador; _(TR, p. 107)_
- [ ] **201.** Permitir a liberação automática e manual da conciliação dos repasses financeiros com os arquivos de pagamentos recebidos de cada agente arrecadador, de acordo com as regras de cada convênio; _(TR, p. 107)_
### Arrecadação – Débito Automático _(p. 107)_

- [ ] **202.** Permitir a transmissão e a recepção de arquivos de cadastro e exclusão de contribuinte optante pelo serviço de débito automático, conforme padrão FEBRABAN - Manual do Débito Automático; _(TR, p. 107)_
- [ ] **203.** Permitir a geração de arquivo de agendamento de pagamentos via débito automático para remessa aos agentes arrecadadores, conforme padrão FEBRABAN - Manual do Débito Automático; _(TR, p. 107)_
- [ ] **1.** Arrecadação – Classificação Fiscal _(TR, p. 107)_
- [ ] **204.** Possuir o cadastro do plano de contas para classificação da receita arrecadada; _(TR, p. 107)_
- [ ] **205.** Permitir parametrização para relacionar a classificação fiscal com os componentes das receitas de pagamentos conciliados para lançamentos contábeis, observado o MCASP – Manual de Contabilidade Aplicada ao Setor Público; _(TR, p. 107)_
- [ ] **206.** Transmitir os dados relacionados a pagamento, restituição de indébito, transferência e compensação para processamento no Sistema responsável pelo controle contábil e financeiro do Município, bem como recepcionar o resultado; Requisitos da Fiscalização _(TR, p. 107)_
- [ ] **207.** Sistema deve possui um módulo para que o Gestor possa fazer o _(TR, p. 107)_
### planejamento Anual da fiscalização empregando um dos seguintes filtros: _(p. 107)_

> CNAE, Classificação na Tabela de Atividades do ISSQN, por Bairro e ou por _(TR, p. 107)_
> Logradouro, selecionando os fiscais que farão parte do planejamento. _(TR, p. 107)_
- [ ] **208.** Possuir um módulo estratégico na gestão do ISS que possibilite o planejamento das ações fiscais a partir do cruzamento das informações apresentadas pelos contribuintes, identificando o potencial de ISS devido e não pago ao município, apontando as causas e a dimensão do fenômeno da evasão fiscal; _(TR, p. 107)_
- [ ] **209.** Realizar a apuração do ISSQN levando em consideração a Diferença nos Faturamentos identificados e a Alíquota correta da Faixa de Receita Bruta Anual ao Sujeito Passivo aplicada. _(TR, p. 108)_
- [ ] **210.** Apresenta relatório de análise da diferença na declaração, o mesmo tem por objetivo comparar, entre os sistemas DASN/PGDAS-D e a Nota Fiscal de Serviços Eletrônica – NFS-e, os valores de base de cálculo da Prestação de Serviços. _(TR, p. 108)_
- [ ] **211.** Possibilitar o cadastramento do fiscal responsável pela Ordem de Serviço; _(TR, p. 108)_
- [ ] **212.** Uma vez elaborado o Planejamento Anual o programa o sistema deverá gerar automaticamente as Ordens de Serviço para os fiscais. _(TR, p. 108)_
- [ ] **213.** O Sistema deve possuir um módulo para que o Gestor possa fazer o Planejamento de Força Tarefa, empregando um dos seguintes filtros: CNAE, Classificação na Tabela de Atividades do ISSQN, por Bairro e ou por Logradouro, e neste caso volta a considerar todos os contribuintes, mesmo aqueles já contemplados no Planejamento Anual. _(TR, p. 108)_
- [ ] **214.** O sistema deve permitir a geração de Ordem de Fiscalização Avulsa a qualquer tempo e para qualquer dos contribuintes, mesmo que já selecionados em outros processos anteriores. _(TR, p. 108)_
- [ ] **215.** O sistema deve permitir a geração de Ordem de Fiscalização a partir de solicitação do Fiscal, devidamente embasada. _(TR, p. 108)_
- [ ] **216.** O sistema deve permitir ao Gestor o acompanhamento de todas as ordens em relação ao tratamento dado pelos fiscais (leitura e fechamento de ordens). _(TR, p. 108)_
- [ ] **217.** O sistema deve permitir o Auditor/Fiscal a emissão do Termo de Início da Ação Fiscal – TIAF, com as seguintes informações: dados principais do contribuinte, data do início da fiscalização, documentos necessários para o início da fiscalização, prazo para atendimento, dados do agente de fiscalização que emitiu a correspondência, dados de ciência da notificação, data e pessoa que recebeu a correspondência; _(TR, p. 108)_
- [ ] **218.** O sistema deve permitir o Auditor/Fiscal a emissão do Mapa de Apuração de débitos fiscais. _(TR, p. 109)_
- [ ] **219.** Permitir consulta dos Termos de Início de Ação Fiscais realizadas, em aberto ou cancelados. _(TR, p. 109)_
- [ ] **220.** O sistema deve permitir o Auditor/Fiscal a emissão do Auto de Infração da obrigação principal e acessória. _(TR, p. 109)_
- [ ] **221.** O sistema deve permitir o Auditor/Fiscal a emissão e consulta do Termo de Apreensão. _(TR, p. 109)_
- [ ] **222.** O sistema deve permitir o Auditor/Fiscal a emissão e consulta do Termo de Encerramento de fiscalização. _(TR, p. 109)_
- [ ] **223.** Permitir geração de Termos de Recebimentos dos documentos intimados. _(TR, p. 109)_
- [ ] **224.** Permitir consulta dos Termos de Recebimentos realizados. _(TR, p. 109)_
- [ ] **225.** Permitir geração de Termos de Devoluções dos documentos recebidos. _(TR, p. 109)_
- [ ] **226.** Possibilitar a customização de todos os documentos disponibilizados para o fisco durante a Fiscalização; _(TR, p. 109)_
- [ ] **227.** Permitir o registro de descontos da multa por infração de acordo com a legislação; _(TR, p. 109)_
- [ ] **228.** Permitir a impressão de guias para pagamento do Auto de Infração; _(TR, p. 109)_
- [ ] **229.** Permitir a configuração das regras necessárias para a aplicação de correção monetária e multas, conforme legislação vigente; _(TR, p. 109)_
- [ ] **230.** Permitir a impressão de guias para pagamento do Auto de Infração; _(TR, p. 109)_
- [ ] **231.** Enviar automaticamente para o domicílio eletrônico do contribuinte todos os documentos fiscais para ciência do mesmo; _(TR, p. 109)_
- [ ] **232.** Permitir a parametrização da pontuação para os auditores-fiscais por tipo de programação fiscal; _(TR, p. 109)_
- [ ] **233.** Permitir a parametrização de demonstrativos de cálculos suportados por fórmulas específicas para os tributos, obrigação principal e obrigação acessória; _(TR, p. 109)_
- [ ] **234.** Permitir a definição de permissões de acesso às funcionalidades do sistema; _(TR, p. 109)_
- [ ] **235.** Permitir ao módulo de fiscalização o cruzamento de dados de todas as informações disponíveis no banco de dados com informações prestadas pelos contribuintes para realizar malhas fiscais; _(TR, p. 109)_
- [ ] **236.** Permitir a emissão de documentos fiscais em unidade ou em lote; _(TR, p. 110)_
- [ ] **237.** Permitir a execução da Ação Fiscal por auditor-fiscal; _(TR, p. 110)_
- [ ] **238.** Disponibilizar no módulo da fiscalização os dados dos cadastros mobiliário, imobiliário, financeiro, permitindo a seleção pela administração dos campos que podem ser editados pelos auditores durante a fiscalização, sem que haja alteração nos respectivos cadastros; _(TR, p. 110)_
- [ ] **239.** Permitir a utilização de demonstrativos de cálculos com fórmulas para cada tipo de tributo; _(TR, p. 110)_
- [ ] **240.** Permitir a realização dos cálculos e recálculos relacionados com atualização monetária, multa de Infração, multa de mora e juros de mora, a partir do valor original do lançamento; _(TR, p. 110)_
- [ ] **241.** Permitir a inclusão automática nos demonstrativos de cálculos dos valores lançados quando se tratar de tributos lançados de ofício; _(TR, p. 110)_
- [ ] **242.** Permitir o acompanhamento e gerenciamento, em tempo real, da fiscalização em todas as fases; _(TR, p. 110)_
- [ ] **243.** Permitir a lavratura (emissão) de documentos fiscais durante a ação fiscal; _(TR, p. 110)_
- [ ] **244.** Permitir guardar o histórico das programações fiscais e fiscalizações; _(TR, p. 110)_
- [ ] **245.** Permitir a mensuração das tarefas executadas pelos auditores através de pontuação parametrizável para composição de componente salarial; _(TR, p. 110)_
- [ ] **246.** Permitir a geração relatórios periódicos da pontuação dos auditoresfiscais; _(TR, p. 110)_
- [ ] **247.** Permitir o cadastro do salário possibilitando definir o limite de pontos, configuração do valor dos pontos por fiscal, salário-base do funcionário, da produtividade variável (arrecadação) e da parte fixa. _(TR, p. 110)_
- [ ] **248.** No Cadastro de Faixa de Pontos pode se configurar a quantidade de pontos recebido por uma faixa de valor do item cadastrado. _(TR, p. 110)_
- [ ] **249.** Possuir Cadastro de Limite, onde informa o valor máximo que o funcionário poderá receber. _(TR, p. 110)_
- [ ] **250.** Permitir o lançamento da produtividade devida, na tela de Lançamentos do mês. _(TR, p. 110)_
- [ ] **251.** Permitir a informação de quando funcionário está de férias, para que gere produtividade em conformidade com a legislação em vigor. _(TR, p. 110)_
- [ ] **252.** Possuir o controle da conta-corrente fiscal. _(TR, p. 111)_
- [ ] **253.** Permitir que o funcionário acompanhe, via consulta a situação de sua produtividade no mês corrente. _(TR, p. 111)_
- [ ] **254.** Permitir a fiscalização de tributos imobiliários devendo atender os itens obrigatórios da fiscalização já mencionados anteriormente relativos ao planejamento, distribuição, recepção, execução da ação fiscal, lavratura de documento fiscal e apuração de produtividade; _(TR, p. 111)_
- [ ] **255.** Permitir parametrizar programação fiscal por tipos de unidades imobiliárias (terreno e construção), por logradouro, por setor fiscal e zona fiscal; Requisitos da Cobrança Administrativa _(TR, p. 111)_
- [ ] **256.** Permitir a classificação dos contribuintes inadimplentes em perfis; _(TR, p. 111)_
- [ ] **257.** Permitir o acompanhamento e gestão dos tributos a serem cobrados administrativamente, sendo possível a utilização de filtros para seleção das cobranças. Os filtros deverão considerar o perfil da dívida (atributos da dívida, por exemplo: valor, tributo, data de vencimento, entre outros); _(TR, p. 111)_
- [ ] **258.** Permitir a criação de carteiras de cobrança, que são agrupamentos dinâmicos de contribuintes ou perfis de contribuintes e seus débitos, a partir de regras pré-definidas ou seleção manual pelo setor responsável; _(TR, p. 111)_
- [ ] **259.** Permitir a criação de réguas de cobrança, ou seja, definir fluxo de ações cronológicas, desde avisos eletrônicos antes da data de vencimento, ligações telefônicas, envio de carta cobrança e de SMS, agendamento de reuniões de conciliação, ou qualquer outra ação anterior a cobrança; _(TR, p. 111)_
- [ ] **260.** Permitir ao conciliador agendar conciliações com contribuintes inadimplentes permitindo registrar o resultado da negociação. _(TR, p. 111)_
- [ ] **261.** Permitir classificar as modalidades de cobrança, tais como Call Center, e-mail, SMS, cartas, negativação de devedores, dentre outros; _(TR, p. 111)_
- [ ] **262.** Permitir comunicar os devedores por meio das diversas ações de cobrança (nas tecnologias, formatos e layout definidos pela CONTRATANTE, tais como notificação via carta, e-mail, SMS, Diário Oficial, Domicílio Eletrônico), através dos convênios estabelecidos; _(TR, p. 111)_
- [ ] **263.** Permitir apuração dos resultados obtidos pelas cobranças realizadas, por meio de acompanhamento de pagamentos recepcionados e parcelamentos realizados; _(TR, p. 112)_
- [ ] **264.** Permitir que seja possível mapear todas as ações de cobrança realizadas para determinado débito ou CPF/CNPJ; _(TR, p. 112)_
- [ ] **265.** Permitir inscrever débitos em Dívida Ativa de forma automática, através de rotina parametrizável ou manual, através da seleção de débitos em tela do sistema ou pela importação de arquivos. _(TR, p. 112)_
- [ ] **266.** Permitir o acompanhamento e gestão dos tributos a serem cobrados administrativamente, sendo possível a utilização dos filtros relacionados ao perfil do contribuinte (atributos da pessoa, do imóvel ou da atividade econômica exercida, entre outros atributos associados indiretamente); _(TR, p. 112)_
- [ ] **267.** Permitir classificar os devedores, através de criação de ranking, cruzando informações cadastrais com informações financeiras, apresentando índice de sucesso em cobranças anteriores. Requisitos do Parcelamento de Créditos _(TR, p. 112)_
- [ ] **268.** Permitir configuração de regras de parcelamento e reparcelamento contendo no mínimo: receitas, número de parcelas, valor mínimo de parcelas, percentual a ser pago na primeira parcela, no caso de reparcelamento e data de vencimento da primeira parcela, índice de atualização, definição de incentivos ou não, nos respectivos componentes do crédito tributário; _(TR, p. 112)_
- [ ] **269.** Permitir ao contribuinte adesão ao parcelamento através de visão unificada de seus débitos; _(TR, p. 112)_
- [ ] **270.** Permitir a realização de parcelamentos por CPF/CNPJ de créditos tributários, conforme definido em legislação, compostos do valor nominal, atualização monetária, encargos moratórios e multa de infração, na CONTRATANTE e na Dívida Ativa, executados ou não, incluindo a cobrança de honorários advocatícios e o recolhimento, para posterior repasse, de custas e despesas judiciais; _(TR, p. 112)_
- [ ] **271.** Disponibilizar o Termo de Parcelamento ao contribuinte, contendo no mínimo as seguintes informações: CPF ou CNPJ, Inscrição Municipal (imobiliária ou mobiliária), identificação do contribuinte e débitos originais; _(TR, p. 112)_
- [ ] **272.** Permitir o acompanhamento e gerenciamento dos parcelamentos nos seus diversos estágios, desde a sua contratação pelo contribuinte até sua finalização, pela quitação dos Débitos ou pelo rompimento, por descumprimento do acordo. _(TR, p. 113)_
- [ ] **273.** Permitir que os pagamentos efetuados pelo contribuinte sejam apropriados e compensados no saldo devedor do parcelamento, independente de número de parcela ou exatidão do valor pago, recalculando a próxima parcela a ser paga, bem como o saldo devedor; _(TR, p. 113)_
- [ ] **274.** Permitir o ajuste automático da dívida em parcelamento, quando do recálculo da dívida original em razão de decisão judicial ou conclusão de processo administrativo; _(TR, p. 113)_
- [ ] **275.** Permitir ao contribuinte o cadastro de banco, agência e conta-corrente quando da adesão ao parcelamento para que toda forma de pagamento parcelado, em regra, seja por débito automático; _(TR, p. 113)_
- [ ] **276.** Permitir ao contribuinte e aos gestores do parcelamento opção de rompimento do parcelamento em andamento; _(TR, p. 113)_
- [ ] **277.** Permitir aos gestores reativar parcelamentos; _(TR, p. 113)_
- [ ] **278.** Permitir ao contribuinte optar pela data de vencimento do parcelamento, quando da adesão ou fixá-la de acordo com legislação vigente; _(TR, p. 113)_
- [ ] **279.** Permitir aos gestores do parcelamento visualização de créditos tributários passíveis de parcelamento, por CPF/CNPJ, inscrição imobiliária, Inscrição, Execução Fiscal; _(TR, p. 113)_
- [ ] **280.** Permitir aos gestores do parcelamento a geração de relatórios de débitos por CPF/CNPJ, Inscrição, Inscrição Imobiliária; _(TR, p. 113)_
- [ ] **281.** Permitir ao contribuinte e aos gestores a emissão do extrato do Parcelamento com composição dos débitos incluídos nos parcelamentos para acompanhamento dos pagamentos; _(TR, p. 113)_
- [ ] **282.** Permitir a emissão de DAM a vencer ou vencidos para o contribuinte e para os gestores do parcelamento; _(TR, p. 113)_
- [ ] **283.** Permitir ao contribuinte e aos gestores do parcelamento a emissão de DAM de antecipação de parcelas, podendo ser calculado pela quantidade de cotas a serem antecipadas ou pela imposição de valor a ser antecipado, de acordo com a opção do contribuinte, recalculando, assim, o saldo devedor; _(TR, p. 113)_
- [ ] **284.** Permitir aos gestores do parcelamento configurar parâmetros para o rompimento automático de parcelamentos com a possibilidade de haver prazos distintos para o rompimento a depender do tipo de parcelamento e legislação vigente; _(TR, p. 114)_
- [ ] **285.** Permitir aos gestores do parcelamento a parametrização de datas de vencimentos, por tipo de parcelamento e de acordo com a legislação vigente, respeitando a opção de vencimento do contribuinte, quando escolhida na adesão ao parcelamento, se permitido pela legislação vigente; _(TR, p. 114)_
- [ ] **286.** Permitir que coexistam regras distintas de atualização monetária do saldo devedor como por exemplo IPCA, IPCA + 1%, taxa SELIC, tabela PRICE, garantindo a possibilidade de manutenção dos cálculos de atualização dos acordos já existentes, regidos por lei anterior, mesmo com imposição de novas regras para novos acordos; _(TR, p. 114)_
- [ ] **287.** Permitir que coexistam regras distintas de desconto de encargos moratórios, multas de infração, custas judiciais e honorários advocatícios referentes aos créditos tributários a serem parcelados, possibilitando essa aplicação em parcelamentos ordinários e em parcelamentos incentivados, de acordo com a legislação em vigor; _(TR, p. 114)_
- [ ] **288.** Disponibilização de relatórios de acompanhamento dos parcelamentos, com informações de parcelas a vencer, pagamentos realizados, parcelas em aberto, parcelamentos rompidos e a romper, parcelamentos por estágio, montante contratado, dentre outros; _(TR, p. 114)_
- [ ] **289.** Disponibilizar relatórios gerenciais; _(TR, p. 114)_
- [ ] **290.** Permitir que o contribuinte informe a quantidade de parcelas que poderá realizar o parcelamento no portal do contribuinte, possibilitando aplicar percentuais de renúncia de juros e multa conforme a quantidade de parcelas informada e a legislação vigente. _(TR, p. 114)_
- [ ] **291.** Possibilitar parametrizar a forma de cobrança de honorários advocatícios, informando o percentual a ser aplicado e em quantidade de parcelas que poderá ser diluído. _(TR, p. 114)_
- [ ] **292.** Permitir vincular na parametrização do parcelamento a lei de constituição e categorização dos tipos de benefícios, incluindo anistia sobre as multas fiscais. _(TR, p. 114)_
- [ ] **1.** Requisitos do Atendimento ao Contribuinte _(TR, p. 115)_
- [ ] **293.** O sistema deve ter funcionalidade que apresente aos usuários do sistema as perguntas frequentes; _(TR, p. 115)_
- [ ] **294.** Permitir que o contribuinte municipal tenha acesso aos serviços básicos, evitando a necessidade de atendimento presencial, serviços como emissão e parcelamentos de ITPU, ITBI, Alvarás, DAM's, CND's; _(TR, p. 115)_
- [ ] **295.** Permitir ao gestor da Entidade definição do layout, com, pelo menos, três opções de Portal de serviços, usuário ainda poderá escolher cores, ícones e inserir links; _(TR, p. 115)_
- [ ] **296.** Permitir a emissão de documento de arrecadação, inclusive segunda via; _(TR, p. 115)_
- [ ] **297.** Permitir a emissão de extrato fiscal do contribuinte; _(TR, p. 115)_
- [ ] **298.** Permitir a emissão do cartão de inscrito no cadastro e ficha cadastral; _(TR, p. 115)_
- [ ] **299.** Permitir a emissão de certidão de débitos do contribuinte, sendo possível sua parametrização, sem intervenção de desenvolvimento, contendo número de autenticidade e QRCode. _(TR, p. 115)_
- [ ] **300.** Permitir parametrização de Certidão Cadastral de Empresas, sem intervenção de desenvolvimento e que sua emissão tenha número de autenticidade, sendo possível validar pelo portal de contribuintes e QRCode; _(TR, p. 115)_
- [ ] **301.** Permitir parametrização de Certidão Cadastral de Imóveis, sem intervenção de desenvolvimento e que sua emissão tenha número de autenticidade, sendo possível validar pelo portal de contribuintes e QRCode; _(TR, p. 115)_
- [ ] **302.** Permitir a visualização de pendências que motivaram a emissão de certidão positiva com efeito de negativa; _(TR, p. 115)_
- [ ] **303.** Permitir a emissão de certidões em conformidade com decisões judiciais, de forma manual, sendo possível sua parametrização, sem intervenção de desenvolvimento, contendo número de autenticidade e QRCode; _(TR, p. 115)_
- [ ] **304.** Permitir a consulta ao histórico de certidões emitidas; _(TR, p. 115)_
- [ ] **305.** Permitir a emissão da cota única do IPTU do exercício e/ou realizar o seu parcelamento, simulando de uma única vez, todas as opções de parcelas disponíveis; _(TR, p. 115)_
- [ ] **306.** Permitir o cadastro e as alterações cadastrais das Pessoas Físicas, registrando o exercício de Atividade Econômica Autônoma, quando for o caso; _(TR, p. 116)_
- [ ] **307.** Permitir consulta aos históricos cadastrais com as respectivas datas e alterações cadastrais; _(TR, p. 116)_
- [ ] **308.** Permitir a consulta e a emissão de extrato de parcelamentos com sua composição; _(TR, p. 116)_
- [ ] **309.** Permitir a simulação e o parcelamento de débitos ativos de forma consolidada, considerando todas as disposições legais; _(TR, p. 116)_
- [ ] **310.** Permitir a consulta dos débitos e seus pagamentos, inclusive os decorrentes de fiscalização com sua composição; _(TR, p. 116)_
- [ ] **311.** Permitir a emissão de débitos, agrupando-as em um único documento de arrecadação; _(TR, p. 116)_
- [ ] **312.** Permitir a confirmação de autenticidade de certidão de posição de débito, via internet; _(TR, p. 116)_
- [ ] **313.** Permitir a consulta de situação e tramitação de processos administrativos; _(TR, p. 116)_
- [ ] **314.** Permitir a compensação de pagamentos em duplicidade dentro do exercício curso; _(TR, p. 116)_
- [ ] **315.** Permitir a emissão de relatório da Divida Ativa do contribuinte de forma consolidada. _(TR, p. 116)_
- [ ] **316.** Serviços disponíveis via Whatsapp _(TR, p. 116)_
- [ ] **317.** Permitir a emissão de Boletim de –Informações Cadastrais – BCI; _(TR, p. 116)_
- [ ] **318.** Permitir a emissão de Boletim de Cadastro Mercantil – BCM; _(TR, p. 116)_
- [ ] **319.** Permitir a emissão de Certidões de Débitos; _(TR, p. 116)_
- [ ] **320.** Permitir a emissão de Certidões de Valor Venal do Imóvel; _(TR, p. 116)_
- [ ] **321.** Permitir a validação de Autenticidade de Documentos Emitidos; _(TR, p. 116)_
- [ ] **322.** Permitir a emissão de DAM de ITBI; _(TR, p. 116)_
- [ ] **323.** Permitir a emissão de Documento de Transferência ITBI: _(TR, p. 116)_
- [ ] **324.** Permitir a consulta Situação e Informações Gerais da Empresa no Município; _(TR, p. 116)_
- [ ] **325.** Permitir a consulta de Acessos ao sistema liberados para a empresa; _(TR, p. 116)_
- [ ] **326.** Permitir a consulta de Acessos ao sistema liberados para processos na área Imobiliária; _(TR, p. 116)_
- [ ] **327.** Permitir a consulta Extrato e Resumo de Débitos por Situação (Abertos, Pagos, Cancelados, Parcelados); _(TR, p. 117)_
- [ ] **328.** Permitir a emissão de DAM's de Débitos de Exercício; _(TR, p. 117)_
- [ ] **329.** Permitir a emissão de DAM's de Débitos de Divida Ativa; _(TR, p. 117)_
- [ ] **330.** Permitir a emissão de DAM's de Débitos Executados; _(TR, p. 117)_
- [ ] **331.** Permitir a emissão de DAM's de Débitos Protestados; _(TR, p. 117)_
- [ ] **332.** Permitir a emissão de DAM's de Parcelamentos; _(TR, p. 117)_
- [ ] **333.** Permitir a consulta de Pagamentos realizados; _(TR, p. 117)_
- [ ] **334.** Permitir a emissão de DAM's de Licenciamentos, tais como: Alvarás de Localização e Funcionamento, Alvará de Obras e Documento de Habite-se, Vigilância Sanitária, Ambiental, Eventos, dentre outros; _(TR, p. 117)_
- [ ] **335.** Permitir a emissão de Documentos de Alvarás de Licenciamentos; _(TR, p. 117)_
- [ ] **336.** Permitir a consulta de Limite de Faturamento registrado no Município; _(TR, p. 117)_
- [ ] **337.** Permitir a consulta existência de Notificação de Desenquadramento da empresa; _(TR, p. 117)_
- [ ] **338.** Permitir a consulta existência de Notificações e Autos de Infração – Fiscalização Tributária e Urbana; _(TR, p. 117)_
- [ ] **339.** Permitir a consulta de Notificação. Requisitos da Dívida Ativa _(TR, p. 117)_
- [ ] **340.** Permitir a inscrição automática dos débitos em dívida ativa, baseado em parâmetros definidos pelos gestores, com possibilidade de definir periodicidade e o agendamento eletrônico; _(TR, p. 117)_
- [ ] **341.** Permitir configurar regras de validação para os débitos passíveis de inscrição em Dívida Ativa, excluindo aqueles que, por exemplo, não possuírem informações cadastrais suficientes para identificação e localização do contribuinte; _(TR, p. 117)_
- [ ] **342.** Organiza os contribuintes e seus débitos em carteiras; _(TR, p. 117)_
- [ ] **343.** Caso os contribuintes e seus débitos não atendam mais as regras de inclusão, estes podem ser retirados da carteira e incluídos nas carteiras em que as variáveis de inclusão possam ser atendidas, com atualização diária; _(TR, p. 117)_
- [ ] **344.** Permitir a inscrição manual dos débitos em Dívida Ativa através da seleção em tela do sistema, mediante uso de filtros, ou pela importação de arquivos; _(TR, p. 117)_
- [ ] **345.** Permitir consultar e selecionar débitos, mediante filtragem, para emissão de avisos de cobrança, através de correspondência, SMS ou Domicílio Eletrônico; _(TR, p. 118)_
- [ ] **346.** Permitir a seleção de massa de débitos, mediante filtragem, para o preparo do ajuizamento; _(TR, p. 118)_
- [ ] **347.** Permitir a Inclusão de Anotações nas Certidões de Dívida Ativa. _(TR, p. 118)_
- [ ] **348.** Atualização de Certidão de Dívida Ativa com controle versão, possibilitando a rastreabilidade dos fatos ocorridos. _(TR, p. 118)_
- [ ] **349.** Controle das informações complementares que serão incluídas na Certidão de Dívida Ativa. _(TR, p. 118)_
- [ ] **350.** Permitir a emissão da Certidão da Dívida Ativa – CDA em formato _(TR, p. 118)_
### PDF; _(p. 118)_

- [ ] **351.** Permitir a geração eletrônica e a impressão do Livro da Dívida Ativa; _(TR, p. 118)_
- [ ] **352.** Permitir o envio de débitos para protesto em massa, através de geração de arquivo para integração com o sistema de protestos e seus Cartórios. _(TR, p. 118)_
- [ ] **353.** Permitir a emissão de DAM do débito inscrito em Dívida Ativa; _(TR, p. 118)_
- [ ] **354.** Permitir imputação do valor do crédito tributário para cumprimento de decisão judicial, possibilitando a emissão do Documento de Arrecadação; _(TR, p. 118)_
- [ ] **355.** Permitir o parcelamento dos débitos, com a possibilidade de exclusão de encargos (transação), segundo critérios a serem definidos; _(TR, p. 118)_
- [ ] **356.** Permitir a emissão de extrato fiscal financeiro do contribuinte para visualização dos débitos inscritos em dívida ativa, com opção para visualizar os débitos não inscritos; _(TR, p. 118)_
- [ ] **357.** Permitir suspensão de exigibilidade dos débitos, refletindo seus efeitos, quando for o caso, na classificação do contribuinte (suspendendo inadimplência) e na emissão de certidões; _(TR, p. 118)_
- [ ] **358.** Permitir o acompanhamento e a gestão dívida em seus diversos estágios após a inscrição, com opção de visualizar os estágios anteriores a inscrição na Dívida Ativa; _(TR, p. 118)_
- [ ] **359.** Permitir a devolução de débitos inscritos para o órgão de origem; _(TR, p. 118)_
- [ ] **360.** Permitir a conversão do depósito administrativo ou judicial em renda para a quitação de débitos, ainda que parcial; _(TR, p. 119)_
- [ ] **361.** Permitir realizar a baixa manual de débitos seja por decisão judicial ou por outros motivos, com a devida justificativa; _(TR, p. 119)_
- [ ] **362.** Permitir a baixa automática, de acordo com parametrização definida, de débitos prescritos; _(TR, p. 119)_
- [ ] **363.** Permitir o gerenciamento dos motivos e prazos de suspensão da exigibilidade; _(TR, p. 119)_
- [ ] **364.** Permitir a aplicação de diversos índices de atualização monetária, individualizando-os em função da natureza do débito; _(TR, p. 119)_
- [ ] **365.** Permitir a emissão de relatórios gerenciais; _(TR, p. 119)_
- [ ] **366.** Permitir a escrituração das dívidas inscritas, e respectivos pagamentos, descontos ou abatimentos, em conformidade com o MCASP – Manual de Contabilidade Aplicada ao Setor Público. _(TR, p. 119)_
- [ ] **367.** Permitir que na tela de pesquisa da dívida possa ser feito parcelamento, englobamento, imprimir os débitos e o cancelamento da dívida; _(TR, p. 119)_
- [ ] **368.** Conciliação de Cobrança _(TR, p. 119)_
- [ ] **369.** Permite,através de seleção de perfis de contribuintes,o agendamento para atendimento de conciliação _(TR, p. 119)_
- [ ] **370.** Disponibiliza função para que o agente de cobrança possa realizar agendamento dos contribuintes,que irão ser convidados para conciliação fiscal dos seus débitos junto a um funcionário público autorizado (conciliador fiscal),o qual deverá visualizar todos os dados do contribuinte; _(TR, p. 119)_
- [ ] **371.** Permite ao conciliador simular os valores para parcelamento, emitir de termo de parcelamento e cancelar parcelamentos, se for necessário, de acordo com as regras cadastradas no sistema; _(TR, p. 119)_
- [ ] **372.** Realiza a emissão de guias dos débitos em aberto, atualizar os dados do contribuinte que está sendo atendido e se necessário cadastrar uma ação de cobrança. Gestão de Procuradoria _(TR, p. 119)_
- [ ] **373.** Protesto em Cartório _(TR, p. 119)_
- [ ] **374.** Permitir a seleção individual e/ou em lote das dívidas para cobrança via Protesto em cartório; _(TR, p. 119)_
- [ ] **375.** Possuir rotina de geração de arquivo eletrônico, com os dados dos contribuintes e dos débitos, para envio ao cartório responsável pelo protesto; _(TR, p. 120)_
- [ ] **376.** Permitir a importação do arquivo de confirmação do cartório para os contribuintes protestados; _(TR, p. 120)_
- [ ] **377.** Possuir o acompanhamento do protesto através dos dados de importação; _(TR, p. 120)_
- [ ] **378.** Possuir baixa automática dos pagamentos das dívidas protestadas; _(TR, p. 120)_
- [ ] **379.** Permitir o cancelamento/desistência de protestos de Certidões de Dívida Ativa. _(TR, p. 120)_
- [ ] **380.** Possibilitar a emissão da Carta de Anuência para Certidões de Dívida Ativa Protestadas; _(TR, p. 120)_
- [ ] **381.** Permitir o Cancelamento de Certidões de Dívida, informando motivo e Processo Administrativo. _(TR, p. 120)_
- [ ] **382.** Permitir a Inclusão de Anotações nas Certidões de Dívida Ativa. _(TR, p. 120)_
- [ ] **383.** Atualização de Certidão de Dívida Ativa com controle versão, possibilitando a rastreabilidade dos fatos ocorridos. _(TR, p. 120)_
- [ ] **384.** Possibilitar a Assinatura Digital na Certidão de Dívida Ativa através de certificado padrão ICP Brasil, garantindo assim a integridade dos dados constantes no documento. _(TR, p. 120)_
- [ ] **385.** Possibilitar o envio Automático de Certidões de Dívida Ativa e Petições para a obtenção da Assinatura Eletrônica, sem que haja intervenção do usuário no produto. _(TR, p. 120)_
- [ ] **386.** Permitir que os retornos de ocorrências dos cartórios façam parte do histórico de acionamentos dos contribuintes e de suas dívidas que estão relacionadas aos retornos. Execução Fiscal _(TR, p. 120)_
- [ ] **387.** Permitir acessar o Web Site dos diversos órgãos cadastrados (principalmente os Tribunais de Justiça Estaduais), diretamente a partir da aplicação; _(TR, p. 120)_
- [ ] **388.** Permitir a troca de informações com sistemas do Poder Judiciário através de integração com a Procuradoria Municipal; _(TR, p. 120)_
- [ ] **389.** Adotar o Modelo Nacional de Interoperabilidade – MNI, disponibilizado pelo Conselho Nacional de Justiça – CNJ, como protocolo de comunicação com os Tribunais para viabilizar o envio de processos. _(TR, p. 121)_
- [ ] **390.** Receber retorno do Tribunal de Justiça com data de ajuizamento e número do Protocolo, ficando gravado no processo de envio. _(TR, p. 121)_
- [ ] **391.** Permitir anexar procuração durante o envio do ajuizamento com integração ao Tribunal de Justiça. _(TR, p. 121)_
- [ ] **392.** Permitir a seleção e criação de lote de débitos, com base em parâmetros definidos, para ajuizamento das ações de execução fiscal, seguindo os padrões do MNI, em integração com o Tribunal de Justiça. _(TR, p. 121)_
- [ ] **393.** Gerenciar as operações referentes aos trâmites dos processos de ajuizamento de débitos, permitindo a vinculação da certidão de petição a um procurador responsável, registrado no cadastro de procuradores. _(TR, p. 121)_
- [ ] **394.** Possuir rotina que permita a integração com o sistema de procuradoria do município, mediante a importação\exportação de dados, através de arquivos em formato digital com layout parametrizável, que possibilite à exportação dos dados pertinentes a emissão da petição para ajuizamento e ao acompanhamento do trâmite jurídico e a importação dos dados necessários à identificação dos ajuizamentos, sem que haja a necessidade de redigitação em ambas as operações. _(TR, p. 121)_
- [ ] **395.** Possibilitar o cadastramento dos processos já em andamento, informando nestes casos o procurador atualmente vinculado a este processo, seja manual ou por Integração com o Tribunal; _(TR, p. 121)_
- [ ] **396.** Possibilitar o cadastramento das partes, incluindo documentos, como CNPJ/CPF, Inscrição ou RG; _(TR, p. 121)_
- [ ] **397.** Permitir anexar documentos aos processos, tanto os emitidos pelo próprio sistema como outros digitalizados (DOC, BMP, GIF, JPG, XLS, PDF); _(TR, p. 121)_
- [ ] **398.** Disponibilizar agenda por procurador, permitindo o cadastramento tanto de compromissos vinculados aos processos quanto de outros compromissos quaisquer; _(TR, p. 121)_
- [ ] **399.** Possuir rotina que permita a comunicação entre a Vara de Execuções Fiscais, a Secretaria de Fazenda e a Procuradoria Fiscal, com integração via WebService; _(TR, p. 121)_
- [ ] **400.** Possibilitar a integração ao sistema de Primeiro Grau do Tribunal de Justiça, para permitir que a Procuradoria Fiscal possa atuar e monitorar todos os seus processos eletronicamente; _(TR, p. 122)_
- [ ] **401.** Permitir geração de Notificação.; _(TR, p. 122)_
- [ ] **402.** Permitir o envio de Notificação via Domicílio Tributário Eletrônico do Contribuinte – DTEL; _(TR, p. 122)_
- [ ] **403.** Possuir geração de relatório dos valores em Protestos; _(TR, p. 122)_
- [ ] **404.** Possuir acompanhamento Judicial por Contribuinte e Situação; _(TR, p. 122)_
- [ ] **405.** Emissão de relatório listando os valores protestados e valores enviados para protesto em aberto. _(TR, p. 122)_
- [ ] **406.** Controle dos valores arrecadados, das Certidões Enviadas para Protestos e Protestadas. _(TR, p. 122)_
- [ ] **407.** Demonstrativo analítico dos débitos inscritos e\ou ajuizados por livro de inscrição. _(TR, p. 122)_
### Controle de Cemitério _(p. 122)_

- [ ] **408.** Permitir o cadastro de Cemitérios Municipais, contendo: Nome e Endereço; _(TR, p. 122)_
- [ ] **409.** Permitir o vínculo dos funcionários aos cemitérios cadastrados, podendo vincular mais de um funcionário por cemitério; _(TR, p. 122)_
- [ ] **410.** Permitir identificar o local do velório; _(TR, p. 122)_
- [ ] **411.** Permitir o cadastro de Causa de Morte, onde o mesmo deverá ser utilizado no cadastro de Óbitos; _(TR, p. 122)_
- [ ] **412.** Permitir o cadastro de funerárias, onde a mesma deverá ser utilizada no cadastro de óbitos; _(TR, p. 122)_
- [ ] **413.** Permitir o cadastro de tipos de sepultamentos, onde o mesmo deverá ser utilizado no cadastro de óbitos; _(TR, p. 122)_
- [ ] **414.** Permitir o Cadastro de Tipo de Sepultura, onde o mesmo deverá ser utilizado no cadastro de óbitos; _(TR, p. 122)_
- [ ] **415.** Permitir o cadastro de sepulturas, onde o mesmo deverá conter: O nome do cemitério, número, responsável, requerente, valor pago, código talão, data, herdeiros, área, quadra, Ala, Jazigo, gaveta, cova, livro; _(TR, p. 122)_
- [ ] **416.** Permitir a pesquisa da sepultura por número, cemitério, responsável, quadra, ala, jazigo, gaveta, cova e livro; _(TR, p. 122)_
- [ ] **417.** Permitir a emissão de relatório com os dados cadastrados a sepultura; _(TR, p. 123)_
- [ ] **418.** Permitir o cadastro do médico declarante do óbito; _(TR, p. 123)_
- [ ] **419.** Permitir o cadastro do óbito contendo: _(TR, p. 123)_
- [ ] **1.** Cemitério; _(TR, p. 123)_
- [ ] **2.** Número de sepultura, onde deverá preencher automaticamente informações sobre o cadastro da mesma; _(TR, p. 123)_
- [ ] **3.** Tipo de Sepultura; _(TR, p. 123)_
- [ ] **4.** Tipo de Sepultamento; _(TR, p. 123)_
- [ ] **5.** Funerária; _(TR, p. 123)_
- [ ] **6.** Características gerais das pessoas falecidas; _(TR, p. 123)_
- [ ] **7.** Dados do requerimento e pagamento; _(TR, p. 123)_
- [ ] **8.** Causas de morte, podendo adicionar mais de um motivo; _(TR, p. 123)_
- [ ] **9.** Médico declarante; _(TR, p. 123)_
- [ ] **10.** Dados do sepultamento; _(TR, p. 123)_
- [ ] **11.** Informações padronizadas atendendo a necessidade da Prefeitura. _(TR, p. 123)_
- [ ] **420.** Permitir a emissão de relatório com os dados do óbito; _(TR, p. 123)_
- [ ] **421.** Permitir informar a exumação; _(TR, p. 123)_
- [ ] **422.** Permitir informar a remoção; _(TR, p. 123)_
- [ ] **423.** Permitir o cadastro de Licenças de alvará para construção ou reforma; _(TR, p. 123)_
- [ ] **424.** Imprimir gráfico de quantidade de causas de mortes por período; _(TR, p. 123)_
- [ ] **425.** Permitir cadastro e controle dinâmico de setores sem limite de níveis; _(TR, p. 123)_
- [ ] **426.** Permitir emissão de guias de liberação de sepultamento com emissão de cobrança de taxas e possível parcelamento; _(TR, p. 123)_
- [ ] **427.** Permitir a emissão de guias de exumação, movimentação e translado de corpos com emissão de cobrança de taxas e possível parcelamento; _(TR, p. 123)_
- [ ] **428.** Permitir a realização de concessão de lotes e de sepulturas por prazo determinado ou indeterminado, com emissão de cobrança de taxas e possível parcelamento; _(TR, p. 123)_
- [ ] **429.** Permitir emissão de relatórios de falecidos de um determinado período ou causa mortis e de toda sua movimentação; _(TR, p. 123)_
- [ ] **430.** Permitir emissão de relatório das guias de cobrança das movimentações e sepultamentos em aberto (vencidas ou não) e pagas; _(TR, p. 123)_
- [ ] **431.** Permitir emissão de relatório de todas as movimentações realizadas por cemitério e por tipo de movimento; _(TR, p. 124)_
- [ ] **432.** Permitir emissão de relatórios de ocupação de vagas do cemitério; _(TR, p. 124)_
- [ ] **433.** Permitir emissão de relatórios de concessões de sepulturas e lotes por status de cobrança; _(TR, p. 124)_
- [ ] **434.** Permitir elaboração de gráficos da ocupação do cemitério; _(TR, p. 124)_
- [ ] **435.** Permitir elaboração de gráfico de sepultamentos e movimentações; _(TR, p. 124)_
- [ ] **436.** Possui Integração com os módulos Tributário e Dívida Ativa. Business Intelligence _(TR, p. 124)_
- [ ] **437.** Mostrar diversos cenários referentes a Execução Fiscal da Dívida Ativa, estabelecendo comparativos entre as fases da ação judicial em termos numéricos e percentuais de tal forma criar uma camada de apresentação que dê ao gestor uma visão rica de como se encontra os créditos em execução, sinalizando possíveis perdas por ausências de ações. _(TR, p. 124)_
- [ ] **438.** Demonstrar cruzamentos de dados entre os diversos status da dívida ativa, montantes arrecadadas períodos, prescrição, estatística da divida prevista e a receber, bem como demonstrar o impacto dos maiores devedores na previsão de arrecadação. Também apresentar números que demonstre as perdas anuais da dívida, bem como apontar o crescimento desta a partir de comparativos com dados históricos. _(TR, p. 124)_
- [ ] **439.** Projetar recebimento de Parcelamento da Dívida Ativa por período, apontando tendências e o impacto positivo ou negativo sobre o montante. Além disso ser capaz de fazer diversos cruzamentos com perda de descontos em multas e juros, impacto sobre o montante da dívida. _(TR, p. 124)_
- [ ] **440.** Apresentar variadas combinações estatísticas referente a arrecadação de tributos e taxas por período, tipo de tributos, agrupamentos de tributos, bem como mostrar previsões e tendências de arrecadação com base em períodos anteriores. Além disso ser capaz de exibir comparativos de arrecadação previstas versus arrecadação realizada através de variados filtros. _(TR, p. 124)_
- [ ] **441.** Demonstrar projeções de arrecadação a partir de percentuais incidentes sobre o montante do IPTU por serviços, indústria, comércio e residencial, trazendo números estatísticos sobre perdas e ganhos com isenções entre outros benefícios. _(TR, p. 124)_
- [ ] **442.** Demonstrar estatísticas de recebimentos das diversas taxas e impostos, bem como previsões de recebimento sobre percentuais de contribuintes atingidos por estas taxas e impostos _(TR, p. 125)_
- [ ] **443.** Variações, projeções e tendências sobre arrecadação de ISS e TFF tendo como parâmetros, regimes tributários, atividade econômica. _(TR, p. 125)_
- [ ] **444.** Visão das previsões gerais de recebimento previsto comparado a recebimento realizado em diversos períodos. _(TR, p. 125)_
- [ ] **445.** O módulo BI deve estar totalmente integrado ao sistema tributário de maneira que haja apenas um login para acessar tanto o sistema tributário quanto o módulo BI neste embutido. _(TR, p. 125)_

## ITBI

- [ ] **446.** Permitir declaração do Imposto sobre a Transmissão de Bens Imóveis pelo contribuinte, registrando os dados dos contribuintes envolvidos, do imóvel e dos valores considerados. _(TR, p. 125)_
- [ ] **447.** Identificar, se o imóvel possui débitos e impedir de prosseguir com a declaração da transmissão. _(TR, p. 125)_
- [ ] **448.** Permitir a inclusão de responsável solidário e/ou subsidiário ao sujeito passivo no lançamento do Imposto sobre a Transmissão de Bens Imóveis. _(TR, p. 125)_
- [ ] **449.** Permitir informar o percentual de participação que cada adquirente possui no imóvel transmitido. _(TR, p. 125)_
- [ ] **450.** Permitir parametrizar os tipos de transação imobiliária para o cálculo do ITBI(compra e venda, cessão de direito, posse, etc); _(TR, p. 125)_
- [ ] **451.** Permitir parametrizar a abrangência da transação se total ou parcial para o cálculo do ITBI; _(TR, p. 125)_
- [ ] **452.** Permitir informar Cartório de Registro relacionado a transmissão. _(TR, p. 125)_
- [ ] **453.** Permitir o cálculo, a partir de dados cadastrais e parâmetros de cálculo, o valor do Imposto sobre Imposto de Transmissão de Bens Imóveis; _(TR, p. 125)_
- [ ] **454.** Gerar protocolo com da Declaração da Transmissão contendo as informações resumidas. _(TR, p. 125)_
- [ ] **455.** Disponibilizar a consulta prévia da situação do imóvel ao cartório, possibilitando a entidade solicitar a emissão da Guia de ITBI, uma vez efetuado o lançamento possibilitar a emissão da Certidão de ITBI, fazendo a escrituração no sistema contábil da prefeitura do lançamento e de todas as suas alterações, em conformidade com o MCASP – Manual de Contabilidade Aplicada ao Setor Público. _(TR, p. 126)_
- [ ] **456.** Possibilitar a transferência automática do imóvel mediante lançamento da guia de ITBI, e que a rotina seja parametrizável para transferência seja automática ou não. _(TR, p. 126)_
- [ ] **457.** Portal do contribuinte para emissão do ITBI Web, não deverá ter a obrigatoriedade de cadastramento e senha prévia. Poderá o solicitante, acessar o serviço e ser validado por envio de e-mail e ainda ter a opção de login integração com e-gov. _(TR, p. 126)_
- [ ] **458.** Permitir com base no protocolo gerado, que os interessados possam acompanhar cada uma das fases do processo; _(TR, p. 126)_
- [ ] **459.** Deverá ser parametrizado a emissão da DAM de ITBI após geração do processo pelo contribuinte, ou após validação/homologação do fiscal. _(TR, p. 126)_
- [ ] **460.** Permitir que este serviço, tenha cada uma das fases, cadastradas e parametrizadas. _(TR, p. 126)_
- [ ] **461.** Administração Patrimonial do Município _(TR, p. 126)_
- [ ] **462.** Permitir manutenção e identificação dos imóveis foreiros ao Município, integrado ao cadastro imobiliário, com parametrização dos atributos pertinentes (dados do imóvel, registro do foro, registro do resgate, entre outros); _(TR, p. 126)_
- [ ] **463.** Possibilitar o acompanhamento e a gestão de dívidas não tributárias, relativas a imóveis do patrimônio do Município, tais como foro, transferência de domínio útil, resgate de enfiteuse, concessão, autorização e permissão de uso e multas; _(TR, p. 126)_

## Domicílio Tributário Eletrônico do Contribuinte

- [ ] **1.** Dispor de caixa postal eletrônica, com funcionalidades inerentes a uma caixa de correio eletrônico, denominada de Domicílio Tributário Eletrônico – DTEL, disponível na internet, cujo acesso pelo contribuinte será realizado por Certificado Digital, podendo ser utilizado também login e senha, a depender da situação; _(TR, p. 126)_
- [ ] **2.** Possibilitar o acesso ao DTEL por usuários autorizados por código de acesso, liberados pelos contribuintes, garantindo o sigilo fiscal, a identificação, a autenticidade e a integridade das comunicações; _(TR, p. 127)_
- [ ] **3.** Permitir o registro do Domicílio Eletrônico com confirmação do cadastro via resposta de e-mail (pós-cadastro); _(TR, p. 127)_
- [ ] **4.** Permitir o envio de comunicações e documentos fiscais (tais como, notificação de lançamento, notificação fiscal de lançamento e auto de infração) aos contribuintes; _(TR, p. 127)_
- [ ] **5.** Permitir classificar as comunicações como, por exemplo, intimação pessoal, mensagens, avisos, respostas de consultas, notificação fiscal, auto de infração, entre outras; _(TR, p. 127)_
- [ ] **6.** Permitir a automatização do envio de quaisquer das modalidades de comunicação e de documentos fiscais, individualmente ou em lote; _(TR, p. 127)_
- [ ] **7.** Possuir opção de exclusão de mensagens caracterizadas como assuntos que não possuem necessidade de permanência na caixa postal do contribuinte; _(TR, p. 127)_
- [ ] **8.** Permitir o gerenciamento do recebimento das comunicações pelo contribuinte, sinalizando a sua leitura ou a expiração do prazo para tal; _(TR, p. 127)_
- [ ] **9.** Permitir a parametrização dos prazos de acordo com a legislação vigente, para acesso às comunicações pelos contribuintes e considerá-las lidas tacitamente, quando da não leitura no prazo definido; _(TR, p. 127)_
- [ ] **10.** Permitir o envio de e-mail e/ou SMS para os contribuintes informando sobre a existência de comunicações no DTEL. _(TR, p. 127)_
- [ ] **11.** Permitir gerar Procuração Eletrônica para nomear um terceiro (Pessoa Física ou Jurídica) como Procurador Eletrônico, perante a CONTRATANTE, para acesso ao DTEL dos estabelecimentos escolhidos no momento da criação da Procuração Eletrônica; _(TR, p. 127)_
- [ ] **12.** Permitir ao procurador recusar a procuração (antes de aceitá-la) e rejeitá-la após ter aceito, deixando de ter acesso a Caixa Postal da empresa/pessoa; _(TR, p. 127)_
- [ ] **13.** Permitir que somente o portador do e-CNPJ da empresa credenciada ao DTEL ou algum +membro do quadro societário da empresa, portador de e- CPF, possa criar uma procuração eletrônica. _(TR, p. 127)_
- [ ] **14.** Não permitir que um procurador eletrônico crie procurações eletrônicas.; _(TR, p. 128)_
- [ ] **15.** Permitir que o titular do DTEL, ao estabelecer procuração eletrônica, possa indicar a quais CNPJ completos o procurador eletrônico poderá ter acesso; _(TR, p. 128)_
- [ ] **16.** Notificar o usuário da existência de documentos pendentes de assinatura eletrônica; _(TR, p. 128)_

## Nota Fiscal Eletrônica de Serviços

- [ ] **1.** Estar de acordo com as orientações do Modelo Conceitual e Manual de Integração proposta pela Câmara Técnica da ABRASF, em sua versão 2.03 ou superior; _(TR, p. 128)_
- [ ] **2.** Registrar todas as informações inerentes à emissão de uma nota fiscal convencional, em papel e, ainda, permitir que se façam os registros de abatimentos e retenções de tributos, sob responsabilidade do contribuinte; _(TR, p. 128)_
- [ ] **3.** Possibilitar a emissão das Notas Fiscais de Serviços Eletrônicas – NFS-e através do portal eletrônico da Prefeitura via browser (modalidade online), como também através de aplicativo próprio do contribuinte via WebService (modalidade offline), que deverão possuir códigos de verificação único no padrão definido no Modelo ABRASF para cada NFS-e gerada no sistema; _(TR, p. 128)_
- [ ] **4.** Possuir elementos de segurança (alfanuméricos e gráficos) que comprovem a sua autenticidade perante a administração fazendária e elementos de verificação e conferência dos dados que comprovem sua validade pelos tomadores de serviços; _(TR, p. 128)_
- [ ] **5.** A solução web do sistema deve possuir um módulo administração e um módulo prestador ambos devem possuir acesso através de autenticação de usuários, deverá possuir também uma área pública onde o acesso ocorrerá sem necessidade de autenticação; _(TR, p. 128)_
- [ ] **6.** O sistema deve possibilitar identificar as pessoas jurídicas ou físicas como emissores de NFSe, o acesso ao sistema seja ele para a solução web ou consumo dos serviços via WebService só poderá ocorrer se a pessoa estiver identificada como Prestador de Serviços Emissor de Notas, Prestador Eventual ou Tomador/Intermediário de serviços; _(TR, p. 128)_
- [ ] **7.** Permitir que as pessoas solicitem acesso ao sistema, de forma online; _(TR, p. 128)_
- [ ] **8.** Possibilitar a geração de termo de solicitação de acesso; _(TR, p. 129)_
- [ ] **9.** O termo de solicitação de acesso deve ser personalizável pelo fisco; _(TR, p. 129)_
- [ ] **10.** Possuir funcionalidade onde seja possível movimentar as solicitações de acesso efetuadas pelos prestadores/tomadores de serviço. _(TR, p. 129)_
- [ ] **11.** O acesso ao sistema só poderá ser liberado após o deferimento da solicitação pelo fisco através de funcionalidade para deferimento/indeferimento; _(TR, p. 129)_
- [ ] **12.** Para o caso de deferimento, o sistema deve enviar um e-mail ao solicitante informando que sua solicitação foi deferida; _(TR, p. 129)_
- [ ] **13.** O corpo do e-mail de confirmação de deferimento/indeferimento deve ser personalizável pelo fisco; _(TR, p. 129)_
- [ ] **14.** A autenticação para acesso ao sistema deverá se dar através de usuário (CPF) e senha; _(TR, p. 129)_
- [ ] **15.** Para realizar a autenticação ao sistema deverá possuir mecanismo de proteção do tipo Captchas utilizado para distinguir humanos e máquinas; _(TR, p. 129)_
- [ ] **16.** Também deverá ser possível realizar autenticação através de certificado digital padrão ICP-Brasil (e-CPF ou e–CNPJ com vínculo do CPF da pessoa no certificado); _(TR, p. 129)_
- [ ] **17.** Deverá ter funcionalidade de recuperação de senha; _(TR, p. 129)_
- [ ] **18.** Deverá ter funcionalidade de alteração de senha; _(TR, p. 129)_
- [ ] **19.** Deve ser possível consultar o log de auditoria das operações realizadas no sistema, identificando data, hora, funcionalidade, detalhamento textual do que foi realizado, pessoa que realizou a operação e empresa; _(TR, p. 129)_
- [ ] **20.** Disponibilizar layout e meios para possibilitar a importação de arquivos gerados pelos sistemas da escrita fiscal ou contábil utilizados pela empresa prestadora ou tomadora de serviço bem como meios para validação do layout do arquivo. _(TR, p. 129)_
- [ ] **21.** Disponibiliza a opção para inclusão de avisos direcionados exclusivamente para alguns contribuintes ou Pop ups com notificações que serão exibidos na página inicial do sistema NFS-e para todos os contribuintes. _(TR, p. 129)_
- [ ] **22.** A funcionalidade de geração de NFSe será disponibilizada apenas na solução web, e deverá exigir dos emissores exclusivamente o que não pode ser obtido pelo Cadastro Municipal do Contribuinte, evitando redundância ou redigitação de dados. _(TR, p. 129)_
- [ ] **23.** Possibilitar o preenchimento automático dos dados do Tomador do Serviço através do preenchimento do CNPJ ou do CPF, utilizando API de integração com a Receita Federal do Brasil – RFB, quando o prestador for emitir a Nota Fiscal de Serviços; _(TR, p. 129)_
- [ ] **24.** Permitir a geração de guia de ISS próprio (NFS-e emitidas) e Substituto Tributário (NFS-e recebidas com retenção de ISS), por competência e por nota (s). _(TR, p. 130)_
- [ ] **25.** Permitir que na emissão de uma NFS-e, quando da indicação do Tomador de Serviços seja realizada a verificação se o mesmo é Substituto Tributário do ISSQN e se for aplicar, automaticamente a Retenção do ISSQN a ser recolhido pelo Tomador do Serviço, conforme as informações do Cadastro Econômico do Município. _(TR, p. 130)_
- [ ] **26.** Permitir o controle de empresas Substitutas Tributárias definidas para pagamentos das retenções em Regime de Caixa seja realizado para cada Nota Fiscal Eletrônica recebida, permitindo que a empresa Substituta Tributária informe a data de pagamento das Notas Fiscais e gerencie as Guias que serão geradas para recolhimento do ISSQN. _(TR, p. 130)_
- [ ] **27.** Permitir a emissão de NFS-e com informação de ISS suspenso por decisão judicial, bloqueando a geração da guia de ISS e permitindo ao gestor o desbloqueio desta guia. _(TR, p. 130)_
- [ ] **28.** Permitir a emissão de NFS-e com deduções da base de cálculo nas situações previstas na Lei 7.186/2006 e Lei Complementar 175/2020. _(TR, p. 130)_
- [ ] **29.** Permitir a consulta de documentos fiscais tomados por período, data de competência, CNPJ do tomador do serviço. _(TR, p. 130)_
- [ ] **30.** Permitir a consulta de NFS-e emitidas e canceladas por: inscrição, data de emissão, data de competência, número do RPS, CPF/CNPJ do tomador do serviço. _(TR, p. 130)_
- [ ] **31.** A visualização e impressão da imagem das NFS-e emitidas deverá ser feita em arquivo formato PDF. _(TR, p. 130)_
- [ ] **32.** Recalcula automaticamente as alíquotas de ISS Próprio e Retido dos contribuintes por Período de Apuração PA (mês), utilizando do RBT12 as informações dos faturamentos declarados no PGDAS-D de Comércio, Indústria, Filiais e Exportação, somados aos valores de Serviços da Notas Fiscais de Serviços Eletrônica NFS-e, emitidas pelos contribuintes estabelecidos no município. _(TR, p. 130)_
- [ ] **33.** Permitir o cálculo automático da alíquota, identificando as notas fiscais emitidas com alíquota reduzida para então apurar o valor da diferença do ISS a ser pago e notificar o contribuinte. _(TR, p. 131)_
- [ ] **34.** Faz a apuração do ISSQN sobre a diferença a maior declarado no DASN/PGDAS-D em relação às Notas emitidas – NFS-e. _(TR, p. 131)_
- [ ] **35.** Possuir recursos para substituição de NFS-e nas modalidades online (via browser) e através de interface web service. Neste caso, deverá ser registrado um vínculo entre a NFS-e substituída e a substituta; _(TR, p. 131)_
- [ ] **36.** O sistema deverá observar as parametrizações da entidade quanto às regras _(TR, p. 131)_
### para substituição com no mínimo os seguintes itens: _(p. 131)_

- [ ] **37.** Prazo máximo para a substituição. _(TR, p. 131)_
- [ ] **38.** Definição de data base para contagem de prazo para substituição. _(TR, p. 131)_
- [ ] **39.** Permissões quanto à disponibilidade para substituição de nota fiscal quando ocorrer a substituição dentro do mês de emissão da nota. _(TR, p. 131)_
- [ ] **40.** Permissão quanto à necessidade de aprovação da entidade quando a substituição da nota fiscal ocorrer dentro do mês de emissão. _(TR, p. 131)_
- [ ] **41.** Parametrização para envio de e-mail aos envolvidos no processo de substituição. _(TR, p. 131)_
- [ ] **42.** Possuir recursos para cancelamento de NFS-e nas modalidades online (via browser) e através de interface web service. Neste caso, a NFS-e deverá possuir algum elemento gráfico que identifique facilmente que a nota está cancelada; _(TR, p. 131)_
- [ ] **43.** O sistema deve observar as parametrizações da entidade quanto às regras para _(TR, p. 131)_
### cancelamento com no mínimo os seguintes itens: _(p. 131)_

- [ ] **44.** Prazo máximo para cancelamento. _(TR, p. 131)_
- [ ] **45.** Definição de data base para contagem de prazo para cancelamento. _(TR, p. 131)_
- [ ] **46.** Permissões quanto à disponibilidade para cancelamento de nota fiscal quando o ocorrer cancelamento dentro do mês de emissão nota. _(TR, p. 131)_
- [ ] **47.** Permissão quanto à necessidade de aprovação da entidade quando o cancelamento da nota fiscal ocorrer dentro do mês de emissão. _(TR, p. 131)_
- [ ] **48.** Permitir a implantação do controle de cancelamentos de NFS-e através da ciência do tomador, para que uma NFS-e seja efetivamente cancelada apenas com a concordância do tomador de serviço. _(TR, p. 131)_
- [ ] **49.** Parametrização para envio de e-mail aos envolvidos no processo de cancelamento; _(TR, p. 132)_
- [ ] **50.** Possuir funcionalidade onde seja possível deferir/indeferir as solicitações de cancelamento/substituição de notas que foram efetuadas fora do prazo definido pela entidade. _(TR, p. 132)_
- [ ] **51.** Permitir a verificação online e pública da autenticidade e validade de uma NFS-e através do fornecimento do CPF/CNPJ do prestador, número da NFS-e e o código de verificação do selo da NFS-e; _(TR, p. 132)_
- [ ] **52.** Possuir a funcionalidade de carta de correção, tal documento é complementar à nota fiscal e deve permitir corrigir dados que não impactam na apuração do _(TR, p. 132)_
### imposto ou mudança do prestador/tomador de serviços, conforme abaixo: _(p. 132)_

> • Razão Social do prestador de serviço. _(TR, p. 132)_
> • Nome fantasia do prestador de serviço. _(TR, p. 132)_
> • Contatos (e-mail e telefone) do prestador de serviço. _(TR, p. 132)_
> • Endereço (Logradouro/Número/complemento, bairro) do prestador de serviço. _(TR, p. 132)_
> • Razão Social do tomador de serviço. _(TR, p. 132)_
> • Nome Fantasia do tomador de serviço. _(TR, p. 132)_
> • Endereço (Logradouro/Número/complemento, bairro) do tomador de serviço. _(TR, p. 132)_
> • Contatos (e-mail e telefone) do tomador de serviço. _(TR, p. 132)_
> • Razão Social do intermediário do serviço. _(TR, p. 132)_
> • Dados RPS (número//série/tipo). _(TR, p. 132)_
> • Discriminação do serviço. _(TR, p. 132)_
- [ ] **53.** Possuir funcionalidade onde seja possível deferir/indeferir as solicitações de correções nas notas efetuadas através da carta de correção fora do prazo definido pela entidade. _(TR, p. 132)_
- [ ] **54.** Permitir ao gestor autorizar e desautorizar um contribuinte a emitir NFS-e; _(TR, p. 132)_
- [ ] **55.** O sistema deve observar as parametrizações da entidade quanto às regras para emissão da carta de correção com no mínimo prazo máximo para efetuar correções em notas fiscais, prazo máximo para cancelamento de cartas de correção e parametrização quanto à data base para permissão de cancelamento de cartas de correção. _(TR, p. 132)_
- [ ] **56.** O sistema deverá possibilitar a entidade que edite o modelo da carta correção conforme a necessidade de cada entidade. _(TR, p. 132)_
- [ ] **57.** Ao consultar uma nota fiscal eletrônica que possua carta de correção o sistema deve exibir a DANFSE e a carta de correção com os dados alterados. _(TR, p. 133)_
- [ ] **58.** O sistema da licitante deverá possuir ferramenta que permita aos contribuintes selecionar as Notas Fiscais de Serviços Eletrônicas – NFS-e – emitidas de ISS Próprio a fim de se gerar a guia de recolhimento com os respectivos valores a serem recolhidos antecipadamente ou no vencimento; _(TR, p. 133)_
- [ ] **59.** Possibilitar a geração das informações em arquivos XML; _(TR, p. 133)_
- [ ] **60.** Enviar automaticamente e-mail para o tomador do serviço, quando informado pelo prestador, na emissão da NFS-e para o seu CPF/CNPJ; _(TR, p. 133)_
- [ ] **61.** Permitir ao prestador do serviço enviar qualquer NFS-e emitida para um ou mais e-mails com a possibilidade da inclusão de comentários; _(TR, p. 133)_
- [ ] **62.** Possibilitar que o sistema ofereça aos usuários a possibilidade da emissão de Notas Fiscais de Serviços Eletrônicas – NFS-e, através de dispositivos móveis e sem exigir do usuário o download de nenhum tipo de aplicativo; _(TR, p. 133)_
- [ ] **63.** O sistema deverá possuir mecanismo para que na emissão da NFS-e a definição sobre o local onde o imposto é devido seja controlado automaticamente de acordo com as regras da Lei Complementar nº 116 de 31 de julho de 2003; _(TR, p. 133)_
- [ ] **64.** O sistema deverá apresentar a alíquota constante na tabela de alíquotas do Município no momento da emissão da NFS-e de acordo com o item de serviço constante no cadastro do contribuinte, no caso de contribuintes Não Optantes do Simples Nacional, e não permitir que o usuário faça a alteração da mesma; _(TR, p. 133)_
- [ ] **65.** O sistema deverá permitir que o usuário informe a alíquota no momento da emissão da NFS-e no caso de contribuintes Optantes do Simples Nacional; _(TR, p. 133)_
- [ ] **66.** Definir a alíquota do Simples Nacional automaticamente, sem a possibilidade de intervenção do usuário nessa seleção; _(TR, p. 133)_
- [ ] **67.** Permitir o registro e monitoramento dos contribuintes enquadrados no regime do Simples Nacional, nos termos da LC 123/06, confrontando e permitindo visualizar os dados das Notas Fiscais Eletrônicas emitidas ou outras declarações estabelecidas em lei; _(TR, p. 133)_
- [ ] **68.** Garantir a geração automática, ao final do período de competência, de guia complementar referente ao ISSQN de todas as NFS-e emitidas e/ou retidas cujos impostos ainda não tenham sido antecipados voluntariamente pelos contribuintes mantendo, assim, a consistência do movimento tributário de cada contribuinte; _(TR, p. 133)_
- [ ] **69.** Permitir o controle sobre a dedução da base de cálculo das empresas de Planos de Saúde, com base nas Notas Fiscais recebidas automaticamente de empresas estabelecidas e das escriturações de notas fiscais de outros municípios, para que seja ser aplicada regra de abatimentos para definição da base de cálculo do ISS e consequente geração da Guia de recolhimento do ISSQN com todo o abatimento permitido pelo município. _(TR, p. 134)_
- [ ] **70.** Permitir que os planos e cooperativas de saúde cadastrem os cooperados (pessoa física e jurídica) para que baseado nas notas fiscais emitidas contra os planos e cooperativas de saúde o sistema permita o abatimento destas notas de base de cálculo do ISS. _(TR, p. 134)_
- [ ] **71.** Permitir que o prestador de serviço avulso solicite remotamente o cadastro de Contribuinte Avulso para a emissão de Notas Fiscal de Serviços Eletrônica Avulsa; _(TR, p. 134)_
- [ ] **72.** Garantir que o usuário somente possa acessar o sistema para emissão Nota Fiscal de Serviços Eletrônica Avulsa após a aprovação do cadastro pela autoridade fiscal e o recebimento das credenciais de acesso e senha. _(TR, p. 134)_
- [ ] **73.** Disponibilizar aos mesmos as seguintes informações para a emissão da Nota Fiscal de Serviços Eletrônica Avulsa: Dados do Tomador do Serviço, Período de Competência, Município da Prestação do Serviço, Tipo de Atividade e Descrição do Serviço. _(TR, p. 134)_
- [ ] **74.** Permitir a geração e impressão de DAM vinculado à Nota Fiscal de Serviços Avulsa no padrão FEBRABAN e o PIX, para que o usuário possa realizar o pagamento do imposto em qualquer rede bancária integrando-se ao sistema Tributário utilizado no município através de WebService. _(TR, p. 134)_
- [ ] **75.** Permitir que o usuário do sistema possa consultar e imprimir a Nota Fiscal de Serviços Eletrônica Avulsa. _(TR, p. 134)_
- [ ] **76.** Permitir que o prestador de fora do município possa se cadastrar no sistema e emitir o Registro ou Declaração Auxiliar de Nota Fiscal de Serviços, e enviado automaticamente para o tomador de serviço. _(TR, p. 134)_
- [ ] **77.** A Declaração Auxiliar de Nota Fiscal de Serviços deverá conter o nome e CNPJ do tomador do serviço, o serviço de acordo com a Lei Municipal, valor do serviço, dados do prestador de fora do município, alíquota, valor do ISS e o número da nota fiscal de origem. _(TR, p. 134)_
- [ ] **78.** Permitir enviar a Declaração Auxiliar de Nota Fiscal de Serviços para o tomador de serviço. _(TR, p. 135)_
- [ ] **79.** Conter rotina para transformar as Declarações Auxiliares de Nota Fiscal de Serviços em documento de arrecadação municipal — DAM. _(TR, p. 135)_
- [ ] **80.** Disponibilizar módulo gestor para obtenção de relatórios gerenciais; _(TR, p. 135)_
- [ ] **81.** Permitir o controle de conta-corrente de valores de dedução de material de construção civil por contribuinte, possibilitando gerar o crédito através da importação do Nota Fiscal Eletrônica (NFe), permitindo gerar o consumo automático no ato da emissão da NFSe. _(TR, p. 135)_
- [ ] **82.** Permitir gerar cupom a cada NFS-e emitida, possibilitando parametrização do sorteio no módulo de Nota Premiada. _(TR, p. 135)_
- [ ] **83.** Permitir parametrização de substitutos tributários que poderão dar aceite de notas fiscais emitidas para o mesmo; _(TR, p. 135)_
- [ ] **84.** Garantir a geração automatizada da Declaração e do Imposto Devido com base nas Notas Fiscais emitidas; _(TR, p. 135)_
- [ ] **85.** Permitir informar a retenção na fonte pelos tomadores de serviços tributáveis, na condição de Responsáveis ou Substitutos Tributários do ISSQN, nomeados pelo Município ou para atender as hipóteses da Lei Complementar 116/03; _(TR, p. 135)_
- [ ] **86.** Possibilitar a emissão de Guia de recolhimento do ISSQN, de qualquer mês em atraso calculando automaticamente os juros, multas, atualização monetária e descontos, observada a integração com o sistema tributário municipal; _(TR, p. 135)_
- [ ] **87.** Permitir a visualização e impressão de relatório de movimento mensal por declarante, informando todas as notas fiscais emitidas e recebidas, identificando os tomadores e prestadores dos referidos serviços, com a descrição de sua respectiva natureza de operação; _(TR, p. 135)_
- [ ] **88.** Permitir ao contribuinte retificar uma declaração mensal, sendo neste caso, necessário que o sistema mantenha o vínculo entre as declarações, permitindo o rastreamento da retificação; _(TR, p. 135)_
- [ ] **89.** Deve ser possível realizar a declaração dos serviços prestados e tomados por item de serviço da Lei Complementar 116/2003; _(TR, p. 135)_
- [ ] **90.** Deve ser possível realizar a declaração dos serviços prestados e tomados por item de serviço da Lei Complementar 116/2003 por intermédio de WebServices; _(TR, p. 135)_
- [ ] **91.** Deve ser possível realizar a declaração dos serviços prestados e tomados por item de serviço da Lei Complementar 116/2003 por intermédio de processamento de arquivo; _(TR, p. 135)_
- [ ] **92.** Deve ser possível realizar a declaração dos serviços prestados e tomados por nota fiscal emitida; _(TR, p. 136)_
- [ ] **93.** Deve ser possível realizar a declaração dos serviços prestados e tomados por nota fiscal emitida por intermédio de WebServices; _(TR, p. 136)_
- [ ] **94.** Deve ser possível realizar a declaração dos serviços prestados e tomados por nota fiscal emitida por intermédio de processamento de arquivo; _(TR, p. 136)_
- [ ] **95.** Prover, através da disponibilização de senhas por contador/contribuinte, sigilo absoluto quanto às informações particulares de cada contador/contribuinte e das empresas sob sua responsabilidade. _(TR, p. 136)_
- [ ] **96.** Permitir ao contador/contribuinte acessar somente a lista de empresas sob sua responsabilidade e realizar a manutenção dos dados das DMS’s – Declaração Mensal de Serviço – somente destas empresas. _(TR, p. 136)_
- [ ] **97.** Permitir ao contador/contribuinte adicionar tantos usuários no sistema quanto for necessário, sendo o acesso individualizado e todos devem ter acesso a todas as empresas da lista do contador/contribuinte. _(TR, p. 136)_
- [ ] **98.** Permitir ao contador/contribuinte realizar uma DMS sem movimento. _(TR, p. 136)_
- [ ] **99.** Cada DMS deverá ser composta de todas as informações necessárias à completa identificação do documento emitido, do prestador, do tomador, dos serviços prestados e do valor da operação. _(TR, p. 136)_
- [ ] **100.** Possibilitar ao contador/contribuinte a digitação, o recebimento e o processamento de DMSs retificadoras, após a entrega da declaração. _(TR, p. 136)_
- [ ] **101.** Permitir ao contador/contribuinte gerar e imprimir o protocolo de confirmação de recebimento da DMS. _(TR, p. 136)_
- [ ] **102.** Permitir que o contribuinte possa realizar o pagamento do ISS de uma determinada competência, copiando a chave Pix e colando no APP do Banco onde possuí conta. _(TR, p. 136)_
- [ ] **103.** Permitir que o contribuinte possa realizar o pagamento do ISS de uma determinada competência, realizando a leitura do QRcode Pix com leitor do APP do Banco onde possuí conta. _(TR, p. 136)_
- [ ] **104.** Permitir, a emissão do Recibo Provisório de Serviços – RPS, conforme previsto no Manual de Integração da ABRASF. O RPS poderá ser _(TR, p. 136)_
### utilizado nas seguintes opções: _(p. 137)_

- [ ] **105.** RPS eletrônico emitido por aplicação própria do contribuinte utilizando a estrutura de WebService. O sistema deverá disponibilizar, aos contribuintes que optarem por essa modalidade, uma série de interfaces para troca de mensagens XML. Essas mensagens poderão estar assinadas digitalmente (através de certificados digitais) ou não, dependendo da definição do Município para cada contribuinte; _(TR, p. 137)_
- [ ] **106.** RPS eletrônico emitido por aplicação própria do contribuinte. O sistema deverá disponibilizar aos contribuintes que optarem por essa modalidade, uma interface para upload do arquivo XML. Este arquivo deverá estar assinado digitalmente (através de certificados digitais); _(TR, p. 137)_
- [ ] **107.** Possuir funcionalidade que permita ao tomador de serviço informar a ciência da execução do serviço discriminado na NFSe pelo prestador a fim de dar fé sobre a ocorrência do fato gerador. Essa funcionalidade deve ser _(TR, p. 137)_
### parametrizável atendendo as seguintes regras: _(p. 137)_

> • Determinar o valor mínimo da nota a ser manifestada; _(TR, p. 137)_
> • Determinar os tipos de pessoas que podem manifestar a nota (Física, Jurídica ou _(TR, p. 137)_
> Ambas); _(TR, p. 137)_
> • Determinar o prazo para manifestação da nota. _(TR, p. 137)_
- [ ] **108.** A manifestação do tomador deve ocorrer via link enviado no e-mail ao tomador no momento da emissão da nota fiscal ou através da solução web com acesso autenticado pelo tomador. _(TR, p. 137)_
- [ ] **109.** Possuir rotina para emissão de notas avulsas com as seguintes _(TR, p. 137)_
### características: _(p. 137)_

- [ ] **110.** Possibilidade inclusão de requerimento de nota avulsa; _(TR, p. 137)_
- [ ] **111.** Emissão de documento para arrecadação com o valor do ISS apurado na NFSe; _(TR, p. 137)_
- [ ] **112.** Possibilidade de condicionar a emissão da nota mediante a pagamento dos tributos incidentes; _(TR, p. 137)_
- [ ] **113.** Possibilidade de liberação manual, pelo fiscal, da nota avulsa através de informe de pagamento; _(TR, p. 137)_
- [ ] **114.** Possibilidade de análise das liberações de notas em caso dos regimes especiais de tributação; _(TR, p. 137)_
- [ ] **115.** Integração das informações das guias com o Sistema Tributário Municipal. _(TR, p. 138)_
- [ ] **116.** Para os serviços prestados de construção civil, onde exista valor máximo estipulado para dedução da base de cálculo sem comprovação, deve ser sugerido automaticamente pelo sistema o valor de dedução previsto, sendo possível a sua alteração. _(TR, p. 138)_
- [ ] **117.** Para os serviços prestados de construção civil deve ser obrigatório informações referentes à obra, bem como matrícula CEI/CNO da obra e Anotação de Responsabilidade Técnica – ART. _(TR, p. 138)_
- [ ] **118.** Para os serviços prestados de construção civil onde o prestador julgar que não existem dados da obra, deve ser possível que mesmo declara que a obra em questão não necessita da matrícula CEI/CNO e ART. _(TR, p. 138)_
- [ ] **119.** Possuir “Resumo geral dos movimentos de emissão de notas” onde _(TR, p. 138)_
### deve demonstrar uma consulta com no mínimo os seguintes itens: _(p. 138)_

> • ISSQN devido para o município; _(TR, p. 138)_
> • ISSQN devido para outros municípios; _(TR, p. 138)_
> • Quantidade de notas geradas. _(TR, p. 138)_
- [ ] **120.** No ambiente de administração também deve ser possível emitir, no _(TR, p. 138)_
### mínimo os seguintes relatórios gerais das NFSe: _(p. 138)_

> • Notas emitidas; _(TR, p. 138)_
> • Resumo de notas por atividade (quantidade e valor das notas); _(TR, p. 138)_
> • Visão geral quantitativa dos cenários das notas emitidas. _(TR, p. 138)_
- [ ] **121.** Possuir modelo customizável de Notificação do Débitos para envio aos contribuintes por carta ou domicílio eletrônico, com respectiva guia de recolhimento, tendo como alvo todos os contribuintes identificados que utilizaram indevidamente da emissão de NFS-e com alíquota menor que a devida para retenção a menor pelo seu tomador. Nota Fiscal Eletrônica Mobile _(TR, p. 138)_
- [ ] **122.** O sistema disponibiliza a emissão de NFS-e por meio de aplicativo para dispositivos móveis com plataforma Android e IOS com interface amigável e contar com a opção para emissão de NFS-e por empresas com atividades rotineiras. _(TR, p. 138)_
- [ ] **123.** O sistema permite a cada emissão de NFS-e a possibilidade de compartilhamento e envio por e-mail. _(TR, p. 138)_
- [ ] **124.** O sistema permite a verificação de autenticidade das Notas Fiscais recebidas através da leitura de QrCode. _(TR, p. 139)_

## Simples Nacional

- [ ] **1.** Permitir importação de arquivos de dados do Simples Nacional, tais como, declaração, pagamento, parcelamento, processos, entre outros. _(TR, p. 139)_
- [ ] **2.** Permitir realizar cruzamento da declaração do Documento de Arrecadação do Simples Nacional Declaratória – DAS-D e da emissão de Nota Fiscal de Serviços Eletrônica – NFS-e para demonstrar divergências dos contribuintes no que se refere ao ISS Próprio, ao ISS Retido, ou divergência pela falta do DAS-D, ou pela não emissão de NFS-e ou pela falta de ambas; _(TR, p. 139)_
- [ ] **3.** Realizar a integração com os dados do Simples Nacional (PGDAS) e o movimento econômico de Notas Fiscais de Serviços emitidas, e com base nestas informações, calcular a alíquota de ISSQN que deve ser aplicada para cada NFS-e emitida, cujo recolhimento do ISSQN deve ser de responsabilidade do Tomador do Serviço. _(TR, p. 139)_
- [ ] **4.** Permite o cruzamento das informações declaradas no PGDAS-D com as informações do pagamento recebidas pelo DAF607 possibilitando envio de alerta ao Domicílio Tributário Eletrônico do Simples Nacional – DTE-SN ou outro meio de comunicação (e-mail, SMS, carta, DTEL, etc.) _(TR, p. 139)_
- [ ] **5.** Permitir demonstrar falta de pagamento referente a declaração do Documento de Arrecadação do Simples Nacional Declaratória – DAS-D. _(TR, p. 139)_
- [ ] **6.** Permitir identificar contribuintes com divergência de atividade no cadastro e na declaração DAS-D. Exemplo: Escritório de Contabilidade. _(TR, p. 139)_
- [ ] **7.** Permitir identificar contribuintes que declararam valor fixo na DAS-D mas que não estão cadastrado com Estimado. _(TR, p. 139)_
- [ ] **8.** Permitir que o sistema gere notificações individuais ou em lote para cada uma das divergências citadas; _(TR, p. 139)_
- [ ] **9.** Permitir acompanhar a tramitação de processos administrativos de lançamentos realizados no SEFISC. _(TR, p. 139)_
- [ ] **10.** Permitir ao contribuinte registrar processo com possibilidade de entrega de documentos, registro de observações, conforme prazos estabelecidos, assim como recursos. _(TR, p. 140)_
- [ ] **11.** Permitir a geração do Termo de Exclusão do SIMPLES para aqueles contribuintes notificados que não se justificou no processo, informando eletronicamente da sua exclusão. _(TR, p. 140)_
- [ ] **12.** Apresentar relatório para viabilizar a Exclusão no mês subsequente do Optante do Simples Nacional, pois a mesma ocorre quando o contribuinte tem a sua Receita Bruta do Ano calendário (RBA) ultrapassada em mais 20% do limite Federal, ou sublimite estadual quando houver. Através deste relatório deverá ser gerado o arquivo formato txt., conforme layout definido pela RFB, para envio de ação para exclusão da opção do simples nacional em Lote de contribuintes. _(TR, p. 140)_
- [ ] **13.** Permitir reconhecer automaticamente, através das movimentações do DAS-D, as divergências dos contribuintes notificados que se auto regularizaram. _(TR, p. 140)_
- [ ] **14.** Permitir acompanhar os contribuintes que iniciaram a regularização através de parcelamento no SIMPLES, com a suspensão do débito, através de tela para digitação manual da autoridade tributária até a liquidação do débito. _(TR, p. 140)_
- [ ] **15.** Permitir a distinção dos pagamentos do Simples Nacional registrando em codificações distintas as dívidas do Simples Nacional e SIMEI, bem como para contribuintes eventuais. _(TR, p. 140)_
- [ ] **16.** O sistema deverá realizar a distribuição dos pagamentos do simples nacional em suas respectivas competências, seja o pagamento oriundo de um DAS de parcelamento ou um DAS normal. _(TR, p. 140)_
- [ ] **17.** Permitir a importação dos arquivos de pagamentos do Simples Nacional, tais como DAF607. _(TR, p. 140)_
- [ ] **18.** Realizar enquadramento de empresas optantes do Simples Nacional, através da importação do arquivo de períodos disponibilizado pela Receita Federal do Brasil. _(TR, p. 140)_
- [ ] **19.** Inscrever em Dívida Ativa, os créditos importados da Procuradoria-Geral da Fazenda Nacional – PGFN, para protesto e execução judicial. _(TR, p. 140)_
- [ ] **20.** Apresentar o recurso de Alerta Municipal, tendo como referência o Alerta da Receita Federal do Brasil, que consiste no envio de comunicados aos contribuintes optantes pelo Regime Especial Unificado de Arrecadação de Tributos e Contribuições devidos pelas Microempresas e Empresas de Pequeno Porte – Simples Nacional (SN), para os quais foram apontados indícios de omissão de receita ou segregação indevida dos faturamentos da prestação de serviço. _(TR, p. 140)_

## ISS Bancário

> Gestão DES-IF _(TR, p. 141)_
- [ ] **1.** Permitir Instituição Financeira validar os arquivos importados, conforme Modelo Conceitual DES-IF, Padrão ABRASF, versão 2.3 ou superior; _(TR, p. 141)_
- [ ] **2.** Permitir assinatura digital da Instituição Financeira, modelo A1 ou A3, para os arquivos processados com sucesso; _(TR, p. 141)_
- [ ] **3.** Permitir Instituição Financeira transmitir arquivo, após assinatura digital, para o sistema de Gestão da DES-IF; _(TR, p. 141)_
- [ ] **4.** Permitir importar arquivos referentes ao “Módulo 3 – Informações Comuns ao Municípios” e ao “Módulo 2 – Apuração Mensal do ISSQN” não devendo constar os nomes das Instituições Financeiras; _(TR, p. 141)_
- [ ] **5.** Permitir relacionar o PGCC (Plano Geral de Contas Comentado) por instituição financeira com vinculação a codificação COSIF; _(TR, p. 141)_
- [ ] **6.** Permitir vincular tabela de tarifas bancárias com seus respectivos Subtítulos de lançamento contábil; _(TR, p. 141)_
- [ ] **7.** Permitir demonstrar apuração da receita tributada e do ISS mensal devido por subtítulos, segregados por dependência (agência) contendo o período de competência dos dados declarados, código PGCC, código de tributação DES-IF, receita tributável, dedução, base de cálculo, alíquota, crédito e débito; _(TR, p. 141)_
- [ ] **8.** Permitir relacionar dependências (agências) com informações de CNPJ próprio, inscrição municipal, ISSQN devido e ISSQN a recolher; _(TR, p. 141)_
- [ ] **9.** Permitir demonstrar o balancete analítico mensal segregado por dependência (agência) contendo o período de competência, código PGCC, saldo inicial, créditos, débitos, saldo final; _(TR, p. 141)_
- [ ] **10.** Permitir relacionar módulos pendentes de entrega por Instituição Financeira, contendo no mínimo, CNPJ base da instituição, tipo do módulo e competência pendente de entrega; _(TR, p. 141)_
- [ ] **11.** Permitir relacionar contas tributáveis sem movimento econômico; _(TR, p. 142)_
- [ ] **12.** Apresentar diferenças entre os Planos de Contas declarados pela instituição; _(TR, p. 142)_
- [ ] **13.** Requisitos da Declaração de Serviços Financeiros (DES-IF) _(TR, p. 142)_
- [ ] **14.** Preservar a segurança das informações garantindo o sigilo de acesso dos servidores municipais e dos funcionários das instituições financeiras, devidamente habilitados para desempenhar tal função através de senha própria e intransferível; _(TR, p. 142)_
- [ ] **15.** Permitir importar arquivos referentes ao “Módulo 3 – Informações Comuns ao Municípios” e ao “Módulo 2 – Apuração Mensal do ISSQN” não devendo constar os nomes das Instituições Financeiras; _(TR, p. 142)_
- [ ] **16.** Permitir Instituição Financeira validar os arquivos importados, conforme Modelo Conceitual DES – IF, Padrão ABRASF, versão 2.3 ou superior; _(TR, p. 142)_
- [ ] **17.** Permitir assinatura digital da Instituição Financeira, modelo A1 ou A3, para os arquivos processados com sucesso; _(TR, p. 142)_
- [ ] **18.** Permitir Instituição Financeira transmitir arquivo, após assinatura digital, para o sistema de Gestão da DES – IF. _(TR, p. 142)_
- [ ] **19.** Permitir relacionar o PGCC (Plano Geral de Contas Comentado) por instituição financeira com vinculação a codificação COSIF; _(TR, p. 142)_
- [ ] **20.** Receber as informações do seguinte registro: plano geral de contas comentado – PGCC (de acordo com modelo conceitual ABRASF); _(TR, p. 142)_
- [ ] **21.** Receber as informações do seguinte registro: pacotes de serviços; _(TR, p. 142)_
- [ ] **22.** Receber as informações do seguinte registro: composição dos pacotes de serviços; _(TR, p. 142)_
- [ ] **23.** Receber as informações do seguinte registro: balancete analítico mensal; _(TR, p. 142)_
- [ ] **24.** Após importação do balancete, possibilitar cruzar as informações balancete analítico mensal nos mesmos moldes do arquivo enviado ao Banco Central do Brasil com os dados importados na apuração mensal; _(TR, p. 142)_
- [ ] **25.** Possibilitar a emissão de relatório contendo dados do balancete analítico mensal importado pelas instituições financeiras; _(TR, p. 142)_
- [ ] **26.** Receber as informações do seguinte registro: demonstrativo da apuração da receita tributável e do ISSQN mensal devido por subtítulo _(TR, p. 142)_
- [ ] **27.** Receber as informações do seguinte registro: movimentação no número de correntista; _(TR, p. 142)_
- [ ] **28.** Receber as informações do seguinte registro: arrecadação referente aos pacotes de serviços; _(TR, p. 143)_
- [ ] **29.** Receber as informações do seguinte registro: demonstrativo do ISSQN mensal a recolher; _(TR, p. 143)_
- [ ] **30.** O valor do ISSQN a ser pago pela instituição financeira, deverá ser calculado de forma automática pelo sistema; _(TR, p. 143)_
- [ ] **31.** Permitir a configuração do dia para vencimento para consolidação do ISS; _(TR, p. 143)_
- [ ] **32.** Permitir a listagem de serviços prestados pelas instituições financeiras para verificação do enquadramento à lista de serviços, permitindo, o seu reenquadramento, inclusive por subitem, uma vez que, o sistema permite estas subdivisões; _(TR, p. 143)_
- [ ] **33.** Cadastro de usuário que permite o servidor municipal apenas visualizar as informações das instituições financeiras sediadas no território do município competente para cobrança do imposto com controle de acesso que será definido pela administração tributária; _(TR, p. 143)_
- [ ] **34.** Relação da declaração somando pelo item e subitem da lista anexa a lei complementar 116/2003; _(TR, p. 143)_
- [ ] **35.** Relação da movimentação das tarifas; _(TR, p. 143)_
- [ ] **36.** Permitir vincular tabela de tarifas bancárias com seus respectivos Subtítulos de lançamento contábil; _(TR, p. 143)_
- [ ] **37.** Emitir relatório dos dados das tarifas de serviços da instituição financeira/Banco; _(TR, p. 143)_
- [ ] **38.** Permitir demonstrar apuracão da receita tributada e do ISS mensal devido por subtítulos, segregados por dependência (agência) contendo o período de competência dos dados declarados, código PGCC, código de tributação DES – IF, receita tributável, dedução, base de cálculo, alíquota, crédito e débito; _(TR, p. 143)_
- [ ] **39.** Permitir relacionar dependências (agências) com informações de CNPJ próprio, inscrição municipal, ISSQN devido e ISSQN a recolher; _(TR, p. 143)_
- [ ] **40.** Permitir demonstrar o balancete analítico mensal segregado por dependência (agência) contendo o período de competência, código PGCC, saldo inicial, créditos, débitos, saldo final; _(TR, p. 143)_
- [ ] **41.** Permitir relacionar módulos pendentes de entrega por Instituição Financeira, contendo no mínimo, CNPJ base da instituição, tipo do módulo e competência pendente de entrega; _(TR, p. 143)_
- [ ] **42.** Permitir relacionar contas tributáveis sem movimento econômico; _(TR, p. 144)_
- [ ] **43.** Apresentar diferenças entre os Planos de Contas declarados pela instituição; _(TR, p. 144)_
- [ ] **44.** Demonstrativo da movimentação dos pacotes de serviços; _(TR, p. 144)_
- [ ] **45.** Relação das tarifas, pacotes de serviços, serviços com remunerações variáveis, com seus respectivos enquadramentos a lista de serviços da lei municipal; _(TR, p. 144)_
- [ ] **46.** Relação dos pacotes de serviços comparando com a arrecadação de pacotes dos serviços x quantidade correntista nele enquadrados; _(TR, p. 144)_
- [ ] **47.** Relação dos pacotes de serviços comparando com a arrecadação de pacotes de serviços x a diferença da composição dos pacotes de serviços; _(TR, p. 144)_
- [ ] **48.** Recibo de entrega da declaração – só emitido caso todos os itens obrigatórios da declaração sejam validados e transmitidos pela instituição; _(TR, p. 144)_
- [ ] **49.** Resumo da declaração – após validado e transmitido; _(TR, p. 144)_
- [ ] **50.** Permitir ao fisco municipal identificar as instituições financeiras que não efetuaram a declaração de serviços prestados e ou tomados; _(TR, p. 144)_
- [ ] **51.** Documento de arrecadação municipal – DAM no padrão FEBRABAN que será preenchido de acordo com a configuração de formação da base de cálculo; _(TR, p. 144)_
- [ ] **52.** Permitir configurar mensagens para serem apresentadas no DAM (documento de arrecadação municipal), exemplo: instruções para pagamentos; _(TR, p. 144)_
- [ ] **53.** Permitir a configuração do dia do vencimento do DAM (documento de arrecadação municipal) do ISSQN; _(TR, p. 144)_
- [ ] **54.** Calcular a correção monetária dos boletos em atraso de acordo com o índice usado pela administração municipal; _(TR, p. 144)_
- [ ] **55.** Possibilitar confrontar contas enviadas pelo banco com as determinadas pelo fisco como passíveis de tributação gerando relatório dos valores devidos e não declarados; _(TR, p. 144)_
- [ ] **56.** Possuir opção para emissão de relatório que liste as instituições financeiras com dedução na base de cálculo do ISSQN para solicitação de esclarecimentos; _(TR, p. 144)_
- [ ] **57.** Relatório que demonstre o valor a recolher pela fiscalização, indicando as divergências encontradas pela marcação de contas como tributáveis pelo fisco; _(TR, p. 144)_
- [ ] **58.** Criação de ordem de serviço para início de fiscalização. As ordens de serviços deverão ser criadas de forma automáticas; _(TR, p. 144)_
- [ ] **59.** Criação de termo de início de fiscalização com texto definidos pelo setor competente. _(TR, p. 144)_
- [ ] **60.** Criação do mapa de apuração de forma automática, indicando as contas COSIF sem as declarações obrigatórias e com declarações inconsistentes; _(TR, p. 145)_
- [ ] **61.** Criação de auto de infração por não cumprimento da obrigação principal e acessória de forma automática; _(TR, p. 145)_
- [ ] **62.** Possibilitar a criação de modelos de documentos a serem enviados as instituições financeiras pelo não cumprimento das obrigações definidas em lei; _(TR, p. 145)_
- [ ] **63.** Permitir criar modelos de documentos fiscais utilizados pelo município; _(TR, p. 145)_
- [ ] **64.** Permitir alterar os documentos fiscais gerados a partir dos modelos. _(TR, p. 145)_
- [ ] **65.** Enviar Documentos Fiscais automáticos em relação as obrigações tributárias acessórias; _(TR, p. 145)_
- [ ] **66.** Possibilitar cadastrar as penalidades e acréscimos legais; _(TR, p. 145)_
- [ ] **67.** O sistema deve possibilitar a criação de modelos de documentos fiscais referentes aos processos de fiscalização, contendo inclusive a estruturas desejadas; _(TR, p. 145)_
- [ ] **68.** Gerar projeto de fiscalização de forma automática; _(TR, p. 145)_
- [ ] **69.** Gerar Ordem de Serviço automaticamente podendo escolher agência específica; _(TR, p. 145)_
- [ ] **70.** Gerar Termo de Início de Ação Fiscal automaticamente; _(TR, p. 145)_
- [ ] **71.** Gerar Mapas de Apuração (planilha de Cálculos) por competência, COSIF e _(TR, p. 145)_
### PGCC; _(p. 145)_

- [ ] **72.** Gerar Auto de Infração referente a obrigação tributária acessória e ou obrigação principal; _(TR, p. 145)_
- [ ] **73.** Apurar base de cálculo do ISSQN referente a arrecadação dos pacotes de serviços levando em conta a quantidade e valores dos pacotes ou cestas de serviços. _(TR, p. 145)_
- [ ] **74.** Gerar Auto de Infração referente a pacotes ou cestas de serviços. _(TR, p. 145)_

## Portal da Transparência

- [ ] **1.** Deverá ser um sistema totalmente responsivo, podendo ser acessado de qualquer dispositivo móvel, devendo para tanto responder ao tamanho da tela para se adequar da melhor forma a celulares, tablets e qualquer navegador; _(TR, p. 145)_
- [ ] **2.** O Portal da Transparência deverá estar disponível na web, sem limitações de acessos simultâneos; _(TR, p. 145)_
- [ ] **3.** Possibilitar a Entidade personalizar o Portal da Transparência, inserindo o brasão, banner e o logotipo do Município, assim como alterar as cores do plano de fundo, exibir o brasão do Município no Portal da Transparência, permitindo melhor caracterização e identificação do sistema pelo usuário; _(TR, p. 146)_
- [ ] **4.** Exibir informações mínimas das unidades gestoras publicantes do Portal da Transparência, tais como: responsável, endereço, telefone e horário de funcionamento; _(TR, p. 146)_
- [ ] **5.** Dispor de um glossário dos termos utilizados no Portal da Transparência, proporcionando ao usuário do sistema entender termos mais complexos da administração pública; _(TR, p. 146)_
- [ ] **6.** Dispor de uma seção Fale Conosco _(TR, p. 146)_
- [ ] **7.** Dispor de ferramentas de acessibilidade WEB para pessoas com deficiência aprovado pelas Normas Brasileiras de Acessibilidade; _(TR, p. 146)_
- [ ] **8.** Dispor mapa do site; _(TR, p. 146)_
- [ ] **9.** Dispor de seção “Perguntas Frequentes”; _(TR, p. 146)_
- [ ] **10.** Dispor de Manual de Navegação; _(TR, p. 146)_
- [ ] **11.** Possibilitar a disponibilização das principais leis que regulam o Portal da Transparência; _(TR, p. 146)_
- [ ] **12.** Possibilitar disponibilizar informação sobre a estrutura organizacional; _(TR, p. 146)_
- [ ] **13.** Possibilitar inserir informações sobre as unidades administrativas; _(TR, p. 146)_
- [ ] **14.** Possibilitar a disponibilização da Carta de Serviços do Poder executivo Municipal; _(TR, p. 146)_
- [ ] **15.** Atender a Lei Complementar nº 131/2009, onde se instituiu a obrigatoriedade quanto à divulgação através de meios eletrônicos e de acesso ao público, dos planos, orçamentos e leis de diretrizes orçamentárias; das prestações de contas e o respectivo parecer prévio; do Relatório Resumido da Execução Orçamentária, do Relatório de Gestão Fiscal e das versões simplificadas desses documentos; _(TR, p. 146)_
- [ ] **16.** Disponibilização, em tempo real, dos dados da execução orçamentária e financeira, no Portal da Transparência, conforme determinação da Lei Complementar 131/2009; _(TR, p. 146)_
- [ ] **17.** Nas informações da despesa, deve-se permitir selecionar a despesa empenhada, liquidada e paga, bem como exibir a ficha da despesa de forma individual; _(TR, p. 146)_
- [ ] **18.** A ficha da despesa deve fornecer as seguintes informações: entidade, número da despesa, tipo da despesa, ano da despesa, data da despesa, número do processo, valor da despesa, nome do favorecido, CPF ou CNPJ (permitindo aplicar máscara) do favorecido e todo o detalhamento da despesa, que compreende o órgão, unidade orçamentária, função, subfunção, programa, projeto ou atividade, elemento da despesa, subelemento, fonte de recurso e histórico da despesa; _(TR, p. 147)_
- [ ] **19.** A ficha da despesa também deve apresentar todas as demais etapas vinculadas àquela despesa; _(TR, p. 147)_
- [ ] **20.** A informação sobre pagamento deve conter, minimamente: valor do pagamento, empenho, data, favorecido e descrição do objeto; _(TR, p. 147)_
- [ ] **21.** No empenho, as informações mínimas: número do empenho, valor, data, favorecido e descrição do objeto; _(TR, p. 147)_
- [ ] **22.** Divulgar informações mínimas para o acompanhamento do orçamento da receita e execução da receita; _(TR, p. 147)_
- [ ] **23.** Divulgar as informações do estágio da receita; _(TR, p. 147)_
- [ ] **24.** Divulgar informações mínimas sobre quaisquer repasses ou transferências de recursos financeiros; _(TR, p. 147)_
- [ ] **25.** Disponibilizar informações sobre convênios, contratos de repasse, _(TR, p. 147)_
### termos de gestão e instrumentos congêneres, contendo minimamente: _(p. 147)_

> convênio recebido ou concedido; beneficiário; objeto; vigência inicial e _(TR, p. 147)_
> final; valor; _(TR, p. 147)_
- [ ] **26.** Permite publicar informações referentes a compras realizadas, com a exibição de uma lista detalhada de aquisições de materiais e serviços realizadas, incluindo descritivos, quantitativos e valores de itens; _(TR, p. 147)_
- [ ] **27.** Divulgar informações sobre contratos e aditivos firmados pelo órgão publicante, permitindo também a publicação na íntegra dos contratos e aditivos; _(TR, p. 147)_
- [ ] **28.** Exibir a listagem de processos licitatórios, dispensas e inexigibilidades, permitindo a publicação na íntegra dos editais e das atas de licitação; _(TR, p. 147)_
- [ ] **29.** Divulgar informações mínimas sobre os bens patrimoniais pertencentes ao Município; _(TR, p. 147)_
- [ ] **30.** Divulgar informações mínimas sobre as entradas e saídas do almoxarifado do órgão publicante; _(TR, p. 148)_
- [ ] **31.** Disponibilizar Menu de consulta dos servidores públicos, permitindo a divulgação de informações mínimas sobre a folha de pagamento dos servidores, tais como matrícula, salário, cargo, data de admissão, carga horária, e secretaria de lotação; _(TR, p. 148)_
- [ ] **32.** Possibilita a divulgação dos valores bruto e líquido do salário dos servidores, bem como seus descontos e vencimentos; _(TR, p. 148)_
- [ ] **33.** Disponibilizar informações sobre diárias, indicando no mínimo o nome do beneficiário, função/cargo, valor recebido, período da viagem, destino e motivo; _(TR, p. 148)_
- [ ] **34.** Disponibilizar informações sobre passagens; _(TR, p. 148)_
- [ ] **35.** Disponibilizar de ferramenta para pedidos de acesso à informação (E- SIC), com as seguintes características: fácil acesso, possibilidade de recurso, apresentação de relatório estatístico (quantidade de pedidos recebidos, atendidos, indeferidos), possibilidade de publicação das manifestações apresentadas ao município; _(TR, p. 148)_
- [ ] **36.** Disponibilizar informações sobre o SIC Físico do município; _(TR, p. 148)_
- [ ] **37.** Permitir a publicação da informação sobre o cadastro de Fornecedores Impedidos de licitar – CAFIMP; _(TR, p. 148)_
- [ ] **38.** Permitir links com outros portais/site, a exemplos do portal do Governo Federal e Diário Oficial; _(TR, p. 148)_
- [ ] **39.** Disponibilizar informações sobre programas, projetos e ações; _(TR, p. 148)_
- [ ] **40.** Disponibilizar informações sobre as obras públicas municipais; _(TR, p. 148)_
- [ ] **41.** Disponibilizar campo para inserção dos relatórios instrumentos de planejamento: PPA, LDO, LOA, RGF, RREO e Prestação de contas; _(TR, p. 148)_
- [ ] **42.** Permitir publicação de documentos do Controle Interno, a exemplo: Instruções Normativas, relatórios de Auditoria, Recomendações e pareceres; _(TR, p. 148)_
- [ ] **43.** Possibilitar a publicação de documentos no Portal da Transparência, conforme determina a Lei Nº 12.527/11; _(TR, p. 148)_
- [ ] **44.** Permitir, através de configuração, que o portal possa ser configurado de forma a apresentar somente as entidades e menus que o município desejar demonstrar; _(TR, p. 148)_
- [ ] **45.** Possibilidade de ativar ou desativar menus nativos do sistema, permitindo que o município configure qual consulta deseja exibir; _(TR, p. 149)_
- [ ] **46.** O sistema deverá permitir ao cidadão pesquisar as informações por meio de filtros, de forma simples e de fácil operação e, quando não for possível utilizar este recurso, proporcionar a busca através de um campo de busca por palavra-chave; _(TR, p. 149)_
- [ ] **47.** Permitir o download de documentos, tais como: Plano Plurianual, Lei de Diretrizes Orçamentárias, Lei Orçamentária Anual, Relatórios de Gestão Fiscal, Relatórios Resumidos da Execução Orçamentária, Balancetes mensais, Íntegra dos contratos, editais e resultados dos editais, bem como qualquer outro documento exigido pelos órgãos supervisores do Portal da Transparência, através de publicação manual (upload) de cada documento, por uma área administrativa do Portal da Transparência; _(TR, p. 149)_
- [ ] **48.** Possibilitar exportar as informações do Portal da Transparência em diversos formatos eletrônicos, inclusive abertos e não proprietários, tais como planilhas e texto, de modo a facilitar a análise das informações; _(TR, p. 149)_
- [ ] **49.** Permitir exportar os dados publicados para arquivos em diversos formatos, tais como PDF, XLS, XLSX, RTF e CSV; _(TR, p. 149)_
- [ ] **50.** Permitir a migração de dados de outro(s) sistema, trazendo informação de no mínimo em 06 (seis) meses; _(TR, p. 149)_
- [ ] **51.** O Portal deve ser integrado com os Sistemas de Contabilidade Pública, Gestão Administrativa, Gestão Financeira e Tesouraria, Planejamento Municipal, Recursos Humanos e Folha de Pagamento e Gestão de Tributos; _(TR, p. 149)_

## Controle Interno

### Módulo De Controle Interno _(p. 149)_

- [ ] **1.** O sistema deverá ser executado em sistema multiusuário; _(TR, p. 149)_
- [ ] **2.** O acesso deverá ser por meio de login e senha; _(TR, p. 150)_
- [ ] **3.** O sistema deve operar exclusivamente na plataforma web; _(TR, p. 150)_
- [ ] **4.** O sistema web deverá ser acessado por navegadores (Browsers) de mercado, entre eles, no mínimo: Internet explorer (versão 11 ou superior), - Mozila-Firefox; - Google Chrome; - Edge; - Safari, Opera; _(TR, p. 150)_
- [ ] **5.** O sistema não poderá apresentar limitação quanto ao número de usuários simultâneos; _(TR, p. 150)_
- [ ] **6.** O sistema deverá ser multiusuário permitindo o trabalho simultâneo em uma mesma tarefa, com total integridade dos dados; _(TR, p. 150)_
- [ ] **7.** O sistema deverá permitir número ilimitado de usuários _(TR, p. 150)_
- [ ] **8.** O sistema deverá permitir o cadastro de Legislações específicas _(TR, p. 150)_
- [ ] **9.** Calendário de Obrigações Legais; _(TR, p. 150)_
- [ ] **10.** Planejamento de Auditorias; _(TR, p. 150)_
- [ ] **11.** Execução de Auditorias; _(TR, p. 150)_
- [ ] **12.** Lançamento de Checklist; _(TR, p. 150)_
- [ ] **13.** Impressão de Checklist; _(TR, p. 150)_
- [ ] **14.** Emissão de notificações e recomendações dentro do sistema; _(TR, p. 150)_
- [ ] **15.** O sistema devera estabelecer nível de acesso por grupo ou usuários; _(TR, p. 150)_
- [ ] **16.** Acompanhamento de resultado primário nominal; _(TR, p. 150)_
- [ ] **17.** Gerador de ofícios, pareceres e documentos com possibilidade de arquivamento dentro do sistema; _(TR, p. 150)_
- [ ] **18.** Gerência das ações efetuadas no sistema; _(TR, p. 150)_
- [ ] **19.** Apuração e acompanhamento dos limites constitucionais, de educação e saúde; _(TR, p. 150)_
- [ ] **20.** Apuração da receita corrente líquida; _(TR, p. 150)_
- [ ] **21.** Apuração e acompanhamento do limite de gastos com pessoal conforme exigência da Lei 101/2000 (LRF); _(TR, p. 150)_
- [ ] **22.** Usuários devem ter acesso on-line às informações do Bano de Dados somente a partir do sistema; _(TR, p. 150)_
- [ ] **23.** Emissão de relatórios de auditoria; _(TR, p. 150)_
- [ ] **24.** Emissão de relatório mensal de Controle Interno; _(TR, p. 150)_
- [ ] **25.** Emissão de relatório anual de Controle Interno; _(TR, p. 150)_
- [ ] **26.** Elaboração de cronograma de auditoria; _(TR, p. 150)_
- [ ] **27.** Integração com todos os outros módulos do sistema (Contabilidade, Folha, Compras, Licitações, Frota, Almoxarifado, Tributos, Orçamento, Obras, Convênios, etc...), com possibilidade de acesso a todas as informações; _(TR, p. 151)_
- [ ] **28.** Cruzamento de dados com informações de outros módulos para criar achados de auditoria; _(TR, p. 151)_
- [ ] **29.** O sistema deverá permitir a emissão de relatórios salvos por usuários que os modificaram, possam ser compartilhados com outros usuários; _(TR, p. 151)_
- [ ] **30.** O sistema deverá permitir s emissão de relatórios com a possibilidade de personalização de layout e impressão de brasões, definidos pelo usuário; _(TR, p. 151)_
- [ ] **31.** Demonstrar análises através de dashboard (Painel eletrônico) de valores e percentuais, conforme o caso – na forma definida pelo art. 2°, do Decreto Federal 7185, de 27/05/2010, que regulamentou o artigo. 48, parágrafo único da LC 101/2000, com as alterações introduzidas pela LC 131/2009 – dos limites voltados para a responsabilidade na gestão das finanças públicas; _(TR, p. 151)_
- [ ] **32.** Permitir a extração em forma de ponto de controle quando todas as informações estiverem disponíveis e acessíveis de forma estruturada. _(TR, p. 151)_

## Meio Ambiente

- [ ] **1.** Ao digitar o CEP retornar com as informações de localização; _(TR, p. 151)_
- [ ] **2.** Deixar cadastrar parecer técnico, deixar montar seu relatório ambiental; _(TR, p. 151)_
- [ ] **3.** Deixar relacionar as atividades ao licenciamento ambiental, bem como estar relacionado ao enquadramento para cálculo do valor dos tributos referentes ao licenciamento ambiental; _(TR, p. 151)_
- [ ] **4.** Deixar relacionar o cadastro do tipo do potencial poluidor ao licenciamento ambiental; _(TR, p. 151)_
- [ ] **5.** Disponibilizar lista de consultores para que os empreendedores e outros possam consultar os consultores já credenciados no município; _(TR, p. 151)_
- [ ] **6.** Enviar link, bem como informações de acesso ao credenciado; _(TR, p. 151)_
- [ ] **7.** Envio de e-mail para o credenciado informando que seu processo foi aberto está sobre analise; _(TR, p. 151)_
- [ ] **8.** Fazer controle de movimentação de mudas em viveiros; _(TR, p. 151)_
- [ ] **9.** No que tange o cálculo do tributo ambiental o valor do mesmo deve ser baseado automaticamente no seu enquadrado pré-definido; _(TR, p. 152)_
- [ ] **10.** O usuário visualizará somente as opções do sistema para as quais ele foi autorizado; _(TR, p. 152)_
- [ ] **11.** Permitir cadastrar locais de APPs ou outros do tipo que possam restringir ação do licenciamento ambiental; _(TR, p. 152)_
- [ ] **12.** Permitir definir tipo de documentos digitais que serão necessários de acordo com tipo de pessoa credenciada; _(TR, p. 152)_
- [ ] **13.** Permitir incluir atividades secundários ao licenciamento ambiental; _(TR, p. 152)_
- [ ] **14.** Permitir na hora do consultor realizar seu credenciamento incluir documentos digitais caso este seja necessário; _(TR, p. 152)_
- [ ] **15.** Permitir o credenciado realizar a solicitação de documentos necessários, como licenças, anuências, etc; _(TR, p. 152)_
- [ ] **16.** Permitir o técnico visualizar os anexos para poder homologar o credenciamento; _(TR, p. 152)_
- [ ] **17.** Permitir que no momento do credenciado seja possível anexar documentos digitais; _(TR, p. 152)_
- [ ] **18.** Permitir realizar denúncia ambiental via aplicativo mobile; _(TR, p. 152)_
- [ ] **19.** Poder relacionar as espécies com suas respectivas mudas; _(TR, p. 152)_
- [ ] **20.** Possibilitar a Secretaria acompanhar os processos que estão na caixa de entrada; _(TR, p. 152)_
- [ ] **21.** Possibilitar cadastrar e-mail do(s) responsável(s) que acompanharão os prazos dos licenciamentos; _(TR, p. 152)_
- [ ] **22.** Possibilitar cadastro da matriz de enquadramento ambiental; _(TR, p. 152)_
- [ ] **23.** Possibilitar confecção de vários modelos de documentos; _(TR, p. 152)_
- [ ] **24.** Possibilitar definir quais documentos serão necessários para realizar o credenciamento de acordo com o tipo do credenciado; _(TR, p. 152)_
- [ ] **25.** Possibilitar emissão do extrato ambiental referente ao licenciado; _(TR, p. 152)_
- [ ] **26.** Possibilitar escolha de datum no momento de inserir as informações geográficas; _(TR, p. 152)_
- [ ] **27.** Possibilitar escolher vários modelos de documentos na hora da impressão; _(TR, p. 152)_
- [ ] **28.** Possibilitar marcação do licenciamento via visualização de imagens de área ou via satélite; _(TR, p. 152)_
- [ ] **29.** Possibilitar o consultor ambiental/interessado realizar seu credenciamento mediante órgão ambiental; _(TR, p. 153)_
- [ ] **30.** Possibilitar o interessado realizar sua simulação de licenciamento ambiental; _(TR, p. 153)_
- [ ] **31.** Possibilitar realizar denúncias ambientais pelo website; _(TR, p. 153)_
- [ ] **32.** Possibilitar realizar o aceite do credenciamento de acordo com fluxo definido no processo; _(TR, p. 153)_
- [ ] **33.** Possibilitar realizar tramite dos processos de acordo com processo definido; _(TR, p. 153)_
- [ ] **34.** Possibilitar relacionar os modelos de documentos com os tipos de documentos cadastrados no sistema; _(TR, p. 153)_
- [ ] **35.** Possibilitar visualização das licenças emitidas no município; _(TR, p. 153)_
- [ ] **36.** Possibilitar visualização dos licenciamentos ambientais realizado pelo município via aplicativo mobile; _(TR, p. 153)_
- [ ] **37.** Possuir cadastro das atividades que serão licenciadas; _(TR, p. 153)_
- [ ] **38.** Possuir cadastro de canteiros; _(TR, p. 153)_
- [ ] **39.** Possuir cadastro do tipo de credenciado; _(TR, p. 153)_
- [ ] **40.** Possuir cadastro dos tipos de potencial poluidor; _(TR, p. 153)_
- [ ] **41.** Possuir cadastros de mudas; _(TR, p. 153)_
- [ ] **42.** Possuir controle dos vencimentos das condicionantes, com envio de notificações via e-mail referente ao prazo das condicionantes sinalizando o credenciado/empreendedor, bem como o corpo técnico da Secretaria; _(TR, p. 153)_
- [ ] **43.** Possuir controle dos vencimentos das licenças ambientais, bem como qualquer outro documento de mesmo cunho que tenha algum prazo a ser acompanhado, com envio de notificações via e-mail referente ao prazo dos mesmos sinalizando o credenciado/empreendedor, bem como o corpo técnico da Secretaria; _(TR, p. 153)_
- [ ] **44.** Possuir recursos para delimitação de áreas; _(TR, p. 153)_
- [ ] **45.** Realizar consulta e critica referente aos débitos ambientais do envolvido no licenciamento; _(TR, p. 153)_
- [ ] **46.** Referente ao licenciamento ambiental, no que tange o seu enquadramento, o mesmo deve ser feito de forma automática; _(TR, p. 153)_
- [ ] **47.** Ser possível confeccionar relatórios ambientais possibilitando inserção de imagens; _(TR, p. 153)_
- [ ] **48.** Ser possível emitir a DUA referente ao valor do licenciamento ambiental; _(TR, p. 153)_
- [ ] **49.** Ser possível incluir anotações de responsabilidade técnica referente ao licenciamento bem como solicitação de documentos do mesmo cunho; _(TR, p. 154)_
- [ ] **50.** Ser possível incluir quantos dias, meses, ou anos, que antecederão o vencimento das condicionantes; _(TR, p. 154)_
- [ ] **51.** Ser possível incluir quantos dias, meses, ou anos, que antecederão o vencimento das licenças; _(TR, p. 154)_
- [ ] **52.** Sinalização que existem processos a serem analisados pela Secretaria Ambiental. _(TR, p. 154)_
- [ ] **53.** Permitir que o cadastro de tipo de pessoa para que seja possível realizar o credenciamento onde o mesmo deverá receber por e-mail as informações de acesso ao sistema. _(TR, p. 154)_
- [ ] **54.** No ato do credenciamento informar os documentos digitais obrigatórios de modo que isso vire um processo digital e o mesmo possa ser tramitado dentro do órgão/setor. _(TR, p. 154)_
- [ ] **55.** O Solicitante do documento ambiental, seja uma licença ou outro, poderá acompanhar a situação de forma digital através do portal do sistema. _(TR, p. 154)_
- [ ] **56.** Permitir que as licenças ambientais assinadas digitalmente estejam disponível de forma eletrônica e amarrada ao processo digital bem como com suas devidas assinaturas no portal do sistema. _(TR, p. 154)_
- [ ] **57.** Todos os processos digitais deverão ficar disponíveis bem como sua situação definidas em cores no portal do sistema devendo ser visualizadas em um mapa. _(TR, p. 154)_
- [ ] **58.** Ser possível fazer a tramitação de processos digitais, bem como fazer os anexos de documentos digitais, pareceres ambientais, Licenças ambientais bem como deixar assinar digitalmente os mesmos com certificado digital _(TR, p. 154)_
- [ ] **59.** No processo digital permitir que cada documento ambiental possa ser pesquisado a sua autenticidade. _(TR, p. 154)_
- [ ] **60.** Permitir integração com órgãos externos para que os processos digitais possam ajudar a deixar de ser desburocratizados. _(TR, p. 154)_
- [ ] **61.** Permitir que o usuário externo possa interagir de forma direta no sistema nos processos digitais, bem como, usuário interno, possa fazer a homologação dos processos onde o usuário externo irá receber às informações através de e-mail ou acompanhar via portal do sistema. _(TR, p. 154)_
- [ ] **62.** Ser possível anexar peças ao processo digital em andamento. _(TR, p. 155)_
- [ ] **63.** Ser possível visualizar toda juntada de documentos digitais dentro do processo eletrônico. _(TR, p. 155)_

## Educacional

### CARACTERÍSTICAS GERAIS _(p. 155)_

- [ ] **1.** O sistema deverá funcionar 100% na plataforma web, sem a necessidade de instalação de ferramentas adicionais nas estações e sem restrição de funcionamento em sistema operacional, permitindo acesso pelos principais navegadores disponíveis no mercado (Internet Explorer, Google Chrome ou Mozilla Firefox). _(TR, p. 155)_
- [ ] **2.** O sistema deverá possibilitar o acesso por tablets e Smartphones. _(TR, p. 155)_
- [ ] **3.** O sistema deverá disponibilizar uma seção de perguntas frequentes (FAQ). _(TR, p. 155)_
- [ ] **4.** O sistema deverá permitir que os usuários acessem a versão que o sistema está atualizado; _(TR, p. 155)_
- [ ] **5.** O sistema deverá possuir botão de ajuda nas telas principais dos módulos. _(TR, p. 155)_
- [ ] **6.** O sistema deverá possuir botão com link de vídeo de ajuda nas telas principais dos módulos. _(TR, p. 155)_
- [ ] **7.** O sistema deverá possuir integração com VLibras, proporcionando acessibilidade e permitindo que indivíduos surdos compreendam informações em seu próprio idioma, o que contribui para a promoção da inclusão digital. _(TR, p. 155)_
- [ ] **8.** O sistema deverá ser fornecido em Arquitetura SaaS (Software as a Service). _(TR, p. 155)_
- [ ] **9.** O banco de dados do sistema deverá ser relacional com arquitetura ANSI _(TR, p. 155)_
### SQL. _(p. 155)_

- [ ] **10.** O sistema deverá gravar auditoria de acesso às telas, inserção de dados, execução de rotinas e exclusão de dados em estrutura exclusiva no banco de dados para facilitar a consulta e exibição em tela, para que seja de rápida consulta. _(TR, p. 155)_
- [ ] **11.** O backup do sistema deverá ser diário, sem interromper o sistema e de forma imperceptível para o usuário. _(TR, p. 155)_
- [ ] **12.** O sistema deverá ter um cadastro único de pessoas para ser utilizado em todos os módulos, escolas e demais unidades. A base de cadastro de filiação, profissionais escolares, funcionários e estudantes deverá seguir as mesmas características e ser realizada unicamente no sistema. _(TR, p. 155)_
- [ ] **13.** O sistema deverá manter em uma única base todas as escolas da rede. _(TR, p. 156)_
- [ ] **14.** O sistema deverá permitir cadastrar todas as funções e cargos desempenhados na instituição de ensino, fazendo referência à Classificação Brasileira de Ocupações (CBO). _(TR, p. 156)_
- [ ] **15.** O sistema deverá possuir tabela com o cadastro de países, estados, municípios e distritos, de acordo com o IBGE, já carregada no sistema, bastando apenas buscar essas informações nas telas de entrada para evitar duplicação de registro. _(TR, p. 156)_
- [ ] **16.** O sistema deverá possuir cadastros das tabelas auxiliares aos cadastros principais, informando os logradouros, tipos de logradouro e bairros. _(TR, p. 156)_
- [ ] **17.** O sistema deverá possuir a funcionalidade de consolidação de dados duplicados dos estudantes, profissionais escolares, disciplinas, períodos, etapas e endereços. _(TR, p. 156)_
- [ ] **18.** O sistema deverá ser dinâmico e com validações de negócio em todas as telas. _(TR, p. 156)_
- [ ] **19.** Os campos obrigatórios de cada tela do sistema deverão ficar em destaque em relação aos demais e devem obrigar o usuário a preenchê-los para conclusão do cadastro. _(TR, p. 156)_
- [ ] **20.** O sistema deverá permitir a exclusão de dados apenas se não houver dependência com outros cadastros, exibindo mensagem clara de aviso que a informação será deletada. _(TR, p. 156)_
- [ ] **21.** O sistema deverá possuir grids nas principais telas que permitam ao usuário configurar quais informações deseja selecionar para listar na tela e, posteriormente, gerar um relatório quando necessário. _(TR, p. 156)_
- [ ] **22.** O sistema deverá permitir a pesquisa nas colunas selecionadas e exibir os resultados em uma grade na tela de pesquisa, com opções de filtragem. _(TR, p. 156)_
- [ ] **23.** O sistema deverá possibilitar o cadastro de grupos de usuários com permissões de acesso para as aplicações com controle de nível de acesso, podendo ser configurado para inclusão, alteração, consulta e exclusão. _(TR, p. 156)_
- [ ] **24.** O sistema deverá restringir acesso à tela de entrada de dados de acordo com o nível de acesso de cada usuário de forma geral, sem precisar editar individualmente. _(TR, p. 156)_
- [ ] **25.** O sistema deverá permitir bloquear todos os usuários vinculados ao mesmo grupo de usuários. _(TR, p. 157)_
- [ ] **26.** O sistema deverá possibilitar o cadastro de usuários de maneira que seja possível vincular pessoas já cadastradas previamente na base de dados, sendo possível informar o nome do usuário, senha, confirmação de senha, tipo de vínculo, grupo de usuário, situação, data limite de acesso e se é um usuário máster. _(TR, p. 157)_
- [ ] **27.** O acesso ao sistema deverá ser composto de usuário e senha e, após 5 tentativas utilizando a senha errada, o usuário será bloqueado. _(TR, p. 157)_
- [ ] **28.** A senha de acesso ao sistema deverá ser criptografada, não havendo método de recuperação de senha no banco de dados, sendo necessário realizar o desbloqueio pelo usuário administrador. _(TR, p. 157)_
- [ ] **29.** O sistema deverá possibilitar a inativação automática do usuário através de uma data limite informada no cadastro de usuário. _(TR, p. 157)_
- [ ] **30.** Ao cadastrar uma senha de acesso ao sistema, deverá alertar ao usuário o nível de segurança da senha (fácil, bom ou forte). _(TR, p. 157)_
- [ ] **31.** O sistema deverá possibilitar definir quais escolas e/ou bibliotecas o usuário terá acesso. _(TR, p. 157)_
- [ ] **32.** O sistema deverá possibilitar que o administrador possa redefinir senhas dos usuários quando necessário. _(TR, p. 157)_
- [ ] **33.** O sistema deverá possuir configuração para permitir acesso ao usuário apenas nas unidades de ensino em que trabalha. _(TR, p. 157)_
- [ ] **34.** O sistema deverá possuir funcionalidade para o usuário recuperar sua senha informando CPF, data de nascimento e e-mail. _(TR, p. 157)_
- [ ] **35.** O sistema deverá permitir que o usuário altere a senha de acesso quando necessário. _(TR, p. 157)_
- [ ] **36.** O sistema deverá gerenciar logins e senhas para uso no portal do estudante, permitindo reiniciar a senha de acesso de um ou mais estudantes específicos ou de todos os estudantes juntos, quando necessário. _(TR, p. 157)_
- [ ] **37.** O sistema deverá gerenciar logins e senhas para uso no portal do professor, permitindo reiniciar a senha de acesso de um ou mais professores específicos ou de todos os professores juntos, quando necessário. _(TR, p. 157)_
- [ ] **38.** O sistema deverá estar separado por módulos, visando um melhor rendimento do aprendizado por parte dos usuários. Os módulos devem ser integrados entre si. _(TR, p. 158)_
- [ ] **39.** O sistema deverá possibilitar que o usuário mude de escola e período letivo sem a necessidade de sair do sistema, quando ele tiver acesso a mais de uma escola. _(TR, p. 158)_
- [ ] **40.** O sistema deverá gerar relatórios gráficos, possibilitando sua impressão em paisagem ou retrato, de acordo com a configuração da página gerada pelo sistema. _(TR, p. 158)_
- [ ] **41.** O sistema deverá permitir ao usuário escolher se deseja gerar o relatório ou não, caso decida alterar de tela para fazer outra atividade. _(TR, p. 158)_
- [ ] **42.** Os relatórios do sistema gerados com finalidade de impressão ou arquivamento devem ser em PDF (Portable Document Format). _(TR, p. 158)_
- [ ] **43.** O sistema deverá permitir o cadastro de legendas para identificar o modelo de relatório a ser utilizado por escola ou turma. _(TR, p. 158)_
- [ ] **44.** O sistema deverá permitir lançar informações cadastrais da secretaria de educação, incluindo sua localização, CNPJ, e a inclusão do brasão do município e a logo utilizada na atual administração. Essas imagens importadas para o sistema devem ser automaticamente exibidas nos relatórios gerados. _(TR, p. 158)_
- [ ] **45.** O sistema deverá permitir a importação dos dados de escolas, turmas, estudantes e professores do Educacenso, agilizando o processo de implantação permitir gerar o censo, sendo necessário apenas realizar a migração dos dados exportados do sistema para o Educacenso, evitando a necessidade de se trabalhar em dois sistemas distintos. _(TR, p. 158)_
- [ ] **46.** O sistema deverá permitir migrar tanto a matrícula inicial quanto a situação final dos estudantes. _(TR, p. 158)_
- [ ] **47.** O sistema deverá possuir um exportador próprio para exportar os dados para o Educacenso, adequado ao layout mais recente. _(TR, p. 158)_
- [ ] **48.** O sistema deverá permitir o cadastro de todas as unidades de ensino da rede municipal, contendo dados como nome da escola, endereço, contato, documentação da escola, responsáveis pela escola, características físicas, local de funcionamento, forma de abastecimento, dependência da escola, equipamentos, administrativo, profissionais da escola e demais dados educacionais, baseados no layout recente do Educacenso. _(TR, p. 158)_
- [ ] **49.** O sistema deverá possuir uma tela exclusiva para cadastro de gestores escolares, permitindo informar seus documentos, endereço, contato, filiação, escolaridade, cursos e se possui alguma deficiência. Caso o gestor já esteja disponível no cadastro de pessoa física do sistema, deverá ser possível buscá-lo antes do cadastro do gestor. _(TR, p. 159)_
- [ ] **50.** O sistema deverá permitir que um único gestor seja vinculado a mais de uma escola, e em cada escola deverá ser definido seu cargo, critério de acesso ao cargo/função e sua situação funcional, autorização e registro, conforme legislação vigente. _(TR, p. 159)_
- [ ] **51.** O sistema deverá permitir incluir mais de um gestor na mesma escola, definindo seu cargo, critério de acesso ao cargo/função e sua situação funcional, autorização e registro, conforme legislação vigente, quando necessário; _(TR, p. 159)_
- [ ] **52.** O sistema deverá possuir um cadastro único de situações, tipos de resultado, tipos de avaliação, tipos de observação, etapas e motivos de transferência, a fim de evitar que cada usuário cadastre uma informação diferente. _(TR, p. 159)_
- [ ] **53.** O sistema deverá permitir o cadastro de disciplinas de acordo com a nomenclatura utilizada pelo regimento escolar, sendo um cadastro único. Uma vez que a disciplina seja cadastrada em uma escola, deverá estar disponível em todas as escolas da rede. _(TR, p. 159)_
- [ ] **54.** O sistema deverá possibilitar definir a classificação para a disciplina e grupo de disciplinas, informando a identificação para o censo e tipo para cada disciplina. _(TR, p. 159)_
- [ ] **55.** O sistema deverá permitir que cada disciplina seja vinculada ao seu respectivo tipo, ao grupo de disciplinas correspondente, à identificação do censo, além de permitir a classificação e ordenação de acordo com a realidade de cada município. _(TR, p. 159)_
- [ ] **56.** O sistema deverá possuir dashboard com dados referentes às escolas da rede, sendo possível listar o total de estudantes matriculados nos últimos 5 anos, resultado geral dos estudantes no ano atual, demonstrativo dos estudantes no ano atual referente ao quantitativo de estudantes que utilizam transporte escolar, que são beneficiados pelo programa bolsa família e possui necessidade especial de toda rede de ensino; _(TR, p. 159)_
- [ ] **57.** O sistema deverá possuir um dashboard com dados referentes às escolas da rede, sendo possível listar o total de estudantes matriculados nos últimos 5 anos, o resultado geral dos estudantes no ano atual, e o demonstrativo dos estudantes no ano atual referente ao quantitativo de estudantes que utilizam transporte escolar, que são beneficiados pelo programa Bolsa Família e que possuem necessidades especiais em toda a rede de ensino. _(TR, p. 160)_
- [ ] **58.** O sistema deverá permitir a pesquisa rápida de dados de estudantes e profissionais escolares de toda a rede, a fim de identificar a qual escola e/ou turma pertencem. _(TR, p. 160)_
- [ ] **59.** O sistema deverá permitir a pesquisa rápida de dados de funcionários de toda a rede, a fim de identificar em qual escola atuam. _(TR, p. 160)_
- [ ] **60.** O sistema deverá permitir o mapeamento das escolas para realizar a rematrícula diretamente por ano letivo, sendo necessário informar a escola de origem, escola de destino e bairro. _(TR, p. 160)_
- [ ] **61.** O sistema deverá permitir o controle de autorização de novas turmas por escola e período letivo. _(TR, p. 160)_
- [ ] **62.** O sistema deverá permitir integração com o portal da transparência e atender à Lei Federal nº 14.685/2023, que acrescentou à Lei Federal nº 9.394/1996 a obrigação do poder público de divulgar a lista de espera por vagas nos estabelecimentos de educação básica na rede. _(TR, p. 160)_
- [ ] **63.** O sistema deverá permitir o acesso ao portal de serviços sem a necessidade de login quando o usuário tiver o CPF e o e-mail vinculados, controlando o acesso através do cadastro de usuário. _(TR, p. 160)_
- [ ] **64.** O sistema deverá permitir a integração e comunicação com o sistema de rastreamento através de uma API de transporte escolar, para compartilhar informações em tempo real, como horários de chegada e partida, localização dos ônibus, status das viagens, entre outros. _(TR, p. 160)_
- [ ] **65.** O sistema deverá permitir o cadastro de avisos e mensagens para um ou mais módulos, definindo a data inicial e final em que ficarão disponíveis. É possível selecionar quais escolas, profissionais escolares e estudantes receberão esses avisos e mensagens, garantindo que as informações cheguem aos destinatários corretos. _(TR, p. 160)_
- [ ] **66.** O sistema deverá possuir um serviço de ouvidoria, possibilitando tirar dúvidas, enviar sugestões, relatar defeitos e tratar de outros temas. _(TR, p. 161)_
- [ ] **67.** O sistema deverá permitir a divulgação de eventos, cursos, palestras, entre outros, com a inclusão de folder e descrição. É possível definir a data inicial e final em que essas informações aparecerão nos módulos acadêmico e portal do professor. Essa funcionalidade torna possível manter todos informados sobre as novidades e oportunidades oferecidas pela secretaria de educação. _(TR, p. 161)_
- [ ] **68.** O sistema deverá permitir a comunicação por mensagem entre estudantes, professores, equipe pedagógica e outros usuários do sistema. _(TR, p. 161)_
- [ ] **69.** O sistema deverá permitir que os usuários visualizem os avisos e mensagens que foram postados pela escola e/ou secretaria de educação. _(TR, p. 161)_
- [ ] **70.** O sistema deverá permitir gerenciar o acesso às telas de registro de frequência, conteúdo, cadastro de avaliação, resultado de avaliação, resultado das etapas, ficha descritiva e ficha de desempenho do portal do professor e nota/etapa, aulas dadas/faltas por etapa, lançamento de frequência, resultado de avaliação, conteúdo, ficha descritiva e desempenho do módulo acadêmico, onde não devem permitir nenhum tipo de alteração quando o acesso a elas estiver bloqueado pelo gestor ou pela equipe pedagógica. _(TR, p. 161)_
- [ ] **71.** O sistema deverá permitir o controle de carga horária dos profissionais escolares que participam de cursos oferecidos pela secretaria de educação. _(TR, p. 161)_
- [ ] **72.** O sistema deverá permitir que no cadastro dos profissionais que participarão dos cursos tenha a opção de incluir todos de uma vez ou incluir um ou mais profissionais específicos. _(TR, p. 161)_
- [ ] **73.** O sistema deverá permitir que no cadastro dos cursistas seja possível incluir um ou mais encontros, com a opção de filtrar os profissionais por disciplina e por etapa de ensino. _(TR, p. 161)_
### Controle Acadêmico _(p. 161)_

- [ ] **74.** O sistema deverá permitir que o acesso à informação acadêmica de cada escola seja por período letivo; _(TR, p. 161)_
- [ ] **75.** O sistema deverá exibir de forma clara o período letivo que usuário está trabalhando e escola; _(TR, p. 162)_
- [ ] **76.** O sistema deverá permitir que escola dê nome para suas salas de aulas; _(TR, p. 162)_
- [ ] **77.** O sistema deverá permitir colocar informar o comprimento e largura e a lotação máxima das salas de aulas; _(TR, p. 162)_
- [ ] **78.** O sistema deverá exibir somente os estudantes da escola logada; _(TR, p. 162)_
- [ ] **79.** O sistema deverá permitir a pesquisa de estudante, profissional escolar e funcionários antes de realizar o cadastro tornando este único no banco de dados; _(TR, p. 162)_
- [ ] **80.** O sistema deverá permitir que a escola cadastre e atualize a resolução vigente por período letivo quando necessário; _(TR, p. 162)_
- [ ] **81.** O sistema deverá permitir o cadastro do período letivo com suas respectivas configurações, que serão utilizadas para a elaboração de calendários escolares. _(TR, p. 162)_
- [ ] **82.** O sistema deverá permitir o lançamento de vários períodos letivos para um mesmo ano, possibilitando assim, a separação de todas as modalidades de ensino pertencentes ao ano, como as modalidades EJA semestrais. _(TR, p. 162)_
- [ ] **83.** O sistema deverá permitir o lançamento de um ano letivo em qualquer período de data, independente do mês. Todas as informações que são únicas e exclusivas do período escolar do estudante deverão ser vinculadas ao ano letivo que foi cadastrado; _(TR, p. 162)_
- [ ] **84.** O sistema deverá permitir configurar no período letivo se utiliza hora, a data limite para validação da matrícula do estudante, para validação da idade dos estudantes e para validação do remanejamento; _(TR, p. 162)_
- [ ] **85.** O sistema deverá permitir configurar, por período letivo, quais documentos serão exigidos no cadastro de matrícula e no cadastro do profissional escolar. _(TR, p. 162)_
- [ ] **86.** O sistema deverá permitir configurar, por período letivo, o resultado final (se a maior nota prevalece, se reprova por falta), o percentual de nota necessário para promoção e o percentual máximo de faltas. _(TR, p. 162)_
- [ ] **87.** O sistema deverá permitir configurar, por período letivo, se o resultado final anual será dividido por etapa, podendo definir como nota final do estudante a média ponderada das etapas e considerar apenas as etapas que tenham lançamento de notas para o cálculo do resultado final. _(TR, p. 162)_
- [ ] **88.** O sistema deverá permitir configurar, por período letivo, a carga horária padrão para agrupamento por disciplina e por dia letivo, e se utiliza carga horária personalizada por grupo de falta. _(TR, p. 163)_
- [ ] **89.** O sistema deverá permitir, por período letivo, realizar as configurações complementares referentes ao lançamento de notas para estudantes avaliados por PDI, liberação do campo de aulas dadas/carga horária padrão por etapa, bloqueio do campo de falta por etapa, alteração da média de avaliação, cadastro de aula de reposição e desconto de faltas abonadas apenas para estudantes reprovados por falta. _(TR, p. 163)_
- [ ] **90.** O sistema deverá permitir configurar, por período letivo, a obrigatoriedade do motivo de transferência e do município de destino no cadastro da movimentação de matrículas quando a situação é transferência. _(TR, p. 163)_
- [ ] **91.** O sistema deverá permitir configurar, por período letivo, a data de início e término da rematrícula, a obrigatoriedade do CPF para rematrícula do estudante e a liberação de lançamentos automáticos no portal do estudante. _(TR, p. 163)_
- [ ] **92.** O sistema deverá permitir configurar, por período letivo, quais telas serão liberadas no portal do estudante. _(TR, p. 163)_
- [ ] **93.** O sistema deverá possuir, por período letivo, uma aba para realizar as configurações do portal do professor. _(TR, p. 163)_
- [ ] **94.** O sistema deverá permitir configurar, por período letivo, se permite que o professor cadastre o horário para registro de conteúdo e de frequência, se permite múltiplos professores para ficha descritiva e ficha de desempenho, e se o registro de frequência será somente por dia ou por mês. _(TR, p. 163)_
- [ ] **95.** O sistema deverá permitir configurar, por período letivo, os lançamentos futuros para frequência e conteúdo. _(TR, p. 163)_
- [ ] **96.** O sistema deverá permitir configurar, por período letivo, a data limite para fechamento das turmas no portal do professor, se utiliza currículo de referência e se permite registrar o conteúdo de turma multietapa uma única vez. _(TR, p. 163)_
- [ ] **97.** O sistema deverá permitir configurar, por período letivo, que apenas disciplinas que reprovam por nota sejam listadas no cadastro de avaliação, a exibição do "compareceu" na tela de registro do resultado de avaliação e o acesso de auxiliar de turma ao portal do professor. _(TR, p. 163)_
- [ ] **98.** O sistema deverá permitir configurar, por período letivo, se utilizará o campo de nota parcial na tela de resultado de avaliação, a quantidade máxima de avaliações na etapa e se utilizará o campo de data término no cadastro de avaliação. _(TR, p. 164)_
- [ ] **99.** O sistema deverá possuir, por período letivo, uma aba de checklist de liberação do portal do professor para confirmar a atualização e configuração das telas que influenciam nos lançamentos. _(TR, p. 164)_
- [ ] **100.** O sistema deverá permitir configurar, por período letivo, o tipo de arredondamento de notas das etapas e anual entre as opções: não arredondar, arredondar para inteiro ou arredondar com uma casa decimal; se arredonda porcentagem, a quantidade de casas decimais e o separador decimal a ser utilizado. _(TR, p. 164)_
- [ ] **101.** O sistema deverá permitir configurar, por período letivo, o tipo de observação e o tipo de avaliação que serão utilizados. _(TR, p. 164)_
- [ ] **102.** O sistema deverá permitir configurar, por período letivo, a quantidade mínima de dias letivos por curso e possuir campo para registro de observação anual. _(TR, p. 164)_
- [ ] **103.** O sistema deverá permitir configurar, por período letivo, informações complementares personalizadas referentes aos dados da escola, do gestor, do secretário e do supervisor/pedagogo para serem validadas na emissão de relatórios. _(TR, p. 164)_
- [ ] **104.** O sistema deverá permitir configurar, por período letivo, se realiza progressão parcial definindo a porcentagem de nota e de faltas para aprovação na progressão, o número máximo de disciplinas que o estudante poderá fazer progressão e se permite aprovar o estudante por conselho de classe. _(TR, p. 164)_
- [ ] **105.** O sistema deverá possuir uma tela para configurar quais campos serão exibidos na tela de matrícula, determinando também se esses campos serão de preenchimento obrigatório. Além disso, essa tela possibilitará configurar permissões para alterar o grupo de falta, o grupo de conteúdo, bloquear o campo de número máximo de estudantes por turma e definir se os campos 'função na turma' e 'regime de contratação' dos professores na turma serão de preenchimento obrigatório. Ainda, deverá ser possível configurar a permissão de alteração das descrições e descrições finais das fichas descritivas/monitoramento; _(TR, p. 164)_
- [ ] **106.** O sistema deverá permitir o cadastro da matriz curricular por período letivo, por curso e escola, ou por período, sendo possível vincular uma ou mais escolas da rede, definindo a validade da matriz através da inclusão de data inicial e final. _(TR, p. 165)_
- [ ] **107.** O sistema deverá permitir o cadastro do currículo por disciplina para um ou mais períodos, sendo possível a inclusão de campo/eixo temático, classificação de objetivos, objetivo de conhecimento/conhecimento, habilidades/expectativa de aprendizagem, competências específicas/objetivos de aprendizagem, temas integradores e pré-requisitos. O currículo, uma vez cadastrado, pode ser vinculado a todas as escolas da rede conforme o período e disciplina selecionados. _(TR, p. 165)_
- [ ] **108.** O sistema deverá permitir cadastrar ou atualizar a configuração da etapa (bimestre/trimestre) com o valor e média, data inicial e final, e carga horária. _(TR, p. 165)_
- [ ] **109.** O sistema deverá permitir configurar a data inicial e final para lançamento do diagnóstico escolar e se utiliza observação do responsável nas fichas (ficha de desempenho e descritiva/monitoramento). _(TR, p. 165)_
- [ ] **110.** O sistema deverá permitir o cadastro de eventos anuais e feriados, para serem usados no cadastro e na montagem do calendário escolar, definindo uma cor para cada evento. _(TR, p. 165)_
- [ ] **111.** O sistema deverá permitir o cadastro de calendário, determinando os dias letivos e não letivos, com a opção de descartar sábados e domingos. Os feriados e eventos cadastrados no calendário terão validade somente para o ano letivo em que foram informados, não sendo visualizados em outros anos letivos. Além disso, deverá ser possível incluir informações sobre recuperação final e recuperação paralela. _(TR, p. 165)_
- [ ] **112.** O sistema deverá permitir a criação de calendários por curso, utilizando a nomenclatura específica do município e realizando a replicação entre as escolas da rede e entre os cursos da mesma escola, respeitando o início e o fim de cada período determinado pela secretaria de educação. Além disso, esses calendários podem ser visualizados pelos professores e estudantes através do portal do professor e do portal do estudante. _(TR, p. 165)_
- [ ] **113.** O sistema deverá garantir que todos os processos referentes ao lançamento de notas e faltas identifiquem, entre vários calendários escolares, qual o correspondente ao seu ano de ensino e validem as datas utilizadas para não ultrapassar as etapas, bem como os dias letivos. _(TR, p. 165)_
- [ ] **114.** O sistema deverá permitir a visualização no calendário de todos os feriados e eventos previamente cadastrados no ano letivo logado. Quando o mouse apontar para o dia de um feriado específico, o sistema deverá apresentar a descrição, sem necessidade de nenhum clique para tal ação. _(TR, p. 166)_
- [ ] **115.** O sistema deverá permitir o cadastro dos tipos de conceito que poderão ser utilizados pela escola para aplicar os processos avaliativos, informando o valor de referência, para que o conceito informado em tela seja convertido em valor. _(TR, p. 166)_
- [ ] **116.** O sistema deverá permitir cadastrar o cardápio semanal por turno, sendo possível replicar o mesmo para uma ou mais semanas do mês selecionado. _(TR, p. 166)_
- [ ] **117.** O sistema deverá permitir atualizar e/ou excluir o cardápio cadastrado quando necessário. _(TR, p. 166)_
- [ ] **118.** O sistema deverá permitir o cadastro completo de profissionais escolares, incluindo todas as exigências de ensino necessárias para a migração dos dados para o Educacenso. Serão utilizadas as regras de migração do Educacenso para avaliar os dados cadastrados. A lista das entidades de ensino e de cursos, que deverão ser selecionadas para o cadastro do profissional, quando o mesmo tiver curso superior completo ou incompleto, deverá estar atualizada com a lista do último Educacenso. O sistema a ser instalado deverá ter a opção de informar o tipo de ensino médio cursado, formação/complementação pedagógica e outros cursos. _(TR, p. 166)_
- [ ] **119.** O sistema deverá possuir recurso de envio automático de login e senha do diário eletrônico para o e-mail cadastrado dos professores. _(TR, p. 166)_
- [ ] **120.** O sistema deverá permitir anexar documentos ao cadastro do profissional escolar. _(TR, p. 166)_
- [ ] **121.** O sistema deverá permitir informar, no cadastro do profissional escolar, os documentos exigidos pela escola e se há algum tipo de deficiência. Ao replicar o período letivo, essas informações serão transferidas para o ano seguinte, possibilitando atualizações, se necessário. _(TR, p. 166)_
- [ ] **122.** O sistema deverá permitir o controle de carga horária de cursos realizados pelos profissionais escolares oferecidos pela secretaria de educação. _(TR, p. 166)_
- [ ] **123.** O sistema deverá permitir que o cadastro do profissional escolar esteja disponível quando outra escola selecionar o mesmo profissional. _(TR, p. 167)_
- [ ] **124.** O sistema deverá controlar o cadastro de funcionários das escolas para realizar o registro de ponto. _(TR, p. 167)_
- [ ] **125.** O sistema deverá permitir adicionar fotos ao cadastro de estudante, profissional escolar e funcionário. _(TR, p. 167)_
- [ ] **126.** O sistema deverá permitir configurar o horário de funcionamento da escola, através do cadastro de turnos. _(TR, p. 167)_
- [ ] **127.** O sistema deverá permitir cadastrar os turnos utilizados pelas escolas com o tipo de turno (integral ou parcial). Cada unidade escolar terá seus turnos com suas respectivas horas de início e fim. _(TR, p. 167)_
- [ ] **128.** O sistema deverá permitir o cadastro de todos os anos de ensino exigidos pelo MEC, de acordo com a base nacional comum, e na configuração do ano de ensino, informar o ano de ensino anterior, criando uma relação das etapas de ensino nas quais o estudante deverá estudar. _(TR, p. 167)_
- [ ] **129.** O sistema deverá permitir que todos os anos de ensino pertençam a uma grade do ensino fundamental, educação infantil ou EJA (Educação de Jovens e Adultos). _(TR, p. 167)_
- [ ] **130.** O sistema deverá permitir configurar as recuperações por avaliação, por etapa e por período letivo. _(TR, p. 167)_
- [ ] **131.** O sistema deverá permitir que as recuperações sejam configuradas no cadastro do ano de ensino e no calendário. O dia da recuperação deverá ser sinalizado. _(TR, p. 167)_
- [ ] **132.** O sistema deverá identificar quais anos de ensino estão configurados para recuperação, não aplicando para turmas que não participam de todas ou de determinadas recuperações. _(TR, p. 167)_
- [ ] **133.** O sistema deverá permitir o gerenciamento das turmas regulares das escolas, definindo a ordem e vinculando-as ao seu respectivo ano de ensino, com o tipo, turno, sala, quantidade mínima e máxima de vagas, total de dias letivos e carga horária, supervisor, coordenador e/ou pedagogo responsável, observação e fundamentação legal. As turmas podem ser da modalidade de ensino regular, educação especial e EJA. As turmas podem ter o tipo de atendimento como escolarização, atividade complementar ou atendimento educacional especializado (AEE) e funcionar em local diferenciado, como sala anexa, unidade prisional ou unidade de educação socioeducativa. O secretário escolar pode escolher quais disciplinas serão trabalhadas na turma conforme a matriz curricular. _(TR, p. 167)_
- [ ] **134.** O sistema deverá permitir o cadastro de turma, incluindo informações referentes ao tipo de mediação didático-pedagógica, dias da semana, estrutura curricular, unidade curricular, modalidade de escolarização, código da etapa e se é uma classe com ensino desenvolvido com libras como primeira língua, que serão migradas para o Educacenso. _(TR, p. 168)_
- [ ] **135.** O sistema deverá permitir adicionar um ou mais profissionais à turma, com função e regime de contratação, conforme a necessidade da turma. O profissional de turma não deverá ter vínculo com disciplinas, conforme as regras estabelecidas pelo Educacenso. _(TR, p. 168)_
- [ ] **136.** O sistema deverá permitir gerenciar as turmas de atividade complementar das escolas, vinculando uma ou mais Atividades Complementares regularizadas e previstas pelo MEC. As regras de importação do Educacenso serão utilizadas para análise destes dados. Deverá constar a hora inicial e final desta turma diversificada e quantas vezes esta turma será trabalhada por semana. _(TR, p. 168)_
- [ ] **137.** O sistema deverá permitir vincular um profissional escolar responsável por turmas AEE ou atividade complementar, onde este profissional deverá ser previamente cadastrado no sistema. _(TR, p. 168)_
- [ ] **138.** O sistema deverá permitir o registro de turmas multisseriadas, ligando a essas as subturmas com informações de disciplinas, professores, configuração de avaliação, turno de funcionamento, período letivo e ordenação de matrículas. _(TR, p. 168)_
- [ ] **139.** O sistema deverá permitir configurar para cada turma o tipo de agrupamento, se o lançamento de conteúdos ministrados e presenças será geral (por dia letivo), personalizado ou por disciplina. _(TR, p. 168)_
- [ ] **140.** O sistema deverá permitir configurar para cada turma o tipo de ordenação de matrículas. _(TR, p. 168)_
- [ ] **141.** O sistema deverá permitir configurar para cada turma o resultado padrão para aprovação, reprovação e reprovação por falta, a quantidade máxima de estudantes, se utiliza ficha de desempenho, ficha descritiva/monitoramento/controle de plano de estudos tutorados/diagnóstico escolar, etc. _(TR, p. 168)_
- [ ] **142.** O sistema deverá permitir vincular os professores à turma, informando a disciplina, sua função e regime de contratação. _(TR, p. 169)_
- [ ] **143.** O sistema deverá permitir incluir várias disciplinas para o mesmo professor. _(TR, p. 169)_
- [ ] **144.** O sistema deverá permitir que, ao incluir uma disciplina na turma, seja definido se a mesma reprova por nota, se utiliza conceito, se deverá aparecer no histórico e se reprova por falta. _(TR, p. 169)_
- [ ] **145.** O sistema deverá permitir que no cadastro da turma seja possível informar a carga horária anual prevista, total de aulas anuais previstas e a hora-aula. _(TR, p. 169)_
- [ ] **146.** O sistema deverá permitir funcionar simultaneamente, para uma mesma turma, avaliação por nota, avaliação por ficha descritiva e avaliação por ficha de desempenho. _(TR, p. 169)_
- [ ] **147.** O sistema deverá permitir atualizar de uma única vez todas as turmas que tenham o mesmo período, a carga horária anual, aulas previstas anuais, hora-aula, definir se a disciplina reprova por falta e bloquear o lançamento de frequência. _(TR, p. 169)_
- [ ] **148.** O sistema deverá possuir tela específica para realizar a alteração de disciplina das turmas, informando a disciplina correta, a descrição do grupo conteúdo e do grupo falta, sem perda de lançamentos já registrados. _(TR, p. 169)_
- [ ] **149.** O sistema deverá possibilitar controlar e estabelecer as vagas disponíveis para cada turma, não permitindo matricular estudantes acima da quantidade disponível de vagas. _(TR, p. 169)_
- [ ] **150.** O sistema deverá permitir o controle da documentação de estudantes e professores, permitindo à secretaria ou administração saber quais estudantes estão pendentes na entrega de documentos e quais são esses documentos. _(TR, p. 169)_
- [ ] **151.** O sistema deverá permitir configurar a exibição dos campos restrição alimentar, autorização de uso de imagem, certidão de nascimento, frequência na APAE e acompanhamento psicológico na tela de matrícula e definir se os mesmos serão de preenchimento obrigatório. _(TR, p. 169)_
- [ ] **152.** O sistema deverá permitir que o estudante tenha um único registro na rede de ensino e que esse registro seja usado em todas as suas movimentações realizadas durante o ano letivo. _(TR, p. 169)_
- [ ] **153.** O sistema deverá permitir que cada cadastro do estudante na escola tenha um código de apoio para ser usado como vínculo na escola no ano letivo corrente. _(TR, p. 170)_
- [ ] **154.** O sistema deverá permitir que o cadastro da matrícula do estudante seja feito contendo todos os dados necessários para a instituição de ensino, secretaria de educação e pelo MEC. _(TR, p. 170)_
- [ ] **155.** O sistema deverá possuir validador de dígito verificador de número do SUS. _(TR, p. 170)_
- [ ] **156.** O sistema deverá gerar o usuário de acesso ao portal do estudante pelo número do CPF do mesmo ao salvar a matrícula. _(TR, p. 170)_
- [ ] **157.** O sistema deverá bloquear a matrícula de estudantes que já estejam com matrícula ativa em outra escola no mesmo ano letivo. _(TR, p. 170)_
- [ ] **158.** O sistema deverá permitir que, ao pesquisar um estudante para matricular, caso ele já esteja cadastrado, exiba seu nome, data de nascimento, CPF e/ou filiação para conferência antes de efetuar um novo cadastro. _(TR, p. 170)_
- [ ] **159.** O sistema deverá permitir inserir o estudante em determinada turma, levando em consideração se a mesma possui vaga. _(TR, p. 170)_
- [ ] **160.** O sistema deverá permitir cadastrar a matrícula dos estudantes com nome completo e nome social, vinculando-os a um ano de ensino e seu turno, possibilitando que sejam cadastradas informações de nacionalidade, data de matrícula, identificação única, RA, documentos, se recebe Bolsa Família, dados anteriores do estudante caso tenha vindo de outra escola, contendo campo para preenchimento de informações complementares como restrição alimentar, se faz acompanhamento psicológico e demais observações necessárias para a escola. Permitir também informar a naturalidade, sexo, cor, endereço, telefone de contato, filiação, filiação adicional (filiação afetiva), se utiliza transporte escolar e se possui algum tipo de deficiência, transtorno global do desenvolvimento ou altas habilidades/superdotação conforme o último leiaute do Educacenso. _(TR, p. 170)_
- [ ] **161.** O sistema deverá permitir informar quais documentos do estudante foram apresentados no ato da matrícula e possibilitar informar mais de um responsável pelo estudante. _(TR, p. 170)_
- [ ] **162.** O sistema deverá permitir informar na matrícula do estudante, quando o mesmo utilizar transporte escolar, se utiliza passe com número, o poder público responsável pelo transporte, o tipo de veículo utilizado, a rota e o ponto/local de embarque. _(TR, p. 170)_
- [ ] **163.** O sistema deverá permitir informar na matrícula do estudante, na aba endereço, a latitude e longitude. _(TR, p. 171)_
- [ ] **164.** O sistema deverá permitir vincular, na matrícula dos estudantes aprovados parcialmente, as turmas de progressão parcial. _(TR, p. 171)_
- [ ] **165.** O sistema deverá permitir vincular, na matrícula dos estudantes, as turmas de atividade complementar e/ou atendimento educacional especializado, conforme a realidade de cada escola. _(TR, p. 171)_
- [ ] **166.** O sistema deverá permitir anexar os documentos do estudante apresentados no ato da matrícula. _(TR, p. 171)_
- [ ] **167.** O sistema deverá permitir imprimir a ficha de matrícula ao concluir a matrícula, contendo todas as informações conforme a realidade do município. _(TR, p. 171)_
- [ ] **168.** O sistema deverá conter recurso de envio automático de login e senha do portal do estudante para o e-mail cadastrado dos estudantes. _(TR, p. 171)_
- [ ] **169.** O sistema deverá permitir que se desvinculem estudantes de suas respectivas turmas, seguindo as regras de desenturmação e remanejamento. _(TR, p. 171)_
- [ ] **170.** O sistema deverá permitir que a desenturmação seja efetuada apenas quando não houver lançamentos para o estudante. _(TR, p. 171)_
- [ ] **171.** O sistema deverá permitir o controle de todas as movimentações do estudante, como transferência, evasão, remanejamento, avanço, desistência de vaga, etc., sendo possível informar a data da movimentação, o responsável, motivo da movimentação e observação. _(TR, p. 171)_
- [ ] **172.** O sistema deverá permitir que, após solicitar a transferência, sejam disponibilizados para impressão os documentos de declaração de transferência e a ficha individual do estudante, contendo suas notas, faltas parciais e histórico escolar com informações curriculares. _(TR, p. 171)_
- [ ] **173.** O sistema deverá permitir que, após efetuar a movimentação de transferência, no diário escolar o estudante seja listado como transferido, com seu devido status à frente do nome, com os dias letivos sucessores à transferência desabilitados. _(TR, p. 171)_
- [ ] **174.** O sistema deverá permitir reclassificar um estudante para o ano de ensino posterior ao que está atualmente. _(TR, p. 171)_
- [ ] **175.** O sistema deverá permitir que, após efetuar a reclassificação, no diário escolar da turma de origem, o estudante seja listado como reclassificado, com seu devido status à frente do nome, com os dias letivos sucessores à reclassificação desabilitados. _(TR, p. 172)_
- [ ] **176.** O sistema deverá permitir remanejar o estudante entre turmas do mesmo período, mantendo o histórico até antes do seu remanejamento. _(TR, p. 172)_
- [ ] **177.** Para realizar o remanejamento, o sistema deverá permitir a seleção do estudante que será movimentado e a turma de destino para a qual será remanejado. Na turma de destino, devem ser exibidas apenas as turmas que são do mesmo ano de ensino da turma de origem, com exceção da própria turma de origem. Ao selecionar um estudante, o sistema deverá exibir seu nome, data de nascimento e o nome da mãe. Para concluir a movimentação, deverá ser informada a data em que ocorreu. Após efetuar o remanejamento, todas as notas e faltas compatíveis com a turma de destino devem ser exibidas nos seus devidos lugares. Após efetuar o remanejamento, o diário escolar da turma de origem deverá exibir os estudantes remanejados com sua respectiva situação ao lado do nome, com os dias letivos subsequentes ao remanejamento visualmente desabilitados. No diário da turma de destino, os dias anteriores ao remanejamento devem ser visualmente desabilitados. _(TR, p. 172)_
- [ ] **178.** O sistema deverá permitir realizar quantos remanejamentos forem necessários para o estudante e, para cada remanejamento, deverá criar um registro exclusivo, para que seja realizado o controle correto dos remanejamentos. _(TR, p. 172)_
- [ ] **179.** O sistema deverá permitir cadastrar atestado médico, podendo definir se o atestado irá ou não abonar as faltas. _(TR, p. 172)_
- [ ] **180.** O sistema deverá permitir gerenciar os quadros de horários dos professores. _(TR, p. 172)_
- [ ] **181.** O sistema deverá permitir o cadastro de horários de turmas por agrupamento personalizado, atendendo assim às demandas de turmas com registros de frequência e conteúdo personalizados. _(TR, p. 172)_
- [ ] **182.** O sistema deverá permitir o cadastro do horário de aula das turmas normal e especial conforme a disponibilidade do professor, sendo exibido em seguida para os estudantes através de seu portal. _(TR, p. 172)_
- [ ] **183.** O sistema deverá permitir que uma turma tenha vários quadros de horários, desde que as datas de início e fim de cada quadro de horários não conflitem com os quadros de horários da mesma turma. _(TR, p. 173)_
- [ ] **184.** O sistema deverá permitir que se visualize todas as disciplinas lançadas em seus respectivos dias vinculados, na ordem da semana, de segunda a sexta, na sequência de seus horários. _(TR, p. 173)_
- [ ] **185.** O sistema deverá permitir que o quadro de horário possa ser utilizado para lançamento de frequência e demais serviços que necessitem deste, no restante do sistema, todas as disciplinas devem ser devidamente alocadas nos seus respectivos dias e horários, formando assim o quadro de horário oficial da turma. _(TR, p. 173)_
- [ ] **186.** O sistema deverá permitir que a ação de tornar o quadro de horários oficial para a turma armazene a data de início do quadro e estabeleça a data de fim do quadro de horários anterior, caso exista algum vigente. A partir deste instante, deverá utilizar este novo quadro de horários como oficial para a turma, mantendo armazenado o quadro antigo com todas as informações já registradas para ele. _(TR, p. 173)_
- [ ] **187.** O sistema deverá permitir que se registre a frequência apenas a quadros de horários finalizados, respeitando seus períodos de vigência. Quando o lançamento de frequência diária do estudante tiver a data pretérita ao limite de data do quadro oficial, o sistema deverá respeitar os períodos vigentes dos quadros de horários já criados, e registrar exatamente para o quadro ao qual pertence a frequência. _(TR, p. 173)_
- [ ] **188.** O sistema deverá permitir a visualização cronológica de todos os quadros de horários, por turma, exibindo o quadro de horário completo (dia e ordem da disciplina), com seus períodos de vigência. _(TR, p. 173)_
- [ ] **189.** O sistema deverá permitir alterar uma ou mais disciplinas do horário da turma cadastrado quando a mesma foi incluída por engano. _(TR, p. 173)_
- [ ] **190.** O sistema deverá permitir replicar o horário da turma já cadastrada ao cadastrar um novo horário para a mesma, sendo necessário informar a data inicial, a data final e alterar apenas determinadas disciplinas que sofreram alguma mudança. _(TR, p. 173)_
- [ ] **191.** O sistema deverá permitir cancelar aulas por turno/data de todas as turmas vinculadas ao turno selecionado, por turno/data de uma ou mais turmas específicas vinculadas ao turno selecionado e por turno/data de uma disciplina de uma turma específica. _(TR, p. 173)_
- [ ] **192.** O sistema deverá permitir que o cadastro dos descritores para a ficha de desempenho seja realizado apenas uma vez no sistema. Sendo possível que um descritor tenha vários subscritores e que se possa informar uma cor no cadastro da opção de desempenho. Além disso, a opção de desempenho deverá ser específica para cada escola. _(TR, p. 174)_
- [ ] **193.** O sistema deverá permitir o cadastro e montagem das fichas descritivas/monitoramento, das fichas de desempenho do estudante e de controle de plano de estudos tutorados/diagnóstico escolar. _(TR, p. 174)_
- [ ] **194.** O sistema deverá permitir a avaliação dos estudantes através de notas, conceitos, fichas descritivas/monitoramento e fichas de desempenho, sendo configurado conforme a realidade local. _(TR, p. 174)_
- [ ] **195.** O sistema deverá permitir que a ficha de desempenho seja cadastrada por turma/por disciplina/por etapa e por turma/para todas as disciplinas/por etapa. _(TR, p. 174)_
- [ ] **196.** O sistema deverá permitir configurar a utilização de respostas diferentes para cada descritor no cadastro de ficha de desempenho. _(TR, p. 174)_
- [ ] **197.** O sistema deverá permitir que os descritores da ficha de desempenho sejam ordenados para cada área de conhecimento em cada ficha que for cadastrada no ano letivo, independente da ordem original. _(TR, p. 174)_
- [ ] **198.** O sistema deverá permitir que ao cadastrar a ficha descritiva seja informado se é uma ficha de monitoramento, se a ficha utiliza perguntas, se a ficha utiliza portfólio e se o cadastro será por disciplina. _(TR, p. 174)_
- [ ] **199.** O sistema deverá permitir informar uma ou mais disciplinas para a ficha descritiva quando no campo “ficha descritiva por disciplina” for selecionada a opção “sim”. _(TR, p. 174)_
- [ ] **200.** O sistema deverá permitir que a ficha descritiva seja cadastrada por etapa, sendo possível configurar o registro de lançamentos para estudantes movimentados, se a ficha será utilizada somente para estudantes com deficiência, se exibirá campo de descrição final e de resultado e ainda permitir que seja preenchido de forma opcional o campo com o nome do professor que deverá sair no relatório. _(TR, p. 174)_
- [ ] **201.** O sistema deverá permitir que no cadastro do controle de plano de estudos tutorados/diagnóstico escolar seja informada a carga horária anual prevista, o tipo de período avaliado, se será por semana, por mês ou por etapa, se utiliza pergunta e se é um diagnóstico escolar. _(TR, p. 175)_
- [ ] **202.** O sistema deverá permitir o cadastro de um controle de plano de estudos tutorados/diagnóstico escolar para uma ou mais disciplinas, sendo necessário informar o professor responsável conforme a disciplina selecionada. _(TR, p. 175)_
- [ ] **203.** O sistema deverá possuir telas separadas para acessar os lançamentos das notas, das aulas dadas/faltas e das observações das etapas. _(TR, p. 175)_
- [ ] **204.** O sistema deverá listar na tela de lançamento de aulas dadas/faltas por etapa os estudantes na ordem do diário, trazendo consigo o número de ordem antes do nome do estudante. _(TR, p. 175)_
- [ ] **205.** O sistema deverá listar na tela de lançamento de nota por etapa os estudantes na ordem do diário, trazendo consigo o número de ordem antes do nome do estudante. _(TR, p. 175)_
- [ ] **206.** O sistema deverá listar na tela de lançamento de observação por etapa os estudantes na ordem do diário, trazendo consigo o número de ordem antes do nome do estudante. _(TR, p. 175)_
- [ ] **207.** O sistema deverá permitir que o lançamento de falta seja por grupo de falta. _(TR, p. 175)_
- [ ] **208.** O sistema deverá permitir que o lançamento de notas seja por disciplina. _(TR, p. 175)_
- [ ] **209.** O sistema deverá gerar o mapa de apuração de frequência, preenchendo automaticamente os registros de frequência dos estudantes, conforme registro da frequência. Este registro inicia a contagem da frequência do estudante a partir de sua data de admissão, ignorando os dias anteriores à sua entrada na escola. A frequência para de ser contabilizada a partir da data da movimentação, ignorando os dias posteriores à sua saída na escola. _(TR, p. 175)_
- [ ] **210.** O sistema deverá permitir o fechamento anual do ano letivo, através de uma única tela. Após os lançamentos dos dados de cada etapa. _(TR, p. 175)_
- [ ] **211.** O sistema deverá somar automaticamente as etapas, preenchendo, assim, a nota ou conceito final dos estudantes na apuração final de todas as etapas, já considerando as recuperações. _(TR, p. 175)_
- [ ] **212.** O sistema deverá permitir o registro de notas e faltas parciais de estudantes que foram matriculados no decorrer do ano letivo. _(TR, p. 175)_
- [ ] **213.** O sistema deverá exibir todas as avaliações lançadas, agrupadas por disciplina, contendo também o resultado final obtido pelos estudantes na etapa e total de faltas na etapa, fazendo um levantamento da possibilidade do estudante ser reprovado por falta. _(TR, p. 176)_
- [ ] **214.** O sistema deverá ter uma estrutura separada para geração dos históricos do ano letivo corrente. _(TR, p. 176)_
- [ ] **215.** O sistema deverá permitir o controle de notas anteriores provenientes de outras escolas e sua transcrição no histórico do estudante. _(TR, p. 176)_
- [ ] **216.** O sistema deverá permitir realizar a importação de históricos dos estudantes que concluíram o ano em outra escola da mesma rede e que foram gerados pelo sistema. _(TR, p. 176)_
- [ ] **217.** O sistema deverá apresentar os resultados finais dos estudantes. Para efetuar a apuração final, o sistema deverá permitir que se filtre os lançamentos por turma, finalizando o lançamento de cada uma separadamente. _(TR, p. 176)_
- [ ] **218.** O sistema deverá permitir transcrever os históricos de anos anteriores de forma prática e intuitiva. _(TR, p. 176)_
- [ ] **219.** O sistema deverá permitir realizar o cadastro de histórico manual para gerar o histórico de estudantes que concluíram o ensino em período letivo que não foi realizado o controle pelo sistema. _(TR, p. 176)_
- [ ] **220.** O sistema deverá permitir realizar o cadastro de ficha de matrícula manual para registrar as fichas de matrículas de estudantes de escolas extintas. _(TR, p. 176)_
- [ ] **221.** O sistema deverá permitir o fechamento automático das médias digitadas pelo professor em cada etapa, de acordo com a forma de avaliação e pontuação adotada pela escola e, no fim, a geração das atas finais. _(TR, p. 176)_
- [ ] **222.** O sistema deverá permitir o fechamento da ata manualmente registrando a apuração do resultado final e observação para cada estudante da turma quando necessário; _(TR, p. 176)_
- [ ] **223.** O sistema deverá listar na tela de ata a relação de estudantes conforme a ordem do diário; _(TR, p. 176)_
- [ ] **224.** O sistema deverá permitir que na tela de ata, após selecionar a turma, o acesso as informações referentes à apuração do resultado final dos estudantes seja individualmente e possuir um campo específico para registrar observação para cada estudante da turma, quando necessário; _(TR, p. 176)_
- [ ] **225.** O sistema deverá listar as disciplinas na ata conforme a ordem das disciplinas na aba disciplina no cadastro da turma; _(TR, p. 177)_
- [ ] **226.** O sistema deverá identificar na tela de ata os estudantes em recuperação e permitir registrar o lançamento da nota de recuperação, de nota de conselho de classe, de nota e falta personalizada para o estudante e cálculo automático do resultado final; _(TR, p. 177)_
- [ ] **227.** O sistema deverá constar na tela de ata a opção para registrar observação para cada estudante; _(TR, p. 177)_
- [ ] **228.** O sistema deverá permitir a replicação do período letivo atual tanto para o ano posterior, quanto para o ano anterior, possibilitando a replicação automática das turmas com disciplinas e profissionais escolares do ano corrente e etapa/período; _(TR, p. 177)_
- [ ] **229.** O sistema deverá realizar a rematrícula dos estudantes para o próximo período letivo levando todas as informações destes para a turma de destino; _(TR, p. 177)_
- [ ] **230.** O sistema deverá permitir que o usuário marque quais estudantes solicitaram a renovação de matrícula para o próximo ano letivo. Os estudantes podem ser marcados para renovação a qualquer momento, independente do resultado final; _(TR, p. 177)_
- [ ] **231.** O sistema deverá permitir que a equipe pedagógica realize o acompanhamento do planejamento dos professores, das avaliações por eles marcadas para as turmas, o resultado nelas obtido pelos estudantes, o acesso à frequência, e as observações registradas para os estudantes e turmas. _(TR, p. 177)_
- [ ] **232.** O sistema deverá permitir que a equipe pedagógica realize o acompanhamento das fichas descritivas, inserindo observações a serem feitas pelos professores. _(TR, p. 177)_
- [ ] **233.** O sistema deverá permitir a rematrícula dos estudantes para o próximo ano letivo de acordo com a sua situação final, determinada na apuração final. O sistema deverá analisar quais estudantes foram aprovados e renovar suas matrículas automaticamente para o próximo período, ou para o mesmo período em caso de reprovação. _(TR, p. 177)_
- [ ] **234.** O sistema deverá permitir efetuar a enturmação dos estudantes ao selecionar um período regular, onde serão exibidos todos os estudantes a serem enturmados, os já enturmados quando selecionada a ‘turma destino’ e a quantidade de vagas disponíveis na turma destino selecionada. _(TR, p. 177)_
- [ ] **235.** O sistema deverá permitir enturmar apenas os estudantes cuja matrícula seja do mesmo ano de ensino da turma escolhida. _(TR, p. 178)_
- [ ] **236.** O sistema deverá permitir que, após confirmar a enturmação, seja calculada automaticamente a quantidade de estudantes enturmados e a disponibilidade da turma. _(TR, p. 178)_
- [ ] **237.** O sistema deverá permitir realizar a desenturmação dos estudantes. _(TR, p. 178)_
- [ ] **238.** O sistema deverá permitir que a equipe pedagógica faça o controle e acompanhamento de frequência, conteúdos trabalhados, avaliações aplicadas e seus resultados, e observações acerca dos estudantes registradas pelos professores. _(TR, p. 178)_
- [ ] **239.** O sistema deverá possibilitar que a equipe pedagógica faça a liberação individual dos resultados das avaliações, material de estudo, ficha de desempenho, ficha descritiva/monitoramento, controle de plano de estudos tutorados (PET) / diagnóstico escolar, aulas dadas/faltas por etapa e notas/etapas para visualização no portal do estudante. _(TR, p. 178)_
- [ ] **240.** O sistema deverá permitir que a equipe pedagógica tenha acesso ao material de estudo disponibilizado pelos professores para os estudantes, sendo possível verificar a data e horário que os estudantes iniciaram e finalizaram a atividade, acessar as respostas dos estudantes, as observações registradas pelo professor e ainda a possibilidade de bloquear a atividade se julgar necessário. _(TR, p. 178)_
- [ ] **241.** O sistema deverá permitir que a equipe pedagógica registre observações sobre o diário de conteúdo dos professores. _(TR, p. 178)_
- [ ] **242.** O sistema deverá permitir que a equipe pedagógica registre observações diversas para os professores e que o professor tenha acesso a essas observações através do seu portal. _(TR, p. 178)_
- [ ] **243.** O sistema deverá permitir que a equipe pedagógica cadastre avaliações gerais para todas as turmas da escola, sendo necessário apenas que o professor informe a data e descrição. _(TR, p. 178)_
- [ ] **244.** O sistema deverá possibilitar o envio de SMS para o responsável do estudante nos dias que ele faltar. _(TR, p. 178)_
- [ ] **245.** O sistema deverá fornecer relatórios e gráficos para a equipe pedagógica acompanhar e analisar o desempenho de cada estudante, turma e escola a cada etapa do período letivo ou anualmente, facilitando a supervisão e orientação educacional. _(TR, p. 179)_
- [ ] **246.** O sistema deverá permitir implementar toda a documentação oficial escolar, como boletins, históricos, atas, declarações, certificados, entre outros, para simplificar processos rotineiros da secretaria. _(TR, p. 179)_
- [ ] **247.** O sistema deverá permitir a visualização de gráficos demonstrativos diretamente na tela inicial do menu gerencial e acadêmico. _(TR, p. 179)_
- [ ] **248.** O sistema deverá possuir relatórios estatísticos exibindo o número de estudantes admitidos, cancelados, aprovados, reprovados e outros dados estatísticos. _(TR, p. 179)_
- [ ] **249.** O sistema deverá permitir realizar pesquisas e gerar relatórios dinâmicos de informações de estudantes, profissionais escolares e turmas conforme a necessidade do usuário. _(TR, p. 179)_
- [ ] **250.** O sistema deverá gerar relatório de histórico escolar, sendo possível listar notas em números e conceitos, faltas em números inteiros e horas, quantidade de dias letivos e carga horária, observações padrão e específicas de cada estudante. _(TR, p. 179)_
- [ ] **251.** O sistema deverá possuir relatório de certificado de conclusão com opção por estudante e por turma. _(TR, p. 179)_
- [ ] **252.** O sistema deverá possuir relatório de ata de resultados por turma, por período e por turma multi. _(TR, p. 179)_
- [ ] **253.** O sistema deverá possuir relação de aulas previstas e dadas, por etapa e com total anual separado por disciplina. _(TR, p. 179)_
- [ ] **254.** O sistema deverá possuir um ou mais modelos de livro de matrícula por turma e por escola, com no mínimo a relação dos estudantes em ordem alfabética, data de nascimento, sexo, filiação, profissão da filiação, endereço, naturalidade, nacionalidade e cor. _(TR, p. 179)_
- [ ] **255.** O sistema deverá possuir relatório com relação de estudantes por tipo de resultado, com opção geral/por turma, geral/todas as turmas, resultado/por turma e resultado/todas as turmas. _(TR, p. 179)_
- [ ] **256.** O sistema deverá possuir relatório de fechamento de turma por etapa, com resultado das avaliações, notas, aulas dadas e faltas por etapa, notas, aulas dadas e faltas finais e recuperação final. _(TR, p. 180)_
- [ ] **257.** O sistema deverá possuir relatório de informativo do portal do estudante, com informações do portal, forma de acesso, usuário e senha de acesso. _(TR, p. 180)_
- [ ] **258.** O sistema deverá possuir boletim, com opção de emitir por estudante e por turma, por etapa/estudante e por etapa/turma. _(TR, p. 180)_
- [ ] **259.** O sistema deverá possuir relatórios de ficha individual do estudante por estudante e por turma. _(TR, p. 180)_
- [ ] **260.** O sistema deverá possuir relatório de melhores estudantes por escola e por turma. _(TR, p. 180)_
- [ ] **261.** O sistema deverá possuir relatório de ficha descritiva anual de monitoramento, ficha descritiva anual e ficha descritiva por etapa, com opção tanto por estudante quanto por turma, com ou sem deficiência. _(TR, p. 180)_
- [ ] **262.** O sistema deverá possuir relatório de ficha de desempenho por estudante/etapa, por estudante/ano, por turma/etapa e por turma/ano, sendo possível informar o professor responsável manualmente. _(TR, p. 180)_
- [ ] **263.** O sistema deverá possuir um ou mais modelos de relatório de diagnóstico de aprendizagem por turma/etapa/disciplina. _(TR, p. 180)_
- [ ] **264.** O sistema deverá possuir mais de um modelo de relatório de estudantes por turma, com opção de emitir de uma turma específica ou de todas as turmas da escola. _(TR, p. 180)_
- [ ] **265.** O sistema deverá possuir mais de um modelo de relatório de controle interno de distribuição de atividades por turma, disciplina e etapa. _(TR, p. 180)_
- [ ] **266.** O sistema deverá possuir relatório de acompanhamento de material de apoio por turma, disciplina e etapa. _(TR, p. 180)_
- [ ] **267.** O sistema deverá possuir mais de um modelo de relatório de ata por etapa, por turma e etapa. _(TR, p. 180)_
- [ ] **268.** O sistema deverá possuir mais de um modelo de relatório de ata por disciplina, por turma e disciplina. _(TR, p. 180)_
- [ ] **269.** O sistema deverá possuir relatório de ata de reunião de pais com opção por turma ou todas as turmas, sendo possível informar manualmente o título, pauta, observação e data. _(TR, p. 180)_
- [ ] **270.** O sistema deverá possuir relatório de ata de conselho de classe com todas as notas e recuperação, por turma/etapa e por turma/ano. _(TR, p. 181)_
- [ ] **271.** O sistema deverá possuir relatório de carógrafo por turma. _(TR, p. 181)_
- [ ] **272.** O sistema deverá possuir relatório de controle de somativas e avaliações por turma, etapa e disciplina. _(TR, p. 181)_
- [ ] **273.** O sistema deverá possuir relatório de diário de frequência tanto por etapa/turma/disciplina quanto por mês/turma/disciplina. _(TR, p. 181)_
- [ ] **274.** O sistema deverá possuir relatório de diário de conteúdo tanto por etapa/turma/disciplina quanto por mês/turma/disciplina. _(TR, p. 181)_
- [ ] **275.** O sistema deverá possuir relatório de diário de notas por turma/etapa, por turma/ano, por disciplina/etapa e por disciplina/ano. _(TR, p. 181)_
- [ ] **276.** O sistema deverá possuir relatório de diário de observação tanto por etapa/turma/professor quanto por mês/turma/professor. _(TR, p. 181)_
- [ ] **277.** O sistema deverá possuir relatório de diário de classe para realizar a chamada manual. _(TR, p. 181)_
- [ ] **278.** O sistema deverá possuir relatório de diário de frequência, diário de conteúdo, diário de notas e diário de observação para turmas multisseriadas e turmas do campo. _(TR, p. 181)_
- [ ] **279.** O sistema deverá possuir relatório das disciplinas por turma e por todas as turmas, com classificação da disciplina se é optativa ou obrigatória e nome de cada professor que leciona as disciplinas. _(TR, p. 181)_
- [ ] **280.** O sistema deverá possuir relatório de etiqueta de identificação de estudantes por estudante e por turma, sendo possível informar a quantidade de etiquetas em branco para pular. _(TR, p. 181)_
- [ ] **281.** O sistema deverá possuir relatório de horário por turma, sendo possível informar um horário específico. _(TR, p. 181)_
- [ ] **282.** O sistema deverá possuir relatório de movimentação de matrículas por mês, com data do último dia do mês anterior. _(TR, p. 181)_
- [ ] **283.** O sistema deverá possuir relatório de notas abaixo da média por curso. _(TR, p. 181)_
- [ ] **284.** O sistema deverá possuir relatório da pontuação restante para os estudantes atingirem a média, tanto por etapa/turma quanto por ano/turma. _(TR, p. 181)_
- [ ] **285.** O sistema deverá possuir mais de um modelo de relatório de demonstrativo de produtividade final por curso, por etapa e data limite para matrícula. _(TR, p. 181)_
- [ ] **286.** O sistema deverá possuir relatório de estudantes por conceito, tanto por disciplina/turma/etapa/conceito quanto por avaliação/turma/etapa/disciplina/conceito. _(TR, p. 182)_
- [ ] **287.** O sistema deverá possuir relatório de estudantes com atividade complementar e com atendimento educacional especializado (AEE) por escola e por turma. _(TR, p. 182)_
- [ ] **288.** O sistema deverá possuir relatório de questionário de atividades por turma/disciplina/data inicial/data final/questionário. _(TR, p. 182)_
- [ ] **289.** O sistema deverá possuir mais de um modelo de relatório de controle de plano de estudos tutorado (PET) por turma/controle de plano de estudos tutorado (PET) / diagnóstico escolar. _(TR, p. 182)_
- [ ] **290.** O sistema deverá possuir relatório de agrupamento de conteúdo e falta por escola e por turma. _(TR, p. 182)_
- [ ] **291.** O sistema deverá possuir relação de documentos não entregues pelos estudantes, por escola, separada por turma, com nome do estudante e documentos que não foram entregues. _(TR, p. 182)_
- [ ] **292.** O sistema deverá possuir relação de documentos não entregues pelos profissionais escolares, por escola, separada com o nome do profissional e documentos que não foram entregues. _(TR, p. 182)_
- [ ] **293.** O sistema deverá possuir relatório de movimentação do portal do professor por turma e etapa. _(TR, p. 182)_
- [ ] **294.** O sistema deverá possuir relatório de horário escolar por turno. _(TR, p. 182)_
- [ ] **295.** O sistema deverá possuir relatório de quantidade de vagas por curso. _(TR, p. 182)_
- [ ] **296.** O sistema deverá possuir mais de um modelo de relatório de idade dos estudantes, informando a idade e data de corte, sendo possível informar a turma. _(TR, p. 182)_
- [ ] **297.** O sistema deverá possuir relatório de estudantes com restrição alimentar por turma e de todas as turmas. _(TR, p. 182)_
- [ ] **298.** O sistema deverá possuir relatório de estudantes com irmãos na escola. _(TR, p. 182)_
- [ ] **299.** O sistema deverá possuir relatório de ficha de matrícula por estudante e por turma, sendo possível gerar em branco quando necessário. _(TR, p. 182)_
- [ ] **300.** O sistema deverá possuir relatório de frequência para Bolsa Família dos anos iniciais e finais por turma, por escola e por mês. _(TR, p. 182)_
- [ ] **301.** O sistema deverá possuir relatório de carteirinha de estudante por turma e por estudante. _(TR, p. 183)_
- [ ] **302.** O sistema deverá possuir relatório de declaração de atualização de carteira de vacinação. _(TR, p. 183)_
- [ ] **303.** O sistema deverá possuir relatório de declaração de autorização de acompanhamento psicológico. _(TR, p. 183)_
- [ ] **304.** O sistema deverá possuir relatório de declaração de autorização de campanha de vacinação. _(TR, p. 183)_
- [ ] **305.** O sistema deverá possuir relatório de declaração de autorização para intervenção da equipe multifuncional. _(TR, p. 183)_
- [ ] **306.** O sistema deverá possuir relatório de declaração de comprovante de entrega de atividade por turma e por estudante. _(TR, p. 183)_
- [ ] **307.** O sistema deverá possuir relatório de declaração de comprovante de vaga, comprovante de turma com vaga. _(TR, p. 183)_
- [ ] **308.** O sistema deverá possuir relatório de declaração de conclusão por turma e por estudante. _(TR, p. 183)_
- [ ] **309.** O sistema deverá possuir relatório de declaração de conclusão com notas por turma e por estudante. _(TR, p. 183)_
- [ ] **310.** O sistema deverá possuir relatório de declaração de desistência de vaga. _(TR, p. 183)_
- [ ] **311.** O sistema deverá possuir relatório de declaração de estudante que não se enquadra no transporte escolar. _(TR, p. 183)_
- [ ] **312.** O sistema deverá possuir relatório de ficha de comunicação de estudante infrequente. _(TR, p. 183)_
- [ ] **313.** O sistema deverá possuir relatório de frequência para o Bolsa Família. _(TR, p. 183)_
- [ ] **314.** O sistema deverá possuir relatório de declaração genérica. _(TR, p. 183)_
- [ ] **315.** O sistema deverá possuir relatório de declaração de guarda legal em tramitação. _(TR, p. 183)_
- [ ] **316.** O sistema deverá possuir relatório de declaração de guarda legal não iniciada. _(TR, p. 183)_
- [ ] **317.** O sistema deverá possuir relatório de declaração de matrícula por turma e por estudante. _(TR, p. 183)_
- [ ] **318.** O sistema deverá possuir relatório de declaração de presença em reunião. _(TR, p. 183)_
- [ ] **319.** O sistema deverá possuir relatório de declaração de representante não legal. _(TR, p. 183)_
- [ ] **320.** O sistema deverá possuir relatório de declaração de retirada de criança. _(TR, p. 184)_
- [ ] **321.** O sistema deverá possuir relatório de declaração de solicitação de prématrícula por turma e por estudante. _(TR, p. 184)_
- [ ] **322.** O sistema deverá possuir relatório de termo de dispensa. _(TR, p. 184)_
- [ ] **323.** O sistema deverá possuir relatório de termo de compromisso com o transporte escolar. _(TR, p. 184)_
- [ ] **324.** O sistema deverá possuir relatório de termo de compromisso de falta de documentos. _(TR, p. 184)_
- [ ] **325.** O sistema deverá possuir relatório de termo de imagem e consentimento por turma e por estudante. _(TR, p. 184)_
- [ ] **326.** O sistema deverá possuir relatório de termo de responsabilidade com o transporte escolar. _(TR, p. 184)_
- [ ] **327.** O sistema deverá possuir relatório de termo de matrícula no AEE. _(TR, p. 184)_
- [ ] **328.** O sistema deverá possuir relatório de declaração de transferência. _(TR, p. 184)_
- [ ] **329.** O sistema deverá possuir relatório de declaração de transferência com notas. _(TR, p. 184)_
- [ ] **330.** O sistema deverá possuir relatório de horário para um professor específico. _(TR, p. 184)_
- [ ] **331.** O sistema deverá possuir mais de um modelo de relatório de faltas diárias por turma, informando o período da frequência. _(TR, p. 184)_
- [ ] **332.** O sistema deverá possuir mais de um modelo de relatório de listagem de estudantes, informando se a turma é normal ou multisseriada. _(TR, p. 184)_
- [ ] **333.** O sistema deverá possuir as declarações de conclusão e conclusão com notas tanto por estudante quanto por turma. _(TR, p. 184)_
- [ ] **334.** O sistema deverá possuir as declarações de função, com opção de informar profissional escolar ou funcionário e responsável que vai assinar o documento. _(TR, p. 184)_
- [ ] **335.** O sistema deverá possuir as declarações de exercício, com opção de informar profissional escolar ou funcionário e responsável que vai assinar o documento. _(TR, p. 184)_
- [ ] **336.** O sistema deverá possuir a ficha funcional do profissional escolar e funcionário. _(TR, p. 184)_
- [ ] **337.** O sistema deverá possuir relatório de aniversariantes dos estudantes por turma e do profissional escolar/funcionário. _(TR, p. 184)_
- [ ] **338.** O sistema deverá possuir relatório de frequência do profissional escolar e funcionário por data. _(TR, p. 184)_
- [ ] **339.** O sistema deverá possuir relatório de identificação do profissional escolar e funcionário. _(TR, p. 185)_
- [ ] **340.** O sistema deverá possuir relatório de observação do estudante tanto por turma quanto por estudante e ainda de todas as turmas. _(TR, p. 185)_
- [ ] **341.** O sistema deverá possuir relatório de observação do professor por turma e professor. _(TR, p. 185)_
- [ ] **342.** O sistema deverá possuir gráfico de carga horária por turma. _(TR, p. 185)_
- [ ] **343.** O sistema deverá possuir gráfico de estudantes com deficiência. _(TR, p. 185)_
- [ ] **344.** O sistema deverá possuir gráfico por período e por escola da situação, do resultado e do resultado por disciplina dos estudantes. _(TR, p. 185)_
- [ ] **345.** O sistema deverá possuir gráfico dos estudantes que utilizam transporte escolar. _(TR, p. 185)_
- [ ] **346.** O sistema deverá possuir gráfico comparativo estudante x turma em colunas, por etapa, por etapa/disciplina, anual e anual/disciplina, com opção por estudante e todos. _(TR, p. 185)_
- [ ] **347.** O sistema deverá possuir gráfico com quantidade de estudantes acima da média, abaixo da média, e acima e abaixo da média por turma/etapa, período/etapa e disciplina/etapa. _(TR, p. 185)_
- [ ] **348.** O sistema deverá possuir gráfico de defasagem e de idade certa por período. _(TR, p. 185)_
- [ ] **349.** O sistema deverá possuir as fichas preenchidas e em branco das informações do censo de estudante, professor e escola. _(TR, p. 185)_
- [ ] **350.** O sistema deverá possuir relatório de controle de carga horária de cursos/encontros que os professores participaram. _(TR, p. 185)_
- [ ] **351.** O sistema deverá possuir relatório de declaração de curso/encontros que os professores participaram. _(TR, p. 185)_
- [ ] **352.** O sistema deverá possuir certificado de cursos/encontros que os professores participaram. _(TR, p. 185)_
- [ ] **353.** O sistema deverá permitir exportar matrículas com opção geral/período letivo/mês e frequência/período letivo/mês com extensão .txt. _(TR, p. 185)_
- [ ] **354.** O sistema deverá possuir relatório de estudantes movimentados de uma e de todas as escolas por período letivo com todas as situações e por período letivo/situação. _(TR, p. 185)_
- [ ] **355.** O sistema deverá possuir relatório de estudantes com deficiência de uma e de todas as escolas por período letivo, sendo possível filtrar por curso e localização/zona de residência. _(TR, p. 186)_
- [ ] **356.** O sistema deverá possuir relatório de estudantes beneficiados pelo Bolsa Família de uma e de todas as instituições de ensino por período letivo, com opção de situação normal e situação de evasão. _(TR, p. 186)_
- [ ] **357.** O sistema deverá possuir mais de um modelo de relatório de estudantes não rematriculados de uma e de todas as escolas por período letivo, sendo possível filtrar por curso e localização/zona de residência. _(TR, p. 186)_
- [ ] **358.** O sistema deverá possuir relatório de estudantes que utilizam transporte de uma e de todas as escolas por período letivo, com opção de situação normal e transferido, e planilha. _(TR, p. 186)_
- [ ] **359.** O sistema deverá possuir planilha de estudantes que utilizam transporte de uma e de todas as escolas, informando a data inicial e final da matrícula. _(TR, p. 186)_
- [ ] **360.** O sistema deverá possuir mais de um modelo de relatório de responsáveis pelos estudantes de uma e de todas as escolas por período letivo. _(TR, p. 186)_
- [ ] **361.** O sistema deverá possuir mais de um modelo de relatório de histórico manual, sendo possível informar a data de impressão e até 2 responsáveis por assinar o documento. _(TR, p. 186)_
- [ ] **362.** O sistema deverá possuir relatório de ficha de matrícula manual. _(TR, p. 186)_
- [ ] **363.** O sistema deverá possuir relatório de estudantes por bairro, sendo possível filtrar por um ou mais bairros e por um ou mais períodos de ensino. _(TR, p. 186)_
- [ ] **364.** O sistema deverá possuir relatório de estudantes com e sem autorização de uso de imagem de uma e de todas as escolas por período letivo. _(TR, p. 186)_
- [ ] **365.** O sistema deverá possuir gráfico de estudantes por turma e por período de uma e de todas as escolas por período letivo. _(TR, p. 186)_
- [ ] **366.** O sistema deverá possuir gráfico com quantidade de estudantes acima da média ou abaixo da média de uma e de todas as escolas por etapa/período letivo. _(TR, p. 186)_
- [ ] **367.** O sistema deverá possuir gráfico de uma e de todas as escolas com demonstrativo de matrículas, de resultado final, por sexo, de utilização do transporte escolar, de beneficiados pelo Bolsa Família, de estudantes com deficiência e por localização de residência, informando período letivo inicial e final. _(TR, p. 186)_
- [ ] **368.** O sistema deverá possuir gráfico de estudantes com deficiência por curso/período letivo. _(TR, p. 187)_
- [ ] **369.** O sistema deverá possuir gráfico de resultados finais de uma e de todas as escolas por curso/período letivo. _(TR, p. 187)_
- [ ] **370.** O sistema deverá possuir mais de um modelo de relatório com a relação de docentes de uma e de todas as escolas por período letivo. _(TR, p. 187)_
- [ ] **371.** O sistema deverá possuir relatório de plano de carreira dos professores por período letivo. _(TR, p. 187)_
- [ ] **372.** O sistema deverá possuir relatório de horários dos professores por período letivo. _(TR, p. 187)_
- [ ] **373.** O sistema deverá possuir mais de um modelo de relatório com a relação de docentes com curso superior, de uma e de todas as escolas, por período letivo. _(TR, p. 187)_
- [ ] **374.** O sistema deverá possuir mais de um modelo de relatório com a relação de docentes atuantes por grade, por período letivo, sendo possível informar o curso, uma ou mais escolas, um ou mais períodos, uma ou mais disciplinas e turno. _(TR, p. 187)_
- [ ] **375.** O sistema deverá possuir mais de um modelo de indicador escolar, por período, de uma e de todas as escolas, informando a data inicial e final. _(TR, p. 187)_
- [ ] **376.** O sistema deverá possuir mais de um modelo de indicador escolar, de uma e de todas as escolas, por período letivo, sendo possível informar o mês. _(TR, p. 187)_
- [ ] **377.** O sistema deverá possuir mais de um modelo de indicador escolar com dados do censo por período letivo. _(TR, p. 187)_
- [ ] **378.** O sistema deverá possuir mais de um modelo de relatório de movimentação anual, de uma e de todas as escolas, informando o ano letivo inicial e final. _(TR, p. 187)_
- [ ] **379.** O sistema deverá possuir mais de um modelo de relatório de movimentação dos estudantes e profissionais escolares, de uma e de todas as escolas, por período letivo. _(TR, p. 187)_
- [ ] **380.** O sistema deverá possuir relatório com a relação de idade dos estudantes, de uma e de todas as escolas, por período letivo, informando a data inicial e final, e com a opção de acima da idade informada, abaixo da idade informada e entre idades. _(TR, p. 187)_
- [ ] **381.** O sistema deverá possuir mais de um modelo de relatório com o total de estudantes por escola, curso e período/turma, por período letivo, sendo possível informar a localização/zona de residência. _(TR, p. 188)_
- [ ] **382.** O sistema deverá possuir mais de um modelo de relatório com o total de vagas por escola, por período letivo, sendo possível informar o curso, a localização/zona de residência e o turno. _(TR, p. 188)_
- [ ] **383.** O sistema deverá possuir mais de um modelo de relatório de transporte geral, de uma e de todas as escolas, por período letivo. _(TR, p. 188)_
- [ ] **384.** O sistema deverá possuir relatório de quadro diagnóstico, de uma e de todas as escolas, por período letivo. _(TR, p. 188)_
- [ ] **385.** O sistema deverá possuir relatório com a relação de auxiliares da rede, de uma e de todas as escolas, por período letivo. _(TR, p. 188)_
- [ ] **386.** O sistema deverá possuir relatório com a relação de profissionais escolares em turmas de atendimento educacional especializado, de uma e de todas as escolas, por período letivo. _(TR, p. 188)_
- [ ] **387.** O sistema deverá possuir mais de um modelo de relatório de material de estudo cadastrado por período letivo, sendo possível informar o mês. _(TR, p. 188)_
- [ ] **388.** O sistema deverá possuir relatório com a relação de estudantes por escola, por tipo de resultado/etapa do censo, de uma e de todas as escolas, por período letivo, sendo possível informar o código da etapa. _(TR, p. 188)_
- [ ] **389.** O sistema deverá possuir listagem e gráfico de diagnóstico de aprendizagem por período letivo, código da etapa, disciplina e etapa, sendo possível informar uma ou mais escolas. _(TR, p. 188)_
- [ ] **390.** O sistema deverá possuir relatório de distorção de idade por ano, de uma e de todas as escolas, por período letivo. _(TR, p. 188)_
- [ ] **391.** O sistema deverá possuir relatório de disciplina por escola, por período letivo, de uma e de todas as escolas, sendo possível incluir uma ou mais disciplinas. _(TR, p. 188)_
- [ ] **392.** O sistema deverá possuir relatório de estudantes com restrição alimentar, de uma e de todas as escolas, por período letivo, sendo possível informar o curso e a localização/zona de residência. _(TR, p. 188)_
- [ ] **393.** O sistema deverá possuir relatório de produtividade final por curso, por período letivo e data para validação da matrícula, sendo possível informar uma ou mais escolas. _(TR, p. 188)_
- [ ] **394.** O sistema deverá possuir mais de um modelo de relatório de folha de ponto, de uma e de todas as escolas, com opção docente e funcionário, por categoria, fonte de pagamento, período letivo e mês. _(TR, p. 189)_
- [ ] **395.** O sistema deverá possuir relatório com a quantidade de professores, de uma e de todas as escolas, por período letivo. _(TR, p. 189)_
- [ ] **396.** O sistema deverá possuir relatório com a quantidade de funcionários, de uma e de todas as escolas, por período letivo. _(TR, p. 189)_
- [ ] **397.** O sistema deverá possuir mais de um modelo de relatório de estudantes por etapa do censo, por período letivo, sendo possível informar o curso. _(TR, p. 189)_
- [ ] **398.** O sistema deverá possuir relatório de estudantes sem código da identificação única do censo, de uma e de todas as escolas, por período letivo, sendo possível informar o curso e a localização/zona de residência. _(TR, p. 189)_
- [ ] **399.** O sistema deverá possuir relatório de professores sem código da identificação única do censo, de uma e de todas as escolas, por período letivo. _(TR, p. 189)_
- [ ] **400.** O sistema deverá possuir relatório de estudantes exportados e não exportados para o Educacenso, de uma e de todas as escolas, por período letivo. _(TR, p. 189)_
- [ ] **401.** O sistema deverá possuir relatório de informações de turmas para o censo, de uma e de todas as escolas, por período letivo. _(TR, p. 189)_
- [ ] **402.** O sistema deverá possuir relatório de quantitativo de etapas do censo por período letivo. _(TR, p. 189)_
- [ ] **403.** O sistema deverá possuir relatório de ficha do censo escolar, de uma e de todas as escolas, por período letivo, preenchido e em branco. Pré matrícula _(TR, p. 189)_
- [ ] **404.** O sistema deverá permitir a gestão do processo de pré-matrícula, possibilitando o controle de vagas de cada escola da rede. _(TR, p. 189)_
- [ ] **405.** O sistema deverá permitir que o processo de pré-matrícula seja realizado por ordem simples, por critérios ou por pontuação. _(TR, p. 189)_
- [ ] **406.** O sistema deverá permitir a alocação automática dos estudantes nas escolas da rede de acordo com critérios preestabelecidos, como por exemplo, ter irmão(s) estudando na mesma escola, ser residente do bairro onde a escola está localizada, possuir necessidades especiais, estar em lista de espera, entre outros critérios. Isso facilita o processo de novas matrículas nas instituições de ensino. _(TR, p. 189)_
- [ ] **407.** O sistema deverá permitir a alocação automática dos estudantes nas escolas da rede conforme a pontuação obtida no questionário socioeconômico, facilitando assim o processo de novas matrículas nas instituições de ensino. _(TR, p. 190)_
- [ ] **408.** O sistema deverá permitir realizar o cadastro da lista de espera por vaga através de critérios definidos ou cadastro socioeconômico. _(TR, p. 190)_
- [ ] **409.** O sistema deverá permitir a inclusão de bairros e escolas que participaram em um processo de pré-matrícula, e posteriormente realizar um mapeamento para determinar quais escolas atenderão a quais bairros. _(TR, p. 190)_
- [ ] **410.** O sistema deverá permitir a definição no cadastro do processo de prématrícula se o tipo de processo será para educação infantil ou para ensino fundamental, o período de inscrição, se a alocação será realizada pelos turnos das escolas, se permitirá a repetição de escolas no cadastro, se permitirá apenas a inclusão das escolas que atendem ao bairro do candidato, se usará justificativa para a escolha das escolas do candidato, se usará o cadastro de irmão na escolha da escola e o mínimo e máximo de escolas permitidas para o candidato. _(TR, p. 190)_
- [ ] **411.** O sistema deverá permitir a solicitação de vaga e acompanhamento do processo através do Portal do Responsável. _(TR, p. 190)_
- [ ] **412.** O sistema deverá permitir realizar o cancelamento ou alteração da inscrição através do Portal do Responsável. _(TR, p. 190)_
- [ ] **413.** O sistema deverá permitir realizar alocação manual de candidatos que não conseguiram vaga nas escolas que pretendiam. _(TR, p. 190)_
- [ ] **414.** O sistema deverá permitir desalocar candidatos quando necessário. _(TR, p. 190)_
- [ ] **415.** O sistema deverá possibilitar o recebimento do protocolo de inscrição e confirmação de vaga através do envio de SMS e e-mail. _(TR, p. 190)_
- [ ] **416.** O sistema deverá permitir que seja feito o cancelamento de escola, informando a justificativa. _(TR, p. 190)_
- [ ] **417.** O sistema deverá possuir tela para controle dos candidatos não alocados que faz a comunicação com o responsável quando surge vaga via SMS e e-mail. _(TR, p. 190)_
- [ ] **418.** O sistema deverá controlar, através dos grupos de usuários, qual o grupo que pode realizar a comunicação com o responsável pelo candidato na tela de efetivar pré-matrícula. _(TR, p. 190)_
- [ ] **419.** O sistema deverá controlar, através do cadastro do processo, se utiliza a data base de validação de idade no cadastro de reserva. _(TR, p. 191)_
- [ ] **420.** O sistema deverá permitir que, na tela de candidato, seja possível visualizar a coluna com a pontuação do candidato e que a ordenação dessa coluna seja sempre pela maior pontuação obtida entre as opções de escolas. _(TR, p. 191)_
- [ ] **421.** O sistema deverá permitir que, através do cadastro do processo de prématrícula, faça o bloqueio de matrículas manuais onde só deverão ser bloqueadas as matrículas manuais da etapa censo da turma que esteja selecionada no processo de pré-matrícula. _(TR, p. 191)_
- [ ] **422.** O sistema deverá permitir alterar um mapeamento cadastrado anteriormente quando necessário. _(TR, p. 191)_
- [ ] **423.** O sistema deverá permitir alterar o cadastro do candidato durante o período de inscrição apenas na tela de inscrição do portal de pré-matrícula. _(TR, p. 191)_
- [ ] **424.** O sistema deverá possuir tela de listagem de candidatos para exibir os candidatos após a alocação, com o objetivo de funcionar de forma análoga à tela de convocação da lista de espera. Nela serão listados todos os candidatos alocados que ainda não tenham efetuado a matrícula e terá as mesmas opções da listagem de pré-matrícula. _(TR, p. 191)_
- [ ] **425.** O sistema deverá possuir, na tela de lista de espera, colunas para realizar, quando necessário, filtros de pesquisa do nome do processo, identificador, critérios para ordenação, escola, pontuação, período, nome do estudante, CPF, idade, data de nascimento, bairro, se o estudante tem necessidade especial, nome e CPF do irmão, responsável, contato, data inicial e final mais a hora do registro da inscrição. _(TR, p. 191)_
- [ ] **426.** O sistema deverá possuir, na tela de cadastro do candidato, colunas para realizar, quando necessário, filtros de pesquisa da situação, justificativa do cancelamento, usuário que realizou o cancelamento, data do cancelamento, nome do processo, nome do estudante, CPF, idade, data de nascimento, bairro, contato, escola, pontuação, se o estudante tem necessidade especial, nome e CPF do irmão, se tem irmão gêmeo, nome e contato do responsável, período, turma e turno alocado, data e hora do registro, data e hora da convocação e informações da matrícula deletada (data da exclusão, turma, escola e período letivo). _(TR, p. 191)_
- [ ] **427.** O sistema deverá permitir que a tela de cancelamento de inscrição do candidato liste processos de chamada pública fora da data vigente. _(TR, p. 192)_
- [ ] **428.** O sistema deverá permitir que somente candidatos com situação de inscrito tenham o cancelamento realizado. _(TR, p. 192)_
- [ ] **429.** O sistema deverá permitir registrar anotações diversas dos candidatos. _(TR, p. 192)_
- [ ] **430.** O sistema deverá listar, na tela de anotações do candidato, todas as anotações, inclusive de processos já finalizados. _(TR, p. 192)_
- [ ] **431.** O sistema deverá permitir verificar o histórico de alocação de candidatos por candidato, por escola e/ou turma. _(TR, p. 192)_
- [ ] **432.** O sistema deverá permitir gerar uma nova senha de acesso do Portal do Responsável quando for solicitado. _(TR, p. 192)_
- [ ] **433.** O sistema deverá permitir que o responsável, através do portal, acesse a listagem de vagas por escola. _(TR, p. 192)_
- [ ] **434.** O sistema deverá permitir que o responsável altere sua senha quando necessário. _(TR, p. 192)_
- [ ] **435.** O sistema deverá permitir que o responsável altere seus dados quando necessário. _(TR, p. 192)_
- [ ] **436.** O sistema deverá permitir atualizar o e-mail e telefone de contato do responsável quando necessário. _(TR, p. 192)_
- [ ] **437.** O sistema deverá possuir relatório que lista os candidatos com inscrições duplicadas e os estudantes inscritos com matrícula para o ano seguinte. _(TR, p. 192)_
- [ ] **438.** O sistema deverá possuir um relatório simples com a lista de espera por vaga para cada período letivo. _(TR, p. 192)_
- [ ] **439.** O sistema deverá possuir um relatório com a lista de espera dos candidatos, que pode ser geral/nominal, geral/sintética, por idade/nominal, por idade/sintética, por bairro/nominal, por bairro/sintética, por escola/nominal, por escola/sintética, uma listagem simples e uma listagem dos que não compareceram/escola. _(TR, p. 192)_
- [ ] **440.** O sistema deverá possuir relatório de comprovante de inscrição e convocação do candidato. _(TR, p. 192)_
- [ ] **441.** O sistema deverá possuir mais de um modelo de relatório com a relação de candidatos alocados por processo, podendo gerar para uma ou mais escolas e sendo possível filtrar por data inicial e final de convocação. _(TR, p. 192)_
- [ ] **442.** O sistema deverá possuir um relatório de candidatos não alocados por processo, que pode ser gerado para uma ou mais escolas. Será possível filtrar a ordem por período, pontuação ou cadastro, com a opção de gerar a listagem de forma geral ou por idade. Também é possível filtrar a relação de candidatos que estão fora da rede ou em processo de transferência. _(TR, p. 193)_
- [ ] **443.** O sistema deverá possuir modelos de relatório com a quantidade de vagas por período letivo e a demanda por período, bem como o total de vagas, possibilitando filtrar por curso, por localização/zona de residência, por turno e por data inicial e final. É possível gerar um relatório para uma escola específica ou para todas as escolas da rede por período letivo. _(TR, p. 193)_
- [ ] **444.** O sistema deverá possuir um relatório do indicador de pré-matrícula, com a possibilidade de filtrar por um ou mais bairros, uma ou mais escolas, por um ou mais períodos, por idade e tipo de vínculo. _(TR, p. 193)_
- [ ] **445.** O sistema deverá possuir mais de um modelo de relatório com a relação de candidatos por processo, sendo possível filtrar por uma ou mais escolas, pela opção de escola e pelo tipo nominal e numeral. _(TR, p. 193)_
- [ ] **446.** O sistema deverá possuir botão de ajuda nas telas do módulo pré matrícula; _(TR, p. 193)_
- [ ] **447.** O sistema deverá possuir botão de ajuda na tela de inscrição do portal do responsável; _(TR, p. 193)_
- [ ] **448.** O sistema deverá possuir integração com VLibras proporcionando acessibilidade, permitindo que indivíduos surdos compreendam informações em seu próprio idioma, o que contribui para a promoção da inclusão digital; _(TR, p. 193)_
- [ ] **449.** O sistema deverá permitir gerar relatórios através dos grids dinâmicos das principais telas de cadastros do módulo pré matrícula; _(TR, p. 193)_
### Portal do Professor _(p. 193)_

- [ ] **450.** O sistema deverá ser acessível através de tablets, iPads e celulares usando um navegador responsivo. _(TR, p. 193)_
- [ ] **451.** O sistema deverá permitir que o acesso ao portal do professor seja definido pelo módulo acadêmico, e o acesso deverá ser independente do módulo acadêmico. _(TR, p. 193)_
- [ ] **452.** O sistema deverá permitir que a liberação dos menus do portal do professor seja realizada pelo módulo acadêmico, possibilitando a personalização da liberação das telas de acordo com a realidade de cada professor. _(TR, p. 194)_
- [ ] **453.** O sistema deverá permitir que as telas de acesso do portal do professor sejam individuais por período letivo e para cada escola em que ele trabalhe. _(TR, p. 194)_
- [ ] **454.** O sistema deverá permitir a liberação das telas de acesso para um ou mais professores, desde que eles tenham as mesmas telas de acesso liberadas. _(TR, p. 194)_
- [ ] **455.** O sistema deverá permitir que o acesso ao portal do professor seja por escola e período letivo. _(TR, p. 194)_
- [ ] **456.** O sistema deverá exibir informações da escola e do ano letivo selecionado a todo momento em que o professor estiver acessando o sistema. _(TR, p. 194)_
- [ ] **457.** O sistema deverá possuir telas objetivas, sendo o mais parecido possível com um diário impresso. _(TR, p. 194)_
- [ ] **458.** O sistema deverá permitir o acesso ao calendário de acordo com o curso que o professor leciona. Se lecionar em dois ou mais cursos, deverá possibilitar alternar entre estes para ter acesso ao calendário exclusivo de cada curso. _(TR, p. 194)_
- [ ] **459.** O sistema deverá permitir que o professor registre sua agenda diária e libere o acesso da mesma para o portal do estudante quando necessário. _(TR, p. 194)_
- [ ] **460.** O sistema deverá fornecer acesso ao regimento interno da escola. _(TR, p. 194)_
- [ ] **461.** O sistema deverá permitir que o professor visualize a matriz curricular vinculada à turma que ele leciona. _(TR, p. 194)_
- [ ] **462.** O sistema deverá permitir que o professor cadastre assuntos e questões que posteriormente serão associadas aos questionários do material de estudo que será disponibilizado para os estudantes. _(TR, p. 194)_
- [ ] **463.** O sistema deverá permitir adicionar material de apoio para os estudantes. _(TR, p. 194)_
- [ ] **464.** O sistema deverá permitir que o professor anexe arquivos por turma/disciplina e que estes possam ser visualizados e baixados pelos estudantes, em seu portal, para complementação de estudo. _(TR, p. 194)_
- [ ] **465.** O sistema deverá permitir que o professor cadastre atividades com questões discursivas ou de múltipla escolha dentro do próprio sistema, para que sejam disponibilizadas através do Portal do Estudante. _(TR, p. 194)_
- [ ] **466.** O sistema deverá permitir replicar as atividades cadastradas para outras turmas, desde que seja do mesmo período. _(TR, p. 194)_
- [ ] **467.** O sistema deverá permitir que o professor cadastre atividades para todos os estudantes da turma e, quando necessário, seja possível o cadastro para um ou mais estudantes específicos. _(TR, p. 195)_
- [ ] **468.** O sistema deverá permitir que o professor registre observações das atividades disponibilizadas através do Portal do Estudante. _(TR, p. 195)_
- [ ] **469.** O sistema deverá permitir que o professor acompanhe as atividades disponibilizadas para os estudantes, sendo possível visualizar o tempo gasto, a data e hora que iniciaram e finalizaram. _(TR, p. 195)_
- [ ] **470.** O sistema deverá permitir que o professor registre os conteúdos de suas aulas através do próprio portal e que a equipe pedagógica da escola possa acompanhar esse planejamento através do sistema acadêmico. _(TR, p. 195)_
- [ ] **471.** O sistema deverá permitir que o professor registre o planejamento de suas aulas através do portal. Isso inclui a seleção da turma, disciplina, etapa, datas inicial e final, tema, subtema, objetivos de conhecimento e observações. _(TR, p. 195)_
- [ ] **472.** O sistema deverá permitir o lançamento de frequência por disciplina e por múltiplas disciplinas. _(TR, p. 195)_
- [ ] **473.** O sistema deverá possuir forma para o lançamento de frequência que permita ao professor escolher se o lançamento será por mês, por semana ou em uma data específica. _(TR, p. 195)_
- [ ] **474.** O sistema deverá permitir que o lançamento de frequência respeite o horário da turma quando o cadastro pelo acadêmico estiver habilitado. _(TR, p. 195)_
- [ ] **475.** O sistema deverá permitir que o professor monte o horário para registrar a frequência das turmas que ele leciona, quando habilitado o módulo acadêmico. _(TR, p. 195)_
- [ ] **476.** O sistema deverá mudar as datas da frequência dos estudantes para a cor verde após salvar os registros. Isso ajudará a identificar a frequência que já foi registrada. _(TR, p. 195)_
- [ ] **477.** O sistema deverá permitir manter selecionados na tela a turma e a etapa, caso o professor queira conferir se o lançamento está correto. _(TR, p. 195)_
- [ ] **478.** O sistema deverá permitir que a tela de lançamento de frequência tenha um botão de atalho para gerar um relatório de faltas. Esse relatório deverá permitir a emissão por período e turma ou por período, turma e grupo de faltas. _(TR, p. 195)_
- [ ] **479.** O sistema deverá permitir que o lançamento de presença seja feito por grupo de falta. _(TR, p. 196)_
- [ ] **480.** O sistema deverá desabilitar os campos de registro de frequência e notas para os estudantes que foram dispensados de alguma disciplina. _(TR, p. 196)_
- [ ] **481.** O sistema deverá destacar a palavra “dispensado(a)” para os estudantes que obtiveram dispensa de alguma disciplina. _(TR, p. 196)_
- [ ] **482.** O sistema deverá permitir que, na tela de registro de frequência, a lista de estudantes destaque a situação atual de cada estudante, a data de matrícula e a data de qualquer movimentação ocorrida. As informações sobre deficiências dos estudantes deverão ser apresentadas ao final dessas informações. _(TR, p. 196)_
- [ ] **483.** O sistema deverá permitir que, na tela de exibição dos resultados das avaliações, a lista de estudantes destaque a situação atual de cada estudante, a data em que se matricularam e a data de qualquer movimentação que possa ter ocorrido. _(TR, p. 196)_
- [ ] **484.** O sistema deverá permitir que, na tela de exibição dos resultados das etapas, a lista de estudantes destaque a situação atual de cada estudante, a data em que se matricularam e a data de qualquer movimentação que possa ter ocorrido. _(TR, p. 196)_
- [ ] **485.** O sistema deverá permitir que o professor visualize os atestados médicos/abonos de faltas dos estudantes registrados no módulo acadêmico. _(TR, p. 196)_
- [ ] **486.** O sistema deverá permitir o lançamento do conteúdo diário, permitindo que o professor monte seu horário quando essa funcionalidade estiver habilitada no módulo acadêmico. _(TR, p. 196)_
- [ ] **487.** O sistema deverá permitir que o professor registre o conteúdo das aulas de acordo com a realidade de sua turma, possibilitando o registro tanto por dia letivo quanto por aula. _(TR, p. 196)_
- [ ] **488.** O sistema deverá listar em uma única tela todo o horário de conteúdo cadastrado para o mês selecionado. _(TR, p. 196)_
- [ ] **489.** O sistema deverá habilitar o botão de salvar o conteúdo apenas quando houver conteúdo registrado ou alterado, listando uma mensagem de atenção para que o conteúdo seja salvo. _(TR, p. 196)_
- [ ] **490.** O sistema deverá permitir o cadastro de avaliações apenas em dias letivos, permitindo informar o tipo de avaliação e o conteúdo a ser abordado. _(TR, p. 196)_
- [ ] **491.** O sistema deverá bloquear a alteração da data da avaliação somente quando tiver sido lançada a nota para a avaliação em questão. _(TR, p. 197)_
- [ ] **492.** O sistema deverá permitir que as avaliações sejam criadas por disciplina, respeitando o ano de ensino de cada uma, sendo que cada professor só poderá criar as avaliações de acordo com as disciplinas e anos de ensino que leciona. _(TR, p. 197)_
- [ ] **493.** O sistema deverá permitir, nesta mesma tela, que o professor estabeleça a quantidade de pontos a serem distribuídos em cada avaliação e a média da avaliação, caso o ano letivo seja avaliado por pontos e não por conceito. _(TR, p. 197)_
- [ ] **494.** O sistema deverá permitir que, ao salvar o cadastro de uma avaliação, se o valor informado para a avaliação somado a outras avaliações já cadastradas for maior que o valor da etapa, liste uma mensagem de aviso para o professor saber quantos pontos ainda estão disponíveis em relação à etapa selecionada. _(TR, p. 197)_
- [ ] **495.** O sistema deverá permitir que o professor replique uma avaliação para várias turmas que ele leciona, desde que seja o mesmo período e disciplina. _(TR, p. 197)_
- [ ] **496.** O sistema deverá permitir o cadastro de avaliações multidisciplinares quando o professor lecionar mais de uma disciplina para a mesma turma. _(TR, p. 197)_
- [ ] **497.** A tela de registro do resultado das avaliações deverá listar apenas as disciplinas da turma que tenham avaliações cadastradas. _(TR, p. 197)_
- [ ] **498.** O sistema deverá permitir o lançamento das notas dos estudantes para as avaliações previamente cadastradas, seja por pontos ou conceitos, de acordo com as regras descritas abaixo. _(TR, p. 197)_
- [ ] **499.** O sistema deverá permitir que os professores selecionem a etapa, a turma e a disciplina para registrar os lançamentos. _(TR, p. 197)_
- [ ] **500.** O sistema deverá permitir carregar as informações da turma selecionada, trazendo automaticamente a relação de todos os estudantes da turma, por ordem de chamada, todas as avaliações registradas para a turma, etapa e disciplina selecionada. Deverá oferecer a opção de lançar as notas, seja por pontos ou conceitos, previamente personalizados nas configurações do módulo acadêmico, permitindo o lançamento do resultado de todas as avaliações de uma só vez. Se o tipo de nota lançada for pontos, o sistema deverá bloquear o lançamento de valores acima da pontuação máxima da avaliação. O sistema deverá também destacar visualmente quais estudantes estão com notas abaixo da média. _(TR, p. 197)_
- [ ] **501.** O sistema deverá permitir informar quando um ou mais estudantes não compareceram no dia da avaliação. Quando informado que o estudante não realizou a avaliação, o campo de nota deverá ficar desabilitado. _(TR, p. 198)_
- [ ] **502.** O sistema deverá permitir que, na tela de registro do resultado das avaliações, liste uma coluna para o registro de notas parciais. Essas notas, quando informadas, são somadas às notas das avaliações para determinar o total da etapa. _(TR, p. 198)_
- [ ] **503.** O sistema deverá somar automaticamente as notas de todos os tipos de avaliações apresentados, preenchendo, assim, a nota ou conceito final dos estudantes na etapa. _(TR, p. 198)_
- [ ] **504.** O sistema deverá contar com uma tela para visualização dos resultados das etapas, onde o professor possa ver a quantidade de aulas ministradas, o total de faltas, a soma dos pontos e, se necessário, registrar a nota de recuperação, uma nota personalizada, faltas parciais e observações para cada estudante da turma. _(TR, p. 198)_
- [ ] **505.** O sistema deverá calcular automaticamente o resultado de todas as etapas, apresentando o total de todas as notas ou conceitos obtidos pelo estudante durante o ano letivo. _(TR, p. 198)_
- [ ] **506.** O sistema deverá permitir que sejam filtrados os lançamentos por turma e disciplina para calcular o resultado final. _(TR, p. 198)_
- [ ] **507.** O sistema deverá carregar as informações da turma selecionada, exibindo a lista de estudantes por ordem de chamada, contendo todas as etapas e seus respectivos lançamentos. _(TR, p. 198)_
- [ ] **508.** O sistema deverá permitir o lançamento das fichas de desempenho, caso a turma seja avaliada dessa forma, cadastradas no módulo acadêmico. _(TR, p. 198)_
- [ ] **509.** O sistema deverá permitir o lançamento da ficha de desempenho por estudante e por descritor. _(TR, p. 198)_
- [ ] **510.** O sistema deverá permitir o lançamento da ficha descritiva/monitoramento, caso a turma seja avaliada dessa forma, cadastradas no módulo acadêmico. _(TR, p. 198)_
- [ ] **511.** O sistema deverá permitir o registro da ficha de controle de Plano de Estudos Tutorado (PET) / Diagnóstico Escolar, caso a turma faça esse tipo de controle. _(TR, p. 198)_
- [ ] **512.** O sistema deverá permitir o registro da ficha individual dos estudantes informando a frequência, interação, avaliação de aprendizagem e observação, caso a turma faça esse tipo de controle. _(TR, p. 199)_
- [ ] **513.** O sistema deverá permitir o registro de observação do estudante pessoal, pedagógica, advertência verbal, advertência formal, entre outros tipos, sendo possível o registro do plano mediador. _(TR, p. 199)_
- [ ] **514.** O sistema deverá permitir o registro de observação da turma, sendo possível a inclusão do grupo falta/disciplina quando necessário. _(TR, p. 199)_
- [ ] **515.** O sistema deverá permitir que o professor visualize as observações que foram cadastradas pela equipe pedagógica no módulo acadêmico. _(TR, p. 199)_
- [ ] **516.** O sistema deverá permitir que o professor realize o fechamento das turmas que ele leciona após finalizar todos os lançamentos. _(TR, p. 199)_
- [ ] **517.** O sistema deverá permitir o controle do que é informado no portal do professor pelo módulo acadêmico, permitindo que a equipe pedagógica acompanhe os lançamentos realizados pelos professores. _(TR, p. 199)_
- [ ] **518.** O sistema deverá permitir que o professor registre a nota final da etapa para os estudantes quando não for realizado o cadastro das avaliações. _(TR, p. 199)_
- [ ] **519.** O sistema deverá agrupar as funcionalidades que serão usadas durante as etapas de ensino e as que serão usadas no fechamento do ano. _(TR, p. 199)_
- [ ] **520.** O sistema deverá permitir informar a nota de recuperação para cada avaliação cadastrada quando habilitado no módulo acadêmico a recuperação por avaliação. _(TR, p. 199)_
- [ ] **521.** O sistema deverá permitir informar a nota de recuperação para cada etapa quando habilitado no módulo acadêmico a recuperação por etapa. _(TR, p. 199)_
- [ ] **522.** O sistema deverá permitir o registro de uma nota personalizada, diferente da soma das avaliações, no caso de turmas que sejam avaliadas por conceito. _(TR, p. 199)_
- [ ] **523.** O sistema deverá permitir o lançamento das notas de recuperação final para os estudantes quando habilitado no módulo acadêmico a recuperação final. _(TR, p. 199)_
- [ ] **524.** O sistema deverá permitir o lançamento das notas de recuperação final apenas de turmas que foram fechadas e gerado o resultado final dos estudantes. _(TR, p. 199)_
- [ ] **525.** O sistema deverá permitir registrar a recuperação final para os estudantes que estiverem abaixo da média. _(TR, p. 200)_
- [ ] **526.** O sistema deverá permitir cadastrar o horário e registrar o conteúdo de recuperação final. _(TR, p. 200)_
- [ ] **527.** O sistema deverá permitir cadastrar o horário e registrar a frequência da recuperação final. _(TR, p. 200)_
- [ ] **528.** O sistema deverá mudar as datas da frequência dos estudantes para a cor verde após salvar os registros. Isso ajudará a identificar a frequência que já foi registrada. _(TR, p. 200)_
- [ ] **529.** O sistema deverá possuir relatório de horário do professor. _(TR, p. 200)_
- [ ] **530.** O sistema deverá possuir listagem de estudantes por turma. _(TR, p. 200)_
- [ ] **531.** O sistema deverá possuir relatório de livro de matrícula por turma. _(TR, p. 200)_
- [ ] **532.** O sistema deverá possuir relatório de aniversariantes por turma. _(TR, p. 200)_
- [ ] **533.** O sistema deverá possuir relatório de avaliações marcadas por turma, etapa e disciplina. _(TR, p. 200)_
- [ ] **534.** O sistema deverá possuir relatório de controle de somativas e avaliações. _(TR, p. 200)_
- [ ] **535.** O sistema deverá possuir relatório da pontuação restante para os estudantes atingirem a média, tanto por etapa/turma quanto por ano/turma. _(TR, p. 200)_
- [ ] **536.** O sistema deverá possuir boletim das turmas por estudante, por estudante/etapa, por turma e por turma/etapa. _(TR, p. 200)_
- [ ] **537.** O sistema deverá possuir relatório de ata por etapa por turma. _(TR, p. 200)_
- [ ] **538.** O sistema deverá possuir relatório de ata por disciplina por turma. _(TR, p. 200)_
- [ ] **539.** O sistema deverá possuir relatório de diário de frequência tanto por etapa/turma/disciplina quanto por mês/turma/disciplina. _(TR, p. 200)_
- [ ] **540.** O sistema deverá possuir relatório de diário de conteúdo tanto por etapa/turma/disciplina quanto por mês/turma/disciplina. _(TR, p. 200)_
- [ ] **541.** O sistema deverá possuir relatório de diário de notas por turma/etapa, por turma/ano, por disciplina/etapa e por disciplina/ano. _(TR, p. 200)_
- [ ] **542.** O sistema deverá possuir relatório de diário de observação tanto por etapa/turma/professor quanto por mês/turma/professor. _(TR, p. 200)_
- [ ] **543.** O sistema deverá possuir relatório de diário de classe para realizar a chamada manual. _(TR, p. 200)_
- [ ] **544.** O sistema deverá possuir relatório de diário de frequência, diário de conteúdo, diário de notas e diário de observação para turmas multisseriadas. _(TR, p. 200)_
- [ ] **545.** O sistema deverá possuir mais de um modelo de listagem de estudantes por turma. _(TR, p. 201)_
- [ ] **546.** O sistema deverá possuir relatório de ficha individual do estudante, tanto por estudante quanto por turma. _(TR, p. 201)_
- [ ] **547.** O sistema deverá possuir relatório de ficha descritiva anual de monitoramento, ficha descritiva anual e ficha descritiva por etapa, com opção tanto por estudante quanto por turma, com ou sem deficiência. _(TR, p. 201)_
- [ ] **548.** O sistema deverá possuir relatório de ficha de desempenho por estudante/etapa, por estudante/ano, por turma/etapa e por turma/ano, sendo possível informar professor responsável manualmente. _(TR, p. 201)_
- [ ] **549.** O sistema deverá possuir a relação de movimentação dos estudantes, de evasões, remanejamento, transferência expedida e recebida por turma/por etapa. _(TR, p. 201)_
- [ ] **550.** O sistema deverá possuir relatório de declaração de atualização de carteira de vacinação. _(TR, p. 201)_
- [ ] **551.** O sistema deverá possuir relatório de declaração de autorização de acompanhamento psicológico. _(TR, p. 201)_
- [ ] **552.** O sistema deverá possuir relatório de declaração de autorização de campanha de vacinação. _(TR, p. 201)_
- [ ] **553.** O sistema deverá possuir relatório de declaração de autorização para intervenção da equipe multifuncional. _(TR, p. 201)_
- [ ] **554.** O sistema deverá possuir relatório de declaração de comprovante de entrega de atividade por turma e por estudante. _(TR, p. 201)_
- [ ] **555.** O sistema deverá possuir relatório de declaração de comprovante de vaga, comprovante de turma com vaga. _(TR, p. 201)_
- [ ] **556.** O sistema deverá possuir relatório de declaração de conclusão por turma e por estudante. _(TR, p. 201)_
- [ ] **557.** O sistema deverá possuir relatório de declaração de conclusão com notas por turma e por estudante. _(TR, p. 201)_
- [ ] **558.** O sistema deverá possuir relatório de declaração de desistência de vaga. _(TR, p. 201)_
- [ ] **559.** O sistema deverá possuir relatório de declaração de estudante que não se enquadra no transporte escolar. _(TR, p. 201)_
- [ ] **560.** O sistema deverá possuir relatório de ficha de comunicação de estudante infrequente. _(TR, p. 202)_
- [ ] **561.** O sistema deverá possuir relatório de frequência para o Bolsa Família. _(TR, p. 202)_
- [ ] **562.** O sistema deverá possuir relatório de declaração genérica. _(TR, p. 202)_
- [ ] **563.** O sistema deverá possuir relatório de declaração de guarda legal em tramitação. _(TR, p. 202)_
- [ ] **564.** O sistema deverá possuir relatório de declaração de guarda legal não iniciada. _(TR, p. 202)_
- [ ] **565.** O sistema deverá possuir relatório de declaração de matrícula por turma e por estudante. _(TR, p. 202)_
- [ ] **566.** O sistema deverá possuir relatório de declaração de presença em reunião. _(TR, p. 202)_
- [ ] **567.** O sistema deverá possuir relatório de declaração de representante não legal. _(TR, p. 202)_
- [ ] **568.** O sistema deverá possuir relatório de declaração de retirada de criança. _(TR, p. 202)_
- [ ] **569.** O sistema deverá possuir relatório de declaração de solicitação de prématrícula por turma e por estudante. _(TR, p. 202)_
- [ ] **570.** O sistema deverá possuir relatório de termo de dispensa. _(TR, p. 202)_
- [ ] **571.** O sistema deverá possuir relatório de termo de compromisso com o transporte escolar. _(TR, p. 202)_
- [ ] **572.** O sistema deverá possuir relatório de termo de compromisso de falta de documentos. _(TR, p. 202)_
- [ ] **573.** O sistema deverá possuir relatório de termo de imagem e consentimento por turma e por estudante. _(TR, p. 202)_
- [ ] **574.** O sistema deverá possuir relatório de termo de responsabilidade com o transporte escolar. _(TR, p. 202)_
- [ ] **575.** O sistema deverá possuir relatório de termo de matrícula no AEE. _(TR, p. 202)_
- [ ] **576.** O sistema deverá possuir relatório de declaração de transferência. _(TR, p. 202)_
- [ ] **577.** O sistema deverá possuir relatório de declaração de transferência com notas. _(TR, p. 202)_
- [ ] **578.** O sistema deverá possuir as declarações de conclusão e conclusão com notas, tanto por estudante quanto por turma. _(TR, p. 202)_
- [ ] **579.** O sistema deverá possuir gráfico de média da turma por disciplina. _(TR, p. 202)_
- [ ] **580.** O sistema deverá possuir relatório de observação do estudante tanto por turma quanto por estudante. _(TR, p. 202)_
- [ ] **581.** O sistema deverá possuir relatório de observação do professor. _(TR, p. 202)_
- [ ] **582.** O sistema deverá possuir relatório de estudantes por conceito, tanto por disciplina/turma/etapa/conceito quanto por avaliação/turma/etapa/disciplina/conceito. _(TR, p. 203)_
- [ ] **583.** O sistema deverá possuir relatório de questionário de atividades por turma/disciplina/data inicial/data final/questionário. _(TR, p. 203)_
- [ ] **584.** O sistema deverá possuir relatório de controle de plano de estudos tutorado (PET) por turma/controle de plano de estudos tutorado (PET) / diagnóstico escolar. _(TR, p. 203)_
- [ ] **585.** O sistema deverá permitir que o professor faça a inscrição em cursos disponibilizados pela secretaria de educação. _(TR, p. 203)_
- [ ] **586.** O sistema deverá possuir relatório de controle de carga horária de cursos/encontros que participou. _(TR, p. 203)_
- [ ] **587.** O sistema deverá possuir relatório de declaração de cursos/encontros que participou. _(TR, p. 203)_
- [ ] **588.** O sistema deverá possuir certificado de cursos/encontros que participou. _(TR, p. 203)_
- [ ] **589.** O sistema deverá garantir que nas telas de registro de frequência, conteúdo, cadastro de avaliação, resultado de avaliação, resultado das etapas, ficha descritiva e ficha de desempenho não seja permitida nenhuma alteração quando o acesso a elas estiver bloqueado no módulo acadêmico pela equipe pedagógica. _(TR, p. 203)_
- [ ] **590.** O sistema deverá possibilitar que o professor faça a liberação individual das avaliações marcadas, resultado das avaliações, material de estudo, ficha de desempenho, ficha descritiva/monitoramento e controle de plano de estudos tutorado (PET) / diagnóstico escolar para visualização no portal do estudante. _(TR, p. 203)_
- [ ] **591.** O sistema deverá permitir a comunicação por mensagem entre estudantes, professores, equipe pedagógica e outros usuários do sistema. _(TR, p. 203)_
- [ ] **592.** O sistema deverá permitir que o professor visualize os avisos e mensagens que foram postadas pela escola ou secretaria de educação. _(TR, p. 203)_
- [ ] **593.** O sistema deverá permitir que o professor altere a senha de acesso ao portal do professor quando necessário. _(TR, p. 203)_
- [ ] **594.** O sistema deverá possibilitar a mudança de escola e período letivo sem a necessidade de sair do sistema. _(TR, p. 203)_
- [ ] **595.** O sistema deverá disponibilizar uma seção de Perguntas Frequentes (FAQ) no sistema. _(TR, p. 203)_
- [ ] **596.** O sistema deverá possuir botão de ajuda em todas as telas do portal do professor. _(TR, p. 204)_
- [ ] **597.** O sistema deverá possuir integração com VLibras, proporcionando acessibilidade, permitindo que indivíduos surdos compreendam informações em seu próprio idioma, o que contribui para a promoção da inclusão digital. _(TR, p. 204)_
- [ ] **598.** O sistema deverá notificar no portal do professor quando houver novas observações, onde o usuário terá acesso direto à página da observação. _(TR, p. 204)_
### Portal do Estudante _(p. 204)_

- [ ] **599.** O sistema deverá ser acessível através de tablets, iPads e celulares usando um navegador responsivo; _(TR, p. 204)_
- [ ] **600.** O sistema deverá permitir que o acesso ao portal do estudante, seja definido pelo módulo acadêmico e que o acesso seja independente do módulo acadêmico; _(TR, p. 204)_
- [ ] **601.** O sistema deverá permitir que a liberação dos menus do portal do estudante seja realizado pelo módulo acadêmico; _(TR, p. 204)_
- [ ] **602.** O sistema deverá permitir que as telas de acesso do estudante sejam individuais por período letivo e para cada turma que ele estudou; _(TR, p. 204)_
- [ ] **603.** O sistema deverá possibilitar que o estudante escolha de qual período e turma deseja visualizar as informações, contemplando todos os períodos que o mesmo possua registro no sistema; _(TR, p. 204)_
- [ ] **604.** O sistema deverá exibir informações do período, turma e turno selecionado a todo momento que o estudante estiver acessando o sistema; _(TR, p. 204)_
- [ ] **605.** O sistema deverá possibilitar ao estudante e responsáveis consultar o endereço, telefone de contato e nome do diretor da escola; _(TR, p. 204)_
- [ ] **606.** O sistema deverá permitir visualizar trabalhos, avaliações marcadas, avaliação diagnóstica, horário, calendário escolar e documentos entregues; _(TR, p. 204)_
- [ ] **607.** O sistema deverá possibilitar a visualização do calendário letivo cadastrado pela escola, destacando através de legendas em cores e observações os dias letivos, dias de estudo, conselhos de classes e feriados. Também poderá visualizar a agenda dos professores quando liberado para o portal do estudante; _(TR, p. 204)_
- [ ] **608.** O sistema deverá possibilitar ao estudante e responsáveis consultar a grade curricular da turma em que o estudante está matriculado, com seus respectivos professores; _(TR, p. 205)_
- [ ] **609.** O sistema deverá possibilitar ao estudante e responsáveis consultar a data inicial e final de cada etapa com o valor e média; _(TR, p. 205)_
- [ ] **610.** O sistema deverá permitir estudante e responsáveis a visualização do horário da turma em que o estudante se encontra matriculado; _(TR, p. 205)_
- [ ] **611.** O sistema deverá permitir que o estudante e responsáveis visualizem as avaliações que foram marcadas trazendo informações da data, tipo de avaliação, conteúdo que será cobrado, valor e média da avaliação quando liberadas pelo professor ou equipe pedagógica; _(TR, p. 205)_
- [ ] **612.** O sistema deverá permitir que o estudante e responsáveis visualizem o resultado que ele obteve nas avaliações quando liberado pelo professor ou equipe pedagógica; _(TR, p. 205)_
- [ ] **613.** O sistema deverá permitir que o estudante e responsáveis visualizem a nota de recuperação das avaliações; _(TR, p. 205)_
- [ ] **614.** O sistema deverá permitir que o estudante e responsáveis visualizem a ficha descritiva/monitoramento e ficha desempenho/avaliação diagnóstica quando liberado pelo professor ou equipe pedagógica; _(TR, p. 205)_
- [ ] **615.** O sistema deverá permitir que o responsável escreva uma observação e marque como visualizado as avaliações diagnósticas; _(TR, p. 205)_
- [ ] **616.** O sistema deverá permitir que o estudante e responsáveis visualizem o boletim após o fechamento da etapa quando liberado pelo professor ou equipe pedagógica; _(TR, p. 205)_
- [ ] **617.** O sistema deverá permitir que o estudante e responsáveis possam imprimir o boletim; _(TR, p. 205)_
- [ ] **618.** O sistema deverá permitir que o estudante e responsáveis visualizem a quantitativo de aulas dadas e quantitativo de faltas do estudante por etapa e o total anual por disciplina; _(TR, p. 205)_
- [ ] **619.** O sistema deverá permitir o estudante e responsáveis visualizem as observações registradas pelos professores após a liberação da equipe pedagógica da escola; _(TR, p. 205)_
- [ ] **620.** O sistema deverá permitir que o estudante e responsáveis visualizem os avisos e mensagens que foram postadas pela escola ou secretaria de educação; _(TR, p. 205)_
- [ ] **621.** O sistema deverá possibilitar o download de materiais disponibilizados pelo professor para execução de atividades não presenciais para complementação de estudos; _(TR, p. 206)_
- [ ] **622.** O sistema deverá permitir que o estudante possa realizar upload das atividades concluídas quando a mesma exigir anexo de retorno do estudante; _(TR, p. 206)_
- [ ] **623.** O sistema deverá permitir que o estudante execute as atividades disponibilizadas pelos professores diretamente no sistema e visualize a observação do professor sobre a atividade concluída; _(TR, p. 206)_
- [ ] **624.** O sistema deverá permitir que o estudante visualize a data inicial e final das atividades disponibilizadas pelos professores e tempo que ele gastou para concluir a atividade; _(TR, p. 206)_
- [ ] **625.** O sistema deverá permitir que o estudante após a conclusão da atividade visualize as respostas corretas e incorretas das perguntas objetivas dos questionários respondidos por ele; _(TR, p. 206)_
- [ ] **626.** O sistema deverá possibilitar o acesso do estudante ao portal interativo quando o mesmo for disponibilizado pela secretaria de educação; _(TR, p. 206)_
- [ ] **627.** O sistema deverá listar a relação de documentos solicitados informando quais foram entregues e quais ainda falta entregar; _(TR, p. 206)_
- [ ] **628.** O sistema deverá permitir realizar a rematrícula do estudante pelo responsável quando for habilitado o período de rematrícula pela secretaria de educação; _(TR, p. 206)_
- [ ] **629.** O sistema deverá permitir a comunicação por mensagem entre estudantes, professores, equipe pedagógica e outros usuários do sistema. _(TR, p. 206)_
- [ ] **630.** O sistema deverá permitir que o estudante altere a senha de acesso ao portal quando necessário; _(TR, p. 206)_
- [ ] **631.** O sistema deverá permitir a alteração de turma para que o estudante e responsáveis tenham acesso às informações dos anos anteriores que o estudante esteve matriculado; _(TR, p. 206)_
- [ ] **632.** O sistema deverá disponibilizar uma seção de Perguntas Frequentes (FAQ) no sistema; _(TR, p. 206)_
- [ ] **633.** O sistema deverá possuir botão de ajuda em todas as telas do portal do estudante; _(TR, p. 206)_
- [ ] **634.** O sistema deverá possuir integração com VLibras proporcionando acessibilidade, permitindo que indivíduos surdos compreendam informações em seu próprio idioma, o que contribui para a promoção da inclusão digital; _(TR, p. 207)_
- [ ] **635.** O sistema deverá disponibilizar aplicativo para acesso ao horário, avaliações marcadas, resultado das avaliações e boletim; _(TR, p. 207)_
### Portal do Estudante – Aplicativo Mobile _(p. 207)_

- [ ] **636.** O aplicativo deverá possuir acesso nas versões Android e iOS. _(TR, p. 207)_
- [ ] **637.** O aplicativo deverá possuir recursos de acessibilidade. _(TR, p. 207)_
- [ ] **638.** O aplicativo deverá possuir assistente de autenticação de política de privacidade. _(TR, p. 207)_
- [ ] **639.** O aplicativo deverá realizar o login através do CPF do estudante e/ou do responsável. _(TR, p. 207)_
- [ ] **640.** O aplicativo poderá ser utilizado por escolas públicas e por escolas privadas. _(TR, p. 207)_
- [ ] **641.** O aplicativo deverá possuir filtro através do estado e município. _(TR, p. 207)_
- [ ] **642.** O aplicativo deverá possuir filtro através do estado e município. _(TR, p. 207)_
- [ ] **643.** O aplicativo deverá permitir recuperar de senha através de e-mail. _(TR, p. 207)_
- [ ] **644.** O aplicativo deverá permitir visualizar o horário das aulas. _(TR, p. 207)_
- [ ] **645.** O aplicativo deverá permitir visualizar as avaliações cadastradas para cada etapa com informações de data, valor, média e conteúdo. _(TR, p. 207)_
- [ ] **646.** O aplicativo deverá permitir visualizar o resultado das avaliações. _(TR, p. 207)_
- [ ] **647.** O aplicativo deverá permitir visualizar o resultado da recuperação. _(TR, p. 207)_
- [ ] **648.** O aplicativo deverá permitir visualizar o boletim escolar com a relação de disciplinas, média da etapa e quantidade de faltas por disciplina. _(TR, p. 207)_
- [ ] **649.** O aplicativo deverá permitir visualizar o nome do professor de cada disciplina. _(TR, p. 207)_
- [ ] **650.** O aplicativo deverá permitir visualizar as notificações das observações registradas. _(TR, p. 207)_
- [ ] **651.** O aplicativo deverá permitir que o estudante inclua a foto no seu perfil. _(TR, p. 207)_
- [ ] **652.** O aplicativo deverá permitir visualizar o nome do estudante, turma, matrícula e telefone. _(TR, p. 207)_
- [ ] **653.** O aplicativo deverá permitir o acesso às informações principais da escola (endereço completo, nome do gestor, e-mail e telefone de contato). _(TR, p. 207)_
- [ ] **654.** O aplicativo deverá permitir o acesso às turmas de anos anteriores em ter que acessar novamente. _(TR, p. 208)_
- [ ] **655.** O aplicativo deverá permitir a alteração de senha. _(TR, p. 208)_
- [ ] **656.** O aplicativo deverá permitir o acesso à política de privacidade. _(TR, p. 208)_
- [ ] **657.** O aplicativo deverá permitir a alteração de estudante quando o acesso é realizado por um responsável que tenha mais de um filho matriculado. _(TR, p. 208)_
### Biblioteca _(p. 208)_

- [ ] **658.** O sistema deverá permitir o cadastro das bibliotecas da rede municipal com as respectivas configurações de cada uma delas como: quantidade de dias para verificar o cadastro do leitor está desatualizado, usar avaliação do estado do exemplar na devolução, definir a quantidade de exemplares a ser emprestado seja por tipo de leitor ou por tipo de item, definir o total de dias padrão para duração do empréstimo, idioma e tipo de item padrão no cadastro dos títulos, gerar tombo/registro automático; _(TR, p. 208)_
- [ ] **659.** O sistema deverá possuir validação para bloqueio de empréstimo do mesmo item na configuração de limites personalizados por tipo de item e tipo de leitor; _(TR, p. 208)_
- [ ] **660.** O sistema deverá possibilitar a importação dos leitores (estudantes, professores e funcionários) através do módulo de secretaria; _(TR, p. 208)_
- [ ] **661.** O sistema deverá permitir a configuração de envio automático de e-mail para os leitores avisando sobre devoluções de exemplares e disponibilidade de exemplar que foi reservado; _(TR, p. 208)_
- [ ] **662.** O sistema deverá possuir botão de ajuda em cada tela do módulo biblioteca; _(TR, p. 208)_
- [ ] **663.** O sistema deverá possuir integração com VLibras proporcionando acessibilidade, permitindo que indivíduos surdos compreendam informações em seu próprio idioma, o que contribui para a promoção da inclusão digital; _(TR, p. 208)_
- [ ] **664.** O sistema deverá permitir o cadastro do tipo de leitor onde deverá ser informado o máximo de exemplares por empréstimo, o máximo de reserva de exemplares, o máximo de renovações, tempo de espera para realizar um reempréstimo e dias válidos para reserva; _(TR, p. 208)_
- [ ] **665.** O sistema deverá permitir gerenciar uma nova tabela que armazena configurações personalizadas de limite de empréstimo, que é controlada a partir de uma opção na configuração da biblioteca _(TR, p. 208)_
- [ ] **666.** O sistema deverá possuir uma tela para gerenciar e-mails de leitores e atualizar de acordo como for necessário. _(TR, p. 209)_
- [ ] **667.** O sistema deverá permitir o cadastro de leitores com seus dados pessoais, foto, endereço completo, telefone e e-mail de contato. Também deverá ser possível informar o tipo de leitor, a data do cadastro, assuntos preferidos, filiação, dependentes, informações sobre escola, curso, período, turma, turno e telefone da escola caso o leitor seja estudante; _(TR, p. 209)_
- [ ] **668.** O sistema deverá listar que no cadastro do leitor a data da última atualização do cadastro do leitor desabilitada e a listagem de empréstimos realizados pelo leitor com o nome do título, data de empréstimo e data de devolução/renovação; _(TR, p. 209)_
- [ ] **669.** O sistema deverá permitir o cadastro de autoria sendo possível a inclusão das iniciais do autor código PHA; _(TR, p. 209)_
- [ ] **670.** O sistema deverá permitir o cadastro de artista/produto sendo possível a inclusão das iniciais; _(TR, p. 209)_
- [ ] **671.** O sistema deverá permitir o cadastro de editoras com o endereço completo, contato e representante; _(TR, p. 209)_
- [ ] **672.** O sistema deverá permitir o cadastro de tipos de materiais disponíveis na biblioteca sendo possível definir o máximo de empréstimo por tipo de item, se utiliza tempo de empréstimo padrão por tipo de material, descrição do material e se o mesmo é uma mídia digital; _(TR, p. 209)_
- [ ] **673.** O sistema deverá permitir o cadastro das coleções presentes na biblioteca; _(TR, p. 209)_
- [ ] **674.** O sistema deverá permitir o cadastro de assunto sendo possível incluir uma descrição e código do assunto; _(TR, p. 209)_
- [ ] **675.** O sistema deverá permitir o cadastro de tipo de função sendo possível definir se o tipo de função que está sendo cadastrado será a principal ou não; _(TR, p. 209)_
- [ ] **676.** O sistema deverá permitir o cadastro de tipo de aquisição; _(TR, p. 209)_
- [ ] **677.** O sistema deverá permitir o cadastro de tipo de baixa com a descrição; _(TR, p. 209)_
- [ ] **678.** O sistema deverá permitir o cadastro dos títulos (itens) com informações de tempo padrão de empréstimo, título original, subtítulo, série, observação, sinopse/resumo, ISBN, CDD, CDU, Cutter e/ou PHA, número de páginas, edição, volume, capítulo, editora, ano de publicação, município de publicação, assunto, autor, forma e data de aquisição, idioma, tipo de item, se o exemplar circula e registro/tombo; _(TR, p. 209)_
- [ ] **679.** O sistema deverá possuir tela para cadastro de títulos (itens) simplificada; _(TR, p. 210)_
- [ ] **680.** O sistema deverá permitir adicionar imagens ilustrativas ao cadastro do livro; _(TR, p. 210)_
- [ ] **681.** O sistema deverá permitir realizar a baixa de exemplares sendo possível executar a baixa por item e por exemplar; _(TR, p. 210)_
- [ ] **682.** O sistema deverá permitir registrar o empréstimo de exemplares presentes na biblioteca e O sistema deverá possuir o comprovante de empréstimo; _(TR, p. 210)_
- [ ] **683.** O sistema deverá permitir que a pesquisa do exemplar seja feita pelo nome do título, código do exemplar e pelo registro/tombo ao cadastrar empréstimo; _(TR, p. 210)_
- [ ] **684.** O sistema deverá permitir a pesquisa do leitor seja feita pelo nome, código do leitor gerado pelo sistema e pelo registro informado no cadastro do mesmo ao cadastrar empréstimo; _(TR, p. 210)_
- [ ] **685.** O sistema deverá permitir que ao cadastrar um empréstimo a data de devolução seja antecipada ou adiada para cada exemplar; _(TR, p. 210)_
- [ ] **686.** O sistema deverá bloquear o empréstimo para leitores com o cadastro vencido; _(TR, p. 210)_
- [ ] **687.** O sistema deverá permitir registrar a renovação dos empréstimos de exemplares da biblioteca e emitir o comprovante da renovação do empréstimo; _(TR, p. 210)_
- [ ] **688.** O sistema deverá permitir registrar a devolução dos empréstimos de exemplares e emitir o comprovante da devolução; _(TR, p. 210)_
- [ ] **689.** O sistema deverá permitir a avaliação das condições dos livros no momento da devolução. Caso seja identificada qualquer irregularidade, o sistema deverá oferecer a opção de aplicar uma penalidade ao leitor. Além disso, deverá ser possível especificar na penalidade se o leitor estará autorizado a realizar novos empréstimos; _(TR, p. 210)_
- [ ] **690.** O sistema deverá permitir registrar a reserva de exemplares presentes na biblioteca; _(TR, p. 210)_
- [ ] **691.** O sistema deverá bloquear reserva de títulos que possuam exemplares disponíveis para empréstimo; _(TR, p. 210)_
- [ ] **692.** O sistema deverá permitir que uma reserva seja cancelada; _(TR, p. 210)_
- [ ] **693.** O sistema deverá permitir que a pesquisa do leitor seja realizada pelo nome, pelo código do leitor gerado pelo sistema ou pelo registro informado no cadastro do mesmo ao cadastrar reserva; _(TR, p. 210)_
- [ ] **694.** O sistema deverá permitir que a pesquisa do título seja realizada pelo nome, pelo código ou pelo registro/tombo ao cadastrar reserva; _(TR, p. 211)_
- [ ] **695.** O sistema deverá permitir que ao cadastrar uma reserva a data de limite seja antecipada ou adiada para cada título; _(TR, p. 211)_
- [ ] **696.** O sistema deverá permitir o cadastro de sugestão de aquisição de títulos (itens) informando a data da sugestão, o leitor que sugeriu, o nome do título e o autor; _(TR, p. 211)_
- [ ] **697.** O sistema deverá permitir gerar relatórios através dos grids dinâmicos das principais telas módulo biblioteca; _(TR, p. 211)_
- [ ] **698.** O sistema deverá permitir a emissão de etiquetas para catalogar os exemplares presentes na biblioteca; _(TR, p. 211)_
- [ ] **699.** O sistema deverá possuir relatório de carteira de leitor por leitor e por data de cadastro; _(TR, p. 211)_
- [ ] **700.** O sistema deverá possuir o relatório de controle de empréstimo listando para cada exemplar a data do empréstimo, número de registro, nome do leitor e data que o exemplar foi devolvido; _(TR, p. 211)_
- [ ] **701.** O sistema deverá possuir a listagem de devolução por leitor e por período; _(TR, p. 211)_
- [ ] **702.** O sistema deverá permitir a emissão de etiquetas com base no código do exemplar, na data de cadastro, nos exemplares marcados, no registro/tombo e no nome do título; _(TR, p. 211)_
- [ ] **703.** O sistema deverá possuir a listagem de exemplares baixados; _(TR, p. 211)_
- [ ] **704.** O sistema deverá possuir relatórios para auxiliar no controle de obras reservadas por período; _(TR, p. 211)_
- [ ] **705.** O sistema deverá possuir a listagem de leitores por tipo de leitor; _(TR, p. 211)_
- [ ] **706.** O sistema deverá possuir a listagem de leitores ativo e inativo; _(TR, p. 211)_
- [ ] **707.** O sistema deverá possuir listagem de aquisição de títulos por tipo de aquisição sendo possível filtrar por ano e mês; _(TR, p. 211)_
- [ ] **708.** O sistema deverá possuir relatório para auxiliar no controle de obras emprestadas por período; _(TR, p. 211)_
- [ ] **709.** O sistema deverá possuir a listagem de exemplares geral e por data de aquisição; _(TR, p. 211)_
- [ ] **710.** O sistema deverá possuir gráfico comparativo por ano com quantitativo de títulos emprestados por mês; _(TR, p. 212)_
- [ ] **711.** O sistema deverá possuir relatório para auxiliar no controle de títulos a serem devolvidos por período sendo possível gerar uma listagem apenas daqueles que estão em atraso; _(TR, p. 212)_
- [ ] **712.** O sistema deverá possuir listagem de títulos geral, por autor, por assunto, por editora, por tipo de material, por CDD, por tipo de função e por registro/tombo; _(TR, p. 212)_
- [ ] **713.** O sistema deverá possuir relatório de ficha de cadastro do leitor, ficha de catalográfica e listagem de sugestão de livros; _(TR, p. 212)_
- [ ] **714.** O sistema deverá possuir relatório de carta de cobrança de empréstimos em atraso sendo possível gerar a carta de um o mais leitores _(TR, p. 212)_
- [ ] **715.** O sistema deverá possuir a relação de tombos/registros não usados; Gestão de Alimentação Escolar Ambiente Administrativo – Entidades _(TR, p. 212)_
- [ ] **716.** O sistema deverá permitir o cadastro de empresas, possibilitando informar o CNPJ, a inscrição municipal, a inscrição estadual, a inscrição estadual substituta, o telefone, o e-mail de contato, o site e o endereço completo. _(TR, p. 212)_
- [ ] **717.** O sistema deverá permitir a atualização do cadastro das empresas sempre que necessário. Essa atualização deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 212)_
- [ ] **718.** O sistema deverá possibilitar a inclusão do brasão do município ou a logo utilizada na administração atual. Essas imagens importadas para o sistema devem ser automaticamente exibidas nos relatórios gerados. _(TR, p. 212)_
- [ ] **719.** O sistema deverá permitir o cadastro de filiais, vinculando-as à empresa principal e possibilitando informar o CNPJ, a inscrição municipal, a inscrição estadual, a inscrição estadual substituta, o telefone, o e-mail de contato, o site e o endereço completo. _(TR, p. 212)_
- [ ] **720.** O sistema deverá permitir a atualização do cadastro das filiais sempre que necessário. Essa atualização deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 212)_
- [ ] **721.** O sistema deverá permitir o cadastro de escola, possibilitando vincular uma filial e informar o CNPJ, a inscrição municipal, a inscrição estadual, o código do INEP, o telefone, o e-mail de contato e o endereço completo. _(TR, p. 213)_
- [ ] **722.** O sistema deverá permitir a atualização do cadastro das escolas sempre que necessário. Essa atualização deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. Ambiente Administrativo – Usuários _(TR, p. 213)_
- [ ] **723.** O sistema deverá permitir o cadastro de grupos de usuários, possibilitando informar o nome, a descrição e as permissões de acesso. _(TR, p. 213)_
- [ ] **724.** O sistema deverá permitir a alteração do cadastro de grupos de usuários sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 213)_
- [ ] **725.** O sistema deverá permitir o cadastro de pessoas, possibilitando informar o nome completo, o CPF, o telefone, o e-mail e o endereço completo. _(TR, p. 213)_
- [ ] **726.** O sistema deverá permitir o cadastro de usuários das filiais, possibilitando vinculá-los a uma filial específica, informar o nome e os dados de acesso (grupo de usuários, login e senha). _(TR, p. 213)_
- [ ] **727.** O sistema deverá permitir a alteração do cadastro de usuários das filiais sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 213)_
- [ ] **728.** O sistema deverá permitir o cadastro de usuários das escolas, possibilitando vinculá-los a uma escola específica, informar o nome e os dados de acesso (grupo de usuários, login e senha). _(TR, p. 213)_
- [ ] **729.** O sistema deverá permitir a alteração do cadastro de usuários das escolas sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. Ambiente Gerencial – Gestão _(TR, p. 213)_
- [ ] **730.** O sistema deverá possuir uma tela para configurar a permissão de servir refeições aos funcionários. _(TR, p. 214)_
- [ ] **731.** O sistema deverá permitir configurar alertas para informar o número de dias restantes para o fim da validade, exibindo um alerta no ambiente da escola sobre a proximidade da data de vencimento do produto lançado no estoque. _(TR, p. 214)_
- [ ] **732.** O sistema deverá permitir a alteração da configuração de alertas sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 214)_
- [ ] **733.** O sistema deverá permitir o cadastro das nutricionistas, possibilitando informar o nome completo, o CPF, o CRON, o telefone, o e-mail de contato, o endereço completo e os dados de acesso (grupo de usuários, login e senha). _(TR, p. 214)_
- [ ] **734.** O sistema deverá permitir a alteração do cadastro das nutricionistas sempre que necessário, mantendo desabilitados os campos de CPF e login. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 214)_
- [ ] **735.** O sistema deverá possuir uma tela com a listagem dos estudantes que possuem restrição alimentar, possibilitando filtrar a listagem por escola, por período, pelo nome do estudante e pela descrição da restrição alimentar. Deverá permitir a exportação de um relatório em PDF e XLS com a listagem desses estudantes. Ambiente Gerencial – Geral _(TR, p. 214)_
- [ ] **736.** O sistema deverá permitir o cadastro de modalidades de ensino. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 214)_
- [ ] **737.** O sistema deverá bloquear a exclusão de modalidades de ensino quando a modalidade estiver vinculada ao cadastro alguma preparação. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 214)_
- [ ] **738.** O sistema deverá permitir o cadastro de faixas etárias, possibilitando informar a etapa de ensino, o nome da faixa etária, a idade inicial e a idade final. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 215)_
- [ ] **739.** O sistema deverá bloquear a exclusão de faixas etárias quando elas estiverem vinculadas ao cadastro alguma preparação. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 215)_
- [ ] **740.** O sistema deverá permitir o cadastro de unidades de medida, possibilitando informar o nome da unidade, o símbolo e a equivalência. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la Ambiente Gerencial – Alimentação _(TR, p. 215)_
- [ ] **741.** O sistema deverá permitir o cadastro das tabelas alimentares, possibilitando a informar o nome da tabela e descrição. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 215)_
- [ ] **742.** O sistema deverá bloquear a exclusão das tabelas alimentares quando elas estiverem vinculadas ao cadastro algum grupo de alimentos. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 215)_
- [ ] **743.** O sistema deverá permitir a importação de tabela alimentar “Tabela Brasileira de Composição de Alimentos. 4ª ed. rev. e ampla. Campinas: NEPA- _(TR, p. 215)_
### UNICAMP, 2011.” _(p. 215)_

- [ ] **744.** O sistema deverá permitir a importação e manutenção da tabela TACO. _(TR, p. 215)_
- [ ] **745.** O sistema deverá permitir o cadastro dos grupos de alimentos, possibilitando informar o nome do grupo e vinculá-lo a uma tabela alimentar previamente cadastrada. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 215)_
- [ ] **746.** O sistema deverá bloquear a exclusão dos grupos de alimentos quando eles estiverem vinculados ao cadastro algum alimento. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 216)_
- [ ] **747.** O sistema deverá permitir o cadastro de alimentos, possibilitando vinculá-los a um grupo de alimentos previamente cadastrado, informar o código do alimento na tabela, o nome, a unidade de medida, a quantidade e as informações nutricionais(centesimal, minerais, vitaminas, colesterol, aminoácidos e ácidos graxos).Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 216)_
- [ ] **748.** O sistema deverá bloquear a exclusão de alimentos quando eles estiverem vinculados ao cadastro alguma preparação. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 216)_
- [ ] **749.** O sistema deverá possuir uma tela para controle dos valores per capita, possibilitando filtrar a listagem pela tabela alimentar, pelo grupo de alimentos e pela descrição do alimento. Nesta tela, deverá ser possível registar a per capita, possibilitando informar a faixa etária, o peso bruto, o fato de correção, o índice decocção e preço por quilo. Deverá permitir a exportação de um relatório em PDF e XLS com a listagem desses estudantes. Ambiente Gerencial – Refeições _(TR, p. 216)_
- [ ] **750.** O sistema deverá permitir o cadastro de preparações, possibilitando informar o nome da preparação, os ingredientes utilizados com a quantidade, o modo de preparo com o rendimento, tempo e descrição, a composição nutricional por porção e total e vinculá-la a uma nutricionista. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 216)_
- [ ] **751.** O sistema deverá permitir controlar a tabela de nutrientes com base nos índices calóricos definidos pela Organização Mundial de Saúde. _(TR, p. 216)_
- [ ] **752.** O sistema deverá bloquear a exclusão da preparação quando possuir vínculo com o cadastro algum cardápio. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 217)_
- [ ] **753.** O sistema deverá permitir o cadastro de cardápios pela nutricionista de acordo as especificações nutricionais encontradas na tabela TACO e as necessidades calóricas dos estudantes, possibilitando informar o nome da cardápio, a descrição,a modalidade de ensino, a faixa etária, o período inicial e final, a quantidade de estudantes, se é individualizado, e vinculá-lo a uma ou mais preparações divididas entre café da manhã, almoço, lanche e jantar. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 217)_
- [ ] **754.** O sistema deverá permitir montar diversos tipos de cardápios de tal forma poder ser reaproveitado de acordo os tipos de refeições: café da manha, almoço, café datar de, jantar. _(TR, p. 217)_
- [ ] **755.** O sistema deverá permitir cadastrar cardápios diferenciados e individualizados para estudantes com restrição alimentar. _(TR, p. 217)_
- [ ] **756.** O sistema deverá permitir o registro de cardápio por período. _(TR, p. 217)_
- [ ] **757.** O sistema deverá bloquear a exclusão de preparações quando elas possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando usuário logado tiver permissão para realizá-la. _(TR, p. 217)_
- [ ] **758.** O sistema deverá permitir a disponibilização de cardápios para uma ou mais escolas da rede de forma prática e dinâmica, onde seja possível incluir cada escola individualmente ou todas as escolas de vez. Ambiente Gerencial – Estoque _(TR, p. 217)_
- [ ] **759.** O sistema deverá permitir o cadastro de armazéns, possibilitando informar o nome do armazém, a descrição e local para armazenamento. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 217)_
- [ ] **760.** O sistema deverá bloquear a exclusão de armazéns quando eles possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 218)_
- [ ] **761.** O sistema deverá permitir o cadastro de fabricantes/marcas, possibilitando informar o nome. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 218)_
- [ ] **762.** O sistema deverá bloquear a exclusão de fabricantes/marcas quando eles possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 218)_
- [ ] **763.** O sistema deverá permitir o cadastro de fornecedores, possibilitando informar a razão social, o CNPJ, o telefone, o e-mail de contato, o responsável e endereço completo. Também deverá permitir a alteração dos registros sempre que necessário, exceto a razão social e CNPJ, devido os registros serem compartilhados entre as unidades executoras. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 218)_
- [ ] **764.** O sistema deverá permitir o cadastro de produtos, possibilitando informar a descrição, a unidade de medida, o peso/volume unitário e vinculá-la a uma tabela alimentar. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 218)_
- [ ] **765.** O sistema deverá bloquear a exclusão de produtos quando eles possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 218)_
- [ ] **766.** O sistema deverá permitir o cadastro de entrada de produtos, possibilitando informara data de entrada, o armazém, o produto, a quantidade, o responsável pelo recebimento, a observação, os dados do fabricante (lote, data de fabricação e data de validade) e os dados do fornecimento (forma de aquisição, fornecedor, valor e documento). Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 218)_
- [ ] **767.** O sistema deverá bloquear a exclusão de entrada de produtos quando as entradas possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 219)_
- [ ] **768.** O sistema deverá permitir o registro da saída de produtos, possibilitando informar ad ata da saída, a escolar que foi destinada, a quantidade para retirada, o responsável pela entrega, o responsável pela retirada e as observações. Na tela de saída, deverá listar os dados da entrada no estoque, os dados da fabricação e a quantidade disponível. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 219)_
- [ ] **769.** O sistema deverá bloquear a exclusão dos registros de saída de produtos quando os registros de saída possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 219)_
- [ ] **770.** O sistema deverá permitir o registro de pedido de produtos, possibilitando despachar o plano de aplicação. Na tela de pedido de produtos, deverá listar as informações dos itens do pedido e data de envio para aprovação. Também deverá permitir a alteração do despacho. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. Ambiente Gerencial – Consultas _(TR, p. 219)_
- [ ] **771.** O sistema deverá permitir a consulta do calendário de cardápios por mês, por semana e por dia. Também deverá permitir a consulta dos detalhes de cada cardápio. _(TR, p. 219)_
- [ ] **772.** O sistema deverá possuir uma tela para a consulta de saldo de produtos em estoque, possibilitando filtrar os registros por armazém e/ou pela descrição do produto para listar o total adquirido, o total retirado e saldo em estoque. Deverá permitir também a exportação de um relatório em PDF e XLS com a listagem desses produtos. Ambiente Escola – Gestão _(TR, p. 219)_
- [ ] **773.** O sistema deverá possuir uma tela com a listagem dos estudantes que possuem restrição alimentar, possibilitando filtrar a listagem pelo nome do estudante, pelo período e pela descrição da restrição alimentar. Também deverá permitir baixar o laudo quando anexado e exportar de um relatório em PDF e XLS com a listagem desses estudantes. _(TR, p. 220)_
- [ ] **774.** O sistema deverá permitir o registro de refeições servidas de cada cardápio, possibilitando informar a quantidade e observações. Na tela, deverá listar também a data do cardápio, o turno, o tipo de refeição, a quantidade prevista, forma de preparo e os dados gerais do cardápio. Ambiente Escola – Estoque _(TR, p. 220)_
- [ ] **775.** O sistema deverá permitir o cadastro de armazéns, possibilitando informar o nome do armazém, a descrição e local para armazenamento. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 220)_
- [ ] **776.** O sistema deverá bloquear a exclusão de armazéns quando eles possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 220)_
- [ ] **777.** O sistema deverá permitir o cadastro de fabricantes/marcas, possibilitando informar o nome. Também deverá permitir desativar e alterar o registro sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 220)_
- [ ] **778.** O sistema deverá bloquear a exclusão de fabricantes/marcas quando eles possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 220)_
- [ ] **779.** O sistema deverá permitir o cadastro de fornecedores, possibilitando informar a razão social, o CNPJ, o telefone, o e-mail de contato, o responsável e endereço completo. Também deverá permitir a alteração dos registros sempre que necessário, exceto a razão social e CNPJ, devido os registros serem compartilhados entre as unidades executoras. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 220)_
- [ ] **780.** O sistema deverá permitir o cadastro de produtos, possibilitando informar a descrição, a unidade de medida, o peso/volume unitário e vinculá-los a uma tabela alimentar. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 221)_
- [ ] **781.** O sistema deverá bloquear a exclusão de produtos quando eles possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando ou suário logado tiver permissão para realizá-la. _(TR, p. 221)_
- [ ] **782.** O sistema deverá permitir registrar os repasses de produtos com a quantidade repassada, possibilitando informar os dados de entrada no estoque (Data, armazém e observação) e os dados de fabricação (fabricante, lote, data de fabricação e data de validade). _(TR, p. 221)_
- [ ] **783.** O sistema deverá possibilitar que cada unidade escolar da rede faça o controle individual do seu estoque de alimentos recebidos para a merenda escolar. _(TR, p. 221)_
- [ ] **784.** O sistema deverá permitir o cadastro de entrada de produtos, possibilitando informar a data de entrada, o armazém, o produto, a quantidade, o responsável pelo recebimento, a observação, os dados de fabricação (lote, data de fabricação e data de validade), e os dados do fornecimento (forma de aquisição, fornecedor, valor e documento). Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 221)_
- [ ] **785.** O sistema deverá bloquear a exclusão de entrada de produtos quando eles possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 221)_
- [ ] **786.** O sistema deverá permitir o registro da saída de produtos, possibilitando informar a data da saída, a escola para qual foi destinada, a quantidade para retirada, o responsável pela entrega, o responsável pela retirada e as observações. Na tela de saída, deverá listar os dados da entrada no estoque, os dados da fabricação e a quantidade disponível. Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 221)_
- [ ] **787.** O sistema deverá bloquear a exclusão dos registro de saída de produtos quando eles possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 222)_
- [ ] **788.** O sistema deverá permitir o controle dos pedidos de produtos, possibilitando registrar observações para cada produto da listagem disponibilizada pelo responsável pelo registro de pedidos das escolas. _(TR, p. 222)_
- [ ] **789.** O sistema deverá permitir o registro do abastecimento de gás nas escolas, possibilitando informar os dados gerais (data do recebimento, tipo de botijão, quantidade recebida, quantidade consumida, responsável pelo recebimento e observações). Também deverá permitir a alteração dos registros sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 222)_
- [ ] **790.** O sistema deverá bloquear a exclusão dos registros de abastecimento de gás quando possuírem dependências com outras tabelas. A exclusão deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. Ambiente Escola – Consultas _(TR, p. 222)_
- [ ] **791.** O sistema deverá permitir a consulta do calendário de cardápios por mês, por semana e por dia. Também deverá permitir a consulta dos detalhes de cada cardápio. _(TR, p. 222)_
- [ ] **792.** O sistema deverá possuir uma tela para a consulta de saldo de produtos em estoque, possibilitando filtrar os registros por armazém e/ou pela descrição do produto para listar o total adquirido, o total retirado e saldo em estoque. Deverá permitir também a exportação de um relatório em PDF e XLS com a listagem desses produtos. _(TR, p. 222)_
- [ ] **793.** O sistema deverá possuir uma tela para consultar a validade de produtos em estoque, possibilitando filtrar os registros por armazém, pela descrição do produto por lote, pelo número de dias restantes para validade e pela situação, listando o total adquirido, o total retirado, o saldo em estoque e a data de validade. Deverá permitir também a exportação de um relatório em PDF e XLS com a listagem desses estudantes. Ambiente Escola – Relatórios _(TR, p. 223)_
- [ ] **794.** O sistema deverá permitir a geração de relatórios com saldo de produtos em estoque. _(TR, p. 223)_
- [ ] **795.** O sistema deverá permitir a geração de relatórios com o mapa de merenda por modalidade de ensino, por mês, com a quantidade de estudantes, listando a discriminação dos produtos, a quantidade em estoque, a quantidade recebida, a quantidade consumida e o estoque final. _(TR, p. 223)_
- [ ] **796.** O sistema deverá permitir a geração de relatórios com o cardápio geral e individual/especial por mês, listando em cada dia da semana a receita a ser preparada com a relação dos ingredientes. Deve listar também as observações, quando registradas. Gestão de Recursos Financeiros Ambiente Administrativo – Usuários _(TR, p. 223)_
- [ ] **797.** O sistema deverá permitir o cadastro de grupos de usuários, possibilitando informar o nome, a descrição e as permissões de acesso. _(TR, p. 223)_
- [ ] **798.** O sistema deverá permitir a alteração do cadastro de grupos de usuários sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 223)_
- [ ] **799.** O sistema deverá permitir o cadastro de pessoas, possibilitando informar o nome completo, o CPF, o telefone, o e-mail e o endereço completo. _(TR, p. 223)_
- [ ] **800.** O sistema deverá permitir o cadastro de usuários das filiais, possibilitando vinculá-los a uma filial específica, informar o nome e os dados de acesso (grupo de usuários, login e senha). _(TR, p. 223)_
- [ ] **801.** O sistema deverá permitir a alteração do cadastro de usuários das filiais sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 224)_
- [ ] **802.** O sistema deverá permitir o cadastro de usuários das escolas, possibilitando vinculá-los a uma escola específica, informar o nome e os dados de acesso (grupo de usuários, login e senha). _(TR, p. 224)_
- [ ] **803.** O sistema deverá permitir a alteração do cadastro de usuários das escolas sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 224)_
- [ ] **804.** O sistema deverá permitir o cadastro de administradores do sistema, sendo possível informar o nome completo, o usuário, a senha e o status. _(TR, p. 224)_
- [ ] **805.** O sistema deverá permitir a alteração do cadastro de administradores do sistema sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 224)_
- [ ] **806.** O sistema deverá permitir a exportação de um relatório em PDF e XLS com a relação de administradores do sistema, incluindo o status, o nome completo, o nome do usuário, a data e a hora da emissão. Ambiente Gerencial – Gerencial _(TR, p. 224)_
- [ ] **807.** O sistema deverá permitir configurar alertas para informar a quantidade de dias restantes para o fim do conselho escolar e para informar a porcentagem restante de recursos disponíveis. _(TR, p. 224)_
- [ ] **808.** O sistema deverá permitir a alteração da configuração de alertas sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. Ambiente Gerencial – Caixa _(TR, p. 224)_
- [ ] **809.** O sistema deverá permitir o cadastro de contas bancárias, possibilitando informar o nome do banco, o código do banco, o número da agência, o número da conta, a data de início da conta, o saldo inicial e o status da conta. _(TR, p. 225)_
- [ ] **810.** O sistema deverá bloquear a exclusão de contas para manter o histórico. No entanto, os usuários que tenham permissão para tal ação podem desativá-las quando necessário. _(TR, p. 225)_
- [ ] **811.** O sistema deverá permitir a alteração do cadastro de contas bancárias sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 225)_
- [ ] **812.** O sistema deverá permitir a visualização na tela de cadastro de contas bancárias de um painel “dashboard” com gráficos que listem a quantidade de contas ativas, o saldo por conta e o saldo total. _(TR, p. 225)_
- [ ] **813.** O sistema deverá permitir o cadastro dos lançamentos bancários, possibilitando informar a conta, a data da transação, o valor, o tipo de transação e a descrição. _(TR, p. 225)_
- [ ] **814.** O sistema deverá bloquear o registro de lançamentos em contas inativas para que não sejam contabilizados no saldo. _(TR, p. 225)_
- [ ] **815.** O sistema deverá permitir a alteração dos lançamentos bancários sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 225)_
- [ ] **816.** O sistema deverá permitir a exportação de um relatório em PDF e XLS com a listagem dos lançamentos bancários, incluindo a data da transação, a conta, o valor, o tipo de transação, a descrição, o usuário que emitiu e a data e a hora da emissão. _(TR, p. 225)_
- [ ] **817.** O sistema deverá permitir a importação dos extratos bancários no formato OFX para cada conta cadastrada. _(TR, p. 225)_
- [ ] **818.** O sistema deverá possibilitar a exportação de um relatório em PDF e XLS com a listagem dos registros dos extratos bancários. Ambiente Gerencial – Exercício _(TR, p. 225)_
- [ ] **819.** O sistema deverá permitir o cadastro de agendas, possibilitando a informação do ano de exercício, o período com data inicial e final, o prazo limite para registro e a definição do status da agenda. _(TR, p. 226)_
- [ ] **820.** O sistema deverá bloquear a exclusão de agendas para preservar o histórico. No entanto, os usuários que tenham permissão para tal ação podem desativá-las quando necessário. _(TR, p. 226)_
- [ ] **821.** O sistema deverá permitir a alteração do cadastro das agendas sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão para realizá-la. _(TR, p. 226)_
- [ ] **822.** O sistema deverá permitir a visualização na tela de cadastro de agendas de um painel “dashboard”. Esse painel deverá listar as agendas do ano atual, incluindo informações como a situação, ano do exercício, período do exercício, início do período, fim do período e prazo para registro. _(TR, p. 226)_
- [ ] **823.** O sistema deverá permitir o cadastro de repasses, possibilitando a informação da agenda, conta, data do repasse, valor, fonte (federal, estadual ou municipal) e forma de pagamento. _(TR, p. 226)_
- [ ] **824.** O sistema deverá permitir a alteração do cadastro dos repasses sempre que necessário. Essa alteração deverá ser permitida apenas quando o usuário logado tiver permissão par realizá-la. _(TR, p. 226)_
- [ ] **825.** O sistema deverá permitir a exclusão de repasses quando o usuário logado tiver permissão para realizá-la. _(TR, p. 226)_
- [ ] **826.** O sistema deverá permitir a visualização na tela de cadastro de repasses de um painel “dashboard” com gráficos. Esses gráficos devem listar a soma dos recursos repassados por mês, diferenciando a fonte do repasse por cores. _(TR, p. 226)_
- [ ] **827.** O sistema deverá permitir o despacho dos planos de aplicação enviados pelas unidades executoras e possibilitar a informação do status do despacho entre as opções: aguardando, aprovado, cancelado e reprovado. Também deverá listar o registro da data e da hora em que foi analisado. _(TR, p. 226)_
- [ ] **828.** O sistema deverá permitir a exportação de um relatório em PDF e XLS com a listagem dos registros dos planos de aplicação remetidos pelas unidades executoras, incluindo a situação atual, a agenda, a escola, o número da pesquisa de preços e a data de envio pela unidade. Ambiente Gerencial – Consultas _(TR, p. 226)_
- [ ] **829.** O sistema deverá permitir a visualização em tela dos planejamentos de recursos registrados pelas escolas, listando a agenda, a escola, o valor total do recurso, o valor restante para capital, a porcentagem restante para capital, o valor restante para custeio e a porcentagem restante para custeio. _(TR, p. 227)_
- [ ] **830.** O sistema deverá permitir a visualização na tela de planejamentos de recursos de um painel “dashboard”. Esse painel deverá listar o capital, o custeio, o valor restante para capital e o valor restante para custeio. Ambiente Escola – Conselho _(TR, p. 227)_
- [ ] **831.** O sistema deverá permitir o cadastro de membros do conselho com as seguintes informações: nome completo, número do CPF, cargo, data de início e data de término do mandato. _(TR, p. 227)_
- [ ] **832.** O sistema deverá permitir a atualização do cadastro de membros do conselho sempre que necessário, mas apenas quando o usuário logado tiver permissão para realizar essa modificação. _(TR, p. 227)_
- [ ] **833.** O sistema deverá permitir a visualização na tela de cadastro de membros do conselho de um “dashboard”. Esse painel deverá listar os cargos, o nome completo do membro, o CPF, a data de início e a data de término do mandato. Ambiente Escola – Caixa _(TR, p. 227)_
- [ ] **834.** O sistema deverá permitir o cadastro de contas bancárias, possibilitando informar o nome do banco, o código do banco, o número da agência, o número da conta, a data de início da conta, o saldo inicial e o status da conta _(TR, p. 227)_
- [ ] **835.** O sistema deverá bloquear a exclusão de contas para manter o histórico, mas permitir que elas sejam desativadas. _(TR, p. 227)_
- [ ] **836.** O sistema deverá permitir a visualização na tela de cadastro de membros do conselho de um painel “dashboard” com gráficos listando a quantidade de contas ativas, o saldo por conta e o saldo total. _(TR, p. 228)_
- [ ] **837.** O sistema deverá permitir que os lançamentos bancários sejam realizados informando a conta, a data da transação, o valor, o tipo de transação e a descrição _(TR, p. 228)_
- [ ] **838.** O sistema deverá bloquear que os lançamentos registrados em contas inativas sejam contabilizados no saldo. _(TR, p. 228)_
- [ ] **839.** O sistema deverá permitir a importação dos extratos bancários no formato OFX para cada conta cadastrada. _(TR, p. 228)_
- [ ] **840.** O sistema deverá possibilitar a exportação de um relatório em PDF e XLS com a listagem dos registros de extratos bancários. _(TR, p. 228)_
- [ ] **841.** O sistema deverá permitir o cadastro de talões de cheques, possibilitando informar a conta, o número da primeira folha, o número da última folha, a referência e a descrição. Automaticamente, todas as folhas do talão também serão cadastradas. _(TR, p. 228)_
- [ ] **842.** O sistema deverá permitir apenas a exclusão de talões de cheques quando o usuário logado estiver permissão para realizá-la. Ao excluir um talão de cheques, automaticamente suas folhas cadastradas e suas situações também serão excluídas. _(TR, p. 228)_
- [ ] **843.** O sistema deverá possibilitar a exportação de um relatório em PDF e XLS com as informações (Conta, Referência, Número da Primeira Folha, Número da Última Folha e Descrição) referentes aos talões de cheques cadastrados. _(TR, p. 228)_
- [ ] **844.** O sistema deverá permitir a utilização das folhas de cheques, possibilitando informar a situação entre as opções: aberto, utilizado e cancelado, a data e a situação descritiva. Quando o uso do cheque é registrado, também deverá ser registrado em lançamentos bancários para atualização do saldo. Ambiente Escola – Recursos _(TR, p. 228)_
- [ ] **845.** O sistema deverá permitir o cadastro do planejamento de recursos, possibilitando selecionar a agenda, o valor total do recurso, o percentual de capital e o percentual de custeio. Ao cadastrar, apenas as agendas ativadas pela filial e sem planejamento pela escola estarão disponíveis. _(TR, p. 229)_
- [ ] **846.** O sistema deverá permitir a visualização na tela de planejamentos de recursos um painel “dashboard”. Esse painel deverá listar o capital, o custeio, o valor restante para capital e o valor restante para custeio. Ambiente Escola – Pesquisa de preços _(TR, p. 229)_
- [ ] **847.** O sistema deverá permitir o cadastro de fornecedores, possibilitando informar a razão social, o CNPJ, o nome do responsável para contato, o número de telefone, o número de celular, o e-mail e o endereço completo. O cadastro de fornecedores deverá ser compartilhado entre as unidades executoras e possibilitar a consulta antes de cadastro, devido aos CNPJ serem únicos. _(TR, p. 229)_
- [ ] **848.** A atualização do cadastro dos fornecedores deverá ser realizada apenas quando o usuário logado tiver permissão. A atualização deverá ser apenas do contato e do endereço. Os campos de razão social e CNPJ devem ficar desabilitados. _(TR, p. 229)_
- [ ] **849.** O sistema deverá permitir o registro de preços, possibilitando informar o número de pesquisa, a descrição e vincular os produtos e/ou serviços com a descrição, a unidade de medida e a quantidade. Também deverá ser possível exportar a listagem de produtos e/ou serviços incluídos no registro de preços para envio aos fornecedores, a fim de que os mesmos possam informar seus valores para cada item. _(TR, p. 229)_
- [ ] **850.** O sistema deverá permitir que apenas as pesquisas de preços em aberto sejam passíveis de alteração do número da pesquisa e da descrição, bem como da exclusão de produtos e/ou serviços incluídos. Esse tipo de ação deverá ser executada apenas por usuários logados que tenham permissão. _(TR, p. 229)_
- [ ] **851.** O sistema deverá possibilitar a exportação de um relatório em PDF e XLS com a listagem das pesquisas de preços cadastradas com número de referência e data do cadastro. _(TR, p. 229)_
- [ ] **852.** O sistema deverá permitir o cadastro de orçamentos, possibilitando selecionar a pesquisa de preço e o fornecedor previamente cadastrados. Além disso, deverá ser possível informar a data do orçamento, o número de referência e a observação. Também deverá ser permitir importar uma planilha de orçamento com a listagem de produtos. Essa planilha deverá seguir o modelo da pesquisa de preços exportado para XLS, garantindo que a importação dos produtos e serviços seja feita corretamente. _(TR, p. 230)_
- [ ] **853.** O sistema deverá permitir o cadastro de cotações, possibilitando selecionar a pesquisa de preço e o orçamento previamente cadastrados. Além disso, deverá ser possível consultar os itens contados antes de realizar uma nova cotação, para evitar sobrescrição da cotação existente. Ambiente Escola – Plano de Aplicação _(TR, p. 230)_
- [ ] **854.** O sistema deverá permitir o cadastro de planos de aplicação, possibilitando selecionar a agenda, a pesquisa de preço informar o tipo de custo e a descrição. _(TR, p. 230)_
- [ ] **855.** O sistema deverá permitir que somente os planos de aplicação em aberto sejam realizados alteração por usuários logados com permissão a essa ação. _(TR, p. 230)_
- [ ] **856.** O sistema deverá permitir o envio dos planos de aplicação para análise e aprovação. _(TR, p. 230)_
- [ ] **857.** O sistema deverá permitir a consulta dos planos de aplicação enviados para aprovação, para que as unidades executoras tenham conhecimento do despacho da filial. Além disso, na tela de consulta, deverá ser possível visualizar a situação atual, a agenda, o número da pesquisa de preços, o tipo de custo, a descrição do plano, a data do envio pela unidade e a data do retorno pela secretaria. Ao clicar no plano enviado, também deverá ser possível visualizar as informações das pesquisas de preços (número de referência e descrição), as informações dos orçamentos (anexo, data do orçamento, número de referência, descrição, fornecedor e CNPJ do fornecedor) e as informações dos itens cotados (descrição do item, quantidade, valor unitário, valor total e fornecedor). Ambiente Escola – Consultas _(TR, p. 230)_
- [ ] **858.** O sistema deverá permitir a consulta dos bens adquiridos, possibilitando a visualização em tela do número da nota fiscal, a data do pagamento, as especificações dos bens, a quantidade, o valor unitário e valor total. Além disso, deverá permitir a exportação de um relatório em PDF e XLS com essas informações. _(TR, p. 231)_
- [ ] **859.** O sistema deverá permitir a consulta dos recursos utilizados, possibilitando a visualização em tela do número da pesquisa de preços, a data do orçamento, o número do orçamento, a descrição do orçamento, o tipo de custo, o valor pago, o fornecedor e número do CNPJ do fornecedor. Ambiente Escola – Relatórios _(TR, p. 231)_
- [ ] **860.** O sistema deverá permitir geração de relatórios de lançamentos bancários, possibilitando seleção do modelo, da opção e da conta. _(TR, p. 231)_
- [ ] **861.** O sistema deverá permitir cadastro de legendas para identificar os relatórios, facilitando o entendimento para todos os usuários do sistema. _(TR, p. 231)_
### Transporte Escolar – Pessoas _(p. 231)_

- [ ] **862.** O sistema deverá permite o controle de pessoas, sendo possível informar os dados gerais (o tipo de pessoa física – CPF ou jurídica – CNPJ, o nome, o RG, o PIS e a data de nascimento), o contato (e-mail, telefone fixo, telefone celular e site) o endereço completo com registro estadual, registro municipal, latitude, longitude e observação. _(TR, p. 231)_
- [ ] **863.** O sistema deverá permite realizar a pesquisa do registro de pessoas com filtros por funcionário, por e-mail, por telefone celular e por tipo de pessoa. _(TR, p. 231)_
### Transporte Escolar – Motoristas _(p. 231)_

- [ ] **864.** O sistema deverá permitir o controle de motoristas, sendo possível informar os dados gerais (nome, CPF, RG, data de nascimento, e-mail e telefone celular, status, matrícula, cartão de identificação, setor e data de desligamento) o endereço completo com latitude e longitude, os dados da carteira de habilitação e o registro de observação. _(TR, p. 231)_
- [ ] **865.** O sistema deverá permitir realizar a pesquisa do registro dos motoristas com filtros por funcionário, por categoria, por órgão expedidor e por habilitação _(TR, p. 232)_
- [ ] **866.** O sistema deverá possuir histórico de setores que o motorista trabalhou com data; _(TR, p. 232)_
### Transporte Escolar – Veículos _(p. 232)_

- [ ] **867.** O sistema deverá permitir realizar o controle de veículos sendo possível informar no cadastro o prefixo, a placa, a velocidade máxima, os dados gerais (se é público, transporte escolar, modelo, ícone, cor, carroceria, chassi, ano de fabricação, ano de modelo e setor), o marcador e consumo (tipo de marcador e consumo médio). _(TR, p. 232)_
- [ ] **868.** O sistema deverá permitir realizar a pesquisa do registro de veículos com filtros por placa, por status e por modelo. _(TR, p. 232)_
### Transporte Escolar – Abastecimento _(p. 232)_

- [ ] **869.** O sistema deverá permitir o controle de abastecimento de veículos, sendo possível informar o veículo com prefixo, a data, a hora, a jornada, o motorista, o tipo de combustível, o valor unitário, a quantidade de litros, o valor total, o odômetro e o registro de observação. _(TR, p. 232)_
- [ ] **870.** O sistema deverá permitir realizar a pesquisa do registro de abastecimentos com filtros por data, por veículo, por combustível, por valor e por motorista. Transporte Escolar – Jornada, rotas, pontos e passageiros _(TR, p. 232)_
- [ ] **871.** O sistema deverá permitir o controle de jornadas, sendo possível informar o nome da jornada, o motorista, a rota, o local de origem e destino, o número de passageiros, a data inicial, a data final e o registro de observação. _(TR, p. 232)_
- [ ] **872.** O sistema deverá permitir realizar a pesquisa do registro de jornadas com filtros por nome, por veículo, por motorista, por origem e por destino. _(TR, p. 233)_
- [ ] **873.** O sistema deverá permitir o cadastro de pontos sendo possível informar o nome, os passageiros, o tempo de espera, o embarque/desembarque, a latitude e a longitude. _(TR, p. 233)_
- [ ] **874.** O sistema deverá permitir o cadastro de rotas sendo possível informar o nome, a velocidade média, tempo de viagem, a distância total percorrida, os pontos e os passageiros. _(TR, p. 233)_
### Transporte Escolar – Rotas recorrentes _(p. 233)_

- [ ] **875.** O sistema deverá permitir realizar o controle, planejamento e execução de rotas recorrentes sendo possível informar o nome, o veículo, a rota, a recorrência inicial e final, ícone para marcar a opção de criar jornadas automaticamente, o motorista, os dias da semana com hora inicial e hora final. _(TR, p. 233)_
- [ ] **876.** O sistema deverá permitir realizar a pesquisa do registro de rotas recorrentes com filtros por nome, por veículo, por rota, por recorrência inicial e final. _(TR, p. 233)_
### Transporte Escolar _(p. 233)_

- [ ] **877.** O sistema deverá permitir realizar o controle de transportes escolar sendo possível informar a escola com endereço (bairro), a rota, o veículo, o ano escolar, o mês de referência, o turno, o número de passageiros ao mês, a distância, a quantidades de dias rodados no mês, a data da inclusão, a data da desativação e observação. _(TR, p. 233)_
- [ ] **878.** O sistema deverá permitir realizar a pesquisa do registro de transporte escolar com filtros por escola, por veículo, por data de inclusão. _(TR, p. 233)_
### Transporte Escolar – Rastreamento _(p. 233)_

- [ ] **879.** O sistema deverá permitir gerar diário de movimentação sobre o mapa por veículo com data e hora inicial e data e hora final; _(TR, p. 233)_
- [ ] **880.** O sistema deverá possuir tela de monitoramento de veículos que permite abri o street view, compartilhar a localização do veículo, visualizar as cercas do veículo, ancorar o veículo, seguir o veículo e visualizar as estatísticas. Permite também visualizar a relação de veículos ligado, desligado, em alerta, em sleep e offline. _(TR, p. 234)_
- [ ] **881.** O sistema deverá possuir tela de notificações e alertas que permite filtro por data, por placa, por modelo de veículo e por notificação; _(TR, p. 234)_
- [ ] **882.** O sistema deverá permitir o cadastro de pontos de referência sendo possível informar o nome, o veículo, o ponto, a categoria de ponto de referência (hospital, hospedagem, posto de gasolina entre outros), latitude e longitude. _(TR, p. 234)_
### Transporte Escolar – Relatórios _(p. 234)_

- [ ] **883.** O sistema deverá possuir listagem de notificações e alertas e procedimentos de tratativas, efetuados pela central de monitoramentos; _(TR, p. 234)_
- [ ] **884.** O sistema deverá possuir relatório de atividades dos veículos com cálculos de tempo e distância de movimentação; _(TR, p. 234)_
- [ ] **885.** O sistema deverá possuir relatório de comportamento dos motoristas com a listagem de eventos/alertas associados ao comportamento; _(TR, p. 234)_
- [ ] **886.** O sistema deverá possuir relatório de diário de paradas dos veículos com a listagem de pontos de referências em que o veículo estacionou, com as datas e horários de chegada e saída; _(TR, p. 234)_
- [ ] **887.** O sistema deverá possuir relatório de estradas niveladas por período com os pontos em que um ou mais veículos percorreram durante um período com a velocidade inferior a 10 km por hora; _(TR, p. 234)_
- [ ] **888.** O sistema deverá possuir relatório de excesso de velocidade com a listagem dos momentos em que os veículos ultrapassaram o limite de velocidade configurado pelo cliente; _(TR, p. 234)_
- [ ] **889.** O sistema deverá possuir relatório de histórico de posições registrados pelos veículos; _(TR, p. 234)_
- [ ] **890.** O sistema deverá possuir relatório dos itens de rastreamento do cliente; _(TR, p. 234)_
- [ ] **891.** O sistema deverá possuir relatório com a listagem de veículos do cliente com suas características; _(TR, p. 235)_
- [ ] **892.** O sistema deverá possuir relatório de manutenção/abastecimento com os custos de manutenções e abastecimentos; _(TR, p. 235)_
- [ ] **893.** O sistema deverá possuir relatório de média de consumo por abastecimento; _(TR, p. 235)_
- [ ] **894.** O sistema deverá possuir relatório com a movimentação em um final de semana listagem de movimentações realizadas no sábado e no domingo; _(TR, p. 235)_
- [ ] **895.** O sistema deverá possuir relatório de movimentação por jornada com as datas e o km percorrido; _(TR, p. 235)_
- [ ] **896.** O sistema deverá possuir relatório de movimentação fora do horário com os pontos que o veículo registrou ignição ligada em horário não permitido; _(TR, p. 235)_
- [ ] **897.** O sistema deverá possuir listagem de notificações geradas por motorista; _(TR, p. 235)_
- [ ] **898.** O sistema deverá possuir relatório com a lista de quilômetros percorridos com a listagem total (aproximado) de quilômetros percorridos por veículo; _(TR, p. 235)_
- [ ] **899.** Relatório de quilômetros percorridos (cerca) com a listagem total (aproximado) de quilômetros percorridos por veículo dentro e fora de uma cerca; _(TR, p. 235)_
- [ ] **900.** O sistema deverá possuir relatório de tempo de parada (estacionado) com os registros dos intervalos em que o veículo ficou estacionado (desligado); _(TR, p. 235)_
- [ ] **901.** O sistema deverá possuir relatório de tempo ocioso que calcula o tempo em que o veículo ficou ligado e sem se movimentar; _(TR, p. 235)_
- [ ] **902.** O sistema deverá possuir relatório última posição transmitida que lista as últimas posições transmitidas pelos veículos do cliente; _(TR, p. 235)_
- [ ] **903.** O sistema deverá possuir relatório utilização do horímetro que lista as horas trabalhadas por veículo no período informado; _(TR, p. 235)_
- [ ] **904.** O sistema deverá possuir relatórios veículos offline que lista os veículos que estão sem transmitir posições a um determinado período; _(TR, p. 235)_
- [ ] **905.** O sistema deverá possuir relatório velocidade e nível de bateria com o histórico de velocidade nível de bateria do veículo. _(TR, p. 235)_
### Portal Interativo _(p. 236)_

- [ ] **906.** O portal interativo deverá ser executado em navegadores de internet, ser responsivo e funcionar em SO Windows e Linux Educacional. _(TR, p. 236)_
- [ ] **907.** O portal interativo deverá ser um site seguro, adaptado para fornecer acessibilidade para pessoas com deficiências (não inclusos hardware para deficiência motora). _(TR, p. 236)_
- [ ] **908.** O portal interativo deverá prover a hospedagem em servidor web por 24 horas por dia, 7 dias por semana e todos os dias do mês. _(TR, p. 236)_
- [ ] **909.** O portal interativo deverá ter equipe especializada em prover a instalação, manutenção e ser responsável por manter as atualizações de versão disponíveis, sem interferência de atualização a ser feita pelo usuário final. _(TR, p. 236)_
- [ ] **910.** O portal interativo deverá possuir jogos digitais para o Ensino Fundamental I, para as disciplinas regentes: Língua Portuguesa, Matemática, Ciências, História, Geografia, Arte, Educação Física e no mínimo 4 línguas estrangeiras (tendo em vista que cada ano pode ser mudado o tipo de língua pelo município, alternando entre inglês, espanhol, italiano e alemão). _(TR, p. 236)_
- [ ] **911.** O portal interativo deverá conter ajuda online via atendente remoto online, telefone, e-mail e atendimento via sistema de cadastro de solicitação pelos usuários da contratante. _(TR, p. 236)_
- [ ] **912.** O portal interativo deverá ter prazo máximo de 48 horas para responder às solicitações após a abertura do chamado técnico. _(TR, p. 236)_
- [ ] **913.** A plataforma contratada deverá manter histórico dos dados de entrada e saída dos usuários (estudantes e professores), que deverão ficar registrados com o IP do dispositivo acessado, login, data e hora. _(TR, p. 236)_
- [ ] **914.** O portal interativo deverá ter login diferenciado para estudante, professor e gestor. _(TR, p. 236)_
- [ ] **915.** O portal interativo deverá dispor de sugestão de jogos por professores da rede para a equipe de desenvolvimento da plataforma e obter retornos de feedbacks de viabilidade. _(TR, p. 236)_
- [ ] **916.** O portal interativo deverá listar, para o estudante logado, a opção de foto, escola, turma e turno que o estudante está cursando. _(TR, p. 237)_
- [ ] **917.** O portal interativo deverá ser intuitivo, com menu de ajuda, opções de reiniciar o jogo, voltar ao jogo ou sair do jogo. _(TR, p. 237)_
- [ ] **918.** O portal interativo deverá ter, no menu principal dos jogos, as informações de orientação de como jogar e/ou tutorial, para o estudante que tiver dúvidas ao logar na plataforma. _(TR, p. 237)_
- [ ] **919.** O portal interativo deverá ter, na interface gráfica, sistema de pontuação perante acertos e perdas, bem como temporizador. _(TR, p. 237)_
- [ ] **920.** A plataforma deverá ter jogos para conteúdos das disciplinas de Português, Matemática, Ciências, História, Geografia, Arte, Educação Física e línguas estrangeiras (inglês, espanhol, italiano, alemão), baseados na BNCC dos anos de 1º ao 5º ano do Ensino Fundamental I. _(TR, p. 237)_
- [ ] **921.** O portal interativo deverá ser um ambiente que possa configurar os jogos de acordo com a intenção do professor de liberação a cada turma. Estudante _(TR, p. 237)_
- [ ] **922.** O portal interativo deverá conter, de forma opcional, a utilização de pontuação por integração com o sistema de educação, utilizando o reconhecimento de frequência e notas para construção do Ranking. _(TR, p. 237)_
- [ ] **923.** O portal interativo deverá possibilitar ao estudante incluir sua foto no perfil e/ou a utilização de um avatar, sendo possível sua alteração entre os modelos existentes. _(TR, p. 237)_
- [ ] **924.** O portal interativo deverá ser separado por disciplina, sendo sempre levado em consideração a disciplina que mais predomina na rotina do jogo. _(TR, p. 237)_
- [ ] **925.** O portal interativo deverá fornecer o usuário e senha do estudante de acordo com o CPF cadastrado na sua matrícula e a senha padrão serão os quatro primeiros dígitos do CPF. _(TR, p. 237)_
- [ ] **926.** O portal interativo deverá permitir ao estudante a visualização do Ranking da sua turma, sendo possível filtrar por disciplinas. _(TR, p. 237)_
- [ ] **927.** O portal interativo deverá apresentar os jogos por disciplina, sempre trazendo a informação do nome do jogo, descrição e tipo do jogo. _(TR, p. 238)_
- [ ] **928.** O portal interativo deverá apresentar as informações de escola, turma e turno do estudante para conferência de acesso. Professor _(TR, p. 238)_
- [ ] **929.** O portal interativo deverá fornecer usuário e senha ao professor de acordo com o CPF informado em seu cadastro e a senha padrão será os quatro primeiros dígitos do CPF. _(TR, p. 238)_
- [ ] **930.** O portal interativo deverá possibilitar ao professor incluir sua foto no perfil e/ou a utilização de um avatar, sendo possível sua alteração entre os modelos existentes. _(TR, p. 238)_
- [ ] **931.** O portal interativo deverá apresentar um dashboard com gráficos que possibilitem ao professor analisar os acessos à plataforma por turmas. _(TR, p. 238)_
- [ ] **932.** O portal interativo deverá apresentar um dashboard com gráficos que possibilitem ao professor analisar os acessos à plataforma por jogos mais jogados. _(TR, p. 238)_
- [ ] **933.** O portal interativo deverá permitir que seja realizado no dashboard o filtro por disciplina para análise do gráfico. _(TR, p. 238)_
- [ ] **934.** O portal interativo deverá permitir que o professor altere seu acesso entre as turmas sem a necessidade de logar novamente no sistema. _(TR, p. 238)_
- [ ] **935.** O portal interativo deverá conter, de forma opcional, a utilização de pontuação por integração com o sistema de educação, utilizando o reconhecimento de frequência e notas para construção do Ranking. _(TR, p. 238)_
- [ ] **936.** O portal interativo deverá apresentar o Ranking permitindo a possibilidade de edição dos pontos por estudante, para eventos externos que a escola poderá realizar. _(TR, p. 238)_
- [ ] **937.** O portal interativo deverá permitir a liberação dos jogos por disciplina. _(TR, p. 238)_
- [ ] **938.** O portal interativo deverá permitir a habilitação ou desabilitação de todos os jogos ou individualmente, sem a necessidade de o fazer apenas um a um, quando assim desejar. _(TR, p. 238)_
- [ ] **939.** O portal interativo deverá apresentar os jogos por disciplina, sempre trazendo a informação do nome do jogo, descrição e tipo do jogo. _(TR, p. 239)_
- [ ] **940.** O portal interativo deverá conter a possibilidade de realizar solicitações, ou envio de mensagens sem a necessidade de utilizar um mecanismo externo. _(TR, p. 239)_
- [ ] **941.** O portal interativo deverá permitir a inclusão de novos jogos solicitados de acordo com a demanda dos professores. _(TR, p. 239)_
- [ ] **942.** O portal interativo deverá fornecer um modelo de solicitações de novo jogo para preenchimento e envio nas solicitações realizadas pelo professor. _(TR, p. 239)_
- [ ] **943.** O portal interativo deverá possuir um gerenciador de mensagens enviadas e recebidas entre o professor e a equipe desenvolvedora, para auxílio nas novas demandas solicitadas. _(TR, p. 239)_
- [ ] **944.** O gerenciador de mensagens deverá possuir as opções de escrever novas mensagens, visualizar as enviadas e recebidas, favoritar mensagens, excluir e visualizar as mensagens excluídas. _(TR, p. 239)_
- [ ] **945.** O portal interativo deverá possibilitar ao professor gerar e baixar relatórios para impressão. _(TR, p. 239)_
- [ ] **946.** O portal interativo deverá possibilitar gerar e imprimir o relatório de acesso à plataforma dos estudantes do professor de acordo com as datas de início e fim inseridas e a turma logada. _(TR, p. 239)_
- [ ] **947.** O portal interativo deverá possibilitar gerar e imprimir o relatório com a listagem de acertos e erros dos estudantes do professor com datas de início e fim inseridas e a turma logada. _(TR, p. 239)_
- [ ] **948.** A listagem de acertos e erros deverá conter filtro por disciplina e por jogo. Gestor _(TR, p. 239)_
- [ ] **949.** O portal interativo deverá fornecer acesso com usuário e senha ao gestor. _(TR, p. 239)_
- [ ] **950.** O portal interativo deverá possibilitar ao gestor incluir sua foto no perfil e/ou a utilização de um avatar, sendo possível sua alteração entre os modelos existentes. _(TR, p. 239)_
- [ ] **951.** O portal interativo deverá apresentar um dashboard com gráficos que possibilitem ao gestor analisar os acessos à plataforma por turmas e disciplinas. _(TR, p. 240)_
- [ ] **952.** O portal interativo deverá apresentar um dashboard com gráficos que possibilitem ao gestor analisar os acessos à plataforma por jogos mais jogados. _(TR, p. 240)_
- [ ] **953.** O portal interativo deverá permitir que seja realizado no dashboard o filtro por disciplina para análise do gráfico. _(TR, p. 240)_
- [ ] **954.** O portal interativo deverá permitir que o gestor altere seu acesso entre as turmas sem a necessidade de logar novamente no sistema. _(TR, p. 240)_
- [ ] **955.** O portal interativo deverá conter, de forma opcional, a utilização de pontuação por integração com o sistema de educação, utilizando o reconhecimento de frequência e notas para construção do Ranking. _(TR, p. 240)_
- [ ] **956.** O portal interativo deverá apresentar o Ranking permitindo a possibilidade de edição dos pontos por estudante, para eventos externos que a escola poderá realizar. _(TR, p. 240)_
- [ ] **957.** O portal interativo deverá permitir a liberação dos jogos por disciplina. _(TR, p. 240)_
- [ ] **958.** O portal interativo deverá permitir a habilitação ou desabilitação de todos os jogos ou individualmente, sem a necessidade de o fazer apenas um a um, quando assim desejar. _(TR, p. 240)_
- [ ] **959.** O portal interativo deverá apresentar os jogos por disciplina, sempre trazendo a informação do nome do jogo, descrição e tipo do jogo. _(TR, p. 240)_
- [ ] **960.** O portal interativo deverá conter a possibilidade de realizar solicitações ou envio de mensagens sem a necessidade de utilizar um mecanismo externo. _(TR, p. 240)_
- [ ] **961.** O portal interativo deverá permitir a inclusão de novos jogos solicitados de acordo com a demanda do gestor. _(TR, p. 240)_
- [ ] **962.** O portal interativo deverá fornecer um modelo de solicitações de novo jogo para preenchimento e envio nas solicitações realizadas pelo gestor. _(TR, p. 240)_
- [ ] **963.** O portal interativo deverá possuir um gerenciador de mensagens enviadas e recebidas entre o professor e a equipe desenvolvedora, para auxílio nas novas demandas solicitadas. _(TR, p. 241)_
- [ ] **964.** O gerenciador de mensagens deverá possuir as opções de escrever novas mensagens, visualizar as enviadas e recebidas, favoritar mensagens, excluir e visualizar as mensagens excluídas. _(TR, p. 241)_
- [ ] **965.** O portal interativo deverá possibilitar ao gestor gerar e baixar relatórios para impressão. _(TR, p. 241)_

## Saúde

> Caracteristicas Gerais _(TR, p. 241)_
- [ ] **1.** O software de gestão pública integrado (tipo erp) deverá ser um sistema separado em módulos “multiusuário”, “integrado”, “on-line”, permitindo o compartilhamento de arquivos de dados e informações de uso comum. _(TR, p. 241)_
- [ ] **2.** Ambiente Cliente-Servidor sob Protocolo de Rede TCP/IP e HTTP. _(TR, p. 241)_
- [ ] **3.** O software deverá ser desenvolvido em linguagem de programação Java para web, e trabalhar exclusivamente de forma on-line devido à todas unidades possuírem sinal de Internet (MÓDULOS WEB). _(TR, p. 241)_
- [ ] **4.** Permitir a hospedagem em servidor de aplicação não sendo necessário realizar atualizações de versões nas estações de trabalho. _(TR, p. 241)_
- [ ] **5.** Ser compatível com a versão do Java 6 ou superior. _(TR, p. 241)_
- [ ] **6.** Manter em cache as páginas e imagens nas estações de trabalhos e atualizálas automaticamente quando houver novas versões. _(TR, p. 241)_
- [ ] **7.** Ser compatível com os principais navegadores como (Mozilla Firefox, Internet Explorer e Google Chrome, Microsoft Edge, Opera). _(TR, p. 241)_
- [ ] **8.** Os MÓDULOS deverão Possibilitar instalação em servidores, Windows Servers, FreeBSD. _(TR, p. 241)_
- [ ] **9.** Funcionar em rede com servidores GNU/Linux, Windows Servers, FreeBSD e estações de trabalho com MÓDULO operacional Windows XP e suas versões posteriores ou GNU/Linux. _(TR, p. 241)_
- [ ] **10.** Permitir escolha da senha pessoal no primeiro acesso do usuário do sistema, as senhas devem ser armazenadas na forma criptografada, através de algoritmos próprios do MÓDULO, de tal forma que nunca sejam mostradas em telas de consulta, manutenção de cadastro de usuários ou tela de acesso ao MÓDULO. _(TR, p. 242)_
- [ ] **11.** Prover efetivo controle de acesso ao Módulo através do uso de senhas, permitindo bloqueio de acesso depois de determinado número de tentativas inválidas caso o identificador (login), e senha estiverem incorretos, e após a expiração do usuário, enviando email de alerta de segurança informando o motivo do bloqueio. _(TR, p. 242)_
- [ ] **12.** Possibilitar aos operadores com perfil de administração do sistema, redefinir a senha de outros operadores. _(TR, p. 242)_
- [ ] **13.** Possibilitar que o usuário altere, ou resete sua própria senha através da interface disponibilizada na tela de cadastro de usuário. _(TR, p. 242)_
- [ ] **14.** Disponibilizar a opção de recuperar a senha através da tela de login. O usuário que não se lembrar qual é a sua senha de acesso ao sistema, poderá utilizar esta opção para definir uma nova senha. O sistema exibirá um formulário solicitando o preenchimento do Login de acesso ao sistema, e o Email de acesso, informado no cadastro de usuário. O sistema enviará um link para o e-mail do usuário, apenas se todas as informações preenchidas estiverem corretas, de acordo com o seu cadastro no sistema. Ao acessar o e-mail e clicar no link enviado pelo sistema, o usuário será redirecionado a uma página, na qual ele poderá redefinir sua nova senha. _(TR, p. 242)_
- [ ] **15.** Permitir acessar todos os módulos que o usuário tenha acesso, por um único endereço eletrônico, utilizando apenas um único identificador (login) e senha. _(TR, p. 242)_
- [ ] **16.** Permitir o acesso de múltiplos logins em máquina ou navegadores diferentes. _(TR, p. 242)_
- [ ] **17.** Manter histórico dos acessos por usuário e por função, registrando a data, hora e o nome do usuário. _(TR, p. 242)_
- [ ] **18.** Bloquear o acesso ao MÓDULO quando este não tiver interação do usuário por determinado período. _(TR, p. 242)_
- [ ] **19.** Manter log de auditoria das alterações efetuadas sobre os principais cadastros e tabelas, oferecendo ao cliente escolha de visualização das ações de acordo com os critérios do cliente (visualização dinâmica). _(TR, p. 242)_
- [ ] **20.** Permitir a visualização dos relatórios em tela, bem como possibilitar que sejam salvos em disco para posterior reimpressão, inclusive permitindo selecionar a impressão de intervalos de páginas e o número de cópias a serem impressas, além de também Permitir a seleção da impressora de rede desejada. _(TR, p. 243)_
- [ ] **21.** Os relatórios deverão ser salvos em formatos de arquivos “TXT, RTF, PDF, HTML, CSV, ODT e XLS” de forma que possam ser importados por outros aplicativos. _(TR, p. 243)_
- [ ] **22.** Permitir a exportação das tabelas integrantes da base de dados do aplicativo em arquivos tipo texto. _(TR, p. 243)_
- [ ] **23.** Utilizar bancos de dados que permitam acesso padrão ODBC ou ADO a partir de outros utilitários ou aplicativos como geradores de relatórios, geradores de gráficos etc. _(TR, p. 243)_
- [ ] **24.** Possuir validação na camada de interface com o usuário para os campos obrigatórios, antes de fazer a requisição de gravação no banco de dados. _(TR, p. 243)_
- [ ] **25.** Assegurar no servidor de aplicação que as informações necessárias para gravação em banco de dados sejam validadas caso a interface com o usuário falhar por qualquer motivo. _(TR, p. 243)_
- [ ] **26.** Toda atualização de dados deve ser realizada de forma on-line. _(TR, p. 243)_
- [ ] **27.** Garantir a integridade referencial entre as diversas tabelas dos aplicativos, através do banco de dados, por meio de triggers ou constraints. _(TR, p. 243)_
- [ ] **28.** Possibilitar que os aplicativos sejam acessados por usuários remotos, utilizando a internet como meio de acesso. _(TR, p. 243)_
- [ ] **29.** Possuir controle de atualização de versão de banco de dados, informando ao usuário quando ocorrer erros de atualização e possibilitar a identificação da versão utilizada. _(TR, p. 243)_
- [ ] **30.** Possuir um MÓDULO Gerenciador de Banco de Dados Relacional (SGBD) que possua o padrão SQL ANSI, sendo obrigatório o atendimento das seguintes _(TR, p. 243)_
### condições obrigatórias: _(p. 243)_

- [ ] **31.** O SGBD deverá possuir os seguintes recursos: point-in-time recovery (PITR), tablespaces, integridade transacional, stored procedures, views triggers, suporte a modelo híbrido objeto-relacional, suporte a tipos geométricos. _(TR, p. 243)_
- [ ] **32.** As regras de integridade do gerenciador de banco de dados deverão estar alojadas preferencialmente no Servidor Banco de Dados, de tal forma que, independentemente dos privilégios de acesso do usuário e da forma como ele se der, não seja permitido tornar inconsistente o Banco de Dados. _(TR, p. 243)_
- [ ] **33.** O módulo deverá permitir a realização de “Cópias de Segurança” dos dados, de forma “on- line” e com o banco de dados em utilização. _(TR, p. 244)_
- [ ] **34.** O SGBD deverá conter mecanismos de segurança e proteção que impeçam a perda de transações já efetivadas pelo usuário e permita a recuperação de dados na ocorrência de eventuais falhas, devendo este processo ser totalmente automático, documentado e seguro. _(TR, p. 244)_
- [ ] **35.** Que o SGBD possua recursos para ser executado em microcomputadores que utilizem 01 (um) ou mais processadores, não seja limitado na capacidade de armazenamento e de acessos a sua base e que possua suporte a clusterização. _(TR, p. 244)_
- [ ] **36.** O gerenciador de banco de dados deverá possuir recursos de segurança para impedir que usuários não autorizados obtenham êxito em acessar a base de dados para efetuar consulta, alteração, exclusão, impressão ou cópia. _(TR, p. 244)_
- [ ] **37.** Os profissionais só poderão visualizar as informações pertinentes à unidade a qual está vinculado, evitando o uso indevido das informações, exceto nos casos em que as permissões concedam tal ação. _(TR, p. 244)_
- [ ] **38.** Deverá fazer o controle de vigência do usuário, para determinar o tempo de acesso ao módulo. _(TR, p. 244)_
- [ ] **39.** Em telas de entrada de dados, menus e relatórios permitir atribuir, por usuário, permissão exclusiva para incluir, alterar, consultar e/ou excluir dados. _(TR, p. 244)_
- [ ] **40.** Permitir a exclusão de dados apenas se o mesmo não tiver dependência com outros cadastros, exibindo uma mensagem clara de aviso que a informação será deletada. _(TR, p. 244)_
- [ ] **41.** Os campos obrigatórios de cada tela deverão ficar em destaque em relação aos demais, obrigando o usuário a preencher para conclusão do cadastro. _(TR, p. 244)_
- [ ] **42.** Permitir o registro de nível de acesso (grupo de usuário do MÓDULO), possibilitando a usuário rotina de fácil visualização de funções como visualizar, incluir, consultar, alterar e excluir, organizando em nível hierárquico simulando o menu do MÓDULO, sendo possível ter visões separadas entre cadastros e relatórios. _(TR, p. 244)_
- [ ] **43.** Possibilitar a restrição de acesso do usuário do módulo por empresa e filial. _(TR, p. 244)_
- [ ] **44.** O MÓDULO deverá conter o cadastro de acordo com a tabela do IBGE para: país, estado e município. _(TR, p. 244)_
- [ ] **45.** Ser desenvolvido em interface gráfica, compatível com o S.O. Windows e Linux. _(TR, p. 245)_
- [ ] **46.** Manter em tela a informação de navegação no módulo que fique de fácil retorno e acesso a novas funções. _(TR, p. 245)_
- [ ] **47.** Permitir o controle de várias empresas e filiais na mesma aplicação e banco de dados. _(TR, p. 245)_
- [ ] **48.** Permitir o controle de diversas unidades de atendimento no mesmo banco de dados. _(TR, p. 245)_
- [ ] **49.** Permitir o cadastro e o registro de informações de Empresa, informando seu nome, seu tipo Jurídica ou Entidade, CNPJ, Inscrição Municipal/ Estadual, dados de endereçamento e dados de contato. _(TR, p. 245)_
- [ ] **50.** Permitir o cadastro e registro de informações da Filial, informando seu nome, seu tipo Jurídica ou Entidade, CNPJ, Inscrição Municipal/ Estadual, dados de endereçamento e dados de contato. _(TR, p. 245)_
- [ ] **51.** Permitir a localização rápida do registro de Pessoa Física, buscando pelo nome do usuário, cpf ou todos os registros lançados no sistema. _(TR, p. 245)_
- [ ] **52.** Permitir o registro de cadastro de Pessoa Física, informando dados e documentos pessoais, endereço, contato, documentos trabalhistas, certidões, com controle de duplicidade através de documentos. _(TR, p. 245)_
- [ ] **53.** Permitir o registro de Pessoa Jurídica, com dados pessoais básicos de identificação, informando seu nome, nome fantasia, dados de endereçamento, dados de contatos, com controle de duplicidade através do CNPJ. _(TR, p. 245)_
- [ ] **54.** Permitir o registro manual de países ou carga automática em rotinas de importações. _(TR, p. 245)_
- [ ] **55.** Permitir o registro manual de estados por país ou carga automática em rotinas de importações. _(TR, p. 245)_
- [ ] **56.** Permitir o registro manual de municípios por estado ou carga automática em rotinas de importações. _(TR, p. 245)_
- [ ] **57.** Permitir o registro de bairros. _(TR, p. 245)_
- [ ] **58.** Permitir o registro de logradouros, classificando por tipo de logradouro. _(TR, p. 245)_
- [ ] **59.** Permitir o registro de profissão possibilitando a classificação por CBO. _(TR, p. 245)_
- [ ] **60.** Permite usar trava de Login por Período. _(TR, p. 245)_
- [ ] **61.** Possibilitar configurar a obrigatoriedade de informar o CNS, RG, ou CPF do paciente em seu cadastro. _(TR, p. 246)_
- [ ] **62.** O software deverá possuir interface em língua portuguesa do Brasil. _(TR, p. 246)_
- [ ] **63.** Permitir integração do sistema com a API de CEP dos correios, buscando endereços automaticamente a partir do CEP informado conforme o registro de endereço na base nacional dos correios. _(TR, p. 246)_
- [ ] **64.** Permitir visualização da senha de acesso a tela de login do sistema. _(TR, p. 246)_
### Módulo Administrativo _(p. 246)_

- [ ] **1.** Permitir a carga do sistema, através da importação do XML do SCNES ou através de carga manual, de dados referentes às unidades de saúde, com suas habilitações pertinentes à prestação de serviços SUS. _(TR, p. 246)_
- [ ] **2.** Permitir a carga do sistema, através da importação do XML do SCNES ou através de carga manual, de dados referentes aos profissionais de saúde, com suas habilitações pertinentes à prestação de serviços SUS. _(TR, p. 246)_
- [ ] **3.** Permitir a carga do sistema, através da importação do XML do SCNES ou através de carga manual, de dados referentes às equipes de saúde do município. _(TR, p. 246)_
- [ ] **4.** Permitir a carga do sistema, através da importação do XML do CADSUS ou através de carga manual, de dados referentes aos pacientes, a fim de aproveitar as informações já cadastradas neste sistema. _(TR, p. 246)_
- [ ] **5.** Permitir a carga do sistema, através da importação das tabelas ambulatoriais do SIA/SUS ou através de carga manual, de dados referentes a procedimentos, Unidades de Saúde, especialidades e serviços/classificação de acordo com a hierarquia da unidade, códigos CID, CBOs, tabelas de códigos e descrições de âmbito nacional do SIA, cruzamentos entre procedimentos e CID, CBO, serviços e classificações e entre as tabelas de âmbito nacional. _(TR, p. 246)_
- [ ] **6.** Permitir a carga do sistema, através da importação das tabelas ambulatoriais do SIGTAP de dados referentes a procedimentos, especialidades, CIDs, tabelas de códigos, cruzamentos entre procedimentos e CID, CBO, serviços e classificações e entre as tabelas de âmbito nacional. _(TR, p. 246)_
- [ ] **7.** Permitir uma localização rápida do registro de Unidades de Saúde, com localização alfabética ou numérica por início, aproximação, término ou exatidão da informação, possibilitando a procura por nome da Unidade, código CNES. _(TR, p. 246)_
- [ ] **8.** Possibilitar a ativação e inativação do cadastro da Unidade de Saúde, sendo obrigatório registrar data e motivo pelo qual o usuário foi inativado. _(TR, p. 247)_
- [ ] **9.** Permitir o registro manual de turno de atendimento ou registro automático nas rotinas de importação, possibilitando o complemento de hora inicial e hora final para controles nos agendamentos. _(TR, p. 247)_
- [ ] **10.** Restringir a vinculação de Unidades de Saúde a realização de serviços, cronogramas fixos ou diários se o mesmo estiver com status de inativo. _(TR, p. 247)_
- [ ] **11.** Permitir o registro manual de especialidade habilitadas para Unidade de Saúde ou prestador e automaticamente através de importação com o sistema CNES via layout do arquivo XML atual. _(TR, p. 247)_
- [ ] **12.** Permitir o registro manual de serviço SUS/classificação para Unidade de Saúde ou prestador e automaticamente através de importação com o sistema CNES via layout do arquivo XML atual. _(TR, p. 247)_
- [ ] **13.** Permitir o registro manual de habilitação para Unidade de Saúde e prestador ou automaticamente através de importação com o sistema CNES via layout do arquivo XML atual. _(TR, p. 247)_
- [ ] **14.** Permitir uma localização rápida do registro de profissional, filtrando na tela de listagem profissional pelo nome do profissional, CPF e Cartão Nacional da Saúde. _(TR, p. 247)_
- [ ] **15.** Permitir o registo manual do cadastro do profissional ou automaticamente através de importações com o sistema SCNES via layout do arquivo XML atual, com informações pessoais e trabalhistas, possibilitando a classificação do profissional por tratamento pessoal para emissão de correspondência formal, o n° do CNS, n° de matrícula do profissional, inscrição no conselho, e no conselho regional, CBO's de seu exercício, com vinculação aos grupos de atendimento, unidades em que prestará serviço e possibilidade de ativação/desativação do profissional no sistema. _(TR, p. 247)_
- [ ] **16.** Possibilitar o registro de dados como: se é auditor, intervalo de consulta caso seja habilitado, garantir que o profissional tenha apenas um único cadastro, validado por nome, CPF e Cartão Nacional da Saúde. _(TR, p. 247)_
- [ ] **17.** Possibilitar o registro de documentações pessoais (CPF, identidade, data de expedição da identidade, órgão de expedição da identidade, estado de expedição da identidade, número do título do eleitor, zona eleitoral e seção), o registro de documentações trabalhistas (número da carteira de trabalho, série, estado, profissão, número do PIS/PASEP e data do PIS), e o registro de certidões (naturalidade, dados de certidão de nascimento, dados de certidão de casamento). _(TR, p. 248)_
- [ ] **18.** Permitir o cadastramento de endereço/contato em cadastro único, evitando a duplicação de informações. _(TR, p. 248)_
- [ ] **19.** Possibilitar a ativação e inativação do cadastro do profissional, sendo obrigatório registrar data e motivo pelo qual o usuário foi inativado. _(TR, p. 248)_
- [ ] **20.** Permitir o registro manual de especialidade do profissional ou automaticamente através de importação com o sistema CNES via layout do arquivo XML atual. _(TR, p. 248)_
- [ ] **21.** Permitir o registro manual de profissional/especialidade da saúde por Unidade de Saúde e prestador ou automaticamente através de importação com o sistema CNES via layout do arquivo XML atual, possibilitando informar a carga horária semanal e situação (ativo ou inativo). _(TR, p. 248)_
- [ ] **22.** Possibilitar a criação de grupos para agrupamento de especialidades, possibilitando a habilitação/inabilitação dos grupos de especialidades por sistema, permitindo a vinculação de especialidades à grupos de especialidades e serviços. _(TR, p. 248)_
- [ ] **23.** Possibilitar a criação de grupos de agendamento. Permitindo vinculação à unidade de saúde, e ao grupo de especialidade da unidade, que estará disponível para a realização de agendamentos por grupos. _(TR, p. 248)_
- [ ] **24.** Possibilitar que a geração de acesso aos módulos do sistema seja executada, em rotina única, pelo administrador do sistema. _(TR, p. 248)_
- [ ] **25.** Permitir aos gestores acompanhamento da utilização do sistema por período e módulo através de gráfico. _(TR, p. 248)_
- [ ] **26.** Permitir realizar a atualização dos menus do sistema. _(TR, p. 248)_
- [ ] **27.** Permitir o registro de CBO - Cadastro Brasileiro de Ocupação. _(TR, p. 248)_
- [ ] **28.** Permitir uma localização rápida dos registros de usuários da saúde cadastrados, possibilitando a procura por nome do usuário ou CPF. _(TR, p. 248)_
- [ ] **29.** Permitir o cadastro de pessoa juridica, sendo de preenchimento obrigatório as informações: Nome, Nome Fantasia, CNPJ. _(TR, p. 249)_
- [ ] **30.** Permitir uma localização rápida do registro de pessoa jurídica, filtrando na tela de listagem pessoa jurídica pelo nome, CNPJ ou código. _(TR, p. 249)_
- [ ] **31.** Permitir o cadastro de pessoa física, com informações referente a endereço/contatos, documentos pessoais e trabalhistas e certidões. _(TR, p. 249)_
- [ ] **32.** Garantir que as informações obrigatórias sejam validadas na interface com o usuário e na camada de negócio, avisando ao usuário do sistema via mensagem ou destacando em cor vermelha o campo ou informação. Tais como: Nome do usuário da saúde, sexo, raça/cor, data de nascimento, nome da mãe e dados de endereço residencial. _(TR, p. 249)_
- [ ] **33.** Permitir o cadastro de perfis de usuários do sistema e seus privilégios de acesso. _(TR, p. 249)_
- [ ] **34.** Permitir o registro de usuário do sistema, sendo este vinculado ao Cadastro de Pessoa Física. Garantindo que um usuário tenha apenas um único cadastro, validado por nome, CPF, contendo informações básicas de identificação, documentações pessoais, trabalhistas, e vinculação à unidade de saúde. _(TR, p. 249)_
- [ ] **35.** Permitir o cadastramento de endereços residencial e contato dos usuários, em cadastro único, evitando a duplicação de informações. _(TR, p. 249)_
- [ ] **36.** Permitir sua ativação e inativação do cadastro. _(TR, p. 249)_
- [ ] **37.** Permitir configurar acesso do usuário por período, sendo definido por dias e horários específicos por operadores. _(TR, p. 249)_
- [ ] **38.** Permitir ao usuário do sistema a troca de senha quando entender ou se tornar necessário, solicitando senha forte, com número mínimo de caracteres, contendo letra maiúscula, número e caractere especial. _(TR, p. 249)_
- [ ] **39.** Permitir controle de acesso de unidade terceiras, alterando a pesquisa para trazer apenas unidade terceira vinculada a algum recurso. _(TR, p. 249)_
- [ ] **40.** Permitir a consulta, de forma numérica ou alfabética, ao registro dos procedimentos ambulatoriais, discriminando informações básicas, como sua complexidade, instrumento de registro, valor unitário, idade e sexo permitidos, entre outras. _(TR, p. 249)_
- [ ] **41.** Possuir ferramenta de assinatura eletrônica, através de Certificação Digital Padrão ICP Brasil, que permita dar validade jurídica aos documentos gerados. _(TR, p. 250)_
- [ ] **42.** Possibilitar, caso o órgão licitante deseje, que os documentos digitalizados já salvos também possam ser assinados eletronicamente com o uso da Certificação Digital. Esta ferramenta deverá ser propriedade da empresa fornecedora do MÓDULO ERP de Administração Pública. _(TR, p. 250)_
- [ ] **43.** Permitir anexar documentos de procedimentos padrão para todos os módulos do sistema. _(TR, p. 250)_
- [ ] **44.** Permitir que os documentos digitalizados possam ser salvos em formato PDF ou similar. _(TR, p. 250)_
- [ ] **45.** Permitir unificação de endereços duplicados, informando o tipo de endereço, sua descrição, o tipo de unificação, se irá ignorar a acentuação ou as abreviaturas, para buscar pelas duplicidades. _(TR, p. 250)_
- [ ] **46.** Permitir unificação de prontuários duplicados, informando o nome do usuário, a data de nascimento ou o nome da mãe para encontrar pelas duplicidades. _(TR, p. 250)_
- [ ] **47.** Permitir unificação de cadastro de pessoa física duplicados, buscando as duplicidades pelo número do cpf ou por todos os registros no sistema. _(TR, p. 250)_
- [ ] **48.** Permitir unificação de profissionais, informando o nome do profissional para encontrar pelas duplicidades. _(TR, p. 250)_
- [ ] **49.** Permitir realizar a configuração do laboratório pelo gestor municipal. _(TR, p. 250)_
- [ ] **50.** Permitir o cadastro de feriados, possibilitando informar o tipo de feriado (Nacional, Estadual, Municipal, Ponto Facultativo e Outros). _(TR, p. 250)_
- [ ] **51.** Emitir relação de CIDs. _(TR, p. 250)_
- [ ] **52.** Emitir relação de procedimentos por tipo de financiamento. _(TR, p. 250)_
- [ ] **53.** Emitir relação de procedimentos. _(TR, p. 250)_
- [ ] **54.** Emitir relação de convênios cadastrados. _(TR, p. 250)_
- [ ] **55.** Emitir a relação de endereços cadastrados. _(TR, p. 250)_
- [ ] **56.** Possibilitar emissão de relatório que liste todas as Unidades de Saúde com seus respectivos dados. _(TR, p. 250)_
- [ ] **57.** Possibilitar emissão de relatório que liste as especialidades por Unidade de Saúde. _(TR, p. 250)_
- [ ] **58.** Possibilitar emissão de relatório que liste os grupos de especialidades por Unidade de Saúde. _(TR, p. 251)_
- [ ] **59.** Possibilitar emissão de relatório que liste os profissionais por Unidade de Saúde. _(TR, p. 251)_
- [ ] **60.** Emitir relatório de Fluxo de Procura de Outros Município por Especialidade _(TR, p. 251)_
- [ ] **61.** Emitir Gráfico de Percentual de Atendimentos por Município _(TR, p. 251)_
- [ ] **62.** Possibilitar emissão da ficha profissional. _(TR, p. 251)_
- [ ] **63.** Possibilitar emissão de relatório dos profissionais por equipe. _(TR, p. 251)_
- [ ] **64.** Possibilitar emissão de relatório dos profissionais por especialidade. _(TR, p. 251)_
### Módulo Agendamento Interno _(p. 251)_

- [ ] **1.** Possuir integração com o módulo Faturamento/Produção ambulatorial, para facilitar a digitação. _(TR, p. 251)_
- [ ] **2.** Permitir o registro de grupo de especialidade, de modo a agrupar as especialidades e seus respectivos procedimentos visando melhor controle dos serviços prestados, habilitando ou restringindo o acesso ao grupo por operador do sistema. _(TR, p. 251)_
- [ ] **3.** Permitir o cadastro de acesso do usuário por tipo de consulta, definindo acesso a todos os usuários para quando o cronograma utilizar a distribuição de vagas, mesmo para os usuários que podem utilizar todas as vagas da distribuição. _(TR, p. 251)_
- [ ] **4.** Permitir a localização do cronograma fixo a partir das informações: Unidade, Grupo de Especialidade, Especialidade e Dia da Semana. _(TR, p. 251)_
- [ ] **5.** Permitir o registro de cronogramas fixos para profissional da saúde, por Unidade de Saúde, grupo de especialidade, por especialidades, por tipo de cronograma informando se será por profissional, tipo de serviço, ou grupo de agendamento, dia da semana pré-determinado (domingo, segunda, terça, quarta, quinta, sexta ou sábado), e turno controlando inclusive a quantidade de vagas programada para atendimentos. _(TR, p. 251)_
- [ ] **6.** Possibilitar o controle de vagas programadas, informar se utiliza distribuição das vagas do cronograma entre retorno, 1ª consulta, avaliação cirúrgica, vagas liberadas para o portal do paciente, validando as vagas no agendamento. _(TR, p. 251)_
- [ ] **7.** Possibilitar a emissão de relatório a partir da tela de pesquisa de cronograma fixo como: por período, por unidade, por profissional, por especialidade ou por grupo de especialidade. _(TR, p. 251)_
- [ ] **8.** Permitir a localização do cronograma diário a partir das informações: Unidade, Grupo de Especialidade, Especialidade, Data Inicial e Final de atendimento. _(TR, p. 252)_
- [ ] **9.** Permitir o registro de cronogramas diários para profissional da saúde ou especialidade por Unidade de Saúde, grupo de especialidade, informando o turno, a data de atendimento, controlando inclusive a quantidade de vagas programadas para atendimentos, vagas agendadas e vagas disponíveis. _(TR, p. 252)_
- [ ] **10.** Possibilitar no cadastro de um cronograma diário, a distribuição de vagas entre unidades, controlando as quantidades disponíveis por unidade individualmente. Permitir que uma unidade matriz gerencie que um determinado cronograma seja compartilhado entre várias unidades, possibilitando ao usuário responsável a edição deste cronograma fazer atualizações tais como: transferência de vagas entre determinadas unidades, alteração de quantidade de vagas do cronograma, fazendo sua redistribuição entre unidades. Esse gerenciamento é feito por nível de acesso do usuário, o usuário de uma determinada unidade só será capaz de visualizar as vagas disponíveis que ele tenha acesso. _(TR, p. 252)_
- [ ] **11.** Permitir o controle de vagas quando for distribuída para atender um prestador regulador. _(TR, p. 252)_
- [ ] **12.** Possibilitar a emissão de relatório a partir da tela de pesquisa de cronograma diário como: por período, por unidade, por profissional, por especialidade ou por grupo de especialidade. _(TR, p. 252)_
- [ ] **13.** Permitir Gerar Cronograma Diário a partir do cadastro do cronograma fixo, possibilitando a escolha de uma única data ou intervalo de datas, sendo possível informar a observação. Possibilidade na mesma tela de realizar agendamento em bloco para o paciente, informando Grupo de Especialidade, Unidade, Especialidade, Profissional, Turno, o Período e Dia da Semana. _(TR, p. 252)_
- [ ] **14.** Possibilidade de geração de cronograma diário com múltiplos horários para profissionais da saúde, por Unidade de Saúde, grupo de especialidade, por especialidade, turno, data, controlando inclusive a quantidade de vagas programada para atendimentos. _(TR, p. 252)_
- [ ] **15.** Possibilidade de geração de cronograma fixo com múltiplos horários para profissionais da saúde, por Unidade de Saúde, grupo de especialidade, por especialidade, dia da semana pré-determinado (domingo, segunda, terça, quarta, quinta, sexta ou sábado), duração de atendimento, turno, data, controlando inclusive a quantidade de vagas programada para atendimentos. _(TR, p. 252)_
- [ ] **16.** Permitir que seja feito o controle de vagas por cronograma, possibilidade de informar se utiliza distribuição das vagas do cronograma para retorno, 1ª consulta, avaliação cirúrgica, vagas liberadas para o portal do paciente. _(TR, p. 253)_
- [ ] **17.** Possibilitar a personalização de textos para impressão de guias e mensagem no agendamento, no registro de cronogramas. _(TR, p. 253)_
- [ ] **18.** Possibilitar a restrição do agendamento a partir das configurações do grupo de especialidade conforme item: tipo de agendamento individual ou por grupo, agendamento por sequência ou hora, fila de espera por profissional ou por CBO, restringir serviço único ou vários e definição de modelo de mapa e guia. _(TR, p. 253)_
- [ ] **19.** Possuir um meio prático de filtragem de vagas para agendamento, podendo filtrar por grupo de especialidade, unidade, especialidade, profissional por data ou período. _(TR, p. 253)_
- [ ] **20.** Permitir ao usuário a edição ou cadastro de unidade, grupo de especialidade, especialidade e profissional na tela de listagem de vagas para atendimento. _(TR, p. 253)_
- [ ] **21.** Permitir ao usuário na tela de listagem de vagas para atendimento, distinguir entre cronogramas, bloqueado, sem vagas, compartilhado, distribuído e disponível, por cores. Os cronogramas filtrados são apresentados com sua cor representando sua situação como descrito. _(TR, p. 253)_
- [ ] **22.** Possuir na tela vagas para atendimento, a visualização estatística de vagas programadas, agendadas, disponíveis e em espera, por profissional e data, para orientação dos usuários. _(TR, p. 253)_
- [ ] **23.** Possibilitar na tela vagas para atendimento, a visualização de pacientes na fila de espera por cronograma ou por especialidade. _(TR, p. 253)_
- [ ] **24.** Possuir a função de Agendamento em Grupos, ou seja, mais de um paciente para um mesmo horário como ocorre na fisioterapia. _(TR, p. 253)_
- [ ] **25.** Possibilitar ao usuário na tela de listagem de vagas para atendimento verificar o histórico do paciente, utilizando uma pesquisa avançada por nome do usuário, código do prontuário, cartão nacional de saúde, CPF e data de nascimento. _(TR, p. 253)_
- [ ] **26.** Permitir a geração de relatórios na tela de listagem de vagas para atendimento, como: mapa de consulta, mapa de consulta apenas confirmado, mapa de consulta em branco, mapa de consulta com procedimento, lista de agendamento por cronograma, lista de agendamento por especialidade, lista de espera por cronograma, lista de espera por especialidade, cronograma por grupo e cronograma por especialidade. _(TR, p. 253)_
- [ ] **27.** Permitir o agendamento de consultas para datas posteriores. _(TR, p. 254)_
- [ ] **28.** Permitir o agendamento, cancelamento e remanejamento de consultas médicas e odontológicas, de acordo com a escala dos profissionais, com validação de procedimentos relacionados a consulta, sexo e idade do paciente no ato do agendamento e ordenação dos pacientes conforme horário de marcação. _(TR, p. 254)_
- [ ] **29.** Permitir aviso de quando o paciente faltar a última consulta agendada. _(TR, p. 254)_
- [ ] **30.** Permitir o bloqueio de agendamentos para o profissional ou especialidade em datas específicas, possibilitando ainda o registro do motivo para o bloqueio. _(TR, p. 254)_
- [ ] **31.** Restringir o registro do agendamento caso algum dado do paciente esteja incompleto, como: data de nascimento, sexo, raça/cor, IBGE do município, nome da mãe e cartão nacional de saúde. _(TR, p. 254)_
- [ ] **32.** Permirtir a na tela de cadastro de Agendamento a edição dos dados do paciente. _(TR, p. 254)_
- [ ] **33.** Possibilitar na tela de cadastro de Agendamento a visualização do paciente inativo por motivo de Obito. _(TR, p. 254)_
- [ ] **34.** Possuir controle de situação dos agendamentos, podendo classificar os atendimentos como solicitados, agendados, confirmados, realizados, faltou, cancelado, transferido e falta justificada. _(TR, p. 254)_
- [ ] **35.** Possibilidade de inserir o motivo do cancelamento do agendamento de consulta, quando este tiver a situação classificada como cancelada. _(TR, p. 254)_
- [ ] **36.** Permitir o cancelamento de consultas agendadas, com estorno da vaga, sem a necessidade de exclusão do registro. _(TR, p. 254)_
- [ ] **37.** Possibilitar a alteração da sequência de atendimento dos pacientes manual ou automática. _(TR, p. 254)_
- [ ] **38.** Possibilitar a transferência de um ou mais agendamentos de um profissional para outra data, escolhida pelo operador do sistema. _(TR, p. 254)_
- [ ] **39.** Possibilitar o registro de cadastro do atendente responsável pelo agendamento da consulta. _(TR, p. 254)_
- [ ] **40.** Possibilitar que, no ato do agendamento, possa ser feita uma verificação do histórico dos últimos agendamentos feitos para o paciente antes da confirmação da consulta, com período configurado pelo usuário, informando inclusive quando o paciente não compareceu ao atendimento. _(TR, p. 254)_
- [ ] **41.** Permite o envio de mensagens automáticas via WhatsApp a partir do agendamento quando a situação for agendada ou confirmada pelo operador do sistema. _(TR, p. 255)_
- [ ] **42.** Possibilitar a alteração da sequência na lista de agendamento do cronograma de forma a ser possível a reordenação dos pacientes agendados. Após a confirmação, o sistema organiza a lista por ordem de sequência. _(TR, p. 255)_
- [ ] **43.** Permitir o registro e controle de pacientes em listas de espera por cronograma, permitindo a transferência destes pacientes para o agendamento de consultas quando necessário. _(TR, p. 255)_
- [ ] **44.** Possibilita mesmo depois de agendar um paciente sua transferência para um outro cronograma. Esta opção possibilita a transferência de vários pacientes de uma única vez. _(TR, p. 255)_
- [ ] **45.** Bloquear o agendamento caso não existam mais vagas para o cronograma, exibindo mensagem de limite de vaga e possibilitando a autorização por meio de dupla custódia referente a nível de acesso do sistema. _(TR, p. 255)_
- [ ] **46.** Possibilitar a emissão do comprovante de agendamento de consultas médicas e odontológicas, com informações sobre o local da consulta, numeração e demais informações úteis. _(TR, p. 255)_
- [ ] **47.** Possibilitar a impressão das guias de agendamento em impressora matricial em duas vias. _(TR, p. 255)_
- [ ] **48.** Possibilidade de gerar agendamento em bloco para o paciente, informando Grupo de Especialidade, Unidade, Especialidade, Profissional, Turno, o Período e Dia da Semana. _(TR, p. 255)_
- [ ] **49.** Possuir prático processo de pesquisa de agendamentos já efetuados para o usuário, possibilitando a escolha do campo de pesquisa informando o nome do usuário, código do prontuário, Cartão Nacional de Saúde - CNS, CPF e data de nascimento. Se o campo de pesquisa for o nome do usuário, é possível escolher ainda entre os tipos: Inicia, Contém e Termina. Estas opções irão filtrar os registros que iniciam, contenham ou terminem com o valor digitado, trazendo as informações de agendamentos, lista de espera, data de atendimento, local, profissional do atendimento entre outros outros dados. _(TR, p. 255)_
- [ ] **50.** Permitir a listagem e inclusão de pacientes em lista de espera fixa por Unidade de Saúde e/ou especialidade e/ou profissional, com informações da data de cadastro e data de solicitação, permitindo que estes sejam apresentados na espera para todas as datas até que seja efetivado o agendamento da consulta. _(TR, p. 256)_
- [ ] **51.** Permite o cadastro de calendário com parametrização de feriados, dias úteis, campanhas e outros tipos de eventos, informando seu nome, data de início e fim do evento, com possibilidade de registrar uma descrição para o evento. _(TR, p. 256)_
- [ ] **52.** Possibilidade de localização rápida de todos os usuários da saúde (pacientes) já cadastrados, possibilitando a escolha do campo de pesquisa informando o nome do usuário, código do prontuário, Cartão Nacional de Saúde - CNS, CPF, data de nascimento, ou nome da mãe. Se o campo de pesquisa for o nome do usuário, é possível escolher entre os tipos: Inicia, Contém, Termina, ou Igual. Estas opções irão filtrar os registros que iniciam, contenham, terminem ou são iguais com o valor digitado para pesquisa. _(TR, p. 256)_
- [ ] **53.** Permitir na tela listagem de usuário da saúde, distinguir entre os cadastros, ativo, inativo, e com prontuários provisórios, por cores. Os cadastros filtrados são apresentados com sua cor representando sua situação como descrito. _(TR, p. 256)_
- [ ] **54.** Permitir na tela de listagem de usuário da saúde, a consulta e emissão de relatórios: carteirinha do usuário, ficha do paciente, ficha de prontuário, histórico de agendamento. _(TR, p. 256)_
- [ ] **55.** Permitir o cadastramento do usuário da saúde, com informações básicas de identificação, CNS, prontuário provisório ou auxiliar, permitir cadastrar pelo nome social, permitr abreviatura no cadastro do nome, informar o sexo, data de nascimento, raça/ cor, nome da mãe, possibilitadade de registro de informações do grupo sanguíneo, e se o usuário é doador de sangue, cadastramento de endereços de residencia, naturalidade. _(TR, p. 256)_
- [ ] **56.** Permitir o registro de contato do usuário (telefone, celular, email), informar registro de documentações pessoais (CPF, identidade, data de expedição da identidade, órgão de expedição da identidade, estado de expedição da identidade, número do título do eleitor, zona eleitoral e seção), o registro de documentações de certidões (dados de certidão de nascimento, dados de certidão de casamento), o registro de documentações trabalhistas (número da carteira de trabalho, série, estado, profissão, número do PIS/PASEP e data do PIS). _(TR, p. 256)_
- [ ] **57.** Possibilitar vincular uma foto ao paciente, podendo ser por envio de arquivo ou captura direta através de uma webcam, na tela de cadastro de usuário da saúde. _(TR, p. 257)_
- [ ] **58.** Possibilidade de informar a situação do usuário da saúde, se o mesmo está ativo, ou inativo. Informando os motivos de inativação: mudança de território, unificação de usuário e óbito. _(TR, p. 257)_
- [ ] **59.** Possibilitar o registro de dados de unidade de referência, contemplando a unidade de referência, agente comunitário e telefone/celular do agente comunitário. _(TR, p. 257)_
- [ ] **60.** Permitir a liberação de acesso ao Portal do Paciente através do cadastro de usuário da saúde, com possibilidade de desbloqueio de senha, ativação ou inativação de login e recuperar senha para o paciente. _(TR, p. 257)_
- [ ] **61.** Possibilidade de visualização de informações sobre últimas alterações realizadas no cadastro de usuário da saúde, informando data e usuário responsável pelas alterações e pelo cadastro. _(TR, p. 257)_
- [ ] **62.** Possibilitar acesso rápido no cadastro de usuário da saúde a dados de histórico dos atendimentos realizados na rede de pelo menos: Agendamentos, Atendimentos Médicos e Odontológicos, Atestados, Medicamentos, Exames, Dados da família. _(TR, p. 257)_
- [ ] **63.** Possibilitar a emissão da ficha do paciente, a ficha de prontuário, a impressão da etiqueta de identificação do envelope do prontuário e a carteirinha do usuário, para utilização dos serviços de Saúde. _(TR, p. 257)_
- [ ] **64.** Possibilitar ao usuário no momento em que acessar o módulo de agendamento navegar entre menus e relatórios acessando apenas o Módulo de Agendamento Interno. _(TR, p. 257)_
- [ ] **65.** Restringir o acesso do operador do sistema por grupo de atendimento e Unidade de Saúde, possibilitando que o mesmo só visualize dados das unidades que têm acesso. _(TR, p. 257)_
- [ ] **66.** Permite o controle do acolhimento interno na unidade, possibilitando o direcionamento das salas de atendimento. _(TR, p. 257)_
- [ ] **67.** Restringir a vinculação de profissionais a realização de serviços, cronogramas fixos ou diários se o mesmo estiver com status de inativo. _(TR, p. 257)_
- [ ] **68.** Restringir o acesso ao registro de cronogramas normais e compartilhados por nível de acesso, por usuário do sistema/unidade e grupo de especialidade. _(TR, p. 257)_
- [ ] **69.** Deverá ter funcionalidade de chamar pelo painel de chamada. _(TR, p. 258)_
- [ ] **70.** Restringir serviços no agendamento a partir da pré-configuração nos grupos de atendimento e unidades. _(TR, p. 258)_
- [ ] **71.** Permitir o cadastro de eventos no calendário da unidade. _(TR, p. 258)_
- [ ] **72.** Restringir por paciente apenas uma vaga por cronograma de atendimento. _(TR, p. 258)_
- [ ] **73.** Possibilitar emissão de relatório de usuários da saúde aniversariantes por período. _(TR, p. 258)_
- [ ] **74.** Emitir relatório quantitativo de cadastro de usuários realizado por período. _(TR, p. 258)_
- [ ] **75.** Possibilitar emissão de relatório de Auditoria que liste Alteração Cadastro de Usuário. _(TR, p. 258)_
- [ ] **76.** Possibilitar emissão de relatório que liste os agendamentos por especialidade. _(TR, p. 258)_
- [ ] **77.** Possibilitar emissão de relatório que liste os agendamentos por profissional. _(TR, p. 258)_
- [ ] **78.** Possibilitar emissão de relatório que liste as esperas por cronograma. _(TR, p. 258)_
- [ ] **79.** Possibilitar emissão de relatório que liste as esperas por especialidade. _(TR, p. 258)_
- [ ] **80.** Possibilitar emissão de relatório que liste o quantitativo de atendimentos realizados por profissional. _(TR, p. 258)_
- [ ] **81.** Possibilitar emissão de relatório que liste o quantitativo de faltosos por período. _(TR, p. 258)_
- [ ] **82.** Possibilitar emissão de relatório quantitativo de agendamento com percentual e valor por período _(TR, p. 258)_
- [ ] **83.** Possibilitar emissão de relatório que liste o quantitativo de agendamentos por Unidade de Saúde. _(TR, p. 258)_
- [ ] **84.** Possibilitar emissão de relatório que liste o quantitativo e estimativas de atendimentos/agendamentos em forma de gráficos. _(TR, p. 258)_
- [ ] **85.** Possibilitar a emissão de relatório de cronogramas fixos por unidade. _(TR, p. 258)_
- [ ] **86.** Possibilitar a emissão de relatório de cronogramas compartilhados por Unidade/Vagas/Agendados. _(TR, p. 258)_
- [ ] **87.** Possibilitar a emissão de relatório de vagas disponiveis por cronograma, podendo filtrar por unidade e profissional. _(TR, p. 258)_
- [ ] **88.** Possibilitar emissão de relatório que liste os acolhimentos por profissional/período. _(TR, p. 258)_
### Módulo Farmácia _(p. 258)_

- [ ] **1.** Permitir cadastro de grupos, produtos, e subgrupos para facilitar na organização do estoque. _(TR, p. 259)_
- [ ] **2.** Permitir o cadastro de diversos estoques por unidade de saúde. _(TR, p. 259)_
- [ ] **3.** Permitir a importação do RENAME. _(TR, p. 259)_
- [ ] **4.** Interfaceamento com o sistema Horus, exportando informações necessárias para este sistema usando a tecnologia WebService, de acordo com os parâmetros estabelecidos na Pt. 271/2013. _(TR, p. 259)_
- [ ] **5.** Permite integração com o SIGAF via webservice de forma diária e automática. _(TR, p. 259)_
- [ ] **6.** Permitir o cadastramento dos medicamentos com características específicas, embalagem, apresentação, Código DCB, Princípio Ativo e Classificação de lista da Portaria 344, quando aplicável. O cadastramento dos produtos deverá ser definido através de grupos e subgrupos, para facilitar na organização do estoque. _(TR, p. 259)_
- [ ] **7.** Permitir o agrupamento dos produtos em tipos diversos, classificando cada grupo quanto a possibilidade de liberação aos pacientes, definidos pelo usuário, para melhor organização e controle do estoque. _(TR, p. 259)_
- [ ] **8.** Controlar medicamentos normais, manipulados e de uso controlado (psicotrópicos), com a emissão de relatórios gerais e específicos destes produtos. _(TR, p. 259)_
- [ ] **9.** Permitir o controle de materiais e correlatos utilizados na Unidade. _(TR, p. 259)_
- [ ] **10.** Possuir controle de interação medicamentosa. _(TR, p. 259)_
- [ ] **11.** Permitir cadastro de posologia. _(TR, p. 259)_
- [ ] **12.** Permitir o cadastramento de acerto/balanço de estoque, onde o usuário possa informar o saldo real por lote e produto para o sistema, de modo a controlar os produtos mesmo sem as informações de compra. _(TR, p. 259)_
- [ ] **13.** Permitir na tela de Acerto/Balanço de Estoque a impressão do relatório de Itens Não Efetivados. _(TR, p. 259)_
- [ ] **14.** Permitir na tela de Acerto/Balanço de Estoque a impressão do relatório de Balanço. _(TR, p. 259)_
- [ ] **15.** Permitir o controle de entradas de medicamentos e produtos por nota fiscal, informando o tipo de entrada, fonte de financiamento, fabricante, fornecedor, data de entrada e número da nota fiscal. _(TR, p. 259)_
- [ ] **16.** Permitir no momento da entrada informar o valor unitário do medicamento. _(TR, p. 259)_
- [ ] **17.** Permitir o cadastro, alteração e exclusão de fornecedores e fabricantes, com informações básicas de localização e contatos do mesmo. _(TR, p. 259)_
- [ ] **18.** Permitir o controle de lotes de medicamentos por Unidade de Saúde, com informações sobre a quantidade de cada lote, seu código, controle de validade informando as datas de fabricação e vencimento, com aviso prévio de vencimento e dias de carência configurados pelo usuário. _(TR, p. 260)_
- [ ] **19.** Permitir utilização de código de barras para movimentação dos medicamentos. _(TR, p. 260)_
- [ ] **20.** Permitir controle de entrada de manipulados, permitindo ao usuário informar data de produção e data de validade. _(TR, p. 260)_
- [ ] **21.** Permitir carga automática dos produtos (medicamentos/materiais) através do XML da Nota Fiscal de compras provindo do sistema GMP, e a importação dos Xml's de NF-e, o sistema reconhece automaticamente a entrada de acordo com o arquivo selecionado. _(TR, p. 260)_
- [ ] **22.** Permitir o controle de estoque mínimo e máximo por produto/estoque. _(TR, p. 260)_
- [ ] **23.** Permitir a dispensação de medicamentos, sugerindo ao operador do sistema, os lotes com datas de vencimento mais próximas. _(TR, p. 260)_
- [ ] **24.** Permitir na dispensação a função de adição automática de lote, com código de barras. _(TR, p. 260)_
- [ ] **25.** Permitir cadastrar ou editar pacientes na tela de dispensação, permitindo cadastramento pelo nome social do paciente, e inserção de abreviatura no nome. _(TR, p. 260)_
- [ ] **26.** Permitir a vinculação de entrega de medicamentos ao prontuário do paciente, controlando inclusive a data retorno para nova retirada, de modo a otimizar o controle de dispensação e administração dos medicamentos. _(TR, p. 260)_
- [ ] **27.** Possibilitar a emissão de avisos aos usuários nos casos de pacientes com grande fluxo de entrega de medicamentos ou retorno antecipado. _(TR, p. 260)_
- [ ] **28.** Possibilitar registrar observação no ato da dispensação, exibindo a mesmo na próxima dispensação para o paciente. _(TR, p. 260)_
- [ ] **29.** Permitir no ato da dispensação o registro de posologia para cada medicamento. _(TR, p. 260)_
- [ ] **30.** Vincular medicamentos dispensados ao histórico do paciente, para consultas posteriores. _(TR, p. 260)_
- [ ] **31.** Emitir comprovante de dispensação de medicamentos aos pacientes, com informações básicas para sua orientação. _(TR, p. 260)_
- [ ] **32.** Permitir emitir Comprovante de Entrega de Medicamentos para impressão em impressora térmica, contendo informações básicas para sua orientação. _(TR, p. 260)_
- [ ] **33.** Possibilitar a transferência de produtos entre as Unidades de Saúde e estoques, com emissão de recibo de transferência para controle e registro. _(TR, p. 261)_
- [ ] **34.** Permitir a baixa automática de estoque na Unidade destino nos casos de transferência em que o sistema trabalhe somente com uma Unidade de Saúde. _(TR, p. 261)_
- [ ] **35.** Permitir a efetivação de baixa de estoque por saída diária total, por unidade, lote e produto. _(TR, p. 261)_
- [ ] **36.** Permitir a efetivação de baixas de estoque por perda ou violação de produtos, possibilitando ainda informar o motivo. _(TR, p. 261)_
- [ ] **37.** Permitir baixa de medicamentos manipulados, e impressão de etiquetas de identificação. _(TR, p. 261)_
- [ ] **38.** Permitir o controle de validade dos produtos, com possibilidade de dar baixa nos produtos vencidos, e à vencer, informando o motivo da baixa. _(TR, p. 261)_
- [ ] **39.** Possibilidade de visualização e impressão de relatório de controle de produtos vencidos, listando os produtos próximos da validade por estoque. _(TR, p. 261)_
- [ ] **40.** Permitir verificação e registro de solicitação de medicamentos, informando o paciente, quantidade solicitada e a data da solicitação. _(TR, p. 261)_
- [ ] **41.** Permitir recebimento de receita eletrônica proveniente do sistema de Prontuário Eletrônico a partir do atendimento médico . _(TR, p. 261)_
- [ ] **42.** Permitir visualização e dispensação de medicamentos para pacientes em observação. _(TR, p. 261)_
- [ ] **43.** Permitir o bloqueio e desbloqueio de lote de medicamentos, informando o motivo para bloqueio do mesmo. _(TR, p. 261)_
- [ ] **44.** Possibilitar o registro de pedido de produtos entre unidades. _(TR, p. 261)_
- [ ] **45.** Permitir o cadastro e emissão em relatório de requisições de produtos, informando o saldo em estoque e quantidade requerida por Unidade de Saúde ou geral. _(TR, p. 261)_
- [ ] **46.** Possibilitar o registro e envio do atendimento de pedidos. _(TR, p. 261)_
- [ ] **47.** Permitir integração com portal da transparência para visualizar medicamentos em estoque, confrome a lei 14.654/23 _(TR, p. 261)_
- [ ] **48.** Possibilitar que o requisitante receba o pedido atendido, e só após o seu aceite o sistema dê a entrada em seu estoque. _(TR, p. 261)_
- [ ] **49.** Permitir o controle de processos judiciais, com visualização e impressão dos processos registrados no sistema. _(TR, p. 261)_
- [ ] **50.** Possibilitar a abertura e fechamento do livro de registros de controlados. _(TR, p. 262)_
- [ ] **51.** Emitir o Livro de Registro de medicamentos controlados de acordo com os padrões da ANVISA. _(TR, p. 262)_
- [ ] **52.** Emitir alerta de medicação sem saldo, trazendo informações do nº de dias que o medicamento está em falta na unidade. _(TR, p. 262)_
- [ ] **53.** Emitir alerta de movimentações em aberto, que ainda não foram efetivadas. _(TR, p. 262)_
- [ ] **54.** Emitir alerta de demanda reprimida, para que o gestor possa acompanhar os pacientes que necessitam de determinada medicação. _(TR, p. 262)_
- [ ] **55.** Possuir tela para cadastro de máquinas e impressoras, podendo definir a interface de comunicação (A15, HL7 ou ZPL) _(TR, p. 262)_
- [ ] **56.** Permitir a vinculação de operador do sistema com as máquinas/impressoras cadastradas. _(TR, p. 262)_
- [ ] **57.** Possuir configuração para impressão de etiquetas parametrizáveis com código de barras, para facilitar a dispensação de medicamentos. _(TR, p. 262)_
- [ ] **58.** Permitir a emissão de relatórios de balanço de estoque por período, discriminando o estoque anterior, entradas, consumo, perdas e saldo em estoque por produto, a nível de Unidade ou geral. _(TR, p. 262)_
- [ ] **59.** Permitir a emissão de relatórios de controle de demanda não atendida por paciente. _(TR, p. 262)_
- [ ] **60.** Emitir relatórios estatísticos sobre entradas e consumo dos produtos, bem como de saldos em estoque. _(TR, p. 262)_
- [ ] **61.** Emitir relatórios com informações sobre o saldo e prazos de validade dos medicamentos, bem como de sua localização nas Unidades. _(TR, p. 262)_
- [ ] **62.** Emitir relatórios de controle de movimentação exclusivos para medicamentos manipulados e/ou psicotrópicos. _(TR, p. 262)_
- [ ] **63.** Permitir a emissão de relatórios de consumo de medicamentos psicotrópicos por paciente. _(TR, p. 262)_
- [ ] **64.** Emitir relatórios de controle financeiro tais como saldo em estoque por produto, produtos dispensados aos pacientes, custo total por paciente, demonstrativo mensal de saídas de medicamentos, lucro por paciente. _(TR, p. 262)_
- [ ] **65.** Emitir relatório de controle financeiro pedidos atendidos por unidade e período. _(TR, p. 262)_
- [ ] **66.** Permitir a emissão do livro de medicamentos controlados (Livro de Psicotrópicos). _(TR, p. 263)_
- [ ] **67.** Emitir relatório Histórico de Consumo do Paciente por Período. _(TR, p. 263)_
- [ ] **68.** Permitir a emissão do relatório de curva ABC. _(TR, p. 263)_
- [ ] **69.** Emitir relatório de entrada de produtos por nota fiscal. _(TR, p. 263)_
- [ ] **70.** Emitir relatório de posição de estoque. _(TR, p. 263)_
- [ ] **71.** Emitir relatório de valor em estoque. _(TR, p. 263)_
- [ ] **72.** Emitir relatório de transferência de produtos. _(TR, p. 263)_
- [ ] **73.** Emitir relatório de estoque por tipo de saída. _(TR, p. 263)_
### Módulo Produção e Faturamento _(p. 263)_

- [ ] **1.** Módulo totalmente interligado com os demais sistemas concentrando todos os procedimentos realizados e toda estatística das unidades de saúde. _(TR, p. 263)_
- [ ] **2.** Possuir rotina de abertura/fechamento de competências. _(TR, p. 263)_
- [ ] **3.** Permitir o controle de competências de trabalho, podendo ter diversas competências em aberto, bloqueadas ou fechadas, sendo que o usuário somente poderá alterar e incluir dados em competências com status em aberto. _(TR, p. 263)_
- [ ] **4.** Permitir atualização das tabelas Sigtap mensalmente. _(TR, p. 263)_
- [ ] **5.** Garantir que as informações obrigatórias sejam validadas na interface com o usuário e na camada de negócio, avisando ao usuário do sistema via mensagem ou destacando em cor vermelha o campo ou informação que está incompleta ou sem preenchimento. _(TR, p. 263)_
- [ ] **6.** Permitir a digitação da produção ambulatorial através das ROA's, BAU's e comprovantes de agendamento, separando por grupo de atendimento, profissional e data. _(TR, p. 263)_
- [ ] **7.** Permitir visualização de porcentagem de procedimentos digitados por agenda. _(TR, p. 263)_
- [ ] **8.** Possuir uma listagem que já traga os usuários agendados filtrando por data/turno e profissional, facilitando a digitação dos mapas de atendimento. _(TR, p. 263)_
- [ ] **9.** Possuir meio de vincular o agendamento à produção que está sendo digitada, através de um código de identificação, facilitando o controle de realização do atendimento e também a localização automática das informações para a digitação. _(TR, p. 263)_
- [ ] **10.** Permitir o faturamento de atendimentos feitos aos pacientes, para guarda de histórico, mesmo sendo de procedimentos consolidados. _(TR, p. 263)_
- [ ] **11.** Possuir meio de efetuar a digitação da produção agendada em bloco, de modo a digitar de uma só vez todo o mapa de consultas. _(TR, p. 264)_
- [ ] **12.** Permitir a digitação de produções de atendimentos não agendados, guardando informações do profissional executor, paciente, data, turno, procedimentos e CIDS. _(TR, p. 264)_
- [ ] **13.** Permitir a digitação de produções de diversas unidades de saúde. _(TR, p. 264)_
- [ ] **14.** Possuir bloqueio no momento da digitação para não permitir a inserção ou registro de produção com data de atendimento fora do intervalo de vigência da competência de registro. _(TR, p. 264)_
- [ ] **15.** Emitir alerta ao usuário quando os dados do paciente estiverem incompletos em seu cadastro, a fim de evitar glosas. _(TR, p. 264)_
- [ ] **16.** Efetuar a consistência da produção no ato da digitação, com relação aos procedimentos e seus relacionamentos e validações com os CBOs, serviços/classificações habilitados para a hierarquia da Unidade, CIDS, habilitações, idade e sexo do paciente, validando pela competência vigente, a fim de evitar glosas no faturamento. _(TR, p. 264)_
- [ ] **17.** Possuir funcionalidade para validar os procedimentos de acordo com o paciente/competência, não ultrapassando a quantidade máxima de procedimentos assim como sugere o sigtap. _(TR, p. 264)_
- [ ] **18.** Possibilitar a digitação da produção também de forma consolidada, com validação dos procedimentos pela exigência de informação de idade e classificação pela Unidade, possibilitando contemplar o profissional que a realizou, para a emissão de relatórios estatísticos de produção dos profissionais. _(TR, p. 264)_
- [ ] **19.** Possibilitar o faturamento de atendimentos com data inferior a da competência em aberto na competência vigente. _(TR, p. 264)_
- [ ] **20.** Possibilitar o faturamento da Produção Hospitalar, advindas do módulo Pronto Atendimento, listando para o operador do sistema somente os profissionais ativos na unidade selecionada. _(TR, p. 264)_
- [ ] **21.** Permitir a realização do fechamento da produção, emitindo um relatório de inconsistências ao usuário para correções antes da emissão do arquivo. _(TR, p. 264)_
- [ ] **22.** Permitir a configuração das informações da Secretaria Municipal de Saúde, necessárias para a emissão do BPA, tais como nomenclatura, CNPJ e sigla. _(TR, p. 264)_
- [ ] **23.** Permitir, na apuração e montagem do BPA, a separação automática dos procedimentos em BPA consolidado e individualizado, de acordo com a classificação do Ministério da Saúde, podendo ser apurado por uma ou mais unidades. _(TR, p. 265)_
- [ ] **24.** Permitir a importação de arquivos de BPA de outros sistemas para a base de dados, para a geração de um arquivo único e guarda de histórico. _(TR, p. 265)_
- [ ] **25.** Realizar a consistência de arquivos de BPA importados, gerando relatório com críticas de acertos necessários antes da importação. _(TR, p. 265)_
- [ ] **26.** Permitir a geração do arquivo de BPA em meio magnético, para exportação direta para o aplicativo SIASUS. _(TR, p. 265)_
- [ ] **27.** Permitir a geração dos arquivos de BPA distintos para procedimentos PAB (Atenção Básica) e MAC (Média e Alta Complexidade). _(TR, p. 265)_
- [ ] **28.** Possibilitar a emissão de relatórios do BPA consolidado e individualizado, com possibilidade de separação por complexidade, inclusive de competências anteriores. _(TR, p. 265)_
- [ ] **29.** Permitir o cadastro manual da FPO (ficha de programação físicoorçamentária), podendo fazê-lo por grupo, subgrupo, nível e procedimento. _(TR, p. 265)_
- [ ] **30.** Possibilitar a emissão automática da FPO (ficha de programação físicoorçamentária) com base na produção digitada, permitindo a alteração e inclusão da programação por unidade. _(TR, p. 265)_
- [ ] **31.** Permitir a emissão da FPO em arquivo para importação direta no programa FPO Magnético (Datasus), podendo ser exportada somente de uma ou mais unidades de saúde. _(TR, p. 265)_
- [ ] **32.** Possibilitar a emissão da FPO em relatório, separando por unidade, competência e complexidade dos procedimentos, permitindo inclusive a impressão de competências anteriores. _(TR, p. 265)_
- [ ] **33.** Permitir a geração automática da produção dos exames laboratoriais que foram realizados no módulo de Laboratório. _(TR, p. 265)_
- [ ] **34.** Permitir a apuração e exportação do arquivo RAAS. _(TR, p. 265)_
- [ ] **35.** Permitir o cadastro, apuração e exportação do arquivo de AIH. _(TR, p. 265)_
- [ ] **36.** Permitir o cadastro de teto financeiro da unidade, informando a competência e o valor do teto. _(TR, p. 265)_
- [ ] **37.** Permitir a impressão do relatório de controle de remessa. _(TR, p. 265)_
- [ ] **38.** Emitir relatório histórico geral do usuário no período. _(TR, p. 265)_
- [ ] **39.** Emitir Relação de Usuários ativos e inativos. _(TR, p. 266)_
- [ ] **40.** Emitir relatório estatístico de CIDs diagnosticados por Unidade/Período. _(TR, p. 266)_
- [ ] **41.** Emitir relatório estatístico de CIDs diagnosticados por Especialidade e Idade. _(TR, p. 266)_
- [ ] **42.** Emitir relatório estatístico de CIDs diagnosticados por Idade do paciente. _(TR, p. 266)_
- [ ] **43.** Emitir relatório estatístico de CIDs diagnosticados por profissional. _(TR, p. 266)_
- [ ] **44.** Emitir relatório estatístico de CIDs diagnosticados por Especialidade/ Unidade. _(TR, p. 266)_
- [ ] **45.** Emitir relatório estatístico de CIDs diagnosticados por Município. _(TR, p. 266)_
- [ ] **46.** Emitir relatório estatístico de CIDs diagnosticados por Período e Classificação. _(TR, p. 266)_
- [ ] **47.** Emitir relatório estatístico de produção de Profissionais por CBO. _(TR, p. 266)_
- [ ] **48.** Emitir relatório estatístico de produção por procedimento/ Competência. _(TR, p. 266)_
- [ ] **49.** Emitir relatório estatístico de produção por profissional da Unidade. _(TR, p. 266)_
- [ ] **50.** Emitir relatório estatístico de produção por Unidade. _(TR, p. 266)_
- [ ] **51.** Emitir relatório estatístico de produção em valor/ mensal. _(TR, p. 266)_
- [ ] **52.** Emitir relatório estatístico de produção por tipo de financiamento. _(TR, p. 266)_
- [ ] **53.** Emitir relatório estatístico de produção de exames. _(TR, p. 266)_
- [ ] **54.** Emitir relatório estatístico de produção de atendimentos por profissional. _(TR, p. 266)_
- [ ] **55.** Emitir relatório estatístico de produção de procedimentos geral. _(TR, p. 266)_
- [ ] **56.** Emitir relatório estatístico de produção por sexo do paciente. _(TR, p. 266)_
- [ ] **57.** Emitir relatório de profissionais com produção já digitada por competência. _(TR, p. 266)_
- [ ] **58.** Emitir relatório consolidado de produção por CBO. _(TR, p. 266)_
- [ ] **59.** Emitir relatório de Produção digitada por Competência. _(TR, p. 266)_
- [ ] **60.** Emitir relatório em gráfico comparativo de procedimentos realizados. _(TR, p. 266)_
- [ ] **61.** Emitir relatório em gráfico comparativo de valores da produção. _(TR, p. 266)_
- [ ] **62.** Emitir relatório em gráfico comparativo de produção por unidade/ período. _(TR, p. 266)_
- [ ] **63.** Emitir relatório em gráfico comparativo de produção por CBO/unidade. _(TR, p. 266)_
- [ ] **64.** Emitir relatório produção Individualizada por profissional e unidade. _(TR, p. 266)_
- [ ] **65.** Emitir listagem de procedimentos x CBO. _(TR, p. 266)_
- [ ] **66.** Emitir listagem de CBOs. _(TR, p. 266)_
- [ ] **67.** Emitir listagem de Serviço/ Classificação por Unidade. _(TR, p. 266)_
- [ ] **68.** Emitir listagem de Procedimento x CBO e Instrumento de registro. _(TR, p. 266)_
- [ ] **69.** Emitir listagem de Procedimentos. _(TR, p. 266)_
- [ ] **70.** Emitir listagem de procedimentos x tipo de financiamento. _(TR, p. 267)_
- [ ] **71.** Emitir relatório de relação de recepções por profissinal. _(TR, p. 267)_
### Módulo Gerencial _(p. 267)_

- [ ] **1.** Possibilitar acesso rápido no cadastro de paciente a dados de histórico dos atendimentos realizados na rede. _(TR, p. 267)_
- [ ] **2.** Possibilitar a emissão do cartão de identificação do paciente, bem como da ficha de prontuário do mesmo, para utilização dos serviços de Saúde, com dados básicos de identificação do mesmo. _(TR, p. 267)_
- [ ] **3.** Possibilitar a emissão do histórico do paciente em relatório ou em tela (dentro do cadastro do próprio usuário), contendo informações sobre agendamentos, diagnósticos, exames agendados, medicamentos etc, por período desejado, incluindo os valores dos serviços prestados, para mensuração de custos. _(TR, p. 267)_
- [ ] **4.** Permitir o registro de acolhimentos realizados aos pacientes, onde o gestor poderá registrar toda a conversa com o paciente, o que foi solicitado e qual a resposta foi dada. _(TR, p. 267)_
- [ ] **5.** Registrar e possibilitar o acesso ao histórico de acolhimentos feitos no histórico do paciente. _(TR, p. 267)_
- [ ] **6.** Permitir o acesso à listagem de ouvidorias registradas no Portal do paciente, possibilitando a visualização e envio de respostas, servindo como um canal de comunicação entre gestão e cidadãos. _(TR, p. 267)_
- [ ] **7.** Permitir anexar documentos de procedimentos padrão para o sistema. _(TR, p. 267)_
- [ ] **8.** Permitir que os documentos digitalizados possam ser salvos em formato PDF ou similar. _(TR, p. 267)_
- [ ] **9.** Permitir cadastro de função do usuário, vinculando a unidade e a sua função. _(TR, p. 267)_
- [ ] **10.** Possuir funcionalidade para gerenciar o nivel de acesso do usuário de forma integral a multiplos módulos do sistema. _(TR, p. 267)_
- [ ] **11.** Emitir relatórios e gráficos de acessos ao sistema, com informações de acessos realizados por usuário. _(TR, p. 267)_
- [ ] **12.** Possibilitar salvar os relatórios e gráficos de acesso em arquivo PDF. _(TR, p. 267)_
- [ ] **13.** Possibilitar o acesso aos principais relatórios gerenciais referentes agendamento de atendimentos aos pacientes. _(TR, p. 267)_
- [ ] **14.** Possibilitar o acesso aos principais relatórios gerenciais referentes ao controle de estoque de medicamentos da farmácia. _(TR, p. 267)_
- [ ] **15.** Possibilitar o acesso aos principais relatórios gerenciais referentes ao laboratório. _(TR, p. 268)_
- [ ] **16.** Possibilitar o acesso aos principais relatórios gerenciais referentes à produção ambulatorial. _(TR, p. 268)_
- [ ] **17.** Possibilitar o acesso aos principais relatórios gerenciais referentes à central de regulação municipal. _(TR, p. 268)_
- [ ] **18.** Possibilitar o acesso aos principais relatórios gerenciais referentes à atenção básica municipal. _(TR, p. 268)_
- [ ] **19.** Servir ao gestor como um centralizador das informações Gerenciais de todas as áreas, necessárias para a gestão e tomada de decisões. _(TR, p. 268)_
- [ ] **20.** Possibilitar ao gestor configuração dos gráficos dos módulos do sistema. _(TR, p. 268)_
- [ ] **21.** Emitir relatório de quantitativo de acolhimentos por profissional e período. _(TR, p. 268)_
### Módulo Pronto Atendimento _(p. 268)_

- [ ] **1.** Possibilitar cadastro das recepções realizadas aos pacientes, com vinculação ao convênio que o mesmo utilizará, possibilidade de encaminhamento para a triagem com classificação de risco, ou atendimento médico direto. _(TR, p. 268)_
- [ ] **2.** Permitir recepcionar os usuários com ou sem identificação. _(TR, p. 268)_
- [ ] **3.** Permitir editar as informações cadastrais do paciente, informar o acompanhante inserindo seu grau de parentesco e telefone para contato. _(TR, p. 268)_
- [ ] **4.** Possibilidade de informar na tela de recepção quando o paciente for deficiente, gestante ou idoso. Esta informação será visível na tela de triagem e atendimento, possibilitando que o profissional dê prioridade a este usuário/paciente. _(TR, p. 268)_
- [ ] **5.** Permitir identificar na recepção se o paciente chegou com meios próprios ou por recursos de socorro. _(TR, p. 268)_
- [ ] **6.** Permitir emissão do BAU, e declaração de comparecimento na recepção. _(TR, p. 268)_
- [ ] **7.** Permitir controle de listagem de recepções dos pacientes aguardando atendimento, podendo o operador do sistema acompanhar status da recepção realizada. _(TR, p. 268)_
- [ ] **8.** Permitir cadastro de admissão na urgência, identificando pacientes com urgência, ou em condições ameaçadoras de vida. _(TR, p. 268)_
- [ ] **9.** Possibilitar o controle de pacientes para triagem através de um painel de chamada, com exibição do nome dos pacientes. _(TR, p. 268)_
- [ ] **10.** Possibilitar registro da triagem do atendimento, com informações iniciais de queixas, classificação de risco (Protocolo de Manchester), antropometria, condições de saúde, e procedimentos realizados. _(TR, p. 269)_
- [ ] **11.** Possibilitar na triagem, encaminhar o paciente para o atendimento, outros destinos, ou liberar o mesmo, caso não necessite de atendimento médico. _(TR, p. 269)_
- [ ] **12.** Permitir registro de procedimentos ou medicações realizadas ao paciente pós atendimento. _(TR, p. 269)_
- [ ] **13.** Possuir listagem de triagens realizadas por período e setor. _(TR, p. 269)_
- [ ] **14.** Permitir que o profissional visualize o tempo de espera por paciente e prioridade de atendimento classificado por cores de acordo com o protocolo de Manchester. _(TR, p. 269)_
- [ ] **15.** Possibilitar ordenar os pacientes para atendimento conforme prioridade de grupo. _(TR, p. 269)_
- [ ] **16.** Possibilidade de registrar na listagem de atendimentos, se o paciente evadiu, ou cancelar o atendimento removendo o paciente da lista de espera para atendimento. _(TR, p. 269)_
- [ ] **17.** Permitir na listagem de atendimentos verificar pacientes já atendidos, ou pacientes que já foram atendidos e estão em observação. _(TR, p. 269)_
- [ ] **18.** Permitir registro de demanda espontânea, informando a unidade, grupo especialidade/especialidade, setor, paciente, e lançamento do observação. _(TR, p. 269)_
- [ ] **19.** Possibilitar o registro eletrônico do atendimento realizado ao paciente pelo profissional da saúde, com informações da anamnese advindas da triagem, avaliação física, dados clínicos, procedimentos executados na consulta, CIAP e CID diagnosticados. _(TR, p. 269)_
- [ ] **20.** Permitir ao abrir a tela de atendimento consultar o histórico de consultas dos últimos 90 dias realizados para o paciente, com possibilidade de visualização de tudo o que foi feito no atendimento, como o que foi descrito pelo profissional, exames solicitados e avaliados, medicamentos receitados e todos os outros detalhes do atendimento. _(TR, p. 269)_
- [ ] **21.** Permitir registro de conduta de encaminhamento aplicada ao paciente, durante o atendimento através de encaminhamento intersetorial, encaminhamento para urgência, óbito, ou a alta do episódio informando o motivo da alta: decisão médica, a pedido, evasão ou desistência. Possibilidade também de encaminhar o paciente para observação, informando a justificativa e o diagnóstico inicial de observação, permitindo que outros profissionais da rede tenham acesso. _(TR, p. 269)_
- [ ] **22.** Permitir realizar o atendimento de reavaliação do paciente quando necessário. _(TR, p. 270)_
- [ ] **23.** Permitir consultar o histórico geral do paciente, filtrando as informações por módulo e período específico. _(TR, p. 270)_
- [ ] **24.** Possibilitar a atualização dos dados cadastrais dos usuários a qualquer momento durante o atendimento, conforme o privilégio de acesso do profissional. _(TR, p. 270)_
- [ ] **25.** Possibilitar ao profissional ao final do atendimento realizar cadastro de indicação cirúrgica; cadastro de atestado médico; solicitação eletrônica de exames integrado ao sistema de laboratório; cadastro de receitas eletrônicas e solicitação de medicação, integrado ao sistema de farmácia; cadastro guia de referência, informando o motivo do encaminhamento; cadastro de solicitação e autorização de AIH; cadastro de atendimento na medicina do trabalho, informando os exames médicos: admissional, periódico ou demissional, mudança de função de cargo, procedimentos realizados, parecer final, e risco ocupacional quando existir. _(TR, p. 270)_
- [ ] **26.** Possibilitar realizar a visualização em tela e impressão da ficha de atendimento médico, BAU/FAA - pronto atendimento, guia de referência de encaminhamento, atestado, declaração de comparecimento, requisições de exames, e impressão das receitas para o paciente, entre outros documentos. _(TR, p. 270)_
- [ ] **27.** Possuir rotina para informar evolução clínica do paciente. _(TR, p. 270)_
- [ ] **28.** Possuir acompanhamento de recém nascidos, com possibilidade de informar o nome da mãe, data de nascimento, óbito, necessidade de UTI, e vacinas aplicadas. _(TR, p. 270)_
- [ ] **29.** Possuir Controle de refeições por unidade, informando o quantitativo diário de refeições por paciente, acompanhante e funcionário. _(TR, p. 270)_
- [ ] **30.** Permitir controle de registro de Autorização de Internação Hospitalar (AIH), verificando na tela a classificação de cores das solicitações que já foram autorizadas, e que ainda não foram autorizadas. Possibilitar ao usuário, após autorização de internação, internar o paciente inserindo-o em um leito para observação. Incluir ou acompanhar registro de informações sobre observações de enfermagem, evolução médica, informações de internação do paciente, ficha de Internação e registro de alta. _(TR, p. 270)_
- [ ] **31.** Permitir visualização e impressão de relatório Declaração de Alta. _(TR, p. 271)_
- [ ] **32.** Permitir novo cadastro de observação, e inclusão de solicitação de usuários para observação, possibilidade de informar o responsável pela observação, o quarto, o leito, o profissional solicitante, especialidade, data e hora de cadastro de início de observação do paciente. _(TR, p. 271)_
- [ ] **33.** Permitir que seja realizado o acompanhamento da observação do paciente, onde o enfermeiro poderá informar diariamente, a situação de saúde do paciente, incluindo medicamentos e procedimentos realizados. _(TR, p. 271)_
- [ ] **34.** Possuir painel de controle de leitos por unidade e setor, com opção de visualização dos quartos e leitos, informando sobre o seu status: ocupado, livre, em manutenção, reservado, ou se está em limpeza. _(TR, p. 271)_
- [ ] **35.** Permitir a vinculação e visualização dos pacientes ao leito, possibilitando a sua transferência de leito quando necessário, informando a situação do paciente: em observação, liberado, internado, transferido ou óbito. Permitir no ato informar a situação do leito. _(TR, p. 271)_
- [ ] **36.** Possuir controle de painel de chamada que seja acionado pela recepção, pela triagem ou pelo consultório, permitir visualização de próximos pacientes a serem chamados. _(TR, p. 271)_
- [ ] **37.** Permitir o controle de prescrição de medicamentos, com informações do paciente na tela, medicamentos solicitados, sua posologia, quantidade e aplicação. _(TR, p. 271)_
- [ ] **38.** Permitir o controle de prescrição de procedimentos, por setor e sala podendo visualizar pacientes para atendimento e paciente já atendidos. _(TR, p. 271)_
- [ ] **39.** Permitir o controle e emissão de Laudos médicos. _(TR, p. 271)_
- [ ] **40.** Possuir cadastro de salas de atendimento e triagem vinculadas à unidade de atendimento. _(TR, p. 271)_
- [ ] **41.** Possuir cadastro de agendas dos profissionais. _(TR, p. 271)_
- [ ] **42.** Possuir cadastro de destinos. _(TR, p. 271)_
- [ ] **43.** Possibilitar o cadastro de classificações de riscos (Protocolo de Manchester) definindo prioridade. _(TR, p. 271)_
- [ ] **44.** Possibilitar emissão de relatório Relação de Pacientes Atendidos. _(TR, p. 271)_
- [ ] **45.** Possibilitar emissão de relatório Histórico Geral do Usuário no Período. _(TR, p. 271)_
- [ ] **46.** Possiblitar a emissão de relatório de Recepções por Município e Bairro. _(TR, p. 271)_
- [ ] **47.** Possibilitar emissão de relatório Procedimentos Realizados por Dia/Triagem. _(TR, p. 272)_
- [ ] **48.** Possibilitar emissão de relatório de Transferências por Período de Observação. _(TR, p. 272)_
- [ ] **49.** Possibilitar emissão de relatório de Refeições Entregues por Unidade. _(TR, p. 272)_
- [ ] **50.** Possibilitar emissão de relatório de Despesas por Paciente em Observação. _(TR, p. 272)_
- [ ] **51.** Possibilitar emissão de relatório de Vacinas Aplicadas em Recém Nascidos. _(TR, p. 272)_
- [ ] **52.** Possibilitar emissão de relatório de Procedimentos Realizados Nos Pacientes Internados. _(TR, p. 272)_
- [ ] **53.** Possibilitar emissão de relatórios de Atendimentos Médicos Realizados/Faturados por Unidade e Procedência. _(TR, p. 272)_
- [ ] **54.** Possibilitar emissão de relatório Atendimentos Médicos Não Faturados por Unidade. _(TR, p. 272)_
- [ ] **55.** Possibilitar emissão de relatório de Atendimentos por Classificação. _(TR, p. 272)_
- [ ] **56.** Possibilitar emissão de relatório de Observações por Usuário e Data. _(TR, p. 272)_
- [ ] **57.** Possibilitar emissão de relatório de Atendimentos por Profissional, Hora e Data de Baixa. _(TR, p. 272)_
- [ ] **58.** Possibilitar emissão de relatório de Triagem por Unidade, Hora e Data. Laboratório _(TR, p. 272)_
- [ ] **1.** Possuir sistema de notificação de avisos para Exames Marcados para Recoleta, ou Solicitações Marcadas como Urgente. _(TR, p. 272)_
- [ ] **2.** Permitir definir e aplicar verificação de histórico para que o mesmo usuário possa solicitar o mesmo exame por determinado dias. _(TR, p. 272)_
- [ ] **3.** Permitir integração com máquinas laboratoriais, informando a interface de comunicação: A15, HL7 ou ZPL, e o tipo de máquina: analisador ou impressora. _(TR, p. 272)_
- [ ] **4.** Permitir cadastro de máquinas laboratoriais por usuário. _(TR, p. 272)_
- [ ] **5.** Permitir a configuração por unidade de utilização de assinatura digital, mensagem a ser impressa no resultado dos exames e utilização do portal do paciente para disponibilização do resultado online. _(TR, p. 272)_
- [ ] **6.** Permitir faturar de forma automática a produção laboratorial, integrada ao sistema de faturamento. _(TR, p. 272)_
- [ ] **7.** Permitir organizar os questionários dos exames por tipo de cadastro. _(TR, p. 272)_
- [ ] **8.** Permitir o registro de questionários tipo: avaliação, checklist ou pesquisa. _(TR, p. 272)_
- [ ] **9.** Restringir a utilização do questionário por controle de situação (ativo ou inativo) e mediante a data de vigência inicial e final. _(TR, p. 273)_
- [ ] **10.** Permitir o registro de grupos por questionário, mantendo uma visualização organizada, sobretudo para os exames que possuem grupos ou séries, como o Hemograma. _(TR, p. 273)_
- [ ] **11.** Possuir cadastro de materiais, e a vinculação de materiais à exames. _(TR, p. 273)_
- [ ] **12.** Possibilitar que o usuário do sistema modifique a ordem de visualização dos grupos em interface de fácil utilização. _(TR, p. 273)_
- [ ] **13.** Permitir o registro de itens do questionário, sendo estes ligados ao grupo do questionário escolhido pelo usuário. _(TR, p. 273)_
- [ ] **14.** Possibilitar que itens possam ser cadastrados, mas não sejam impressos no relatório de resultados. _(TR, p. 273)_
- [ ] **15.** Possuir cadastro de unidades de medida. _(TR, p. 273)_
- [ ] **16.** Possibilitar a parametrização do item do questionário, sendo possível classificação pelos tipos: caracteres com definição de tamanho máximo, numérico com definição de quantidades de casas decimais permitidas, campo texto, campo texto com máscara sendo possível definição pelo próprio usuário, campo múltipla escolha com registro de opções, campo caixa de seleção com registro de opções ou campo calculado permitindo a vinculação dos demais itens e possibilitando o registro de cálculos entre os mesmos. _(TR, p. 273)_
- [ ] **17.** Permitir o registro de referência por item do questionário, sendo possível a parametrização de sexo, idade ou valor. _(TR, p. 273)_
- [ ] **18.** Permitir o cadastro, alteração, exclusão e inativação de grupos de exames, com possibilidade de separação de grupo por página de resultado de modo a organizar a impressão dos resultados. _(TR, p. 273)_
- [ ] **19.** Permitir o cadastramento de valores de referências para os itens dos exames, de modo que o sistema efetue a crítica para valores alterados. _(TR, p. 273)_
- [ ] **20.** Permitir o cadastro, alteração e exclusão dos exames, vinculando-o ao modelo de resultado de exame padrão e possibilitando a vinculação do exame ao serviço sus padrão, classificando-os quanto a sexo e faixa etária permitidos para o mesmo. _(TR, p. 273)_
- [ ] **21.** Permitir a vinculação de registro de recomendações/preparo para a realização do exame em seu cadastro. _(TR, p. 273)_
- [ ] **22.** Permitir no cadastro do exame, informar se o exame será realizado no município ou não, podendo ser vinculado a Unidade Externa de Realização de Exame. _(TR, p. 274)_
- [ ] **23.** Possibilidade de vincular serviços secundários ao exame cadastrado. _(TR, p. 274)_
- [ ] **24.** Permitir cadastro de bancada e vinculação de exames a bancadas. _(TR, p. 274)_
- [ ] **25.** Permitir a vinculação de exames à Unidade de Saúde, definindo os dias para entrega de resultado. _(TR, p. 274)_
- [ ] **26.** Permitir o cadastro de cronogramas de exames de forma fixa e diária por unidade, com controle de vagas por exame e data, informando o por número de requisições/dia. _(TR, p. 274)_
- [ ] **27.** Permitir a recepção de usuários informando a solicitação de exames. Possibilitar informar a unidade de saúde de solicitação e coleta, ou ponto de apoio vinculados à unidade de saúde, o profissional solicitante, se a solicitação foi externa, e a unidade de realização do exame. Permitir informar se o usuário é gestante, se o exame é de urgência. _(TR, p. 274)_
- [ ] **28.** Possibilidade de registrar coleta realizada por terceiros. _(TR, p. 274)_
- [ ] **29.** Possibilitar o agendamento de um ou mais exames em uma mesma solicitação. _(TR, p. 274)_
- [ ] **30.** Permitir registrar a data de coleta, horário de coleta, e a data prevista para entrega do resultado do exame. _(TR, p. 274)_
- [ ] **31.** Permitir identificar os exames por leitura de etiqueta com código de barra por transação. _(TR, p. 274)_
- [ ] **32.** Permitir o agendamento de coleta de exames, mediante o controle de vagas disponíveis ou quota da unidade, informando ao usuário se o paciente efetuou alguma coleta nos últimos 90 dias. _(TR, p. 274)_
- [ ] **33.** Permitir a emissão de comprovante de agendamento de exames, com informações sobre data e local de coleta, paciente, exames a serem coletados. _(TR, p. 274)_
- [ ] **34.** Permitir na impressão da guia na tela de solicitação laboratorial a opção que permita selecionar por Grupo de Exames _(TR, p. 274)_
- [ ] **35.** Permitir controle de triagens de solicitações, podendo o operador do sistema realizar a pesquisa informando a unidade de solicitação ou realização, a data de _(TR, p. 274)_
### coleta ou número da solicitação. Poderá também informar o status da solicitação: _(p. 274)_

> não realizado, coletado, solicitado, não compareceu. Possibilidade de visualização _(TR, p. 274)_
> na tela de acordo com a legenda do status das solicitações em cores. _(TR, p. 275)_
- [ ] **36.** Permitir o registro de recebimento e conferência das amostras para análise, e emissão dos resultados, por paciente e exame. A tela deverá dispor minimamente dos seguintes filtros: unidade de coleta, tipo de amostra, e data da coleta. _(TR, p. 275)_
- [ ] **37.** Permitir cadastro de resultado de exame sem necessidade de criar solicitação anterior. Permitir a digitação e impressão dos resultados de exames, possibilitando ainda destaque quando os valores estão alterados, conforme a parametrização dos itens. Permitir a assinatura eletrônica de resultado de exames laboratoriais, e impressão do resultado. _(TR, p. 275)_
- [ ] **38.** Permitir configurar laudo de exames microbiologicos. _(TR, p. 275)_
- [ ] **39.** Possibilidade de produzir resultados na máquina A15 de exames com data de coleta inferior à data atual. _(TR, p. 275)_
- [ ] **40.** Permitir controle de listagem de validação de exame, podendo o usuário do sistema realizar a conferência/correção dos resultados dos exames, a liberação para assinatura digital, além de chamar o paciente pelo painel de chamadas. Permitir visualização de resultados na tela listagem de validação de exame, de acordo com status selecionado no momento da pesquisa. _(TR, p. 275)_
- [ ] **41.** Permitir controle de liberação de exames, informando o registro de entrega dos resultados aos pacientes, podendo o operador do sistema verificar os exames já validados e liberados por unidade de solicitação e período. _(TR, p. 275)_
- [ ] **42.** Permitir controle de pesquisa rápida de solicitações, de acordo com o status que se encontra a solicitação: não digitado, coletado,liberado, parcial, e bloqueado. _(TR, p. 275)_
- [ ] **43.** Possibilitar a liberação dos exames para o portal do paciente, para que o paciente possa consultar e até mesmo imprimir seu resultado de casa. _(TR, p. 275)_
- [ ] **44.** Permitir solicitação de exames eletrônicas provenientes do prontuário eletrônico solicitado pelo médico durante o atendimento. _(TR, p. 275)_
- [ ] **45.** Permitir cadastro de recursos/serviços para controle de laboratórios terceirizados. _(TR, p. 275)_
- [ ] **46.** Permitir o controle de solicitações para laboratórios terceirizados, com controle de valores de solicitações de exames através de cotas previamente vinculadas aos recursos. _(TR, p. 275)_
- [ ] **47.** Permitir a escolha do prestador de serviço que realizará o procedimento. _(TR, p. 275)_
- [ ] **48.** Emitir a requisição autorizada, com chave de identificação única, para que o laboratório terceirizado possa realizar a confirmação de realização do procedimento. _(TR, p. 275)_
- [ ] **49.** Possibilitar o controle de fila de espera para requisições terceirizadas por serviço e unidade. _(TR, p. 276)_
- [ ] **50.** Possibilitar a emissão de mapas de exames agendados por data, com informações sobre cada coleta por paciente, de modo a facilitar o trabalho dos técnicos laboratoriais. _(TR, p. 276)_
- [ ] **51.** Possibilitar emissão de relatório que liste o quantitativo de exames realizados por período. _(TR, p. 276)_
- [ ] **52.** Possibilitar emissão de relatório que liste os agendamentos diários por exame/paciente. _(TR, p. 276)_
- [ ] **53.** Possibilitar emissão de relatório que liste o percentual de exames por período. _(TR, p. 276)_
- [ ] **54.** Possibilitar emissão de relatório que liste o cronograma fixo por Unidade de Saúde. _(TR, p. 276)_
- [ ] **55.** Possibilitar emissão de relatório de atendimentos por unidade de coleta. _(TR, p. 276)_
- [ ] **56.** Possibilitar a emissão dos resultados de exame por unidade de coleta _(TR, p. 276)_
- [ ] **57.** Emitir relatório quantitativo de exames solicitados no período. _(TR, p. 276)_
- [ ] **58.** Possibilitar emissão de relatório de histórico de gastos com o paciente. _(TR, p. 276)_
- [ ] **59.** Possibilitar emissão de relatório que liste o histórico do paciente. _(TR, p. 276)_
- [ ] **60.** Possibilitar a emissão do livro de entrega dos resultados de exames. _(TR, p. 276)_
- [ ] **61.** Emitir o mapa diário de coleta de solicitações. _(TR, p. 276)_
- [ ] **62.** Possibilitar a emissão dos resultados de exame por unidade solicitante. _(TR, p. 276)_
- [ ] **63.** Possibilitar emitir relatório estatístico de exames produzidos por pacientes gestantes. _(TR, p. 276)_
- [ ] **64.** Possibilitar emitir relatório estatístico de atendimentos por unidade de solicitação. _(TR, p. 276)_
- [ ] **65.** Possibilitar emitir relatório de tabela de preço dos itens do recurso. _(TR, p. 276)_
- [ ] **66.** Emitir relatório de recursos por unidade. _(TR, p. 276)_
- [ ] **67.** Emitir relatório de exames realizados por paciente. _(TR, p. 276)_
- [ ] **68.** Emitir relatório de exames realizados por unidade. _(TR, p. 276)_
- [ ] **69.** Emitir relatório relação de pacientes atendidos por exame com resultado. _(TR, p. 276)_
- [ ] **70.** Emitir relatório resultado exame - COVID. _(TR, p. 276)_
- [ ] **71.** Emitir relatório de declaração de Solicitação e/ou de Coleta de Exame. _(TR, p. 276)_
### Módulo Portal do Paciente _(p. 277)_

- [ ] **1.** Permitir configurações para agendamento no portal tais como: o paciente esperar o intervalo de determinados dias para agendar uma nova consulta, quantas vezes o paciente poderá cancelar suas consultas, bloquear o agendamento de novas consultas, caso o paciente tenha faltado a sua última consulta, quantos dias após ter faltado o paciente poderá agendar nova consulta. _(TR, p. 277)_
- [ ] **2.** Permitir inserir mensagens/imagens personalizadas de avisos apresentando os mesmo na tela assim que o usuário acessar o portal do paciente. _(TR, p. 277)_
- [ ] **3.** Permitir criação de login e senha de acesso ao paciente através dos outros módulos e emissão de uma carteirinha com os dados de orientação para acesso ao portal. _(TR, p. 277)_
- [ ] **4.** Possuir nível de acesso às informações, onde o gestor definirá o que será acessado pelos usuários do município. _(TR, p. 277)_
- [ ] **5.** Permitir que o paciente possa alterar sua senha. _(TR, p. 277)_
- [ ] **6.** Disponibilizar a opção de recuperar a senha através da tela de login. O usuário deverá informar seu cns e seu e-mail, informado no cadastro de usuário. O sistema enviará um link para o e-mail do usuário. Ao acessar o e-mail e clicar no link enviado pelo sistema, o usuário será redirecionado a uma página, na qual ele poderá redefinir uma nova senha. _(TR, p. 277)_
- [ ] **7.** Permitir a identificação do usuário logado no portal durante a utilização. _(TR, p. 277)_
- [ ] **8.** Permitir que o usuário possa consultar os cronogramas das unidades, podendo visualizar a data, a especialidade, o profissional, o turno de atendimento e o número de vagas programadas para atendimento. _(TR, p. 277)_
- [ ] **9.** Exibir pelo menos as seguintes informações relativas ao agendamento de consulta criado no sistema do município: data da agenda, horário, unidade de saúde, profissional, CBO _(TR, p. 277)_
- [ ] **10.** Exibir no momento de confirmação da consulta a possibilidade de inserção do numero de telefone caso seje necessário o usuário operado do sistema entrar em contato. _(TR, p. 277)_
- [ ] **11.** Permitir anexar imagens de encaminhamentos no ato do agendamento de consultas. _(TR, p. 277)_
- [ ] **12.** Permitir que o paciente tenha acesso ao histórico de seus atendimentos no Agendamento Interno e suas situações (agendado, solicitado, confirmado, faltou). _(TR, p. 277)_
- [ ] **13.** Permitir que o paciente tenha acesso a situação dos seus protocolos do sistema de Regulação. _(TR, p. 278)_
- [ ] **14.** Possibilitar que o paciente saiba o histórico de remédios que já utilizou dos serviços de farmácia. _(TR, p. 278)_
- [ ] **15.** Permitir que o usuário tenha acesso a visualizar o histórico de benefícios concedidos a ele pela rede pública. _(TR, p. 278)_
- [ ] **16.** Permitir que o paciente tenha acesso a visualizar o histórico de todos os atendimentos de atenção básica registrados para o mesmo e sua família através do sistema SISAB. _(TR, p. 278)_
- [ ] **17.** Permitir que o paciente consiga realizar o seu cadastro no portal do paciente de acordo com informações cadastradas no sistema do município. _(TR, p. 278)_
- [ ] **18.** Permitir ao usuário consultar seus dados cadastrais. _(TR, p. 278)_
- [ ] **19.** Permitir que o paciente possa cadastrar ouvidorias, classificando-as como Informação, Sugestão, Reclamação, Elogio, Denúncia ou Solicitação. _(TR, p. 278)_
- [ ] **20.** Permitir que o paciente possa registrar ouvidorias como anônimo. _(TR, p. 278)_
- [ ] **21.** Permitir que o paciente receba as respostas de suas ouvidorias enviadas pelo portal do paciente. _(TR, p. 278)_
- [ ] **22.** Permitir que o paciente tenha acesso a visualizar e imprimir resultados de exames que foram digitados no sistema de Laboratório, inclusive destacando os dados da última solicitação. _(TR, p. 278)_
### Módulo Prontuário Eletrônico _(p. 278)_

- [ ] **1.** Permitir recepção automática de usuários pré-agendados, ou a possibilidade de triagem espontânea, informando o profissional, especialidade da triagem, pressão, temperatura, peso, altura e o motivo da consulta, evolução da enfermagem, o registro de procedimentos, informar o nível de classificação de risco. Após finalizar o registro da triagem espontânea, o profissional deverá liberar o cidadão ou realizar o encaminhamento para atendimento. _(TR, p. 278)_
- [ ] **2.** Permitir verificação se um paciente já foi chamado por outro profissional. Ao clicar sobre o nome do paciente e o mesmo já estiver sendo chamado ou atendido por outro profissional, o sistema listará na tela uma mensagem de aviso informando que o usuário/paciente já está sendo atendido. _(TR, p. 278)_
- [ ] **3.** Na tela listagem de triagem/classificação de risco, o sistema deverá disponibilizar o filtro de pesquisa por profissional e data de atendimento, listando todos os usuários com consulta agendada de acordo com o filtro informado, e classificação de risco. _(TR, p. 278)_
- [ ] **4.** Permitir geração de ficha de atendimento individual após lançamento de procediementos na tela de triagem/classificação de risco. _(TR, p. 279)_
- [ ] **5.** Possibilitar a tomada de decisão de liberar o cidadão ou adicioná-lo na listagem de atendimento a partir da listagem de triagem. _(TR, p. 279)_
- [ ] **6.** Possuir tela específica para a triagem de atendimentos. Possibilitar que na tela de triagem seja informado o motivo da consulta através do código CIAP, a anamnese, avaliação física contemplando antropometria, os sinais vitais e medição de glicemia, o cálculo automático do IMC ao informar o peso e altura do paciente. Permitir classificar a prioridade de atendimento entre não urgente, pouco urgente, urgente, muita urgência, e emergência. Permitir registrar os procedimentos realizados. _(TR, p. 279)_
- [ ] **7.** Permitir na tela de Triagem/Classificação de Risco e Triagem Espontânea informações pertinentes ao Centro De Atenção Psicosocial - CAPS _(TR, p. 279)_
- [ ] **8.** Faturar automaticamente os procedimentos referentes à antropometria, aferição de pressão e glicemia, quando estes forem informados na triagem. _(TR, p. 279)_
- [ ] **9.** Permitir encaminhamento do usuário ao atendimento médico, liberar o cidadão caso não seja necessário atendimento médico, ou informar a falta do paciente. _(TR, p. 279)_
- [ ] **10.** Permitir a visualização de fila de espera para atendimento de acordo com a classificação de risco e grupo de prioridade. _(TR, p. 279)_
- [ ] **11.** Possuir configuração para definir a ordenação da lista de atendimentos. _(TR, p. 279)_
- [ ] **12.** Permitir calcular o tempo de espera do paciente a partir da recepção na tela de listagem de triagens, e listagem de atendimentos médicos a serem realizados. _(TR, p. 279)_
- [ ] **13.** Possuir registro de demanda espontânea. Os profissionais de saúde deverão ser capazes de atender usuários previamente agendados ou fazer a abertura diretamente do prontuário (sem inserção prévia na agenda) para atendimentos de demanda espontânea. _(TR, p. 279)_
- [ ] **14.** Permitir na tela de atendimento chamar o paciente pelo painel de chamadas, informar que o paciente evadiu, ou cancelar o atendimento removendo o paciente da lista de espera para atendimento. Possibilidade de verificar pacientes já atendidos, ou pacientes que já foram atendidos e estão em observação. _(TR, p. 279)_
- [ ] **15.** Possuir o registro de atendimentos médicos complementando a triagem/preparo de consulta do usuário com informações de anamnese, queixas, exame físico, lançamento de PA(mmHg) - pós triagem, dados clínicos, plano/intervenção, procedimentos realizados pelo médico, permitir o preenchimento de problemas e condições avaliadas, informar rastreamento e detecção de doenças, requisições de exames e registro de conduta e encaminhamentos. _(TR, p. 280)_
- [ ] **16.** Permitir ao abrir a tela de atendimento consultar o histórico de consultas dos últimos 90 dias realizados para o paciente, com possibilidade de visualização de tudo o que foi feito no atendimento, como o que foi descrito pelo profissional, exames solicitados e avaliados, medicamentos receitados e todos os outros detalhes do atendimento. _(TR, p. 280)_
- [ ] **17.** Ao finalizar o atendimento, o profissional de saúde poderá lançar informações sobre problemas/condições do usuário, realizar impressão de atestados e declaração de comparecimento; requisições de exames comuns e de alto custo; registro de lembretes para aquele paciente, vinculando-os a seu histórico; prescrições de medicamentos, com emissão da receita em duas vias, contendo dados da prescrição; registro e impressão de orientações; o registro e impressão de encaminhamentos, informar o motivo do encaminhamento com emissão da guia de referência e contrarreferência; possibilidade agendar retorno diretamente da tela de atendimento; possibilidade de deixar o paciente em observação; registro e acompanhamento de solicitação de AIH; cadastro e emissão de laudo; permitir o médico solicitar solicitações de serviços para o central de regulação; registro de avaliações de exames; possibilidade de anexar documentos digitalizados; inserção da ficha de atendimento individual nos moldes do eSUS; cadastro e acompanhamento de monitoramento Covid, registro de medicina do trabalho e cadastro de indicação cirúrgica. _(TR, p. 280)_
- [ ] **18.** Possibilitar que no momento da prescrição do médico, seja possível identificar os medicamentos de uso contínuo e se o medicamento está disponível no estoque da farmácia da unidade. Deverá emitir receita de medicamento enviando automaticamente a receita eletrônica para a Farmácia. _(TR, p. 280)_
- [ ] **19.** Permitir a impressão de receitas especiais para medicamentos de uso controlado, obedecendo aos padrões estabelecidos na Pt. 344. _(TR, p. 280)_
- [ ] **20.** Enviar automaticamente a requisição eletrônica de exames para o Laboratório. _(TR, p. 281)_
- [ ] **21.** Registrar todo o histórico de requisições, receitas, encaminhamentos e atestados no histórico do paciente. _(TR, p. 281)_
- [ ] **22.** Permitir a impressão ficha de atendimento médico, ao final do atendimento. _(TR, p. 281)_
- [ ] **23.** Permitir ao usuário navegar entre as unidades de saúde que ele tem permissão sem a necessidade de efetuar o logoff no sistema. _(TR, p. 281)_
- [ ] **24.** Permitir recepção automática de usuários pré-agendados, e a possibilidade de triagem espontânea, com seleção da ordem de atendimento, e informação do tempo de espera. _(TR, p. 281)_
- [ ] **25.** Possibilitar o registro de triagem odontológica espontânea para atendimento odontológico, informando o profissional, especialidade da triagem, pressão, temperatura, peso, altura e o motivo da consulta. Viabilizar o registro de procedimentos gerando faturamento em BPA – Boletim de Produção Ambulatorial. Permitir informar o nível de classificação de risco. Após finalizar o registro da triagem, o profissional deverá liberar o cidadão ou realizar o encaminhamento para atendimento. _(TR, p. 281)_
- [ ] **26.** Permitir registro do atendimento odontológico com informações dos procedimentos realizados e a realizar no odontograma. Possibilitar o lançamento de diagnóstico individual dos dentes incluindo detalhamento (por dente, por face, geral, dente decíduo ou permanente). Proporcionar a visualização dos atendimentos realizados anteriormente para o usuário. _(TR, p. 281)_
- [ ] **27.** Possibilitar o preenchimento do tipo de consulta, vigilância em saúde bucal e fornecimento de produtos odontológicos em conformidade com a ficha de atendimento odontológico individual do e-SUS do Ministério da Saúde. _(TR, p. 281)_
- [ ] **28.** Possibilitar visualização de registro de informações do paciente contendo histórico de medicamentos dos últimos 30 dias e antropometria lançadas na triagem. Propiciar registro de anamnese, prescrição de medicamentos, impressão de atestado, declaração de comparecimento, registro de lembretes, orientações, encaminhamentos. Permitir a visualização dos documentos digitalizados para cada usuário atendido. _(TR, p. 281)_
- [ ] **29.** Possibilitar a consulta de histórico de todos os atendimentos odontológicos do usuário mostrando profissionais de atendimento, triagem odontológica, diagnósticos, procedimentos realizados, prescrições de medicamentos, entre outros. _(TR, p. 281)_
- [ ] **30.** Possibilitar a visualização das evoluções e os procedimentos realizados no odontograma. Permitir abrir e fechar tratamento odontológico conforme conduzido o tratamento. _(TR, p. 282)_
- [ ] **31.** Permitir cadastro de plano de diagnóstico, onde o usuário poderá criar um agrupamento de exames, para determinada condição de saúde. Possibilitando que no momento da solicitação de exames, seja possível o médico identificar os exames para aquela determinada situação. _(TR, p. 282)_
- [ ] **32.** Permitir preenchimento de fichas de notificação, quando o profissional registra um Cid notificável, e possibilitar controle de fichas já notificadas. _(TR, p. 282)_
- [ ] **33.** Permitir controle de medicamentos de uso contínuo, sendo cadastrado por profissional, usuário, trazendo na tela os medicamentos, quantidade e posologia. Possibilitando que no momento da prescrição do médico, seja possível identificar os medicamentos de uso contínuo. _(TR, p. 282)_
- [ ] **34.** Permitir cadastro de prescrição de medicamentos padrão, onde será cadastrado os medicamentos de uso padrão para determinadas condições de saúde, permitindo ao médico acesso a essa prescrição padrão durante o atendimento ao paciente. _(TR, p. 282)_
- [ ] **35.** Permitir remanejamento de sala de atendimento, quando for necessário remanejar paciente para outra sala. _(TR, p. 282)_
- [ ] **36.** Permitir cadastro de monitoramento COVID, informando o profissional responsável pelo atendimento, o usuário, o tipo de monitoramento, a situação, local de atendimento e pessoas que usuário teve contato próximo. _(TR, p. 282)_
- [ ] **37.** Possuir tela para impressão de receita de medicamentos de uso contínuo, sem precisar passar pelo atendimento médico. _(TR, p. 282)_
- [ ] **38.** Permitir cadastrar prescrição de medicamentos padrão, a fim de agilizar o cadastro de receitas. _(TR, p. 282)_
- [ ] **39.** Permitir cadastro de receita/medicação por usuário, informando o medicamento, quantidade, aplicação e posologia. _(TR, p. 282)_
- [ ] **40.** Possibilitar o cadastro de indicação cirúrgica, identificando o profissional solicitante, sua especialidade, registro de informações para o cirurgião, informações para internação, cirurgia. Permitir o lançamento de observação. _(TR, p. 282)_
- [ ] **41.** Possibilitar listar os pacientes aguardando agendamento de cirurgia a partir da tela fila cirúrgica, identificando o status para agendamento. _(TR, p. 282)_
- [ ] **42.** Permitir a partir da tela de fila cirúrgica lançar o registro de avaliação cirúrgica, podendo ser aprovado ou não; avaliação nutricional, a avaliação pré- anestésica, realizar a convocação de usuário para cirurgia, informando se o contato com o paciente foi realizado. Após realizar a programação cirúrgica identificando usuário, unidade de saúde, data e horário de realização, tipo de cirurgia, programação de leito pré operatório, leito cirúrgico e leito pós operatório. Permitir definir e confirmar equipe. _(TR, p. 283)_
- [ ] **43.** Possibilitar a pesquisa de usuários internados para realização das cirurgias a partir da tela de execução de cirurgia intra-operatório. _(TR, p. 283)_
- [ ] **44.** Possibilitar o registro de execução de cirurgias identificando usuário, cirurgia, sala de cirurgia, descrição da cirurgia, informações da anestesia, tempo previsto, informações de parto quando procedimento de parto, dados de internações, procedimentos realizados, equipamentos utilizados, materiais e equipe cirúrgica. _(TR, p. 283)_
- [ ] **45.** Permitir o registro do pós operatório, identificando se o paciente está em acompanhamento, e possibilitar o registro de liberado para alta. _(TR, p. 283)_
- [ ] **46.** Possibilitar o cadastro de classificações de riscos ( Protocolo de Manchester) definindo níveis, tempo de espera para atendimento e identificação de cor. _(TR, p. 283)_
- [ ] **47.** Emitir relatório de relação de Atendimentos Realizados por Profissional/Período _(TR, p. 283)_
- [ ] **48.** Emitir relatório de relação de Procedimentos Executado por Paciente. _(TR, p. 283)_
- [ ] **49.** Emitir relatório de Fluxo de Internação Municipal. _(TR, p. 283)_
- [ ] **50.** Emitir relatório de Histórico de Atendimentos do Paciente. _(TR, p. 283)_
- [ ] **51.** Emitir relatório Atendimento Realizados por Profissional - Odontograma. _(TR, p. 283)_
- [ ] **52.** Emitir relatório Atendimentos com CID Notificáveis. _(TR, p. 283)_
- [ ] **53.** Emitir relatório de relação de Atendimentos Realizados por Profissional e Período. _(TR, p. 283)_
- [ ] **54.** Emitir relatório de relação de Atendimentos Realizados por Município e Bairro. _(TR, p. 283)_
- [ ] **55.** Emitir relatório quantitativo de Exames solicitados por Médico. _(TR, p. 283)_
- [ ] **56.** Emitir relatório de relação de Gestantes Atendidas por Período. _(TR, p. 283)_
- [ ] **57.** Emitir relatório Produção de Procedimentos da Triagem por Profissional. _(TR, p. 283)_
- [ ] **58.** Emitir relatório de quantidade Atendimentos por Profissional. _(TR, p. 283)_
- [ ] **59.** Emitir relatório de quantidade de Procedimentos por Unidade e Profissional. _(TR, p. 283)_
- [ ] **60.** Permitir a emissão de BAU/FAA. _(TR, p. 284)_
### Módulo Central de Regulação _(p. 284)_

- [ ] **1.** Permitir parametrizar o uso de bloqueio de serviço para o paciente conforme regra de dias informado pelo município, sem interferir o uso de serviços diferentes ao informado na regra de bloqueio. _(TR, p. 284)_
- [ ] **2.** Possuir verificação de histórico do usuário, com base em dias de vigência, para exames e guia de encaminhamento. _(TR, p. 284)_
- [ ] **3.** Permitir controle de setor de classificação, por classificação única ou recebimento automático das solicitações. _(TR, p. 284)_
- [ ] **4.** Permitir o cadastro e a inativação de setores de regulação. Possibilidade de integração aos módulos: agendamento, laboratório, farmácia, entre outros. _(TR, p. 284)_
- [ ] **5.** Possuir nível de acesso de usuários por setor. _(TR, p. 284)_
- [ ] **6.** Possuir nivel de acesso de usuário por Recurso. _(TR, p. 284)_
- [ ] **7.** Possuir nivel de acesso de usuário por transporte. _(TR, p. 284)_
- [ ] **8.** Permitir o cadastro e a inativação de grupos de serviços. _(TR, p. 284)_
- [ ] **9.** Permitir o cadastro de todos os serviços por grupos a serem ofertados, vinculando-os a um CBO ou Procedimento, nos padrões do SUS. _(TR, p. 284)_
- [ ] **10.** Possuir nível de acesso de tipo grupo de serviço por usuário. _(TR, p. 284)_
- [ ] **11.** Permitir o registro de documentação necessária por serviço solicitado. _(TR, p. 284)_
- [ ] **12.** Permitir o cadastro dos tipos de providências a serem registrados nas tramitações nas solicitações. _(TR, p. 284)_
- [ ] **13.** Permite o cadastro e a inativação de prestadores de serviços. _(TR, p. 284)_
- [ ] **14.** Permitir o controle de cotas de vagas por unidade prestadora de serviços de saúde. _(TR, p. 284)_
- [ ] **15.** Permitir o cadastro e a inativação de agenda diária e agenda fixa por prestador e serviços, permitindo a adição de múltiplos serviços, com informações de vagas programadas por agenda. _(TR, p. 284)_
- [ ] **16.** Permitir o cadastro e a inativação de agenda mensal de serviço, e agenda fixa de serviço, com informações de mês de referência, vagas programadas e vagas agendadas. _(TR, p. 284)_
- [ ] **17.** Possibilitar a consulta rápida, em tela, do andamento de atendimento de todas as solicitações, possuindo, como meio de pesquisa, o nº de protocolo, data de solicitação, filtrando na tela os usuários solicitantes, unidade de solicitação, profissional solicitante, e visualização do atendente que cadastrou a solicitação. _(TR, p. 284)_
- [ ] **18.** Possuir cadastro de solicitações de atendimento, com informações da unidade solicitante, usuário solicitante, data, profissional solicitante, ou pedido externo (TFD). _(TR, p. 285)_
- [ ] **19.** Permitir configurar alerta ao operador caso o paciente possua dados essenciais incompletos no cadastro dando a opção de atualização conforme necessidade. _(TR, p. 285)_
- [ ] **20.** Permitir informar, no ato da solicitação, informações sobre dependência de transporte público e de acompanhante, indicar caso seja necessidades especiais, se é uma solicitação de retorno. _(TR, p. 285)_
- [ ] **21.** Permitir classificar as solicitações como urgência: urgentes, intermediário, não urgentes, e a pedido. _(TR, p. 285)_
- [ ] **22.** Permitir informar o motivo de encaminhamento, o parecer, o código CID de referência, e a vinculação de vários serviços numa mesma solicitação. _(TR, p. 285)_
- [ ] **23.** Após salvar a solicitação gerar automaticamente um número de protocolo para cada solicitação. Possibilidade de vincular arquivos de imagem ao protocolo da solicitação. _(TR, p. 285)_
- [ ] **24.** Permitir visualização e impressão de guia de solicitação em duas vias. _(TR, p. 285)_
- [ ] **25.** Possibilitar o encaminhamento da solicitação para outros setores, ou setor único. _(TR, p. 285)_
- [ ] **26.** Permitir registro de parecer do regulador a partir da tela de regulação, sendo possível realizar vários registros de providência, ficando registrado as datas de cada uma delas. _(TR, p. 285)_
- [ ] **27.** Permitir controle da fila de espera por setor, com organização de protocolos a receber, e recebidos, com destaque para protocolos com prioridade: alta, média, baixa, idosos, dependem de transporte, retorno, usuários inativos, ou filtro por serviço. Podendo filtrar por nome do paciente, número de protocolo , serviço solicitado e data de solicitação. _(TR, p. 285)_
- [ ] **28.** Permitir o arquivamento da solicitação a receber, e da fila de espera mediante a informação do motivo do arquivamento. Possibilidade de registro de providências nos protocolos, sendo possível realizar vários registros, ficando salvo as datas de cada uma delas. _(TR, p. 285)_
- [ ] **29.** Permitir o recebimento da solicitação, incluindo a na lista de espera para agendamento. Possibilidade de retornar solicitação a listagem de recebimento. _(TR, p. 286)_
- [ ] **30.** Permitir ao realizar um agendamento a informação de o que paciente está inativo no sistema pelo motivo de ÓBITO, solicitando ao operador do sistema que arquive a solicitação. _(TR, p. 286)_
- [ ] **31.** Permitir o agendamento da Solicitação retirando a mesma da fila de espera, com informações do prestador de serviço; data e hora de realização; lançamento de observação, preparo; permitir informar tipo de atendimento: sus ou particular; a situação: agendado, realizado, cancelado, faltou, com possibilidade de retornar para fila de espera caso cancelado o agendamento. Permitir cadastro de contato. _(TR, p. 286)_
- [ ] **32.** Permitir agendar vários itens juntos da mesma solicitação através da fila de espera. _(TR, p. 286)_
- [ ] **33.** Possibilidade de registrar na Fila de Espera por Setor o usuário operador que efetuou as seguintes operações: recebeu, retornou, arquivou, registrou, parecer ou agendou uma solicitação. _(TR, p. 286)_
- [ ] **34.** Possibilidade de reclassificação da solicitação. _(TR, p. 286)_
- [ ] **35.** Possibilitar a emissão de guia de agendamento ao paciente, com informações do serviço solicitado, número da consulta, local de atendimento, observação e preparo caso tenha sido lançado. _(TR, p. 286)_
- [ ] **36.** Possibilitar que a emissão do comprovante seja realizada tanto pela unidade solicitante, quanto pela unidade de agendamento. _(TR, p. 286)_
- [ ] **37.** Possibilitar consulta de listagem de reserva para retorno, de acordo com o mês, ano de referência e o serviço solicitado. _(TR, p. 286)_
- [ ] **38.** Possibilitar a reclassificação das solicitações de acordo com setores cadastrados, com possibilidade de registro providência. _(TR, p. 286)_
- [ ] **39.** Permitir o registro de feedback de atendimento das solicitações. _(TR, p. 286)_
- [ ] **40.** Permitir o registro de conclusão de atendimento da solicitação. _(TR, p. 286)_
- [ ] **41.** Permitir pesquisa de agendamento de serviço TFD, de acordo com o período informado. Possibilidade de verificação do agendamento caso necessário modificar informações do agendamento. _(TR, p. 286)_
- [ ] **42.** Permitir pesquisa de solicitações, de acordo com o período e protocolo informado, podendo verificar status das solicitações. _(TR, p. 286)_
- [ ] **43.** Possibilitar a exportação dos dados das solicitações em arquivos com extensão xls e pdf. _(TR, p. 286)_
- [ ] **44.** Permitir controle de solicitações arquivadas de acordo com o setor, listando na tela o motivo do arquivamento, com possibilidade de desarquivar solicitação. _(TR, p. 287)_
- [ ] **45.** Permitir controle de solicitação de serviço eletronica, gerados a partir do sistema do prontuário eletrônico. _(TR, p. 287)_
- [ ] **46.** Permitir visualização em Tela de gráfico dinâmico de solicitação por unidade. _(TR, p. 287)_
- [ ] **47.** Permitir visualização em Tela de gráfico dinâmico de solicitação por tipo de grupo. _(TR, p. 287)_
- [ ] **48.** Possibilitar o encaixe de pacientes no transporte, para veículos com viagens agendadas. _(TR, p. 287)_
- [ ] **49.** Possuir o cadastro e inativação de veículos, contendo informações da placa do veículo, de lotação, podendo destinar parte das vagas para uso de pacientes com necessidades especiais. _(TR, p. 287)_
- [ ] **50.** Permitir cadastro e inativação de local de embarque. _(TR, p. 287)_
- [ ] **51.** Possibilitar o cadastro de viagens por veículo, com informações da data da viagem, veículo, motorista, município destino, agente de viagem, local de saída, hora de saída, hora de chegada, distância (km), e situação da viagen ativo ou inativa. _(TR, p. 287)_
- [ ] **52.** Permitir informar a categoria de CNH no cadastro de motorista, com possibilidade de controle de CNH vencida, onde o sistema emitirá aviso caso o condutor esteja com a CNH vencida. _(TR, p. 287)_
- [ ] **53.** Permitir registro de reserva de vagas, informando a quantidade a ser reservada. _(TR, p. 287)_
- [ ] **54.** Permitir realizar cronograma de viagens, com informações de dia da semana, veículo, motorista, local de saída e município de destino. _(TR, p. 287)_
- [ ] **55.** Permitir o cadastro de transporte simples, com informações do tipo de transporte, itinerário, usuário, acompanhante caso necessite, cid e lançamento de observação. Possibilidade de informar falta do usuário. _(TR, p. 287)_
- [ ] **56.** Possibilidade de cadastro de motivo de necessidade de transporte especial por usuário. _(TR, p. 287)_
- [ ] **57.** Permitir o encaixe de pacientes no transporte informando a data da viagem, controlando as vagas disponíveis e já utilizadas no transporte por veículo. Possibilitar o registro de acompanhante, destino, procedimento, local de embarque de cada paciente, hora do atendimento, vagas por itinerário (Ida e volta, apenas ida, apenas volta), lançamento de observação e tipo de atendimento (Particular - SUS). _(TR, p. 287)_
- [ ] **58.** Permitir a parametrização para situação de agendamento padrão de acordo com a necessidade informando por exemplo situações como: agendado ou confirmado. _(TR, p. 288)_
- [ ] **59.** Permitir visualização e impressão de relatórios: comprovante de agendamento, comprovante de agendamento e transporte, mapas de viagens, bilhete de viagem, comunicação interna e declaração de viagem de paciente. _(TR, p. 288)_
- [ ] **60.** Permitir através da tela de encaixe de pacientes no transporte, alterar sequência de agendamento, transferência de usuário para outro veículo e replicar pacientes agendados para outra data de viagem já cadastrada. _(TR, p. 288)_
- [ ] **61.** Permitir encaixe de pacientes agendados no transporte, com informações de pacientes a encaixar, e pacientes já encaixados. Possibilidade de identificação de pacientes com necessidade especial, de acordo com legenda apresentada na tela. _(TR, p. 288)_
- [ ] **62.** Permitir o encaixe do paciente no transporte sem a necessidade de cadastrar solicitação, para pacientes que realizam tratamentos como hemodiálise. _(TR, p. 288)_
- [ ] **63.** Permitir tela para visualização de todos os encaixes de transportes realizado, de acordo com período informado para pesquisa. _(TR, p. 288)_
- [ ] **64.** Possibilidade de dupla custodia para caso de exclusões de pacientes da lista de agendamento de transporte. _(TR, p. 288)_
- [ ] **65.** Possuir tela para faturamento das viagens realizadas, de acordo com a data e competência informada para o faturamento das viagens. Possibilidade de conferência de viagens já faturadas. _(TR, p. 288)_
- [ ] **66.** Permitir o registro de convênios terceirizados. _(TR, p. 288)_
- [ ] **67.** Possibilitar o controle de convênios por valor global, valor por item, quantidades por item, valor por grupo e quantidade por grupo. _(TR, p. 288)_
- [ ] **68.** Possibilitar a vinculação de serviços aos convênios. _(TR, p. 288)_
- [ ] **69.** Calcular automaticamente um valor de controle com base na forma de cadastro e período de vigência do convênio. _(TR, p. 288)_
- [ ] **70.** Possibilitar a distribuição do convênio entre as unidades de saúde, com definição de cota para a autorização de serviços. _(TR, p. 288)_
- [ ] **71.** Permitir controle diário/aditivo de recurso por mês de referência e fornecedor, com possibilidade de adicionar aditivo ao recurso. _(TR, p. 288)_
- [ ] **72.** Permitir administração de valor residual, com informações de solicitações não atendidas pelo faturamento de terceiros. _(TR, p. 288)_
- [ ] **73.** Possibilitar atender um protocolo criando uma requisição de serviço terceirizado. _(TR, p. 289)_
- [ ] **74.** Permitir a requisição de serviços terceirizados, com informações de unidade requisitante, data de autorização, situação, usuário da saúde, se é gestante, profissional solicitante, pedido externo, data do atendimento, profissional que irá atender, prioridade. Possibilitando a escolha do prestador de acordo com o serviço solicitado. _(TR, p. 289)_
- [ ] **75.** Possuir informações do recurso sobre valor selecionado, o saldo disponível e saldo utilizado na tela de requisição. _(TR, p. 289)_
- [ ] **76.** Emitir comprovante de agendamento/autorização de realização do serviço ao paciente. _(TR, p. 289)_
- [ ] **77.** Gerar automaticamente guias separadas, quando a solicitação possuir mais de um fornecedor, conteúdo apenas os serviços solicitados para cada prestador. _(TR, p. 289)_
- [ ] **78.** Possibilitar o cancelamento ou a transferência de requisições já autorizadas. _(TR, p. 289)_
- [ ] **79.** Permitir controle de listagem de requisição de serviços terceirizados com exibição completa de idade do paciente, legendas em cores para identificar requisições que já foram atendidas, não atendidas ou parcialmente atendidas pelo prestador de serviço _(TR, p. 289)_
- [ ] **80.** Possibilitar cadastro e controle de fila de requisições de terceiros com informações de dados da requisição, serviços, e dados do atendimento. _(TR, p. 289)_
- [ ] **81.** Possuir um portal para uso exclusivo dos prestadores terceirizados, para confirmar a execução dos serviços autorizados nas unidades. _(TR, p. 289)_
- [ ] **82.** O acesso ao portal dos prestadores deve ser concedido pelos administradores da secretaria, por meio de login e senha. _(TR, p. 289)_
- [ ] **83.** O prestador só poderá ter acesso para confirmar a execução dos procedimentos mediante a confirmação do código de segurança impresso na guia, através da leitura do código de barras ou da digitação manual do código. _(TR, p. 289)_
- [ ] **84.** Após a confirmação da autorização, o sistema deverá permitir ao prestador confirmar os procedimentos que estão autorizados para o paciente na requisição e que foram executados. _(TR, p. 289)_
- [ ] **85.** Exibir na tela inicial do sistema gráficos dinâmicos com informativos do módulo, podendo ser definida a meta. Neles estarão presentes as seguintes informações: quantitativo de solicitações agendadas/realizadas, quantitativo de solicitações em aberto, quantitativo de viagens realizadas, quantitativo de passageiros transportados, quantitativo de quilômetros percorridos, quantitativo de serviços terceirizados atendidos, quantitativo de serviços terceirizados não atendidos. _(TR, p. 289)_
- [ ] **86.** O sistema deverá permitir retornar solicitações da fila de espera para listagem de solicitação. _(TR, p. 290)_
- [ ] **87.** Emitir relatório de solicitações por situação. _(TR, p. 290)_
- [ ] **88.** Emitir relatório lista de espera por serviço e setor - parecer. _(TR, p. 290)_
- [ ] **89.** Emitir listagem de solicitações urgentes em aberto. _(TR, p. 290)_
- [ ] **90.** Emitir relatório relação de pacientes por especialidade e município. _(TR, p. 290)_
- [ ] **91.** Emitir listagem de pacientes com necessidade de transporte. _(TR, p. 290)_
- [ ] **92.** Emitir relatório de valor gasto por prestador. _(TR, p. 290)_
- [ ] **93.** Emitir relatório de viagens por motorista no período. _(TR, p. 290)_
- [ ] **94.** Emitir relatório de auditoria de viagens. _(TR, p. 290)_
- [ ] **95.** Emitir quantitativo de agendamentos por situação. _(TR, p. 290)_
- [ ] **96.** Emitir quantitativo de serviços gastos por terceiros no período. _(TR, p. 290)_
- [ ] **97.** Emitir relatório de requisições terceiros por operador do sistema. _(TR, p. 290)_
- [ ] **98.** Emitir relatório estatístico de exames agendados. _(TR, p. 290)_
- [ ] **99.** Emitir relatório de solicitações por unidade de saúde, em aberto, por data de solicitação, solicitações urgentes, por classificação. _(TR, p. 290)_
- [ ] **100.** Emitir relatórios de agendamentos por serviço. _(TR, p. 290)_
- [ ] **101.** Permitir emissão do comprovante de liberação de transporte Público. _(TR, p. 290)_
- [ ] **102.** Emitir estatístico dos serviços mais solicitados. _(TR, p. 290)_
- [ ] **103.** Emitir relatório estatístico de exames a serem agendados. _(TR, p. 290)_
- [ ] **104.** Emitir relação de serviços por prestador - financeiro. _(TR, p. 290)_
### Módulo SISAB _(p. 290)_

- [ ] **1.** Possuir integração com o sistema E-SUS para envio das informações de todos os dados, nos padrões das fichas do SISAB, como Cadastro Individual, Cadastro Domiciliar, Atendimento Individual, Atendimento Odontológico, Atendimento Domiciliar, Atividade Coletiva, Procedimentos, Visita Domiciliar, Marcadores de Consumo Alimentar, Avaliação de Elegibilidade e Admissão, Ficha Síndrome Neurológica por Zika/Microcefalia, Ficha de Vacinação, e outras que porventura venham a existir , substituindo assim a sua utilização. _(TR, p. 290)_
- [ ] **2.** Exibir na tela inicial do sistema gráficos dinâmicos com informativos do módulo, podendo ser definida a meta. Neles estarão presentes as seguintes informações: total de vacinação de criança menor de um ano - Programa Previne Brasil, quantitativo de visitas realizadas, quantitativo de atendimentos individuais, quantitativo de atendimentos odontológicos, quantitativo de atendimentos domiciliares, quantitativo de atendimentos individuais para Pré-Natal, total de fichas de vacinação, total de fichas de consumo alimentar por quadrimestre. _(TR, p. 291)_
- [ ] **3.** Permitir cadastrar áreas, microáreas e equipes da ESF e seus membros. _(TR, p. 291)_
- [ ] **4.** Permitir cadastrar segmentos territoriais definidos para o cadastramento familiar, por unidade de atendimento. _(TR, p. 291)_
- [ ] **5.** Possibilidade de localização rápida de todos os usuários da saúde (pacientes) já cadastrados, possibilitando a escolha do campo de pesquisa informando o nome do usuário, código do prontuário, Cartão Nacional de Saúde - CNS, CPF, data de nascimento, ou nome da mãe. Se o campo de pesquisa for o nome do usuário, é possível escolher entre os tipos: Inicia, Contém, Termina, ou Igual. Estas opções irão filtrar os registros que iniciam, contenham, terminem ou são iguais com o valor digitado para pesquisa. _(TR, p. 291)_
- [ ] **6.** Permitir o cadastramento do usuário da saúde, com informações básicas de identificação, CNS, prontuário provisório ou auxiliar, permitir cadastrar pelo nome social, permitr abreviatura no cadastro do nome, informar o sexo, data de nascimento, raça/ cor, nome da mãe, possibilitadade de registro de informações do grupo sanguíneo, e se o usuário é doador de sangue, cadastramento de endereços de residencia, naturalidade. _(TR, p. 291)_
- [ ] **7.** Permitir a localização de cadastros individuais lançados no sistema, apresentando na tela legenda em cores para identificação da situação dos cadastros podendo ser ativo, inativo por óbito ou inativo por mudança de território. _(TR, p. 291)_
- [ ] **8.** Possuir cadastro individual do integrante, contemplado no cadastro de usuário da saúde com a identificação do CNS e CPF, informar se é responsável familiar, relação de parentesco com o responsável familiar, situação conjugal, cônjuge, identificação dos pacientes em óbito, permitir informar a data, e o número da certidão de óbito, orientação sexual, grau de instrução, situação do peso, situação trabalhista, renda mensal, plano de saúde, religião, se está gestante,se o usuário possui deficiências, doenças cardíacas, respiratórias e renais, se está em situação de rua, com informações de origem da alimentação diária, quantidade de refeições por dia, acesso à higiene, tempo em situação de rua, se possui familiares, entre outros. Possibilitar a impressão da ficha de cadastro individual do usuário _(TR, p. 291)_
- [ ] **9.** Permitir cadastrar famílias conforme ficha e-sus. _(TR, p. 292)_
- [ ] **10.** Possuir rotina para gerar classificação de risco (Escala de Coelho), automaticamente, para cada família, com base nas informações referentes a cada membro da família. _(TR, p. 292)_
- [ ] **11.** Possibilitar localização do domicílio cadastrado, informando o responsável familiar, ou famílias ativas, inativas, ou todas famílias cadastradas de acordo com período informado. _(TR, p. 292)_
- [ ] **12.** Permitir registrar o Cadastro Domiciliar conforme ficha e-sus. _(TR, p. 292)_
- [ ] **13.** Permitir informar os dados essenciais do domicílio: tipo de imóvel, se recusou o cadastro, situação da moradia, localização, número de moradores, quantidade de cômodos, tipo de domicílio, revestimento, abastecimento de água e energia elétrica, coleta de lixo, espécies de animais, instituição de permanência, código, situação da família, tempo de residência, se mudou ou não dentre outros. _(TR, p. 292)_
- [ ] **14.** Permitir informar a renda mensal da família em número de salários mínimos. _(TR, p. 292)_
- [ ] **15.** Permitir a vinculação de integrantes à família já na tela de cadastro da família. _(TR, p. 292)_
- [ ] **16.** Permitir dentro do cadastro domiciliar, atalho para o cadastro de um novo integrante, permitindo vincular esse integrante ao domicílio, sem a necessidade de sair da tela de cadastro domiciliar. _(TR, p. 292)_
- [ ] **17.** A busca de integrantes da família desse ver vinculada ao cadastro de prontuários dos mesmos, permitindo a inclusão de novo usuário da saúde, caso este ainda não possua cadastro. _(TR, p. 292)_
- [ ] **18.** Possibilitar a alteração do responsável familiar, definindo um novo responsável entre os integrantes da família, permitir a inclusão e retirada de integrantes da família do domicílio. _(TR, p. 292)_
- [ ] **19.** Permitir unificação de cadastro individual que estão duplicados no sistema, buscando registros duplicados por nome do usuário da saúde, nome da mãe e data de nascimento. Possibilidade de buscar por todos os usuários com mais de uma ficha cadastrada. _(TR, p. 292)_
- [ ] **20.** Permitir unificação de cadastros domiciliares, buscando registros duplicados por profissional, responsável familiar e data desejada para pesquisa. _(TR, p. 293)_
- [ ] **21.** Permitir unificação de Prontuários Duplicados, pesquisando por registros por nome do usuário da saúde, data de nascimento e nome da mãe. _(TR, p. 293)_
- [ ] **22.** Permitir a unificação de Pessoas Físicas, buscando registros por nome do usuário, ou cpf informado no registro. _(TR, p. 293)_
- [ ] **23.** Permitir migração de famílias e seus integrantes para novo agente. _(TR, p. 293)_
- [ ] **24.** Possuir controle de mapa de distribuição de famílias, de acordo com campo de pesquisa informado: nome do agente, ou todos os agentes de saúde; hipertensos; gestantes; desnutrição; diabéticos ou todas as famílias. _(TR, p. 293)_
- [ ] **25.** Permitir cadastro e controle de movimentação de imunobiológicos, permitindo cadastrar estoque, dar acesso de estoque por unidade/ profissional, cadastrar doses. _(TR, p. 293)_
- [ ] **26.** Permitir informar a saída de imunobiológicos, identificando a data, e motivo de saída: frascos transferidos, quebra de frascos, falta de energia, falha de equipamento, validade vencida, procedimento inadequado, falha no transporte, e outros motivos. _(TR, p. 293)_
- [ ] **27.** Permitir cadastro de balanço de estoques de imunobiológico, sendo possível corrigir o saldo de um lote do imunobiológico do sistema. _(TR, p. 293)_
- [ ] **28.** Possuir tela específica para lançamento de Atendimentos Individuais conforme ficha E-SUS. _(TR, p. 293)_
- [ ] **29.** Ao selecionar o profissional na tela de atendimento individual, já traz os dados da unidade e equipe a qual o mesmo está vinculado. _(TR, p. 293)_
- [ ] **30.** Ter possibilidade de informar a data e turno de realização do atendimento, ao ser selecionar a data de atendimento automaticamente o turno será preenchido. _(TR, p. 293)_
- [ ] **31.** Caso o usuário atendido seja uma criança, permitir informar dados sobre o aleitamento materno, peso e altura. _(TR, p. 293)_
- [ ] **32.** Caso o usuário atendido seja uma gestante, permitir informar os dados _(TR, p. 293)_
### referentes a data da última menstruação, e idade gestacional, risco da gravidez: _(p. 293)_

> habitual ou alto. _(TR, p. 293)_
- [ ] **33.** Permitir informar o local onde o atendimento foi realizado, o tipo de atendimento prestado, racionalidade em saúde, e registro de evolução. _(TR, p. 293)_
- [ ] **34.** Permitir registrar os problemas e condições avaliadas do paciente, informar rastreamento e detecção de doenças, vincular CIAPS e CIDS ao atendimento. _(TR, p. 293)_
- [ ] **35.** Permitir o registro de exames solicitados e avaliados durante o atendimento. _(TR, p. 294)_
- [ ] **36.** Permitir o registro de campo de observação caso o usuário tenha ficado em observação durante o atendimento. _(TR, p. 294)_
- [ ] **37.** Possibilitar o registro do desfecho do atendimento, informando a conduta de encaminhamento ou conclusão do atendimento adotada. _(TR, p. 294)_
- [ ] **38.** Faturar automaticamente os procedimentos referentes ao atendimento ao salvar o registro. _(TR, p. 294)_
- [ ] **39.** Possuir tela específica para lançamentos dos Atendimentos Odontológicos conforme ficha E-SUS. _(TR, p. 294)_
- [ ] **40.** Listar nesta tela somente profissionais dentistas, ao selecionar o profissional na tela de atendimento odontológico, já trazer os dados da unidade e equipe a qual o mesmo está vinculado. _(TR, p. 294)_
- [ ] **41.** Ter possibilidade de informar a data e turno de realização do atendimento, ao ser selecionar a data de atendimento automaticamente o turno será preenchido. _(TR, p. 294)_
- [ ] **42.** Ao selecionar o paciente atendido, permite informar se o mesmo é uma gestante ou possui necessidades especiais. _(TR, p. 294)_
- [ ] **43.** Permitir informar o tipo de atendimento, o local onde o atendimento odontológico foi realizado, e o tipo de consulta realizada na tela de atendimento odontológico. _(TR, p. 294)_
- [ ] **44.** Permitir informar os problemas de vigilância bucal relativos ao paciente no atendimento. _(TR, p. 294)_
- [ ] **45.** Possibilidade de informar os procedimentos executados no paciente e as quantidades de forma prática, listando todos os procedimentos já em tela, para que o profissional possa navegar e informar de forma rápida e prática. _(TR, p. 294)_
- [ ] **46.** Permitir informar se houve fornecimento de materiais durante o atendimento odontológico. _(TR, p. 294)_
- [ ] **47.** Possibilitar o registro do desfecho do atendimento odontológico, informando a conduta de encaminhamento ou conclusão do atendimento adotado. _(TR, p. 294)_
- [ ] **48.** Faturar automaticamente os procedimentos referentes ao atendimento ao salvar o registro. _(TR, p. 294)_
- [ ] **49.** Possuir tela específica para Atendimento Domiciliar conforme ficha E-SUS, para o lançamento das informações referentes aos atendimentos realizados às famílias pelos profissionais da saúde. _(TR, p. 294)_
- [ ] **50.** Permitir ao informar o profissional da saúde, o sistema já trazer dados da unidade e equipe a qual o mesmo está vinculado. _(TR, p. 295)_
- [ ] **51.** Permitir informar dados dos pacientes atendidos no atendimento domiciliar, vinculados ao cadastro do paciente. _(TR, p. 295)_
- [ ] **52.** Possibilitar ao profissional informar as condições avaliadas durante o atendimento, de acordo com os padrões do E-SUS. _(TR, p. 295)_
- [ ] **53.** Permitir que o profissional informe os procedimentos que executou durante seu atendimento, faturando automaticamente estes procedimentos. _(TR, p. 295)_
- [ ] **54.** Permitir que o profissional registre a conduta adotada no desfecho do atendimento domiciliar. Possibilitar registro de atendimento domiciliar após o óbito do paciente que estava em acompanhamento, informando a data do óbito. _(TR, p. 295)_
- [ ] **55.** Permitir o registro das Visitas Domiciliares conforme ficha E-SUS. _(TR, p. 295)_
- [ ] **56.** Ao informar a família, registrar o atendimento filtrando por integrante familiar, permitindo adicionar o atendimento a vários integrantes no mesmo registro. _(TR, p. 295)_
- [ ] **57.** Permitir informar o profissional responsável pela visita, à data da visita, turno e o registro de visita para imóveis diferentes de domicílio. _(TR, p. 295)_
- [ ] **58.** Permitir informar o desfecho da visita, guardando o histórico de visitas canceladas e recusadas. _(TR, p. 295)_
- [ ] **59.** Permitir informar dados da visita como motivo da visita, busca ativa de faltosos. _(TR, p. 295)_
- [ ] **60.** Permitir informar as condições individuais evidenciadas durante a visita para cada integrante. _(TR, p. 295)_
- [ ] **61.** Permitir registro de ações de controle ambiental/vetorial a serem desenvolvidas e registradas pelos acs. _(TR, p. 295)_
- [ ] **62.** Ao salvar, faturar automaticamente o procedimento de visita domiciliar de acordo com número de integrantes atendidos. _(TR, p. 295)_
- [ ] **63.** Permitir o registro de Atividade Coletiva conforme ficha e-Sus. _(TR, p. 295)_
- [ ] **64.** Permitir informar a data de realização da atividade, turno, unidade e número estimado de participantes da atividade. _(TR, p. 295)_
- [ ] **65.** Caso a atividade seja realizada em uma escola, permitir informar o código INEP da mesma. _(TR, p. 295)_
- [ ] **66.** Permitir a vinculação de todos os profissionais participantes de cada atividade, incluindo um profissional como responsável. _(TR, p. 295)_
- [ ] **67.** Permitir informar o tipo de Atividade Coletiva, de acordo com os padrões do _(TR, p. 296)_
### E-SUS. _(p. 296)_

- [ ] **68.** Caso o tipo de atividade permita a inclusão de temas, permitir que sejam informados os temas abordados na atividade. _(TR, p. 296)_
- [ ] **69.** Caso o tipo de atividade seja para trabalho com público alvo, permitir escolher os perfis de público que serão abrangidos na atividade. _(TR, p. 296)_
- [ ] **70.** Caso o tipo de atividade seja para trabalho com público, permitir escolher as práticas que serão abordadas na atividade, de acordo com os padrões do SUS. _(TR, p. 296)_
- [ ] **71.** Permitir a inclusão de pacientes participantes da atividade coletiva, com informações de peso e altura dos mesmos. _(TR, p. 296)_
- [ ] **72.** Caso seja assinalada a prática de antropometria, tornar a informação de peso e altura do paciente como informação obrigatória. _(TR, p. 296)_
- [ ] **73.** Permitir a alteração de avaliações dos usuários. _(TR, p. 296)_
- [ ] **74.** Permitir a exclusão de usuários da atividade. _(TR, p. 296)_
- [ ] **75.** Possibilidade de importar os usuários de atividade coletiva realizada anteriormente com a opção de selecionar os participantes. _(TR, p. 296)_
- [ ] **76.** Faturar automaticamente o procedimento referente a atividade coletiva ao salvar o registro. _(TR, p. 296)_
- [ ] **77.** Possuir tela para digitação de Procedimentos Individuais. _(TR, p. 296)_
- [ ] **78.** Na tela de digitação de procedimentos, ao informar o profissional, já carregar na tela os dados referentes a unidade e equipe de vinculação do mesmo. _(TR, p. 296)_
- [ ] **79.** Efetuar a consistência da produção no ato da digitação, com relação aos procedimentos e seus relacionamentos e validações com os CBOs, serviços/classificações habilitados para a hierarquia da unidade, CIDS, habilitações, idade e sexo do paciente, validando pela competência vigente, a fim de evitar glosas no faturamento. _(TR, p. 296)_
- [ ] **80.** Permitir a duplicação dos dados iniciais ao salvar uma produção, de modo a otimizar a digitação individual do mesmo profissional para o próximo paciente. _(TR, p. 296)_
- [ ] **81.** Faturar automaticamente os procedimentos lançados na tela de procedimentos individuais no sistema de produção. _(TR, p. 296)_
- [ ] **82.** Possuir tela simplificada para o lançamento de Procedimentos Consolidados. _(TR, p. 296)_
- [ ] **83.** Na tela de digitação de procedimentos consolidados, ao informar o profissional, já carregar na tela os dados referentes a unidade e equipe de vinculação do mesmo. _(TR, p. 296)_
- [ ] **84.** Habilitar os campos para digitação das quantidades de procedimentos de acordo com o cruzamento de procedimentos por CBO. _(TR, p. 297)_
- [ ] **85.** Apresentar na tela simplificada somente os procedimentos consolidados de: aferição de pressão, curativo simples, glicemia capilar, antropometria e coleta de material para exame laboratorial. _(TR, p. 297)_
- [ ] **86.** Faturar automaticamente os procedimentos lançados na tela de procedimentos consolidados no sistema de produção. _(TR, p. 297)_
- [ ] **87.** Possuir cadastro específico para Avaliação de Elegibilidade e Admissão, para o lançamento das informações referentes aos atendimentos realizados às famílias pelos profissionais da saúde. _(TR, p. 297)_
- [ ] **88.** Permitir que o profissional informe os dados do paciente a ser cadastrado para admissão em AD, registrar a data de atendimento, turno e procedência. _(TR, p. 297)_
- [ ] **89.** Possibilitar ao profissional informar as condições avaliadas durante o atendimento, de acordo com os padrões do E-SUS. _(TR, p. 297)_
- [ ] **90.** Possibilitar que o profissional informe o (s) Cid (s) apresentado (s) pelo paciente. _(TR, p. 297)_
- [ ] **91.** Possibilitar que o profissional registre sua conclusão, após a avaliação das condições do paciente, classificando-o como elegível ou inelegível; _(TR, p. 297)_
- [ ] **92.** Permitir informar o cuidador responsável, a referência no cuidado ao cidadão para as equipes de Atenção Domiciliar, podendo ser alguém da própria família ou pessoa que se dispõe a cuidar do usuário. _(TR, p. 297)_
- [ ] **93.** Possuir cadastro específico para Marcadores de Consumo Alimentar, para o lançamento das informações referentes aos atendimentos realizados às famílias pelos profissionais da saúde. _(TR, p. 297)_
- [ ] **94.** Permitir informar a data e o profissional que realizou o registro, informar o local de atendimento e os dados dos pacientes atendidos, vinculados ao cadastro do paciente. _(TR, p. 297)_
- [ ] **95.** Permitir que o profissional sinalize as informações sobre a alimentação do paciente, de acordo com sua faixa etária, conforme padrões da ficha do E-SUS. _(TR, p. 297)_
- [ ] **96.** Permitr registro de Ficha de Vacinação, identificando as vacinas que foram aplicadas no cidadão, assim como o profissional que a realizou, conforme fichas E- _(TR, p. 297)_
### SUS _(p. 298)_

- [ ] **97.** Ao selecionar o profissional na tela de vacinação , já trazer os dados da unidade, equipe a qual o mesmo está vinculado, data/hora de atendimento, turno, local de atendimento e usuário. _(TR, p. 298)_
- [ ] **98.** Permitir informar a situação/condição do cidadão que está recebendo a vacina, sendo possível a indicação de gestante, puérpera ou viajante. _(TR, p. 298)_
- [ ] **99.** Permitir registro de Imunobiológico, indicando a estratégia, a dose, o lote, local de aplicação, motivo de aplicação, via de administração e o fabricante do imunobiológico. _(TR, p. 298)_
- [ ] **100.** Permitir registro de Monitoramento (COVID), informando os dados do profissional, a data e hora de atendimento, usuário, o tipo de monitoramento presencial ou telefônico, indicar a situação: não constatado, assintomático ou sintomático, selecionar o local de atendimento, possibilidade de informar pessoas que teve contato próximo. _(TR, p. 298)_
- [ ] **101.** Permitir o acompanhamento de indicadores da Atenção Primária (Previne Brasil) de forma automática, geral e/ou por equipe. _(TR, p. 298)_
- [ ] **102.** Disponibilizar o relatório de Indicadores de Desempenho da Atenção Primária à Saúde, possibilitando informar o quadrimestre vigente ou futuro. _(TR, p. 298)_
- [ ] **103.** Possuir gráficos de atendimentos e visitas domiciliares, e territorial por quadrimestre. _(TR, p. 298)_
- [ ] **104.** Possibilitar que os profissionais consultem o histórico de todos os atendimentos realizados aos integrantes das famílias, no histórico do paciente. _(TR, p. 298)_
- [ ] **105.** Possuir tela específica para sincronização dos dados cadastrados no aplicativo mobile, exibindo maior transparência e agilidade no momento do fechamento, possibilitando a filtragem dos dados gerados, a identificação, e a alteração quando necessário. _(TR, p. 298)_
- [ ] **106.** Permitir o controle de pacientes ativos e inativos. _(TR, p. 298)_
- [ ] **107.** Emitir relatório Agentes de Saúde por Área e Equipe. _(TR, p. 298)_
- [ ] **108.** Emitir relatório Profissional por Equipe. _(TR, p. 298)_
- [ ] **109.** Emitir relatório Produção dos Profissionais por Equipe - Ficha de Atendimento Individual. _(TR, p. 298)_
- [ ] **110.** Emitir relatório de Atendimentos por Problema/Condição por Profissional. _(TR, p. 298)_
- [ ] **111.** Emitir relatório Percentual de Atendimentos por especialidade e período. _(TR, p. 298)_
- [ ] **112.** Emitir relatório Procedimentos Individuais por Profissional. _(TR, p. 299)_
- [ ] **113.** Emitir relatório Quantitativo de Gestantes por Risco Gravidez. _(TR, p. 299)_
- [ ] **114.** Emitir relatório Produção dos Profissionais por Equipe - Ficha de Atendimento Odontológico. _(TR, p. 299)_
- [ ] **115.** Emitir relatório Quantidade de Procedimentos - Atendimento Odontológico. _(TR, p. 299)_
- [ ] **116.** Emitir relatório Produção dos Profissionais por Equipe - Ficha de Atendimento Domiciliar. _(TR, p. 299)_
- [ ] **117.** Emitir relatório Produção dos Profissionais por Equipe - Ficha de Visita Domiciliar. _(TR, p. 299)_
- [ ] **118.** Emitir relatório de Visita Domiciliar - Desfecho. _(TR, p. 299)_
- [ ] **119.** Emitir relatório de Atividade Coletiva por Profissional. _(TR, p. 299)_
- [ ] **120.** Emitir relatório de Atividade Coletiva - Programa Saúde na Escola. _(TR, p. 299)_
- [ ] **121.** Emitir relatório Produção por Profissionais - Ficha de Vacinação. _(TR, p. 299)_
- [ ] **122.** Emitir relatório Ficha de Vacinação por Usuário. _(TR, p. 299)_
- [ ] **123.** Emitir relatório de Vacinas Atrasadas por Paciente. _(TR, p. 299)_
- [ ] **124.** Emitir relatório Caderneta de Vacinação por Paciente. _(TR, p. 299)_
- [ ] **125.** Emitir relatório Cobertura Vacinal. _(TR, p. 299)_
- [ ] **126.** Emitir relatório de Produção de Procedimentos por Profissional. _(TR, p. 299)_
- [ ] **127.** Emitir relatório Marcadores de Consumo Alimentar. _(TR, p. 299)_
- [ ] **128.** Emitir relatório de Cadastro Individual- Pacientes por Agente de Saúde/ Idade. _(TR, p. 299)_
- [ ] **129.** Emitir relatório de Cadastro Individual- Listagem de Gestantes por Agente e Período. _(TR, p. 299)_
- [ ] **130.** Emitir relatório Cadastros Individuais por Agente e Unidade. _(TR, p. 299)_
- [ ] **131.** Emitir relatório Famílias por Agente de Saúde. _(TR, p. 299)_
- [ ] **132.** Emitir relatório Cadastro Domiciliar. _(TR, p. 299)_
- [ ] **133.** Emitir relatório Famílias por Grau de Risco - Escala de Coelho. _(TR, p. 299)_
- [ ] **134.** Emitir relatório Condições de Moradia - Sintético. _(TR, p. 299)_
- [ ] **135.** Emitir relatórios de condições de moradia com base no cadastro domiciliar, permitindo combinar diferentes condições: Tipo Abastecimento, Tipo Escoamento, Tipo Coleta de Lixo, Tipo de Tratamento de Água por Agente de Saúde. _(TR, p. 299)_
- [ ] **136.** Emitir relatórios Indicadores do Programa Melhor em Casa, filtrando por equipes, data inicial e final de pesquisa. _(TR, p. 299)_
- [ ] **137.** Emitir relatório de Rastreamento e Monitoramento de Contatos de Casos Suspeitos e Confirmados de Covid. _(TR, p. 299)_
- [ ] **138.** Emitir relatório Ficha de Avaliação de Elegibilidade e Admissão (Admitidos). _(TR, p. 300)_
- [ ] **139.** Emitir relatório Quantitativo de Atendimentos por Unidade. _(TR, p. 300)_
- [ ] **140.** Emitir relatório Quantitativo de Visitas por Profissional e Data. _(TR, p. 300)_
- [ ] **141.** Emitir relatório Quantitativo de Atendimentos Individuais por Local de Atendimento por Período. _(TR, p. 300)_
- [ ] **142.** Emitir relatório Resumo de Exportação para o E-SUS. _(TR, p. 300)_
- [ ] **143.** Emitir relatório Quantitativo de procedimentos por unidade. SISAB Móbile _(TR, p. 300)_
- [ ] **1.** Possuir aplicativo Mobile, na tecnologia Java nativo, compatível com o Sistema Operacional Android versão 4.1 ou superior. _(TR, p. 300)_
- [ ] **2.** Possuir Banco de Dados nativo da plataforma mobile Android. _(TR, p. 300)_
- [ ] **3.** Permitir validar o acesso do agente no dispositivo móvel através da mesma senha criada no sistema do município. _(TR, p. 300)_
- [ ] **4.** Funcionar de forma off-line, necessitando de acesso a internet somente no momento do sincronismo de dados. _(TR, p. 300)_
- [ ] **5.** Possuir configuração para informar os dados do servidor para sincronização. _(TR, p. 300)_
- [ ] **6.** Permitir envio de dados do Aplicativo mobile para o sistema, e do sistema para o aplicativo mobile. _(TR, p. 300)_
- [ ] **7.** Possibilitar a sincronização das informações alteradas no APP do dispositivo móvel com a base oficial do município. _(TR, p. 300)_
- [ ] **8.** Possuir tabelas internas de domínio seguindo os padrões de informação do ministério da Saúde (Tabelas: País, UF, Município, Ocupações, Tipo de Logradouro, CBO, Condutas, Desfechos, Animais, Escolaridade, Deficiências, Procedimentos, Sexo, Situação Conjugal e Raça). _(TR, p. 300)_
- [ ] **9.** Permitir o cadastro de Pessoas seguindo os padrões de informações do Ministério da Saúde. _(TR, p. 300)_
- [ ] **10.** Permitir o cadastro de famílias seguindo os padrões de informações do Ministério da Saúde. _(TR, p. 300)_
- [ ] **11.** Possibilitar a atualização dos dados dos membros da família diretamente no aplicativo mobile. _(TR, p. 300)_
- [ ] **12.** Permitir incluir e inativar um integrante de uma família. _(TR, p. 300)_
- [ ] **13.** Permitir o cadastro de Domicílio seguindo os padrões de informações do Ministério da Saúde _(TR, p. 301)_
- [ ] **14.** Possuir a opção de filtrar os domicílios cadastrados através do nome dos indivíduos cadastrados nos mesmos. _(TR, p. 301)_
- [ ] **15.** Permitir o registro de Visitas Domiciliares seguindo os padrões de informações do Ministério da Saúde. _(TR, p. 301)_
- [ ] **16.** Possibilitar o registro de múltiplas visitas domiciliares para domicílios. _(TR, p. 301)_
- [ ] **17.** Permitir o registro de Atividade Coletiva seguindo os padrões de informações do Ministério da Saúde. _(TR, p. 301)_
- [ ] **18.** Permitir que em caso de substituição do dispositivo móvel, os dados referentes ao itinerário atual do usuário autenticado, e armazenados no servidor, sejam disponibilizados. _(TR, p. 301)_
### Módulo Centro Especializado _(p. 301)_

- [ ] **1.** Permitir a carga do sistema, através da importação do XML do SCNES ou através de carga manual, de dados referentes às unidades de saúde, com suas habilitações pertinentes à prestação de serviços SUS. _(TR, p. 301)_
- [ ] **2.** Permitir a carga do sistema, através da importação das tabelas ambulatoriais do SIA/SUS ou através de carga manual, de dados referentes a procedimentos, Unidades de Saúde, especialidades e serviços/classificação de acordo com a hierarquia da unidade, códigos CID, CBOs, tabelas de códigos e descrições de âmbito nacional do SIA, cruzamentos entre procedimentos e CID, CBO, serviços e classificações e entre as tabelas de âmbito nacional. _(TR, p. 301)_
- [ ] **3.** Permitir a carga do sistema, através da importação das tabelas ambulatoriais do SIGTAP de dados referentes a procedimentos, especialidades, CIDs, tabelas de códigos, cruzamentos entre procedimentos e CID, CBO, serviços e classificações e entre as tabelas de âmbito nacional. _(TR, p. 301)_
- [ ] **4.** Permitir criar diferentes grupos de atendimento para níveis diferentes de atendimento dentro de cada unidade. _(TR, p. 301)_
- [ ] **5.** Permite fazer a vinculação dos usuários operadores do sistema, ao grupo de usuário. _(TR, p. 301)_
- [ ] **6.** Permitir cadastro de Equipe Multidisciplinar vinculando as especialidades de cada equipe. _(TR, p. 301)_
- [ ] **7.** Permitir fazer a vinculação da equipe a unidade referência. _(TR, p. 302)_
- [ ] **8.** Permitir criar cronogramas mensais para cada equipe multidisciplinar, definindo a quantidade de pacientes que deverão ser atendidos. _(TR, p. 302)_
- [ ] **9.** Permitir cadastrar os diferentes tipos de amputação. _(TR, p. 302)_
- [ ] **10.** Permitir cadastrar os diferentes tipos de audição. _(TR, p. 302)_
- [ ] **11.** Permitir cadastrar os diferentes tipos de deficiências. _(TR, p. 302)_
- [ ] **12.** Permitir cadastrar os diferentes tipos de deglutição. _(TR, p. 302)_
- [ ] **13.** Permitir cadastrar diferentes tipos de Incapacidades cognitivas. _(TR, p. 302)_
- [ ] **14.** Permitir cadastrar diferentes tipos de próteses. _(TR, p. 302)_
- [ ] **15.** Permitir cadastrar diferentes tipos de vias de alimentação. _(TR, p. 302)_
- [ ] **16.** Permitir cadastrar diferentes tipos de avaliação de dependente. _(TR, p. 302)_
- [ ] **17.** Permitir cadastrar diferentes tipos de estado nutricional do paciente para o atendimento nutricional. _(TR, p. 302)_
- [ ] **18.** Permitir cadastrar diferentes tipos de etapas. _(TR, p. 302)_
- [ ] **19.** Permitir cadastrar diferentes tipos de linguagem. _(TR, p. 302)_
- [ ] **20.** Permitir cadastrar diferentes tipos de local para internação/permanência. _(TR, p. 302)_
- [ ] **21.** Permitir cadastrar diferentes tipos de materiais/curativos. _(TR, p. 302)_
- [ ] **22.** Permitir cadastrar diferentes tipos de meios auxiliares de locomoção. _(TR, p. 302)_
- [ ] **23.** Permitir cadastrar diferentes tipos de parentescos _(TR, p. 302)_
- [ ] **24.** Permitir cadastrar diferentes tipos de períodos. _(TR, p. 302)_
- [ ] **25.** Permitir criar tipos diferentes de perfil dos pacientes para classificação AIH _(TR, p. 302)_
### HAN. _(p. 302)_

- [ ] **26.** Permitir gerenciar diferentes tipos de produtos e medicamentos para dispensação ao paciente no momento do Atendimento. _(TR, p. 302)_
- [ ] **27.** Permitir vincular o código identificador ao produto e definir valores para cada produto ou material. _(TR, p. 302)_
- [ ] **28.** Permitir cadastro de Bolsa de Ostomia sendo possível controle a dispensação por cota. _(TR, p. 302)_
- [ ] **29.** Permitir realizar o agendamento dos pacientes através da pesquisa de equipes disponíveis. _(TR, p. 302)_
- [ ] **30.** Permitir definir parâmetro de situação para cada agendamento ao paciente podendo ser Agendado, Confirmado, Faltou, Cancelado, Em Tratamento, ou Concluído. _(TR, p. 302)_
- [ ] **31.** Permitir fazer o agendando para datas futuras obedecendo a disponibilidade das agendas das equipes. _(TR, p. 303)_
- [ ] **32.** Permite realizar atendimento de 1ª consulta onde o paciente terá contato com a equipe multidisciplinar de avaliação. _(TR, p. 303)_
- [ ] **33.** Permitir que o paciente seja atendido por uma equipe multidisciplinar onde cada especialidade apresentará o parecer clínico do paciente. _(TR, p. 303)_
- [ ] **34.** O sistema deve permitir que no momento do atendimento multidisciplinar seja definido os tipos de desfecho para cada paciente, podendo ser Permanencia, Alta Clínica, Alta Voluntária, Alta Judicial, Encaminhamento e Retorno. _(TR, p. 303)_
- [ ] **35.** O sistema deve apresentar em uma mesma tela o diagnóstico de cada médico, podendo ser evoluído de acordo com o atendimento anterior. _(TR, p. 303)_
- [ ] **36.** Permitir criar o Plano Terapêutico para acompanhamento do paciente. _(TR, p. 303)_
- [ ] **37.** O plano terapêutico deve permitir informar os objetivos que deverão ser alcançados durante o tratamento do paciente. _(TR, p. 303)_
- [ ] **38.** O plano terapêutico deve permitir informar o Plano/Cuidados que deverá ser adotado no tratamento do paciente. _(TR, p. 303)_
- [ ] **39.** O plano terapêutico deve permitir definir a quantidade de consultas necessárias para a conclusão do tratamento. _(TR, p. 303)_
- [ ] **40.** Permitir vincular a dispensação de medicamento ao plano terapêutico do paciente. _(TR, p. 303)_
- [ ] **41.** Permitir que cada profissional faça o acompanhamento de forma individual, mas que as informações sejam acessíveis por todos os profissionais que fazem parte do plano terapêutico. _(TR, p. 303)_
- [ ] **42.** O sistema deve disponibilizar uma tela de acompanhamento onde será possível observar todo o plano terapêutico do paciente, listando todas as especialidades que fazem parte do tratamento do paciente. _(TR, p. 303)_
- [ ] **43.** O acompanhamento de cada especialidade médica deve ser apresentado por atendimento/data, realizada ao paciente. _(TR, p. 303)_
- [ ] **44.** Permitir acessar informações da Interconsulta e do Plano Terapêutico através da tela de acompanhamento. _(TR, p. 303)_
- [ ] **45.** A tela de acompanhamento deve permitir evoluir o atendimento do paciente com base na especialidade do médico, com possibilidade de inserção de mais de um procedimento para cada atendimento e a inclusão do CID. _(TR, p. 303)_
- [ ] **46.** Para o especialista em nutrição a tela de atendimento deve permitir informar as informações de antropometria e o índice de massa corporal. _(TR, p. 304)_
- [ ] **47.** Permitir cadastro de distribuição de produtos e insumos ao paciente, sendo possível verificar na tela o saldo do produto/medicamento, sua validade, e a quantidade distribuída. _(TR, p. 304)_
- [ ] **48.** Permitir cadastrar e anexar documentos do usuário. _(TR, p. 304)_
- [ ] **49.** Permitir localização e cadastramento do usuário da saúde, com informações básicas de identificação, CNS, prontuário provisório ou auxiliar. Possibilidade de cadastramento pelo nome social, inserir abreviatura no cadastro do nome, informar o sexo, data de nascimento, raça/ cor, nome da mãe, informar o endereço de residencia, naturalidade. _(TR, p. 304)_
- [ ] **50.** Possibilitar a visualização e emissão de relatório financeiro por paciente e período. _(TR, p. 304)_
- [ ] **51.** Possibilitar a visualização e emissão de relatório histórico geral por paciente. _(TR, p. 304)_
- [ ] **52.** Possibilitar a visualização e emissão de relatório listagem de pacientes por equipe de atendimentos. _(TR, p. 304)_
- [ ] **53.** Possibilitar a visualização e emissão de relatório listagem de insumos por paciente. _(TR, p. 304)_
- [ ] **54.** Possibilitar a visualização e emissão de relatório listagem de produtos por paciente. _(TR, p. 304)_
- [ ] **55.** Possibilitar a visualização e emissão de relatório listagem de lote por produto. _(TR, p. 304)_
### Módulo Vigilância em Saúde _(p. 304)_

- [ ] **1.** Permitir o cadastro de Estabelecimentos, com informações do CNPJ, CNES, Endereço, Profissional Responsável, Usuário Responsável/Proprietário, Nível de Risco, Vetor, se o Alvará está liberado. _(TR, p. 304)_
- [ ] **2.** Possibilidade de verificação de ultimas alterações realizadas no cadastro de estabelecimentos, com visualização de data de última atualização e usuário que realizou a alteração. _(TR, p. 304)_
- [ ] **3.** Permitir o cadastro de motivos de visitas. _(TR, p. 304)_
- [ ] **4.** Permitir o cadastro de assunto. _(TR, p. 304)_
- [ ] **5.** Permitir visualizar os status dos Alvarás por leganda de cores. _(TR, p. 304)_
- [ ] **6.** Permitir o cadastro de setor. _(TR, p. 304)_
- [ ] **7.** Permitir o registro de denúncias sobre os estabelecimentos, tendo a possibilidade de ser pontuada como anônima. _(TR, p. 305)_
- [ ] **8.** Permitir efetuar o cadastro de denúncias contendo informações do reclamante e do estabelecimento denunciado. _(TR, p. 305)_
- [ ] **9.** Emitir alvarás sanitários por estabelecimento. _(TR, p. 305)_
- [ ] **10.** O sistema deverá permitir novos cadastros de inspeções a partir do primeiro registro. _(TR, p. 305)_
- [ ] **11.** O sistema deverá gerar código de protocolo de inspeção automático. _(TR, p. 305)_
- [ ] **12.** Ter funcionalidade de visualização que permite avisar a quantidade de fichas que necessitam ser notificadas. _(TR, p. 305)_
- [ ] **13.** O sistema deve permitir que no momento dos registros informar qual usuário cadastrou. _(TR, p. 305)_
- [ ] **14.** Emitir relatório indicador de inspeção de estabelecimentos por grau de risco. _(TR, p. 305)_
- [ ] **15.** Emitir relatório estabelecimentos por situação. _(TR, p. 305)_
- [ ] **16.** Emitir relatório estabelecimentos por CNAE informado. _(TR, p. 305)_
- [ ] **17.** Emitir relatório quantitativo de estabelecimentos por grau de risco. _(TR, p. 305)_
- [ ] **18.** Emitir relatório de denúncias cadastradas. _(TR, p. 305)_
- [ ] **19.** Emitir relatório inspeções cadastradas. _(TR, p. 305)_
- [ ] **20.** Emitir relatório de visista cadastradas. _(TR, p. 305)_
- [ ] **21.** Emitir relatório técnico de inspeção sanitária. _(TR, p. 305)_

## Assistência Social

- [ ] **2.** Permitir o cadastramento das Unidades da rede Socioassistencial, possibilitando inserir codigo de Unidade e endereço completo; _(TR, p. 305)_
- [ ] **3.** O software deverá permitir o cadastro de todos os profissionais, juntamento com o número de inscrição; _(TR, p. 305)_
- [ ] **4.** Realização da triagem para envio ao técnico da unidade, de acordo com o serviço marcado no ato da recepção; _(TR, p. 305)_
- [ ] **5.** Permitir realizar um atendimento sem a necessidade do uma triagem previa; _(TR, p. 305)_
- [ ] **6.** Permitir cadastro de Turmas; _(TR, p. 305)_
- [ ] **7.** permitir classificação de Turmas por faixa etária; _(TR, p. 306)_
- [ ] **8.** Permitir o cadastro de BPC; _(TR, p. 306)_
- [ ] **9.** Permitir o cadastro de Benefícios Eventuais; _(TR, p. 306)_
- [ ] **10.** Controlar mensalmente os benefícios liberados por unidade, cidadão ou família; _(TR, p. 306)_
- [ ] **11.** Permitir o cadastro de programas sociais, e assim vincular os cidadãos nos programas desejados; _(TR, p. 306)_
- [ ] **12.** Permitir o registro do atendimento, com possibilidades de agendar um retorno, para facilidade do técnico que esteja atendendo; _(TR, p. 306)_
- [ ] **13.** Permitir gerar agenda de atendimento para os horários cadastrados de cada profissional da unidade; _(TR, p. 306)_
- [ ] **14.** Permitir o cadastro da família, possibilitando a inclusão dos membros de uma família em programas, serviços, atividades, entre outras ações realizadas pelo município; _(TR, p. 306)_
- [ ] **15.** Permitir o bloqueio de nível de acesso apenas para os usuários de diferentes níveis hierárquicos; _(TR, p. 306)_
- [ ] **16.** Permitir o cadastro do serviço para a unidade de atendimento; _(TR, p. 306)_
- [ ] **17.** O software deverá permitir a importação do arquivo do _(TR, p. 306)_
### CADÚNICO; _(p. 306)_

- [ ] **18.** O software deverá permitir a vinculação dos demais integrantes a família; _(TR, p. 306)_
- [ ] **19.** O software no ato do atendimento deverá disponibilizar as opções para integrar o cidadão no Acompanhamento Socioeducativo, para assim passar a ser assistido pela unidade responsável; _(TR, p. 306)_
- [ ] **20.** O sistema deverá ter a possibilidade de registrar pareceres de um integrante ou responsável familiar, constando o parecer do técnico; _(TR, p. 306)_
- [ ] **21.** O software deverá conter um quadro de avisos referente a atendimentos em abertos enviados para os profissionais; _(TR, p. 306)_
- [ ] **22.** Permitir o agendamento de visitas domiciliares e a entidades parceiras, que será realizado pela equipe responsável, e logo ter o controle de registro das visitas; _(TR, p. 306)_
- [ ] **23.** O sistema deverá conter a ficha Plano Individual de Atendimento – _(TR, p. 306)_
### PIA; _(p. 306)_

- [ ] **24.** Cadastramento e consulta do acompanhamento do PAEFI – Serviço de Proteção e Atendimento Especializado a Famílias e Indivíduos; _(TR, p. 307)_
- [ ] **25.** Cadastramento e consulta do Acompanhamento do PAIF – Proteção e Atendimento Integral à Família; _(TR, p. 307)_
- [ ] **26.** Registro de situação de violência, informando o nome do vitimado, com a opção de realizar um encaminhamento ou acompanhamento no PAEFI; _(TR, p. 307)_
- [ ] **27.** Realização do cadastro da averiguação da denúncia de violência, para controle; _(TR, p. 307)_
- [ ] **28.** Deverá permitir incluir participantes nas turmas por serviços disponibilizadas nas unidades de atendimento; _(TR, p. 307)_
- [ ] **29.** Deverá incluir/consultar uma família ou integrante nos serviços oferecidos pela Secretaria de Assistência Social; _(TR, p. 307)_
- [ ] **30.** O software deverá realizar a unificação de cadastro de pessoa física, para facilidade de identificação no momento da recepção ou atendimento ao mesmo; _(TR, p. 307)_
- [ ] **31.** Listar os atendimentos realizados dando a possibilidade de visualização das informações do atendimento, respeitando o nível de acesso quando estiver marcado como sigiloso; _(TR, p. 307)_
- [ ] **32.** Emissão do Registro de Frequência dos participantes das turmas cadastradas, para controle dos profissionais; _(TR, p. 307)_
- [ ] **33.** Registrar atividades coletivas, e assim permitir vincular os integrantes e as ações realizadas; _(TR, p. 307)_
- [ ] **34.** Permitir aos profissionais consultar a lista dos assistidos encaminhados ao seu estabelecimento e, a partir das informações registradas no estabelecimento de origem, possam atender a esta demanda de acordo com as necessidades de cada indivíduo; _(TR, p. 307)_
- [ ] **35.** Possibilitar informar as condições do domicílio da família no seu cadastro familiar; _(TR, p. 307)_
- [ ] **36.** Permitir a visualização de todo o histórico-social da família no seu prontuário da família; _(TR, p. 307)_
- [ ] **37.** Permitir o registro do Plano Individual de Atendimento (PIA), possibilitando o registro de todas as medidas socioeducativas voltadas para o assistido; _(TR, p. 307)_
- [ ] **38.** Permitir definir perfis de acesso para serem atribuídos aos usuários do sistema conforme suas funções nos estabelecimentos; _(TR, p. 308)_
- [ ] **39.** Cadastramento de entrada dos benefícios nas unidades, informando assim o número da nota fiscal, quantidade, nome do fornecedor, valor unitário, e a data de entrada do benefício; _(TR, p. 308)_
- [ ] **40.** Controlar georreferenciamento do Mapa das famílias cadastradas no sistema, que estão em acompanhamentos, ou em Programas Sociais, ou Situação de Violência; _(TR, p. 308)_
- [ ] **41.** Emissão de Declaração de Comparecimento após finalização do Atendimento; _(TR, p. 308)_
- [ ] **42.** Cadastramento de reuniões/palestras realizadas em outras unidades do Município; _(TR, p. 308)_
- [ ] **43.** Permitir a emissão da Carteirinha de Benefício para o cidadão; _(TR, p. 308)_
- [ ] **44.** O software deverá conter uma lista de espera para concessão de benefícios, onde ficará os pedidos de benefícios esperando aprovação do setor responsável, de acordo com a prioridade de cada solicitação; _(TR, p. 308)_
- [ ] **45.** Permitir que o vínculo estabelecido entre famílias/indivíduos e os respectivos programas sociais possam ser desligados, caso a assistência não seja mais necessária; _(TR, p. 308)_
- [ ] **46.** Realização de acompanhamentos de cidadãos entre unidades através do próprio sistema, para facilitar os trâmites referente ao envio para as unidades responsável pelos atendimentos; _(TR, p. 308)_
### Relatórios: _(p. 308)_

- [ ] **47.** Deverá emitir relatório com listagem de benefícios liberados, que contenha no mínimo: Nota Fiscal, bairro, tipo do benefício, nome do beneficiário, data de liberação e quantidade; _(TR, p. 308)_
- [ ] **48.** Emitir relatórios com listagem de famílias cadastras por Situação; _(TR, p. 308)_
- [ ] **49.** Emitir relatórios que informam a Extrema Pobreza das famílias cadastradas; _(TR, p. 308)_
- [ ] **50.** Emitir relatórios das famílias que recebem Bolsa Família; _(TR, p. 308)_
- [ ] **51.** Emitir relatórios que informam os integrantes em acompanhamentos; _(TR, p. 309)_
- [ ] **52.** Emitir relatório do Plano Individual de Atendimento – PIA; _(TR, p. 309)_
- [ ] **53.** Emitir relatório do Formulário de Atendimento – Histórico de Atendimento; _(TR, p. 309)_
- [ ] **54.** Emissão dos Formulários de prestação de contas do CRAS e do CREAS no padrão SUAS. _(TR, p. 309)_
- [ ] **55.** Emissão do Formulário mensal par ao IASES; _(TR, p. 309)_
- [ ] **56.** Emissão de relatórios contendo informações sobre os Agendamentos Realizados pelas Unidades; _(TR, p. 309)_
- [ ] **57.** Emissão dos quantitativos de Triagem e Atendimento realizado, por período, por profissional, por unidade; _(TR, p. 309)_
- [ ] **58.** Emissão de relatório geral dos atendimentos de uma unidade; _(TR, p. 309)_

## Business Intelligence

- [ ] **1.** Permitir Integração com Bancos de Dados contendo linguagem SQL _(TR, p. 309)_
- [ ] **2.** Permitir ETL com dados externos (Text, CSV, Excel) _(TR, p. 309)_
- [ ] **3.** Permitir uso de CSS, facilitando personalização da aparência com a marca do município _(TR, p. 309)_
- [ ] **4.** Permitir filtros cruzados , Drill-to-detail e drill-by _(TR, p. 309)_
- [ ] **5.** Conter Editor SQL WEB para Consultas de dados _(TR, p. 309)_
- [ ] **6.** Permitir criar Métricas e Variáveis calculadas em SQL _(TR, p. 309)_
- [ ] **7.** Permitir Criação de Usuário com níveis de exibição para Painéis e Gráficos _(TR, p. 309)_
- [ ] **8.** Funcionamento em Browser _(TR, p. 309)_
- [ ] **9.** Extração de Painéis e Gráficos em formato (Excel, csv) _(TR, p. 309)_
- [ ] **10.** Extração de Painéis e Gráficos em Imagens e PDF _(TR, p. 309)_
- [ ] **11.** Permitir Criação de Visões de dados simples como números únicos a dados geoespaciais _(TR, p. 309)_
- [ ] **12.** Permitir Criação de filtros _(TR, p. 309)_
- [ ] **13.** Permitir Determinar filtros por Painéis e Visões _(TR, p. 309)_

## Portal Institucional

> Requisitos Gerais _(TR, p. 310)_
- [ ] **1.** O portal institucional deverá ser integralmente desenvolvido para a web e possuir área pública responsiva aos principais navegadores, tais como Chrome, Firefox, Opera, Edge e Safari em diversas plataformas, tais como computadores desktop, notebooks, tablets e smartphones; _(TR, p. 310)_
- [ ] **2.** O portal institucional deverá contar com áreas operacionais distintas, sendo a primeira, a área pública, destinada ao acesso anônimo para consulta das informações públicas disponibilizadas pelo órgão, enquanto a segunda, a área privada, deverá ser utilizada exclusivamente por usuários cadastrados na plataforma para o gerenciamento do conteúdo; _(TR, p. 310)_
- [ ] **3.** Deverá obedecer aos padrões do W3C (World Wide Web Consortium) e garantir padrões de usabilidade através de interface amigável e intuitiva; _(TR, p. 310)_
- [ ] **4.** Todas os registros devem ser armazenados em banco de dados relacional, possibilitando o amplo acesso de qualquer informação pública de forma dinâmica; _(TR, p. 310)_
- [ ] **5.** Todos os arquivos devem ser guardados utilizando serviço de armazenamento de objetos em nuvem garantindo escalabilidade, disponibilidade de dados, segurança e performance; _(TR, p. 310)_
- [ ] **6.** Deverá possuir conteúdo textual integralmente no idioma português do Brasil; _(TR, p. 310)_
- [ ] **7.** Dispor de recursos específicos para assegurar a acessibilidade de pessoas _(TR, p. 310)_
### com deficiência, tais como: _(p. 310)_

- [ ] **8.** Organizar o código HTML de forma lógica e semântica; _(TR, p. 310)_
- [ ] **9.** Imagens devem utilizar o atributo “alt” para descrever o significado do elemento visual; _(TR, p. 310)_
- [ ] **10.** Qualquer conteúdo multimídia nativo da solução deverá conter legendas ou transcrições para os áudios e descrições para os vídeos; _(TR, p. 310)_
- [ ] **11.** Hiperlinks devem utilizar textos significativos e evitar aplicações genéricas; _(TR, p. 310)_
- [ ] **12.** Empregar semanticamente as tags HTML, proporcionando melhor capacidade de leitura do código das páginas web por leitores de tela e/ou buscadores; _(TR, p. 310)_
- [ ] **13.** Tabelas devem ser utilizadas apenas para tabulação de dados. Em hipótese alguma deverá ser empregada como alternativa para estruturação de páginas web; _(TR, p. 310)_
- [ ] **14.** Teclas de atalho para o menu, conteúdo, rodapé, aumentar e diminuir tamanho da fonte, ativar ou desativar contraste, página de acessibilidade e página de mapa do site; _(TR, p. 311)_
- [ ] **15.** Todas as ordenações devem ser realizadas com as ações de clicar, arrastar e soltar; _(TR, p. 311)_
- [ ] **16.** Os módulos do portal institucional devem permitir a sua adaptação de acordo com as necessidades da contratante, através de parametrizações e customizações, desde que não comprometa a integridade do sistema; _(TR, p. 311)_
- [ ] **17.** Todas as informações cadastradas através do módulo gerenciador de conteúdo devem estar coerentes e sincronizadas com a base de dados; _(TR, p. 311)_
- [ ] **18.** Todos os registros cadastrados pelo módulo gerenciador de conteúdo devem permitir, além da sua inserção, a visualização, configuração (quando houver), alteração e exclusão; _(TR, p. 311)_
- [ ] **19.** O portal institucional deverá dinâmico e todas as informações poderão ser atualizadas a qualquer momento pelo usuário responsável através do módulo gerenciador de conteúdo; Requisitos do Portal Institucional _(TR, p. 311)_
### Módulo Gerenciador de Conteúdo _(p. 311)_

> Menus _(TR, p. 311)_
- [ ] **20.** Possuir função para criar, alterar, consultar e excluir menus e itens de menu; _(TR, p. 311)_
- [ ] **21.** O cadastro de um item de menu deve permitir informar: nome, link (url) o qual o será direcionado ao clicar, capa (se necessário, de acordo com o leiaute), ícone (se necessário, de acordo com o leiaute), descrição, comportamento ao ser clicado (abrir na mesma página ou em nova aba), situação ativo ou inativo (exibindo ou não no menu conforme a situação) e posicionamento na árvore de menu; _(TR, p. 311)_
- [ ] **22.** A edição de um item de menu deve permitir editar: nome, link (url) o qual o usuário será direcionado ao clicar, capa (se necessário, de acordo com o leiaute), ícone (se necessário, de acordo com o leiaute), descrição, comportamento ao ser clicado (abrir na mesma página ou em nova aba), situação ativo ou inativo (exibindo ou não no menu conforme a situação) e posicionamento na árvore de menu; _(TR, p. 311)_
- [ ] **23.** A listagem de menu deve mostrar toda a estrutura de menu de forma hierárquica, ou seja, com a indentação da estrutura de menu; _(TR, p. 312)_
- [ ] **24.** A partir da listagem de menu deverá ser possível as seguintes ações: editar, ordenar, ativar ou desativar menu e excluir. _(TR, p. 312)_
- [ ] **25.** A exclusão de um item de menu deverá ser realizada com a confirmação do usuário; _(TR, p. 312)_
- [ ] **26.** A opção de excluir um item de menu não deve ser exibida na hipótese de o menu ter outros menus associados como dependentes; _(TR, p. 312)_
- [ ] **27.** Possuir função para ordenar itens de menu com as ações de clicar, arrastar e soltar; Páginas Dinâmicas _(TR, p. 312)_
- [ ] **28.** Possuir função para criar, alterar, consultar e excluir páginas dinâmicas; _(TR, p. 312)_
- [ ] **29.** O cadastro de uma página dinâmica deve permitir informar: título da página, situação ativo ou inativo (exibindo ou não a página conforme a situação) e conteúdo. _(TR, p. 312)_
- [ ] **30.** O campo de conteúdo deve ser do tipo editor de texto WYSIWYG (What You See Is What You Get) e permitir criar conteúdo sem o conhecimento prévio de HTML e CSS (HyperText Markup Language e Cascade Style Sheet). Deverá disponibilizar, minimamente, os seguintes recursos: negrito, itálico, sublinhado, riscado, família de fontes, tamanho da fonte, cor de fundo da fonte, cor da fonte, marcar texto, remover formatação do texto, aumentar e diminuir indentação, alinhamento à esquerda, direita, centralizado e justificado, lista ordenada e não ordenada, criação de link, bloco de citação, tabela, inserir imagem do repositório de arquivos e visualização do código fonte do conteúdo; _(TR, p. 312)_
- [ ] **31.** Ao criar a página dinâmica, deverá ser criado um link (url) de forma automática para o acesso à página dinâmica; _(TR, p. 312)_
- [ ] **32.** A listagem de páginas dinâmicas deverá permitir criar um item de menu a partir de uma página específica, desde que selecionada a sua posição na árvore de menu; _(TR, p. 312)_
- [ ] **33.** A listagem de páginas dinâmicas deverá permitir a pré-visualização do conteúdo de uma página específica; _(TR, p. 313)_
- [ ] **34.** A exclusão de uma página dinâmica deverá ser realizada a partir da confirmação do usuário; _(TR, p. 313)_
- [ ] **35.** Uma página dinâmica inativa não deve ser acessada na área pública; Agendas _(TR, p. 313)_
- [ ] **36.** Possuir função para configurar o componente de agenda; _(TR, p. 313)_
- [ ] **37.** Permitir configurar o limite de itens do carrossel, a quantidade de itens visíveis no carrossel, o número de ocorrências por página, selecionar a agenda que o componente deverá exibir, o tipo de visão (paginada ou calendário) e situação (ativo ou inativo); _(TR, p. 313)_
- [ ] **38.** Possuir função para criar, alterar, consultar e excluir agendas; _(TR, p. 313)_
- [ ] **39.** O cadastro de uma agenda deverá conter o título da agenda e a seleção de uma ou mais categorias; _(TR, p. 313)_
- [ ] **40.** Gerar link (url) de acesso à agenda no momento do cadastro, de forma automática e sem a intervenção do usuário, para o acesso público; _(TR, p. 313)_
- [ ] **41.** A listagem de agendas deverá permitir criar um item de menu a partir de uma agenda específica, selecionando a sua posição na árvore de menu; _(TR, p. 313)_
- [ ] **42.** A listagem de agendas deverá permitir criar uma ocorrência a partir de uma agenda específica, filtrando pelas categorias da agenda; _(TR, p. 313)_
- [ ] **43.** Possuir função para criar, alterar, consultar e excluir categorias de agenda; _(TR, p. 313)_
- [ ] **44.** O cadastro de uma categoria de agenda deverá conter o título da categoria; _(TR, p. 313)_
- [ ] **45.** Possuir função para criar, alterar, consultar e excluir ocorrências; _(TR, p. 313)_
- [ ] **46.** O cadastro de uma ocorrência (evento) deverá conter o título da ocorrência, a data e hora de início e de término, se houver, a descrição da ocorrência, o local, a capa (imagem) disponível no repositório de arquivos, cor e uma categoria; _(TR, p. 313)_
- [ ] **47.** O cadastro de uma ocorrência deverá permitir enviar para os assinantes do portal institucional (newsletter) informações mínimas sobre a ocorrência; _(TR, p. 313)_
- [ ] **48.** A ocorrência não deve ser atribuída diretamente numa agenda, mas vinculada a uma categoria que esteja associada à agenda; Notícias _(TR, p. 313)_
- [ ] **49.** Possuir função para criar, alterar, consultar e excluir notícias; _(TR, p. 314)_
- [ ] **50.** O cadastro de uma notícia deverá conter o título e subtítulo da notícia, corpo da notícia, indicação se a notícia é um destaque, fonte, capa (imagem) disponível no repositório de arquivos, uma ou mais categorias e autor; _(TR, p. 314)_
- [ ] **51.** O campo de corpo da notícia deve ser do tipo editor de texto WYSIWYG (What You See Is What You Get) e permitir criar conteúdo sem o conhecimento prévio de HTML e CSS (HyperText Markup Language e Cascade Style Sheet). Deverá disponibilizar, minimamente, os seguintes recursos: negrito, itálico, sublinhado, riscado, família de fontes, tamanho da fonte, cor de fundo da fonte, cor da fonte, marcar texto, remover formatação do texto, aumentar e diminuir indentação, alinhamento à esquerda, direita, centralizado e justificado, lista ordenada e não ordenada, criação de link, bloco de citação, tabela, inserir imagem do repositório de arquivos e visualização do código fonte do conteúdo; _(TR, p. 314)_
- [ ] **52.** O cadastro de uma notícia deverá permitir enviar para os assinantes do portal institucional (newsletter) informações mínimas sobre a notícia; _(TR, p. 314)_
- [ ] **53.** Possuir função para criar, alterar, consultar e excluir categorias de notícia; _(TR, p. 314)_
- [ ] **54.** O cadastro de uma categoria de agenda deverá conter o título da categoria e situação (ativo ou inativo); _(TR, p. 314)_
- [ ] **55.** Possuir função para configurar o componente de notícia; _(TR, p. 314)_
- [ ] **56.** Permitir configurar o limite de itens de notícias, o limite de destaques, o limite de notícias no quadro rotativo (carrossel) e a exibição ou não do quadro rotativo; Galerias _(TR, p. 314)_
- [ ] **57.** Possuir função para criar, alterar, consultar e excluir galerias; _(TR, p. 314)_
- [ ] **58.** O cadastro de uma galeria deverá conter o título da galeria, descrição, indicação do tipo da galeria (foto, vídeo ou áudio), a capa (imagem) do repositório e a situação (ativa ou inativa); _(TR, p. 314)_
- [ ] **59.** Permitir enviar para os assinantes do portal institucional (newsletter) informações mínimas sobre a galeria no momento do cadastro; _(TR, p. 314)_
- [ ] **60.** Gerar link de acesso da galeria no momento do cadastro, de forma automática e sem a intervenção do usuário, para o acesso público; _(TR, p. 315)_
- [ ] **61.** Possuir função para criar, alterar, consultar e excluir itens de galeria; _(TR, p. 315)_
- [ ] **62.** Permitir cadastrar os itens de galeria apenas pelo repositório de arquivos, garantindo a reutilização do recurso (imagem, áudio ou vídeo) por outros módulos do sistema; _(TR, p. 315)_
- [ ] **63.** Permitir alterar o nome e descrição de um item de galeria; _(TR, p. 315)_
- [ ] **64.** Permitir consultar a listagem de todos os itens de uma galeria específica; _(TR, p. 315)_
- [ ] **65.** Permitir excluir um item de galeria sem excluir o recurso (imagem, áudio ou vídeo) do repositório de arquivos; Questionário _(TR, p. 315)_
- [ ] **66.** Possuir função para criar, alterar, consultar e excluir questionários; _(TR, p. 315)_
- [ ] **67.** O cadastro de um questionário deverá conter o título do questionário, a descrição, a data e hora de publicação e de término; _(TR, p. 315)_
- [ ] **68.** O cadastro de um questionário deverá ser configurável e conter a situação do questionário (ativo ou inativo), permitir ou não consulta ao resultado parcial, permitir ou não a consulta pública, permitir ou não a contagem de votos na área pública, indicação do tipo de gráfico (pizza ou barra) e mensagem customizada de encerramento; _(TR, p. 315)_
- [ ] **69.** O cadastro de um questionário deverá permitir o cadastro de questões do tipo única escolha, múltipla escolha e discursiva; _(TR, p. 315)_
- [ ] **70.** O cadastro de uma questão do tipo única escolha deve conter o enunciado da questão, a indicação se responder a questão é obrigatório e, ao menos, duas opções, com a possibilidade de adicionar novas, que devem conter a descrição da opção e uma imagem, se necessário, do repositório de arquivos; _(TR, p. 315)_
- [ ] **71.** Possuir função para ordenar as opções de única escolha; _(TR, p. 315)_
- [ ] **72.** O cadastro de uma questão do tipo múltipla escolha deve conter o enunciado da questão, a indicação se responder a questão é obrigatório e, ao menos, duas opções, com a possibilidade de adicionar novas, que devem conter a descrição da opção e uma imagem, se necessário, do repositório de arquivos; _(TR, p. 315)_
- [ ] **73.** Possuir função para ordenar as opções de múltipla escolha; _(TR, p. 315)_
- [ ] **74.** O cadastro de uma questão do tipo discursiva deve conter o enunciado da questão e a indicação se responder a questão é obrigatório; _(TR, p. 315)_
- [ ] **75.** Possuir função para remover _(TR, p. 316)_
- [ ] **76.** Possuir função para ordenar as questões do questionário; _(TR, p. 316)_
- [ ] **77.** Possuir função para excluir a questão durante o cadastro do questionário; _(TR, p. 316)_
- [ ] **78.** Possuir função para excluir a alternativa, nos casos de questões de única ou múltipla escolha, durante o cadastro do questionário; _(TR, p. 316)_
- [ ] **79.** Encaminhar o questionário para revisão após o cadastro, garantindo que o usuário valide todas as informações antes de publicar o questionário; _(TR, p. 316)_
- [ ] **80.** Permitir adiar o término do questionário quando o mesmo ainda estiver dentro do prazo de duração; Enquetes _(TR, p. 316)_
- [ ] **81.** Possuir função para criar, alterar, consultar e excluir enquetes; _(TR, p. 316)_
- [ ] **82.** O cadastro de uma enquete deverá conter o título da enquete, a descrição, a data e hora de publicação e de término; _(TR, p. 316)_
- [ ] **83.** O cadastro de uma enquete deverá ser configurável e conter a situação da enquete (ativo ou inativo), permitir ou não consulta ao resultado parcial, permitir ou não a consulta pública, permitir ou não a contagem de votos na área pública, indicação do tipo de gráfico (pizza ou barra) e mensagem customizada de encerramento; _(TR, p. 316)_
- [ ] **84.** O cadastro de uma enquete deverá permitir o cadastro de questões do tipo única escolha, múltipla escolha ou discursiva; _(TR, p. 316)_
- [ ] **85.** O cadastro de uma questão do tipo única escolha deve conter o enunciado da questão, a indicação se responder a questão é obrigatório e, ao menos, duas opções, com a possibilidade de adicionar novas, que devem conter a descrição da opção e uma imagem, se necessário, do repositório de arquivos; _(TR, p. 316)_
- [ ] **86.** Possuir função para ordenar as opções de única escolha; _(TR, p. 316)_
- [ ] **87.** O cadastro de uma questão do tipo múltipla escolha deve conter o enunciado da questão, a indicação se responder a questão é obrigatório e, ao menos, duas opções, com a possibilidade de adicionar novas, que devem conter a descrição da opção e uma imagem, se necessário, do repositório de arquivos; _(TR, p. 316)_
- [ ] **88.** Possuir função para ordenar as opções de múltipla escolha; _(TR, p. 316)_
- [ ] **89.** O cadastro de uma questão do tipo discursiva deve conter o enunciado da questão e a indicação se responder a questão é obrigatório; _(TR, p. 316)_
- [ ] **90.** Possuir função para excluir a alternativa, nos casos de questões de única ou múltipla escolha, durante o cadastro da enquete; _(TR, p. 317)_
- [ ] **91.** Encaminhar a enquete para revisão após o cadastro, garantindo que o usuário valide todas as informações antes de publicar a enquete; _(TR, p. 317)_
- [ ] **92.** Permitir adiar o término da enquete quando a mesma ainda estiver dentro do prazo de duração; Newsletter _(TR, p. 317)_
- [ ] **93.** Possuir dashboard de informações sobre newsletter contendo a quantidade total de inscrições ativas, a quantidade total de novas inscrições nos últimos sete dias, a quantidade total de novas inscrições nos últimos trinta dias e a quantidade total de inscrições canceladas nos últimos trinta dias; _(TR, p. 317)_
- [ ] **94.** O dashboard de newsletter deverá conter gráfico de pizza com os motivos dos cancelamentos de inscrições; _(TR, p. 317)_
- [ ] **95.** O dashboard de newsletter deverá conter gráfico de comparação do histórico de inscrições (novas inscrições e cancelamentos) dos últimos meses; _(TR, p. 317)_
- [ ] **96.** Possuir função para configurar o componente de newsletter; _(TR, p. 317)_
- [ ] **97.** Permitir customizar a mensagem de confirmação de inscrição na newsletter, a mensagem de novo conteúdo e a mensagem de cancelamento da newsletter; _(TR, p. 317)_
- [ ] **98.** Permitir listar todas as inscrições contendo o nome, email, telefone, data da inscrição, situação (ativo ou inativo) e data da inativação, se houver; _(TR, p. 317)_
- [ ] **99.** Possuir função para criar, consultar e excluir motivos de cancelamento de newsletter; _(TR, p. 317)_
- [ ] **100.** A tela de listagem de motivos de cancelamento deverá ter áudio descrição que explique o funcionamento da tela; _(TR, p. 317)_
- [ ] **101.** A tela de listagem de motivos de cancelamento deverá permitir desativar ou excluir um motivo de cancelamento; _(TR, p. 317)_
- [ ] **102.** O cadastro de um novo motivo de cancelamento de newsletter deverá conter o título do motivo de cancelamento e a situação (ativo ou inativo); _(TR, p. 317)_
- [ ] **103.** A tela de cadastro de um novo motivo de cancelamento deverá ter áudio descrição que explique o funcionamento da tela; _(TR, p. 317)_
### Acesso Rápido _(p. 318)_

- [ ] **104.** Possuir função para configurar o acesso rápido; _(TR, p. 318)_
- [ ] **105.** Permitir configurar a quantidade de itens de acesso rápido que devem ser exibidas, no intervalo de um e doze itens, e a quantidade de itens por linha, no intervalo de um e seis itens; _(TR, p. 318)_
- [ ] **106.** Possuir função para criar, alterar, consultar e excluir itens de acesso rápido; _(TR, p. 318)_
- [ ] **107.** O cadastro de um item de acesso rápido deverá conter o nome do item, o link de destino, o ícone (se necessário, conforme o leiaute), o comportamento (abrir na mesma aba ou em nova aba), a descrição, a capa (imagem) do repositório (se necessário, conforme o leiaute) e a situação (ativo ou inativo); _(TR, p. 318)_
- [ ] **108.** A alteração de um item de acesso rápido deverá permitir a edição do nome do item, do link de destino, do ícone (se necessário, conforme o leiaute), do comportamento (abrir na mesma aba ou em nova aba), da descrição, da capa (imagem) do repositório (se necessário, conforme o leiaute) e da situação (ativo ou inativo); _(TR, p. 318)_
- [ ] **109.** Possuir função para ordenar os itens de acesso rápido com ação de clicar, arrastar e soltar; Redes Sociais _(TR, p. 318)_
- [ ] **110.** Possuir função para criar, alterar, consultar e excluir itens de redes sociais; _(TR, p. 318)_
- [ ] **111.** A tela cadastro item de rede social deverá ter áudio descrição que explique o funcionamento da tela; _(TR, p. 318)_
- [ ] **112.** O cadastro de um item de rede social deverá conter o nome do item, o link de destino, o ícone, o comportamento (abrir na mesma aba ou em nova aba), a descrição e a situação (ativo ou inativo); _(TR, p. 318)_
- [ ] **113.** A alteração de um item de rede social deverá permitir a edição do nome do item, do link de destino, do ícone, do comportamento (abrir na mesma aba ou em nova aba), da descrição e da situação (ativo ou inativo); _(TR, p. 318)_
- [ ] **114.** Possuir função para ordenar os itens de rede social com ação de clicar, arrastar e soltar; Links Úteis _(TR, p. 319)_
- [ ] **115.** Possuir função para criar, alterar, consultar e excluir links úteis; _(TR, p. 319)_
- [ ] **116.** O cadastro de um item de link útil deverá conter o nome do item, o link de destino, o ícone, o comportamento (abrir na mesma aba ou em nova aba), a descrição e a situação (ativo ou inativo); _(TR, p. 319)_
- [ ] **117.** A alteração de um item de link útil deverá permitir a edição do nome do item, do link de destino, do ícone, do comportamento (abrir na mesma aba ou em nova aba), da descrição e da situação (ativo ou inativo); _(TR, p. 319)_
- [ ] **118.** Possuir função para ordenar os itens de rede social com ação de clicar, arrastar e soltar; Telefones Úteis _(TR, p. 319)_
- [ ] **119.** Possuir função para criar, alterar, consultar e excluir telefones úteis; _(TR, p. 319)_
- [ ] **120.** O cadastro de um telefone útil deverá conter o nome, o número, o ícone, a descrição e a situação (ativo ou inativo); _(TR, p. 319)_
- [ ] **121.** A alteração de um telefone útil deverá permitir a edição do nome, do número, do ícone, da descrição e da situação (ativo ou inativo); _(TR, p. 319)_
- [ ] **122.** Possuir função para desativar um telefone útil; _(TR, p. 319)_
- [ ] **123.** Possuir função para ordenar os telefones úteis com ação de clicar, arrastar e soltar; Repositório de Arquivos _(TR, p. 319)_
- [ ] **124.** Possuir função para criar, alterar, consultar e excluir repositório de arquivos; _(TR, p. 319)_
- [ ] **125.** O cadastro de um novo repositório de arquivos deverá conter sua localização dentro da árvore de repositórios, o nome do repositório, a sua descrição, a situação (ativo ou inativo) e a indicação de privacidade (privado ou público); _(TR, p. 319)_
- [ ] **126.** A alteração de um repositório de arquivos deverá permitir a alteração do nome do repositório, a sua descrição, a situação (ativo ou inativo) e a indicação de privacidade (privado ou público); _(TR, p. 319)_
- [ ] **127.** Possuir função para mover um repositório para outro nível dentro da árvore de repositórios; _(TR, p. 320)_
- [ ] **128.** Possuir função para desativar um repositório de arquivos; _(TR, p. 320)_
- [ ] **129.** Possuir função para criar um item de menu a partir de um repositório através da seleção da localização dentro da árvore de menu; _(TR, p. 320)_
- [ ] **130.** Possuir função para criar, alterar, consultar e excluir arquivos; _(TR, p. 320)_
- [ ] **131.** O cadastro de arquivo deverá conter a seleção de um ou mais arquivos e um campo de prefixo ao nome do arquivo, que fará a concatenação do prefixo e o nome do arquivo; _(TR, p. 320)_
- [ ] **132.** O cadastro de arquivo dentro do módulo de repositório de arquivos permitirá a alteração de um ou mais nome de arquivos imediatamente após seu envio; _(TR, p. 320)_
- [ ] **133.** A alteração de um arquivo dentro do módulo de repositório de arquivos permitirá a alteração do nome do arquivo, da sua descrição e da situação (ativo ou inativo); _(TR, p. 320)_
- [ ] **134.** Possuir função para mover um arquivo para outro nível dentro da árvore de repositórios; _(TR, p. 320)_

## Rastreamento veicular, aplicativo e equipamentos

> Seção adicional do TR, aparentemente relacionada ao módulo de Frotas e ao fornecimento/instalação de rastreadores.

### Recursos do Sistema: _(p. 320)_

- [ ] **1.** Web site seguro (https); _(TR, p. 320)_
- [ ] **2.** Acesso via login e senha; _(TR, p. 320)_
- [ ] **3.** Disponibilizar central de alertas, onde deverá possuir classificação por nível de alerta de forma que quando um dos alertas gerados ao sistema, o cliente na tela do navegador poderá rapidamente interagir com o técnico, tomando as _(TR, p. 320)_
### providências necessárias: _(p. 320)_

> - alerta do botão do pânico _(TR, p. 320)_
> - alerta desconexão de bateria _(TR, p. 320)_
> - alerta violação de cerca _(TR, p. 321)_
> - alerta limite de velocidade _(TR, p. 321)_
> - alerta violação rota _(TR, p. 321)_
> - alerta veículo sendo rebocado _(TR, p. 321)_
- [ ] **4.** Visualização dos veículos em mapas digitais ou fotos georreferenciadas; _(TR, p. 321)_
- [ ] **5.** Serviço disponível 24 horas; _(TR, p. 321)_
- [ ] **6.** Identificação manual dos condutores enquanto estiverem operando um veículo rastreado. _(TR, p. 321)_
- [ ] **7.** Controle de monitoramento: - Informar hodômetro ou horímetro; - Informar a tensão da bateria do veículo; - Informar a direção que o veículo está seguindo; - Velocidade com envio programado de alertas; - Cerca eletrônica configurável por dia e horário (áreas onde o veículo não pode sair ou não pode entrar); - Criação de grupos de veículos; - Rotas planejadas; - Compartilhamento da localização do veículo através de link temporizado; - Agendamento de relatórios e comandos automáticos; - Relatório de movimentação fora de horário; - Relatório de movimentação por motorista; - Relatório de KM percorrido; - Relatório de KM percorrido na cerca; - Relatório de veículos offline; - Relatório de custo de abastecimento / manutenção; - Informar tempo em que o veículo ficou parado com o motor ligado; - Envio de comandos ao veículo (bloqueio, sirene quando houver); - Início e final do turno de trabalho; - Distância percorrida no turno de trabalho; - Os dados do motorista deverão fazer parte dos relatórios detalhados disponíveis nowebsite; - Demonstrar o tempo do veículo parado com ignição ligada; - Relatório demonstrando os resumos das paradas com descrição dos motivos das paradas; - Relatórios que demonstrem as seguintes informações - Km rodados total no período - Km rodado dentro e fora do horário - Tempo parado (com ignição desligada) - Velocidade média e máxima do veículo - Data e hora da ocorrência de velocidade máxima _(TR, p. 321)_
- [ ] **8.** Referente ao armazenamento dos dados; as informações do sistema devem estar disponíveis para consulta por um período de 5 anos. _(TR, p. 322)_
- [ ] **9.** Avisar na central de monitoramento os seguintes alertas: - Bateria desconectada - Bateria do dispositivo acabando - Bateria do veículo acabando - Direção fora do horário - Velocidade acima do permitido - Violação de cerca - Momento e local em que o veículo teve a ignição ligada ou desligada _(TR, p. 322)_
- [ ] **10.** Permitir os envios dos alertas para o responsável por Whatsapp _(TR, p. 322)_
- [ ] **11.** Permitir visualização do veículo ou grupo de veículos no mapa; _(TR, p. 322)_
- [ ] **12.** Permitir acesso para monitoramento via celular ou tablet (Mobile) com acesso a internet; _(TR, p. 323)_
- [ ] **13.** Permitir a utilização em dispositivos móveis de tecnologia Android e IOS; _(TR, p. 323)_
- [ ] **14.** Permitir personalizar o ícone identificador do veículo no mapa; _(TR, p. 323)_
- [ ] **15.** Permitir atualizar as informações de acordo com tempo configurado pelo gestor da frota para que a mesma seja transmitida pelo aparelho de rastreamento a central de monitoramento de acordo com esta definição, podendo ser a cada 30s, 60s, 90s, e ou superior escolhidas pelo responsável; _(TR, p. 323)_
- [ ] **16.** Garantir que a configuração por veículo possa ser feita para veículo em movimento ou para veículo ou equipamentos parados; _(TR, p. 323)_
- [ ] **17.** O sistema deverá demonstrar o status do dispositivo em tempo real: - Se está online - Se está offline - Se o veículo está ligado - Se o veículo está desligado - Se o modo de economia de energia está ativado (sleep) - Se o Veículo está parado e a quanto tempo - Se o Veículo está acima da velocidade permitida; _(TR, p. 323)_
- [ ] **18.** Permitir que no mapa ou relatórios informativos possamos identificar a direção do veículo, seu momento e velocidade _(TR, p. 323)_
- [ ] **19.** Disponibilizar funcionalidade de compartilhamento do link de rastreamento de um veículo específico para acompanhamento em caso de sinistro e outros eventos necessários.(Ex Polícia, em caso de furto) _(TR, p. 323)_
- [ ] **20.** Garantir que a central de monitoramento opere 24/7: • Fazer o monitoramento de todos os alertas gerados • Comunicar ao gestor da frota a cada alerta gerado • Operador 24hrs para suporte em caso de emergência e sinistro _(TR, p. 323)_
- [ ] **21.** Criação de pontos de referências (marcar no mapa os pontos de referência) _(TR, p. 323)_
- [ ] **22.** Deve cadastrar os aparelhos automaticamente assim que o aparelho enviar os dados ao servidor; _(TR, p. 324)_
### APP Diário de Bordo _(p. 324)_

- [ ] **1.** Devera ser fornecido juntamente ao sistema de monitoramento, aplicativo mobile que permita que o motorista informe a atividade que está executando (registrando o horário), bem como vincular a posição GPS do momento de início da atividade, para acompanhamento via sistema web. O App deverá funcionar em modo offline, realizando a sincronização dos registros assim que _(TR, p. 324)_
### houver conexão com a internet;O aplicativo deve conter, registro dos eventos: _(p. 324)_

> • Parada emergencial; _(TR, p. 324)_
> • Acidente; _(TR, p. 324)_
> • Trânsito lento; _(TR, p. 324)_
> • Troca de pneu; _(TR, p. 324)_
> • Dentre outros; _(TR, p. 324)_
> • Abastecimento; _(TR, p. 324)_
> • Tempo total da jornada; _(TR, p. 324)_
> • Intervalo de almoço; _(TR, p. 324)_
> • Cadastrar localização da empresa: _(TR, p. 324)_
> • Alerta de chegada ao trabalho; _(TR, p. 324)_
> • Saída para o almoço; _(TR, p. 324)_
> • Volta do almoço; _(TR, p. 324)_
> • Saída do trabalho; _(TR, p. 324)_
> • Deverá funcionar em modo offline. _(TR, p. 324)_
### Portal Frotas Online _(p. 324)_

- [ ] **1.** Possibilitar o acesso as informações do rastreamento da frota municipal, para ampla _(TR, p. 324)_
- [ ] **2.** consulta pública do cidadão; _(TR, p. 324)_
- [ ] **3.** Permitir que o cidadão acompanhe a localização em tempo real; _(TR, p. 324)_
- [ ] **4.** Disponibilizar o link para acesso no portal oficial da Prefeitura. _(TR, p. 324)_
### Especificações técnicas do equipamento: _(p. 324)_

- [ ] **1.** Tensão de Operação: DC 9v a 90v _(TR, p. 325)_
- [ ] **2.** Homologação Anatel _(TR, p. 325)_
- [ ] **3.** Bateria Interna: 150mAh _(TR, p. 325)_
- [ ] **4.** Consumo em Operação: ~35mAh _(TR, p. 325)_
- [ ] **5.** Consumo em modo Sleep: ~8,5mAh _(TR, p. 325)_
- [ ] **6.** Grau de Proteção: IP – 65 _(TR, p. 325)_
- [ ] **7.** Temperatura de Armazenamento: -20C ~60C _(TR, p. 325)_
- [ ] **8.** Dimensões: 80 x 35 x 17,5mm _(TR, p. 325)_
- [ ] **9.** Peso: 47g _(TR, p. 325)_
- [ ] **10.** Sensor: Sensor de Vibração/Posição _(TR, p. 325)_
- [ ] **11.** Módulo de Comunicação: SIMCOM _(TR, p. 325)_
- [ ] **12.** Faixa de Frequência: GSM/GPRS/EDGE: 850/900/1800/1900MHZ LTE-FDD _(TR, p. 325)_
- [ ] **13.** GPRS: Class2,TCP/IP construído em Módulo GSM _(TR, p. 325)_
- [ ] **14.** Precisão de Localização: 3 a 30 metros _(TR, p. 325)_
- [ ] **15.** Memória (armazenamento): 3.000 posições _(TR, p. 325)_
- [ ] **16.** Faixa de saída Dinâmica: -15~-108dbm _(TR, p. 325)_
- [ ] **17.** Sensibilidade de Recepção: -107dbm _(TR, p. 325)_
- [ ] **18.** Desvio máxima de frequência: +/- 0.1ppm _(TR, p. 325)_
- [ ] **19.** Antena GSM: Interna _(TR, p. 325)_
- [ ] **20.** Antena GPS: Interna _(TR, p. 325)_
- [ ] **21.** Protocolo de transferência: TCP _(TR, p. 325)_
- [ ] **22.** Rede 4G: Transmissão eficiente em 1seg. _(TR, p. 325)_
- [ ] **23.** Dados GPS: Atualizações de localização em tempo real _(TR, p. 325)_
- [ ] **24.** LED indicador: Ligado/ desligado e indicador de status _(TR, p. 325)_
- [ ] **25.** Envio de dados GPS: Dados em tempo real/permitir customização _(TR, p. 325)_
- [ ] **26.** Modo de Posicionamento: Triplo: GPS+BeiDou+LBS _(TR, p. 325)_
- [ ] **27.** Tempo de Posicionamento: Inicialização a frio: em média 32 segundos _(TR, p. 325)_
- [ ] **28.** Sensibilidade: Inicialização a frio: -145 dBm Inicialização a quente: -156 dBm Inicialização morna: -145 dBm Navegação: -160 dBm Rastreamento: -162 dBm111 Instalação e configuração do equipamento _(TR, p. 325)_
- [ ] **1.** Na assinatura do contrato a empresa deverá comprovar vínculo empregatício dos colaboradores que serão responsáveis pelas instalações; _(TR, p. 326)_
- [ ] **2.** Da segurança oferecida pelo equipamento: - Da mesma maneira a empresa deverá garantir que os equipamentos disponibilizados pela contratada, tenham proteção contra intervenções não autorizadas, garantindo proteção contra inversão de polaridade e identificação dos equipamentos não cadastrados no sistema e que requisitam conexão nos servidores de rastreamento; - Os equipamentos devem estar lacrados no ato da implantação. _(TR, p. 326)_

## Sistema Integrado de Custos

- [ ] **1.** Compatibilidade com os sistemas de gestão utilizados atualmente pelo órgão; _(TR, p. 326)_
- [ ] **2.** Capacidade de integração via web services, APIs ou conexões seguras; _(TR, p. 326)_
- [ ] **3.** Acesso remoto via navegador web, com autenticação segura; _(TR, p. 326)_
- [ ] **4.** Geração de relatórios gerenciais e demonstrativos de custos por Equipamento Público, Centro de Custo, Objeto de Custo, Funções de Governo e Elemento de Custo; _(TR, p. 326)_
- [ ] **5.** Atendimento à legislação vigente sobre contabilidade pública, custos governamentais e transparência; _(TR, p. 326)_
- [ ] **6.** Armazenamento seguro de dados, com backup e recuperação; _(TR, p. 326)_
- [ ] **7.** Parametrização e Configuração permitindo definir as estruturas básicas do sistema e adaptá-lo à realidade do órgão público; _(TR, p. 326)_
- [ ] **8.** Cadastro de centros de custo e unidades gestoras, objetos de custo e funções de governo; _(TR, p. 326)_
- [ ] **9.** Definição de planos acumuladores; _(TR, p. 326)_
- [ ] **10.** Parâmetros de alocação de custos diretos e indiretos; _(TR, p. 326)_
- [ ] **11.** Configuração de períodos de apuração; _(TR, p. 326)_
- [ ] **12.** Cadastro do equipamento público, com georeferenciamento e variáveis físicas personalizadas; _(TR, p. 327)_
- [ ] **13.** Coleta e Integração de Dados; _(TR, p. 327)_
- [ ] **14.** Deve permitir a coleta automatizada ou manual de dados de diferentes sistemas; _(TR, p. 327)_
- [ ] **15.** Integração com sistemas de folha de pagamento, contabilidade, almoxarifado, patrimônio, frotas, contratos e outros; _(TR, p. 327)_
- [ ] **16.** Permitir a importação e exportação de dados por meio de APIs ou arquivos estruturados (XLSX, XML, CSV); _(TR, p. 327)_
- [ ] **17.** Apurar os custos diretos e indiretos e realizar a distribuição conforme definido no método de apropriação do elemento; _(TR, p. 327)_
- [ ] **18.** Executar os cálculos de custos por plano acumulador e equipamento público gerando os demonstrativos analíticos e sintéticos; _(TR, p. 327)_
- [ ] **19.** Apuração por período (mensal, trimestral, anual etc.); _(TR, p. 327)_
- [ ] **20.** Gera relatórios, indicadores e dashboards para subsidiar a gestão e o controle institucional, dispondo de relatórios analíticos e sintéticos, indicadores de desempenho de custo por área/setor, painéis interativos com gráficos dinâmicos e filtros. _(TR, p. 327)_

## Sistema de Previdência

> Seção adicional encontrada no TR, sem item correspondente na planilha de 80 preços.

> Cadastramento e Arrecadação _(TR, p. 327)_
- [ ] **1.** Recadastramento de todos os servidores vinculados ao Instituto: Prefeitura, Assistência Social, Saúde e Educação; através de importação dos dados, ou pela digitação manual contendo todas as informações pessoais, dependentes, tempo de contribuição e base de previdência a partir de julho/1994. _(TR, p. 327)_
- [ ] **2.** Permitir importação mensal da base de cálculo para a Previdência da folha de pagamento de todos os servidores dos órgãos do município (administração direta e indireta). _(TR, p. 327)_
- [ ] **3.** Permitir administração de recolhimento de contribuições previdenciárias de cada servidor e patronal e custo complementar e ou aportes financeiros, por fonte pagadora, de forma individualizada, por regime financeiro contábil e previdenciário; _(TR, p. 327)_
- [ ] **4.** Permitir registro mensal da remuneração e de contribuição, bem como sua composição, do segurado e beneficiário _(TR, p. 328)_
- [ ] **5.** Emitir relação de contribuintes do RPPS, com informações de contribuição do empregador e empregado, por Regime Financeiro; _(TR, p. 328)_
- [ ] **6.** Permitir Controle do recolhimento do servidor, patronal e custo complementar e aportes financeiros. _(TR, p. 328)_
- [ ] **7.** Permitir controle de recolhimento para contribuinte Facultativo (individual); _(TR, p. 328)_
- [ ] **8.** Permitir a gestão do parcelamento de débitos; _(TR, p. 328)_
- [ ] **9.** Emissão de relatórios que auxiliam no Controle da Previdência Patronal e Funcional. _(TR, p. 328)_
- [ ] **10.** Emissão de Formulários para recadastramento. _(TR, p. 328)_
- [ ] **11.** Comunicação com o módulo de Concessão para que o cadastramento seja feito de forma automática ao se conceder um benefício a um servidor ativo, evitando o recadastramento manual. _(TR, p. 328)_
- [ ] **12.** Emissão de relatórios contendo as pessoas que já poderia se aposentar. _(TR, p. 328)_
- [ ] **13.** Emissão de guias para os órgãos competentes para o devido pagamento das contribuições patronais e funcionais _(TR, p. 328)_
- [ ] **14.** Exportar os dados em planilha Excel para o cálculo atuarial _(TR, p. 328)_
- [ ] **15.** Importar as bases de contribuição de 1994/07 até a presente data _(TR, p. 328)_
- [ ] **16.** Importar as verbas detalhadas para conferencia da base de contribuição _(TR, p. 328)_
- [ ] **17.** Possuir ferramenta que dê manutenção nas verbas detalhadas de forma que o servidor marque quais verbas incidem na previdência ou não. _(TR, p. 328)_
- [ ] **18.** Possuir relatório gerencial para conferencia da importação da base de contribuição X detalhamento das verbas de contribuição. _(TR, p. 328)_
- [ ] **19.** Permitir emissão de relatório consolidado da arrecadação; _(TR, p. 328)_
- [ ] **20.** Permitir a emissão da Guia de Recolhimento de Contribuições Previdenciárias, para comprovação de repasse dos órgãos ao RPPS; Concessão e Simulação de Benefícios _(TR, p. 328)_
- [ ] **21.** Cadastramento dos servidores efetivos. _(TR, p. 328)_
- [ ] **22.** Cadastramento das Regras Permanentes e Transitórias para concessão dos benefícios previdenciários. _(TR, p. 328)_
- [ ] **23.** Atualização automática da tabela de índice de correção para o cumprimento do disposto na lei 10.887/2004 _(TR, p. 328)_
- [ ] **24.** Atualização automática dos salários de contribuição para cumprimento do disposto na lei 10.887/2004 _(TR, p. 329)_
- [ ] **25.** Cadastramento dos entes emissores de certidões de tempo. _(TR, p. 329)_
- [ ] **26.** Lançamento do(s) tempo(s) de contribuição do servidor _(TR, p. 329)_
- [ ] **27.** Lançamento dos salários de contribuição a partir de julho 1994 ou data posterior. _(TR, p. 329)_
- [ ] **28.** Possibilidade de simulação do benefício para o servidor interessado. _(TR, p. 329)_
- [ ] **29.** Emissão de relatórios que contemplam todo o histórico contributivo e tempo de serviço, com os demonstrativos de enquadramento por regra de aposentadorias e pensões, para a devida opção de escolha por parte do servidor; _(TR, p. 329)_
- [ ] **30.** Emissão de Portaria de Aposentadoria e Pensão onde o próprio usuário deva conseguir dar manutenção no modelo de portaria. _(TR, p. 329)_
- [ ] **31.** Registro individualizado das contribuições dos servidores. _(TR, p. 329)_
- [ ] **32.** Emitir certidão de tempo de contribuição - CTC _(TR, p. 329)_
- [ ] **33.** Validação, análise e conferência dos processos concessórios. _(TR, p. 329)_
- [ ] **34.** Integração do sistema de concessão com o sistema de folha de pagamento, no ato da confirmação do benefício, onde o servidor passa a integrar a folha de aposentados / pensionistas do Instituto de Previdência. _(TR, p. 329)_
- [ ] **35.** Confirmação do Benefício e Cadastramento automático no módulo Folha de Pagamento. _(TR, p. 329)_
- [ ] **36.** Emitir os anexos no padrão do TCE para montagem da pasta de aposentadoria ou pensão. _(TR, p. 329)_
- [ ] **37.** TCE Anexo I – Ato de Aposentadoria. _(TR, p. 329)_
- [ ] **38.** TCE Anexo II – Requerimento de Aposentadoria. _(TR, p. 329)_
- [ ] **39.** TCE Anexo III – CND Direitos e Vantagens. _(TR, p. 329)_
- [ ] **40.** TCE Anexo IV – CND Fins de Adicionais. _(TR, p. 329)_
- [ ] **41.** TCE Anexo VI – CND Fins de Aposentadoria art. 40. _(TR, p. 329)_
- [ ] **42.** TCE Anexo VII – CND Fins de Aposentadoria art. ¨6. _(TR, p. 329)_
- [ ] **43.** TCE Anexo VIII – FIPA. _(TR, p. 329)_
- [ ] **44.** TCE Anexo IX – Ficha Funcional. _(TR, p. 329)_
- [ ] **45.** TCE Anexo X – Calculo Proventos Art. 3° e 6°. _(TR, p. 329)_
- [ ] **46.** TCE Anexo XI – Calculo Proventos Art. 2° e 40°. _(TR, p. 329)_
- [ ] **47.** TCE Anexo XII – Pensão por falecimento a partir de 24/06/2004. _(TR, p. 330)_
- [ ] **48.** TCE Anexo XIII – Pensão por falecimento entre 31/12/2003 e 20/06/2004. _(TR, p. 330)_
- [ ] **49.** TCE Anexo XIV – Calculo da pensão. _(TR, p. 330)_
- [ ] **50.** TCE Anexo XV – Calculo da pensão. _(TR, p. 330)_
- [ ] **51.** TCE Anexo XVI – Nota de confirmação de aposentadoria. _(TR, p. 330)_
- [ ] **52.** TCE Anexo XVII – Nota de confirmação de pensão. _(TR, p. 330)_
- [ ] **53.** Emissão da Declaração de não Acúmulo/Remuneração conforme modelo do _(TR, p. 330)_
### TCE. _(p. 330)_

- [ ] **54.** MPS - Certidão de Tempo de Contribuição - Anexo I _(TR, p. 330)_
- [ ] **55.** MPS - Certidão de Tempo de Contribuição - Anexo II _(TR, p. 330)_
- [ ] **56.** MPS - Certidão de Tempo de Contribuição - Anexo III _(TR, p. 330)_
- [ ] **57.** MPS - Certidão de Tempo de Contribuição - Anexo IV _(TR, p. 330)_
- [ ] **58.** Listagem de Benefícios Confirmados em determinado período com possibilidade de filtrar os Tipos de Benefícios, contendo no mínimo: Regra do Benefício, Data de Confirmação e Vr. Do Benefício. _(TR, p. 330)_
- [ ] **59.** Possibilidade de impressão individualizado da Memória de Cálculo do Benefício confirmado. _(TR, p. 330)_
- [ ] **60.** Possibilidade da visualização da Memória de Cálculo das simulações realizadas a qualquer movimento de acordo com a necessidade do Órgão. _(TR, p. 330)_
- [ ] **61.** Visualização gráfica dos benefícios concedidos nos últimos 6 meses _(TR, p. 330)_
- [ ] **62.** Possibilidade de geração de relatório que demonstre as prováveis aposentadorias com possibilidade de filtrar: Período de Aposentadoria, Período de Admissão, Cargo, Regras de Aposentadoria (com possibilidade de escolher mais de uma Regra), Abono Permanência (Sim/Não). _(TR, p. 330)_
### Integração destes Módulos em Ferramenta BI _(p. 330)_

- [ ] **63.** A Ferramenta BI deve demonstrar os seguintes gráficos pré-moldados: _(TR, p. 330)_
- [ ] **64.** Distribuição da frequência por Idade e Remuneração dos Servidores Cadastrados _(TR, p. 330)_
- [ ] **65.** Distribuição da frequência por Idade e Data de Admissão dos Servidores Cadastrados _(TR, p. 330)_
- [ ] **66.** Distribuição da Idade de Aposentadoria Projetada por Sexo _(TR, p. 330)_
- [ ] **67.** Distribuição da Média de Idade dos Servidores em comparação com a Idade Média de Admissão e de Projeção da Aposentadoria por Sexo e Carreira. _(TR, p. 330)_
- [ ] **68.** Distribuição da situação das Guias de Arrecadação por Ente _(TR, p. 331)_
- [ ] **69.** Distribuição do Total Recebido em Guias de Arrecadação por Ente _(TR, p. 331)_
- [ ] **70.** Processos de Protocolos de Documentos gerados por Referência _(TR, p. 331)_
- [ ] **71.** Distribuição da Frequência anual de Protocolos por Tipo de Tramitações. _(TR, p. 331)_
- [ ] **72.** Distribuição da Frequência de dias de Afastamento por sexo _(TR, p. 331)_
- [ ] **73.** Distribuição da Média de Perícias realizadas por CID _(TR, p. 331)_
- [ ] **74.** Distribuição dos Servidores Ativos por Sexo e Magistério _(TR, p. 331)_
- [ ] **75.** Distribuição das Aposentadorias e Médias Salariais por Ano. _(TR, p. 331)_
- [ ] **76.** Distribuição da Projeção de Aposentadorias e Médias Salariais em até 5 anos posteriores. _(TR, p. 331)_
- [ ] **77.** Distribuição das Aposentadorias por Regra demonstrando o Sexo e se Magistério (Professor/Não Professor) _(TR, p. 331)_
- [ ] **78.** Fluxo dos Servidores do RPPS _(TR, p. 331)_
- [ ] **79.** Distribuição dos Servidores por Cargo _(TR, p. 331)_
- [ ] **80.** Distribuição dos Benefícios confirmamos. Aplicativo Personalizado _(TR, p. 331)_
- [ ] **81.** Disponibilidade nas lojas de aplicativos para dispositivos móveis, tais como a Play Store, Apple Store, etc. _(TR, p. 331)_
- [ ] **82.** Login através de usuário e senha cadastrados para o servidor. _(TR, p. 331)_
- [ ] **83.** Opção de lembrar o login do servidor, evitando a digitação em todo acesso. _(TR, p. 331)_
- [ ] **84.** Opção de acesso por biometria caso o celular tenha tal recurso. _(TR, p. 331)_
- [ ] **85.** Permitir que o aposentado e pensionista visualize o contra cheque e envie o contra cheque, salve ou envie em formato PDF por e-mail, whatsapp ou outro aplicativo disponível no celular. _(TR, p. 331)_
- [ ] **86.** Permitir que o aposentado e pensionista visualize o informe de rendimentos salve ou envie em formato PDF por e-mail, whatsapp ou outro aplicativo disponível no celular. _(TR, p. 331)_
- [ ] **87.** Permitir que o aposentado e pensionista visualize a margem de consignados pelo aplicativo, demonstrando o valor base, valor total da margem e valor do saldo para novos consignados. _(TR, p. 331)_
- [ ] **88.** Permitir que o aposentado e pensionista realize a prova de vida pelo aplicativo conforme documentos parametrizados pelo próprio instituto. _(TR, p. 331)_
- [ ] **89.** Permitir que os servidores ativos realizem o censo previdenciário pelo aplicativo conforme documentos parametrizados pelo próprio instituto. _(TR, p. 331)_
- [ ] **90.** Permitir que o servidor ativo simule aposentadoria, demonstrando todas as regras vigentes, data da possível aposentadoria e direito ao abono permanência. _(TR, p. 332)_
- [ ] **91.** Permitir que o servidor ativo emita o extrato de contribuição previdenciária, salve ou envie em formato PDF por e-mail, whatsapp ou outro aplicativo disponível no celular. _(TR, p. 332)_
- [ ] **92.** Permitir que o instituto envie mensagens em grupo ou individual para comunicação com aposentados, pensionistas e ativos. (possuir relatório das mensagens enviadas, recebidas e lidas.) _(TR, p. 332)_

## Acompanhamento do Valor Adicionado Fiscal

- [ ] **1.** Desenvolver o sistema com base no atendimento as leis federais e estaduais vigentes. _(TR, p. 332)_
- [ ] **2.** Desenvolver o sistema em linguagem Web. Por questão de performance, os sistemas devem ser desenvolvidos em linguagem nativa para Web (Java, PHP, C# ou outra operável via Internet). _(TR, p. 332)_
- [ ] **3.** Navegar com o sistema pelo menos nos navegadores (padrão de mercado), nas seguintes versões: Firefox (versão 50 ou superior); Google Chrome (versão 55 ou superior); Safari (versão 10 ou superior) e Edge (versão 91 ou superior). _(TR, p. 332)_
- [ ] **4.** Navegar com o sistema sem a utilização de qualquer recurso tecnológico, como runtimes e plugins, exceto em casos onde houver necessidade de sistema intermediário para acesso a outros dispositivos (como leitor biométrico, impressoras, leitor de e-CPF/e-CNPJ) ou integração com aplicativos da estação cliente (como Microsoft Office, exibição de documentos PDF), por motivos de segurança de aplicações web; _(TR, p. 332)_
- [ ] **5.** Estruturar o sistema para que não haja redundância de tabelas em cada área de aplicação proposta, exceto quanto a replicação de informações em outros ambientes (como integrações com outras aplicações). _(TR, p. 332)_
### Acesso ao usuário externo (contribuintes) _(p. 332)_

- [ ] **6.** A plataforma deverá ter layout funcional e exclusivo para login do contribuinte, e, após a inserção dao CNPJ, o sistema deverá buscar automaticamente (Razão Social; Telefone; CEP; Endereço, nº; complemento; Bairro; Cidade e _(TR, p. 333)_
### UF). _(p. 333)_

- [ ] **7.** O sistema deverá ter layout funcional que permita ao usuário o "auto cadastramento" de suas informações jurídicas. As informações inseridas pelo usuário devem comunicar com a base de dados do Governo Federal e do Estado. _(TR, p. 333)_
- [ ] **8.** O sistema deverá permitir o envio da EFD por parte do contribuinte. _(TR, p. 333)_
- [ ] **9.** O sistema deverá permitir a emissão do protocolo de envio das atividades realizadas pelo contribuinte que esteja correlacionadas com a arrecadação. _(TR, p. 333)_
- [ ] **10.** O sistema deverá permitir que o contribuinte receba notificações. _(TR, p. 333)_
- [ ] **11.** O sistema deverá demonstrar todas as notificações e status delas, se lidas ou não. _(TR, p. 333)_
- [ ] **12.** O sistema deverá sinalizar o usuário, por e-mail, sobre o recebimento de notificações. _(TR, p. 333)_
### Acesso ao usuário externo (contadores) _(p. 333)_

- [ ] **13.** A plataforma deverá ter layout funcional e exclusivo para login do contador, e, após a inserção do CPF ou CNPJ, o sistema deverá buscar automaticamente (Razão Social; Telefone; CEP; Endereço, nº; complemento; Bairro; Cidade e _(TR, p. 333)_
### UF). _(p. 333)_

- [ ] **14.** O sistema deverá ter layout funcional que permita ao usuário o "auto cadastramento" de suas informações jurídicas. As informações inseridas pelo profissional sobre seus clientes deverão comunicar com o cadastro municipal. _(TR, p. 333)_
- [ ] **15.** O sistema deverá emitir protocolo de entrega, por documento enviado, após o envio dos arquivos contendo os dados para a formação do valor adicionado. _(TR, p. 333)_
- [ ] **16.** O sistema deverá permitir que o Contador receba as notificações envidas aos seus contribuintes, que deverão ser direcionadas ao e-mail do profissional. _(TR, p. 333)_
- [ ] **17.** O sistema deverá demonstrar todas as notificações e status delas, se lidas ou não. _(TR, p. 333)_
### Acesso ao usuário interno (auditor) _(p. 333)_

- [ ] **18.** O sistema deverá possuir forma de acesso exclusivo e identificado para que os usuários da Prefeitura acessem o sistema. _(TR, p. 334)_
- [ ] **19.** A partir de um ambiente exclusivo para servidor público, este deverá ter a opção para selecionar o exercício em que serão realizadas as analises, tendo este filtro efeito em qualquer tela ou relatório. O sistema deverá permitir ainda, trabalhar com múltiplos exercícios, onde o usuário poderá escolher a qualquer momento qual exercício atuar. _(TR, p. 334)_
- [ ] **20.** O Sistema deverá disponibilizar tabelas que contenham os “CFOP’s” - Códigos Fiscais de Operações e Prestações, trazendo suas descrições e usabilidades, apontando se ele compõe ou não o valor adicionado. _(TR, p. 334)_
- [ ] **21.** O Sistema deverá habilitar o cadastramento das informações jurídicas do responsável pela escrituração fiscal da empresa. Deve ainda, ter a opção de vincular e desvincular todos os clientes que possui na carteira do responsável. _(TR, p. 334)_
- [ ] **22.** O Sistema deverá permitir a inclusão de novas empresas. _(TR, p. 334)_
- [ ] **23.** Sistema deverá emitir relatório através de consulta do cadastro de pessoas jurídicas, importando, diretamente do site da Receita Federal do Brasil e permitir também a inclusão de novas informações. _(TR, p. 334)_
- [ ] **24.** O Sistema deverá estar parametrizado com fórmulas aritméticas, por Código Fiscal de operação e prestação dos registros dos documentos fiscais. _(TR, p. 334)_
- [ ] **25.** O Sistema deverá parametrizado de regras de Contrapartida por Código Fiscal de Operação e Prestação. _(TR, p. 334)_
- [ ] **26.** O Sistema deverá habilitar "caixa de textos padrão" para exibir notificações, capacitando a utilização de recursos de formatação básica de texto, tais como: negrito, itálico, sublinhado e cores e fontes. _(TR, p. 334)_
- [ ] **27.** O Sistema deverá habilitar o cadastramento de todos os usuários, devendo individualizar o perfil de acesso para cada um. _(TR, p. 334)_
- [ ] **28.** O Sistema deverá disponibilizar todas as informações do Estado aos Municípios, de modo que a Municipalidade acompanhe o Valor Adicionado por meio das seguintes informações: Cadastro das Empresas, Valor Adicionado (provisório e definitivo), EFD, Gias, Índices dos Municípios (provisórios e definitivos). _(TR, p. 334)_
- [ ] **29.** O sistema deverá importar a Escrituração Fiscal Digital (EFD-ICMS/IPI) na forma do Ato COTEPE/ICMS Nº 09, de 18 de abril de 2008 e suas respectivas atualizações, bem como as Gias mensais. _(TR, p. 334)_
- [ ] **30.** O sistema deverá gerar um resumo mensal consolidado por CFOP, contendo os dados para apuração do Valor Adicionado, a partir do EFD-ICMS/IPI e Gia. _(TR, p. 335)_
- [ ] **31.** O sistema deverá emitir relatório para o processo de comparação dos documentos entregue ao Estado para apuração do Valor Adicionado (Gias) com os dados contidos na EFD-ICMS/IPI, constando eventuais inconsistências. _(TR, p. 335)_
- [ ] **32.** O Sistema deverá possuir rotina para leitura das Informação das movimentações por “CFOP’s”, enviadas pelos contribuintes, apresentando dinamicamente o cruzamento das fórmulas e regras previstas com as declarações entregues de forma que o auditor possa identificar automaticamente as possíveis inconsistências, estes dados devem ser apresentados pelas Gias e pelo EFD. _(TR, p. 335)_
- [ ] **33.** O sistema deverá apresentar em tela, somente as empresas que possuem inconsistências nas fórmulas parametrizadas e/ou regras. _(TR, p. 335)_
- [ ] **34.** O sistema deverá importar automaticamente e semanalmente das receitas de repasse do ICMS ao município, disponibilizando relatórios e gráficos para consulta. _(TR, p. 335)_
- [ ] **35.** O sistema de deverá possibilitar ao agente a atuação mês-a-mês. _(TR, p. 335)_
- [ ] **36.** O Sistema deverá permitir à consulta das atividades abertas, do encaminhamento à leitura, e, análise das informações fiscais. _(TR, p. 335)_
### Notificações e intimações _(p. 335)_

- [ ] **37.** Na correção das escriturações, o sistema deverá permitir ao auditor realizar a notificação, solicitando a correção, informando detalhadamente, os pontos encontrados e seu devido esclarecimento. Caso ocorra a correção, o sistema deverá permitir ao contribuinte a substituição do documento, permitindo o envio de uma nova versão para o Município; _(TR, p. 335)_
- [ ] **38.** Na Omissão Estadual, caso não seja localizada a declaração do contribuinte, o sistema deverá permitir a notificação, que deverá ser enviadal pelo sistema e entregue a seu usuário, através módulo do específico. _(TR, p. 335)_
- [ ] **39.** Em caso de omissão da declaração, o sistema deverá possibilitar o envio da notificação domicilio eletronico municipal. _(TR, p. 335)_
### Relatórios VAF _(p. 336)_

- [ ] **40.** Apresentar o ranking dos contribuintes por representação na composição do Valor Adicionado do Município: este relatório poderá ser emitido com base nos Valores Provisórios, Valores Definitivos, Documentos Entregues no Município e informações presentes nas Gias, EFD-ICMS/IPI. _(TR, p. 336)_
- [ ] **41.** Apresentar o ranking das atividades por representação na composição do Valor Adicionado do Município; _(TR, p. 336)_
- [ ] **42.** Disponibilizar curva ABC por Atividade; este relatório poderá ser emitido com base nos Valores Provisórios, Valores Definitivos e informações presentes nas Gias, EFD-ICMS/IPI. _(TR, p. 336)_
- [ ] **43.** Disponibilizar comparativo de contribuintes por Exercício e Atividade; este relatório poderá ser emitido com base nos Valores Provisórios, Valores Definitivos. _(TR, p. 336)_
- [ ] **44.** Deverá gerar relatórios por meio de gráficos, que reflita o desenvolvimento do valor adicionado do município, em valores absolutos. _(TR, p. 336)_
- [ ] **45.** Este gráfico deverá refletir ainda, a evolução ou retração do índice de participação repassado ao município. _(TR, p. 336)_
- [ ] **46.** Disponibilizar análise da evolução dos repasses efetuados, comparando com o total distribuído pelo Estado, em valores absolutos, ao longo do período dos últimos 5 (cinco) anos. _(TR, p. 336)_
- [ ] **47.** Disponibilizar Rol de empresas que escrituraram somente o Valor Contábil em suas declarações em cada CFOP. _(TR, p. 336)_
- [ ] **48.** Disponibilizar Rol de Empresas que demonstre o percentual da margem do valor adicionado. Este relatório poderá ser emitido com base nos Valores Provisórios, Valores Definitivos, declarações entregues no Município e informações presentes nas Gias, EFD-ICMS/IPI. _(TR, p. 336)_
- [ ] **49.** Deverá ter rotina para reimpressão do Protocolo de Envio dos Documentos (EFD e Gia). _(TR, p. 336)_
- [ ] **50.** Disponibilizar relatório sintético por CFOP, este relatório poderá ser emitido com base nas Declarações Entregues no Município (Gias,EFD). _(TR, p. 336)_
- [ ] **51.** Disponibilizar relatório do valor adicionado podendo optar por uma empresa ou todas ou e ainda, mês a mês. Este relatório poderá ser emitido com base nos documentos Entregues ao Município (Gias, EFD). _(TR, p. 336)_
- [ ] **52.** Disponibilizar relatório de Apuração do Valor Adicionado das empresas do Simples Nacional baseado nas DEFIS e PGDAS. _(TR, p. 337)_
- [ ] **53.** Deverá disponibilizar relatório de retorno financeiro por empresas, demonstrando o valor de repasse proporcionado exclusivamente em função do valor adicionado. _(TR, p. 337)_
- [ ] **54.** Deverá disponibilizar relatório de repasse realizado ao município, por competência. _(TR, p. 337)_
- [ ] **55.** Deverá elaborar estimativa do Valor Adicionado Anual dos contribuintes com base nos dados coletados. _(TR, p. 337)_
- [ ] **56.** O sistema deverá demonstrar de forma mensal ou anual todas as operações de entrada e saída por CFOP detalhando todos os valores provenientes das Gias, EFD/ICMS/IPI, destacando visualmente as que compõe o valor adicionado bem como as que possuem divergências oriundas das análises de fórmulas previamente cadastradas no sistema com a possibilidade ainda de detalhamento da fórmula aplicada. _(TR, p. 337)_
- [ ] **57.** O sistema deverá indicar também as inconsistências da base de cálculos constante no “CFOP" outras saídas de mercadorias ou prestação de serviço não especificadas. _(TR, p. 337)_

## Assistência Virtual para Autoatendimento

- [ ] **1.** O sistema deve ser totalmente web e em “nuvem” com acesso seguro HTTPS e com certificado SSL válido. _(TR, p. 337)_
- [ ] **2.** O sistema deve possuir um único número de telefone (fixo ou celular), informado pelo Contratante para centralizar os canais de atendimento via WhatsApp. _(TR, p. 337)_
- [ ] **3.** Ativação de uma instância para conexão com o WhatsApp Business API. _(TR, p. 337)_
- [ ] **4.** Permite o recebimento e resposta de mensagens através da plataforma oficial de mensageira do Whatsapp dos tipos de conversas de serviço, utilidade e autenticação. Consumo de API´s Oficiais Whatsapp. _(TR, p. 337)_
- [ ] **5.** O WhatsApp Business API depende da aprovação do Meta. Caberá à CONTRATADA dar auxílio à CONTRATANTE em todas as etapas necessárias para criação, acompanhamento e aprovação do contato oficial (número confirmado) da CONTRATANTE na plataforma da Meta e aprovação dos modelos de mensagens. _(TR, p. 337)_
- [ ] **6.** Ser totalmente on-line e multiusuário, de modo que várias pessoas possam fazer gestão da lista de e-mails remotamente de qualquer computador; _(TR, p. 338)_
- [ ] **7.** O sistema deve garantir atendimento das normas brasileiras e das normas do serviço WhatsApp. _(TR, p. 338)_
- [ ] **8.** O sistema deve disponibilizar mecanismo de segurança das informações e proteger o sistema de acesso a terceiros não autorizados. _(TR, p. 338)_
- [ ] **9.** O sistema deve armazenar em nuvem os dados de atendimentos, com segurança e garantia de sigilo e integridade dos dados (Backup). _(TR, p. 338)_
- [ ] **10.** A solução deverá permitir a integração com sistemas “legados” ou de “backend” por meio de APIs (Application Program Interface – Interface de Programa Aplicativo) _(TR, p. 338)_
- [ ] **11.** Permitir integrações por meio de requisições HTTP ou HTTPS com passagem de parâmetros diretamente na barra de endereços do navegador web; _(TR, p. 338)_
- [ ] **12.** Toda integração entre sistema deve ser controlado por requisição de autenticação por meio de token de acesso; _(TR, p. 338)_
- [ ] **13.** O cadastramento do número de telefone de atendimento na plataforma WhatsApp deve ser uma conta comercial. _(TR, p. 338)_
- [ ] **14.** A CONTRATADA será responsável pela personalização linha de telefônica para o número (00) 0000-0000 que será o número utilizado no WhatsApp. _(TR, p. 338)_
- [ ] **15.** Permite a criação de menus por departamentos/setores ou serviços conforme necessidade do órgão _(TR, p. 338)_
- [ ] **16.** Permite o envio de respostas rápidas ao contribuinte em atendimento; _(TR, p. 338)_
- [ ] **17.** Possui um Chat interno ou local para envio de mensagens e/ou informações privadas sobre os atendimentos; _(TR, p. 338)_
- [ ] **18.** Possui um painel para administração, controle e monitoramento dos atendimentos. _(TR, p. 338)_
- [ ] **19.** Permite ao contribuinte fazer a Avaliação de Atendimento; _(TR, p. 338)_
- [ ] **20.** Encerramento de chamado por parte do contribuinte, digitando uma tecla/símbolo a ser escolhido e parametrizado pelo administrador, com a informação disponível no "menu" do sistema. _(TR, p. 338)_
- [ ] **21.** As conversas e mensagens trocadas através da plataforma são da Prefeitura, confidenciais e não serão acessadas por terceiro. _(TR, p. 339)_
- [ ] **22.** Integração via API com o sistema de gestão para emissão de Documentos via envio de mensagens; _(TR, p. 339)_
- [ ] **23.** Capacidade de gerenciar e responder automaticamente a interações em canais como site ou WhatsApp; _(TR, p. 339)_
- [ ] **24.** Incluso na solução o suporte a conexões simultâneas de envio e recebimento de mensagens de uma instância para Whatsapp e uma para webchat; _(TR, p. 339)_
- [ ] **25.** O sistema deverá permitir a criação de fluxos de atendimentos com menus de opções totalmente automatizados chatbots. _(TR, p. 339)_
- [ ] **26.** O chatbot deve ser capaz de iniciar serviços, guiar o usuário pelo catálogo de serviços (menu) e coletar feedback. _(TR, p. 339)_
- [ ] **27.** Os fluxos de atendimentos de serviços (menu) no chatbot devem ser integrados por meio de API para realização automática do atendimento as solicitações dos usuários; _(TR, p. 339)_
- [ ] **28.** Timeout, configurar tempo de inatividade, para desconectar e retornar mensagem personalizada informando da desconexão; _(TR, p. 339)_
- [ ] **29.** As opções de serviços disponíveis nos menus de atendimento deverão ser cadastradas no sistema com possibilidade de criação de níveis de grupos e subgrupos; _(TR, p. 339)_
- [ ] **30.** Permitir configurar sequência de chatbot para autoatendimento dos cidadãos com funcionamento ininterrupto. _(TR, p. 339)_
- [ ] **31.** Permissão para configurar os menus de opção, com inserção de anexos nos formatos de imagens, documentos, áudios, contatos ou localização. _(TR, p. 339)_
- [ ] **32.** Permissão para cadastramento de avisos de utilidade pública a serem publicados após mensagem inicial de boas-vindas, com prazo de expiração da veiculação. _(TR, p. 339)_
- [ ] **33.** Permissão para configuração de mensagens personalizadas para envio ao final de uma sessão de atendimento. _(TR, p. 339)_
- [ ] **34.** Permitir a identificação automática do perfil de solicitante dos serviços online (Público, Cidadão, Servidor ou Empreendedor). _(TR, p. 339)_
- [ ] **35.** Permitir o cadastro de instâncias para conectar o número ao Whatsapp. _(TR, p. 339)_
- [ ] **36.** Permitir o cadastro dos serviços que serão disponibilizados nos menus do chatbot automaticamente, formando um catalogo de serviços. _(TR, p. 340)_
- [ ] **37.** Os serviços cadastrados deve permitir consultar automaticamente a respectiva API de integração. _(TR, p. 340)_
- [ ] **38.** Permitir controlar a exibição dos serviços conforme a visibilidade para restringir acesso a serviços restritos com necessidade de autenticação ou cadastro. _(TR, p. 340)_
- [ ] **39.** Permitir a exibição dos serviços no menu do chatbot conforme o perfil identificado automaticamente do solicitante. _(TR, p. 340)_
- [ ] **40.** Identificar se o numero de celular do solicitante do serviço é vinculado a algum CPF ou CNPJ no cadastro de pessoas. _(TR, p. 340)_
- [ ] **41.** Possuir um cadastro de usuários de serviços. _(TR, p. 340)_
- [ ] **42.** Validar o cadastro de usuário para vincular o CPF ao numero de celular. _(TR, p. 340)_
- [ ] **43.** Exigir aceite dos termos da LGPD sempre no 1º acesso ao serviço, validações de cadastros e mudanças nos termos. _(TR, p. 340)_
### Implantação do Software _(p. 340)_

> A etapa de Implantação corresponde a execução de todos os serviços e atividades necessários ao pleno funcionamento e utilização do software como instalação, configuração, migração e conversão de dados existentes pela contratada. O software deverá ser instalado e implantado em ambiente cloud (nuvem) sob responsabilidade da Contratada, com todas as licenças de softwares necessárias. Durante a execução do contrato, a Contratada deverá dar assistência técnica após a implantação do software para Gestão Pública. O prazo para a Implantação do Software será de até 180 (cento e oitenta) dias corridos, a contar da data de recebimento da Autorização de Serviço. A implantação será acompanhada pelo fiscal do contrato, que se responsabilizará por todo relacionamento administrativo com a contratada. _(TR, p. 340)_
### .Treinamento / Capacitação: _(p. 341)_

> Os treinamentos sobre a utilização das funcionalidades do sistema deverão ser _(TR, p. 341)_
> desenvolvidos e aplicados pela CONTRATADA aos servidores envolvidos com o _(TR, p. 341)_
> sistema visando à compreensão da tecnologia, da metodologia, do software e dos _(TR, p. 341)_
> novos procedimentos adotados e o desenvolvimento das habilidades necessárias ao _(TR, p. 341)_
> exercício da função. Desta forma, deverá ser atingido um nível maior de _(TR, p. 341)_
> compreensão e absorção dos treinados envolvidos, a ponto de tornarem-se _(TR, p. 341)_
> autônomos em relação à prática nas demais localidades da rede, ou seja, tornarem- _(TR, p. 341)_
> se capacitados a multiplicar os treinamentos recebidos para outros usuários dos _(TR, p. 341)_
> sistemas. _(TR, p. 341)_
> A CONTRATADA deverá dispor de um módulo de treinamento online interligado ao _(TR, p. 341)_
> sistema. _(TR, p. 341)_
> • Suporte Técnico ao Software: _(TR, p. 341)_
> O suporte técnico ao software e ao banco de dados dele deverá ser realizado pela _(TR, p. 341)_
> Equipe Técnica da Contratada, pós-Implantação e durante a Operação do Software _(TR, p. 341)_
> para Gestão Pública, no ambiente de produção da Contratada, e quando possível _(TR, p. 341)_
> remotamente durante o período de vigência do contrato. _(TR, p. 341)_
> Durante este período, a Contratada deverá prover todo e qualquer suporte ao _(TR, p. 341)_
> sistema, a contar da data de início da operação do sistema. _(TR, p. 341)_
### Entende-se por suporte, a execução das seguintes atividades pela Contratada: _(p. 341)_

> a) Correção de erros no software; _(TR, p. 341)_
> b) Atualização do Sistema; _(TR, p. 341)_
> c) Gerar documentação de utilização do sistema; _(TR, p. 341)_
> .Customização _(TR, p. 342)_
> São as solicitações adicionais feitas à empresa contratada, que não foram _(TR, p. 342)_
> previamente descritas no Termo de Referência (TR) ou no Edital. Essas solicitações _(TR, p. 342)_
> podem surgir à medida novas necessidades passam a ser identificadas _(TR, p. 342)_
### Podemos detalhar como Customizações: _(p. 342)_

> Desenvolvimento de Novas Funcionalidades: Se durante a fase de implementação _(TR, p. 342)_
> do software for identificada a necessidade de funcionalidades adicionais que não _(TR, p. 342)_
> estavam inicialmente previstas no TR, pode ser solicitado à empresa contratada que _(TR, p. 342)_
> desenvolva essas novas funcionalidades para atender aos requisitos específicos do _(TR, p. 342)_
> órgão público. _(TR, p. 342)_
> Integrações Específicas com Outros Sistemas: Se surgir a necessidade de integrar o _(TR, p. 342)_
> software fornecido com sistemas externos que não foram inicialmente contemplados, _(TR, p. 342)_
> pode ser solicitado à empresa contratada que desenvolva essas integrações _(TR, p. 342)_
> específicas para garantir a interoperabilidade entre os sistemas. _(TR, p. 342)_
> Personalização de Relatórios ou Documentos: Caso a administração necessite de _(TR, p. 342)_
> relatórios ou documentos específicos que não estão disponíveis no software padrão, _(TR, p. 342)_
> pode ser solicitado à empresa contratada que personalize esses relatórios ou _(TR, p. 342)_
> documentos de acordo com as necessidades do cliente. _(TR, p. 342)_

