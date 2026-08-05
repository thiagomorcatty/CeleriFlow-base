# Prova de Conceito — Alvorada de Minas/MG

Transcrição do Termo de Referência do Processo Licitatório nº 068/2026 — Pregão Eletrônico nº 025/2026.

> O texto abaixo foi mantido conforme o documento de origem, inclusive quanto a redação, grafia, pontuação e eventuais inconsistências. Foram removidas somente as quebras visuais de linha e a repetição do cabeçalho/rodapé das páginas para adaptação ao formato Markdown.

## 1. Regras gerais da Prova de Conceito

### 7 DA PROVA DE CONCEITO:

7.1 Para examinar a aceitabilidade da proposta quanto à sua adequação ao objeto licitado especificado no termo de referência, a licitante provisoriamente classificada em primeiro lugar na etapa de lances e devidamente habilitada, deverá apresentar os documentos exigidos e efetuar a demonstração do sistema integrado de gestão pública (Prova de Conceito), sob a sua exclusiva responsabilidade, à equipe responsável indicada pela Contratante, seguindo o roteiro e as condições estabelecidas nesse Termo de Referência Técnica – Aceitabilidade das Ofertas das Licitantes e Prova de Conceito apresentação será realizada em equipamentos da própria prefeitura, onde estará instalado o browser atualizado com acesso à internet e leitor de PDF;

7.2 O endereço eletrônico de funcionamento do sistema integrado deverá ser fornecido pela empresa que realizará toda a apresentação do sistema ofertado a partir deste endereço;

7.3 As funcionalidades do sistema integrado deverão ser testadas utilizando o endereço de protocolo HTTP, sem que seja realizado nenhum acesso remoto;

7.4 A análise da aceitabilidade da proposta/prova de conceito será realizada em sessão pública, na sede da Prefeitura Municipal, na data e horário a ser previamente divulgadas pelo Pregoeiro, observado o prazo de 4 (quatro) dias úteis para a sua realização.

7.5 É permitido o acompanhamento por quaisquer interessados, não sendo permitida a intervenção durante a execução da análise. Eventuais manifestações poderão ser protocoladas em até três dias após o encerramento da demonstração.

7.6 Caso o sistema integrado seja reprovado no que se refere às condições de aceitabilidade da proposta/prova de conceito, o licitante será automaticamente desclassificado. Neste caso o licitante terá assegurado o prazo de 03 (três) dias úteis para apresentar recurso, a contar da data de publicação da referida decisão. Em sequência, caso o recurso seja julgado improcedente, será chamada a segunda colocada e, assim sucessivamente, até que seja declarada a vencedora do certame.

### 7.7 DO PROCEDIMENTO DA PROVA DE CONCEITO

7.7.1 A prova de conceito será realizada através da demonstração pela empresa provisoriamente classificada em primeiro lugar, bem como a verificação do resultado pretendido pela comissão de Avaliação das Exigências relacionados a seguir:

7.7.1.1 Em relação aos itens e módulos mencionados no Termo de Referência (6.1 ao 6.16), mesmo se não relacionadas para a Prova de Conceito, o Licitante deve enviar declaração informando se atende ou não atende, cujo percentual de atendimento deve atingir no mínimo 70% dos itens de cada módulo exigido.

7.7.1.2 Também deve ser incluída na proposta Declaração que os itens declarados como “não atende” serão solucionados durante a fase de implantação do sistema, caso se consagre vencedora.

7.7.2 Quanto ao pré-requisito previsto no tópico 5.2.1 ao 5.4.21 do termo de referência, estes deverão ser inteiramente atendidos no sistema, em plataforma web e integrado, vedado a ferramenta de emulação, sob pena de desclassificação do licitante, de modo que deverá ser demostrado no dia da prova de conceito.

7.7.3 Quando o edital se referir a Solicitação de Licitação, a mesma deve ser compreendida como qualquer registro no sistema, que formalize a demanda de um setor para licitar, que contenha nome do demandante, o responsável, o objeto, bem como a relação de itens e quantitativos pretendidos, podendo este registro assumir qualquer nome no software.

7.7.4 Quando o edital se referir a Autorização de Empenho, a mesma deve ser compreendida como qualquer registro no sistema, que formalize a necessidade da emissão da nota de empenho, que contenha no mínimo, o setor solicitante, o objeto, a relação de itens com quantitativos e valores que compõe o objeto, o fornecedor e a classificação da despesa até o nível de subelemento, podendo este registro assumir qualquer nome no software.

7.7.5 Os itens (exigências) relacionados para a Prova de conceito são considerados de alta relevância para o software. Cada item relacionado tem o valor de 1 (um) ponto, sendo necessário atingir no mínimo 90% dos pontos possíveis em cada módulo, para que a Comissão considere o software como apto.

7.7.5.1 O item será considerado satisfeito, quando realizado o lançamento solicitado e demonstrado o resultado esperado. O atendimento parcial do enunciado não será considerado válido.

## 2. Pré-requisitos gerais integralmente exigidos na POC — itens 5.2.1 a 5.4.21

### 5.2 Do Software

5.2.1 O sistema a ser fornecido não possuirá nenhum arquivo executável nas estações de trabalho, sendo vedado o uso de arquivos executáveis para acessar o sistema, ou parte do mesmo. O sistema disponibilizará acesso através da plataforma web em 100% das rotinas definidas por esse instrumento, através de navegadores de acesso à Internet. O sistema não poderá conter arquivos denominados “clientes” em suas estações de acesso. O único protocolo de comunicação a ser aceito será o “HTTP” com certificação de segurança SSL comumente denominado “HTTPS”.

5.2.2 O sistema deverá ter sua rotina de backup de sua base de dados diariamente e disponibilizar para entidade, mediante solicitação. O backup deverá ser feito através de rotinas automatizadas ou pelo administrador das bases de dados, e, juntamente com o arquivo do backup a estrutura e relacionamento entre as entidades.

