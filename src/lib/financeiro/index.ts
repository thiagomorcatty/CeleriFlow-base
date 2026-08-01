import { Prisma, type PrismaClient } from "@prisma/client";
import { createHash } from "node:crypto";
import { calculateRetentionDueDate, calculateRetentions, getActiveRetentionRules } from "./retencoes";

type Db = PrismaClient | Prisma.TransactionClient;

export type FinanceActor = {
  usuarioId: string;
  employeeId: string | null;
  budgetUnitId?: string | null;
  allowedBudgetUnitIds?: string[];
};

export class FinanceError extends Error {}

const OPEN_STATUS = "Aberto";
const ACTIVE_RESERVATION_STATUS = "Ativa";
const ACTIVE_COMMITMENT_STATUSES = ["Emitido", "Liquidado", "Pago"];
const ACTIVE_SETTLEMENT_STATUS = "Liquidado";
const ACTIVE_PAYMENT_STATUSES = ["Emitida", "Paga"];

function money(value: Prisma.Decimal | string | number) {
  const decimal = new Prisma.Decimal(String(value)).toDecimalPlaces(2);
  if (!decimal.isFinite() || decimal.lessThanOrEqualTo(0)) {
    throw new FinanceError("Informe um valor monetário maior que zero.");
  }
  return decimal;
}

function legacyMoney(value: Prisma.Decimal) {
  // Float columns remain only as compatibility mirrors during the Decimal migration.
  return Number(value.toString());
}

function requiredDecimal(value: Prisma.Decimal | null, field: string) {
  if (!value) {
    throw new FinanceError(`O campo Decimal ${field} ainda não foi conciliado. Execute o backfill financeiro antes de movimentar a dotação.`);
  }
  return value;
}

function jsonMoney(value: Prisma.Decimal) {
  return value.toFixed(2);
}

async function audit(
  tx: Db,
  actor: FinanceActor,
  action: string,
  entityType: string,
  entityId: string,
  payload: Prisma.InputJsonValue,
  financialYearId?: string,
  budgetUnitId?: string,
) {
  await tx.financialAuditLog.create({
    data: {
      action,
      entityType,
      entityId,
      financialYearId,
      budgetUnitId: budgetUnitId || actor.budgetUnitId || undefined,
      payload,
      authorUsuarioId: actor.usuarioId,
      authorEmployeeId: actor.employeeId,
    },
  });
}

export async function assertFinancialYearOpen(tx: Db, financialYearId: string, date: Date) {
  const year = await tx.financialYear.findUnique({ where: { id: financialYearId } });
  if (!year) throw new FinanceError("Exercício financeiro não encontrado.");
  if (year.status !== OPEN_STATUS) throw new FinanceError(`O exercício ${year.year} não está aberto para lançamentos.`);
  if (date < year.startDate || date > year.endDate) {
    throw new FinanceError("A data do lançamento está fora do exercício financeiro da dotação.");
  }
  return year;
}

async function lockAppropriation(tx: Prisma.TransactionClient, appropriationId: string) {
  await tx.$queryRaw`SELECT id FROM "BudgetAppropriation" WHERE id = ${appropriationId} FOR UPDATE`;
}

async function lockCommitment(tx: Prisma.TransactionClient, commitmentId: string) {
  await tx.$queryRaw`SELECT id FROM "Commitment" WHERE id = ${commitmentId} FOR UPDATE`;
}

async function lockBankAccount(tx: Prisma.TransactionClient, bankAccountId: string) {
  await tx.$queryRaw`SELECT id FROM "BankAccount" WHERE id = ${bankAccountId} FOR UPDATE`;
}

async function lockWithholdingPayable(tx: Prisma.TransactionClient, payableId: string) {
  await tx.$queryRaw`SELECT id FROM "WithholdingPayable" WHERE id = ${payableId} FOR UPDATE`;
}

async function lockPayment(tx: Prisma.TransactionClient, paymentId: string) {
  await tx.$queryRaw`SELECT id FROM "Payment" WHERE id = ${paymentId} FOR UPDATE`;
}

async function lockPaymentWithholdings(tx: Prisma.TransactionClient, paymentId: string) {
  await tx.$queryRaw`
    SELECT wp.id
    FROM "WithholdingPayable" wp
    JOIN "PaymentRetention" r ON wp."retentionId" = r.id
    WHERE r."paymentId" = ${paymentId}
    FOR UPDATE
  `;
}

function commitmentValue(value: Prisma.Decimal | null, movements: { type: string; valueDecimal: Prisma.Decimal }[]) {
  return movements.reduce((total, movement) => {
    if (movement.type === "Reforço") return total.plus(movement.valueDecimal);
    if (movement.type === "Anulação") return total.minus(movement.valueDecimal);
    throw new FinanceError("Movimento de empenho inválido.");
  }, requiredDecimal(value, "Commitment.valueDecimal"));
}

export async function getBudgetAvailability(tx: Db, appropriationId: string) {
  const appropriation = await tx.budgetAppropriation.findUnique({
    where: { id: appropriationId },
    select: { id: true, updatedValueDecimal: true },
  });
  if (!appropriation) throw new FinanceError("Dotação orçamentária não encontrada.");

  const [reservations, commitments] = await Promise.all([
    tx.budgetReservation.findMany({
      where: { appropriationId, status: ACTIVE_RESERVATION_STATUS },
      select: { valueDecimal: true },
    }),
    tx.commitment.findMany({
      where: { appropriationId, status: { in: ACTIVE_COMMITMENT_STATUSES } },
      select: { valueDecimal: true, movements: { select: { type: true, valueDecimal: true } } },
    }),
  ]);

  const updated = requiredDecimal(appropriation.updatedValueDecimal, "BudgetAppropriation.updatedValueDecimal");
  const reserved = reservations.reduce(
    (total, reservation) => total.plus(requiredDecimal(reservation.valueDecimal, "BudgetReservation.valueDecimal")),
    new Prisma.Decimal(0),
  );
  const committed = commitments.reduce(
    (total, commitment) => total.plus(commitmentValue(commitment.valueDecimal, commitment.movements)),
    new Prisma.Decimal(0),
  );

  return { updated, reserved, committed, available: updated.minus(reserved).minus(committed) };
}

async function refreshCommittedMirror(tx: Prisma.TransactionClient, appropriationId: string) {
  const commitments = await tx.commitment.findMany({
    where: { appropriationId, status: { in: ACTIVE_COMMITMENT_STATUSES } },
    select: { valueDecimal: true, movements: { select: { type: true, valueDecimal: true } } },
  });
  const total = commitments.reduce(
    (sum, commitment) => sum.plus(commitmentValue(commitment.valueDecimal, commitment.movements)),
    new Prisma.Decimal(0),
  );
  await tx.budgetAppropriation.update({
    where: { id: appropriationId },
    data: { committedValueDecimal: total, committedValue: legacyMoney(total) },
  });
}

async function creditorForSupplier(tx: Prisma.TransactionClient, supplierId: string) {
  const supplier = await tx.supplier.findUnique({
    where: { id: supplierId },
    include: { person: true, company: true },
  });
  if (!supplier || supplier.status !== "Ativo") throw new FinanceError("Fornecedor não está ativo.");

  const name = supplier.company?.corporateName ?? supplier.person?.fullName;
  const document = supplier.company?.cnpj ?? supplier.person?.cpf;
  if (!name) throw new FinanceError("Fornecedor sem pessoa ou empresa vinculada.");

  return tx.creditor.upsert({
    where: { supplierId },
    create: {
      supplierId,
      name,
      document,
      personId: supplier.personId ?? undefined,
      companyId: supplier.companyId ?? undefined,
    },
    update: { name, document, status: supplier.status },
  });
}

export async function createExpenseRequest(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    date: Date;
    description: string;
    value: Prisma.Decimal | string | number;
    appropriationId: string;
    secretariatId: string;
    sourceModule: string;
    sourceType: string;
    sourceId?: string;
    eventType: string;
    idempotencyKey?: string;
  },
) {
  const value = money(input.value);
  return db.$transaction(async (tx) => {
    if (input.idempotencyKey) {
      const existing = await tx.expense.findUnique({ where: { idempotencyKey: input.idempotencyKey } });
      if (existing) return existing;
    }
    const appropriation = await tx.budgetAppropriation.findUnique({ where: { id: input.appropriationId } });
    if (!appropriation) throw new FinanceError("Dotação orçamentária não encontrada.");
    const year = await assertFinancialYearOpen(tx, appropriation.financialYearId, input.date);
    const expense = await tx.expense.create({
      data: {
        date: input.date,
        description: input.description.trim(),
        valueDecimal: value,
        value: legacyMoney(value),
        appropriationId: input.appropriationId,
        secretariatId: input.secretariatId,
        sourceModule: input.sourceModule.trim(),
        sourceType: input.sourceType.trim(),
        sourceId: input.sourceId?.trim() || undefined,
        eventType: input.eventType.trim(),
        idempotencyKey: input.idempotencyKey?.trim() || undefined,
      },
    });
    await audit(tx, actor, "CREATE", "Expense", expense.id, { value: jsonMoney(value), sourceModule: expense.sourceModule, sourceType: expense.sourceType, sourceId: expense.sourceId, eventType: expense.eventType }, year.id);
    return expense;
  });
}

