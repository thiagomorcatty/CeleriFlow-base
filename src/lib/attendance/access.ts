import type { Prisma } from "@prisma/client";
import { AccessError, getCurrentTenantContext, isSystemAdministrator, type AppContext } from "@/lib/platform/tenant-context";

export type AttendanceContext = AppContext & {
  attendanceAccess: {
    isAdmin: boolean;
    isManager: boolean;
    isOmbudsman: boolean;
    canView: boolean;
    canEdit: boolean;
  };
};

export async function getAttendanceContext(required: "view" | "edit" = "view"): Promise<AttendanceContext> {
  const context = await getCurrentTenantContext();
  const role = context.user.role.toLowerCase();
  const isAdmin = isSystemAdministrator(context.user);
  const isManager = isAdmin || role.includes("gestor");
  const isOmbudsman = isAdmin || role.includes("ouvid");

  if (isAdmin) {
    return { ...context, attendanceAccess: { isAdmin, isManager, isOmbudsman, canView: true, canEdit: true } };
  }

  const moduleConfig = await context.prisma.configuracaoModulo.findUnique({
    where: { codigo: "ATENDIMENTO" },
    select: { id: true, ativo: true },
  });
  if (!moduleConfig?.ativo) throw new AccessError("Modulo de Atendimento indisponivel para este usuario.", 403);

  const permission = await context.prisma.usuarioModulo.findUnique({
    where: { usuarioId_moduloId: { usuarioId: context.user.id, moduloId: moduleConfig.id } },
    select: { canView: true, canEdit: true },
  });
  const canView = Boolean(permission?.canView || permission?.canEdit);
  const canEdit = Boolean(permission?.canEdit);
  if (!canView || (required === "edit" && !canEdit)) {
    throw new AccessError(required === "edit" ? "Sem permissao de edicao em Atendimento." : "Sem permissao de visualizacao em Atendimento.", 403);
  }

  return { ...context, attendanceAccess: { isAdmin, isManager, isOmbudsman, canView, canEdit } };
}

export async function getAttendanceOperationalContext() {
  const context = await getAttendanceContext("edit");
  if (!context.user.employeeId) {
    throw new Error("Seu usuario precisa estar vinculado a um servidor para realizar esta operacao.");
  }
  const employee = await context.prisma.employee.findUnique({
    where: { id: context.user.employeeId },
    include: { department: true },
  });
  if (!employee?.isActive || !employee.departmentId || !employee.department?.isActive) {
    throw new Error("Seu vinculo operacional nao esta ativo ou nao possui departamento.");
  }
  return { ...context, employee, departmentId: employee.departmentId };
}

export function ticketScope(context: AttendanceContext): Prisma.TicketWhereInput {
  if (context.attendanceAccess.isAdmin || context.attendanceAccess.isManager) return {};
  return context.user.departmentId ? { departmentId: context.user.departmentId } : { id: "__sem-departamento__" };
}

export function ombudsmanScope(context: AttendanceContext): Prisma.OmbudsmanWhereInput {
  if (context.attendanceAccess.isAdmin || context.attendanceAccess.isOmbudsman) return {};
  const departmentScope = context.user.departmentId ? { departmentId: context.user.departmentId } : { id: "__sem-departamento__" };
  return {
    OR: [
      { AND: [{ isConfidential: false }, departmentScope] },
      { isConfidential: true, accessGrants: { some: { userId: context.user.id } } },
    ],
  };
}

export function canViewOmbudsmanIdentity(context: AttendanceContext, isConfidential: boolean, hasIdentityGrant = false) {
  return !isConfidential || context.attendanceAccess.isAdmin || context.attendanceAccess.isOmbudsman || hasIdentityGrant;
}
