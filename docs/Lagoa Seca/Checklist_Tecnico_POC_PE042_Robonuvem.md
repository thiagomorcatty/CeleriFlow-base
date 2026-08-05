# Checklist Técnico da Prova de Conceito — PE nº 00042/2026

**Processo Administrativo:** 260702PE00042  
**Órgão:** Prefeitura Municipal de Lagoa Seca/PB  
**Objeto:** Locação de software de Contabilidade Pública e Portal da Transparência  
**Finalidade:** consolidar, em formato técnico e verificável, os requisitos que deverão ser demonstrados na Prova de Conceito — POC, conforme o Edital, o Termo de Referência e os anexos do processo.

---

## 1. Regras gerais da POC

- A licitante classificada deverá disponibilizar técnicos para demonstrar os sistemas, módulos e funcionalidades.
- A apresentação deverá ocorrer em local definido pela Administração.
- O prazo para comparecimento é de até **3 dias após a convocação**.
- A demonstração será realizada **nas dependências da CONTRATANTE**.
- Horário previsto: **08h00 às 12h00**.
- A licitante deverá levar os equipamentos e aplicativos necessários.
- A licitante deverá utilizar **base de dados modelo** com conteúdo suficiente para demonstrar todos os requisitos.
- O teste deverá ser concluído em, no máximo, **3 reuniões previamente agendadas**.
- A comissão avaliará as características e funcionalidades mínimas como **“Atende” ou “Não atende”**.
- O não atendimento de **100% das funcionalidades requeridas e respectivas aprovações** poderá acarretar a desclassificação da proposta.
- Em caso de reprovação, será convocada a próxima licitante na ordem de classificação.
- Ao final, será elaborado relatório detalhado da análise de conformidade.

---

# 2. Arquitetura funcional mínima esperada

```text
Planejamento Orçamentário
        ↓
PPA → LDO → LOA
        ↓
Alterações Orçamentárias
        ↓
Execução Orçamentária
        ↓
Solicitação → Reserva → Empenho → Liquidação → Retenções → Pagamento
        ↓
Financeiro / Caixa / Bancos
        ↓
Contabilidade / Lançamentos em Partidas Dobradas
        ↓
Patrimônio / Estoque / Dívida Ativa / Dívida Consolidada
        ↓
Relatórios Legais / TCE / SICONFI
        ↓
Portal da Transparência
```

Integrações transversais:

```text
Tributos
Licitações e Contratos
Protocolo
TCE
SICONFI
eSocial
EFD-Reinf
DIRF
SEFIP
Notas Fiscais Eletrônicas
Assinatura Digital ICP-Brasil
Help Desk / Service Desk
```

---

# 3. Checklist técnico por módulo

## 3.1. Núcleo de Contabilidade Pública

### 3.1.1. Registros contábeis

- [ ] Registrar atos e fatos de natureza orçamentária.
- [ ] Registrar atos e fatos de natureza extraorçamentária.
- [ ] Registrar fatos financeiros.
- [ ] Registrar fatos patrimoniais.
- [ ] Utilizar método de partidas dobradas.
- [ ] Informar conta debitada.
- [ ] Informar conta creditada.
- [ ] Informar data da transação.
- [ ] Informar histórico descritivo ou histórico padronizado.
- [ ] Relacionar documentação de suporte.
- [ ] Informar valor do lançamento.
- [ ] Gerar número de controle para lançamentos relacionados.
- [ ] Identificar bens, direitos e obrigações de forma completa.
- [ ] Permitir acumulação dos registros por centro de custo.
- [ ] Centralizar os registros contábeis da entidade.
- [ ] Demonstrar integração entre atos administrativos e fatos contábeis.
- [ ] Demonstrar conformidade com NBCASP, MCASP e MDF.

### 3.1.2. Integridade e histórico

- [ ] Manter o registro original após contabilização.
- [ ] Permitir correção por novo lançamento.
- [ ] Permitir anulação por novo lançamento.
- [ ] Preservar histórico dos registros corrigidos ou anulados.
- [ ] Garantir segurança, preservação e disponibilidade dos documentos e registros.
- [ ] Demonstrar rastreabilidade entre lançamento, usuário e documento de origem.