const movementDirections: Record<string, 1 | -1> = {
  "Dotação Inicial": 1,
  "Crédito Adicional": 1,
  "Suplementação": 1,
  Especial: 1,
  Extraordinário: 1,
  Remanejamento: 1,
  Transposição: 1,
  Transferência: 1,
  Anulação: -1,
};

type BudgetMovementInput = {
  date: Date;
  type: string;
  value: Prisma.Decimal | string | number;
  justification: string;
  appropriationId: string;
  sourceModule?: string;
  sourceType?: string;
  sourceId?: string;
  eventType?: string;
  idempotencyKey?: string;
};

export async function createBudgetMovementInTransaction(
  tx: Prisma.TransactionClient,
  actor: FinanceActor,
  input: BudgetMovementInput,
) {
  const value = money(input.value);
  const direction = movementDirections[input.type];
  if (!direction) throw new FinanceError("Tipo de movimento orçamentário inválido.");

  if (input.idempotencyKey) {
    const existing = await tx.budgetMovement.findUnique({ where: { idempotencyKey: input.idempotencyKey } });
    if (existing) return existing;
  }
  await lockAppropriation(tx, input.appropriationId);
  const appropriation = await tx.budgetAppropriation.findUnique({ where: { id: input.appropriationId } });
  if (!appropriation) throw new FinanceError("Dotação orçamentária não encontrada.");
  const year = await assertFinancialYearOpen(tx, appropriation.financialYearId, input.date);
  const current = requiredDecimal(appropriation.updatedValueDecimal, "BudgetAppropriation.updatedValueDecimal");
  if (direction < 0) {
    const availability = await getBudgetAvailability(tx, appropriation.id);
    if (availability.available.lessThan(value)) throw new FinanceError("A anulação excede a disponibilidade da dotação.");
  }
  const updated = direction > 0 ? current.plus(value) : current.minus(value);
  const movement = await tx.budgetMovement.create({
    data: {
      date: input.date,
      type: input.type,
      valueDecimal: value,
      justification: input.justification.trim(),
      appropriationId: input.appropriationId,
      sourceModule: input.sourceModule?.trim() || "MANUAL",
      sourceType: input.sourceType?.trim() || "BUDGET_MOVEMENT",
      sourceId: input.sourceId?.trim() || undefined,
      eventType: input.eventType?.trim() || "BUDGET_MOVEMENT",
      idempotencyKey: input.idempotencyKey?.trim() || undefined,
    },
  });
  await tx.budgetAppropriation.update({ where: { id: appropriation.id }, data: { updatedValueDecimal: updated, updatedValue: legacyMoney(updated) } });
  await audit(tx, actor, "CREATE", "BudgetMovement", movement.id, { type: movement.type, value: jsonMoney(value), resultingUpdatedValue: jsonMoney(updated) }, year.id);
  return movement;
}

export async function createBudgetMovement(
  db: PrismaClient,
  actor: FinanceActor,
  input: BudgetMovementInput,
) {
  return db.$transaction((tx) => createBudgetMovementInTransaction(tx, actor, input));
}

export async function createBudgetReservation(
  db: PrismaClient,
  actor: FinanceActor,
  input: { number: string; date: Date; value: Prisma.Decimal | string | number; appropriationId: string; expenseId?: string; justification?: string },
) {
  const value = money(input.value);
  return db.$transaction(async (tx) => {
    await lockAppropriation(tx, input.appropriationId);
    const appropriation = await tx.budgetAppropriation.findUnique({ where: { id: input.appropriationId } });
    if (!appropriation) throw new FinanceError("Dotação orçamentária não encontrada.");
    const year = await assertFinancialYearOpen(tx, appropriation.financialYearId, input.date);
    if (input.expenseId) {
      const expense = await tx.expense.findUnique({ where: { id: input.expenseId } });
      if (!expense || expense.appropriationId !== appropriation.id) throw new FinanceError("A solicitação de despesa não pertence à dotação informada.");
      if (expense.status !== "Solicitada") throw new FinanceError("A solicitação de despesa não está disponível para reserva.");
      const requested = requiredDecimal(expense.valueDecimal, "Expense.valueDecimal");
      if (!requested.equals(value)) throw new FinanceError("A reserva deve corresponder ao valor da solicitação de despesa.");
    }
    const availability = await getBudgetAvailability(tx, appropriation.id);
    if (availability.available.lessThan(value)) throw new FinanceError("A reserva excede a disponibilidade da dotação.");
    const reservation = await tx.budgetReservation.create({
      data: { number: input.number.trim(), date: input.date, valueDecimal: value, value: legacyMoney(value), appropriationId: appropriation.id, expenseId: input.expenseId, justification: input.justification?.trim() || undefined },
    });
    if (input.expenseId) await tx.expense.update({ where: { id: input.expenseId }, data: { status: "Reservada" } });
    await audit(tx, actor, "CREATE", "BudgetReservation", reservation.id, { value: jsonMoney(value), appropriationId: appropriation.id, expenseId: input.expenseId ?? null }, year.id);
    return reservation;
  });
}

export async function cancelBudgetReservation(db: PrismaClient, actor: FinanceActor, reservationId: string) {
  return db.$transaction(async (tx) => {
    const reservation = await tx.budgetReservation.findUnique({ include: { appropriation: true }, where: { id: reservationId } });
    if (!reservation) throw new FinanceError("Reserva orçamentária não encontrada.");
    await lockAppropriation(tx, reservation.appropriationId);
    const year = await assertFinancialYearOpen(tx, reservation.appropriation.financialYearId, reservation.date);
    if (reservation.status !== ACTIVE_RESERVATION_STATUS) throw new FinanceError("Somente reservas ativas podem ser canceladas.");
    const canceled = await tx.budgetReservation.update({ where: { id: reservationId }, data: { status: "Cancelada" } });
    if (reservation.expenseId) await tx.expense.update({ where: { id: reservation.expenseId }, data: { status: "Solicitada" } });
    await audit(tx, actor, "CANCEL", "BudgetReservation", reservationId, { previousStatus: reservation.status }, year.id);
    return canceled;
  });
}

export async function createCommitment(
  db: PrismaClient,
  actor: FinanceActor,
  input: { number: string; date: Date; value: Prisma.Decimal | string | number; type: string; history: string; appropriationId: string; supplierId: string; reservationId: string; processId?: string; contractId?: string },
) {
  const value = money(input.value);
  if (!["Ordinário", "Estimativo", "Global"].includes(input.type)) throw new FinanceError("Tipo de empenho inválido.");
  return db.$transaction(async (tx) => {
    await lockAppropriation(tx, input.appropriationId);
    const [appropriation, reservation] = await Promise.all([
      tx.budgetAppropriation.findUnique({ where: { id: input.appropriationId } }),
      tx.budgetReservation.findUnique({ where: { id: input.reservationId } }),
    ]);
    if (!appropriation) throw new FinanceError("Dotação orçamentária não encontrada.");
    const year = await assertFinancialYearOpen(tx, appropriation.financialYearId, input.date);
    if (!reservation || reservation.appropriationId !== appropriation.id || reservation.status !== ACTIVE_RESERVATION_STATUS) throw new FinanceError("Selecione uma reserva ativa da mesma dotação.");
    if (!requiredDecimal(reservation.valueDecimal, "BudgetReservation.valueDecimal").equals(value)) throw new FinanceError("O empenho deve corresponder integralmente à reserva selecionada.");
    const availability = await getBudgetAvailability(tx, appropriation.id);
    if (availability.available.lessThan(0)) throw new FinanceError("A dotação não possui disponibilidade válida para empenho.");
    if (input.processId && !await tx.process.findUnique({ where: { id: input.processId } })) throw new FinanceError("Processo informado não encontrado.");
    if (input.contractId) {
      const contract = await tx.contract.findUnique({ where: { id: input.contractId } });
      if (!contract || contract.supplierId !== input.supplierId) throw new FinanceError("O contrato informado não pertence ao fornecedor do empenho.");
    }
    const creditor = await creditorForSupplier(tx, input.supplierId);
    const commitment = await tx.commitment.create({
      data: { number: input.number.trim(), date: input.date, valueDecimal: value, value: legacyMoney(value), type: input.type, history: input.history.trim(), appropriationId: appropriation.id, supplierId: input.supplierId, creditorId: creditor.id, processId: input.processId || undefined, contractId: input.contractId || undefined, reservationId: reservation.id, status: "Emitido" },
    });
    await tx.budgetReservation.update({ where: { id: reservation.id }, data: { status: "Empenhada" } });
    if (reservation.expenseId) await tx.expense.update({ where: { id: reservation.expenseId }, data: { status: "Empenhada" } });
    await refreshCommittedMirror(tx, appropriation.id);
    await audit(tx, actor, "CREATE", "Commitment", commitment.id, { value: jsonMoney(value), reservationId: reservation.id, creditorId: creditor.id, processId: commitment.processId, contractId: commitment.contractId }, year.id);
    return commitment;
  });
}

