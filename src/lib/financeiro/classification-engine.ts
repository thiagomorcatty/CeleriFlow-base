import { PrismaClient, Prisma } from "@prisma/client";
import crypto from "crypto";

export type ClassificationType =
  | "APLICACAO"
  | "RESGATE"
  | "TRANSFERENCIA_PARA_APLICACAO"
  | "TRANSFERENCIA_DA_APLICACAO"
  | "DEBITO"
  | "CREDITO"
  | "ESTORNO";

export interface ClassificationResult {
  ruleMatchedId?: string;
  category: ClassificationType;
  confidenceScore: number;
  reason: string;
  calculatedValues: {
    valorBruto: number;
    valorLiquido: number;
    encargosOuTaxas: number;
  };
  accountingPreview: {
    debitoConta: string;
    creditoConta: string;
    historicoPadrao: string;
    naturezaOperacao: string;
    fonteRecurso?: string;
    eventoContabil: string;
  };
}

export interface MunicipalIntegrationReceipt {
  reciboId: string;
  numeroLancamento: string;
  dataProcessamento: string;
  hashIntegracao: string;
  status: "PROCESSADO" | "REJEITADO";
  mensagem: string;
  contaCeleriFlow: {
    banco: string;
    agencia: string;
    numero: string;
  };
}

/**
 * Avalia um lançamento bancário contra as regras cadastradas ou padrões bancários configurados
 */
export async function classifyBankMovement(
  prisma: PrismaClient,
  item: {
    descricao: string;
    codigoTransacao?: string | null;
    sinal: "CREDITO" | "DEBITO";
    valor: number;
    banco?: string | null;
    contaNumero?: string | null;
    documento?: string | null;
  }
): Promise<ClassificationResult> {
  const descricaoUpper = (item.descricao || "").toUpperCase();
  const codTrans = (item.codigoTransacao || "").toUpperCase();

  // 1. Buscar regras ativas no banco de dados ordenadas por prioridade asc
  const rules = await prisma.classificationRule.findMany({
    where: { ativo: true },
    orderBy: { prioridade: "asc" },
  });

  for (const rule of rules) {
    let matchesText = false;
    if (rule.textoProcurado && rule.textoProcurado.trim() !== "") {
      const pattern = rule.textoProcurado.toUpperCase();
      matchesText = descricaoUpper.includes(pattern);
    } else {
      matchesText = true;
    }

    let matchesCode = true;
    if (rule.codigoTransacao && rule.codigoTransacao.trim() !== "") {
      matchesCode = codTrans === rule.codigoTransacao.toUpperCase();
    }

    let matchesSinal = true;
    if (rule.sinalEsperado && rule.sinalEsperado !== "AMBOS") {
      matchesSinal = item.sinal === rule.sinalEsperado;
    }

    if (matchesText && matchesCode && matchesSinal) {
      const category = (rule.tipoMovimento as ClassificationType) || "CREDITO";
      return buildResult(category, item.valor, `Regra id ${rule.id} (${rule.textoProcurado})`, rule.id);
    }
  }

  // 2. Fallbacks com Heurística / Palavras-chave do Edital
  if (descricaoUpper.includes("ESTORNO") || descricaoUpper.includes("EST ")) {
    return buildResult("ESTORNO", item.valor, "Identificado por padrão de Estorno em histórico");
  }

  if (descricaoUpper.includes("APL") || descricaoUpper.includes("APLIC") || descricaoUpper.includes("APLICACAO")) {
    return buildResult("APLICACAO", item.valor, "Identificado por padrão de Aplicação Financeira");
  }

  if (descricaoUpper.includes("RESG") || descricaoUpper.includes("RESGATE") || descricaoUpper.includes("RESG APLIC")) {
    return buildResult("RESGATE", item.valor, "Identificado por padrão de Resgate de Aplicação");
  }

  if (descricaoUpper.includes("TRANSF APLIC") || descricaoUpper.includes("TR APLIC")) {
    return buildResult("TRANSFERENCIA_PARA_APLICACAO", item.valor, "Identificado por Transferência para Aplicação");
  }

  if (descricaoUpper.includes("TRANSF RESG") || descricaoUpper.includes("TR RESG")) {
    return buildResult("TRANSFERENCIA_DA_APLICACAO", item.valor, "Identificado por Transferência da Aplicação");
  }

  if (item.sinal === "DEBITO") {
    return buildResult("DEBITO", item.valor, "Débito bancário sem regra específica");
  }

  return buildResult("CREDITO", item.valor, "Crédito bancário sem regra específica");
}