### Cenário recomendado para a POC

1. Criar um lançamento contábil.
2. Informar débito, crédito, histórico e documento.
3. Vincular a um centro de custo.
4. Efetuar correção ou estorno.
5. Demonstrar que o registro original permaneceu preservado.

---

## 3.2. Planejamento Orçamentário

### 3.2.1. PPA — Plano Plurianual

- [ ] Elaborar PPA.
- [ ] Cadastrar programas.
- [ ] Cadastrar objetivos.
- [ ] Cadastrar ações.
- [ ] Cadastrar metas.
- [ ] Cadastrar indicadores.
- [ ] Cadastrar valores por exercício.
- [ ] Gerar anexos obrigatórios.
- [ ] Registrar alterações.
- [ ] Preservar os dados da versão original.
- [ ] Emitir relatórios das modificações realizadas.

### 3.2.2. LDO — Lei de Diretrizes Orçamentárias

- [ ] Elaborar LDO.
- [ ] Definir metas e prioridades.
- [ ] Relacionar ações ao PPA.
- [ ] Gerar anexos legais.
- [ ] Registrar alterações.
- [ ] Preservar os dados iniciais.
- [ ] Emitir relatórios comparativos entre versão original e alterada.

### 3.2.3. LOA — Lei Orçamentária Anual

- [ ] Elaborar LOA.
- [ ] Registrar previsão da receita.
- [ ] Registrar fixação da despesa.
- [ ] Cadastrar dotações.
- [ ] Cadastrar fontes e destinações de recursos.
- [ ] Relacionar despesas a programas e ações.
- [ ] Gerar anexos legais.
- [ ] Demonstrar integração com PPA e LDO.

### 3.2.4. Metas e programação financeira

- [ ] Elaborar Cronograma Mensal de Desembolso — CMD.
- [ ] Elaborar Metas Bimestrais de Arrecadação — MBA.
- [ ] Controlar despesa conforme CMD.
- [ ] Emitir relatórios auxiliares de receita.
- [ ] Emitir relatórios auxiliares de despesa.
- [ ] Emitir relatórios de aplicação de recursos.
- [ ] Acompanhar limites constitucionais e legais.

### Cenário recomendado para a POC

1. Cadastrar um programa no PPA.
2. Relacionar o programa à LDO.
3. Criar ação e dotação na LOA.
4. Definir fonte de recurso.
5. Gerar anexos.
6. Demonstrar CMD e MBA.

---

## 3.3. Alterações Orçamentárias

- [ ] Controlar saldo disponível das dotações.
- [ ] Atualizar saldo após alteração orçamentária.
- [ ] Controlar limite legal de créditos adicionais.
- [ ] Abrir crédito suplementar.
- [ ] Controlar fonte de anulação.
- [ ] Abrir crédito especial.
- [ ] Abrir crédito extraordinário.
- [ ] Realizar remanejamento.
- [ ] Realizar transposição.
- [ ] Realizar transferência.
- [ ] Excluir remanejamento, transposição e transferência do limite de créditos adicionais quando aplicável.
- [ ] Criar solicitação de crédito adicional.
- [ ] Submeter solicitação à aprovação.
- [ ] Permitir aprovação apenas por usuário autorizado.
- [ ] Efetivar lançamento somente após aprovação.
- [ ] Registrar histórico das alterações.
- [ ] Emitir relatórios de créditos adicionais.

### Cenário recomendado para a POC

1. Selecionar uma dotação.
2. Criar solicitação de crédito suplementar.
3. Aprovar com usuário diferente.
4. Efetivar a alteração.
5. Demonstrar saldo anterior, alteração e saldo final.

---

## 3.4. Execução Orçamentária da Despesa

### 3.4.1. Controle de dotação

- [ ] Consultar saldo disponível.
- [ ] Impedir operação sem saldo.
- [ ] Criar reserva de dotação.
- [ ] Bloquear dotação para despesa vinculada a processo licitatório.
- [ ] Controlar execução conforme CMD.

### 3.4.2. Solicitação de empenho