export async function cancelCommitment(db: PrismaClient, actor: FinanceActor, commitmentId: string) {
  return db.$transaction(async (tx) => {
    await lockCommitment(tx, commitmentId);
    const commitment = await tx.commitment.findUnique({ include: { appropriation: true, movements: true, settlements: { where: { status: ACTIVE_SETTLEMENT_STATUS } }, payments: { where: { status: { in: ACTIVE_PAYMENT_STATUSES } } } }, where: { id: commitmentId } });
    if (!commitment) throw new FinanceError("Empenho não encontrado.");
    await lockAppropriation(tx, commitment.appropriationId);
    const year = await assertFinancialYearOpen(tx, commitment.appropriation.financialYearId, new Date());
    if (commitment.status === "Anulado") throw new FinanceError("O empenho já está anulado.");
    if (commitment.settlements.length || commitment.payments.length) throw new FinanceError("Empenhos com liquidações ou pagamentos ativos não podem ser anulados integralmente.");
    const effectiveValue = commitmentValue(commitment.valueDecimal, commitment.movements);
    await tx.commitmentMovement.create({ data: { date: new Date(), type: "Anulação", valueDecimal: effectiveValue, justification: "Anulação integral do empenho", commitmentId } });
    const canceled = await tx.commitment.update({ where: { id: commitmentId }, data: { status: "Anulado" } });
    await refreshCommittedMirror(tx, commitment.appropriationId);
    await audit(tx, actor, "CANCEL", "Commitment", commitmentId, { previousStatus: commitment.status, value: jsonMoney(effectiveValue) }, year.id);
    return canceled;
  });
}

export async function createCommitmentMovement(db: PrismaClient, actor: FinanceActor, input: { commitmentId: string; date: Date; type: "Reforço" | "Anulação"; value: Prisma.Decimal | string | number; justification: string }) {
  const value = money(input.value);
  if (!["Reforço", "Anulação"].includes(input.type)) throw new FinanceError("Tipo de movimento de empenho inválido.");
  if (!input.justification.trim()) throw new FinanceError("Informe a justificativa do movimento de empenho.");
  return db.$transaction(async (tx) => {
    await lockCommitment(tx, input.commitmentId);
    const commitment = await tx.commitment.findUnique({ include: { appropriation: true, movements: true, settlements: { where: { status: ACTIVE_SETTLEMENT_STATUS }, select: { valueDecimal: true } } }, where: { id: input.commitmentId } });
    if (!commitment) throw new FinanceError("Empenho não encontrado.");
    await lockAppropriation(tx, commitment.appropriationId);
    const year = await assertFinancialYearOpen(tx, commitment.appropriation.financialYearId, input.date);
    if (!ACTIVE_COMMITMENT_STATUSES.includes(commitment.status)) throw new FinanceError("Somente empenhos ativos podem receber movimentos.");
    const effectiveValue = commitmentValue(commitment.valueDecimal, commitment.movements);
    if (input.type === "Reforço") {
      const availability = await getBudgetAvailability(tx, commitment.appropriationId);
      if (availability.available.lessThan(value)) throw new FinanceError("O reforço excede a disponibilidade da dotação.");
    } else {
      const settled = commitment.settlements.reduce((total, settlement) => total.plus(requiredDecimal(settlement.valueDecimal, "Settlement.valueDecimal")), new Prisma.Decimal(0));
      if (effectiveValue.minus(value).lessThan(settled)) throw new FinanceError("A anulação não pode reduzir o empenho abaixo do valor liquidado.");
    }
    const movement = await tx.commitmentMovement.create({ data: { date: input.date, type: input.type, valueDecimal: value, justification: input.justification.trim(), commitmentId: commitment.id } });
    await refreshCommittedMirror(tx, commitment.appropriationId);
    await audit(tx, actor, "CREATE", "CommitmentMovement", movement.id, { type: movement.type, value: jsonMoney(value), commitmentId: commitment.id, resultingEffectiveValue: jsonMoney(input.type === "Reforço" ? effectiveValue.plus(value) : effectiveValue.minus(value)) }, year.id);
    return movement;
  });
}

async function commitmentForPosting(tx: Prisma.TransactionClient, commitmentId: string, date: Date) {
  await lockCommitment(tx, commitmentId);
  const commitment = await tx.commitment.findUnique({ include: { appropriation: true, movements: true }, where: { id: commitmentId } });
  if (!commitment) throw new FinanceError("Empenho não encontrado.");
  const year = await assertFinancialYearOpen(tx, commitment.appropriation.financialYearId, date);
  if (!ACTIVE_COMMITMENT_STATUSES.includes(commitment.status)) throw new FinanceError("Não é permitido lançar sobre empenho inativo ou anulado.");
  return { commitment, year };
}

async function activeSettlementTotal(tx: Prisma.TransactionClient, commitmentId: string) {
  const settlements = await tx.settlement.findMany({ where: { commitmentId, status: ACTIVE_SETTLEMENT_STATUS }, select: { valueDecimal: true } });
  return settlements.reduce((total, settlement) => total.plus(requiredDecimal(settlement.valueDecimal, "Settlement.valueDecimal")), new Prisma.Decimal(0));
}

async function activePaymentTotal(tx: Prisma.TransactionClient, where: Prisma.PaymentWhereInput) {
  const payments = await tx.payment.findMany({ where: { ...where, status: { in: ACTIVE_PAYMENT_STATUSES } }, select: { valueDecimal: true } });
  return payments.reduce((total, payment) => total.plus(requiredDecimal(payment.valueDecimal, "Payment.valueDecimal")), new Prisma.Decimal(0));
}

async function refreshCommitmentExecutionStatus(tx: Prisma.TransactionClient, commitmentId: string) {
  const commitment = await tx.commitment.findUnique({ include: { movements: true }, where: { id: commitmentId } });
  if (!commitment || commitment.status === "Anulado") return;
  const [settled, paid] = await Promise.all([activeSettlementTotal(tx, commitmentId), activePaymentTotal(tx, { commitmentId })]);
  const effectiveValue = commitmentValue(commitment.valueDecimal, commitment.movements);
  const status = paid.equals(effectiveValue) ? "Pago" : settled.greaterThan(0) ? "Liquidado" : "Emitido";
  if (commitment.status !== status) await tx.commitment.update({ where: { id: commitmentId }, data: { status } });
}

export async function createSettlement(db: PrismaClient, actor: FinanceActor, input: { date: Date; value: Prisma.Decimal | string | number; documentRef?: string; documentId?: string; commitmentId: string; authorId: string; notes?: string }) {
  const value = money(input.value);
  return db.$transaction(async (tx) => {
    const { commitment, year } = await commitmentForPosting(tx, input.commitmentId, input.date);
    if (!input.documentId) throw new FinanceError("Vincule o documento fiscal ou comprobatório já cadastrado no GED.");
    const [document, author, settled] = await Promise.all([
      tx.document.findUnique({ where: { id: input.documentId } }),
      tx.employee.findUnique({ where: { id: input.authorId }, select: { isActive: true } }),
      activeSettlementTotal(tx, commitment.id),
    ]);
    if (!document || document.status !== "Válido") throw new FinanceError("O documento GED informado não está válido.");
    if (!author?.isActive) throw new FinanceError("O responsável pelo ateste não está ativo.");
    const effectiveValue = commitmentValue(commitment.valueDecimal, commitment.movements);
    if (settled.plus(value).greaterThan(effectiveValue)) throw new FinanceError("A liquidação acumulada excede o valor vigente do empenho.");
    const settlement = await tx.settlement.create({ data: { date: input.date, valueDecimal: value, value: legacyMoney(value), documentRef: input.documentRef?.trim() || undefined, documentId: document.id, commitmentId: commitment.id, authorId: input.authorId, notes: input.notes?.trim() || undefined, status: ACTIVE_SETTLEMENT_STATUS } });
    await refreshCommitmentExecutionStatus(tx, commitment.id);
    await audit(tx, actor, "CREATE", "Settlement", settlement.id, { value: jsonMoney(value), commitmentId: commitment.id, documentId: document.id, authorId: input.authorId }, year.id);
    return settlement;
  });
}