5.2.3 O sistema terá de utilizar um banco de dados (RDBMS - Relational database management system), padrão SQL (Structured Programming Language), que deverá armazenar todas as informações do sistema em quaisquer dos seus módulos.

5.2.4 O sistema deverá ser desenvolvido em uma mesma linguagem de programação, em banco de dados único, integrados e com um framework (open source – de código aberto)1 visando aumentar a velocidade e facilidade no desenvolvimento e atualização de aplicativos web com arquitetura SaaS (Software as a Service). O framework de código aberto, dever gerar um código reutilizável, e possuir as seguintes características: 1 - Um framework deve ser reutilizável; 2-Deve ser extensível. O framework contém funcionalidade abstrata (sem implementação) que deve ser completada; 3-Deve ser de uso seguro; 4-Deve ser eficiente; 5-Deve ser completo. Para endereçar o domínio do problema pretendido.

5.2.4.1 Além das qualidades mencionadas no item 5.2.4, o sistema será projetado de maneira a permitir a integração harmoniosa com os bancos de dados das diversas entidades que compõem o município. Esta abordagem, alinhada às diretrizes do Sistema Único e Integrado de Execução Orçamentária, Administração Financeira e Controle (SIAFIC), garante um banco de dados único e centralizado, compartilhado por todas as entidades de uma mesma unidade federativa. Esse modelo possibilita uma uniformização consistente dos dados contábeis, reforçando a qualidade da tomada de decisões. A sinergia alcançada através desse compartilhamento promove uma gestão pública mais integrada, eficiente e transparente.

5.2.5 O software poderá ser executado em um servidor de aplicativos em um Data Center de responsabilidade da contratada (ou seja, contratado e gerenciado por ela), sem a necessidade de instalar o sistema nos computadores do Município, e facilitando a rápida disseminação de novas versões do sistema e correções de erros.

5.2.6 Portanto, os softwares que compõem o sistema, objeto desta Licitação, será fornecido no modelo de “SaaS – Software as a Service”, assim como os recursos necessários para o seu perfeito funcionamento também como serviços (IaaS – Infraestrutura como serviço). Com isso, o Município não terá necessariamente que se preocupar com a aquisição de nenhum equipamento, software básico ou de banco de dados para a solução, objeto desta Licitação, e nem com a contratação em separado dos serviços técnicos especializados para manter essa infraestrutura, pois tudo estará introduzido no preço do fornecimento do sistema.

5.2.7 Podemos através desse modelo de fornecimento do software identificar vários benefícios como:

5.2.7.1 redução do custo na aquisição e composição de toda infraestrutura de hardware e software;

5.2.7.2 a infraestrutura pode ser composta sob demanda;

5.2.7.3 facilidade para adição e troca de recursos computacionais, permitindo escalar tanto em nível de recursos de hardware quanto software.

5.2.7.4 facilidade de acesso aos usuários destes serviços. Neste sentido, os usuários dos serviços não precisam conhecer aspectos de localização física e de entrega dos resultados destes serviços.

5.2.7.5 baixo custo unitário de fornecimento de todos os recursos utilizados em comparação com a aquisição de toda a infraestrutura de hardware, redundância e licenças. Os componentes básicos como armazenamento, CPUs e largura de banda de uma rede são uma “mercadoria” fornecida através de provedores especializados com um baixo custo unitário. Com tudo isso, o usuário terá acesso aos melhores recursos de infraestrutura disponíveis no mercado, e sempre atualizados.

5.2.8 O Município não precisará se preocupar com escalabilidade, pois a capacidade de armazenamento fornecido pode ser ampliada facilmente para atender demandas demais processamento e armazenamento a custos muito acessíveis.

5.2.9 O Município não irá precisar fazer investimentos iniciais em infraestrutura para armazenamento de dados, visto que os recursos físicos para o funcionamento do sistema serão responsabilidade do fornecedor. Há com isso uma garantia de evolução tecnológica dos equipamentos necessários evitando investimentos futuros e solução de continuidade. Haverá uma redução de paradas (downtime) em equipamentos, já que a infraestrutura fornecida deverá atender ao requisito de alta disponibilidade. É de responsabilidade do município fornecer equipamentos (notebook ou desktops) para que os servidores possam realizar suas atividades.

5.2.10 A gestão dessa infraestrutura será de responsabilidade do fornecedor, não exigindo mais do Município o investimento em equipamentos de servidores de banco de dados, e no seu contínuo melhoramento ou escalabilidade horizontal. Com isso o custo operacional se tornará um valor fixo, podendo haver apenas pequenas oscilações em momentos de maior utilização. A recomendação para qualquer serviço online é que tenha uma conexão estável de internet, sem perca de pacotes e nem oscilação, uma vez que o sistema funcionará 100% online.

5.2.11 Conclui-se, então, que a aplicação do conceito de gestão fiscal responsável e transparente converge para um sistema compatível com o padrão tecnológico e conceitual emanado da lei, com todas as suas exigências legais e normativas acima mencionadas, sendo assim necessariamente, integrado, único e disponível na Internet, e capaz de realizar a consolidação automática dos dados no nível municipal. Neste sentido e buscando atender plenamente essas exigências foram incluídas no Termo de Referência os requisitos funcionais e não funcionais do sistema objeto desta licitação.

### 5.3. SEGURANÇA DA INFORMAÇÃO E DISPONIBILIDADE

5.3.1. A solução deverá contar com a instalação simultânea em Data Center com padrão TIER 3 ou 4, com disponibilidade superior a 99,00%, que forneçam um ambiente seguro, controlado, com redundâncias de equipamentos N + 1 ou 2N +1), respeitando ainda as normas e diretrizes da Lei Geral de Proteção de Dados (LGPD). Monitoramento 24 (vinte e quatro) horas por dia x 7 (sete) dias por semana, para disponibilidade dos serviços web e do link.

5.3.2. O Sistema terá de possuir gerência de privilégios por função e tipo de usuários, definidos por perfis para restringir o acesso das funcionalidades através do uso de senhas criptografadas.

