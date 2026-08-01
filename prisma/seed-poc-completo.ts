import "dotenv/config";
import { Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

function hashPassword(password: string, saltHex?: string) {
  const salt = saltHex ?? crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `$pbkdf2-sha512$100000$${salt}$${derivedKey}`;
}

function ensureSampleFiles() {
  const docsDir = path.join(process.cwd(), "public", "docs");
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const pdfBuffer = Buffer.from(
    "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF\n"
  );

  const pngBuffer = Buffer.from(
    "iVBORw0KGgoAAAANSU65UgAAABJRU5ErkJggg==",
    "base64"
  );

  const jpgBuffer = Buffer.from(
    "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=",
    "base64"
  );

  const docxBuffer = Buffer.from("Documento de Exemplo Word / DOCX para Teste CeleriFlow POC");

  fs.writeFileSync(path.join(docsDir, "sample.pdf"), pdfBuffer);
  fs.writeFileSync(path.join(docsDir, "nf-001452.pdf"), pdfBuffer);
  fs.writeFileSync(path.join(docsDir, "sample.docx"), docxBuffer);
  fs.writeFileSync(path.join(docsDir, "sample.png"), pngBuffer);
  fs.writeFileSync(path.join(docsDir, "sample.jpg"), jpgBuffer);

  fs.writeFileSync(path.join(uploadsDir, "sample.pdf"), pdfBuffer);
  fs.writeFileSync(path.join(uploadsDir, "sample.docx"), docxBuffer);
  fs.writeFileSync(path.join(uploadsDir, "sample.png"), pngBuffer);
  fs.writeFileSync(path.join(uploadsDir, "sample.jpg"), jpgBuffer);
}

async function main() {
  console.log("🌱 Gerando Base Completa da POC do CeleriFlow / AcessoFlow...");
  ensureSampleFiles();

  const seedPassword = process.env.SEED_USER_PASSWORD || "SenhaSegura123!";
  const passwordHash = hashPassword(seedPassword);

  // ---------------------------------------------------------------------------
  // 1. Instância, Exercício e Governança
  // ---------------------------------------------------------------------------
  const year2026 = await prisma.financialYear.upsert({
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

  const deptCompras = await prisma.department.upsert({
    where: { id: "dept-compras-01" },
    create: { id: "dept-compras-01", name: "Departamento de Compras e Licitações", secretariatId: secFinancas.id },
    update: { name: "Departamento de Compras e Licitações" },
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

  const ugPrefeitura = await prisma.budgetUnit.upsert({
    where: { code: "0101" },
    create: { code: "0101", name: "Prefeitura Municipal de Lagoa Seca", secretariatId: secFinancas.id },
    update: { name: "Prefeitura Municipal de Lagoa Seca" },
  });

  const ugCamara = await prisma.budgetUnit.upsert({
    where: { code: "0201" },
    create: { code: "0201", name: "Câmara Municipal de Lagoa Seca", secretariatId: secFinancas.id },
    update: { name: "Câmara Municipal de Lagoa Seca" },
  });

  // ---------------------------------------------------------------------------
  // 2. Perfis e Usuários Padrão (Linha AcessoFlow)
  // ---------------------------------------------------------------------------
  const perfilAdmin = await prisma.configuracaoPerfil.upsert({
    where: { id: "perfil-admin-poc" },
    create: { id: "perfil-admin-poc", nome: "Administrador Geral", ativo: true, permissoes: '{"ALL": true}' },
    update: { nome: "Administrador Geral" },
  });

  const perfilGestor = await prisma.configuracaoPerfil.upsert({
    where: { id: "perfil-gestor-poc" },
    create: { id: "perfil-gestor-poc", nome: "Gestor Municipal", ativo: true, permissoes: '{"GESTAO": true, "FINANCEIRO": true}' },
    update: { nome: "Gestor Municipal" },
  });

  const perfilServidor = await prisma.configuracaoPerfil.upsert({
    where: { id: "perfil-servidor-poc" },
    create: { id: "perfil-servidor-poc", nome: "Servidor Operador", ativo: true, permissoes: '{"OPERACAO": true}' },
    update: { nome: "Servidor Operador" },
  });

  const perfilContador = await prisma.configuracaoPerfil.upsert({
    where: { id: "perfil-contador-poc" },
    create: { id: "perfil-contador-poc", nome: "Contador Responsável", ativo: true, permissoes: '{"FINANCEIRO": true}' },
    update: { nome: "Contador Responsável" },
  });

  // Admin: adminteste@email.com
  await prisma.usuario.upsert({
    where: { email: "adminteste@email.com" },
    create: {
      email: "adminteste@email.com",
      nome: "Admin Teste",
      senha: passwordHash,
      perfilId: perfilAdmin.id,
      ativo: true,
      unidadesGestoras: { create: [{ budgetUnitId: ugPrefeitura.id }, { budgetUnitId: ugCamara.id }] },
    },
    update: { nome: "Admin Teste", senha: passwordHash },
  });

  // Gestor: gestao1@email.com
  await prisma.usuario.upsert({
    where: { email: "gestao1@email.com" },
    create: {
      email: "gestao1@email.com",
      nome: "Gestão 1",
      senha: passwordHash,
      perfilId: perfilGestor.id,
      ativo: true,
      unidadesGestoras: { create: [{ budgetUnitId: ugPrefeitura.id }] },
    },
    update: { nome: "Gestão 1", senha: passwordHash },
  });

  // Servidor: servidor1@email.com
  await prisma.usuario.upsert({
    where: { email: "servidor1@email.com" },
    create: {
      email: "servidor1@email.com",
      nome: "Servidor 1",
      senha: passwordHash,
      perfilId: perfilServidor.id,
      ativo: true,
      unidadesGestoras: { create: [{ budgetUnitId: ugPrefeitura.id }] },
    },
    update: { nome: "Servidor 1", senha: passwordHash },
  });

  // Contador: contadorteste@email.com
  await prisma.usuario.upsert({
    where: { email: "contadorteste@email.com" },
    create: {
      email: "contadorteste@email.com",
      nome: "Contador Teste",
      senha: passwordHash,
      perfilId: perfilContador.id,
      ativo: true,
      unidadesGestoras: { create: [{ budgetUnitId: ugPrefeitura.id }, { budgetUnitId: ugCamara.id }] },
    },
    update: { nome: "Contador Teste", senha: passwordHash },
  });

  // Cidadão 1 & 2
  await prisma.usuario.upsert({
    where: { email: "pessoateste1@email.com" },
    create: { email: "pessoateste1@email.com", nome: "Pessoa Teste1", senha: passwordHash, perfilId: perfilServidor.id, ativo: true },
    update: { nome: "Pessoa Teste1", senha: passwordHash },
  });

  await prisma.usuario.upsert({
    where: { email: "pessoateste2@email.com" },
    create: { email: "pessoateste2@email.com", nome: "Pessoa Teste2", senha: passwordHash, perfilId: perfilServidor.id, ativo: true },
    update: { nome: "Pessoa Teste2", senha: passwordHash },
  });

  // ---------------------------------------------------------------------------
  // 3. Pessoas e Endereços Genéricos
  // ---------------------------------------------------------------------------
  const pessoaFisica1 = await prisma.person.upsert({
    where: { cpf: "111.111.111-11" },
    create: {
      id: "person-teste-01",
      fullName: "Pessoa Teste1",
      cpf: "111.111.111-11",
      rg: "1.111.111-SSP/PB",
      email: "pessoateste1@email.com",
    },
    update: { fullName: "Pessoa Teste1", email: "pessoateste1@email.com" },
  });

  const pessoaFisica2 = await prisma.person.upsert({
    where: { cpf: "222.222.222-22" },
    create: {
      id: "person-teste-02",
      fullName: "Pessoa Teste2",
      cpf: "222.222.222-22",
      rg: "2.222.222-SSP/PB",
      email: "pessoateste2@email.com",
    },
    update: { fullName: "Pessoa Teste2", email: "pessoateste2@email.com" },
  });

  const empresaTeste = await prisma.company.upsert({
    where: { cnpj: "00.000.000/0001-91" },
    create: {
      id: "company-teste-01",
      cnpj: "00.000.000/0001-91",
      corporateName: "Empresa Teste Ltda",
      tradeName: "Empresa Teste",
      emailPrimary: "empreateste@email.com",
    },
    update: { corporateName: "Empresa Teste Ltda", emailPrimary: "empreateste@email.com" },
  });

  const fornecedor = await prisma.supplier.upsert({
    where: { id: "supp-poc-01" },
    create: { id: "supp-poc-01", companyId: empresaTeste.id, status: "Ativo" },
    update: { status: "Ativo" },
  });

  await prisma.creditor.upsert({
    where: { supplierId: fornecedor.id },
    create: {
      supplierId: fornecedor.id,
      name: "Empresa Teste Ltda",
      document: "00.000.000/0001-91",
      companyId: empresaTeste.id,
    },
    update: { name: "Empresa Teste Ltda" },
  });

  const servidor = await prisma.employee.upsert({
    where: { cpf: "333.333.333-33" },
    create: {
      name: "Servidor 1",
      cpf: "333.333.333-33",
      secretariatId: secFinancas.id,
      departmentId: deptCompras.id,
      isActive: true,
    },
    update: { name: "Servidor 1" },
  });

  // ---------------------------------------------------------------------------
  // 4. Orçamento & Finanças
  // ---------------------------------------------------------------------------
  const fonteOrdinaria = await prisma.resourceSource.upsert({
    where: { code: "15000000" },
    create: { code: "15000000", name: "Recursos Não Vinculados de Impostos (Ordinário)" },
    update: {},
  });

  const ndMaterial = await prisma.expenseNature.upsert({
    where: { code: "3.3.90.30.00" },
    create: { code: "3.3.90.30.00", name: "Material de Consumo" },
    update: {},
  });

  const loa = await prisma.annualBudgetLaw.upsert({
    where: { id: "loa-2026-poc" },
    create: {
      id: "loa-2026-poc",
      financialYearId: year2026.id,
      lawNumber: "LOA-2026-001",
      publicationDate: new Date("2025-12-15T00:00:00.000Z"),
      totalRevenue: 15000000,
      totalExpense: 15000000,
      status: "Vigente",
    },
    update: { status: "Vigente" },
  });

  await prisma.budgetAppropriation.upsert({
    where: { code: "0101.04.122.0001.2002.3.3.90.30.00" },
    create: {
      code: "0101.04.122.0001.2002.3.3.90.30.00",
      financialYearId: year2026.id,
      budgetUnitId: ugPrefeitura.id,
      expenseNatureId: ndMaterial.id,
      resourceSourceId: fonteOrdinaria.id,
      initialValueDecimal: new Prisma.Decimal("10000000.00"),
      updatedValueDecimal: new Prisma.Decimal("10000000.00"),
      committedValueDecimal: new Prisma.Decimal("0.00"),
      initialValue: 10000000,
      updatedValue: 10000000,
      committedValue: 0,
    },
    update: {},
  });

  await prisma.bankAccount.upsert({
    where: { id: "cl-lagoaseca-bb-pref-1000" },
    create: {
      id: "cl-lagoaseca-bb-pref-1000",
      bankName: "Banco do Brasil S.A.",
      agency: "1234-5",
      accountNumber: "10000-1",
      accountType: "Movimento",
      currentBalanceDecimal: new Prisma.Decimal("800000.00"),
      currentBalance: 800000,
      resourceSourceId: fonteOrdinaria.id,
      budgetUnitId: ugPrefeitura.id,
      isActive: true,
    },
    update: { currentBalanceDecimal: new Prisma.Decimal("800000.00"), resourceSourceId: fonteOrdinaria.id, budgetUnitId: ugPrefeitura.id, isActive: true },
  });

  // ---------------------------------------------------------------------------
  // 5. Compras & Licitações (Lei 14.133/2021)
  // ---------------------------------------------------------------------------
  const itemCatalogo = await prisma.catalogItem.upsert({
    where: { id: "cat-item-01" },
    create: { id: "cat-item-01", code: "MAT-001", name: "Papel A4 Reciclado 75g", unit: "Pacote", description: "Pacote de papel A4 reciclado 500 folhas" },
    update: { name: "Papel A4 Reciclado 75g" },
  });

  await prisma.purchaseRequest.upsert({
    where: { id: "sol-compra-01" },
    create: {
      id: "sol-compra-01",
      number: "SOL-2026/001",
      object: "Aquisição de material de expediente",
      justification: "Aquisição de material de expediente para as secretarias municipais",
      estimatedValue: 12500,
      status: "Aprovada",
      priority: "Normal",
      requesterId: servidor.id,
      secretariatId: secFinancas.id,
      departmentId: deptCompras.id,
      items: {
        create: [{ catalogItemId: itemCatalogo.id, quantity: 500, estimatedUnitValue: 25 }],
      },
    },
    update: { status: "Aprovada" },
  });

  const processoLicilatorio = await prisma.purchaseProcess.upsert({
    where: { id: "proc-licita-01" },
    create: {
      id: "proc-licita-01",
      number: "PROC-2026/001",
      object: "Registro de preços para fornecimento continuo de material de escritório",
      type: "Registro de Preços",
      modality: "Pregão",
      estimatedValue: 12500,
      status: "Homologado",
      secretariatId: secFinancas.id,
    },
    update: { status: "Homologado" },
  });

  await prisma.contract.upsert({
    where: { number: "CONT-2026/001" },
    create: {
      number: "CONT-2026/001",
      object: "Fornecimento de material de consumo e escritório",
      initialValue: 12500,
      updatedValue: 12500,
      startDate: new Date("2026-01-15T00:00:00.000Z"),
      endDate: new Date("2026-12-31T23:59:59.999Z"),
      status: "Vigente",
      supplier: { connect: { id: fornecedor.id } },
      process: { connect: { id: processoLicilatorio.id } },
      secretariat: { connect: { id: secFinancas.id } },
    },
    update: { status: "Vigente" },
  });

  // ---------------------------------------------------------------------------
  // 6. Patrimônio & Almoxarifado
  // ---------------------------------------------------------------------------
  const almoxarifadoCentral = await prisma.warehouse.upsert({
    where: { id: "almox-central" },
    create: { id: "almox-central", name: "Almoxarifado Central Municipal", address: "Rua Um, 10, Centro, Lagoa Seca - PB" },
    update: { name: "Almoxarifado Central Municipal" },
  });

  const categoriaMaterial = await prisma.materialCategory.upsert({
    where: { code: "CAT-EXPEDIENTE" },
    create: { code: "CAT-EXPEDIENTE", name: "Material de Expediente e Escritório" },
    update: {},
  });

  const materialConsumo = await prisma.material.upsert({
    where: { code: "MAT-001-STOCK" },
    create: { code: "MAT-001-STOCK", name: "Papel A4 Reciclado 75g", unitOfMeasure: "PCT", categoryId: categoriaMaterial.id },
    update: {},
  });

  await prisma.materialStock.upsert({
    where: { id: "stock-central-mat001" },
    create: { id: "stock-central-mat001", warehouseId: almoxarifadoCentral.id, materialId: materialConsumo.id, quantity: 450 },
    update: { quantity: 450 },
  });

  // ---------------------------------------------------------------------------
  // 7. Educação Pública
  // ---------------------------------------------------------------------------
  const escolaMunicipal = await prisma.school.upsert({
    where: { inepCode: "25000001" },
    create: { inepCode: "25000001", name: "Escola Municipal Teste", capacity: 300, isActive: true },
    update: { name: "Escola Municipal Teste" },
  });

  const aluno = await prisma.student.upsert({
    where: { studentCode: "ALU-2026-001" },
    create: { studentCode: "ALU-2026-001", personId: pessoaFisica2.id },
    update: {},
  });

  const turmaFundamental = await prisma.schoolClass.upsert({
    where: { id: "turma-5ano-a" },
    create: { id: "turma-5ano-a", name: "5º Ano A - Ensino Fundamental", schoolId: escolaMunicipal.id, year: 2026, stage: "Ensino Fundamental", grade: "5º Ano", shift: "Manhã" },
    update: { name: "5º Ano A - Ensino Fundamental" },
  });

  await prisma.enrollment.upsert({
    where: { id: "enrollment-aluno-01" },
    create: { id: "enrollment-aluno-01", studentId: aluno.id, schoolId: escolaMunicipal.id, classId: turmaFundamental.id, year: 2026, status: "Matriculado" },
    update: { status: "Matriculado" },
  });

  // ---------------------------------------------------------------------------
  // 8. Saúde Pública (e-SUS)
  // ---------------------------------------------------------------------------
  const ubsCentro = await prisma.healthUnit.upsert({
    where: { cnes: "CNES-001" },
    create: { cnes: "CNES-001", name: "UBS Teste 1 - Centro", type: "Unidade Básica de Saúde" },
    update: { name: "UBS Teste 1 - Centro" },
  });

  const paciente = await prisma.patient.upsert({
    where: { cns: "700000000000001" },
    create: { cns: "700000000000001", personId: pessoaFisica2.id },
    update: {},
  });

  const profissionalSaude = await prisma.healthProfessional.upsert({
    where: { id: "prof-saude-01" },
    create: { id: "prof-saude-01", employeeId: servidor.id, councilNumber: "CRM-PB 12345", specialty: "Médico de Família" },
    update: {},
  });

  await prisma.healthAppointment.upsert({
    where: { id: "consulta-01" },
    create: {
      id: "consulta-01",
      patientId: paciente.id,
      unitId: ubsCentro.id,
      professionalId: profissionalSaude.id,
      date: new Date("2026-02-01T09:00:00.000Z"),
      status: "Atendido",
      specialty: "Médico de Família",
    },
    update: { status: "Atendido" },
  });

  // ---------------------------------------------------------------------------
  // 9. Assistência Social (CRAS / CadÚnico)
  // ---------------------------------------------------------------------------
  const crasCentro = await prisma.socialUnit.upsert({
    where: { code: "CRAS-001" },
    create: { code: "CRAS-001", name: "CRAS Teste - Centro", address: "Rua Um, 10, Centro, Lagoa Seca - PB" },
    update: { name: "CRAS Teste - Centro" },
  });

  const familiaSocial = await prisma.socialFamily.upsert({
    where: { nis: "123.45678.90-1" },
    create: { nis: "123.45678.90-1", headPersonId: pessoaFisica1.id, socialUnitId: crasCentro.id, monthlyIncome: new Prisma.Decimal("1412.00") },
    update: {},
  });

  await prisma.socialAttendance.upsert({
    where: { id: "atend-soc-01" },
    create: {
      id: "atend-soc-01",
      socialFamilyId: familiaSocial.id,
      socialUnitId: crasCentro.id,
      date: new Date("2026-01-20T10:00:00.000Z"),
      type: "Acolhimento e Cadastro Único",
      notes: "Atendimento presencial para inclusão e atualização cadastral",
    },
    update: {},
  });

  // ---------------------------------------------------------------------------
  // 10. Meio Ambiente
  // ---------------------------------------------------------------------------
  const empreendimento = await prisma.envEnterprise.upsert({
    where: { id: "emp-env-01" },
    create: { id: "emp-env-01", name: "Empreendimento Comercial Teste", companyId: empresaTeste.id, activity: "Comércio de Materiais" },
    update: {},
  });

  await prisma.envLicense.upsert({
    where: { number: "LIC-ENV-2026/001" },
    create: {
      number: "LIC-ENV-2026/001",
      enterpriseId: empreendimento.id,
      type: "Licença de Operação",
      issueDate: new Date("2026-01-10T00:00:00.000Z"),
      expirationDate: new Date("2027-01-10T00:00:00.000Z"),
      status: "Emitida",
    },
    update: { status: "Emitida" },
  });

  // ---------------------------------------------------------------------------
  // 11. Obras & Serviços Urbanos
  // ---------------------------------------------------------------------------
  await prisma.obrasObra.upsert({
    where: { numero: "OBRA-2026/001" },
    create: {
      id: "obra-01",
      numero: "OBRA-2026/001",
      nome: "Obra Teste 1 - Reforma da Praça Central",
      local: "Rua Um, 10, Centro, Lagoa Seca - PB",
      tipo: "Reforma",
      valorEstimado: 150000,
      status: "Em Execução",
    },
    update: { status: "Em Execução" },
  });

  // ---------------------------------------------------------------------------
  // 12. Cultura, Esporte & Lazer
  // ---------------------------------------------------------------------------
  const agenteCultural = await prisma.culturaAgente.upsert({
    where: { id: "agente-cult-01" },
    create: { id: "agente-cult-01", nome: "Agente Cultural Teste", personId: pessoaFisica1.id, tipo: "Artista Individual", segmento: "Música" },
    update: {},
  });

  await prisma.culturaProjeto.upsert({
    where: { numero: "PROJ-CULT-2026/001" },
    create: {
      id: "proj-cult-01",
      numero: "PROJ-CULT-2026/001",
      nome: "Projeto Cultural Som da Terra",
      categoria: "Música",
      agenteId: agenteCultural.id,
      valorSolicitado: 15000,
      status: "Aprovado",
    },
    update: { status: "Aprovado" },
  });

  // ---------------------------------------------------------------------------
  // 13. Segurança Pública, Trânsito & Guarda
  // ---------------------------------------------------------------------------
  const guardaMunicipal = await prisma.segurancaGuarda.upsert({
    where: { matricula: "GCM-001" },
    create: { matricula: "GCM-001", nome: "Guarda Municipal 1", tipo: "Guarda Municipal", status: "Ativo", isActive: true },
    update: { status: "Ativo" },
  });

  await prisma.segurancaOcorrencia.upsert({
    where: { numero: "GCM-2026/001" },
    create: {
      numero: "GCM-2026/001",
      responsavelGuardaId: guardaMunicipal.id,
      tipo: "Ronda Escolar Preventiva",
      descricao: "Ronda ostensiva de rotina na Escola Municipal Teste sem alterações",
      status: "Encerrada",
    },
    update: { status: "Encerrada" },
  });

  // ---------------------------------------------------------------------------
  // 14. Saneamento, Água & Esgoto
  // ---------------------------------------------------------------------------
  const unidadeConsumidora = await prisma.sanConsumerUnit.upsert({
    where: { code: "UC-00100" },
    create: { code: "UC-00100", address: "Rua Um, 10, Centro, Lagoa Seca - PB", category: "Residencial", status: "Ativa", ownerName: "Pessoa Teste1", ownerDocument: "111.111.111-11" },
    update: { status: "Ativa" },
  });

  const hidrometro = await prisma.sanWaterMeter.upsert({
    where: { meterNumber: "HID-2026-99" },
    create: { meterNumber: "HID-2026-99", consumerUnitId: unidadeConsumidora.id, installation: new Date("2025-01-01T00:00:00.000Z") },
    update: {},
  });

  await prisma.sanInvoice.upsert({
    where: { invoiceNumber: "FAT-2026/01" },
    create: {
      invoiceNumber: "FAT-2026/01",
      unitId: unidadeConsumidora.id,
      competence: "01/2026",
      dueDate: new Date("2026-02-10T00:00:00.000Z"),
      totalAmount: 45.50,
      status: "Paga",
    },
    update: { status: "Paga" },
  });

  // ---------------------------------------------------------------------------
  // 15. Câmara Municipal
  // ---------------------------------------------------------------------------
  const legislatura = await prisma.camLegislatura.upsert({
    where: { id: "leg-2025-2028" },
    create: { id: "leg-2025-2028", numero: 19, dataInicio: new Date("2025-01-01T00:00:00.000Z"), dataFim: new Date("2028-12-31T23:59:59.999Z") },
    update: {},
  });

  const vereador = await prisma.camVereador.upsert({
    where: { id: "ver-01" },
    create: { id: "ver-01", legislaturaId: legislatura.id, personId: pessoaFisica1.id, nomeCompleto: "Pessoa Teste1", nomeParlamentar: "Vereador Teste 1", partido: "PARTIDO TESTE" },
    update: { nomeParlamentar: "Vereador Teste 1" },
  });

  await prisma.camProposicao.upsert({
    where: { numero: "PL-2026/001" },
    create: {
      legislaturaId: legislatura.id,
      autorId: vereador.id,
      tipo: "Projeto de Lei",
      numero: "PL-2026/001",
      ementa: "Dispõe sobre a criação do programa de incentivo ao primeiro emprego no município",
      status: "Protocolada",
    },
    update: { status: "Protocolada" },
  });

  // ---------------------------------------------------------------------------
  // 16. Documentos GED (PDF, Word, Imagem PNG e JPG)
  // ---------------------------------------------------------------------------
  await prisma.document.upsert({
    where: { id: "doc-sample-pdf" },
    create: {
      id: "doc-sample-pdf",
      title: "Documento de Teste PDF - GED",
      documentType: "Relatorio Tecnico",
      fileUrl: "/docs/sample.pdf",
      status: "Válido",
    },
    update: {},
  });

  await prisma.document.upsert({
    where: { id: "doc-sample-docx" },
    create: {
      id: "doc-sample-docx",
      title: "Documento de Teste Word - GED",
      documentType: "Termo de Referencia",
      fileUrl: "/docs/sample.docx",
      status: "Válido",
    },
    update: {},
  });

  await prisma.document.upsert({
    where: { id: "doc-sample-png" },
    create: {
      id: "doc-sample-png",
      title: "Imagem de Teste PNG - GED",
      documentType: "Comprovante",
      fileUrl: "/docs/sample.png",
      status: "Válido",
    },
    update: {},
  });

  await prisma.document.upsert({
    where: { id: "doc-sample-jpg" },
    create: {
      id: "doc-sample-jpg",
      title: "Imagem de Teste JPG - GED",
      documentType: "Vistoria",
      fileUrl: "/docs/sample.jpg",
      status: "Válido",
    },
    update: {},
  });

  console.log("✅ Seed Completa da POC do CeleriFlow/AcessoFlow gerada com sucesso!");
  console.log("--------------------------------------------------------------------");
  console.log("📁 Documentos de Exemplo Criados no GED e no Servidor:");
  console.log("   - PDF:   /docs/sample.pdf & /docs/nf-001452.pdf");
  console.log("   - Word:  /docs/sample.docx");
  console.log("   - PNG:   /docs/sample.png");
  console.log("   - JPG:   /docs/sample.jpg");
  console.log("--------------------------------------------------------------------");
  console.log("🔑 Contas de Teste Prontas:");
  console.log("   - Admin: adminteste@email.com / " + seedPassword);
  console.log("   - Gestor: gestao1@email.com / " + seedPassword);
  console.log("   - Servidor: servidor1@email.com / " + seedPassword);
  console.log("   - Contador: contadorteste@email.com / " + seedPassword);
  console.log("   - Cidadão 1: pessoateste1@email.com / " + seedPassword);
  console.log("   - Cidadão 2: pessoateste2@email.com / " + seedPassword);
  console.log("--------------------------------------------------------------------");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar a seed de POC:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
