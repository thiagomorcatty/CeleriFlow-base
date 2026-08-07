# Ficha de Avaliação da POC — São João do Ivaí/PR

**Licitação:** Pregão Eletrônico nº 51/2026  
**Processo:** nº 102/2026  
**Objeto:** Software de Automação Financeira para rotinas vinculadas aos setores de finanças, contabilidade e tesouraria.

---

## 1. Finalidade desta ficha

Esta ficha organiza:

1. os itens expressamente previstos para demonstração na POC;
2. os critérios de aprovação;
3. os requisitos do Termo de Referência que poderão ser verificados durante a sessão;
4. os assuntos que não aparecem como requisito específico de avaliação;
5. um roteiro de registro da comissão;
6. uma matriz interna de preparação da Robonuvem.

A ficha deve ser usada como instrumento interno de preparação. A comissão poderá adotar formulário próprio.

---

## 2. Regras formais da POC

| Regra | Exigência |
|---|---|
| Licitante avaliada | Provisoriamente classificada em primeiro lugar |
| Forma | On-line por videoconferência |
| Convocação | Até 5 dias antes da demonstração |
| Duração | Mínimo de 1 hora |
| Continuidade | Próximo dia útil, se não concluir em um único dia |
| Acesso prévio | 3 dias úteis antes da avaliação |
| Usuários da comissão | 3 logins individuais |
| Comissão | 1 técnico de TI e 2 integrantes das áreas contábil, administrativa ou financeira |
| Base de testes | Responsabilidade da licitante |
| Ambiente | Previamente instalado em datacenter/nuvem |
| Método de avaliação | Sim/não — atende/não atende |
| Características obrigatórias | Atendimento de 100% |
| Requisitos dos módulos | Atendimento mínimo de 80% |
| Registro | Ata com atendimento, ocorrências e conclusão |
| Não atendimento | Desclassificação/inabilitação e convocação da próxima classificada |

---

## 3. Critério de avaliação

### 3.1 Características técnicas obrigatórias

Devem ser atendidas em **100%**.

O não atendimento de qualquer item poderá causar desclassificação imediata.

### 3.2 Especificações técnicas dos módulos

Deve ser atendido no mínimo **80% dos itens**.

O Anexo VIII apresenta cinco grupos de funcionalidades. Matemática e formalmente, quatro de cinco equivalem a 80%. Contudo, a preparação interna deve considerar os cinco itens obrigatórios, pois:

- o Termo de Referência descreve todos como funcionalidades mínimas;
- a comissão pode solicitar a demonstração de todos;
- a redação da POC também menciona atendimento integral;
- qualquer lacuna pode gerar questionamento ou avaliação desfavorável.

---

# PARTE A — ITENS EXPRESSAMENTE AVALIÁVEIS

## 4. Características técnicas obrigatórias — 100%

### CT-01 — Tela inicial

**Requisito documental:** interface simples, intuitiva e de fácil utilização, em página web, com opção de Home e opção de Automações.

**Procedimento de teste:**

- [ ] abrir o endereço do sistema;
- [ ] efetuar login;
- [ ] confirmar exibição da tela inicial;
- [ ] localizar a opção Home;
- [ ] localizar a opção Automações;
- [ ] verificar navegação sem erro;
- [ ] verificar legibilidade da interface.

**Evidência esperada:**

- URL acessível;
- tela inicial carregada;
- menu visível;
- navegação funcional.

**Resultado:**

- [ ] ATENDE
- [ ] NÃO ATENDE

**Observações da comissão:**

```text

```

---

### CT-02 — Acesso e login

**Requisito documental:** o acesso às automações deverá ficar vinculado à autenticação dos sistemas envolvidos na execução da tarefa, por meio dos dados de acesso fornecidos pelo usuário, impedindo usuários não autorizados.

**Procedimento de teste:**

- [ ] acessar com usuário válido;
- [ ] rejeitar usuário inválido;
- [ ] impedir acesso sem autenticação;
- [ ] tentar abrir rota protegida diretamente;
- [ ] confirmar que somente usuário autorizado solicita automações;
- [ ] registrar usuário responsável pela solicitação.

**Evidência esperada:**

