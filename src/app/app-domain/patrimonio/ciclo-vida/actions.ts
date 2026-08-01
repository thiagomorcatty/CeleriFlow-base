"use server";

import { AssetLifecycleError, depreciateAssetsForMonth, recordAssetDisposal } from "@/lib/patrimonio/asset-lifecycle";
import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string; message?: string };

function messageFor(error: unknown) {
  return error instanceof AssetLifecycleError ? error.message : "Não foi possível concluir a operação patrimonial.";
}

function parseCompetence(value: string) {
  if (!/^\d{4}-\d{2}$/.test(value)) throw new AssetLifecycleError("Informe a competência no formato AAAA-MM.");
  const date = new Date(`${value}-01T12:00:00.000Z`);
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 7) !== value) {
    throw new AssetLifecycleError("Competência de depreciação inválida.");
  }
  return date;
}

export async function runMonthlyDepreciation(competence: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("PATRIMONIO");
    const result = await depreciateAssetsForMonth(context.prisma, parseCompetence(competence));
    revalidatePath("/patrimonio/ciclo-vida");
    revalidatePath("/patrimonio/bens");
    revalidatePath("/patrimonio");
    return { message: `${result.processed} bem(ns) depreciado(s); ${result.skipped} sem lançamento.` };
  } catch (error) {
    return { error: messageFor(error) };
  }
}

export async function registerAssetDisposal(input: {
  assetId: string;
  date: string;
  type: "Baixa" | "Alienação";
  reason: string;
  justification: string;
  disposalValue: string;
}): Promise<ActionResult> {
  try {
    const date = new Date(`${input.date}T12:00:00.000Z`);
    if (!input.date || Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== input.date) {
      throw new AssetLifecycleError("Data da baixa inválida.");
    }
    const disposalValue = input.disposalValue.trim() === "" ? 0 : Number(input.disposalValue.replace(",", "."));
    const context = await getTenantContextForModuleEdit("PATRIMONIO");
    await recordAssetDisposal(context.prisma, { ...input, date, disposalValue });
    revalidatePath("/patrimonio/ciclo-vida");
    revalidatePath("/patrimonio/bens");
    revalidatePath("/patrimonio");
    return { message: "Baixa patrimonial registrada com a evidência de valor contábil." };
  } catch (error) {
    return { error: messageFor(error) };
  }
}
