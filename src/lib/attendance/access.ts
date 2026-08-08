import type { Prisma } from "@prisma/client";
import { AccessError, canEditModule, getTenantContextForModule, getTenantContextForModuleEdit, isSystemAdministrator, type AppContext } from "@/lib/platform/tenant-context";

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
  const context = required === "edit"
    ? await getTenantContextForModuleEdit("ATENDIMENTO")
    : await getTenantContextForModule("ATENDIMENTO");
  const role = context.user.role.toLowerCase();
  const isAdmin = isSystemAdministrator(context.user);
  const isManager = isAdmin || role.includes("gestor");
  const isOmbudsman = isAdmin || role.includes("ouvid");

  return { ...context, attendanceAccess: { isAdmin, isManager, isOmbudsman, canView: true, canEdit: canEditModule(context.user, "ATENDIMENTO") } };
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