5.3.3. A CONTRATADA se obriga fornecer sempre que for solicitado, à CONTRATANTE, backup do banco de dados em meio magnético ou através de links criados por armazenamentos em nuvem, contendo o conteúdo dos dados de toda sua execução orçamentária e financeira.

5.3.4. As informações constantes do banco de dados serão de propriedade exclusiva do Município, não podendo ser, em nenhuma hipótese, utilizadas para outro fim que não os de interesse da contratante, sob pena de responsabilidade civil e criminal.

5.3.5. Possuir total integração entre as funções da solução, não sendo considerado como integração processos de importação e exportação de dados. A referida integração deve garantir que uma única transação executada pelo usuário desencadeie todas as ações a ela pertinentes, tornando os processos da solução totalmente integrados entre si;

5.3.6. O sistema não deverá ter limite de quantidade de usuários concorrentes e nominais.

5.3.7. A solução deve suportar um número ilimitado de usuários cadastrados, ser multiexercício, multiusuário e multiempresa ou multiunidade.

5.3.8. Não obstante, imperioso mencionar que existem no mercado algumas soluções de software para a Administração Pública que aparentemente funcionam como um sistema web, no entanto apenas fazem uma emulação (imitação) que permite operar por meio de navegadores, através da internet, um sistema desenvolvido originalmente para funcionar em desktop.

5.3.9. Essa tentativa de simular um sistema 100% web não chega a se concretizar com eficácia, tendo em vista que existem diferenças significativas entre o sistema emulado e aquele nativo web.

5.3.10. O sistema web nativo utiliza todos os protocolos de segurança e transmissão de dados da arquitetura web, podendo garantir ao usuário privacidade, segurança nas informações e maior desempenho no uso da aplicação. Para funcionamento, um sistema desenvolvido em linguagem e arquitetura nativas da web, necessita simplesmente de um serviço compilador da linguagem em que a aplicação foi desenvolvida conhecido como "Servidor Web".

5.3.11. Portanto um simples servidor, seja ele Linux ou Windows, é capaz de disponibilizar a aplicação na internet.

5.3.12. Já um sistema web emulado, além de ser originalmente desenvolvido em linguagens ultrapassadas, não utiliza os protocolos web para seu funcionamento. Este, sim, é feito a partir de um acesso remoto apenas intermediado por um navegador de internet procedimento que expõe em demasia o servidor que está fornecendo o acesso remoto, deixando os arquivos e recursos básicos vulneráveis a ataques, e, principalmente sequestro de dados. Ou seja, na prática o sistema é um “desktop”, que sofre adaptações relativamente grosseiras para funcionar sob um navegador, emulando (imitando) um sistema web.

5.3.13. Ademais, seria necessário a implementação de camadas de software que farão a comunicação entre o sistema operacional desktop e o navegador de internet. Uma dessas camadas é um software que funciona em um servidor web nativo, geralmente Linux, e um servidor de aplicação, geralmente Windows. Para a disponibilização de uma simples aplicação na web, são necessários recursos avançados de hardware e diversos softwares para que o desempenho seja o mínimo aceitável. Além de apresentar várias restrições a diversas funcionalidades necessárias, a instabilidade também é um fator de grande impacto. Isso faz com que os custos de gerenciamento e manutenção também sejam maiores.

5.3.14. Portanto, a manutenção de um sistema moderno é fundamental. E com o uso do sistema WEB nativamente integrado disponibilizado em nuvem será possível usufruir de serviços e tecnologias modernas com a necessária segurança, sem ter que realizar grandes investimentos em infraestrutura de hardware, software e pessoal.

### 5.4 CARACTERIZAÇÃO COMUM OPERACIONAL DOS SISTEMAS

5.4.1 A consistência dos dados digitados deve ser efetuada campo a campo, no momento em que são informados.

5.4.2 Assegurar a integração de dados no sistema, permitindo que a informação seja alimentada uma única vez, compartilhando os arquivos e tabelas entre suas partes: Telas, funções, sistemas.

5.4.3 Devem ser acessados com uma senha por usuário, sendo personalizados para cada tela em particular. Deve permitir que somente usuários autorizados possam executar tarefas especificando o nível de acesso para cada usuário.

5.4.4 Devem ter opção de personalização através de tela de parametrização, diferenciado por sistema e as opções estarem organizadas por assunto.

5.4.5 Deverão gerar arquivos de intercâmbio de dados para serem transmitidos automaticamente para os sistemas adotados pelo Tribunal de Contas do Estado de Minas Gerais, em especial quanto ao SICOM (todos os módulos) e ainda para a Secretaria do Tesouro Nacional e SICONFI.

5.4.6 Deverão permitir abrir mais de uma opção do menu principal simultaneamente, sem a necessidade de se fazer novo acesso ao sistema.

5.4.7 Deverão ser desenvolvidos em linguagem visual (interface gráfica) e ser totalmente integrado e compatível com qualquer Sistema Operacional, não sendo permitida emulação via terminal, exceto para ponto remoto da própria Prefeitura, fornecendo informações gerenciais em relatórios e gráficos.

5.4.8 Exibir mensagens de advertências ou mensagens de aviso de erro, informando ao usuário um determinado risco ao executar determinadas funções e/ou operações e solicitando confirmação.

5.4.9 Garantir a integridade referencial entre as diversas tabelas dos aplicativos, através do próprio aplicativo.

5.4.10 O número de usuários que acessam simultaneamente o sistema deve ser ilimitado, com gerenciador de banco de dados único, assegurando total integridade dos dados.

5.4.11 Permitir a visualização dos relatórios na tela, assim como gravação opcional dos arquivos, com possibilidade de saídas para periféricos e seleção de impressora (gráfica ou matricial) local ou da rede.

5.4.12 Permitir que os relatórios, formulários, guias, certidões e, etc. possam ser impressos em impressoras de tecnologia gráfica e/ou matricial sem a necessidade de formulários pré-impressos, exceto a nota de empenho que deverá ter o layout adaptado ao impresso próprio.

