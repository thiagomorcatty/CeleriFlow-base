import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Meio Ambiente...');

  const enterprise = await prisma.envEnterprise.create({
    data: {
      name: 'Indústria Exemplo S/A',
      cnpjCpf: '12.345.678/0001-90',
      activityType: 'Indústria',
      potentialRisk: 'Alto',
      address: 'Rodovia Principal, km 10 - Distrito Industrial',
      status: 'Ativo'
    }
  });

  const license = await prisma.envLicense.create({
    data: {
      licenseNumber: 'LO-2026/001',
      licenseType: 'De Operação (LO)',
      enterpriseId: enterprise.id,
      status: 'Emitida'
    }
  });

  await prisma.envComplaint.create({
    data: {
      complaintType: 'Descarte Irregular',
      description: 'Caminhão descartando entulho em terreno baldio próximo à reserva.',
      address: 'Rua das Flores, final da rua',
      isAnonymous: true,
      status: 'Recebida'
    }
  });

  await prisma.envInspection.create({
    data: {
      dateScheduled: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // tomorrow
      inspector: 'João Fiscal',
      notes: 'Vistoria de rotina para renovação de licença',
      enterpriseId: enterprise.id,
      status: 'Agendada'
    }
  });

  await prisma.envRequest.create({
    data: {
      requestType: 'Poda',
      description: 'Poda de árvore com risco de queda sobre a rede elétrica',
      address: 'Av. Central, 100',
      requesterName: 'Maria Silva',
      status: 'Solicitado'
    }
  });

  console.log('Seed completo!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
