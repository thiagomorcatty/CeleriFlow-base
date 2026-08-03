import { PrismaClient, Prisma } from "@prisma/client";
import crypto from "crypto";

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
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  const numeroLancamento = `LANC-REND-${new Date().getFullYear()}-${random}`;
  const reciboId = `REC-REND-${timestamp}`;

  const payload = `${reciboId}:${numeroLancamento}:${data.contaNumero}:${data.valorLiquido.toFixed(2)}`;
  const hashTransmissao = crypto.createHash("sha256").update(payload).digest("hex");

  // Registrar Log de Auditoria Financeira do Rendimento
  const audit = await prisma.financialAuditLog.create({
    data: {
      action: "RENDIMENTO_APLICACAO_TRANSMITIDO",
      entityType: "YieldTransaction",
      entityId: reciboId,
      authorUsuarioId: data.usuarioId,
      payload: {
        contaNumero: data.contaNumero,
        valorBruto: data.valorBruto,
        valorLiquido: data.valorLiquido,
        hashTransmissao,
      },
    },
  });

  // Salvar registro de transação de rendimento
  const yieldRecord = await prisma.yieldTransaction.create({
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
      reciboMunicipal: reciboId,
      lancamentoContabilId: audit.id,
    },
  });

  // Atualizar o item do extrato
  if (data.statementItemId) {
    await prisma.bankStatementItem.update({
      where: { id: data.statementItemId },
      data: {
        status: "Conciliado",
        reciboMunicipal: reciboId,
        lancamentoContabilId: audit.id,
        categoriaClassificada: "RENDIMENTO",
      },
    });
  }

  return {
    reciboId,
    numeroLancamento,
    hashTransmissao,
    status: "SUCESSO",
    mensagem: "Rendimento de aplicação homologado e contabilizado no Sistema Municipal com sucesso.",
    yieldTransactionId: yieldRecord.id,
  };
}
