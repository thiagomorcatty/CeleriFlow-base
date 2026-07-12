import { prisma } from './src/lib/prisma'

async function main() {
  console.log('Seeding Financeiro module...')

  // Get some existing dependencies if any, or create some
  let secretariat = await prisma.secretariat.findFirst()
  if (!secretariat) {
    secretariat = await prisma.secretariat.create({
      data: { name: 'Secretaria de Finanças' }
    })
  }

  let employee = await prisma.employee.findFirst()
  if (!employee) {
    employee = await prisma.employee.create({
      data: { name: 'João Financeiro', email: 'joao.fin@email.com' }
    })
  }

  // Create Financial Year
  const year2026 = await prisma.financialYear.upsert({
    where: { year: 2026 },
    update: {},
    create: {
      year: 2026,
      startDate: new Date('2026-01-01T00:00:00.000Z'),
      endDate: new Date('2026-12-31T23:59:59.999Z'),
      status: 'Aberto'
    }
  })

  // Budget Units
  const budgetUnitAdmin = await prisma.budgetUnit.upsert({
    where: { code: '02.01.00' },
    update: {},
    create: { code: '02.01.00', name: 'Gabinete do Prefeito', secretariatId: secretariat.id }
  })
  
  const budgetUnitFin = await prisma.budgetUnit.upsert({
    where: { code: '02.02.00' },
    update: {},
    create: { code: '02.02.00', name: 'Secretaria de Finanças', secretariatId: secretariat.id }
  })
  
  const budgetUnitEdu = await prisma.budgetUnit.upsert({
    where: { code: '02.03.00' },
    update: {},
    create: { code: '02.03.00', name: 'Secretaria de Educação', secretariatId: secretariat.id }
  })

  // Resource Sources
  const source1500 = await prisma.resourceSource.upsert({
    where: { code: '15000000' },
    update: {},
    create: { code: '15000000', name: 'Recursos Não Vinculados de Impostos' }
  })

  const source1540 = await prisma.resourceSource.upsert({
    where: { code: '15400000' },
    update: {},
    create: { code: '15400000', name: 'Transferências do FUNDEB' }
  })

  // Expense Natures
  const expNat339030 = await prisma.expenseNature.upsert({
    where: { code: '339030' },
    update: {},
    create: { code: '339030', name: 'Material de Consumo' }
  })

  const expNat339039 = await prisma.expenseNature.upsert({
    where: { code: '339039' },
    update: {},
    create: { code: '339039', name: 'Outros Serviços de Terceiros - Pessoa Jurídica' }
  })

  // Budget Appropriations
  const app1 = await prisma.budgetAppropriation.upsert({
    where: { code: '02.02.00.04.122.0002.2005.339030.15000000' },
    update: {},
    create: {
      code: '02.02.00.04.122.0002.2005.339030.15000000',
      financialYearId: year2026.id,
      budgetUnitId: budgetUnitFin.id,
      expenseNatureId: expNat339030.id,
      resourceSourceId: source1500.id,
      initialValue: 150000.00,
      updatedValue: 150000.00,
      committedValue: 0
    }
  })

  const app2 = await prisma.budgetAppropriation.upsert({
    where: { code: '02.03.00.12.361.0005.2010.339039.15400000' },
    update: {},
    create: {
      code: '02.03.00.12.361.0005.2010.339039.15400000',
      financialYearId: year2026.id,
      budgetUnitId: budgetUnitEdu.id,
      expenseNatureId: expNat339039.id,
      resourceSourceId: source1540.id,
      initialValue: 500000.00,
      updatedValue: 500000.00,
      committedValue: 0
    }
  })

  // Bank Accounts
  const bbAccount = await prisma.bankAccount.create({
    data: {
      bankName: 'Banco do Brasil',
      agency: '1234-5',
      accountNumber: '10001-X',
      accountType: 'Movimento',
      currentBalance: 1250000.00,
      resourceSourceId: source1500.id,
      isActive: true
    }
  })

  const cefAccount = await prisma.bankAccount.create({
    data: {
      bankName: 'Caixa Econômica Federal',
      agency: '0543',
      accountNumber: '20002-9',
      accountType: 'Vinculada',
      currentBalance: 850000.00,
      resourceSourceId: source1540.id,
      isActive: true
    }
  })

  const itauAccount = await prisma.bankAccount.create({
    data: {
      bankName: 'Itaú Unibanco',
      agency: '7788',
      accountNumber: '55667-8',
      accountType: 'Arrecadação',
      currentBalance: 450000.00,
      resourceSourceId: source1500.id,
      isActive: true
    }
  })

  // Supplier
  let supplier = await prisma.supplier.findFirst()
  if (!supplier) {
    const company = await prisma.company.create({
      data: {
        corporateName: 'Fornecedor Exemplo LTDA',
        cnpj: '12345678000199',
        status: 'Ativo'
      }
    })
    supplier = await prisma.supplier.create({
      data: {
        companyId: company.id,
        category: 'Materiais',
        status: 'Ativo'
      }
    })
  }

  // Commitments
  const commitment1 = await prisma.commitment.upsert({
    where: { number: '2026NE00001' },
    update: {},
    create: {
      number: '2026NE00001',
      value: 1500.00,
      type: 'Ordinário',
      history: 'Aquisição de material de expediente para a Secretaria de Finanças',
      appropriationId: app1.id,
      supplierId: supplier.id,
      status: 'Emitido'
    }
  })

  const commitment2 = await prisma.commitment.upsert({
    where: { number: '2026NE00002' },
    update: {},
    create: {
      number: '2026NE00002',
      value: 12500.00,
      type: 'Global',
      history: 'Prestação de serviços de limpeza nas escolas',
      appropriationId: app2.id,
      supplierId: supplier.id,
      status: 'Emitido'
    }
  })

  // Settlements
  const settlement1 = await prisma.settlement.create({
    data: {
      value: 1500.00,
      documentRef: 'NF-e 105',
      commitmentId: commitment1.id,
      authorId: employee.id,
      status: 'Liquidado',
      notes: 'Material entregue conforme NF 105'
    }
  })

  // Payments
  const payment1 = await prisma.payment.upsert({
    where: { orderNumber: '2026OB00001' },
    update: {},
    create: {
      orderNumber: '2026OB00001',
      value: 1500.00,
      commitmentId: commitment1.id,
      settlementId: settlement1.id,
      bankAccountId: bbAccount.id,
      supplierId: supplier.id,
      paymentMethod: 'Transferência',
      status: 'Pago'
    }
  })

  // Update commitment status
  await prisma.commitment.update({
    where: { id: commitment1.id },
    data: { status: 'Pago' }
  })

  console.log('Financeiro seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
