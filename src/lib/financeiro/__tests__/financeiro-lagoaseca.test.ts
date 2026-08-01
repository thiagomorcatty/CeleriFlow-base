import "dotenv/config";
import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { prisma } from "../../prisma";
import {
  createExpenseRequest,
  createBudgetReservation,
  createCommitment,
  createSettlement,
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

describe("Lagoa Seca/PB - Validação Integrada e Regras Fiscais/Financeiras Estritas", () => {
  async function getActor(): Promise<FinanceActor> {
    const user = await prisma.usuario.findFirst();
    const emp = await prisma.employee.findFirst();
    return {
      usuarioId: user?.id ?? "usr-admin-lagoaseca",
      employeeId: emp?.id ?? "emp-servidor-lagoaseca",
      allowedBudgetUnitIds: [],
    };
  }

  test("1. Deve rejeitar pagamento sem liquidação (fluxo estrito obrigatório)", async () => {
    const actor = await getActor();
    await assert.rejects(
      async () => {
        await createPayment(prisma, actor, {
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

  test("2. Ciclo de Vida Real: Bloqueio de retenção em 'Emitida', Efetivação, Recolhimento e Trava de Estorno", async () => {
    const actor = await getActor();
    const timestamp = Date.now().toString().slice(-6);

    const dotacaoPref = await prisma.budgetAppropriation.findFirst({
      where: { code: "0101.04.122.0001.2002.3.3.90.30.00" },
    });
    assert.ok(dotacaoPref, "Dotação da Prefeitura deve existir");

    // a) Solicitação de despesa
    const expense = await createExpenseRequest(prisma, actor, {
      date: new Date(),
      description: `Teste Integrado Lagoa Seca - ${timestamp}`,
      value: "1000.00",
      appropriationId: dotacaoPref.id,
      secretariatId: "sec-fin-01",
      sourceModule: "TEST",
      sourceType: "EXPENSE_REQUEST",
      eventType: "TEST",
    });
    assert.ok(expense.id);

    // b) Reserva de dotação
    const reservation = await createBudgetReservation(prisma, actor, {
      number: `RES-${timestamp}`,
      date: new Date(),
      value: "1000.00",
      appropriationId: dotacaoPref.id,
      expenseId: expense.id,
    });
    assert.ok(reservation.id);

    // c) Empenho
    const commitment = await createCommitment(prisma, actor, {
      number: `EMP-${timestamp}`,
      date: new Date(),
      value: "1000.00",
      type: "Ordinário",
      history: "Empenho de teste integrado",
      appropriationId: dotacaoPref.id,
      supplierId: "supp-lagoaseca-01",
      reservationId: reservation.id,
    });
    assert.ok(commitment.id);

    // d) Liquidação com documento GED
    const settlement = await createSettlement(prisma, actor, {
      date: new Date(),
      value: "1000.00",
      commitmentId: commitment.id,
      documentId: "doc-nf-lagoaseca-01",
      authorId: actor.employeeId,
    });
    assert.ok(settlement.id);

    // e) Emissão de pagamento com retenção INSS (11% = R$ 110,00)
    const inssRule = await prisma.retentionRule.findUnique({ where: { code: "INSS_11" } });
    assert.ok(inssRule);

    const payment = await createPayment(prisma, actor, {
      orderNumber: `OP-${timestamp}`,
      date: new Date(),
      value: "1000.00",
      commitmentId: commitment.id,
      settlementId: settlement.id,
      bankAccountId: "cl-lagoaseca-bb-pref-1000",
      supplierId: "supp-lagoaseca-01",
      paymentMethod: "Transferência",
      retentionRuleIds: [inssRule.id],
    });
    assert.equal(payment.status, "Emitida");

    // f) Busca retenção criada
    const payable = await prisma.withholdingPayable.findFirst({
      where: { retention: { paymentId: payment.id } },
    });
    assert.ok(payable, "Devia ter criado a retenção");

    // g) Tenta recolher retenção de pagamento ainda 'Emitida' -> DEVE FALHAR
    await assert.rejects(
      async () => {
        await settleWithholdingPayable(prisma, actor, {
          withholdingPayableId: payable.id,
          bankAccountId: "cl-lagoaseca-bb-pref-1000",
          paymentDate: new Date(),
        });
      },
      (err: Error) => {
        assert.match(err.message, /só pode ser recolhida após a efetivação \(status Paga\)/i);
        return true;
      },
    );

    // h) Efetiva o pagamento -> Status vira 'Paga'
    const initialBankBalance = await getBankAccountBalance(prisma, "cl-lagoaseca-bb-pref-1000");
    await updatePaymentStatus(prisma, actor, payment.id, "Paga");

    const bankBalanceAfterPayment = await getBankAccountBalance(prisma, "cl-lagoaseca-bb-pref-1000");
    // Saída deve ser apenas o valor LÍQUIDO R$ 890,00 (1000 - 110)
    assert.equal(Number(initialBankBalance.minus(bankBalanceAfterPayment).toFixed(2)), 890.00);

    // i) Recolhe a retenção INSS -> Status vira 'Recolhida'
    await settleWithholdingPayable(prisma, actor, {
      withholdingPayableId: payable.id,
      bankAccountId: "cl-lagoaseca-bb-pref-1000",
      paymentDate: new Date(),
    });

    const bankBalanceAfterRetention = await getBankAccountBalance(prisma, "cl-lagoaseca-bb-pref-1000");
    // Saída adicional da retenção de R$ 110,00 -> Total acumulado = 890 + 110 = 1000,00!
    assert.equal(Number(bankBalanceAfterPayment.minus(bankBalanceAfterRetention).toFixed(2)), 110.00);

    // j) Tenta estornar pagamento com retenção recolhida -> DEVE FALHAR (Trava ativada)
    await assert.rejects(
      async () => {
        await reversePayment(prisma, actor, payment.id, "Estorno indevido");
      },
      (err: Error) => {
        assert.match(err.message, /retenções tributárias já recolhidas/i);
        return true;
      },
    );
  });

  test("3. Deve validar integridade e alinhamento dos dados da seed de Lagoa Seca", async () => {
    const year = await prisma.financialYear.findUnique({ where: { year: 2026 } });
    assert.ok(year, "Exercício 2026 deve existir");

    const bankAccPref = await prisma.bankAccount.findUnique({ where: { id: "cl-lagoaseca-bb-pref-1000" } });
    assert.ok(bankAccPref, "Conta da Prefeitura deve existir");
    assert.ok(bankAccPref.resourceSourceId, "Conta bancária deve ter fonte vinculada");

    const balance = await getBankAccountBalance(prisma, bankAccPref.id);
    assert.ok(balance.greaterThanOrEqualTo(800000), "Saldo inicial da Prefeitura deve ser R$ 800.000,00 ou maior");
  });

  test("4. Deve gerar RREO, RGF, Balanço Orçamentário e Balanço Patrimonial sem inconsistências", async () => {
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
    assert.equal(balancoOrc.totais.totalReceitaPrevista, 15000000, "Receita prevista deve ser R$ 15 milhões conforme LOA");

    const balancoPat = await generateBalancoPatrimonial(prisma, filter);
    assert.ok(balancoPat.totais);
    assert.ok(balancoPat.patrimonioLiquido, "Patrimônio Líquido deve estar separado do Passivo");
  });
});
