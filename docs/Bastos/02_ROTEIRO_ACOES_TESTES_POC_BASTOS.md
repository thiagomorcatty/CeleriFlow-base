---
titulo: "Roteiro de ações e testes da POC — CeleriFlow / Bastos-SP"
certame: "Pregão Eletrônico nº 066/2026"
processo: "Processo interno nº 226/2026 — Protocolo nº 5765/2026"
data: "2026-08-27"
versao: "1.0"
status: "Roteiro de ensaio e apresentação"
---

# Roteiro de ações e testes da POC — CeleriFlow / Bastos-SP

## 1. Escopo deste roteiro

Este roteiro converte, em sequência executável, **todos os 51 quesitos** da tabela do item 15.21 do Termo de Referência:

- 43 quesitos obrigatórios;
- 8 quesitos classificados como Passível de Desenvolvimento;
- 51 quesitos a demonstrar.

As ações abaixo não acrescentam funcionalidades estranhas ao edital. Cada ação corresponde diretamente a um quesito da tabela da POC, complementado apenas pelos detalhamentos do item 3.0 do próprio TR quando ele especifica campos, relatórios ou abrangência do mesmo requisito.

## 2. Condições formais da demonstração

- participa da POC a licitante provisoriamente mais bem classificada;
- a sessão é pública;
- a demonstração ocorrerá presencialmente na Prefeitura Municipal de Bastos/SP;
- não é permitida substituição por videoconferência, compartilhamento de tela ou acesso remoto;
- a data, o horário e o local devem ser informados pela Administração;
- a agenda deve ocorrer de segunda a sexta-feira, das 07h às 11h ou das 13h às 17h;
- o prazo máximo confirmado para conclusão é de até cinco dias úteis, prorrogável uma única vez por igual período, mediante pedido motivado e aceite da Administração;
- a Robonuvem deve utilizar equipamentos próprios;
- o sistema deve estar configurado e executar de forma nativa as funções do item 15.21;
- a Administração fornece o local e estrutura para projeção;
- o edital recomenda levar modem 4G em razão de possíveis bloqueios do firewall;
- a comissão será composta por três servidores;
- a comissão deve poder acessar o sistema;
- as ocorrências devem ser registradas em ata;
- cada quesito é avaliado como **ATENDIDO — SIM ou NÃO**;
- a Administração deve limitar a avaliação aos requisitos previamente previstos;
- os custos da apresentação são da licitante.

## 3. Regra de execução

A apresentação seguirá a ordem da tabela do item 15.21:

1. Requisitos técnicos;
2. Dashboard;
3. Cenários;
4. Gerencial;
5. Legal;
6. Audiência Pública.

Para cada linha:

1. executar a ação indicada;
2. permitir que a comissão observe e, quando solicitado, opere a função;
3. confirmar o resultado visível;
4. registrar o resultado do quesito;
5. seguir para o próximo ID.

> Embora os itens 15.9 e 15.10 mencionem percentual de 85%, o item 15.21 prevê desclassificação pelo não cumprimento de pelo menos um obrigatório. Por isso, este roteiro contém todos os itens obrigatórios e todos os itens PD.

## 4. Roteiro completo


### 4.1. Requisitos técnicos

Fonte: **TR, item 15.21, pp. 24–25**.

