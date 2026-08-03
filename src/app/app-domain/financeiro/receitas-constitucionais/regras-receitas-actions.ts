"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";

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
          textoProcurado: "ROYALTIES",
          tipoReceita: "Royalties do Petróleo",
          naturezaReceita: "1.7.1.8.02.1.1.00.00 - Cota-Parte do Fundo Especial do Petróleo (FEP)",
          fonteRecurso: "15300000 - Royalties e Compensações Financeiras",
          eventoContabil: "10.01.06 - Arrecadação de Royalties",
          deducaoAplicavel: false,
          prioridade: 6,
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
          prioridade: 7,
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
