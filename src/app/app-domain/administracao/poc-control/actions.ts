"use server";

import { runMassivePocSeed } from "../../../../../prisma/seed-poc-massivo";
import { getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";
import { getCeleriFlowInstanceId } from "@/lib/platform/instance";
import { isPocModeEnabled } from "@/lib/poc/poc-config";

const POC_RESET_CONFIRMATION = "RESETAR POC";

export async function resetPocDatabaseAction(confirmation: string): Promise<{ success?: boolean; message?: string; error?: string }> {
  try {
    await getTenantContextForSystemAdministration();
    if (!isPocModeEnabled() || process.env.CELERIFLOW_POC_RESET_ENABLED !== "true") {
      throw new Error("O reset esta desabilitado para esta instancia.");
    }
    if (confirmation !== POC_RESET_CONFIRMATION) {
      throw new Error(`Digite \"${POC_RESET_CONFIRMATION}\" para confirmar o reset.`);
    }
    const instanceId = getCeleriFlowInstanceId();

    console.log(`[POC-RESET] Iniciando reset da instancia ${instanceId}.`);
    await runMassivePocSeed();

    return {
      success: true,
      message: `Base da instancia ${instanceId} restaurada com sucesso.`,
    };
  } catch (err) {
    console.error("[POC-RESET-ERROR]", err);
    return {
      error: err instanceof Error ? err.message : "Falha ao restaurar a base de dados da POC.",
    };
  }
}

export async function getPocDataMetricsAction(): Promise<{
  counts?: Record<string, number>;
  error?: string;
}> {
  try {
    const { prisma } = await getTenantContextForSystemAdministration();

    const [
      servidores,
      pessoasFisicas,
      pessoasJuridicas,
      licitacoes,
      contratos,
      patrimonios,
      alunos,
      pacientes,
      familias,
      obras,
      licencas,
      chamados,
      proposicoes,
      ocorrencias,
      faturasSaneamento,
    ] = await Promise.all([
      prisma.employee.count(),
      prisma.person.count(),
      prisma.company.count(),
      prisma.purchaseProcess.count(),
      prisma.contract.count(),
      prisma.materialStock.count(),
      prisma.student.count(),
      prisma.patient.count(),
      prisma.socialFamily.count(),
      prisma.obrasObra.count(),
      prisma.envLicense.count(),
      prisma.socialAttendance.count(),
      prisma.camProposicao.count(),
      prisma.segurancaOcorrencia.count(),
      prisma.sanInvoice.count(),
    ]);

    return {
      counts: {
        "Servidores (RH)": servidores,
        "Pessoas Físicas": pessoasFisicas,
        "Pessoas Jurídicas": pessoasJuridicas,
        "Licitações & Compras": licitacoes,
        "Contratos Públicos": contratos,
        "Bens Patrimoniais": patrimonios,
        "Alunos (Educação)": alunos,
        "Pacientes (Saúde)": pacientes,
        "Famílias (Assistência Social)": familias,
        "Obras Públicas": obras,
        "Licenças Ambientais": licencas,
        "Atendimentos Sociais": chamados,
        "Proposições (Câmara)": proposicoes,
        "Ocorrências (Segurança)": ocorrencias,
        "Faturas de Saneamento": faturasSaneamento,
      },
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Falha ao carregar métricas da POC." };
  }
}
