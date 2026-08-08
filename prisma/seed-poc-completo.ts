import "dotenv/config";
import { Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { generateInternalReportDataset, reportDatasetCsv } from "../src/lib/financeiro/report-delivery";
import { publicFinancialReportDocumentType } from "../src/lib/transparencia/portal-public";

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

  // Minimal valid PDF
  const pdfContent = "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF\n";
  const pdfBuffer = Buffer.from(pdfContent);

  // 1×1 transparent PNG (minimal)
  const pngBuffer = Buffer.from(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c48900000000a49444154789c6260000000000200010e021800000000049454e44ae426082",
    "hex"
  );

  // Minimal JPEG
  const jpgBuffer = Buffer.from(
    "ffd8ffe000104a46494600010100000100010000ffdb004300080606070605080707070909080a0c140d0c0b0b0c1912130f141d1a1f1e1d1a1c1c20242e2720222c231c1c2837292c30313434341f27393d38323c2e333432ffdb0043010909090c0b0c180d0d1832211c213232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232ffc00011080001000103012200021101031101ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a929394959697989 90a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20ffd9",
    "hex"
  );

  const docxBuffer = Buffer.from("PK\x03\x04Documento de Exemplo CeleriFlow POC 2026");

  const files = [
    [path.join(docsDir, "sample.pdf"), pdfBuffer],
    [path.join(docsDir, "nf-001452.pdf"), pdfBuffer],
    [path.join(docsDir, "sample.docx"), docxBuffer],
    [path.join(docsDir, "sample.png"), pngBuffer],
    [path.join(docsDir, "sample.jpg"), jpgBuffer],
    [path.join(uploadsDir, "sample.pdf"), pdfBuffer],
    [path.join(uploadsDir, "sample.docx"), docxBuffer],
    [path.join(uploadsDir, "sample.png"), pngBuffer],
    [path.join(uploadsDir, "sample.jpg"), jpgBuffer],
  ] as [string, Buffer][];

  for (const [filePath, buffer] of files) {
    fs.writeFileSync(filePath, buffer);
  }
  console.log("📁 Arquivos de exemplo criados em /public/docs e /public/uploads");
}

