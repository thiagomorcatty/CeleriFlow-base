# Requisitos técnicos para POC, demonstração e aceite

## Guimarânia/MG, Rio Corrente/BA e Pintadas/BA

> Documento de trabalho elaborado a partir do edital, Termo de Referência e anexos disponibilizados. A finalidade é servir como checklist de preparação, desenvolvimento, testes e apresentação da solução da Robonuvem.

## Como usar este arquivo

- Marcar cada requisito somente após teste prático e registro de evidência.
- Para itens demonstráveis, guardar roteiro, usuário de teste, dados fictícios, captura de tela e resultado esperado.
- Para integrações ou declarações, manter também documentação técnica, layouts, logs, arquivos gerados e declaração assinada.
- Não confundir requisito de POC com obrigação posterior de implantação: Rio Corrente não prevê POC formal.

## Resumo comparativo

| Cidade | Regime de verificação | Universo técnico | Aprovação mínima | Observação crítica |
|---|---|---:|---:|---|
| Guimarânia/MG | POC formal presencial | 205 itens | 195 itens, com 100% dos 16 obrigatórios | Avaliação global; até 10 itens não obrigatórios podem ficar para customização até o fim da implantação. |
| Rio Corrente/BA | Não há POC formal | Checklist contratual de aceite | Atendimento integral do objeto contratado | Não oferecer demonstração como obrigação inexistente; preparar o checklist para implantação e eventual diligência. |
| Pintadas/BA | Demonstração formal presencial | 568 itens numerados + Transparência não numerada | 95% de cada aplicativo | A comissão pode desclassificar mesmo com 95% se entender que faltou item de grande importância. |

---

# 1. Guimarânia/MG

## 1.1 Regras da POC

- Preparar ambiente de demonstração separado de qualquer cliente em produção, com dados fictícios e compatíveis com a LGPD.
- Apresentar todas as funcionalidades da solução ofertada.
- Realização nas dependências da Prefeitura, após convocação com antecedência de cinco dias úteis.
- A Prefeitura disponibiliza link de comunicação, mobiliário e projetor; os demais equipamentos são da licitante.
- A apresentação deve ocorrer em ambiente Web, sem emulação.
- Equipamentos e operação ficam sob responsabilidade dos profissionais da licitante.
- Avaliação binária por requisito: `ATENDE` ou `NÃO ATENDE`.
- Cada requisito possui o mesmo peso.
- Aprovação: mínimo de 95% global, equivalente a **195 dos 205 itens**.
- Requisitos obrigatórios: **8 de datacenter + 8 de integrações federais**, todos obrigatoriamente atendidos.
- É possível deixar de atender no máximo 10 itens não obrigatórios; esses itens deverão ser customizados sem custo e concluídos até o término da implantação.
- A reprovação desclassifica a proposta e leva à convocação do licitante seguinte.

## 1.2 Checklist integral - 205 requisitos

### Prontuário eletrônico - 20 itens

- [ ] **G-PE-01** - Fornecimento de solução única e integrada para atendimento da estrutura geral da SMS _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-02** - Conter prontuário eletrônico único do paciente _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-03** - Prontuário para atenção básica estruturado no formato SOAP (padrão do MS), deve apresentar o prontuário visualmente estruturado para atender cada um dos grupos - Subjetivo, Objetivo, Avaliação e Plano de Tratamento. _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-04** - Cadastro de pacientes que atenda as regras de migração de pacientes para o e-sus _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-05** - Cadastro de pacientes simplificado, onde somente serão registradas informações da pessoa, incluindo os campos obrigatórios para exportação do cadastro para o e-sus _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-06** - Cadastro de família onde serão registradas todas as informações de domicílio (conforme ficha de domicílio do e-sus) e das pessoas vinculadas a ele, permitindo acessar a partir do endereço todas as pessoas que compõe a família, sem a necessidade de buscas individuais a cada pessoa. _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-07** - Gerenciamento de cadastro de pacientes, permitindo atualizar o status do cadastro, registrando óbitos, permitindo também efetuar a unificação de cadastros duplicados e a separação de cadastros unificados erroneamente. _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-08** - Recepção dos pacientes deve ser possível pesquisando por nome, cartão nacional de saúde ou CPF _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-09** - Na existência de homônimos na pesquisa do paciente o sistema deve apresentar lista contendo minimamente (nome, nome da mãe, data de nascimento) para que seja possível escolher o paciente correto para atendimento _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-10** - Quando o paciente é selecionado devem ser apresentadas as informações de endereço e unidade de vinculação para verificação dos dados antes de confirmação da recepção. _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-11** - Deve ser permitido cadastrar um novo usuário diretamente da tela de recepção, facilitando assim o processo de trabalho _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-12** - Durante a criação de um novo cadastro deve efetuar automaticamente a busca no CADSUS e caso exista o cadastro deve trazer as informações, evitando desta forma duplicidade de informações _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-13** - Em todas as telas de atendimento deve ser exibido um resumo das informações importantes do prontuário, sem a necessidade de abrir telas complementares ou efetuar qualquer tipo de pesquisa, facilitando assim o trabalho dos profissionais de saúde - este resumo deve exibir pelo menos: alertas quanto a realização de exames, cadastros do paciente em programas de atenção continuada, situação vacinas em atraso, alergias _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-14** - Deve conter ferramenta de criação de questionários que permita definir a estrutura geral dos questionários com no mínimo: - definição do tipo de campo do questionário - se é título, campo preenchido, campo calculado, mensagem, etc - definição se o campo é de preenchimento obrigatório - definição do tipo do resultado do campo - numérico, texto, múltipla escolha, etc. - definição de características do paciente para aplicação do questionário - sexo e faixa etária - definição do tipo de atendimento para aplicação do questionário - odontologia, clínico ou geral _(TR/Edital, PDF p. 31)_
- [ ] **G-PE-15** - Para questionários criados deve permitir a vinculação a uma programa de acompanhamento em saúde, bem como definir parâmetros para classificações automáticas a partir do preenchimento dos campos - sendo que estas classificações deverão ser armazenadas nos questionários e visualizadas em relatórios do sistema. _(TR/Edital, PDF p. 32)_
- [ ] **G-PE-16** - Assinatura eletrônica padrão ICP-Brasil _(TR/Edital, PDF p. 32)_
- [ ] **G-PE-17** - Permitir a assinatura dos atendimentos realizados no prontuário - com registro da assinatura na base de dados _(TR/Edital, PDF p. 32)_
- [ ] **G-PE-18** - Permitir a assinatura nos documentos impressos durante os atendimentos, sendo que os documentos impressos a partir de atendimentos de profissionais que possuam assinatura eletrônica deverão ser assinados eletronicamente e impressos com QR-Code único e exclusivo, permitindo validação - esta regra deve ser válida para todos os profissionais e não somente os médicos. _(TR/Edital, PDF p. 32)_
- [ ] **G-PE-19** - Permitir o envio de documentos assinados eletronicamente para os pacientes _(TR/Edital, PDF p. 32)_
- [ ] **G-PE-20** - Permitir que todos os documentos que forem impressos contendo assinatura eletrônica deverão ser enviados diretamente para o aplicativo do paciente, entre eles devem constar - receitas, orientações, encaminhamentos para especialista, solicitação de exames, atestados. _(TR/Edital, PDF p. 32)_

### Recepção - 7 itens

- [ ] **G-REC-01** - Deve ser possível chamar os pacientes por meio de painel de chamada - com opções de atendimento geral e prioridades _(TR/Edital, PDF p. 32)_
- [ ] **G-REC-02** - Deve ser possível registrar informações de acompanhante do paciente - com as mesmas características da recepção do paciente, permitindo inclusive cadastrar a pessoa que será acompanhante _(TR/Edital, PDF p. 32)_
- [ ] **G-REC-03** - Deve ser permitido priorizar os pacientes de síndrome gripal, idosos, gestantes e outros _(TR/Edital, PDF p. 32)_
- [ ] **G-REC-04** - Deve ser possível escolher o atendimento buscado pelo paciente e encaminhar o paciente diretamente para a fila deste atendimento _(TR/Edital, PDF p. 32)_
- [ ] **G-REC-05** - Quando selecionado Procedimento ou farmácia deve permitir o encaminhamento direto para execução, sem a necessidade de passar pela fila destas ações. Esta funcionalidade possibilita que pacientes que vem a unidade apenas para buscar medicamentos ou fazer curativos, por exemplo, possam ser recepcionados diretamente no setor, sem a necessidade de retrabalho para os profissionais. _(TR/Edital, PDF p. 32)_
- [ ] **G-REC-06** - Caso o paciente tenha pendências cadastrais (falta de cartão nacional, situação cadastral desatualizada, etc.) deve emitir alerta para o profissional _(TR/Edital, PDF p. 32)_
- [ ] **G-REC-07** - Quando o paciente é selecionado, caso existam situações de falta de informações cadastrais deve ser aberto automaticamente o cadastro para que sejam feitas as correções necessárias _(TR/Edital, PDF p. 32)_

### Fila de atendimento - 2 itens

- [ ] **G-FILA-01** - As filas de atendimento devem permitir a visualização por serviço (acolhimento, consultas, farmácia, procedimento, etc.), e também permitir a visualização por paciente. _(TR/Edital, PDF p. 32)_
- [ ] **G-FILA-02** - Nas filas de atendimento deve ser possível registrar as chamadas efetuadas ao paciente, retirar o paciente da fila e reavaliar a classificação de risco do paciente. _(TR/Edital, PDF p. 32)_

### Acolhimento do paciente - 12 itens