| ID | Classe | Ação a executar na demonstração | Resultado que deve ficar visível | Detalhamento do TR | Resultado |
|---|---|---|---|---|---|
| T01 | Obrigatório | Acessar e operar a solução integralmente pela web. | A comissão consegue utilizar a aplicação por navegador em plataforma 100% web. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T02 | Obrigatório | Demonstrar que a plataforma está hospedada em datacenter sob responsabilidade da contratada. | A solução apresentada está publicada e acessível no ambiente hospedado da contratada. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T03 | Obrigatório | Demonstrar a aplicação web e identificar que foi desenvolvida com linguagem de alto nível. | A solução gerencia as informações no próprio aplicativo web. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T04 | Obrigatório | Acessar as informações da solução pela internet em mais de um navegador. | As mesmas funções e informações ficam disponíveis nos navegadores demonstrados. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T05 | Obrigatório | Demonstrar autenticação, controle de usuários e acesso protegido por senha criptografada. | O acesso aos dados é controlado por usuário, com autenticação e proteção da senha. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T06 | Obrigatório | Executar o mecanismo da solução para obter as informações transmitidas ao AUDESP. | As informações do AUDESP ficam disponíveis no sistema para tratamento e consulta. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T07 | Obrigatório | Carregar e apresentar informações estruturadas no padrão XML do AUDESP. | O sistema reconhece e trata dados no padrão e nas especificações exigidas pelo TCE-SP. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T08 | Obrigatório | Importar automaticamente um arquivo eletrônico no padrão XML do AUDESP. | O arquivo é processado pela rotina automática segundo o layout do TCE-SP. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T09 | Obrigatório | Executar a consolidação dos balancetes contábeis importados. | A solução apresenta a consolidação em conformidade com o formato e as regras do TCE-SP. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T10 | Obrigatório | Gerar e salvar relatório em XLS, DOC e PDF. | A comissão consegue obter o mesmo relatório nos três formatos mínimos. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T11 | Obrigatório | Apresentar as informações contábeis, orçamentárias, financeiras e patrimoniais tratadas segundo as NBCASP. | Os dados e demonstrativos exibidos observam as Normas Brasileiras de Contabilidade Aplicadas ao Setor Público. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| T12 | Obrigatório | Demonstrar a conformidade da solução com a LGPD ou apresentar o plano de trabalho e o DPO responsável. | A comissão verifica a conformidade ou recebe o plano de adequação com o responsável indicado. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |

### 4.2. Módulo Dashboard

Fonte: **TR, item 15.21, p. 24**.

| ID | Classe | Ação a executar na demonstração | Resultado que deve ficar visível | Detalhamento do TR | Resultado |
|---|---|---|---|---|---|
| D01 | Obrigatório | Abrir o dashboard, exibir informações orçamentárias e financeiras e acionar a impressão. | As informações são visualizadas no painel e podem ser impressas. | O requisito exige impressão das informações apresentadas. | [ ] SIM / [ ] NÃO |
| D02 | Passível de Desenvolvimento | Visualizar a execução orçamentária e financeira com separação por fonte de recurso. | O painel distingue os valores por fonte de recurso. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| D03 | Passível de Desenvolvimento | Exibir a análise do desempenho da receita e da despesa comparada com índices econômicos. | A solução apresenta a comparação solicitada. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| D04 | Obrigatório | Selecionar dois períodos e exibir a comparação da execução orçamentária e financeira. | O painel mostra a análise comparativa entre os períodos. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| D05 | Obrigatório | Exibir os percentuais de Ensino, Fundeb, Saúde, Despesa com Pessoal, DCL, art. 167 e CAPAG. | Todos os percentuais e indicadores exigidos ficam visíveis. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| D06 | Obrigatório | Abrir o relatório que apresenta a situação do Município no CAUC. | A situação do Município no CAUC é apresentada em relatório. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| D07 | Obrigatório | Visualizar os relatórios de Instruções e Alertas emitidos pelo TCE-SP. | Os relatórios de Instruções e Alertas ficam acessíveis na solução. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| D08 | Obrigatório | Visualizar a posição do Município no ranking do SICONFI. | A posição no ranking é exibida pela solução. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |

### 4.3. Módulo Cenários

Fonte: **TR, item 15.21, pp. 24–25**.

