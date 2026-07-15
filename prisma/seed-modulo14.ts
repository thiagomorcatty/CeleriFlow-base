import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Seeding Modulo 14 - Assistência Social...');
  const randomSuffix = Math.floor(Math.random() * 10000);

  // 0. Base Dependencies (Secretariat, Budget, RealEstate)
  const secretariat = await prisma.secretariat.create({ data: { name: 'Secretaria de Assistência Social ' + randomSuffix } });
  const realEstate1 = await prisma.realEstate.create({ data: { propertyType: 'Casa', streetName: 'Rua das Flores', number: '123', status: 'Regular' } });
  const realEstate2 = await prisma.realEstate.create({ data: { propertyType: 'Galpão', streetName: 'Av. Central', number: '456', status: 'Regular' } });
  
  const financialYear = await prisma.financialYear.create({ data: { year: 2026 + randomSuffix, startDate: new Date('2026-01-01'), endDate: new Date('2026-12-31') } });
  const budgetUnit = await prisma.budgetUnit.create({ data: { code: 'BU-' + randomSuffix, name: 'Unidade Orçamentária Assistência', secretariatId: secretariat.id } });
  const resourceSource = await prisma.resourceSource.create({ data: { code: 'RS-' + randomSuffix, name: 'Recursos Ordinários' } });
  const expenseNature = await prisma.expenseNature.create({ data: { code: 'EN-' + randomSuffix, name: 'Despesas de Custeio' } });
  const appropriation = await prisma.budgetAppropriation.create({
    data: { code: 'APP-' + randomSuffix, financialYearId: financialYear.id, budgetUnitId: budgetUnit.id, expenseNatureId: expenseNature.id, resourceSourceId: resourceSource.id, initialValue: 100000.0 }
  });

  // 1. Criar Servidor (Assistente Social e Gestor)
  const assistenteSocial = await prisma.employee.create({
    data: { name: 'Carla Assistente Social ' + randomSuffix, registration: 'AS-' + randomSuffix, cpf: ('000111222' + randomSuffix).slice(0, 11), email: 'carla.social' + randomSuffix + '@prefeitura.gov.br', isActive: true, secretariatId: secretariat.id }
  });

  // 2. Criar Unidades
  const crasCentro = await prisma.socialUnit.create({
    data: { name: 'CRAS Centro', type: 'CRAS', phone: '(11) 3333-4444', email: 'cras.centro@prefeitura.gov.br', realEstateId: realEstate1.id, managerId: assistenteSocial.id },
  });
  const creasSul = await prisma.socialUnit.create({
    data: { name: 'CREAS Zona Sul', type: 'CREAS', phone: '(11) 5555-6666', email: 'creas.sul@prefeitura.gov.br', realEstateId: realEstate2.id },
  });

  // 3. Criar Pessoas e Familias
  const rep1 = await prisma.person.create({ data: { fullName: 'Maria Silva ' + randomSuffix, cpf: ('111222333' + randomSuffix).slice(0, 11), gender: 'Feminino' } });
  const fam1 = await prisma.socialFamily.create({ data: { familyCode: 'FAM-100-' + randomSuffix, nis: ('1234567890' + randomSuffix).slice(0, 11), income: 1500.0, perCapitaIncome: 500.0, vulnerabilities: 'Desemprego', representativeId: rep1.id } });

  // 4. Gerar Atendimentos
  await prisma.socialAttendance.create({ data: { familyId: fam1.id, personId: rep1.id, unitId: crasCentro.id, professionalId: assistenteSocial.id, type: 'Acolhimento', description: 'Acolhimento inicial', isActive: true } });

  // 5. Programas e Benefícios com Custos
  const progBolsaFamilia = await prisma.socialProgram.create({ data: { name: 'Programa Renda Solidária ' + randomSuffix, sphere: 'Municipal', description: 'Transferência de renda direta', } });
  const benCesta = await prisma.socialBenefit.create({ data: { name: 'Cesta Eventual ' + randomSuffix, description: 'Alimentos não perecíveis', isRecurrent: false, } });

  await prisma.expense.create({ data: { description: 'Custo Renda Solidária', value: 15000.0, appropriationId: appropriation.id, secretariatId: secretariat.id, socialProgramId: progBolsaFamilia.id, status: 'Empenhada' } });
  await prisma.expense.create({ data: { description: 'Aquisição Cestas', value: 5000.0, appropriationId: appropriation.id, secretariatId: secretariat.id, socialBenefitId: benCesta.id, status: 'Empenhada' } });

  console.log('Seeding Modulo 14 - Concluído com Sucesso!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
