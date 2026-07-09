O Módulo 13 — Saúde deve ser o módulo responsável pela gestão da rede municipal de saúde: unidades, pacientes, atendimentos, agendamentos, profissionais, prontuários, procedimentos, farmácia, vacinação, vigilância, regulação, relatórios e integração com sistemas públicos de saúde.

Esse é um módulo sensível e estratégico, mas também mais complexo. Para o CeleriFlow, eu estruturaria de forma modular, começando por uma base bem vendável e evoluindo para recursos mais avançados.

Módulo 13 — Saúde

Objetivo do módulo

Gerenciar de forma integrada:

Secretaria Municipal de Saúde;

UBS;

ESF;

unidades de atendimento;

pacientes;

profissionais de saúde;

agendamentos;

acolhimento;

triagem;

prontuário eletrônico;

atendimentos;

procedimentos;

exames;

encaminhamentos;

farmácia;

medicamentos;

vacinação;

vigilância em saúde;

regulação;

transporte sanitário;

relatórios;

integrações com e-SUS / PEC / sistemas públicos.

Diferença entre Saúde, Cadastros Gerais e Atendimento

Cadastros Gerais

Guarda a pessoa:

nome;

CPF;

CNS, se cadastrado;

endereço;

telefone;

documentos;

contatos.

Atendimento e Ouvidoria

Registra demandas gerais do cidadão:

reclamação;

solicitação;

denúncia;

elogio;

pedido de informação;

atendimento administrativo.

Saúde

Registra dados assistenciais e administrativos da rede de saúde:

paciente;

unidade de saúde;

agenda;

consulta;

prontuário;

vacina;

medicamento;

exame;

encaminhamento;

procedimento.

Atenção: dados de saúde são dados sensíveis. Esse módulo precisa ter controle de acesso muito mais rígido que os módulos administrativos.

Menu sugerido do módulo

Eu organizaria assim:

Painel da Saúde

Unidades de Saúde

Pacientes

Profissionais de Saúde

Equipes / ESF

Agenda

Agendamentos

Acolhimento / Triagem

Atendimentos

Prontuário Eletrônico

Procedimentos

Exames

Encaminhamentos

Regulação

Farmácia

Medicamentos

Vacinação

Vigilância em Saúde

Programas de Saúde

Transporte Sanitário

Documentos e Laudos

e-SUS / Integrações

Relatórios

Parâmetros

Auditoria

1. Painel da Saúde

Tela inicial para gestores da Secretaria de Saúde.

Indicadores importantes:

pacientes cadastrados;

atendimentos do dia;

consultas agendadas;

consultas realizadas;

faltas;

profissionais em atendimento;

unidades ativas;

medicamentos em estoque baixo;

vacinas aplicadas;

exames solicitados;

encaminhamentos pendentes;

filas de regulação;

atendimentos por unidade;

atendimentos por especialidade;

produção mensal;

alertas de dados incompletos;

pendências de integração e-SUS.

Atalhos rápidos:

novo paciente;

novo agendamento;

iniciar atendimento;

consultar prontuário;

registrar vacina;

dispensar medicamento;

solicitar exame;

gerar relatório.

2. Unidades de Saúde

Cadastro das unidades vinculadas à Secretaria Municipal de Saúde.

Tipos de unidade:

UBS;

ESF;

posto de saúde;

centro de saúde;

pronto atendimento;

centro odontológico;

farmácia municipal;

vigilância sanitária;

vigilância epidemiológica;

CAPS, se houver;

laboratório municipal;

central de regulação;

secretaria municipal de saúde.

Campos principais

nome da unidade;

tipo de unidade;

CNES, se houver;

CNPJ, se aplicável;

endereço;

bairro;

telefone;

e-mail;

responsável;

horário de funcionamento;

serviços oferecidos;

equipes vinculadas;

status ativo/inativo.

3. Pacientes

Cadastro de pacientes, vinculado ao Módulo 2 — Cadastros Gerais.

Campos principais

Dados pessoais

nome completo;

nome social;

CPF;

CNS / Cartão SUS;