export async function cancelSettlement(db: PrismaClient, actor: FinanceActor, settlementId: string) {
  return db.$transaction(async (tx) => {
    const settlement = await tx.settlement.findUnique({ include: { commitment: { include: { appropriation: true } } }, where: { id: settlementId } });
    if (!settlement) throw new FinanceError("Liquidação não encontrada.");
    await lockCommitment(tx, settlement.commitmentId);
    const year = await assertFinancialYearOpen(tx, settlement.commitment.appropriation.financialYearId, new Date());
    if (settlement.status !== ACTIVE_SETTLEMENT_STATUS) throw new FinanceError("Somente liquidações ativas podem ser canceladas.");
    if ((await activePaymentTotal(tx, { settlementId })).greaterThan(0)) throw new FinanceError("Não é possível cancelar uma liquidação com pagamentos ativos.");
    const canceled = await tx.settlement.update({ where: { id: settlementId }, data: { status: "Cancelado" } });
    await refreshCommitmentExecutionStatus(tx, settlement.commitmentId);
    await audit(tx, actor, "CANCEL", "Settlement", settlementId, { previousStatus: settlement.status }, year.id);
    return canceled;
  });
}

export async function createPayment(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    orderNumber: string;
    date: Date;
    value: Prisma.Decimal | string | number;
    commitmentId: string;
    settlementId: string;
    bankAccountId: string;
    supplierId: string;
    paymentMethod: string;
    serviceCode?: string;
    retentionRuleIds?: string[];
  },
) {
  const value = money(input.value);
  if (!input.settlementId) {
    throw new FinanceError("O fluxo obrigatório exige liquidação prévia regular antes de qualquer emissão de pagamento.");
  }

  return db.$transaction(async (tx) => {
    const { commitment, year } = await commitmentForPosting(tx, input.commitmentId, input.date);
    const bankAccount = await tx.bankAccount.findUnique({
      where: { id: input.bankAccountId },
      select: { id: true, isActive: true, resourceSourceId: true },
    });
    if (!bankAccount?.isActive) throw new FinanceError("Selecione uma conta bancária ativa.");

    // Validação de compatibilidade de fonte de recursos (Fonte Obrigatória)
    const appropriation = await tx.budgetAppropriation.findUnique({
      where: { id: commitment.appropriationId },
      select: { resourceSourceId: true },
    });
    if (!bankAccount.resourceSourceId) {
      throw new FinanceError("A conta bancária para pagamento deve possuir fonte de recursos configurada.");
    }
    if (appropriation?.resourceSourceId && bankAccount.resourceSourceId !== appropriation.resourceSourceId) {
      throw new FinanceError("A fonte de recursos da conta bancária é incompatível com a fonte de recursos da dotação orçamentária.");
    }

    if (commitment.supplierId !== input.supplierId) throw new FinanceError("O fornecedor do pagamento deve ser o mesmo do empenho.");
    const creditor = await creditorForSupplier(tx, input.supplierId);
    if (!commitment.creditorId || commitment.creditorId !== creditor.id) throw new FinanceError("O credor do pagamento deve ser o mesmo credor central do empenho.");

    const settlement = await tx.settlement.findUnique({ where: { id: input.settlementId } });
    if (!settlement || settlement.status !== ACTIVE_SETTLEMENT_STATUS || settlement.commitmentId !== commitment.id) {
      throw new FinanceError("A liquidação selecionada não pertence ao empenho ou não está ativa.");
    }
    const paid = await activePaymentTotal(tx, { settlementId: settlement.id });
    if (paid.plus(value).greaterThan(requiredDecimal(settlement.valueDecimal, "Settlement.valueDecimal"))) {
      throw new FinanceError("O pagamento acumulado excede o saldo disponível da liquidação.");
    }

    const retentionRules = input.retentionRuleIds?.length
      ? await getActiveRetentionRules(tx, {
          financialYearId: year.id,
          date: input.date,
          serviceCode: input.serviceCode?.trim() || undefined,
          ruleIds: input.retentionRuleIds,
        })
      : [];
    const retentions = calculateRetentions(value, retentionRules).map((calculation, index) => ({
      ...calculation,
      rule: retentionRules[index],
    }));
    const retentionTotal = retentions.reduce((total, retention) => total.plus(retention.retainedValue), new Prisma.Decimal(0));
    if (retentionTotal.greaterThan(value)) throw new FinanceError("As retenções não podem exceder o valor bruto do pagamento.");
    const netValue = value.minus(retentionTotal);

    // Validação de saldo financeiro na conta bancária para o valor LÍQUIDO que efetivamente sairá
    const currentBankBalance = await getBankAccountBalance(tx, input.bankAccountId, input.date);
    if (currentBankBalance.lessThan(netValue)) {
      throw new FinanceError(`Saldo financeiro insuficiente na conta bancária. Saldo disponível: R$ ${currentBankBalance.toFixed(2)}.`);
    }

    const payment = await tx.payment.create({
      data: {
        orderNumber: input.orderNumber.trim(),
        date: input.date,
        valueDecimal: value,
        value: legacyMoney(value),
        netValueDecimal: netValue,
        commitmentId: commitment.id,
        settlementId: input.settlementId,
        bankAccountId: input.bankAccountId,
        supplierId: input.supplierId,
        creditorId: creditor.id,
        isExceptional: false,
        paymentMethod: input.paymentMethod,
        status: "Emitida",
      },
    });
    for (const retention of retentions) {
      await tx.paymentRetention.create({
        data: {
          paymentId: payment.id,
          retentionRuleId: retention.rule.id,
          type: retention.type,
          description: retention.rule.description,
          valueDecimal: retention.retainedValue,
          beneficiaryName: retention.rule.beneficiaryName,
          beneficiaryDocument: retention.rule.beneficiaryDocument ?? undefined,
          withholdingPayable: {
            create: {
              valueDecimal: retention.retainedValue,
              dueDate: calculateRetentionDueDate(input.date, retention.rule.dueDays),
            },
          },
        },
      });
    }
    await refreshCommitmentExecutionStatus(tx, commitment.id);
    await audit(tx, actor, "CREATE", "Payment", payment.id, { grossValue: jsonMoney(value), netValue: jsonMoney(netValue), retentionValue: jsonMoney(retentionTotal), commitmentId: commitment.id, settlementId: input.settlementId, creditorId: creditor.id }, year.id);
    return payment;
  });
}

export async function reversePayment(
  db: PrismaClient,
  actor: FinanceActor,
  paymentId: string,
  justification: string,
) {
  if (!justification.trim()) throw new FinanceError("A justificativa de estorno do pagamento é obrigatória.");
  return db.$transaction(async (tx) => {
    await lockPayment(tx, paymentId);
    await lockPaymentWithholdings(tx, paymentId);
    const payment = await tx.payment.findUnique({
      include: {
        commitment: { include: { appropriation: true } },
        retentions: { include: { withholdingPayable: true } },
      },
      where: { id: paymentId },
    });
    if (!payment) throw new FinanceError("Pagamento não encontrado.");
    await lockCommitment(tx, payment.commitmentId);
    const year = await assertFinancialYearOpen(tx, payment.commitment.appropriation.financialYearId, new Date());
    if (payment.status !== "Paga") throw new FinanceError("Somente pagamentos efetivados (Paga) podem ser estornados.");

    // Verifica se alguma retenção associada já foi recolhida
    const recolhida = payment.retentions.some((r) => r.withholdingPayable?.status === "Recolhida");
    if (recolhida) {
      throw new FinanceError("Não é possível estornar um pagamento com retenções tributárias já recolhidas.");
    }

    // O valor que saiu da conta bancária na confirmação foi o valor LÍQUIDO
    const netValue = requiredDecimal(payment.netValueDecimal ?? payment.valueDecimal, "Payment.netValueDecimal");
    const updated = await tx.payment.update({ where: { id: paymentId }, data: { status: "Estornada" } });

    // Registra entrada do valor LÍQUIDO de volta na tesouraria
    await tx.treasuryMovement.create({
      data: {
        date: new Date(),
        type: "PaymentReversal",
        direction: "Entrada",
        valueDecimal: netValue,
        history: `Estorno da ordem de pagamento ${payment.orderNumber}: ${justification.trim()}`,
        bankAccountId: payment.bankAccountId,
        financialYearId: year.id,
        sourceModule: "FINANCEIRO",
        sourceType: "PAYMENT",
        sourceId: payment.id,
        eventType: "PAYMENT_REVERSED",
        idempotencyKey: `FINANCEIRO:PAYMENT:${payment.id}:REVERSAL`,
      },
    });

    await tx.withholdingPayable.updateMany({
      where: { retention: { paymentId } },
      data: { status: "Cancelada" },
    });

    await refreshCommitmentExecutionStatus(tx, payment.commitmentId);
    await audit(tx, actor, "REVERSE", "Payment", paymentId, { previousStatus: payment.status, status: "Estornada", justification: justification.trim() }, year.id);
    return updated;
  });
}