5.4.13 Permitir que todas as operações efetuadas nos dados sejam logadas (deve-se registrar o histórico – “log”) para possibilitar auditorias futuras.

5.4.14 Possibilidade de bloquear a senha de um usuário pelo Administrador do sistema.

5.4.15 Possibilidade de inclusão de mais de um usuário administrador do sistema.

5.4.16 Possuir teste de consistência dos dados de entrada (validade de datas, CPF, CNPJ, campos numéricos, saldos, lançamentos em duplicidade etc.) minimizando as possibilidades de erros cometidos pelos usuários.

5.4.17 Registrar em arquivo de auditoria todas as tentativas bem sucedidas de login, bem como os respectivos logoffs, registrando data, hora e o usuário, além de manter histórico dos acessos por usuário e função, registrando a data, hora e o nome do usuário.

5.4.18 Relatórios com a possibilidade de parametrização da impressão do cabeçalho personalizado da Administração com a identificação da Prefeitura Municipal e seu Brasão.

5.4.19 Será multiusuário, com controle de acesso e execução de atividades básicas integradas via cliente/servidor para multiusuários, sendo os módulos on-line, sem riscos de travamento, corrupção de dados ou obtenção de informações erradas.

5.4.20 Utilizar bancos de dados que permitam acesso padrão ODBC e/ou qualquer outro padrão de acesso a partir de outros utilitários, ou aplicativos como geradores de relatórios, geradores de gráfico e, etc.

5.4.21 Os sistemas via web deverão possuir interface gráfica compatível com pelo menos 2 navegadores de internet. Os relatórios devem ter opção de imprimir ou efetuar download. As sessões devem ter um tempo de inatividade apropriado para expirar (Para evitar que estranhos tenham acesso). Ter hierarquia de senhas, garantindo uma maior segurança aos dados.

## 3. 7.7.5.1.7. Exigências a serem comprovadas na Prova de Conceito para o Módulo: Contabilidade, Execução Orçamentária e Tesouraria. Instrumentos de Planejamento (PPA, LDO, LOA).

### PPA

| Exigência | Lançamento no sistema | Resultado esperado/Forma de comprovação |
|---|---|---|
| Permitir o planejamento das ações do Plano de Governo e dos recursos envolvidos para a elaboração do Orçamento Anual, Lei de Diretrizes orçamentárias e do Plano Plurianual Municipal de acordo com a Lei n.º 4.320/1964, Lei complementar n.º 101/2000 (Lei de Responsabilidade Fiscal - LRF), das portarias do Tesouro Nacional e da Secretaria de Orçamento Federal, disponibilizando a sua utilização por todas as entidades que compõe a Administração Municipal, atendendo as premissas e especificações do Sistema Único e Integrado de Execução Orçamentária, Administração Financeira e Controle – SIAFIC, nos termos e prazos do Decreto Federal nº 10.540/2020 e demais legislações pertinentes. | Mostrar as telas que comprovem a possibilidade de que as citadas leis poderão ser elaboradas e atualizadas no sistema | Demonstrar no sistema a tela de lançamentos dos programas de governo e em seguida o relatório com as informações ali mostradas. Demonstrar a tela de lançamento de previsão da receita e fixação despesa no orçamento e o relatório que mostra a compatibilidade entre os valores orçados destes. Abrir a tela de lançamentos de receitas e despesas da LDO, comprovando a possibilidade de previsão futura baseada nos últimos 3 anos. |
| Possuir ferramenta de cruzamento das metas financeiras do PPA com os valores constantes da proposta orçamentária anual que está sendo elaborada para remessa ao legislativo. Bem como possuir ferramenta de geração automática de projeto de lei de alteração do PPA para possíveis ajustes. | Mostrar as telas do sistema onde o usuário possa ver que as metas do PPA estão de acordo com a LOA Demonstrar ferramenta que possibilite geração automática do projeto de lei de alteração do PPA | Demonstrar nas próprias telas que atendem aos requisitos exigidos. |
| Emitir demonstrativos contendo as informações cadastradas no PPA elaborado, explicitando as diretrizes, os programas e as ações governamentais. | Emitir os relatórios no sistema | Demonstrar através dos relatórios as informações conforme exigência |
| Possuir ferramenta de cruzamento das metas financeiras do PPA com os valores constantes da proposta orçamentária anual que está sendo elaborada para remessa ao legislativo | Emitir relatórios confrontando os valores do PPA com a LOA | Emitir relatórios confrontando os valores do PPA com a LOA |

### LDO

| Exigência | Lançamento no sistema | Resultado esperado/Forma de comprovação |
|---|---|---|
| Emissão dos demonstrativos que compõem a LDO, juntamente com os anexos e suas memórias de cálculo. | Abrir telas que demonstrem a elaboração da LDO no sistema Emissão dos relatórios que compõe a LDO. | Abrir os relatórios exigidos no sistema, bem como os relatórios da memória de cálculo e dos anexos principais da LDO. |

Anexos exigidos na LDO Anexo de Metas Fiscais, conforme as exigências contidas nos §§ 1° e 2°, do art. 4°, da LRF, bem como possibilitar a emissão dos demonstrativos que o compõem, em valores correntes e constantes, conforme a edição mais atualizada do Manual Técnico de Demonstrativos Fiscais aprovado pela STN (Secretaria do Tesouro Nacional), para fins de consolidação da proposta da LDO. Demonstrativo I - Metas anuais, resultado primário, resultado nominal e montante da dívida pública; Demonstrativo II - Avaliação do cumprimento das metas fiscais do exercício anterior; Demonstrativo III - Metas Fiscais Atuais comparadas com as Metas Fiscais Fixadas nos três exercícios anteriores; Demonstrativo IV - Evolução do patrimônio Líquido; Demonstrativo V - Origem e aplicação dos recursos obtidos com a alienação de ativos; Demonstrativo VI - Avaliação da Situação Financeira e Atuarial do RPPS; Demonstrativo VII - Estimativa e Compensação da Renúncia de Receita Demonstrativo VIII - Margem de expansão das despesas obrigatórias de caráter continuado. Demonstrativo IX - Metas e Prioridades Demonstrativo de Riscos Fiscais e Providências, conforme versão atualizada do Manual Técnico de Demonstrativos Fiscais aprovado pela STN. Memória de cálculo dos anexos principais da LDO, conforme versão atualizada do Manual Técnico de Demonstrativos Fiscais aprovado pela STN.

