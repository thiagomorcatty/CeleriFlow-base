"use server";

import { revalidatePath } from "next/cache";
import { AccessError, getTenantContextForSystemAdministration } from "@/lib/platform/tenant-context";

async function getTenantPrisma() {
  return (await getTenantContextForSystemAdministration()).prisma;
}

const MODULE_CODES = new Set([
  "ADMINISTRACAO", "RH", "CADASTROS", "DOCUMENTOS", "ATENDIMENTO", "COMPRAS", "CONTRATOS", "FINANCEIRO", "PATRIMONIO", "TRIBUTACAO", "PROCESSOS", "SAUDE",
  "EDUCACAO", "SOCIAL", "OBRAS", "MEIO_AMBIENTE", "SEGURANCA", "SANEAMENTO", "CAMARA", "CULTURA", "TRANSPARENCIA", "CONFIGURACOES",
]);

function normalizePermissions(value: string | undefined) {
  if (!value) return JSON.stringify({ acesso: "operacional", modules: {} });
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error("A matriz de permissões é inválida.");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("A matriz de permissões é inválida.");
  const source = parsed as { acesso?: unknown; modules?: unknown };
  const modulesSource = source.modules && typeof source.modules === "object" && !Array.isArray(source.modules)
    ? source.modules as Record<string, unknown>
    : {};
  const modules: Record<string, { showDashboardCard: boolean; blocked: boolean; create: boolean; update: boolean; delete: boolean; issueReports: boolean }> = {};
  for (const [code, raw] of Object.entries(modulesSource)) {
    if (!MODULE_CODES.has(code) || !raw || typeof raw !== "object" || Array.isArray(raw)) continue;
    const item = raw as Record<string, unknown>;
    const blocked = item.blocked === true;
    modules[code] = {
      showDashboardCard: item.showDashboardCard === true,
      blocked,
      create: !blocked && item.create === true,
      update: !blocked && item.update === true,
      delete: !blocked && item.delete === true,
      issueReports: !blocked && code === "FINANCEIRO" && item.issueReports === true,
    };
  }
  return JSON.stringify({
    acesso: source.acesso === "total" ? "total" : "operacional",
    modules,
    modulosBloqueados: Object.entries(modules).filter(([, permission]) => permission.blocked).map(([code]) => code),
  });
}

export async function upsertPerfil(data: {
  id?: string;
  nome: string;
  descricao: string;
  permissoes?: string;
  ativo: boolean;
}) {
  try {
    const prisma = await getTenantPrisma();
    const nome = data.nome.trim();
    if (!nome) return { error: "Informe o nome do perfil." };

    const jsonPermissoes = normalizePermissions(data.permissoes);

    if (data.id) {
      const existing = await prisma.configuracaoPerfil.findUnique({ where: { id: data.id } });
      if (!existing) return { error: "Perfil não encontrado." };
      
      await prisma.configuracaoPerfil.update({
        where: { id: data.id },
        data: {
          nome,
          descricao: data.descricao,
          permissoes: jsonPermissoes,
          ativo: data.ativo,
        },
      });
    } else {
      await prisma.configuracaoPerfil.create({
        data: {
          nome,
          descricao: data.descricao,
          permissoes: jsonPermissoes,
          ativo: data.ativo,
        },
      });
    }
    revalidatePermissionConsumers();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Erro ao salvar o perfil." };
  }
}

export async function togglePerfilStatus(id: string, ativo: boolean) {
  try {
    const prisma = await getTenantPrisma();
    const perfil = await prisma.configuracaoPerfil.findUnique({ where: { id } });
    if (!perfil) return { error: "Perfil não encontrado." };
    
    await prisma.configuracaoPerfil.update({
      where: { id },
      data: { ativo },
    });
    revalidatePermissionConsumers();
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: error instanceof AccessError ? error.message : "Erro ao alterar o status do perfil." };
  }
}

function revalidatePermissionConsumers() {
  revalidatePath("/configuracoes/perfis");
  revalidatePath("/dashboard");
  revalidatePath("/app-domain/dashboard");
  revalidatePath("/");
}