RG;

data de nascimento;

sexo;

nome da mãe;

nome do pai;

nacionalidade;

naturalidade;

endereço;

telefone;

WhatsApp;

e-mail;

contato de emergência.

Dados de saúde básicos

unidade de referência;

equipe de referência;

microárea;

agente comunitário responsável;

tipo sanguíneo, se informado;

alergias conhecidas;

condições importantes declaradas;

necessidades especiais;

observações clínicas restritas.

Situação

ativo;

inativo;

mudou de município;

falecido;

cadastro incompleto;

aguardando validação.

Regra importante: nem todos os usuários devem ver dados clínicos. Um atendente administrativo pode ver dados cadastrais, mas não necessariamente prontuário.

4. Profissionais de Saúde

Cadastro dos profissionais que atuam nas unidades.

Tipos:

médico;

enfermeiro;

técnico de enfermagem;

dentista;

auxiliar de saúde bucal;

farmacêutico;

fisioterapeuta;

psicólogo;

nutricionista;

agente comunitário de saúde;

agente de endemias;

recepcionista;

coordenador;

regulador;

outro profissional.

Campos principais

servidor vinculado ao RH;

nome;

CPF;

conselho profissional;

número do registro;

CBO;

especialidade;

unidade de atuação;

equipe vinculada;

agenda disponível;

status.

5. Equipes / ESF

Controle das equipes de Estratégia Saúde da Família e demais equipes de atenção básica.

Campos principais

nome da equipe;

código da equipe;

unidade vinculada;

profissionais vinculados;

área de abrangência;

microáreas;

agente comunitário;

população acompanhada;

status.

Funcionalidades:

vincular paciente à equipe;

vincular paciente à microárea;

gerar relatório por equipe;

acompanhar produção por equipe.

6. Agenda

Submódulo para configurar agendas de profissionais, unidades e serviços.

Funcionalidades

criar agenda por profissional;

criar agenda por unidade;

criar agenda por especialidade;

definir dias e horários;

definir quantidade de vagas;

bloquear horários;

criar encaixes;

definir retorno;

configurar duração padrão do atendimento;

configurar agenda por tipo de serviço.

Exemplos de agenda:

clínica geral;

enfermagem;

odontologia;

vacinação;

pré-natal;

puericultura;

psicologia;

fisioterapia;

coleta de exames;

atendimento domiciliar.

7. Agendamentos

Controle dos atendimentos marcados.

Campos principais

paciente;

unidade;

profissional;

especialidade;

serviço;

data;

horário;

origem do agendamento;

prioridade;

observações;

status.

Status sugeridos:

agendado;

confirmado;

aguardando atendimento;

em atendimento;

atendido;

faltou;

cancelado;

remarcado;

encaixe.

Funcionalidades:

agendar;

reagendar;

cancelar;

confirmar presença;

registrar falta;

notificar paciente;

imprimir comprovante;

enviar lembrete por WhatsApp/e-mail/SMS.

8. Acolhimento / Triagem

Etapa inicial antes do atendimento profissional.

Funcionalidades

registrar chegada do paciente;

classificar tipo de atendimento;

registrar queixa inicial;

medir sinais vitais;

registrar prioridade;

encaminhar para profissional;

registrar observação de acolhimento;

controlar fila de atendimento.

Campos possíveis:

pressão arterial;

temperatura;

frequência cardíaca;

frequência respiratória;

peso;

altura;

glicemia, se aplicável;

saturação;

classificação de risco, se aplicável;

queixa principal.

9. Atendimentos

Registro do atendimento realizado.

Tipos de atendimento:

consulta médica;

atendimento de enfermagem;

atendimento odontológico;

atendimento psicológico;

atendimento nutricional;

procedimento;

vacinação;

visita domiciliar;

atendimento coletivo;

acolhimento;

retorno;

teleatendimento, se previsto.

Campos principais

paciente;

profissional;

unidade;

data e hora;

tipo de atendimento;

motivo;

evolução;

conduta;

procedimentos realizados;

exames solicitados;