async function main() {
  console.log("🌱 Gerando Base Completa da POC do CeleriFlow / AcessoFlow...");
  ensureSampleFiles();

  const seedPassword = process.env.SEED_USER_PASSWORD || "SenhaSegura123!";

  // ---------------------------------------------------------------------------
  // 1. Exercício Fiscal e Secretarias
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

  // ---------------------------------------------------------------------------
  // 2. Unidades Gestoras (BudgetUnit)
  // ---------------------------------------------------------------------------
  const ugPrefeitura = await prisma.budgetUnit.upsert({
    where: { code: "0101" },
    create: { code: "0101", name: "Prefeitura Municipal de São João do Ivaí", secretariatId: secFinancas.id },
    update: { name: "Prefeitura Municipal de São João do Ivaí" },
  });

  const ugCamara = await prisma.budgetUnit.upsert({
    where: { code: "0201" },
    create: { code: "0201", name: "Câmara Municipal de São João do Ivaí", secretariatId: secFinancas.id },
    update: { name: "Câmara Municipal de São João do Ivaí" },
  });

  // ---------------------------------------------------------------------------
  // 3. Perfis e Usuários (AcessoFlow)
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

  const perfilCidadao = await prisma.configuracaoPerfil.upsert({
    where: { id: "perfil-cidadao-poc" },
    create: {
      id: "perfil-cidadao-poc",
      nome: "Cidadão",
      descricao: "Acesso à Ouvidoria e ao Portal da Transparência.",
      ativo: true,
      permissoes: JSON.stringify({ acesso: "cidadao", modulosPermitidos: ["OUVIDORIA", "TRANSPARENCIA"] }),
    },
    update: {
      nome: "Cidadão",
      descricao: "Acesso à Ouvidoria e ao Portal da Transparência.",
      ativo: true,
      permissoes: JSON.stringify({ acesso: "cidadao", modulosPermitidos: ["OUVIDORIA", "TRANSPARENCIA"] }),
    },
  });

  // Usuários — senha hash gerada dinamicamente com salt correto
  const pwHash = hashPassword(seedPassword);

  const usuarioAdmin = await prisma.usuario.upsert({
    where: { email: "adminteste@email.com" },
    create: {
      email: "adminteste@email.com",
      nome: "Admin Teste",
      senha: pwHash,
      perfilId: perfilAdmin.id,
      ativo: true,
    },
    update: { nome: "Admin Teste", senha: hashPassword(seedPassword) },
  });

  await prisma.usuarioUnidadeGestora.upsert({
    where: { usuarioId_budgetUnitId: { usuarioId: usuarioAdmin.id, budgetUnitId: ugPrefeitura.id } },
    create: { usuarioId: usuarioAdmin.id, budgetUnitId: ugPrefeitura.id },
    update: {},
  });
  await prisma.usuarioUnidadeGestora.upsert({
    where: { usuarioId_budgetUnitId: { usuarioId: usuarioAdmin.id, budgetUnitId: ugCamara.id } },
    create: { usuarioId: usuarioAdmin.id, budgetUnitId: ugCamara.id },
    update: {},
  });

  const usuarioGestor = await prisma.usuario.upsert({
    where: { email: "gestao1@email.com" },
    create: { email: "gestao1@email.com", nome: "Gestão 1", senha: hashPassword(seedPassword), perfilId: perfilGestor.id, ativo: true },
    update: { nome: "Gestão 1", senha: hashPassword(seedPassword) },
  });
  await prisma.usuarioUnidadeGestora.upsert({
    where: { usuarioId_budgetUnitId: { usuarioId: usuarioGestor.id, budgetUnitId: ugPrefeitura.id } },
    create: { usuarioId: usuarioGestor.id, budgetUnitId: ugPrefeitura.id },
    update: {},
  });

  const usuarioServidor = await prisma.usuario.upsert({
    where: { email: "servidor1@email.com" },
    create: { email: "servidor1@email.com", nome: "Servidor 1", senha: hashPassword(seedPassword), perfilId: perfilServidor.id, ativo: true },
    update: { nome: "Servidor 1", senha: hashPassword(seedPassword) },
  });
  await prisma.usuarioUnidadeGestora.upsert({
    where: { usuarioId_budgetUnitId: { usuarioId: usuarioServidor.id, budgetUnitId: ugPrefeitura.id } },
    create: { usuarioId: usuarioServidor.id, budgetUnitId: ugPrefeitura.id },
    update: {},
  });

  const usuarioContador = await prisma.usuario.upsert({
    where: { email: "contadorteste@email.com" },
    create: { email: "contadorteste@email.com", nome: "Contador Teste", senha: hashPassword(seedPassword), perfilId: perfilContador.id, ativo: true },
    update: { nome: "Contador Teste", senha: hashPassword(seedPassword) },
  });
  await prisma.usuarioUnidadeGestora.upsert({
    where: { usuarioId_budgetUnitId: { usuarioId: usuarioContador.id, budgetUnitId: ugPrefeitura.id } },
    create: { usuarioId: usuarioContador.id, budgetUnitId: ugPrefeitura.id },
    update: {},
  });

  const usuarioCidadao1 = await prisma.usuario.upsert({
    where: { email: "pessoateste1@email.com" },
    create: { email: "pessoateste1@email.com", nome: "Pessoa Teste1", senha: hashPassword(seedPassword), perfilId: perfilCidadao.id, ativo: true },
    update: { nome: "Pessoa Teste1", senha: hashPassword(seedPassword), perfilId: perfilCidadao.id, ativo: true },
  });

  const usuarioCidadao2 = await prisma.usuario.upsert({
    where: { email: "pessoateste2@email.com" },
    create: { email: "pessoateste2@email.com", nome: "Pessoa Teste2", senha: hashPassword(seedPassword), perfilId: perfilCidadao.id, ativo: true },
    update: { nome: "Pessoa Teste2", senha: hashPassword(seedPassword), perfilId: perfilCidadao.id, ativo: true },
  });

  await prisma.usuarioUnidadeGestora.deleteMany({
    where: { usuarioId: { in: [usuarioCidadao1.id, usuarioCidadao2.id] } },
  });

  // ---------------------------------------------------------------------------
  // 4. Pessoas, Empresas, Fornecedores
  // ---------------------------------------------------------------------------
  const pessoaFisica1 = await prisma.person.upsert({
    where: { cpf: "111.111.111-11" },
    create: { id: "person-teste-01", fullName: "Pessoa Teste1", cpf: "111.111.111-11", email: "pessoateste1@email.com" },
    update: { fullName: "Pessoa Teste1" },
  });

  const pessoaFisica2 = await prisma.person.upsert({
    where: { cpf: "222.222.222-22" },
    create: { id: "person-teste-02", fullName: "Pessoa Teste2", cpf: "222.222.222-22", email: "pessoateste2@email.com" },
    update: { fullName: "Pessoa Teste2" },
  });

  const empresaTeste = await prisma.company.upsert({
    where: { cnpj: "00.000.000/0001-91" },
    create: { id: "company-teste-01", cnpj: "00.000.000/0001-91", corporateName: "Empresa Teste Ltda", tradeName: "Empresa Teste", emailPrimary: "empresateste@email.com" },
    update: { corporateName: "Empresa Teste Ltda" },
  });

  const fornecedor = await prisma.supplier.upsert({
    where: { id: "supp-poc-01" },
    create: { id: "supp-poc-01", companyId: empresaTeste.id, status: "Ativo" },
    update: { status: "Ativo" },
  });

  await prisma.creditor.upsert({
    where: { supplierId: fornecedor.id },
    create: { supplierId: fornecedor.id, name: "Empresa Teste Ltda", document: "00.000.000/0001-91", companyId: empresaTeste.id },
    update: { name: "Empresa Teste Ltda" },
  });

  const servidor = await prisma.employee.upsert({
    where: { cpf: "333.333.333-33" },
    create: { name: "Servidor 1", cpf: "333.333.333-33", secretariatId: secFinancas.id, departmentId: deptCompras.id, isActive: true },
    update: { name: "Servidor 1" },
  });

  // ---------------------------------------------------------------------------
  // 5. Orçamento e Finanças
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

  await prisma.annualBudgetLaw.upsert({
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
    update: { currentBalanceDecimal: new Prisma.Decimal("800000.00"), currentBalance: 800000, isActive: true },
  });

  // ---------------------------------------------------------------------------
  // 6. Compras & Licitações (Lei 14.133/2021)
  // ---------------------------------------------------------------------------
  const itemCatalogo = await prisma.catalogItem.upsert({
    where: { id: "cat-item-01" },
    create: { id: "cat-item-01", code: "MAT-001", name: "Papel A4 Reciclado 75g", unit: "Pacote", description: "Pacote de papel A4 reciclado 500 folhas" },
    update: { name: "Papel A4 Reciclado 75g" },
  });

  const solicitacaoCompra = await prisma.purchaseRequest.upsert({
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

  const processoLicitatorio = await prisma.purchaseProcess.upsert({
    where: { id: "proc-licita-01" },
    create: {
      id: "proc-licita-01",
      number: "PROC-2026/001",
      object: "Registro de preços para fornecimento contínuo de material de escritório",
      type: "Registro de Preços",
      modality: "Pregão",
      estimatedValue: 12500,
      status: "Homologado",
      secretariatId: secFinancas.id,
    },
    update: { status: "Homologado" },
  });

  const contratoPoc = await prisma.contract.upsert({
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
      process: { connect: { id: processoLicitatorio.id } },
      secretariat: { connect: { id: secFinancas.id } },
    },
    update: { status: "Vigente" },
  });

  const convenioPoc = await prisma.covenant.upsert({
    where: { number: "CONV-2026/001" },
    create: {
      number: "CONV-2026/001",
      grantor: "Ministério da Saúde / FNS",
      description: "Apoio ao Programa Saúde da Família em Lagoa Seca/PB",
      totalValueDecimal: new Prisma.Decimal(500000),
      startDate: new Date("2026-01-01T00:00:00.000Z"),
      endDate: new Date("2026-12-31T23:59:59.999Z"),
      status: "Ativo",
    },
    update: { status: "Ativo" },
  });

  const campanhaPoc = await prisma.publicityCampaign.upsert({
    where: { name: "Campanha Lagoa Seca Transparente 2026" },
    create: {
      name: "Campanha Lagoa Seca Transparente 2026",
      agency: "Agência Pública de Comunicação S/A",
      contractNumber: "CONT-2026/001",
      approvedBudgetDecimal: new Prisma.Decimal(120000),
      startDate: new Date("2026-01-01T00:00:00.000Z"),
      endDate: new Date("2026-12-31T23:59:59.999Z"),
      status: "Ativa",
    },
    update: { status: "Ativa" },
  });

  const dividaPoc = await prisma.fundedDebt.upsert({
    where: { lawNumber: "Lei-482/2020" },
    create: {
      creditorName: "Caixa Econômica Federal - FINISA",
      lawNumber: "Lei-482/2020",
      contractNumber: "FINISA-004/2020",
      principalValueDecimal: new Prisma.Decimal(1500000),
      amortizationSchedule: "Mensal 120 parcelas com carência de 24 meses",
      status: "Ativa",
    },
    update: { status: "Ativa" },
  });

  // ---------------------------------------------------------------------------
  // 7. Patrimônio & Almoxarifado
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
  // 8. Educação Pública
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
  // 9. Saúde Pública
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
    where: { employeeId: servidor.id },
    create: { employeeId: servidor.id, councilName: "CRM", councilNumber: "CRM-PB 12345", specialty: "Médico de Família", isActive: true },
    update: { specialty: "Médico de Família" },
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
  // 10. Assistência Social (CRAS / CadÚnico)
  // ---------------------------------------------------------------------------
  const crasCentro = await prisma.socialUnit.upsert({
    where: { id: "cras-centro-01" },
    create: { id: "cras-centro-01", name: "CRAS Teste - Centro", type: "CRAS", isActive: true },
    update: { name: "CRAS Teste - Centro" },
  });

  const familiaSocial = await prisma.socialFamily.upsert({
    where: { representativeId: pessoaFisica1.id },
    create: { familyCode: "FAM-001-2026", nis: "123456789-01", representativeId: pessoaFisica1.id, income: 1412, status: "Ativo" },
    update: { nis: "123456789-01" },
  });

  await prisma.socialAttendance.upsert({
    where: { id: "atend-soc-01" },
    create: {
      id: "atend-soc-01",
      family: { connect: { id: familiaSocial.id } },
      unit: { connect: { id: crasCentro.id } },
      professional: { connect: { id: servidor.id } },
      date: new Date("2026-01-20T10:00:00.000Z"),
      type: "PAIF",
      description: "Atendimento presencial para inclusão e atualização no Cadastro Único",
    },
    update: {},
  });

  // ---------------------------------------------------------------------------
  // 11. Meio Ambiente
  // ---------------------------------------------------------------------------
  const empreendimento = await prisma.envEnterprise.upsert({
    where: { id: "emp-env-01" },
    create: { id: "emp-env-01", name: "Empreendimento Comercial Teste", activityType: "Comércio", status: "Ativo" },
    update: {},
  });

  await prisma.envLicense.upsert({
    where: { licenseNumber: "LIC-ENV-2026/001" },
    create: {
      licenseNumber: "LIC-ENV-2026/001",
      enterpriseId: empreendimento.id,
      licenseType: "Licença de Operação",
      issueDate: new Date("2026-01-10T00:00:00.000Z"),
      validUntil: new Date("2027-01-10T00:00:00.000Z"),
      status: "Emitida",
    },
    update: { status: "Emitida" },
  });

  // ---------------------------------------------------------------------------
  // 12. Obras & Serviços Urbanos
  // ---------------------------------------------------------------------------
  await prisma.obrasObra.upsert({
    where: { numero: "OBRA-2026/001" },
    create: {
      id: "obra-01",
      numero: "OBRA-2026/001",
      nome: "Reforma da Praça Central",
      local: "Rua Um, 10, Centro, Lagoa Seca - PB",
      tipo: "Reforma",
      valorEstimado: 150000,
      status: "Em Execução",
    },
    update: { status: "Em Execução" },
  });

  // ---------------------------------------------------------------------------
  // 13. Cultura, Esporte & Lazer
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
  // 14. Segurança Pública & Guarda Municipal
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
      tipo: "Ronda Preventiva",
      descricao: "Ronda ostensiva de rotina sem alterações",
      status: "Encerrada",
    },
    update: { status: "Encerrada" },
  });

  // ---------------------------------------------------------------------------
  // 15. Saneamento, Água & Esgoto
  // ---------------------------------------------------------------------------
  const unidadeConsumidora = await prisma.sanConsumerUnit.upsert({
    where: { code: "UC-00100" },
    create: {
      code: "UC-00100",
      address: "Rua Um, 10, Centro, Lagoa Seca - PB",
      category: "Residencial",
      status: "Ativa",
      ownerName: "Pessoa Teste1",
      ownerDocument: "111.111.111-11",
    },
    update: { status: "Ativa" },
  });

  await prisma.sanWaterMeter.upsert({
    where: { meterNumber: "HID-2026-99" },
    create: { meterNumber: "HID-2026-99", unitId: unidadeConsumidora.id, installation: new Date("2025-01-01T00:00:00.000Z") },
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
  // 16. Câmara Municipal
  // ---------------------------------------------------------------------------
  const legislatura = await prisma.camLegislatura.upsert({
    where: { numero: 19 },
    create: {
      id: "leg-2025-2028",
      numero: 19,
      inicio: new Date("2025-01-01T00:00:00.000Z"),
      fim: new Date("2028-12-31T23:59:59.999Z"),
      status: "Ativa",
    },
    update: { status: "Ativa" },
  });

  const vereador = await prisma.camVereador.upsert({
    where: { id: "ver-01" },
    create: {
      id: "ver-01",
      legislaturaId: legislatura.id,
      personId: pessoaFisica1.id,
      nomeCompleto: "Pessoa Teste1",
      nomeParlamentar: "Vereador Teste 1",
      partido: "PARTIDO TESTE",
    },
    update: { nomeParlamentar: "Vereador Teste 1" },
  });

  await prisma.camProposicao.upsert({
    where: { numero: "PL-2026/001" },
    create: {
      autorId: vereador.id,
      tipo: "Projeto de Lei",
      numero: "PL-2026/001",
      ementa: "Dispõe sobre a criação do programa de incentivo ao primeiro emprego no município",
      status: "Protocolada",
    },
    update: { status: "Protocolada" },
  });

  // ---------------------------------------------------------------------------
  // 17. GED - Documentos Genéricos
  // ---------------------------------------------------------------------------
  await prisma.document.upsert({
    where: { id: "doc-sample-pdf" },
    create: { id: "doc-sample-pdf", title: "Documento de Teste PDF - GED", documentType: "Relatorio Tecnico", fileUrl: "/docs/sample.pdf", status: "Válido" },
    update: {},
  });

  await prisma.document.upsert({
    where: { id: "doc-sample-docx" },
    create: { id: "doc-sample-docx", title: "Documento de Teste Word - GED", documentType: "Termo de Referencia", fileUrl: "/docs/sample.docx", status: "Válido" },
    update: {},
  });

  await prisma.document.upsert({
    where: { id: "doc-sample-png" },
    create: { id: "doc-sample-png", title: "Imagem de Teste PNG - GED", documentType: "Comprovante", fileUrl: "/docs/sample.png", status: "Válido" },
    update: {},
  });

  await prisma.document.upsert({
    where: { id: "doc-sample-jpg" },
    create: { id: "doc-sample-jpg", title: "Imagem de Teste JPG - GED", documentType: "Vistoria", fileUrl: "/docs/sample.jpg", status: "Válido" },
    update: {},
  });

  // ---------------------------------------------------------------------------
  // 18. Publicação de Snapshots Públicos no Portal da Transparência
  // ---------------------------------------------------------------------------
  const exercise2026 = await prisma.financialYear.findUnique({ where: { year: 2026 } });
  if (exercise2026) {
    const reportTypes = ["RREO", "RGF", "BALANCETE", "BALANCO_ORCAMENTARIO", "BALANCO_PATRIMONIAL", "PCA"] as const;
    for (const reportType of reportTypes) {
      try {
        const dataset = await generateInternalReportDataset(prisma, reportType, exercise2026.id, 2026);
        const csv = reportDatasetCsv(dataset);
        const docType = publicFinancialReportDocumentType(exercise2026.id, reportType);
        const docId = `pub-doc-${reportType.toLowerCase()}-2026`;

        const doc = await prisma.document.upsert({
          where: { id: docId },
          create: {
            id: docId,
            title: `Relatório público ${reportType} 2026`,
            documentType: docType,
            fileUrl: `/docs/relatorio-${reportType.toLowerCase()}-2026.csv`,
            status: "Publicado",
          },
          update: { status: "Publicado" },
        });

        await prisma.documentVersion.upsert({
          where: { id: `pub-ver-${reportType.toLowerCase()}-2026` },
          create: {
            id: `pub-ver-${reportType.toLowerCase()}-2026`,
            documentId: doc.id,
            versionNumber: 1,
            fileUrl: doc.fileUrl,
            hashSha256: "0000000000000000000000000000000000000000000000000000000000000000",
            status: "FINAL",
          },
          update: { status: "FINAL" },
        });
      } catch (err) {
        console.warn(`Snapshot do relatório ${reportType} não gerado na seed:`, err);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Resumo Final
  // ---------------------------------------------------------------------------
  console.log("✅ Seed Completa da POC do CeleriFlow/AcessoFlow gerada com sucesso!");
  console.log("--------------------------------------------------------------------");
  console.log("🔑 Contas de Acesso:");
  console.log(`   Admin:    adminteste@email.com    / ${seedPassword}`);
  console.log(`   Gestor:   gestao1@email.com       / ${seedPassword}`);
  console.log(`   Servidor: servidor1@email.com     / ${seedPassword}`);
  console.log(`   Contador: contadorteste@email.com / ${seedPassword}`);
  console.log(`   Cidadão1: pessoateste1@email.com  / ${seedPassword}`);
  console.log(`   Cidadão2: pessoateste2@email.com  / ${seedPassword}`);
  console.log("--------------------------------------------------------------------");
  console.log("📁 Arquivos GED disponíveis em /public/docs/");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar a seed de POC:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