export async function settleWithholdingPayable(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    withholdingPayableId: string;
    bankAccountId: string;
    paymentDate: Date;
    idempotencyKey?: string;
  },
) {
  return db.$transaction(async (tx) => {
    await lockWithholdingPayable(tx, input.withholdingPayableId);
    const payable = await tx.withholdingPayable.findUnique({
      where: { id: input.withholdingPayableId },
      include: {
        retention: {
          include: {
            payment: {
              include: {
                commitment: {
                  include: { appropriation: true },
                },
              },
            },
          },
        },
      },
    });
    if (!payable || payable.status !== "Pendente") {
      throw new FinanceError("Consignação/retenção não encontrada ou já recolhida.");
    }
    // Impede recolher retenção se o pagamento de origem não estiver no status 'Paga'
    if (payable.retention?.payment?.status !== "Paga") {
      throw new FinanceError("A retenção/consignação só pode ser recolhida após a efetivação (status Paga) do pagamento correspondente.");
    }

    await lockBankAccount(tx, input.bankAccountId);
    const bankAccount = await tx.bankAccount.findUnique({ where: { id: input.bankAccountId } });
    if (!bankAccount?.isActive) throw new FinanceError("Conta bancária para recolhimento inativa.");

    // Validação de compatibilidade de Fonte de Recursos e Unidade Gestora para recolhimento da retenção
    const origSourceId = payable.retention.payment.commitment.appropriation.resourceSourceId;
    const origBudgetUnitId = payable.retention.payment.commitment.appropriation.budgetUnitId;
    if (!bankAccount.resourceSourceId) {
      throw new FinanceError("A conta bancária para recolhimento da retenção deve possuir fonte de recursos configurada.");
    }
    if (origSourceId && bankAccount.resourceSourceId !== origSourceId) {
      throw new FinanceError("A fonte de recursos da conta bancária para recolhimento é incompatível com a fonte de recursos da retenção.");
    }
    if (bankAccount.budgetUnitId && origBudgetUnitId && bankAccount.budgetUnitId !== origBudgetUnitId) {
      throw new FinanceError("A conta bancária selecionada pertence a outra Unidade Gestora e não pode debitar o recolhimento desta retenção.");
    }

    const value = requiredDecimal(payable.valueDecimal, "WithholdingPayable.valueDecimal");
    const currentBalance = await getBankAccountBalance(tx, input.bankAccountId, input.paymentDate);
    if (currentBalance.lessThan(value)) {
      throw new FinanceError("Saldo financeiro insuficiente para recolhimento da retenção.");
    }

    const year = await financialYearForPosting(tx, input.paymentDate);
    const updated = await tx.withholdingPayable.update({
      where: { id: input.withholdingPayableId },
      data: { status: "Recolhida" },
    });

    await tx.treasuryMovement.create({
      data: {
        date: input.paymentDate,
        type: "WithholdingPayout",
        direction: "Saída",
        valueDecimal: value,
        history: `Recolhimento de retenção/consignação ${payable.retention.type}: ${payable.retention.description ?? ""}`,
        bankAccountId: input.bankAccountId,
        financialYearId: year.id,
        sourceModule: "FINANCEIRO",
        sourceType: "WITHHOLDING_PAYABLE",
        sourceId: payable.id,
        eventType: "WITHHOLDING_PAID",
        idempotencyKey: input.idempotencyKey ?? `FINANCEIRO:WITHHOLDING:${payable.id}:PAID`,
      },
    });

    await audit(tx, actor, "SETTLE", "WithholdingPayable", payable.id, { value: jsonMoney(value), bankAccountId: input.bankAccountId }, year.id);
    return updated;
  });
}

export async function updatePaymentStatus(db: PrismaClient, actor: FinanceActor, paymentId: string, status: string) {
  return db.$transaction(async (tx) => {
    await lockPayment(tx, paymentId);
    const payment = await tx.payment.findUnique({
      include: {
        commitment: { include: { appropriation: true } },
        retentions: { include: { withholdingPayable: true } },
      },
      where: { id: paymentId },
    });
    if (!payment) throw new FinanceError("Pagamento não encontrado.");

    // Tratamento de dupla confirmação concorrente (idempotência perfeita para cliques múltiplos)
    if (status === "Paga" && payment.status === "Paga") {
      return payment;
    }

    await lockCommitment(tx, payment.commitmentId);
    const year = await assertFinancialYearOpen(tx, payment.commitment.appropriation.financialYearId, payment.date);
    if (status === "Paga" && payment.status !== "Emitida") throw new FinanceError("Somente ordens emitidas podem ser marcadas como pagas.");
    if (status === "Cancelada" && payment.status !== "Emitida") throw new FinanceError("Somente ordens emitidas podem ser canceladas. Pagamentos efetivados exigem estorno.");
    if (status === "Cancelada") {
      await lockPaymentWithholdings(tx, paymentId);
      const recolhida = payment.retentions.some((r) => r.withholdingPayable?.status === "Recolhida");
      if (recolhida) throw new FinanceError("Não é possível cancelar um pagamento com retenções tributárias já recolhidas.");
    }
    if (!["Paga", "Cancelada"].includes(status)) throw new FinanceError("Transição de pagamento inválida.");

    if (status === "Paga") {
      // Bloqueia a conta bancária para evitar race condition entre pagamentos simultâneos
      await lockBankAccount(tx, payment.bankAccountId);

      // O valor que efetivamente sai da conta bancária para o fornecedor é o LÍQUIDO
      const netValue = requiredDecimal(payment.netValueDecimal ?? payment.valueDecimal, "Payment.netValueDecimal");

      // Validação de saldo bancário no momento da efetivação "Paga"
      const currentBalance = await getBankAccountBalance(tx, payment.bankAccountId, payment.date);
      if (currentBalance.lessThan(netValue)) {
        throw new FinanceError(`Saldo bancário insuficiente para efetivar a ordem de pagamento. Saldo disponível: R$ ${currentBalance.toFixed(2)}.`);
      }

      await tx.treasuryMovement.create({
        data: {
          date: payment.date,
          type: "Payment",
          direction: "Saída",
          valueDecimal: netValue,
          history: `Ordem de pagamento ${payment.orderNumber}`,
          bankAccountId: payment.bankAccountId,
          financialYearId: year.id,
          sourceModule: "FINANCEIRO",
          sourceType: "PAYMENT",
          sourceId: payment.id,
          eventType: "PAYMENT_CONFIRMED",
          idempotencyKey: `FINANCEIRO:PAYMENT:${payment.id}:TREASURY`,
        },
      });
    }

    const updated = await tx.payment.update({ where: { id: paymentId }, data: { status } });
    if (status === "Cancelada") await tx.withholdingPayable.updateMany({ where: { retention: { paymentId } }, data: { status: "Cancelada" } });
    await refreshCommitmentExecutionStatus(tx, payment.commitmentId);
    await audit(tx, actor, "STATUS_CHANGE", "Payment", paymentId, { previousStatus: payment.status, status }, year.id);
    return updated;
  });
}

export async function setFinancialYearStatus(db: PrismaClient, actor: FinanceActor, financialYearId: string, status: string) {
  const statuses = ["Preparação", "Aberto", "Em Encerramento", "Encerrado"];
  if (!statuses.includes(status)) throw new FinanceError("Status de exercício inválido.");
  return db.$transaction(async (tx) => {
    const current = await tx.financialYear.findUnique({ where: { id: financialYearId } });
    if (!current) throw new FinanceError("Exercício financeiro não encontrado.");
    const updated = await tx.financialYear.update({ where: { id: financialYearId }, data: { status } });
    await audit(tx, actor, "STATUS_CHANGE", "FinancialYear", financialYearId, { previousStatus: current.status, status }, financialYearId);
    return updated;
  });
}

async function financialYearForPosting(tx: Db, date: Date) {
  const year = await tx.financialYear.findFirst({
    where: { startDate: { lte: date }, endDate: { gte: date } },
    orderBy: { year: "desc" },
  });
  if (!year) throw new FinanceError("Não há exercício financeiro configurado para a data do lançamento.");
  return assertFinancialYearOpen(tx, year.id, date);
}

function signedValue(direction: string, value: Prisma.Decimal) {
  if (direction === "Entrada") return value;
  if (direction === "Saída") return value.negated();
  throw new FinanceError("Direção de tesouraria inválida.");
}

export async function getBankAccountBalance(tx: Db, bankAccountId: string, throughDate?: Date) {
  const movements = await tx.treasuryMovement.findMany({
    where: {
      bankAccountId,
      status: "Confirmado",
      ...(throughDate ? { date: { lte: throughDate } } : {}),
    },
    select: { direction: true, valueDecimal: true },
  });
  return movements.reduce((total, movement) => total.plus(signedValue(movement.direction, movement.valueDecimal)), new Prisma.Decimal(0));
}