- [ ] **G-ACOL-01** - Deve permitir o registro de queixas do paciente usando CIAP2 - permitindo inserir múltiplos códigos do CIAP2 _(TR/Edital, PDF p. 32)_
- [ ] **G-ACOL-02** - Deve permitir o registro das informações clínicas básicas (pressão, temperatura, peso, altura, frequência cardíaca, frequência respiratória, glicemia capilar, saturação de O2, escala de coma de Glasgow _(TR/Edital, PDF p. 32)_
- [ ] **G-ACOL-03** - Deve permitir o registro da avaliação do profissional _(TR/Edital, PDF p. 33)_
- [ ] **G-ACOL-04** - Deve permitir agendar consulta médica para o mesmo dia ou para datas futuras _(TR/Edital, PDF p. 33)_
- [ ] **G-ACOL-05** - Deve permitir encaminhar diretamente para especialista (especialidades específicas como oftalmologia) _(TR/Edital, PDF p. 33)_
- [ ] **G-ACOL-06** - Deve permitir priorizar o atendimento _(TR/Edital, PDF p. 33)_
- [ ] **G-ACOL-07** - Deve permitir registrar os marcadores de consumo alimentar _(TR/Edital, PDF p. 33)_
- [ ] **G-ACOL-08** - Deve permitir registrar a ficha de síndrome neurológica (Zika/Microcefalia) _(TR/Edital, PDF p. 33)_
- [ ] **G-ACOL-09** - Deve permitir efetuar a prescrição de antitérmico _(TR/Edital, PDF p. 33)_
- [ ] **G-ACOL-10** - Deve permitir encaminhar para unidade responsável, caso o paciente seja vinculado a outra UBS _(TR/Edital, PDF p. 33)_
- [ ] **G-ACOL-11** - Deve permitir efetuar o encaminhamento para pronto atendimento _(TR/Edital, PDF p. 33)_
- [ ] **G-ACOL-12** - Deve efetuar a assinatura eletrônica do atendimento de forma automática, caso o profissional tenha feito login utilizando certificado digital _(TR/Edital, PDF p. 33)_

### Consulta - 53 itens

- [ ] **G-CON-01** - Permitir efetuar a chamada do paciente via painel de chamada _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-02** - Permitir visualizar as informações registradas na pré-consulta - dados vitais e informações clínicas inseridas pela enfermagem e também inserir estes dados, casos não seja efetuada pré-consulta _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-03** - Deve respeitar a estrutura do SOAP para organização das informações _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-04** - Permitir registrar o CIAP2 para informações Subjetivas, de Avaliação e de plano de cuidado _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-05** - Permitir ao profissional visualizar todo o histórico do paciente, contendo pelo menos: folha de rosto do prontuário no padrão do e-sus, detalhe de todas as consultas realizadas inclusive com as descrições clínicas dos atendimentos, relação de medicamentos já prescritos, encaminhamentos a outros níveis de atenção, procedimentos realizados e resultados de exames. _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-06** - Permitir a partir da visualização do histórico fazer a impressão dos atendimentos com todos os detalhes registrados no prontuário. _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-07** - Permitir registrar nas informações subjetivas: o motivo do atendimento, história clínica do paciente, procedimento realizado _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-08** - Caso o procedimento realizado tenha vinculação com programas de atenção continuada deve ser emitido alerta quanto a necessidade de cadastramento e classifiocação do paciente no programa _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-09** - Permitir registrar nas informações de avaliação: a descrição da situação clínica do paciente e os diagnósticos do paciente, podendo registrar múltiplos diagnósticos - não deve haver limite máximo para diagnósticos secundários _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-10** - Quando forem preenchidos CIAP2 o sistema deve sugerir os CIDs compatíveis par facilitar a busca por parte do profissional _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-11** - No momento do preenchimento do CID deve ser possível obrigar o preenchimento do CIAP2 para CIDs não conclusivos (Z000 e outros). _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-12** - Quando forem registrados CID de notificação obrigatória, deve ser obrigatório o preenchimento de data de início dos sintomas e deve ser impresso o cabeçalho da ficha de notificação de forma automática _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-13** - Permitir registrar as informações do plano de tratamento de forma descritiva e o CIAP2 correspondente. _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-14** - No caso de registro de caso de dengue deve abrir automaticamente a ficha de investigação específica para dengue e Chikungunya. Esta ficha deve ser impressa no padrão definido pelo MS com os campos preenchidos. _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-15** - No momento da gravação das informações do SOAP deve ser verificado automaticamente se o paciente pertence a algum programa de acompanhamento e caso as informações do programa não estejam atualizadas deve abrir a tela do programa para atualização das informações. Não deve ser necessária nenhuma ação complementar por parte do profissional para que a tela do programa seja aberta. _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-16** - No momento da gravação das informações do SOAP deve ser verificado automaticamente se o(a) paciente enquadra-se em algum indicador do programa Ministério da Saúde e apresentar, por meio de alertas e/ou abas específicas, eventuais necessidades de condutas assistências ao médico ou enfermeiro da APS, tais como: consultas de pré-natal em gestantes; realização de exames para detecção de sífilis e HIV em gestantes; consulta odontológica em gestantes; coleta de citopatológico em mulheres; situação vacinal de crianças de 1 ano contra Difteria, Tétano, Coqueluche, Hepatite B, infecções causadas por haemophilus influenzae tipo b e Poliomielite inativada; consulta e pressão arterial aferida para pacientes hipertensos; consulta e hemoglobina glicada solicitada para pacientes diabéticos. _(TR/Edital, PDF p. 33)_
- [ ] **G-CON-17** - Permitir agendar o retorno do paciente para o mesmo profissional ou agendar consulta com outro profissional da unidade, sem a necessidade de sair da tela de atendimento _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-18** - Permitir encaminhar o paciente para especialista sem a necessidade de sair da tela de atendimento, permitindo também que já seja efetuado o agendamento do paciente via central de marcação de consultas pelo profissional, sem a necessidade de encaminhar o paciente para outro profissional _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-19** - Permitir encaminhar o paciente diretamente para uma linha de cuidado especializado (equipe multiprofissional), o profissional da atenção básica deve fazer um único encaminhamento e o sistema no momento da confirmação de presença do usuário na unidade especializada deve inserir o paciente nas agendas de todos os profissionais que compõe a linha de cuidado. Sendo que estas agendas deverão ser feitas todas na mesma data, evitando assim deslocamentos desnecessários para o paciente (1 encaminhamento = N agendas no mesmo dia para profissionais diferentes que compõe a equipe multiprofissional). _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-20** - Quando o profissional possui certificado digital (assinatura eletrônica) e o paciente é encaminhado ao especialista a guia de encaminhamento deve ser impressa assinada eletronicamente, permitindo a validação do documento a partir de QR Code. _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-21** - Permitir encaminhar o paciente para pronto atendimento registrando as condições que justificam o encaminhamento e o meio de transporte a ser utilizado _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-22** - Permitir a solicitação de procedimentos, definindo prioridade do paciente na fila de espera e permitindo a pesquisa de procedimentos tanto direta na tabela, por nome quanto utilizando protocolos para solicitação de grupos de procedimentos. _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-23** - Permitir a solicitação de procedimentos utilizando protocolos deve ser possível efetuar a solicitação de todos os exames e procedimentos com apenas uma seleção, sem a necessidade de marcar cada exame/procedimento individualmente _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-24** - Permitir na solicitação de procedimentos, imprimir as guias de procedimentos separados, sendo que procedimentos coletados dentro da unidade devem ser enviados para agendamento ou realização e procedimentos externos devem ser encaminhados para a central de procedimentos para agendamento da realização _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-25** - Quando o profissional possui certificado digital (assinatura eletrônica) e o paciente tiver uma solicitação de procedimentos a guia de solicitação deve ser impressa assinada eletronicamente, permitindo a validação do documento a partir de QR Code. _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-26** - Permite efetuar a indicação de vacinas para o paciente, esta indicação deve ser realizada visualizando a carteira vacinal e as vacinas indicadas devem entrar na fila de aplicação de vacina da unidade para serem realizadas pela enfermagem. _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-27** - Permite registrar orientações ao paciente, sendo que estas orientações podem ser feitas em um texto livre e a partir da utilização de protocolos de orientações pré-definidas. _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-28** - Permite, quando forem registradas orientações a partir de protocolos deve ser possível selecionar o protocolo desejado e a partir daí editar o texto da orientação, excluindo ou incluindo informações para melhor atender a especificidade do paciente. _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-29** - Quando o profissional possui certificado digital (assinatura eletrônica) e o paciente receber uma orientação o documento de orientação deve ser impresso assinado eletronicamente, permitindo a validação do documento a partir de QR Code. _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-30** - Permite efetuar a prescrição de medicamento. Durante a prescrição, cada medicamento pertencente a farmácia básica ou a farmácia central que for prescrito deve apresentar ao profissional a quantidade disponível no estoque da unidade. _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-31** - Permite durante a prescrição de medicamentos, ser possível consultar o histórico de medicamentos já receitados para o paciente _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-32** - Permite durante a prescrição de medicamentos, ser possível selecionar se o medicamento será de uso contínuo. _(TR/Edital, PDF p. 34)_
- [ ] **G-CON-33** - Permite durante a prescrição de medicamento, ser possível utilizar protocolos par facilitar o trabalho do profissional. Quando o protocolo for selecionado deve trazer todos os medicamentos incluídos, permitindo a complementação ou retirada de itens individualmente. _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-34** - Permite durante a prescrição de medicamentos, ser possível copiar receitas anteriores do mesmo paciente _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-35** - Permite durante a prescrição de medicamentos, ser possível escolher medicamentos disponíveis em farmácias centrais (ex.: psicotrópicos) e visualizar durante a prescrição o estoque disponível nestas farmácias. _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-36** - Permite na conclusão da prescrição de medicamentos, se impressas as receitas, executando a separação entre tipos de receitas - medicamentos de receituário simples devem se impressos separados de medicamentos de receituário carbonado e ou receituário carbonados devem ser emitidos dentro do padrão exigido. _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-37** - Quando o profissional possui certificado digital (assinatura eletrônica) e o paciente receber uma prescrição de medicamento a receita deve ser impressa assinada eletronicamente, permitindo a validação da receita a partir de QR Code. _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-38** - Na prescrição de medicamentos, seja executada com utilização de certificado digital ou não, toda a pesquisa deverá ser feita pelo próprio sistema, não poderá ser utilizada ferramenta de terceiros para busca de medicamentos ou vinculação com bases externas que impliquem no fornecimento de informações dos pacientes, dos profissionais da rede municipal ou dos medicamentos prescritos. _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-39** - Permite ser possível realizar o atendimento compartilhado, onde mais de um profissional interage com o paciente, sendo que nesta situação todos os profissionais envolvidos deverão inserir seus login e senha para confirmar a participação no atendimento _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-40** - Permite ser possível encaminhar o paciente para sala de observação, efetuando a prescrição inicial para admissão _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-41** - Permite quando for efetuada prescrição para leito de observação e o profissional tiver efetuado login utilizando certificado digital o documento correspondente deverá ser impresso assinado eletronicamente, podendo ser validado a partir de QR Code. _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-42** - Permite emitir atestado médico, declaração de comparecimento e atestado de síndrome gripal, sendo que todos os documentos devem ser assinados eletronicamente sempre que o profissional tiver efetuado o login utilizando certificado digital. _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-43** - Permite sempre que emitido atestado de síndrome gripal, registrar todos os contatos domiciliares do paciente, que também deverão permanecer afastados de suas atividades. _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-44** - Permite registrar informações de histórico de saúde, sendo minimamente: informações sobre sono e rastreamento de distúrbios do sono; recordatório alimentar; atividades físicas e lazer; uso de substâncias ilícitas _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-45** - O registro das informações de histórico de saúde devem levar em conta a faixa etária do paciente, permitindo registro de informações específicas de cada faixa etária: crianças - informações sobre atividades escolares; adolescentes - medidas sócios-educativas; adultos - informações sobre sexualidade _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-46** - A consulta de enfermagem deve conter toda a Sistematização de Ações de Enfermagem (SAE), com informações sobre: percepção sensorial do paciente; humidade da pele; atividade; mobilidade; nutrição; fricção e força; informações sobre ansiedade e agitação do paciente _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-47** - Permite o registro de informações sobre alergias, sendo obrigatório o detalhamento por tipo de alergia: alergia a alimentos; alergia a animais; alergia a cosméticos; alergia a detergentes; alergia a fármacos (sempre que for registrada alguma alergia a fármaco esta informação deve ser mostrada a todo profissional no momento da prescrição de medicamentos); alergia a fungos; alergia a perfumes; alergia a plantas, alergia a pó; alergia a produtos químicos; outras alergias (descrever) _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-48** - Permite registrar informações referentes a avaliação de Pé Diabético, contendo: roteiro de inspeção; rastreamento da sensibilidade protetora plantar; rastreamento de doença arterial periférica; exame do pulso MMII (os 4 itens do exame); avaliação de deformidade dos pés; avaliação histórica de úlcera ou amputação _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-49** - Permite registrar informações referentes ao acolhimento de pessoa com deficiência, contendo: informações do cuidador; dados gerais da deficiência (tipo de deficiência, deficiência diagnosticada, qual o diagnóstico, diagnóstico de doença de base; grau de gravidade, necessidade de equipamentos/dispositivos especiais) _(TR/Edital, PDF p. 35)_
- [ ] **G-CON-50** - Permite registrar informações específicas sobre deficiência: alimentação, locomoção, transferências, vestir-se _(TR/Edital, PDF p. 36)_
- [ ] **G-CON-51** - Permite registrar informações específicas de deficiências física e mental: controle de urina, controle de fezes, comunicação verbal, comunicação gestual, comunicação cognitiva, resolução de problemas, memória _(TR/Edital, PDF p. 36)_
- [ ] **G-CON-52** - Permite registrar informações específicas de deficiência auditiva: comunicação verbal, libras, leitura labial _(TR/Edital, PDF p. 36)_
- [ ] **G-CON-53** - Permite registrar informações sobre acompanhamento domiciliar: trazendo a ficha de elegibilidade de acompanhamento domiciliar com todas as informações de condições avaliadas; conclusão da avaliação com nível de complexidade e local de acompanhamento; local de permanência e informações do cuidador _(TR/Edital, PDF p. 36)_

### Acompanhamento da saúde mental - 2 itens

- [ ] **G-SM-01** - Permite registrar informações específicas do programa de saúde mental, sendo que a classificação da gravidade do caso deve ser calculada automaticamente a partir das respostas do questionário de avaliação _(TR/Edital, PDF p. 36)_
- [ ] **G-SM-02** - Permite registrar as informações do questionário de avaliação de saúde mental contendo: sintomas relacionados aos transtornos mentais comuns; sintomas relacionados aos transtornos mentais severos e persistentes; sintomas relacionados à dependência de álcool e outras drogas; sintomas relacionados a alterações na saúde mental que se manifestam na infância e/ou na adolescência; sintomas relacionados a alterações na saúde mental que se manifestam nos idosos _(TR/Edital, PDF p. 36)_

### Acompanhamento de pacientes diabéticos - 5 itens

- [ ] **G-DIAB-01** - Permite registrar informações específicas sobre hipertensão e diabetes, contendo a classificação do paciente em: hipertenso; diabético tipo I e diabético tipo II; podendo marcar como hipertenso e diabético, mas não permitir selecionar simultaneamente os 2 tipos de diabetes _(TR/Edital, PDF p. 36)_
- [ ] **G-DIAB-02** - Permite no registro das informações de hipertensos e diabéticos estratificar o risco automaticamente a partir do preenchimento dos protocolos de avaliação da condição clínica conforme protocolo de classificação e seguindo o padrão do Caderno de Atenção Básica do Ministério da Saúde - Hipertensão arterial Sistêmica e Diabetes Melitus _(TR/Edital, PDF p. 36)_
- [ ] **G-DIAB-03** - Permite registrar informações referentes aos protocolos de avaliação clínica de hipertensos e diabéticos contendo os exames padrão do programa (glicemia capilar e plasmática, hemoglobina, creatinina, TFG, colesterol, ECG, etc.); mantendo histórico de todos os resultados e permitindo a visualização individual dos resultados históricos de cada exame _(TR/Edital, PDF p. 36)_
- [ ] **G-DIAB-04** - Permite registrar informações referentes aos protocolos de avaliação clínica de hipertensos e diabéticos contendo complicações e problemas relacionados ao programa: fatores de risco cardiovascular; lesões de órgão alvo; condições clínicas associadas; sinais e sintomas de hiperglicemia; mantendo histórico de todos os resultados e permitindo a visualização individual dos resultados históricos de cada condição registrada _(TR/Edital, PDF p. 36)_
- [ ] **G-DIAB-05** - Permite a impressão da ficha de acompanhamento do programa de hipertensão e diabetes contendo as informações específicas do programa: dados vitais e antropométricos de todos os atendimentos desde a entrada do paciente no programa; medicamentos em uso; complicação e problemas relacionados ao programa; resultados de exames relacionados ao programa _(TR/Edital, PDF p. 36)_

### Saúde da criança - 7 itens

- [ ] **G-CRI-01** - Permite registrar informações específicas sobre saúde da criança, estratificando automaticamente o risco a partir do preenchimento de questionários sobre complicações e problema, resultados de exames e intercorrências do ciclo de vida _(TR/Edital, PDF p. 36)_
- [ ] **G-CRI-02** - Permite vinculação automática com o prontuário da mãe: caso o pré-natal da mãe tenha sido registrado no prontuário todas as informações do pré-natal devem ser migradas para o prontuário da criança no momento do cadastro no programa _(TR/Edital, PDF p. 36)_
- [ ] **G-CRI-03** - Deve constar informações sobre o parto: com informações antropométricas da criança e resultados dos exames perinatais _(TR/Edital, PDF p. 37)_
- [ ] **G-CRI-04** - Deve constar informações sobre o desenvolvimento psicomotor, apresentadas de forma visual seguindo o padrão da caderneta da criança do Ministério da Saúde versão mais recente. _(TR/Edital, PDF p. 37)_
- [ ] **G-CRI-05** - Deve constar informações sobre complicações e problemas da infância: fatores relacionados ao risco biológico; fatores relacionados ao estilo de vida; fatores relacionados ao risco socioeconômico _(TR/Edital, PDF p. 37)_
- [ ] **G-CRI-06** - Deve constar informações sobre intercorrências do período neonatal, sendo minimamente: reanimação na sala de parto, asfixia, infecção, doença da membrana hialina, doença pulmonar crônica, retinopatia da prematuridade, hemorragia peri-intraventricular II a IV Grau, internação em UTI Neonatal _(TR/Edital, PDF p. 37)_
- [ ] **G-CRI-07** - Deve constar informações sobre Teste de desenvolvimento de linguagem (UTAH) com perguntas definidas por idade conforme o protocolo _(TR/Edital, PDF p. 37)_

### Saúde do adolescente - 5 itens

- [ ] **G-ADO-01** - Permite estratificar automaticamente o risco a partir do preenchimento de questionários sobre complicações e problema, resultados de exames e intercorrências do ciclo de vida _(TR/Edital, PDF p. 37)_
- [ ] **G-ADO-02** - Devem constar informações sobre complicações e problemas do desenvolvimento: fatores relacionados ao risco biológico; fatores relacionados ao estilo de vida; fatores relacionados ao risco socioeconômico _(TR/Edital, PDF p. 37)_
- [ ] **G-ADO-03** - Devem constar informações sobre desenvolvimento puberal, sendo que estas informações deverão ser apresentadas em formato visual (imagens) facilitando assim a interpretação das informações por parte dos profissionais, as imagens apresentadas devem estar relacionadas ao sexo do paciente e devem representar as fases do desenvolvimento puberal desde o infantil até o adulto. _(TR/Edital, PDF p. 37)_
- [ ] **G-ADO-04** - Devem constar informações sobre idades de ocorrência de: telarca, menarca, pubarca, espermarca (obedecendo a apresentação de informações correspondentes apenas ao sexo do paciente em atendimento) _(TR/Edital, PDF p. 37)_
- [ ] **G-ADO-05** - Devem constar informações sobre Teste de desenvolvimento de linguagem (UTAH) com perguntas definidas por idade _(TR/Edital, PDF p. 37)_

### Saúde da mulher - 16 itens

- [ ] **G-MUL-01** - Permitir a definição de situação inicial do cadastro contendo: gestante, não gestante, climatério _(TR/Edital, PDF p. 37)_
- [ ] **G-MUL-02** - Permitir o registro de informações referentes aos antecedentes obstétricos: quantidade de gestações, tipo de parto, complicações na gestação, etc. _(TR/Edital, PDF p. 37)_
- [ ] **G-MUL-03** - Deve, caso a mulher esteja classificada como não gestante permitir o registro de informações referentes ao planejamento familiar contendo: métodos anticoncepcionais em uso, registro de complicações e problemas com anticoncepcionais _(TR/Edital, PDF p. 37)_
- [ ] **G-MUL-04** - Permitir o registro de informações referentes a prevenção e controle do câncer, contendo: questionário de acompanhamento de risco de câncer ginecológico, histórico familiar e condições biológicas. _(TR/Edital, PDF p. 37)_
- [ ] **G-MUL-05** - Permitir o registro de informações referentes a prevenção e controle do câncer, contendo: risco da paciente (NIC e HPV), controle histórico de câncer de mama (BIRADS e Estado), informações do tratamento, plano de cuidado _(TR/Edital, PDF p. 37)_
- [ ] **G-MUL-06** - Permitir o registro de informações referentes ao controle e acompanhamento do câncer de colo de útero _(TR/Edital, PDF p. 37)_
- [ ] **G-MUL-07** - Permitir a solicitação de exame citopatológico de colo do útero, com preenchimento de toda a ficha de acompanhamento. _(TR/Edital, PDF p. 37)_
- [ ] **G-MUL-08** - Deverá quando a mulher estiver cadastrada como em climatério, permitir inserção de informações referentes a: atrofias, cistite bacteriana, dispareunia, distúrbios neurovegetativos, osteoporose, vulvovaginite _(TR/Edital, PDF p. 37)_
- [ ] **G-MUL-09** - Deverá quando a mulher estiver cadastrada como gestante, efetuar a estratificação automática do risco gestacional baseada em parâmetros de resultados de exames, complicações e problemas e inscrição em outros programas de atenção continuada (ex. gestante que já está cadastrada no programa de hipertensão deve entrar no programa de gestante já sendo de alto risco devido a sua hipertensão) _(TR/Edital, PDF p. 37)_
- [ ] **G-MUL-10** - Deverá quando a mulher estiver cadastrada como gestante, efetuar o registro de informações do pré-natal: data da última menstruação (cálculo automático da data provável do parto; registrar informação sobre o planejamento da gestação; registrar informação sobre tipo da gestação (única, gemelar, tripla ou mais) _(TR/Edital, PDF p. 38)_
- [ ] **G-MUL-11** - Deverá quando a mulher estiver cadastrada como gestante, efetuar o registro de informações das consultas do pré-natal: idade gestacional, peso, PA, palpação do útero, altura uterina, posição do colo, dilatação do colo, posição fetal, BCF, risco gestacional, edema, resultado da ultrassonografia _(TR/Edital, PDF p. 38)_
- [ ] **G-MUL-12** - Deverá quando a mulher estiver cadastrada como gestante, efetuar o registro de informações das intercorrências da gestação atual referentes ao trabalho, situação conjugal, situações relacionadas a saúde da gestante, tanto adquiridas no período gestacional quanto relacionadas a saúde geral da paciente que possam impactar no risco gestacional _(TR/Edital, PDF p. 38)_
- [ ] **G-MUL-13** - Deverá quando a mulher estiver cadastrada como gestante, efetuar o registro de informações dos resultados de exames do período gestacional, mantendo histórico dos mesmos a permitindo a consulta individual de cada exame com seus resultados ordenados cronologicamente: VDRL, parcial de urina, glicemia, HB, HT, coombs indireto, HBsAg IgG, HBsAg IgM, Toxoplasmose, HIV, Hepatite B, Urocultura, Urina Rotina _(TR/Edital, PDF p. 38)_
- [ ] **G-MUL-14** - Deverá quando a mulher estiver cadastrada como gestante, efetuar o registro de orientações ao companheiro _(TR/Edital, PDF p. 38)_
- [ ] **G-MUL-15** - Deverá estiver cadastrada como gestante, efetuar o registro de informações de puerpério e interrupção da gestação: sendo registrado parto devem constar - data, dias de internamento, local do parto, tipo do recém nato, peso ao nascer, comprimento, apgar 1º minuto, apgar 5º minuto, tipo de parto, patologias, malformação, classificação do recém- nato, teste da orelhinha, hipotireoidismo, fenilcetonúria, fibrose cística, anemia falciforme, teste do olhinho, teste do coração, perímetro cefálico, perímetro torácico; sendo registrado interrupção de gestação devem constar - data, dias de internação, motivo de interrupção _(TR/Edital, PDF p. 38)_
- [ ] **G-MUL-16** - Deverá quando a mulher estiver cadastrada como gestante e houver o parto, todas as informações registradas referentes ao recém-nato devem ser migradas para o prontuário da criança assim que ela for cadastrada no programa _(TR/Edital, PDF p. 38)_

### Saúde do idoso - 9 itens

- [ ] **G-IDO-01** - Deve ser realizada de forma automática a estratificação de risco baseado no índice de vulnerabilidade IVCF20 _(TR/Edital, PDF p. 38)_
- [ ] **G-IDO-02** - Devem ser registradas as informações do IVCF20: autopercepção da saúde _(TR/Edital, PDF p. 38)_
- [ ] **G-IDO-03** - Devem ser registradas as informações do IVCF20 com relação a atividades da vida diária: AVD instrumental, AVD básica _(TR/Edital, PDF p. 38)_
- [ ] **G-IDO-04** - Devem ser registradas as informações do IVCF20 com relação a situação cognitiva: cognição, humor _(TR/Edital, PDF p. 38)_
- [ ] **G-IDO-05** - Devem ser registradas as informações do IVCF20 com relação a mobilidade e força: alcance, preensão e pinça, capacidade aeróbica e muscular, marcha _(TR/Edital, PDF p. 38)_
- [ ] **G-IDO-06** - Devem ser registradas as informações do IVCF20 com relação a comunicação: visão, audição _(TR/Edital, PDF p. 38)_
- [ ] **G-IDO-07** - Devem ser registradas as informações do IVCF20 referentes a outras comorbidades: continência esfincteriana, comorbidades múltiplas _(TR/Edital, PDF p. 38)_
- [ ] **G-IDO-08** - Devem ser registradas as informações quanto a: atividades básicas e mobilidade: teste de mobilidade; quedas; repercussão da queda _(TR/Edital, PDF p. 38)_
- [ ] **G-IDO-09** - Devem ser registradas as informações quanto a testes de manutenção de condição clínica: Teste de cognição; Teste para deficiência Visual; Teste para deficiência auditiva _(TR/Edital, PDF p. 38)_

### Vacinas - 9 itens

- [ ] **G-VAC-01** - Permitir o registro das informações a partir da imagem da carteira vacinal _(TR/Edital, PDF p. 38)_
- [ ] **G-VAC-02** - Permitir tanto registro de aplicação quanto resgate de dose anterior. _(TR/Edital, PDF p. 38)_
- [ ] **G-VAC-03** - Na aplicação de vacinas deve respeitar as regras de aplicação estabelecidas pelo MS - emitindo alertas caso a aplicação esteja em desacordo com alguma destas regras. _(TR/Edital, PDF p. 38)_
- [ ] **G-VAC-04** - Deve permitir no cadastro das vacinas atualizar as regras de cada vacina, entre elas: faixa etária ideal, intervalo entre doses, tipo de aplicação, local de aplicação, estratégia de aplicação, grupo de atendimento _(TR/Edital, PDF p. 39)_
- [ ] **G-VAC-05** - Permitir inserir o número do lote e o fabricante da vacina _(TR/Edital, PDF p. 39)_
- [ ] **G-VAC-06** - Permitir inserir: estratégia de vacinação; grupo de atendimento; local de aplicação _(TR/Edital, PDF p. 39)_
- [ ] **G-VAC-07** - Calcular automaticamente a data de retorno para próxima dose seguindo as regras do PNI _(TR/Edital, PDF p. 39)_
- [ ] **G-VAC-08** - Permitir identificar pacientes faltosos em vacinas preconizadas pelo PNI. _(TR/Edital, PDF p. 39)_
- [ ] **G-VAC-09** - Permitir inserir informações de outros imunobiológicos não pertencentes a carteira de vacina _(TR/Edital, PDF p. 39)_

### Farmácia - 12 itens

- [ ] **G-FAR-01** - Ao entrar para efetuar a entrega de medicamento o sistema emita automaticamente aviso de alergia a medicamentos _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-02** - Permitir em caso de entrega de medicamento para receitas efetuadas na unidade, trazer todas as informações do paciente e dos medicamentos prescritos _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-03** - Permitir em caso de prescrição de medicamento feita fora da unidade o registro das informações do profissional prescritor, do paciente e dos medicamentos prescritos _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-04** - Permitir controlar várias farmácias dentro da mesma unidade _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-05** - Permitir registrar a informações da pessoa que efetuou a retirada caso não seja o próprio paciente _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-06** - Permitir quando selecionar um medicamento para entrega, trazer todos os lotes disponíveis no estoque da farmácia, permitindo que o profissional registre de que lotes está entregando _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-07** - Permitir no momento da entrega, efetuar o controle, garantindo que a quantidade total do medicamento seja idêntica a soma dos lotes entregues. Caso não seja idêntica não deve permitir a conclusão da entrega _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-08** - Permitir no momento da entrega, diferenciar as receitas em cores (branca, carbonada, azul, amarela), facilitando assim a visualização por parte dos profissionais _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-09** - Permitir no momento da entrega do medicamento, emitir alerta caso o medicamento já tenha sido entregue anteriormente - em intervalo menor do que o previsto para uma nova retirada _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-10** - Permitir no momento da entrega do medicamento, emitir recibo de entrega dos medicamentos para assinatura do paciente ou representante _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-11** - Permitir no momento da entrega do medicamento, caso não seja entregue integralmente a quantidade prescrita, emitir recibo de pendência de entrega para o paciente _(TR/Edital, PDF p. 39)_
- [ ] **G-FAR-12** - Permitir no momento da entrega do medicamento, visualizar todo o histórico de medicamentos do usuário _(TR/Edital, PDF p. 39)_

### Realização de procedimentos - 3 itens

- [ ] **G-PROC-01** - Permitir, caso o procedimento tenha sido prescrito em atendimento dentro da unidade já trazer as informações do paciente e do procedimento preenchidas e solicitar apenas a confirmação da execução _(TR/Edital, PDF p. 39)_
- [ ] **G-PROC-02** - Permitir, caso o procedimento tenha origem em prescrição externa, registrar a informação do profissional solicitante, dos procedimentos solicitados e dos dados clínicos do paciente. _(TR/Edital, PDF p. 39)_
- [ ] **G-PROC-03** - Permitir registrar informações sobre sua realização _(TR/Edital, PDF p. 39)_

### Odontologia - 11 itens

- [ ] **G-ODON-01** - Todos os atendimentos devem ser baseados em odontograma digital _(TR/Edital, PDF p. 39)_
- [ ] **G-ODON-02** - Permitir realizar diagnósticos diretamente nos dentes e arcada dentária, que devem ser registrados visualmente no odontograma, diferenciando por cores cada situação de forma a facilitar o trabalho dos profissionais _(TR/Edital, PDF p. 39)_
- [ ] **G-ODON-03** - Permitir acompanhar todo o tratamento pelo odontograma, todo procedimento realizado deve refletir diretamente na imagem do odontograma _(TR/Edital, PDF p. 39)_
- [ ] **G-ODON-04** - Permitir fazer o acompanhamento de toda a situação de saúde do paciente, visualizando o histórico multiprofissional _(TR/Edital, PDF p. 39)_
- [ ] **G-ODON-05** - Permitir ações em saúde bucal tanto individuais quanto coletivas que devem ser registradas durante no prontuário _(TR/Edital, PDF p. 40)_
- [ ] **G-ODON-06** - Permitir registrar informações para estratificação de risco, sendo o resultado da estratificação calculado automaticamente a partir de parâmetros definidos _(TR/Edital, PDF p. 40)_
- [ ] **G-ODON-07** - Permitir registrar a realização do procedimento de primeira consulta odontológica anual, e em caso de não registro deste procedimento para paciente que não tenha realizado ainda sua consulta anual o sistema deve informar e solicitar confirmação quanto ao não faturamento. _(TR/Edital, PDF p. 40)_
- [ ] **G-ODON-08** - Permitir registrar questionário de anamnese em saúde bucal _(TR/Edital, PDF p. 40)_
- [ ] **G-ODON-09** - Permitir registrar visualmente situações de problemas de: dentística, endodontia, periodontia _(TR/Edital, PDF p. 40)_
- [ ] **G-ODON-10** - Permitir a possibilidade de visualizar no odontograma tratamentos anteriores realizados - permitindo a seleção do período a ser apresentado _(TR/Edital, PDF p. 40)_
- [ ] **G-ODON-11** - Permitir dentro do tratamento visualizar ações já realizadas e ações pendentes de realização na mesma imagem do odontograma. _(TR/Edital, PDF p. 40)_

### Atendimentos domiciliares e coletivos - 9 itens

- [ ] **G-DOM-01** - Permitir no registro das informações de visitas domiciliares trazer automaticamente as datas de realização das visitas anteriores do paciente para acompanhamento pelo profissional _(TR/Edital, PDF p. 40)_
- [ ] **G-DOM-02** - Permitir no registro das informações de visitas domiciliares inserir informações de data e turno da visita, profissional responsável pela visita, desfecho (padrão e-sus) e todo o questionário de visita domiciliar conforme padrão e-sus: tipo de visita; busca ativa; acompanhamento; controle ambiental e vetorial; outros _(TR/Edital, PDF p. 40)_
- [ ] **G-DOM-03** - Permitir realizar, os atendimentos em grupo cadastrar grupos específicos, contendo os usuários a serem atendidos, os profissionais responsáveis pelo atendimento do grupo e acompanhar os agendamentos já realizados para o grupo _(TR/Edital, PDF p. 40)_
- [ ] **G-DOM-04** - Permitir escolher no registro de atendimentos coletivos, um grupo específico pré- cadastrado de pacientes para serem atendidos, trazendo também os profissionais que estão vinculados como responsáveis pelo grupo _(TR/Edital, PDF p. 40)_
- [ ] **G-DOM-05** - Permitir realizar no registro de atendimentos coletivos, atendimentos para pessoas que não compõe previamente algum grupo de atendimento, sendo que neste caso deve ser possível inserir a informação de cada paciente individualmente, os profissionais que realizaram o atendimento e os procedimentos realizados _(TR/Edital, PDF p. 40)_
- [ ] **G-DOM-06** - Permitir registrar no registro de atendimentos coletivos, informações básicas da atividade conforme as normas do e-sus: Qual a atividade, data da realização, total de atingidos, duração da atividade, turno, em caso de atividade realizada em escola deve exigir o preenchimento do INEP, descrição da atividade _(TR/Edital, PDF p. 40)_
- [ ] **G-DOM-07** - Permitir registrar no registro de atendimentos coletivos, informações de público-alvo; temas para a saúde e práticas em saúde, atendendo a todas as normas e opções de campos do e-sus _(TR/Edital, PDF p. 40)_
- [ ] **G-DOM-08** - Permitir registrar no registro de atendimentos coletivos, informações de usuários atingidos, contendo a lista de participantes previstos, informação se o participante efetivamente participou da atividade; em caso de avaliação antropométrica os campos de peso e altura deverão ser preenchidos; deverão ser registradas informações do programa nacional de controle de tabagismo _(TR/Edital, PDF p. 40)_
- [ ] **G-DOM-09** - Permitir no registro do atendimento em grupo, compor o histórico de atendimentos de cada um dos pacientes atendidos, constando a ação realizada, os profissionais responsáveis, a data de realização e a descrição da ação realizada _(TR/Edital, PDF p. 40)_

### Agendas - 7 itens

- [ ] **G-AGE-01** - Permitir efetuar a montagem das agendas no mínimo com os seguintes campos: profissional; procedimento; data de início; data final; dias da semana que a agenda estará disponível; horário inicial; horário final; número de pacientes; exigência de pré-consulta; se a agenda refere-se a teleatendimento _(TR/Edital, PDF p. 40)_
- [ ] **G-AGE-02** - Permitir sempre que uma agenda for criada com exigência de pré-consulta o paciente recepcionado e encaminhado para consulta deve passar previamente por atendimento de enfermagem (pré-consulta) e somente após a conclusão deste atendimento deve ser encaminhado a fila do profissional para o qual a consulta foi agendada. _(TR/Edital, PDF p. 41)_
- [ ] **G-AGE-03** - Permitir que as agendas geradas, deverão ser consultadas em formato de calendário, facilitando a visualização das vagas disponíveis e já utilizadas _(TR/Edital, PDF p. 41)_
- [ ] **G-AGE-04** - Permitir ser possível efetuar bloqueios, permitindo selecionar: profissional; o procedimento; data de início e fim; sendo que o bloqueio deverá permitir ser efetuado para o período todo ou apenas para faixas de horário específicas _(TR/Edital, PDF p. 41)_
- [ ] **G-AGE-05** - Permitir efetuar o remanejamento de agendas, sendo este remanejamento possível tanto do mesmo profissional, alterando apenas a data quanto alterando tanto data quanto profissional _(TR/Edital, PDF p. 41)_
- [ ] **G-AGE-06** - Permitir o remanejamento de pacientes e ainda permitir remanejar todos os pacientes de uma determinada agenda para outra e também remanejar individualmente cada paciente para uma nova agenda _(TR/Edital, PDF p. 41)_
- [ ] **G-AGE-07** - Permitir realizar encaixes de pacientes _(TR/Edital, PDF p. 41)_

### Datacenter - requisitos obrigatórios - 8 itens **(todos obrigatórios)**

- [ ] **G-DC-01** - Data Center com Alta Performance - 24/7 -, que atenda todos os critérios de Segurança Física (fogo, falta de energia, antifurto) e Segurança Tecnológica (anti-hackers); _(TR/Edital, PDF p. 41)_
- [ ] **G-DC-02** - Servidores (aplicativos, Internet e Banco de Dados) trabalhando com componentes que ofereçam redundância no ambiente acessado pelos usuários e também quanto às questões relativas às Seguranças Física e Tecnológica e Backups; _(TR/Edital, PDF p. 41)_
- [ ] **G-DC-03** - Firewall. _(TR/Edital, PDF p. 41)_
- [ ] **G-DC-04** - Links de comunicação de alto desempenho com Banda compatível com a demanda e com garantia de Alta Disponibilidade, capazes de disponibilizar acesso via WEB aos usuários do sistema; _(TR/Edital, PDF p. 41)_
- [ ] **G-DC-05** - O sistema deve estar em conformidade com as regras e diretrizes da LGPD (Lei Geral de Proteção de Dados Pessoais - LEI Nº 13.709, DE 14 DE AGOSTO DE 2018.) onde, haja o sigilo e a proteção aos dados armazenados; _(TR/Edital, PDF p. 41)_
- [ ] **G-DC-06** - Sistemas gerenciadores de banco de dados; _(TR/Edital, PDF p. 41)_
- [ ] **G-DC-07** - Sistemas para gerenciamento de cópias de segurança (backup’s); _(TR/Edital, PDF p. 41)_
- [ ] **G-DC-08** - Deve estar obrigatoriamente instalado no Brasil. _(TR/Edital, PDF p. 41)_

### Integrações com sistemas federais - requisitos obrigatórios - 8 itens **(todos obrigatórios)**

> O texto de vários itens admite comprovação por declaração do licitante. Como a cláusula geral da POC exige atendimento de todos os obrigatórios, preparar também evidência técnica e arquivo/layout de integração, além da declaração.

- [ ] **G-INT-01** - Deve estar Integrado aos sistemas federais: e-sus, SIA-SUS, SIH-SUS, SI-PNI, Cadsus, CNES, SIGTAP, RNDS(RIA e RIRA) _(TR/Edital, PDF p. 41)_
- [ ] **G-INT-02** - Permitir efetuar e exportação de informações de cadastros e atendimentos para a base municipal do e-sus, conforme versão 4.1.12 ou superior, usando o padrão THRIFT - Comprovar por declaração do licitante _(TR/Edital, PDF p. 41)_
- [ ] **G-INT-03** - Permitir efetuar a exportação da produção das unidades para o SIA-SUS, sendo BPA-C, BPA-I e RAAS - Comprovar por declaração do licitante _(TR/Edital, PDF p. 41)_
- [ ] **G-INT-04** - Permitir efetuar a exportação de informações no padrão SISAIH01 para faturamento hospitalar - Comprovar por declaração do licitante _(TR/Edital, PDF p. 41)_
- [ ] **G-INT-05** - Permitir efetuar a consulta a base nacional de cadastros de pessoas CADSUS de forma on- line, trazendo todas as informações registradas na base nacional, evitando assim a duplicação de cadastros - Comprovar por declaração do licitante _(TR/Edital, PDF p. 41)_
- [ ] **G-INT-06** - Permitir efetuar a importação dos arquivos do CNES para atualização de informações de unidades e profissionais. Devem ser importadas informações das unidades, dos profissionais cadastrados e das vinculações entre profissionais e unidades, garantindo assim compatibilidade de informações para a correta aplicação das críticas quando da execução de procedimentos nas unidades de saúde - Comprovar por declaração do licitante _(TR/Edital, PDF p. 41)_
- [ ] **G-INT-07** - Permitir efetuar a importação do SIGTAP, tabelas de procedimentos e diagnósticos garantindo a atualização do sistema e a correta aplicação das regras de faturamento do Ministério da Saúde - Comprovar por declaração do licitante _(TR/Edital, PDF p. 42)_
- [ ] **G-INT-08** - Permitir efetuar a exportação das vacinas do COVID diretamente para a RNDS garantindo que as informações estarão sempre atualizadas junto ao Ministério da Saúde, sendo que esta exportação deve seguir todas as regras de segurança federais. - Comprovar por declaração do licitante _(TR/Edital, PDF p. 42)_

## 1.3 Evidências recomendadas para Guimarânia

- Base fictícia contendo pacientes, famílias, profissionais, agendas, atendimentos, prescrições, estoque, vacinas e odontologia.
- Certificado digital de teste e validação de documentos com QR Code.
- Arquivos de exportação ou exemplos válidos de e-SUS APS, BPA-C, BPA-I, RAAS, SISAIH01, CNES, SIGTAP e RNDS.
- Declarações específicas exigidas para as integrações.
- Documento de arquitetura do datacenter, localização no Brasil, redundância, firewall, backups e controles LGPD.
- Impressora configurada para demonstrar receitas, guias, encaminhamentos, documentos assinados e relatórios.

---

# 2. Rio Corrente/BA

## 2.1 Situação da POC

**O edital e o Termo de Referência não instituem prova de conceito, demonstração técnica ou amostra prévia.** A verificação ocorrerá pela execução, fiscalização e aceite contratual. Portanto, os itens abaixo são requisitos técnicos do objeto e não uma POC prévia.

## 2.2 Checklist técnico para implantação, aceite e eventual diligência

- [ ] **RC-OBJ-01** - Disponibilizar solução SaaS de gestão de contratos administrativos, compras, almoxarifado e frotas. _(TR, PDF p. 6)_
- [ ] **RC-CON-01** - Controlar a execução financeira e quantitativa dos contratos. _(TR, PDF p. 7)_
- [ ] **RC-CON-02** - Controlar automaticamente os saldos contratuais disponíveis. _(TR, PDF p. 7)_
- [ ] **RC-CON-03** - Evitar aquisições superiores aos quantitativos contratados. _(TR, PDF p. 7)_
- [ ] **RC-CON-04** - Emitir eletronicamente Autorizações de Fornecimento (AF). _(TR, PDF p. 7)_
- [ ] **RC-CON-05** - Emitir eletronicamente Autorizações de Serviços (AS). _(TR, PDF p. 7)_
- [ ] **RC-CON-06** - Manter registro histórico das solicitações e autorizações emitidas. _(TR, PDF p. 7)_
- [ ] **RC-CON-07** - Dar suporte ao acompanhamento e à fiscalização da execução contratual. _(TR, PDF p. 7)_
- [ ] **RC-ALM-01** - Gerenciar entradas de materiais. _(TR, PDF p. 7)_
- [ ] **RC-ALM-02** - Gerenciar saídas de materiais. _(TR, PDF p. 7)_
- [ ] **RC-ALM-03** - Gerenciar movimentações de materiais. _(TR, PDF p. 7)_
- [ ] **RC-ALM-04** - Acompanhar os níveis de estoque. _(TR, PDF p. 7)_
- [ ] **RC-ALM-05** - Permitir inventários periódicos. _(TR, PDF p. 7)_
- [ ] **RC-ALM-06** - Assegurar a rastreabilidade dos itens armazenados. _(TR, PDF p. 7)_
- [ ] **RC-ALM-07** - Apoiar a prevenção de desperdícios, perdas e desabastecimentos. _(TR, PDF p. 7)_
- [ ] **RC-FRO-01** - Disponibilizar controle de abastecimento de frotas. _(TR, PDF p. 6)_
- [ ] **RC-SAA-01** - Manter a solução em pleno funcionamento durante toda a vigência. _(TR, PDF p. 10)_
- [ ] **RC-SAA-02** - Permitir acesso ao sistema pela internet. _(TR, PDF p. 10)_
- [ ] **RC-SAA-03** - Garantir disponibilidade, desempenho, estabilidade e segurança adequados. _(TR, PDF p. 10)_
- [ ] **RC-IMP-01** - Realizar implantação da solução. _(TR, PDF p. 10)_
- [ ] **RC-IMP-02** - Realizar parametrização e configuração inicial conforme as necessidades da contratante. _(TR, PDF p. 10)_
- [ ] **RC-SUP-01** - Disponibilizar suporte técnico aos usuários durante toda a vigência. _(TR, PDF p. 10)_
- [ ] **RC-SUP-02** - Corrigir falhas, esclarecer dúvidas e atender às solicitações técnicas. _(TR, PDF p. 10)_
- [ ] **RC-SUP-03** - Disponibilizar atualizações, correções, melhorias e novas versões sem custo adicional, quando relacionadas à solução contratada. _(TR, PDF p. 10)_
- [ ] **RC-SEG-01** - Assegurar integridade, confidencialidade e disponibilidade das informações. _(TR, PDF p. 10)_
- [ ] **RC-SEG-02** - Adotar mecanismos de segurança compatíveis com boas práticas de TI. _(TR, PDF p. 10)_
- [ ] **RC-SEG-03** - Executar rotinas de backup. _(TR, PDF p. 10)_
- [ ] **RC-SEG-04** - Possibilitar a recuperação dos dados em caso de falhas ou incidentes. _(TR, PDF p. 10)_
- [ ] **RC-LGPD-01** - Cumprir integralmente a LGPD e adotar medidas técnicas e administrativas de proteção. _(TR, PDF p. 11)_
- [ ] **RC-LGPD-02** - Manter sigilo sobre informações, documentos, dados e registros acessados. _(TR, PDF p. 11)_
- [ ] **RC-MAN-01** - Executar manutenção preventiva, corretiva e evolutiva durante a vigência. _(TR, PDF p. 11)_
- [ ] **RC-MAN-02** - Comunicar imediatamente indisponibilidades, falhas de segurança ou ocorrências que comprometam a continuidade. _(TR, PDF p. 11)_
- [ ] **RC-MAN-03** - Informar as medidas adotadas para regularização de incidentes. _(TR, PDF p. 11)_
- [ ] **RC-TRN-01** - Disponibilizar treinamento inicial aos usuários indicados, sem custo adicional. _(TR, PDF p. 11)_
- [ ] **RC-COR-01** - Reparar, corrigir, remover ou substituir falhas, erros e defeitos às próprias expensas. _(TR, PDF p. 11)_
- [ ] **RC-COR-02** - Refazer serviço recusado em até 5 dias corridos após a notificação. _(TR, PDF p. 8)_
- [ ] **RC-CONT-01** - Não interromper os serviços sem autorização prévia e garantir continuidade operacional. _(TR, PDF p. 11)_
- [ ] **RC-DADOS-01** - Ao término, entregar todos os dados em formato eletrônico compatível, sem custo adicional. _(TR, PDF p. 11)_
- [ ] **RC-DADOS-02** - Viabilizar a migração ou o uso dos dados em outra solução. _(TR, PDF p. 11)_
- [ ] **RC-EXEC-01** - Iniciar a execução imediatamente após a assinatura do contrato. _(TR, PDF p. 8)_
- [ ] **RC-EXEC-02** - Atender ao padrão de qualidade usual de mercado e às recomendações dos órgãos de normatização e fiscalização. _(TR, PDF p. 8)_

## 2.3 Pontos de atenção para Rio Corrente

- A descrição funcional é aberta e pouco detalhada; o catálogo/proposta deve declarar com precisão o que será entregue, evitando assumir funcionalidades não exigidas.
- O início é imediato após a assinatura.
- O TR menciona prestação na sede da Policlínica; confirmar operacionalmente se implantação e treinamento poderão ocorrer remotamente.
- Serviços recusados podem ter de ser refeitos em até cinco dias, sem custo.
- O aceite mensal depende da conformidade com o TR e com a proposta apresentada.

---

# 3. Pintadas/BA

## 3.1 Regras da demonstração

- Demonstrar todas as funcionalidades dos softwares nas dependências da Prefeitura, em data e horário agendados.
- Avaliação por equipe técnica formada por profissionais das áreas usuárias e de TI.
- Atendimento mínimo de **95% da totalidade dos requisitos funcionais de cada aplicativo**.
- Mesmo atingindo 95%, a comissão pode desclassificar a empresa se considerar relevante algum item não atendido.
- A falta de demonstração de um aplicativo ou o não atendimento das características mínimas provoca desclassificação automática.
- A comissão poderá fazer questionamentos e diligências.
- Hardware e software usados na demonstração são de responsabilidade da licitante.
- O equipamento poderá ficar sob diligência da Prefeitura por até três dias úteis.
- O ambiente apresentado deve ser similar ao definitivo e não pode possuir capacidade superior à arquitetura que será implantada.
- Instalar exclusivamente os softwares necessários ao funcionamento da solução.
- Softwares que gerem dúvida sobre os resultados podem levar à desclassificação.
- Não é permitido substituir a operação real por telas, slides ou vídeos.
- Não é permitido gravar código, scripts, executáveis ou bibliotecas durante ou depois da prova para complementação posterior.
- O TR proíbe o “aproveitamento de templates criados anteriormente”; por ser redação ambígua, preparar a demonstração sem depender de geração ou edição de código durante a sessão.
- Em caso de reprovação, os remanescentes podem ser convocados com prazo de dois dias corridos.

## 3.2 Critério numérico de preparação

Para controle interno, este arquivo agrupa as subseções de Contabilidade como um único aplicativo, porque integram o item contratado “Sistema Web Integrado de Contabilidade Pública”. A comissão não apresenta no TR uma memória oficial dos denominadores.

| Aplicativo | Itens numerados | Mínimo matemático de 95% | Meta interna recomendada |
|---|---:|---:|---:|
| Contabilidade Pública e subseções | 340 | 323 | 340 |
| Transparência Pública | Não numerados | Indeterminado | Atender todos os campos |
| RH e Folha | 107 | 102 | 107 |
| Portal do Servidor | 9 | 9 | 9 |
| Frotas | 40 | 38 | 40 |
| Patrimônio | 31 | 30 | 31 |
| Almoxarifado | 41 | 39 | 41 |

## 3.3 Checklist integral dos requisitos numerados

### Núcleo do Sistema Web Integrado de Contabilidade Pública - 125 itens

- [ ] **P-CTB-001** - O Sistema de Contabilidade Pública deverá ser via Web com servidor online, Banco Único de dados, usuários e acessos ilimitados. _(TR/Edital, PDF p. 23)_
- [ ] **P-CTB-002** - O Sistema de Contabilidade Pública deverá registrar todos os fatos contábeis ocorridos e possibilitar o atendimento à legislação vigente, à análise da situação da administração pública e a obtenção de informações contábeis e gerenciais necessárias à tomada de decisões; _(TR/Edital, PDF p. 23)_
- [ ] **P-CTB-003** - Possibilitar o bloqueio de módulos, rotinas e/ou tarefas do sistema, para não permitir a inclusão ou manutenção dos lançamentos, podendo ser controlado por grupo/usuário; _(TR/Edital, PDF p. 23)_
- [ ] **P-CTB-004** - Possibilitar a emissão de relatórios configuráveis, ou seja, com a possibilidade de inclusão, agrupamento e filtro de diversas colunas com seus respectivos valores e somatórios; _(TR/Edital, PDF p. 23)_
- [ ] **P-CTB-005** - Usar o empenho para comprometimento dos créditos orçamentários, a nota de lançamento ou documento equivalente definido pelo Município para a liquidação de receitas e despesas e a ordem de pagamento para a efetivação de pagamentos; _(TR/Edital, PDF p. 23)_
- [ ] **P-CTB-006** - Permitir que os empenhos globais, ordinários e estimativos possam ser anulados parcial ou totalmente; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-007** - Permitir que ao final do exercício os empenhos que apresentarem saldo possam ser inscritos em restos a pagar, de acordo com a legislação, e posteriormente liquidados ou cancelados; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-008** - Possuir ferramenta em que possam ser visualizados os empenhos com saldo a liquidar para que seja gerada automaticamente a anulação dos empenhos selecionados pelo usuário; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-009** - Possibilitar, no cadastro do empenho, a inclusão, quando cabível, de informações relativas ao processo licitatório, fonte de recursos e número do processo; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-010** - Permitir a contabilização utilizando o conceito de eventos associados a roteiros contábeis e partidas dobradas; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-011** - Utilizar calendário de encerramento contábil para os diferentes meses, para a apuração do resultado; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-012** - Efetuar a escrituração contábil nos sistemas Financeiro, Patrimonial e de Compensação em partidas dobradas e no Sistema Orçamentário em partidas simples, de conformidade com os arts. 83 a 106 da Lei 4.320/64, inclusive com registro em livro Diário; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-013** - Gerar relatórios gerenciais de Receita, Despesa, Restos a Pagar, Depósitos de Diversas Origens, Bancos e outros, de acordo com o interesse do Tribunal de Contas, bem como Boletim Financeiro Diário; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-014** - Elaborar os anexos e demonstrativos do balancete mensal e do balanço anual, na forma da Lei 4.320/64, Lei Complementar 10 1/00- LRF e Resolução do Tribunal de Contas; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-015** - Gerar os relatórios de razões analíticos de todas as contas integrantes dos Sistemas Financeiro, Patrimonial e de Compensação; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-016** - Permitir informar documentos fiscais na Ordem de Pagamento; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-017** - Possibilitar a consulta ao sistema, sem alterar o cadastro original; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-018** - Possibilitar o registro de empenhos por Estimativa, Global e Ordinário; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-019** - Possibilitar o registro de Sub-empenhos sobre o empenho Global; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-020** - Possibilitar a anulação dos empenhos por estimativa no final do exercício, visando a não inscrição em Restos a Pagar; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-021** - Possibilitar a anulação total e parcial do empenho e o cancelamento da anulação; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-022** - Possibilitar o controle do pagamento de Empenho, Restos a Pagar e Despesas Extras em contrapartida com várias Contas Pagadoras; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-023** - Possibilitar inscrever automaticamente no Sistema de Compensação dos empenhos de adiantamentos, quando da sua concessão e o lançamento de baixa respectivo, quando da prestação de contas; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-024** - Controlar o prazo de vencimento dos pagamentos de empenhos, emitindo relatórios de parcelas a vencer e vencidas, visando o controle do pagamento dos compromissos em ordem cronológica. _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-025** - Possibilitar o registro do pagamento total ou parcial da despesa e a anulação do registro de pagamento, fazendo os lançamentos necessários; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-026** - Possibilitar a inclusão de vários descontos, tanto no fluxo extra-orçamentário como no orçamentário, com registros automáticos nos sistemas orçamentário e financeiro; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-027** - Fazer os lançamentos de receita e despesa automaticamente nos Sistemas Financeiro, Orçamentário, Patrimonial e de Compensação, conforme o caso; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-028** - Efetuar o lançamento do cancelamento de restos a pagar em contrapartida com a receita orçamentária, em rubrica definida pelo usuário; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-029** - Possibilitar o controle de Restos a Pagar em contas separadas por exercício, para fins de cancelamento, quando for o caso; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-030** - Executar o encerramento do exercício, com todos os lançamentos automáticos e com a apuração do resultado; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-031** - Possuir rotina para pagamento das despesas, com a possibilidade de efetuar a baixa no momento do pagamento ao fornecedor; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-032** - Emitir Notas de Pagamento, de Despesa Extra, de Empenhos e de Sub-empenhos; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-033** - Emitir Ordens de Pagamento de Restos a Pagar, Despesa Extra e de Empenho; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-034** - Possibilitar a consolidação dos balancetes financeiro das autarquias juntamente com o balancete financeiro da prefeitura; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-035** - Permitir a geração automática de empenhos, liquidações, pagamentos orçamentários e de restos à pagar, referente às prestações de contas da Prefeitura, por meio de importação de arquivos; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-036** - Cadastrar e controlar os Créditos Suplementares e as anulações de dotações; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-037** - Registrar empenho global, por estimativa, ordinário e sub-empenho; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-038** - Registrar anulação parcial ou total de empenho; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-039** - Registrar bloqueio e desbloqueio de dotações; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-040** - Possibilitar iniciar os movimentos contábeis no novo exercício mesmo que o anterior ainda não esteja encerrado, possibilitando a atualização automática dos saldos contábeis no exercício já iniciado. _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-041** - Emitir Notas de Empenho, Sub-empenhos, Liquidação, Ordens de Pagamento, Restos a pagar, Despesa extra e suas respectivas notas de anulação, possibilitando sua emissão por intervalo e/ou aleatoriamente; _(TR/Edital, PDF p. 24)_
- [ ] **P-CTB-042** - Permitir a anulação total e parcial do empenho, ordens de pagamento, nota de despesa extra-orçamentária e o cancelamento da anulação, possibilitando auditoria destas operações. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-043** - Possibilitar que cada unidade orçamentária processe o respectivo empenho; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-044** - Possibilitar o controle de despesa por tipo relacionado ao elemento de despesa, permitindo a emissão de relatórios das despesas por tipo; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-045** - Permitir o cadastramento de fonte de recurso com identificador de uso, grupo, especificação e detalhamento, conforme Portaria da STN ou Tribunal de Contas dos Municípios. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-046** - Cadastrar e controlar as dotações constantes no Orçamento do Município e as decorrentes de Créditos Adicionais Especiais e Extraordinários; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-047** - Permitir que nas alterações orçamentárias possa adicionar diversas dotações e subtrair de diversas fontes para um mesmo decreto; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-048** - Registrar bloqueio e desbloqueio de valores nas dotações, inclusive com indicação de tipo cotas mensais e limitação de empenhos; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-049** - Elaborar demonstrativo do excesso de arrecadação e do excesso de arrecadação pela tendência do exercício, e com possibilidade de emissão consolidada, e agrupando por recurso. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-050** - Controlar as dotações orçamentárias, impossibilitando a utilização de dotações com saldo insuficiente para comportar a despesa; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-051** - Emitir as planilhas que formam o Quadro de Detalhamento da Despesa; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-052** - Gerar relatórios gerenciais de execução da despesa, por credores, por classificação, por período de tempo e outros de interesse do Município; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-053** - Gerar relatórios de saldos disponíveis de dotações, de saldos de empenhos globais e outros de interesse do Município; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-054** - Efetuar o controle automático dos saldos das contas, apontando eventuais estouros de saldos, ou lançamentos indevidos; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-055** - Efetuar o acompanhamento do cronograma de desembolso das despesas para limitação de empenho, conforme o artigo 9º da Lei 101/00 - LRF, de 4 de maio de 2000; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-056** - Possuir relatório para acompanhamento das metas de arrecadação, conforme o artigo 13 da Lei 101/00 - LRF de 4 de maio de 2000; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-057** - Possuir processo de encerramento mensal, que verifique eventuais divergências de saldos, e que após o encerramento não possibilite alterações em lançamentos contábeis já efetuados. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-058** - Possuir cadastros de Convênios e Prestação de Contas de Convênio, Contratos e Caução; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-059** - Emitir relatórios demonstrativos dos gastos com Educação, Saúde e Pessoal, com base nas configurações efetuadas nas despesas e nos empenhos. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-060** - Emitir os relatórios das Contas Públicas para publicação, conforme IN 28/99 do TCU e Portaria 275/00; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-061** - Emitir relatórios de Pagamentos Efetuados, Razão da Receita, Pagamentos em Ordem Cronológica, Livro Diário, Extrato do Credor, Demonstrativo Mensal dos Restos a Pagar, Relação de Restos a Pagar e de Cheques Compensados e Não Compensados; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-062** - Possibilitar que os precatórios sejam relacionados com a despesa destinada ao seu pagamento. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-063** - Permitir gerar arquivos para o sistema do Tribunal de Contas dos Municípios referente aos atos administrativos, dados contabilizados, dados financeiros e dados do orçamento; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-064** - Gerar relatório para conferência de inconsistências a serem corrigidas no sistema antes de gerar os arquivos para os Tribunais de Contas. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-065** - Emitir relatórios com as informações para o SIOPS, no mesmo formato desse; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-066** - Emitir relatórios com as informações para o SIOPE, no mesmo formato desse; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-067** - Gerar os arquivos conforme o MANAD - Manual Normativo de Arquivos Digitais para a Secretaria da Receita da Previdência. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-068** - Permitir o cadastramento de devolução de receita utilizando rubricas redutoras conforme Manual de Procedimentos da Receita Pública da STN. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-069** - Permitir a contabilização do regime próprio de previdência em conformidade com a Portaria 916 do ministério de previdência, com emissão dos respectivos demonstrativos. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-070** - Possibilitar a emissão de relatório com as deduções para o Imposto de Renda. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-071** - Possibilitar a emissão de gráficos comparativos entre a receita prevista e arrecadada e a despesa fixada e realizada. _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-072** - Gerar o relatório resumido de execução orçamentária e relatório de gestão fiscal; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-073** - O Sistema deverá ter permissivo e habilidade de o Gestor avaliar e certificar os relatórios e documentos de forma online, assinando digitalmente; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-074** - O Sistema de contabilidade deverá possuir sistema integrado de licitações, contratações diretas (dispensas e inexigibilidades) e convênios, bem como os contratos administrativos para a contribuir e otimizar com os processos de pagamento contábeis; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-075** - O sistema de contabilidade deverá oferecer customização, de forma que o usuário do sistema na Gestão poderá “configurar” a sua área de trabalho dentro do software, para melhor utilização das ferramentas conforme a sua necessidade; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-076** - O Sistema deve, conforme os dados alimentados, gerar informações suficientes para reproduzir um modelo padrão de relatório para audiências públicas, sendo facultativo o uso desse pelo Poder Público; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-077** - Disponibilidade de minuta do relatório de controle interno; _(TR/Edital, PDF p. 25)_
- [ ] **P-CTB-078** - Permitir exportação dos dados para o SIOPS; _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-079** - Permitir exportação dos dados para o SIOPE; _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-080** - O sistema deverá funcionar on-line sem a necessidade de instalação, inclusive ser portável para os aparelhos moveis (celulares e tablets). _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-081** - Permitir consulta dos dados do CNPJ para cadastro das informações diretamente da tela de Credores, facilitando assim o cadastro das informações. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-082** - Permitir integração direta com as peças orçamentárias PPA, LDO e LOA, juntamente com a execução contábil, sendo também em banco integrado, dando a praticidade na comunicação dos dados entre eles. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-083** - Controle de saldo de contratos na execução dos empenhos relacionados, não permitindo assim que ultrapasse o valor contratado. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-084** - Permitir exportação do SIGA TCM-BA dos dados Contábeis, Contratos, Licitações, Dispensas, Inexigibilidade e Convênios. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-085** - Permitir disponibilidade imediata on-line de forma instantânea dos dados da 131 (Receita, Despesa e Diárias). _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-086** - Permitir a abertura automática do exercício, conforme o IPC. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-087** - Permitir emissão de relatório de extrato de Contrato. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-088** - Permitir emissão de relatório de extrato de Credor. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-089** - Permitir emissão de relatório de extrato de Empenho. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-090** - Permitir emissão de relatório de Audiência Pública. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-091** - Permitir emissão de Razão por Órgãos. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-092** - Permitir emissão de Razão acumulado. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-093** - Permitir emissão de Razão analítico acumulado. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-094** - Permitir controle de saldos das contas extras. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-095** - Permitir bloqueio de dotação em decretos. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-096** - Permitir cadastro de feriados municipais. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-097** - Permitir bloqueio de movimentações em fim de semanas e feriados, com a possibilidade de inclusão de períodos específicos conforme a necessidade da entidade. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-098** - Permitir controle de retenções por fonte de recursos. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-099** - Permitir cadastro de centro de custo. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-100** - Permitir impressão de usuário de cadastro no rodapé nas notas de empenho, liquidação e pagamento, assegurando rastreabilidade das informações _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-101** - Permitir geração de Matriz dos saldos Contábeis para Siconfi. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-102** - Permitir a geração de relatório para conferência da Matriz dos saldos contábeis, garantindo maior controle e transparência das informações. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-103** - Permitir cadastro e controle da divida fundada. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-104** - Permitir lançamento do reconhecimento da receita. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-105** - Permitir pagamento em lote das liquidações. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-106** - Permitir bloqueio do fundamento. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-107** - Permitir a importação pré-empenho. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-108** - Permitir exportação dos dados da EFD-REINF. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-109** - Permitir exportação dos dados do Relatório Resumido da Execução Orçamentária; _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-110** - Permitir exportação dos dados do Relatório da Gestão Fiscal. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-111** - Permitir exportação dos dados da DCA - Declaração das contas Anuais. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-112** - Permitir a exibição de uma tela dedicada para apresentação das informações relacionadas às atualizações realizadas nos sistemas. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-113** - Permitir aos usuários a opção de receber ou não notificações sobre integrações e atualizações do sistema. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-114** - Permitir cadastro de configurações pessoais do usuário. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-115** - Permitir geração de razão apenas das contas analíticas _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-116** - Permitir geração de razão por nível. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-117** - Permitir a integração de notas fiscais diretamente pelo sistema de Almoxarifado, facilitando o controle e o registro de movimentações. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-118** - Permitir visualização de acompanhamento dos contratos a vencer, vencidos, bem como dos saldos dos contratos ativos. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-119** - Permitir o salvamento de múltiplos filtros personalizados para relatórios, facilitando o acesso e a reutilização de configurações específicas. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-120** - O sistema deve possuir recursos de criptografia para os dados armazenados em banco de dados que necessitem de segurança. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-121** - O sistema deve permitir realizar bloqueio de acesso dos usuários manualmente pelo administrador do sistema. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-122** - O sistema deve permitir configurar no perfil do usuário quando o mesmo puder ter acesso a informações confidenciais. _(TR/Edital, PDF p. 26)_
- [ ] **P-CTB-123** - O sistema deve possuir um cadastro de usuários com e-mail, fotografia, definição do limite de expiração de acesso, troca de senha a cada numero de dias e controle de permissão para acesso externo. _(TR/Edital, PDF p. 27)_
- [ ] **P-CTB-124** - O sistema deve permitir a associação de um usuário a um ou mais grupos de acesso, aplicando permissões e restrições de segurança de forma acumulativa, conforme as configurações definidas para cada grupo. _(TR/Edital, PDF p. 27)_
- [ ] **P-CTB-125** - O sistema deve possuir um modo de segurança, que permita definir as permissões de acesso aos relatórios do sistema. _(TR/Edital, PDF p. 27)_

### Aplicativo móvel da Contabilidade - 25 itens

- [ ] **P-APP-01** - Permitir acesso ao sistema nas versões mobile para Android e IOS, garantindo acesso completo às funcionalidades de consulta e gestão de dados de forma prática e eficiente, em qualquer lugar e a qualquer momento. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-02** - Permitir a ordenação dos itens selecionados por valor ou por nome nas diversas áreas do aplicativo, facilitando a análise e a organização dos dados de forma personalizada. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-03** - Permitir a visualização das fases das despesas por órgãos, com filtros avançados por competência e ano, proporcionando um controle detalhado e preciso das despesas de cada órgão. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-04** - Permitir a visualização das despesas por meio de gráficos interativos, com filtros dinâmicos das fases das despesas, facilitando a interpretação e a análise dos dados financeiros. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-05** - Permitir a visualização de gráficos interativos nos itens de despesa e receita, proporcionando uma análise visual e dinâmica dos dados financeiros, facilitando a compreensão e a interpretação das informações. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-06** - Permitir a rápida alternância na visualização dos gráficos entre os formatos de barras e pizza, permitindo uma análise flexível e eficiente dos dados financeiros. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-07** - Permitir a visualização das receitas arrecadadas por órgãos, com filtros específicos de competência e ano, proporcionando uma visão clara e detalhada das receitas por órgão. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-08** - Permitir a alternância rápida entre a visualização das receitas arrecadadas no mês e no ano, facilitando a análise comparativa de períodos. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-09** - Permitir a visualização das receitas por credores, com a possibilidade de filtrar os dados por mês e ano, permitindo o acompanhamento detalhado das obrigações. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-10** - Permitir a visualização do saldo bancário por mês e por órgão, possibilitando o controle preciso da disponibilidade financeira. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-11** - Permitir a visualização consolidada do saldo bancário, facilitando a análise global dos recursos financeiros. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-12** - Permitir a alternância rápida na visualização do saldo bancário entre as diferentes categorias, como conta corrente, aplicação e saldo geral, oferecendo uma análise detalhada da movimentação bancária. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-13** - Permitir a visualização do saldo contábil. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-14** - Permitir a visualização das transferências concedidas entre órgãos, oferecendo uma visão detalhada dos repasses realizados. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-15** - Permitir a alternância rápida na visualização das transferências concedidas, com filtros para exibir os dados efetuados no mês ou no ano, proporcionando uma análise detalhada e comparativa. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-16** - Permitir a visualização das transferências recebidas por órgãos, possibilitando o controle dos repasses recebidos. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-17** - Permitir a alternância rápida na visualização das transferências recebidas, com filtros para exibir as transações realizadas no mês ou no ano. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-18** - Permitir a visualização dos resumos das alterações orçamentárias por mês e ano, oferecendo um controle preciso sobre as modificações no orçamento. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-19** - Permitir a visualização das fases das despesas por unidades orçamentárias, com filtros avançados de competência e ano, permitindo o controle detalhado das despesas por unidade. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-20** - Permitir a visualização das despesas por relação de fornecedor, oferecendo um controle detalhado sobre os fornecedores e seus respectivos custos. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-21** - Permitir a visualização das despesas por mês e ano de cada fornecedor. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-22** - Permitir a visualização das despesas por categoria de despesa, facilitando o controle orçamentário por tipo de gasto. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-23** - Permitir a visualização do resumo dos restos a pagar processados, com filtros para exibição por mês e ano, proporcionando uma visão detalhada das obrigações pendentes. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-24** - Permitir a visualização do resumo dos restos a pagar não processados, com filtros para exibição por mês e ano, possibilitando o acompanhamento das pendências financeiras. _(TR/Edital, PDF p. 27)_
- [ ] **P-APP-25** - Permitir a visualização do resumo da execução orçamentária por mês e ano, oferecendo uma visão clara sobre a execução das despesas e receitas ao longo do período. _(TR/Edital, PDF p. 27)_

### Business Intelligence - requisitos gerais - 9 itens

- [ ] **P-BI-01** - Permitir a remoção de todos os filtros aplicados simultaneamente em uma única operação _(TR/Edital, PDF p. 27)_
- [ ] **P-BI-02** - Permitir a limpeza seletiva dos filtros aplicados. _(TR/Edital, PDF p. 28)_
- [ ] **P-BI-03** - Permitir inverter a seleção de um filtro, ou de um conjunto de filtros, para os filtros excluídos. _(TR/Edital, PDF p. 28)_
- [ ] **P-BI-04** - Permitir imprimir os gráficos e tabelas extraídos em formato Html. _(TR/Edital, PDF p. 28)_
- [ ] **P-BI-05** - Permitir exportar os dados dos gráficos e tabelas para o formato Xls. _(TR/Edital, PDF p. 28)_
- [ ] **P-BI-06** - Permitir a rápida alternância da visualização de gráficos entre os formatos de barras, pizza e linha, facilitando a análise e interpretação dos dados. _(TR/Edital, PDF p. 28)_
- [ ] **P-BI-07** - Permitir realizar busca associativa, proporcionando respostas rápidas por todas as tabelas de negócio relacionadas aos gráficos apresentados. _(TR/Edital, PDF p. 28)_
- [ ] **P-BI-08** - Permitir a consolidação dos dados de diversas fontes de dados dentro do escopo do negócio, inclusive de formatos diferentes, em uma única visão de acordo os gráficos apresentados. _(TR/Edital, PDF p. 28)_
- [ ] **P-BI-09** - Permitir aplicar filtros de dimensões de forma interativa por todos os dados consolidados em diversas abas de uma visão. _(TR/Edital, PDF p. 28)_

### BI de Contabilidade e Planejamento Orçamentário - 46 itens

- [ ] **P-BICTB-01** - Possuir gráfico que demonstre o orçamento da receita por tipo de administração. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-02** - Possuir gráfico que demonstre o valor do orçamento da receita por órgão. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-03** - Possuir gráfico que demonstre o valor do orçamento da receita por categoria da receita. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-04** - Possuir gráfico que demonstre o valor do orçamento da receita por espécie da receita. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-05** - Possuir gráfico que demonstre o valor do orçamento da receita por origem da receita. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-06** - Possuir gráfico que demonstre o valor do orçamento da receita por rubrica da receita. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-07** - Possuir gráfico que demonstre o valor do orçamento da receita por fonte de recursos. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-08** - Possuir gráfico que demonstra a evolução do valor total do orçamento da receita por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-09** - Possuir gráfico que demonstre o valor do orçamento da despesa por tipo de administração. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-10** - Possuir gráfico que demonstre o valor do orçamento da despesa por tipo de orçamento. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-11** - Possuir gráfico que demonstre o valor do orçamento da despesa por tipo de órgão. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-12** - Possuir gráfico que demonstre o valor do orçamento da despesa por órgão. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-13** - Possuir gráfico que demonstre o valor do orçamento da despesa por unidade. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-14** - Possuir gráfico que demonstre o valor do orçamento da despesa por função. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-15** - Possuir gráfico que demonstre o valor do orçamento da despesa por subfunção. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-16** - Possuir gráfico que demonstre o valor do orçamento da despesa por programa. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-17** - Possuir gráfico que demonstre o valor do orçamento da despesa por tipo de ação. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-18** - Possuir gráfico que demonstre o valor do orçamento da despesa por ação. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-19** - Possuir gráfico que demonstre o valor do orçamento da despesa por categoria da despesa. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-20** - Possuir gráfico que demonstre o valor do orçamento da despesa por natureza da despesa. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-21** - Possuir gráfico que demonstre o valor do orçamento da despesa por modalidade da despesa. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-22** - Possuir gráfico que demonstre o valor do orçamento da despesa por elemento. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-23** - Possuir gráfico que demonstra a evolução do valor total do orçamento da despesa por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-24** - Possuir gráfico que demonstra a evolução entre os valores da receita prevista por órgãos e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-25** - Possuir gráfico comparativo que demonstra a evolução entre os valores da receita prevista por tipo de administração e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-26** - Possuir gráfico comparativo que demonstra a evolução entre os valores da receita prevista por categoria da receita e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-27** - Possuir gráfico comparativo que demonstra a evolução entre os valores da receita prevista pela origem da receita e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-28** - Possuir gráfico comparativo que demonstra a evolução entre os valores da receita prevista por rubrica e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-29** - Possuir gráfico comparativo que demonstra a evolução entre os valores da receita prevista por fonte de recursos e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-30** - Possuir gráfico comparativo que demonstra a evolução entre os valores da despesa fixada por órgãos e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-31** - Possuir gráfico comparativo que demonstra a evolução entre os valores da despesa fixada por tipo de orçamento e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-32** - Possuir gráfico comparativo que demonstra a evolução entre os valores da despesa fixada por operação e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-33** - Possuir gráfico comparativo que demonstra a evolução entre os valores da despesa fixada por categoria da despesa e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-34** - Possuir gráfico comparativo que demonstra a evolução entre os valores da despesa fixada por natureza da despesa e por ano. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-35** - Possuir gráfico que demonstra o valor da receita arrecadada por banco. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-36** - Possuir gráfico que demonstra o valor da receita arrecadada por conta pagadora. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-37** - Possuir gráfico que demonstra o valor da receita arrecadada por fonte. _(TR/Edital, PDF p. 28)_
- [ ] **P-BICTB-38** - Possuir gráfico que demonstra o valor da receita arrecadada por órgão. _(TR/Edital, PDF p. 29)_
- [ ] **P-BICTB-39** - Possuir gráfico que demonstra o valor da receita arrecadada por categoria da receita. _(TR/Edital, PDF p. 29)_
- [ ] **P-BICTB-40** - Possuir gráfico que demonstra o valor da receita arrecadada por origem da receita. _(TR/Edital, PDF p. 29)_
- [ ] **P-BICTB-41** - Possuir gráfico que demonstra o valor da receita arrecadada por rubrica. _(TR/Edital, PDF p. 29)_
- [ ] **P-BICTB-42** - Possuir gráfico que demonstra a evolução do valor da receita arrecadada por ano. _(TR/Edital, PDF p. 29)_
- [ ] **P-BICTB-43** - Possuir gráfico que compara o valor da receita prevista versus o valor da receita arrecadada por órgão. _(TR/Edital, PDF p. 29)_
- [ ] **P-BICTB-44** - Possuir gráfico que compara o valor da receita prevista versus o valor da receita arrecadada por categoria da receita. _(TR/Edital, PDF p. 29)_
- [ ] **P-BICTB-45** - Possuir gráfico que compara o valor da receita prevista versus o valor da receita arrecadada por origem da receita. _(TR/Edital, PDF p. 29)_
- [ ] **P-BICTB-46** - Possuir gráfico que compara o valor da receita prevista versus o valor da receita arrecadada por rubrica. _(TR/Edital, PDF p. 29)_

### Atendimento ao Decreto Federal nº 10.540/2020 - SIAFIC - 9 itens

- [ ] **P-SIAFIC-01** - O Software de Contabilidade Pública deverá ter banco de dados único para todos os órgãos de origem (Prefeitura/Prefeitura/Autarquias); _(TR/Edital, PDF p. 29)_
- [ ] **P-SIAFIC-02** - O Software de Contabilidade Pública deverá ter o mesmo ambiente virtual independente do órgão de origem (Prefeitura/Prefeitura/Autarquias); _(TR/Edital, PDF p. 29)_
- [ ] **P-SIAFIC-03** - O Software deverá permitir o compartilhamento de arquivos de dados e informações de uso comum (Sistemas estruturantes); _(TR/Edital, PDF p. 29)_
- [ ] **P-SIAFIC-04** - O Software deverá obrigar a criação de usuário com indicação do CPF; _(TR/Edital, PDF p. 29)_
- [ ] **P-SIAFIC-05** - O Software deverá manter LOG de Auditoria das alterações efetuadas pelos usuários, registrando o nome do usuário, a data, a hora, os dados anteriores e os dados alterados, permitindo a sua consulta e impressão para auditoria; _(TR/Edital, PDF p. 29)_
- [ ] **P-SIAFIC-06** - O Software deverá possuir um controle da concessão e da revogação de usuários do sistema; _(TR/Edital, PDF p. 29)_
- [ ] **P-SIAFIC-07** - O Software deverá indicar o desenvolvedor do sistema; _(TR/Edital, PDF p. 29)_
- [ ] **P-SIAFIC-08** - O Software deverá registrar toda operação efetuada no banco de dados; _(TR/Edital, PDF p. 29)_
- [ ] **P-SIAFIC-09** - O Software deverá efetuar backup diário automático da base de dados; MÓDULO ORÇAMENTÁRIO _(TR/Edital, PDF p. 29)_

### Lei de Diretrizes Orçamentárias - LDO - 15 itens

- [ ] **P-LDO-01** - Permitir o cadastramento de ações. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-02** - Permitir o cadastramento de programas. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-03** - Permitir o cadastramento da lei. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-04** - Permitir o planejamento estratégico, estabelecendo as diretrizes, os objetivos e as metas da administração pública ano a ano que deverá constar na Lei Orçamentária Anual (LOA). _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-05** - Permitir a seleção dos programas incluídos no PPA, aqueles que terão prioridade na execução do orçamento subsequente. Observando que o mesmo também está totalmente adaptado à novas situações do artigo 165 da Constituição Federal, Decreto 2829/98 e das Portarias Interministeriais 42/99, 163/01 e 219/04. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-06** - Permitir a inserção de metas e indicação de prioridades. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-07** - Orientar a elaboração da LOA. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-08** - Permitir o lançamento de receitas. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-09** - Permitir o lançamento de despesas. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-10** - Permitir o lançamento de dívida consolidada. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-11** - Permitir o lançamento de renúncias. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-12** - Permitir o lançamento de projeção atuarial da RPPS. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-13** - Permitir o lançamento de margem de expansão. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-14** - Permitir a descrição das ações, como também a definição do produto, base legal e das metas físicas e financeiras pretendidas para o ano que está sendo elaborado. _(TR/Edital, PDF p. 29)_
- [ ] **P-LDO-15** - Emitir os anexos e relatórios que integrarão a Lei de Diretrizes Orçamentárias: a) - Capa; b) - Projeto de lei; c) - Prioridades e metas; d) - Memória de cálculo; e) - Metas anuais; f) - Metas fiscais; g) - Metas e ações por programa; h) - Metas e ações por função; e i) - Margem de expansão da despesa; _(TR/Edital, PDF p. 29)_

