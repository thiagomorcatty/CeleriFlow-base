import "dotenv/config";
import assert from "node:assert/strict";
import { test, describe, before } from "node:test";
import { prisma } from "../../prisma";
import {
  createExpenseRequest,
  createBudgetReservation,
  createCommitment,
  createSettlement,
  createPayment,
  reversePayment,
  settleWithholdingPayable,
  getBankAccountBalance,
  FinanceActor,
} from "../index";
import {
  generateRREO,
  generateRGF,
  generateBalancoOrcamentario,
  generateBalancoPatrimonial,
} from "../relatorios-legais";

describe("Lagoa Seca/PB - Validação Integrada do Fluxo Financeiro e Relatórios Legais", () => {
  const mockActor: FinanceActor = {
    usuarioId: "usr-admin-lagoaseca",
    employeeId: "emp-servidor-lagoaseca",
    allowedBudgetUnitIds: [],
  };

  test("1. Deve rejeitar pagamento sem liquidação (fluxo estrito obrigatório)", async () => {
    await assert.rejects(
      async () => {
        await createPayment(prisma, mockActor, {
          orderNumber: "OP-FAIL-01",
          date: new Date(),
          value: "1000.00",
          commitmentId: "invalid-id",
          settlementId: "", // Liquidação ausente!
          bankAccountId: "cl-lagoaseca-bb-1000",
          supplierId: "supp-lagoaseca-01",
          paymentMethod: "Transferência",
        });
      },
      (err: Error) => {
        assert.match(err.message, /fluxo obrigatório exige liquidação prévia/i);
        return true;
      },
    );
  });

  test("2. Deve validar presença e compatibilidade de dados na base seed de Lagoa Seca", async () => {
    const year = await prisma.financialYear.findUnique({ where: { year: 2026 } });
    assert.ok(year, "Exercício 2026 deve existir");

    const bankAcc = await prisma.bankAccount.findUnique({ where: { id: "cl-lagoaseca-bb-1000" } });
    assert.ok(bankAcc, "Conta do Banco do Brasil deve existir");

    const balance = await getBankAccountBalance(prisma, bankAcc.id);
    assert.ok(balance.greaterThanOrEqualTo(500000), "Saldo inicial deve ser R$ 500.000,00 ou maior");
  });

  test("3. Deve gerar RREO, RGF, Balanço Orçamentário e Balanço Patrimonial sem erros", async () => {
    const year = await prisma.financialYear.findUnique({ where: { year: 2026 } });
    assert.ok(year);

    const filter = { financialYearId: year.id };

    const rreo = await generateRREO(prisma, filter);
    assert.ok(rreo.expenseSummary);
    assert.ok(rreo.revenueSummary);

    const rgf = await generateRGF(prisma, filter);
    assert.ok(rgf.receitaCorrenteLiquida >= 0);
    assert.ok(["REGULAR", "ALERTA", "EXCEDIDO"].includes(rgf.situacao));

    const balancoOrc = await generateBalancoOrcamentario(prisma, filter);
    assert.ok(balancoOrc.totais);

    const balancoPat = await generateBalancoPatrimonial(prisma, filter);
    assert.ok(balancoPat.totais);
  });
});