### LOA

| Exigência | Lançamento no sistema | Resultado esperado/Forma de comprovação |
|---|---|---|
| Possibilitar a projeção das despesas para o ano em que se elabora a proposta orçamentária, considerando o comportamento das despesas empenhadas ou liquidadas, tomando-se por base o valor empenhado ou liquidado até determinado mês do ano em execução, e permitir a atualização do conteúdo e da estrutura da proposta gerada. | Mostrar a tela no sistema da previsão da despesa, onde o usuário possa ver a informação do valor empenhado ou liquidado do ano atual. | Mostrar no sistema a tela que possibilite o usuário ver o montante gasto até determinado período do ano atual para previsão futura. |
| Possibilitar a organização do orçamento da receita e despesa em fichas (códigos reduzidos) com os seus respectivos valores previstos. | Mostrar na tela de cadastro de receita e despesa o código reduzido | Mostrar no sistema os relatórios que comprovem. |
| Possibilitar a verificação da compatibilidade da proposta parcial da LOA com os programas e ações do PPA e com as prioridades e metas fiscais definidas na LDO, conforme exigências do inciso I, § 3°, art. 166, da CF/88 e art. 5° da LRF. | Mostrar relatórios que comprovem a compatibilidade entre as leis | Mostrar através de relatórios a compatibilidade entre as leis. |
| Controlar os lançamentos de previsão de receita e despesa por Fundos de natureza meramente contábil constantes do orçamento municipal. | Mostrar a tela que possibilita a separação do orçamento por fundos | Mostrar nos relatórios o orçamento separado por fundos |
| Permitir a elaboração da Proposta Orçamentária por Modalidade de Aplicação ou por Elementos de Despesa de acordo com a metodologia definida na LDO. | Mostrar a tela que permite a alteração da metodologia | Abrir relatório que demonstre que a alteração da metodologia ocorreu. |
| Permitir a emissão de relatórios do orçamento, conforme determina a Lei 4.320 | Emitir os relatórios no sistema | Abrir os relatórios que demonstrem o cumprimento da exigência |

Relatórios exigidos da Lei 4.320 Sumário da receita por fontes e da despesa por funções de governo, conforme determina o inciso I, do § 1°, do art. 2° da Lei n.º 4.320/1964; Anexo 1 - Demonstrativo da receita e despesa segundo as categorias econômicas, conforme determina o inciso II, do § 1°, do art. 2° da Lei n.º 4.320/1964. Anexo 2 - Demonstrativo da receita segundo as categorias econômicas e da despesa por órgãos e unidades orçamentárias e por categoria econômica, conforme determinam os incisos III e IV do § 1° do art. 2°, combinado com o art. 8°, ambos da Lei n.º 4.320/1964. Anexo 6 - Programa de Trabalho, conforme determina o inciso II, do § 2°, do art. 2° da Lei n.º 4.320/1964. Anexo 7 - Programa de Trabalho de Governo - Demonstrativo de Funções, Subfunções e Programas por Projetos e Atividades, conforme determina o inciso II, do § 2º, do art. 2° da Lei n.º 4.320/1964. Anexo 8- Demonstrativo da Despesa por Funções, Subfunções e Programas, conforme o vínculo com os recursos, de acordo com o inciso II, do § 2°, do art. 2° da Lei n.º 4.320/1964. Anexo 9 - Demonstrativo da Despesa por órgãos e Funções, conforme determina o inciso II, do § 2°, do art. 2° da Lei n.º 4.320/1964. Quadro demonstrativo do programa anual de trabalho do governo, em termos de realização de obras e de prestação de serviços, conforme determina o inciso III, do § 2°, do art. 2°, da Lei n.º 4.320/1964.

### Execução orçamentária