- [ ] Criar solicitação de empenho.
- [ ] Informar unidade solicitante.
- [ ] Informar fornecedor.
- [ ] Informar objeto.
- [ ] Informar dotação.
- [ ] Informar fonte.
- [ ] Informar valor.
- [ ] Submeter para autorização.
- [ ] Restringir autorização a usuário competente.

### 3.4.3. Empenho

- [ ] Emitir Nota de Empenho.
- [ ] Vincular à solicitação.
- [ ] Vincular à licitação.
- [ ] Vincular ao contrato.
- [ ] Vincular à obra.
- [ ] Vincular ao convênio.
- [ ] Vincular a programa.
- [ ] Vincular a dívida fundada.
- [ ] Atualizar saldo da dotação.
- [ ] Permitir anulação de empenho.
- [ ] Preservar o vínculo com o lançamento original.

### 3.4.4. Liquidação

- [ ] Registrar liquidação.
- [ ] Vincular ao empenho.
- [ ] Registrar fornecedor.
- [ ] Registrar número da nota fiscal.
- [ ] Registrar série.
- [ ] Registrar data.
- [ ] Registrar valor.
- [ ] Anexar documento fiscal.
- [ ] Calcular retenções.
- [ ] Atualizar saldo a liquidar.
- [ ] Permitir estorno.
- [ ] Preservar registro original.

### 3.4.5. Pagamento

- [ ] Registrar pagamento.
- [ ] Validar fonte do documento.
- [ ] Validar compatibilidade com a conta bancária.
- [ ] Impedir uso de fonte inexistente ou incompatível.
- [ ] Registrar conta de pagamento.
- [ ] Atualizar saldo financeiro.
- [ ] Atualizar saldo a pagar.
- [ ] Permitir estorno do pagamento.
- [ ] Estornar automaticamente retenções associadas.

### 3.4.6. Receita

- [ ] Registrar arrecadação orçamentária.
- [ ] Registrar receita intraorçamentária.
- [ ] Registrar receita redutora.
- [ ] Distribuir valores por fonte conforme LOA.
- [ ] Permitir redistribuição autorizada.
- [ ] Permitir anulação e estorno.
- [ ] Preservar o lançamento de origem.

### Cenário recomendado para a POC

```text
Solicitação
→ Aprovação
→ Reserva
→ Empenho
→ Nota Fiscal
→ Liquidação
→ Retenções
→ Pagamento
→ Estorno
```

---

## 3.5. Extraorçamentário

- [ ] Registrar receita extraorçamentária.
- [ ] Registrar retenções.
- [ ] Registrar transferências financeiras.
- [ ] Registrar outros ingressos.
- [ ] Relacionar retenção ao pagamento de origem.
- [ ] Registrar despesa extraorçamentária.
- [ ] Controlar restos a pagar.
- [ ] Registrar recolhimento de retenções.
- [ ] Relacionar recolhimento à retenção do exercício.
- [ ] Relacionar recolhimento a retenções de exercícios anteriores.
- [ ] Controlar saldos pendentes.
- [ ] Efetuar baixa.
- [ ] Permitir estornos com preservação do histórico.

### Cenário recomendado para a POC

1. Gerar retenção durante a liquidação.
2. Demonstrar ingresso extraorçamentário.
3. Registrar recolhimento.
4. Demonstrar baixa do saldo pendente.

---

## 3.6. Financeiro, Caixa e Bancos

- [ ] Manter uma conta de caixa.
- [ ] Cadastrar contas bancárias.
- [ ] Associar contas a fontes de recursos.
- [ ] Atualizar automaticamente o saldo por fonte.
- [ ] Registrar transferências bancárias.
- [ ] Informar fonte do valor transferido.
- [ ] Controlar origem dos recursos.
- [ ] Controlar utilização dos recursos.
- [ ] Impedir uso sem ingresso prévio.
- [ ] Criar ordem de lançamento financeiro.
- [ ] Exigir autorização de usuário competente.
- [ ] Registrar baixas orçamentárias.
- [ ] Registrar baixas extraorçamentárias.
- [ ] Validar fonte do documento versus conta de pagamento.
- [ ] Realizar conciliação bancária.
- [ ] Emitir relatório de conciliação.
- [ ] Permitir estorno de pagamento.
- [ ] Estornar retenções relacionadas.