export async function getBankAccountBalances(tx: Db, bankAccountIds?: string[]) {
  const movements = await tx.treasuryMovement.findMany({
    where: { status: "Confirmado", ...(bankAccountIds ? { bankAccountId: { in: bankAccountIds } } : {}) },
    select: { bankAccountId: true, direction: true, valueDecimal: true },
  });
  return movements.reduce<Record<string, Prisma.Decimal>>((balances, movement) => {
    balances[movement.bankAccountId] = (balances[movement.bankAccountId] ?? new Prisma.Decimal(0)).plus(signedValue(movement.direction, movement.valueDecimal));
    return balances;
  }, {});
}

export async function createBankAccountWithOpeningBalance(
  db: PrismaClient,
  actor: FinanceActor,
  input: { bankName: string; agency: string; accountNumber: string; accountType: string; openingBalance?: Prisma.Decimal | string | number; resourceSourceId?: string; isActive: boolean; openingDate?: Date },
) {
  const openingBalance = input.openingBalance === undefined ? new Prisma.Decimal(0) : new Prisma.Decimal(String(input.openingBalance)).toDecimalPlaces(2);
  if (!openingBalance.isFinite() || openingBalance.lessThan(0)) throw new FinanceError("O saldo de abertura não pode ser negativo.");
  const openingDate = input.openingDate ?? new Date();
  return db.$transaction(async (tx) => {
    const account = await tx.bankAccount.create({
      data: {
        bankName: input.bankName.trim(),
        agency: input.agency.trim(),
        accountNumber: input.accountNumber.trim(),
        accountType: input.accountType.trim(),
        currentBalance: 0,
        currentBalanceDecimal: new Prisma.Decimal(0),
        resourceSourceId: input.resourceSourceId?.trim() || undefined,
        isActive: input.isActive,
      },
    });
    if (openingBalance.greaterThan(0)) {
      const year = await financialYearForPosting(tx, openingDate);
      const movement = await tx.treasuryMovement.create({
        data: {
          date: openingDate,
          type: "OpeningBalance",
          direction: "Entrada",
          valueDecimal: openingBalance,
          history: "Saldo de abertura auditado na inclusão da conta.",
          bankAccountId: account.id,
          financialYearId: year.id,
          sourceModule: "FINANCEIRO",
          sourceType: "BANK_ACCOUNT",
          sourceId: account.id,
          eventType: "OPENING_BALANCE",
          idempotencyKey: `FINANCEIRO:BANK_ACCOUNT:${account.id}:OPENING_BALANCE`,
        },
      });
      await audit(tx, actor, "CREATE", "TreasuryMovement", movement.id, { type: movement.type, value: jsonMoney(openingBalance), bankAccountId: account.id }, year.id);
    }
    await audit(tx, actor, "CREATE", "BankAccount", account.id, { openingBalance: jsonMoney(openingBalance) });
    return account;
  });
}

export async function updateBankAccountDetails(
  db: PrismaClient,
  actor: FinanceActor,
  id: string,
  input: { bankName?: string; agency?: string; accountNumber?: string; accountType?: string; resourceSourceId?: string; isActive?: boolean },
) {
  return db.$transaction(async (tx) => {
    const account = await tx.bankAccount.update({
      where: { id },
      data: {
        bankName: input.bankName?.trim(),
        agency: input.agency?.trim(),
        accountNumber: input.accountNumber?.trim(),
        accountType: input.accountType?.trim(),
        resourceSourceId: input.resourceSourceId?.trim() || undefined,
        isActive: input.isActive,
      },
    });
    await audit(tx, actor, "UPDATE", "BankAccount", account.id, { detailsOnly: true });
    return account;
  });
}

export async function createTreasuryTransfer(
  db: PrismaClient,
  actor: FinanceActor,
  input: { date: Date; value: Prisma.Decimal | string | number; sourceBankAccountId: string; destinationBankAccountId: string; history?: string; idempotencyKey?: string },
) {
  const value = money(input.value);
  if (input.sourceBankAccountId === input.destinationBankAccountId) throw new FinanceError("A transferência exige contas de origem e destino diferentes.");
  return db.$transaction(async (tx) => {
    if (input.idempotencyKey) {
      const existing = await tx.treasuryTransfer.findUnique({ where: { idempotencyKey: input.idempotencyKey } });
      if (existing) return existing;
    }
    const [source, destination, year] = await Promise.all([
      tx.bankAccount.findUnique({ where: { id: input.sourceBankAccountId }, select: { isActive: true } }),
      tx.bankAccount.findUnique({ where: { id: input.destinationBankAccountId }, select: { isActive: true } }),
      financialYearForPosting(tx, input.date),
    ]);
    if (!source?.isActive || !destination?.isActive) throw new FinanceError("As contas da transferência devem estar ativas.");
    const common = { date: input.date, type: "Transfer", valueDecimal: value, history: input.history?.trim() || "Transferência entre contas bancárias.", financialYearId: year.id, sourceModule: "FINANCEIRO", sourceType: "TREASURY_TRANSFER", sourceId: input.idempotencyKey, eventType: "TRANSFER", status: "Confirmado" };
    const debit = await tx.treasuryMovement.create({ data: { ...common, direction: "Saída", bankAccountId: input.sourceBankAccountId, idempotencyKey: input.idempotencyKey ? `${input.idempotencyKey}:OUT` : undefined } });
    const credit = await tx.treasuryMovement.create({ data: { ...common, direction: "Entrada", bankAccountId: input.destinationBankAccountId, idempotencyKey: input.idempotencyKey ? `${input.idempotencyKey}:IN` : undefined } });
    const transfer = await tx.treasuryTransfer.create({
      data: { date: input.date, valueDecimal: value, history: input.history?.trim() || undefined, sourceBankAccountId: input.sourceBankAccountId, destinationBankAccountId: input.destinationBankAccountId, sourceMovementId: debit.id, destinationMovementId: credit.id, idempotencyKey: input.idempotencyKey?.trim() || undefined },
    });
    await audit(tx, actor, "CREATE", "TreasuryTransfer", transfer.id, { value: jsonMoney(value), sourceBankAccountId: input.sourceBankAccountId, destinationBankAccountId: input.destinationBankAccountId }, year.id);
    return transfer;
  });
}

export async function recordConfirmedRevenue(
  tx: Prisma.TransactionClient,
  actor: FinanceActor,
  input: { date: Date; value: Prisma.Decimal | string | number; revenueNatureId: string; resourceSourceId: string; bankAccountId: string; history?: string; sourceModule: string; sourceType: string; sourceId?: string; eventType: string; idempotencyKey: string },
) {
  const value = money(input.value);
  const existing = await tx.revenue.findUnique({ where: { idempotencyKey: input.idempotencyKey }, include: { treasuryMovement: true } });
  if (existing) return existing;
  const [year, bankAccount, nature, source] = await Promise.all([
    financialYearForPosting(tx, input.date),
    tx.bankAccount.findUnique({ where: { id: input.bankAccountId }, select: { isActive: true } }),
    tx.revenueNature.findUnique({ where: { id: input.revenueNatureId }, select: { id: true } }),
    tx.resourceSource.findUnique({ where: { id: input.resourceSourceId }, select: { id: true } }),
  ]);
  if (!bankAccount?.isActive) throw new FinanceError("A receita exige uma conta bancária ativa.");
  if (!nature || !source) throw new FinanceError("Natureza e fonte da receita devem estar configuradas.");
  const revenue = await tx.revenue.create({
    data: { date: input.date, valueDecimal: value, value: legacyMoney(value), financialYearId: year.id, revenueNatureId: input.revenueNatureId, resourceSourceId: input.resourceSourceId, bankAccountId: input.bankAccountId, history: input.history?.trim() || undefined, sourceModule: input.sourceModule.trim(), sourceType: input.sourceType.trim(), sourceId: input.sourceId?.trim() || undefined, eventType: input.eventType.trim(), idempotencyKey: input.idempotencyKey, status: "Arrecadada" },
  });
  const movement = await tx.treasuryMovement.create({
    data: { date: input.date, type: "Revenue", direction: "Entrada", valueDecimal: value, history: revenue.history, bankAccountId: input.bankAccountId, financialYearId: year.id, revenueId: revenue.id, sourceModule: input.sourceModule.trim(), sourceType: input.sourceType.trim(), sourceId: input.sourceId?.trim() || undefined, eventType: input.eventType.trim(), idempotencyKey: `${input.idempotencyKey}:TREASURY` },
  });
  await audit(tx, actor, "CREATE", "Revenue", revenue.id, { value: jsonMoney(value), treasuryMovementId: movement.id, sourceModule: revenue.sourceModule, sourceType: revenue.sourceType, sourceId: revenue.sourceId }, year.id);
  return { ...revenue, treasuryMovement: movement };
}

