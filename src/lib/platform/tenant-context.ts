import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getIdTokenPrincipal, getSessionPrincipal, SESSION_COOKIE_NAME, type SessionPrincipal } from "@/lib/platform/session";
import type { PrismaClient } from "@prisma/client";

// Compatibility layer for the existing module pages and Server Actions.
// Access is resolved from the municipal database, which is the only active
// application database.

export class AccessError extends Error {
  constructor(message: string, readonly status: 401 | 403 | 404 | 423) {
    super(message);
  }
}

export type AppContext = {
  user: {
    id: string;
    firebaseUid: string;
    email: string;
    name: string;
    role: string;
    permissions?: string | null;
    modulePermissions: { code: string; canView: boolean; canEdit: boolean }[];
    allowedBudgetUnitIds: string[];
    employeeId: string | null;
    departmentId: string | null;
    secretariatId: string | null;
  };
  prisma: PrismaClient;
};

const SYSTEM_ADMINISTRATOR_ROLE = "Administrador";

type RolePermissions = {
  acesso?: unknown;
  modulosBloqueados?: unknown;
  modulosPermitidos?: unknown;
  modulosSomenteLeitura?: unknown;
  modules?: unknown;
};

type ModuleProfilePermission = {
  showDashboardCard: boolean;
  blocked: boolean;
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
};

function parseRolePermissions(value: string | null | undefined): RolePermissions | null {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" ? (parsed as RolePermissions) : null;
  } catch {
    return null;
  }
}

function hasModuleAccess(values: unknown, moduleCode: string) {
  return Array.isArray(values) && values.some((value) => value === moduleCode);
}

function getModuleProfilePermission(rolePermissions: RolePermissions | null, moduleCode: string): ModuleProfilePermission | null {
  if (!rolePermissions?.modules || typeof rolePermissions.modules !== "object" || Array.isArray(rolePermissions.modules)) return null;
  const raw = (rolePermissions.modules as Record<string, unknown>)[moduleCode];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const permission = raw as Partial<ModuleProfilePermission>;
  return {
    showDashboardCard: permission.showDashboardCard === true,
    blocked: permission.blocked === true,
    view: permission.view === true,
    create: permission.create === true,
    update: permission.update === true,
    delete: permission.delete === true,
  };
}

export function isModuleBlockedForUser(user: AppContext["user"], moduleCode: string) {
  if (isSystemAdministrator(user)) return false;
  const codeUpper = moduleCode.toUpperCase();
  const rolePermissions = parseRolePermissions(user.permissions);
  const permission = getModuleProfilePermission(rolePermissions, codeUpper);
  return permission ? permission.blocked : hasModuleAccess(rolePermissions?.modulosBloqueados, codeUpper);
}

export function canShowDashboardCard(user: AppContext["user"], moduleCode: string) {
  if (isSystemAdministrator(user)) return true;
  const codeUpper = moduleCode.toUpperCase();
  const rolePermissions = parseRolePermissions(user.permissions);
  const permission = getModuleProfilePermission(rolePermissions, codeUpper);
  return permission ? permission.showDashboardCard : canViewModule(user, codeUpper);
}

export function canViewModule(user: AppContext["user"], moduleCode: string) {
  if (isSystemAdministrator(user)) return true;

  const codeUpper = moduleCode.toUpperCase();
  const rolePermissions = parseRolePermissions(user.permissions);
  const permission = getModuleProfilePermission(rolePermissions, codeUpper);
  if (permission) return !permission.blocked && (permission.view || permission.create || permission.update || permission.delete);
  if (hasModuleAccess(rolePermissions?.modulosBloqueados, codeUpper)) return false;

  const allowedModules = rolePermissions?.modulosPermitidos;
  if (Array.isArray(allowedModules)) return hasModuleAccess(allowedModules, codeUpper);

  return user.modulePermissions.some(
    (permission) => permission.code === codeUpper && (permission.canView || permission.canEdit),
  );
}

export function canEditModule(user: AppContext["user"], moduleCode: string) {
  if (isSystemAdministrator(user)) return true;

  const codeUpper = moduleCode.toUpperCase();
  const rolePermissions = parseRolePermissions(user.permissions);
  const permission = getModuleProfilePermission(rolePermissions, codeUpper);
  if (permission) return !permission.blocked && (permission.create || permission.update || permission.delete);
  if (hasModuleAccess(rolePermissions?.modulosBloqueados, codeUpper)) return false;
  if (hasModuleAccess(rolePermissions?.modulosSomenteLeitura, codeUpper)) return false;

  const allowedModules = rolePermissions?.modulosPermitidos;
  if (Array.isArray(allowedModules) && !hasModuleAccess(allowedModules, codeUpper)) return false;

  return user.modulePermissions.some(
    (permission) => permission.code === codeUpper && permission.canEdit,
  );
}