### Lei Orçamentária Anual - LOA - 16 itens

- [ ] **P-LOA-01** - Permitir cadastrar as informações sobre a lei autorizativa da LOA. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-02** - Permitir cadastrar os poderes. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-03** - Permitir cadastrar os Órgãos. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-04** - Permitir cadastrar as secretarias. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-05** - Permitir cadastrar as unidades orçamentárias. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-06** - Permitir cadastrar os centros de custos. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-07** - Permitir cadastrar as funções e subfunções. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-08** - Permitir cadastrar os programas. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-09** - Permitir cadastrar as ações. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-10** - Permitir cadastrar as rubricas de receitas. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-11** - Permitir cadastrar as fontes de recursos. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-12** - Permitir cadastrar os elementos de despesas. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-13** - Permitir lançar as receitas e despesas de anos anteriores visando alimentar relatórios que necessitem de tais informações. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-14** - Permitir somente um orçamento por rubrica no exercício, sendo permitido apenas fracionar o valor total da rubrica por fonte. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-15** - Permitir gerar um novo orçamento com base no ano anterior replicando os mesmos valores ou adicionando um percentual, bem como poder criar um orçamento sem valores ou totalmente em branco. _(TR/Edital, PDF p. 30)_
- [ ] **P-LOA-16** - Emitir os anexos e relatórios que integrarão a Lei Orçamentária Anual: a) - QDD - Quadro de Detalhamento da Despesa; b) - Resumo geral da receita e despesa; c) - Resumo geral da receita; d) - Receita por fonte de recurso; e) - Demonstrativo de receita segundo sua natureza; f) - Evolução da receita durantes os 3 últimos anos; g) - Estimativa de receita por fonte; h) - Despesas por função e subfunção; i) - Despesas por programa; e j) - Despesas por grupo de despesa, por modalidade, por fonte de recurso, dentre outros. _(TR/Edital, PDF p. 30)_

