import "dotenv/config";
import { Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("🌱 Iniciando o seed completo de homologação e POC para Lagoa Seca/PB...");

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

  // 3. Fontes de Recurso
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

  // 4. Naturezas de Despesa
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

  // 5. Naturezas de Receita
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

  // 6. Conta Bancária de Teste com Saldo de Abertura
  const contaBB = await prisma.bankAccount.upsert({
    where: { id: "cl-lagoaseca-bb-1000" },
    create: {
      id: "cl-lagoaseca-bb-1000",
      bankName: "Banco do Brasil S.A.",
      agency: "1234-5",
      accountNumber: "10000-1",
      accountType: "Movimento",
      currentBalanceDecimal: new Prisma.Decimal("500000.00"),
      currentBalance: 500000,
      resourceSourceId: fonteOrdinaria.id,
      isActive: true,
    },
    update: { currentBalanceDecimal: new Prisma.Decimal("500000.00"), isActive: true },
  });

  // Movimento de saldo inicial na tesouraria
  await prisma.treasuryMovement.upsert({
    where: { idempotencyKey: "SEED:LAGOA_SECA:OPENING_BALANCE" },
    create: {
      date: new Date("2026-01-01T08:00:00.000Z"),
      type: "OpeningBalance",
      direction: "Entrada",
      valueDecimal: new Prisma.Decimal("500000.00"),
      history: "Saldo Inicial de Tesouraria - Lagoa Seca/PB",
      bankAccountId: contaBB.id,
      financialYearId: year2026.id,
      sourceModule: "FINANCEIRO",
      sourceType: "SEED",
      eventType: "OPENING_BALANCE",
      status: "Confirmado",
      idempotencyKey: "SEED:LAGOA_SECA:OPENING_BALANCE",
    },
    update: {},
  });

  // 7. Regras de Retenção Tributária
  const regraINSS = await prisma.retentionRule.upsert({
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

  const regraIRRF = await prisma.retentionRule.upsert({
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

  // 8. Plano de Contas PCASP Simplificado
  const c1111 = await prisma.accountingPlan.upsert({
    where: { code: "1.1.1.1.1.00.00" },
    create: { code: "1.1.1.1.1.00.00", name: "Caixa e Equivalentes de Caixa em Moeda Nacional", type: "Analítica" },
    update: {},
  });

  const c2111 = await prisma.accountingPlan.upsert({
    where: { code: "2.1.1.1.1.00.00" },
    create: { code: "2.1.1.1.1.00.00", name: "Fornecedores e Credores Nacionais a Pagar", type: "Analítica" },
    update: {},
  });

  const c5221 = await prisma.accountingPlan.upsert({
    where: { code: "5.2.2.1.1.00.00" },
    create: { code: "5.2.2.1.1.00.00", name: "Empenhos a Liquidar", type: "Analítica" },
    update: {},
  });

  const c6221 = await prisma.accountingPlan.upsert({
    where: { code: "6.2.2.1.1.00.00" },
    create: { code: "6.2.2.1.1.00.00", name: "Empenhos Liquidados a Pagar", type: "Analítica" },
    update: {},
  });

  // 9. Dotação Orçamentária
  const dotacaoMaterial = await prisma.budgetAppropriation.upsert({
    where: { id: "dotacao-lagoaseca-01" },
    create: {
      id: "dotacao-lagoaseca-01",
      code: "0101.04.122.0001.2002.3.3.90.30.00",
      financialYearId: year2026.id,
      budgetUnitId: ugPrefeitura.id,
      expenseNatureId: ndMaterial.id,
      resourceSourceId: fonteOrdinaria.id,
      initialValueDecimal: new Prisma.Decimal("200000.00"),
      updatedValueDecimal: new Prisma.Decimal("200000.00"),
      committedValueDecimal: new Prisma.Decimal("0.00"),
      initialValue: 200000,
      updatedValue: 200000,
      committedValue: 0,
    },
    update: {},
  });

  // 10. Fornecedor e Credor
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

  const credorTeste = await prisma.creditor.upsert({
    where: { supplierId: fornecedorTeste.id },
    create: {
      supplierId: fornecedorTeste.id,
      name: "Comércio e Distribuidora Paraibana Ltda",
      document: "12.345.678/0001-90",
      companyId: empresaTeste.id,
    },
    update: {},
  });

  // 11. Documento Fiscal no GED para Liquidação
  const docFiscal = await prisma.document.upsert({
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

  console.log("✅ Seed do modelo financeiro de Lagoa Seca/PB concluído com sucesso!");
  console.log("   - Exercício 2026 configurado.");
  console.log("   - Unidades Gestoras '0101' (Prefeitura) e '0201' (Câmara) criadas.");
  console.log("   - Dotação Orçamentária de R$ 200.000,00 pronta.");
  console.log("   - Conta bancária do BB com saldo inicial de R$ 500.000,00.");
  console.log("   - Regras de retenção INSS e IRRF ativas.");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