export function isSystemAdministrator(user: AppContext["user"]) {
  return (
    user.role === SYSTEM_ADMINISTRATOR_ROLE &&
    parseRolePermissions(user.permissions)?.acesso === "total"
  );
}

export function assertBudgetUnitAccess(user: AppContext["user"], budgetUnitId: string) {
  if (isSystemAdministrator(user)) return;
  if (!user.allowedBudgetUnitIds.includes(budgetUnitId)) {
    throw new AccessError(`Acesso negado à Unidade Gestora ${budgetUnitId}.`, 403);
  }
}

async function resolveUser(principal: SessionPrincipal | null): Promise<AppContext["user"]> {
  if (!principal) throw new AccessError("Sessao invalida ou expirada.", 401);

  let usuario;
  let allowedBudgetUnitIds: string[] = [];

  try {
    usuario = await prisma.usuario.findUnique({
      where: { email: principal.email },
      include: {
        perfil: true,
        employee: true,
        permissoesModulo: {
          include: { modulo: { select: { codigo: true } } },
        },
        unidadesGestoras: {
          select: { budgetUnitId: true },
        },
      },
    });
    if (usuario?.unidadesGestoras) {
      allowedBudgetUnitIds = usuario.unidadesGestoras.map((ug) => ug.budgetUnitId);
    }
  } catch {
    // Fallback if UsuarioUnidadeGestora table does not exist yet in DB migration
    usuario = await prisma.usuario.findUnique({
      where: { email: principal.email },
      include: {
        perfil: true,
        employee: true,
        permissoesModulo: {
          include: { modulo: { select: { codigo: true } } },
        },
      },
    });
  }

  if (!usuario || !usuario.ativo || !usuario.perfil.ativo) {
    throw new AccessError("Usuario sem acesso ao sistema.", 403);
  }

  return {
    id: usuario.id,
    firebaseUid: principal.firebaseUid,
    email: usuario.email,
    name: usuario.nome || principal.name,
    role: usuario.perfil.nome,
    permissions: usuario.perfil.permissoes ?? null,
    modulePermissions: usuario.permissoesModulo.map((permission) => ({
      code: permission.modulo.codigo.toUpperCase(),
      canView: permission.canView,
      canEdit: permission.canEdit,
    })),
    allowedBudgetUnitIds,
    employeeId: usuario.employee?.id ?? null,
    departmentId: usuario.employee?.departmentId ?? null,
    secretariatId: usuario.employee?.secretariatId ?? null,
  };
}

function buildAppContext(user: AppContext["user"]): AppContext {
  return {
    user,
    prisma,
  };
}

export async function getCurrentTenantContext(): Promise<AppContext> {
  const cookieStore = await cookies();
  const principal = await getSessionPrincipal(cookieStore.get(SESSION_COOKIE_NAME)?.value);
  return buildAppContext(await resolveUser(principal));
}

export async function authorizeIdToken(idToken: string): Promise<AppContext["user"]> {
  return resolveUser(await getIdTokenPrincipal(idToken));
}

export async function getTenantContextForSystemAdministration(): Promise<AppContext> {
  const context = await getCurrentTenantContext();
  if (!isSystemAdministrator(context.user)) {
    throw new AccessError("Apenas o administrador do sistema pode gerenciar usuários, perfis e módulos.", 403);
  }
  return context;
}

// Enforces granular module RBAC based on user profile permissions.
export async function getTenantContextForModule(moduleCode: string): Promise<AppContext> {
  const context = await getCurrentTenantContext();
  if (isSystemAdministrator(context.user)) {
    return context;
  }

  if (!canViewModule(context.user, moduleCode)) {
    throw new AccessError(`Acesso negado ao módulo ${moduleCode}.`, 403);
  }

  return context;
}

export async function getTenantContextForModuleEdit(moduleCode: string): Promise<AppContext> {
  const context = await getTenantContextForModule(moduleCode);
  if (!canEditModule(context.user, moduleCode)) {
    throw new AccessError(`Acesso de edição negado ao módulo ${moduleCode}.`, 403);
  }
  return context;
}

export async function getOptionalTenantContext(): Promise<AppContext | null> {
  try {
    return await getCurrentTenantContext();
  } catch (error) {
    if (error instanceof AccessError) return null;
    throw error;
  }
}
