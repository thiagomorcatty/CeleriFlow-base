import { prisma } from '../src/lib/prisma';


async function main() {
  console.log('Seeding Modulo 14 - Assistência Social...');

  // 1. Criar uma Unidade (CRAS)
  const crasCentro = await prisma.socialUnit.create({
    data: {
      name: 'CRAS Centro',
      type: 'CRAS',
      phone: '(11) 3333-4444',
      email: 'cras.centro@prefeitura.gov.br',
    },
  });

  const creasSul = await prisma.socialUnit.create({
    data: {
      name: 'CREAS Zona Sul',
      type: 'CREAS',
      phone: '(11) 5555-6666',
      email: 'creas.sul@prefeitura.gov.br',
    },
  });

  console.log('Unidades criadas.');

  // 2. Criar Representantes Familiares e Pessoas Físicas
  // Precisamos de pessoas do Módulo Cadastros
  const randomSuffix = Math.floor(Math.random() * 10000);
  
  const rep1 = await prisma.person.create({
    data: {
      fullName: `Maria das Dores Silva ${randomSuffix}`,
      cpf: `111222333${randomSuffix}`.slice(0, 11),
      birthDate: new Date('1980-05-15'),
      gender: 'Feminino',
      motherName: 'Joana da Silva',
    }
  });

  const rep2 = await prisma.person.create({
    data: {
      fullName: `José Alves Ferreira ${randomSuffix}`,
      cpf: `444555666${randomSuffix}`.slice(0, 11),
      birthDate: new Date('1975-10-20'),
      gender: 'Masculino',
      motherName: 'Ana Ferreira',
    }
  });

  const rep3 = await prisma.person.create({
    data: {
      fullName: `Ana Clara Mendes ${randomSuffix}`,
      cpf: `777888999${randomSuffix}`.slice(0, 11),
      birthDate: new Date('1990-03-08'),
      gender: 'Feminino',
      motherName: 'Lúcia Mendes',
    }
  });

  console.log('Representantes (Person) criados.');

  // 3. Criar as Famílias (SocialFamily)
  const fam1 = await prisma.socialFamily.create({
    data: {
      familyCode: `FAM-100-${randomSuffix}`,
      nis: `1234567890${randomSuffix}`.slice(0, 11),
      income: 1500.0,
      perCapitaIncome: 500.0,
      vulnerabilities: 'Desemprego, Insegurança Alimentar',
      representativeId: rep1.id,
    }
  });

  const fam2 = await prisma.socialFamily.create({
    data: {
      familyCode: `FAM-200-${randomSuffix}`,
      nis: `9876543210${randomSuffix}`.slice(0, 11),
      income: 2500.0,
      perCapitaIncome: 833.33,
      vulnerabilities: 'Conflitos familiares, Moradia precária',
      representativeId: rep2.id,
    }
  });

  const fam3 = await prisma.socialFamily.create({
    data: {
      familyCode: `FAM-300-${randomSuffix}`,
      nis: `5554443330${randomSuffix}`.slice(0, 11),
      income: 800.0,
      perCapitaIncome: 400.0,
      vulnerabilities: 'Mãe solo, Baixa renda extrema',
      representativeId: rep3.id,
    }
  });

  console.log('Famílias (SocialFamily) criadas.');

  // 4. Criar Servidor (Assistente Social) para os Prontuários e Visitas
  const assistenteSocial = await prisma.employee.create({
    data: {
      name: `Carla Assistente Social ${randomSuffix}`,
      registration: `AS-${randomSuffix}`,
      cpf: `000111222${randomSuffix}`.slice(0, 11),
      email: `carla.social${randomSuffix}@prefeitura.gov.br`,
      isActive: true,
    }
  });

  console.log('Assistente Social (Employee) criada.');

  // 5. Gerar Atendimentos e Prontuários (SocialRecord, SocialAttendance)
  await prisma.socialRecord.create({
    data: {
      familyId: fam1.id,
      unitId: crasCentro.id,
      history: 'Família em situação de vulnerabilidade devido ao desemprego do genitor. Inserida no PAIF.',
      secrecyLevel: 'Normal'
    }
  });

  await prisma.socialAttendance.create({
    data: {
      familyId: fam1.id,
      personId: rep1.id,
      unitId: crasCentro.id,
      professionalId: assistenteSocial.id,
      type: 'Acolhimento',
      description: 'Realizado o acolhimento inicial da Sra. Maria. Requerida a documentação para atualização do CadÚnico.',
      referrals: 'Encaminhamento para atualização do Cadastro Único.',
    }
  });

  await prisma.socialAttendance.create({
    data: {
      familyId: fam2.id,
      unitId: creasSul.id,
      professionalId: assistenteSocial.id,
      type: 'PAEFI',
      description: 'Acompanhamento devido a violação de direitos. Família orientada sobre medidas protetivas.',
      secrecyLevel: 'Restrito',
    }
  });

  console.log('Prontuários e Atendimentos criados.');

  // 6. Benefícios Sociais
  const benCesta = await prisma.socialBenefit.create({
    data: {
      name: 'Cesta Básica Eventual',
      description: 'Concessão de alimentos não perecíveis',
      isRecurrent: false,
    }
  });

  const benAluguel = await prisma.socialBenefit.create({
    data: {
      name: 'Aluguel Social',
      description: 'Subsídio temporário para moradia',
      isRecurrent: true,
    }
  });

  // Concessão de Benefício
  await prisma.socialBenefitConcession.create({
    data: {
      benefitId: benCesta.id,
      familyId: fam1.id,
      professionalId: assistenteSocial.id,
      quantity: 1,
      status: 'Entregue'
    }
  });

  await prisma.socialBenefitConcession.create({
    data: {
      benefitId: benAluguel.id,
      familyId: fam3.id,
      professionalId: assistenteSocial.id,
      quantity: 1,
      value: 500.0,
      status: 'Concedido'
    }
  });

  console.log('Benefícios criados.');

  // 7. Programas Sociais
  const progBolsaFamilia = await prisma.socialProgram.create({
    data: {
      name: 'Programa Bolsa Família',
      sphere: 'Federal',
      description: 'Transferência de renda direta',
    }
  });

  await prisma.socialProgramParticipation.create({
    data: {
      programId: progBolsaFamilia.id,
      familyId: fam1.id,
      status: 'Ativo'
    }
  });

  console.log('Seeding Modulo 14 - Concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