medicamentos prescritos;

encaminhamentos;

documentos gerados;

retorno previsto.

10. Prontuário Eletrônico

Esse é o coração clínico do módulo.

Funcionalidades

histórico de atendimentos;

evolução clínica;

sinais vitais;

diagnósticos, se usado;

alergias;

condições acompanhadas;

prescrições;

exames;

procedimentos;

vacinas;

documentos clínicos;

encaminhamentos;

anexos;

observações restritas.

Regras importantes

prontuário deve ter acesso restrito;

toda visualização deve gerar log;

alteração de evolução deve gerar histórico;

registros assinados devem ser bloqueados;

dados clínicos não devem aparecer para usuários sem permissão;

informações sensíveis não devem aparecer em relatórios públicos.

11. Procedimentos

Controle dos procedimentos realizados na rede.

Exemplos:

curativo;

aferição de pressão;

teste rápido;

coleta de exame;

aplicação de medicação;

nebulização;

retirada de pontos;

atendimento odontológico;

visita domiciliar;

procedimento de enfermagem;

procedimento coletivo.

Campos

paciente;

procedimento;

profissional;

unidade;

data;

quantidade;

observações;

documento/anexo;

código de procedimento, se aplicável.

12. Exames

Controle de exames solicitados, agendados e entregues.

Funcionalidades

solicitar exame;

anexar pedido;

autorizar exame;

agendar coleta;

registrar realização;

anexar resultado;

avisar paciente;

vincular ao prontuário;

encaminhar retorno.

Tipos:

laboratório;

imagem;

eletrocardiograma;

preventivo;

testes rápidos;

exames especializados.

Status:

solicitado;

autorizado;

agendado;

realizado;

resultado disponível;

cancelado;

vencido.

13. Encaminhamentos

Controle dos pacientes encaminhados para outros serviços.

Tipos:

especialidade médica;

exame especializado;

fisioterapia;

psicologia;

odontologia;

hospital;

serviço externo;

regulação estadual;

transporte sanitário;

assistência social, quando necessário.

Campos

paciente;

unidade de origem;

profissional solicitante;

destino;

especialidade;

justificativa;

prioridade;

documentos anexos;

status.

Status:

solicitado;

em análise;

autorizado;

agendado;

realizado;

recusado;

cancelado;

aguardando vaga.

14. Regulação

Submódulo para controlar filas e autorizações.

Funcionalidades

receber solicitações;

classificar prioridade;

organizar fila;

autorizar atendimento;

negar com justificativa;

encaminhar para unidade executante;

controlar vagas;

registrar agendamento externo;

acompanhar retorno;

gerar relatórios de fila.

Filtros importantes:

especialidade;

unidade solicitante;

prioridade;

data da solicitação;

tempo de espera;

paciente;

status.

15. Farmácia

Submódulo para controle da farmácia municipal.

Funcionalidades

cadastro de medicamentos;

controle de estoque;

entrada de medicamentos;

saída/dispensação;

controle por lote;

controle de validade;

estoque mínimo;

bloqueio de medicamento vencido;

dispensação por paciente;

histórico de dispensação;

relatório de consumo;

solicitação de reposição;

integração com almoxarifado.

Campos da dispensação

paciente;

medicamento;

quantidade;

lote;

validade;

profissional responsável;

unidade;

prescrição vinculada;

data;

observações.

16. Medicamentos

Cadastro dos medicamentos e insumos de saúde.

Campos principais

nome do medicamento;

princípio ativo;

apresentação;

concentração;

unidade de medida;

código interno;

lote;

validade;

estoque mínimo;

estoque máximo;

controlado: sim/não;

uso contínuo: sim/não;

status.

Atenção: medicamentos controlados exigem controle mais rigoroso de permissão, dispensação e auditoria.

17. Prescrições

Submódulo para registrar prescrições feitas pelos profissionais.

Funcionalidades

prescrever medicamento;

definir dose;

definir frequência;

definir duração;

imprimir receita;

enviar para farmácia;

registrar retirada;

renovar prescrição, se permitido;