| ID | Classe | Ação a executar na demonstração | Resultado que deve ficar visível | Detalhamento do TR | Resultado |
|---|---|---|---|---|---|
| C01 | Obrigatório | Criar cenários mensais e anuais de receita e despesa, usando percentual e valor. | A solução cria e apresenta os cenários nas duas periodicidades e formas. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| C02 | Obrigatório | Exibir cenário histórico e projetado de receita e despesa com todos os parâmetros mínimos previstos. | O cenário mostra Mês, Entidade, Fonte de Recurso, Classificação Econômica e Metodologia de Projeção. | Os parâmetros mínimos são Mês, Entidade, Fonte de Recurso, Classificação Econômica de Receita e Despesa e Metodologia de Projeção conforme a Lei 4.320/1964. | [ ] SIM / [ ] NÃO |
| C03 | Obrigatório | Exibir os cenários históricos de Ensino e Saúde com as despesas, comparações e metodologia exigidas. | A solução apresenta os percentuais, valores empenhados/liquidados/pagos e comparação com IPCA e IGP-M. | Deve conter despesa empenhada, liquidada e paga, comparação com IPCA e IGP-M e metodologia de projeção conforme a Lei 4.320/1964. | [ ] SIM / [ ] NÃO |

### 4.4. Módulo Gerencial

Fonte: **TR, item 15.21, p. 25**.

| ID | Classe | Ação a executar na demonstração | Resultado que deve ficar visível | Detalhamento do TR | Resultado |
|---|---|---|---|---|---|
| G01 | Obrigatório | Emitir os demonstrativos de gestão fiscal, orçamentária e financeira com todos os índices indicados. | Os resultados da execução e os índices constitucionais/fiscais são apresentados. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| G02 | Obrigatório | Emitir o relatório do resultado orçamentário por órgão e fonte, nos três critérios de despesa. | O relatório discrimina empenhado, liquidado e pago por órgão e fonte. | O item 3.0 também menciona código de aplicação no resultado orçamentário. | [ ] SIM / [ ] NÃO |
| G03 | Obrigatório | Emitir o relatório do resultado financeiro com despesas a pagar do exercício e anteriores. | O relatório apresenta os critérios e a segregação por órgão e fonte. | Inclui despesas a pagar do exercício e de exercícios anteriores. | [ ] SIM / [ ] NÃO |
| G04 | Passível de Desenvolvimento | Emitir o relatório de acompanhamento da receita com os parâmetros mínimos. | O relatório apresenta Mês, Entidade, Fonte de Recurso e Classificação Econômica. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| G05 | Passível de Desenvolvimento | Emitir o relatório de acompanhamento da despesa com os parâmetros mínimos. | O relatório apresenta Mês, Entidade, Fonte de Recurso e Classificação Econômica. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| G06 | Obrigatório | Emitir o relatório de projeção da arrecadação com os parâmetros mínimos. | A projeção é apresentada por Mês, Entidade e Fonte de Recurso. | O item 3.0 detalha projeção por órgão, fonte de recurso e código de aplicação. | [ ] SIM / [ ] NÃO |
| G07 | Obrigatório | Emitir o relatório de suficiência ou insuficiência financeira projetada. | O relatório apresenta o resultado e os parâmetros mínimos exigidos. | O item 3.0 detalha resultado mensal projetado por fonte de recurso e código de aplicação. | [ ] SIM / [ ] NÃO |
| G08 | Obrigatório | Selecionar dois exercícios e emitir a comparação de todos os indicadores previstos. | A solução apresenta, lado a lado, os indicadores dos dois exercícios. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| G09 | Passível de Desenvolvimento | Exibir o acompanhamento do art. 42 da LRF com os parâmetros mínimos. | A solução mostra liquidez/iliquidez do mês de referência e a evolução mensal até o fim do exercício. | O item 3.0 detalha apuração do mês de referência, acompanhamento dos últimos oito meses, liquidez do período e liquidez projetada. | [ ] SIM / [ ] NÃO |
| G10 | Passível de Desenvolvimento | Exibir o acompanhamento do limite de pessoal no período dos últimos 180 dias. | A solução apresenta o percentual do mês de referência e o acompanhamento mensal do período. | O item 3.0 detalha o percentual do mês de referência e o acompanhamento mensal dos últimos 180 dias. | [ ] SIM / [ ] NÃO |
| G11 | Passível de Desenvolvimento | Exibir o acompanhamento mensal do art. 167-A da Constituição Federal. | A solução apresenta o cumprimento mensal das receitas e despesas correntes. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| G12 | Passível de Desenvolvimento | Exibir o acompanhamento mensal da CAPAG do Município. | A evolução mensal da capacidade de pagamento fica visível. | O item 3.0 detalha apuração e acompanhamento do limite dos últimos 12 meses. | [ ] SIM / [ ] NÃO |

