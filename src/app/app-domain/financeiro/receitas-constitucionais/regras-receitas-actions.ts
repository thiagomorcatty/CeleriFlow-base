"use server";

import { getTenantContextForModuleEdit, isSystemAdministrator } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { recordConfirmedRevenue, type FinanceActor } from "@/lib/financeiro";

type ActionResult<T = any> = { error?: string; data?: T };

const ruleSchema = z.object({
  textoProcurado: z.string().min(1, "Informe o texto procurado."),
  bancoContaFiltro: z.string().optional(),
  tipoReceita: z.string().min(1, "Informe o tipo de receita."),
  naturezaReceita: z.string().min(1, "Informe a natureza da receita."),
  fonteRecurso: z.string().min(1, "Informe a fonte de recurso."),
  eventoContabil: z.string().min(1, "Informe o evento contábil."),
  deducaoAplicavel: z.boolean().default(false),
  prioridade: z.number().int().default(10),
  exigeConfirmacao: z.boolean().default(false),
});

/**
 * Garante o pré-cadastro das receitas e regras de transferência constitucional exigidas pela POC
 */
export async function seedConstitutionalRulesAction(): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const { prisma } = context;

    const count = await prisma.classificationRule.count({
      where: { tipoMovimento: "RECEITA_CONSTITUCIONAL" },
    });

    if (count === 0) {
      const defaultRules = [
        {
          textoProcurado: "FPM",
          tipoReceita: "FPM",
          naturezaReceita: "1.7.1.8.01.2.1.00.00 - Cota-Parte do FPM",
          fonteRecurso: "15000000 - Recursos Não Vinculados de Impostos",
          eventoContabil: "10.01.01 - Arrecadação de FPM",
          deducaoAplicavel: true,
          prioridade: 1,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
          bancoContaFiltro: "Conta Transferências STN",
        },
        {
          textoProcurado: "ICMS",
          tipoReceita: "ICMS",
          naturezaReceita: "1.7.2.8.01.1.1.00.00 - Cota-Parte do ICMS",
          fonteRecurso: "15000000 - Recursos Não Vinculados de Impostos",
          eventoContabil: "10.01.02 - Arrecadação de Cota-Parte ICMS",
          deducaoAplicavel: true,
          prioridade: 2,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
          bancoContaFiltro: "Conta Transferências Estado",
        },
        {
          textoProcurado: "FUNDEB",
          tipoReceita: "Fundeb",
          naturezaReceita: "1.7.1.8.06.1.1.00.00 - Transferências do FUNDEB",
          fonteRecurso: "15400000 - Transferências do FUNDEB - Impostos",
          eventoContabil: "10.01.05 - Arrecadação de Receita do FUNDEB",
          deducaoAplicavel: false,
          prioridade: 3,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
          bancoContaFiltro: "Conta Específica FUNDEB",
        },
        {
          textoProcurado: "IPVA",
          tipoReceita: "IPVA",
          naturezaReceita: "1.7.2.8.01.2.1.00.00 - Cota-Parte do IPVA",
          fonteRecurso: "15000000 - Recursos Não Vinculados de Impostos",
          eventoContabil: "10.01.03 - Arrecadação de IPVA",
          deducaoAplicavel: true,
          prioridade: 4,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
          bancoContaFiltro: "Conta Arrecadação Estadual",
        },
        {
          textoProcurado: "ITR",
          tipoReceita: "ITR",
          naturezaReceita: "1.7.1.8.01.5.1.00.00 - Cota-Parte do ITR",
          fonteRecurso: "15000000 - Recursos Não Vinculados",
          eventoContabil: "10.01.04 - Arrecadação de ITR",
          deducaoAplicavel: true,
          prioridade: 5,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
        },
        {
          textoProcurado: "FEP",
          tipoReceita: "FEP",
          naturezaReceita: "1.7.1.8.02.1.1.00.00 - Fundo Especial do Petróleo",
          fonteRecurso: "15300000 - Royalties e Compensações Financeiras",
          eventoContabil: "10.01.06 - Arrecadação FEP",
          deducaoAplicavel: false,
          prioridade: 6,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
        },
        {
          textoProcurado: "ICS",
          tipoReceita: "ICS",
          naturezaReceita: "1.7.1.8.03.1.1.00.00 - Transferências da Saúde (ICS)",
          fonteRecurso: "16000000 - Transferências Fundo a Fundo Saúde",
          eventoContabil: "10.01.08 - Arrecadação ICS Saúde",
          deducaoAplicavel: false,
          prioridade: 7,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
        },
        {
          textoProcurado: "IPM",
          tipoReceita: "IPM",
          naturezaReceita: "1.7.2.8.01.1.1.00.00 - Índice de Participação dos Municípios",
          fonteRecurso: "15000000 - Recursos Não Vinculados de Impostos",
          eventoContabil: "10.01.09 - Arrecadação IPM",
          deducaoAplicavel: true,
          prioridade: 8,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
        },
        {
          textoProcurado: "RPM",
          tipoReceita: "RPM",
          naturezaReceita: "1.3.9.0.00.0.0.00.00 - Receita Patrimonial Municipal",
          fonteRecurso: "15000000 - Recursos Próprios",
          eventoContabil: "10.01.10 - Arrecadação RPM",
          deducaoAplicavel: false,
          prioridade: 9,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
        },
        {
          textoProcurado: "ADO25",
          tipoReceita: "ADO25",
          naturezaReceita: "1.7.1.8.01.9.1.00.00 - Compensação Financeira ADO 25 / LC 176",
          fonteRecurso: "15000000 - Recursos Não Vinculados",
          eventoContabil: "10.01.07 - Transferência ADO 25",
          deducaoAplicavel: true,
          prioridade: 10,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
        },
        {
          textoProcurado: "ADO LC 176",
          tipoReceita: "ADO — LC nº 176/2020",
          naturezaReceita: "1.7.1.8.01.9.1.00.00 - Compensação Lei Kandir LC 176/2020",
          fonteRecurso: "15000000 - Recursos Não Vinculados",
          eventoContabil: "10.01.07 - Transferência LC 176",
          deducaoAplicavel: true,
          prioridade: 11,
          exigeConfirmacao: false,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
        },
      ];

      await prisma.classificationRule.createMany({
        data: defaultRules,
      });

      // Inserir itens de teste na Fila de Exceções para demonstração na POC
      const existingExceptions = await prisma.exceptionQueueItem.count();
      if (existingExceptions === 0) {
        await prisma.exceptionQueueItem.createMany({
          data: [
            {
              descricao: "STN TR COMPENSA-MUN LC 176 ADO-2020 V1",
              valorDecimal: new Prisma.Decimal(42500.0),
              dataMovimento: new Date(),
              banco: "001 - Banco do Brasil",
              contaNumero: "98765-4",
              sinal: "CREDITO",
              scoreConfianca: 0.65,
              sugestaoTipo: "ADO — LC nº 176/2020",
              motivoExcecao: "Descrição contém sufixo variante V1 não coberto por correspondência exata.",
              status: "PENDENTE",
            },
            {
              descricao: "COT PARTE ROYALTIES ANP D-2026/08",
              valorDecimal: new Prisma.Decimal(89400.0),
              dataMovimento: new Date(),
              banco: "104 - Caixa Econômica",
              contaNumero: "12345-6",
              sinal: "CREDITO",
              scoreConfianca: 0.58,
              sugestaoTipo: "Royalties do Petróleo",
              motivoExcecao: "Sigla 'ANP' necessita confirmação de prioridade e deducao.",
              status: "PENDENTE",
            },
          ],
        });
      }
    }

    revalidatePath("/financeiro/receitas-constitucionais");
    return { data: { count } };
  } catch (err: any) {
    return { error: err?.message || "Erro ao gerar regras pré-cadastradas." };
  }
}

