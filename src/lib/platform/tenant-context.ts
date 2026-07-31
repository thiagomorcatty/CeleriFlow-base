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

export function isSystemAdministrator(user: AppContext["user"]) {
  return (
    user.role === SYSTEM_ADMINISTRATOR_ROLE &&
    parseRolePermissions(user.permissions)?.acesso === "total"
  );
}

async function resolveUser(principal: SessionPrincipal | null): Promise<AppContext["user"]> {
  if (!principal) throw new AccessError("Sessao invalida ou expirada.", 401);

  const usuario = await prisma.usuario.findUnique({
    where: { email: principal.email },
    include: {
      perfil: true,
      employee: true,
      permissoesModulo: {
        include: { modulo: { select: { codigo: true } } },
      },
    },
  });

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

  const codeUpper = moduleCode.toUpperCase();
  const rolePermissions = parseRolePermissions(context.user.permissions);

  if (hasModuleAccess(rolePermissions?.modulosBloqueados, codeUpper)) {
    throw new AccessError(`Acesso negado ao módulo ${moduleCode}.`, 403);
  }

  const allowedModules = rolePermissions?.modulosPermitidos;
  if (Array.isArray(allowedModules)) {
    if (!hasModuleAccess(allowedModules, codeUpper)) {
      throw new AccessError(`Acesso negado ao módulo ${moduleCode}.`, 403);
    }
    return context;
  }

  const userPermission = context.user.modulePermissions.find((permission) => permission.code === codeUpper);
  if (!userPermission || (!userPermission.canView && !userPermission.canEdit)) {
    throw new AccessError(`Acesso negado ao módulo ${moduleCode}.`, 403);
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