| Exigência | Lançamento no sistema | Resultado esperado/Forma de comprovação |
|---|---|---|
| Possibilitar o desdobramento de cada natureza de receita prevista na LOA em metas bimestrais de arrecadação, conforme determina o art. 13 da LRF. | Mostrar no sistema as telas onde se faz os lançamentos | Demonstrar a possibilidade de efetivação dos lançamentos conforme as exigências |
| Possibilitar, nos termos em que dispuser a Lei de Diretrizes Orçamentárias, o estabelecimento da programação financeira e do cronograma de execução mensal de desembolso, conforme determina o caput do art.8° da LRF. | Abrir as telas de programação financeira que permitam o lançamento mensal da programação financeira, relativo a receitas, despesas, e restos a pagar. | Mostrar os relatórios com a programação financeira |
| Possibilitar a distribuição da despesa orçamentária em cotas mensais por grupos de despesa que cada unidade orçamentária fica autorizada a utilizar, conforme a vinculação dos recursos, permitindo o remanejamento quando necessário, conforme determina o art. 47 da Lei n.º 4.320/1964. | Mostrar no sistema as telas onde se faz os lançamentos | Demonstrar a possibilidade de efetivação dos lançamentos conforme as exigências |
| Possibilitar a disponibilização de cotas para pagamento de restos a pagar, com base na disponibilidade financeira, a fim de garantir o equilíbrio das contas públicas. | Mostrar no sistema as telas onde se faz os lançamentos | Demonstrar a possibilidade de efetivação dos lançamentos conforme as exigências |
| Permitir o cadastro e a emissão de bloqueio de saldo orçamentário para realização de abertura de créditos adicionais, integrado com o sistema de Planejamento de Governo. | Fazer o lançamento do bloqueio de uma dotação no sistema | Mostrar que aquele saldo não está disponível para emissão de empenhos |
| Permitir o cadastro de remanejamento e transposição de créditos orçamentários, exigindo a informação da legislação de autorização e resguardando o histórico das alterações de valores ocorridas, de acordo com o art. 167, inciso VI da CF/88. | Fazer os devidos lançamentos no sistema | Comprovar as alterações com base em relatórios emitidos pelo próprio sistema |
| Permitir o cadastro de créditos adicionais nas modalidades de crédito suplementar, crédito especial e crédito extraordinário, com suas respectivas fontes de recursos (anulação, superávit financeiro, excesso de arrecadação ou operação de crédito), identificando o número da lei autorizativa e sua espécie (lei orçamentária ou lei específica), exigindo a informação da legislação de autorização e resguardando o histórico das alterações de valores, conforme determina a CF/88 e a Lei n.º 4.320/1964. | Fazer os lançamentos no sistema | Demonstrar nas próprias telas do sistema a possibilidade do lançamento conforme exigido |
| Permitir a visualização dos limites de créditos adicionais utilizados, exibindo mensagem ao usuário quando o limite autorizado estiver sendo ultrapassado em conformidade com a LOA, a qualquer momento, durante a execução contábil. | Fazer os lançamentos no sistema | Demonstrar nas próprias telas do sistema a possibilidade do lançamento conforme exigido |
| Permitir a alteração nos elementos de despesas quando o orçamento for elaborado por Modalidade de Aplicação. | Fazer as alterações de elementos no sistema | Demonstrar nas próprias telas do sistema a possibilidade da alteração do elemento conforme exigido |
| Possuir ferramenta para controle dos subelementos de despesas nas dotações orçamentárias, liberando ou vedando a utilização de subelementos não pertinentes à dotação. | Marcar ou desmarcar os subelementos no sistema | Demonstrar quando for empenhar que aqueles subelementos estão aparecendo ou não conforme marcação na tela própria |
| Possuir tela para cadastro de Projetos de Lei de Créditos Adicionais, permitindo o bloqueio automático das dotações que serão utilizadas para anulação de dotações durante o período de tramitação no Legislativo Municipal. | Fazer o cadastro no sistema | Demonstrar que o cadastro está bloqueando os saldos das dotações que foram lançadas |

### Contabilização Pública

| Exigência | Lançamento no sistema | Resultado esperado/Forma de comprovação |
|---|---|---|
| Permitir o fechamento e a abertura do movimento mensal da contabilidade, por meio de senhas especificas para este procedimento. | Fazer o lançamento do fechamento mensal. | Não aceitar lançamentos para meses fechados. |
| Possuir webservice para comunicação e entrega à Secretaria da Receita Federal do Brasil do EFD-REINF de acordo com os layouts específicos. | Demonstrar a tela e funcionalidades do sistema. | Demonstrar a entrega dos dados de entrega de algum cliente que utiliza o sistema. |
| Permitir a exportação de arquivo de acordo com o layout da Secretaria da Receita Federal do Brasil para importação do MIT (Módulo Inclusão de Tributos). | Fazer a exportação do arquivo | Demonstrar a entrega dos dados de entrega de algum cliente que utiliza o sistema. |
| Assegurar que as contas só recebam lançamentos contábeis no último nível de desdobramento do plano de contas utilizado e tenham controle dos atributos obrigatórios “p” e “f” e demais funcionalidades previstas no PCASP (Plano de Contas Aplicado ao Setor Público), de utilização obrigatória a todos os entes da Federação conforme portarias da STN. | Demonstrar o cadastro do Plano de Contas determinado pelo PCASP. | Demonstrar os atributos obrigatórios “p” e “f” no cadastro do Plano de Contas |
| Permitir bloqueio e desbloqueio das dotações orçamentárias. | Fazer o lançamento no sistema. | Demonstrar a dotação com saldo bloqueado para utilização. |
| Permitir controle de adiantamentos para suprimento de fundos conforme arts. 68 e 69 da Lei 4.320/64, com lançamentos automáticos no sistema de controle do PCASP. | Fazer o lançamento no sistema. | Demonstrar os lançamentos no Balancete Contábil. |
| Permitir a emissão da nota de cancelamento/estorno dos documentos de despesas extraorçamentárias | Fazer o lançamento do cancelamento/estorno. | Demonstrar os lançamentos contábeis de estorno das despesas. |
| Permitir a emissão de nota de anulação/estorno da liquidação da despesa | Fazer o lançamento da anulação da liquidação. | Demonstrar os lançamentos contábeis de estorno das despesas. |
| Permitir que na liquidação da despesa sejam reconhecidos automaticamente através de lançamentos contábeis no passivo financeiro da entidade os valores devidos aos credores. | Fazer o lançamento da liquidação da despesa. | Demonstrar os lançamentos contábeis realizados no passivo financeiro da entidade. |
| Permitir a emissão de relatórios das despesas para pagamento que demonstre o atendimento ao art. 141 da Lei Federal 14.133/21. | Imprimir o relatório. | Demonstração da ordem cronológica de exigibilidade das despesas separadas por fornecimento de bens, locações, prestação de serviços, obras e demais despesas que são exceções a essa regra. |
| Alertar no fechamento bimestral que não foram atingidas as metas bimestrais de arrecadação, disponibilizando ferramenta para bloqueio de dotações orçamentárias e emissão de decreto de limitação de empenhos. | Demonstrar ferramenta de bloqueio/desbloqueio das dotações orçamentárias, e emitir decreto de limitação de empenhos. | A impressão do decreto de limitação de empenhos. |
| Demonstrar nas telas principais do sistema os lançamentos contábeis de débito e crédito para cada lançamento realizado. | Fazer a demonstração das contas debitadas e creditadas. | Demonstração dos lançamentos utilizando o PCASP. |
| Permitir a apuração de custos diretos ou indiretos das atividades desenvolvidas pela administração por centros de custos, através de lançamentos contábeis. | Fazer um lançamento de liquidação de despesa. | Demonstrar os lançamentos nas classes 7 e 8 do PCASP. |
| Permitir a emissão de relatórios da execução orçamentária, nos moldes definidos pelas DCASP (Demonstrações contábeis aplicadas ao setor público) aprovados pela portaria da STN de nº 700 de 10/12/2014, Anexo 12 da Lei n.º 4.320/1964 (balanço orçamentário) com a possibilidade de inserção de notas explicativas | Lançamento das notas explicativas e impressão do Relatório. | Demonstração do relatório de acordo com a portaria da STN e com as notas explicativas. |
| Permitir a emissão de relatórios da execução patrimonial nos moldes definidos pelas DCASP (Demonstrações contábeis aplicadas ao setor público) aprovados pela portaria da STN de nº 700 de 10/12/2014, Anexo 14 da Lei n.º 4.320/1964 (balanço patrimonial) com a possibilidade de inserção de notas explicativas | Lançamento das notas explicativas e impressão do Relatório. | Demonstração do relatório de acordo com a portaria da STN e com as notas explicativas. |
| Permitir a emissão de relatórios da execução contábil denominado Demonstrativo dos Fluxos de Caixa, nos moldes definidos pelas DCASP (Demonstrações contábeis aplicadas ao setor público) aprovados pela portaria da STN de nº 700 de 10/12/2014, com a possibilidade de inserção de notas explicativas | Lançamento das notas explicativas e impressão do Relatório. | Demonstração do relatório de acordo com a portaria da STN e com as notas explicativas. |

