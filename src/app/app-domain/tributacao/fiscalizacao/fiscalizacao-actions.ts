"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { runTaxAuditCrossCheck, issueTaxInfractionNotice, TaxAuditCrossCheckInput } from "@/lib/tributacao/inteligencia-tributaria-engine";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionResult<T = any> = { error?: string; data?: T };

const auditSchema = z.object({
  cnpjCpfContribuinte: z.string().min(1, "Informe o CNPJ/CPF."),
  razaoSocial: z.string().min(1, "Informe a Razão Social."),
  origemCruzamento: z.enum(["DEISS_BANCOS", "CARTORIO_DOI", "CARTORIO_ITBI"]).default("DEISS_BANCOS"),
  valorDeclarado: z.number().nonnegative(),
  valorApuradoBancos: z.number().nonnegative(),
});

export async function runTaxAuditAction(input: z.infer<typeof auditSchema>): Promise<ActionResult> {
  const parsed = auditSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  try {
    const context = await getTenantContextForModuleEdit("TRIBUTACAO");
    const result = await runTaxAuditCrossCheck(context.prisma, parsed.data);

    revalidatePath("/tributacao/fiscalizacao");
    return { data: result };
  } catch (err: any) {
    return { error: err?.message || "Erro ao executar cruzamento fiscal." };
  }
}

export async function issueInfractionNoticeAction(crossCheckId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("TRIBUTACAO");
    const result = await issueTaxInfractionNotice(context.prisma, crossCheckId);

    revalidatePath("/tributacao/fiscalizacao");
    return { data: result };
  } catch (err: any) {
    return { error: err?.message || "Erro ao emitir Auto de Infração." };
  }
}

export async function getTaxAuditRecordsAction(): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("TRIBUTACAO");
    const records = await context.prisma.taxAuditCrossCheck.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
    });
    return { data: records };
  } catch (err: any) {
    return { error: err?.message || "Erro ao carregar registros de malha fina." };
  }
}
