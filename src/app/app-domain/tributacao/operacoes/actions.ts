"use server";

import { TaxError, configureTaxParameter, configureTaxServiceActivity, createTaxServiceRequest, enrollAssessmentInActiveDebt, evaluateTaxCertificateSituation, recordIssDeclaration } from "@/lib/tributacao";
import { getTenantContextForModuleEdit } from "@/lib/platform/tenant-context";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string };
const message = (error: unknown) => error instanceof TaxError ? error.message : "Nao foi possivel concluir a operacao tributaria interna.";

export async function saveTaxParameter(data: { taxId: string; code: string; name: string; calculationType: string; configuration: string; effectiveFrom: string }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("TRIBUTACAO");
    let configuration: object;
    try { configuration = JSON.parse(data.configuration); } catch { return { error: "A configuracao deve ser um JSON valido." }; }
    await configureTaxParameter(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, { ...data, configuration, effectiveFrom: new Date(data.effectiveFrom) });
    revalidatePath("/tributacao/operacoes");
    return {};
  } catch (error) { return { error: message(error) }; }
}

export async function saveTaxServiceRequest(data: { serviceType: string; taxpayerId: string; processId: string; documentId?: string; assessmentId?: string; notes?: string }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("TRIBUTACAO");
    await createTaxServiceRequest(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, data);
    revalidatePath("/tributacao/operacoes");
    return {};
  } catch (error) { return { error: message(error) }; }
}

export async function saveServiceActivity(data: { taxId: string; code: string; name: string; issRate: number }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("TRIBUTACAO");
    await configureTaxServiceActivity(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, data);
    revalidatePath("/tributacao/operacoes");
    return {};
  } catch (error) { return { error: message(error) }; }
}

export async function saveIssDeclaration(data: { taxpayerId: string; activityId: string; competence: string; serviceValue: number; deductionValue: number }): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("TRIBUTACAO");
    await recordIssDeclaration(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, { ...data, competence: new Date(data.competence) });
    revalidatePath("/tributacao/operacoes");
    return {};
  } catch (error) { return { error: message(error) }; }
}

export async function enrollAssessment(assessmentId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("TRIBUTACAO");
    await enrollAssessmentInActiveDebt(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, assessmentId);
    revalidatePath("/tributacao/operacoes");
    return {};
  } catch (error) { return { error: message(error) }; }
}

export async function evaluateCertificate(taxpayerId: string): Promise<ActionResult> {
  try {
    const context = await getTenantContextForModuleEdit("TRIBUTACAO");
    await evaluateTaxCertificateSituation(context.prisma, { usuarioId: context.user.id, employeeId: context.user.employeeId }, taxpayerId);
    revalidatePath("/tributacao/operacoes");
    return {};
  } catch (error) { return { error: message(error) }; }
}