### Plano Plurianual - PPA - 39 itens

- [ ] **P-PPA-01** - Permitir o cadastro de poder. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-02** - Permitir o cadastro de órgão. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-03** - Permitir o cadastro de secretária. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-04** - Permitir o cadastro de unidade orçamentária. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-05** - Permitir o cadastro das funções e subfunções. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-06** - Permitir o cadastro de rubricas de receitas. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-07** - Permitir o cadastro de elementos de despesas. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-08** - Permitir o cadastro de contas contábeis. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-09** - Permitir o cadastro de fontes de recursos. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-10** - Permitir o cadastro de programas. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-11** - Permitir o cadastro de público-alvo. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-12** - Permitir o cadastro de estratégias. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-13** - Permitir o cadastro de objetivos. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-14** - Permitir o cadastro de ação e macroação. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-15** - Permitir o cadastramento do objetivo da ação. _(TR/Edital, PDF p. 30)_
- [ ] **P-PPA-16** - Estar totalmente adaptado às novas situações do artigo 165 da Constituição Federal, Decreto 2829/98 e das Portarias Interministeriais 42/99, 163/01 e 219/04; _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-17** - Permitir lançar o planejamento do quadriênio; _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-18** - Permitir o lançamento dos programas com seus indicadores e índices. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-19** - Permitir o lançamento dos eixos estruturantes. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-20** - Permitir o lançamento das áreas temáticas. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-21** - Permitir o lançamento dos indicadores. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-22** - Permitir o lançamento de receitas anteriores do PPA. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-23** - Permitir o lançamento de previsão de receitas do PPA. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-24** - Permitir o lançamento de ação e macroação. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-25** - Permitir a criação dos programas de governo com todos os seus atributos dentro do PPA. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-26** - Permitir o planejamento das ações com identificação das regiões a serem atendidas no município durante a vigência do Plano; _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-27** - Permitir a emissão de formulários de levantamento e avaliação dos programas, ações e indicadores; _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-28** - Emitir relatório de memória de cálculo de receitas e despesas; _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-29** - Emitir os demonstrativos de gastos com saúde e educação. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-30** - Emitir relatório de ações por unidade executora. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-31** - Emitir relatório de programas por macroações governamentais. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-32** - Emitir relatório de síntese das funções governamentais. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-33** - Emitir relatório de síntese de subfunções por função. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-34** - Emitir relatório de síntese dos programas governamentais. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-35** - Emitir relatório de síntese das macroações. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-36** - Emitir relatório de eixo estruturante e área temática. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-37** - Emitir relatório de metas administrativas em macroação por programa. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-38** - Emitir relatório de estimativa da receita por fonte de recurso. _(TR/Edital, PDF p. 31)_
- [ ] **P-PPA-39** - Emitir relatório de estimativa da receita segundo sua natureza. _(TR/Edital, PDF p. 31)_