### Cenário recomendado para a POC

1. Cadastrar duas contas bancárias.
2. Registrar ingresso de receita.
3. Demonstrar saldo por fonte.
4. Realizar transferência.
5. Efetuar pagamento.
6. Gerar conciliação.

---

## 3.7. Lançamentos Patrimoniais

### 3.7.1. Receita por fato gerador

- [ ] Registrar receita pelo fato gerador.
- [ ] Vincular baixa à arrecadação.
- [ ] Atualizar saldo a realizar.

### 3.7.2. Dívida consolidada

- [ ] Cadastrar dívida consolidada.
- [ ] Relacionar dívida à amortização.
- [ ] Relacionar dívida a operação de crédito.
- [ ] Atualizar valores.
- [ ] Emitir relatórios.

### 3.7.3. Dívida ativa

- [ ] Cadastrar dívida ativa.
- [ ] Relacionar à receita orçamentária.
- [ ] Atualizar valores.
- [ ] Registrar recebimento.
- [ ] Efetuar baixa.
- [ ] Emitir relatórios.

### 3.7.4. Alienação de bens

- [ ] Selecionar classe do bem.
- [ ] Relacionar alienação à arrecadação.
- [ ] Calcular ganho ou perda.
- [ ] Reduzir automaticamente o valor da classe patrimonial.
- [ ] Gerar lançamento contábil de ganho ou perda.

### 3.7.5. Provisões

- [ ] Registrar provisões matemáticas previdenciárias.
- [ ] Atualizar provisões.
- [ ] Demonstrar lançamento contábil correspondente.

### 3.7.6. Movimentações patrimoniais

- [ ] Avaliação inicial.
- [ ] Reavaliação.
- [ ] Impairment.
- [ ] Custos subsequentes.
- [ ] Depreciação.
- [ ] Exaustão.
- [ ] Doações recebidas.
- [ ] Doações realizadas.
- [ ] Ajustes patrimoniais.
- [ ] Histórico de movimentações.

### 3.7.7. Estoque

- [ ] Registrar entradas.
- [ ] Registrar saídas.
- [ ] Registrar ajustes.
- [ ] Relacionar saída de estoque à liquidação da despesa.
- [ ] Atualizar saldo de estoque.
- [ ] Emitir relatório de movimentação.

---

## 3.8. Licitações e Contratos integrados à Contabilidade

- [ ] Cadastrar processo licitatório.
- [ ] Informar modalidade.
- [ ] Informar objeto.
- [ ] Cadastrar participantes.
- [ ] Identificar vencedor.
- [ ] Cadastrar contratos.
- [ ] Relacionar contrato ao vencedor.
- [ ] Anexar edital.
- [ ] Anexar ata.
- [ ] Anexar contrato.
- [ ] Controlar vencimento.
- [ ] Controlar execução financeira.
- [ ] Apresentar valor contratado.
- [ ] Apresentar valor empenhado.
- [ ] Apresentar valor liquidado.
- [ ] Apresentar valor pago.
- [ ] Apresentar saldo a empenhar.
- [ ] Integrar licitação e contrato ao empenho.

### Cenário recomendado para a POC

1. Cadastrar licitação.
2. Cadastrar fornecedor vencedor.
3. Cadastrar contrato.
4. Vincular empenho.
5. Demonstrar evolução financeira.

---

## 3.9. Relatórios Contábeis, Fiscais e Gerenciais

### 3.9.1. Relatórios obrigatórios

- [ ] Diário.
- [ ] Razão.
- [ ] Balancete Contábil.
- [ ] Balancetes Mensais.
- [ ] RREO.
- [ ] RGF.
- [ ] PCA.
- [ ] Balanço Anual.
- [ ] Demonstrativos orçamentários.
- [ ] Demonstrativos financeiros.
- [ ] Demonstrativos patrimoniais.
- [ ] Demonstrativos fiscais.
- [ ] Relatórios consolidados.
- [ ] Relatórios individuais por unidade.

### 3.9.2. Planejamento