- login individual;
- bloqueio de acesso não autorizado;
- sessão autenticada;
- registro de usuário.

**Resultado:**

- [ ] ATENDE
- [ ] NÃO ATENDE

**Observações da comissão:**

```text

```

---

### CT-03 — Tela de automações

**Requisito documental:** a tela deve apresentar as automações disponíveis, permitir solicitar tarefas, inserir parâmetros e comunicar o andamento da atividade.

**Procedimento de teste:**

- [ ] abrir a tela Automações;
- [ ] visualizar as automações disponíveis;
- [ ] selecionar uma automação;
- [ ] informar conta, período e parâmetros;
- [ ] iniciar a execução;
- [ ] visualizar status da tarefa;
- [ ] visualizar conclusão, falha ou pendência;
- [ ] abrir detalhes da execução.

**Evidência esperada:**

- catálogo de automações;
- formulário de parâmetros;
- status de processamento;
- resultado da tarefa.

**Resultado:**

- [ ] ATENDE
- [ ] NÃO ATENDE

**Observações da comissão:**

```text

```

---

## 5. Requisitos dos módulos — mínimo de 80%

### MOD-01 — Download de extratos bancários

**Requisito documental:** realizar download de extratos de contas correntes e contas de aplicação, com arquivamento organizado e catalogado em pastas previamente configuradas, inclusive possibilidade de pasta compartilhada.

**Procedimento de teste:**

- [ ] selecionar conta corrente;
- [ ] selecionar período;
- [ ] solicitar extrato;
- [ ] obter o arquivo do banco simulado;
- [ ] arquivar o documento;
- [ ] verificar organização por conta e período;
- [ ] repetir para conta de aplicação;
- [ ] abrir ou baixar o arquivo arquivado;
- [ ] consultar histórico da execução.

**Evidência esperada:**

- arquivo OFX, CSV ou PDF;
- caminho ou classificação de arquivamento;
- data e hora;
- conta;
- período;
- usuário solicitante.

**Resultado:**

- [ ] ATENDE
- [ ] NÃO ATENDE

**Observações da comissão:**

```text

```

---

### MOD-02 — Lançamento de resgates e aplicações financeiras

**Requisito documental:** ler extratos das contas de aplicação, calcular valores de resgates e aplicações e efetuar os registros no sistema de gestão pública.

**Procedimento de teste:**

- [ ] ler extrato da conta de aplicação;
- [ ] identificar aplicação;
- [ ] identificar resgate;
- [ ] calcular os valores;
- [ ] exibir a regra de identificação;
- [ ] enviar o lançamento ao sistema externo de testes;
- [ ] confirmar o registro criado;
- [ ] exibir identificador do lançamento;
- [ ] repetir a execução;
- [ ] confirmar que não houve duplicidade.

**Evidência esperada:**

- transações identificadas;
- cálculo;
- registro no destino;
- identificador externo;
- log de processamento.

**Resultado:**

- [ ] ATENDE
- [ ] NÃO ATENDE

**Observações da comissão:**

```text

```

---

### MOD-03 — Lançamento de rendimentos de aplicações financeiras

**Requisito documental:** ler extratos das contas de aplicação, calcular rendimentos e efetuar os registros no sistema de gestão pública.

**Procedimento de teste:**

- [ ] consultar extrato da aplicação;
- [ ] identificar rendimento;
- [ ] calcular valor;
- [ ] relacionar conta e período;
- [ ] enviar lançamento;
- [ ] confirmar registro no sistema externo;
- [ ] exibir status final;
- [ ] consultar log.

**Evidência esperada:**

- rendimento identificado;
- valor calculado;
- lançamento confirmado;
- registro de auditoria.

**Resultado:**

- [ ] ATENDE
- [ ] NÃO ATENDE

**Observações da comissão:**

```text

```

---

### MOD-04 — Lançamento de receitas constitucionais e legais

**Requisito documental:** consultar extratos das contas que recebem repasses, apurar valores e registrar as receitas no sistema de gestão pública.

Receitas relacionadas no Anexo VIII:

- FPM — Fundo de Participação dos Municípios;
- FEP — Fundo Especial do Petróleo;
- ITR — Imposto Territorial Rural;
- ICMS estadual;
- IPI Exportação — cota Município;
- royalties do petróleo — cota municipal;
- FUNDEB;
- ADO — LC nº 176/2020;
- IPVA — repasse aos municípios;
- demais receitas do Município.

