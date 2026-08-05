import { PrismaClient, Prisma } from "@prisma/client";
import crypto from "crypto";
import { recordConfirmedRevenue, type FinanceActor } from "./index";

export type YieldType = "BRUTO" | "LIQUIDO" | "CORRECAO" | "ESTORNO" | "ACUMULADO";

export interface YieldCalculationResult {
  valorBruto: number;
  irrf: number;
  iof: number;
  correcaoMonetaria: number;
  valorLiquido: number;
  saldoAcumulado: number;
  tipo: YieldType;
  classificacaoContabil: {
    contaDebito: string;
    contaCredito: string;
    eventoContabil: string;
    naturezaReceita: string;
    fonteRecurso: string;
  };
}

export interface YieldTransmissionResult {
  reciboId: string;
  numeroLancamento: string;
  hashTransmissao: string;
  status: "SUCESSO" | "ERRO";
  mensagem: string;
  yieldTransactionId: string;
}

/**
 * Realiza o cálculo contábil e apuração de rendimentos de aplicações financeiras
 */
export function calculateInvestmentYield(data: {
  valorBruto: number;
  irrf?: number;
  iof?: number;
  correcaoMonetaria?: number;
  saldoAnteriorAcumulado?: number;
  isEstorno?: boolean;
}): YieldCalculationResult {
  const bruto = Math.max(0, data.valorBruto || 0);
  const irrf = Math.max(0, data.irrf || 0);
  const iof = Math.max(0, data.iof || 0);
  const correcao = Math.max(0, data.correcaoMonetaria || 0);
  const saldoAnterior = data.saldoAnteriorAcumulado || 0;

  const liquido = data.isEstorno ? -(bruto - irrf - iof + correcao) : bruto - irrf - iof + correcao;
  const saldoAcumulado = saldoAnterior + liquido;
  const tipo: YieldType = data.isEstorno ? "ESTORNO" : correcao > 0 ? "CORRECAO" : "BRUTO";

  return {
    valorBruto: bruto,
    irrf,
    iof,
    correcaoMonetaria: correcao,
    valorLiquido: liquido,
    saldoAcumulado,
    tipo,
    classificacaoContabil: {
      contaDebito: "1.1.1.2.1.00.00 - Aplicações Financeiras de Curto Prazo",
      contaCredito: "4.1.3.2.1.01.00 - Receita de Rendimentos de Aplicações Financeiras",
      eventoContabil: "10.02.05 - Registro de Rendimento de Aplicação",
      naturezaReceita: "1.3.2.1.01.1.1.00.00 - Rendimentos de Aplicações Financeiras",
      fonteRecurso: "15000000 - Recursos Não Vinculados de Impostos",
    },
  };
}

/**
 * Transmite o rendimento apurado para o Sistema Municipal
 */
