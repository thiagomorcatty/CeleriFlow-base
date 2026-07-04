import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Iniciando inserção de dados de teste para o Módulo 3...');

  // Busca entidades necessárias (criadas no seed anterior)
  const person = await prisma.person.findFirst();
  const department = await prisma.department.findFirst();
  const employee = await prisma.employee.findFirst();

  if (!person || !department || !employee) {
    throw new Error('Certifique-se de que o seed anterior foi rodado. Faltam Person, Department ou Employee.');
  }

  // ProcessType
  const processType = await prisma.processType.create({
    data: {
      name: 'Alvará de Funcionamento',
      description: 'Solicitação de alvará para estabelecimentos comerciais.'
    }
  });

  // Subject
  const subject = await prisma.subject.create({
    data: {
      name: 'Renovação Anual',
      processTypeId: processType.id,
      slaDays: 15
    }
  });

  // Process
  const process = await prisma.process.create({
    data: {
      protocolNumber: '2026/00001',
      status: 'Em Análise',
      description: 'Solicito a renovação do meu alvará de funcionamento.',
      processTypeId: processType.id,
      subjectId: subject.id,
      personId: person.id,
      currentDepartmentId: department.id
    }
  });

  // ProcessMovement
  await prisma.processMovement.create({
    data: {
      processId: process.id,
      fromDepartmentId: department.id,
      toDepartmentId: department.id, // Simulação rápida: do protocolo para a análise
      employeeId: employee.id,
      reason: 'Encaminhado para análise técnica.'
    }
  });

  // ProcessDocument
  await prisma.processDocument.create({
    data: {
      processId: process.id,
      title: 'Comprovante de Endereço',
      fileUrl: 'https://exemplo.com/comprovante.pdf',
      documentType: 'PDF',
      employeeId: employee.id
    }
  });

  // ProcessDispatch
  await prisma.processDispatch.create({
    data: {
      processId: process.id,
      content: 'A documentação parece estar completa. Aguardando vistoria.',
      dispatchType: 'Parecer',
      employeeId: employee.id,
      departmentId: department.id
    }
  });

  // --- Módulo 1 (Administração): Inserir mais alguns dados a pedido do usuário ---
  console.log('Inserindo dados adicionais no Módulo de Administração...');

  const role = await prisma.role.findFirst();

  await prisma.employee.create({
    data: {
      name: 'João Técnico',
      cpf: '222.333.444-55',
      email: 'joao@tecnico.gov.br',
      phone: '(11) 97777-6666',
      roleId: role?.id,
      departmentId: department.id
    }
  });

  await prisma.internalDemand.create({
    data: {
      title: 'Manutenção de Equipamento',
      description: 'O computador da recepção precisa de formatação.',
      status: 'Aberta',
      priority: 'Urgente',
      assigneeId: employee.id,
      creatorId: employee.id,
      departmentId: department.id
    }
  });

  await prisma.calendarEvent.create({
    data: {
      title: 'Feriado Municipal',
      description: 'Aniversário da cidade',
      date: new Date('2026-08-15'),
      type: 'Feriado Nacional'
    }
  });

  console.log('Inserção de dados concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
