"use server";

import { importBankStatementCsv, matchBankStatementItemToTreasuryMovement } from "@/lib/financeiro";
import { getTenantContextForModuleEdit, isSystemAdministrator } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionResult = { error?: string };

const MAX_CSV_BYTES = 2 * 1024 * 1024;
const importSchema = z.object({
  bankAccountId: z.string().trim().min(1, "Selecione uma conta bancária."),
  content: z.string().min(1, "Selecione um arquivo CSV."),
  fileName: z.string().trim().max(255, "O nome do arquivo é muito longo.").optional(),
});
const matchSchema = z.object({
  statementItemId: z.string().trim().min(1, "Selecione um item de extrato."),
  treasuryMovementId: z.string().trim().min(1, "Selecione um movimento de tesouraria."),
});

function actorFor(context: Awaited<ReturnType<typeof getTenantContextForModuleEdit>>) {
  return {
    usuarioId: context.user.id,
    employeeId: context.user.employeeId,
    allowedBudgetUnitIds: isSystemAdministrator(context.user) ? undefined : context.user.allowedBudgetUnitIds,
  };
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Não foi possível concluir a conciliação bancária.";
}

export async function importBankStatementCsvAction(data: { bankAccountId: string; content: string; fileName?: string }): Promise<ActionResult> {
  const parsed = importSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados de importação inválidos." };
  if (Buffer.byteLength(parsed.data.content, "utf8") > MAX_CSV_BYTES) {
    return { error: "O arquivo CSV deve ter no máximo 2 MB." };
  }
  if (parsed.data.fileName && !parsed.data.fileName.toLowerCase().endsWith(".csv")) {
    return { error: "Envie um arquivo no formato CSV." };
  }

  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await importBankStatementCsv(context.prisma, actorFor(context), {
      ...parsed.data,
      fileName: parsed.data.fileName?.replace(/[\\/:]/g, "_") || undefined,
    });
    revalidatePath("/financeiro/conciliacao-bancaria");
    return {};
  } catch (error) {
    return { error: errorMessage(error) };
  }
}

export async function matchBankStatementItemAction(data: { statementItemId: string; treasuryMovementId: string }): Promise<ActionResult> {
  const parsed = matchSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados de conciliação inválidos." };

  try {
    const context = await getTenantContextForModuleEdit("FINANCEIRO");
    await matchBankStatementItemToTreasuryMovement(context.prisma, actorFor(context), parsed.data);
    revalidatePath("/financeiro/conciliacao-bancaria");
    return {};
  } catch (error) {
    return { error: errorMessage(error) };
  }
}
