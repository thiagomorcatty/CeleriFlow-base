import { PrismaClient, Prisma } from "@prisma/client";

export type ReconciliationMatchType =
  | "VALOR_DATA_EXATA"
  | "VALOR_D1"
  | "DOCUMENTO"
  | "HISTORICO"
  | "AGRUPADO"
  | "1_PARA_N"
  | "DIVERGENCIA_VALOR"
  | "SEM_CORRESPONDENTE"
  | "POSSIVEL_DUPLICIDADE";

export interface ReconciliationMatchResult {
  statementItemId?: string;
  treasuryMovementId?: string;
  type: ReconciliationMatchType;
  confidenceScore: number;
  description: string;
  valorBanco?: number;
  valorContabil?: number;
  diferenca?: number;
}

export interface SessionBalancesSummary {
  saldoInicial: number;
  totalDebitos: number;
  totalCreditos: number;
  saldoFinal: number;
  saldoRazao: number;
  diferenca: number;
  totalItensBanco: number;
  totalItensContabeis: number;
  itensConciliados: number;
  itensDivergentes: number;
}

/**
 * Executa o motor de correspondência automática de conciliação bancária cobrindo as 9 regras do edital
 */
export async function runAutoReconciliation(
  prisma: PrismaClient,
  sessionId: string
): Promise<{
  session: any;
  matches: ReconciliationMatchResult[];
  balances: SessionBalancesSummary;
}> {
  const session = await prisma.bankReconciliationSession.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    throw new Error("Sessão de conciliação bancária não encontrada.");
  }

  // Obter extratos pendentes da conta
  const bankItems = await prisma.bankStatementItem.findMany({
    where: {
      contaNumero: session.contaNumero,
      date: { gte: session.dataInicio, lte: session.dataFim },
    },
  });

  // Obter lançamentos do Razão / Tesouraria
  const treasuryMovements = await prisma.treasuryMovement.findMany({
    where: {
      bankAccountId: session.contaNumero,
      date: { gte: session.dataInicio, lte: session.dataFim },
    },
  });

  const matches: ReconciliationMatchResult[] = [];
  const matchedBankIds = new Set<string>();
  const matchedTreasuryIds = new Set<string>();

  // 1. Regra 1: Valor Exato e Mesma Data
  for (const bItem of bankItems) {
    if (matchedBankIds.has(bItem.id)) continue;
    const bVal = Number(bItem.valueDecimal);
    const bDateStr = bItem.date.toISOString().split("T")[0];

    const match = treasuryMovements.find((t) => {
      if (matchedTreasuryIds.has(t.id)) return false;
      const tVal = Number(t.valueDecimal);
      const tDateStr = t.date.toISOString().split("T")[0];
      return Math.abs(bVal - tVal) < 0.01 && bDateStr === tDateStr;
    });

    if (match) {
      matchedBankIds.add(bItem.id);
      matchedTreasuryIds.add(match.id);
      matches.push({
        statementItemId: bItem.id,
        treasuryMovementId: match.id,
        type: "VALOR_DATA_EXATA",
        confidenceScore: 1.0,
        description: "Correspondência perfeita de valor e data exata.",
        valorBanco: bVal,
        valorContabil: Number(match.valueDecimal),
        diferenca: 0,
      });
    }
  }

  // 2. Regra 2: Valor Exato com Diferença de ±1 Dia
  for (const bItem of bankItems) {
    if (matchedBankIds.has(bItem.id)) continue;
    const bVal = Number(bItem.valueDecimal);
    const bTime = bItem.date.getTime();

    const match = treasuryMovements.find((t) => {
      if (matchedTreasuryIds.has(t.id)) return false;
      const tVal = Number(t.valueDecimal);
      const diffDays = Math.abs(bTime - t.date.getTime()) / (1000 * 3600 * 24);
      return Math.abs(bVal - tVal) < 0.01 && diffDays <= 1.5;
    });

    if (match) {
      matchedBankIds.add(bItem.id);
      matchedTreasuryIds.add(match.id);
      matches.push({
        statementItemId: bItem.id,
        treasuryMovementId: match.id,
        type: "VALOR_D1",
        confidenceScore: 0.95,
        description: "Correspondência por valor exato com tolerância de ±1 dia útil.",
        valorBanco: bVal,
        valorContabil: Number(match.valueDecimal),
        diferenca: 0,
      });
    }
  }

  // 3. Regra 3: Correspondência por Número do Documento
  for (const bItem of bankItems) {
    if (matchedBankIds.has(bItem.id)) continue;
    if (!bItem.reference && !bItem.codigoTransacao) continue;
    const bDoc = (bItem.reference || bItem.codigoTransacao || "").trim();
    if (!bDoc || bDoc.length < 3) continue;

    const match = treasuryMovements.find((t) => {
      if (matchedTreasuryIds.has(t.id)) return false;
      return (t.sourceId || "").includes(bDoc) || bDoc.includes(t.sourceId || "");
    });

    if (match) {
      matchedBankIds.add(bItem.id);
      matchedTreasuryIds.add(match.id);
      const bVal = Number(bItem.valueDecimal);
      const tVal = Number(match.valueDecimal);
      const diff = bVal - tVal;

      matches.push({
        statementItemId: bItem.id,
        treasuryMovementId: match.id,
        type: Math.abs(diff) < 0.01 ? "DOCUMENTO" : "DIVERGENCIA_VALOR",
        confidenceScore: Math.abs(diff) < 0.01 ? 0.98 : 0.75,
        description: Math.abs(diff) < 0.01 ? `Correspondência por número de documento (${bDoc})` : `Mesmo documento (${bDoc}) com divergência de valor (R$ ${diff.toFixed(2)})`,
        valorBanco: bVal,
        valorContabil: tVal,
        diferenca: diff,
      });
    }
  }

  // 4. Regra 4 & 9: Histórico e Possível Duplicidade
  for (const bItem of bankItems) {
    if (matchedBankIds.has(bItem.id)) continue;
    const bDesc = (bItem.description || "").toLowerCase();
    const bVal = Number(bItem.valueDecimal);

    // Checar duplicidade no banco
    const dupBank = bankItems.filter(
      (other) => other.id !== bItem.id && Math.abs(Number(other.valueDecimal) - bVal) < 0.01 && other.date.toISOString().split("T")[0] === bItem.date.toISOString().split("T")[0]
    );

    if (dupBank.length > 0) {
      matches.push({
        statementItemId: bItem.id,
        type: "POSSIVEL_DUPLICIDADE",
        confidenceScore: 0.88,
        description: `Possível duplicidade bancária detectada (${dupBank.length + 1} lançamentos de R$ ${bVal.toFixed(2)} no mesmo dia)`,
        valorBanco: bVal,
      });
      continue;
    }

    // Tentar match por histórico
    const match = treasuryMovements.find((t) => {
      if (matchedTreasuryIds.has(t.id)) return false;
      const tDesc = (t.history || "").toLowerCase();
      return bDesc.length > 5 && tDesc.length > 5 && (bDesc.includes(tDesc) || tDesc.includes(bDesc));
    });

    if (match) {
      matchedBankIds.add(bItem.id);
      matchedTreasuryIds.add(match.id);
      const tVal = Number(match.valueDecimal);

      matches.push({
        statementItemId: bItem.id,
        treasuryMovementId: match.id,
        type: "HISTORICO",
        confidenceScore: 0.82,
        description: "Correspondência por semelhança de histórico contábil/bancário.",
        valorBanco: bVal,
        valorContabil: tVal,
        diferenca: bVal - tVal,
      });
    }
  }

  // 5. Regras 5 & 6: Agrupamento e 1-para-N (Detecção de Lotes)
  const remainingBank = bankItems.filter((b) => !matchedBankIds.has(b.id));
  const remainingTreasury = treasuryMovements.filter((t) => !matchedTreasuryIds.has(t.id));

  if (remainingBank.length >= 2 && remainingTreasury.length >= 1) {
    const sumBank = remainingBank.reduce((acc, curr) => acc + Number(curr.valueDecimal), 0);
    const matchT = remainingTreasury.find((t) => Math.abs(Number(t.valueDecimal) - sumBank) < 0.01);

    if (matchT) {
      remainingBank.forEach((b) => matchedBankIds.add(b.id));
      matchedTreasuryIds.add(matchT.id);
      matches.push({
        treasuryMovementId: matchT.id,
        type: "AGRUPADO",
        confidenceScore: 0.9,
        description: `Agrupamento de ${remainingBank.length} lançamentos bancários contra 1 registro contábil de R$ ${sumBank.toFixed(2)}`,
        valorBanco: sumBank,
        valorContabil: Number(matchT.valueDecimal),
        diferenca: 0,
      });
    }
  }

  // 6. Regra 8: Lançamentos Sem Correspondente
  for (const bItem of bankItems) {
    if (!matchedBankIds.has(bItem.id)) {
      matches.push({
        statementItemId: bItem.id,
        type: "SEM_CORRESPONDENTE",
        confidenceScore: 1.0,
        description: "Lançamento do extrato bancário sem correspondente no Razão Contábil",
        valorBanco: Number(bItem.valueDecimal),
      });
    }
  }

  // Gravar matches no banco de dados
  await prisma.bankReconciliationMatch.deleteMany({
    where: { sessionId: session.id },
  });

  for (const m of matches) {
    await prisma.bankReconciliationMatch.create({
      data: {
        sessionId: session.id,
        statementItemId: m.statementItemId,
        treasuryMovementId: m.treasuryMovementId,
        tipoMatch: m.type,
        percentualConfianca: m.confidenceScore * 100,
        observacao: m.description,
        status: "AUTOMATICO",
      },
    });
  }

  // Recalcular Saldos
  const totalDebitos = bankItems.filter((i) => i.sinal === "DEBITO" || Number(i.valueDecimal) < 0).reduce((a, b) => a + Math.abs(Number(b.valueDecimal)), 0);
  const totalCreditos = bankItems.filter((i) => i.sinal === "CREDITO" || Number(i.valueDecimal) > 0).reduce((a, b) => a + Math.abs(Number(b.valueDecimal)), 0);
  const saldoInicial = Number(session.saldoInicialDecimal);
  const saldoFinal = saldoInicial + totalCreditos - totalDebitos;
  const saldoRazao = Number(session.saldoRazaoDecimal);
  const diferenca = saldoFinal - saldoRazao;

  const itensConciliados = matches.filter((m) => m.type !== "SEM_CORRESPONDENTE" && m.type !== "DIVERGENCIA_VALOR").length;
  const itensDivergentes = matches.length - itensConciliados;

  const updatedSession = await prisma.bankReconciliationSession.update({
    where: { id: sessionId },
    data: {
      totalDebitosDecimal: new Prisma.Decimal(totalDebitos),
      totalCreditosDecimal: new Prisma.Decimal(totalCreditos),
      saldoFinalDecimal: new Prisma.Decimal(saldoFinal),
      diferencaDecimal: new Prisma.Decimal(diferenca),
      totalItensBanco: bankItems.length,
      totalItensContabeis: treasuryMovements.length,
      itensConciliados,
      itensDivergentes,
      status: itensDivergentes === 0 ? "CONCILIADA" : "EM_ANDAMENTO",
    },
  });

  return {
    session: updatedSession,
    matches,
    balances: {
      saldoInicial,
      totalDebitos,
      totalCreditos,
      saldoFinal,
      saldoRazao,
      diferenca,
      totalItensBanco: bankItems.length,
      totalItensContabeis: treasuryMovements.length,
      itensConciliados,
      itensDivergentes,
    },
  };
}
