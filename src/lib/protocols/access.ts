import type { Prisma } from "@prisma/client";
import { canEditModule, getTenantContextForModule, getTenantContextForModuleEdit, isSystemAdministrator, type AppContext } from "@/lib/platform/tenant-context";

export type ProtocolContext = AppContext & {
  protocolAccess: {
    isAdmin: boolean;
    canView: boolean;
    canEdit: boolean;
  };
};

export async function getProtocolContext(required: "view" | "edit" = "view"): Promise<ProtocolContext> {
  const context = required === "edit"
    ? await getTenantContextForModuleEdit("PROCESSOS")
    : await getTenantContextForModule("PROCESSOS");
  const isAdmin = isSystemAdministrator(context.user);
  return { ...context, protocolAccess: { isAdmin, canView: true, canEdit: canEditModule(context.user, "PROCESSOS") } };
}

export function protocolScope(context: ProtocolContext): Prisma.ProcessWhereInput {
  if (context.protocolAccess.isAdmin) return {};
  return context.user.departmentId ? { currentDepartmentId: context.user.departmentId } : { id: "__sem-departamento__" };
}
