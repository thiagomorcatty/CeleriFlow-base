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
  console.log('Seeding Protocolos data...');

  // Get or create ProcessType
  let processType = await prisma.processType.findFirst();
  if (!processType) {
    processType = await prisma.processType.create({
      data: {
        name: 'Requerimento Geral',
        description: 'Requerimentos diversos para a prefeitura'
      }
    });
  }

  // Get or create Subject
  let subject = await prisma.subject.findFirst({ where: { processTypeId: processType.id } });
  if (!subject) {
    subject = await prisma.subject.create({
      data: {
        name: 'Solicitação de Documentos',
        processTypeId: processType.id,
        slaDays: 15
      }
    });
  }

  // Get or create Person
  let person = await prisma.person.findFirst();
  if (!person) {
    person = await prisma.person.create({
      data: {
        fullName: 'João da Silva',
        cpf: '11122233344',
        email: 'joao@example.com'
      }
    });
  }

  // Create 3 archived processes
  for (let i = 1; i <= 3; i++) {
    const protocolNumber = `2026/ARQ-${i.toString().padStart(3, '0')}`;
    const exists = await prisma.process.findUnique({ where: { protocolNumber } });
    if (!exists) {
      await prisma.process.create({
        data: {
          protocolNumber,
          status: 'Arquivado',
          description: `Processo arquivado de teste ${i}`,
          processTypeId: processType.id,
          subjectId: subject.id,
          personId: person.id,
        }
      });
    }
  }

  // Create 3 processes awaiting signature
  for (let i = 1; i <= 3; i++) {
    const protocolNumber = `2026/ASS-${i.toString().padStart(3, '0')}`;
    const exists = await prisma.process.findUnique({ where: { protocolNumber } });
    if (!exists) {
      await prisma.process.create({
        data: {
          protocolNumber,
          status: 'Aguardando Assinatura',
          description: `Documento aguardando assinatura digital ${i}`,
          processTypeId: processType.id,
          subjectId: subject.id,
          personId: person.id,
        }
      });
    }
  }

  // Create 3 normal active processes for search
  for (let i = 1; i <= 3; i++) {
    const protocolNumber = `2026/BUS-${i.toString().padStart(3, '0')}`;
    const exists = await prisma.process.findUnique({ where: { protocolNumber } });
    if (!exists) {
      await prisma.process.create({
        data: {
          protocolNumber,
          status: 'Em Análise',
          description: `Processo ativo para busca ${i}`,
          processTypeId: processType.id,
          subjectId: subject.id,
          personId: person.id,
        }
      });
    }
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