bloquear edição após assinatura.

Campos:

paciente;

profissional;

medicamento;

posologia;

quantidade;

duração;

orientações;

data;

assinatura;

status.

18. Vacinação

Controle básico de vacinação municipal.

Funcionalidades

cadastrar vacinas;

registrar aplicação;

controlar lote;

controlar validade;

registrar dose;

registrar profissional;

registrar unidade;

gerar comprovante;

consultar histórico vacinal;

alertar próximas doses;

controlar estoque de vacinas.

Campos:

paciente;

vacina;

dose;

lote;

fabricante;

validade;

data de aplicação;

unidade;

profissional;

estratégia/campanha;

observações.

19. Vigilância em Saúde

Pode ser dividido depois em vigilância epidemiológica, sanitária, ambiental e endemias.

Vigilância Epidemiológica

Funcionalidades:

notificação de agravos;

acompanhamento de casos;

surtos;

campanhas;

relatórios epidemiológicos;

visitas;

monitoramento de condições prioritárias.

Vigilância Sanitária

Funcionalidades:

cadastro de estabelecimentos;

inspeções;

alvarás sanitários;

autos de infração;

notificações;

relatórios;

documentos.

Endemias

Funcionalidades:

imóveis visitados;

focos encontrados;

ações de controle;

agentes de endemias;

bairros/localidades;

relatórios.

20. Programas de Saúde

Submódulo para acompanhamento de grupos e programas.

Exemplos:

pré-natal;

puericultura;

hipertensos;

diabéticos;

saúde mental;

saúde bucal;

planejamento familiar;

tabagismo;

imunização;

idosos;

saúde da mulher;

saúde da criança;

atenção domiciliar.

Funcionalidades:

vincular paciente ao programa;

registrar acompanhamento;

controlar retornos;

gerar listas de acompanhamento;

emitir relatórios.

21. Transporte Sanitário

Controle de transporte para pacientes.

Funcionalidades:

solicitação de transporte;

cadastro de paciente;

destino;

motivo;

data e horário;

veículo;

motorista;

acompanhante;

autorização;

confirmação;

relatório de viagens.

Status:

solicitado;

autorizado;

agendado;

realizado;

cancelado;

não compareceu.

Integração futura: Frotas, para veículo, motorista, rota e combustível.

22. Documentos e Laudos

Documentos gerados no módulo.

Exemplos:

declaração de comparecimento;

atestado;

encaminhamento;

solicitação de exame;

receita;

relatório de atendimento;

laudo;

ficha de vacinação;

comprovante de agendamento;

termo de consentimento;

documento para transporte sanitário.

Funcionalidades:

gerar documento por modelo;

assinar eletronicamente;

validar por QR Code;

armazenar no GED;

imprimir;

enviar ao paciente, quando permitido.

23. e-SUS / Integrações

Esse submódulo deve ser pensado desde o início, mesmo que no MVP comece com exportações ou integração parcial.

Funcionalidades desejadas

parametrizar unidade;

parametrizar CNES;

parametrizar profissional;

parametrizar CBO;

controlar inconsistências cadastrais;

gerar dados para integração;

registrar envio;

registrar retorno;

acompanhar erros;

reprocessar registros.

Possíveis integrações futuras:

e-SUS APS / PEC;

CNES;

CADSUS, se disponível;

sistemas estaduais;

laboratórios;

farmácia;

regulação;

BI de saúde.

Como você já comentou anteriormente que possui módulo/API e-SUS no CeleriFlow, eu manteria essa parte como um diferencial comercial, mas sem prometer integração completa em edital antes de validar o escopo técnico específico de cada município.

24. Portal do Paciente

Área pública ou semi-pública para o cidadão.

O paciente poderia:

consultar agendamentos;

receber lembretes;

solicitar atendimento;

consultar comprovantes;

baixar documentos permitidos;

acompanhar encaminhamentos;

consultar vacinação;

solicitar transporte sanitário;

atualizar contato;

anexar documentos.

Atenção: o portal não deve expor prontuário completo sem uma regra de segurança muito bem definida.