export async function getConstitutionalRulesAction(): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const rules = await context.prisma.classificationRule.findMany({
      where: { tipoMovimento: "RECEITA_CONSTITUCIONAL" },
      orderBy: { prioridade: "asc" },
    });
    return { data: rules };
  } catch (err: any) {
    return { error: err?.message || "Erro ao buscar regras de receita." };
  }
}

export async function getExceptionQueueAction(): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const items = await context.prisma.exceptionQueueItem.findMany({
      where: { status: "PENDENTE" },
      orderBy: { createdAt: "desc" },
    });
    return { data: items };
  } catch (err: any) {
    return { error: err?.message || "Erro ao buscar fila de exceções." };
  }
}

export async function createRuleAction(data: z.infer<typeof ruleSchema>): Promise<ActionResult> {
  const parsed = ruleSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const newRule = await context.prisma.classificationRule.create({
      data: {
        ...parsed.data,
        tipoMovimento: "RECEITA_CONSTITUCIONAL",
      },
    });

    revalidatePath("/financeiro/receitas-constitucionais");
    return { data: newRule };
  } catch (err: any) {
    return { error: err?.message || "Erro ao criar regra de receita." };
  }
}

export async function resolveExceptionAction(exceptionId: string, ruleText?: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const { prisma, user } = context;

    const exceptionItem = await prisma.exceptionQueueItem.findUnique({
      where: { id: exceptionId },
    });

    if (!exceptionItem) return { error: "Item da fila de exceção não encontrado." };

    // Se fornecido texto para nova regra, cria a regra no banco
    let newRuleId: string | undefined = undefined;
    if (ruleText && ruleText.trim() !== "") {
      const newRule = await prisma.classificationRule.create({
        data: {
          textoProcurado: ruleText.trim(),
          tipoReceita: exceptionItem.sugestaoTipo || "Receita Municipal",
          naturezaReceita: "1.7.1.8.00.0.0.00.00 - Transferência Legal",
          fonteRecurso: "15000000 - Recursos Não Vinculados",
          eventoContabil: "10.01.00 - Arrecadação",
          deducaoAplicavel: true,
          prioridade: 10,
          tipoMovimento: "RECEITA_CONSTITUCIONAL",
        },
      });
      newRuleId = newRule.id;
    }

    await prisma.exceptionQueueItem.update({
      where: { id: exceptionId },
      data: {
        status: "RESOLVIDO",
        resolvidoPor: user.email || user.id,
        resolvidoEm: new Date(),
        regraGeradaId: newRuleId,
      },
    });

    revalidatePath("/financeiro/receitas-constitucionais");
    return { data: { success: true } };
  } catch (err: any) {
    return { error: err?.message || "Erro ao resolver exceção." };
  }
}