- [ ] Relatórios do PPA.
- [ ] Relatórios da LDO.
- [ ] Relatórios da LOA.
- [ ] CMD.
- [ ] MBA.
- [ ] Créditos adicionais.
- [ ] Modificações do PPA e LDO.

### 3.9.3. Relatórios gerenciais

- [ ] Receita.
- [ ] Despesa.
- [ ] Conciliação.
- [ ] Limites constitucionais.
- [ ] Limites legais.
- [ ] Evolução da receita.
- [ ] Evolução da despesa.
- [ ] Base de cálculo do PASEP.
- [ ] Contribuições para o PASEP.
- [ ] Relatórios personalizados pelo usuário.
- [ ] Gráficos de controle interno.

### 3.9.4. Exportação e assinatura

- [ ] Exportar PDF.
- [ ] Exportar Word.
- [ ] Exportar Excel.
- [ ] Imprimir.
- [ ] Publicar no Diário Oficial Municipal.
- [ ] Assinar documento individualmente.
- [ ] Assinar documentos em lote.
- [ ] Utilizar certificado digital ICP-Brasil.

---

## 3.10. Segurança, Controle de Acesso e Auditoria

### 3.10.1. Perfis e segregação

- [ ] Cadastrar usuários.
- [ ] Criar perfis.
- [ ] Criar permissões.
- [ ] Separar execução orçamentária.
- [ ] Separar execução financeira.
- [ ] Separar controle.
- [ ] Separar consulta.
- [ ] Restringir acesso por unidade gestora.
- [ ] Impedir acesso de uma unidade aos dados de outra.
- [ ] Permitir acesso global somente a perfis autorizados.

### 3.10.2. Logs

- [ ] Registrar inclusão.
- [ ] Registrar alteração.
- [ ] Registrar exclusão.
- [ ] Identificar usuário.
- [ ] Registrar data e hora.
- [ ] Registrar origem/local da operação.
- [ ] Manter versão anterior.
- [ ] Manter cópia de registro excluído.
- [ ] Exibir histórico completo.
- [ ] Permitir rastrear lançamento até o usuário responsável.

### Cenário recomendado para a POC

1. Entrar com operador.
2. Criar solicitação.
3. Entrar com gestor.
4. Aprovar.
5. Demonstrar bloqueio entre unidades.
6. Consultar o log.

---

## 3.11. Help Desk e Service Desk

- [ ] Abrir chamado.
- [ ] Categorizar chamado.
- [ ] Definir prioridade.
- [ ] Atribuir responsável.
- [ ] Alterar status.
- [ ] Registrar respostas.
- [ ] Acompanhar em tempo real.
- [ ] Manter histórico.
- [ ] Encerrar chamado.
- [ ] Integrar atendimento com e-mail.
- [ ] Disponibilizar telefone.
- [ ] Disponibilizar WhatsApp.
- [ ] Disponibilizar chat online.
- [ ] Demonstrar atendimento em horário comercial.

---

## 3.12. Integração com Tributos e Arrecadação

- [ ] Importar dados tributários.
- [ ] Importar por layout.
- [ ] Importar por API.
- [ ] Validar arquivo.
- [ ] Identificar erros.
- [ ] Registrar histórico de importação.
- [ ] Registrar receita pelo fato gerador.
- [ ] Relacionar lançamento tributário à arrecadação.
- [ ] Registrar dívida ativa.
- [ ] Atualizar dívida ativa.
- [ ] Baixar dívida ativa pelo recebimento.
- [ ] Criar modelos de lançamentos.
- [ ] Criar receitas orçamentárias.
- [ ] Criar receitas extraorçamentárias.

### Contorno aceitável para demonstração

Quando não houver acesso ao ambiente real do Município, deverá existir:

- arquivo modelo;
- tela de importação;
- validação;
- relatório de inconsistências;
- registro dos lançamentos gerados;
- histórico da execução.

---

## 3.13. Integração com Protocolo

- [ ] Integrar com sistema de protocolo.
- [ ] Receber identificação do processo.
- [ ] Relacionar processo ao registro contábil.
- [ ] Condicionar avanço da tramitação ao registro contábil.
- [ ] Atualizar status do processo.
- [ ] Registrar histórico de integração.
- [ ] Exibir falhas ou pendências.

