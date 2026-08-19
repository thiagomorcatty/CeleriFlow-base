import crypto from "crypto";
import dotenv from "dotenv";
import { Prisma } from "@prisma/client";
import { pocBancoBrasilExample } from "../src/lib/poc/poc-config";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

const bank = pocBancoBrasilExample;
const bankDate = (value: string) => new Date(`${value}T12:00:00.000Z`);
const hash = (value: string) => crypto.createHash("sha256").update(value).digest("hex");

type MockItem = {
  date: string;
  description: string;
  reference: string;
  signal: "CREDITO" | "DEBITO";
  value: string;
  balance: string;
  code: string;
};

const currentAccountItems: MockItem[] = [
  { date: "2026-07-31", description: "Saldo anterior", reference: "000", signal: "CREDITO", value: "0.00", balance: "0.00", code: "BB-POC-20260731-SALDO" },
  { date: "2026-08-10", description: "FPE/FPM", reference: "350", signal: "CREDITO", value: "137685.82", balance: "137685.82", code: "BB-POC-20260810-FPM-01" },
  { date: "2026-08-10", description: "FPE/FPM", reference: "350", signal: "CREDITO", value: "1173566.79", balance: "1311252.61", code: "BB-POC-20260810-FPM-02" },
  { date: "2026-08-10", description: "Cota Lei Complementar 198/23", reference: "350", signal: "CREDITO", value: "7115.32", balance: "1318367.93", code: "BB-POC-20260810-LC198" },
  { date: "2026-08-10", description: "Dedução PASEP", reference: "850", signal: "DEBITO", value: "13112.51", balance: "1305255.42", code: "BB-POC-20260810-PASEP-01" },
  { date: "2026-08-10", description: "Dedução PASEP", reference: "850", signal: "DEBITO", value: "71.15", balance: "1305184.27", code: "BB-POC-20260810-PASEP-02" },
  { date: "2026-08-10", description: "Retenção RFB - Receita Federal", reference: "850", signal: "DEBITO", value: "12597.81", balance: "1292586.46", code: "BB-POC-20260810-RFB-01" },
  { date: "2026-08-10", description: "Dedução FUNDEB", reference: "850", signal: "DEBITO", value: "262250.51", balance: "1030335.95", code: "BB-POC-20260810-FUNDEB-01" },
  { date: "2026-08-10", description: "Dedução FUNDEB", reference: "850", signal: "DEBITO", value: "1423.06", balance: "1028912.89", code: "BB-POC-20260810-FUNDEB-02" },
  { date: "2026-08-10", description: "Retenção RFB - Receita Federal", reference: "850", signal: "DEBITO", value: "9481.20", balance: "1019431.69", code: "BB-POC-20260810-RFB-02" },
  { date: "2026-08-10", description: "Contribuição entidade de classe - CNM", reference: "48955", signal: "DEBITO", value: "1050.00", balance: "1018381.69", code: "BB-POC-20260810-CNM" },
  { date: "2026-08-10", description: "Contribuição entidade de classe - AMUVI", reference: "2517", signal: "DEBITO", value: "1800.00", balance: "1016581.69", code: "BB-POC-20260810-AMUVI" },
  { date: "2026-08-10", description: "Aplicação automática BB RF Curto Prazo", reference: "1972", signal: "DEBITO", value: "1016581.69", balance: "0.00", code: "BB-POC-20260810-APLICACAO" },
  { date: "2026-08-12", description: "Transferência enviada - PMSJI 10 por cento", reference: "552631000011928", signal: "DEBITO", value: "4000.00", balance: "-4000.00", code: "BB-POC-20260812-TRANSFERENCIA" },
  { date: "2026-08-12", description: "Resgate automático BB RF Curto Prazo", reference: "1972", signal: "CREDITO", value: "4000.00", balance: "0.00", code: "BB-POC-20260812-RESGATE" },
  { date: "2026-08-13", description: "Transferência enviada - PMS do Ivai", reference: "552631000013087", signal: "DEBITO", value: "60000.00", balance: "-60000.00", code: "BB-POC-20260813-TRANSFERENCIA" },
];