**Procedimento de teste:**

- [ ] consultar extrato;
- [ ] identificar FPM;
- [ ] identificar FUNDEB;
- [ ] identificar IPVA;
- [ ] identificar outra receita;
- [ ] apurar os valores;
- [ ] classificar as receitas;
- [ ] enviar os registros ao sistema externo;
- [ ] confirmar os lançamentos;
- [ ] encaminhar transação não reconhecida para pendência.

**Evidência esperada:**

- receita reconhecida;
- classificação;
- valor;
- lançamento no destino;
- pendência controlada para item não reconhecido.

**Resultado:**

- [ ] ATENDE
- [ ] NÃO ATENDE

**Observações da comissão:**

```text

```

---

### MOD-05 — Conciliação bancária

**Requisito documental:** abrir conciliações no sistema de gestão pública, ler extratos, calcular saldos, carregar lançamentos do razão e conciliar razão com extrato bancário.

**Procedimento de teste:**

- [ ] selecionar conta e período;
- [ ] carregar extrato;
- [ ] carregar razão;
- [ ] calcular saldo bancário;
- [ ] comparar movimentos;
- [ ] conciliar correspondências;
- [ ] exibir movimentação somente no banco;
- [ ] exibir movimentação somente no razão;
- [ ] registrar pendências;
- [ ] salvar a conciliação;
- [ ] consultar resumo ou relatório.

**Evidência esperada:**

- extrato;
- razão;
- saldos;
- itens conciliados;
- divergências;
- status da conciliação.

**Resultado:**

- [ ] ATENDE
- [ ] NÃO ATENDE

**Observações da comissão:**

```text

```

---

## 6. Apuração dos requisitos expressos

| Código | Item | Peso formal | Resultado |
|---|---|---:|---|
| CT-01 | Tela inicial | Obrigatório — 100% |  |
| CT-02 | Acesso e login | Obrigatório — 100% |  |
| CT-03 | Tela de automações | Obrigatório — 100% |  |
| MOD-01 | Download de extratos | Módulo — mínimo geral 80% |  |
| MOD-02 | Aplicações e resgates | Módulo — mínimo geral 80% |  |
| MOD-03 | Rendimentos | Módulo — mínimo geral 80% |  |
| MOD-04 | Receitas constitucionais e legais | Módulo — mínimo geral 80% |  |
| MOD-05 | Conciliação bancária | Módulo — mínimo geral 80% |  |

**Características obrigatórias atendidas:** ___ de 3  
**Módulos atendidos:** ___ de 5  
**Percentual dos módulos:** _______%  

**Conclusão preliminar:**

- [ ] APROVADA
- [ ] REPROVADA
- [ ] PENDENTE DE DELIBERAÇÃO

---

# PARTE B — ITENS DO TR QUE PODERÃO SER VERIFICADOS

## 7. Painel de acompanhamento

O Termo de Referência exige painel ou área específica com:

- status;
- saldos;
- valores identificados;
- data e hora da última atualização;
- falhas;
- pendências;
- tarefas concluídas.

Esse painel não aparece como um sexto módulo na tabela final do Anexo VIII, mas está expressamente no objeto e pode ser solicitado durante a demonstração.

**Classificação:** poderá ser avaliado ou questionado.

**Checklist:**

- [ ] status da automação;
- [ ] saldo;
- [ ] valores identificados;
- [ ] data e hora;
- [ ] falhas;
- [ ] pendências;
- [ ] tarefas concluídas;
- [ ] detalhes da execução.

---

## 8. Logs e histórico

O TR prevê, quando aplicável:

- logs;
- histórico de acessos;
- execução das automações;
- falhas;
- pendências;
- data e hora;
- usuário solicitante;
- informações necessárias à fiscalização.

**Classificação:** poderá ser avaliado como requisito de segurança, acompanhamento e fiscalização.

**Checklist:**

- [ ] login;
- [ ] usuário solicitante;
- [ ] automação;
- [ ] parâmetros;
- [ ] resultado;
- [ ] falha;
- [ ] data e hora;
- [ ] identificador da execução.

