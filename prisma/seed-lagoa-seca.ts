import "dotenv/config";
import { Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("🌱 Gerando Base Modelo Completa de Homologação e POC para Lagoa Seca/PB...");

  // 1. Exercício Financeiro
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

  // 2. Secretaria de Finanças e Unidades Gestoras
  const secretariaFinancas = await prisma.secretariat.upsert({
    where: { id: "sec-fin-01" },
    create: { id: "sec-fin-01", name: "Secretaria de Finanças e Planejamento", acronym: "SEFIN" },
    update: { name: "Secretaria de Finanças e Planejamento" },
  });

  const ugPrefeitura = await prisma.budgetUnit.upsert({
    where: { code: "0101" },
    create: { code: "0101", name: "Prefeitura Municipal de Lagoa Seca", secretariatId: secretariaFinancas.id },
    update: { name: "Prefeitura Municipal de Lagoa Seca", secretariatId: secretariaFinancas.id },
  });

  const ugCamara = await prisma.budgetUnit.upsert({
    where: { code: "0201" },
    create: { code: "0201", name: "Câmara Municipal de Lagoa Seca", secretariatId: secretariaFinancas.id },
    update: { name: "Câmara Municipal de Lagoa Seca", secretariatId: secretariaFinancas.id },
  });

  // 3. Perfis e Usuários Segregados por UG
  const perfilContador = await prisma.configuracaoPerfil.upsert({
    where: { id: "perfil-contador-lagoaseca" },
    create: { id: "perfil-contador-lagoaseca", nome: "Contador Responsável", ativo: true, permissoes: '{"FINANCEIRO": true}' },
    update: { nome: "Contador Responsável" },
  });

  const userPrefeitura = await prisma.usuario.upsert({
    where: { email: "contador.prefeitura@lagoaseca.pb.gov.br" },
    create: {
      email: "contador.prefeitura@lagoaseca.pb.gov.br",
      nome: "Contador Prefeitura - Lagoa Seca",
      senha: "SenhaSegura123!",
      perfilId: perfilContador.id,
      ativo: true,
      unidadesGestoras: {
        create: { budgetUnitId: ugPrefeitura.id },
      },
    },
    update: { nome: "Contador Prefeitura - Lagoa Seca" },
  });

  const userCamara = await prisma.usuario.upsert({
    where: { email: "contador.camara@lagoaseca.pb.gov.br" },
    create: {
      email: "contador.camara@lagoaseca.pb.gov.br",
      nome: "Contador Câmara - Lagoa Seca",
      senha: "SenhaSegura123!",
      perfilId: perfilContador.id,
      ativo: true,
      unidadesGestoras: {
        create: { budgetUnitId: ugCamara.id },
      },
    },
    update: { nome: "Contador Câmara - Lagoa Seca" },
  });

  // 4. Servidor Público
  const servidorOperador = await prisma.employee.upsert({
    where: { cpf: "111.222.333-44" },
    create: {
      name: "João da Silva - Tesoureiro",
      cpf: "111.222.333-44",
      secretariatId: secretariaFinancas.id,
      isActive: true,
    },
    update: { name: "João da Silva - Tesoureiro" },
  });

  // 5. Fontes de Recurso
  const fonteOrdinaria = await prisma.resourceSource.upsert({
    where: { code: "15000000" },
    create: { code: "15000000", name: "Recursos Não Vinculados de Impostos (Ordinário)" },
    update: {},
  });

  const fonteEducacao = await prisma.resourceSource.upsert({
    where: { code: "15010000" },
    create: { code: "15010000", name: "Outros Recursos Vinculados à Educação (MDE)" },
    update: {},
  });

  // 6. Naturezas de Despesa
  const ndMaterial = await prisma.expenseNature.upsert({
    where: { code: "3.3.90.30.00" },
    create: { code: "3.3.90.30.00", name: "Material de Consumo" },
    update: {},
  });

  const ndPessoal = await prisma.expenseNature.upsert({
    where: { code: "3.1.90.11.00" },
    create: { code: "3.1.90.11.00", name: "Vencimentos e Vantagens Fixas - Pessoal Civil" },
    update: {},
  });

  // 7. Naturezas de Receita
  const nrIPTU = await prisma.revenueNature.upsert({
    where: { code: "1.1.1.2.50.0.1" },
    create: { code: "1.1.1.2.50.0.1", name: "Imposto sobre a Propriedade Predial e Territorial Urbana - IPTU" },
    update: {},
  });

  const nrFPM = await prisma.revenueNature.upsert({
    where: { code: "1.7.1.8.01.2.1" },
    create: { code: "1.7.1.8.01.2.1", name: "Cota-Parte do Fundo de Participação dos Municípios - FPM" },
    update: {},
  });

  // 8. Planejamento Orçamentário (PPA, LDO, LOA)
  const ppa = await prisma.multiYearPlan.upsert({
    where: { code: "PPA-2026-2029" },
    create: {
      code: "PPA-2026-2029",
      name: "PPA 2026-2029 - Lagoa Seca",
      startYear: 2026,
      endYear: 2029,
      description: "Plano Plurianual de Lagoa Seca/PB 2026-2029",
      status: "Aprovado",
    },
    update: {},
  });

  const ldo = await prisma.budgetGuideline.upsert({
    where: { id: "ldo-2026-lagoaseca" },
    create: {
      id: "ldo-2026-lagoaseca",
      financialYearId: year2026.id,
      status: "Vigente",
    },
    update: {},
  });

  const loa = await prisma.annualBudgetLaw.upsert({
    where: { id: "loa-2026-lagoaseca" },
    create: {
      id: "loa-2026-lagoaseca",
      financialYearId: year2026.id,
      lawNumber: "LOA nº 1.050/2025",
      publicationDate: new Date("2025-12-15T00:00:00.000Z"),
      totalRevenue: 15000000,
      totalExpense: 15000000,
      status: "Vigente",
    },
    update: {},
  });

  // Previsão de Receita na LOA
  await prisma.annualBudgetRevenueForecast.upsert({
    where: { id: "forecast-iptu-2026" },
    create: {
      id: "forecast-iptu-2026",
      annualBudgetLawId: loa.id,
      code: nrIPTU.code,
      name: nrIPTU.name,
      estimatedValue: new Prisma.Decimal("3000000.00"),
    },
    update: { estimatedValue: new Prisma.Decimal("3000000.00") },
  });

  await prisma.annualBudgetRevenueForecast.upsert({
    where: { id: "forecast-fpm-2026" },
    create: {
      id: "forecast-fpm-2026",
      annualBudgetLawId: loa.id,
      code: nrFPM.code,
      name: nrFPM.name,
      estimatedValue: new Prisma.Decimal("12000000.00"),
    },
    update: { estimatedValue: new Prisma.Decimal("12000000.00") },
  });

  // 9. Contas Bancárias Ativas com Fonte Obrigatória e Saldo de Abertura
  const contaBBPrefeitura = await prisma.bankAccount.upsert({
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
      isActive: true,
    },
    update: { currentBalanceDecimal: new Prisma.Decimal("800000.00"), resourceSourceId: fonteOrdinaria.id, isActive: true },
  });

  const contaBBCamara = await prisma.bankAccount.upsert({
    where: { id: "cl-lagoaseca-bb-cam-2000" },
    create: {
      id: "cl-lagoaseca-bb-cam-2000",
      bankName: "Banco do Brasil S.A.",
      agency: "1234-5",
      accountNumber: "20000-2",
      accountType: "Movimento",
      currentBalanceDecimal: new Prisma.Decimal("200000.00"),
      currentBalance: 200000,
      resourceSourceId: fonteOrdinaria.id,
      isActive: true,
    },
    update: { currentBalanceDecimal: new Prisma.Decimal("200000.00"), resourceSourceId: fonteOrdinaria.id, isActive: true },
  });

  // Movimentos de abertura de saldo nas contas
  await prisma.treasuryMovement.upsert({
    where: { idempotencyKey: "SEED:LAGOA_SECA:PREF:OPENING_BALANCE" },
    create: {
      date: new Date("2026-01-01T08:00:00.000Z"),
      type: "OpeningBalance",
      direction: "Entrada",
      valueDecimal: new Prisma.Decimal("800000.00"),
      history: "Saldo Inicial de Tesouraria - Prefeitura de Lagoa Seca/PB",
      bankAccountId: contaBBPrefeitura.id,
      financialYearId: year2026.id,
      sourceModule: "FINANCEIRO",
      sourceType: "SEED",
      eventType: "OPENING_BALANCE",
      status: "Confirmado",
      idempotencyKey: "SEED:LAGOA_SECA:PREF:OPENING_BALANCE",
    },
    update: {},
  });

  await prisma.treasuryMovement.upsert({
    where: { idempotencyKey: "SEED:LAGOA_SECA:CAM:OPENING_BALANCE" },
    create: {
      date: new Date("2026-01-01T08:00:00.000Z"),
      type: "OpeningBalance",
      direction: "Entrada",
      valueDecimal: new Prisma.Decimal("200000.00"),
      history: "Saldo Inicial de Tesouraria - Câmara de Lagoa Seca/PB",
      bankAccountId: contaBBCamara.id,
      financialYearId: year2026.id,
      sourceModule: "FINANCEIRO",
      sourceType: "SEED",
      eventType: "OPENING_BALANCE",
      status: "Confirmado",
      idempotencyKey: "SEED:LAGOA_SECA:CAM:OPENING_BALANCE",
    },
    update: {},
  });

  // 10. Regras de Retenção Tributária
  await prisma.retentionRule.upsert({
    where: { code: "INSS_11" },
    create: {
      code: "INSS_11",
      type: "INSS",
      description: "Retenção de INSS 11% sobre serviços tomados",
      calculationBasePercentage: new Prisma.Decimal("100.00"),
      ratePercentage: new Prisma.Decimal("11.00"),
      dueDays: 20,
      beneficiaryName: "Instituto Nacional do Seguro Social",
      beneficiaryDocument: "29.979.036/0001-40",
      effectiveFrom: new Date("2026-01-01T00:00:00.000Z"),
      isActive: true,
    },
    update: {},
  });

  await prisma.retentionRule.upsert({
    where: { code: "IRRF_15" },
    create: {
      code: "IRRF_15",
      type: "IRRF",
      description: "Retenção de Imposto de Renda na Fonte 1,5%",
      calculationBasePercentage: new Prisma.Decimal("100.00"),
      ratePercentage: new Prisma.Decimal("1.50"),
      dueDays: 20,
      beneficiaryName: "Receita Federal do Brasil",
      beneficiaryDocument: "00.394.460/0001-41",
      effectiveFrom: new Date("2026-01-01T00:00:00.000Z"),
      isActive: true,
    },
    update: {},
  });

  // 11. Plano de Contas PCASP com separação de Ativo (1), Passivo (2.1/2.2) e Patrimônio Líquido (2.3)
  await prisma.accountingPlan.upsert({
    where: { code: "1.1.1.1.1.00.00" },
    create: { code: "1.1.1.1.1.00.00", name: "Caixa e Equivalentes de Caixa em Moeda Nacional", type: "Analítica" },
    update: {},
  });

  await prisma.accountingPlan.upsert({
    where: { code: "2.1.1.1.1.00.00" },
    create: { code: "2.1.1.1.1.00.00", name: "Fornecedores e Credores Nacionais a Pagar", type: "Analítica" },
    update: {},
  });

  await prisma.accountingPlan.upsert({
    where: { code: "2.3.7.1.1.00.00" },
    create: { code: "2.3.7.1.1.00.00", name: "Patrimônio Social e Capital Social", type: "Analítica" },
    update: {},
  });

  // 12. Dotações Orçamentárias Segregadas por UG
  const dotacaoPrefeitura = await prisma.budgetAppropriation.upsert({
    where: { code: "0101.04.122.0001.2002.3.3.90.30.00" },
    create: {
      id: "dotacao-lagoaseca-pref-01",
      code: "0101.04.122.0001.2002.3.3.90.30.00",
      financialYearId: year2026.id,
      budgetUnitId: ugPrefeitura.id,
      expenseNatureId: ndMaterial.id,
      resourceSourceId: fonteOrdinaria.id,
      initialValueDecimal: new Prisma.Decimal("500000.00"),
      updatedValueDecimal: new Prisma.Decimal("500000.00"),
      committedValueDecimal: new Prisma.Decimal("0.00"),
      initialValue: 500000,
      updatedValue: 500000,
      committedValue: 0,
    },
    update: {},
  });

  await prisma.budgetAppropriation.upsert({
    where: { code: "0201.01.031.0001.2001.3.1.90.11.00" },
    create: {
      id: "dotacao-lagoaseca-cam-01",
      code: "0201.01.031.0001.2001.3.1.90.11.00",
      financialYearId: year2026.id,
      budgetUnitId: ugCamara.id,
      expenseNatureId: ndPessoal.id,
      resourceSourceId: fonteOrdinaria.id,
      initialValueDecimal: new Prisma.Decimal("300000.00"),
      updatedValueDecimal: new Prisma.Decimal("300000.00"),
      committedValueDecimal: new Prisma.Decimal("0.00"),
      initialValue: 300000,
      updatedValue: 300000,
      committedValue: 0,
    },
    update: {},
  });

  // 13. Fornecedor e Credor
  const empresaTeste = await prisma.company.upsert({
    where: { cnpj: "12.345.678/0001-90" },
    create: { cnpj: "12.345.678/0001-90", corporateName: "Comércio e Distribuidora Paraibana Ltda", tradeName: "Distribuidora PB" },
    update: {},
  });

  const fornecedorTeste = await prisma.supplier.upsert({
    where: { id: "supp-lagoaseca-01" },
    create: {
      id: "supp-lagoaseca-01",
      companyId: empresaTeste.id,
      status: "Ativo",
    },
    update: {},
  });

  await prisma.creditor.upsert({
    where: { supplierId: fornecedorTeste.id },
    create: {
      supplierId: fornecedorTeste.id,
      name: "Comércio e Distribuidora Paraibana Ltda",
      document: "12.345.678/0001-90",
      companyId: empresaTeste.id,
    },
    update: {},
  });

  // 14. Documento GED
  await prisma.document.upsert({
    where: { id: "doc-nf-lagoaseca-01" },
    create: {
      id: "doc-nf-lagoaseca-01",
      title: "Nota Fiscal Eletrônica nº 001.452",
      documentType: "Nota Fiscal",
      status: "Válido",
      fileUrl: "/docs/nf-001452.pdf",
    },
    update: {},
  });

  // 15. Receita Arrecadada de Exemplo
  await prisma.revenue.upsert({
    where: { idempotencyKey: "SEED:LAGOA_SECA:REV:IPTU:01" },
    create: {
      date: new Date("2026-01-15T10:00:00.000Z"),
      valueDecimal: new Prisma.Decimal("150000.00"),
      value: 150000,
      financialYearId: year2026.id,
      revenueNatureId: nrIPTU.id,
      resourceSourceId: fonteOrdinaria.id,
      bankAccountId: contaBBPrefeitura.id,
      history: "Arrecadação de IPTU Exercício 2026 - Lagoa Seca",
      sourceModule: "TRIBUTACAO",
      sourceType: "IPTU",
      eventType: "REVENUE_REALIZED",
      idempotencyKey: "SEED:LAGOA_SECA:REV:IPTU:01",
      status: "Arrecadada",
    },
    update: {},
  });

  console.log("✅ Seed do modelo financeiro de Lagoa Seca/PB concluído com sucesso!");
  console.log("   - Exercício 2026 configurado.");
  console.log("   - UGs '0101' (Prefeitura) e '0201' (Câmara) com usuários segregados.");
  console.log("   - PPA 2026-2029, LDO e LOA com previsão de receita e fixação de despesa.");
  console.log("   - Saldo inicial de R$ 800.000 (Prefeitura) e R$ 200.000 (Câmara).");
  console.log("   - Regras de retenção, PCASP e receitas arrecadadas prontas.");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