### Cenário recomendado para a POC

```text
Processo recebido
→ Etapa “Aguardando Contabilidade”
→ Empenho registrado
→ Processo liberado para próxima etapa
```

---

## 3.14. Integrações Governamentais

### 3.14.1. TCE

- [ ] Exportar dados para o Tribunal de Contas.
- [ ] Selecionar período.
- [ ] Validar dados antes da exportação.
- [ ] Gerar arquivo no formato exigido.
- [ ] Manter histórico.
- [ ] Registrar status.
- [ ] Registrar erros.

### 3.14.2. SICONFI

- [ ] Exportar MSC.
- [ ] Exportar DCA.
- [ ] Exportar RREO.
- [ ] Exportar RGF.
- [ ] Selecionar período.
- [ ] Validar informações.
- [ ] Gerar arquivo.
- [ ] Manter histórico.
- [ ] Exibir status e erros.

### 3.14.3. Obrigações fiscais

- [ ] Gerar DIRF de prestadores.
- [ ] Gerar SEFIP de prestadores.
- [ ] Enviar ou gerar dados para EFD-Reinf.
- [ ] Enviar ou gerar dados para eSocial de prestadores pessoa física.
- [ ] Registrar período de competência.
- [ ] Exibir validações.
- [ ] Manter histórico.
- [ ] Exibir retorno ou protocolo quando aplicável.

### Observação para a POC

Não é suficiente apresentar somente uma tela estática. Deve existir, conforme o caso:

- configuração;
- seleção de período;
- geração;
- validação;
- histórico;
- download;
- status;
- log de erro.

---

## 3.15. Automação Fiscal e Notas Fiscais Eletrônicas

### 3.15.1. Captura de documentos fiscais

- [ ] Capturar NFe.
- [ ] Capturar CTe.
- [ ] Capturar NFSe.
- [ ] Baixar XML.
- [ ] Visualizar ou baixar PDF.
- [ ] Identificar documentos emitidos contra o Município.
- [ ] Validar fornecedor.
- [ ] Validar valores.
- [ ] Utilizar e-CNPJ A1 quando aplicável.
- [ ] Realizar manifestação do destinatário quando aplicável.
- [ ] Relacionar documento ao empenho.
- [ ] Relacionar documento à liquidação.
- [ ] Registrar histórico da captura.
- [ ] Exibir erros.

### Cenário recomendado para a POC

1. Capturar ou importar nota modelo.
2. Identificar fornecedor.
3. Vincular a empenho.
4. Liquidar.
5. Calcular retenções.

---

## 3.16. Gestão Fiscal e Retenções

- [ ] Parametrizar INSS.
- [ ] Parametrizar IR.
- [ ] Parametrizar SEST.
- [ ] Parametrizar SENAT.
- [ ] Parametrizar SENAR.
- [ ] Parametrizar RAT.
- [ ] Parametrizar outras retenções.
- [ ] Definir base de cálculo.
- [ ] Definir alíquota.
- [ ] Definir regra por serviço.
- [ ] Calcular automaticamente.
- [ ] Relacionar retenção à liquidação.
- [ ] Relacionar retenção ao pagamento.
- [ ] Comparar valor devido versus valor retido.
- [ ] Gerar tabela analítica.
- [ ] Gerar gráficos.
- [ ] Filtrar por período.
- [ ] Filtrar por exercício.
- [ ] Disponibilizar dados para eSocial.
- [ ] Disponibilizar dados para EFD-Reinf.

---

# 4. Portal da Transparência Fiscal

## 4.1. Publicação e atualização

- [ ] Publicar automaticamente.
- [ ] Publicar em tempo real.
- [ ] Publicar de forma tempestiva.
- [ ] Integrar com a contabilidade.
- [ ] Permitir acesso público sem autenticação para consultas públicas.
- [ ] Atender à LC nº 131/2009.
- [ ] Atender ao Decreto nº 10.540/2020.
- [ ] Observar LGPD.
- [ ] Disponibilizar dados abertos.
- [ ] Atender às exigências do TCE.

## 4.2. Despesas

