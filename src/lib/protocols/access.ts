import type { Prisma } from "@prisma/client";
import { AccessError, getCurrentTenantContext, type AppContext } from "@/lib/platform/tenant-context";

export type ProtocolContext = AppContext & {
  protocolAccess: {
    isAdmin: boolean;
    canView: boolean;
    canEdit: boolean;
  };
};

export async function getProtocolContext(required: "view" | "edit" = "view"): Promise<ProtocolContext> {
  const context = await getCurrentTenantContext();
  const isAdmin = context.user.role.toLowerCase().includes("administrador");

  if (isAdmin) {
    return { ...context, protocolAccess: { isAdmin, canView: true, canEdit: true } };
  }

  const module = await context.prisma.configuracaoModulo.findUnique({
    where: { codigo: "PROTOCOLOS" },
    select: { id: true, ativo: true },
  });
  if (!module?.ativo) throw new AccessError("Modulo de Protocolos indisponivel para este usuario.", 403);

  const permission = await context.prisma.usuarioModulo.findUnique({
    where: { usuarioId_moduloId: { usuarioId: context.user.id, moduloId: module.id } },
    select: { canView: true, canEdit: true },
  });
  const canView = Boolean(permission?.canView || permission?.canEdit);
  const canEdit = Boolean(permission?.canEdit);
  if (!canView || (required === "edit" && !canEdit)) {
    throw new AccessError(required === "edit" ? "Sem permissao de edicao em Protocolos." : "Sem permissao de visualizacao em Protocolos.", 403);
  }

  return { ...context, protocolAccess: { isAdmin, canView, canEdit } };
}

export function protocolScope(context: ProtocolContext): Prisma.ProcessWhereInput {
  if (context.protocolAccess.isAdmin) return {};
  return context.user.departmentId ? { currentDepartmentId: context.user.departmentId } : { id: "__sem-departamento__" };
}