export async function createRevenue(
  db: PrismaClient,
  actor: FinanceActor,
  input: { date: Date; value: Prisma.Decimal | string | number; revenueNatureId: string; resourceSourceId: string; bankAccountId: string; history?: string; sourceModule: string; sourceType: string; sourceId?: string; eventType: string; idempotencyKey: string },
) {
  return db.$transaction((tx) => recordConfirmedRevenue(tx, actor, input));
}

export async function dailyTreasuryBulletin(tx: Db, date: Date, bankAccountId?: string) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const movements = await tx.treasuryMovement.findMany({
    where: { status: "Confirmado", ...(bankAccountId ? { bankAccountId } : {}), date: { gte: start, lt: end } },
    select: { direction: true, type: true, valueDecimal: true },
  });
  const opening = await tx.treasuryMovement.findMany({
    where: { status: "Confirmado", ...(bankAccountId ? { bankAccountId } : {}), date: { lt: start } },
    select: { direction: true, valueDecimal: true },
  });
  const openingBalance = opening.reduce((total, movement) => total.plus(signedValue(movement.direction, movement.valueDecimal)), new Prisma.Decimal(0));
  const incoming = movements.filter((movement) => movement.direction === "Entrada").reduce((total, movement) => total.plus(movement.valueDecimal), new Prisma.Decimal(0));
  const outgoing = movements.filter((movement) => movement.direction === "Saída").reduce((total, movement) => total.plus(movement.valueDecimal), new Prisma.Decimal(0));
  return { date: start, openingBalance, incoming, outgoing, closingBalance: openingBalance.plus(incoming).minus(outgoing), movements };
}

export async function basicCashflow(tx: Db, startDate: Date, endDate: Date, bankAccountId?: string) {
  const movements = await tx.treasuryMovement.findMany({
    where: { status: "Confirmado", ...(bankAccountId ? { bankAccountId } : {}), date: { gte: startDate, lte: endDate } },
    select: { date: true, direction: true, valueDecimal: true },
    orderBy: { date: "asc" },
  });
  return movements.reduce<Record<string, { incoming: Prisma.Decimal; outgoing: Prisma.Decimal; net: Prisma.Decimal }>>((days, movement) => {
    const key = movement.date.toISOString().slice(0, 10);
    const entry = days[key] ?? { incoming: new Prisma.Decimal(0), outgoing: new Prisma.Decimal(0), net: new Prisma.Decimal(0) };
    if (movement.direction === "Entrada") entry.incoming = entry.incoming.plus(movement.valueDecimal);
    else entry.outgoing = entry.outgoing.plus(movement.valueDecimal);
    entry.net = entry.incoming.minus(entry.outgoing);
    days[key] = entry;
    return days;
  }, {});
}

function parseCsvLine(line: string, separator: string) {
  const values: string[] = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') { value += '"'; index += 1; }
      else quoted = !quoted;
    } else if (character === separator && !quoted) { values.push(value.trim()); value = ""; }
    else value += character;
  }
  values.push(value.trim());
  return values;
}

function parseCsvAmount(raw: string) {
  const value = raw.trim();
  // Brazilian values use dots as thousands separators only when a comma is present.
  const normalized = value.includes(",") ? value.replace(/\./g, "").replace(",", ".") : value;
  return new Prisma.Decimal(normalized);
}

export async function importBankStatementCsv(
  db: PrismaClient,
  actor: FinanceActor,
  input: { bankAccountId: string; content: string; fileName?: string; separator?: "," | ";" },
) {
  const separator = input.separator ?? (input.content.split("\n")[0]?.includes(";") ? ";" : ",");
  const rows = input.content.split(/\r?\n/).filter((row) => row.trim());
  if (rows.length < 2) throw new FinanceError("O CSV deve ter cabeçalho e ao menos um lançamento.");
  const headers = parseCsvLine(rows[0], separator).map((header) => header.toLowerCase().trim());
  const required = ["date", "description", "amount"];
  if (!required.every((header) => headers.includes(header))) throw new FinanceError("O CSV deve conter as colunas date, description e amount.");
  const checksum = createHash("sha256").update(input.content).digest("hex");
  return db.$transaction(async (tx) => {
    const existing = await tx.bankStatementImport.findUnique({ where: { bankAccountId_checksum: { bankAccountId: input.bankAccountId, checksum } } });
    if (existing) return existing;
    const account = await tx.bankAccount.findUnique({ where: { id: input.bankAccountId }, select: { id: true } });
    if (!account) throw new FinanceError("Conta bancária não encontrada.");
    const importRecord = await tx.bankStatementImport.create({ data: { bankAccountId: account.id, format: "CSV", fileName: input.fileName?.trim() || undefined, checksum } });
    for (const row of rows.slice(1)) {
      const values = parseCsvLine(row, separator);
      const item = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
      const amount = parseCsvAmount(item.amount);
      if (!amount.isFinite() || amount.isZero()) throw new FinanceError("CSV contém valor inválido ou zero.");
      const date = new Date(item.date);
      if (Number.isNaN(date.valueOf())) throw new FinanceError("CSV contém data inválida.");
      await tx.bankStatementItem.create({ data: { statementImportId: importRecord.id, date, description: item.description || undefined, reference: item.reference || undefined, direction: amount.isNegative() ? "Saída" : "Entrada", valueDecimal: amount.abs() } });
    }
    await audit(tx, actor, "IMPORT", "BankStatementImport", importRecord.id, { format: "CSV", fileName: importRecord.fileName });
    return importRecord;
  });
}

