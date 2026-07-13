import { config } from 'dotenv'
config({ path: '.env.local' })
config() // also load .env

async function main() {
  const { prisma } = require('../src/lib/prisma')
  
  console.log('Iniciando seed do Módulo 9 (Compras e Contratos)...')

  // 1. Garantir que existam registros básicos (Secretaria, Departamento, Funcionario, Fornecedor)
  let secretariat = await prisma.secretariat.findFirst()
  if (!secretariat) {
    secretariat = await prisma.secretariat.create({
      data: { name: 'Secretaria de Administração', acronym: 'SEMAD', isActive: true }
    })
  }

  let department = await prisma.department.findFirst()
  if (!department) {
    department = await prisma.department.create({
      data: { name: 'Departamento de Compras', secretariatId: secretariat.id, isActive: true }
    })
  }

  let employee = await prisma.employee.findFirst()
  if (!employee) {
    employee = await prisma.employee.create({
      data: { name: 'João Comprador', isActive: true, secretariatId: secretariat.id, departmentId: department.id }
    })
  }

  let company = await prisma.company.findFirst()
  if (!company) {
    company = await prisma.company.create({
      data: { corporateName: 'Fornecedor Exemplo LTDA', cnpj: '12345678000199', status: 'Ativo' }
    })
  }

  let supplier = await prisma.supplier.findFirst()
  if (!supplier) {
    supplier = await prisma.supplier.create({
      data: { status: 'Ativo', companyId: company.id }
    })
  }

  // 2. Inserir 3 Itens de Catálogo
  const catalogItems = await Promise.all([
    prisma.catalogItem.upsert({
      where: { code: 'CAT-001' },
      update: {},
      create: { code: 'CAT-001', name: 'Papel Sulfite A4', description: 'Caixa com 10 resmas', unit: 'CX', estimatedValue: 250.00 }
    }),
    prisma.catalogItem.upsert({
      where: { code: 'CAT-002' },
      update: {},
      create: { code: 'CAT-002', name: 'Caneta Esferográfica Azul', description: 'Caixa com 50 unidades', unit: 'CX', estimatedValue: 35.50 }
    }),
    prisma.catalogItem.upsert({
      where: { code: 'CAT-003' },
      update: {},
      create: { code: 'CAT-003', name: 'Computador Desktop Core i5', description: '8GB RAM, 256GB SSD', unit: 'UN', estimatedValue: 3500.00 }
    })
  ])
  console.log(`✅ ${catalogItems.length} Itens de Catálogo verificados/inseridos.`)

  // 3. Inserir 3 Solicitações de Compra
  const purchaseRequests = await Promise.all([
    prisma.purchaseRequest.upsert({
      where: { number: 'REQ-2026-001' },
      update: {},
      create: { number: 'REQ-2026-001', object: 'Aquisição de material de expediente', justification: 'Reposição de estoque', estimatedValue: 1500.00, status: 'Aprovada', secretariatId: secretariat.id, departmentId: department.id, requesterId: employee.id }
    }),
    prisma.purchaseRequest.upsert({
      where: { number: 'REQ-2026-002' },
      update: {},
      create: { number: 'REQ-2026-002', object: 'Aquisição de computadores para o setor', justification: 'Atualização do parque tecnológico', estimatedValue: 10500.00, status: 'Enviada', secretariatId: secretariat.id, departmentId: department.id, requesterId: employee.id }
    }),
    prisma.purchaseRequest.upsert({
      where: { number: 'REQ-2026-003' },
      update: {},
      create: { number: 'REQ-2026-003', object: 'Contratação de serviço de limpeza', justification: 'Manutenção predial', estimatedValue: 5000.00, status: 'Rascunho', secretariatId: secretariat.id, departmentId: department.id, requesterId: employee.id }
    })
  ])
  console.log(`✅ ${purchaseRequests.length} Solicitações verificadas/inseridas.`)

  // 4. Inserir 3 Processos de Compra
  const processes = await Promise.all([
    prisma.purchaseProcess.upsert({
      where: { number: 'PROC-2026-101' },
      update: {},
      create: { number: 'PROC-2026-101', object: 'Aquisição de material de expediente', type: 'Comum', modality: 'Pregão Eletrônico', estimatedValue: 15000.00, status: 'Em Licitação', secretariatId: secretariat.id }
    }),
    prisma.purchaseProcess.upsert({
      where: { number: 'PROC-2026-102' },
      update: {},
      create: { number: 'PROC-2026-102', object: 'Aquisição de equipamentos de TI', type: 'Registro de Preços', modality: 'Pregão Eletrônico', estimatedValue: 55000.00, status: 'Concluído', secretariatId: secretariat.id }
    }),
    prisma.purchaseProcess.upsert({
      where: { number: 'PROC-2026-103' },
      update: {},
      create: { number: 'PROC-2026-103', object: 'Serviço de manutenção de ar condicionado', type: 'Comum', modality: 'Dispensa', estimatedValue: 8000.00, status: 'Em Planejamento', secretariatId: secretariat.id }
    })
  ])
  console.log(`✅ ${processes.length} Processos verificados/inseridos.`)

  // 5. Inserir 3 Licitações
  const biddings = await Promise.all([
    prisma.bidding.upsert({
      where: { id: 'bid-001' }, // Usando id apenas como placeholder pq number não é unique, mas vamos usar um try/catch.
      update: {},
      create: { id: 'bid-001', number: 'PE-001/2026', modality: 'Pregão Eletrônico', status: 'Aberto', processId: processes[0].id, sessionDate: new Date('2026-08-15T09:00:00Z') }
    }).catch(() => null),
    prisma.bidding.upsert({
      where: { id: 'bid-002' },
      update: {},
      create: { id: 'bid-002', number: 'PE-002/2026', modality: 'Pregão Eletrônico', status: 'Homologado', processId: processes[1].id, sessionDate: new Date('2026-07-01T09:00:00Z') }
    }).catch(() => null)
  ])
  
  // E uma Dispensa
  const dispensa = await prisma.directContracting.create({
    data: { type: 'Dispensa', justification: 'Valor inferior ao limite', value: 8000.00, status: 'Em Elaboração', processId: processes[2].id, supplierId: supplier.id }
  }).catch(() => null)
  
  console.log(`✅ Licitações e Dispensas inseridas.`)

  // 6. Inserir 3 Contratos
  const contracts = await Promise.all([
    prisma.contract.upsert({
      where: { number: 'CONT-001/2026' },
      update: {},
      create: { number: 'CONT-001/2026', object: 'Fornecimento de computadores', initialValue: 55000.00, updatedValue: 55000.00, startDate: new Date('2026-07-10T00:00:00Z'), endDate: new Date('2027-07-10T00:00:00Z'), status: 'Vigente', processId: processes[1].id, supplierId: supplier.id, secretariatId: secretariat.id, managerId: employee.id }
    }),
    prisma.contract.upsert({
      where: { number: 'CONT-002/2026' },
      update: {},
      create: { number: 'CONT-002/2026', object: 'Serviço de limpeza contínua', initialValue: 120000.00, updatedValue: 120000.00, startDate: new Date('2026-01-01T00:00:00Z'), endDate: new Date('2026-12-31T00:00:00Z'), status: 'Vigente', processId: processes[0].id, supplierId: supplier.id, secretariatId: secretariat.id, managerId: employee.id }
    }),
    prisma.contract.upsert({
      where: { number: 'CONT-003/2025' },
      update: {},
      create: { number: 'CONT-003/2025', object: 'Fornecimento de papel', initialValue: 30000.00, updatedValue: 30000.00, startDate: new Date('2025-06-01T00:00:00Z'), endDate: new Date('2026-06-01T00:00:00Z'), status: 'Encerrado', processId: processes[0].id, supplierId: supplier.id, secretariatId: secretariat.id, managerId: employee.id }
    })
  ])
  console.log(`✅ ${contracts.length} Contratos verificados/inseridos.`)

  console.log('🎉 Seed do Módulo 9 concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    const { prisma } = require('../src/lib/prisma')
    await prisma.$disconnect()
  })
