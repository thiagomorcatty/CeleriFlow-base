import 'dotenv/config'
import { prisma } from '../src/lib/prisma'

async function main() {
  console.log('Seeding Patrimônio e Almoxarifado...')

  // 1. Setup ou busca de dependências globais
  const secAdmin = await prisma.secretariat.findFirst({ where: { name: { contains: 'Administração' } } }) || 
    await prisma.secretariat.create({ data: { name: 'Secretaria de Administração', acronym: 'SECAD' } })

  const secSaude = await prisma.secretariat.findFirst({ where: { name: { contains: 'Saúde' } } }) ||
    await prisma.secretariat.create({ data: { name: 'Secretaria de Saúde', acronym: 'SESAU' } })

  const secEducacao = await prisma.secretariat.findFirst({ where: { name: { contains: 'Educação' } } }) ||
    await prisma.secretariat.create({ data: { name: 'Secretaria de Educação', acronym: 'SEDUC' } })

  const deptAdmin = await prisma.department.findFirst({ where: { secretariatId: secAdmin.id } }) ||
    await prisma.department.create({ data: { name: 'Departamento de Compras e Patrimônio', secretariatId: secAdmin.id } })

  const deptSaude = await prisma.department.findFirst({ where: { secretariatId: secSaude.id } }) ||
    await prisma.department.create({ data: { name: 'Departamento de Frotas (Saúde)', secretariatId: secSaude.id } })

  const deptEducacao = await prisma.department.findFirst({ where: { secretariatId: secEducacao.id } }) ||
    await prisma.department.create({ data: { name: 'Departamento de Ensino Fundamental', secretariatId: secEducacao.id } })

  const supplier = await prisma.supplier.findFirst() || 
    await prisma.supplier.create({
      data: {
        company: {
          create: {
            corporateName: 'Fornecedora Master LTDA',
            cnpj: '12345678000199',
          }
        }
      }
    })

  const employee = await prisma.employee.findFirst() ||
    await prisma.employee.create({
      data: {
        name: 'João Almoxarife',
        cpf: '11122233344',
      }
    })

  const realEstateEscola = await prisma.realEstate.findFirst({ where: { propertyType: 'Escola' } }) ||
    await prisma.realEstate.create({
      data: {
        propertyType: 'Escola',
        streetName: 'Rua das Flores',
        number: '123',
        status: 'Regular',
      }
    })

  const realEstateSaude = await prisma.realEstate.findFirst({ where: { propertyType: 'Hospital' } }) ||
    await prisma.realEstate.create({
      data: {
        propertyType: 'Hospital',
        streetName: 'Av Principal',
        number: '1000',
        status: 'Regular',
      }
    })

  // 2. Setup Categorias de Patrimônio e Materiais
  const assetCatVeiculos = await prisma.assetCategory.findFirst({ where: { name: 'Veículos' } }) ||
    await prisma.assetCategory.create({ data: { name: 'Veículos', code: 'V01', lifeSpan: 20 } })
    
  const assetCatMoveis = await prisma.assetCategory.findFirst({ where: { name: 'Móveis e Utensílios' } }) ||
    await prisma.assetCategory.create({ data: { name: 'Móveis e Utensílios', code: 'M01', lifeSpan: 10 } })

  const assetCatInfo = await prisma.assetCategory.findFirst({ where: { name: 'Equipamentos de Informática' } }) ||
    await prisma.assetCategory.create({ data: { name: 'Equipamentos de Informática', code: 'I01', lifeSpan: 20 } })

  const matCatExpediente = await prisma.materialCategory.findFirst({ where: { name: 'Material de Expediente' } }) ||
    await prisma.materialCategory.create({ data: { name: 'Material de Expediente', code: 'ME01' } })

  // 3. Exemplo 1: Veículo da Saúde
  await prisma.asset.upsert({
    where: { patrimonyNumber: 'PAT-2026-0001' },
    update: {},
    create: {
      patrimonyNumber: 'PAT-2026-0001',
      name: 'Ambulância UTI Móvel - Mercedes Sprinter',
      brand: 'Mercedes',
      model: 'Sprinter 416',
      status: 'Em uso',
      acquisitionDate: new Date('2026-01-15'),
      acquisitionValue: 350000,
      currentValue: 320000,
      categoryId: assetCatVeiculos.id,
      departmentId: deptSaude.id,
      supplierId: supplier.id,
      realEstateId: realEstateSaude.id
    }
  })

  // 4. Exemplo 2: Equipamento de TI
  await prisma.asset.upsert({
    where: { patrimonyNumber: 'PAT-2026-0002' },
    update: {},
    create: {
      patrimonyNumber: 'PAT-2026-0002',
      name: 'Lote 10 Computadores Dell Optiplex',
      brand: 'Dell',
      model: 'Optiplex 3090',
      status: 'Ativo',
      acquisitionDate: new Date('2026-02-10'),
      acquisitionValue: 45000,
      currentValue: 42000,
      categoryId: assetCatInfo.id,
      departmentId: deptAdmin.id,
      supplierId: supplier.id,
    }
  })

  // 5. Exemplo 3: Móveis Escolares
  await prisma.asset.upsert({
    where: { patrimonyNumber: 'PAT-2026-0003' },
    update: {},
    create: {
      patrimonyNumber: 'PAT-2026-0003',
      name: 'Carteiras Escolares com Cadeira (50 unid)',
      status: 'Em uso',
      acquisitionDate: new Date('2026-03-01'),
      acquisitionValue: 15000,
      currentValue: 14500,
      categoryId: assetCatMoveis.id,
      departmentId: deptEducacao.id,
      realEstateId: realEstateEscola.id
    }
  })

  // 6. Exemplo 4: Almoxarifado Central
  const almoxarifado = await prisma.warehouse.findFirst({ where: { name: 'Almoxarifado Central' } }) ||
    await prisma.warehouse.create({
      data: {
        name: 'Almoxarifado Central',
        type: 'Geral',
        managerId: employee.id,
        isActive: true,
      }
    })

  // 7. Exemplo 5: Material de Expediente com Estoque e Requisição
  const materialPapel = await prisma.material.upsert({
    where: { code: 'MAT-001' },
    update: {},
    create: {
      code: 'MAT-001',
      name: 'Papel A4 Branco 500 fls',
      unitOfMeasure: 'CX',
      minStock: 50,
      categoryId: matCatExpediente.id,
      stocks: {
        create: {
          warehouseId: almoxarifado.id,
          quantity: 200,
          unitCost: 25.50
        }
      }
    }
  })

  // Criar uma requisição
  const reqExists = await prisma.materialRequest.findFirst({ where: { number: 'REQ-2026-001' } })
  if (!reqExists) {
    await prisma.materialRequest.create({
      data: {
        number: 'REQ-2026-001',
        departmentId: deptAdmin.id,
        requesterId: employee.id,
        status: 'Pendente',
        date: new Date(),
        items: {
          create: {
            materialId: materialPapel.id,
            quantityRequested: 10,
          }
        }
      }
    })
  }

  console.log('Seed de Patrimônio finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
