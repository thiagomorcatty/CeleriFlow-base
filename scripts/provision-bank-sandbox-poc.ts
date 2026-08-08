import dotenv from "dotenv";
import { Prisma } from "@prisma/client";

dotenv.config();
const localBankEnvironment = dotenv.config({ path: ".env.local", processEnv: {} }).parsed ?? {};
for (const [key, value] of Object.entries(localBankEnvironment)) {
  if (key.startsWith("BANK_SANDBOX_") || key === "SIMULADOR_WEBHOOK_SECRET") {
    process.env[key] = value;
  }
}
import { pocVirtualBank } from "../src/lib/poc/poc-config";

const bankName = pocVirtualBank.name;
const agency = pocVirtualBank.agency;

type SandboxAccount = {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: string;
};

const sandboxAccounts: SandboxAccount[] = [
  { id: "poc-robonuvem-checking-10001", accountNumber: "10001-0", accountType: "Movimento", balance: "-877510.00" },
  { id: "poc-robonuvem-revenue-20001", accountNumber: "20001-1", accountType: "Transferências", balance: "2021791.00" },
  { id: "poc-robonuvem-investment-90001", accountNumber: "90001-4", accountType: "Aplicação", balance: "557800.00" },
];

async function main() {
  const [{ prisma }, { bankIntegrationClient }] = await Promise.all([
    import("../src/lib/prisma"),
    import("../src/lib/financeiro/bank-integration-client"),
  ]);
  const ensureFinancialYear = async (year: number) => prisma.financialYear.upsert({
    where: { year },
    create: {
      year,
      status: "Aberto",
      startDate: new Date(`${year}-01-01T00:00:00.000Z`),
      endDate: new Date(`${year}-12-31T23:59:59.999Z`),
    },
    update: { status: "Aberto" },
  });
  await bankIntegrationClient.checkSandboxHealth();
  const integrationCheck = await bankIntegrationClient.fetchBankStatement(
    { banco: bankName, agencia: agency, contaNumero: "20001-1" },
    { periodoInicio: "2025-08-01", periodoFim: "2025-08-31" },
  );
  if (integrationCheck.items.length === 0) {
    throw new Error("O Banco Virtual Robonuvem não retornou movimentações para a validação da POC.");
  }

  const [budgetUnit, resourceSource, year2025, year2026] = await Promise.all([
    prisma.budgetUnit.findFirst({ orderBy: { code: "asc" }, select: { id: true } }),
    prisma.resourceSource.findFirst({ orderBy: { code: "asc" }, select: { id: true } }),
    ensureFinancialYear(2025),
    ensureFinancialYear(2026),
  ]);

  const [checkingAccountingPlan, revenueAccountingPlan, investmentAccountingPlan, openingEquityPlan] = await Promise.all([
    prisma.accountingPlan.upsert({ where: { code: "1.1.1.1.1.00.01" }, create: { code: "1.1.1.1.1.00.01", name: "Banco Virtual Robonuvem - Conta Movimento 10001-0", type: "Analítica" }, update: {} }),
    prisma.accountingPlan.upsert({ where: { code: "1.1.1.1.1.00.02" }, create: { code: "1.1.1.1.1.00.02", name: "Banco Virtual Robonuvem - Conta Receitas 20001-1", type: "Analítica" }, update: {} }),
    prisma.accountingPlan.upsert({ where: { code: "1.1.1.2.1.00.01" }, create: { code: "1.1.1.2.1.00.01", name: "Banco Virtual Robonuvem - Aplicações 90001-4", type: "Analítica" }, update: {} }),
    prisma.accountingPlan.upsert({ where: { code: "2.3.7.1.1.00.00" }, create: { code: "2.3.7.1.1.00.00", name: "Patrimônio Social e Capital Social", type: "Analítica" }, update: {} }),
  ]);
  const accountingPlanByAccount = new Map([
    ["10001-0", checkingAccountingPlan.id],
    ["20001-1", revenueAccountingPlan.id],
    ["90001-4", investmentAccountingPlan.id],
  ]);
  const accounts = new Map<string, { id: string }>();
  // Historical sandbox accounts remain preserved for referential integrity, but are not usable or displayed in this POC.
  await prisma.bankAccount.updateMany({
    where: { bankName: { not: bankName } },
    data: { isActive: false },
  });
  for (const definition of sandboxAccounts) {
    const data = {
      bankName,
      agency,
      accountNumber: definition.accountNumber,
      accountType: definition.accountType,
      currentBalance: Number(definition.balance),
      currentBalanceDecimal: new Prisma.Decimal(definition.balance),
      budgetUnitId: budgetUnit?.id,
      resourceSourceId: resourceSource?.id,
      accountingPlanId: accountingPlanByAccount.get(definition.accountNumber),
      isActive: true,
    };
    const account = await prisma.bankAccount.upsert({
      where: { id: definition.id },
      create: { id: definition.id, ...data },
      update: data,
      select: { id: true },
    });
    accounts.set(definition.accountNumber, account);
  }

  const investmentEvents = [
    ["APLICACAO_FINANCEIRA", "Aplicação financeira", investmentAccountingPlan.id, checkingAccountingPlan.id],
    ["RESGATE_APLICACAO_FINANCEIRA", "Resgate de aplicação financeira", checkingAccountingPlan.id, investmentAccountingPlan.id],
    ["RECEITA_ARRECADADA", "Receita arrecadada", revenueAccountingPlan.id, openingEquityPlan.id],
  ] as const;
  for (const [code, name, debitAccountId, creditAccountId] of investmentEvents) {
    const event = await prisma.accountingEventCatalog.upsert({
      where: { code },
      create: { code, name, description: "REFERENCIA POC - substituir por matriz PCASP homologada" },
      update: { name, description: "REFERENCIA POC - substituir por matriz PCASP homologada", isActive: true },
    });
    await prisma.accountingPostingRule.updateMany({
      where: { eventId: event.id, isReference: true, NOT: { debitAccountId, creditAccountId } },
      data: { isActive: false },
    });
    await prisma.accountingPostingRule.upsert({
      where: { eventId_debitAccountId_creditAccountId: { eventId: event.id, debitAccountId, creditAccountId } },
      create: { eventId: event.id, debitAccountId, creditAccountId, description: "REFERENCIA POC - não utilizar em produção", isReference: true },
      update: { isActive: true, isReference: true, description: "REFERENCIA POC - não utilizar em produção" },
    });
  }

  await prisma.integrationConnection.upsert({
    where: { code: "BANCO_API" },
    create: {
      code: "BANCO_API",
      name: "Banco Virtual Robonuvem",
      category: "BANCARIA",
      provider: "Robonuvem - ambiente externo de testes",
      environment: "SANDBOX",
      status: "ATIVA",
      baseUrl: pocVirtualBank.baseUrl,
      credentialReference: "env:BANK_SANDBOX_CLIENT_SECRET",
      configuration: { clientIdEnvironment: "BANK_SANDBOX_CLIENT_ID", statementFormat: "ofx" },
    },
    update: {
      name: "Banco Virtual Robonuvem",
      category: "BANCARIA",
      provider: "Robonuvem - ambiente externo de testes",
      environment: "SANDBOX",
      status: "ATIVA",
      baseUrl: pocVirtualBank.baseUrl,
      credentialReference: "env:BANK_SANDBOX_CLIENT_SECRET",
      configuration: { clientIdEnvironment: "BANK_SANDBOX_CLIENT_ID", statementFormat: "ofx" },
    },
  });

  // Transactions from the virtual bank must be created by their own processing flows.
  // Only the opening balance is seeded so a processed August statement can reconcile from R$ 150,000.00.
  const movements = [
    { key: "poc-robonuvem-opening-20001-2025", account: "20001-1", year: year2025, date: "2025-07-31", type: "SaldoInicial", direction: "Entrada", value: "150000.00", history: "Saldo inicial da conciliação POC - agosto de 2025" },
  ];
  await prisma.treasuryMovement.deleteMany({
    where: {
      idempotencyKey: {
        in: [
          "poc-robonuvem-fpm-2025",
          "poc-robonuvem-fundeb-2025",
          "poc-robonuvem-ipva-2025",
          "poc-robonuvem-icms-2025",
          "poc-robonuvem-yield-2025",
          "poc-robonuvem-investment-2026",
          "poc-robonuvem-redemption-2026",
          "poc-robonuvem-fee-2026",
        ],
      },
      statementItems: { none: {} },
    },
  });

  for (const movement of movements) {
    const bankAccountId = accounts.get(movement.account)?.id;
    if (!bankAccountId) throw new Error(`Conta ${movement.account} não foi provisionada.`);
    await prisma.treasuryMovement.upsert({
      where: { idempotencyKey: movement.key },
      create: {
        date: new Date(`${movement.date}T12:00:00.000Z`),
        type: movement.type,
        direction: movement.direction,
        valueDecimal: new Prisma.Decimal(movement.value),
        history: movement.history,
        bankAccountId,
        financialYearId: movement.year.id,
        sourceModule: "POC_BANCO_VIRTUAL",
        sourceType: "SANDBOX_BANK",
        sourceId: movement.key,
        eventType: "BANK_SANDBOX_SEED",
        idempotencyKey: movement.key,
      },
      update: {
        date: new Date(`${movement.date}T12:00:00.000Z`),
        type: movement.type,
        direction: movement.direction,
        valueDecimal: new Prisma.Decimal(movement.value),
        history: movement.history,
        bankAccountId,
        financialYearId: movement.year.id,
      },
    });
  }

  const openingAuthor = await prisma.usuario.findFirst({ where: { ativo: true, employeeId: { not: null } }, select: { id: true, employeeId: true } });
  const revenueAccountId = accounts.get("20001-1")?.id;
  if (!openingAuthor?.employeeId || !revenueAccountId) throw new Error("A POC exige um usuário ativo vinculado a servidor e a conta de receitas para registrar o saldo inicial contábil.");
  await prisma.accountingTransaction.upsert({
    where: { idempotencyKey: "poc-robonuvem-opening-20001-2025:ACCOUNTING" },
    create: {
      financialYearId: year2025.id,
      date: new Date("2025-07-31T12:00:00.000Z"),
      history: "Saldo inicial do razão bancário POC - Conta 20001-1",
      status: "POSTADO",
      sourceModule: "POC_BANCO_VIRTUAL",
      sourceType: "OPENING_BALANCE",
      sourceId: revenueAccountId,
      eventType: "OPENING_BALANCE",
      idempotencyKey: "poc-robonuvem-opening-20001-2025:ACCOUNTING",
      authorUsuarioId: openingAuthor.id,
      authorEmployeeId: openingAuthor.employeeId,
      postedAt: new Date(),
      entries: {
        create: [
          { date: new Date("2025-07-31T12:00:00.000Z"), value: 150000, valueDecimal: new Prisma.Decimal("150000.00"), type: "Débito", history: "Saldo inicial do razão bancário POC", accountId: revenueAccountingPlan.id, authorId: openingAuthor.employeeId },
          { date: new Date("2025-07-31T12:00:00.000Z"), value: 150000, valueDecimal: new Prisma.Decimal("150000.00"), type: "Crédito", history: "Contrapartida do saldo inicial do razão bancário POC", accountId: openingEquityPlan.id, authorId: openingAuthor.employeeId },
        ],
      },
    },
    update: {},
  });

  const activeForeignAccounts = await prisma.bankAccount.count({
    where: { isActive: true, bankName: { not: bankName } },
  });
  if (activeForeignAccounts > 0) {
    throw new Error(`${activeForeignAccounts} conta(s) de outro banco ainda estão ativas na POC.`);
  }

  console.log("Banco Virtual Robonuvem provisionado: 3 contas, saldo inicial de conciliação e conexão BANCO_API em SANDBOX.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    const { prisma } = await import("../src/lib/prisma");
    await prisma.$disconnect();
  });