### Módulo Contratos - 20 itens

- [ ] **P-CONTR-01** - Possuir cadastro de todas as pessoas envolvidas no processo do contrato: Fornecedor, contratante, fiscal. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-02** - Permitir o cadastro de todas as informações relativas aos contratos: número, objeto, datas, pareceres, valor total, tipo de moeda, valor mensal, conta bancária. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-03** - Controlar aditivos de contratos. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-04** - Controle de prazos de término de contratos. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-05** - Informar dotações orçamentárias. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-06** - Permitir o armazenamento de documentos anexados ao contrato. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-07** - Possuir o controle dos contratos por prazo de término, possibilitando ao gestor configurar a quantidade de dias que o Sistema deve informá-lo antes de sua finalização. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-08** - Permitir o lançamento das notas fiscais referentes aos pagamentos dos contratos. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-09** - Permitir requisitar do fornecedor a entrega de materiais contratados. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-10** - Permitir cancelar uma requisição feita a um fornecedor. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-11** - Permitir consultar separadamente os contratos vencidos e a vencer. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-12** - Permitir fechar e abrir competências. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-13** - Permitir a criação de contratos. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-14** - Permitir lançar notificações ou advertências a fornecedores. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-15** - Permitir lançar e validar as datas de validade das certidões dos fornecedores. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-16** - Emitir relatório de saldo de contratos. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-17** - Emitir relatório de contratos vigentes. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-18** - Emitir relatório de contratos vencidos. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-19** - Emitir relatório de contratos vencidos ou vigentes filtrando um determinado fornecedor. _(TR/Edital, PDF p. 31)_
- [ ] **P-CONTR-20** - Exportar todos os arquivos relativos ao SIGA - Sistema Integrado de Gestão e Auditoria do Tribunal de Contas dos Municípios. _(TR/Edital, PDF p. 32)_