### Tesouraria

| Exigência | Lançamento no sistema | Resultado esperado/Forma de comprovação |
|---|---|---|
| Possibilitar a consulta, em tempo real, dos saldos das contas bancárias por fonte de recursos na data informada pelo usuário. | Abrir o relatório com as informações | Demonstrar que o relatório tem o saldo de cada conta bancária separado por fonte de recursos. |
| Possibilitar a realização das transferências bancárias realizadas, bem como discriminar o tipo de transferência realizada, tais como, resgate e aplicação financeira, Transferência decendial saúde/educação, retenções de Ordem de Pagamento, depósitos e saques caixa, contrapartida de convênios, transferências entre contas de fontes diferentes, dentre outras. | Fazer um lançamento de transferência bancária | Mostrar quando do lançamento da transferência a possibilidade de discriminar qual tipo de transferência está ocorrendo. |
| Possibilitar controle das retenções orçamentárias por fontes de recursos, auxiliando o usuário nas transferências dos saldos das respectivas fontes para as contas apropriadas. | Mostrar relatórios com as informações | Demonstrar as informações nos relatórios e a possibilidade da transferência bancária com o tipo pretendido. |
| Permitir o cadastro de débitos e de créditos em contas correntes regulares e a regularizar para controle de conciliação bancária das contas correntes. | Fazer um lançamento para verificação da possibilidade | Demonstrar que permite o fechamento financeiro diário, inclusive de itens que estão a regularizar. |
| Permitir estorno de lançamentos contábeis. | Processar um lançamento de estorno tanto de arrecadação de receita como de pagamento de despesa no sistema | Demonstrar que houve a efetivação dos estornos e a volta dos saldos para as contas de origem. |
| Permitir o processamento diário da conciliação das contas bancárias no sistema, identificando os itens lançados pela contabilidade e não lançados pelo banco e, inserindo os itens lançados pelo banco e não lançados pela contabilidade. | Processar um lançamento de conciliação pela tela do sistema | Demonstrar que as alterações estão ajustando o saldo contábil com o saldo do extrato |
| Permitir a emissão de relatório da execução financeira diária ou mensal, com a opção de seleção da conta corrente desejada, que demonstrem a movimentação, em extrato, destas contas correntes bancárias, com as seguintes informações: código do banco, número da conta corrente bancaria, saldo anterior na conta corrente bancaria, data de cada lançamento, valores debitados, creditados e saldo resultante após cada lançamento a débito ou a crédito. | Emitir o relatório Especificado | Mostrar que cumpre os requisitos, apontando no relatório os itens especificados, conforme exigência. |
| Permitir a vinculação de naturezas de receitas a determinadas contas bancárias para evitar lançamentos errados pelos usuários. | Mostrar a tela de vinculação da receita a conta bancária | Mostrar no sistema que o mesmo inibe o usuário de lançar receitas que não estão vinculadas. |
| Permitir a geração de Ordens de Pagamento para controle das baixas de despesas com identificação do Autorizador do Pagamento, e demonstração da despesa a ser baixada; | Abrir o relatório com as especificações | Mostrar no relatório as informações exigidas. |
| Ser integrado ao sistema (módulo) recursos humanos e folha de pagamento para dar baixa automática nos empenhos emitidos por esse módulo. | Emitir empenhos diretamente do setor de RH | Demonstrar na contabilidade os empenhos emitidos pelo setor de RH |
| Ser integrado com o sistema (módulo) de tributação para baixa automática dos créditos tributários e controle dos valores devidos pelos contribuintes municipais. | Lançar os créditos e as receitas tributárias diretamente pelo setor de tributos | Demonstrar no contábil/financeiro as alterações promovidas por tais lançamentos, comprovando que atende a exigência |
| Possuir integração com os gerenciadores financeiros bancários permitindo a realização de pagamentos (transferências, pix, boletos, dentre outros) através de API, dispensando qualquer troca de arquivos. | Demonstrar o funcionamento da ferramenta e que esta possui integração em tempo real com o gerenciador financeiro de no mínimo (1) banco, permitindo a relização de pagamentos via API através de transferência, pix, boleto, dentre outros. | O sistema deverá permitir a realização de pagamentos de forma integrada e em tempo real com o sistema de no mínimo 1 (um) banco, dispensando a necessidade de qualquer troca de arquivo. |
| Permitir realizar a conciliação bancária de forma automática através de consulta integrada em tempo real com os sistemas de gerenciamento financeiros bancários. | Realizar uma consulta de extrato bancário e realizar a conciliação bancária de forma automática. | O sistema deverá permitir a consulta de extratos e a conciliação bancária de forma automática, dispensando qualquer troca de arquivos. |