---

## 9. Ambiente em nuvem

A POC exige sistema previamente instalado em datacenter, com recursos de segurança, desempenho e disponibilidade.

**Classificação:** expressamente verificável.

**Checklist:**

- [ ] URL pública;
- [ ] HTTPS;
- [ ] disponibilidade externa;
- [ ] ambiente independente da máquina do apresentador;
- [ ] tempo de resposta adequado;
- [ ] acesso simultâneo dos integrantes;
- [ ] ambiente identificado como teste.

---

## 10. Base de testes

A proponente é responsável pelo banco de dados de testes e cada função deverá ser executada com demonstração do resultado.

**Classificação:** expressamente verificável.

**Checklist:**

- [ ] dados fictícios disponíveis;
- [ ] contas bancárias;
- [ ] movimentações;
- [ ] extratos;
- [ ] razão contábil;
- [ ] receitas;
- [ ] aplicações;
- [ ] resgates;
- [ ] rendimentos;
- [ ] divergências para conciliação.

---

## 11. Segurança, sigilo e proteção de dados

O TR estabelece:

- boas práticas de segurança;
- sigilo;
- confidencialidade;
- proteção dos dados;
- integridade;
- controle de credenciais;
- comunicação de incidentes;
- observância da LGPD.

A POC não apresenta subitens de pontuação separados para cada controle, mas a finalidade declarada inclui requisitos de segurança.

**Classificação:** poderá ser avaliado, especialmente pelo integrante de TI.

**Checklist:**

- [ ] login individual;
- [ ] controle de perfil;
- [ ] rotas protegidas;
- [ ] credenciais mascaradas;
- [ ] dados fictícios;
- [ ] HTTPS;
- [ ] registro de acesso;
- [ ] ausência de dados de outros clientes;
- [ ] tratamento de erro sem expor segredo.

---

## 12. Tratamento de falhas e pendências

O painel e os logs devem informar falhas e pendências. O suporte contratual também diferencia falhas críticas, médias e baixas.

**Classificação:** poderá ser avaliado funcionalmente, embora a classificação completa de chamados seja mais contratual do que propriamente item da POC.

**Checklist:**

- [ ] credencial inválida;
- [ ] timeout;
- [ ] indisponibilidade;
- [ ] arquivo inválido;
- [ ] transação não reconhecida;
- [ ] ausência de duplicidade;
- [ ] reprocessamento controlado.

---

## 13. Integração com sistemas externos

O objeto exige integração com os sistemas necessários à execução das automações. A solução deverá operar sobre o sistema municipal existente, sem substituí-lo.

**Classificação:** expressamente relacionada à POC.

Pode ser demonstrado por:

- banco externo simulado;
- APIs;
- arquivos estruturados;
- execução efetiva e retorno do resultado no CeleriFlow.

Na POC, o Banco Virtual Robonuvem é a única origem bancária simulada. Os lançamentos, registros contábeis, movimentos de tesouraria, conciliações e auditorias são persistidos de forma real na instância do CeleriFlow usada para a avaliação.

A documentação não afirma expressamente que a POC deva utilizar credenciais reais de banco ou acesso real ao EloWeb.

---

## 14. Planejamento orçamentário — PPA, LDO e LOA

A expressão “ORÇAMENTÁRIO (PPA, LDO, LOA)” aparece na descrição geral do serviço.

Entretanto:

- não há módulo específico de PPA, LDO ou LOA na tabela de requisitos do Anexo VIII;
- não há roteiro de criação, alteração, aprovação ou execução desses instrumentos;
- o objeto principal é automação financeira sobre o sistema existente.

**Classificação:** ponto de atenção e possível questionamento, mas não aparece como requisito técnico específico pontuado na ficha de módulos da POC.

Preparação recomendada:

- manter consulta ou vinculação orçamentária em modo somente leitura;
- demonstrar exercício, fonte, classificação ou vínculo quando relacionado ao lançamento;
- não apresentar espontaneamente um módulo completo de elaboração de PPA, LDO e LOA;
- estar preparado para explicar como os lançamentos respeitam os parâmetros orçamentários.

---

## 15. Treinamento

O TR exige treinamento dos servidores sobre:

