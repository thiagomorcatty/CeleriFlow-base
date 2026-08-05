import "dotenv/config";

import { Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";

const bankName = "001 - Banco Virtual Robonuvem";
const agency = "0001";

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

async function ensureFinancialYear(year: number) {
  return prisma.financialYear.upsert({
    where: { year },
    create: {
      year,
      status: "Aberto",
      startDate: new Date(`${year}-01-01T00:00:00.000Z`),
      endDate: new Date(`${year}-12-31T23:59:59.999Z`),
    },
    update: { status: "Aberto" },
  });
}

async function main() {
  const [budgetUnit, resourceSource, year2025, year2026] = await Promise.all([
    prisma.budgetUnit.findFirst({ orderBy: { code: "asc" }, select: { id: true } }),
    prisma.resourceSource.findFirst({ orderBy: { code: "asc" }, select: { id: true } }),
    ensureFinancialYear(2025),
    ensureFinancialYear(2026),
  ]);

  const accounts = new Map<string, { id: string }>();
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

  await prisma.integrationConnection.upsert({
    where: { code: "BANCO_API" },
    create: {
      code: "BANCO_API",
      name: "Banco Virtual Robonuvem",
      category: "BANCARIA",
      provider: "Robonuvem - ambiente externo de testes",
      environment: "SANDBOX",
      status: "CONFIGURANDO",
      baseUrl: "https://banco-virtual-robonuvem.vercel.app/api/bank",
      credentialReference: "env:BANK_SANDBOX_CLIENT_SECRET",
      configuration: { clientIdEnvironment: "BANK_SANDBOX_CLIENT_ID", statementFormat: "ofx" },
    },
    update: {
      name: "Banco Virtual Robonuvem",
      category: "BANCARIA",
      provider: "Robonuvem - ambiente externo de testes",
      environment: "SANDBOX",
      status: "CONFIGURANDO",
      baseUrl: "https://banco-virtual-robonuvem.vercel.app/api/bank",
      credentialReference: "env:BANK_SANDBOX_CLIENT_SECRET",
      configuration: { clientIdEnvironment: "BANK_SANDBOX_CLIENT_ID", statementFormat: "ofx" },
    },
  });

  const movements = [
    { key: "poc-robonuvem-fpm-2025", account: "20001-1", year: year2025, date: "2025-08-10", type: "RECEITA", direction: "CREDIT", value: "145000.00", history: "FPM - Fundo de Participação dos Municípios" },
    { key: "poc-robonuvem-fundeb-2025", account: "20001-1", year: year2025, date: "2025-08-15", type: "RECEITA", direction: "CREDIT", value: "98400.00", history: "FUNDEB - Transferência constitucional" },
    { key: "poc-robonuvem-ipva-2025", account: "20001-1", year: year2025, date: "2025-08-20", type: "RECEITA", direction: "CREDIT", value: "15500.00", history: "IPVA - Cota-parte municipal" },
    { key: "poc-robonuvem-icms-2025", account: "20001-1", year: year2025, date: "2025-08-20", type: "RECEITA", direction: "CREDIT", value: "53800.00", history: "ICMS - Cota-parte municipal" },
    { key: "poc-robonuvem-yield-2025", account: "90001-4", year: year2025, date: "2025-08-28", type: "RENDIMENTO", direction: "CREDIT", value: "4400.00", history: "Rendimento de aplicação financeira" },
    { key: "poc-robonuvem-investment-2026", account: "10001-0", year: year2026, date: "2026-05-11", type: "APLICACAO", direction: "DEBIT", value: "80000.00", history: "Aplicação financeira" },
    { key: "poc-robonuvem-redemption-2026", account: "90001-4", year: year2026, date: "2026-05-27", type: "RESGATE", direction: "CREDIT", value: "150000.00", history: "Resgate de aplicação financeira" },
    { key: "poc-robonuvem-fee-2026", account: "10001-0", year: year2026, date: "2026-06-30", type: "TARIFA", direction: "DEBIT", value: "450.00", history: "Tarifa bancária" },
  ];

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

  console.log("Banco Virtual Robonuvem provisionado: 3 contas, 8 lançamentos e conexão BANCO_API em SANDBOX.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
