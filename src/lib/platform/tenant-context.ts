import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { adminAuth } from "@/lib/firebase/server";
import { SESSION_COOKIE_NAME } from "@/lib/platform/session";
import type { PrismaClient } from "@prisma/client";

// ───────────────────────────────────────────────────────────────────
// Single-tenant wrapper.
//
// This module keeps the SAME interface that ~250 consuming files
// expect (TenantContext, getTenantContextForModule, etc.)
// but simply returns the singleton prisma client bound to DATABASE_URL.
//
// When multi-tenant support is needed in the future, replace the
// implementation here without touching callers.
// ───────────────────────────────────────────────────────────────────

export class TenantAccessError extends Error {
  constructor(message: string, readonly status: 401 | 403 | 404 | 423) {
    super(message);
  }
}

export type TenantContext = {
  tenant: {
    id: string;
    slug: string;
    name: string;
    municipality: string;
    state: string;
    status: string;
  };
  user: {
    id: string;
    firebaseUid: string;
    email: string;
    name: string;
    role: string;
  };
  modules: string[];
  prisma: PrismaClient;
};

async function resolveUserFromSession(): Promise<TenantContext["user"] | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const token = await adminAuth.verifySessionCookie(sessionCookie, true);
    return {
      id: token.uid,
      firebaseUid: token.uid,
      email: token.email ?? "",
      name: token.name ?? token.email ?? "Usuário",
      role: "ADMIN",
    };
  } catch {
    return null;
  }
}

function buildSingleTenantContext(user: TenantContext["user"]): TenantContext {
  return {
    tenant: {
      id: "single",
      slug: "celeriflow",
      name: "CeleriFlow",
      municipality: "",
      state: "",
      status: "ACTIVE",
    },
    user,
    modules: [
      "ADMINISTRACAO", "CADASTROS", "PROTOCOLOS", "DOCUMENTOS",
      "ATENDIMENTO", "TRANSPARENCIA", "TRIBUTARIO", "FINANCEIRO",
      "COMPRAS", "RH", "PATRIMONIO", "EDUCACAO", "SAUDE",
      "SOCIAL", "MEIO_AMBIENTE", "SANEAMENTO", "OBRAS",
      "CULTURA", "CAMARA", "SEGURANCA", "CONFIGURACOES",
      "INDICADORES", "PROCESSOS",
    ],
    prisma,
  };
}

export async function getCurrentTenantContext(): Promise<TenantContext> {
  const user = await resolveUserFromSession();
  if (!user) throw new TenantAccessError("Sessao invalida ou expirada.", 401);
  return buildSingleTenantContext(user);
}

export async function getTenantContextForModule(_moduleCode: string): Promise<TenantContext> {
  return getCurrentTenantContext();
}

export async function getOptionalTenantContext(): Promise<TenantContext | null> {
  try {
    return await getCurrentTenantContext();
  } catch (error) {
    if (error instanceof TenantAccessError) return null;
    throw error;
  }
}