- uso da solução;
- solicitação das automações;
- acompanhamento das tarefas;
- identificação de falhas;
- consulta de relatórios;
- abertura de chamados.

**Classificação:** obrigação de implantação e execução contratual. Pode haver pergunta ou solicitação de explicação, mas não aparece como item técnico específico da tabela final da POC.

---

## 16. Suporte técnico e chamados

O TR exige canais formais e acompanhamento de solicitações.

**Classificação:** obrigação contratual. Pode ser verificada por demonstração de tela ou explicação, mas não integra os cinco módulos específicos da POC.

Preparar:

- tela simples de chamados;
- registro;
- classificação;
- status;
- histórico.

Não é necessário transformar suporte em módulo central da apresentação, salvo solicitação.

---

## 17. Manutenção, atualizações e compatibilidade

O TR exige manutenção preventiva e corretiva, atualizações, adequação a alterações de layout bancário e compatibilidade com sistemas utilizados.

**Classificação:** obrigação contratual e técnica. Pode ser questionada, mas não há teste funcional objetivo descrito no roteiro da POC.

Preparar explicação sobre:

- adaptadores;
- versionamento;
- parâmetros;
- atualização de layouts;
- logs;
- homologação;
- rollback.

---

# PARTE C — ITENS QUE NÃO ESTÃO PREVISTOS COMO OBJETO ESPECÍFICO DA POC

## 18. Itens que não devem ser tratados como módulos obrigatórios

Não aparecem na tabela de avaliação da POC:

- protocolo;
- processos administrativos;
- ouvidoria;
- atendimento ao cidadão;
- portal da transparência;
- tributário completo;
- compras e licitações;
- contratos;
- recursos humanos;
- folha;
- patrimônio;
- almoxarifado;
- educação;
- saúde;
- assistência social;
- meio ambiente;
- saneamento;
- obras;
- cemitérios;
- cultura;
- esporte;
- segurança;
- mobilidade;
- gestão de Câmara Municipal.

Esses módulos devem ficar ocultos e bloqueados no ambiente da POC.

---

## 19. Itens não expressamente exigidos na demonstração

A documentação não estabelece, de forma expressa, que a licitante tenha de demonstrar:

- código-fonte;
- entrega do repositório;
- arquitetura completa do CeleriFlow;
- aplicativo móvel;
- funcionamento offline;
- geoprocessamento;
- assinatura digital;
- integração com PNCP;
- integração com eSocial;
- integração com e-SUS;
- integração com TCE;
- integração com folha de pagamento;
- integração com compras;
- integração com patrimônio;
- acesso a banco real;
- movimentação de dinheiro real;
- uso de dados reais do Município;
- acesso de produção ao EloWeb;
- substituição do sistema contábil municipal;
- migração completa de dados;
- módulo completo de ERP municipal.

**Observação:** a comissão poderá formular perguntas objetivas, mas essas perguntas não transformam automaticamente assuntos fora da especificação em requisitos formais da POC.

---

## 20. Limites importantes da demonstração

A apresentação deve deixar claro que:

- o CeleriFlow não substituirá o sistema municipal;
- o banco apresentado é um simulador externo;
- o CeleriFlow registra efetivamente as operações executadas na POC;
- os dados bancários de origem são fornecidos exclusivamente pelo Banco Virtual Robonuvem;
- nenhuma movimentação financeira real será realizada;
- nenhuma integração oficial deve ser alegada sem comprovação;
- a demonstração comprova o fluxo técnico e funcional.

---

# PARTE D — MATRIZ INTERNA DE PREPARAÇÃO

## 21. Matriz de aderência

| Código | Requisito | Status interno | Responsável | Evidência preparada |
|---|---|---|---|---|
| CT-01 | Tela inicial |  |  |  |
| CT-02 | Acesso e login |  |  |  |
| CT-03 | Tela de automações |  |  |  |
| MOD-01 | Download de extratos |  |  |  |
| MOD-02 | Aplicações e resgates |  |  |  |
| MOD-03 | Rendimentos |  |  |  |
| MOD-04 | Receitas constitucionais e legais |  |  |  |
| MOD-05 | Conciliação bancária |  |  |  |
| TR-01 | Painel de acompanhamento |  |  |  |
| TR-02 | Logs e histórico |  |  |  |
| TR-03 | Ambiente em nuvem |  |  |  |
| TR-04 | Base de testes |  |  |  |
| TR-05 | Segurança e LGPD |  |  |  |
| TR-06 | Falhas e pendências |  |  |  |
| TR-07 | Integrações externas |  |  |  |
| TR-08 | Vínculo orçamentário |  |  |  |
| TR-09 | Suporte e chamados |  |  |  |

