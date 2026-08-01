import "dotenv/config";
import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { prisma } from "../../prisma";
import {
  createExpenseRequest,
  approveExpenseRequest,
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
import { createAnnualBudgetLaw, createBudgetAppropriationFromFixation, createBudgetGuideline, createMultiYearPlan, saveBimonthlyRevenueTarget, saveMonthlyDisbursementSchedule } from "../planejamento";

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
          date: new Date("2026-04-01T00:00:00.000Z"),
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

  test("2. Ciclo de Vida Real: Bloqueio de retenção em 'Emitida', Efetivação, Recolhimento e Trava de Estorno (com Limpeza)", async () => {
    const actor = await getActor();
    const timestamp = Date.now().toString().slice(-6);
    const testDate = new Date("2026-04-15T10:00:00.000Z");

    const dotacaoPref = await prisma.budgetAppropriation.findFirst({
      where: { code: "0101.04.122.0001.2002.3.3.90.30.00" },
    });
    assert.ok(dotacaoPref, "Dotação da Prefeitura deve existir");

    let expenseId = "";
    let reservationId = "";
    let commitmentId = "";
    let settlementId = "";
    let paymentId = "";

    try {
      // a) Solicitação de despesa
      const expense = await createExpenseRequest(prisma, actor, {
        date: testDate,
        description: `Teste Integrado Lagoa Seca - ${timestamp}`,
        value: "1000.00",
        appropriationId: dotacaoPref.id,
        supplierId: "supp-lagoaseca-01",
        secretariatId: "sec-fin-01",
        sourceModule: "TEST",
        sourceType: "EXPENSE_REQUEST",
        eventType: "TEST",
      });
      expenseId = expense.id;
      assert.ok(expenseId);

      const approver = await prisma.usuario.findFirst({
        where: { id: { not: actor.usuarioId }, ativo: true },
        select: { id: true, employeeId: true },
      });
      assert.ok(approver, "A base de teste deve possuir um aprovador diferente do solicitante");
      await assert.rejects(
        () => approveExpenseRequest(prisma, actor, expense.id),
        /solicitante não pode aprovar a própria solicitação/i,
      );
      await approveExpenseRequest(prisma, { ...actor, usuarioId: approver.id, employeeId: approver.employeeId }, expense.id);

      // b) Reserva de dotação
      const reservation = await createBudgetReservation(prisma, actor, {
        number: `RES-${timestamp}`,
        date: testDate,
        value: "1000.00",
        appropriationId: dotacaoPref.id,
        expenseId: expense.id,
      });
      reservationId = reservation.id;
      assert.ok(reservationId);

      // c) Empenho
      const commitment = await createCommitment(prisma, actor, {
        number: `EMP-${timestamp}`,
        date: testDate,
        value: "1000.00",
        type: "Ordinário",
        history: "Empenho de teste integrado",
        appropriationId: dotacaoPref.id,
        supplierId: "supp-lagoaseca-01",
        reservationId: reservation.id,
      });
      commitmentId = commitment.id;
      assert.ok(commitmentId);

      // d) Liquidação com documento GED
      const settlement = await createSettlement(prisma, actor, {
        date: testDate,
        value: "1000.00",
        commitmentId: commitment.id,
        documentId: "doc-nf-lagoaseca-01",
        authorId: actor.employeeId ?? "emp-servidor-lagoaseca",
      });
      settlementId = settlement.id;
      assert.ok(settlementId);

      // e) Emissão de pagamento com retenção INSS (11% = R$ 110,00)
      const inssRule = await prisma.retentionRule.findUnique({ where: { code: "INSS_11" } });
      assert.ok(inssRule);

      const payment = await createPayment(prisma, actor, {
        orderNumber: `OP-${timestamp}`,
        date: testDate,
        value: "1000.00",
        commitmentId: commitment.id,
        settlementId: settlement.id,
        bankAccountId: "cl-lagoaseca-bb-pref-1000",
        supplierId: "supp-lagoaseca-01",
        paymentMethod: "Transferência",
        retentionRuleIds: [inssRule.id],
      });
      paymentId = payment.id;
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
            paymentDate: testDate,
          });
        },
        (err: Error) => {
          assert.match(err.message, /só pode ser recolhida após a efetivação \(status Paga\)/i);
          return true;
        },
      );

      // h) Efetiva o pagamento -> Status vira 'Paga'
      const initialBankBalance = await getBankAccountBalance(prisma, "cl-lagoaseca-bb-pref-1000", testDate);
      await updatePaymentStatus(prisma, actor, payment.id, "Paga");

      const bankBalanceAfterPayment = await getBankAccountBalance(prisma, "cl-lagoaseca-bb-pref-1000", testDate);
      // Saída deve ser apenas o valor LÍQUIDO R$ 890,00 (1000 - 110)
      assert.equal(Number(initialBankBalance.minus(bankBalanceAfterPayment).toFixed(2)), 890.00);

      // i) Recolhe a retenção INSS -> Status vira 'Recolhida'
      await settleWithholdingPayable(prisma, actor, {
        withholdingPayableId: payable.id,
        bankAccountId: "cl-lagoaseca-bb-pref-1000",
        paymentDate: testDate,
      });

      const bankBalanceAfterRetention = await getBankAccountBalance(prisma, "cl-lagoaseca-bb-pref-1000", testDate);
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
    } finally {
      // A auditoria financeira e append-only; os fatos temporarios sao limpos, mas seus logs permanecem como evidencia.
      if (paymentId) {
        await prisma.treasuryMovement.deleteMany({ where: { sourceId: paymentId } });
        const retentions = await prisma.paymentRetention.findMany({ where: { paymentId }, select: { id: true } });
        const retIds = retentions.map((r) => r.id);
        const payables = await prisma.withholdingPayable.findMany({ where: { retentionId: { in: retIds } }, select: { id: true } });
        const payIds = payables.map((p) => p.id);
        await prisma.treasuryMovement.deleteMany({ where: { sourceId: { in: payIds } } });
        await prisma.withholdingPayable.deleteMany({ where: { retentionId: { in: retIds } } });
        await prisma.paymentRetention.deleteMany({ where: { paymentId } });
        await prisma.payment.deleteMany({ where: { id: paymentId } });
      }
      if (settlementId) await prisma.settlement.deleteMany({ where: { id: settlementId } });
      if (commitmentId) await prisma.commitment.deleteMany({ where: { id: commitmentId } });
      if (reservationId) await prisma.budgetReservation.deleteMany({ where: { id: reservationId } });
      if (expenseId) await prisma.expense.deleteMany({ where: { id: expenseId } });
    }
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

  test("5. Deve rastrear PPA, LDO e LOA e aceitar publicação no exercício anterior", async () => {
    const actor = await getActor();
    const planningActor = { ...actor, allowedBudgetUnitIds: undefined };
    const suffix = Date.now().toString();
    let financialYearId = "";
    let planId = "";
    let guidelineId = "";
    let loaId = "";
    let appropriationId = "";

    try {
      const financialYear = await prisma.financialYear.create({
        data: {
          year: 2031,
          status: "Preparação",
          startDate: new Date("2031-01-01T00:00:00.000Z"),
          endDate: new Date("2031-12-31T23:59:59.999Z"),
        },
      });
      financialYearId = financialYear.id;
      const plan = await createMultiYearPlan(prisma, actor, {
        code: `PPA-${suffix}`,
        name: "PPA de rastreabilidade",
        startYear: 2030,
        endYear: 2034,
      });
      planId = plan.id;
      const guideline = await createBudgetGuideline(prisma, actor, {
        financialYearId,
        multiYearPlanId: plan.id,
      });
      guidelineId = guideline.id;
      const loa = await createAnnualBudgetLaw(prisma, actor, {
        lawNumber: `LOA-${suffix}`,
        publicationDate: new Date("2030-12-20T00:00:00.000Z"),
        financialYearId,
        budgetGuidelineId: guideline.id,
        totalRevenue: 100,
        totalExpense: 100,
        revenueForecasts: [{ code: "1.0.0", name: "Receita de teste", estimatedValue: 100 }],
        expenseFixations: [{ code: "3.3.9", name: "Despesa de teste", fixedValue: 100 }],
      });
      loaId = loa.id;
      const [budgetUnit, expenseNature, resourceSource] = await Promise.all([
        prisma.budgetUnit.findFirst({ select: { id: true } }),
        prisma.expenseNature.findFirst({ select: { id: true } }),
        prisma.resourceSource.findFirst({ select: { id: true } }),
      ]);
      assert.ok(budgetUnit && expenseNature && resourceSource, "Cadastros orcamentarios de apoio devem existir");
      const appropriation = await createBudgetAppropriationFromFixation(prisma, planningActor, {
        annualBudgetExpenseFixationId: loa.expenseFixations[0].id,
        code: `DOT-${suffix}`,
        budgetUnitId: budgetUnit.id,
        expenseNatureId: expenseNature.id,
        resourceSourceId: resourceSource.id,
        initialValue: 100,
      });
      appropriationId = appropriation.id;
      await saveMonthlyDisbursementSchedule(prisma, planningActor, {
        annualBudgetLawId: loa.id,
        month: 1,
        budgetUnitId: budgetUnit.id,
        limitValue: 40,
      });
      await saveMonthlyDisbursementSchedule(prisma, planningActor, {
        annualBudgetLawId: loa.id,
        month: 1,
        budgetUnitId: budgetUnit.id,
        limitValue: 60,
      });
      await saveBimonthlyRevenueTarget(prisma, planningActor, {
        annualBudgetLawId: loa.id,
        bimonth: 1,
        targetValue: 100,
      });
      await assert.rejects(
        () => createBudgetAppropriationFromFixation(prisma, planningActor, {
          annualBudgetExpenseFixationId: loa.expenseFixations[0].id,
          code: `DOT-EXCESSO-${suffix}`,
          budgetUnitId: budgetUnit.id,
          expenseNatureId: expenseNature.id,
          resourceSourceId: resourceSource.id,
          initialValue: 1,
        }),
        /excede o saldo disponivel da fixacao/i,
      );

      const trace = await prisma.annualBudgetLaw.findUniqueOrThrow({
        where: { id: loa.id },
        include: { budgetGuideline: { include: { multiYearPlan: true } }, expenseFixations: { include: { appropriations: true } }, cmdSchedules: true, mbaTargets: true },
      });
      assert.equal(trace.budgetGuideline?.multiYearPlan?.id, plan.id);
      assert.equal(trace.financialYearId, financialYear.id);
      assert.equal(trace.expenseFixations[0].appropriations[0]?.id, appropriation.id);
      assert.equal(Number(trace.cmdSchedules[0]?.limitValue), 60);
      assert.equal(Number(trace.mbaTargets[0]?.targetValue), 100);
    } finally {
      if (appropriationId) await prisma.budgetAppropriation.delete({ where: { id: appropriationId } });
      if (loaId) await prisma.annualBudgetLaw.delete({ where: { id: loaId } });
      if (guidelineId) await prisma.budgetGuideline.delete({ where: { id: guidelineId } });
      if (planId) await prisma.multiYearPlan.delete({ where: { id: planId } });
      if (financialYearId) await prisma.financialYear.delete({ where: { id: financialYearId } });
    }
  });
});
