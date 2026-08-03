"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { generateEnvironmentalLicense, EnvironmentalLicenseInput } from "@/lib/meio-ambiente/licenciamento-engine";
import { revalidatePath } from "next/cache";

type ActionResult<T = any> = { error?: string; data?: T };

export async function issueEnvironmentalLicenseAction(input: EnvironmentalLicenseInput): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("MEIO_AMBIENTE");
    const result = await generateEnvironmentalLicense(context.prisma, input);

    revalidatePath("/meio-ambiente/licenciamento");
    return { data: result };
  } catch (err: any) {
    return { error: err?.message || "Erro ao emitir Licença Ambiental." };
  }
}

export async function getIssuedLicensesAction(): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("MEIO_AMBIENTE");
    const licenses = await context.prisma.environmentalLicense.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
    });
    return { data: licenses };
  } catch (err: any) {
    return { error: err?.message || "Erro ao listar licenças emitidas." };
  }
}