Status sugeridos:

```text
NÃO INICIADO
EM DESENVOLVIMENTO
PRONTO PARA TESTE
APROVADO INTERNAMENTE
RISCO
NÃO APLICÁVEL
```

---

## 22. Controle do acesso prévio da comissão

| Usuário | Perfil | Data de criação | Testado | Entregue | Observação |
|---|---|---|---|---|---|
| Comissão TI | Auditor técnico |  |  |  |  |
| Comissão 1 | Financeiro/Contábil |  |  |  |  |
| Comissão 2 | Financeiro/Contábil |  |  |  |  |

Checklist:

- [ ] acessos criados com 3 dias úteis de antecedência;
- [ ] login individual;
- [ ] senha temporária;
- [ ] rotas bloqueadas;
- [ ] módulos corretos;
- [ ] acesso externo testado;
- [ ] instrução de acesso enviada.

---

## 23. Registro do ensaio interno

**Data:** ____________________  
**Versão/commit:** ____________________  
**Ambiente:** ____________________  
**Responsável pela apresentação:** ____________________  
**Tempo total:** ____________________  

| Item | Funcionou | Tempo | Falha encontrada | Correção |
|---|---|---:|---|---|
| Login |  |  |  |  |
| Tela inicial |  |  |  |  |
| Automações |  |  |  |  |
| Extratos |  |  |  |  |
| Aplicações/resgates |  |  |  |  |
| Rendimentos |  |  |  |  |
| Receitas |  |  |  |  |
| Conciliação |  |  |  |  |
| Painel |  |  |  |  |
| Falha controlada |  |  |  |  |
| Reset do cenário |  |  |  |  |

---

## 24. Resultado final do ensaio

### Características obrigatórias

- [ ] CT-01 atende
- [ ] CT-02 atende
- [ ] CT-03 atende

### Módulos

- [ ] MOD-01 atende
- [ ] MOD-02 atende
- [ ] MOD-03 atende
- [ ] MOD-04 atende
- [ ] MOD-05 atende

### Itens complementares

- [ ] painel completo;
- [ ] logs completos;
- [ ] base reiniciável;
- [ ] três acessos da comissão;
- [ ] ambiente externo;
- [ ] HTTPS;
- [ ] dados fictícios;
- [ ] integração bancária simulada;
- [ ] integração com ERP simulado;
- [ ] tratamento de falha;
- [ ] ausência de duplicidade;
- [ ] versão congelada.

**Decisão interna:**

- [ ] LIBERADO PARA A POC
- [ ] LIBERADO COM RESSALVAS
- [ ] NÃO LIBERADO

**Ressalvas:**

```text

```

---

## 25. Conclusão interpretativa

A avaliação formalmente mais objetiva está concentrada em:

1. tela inicial;
2. login e controle de acesso;
3. tela de automações;
4. download de extratos;
5. aplicações e resgates;
6. rendimentos;
7. receitas constitucionais e legais;
8. conciliação bancária.

Também existe base documental para a comissão verificar:

- painel;
- logs;
- segurança;
- ambiente em nuvem;
- base de testes;
- funcionamento efetivo;
- falhas;
- pendências;
- integração com sistemas externos.

Não existe base expressa para exigir, como módulo da POC, a demonstração do CeleriFlow completo ou de funcionalidades administrativas alheias à automação financeira descrita no objeto.

---

## 26. Base documental utilizada

Esta ficha foi elaborada com base especialmente em:

- Termo de Referência, páginas 34 a 46;
- ETP, especialmente a parte sobre necessidade de POC;
- Anexo VIII — Prova de Conceito, páginas 72 a 76;
- características técnicas obrigatórias;
- critérios de 100% e 80%;
- tabela dos cinco módulos funcionais.