25. Relatórios

Relatórios administrativos:

pacientes cadastrados;

pacientes por unidade;

pacientes por bairro;

atendimentos por período;

atendimentos por unidade;

atendimentos por profissional;

agendamentos;

faltas;

produção por equipe;

produção por especialidade;

encaminhamentos pendentes;

filas de regulação;

transporte sanitário.

Relatórios assistenciais/operacionais:

procedimentos realizados;

vacinação;

medicamentos dispensados;

consumo de medicamentos;

estoque baixo;

medicamentos vencidos;

exames solicitados;

exames realizados;

programas de saúde;

visitas domiciliares;

vigilância em saúde.

Relatórios de gestão:

produtividade por unidade;

tempo médio de espera;

demanda reprimida;

absenteísmo;

indicadores por território;

pacientes acompanhados por programa;

produção mensal para conferência.

26. Parâmetros

Configurações do módulo.

Exemplos:

unidades de saúde;

especialidades;

tipos de atendimento;

tipos de agenda;

procedimentos;

vacinas;

medicamentos;

programas de saúde;

equipes;

microáreas;

prioridades;

modelos de documentos;

permissões por perfil;

regras de acesso ao prontuário;

parâmetros e-SUS;

horários de atendimento;

bloqueios de agenda;

notificações.

27. Auditoria

Esse módulo precisa da auditoria mais forte do sistema.

Registrar:

cadastro de paciente;

alteração cadastral;

acesso ao prontuário;

criação de atendimento;

edição de atendimento;

exclusão/inativação;

agendamento;

cancelamento de agendamento;

prescrição;

dispensação de medicamento;

vacinação;

emissão de documento;

alteração em dado sensível;

exportação de dados;

envio para integração;

visualização de informação clínica.

Campos do log:

usuário;

perfil;

unidade;

paciente;

data e hora;

IP;

ação;

registro afetado;

valor anterior;

novo valor;

justificativa;

motivo de acesso, quando necessário.

Entidades principais do módulo

Para desenvolvimento, eu pensaria nestas entidades/tabelas:

Unidade de Saúde

Paciente

Profissional de Saúde

Equipe de Saúde

Microárea

Agenda

Agendamento

Acolhimento

Triagem

Atendimento

Prontuário

Evolução

Procedimento

Exame

Encaminhamento

Regulação

Medicamento

Estoque de Medicamento

Dispensação

Prescrição

Vacina

Aplicação de Vacina

Vigilância em Saúde

Programa de Saúde

Transporte Sanitário

Documento de Saúde

Integração e-SUS

Relatório de Saúde

Auditoria de Saúde

Integrações com outros módulos

Com Cadastros Gerais

Para usar:

paciente;

responsável;

endereço;

documentos;

telefone;

contato de emergência.

Com RH e Folha

Para usar:

profissionais de saúde;

vínculos;

cargos;

lotações;

unidades;

escalas futuras.

Com Administração Geral

Para usar:

Secretaria Municipal de Saúde;

unidades;

setores;

responsáveis;

calendário administrativo.

Com Documentos e GED

Para armazenar:

laudos;

receitas;

encaminhamentos;

exames;

atestados;

documentos de paciente;

termos;

relatórios;

comprovantes.

Com Processo Digital e Protocolo

Para:

solicitações formais;

processos administrativos de saúde;

pedidos de exame;

reclamações formalizadas;

solicitação de transporte;

processos de regulação, se aplicável.

Com Atendimento e Ouvidoria

Para:

reclamações sobre atendimento;

solicitações de agendamento;

demandas da população;

acompanhamento de manifestações da saúde.

Com Portal e Transparência

Para:

portal do paciente;

carta de serviços da saúde;

publicação de campanhas;

indicadores públicos agregados;

documentos autenticáveis.

Com Almoxarifado

Para:

estoque de medicamentos;

insumos;

materiais de enfermagem;

EPIs;

vacinas, quando controladas no estoque.

Com Frotas

Para:

transporte sanitário;

ambulâncias;

motoristas;

rotas;

viagens;