function buildResult(category: ClassificationType, valor: number, reason: string, ruleId?: string): ClassificationResult {
  let debito = "1.1.1.1.1.00.00";
  let credito = "1.1.1.1.2.00.00";
  let evento = "30.01.01";
  let nat = "Operação Financeira";

  switch (category) {
    case "APLICACAO":
    case "TRANSFERENCIA_PARA_APLICACAO":
      debito = "1.1.1.2.1.00.00 - Aplicações Financeiras de Curto Prazo";
      credito = "1.1.1.1.1.00.00 - Conta Corrente Bancária";
      evento = "50.01.01 - Aplicação em Titulos/Fundos";
      nat = "Aplicação Financeira Orçamentária/Patrimonial";
      break;
    case "RESGATE":
    case "TRANSFERENCIA_DA_APLICACAO":
      debito = "1.1.1.1.1.00.00 - Conta Corrente Bancária";
      credito = "1.1.1.2.1.00.00 - Aplicações Financeiras de Curto Prazo";
      evento = "50.01.02 - Resgate de Aplicação Financeira";
      nat = "Resgate Financeiro Orçamentário/Patrimonial";
      break;
    case "ESTORNO":
      debito = "1.1.1.1.1.00.00 - Conta Corrente Bancária";
      credito = "5.9.9.9.9.00.00 - Ajustes de Exercícios Anteriores / Estornos";
      evento = "90.01.01 - Estorno de Lançamento Bancário";
      nat = "Estorno Financeiro";
      break;
    case "DEBITO":
      debito = "3.3.9.0.39.00.00 - Outros Serviços de Terceiros / Tarifas";
      credito = "1.1.1.1.1.00.00 - Conta Corrente Bancária";
      evento = "40.01.01 - Tarifa e Débito Bancário";
      nat = "Despesa Bancária / Movimento de Saída";
      break;
    case "CREDITO":
    default:
      debito = "1.1.1.1.1.00.00 - Conta Corrente Bancária";
      credito = "4.1.1.1.1.00.00 - Receita a Classificar / Arrecadação";
      evento = "10.01.01 - Arrecadação de Receita";
      nat = "Crédito Financeiro";
      break;
  }

  return {
    ruleMatchedId: ruleId,
    category,
    confidenceScore: ruleId ? 0.98 : 0.82,
    reason,
    calculatedValues: {
      valorBruto: valor,
      valorLiquido: valor,
      encargosOuTaxas: 0,
    },
    accountingPreview: {
      debitoConta: debito,
      creditoConta: credito,
      historicoPadrao: `Lançamento referente a ${category.toLowerCase().replace(/_/g, " ")}`,
      naturezaOperacao: nat,
      fonteRecurso: "15000000 - Recursos Não Vinculados de Impostos",
      eventoContabil: evento,
    },
  };
}

/**
 * Persiste o movimento classificado no CeleriFlow e gera o recibo com número de lançamento.
 */