### 4.5. Módulo Legal

Fonte: **TR, item 15.21, p. 25**.

| ID | Classe | Ação a executar na demonstração | Resultado que deve ficar visível | Detalhamento do TR | Resultado |
|---|---|---|---|---|---|
| L01 | Obrigatório | Emitir o relatório de acompanhamento e validação das metas e indicadores fiscais. | O relatório reúne a execução e todos os indicadores exigidos. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| L02 | Obrigatório | Gerar, validar e transmitir o arquivo eletrônico SIOPE a partir dos balancetes XML do AUDESP. | A solução executa as etapas de geração, validação e transmissão previstas. | O item 3.0 acrescenta informações do 1º ao 6º bimestre e validação no Módulo de Acompanhamento e Validação do SIOPE — MAVS. | [ ] SIM / [ ] NÃO |
| L03 | Obrigatório | Validar, parametrizar e gerar o arquivo eletrônico descrito no TR como “SIOPE do Ministério Público”. | O arquivo é gerado a partir dos balancetes XML do AUDESP, conforme a redação do requisito. | A expressão “SIOPE do Ministério Público” é preservada exatamente como aparece no item 15.21; não foi corrigida ou reinterpretada. | [ ] SIM / [ ] NÃO |
| L04 | Obrigatório | Parametrizar e gerar o arquivo eletrônico SIOPS a partir dos balancetes XML do AUDESP. | A solução gera o arquivo SIOPS conforme o requisito. | O item 3.0 acrescenta levantamento, preenchimento, encaminhamento e homologação do 1º ao 6º bimestre. | [ ] SIM / [ ] NÃO |
| L05 | Obrigatório | Gerar o arquivo orçamentário e financeiro destinado à transmissão e homologação no SICONFI. | O arquivo exigido pelo requisito é produzido pela solução. | O item 3.0 menciona levantamento, preenchimento de planilha, encaminhamento e homologação das informações do 1º ao 6º bimestre. | [ ] SIM / [ ] NÃO |
| L06 | Obrigatório | Gerar as informações conforme a MSC para transmissão e homologação no SICONFI. | A solução produz as informações da Matriz de Saldos Contábeis. | O item 3.0 abrange informações contábeis, orçamentárias e fiscais dos órgãos da Administração Direta e Indireta. | [ ] SIM / [ ] NÃO |
| L07 | Obrigatório | Emitir os relatórios pormenorizados de RREO, RGF, Ensino, Fundeb e Saúde. | Todos os relatórios exigidos ficam disponíveis para a prestação de contas indicada. | O item 3.0 também exige RREO e RGF em relatório e planilha eletrônica para conferência. | [ ] SIM / [ ] NÃO |
| L08 | Obrigatório | Emitir o relatório por razão de conta corrente com a movimentação proveniente dos XML mensais. | O relatório apresenta a movimentação conforme as regras do AUDESP. | Sem detalhamento adicional além do próprio quesito do item 15.21. | [ ] SIM / [ ] NÃO |
| L09 | Obrigatório | Emitir os demonstrativos de balanços contábeis nos modelos exigidos. | A solução disponibiliza os balanços contábeis conforme TCE-SP e STN. | O item 3.0 detalha emissão mensal, por órgão e consolidada, dos Anexos 12, 12 A (Restos a Pagar), 13, “12 A — Contas do Passivo”, 14, 14 A, 14 B, 15, 18 e 18 A, além de assinaturas e notas explicativas. | [ ] SIM / [ ] NÃO |

