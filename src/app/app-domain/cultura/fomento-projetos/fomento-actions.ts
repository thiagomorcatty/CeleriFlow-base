"use server";

import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import crypto from "crypto";
import { Prisma } from "@prisma/client";

type ActionResult<T = any> = { error?: string; data?: T };

const projectSchema = z.object({
  codigoEdital: z.string().min(1, "Informe o código do edital."),
  nomeEdital: z.string().min(1, "Informe o nome do edital."),
  tituloProjeto: z.string().min(1, "Informe o título do projeto."),
  proponenteNome: z.string().min(1, "Informe o nome do proponente."),
  proponenteCpfCnpj: z.string().min(1, "Informe o CPF/CNPJ."),
  categoriaCultural: z.string().min(1, "Selecione a categoria cultural."),
  valorSolicitado: z.number().positive("Informe o valor solicitado."),
});

export async function submitCulturalProjectAction(input: z.infer<typeof projectSchema>): Promise<ActionResult> {
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  try {
    const context = await getTenantContextForModuleEdit("CULTURA");
    const project = await context.prisma.culturalIncentiveProject.create({
      data: {
        ...parsed.data,
        valorSolicitado: new Prisma.Decimal(parsed.data.valorSolicitado),
        valorAprovado: new Prisma.Decimal(parsed.data.valorSolicitado),
        status: "APROVADO",
      },
    });

    revalidatePath("/cultura/fomento-projetos");
    return { data: project };
  } catch (err: any) {
    return { error: err?.message || "Erro ao submeter projeto cultural." };
  }
}

export async function submitAccountabilityAction(projectId: string, reciboNota: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("CULTURA");
    const timestamp = Date.now();
    const recibo = `REC-PREST-${timestamp}`;

    const updated = await context.prisma.culturalIncentiveProject.update({
      where: { id: projectId },
      data: {
        prestacaoContasStatus: "HOMOLOGADA",
        reciboPrestacaoContas: recibo,
        status: "CONCLUIDO",
      },
    });

    revalidatePath("/cultura/fomento-projetos");
    return { data: { project: updated, recibo } };
  } catch (err: any) {
    return { error: err?.message || "Erro ao enviar prestação de contas." };
  }
}

export async function getCulturalProjectsAction(): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("CULTURA");
    const projects = await context.prisma.culturalIncentiveProject.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return { data: projects };
  } catch (err: any) {
    return { error: err?.message || "Erro ao carregar projetos de fomento." };
  }
}