export async function sendMovementToMunicipalSystem(
  prisma: PrismaClient,
  data: {
    statementItemId?: string;
    banco: string;
    contaNumero: string;
    categoria: ClassificationType;
    valor: number;
    dataMovimento: Date;
    descricao: string;
    usuarioId: string;
  }
): Promise<MunicipalIntegrationReceipt> {
  if (!data.statementItemId) {
    throw new Error("A transmissão exige um lançamento de extrato bancário identificado.");
  }

  const result = await prisma.$transaction(async (tx) => {
    const item = await tx.bankStatementItem.findUnique({ where: { id: data.statementItemId } });
    if (!item) throw new Error("Lançamento bancário não encontrado.");
    if (item.treasuryMovementId) {
      const existing = await tx.treasuryMovement.findUnique({
        where: { id: item.treasuryMovementId },
        include: { bankAccount: { select: { bankName: true, agency: true, accountNumber: true } } },
      });
      if (!existing) throw new Error("O lançamento bancário possui um vínculo financeiro inválido.");
      return { movement: existing, auditId: item.lancamentoContabilId, account: existing.bankAccount };
    }

    const account = await tx.bankAccount.findFirst({
      where: {
        bankName: item.banco || data.banco,
        agency: item.agencia || undefined,
        accountNumber: item.contaNumero || data.contaNumero,
        isActive: true,
      },
      select: { id: true, bankName: true, agency: true, accountNumber: true },
    });
    if (!account) throw new Error("A conta bancária do extrato não está cadastrada ou ativa na tesouraria.");

    const year = await tx.financialYear.findUnique({ where: { year: item.date.getUTCFullYear() }, select: { id: true } });
    if (!year) throw new Error("Não existe exercício financeiro aberto para a data do lançamento.");

    const idempotencyKey = `BANK:STATEMENT:${item.id}:${data.categoria}`;
    const movement = await tx.treasuryMovement.upsert({
      where: { idempotencyKey },
      create: {
        date: item.date,
        type: movementType(data.categoria),
        direction: movementDirection(data.categoria, item.sinal),
        valueDecimal: new Prisma.Decimal(data.valor),
        history: data.descricao.trim(),
        bankAccountId: account.id,
        financialYearId: year.id,
        sourceModule: "FINANCEIRO",
        sourceType: "BANK_STATEMENT",
        sourceId: item.id,
        eventType: data.categoria,
        idempotencyKey,
      },
      update: {},
    });

    const reciboId = `REC-MUNI-${movement.id}`;
    const numeroLancamento = `LANC-MUN-${movement.id.slice(-8).toUpperCase()}`;
    const hashIntegracao = crypto.createHash("sha256").update(`${movement.id}:${item.id}:${data.categoria}`).digest("hex");
    const audit = await tx.financialAuditLog.create({
      data: {
        action: "LANCAMENTO_MUNICIPAL_CLASSIFICADO",
        entityType: "TreasuryMovement",
        entityId: movement.id,
        authorUsuarioId: data.usuarioId,
        payload: { reciboId, numeroLancamento, categoria: data.categoria, valor: data.valor, hashIntegracao, statementItemId: item.id },
      },
    });

    await tx.bankStatementItem.update({
      where: { id: item.id },
      data: {
        treasuryMovementId: movement.id,
        status: "Processado",
        reciboMunicipal: reciboId,
        lancamentoContabilId: audit.id,
        categoriaClassificada: data.categoria,
      },
    });
    return { movement, auditId: audit.id, account };
  });

  const reciboId = `REC-MUNI-${result.movement.id}`;
  const numeroLancamento = `LANC-MUN-${result.movement.id.slice(-8).toUpperCase()}`;
  const hashIntegracao = crypto.createHash("sha256").update(`${result.movement.id}:${data.statementItemId}:${data.categoria}`).digest("hex");
  return {
    reciboId,
    numeroLancamento,
    dataProcessamento: result.movement.createdAt.toISOString(),
    hashIntegracao,
    status: "PROCESSADO",
    mensagem: "Lançamento registrado na tesouraria municipal com vínculo ao extrato bancário.",
    contaCeleriFlow: {
      banco: result.account.bankName,
      agencia: result.account.agency,
      numero: result.account.accountNumber,
    },
  };
}

function movementType(category: ClassificationType) {
  if (category === "APLICACAO" || category === "TRANSFERENCIA_PARA_APLICACAO") return "InvestmentApplication";
  if (category === "RESGATE" || category === "TRANSFERENCIA_DA_APLICACAO") return "InvestmentRedemption";
  if (category === "ESTORNO") return "BankReversal";
  return category === "DEBITO" ? "BankDebit" : "BankCredit";
}

function movementDirection(category: ClassificationType, signal: string | null) {
  if (category === "APLICACAO" || category === "TRANSFERENCIA_PARA_APLICACAO" || category === "DEBITO") return "Saída";
  if (category === "RESGATE" || category === "TRANSFERENCIA_DA_APLICACAO" || category === "CREDITO") return "Entrada";
  return signal === "DEBITO" ? "Saída" : "Entrada";
}
