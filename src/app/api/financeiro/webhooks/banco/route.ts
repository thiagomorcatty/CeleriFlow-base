import { NextResponse } from "next/server";
import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { Prisma } from "@prisma/client";

/**
 * Webhook para recepção de notificações de repasses e receitas externas enviadas pelo Simulador Bancário
 */
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const secretKey = process.env.SIMULADOR_WEBHOOK_SECRET || "celeriflow-simulador-secret";

    if (authHeader !== `Bearer ${secretKey}`) {
      return NextResponse.json({ error: "Não autorizado: Token de Webhook inválido." }, { status: 401 });
    }

    const payload = await req.json();

    const {
      siglaReceita,
      nomeReceita,
      valor,
      banco,
      agencia,
      contaNumero,
      autenticacaoBancaria,
      dataCredito,
    } = payload;

    if (!siglaReceita || !valor || !contaNumero) {
      return NextResponse.json({ error: "Payload do webhook incompleto." }, { status: 400 });
    }

    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const { prisma } = context;

    // Inserir diretamente no extrato como receita pendente de homologação
    const item = await prisma.bankStatementItem.create({
      data: {
        banco: banco || "001 - Banco do Brasil",
        agencia: agencia || "0001",
        contaNumero,
        tipoConta: "CORRENTE",
        date: dataCredito ? new Date(dataCredito) : new Date(),
        description: `${siglaReceita} - ${nomeReceita || "REPASSE EXTERNO CONSTITUCIONAL"}`,
        reference: autenticacaoBancaria || `WH-${Date.now()}`,
        codigoTransacao: `WH-${siglaReceita}-${Date.now()}`,
        sinal: "CREDITO",
        direction: "CREDIT",
        valueDecimal: new Prisma.Decimal(valor),
        status: "Pendente",
        categoriaClassificada: "RECEITA_CONSTITUCIONAL",
      },
    });

    // Registrar no Log de Auditoria
    await prisma.financialAuditLog.create({
      data: {
        action: "WEBHOOK_RECEITA_EXTERNA_RECEBIDA",
        entityType: "BankStatementItem",
        entityId: item.id,
        authorUsuarioId: "SYSTEM_WEBHOOK",
        payload: {
          siglaReceita,
          valor,
          autenticacaoBancaria,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Receita ${siglaReceita} no valor de R$ ${valor} registrada via Webhook com sucesso.`,
      statementItemId: item.id,
    });
  } catch (err: any) {
    console.error("[Webhook Banco Error]", err);
    return NextResponse.json({ error: err?.message || "Erro ao processar webhook bancário." }, { status: 500 });
  }
}
