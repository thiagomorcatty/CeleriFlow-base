import "dotenv/config";
import type { HealthProfessional } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `$pbkdf2-sha512$100000$${salt}$${derivedKey}`;
}

function ensureSampleFiles() {
  const docsDir = path.join(process.cwd(), "public", "docs");
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const pdfContent = "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF\n";
  const pdfBuffer = Buffer.from(pdfContent);
  const docxBuffer = Buffer.from("PK\x03\x04Documento de Exemplo CeleriFlow POC Massivo 2026");

  const files = [
    [path.join(docsDir, "sample.pdf"), pdfBuffer],
    [path.join(docsDir, "sample.docx"), docxBuffer],
    [path.join(uploadsDir, "sample.pdf"), pdfBuffer],
  ] as [string, Buffer][];

  for (const [filePath, buffer] of files) {
    fs.writeFileSync(filePath, buffer);
  }
}

export async function runMassivePocSeed() {
  console.log("🚀 Iniciando Seed Massiva da POC CeleriFlow (500 Servidores, 500 Pessoas Físicas, 200+ por módulo)...");
  ensureSampleFiles();

  const seedPassword = process.env.SEED_USER_PASSWORD || "SenhaSegura123!";
  const pwHash = hashPassword(seedPassword);

  // 1. Exercício Fiscal e Secretarias
  await prisma.financialYear.upsert({
    where: { year: 2026 },
    create: {
      year: 2026,
      startDate: new Date("2026-01-01T00:00:00.000Z"),
      endDate: new Date("2026-12-31T23:59:59.999Z"),
      status: "Aberto",
    },
    update: { status: "Aberto" },
  });

  const secFinancas = await prisma.secretariat.upsert({
    where: { id: "sec-fin-01" },
    create: { id: "sec-fin-01", name: "Secretaria de Finanças e Planejamento", acronym: "SEFIN" },
    update: { name: "Secretaria de Finanças e Planejamento" },
  });

  const secEducacao = await prisma.secretariat.upsert({
    where: { id: "sec-edu-01" },
    create: { id: "sec-edu-01", name: "Secretaria de Educação e Cultura", acronym: "SEDUC" },
    update: { name: "Secretaria de Educação e Cultura" },
  });

  const secSaude = await prisma.secretariat.upsert({
    where: { id: "sec-sau-01" },
    create: { id: "sec-sau-01", name: "Secretaria de Saúde", acronym: "SMS" },
    update: { name: "Secretaria de Saúde" },
  });

  const secSocial = await prisma.secretariat.upsert({
    where: { id: "sec-soc-01" },
    create: { id: "sec-soc-01", name: "Secretaria de Assistência Social", acronym: "SEMAS" },
    update: { name: "Secretaria de Assistência Social" },
  });

  const deptCompras = await prisma.department.upsert({
    where: { id: "dept-compras-01" },
    create: { id: "dept-compras-01", name: "Departamento de Compras e Licitações", secretariatId: secFinancas.id },
    update: { name: "Departamento de Compras e Licitações" },
  });

  await prisma.budgetUnit.upsert({
    where: { code: "0101" },
    create: { code: "0101", name: "Prefeitura Municipal de São João do Ivaí", secretariatId: secFinancas.id },
    update: { name: "Prefeitura Municipal de São João do Ivaí" },
  });

  await prisma.budgetUnit.upsert({
    where: { code: "0201" },
    create: { code: "0201", name: "Câmara Municipal de São João do Ivaí", secretariatId: secFinancas.id },
    update: { name: "Câmara Municipal de São João do Ivaí" },
  });

  // 2. Perfis e Usuários
  const perfilAdmin = await prisma.configuracaoPerfil.upsert({
    where: { id: "perfil-admin-poc" },
    create: { id: "perfil-admin-poc", nome: "Administrador Geral", ativo: true, permissoes: '{"ALL": true}' },
    update: { nome: "Administrador Geral" },
  });

  await prisma.usuario.upsert({
    where: { email: "adminteste@email.com" },
    create: { email: "adminteste@email.com", nome: "Admin Teste POC", senha: pwHash, perfilId: perfilAdmin.id, ativo: true },
    update: { nome: "Admin Teste POC", senha: pwHash },
  });

  // 3. SEED MASSIVO: CADASTRO DE SERVIDORES (500 SERVIDORES)
  console.log("   --> Gerando 500 Servidores no RH...");
  const secretariasList = [secFinancas.id, secEducacao.id, secSaude.id, secSocial.id];
  for (let i = 1; i <= 500; i++) {
    const numStr = i.toString().padStart(4, "0");
    const part1 = (100 + (i % 800)).toString().padStart(3, "0");
    const part2 = (200 + (i % 700)).toString().padStart(3, "0");
    const part3 = (300 + (i % 600)).toString().padStart(3, "0");
    const digito = ((i * 7) % 89 + 10).toString();
    const cpfSimulado = `${part1}.${part2}.${part3}-${digito}`;
    const secId = secretariasList[i % secretariasList.length];

    await prisma.employee.upsert({
      where: { cpf: cpfSimulado },
      create: {
        name: `Servidor Teste ${i}`,
        cpf: cpfSimulado,
        registration: `MAT-2026-${numStr}`,
        secretariatId: secId,
        departmentId: deptCompras.id,
        isActive: i % 12 !== 0,
      },
      update: {
        name: `Servidor Teste ${i}`,
        isActive: i % 12 !== 0,
      },
    });
  }
  console.log("   ✅ 500 Servidores criados com sucesso.");

  // 4. SEED MASSIVO: PESSOAS FÍSICAS (500 PESSOAS) E JURÍDICAS (200 EMPRESAS)
  console.log("   --> Gerando 500 Pessoas Físicas e 200 Pessoas Jurídicas / Fornecedores...");
  for (let i = 1; i <= 500; i++) {
    const numStr = i.toString().padStart(4, "0");
    const part1 = (200 + (i % 700)).toString().padStart(3, "0");
    const part2 = (300 + (i % 600)).toString().padStart(3, "0");
    const part3 = (400 + (i % 500)).toString().padStart(3, "0");
    const digito = ((i * 11) % 89 + 10).toString();
    const cpfPessoa = `${part1}.${part2}.${part3}-${digito}`;

    // Pessoa Física
    await prisma.person.upsert({
      where: { cpf: cpfPessoa },
      create: {
        id: `person-teste-${numStr}`,
        fullName: `Pessoa Teste ${i}`,
        cpf: cpfPessoa,
        email: `pessoateste${i}@email.com`,
      },
      update: { fullName: `Pessoa Teste ${i}` },
    });
  }

  for (let i = 1; i <= 200; i++) {
    const numStr = i.toString().padStart(4, "0");
    const cnpjEmpresa = `00.${numStr.slice(0, 3)}.000/0001-${(i % 89) + 10}`;

    // Pessoa Jurídica
    const empresa = await prisma.company.upsert({
      where: { cnpj: cnpjEmpresa },
      create: {
        id: `company-teste-${numStr}`,
        cnpj: cnpjEmpresa,
        corporateName: `Empresa Teste ${i} Ltda`,
        tradeName: `Empresa Teste ${i}`,
        emailPrimary: `fornecedorteste${i}@empresa.com`,
      },
      update: { corporateName: `Empresa Teste ${i} Ltda` },
    });

    // Fornecedor
    const supp = await prisma.supplier.upsert({
      where: { id: `supp-poc-${numStr}` },
      create: { id: `supp-poc-${numStr}`, companyId: empresa.id, status: i % 8 === 0 ? "Inativo" : "Ativo" },
      update: { status: i % 8 === 0 ? "Inativo" : "Ativo" },
    });

    // Credor
    await prisma.creditor.upsert({
      where: { supplierId: supp.id },
      create: { supplierId: supp.id, name: `Empresa Teste ${i} Ltda`, document: cnpjEmpresa, companyId: empresa.id },
      update: { name: `Empresa Teste ${i} Ltda` },
    });
  }
  console.log("   ✅ 500 Pessoas Físicas e 200 Pessoas Jurídicas / Credores criados.");

  // 5. SEED MASSIVO: PROCESSO LICITATÓRIO & CONTRATOS (200 CONTRATOS E LICITAÇÕES)
  console.log("   --> Gerando 200 Licitações e Contratos...");
  const firstSupplier = await prisma.supplier.findFirst();
  const statusesContrato = ["Vigente", "Em Análise", "Encerrado", "Aditado", "Suspenso"];

  for (let i = 1; i <= 200; i++) {
    const numStr = i.toString().padStart(4, "0");
    const statusAtual = statusesContrato[i % statusesContrato.length];

    const proc = await prisma.purchaseProcess.upsert({
      where: { id: `proc-licita-massivo-${numStr}` },
      create: {
        id: `proc-licita-massivo-${numStr}`,
        number: `LICITA-2026/${numStr}`,
        object: `Aquisição/Serviço Teste de Licitação ${i} para a Gestão Municipal`,
        type: i % 2 === 0 ? "Registro de Preços" : "Menor Preço",
        modality: i % 3 === 0 ? "Pregão Eletrônico" : "Concorrência Pública",
        estimatedValue: 10000 + i * 1500,
        status: statusAtual === "Vigente" ? "Homologado" : "Em Andamento",
        secretariatId: secFinancas.id,
      },
      update: {},
    });

    if (firstSupplier) {
      await prisma.contract.upsert({
        where: { number: `CONT-2026/${numStr}` },
        create: {
          number: `CONT-2026/${numStr}`,
          object: `Contrato de Prestação de Serviços Teste ${i}`,
          initialValue: 10000 + i * 1500,
          updatedValue: 10000 + i * 1500,
          startDate: new Date("2026-01-01T00:00:00.000Z"),
          endDate: new Date("2026-12-31T23:59:59.999Z"),
          status: statusAtual,
          supplier: { connect: { id: firstSupplier.id } },
          process: { connect: { id: proc.id } },
          secretariat: { connect: { id: secFinancas.id } },
        },
        update: { status: statusAtual },
      });
    }
  }
  console.log("   ✅ 200 Licitações e 200 Contratos criados.");

  // 6. SEED MASSIVO: PATRIMÔNIO (200 BENS PATRIMONIAIS)
  console.log("   --> Gerando 200 Bens Patrimoniais...");
  const almox = await prisma.warehouse.upsert({
    where: { id: "almox-central" },
    create: { id: "almox-central", name: "Almoxarifado Central Municipal", address: "Rua Um, 10, Centro" },
    update: {},
  });

  const catMat = await prisma.materialCategory.upsert({
    where: { code: "CAT-PATRIMONIO-POC" },
    create: { code: "CAT-PATRIMONIO-POC", name: "Bens Móveis e Equipamentos de TI" },
    update: {},
  });

  for (let i = 1; i <= 200; i++) {
    const numStr = i.toString().padStart(4, "0");
    const mat = await prisma.material.upsert({
      where: { code: `PAT-MAT-${numStr}` },
      create: { code: `PAT-MAT-${numStr}`, name: `Patrimônio Equipamento Teste ${i}`, unitOfMeasure: "UN", categoryId: catMat.id },
      update: {},
    });

    await prisma.materialStock.upsert({
      where: { id: `stock-pat-${numStr}` },
      create: { id: `stock-pat-${numStr}`, warehouseId: almox.id, materialId: mat.id, quantity: 10 + i },
      update: { quantity: 10 + i },
    });
  }
  console.log("   ✅ 200 Bens Patrimoniais/Materiais criados.");

  // 7. SEED MASSIVO: EDUCAÇÃO (200 ALUNOS E MATRÍCULAS)
  console.log("   --> Gerando 200 Alunos e Matrículas na Educação...");
  const escola = await prisma.school.upsert({
    where: { inepCode: "25000001" },
    create: { inepCode: "25000001", name: "Escola Municipal Governador Agamenon Magalhães", capacity: 1000, isActive: true },
    update: {},
  });

  const turma = await prisma.schoolClass.upsert({
    where: { id: "turma-geral-poc" },
    create: { id: "turma-geral-poc", name: "Turma Única POC 2026", schoolId: escola.id, year: 2026, stage: "Ensino Fundamental", grade: "5º Ano", shift: "Manhã" },
    update: {},
  });

  for (let i = 1; i <= 200; i++) {
    const numStr = i.toString().padStart(4, "0");
    const pf = await prisma.person.findFirst({ where: { id: `person-teste-${numStr}` } });
    if (pf) {
      const student = await prisma.student.upsert({
        where: { studentCode: `ALU-2026-${numStr}` },
        create: { studentCode: `ALU-2026-${numStr}`, personId: pf.id },
        update: {},
      });

      await prisma.enrollment.upsert({
        where: { id: `enrollment-aluno-${numStr}` },
        create: { id: `enrollment-aluno-${numStr}`, studentId: student.id, schoolId: escola.id, classId: turma.id, year: 2026, status: i % 10 === 0 ? "Transferido" : "Matriculado" },
        update: { status: i % 10 === 0 ? "Transferido" : "Matriculado" },
      });
    }
  }
  console.log("   ✅ 200 Alunos e Matrículas criadas.");

  // 8. SEED MASSIVO: SAÚDE (200 PACIENTES E ATENDIMENTOS)
  console.log("   --> Gerando 200 Pacientes e Consultas de Saúde...");
  const ubs = await prisma.healthUnit.upsert({
    where: { cnes: "CNES-001" },
    create: { cnes: "CNES-001", name: "Unidade Básica de Saúde Central", type: "UBS" },
    update: {},
  });

  const firstServidor = await prisma.employee.findFirst({ where: { isActive: true } });
  let profSaude: HealthProfessional | null = null;
  if (firstServidor) {
    profSaude = await prisma.healthProfessional.upsert({
      where: { employeeId: firstServidor.id },
      create: { employeeId: firstServidor.id, councilName: "CRM", councilNumber: "CRM-PB 9999", specialty: "Clínico Geral", isActive: true },
      update: {},
    });
  }

  for (let i = 1; i <= 200; i++) {
    const numStr = i.toString().padStart(4, "0");
    const pf = await prisma.person.findFirst({ where: { id: `person-teste-${numStr}` } });
    if (pf) {
      const patient = await prisma.patient.upsert({
        where: { cns: `700000000000${numStr}` },
        create: { cns: `700000000000${numStr}`, personId: pf.id },
        update: {},
      });

      const dayStr = ((i % 28) + 1).toString().padStart(2, "0");
      if (profSaude) {
        await prisma.healthAppointment.upsert({
          where: { id: `consulta-massiva-${numStr}` },
          create: {
            id: `consulta-massiva-${numStr}`,
            patientId: patient.id,
            unitId: ubs.id,
            professionalId: profSaude.id,
            date: new Date(`2026-02-${dayStr}T10:00:00.000Z`),
            status: i % 4 === 0 ? "Cancelado" : "Atendido",
            specialty: "Clínico Geral",
          },
          update: {},
        });
      }
    }
  }
  console.log("   ✅ 200 Pacientes e Agendamentos de Saúde criados.");

  // 9. SEED MASSIVO: ASSISTÊNCIA SOCIAL (200 FAMÍLIAS E ATENDIMENTOS)
  console.log("   --> Gerando 200 Famílias no CRAS...");
  const cras = await prisma.socialUnit.upsert({
    where: { id: "cras-centro-01" },
    create: { id: "cras-centro-01", name: "CRAS Central de Assistência Social", type: "CRAS", isActive: true },
    update: {},
  });

  for (let i = 1; i <= 200; i++) {
    const numStr = i.toString().padStart(4, "0");
    const pf = await prisma.person.findFirst({ where: { id: `person-teste-${numStr}` } });
    if (pf) {
      const fam = await prisma.socialFamily.upsert({
        where: { representativeId: pf.id },
        create: { familyCode: `FAM-2026-${numStr}`, nis: `10000000${numStr}`, representativeId: pf.id, income: 1412, status: "Ativo" },
        update: {},
      });

      if (firstServidor) {
        await prisma.socialAttendance.upsert({
          where: { id: `atend-soc-massivo-${numStr}` },
          create: {
            id: `atend-soc-massivo-${numStr}`,
            family: { connect: { id: fam.id } },
            unit: { connect: { id: cras.id } },
            professional: { connect: { id: firstServidor.id } },
            date: new Date("2026-01-15T14:00:00.000Z"),
            type: "Acompanhamento Familiar PAIF",
            description: `Atendimento social para atualização de cadastro da Família Teste ${i}`,
          },
          update: {},
        });
      }
    }
  }
  console.log("   ✅ 200 Famílias e Atendimentos Sociais criados.");

  // 10. SEED MASSIVO: MEIO AMBIENTE (200 LICENÇAS AMBIENTAIS)
  console.log("   --> Gerando 200 Licenças Ambientais...");
  const empEnv = await prisma.envEnterprise.upsert({
    where: { id: "emp-env-geral" },
    create: { id: "emp-env-geral", name: "Empreendimentos Diversos Município", activityType: "Comércio e Indústria", status: "Ativo" },
    update: {},
  });

  const tiposLicenca = ["Licença Prévia (LP)", "Licença de Instalação (LI)", "Licença de Operação (LO)", "Licença Simplificada (LS)"];

  for (let i = 1; i <= 200; i++) {
    const numStr = i.toString().padStart(4, "0");
    await prisma.envLicense.upsert({
      where: { licenseNumber: `LIC-ENV-2026/${numStr}` },
      create: {
        licenseNumber: `LIC-ENV-2026/${numStr}`,
        enterpriseId: empEnv.id,
        licenseType: tiposLicenca[i % tiposLicenca.length],
        issueDate: new Date("2026-01-10T00:00:00.000Z"),
        validUntil: new Date("2027-01-10T00:00:00.000Z"),
        status: i % 5 === 0 ? "Em Análise" : "Emitida",
      },
      update: { status: i % 5 === 0 ? "Em Análise" : "Emitida" },
    });
  }
  console.log("   ✅ 200 Licenças Ambientais criadas.");

  // 11. SEED MASSIVO: OBRAS PÚBLICAS (200 OBRAS)
  console.log("   --> Gerando 200 Obras Públicas...");
  const statusObras = ["Planejada", "Em Execução", "Vistoriada", "Concluída", "Paralisada"];
  for (let i = 1; i <= 200; i++) {
    const numStr = i.toString().padStart(4, "0");
    await prisma.obrasObra.upsert({
      where: { numero: `OBRA-2026/${numStr}` },
      create: {
        id: `obra-massiva-${numStr}`,
        numero: `OBRA-2026/${numStr}`,
        nome: `Obra Pública Teste ${i} - Infraestrutura Urbana`,
        local: `Avenida Principal, nº ${i * 10}, Centro`,
        tipo: i % 2 === 0 ? "Pavimentação" : "Construção de Equipamento Público",
        valorEstimado: 50000 + i * 10000,
        status: statusObras[i % statusObras.length],
      },
      update: { status: statusObras[i % statusObras.length] },
    });
  }
  console.log("   ✅ 200 Obras Públicas criadas.");

  // 12. SEED MASSIVO: CULTURA & TURISMO (200 PROJETOS CULTURAIS)
  console.log("   --> Gerando 200 Projetos Culturais...");
  const pf1 = await prisma.person.findFirst({ where: { id: "person-teste-0001" } });
  if (pf1) {
    const agente = await prisma.culturaAgente.upsert({
      where: { id: "agente-cult-massivo" },
      create: { id: "agente-cult-massivo", nome: "Associação Cultural Municipal", personId: pf1.id, tipo: "Coletivo Cultural", segmento: "Artes Visuais e Dança" },
      update: {},
    });

    for (let i = 1; i <= 200; i++) {
      const numStr = i.toString().padStart(4, "0");
      await prisma.culturaProjeto.upsert({
        where: { numero: `PROJ-CULT-2026/${numStr}` },
        create: {
          id: `proj-cult-massivo-${numStr}`,
          numero: `PROJ-CULT-2026/${numStr}`,
          nome: `Iniciativa Cultural Teste ${i}`,
          categoria: i % 2 === 0 ? "Música e Literatura" : "Teatro e Artesanato",
          agenteId: agente.id,
          valorSolicitado: 5000 + i * 500,
          status: i % 3 === 0 ? "Em Avaliação" : "Aprovado",
        },
        update: {},
      });
    }
  }
  console.log("   ✅ 200 Projetos Culturais criados.");

  // 13. SEED MASSIVO: SEGURANÇA PÚBLICA (200 OCORRÊNCIAS)
  console.log("   --> Gerando 200 Ocorrências da Guarda Municipal...");
  const guarda = await prisma.segurancaGuarda.upsert({
    where: { matricula: "GCM-001" },
    create: { matricula: "GCM-001", nome: "Comandante Guarda Municipal Teste", tipo: "Guarda Municipal", status: "Ativo", isActive: true },
    update: {},
  });

  for (let i = 1; i <= 200; i++) {
    const numStr = i.toString().padStart(4, "0");
    await prisma.segurancaOcorrencia.upsert({
      where: { numero: `GCM-2026/${numStr}` },
      create: {
        numero: `GCM-2026/${numStr}`,
        responsavelGuardaId: guarda.id,
        tipo: i % 2 === 0 ? "Ronda Escolar Preventiva" : "Vistoria de Patrimônio Público",
        descricao: `Patrulhamento ostensivo preventivo registro nº ${i}`,
        status: i % 5 === 0 ? "Em Andamento" : "Encerrada",
      },
      update: {},
    });
  }
  console.log("   ✅ 200 Ocorrências de Segurança criadas.");

  // 14. SEED MASSIVO: SANEAMENTO (200 UNIDADES CONSUMIDORAS & FATURAS)
  console.log("   --> Gerando 200 Unidades Consumidoras de Saneamento...");
  for (let i = 1; i <= 200; i++) {
    const numStr = i.toString().padStart(4, "0");
    const uc = await prisma.sanConsumerUnit.upsert({
      where: { code: `UC-00${numStr}` },
      create: {
        code: `UC-00${numStr}`,
        address: `Rua das Flores, nº ${i * 5}, Bairro Centro`,
        category: i % 3 === 0 ? "Comercial" : "Residencial",
        status: "Ativa",
        ownerName: `Pessoa Teste ${i}`,
        ownerDocument: `100.200.${numStr}-${(i % 89) + 10}`,
      },
      update: { status: "Ativa" },
    });

    await prisma.sanInvoice.upsert({
      where: { invoiceNumber: `FAT-2026/${numStr}` },
      create: {
        invoiceNumber: `FAT-2026/${numStr}`,
        unitId: uc.id,
        competence: "01/2026",
        dueDate: new Date("2026-02-15T00:00:00.000Z"),
        totalAmount: 35.00 + i * 1.5,
        status: i % 4 === 0 ? "Pendente" : "Paga",
      },
      update: {},
    });
  }
  console.log("   ✅ 200 Unidades e Faturas de Saneamento criadas.");

  // 15. SEED MASSIVO: CÂMARA MUNICIPAL (200 PROPOSIÇÕES LEGISLATIVAS)
  console.log("   --> Gerando 200 Proposições Legislativas na Câmara...");
  const leg = await prisma.camLegislatura.upsert({
    where: { numero: 19 },
    create: { id: "leg-2025-2028", numero: 19, inicio: new Date("2025-01-01T00:00:00.000Z"), fim: new Date("2028-12-31T23:59:59.999Z"), status: "Ativa" },
    update: {},
  });

  if (pf1) {
    const vereador = await prisma.camVereador.upsert({
      where: { id: "ver-massivo-01" },
      create: { id: "ver-massivo-01", legislaturaId: leg.id, personId: pf1.id, nomeCompleto: "Vereador Presidente da Câmara Teste", nomeParlamentar: "Vereador Teste", partido: "PARTIDO MUNICIPAL" },
      update: {},
    });

    for (let i = 1; i <= 200; i++) {
      const numStr = i.toString().padStart(4, "0");
      await prisma.camProposicao.upsert({
        where: { numero: `PL-2026/${numStr}` },
        create: {
          autorId: vereador.id,
          tipo: i % 2 === 0 ? "Projeto de Lei Ordinária" : "Requerimento Legislativo",
          numero: `PL-2026/${numStr}`,
          ementa: `Proposição legislativa teste nº ${i} para melhoria de serviços públicos`,
          status: i % 3 === 0 ? "Aprovado em Votação" : "Protocolada",
        },
        update: {},
      });
    }
  }
  console.log("   ✅ 200 Proposições Legislativas criadas.");

  // 16. SEED MASSIVO: CONEXÕES E LOGS DE INTEGRAÇÃO (CONSOLE DE INTEGRAÇÕES TÉCNICAS)
  console.log("   --> Gerando Conexões e Logs para o Console Técnico de Integrações...");
  const integracoesMock = [
    { code: "TCE_INTEGRATION", name: "Tribunal de Contas do Estado (TCE/PB)", cat: "Auditoria Externa", endpoint: "https://api.tce.pb.gov.br/v2/prestacao-contas" },
    { code: "RECEITA_FEDERAL", name: "Receita Federal (CNPJ/CPF)", cat: "Receita Federal", endpoint: "https://api.receitafederal.gov.br/v1/cnpj/consultar" },
    { code: "BANCO_BRASIL_PIX", name: "Banco do Brasil (Pagamentos & PIX)", cat: "Financeiro & Bancos", endpoint: "https://api.bb.com.br/v2/pix/pagamentos" },
    { code: "ESOCIAL_RH", name: "eSocial (Folha de Pagamento Servidores)", cat: "Governo Federal", endpoint: "https://api.esocial.gov.br/v1/eventos/folha" },
    { code: "CADUNICO_SOCIAL", name: "CadÚnico / Governo Federal", cat: "Assistência Social", endpoint: "https://api.cadunico.gov.br/v1/familias" },
  ];

  for (const item of integracoesMock) {
    const conn = await prisma.integrationConnection.upsert({
      where: { code: item.code },
      create: {
        code: item.code,
        name: item.name,
        category: item.cat,
        provider: "GOV_EXTERN",
        status: "ENABLED",
        configuration: { endpoint: item.endpoint, version: "2.1.0", timeoutMs: 5000 },
        mockScenario: { simulateSuccessRate: 0.95, mockResponseCode: 200 },
      },
      update: { status: "ENABLED" },
    });

    await prisma.integrationRun.create({
      data: {
        connectionId: conn.id,
        operation: "CRON_SYNC",
        environment: "MOCK",
        status: "SUCESSO",
        message: `Requisição enviada com sucesso para ${item.endpoint}. 200 OK`,
        payload: { status: "OK", protocol: `PROT-${Date.now()}`, data: { status: "PROCESSADO", timestamp: new Date().toISOString() } },
      },
    });

    await prisma.integrationRun.create({
      data: {
        connectionId: conn.id,
        operation: "REPROCESSAR_MANUAL",
        environment: "MOCK",
        status: "SUCESSO",
        message: "Reprocessamento executado pelo painel administrativo da POC.",
        payload: { status: "SUCCESS", reprocessedAt: new Date().toISOString() },
      },
    });
  }
  console.log("   ✅ Conexões de Integração e Logs para o Console Técnico criados.");

  console.log("🎉 Seed Massiva da POC CeleriFlow concluída com sucesso em TODOS os módulos!");
}

if (require.main === module) {
  runMassivePocSeed()
    .catch((e) => {
      console.error("❌ Erro ao executar a Seed Massiva:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