- [ ] Empenho.
- [ ] Liquidação.
- [ ] Pagamento.
- [ ] Unidade orçamentária.
- [ ] Função.
- [ ] Subfunção.
- [ ] Natureza da despesa.
- [ ] Programa.
- [ ] Ação.
- [ ] Fonte de recursos.
- [ ] Beneficiário.
- [ ] CPF/CNPJ, respeitadas as exceções legais.
- [ ] Desembolsos extraorçamentários.
- [ ] Convênios.
- [ ] Licitação.
- [ ] Dispensa.
- [ ] Inexigibilidade.
- [ ] Número do processo.
- [ ] Contrato.

## 4.3. Receitas

- [ ] Previsão.
- [ ] Lançamento.
- [ ] Arrecadação.
- [ ] Categoria.
- [ ] Origem.
- [ ] Espécie.
- [ ] Fonte.
- [ ] Unidade gestora.
- [ ] Comparativos e evolução.

## 4.4. Relatórios públicos

- [ ] Balancetes Mensais.
- [ ] RREO.
- [ ] RGF.
- [ ] Balanço Anual.
- [ ] Outros demonstrativos legais.
- [ ] Arquivos avulsos.
- [ ] Título personalizado.
- [ ] Subtítulo personalizado.
- [ ] Links externos.

## 4.5. Consulta, dados abertos e exportação

- [ ] Pesquisa.
- [ ] Filtros.
- [ ] Gráficos.
- [ ] Consulta direta a receitas.
- [ ] Consulta direta a despesas.
- [ ] Consulta direta a demonstrativos.
- [ ] Exportar CSV.
- [ ] Exportar TXT.
- [ ] Exportar PDF.
- [ ] Disponibilizar APIs públicas.
- [ ] Disponibilizar dados de execução orçamentária.
- [ ] Disponibilizar dados de execução financeira.

## 4.6. Ajuda e suporte ao cidadão

- [ ] Menu de ajuda.
- [ ] Manual de navegação.
- [ ] Perguntas frequentes.
- [ ] Informações de contato.
- [ ] Canal de suporte.

### Cenário recomendado para a POC

1. Criar empenho no sistema.
2. Liquidar e pagar.
3. Atualizar o Portal.
4. Consultar publicamente.
5. Filtrar.
6. Exportar em CSV, TXT e PDF.
7. Consultar pela API.

---

# 5. Sequência recomendada da apresentação

## Bloco 1 — Configuração e segurança

- usuários;
- perfis;
- unidades;
- segregação;
- logs.

## Bloco 2 — Planejamento

- PPA;
- LDO;
- LOA;
- CMD;
- MBA;
- créditos adicionais.

## Bloco 3 — Execução da despesa

- solicitação;
- aprovação;
- reserva;
- empenho;
- liquidação;
- retenções;
- pagamento;
- estorno.

## Bloco 4 — Financeiro

- caixa;
- bancos;
- fontes;
- transferências;
- conciliação.

## Bloco 5 — Patrimônio

- bem;
- depreciação;
- alienação;
- dívida ativa;
- estoque.

## Bloco 6 — Licitações e contratos

- processo;
- participantes;
- vencedor;
- contrato;
- execução financeira.

## Bloco 7 — Integrações

- Tributos;
- Protocolo;
- TCE;
- SICONFI;
- eSocial;
- EFD-Reinf;
- DIRF;
- SEFIP;
- notas fiscais eletrônicas.

## Bloco 8 — Relatórios

- Diário;
- Razão;
- Balancete;
- RREO;
- RGF;
- PCA;
- assinatura digital;
- exportações.

## Bloco 9 — Portal da Transparência

- publicação automática;
- despesas;
- receitas;
- relatórios;
- filtros;
- exportações;
- API;
- ajuda.

## Bloco 10 — Suporte

- abertura de ticket;
- atendimento;
- histórico;
- encerramento.

---

# 6. Base modelo mínima para a POC

