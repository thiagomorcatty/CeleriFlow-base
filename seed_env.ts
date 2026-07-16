import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as dotenv from 'dotenv';
dotenv.config();

neonConfig.webSocketConstructor = ws;

function createPrismaClient() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();

async function main() {
  console.log('Limpando dados antigos do Meio Ambiente...');
  
  // Limpar tabelas na ordem correta para evitar erros de chave estrangeira
  await prisma.envDocument.deleteMany({});
  await prisma.envWaste.deleteMany({});
  await prisma.envLicense.deleteMany({});
  await prisma.envInspection.deleteMany({});
  await prisma.envInfraction.deleteMany({});
  await prisma.envEnterprise.deleteMany({});
  await prisma.envComplaint.deleteMany({});
  await prisma.envRequest.deleteMany({});
  await prisma.envGreenArea.deleteMany({});
  await prisma.envEduProgram.deleteMany({});

  console.log('Seeding Meio Ambiente com exemplos reais integrados...');

  // 1. Empreendimentos
  const emp1 = await prisma.envEnterprise.create({
    data: {
      name: 'Indústria Química Fênix S/A',
      cnpjCpf: '12.345.678/0001-90',
      activityType: 'Química/Petroquímica',
      potentialRisk: 'Alto',
      address: 'Av. das Indústrias, 1500 - Distrito Industrial',
      status: 'Ativo'
    }
  });

  const emp2 = await prisma.envEnterprise.create({
    data: {
      name: 'Auto Posto Solar das Flores Ltda',
      cnpjCpf: '98.765.432/0001-10',
      activityType: 'Posto de Combustíveis',
      potentialRisk: 'Médio',
      address: 'Rua das Camélias, 200 - Centro',
      status: 'Ativo'
    }
  });

  const emp3 = await prisma.envEnterprise.create({
    data: {
      name: 'Construtora e Incorporadora Viver Bem',
      cnpjCpf: '45.888.111/0001-22',
      activityType: 'Construção Civil',
      potentialRisk: 'Médio',
      address: 'Alameda dos Anjos, s/n - Residencial Leste',
      status: 'Irregular'
    }
  });

  // 2. Licenças
  const lic1 = await prisma.envLicense.create({
    data: {
      licenseNumber: 'LO-2026/012',
      licenseType: 'De Operação (LO)',
      enterpriseId: emp1.id,
      status: 'Emitida',
      validUntil: new Date('2030-12-31')
    }
  });

  const lic2 = await prisma.envLicense.create({
    data: {
      licenseNumber: 'LI-2026/045',
      licenseType: 'De Instalação (LI)',
      enterpriseId: emp2.id,
      status: 'Emitida',
      validUntil: new Date('2028-06-30')
    }
  });

  const lic3 = await prisma.envLicense.create({
    data: {
      licenseNumber: 'LP-2026/009',
      licenseType: 'Prévia (LP)',
      enterpriseId: emp3.id,
      status: 'Em Análise',
      validUntil: new Date('2027-01-15')
    }
  });

  // 3. Denúncias
  await prisma.envComplaint.create({
    data: {
      complaintType: 'Descarte Irregular',
      description: 'Caminhão de entulho descartando resíduos de gesso em área de preservação permanente.',
      address: 'Final da Rua das Margaridas, beira do córrego',
      isAnonymous: true,
      status: 'Em Vistoria'
    }
  });

  await prisma.envComplaint.create({
    data: {
      complaintType: 'Poluição Sonora',
      description: 'Ruído excessivo proveniente de exaustores industriais durante o período noturno.',
      address: 'Rua Paraná, 85 - Jardim Alvorada',
      isAnonymous: false,
      status: 'Recebida'
    }
  });

  // 4. Vistorias / Fiscalizações
  await prisma.envInspection.create({
    data: {
      dateScheduled: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // in 2 days
      inspector: 'Carlos Eduardo Santos',
      notes: 'Verificação de sistemas de contenção de vazamentos nas bombas e caixas separadoras.',
      enterpriseId: emp2.id,
      status: 'Agendada'
    }
  });

  await prisma.envInspection.create({
    data: {
      dateScheduled: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      dateExecuted: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
      inspector: 'Joana Prado',
      notes: 'Constatação de supressão vegetal sem licença prévia no canteiro de obras.',
      enterpriseId: emp3.id,
      status: 'Realizada'
    }
  });

  // 5. Infrações, Multas e Recursos
  await prisma.envInfraction.create({
    data: {
      infractionType: 'Auto de Infração',
      description: 'Supressão ilegal de vegetação nativa em área urbana sem autorização ambiental.',
      fineAmount: 15500.00,
      status: 'Em Recurso',
      enterpriseId: emp3.id
    }
  });

  await prisma.envInfraction.create({
    data: {
      infractionType: 'Notificação',
      description: 'Armazenamento inadequado de tambores de óleo usado em área descoberta.',
      fineAmount: 0.00,
      status: 'Emitido',
      enterpriseId: emp1.id
    }
  });

  // 6. Solicitações de Poda / Supressão
  await prisma.envRequest.create({
    data: {
      requestType: 'Poda',
      description: 'Solicitação de poda drástica de galhos secos de Sibipiruna com risco de queda sobre pedestres.',
      address: 'Rua XV de Novembro, em frente ao número 340',
      requesterName: 'Marcos de Souza',
      status: 'Autorizado'
    }
  });

  await prisma.envRequest.create({
    data: {
      requestType: 'Supressão',
      description: 'Pedido para remoção de árvore exótica (Pinus) rachada após tempestade.',
      address: 'Avenida Brasil, 1200 - Bairro das Américas',
      requesterName: 'Ana Julia Costa',
      status: 'Em Vistoria'
    }
  });

  // 7. Áreas Verdes (Novo Modelo)
  await prisma.envGreenArea.create({
    data: {
      name: 'Parque Ecológico Municipal das Araucárias',
      areaType: 'Parque Urbano',
      sizeSqm: 125000.00,
      location: 'Av. dos Pinheiros, s/n - Jardim Botânico',
      status: 'Preservado',
      notes: 'Contém trilhas autoguiadas, lago artificial e remanescente de floresta de araucária.'
    }
  });

  await prisma.envGreenArea.create({
    data: {
      name: 'Área de Preservação Permanente (APP) Rio Claro',
      areaType: 'Reserva Ecológica',
      sizeSqm: 320000.00,
      location: 'Margens do Rio Claro - Zona Rural Norte',
      status: 'Em Recuperação',
      notes: 'Projeto de reflorestamento em andamento com plantio de 5000 mudas nativas.'
    }
  });

  await prisma.envGreenArea.create({
    data: {
      name: 'Praça das Flores e Espaço Verde Centro',
      areaType: 'Praça/Área de Lazer',
      sizeSqm: 8500.00,
      location: 'Praça Central, s/n - Centro',
      status: 'Preservado',
      notes: 'Espaço com arborização densa e jardins polinizadores implantados.'
    }
  });

  // 8. Resíduos (Novo Modelo)
  await prisma.envWaste.create({
    data: {
      generatorName: 'Indústria Química Fênix S/A',
      wasteType: 'Resíduos Químicos Perigosos (Classe I)',
      quantityKg: 1450.00,
      destination: 'Co-processamento e Incineração Licenciada',
      notes: 'Transportado pela Transportadora EcoCarga com CADRI ativo.',
      enterpriseId: emp1.id
    }
  });

  await prisma.envWaste.create({
    data: {
      generatorName: 'Auto Posto Solar das Flores Ltda',
      wasteType: 'Óleos Lubrificantes Usados (Classe I)',
      quantityKg: 620.00,
      destination: 'Rerrefino Industrial',
      notes: 'Coleta realizada por empresa autorizada pela ANP.',
      enterpriseId: emp2.id
    }
  });

  await prisma.envWaste.create({
    data: {
      generatorName: 'Construtora e Incorporadora Viver Bem',
      wasteType: 'Resíduos da Construção Civil (Classe A/B)',
      quantityKg: 8500.00,
      destination: 'Aterro de Inertes Municipal',
      notes: 'Controle de caçambas integradas no canteiro de obras.',
      enterpriseId: emp3.id
    }
  });

  // 9. Educação Ambiental (Novo Modelo)
  await prisma.envEduProgram.create({
    data: {
      title: 'Campanha Rio Limpo nas Escolas',
      description: 'Palestras e oficinas com maquetes ecológicas para alunos da rede pública focadas em preservação da bacia hidrográfica local.',
      targetAudience: 'Estudantes do Ensino Fundamental II',
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-06-30'),
      participantsCount: 1200,
      status: 'Concluído'
    }
  });

  await prisma.envEduProgram.create({
    data: {
      title: 'Oficina de Compostagem Doméstica - Bairro Verde',
      description: 'Oficinas práticas para ensinar moradores locais a reduzirem o descarte de resíduos orgânicos através de composteiras domésticas.',
      targetAudience: 'Comunidade Geral - Bairro Jardim das Flores',
      startDate: new Date('2026-08-10'),
      endDate: new Date('2026-08-12'),
      participantsCount: 80,
      status: 'Planejado'
    }
  });

  await prisma.envEduProgram.create({
    data: {
      title: 'Programa Comércio Sustentável & Selo Verde',
      description: 'Capacitações gratuitas para o comércio central visando a redução do plástico de uso único e adoção de práticas circulares.',
      targetAudience: 'Comerciantes e Lojistas do Centro',
      startDate: new Date('2026-05-15'),
      participantsCount: 150,
      status: 'Em Execução'
    }
  });

  // 10. Documentos (Novo Modelo)
  await prisma.envDocument.create({
    data: {
      title: 'Relatório de Impacto Ambiental (RIMA) - Planta Industrial',
      docType: 'Laudo/Relatório Técnico',
      fileUrl: '/docs/RIMA_Fenix_2026.pdf',
      enterpriseId: emp1.id
    }
  });

  await prisma.envDocument.create({
    data: {
      title: 'Termo de Compromisso Ambiental (TCA) - Plano de Reflorestamento',
      docType: 'Termo de Compromisso',
      fileUrl: '/docs/TCA_ViverBem_2026.pdf',
      enterpriseId: emp3.id
    }
  });

  await prisma.envDocument.create({
    data: {
      title: 'Laudo de Estudo de Impacto de Vizinhança (EIV)',
      docType: 'Parecer Técnico',
      fileUrl: '/docs/EIV_PostoSolar.pdf',
      enterpriseId: emp2.id
    }
  });

  console.log('Seed completo com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
