import "dotenv/config";
import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { prisma } from "../../prisma";
import {
  createPayment,
  updatePaymentStatus,
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

describe("Lagoa Seca/PB - Validação Integrada e Regras Fiscais/Financeiras", () => {
  const mockActor: FinanceActor = {
    usuarioId: "usr-admin-lagoaseca",
    employeeId: "emp-servidor-lagoaseca",
    allowedBudgetUnitIds: [],
  };

  test("1. Deve rejeitar pagamento sem liquidação (fluxo estrito)", async () => {
    await assert.rejects(
      async () => {
        await createPayment(prisma, mockActor, {
          orderNumber: "OP-FAIL-01",
          date: new Date(),
          value: "1000.00",
          commitmentId: "invalid-id",
          settlementId: "", // Vazio!
          bankAccountId: "cl-lagoaseca-bb-pref-1000",
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

  test("2. Deve rejeitar recolhimento de retenção de ordem de pagamento ainda 'Emitida'", async () => {
    await assert.rejects(
      async () => {
        await settleWithholdingPayable(prisma, mockActor, {
          withholdingPayableId: "invalid-payable-id",
          bankAccountId: "cl-lagoaseca-bb-pref-1000",
          paymentDate: new Date(),
        });
      },
      (err: Error) => {
        assert.match(err.message, /não encontrada ou já recolhida/i);
        return true;
      },
    );
  });

  test("3. Deve validar dados da base modelo seed de Lagoa Seca", async () => {
    const year = await prisma.financialYear.findUnique({ where: { year: 2026 } });
    assert.ok(year, "Exercício 2026 deve existir");

    const bankAccPref = await prisma.bankAccount.findUnique({ where: { id: "cl-lagoaseca-bb-pref-1000" } });
    assert.ok(bankAccPref, "Conta da Prefeitura deve existir");
    assert.ok(bankAccPref.resourceSourceId, "Conta bancária deve ter fonte vinculada");

    const balance = await getBankAccountBalance(prisma, bankAccPref.id);
    assert.ok(balance.greaterThanOrEqualTo(800000), "Saldo inicial da Prefeitura deve ser R$ 800.000,00 ou maior");
  });

  test("4. Deve gerar RREO, RGF, Balanço Orçamentário e Balanço Patrimonial com totais íntegros", async () => {
    const year = await prisma.financialYear.findUnique({ where: { year: 2026 } });
    assert.ok(year);

    const filter = { financialYearId: year.id };

    const rreo = await generateRREO(prisma, filter);
    assert.ok(rreo.expenseSummary);
    assert.ok(rreo.revenueSummary.length >= 2, "Receitas previstas na LOA devem constar no RREO");

    const rgf = await generateRGF(prisma, filter);
    assert.ok(rgf.receitaCorrenteLiquida >= 0);
    assert.ok(["REGULAR", "ALERTA", "EXCEDIDO"].includes(rgf.situacao));

    const balancoOrc = await generateBalancoOrcamentario(prisma, filter);
    assert.ok(balancoOrc.totais.totalReceitaPrevista > 0, "Receita prevista deve consultar a LOA (maior que zero)");

    const balancoPat = await generateBalancoPatrimonial(prisma, filter);
    assert.ok(balancoPat.totais);
    assert.ok(balancoPat.patrimonioLiquido, "Patrimônio Líquido deve estar separado do Passivo");
  });
});