- [ ] Município e exercício configurados.
- [ ] Pelo menos 2 unidades gestoras.
- [ ] Pelo menos 3 usuários com perfis diferentes.
- [ ] Plano de contas.
- [ ] Fontes de recursos.
- [ ] PPA.
- [ ] LDO.
- [ ] LOA.
- [ ] Dotações.
- [ ] Cronograma Mensal de Desembolso.
- [ ] Metas Bimestrais de Arrecadação.
- [ ] Fornecedores.
- [ ] Licitação.
- [ ] Contrato.
- [ ] Empenhos.
- [ ] Notas fiscais.
- [ ] Liquidações.
- [ ] Pagamentos.
- [ ] Retenções.
- [ ] Contas bancárias.
- [ ] Movimentações financeiras.
- [ ] Bens patrimoniais.
- [ ] Dívida ativa.
- [ ] Dívida consolidada.
- [ ] Estoque.
- [ ] Dados suficientes para RREO, RGF, PCA e balancetes.
- [ ] Dados publicados no Portal da Transparência.
- [ ] Tickets de suporte.
- [ ] Histórico de logs.
- [ ] Arquivos modelo para TCE, SICONFI e obrigações fiscais.

---

# 7. Evidências que devem estar prontas

Para cada requisito, preparar pelo menos uma evidência:

- tela funcional;
- operação concluída;
- documento gerado;
- relatório;
- arquivo exportado;
- log;
- histórico;
- protocolo;
- status;
- documento anexado;
- consulta pública;
- integração demonstrada;
- validação de erro;
- controle de permissão.

Evitar demonstrar somente:

- telas estáticas;
- botões sem ação;
- menus vazios;
- integrações apenas “planejadas”;
- relatórios sem dados;
- arquivos fictícios sem geração pelo sistema;
- APIs sem endpoint consultável;
- logs sem histórico real.

---

# 8. Pontos críticos de reprovação

Prioridade máxima antes da viagem:

1. [ ] Empenho, liquidação, retenção e pagamento.
2. [ ] PPA, LDO e LOA integrados.
3. [ ] Créditos adicionais e saldos orçamentários.
4. [ ] Partidas dobradas e plano de contas público.
5. [ ] RREO, RGF, PCA e Balancetes.
6. [ ] Exportação TCE.
7. [ ] Exportação SICONFI.
8. [ ] eSocial e EFD-Reinf.
9. [ ] Retenções automáticas.
10. [ ] Captura de NFe, CTe e NFSe.
11. [ ] Assinatura ICP-Brasil.
12. [ ] Publicação automática no Portal da Transparência.
13. [ ] Exportações CSV, TXT e PDF do Portal.
14. [ ] API pública do Portal.
15. [ ] Logs com versionamento.
16. [ ] Segregação entre unidades gestoras.
17. [ ] Integração com Tributos.
18. [ ] Integração com Protocolo.
19. [ ] Help Desk / Service Desk.
20. [ ] Base modelo completa e coerente.

---

# 9. Matriz de avaliação interna

| Status | Definição |
|---|---|
| **Atende** | Funcionalidade pronta, navegável, executável e demonstrável |
| **Atende parcialmente** | Existe, mas falta etapa, regra, relatório ou integração |
| **Não atende** | Funcionalidade inexistente |
| **Precisa testar** | Implementação existente, mas sem validação completa |
| **Dependência externa** | Requer credencial, certificado, API ou ambiente de terceiro |
| **Contorno demonstrável** | Pode ser demonstrado por ambiente de teste, arquivo oficial ou adaptador funcional |
| **Crítico para POC** | Falha pode causar reprovação |
| **Ajuste pós-POC** | Melhoria não essencial à demonstração do requisito |

---

# 10. Fontes do processo utilizadas

Este checklist foi estruturado a partir de:

- Edital do Pregão Eletrônico nº 00042/2026;
- Processo Administrativo nº 260702PE00042;
- Anexo I — Termo de Referência e especificações;
- Anexo 01 ao Termo de Referência — modelo de proposta;
- Seção “Informações Complementares — Especificação dos Sistemas”;
- Seção “Sistema de Contabilidade Pública”;
- Módulos 1 a 10 descritos no TR;
- Seção “Portal de Transparência Fiscal”;
- Seção “Prova de Conceito”;
- Minuta contratual e demais anexos do processo.

---

**Documento de trabalho interno — Robonuvem Soluções Digitais Ltda.**
