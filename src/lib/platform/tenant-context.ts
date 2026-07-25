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
  };
  prisma: PrismaClient;
};

async function resolveUser(principal: SessionPrincipal | null): Promise<AppContext["user"]> {
  if (!principal) throw new AccessError("Sessao invalida ou expirada.", 401);

  const usuario = await prisma.usuario.findUnique({
    where: { email: principal.email },
    include: { perfil: true },
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

// Kept until module permissions are enabled in ConfiguracaoModulo.
export async function getTenantContextForModule(_moduleCode: string): Promise<AppContext> {
  return getCurrentTenantContext();
}

export async function getOptionalTenantContext(): Promise<AppContext | null> {
  try {
    return await getCurrentTenantContext();
  } catch (error) {
    if (error instanceof AccessError) return null;
    throw error;
  }
}