export async function transmitYieldToMunicipalSystem(
  prisma: PrismaClient,
  data: {
    statementItemId?: string;
    contaNumero: string;
    data: Date;
    valorBruto: number;
    irrf: number;
    iof: number;
    correcaoMonetaria: number;
    valorLiquido: number;
    saldoAcumulado: number;
    tipo: YieldType;
    usuarioId: string;
  }
): Promise<YieldTransmissionResult> {
  const actor: FinanceActor = { usuarioId: data.usuarioId, employeeId: null };
  const result = await prisma.$transaction(async (tx) => {
    const account = await tx.bankAccount.findFirst({
      where: { accountNumber: data.contaNumero, isActive: true },
      select: { id: true, resourceSourceId: true },
    });
    if (!account?.resourceSourceId) throw new Error("A conta de aplicação deve estar ativa e vinculada a uma fonte de recurso.");

    const nature = await tx.revenueNature.findFirst({
      where: { code: { startsWith: "1.3.2.1" } },
      select: { id: true },
      orderBy: { code: "asc" },
    });
    if (!nature) throw new Error("Cadastre uma natureza de receita para rendimentos de aplicação antes da transmissão.");

    const statement = data.statementItemId
      ? await tx.bankStatementItem.findUnique({ where: { id: data.statementItemId }, select: { id: true, treasuryMovementId: true, codigoTransacao: true } })
      : null;
    if (statement?.treasuryMovementId) throw new Error("Este rendimento já foi transmitido ao sistema municipal.");

    const idempotencyKey = statement?.codigoTransacao
      ? `BANK:YIELD:${account.id}:${statement.codigoTransacao}`
      : `BANK:YIELD:${account.id}:${data.data.toISOString().slice(0, 10)}:${data.valorLiquido.toFixed(2)}:${data.tipo}`;
    const existing = await tx.yieldTransaction.findUnique({ where: { idempotencyKey } });
    const yieldRecord = existing ?? await tx.yieldTransaction.create({
      data: {
        statementItemId: data.statementItemId,
        contaNumero: data.contaNumero,
        data: data.data,
        valorBrutoDecimal: new Prisma.Decimal(data.valorBruto),
        irrfDecimal: new Prisma.Decimal(data.irrf),
        iofDecimal: new Prisma.Decimal(data.iof),
        correcaoDecimal: new Prisma.Decimal(data.correcaoMonetaria),
        valorLiquidoDecimal: new Prisma.Decimal(data.valorLiquido),
        saldoAcumuladoDecimal: new Prisma.Decimal(data.saldoAcumulado),
        tipoRendimento: data.tipo,
        idempotencyKey,
      },
    });

    const revenue = await recordConfirmedRevenue(tx, actor, {
      date: data.data,
      value: Math.abs(data.valorLiquido),
      revenueNatureId: nature.id,
      resourceSourceId: account.resourceSourceId,
      bankAccountId: account.id,
      history: "Rendimento de aplicação financeira",
      sourceModule: "FINANCEIRO",
      sourceType: "BANK_YIELD",
      sourceId: yieldRecord.id,
      eventType: "RENDIMENTO_APLICACAO",
      idempotencyKey: `${idempotencyKey}:REVENUE`,
    });
    const treasuryMovement = revenue.treasuryMovement;
    if (!treasuryMovement) throw new Error("A receita de rendimento não possui movimento de tesouraria vinculado.");
    const reciboId = `REC-REND-${treasuryMovement.id}`;
    const numeroLancamento = `LANC-REND-${treasuryMovement.id.slice(-8).toUpperCase()}`;
    const hashTransmissao = crypto.createHash("sha256").update(`${yieldRecord.id}:${treasuryMovement.id}`).digest("hex");
    const audit = await tx.financialAuditLog.create({
      data: {
        action: "RENDIMENTO_APLICACAO_TRANSMITIDO",
        entityType: "YieldTransaction",
        entityId: yieldRecord.id,
        authorUsuarioId: data.usuarioId,
        payload: { reciboId, numeroLancamento, valorBruto: data.valorBruto, valorLiquido: data.valorLiquido, hashTransmissao, treasuryMovementId: treasuryMovement.id },
      },
    });
    await tx.yieldTransaction.update({ where: { id: yieldRecord.id }, data: { reciboMunicipal: reciboId, lancamentoContabilId: audit.id } });
    if (statement) {
      await tx.bankStatementItem.update({
        where: { id: statement.id },
        data: { treasuryMovementId: treasuryMovement.id, status: "Processado", reciboMunicipal: reciboId, lancamentoContabilId: audit.id, categoriaClassificada: "RENDIMENTO" },
      });
    }
    return { yieldRecord, reciboId, numeroLancamento, hashTransmissao };
  });

  return {
    reciboId: result.reciboId,
    numeroLancamento: result.numeroLancamento,
    hashTransmissao: result.hashTransmissao,
    status: "SUCESSO",
    mensagem: "Rendimento registrado como receita e movimento de tesouraria municipal.",
    yieldTransactionId: result.yieldRecord.id,
  };
}
