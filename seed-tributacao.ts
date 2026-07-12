import { prisma } from "./src/lib/prisma";

async function main() {
  console.log("Seeding Tributação Data...");

  // 1. Create a Base Taxpayer (Company)
  let baseCompany = await prisma.company.findUnique({ where: { cnpj: "12345678000199" } });
  if (!baseCompany) {
    baseCompany = await prisma.company.create({
      data: {
        corporateName: "Empresa Exemplo Tributação LTDA",
        tradeName: "Exemplo Trib",
        cnpj: "12345678000199",
        companyType: "LTDA",
        status: "Ativo",
      }
    });
  }

  let baseTaxpayer = await prisma.taxpayer.findUnique({ where: { companyId: baseCompany.id } });
  if (!baseTaxpayer) {
    baseTaxpayer = await prisma.taxpayer.create({
      data: {
        taxpayerType: "PJ",
        municipalInsc: "IM-998877",
        companyId: baseCompany.id,
      }
    });
  }
  
  // 1. Create a Base Taxpayer (Person)
  let basePerson = await prisma.person.findUnique({ where: { cpf: "11122233344" } });
  if (!basePerson) {
    basePerson = await prisma.person.create({
      data: {
        fullName: "João Silva Tributos",
        cpf: "11122233344",
        status: "Ativo",
      }
    });
  }

  let baseTaxpayerPerson = await prisma.taxpayer.findUnique({ where: { personId: basePerson.id } });
  if (!baseTaxpayerPerson) {
    baseTaxpayerPerson = await prisma.taxpayer.create({
      data: {
        taxpayerType: "PF",
        municipalInsc: "IM-112233",
        personId: basePerson.id,
      }
    });
  }

  const taxpayers = [baseTaxpayer, baseTaxpayerPerson];

  // 1. Imóveis (RealEstate)
  console.log("Creating RealEstates...");
  await prisma.realEstate.createMany({
    data: [
      {
        municipalInsc: "IMO-001",
        registration: "REG-001",
        propertyType: "Casa",
        status: "Regular",
        taxpayerId: taxpayers[0].id,
        streetName: "Rua das Flores",
        number: "123",
        landArea: 300,
        builtArea: 150
      },
      {
        municipalInsc: "IMO-002",
        registration: "REG-002",
        propertyType: "Apartamento",
        status: "Irregular",
        taxpayerId: taxpayers[1].id,
        streetName: "Av Brasil",
        number: "456",
        landArea: 100,
        builtArea: 80
      },
      {
        municipalInsc: "IMO-003",
        registration: "REG-003",
        propertyType: "Terreno",
        status: "Regular",
        taxpayerId: taxpayers[0].id,
        streetName: "Rua do Comércio",
        number: "789",
        landArea: 500,
        builtArea: 0
      }
    ],
    skipDuplicates: true
  });

  // 2. Econômico (EconomicRegistration)
  console.log("Creating EconomicRegistrations...");
  await prisma.economicRegistration.createMany({
    data: [
      {
        municipalInsc: "ECO-001",
        primaryCnae: "6201-5/01",
        taxRegime: "Simples Nacional",
        status: "Ativo",
        taxpayerId: taxpayers[0].id,
        startDate: new Date("2020-01-01")
      },
      {
        municipalInsc: "ECO-002",
        primaryCnae: "4711-3/02",
        taxRegime: "Lucro Presumido",
        status: "Inativo",
        taxpayerId: taxpayers[1].id,
        startDate: new Date("2021-06-15")
      },
      {
        municipalInsc: "ECO-003",
        primaryCnae: "8599-6/04",
        taxRegime: "MEI",
        status: "Ativo",
        taxpayerId: taxpayers[0].id,
        startDate: new Date("2022-03-10")
      }
    ],
    skipDuplicates: true
  });

  const ecos = await prisma.economicRegistration.findMany();

  // 3. Alvarás (License)
  console.log("Creating Licenses...");
  await prisma.license.createMany({
    data: [
      {
        licenseType: "Alvará de Funcionamento",
        status: "Emitido",
        taxpayerId: taxpayers[0].id,
        economicRegistrationId: ecos[0]?.id,
        issueDate: new Date("2026-01-10"),
        validUntil: new Date("2026-12-31")
      },
      {
        licenseType: "Licença Sanitária",
        status: "Vencido",
        taxpayerId: taxpayers[1].id,
        economicRegistrationId: ecos[1]?.id,
        issueDate: new Date("2025-01-10"),
        validUntil: new Date("2025-12-31")
      },
      {
        licenseType: "Alvará de Construção",
        status: "Solicitado",
        taxpayerId: taxpayers[0].id
      }
    ]
  });

  // Create a Tax for Assessments
  let tax = await prisma.tax.findFirst({ where: { name: "IPTU 2026" } });
  if (!tax) {
    tax = await prisma.tax.create({
      data: {
        name: "IPTU 2026",
        taxType: "Imposto"
      }
    });
  }

  // 4 & 5. Tax Assessment & Guides
  console.log("Creating TaxAssessments and Guides...");
  const as1 = await prisma.taxAssessment.create({
    data: {
      year: 2026,
      originalValue: 1200.50,
      status: "Lançado",
      taxId: tax.id,
      taxpayerId: taxpayers[0].id
    }
  });

  await prisma.taxGuide.create({
    data: {
      barcode: "34191.09008 10799.489181 21040.500008 1 89000000120050",
      totalValue: 1200.50,
      dueDate: new Date("2026-02-15"),
      status: "Emitida",
      assessmentId: as1.id
    }
  });

  const as2 = await prisma.taxAssessment.create({
    data: {
      year: 2025,
      originalValue: 800.00,
      status: "Pago",
      taxId: tax.id,
      taxpayerId: taxpayers[1].id
    }
  });

  await prisma.taxGuide.create({
    data: {
      barcode: "34191.09008 10799.489181 21040.500008 2 89000000080000",
      totalValue: 800.00,
      dueDate: new Date("2025-02-15"),
      status: "Paga",
      assessmentId: as2.id
    }
  });

  const as3 = await prisma.taxAssessment.create({
    data: {
      year: 2026,
      originalValue: 500.00,
      status: "Cancelado",
      taxId: tax.id,
      taxpayerId: taxpayers[0].id
    }
  });

  await prisma.taxGuide.create({
    data: {
      barcode: "34191.09008 10799.489181 21040.500008 3 89000000050000",
      totalValue: 500.00,
      dueDate: new Date("2026-03-15"),
      status: "Cancelada",
      assessmentId: as3.id
    }
  });


  // 4. Dívida Ativa (ActiveDebt)
  console.log("Creating ActiveDebts...");
  await prisma.activeDebt.createMany({
    data: [
      {
        originDebtType: "IPTU",
        year: 2024,
        originalValue: 1000,
        updatedValue: 1350.25,
        cdaNumber: "CDA-2024-001",
        status: "Inscrita",
        taxpayerId: taxpayers[0].id
      },
      {
        originDebtType: "ISS",
        year: 2023,
        originalValue: 5000,
        updatedValue: 6200.00,
        cdaNumber: "CDA-2023-002",
        status: "Em Cobrança",
        taxpayerId: taxpayers[1].id
      },
      {
        originDebtType: "Taxa de Lixo",
        year: 2025,
        originalValue: 200,
        updatedValue: 215.00,
        cdaNumber: "CDA-2025-003",
        status: "Paga",
        taxpayerId: taxpayers[0].id
      }
    ],
    skipDuplicates: true
  });

  // 6. Certidões (TaxCertificate)
  console.log("Creating TaxCertificates...");
  await prisma.taxCertificate.createMany({
    data: [
      {
        certificateType: "Negativa",
        authCode: "AUTH-12345",
        validUntil: new Date("2026-12-31"),
        status: "Emitida",
        taxpayerId: taxpayers[0].id
      },
      {
        certificateType: "Positiva com Efeito",
        authCode: "AUTH-67890",
        validUntil: new Date("2026-06-30"),
        status: "Emitida",
        taxpayerId: taxpayers[1].id
      },
      {
        certificateType: "Negativa",
        authCode: "AUTH-54321",
        validUntil: new Date("2025-12-31"),
        status: "Revogada",
        taxpayerId: taxpayers[0].id
      }
    ],
    skipDuplicates: true
  });

  // 7. Fiscalização (Infraction)
  console.log("Creating Infractions...");
  await prisma.infraction.createMany({
    data: [
      {
        infractionType: "Omissão de ISS",
        penaltyValue: 2500.00,
        defenseDeadline: new Date("2026-08-15"),
        status: "Emitido",
        taxpayerId: taxpayers[0].id
      },
      {
        infractionType: "Falta de Alvará",
        penaltyValue: 800.00,
        status: "Pago",
        taxpayerId: taxpayers[1].id
      },
      {
        infractionType: "Placa Irregular",
        penaltyValue: 300.00,
        defenseDeadline: new Date("2026-07-20"),
        status: "Cancelado",
        taxpayerId: taxpayers[0].id
      }
    ]
  });

  // 8. NFS-e (Invoice)
  console.log("Creating Invoices...");
  await prisma.invoice.createMany({
    data: [
      {
        verificationCode: "VER-1001",
        serviceValue: 1500.00,
        issValue: 75.00,
        competence: "05/2026",
        status: "Emitida",
        providerId: taxpayers[0].id,
        takerId: taxpayers[1].id
      },
      {
        verificationCode: "VER-1002",
        serviceValue: 5000.00,
        issValue: 250.00,
        competence: "06/2026",
        status: "Emitida",
        providerId: taxpayers[1].id,
        takerId: taxpayers[0].id
      },
      {
        verificationCode: "VER-1003",
        serviceValue: 300.00,
        issValue: 15.00,
        competence: "06/2026",
        status: "Cancelada",
        providerId: taxpayers[0].id,
        takerId: taxpayers[1].id
      }
    ],
    skipDuplicates: true
  });

  console.log("Tributação Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