function accountingMonth(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

async function assertAccountingPeriodOpen(tx: Db, financialYearId: string, date: Date) {
  const close = await tx.monthlyAccountingClose.findUnique({
    where: { financialYearId_competence: { financialYearId, competence: accountingMonth(date) } },
    select: { status: true },
  });
  if (close?.status === "FECHADO") throw new FinanceError("A competencia contabil esta fechada para novas postagens.");
}

type AccountingLine = {
  accountId: string;
  type: "Débito" | "Crédito";
  value: Prisma.Decimal | string | number;
};

function accountingTotals(lines: AccountingLine[]) {
  if (lines.length < 2) throw new FinanceError("Uma partida contabil exige ao menos dois lancamentos.");
  const totals = lines.reduce((result, line) => {
    if (!line.accountId || !["Débito", "Crédito"].includes(line.type)) throw new FinanceError("Conta e natureza contabil invalidas.");
    const value = money(line.value);
    if (line.type === "Débito") result.debit = result.debit.plus(value);
    else result.credit = result.credit.plus(value);
    return result;
  }, { debit: new Prisma.Decimal(0), credit: new Prisma.Decimal(0) });
  if (!totals.debit.equals(totals.credit)) throw new FinanceError("A postagem foi bloqueada: debitos e creditos devem ser iguais.");
  return totals;
}

export async function postAccountingTransaction(
  db: PrismaClient,
  actor: FinanceActor,
  input: {
    financialYearId: string;
    date: Date;
    history: string;
    lines: AccountingLine[];
    sourceModule?: string;
    sourceType?: string;
    sourceId?: string;
    eventType?: string;
    idempotencyKey?: string;
  },
) {
  const totals = accountingTotals(input.lines);
  if (!input.history.trim()) throw new FinanceError("Informe o historico da transacao contabil.");
  if (!actor.employeeId) throw new FinanceError("A postagem contabil exige usuario vinculado a servidor responsavel.");
  return db.$transaction(async (tx) => {
    if (input.idempotencyKey) {
      const existing = await tx.accountingTransaction.findUnique({ where: { idempotencyKey: input.idempotencyKey } });
      if (existing) return existing;
    }
    await assertFinancialYearOpen(tx, input.financialYearId, input.date);
    await assertAccountingPeriodOpen(tx, input.financialYearId, input.date);
    const accounts = await tx.accountingPlan.findMany({ where: { id: { in: input.lines.map((line) => line.accountId) } }, select: { id: true } });
    if (accounts.length !== new Set(input.lines.map((line) => line.accountId)).size) throw new FinanceError("Uma ou mais contas contabeis nao foram encontradas.");
    const transaction = await tx.accountingTransaction.create({
      data: {
        financialYearId: input.financialYearId,
        date: input.date,
        history: input.history.trim(),
        status: "POSTADO",
        sourceModule: input.sourceModule?.trim() || "MANUAL",
        sourceType: input.sourceType?.trim() || "ACCOUNTING_TRANSACTION",
        sourceId: input.sourceId?.trim() || undefined,
        eventType: input.eventType?.trim() || "MANUAL_POSTING",
        idempotencyKey: input.idempotencyKey?.trim() || undefined,
        authorUsuarioId: actor.usuarioId,
        authorEmployeeId: actor.employeeId,
        postedAt: new Date(),
        entries: {
          create: input.lines.map((line) => {
            const value = money(line.value);
            return { date: input.date, value: legacyMoney(value), valueDecimal: value, type: line.type, history: input.history.trim(), accountId: line.accountId, authorId: actor.employeeId! };
          }),
        },
      },
    });
    await audit(tx, actor, "POST", "AccountingTransaction", transaction.id, { debit: jsonMoney(totals.debit), credit: jsonMoney(totals.credit), lineCount: input.lines.length, eventType: transaction.eventType }, input.financialYearId);
    return transaction;
  });
}

export async function postAccountingEvent(
  db: PrismaClient,
  actor: FinanceActor,
  input: { financialYearId: string; date: Date; eventCode: string; value: Prisma.Decimal | string | number; history: string; sourceModule: string; sourceType: string; sourceId?: string; idempotencyKey?: string },
) {
  const value = money(input.value);
  const event = await db.accountingEventCatalog.findUnique({ where: { code: input.eventCode }, include: { rules: { where: { isActive: true } } } });
  if (!event?.isActive || event.rules.length !== 1) throw new FinanceError("O evento contabil deve possuir exatamente uma regra ativa antes da postagem.");
  const rule = event.rules[0];
  return postAccountingTransaction(db, actor, {
    financialYearId: input.financialYearId,
    date: input.date,
    history: input.history,
    lines: [{ accountId: rule.debitAccountId, type: "Débito", value }, { accountId: rule.creditAccountId, type: "Crédito", value }],
    sourceModule: input.sourceModule,
    sourceType: input.sourceType,
    sourceId: input.sourceId,
    eventType: event.code,
    idempotencyKey: input.idempotencyKey,
  });
}

export async function configureAccountingPostingRule(
  db: PrismaClient,
  actor: FinanceActor,
  input: { eventCode: string; eventName: string; debitAccountId: string; creditAccountId: string; description?: string },
) {
  if (!input.eventCode.trim() || !input.eventName.trim()) throw new FinanceError("Codigo e nome do evento contabil sao obrigatorios.");
  if (input.debitAccountId === input.creditAccountId) throw new FinanceError("A regra contabil exige contas de debito e credito diferentes.");
  return db.$transaction(async (tx) => {
    const accounts = await tx.accountingPlan.count({ where: { id: { in: [input.debitAccountId, input.creditAccountId] } } });
    if (accounts !== 2) throw new FinanceError("As contas da regra contabil nao foram encontradas.");
    const event = await tx.accountingEventCatalog.upsert({ where: { code: input.eventCode.trim() }, create: { code: input.eventCode.trim(), name: input.eventName.trim(), description: input.description?.trim() || undefined }, update: { name: input.eventName.trim(), description: input.description?.trim() || undefined, isActive: true } });
    const rule = await tx.accountingPostingRule.upsert({ where: { eventId_debitAccountId_creditAccountId: { eventId: event.id, debitAccountId: input.debitAccountId, creditAccountId: input.creditAccountId } }, create: { eventId: event.id, debitAccountId: input.debitAccountId, creditAccountId: input.creditAccountId, description: input.description?.trim() || undefined }, update: { isActive: true, description: input.description?.trim() || undefined } });
    await audit(tx, actor, "UPSERT", "AccountingPostingRule", rule.id, { eventCode: event.code, debitAccountId: rule.debitAccountId, creditAccountId: rule.creditAccountId });
    return rule;
  });
}

export async function accountingTrialBalance(tx: Db, financialYearId: string, throughDate?: Date) {
  const entries = await tx.accountingEntry.findMany({
    where: { transaction: { financialYearId, status: "POSTADO", ...(throughDate ? { date: { lte: throughDate } } : {}) } },
    include: { account: { select: { id: true, code: true, name: true, type: true } }, transaction: { select: { date: true } } },
    orderBy: { account: { code: "asc" } },
  });
  return Object.values(entries.reduce<Record<string, { account: typeof entries[number]["account"]; debit: Prisma.Decimal; credit: Prisma.Decimal; balance: Prisma.Decimal }>>((result, entry) => {
    const current = result[entry.accountId] ?? { account: entry.account, debit: new Prisma.Decimal(0), credit: new Prisma.Decimal(0), balance: new Prisma.Decimal(0) };
    const value = requiredDecimal(entry.valueDecimal, "AccountingEntry.valueDecimal");
    if (entry.type === "Débito") current.debit = current.debit.plus(value);
    else current.credit = current.credit.plus(value);
    current.balance = current.debit.minus(current.credit);
    result[entry.accountId] = current;
    return result;
  }, {}));
}

export async function accountingPendingChecks(tx: Db, financialYearId: string, competence: Date) {
  const monthStart = accountingMonth(competence);
  const nextMonth = new Date(monthStart);
  nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1);
  const [draftTransactions, emittedPayments, openReconciliations] = await Promise.all([
    tx.accountingTransaction.count({ where: { financialYearId, status: "RASCUNHO", date: { lt: nextMonth } } }),
    tx.payment.count({ where: { status: "Emitida", date: { lt: nextMonth } } }),
    tx.bankStatementItem.count({ where: { status: "Pendente", date: { lt: nextMonth } } }),
  ]);
  return { draftTransactions, emittedPayments, openReconciliations, total: draftTransactions + emittedPayments + openReconciliations };
}

export async function closeAccountingMonth(db: PrismaClient, actor: FinanceActor, financialYearId: string, competence: Date) {
  return db.$transaction(async (tx) => {
    const year = await tx.financialYear.findUnique({ where: { id: financialYearId } });
    if (!year || !["Aberto", "Em Encerramento"].includes(year.status)) throw new FinanceError("O exercicio nao esta disponivel para fechamento contabil.");
    const month = accountingMonth(competence);
    if (month < accountingMonth(year.startDate) || month > accountingMonth(year.endDate)) throw new FinanceError("A competencia nao pertence ao exercicio financeiro.");
    const pending = await accountingPendingChecks(tx, financialYearId, month);
    if (pending.total) throw new FinanceError("O fechamento mensal foi bloqueado por pendencias de contabilizacao, pagamentos ou conciliacao.");
    const close = await tx.monthlyAccountingClose.upsert({
      where: { financialYearId_competence: { financialYearId, competence: month } },
      create: { financialYearId, competence: month, status: "FECHADO", pendingSummary: pending, closedByUsuarioId: actor.usuarioId, closedByEmployeeId: actor.employeeId, closedAt: new Date() },
      update: { status: "FECHADO", pendingSummary: pending, closedByUsuarioId: actor.usuarioId, closedByEmployeeId: actor.employeeId, closedAt: new Date() },
    });
    await audit(tx, actor, "CLOSE", "MonthlyAccountingClose", close.id, pending, financialYearId);
    return close;
  });
}

export async function prepareAnnualAccountingClose(db: PrismaClient, actor: FinanceActor, financialYearId: string) {
  return db.$transaction(async (tx) => {
    const year = await tx.financialYear.findUnique({ where: { id: financialYearId } });
    if (!year) throw new FinanceError("Exercicio financeiro nao encontrado.");
    const closes = await tx.monthlyAccountingClose.count({ where: { financialYearId, status: "FECHADO" } });
    if (closes < 12) throw new FinanceError("O encerramento anual exige os doze fechamentos mensais.");
    const pending = await accountingPendingChecks(tx, financialYearId, year.endDate);
    if (pending.total) throw new FinanceError("O encerramento anual possui pendencias operacionais.");
    const commitments = await tx.commitment.findMany({ where: { appropriation: { financialYearId }, status: { in: ["Emitido", "Liquidado", "Pago"] } }, include: { movements: true, payments: { where: { status: "Paga" }, select: { valueDecimal: true } } } });
    for (const commitment of commitments) {
      const effective = commitmentValue(commitment.valueDecimal, commitment.movements);
      const paid = commitment.payments.reduce((total, payment) => total.plus(requiredDecimal(payment.valueDecimal, "Payment.valueDecimal")), new Prisma.Decimal(0));
      const outstanding = effective.minus(paid);
      if (outstanding.greaterThan(0)) await tx.payableCarryForward.upsert({ where: { financialYearId_commitmentId: { financialYearId, commitmentId: commitment.id } }, create: { financialYearId, commitmentId: commitment.id, valueDecimal: outstanding, type: commitment.status === "Liquidado" ? "PROCESSADO" : "NAO_PROCESSADO" }, update: { valueDecimal: outstanding, type: commitment.status === "Liquidado" ? "PROCESSADO" : "NAO_PROCESSADO" } });
    }
    const annual = await tx.annualAccountingClose.upsert({ where: { financialYearId }, create: { financialYearId, status: "PRONTO_PARA_VALIDACAO", pendingSummary: pending }, update: { status: "PRONTO_PARA_VALIDACAO", pendingSummary: pending } });
    await audit(tx, actor, "PREPARE_CLOSE", "AnnualAccountingClose", annual.id, { ...pending, payableCandidates: commitments.length }, financialYearId);
    return annual;
  });
}