export async function processConstitutionalRevenueAction(statementItemId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    const result = await context.prisma.$transaction(async (tx) => {
      const item = await tx.bankStatementItem.findUnique({ where: { id: statementItemId } });
      if (!item) throw new Error("Lançamento bancário não encontrado.");
      if (item.treasuryMovementId) return { treasuryMovementId: item.treasuryMovementId, alreadyProcessed: true };
      if (item.sinal !== "CREDITO") throw new Error("Apenas créditos bancários podem ser tratados como receitas constitucionais.");

      const account = await tx.bankAccount.findFirst({
        where: {
          bankName: item.banco || undefined,
          agency: item.agencia || undefined,
          accountNumber: item.contaNumero || undefined,
          isActive: true,
        },
        select: { id: true, budgetUnitId: true, resourceSourceId: true },
      });
      if (!account?.resourceSourceId) throw new Error("A conta de recebimento deve estar ativa e vinculada a uma fonte de recurso.");
      if (!isSystemAdministrator(context.user) && (!account.budgetUnitId || !context.user.allowedBudgetUnitIds.includes(account.budgetUnitId))) {
        throw new Error("Sem permissão para processar receita desta Unidade Gestora.");
      }

      const rules = await tx.classificationRule.findMany({
        where: { ativo: true, tipoMovimento: "RECEITA_CONSTITUCIONAL" },
        orderBy: { prioridade: "asc" },
      });
      const description = (item.description || "").toUpperCase();
      const rule = rules.find((candidate) => description.includes(candidate.textoProcurado.toUpperCase()));
      if (!rule?.naturezaReceita || !rule.fonteRecurso) throw new Error("Não há regra constitucional completa para este lançamento.");

      const natureCode = rule.naturezaReceita.match(/^\d[\d.]+/)?.[0];
      const sourceCode = rule.fonteRecurso.match(/^\d+/)?.[0];
      if (!natureCode || !sourceCode) throw new Error("A regra constitucional possui natureza ou fonte inválida.");
      const [nature, source] = await Promise.all([
        tx.revenueNature.findUnique({ where: { code: natureCode }, select: { id: true } }),
        tx.resourceSource.findUnique({ where: { code: sourceCode }, select: { id: true } }),
      ]);
      if (!nature || !source) throw new Error("Cadastre a natureza e a fonte informadas na regra antes de processar a receita.");
      if (source.id !== account.resourceSourceId) throw new Error("A fonte de recurso da regra não corresponde à fonte vinculada à conta bancária.");

      const actor: FinanceActor = {
        usuarioId: context.user.id,
        employeeId: context.user.employeeId,
        allowedBudgetUnitIds: isSystemAdministrator(context.user) ? undefined : context.user.allowedBudgetUnitIds,
      };
      const idempotencyKey = `BANK:CONSTITUTIONAL:${account.id}:${item.codigoTransacao || item.id}`;
      const revenue = await recordConfirmedRevenue(tx, actor, {
        date: item.date,
        value: item.valueDecimal,
        revenueNatureId: nature.id,
        resourceSourceId: source.id,
        bankAccountId: account.id,
        history: item.description || rule.textoProcurado,
        sourceModule: "FINANCEIRO",
        sourceType: "BANK_CONSTITUTIONAL",
        sourceId: item.id,
        eventType: rule.eventoContabil || "RECEITA_CONSTITUCIONAL",
        idempotencyKey,
      });
      if (!revenue.treasuryMovement) throw new Error("A receita constitucional não gerou movimento de tesouraria.");
      await tx.bankStatementItem.update({
        where: { id: item.id },
        data: {
          treasuryMovementId: revenue.treasuryMovement.id,
          status: "Processado",
          categoriaClassificada: "RECEITA_CONSTITUCIONAL",
          reciboMunicipal: `REC-REC-${revenue.id}`,
        },
      });
      await tx.financialAuditLog.create({
        data: {
          action: "RECEITA_CONSTITUCIONAL_PROCESSADA",
          entityType: "Revenue",
          entityId: revenue.id,
          authorUsuarioId: context.user.id,
          budgetUnitId: account.budgetUnitId,
          payload: { statementItemId: item.id, ruleId: rule.id, treasuryMovementId: revenue.treasuryMovement.id, deducaoAplicavel: rule.deducaoAplicavel },
        },
      });
      return { treasuryMovementId: revenue.treasuryMovement.id, revenueId: revenue.id, alreadyProcessed: false };
    });
    revalidatePath("/financeiro/receitas-constitucionais");
    revalidatePath("/financeiro/receitas");
    return { data: result };
  } catch (err: any) {
    return { error: err?.message || "Não foi possível processar a receita constitucional." };
  }
}