### 4.6. Módulo Audiência Pública

Fonte: **TR, item 15.21, pp. 25–26**.

| ID | Classe | Ação a executar na demonstração | Resultado que deve ficar visível | Detalhamento do TR | Resultado |
|---|---|---|---|---|---|
| A01 | Obrigatório | Exibir o demonstrativo e o gráfico das despesas fixadas e dos resultados empenhado, liquidado e pago. | O demonstrativo e o gráfico apresentam todos os valores previstos. | O item 3.0 detalha despesas por órgão e consolidado. | [ ] SIM / [ ] NÃO |
| A02 | Obrigatório | Exibir o demonstrativo e o gráfico das despesas realizadas. | As despesas realizadas são apresentadas em demonstrativo e gráfico. | O item 3.0 detalha comparação com a meta de gastos e visão por função, subfunção, órgão e fonte de recurso. | [ ] SIM / [ ] NÃO |
| A03 | Obrigatório | Exibir o demonstrativo e o gráfico do resultado financeiro. | O resultado financeiro é apresentado nas duas formas. | O item 3.0 detalha resultado financeiro por órgão e consolidado. | [ ] SIM / [ ] NÃO |
| A04 | Obrigatório | Exibir o demonstrativo e o gráfico de cumprimento das metas nominal e primária. | O cumprimento das duas metas é apresentado. | O item 3.0 exige demonstrativo e gráfico das metas nominal e primária. | [ ] SIM / [ ] NÃO |
| A05 | Obrigatório | Exibir o demonstrativo e o gráfico dos limites de Ensino, Fundeb, Saúde e Pessoal. | Os quatro conjuntos de limites são apresentados em demonstrativo e gráfico. | O item 3.0 exige demonstrativos e gráficos de Ensino, Fundeb, Saúde e Despesa com Pessoal. | [ ] SIM / [ ] NÃO |
| A06 | Obrigatório | Parametrizar as informações que comporão a apresentação da audiência pública. | A solução permite definir as informações da apresentação. | A parametrização deve definir as informações da apresentação da audiência. | [ ] SIM / [ ] NÃO |
| A07 | Obrigatório | Gerar automaticamente a ata e a lista de presença da audiência pública. | Os dois documentos são produzidos automaticamente pela solução. | O item 3.0 separa a geração automática da ata da emissão da lista de presença. | [ ] SIM / [ ] NÃO |

## 5. Encerramento da apresentação

Depois do último quesito:

1. confirmar que a comissão teve possibilidade de acessar o sistema;
2. verificar se todos os quesitos receberam registro **SIM/NÃO**;
3. conferir o registro das ocorrências em ata;
4. aguardar o relatório técnico de **ACEITE** ou **RECUSA**, com motivação.

## 6. Controle consolidado

| Grupo | Obrigatórios | PD | Total | Resultado |
|---|---:|---:|---:|---|
| Requisitos técnicos | 12 | 0 | 12 | [ ] |
| Dashboard | 6 | 2 | 8 | [ ] |
| Cenários | 3 | 0 | 3 | [ ] |
| Gerencial | 6 | 6 | 12 | [ ] |
| Legal | 9 | 0 | 9 | [ ] |
| Audiência Pública | 7 | 0 | 7 | [ ] |
| **Total** | **43** | **8** | **51** | [ ] |

## 7. Referências documentais

- Edital do Pregão Eletrônico nº 066/2026, item 9.26.
- Anexo I — Termo de Referência, itens 3.0 e 15.1–15.21.
- Resposta oficial sobre o prazo da POC.
- Resposta oficial que manteve a POC presencial e determinou a aplicação rigorosa dos requisitos previamente estabelecidos.