### Módulo Licitações - 24 itens

- [ ] **P-LIC-01** - Permitir o cadastro da comissão de licitação. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-02** - Permitir o cadastro de veículo de publicação. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-03** - Compor todo o processo licitatório, seja qual for a modalidade: Carta Convite, Tomada de Preço, Concorrência e Pregão. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-04** - Permitir a confecção das ATAs. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-05** - Acompanhar todo o processo licitatório, envolvendo as etapas desde a preparação até o julgamento, deliberação (preço global), mapa comparativo de preços, parecer jurídico, sua homologação e adjudicação. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-06** - Permitir inclusão dos fornecedores e suas cotações no processo licitatório. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-07** - Definir o vencedor de forma automática, conforme cadastro de cotação. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-08** - Permitir anexar documentos a um processo licitatório. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-09** - Possibilitar consulta aos preços praticados em licitações ou despesas anteriores. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-10** - Validar validade das certidões dos fornecedores. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-11** - Possibilitar mudar o status de um processo licitatório (Em Andamento, Impugnada, Anulada, Fracassada ou Suspensa). _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-12** - Permitir a criação de termos de referência. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-13** - Permitir cadastrar a rodada de lances do pregão. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-14** - Permitir declinar um fornecedor durante o pregão. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-15** - Permitir inabilitar um fornecedor durante o pregão. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-16** - Permitir o cadastro de Dispensas e Inexigibilidade. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-17** - Possuir relatório de cotação. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-18** - Permitir emissão de ofícios e pareceres. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-19** - Possuir relatório dos mapas comparativos. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-20** - Possuir relatórios pertinentes à dispensa. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-21** - Possuir relatórios pertinentes à inexigibilidade. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-22** - Possuir relatórios pertinentes ao pregão. _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-23** - Possuir relatório para acompanhamento do processo licitatório (Quantidade vencida pelo fornecedor, entregue e saldo a entregar). _(TR/Edital, PDF p. 32)_
- [ ] **P-LIC-24** - Exportar todos os arquivos relativos ao SIGA - Sistema Integrado de Gestão e Auditoria do Tribunal de Contas dos Municípios. _(TR/Edital, PDF p. 32)_

### Módulo Convênios - 12 itens

- [ ] **P-CONV-01** - Permitir o cadastro de todas as informações relativas aos convênios (número no SIAFI, número superior, objeto, órgão superior/convenente, número e data dos pareceres, convenente, valor total, tipo de moeda, valor contrapartida e conta bancária). _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-02** - Possuir registro do aditivo dos convênios. _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-03** - Possuir controle da prestação de contas. _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-04** - Possuir registro de convênio concedidos e recebidos. _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-05** - Permitir o armazenamento de documentos anexados ao convênio; _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-06** - Possuir o controle dos convênios por prazo de término, possibilitando ao gestor configurar a quantidade de dias que o software deve informá-lo antes de sua finalização; _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-07** - Permitir realizar o cancelamento do convênio. _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-08** - Permitir o cadastramento dos termos de cooperação técnica. _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-09** - Permitir o cadastramento dos aditivos dos termos de cooperação técnica. _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-10** - Listagem de convênios concedidos. _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-11** - Listagem de convênios recebidos. _(TR/Edital, PDF p. 32)_
- [ ] **P-CONV-12** - Exportar todos os arquivos relativos ao SIGA - Sistema Integrado de Gestão e Auditoria do Tribunal de Contas dos Municípios. _(TR/Edital, PDF p. 32)_

### Sistema Web de Transparência Pública - bloco não numerado no TR

> O TR não atribui números individuais a estes requisitos. Os códigos abaixo são internos e servem apenas para controle da Robonuvem. Como o denominador de 95% não foi definido, a preparação mais segura é atender integralmente o bloco.

- [ ] **P-TRANSP-A01** - Disponibilizar acesso público por meio eletrônico, sem necessidade de login e senha. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-A02** - Disponibilizar a execução orçamentária e financeira das unidades gestoras, referentes à receita e à despesa, com a abertura mínima legal. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-A03** - Assegurar o registro contábil tempestivo dos atos e fatos que afetem ou possam afetar o patrimônio da entidade. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-D01** - Na despesa, divulgar os valores de empenho, liquidação e pagamento. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-D02** - Na despesa, divulgar o número do correspondente processo de execução, quando houver. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-D03** - Na despesa, divulgar a classificação orçamentária: unidade orçamentária, função, subfunção, natureza da despesa e fonte de recursos. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-D04** - Na despesa, divulgar a pessoa física ou jurídica beneficiária do pagamento, observadas as exceções previstas para folha e benefícios previdenciários. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-D05** - Na despesa, divulgar o procedimento licitatório, a dispensa ou a inexigibilidade, com o número do processo correspondente. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-D06** - Na despesa, divulgar o bem fornecido ou o serviço prestado, quando houver. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-R01** - Na receita, divulgar todas as receitas da unidade gestora, no mínimo por natureza. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-R02** - Na receita, divulgar a previsão. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-R03** - Na receita, divulgar o lançamento, quando houver. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-R04** - Na receita, divulgar a arrecadação, inclusive de recursos extraordinários. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-F01** - Na folha, disponibilizar em tempo real a relação dos servidores ativos efetivos e ocupantes de cargos comissionados. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-F02** - Informar mês e ano do exercício financeiro correspondente. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-F03** - Informar o nome completo do agente público. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-F04** - Informar o número de identificação ou matrícula. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-F05** - Informar o cargo. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-F06** - Informar o regime. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-F07** - Informar o valor-base do salário do cargo. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-F08** - Informar os proventos. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-F09** - Informar os descontos. _(TR/Edital, PDF p. 32)_
- [ ] **P-TRANSP-F10** - Informar o valor líquido. _(TR/Edital, PDF p. 32)_

### Sistema Web de Recursos Humanos e Folha de Pagamento - 107 itens

