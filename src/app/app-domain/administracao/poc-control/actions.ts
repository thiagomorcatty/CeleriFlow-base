"use server";

import { runMassivePocSeed } from "../../../../../prisma/seed-poc-massivo";
import { getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";

export async function resetPocDatabaseAction(): Promise<{ success?: boolean; message?: string; error?: string }> {
  try {
    // Audit check
    const { tenantId } = await getTenantContextForSystemAdministration();

    console.log(`[POC-RESET] Iniciando reset administrativo da base de dados POC para tenant ${tenantId}...`);
    await runMassivePocSeed();

    return {
      success: true,
      message: "Base de dados restaurada com sucesso! Todos os 20 módulos foram repovoados com dados genéricos (100+ por módulo, 200 servidores).",
    };
  } catch (err: any) {
    console.error("[POC-RESET-ERROR]", err);
    return {
      error: err?.message || "Falha ao restaurar a base de dados da POC.",
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
  } catch (err: any) {
    return { error: err?.message || "Falha ao carregar métricas da POC." };
  }
}