## 4. 7.7.5.1.8. Exigências a serem comprovadas na Prova de Conceito para o Módulo: Portal da Transparência

| Exigência | Lançamento no sistema | Resultado esperado/Forma de comprovação |
|---|---|---|
| Possibilitar a visualização de todos os atos de despesa pública como empenho, liquidação e pagamento constando no mínimo o número do processo, classificação orçamentária, pessoa beneficiária do pagamento, processo licitatório realizado ou sua dispensa, ou inexigibilidade, o bem fornecido e o serviço prestado, e o valor da despesa. | Abrir a tela com as informações | Mostrar no site as informações exigidas conforme enunciado. |
| Possibilitar ao usuário fazer pesquisas de dados por data, beneficiário da despesa, exercício financeiro e mês dos atos praticados. | Mostrar a pesquisa no portal | Mostrar que o portal atende aos requisitos exigidos |
| Demonstrar as diárias de viagem dos servidores municipais, discriminando a data de partida, data de retorno, o nome, cargo ou função do servidor beneficiado, o objetivo da viagem, os itens de despesas com seu valor unitário e total. | Abrir as telas onde tem a informações | Demonstrar que no portal existem as diárias separadas por tópico e com todas as informações exigidas no item. |
| Demonstrar o valor das receitas orçamentárias previstas e arrecadadas, permitindo consultas por exercício, data inicial e final, natureza da receita e categoria. | Abrir a tela com as informações | Mostrar no site todas as informações conforme enunciado, e que estão de acordo com o montante arrecadado na contabilidade para o período |
| Demonstrar o valor das receitas extraorçamentárias arrecadadas discriminando a conta extra orçamentária utilizada, a conta bancária onde ocorreu o depósito, permitindo consultas por exercício e data inicial e final dos lançamentos. | Abrir a tela com as informações | Mostrar no site todas as informações conforme enunciado. |
| Demonstrar a folha de pagamento dos servidores municipais, separando os dados por mês e exercício financeiro, informando no mínimo a matrícula, o nome do servidor, data de admissão, o cargo ou função ocupada, seu vínculo com a administração, os proventos recebidos, os descontos lançados, o valor bruto e líquido da remuneração. | Mostrar a tela com as informações | Mostrar no site todas as informações conforme enunciado. |
| Permitir pesquisa agrupada da matrícula, nome do servidor, cargo, vínculo e local de trabalho dos servidores. | Abrir a tela de pesquisas no portal | Mostrar que o portal atende aos itens de pesquisa conforme exigência |
| Demonstrar a remuneração dos agentes políticos municipais, separando os dados por mês e exercício financeiro, informando no mínimo a matrícula, o nome do agente político, data de admissão, o cargo ocupado, os proventos recebidos, os descontos lançados, o valor bruto e líquido da remuneração. | Mostrar a tela com as informações | Mostrar no site todas as informações conforme enunciado. |
| Demonstrar os relatórios de Gestão fiscal do município com consulta por quadrimestre e exercício financeiro. | Abrir os relatórios no portal | Demonstrar que as informações no site estão de acordo com a contabilidade |
| Demonstrar os relatórios bimestrais de execução orçamentária, separando por exercício e bimestre. | Abrir os relatórios no portal | Demonstrar que as informações do site estão de acordo com a contabilidade |
| Demonstrar a prestação de contas do exercício após encerrado, publicando no mínimo o Balanço Orçamentário, o Balanço Financeiro, o Balanço Patrimonial, a Demonstração das Variações Patrimoniais, a Demonstração dos Fluxos de Caixa, Demonstrativo dos Devedores Diversos, Demonstrativo da Dívida Flutuante, Demonstrativo da Dívida Fundada Interna, Demonstrativo da Aplicação na Manutenção e Desenvolvimento do Ensino, Demonstrativo dos Gastos nas Ações e Serviços Públicos em Saúde, Demonstrativo das Despesas com Pessoal, Demonstrativo das Despesas com o Fundo Municipal de Desenvolvimento da Educação Básica e Valorização dos Profissionais da Educação – FUNDEB. | Abrir os relatórios no portal | Demonstrar que as informações repassadas a população estão de acordo com os balanços municipais |
| Permitir a publicação de todos os procedimentos licitatórios do município, demonstrando o número do processo, a modalidade utilizada, o objeto, a data do edital, a data de autuação, a data de adjudicação, a data de homologação, a descrição dos itens de produtos ou serviços licitados, a relação dos fornecedores participantes e o valor final da proposta selecionada, permitindo pesquisa por ano, mês de referência, número de processo licitatório ou data inicial ou final de realização do certame. | Mostrar as informações no portal | Demonstrar que todas as informações exigidas no item estão sendo repassadas para a população |
| Permitir a publicação de forma automática de todos os contratos celebrados e seus aditivos pelo município, demonstrando o número do contrato, a data de assinatura, a data de vigência inicial e final, o objeto, o valor do contrato, o nome do contratado, a descrição dos itens dos produtos ou serviços constantes do contrato, permitindo consulta por exercício, mês de referência, número do contrato ou aditivo e datas inicial e final. | Mostrar as informações no portal | Demonstrar que todas as informações exigidas no item estão sendo repassadas para a população |
| Todas as consultas devem permitir a geração de arquivos em formato eletrônico para download de forma que possibilitem ser trabalhados pelos usuários em formato de planilhas editáveis. | Mostrar na tela a possibilidade de baixar a consulta como arquivo | Mostrar que as consultas podem ser baixadas em formato de planilhas editáveis. |
| As informações orçamentárias devem ser exportadas automaticamente pelo sistema após concluídas, através de ferramenta própria de envio ou processo customizado, sem a necessidade da inserção manual de dados. | Demonstrar a exportação dos dados no sistema | Mostrar que o sistema exporta todas as informações orçamentárias para o portal |
