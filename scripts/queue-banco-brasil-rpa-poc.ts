import dotenv from "dotenv";
import { pocBancoBrasilExample } from "../src/lib/poc/poc-config";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

async function main() {
  if (process.env.RPA_DISPATCH_ENABLED !== "true") {
    throw new Error("Defina RPA_DISPATCH_ENABLED=true para enfileirar o cenário Banco do Brasil no RPA.");
  }

  const [{ prisma }, { queueRpaOperation, dispatchPendingRpaOperations }] = await Promise.all([
    import("../src/lib/prisma"),
    import("../src/lib/financeiro/rpa-integration"),
  ]);
  const account = await prisma.bankAccount.findFirst({
    where: { externalId: pocBancoBrasilExample.externalId },
    select: { externalId: true, agency: true, accountNumber: true },
  });
  if (!account?.externalId) throw new Error("Execute primeiro npm run seed:poc-banco-brasil-exemplo.");

  const items = await prisma.bankStatementItem.findMany({
    where: {
      banco: pocBancoBrasilExample.name,
      codigoTransacao: { in: ["BB-POC-20260810-APLICACAO", "BB-POC-20260812-RESG-INV", "BB-POC-20260813-RENDIMENTO"] },
    },
    select: { id: true, date: true, description: true, reference: true, codigoTransacao: true, valueDecimal: true },
  });
  const itemByCode = new Map(items.map((item) => [item.codigoTransacao, item]));
  const operations = [
    { code: "BB-POC-20260810-APLICACAO", type: "APLICACAO" as const, event: "APLICACAO_EXECUTADA" as const },
    { code: "BB-POC-20260812-RESG-INV", type: "RESGATE" as const, event: "RESGATE_EXECUTADO" as const },
    { code: "BB-POC-20260813-RENDIMENTO", type: "RENDIMENTO" as const, event: "RENDIMENTO_IDENTIFICADO" as const },
  ];

  await prisma.$transaction(async (tx) => {
    for (const operation of operations) {
      const item = itemByCode.get(operation.code);
      if (!item || !item.codigoTransacao) throw new Error(`Movimento ${operation.code} não encontrado no mock Banco do Brasil.`);
      await queueRpaOperation(tx, {
        sourceType: "BANCO_BRASIL_POC_MOCK",
        sourceId: item.id,
        sourceEventType: operation.event,
        type: operation.type,
        transactionDate: item.date,
        amount: item.valueDecimal,
        bank: { externalId: account.externalId, agency: account.agency, account: account.accountNumber },
        bankTransactionId: item.codigoTransacao,
        documentNumber: item.reference,
        history: item.description,
        sourceReference: `Mock POC Banco do Brasil, conta ${account.agency}/${account.accountNumber}, transação ${item.codigoTransacao}.`,
      });
    }
  });

  const result = await dispatchPendingRpaOperations(prisma);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