- [ ] **P-RH-001** - O Sistema de Folha de Pagamento e Recursos Humanos deverá ser via Web com servidor online, Banco Único de dados, usuários e acessos ilimitados através de navegador de internet. _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-002** - Permitir cadastrar, alterar, consultar e emitir fichas de registros de empregados, em conformidade com as normas do Ministério do Trabalho e Emprego, para registro de empregados informatizado, bem como cadastrar, alterar, consultar registros de agentes públicos, estagiários, comissionados e autônomos; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-003** - Permitir elaborar relatório de funcionários com diversos filtros (ativos, desligados, lotação, admissão, aniversariantes, etc) através de gerador de relatórios; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-004** - O sistema deve estar preparado para aceitar matrículas diferentes de mesmo servidor e exibir mensagem de alerta no momento de cadastramento de matrículas de servidores que já sejam cadastrados; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-005** - Gerar as Fichas Registros de Empregados; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-006** - Armazenar para cada registro de vinculo funcional um cadastro de dependentes com as diversas informações de registro; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-007** - Controlar os dependentes dos funcionários realizando a sua baixa automática na época e nas condições devidas; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-008** - Emitir fichas de dependentes para imposto de renda e salário família; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-009** - Emitir a ficha de frequência e a ficha de anotações e atualizações da CTPS; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-010** - Emitir documento para cadastro do trabalhador no PIS/PASEP; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-011** - Emitir contrato de trabalho por tempo determinado e indeterminado e suas prorrogações; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-012** - Processar automaticamente todas as alterações referentes ao contrato de trabalho de funcionários; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-013** - Permitir o tratamento da Ficha Registro com foto; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-014** - Possibilitar a elaboração de relatório de controle das avaliações e dos vencimentos do período de experiência dos funcionários e dos contratos de estágio; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-015** - Possibilitar registro de treinamentos realizados; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-016** - Possibilitar as adaptações às alterações legais e às convenções coletivas; _(TR/Edital, PDF p. 33)_
- [ ] **P-RH-017** - Permitir o armazenamento de históricos de salários, promoções, cargos comissionados, gratificações, centro de custos, afastamentos e demais ocorrências; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-018** - Gerar automaticamente o histórico funcional a partir das alterações no registro dos funcionários; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-019** - Permitir a integração com o software de ponto eletrônico utilizado pelo MUNICIPIO para inserção no sistema de folha de pagamento das ocorrências de ponto, como por exemplo, horas extras, faltas, atrasos, e demais informações necessárias, bem como o controle do banco de horas; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-020** - Possuir calendário com a possibilidade de cadastrar feriados, datas sem expedientes e datas em que o expediente deverá ser reduzido ou ampliado; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-021** - Permitir a importação e exportação de arquivos. _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-022** - Permitir a emissão de portarias de nomeação, designação, substituição, promoção, exoneração, demissão e etc; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-023** - Controlar o histórico das portarias dos servidores e as anotações eletrônicas na ficha do servidor; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-024** - Emitir relatórios para análises gerenciais; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-025** - Permitir a emissão de declarações para os funcionários cadastrados por meio de um formulário previamente determinado; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-026** - Realizar o cálculo automático de pensões alimentícias conforme base determinada judicialmente, registrando os dados dos beneficiários de pensão e possibilitando cálculos diferenciados para beneficiários, incluindo as deduções legais; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-027** - Possibilitar a criação de verbas de cálculo automático, de acordo com valores, percentuais ou informações pré-determinadas, atualizando conforme geração das folhas mensais; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-028** - Controlar automaticamente o pagamento de verbas de duração pré-determinada, conforme geração das folhas mensais; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-029** - Controlar substituições temporárias, registrando-as no histórico funcional e calcular o valor a ser pago das que gerarem impacto na folha de pagamento (salário e gratificação para o substituto, em verbas separadas); _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-030** - Permitir edição, inclusão e exclusão de verbas de modo manual; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-031** - Emitir comprovante de rendimentos; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-032** - Realizar o cálculo de provisões para férias e 13º salário, o cálculo do 13º, adiantamento de 13º, integral e complementar, junto à folha normal ou em separado; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-033** - Permitir simulações de cálculo de folhas futuras com emissão de relatórios dos valores da folha de pagamento, incluindo: 33.1. Simulação de aumentos salariais; 33.2. Simulação do pagamento de 13º salário; 33.3. Simulação do pagamento de férias; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-034** - Calcular o pagamento retroativo de todas as verbas e benefícios reajustados no caso de o Acordo Coletivo assinado em data posterior a data-base, gerando automaticamente o cálculo dos impostos e os arquivos necessários para o SEFIP do retroativo; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-035** - Permitir o controle, tratamento e geração automática da folha de pagamento de 13º salário em parcelas, podendo ser executado a qualquer tempo; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-036** - Controlar o número de férias de direito, já adquiridas e não gozadas, de acordo com a legislação; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-037** - Possibilitar a geração de escala de férias e suas alterações; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-038** - Controlar prazos para gozo de férias, emitindo alertas para férias período concessivo de gozo com vencimento eminente; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-039** - Controlar aquisição e atualização automática da data de férias, considerando faltas e afastamentos ocorridos no período aquisitivo de férias, solicitação de abono, de adiantamento de 13º salário e férias partidas; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-040** - Controlar o parcelamento de férias (período limite, intervalo entre as parcelas e período mínimo de gozo); _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-041** - Calcular remuneração de férias, inclusive abono pecuniário e a adiantamento do 13º salário; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-042** - Emitir aviso e recibo de férias, separados; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-043** - Gerar arquivos de informações como SEFIP, CAGED, RAIS, SIOPE, DIRF (Comprovante de Rendimentos Pagos), empréstimos consignados, SIGA, cálculos autuariais, em conformidade com as versões atuais e legislação vigente; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-044** - Permitir o controle de auxílio transporte, considerando quantidade de dias úteis, períodos de férias e outros afastamentos; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-045** - Controlar, calcular e gerar guias de pagamento de encargos legais e sociais, contribuições e impostos (IRPF, INSS, PIS, Contribuição Sindical, Contribuição Social e outras guias); _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-046** - Permitir o cadastro de informações de outro contrato de trabalho (duplo vínculo) e teto INSS no outro contrato; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-047** - Calcular bolsa-auxílio dos estagiários com base nos registros do controle de frequência e recesso; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-048** - Controlar e calcular o recesso de estagiário; _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-049** - Permitir fazer demissões e férias em Lote. _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-050** - Emitir Relação de Salário Contribuição (RSC); _(TR/Edital, PDF p. 34)_
- [ ] **P-RH-051** - Possibilitar a manutenção dos dados de todos os funcionários e estagiários desligados; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-052** - Emitir aviso prévio; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-053** - Emitir Termo de Rescisão e demonstrativo do cálculo de acordo com as normas do Ministério do Trabalho e Emprego; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-054** - Gerar arquivo GRRF.RE; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-055** - Comunicar a rescisão às demais áreas do banco de dados; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-056** - Realizar o cálculo das verbas rescisórias com base nas informações cadastrais (datas, saldos, tipo de contrato), bem como dos descontos legais, pensão alimentícia, valores pagos a maior, etc; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-057** - Busca automática de valores a serem descontados, como adiantamentos (salário, férias, 13º Salário), auxílio transporte, auxilio alimentação; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-058** - Calcular automaticamente todas as verbas devidas no processo rescisório, como férias indenizadas e proporcionais, 13º Salário indenizado, dias trabalhados, entre outras verbas a descontar ou pagar, advindas da folha de pagamento, benefícios sociais ou ponto eletrônico; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-059** - Atualizar automaticamente todas as rescisões contratuais realizadas na folha de pagamento e nas demais ferramentas de RH; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-060** - Calcular complementos de rescisão contratual e férias, sempre que houver reajuste salarial e/ou verbas que devam ser pagas para os funcionários demitidos e/ou em férias; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-061** - Permitir geração de contracheques em arquivo tipo TXT, PDF, RTF, ODF HTML e XLS para impressão, de modo selecionado ou coletivo, e para disponibilização via intranet do MUNICIPIO; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-062** - Geração de arquivos para Receita Federal e INSS (IN86 e IN12); Geração de arquivos (exportar folha de pagamento) para a Instituição Financeira a qual o Prefeitura está vinculado; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-063** - Gerar exportação para o Sistema Integrado de Gestão e Auditoria (SIGA); _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-064** - Gerar exportação para o sistema do SIOPE. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-065** - Gerar exportação para o sistema do CAGED. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-066** - Permitir gerar arquivos com funcionários e prestadores de serviços com informações da previdência social. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-067** - Célere processamento da folha de pagamento do mês; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-068** - Criação de relatórios personalizados de forma célere. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-069** - Atender as exigências do E-Social. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-070** - O sistema deve informar se o dependente já está sendo utilizado em outro cadastro ativo; _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-071** - Disponibilização de rotina que possa efetuar O DESLIGAMENTO em lote de funcionários desligados, garantindo agilidade e performance na rotina do departamento/entidade. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-072** - Disponibilização de rotina que possa efetuar a READMISSÃO em lote de funcionários desligados, garantindo agilidade e performance na rotina do departamento. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-073** - Permitir a busca no cadastro de funcionário, por pré nome, cpf ou matrícula. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-074** - Permitir alterar e limitar a margem consignável do servidor. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-075** - Permitir gerar relatório com margem consignável do servidor, conforme a definição para o que é base de cálculo. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-076** - Módulo de integração que possibilite o envio das liquidações da folha de pagamento, bem como das liquidações do recolhimento do patronal (RGPS/RPPS) ao sistema SIAFIC. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-077** - Permitir o envio ao SIAFIC das informações de provisões (FÉRIAS e 13º SALÁRIO), gerando relatórios para análise e conferência. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-078** - Permitir geração de relatórios de controle do envio das liquidações (FOLHA e PATRONAL), para que sejam analisadas e conferidas antes do envio ao SIAFIC. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-079** - Permitir que faça alteração de FAP, GILRAT e Indice de Desoneração da Folha. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-080** - Permitir que seja feito o cadastro de pensionista (pensão alimentícia) com informações bancária e beneficiário. Com isso permitir gerar folha de pensionista em separada da folha dos servidores. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-081** - Permitir realizar reajuste de salário em lote, por porcentagem e valor. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-082** - Permitir que seja importado as diárias emitidas pela contabilidade, e que seja enviada para o eSocial no 1200 e 1202 como verba informativa. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-083** - Que o sistema possua modelo de eSocial integrado ao sistema de folha. Sem necessidade de outro acesso. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-084** - Permitir que limite acesso por grupo de usuário. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-085** - Permitir que limite acesso por secretaria. _(TR/Edital, PDF p. 35)_
- [ ] **P-RH-086** - Módulo que permita os lançamentos de verbas na folha de pagamento mediante uma autorização prévia. Essa autorização deverá ser realizada por um usuário com senha de nível superior ao de processamento de dados. Nesse módulo, o usuário com senha de nível superior poderá liberar, congelar ou bloquear lançamentos efetuados em folha. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-087** - Permitir que seja criado atalhos no sistema, afim de facilitar o desenvolvimento do setor. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-088** - Permitir criar filtros e salvá-los. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-089** - Permitir a existência de uma aba de busca no sistema, para relatórios e telas. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-090** - Que o sistema tenha modulo de cadastros de informação de SST. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-091** - Que o sistema permita cadastrar o CAT individual ou em lote. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-092** - Disponibilização de rotina que possa fazer a importação de consignados de diversos bancos e financeiras, mesmo que estes estejam em um único arquivo, direcionando os valores das parcelas para as devidas rúbricas, conforme layout predefinido. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-093** - Permitir ao usuário, fazer backup e baixar no ato. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-094** - Permitir solicitar senha para abertura e fechamento de folha. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-095** - Permitir liberar contracheque para o portal do servidor instantaneamente. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-096** - Permita liberar informações para o portal da transparência instantaneamente _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-097** - Permitir que seja feito o ajuste individual de possíveis inconsistências após o envio do eSocial. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-098** - Permitir o envio do eSocial de forma individual ou em lote. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-099** - Ao enviar o S-1299 (fechamento do eSocial), que seja informado os totalizadores de forma fiel ao eSocial. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-100** - Permitir que o sistema informe as possíveis diferença de valores do 1200 _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-101** - Relatório que permita comparar folha do mês anterior com o atual. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-102** - Permitir que seja feita a qualificação social, na hora do cadastro do servidor. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-103** - Permita que ao colocar o cpf no cadastro de servidor, ele procure o nome e endereço junto a receita federal. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-104** - Progressão de Nível/Classe/Referência do funcionário, de forma automática ou semiautomática, conforme o plano de carreira do município. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-105** - Módulo para averbação de tempo de serviço, onde o período de tempo cadastrado será levado em consideração para o cálculo do (anuênio, biênio, triênio e quinquênio) dos funcionários. _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-106** - Rotina de fechamento/abertura da folha por diversos filtros, (Geral, Entidade, Secretaria, centros de custo, Vínculos, Cargos, Funcionários). _(TR/Edital, PDF p. 36)_
- [ ] **P-RH-107** - Permitir que o próprio usuário possa criar campos nas telas do sistema, sem necessidade de intervenção da empresa de desenvolvimento de softwares. _(TR/Edital, PDF p. 36)_

### Portal do Servidor - 9 itens

- [ ] **P-PORT-01** - Disponibiliza aos servidores informações de acesso pessoal e intransferível do mesmo, mediante a inserção da matricula e fornecimento de senha especifica, garantido a confidencialidade da informação; _(TR/Edital, PDF p. 36)_
- [ ] **P-PORT-02** - Disponibilizar o Contracheque da competência em tempo real, dentro do prazo legal, desde que o Município assim esteja atuando; _(TR/Edital, PDF p. 36)_
- [ ] **P-PORT-03** - Contracheque detalhado, disponibilizando inclusive os descontos consignados decorrentes de acordo judiciais, extrajudiciais e/ou legais; _(TR/Edital, PDF p. 36)_
- [ ] **P-PORT-04** - Formulário eletrônico de requerimentos online de gratificações, benefícios, licenças, e outras prerrogativas do servidor desde que previsto na legislação nacional e local, aos quais os servidores estão sob égide; _(TR/Edital, PDF p. 36)_
- [ ] **P-PORT-05** - Formulário eletrônico de solicitação de Férias; _(TR/Edital, PDF p. 36)_
- [ ] **P-PORT-06** - Disponibilização de informes de rendimentos anual; _(TR/Edital, PDF p. 36)_
- [ ] **P-PORT-07** - Disponibiliza de forma online as respostas, por parte do Setor Responsável, as solicitações feitas nos termos do item 04; _(TR/Edital, PDF p. 36)_
- [ ] **P-PORT-08** - Disponibilizar Ouvidoria - Deixar registrado alguma queixa por omissão do feed-back do RH, sugestões, que terá (fale direto com gestor); _(TR/Edital, PDF p. 36)_
- [ ] **P-PORT-09** - Fornecer através de Aplicativo de Celular em plataforma Android (Play Store) informações ao Servidor Público Municipal: a) Acesso ao Contracheque. b) Acesso aos seus informes de rendimento. c) Realizar Requerimentos ao setor de Recursos Humanos. d) Recebimento de notificações sobre data de pagamento, dicas e avisos enviados pelo Setor de Recursos Humanos. _(TR/Edital, PDF p. 36)_

### Sistema Web de Frotas - 40 itens

- [ ] **P-FRO-01** - O Sistema de Frotas deverá ser via Web com servidor online e Banco Único e acesso ilimitado _(TR/Edital, PDF p. 36)_
- [ ] **P-FRO-02** - O Sistema de Frotas deverá permitir quantidade ilimitada de usuários simultâneos com total integridade dos dados e permitir acesso ilimitado aos usuários cadastrados; _(TR/Edital, PDF p. 36)_
- [ ] **P-FRO-03** - O Sistema de Frotas deverá registrar por completo cada acesso de cada usuário identificando suas ações; _(TR/Edital, PDF p. 36)_
- [ ] **P-FRO-04** - O Sistema de Frotas deverá possuir histórico (log.) de todas as operações efetuadas por usuário (inclusões, alterações e exclusões) permitindo a sua consulta e impressão para auditoria; _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-05** - Permitir registrar ordem de abastecimento com informações do veículo, fornecedor, motorista e combustível a ser utilizado, permitindo o lançamento automático da despesa. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-06** - Permitir registrar ordem de serviço com informações do veículo, fornecedor, motorista e serviços a serem realizados no veículo, permitindo o lançamento da despesa. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-07** - Possuir controle do consumo de combustível e média por veículo, permitindo a emissão de relatório por veículo, por período e com opção para detalhamento dos abastecimentos. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-08** - Permitir controlar as trocas de pneus com identificação da posição dos pneus trocados (dianteira/traseira/todos) incluindo tipo da troca (novo/recapagem), possibilitando a emissão do relatório com seleção de período da troca, veículo, material, tipo de troca e identificação dos pneus trocados. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-09** - Controlar as trocas de óleo efetuadas nos veículos, identificando o tipo da troca (caixa, diferencial, motor ou torque), possibilitando a emissão do relatório por período, veículo, fornecedor, material e pelo tipo da troca. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-10** - Permitir controlar as licitações de combustíveis, informando a quantidade licitada, utilizada e saldo restante, com possibilidade de anulação parcial da licitação e emitindo o relatório de acompanhamento por período. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-11** - Permitir o cadastro de licenciamentos dos veículos com informação da data/valor do licenciamento e seguro obrigatório, possibilitando a emissão do relatório por período e veículo _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-12** - Controlar funcionários que possuem carteira de habilitação e também o vencimento estas, possibilitando ainda a emissão de relatório das carteiras de habilitação vencidas e a vencer. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-13** - Possuir o cadastramento de “Reservas de veículos” por centro de custo e por funcionário, registrando a data da reserva e o período que o veículo será reservado, possibilitando também a emissão de relatório de reservas com essas seleções. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-14** - Permitir cadastrar seguradoras e apólices de seguros (com valor de franquia e valor segurado) para os veículos. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-15** - Emitir planilhas para preenchimento das ordens de abastecimento/serviço, contendo os seguintes campos: motorista, placa do veículo, fornecedor, material/serviço. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-16** - Emitir planilhas para preenchimento das viagens dos veículos, contendo os seguintes campos: centro de custo requerente, placa do veículo, quilometragem de saída e de chegada, nome do motorista e data/hora de saída e chegada. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-17** - Possuir controle sobre abastecimentos e gastos dos veículos feitos fora e dentro da entidade controlando saldo dos materiais utilizados dando baixa no Estoque. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-18** - Possibilitar a emissão de relatório demonstrando as despesas realizadas nos veículos em determinado período, agrupando as despesas por centro de custo ou veículo, permitindo seleção por: - material;- veículo;- centro de custo; - despesas realizadas fora da entidade; - fornecedor; - gastos em licitação e estoques da entidade. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-19** - Emitir relatórios de ficha de análise do veículo, exibindo todas as despesas e valores da operação efetuada com demarcação do quilômetro percorrido, mostrando a média de consumo de combustível. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-20** - Possuir o cadastro dos funcionários identificando qual o setor eles pertencem, data de admissão, identidade e CPF. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-21** - Controlar produtividade dos veículos com avaliação de desempenho de cada um, emitindo relatório demonstrando os litros consumidos, a média e avaliando o consumo do veículo (baixo, normal ou alto). _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-22** - Possibilitar controlar e criar despesas específicas para abastecimento, troca de óleo, serviços, pneu, etc, para um melhor controle dos gastos com a frota. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-23** - Emitir os relatórios dos principais cadastros (veículos, centro de custos, funcionários, fornecedores, ocorrências, despesas, materiais). _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-24** - Possuir relatório de apólice de seguros, permitindo a emissão por veículo, por período, de seguros vencidos e à vencer. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-25** - Registrar o controle de quilometragem dos veículos, informando o motorista, o setor requisitante, a distância percorrida, a data/hora, a quilometragem de saída e de chegada; possibilitando também a emissão de relatório por período, por centro de custo e com demonstração do itinerário. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-26** - Permitir o registro das ocorrências envolvendo os veículos, como troca de hodômetro, acidentes, etc., registrando as respectivas datas e possibilitando a emissão de relatório em determinado período pelo tipo de ocorrência, funcionário e veículo. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-27** - Permitir a inclusão de documentos e/ou imagens nas ocorrências lançadas para os veículos, devendo ser armazenadas no próprio banco de dados e possibilitando sua visualização pelo próprio cadastro. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-28** - Controlar automaticamente a substituição de marcadores (hodômetros e horímetros) por meio das movimentações do veículo. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-29** - Permitir a substituição da placa de um veículo por outra, transferindo assim toda a movimentação de lançamento realizada pelo veículo anteriormente. _(TR/Edital, PDF p. 37)_
- [ ] **P-FRO-30** - Permitir a substituição da placa de um veículo por outra, transferindo assim toda a movimentação de lançamento realizada pelo veículo anteriormente. _(TR/Edital, PDF p. 38)_
- [ ] **P-FRO-31** - Emitir um relatório que demonstre os custos do veículo por quilômetro rodado, selecionando o período de emissão, o veículo, o material e o tipo de despesa, visualizando a quantidade de litros gastos, o valor gasto, a quantidade de quilômetros rodados e o custo por quilômetro. _(TR/Edital, PDF p. 38)_
- [ ] **P-FRO-32** - Permitir o registro das multas sofridas com o veículo, vinculando ao motorista: local da infração, tipo de multa (gravíssimo, grave, média e leve), responsável pelo pagamento (funcionário ou entidade), valor em UFIR e moeda corrente e a data do pagamento. _(TR/Edital, PDF p. 38)_
- [ ] **P-FRO-33** - Permitir controle das revisões realizadas e previstas no veículo, informando a quilometragem da revisão e da próxima a ser realizada, mais observações da revisão. _(TR/Edital, PDF p. 38)_
- [ ] **P-FRO-34** - Possibilitar a vinculação e desvinculação de agregados aos veículos e equipamentos; _(TR/Edital, PDF p. 38)_
- [ ] **P-FRO-35** - Permitir o cadastramento de adaptações realizadas nos veículos. _(TR/Edital, PDF p. 38)_
- [ ] **P-FRO-36** - Permitir salvar os relatórios em formato PDF simples, possibilitando que sejam assinados digitalmente. _(TR/Edital, PDF p. 38)_
- [ ] **P-FRO-37** - Permitir geração dos arquivos para o SIM-AM conforme Layout publicado pelo TCM/BA. _(TR/Edital, PDF p. 38)_
- [ ] **P-FRO-38** - Permitir criar e gravar seleções para serem utilizadas na emissão de diferentes relatórios. _(TR/Edital, PDF p. 38)_
- [ ] **P-FRO-39** - Permitir copiar um relatório existente no sistema e criar um novo relatório com as alterações que o usuário desejar. _(TR/Edital, PDF p. 38)_
- [ ] **P-FRO-40** - Permite a configuração do cabeçalho e rodapés dos relatórios, bem como os assinantes. _(TR/Edital, PDF p. 38)_