const investmentItems: MockItem[] = [
  { date: "2026-07-31", description: "Saldo anterior da aplicação", reference: "SALDO", signal: "CREDITO", value: "1508975.60", balance: "1508975.60", code: "BB-POC-20260731-APLIC-SALDO" },
  { date: "2026-08-10", description: "Aplicação BB RF Curto Prazo Automático", reference: "1972", signal: "DEBITO", value: "1016581.69", balance: "2525557.29", code: "BB-POC-20260810-APLIC-INV" },
  { date: "2026-08-12", description: "Resgate BB RF Curto Prazo Automático", reference: "1972", signal: "CREDITO", value: "4000.00", balance: "2521557.29", code: "BB-POC-20260812-RESG-INV" },
  { date: "2026-08-13", description: "Rendimento de aplicação financeira", reference: "344", signal: "CREDITO", value: "6654.00", balance: "2528211.29", code: "BB-POC-20260813-RENDIMENTO" },
];

async function main() {
  const { prisma } = await import("../src/lib/prisma");
  const [budgetUnit, resourceSource] = await Promise.all([
    prisma.budgetUnit.findFirst({ where: { code: "0101" }, select: { id: true } }),
    prisma.resourceSource.findFirst({ where: { code: "15000000" }, select: { id: true } }),
  ]);
  if (!budgetUnit || !resourceSource) throw new Error("A POC base deve conter a UG 0101 e a fonte 15000000 antes do mock Banco do Brasil.");

  const [currentPlan, investmentPlan] = await Promise.all([
    prisma.accountingPlan.upsert({ where: { code: "1.1.1.1.1.70.03" }, create: { code: "1.1.1.1.1.70.03", name: "Banco do Brasil POC - Conta FPM 7003-3", type: "Analítica" }, update: {} }),
    prisma.accountingPlan.upsert({ where: { code: "1.1.1.2.1.70.03" }, create: { code: "1.1.1.2.1.70.03", name: "Banco do Brasil POC - Aplicação FPM", type: "Analítica" }, update: {} }),
  ]);
  const saveBankAccount = async (externalId: string, accountNumber: string, data: Omit<Prisma.BankAccountUncheckedCreateInput, "id" | "externalId" | "accountNumber">) => {
    const existing = await prisma.bankAccount.findFirst({
      where: { OR: [{ externalId }, { bankName: bank.name, agency: bank.agency, accountNumber }] },
      select: { id: true },
    });
    const values = { ...data, externalId, accountNumber };
    return existing
      ? prisma.bankAccount.update({ where: { id: existing.id }, data: values })
      : prisma.bankAccount.create({ data: values });
  };
  const investmentAccount = await saveBankAccount(bank.investmentExternalId, bank.investmentAccountNumber, {
    bankName: bank.name, agency: bank.agency, accountType: "Aplicação", currentBalance: 2528211.29,
    currentBalanceDecimal: new Prisma.Decimal("2528211.29"), resourceSourceId: resourceSource.id, budgetUnitId: budgetUnit.id,
    accountingPlanId: investmentPlan.id, purpose: "Aplicação FPM - extrato Banco do Brasil POC", isActive: true,
  });
  const currentAccount = await saveBankAccount(bank.externalId, bank.accountNumber, {
    bankName: bank.name, agency: bank.agency, accountType: "Movimento", currentBalance: -60000,
    currentBalanceDecimal: new Prisma.Decimal("-60000.00"), resourceSourceId: resourceSource.id, budgetUnitId: budgetUnit.id,
    accountingPlanId: currentPlan.id, linkedInvestmentAccountId: investmentAccount.id,
    purpose: "Tesouraria FPM - extrato Banco do Brasil POC", isActive: true,
  });

  const technicalUser = await prisma.usuario.findFirst({ where: { ativo: true }, orderBy: { createdAt: "asc" }, select: { id: true } });
  if (!technicalUser) throw new Error("A POC exige um usuário ativo para registrar a auditoria do mock Banco do Brasil.");

  const currentHash = hash("BB-POC-EXTRATO-7003-3-2026-08-CORRENTE");
  const investmentHash = hash("BB-POC-EXTRATO-7003-3-2026-08-APLICACAO");
  const [currentDownload, investmentDownload] = await prisma.$transaction(async (tx) => {
    await tx.bankStatementItem.deleteMany({ where: { banco: bank.name, agencia: bank.agency, contaNumero: { in: [bank.accountNumber, bank.investmentAccountNumber] } } });
    await tx.automatedBankDownload.deleteMany({ where: { banco: bank.name, agencia: bank.agency, contaNumero: bank.accountNumber } });
    const current = await tx.automatedBankDownload.create({
      data: {
        banco: bank.name, agencia: bank.agency, contaNumero: bank.accountNumber, tipoConta: "CORRENTE",
        periodoInicio: bankDate("2026-07-31"), periodoFim: bankDate("2026-08-13"), nomeArquivo: "EXTRATO_BB_POC_7003-3_AGOSTO_2026.pdf",
        caminhoDestino: "poc://banco-brasil/extrato-corrente-7003-3", formato: "PDF", hashSHA256: currentHash, tamanhoBytes: 0,
        status: "CONCLUIDO", logsExecucao: "Mock POC criado a partir de extrato Banco do Brasil fornecido pela Prefeitura. Dados exclusivamente demonstrativos.",
      },
    });
    const investment = await tx.automatedBankDownload.create({
      data: {
        banco: bank.name, agencia: bank.agency, contaNumero: bank.accountNumber, tipoConta: "APLICACAO",
        periodoInicio: bankDate("2026-07-31"), periodoFim: bankDate("2026-08-13"), nomeArquivo: "INVESTIMENTOS_BB_POC_7003-3_AGOSTO_2026.pdf",
        caminhoDestino: "poc://banco-brasil/investimentos-7003-3", formato: "PDF", hashSHA256: investmentHash, tamanhoBytes: 0,
        status: "CONCLUIDO", logsExecucao: "Mock POC criado a partir do demonstrativo de investimentos Banco do Brasil fornecido pela Prefeitura. Dados exclusivamente demonstrativos.",
      },
    });
    const toData = (items: MockItem[], downloadId: string, accountId: string, accountNumber: string) => items.map((item) => ({
      downloadId, bankAccountId: accountId, banco: bank.name, agencia: bank.agency, contaNumero: accountNumber, tipoConta: accountNumber === bank.accountNumber ? "CORRENTE" : "APLICACAO",
      date: bankDate(item.date), description: item.description, reference: item.reference, codigoTransacao: item.code, sinal: item.signal,
      direction: item.signal === "CREDITO" ? "CREDIT" : "DEBIT", valueDecimal: new Prisma.Decimal(item.value), saldoResultanteDecimal: new Prisma.Decimal(item.balance),
      status: "Pendente", bankTransactionId: item.code,
    }));
    await tx.bankStatementItem.createMany({ data: toData(currentAccountItems, current.id, currentAccount.id, bank.accountNumber) });
    await tx.bankStatementItem.createMany({ data: toData(investmentItems, investment.id, investmentAccount.id, bank.investmentAccountNumber) });
    await tx.investmentAllocation.deleteMany({ where: { investmentBankAccountId: investmentAccount.id } });
    await tx.investmentAllocation.createMany({
      data: [
        ["2026-07-10", "909.263.110", "1596687.04"], ["2026-07-20", "909.263.120", "282372.05"], ["2026-07-30", "909.263.130", "599494.61"], ["2026-08-10", "909.263.1972", "1016581.69"],
      ].map(([createdAt, reference, value]) => ({ originBankAccountId: currentAccount.id, investmentBankAccountId: investmentAccount.id, valueDecimal: new Prisma.Decimal(value), status: "ATIVA", createdAt: bankDate(createdAt), updatedAt: bankDate(createdAt) })),
    });
    await tx.financialAuditLog.create({
      data: { action: "MOCK_EXTRATO_BANCO_BRASIL_POC", entityType: "AutomatedBankDownload", entityId: current.id, authorUsuarioId: technicalUser.id, payload: { currentDownloadId: current.id, investmentDownloadId: investment.id, source: "EXTRATOS_BB_FORNECIDOS_PREFEITURA", synthetic: true } },
    });
    return [current, investment];
  });
  console.log(JSON.stringify({ currentDownloadId: currentDownload.id, investmentDownloadId: investmentDownload.id, account: `${bank.agency}/${bank.accountNumber}` }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