manutenção.

Com Configurações e Integrações

Para:

permissões;

LGPD;

logs;

e-SUS;

APIs;

notificações;

assinatura digital;

backup;

segurança.

Regras importantes

Paciente deve estar vinculado ao Cadastro Geral.

Dados clínicos devem ser separados de dados cadastrais.

Prontuário deve ter controle forte de acesso.

Todo acesso ao prontuário deve ser auditado.

Atendimento assinado ou finalizado não deve ser editado sem reabertura formal.

Medicamento vencido não deve ser dispensado.

Dispensação deve controlar lote e validade.

Agendamento cancelado deve registrar motivo.

Fila de regulação deve manter histórico de prioridade e decisão.

Dados de saúde não devem ser enviados para transparência de forma individualizada.

Integrações com e-SUS devem registrar envio, retorno e erro.

Relatórios públicos devem usar dados agregados, nunca prontuário individual.

Perfis de acesso sugeridos

Recepção / Administrativo

Pode:

cadastrar paciente;

agendar atendimento;

confirmar presença;

consultar dados básicos;

emitir comprovante.

Não deve acessar prontuário completo, salvo regra específica.

Enfermeiro / Técnico

Pode:

fazer acolhimento;

registrar sinais vitais;

registrar procedimentos;

registrar vacinação;

consultar histórico permitido;

registrar evolução de enfermagem.

Médico / Profissional Clínico

Pode:

acessar prontuário;

registrar atendimento;

prescrever;

solicitar exames;

encaminhar;

emitir documentos.

Farmácia

Pode:

consultar prescrição autorizada;

dispensar medicamentos;

controlar estoque;

registrar lote e validade;

emitir relatórios de consumo.

Regulação

Pode:

analisar encaminhamentos;

organizar fila;

autorizar;

agendar;

registrar decisão.

Vigilância

Pode:

registrar casos;

registrar inspeções;

acompanhar notificações;

emitir relatórios.

Gestor de Saúde

Pode:

consultar indicadores;

acompanhar produção;

consultar relatórios agregados;

monitorar unidades.

Administrador de Saúde

Pode:

configurar unidades;

procedimentos;

agendas;

profissionais;

permissões;

integrações.

MVP do Módulo Saúde

Para uma primeira versão vendável, eu faria:

Unidades de saúde

Pacientes

Profissionais de saúde

Equipes / ESF básico

Agenda

Agendamentos

Acolhimento / triagem simples

Atendimentos

Prontuário eletrônico básico

Procedimentos

Exames solicitados

Encaminhamentos

Farmácia básica

Medicamentos com lote e validade

Dispensação

Vacinação básica

Documentos de saúde

Relatórios básicos

Integração/exportação e-SUS inicial

Auditoria de acesso

Com isso, o módulo já fica forte para editais pequenos e médios, principalmente quando pedirem gestão de saúde, agenda, prontuário, farmácia, relatórios e e-SUS.

Menu final enxuto para a tela

Para deixar simples no sistema, eu colocaria assim:

Painel

Unidades

Pacientes

Profissionais

Equipes

Agenda

Agendamentos

Acolhimento

Atendimentos

Prontuário

Procedimentos

Exames

Encaminhamentos / Regulação

Farmácia

Vacinação

Vigilância

Transporte Sanitário

Documentos

e-SUS

Relatórios

Parâmetros

Auditoria

Resumo prático

O Módulo 13 — Saúde deve cuidar de:

unidades de saúde;

pacientes;

profissionais;

equipes;

agenda;

agendamentos;

acolhimento;

triagem;

atendimentos;

prontuário eletrônico;

procedimentos;

exames;

encaminhamentos;

regulação;

farmácia;

medicamentos;

dispensação;

vacinação;

vigilância em saúde;

programas de saúde;

transporte sanitário;

documentos;

e-SUS;

relatórios;

auditoria.

Esse módulo é muito valioso para o CeleriFlow, mas precisa ser tratado com cuidado porque envolve dados sensíveis de saúde, integrações específicas e alto nível de responsabilidade operacional.