### Sistema Web de Patrimônio Público - 31 itens

- [ ] **P-PAT-01** - O Sistema de Patrimônio deverá ser via Web com servidor online e Banco Único e acesso ilimitado _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-02** - O Sistema deverá permitir quantidade ilimitada de usuários simultâneos com total integridade dos dados e permitir acesso ilimitado aos usuários cadastrados; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-03** - O Sistema deverá registrar por completo cada acesso de cada usuário identificando suas ações; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-04** - O Sistema deverá possuir histórico (log.) de todas as operações efetuadas por usuário (inclusões, alterações e exclusões) permitindo a sua consulta e impressão para auditoria; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-05** - Possibilitar o bloqueio de módulos, rotinas e/ou tarefas do sistema, para não permitir a inclusão ou manutenção dos lançamentos, podendo ser controlado por grupo/usuário; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-06** - Possibilitar a inclusão em série de bens patrimoniais, por meio de cadastro em entidade, órgãos, cargos, responsáveis, centro de custo, unidade orçamentária, categoria, características, localização e tipo de seguro; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-07** - Controlar e manter todos os dados relacionados aos bens móveis e imóveis que compõem o Patrimônio o Município/ Câmara, permitindo, de maneira ágil e rápida, o cadastramento, a classificação por grupos, a movimentação, a transferência, a baixa, a localização, a situação e o inventário de tais bens; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-08** - Permitir o armazenamento dos históricos de todas as operações como depreciações, amortizações e exaustões, avaliações, os valores correspondentes aos gastos adicionais ou complementares, bem como registrar histórico da vida útil, valor residual, metodologia da depreciação, taxa utilizada de cada classe do imobilizado correspondentes aos demonstrativos contábeis, em atendimento a NBCASP; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-09** - Permitir o controle dos diversos tipos de baixas e desincorporações como: alienação, permuta, furto/roubo, entre outros; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-10** - Permitir o cadastro da foto do bem; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-11** - Possibilitar a inclusão de percentuais de depreciação para as diferentes categorias de bens patrimoniais, emitindo relatórios com os valores de compra e os valores depreciados; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-12** - Permitir a inclusão de um percentual limite de depreciação para cada categoria de bem patrimonial, de modo que o valor do bem não fique abaixo deste limite; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-13** - Permitir a reavaliação dos bens de forma individual, global ou por grupos; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-14** - Permitir a funcionalidade de transferência de bens patrimoniais entre centros de custos, guardando um histórico; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-15** - Emitir relatórios de movimentação e manutenção de bens patrimoniais, possibilitando a tomada de decisão com relação à baixa do bem; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-16** - Permitir o controle dos bens patrimoniais recebidos ou cedidos em comodato a outros órgãos da administração pública e também os alugados pela entidade; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-17** - Permitir ingressar itens patrimoniais pelos mais diversos tipos, como: aquisição, doação, dação de pagamento, obras em andamento, entre outros, auxiliando assim no mais preciso controle dos bens da entidade, bem como o respectivo impacto na contabilidade; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-18** - Permitir a utilização, na depreciação, amortização e exaustão, os métodos: linear ou de quotas constantes e/ou de unidades produzidas, em atendimento a NBCASP; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-19** - Permitir registrar o processo licitatório, empenho e nota fiscal referentes ao item; _(TR/Edital, PDF p. 38)_
- [ ] **P-PAT-20** - Cadastro de fornecedores, centros de custo, categorias e outros necessários ao funcionamento do sistema, integrados aos cadastros dos outros módulos do sistema e com funcionalidade para impressão dos dados cadastrados a partir da tela de cadastramento; _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-21** - Funcionalidade de inventariação automatizada via leitor manual de código de barras; _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-22** - Realizar as transferências de bens automaticamente entre centros de custo e emitir relatório com os bens que não foram encontrados nos centros de custo onde estavam alocados originalmente; _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-23** - Permitir o cadastramento de seguradoras e corretores, bem como controlar os contratos de seguros dos bens; _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-24** - Exportação e incorporação dos bens da Câmara aos bens da Câmara; _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-25** - Geração do Livro de Tombo; _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-26** - Possibilidade de exportar dados para o Sistema Integrado de Gestão e Auditoria (SIGA); _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-27** - Gerar relatórios de balancetes mensais de verificação do acervo de bens, devidamente atualizados, com a movimentação e resumo contábil. _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-28** - As informações devem ser geradas e colocadas à disposição da Prefeitura qualquer tempo, inclusive, mediante back up e sua restauração; _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-29** - Integração via API entre o sistema patrimonial e o SIAFIC, permitindo o envio em tempo real de informações sobre depreciação, amortização, valorização e baixas, bem como a execução sincronizada de estornos. _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-30** - Permitir o registro de itens patrimoniais relacionados a obras em andamento, incluindo a inserção de medições ao longo da execução, com detalhes como numeração da medição, empenho, processo de pagamento, nota fiscal, valor, e um campo para sinalização da conclusão da obra. _(TR/Edital, PDF p. 39)_
- [ ] **P-PAT-31** - Aplicativo móvel integrado, para captura e conferência de dados a partir de celulares ou tablets Android ou iOS, incluindo geolocalização. Permitindo capturar fotos dos bens, que ficam vinculadas ao cadastro geral do bem. _(TR/Edital, PDF p. 39)_

### Sistema Web de Almoxarifado - 41 itens

- [ ] **P-ALM-01** - Permitir o recebimento dos materiais dos fornecedores via Nota Fiscal; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-02** - Permitir a entrada de mercadorias provenientes de doações, permutas, cessões, produção interna, e outras origens; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-03** - Permitir controlar o almoxarifado por gestora; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-04** - Permitir subdividir o almoxarifado em depósitos e estes por sua vez em setores; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-05** - Permitir controlar o acesso dos usuários a informações apenas dos depósitos em que trabalham; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-06** - Permitir definir formas diferentes de estocar a mesma mercadoria; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-07** - Permitir pesquisar as notas fiscais, doações ou outras entradas no estoque pela mercadoria; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-08** - Permitir lançar autorizações aos funcionários para realizar a estocagem dos materiais recebidos, bem como para movê-los dentro dos setores e estantes, e para que sejam entregues aos solicitantes; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-09** - Permitir identificar o local (com endereço) onde os materiais devem ser entregues; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-10** - Permitir a transferência de materiais entre depósitos; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-11** - Permitir que as secretarias lancem requisições de materiais apenas para seus respectivos centros de custo; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-12** - Permitir o recebimento de materiais provenientes de outros almoxarifados de outras gestoras; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-13** - Permitir controlar a saída de mercadorias de forma que seja obrigatório identificar um número de controle para as mesmas individualmente; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-14** - Permitir cadastrar todos os equipamentos utilizados para guardar os materiais ou acondicioná-los, bem como registrar suas dimensões de largura, comprimento e altura; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-15** - Permitir informar como cada equipamento que guarda os materiais está dividido em número de prateleiras e colunas, e se for o caso também em até duas faces. _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-16** - Permitir definir para cada forma de estocagem de uma mercadoria dados de sua volumetria (largura x comprimento x altura) e peso; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-17** - Permitir definir para cada forma de estocagem de uma mercadoria dados de sua volumetria (largura x comprimento x altura) e peso; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-18** - Permitir definir para cada forma de estocagem de uma mercadoria dados de sua volumetria (largura x comprimento x altura) e peso; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-19** - Permitir registrar as quantidades de materiais que se encontram em estado de recuperação ou manutenção e os inservíveis que possam estar nas estantes; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-20** - Permitir realizar inventário do almoxarifado, ou partes dele, como depósitos, setores ou ainda estantes específicas; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-21** - Bloquear a movimentação, retirada ou estocagem de mercadorias sobre as estantes que estiverem sendo inventariadas e deixar livres estas mesmas ações sobre as demais estantes que não estiverem sob inventário; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-22** - Permitir lançar autorizações para que os funcionários assim designados possam realizar a contagem dos materiais sob inventário e registrar as diferenças encontradas entre as quantidades registradas no sistema e a quantidade contada pelo mesmo; _(TR/Edital, PDF p. 39)_
- [ ] **P-ALM-23** - Permitir que o encarregado pelo inventário decida sobre o que fazer com as divergências encontradas entre as contagens dos itens inventariados podendo optar por manter a quantidade registrada no sistema, considerar a quantidade contada como válida, lançar um outro valor manualmente, ou ainda criar uma nova autorização para recontagem do material; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-24** - Liberar as movimentações, entradas e saídas de mercadorias das estantes assim que o inventário for encerrado; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-25** - Possuir integração com o sistema de Compras e Licitações permitindo o recebimento de mercadorias dos fornecedores através das autorizações liberadas pelos setores de licitações ou compras; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-26** - Controlar o recebimento dos materiais via nota fiscal permitindo que o funcionário registre a concordância com as quantidades e qualidades dos materiais da nota fiscal e o que realmente foi entregue pelos fornecedores; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-27** - Permitir marcar as notas fiscais recebidas pelo setor de almoxarifado para que sejam liberadas para liquidação; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-28** - Quando houver integração com o Sistema de Compras e Licitação, não permitir receber as autorizações emitidas pelo “Compras” em nome de outro fornecedor. _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-29** - Permitir que o encarregado por dar saídas das mercadorias do estoque avalie as requisições feitas pelas secretarias, modificando as quantidades solicitadas conforme achar pertinente; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-30** - Permitir visualizar as mercadorias e suas quantidades por estantes e locais de armazenamento; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-31** - Permitir consultar as quantidades das mercadorias por centro de custo de forma que um requisitante só possa consultar os saldos de mercadorias para sua própria secretaria, ou permitir configurar o contrário (pesquisar em todos os centros de custo); _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-32** - Permitir calcular os dados de controle do almoxarifado tais como: Freqüência de Entrada e Saída, Consumo Médio Mensal, Fator de Segurança, Estoque Mínimo, Ponto de Emergência, Estoque Médio e Máximo, Ponto de Reposição, Tempo de Reposição; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-33** - Permitir dar saída de mercadorias diretamente do Estoque de Entrada, ou seja, de mercadorias que ainda não foram estocadas nas estantes; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-34** - Emitir relatório com os cálculos de controle do estoque realizados para um determinado período informando se há materiais que precisam ser ressuprimidos, correm risco de desatendimento ou se houve ruptura do estoque; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-35** - Emitir relatório de entrada do estoque agrupando por data quais as mercadorias recebidas pelos depósitos, de quais fornecedores, suas quantidades e valores monetários correspondentes e para quais centros de custos; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-36** - Emitir relatório de Posição do Estoque informando as quantidades das mercadorias para cada centro de custo considerando como data base a data de emissão do mesmo; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-37** - Emitir relatório de saída de mercadorias agrupando por data, identificando se trata-se de uma transferência, requisição por parte das secretarias, ou de uma saída lançada pelo encarregado. Deve conter também de onde as mercadorias serão retiradas e qual o destino de entrega das mesmas; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-38** - Permitir pesquisar e imprimir as saídas de mercadorias controladas, cujo número de controle é obrigatório; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-39** - Emitir alertas (em tempo real) aos encarregados por gerenciar os estoques, informando quando há novas requisições a serem atendidas, ou mercadorias recém chegadas a dar entrada no estoque; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-40** - Permitir identificar a pessoa que realizou o pedido de saída do estoque; _(TR/Edital, PDF p. 40)_
- [ ] **P-ALM-41** - Relatório de controle, onde mostra o consumo mensal dos itens que deram saída; _(TR/Edital, PDF p. 40)_

## 3.4 Evidências recomendadas para Pintadas

- Base integrada com Prefeitura, unidades, órgãos, exercícios, plano de contas, dotações, fornecedores, servidores, veículos, bens, estoques, contratos, licitações e convênios.
- Cenário contábil completo: orçamento, empenho, liquidação, pagamento, restos a pagar, encerramento, relatórios e exportações.
- Evidências de banco único, ambiente único, logs, usuários por CPF, backups e demais requisitos SIAFIC.
- Arquivos ou demonstrações de exportação para SIGA/TCM-BA, SICONFI, EFD-Reinf, RREO, RGF, DCA, eSocial e demais obrigações mencionadas.
- Aplicativo móvel instalado e funcional, quando exigido.
- Fluxo integrado entre Folha e SIAFIC; Almoxarifado/Patrimônio e Contabilidade; Compras/Licitações e Contratos.
- Relatórios preparados com dados coerentes e suficientes para filtros, gráficos, exportações e conferências.
- Equipamento limpo, sem ferramentas desnecessárias, e ambiente semelhante ao definitivo.

---

# 4. Priorização de testes da Robonuvem

## Prioridade 1 - risco de eliminação imediata

- Guimarânia: todos os 16 requisitos obrigatórios de datacenter e integrações.
- Pintadas: aplicativos pequenos em que 95% exige praticamente atendimento integral, especialmente Portal do Servidor.
- Pintadas: requisitos legais e integrações SIAFIC, SIGA/TCM-BA, eSocial e transparência.
- Pintadas: itens que a comissão possa considerar de grande importância, mesmo sem essa classificação prévia no TR.

## Prioridade 2 - fluxos completos

- Demonstrar processos de ponta a ponta, e não apenas telas isoladas.
- Garantir integração entre módulos e consistência dos saldos, históricos, permissões e relatórios.
- Preparar dados suficientes para que filtros e relatórios produzam resultados reais durante a apresentação.

## Prioridade 3 - documentação e contingência

- Roteiro minuto a minuto da POC/demonstração.
- Usuários e senhas de contingência.
- Base fictícia restaurável.
- Backup local das evidências permitidas e plano alternativo de conectividade.
- Catálogo, declarações, arquitetura e manuais disponíveis para diligência.

---

## Controle de revisão

- Fonte Guimarânia: `EDITAL SISTEMA SAUDE - RETIFICADO.pdf`.
- Fonte Rio Corrente: `12. EDITAL DISPENSA 14.2026.pdf`.
- Fonte Pintadas: `01 - Edital.pdf`, extraído do arquivo RAR anexado.
- Versão deste checklist: 31/07/2026.
